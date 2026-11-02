import argparse
import concurrent.futures
import hashlib
import importlib.util
import json
import os
import shutil
import subprocess
import sys
import tempfile
from collections import Counter
from datetime import datetime, timezone
from pathlib import Path


BASE = 'corrections/outils/sondes/generalisation/'
SOURCES = (
    'server/exercises/csharp.js',
    'server/exercises/grading-policy.js',
    'server/exercises/grading-evidence.json',
    'server/exercises/grading-runtime-evidence.json',
    'tests/csharp-lot1.test.js',
    'corrections/resultats/generalisation-lot1-partie2-complement.json',
    'corrections/outils/sondes/sondes-sept-restants.js',
    'corrections/outils/sondes/matrice-suspendus/matrice.py',
    'corrections/outils/sondes/nouvelles-fixtures-suspendus/banc.py',
    'corrections/outils/sondes/nouvelles-fixtures-suspendus/fixtures/csharp.json',
    BASE + 'cas.json',
    BASE + 'banc.py',
    BASE + 'rejouer.sh',
    BASE + 'cas_csharp_lot1_partie3.json',
    BASE + 'mutants_csharp_lot1_partie3.json',
    BASE + 'csharp_lot1_partie3.py',
    BASE + 'extraire_csharp_lot1_partie3.js',
    BASE + 'verifier_rapport_csharp_lot1_partie3.js',
    BASE + 'banc_csharp_lot1_partie3.py',
    BASE + 'tests_csharp_lot1_partie3.py',
    BASE + 'rejouer_csharp_lot1_partie3.sh',
)
DOMAINES_FINIS = {'csb2-c3-e1', 'csb2-c3-e2', 'csb2-c3-e3', 'csb2-c4-e3'}


def maintenant():
    return datetime.now(timezone.utc).isoformat(timespec='seconds').replace('+00:00', 'Z')


def empreinte(donnees):
    if isinstance(donnees, str):
        donnees = donnees.encode('utf8')
    return hashlib.sha256(donnees).hexdigest()


def fichier_empreinte(path):
    condensat = hashlib.sha256()
    with path.open('rb') as flux:
        for bloc in iter(lambda: flux.read(1024 * 1024), b''):
            condensat.update(bloc)
    return condensat.hexdigest()


def source_empreinte(racine, relatif):
    fichier = racine / relatif
    if fichier.is_symlink() or not fichier.is_file() or not fichier.resolve().is_relative_to(racine):
        raise RuntimeError(f'Source absente ou hors périmètre : {relatif}')
    return fichier_empreinte(fichier)


def copier_sources(racine, instantane):
    manifeste = {nom: source_empreinte(racine, nom) for nom in SOURCES}
    for nom in SOURCES:
        cible = instantane / nom
        cible.parent.mkdir(parents=True, exist_ok=True)
        shutil.copyfile(racine / nom, cible)
        if fichier_empreinte(cible) != manifeste[nom]:
            raise RuntimeError(f'Source modifiée pendant la copie : {nom}')
    if sources_modifiees(racine, manifeste):
        raise RuntimeError('Sources modifiées pendant la constitution de la copie')
    return manifeste


def sources_modifiees(racine, manifeste):
    modifications = []
    for nom, valeur in manifeste.items():
        try:
            if source_empreinte(racine, nom) != valeur:
                modifications.append(nom)
        except (OSError, RuntimeError):
            modifications.append(nom)
    return modifications


def charger_module(nom, fichier):
    spec = importlib.util.spec_from_file_location(nom, fichier)
    if spec is None or spec.loader is None:
        raise RuntimeError(f'Import impossible : {nom}')
    module = importlib.util.module_from_spec(spec)
    sys.modules[nom] = module
    spec.loader.exec_module(module)
    return module


def controler_exterieur():
    reseau_hote = os.environ.get('REVI_HOST_NET_NS', '')
    if not reseau_hote or Path('/proc/1/comm').read_text().strip() != 'bwrap':
        raise RuntimeError('Lanceur extérieur bubblewrap obligatoire')
    interfaces = [ligne.strip().split(':')[0] for ligne in Path('/proc/net/dev').read_text().splitlines()[2:]]
    if (os.readlink('/proc/self/ns/net') == reseau_hote or interfaces != ['lo'] or
            Path('/home').exists() or os.environ.get('HOME') != '/nonexistent'):
        raise RuntimeError('Isolation extérieure incomplète')
    return {'pid1_bwrap': True, 'reseau_separe': True, 'interfaces': interfaces,
            'home_absent': True, 'home_variable': '/nonexistent'}


def outils_empreintes(node, dotnet):
    racine = Path(dotnet['root'])
    compilateur = racine / 'sdk' / dotnet['sdk'] / 'Roslyn/bincore/csc.dll'
    references = []
    for reference in dotnet['references']:
        chemin = racine / reference.removeprefix('/dotnet/')
        references.append((chemin.name, fichier_empreinte(chemin)))
    runtime = racine / 'shared/Microsoft.NETCore.App' / dotnet['runtime'] / 'libcoreclr.so'
    return {'python': sys.version.split()[0], 'node_sha256': fichier_empreinte(node),
            'dotnet_sha256': fichier_empreinte(racine / 'dotnet'),
            'compilateur_sha256': fichier_empreinte(compilateur),
            'references_sha256': empreinte(json.dumps(references, ensure_ascii=False)),
            'libcoreclr_sha256': fichier_empreinte(runtime) if runtime.is_file() else None,
            'sdk': dotnet['sdk'], 'runtime': dotnet['runtime'], 'framework': dotnet['framework']}


def normaliser_sortie(valeur):
    return valeur.replace('\r\n', '\n').replace('\r', '\n').rstrip('\n')


def comparer(cellule, attendu):
    if cellule.get('etat') != 'a_comparer':
        return dict(cellule)
    sortie = cellule['stdout']
    return {'etat': 'conforme' if normaliser_sortie(sortie) == normaliser_sortie(attendu) else 'sortie_incorrecte',
            'execute': True, 'code_sortie': 0, 'sortie': sortie, 'sortie_sha256': cellule['stdout_sha256'],
            'stderr_sha256': cellule['stderr_sha256']}


def verifier_attendus(exercices, oracle):
    nombre = 0
    for exercice in exercices:
        for cas in exercice['cas'] + exercice.get('sondes_conditionnelles', []):
            if oracle.calculer(exercice['id'], cas['entree']) != cas['attendu']:
                raise RuntimeError(f'Attendu manuel divergent de la référence : {exercice["id"]}')
            nombre += 1
    return nombre


def construire_cas(exercice):
    nouveaux = [{'origine': 'nouveau', 'index': index + 1, 'sample': {'stdin': cas['entree'], 'expected': cas['attendu']}}
                for index, cas in enumerate(exercice['cas'])]
    sondes = [{'origine': 'sonde_conditionnelle', 'index': index + 1,
               'sample': {'stdin': cas['entree'], 'expected': cas['attendu']}}
              for index, cas in enumerate(exercice.get('sondes_conditionnelles', []))]
    anciens = [{'origine': sample['origine'], 'index': sample['index'], 'label': sample.get('label', ''),
                'sample': {'stdin': sample['stdin'], 'expected': sample['expected']}}
               for sample in exercice['historiques']]
    return nouveaux + sondes + anciens


def synthese_execution(exercice, execution):
    entrees = construire_cas(exercice)
    cellules = execution.get('cells', [])
    if len(cellules) != len(entrees):
        raise RuntimeError('Cardinalité des exécutions incohérente')
    resultats = [comparer(cellule, entree['sample']['expected']) for entree, cellule in zip(entrees, cellules, strict=True)]
    debut_historiques = 2 + len(exercice.get('sondes_conditionnelles', []))
    anciens = []
    for entree, resultat in zip(entrees[debut_historiques:], resultats[debut_historiques:], strict=True):
        preuve = {'origine': entree['origine'], 'index': entree['index'], 'label': entree['label'],
                  'etat': resultat['etat'], 'execute': resultat.get('execute', False)}
        if resultat.get('sortie_sha256'):
            preuve['sortie_sha256'] = resultat['sortie_sha256']
        if resultat['etat'] != 'conforme':
            preuve['attendu'] = entree['sample']['expected']
            preuve['sortie'] = resultat.get('sortie')
            preuve['cause'] = resultat.get('cause')
        anciens.append(preuve)
    return {'compilation': execution.get('compilation'), 'nouveaux': resultats[:2],
            'sondes_conditionnelles': resultats[2:debut_historiques],
            'historiques': {'nombre': len(anciens), 'etats': dict(Counter(resultat['etat'] for resultat in anciens)),
                            'preuves': anciens}}


def compiler_sonde(sandbox, matrix, nom, source):
    dossier = sandbox.work / 'sondes-compilateur' / nom
    dossier.mkdir(parents=True)
    fichier = dossier / 'sonde.cs'
    fichier.write_text(source, encoding='utf8')
    sortie = dossier / 'sortie'
    sortie.mkdir()
    config = sandbox.dotnet
    compilateur = f"/dotnet/sdk/{config['sdk']}/Roslyn/bincore/csc.dll"
    commande = ['/dotnet/dotnet', compilateur, '-nologo', '-nostdlib+', '-target:exe', '-out:/out/Sonde.dll']
    commande += [f'-r:{reference}' for reference in config['references']]
    commande += ['/code/sonde.cs']
    montages = sandbox.dotnet_mounts() + ['--dir', '/code', '--ro-bind', str(fichier), '/code/sonde.cs',
                                          '--bind', str(sortie), '/out']
    resultat = sandbox.run(commande, mounts=montages, language='csharp', timeout=40)
    if not resultat.get('ready') or resultat.get('timeout') or resultat.get('overflow'):
        raise RuntimeError(f'Sonde de compilation indisponible : {nom}')
    return {'code_sortie': resultat['exit'], 'diagnostic': resultat['stdout'],
            'stderr_sha256': resultat['stderr_sha256'], 'source': source,
            'source_sha256': empreinte(source), 'binaire_present': (sortie / 'Sonde.dll').is_file()}


def sondes_langage(sandbox, matrix):
    test_litteral = ('using System; using System.Globalization; '
                     'class Article { public Article(string r, string n, double p) '
                     '{ Console.WriteLine(p.ToString("F2", CultureInfo.InvariantCulture)); } } '
                     'class Program { static void Main() { new Article("L-2", "Carte", .75); } }')
    exercice = {'id': 'sonde-litteral-csharp', 'course': 'csharp', 'language': 'csharp',
                'cases': [{'sample': {'stdin': ''}}]}
    sortie = matrix.run_candidate(sandbox, exercice, {'code': test_litteral}, -1, False)
    if sortie.get('compilation', {}).get('etat') != 'reussie' or len(sortie['cells']) != 1:
        raise RuntimeError('Sonde du littéral .75 non compilée')
    cellule = sortie['cells'][0]
    if cellule.get('etat') != 'a_comparer' or normaliser_sortie(cellule['stdout']) != '0.75':
        raise RuntimeError('Sonde du littéral .75 non concluante')
    invalide = compiler_sonde(sandbox, matrix, 'ordre-invalide',
                              'using System; class C<T> where T : class, new(), IComparable {} class Program { static void Main() {} }')
    valide = compiler_sonde(sandbox, matrix, 'ordre-valide',
                            'using System; class C<T> where T : class, IComparable, new() {} class Program { static void Main() {} }')
    if invalide['code_sortie'] == 0 or 'CS0401' not in invalide['diagnostic'] or valide['code_sortie'] != 0:
        raise RuntimeError('Sonde de l’ordre des contraintes non concluante')
    return {'litteral_sans_zero': {'source': test_litteral, 'source_sha256': empreinte(test_litteral),
                                  'compilation': sortie['compilation'], 'sortie': cellule['stdout'],
                                  'precision': 'Constructeur avec paramètre double ; le format propre à la simulation reste non précisé.'},
            'ordre_contraintes_invalide': invalide, 'ordre_contraintes_valide': valide}


def executer_banc(racine, jobs):
    exterieur = controler_exterieur()
    with tempfile.TemporaryDirectory(prefix='revi-csharp-instantane-', dir='/tmp') as temporaire:
        travail = Path(temporaire)
        instantane = travail / 'snapshot'
        manifeste = copier_sources(racine, instantane)
        matrix = charger_module('matrice_csharp_gelee', instantane / 'corrections/outils/sondes/matrice-suspendus/matrice.py')
        ancien_banc = charger_module('banc_fixtures_gelee', instantane / 'corrections/outils/sondes/nouvelles-fixtures-suspendus/banc.py')
        oracle = charger_module('oracle_csharp_gelee', instantane / BASE / 'csharp_lot1_partie3.py')
        dotnet = matrix.dotnet_configuration(instantane)
        if dotnet is None:
            raise RuntimeError('SDK et runtime .NET compatibles introuvables')
        node = Path(shutil.which('node')).resolve(strict=True)
        outils_avant = outils_empreintes(node, dotnet)
        sandbox = ancien_banc.sandbox_without_git(matrix, travail, node, dotnet)
        isolation = matrix.preflight(sandbox)
        isolation_complete = ancien_banc.candidate_preflight(sandbox, matrix)
        matrix.selftest_execution(sandbox, False)
        extraction = subprocess.run([str(node), str(instantane / BASE / 'extraire_csharp_lot1_partie3.js'), str(instantane)],
                                    capture_output=True, text=True, timeout=90, check=False)
        if extraction.returncode != 0:
            raise RuntimeError('Extraction des sources impossible : ' + extraction.stderr[:2000])
        catalogue = json.loads(extraction.stdout)
        exercices = catalogue['exercices']
        if (len(exercices) != 17 or any(not preuve['valide'] for exercice in exercices for preuve in exercice['nouveaute']) or
                any(not sonde['nouveaute']['valide'] for exercice in exercices for sonde in exercice['sondes_conditionnelles'])):
            raise RuntimeError('Nouveauté littérale non établie pour toutes les entrées')
        mutants = json.loads((instantane / BASE / 'mutants_csharp_lot1_partie3.json').read_text(encoding='utf8'))
        if set(mutants) != {exercice['id'] for exercice in exercices}:
            raise RuntimeError('Inventaire des mutants incohérent')
        if (normaliser_sortie(' A  \r\n\n') != ' A  ' or normaliser_sortie(' A ') == normaliser_sortie(' A')):
            raise RuntimeError('Autocontrôle du comparateur échoué')
        attendus_verifies = verifier_attendus(exercices, oracle)
        premier = exercices[0]
        cas_altere = dict(premier['cas'][0], attendu=premier['cas'][0]['attendu'] + '\nFAUX')
        try:
            verifier_attendus([{'id': premier['id'], 'cas': [cas_altere]}], oracle)
        except RuntimeError:
            attendu_faux_rejete = True
        else:
            raise RuntimeError('L’attendu volontairement incorrect a été accepté')
        try:
            oracle.calculer('csb2-inconnu', '')
        except KeyError:
            oracle_absent_rejete = True
        else:
            raise RuntimeError('Oracle absent accepté')
        sondes = sondes_langage(sandbox, matrix)
        travaux = []
        for exercice in exercices:
            definitions = mutants[exercice['id']]
            if len(definitions) != 2:
                raise RuntimeError(f'Deux mutants requis : {exercice["id"]}')
            programme = {'id': exercice['id'], 'course': 'csharp', 'language': 'csharp', 'cases': construire_cas(exercice)}
            travaux.append((exercice, programme, {'code': exercice['solution']}, -1, None))
            codes = set()
            for index, definition in enumerate(definitions):
                if exercice['solution'].count(definition['avant']) != 1:
                    raise RuntimeError(f'Mutation non univoque : {exercice["id"]} {definition["nom"]}')
                code = exercice['solution'].replace(definition['avant'], definition['apres'], 1)
                if code == exercice['solution'] or code in codes:
                    raise RuntimeError('Mutant identique au corrigé ou à un autre mutant')
                codes.add(code)
                travaux.append((exercice, programme, {'code': code}, index, definition))
        executions = {}
        with concurrent.futures.ThreadPoolExecutor(max_workers=jobs) as pool:
            futures = {pool.submit(matrix.run_candidate, sandbox, programme, candidat, index, False):
                       (exercice, candidat, index, definition)
                       for exercice, programme, candidat, index, definition in travaux}
            for futur in concurrent.futures.as_completed(futures):
                exercice, candidat, index, definition = futures[futur]
                executions[(exercice['id'], index)] = (candidat, definition, futur.result())
                if len(executions) % 9 == 0:
                    print(f'Programmes C# compilés et exécutés : {len(executions)}/{len(travaux)}', file=sys.stderr, flush=True)
        resultats = {}
        for exercice in exercices:
            identifiant = exercice['id']
            _, _, brut = executions[(identifiant, -1)]
            corrige = synthese_execution(exercice, brut)
            variantes = []
            for index in range(2):
                candidat, definition, brut = executions[(identifiant, index)]
                execution = synthese_execution(exercice, brut)
                discriminants = [numero + 1 for numero in range(2)
                                 if corrige['nouveaux'][numero]['etat'] == 'conforme' and
                                 execution['nouveaux'][numero]['etat'] == 'sortie_incorrecte']
                variantes.append({'definition': definition, 'code': candidat['code'], 'code_sha256': empreinte(candidat['code']),
                                  'execution': execution, 'cas_discriminants': discriminants,
                                  'rejet_attribuable': bool(discriminants)})
            cas = [{**definition, 'nouveaute': exercice['nouveaute'][index],
                    'reference_verifiee': True, 'corrige': corrige['nouveaux'][index]}
                   for index, definition in enumerate(exercice['cas'])]
            sondes_conditionnelles = [{**definition, 'reference_verifiee': True,
                                      'corrige': corrige['sondes_conditionnelles'][index]}
                                     for index, definition in enumerate(exercice['sondes_conditionnelles'])]
            resultats[identifiant] = {
                'source': 'server/exercises/csharp.js', 'corrige_sha256': exercice['solution_sha256'],
                'precision': exercice['precision'],
                'domaine_fini_ou_atomique_deja_couvert': identifiant in DOMAINES_FINIS,
                'cas': cas, 'sondes_conditionnelles': sondes_conditionnelles, 'compilation_corrige': corrige['compilation'],
                'historiques_corrige': corrige['historiques'], 'mutants': variantes,
            }
        etats_corriges = Counter(cas['corrige']['etat'] for resultat in resultats.values() for cas in resultat['cas'])
        etats_sondes = Counter(sonde['corrige']['etat'] for resultat in resultats.values()
                               for sonde in resultat['sondes_conditionnelles'])
        toutes_variantes = [variante for resultat in resultats.values() for variante in resultat['mutants']]
        etats_historiques_corriges = Counter(preuve['etat'] for resultat in resultats.values()
                                            for preuve in resultat['historiques_corrige']['preuves'])
        etats_historiques_mutants = Counter(preuve['etat'] for variante in toutes_variantes
                                           for preuve in variante['execution']['historiques']['preuves'])
        survivants_historiques = sum(variante['execution']['historiques']['etats'].get('conforme', 0) ==
                                     variante['execution']['historiques']['nombre'] for variante in toutes_variantes)
        controles_nouveaux = sum(len(resultat['cas']) for resultat in resultats.values())
        controles_conditionnels = sum(len(resultat['sondes_conditionnelles']) for resultat in resultats.values())
        controles_historiques = sum(resultat['historiques_corrige']['nombre'] +
                                  sum(variante['execution']['historiques']['nombre'] for variante in resultat['mutants'])
                                  for resultat in resultats.values())
        modifiees = sources_modifiees(racine, manifeste)
        outils_apres = outils_empreintes(node, dotnet)
        complet = (controles_nouveaux == 34 and controles_conditionnels == 2 and len(toutes_variantes) == 34 and
                    all(variante['rejet_attribuable'] for variante in toutes_variantes) and
                    all(resultat['compilation_corrige']['etat'] == 'reussie' for resultat in resultats.values()) and
                    all(cas['corrige']['etat'] in ('conforme', 'sortie_incorrecte')
                        for resultat in resultats.values() for cas in resultat['cas']) and
                    all(sonde['corrige']['etat'] in ('conforme', 'sortie_incorrecte')
                        for resultat in resultats.values() for sonde in resultat['sondes_conditionnelles']) and
                    all(cas['etat'] in ('conforme', 'sortie_incorrecte')
                        for variante in toutes_variantes for cas in variante['execution']['nouveaux']) and
                    all(sonde['etat'] in ('conforme', 'sortie_incorrecte')
                        for variante in toutes_variantes for sonde in variante['execution']['sondes_conditionnelles']) and
                    set(etats_historiques_corriges) <= {'conforme', 'sortie_incorrecte'} and
                    set(etats_historiques_mutants) <= {'conforme', 'sortie_incorrecte'} and
                    not modifiees and outils_avant == outils_apres)
        divergences = (etats_corriges.get('sortie_incorrecte', 0) + etats_sondes.get('sortie_incorrecte', 0) +
                       etats_historiques_corriges.get('sortie_incorrecte', 0))
        return {
            'etat': 'termine_avec_divergences' if complet and divergences else 'termine_sans_divergence' if complet else 'incomplet',
            'perimetre': {'cours': 'csharp', 'exercices': 17, 'cas_par_exercice': 2,
                           'mutants_par_exercice': 2, 'lot_2': 'non_demarre'},
            'inventaire': catalogue['inventaire'], 'notation_csharp_suspendue': catalogue['notation_csharp_suspendue'],
            'profil_tests_historiques': catalogue['profil_tests'],
            'sources_sha256': manifeste, 'sources_modifiees_apres_copie': modifiees,
            'sources_stables_pendant_copie': True, 'outils': {**outils_avant, 'node_version': isolation['node'],
                                                            'empreintes_stables': outils_avant == outils_apres},
            'isolation': {'exterieure': exterieur, 'candidats': isolation,
                          'controles_complementaires': isolation_complete, 'autocontroles_execution': 'reussis'},
            'autocontroles': {'attendus_manuels_confirmes': attendus_verifies, 'attendu_faux_rejete': attendu_faux_rejete,
                              'oracle_absent_rejete': oracle_absent_rejete, 'comparateur_csharp': 'reussi'},
            'sondes_langage': sondes,
            'totaux': {'cas_nouveaux': controles_nouveaux, 'sondes_conditionnelles': controles_conditionnels,
                       'executions_nouvelles': (controles_nouveaux + controles_conditionnels) * 3,
                       'etats_corriges': dict(etats_corriges), 'etats_sondes_conditionnelles': dict(etats_sondes),
                       'etats_historiques_corriges': dict(etats_historiques_corriges),
                       'mutants': len(toutes_variantes),
                       'mutants_rejetes_sur_cas_ou_corrige_conforme': sum(variante['rejet_attribuable'] for variante in toutes_variantes),
                       'mutants_survivant_tous_les_tests_historiques': survivants_historiques,
                       'executions_historiques': controles_historiques,
                       'etats_historiques_mutants': dict(etats_historiques_mutants)},
            'limites': [
                'Attendus manuels et référence calculée sont dérivés des énoncés ; les libellés fixes dépendent aussi du barème publié.',
                'Les séquences des trois exercices de dispatch, interfaces et pipelines recombinent des réponses atomiques déjà connues ; aucune nouvelle règle indépendante n’est prétendue.',
                'Les contraintes génériques reposent sur un domaine booléen fini ; la nouveauté de la syntaxe légale ne prouve pas une couverture sémantique exhaustive.',
                'Le prix .75 et le dépassement Int64 ont des résultats mathématiques distincts mais leur admissibilité dépend de précisions absentes des énoncés.',
                'La collation de GroupBy est étudiée uniquement sur les catégories ASCII retenues, pas sur toutes les cultures et tous les textes.',
                'La nouveauté vérifie les sources recensées et des représentations textuelles, sans démontrer l’absence de collision sémantique ou de tous les générateurs possibles.',
                'Les mutants sont des variantes concrètes dérivées du corrigé, parfois reprises des tests historiques ; leur rejet ne prouve pas la correction générale.',
                'Les sources sont copiées puis contrôlées par empreinte ; la copie n’est pas un instantané atomique de tout le dépôt.',
                'La notation des exercices reste suspendue ; aucun fichier partagé ni aucun statut agrégé ne sont modifiés.',
            ],
            'exercices': resultats,
        }


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument('--repo', required=True)
    parser.add_argument('--output', required=True)
    parser.add_argument('--jobs', type=int, default=3, choices=range(1, 9))
    options = parser.parse_args()
    debut = maintenant()
    rapport = {'schema': 'revi-csharp-lot1-partie3-v1', 'debut_utc': debut, 'etat': 'incomplet'}
    try:
        racine = Path(options.repo).resolve(strict=True)
        rapport.update(executer_banc(racine, options.jobs))
    except Exception as erreur:
        rapport['erreur'] = {'type': type(erreur).__name__, 'message': str(erreur)}
        print('Banc interrompu : ' + str(erreur), file=sys.stderr, flush=True)
    rapport['termine_utc'] = maintenant()
    cible = Path(options.output)
    if not cible.parent.resolve(strict=True).is_relative_to(Path('/tmp')) or cible.is_symlink() or cible.exists():
        raise RuntimeError('Le rapport doit être un nouveau fichier dans /tmp du lanceur isolé')
    cible.write_text(json.dumps(rapport, ensure_ascii=False, indent=2) + '\n', encoding='utf8')
    print(json.dumps({'etat': rapport['etat'], 'totaux': rapport.get('totaux')}, ensure_ascii=False), file=sys.stderr, flush=True)
    return 0 if rapport['etat'] == 'termine_sans_divergence' else 1 if rapport['etat'] == 'termine_avec_divergences' else 2


if __name__ == '__main__':
    raise SystemExit(main())

import importlib.util
import json
from collections import Counter
from datetime import datetime, timezone
from pathlib import Path


ROOT = Path('/trusted')


def importer(nom, fichier):
    specification = importlib.util.spec_from_file_location(nom, ROOT / fichier)
    module = importlib.util.module_from_spec(specification)
    specification.loader.exec_module(module)
    return module


banc = importer('banc_generalisation', 'banc.py')


def main():
    banc.controler_enveloppe()
    banc.initialiser_nss()
    isolation = banc.verification_isolation()
    paquet = json.loads((ROOT / 'cas_admin_vm_complement.json').read_text(encoding='utf-8'))
    precedents = json.loads((ROOT / 'cas_admin_vm.json').read_text(encoding='utf-8'))['exercices']
    definitions = paquet['exercices']
    identifiants = {definition['id'] for definition in definitions}
    non_evalues = paquet['non_evalues']
    tous = {f'vm2-c{chapitre}-e{numero}' for chapitre in range(1, 7) for numero in range(1, 4)}
    if len(definitions) != 11 or len(identifiants) != 11 or len(non_evalues) != 7 or identifiants | {item['id'] for item in non_evalues} != tous:
        raise ValueError('Périmètre incomplet ou dupliqué')
    catalogue = {item['id']: item for item in banc.charger_catalogue() if item['id'] in identifiants}
    if set(catalogue) != identifiants:
        raise ValueError('Catalogue incomplet')
    definitions_precedentes = {item['id']: item for item in precedents}
    lignes = []
    for definition in definitions:
        identifiant = definition['id']
        precedent = definitions_precedentes[identifiant]
        ancien_canon = {banc.canonique(cas['entree'], definition['codec']) for cas in precedent['cas'] + precedent.get('cas_complementaires', [])}
        if any(banc.canonique(cas['entree'], definition['codec']) in ancien_canon for cas in definition['cas']):
            raise ValueError('Nouveau témoin déjà utilisé dans le banc précédent : ' + identifiant)
        exercice = catalogue[identifiant]
        if exercice['language'] != 'powershell':
            raise ValueError('Langage inattendu : ' + identifiant)
        resultat = banc.auditer_exercice(exercice, {**definition, 'paquet_oracle': 'admin_vm.py'})
        lignes.append({'id': identifiant, 'audit': resultat, 'precedents_controles': len(ancien_canon)})
    comptes = Counter(ligne['audit']['etat'] for ligne in lignes)
    reussi = comptes == {'réussi': 11}
    rapport = {
        'etat': 'réussi' if reussi else 'échoué',
        'date_utc': datetime.now(timezone.utc).isoformat(),
        'isolation': isolation,
        'bilan': {'fiches': len(lignes), 'temoins': sum(len(item['cas']) for item in definitions), 'etats': dict(comptes), 'fiches_sans_nouveaute_independante': len(non_evalues)},
        'non_evalues': non_evalues,
        'empreintes': {nom: banc.digest((ROOT / nom).read_bytes()) for nom in ('cas_admin_vm_complement.json', 'cas_admin_vm.json', 'admin_vm.py', 'admin_vm_complement_banc.py', 'banc.py')},
        'limites': ['Les témoins sont nouveaux parmi les exemples, tests actifs, sources vérifiées et cas du banc antérieur ; cela ne prouve pas une correction universelle.', 'Les erreurs sont exercées séparément dans admin-vm-integre-lot1-partie3.json ; ce complément ne rejoue pas les variantes.'],
        'exercices': lignes
    }
    print(json.dumps(rapport, ensure_ascii=False, indent=2))
    return 0 if reussi else 1


if __name__ == '__main__':
    try:
        raise SystemExit(main())
    except Exception as erreur:
        print(json.dumps({'etat': 'erreur_infrastructure', 'raison': str(erreur)}, ensure_ascii=False))
        raise SystemExit(2)

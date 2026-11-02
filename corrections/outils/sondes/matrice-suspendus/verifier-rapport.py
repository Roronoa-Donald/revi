import argparse
import hashlib
import itertools
import json
import re
import sys
from collections import Counter
from pathlib import Path


COURSES = ('csharp', 'docker', 'b3-linux', 'b3-github', 'b1-sql')
VALID_STATES = {'accepte', 'mauvaise_sortie', 'source_invalide', 'echec_execution', 'non_evalue'}


def require(condition, message):
    if not condition:
        raise ValueError(message)


def file_sha(path):
    digest = hashlib.sha256()
    with path.open('rb') as file:
        for block in iter(lambda: file.read(1024 * 1024), b''):
            digest.update(block)
    return digest.hexdigest()


def decision(states):
    if 'mauvaise_sortie' in states:
        return 'rejet_mauvaise_sortie'
    if 'source_invalide' in states:
        return 'rejet_source'
    if 'echec_execution' in states:
        return 'rejet_execution'
    if 'non_evalue' in states:
        return 'non_evalue'
    return 'accepte_tous_les_cas'


def verify(path, repo):
    report = json.loads(path.read_text(encoding='utf8'))
    require(report['schema'] == 'revi.matrice-rejet-lot1.v1', 'schéma inconnu')
    require(set(report['comptes_par_cours']) == set(COURSES), 'périmètre des cours incohérent')
    summaries = {course: Counter() for course in COURSES}
    identifiers = set()
    for exercise in report['exercices']:
        identifier = exercise['id']
        course = exercise['cours']
        require(course in summaries and identifier not in identifiers, 'identifiant ou cours incohérent')
        identifiers.add(identifier)
        rows = exercise['matrice']
        variants = exercise['variantes']
        require(len(variants) >= 2 and len(rows) == exercise['cas_actifs'] and len(rows) > 0,
                f'cardinalité invalide : {identifier}')
        require([item['numero'] for item in variants] == list(range(1, len(variants) + 1)),
                f'variantes mal numérotées : {identifier}')
        summary = summaries[course]
        summary['exercices'] += 1
        summary['cas_actifs'] += len(rows)
        summary['executions_prevues'] += len(rows) * (1 + len(variants))
        reference = []
        vectors = [[] for _ in variants]
        all_cells = []
        for row_index, row in enumerate(rows):
            require(row['numero'] == row_index + 1, f'cas mal numéroté : {identifier}')
            require(re.fullmatch(r'[0-9a-f]{64}', row['entree_sha256']) is not None and
                    re.fullmatch(r'[0-9a-f]{64}', row['attendu_sha256']) is not None,
                    f'empreinte de cas absente : {identifier}')
            require([cell['numero'] for cell in row['variantes']] == list(range(1, len(variants) + 1)),
                    f'cellule de variante absente : {identifier}')
            reference.append(row['corrige']['etat'])
            all_cells.append(row['corrige'])
            for index, cell in enumerate(row['variantes']):
                vectors[index].append(cell['etat'])
                all_cells.append(cell)
        for cell in all_cells:
            require(cell['etat'] in VALID_STATES and isinstance(cell['execute'], bool),
                    f'état ou marqueur d’exécution invalide : {identifier}')
            if cell['etat'] in {'accepte', 'mauvaise_sortie', 'source_invalide'}:
                require(cell['execute'], f'comparaison sans exécution : {identifier}')
        summary['executions_effectives'] += sum(cell['execute'] for cell in all_cells)
        summary['cellules_non_evaluees'] += sum(cell['etat'] == 'non_evalue' for cell in all_cells)
        summary['cellules_echec_execution'] += sum(cell['etat'] == 'echec_execution' for cell in all_cells)
        baseline_ok = all(state == 'accepte' for state in reference)
        require(exercise['corrige']['conforme_sur_tous_les_cas'] == baseline_ok and
                exercise['corrige']['cellules'] == dict(Counter(reference)),
                f'bilan du corrigé incohérent : {identifier}')
        summary['corriges_conformes'] += baseline_ok
        pair_proofs = []
        if baseline_ok:
            for first, second in itertools.combinations(range(len(variants)), 2):
                pair_proofs.append({
                    'variantes': [first + 1, second + 1],
                    'temoins_premiere_seule': [case + 1 for case in range(len(rows))
                                               if vectors[first][case] == 'mauvaise_sortie' and vectors[second][case] == 'accepte'],
                    'temoins_seconde_seule': [case + 1 for case in range(len(rows))
                                             if vectors[second][case] == 'mauvaise_sortie' and vectors[first][case] == 'accepte']
                })
        require(exercise['temoins_par_paire'] == pair_proofs, f'témoins de paire incohérents : {identifier}')
        if pair_proofs and pair_proofs[0]['temoins_premiere_seule'] and pair_proofs[0]['temoins_seconde_seule']:
            summary['fiches_deux_temoins_paire'] += 1
        for index, (variant, vector) in enumerate(zip(variants, vectors)):
            require(variant['cellules'] == dict(Counter(vector)) and variant['verdict'] == decision(vector),
                    f'bilan de variante incohérent : {identifier}/{index + 1}')
            require(re.fullmatch(r'[0-9a-f]{64}', variant['source_sha256']) is not None,
                    f'empreinte variante absente : {identifier}')
            exclusive = []
            necessary = []
            if baseline_ok:
                for case, state in enumerate(vector):
                    if state == 'mauvaise_sortie' and all(vectors[other][case] == 'accepte'
                                                          for other in range(len(vectors)) if other != index):
                        exclusive.append(case + 1)
                incorrect = [case for case, state in enumerate(vector) if state == 'mauvaise_sortie']
                if len(incorrect) == 1 and all(state == 'accepte' for case, state in enumerate(vector) if case != incorrect[0]):
                    necessary = [incorrect[0] + 1]
            require(variant['temoins_exclusifs_toutes_variantes'] == exclusive and
                    variant['temoins_necessite_relative'] == necessary,
                    f'témoins exclusifs incohérents : {identifier}/{index + 1}')
            summary['variantes'] += 1
            summary['variantes_rejetees_mauvaise_sortie'] += variant['verdict'] == 'rejet_mauvaise_sortie'
            summary['variantes_rejetees_execution_seulement'] += variant['verdict'] == 'rejet_execution'
            summary['variantes_acceptees'] += variant['verdict'] == 'accepte_tous_les_cas'
            summary['variantes_avec_non_evalue'] += 'non_evalue' in vector
            summary['temoins_exclusifs_toutes_variantes'] += len(exclusive)
            summary['temoins_necessite_relative'] += len(necessary)
    require(len(identifiers) == 90, 'inventaire différent de 90 fiches')
    for course in COURSES:
        require(summaries[course]['exercices'] == 18, f'cardinalité du cours incorrecte : {course}')
        for key, expected in report['comptes_par_cours'][course].items():
            require(summaries[course][key] == expected, f'compte incorrect : {course}/{key}')
    for key, expected in report['total'].items():
        require(sum(summary[key] for summary in summaries.values()) == expected, f'total incorrect : {key}')
    changed = []
    if repo:
        root = repo.resolve(strict=True)
        for relative, expected in report['provenance']['fichiers_sha256'].items():
            source = root / relative
            if source.is_symlink() or not source.is_file() or not source.resolve().is_relative_to(root) or file_sha(source) != expected:
                changed.append(relative)
    package = Path(__file__).resolve().parent
    for name, expected in report['provenance']['banc_sha256'].items():
        if not (package / name).is_file() or file_sha(package / name) != expected:
            changed.append('banc/' + name)
    require(not changed, 'fichiers modifiés après le rejeu : ' + ', '.join(changed))
    require(not report['provenance']['sources_modifiees_apres_copie'], 'sources modifiées pendant le rejeu')
    require(not report['provenance']['banc_modifie_durant_rejeu'], 'banc modifié pendant le rejeu')
    return report


def main():
    parser = argparse.ArgumentParser(description='Contrôle indépendant de cohérence arithmétique du rapport.')
    parser.add_argument('rapport', type=Path)
    parser.add_argument('--repo', type=Path, help='vérifie également les empreintes des fichiers du dépôt')
    args = parser.parse_args()
    report = verify(args.rapport, args.repo)
    total = report['total']
    print(f"Rapport cohérent : {total['exercices']} fiches, {total['cas_actifs']} cas, "
          f"{total['executions_effectives']} exécutions, {total['variantes']} variantes, "
          f"{total['fiches_deux_temoins_paire']} doubles témoins de paire.")
    print('Vérification structurelle et arithmétique uniquement ; aucun oracle indépendant.')
    return 0 if report['etat'] == 'complet' else 1


if __name__ == '__main__':
    try:
        sys.exit(main())
    except (KeyError, TypeError, ValueError, OSError) as error:
        print(f'Rapport non vérifié : {error}', file=sys.stderr)
        sys.exit(2)

import json
from collections import Counter


first_observer = ['O'] * 5 + ['N'] * 95
second_observer = ['N'] * 5 + ['O'] * 5 + ['N'] * 90
categories = set(first_observer) | set(second_observer)
observed = sum(first == second for first, second in zip(first_observer, second_observer)) / len(first_observer)
expected = sum(first_observer.count(category) * second_observer.count(category) for category in categories) / len(first_observer) ** 2
kappa = (observed - expected) / (1 - expected)

population = [('A', 'revenu_eleve')] * 20 + [('A', 'autre')] * 80 + [('B', 'revenu_eleve')] * 20 + [('B', 'autre')] * 80
sample = [('A', 'revenu_eleve')] * 10 + [('B', 'revenu_eleve')] * 10
population_quota = Counter(group for group, _ in population)
sample_quota = Counter(group for group, _ in sample)
population_high = sum(income == 'revenu_eleve' for _, income in population) / len(population)
sample_high = sum(income == 'revenu_eleve' for _, income in sample) / len(sample)

target = 1
strata = [100, 100, 100]
allocation = [round(target * size / sum(strata)) for size in strata]
modalities = [1, 2, 2, 3, 3]

result = {
    'accord_interobservateurs': {
        'effectif': len(first_observer),
        'accord_brut': observed,
        'accord_aleatoire_estime': expected,
        'kappa_cohen_non_pondere': kappa,
        'limite': 'illustration synthétique ; un seul indice ne valide ni ne réfute à lui seul la grille',
    },
    'quotas_et_biais': {
        'quotas_population': dict(population_quota),
        'quotas_echantillon': dict(sample_quota),
        'proportion_revenu_eleve_population': population_high,
        'proportion_revenu_eleve_echantillon': sample_high,
    },
    'arrondis_strates': {'n_cible': target, 'populations': strata, 'effectifs_arrondis': allocation, 'total': sum(allocation)},
    'modalites': {'valeurs': modalities, 'modalites_distinctes': sorted(set(modalities))},
}
assert observed == 0.9 and kappa < 0
assert all(sample_quota[group] / len(sample) == population_quota[group] / len(population) for group in population_quota)
assert population_high == 0.2 and sample_high == 1
assert sum(allocation) != target and len(set(modalities)) == 3
print(json.dumps(result, ensure_ascii=False, indent=2))

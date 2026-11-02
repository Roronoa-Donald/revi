from collections import Counter
from fractions import Fraction
from itertools import product


def allocate(populations, sample):
    total = sum(populations)
    if any(not isinstance(size, int) or size < 0 for size in populations):
        raise ValueError('Tailles de strates invalides')
    if not isinstance(sample, int) or sample < 1 or sample > total:
        raise ValueError('Taille cible impossible sans remplacement')
    quotas = [Fraction(sample * size, total) for size in populations]
    allocated = [quota.numerator // quota.denominator for quota in quotas]
    remainder = sample - sum(allocated)
    ranking = sorted(range(len(populations)), key=lambda index: (-(quotas[index] - allocated[index]), index))
    for index in ranking[:remainder]:
        allocated[index] += 1
    if sum(allocated) != sample or any(value < 0 or value > size for value, size in zip(allocated, populations)):
        raise AssertionError('Contrainte de répartition non respectée')
    return allocated


def allocate_with_minima(populations, minima, sample):
    if any(not isinstance(size, int) or size < 0 for size in populations):
        raise ValueError('Tailles de strates invalides')
    if len(populations) != len(minima) or any(not isinstance(minimum, int) or minimum < 0 or minimum > size for minimum, size in zip(minima, populations)):
        raise ValueError('Minima incompatibles avec les strates')
    if not isinstance(sample, int) or sample < 1 or sample < sum(minima) or sample > sum(populations):
        raise ValueError('Taille cible incompatible avec les minima ou les capacités')
    remaining = sample - sum(minima)
    if remaining == 0:
        return list(minima)
    residual = [size - minimum for size, minimum in zip(populations, minima)]
    extras = allocate(residual, remaining)
    return [minimum + extra for minimum, extra in zip(minima, extras)]


modalities = Counter([1, 1, 2, 2, 3])
highest_count = max(modalities.values())
modes = [value for value, count in modalities.items() if count == highest_count]
assert modes == [1, 2]
print(f'F08 : effectifs {dict(modalities)}, modes {modes}')

classes = [(150, 160, False), (160, 170, False), (170, 180, False), (180, 190, True)]
for boundary in [150, 160, 170, 180, 190]:
    memberships = [index + 1 for index, (lower, upper, inclusive) in enumerate(classes)
                   if lower <= boundary < upper or inclusive and boundary == upper]
    assert len(memberships) == 1
    print(f'F160 : borne {boundary} -> classe {memberships[0]} uniquement')

values = [0, 1, 2, 2, 5]
mean = Fraction(sum(values), len(values))
median = values[len(values) // 2]
counts = Counter(values)
assert mean == median == 2 and counts[0] != counts[4]
print(f'F161 : moyenne={mean}, médiane={median}, effectifs de 0 et 4={counts[0]} et {counts[4]}')

weighted_mean = Fraction(1 * 5 + 3 * 15, 4)
unweighted_mean = Fraction(5 + 15, 2)
assert weighted_mean == Fraction(25, 2) and unweighted_mean == 10
print(f'F162 : centres 5 et 15, effectifs 1 et 3 -> moyenne pondérée={float(weighted_mean):.1f}, non pondérée={float(unweighted_mean):.1f}')

values = [1, 2, 2, 3, 3]
assert len(set(values)) == 3
print(f'F175 : {len(values)} observations, {len(set(values))} modalités, effectifs {dict(Counter(values))}')

observed = Fraction(90, 100)
expected = Fraction(95, 100) ** 2 + Fraction(5, 100) ** 2
kappa = (observed - expected) / (1 - expected)
assert observed == Fraction(9, 10) and expected == Fraction(181, 200) and kappa == Fraction(-1, 19)
print(f'F176 : matrice [[90, 5], [5, 0]], P0={float(observed):.3f}, Pe={float(expected):.3f}, kappa={kappa} ≈ {float(kappa):.6f}')
print('F176 : si Pe=1, le dénominateur vaut 0 et le kappa est indéfini')

population = {'A': (10, 40), 'B': (10, 40)}
sample = {'A': (5, 0), 'B': (5, 0)}
population_high = Fraction(sum(group[0] for group in population.values()), sum(sum(group) for group in population.values()))
sample_high = Fraction(sum(group[0] for group in sample.values()), sum(sum(group) for group in sample.values()))
assert population_high == Fraction(1, 5) and sample_high == 1
assert sum(population['A']) == sum(population['B']) and sum(sample['A']) == sum(sample['B'])
print(f'F177 : quotas A/B=50/50 dans les deux populations ; revenus élevés={float(population_high) * 100:.0f}% contre {float(sample_high) * 100:.0f}%')

assert allocate([1, 1, 1], 1) == [1, 0, 0]
assert allocate([1, 2, 4], 6) == [1, 2, 3]
assert allocate([0, 2, 0], 2) == [0, 2, 0]
print('F178 : n=1, strates [1,1,1] -> [1,0,0] ; n=6, strates [1,2,4] -> [1,2,3]')
checked = 0
for sizes in product(range(8), repeat=3):
    for size in range(1, sum(sizes) + 1):
        allocate(sizes, size)
        checked += 1
print(f'F178 : {checked} allocations exhaustives à trois strates (tailles 0 à 7) respectent somme et capacités')
try:
    allocate([1, 1, 1], 4)
    raise AssertionError('Une taille supérieure à la population a été acceptée')
except ValueError:
    print('F178 : n=4 pour N=3 est rejeté ; des minima [1,1,1] sont impossibles pour n=1')

assert allocate_with_minima([1, 2, 4], [1, 0, 1], 5) == [1, 1, 3]
bounded = 0
for sizes in product(range(5), repeat=3):
    for minima in product(*(range(size + 1) for size in sizes)):
        for size in range(max(1, sum(minima)), sum(sizes) + 1):
            result = allocate_with_minima(sizes, minima, size)
            assert sum(result) == size
            assert all(minimum <= value <= maximum for minimum, value, maximum in zip(minima, result, sizes))
            bounded += 1
print(f'F178 : {bounded} allocations avec minima et capacités respectent toutes les bornes')
try:
    allocate_with_minima([1, 1, 1], [1, 1, 1], 1)
    raise AssertionError('Des minima impossibles ont été acceptés')
except ValueError:
    print('F178 : minima [1,1,1] pour n=1 rejetés comme non réalisables')

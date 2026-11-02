from fractions import Fraction
import json
import math


def pgcd_du_cours(first, second):
    if second == 0:
        return first
    return pgcd_du_cours(second, first % second)


def main():
    scope = {'input': lambda: '1 2 3'}
    try:
        exec('for index in range(3):\n    ligne = [int(valeur) for valeur in input().split()]\n    matrice.append(ligne)', scope)
        matrix_result = 'pas d’erreur'
    except NameError as error:
        matrix_result = type(error).__name__
    matrix = [[1, 2], [3, 4]]
    visited = []
    for index in range(4):
        visited.append(matrix[index // 2][index % 2])
    original_list = []

    def mutate(argument):
        argument.append(1)

    mutate(original_list)
    results = {
        'python_moins_sept_modulo_trois': -7 % 3,
        'syracuse_premiere_etape_de_zero': 0 // 2,
        'matrice_sans_initialisation': matrix_result,
        'matrice_parcourue_avec_une_boucle_explicite': visited,
        'pgcd_negatif_cours': pgcd_du_cours(-8, 0),
        'pgcd_negatif_convention_usuelle': math.gcd(-8, 0),
        'mutation_parametre_liste_vue_par_appelant': original_list,
        'approche_de_zero_apres_12_etapes': str(Fraction(1, 2**12)),
    }
    print(json.dumps(results, ensure_ascii=False, indent=2))


if __name__ == '__main__':
    main()

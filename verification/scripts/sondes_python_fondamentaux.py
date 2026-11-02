import json


def probe_syntax(source):
    try:
        compile(source, '<exemple>', 'exec')
        return 'syntaxe valide'
    except SyntaxError as error:
        return f'{type(error).__name__}: {error.msg}'


def append_with_falsy_default(value, items=None):
    items = items or []
    items.append(value)
    return items


def main():
    text = 'Bonjour Python'
    vowels = 'aeiouy'
    initial_list = []
    result_list = append_with_falsy_default(1, initial_list)
    results = {
        'voyelles_bonjour_python': {
            'caracteres': [character for character in text.lower() if character in vowels],
            'compte': sum(character in vowels for character in text.lower()),
        },
        'int_avec_espaces_et_saut_de_ligne': int('Jean, 15\n'.split(',')[1]),
        'virgule_decimale': {'type': type((12.5 * 1, 18)).__name__, 'resultat': (12.5 * 1, 18)},
        'division_entiere': {'flottant': 7.0 // 2, 'type': type(7.0 // 2).__name__,
                             'negative': -3 // 2},
        'qcm_while': probe_syntax('x = 10; while x > 0: x -= 3'),
        'qcm_boucles_imbriquees': probe_syntax('for i in range(2): for j in range(3): print("abc")'),
        'parametre_liste_vide': {'liste_fournie_apres_appel': initial_list,
                                 'liste_renvoyee': result_list,
                                 'meme_objet': initial_list is result_list},
    }
    print(json.dumps(results, ensure_ascii=False, indent=2))


if __name__ == '__main__':
    main()

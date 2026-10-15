/**
 * Exercices du chapitre 6 — UI/UX Design B2.
 * Accessibilité Numérique Universelle & Standards WCAG 2.1.
 */
'use strict';

module.exports = [
  {
    id: 'ux2-c6-e1',
    chapter: 6,
    title: 'Calculateur de contraste colorimétrique formel WCAG 2.1',
    level: 'n1',
    language: 'python',
    goal: 'Calculer la luminance relative et le ratio de contraste formel WCAG pour valider les seuils AA et AAA.',
    brief: '<p>Le script lit sur l\'entrée standard des paires de codes hexadécimaux <code>&lt;#COUL1&gt; &lt;#COUL2&gt;</code>.<br>\nSelon la formule formelle du W3C / WCAG 2.1 :<br>\n1. Convertir chaque canal R, G, B normalisé sur [0, 1] : si <code>c &lt;= 0.04045</code>, <code>v = c / 12.92</code>, sinon <code>v = ((c + 0.055) / 1.055) ** 2.4</code>.<br>\n2. Luminance : <code>L = 0.2126 * r + 0.7152 * g + 0.0722 * b</code>.<br>\n3. Ratio : <code>(Lmax + 0.05) / (Lmin + 0.05)</code> (arrondi à 2 décimales).<br>\n4. Niveaux de conformité :<br>\n- Texte normal : <code>AAA</code> si ratio &gt;= 7.00, <code>AA</code> si ratio &gt;= 4.50, sinon <code>ECHEC</code>.<br>\n- Grand texte : <code>AAA</code> si ratio &gt;= 4.50, <code>AA</code> si ratio &gt;= 3.00, sinon <code>ECHEC</code>.<br>\nAfficher :<br>\n<code>CONTRASTE: &lt;ratio:.2f&gt;:1 | NORMAL: &lt;ECHEC|AA|AAA&gt; | LARGE: &lt;ECHEC|AA|AAA&gt;</code></p>',
    starter: `import sys

lignes = [l.strip() for l in sys.stdin.read().splitlines() if l.strip()]

# À compléter : calculer la luminance relative et le ratio WCAG
`,
    hints: [
      'Pour convertir un hexadécimal #RRGGBB : int(h[1:3], 16), int(h[3:5], 16), int(h[5:7], 16).',
      'Le ratio compare toujours la couleur la plus claire (Lmax) à la plus sombre (Lmin).'
    ],
    examples: [
      {
        stdin: '#000000 #ffffff\n#777777 #ffffff\n#aaaaaa #ffffff',
        expected: 'CONTRASTE: 21.00:1 | NORMAL: AAA | LARGE: AAA\nCONTRASTE: 4.48:1 | NORMAL: ECHEC | LARGE: AA\nCONTRASTE: 2.32:1 | NORMAL: ECHEC | LARGE: ECHEC',
        note: '#777777 sur blanc échoue de peu au texte normal (4.48 < 4.5) mais passe en grand texte.'
      }
    ],
    tests: [
      {
        label: 'Noir et blanc pur',
        stdin: '#ffffff #000000',
        expected: 'CONTRASTE: 21.00:1 | NORMAL: AAA | LARGE: AAA'
      },
      {
        label: 'Couleurs de la marque (Teal accessible sur blanc)',
        stdin: '#0f766e #ffffff',
        expected: 'CONTRASTE: 5.47:1 | NORMAL: AA | LARGE: AAA'
      },
      {
        label: 'Bleu hyperlien classique sur fond sombre',
        stdin: '#0000ff #000000',
        expected: 'CONTRASTE: 2.44:1 | NORMAL: ECHEC | LARGE: ECHEC'
      },
      {
        label: 'Seuils limites AA 4.54:1 et AAA 7.12:1',
        stdin: '#595959 #ffffff\n#333333 #ffffff',
        expected: 'CONTRASTE: 7.00:1 | NORMAL: AAA | LARGE: AAA\nCONTRASTE: 12.63:1 | NORMAL: AAA | LARGE: AAA'
      }
    ],
    solution: `import sys

def luminance(hex_str):
    h = hex_str.lstrip('#')
    r_val = int(h[0:2], 16) / 255.0
    g_val = int(h[2:4], 16) / 255.0
    b_val = int(h[4:6], 16) / 255.0

    def canal(c):
        return c / 12.92 if c <= 0.04045 else ((c + 0.055) / 1.055) ** 2.4

    r = canal(r_val)
    g = canal(g_val)
    b = canal(b_val)
    return 0.2126 * r + 0.7152 * g + 0.0722 * b

lignes = [l.strip() for l in sys.stdin.read().splitlines() if l.strip()]

for l in lignes:
    parties = l.split()
    if len(parties) != 2:
        continue
    c1, c2 = parties[0], parties[1]
    l1 = luminance(c1)
    l2 = luminance(c2)
    l_max = max(l1, l2)
    l_min = min(l1, l2)

    ratio = (l_max + 0.05) / (l_min + 0.05)
    ratio_arrondi = round(ratio, 2)

    # Normal : AAA >= 7.0, AA >= 4.5
    if ratio_arrondi >= 7.00:
        norm = "AAA"
    elif ratio_arrondi >= 4.50:
        norm = "AA"
    else:
        norm = "ECHEC"

    # Large : AAA >= 4.5, AA >= 3.0
    if ratio_arrondi >= 4.50:
        large = "AAA"
    elif ratio_arrondi >= 3.00:
        large = "AA"
    else:
        large = "ECHEC"

    print(f"CONTRASTE: {ratio_arrondi:.2f}:1 | NORMAL: {norm} | LARGE: {large}")
`
  },
  {
    id: 'ux2-c6-e2',
    chapter: 6,
    title: 'Validateur d’attributs sémantiques et textes alternatifs',
    level: 'n2',
    language: 'python',
    goal: 'Auditer la conformité des attributs d’accessibilité sur les images (balise alt) et les boutons interactifs (nom accessible).',
    brief: '<p>Le script lit sur l\'entrée standard des balises HTML simplifiées (une par ligne).<br>\nRègles de validation :<br>\n1. Balise <code>&lt;img ...&gt;</code> :<br>\n- Si <code>alt=""</code> (chaîne vide explicite) : afficher <code>&lt;Balise&gt; -&gt; CONFORME (Image decorative)</code><br>\n- Si <code>alt="..."</code> contient du texte non vide : afficher <code>&lt;Balise&gt; -&gt; CONFORME (Image informative)</code><br>\n- Si l\'attribut <code>alt</code> est absent : afficher <code>&lt;Balise&gt; -&gt; NON_CONFORME (Alt manquant)</code><br>\n2. Balise <code>&lt;button ...&gt;...&lt;/button&gt;</code> :<br>\n- Si elle contient du texte entre les balises ou possède un attribut <code>aria-label="..."</code> non vide : afficher <code>&lt;Balise&gt; -&gt; CONFORME (Nom accessible present)</code><br>\n- Sinon (bouton vide sans aria-label) : afficher <code>&lt;Balise&gt; -&gt; NON_CONFORME (Bouton vide sans nom accessible)</code></p>',
    starter: `import sys

lignes = [l.strip() for l in sys.stdin.read().splitlines() if l.strip()]

# À compléter : auditer la conformité sémantique des images et boutons
`,
    hints: [
      'Repérer les attributs alt="" et alt="texte" avec des vérifications de sous-chaînes ou regex.',
      'Un bouton <button aria-label="Fermer"></button> est parfaitement conforme.'
    ],
    examples: [
      {
        stdin: '<img src="logo.png" alt="Logo Entreprise">\n<img src="fond.jpg" alt="">\n<img src="photo.png">\n<button aria-label="Fermer"></button>\n<button></button>',
        expected: '<img src="logo.png" alt="Logo Entreprise"> -> CONFORME (Image informative)\n<img src="fond.jpg" alt=""> -> CONFORME (Image decorative)\n<img src="photo.png"> -> NON_CONFORME (Alt manquant)\n<button aria-label="Fermer"></button> -> CONFORME (Nom accessible present)\n<button></button> -> NON_CONFORME (Bouton vide sans nom accessible)',
        note: 'Diagnostic des rôles et textes accessibles WCAG 1.1.1 et 4.1.2.'
      }
    ],
    tests: [
      {
        label: 'Images informatives et décoratives',
        stdin: '<img src="schema.svg" alt="Diagramme de flux">\n<img src="separateur.png" alt="">',
        expected: '<img src="schema.svg" alt="Diagramme de flux"> -> CONFORME (Image informative)\n<img src="separateur.png" alt=""> -> CONFORME (Image decorative)'
      },
      {
        label: 'Images non conformes sans alt',
        stdin: '<img src="banniere.jpg">\n<img src="icone.png" class="icon">',
        expected: '<img src="banniere.jpg"> -> NON_CONFORME (Alt manquant)\n<img src="icone.png" class="icon"> -> NON_CONFORME (Alt manquant)'
      },
      {
        label: 'Boutons avec texte textuel ou aria-label',
        stdin: '<button>Valider le formulaire</button>\n<button class="icon-btn" aria-label="Rechercher"></button>',
        expected: '<button>Valider le formulaire</button> -> CONFORME (Nom accessible present)\n<button class="icon-btn" aria-label="Rechercher"></button> -> CONFORME (Nom accessible present)'
      },
      {
        label: 'Boutons vides non conformes',
        stdin: '<button class="burger"></button>\n<button><span class="icon"></span></button>',
        expected: '<button class="burger"></button> -> NON_CONFORME (Bouton vide sans nom accessible)\n<button><span class="icon"></span></button> -> NON_CONFORME (Bouton vide sans nom accessible)'
      }
    ],
    solution: `import sys
import re

lignes = [l.strip() for l in sys.stdin.read().splitlines() if l.strip()]

for b in lignes:
    if b.startswith('<img'):
        val = None
        for q in ('"', "'"):
            motif = 'alt=' + q
            if motif in b:
                debut = b.index(motif) + len(motif)
                if q in b[debut:]:
                    fin = b.index(q, debut)
                    val = b[debut:fin].strip()
                    break
        if val is None:
            res = "NON_CONFORME (Alt manquant)"
        elif val == "":
            res = "CONFORME (Image decorative)"
        else:
            res = "CONFORME (Image informative)"
    elif b.startswith('<button'):
        has_aria = False
        for q in ('"', "'"):
            motif = 'aria-label=' + q
            if motif in b:
                debut = b.index(motif) + len(motif)
                if q in b[debut:]:
                    fin = b.index(q, debut)
                    if b[debut:fin].strip():
                        has_aria = True
                        break

        # Extraire le texte entre balises (sans les sous-tags)
        contenu = re.sub(r'<[^>]+>', '', b).strip()
        has_text = bool(contenu)

        if has_aria or has_text:
            res = "CONFORME (Nom accessible present)"
        else:
            res = "NON_CONFORME (Bouton vide sans nom accessible)"
    else:
        res = "INCONNU"

    print(f"{b} -> {res}")
`
  },
  {
    id: 'ux2-c6-e3',
    chapter: 6,
    title: 'Vérificateur d’ordre de tabulation (tabindex)',
    level: 'n3',
    language: 'python',
    goal: 'Auditer l’usage des attributs tabindex pour garantir une navigation clavier fluide sans perturbation du focus.',
    brief: '<p>Le script lit sur l\'entrée standard des lignes au format <code>&lt;NomComposant&gt; &lt;tabindex&gt;</code>.<br>\nSelon les bonnes pratiques WCAG 2.1 (Critère 2.4.3 Ordre du focus) :<br>\n- <code>tabindex=0</code> : afficher <code>&lt;Nom&gt; [tabindex=0] -&gt; NATUREL (Dans le flux DOM)</code><br>\n- <code>tabindex=-1</code> : afficher <code>&lt;Nom&gt; [tabindex=-1] -&gt; PROGRAMMATIQUE (Hors tabulation sequentielle)</code><br>\n- <code>tabindex &gt; 0</code> : afficher <code>&lt;Nom&gt; [tabindex=&lt;N&gt;] -&gt; ANTI_PATTERN (tabindex positif deconseille)</code><br>\nÀ la fin de l\'analyse, afficher le diagnostic global de la page :<br>\n- S\'il n\'y a aucun tabindex positif : <code>DIAGNOSTIC_PAGE: CONFORME (Ordre de tabulation naturel)</code><br>\n- S\'il y a un ou plusieurs tabindex positifs : <code>DIAGNOSTIC_PAGE: NON_CONFORME (&lt;K&gt; composant(s) avec tabindex positif)</code></p>',
    starter: `import sys

lignes = [l.strip() for l in sys.stdin.read().splitlines() if l.strip()]

# À compléter : auditer chaque tabindex et calculer le diagnostic global de la page
`,
    hints: [
      'Un tabindex positif force artificiellement l\'ordre et désoriente les utilisateurs de technologies d\'assistance.',
      'Comptabiliser le nombre d\'anti-patterns.'
    ],
    examples: [
      {
        stdin: 'ChampNom 0\nChampPrenom 0\nModaleCachee -1\nBoutonValider 0',
        expected: 'ChampNom [tabindex=0] -> NATUREL (Dans le flux DOM)\nChampPrenom [tabindex=0] -> NATUREL (Dans le flux DOM)\nModaleCachee [tabindex=-1] -> PROGRAMMATIQUE (Hors tabulation sequentielle)\nBoutonValider [tabindex=0] -> NATUREL (Dans le flux DOM)\nDIAGNOSTIC_PAGE: CONFORME (Ordre de tabulation naturel)',
        note: 'Flux de tabulation parfaitement sain et accessible.'
      }
    ],
    tests: [
      {
        label: 'Anti-pattern avec tabindex positifs multiples',
        stdin: 'Logo 1\nRecherche 2\nMenu 3',
        expected: 'Logo [tabindex=1] -> ANTI_PATTERN (tabindex positif deconseille)\nRecherche [tabindex=2] -> ANTI_PATTERN (tabindex positif deconseille)\nMenu [tabindex=3] -> ANTI_PATTERN (tabindex positif deconseille)\nDIAGNOSTIC_PAGE: NON_CONFORME (3 composant(s) avec tabindex positif)'
      },
      {
        label: 'Mélange conforme 0 et -1',
        stdin: 'BoutonA 0\nBoutonB -1\nBoutonC 0',
        expected: 'BoutonA [tabindex=0] -> NATUREL (Dans le flux DOM)\nBoutonB [tabindex=-1] -> PROGRAMMATIQUE (Hors tabulation sequentielle)\nBoutonC [tabindex=0] -> NATUREL (Dans le flux DOM)\nDIAGNOSTIC_PAGE: CONFORME (Ordre de tabulation naturel)'
      },
      {
        label: 'Un seul composant fautif',
        stdin: 'Lien1 0\nLien2 0\nLienPrioritaire 5',
        expected: 'Lien1 [tabindex=0] -> NATUREL (Dans le flux DOM)\nLien2 [tabindex=0] -> NATUREL (Dans le flux DOM)\nLienPrioritaire [tabindex=5] -> ANTI_PATTERN (tabindex positif deconseille)\nDIAGNOSTIC_PAGE: NON_CONFORME (1 composant(s) avec tabindex positif)'
      },
      {
        label: 'Composant modal seul',
        stdin: 'FenetreModale -1',
        expected: 'FenetreModale [tabindex=-1] -> PROGRAMMATIQUE (Hors tabulation sequentielle)\nDIAGNOSTIC_PAGE: CONFORME (Ordre de tabulation naturel)'
      }
    ],
    solution: `import sys

lignes = [l.strip() for l in sys.stdin.read().splitlines() if l.strip()]

nb_positifs = 0

for l in lignes:
    parties = l.split()
    if len(parties) != 2:
        continue
    nom, val_str = parties[0], parties[1]
    val = int(val_str)

    if val == 0:
        msg = "NATUREL (Dans le flux DOM)"
    elif val < 0:
        msg = "PROGRAMMATIQUE (Hors tabulation sequentielle)"
    else:
        msg = "ANTI_PATTERN (tabindex positif deconseille)"
        nb_positifs += 1

    print(f"{nom} [tabindex={val}] -> {msg}")

if nb_positifs == 0:
    print("DIAGNOSTIC_PAGE: CONFORME (Ordre de tabulation naturel)")
else:
    print(f"DIAGNOSTIC_PAGE: NON_CONFORME ({nb_positifs} composant(s) avec tabindex positif)")
`
  }
];

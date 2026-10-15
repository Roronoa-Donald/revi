/**
 * Exercices du chapitre 4 — UI/UX Design B2.
 * Wireframing, Grilles, Design Systems & Atomic Design.
 */
'use strict';

module.exports = [
  {
    id: 'ux2-c4-e1',
    chapter: 4,
    title: 'Validateur de dimensions sur Grille 8pt',
    level: 'n1',
    language: 'python',
    goal: 'Vérifier la conformité des espacements et dimensions sur le système de grille standard 8pt (8-point grid).',
    brief: '<p>Le script lit sur l\'entrée standard des valeurs entières de dimensions/marges en pixels (une par ligne).<br>\nSelon le standard 8pt Grid :<br>\n- Si la valeur est un multiple de 8 (<code>val % 8 == 0</code>) : afficher <code>&lt;val&gt;px -&gt; CONFORME (Grille 8pt)</code><br>\n- Sinon, si la valeur est un multiple de 4 (<code>val % 4 == 0</code>) : afficher <code>&lt;val&gt;px -&gt; CONFORME (Demi-grille 4pt)</code><br>\n- Sinon : calculer le multiple de 8 le plus proche (en cas d\'équidistance, choisir le multiple supérieur) et afficher :<br>\n<code>&lt;val&gt;px -&gt; NON_CONFORME (Correction: &lt;cible&gt;px)</code></p>',
    starter: `import sys

valeurs = [int(l.strip()) for l in sys.stdin.read().splitlines() if l.strip()]

# À compléter : valider sur la grille 8pt ou suggérer la correction la plus proche
`,
    hints: [
      'Pour le plus proche multiple de 8 : round(val / 8) * 8.',
      'Si val est négatif ou nul, traiter en conséquence.'
    ],
    examples: [
      {
        stdin: '16\n12\n15\n7',
        expected: '16px -> CONFORME (Grille 8pt)\n12px -> CONFORME (Demi-grille 4pt)\n15px -> NON_CONFORME (Correction: 16px)\n7px -> NON_CONFORME (Correction: 8px)',
        note: '16 est sur la grille 8pt, 12 sur la demi-grille 4pt, 15 et 7 nécessitent un réalignement.'
      }
    ],
    tests: [
      {
        label: 'Multiples stricts de 8',
        stdin: '8\n24\n32\n64',
        expected: '8px -> CONFORME (Grille 8pt)\n24px -> CONFORME (Grille 8pt)\n32px -> CONFORME (Grille 8pt)\n64px -> CONFORME (Grille 8pt)'
      },
      {
        label: 'Demi-grille 4pt (icônes et micro-espaces)',
        stdin: '4\n12\n20\n28',
        expected: '4px -> CONFORME (Demi-grille 4pt)\n12px -> CONFORME (Demi-grille 4pt)\n20px -> CONFORME (Demi-grille 4pt)\n28px -> CONFORME (Demi-grille 4pt)'
      },
      {
        label: 'Valeurs non conformes avec corrections',
        stdin: '13\n18\n23\n35',
        expected: '13px -> NON_CONFORME (Correction: 16px)\n18px -> NON_CONFORME (Correction: 16px)\n23px -> NON_CONFORME (Correction: 24px)\n35px -> NON_CONFORME (Correction: 32px)'
      },
      {
        label: 'Zéro et petites valeurs',
        stdin: '0\n1\n5',
        expected: '0px -> CONFORME (Grille 8pt)\n1px -> NON_CONFORME (Correction: 0px)\n5px -> NON_CONFORME (Correction: 8px)'
      }
    ],
    solution: `import sys

valeurs = [int(l.strip()) for l in sys.stdin.read().splitlines() if l.strip()]

for v in valeurs:
    if v % 8 == 0:
        print(f"{v}px -> CONFORME (Grille 8pt)")
    elif v % 4 == 0:
        print(f"{v}px -> CONFORME (Demi-grille 4pt)")
    else:
        # Multiple de 8 le plus proche (supérieur en cas d'équidistance)
        # Si reste == 4, il aurait été capturé par % 4 == 0, donc pas d'ambiguïté résiduelle
        cible = round(v / 8) * 8
        print(f"{v}px -> NON_CONFORME (Correction: {cible}px)")
`
  },
  {
    id: 'ux2-c4-e2',
    chapter: 4,
    title: 'Classificateur Atomic Design de Brad Frost',
    level: 'n2',
    language: 'python',
    goal: 'Classer les briques d’un Design System selon les 5 niveaux d’Atomic Design : Atomes, Molécules, Organismes, Templates et Pages.',
    brief: '<p>Le script lit sur l\'entrée standard une liste d\'éléments d\'interface (un par ligne).<br>\nSelon la taxonomie Atomic Design :<br>\n- <strong>ATOME</strong> : <code>Bouton</code>, <code>ChampTexte</code>, <code>Icone</code>, <code>Label</code>, <code>Avatar</code>, <code>Badge</code>.<br>\n- <strong>MOLECULE</strong> : <code>FormulaireRecherche</code>, <code>ChampAvecBouton</code>, <code>CarteUtilisateurCompacte</code>, <code>SelecteurDate</code>.<br>\n- <strong>ORGANISME</strong> : <code>BarreNavigation</code>, <code>EnTeteHeader</code>, <code>PiedDePageFooter</code>, <code>GrilleDeProduits</code>.<br>\n- <strong>TEMPLATE</strong> : <code>GabaritDashboard</code>, <code>GabaritArticleBlog</code>, <code>GabaritFicheProduit</code>.<br>\n- <strong>PAGE</strong> : <code>PageAccueilProduction</code>, <code>PageProfilAlice</code>, <code>PagePaiementReelle</code>.<br>\nPour chaque élément, afficher :<br>\n<code>&lt;Element&gt; -&gt; &lt;ATOME | MOLECULE | ORGANISME | TEMPLATE | PAGE&gt;</code><br>\nSi non répertorié :<br>\n<code>&lt;Element&gt; -&gt; INCONNU</code></p>',
    starter: `import sys

lignes = [l.strip() for l in sys.stdin.read().splitlines() if l.strip()]

# À compléter : classifier les éléments selon la hiérarchie Atomic Design
`,
    hints: [
      'Normaliser la chaîne en minuscules.',
      'Un organisme est un assemblage complexe de molécules et d\'atomes formant une section distincte d\'IHM.'
    ],
    examples: [
      {
        stdin: 'Bouton\nFormulaireRecherche\nBarreNavigation\nGabaritDashboard\nPageAccueilProduction',
        expected: 'Bouton -> ATOME\nFormulaireRecherche -> MOLECULE\nBarreNavigation -> ORGANISME\nGabaritDashboard -> TEMPLATE\nPageAccueilProduction -> PAGE',
        note: 'Traversée complète des 5 strates d’Atomic Design.'
      }
    ],
    tests: [
      {
        label: 'Atomes et molécules de base',
        stdin: 'ChampTexte\nIcone\nChampAvecBouton\nAvatar',
        expected: 'ChampTexte -> ATOME\nIcone -> ATOME\nChampAvecBouton -> MOLECULE\nAvatar -> ATOME'
      },
      {
        label: 'Organismes structurants',
        stdin: 'EnTeteHeader\nPiedDePageFooter\nGrilleDeProduits',
        expected: 'EnTeteHeader -> ORGANISME\nPiedDePageFooter -> ORGANISME\nGrilleDeProduits -> ORGANISME'
      },
      {
        label: 'Templates et Pages concrètes',
        stdin: 'GabaritFicheProduit\nPageProfilAlice\nPagePaiementReelle',
        expected: 'GabaritFicheProduit -> TEMPLATE\nPageProfilAlice -> PAGE\nPagePaiementReelle -> PAGE'
      },
      {
        label: 'Éléments inconnus et badge',
        stdin: 'Badge\nScriptBackendPython\nSelecteurDate',
        expected: 'Badge -> ATOME\nScriptBackendPython -> INCONNU\nSelecteurDate -> MOLECULE'
      }
    ],
    solution: `import sys

ATOME = {'bouton', 'champtexte', 'icone', 'label', 'avatar', 'badge'}
MOLECULE = {'formulairerecherche', 'champavecbouton', 'carteutilisateurcompacte', 'selecteurdate'}
ORGANISME = {'barrenavigation', 'enteteheader', 'pieddepagefooter', 'grilledeproduits'}
TEMPLATE = {'gabaritdashboard', 'gabaritarticleblog', 'gabaritficheproduit'}
PAGE = {'pageaccueilproduction', 'pageprofilalice', 'pagepaiementreelle'}

lignes = [l.strip() for l in sys.stdin.read().splitlines() if l.strip()]

for l in lignes:
    cle = l.lower()
    if cle in ATOME:
        cat = 'ATOME'
    elif cle in MOLECULE:
        cat = 'MOLECULE'
    elif cle in ORGANISME:
        cat = 'ORGANISME'
    elif cle in TEMPLATE:
        cat = 'TEMPLATE'
    elif cle in PAGE:
        cat = 'PAGE'
    else:
        cat = 'INCONNU'
    print(f"{l} -> {cat}")
`
  },
  {
    id: 'ux2-c4-e3',
    chapter: 4,
    title: 'Générateur d’échelle typographique modulaire',
    level: 'n3',
    language: 'python',
    goal: 'Calculer les Design Tokens typographiques harmoniques à partir d’une taille de base et d’un ratio géométrique.',
    brief: '<p>Le script lit sur l\'entrée standard une ligne contenant deux valeurs :<br>\n<code>&lt;BASE_PX&gt; &lt;RATIO&gt;</code> (ex: <code>16 1.25</code> pour le ratio Major Third).<br>\nLe script doit calculer et afficher les tailles typographiques entières arrondies (<code>round(BASE * RATIO^k)</code>) pour les 7 crans d\'échelle suivants :<br>\n- <code>text-xs: &lt;px&gt;px</code> (k = -2)<br>\n- <code>text-sm: &lt;px&gt;px</code> (k = -1)<br>\n- <code>text-base: &lt;px&gt;px</code> (k = 0)<br>\n- <code>text-lg: &lt;px&gt;px</code> (k = 1)<br>\n- <code>text-xl: &lt;px&gt;px</code> (k = 2)<br>\n- <code>text-2xl: &lt;px&gt;px</code> (k = 3)<br>\n- <code>text-3xl: &lt;px&gt;px</code> (k = 4)</p>',
    starter: `import sys

ligne = sys.stdin.read().strip()

# À compléter : générer les 7 Design Tokens d'échelle typographique
`,
    hints: [
      'Pour k < 0, BASE * (RATIO ** k).',
      'Utiliser round() pour obtenir des pixels entiers propres dans les feuilles CSS.'
    ],
    examples: [
      {
        stdin: '16 1.25',
        expected: 'text-xs: 10px\ntext-sm: 13px\ntext-base: 16px\ntext-lg: 20px\ntext-xl: 25px\ntext-2xl: 31px\ntext-3xl: 39px',
        note: 'Échelle modulaire Major Third classique du web moderne.'
      }
    ],
    tests: [
      {
        label: 'Base 16px avec ratio Minor Third 1.20',
        stdin: '16 1.20',
        expected: 'text-xs: 11px\ntext-sm: 13px\ntext-base: 16px\ntext-lg: 19px\ntext-xl: 23px\ntext-2xl: 28px\ntext-3xl: 33px'
      },
      {
        label: 'Base 16px avec ratio Perfect Fourth 1.333',
        stdin: '16 1.333',
        expected: 'text-xs: 9px\ntext-sm: 12px\ntext-base: 16px\ntext-lg: 21px\ntext-xl: 28px\ntext-2xl: 38px\ntext-3xl: 51px'
      },
      {
        label: 'Base 14px avec ratio Golden Ratio 1.618',
        stdin: '14 1.618',
        expected: 'text-xs: 5px\ntext-sm: 9px\ntext-base: 14px\ntext-lg: 23px\ntext-xl: 37px\ntext-2xl: 59px\ntext-3xl: 96px'
      },
      {
        label: 'Base 18px avec ratio Major Second 1.125',
        stdin: '18 1.125',
        expected: 'text-xs: 14px\ntext-sm: 16px\ntext-base: 18px\ntext-lg: 20px\ntext-xl: 23px\ntext-2xl: 26px\ntext-3xl: 29px'
      }
    ],
    solution: `import sys

ligne = sys.stdin.read().strip()
if not ligne:
    sys.exit(0)

base_str, ratio_str = ligne.split()
base = float(base_str)
ratio = float(ratio_str)

tokens = [
    ('text-xs', -2),
    ('text-sm', -1),
    ('text-base', 0),
    ('text-lg', 1),
    ('text-xl', 2),
    ('text-2xl', 3),
    ('text-3xl', 4)
]

for nom, k in tokens:
    val = round(base * (ratio ** k))
    print(f"{nom}: {val}px")
`
  }
];

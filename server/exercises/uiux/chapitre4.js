/**
 * chapitre4.js — Études de cas du cours « uiux ».
 * Mode d'évaluation conceptuelle structurée (language: 'analyse').
 */
'use strict';

module.exports = [
  {
    id: "ux2-c4-e1",
    chapter: 4,
    level: "n1",
    language: 'analyse',
    title: "Validateur de dimensions sur Grille 8pt",
    goal: "Vérifier la conformité des espacements et dimensions sur le système de grille standard 8pt (8-point grid).",
    brief: "<p>Pour chaque cas d’application des valeurs entières de dimensions/marges en pixels (une par ligne).<br>\nSelon le standard 8pt Grid :<br>\n- Si la valeur est un multiple de 8 (<code>val % 8 == 0</code>) : afficher <code>&lt;val&gt;px -&gt; CONFORME (Grille 8pt)</code><br>\n- Sinon, si la valeur est un multiple de 4 (<code>val % 4 == 0</code>) : afficher <code>&lt;val&gt;px -&gt; CONFORME (Demi-grille 4pt)</code><br>\n- Sinon : calculer le multiple de 8 le plus proche (en cas d'équidistance, choisir le multiple supérieur) et afficher :<br>\n<code>&lt;val&gt;px -&gt; NON_CONFORME (Correction: &lt;cible&gt;px)</code></p>",
    starter: "# Grille d'analyse (ux2-c4-e1) — Validateur de dimensions sur Grille 8pt\n# Complétez la réponse attendue sous chaque cas ci-dessous :\n\n[Cas 1 — Multiples stricts de 8]\n# Données : 24\n# Données : 32\n# Données : 64\nA_COMPLETER\n\n[Cas 2 — Demi-grille 4pt (icônes et micro-espaces)]\n# Données : 12\n# Données : 20\n# Données : 28\nA_COMPLETER\n\n[Cas 3 — Valeurs non conformes avec corrections]\n# Données : 18\n# Données : 23\n# Données : 35\nA_COMPLETER\n\n[Cas 4 — Zéro et petites valeurs]\n# Données : 1\n# Données : 5\nA_COMPLETER\n",
    hints: [
          "Pour le plus proche multiple de 8 : round(val / 8) * 8.",
          "Si val est négatif ou nul, traiter en conséquence."
    ],
    examples: [
          {
                "stdin": "16\n12\n15\n7",
                "expected": "16px -> CONFORME (Grille 8pt)\n12px -> CONFORME (Demi-grille 4pt)\n15px -> NON_CONFORME (Correction: 16px)\n7px -> NON_CONFORME (Correction: 8px)",
                "note": "16 est sur la grille 8pt, 12 sur la demi-grille 4pt, 15 et 7 nécessitent un réalignement."
          }
    ],
    tests: [
          {
                "label": "Multiples stricts de 8",
                "stdin": "cas:1",
                "expected": "8px -> CONFORME (Grille 8pt)\n24px -> CONFORME (Grille 8pt)\n32px -> CONFORME (Grille 8pt)\n64px -> CONFORME (Grille 8pt)"
          },
          {
                "label": "Demi-grille 4pt (icônes et micro-espaces)",
                "stdin": "cas:2",
                "expected": "4px -> CONFORME (Demi-grille 4pt)\n12px -> CONFORME (Demi-grille 4pt)\n20px -> CONFORME (Demi-grille 4pt)\n28px -> CONFORME (Demi-grille 4pt)"
          },
          {
                "label": "Valeurs non conformes avec corrections",
                "stdin": "cas:3",
                "expected": "13px -> NON_CONFORME (Correction: 16px)\n18px -> NON_CONFORME (Correction: 16px)\n23px -> NON_CONFORME (Correction: 24px)\n35px -> NON_CONFORME (Correction: 32px)"
          },
          {
                "label": "Zéro et petites valeurs",
                "stdin": "cas:4",
                "expected": "0px -> CONFORME (Grille 8pt)\n1px -> NON_CONFORME (Correction: 0px)\n5px -> NON_CONFORME (Correction: 8px)"
          }
    ],
    solution: "[Exemple]\n16px -> CONFORME (Grille 8pt)\n12px -> CONFORME (Demi-grille 4pt)\n15px -> NON_CONFORME (Correction: 16px)\n7px -> NON_CONFORME (Correction: 8px)\n\n[Cas 1 — Multiples stricts de 8]\n8px -> CONFORME (Grille 8pt)\n24px -> CONFORME (Grille 8pt)\n32px -> CONFORME (Grille 8pt)\n64px -> CONFORME (Grille 8pt)\n\n[Cas 2 — Demi-grille 4pt (icônes et micro-espaces)]\n4px -> CONFORME (Demi-grille 4pt)\n12px -> CONFORME (Demi-grille 4pt)\n20px -> CONFORME (Demi-grille 4pt)\n28px -> CONFORME (Demi-grille 4pt)\n\n[Cas 3 — Valeurs non conformes avec corrections]\n13px -> NON_CONFORME (Correction: 16px)\n18px -> NON_CONFORME (Correction: 16px)\n23px -> NON_CONFORME (Correction: 24px)\n35px -> NON_CONFORME (Correction: 32px)\n\n[Cas 4 — Zéro et petites valeurs]\n0px -> CONFORME (Grille 8pt)\n1px -> NON_CONFORME (Correction: 0px)\n5px -> NON_CONFORME (Correction: 8px)\n"
  },
  {
    id: "ux2-c4-e2",
    chapter: 4,
    level: "n2",
    language: 'analyse',
    title: "Classificateur Atomic Design de Brad Frost",
    goal: "Classer les briques d’un Design System selon les 5 niveaux d’Atomic Design : Atomes, Molécules, Organismes, Templates et Pages.",
    brief: "<p>Pour chaque cas d’application une liste d'éléments d'interface (un par ligne).<br>\nSelon la taxonomie Atomic Design :<br>\n- <strong>ATOME</strong> : <code>Bouton</code>, <code>ChampTexte</code>, <code>Icone</code>, <code>Label</code>, <code>Avatar</code>, <code>Badge</code>.<br>\n- <strong>MOLECULE</strong> : <code>FormulaireRecherche</code>, <code>ChampAvecBouton</code>, <code>CarteUtilisateurCompacte</code>, <code>SelecteurDate</code>.<br>\n- <strong>ORGANISME</strong> : <code>BarreNavigation</code>, <code>EnTeteHeader</code>, <code>PiedDePageFooter</code>, <code>GrilleDeProduits</code>.<br>\n- <strong>TEMPLATE</strong> : <code>GabaritDashboard</code>, <code>GabaritArticleBlog</code>, <code>GabaritFicheProduit</code>.<br>\n- <strong>PAGE</strong> : <code>PageAccueilProduction</code>, <code>PageProfilAlice</code>, <code>PagePaiementReelle</code>.<br>\nPour chaque élément, afficher :<br>\n<code>&lt;Element&gt; -&gt; &lt;ATOME | MOLECULE | ORGANISME | TEMPLATE | PAGE&gt;</code><br>\nSi non répertorié :<br>\n<code>&lt;Element&gt; -&gt; INCONNU</code></p>",
    starter: "# Grille d'analyse (ux2-c4-e2) — Classificateur Atomic Design de Brad Frost\n# Complétez la réponse attendue sous chaque cas ci-dessous :\n\n[Cas 1 — Atomes et molécules de base]\n# Données : ChampTexte\n# Données : Icone\n# Données : ChampAvecBouton\n# Données : Avatar\nA_COMPLETER\n\n[Cas 2 — Organismes structurants]\n# Données : EnTeteHeader\n# Données : PiedDePageFooter\n# Données : GrilleDeProduits\nA_COMPLETER\n\n[Cas 3 — Templates et Pages concrètes]\n# Données : GabaritFicheProduit\n# Données : PageProfilAlice\n# Données : PagePaiementReelle\nA_COMPLETER\n\n[Cas 4 — Éléments inconnus et badge]\n# Données : Badge\n# Données : ScriptBackendPython\n# Données : SelecteurDate\nA_COMPLETER\n",
    hints: [
          "Normaliser la chaîne en minuscules.",
          "Un organisme est un assemblage complexe de molécules et d'atomes formant une section distincte d'IHM."
    ],
    examples: [
          {
                "stdin": "Bouton\nFormulaireRecherche\nBarreNavigation\nGabaritDashboard\nPageAccueilProduction",
                "expected": "Bouton -> ATOME\nFormulaireRecherche -> MOLECULE\nBarreNavigation -> ORGANISME\nGabaritDashboard -> TEMPLATE\nPageAccueilProduction -> PAGE",
                "note": "Traversée complète des 5 strates d’Atomic Design."
          }
    ],
    tests: [
          {
                "label": "Atomes et molécules de base",
                "stdin": "cas:1",
                "expected": "ChampTexte -> ATOME\nIcone -> ATOME\nChampAvecBouton -> MOLECULE\nAvatar -> ATOME"
          },
          {
                "label": "Organismes structurants",
                "stdin": "cas:2",
                "expected": "EnTeteHeader -> ORGANISME\nPiedDePageFooter -> ORGANISME\nGrilleDeProduits -> ORGANISME"
          },
          {
                "label": "Templates et Pages concrètes",
                "stdin": "cas:3",
                "expected": "GabaritFicheProduit -> TEMPLATE\nPageProfilAlice -> PAGE\nPagePaiementReelle -> PAGE"
          },
          {
                "label": "Éléments inconnus et badge",
                "stdin": "cas:4",
                "expected": "Badge -> ATOME\nScriptBackendPython -> INCONNU\nSelecteurDate -> MOLECULE"
          }
    ],
    solution: "[Exemple]\nBouton -> ATOME\nFormulaireRecherche -> MOLECULE\nBarreNavigation -> ORGANISME\nGabaritDashboard -> TEMPLATE\nPageAccueilProduction -> PAGE\n\n[Cas 1 — Atomes et molécules de base]\nChampTexte -> ATOME\nIcone -> ATOME\nChampAvecBouton -> MOLECULE\nAvatar -> ATOME\n\n[Cas 2 — Organismes structurants]\nEnTeteHeader -> ORGANISME\nPiedDePageFooter -> ORGANISME\nGrilleDeProduits -> ORGANISME\n\n[Cas 3 — Templates et Pages concrètes]\nGabaritFicheProduit -> TEMPLATE\nPageProfilAlice -> PAGE\nPagePaiementReelle -> PAGE\n\n[Cas 4 — Éléments inconnus et badge]\nBadge -> ATOME\nScriptBackendPython -> INCONNU\nSelecteurDate -> MOLECULE\n"
  },
  {
    id: "ux2-c4-e3",
    chapter: 4,
    level: "n3",
    language: 'analyse',
    title: "Générateur d’échelle typographique modulaire",
    goal: "Calculer les Design Tokens typographiques harmoniques à partir d’une taille de base et d’un ratio géométrique.",
    brief: "<p>Pour chaque cas d’application une ligne contenant deux valeurs :<br>\n<code>&lt;BASE_PX&gt; &lt;RATIO&gt;</code> (ex: <code>16 1.25</code> pour le ratio Major Third).<br>\nLe cas doit calculer et afficher les tailles typographiques entières arrondies (<code>round(BASE * RATIO^k)</code>) pour les 7 crans d'échelle suivants :<br>\n- <code>text-xs: &lt;px&gt;px</code> (k = -2)<br>\n- <code>text-sm: &lt;px&gt;px</code> (k = -1)<br>\n- <code>text-base: &lt;px&gt;px</code> (k = 0)<br>\n- <code>text-lg: &lt;px&gt;px</code> (k = 1)<br>\n- <code>text-xl: &lt;px&gt;px</code> (k = 2)<br>\n- <code>text-2xl: &lt;px&gt;px</code> (k = 3)<br>\n- <code>text-3xl: &lt;px&gt;px</code> (k = 4)</p>",
    starter: "# Grille d'analyse (ux2-c4-e3) — Générateur d’échelle typographique modulaire\n# Complétez la réponse attendue sous chaque cas ci-dessous :\n\n[Cas 1 — Base 16px avec ratio Minor Third 1.20]\n# Données : 16 1.20\nA_COMPLETER\n\n[Cas 2 — Base 16px avec ratio Perfect Fourth 1.333]\n# Données : 16 1.333\nA_COMPLETER\n\n[Cas 3 — Base 14px avec ratio Golden Ratio 1.618]\n# Données : 14 1.618\nA_COMPLETER\n\n[Cas 4 — Base 18px avec ratio Major Second 1.125]\n# Données : 18 1.125\nA_COMPLETER\n",
    hints: [
          "Pour k < 0, BASE * (RATIO ** k).",
          "Utiliser round() pour obtenir des pixels entiers propres dans les feuilles CSS."
    ],
    examples: [
          {
                "stdin": "16 1.25",
                "expected": "text-xs: 10px\ntext-sm: 13px\ntext-base: 16px\ntext-lg: 20px\ntext-xl: 25px\ntext-2xl: 31px\ntext-3xl: 39px",
                "note": "Échelle modulaire Major Third classique du web moderne."
          }
    ],
    tests: [
          {
                "label": "Base 16px avec ratio Minor Third 1.20",
                "stdin": "cas:1",
                "expected": "text-xs: 11px\ntext-sm: 13px\ntext-base: 16px\ntext-lg: 19px\ntext-xl: 23px\ntext-2xl: 28px\ntext-3xl: 33px"
          },
          {
                "label": "Base 16px avec ratio Perfect Fourth 1.333",
                "stdin": "cas:2",
                "expected": "text-xs: 9px\ntext-sm: 12px\ntext-base: 16px\ntext-lg: 21px\ntext-xl: 28px\ntext-2xl: 38px\ntext-3xl: 51px"
          },
          {
                "label": "Base 14px avec ratio Golden Ratio 1.618",
                "stdin": "cas:3",
                "expected": "text-xs: 5px\ntext-sm: 9px\ntext-base: 14px\ntext-lg: 23px\ntext-xl: 37px\ntext-2xl: 59px\ntext-3xl: 96px"
          },
          {
                "label": "Base 18px avec ratio Major Second 1.125",
                "stdin": "cas:4",
                "expected": "text-xs: 14px\ntext-sm: 16px\ntext-base: 18px\ntext-lg: 20px\ntext-xl: 23px\ntext-2xl: 26px\ntext-3xl: 29px"
          }
    ],
    solution: "[Exemple]\ntext-xs: 10px\ntext-sm: 13px\ntext-base: 16px\ntext-lg: 20px\ntext-xl: 25px\ntext-2xl: 31px\ntext-3xl: 39px\n\n[Cas 1 — Base 16px avec ratio Minor Third 1.20]\ntext-xs: 11px\ntext-sm: 13px\ntext-base: 16px\ntext-lg: 19px\ntext-xl: 23px\ntext-2xl: 28px\ntext-3xl: 33px\n\n[Cas 2 — Base 16px avec ratio Perfect Fourth 1.333]\ntext-xs: 9px\ntext-sm: 12px\ntext-base: 16px\ntext-lg: 21px\ntext-xl: 28px\ntext-2xl: 38px\ntext-3xl: 51px\n\n[Cas 3 — Base 14px avec ratio Golden Ratio 1.618]\ntext-xs: 5px\ntext-sm: 9px\ntext-base: 14px\ntext-lg: 23px\ntext-xl: 37px\ntext-2xl: 59px\ntext-3xl: 96px\n\n[Cas 4 — Base 18px avec ratio Major Second 1.125]\ntext-xs: 14px\ntext-sm: 16px\ntext-base: 18px\ntext-lg: 20px\ntext-xl: 23px\ntext-2xl: 26px\ntext-3xl: 29px\n"
  }
];

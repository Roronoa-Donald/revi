/**
 * Exercices du chapitre 1 — UI/UX Design B2.
 * Fondements UI/UX, Démarche Centrée Utilisateur & Double Diamant.
 */
'use strict';

module.exports = [
  {
    id: 'ux2-c1-e1',
    chapter: 1,
    title: 'Classificateur de livrables et activités UI vs UX',
    level: 'n1',
    language: 'python',
    goal: 'Distinguer formellement les responsabilités UI (User Interface) et UX (User Experience) selon les standards de l’industrie.',
    brief: '<p>Le script lit sur l\'entrée standard une liste d\'activités ou de livrables de conception (un par ligne).<br>\nSelon les standards du design numérique :<br>\n- <strong>UI</strong> : <code>Palette de couleurs</code>, <code>Typographie</code>, <code>Iconographie</code>, <code>Micro-animations</code>, <code>Composants boutons</code>, <code>Design System visuel</code>, <code>Mockup haute fidelite</code>.<br>\n- <strong>UX</strong> : <code>Entretiens utilisateurs</code>, <code>Test d\'utilisabilite</code>, <code>Tri de cartes</code>, <code>Persona</code>, <code>Customer Journey Map</code>, <code>Architecture de l\'information</code>, <code>Empathy Map</code>.<br>\n- <strong>HYBRIDE</strong> : <code>Wireframe Lo-Fi</code>, <code>Prototype interactif</code>, <code>Audit ergonomique</code>.<br>\nPour chaque entrée, afficher :<br>\n<code>&lt;Livrable&gt; -&gt; &lt;UI|UX|HYBRIDE&gt;</code><br>\nSi le livrable n\'est pas reconnu dans la base :<br>\n<code>&lt;Livrable&gt; -&gt; INCONNU</code></p>',
    starter: `import sys

lignes = [l.strip() for l in sys.stdin.read().splitlines() if l.strip()]

# À compléter : classifier les livrables en UI, UX ou HYBRIDE
`,
    hints: [
      'Normaliser les chaînes (retirer espaces superflus, casse insensible).',
      'L\'UI traite des aspects graphiques, visuels et perceptifs ; l\'UX traite de la recherche, des usages et des parcours.'
    ],
    examples: [
      {
        stdin: 'Palette de couleurs\nEntretiens utilisateurs\nPrototype interactif',
        expected: 'Palette de couleurs -> UI\nEntretiens utilisateurs -> UX\nPrototype interactif -> HYBRIDE',
        note: 'Classification canonique des activités produit.'
      }
    ],
    tests: [
      {
        label: 'Activités purement UX',
        stdin: 'Persona\nCustomer Journey Map\nTri de cartes',
        expected: 'Persona -> UX\nCustomer Journey Map -> UX\nTri de cartes -> UX'
      },
      {
        label: 'Livrables purement UI',
        stdin: 'Typographie\nIconographie\nMicro-animations',
        expected: 'Typographie -> UI\nIconographie -> UI\nMicro-animations -> UI'
      },
      {
        label: 'Activités hybrides et inconnu',
        stdin: 'Wireframe Lo-Fi\nAudit ergonomique\nDeploiement Kubernetes',
        expected: 'Wireframe Lo-Fi -> HYBRIDE\nAudit ergonomique -> HYBRIDE\nDeploiement Kubernetes -> INCONNU'
      },
      {
        label: 'Mélange de cas réels',
        stdin: 'Architecture de l\'information\nMockup haute fidelite\nEmpathy Map',
        expected: 'Architecture de l\'information -> UX\nMockup haute fidelite -> UI\nEmpathy Map -> UX'
      }
    ],
    solution: `import sys

UI_ITEMS = {
    'palette de couleurs', 'typographie', 'iconographie',
    'micro-animations', 'composants boutons', 'design system visuel',
    'mockup haute fidelite'
}

UX_ITEMS = {
    "entretiens utilisateurs", "test d'utilisabilite", "tri de cartes",
    "persona", "customer journey map", "architecture de l'information",
    "empathy map"
}

HYBRIDE_ITEMS = {
    'wireframe lo-fi', 'prototype interactif', 'audit ergonomique'
}

lignes = [l.strip() for l in sys.stdin.read().splitlines() if l.strip()]

for l in lignes:
    cle = l.lower()
    if cle in UI_ITEMS:
        cat = 'UI'
    elif cle in UX_ITEMS:
        cat = 'UX'
    elif cle in HYBRIDE_ITEMS:
        cat = 'HYBRIDE'
    else:
        cat = 'INCONNU'
    print(f"{l} -> {cat}")
`
  },
  {
    id: 'ux2-c1-e2',
    chapter: 1,
    title: 'Calculateur de phases du Double Diamant',
    level: 'n2',
    language: 'python',
    goal: 'Mapper les étapes de projet sur les 4 phases du modèle Double Diamant (Design Council) en identifiant les modes divergent et convergent.',
    brief: '<p>Le script lit sur l\'entrée standard une liste d\'actions de projet (une par ligne).<br>\nSelon le framework officiel du Double Diamant :<br>\n- <strong>Phase 1 (Découvrir / Divergent)</strong> : <code>Recherche terrain</code>, <code>Entretiens</code>, <code>Benchmarking concurrentiel</code>, <code>Observation utilisateur</code>.<br>\n- <strong>Phase 2 (Définir / Convergent)</strong> : <code>Synthese personas</code>, <code>Cadrage du probleme</code>, <code>Priorisation MoSCoW</code>, <code>Definition du HMW</code>.<br>\n- <strong>Phase 3 (Développer / Divergent)</strong> : <code>Ideation brainstorming</code>, <code>Esquisses papier</code>, <code>Wireframing Lo-Fi</code>, <code>Auto Layout Figma</code>.<br>\n- <strong>Phase 4 (Livrer / Convergent)</strong> : <code>Tests utilisateurs finaux</code>, <code>Design System documentation</code>, <code>Recette UI avec developpeurs</code>, <code>Lancement et mesure analytics</code>.<br>\nPour chaque action, afficher :<br>\n<code>&lt;Action&gt; | PHASE: &lt;1_DECOUVRIR|2_DEFINIR|3_DEVELOPPER|4_LIVRER&gt; | MODE: &lt;DIVERGENT|CONVERGENT&gt;</code><br>\nSi non reconnue :<br>\n<code>&lt;Action&gt; | PHASE: INCONNUE | MODE: INCONNU</code></p>',
    starter: `import sys

lignes = [l.strip() for l in sys.stdin.read().splitlines() if l.strip()]

# À compléter : mapper chaque action sur sa phase et son mode
`,
    hints: [
      'Le premier diamant explore le problème (Découvrir divergent -> Définir convergent).',
      'Le second diamant explore la solution (Développer divergent -> Livrer convergent).'
    ],
    examples: [
      {
        stdin: 'Recherche terrain\nCadrage du probleme\nIdeation brainstorming\nTests utilisateurs finaux',
        expected: 'Recherche terrain | PHASE: 1_DECOUVRIR | MODE: DIVERGENT\nCadrage du probleme | PHASE: 2_DEFINIR | MODE: CONVERGENT\nIdeation brainstorming | PHASE: 3_DEVELOPPER | MODE: DIVERGENT\nTests utilisateurs finaux | PHASE: 4_LIVRER | MODE: CONVERGENT',
        note: 'Traversée complète des 4 étapes du Double Diamant.'
      }
    ],
    tests: [
      {
        label: 'Diamant 1 : Problème',
        stdin: 'Entretiens\nBenchmarking concurrentiel\nSynthese personas\nPriorisation MoSCoW',
        expected: 'Entretiens | PHASE: 1_DECOUVRIR | MODE: DIVERGENT\nBenchmarking concurrentiel | PHASE: 1_DECOUVRIR | MODE: DIVERGENT\nSynthese personas | PHASE: 2_DEFINIR | MODE: CONVERGENT\nPriorisation MoSCoW | PHASE: 2_DEFINIR | MODE: CONVERGENT'
      },
      {
        label: 'Diamant 2 : Solution',
        stdin: 'Esquisses papier\nAuto Layout Figma\nDesign System documentation\nLancement et mesure analytics',
        expected: 'Esquisses papier | PHASE: 3_DEVELOPPER | MODE: DIVERGENT\nAuto Layout Figma | PHASE: 3_DEVELOPPER | MODE: DIVERGENT\nDesign System documentation | PHASE: 4_LIVRER | MODE: CONVERGENT\nLancement et mesure analytics | PHASE: 4_LIVRER | MODE: CONVERGENT'
      },
      {
        label: 'Cas inconnus et HMW',
        stdin: 'Definition du HMW\nWireframing Lo-Fi\nRefonte base SQL',
        expected: 'Definition du HMW | PHASE: 2_DEFINIR | MODE: CONVERGENT\nWireframing Lo-Fi | PHASE: 3_DEVELOPPER | MODE: DIVERGENT\nRefonte base SQL | PHASE: INCONNUE | MODE: INCONNU'
      },
      {
        label: 'Recette et observation',
        stdin: 'Observation utilisateur\nRecette UI avec developpeurs',
        expected: 'Observation utilisateur | PHASE: 1_DECOUVRIR | MODE: DIVERGENT\nRecette UI avec developpeurs | PHASE: 4_LIVRER | MODE: CONVERGENT'
      }
    ],
    solution: `import sys

PHASES = {
    'recherche terrain': ('1_DECOUVRIR', 'DIVERGENT'),
    'entretiens': ('1_DECOUVRIR', 'DIVERGENT'),
    'benchmarking concurrentiel': ('1_DECOUVRIR', 'DIVERGENT'),
    'observation utilisateur': ('1_DECOUVRIR', 'DIVERGENT'),

    'synthese personas': ('2_DEFINIR', 'CONVERGENT'),
    'cadrage du probleme': ('2_DEFINIR', 'CONVERGENT'),
    'priorisation moscow': ('2_DEFINIR', 'CONVERGENT'),
    'definition du hmw': ('2_DEFINIR', 'CONVERGENT'),

    'ideation brainstorming': ('3_DEVELOPPER', 'DIVERGENT'),
    'esquisses papier': ('3_DEVELOPPER', 'DIVERGENT'),
    'wireframing lo-fi': ('3_DEVELOPPER', 'DIVERGENT'),
    'auto layout figma': ('3_DEVELOPPER', 'DIVERGENT'),

    'tests utilisateurs finaux': ('4_LIVRER', 'CONVERGENT'),
    'design system documentation': ('4_LIVRER', 'CONVERGENT'),
    'recette ui avec developpeurs': ('4_LIVRER', 'CONVERGENT'),
    'lancement et mesure analytics': ('4_LIVRER', 'CONVERGENT')
}

lignes = [l.strip() for l in sys.stdin.read().splitlines() if l.strip()]

for l in lignes:
    cle = l.lower()
    if cle in PHASES:
        p, m = PHASES[cle]
        print(f"{l} | PHASE: {p} | MODE: {m}")
    else:
        print(f"{l} | PHASE: INCONNUE | MODE: INCONNU")
`
  },
  {
    id: 'ux2-c1-e3',
    chapter: 1,
    title: 'Validateur de patterns d’interface (Loi de Jakob)',
    level: 'n3',
    language: 'python',
    goal: 'Auditer l’emplacement des composants standards pour respecter la loi de Jakob (les utilisateurs passent la majorité de leur temps sur d’autres sites).',
    brief: '<p>Le script lit sur l\'entrée standard des lignes au format <code>&lt;Composant&gt; &lt;Position&gt;</code>.<br>\nLes conventions ergonomiques standards imposent :<br>\n- <code>Logo</code> : doit être <code>EnHautAGauche</code>.<br>\n- <code>Panier</code> : doit être <code>EnHautADroite</code>.<br>\n- <code>Profil</code> : doit être <code>EnHautADroite</code>.<br>\n- <code>Recherche</code> : doit être <code>EnHautCentre</code> ou <code>EnHautADroite</code>.<br>\n- <code>NavigationPrincipale</code> : doit être <code>EnHaut</code> ou <code>AGauche</code>.<br>\n- <code>MentionsLegales</code> : doit être <code>PiedDePage</code>.<br>\nPour chaque ligne, afficher :<br>\n<code>&lt;Composant&gt; [&lt;Position&gt;] -&gt; &lt;CONVENTIONNEL | ANTI_PATTERN&gt;</code><br>\nSi le composant n\'est pas dans le catalogue :<br>\n<code>&lt;Composant&gt; [&lt;Position&gt;] -&gt; INCONNU</code></p>',
    starter: `import sys

lignes = [l.strip() for l in sys.stdin.read().splitlines() if l.strip()]

# À compléter : vérifier chaque composant et son positionnement selon la loi de Jakob
`,
    hints: [
      'La loi de Jakob stipule que briser une convention spatiale forte augmente le temps de recherche et la frustration.',
      'Comparer de manière insensible à la casse.'
    ],
    examples: [
      {
        stdin: 'Logo EnHautAGauche\nPanier EnBasAGauche\nRecherche EnHautCentre',
        expected: 'Logo [EnHautAGauche] -> CONVENTIONNEL\nPanier [EnBasAGauche] -> ANTI_PATTERN\nRecherche [EnHautCentre] -> CONVENTIONNEL',
        note: 'Le panier en bas à gauche enfreint la convention universelle.'
      }
    ],
    tests: [
      {
        label: 'Patterns conventionnels standards',
        stdin: 'Logo EnHautAGauche\nPanier EnHautADroite\nProfil EnHautADroite\nMentionsLegales PiedDePage',
        expected: 'Logo [EnHautAGauche] -> CONVENTIONNEL\nPanier [EnHautADroite] -> CONVENTIONNEL\nProfil [EnHautADroite] -> CONVENTIONNEL\nMentionsLegales [PiedDePage] -> CONVENTIONNEL'
      },
      {
        label: 'Anti-patterns manifestes',
        stdin: 'Logo EnBasADroite\nPanier EnHautAGauche\nNavigationPrincipale EnBasADroite',
        expected: 'Logo [EnBasADroite] -> ANTI_PATTERN\nPanier [EnHautAGauche] -> ANTI_PATTERN\nNavigationPrincipale [EnBasADroite] -> ANTI_PATTERN'
      },
      {
        label: 'Recherche et navigation flexibles',
        stdin: 'Recherche EnHautADroite\nNavigationPrincipale AGauche\nNavigationPrincipale EnHaut',
        expected: 'Recherche [EnHautADroite] -> CONVENTIONNEL\nNavigationPrincipale [AGauche] -> CONVENTIONNEL\nNavigationPrincipale [EnHaut] -> CONVENTIONNEL'
      },
      {
        label: 'Composant inconnu',
        stdin: 'BoutonMagique MilieuEcran\nProfil EnHautAGauche',
        expected: 'BoutonMagique [MilieuEcran] -> INCONNU\nProfil [EnHautAGauche] -> ANTI_PATTERN'
      }
    ],
    solution: `import sys

CONVENTIONS = {
    'logo': {'enhautagauche'},
    'panier': {'enhautadroite'},
    'profil': {'enhautadroite'},
    'recherche': {'enhautcentre', 'enhautadroite'},
    'navigationprincipale': {'enhaut', 'agauche'},
    'mentionslegales': {'pieddepage'}
}

lignes = [l.strip() for l in sys.stdin.read().splitlines() if l.strip()]

for l in lignes:
    parties = l.split(maxsplit=1)
    if len(parties) != 2:
        continue
    comp, pos = parties[0], parties[1]
    comp_norm = comp.lower()
    pos_norm = pos.lower()

    if comp_norm not in CONVENTIONS:
        res = 'INCONNU'
    elif pos_norm in CONVENTIONS[comp_norm]:
        res = 'CONVENTIONNEL'
    else:
        res = 'ANTI_PATTERN'

    print(f"{comp} [{pos}] -> {res}")
`
  }
];

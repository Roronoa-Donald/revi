/**
 * chapitre1.js — Études de cas du cours « uiux ».
 * Mode d'évaluation conceptuelle structurée (language: 'analyse').
 */
'use strict';

module.exports = [
  {
    id: "ux2-c1-e1",
    chapter: 1,
    level: "n1",
    language: 'analyse',
    title: "Classificateur de livrables et activités UI vs UX",
    goal: "Distinguer formellement les responsabilités UI (User Interface) et UX (User Experience) selon les standards de l’industrie.",
    brief: "<p>Pour chaque cas d’application une liste d'activités ou de livrables de conception (un par ligne).<br>\nSelon les standards du design numérique :<br>\n- <strong>UI</strong> : <code>Palette de couleurs</code>, <code>Typographie</code>, <code>Iconographie</code>, <code>Micro-animations</code>, <code>Composants boutons</code>, <code>Design System visuel</code>, <code>Mockup haute fidelite</code>.<br>\n- <strong>UX</strong> : <code>Entretiens utilisateurs</code>, <code>Test d'utilisabilite</code>, <code>Tri de cartes</code>, <code>Persona</code>, <code>Customer Journey Map</code>, <code>Architecture de l'information</code>, <code>Empathy Map</code>.<br>\n- <strong>HYBRIDE</strong> : <code>Wireframe Lo-Fi</code>, <code>Prototype interactif</code>, <code>Audit ergonomique</code>.<br>\nPour chaque entrée, afficher :<br>\n<code>&lt;Livrable&gt; -&gt; &lt;UI|UX|HYBRIDE&gt;</code><br>\nSi le livrable n'est pas reconnu dans la base :<br>\n<code>&lt;Livrable&gt; -&gt; INCONNU</code></p>",
    starter: "# Grille d'analyse (ux2-c1-e1) — Classificateur de livrables et activités UI vs UX\n# Complétez la réponse attendue sous chaque cas ci-dessous :\n\n[Cas 1 — Activités purement UX]\n# Données : Persona\n# Données : Customer Journey Map\n# Données : Tri de cartes\nA_COMPLETER\n\n[Cas 2 — Livrables purement UI]\n# Données : Typographie\n# Données : Iconographie\n# Données : Micro-animations\nA_COMPLETER\n\n[Cas 3 — Activités hybrides et inconnu]\n# Données : Wireframe Lo-Fi\n# Données : Audit ergonomique\n# Données : Deploiement Kubernetes\nA_COMPLETER\n\n[Cas 4 — Mélange de cas réels]\n# Données : Architecture de l'information\n# Données : Mockup haute fidelite\n# Données : Empathy Map\nA_COMPLETER\n",
    hints: [
          "Normaliser les chaînes (retirer espaces superflus, casse insensible).",
          "L'UI traite des aspects graphiques, visuels et perceptifs ; l'UX traite de la recherche, des usages et des parcours."
    ],
    examples: [
          {
                "stdin": "Palette de couleurs\nEntretiens utilisateurs\nPrototype interactif",
                "expected": "Palette de couleurs -> UI\nEntretiens utilisateurs -> UX\nPrototype interactif -> HYBRIDE",
                "note": "Classification canonique des activités produit."
          }
    ],
    tests: [
          {
                "label": "Activités purement UX",
                "stdin": "cas:1",
                "expected": "Persona -> UX\nCustomer Journey Map -> UX\nTri de cartes -> UX"
          },
          {
                "label": "Livrables purement UI",
                "stdin": "cas:2",
                "expected": "Typographie -> UI\nIconographie -> UI\nMicro-animations -> UI"
          },
          {
                "label": "Activités hybrides et inconnu",
                "stdin": "cas:3",
                "expected": "Wireframe Lo-Fi -> HYBRIDE\nAudit ergonomique -> HYBRIDE\nDeploiement Kubernetes -> INCONNU"
          },
          {
                "label": "Mélange de cas réels",
                "stdin": "cas:4",
                "expected": "Architecture de l'information -> UX\nMockup haute fidelite -> UI\nEmpathy Map -> UX"
          }
    ],
    solution: "[Exemple]\nPalette de couleurs -> UI\nEntretiens utilisateurs -> UX\nPrototype interactif -> HYBRIDE\n\n[Cas 1 — Activités purement UX]\nPersona -> UX\nCustomer Journey Map -> UX\nTri de cartes -> UX\n\n[Cas 2 — Livrables purement UI]\nTypographie -> UI\nIconographie -> UI\nMicro-animations -> UI\n\n[Cas 3 — Activités hybrides et inconnu]\nWireframe Lo-Fi -> HYBRIDE\nAudit ergonomique -> HYBRIDE\nDeploiement Kubernetes -> INCONNU\n\n[Cas 4 — Mélange de cas réels]\nArchitecture de l'information -> UX\nMockup haute fidelite -> UI\nEmpathy Map -> UX\n"
  },
  {
    id: "ux2-c1-e2",
    chapter: 1,
    level: "n2",
    language: 'analyse',
    title: "Calculateur de phases du Double Diamant",
    goal: "Mapper les étapes de projet sur les 4 phases du modèle Double Diamant (Design Council) en identifiant les modes divergent et convergent.",
    brief: "<p>Pour chaque cas d’application une liste d'actions de projet (une par ligne).<br>\nSelon le framework officiel du Double Diamant :<br>\n- <strong>Phase 1 (Découvrir / Divergent)</strong> : <code>Recherche terrain</code>, <code>Entretiens</code>, <code>Benchmarking concurrentiel</code>, <code>Observation utilisateur</code>.<br>\n- <strong>Phase 2 (Définir / Convergent)</strong> : <code>Synthese personas</code>, <code>Cadrage du probleme</code>, <code>Priorisation MoSCoW</code>, <code>Definition du HMW</code>.<br>\n- <strong>Phase 3 (Développer / Divergent)</strong> : <code>Ideation brainstorming</code>, <code>Esquisses papier</code>, <code>Wireframing Lo-Fi</code>, <code>Auto Layout Figma</code>.<br>\n- <strong>Phase 4 (Livrer / Convergent)</strong> : <code>Tests utilisateurs finaux</code>, <code>Design System documentation</code>, <code>Recette UI avec developpeurs</code>, <code>Lancement et mesure analytics</code>.<br>\nPour chaque action, afficher :<br>\n<code>&lt;Action&gt; | PHASE: &lt;1_DECOUVRIR|2_DEFINIR|3_DEVELOPPER|4_LIVRER&gt; | MODE: &lt;DIVERGENT|CONVERGENT&gt;</code><br>\nSi non reconnue :<br>\n<code>&lt;Action&gt; | PHASE: INCONNUE | MODE: INCONNU</code></p>",
    starter: "# Grille d'analyse (ux2-c1-e2) — Calculateur de phases du Double Diamant\n# Complétez la réponse attendue sous chaque cas ci-dessous :\n\n[Cas 1 — Diamant 1 : Problème]\n# Données : Entretiens\n# Données : Benchmarking concurrentiel\n# Données : Synthese personas\n# Données : Priorisation MoSCoW\nA_COMPLETER\n\n[Cas 2 — Diamant 2 : Solution]\n# Données : Esquisses papier\n# Données : Auto Layout Figma\n# Données : Design System documentation\n# Données : Lancement et mesure analytics\nA_COMPLETER\n\n[Cas 3 — Cas inconnus et HMW]\n# Données : Definition du HMW\n# Données : Wireframing Lo-Fi\n# Données : Refonte base SQL\nA_COMPLETER\n\n[Cas 4 — Recette et observation]\n# Données : Observation utilisateur\n# Données : Recette UI avec developpeurs\nA_COMPLETER\n",
    hints: [
          "Le premier diamant explore le problème (Découvrir divergent -> Définir convergent).",
          "Le second diamant explore la solution (Développer divergent -> Livrer convergent)."
    ],
    examples: [
          {
                "stdin": "Recherche terrain\nCadrage du probleme\nIdeation brainstorming\nTests utilisateurs finaux",
                "expected": "Recherche terrain | PHASE: 1_DECOUVRIR | MODE: DIVERGENT\nCadrage du probleme | PHASE: 2_DEFINIR | MODE: CONVERGENT\nIdeation brainstorming | PHASE: 3_DEVELOPPER | MODE: DIVERGENT\nTests utilisateurs finaux | PHASE: 4_LIVRER | MODE: CONVERGENT",
                "note": "Traversée complète des 4 étapes du Double Diamant."
          }
    ],
    tests: [
          {
                "label": "Diamant 1 : Problème",
                "stdin": "cas:1",
                "expected": "Entretiens | PHASE: 1_DECOUVRIR | MODE: DIVERGENT\nBenchmarking concurrentiel | PHASE: 1_DECOUVRIR | MODE: DIVERGENT\nSynthese personas | PHASE: 2_DEFINIR | MODE: CONVERGENT\nPriorisation MoSCoW | PHASE: 2_DEFINIR | MODE: CONVERGENT"
          },
          {
                "label": "Diamant 2 : Solution",
                "stdin": "cas:2",
                "expected": "Esquisses papier | PHASE: 3_DEVELOPPER | MODE: DIVERGENT\nAuto Layout Figma | PHASE: 3_DEVELOPPER | MODE: DIVERGENT\nDesign System documentation | PHASE: 4_LIVRER | MODE: CONVERGENT\nLancement et mesure analytics | PHASE: 4_LIVRER | MODE: CONVERGENT"
          },
          {
                "label": "Cas inconnus et HMW",
                "stdin": "cas:3",
                "expected": "Definition du HMW | PHASE: 2_DEFINIR | MODE: CONVERGENT\nWireframing Lo-Fi | PHASE: 3_DEVELOPPER | MODE: DIVERGENT\nRefonte base SQL | PHASE: INCONNUE | MODE: INCONNU"
          },
          {
                "label": "Recette et observation",
                "stdin": "cas:4",
                "expected": "Observation utilisateur | PHASE: 1_DECOUVRIR | MODE: DIVERGENT\nRecette UI avec developpeurs | PHASE: 4_LIVRER | MODE: CONVERGENT"
          }
    ],
    solution: "[Exemple]\nRecherche terrain | PHASE: 1_DECOUVRIR | MODE: DIVERGENT\nCadrage du probleme | PHASE: 2_DEFINIR | MODE: CONVERGENT\nIdeation brainstorming | PHASE: 3_DEVELOPPER | MODE: DIVERGENT\nTests utilisateurs finaux | PHASE: 4_LIVRER | MODE: CONVERGENT\n\n[Cas 1 — Diamant 1 : Problème]\nEntretiens | PHASE: 1_DECOUVRIR | MODE: DIVERGENT\nBenchmarking concurrentiel | PHASE: 1_DECOUVRIR | MODE: DIVERGENT\nSynthese personas | PHASE: 2_DEFINIR | MODE: CONVERGENT\nPriorisation MoSCoW | PHASE: 2_DEFINIR | MODE: CONVERGENT\n\n[Cas 2 — Diamant 2 : Solution]\nEsquisses papier | PHASE: 3_DEVELOPPER | MODE: DIVERGENT\nAuto Layout Figma | PHASE: 3_DEVELOPPER | MODE: DIVERGENT\nDesign System documentation | PHASE: 4_LIVRER | MODE: CONVERGENT\nLancement et mesure analytics | PHASE: 4_LIVRER | MODE: CONVERGENT\n\n[Cas 3 — Cas inconnus et HMW]\nDefinition du HMW | PHASE: 2_DEFINIR | MODE: CONVERGENT\nWireframing Lo-Fi | PHASE: 3_DEVELOPPER | MODE: DIVERGENT\nRefonte base SQL | PHASE: INCONNUE | MODE: INCONNU\n\n[Cas 4 — Recette et observation]\nObservation utilisateur | PHASE: 1_DECOUVRIR | MODE: DIVERGENT\nRecette UI avec developpeurs | PHASE: 4_LIVRER | MODE: CONVERGENT\n"
  },
  {
    id: "ux2-c1-e3",
    chapter: 1,
    level: "n3",
    language: 'analyse',
    title: "Validateur de patterns d’interface (Loi de Jakob)",
    goal: "Auditer l’emplacement des composants standards pour respecter la loi de Jakob (les utilisateurs passent la majorité de leur temps sur d’autres sites).",
    brief: "<p>Pour chaque cas d’application des lignes au format <code>&lt;Composant&gt; &lt;Position&gt;</code>.<br>\nLes conventions ergonomiques standards imposent :<br>\n- <code>Logo</code> : doit être <code>EnHautAGauche</code>.<br>\n- <code>Panier</code> : doit être <code>EnHautADroite</code>.<br>\n- <code>Profil</code> : doit être <code>EnHautADroite</code>.<br>\n- <code>Recherche</code> : doit être <code>EnHautCentre</code> ou <code>EnHautADroite</code>.<br>\n- <code>NavigationPrincipale</code> : doit être <code>EnHaut</code> ou <code>AGauche</code>.<br>\n- <code>MentionsLegales</code> : doit être <code>PiedDePage</code>.<br>\nPour chaque ligne, afficher :<br>\n<code>&lt;Composant&gt; [&lt;Position&gt;] -&gt; &lt;CONVENTIONNEL | ANTI_PATTERN&gt;</code><br>\nSi le composant n'est pas dans le catalogue :<br>\n<code>&lt;Composant&gt; [&lt;Position&gt;] -&gt; INCONNU</code></p>",
    starter: "# Grille d'analyse (ux2-c1-e3) — Validateur de patterns d’interface (Loi de Jakob)\n# Complétez la réponse attendue sous chaque cas ci-dessous :\n\n[Cas 1 — Patterns conventionnels standards]\n# Données : Logo EnHautAGauche\n# Données : Panier EnHautADroite\n# Données : Profil EnHautADroite\n# Données : MentionsLegales PiedDePage\nA_COMPLETER\n\n[Cas 2 — Anti-patterns manifestes]\n# Données : Logo EnBasADroite\n# Données : Panier EnHautAGauche\n# Données : NavigationPrincipale EnBasADroite\nA_COMPLETER\n\n[Cas 3 — Recherche et navigation flexibles]\n# Données : Recherche EnHautADroite\n# Données : NavigationPrincipale AGauche\n# Données : NavigationPrincipale EnHaut\nA_COMPLETER\n\n[Cas 4 — Composant inconnu]\n# Données : BoutonMagique MilieuEcran\n# Données : Profil EnHautAGauche\nA_COMPLETER\n",
    hints: [
          "La loi de Jakob stipule que briser une convention spatiale forte augmente le temps de recherche et la frustration.",
          "Comparer de manière insensible à la casse."
    ],
    examples: [
          {
                "stdin": "Logo EnHautAGauche\nPanier EnBasAGauche\nRecherche EnHautCentre",
                "expected": "Logo [EnHautAGauche] -> CONVENTIONNEL\nPanier [EnBasAGauche] -> ANTI_PATTERN\nRecherche [EnHautCentre] -> CONVENTIONNEL",
                "note": "Le panier en bas à gauche enfreint la convention universelle."
          }
    ],
    tests: [
          {
                "label": "Patterns conventionnels standards",
                "stdin": "cas:1",
                "expected": "Logo [EnHautAGauche] -> CONVENTIONNEL\nPanier [EnHautADroite] -> CONVENTIONNEL\nProfil [EnHautADroite] -> CONVENTIONNEL\nMentionsLegales [PiedDePage] -> CONVENTIONNEL"
          },
          {
                "label": "Anti-patterns manifestes",
                "stdin": "cas:2",
                "expected": "Logo [EnBasADroite] -> ANTI_PATTERN\nPanier [EnHautAGauche] -> ANTI_PATTERN\nNavigationPrincipale [EnBasADroite] -> ANTI_PATTERN"
          },
          {
                "label": "Recherche et navigation flexibles",
                "stdin": "cas:3",
                "expected": "Recherche [EnHautADroite] -> CONVENTIONNEL\nNavigationPrincipale [AGauche] -> CONVENTIONNEL\nNavigationPrincipale [EnHaut] -> CONVENTIONNEL"
          },
          {
                "label": "Composant inconnu",
                "stdin": "cas:4",
                "expected": "BoutonMagique [MilieuEcran] -> INCONNU\nProfil [EnHautAGauche] -> ANTI_PATTERN"
          }
    ],
    solution: "[Exemple]\nLogo [EnHautAGauche] -> CONVENTIONNEL\nPanier [EnBasAGauche] -> ANTI_PATTERN\nRecherche [EnHautCentre] -> CONVENTIONNEL\n\n[Cas 1 — Patterns conventionnels standards]\nLogo [EnHautAGauche] -> CONVENTIONNEL\nPanier [EnHautADroite] -> CONVENTIONNEL\nProfil [EnHautADroite] -> CONVENTIONNEL\nMentionsLegales [PiedDePage] -> CONVENTIONNEL\n\n[Cas 2 — Anti-patterns manifestes]\nLogo [EnBasADroite] -> ANTI_PATTERN\nPanier [EnHautAGauche] -> ANTI_PATTERN\nNavigationPrincipale [EnBasADroite] -> ANTI_PATTERN\n\n[Cas 3 — Recherche et navigation flexibles]\nRecherche [EnHautADroite] -> CONVENTIONNEL\nNavigationPrincipale [AGauche] -> CONVENTIONNEL\nNavigationPrincipale [EnHaut] -> CONVENTIONNEL\n\n[Cas 4 — Composant inconnu]\nBoutonMagique [MilieuEcran] -> INCONNU\nProfil [EnHautAGauche] -> ANTI_PATTERN\n"
  }
];

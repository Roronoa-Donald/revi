'use strict';

module.exports = [
  {
    "id": "um2-c1-e1",
    "chapter": 1,
    "title": "Classificateur des 14 diagrammes UML 2.5",
    "level": "n1",
    "language": "analyse",
    "goal": "Classifier les diagrammes UML selon la taxonomie officielle OMG : Structurel vs Comportemental (et sous-catégorie Interaction).",
    "brief": "<p>Analysez les données fournies pour chaque cas.<br>\nSelon la spécification OMG UML 2.5 :<br>\n- <strong>STRUCTUREL (7 diagrammes)</strong> : <code>Classes</code>, <code>Objets</code>, <code>Composants</code>, <code>Deploiement</code>, <code>Paquetages</code>, <code>Structures composites</code>, <code>Profils</code>.<br>\n- <strong>COMPORTEMENTAL_INTERACTION (4 diagrammes)</strong> : <code>Sequence</code>, <code>Communication</code>, <code>Timing</code>, <code>Vue d'ensemble des interactions</code>.<br>\n- <strong>COMPORTEMENTAL_AUTRE (3 diagrammes)</strong> : <code>Cas d'utilisation</code>, <code>Activite</code>, <code>Etats-Transitions</code>.<br>\nPour chaque diagramme, afficher :<br>\n<code>&lt;Nom&gt; -&gt; &lt;STRUCTUREL | INTERACTION | COMPORTEMENTAL&gt;</code><br>\nSi le nom est inconnu de la norme UML :<br>\n<code>&lt;Nom&gt; -&gt; INCONNU</code></p>",
    "starter": "# Grille d'analyse (um2-c1-e1) — Classificateur des 14 diagrammes UML 2.5\n# Complétez la résolution demandée sous chaque cas ci-dessous :\n\n[Cas 1 — Diagrammes structurels fondamentaux]\n# Données : Objets\n# Données : Composants\n# Données : Deploiement\n# Données : Paquetages\nA_COMPLETER\n\n[Cas 2 — Diagrammes d interaction complets]\n# Données : Communication\n# Données : Timing\n# Données : Vue d'ensemble des interactions\nA_COMPLETER\n\n[Cas 3 — Diagrammes comportementaux généraux]\n# Données : Cas d'utilisation\n# Données : Etats-Transitions\nA_COMPLETER\n",
    "hints": [
      "Normaliser les noms (ignorer la casse et les espaces superflus).",
      "Les diagrammes d'interaction forment une sous-famille des diagrammes comportementaux."
    ],
    "examples": [
      {
        "stdin": "Classes\nSequence\nActivite\nE-R",
        "expected": "Classes -> STRUCTUREL\nSequence -> INTERACTION\nActivite -> COMPORTEMENTAL\nE-R -> INCONNU",
        "note": "E-R appartient à Merise ou à la modélisation relationnelle, pas à la taxonomie officielle UML."
      }
    ],
    "tests": [
      {
        "label": "Diagrammes structurels fondamentaux",
        "stdin": "cas:1",
        "expected": "Objets -> STRUCTUREL\nComposants -> STRUCTUREL\nDeploiement -> STRUCTUREL\nPaquetages -> STRUCTUREL"
      },
      {
        "label": "Diagrammes d interaction complets",
        "stdin": "cas:2",
        "expected": "Communication -> INTERACTION\nTiming -> INTERACTION\nVue d'ensemble des interactions -> INTERACTION"
      },
      {
        "label": "Diagrammes comportementaux généraux",
        "stdin": "cas:3",
        "expected": "Cas d'utilisation -> COMPORTEMENTAL\nEtats-Transitions -> COMPORTEMENTAL"
      }
    ],
    "solution": "[Exemple]\nClasses -> STRUCTUREL\nSequence -> INTERACTION\nActivite -> COMPORTEMENTAL\nE-R -> INCONNU\n\n[Cas 1 — Diagrammes structurels fondamentaux]\nObjets -> STRUCTUREL\nComposants -> STRUCTUREL\nDeploiement -> STRUCTUREL\nPaquetages -> STRUCTUREL\n\n[Cas 2 — Diagrammes d interaction complets]\nCommunication -> INTERACTION\nTiming -> INTERACTION\nVue d'ensemble des interactions -> INTERACTION\n\n[Cas 3 — Diagrammes comportementaux généraux]\nCas d'utilisation -> COMPORTEMENTAL\nEtats-Transitions -> COMPORTEMENTAL"
  },
  {
    "id": "um2-c1-e2",
    "chapter": 1,
    "title": "Validateur de contraintes OCL élémentaires",
    "level": "n2",
    "language": "analyse",
    "goal": "Évaluer des contraintes invariantes OCL (Object Constraint Language) sur des instances d'objets.",
    "brief": "<p>Analysez les données fournies pour chaque cas.&lt;attribut&gt; &lt;op&gt; &lt;valeur&gt;</code><br>\n  (opérateurs supportés : <code>&gt;=</code>, <code>&lt;=</code>, <code>&gt;</code>, <code>&lt;</code>, <code>==</code>, <code>!=</code>).<br>\n- Lignes suivantes : Instances de la classe au format <code>&lt;id_instance&gt; &lt;valeur_attribut&gt;</code> (ex: <code>compte1 150.0</code>).<br>\nPour chaque instance, évaluer la contrainte OCL et afficher :<br>\n<code>[&lt;VALIDE|VIOLE&gt;] &lt;id_instance&gt; : self.&lt;attribut&gt;=&lt;val&gt; (&lt;op&gt; &lt;valeur_attendue&gt;)</code><br>\nÀ la fin, afficher le bilan :<br>\n<code>BILAN: &lt;nb_valides&gt;/&lt;total&gt; conformes</code></p>",
    "starter": "# Grille d'analyse (um2-c1-e2) — Validateur de contraintes OCL élémentaires\n# Complétez la résolution demandée sous chaque cas ci-dessous :\n\n[Cas 1 — Invariant d âge de majorité]\n# Données : context Personne inv majorite: self.age >= 18\n# Données : p1 25\n# Données : p2 16\n# Données : p3 18\nA_COMPLETER\n\n[Cas 2 — Invariant d égalité stricte]\n# Données : context Capteur inv calibrage: self.etat == 1\n# Données : c1 1\n# Données : c2 0\nA_COMPLETER\n\n[Cas 3 — Invariant de plafond de stock]\n# Données : context Article inv stockMax: self.qte <= 100\n# Données : art1 50\n# Données : art2 120\n# Données : art3 100\nA_COMPLETER\n",
    "hints": [
      "Extraire l'attribut, l'opérateur et la valeur de référence depuis la ligne d'invariant OCL.",
      "Convertir les valeurs numériques en float si nécessaire pour une comparaison mathématique exacte."
    ],
    "examples": [
      {
        "stdin": "context Compte inv soldePositif: self.solde >= 0\ncompte1 150.0\ncompte2 -20.5\ncompte3 0.0",
        "expected": "[VALIDE] compte1 : self.solde=150.0 (>= 0.0)\n[VIOLE] compte2 : self.solde=-20.5 (>= 0.0)\n[VALIDE] compte3 : self.solde=0.0 (>= 0.0)\nBILAN: 2/3 conformes",
        "note": "Évaluation d'un invariant de solde bancaire non négatif."
      }
    ],
    "tests": [
      {
        "label": "Invariant d âge de majorité",
        "stdin": "cas:1",
        "expected": "[VALIDE] p1 : self.age=25.0 (>= 18.0)\n[VIOLE] p2 : self.age=16.0 (>= 18.0)\n[VALIDE] p3 : self.age=18.0 (>= 18.0)\nBILAN: 2/3 conformes"
      },
      {
        "label": "Invariant d égalité stricte",
        "stdin": "cas:2",
        "expected": "[VALIDE] c1 : self.etat=1.0 (== 1.0)\n[VIOLE] c2 : self.etat=0.0 (== 1.0)\nBILAN: 1/2 conformes"
      },
      {
        "label": "Invariant de plafond de stock",
        "stdin": "cas:3",
        "expected": "[VALIDE] art1 : self.qte=50.0 (<= 100.0)\n[VIOLE] art2 : self.qte=120.0 (<= 100.0)\n[VALIDE] art3 : self.qte=100.0 (<= 100.0)\nBILAN: 2/3 conformes"
      }
    ],
    "solution": "[Exemple]\n[VALIDE] compte1 : self.solde=150.0 (>= 0.0)\n[VIOLE] compte2 : self.solde=-20.5 (>= 0.0)\n[VALIDE] compte3 : self.solde=0.0 (>= 0.0)\nBILAN: 2/3 conformes\n\n[Cas 1 — Invariant d âge de majorité]\n[VALIDE] p1 : self.age=25.0 (>= 18.0)\n[VIOLE] p2 : self.age=16.0 (>= 18.0)\n[VALIDE] p3 : self.age=18.0 (>= 18.0)\nBILAN: 2/3 conformes\n\n[Cas 2 — Invariant d égalité stricte]\n[VALIDE] c1 : self.etat=1.0 (== 1.0)\n[VIOLE] c2 : self.etat=0.0 (== 1.0)\nBILAN: 1/2 conformes\n\n[Cas 3 — Invariant de plafond de stock]\n[VALIDE] art1 : self.qte=50.0 (<= 100.0)\n[VIOLE] art2 : self.qte=120.0 (<= 100.0)\n[VALIDE] art3 : self.qte=100.0 (<= 100.0)\nBILAN: 2/3 conformes"
  },
  {
    "id": "um2-c1-e3",
    "chapter": 1,
    "title": "Parseur de stéréotypes et architecture ECB",
    "level": "n3",
    "language": "analyse",
    "goal": "Analyser des stéréotypes UML et valider les règles architecturales du motif Entity-Control-Boundary (ECB).",
    "brief": "<p>Le motif ECB (analyse robuste UML d’Ivar Jacobson) structure les classes selon 3 stéréotypes :<br>\n- <code>&lt;&lt;entity&gt;&gt;</code> (Entité métier / données persistantes)<br>\n- <code>&lt;&lt;control&gt;&gt;</code> (Contrôleur / logique métier, orchestration)<br>\n- <code>&lt;&lt;boundary&gt;&gt;</code> (Frontière / interface utilisateur ou API externe)<br>\nRègles de couplage autorisées :<br>\n1. Un <code>boundary</code> peut communiquer avec un <code>control</code> (VALIDE), mais JAMAIS directement avec une <code>entity</code> ni un autre <code>boundary</code>.<br>\n2. Un <code>control</code> peut communiquer avec un <code>boundary</code>, une <code>entity</code> ou un autre <code>control</code> (VALIDE).<br>\n3. Une <code>entity</code> ne peut communiquer qu’avec un <code>control</code> ou une autre <code>entity</code> (VALIDE). Une entity ne doit JAMAIS dépendre d’un <code>boundary</code>.<br>\nAnalysez les données fournies pour chaque cas.<br>\nTerminer par le nombre de violations d’architecture : <code>VIOLATIONS ARCHITECTURALES: &lt;N&gt;</code>.</p>",
    "starter": "# Grille d'analyse (um2-c1-e3) — Parseur de stéréotypes et architecture ECB\n# Complétez la résolution demandée sous chaque cas ci-dessous :\n\n[Cas 1 — Architecture ECB parfaitement saine]\n# Données : CLASS PanierVue <<boundary>>\n# Données : CLASS PanierCtrl <<control>>\n# Données : CLASS LigneCommande <<entity>>\n# Données : RELATION PanierVue -> PanierCtrl\n# Données : RELATION PanierCtrl -> LigneCommande\nA_COMPLETER\n\n[Cas 2 — Couplage interdit entre deux boundaries]\n# Données : CLASS Vue1 <<boundary>>\n# Données : CLASS Vue2 <<boundary>>\n# Données : RELATION Vue1 -> Vue2\nA_COMPLETER\n\n[Cas 3 — Entité dépendant d une interface utilisateur]\n# Données : CLASS Facture <<entity>>\n# Données : CLASS EcranPrint <<boundary>>\n# Données : RELATION Facture -> EcranPrint\nA_COMPLETER\n",
    "hints": [
      "Stocker les stéréotypes dans un dictionnaire classe -> stereotype (entity, control, boundary).",
      "Identifier les dépendances interdites : boundary -> entity directe et entity -> boundary."
    ],
    "examples": [
      {
        "stdin": "CLASS PageAccueil <<boundary>>\nCLASS AuthController <<control>>\nCLASS Utilisateur <<entity>>\nRELATION PageAccueil -> AuthController\nRELATION PageAccueil -> Utilisateur\nRELATION AuthController -> Utilisateur",
        "expected": "[VALIDE] PageAccueil (boundary) -> AuthController (control) : Interaction UI vers controleur\n[ERREUR] PageAccueil (boundary) -> Utilisateur (entity) : Violation Boundary direct vers Entity\n[VALIDE] AuthController (control) -> Utilisateur (entity) : Acces controleur vers entite\nVIOLATIONS ARCHITECTURALES: 1",
        "note": "Une violation détectée car l'interface accède directement à l'entité sans passer par un contrôleur."
      }
    ],
    "tests": [
      {
        "label": "Architecture ECB parfaitement saine",
        "stdin": "cas:1",
        "expected": "[VALIDE] PanierVue (boundary) -> PanierCtrl (control) : Interaction UI vers controleur\n[VALIDE] PanierCtrl (control) -> LigneCommande (entity) : Acces controleur vers entite\nVIOLATIONS ARCHITECTURALES: 0"
      },
      {
        "label": "Couplage interdit entre deux boundaries",
        "stdin": "cas:2",
        "expected": "[ERREUR] Vue1 (boundary) -> Vue2 (boundary) : Violation Boundary direct vers Boundary\nVIOLATIONS ARCHITECTURALES: 1"
      },
      {
        "label": "Entité dépendant d une interface utilisateur",
        "stdin": "cas:3",
        "expected": "[ERREUR] Facture (entity) -> EcranPrint (boundary) : Violation Entity dependant de Boundary\nVIOLATIONS ARCHITECTURALES: 1"
      }
    ],
    "solution": "[Exemple]\n[VALIDE] PageAccueil (boundary) -> AuthController (control) : Interaction UI vers controleur\n[ERREUR] PageAccueil (boundary) -> Utilisateur (entity) : Violation Boundary direct vers Entity\n[VALIDE] AuthController (control) -> Utilisateur (entity) : Acces controleur vers entite\nVIOLATIONS ARCHITECTURALES: 1\n\n[Cas 1 — Architecture ECB parfaitement saine]\n[VALIDE] PanierVue (boundary) -> PanierCtrl (control) : Interaction UI vers controleur\n[VALIDE] PanierCtrl (control) -> LigneCommande (entity) : Acces controleur vers entite\nVIOLATIONS ARCHITECTURALES: 0\n\n[Cas 2 — Couplage interdit entre deux boundaries]\n[ERREUR] Vue1 (boundary) -> Vue2 (boundary) : Violation Boundary direct vers Boundary\nVIOLATIONS ARCHITECTURALES: 1\n\n[Cas 3 — Entité dépendant d une interface utilisateur]\n[ERREUR] Facture (entity) -> EcranPrint (boundary) : Violation Entity dependant de Boundary\nVIOLATIONS ARCHITECTURALES: 1"
  }
];

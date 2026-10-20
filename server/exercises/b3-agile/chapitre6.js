/**
 * chapitre6.js — Études de cas du cours « b3-agile ».
 * Mode d'évaluation conceptuelle structurée (language: 'analyse').
 */
'use strict';

module.exports = [
  {
    id: "ag3-c6-e1",
    chapter: 6,
    level: "n1",
    language: 'analyse',
    title: "Matrice de Dépendances Inter-équipes en Program Increment (PI Planning)",
    goal: "Détecter les inversions et blocages de dépendances temporelles entre équipes lors d’un PI Planning SAFe.",
    brief: "<p>À l'échelle de l'entreprise (ex: framework <strong>SAFe</strong>), plusieurs équipes synchronisent leurs livraisons au cours d'un Program Increment (PI) composé de 5 Sprints.<br><br>\nUne équipe consommatrice <code>client_squad</code> a besoin d'un composant de <code>supplier_squad</code> avant ou au même sprint que son besoin.<br><br>\nPour chaque cas d’application des dépendances au format :<br>\n<code>DEP_LINK id=&lt;nom&gt; supplier=&lt;nom&gt; supplier_sprint=&lt;1..5&gt; client=&lt;nom&gt; client_sprint=&lt;1..5&gt;</code>.<br><br>\nRègles :<br>\n- Si <code>supplier_sprint &gt; client_sprint</code> :<br>\n  Le fournisseur livre après le besoin du client : <code>status=CRITICAL_INVERSION lag=+{supplier_sprint - client_sprint}sprints</code>.<br>\n- Si <code>supplier_sprint == client_sprint</code> :<br>\n  Livraison au même sprint (tendue) : <code>status=TIGHT_COUPLING lag=0sprints</code>.<br>\n- Si <code>supplier_sprint &lt; client_sprint</code> :<br>\n  Livraison anticipée : <code>status=FEASIBLE_BUFFER margin=+{client_sprint - supplier_sprint}sprints</code>.<br><br>\nPour chaque ligne, afficher :<br>\n<code>DEP_AUDIT id={id} status={status} detail={lag ou margin}</code></p>",
    starter: "# Grille d'analyse (ag3-c6-e1) — Matrice de Dépendances Inter-équipes en Program Increment (PI Planning)\n# Complétez la réponse attendue sous chaque cas ci-dessous :\n\n[Cas 1 — Couplage tendu au même sprint]\n# Données : DEP_LINK id=PAY_GATEWAY supplier=PayTeam supplier_sprint=2 client=CartTeam client_sprint=2\nA_COMPLETER\n\n[Cas 2 — Marge confortable avec livraison anticipée]\n# Données : DEP_LINK id=DB_SCHEMA supplier=DataTeam supplier_sprint=1 client=PortalTeam client_sprint=4\nA_COMPLETER\n\n[Cas 3 — Deux dépendances consécutives]\n# Données : DEP_LINK id=D1 supplier=S1 supplier_sprint=4 client=C1 client_sprint=2\n# Données : DEP_LINK id=D2 supplier=S2 supplier_sprint=1 client=C2 client_sprint=2\nA_COMPLETER\n",
    hints: [
          "Comparer les entiers supplier_sprint et client_sprint.",
          "Si supplier_sprint > client_sprint, c’est une inversion critique."
    ],
    examples: [
          {
                "stdin": "DEP_LINK id=API_AUTH supplier=CoreTeam supplier_sprint=3 client=MobileTeam client_sprint=2",
                "expected": "DEP_AUDIT id=API_AUTH status=CRITICAL_INVERSION detail=lag=+1sprints",
                "note": "CoreTeam livre au sprint 3 alors que MobileTeam en a besoin au sprint 2 : blocage critique."
          }
    ],
    tests: [
          {
                "label": "Couplage tendu au même sprint",
                "stdin": "cas:1",
                "expected": "DEP_AUDIT id=PAY_GATEWAY status=TIGHT_COUPLING detail=lag=0sprints"
          },
          {
                "label": "Marge confortable avec livraison anticipée",
                "stdin": "cas:2",
                "expected": "DEP_AUDIT id=DB_SCHEMA status=FEASIBLE_BUFFER detail=margin=+3sprints"
          },
          {
                "label": "Deux dépendances consécutives",
                "stdin": "cas:3",
                "expected": "DEP_AUDIT id=D1 status=CRITICAL_INVERSION detail=lag=+2sprints\nDEP_AUDIT id=D2 status=FEASIBLE_BUFFER detail=margin=+1sprints"
          }
    ],
    solution: "[Exemple]\nDEP_AUDIT id=API_AUTH status=CRITICAL_INVERSION detail=lag=+1sprints\n\n[Cas 1 — Couplage tendu au même sprint]\nDEP_AUDIT id=PAY_GATEWAY status=TIGHT_COUPLING detail=lag=0sprints\n\n[Cas 2 — Marge confortable avec livraison anticipée]\nDEP_AUDIT id=DB_SCHEMA status=FEASIBLE_BUFFER detail=margin=+3sprints\n\n[Cas 3 — Deux dépendances consécutives]\nDEP_AUDIT id=D1 status=CRITICAL_INVERSION detail=lag=+2sprints\nDEP_AUDIT id=D2 status=FEASIBLE_BUFFER detail=margin=+1sprints\n"
  },
  {
    id: "ag3-c6-e2",
    chapter: 6,
    level: "n2",
    language: 'analyse',
    title: "Validateur d’Organisation Matricielle Spotify (Squads, Tribes, Chapters)",
    goal: "Contrôler la cohérence de l’affectation des ingénieurs au sein du modèle agile d’entreprise (Spotify Model).",
    brief: "<p>Dans le modèle agile popularisé par Henrik Kniberg (Spotify Model) :<br>\n- <strong>Squad</strong> : Cellule autonome pluridisciplinaire (produit, dev, ops).<br>\n- <strong>Tribe</strong> : Regroupement de Squads travaillant sur le même domaine métier.<br>\n- <strong>Chapter</strong> : Ligne de compétence métier (ex: Chapitre QA, Chapitre Backend) transverse au sein d'une même Tribe.<br>\n- <strong>Guild</strong> : Communauté d'intérêt informelle libre à l'échelle de toute l'entreprise.<br><br>\nPour chaque cas d’application des profils au format :<br>\n<code>MEMBER_CHECK name=&lt;nom&gt; squad=&lt;nom&gt; tribe=&lt;nom&gt; chapter=&lt;nom&gt; guilds=&lt;g1,g2|NONE&gt;</code>.<br><br>\nRègles de validation :<br>\n1. Chaque membre doit obligatoirement avoir une Squad non nulle (<code>squad != 'NONE'</code>).<br>\n2. Chaque membre doit obligatoirement être rattaché à une Tribe (<code>tribe != 'NONE'</code>).<br>\n3. Chaque membre doit avoir un Chapter de compétences (<code>chapter != 'NONE'</code>).<br><br>\nSi valide : calculer le nombre de guildes rejointes (0 si <code>guilds == 'NONE'</code>, sinon le nombre d'éléments séparés par virgule).<br>\nAfficher :<br>\n<code>SPOTIFY_AUDIT name={name} status=VALID tribe={tribe} squad={squad} guild_count={count}</code><br>\nSi un élément structurel manque :<br>\n<code>SPOTIFY_AUDIT name={name} status=INVALID missing={élément_manquant}</code></p>",
    starter: "# Grille d'analyse (ag3-c6-e2) — Validateur d’Organisation Matricielle Spotify (Squads, Tribes, Chapters)\n# Complétez la réponse attendue sous chaque cas ci-dessous :\n\n[Cas 1 — Membre sans Squad affectée (orphelin)]\n# Données : MEMBER_CHECK name=Bob squad=NONE tribe=MusicTribe chapter=Frontend guilds=NONE\nA_COMPLETER\n\n[Cas 2 — Membre sans Tribe]\n# Données : MEMBER_CHECK name=Charlie squad=CheckoutSquad tribe=NONE chapter=QA guilds=Security\nA_COMPLETER\n\n[Cas 3 — Membre valide sans aucune guilde]\n# Données : MEMBER_CHECK name=Diana squad=PlayerSquad tribe=MediaTribe chapter=Mobile guilds=NONE\nA_COMPLETER\n",
    hints: [
          "Tester dans l’ordre : squad == \"NONE\", tribe == \"NONE\", chapter == \"NONE\".",
          "Si guilds != \"NONE\", compter les éléments séparés par virgule."
    ],
    examples: [
          {
                "stdin": "MEMBER_CHECK name=Alice squad=SearchSquad tribe=MusicTribe chapter=Backend guilds=DevOps,CleanCode",
                "expected": "SPOTIFY_AUDIT name=Alice status=VALID tribe=MusicTribe squad=SearchSquad guild_count=2",
                "note": "Membre affecté à une Squad, Tribe, Chapter et 2 guildes : valide."
          }
    ],
    tests: [
          {
                "label": "Membre sans Squad affectée (orphelin)",
                "stdin": "cas:1",
                "expected": "SPOTIFY_AUDIT name=Bob status=INVALID missing=squad"
          },
          {
                "label": "Membre sans Tribe",
                "stdin": "cas:2",
                "expected": "SPOTIFY_AUDIT name=Charlie status=INVALID missing=tribe"
          },
          {
                "label": "Membre valide sans aucune guilde",
                "stdin": "cas:3",
                "expected": "SPOTIFY_AUDIT name=Diana status=VALID tribe=MediaTribe squad=PlayerSquad guild_count=0"
          }
    ],
    solution: "[Exemple]\nSPOTIFY_AUDIT name=Alice status=VALID tribe=MusicTribe squad=SearchSquad guild_count=2\n\n[Cas 1 — Membre sans Squad affectée (orphelin)]\nSPOTIFY_AUDIT name=Bob status=INVALID missing=squad\n\n[Cas 2 — Membre sans Tribe]\nSPOTIFY_AUDIT name=Charlie status=INVALID missing=tribe\n\n[Cas 3 — Membre valide sans aucune guilde]\nSPOTIFY_AUDIT name=Diana status=VALID tribe=MediaTribe squad=PlayerSquad guild_count=0\n"
  },
  {
    id: "ag3-c6-e3",
    chapter: 6,
    level: "n3",
    language: 'analyse',
    title: "Radar de Maturité d’Équipe et Détecteur de Dette Méthodologique",
    goal: "Calculer l’indice global de maturité agile d’une équipe sur 5 dimensions clés et alerter sur les faiblesses critiques.",
    brief: "<p>L'amélioration continue s'appuie sur des diagnostics réguliers (Radar Agile) évaluant 5 dimensions sur une échelle de 1 à 5 :<br>\n- <code>CULTURE</code> (Collaboration, psychologie de sécurité)<br>\n- <code>CADENCE</code> (Régularité des livraisons, respect du timeboxing)<br>\n- <code>QUALITY</code> (Tests automatisés, intégration continue, DoD)<br>\n- <code>PRODUCT</code> (Vision PO, valeur utilisateur, découpage des US)<br>\n- <code>FLOW</code> (Gestion du WIP, temps de cycle, autonomie).<br><br>\nPour chaque cas d’application des évaluations au format :<br>\n<code>RADAR_EVAL squad=&lt;nom&gt; culture=&lt;1..5&gt; cadence=&lt;1..5&gt; quality=&lt;1..5&gt; product=&lt;1..5&gt; flow=&lt;1..5&gt;</code>.<br><br>\nRègles :<br>\n- Calculer la moyenne globale <code>avg_score = round(sum_scores / 5.0, 2)</code>.<br>\n- Identifier toutes les dimensions ayant un score <strong>strictement inférieur à 3</strong> (zones de vulnérabilité critique nécessitant un coaching).<br>\n- Si aucune dimension &lt; 3 : <code>coaching_needed=NONE status=HIGH_MATURITY</code>.<br>\n- Sinon : <code>coaching_needed=&lt;liste_dimensions_faibles_séparées_par_virgule&gt; status=COACHING_REQUIRED</code>.<br><br>\nPour chaque ligne, afficher :<br>\n<code>RADAR_REPORT squad={squad} avg_score={avg_score}/5 status={status} alerts={coaching_needed}</code></p>",
    starter: "# Grille d'analyse (ag3-c6-e3) — Radar de Maturité d’Équipe et Détecteur de Dette Méthodologique\n# Complétez la réponse attendue sous chaque cas ci-dessous :\n\n[Cas 1 — Faiblesse critique sur la qualité et le flux]\n# Données : RADAR_EVAL squad=Beta culture=4 cadence=3 quality=2 product=4 flow=1\nA_COMPLETER\n\n[Cas 2 — Équipe en démarrage avec toutes les dimensions à 2]\n# Données : RADAR_EVAL squad=Gamma culture=2 cadence=2 quality=2 product=2 flow=2\nA_COMPLETER\n\n[Cas 3 — Moyenne acceptable avec une seule alerte sur le produit]\n# Données : RADAR_EVAL squad=Delta culture=5 cadence=4 quality=4 product=2 flow=4\nA_COMPLETER\n",
    hints: [
          "Gérer un dictionnaire ordonné des 5 dimensions.",
          "Calculer avg_score = round(somme / 5.0, 2).",
          "Lister les dimensions dont le score est < 3."
    ],
    examples: [
          {
                "stdin": "RADAR_EVAL squad=Alpha culture=4 cadence=4 quality=4 product=4 flow=4",
                "expected": "RADAR_REPORT squad=Alpha avg_score=4.0/5 status=HIGH_MATURITY alerts=NONE",
                "note": "Moyenne 4.0/5, aucune dimension en dessous de 3 : haute maturité."
          }
    ],
    tests: [
          {
                "label": "Faiblesse critique sur la qualité et le flux",
                "stdin": "cas:1",
                "expected": "RADAR_REPORT squad=Beta avg_score=2.8/5 status=COACHING_REQUIRED alerts=quality,flow"
          },
          {
                "label": "Équipe en démarrage avec toutes les dimensions à 2",
                "stdin": "cas:2",
                "expected": "RADAR_REPORT squad=Gamma avg_score=2.0/5 status=COACHING_REQUIRED alerts=culture,cadence,quality,product,flow"
          },
          {
                "label": "Moyenne acceptable avec une seule alerte sur le produit",
                "stdin": "cas:3",
                "expected": "RADAR_REPORT squad=Delta avg_score=3.8/5 status=COACHING_REQUIRED alerts=product"
          }
    ],
    solution: "[Exemple]\nRADAR_REPORT squad=Alpha avg_score=4.0/5 status=HIGH_MATURITY alerts=NONE\n\n[Cas 1 — Faiblesse critique sur la qualité et le flux]\nRADAR_REPORT squad=Beta avg_score=2.8/5 status=COACHING_REQUIRED alerts=quality,flow\n\n[Cas 2 — Équipe en démarrage avec toutes les dimensions à 2]\nRADAR_REPORT squad=Gamma avg_score=2.0/5 status=COACHING_REQUIRED alerts=culture,cadence,quality,product,flow\n\n[Cas 3 — Moyenne acceptable avec une seule alerte sur le produit]\nRADAR_REPORT squad=Delta avg_score=3.8/5 status=COACHING_REQUIRED alerts=product\n"
  }
];

/**
 * chapitre2.js — Études de cas du cours « uiux ».
 * Mode d'évaluation conceptuelle structurée (language: 'analyse').
 */
'use strict';

module.exports = [
  {
    id: "ux2-c2-e1",
    chapter: 2,
    level: "n1",
    language: 'analyse',
    title: "Générateur et validateur de Persona",
    goal: "Extraire et valider les 5 attributs indispensables d’une fiche Persona (Nom, Âge, Métier, Objectif, Frustration).",
    brief: "<p>Pour chaque cas d’application des lignes au format <code>[CLE] Valeur</code>.<br>\nLes 5 champs obligatoires sont : <code>[NOM]</code>, <code>[AGE]</code>, <code>[METIER]</code>, <code>[OBJECTIF]</code>, <code>[FRUSTRATION]</code>.<br>\nSi tous les champs sont présents, afficher :<br>\n<code>PERSONA: &lt;Nom&gt; (&lt;Age&gt; ans, &lt;Metier&gt;)</code><br>\n<code>OBJECTIF: &lt;Objectif&gt;</code><br>\n<code>FRUSTRATION: &lt;Frustration&gt;</code><br>\n<code>STATUT: VALIDE (5/5 champs)</code><br>\nS'il manque un ou plusieurs champs, afficher :<br>\n<code>STATUT: INVALIDE (Manque: &lt;liste des champs manquants dans l'ordre NOM, AGE, METIER, OBJECTIF, FRUSTRATION séparés par virgule et espace&gt;)</code></p>",
    starter: "# Grille d'analyse (ux2-c2-e1) — Générateur et validateur de Persona\n# Complétez la réponse attendue sous chaque cas ci-dessous :\n\n[Cas 1 — Persona complet]\n# Données : [NOM] Marc\n# Données : [AGE] 45\n# Données : [METIER] Comptable\n# Données : [OBJECTIF] Automatiser les factures\n# Données : [FRUSTRATION] Manque d'exports Excel\nA_COMPLETER\n\n[Cas 2 — Champs manquants simples]\n# Données : [NOM] Sophie\n# Données : [AGE] 28\n# Données : [OBJECTIF] Trouver des cours facilement\nA_COMPLETER\n\n[Cas 3 — Manque uniquement FRUSTRATION]\n# Données : [NOM] David\n# Données : [AGE] 50\n# Données : [METIER] Directeur\n# Données : [OBJECTIF] Piloter les KPI\nA_COMPLETER\n\n[Cas 4 — Aucun champ valide]\n# Données : [DESCRIPTION] Un profil quelconque\nA_COMPLETER\n",
    hints: [
          "Utiliser un dictionnaire indexé par le nom du tag sans les crochets.",
          "L'ordre de vérification des champs manquants est [NOM, AGE, METIER, OBJECTIF, FRUSTRATION]."
    ],
    examples: [
          {
                "stdin": "[NOM] Alice\n[AGE] 32\n[METIER] Médecin\n[OBJECTIF] Gagner du temps sur les dossiers\n[FRUSTRATION] Interfaces lentes et redondantes",
                "expected": "PERSONA: Alice (32 ans, Médecin)\nOBJECTIF: Gagner du temps sur les dossiers\nFRUSTRATION: Interfaces lentes et redondantes\nSTATUT: VALIDE (5/5 champs)",
                "note": "Fiche Persona complète et valide."
          }
    ],
    tests: [
          {
                "label": "Persona complet",
                "stdin": "cas:1",
                "expected": "PERSONA: Marc (45 ans, Comptable)\nOBJECTIF: Automatiser les factures\nFRUSTRATION: Manque d'exports Excel\nSTATUT: VALIDE (5/5 champs)"
          },
          {
                "label": "Champs manquants simples",
                "stdin": "cas:2",
                "expected": "STATUT: INVALIDE (Manque: METIER, FRUSTRATION)"
          },
          {
                "label": "Manque uniquement FRUSTRATION",
                "stdin": "cas:3",
                "expected": "STATUT: INVALIDE (Manque: FRUSTRATION)"
          },
          {
                "label": "Aucun champ valide",
                "stdin": "cas:4",
                "expected": "STATUT: INVALIDE (Manque: NOM, AGE, METIER, OBJECTIF, FRUSTRATION)"
          }
    ],
    solution: "[Exemple]\nPERSONA: Alice (32 ans, Médecin)\nOBJECTIF: Gagner du temps sur les dossiers\nFRUSTRATION: Interfaces lentes et redondantes\nSTATUT: VALIDE (5/5 champs)\n\n[Cas 1 — Persona complet]\nPERSONA: Marc (45 ans, Comptable)\nOBJECTIF: Automatiser les factures\nFRUSTRATION: Manque d'exports Excel\nSTATUT: VALIDE (5/5 champs)\n\n[Cas 2 — Champs manquants simples]\nSTATUT: INVALIDE (Manque: METIER, FRUSTRATION)\n\n[Cas 3 — Manque uniquement FRUSTRATION]\nSTATUT: INVALIDE (Manque: FRUSTRATION)\n\n[Cas 4 — Aucun champ valide]\nSTATUT: INVALIDE (Manque: NOM, AGE, METIER, OBJECTIF, FRUSTRATION)\n"
  },
  {
    id: "ux2-c2-e2",
    chapter: 2,
    level: "n2",
    language: 'analyse',
    title: "Calculateur d’indice sur un Parcours Utilisateur",
    goal: "Analyser une Customer Journey Map en calculant le score émotionnel moyen, en détectant le pire point de friction (Pain Point) et le point fort (Delight).",
    brief: "<p>Pour chaque cas d’application une liste d'étapes séparées par des espaces ou retours à la ligne au format <code>&lt;Etape&gt;:&lt;Score&gt;</code>.<br>\nLes scores émotionnels sont des entiers compris entre -2 et +2.<br>\nLe cas doit afficher :<br>\n- <code>SCORE_MOYEN: &lt;Moyenne arrondie à 2 décimales avec signe éventuel ex: +0.25 ou -1.20&gt;</code><br>\n- <code>PAIN_POINT: &lt;Première étape ayant le score minimal&gt; (&lt;ScoreMin&gt;)</code><br>\n- <code>DELIGHT: &lt;Première étape ayant le score maximal&gt; (&lt;ScoreMax&gt;)</code><br>\n- <code>DIAGNOSTIC: &lt;CRITIQUE | EQUILIBRE | EXCELLENT&gt;</code><br>\n(Règle de diagnostic : <code>CRITIQUE</code> si moyenne &lt; 0 ; <code>EQUILIBRE</code> si 0 &lt;= moyenne &lt;= 1.00 ; <code>EXCELLENT</code> si moyenne &gt; 1.00).</p>",
    starter: "# Grille d'analyse (ux2-c2-e2) — Calculateur d’indice sur un Parcours Utilisateur\n# Complétez la réponse attendue sous chaque cas ci-dessous :\n\n[Cas 1 — Parcours catastrophique critique]\n# Données : Accueil:-1 Connexion:-2 Formulaire:-2 Attente:-2\nA_COMPLETER\n\n[Cas 2 — Parcours fluide excellent]\n# Données : Navigation:+2 Choix:+1 Panier:+2 Validation:+2 Suivi:+2\nA_COMPLETER\n\n[Cas 3 — Moyenne positive équilibrée]\n# Données : Telechargement:0 Installation:+1 Configuration:0 Utilisation:+2\nA_COMPLETER\n\n[Cas 4 — Égalités multiples]\n# Données : EtapeA:-1 EtapeB:+1 EtapeC:-1 EtapeD:+1\nA_COMPLETER\n",
    hints: [
          "Gérer les signes explicitement (+0.50, -0.33, 0.00).",
          "En cas d'égalité de score min ou max, conserver la première étape chronologique."
    ],
    examples: [
          {
                "stdin": "Decouverte:+1 Inscription:-1 Recherche:0 Paiement:-2 Reception:+2",
                "expected": "SCORE_MOYEN: 0.00\nPAIN_POINT: Paiement (-2)\nDELIGHT: Reception (+2)\nDIAGNOSTIC: EQUILIBRE",
                "note": "Moyenne nulle : expérience équilibrée mais avec un point de rupture au paiement."
          }
    ],
    tests: [
          {
                "label": "Parcours catastrophique critique",
                "stdin": "cas:1",
                "expected": "SCORE_MOYEN: -1.75\nPAIN_POINT: Connexion (-2)\nDELIGHT: Accueil (-1)\nDIAGNOSTIC: CRITIQUE"
          },
          {
                "label": "Parcours fluide excellent",
                "stdin": "cas:2",
                "expected": "SCORE_MOYEN: +1.80\nPAIN_POINT: Choix (+1)\nDELIGHT: Navigation (+2)\nDIAGNOSTIC: EXCELLENT"
          },
          {
                "label": "Moyenne positive équilibrée",
                "stdin": "cas:3",
                "expected": "SCORE_MOYEN: +0.75\nPAIN_POINT: Telechargement (0)\nDELIGHT: Utilisation (+2)\nDIAGNOSTIC: EQUILIBRE"
          },
          {
                "label": "Égalités multiples",
                "stdin": "cas:4",
                "expected": "SCORE_MOYEN: 0.00\nPAIN_POINT: EtapeA (-1)\nDELIGHT: EtapeB (+1)\nDIAGNOSTIC: EQUILIBRE"
          }
    ],
    solution: "[Exemple]\nSCORE_MOYEN: 0.00\nPAIN_POINT: Paiement (-2)\nDELIGHT: Reception (+2)\nDIAGNOSTIC: EQUILIBRE\n\n[Cas 1 — Parcours catastrophique critique]\nSCORE_MOYEN: -1.75\nPAIN_POINT: Connexion (-2)\nDELIGHT: Accueil (-1)\nDIAGNOSTIC: CRITIQUE\n\n[Cas 2 — Parcours fluide excellent]\nSCORE_MOYEN: +1.80\nPAIN_POINT: Choix (+1)\nDELIGHT: Navigation (+2)\nDIAGNOSTIC: EXCELLENT\n\n[Cas 3 — Moyenne positive équilibrée]\nSCORE_MOYEN: +0.75\nPAIN_POINT: Telechargement (0)\nDELIGHT: Utilisation (+2)\nDIAGNOSTIC: EQUILIBRE\n\n[Cas 4 — Égalités multiples]\nSCORE_MOYEN: 0.00\nPAIN_POINT: EtapeA (-1)\nDELIGHT: EtapeB (+1)\nDIAGNOSTIC: EQUILIBRE\n"
  },
  {
    id: "ux2-c2-e3",
    chapter: 2,
    level: "n3",
    language: 'analyse',
    title: "Analyseur de tri de cartes (Card Sorting)",
    goal: "Analyser les résultats d’un test de tri de cartes pour dégager l’Architecture de l’Information (IA) consensuelle.",
    brief: "<p>Pour chaque cas d’application des lignes au format <code>&lt;Utilisateur&gt; | &lt;Carte&gt; -&gt; &lt;Categorie&gt;</code>.<br>\nPour chaque carte (triées alphabétiquement) :<br>\n- Compter le nombre de fois où la carte a été placée dans chaque catégorie.<br>\n- Si la catégorie la plus fréquente rassemble <strong>au moins 66% (2/3)</strong> des votes pour cette carte, afficher :<br>\n<code>&lt;Carte&gt; : VALIDE (&lt;Categorie&gt; - &lt;Pourcentage&gt;%)</code><br>\n- Sinon (désaccord supérieur à 33%), afficher :<br>\n<code>&lt;Carte&gt; : AMBIGU (Conflit: &lt;Cat1&gt;=&lt;Votes1&gt;, &lt;Cat2&gt;=&lt;Votes2&gt;...)</code><br>\n(avec les catégories en conflit triées par ordre décroissant de votes, puis alphabétique en cas d'égalité).</p>",
    starter: "# Grille d'analyse (ux2-c2-e3) — Analyseur de tri de cartes (Card Sorting)\n# Complétez la réponse attendue sous chaque cas ci-dessous :\n\n[Cas 1 — Consensus parfait à 100%]\n# Données : U1 | Factures -> MonCompte\n# Données : U2 | Factures -> MonCompte\n# Données : U3 | Factures -> MonCompte\nA_COMPLETER\n\n[Cas 2 — Ambiguïté manifeste 50-50]\n# Données : U1 | Favoris -> Boutique\n# Données : U2 | Favoris -> Boutique\n# Données : U3 | Favoris -> Profil\n# Données : U4 | Favoris -> Profil\nA_COMPLETER\n\n[Cas 3 — Multiples cartes et départage alphabétique]\n# Données : U1 | Aide -> Support\n# Données : U2 | Aide -> Contact\n# Données : U3 | Aide -> Support\n# Données : U1 | CGV -> Legal\n# Données : U2 | CGV -> Aide\n# Données : U3 | CGV -> Legal\nA_COMPLETER\n\n[Cas 4 — Dispersion à 3 catégories]\n# Données : U1 | Parametres -> Securite\n# Données : U2 | Parametres -> Compte\n# Données : U3 | Parametres -> Application\nA_COMPLETER\n",
    hints: [
          "Arrondir le pourcentage à l'entier le plus proche (ex: int(round(votes / total * 100))).",
          "Le seuil de 66% correspond à un consensus d'au moins deux tiers des participants."
    ],
    examples: [
          {
                "stdin": "U1 | Panier -> Achat\nU2 | Panier -> Achat\nU3 | Panier -> Compte\nU1 | Profil -> Compte\nU2 | Profil -> Compte\nU3 | Profil -> Compte",
                "expected": "Panier : VALIDE (Achat - 67%)\nProfil : VALIDE (Compte - 100%)",
                "note": "Panier a 2/3 (67%) de votes Achat (consensus suffisant)."
          }
    ],
    tests: [
          {
                "label": "Consensus parfait à 100%",
                "stdin": "cas:1",
                "expected": "Factures : VALIDE (MonCompte - 100%)"
          },
          {
                "label": "Ambiguïté manifeste 50-50",
                "stdin": "cas:2",
                "expected": "Favoris : AMBIGU (Conflit: Boutique=2, Profil=2)"
          },
          {
                "label": "Multiples cartes et départage alphabétique",
                "stdin": "cas:3",
                "expected": "Aide : VALIDE (Support - 67%)\nCGV : VALIDE (Legal - 67%)"
          },
          {
                "label": "Dispersion à 3 catégories",
                "stdin": "cas:4",
                "expected": "Parametres : AMBIGU (Conflit: Application=1, Compte=1, Securite=1)"
          }
    ],
    solution: "[Exemple]\nPanier : VALIDE (Achat - 67%)\nProfil : VALIDE (Compte - 100%)\n\n[Cas 1 — Consensus parfait à 100%]\nFactures : VALIDE (MonCompte - 100%)\n\n[Cas 2 — Ambiguïté manifeste 50-50]\nFavoris : AMBIGU (Conflit: Boutique=2, Profil=2)\n\n[Cas 3 — Multiples cartes et départage alphabétique]\nAide : VALIDE (Support - 67%)\nCGV : VALIDE (Legal - 67%)\n\n[Cas 4 — Dispersion à 3 catégories]\nParametres : AMBIGU (Conflit: Application=1, Compte=1, Securite=1)\n"
  }
];

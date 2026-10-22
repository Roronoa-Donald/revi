/**
 * Exercices mis à jour — remédiation pédagogique
 */
'use strict';

module.exports = [
  {
    "id": "ib2-c1-e1",
    "chapter": 1,
    "level": "n1",
    "language": "analyse",
    "title": "Besoin vs Solution technique",
    "goal": "Distinguer un besoin métier (le « Quoi / Pourquoi ») d’une solution technique prématurée (le « Comment »).",
    "brief": "<p>En ingénierie des exigences, confondre le <strong>besoin</strong> (l’objectif ou la douleur utilisateur) et la <strong>solution</strong> (un choix technique d’implémentation) est une cause majeure d’échec des projets.</p><p>Examine un énoncé fourni dans les données du cas (en minuscules, sans ponctuation finale) et affiche son type :<br>- <code>reduire le temps d attente au guichet</code>, <code>permettre aux clients de suivre leur colis en direct</code>, <code>securiser l acces aux comptes bancaires</code> &rarr; <code>Type: Besoin</code><br>- <code>utiliser react avec mongodb</code>, <code>developper de manière méthodique.12</code>, <code>stocker les logs sur aws s3</code>, <code>installer un cluster kubernetes</code> &rarr; <code>Type: Solution</code><br>Pour toute autre valeur : <code>Type: Inconnu</code>.</p>",
    "starter": "# Grille d'analyse (ib2-c1-e1) — Besoin vs Solution technique\n# Complétez la réponse attendue sous chaque cas ci-dessous :\n\n[Cas 1 — Test 1]\n# Données : utiliser react avec mongodb\nA_COMPLETER\n\n[Cas 2 — Test 2]\n# Données : securiser l acces aux comptes bancaires\nA_COMPLETER\n\n[Cas 3 — Test 3]\n# Données : refaire toute l application en assembleur\nA_COMPLETER\n",
    "hints": [
      "Stocke les énoncés connus dans deux ensembles ou un dictionnaire de correspondances.",
      "Utilisez table.get(enonce, \"Inconnu\") pour renvoyer la valeur par défaut."
    ],
    "examples": [
      {
        "stdin": "reduire le temps d attente au guichet",
        "expected": "Type: Besoin",
        "note": "La réduction du temps d’attente est un objectif métier, non une technologie."
      }
    ],
    "tests": [
      {
        "label": "Test 1",
        "stdin": "cas:1",
        "expected": "Type: Solution"
      },
      {
        "label": "Test 2",
        "stdin": "cas:2",
        "expected": "Type: Besoin"
      },
      {
        "label": "Test 3",
        "stdin": "cas:3",
        "expected": "Type: Inconnu"
      }
    ],
    "solution": "[Exemple]\nType: Besoin\n\n[Cas 1 — Test 1]\nType: Solution\n\n[Cas 2 — Test 2]\nType: Besoin\n\n[Cas 3 — Test 3]\nType: Inconnu\n"
  },
  {
    "id": "ib2-c1-e2",
    "chapter": 1,
    "level": "n2",
    "language": "analyse",
    "title": "Matrice Pouvoir / Intérêt des parties prenantes",
    "goal": "Classifier un acteur selon la matrice Pouvoir / Intérêt de Mendelow pour adapter la stratégie de communication.",
    "brief": "<p>La matrice de Mendelow positionne chaque partie prenante (<em>Stakeholder</em>) selon son niveau de <strong>Pouvoir</strong> (1 à 10) et d’<strong>Intérêt</strong> (1 à 10) :</p><ul>  <li>Pouvoir &ge; 7 et Intérêt &ge; 7 &rarr; <code>Gerer de pres</code> (Acteur clé)</li>  <li>Pouvoir &ge; 7 et Intérêt &lt; 7 &rarr; <code>Garder satisfait</code></li>  <li>Pouvoir &lt; 7 et Intérêt &ge; 7 &rarr; <code>Garder informe</code></li>  <li>Pouvoir &lt; 7 et Intérêt &lt; 7 &rarr; <code>Surveiller</code> (Effort minimal)</li></ul><p>Lit une ligne au format <code>Nom;Pouvoir;Interet</code> et affiche :<br><code>&lt;Nom&gt; -&gt; &lt;Strategie&gt;</code>.</p>",
    "starter": "# Grille d'analyse (ib2-c1-e2) — Matrice Pouvoir / Intérêt des parties prenantes\n# Complétez la réponse attendue sous chaque cas ci-dessous :\n\n[Cas 1 — Test 1]\n# Données : Responsable Juridique;8;4\nA_COMPLETER\n\n[Cas 2 — Test 2]\n# Données : Utilisateur Final;3;9\nA_COMPLETER\n\n[Cas 3 — Test 3]\n# Données : Prestataire Maintenance;2;3\nA_COMPLETER\n",
    "hints": [
      "Découpez la ligne avec l’extraction des champs et convertis pouvoir et intérêt en entiers.",
      "Applique les conditions if/elif/else sur les seuils fixés à 7."
    ],
    "examples": [
      {
        "stdin": "Directeur General;9;8",
        "expected": "Directeur General -> Gerer de pres",
        "note": "Avec un pouvoir de 9 et un intérêt de 8, le Directeur Général doit être géré au plus près."
      }
    ],
    "tests": [
      {
        "label": "Test 1",
        "stdin": "cas:1",
        "expected": "Responsable Juridique -> Garder satisfait"
      },
      {
        "label": "Test 2",
        "stdin": "cas:2",
        "expected": "Utilisateur Final -> Garder informe"
      },
      {
        "label": "Test 3",
        "stdin": "cas:3",
        "expected": "Prestataire Maintenance -> Surveiller"
      }
    ],
    "solution": "[Exemple]\nDirecteur General -> Gerer de pres\n\n[Cas 1 — Test 1]\nResponsable Juridique -> Garder satisfait\n\n[Cas 2 — Test 2]\nUtilisateur Final -> Garder informe\n\n[Cas 3 — Test 3]\nPrestataire Maintenance -> Surveiller\n"
  },
  {
    "id": "ib2-c1-e3",
    "chapter": 1,
    "level": "n3",
    "language": "analyse",
    "title": "Complétude d’une fiche d’exigence",
    "goal": "Valider la structure et la complétude des attributs obligatoires d’une exigence logicielle.",
    "brief": "<p>Une exigence documentée doit comporter 5 attributs indispensables : <code>id</code>, <code>titre</code>, <code>decasion</code>, <code>source</code> et <code>priorite</code>. La priorité doit impérativement être l’une des trois valeurs : <code>Haute</code>, <code>Moyenne</code> ou <code>Basse</code>.</p><p>Analyse un objet JSON fourni(e) dans les données du cas et affiche :<br>- Si valide : <code>VALIDE (&lt;id&gt;)</code><br>- Si un attribut obligatoire est absent ou vide : <code>ERREUR: Champ manquant &lt;nom_champ&gt;</code> (tester les champs dans l’ordre : id, titre, decasion, source, priorite)<br>- Si la priorité n’est pas l’une des 3 valeurs autorisées : <code>ERREUR: Priorite invalide</code>.</p>",
    "starter": "# Grille d'analyse (ib2-c1-e3) — Complétude d’une fiche d’exigence\n# Complétez la réponse attendue sous chaque cas ci-dessous :\n\n[Cas 1 — Test 1]\n# Données : {\"id\": \"REQ-002\", \"titre\": \"\", \"description\": \"Export CSV\", \"source\": \"Finance\", \"priorite\": \"Moyenne\"}\nA_COMPLETER\n\n[Cas 2 — Test 2]\n# Données : {\"id\": \"REQ-003\", \"titre\": \"Audit logs\", \"description\": \"Archivage 1 an\", \"source\": \"Securite\", \"priorite\": \"Urgente\"}\nA_COMPLETER\n\n[Cas 3 — Test 3]\n# Données : {\"id\": \"REQ-004\", \"titre\": \"Recherche\", \"description\": \"Recherche floue\", \"source\": \"Produit\", \"priorite\": \"Basse\"}\nA_COMPLETER\n",
    "hints": [
      "Parse la chaîne avec json.loads().",
      "Vérifiez la présence et la non-vacuité de chaque champ dans la liste ordonnée [\"id\", \"titre\", \"description\", \"source\", \"priorite\"]."
    ],
    "examples": [
      {
        "stdin": "{\"id\": \"REQ-001\", \"titre\": \"Connexion OAuth2\", \"description\": \"L utilisateur doit pouvoir se connecter via Google\", \"source\": \"DSI\", \"priorite\": \"Haute\"}",
        "expected": "VALIDE (REQ-001)",
        "note": "Tous les champs sont renseignés et la priorité est Haute."
      }
    ],
    "tests": [
      {
        "label": "Test 1",
        "stdin": "cas:1",
        "expected": "ERREUR: Champ manquant titre"
      },
      {
        "label": "Test 2",
        "stdin": "cas:2",
        "expected": "ERREUR: Priorite invalide"
      },
      {
        "label": "Test 3",
        "stdin": "cas:3",
        "expected": "VALIDE (REQ-004)"
      }
    ],
    "solution": "[Exemple]\nVALIDE (REQ-001)\n\n[Cas 1 — Test 1]\nERREUR: Champ manquant titre\n\n[Cas 2 — Test 2]\nERREUR: Priorite invalide\n\n[Cas 3 — Test 3]\nVALIDE (REQ-004)\n"
  },
  {
    "id": "ib2-c2-e1",
    "chapter": 2,
    "level": "n1",
    "language": "analyse",
    "title": "Classification FURPS+ des exigences",
    "goal": "Classifier une exigence selon le modèle FURPS+ (Fonctionnelle, Performance, Fiabilité, Utilisabilité).",
    "brief": "<p>Le modèle <strong>FURPS+</strong> structure les exigences logicielles selon leurs attributs de qualité majeurs :</p><ul>  <li><code>authentification</code>, <code>calcul_facture</code>, <code>export_pdf</code>, <code>gestion_panier</code> &rarr; <code>Categorie: Fonctionnelle</code></li>  <li><code>temps_reponse</code>, <code>debit_transactions</code> &rarr; <code>Categorie: Performance</code></li>  <li><code>disponibilite_99_9</code>, <code>sauvegarde_quotidienne</code> &rarr; <code>Categorie: Fiabilite</code></li>  <li><code>accessibilite_wcag</code>, <code>ergonomie_mobile</code> &rarr; <code>Categorie: Utilisabilite</code></li>  <li>Tout autre mot &rarr; <code>Categorie: Autre</code></li></ul><p>Analyse un identifiant de catégorie ou mot-clé fourni(e) dans les données du cas et affiche sa classification.</p>",
    "starter": "# Grille d'analyse (ib2-c2-e1) — Classification FURPS+ des exigences\n# Complétez la réponse attendue sous chaque cas ci-dessous :\n\n[Cas 1 — Test 1]\n# Données : authentification\nA_COMPLETER\n\n[Cas 2 — Test 2]\n# Données : accessibilite_wcag\nA_COMPLETER\n\n[Cas 3 — Test 3]\n# Données : protocole_blockchain\nA_COMPLETER\n",
    "hints": [
      "Créez un dictionnaire ou plusieurs ensembles associant les mots-clés à leur catégorie.",
      "Affichez \"Categorie: Autre\" si le mot n’est pas trouvé."
    ],
    "examples": [
      {
        "stdin": "temps_reponse",
        "expected": "Categorie: Performance",
        "note": "Le temps de réponse mesure la vélocité du système, c’est une exigence non fonctionnelle de performance."
      }
    ],
    "tests": [
      {
        "label": "Test 1",
        "stdin": "cas:1",
        "expected": "Categorie: Fonctionnelle"
      },
      {
        "label": "Test 2",
        "stdin": "cas:2",
        "expected": "Categorie: Utilisabilite"
      },
      {
        "label": "Test 3",
        "stdin": "cas:3",
        "expected": "Categorie: Autre"
      }
    ],
    "solution": "[Exemple]\nCategorie: Performance\n\n[Cas 1 — Test 1]\nCategorie: Fonctionnelle\n\n[Cas 2 — Test 2]\nCategorie: Utilisabilite\n\n[Cas 3 — Test 3]\nCategorie: Autre\n"
  },
  {
    "id": "ib2-c2-e2",
    "chapter": 2,
    "level": "n2",
    "language": "analyse",
    "title": "Détection d’ambiguïtés et termes vagues",
    "goal": "Identifier les termes flous non mesurables proscrits dans la rédaction d’exigences professionnelles.",
    "brief": "<p>En ingénierie des exigences, les termes subjectifs comme <em>rapide</em>, <em>facile</em>, <em>convivial</em>, <em>efficace</em>, <em>flexible</em>, <em>robuste</em>, <em>intuitif</em>, <em>performant</em> ou <em>optimal</em> doivent être remplacés par des métriques vérifiables.</p><p>Analyse une phrase fourni(e) dans les données du cas (la ponctuation peut être présente) et inspecte ses mots (en minuscules).<br>- Si aucun terme vague n’est présent : affiche <code>CONFORME</code>.<br>- Si un ou plusieurs termes vagues sont détectés : affiche <code>AMBIGU: &lt;termes dédupliqués, triés alphabétiquement et séparés par des virgules&gt;</code>.</p>",
    "starter": "# Grille d'analyse (ib2-c2-e2) — Détection d’ambiguïtés et termes vagues\n# Complétez la réponse attendue sous chaque cas ci-dessous :\n\n[Cas 1 — Test 1]\n# Données : Le systeme doit repondre en moins de 250 ms pour 95% des requetes.\nA_COMPLETER\n\n[Cas 2 — Test 2]\n# Données : La solution proposee doit rester flexible et tres robuste face aux pannes.\nA_COMPLETER\n\n[Cas 3 — Test 3]\n# Données : Le design doit etre intuitif et optimal.\nA_COMPLETER\n",
    "hints": [
      "Nettoie la ponctuation (points, virgules) et convertis chaque mot en minuscules.",
      "Gère les variantes féminines ou plurielles des mots vagues : rapide/rapides, facile/faciles, convivial/conviviale/conviviaux/conviviales, etc."
    ],
    "examples": [
      {
        "stdin": "L interface doit etre rapide et conviviale pour les utilisateurs.",
        "expected": "AMBIGU: conviviale, rapide",
        "note": "Les adjectifs rapide et convivial(e) sont vagues et impossibles à tester sans seuil chiffré."
      }
    ],
    "tests": [
      {
        "label": "Test 1",
        "stdin": "cas:1",
        "expected": "CONFORME"
      },
      {
        "label": "Test 2",
        "stdin": "cas:2",
        "expected": "AMBIGU: flexible, robuste"
      },
      {
        "label": "Test 3",
        "stdin": "cas:3",
        "expected": "AMBIGU: intuitif, optimal"
      }
    ],
    "solution": "[Exemple]\nAMBIGU: conviviale, rapide\n\n[Cas 1 — Test 1]\nCONFORME\n\n[Cas 2 — Test 2]\nAMBIGU: flexible, robuste\n\n[Cas 3 — Test 3]\nAMBIGU: intuitif, optimal\n"
  },
  {
    "id": "ib2-c2-e3",
    "chapter": 2,
    "level": "n3",
    "language": "analyse",
    "title": "Vérificateur SMART d’exigence de performance",
    "goal": "Contrôler qu’une exigence de performance respecte les critères de testabilité SMART.",
    "brief": "<p>Une exigence de performance testable doit spécifier :<br>1. Une <strong>métrique</strong> identifiée.<br>2. Une <strong>valeur cible</strong> numérique strictement positive.<br>3. Une <strong>unité de temps</strong> reconnue (<code>ms</code> ou <code>s</code>).<br>4. Une <strong>condition de charge</strong> ou percentile (ex. <code>95% des requetes</code>, <code>99%</code>, avec un pourcentage &ge; 90%).</p><p>Lit une ligne au format <code>Metrique;Valeur;Unite;Condition</code>.<br>- Si valide : affiche <code>TESTABLE: &lt;Metrique&gt; &lt;= &lt;Valeur&gt;&lt;Unite&gt; sous &lt;Condition&gt;</code>.<br>- Si la valeur &le; 0 : affiche <code>REJET: Valeur invalide</code>.<br>- Si l’unité n’est pas <code>ms</code> ou <code>s</code> : affiche <code>REJET: Unite invalide</code>.<br>- Si le pourcentage de condition est inférieur à 90% ou introuvable : affiche <code>REJET: Seuil condition insuffisant</code>.</p>",
    "starter": "# Grille d'analyse (ib2-c2-e3) — Vérificateur SMART d’exigence de performance\n# Complétez la réponse attendue sous chaque cas ci-dessous :\n\n[Cas 1 — Test 1]\n# Données : Chargement page;-5;s;99% des requetes\nA_COMPLETER\n\n[Cas 2 — Test 2]\n# Données : Delai synchro;3;minutes;95% des transactions\nA_COMPLETER\n\n[Cas 3 — Test 3]\n# Données : Temps batch;500;ms;75% des requetes\nA_COMPLETER\n",
    "hints": [
      "Découpez la ligne avec l’extraction des champs. Convertissez la valeur en float ou int.",
      "Utilisez une expression régulière re.search(r\"(\\d+)%\", condition) pour extraire le pourcentage et vérifier qu’il est >= 90."
    ],
    "examples": [
      {
        "stdin": "Temps de reponse;200;ms;95% des requetes",
        "expected": "TESTABLE: Temps de reponse <= 200ms sous 95% des requetes",
        "note": "L’exigence est quantifiée, l’unité est en millisecondes et le percentile atteint 95%."
      }
    ],
    "tests": [
      {
        "label": "Test 1",
        "stdin": "cas:1",
        "expected": "REJET: Valeur invalide"
      },
      {
        "label": "Test 2",
        "stdin": "cas:2",
        "expected": "REJET: Unite invalide"
      },
      {
        "label": "Test 3",
        "stdin": "cas:3",
        "expected": "REJET: Seuil condition insuffisant"
      }
    ],
    "solution": "[Exemple]\nTESTABLE: Temps de reponse <= 200ms sous 95% des requetes\n\n[Cas 1 — Test 1]\nREJET: Valeur invalide\n\n[Cas 2 — Test 2]\nREJET: Unite invalide\n\n[Cas 3 — Test 3]\nREJET: Seuil condition insuffisant\n"
  },
  {
    "id": "ib2-c3-e1",
    "chapter": 3,
    "level": "n1",
    "language": "analyse",
    "title": "Choix de la technique d’élicitation",
    "goal": "Identifier la méthode de recueil des exigences la plus adaptée selon le contexte organisationnel.",
    "brief": "<p>Le choix de la technique d’élicitation dépend de la dispersion des acteurs, de la nature du savoir (explicite ou tacite) et du degré de consensus :</p><ul>  <li><code>utilisateurs_disperses_grand_nombre</code> &rarr; <code>Technique: Questionnaire en ligne</code></li>  <li><code>processus_tacite_metier_complexe</code> &rarr; <code>Technique: Observation terrain (Shadowing)</code></li>  <li><code>conflit_parties_prenantes_consensus</code> &rarr; <code>Technique: Atelier anime (Workshop JAD)</code></li>  <li><code>besoin_flou_feedback_rapide</code> &rarr; <code>Technique: Prototypage exploratoire</code></li>  <li><code>systeme_existant_sans_documentation</code> &rarr; <code>Technique: Analyse documentaire et code</code></li>  <li>Pour tout autre contexte &rarr; <code>Technique: Entretien individuel</code></li></ul><p>Analyse un identifiant de contexte fourni(e) dans les données du cas et affiche la technique recommandée.</p>",
    "starter": "# Grille d'analyse (ib2-c3-e1) — Choix de la technique d’élicitation\n# Complétez la réponse attendue sous chaque cas ci-dessous :\n\n[Cas 1 — Test 1]\n# Données : utilisateurs_disperses_grand_nombre\nA_COMPLETER\n\n[Cas 2 — Test 2]\n# Données : conflit_parties_prenantes_consensus\nA_COMPLETER\n\n[Cas 3 — Test 3]\n# Données : alignement_directeur_projet\nA_COMPLETER\n",
    "hints": [
      "Utilisez un la grille de critères associant chaque chaîne de contexte à son intitulé de technique.",
      "Utilisez table.get(contexte, \"Entretien individuel\") comme repli."
    ],
    "examples": [
      {
        "stdin": "processus_tacite_metier_complexe",
        "expected": "Technique: Observation terrain (Shadowing)",
        "note": "Lorsque les experts métier ont du mal à verbaliser leurs gestes quotidiens, l’observation directe est indispensable."
      }
    ],
    "tests": [
      {
        "label": "Test 1",
        "stdin": "cas:1",
        "expected": "Technique: Questionnaire en ligne"
      },
      {
        "label": "Test 2",
        "stdin": "cas:2",
        "expected": "Technique: Atelier anime (Workshop JAD)"
      },
      {
        "label": "Test 3",
        "stdin": "cas:3",
        "expected": "Technique: Entretien individuel"
      }
    ],
    "solution": "[Exemple]\nTechnique: Observation terrain (Shadowing)\n\n[Cas 1 — Test 1]\nTechnique: Questionnaire en ligne\n\n[Cas 2 — Test 2]\nTechnique: Atelier anime (Workshop JAD)\n\n[Cas 3 — Test 3]\nTechnique: Entretien individuel\n"
  },
  {
    "id": "ib2-c3-e2",
    "chapter": 3,
    "level": "n2",
    "language": "analyse",
    "title": "Agrégation de résultats d’enquête d’élicitation",
    "goal": "Analyser les résultats d’un sondage d’utilisateurs pour classer les fonctionnalités selon leur appréciation.",
    "brief": "<p>Lors d’une campagne d’élicitation par questionnaire, les utilisateurs évaluent l’intérêt de chaque fonctionnalité sur une échelle de 1 à 5.</p><p>À partir des données du cas :<br>- Première ligne : un entier <code>N</code> (nombre de réponses collectées).<br>- Les <code>N</code> lignes suivantes : <code>Fonctionnalite;Note</code> (la note est un entier de 1 à 5).<br>Affichez chaque fonctionnalité distincte avec sa moyenne (à 1 décimale) et le nombre de votes, triée par <strong>note moyenne décroissante</strong> (en cas d’égalité, par nom alphabétique) :<br><code>&lt;Fonctionnalite&gt;: &lt;Moyenne&gt;/5 (&lt;Votes&gt; avis)</code>.</p>",
    "starter": "# Grille d'analyse (ib2-c3-e2) — Agrégation de résultats d’enquête d’élicitation\n# Complétez la réponse attendue sous chaque cas ci-dessous :\n\n[Cas 1 — Test 1]\n# Données : Authentification SSO;5\n# Données : Authentification SSO;5\n# Données : Authentification SSO;4\nA_COMPLETER\n\n[Cas 2 — Test 2]\n# Données : Recherche Floue;4\n# Données : Notification SMS;2\n# Données : Recherche Floue;4\n# Données : Export PDF;4\n# Données : Notification SMS;4\nA_COMPLETER\n\n[Cas 3 — Test 3]\n# Données : Paiement CB;5\n# Données : Paiement Paypal;5\nA_COMPLETER\n",
    "hints": [
      "Recensez l’ensemble des évaluations attribuées par les parties prenantes pour chaque exigence.",
      "Calculez la note moyenne de priorité et classez les exigences par ordre d’importance décroissant."
    ],
    "examples": [
      {
        "stdin": "4\nMode Sombre;5\nExport Excel;3\nMode Sombre;4\nExport Excel;4",
        "expected": "Mode Sombre: 4.5/5 (2 avis)\nExport Excel: 3.5/5 (2 avis)",
        "note": "Le Mode Sombre obtient une moyenne de 4.5 contre 3.5 pour l’Export Excel."
      }
    ],
    "tests": [
      {
        "label": "Test 1",
        "stdin": "cas:1",
        "expected": "Authentification SSO: 4.7/5 (3 avis)"
      },
      {
        "label": "Test 2",
        "stdin": "cas:2",
        "expected": "Export PDF: 4.0/5 (1 avis)\nRecherche Floue: 4.0/5 (2 avis)\nNotification SMS: 3.0/5 (2 avis)"
      },
      {
        "label": "Test 3",
        "stdin": "cas:3",
        "expected": "Paiement CB: 5.0/5 (1 avis)\nPaiement Paypal: 5.0/5 (1 avis)"
      }
    ],
    "solution": "[Exemple]\nMode Sombre: 4.5/5 (2 avis)\nExport Excel: 3.5/5 (2 avis)\n\n[Cas 1 — Test 1]\nAuthentification SSO: 4.7/5 (3 avis)\n\n[Cas 2 — Test 2]\nExport PDF: 4.0/5 (1 avis)\nRecherche Floue: 4.0/5 (2 avis)\nNotification SMS: 3.0/5 (2 avis)\n\n[Cas 3 — Test 3]\nPaiement CB: 5.0/5 (1 avis)\nPaiement Paypal: 5.0/5 (1 avis)\n"
  },
  {
    "id": "ib2-c3-e3",
    "chapter": 3,
    "level": "n3",
    "language": "analyse",
    "title": "Modélisation et validation d’un Persona",
    "goal": "Vérifier la complétude et formater la synthèse d’une fiche Persona pour l’équipe de développement.",
    "brief": "<p>Un <strong>Persona</strong> est un archétype utilisateur fictif mais réaliste. Pour être exploitable par l’équipe, son objet JSON doit contenir :<br>- <code>nom</code> : chaîne non vide.<br>- <code>role</code> : chaîne non vide.<br>- <code>objectifs</code> : liste non vide de chaînes.<br>- <code>frustrations</code> : liste non vide de chaînes.</p><p>Analyse un objet JSON fourni(e) dans les données du cas et affiche :<br>- Si valide : <code>PERSONA: &lt;nom&gt; (&lt;role&gt;) | Objectifs: &lt;N&gt; | Frustrations: &lt;M&gt; | STATUT: VALIDE</code><br>- Si une propriété obligatoire manque ou est vide : <code>REJET: Persona incomplet (&lt;propriete&gt;)</code> (tester dans l’ordre : nom, role, objectifs, frustrations).</p>",
    "starter": "# Grille d'analyse (ib2-c3-e3) — Modélisation et validation d’un Persona\n# Complétez la réponse attendue sous chaque cas ci-dessous :\n\n[Cas 1 — Test 1]\n# Données : {\"nom\": \"\", \"role\": \"Comptable\", \"objectifs\": [\"Cloturer\"], \"frustrations\": [\"Bugs\"]}\nA_COMPLETER\n\n[Cas 2 — Test 2]\n# Données : {\"nom\": \"Marc\", \"role\": \"Commercial\", \"objectifs\": [], \"frustrations\": [\"Perte de temps\"]}\nA_COMPLETER\n\n[Cas 3 — Test 3]\n# Données : {\"nom\": \"Sophie\", \"role\": \"DRH\", \"objectifs\": [\"Suivre les talents\"], \"frustrations\": [\"Tableaux Excel eparpilles\", \"Manque de visibilite\"]}\nA_COMPLETER\n",
    "hints": [
      "Parse le JSON avec json.loads().",
      "Vérifiez que les chaînes nom et role ne sont pas vides, et que les listes objectifs et frustrations ont une longueur > 0."
    ],
    "examples": [
      {
        "stdin": "{\"nom\": \"Claire\", \"role\": \"Gestionnaire de paie\", \"objectifs\": [\"Gagner du temps\", \"Eviter les erreurs\"], \"frustrations\": [\"Logiciel trop lent\"]}",
        "expected": "PERSONA: Claire (Gestionnaire de paie) | Objectifs: 2 | Frustrations: 1 | STATUT: VALIDE",
        "note": "Tous les champs requis sont présents, Claire est un persona valide et exploitable."
      }
    ],
    "tests": [
      {
        "label": "Test 1",
        "stdin": "cas:1",
        "expected": "REJET: Persona incomplet (nom)"
      },
      {
        "label": "Test 2",
        "stdin": "cas:2",
        "expected": "REJET: Persona incomplet (objectifs)"
      },
      {
        "label": "Test 3",
        "stdin": "cas:3",
        "expected": "PERSONA: Sophie (DRH) | Objectifs: 1 | Frustrations: 2 | STATUT: VALIDE"
      }
    ],
    "solution": "[Exemple]\nPERSONA: Claire (Gestionnaire de paie) | Objectifs: 2 | Frustrations: 1 | STATUT: VALIDE\n\n[Cas 1 — Test 1]\nREJET: Persona incomplet (nom)\n\n[Cas 2 — Test 2]\nREJET: Persona incomplet (objectifs)\n\n[Cas 3 — Test 3]\nPERSONA: Sophie (DRH) | Objectifs: 1 | Frustrations: 2 | STATUT: VALIDE\n"
  },
  {
    "id": "ib2-c4-e1",
    "chapter": 4,
    "level": "n1",
    "language": "analyse",
    "title": "Analyseur syntaxique de User Story",
    "goal": "Découper et valider une User Story selon le gabarit canonique Connextra.",
    "brief": "<p>Le format standard d’une <strong>User Story</strong> s’énonce :<br><code>En tant que &lt;Role&gt;, je veux &lt;Action&gt;, afin de &lt;Benefice&gt;.</code> (la ponctuation finale peut être un point ou absente).</p><p>Analyse une ligne fourni(e) dans les données du cas et extrait les 3 composantes :<br>- Si la syntaxe est respectée et que les trois éléments sont non vides, affiche :<br><code>ROLE: &lt;Role&gt; | ACTION: &lt;Action&gt; | BENEFICE: &lt;Benefice&gt;</code>.<br>- Si l’un des motifs ou éléments manque, affiche :<br><code>ERREUR: Format User Story non respecte</code>.</p>",
    "starter": "# Grille d'analyse (ib2-c4-e1) — Analyseur syntaxique de User Story\n# Complétez la réponse attendue sous chaque cas ci-dessous :\n\n[Cas 1 — Test 1]\n# Données : En tant qu administrateur, je veux bannir un spammeur, afin de proteger la communaute\nA_COMPLETER\n\n[Cas 2 — Test 2]\n# Données : Je veux exporter mes factures en PDF directement.\nA_COMPLETER\n\n[Cas 3 — Test 3]\n# Données : En tant que comptable, je veux cloturer l exercice, afin d eviter les retards fiscaux.\nA_COMPLETER\n",
    "hints": [
      "Utilisez une expression régulière avec re.search() ou re.match() insensible à la casse.",
      "Pattern suggéré : r\"en tant qu[e']\\s*(.+?),?\\s*je veux\\s*(.+?),?\\s*afin d[e']?\\s*(.+?)\\.?$\""
    ],
    "examples": [
      {
        "stdin": "En tant que client, je veux reinitialiser mon mot de passe, afin de recuperer l acces a mon compte.",
        "expected": "ROLE: client | ACTION: reinitialiser mon mot de passe | BENEFICE: recuperer l acces a mon compte",
        "note": "Les trois composantes sont correctement extraites et nettoyées des espaces et virgules superflus."
      }
    ],
    "tests": [
      {
        "label": "Test 1",
        "stdin": "cas:1",
        "expected": "ROLE: administrateur | ACTION: bannir un spammeur | BENEFICE: proteger la communaute"
      },
      {
        "label": "Test 2",
        "stdin": "cas:2",
        "expected": "ERREUR: Format User Story non respecte"
      },
      {
        "label": "Test 3",
        "stdin": "cas:3",
        "expected": "ROLE: comptable | ACTION: cloturer l exercice | BENEFICE: eviter les retards fiscaux"
      }
    ],
    "solution": "[Exemple]\nROLE: client | ACTION: reinitialiser mon mot de passe | BENEFICE: recuperer l acces a mon compte\n\n[Cas 1 — Test 1]\nROLE: administrateur | ACTION: bannir un spammeur | BENEFICE: proteger la communaute\n\n[Cas 2 — Test 2]\nERREUR: Format User Story non respecte\n\n[Cas 3 — Test 3]\nROLE: comptable | ACTION: cloturer l exercice | BENEFICE: eviter les retards fiscaux\n"
  },
  {
    "id": "ib2-c4-e2",
    "chapter": 4,
    "level": "n2",
    "language": "analyse",
    "title": "Priorisation MoSCoW d’un Backlog",
    "goal": "Calculer la répartition des points d’effort par catégorie MoSCoW dans un sprint ou une release.",
    "brief": "<p>La méthode <strong>MoSCoW</strong> classe les exigences en 4 catégories : <code>Must</code>, <code>Should</code>, <code>Could</code> et <code>Won't</code>.</p><p>À partir des données du cas :<br>- Première ligne : le nombre <code>N</code> d’exigences.<br>- Les <code>N</code> lignes suivantes : <code>ID;Titre;MoSCoW;Points</code> (Points est un entier &ge; 0).<br>Affichez un dictionnaire JSON avec les totaux par catégorie et le total général au format strict :<br><code>{\"Must\": X, \"Should\": Y, \"Could\": Z, \"Wont\": W, \"Total\": T}</code>.</p>",
    "starter": "# Grille d'analyse (ib2-c4-e2) — Priorisation MoSCoW d’un Backlog\n# Complétez la réponse attendue sous chaque cas ci-dessous :\n\n[Cas 1 — Test 1]\n# Données : REQ-01;Paiement;Must;8\n# Données : REQ-02;Remboursement;Must;5\nA_COMPLETER\n\n[Cas 2 — Test 2]\n# Données : US-10;Export;Could;3\n# Données : US-11;Audit;Wont;5\n# Données : US-12;SSO;Must;8\n# Données : US-13;PDF;Should;5\nA_COMPLETER\n\n[Cas 3 — Test 3]\n# Données : US-99;Refonte globale;Won't;13\nA_COMPLETER\n",
    "hints": [
      "Initialisez un dictionnaire avec {\"Must\": 0, \"Should\": 0, \"Could\": 0, \"Wont\": 0}.",
      "Attention à mapper \"Won't\" ou \"Wont\" vers la clé \"Wont\" dans la sortie JSON.",
      "Utilisez json.dumps(res) pour afficher le JSON sur une seule ligne."
    ],
    "examples": [
      {
        "stdin": "3\nUS-1;Connexion;Must;5\nUS-2;Filtres;Should;3\nUS-3;Theme sombre;Could;2",
        "expected": "{\"Must\": 5, \"Should\": 3, \"Could\": 2, \"Wont\": 0, \"Total\": 10}",
        "note": "Must: 5, Should: 3, Could: 2, Wont: 0, Total: 10 points."
      }
    ],
    "tests": [
      {
        "label": "Test 1",
        "stdin": "cas:1",
        "expected": "{\"Must\": 13, \"Should\": 0, \"Could\": 0, \"Wont\": 0, \"Total\": 13}"
      },
      {
        "label": "Test 2",
        "stdin": "cas:2",
        "expected": "{\"Must\": 8, \"Should\": 5, \"Could\": 3, \"Wont\": 5, \"Total\": 21}"
      },
      {
        "label": "Test 3",
        "stdin": "cas:3",
        "expected": "{\"Must\": 0, \"Should\": 0, \"Could\": 0, \"Wont\": 13, \"Total\": 13}"
      }
    ],
    "solution": "[Exemple]\n{\"Must\": 5, \"Should\": 3, \"Could\": 2, \"Wont\": 0, \"Total\": 10}\n\n[Cas 1 — Test 1]\n{\"Must\": 13, \"Should\": 0, \"Could\": 0, \"Wont\": 0, \"Total\": 13}\n\n[Cas 2 — Test 2]\n{\"Must\": 8, \"Should\": 5, \"Could\": 3, \"Wont\": 5, \"Total\": 21}\n\n[Cas 3 — Test 3]\n{\"Must\": 0, \"Should\": 0, \"Could\": 0, \"Wont\": 13, \"Total\": 13}\n"
  },
  {
    "id": "ib2-c4-e3",
    "chapter": 4,
    "level": "n3",
    "language": "analyse",
    "title": "Ordonnancement WSJF (Weighted Shortest Job First)",
    "goal": "Calculer le score d’opportunité WSJF pour ordonnancer les fonctionnalités les plus rentables.",
    "brief": "<p>En méthodologie agile à l’échelle (SAFe), l’algorithme <strong>WSJF</strong> priorise les fonctionnalités maximisant la valeur par unité de temps :<br>1. <strong>CoD (Cost of Delay / Coût du retard)</strong> = <code>Valeur_Metier + Criticite_Temporelle + Reduction_Risque</code>.<br>2. <strong>Score WSJF</strong> = <code>CoD / Taille_Job</code>.</p><p>Lit une ligne au format <code>ID;Valeur;Temps;Risque;Taille</code> (les 4 métriques sont des entiers &gt; 0).<br>Affiche : <code>ID: &lt;ID&gt; | CoD: &lt;CoD&gt; | WSJF: &lt;Score arrondi à 2 décimales&gt;</code>.</p>",
    "starter": "# Grille d'analyse (ib2-c4-e3) — Ordonnancement WSJF (Weighted Shortest Job First)\n# Complétez la réponse attendue sous chaque cas ci-dessous :\n\n[Cas 1 — Test 1]\n# Données : FEAT-202;10;8;6;5\nA_COMPLETER\n\n[Cas 2 — Test 2]\n# Données : FEAT-303;3;2;1;3\nA_COMPLETER\n\n[Cas 3 — Test 3]\n# Données : FEAT-404;13;8;5;8\nA_COMPLETER\n",
    "hints": [
      "Découpez la ligne avec l’extraction des champs.",
      "Calculez cod = val + temps + risque, puis wsjf = cod / taille.",
      "Formate le score avec f\"{wsjf:.2f}\"."
    ],
    "examples": [
      {
        "stdin": "FEAT-101;8;5;3;2",
        "expected": "ID: FEAT-101 | CoD: 16 | WSJF: 8.00",
        "note": "CoD = 8 + 5 + 3 = 16. WSJF = 16 / 2 = 8.00."
      }
    ],
    "tests": [
      {
        "label": "Test 1",
        "stdin": "cas:1",
        "expected": "ID: FEAT-202 | CoD: 24 | WSJF: 4.80"
      },
      {
        "label": "Test 2",
        "stdin": "cas:2",
        "expected": "ID: FEAT-303 | CoD: 6 | WSJF: 2.00"
      },
      {
        "label": "Test 3",
        "stdin": "cas:3",
        "expected": "ID: FEAT-404 | CoD: 26 | WSJF: 3.25"
      }
    ],
    "solution": "[Exemple]\nID: FEAT-101 | CoD: 16 | WSJF: 8.00\n\n[Cas 1 — Test 1]\nID: FEAT-202 | CoD: 24 | WSJF: 4.80\n\n[Cas 2 — Test 2]\nID: FEAT-303 | CoD: 6 | WSJF: 2.00\n\n[Cas 3 — Test 3]\nID: FEAT-404 | CoD: 26 | WSJF: 3.25\n"
  },
  {
    "id": "ib2-c5-e1",
    "chapter": 5,
    "level": "n1",
    "language": "analyse",
    "title": "Normalisation d’identifiant d’exigence SRS",
    "goal": "Standardiser un code d’exigence selon le format IEEE (Domaine-Type-Numéro à 3 chiffres).",
    "brief": "<p>Dans une spécification <strong>SRS</strong> (<em>Software Requirements Specification</em>), chaque exigence possède un identifiant unique normé sous la forme <code>&lt;DOM&gt;-&lt;TYPE&gt;-&lt;00N&gt;</code> où le domaine et le type sont en majuscules et le numéro est complété de zéros à gauche sur 3 chiffres (ex. <code>SEC-NFR-007</code>).</p><p>Analyse une ligne au format <code>Domaine;Type;Numero</code> fourni(e) dans les données du cas et affiche :<br><code>EXIGENCE: &lt;DOM&gt;-&lt;TYPE&gt;-&lt;00N&gt;</code>.</p>",
    "starter": "# Grille d'analyse (ib2-c5-e1) — Normalisation d’identifiant d’exigence SRS\n# Complétez la réponse attendue sous chaque cas ci-dessous :\n\n[Cas 1 — Test 1]\n# Données : perf;nfr;42\nA_COMPLETER\n\n[Cas 2 — Test 2]\n# Données : billing;fr;120\nA_COMPLETER\n\n[Cas 3 — Test 3]\n# Données : rgpd;con;1\nA_COMPLETER\n",
    "hints": [
      "Découpez la ligne avec l’extraction des champs.",
      "Convertissez domaine et type avec .upper().",
      "Formate le numéro avec f\"{int(num):03d}\"."
    ],
    "examples": [
      {
        "stdin": "auth;fr;5",
        "expected": "EXIGENCE: AUTH-FR-005",
        "note": "auth devient AUTH, fr devient FR, et 5 devient 005."
      }
    ],
    "tests": [
      {
        "label": "Test 1",
        "stdin": "cas:1",
        "expected": "EXIGENCE: PERF-NFR-042"
      },
      {
        "label": "Test 2",
        "stdin": "cas:2",
        "expected": "EXIGENCE: BILLING-FR-120"
      },
      {
        "label": "Test 3",
        "stdin": "cas:3",
        "expected": "EXIGENCE: RGPD-CON-001"
      }
    ],
    "solution": "[Exemple]\nEXIGENCE: AUTH-FR-005\n\n[Cas 1 — Test 1]\nEXIGENCE: PERF-NFR-042\n\n[Cas 2 — Test 2]\nEXIGENCE: BILLING-FR-120\n\n[Cas 3 — Test 3]\nEXIGENCE: RGPD-CON-001\n"
  },
  {
    "id": "ib2-c5-e2",
    "chapter": 5,
    "level": "n2",
    "language": "analyse",
    "title": "Audit de matrice de traçabilité (RTM)",
    "goal": "Détecter les exigences sans tests de validation ou sans besoin métier dans une matrice RTM.",
    "brief": "<p>Une <strong>Matrice de Traçabilité des Exigences</strong> (<em>RTM</em>) relie un <strong>Besoin Métier (BRQ)</strong>, une <strong>Exigence Système (SRQ)</strong> et un <strong>Cas de Test (TC)</strong>.<br>Une liaison est dite <em>non testée</em> si <code>TC == \"AUCUN\"</code>. Une liaison est dite <em>sans besoin</em> si <code>BRQ == \"AUCUN\"</code>.</p><p>À partir des données du cas :<br>- Première ligne : le nombre <code>N</code> de liaisons.<br>- Les <code>N</code> lignes suivantes : <code>BRQ;SRQ;TC</code>.<br>Affiche : <code>TOTAL: &lt;N&gt; | NON_TESTEES: &lt;X&gt; | SANS_BESOIN: &lt;Y&gt;</code>.</p>",
    "starter": "# Grille d'analyse (ib2-c5-e2) — Audit de matrice de traçabilité (RTM)\n# Complétez la réponse attendue sous chaque cas ci-dessous :\n\n[Cas 1 — Test 1]\n# Données : BRQ-10;SRQ-10;TC-10\n# Données : BRQ-11;SRQ-11;TC-11\nA_COMPLETER\n\n[Cas 2 — Test 2]\n# Données : BRQ-01;SRQ-01;AUCUN\n# Données : AUCUN;SRQ-02;AUCUN\n# Données : BRQ-03;SRQ-03;TC-03\n# Données : AUCUN;SRQ-04;TC-04\nA_COMPLETER\n\n[Cas 3 — Test 3]\n# Données : BRQ-99;SRQ-99;AUCUN\nA_COMPLETER\n",
    "hints": [
      "Itère sur les N lignes et incrémente des compteurs si tc.upper() == \"AUCUN\" ou brq.upper() == \"AUCUN\".",
      "Affichez le résumé formaté."
    ],
    "examples": [
      {
        "stdin": "3\nBRQ-01;SRQ-01;TC-01\nBRQ-02;SRQ-02;AUCUN\nAUCUN;SRQ-03;TC-03",
        "expected": "TOTAL: 3 | NON_TESTEES: 1 | SANS_BESOIN: 1",
        "note": "SRQ-02 n’a aucun cas de test, SRQ-03 est orpheline de besoin métier."
      }
    ],
    "tests": [
      {
        "label": "Test 1",
        "stdin": "cas:1",
        "expected": "TOTAL: 2 | NON_TESTEES: 0 | SANS_BESOIN: 0"
      },
      {
        "label": "Test 2",
        "stdin": "cas:2",
        "expected": "TOTAL: 4 | NON_TESTEES: 2 | SANS_BESOIN: 2"
      },
      {
        "label": "Test 3",
        "stdin": "cas:3",
        "expected": "TOTAL: 1 | NON_TESTEES: 1 | SANS_BESOIN: 0"
      }
    ],
    "solution": "[Exemple]\nTOTAL: 3 | NON_TESTEES: 1 | SANS_BESOIN: 1\n\n[Cas 1 — Test 1]\nTOTAL: 2 | NON_TESTEES: 0 | SANS_BESOIN: 0\n\n[Cas 2 — Test 2]\nTOTAL: 4 | NON_TESTEES: 2 | SANS_BESOIN: 2\n\n[Cas 3 — Test 3]\nTOTAL: 1 | NON_TESTEES: 1 | SANS_BESOIN: 0\n"
  },
  {
    "id": "ib2-c5-e3",
    "chapter": 5,
    "level": "n3",
    "language": "analyse",
    "title": "Parseur de critère d’acceptation Gherkin",
    "goal": "Structurer un critère d’acceptation Étant donné / Quand / Alors (Given / When / Then) en objet JSON.",
    "brief": "<p>En BDD (<em>Behavior-Driven Development</em>), un scénario de test se décompose en 3 clauses :<br>Ligne 1 : <code>Etant donne &lt;contexte&gt;</code> (ou <code>Étant donné</code>)<br>Ligne 2 : <code>Quand &lt;evenement&gt;</code><br>Ligne 3 : <code>Alors &lt;resultat_attendu&gt;</code></p><p>Analyse 3 lignes fournies dans les données du cas, nettoie la ponctuation finale éventuelle et affiche un dictionnaire JSON strict sur une ligne :<br><code>{\"contexte\": \"...\", \"evenement\": \"...\", \"resultat_attendu\": \"...\"}</code>.<br>Si l’une des clauses ne commence pas par le bon mot-clé, affiche <code>ERREUR: Syntaxe Gherkin non respectee</code>.</p>",
    "starter": "# Grille d'analyse (ib2-c5-e3) — Parseur de critère d’acceptation Gherkin\n# Complétez la réponse attendue sous chaque cas ci-dessous :\n\n[Cas 1 — Test 1]\n# Données : Etant donne un panier contenant 2 articles\n# Données : Quand l utilisateur clique sur Commander\n# Données : Alors la page de paiement s affiche\nA_COMPLETER\n\n[Cas 2 — Test 2]\n# Données : Sachant que le serveur tourne\n# Données : Quand une erreur 500 survient\n# Données : Alors une alerte est envoyee\nA_COMPLETER\n\n[Cas 3 — Test 3]\n# Données : Étant donné un mot de passe expire\n# Données : Quand l utilisateur saisit ses identifiants\n# Données : Alors un message invite au renouvellement.\nA_COMPLETER\n",
    "hints": [
      "Vérifiez que les lignes commencent respectivement par (etant donne / étant donné), (quand), (alors).",
      "Supprimez le préfixe et le point final éventuel.",
      "Affichez le résultat avec json.dumps(obj, ensure_ascii=False)."
    ],
    "examples": [
      {
        "stdin": "Etant donne un utilisateur connecte avec le solde 100€\nQuand il effectue un virement de 40€\nAlors son nouveau solde est de 60€.",
        "expected": "{\"contexte\": \"un utilisateur connecte avec le solde 100€\", \"evenement\": \"il effectue un virement de 40€\", \"resultat_attendu\": \"son nouveau solde est de 60€\"}",
        "note": "Le critère d’acceptation est structuré de façon non ambiguë et prêt pour l’automatisation."
      }
    ],
    "tests": [
      {
        "label": "Test 1",
        "stdin": "cas:1",
        "expected": "{\"contexte\": \"un panier contenant 2 articles\", \"evenement\": \"l utilisateur clique sur Commander\", \"resultat_attendu\": \"la page de paiement s affiche\"}"
      },
      {
        "label": "Test 2",
        "stdin": "cas:2",
        "expected": "ERREUR: Syntaxe Gherkin non respectee"
      },
      {
        "label": "Test 3",
        "stdin": "cas:3",
        "expected": "{\"contexte\": \"un mot de passe expire\", \"evenement\": \"l utilisateur saisit ses identifiants\", \"resultat_attendu\": \"un message invite au renouvellement\"}"
      }
    ],
    "solution": "[Exemple]\n{\"contexte\": \"un utilisateur connecte avec le solde 100€\", \"evenement\": \"il effectue un virement de 40€\", \"resultat_attendu\": \"son nouveau solde est de 60€\"}\n\n[Cas 1 — Test 1]\n{\"contexte\": \"un panier contenant 2 articles\", \"evenement\": \"l utilisateur clique sur Commander\", \"resultat_attendu\": \"la page de paiement s affiche\"}\n\n[Cas 2 — Test 2]\nERREUR: Syntaxe Gherkin non respectee\n\n[Cas 3 — Test 3]\n{\"contexte\": \"un mot de passe expire\", \"evenement\": \"l utilisateur saisit ses identifiants\", \"resultat_attendu\": \"un message invite au renouvellement\"}\n"
  },
  {
    "id": "ib2-c6-e1",
    "chapter": 6,
    "level": "n1",
    "language": "analyse",
    "title": "Audit qualité INVEST d’une User Story",
    "goal": "Vérifier la conformité d’une User Story aux 6 critères INVEST (Indépendante, Négociable, Valeur, Estimable, Small, Testable).",
    "brief": "<p>Le modèle <strong>INVEST</strong> évalue la qualité d’une exigence agile selon 6 critères booléens (1 pour conforme, 0 pour non conforme) :<br><code>I</code> (Indépendante), <code>N</code> (Négociable), <code>V</code> (Valeur), <code>E</code> (Estimable), <code>S</code> (Small / Suffisamment petite), <code>T</code> (Testable).</p><p>Analyse une ligne au format <code>ID;I;N;V;E;S;T</code> fourni(e) dans les données du cas.<br>- Si les 6 critères valent 1 : affiche <code>&lt;ID&gt;: CONFORME_INVEST (6/6)</code>.<br>- Sinon : affiche <code>&lt;ID&gt;: NON_CONFORME (&lt;Score&gt;/6) - Criteres_manquants: &lt;liste des noms manquants séparés par une virgule&gt;</code>.</p>",
    "starter": "# Grille d'analyse (ib2-c6-e1) — Audit qualité INVEST d’une User Story\n# Complétez la réponse attendue sous chaque cas ci-dessous :\n\n[Cas 1 — Test 1]\n# Données : US-10;1;0;1;1;0;1\nA_COMPLETER\n\n[Cas 2 — Test 2]\n# Données : US-11;1;1;1;1;1;0\nA_COMPLETER\n\n[Cas 3 — Test 3]\n# Données : US-12;1;1;1;1;1;1\nA_COMPLETER\n",
    "hints": [
      "Associe les colonnes aux critères : [\"Independante\", \"Negociable\", \"Valeur\", \"Estimable\", \"Small\", \"Testable\"].",
      "Filtrez les critères dont la valeur est \"0\" et compte les \"1\"."
    ],
    "examples": [
      {
        "stdin": "US-42;1;1;1;1;1;1",
        "expected": "US-42: CONFORME_INVEST (6/6)",
        "note": "Tous les critères INVEST sont satisfaits, la User Story est prête pour l’engagement en sprint."
      }
    ],
    "tests": [
      {
        "label": "Test 1",
        "stdin": "cas:1",
        "expected": "US-10: NON_CONFORME (4/6) - Criteres_manquants: Negociable, Small"
      },
      {
        "label": "Test 2",
        "stdin": "cas:2",
        "expected": "US-11: NON_CONFORME (5/6) - Criteres_manquants: Testable"
      },
      {
        "label": "Test 3",
        "stdin": "cas:3",
        "expected": "US-12: CONFORME_INVEST (6/6)"
      }
    ],
    "solution": "[Exemple]\nUS-42: CONFORME_INVEST (6/6)\n\n[Cas 1 — Test 1]\nUS-10: NON_CONFORME (4/6) - Criteres_manquants: Negociable, Small\n\n[Cas 2 — Test 2]\nUS-11: NON_CONFORME (5/6) - Criteres_manquants: Testable\n\n[Cas 3 — Test 3]\nUS-12: CONFORME_INVEST (6/6)\n"
  },
  {
    "id": "ib2-c6-e2",
    "chapter": 6,
    "level": "n2",
    "language": "analyse",
    "title": "Analyse d’impact d’une demande de changement (Change Request)",
    "goal": "Calculer la propagation des dépendances pour identifier toutes les exigences impactées par une modification.",
    "brief": "<p>Lorsqu’une exigence est modifiée, toutes les exigences qui en dépendent (directement ou transitivement) doivent être réévaluées.</p><p>À partir des données du cas :<br>- Ligne 1 : l’identifiant de l’exigence initiale modifiée (ex. <code>REQ-1</code>).<br>- Ligne 2 : la liste des dépendances séparées par des virgules au format <code>Source-&gt;Cible</code> (signifiant que <em>Cible dépend de Source</em>).<br>Affichez la liste de toutes les exigences impactées (l’exigence initiale incluse), dédupliquées et triées alphabétiquement :<br><code>EXIGENCES_IMPACTEES: &lt;REQ_A, REQ_B, ...&gt;</code>.</p>",
    "starter": "# Grille d'analyse (ib2-c6-e2) — Analyse d’impact d’une demande de changement (Change Request)\n# Complétez la réponse attendue sous chaque cas ci-dessous :\n\n[Cas 1 — Test 1]\n# Données : AUTH-1\n# Données : AUTH-1->DASH-1,AUTH-1->API-1,API-1->BILL-1\nA_COMPLETER\n\n[Cas 2 — Test 2]\n# Données : ISOL-1\n# Données : REQ-A->REQ-B,REQ-B->REQ-C\nA_COMPLETER\n\n[Cas 3 — Test 3]\n# Données : CORE-0\n# Données : CORE-0->MOD-1,MOD-1->MOD-2,CORE-0->MOD-3\nA_COMPLETER\n",
    "hints": [
      "Construisez un graphe de dépendances (dictionnaire d’adjacence : source -> ensemble des cibles).",
      "Utilisez un parcours en largeur (BFS) ou profondeur (DFS) à partir du nœud initial.",
      "Triez l’ensemble des nœuds visités."
    ],
    "examples": [
      {
        "stdin": "REQ-1\nREQ-1->REQ-2,REQ-2->REQ-3,REQ-4->REQ-5",
        "expected": "EXIGENCES_IMPACTEES: REQ-1, REQ-2, REQ-3",
        "note": "REQ-1 impacte directement REQ-2, qui impacte REQ-3. REQ-4 et REQ-5 ne sont pas touchées."
      }
    ],
    "tests": [
      {
        "label": "Test 1",
        "stdin": "cas:1",
        "expected": "EXIGENCES_IMPACTEES: API-1, AUTH-1, BILL-1, DASH-1"
      },
      {
        "label": "Test 2",
        "stdin": "cas:2",
        "expected": "EXIGENCES_IMPACTEES: ISOL-1"
      },
      {
        "label": "Test 3",
        "stdin": "cas:3",
        "expected": "EXIGENCES_IMPACTEES: CORE-0, MOD-1, MOD-2, MOD-3"
      }
    ],
    "solution": "[Exemple]\nEXIGENCES_IMPACTEES: REQ-1, REQ-2, REQ-3\n\n[Cas 1 — Test 1]\nEXIGENCES_IMPACTEES: API-1, AUTH-1, BILL-1, DASH-1\n\n[Cas 2 — Test 2]\nEXIGENCES_IMPACTEES: ISOL-1\n\n[Cas 3 — Test 3]\nEXIGENCES_IMPACTEES: CORE-0, MOD-1, MOD-2, MOD-3\n"
  },
  {
    "id": "ib2-c6-e3",
    "chapter": 6,
    "level": "n3",
    "language": "analyse",
    "title": "Audit de versionnement d’une Baseline d’exigences",
    "goal": "Comparer deux états figés (Baselines) d’un référentiel pour chiffrer les ajouts, modifications et suppressions.",
    "brief": "<p>Une <strong>Baseline</strong> fige l’ensemble des exigences validées à un jalon clé du projet. Chaque exigence est identifiée par <code>ID:Empreinte</code> (où l’empreinte résume son contenu textuel).<br>Ligne 1 : Baseline V1 (ex. <code>REQ-1:a1,REQ-2:b2,REQ-3:c3</code>)<br>Ligne 2 : Baseline V2 (ex. <code>REQ-1:a1,REQ-2:mod,REQ-4:d4</code>)</p><p>Affichez le bilan du comparatif selon le format strict :<br><code>AJOUTS: &lt;A&gt; | MODIFICATIONS: &lt;M&gt; | SUPPRESSIONS: &lt;S&gt; | INCHANGEES: &lt;I&gt;</code>.</p>",
    "starter": "# Grille d'analyse (ib2-c6-e3) — Audit de versionnement d’une Baseline d’exigences\n# Complétez la réponse attendue sous chaque cas ci-dessous :\n\n[Cas 1 — Test 1]\n# Données : A:1,B:2\n# Données : A:1,B:2\nA_COMPLETER\n\n[Cas 2 — Test 2]\n# Données : A:1,B:2,C:3\n# Données : A:1,B:22,D:4,E:5\nA_COMPLETER\n\n[Cas 3 — Test 3]\n# Données : X:10\n# Données : Y:20\nA_COMPLETER\n",
    "hints": [
      "Parse chaque ligne dans un dictionnaire {ID: Empreinte}.",
      "Comparez les ensembles d’identifiants pour trouver les ajouts (présents dans V2, absents de V1) et les suppressions (présents dans V1, absents de V2).",
      "Pour les ID communs, compare les empreintes pour distinguer modifications et inchangées."
    ],
    "examples": [
      {
        "stdin": "REQ-1:a1,REQ-2:b2,REQ-3:c3\nREQ-1:a1,REQ-2:mod,REQ-4:d4",
        "expected": "AJOUTS: 1 | MODIFICATIONS: 1 | SUPPRESSIONS: 1 | INCHANGEES: 1",
        "note": "REQ-4 est ajoutée, REQ-2 est modifiée (empreinte différente), REQ-3 est supprimée, REQ-1 est inchangée."
      }
    ],
    "tests": [
      {
        "label": "Test 1",
        "stdin": "cas:1",
        "expected": "AJOUTS: 0 | MODIFICATIONS: 0 | SUPPRESSIONS: 0 | INCHANGEES: 2"
      },
      {
        "label": "Test 2",
        "stdin": "cas:2",
        "expected": "AJOUTS: 2 | MODIFICATIONS: 1 | SUPPRESSIONS: 1 | INCHANGEES: 1"
      },
      {
        "label": "Test 3",
        "stdin": "cas:3",
        "expected": "AJOUTS: 1 | MODIFICATIONS: 0 | SUPPRESSIONS: 1 | INCHANGEES: 0"
      }
    ],
    "solution": "[Exemple]\nAJOUTS: 1 | MODIFICATIONS: 1 | SUPPRESSIONS: 1 | INCHANGEES: 1\n\n[Cas 1 — Test 1]\nAJOUTS: 0 | MODIFICATIONS: 0 | SUPPRESSIONS: 0 | INCHANGEES: 2\n\n[Cas 2 — Test 2]\nAJOUTS: 2 | MODIFICATIONS: 1 | SUPPRESSIONS: 1 | INCHANGEES: 1\n\n[Cas 3 — Test 3]\nAJOUTS: 1 | MODIFICATIONS: 0 | SUPPRESSIONS: 1 | INCHANGEES: 0\n"
  }
];

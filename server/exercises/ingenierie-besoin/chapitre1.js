/**
 * chapitre1.js — Études de cas du cours « ingenierie-besoin ».
 * Mode d'évaluation conceptuelle structurée (language: 'analyse').
 */
'use strict';

module.exports = [
  {
    id: "ib2-c1-e1",
    chapter: 1,
    level: "n1",
    language: 'analyse',
    title: "Besoin vs Solution technique",
    goal: "Distinguer un besoin métier (le « Quoi / Pourquoi ») d’une solution technique prématurée (le « Comment »).",
    brief: "<p>En ingénierie des exigences, confondre le <strong>besoin</strong> (l’objectif ou la douleur utilisateur) et la <strong>solution</strong> (un choix technique d’implémentation) est une cause majeure d’échec des projets.</p><p>Examine un énoncé fourni dans les données du cas (en minuscules, sans ponctuation finale) et affiche son type :<br>- <code>reduire le temps d attente au guichet</code>, <code>permettre aux clients de suivre leur colis en direct</code>, <code>securiser l acces aux comptes bancaires</code> &rarr; <code>Type: Besoin</code><br>- <code>utiliser react avec mongodb</code>, <code>developper de manière méthodique.12</code>, <code>stocker les logs sur aws s3</code>, <code>installer un cluster kubernetes</code> &rarr; <code>Type: Solution</code><br>Pour toute autre valeur : <code>Type: Inconnu</code>.</p>",
    starter: "# Grille d'analyse (ib2-c1-e1) — Besoin vs Solution technique\n# Complétez la réponse attendue sous chaque cas ci-dessous :\n\n[Cas 1 — Test 1]\n# Données : utiliser react avec mongodb\nA_COMPLETER\n\n[Cas 2 — Test 2]\n# Données : securiser l acces aux comptes bancaires\nA_COMPLETER\n\n[Cas 3 — Test 3]\n# Données : refaire toute l application en assembleur\nA_COMPLETER\n",
    hints: [
          "Stocke les énoncés connus dans deux ensembles ou un dictionnaire de correspondances.",
          "Utilisez table.get(enonce, \"Inconnu\") pour renvoyer la valeur par défaut."
    ],
    examples: [
          {
                "stdin": "reduire le temps d attente au guichet",
                "expected": "Type: Besoin",
                "note": "La réduction du temps d’attente est un objectif métier, non une technologie."
          }
    ],
    tests: [
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
    solution: "[Exemple]\nType: Besoin\n\n[Cas 1 — Test 1]\nType: Solution\n\n[Cas 2 — Test 2]\nType: Besoin\n\n[Cas 3 — Test 3]\nType: Inconnu\n"
  },
  {
    id: "ib2-c1-e2",
    chapter: 1,
    level: "n2",
    language: 'analyse',
    title: "Matrice Pouvoir / Intérêt des parties prenantes",
    goal: "Classifier un acteur selon la matrice Pouvoir / Intérêt de Mendelow pour adapter la stratégie de communication.",
    brief: "<p>La matrice de Mendelow positionne chaque partie prenante (<em>Stakeholder</em>) selon son niveau de <strong>Pouvoir</strong> (1 à 10) et d’<strong>Intérêt</strong> (1 à 10) :</p><ul>  <li>Pouvoir &ge; 7 et Intérêt &ge; 7 &rarr; <code>Gerer de pres</code> (Acteur clé)</li>  <li>Pouvoir &ge; 7 et Intérêt &lt; 7 &rarr; <code>Garder satisfait</code></li>  <li>Pouvoir &lt; 7 et Intérêt &ge; 7 &rarr; <code>Garder informe</code></li>  <li>Pouvoir &lt; 7 et Intérêt &lt; 7 &rarr; <code>Surveiller</code> (Effort minimal)</li></ul><p>Lit une ligne au format <code>Nom;Pouvoir;Interet</code> et affiche :<br><code>&lt;Nom&gt; -&gt; &lt;Strategie&gt;</code>.</p>",
    starter: "# Grille d'analyse (ib2-c1-e2) — Matrice Pouvoir / Intérêt des parties prenantes\n# Complétez la réponse attendue sous chaque cas ci-dessous :\n\n[Cas 1 — Test 1]\n# Données : Responsable Juridique;8;4\nA_COMPLETER\n\n[Cas 2 — Test 2]\n# Données : Utilisateur Final;3;9\nA_COMPLETER\n\n[Cas 3 — Test 3]\n# Données : Prestataire Maintenance;2;3\nA_COMPLETER\n",
    hints: [
          "Découpez la ligne avec l’extraction des champs et convertis pouvoir et intérêt en entiers.",
          "Applique les conditions if/elif/else sur les seuils fixés à 7."
    ],
    examples: [
          {
                "stdin": "Directeur General;9;8",
                "expected": "Directeur General -> Gerer de pres",
                "note": "Avec un pouvoir de 9 et un intérêt de 8, le Directeur Général doit être géré au plus près."
          }
    ],
    tests: [
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
    solution: "[Exemple]\nDirecteur General -> Gerer de pres\n\n[Cas 1 — Test 1]\nResponsable Juridique -> Garder satisfait\n\n[Cas 2 — Test 2]\nUtilisateur Final -> Garder informe\n\n[Cas 3 — Test 3]\nPrestataire Maintenance -> Surveiller\n"
  },
  {
    id: "ib2-c1-e3",
    chapter: 1,
    level: "n3",
    language: 'analyse',
    title: "Complétude d’une fiche d’exigence",
    goal: "Valider la structure et la complétude des attributs obligatoires d’une exigence logicielle.",
    brief: "<p>Une exigence documentée doit comporter 5 attributs indispensables : <code>id</code>, <code>titre</code>, <code>decasion</code>, <code>source</code> et <code>priorite</code>. La priorité doit impérativement être l’une des trois valeurs : <code>Haute</code>, <code>Moyenne</code> ou <code>Basse</code>.</p><p>Analyse un objet JSON fourni(e) dans les données du cas et affiche :<br>- Si valide : <code>VALIDE (&lt;id&gt;)</code><br>- Si un attribut obligatoire est absent ou vide : <code>ERREUR: Champ manquant &lt;nom_champ&gt;</code> (tester les champs dans l’ordre : id, titre, decasion, source, priorite)<br>- Si la priorité n’est pas l’une des 3 valeurs autorisées : <code>ERREUR: Priorite invalide</code>.</p>",
    starter: "# Grille d'analyse (ib2-c1-e3) — Complétude d’une fiche d’exigence\n# Complétez la réponse attendue sous chaque cas ci-dessous :\n\n[Cas 1 — Test 1]\n# Données : {\"id\": \"REQ-002\", \"titre\": \"\", \"description\": \"Export CSV\", \"source\": \"Finance\", \"priorite\": \"Moyenne\"}\nA_COMPLETER\n\n[Cas 2 — Test 2]\n# Données : {\"id\": \"REQ-003\", \"titre\": \"Audit logs\", \"description\": \"Archivage 1 an\", \"source\": \"Securite\", \"priorite\": \"Urgente\"}\nA_COMPLETER\n\n[Cas 3 — Test 3]\n# Données : {\"id\": \"REQ-004\", \"titre\": \"Recherche\", \"description\": \"Recherche floue\", \"source\": \"Produit\", \"priorite\": \"Basse\"}\nA_COMPLETER\n",
    hints: [
          "Parse la chaîne avec json.loads().",
          "Vérifiez la présence et la non-vacuité de chaque champ dans la liste ordonnée [\"id\", \"titre\", \"description\", \"source\", \"priorite\"]."
    ],
    examples: [
          {
                "stdin": "{\"id\": \"REQ-001\", \"titre\": \"Connexion OAuth2\", \"description\": \"L utilisateur doit pouvoir se connecter via Google\", \"source\": \"DSI\", \"priorite\": \"Haute\"}",
                "expected": "VALIDE (REQ-001)",
                "note": "Tous les champs sont renseignés et la priorité est Haute."
          }
    ],
    tests: [
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
    solution: "[Exemple]\nVALIDE (REQ-001)\n\n[Cas 1 — Test 1]\nERREUR: Champ manquant titre\n\n[Cas 2 — Test 2]\nERREUR: Priorite invalide\n\n[Cas 3 — Test 3]\nVALIDE (REQ-004)\n"
  }
];

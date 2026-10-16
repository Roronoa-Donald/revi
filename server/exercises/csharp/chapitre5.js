'use strict';

module.exports = [
  {
    "id": "csb2-c5-e1",
    "chapter": 5,
    "title": "Moteur LINQ de base : Where, Select, OrderBy et exécution différée",
    "level": "n1",
    "language": "analyse",
    "goal": "Simuler une requête LINQ avec Where, OrderBy, Select et matérialisation terminale ToList().",
    "brief": "<p>En C#, les requêtes LINQ bénéficient de l'exécution différée (<em>Deferred Execution</em>) : aucun calcul n'a lieu avant l'appel d'un opérateur terminal tel que <code>ToList()</code>.<br>\nAnalysez les données fournies pour chaque cas.0</code>) suivi d'articles sous la forme <code>Article Nom=&lt;Nom&gt; Prix=&lt;Prix&gt;</code>.<br>\nLe script simule l'évaluation du pipeline LINQ suivant :<br>\n1. <code>.Where(a =&gt; a.Prix &gt;= seuil)</code> ;<br>\n2. <code>.OrderByDescending(a =&gt; a.Prix)</code> ;<br>\n3. <code>.Select(a =&gt; $\"{a.Nom} - {a.Prix:F2}\")</code>.<br>\nIl Indiquez la matérialisation terminale et chaque élément sélectionné.</p>\n<p>Format de sortie :<br><code>LINQ: Declenchement ToList() (Evaluation differee terminee)</code><br><code>Resultat: &lt;Nom&gt; - &lt;Prix2Dec&gt;</code><br><code>TOTAL_ELEMENTS: &lt;N&gt;</code></p>",
    "starter": "# Grille d'analyse (csb2-c5-e1) — Moteur LINQ de base : Where, Select, OrderBy et exécution différée\n# Complétez la résolution demandée sous chaque cas ci-dessous :\n\n[Cas 1 — Tous les éléments filtrés]\n# Données : FILTER Prix >= 200.0\n# Données : Article Nom=Souris Prix=15.0\n# Données : Article Nom=Tapis Prix=10.0\nA_COMPLETER\n\n[Cas 2 — Tous les éléments acceptés]\n# Données : FILTER Prix >= 5.0\n# Données : Article Nom=Cable Prix=7.50\n# Données : Article Nom=Adaptateur Prix=12.00\nA_COMPLETER\n\n[Cas 3 — Articles avec prix identiques triés de façon stable]\n# Données : FILTER Prix >= 30.0\n# Données : Article Nom=Casque Prix=50.0\n# Données : Article Nom=Micro Prix=50.0\n# Données : Article Nom=Webcam Prix=70.0\nA_COMPLETER\n",
    "hints": [
      "Extrais le seuil de prix de la première ligne.",
      "Filtre les articles dont le prix est supérieur ou égal au seuil.",
      "Trie les articles filtrés par ordre décroissant de prix avant l'affichage."
    ],
    "examples": [
      {
        "stdin": "FILTER Prix >= 20.0\nArticle Nom=Clavier Prix=45.0\nArticle Nom=Souris Prix=15.0\nArticle Nom=Ecran Prix=180.0\nArticle Nom=Tapis Prix=10.0",
        "expected": "LINQ: Declenchement ToList() (Evaluation differee terminee)\nResultat: Ecran - 180.00\nResultat: Clavier - 45.00\nTOTAL_ELEMENTS: 2",
        "note": "Seuls Ecran et Clavier dépassent le seuil de 20.0 et sont triés par ordre décroissant."
      }
    ],
    "tests": [
      {
        "label": "Tous les éléments filtrés",
        "stdin": "cas:1",
        "expected": "LINQ: Declenchement ToList() (Evaluation differee terminee)\nTOTAL_ELEMENTS: 0"
      },
      {
        "label": "Tous les éléments acceptés",
        "stdin": "cas:2",
        "expected": "LINQ: Declenchement ToList() (Evaluation differee terminee)\nResultat: Adaptateur - 12.00\nResultat: Cable - 7.50\nTOTAL_ELEMENTS: 2"
      },
      {
        "label": "Articles avec prix identiques triés de façon stable",
        "stdin": "cas:3",
        "expected": "LINQ: Declenchement ToList() (Evaluation differee terminee)\nResultat: Webcam - 70.00\nResultat: Casque - 50.00\nResultat: Micro - 50.00\nTOTAL_ELEMENTS: 3"
      }
    ],
    "solution": "[Exemple]\nLINQ: Declenchement ToList() (Evaluation differee terminee)\nResultat: Ecran - 180.00\nResultat: Clavier - 45.00\nTOTAL_ELEMENTS: 2\n\n[Cas 1 — Tous les éléments filtrés]\nLINQ: Declenchement ToList() (Evaluation differee terminee)\nTOTAL_ELEMENTS: 0\n\n[Cas 2 — Tous les éléments acceptés]\nLINQ: Declenchement ToList() (Evaluation differee terminee)\nResultat: Adaptateur - 12.00\nResultat: Cable - 7.50\nTOTAL_ELEMENTS: 2\n\n[Cas 3 — Articles avec prix identiques triés de façon stable]\nLINQ: Declenchement ToList() (Evaluation differee terminee)\nResultat: Webcam - 70.00\nResultat: Casque - 50.00\nResultat: Micro - 50.00\nTOTAL_ELEMENTS: 3"
  },
  {
    "id": "csb2-c5-e2",
    "chapter": 5,
    "title": "Pipeline LINQ de regroupement GroupBy et agrégations",
    "level": "n2",
    "language": "analyse",
    "goal": "Regrouper un jeu de données avec LINQ GroupBy et calculer le total et la moyenne par groupe.",
    "brief": "<p>Analysez les données fournies pour chaque cas.<br>\nIl doit simuler l'opérateur LINQ <code>GroupBy(a =&gt; a.Categorie)</code> et calculer pour chaque catégorie :\n- Le nombre total d'achats (<code>Count()</code>) ;\n- La somme totale dépensée (<code>Sum(a =&gt; a.Montant)</code>) ;\n- La moyenne par achat (<code>Average(a =&gt; a.Montant)</code>).<br>\nLes catégories doivent être présentées par ordre alphabétique croissant.</p>\n<p>Format de sortie :<br><code>Groupe: &lt;Categorie&gt; | NbAchats: &lt;N&gt; | Total: &lt;Total2Dec&gt; | Moyenne: &lt;Moyenne2Dec&gt;</code></p>",
    "starter": "# Grille d'analyse (csb2-c5-e2) — Pipeline LINQ de regroupement GroupBy et agrégations\n# Complétez la résolution demandée sous chaque cas ci-dessous :\n\n[Cas 1 — Une seule catégorie avec un seul élément]\n# Données : David Livres 24.50\nA_COMPLETER\n\n[Cas 2 — Trois catégories variées]\n# Données : Alice Bureau 100.0\n# Données : Bob Tech 200.0\n# Données : Charlie Alimentation 50.0\n# Données : Alice Tech 300.0\nA_COMPLETER\n\n[Cas 3 — Valeurs identiques dans une même catégorie]\n# Données : A Audio 40.0\n# Données : B Audio 40.0\n# Données : C Audio 40.0\nA_COMPLETER\n",
    "hints": [
      "Stocke les montants dans une liste associée à chaque catégorie.",
      "Calcule la somme et divise par le nombre d'éléments pour obtenir la moyenne.",
      "Trie les noms de catégories par ordre alphabétique croissant."
    ],
    "examples": [
      {
        "stdin": "Alice Informatique 120.0\nBob Mobilier 300.0\nAlice Informatique 80.0\nCharlie Informatique 50.0\nBob Mobilier 150.0",
        "expected": "Groupe: Informatique | NbAchats: 3 | Total: 250.00 | Moyenne: 83.33\nGroupe: Mobilier | NbAchats: 2 | Total: 450.00 | Moyenne: 225.00",
        "note": "Regroupement en deux catégories avec calculs d'agrégation exacts."
      }
    ],
    "tests": [
      {
        "label": "Une seule catégorie avec un seul élément",
        "stdin": "cas:1",
        "expected": "Groupe: Livres | NbAchats: 1 | Total: 24.50 | Moyenne: 24.50"
      },
      {
        "label": "Trois catégories variées",
        "stdin": "cas:2",
        "expected": "Groupe: Alimentation | NbAchats: 1 | Total: 50.00 | Moyenne: 50.00\nGroupe: Bureau | NbAchats: 1 | Total: 100.00 | Moyenne: 100.00\nGroupe: Tech | NbAchats: 2 | Total: 500.00 | Moyenne: 250.00"
      },
      {
        "label": "Valeurs identiques dans une même catégorie",
        "stdin": "cas:3",
        "expected": "Groupe: Audio | NbAchats: 3 | Total: 120.00 | Moyenne: 40.00"
      }
    ],
    "solution": "[Exemple]\nGroupe: Informatique | NbAchats: 3 | Total: 250.00 | Moyenne: 83.33\nGroupe: Mobilier | NbAchats: 2 | Total: 450.00 | Moyenne: 225.00\n\n[Cas 1 — Une seule catégorie avec un seul élément]\nGroupe: Livres | NbAchats: 1 | Total: 24.50 | Moyenne: 24.50\n\n[Cas 2 — Trois catégories variées]\nGroupe: Alimentation | NbAchats: 1 | Total: 50.00 | Moyenne: 50.00\nGroupe: Bureau | NbAchats: 1 | Total: 100.00 | Moyenne: 100.00\nGroupe: Tech | NbAchats: 2 | Total: 500.00 | Moyenne: 250.00\n\n[Cas 3 — Valeurs identiques dans une même catégorie]\nGroupe: Audio | NbAchats: 3 | Total: 120.00 | Moyenne: 40.00"
  },
  {
    "id": "csb2-c5-e3",
    "chapter": 5,
    "title": "Système Événementiel C# (event Action<string>, +=, -= multicast)",
    "level": "n3",
    "language": "analyse",
    "goal": "Simuler un délégué multicast C# avec inscription +=, désinscription -= et diffusion d'événement.",
    "brief": "<p>En C#, un événement <code>public event Action&lt;string&gt; OnNotification;</code> permet à plusieurs gestionnaires de s'abonner avec l'opérateur <code>+=</code> et de se désabonner avec <code>-=</code>.<br>\nAnalysez les données fournies pour chaque cas.</p>\n<p>Format de sortie pour chaque émission :<br><code>EVENT \"&lt;Message&gt;\" =&gt; &lt;NomAbonne&gt; recoit la notification</code></p>",
    "starter": "# Grille d'analyse (csb2-c5-e3) — Système Événementiel C# (event Action<string>, +=, -= multicast)\n# Complétez la résolution demandée sous chaque cas ci-dessous :\n\n[Cas 1 — Souscription initiale et émission]\n# Données : SUBSCRIBE ServiceAudit\n# Données : EMIT \"Signal Initial\"\nA_COMPLETER\n\n[Cas 2 — Abonnement unique et émission]\n# Données : SUBSCRIBE ConsoleLog\n# Données : EMIT \"Hello C#\"\nA_COMPLETER\n\n[Cas 3 — Désinscription puis réinscription]\n# Données : SUBSCRIBE ServiceA\n# Données : UNSUBSCRIBE ServiceA\n# Données : EMIT \"Msg1\"\n# Données : SUBSCRIBE ServiceA\n# Données : EMIT \"Msg2\"\nA_COMPLETER\n",
    "hints": [
      "Maintiens une liste d'abonnés actifs dans l'ordre d'ajout.",
      "Lors d'un UNSUBSCRIBE, supprime le nom de la liste.",
      "Lors d'un EMIT, itère sur tous les abonnés actifs pour afficher la notification."
    ],
    "examples": [
      {
        "stdin": "SUBSCRIBE Logger\nSUBSCRIBE EmailService\nEMIT \"Incident Detecte\"\nUNSUBSCRIBE EmailService\nSUBSCRIBE SmsAlerte\nEMIT \"Serveur Redemarre\"",
        "expected": "EVENT \"Incident Detecte\" => Logger recoit la notification\nEVENT \"Incident Detecte\" => EmailService recoit la notification\nEVENT \"Serveur Redemarre\" => Logger recoit la notification\nEVENT \"Serveur Redemarre\" => SmsAlerte recoit la notification",
        "note": "EmailService reçoit la première alerte mais pas la seconde après désinscription."
      }
    ],
    "tests": [
      {
        "label": "Souscription initiale et émission",
        "stdin": "cas:1",
        "expected": "EVENT \"Signal Initial\" => ServiceAudit recoit la notification"
      },
      {
        "label": "Abonnement unique et émission",
        "stdin": "cas:2",
        "expected": "EVENT \"Hello C#\" => ConsoleLog recoit la notification"
      },
      {
        "label": "Désinscription puis réinscription",
        "stdin": "cas:3",
        "expected": "EVENT \"Msg2\" => ServiceA recoit la notification"
      }
    ],
    "solution": "[Exemple]\nEVENT \"Incident Detecte\" => Logger recoit la notification\nEVENT \"Incident Detecte\" => EmailService recoit la notification\nEVENT \"Serveur Redemarre\" => Logger recoit la notification\nEVENT \"Serveur Redemarre\" => SmsAlerte recoit la notification\n\n[Cas 1 — Souscription initiale et émission]\nEVENT \"Signal Initial\" => ServiceAudit recoit la notification\n\n[Cas 2 — Abonnement unique et émission]\nEVENT \"Hello C#\" => ConsoleLog recoit la notification\n\n[Cas 3 — Désinscription puis réinscription]\nEVENT \"Msg2\" => ServiceA recoit la notification"
  }
];

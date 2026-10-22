'use strict';

module.exports = [
  {
    "id": "um2-c4-e1",
    "chapter": 4,
    "title": "Simulateur de trace de diagramme de séquence",
    "level": "n1",
    "language": "analyse",
    "goal": "Valider l'ordonnancement temporel vertical des messages et l'équilibre des appels/retours entre lignes de vie (lifelines).",
    "brief": "<p>Analysez les données fournies pour chaque cas. Un message de retour <code>A --&gt; B</code> n'est valide que si un appel synchrone <code>B -&gt; A</code> est actuellement ouvert sur la pile d'activation.<br>\n2. À la fin de la séquence, toutes les activations doivent être fermées (pile vide).<br>\nPour chaque ligne lue :<br>\n- Si appel synchrone : afficher <code>[APPEL] &lt;Source&gt; invoque &lt;Cible&gt;.&lt;methode&gt; (Profondeur: &lt;N&gt;)</code><br>\n- Si retour : afficher <code>[RETOUR] &lt;Source&gt; repond a &lt;Cible&gt; : &lt;reponse&gt;</code><br>\n- Si retour incohérent : afficher <code>[ERREUR RETOUR] Pas d appel en attente de &lt;Cible&gt; vers &lt;Source&gt;</code>.<br>\nTerminer par le statut global : <code>SEQUENCE VALIDE</code> ou <code>SEQUENCE INCOMPLETE (&lt;X&gt; appels non clos)</code>.</p>",
    "starter": "# Grille d'analyse (um2-c4-e1) — Simulateur de trace de diagramme de séquence\n# Complétez la résolution demandée sous chaque cas ci-dessous :\n\n[Cas 1 — Appel non refermé en fin de scénario]\n# Données : IHM -> Controller : valider()\n# Données : Controller -> Service : check()\nA_COMPLETER\n\n[Cas 2 — Retour envoyé sans appel préalable]\n# Données : Client --> Serveur : ok\nA_COMPLETER\n\n[Cas 3 — Séquence à trois niveaux avec fermetures successives]\n# Données : A -> B : m1()\n# Données : B --> A : r1\n# Données : A -> C : m2()\n# Données : C --> A : r2\nA_COMPLETER\n",
    "hints": [
      "Gérer une pile (stack) d'appels contenant des tuples (demandeur, executeur).",
      "Un message \"-->\" doit dépiler le sommet de la pile et vérifier la concordance des acteurs."
    ],
    "examples": [
      {
        "stdin": "Client -> Serveur : getCatalogue()\nServeur -> BDD : queryAll()\nBDD --> Serveur : [art1, art2]\nServeur --> Client : listeArticles",
        "expected": "[APPEL] Client invoque Serveur.getCatalogue (Profondeur: 1)\n[APPEL] Serveur invoque BDD.queryAll (Profondeur: 2)\n[RETOUR] BDD repond a Serveur : [art1, art2]\n[RETOUR] Serveur repond a Client : listeArticles\nSEQUENCE VALIDE",
        "note": "Trace synchrone imbriquée parfaitement équilibrée."
      }
    ],
    "tests": [
      {
        "label": "Appel non refermé en fin de scénario",
        "stdin": "cas:1",
        "expected": "[APPEL] IHM invoque Controller.valider (Profondeur: 1)\n[APPEL] Controller invoque Service.check (Profondeur: 2)\nSEQUENCE INCOMPLETE (2 appels non clos)"
      },
      {
        "label": "Retour envoyé sans appel préalable",
        "stdin": "cas:2",
        "expected": "[ERREUR RETOUR] Pas d appel en attente de Serveur vers Client\nSEQUENCE VALIDE"
      },
      {
        "label": "Séquence à trois niveaux avec fermetures successives",
        "stdin": "cas:3",
        "expected": "[APPEL] A invoque B.m1 (Profondeur: 1)\n[RETOUR] B repond a A : r1\n[APPEL] A invoque C.m2 (Profondeur: 1)\n[RETOUR] C repond a A : r2\nSEQUENCE VALIDE"
      }
    ],
    "solution": "[Exemple]\n[APPEL] Client invoque Serveur.getCatalogue (Profondeur: 1)\n[APPEL] Serveur invoque BDD.queryAll (Profondeur: 2)\n[RETOUR] BDD repond a Serveur : [art1, art2]\n[RETOUR] Serveur repond a Client : listeArticles\nSEQUENCE VALIDE\n\n[Cas 1 — Appel non refermé en fin de scénario]\n[APPEL] IHM invoque Controller.valider (Profondeur: 1)\n[APPEL] Controller invoque Service.check (Profondeur: 2)\nSEQUENCE INCOMPLETE (2 appels non clos)\n\n[Cas 2 — Retour envoyé sans appel préalable]\n[ERREUR RETOUR] Pas d appel en attente de Serveur vers Client\nSEQUENCE VALIDE\n\n[Cas 3 — Séquence à trois niveaux avec fermetures successives]\n[APPEL] A invoque B.m1 (Profondeur: 1)\n[RETOUR] B repond a A : r1\n[APPEL] A invoque C.m2 (Profondeur: 1)\n[RETOUR] C repond a A : r2\nSEQUENCE VALIDE"
  },
  {
    "id": "um2-c4-e2",
    "chapter": 4,
    "title": "Évaluateur de fragments combinés (alt, opt, loop)",
    "level": "n2",
    "language": "analyse",
    "goal": "Interpréter les fragments d'interaction UML (alt pour alternative exclusive, opt pour optionnel, loop pour itération).",
    "brief": "<p>Le script simule l'exécution d'un fragment combiné UML en fonction d'un contexte de variables initiales :<br>\n- Première ligne : variables d'état au format <code>VAR k=v ...</code> (ex: <code>VAR solde=150 age=20</code>).<br>\n- Lignes suivantes : blocs de séquence balisés :<br>\n  * <code>ALT [garde]</code> ... <code>ELSE</code> ... <code>END_ALT</code><br>\n  * <code>OPT [garde]</code> ... <code>END_OPT</code><br>\n  * <code>LOOP [N]</code> ... <code>END_LOOP</code> (répète N fois le bloc)<br>\n  * Messages simples : <code>A -&gt; B : msg</code><br>\nLe script évalue les gardes booléennes simples (ex: <code>solde &gt;= 100</code>). Si la condition est vraie, les messages internes sont exécutés et affichés au format :<br>\n<code>[EXEC] &lt;Source&gt; -&gt; &lt;Cible&gt; : &lt;msg&gt;</code>.<br>\nSi la garde est fausse, le bloc est ignoré (ou la branche ELSE est empruntée).<br>\nÀ la fin, afficher le nombre total de messages émis : <code>MESSAGES TRANSMIS: &lt;N&gt;</code>.</p>",
    "starter": "# Grille d'analyse (um2-c4-e2) — Évaluateur de fragments combinés (alt, opt, loop)\n# Complétez la résolution demandée sous chaque cas ci-dessous :\n\n[Cas 1 — Branche ELSE exécutée]\n# Données : VAR solde=50\n# Données : ALT [solde >= 100]\n# Données :   Client -> Distributeur : delivrerBillets\n# Données : ELSE\n# Données :   Client -> Distributeur : refuserRetrait\n# Données : END_ALT\nA_COMPLETER\n\n[Cas 2 — Fragment OPT vérifié]\n# Données : VAR assurance=1\n# Données : OPT [assurance == 1]\n# Données :   Client -> Assureur : souscrirePolice\n# Données : END_OPT\nA_COMPLETER\n\n[Cas 3 — Fragment OPT non vérifié]\n# Données : VAR assurance=0\n# Données : OPT [assurance == 1]\n# Données :   Client -> Assureur : souscrirePolice\n# Données : END_OPT\nA_COMPLETER\n",
    "hints": [
      "Stocker les variables dans un dictionnaire pour évaluer les expressions de garde.",
      "Pour le bloc LOOP [N], exécuter le corps N fois."
    ],
    "examples": [
      {
        "stdin": "VAR solde=200\nALT [solde >= 100]\n  Client -> Distributeur : delivrerBillets\nELSE\n  Client -> Distributeur : refuserRetrait\nEND_ALT",
        "expected": "[EXEC] Client -> Distributeur : delivrerBillets\nMESSAGES TRANSMIS: 1",
        "note": "La garde solde >= 100 est vraie (200 >= 100), la branche ALT est exécutée."
      }
    ],
    "tests": [
      {
        "label": "Branche ELSE exécutée",
        "stdin": "cas:1",
        "expected": "[EXEC] Client -> Distributeur : refuserRetrait\nMESSAGES TRANSMIS: 1"
      },
      {
        "label": "Fragment OPT vérifié",
        "stdin": "cas:2",
        "expected": "[EXEC] Client -> Assureur : souscrirePolice\nMESSAGES TRANSMIS: 1"
      },
      {
        "label": "Fragment OPT non vérifié",
        "stdin": "cas:3",
        "expected": "MESSAGES TRANSMIS: 0"
      }
    ],
    "solution": "[Exemple]\n[EXEC] Client -> Distributeur : delivrerBillets\nMESSAGES TRANSMIS: 1\n\n[Cas 1 — Branche ELSE exécutée]\n[EXEC] Client -> Distributeur : refuserRetrait\nMESSAGES TRANSMIS: 1\n\n[Cas 2 — Fragment OPT vérifié]\n[EXEC] Client -> Assureur : souscrirePolice\nMESSAGES TRANSMIS: 1\n\n[Cas 3 — Fragment OPT non vérifié]\nMESSAGES TRANSMIS: 0"
  },
  {
    "id": "um2-c4-e3",
    "chapter": 4,
    "title": "Analyseur de synchronisme et concurrence de messages",
    "level": "n3",
    "language": "analyse",
    "goal": "Distinguer les messages synchrones (flèche pleine, appel bloquant) des messages asynchrones (flèche ouverte, non bloquant) et détecter les risques de blocage.",
    "brief": "<p>Analysez les données fournies pour chaque cas. Si un émetteur A tente un appel (synchrone ou asynchrone) alors qu'il est lui-même <strong>déjà bloqué en attente d'une réponse synchrone</strong> : <code>[BLOCAGE] &lt;A&gt; ne peut pas emettre (bloque en attente de reponse)</code>.<br>\n2. Si un appel synchrone est circulaire direct (A attend B et B attend A) : <code>[DEADLOCK] Interblocage mutuel detecte entre &lt;A&gt; et &lt;B&gt;</code>.<br>\n3. Sinon, affichezzr : <code>[OK] &lt;TYPE&gt; de &lt;A&gt; vers &lt;B&gt; (Statut &lt;A&gt;: &lt;BLOQUE|LIBRE&gt;)</code>.</p>",
    "starter": "# Grille d'analyse (um2-c4-e3) — Analyseur de synchronisme et concurrence de messages\n# Complétez la résolution demandée sous chaque cas ci-dessous :\n\n[Cas 1 — Émission refusée pour acteur déjà bloqué]\n# Données : SYNC A ->> B : req1\n# Données : SYNC A ->> C : req2\nA_COMPLETER\n\n[Cas 2 — Deadlock mutuel direct]\n# Données : SYNC X ->> Y : call1\n# Données : SYNC Y ->> X : call2\nA_COMPLETER\n\n[Cas 3 — Messages asynchrones consécutifs sans blocage]\n# Données : ASYNC Producteur -> File : push1\n# Données : ASYNC Producteur -> File : push2\n# Données : ASYNC Producteur -> File : push3\nA_COMPLETER\n",
    "hints": [
      "Maintenir l'état de chaque lifeline : bloquée (avec le nom de l'acteur attendu) ou libre.",
      "Un message asynchrone n'altère pas la disponibilité de l'émetteur."
    ],
    "examples": [
      {
        "stdin": "SYNC Client ->> Serveur : getData\nASYNC Serveur -> Logger : logEvent\nREPLY Serveur --> Client\nSYNC Client ->> Autre : check",
        "expected": "[OK] SYNC de Client vers Serveur (Statut Client: BLOQUE)\n[OK] ASYNC de Serveur vers Logger (Statut Serveur: LIBRE)\n[OK] REPLY de Serveur vers Client (Statut Client: LIBRE)\n[OK] SYNC de Client vers Autre (Statut Client: BLOQUE)",
        "note": "Le client se bloque sur l'appel synchrone, le serveur émet en asynchrone sans bloquer, puis le client est débloqué."
      }
    ],
    "tests": [
      {
        "label": "Émission refusée pour acteur déjà bloqué",
        "stdin": "cas:1",
        "expected": "[OK] SYNC de A vers B (Statut A: BLOQUE)\n[BLOCAGE] A ne peut pas emettre (bloque en attente de reponse)"
      },
      {
        "label": "Deadlock mutuel direct",
        "stdin": "cas:2",
        "expected": "[OK] SYNC de X vers Y (Statut X: BLOQUE)\n[DEADLOCK] Interblocage mutuel detecte entre Y et X"
      },
      {
        "label": "Messages asynchrones consécutifs sans blocage",
        "stdin": "cas:3",
        "expected": "[OK] ASYNC de Producteur vers File (Statut Producteur: LIBRE)\n[OK] ASYNC de Producteur vers File (Statut Producteur: LIBRE)\n[OK] ASYNC de Producteur vers File (Statut Producteur: LIBRE)"
      }
    ],
    "solution": "[Exemple]\n[OK] SYNC de Client vers Serveur (Statut Client: BLOQUE)\n[OK] ASYNC de Serveur vers Logger (Statut Serveur: LIBRE)\n[OK] REPLY de Serveur vers Client (Statut Client: LIBRE)\n[OK] SYNC de Client vers Autre (Statut Client: BLOQUE)\n\n[Cas 1 — Émission refusée pour acteur déjà bloqué]\n[OK] SYNC de A vers B (Statut A: BLOQUE)\n[BLOCAGE] A ne peut pas emettre (bloque en attente de reponse)\n\n[Cas 2 — Deadlock mutuel direct]\n[OK] SYNC de X vers Y (Statut X: BLOQUE)\n[DEADLOCK] Interblocage mutuel detecte entre Y et X\n\n[Cas 3 — Messages asynchrones consécutifs sans blocage]\n[OK] ASYNC de Producteur vers File (Statut Producteur: LIBRE)\n[OK] ASYNC de Producteur vers File (Statut Producteur: LIBRE)\n[OK] ASYNC de Producteur vers File (Statut Producteur: LIBRE)"
  }
];

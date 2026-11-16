/**
 * Exercices mis à jour — remédiation pédagogique
 */
'use strict';

module.exports = [
  {
    "id": "rb-c1-e1",
    "chapter": 1,
    "level": "n1",
    "language": "analyse",
    "title": "La première mise en route de l'aspirateur",
    "exampleTitle": "Exemple résolu — le programme de test du suiveur de ligne",
    "goal": "Décrire l'exécution séquentielle d'un programme et nommer les trois phases de la boucle capter, décider, agir.",
    "brief": "<p><strong>Énoncé.</strong> Au club de robotique, Lina vient d'assembler son robot aspirateur. Branchée sur la carte, la machine n'affiche rien tant qu'aucun programme ne la pilote. Lina téléverse son programme de mise en route, que la carte exécute ensuite de la première ligne à la dernière :</p><pre><code>nom = \"Lina\"\nprint(\"Bonjour, Club Robotique !\")\nprint(f\"Operateur : {nom}\")\nprint(\"Mode eco : batterie economisee\")</code></pre><p>Sur tout robot, la boucle de commande se récite en trois phases : <em>capter</em> (lire les entrées : capteur, bouton, horloge), <em>décider</em> (comparer ces lectures à des seuils), <em>agir</em> (commander les sorties : moteur, LED, buzzer).</p><ol><li>Les instructions d'un programme s'exécutent-elles de haut en bas, ligne par ligne, ou dans un ordre imprévisible ?</li><li>Combien de lignes ce programme de mise en route affiche-t-il ?</li><li>Quel nom s'affiche sur la ligne qui commence par <code>Operateur</code> ?</li><li>Comment s'appelle la phase de la boucle d'un robot qui lit les entrées ?</li><li>Comment s'appelle la phase de la boucle qui commande les sorties ?</li></ol><p>Répondez aux questions 4 et 5 par un seul mot.</p>",
    "starter": "# Exercice — La première mise en route de l'aspirateur\n# Lisez l'énoncé complet ci-dessus, puis répondez à chaque question dans son bloc.\n\n[Question 1 — Ordre d'exécution des instructions]\nA_COMPLETER\n\n[Question 2 — Nombre de lignes affichées]\nA_COMPLETER\n\n[Question 3 — Nom affiché après Operateur]\nA_COMPLETER\n\n[Question 4 — Phase qui lit les entrées]\nA_COMPLETER\n\n[Question 5 — Phase qui commande les sorties]\nA_COMPLETER\n",
    "hints": [
      "Un programme s'exécute ligne par ligne, de haut en bas : chaque ligne finit avant que la suivante commence.",
      "Seules les instructions d'affichage produisent des lignes à l'écran : comptez les print ; l'affectation nom = … range une valeur en mémoire sans rien afficher.",
      "Pour les deux dernières questions, récitez la boucle du robot dans l'ordre : lire les entrées, comparer aux seuils, commander les sorties."
    ],
    "examples": [
      {
        "stdin": "Le robot suiveur de ligne du club exécute son programme de test :\nnom = \"Suiveur\"\nprint(\"Pret au depart\")\nprint(f\"Pilote : {nom}\")\n\n1) Les instructions s'exécutent de haut en bas, ligne par ligne.\n2) Le programme affiche 2 lignes : les deux print, dans l'ordre écrit.\n3) La ligne Pilote affiche Suiveur, la valeur rangée dans nom.\n4) La phase qui lit les entrées s'appelle capter.",
        "expected": "2 lignes — pilote : Suiveur — phase capter",
        "note": "Une affectation n'affiche rien : seules les instructions d'affichage produisent des lignes, dans l'ordre exact du programme."
      }
    ],
    "tests": [
      {
        "label": "Question 1 — Ordre d'exécution des instructions",
        "stdin": "q:1",
        "expected": "de haut en bas||haut en bas||ligne par ligne||de haut en bas ligne par ligne"
      },
      {
        "label": "Question 2 — Nombre de lignes affichées",
        "stdin": "q:2",
        "expected": "3"
      },
      {
        "label": "Question 3 — Nom affiché après Operateur",
        "stdin": "q:3",
        "expected": "Lina"
      },
      {
        "label": "Question 4 — Phase qui lit les entrées",
        "stdin": "q:4",
        "expected": "capter"
      },
      {
        "label": "Question 5 — Phase qui commande les sorties",
        "stdin": "q:5",
        "expected": "agir"
      }
    ],
    "solution": "[Question 1 — Ordre d'exécution des instructions]\nde haut en bas\n\n[Question 2 — Nombre de lignes affichées]\n3\n\n[Question 3 — Nom affiché après Operateur]\nLina\n\n[Question 4 — Phase qui lit les entrées]\ncapter\n\n[Question 5 — Phase qui commande les sorties]\nagir",
    "takeaway": "1) Les instructions s'exécutent de haut en bas, ligne par ligne : l'ordre d'écriture est l'ordre d'exécution, chaque ligne finit avant que la suivante commence.\n2) Le programme contient exactement trois instructions print : il affiche 3 lignes. L'affectation nom = \"Lina\" range la valeur en mémoire, elle n'affiche rien.\n3) La f-string f\"Operateur : {nom}\" insère la valeur de nom : la ligne affichée est Operateur : Lina, donc le nom est Lina.\n4) La phase qui lit les entrées (capteur, bouton, horloge) s'appelle capter.\n5) La phase qui commande les sorties (moteur, LED, buzzer) s'appelle agir ; entre les deux, décider compare les lectures aux seuils.\nContrôle : un programme qui afficherait avant de lire ne pourrait pas marcher — capter précède toujours décider, qui précède agir."
  },
  {
    "id": "rb-c1-e2",
    "chapter": 1,
    "level": "n1",
    "language": "analyse",
    "title": "Calculatrice de bord",
    "goal": "Lire deux entiers, calculer somme, différence, produit, quotient et reste, et traiter la division par zéro.",
    "brief": "<p>La carte reçoit un entier <strong>A</strong> et un entier <strong>B</strong> positif ou nul sur la même ligne, séparés par un espace. Indiquez cinq lignes : la somme, la différence (A − B), le produit, le quotient entier et le reste. Si B est positif, le quotient est arrondi vers moins l’infini et le reste vérifie A = B × quotient + reste, avec 0 ≤ reste &lt; B. Si <strong>B vaut 0</strong>, remplacez les deux dernières lignes par une seule : <code>division impossible</code>.</p>",
    "starter": "# Grille d'analyse (rb-c1-e2) — Calculatrice de bord\n# Complétez la résolution demandée sous chaque cas ci-dessous :\n\n[Cas 1 — Reste non nul]\n# Données : 7 3\nA_COMPLETER\n\n[Cas 2 — Division par zéro]\n# Données : 9 0\nA_COMPLETER\n\n[Cas 3 — Valeurs négatives]\n# Données : -6 4\nA_COMPLETER\n",
    "hints": [
      "Commencez par les trois opérations qui restent définies pour tout diviseur.",
      "Si la division est possible, vérifiez la relation A = B × quotient + reste et le signe du reste.",
      "Respectez l ordre somme, difference, produit, quotient entier plancher et reste ; quand le diviseur vaut 0, affichez « division impossible »."
    ],
    "examples": [
      {
        "stdin": "10 5",
        "expected": "somme : 15\ndifference : 5\nproduit : 50\nquotient : 2\nreste : 0",
        "note": "Division entière : 10 // 5 = 2 et 10 % 5 = 0."
      }
    ],
    "tests": [
      {
        "label": "Reste non nul",
        "stdin": "cas:1",
        "expected": "somme : 10\ndifference : 4\nproduit : 21\nquotient : 2\nreste : 1"
      },
      {
        "label": "Division par zéro",
        "stdin": "cas:2",
        "expected": "somme : 9\ndifference : 9\nproduit : 0\ndivision impossible"
      },
      {
        "label": "Valeurs négatives",
        "stdin": "cas:3",
        "expected": "somme : -2\ndifference : -10\nproduit : -24\nquotient : -2\nreste : 2"
      }
    ],
    "solution": "[Exemple]\nsomme : 15\ndifference : 5\nproduit : 50\nquotient : 2\nreste : 0\n\n[Cas 1 — Reste non nul]\nsomme : 10\ndifference : 4\nproduit : 21\nquotient : 2\nreste : 1\n\n[Cas 2 — Division par zéro]\nsomme : 9\ndifference : 9\nproduit : 0\ndivision impossible\n\n[Cas 3 — Valeurs négatives]\nsomme : -2\ndifference : -10\nproduit : -24\nquotient : -2\nreste : 2",
    "takeaway": "À retenir : Lire deux entiers, calculer somme, différence, produit, quotient et reste, et traiter la division par zéro.\nRepère : Division entière : 10 // 5 = 2 et 10 % 5 = 0."
  },
  {
    "id": "rb-c1-e3",
    "chapter": 1,
    "level": "n2",
    "language": "analyse",
    "title": "Le rapport de tournée du robot d'inventaire",
    "exampleTitle": "Exemple résolu — le rapport d'entretien des robots",
    "goal": "Prévoir l'affichage produit par les formats de f-strings : alignement à largeur fixe, décimales imposées, zéros inutiles supprimés.",
    "brief": "<p><strong>Énoncé.</strong> Le robot d'inventaire de l'entrepôt rédige son rapport de fin de tournée sur le moniteur série. Ce soir, il a parcouru la zone <strong>B3</strong>, compté <strong>132 colis</strong> et relevé <strong>22.5 secondes</strong> de passage moyen par allée. Le programme met le rapport en forme :</p><pre><code>print(f\"{'Zone':&lt;12}: B3\")\nprint(f\"{'Colis':&lt;12}: 132\")\nprint(f\"{22.5:.2f} s par allee\")\nprint(f\"{30.0:g} s de pause\")</code></pre><p>Rappel du cours : <code>:&lt;12</code> aligne à gauche en complétant avec des espaces jusqu'à 12 caractères ; <code>:.2f</code> impose deux décimales ; <code>:g</code> supprime les zéros inutiles.</p><ol><li>Le libellé « Zone » compte 4 lettres : combien d'espaces le repère <code>:&lt;12</code> ajoute-t-il derrière lui ?</li><li>Le libellé « Colis » compte 5 lettres : combien d'espaces ajoute-t-il derrière lui ?</li><li>Qu'affiche le format <code>:.2f</code> appliqué à 22.5 (avec la virgule française, sans unité) ?</li><li>Que vaut le nombre affiché par <code>f\"{30.0:g}\"</code> ?</li><li>L'entrée « B3 132 » arrive sur une seule ligne : après découpage aux espaces, combien de morceaux la carte obtient-elle ?</li></ol><p>Répondez par des nombres, sauf la question 3 (un nombre à deux décimales).</p>",
    "starter": "# Exercice — Le rapport de tournée du robot d'inventaire\n# Lisez l'énoncé complet ci-dessus, puis répondez à chaque question dans son bloc.\n\n[Question 1 — Espaces ajoutés derrière « Zone »]\nA_COMPLETER\n\n[Question 2 — Espaces ajoutés derrière « Colis »]\nA_COMPLETER\n\n[Question 3 — Affichage de 22.5 en :.2f]\nA_COMPLETER\n\n[Question 4 — Nombre affiché par :g pour 30.0]\nA_COMPLETER\n\n[Question 5 — Morceaux de la ligne « B3 132 »]\nA_COMPLETER\n",
    "hints": [
      "Le repère :<12 complète le libellé jusqu'à 12 caractères : le nombre d'espaces est 12 moins la longueur du libellé.",
      ":.2f écrit toujours deux chiffres après la virgule ; :g garde les décimales utiles et supprime les zéros de fin.",
      "La découpe aux espaces produit un morceau par groupe de caractères encadré par des espaces : comptez les groupes, pas les caractères."
    ],
    "examples": [
      {
        "stdin": "Le rapport d'entretien aligne les libellés « Robot » (5 lettres) et « Batterie » (8 lettres) sur 12 caractères.\n\n1) « Robot » reçoit 12 − 5 = 7 espaces.\n2) « Batterie » reçoit 12 − 8 = 4 espaces.\n3) f\"{16.5:.2f}\" affiche 16.50 ; f\"{25.0:g}\" affiche 25.",
        "expected": "Robot : 7 espaces — Batterie : 4 espaces — 16.50 et 25",
        "note": "Le format :g nettoie les zéros inutiles : 25.0 s'affiche 25, mais 16.5 garde sa décimale utile."
      }
    ],
    "tests": [
      {
        "label": "Question 1 — Espaces ajoutés derrière « Zone »",
        "stdin": "q:1",
        "expected": "8"
      },
      {
        "label": "Question 2 — Espaces ajoutés derrière « Colis »",
        "stdin": "q:2",
        "expected": "7"
      },
      {
        "label": "Question 3 — Affichage de 22.5 en :.2f",
        "stdin": "q:3",
        "expected": "22,50||22.50"
      },
      {
        "label": "Question 4 — Nombre affiché par :g pour 30.0",
        "stdin": "q:4",
        "expected": "30"
      },
      {
        "label": "Question 5 — Morceaux de la ligne « B3 132 »",
        "stdin": "q:5",
        "expected": "2"
      }
    ],
    "solution": "[Question 1 — Espaces ajoutés derrière « Zone »]\n8\n\n[Question 2 — Espaces ajoutés derrière « Colis »]\n7\n\n[Question 3 — Affichage de 22.5 en :.2f]\n22,50\n\n[Question 4 — Nombre affiché par :g pour 30.0]\n30\n\n[Question 5 — Morceaux de la ligne « B3 132 »]\n2",
    "takeaway": "1) « Zone » compte 4 lettres : :&lt;12 complète jusqu'à 12 caractères, donc 12 − 4 = 8 espaces ajoutés.\n2) « Colis » compte 5 lettres : 12 − 5 = 7 espaces ajoutés.\n3) :.2f impose deux décimales : 22.5 s'affiche 22,50.\n4) :g supprime les zéros inutiles : 30.0 s'affiche 30.\n5) La ligne « B3 132 » se coupe aux espaces en deux morceaux : « B3 » et « 132 », tous deux du texte tant qu'aucune conversion int() n'a eu lieu.\nContrôle : les libellés complétés occupent tous exactement 12 caractères (4 + 8 et 5 + 7), ce qui forme les colonnes alignées du rapport."
  },
  {
    "id": "rb-c2-e1",
    "chapter": 2,
    "level": "n1",
    "language": "analyse",
    "title": "L'auto-test de la LED de l'aspirateur",
    "exampleTitle": "Exemple résolu — le clignotement du feu de recul",
    "goal": "Dérouler l'exécution d'une boucle for : nombre de passages, lignes affichées, bilan après la boucle, cas limite range(0).",
    "brief": "<p><strong>Énoncé.</strong> Avant chaque tournée, le robot aspirateur exécute son auto-test : la LED d'état clignote cinq fois, puis la carte annonce la fin du test. Le programme de simulation :</p><pre><code>for _ in range(5):\n    print(\"LED ON\")\n    print(\"LED OFF\")\nprint(\"Autotest termine\")</code></pre><p>Sur la vraie carte, la LED est câblée sur la broche 13. Le programme Arduino s'appuie sur les instructions suivantes :</p><table><tr><th>Instruction</th><th>Effet</th></tr><tr><td><code>pinMode(13, OUTPUT)</code></td><td>déclare la broche 13 en sortie, dans <code>setup()</code></td></tr><tr><td><code>digitalWrite(13, HIGH)</code></td><td>allume la LED</td></tr><tr><td><code>digitalWrite(13, LOW)</code></td><td>éteint la LED</td></tr></table><ol><li>Combien de fois le corps de la boucle s'exécute-t-il ?</li><li>Combien de fois la LED s'allume-t-elle ?</li><li>Au total, combien de lignes la boucle affiche-t-elle ?</li><li>Combien de fois la ligne « Autotest termine » s'affiche-t-elle ?</li><li>Si le programme utilisait <code>range(0)</code> au lieu de <code>range(5)</code>, combien de fois la LED s'allumerait-elle ?</li><li>Sur une carte Arduino, combien de fois la fonction <code>setup()</code> s'exécute-t-elle à la mise sous tension ?</li></ol><p>Répondez par des nombres, sauf la question 6 (une courte formule).</p>",
    "starter": "# Exercice — L'auto-test de la LED de l'aspirateur\n# Lisez l'énoncé complet ci-dessus, puis répondez à chaque question dans son bloc.\n\n[Question 1 — Nombre d'exécutions du corps de boucle]\nA_COMPLETER\n\n[Question 2 — Nombre d'allumages de la LED]\nA_COMPLETER\n\n[Question 3 — Lignes affichées par la boucle]\nA_COMPLETER\n\n[Question 4 — Affichages de « Autotest termine »]\nA_COMPLETER\n\n[Question 5 — Allumages avec range(0)]\nA_COMPLETER\n\n[Question 6 — Exécutions de setup() sur la carte]\nA_COMPLETER\n",
    "hints": [
      "range(k) produit exactement k entiers, de 0 à k − 1 : le corps de la boucle s'exécute k fois, ni plus ni moins.",
      "Le corps contient deux instructions d'affichage : chaque passage produit une ligne LED ON et une ligne LED OFF.",
      "Le bilan « Autotest termine » est aligné sur le for, hors de l'indentation : une seule exécution après la boucle ; range(0) est vide, la boucle saute directement au bilan. Sur la carte, setup() ne tourne qu'au démarrage, loop() se répète."
    ],
    "examples": [
      {
        "stdin": "Le feu de recul clignote trois fois :\nfor _ in range(3):\n    print(\"LED ON\")\n    print(\"LED OFF\")\nprint(\"Fin\")\n\n1) Le corps s'exécute 3 fois.\n2) La LED s'allume 3 fois.\n3) La boucle affiche 6 lignes.\n4) « Fin » s'affiche 1 fois, après la boucle.",
        "expected": "3 passages — 3 allumages — 6 lignes — 1 bilan",
        "note": "Un bilan écrit au même niveau que le for ne s'exécute qu'une seule fois, après le dernier passage."
      }
    ],
    "tests": [
      {
        "label": "Question 1 — Nombre d'exécutions du corps de boucle",
        "stdin": "q:1",
        "expected": "5"
      },
      {
        "label": "Question 2 — Nombre d'allumages de la LED",
        "stdin": "q:2",
        "expected": "5"
      },
      {
        "label": "Question 3 — Lignes affichées par la boucle",
        "stdin": "q:3",
        "expected": "10"
      },
      {
        "label": "Question 4 — Affichages de « Autotest termine »",
        "stdin": "q:4",
        "expected": "1"
      },
      {
        "label": "Question 5 — Allumages avec range(0)",
        "stdin": "q:5",
        "expected": "0"
      },
      {
        "label": "Question 6 — Exécutions de setup() sur la carte",
        "stdin": "q:6",
        "expected": "une seule fois||une fois||1 fois"
      }
    ],
    "solution": "[Question 1 — Nombre d'exécutions du corps de boucle]\n5\n\n[Question 2 — Nombre d'allumages de la LED]\n5\n\n[Question 3 — Lignes affichées par la boucle]\n10\n\n[Question 4 — Affichages de « Autotest termine »]\n1\n\n[Question 5 — Allumages avec range(0)]\n0\n\n[Question 6 — Exécutions de setup() sur la carte]\nune seule fois",
    "takeaway": "1) range(5) produit exactement 5 entiers (0 à 4) : le corps s'exécute 5 fois.\n2) Chaque passage affiche une ligne LED ON : la LED s'allume 5 fois.\n3) Deux lignes par passage (LED ON puis LED OFF) : 5 × 2 = 10 lignes affichées par la boucle.\n4) « Autotest termine » est écrit après la boucle, hors indentation : il s'affiche 1 seule fois.\n5) range(0) est vide : aucun passage, 0 allumage — le programme saute directement au bilan, qui s'affiche quand même. C'est le comportement correct « terminé après 0 clignotement ».\n6) setup() s'exécute une seule fois à la mise sous tension ; c'est loop() qui se répète indéfiniment.\nContrôle : 10 lignes de boucle + 1 ligne de bilan = 11 lignes au total à l'écran."
  },
  {
    "id": "rb-c2-e2",
    "chapter": 2,
    "level": "n2",
    "language": "analyse",
    "title": "La LED témoin du suiveur de ligne",
    "exampleTitle": "Exemple résolu — une série courte de 5 mesures",
    "goal": "Compter les événements d'une série dans une boucle conditionnelle et placer correctement le compteur.",
    "brief": "<p><strong>Énoncé.</strong> Le robot suiveur de ligne du club lit son capteur central à chaque centimètre parcouru : 1 si la ligne est détectée, 0 sinon. La LED témoin ne s'allume que quand la ligne est détectée. Le programme :</p><pre><code>allumages = 0\nfor etat in etats:\n    if etat == 1:\n        print(\"LED ON\")\n        allumages += 1\n    else:\n        print(\"LED OFF\")\nprint(f\"allumee : {allumages}\")</code></pre><p>Historique des mesures relevées sur la ligne de test :</p><table><tr><th>Position (cm)</th><td>1</td><td>2</td><td>3</td><td>4</td><td>5</td><td>6</td><td>7</td><td>8</td><td>9</td><td>10</td></tr><tr><th>État lu</th><td>1</td><td>0</td><td>1</td><td>1</td><td>0</td><td>0</td><td>1</td><td>1</td><td>1</td><td>0</td></tr></table><ol><li>Combien de valeurs compte la série ?</li><li>Combien de fois la ligne « LED ON » s'affiche-t-elle ?</li><li>Combien de fois la ligne « LED OFF » s'affiche-t-elle ?</li><li>Où initialise-t-on le compteur <code>allumages</code> : avant la boucle, dans la boucle ou après la boucle ?</li><li>Quelle ligne s'affiche en dernier : LED ON, LED OFF ou le bilan ?</li><li>Contrôle du cours : allumages + extinctions = ?</li></ol><p>Répondez par des nombres, sauf les questions 4 et 5.</p>",
    "starter": "# Exercice — La LED témoin du suiveur de ligne\n# Lisez l'énoncé complet ci-dessus, puis répondez à chaque question dans son bloc.\n\n[Question 1 — Effectif de la série]\nA_COMPLETER\n\n[Question 2 — Affichages de « LED ON »]\nA_COMPLETER\n\n[Question 3 — Affichages de « LED OFF »]\nA_COMPLETER\n\n[Question 4 — Placement de l'initialisation du compteur]\nA_COMPLETER\n\n[Question 5 — Dernière ligne affichée]\nA_COMPLETER\n\n[Question 6 — Contrôle allumages + extinctions]\nA_COMPLETER\n",
    "hints": [
      "Un compteur vit en trois temps : initialisation avant la boucle, mise à jour dans la bonne branche, bilan après la boucle.",
      "Comptez les 1 de l'historique pour les allumages et les 0 pour les extinctions : chaque passage exécute exactement une branche du if / else.",
      "Le bilan est écrit hors de la boucle : il s'affiche une seule fois, après le dernier passage — et la somme des deux comptes doit redonner l'effectif de la série."
    ],
    "examples": [
      {
        "stdin": "Historique court de 5 mesures : 1 1 0 1 0.\n\n1) La série compte 5 valeurs.\n2) LED ON s'affiche 3 fois (trois 1).\n3) LED OFF s'affiche 2 fois (deux 0).\n4) Contrôle : 3 + 2 = 5, l'effectif de la série.",
        "expected": "5 valeurs — 3 allumages — 2 extinctions — somme 5",
        "note": "Un test, deux destins : chaque valeur incrémente exactement un des deux compteurs."
      }
    ],
    "tests": [
      {
        "label": "Question 1 — Effectif de la série",
        "stdin": "q:1",
        "expected": "10"
      },
      {
        "label": "Question 2 — Affichages de « LED ON »",
        "stdin": "q:2",
        "expected": "6"
      },
      {
        "label": "Question 3 — Affichages de « LED OFF »",
        "stdin": "q:3",
        "expected": "4"
      },
      {
        "label": "Question 4 — Placement de l'initialisation du compteur",
        "stdin": "q:4",
        "expected": "avant la boucle||avant"
      },
      {
        "label": "Question 5 — Dernière ligne affichée",
        "stdin": "q:5",
        "expected": "le bilan||bilan"
      },
      {
        "label": "Question 6 — Contrôle allumages + extinctions",
        "stdin": "q:6",
        "expected": "10"
      }
    ],
    "solution": "[Question 1 — Effectif de la série]\n10\n\n[Question 2 — Affichages de « LED ON »]\n6\n\n[Question 3 — Affichages de « LED OFF »]\n4\n\n[Question 4 — Placement de l'initialisation du compteur]\navant la boucle\n\n[Question 5 — Dernière ligne affichée]\nle bilan\n\n[Question 6 — Contrôle allumages + extinctions]\n10",
    "takeaway": "1) L'historique compte 10 valeurs (positions 1 à 10).\n2) Les états 1 se trouvent aux positions 1, 3, 4, 7, 8 et 9 : LED ON s'affiche 6 fois.\n3) Les états 0 se trouvent aux positions 2, 5, 6 et 10 : LED OFF s'affiche 4 fois.\n4) Le compteur s'initialise avant la boucle : initialisé dans la boucle, il repartirait à zéro à chaque passage et ne compterait jamais rien.\n5) La dernière valeur lue est 0 (LED OFF au passage), puis la boucle se termine : la dernière ligne affichée est le bilan « allumee : 6 », écrit hors de la boucle.\n6) Contrôle : 6 + 4 = 10, l'effectif exact de la série — un test, deux destins, chaque passage incrémente un seul compteur.\nVérification : un compteur initialisé dans la boucle afficherait « allumee : 1 » en permanence, quelle que soit la série."
  },
  {
    "id": "rb-c2-e3",
    "chapter": 2,
    "level": "n2",
    "language": "analyse",
    "title": "Le feu tricolore du carrefour",
    "exampleTitle": "Exemple résolu — le feu du passage piéton",
    "goal": "Cadencer une séquence multi-états dans une boucle et totaliser durées et affichages sur plusieurs cycles.",
    "brief": "<p><strong>Énoncé.</strong> Le club simule le feu tricolore du carrefour situé devant l'atelier. Un cycle du feu enchaîne quatre états : rouge 3 s, orange 1 s, verte 3 s, orange 1 s. Le programme de la carte rejoue <strong>4 cycles</strong> complets :</p><pre><code>for _ in range(4):\n    print(\"rouge (3 s)\")\n    print(\"orange (1 s)\")\n    print(\"verte (3 s)\")\n    print(\"orange (1 s)\")</code></pre><ol><li>Combien de lignes un cycle complet affiche-t-il ?</li><li>Combien d'états orange un cycle comporte-t-il ?</li><li>Quelle est la durée d'un cycle complet, en secondes ?</li><li>Quelle est la durée totale simulée par le programme, en secondes ?</li><li>Au total, combien de fois la ligne « orange (1 s) » s'affiche-t-elle ?</li><li>Comment la séquence garantit-elle qu'une seule lampe est allumée à la fois : par un test à chaque tour, ou par construction ?</li></ol><p>Répondez par des nombres, sauf la question 6 (une courte formule).</p>",
    "starter": "# Exercice — Le feu tricolore du carrefour\n# Lisez l'énoncé complet ci-dessus, puis répondez à chaque question dans son bloc.\n\n[Question 1 — Lignes affichées par cycle]\nA_COMPLETER\n\n[Question 2 — États orange par cycle]\nA_COMPLETER\n\n[Question 3 — Durée d'un cycle (en secondes)]\nA_COMPLETER\n\n[Question 4 — Durée totale simulée (en secondes)]\nA_COMPLETER\n\n[Question 5 — Affichages totaux de « orange (1 s) »]\nA_COMPLETER\n\n[Question 6 — Garantie « une seule lampe à la fois »]\nA_COMPLETER\n",
    "hints": [
      "La séquence tient dans le corps de la boucle : comptez ses instructions d'affichage pour un cycle, puis multipliez par le nombre de cycles.",
      "La durée d'un cycle est la somme des durées des états qui le composent.",
      "Aucune instruction de la séquence n'allume deux états à la fois : la contrainte « une seule lampe » est structurelle, elle tient à l'écriture même de la séquence."
    ],
    "examples": [
      {
        "stdin": "Le feu du passage piéton rejoue 2 cycles de : rouge 2 s, vert 4 s, orange 1 s.\n\n1) Un cycle affiche 3 lignes.\n2) Durée d'un cycle : 2 + 4 + 1 = 7 s.\n3) Durée totale : 2 × 7 = 14 s.\n4) La ligne « vert (4 s) » s'affiche 2 fois.",
        "expected": "3 lignes par cycle — 7 s par cycle — 14 s au total — 2 verts",
        "note": "La boucle ne fait que rejouer la séquence : tout ce qui se compte par cycle se multiplie par le nombre de cycles."
      }
    ],
    "tests": [
      {
        "label": "Question 1 — Lignes affichées par cycle",
        "stdin": "q:1",
        "expected": "4"
      },
      {
        "label": "Question 2 — États orange par cycle",
        "stdin": "q:2",
        "expected": "2"
      },
      {
        "label": "Question 3 — Durée d'un cycle (en secondes)",
        "stdin": "q:3",
        "expected": "8||8 s||8 secondes"
      },
      {
        "label": "Question 4 — Durée totale simulée (en secondes)",
        "stdin": "q:4",
        "expected": "32||32 s"
      },
      {
        "label": "Question 5 — Affichages totaux de « orange (1 s) »",
        "stdin": "q:5",
        "expected": "8"
      },
      {
        "label": "Question 6 — Garantie « une seule lampe à la fois »",
        "stdin": "q:6",
        "expected": "par construction||construction"
      }
    ],
    "solution": "[Question 1 — Lignes affichées par cycle]\n4\n\n[Question 2 — États orange par cycle]\n2\n\n[Question 3 — Durée d'un cycle (en secondes)]\n8\n\n[Question 4 — Durée totale simulée (en secondes)]\n32\n\n[Question 5 — Affichages totaux de « orange (1 s) »]\n8\n\n[Question 6 — Garantie « une seule lampe à la fois »]\npar construction",
    "takeaway": "1) Le corps de la boucle contient quatre instructions d'affichage : un cycle complet affiche 4 lignes.\n2) Le cycle contient deux états orange : celui après le rouge et celui après le vert.\n3) Durée d'un cycle : 3 + 1 + 3 + 1 = 8 secondes.\n4) Le programme rejoue 4 cycles : 4 × 8 = 32 secondes simulées au total.\n5) Deux affichages d'orange par cycle, sur 4 cycles : 2 × 4 = 8 affichages de « orange (1 s) ».\n6) La garantie est par construction : la séquence n'allume qu'un état par étape, aucune instruction ne commande deux lampes à la fois — aucun test à chaque tour n'est nécessaire.\nContrôle : 16 lignes affichées au total (4 lignes × 4 cycles), dont 4 rouges, 8 oranges, 4 vertes — et 4 + 8 + 4 = 16."
  },
  {
    "id": "rb-c3-e1",
    "chapter": 3,
    "level": "n1",
    "language": "analyse",
    "title": "Les allées paires du robot d'inventaire",
    "exampleTitle": "Exemple résolu — la tournée courte de trois allées",
    "goal": "Appliquer une fonction de test de parité à une série et compter chacune des deux branches.",
    "brief": "<p><strong>Énoncé.</strong> Dans l'entrepôt, seules les allées de numéro pair sont équipées de lecteurs de codes-barres : le robot d'inventaire ne les descend que si sa fonction de test répond vrai. La règle de décision du club s'écrit :</p><pre><code>RÈGLE DE DÉCISION EstPair(x) :\n  Si (x MOD 2 = 0) Alors VRAI Sinon FAUX</code></pre><p>La tournée du jour passe par les allées numéro : <code>12 — 7 — 30 — 15 — 8 — 21 — 4</code>.</p><ol><li>Que renvoie une fonction de test : un booléen, un texte ou un nombre ?</li><li>Que vaut EstPair(12) : vrai ou faux ?</li><li>Combien d'allées paires compte la tournée ?</li><li>Combien d'allées impaires ?</li><li>Contrôle du cours : paires + impaires = ?</li><li>Que vaut EstPair(0) : vrai ou faux ?</li></ol><p>Répondez aux questions 2 et 6 par vrai ou faux, et à la question 1 par un seul mot.</p>",
    "starter": "# Exercice — Les allées paires du robot d'inventaire\n# Lisez l'énoncé complet ci-dessus, puis répondez à chaque question dans son bloc.\n\n[Question 1 — Ce que renvoie une fonction de test]\nA_COMPLETER\n\n[Question 2 — Valeur de EstPair(12)]\nA_COMPLETER\n\n[Question 3 — Allées paires de la tournée]\nA_COMPLETER\n\n[Question 4 — Allées impaires de la tournée]\nA_COMPLETER\n\n[Question 5 — Contrôle paires + impaires]\nA_COMPLETER\n\n[Question 6 — Valeur de EstPair(0)]\nA_COMPLETER\n",
    "hints": [
      "Une fonction de test reçoit une valeur, renvoie vrai ou faux et n'affiche rien : c'est le programme principal qui décide quoi faire de la réponse.",
      "x MOD 2 vaut 0 exactement pour les nombres pairs : classez chaque numéro d'allée dans une des deux catégories, sans en oublier.",
      "Contrôle final : la somme des deux comptes doit redonner l'effectif de la tournée ; et pour zéro, le reste de la division par 2 est nul."
    ],
    "examples": [
      {
        "stdin": "Tournée courte de trois allées : 9, 14, 5.\n\n1) EstPair(14) vaut vrai (14 = 2 × 7).\n2) 1 allée paire : 14.\n3) 2 allées impaires : 9 et 5.\n4) Contrôle : 1 + 2 = 3, l'effectif de la tournée.",
        "expected": "14 paire — 1 paire et 2 impaires — contrôle 3",
        "note": "Un test, deux destins : chaque numéro compte dans exactement une branche, jamais deux."
      }
    ],
    "tests": [
      {
        "label": "Question 1 — Ce que renvoie une fonction de test",
        "stdin": "q:1",
        "expected": "un booléen||un booleen||booléen||booleen"
      },
      {
        "label": "Question 2 — Valeur de EstPair(12)",
        "stdin": "q:2",
        "expected": "vrai||true"
      },
      {
        "label": "Question 3 — Allées paires de la tournée",
        "stdin": "q:3",
        "expected": "4"
      },
      {
        "label": "Question 4 — Allées impaires de la tournée",
        "stdin": "q:4",
        "expected": "3"
      },
      {
        "label": "Question 5 — Contrôle paires + impaires",
        "stdin": "q:5",
        "expected": "7"
      },
      {
        "label": "Question 6 — Valeur de EstPair(0)",
        "stdin": "q:6",
        "expected": "vrai||true"
      }
    ],
    "solution": "[Question 1 — Ce que renvoie une fonction de test]\nun booléen\n\n[Question 2 — Valeur de EstPair(12)]\nvrai\n\n[Question 3 — Allées paires de la tournée]\n4\n\n[Question 4 — Allées impaires de la tournée]\n3\n\n[Question 5 — Contrôle paires + impaires]\n7\n\n[Question 6 — Valeur de EstPair(0)]\nvrai",
    "takeaway": "1) Une fonction de test renvoie un booléen : vrai ou faux. Elle ne renvoie ni texte ni nombre, et surtout elle n'affiche rien.\n2) 12 MOD 2 = 0 (12 = 2 × 6) : EstPair(12) vaut vrai.\n3) Allées paires de la tournée : 12, 30, 8 et 4 — soit 4 allées.\n4) Allées impaires : 7, 15 et 21 — soit 3 allées.\n5) Contrôle : 4 + 3 = 7, l'effectif exact de la tournée. Si la somme différait, le test ne serait pas exclusif.\n6) 0 MOD 2 vaut 0 : zéro est pair, EstPair(0) vaut vrai — c'est le cas de bord du cours.\nVérification : la comparaison x % 2 == 0 est déjà un booléen ; pas besoin d'un if … : return True else: return False."
  },
  {
    "id": "rb-c3-e2",
    "chapter": 3,
    "level": "n2",
    "language": "analyse",
    "title": "Les caisses à numéro premier du bras",
    "exampleTitle": "Exemple résolu — les caisses 19 et 15",
    "goal": "Appliquer le test de primalité avec arrêt à la racine carrée et traiter les cas de bord 0 et 1.",
    "brief": "<p><strong>Énoncé.</strong> Le bras robotisé de l'atelier emballe des caisses. Une caisse dont le numéro est un nombre premier part seule sur la palette des références uniques. La règle du club s'écrit :</p><pre><code>ALGORITHME TestPrimalite(x) :\n  Si x &lt; 2 Alors Retourner FAUX\n  Pour d de 2 jusqu'à √x :\n    Si (x MOD d = 0) Alors Retourner FAUX\n  Retourner VRAI</code></pre><p>Les quatre numéros du jour sont : <strong>23, 27, 31 et 1</strong>.</p><ol><li>La caisse 23 part-elle seule sur la palette des références uniques (oui ou non) ?</li><li>La caisse 27 part-elle seule (oui ou non) ?</li><li>Pour x = 31, jusqu'à quel diviseur d suffit-il de tester ?</li><li>Combien de diviseurs sont testés au total pour conclure que 31 est premier (d de 2 à 5) ?</li><li>La caisse 1 part-elle seule (oui ou non) ?</li><li>Quel est le premier diviseur trouvé pour 27 ?</li></ol><p>Répondez par oui ou non aux questions 1, 2 et 5, et par des nombres aux autres.</p>",
    "starter": "# Exercice — Les caisses à numéro premier du bras\n# Lisez l'énoncé complet ci-dessus, puis répondez à chaque question dans son bloc.\n\n[Question 1 — La caisse 23 est-elle première]\nA_COMPLETER\n\n[Question 2 — La caisse 27 est-elle première]\nA_COMPLETER\n\n[Question 3 — Borne de test pour x = 31]\nA_COMPLETER\n\n[Question 4 — Diviseurs testés pour 31]\nA_COMPLETER\n\n[Question 5 — La caisse 1 est-elle première]\nA_COMPLETER\n\n[Question 6 — Premier diviseur trouvé pour 27]\nA_COMPLETER\n",
    "hints": [
      "Un nombre premier possède exactement deux diviseurs : 1 et lui-même ; les nombres inférieurs à 2 sont exclus d'entrée par le premier test.",
      "On cherche un diviseur d de 2 jusqu'à la racine carrée de x : pour x = 31, la racine est entre 5 et 6, donc d s'arrête à 5.",
      "Pour 27, essayez les petits diviseurs dans l'ordre : dès qu'un reste de division est nul, le test répond faux ; pour 31, aucun des diviseurs testés ne divise."
    ],
    "examples": [
      {
        "stdin": "Caisses numérotées 19 et 15.\n\n1) √19 est entre 4 et 5 : on teste d = 2, 3, 4 — aucun ne divise 19, elle est première.\n2) 15 est divisible par 3 dès le deuxième essai : elle n'est pas première.\n3) Pour x = 19, d va de 2 à 4 : 3 diviseurs testés.",
        "expected": "19 première — 15 divisible par 3 — 3 diviseurs testés",
        "note": "S'arrêter à la racine suffit : un diviseur au-delà de la racine en supposerait un plus petit, déjà testé."
      }
    ],
    "tests": [
      {
        "label": "Question 1 — La caisse 23 est-elle première",
        "stdin": "q:1",
        "expected": "oui"
      },
      {
        "label": "Question 2 — La caisse 27 est-elle première",
        "stdin": "q:2",
        "expected": "non"
      },
      {
        "label": "Question 3 — Borne de test pour x = 31",
        "stdin": "q:3",
        "expected": "5"
      },
      {
        "label": "Question 4 — Diviseurs testés pour 31",
        "stdin": "q:4",
        "expected": "4"
      },
      {
        "label": "Question 5 — La caisse 1 est-elle première",
        "stdin": "q:5",
        "expected": "non"
      },
      {
        "label": "Question 6 — Premier diviseur trouvé pour 27",
        "stdin": "q:6",
        "expected": "3"
      }
    ],
    "solution": "[Question 1 — La caisse 23 est-elle première]\noui\n\n[Question 2 — La caisse 27 est-elle première]\nnon\n\n[Question 3 — Borne de test pour x = 31]\n5\n\n[Question 4 — Diviseurs testés pour 31]\n4\n\n[Question 5 — La caisse 1 est-elle première]\nnon\n\n[Question 6 — Premier diviseur trouvé pour 27]\n3",
    "takeaway": "1) Pour 23, on teste d = 2, 3, 4 (√23 est entre 4 et 5) : aucun ne divise 23. Premier, elle part seule : oui.\n2) 27 = 3 × 9 : le test trouve le diviseur 3 et répond faux. La caisse 27 ne part pas seule : non.\n3) √31 est entre 5 et 6 (5² = 25 et 6² = 36) : il suffit de tester jusqu'à d = 5.\n4) De d = 2 à d = 5, il y a 4 diviseurs testés : 2, 3, 4 et 5 — aucun ne divise 31, qui est premier.\n5) 1 n'a qu'un seul diviseur (lui-même) : le test x &lt; 2 l'exclut d'entrée. Non, la caisse 1 ne part pas seule — sans ce test de bord, 1 sortirait « premier » par erreur.\n6) Le premier diviseur trouvé pour 27 est 3 (27 MOD 3 = 0) : les essais s'arrêtent là, inutile d'aller plus loin.\nContrôle : 23 et 31 sont premiers, 27 et 1 non — deux caisses seules, deux caisses en lot commun."
  },
  {
    "id": "rb-c3-e3",
    "chapter": 3,
    "level": "n3",
    "language": "analyse",
    "title": "Le freinage anti-collision de l'aspirateur",
    "exampleTitle": "Exemple résolu — le seuil de freinage à 15 cm",
    "goal": "Appliquer un seuil strict à des relevés de capteur, compter les alertes et enchaîner une règle à trois états.",
    "brief": "<p><strong>Énoncé.</strong> Le robot aspirateur freine dès que son capteur de distance annonce un obstacle à moins de <strong>10 cm</strong> (seuil strict, comme sur le TP du club). La décision s'écrit :</p><pre><code>Si d &lt; 10 Alors freiner\nSinon poursuivre</code></pre><p>Relevés du capteur pendant la traversée du salon (en cm) : <code>12 — 10 — 8 — 25 — 10 — 7 — 14</code>.</p><p>La même carte surveille aussi le local des batteries avec une sonde d'humidité à trois états :</p><pre><code>Si h &gt; 65 Alors \"ALERTE HUMIDITE\"\nSinon Si h &lt; 35 Alors \"ALERTE SEC\"\nSinon \"normale\"</code></pre><ol><li>Le capteur lit 8 : le robot freine-t-il (oui ou non) ?</li><li>Le capteur lit exactement 10 : freine-t-il (oui ou non) ?</li><li>Combien de relevés de la série déclenchent le freinage ?</li><li>Quel symbole traduit « strictement inférieur » (écrivez &lt; ou &lt;=) ?</li><li>La sonde du local des batteries lit h = 25 : quel état affiche-t-elle ?</li></ol><p>Répondez par oui ou non aux questions 1 et 2, et par le nom exact de l'état à la question 5.</p>",
    "starter": "# Exercice — Le freinage anti-collision de l'aspirateur\n# Lisez l'énoncé complet ci-dessus, puis répondez à chaque question dans son bloc.\n\n[Question 1 — Freinage pour d = 8]\nA_COMPLETER\n\n[Question 2 — Freinage pour d = 10]\nA_COMPLETER\n\n[Question 3 — Relevés qui déclenchent le freinage]\nA_COMPLETER\n\n[Question 4 — Symbole de « strictement inférieur »]\nA_COMPLETER\n\n[Question 5 — État de la sonde pour h = 25]\nA_COMPLETER\n",
    "hints": [
      "Le seuil de distance est strict : seul un relevé strictement inférieur à la limite déclenche le freinage ; le relevé exactement égal passe.",
      "Classez chaque relevé de la série en « strictement sous 10 » ou « 10 et plus », puis comptez la branche freinage.",
      "Dans une chaîne Si / Sinon Si / Sinon, le premier test vrai gagne : comparez la valeur d'humidité aux deux seuils, dans l'ordre d'écriture."
    ],
    "examples": [
      {
        "stdin": "Seuil de freinage réglé à 15 cm ; relevés : 20 — 15 — 9 — 12.\n\n1) 9 et 12 sont strictement sous 15 : 2 freinages.\n2) 15 exactement ne freine pas (seuil strict).\n3) Symbole du test : <.\n4) Sonde à trois états (mêmes seuils) pour h = 14 : ALERTE SEC, car 14 est sous 35 sans dépasser 65.",
        "expected": "2 freinages — test < — h = 14 : ALERTE SEC",
        "note": "La frontière appartient au « sinon » : une valeur exactement au seuil ne déclenche rien."
      }
    ],
    "tests": [
      {
        "label": "Question 1 — Freinage pour d = 8",
        "stdin": "q:1",
        "expected": "oui"
      },
      {
        "label": "Question 2 — Freinage pour d = 10",
        "stdin": "q:2",
        "expected": "non"
      },
      {
        "label": "Question 3 — Relevés qui déclenchent le freinage",
        "stdin": "q:3",
        "expected": "2"
      },
      {
        "label": "Question 4 — Symbole de « strictement inférieur »",
        "stdin": "q:4",
        "expected": "<||inférieur strict||inferieur strict||strictement inférieur"
      },
      {
        "label": "Question 5 — État de la sonde pour h = 25",
        "stdin": "q:5",
        "expected": "ALERTE SEC||alerte sec"
      }
    ],
    "solution": "[Question 1 — Freinage pour d = 8]\noui\n\n[Question 2 — Freinage pour d = 10]\nnon\n\n[Question 3 — Relevés qui déclenchent le freinage]\n2\n\n[Question 4 — Symbole de « strictement inférieur »]\n<\n\n[Question 5 — État de la sonde pour h = 25]\nALERTE SEC",
    "takeaway": "1) 8 &lt; 10 : le relevé est strictement sous le seuil, le robot freine. Oui.\n2) 10 n'est pas strictement inférieur à 10 : avec le test d &lt; 10, la valeur exactement au seuil ne déclenche pas. Non.\n3) Relevés strictement sous 10 : 8 et 7 — soit 2 freinages. Les deux relevés égaux à 10 passent, comme 12, 25 et 14.\n4) « Strictement inférieur » se traduit par &lt; ; un &lt;= déplacerait la frontière et ferait freiner sur 10.\n5) Pour h = 25 : le premier test (h &gt; 65) est faux ; le second (h &lt; 35) est vrai : la sonde affiche ALERTE SEC.\nContrôle : 7 relevés = 2 freinages + 5 poursuites ; l'ordre des tests de la sonde fait que 25 est classé une seule fois."
  },
  {
    "id": "rb-c4-e1",
    "chapter": 4,
    "level": "n2",
    "language": "analyse",
    "title": "Le tri des mesures du robot d'inventaire",
    "exampleTitle": "Exemple résolu — une série de 3 mesures",
    "goal": "Dérouler un tri à bulles à la main, compter les comparaisons de chaque passage et donner la série triée.",
    "brief": "<p><strong>Énoncé.</strong> Le robot d'inventaire a relevé quatre mesures de distance pour calibrer son capteur, dans cet ordre (en cm) : <code>42 — 17 — 58 — 23</code>. Pour signaler la plus petite, le club impose le tri à bulles écrit à la main, qui compare chaque couple de voisins et échange les voisins mal ordonnés :</p><pre><code>for i in range(n - 1):\n    for j in range(n - 1 - i):\n        if valeurs[j] &gt; valeurs[j + 1]:\n            valeurs[j], valeurs[j + 1] = valeurs[j + 1], valeurs[j]</code></pre><ol><li>Avec n = 4, combien de comparaisons le double parcours complet effectue-t-il au total ?</li><li>Au premier passage (i = 0), combien de comparaisons ?</li><li>Au deuxième passage (i = 1), combien de comparaisons ?</li><li>Après le premier passage complet, où se retrouve la plus grande valeur du tableau ?</li><li>Quelle est la série triée finale (valeurs séparées par des espaces) ?</li><li>Une série déjà triée paie-t-elle le même nombre de comparaisons (oui ou non) ?</li></ol><p>Répondez par des nombres, sauf les questions 4 et 6.</p>",
    "starter": "# Exercice — Le tri des mesures du robot d'inventaire\n# Lisez l'énoncé complet ci-dessus, puis répondez à chaque question dans son bloc.\n# Question 5 : écrivez la série triée en valeurs croissantes séparées par des espaces.\n\n[Question 1 — Comparaisons du double parcours complet]\nA_COMPLETER\n\n[Question 2 — Comparaisons au passage i = 0]\nA_COMPLETER\n\n[Question 3 — Comparaisons au passage i = 1]\nA_COMPLETER\n\n[Question 4 — Place de la plus grande valeur après un passage]\nA_COMPLETER\n\n[Question 5 — Série triée finale]\nA_COMPLETER\n\n[Question 6 — Prix d'une série déjà triée]\nA_COMPLETER\n",
    "hints": [
      "Le double parcours compare chaque paire de voisins une fois : la formule du cours est n(n − 1)/2, la somme 1 + 2 + … + (n − 1).",
      "Au passage i, la borne intérieure est n − 1 − i : après i passages, les i dernières places sont définitives et ne se re-testent pas.",
      "À chaque passage, la plus grande valeur restante « bulle » jusqu'à sa place en fin de tableau ; le compteur de comparaisons s'incrémente à chaque test, échange ou non — même sur une série déjà triée."
    ],
    "examples": [
      {
        "stdin": "Série de 3 mesures : 31 — 9 — 25.\n\n1) Total : 3 × 2 / 2 = 3 comparaisons.\n2) Passage 1 (i = 0) : 2 comparaisons (j = 0 puis 1) ; passage 2 : 1 comparaison.\n3) Série triée : 9 25 31.",
        "expected": "3 comparaisons — 2 puis 1 par passage — série triée 9 25 31",
        "note": "La borne intérieure raccourcit à chaque passage : les places déjà triées ne se re-testent pas."
      }
    ],
    "tests": [
      {
        "label": "Question 1 — Comparaisons du double parcours complet",
        "stdin": "q:1",
        "expected": "6"
      },
      {
        "label": "Question 2 — Comparaisons au passage i = 0",
        "stdin": "q:2",
        "expected": "3"
      },
      {
        "label": "Question 3 — Comparaisons au passage i = 1",
        "stdin": "q:3",
        "expected": "2"
      },
      {
        "label": "Question 4 — Place de la plus grande valeur après un passage",
        "stdin": "q:4",
        "expected": "en fin de tableau||à la fin du tableau||en fin de liste||en dernière position"
      },
      {
        "label": "Question 5 — Série triée finale",
        "stdin": "q:5",
        "expected": "17 23 42 58"
      },
      {
        "label": "Question 6 — Prix d'une série déjà triée",
        "stdin": "q:6",
        "expected": "oui"
      }
    ],
    "solution": "[Question 1 — Comparaisons du double parcours complet]\n6\n\n[Question 2 — Comparaisons au passage i = 0]\n3\n\n[Question 3 — Comparaisons au passage i = 1]\n2\n\n[Question 4 — Place de la plus grande valeur après un passage]\nen fin de tableau\n\n[Question 5 — Série triée finale]\n17 23 42 58\n\n[Question 6 — Prix d'une série déjà triée]\noui",
    "takeaway": "1) n(n − 1)/2 = 4 × 3 / 2 = 6 comparaisons au total : la somme 3 + 2 + 1.\n2) Au passage i = 0, j parcourt range(3) : 3 comparaisons (couples (42, 17), (42, 58), (58, 23)).\n3) Au passage i = 1, j parcourt range(2) : 2 comparaisons — la dernière place est déjà définitive.\n4) À chaque passage, la plus grande valeur restante bulle jusqu'à sa place définitive : après le premier passage, 58 se retrouve en fin de tableau (série 17, 42, 23, 58).\n5) Série triée finale : 17 23 42 58. Déroulé : passage 1 → 17, 42, 23, 58 ; passage 2 → 17, 23, 42, 58 ; passage 3 → rien à échanger.\n6) Oui : le tri à bulles simple paie le même prix sur une série déjà triée — chaque test coûte, échange ou non. C'est sa faiblesse, et c'est ce que le compteur rend visible.\nContrôle : 3 + 2 + 1 = 6 comparaisons, et le tableau final est bien croissant."
  },
  {
    "id": "rb-c4-e2",
    "chapter": 4,
    "level": "n3",
    "language": "analyse",
    "title": "Le registre d'entretien des robots du club",
    "exampleTitle": "Exemple résolu — le registre réduit à trois robots",
    "goal": "Extraire minimum et maximum par clé d'un registre d'enregistrements et calculer une moyenne entière.",
    "brief": "<p><strong>Énoncé.</strong> Le club tient le registre d'entretien de sa flotte. Chaque robot y est un enregistrement à deux champs, nom et heures de service :</p><table><tr><th>Robot</th><td>Alpha</td><td>Bravo</td><td>Charlie</td><td>Delta</td></tr><tr><th>Heures de service</th><td>120</td><td>85</td><td>140</td><td>95</td></tr></table><p>Le programme du club repère la machine à réviser en priorité et établit le bilan :</p><pre><code>registre = [\n    {\"nom\": \"Alpha\", \"heures\": 120},\n    {\"nom\": \"Bravo\", \"heures\": 85},\n    {\"nom\": \"Charlie\", \"heures\": 140},\n    {\"nom\": \"Delta\", \"heures\": 95},\n]\njeune = min(registre, key=lambda r: r[\"heures\"])</code></pre><ol><li>Quel est le nom du robot le moins utilisé (celui que renvoie min avec la clé heures) ?</li><li>Combien d'heures affiche le robot le plus sollicité ?</li><li>Quelle est la somme des heures des quatre robots ?</li><li>Quelle est la moyenne entière des heures (somme // 4) ?</li><li>La ligne « Alpha 120 » arrive comme une seule chaîne : après découpage aux espaces, le morceau « 120 » est-il un texte ou un nombre ?</li></ol><p>Répondez aux questions 1 à 4 par des nombres ou un nom, et à la question 5 par deux mots.</p>",
    "starter": "# Exercice — Le registre d'entretien des robots du club\n# Lisez l'énoncé complet ci-dessus, puis répondez à chaque question dans son bloc.\n\n[Question 1 — Nom du robot le moins utilisé]\nA_COMPLETER\n\n[Question 2 — Heures du robot le plus sollicité]\nA_COMPLETER\n\n[Question 3 — Somme des heures]\nA_COMPLETER\n\n[Question 4 — Moyenne entière des heures]\nA_COMPLETER\n\n[Question 5 — Nature du morceau « 120 »]\nA_COMPLETER\n",
    "hints": [
      "min et max avec le paramètre key= comparent les éléments sur le champ choisi, mais renvoient l'élément entier : le nom se lit dans le champ nom du résultat.",
      "La moyenne entière s'obtient par la division entière : somme // effectif, jamais par une division décimale.",
      "La découpe d'une ligne aux espaces produit des morceaux de texte : c'est la conversion int() qui rend un champ calculable — sans elle, la moyenne planterait."
    ],
    "examples": [
      {
        "stdin": "Registre réduit à trois robots : Toto 40 h, Zulu 15 h, Yan 62 h.\n\n1) Le moins utilisé est Zulu (15 h).\n2) Le plus sollicité affiche 62 h.\n3) Somme : 40 + 15 + 62 = 117 h.\n4) Moyenne entière : 117 // 3 = 39 h.",
        "expected": "Zulu — 62 h — somme 117 — moyenne 39",
        "note": "min avec key= renvoie l'enregistrement entier : le nom se lit dans le champ nom, pas dans le calcul."
      }
    ],
    "tests": [
      {
        "label": "Question 1 — Nom du robot le moins utilisé",
        "stdin": "q:1",
        "expected": "Bravo"
      },
      {
        "label": "Question 2 — Heures du robot le plus sollicité",
        "stdin": "q:2",
        "expected": "140||140 h||140 heures"
      },
      {
        "label": "Question 3 — Somme des heures",
        "stdin": "q:3",
        "expected": "440"
      },
      {
        "label": "Question 4 — Moyenne entière des heures",
        "stdin": "q:4",
        "expected": "110"
      },
      {
        "label": "Question 5 — Nature du morceau « 120 »",
        "stdin": "q:5",
        "expected": "un texte||du texte||texte||une chaîne de caractères||une chaine"
      }
    ],
    "solution": "[Question 1 — Nom du robot le moins utilisé]\nBravo\n\n[Question 2 — Heures du robot le plus sollicité]\n140\n\n[Question 3 — Somme des heures]\n440\n\n[Question 4 — Moyenne entière des heures]\n110\n\n[Question 5 — Nature du morceau « 120 »]\nun texte",
    "takeaway": "1) min(registre, key=heures) compare les enregistrements sur leur champ heures : le plus petit est 85 h, et min renvoie l'élément entier — le robot Bravo.\n2) Le maximum des heures est 140 : le robot le plus sollicité est Charlie, avec 140 heures.\n3) Somme : 120 + 85 + 140 + 95 = 440 heures.\n4) Moyenne entière : 440 // 4 = 110 heures (la division entière tombe juste ici : 4 × 110 = 440).\n5) Le morceau « 120 » issu de la découpe est un texte : la découpe produit des chaînes, et c'est int() qui rend l'heure calculable. Sans conversion, la moyenne planterait à la première addition.\nContrôle : 85 + 95 + 120 + 140 = 440, et la moyenne entière 110 redonne bien 4 × 110 = 440."
  },
  {
    "id": "rb-c4-e3",
    "chapter": 4,
    "level": "n3",
    "language": "analyse",
    "title": "La recherche dichotomique de la référence 47",
    "exampleTitle": "Exemple résolu — un rayon de 8 références",
    "goal": "Dérouler une recherche dichotomique : indices testés, nombre d'étapes, convention −1 pour « introuvable ».",
    "brief": "<p><strong>Énoncé.</strong> Le robot d'inventaire cherche la référence <strong>47</strong> dans un rayon trié de 12 références, rangées aux indices 0 à 11 :</p><table><tr><th>Indice</th><td>0</td><td>1</td><td>2</td><td>3</td><td>4</td><td>5</td><td>6</td><td>7</td><td>8</td><td>9</td><td>10</td><td>11</td></tr><tr><th>Référence</th><td>8</td><td>12</td><td>15</td><td>19</td><td>24</td><td>27</td><td>33</td><td>38</td><td>41</td><td>47</td><td>52</td><td>60</td></tr></table><p>La recherche dichotomique du cours :</p><pre><code>bas, haut = 0, 11\nwhile bas &lt;= haut:\n    milieu = (bas + haut) // 2\n    if serie[milieu] == v:\n        trouve\n    elif serie[milieu] &lt; v:\n        bas = milieu + 1\n    else:\n        haut = milieu - 1</code></pre><ol><li>Quel indice la recherche teste-t-elle en premier ?</li><li>Quel indice teste-t-elle en deuxième ?</li><li>Combien de comparaisons au total pour trouver la référence 47 ?</li><li>Que renvoie l'algorithme quand la valeur cherchée est absente du tableau ?</li><li>Pour n = 1000 références triées, environ combien de comparaisons suffisent à la dichotomie ?</li><li>La dichotomie exige que le tableau soit… (un seul mot) ?</li></ol><p>Répondez par des nombres, sauf la question 6 (un seul mot).</p>",
    "starter": "# Exercice — La recherche dichotomique de la référence 47\n# Lisez l'énoncé complet ci-dessus, puis répondez à chaque question dans son bloc.\n\n[Question 1 — Premier indice testé]\nA_COMPLETER\n\n[Question 2 — Deuxième indice testé]\nA_COMPLETER\n\n[Question 3 — Comparaisons pour trouver 47]\nA_COMPLETER\n\n[Question 4 — Valeur renvoyée si absent]\nA_COMPLETER\n\n[Question 5 — Comparaisons pour n = 1000]\nA_COMPLETER\n\n[Question 6 — Condition sur le tableau (un mot)]\nA_COMPLETER\n",
    "hints": [
      "Le milieu se calcule (bas + haut) // 2 ; on compare la référence du milieu à celle cherchée : trop petite, bas monte ; trop grande, haut descend.",
      "Suivez les bornes étape par étape : chaque comparaison élimine la moitié des candidats restants, et les bornes se resserrent.",
      "Quand les bornes se croisent, la valeur n'est pas là : la convention du cours est de renvoyer −1, hors de l'intervalle des indices valides."
    ],
    "examples": [
      {
        "stdin": "Rayon trié de 8 références (indices 0 à 7) : 5 — 9 — 14 — 20 — 26 — 33 — 40 — 48. On cherche 26.\n\n1) milieu = (0 + 7) // 2 = 3 : 20 &lt; 26, donc bas = 4.\n2) milieu = (4 + 7) // 2 = 5 : 33 &gt; 26, donc haut = 4.\n3) milieu = 4 : 26 est trouvé, en 3 comparaisons.",
        "expected": "milieux 3, 5 puis 4 — trouvé en 3 comparaisons",
        "note": "Une comparaison, une moitié éliminée : c'est ce qui divise le travail par deux à chaque étape."
      }
    ],
    "tests": [
      {
        "label": "Question 1 — Premier indice testé",
        "stdin": "q:1",
        "expected": "5"
      },
      {
        "label": "Question 2 — Deuxième indice testé",
        "stdin": "q:2",
        "expected": "8"
      },
      {
        "label": "Question 3 — Comparaisons pour trouver 47",
        "stdin": "q:3",
        "expected": "4"
      },
      {
        "label": "Question 4 — Valeur renvoyée si absent",
        "stdin": "q:4",
        "expected": "-1||moins 1||moins un"
      },
      {
        "label": "Question 5 — Comparaisons pour n = 1000",
        "stdin": "q:5",
        "expected": "10||dix||une dizaine"
      },
      {
        "label": "Question 6 — Condition sur le tableau (un mot)",
        "stdin": "q:6",
        "expected": "trié||trie"
      }
    ],
    "solution": "[Question 1 — Premier indice testé]\n5\n\n[Question 2 — Deuxième indice testé]\n8\n\n[Question 3 — Comparaisons pour trouver 47]\n4\n\n[Question 4 — Valeur renvoyée si absent]\n-1\n\n[Question 5 — Comparaisons pour n = 1000]\n10\n\n[Question 6 — Condition sur le tableau (un mot)]\ntrié",
    "takeaway": "1) Premier milieu : (0 + 11) // 2 = 5. La référence à l'indice 5 est 27.\n2) 27 &lt; 47 : bas monte à 6. Deuxième milieu : (6 + 11) // 2 = 8 (référence 41).\n3) Puis 41 &lt; 47 : bas = 9 ; milieu (9 + 11) // 2 = 10 (52 &gt; 47 : haut = 9) ; milieu 9 : 47 trouvé. Total : 4 comparaisons (indices 5, 8, 10, 9).\n4) Quand bas dépasse haut, la valeur est absente : l'algorithme renvoie −1, la convention du « introuvable » — −1 est hors des indices valides 0 à n − 1, donc sans ambiguïté.\n5) Chaque comparaison élimine la moitié des candidats : pour n = 1000, la dichotomie conclut en une dizaine de comparaisons (2 puissance 10 dépasse 1000), là où un parcours linéaire en demanderait jusqu'à mille.\n6) La dichotomie exige un tableau trié : comparer au milieu n'élimine une moitié que si l'ordre est garanti.\nContrôle : les indices testés 5, 8, 10, 9 sont tous dans [0 ; 11], et la série est bien croissante d'un bout à l'autre."
  },
  {
    "id": "rb-c5-e1",
    "chapter": 5,
    "level": "n1",
    "language": "analyse",
    "title": "Le départ sécurisé du suiveur de ligne",
    "exampleTitle": "Exemple résolu — le contrôle a = 0, b = 1",
    "goal": "Évaluer les cinq portes logiques sur des couples de bits et suivre la sortie d'une porte dans un chronogramme.",
    "brief": "<p><strong>Énoncé.</strong> Avant de lancer le robot suiveur de ligne sur la piste, le club vérifie son circuit de départ : deux capteurs renvoient chacun un bit, a à gauche et b à droite, et des portes logiques combinent ces bits pour autoriser ou non le départ. La table de vérité du cours :</p><table><tr><th>a</th><th>b</th><th>AND</th><th>OR</th><th>NAND</th><th>NOR</th><th>XOR</th></tr><tr><td>0</td><td>0</td><td>0</td><td>0</td><td>1</td><td>1</td><td>0</td></tr><tr><td>0</td><td>1</td><td>0</td><td>1</td><td>1</td><td>0</td><td>1</td></tr><tr><td>1</td><td>0</td><td>0</td><td>1</td><td>1</td><td>0</td><td>1</td></tr><tr><td>1</td><td>1</td><td>1</td><td>1</td><td>0</td><td>0</td><td>0</td></tr></table><p>Le robot échantillonne aussi ses capteurs à quatre instants successifs :</p><table><tr><th>Instant</th><td>t1</td><td>t2</td><td>t3</td><td>t4</td></tr><tr><th>Bit a</th><td>1</td><td>1</td><td>0</td><td>1</td></tr><tr><th>Bit b</th><td>1</td><td>0</td><td>1</td><td>1</td></tr></table><ol><li>Pour a = 1 et b = 1 : que vaut a AND b ?</li><li>Pour a = 1 et b = 0 : que vaut a OR b ?</li><li>Pour a = 1 et b = 1 : que vaut a NAND b ?</li><li>Pour a = 0 et b = 0 : que vaut a NOR b ?</li><li>Pour a = 1 et b = 0 : que vaut a XOR b ?</li><li>Donnez la sortie de a AND b aux quatre instants du chronogramme, dans l'ordre t1 à t4 (quatre valeurs 0 ou 1 séparées par des espaces).</li></ol><p>Répondez par des 0 ou des 1.</p>",
    "starter": "# Exercice — Le départ sécurisé du suiveur de ligne\n# Lisez l'énoncé complet ci-dessus, puis répondez à chaque question dans son bloc.\n# Question 6 : quatre valeurs 0 ou 1 séparées par des espaces, dans l'ordre t1 à t4.\n\n[Question 1 — a AND b pour (1, 1)]\nA_COMPLETER\n\n[Question 2 — a OR b pour (1, 0)]\nA_COMPLETER\n\n[Question 3 — a NAND b pour (1, 1)]\nA_COMPLETER\n\n[Question 4 — a NOR b pour (0, 0)]\nA_COMPLETER\n\n[Question 5 — a XOR b pour (1, 0)]\nA_COMPLETER\n\n[Question 6 — Chronogramme de a AND b (t1 à t4)]\nA_COMPLETER\n",
    "hints": [
      "ET (AND) vaut 1 seulement si les deux bits valent 1 ; OU (OR) vaut 1 dès qu'au moins un bit vaut 1.",
      "NAND et NOR sont les négations de AND et de OR ; XOR vaut 1 exactement quand les deux bits diffèrent.",
      "Pour le chronogramme, appliquez la porte à chaque instant indépendamment, dans l'ordre : un instant, un résultat."
    ],
    "examples": [
      {
        "stdin": "Contrôle avant départ avec a = 0 et b = 1.\n\n1) a AND b = 0 (un seul bit à 1).\n2) a OR b = 1 (au moins un bit à 1).\n3) a NAND b = 1 (négation du AND).\n4) a XOR b = 1 (les bits diffèrent).",
        "expected": "AND 0 — OR 1 — NAND 1 — XOR 1",
        "note": "XOR est l'exclusivité : un seul des deux bits à 1, pas les deux."
      }
    ],
    "tests": [
      {
        "label": "Question 1 — a AND b pour (1, 1)",
        "stdin": "q:1",
        "expected": "1"
      },
      {
        "label": "Question 2 — a OR b pour (1, 0)",
        "stdin": "q:2",
        "expected": "1"
      },
      {
        "label": "Question 3 — a NAND b pour (1, 1)",
        "stdin": "q:3",
        "expected": "0"
      },
      {
        "label": "Question 4 — a NOR b pour (0, 0)",
        "stdin": "q:4",
        "expected": "1"
      },
      {
        "label": "Question 5 — a XOR b pour (1, 0)",
        "stdin": "q:5",
        "expected": "1"
      },
      {
        "label": "Question 6 — Chronogramme de a AND b (t1 à t4)",
        "stdin": "q:6",
        "expected": "1 0 0 1"
      }
    ],
    "solution": "[Question 1 — a AND b pour (1, 1)]\n1\n\n[Question 2 — a OR b pour (1, 0)]\n1\n\n[Question 3 — a NAND b pour (1, 1)]\n0\n\n[Question 4 — a NOR b pour (0, 0)]\n1\n\n[Question 5 — a XOR b pour (1, 0)]\n1\n\n[Question 6 — Chronogramme de a AND b (t1 à t4)]\n1 0 0 1",
    "takeaway": "1) a AND b avec (1, 1) : les deux bits valent 1, le ET vaut 1.\n2) a OR b avec (1, 0) : au moins un bit vaut 1, le OU vaut 1.\n3) a NAND b avec (1, 1) : AND vaut 1, sa négation NAND vaut 0.\n4) a NOR b avec (0, 0) : OR vaut 0, sa négation NOR vaut 1.\n5) a XOR b avec (1, 0) : les bits diffèrent, le XOR vaut 1.\n6) Chronogramme : t1 (1, 1) → 1 ; t2 (1, 0) → 0 ; t3 (0, 1) → 0 ; t4 (1, 1) → 1. La sortie de a AND b est 1 0 0 1.\nContrôle : chaque ligne de la table de vérité utilisée correspond à une question — relisez la table ligne par ligne plutôt que de réciter de mémoire."
  },
  {
    "id": "rb-c5-e2",
    "chapter": 5,
    "level": "n2",
    "language": "analyse",
    "title": "Le compteur binaire du bras robotisé",
    "exampleTitle": "Exemple résolu — l'étage a = 0, b = 1, cin = 1",
    "goal": "Appliquer les formules de l'additionneur complet et convertir un mot binaire de deux bits en décimal.",
    "brief": "<p><strong>Énoncé.</strong> Le bras robotisé de l'atelier compte les pièces qui défilent sur son tapis : chaque pièce envoie un bit, et le compteur est câblé en additionneurs complets. Chaque étage reçoit trois bits (a, b et la retenue entrante cin) et rend la somme S avec la retenue sortante Cout :</p><pre><code>S    = a XOR b XOR cin\nCout = (a AND b) OR (cin AND (a XOR b))</code></pre><p>Le mot de deux bits (Cout, S) est l'écriture binaire de la somme a + b + cin.</p><ol><li>Pour a = 1, b = 1 et cin = 0 : que vaut S ?</li><li>Pour a = 1, b = 1 et cin = 0 : que vaut Cout ?</li><li>Le mot binaire 10 vaut quel nombre décimal ?</li><li>Pour a = 1, b = 1 et cin = 1 : que vaut S ?</li><li>Pour a = 1, b = 1 et cin = 1 : que vaut Cout ?</li><li>Le mot binaire 11 vaut quel nombre décimal ?</li></ol><p>Répondez par des 0, des 1 ou des nombres décimaux.</p>",
    "starter": "# Exercice — Le compteur binaire du bras robotisé\n# Lisez l'énoncé complet ci-dessus, puis répondez à chaque question dans son bloc.\n\n[Question 1 — S pour (1, 1, 0)]\nA_COMPLETER\n\n[Question 2 — Cout pour (1, 1, 0)]\nA_COMPLETER\n\n[Question 3 — Valeur décimale du mot 10]\nA_COMPLETER\n\n[Question 4 — S pour (1, 1, 1)]\nA_COMPLETER\n\n[Question 5 — Cout pour (1, 1, 1)]\nA_COMPLETER\n\n[Question 6 — Valeur décimale du mot 11]\nA_COMPLETER\n",
    "hints": [
      "Calculez d'abord x = a XOR b : x vaut 1 exactement quand a et b diffèrent.",
      "Ensuite S = x XOR cin, et Cout = (a AND b) OR (cin AND x) : le mot (Cout, S) s'écrit comme un nombre binaire de deux bits.",
      "Contrôle : le mot (Cout, S) doit valoir la somme décimale des trois bits d'entrée — vérifiez chaque étage avec cette somme."
    ],
    "examples": [
      {
        "stdin": "Étage du compteur avec a = 0, b = 1 et cin = 1.\n\n1) x = 0 XOR 1 = 1.\n2) S = 1 XOR 1 = 0.\n3) Cout = (0 AND 1) OR (1 AND 1) = 0 OR 1 = 1.\n4) Le mot (Cout, S) = 10 vaut 2 en décimal : 0 + 1 + 1 = 2.",
        "expected": "x = 1 — S = 0 et Cout = 1 — le mot 10 vaut 2",
        "note": "L'additionneur rend en deux bits ce que la somme des trois bits écrit en binaire."
      }
    ],
    "tests": [
      {
        "label": "Question 1 — S pour (1, 1, 0)",
        "stdin": "q:1",
        "expected": "0"
      },
      {
        "label": "Question 2 — Cout pour (1, 1, 0)",
        "stdin": "q:2",
        "expected": "1"
      },
      {
        "label": "Question 3 — Valeur décimale du mot 10",
        "stdin": "q:3",
        "expected": "2"
      },
      {
        "label": "Question 4 — S pour (1, 1, 1)",
        "stdin": "q:4",
        "expected": "1"
      },
      {
        "label": "Question 5 — Cout pour (1, 1, 1)",
        "stdin": "q:5",
        "expected": "1"
      },
      {
        "label": "Question 6 — Valeur décimale du mot 11",
        "stdin": "q:6",
        "expected": "3"
      }
    ],
    "solution": "[Question 1 — S pour (1, 1, 0)]\n0\n\n[Question 2 — Cout pour (1, 1, 0)]\n1\n\n[Question 3 — Valeur décimale du mot 10]\n2\n\n[Question 4 — S pour (1, 1, 1)]\n1\n\n[Question 5 — Cout pour (1, 1, 1)]\n1\n\n[Question 6 — Valeur décimale du mot 11]\n3",
    "takeaway": "1) a = 1, b = 1, cin = 0 : x = 1 XOR 1 = 0, puis S = 0 XOR 0 = 0.\n2) Cout = (1 AND 1) OR (0 AND 0) = 1 OR 0 = 1.\n3) Le mot binaire 10 se lit « une fois deux, zéro fois un » : il vaut 2 en décimal — cohérent avec 1 + 1 + 0 = 2.\n4) a = 1, b = 1, cin = 1 : x = 0, puis S = 0 XOR 1 = 1.\n5) Cout = (1 AND 1) OR (1 AND 0) = 1 OR 0 = 1.\n6) Le mot binaire 11 vaut 2 + 1 = 3 en décimal — cohérent avec 1 + 1 + 1 = 3.\nContrôle : chaque étage rend bien en binaire la somme de ses trois bits : 10 = 2 et 11 = 3 ; la retenue sortante alimente l'étage supérieur du compteur."
  },
  {
    "id": "rb-c5-e3",
    "chapter": 5,
    "level": "n3",
    "language": "analyse",
    "title": "Le journal de bord chiffré du club",
    "exampleTitle": "Exemple résolu — le mot de passe « led »",
    "goal": "Décaler des lettres avec le chiffre de César : retour circulaire modulo 26, casse conservée, caractères non alphabétiques intacts.",
    "brief": "<p><strong>Énoncé.</strong> Pour que personne ne lise le journal de bord de ses robots, le club le chiffre avec le chiffre de César : chaque lettre est décalée de k positions dans l'alphabet, avec retour circulaire (après z, on revient à a). La transformation du cours :</p><pre><code>position = rang de la lettre (a = 0, …, z = 25)\ndecalee  = (position + k) MOD 26</code></pre><p>La clé du jour est <strong>k = 3</strong>. Majuscules et minuscules utilisent chacune leur base : la casse est conservée, et les caractères non alphabétiques ne bougent pas.</p><ol><li>Quelle lettre obtient-on en décalant « a » de 3 positions ?</li><li>Quelle lettre obtient-on en décalant « z » de 1 position ?</li><li>Quelle lettre obtient-on en décalant « A » (majuscule) de 2 positions ?</li><li>Chiffrez le mot « robot » avec la clé k = 3 (un seul mot).</li><li>Le message « zone 4 » est chiffré : le chiffre 4 est-il décalé lui aussi (oui ou non) ?</li><li>Décaler de 25 positions revient à reculer de combien de positions ?</li></ol><p>Répondez par des lettres, un mot, oui ou non, ou un nombre.</p>",
    "starter": "# Exercice — Le journal de bord chiffré du club\n# Lisez l'énoncé complet ci-dessus, puis répondez à chaque question dans son bloc.\n\n[Question 1 — « a » décalé de 3]\nA_COMPLETER\n\n[Question 2 — « z » décalé de 1]\nA_COMPLETER\n\n[Question 3 — « A » majuscule décalé de 2]\nA_COMPLETER\n\n[Question 4 — Le mot « robot » avec k = 3]\nA_COMPLETER\n\n[Question 5 — Le chiffre 4 est-il décalé]\nA_COMPLETER\n\n[Question 6 — Reculer de combien pour k = 25]\nA_COMPLETER\n",
    "hints": [
      "Le rang de a est 0 : décaler de k, c'est calculer (rang + k) MOD 26 puis reconvertir en lettre avec la base de la casse concernée.",
      "Le rebond : pour z (rang 25) et k = 1, (25 + 1) MOD 26 = 0, donc a ; la majuscule reste majuscule car sa base est celle des majuscules.",
      "Seules les lettres bougent : chiffres, espaces et ponctuation traversent le chiffrement inchangés ; et un décalage de 25 dans un sens égale un décalage de 1 dans l'autre."
    ],
    "examples": [
      {
        "stdin": "Mot de passe « led », clé k = 4.\n\n1) l (rang 11) : (11 + 4) MOD 26 = 15 → p.\n2) e (rang 4) : (4 + 4) MOD 26 = 8 → i.\n3) d (rang 3) : (3 + 4) MOD 26 = 7 → h.\nLe mot chiffré est pih.",
        "expected": "led devient pih",
        "note": "La clé décale chaque lettre séparément ; le modulo 26 gère le retour circulaire sans cas spécial."
      }
    ],
    "tests": [
      {
        "label": "Question 1 — « a » décalé de 3",
        "stdin": "q:1",
        "expected": "d"
      },
      {
        "label": "Question 2 — « z » décalé de 1",
        "stdin": "q:2",
        "expected": "a"
      },
      {
        "label": "Question 3 — « A » majuscule décalé de 2",
        "stdin": "q:3",
        "expected": "C||c||lettre C||lettre c"
      },
      {
        "label": "Question 4 — Le mot « robot » avec k = 3",
        "stdin": "q:4",
        "expected": "urerw"
      },
      {
        "label": "Question 5 — Le chiffre 4 est-il décalé",
        "stdin": "q:5",
        "expected": "non"
      },
      {
        "label": "Question 6 — Reculer de combien pour k = 25",
        "stdin": "q:6",
        "expected": "1"
      }
    ],
    "solution": "[Question 1 — « a » décalé de 3]\nd\n\n[Question 2 — « z » décalé de 1]\na\n\n[Question 3 — « A » majuscule décalé de 2]\nC\n\n[Question 4 — Le mot « robot » avec k = 3]\nurerw\n\n[Question 5 — Le chiffre 4 est-il décalé]\nnon\n\n[Question 6 — Reculer de combien pour k = 25]\n1",
    "takeaway": "1) « a » a pour rang 0 : (0 + 3) MOD 26 = 3, qui est le rang de d.\n2) « z » a pour rang 25 : (25 + 1) MOD 26 = 0, le rang de a — c'est le rebond circulaire.\n3) « A » majuscule utilise la base des majuscules : rang 0 + 2 = 2, soit C — la casse est conservée.\n4) « robot » : r → u (17 + 3 = 20), o → r (14 + 3 = 17), b → e (1 + 3 = 4), o → r, t → w (19 + 3 = 22). Dans l'ordre des lettres du mot : u, r, e, r, w — le mot chiffré est « urerw ».\n5) Non : le 4 n'est pas une lettre, il traverse le chiffrement inchangé — seul « zone » devient « crqh ».\n6) k = 25 : décaler de 25 dans un sens revient à reculer de 1 (26 − 25 = 1) — A donnerait Z.\nContrôle : le modulo 26 enroule l'alphabet dans les deux sens sans aucun cas spécial."
  },
  {
    "id": "rb-c6-e1",
    "chapter": 6,
    "level": "n2",
    "language": "analyse",
    "title": "L'afficheur de zone du robot d'inventaire",
    "exampleTitle": "Exemple résolu — l'afficheur réduit à trois chiffres",
    "goal": "Lire une table de correspondance chiffre-segments d'un afficheur 7 segments et comparer des configurations.",
    "brief": "<p><strong>Énoncé.</strong> Le robot d'inventaire affiche le numéro de la zone en cours sur un afficheur 7 segments. Les sept segments sont nommés de <code>a</code> à <code>g</code> ; la correspondance de chaque chiffre est posée une fois pour toutes dans la table du programme :</p><table><tr><th>Chiffre</th><td>0</td><td>1</td><td>2</td><td>3</td><td>4</td><td>5</td><td>6</td><td>7</td><td>8</td><td>9</td></tr><tr><th>Segments allumés</th><td>a b c d e f</td><td>b c</td><td>a b d e g</td><td>a b c d g</td><td>b c f g</td><td>a c d f g</td><td>a c d e f g</td><td>a b c</td><td>a b c d e f g</td><td>a b c d f g</td></tr></table><ol><li>Combien de segments s'allument pour afficher le chiffre 8 ?</li><li>Combien de segments s'allument pour afficher le chiffre 1 ?</li><li>Pour combien de chiffres de la table le segment g reste-t-il éteint ?</li><li>L'afficheur reçoit la commande « b c f g » : quel chiffre s'affiche ?</li><li>Combien de segments le chiffre 4 et le chiffre 1 ont-ils en commun ?</li><li>Pour passer de l'affichage de 8 à celui de 0, combien de segments s'éteignent ?</li></ol><p>Répondez par des nombres ou un chiffre.</p>",
    "starter": "# Exercice — L'afficheur de zone du robot d'inventaire\n# Lisez l'énoncé complet ci-dessus, puis répondez à chaque question dans son bloc.\n\n[Question 1 — Segments du chiffre 8]\nA_COMPLETER\n\n[Question 2 — Segments du chiffre 1]\nA_COMPLETER\n\n[Question 3 — Chiffres où g reste éteint]\nA_COMPLETER\n\n[Question 4 — Chiffre affiché pour « b c f g »]\nA_COMPLETER\n\n[Question 5 — Segments communs à 4 et 1]\nA_COMPLETER\n\n[Question 6 — Segments éteints de 8 à 0]\nA_COMPLETER\n",
    "hints": [
      "La table de correspondance est une donnée : lisez-la ligne par ligne plutôt que de recalculer.",
      "Pour les segments communs à deux chiffres, listez les segments de chacun et repérez ceux présents dans les deux listes.",
      "Comparez les configurations des deux chiffres concernés : le passage d'un affichage à l'autre éteint les segments présents dans le premier et absents du second."
    ],
    "examples": [
      {
        "stdin": "Un afficheur réduit ne connaît que les chiffres 0, 7 et 9.\n\n1) La commande « a b c » affiche le chiffre 7.\n2) Le chiffre 9 allume 6 segments (a b c d f g).\n3) Le chiffre 0 allume tout sauf g, donc 6 segments.",
        "expected": "« a b c » : 7 — le 9 allume 6 segments — le 0 aussi",
        "note": "Le dictionnaire est un câblage : chaque ligne de la table branche les segments d'un chiffre."
      }
    ],
    "tests": [
      {
        "label": "Question 1 — Segments du chiffre 8",
        "stdin": "q:1",
        "expected": "7"
      },
      {
        "label": "Question 2 — Segments du chiffre 1",
        "stdin": "q:2",
        "expected": "2"
      },
      {
        "label": "Question 3 — Chiffres où g reste éteint",
        "stdin": "q:3",
        "expected": "3"
      },
      {
        "label": "Question 4 — Chiffre affiché pour « b c f g »",
        "stdin": "q:4",
        "expected": "4"
      },
      {
        "label": "Question 5 — Segments communs à 4 et 1",
        "stdin": "q:5",
        "expected": "2"
      },
      {
        "label": "Question 6 — Segments éteints de 8 à 0",
        "stdin": "q:6",
        "expected": "1"
      }
    ],
    "solution": "[Question 1 — Segments du chiffre 8]\n7\n\n[Question 2 — Segments du chiffre 1]\n2\n\n[Question 3 — Chiffres où g reste éteint]\n3\n\n[Question 4 — Chiffre affiché pour « b c f g »]\n4\n\n[Question 5 — Segments communs à 4 et 1]\n2\n\n[Question 6 — Segments éteints de 8 à 0]\n1",
    "takeaway": "1) Le chiffre 8 allume les sept segments a b c d e f g : 7 segments.\n2) Le chiffre 1 n'allume que b et c : 2 segments.\n3) Le segment g est absent des configurations de 0 (a b c d e f), de 1 (b c) et de 7 (a b c) : il reste éteint pour 3 chiffres.\n4) La commande « b c f g » correspond exactement à la ligne du chiffre 4 : c'est un 4 qui s'affiche.\n5) Le chiffre 4 allume b c f g et le chiffre 1 allume b c : les deux ont b et c en commun, soit 2 segments.\n6) Le 8 allume 7 segments, le 0 en allume 6 (tout sauf g) : un seul segment, le g, s'éteint pour passer de 8 à 0.\nContrôle : la table se vérifie colonne par colonne — chaque chiffre affichable a sa ligne, et aucune configuration n'est vide."
  },
  {
    "id": "rb-c6-e2",
    "chapter": 6,
    "level": "n3",
    "language": "analyse",
    "title": "La station météo du club",
    "exampleTitle": "Exemple résolu — les relevés d'essai de la sonde",
    "goal": "Classer des relevés de température par seuils stricts en trois états et compter chaque catégorie.",
    "brief": "<p><strong>Énoncé.</strong> La station météo du club, montée autour d'une carte, classe chaque relevé de température en trois états : ALERTE CHALEUR au-dessus de 30 degrés, ALERTE FROID en dessous de 15 degrés, normale entre les deux. Les seuils sont <strong>stricts</strong> :</p><pre><code>if t &gt; 30:\n    etat = \"ALERTE CHALEUR\"\nelif t &lt; 15:\n    etat = \"ALERTE FROID\"\nelse:\n    etat = \"normale\"</code></pre><p>Relevés de la journée (en degrés Celsius) :</p><table><tr><th>Relevé</th><td>1</td><td>2</td><td>3</td><td>4</td><td>5</td><td>6</td><td>7</td><td>8</td></tr><tr><th>Température</th><td>31</td><td>30</td><td>22</td><td>14</td><td>15</td><td>28</td><td>33</td><td>19</td></tr></table><ol><li>Quel est l'état du relevé t = 31 ?</li><li>Quel est l'état du relevé t = 15 ?</li><li>Combien de relevés passent en ALERTE CHALEUR ?</li><li>Combien de relevés passent en ALERTE FROID ?</li><li>Combien de relevés restent normaux ?</li><li>Quel format de f-string affiche 30.0 sans zéros inutiles (écrivez :g, :.2f ou :&lt;12) ?</li></ol><p>Répondez aux questions 1 et 2 par le nom exact de l'état, et aux autres par des nombres ou le format demandé.</p>",
    "starter": "# Exercice — La station météo du club\n# Lisez l'énoncé complet ci-dessus, puis répondez à chaque question dans son bloc.\n\n[Question 1 — État du relevé t = 31]\nA_COMPLETER\n\n[Question 2 — État du relevé t = 15]\nA_COMPLETER\n\n[Question 3 — Relevés en ALERTE CHALEUR]\nA_COMPLETER\n\n[Question 4 — Relevés en ALERTE FROID]\nA_COMPLETER\n\n[Question 5 — Relevés normaux]\nA_COMPLETER\n\n[Question 6 — Format sans zéros inutiles]\nA_COMPLETER\n",
    "hints": [
      "Les seuils sont stricts : 30 exactement et 15 exactement restent dans la zone normale.",
      "Classez chaque relevé l'un après l'autre : dans la chaîne if / elif / else, le premier test vrai gagne et un seul état s'applique par relevé.",
      "Contrôle final : la somme des trois catégories doit redonner l'effectif de la journée ; pour l'affichage, rappelez-vous quel format nettoie les zéros de fin."
    ],
    "examples": [
      {
        "stdin": "Relevés d'essai de la sonde : 34 — 29 — 12 — 16 — 26.\n\n1) 34 dépasse 30 : ALERTE CHALEUR.\n2) 12 passe sous 15 : ALERTE FROID.\n3) 29, 16 et 26 restent normaux.\n4) Bilan : 1 chaleur, 1 froid, 3 normales — total 5.",
        "expected": "1 chaleur — 1 froid — 3 normales — total 5",
        "note": "La frontière appartient au « sinon » : les valeurs exactement aux seuils ne déclenchent rien."
      }
    ],
    "tests": [
      {
        "label": "Question 1 — État du relevé t = 31",
        "stdin": "q:1",
        "expected": "ALERTE CHALEUR||alerte chaleur"
      },
      {
        "label": "Question 2 — État du relevé t = 15",
        "stdin": "q:2",
        "expected": "normale"
      },
      {
        "label": "Question 3 — Relevés en ALERTE CHALEUR",
        "stdin": "q:3",
        "expected": "2"
      },
      {
        "label": "Question 4 — Relevés en ALERTE FROID",
        "stdin": "q:4",
        "expected": "1"
      },
      {
        "label": "Question 5 — Relevés normaux",
        "stdin": "q:5",
        "expected": "5"
      },
      {
        "label": "Question 6 — Format sans zéros inutiles",
        "stdin": "q:6",
        "expected": ":g||g"
      }
    ],
    "solution": "[Question 1 — État du relevé t = 31]\nALERTE CHALEUR\n\n[Question 2 — État du relevé t = 15]\nnormale\n\n[Question 3 — Relevés en ALERTE CHALEUR]\n2\n\n[Question 4 — Relevés en ALERTE FROID]\n1\n\n[Question 5 — Relevés normaux]\n5\n\n[Question 6 — Format sans zéros inutiles]\n:g",
    "takeaway": "1) t = 31 est strictement supérieur à 30 : ALERTE CHALEUR.\n2) t = 15 n'est pas inférieur strictement à 15 : le relevé reste normale — la frontière appartient au « sinon ».\n3) Relevés strictement au-dessus de 30 : 31 et 33, soit 2 alertes chaleur.\n4) Relevés strictement en dessous de 15 : 14 seulement, soit 1 alerte froid.\n5) Relevés normaux : 30, 22, 15, 28 et 19, soit 5 relevés.\n6) Le format :g supprime les zéros inutiles : 30.0 s'affiche « 30 » (tandis que :.2f donnerait 30.00).\nContrôle : 2 + 1 + 5 = 8, l'effectif exact de la journée — chaque relevé est classé une seule fois."
  },
  {
    "id": "rb-c6-e3",
    "chapter": 6,
    "level": "n3",
    "language": "analyse",
    "title": "Le régulateur de distance de l'aspirateur",
    "exampleTitle": "Exemple résolu — une tournée de 3 relevés",
    "goal": "Agréger une série de relevés de capteur : minimum, moyenne entière, comptage par seuil et décision d'un capteur analogique.",
    "brief": "<p><strong>Énoncé.</strong> En fin de tournée, le régulateur du robot aspirateur résume ses six relevés de distance (en cm), relevés dans cet ordre : <code>45 — 18 — 32 — 27 — 18 — 50</code>. Le robot freine dès qu'un relevé passe <strong>strictement</strong> sous 20 cm. Sur la même carte, le capteur de poussière déclenche le mode turbo quand sa lecture dépasse strictement 700 ; ce matin, il lit <strong>720</strong>. Le bilan du régulateur :</p><pre><code>minimum = min(distances)\nmoyenne = sum(distances) // n</code></pre><ol><li>Quel est le plus petit relevé de la série ?</li><li>Combien de fois ce minimum apparaît-il dans la série ?</li><li>Quelle est la somme des six relevés ?</li><li>Quelle est la moyenne entière (somme // 6) ?</li><li>Combien de relevés déclenchent le freinage (d &lt; 20) ?</li><li>Le capteur de poussière lit 720, le seuil est 700 : le mode turbo se déclenche-t-il (oui ou non) ?</li></ol><p>Répondez par des nombres, sauf la question 6.</p>",
    "starter": "# Exercice — Le régulateur de distance de l'aspirateur\n# Lisez l'énoncé complet ci-dessus, puis répondez à chaque question dans son bloc.\n\n[Question 1 — Plus petit relevé de la série]\nA_COMPLETER\n\n[Question 2 — Apparitions du minimum]\nA_COMPLETER\n\n[Question 3 — Somme des six relevés]\nA_COMPLETER\n\n[Question 4 — Moyenne entière]\nA_COMPLETER\n\n[Question 5 — Relevés qui déclenchent le freinage]\nA_COMPLETER\n\n[Question 6 — Mode turbo du capteur de poussière]\nA_COMPLETER\n",
    "hints": [
      "Le minimum se lit en parcourant la série ; la moyenne entière s'obtient par somme // effectif, jamais par une division décimale.",
      "Pour le freinage, seul compte le test d inférieur strict à 20 : classez chaque relevé en « strictement sous 20 » ou « 20 et plus ».",
      "Contrôles : la moyenne entière vérifie 6 × moyenne ≤ somme ; et le turbo se déclenche dès que la lecture dépasse strictement le seuil."
    ],
    "examples": [
      {
        "stdin": "Une tournée de 3 relevés : 40 — 12 — 25 (seuil de freinage 15 cm).\n\n1) Minimum : 12.\n2) Somme : 40 + 12 + 25 = 77 ; moyenne entière : 77 // 3 = 25.\n3) Freinage : seul 12 est strictement sous 15, soit 1 relevé.",
        "expected": "min 12 — moyenne 25 — 1 freinage",
        "note": "La division entière tronque : 77 / 3 vaut 25,66 mais 77 // 3 vaut 25."
      }
    ],
    "tests": [
      {
        "label": "Question 1 — Plus petit relevé de la série",
        "stdin": "q:1",
        "expected": "18||18 cm"
      },
      {
        "label": "Question 2 — Apparitions du minimum",
        "stdin": "q:2",
        "expected": "2"
      },
      {
        "label": "Question 3 — Somme des six relevés",
        "stdin": "q:3",
        "expected": "190"
      },
      {
        "label": "Question 4 — Moyenne entière",
        "stdin": "q:4",
        "expected": "31"
      },
      {
        "label": "Question 5 — Relevés qui déclenchent le freinage",
        "stdin": "q:5",
        "expected": "2"
      },
      {
        "label": "Question 6 — Mode turbo du capteur de poussière",
        "stdin": "q:6",
        "expected": "oui"
      }
    ],
    "solution": "[Question 1 — Plus petit relevé de la série]\n18\n\n[Question 2 — Apparitions du minimum]\n2\n\n[Question 3 — Somme des six relevés]\n190\n\n[Question 4 — Moyenne entière]\n31\n\n[Question 5 — Relevés qui déclenchent le freinage]\n2\n\n[Question 6 — Mode turbo du capteur de poussière]\noui",
    "takeaway": "1) Le plus petit des relevés 45, 18, 32, 27, 18, 50 est 18.\n2) La valeur 18 apparaît deux fois (deuxième et cinquième relevés).\n3) Somme : 45 + 18 = 63 ; 63 + 32 = 95 ; 95 + 27 = 122 ; 122 + 18 = 140 ; 140 + 50 = 190.\n4) Moyenne entière : 190 // 6 = 31 (car 6 × 31 = 186 et il reste 4 ; 190 / 6 vaudrait 31,67).\n5) Relevés strictement sous 20 : les deux relevés à 18 — soit 2 freinages (45, 32, 27 et 50 passent).\n6) 720 dépasse strictement 700 : le mode turbo se déclenche. Oui.\nContrôle : 6 × 31 = 186 ≤ 190 < 192 = 6 × 32, la moyenne entière est bien 31 ; et 2 freinages sur 6 relevés laissent 4 relevés à vitesse normale."
  }
];

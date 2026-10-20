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
    "title": "Carte d’identité du programme",
    "goal": "Afficher une séquence d’instructions exacte, ligne après ligne, sans en oublier une.",
    "brief": "<p>Analysez les données soumises pour chaque cas.</p>",
    "starter": "# Grille d'analyse (rb-c1-e1) — Carte d’identité du programme\n# Complétez la résolution demandée sous chaque cas ci-dessous :\n\n[Cas 1 — Autre membre]\n# Données : Zack\nA_COMPLETER\n\n[Cas 2 — Nom composé]\n# Données : Linus T\nA_COMPLETER\n\n[Cas 3 — Une lettre]\n# Données : A\nA_COMPLETER\n",
    "hints": [
      "Suivez la séquence logique d’instructions du robot pas à pas.",
      "Chaque commande programmée produit une action distincte dans l’ordre strict d’exécution."
    ],
    "examples": [
      {
        "stdin": "Alice",
        "expected": "Bonjour, Club Robotique !\nOperateur : Alice\nMa prochaine seance sera encore meilleure.",
        "note": "Les trois lignes, dans cet ordre exact."
      }
    ],
    "tests": [
      {
        "label": "Autre membre",
        "stdin": "cas:1",
        "expected": "Bonjour, Club Robotique !\nOperateur : Zack\nMa prochaine seance sera encore meilleure."
      },
      {
        "label": "Nom composé",
        "stdin": "cas:2",
        "expected": "Bonjour, Club Robotique !\nOperateur : Linus T\nMa prochaine seance sera encore meilleure."
      },
      {
        "label": "Une lettre",
        "stdin": "cas:3",
        "expected": "Bonjour, Club Robotique !\nOperateur : A\nMa prochaine seance sera encore meilleure."
      }
    ],
    "solution": "[Exemple]\nBonjour, Club Robotique !\nOperateur : Alice\nMa prochaine seance sera encore meilleure.\n\n[Cas 1 — Autre membre]\nBonjour, Club Robotique !\nOperateur : Zack\nMa prochaine seance sera encore meilleure.\n\n[Cas 2 — Nom composé]\nBonjour, Club Robotique !\nOperateur : Linus T\nMa prochaine seance sera encore meilleure.\n\n[Cas 3 — Une lettre]\nBonjour, Club Robotique !\nOperateur : A\nMa prochaine seance sera encore meilleure."
  },
  {
    "id": "rb-c1-e2",
    "chapter": 1,
    "level": "n1",
    "language": "analyse",
    "title": "Calculatrice de bord",
    "goal": "Lire deux entiers, calculer somme, différence, produit, quotient et reste, et traiter la division par zéro.",
    "brief": "<p>La carte reçoit deux entiers <strong>A</strong> et <strong>B</strong> sur la même ligne, séparés par un espace. Indiquez cinq lignes : la somme, la différence (A − B), le produit, le quotient entier et le reste. Si <strong>B vaut 0</strong>, remplacez les deux dernières lignes par une seule : <code>division impossible</code>.</p>",
    "starter": "# Grille d'analyse (rb-c1-e2) — Calculatrice de bord\n# Complétez la résolution demandée sous chaque cas ci-dessous :\n\n[Cas 1 — Reste non nul]\n# Données : 7 3\nA_COMPLETER\n\n[Cas 2 — Division par zéro]\n# Données : 9 0\nA_COMPLETER\n\n[Cas 3 — Valeurs négatives]\n# Données : -6 4\nA_COMPLETER\n",
    "hints": [
      "Le quotient entier s’obtient avec // et le reste avec % : ils répondent tous les deux à la division par zéro.",
      "Un seul if suffit : si b vaut 0, on affiche le message et rien d’autre."
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
    "solution": "[Exemple]\nsomme : 15\ndifference : 5\nproduit : 50\nquotient : 2\nreste : 0\n\n[Cas 1 — Reste non nul]\nsomme : 10\ndifference : 4\nproduit : 21\nquotient : 2\nreste : 1\n\n[Cas 2 — Division par zéro]\nsomme : 9\ndifference : 9\nproduit : 0\ndivision impossible\n\n[Cas 3 — Valeurs négatives]\nsomme : -2\ndifference : -10\nproduit : -24\nquotient : -2\nreste : 2"
  },
  {
    "id": "rb-c1-e3",
    "chapter": 1,
    "level": "n2",
    "language": "analyse",
    "title": "Journal de séance",
    "goal": "Mettre en forme un rapport aligné à partir de quatre données lues séparément.",
    "brief": "<p>Analysez les données soumises pour chaque cas. Il Indiquez un cartouche de quatre lignes où chaque libellé (<code>Membre</code>, <code>Seance</code>, <code>Theme</code>, <code>Duree</code>) est complété par des espaces jusqu’à 12 caractères, suivi de <code>: valeur</code>. La durée est suivie de <code>min</code>.</p>",
    "starter": "# Grille d'analyse (rb-c1-e3) — Journal de séance\n# Complétez la résolution demandée sous chaque cas ci-dessous :\n\n[Cas 1 — Thème long]\n# Données : Zack\n# Données : 3\n# Données : Tri a bulles\n# Données : 120\nA_COMPLETER\n\n[Cas 2 — Séance double chiffre]\n# Données : Awa\n# Données : 12\n# Données : Cesar\n# Données : 60\nA_COMPLETER\n\n[Cas 3 — Thème court]\n# Données : Tom\n# Données : 1\n# Données : LED\n# Données : 45\nA_COMPLETER\n",
    "hints": [
      "Les f-strings savent aligner : f\"{\"Membre\":<12}\" complète « Membre » avec des espaces jusqu’à 12 caractères.",
      "Le numéro de séance et la durée ont été convertis en entiers : il faut les réafficher tels quels."
    ],
    "examples": [
      {
        "stdin": "Alice\n7\nCapteurs\n90",
        "expected": "Membre      : Alice\nSeance      : 7\nTheme       : Capteurs\nDuree       : 90 min",
        "note": "Chaque libellé occupe exactement 12 caractères avant les deux-points."
      }
    ],
    "tests": [
      {
        "label": "Thème long",
        "stdin": "cas:1",
        "expected": "Membre      : Zack\nSeance      : 3\nTheme       : Tri a bulles\nDuree       : 120 min"
      },
      {
        "label": "Séance double chiffre",
        "stdin": "cas:2",
        "expected": "Membre      : Awa\nSeance      : 12\nTheme       : Cesar\nDuree       : 60 min"
      },
      {
        "label": "Thème court",
        "stdin": "cas:3",
        "expected": "Membre      : Tom\nSeance      : 1\nTheme       : LED\nDuree       : 45 min"
      }
    ],
    "solution": "[Exemple]\nMembre      : Alice\nSeance      : 7\nTheme       : Capteurs\nDuree       : 90 min\n\n[Cas 1 — Thème long]\nMembre      : Zack\nSeance      : 3\nTheme       : Tri a bulles\nDuree       : 120 min\n\n[Cas 2 — Séance double chiffre]\nMembre      : Awa\nSeance      : 12\nTheme       : Cesar\nDuree       : 60 min\n\n[Cas 3 — Thème court]\nMembre      : Tom\nSeance      : 1\nTheme       : LED\nDuree       : 45 min"
  },
  {
    "id": "rb-c2-e1",
    "chapter": 2,
    "level": "n1",
    "language": "analyse",
    "title": "LED clignotante simulée",
    "goal": "Répéter une paire d’instructions k fois avec une boucle for, puis afficher l’état final.",
    "brief": "<p>La carte clignote : allumée puis éteinte, c’est <strong>un clignotement</strong>. Analysez les données soumises pour chaque cas. À la fin, Indiquez <code>Fin.</code>.</p>",
    "starter": "# Grille d'analyse (rb-c2-e1) — LED clignotante simulée\n# Complétez la résolution demandée sous chaque cas ci-dessous :\n\n[Cas 1 — Quatre clignotements]\n# Données : 4\nA_COMPLETER\n\n[Cas 2 — Six clignotements]\n# Données : 6\nA_COMPLETER\n\n[Cas 3 — Aucun clignotement]\n# Données : 0\nA_COMPLETER\n",
    "hints": [
      "range(k) produit les entiers de 0 à k − 1 : la boucle s’exécute exactement k fois.",
      "Le message final sort de la boucle : il doit être aligné au même niveau que le for, pas dedans."
    ],
    "examples": [
      {
        "stdin": "2",
        "expected": "LED ON\nLED OFF\nLED ON\nLED OFF\nFin.",
        "note": "Deux clignotements, puis la fin."
      }
    ],
    "tests": [
      {
        "label": "Quatre clignotements",
        "stdin": "cas:1",
        "expected": "LED ON\nLED OFF\nLED ON\nLED OFF\nLED ON\nLED OFF\nLED ON\nLED OFF\nFin."
      },
      {
        "label": "Six clignotements",
        "stdin": "cas:2",
        "expected": "LED ON\nLED OFF\nLED ON\nLED OFF\nLED ON\nLED OFF\nLED ON\nLED OFF\nLED ON\nLED OFF\nLED ON\nLED OFF\nFin."
      },
      {
        "label": "Aucun clignotement",
        "stdin": "cas:3",
        "expected": "Fin."
      }
    ],
    "solution": "[Exemple]\nLED ON\nLED OFF\nLED ON\nLED OFF\nFin.\n\n[Cas 1 — Quatre clignotements]\nLED ON\nLED OFF\nLED ON\nLED OFF\nLED ON\nLED OFF\nLED ON\nLED OFF\nFin.\n\n[Cas 2 — Six clignotements]\nLED ON\nLED OFF\nLED ON\nLED OFF\nLED ON\nLED OFF\nLED ON\nLED OFF\nLED ON\nLED OFF\nLED ON\nLED OFF\nFin.\n\n[Cas 3 — Aucun clignotement]\nFin."
  },
  {
    "id": "rb-c2-e2",
    "chapter": 2,
    "level": "n2",
    "language": "analyse",
    "title": "Clignotement dirigé",
    "goal": "Réagir à chaque valeur d’une série dans une boucle et tenir un compteur en parallel.",
    "brief": "<p>Analysez les données soumises pour chaque cas. Pour chaque état il Indiquez <code>LED ON</code> (si 1) ou <code>LED OFF</code> (si 0). En dernier, il Indiquez le nombre d’allumages : <code>allumee : X</code>.</p>",
    "starter": "# Grille d'analyse (rb-c2-e2) — Clignotement dirigé\n# Complétez la résolution demandée sous chaque cas ci-dessous :\n\n[Cas 1 — Aucun allumage]\n# Données : 3\n# Données : 0\n# Données : 0\n# Données : 0\nA_COMPLETER\n\n[Cas 2 — Que des allumages]\n# Données : 5\n# Données : 1\n# Données : 1\n# Données : 1\n# Données : 1\n# Données : 1\nA_COMPLETER\n\n[Cas 3 — Alternance]\n# Données : 6\n# Données : 1\n# Données : 0\n# Données : 1\n# Données : 0\n# Données : 1\n# Données : 0\nA_COMPLETER\n",
    "hints": [
      "Un compteur s’initialise à 0 avant la boucle et s’incrémente d’un cran seulement quand la LED s’allume.",
      "Un if / else dans la boucle décide de la ligne à afficher ; le compteur vit après le test."
    ],
    "examples": [
      {
        "stdin": "4\n1\n0\n1\n1",
        "expected": "LED ON\nLED OFF\nLED ON\nLED ON\nallumee : 3",
        "note": "Trois allumages sur quatre états."
      }
    ],
    "tests": [
      {
        "label": "Aucun allumage",
        "stdin": "cas:1",
        "expected": "LED OFF\nLED OFF\nLED OFF\nallumee : 0"
      },
      {
        "label": "Que des allumages",
        "stdin": "cas:2",
        "expected": "LED ON\nLED ON\nLED ON\nLED ON\nLED ON\nallumee : 5"
      },
      {
        "label": "Alternance",
        "stdin": "cas:3",
        "expected": "LED ON\nLED OFF\nLED ON\nLED OFF\nLED ON\nLED OFF\nallumee : 3"
      }
    ],
    "solution": "[Exemple]\nLED ON\nLED OFF\nLED ON\nLED ON\nallumee : 3\n\n[Cas 1 — Aucun allumage]\nLED OFF\nLED OFF\nLED OFF\nallumee : 0\n\n[Cas 2 — Que des allumages]\nLED ON\nLED ON\nLED ON\nLED ON\nLED ON\nallumee : 5\n\n[Cas 3 — Alternance]\nLED ON\nLED OFF\nLED ON\nLED OFF\nLED ON\nLED OFF\nallumee : 3"
  },
  {
    "id": "rb-c2-e3",
    "chapter": 2,
    "level": "n2",
    "language": "analyse",
    "title": "Séquence de feux tricolores",
    "goal": "Répéter une séquence fixe de plusieurs étapes, avec minutages simulés et message final accordé.",
    "brief": "<p>Le carrefour du robot : rouge 3 s, orange 1 s, verte 3 s, orange 1 s. Analysez les données soumises pour chaque cas. Il termine par <code>termine apres X cycle(s)</code> — le mot prend un <strong>s</strong> seulement si c dépasse 1.</p>",
    "starter": "# Grille d'analyse (rb-c2-e3) — Séquence de feux tricolores\n# Complétez la résolution demandée sous chaque cas ci-dessous :\n\n[Cas 1 — Trois cycles]\n# Données : 3\nA_COMPLETER\n\n[Cas 2 — Cinq cycles]\n# Données : 5\nA_COMPLETER\n\n[Cas 3 — Sept cycles]\n# Données : 7\nA_COMPLETER\n",
    "hints": [
      "Répétez la séquence cyclique du robot selon le nombre d’itérations paramétré.",
      "Adaptez la notification d’état selon le nombre d’obstacles recensés."
    ],
    "examples": [
      {
        "stdin": "1",
        "expected": "rouge (3 s)\norange (1 s)\nverte (3 s)\norange (1 s)\ntermine apres 1 cycle",
        "note": "Un cycle complet, sans pluriel."
      }
    ],
    "tests": [
      {
        "label": "Trois cycles",
        "stdin": "cas:1",
        "expected": "rouge (3 s)\norange (1 s)\nverte (3 s)\norange (1 s)\nrouge (3 s)\norange (1 s)\nverte (3 s)\norange (1 s)\nrouge (3 s)\norange (1 s)\nverte (3 s)\norange (1 s)\ntermine apres 3 cycles"
      },
      {
        "label": "Cinq cycles",
        "stdin": "cas:2",
        "expected": "rouge (3 s)\norange (1 s)\nverte (3 s)\norange (1 s)\nrouge (3 s)\norange (1 s)\nverte (3 s)\norange (1 s)\nrouge (3 s)\norange (1 s)\nverte (3 s)\norange (1 s)\nrouge (3 s)\norange (1 s)\nverte (3 s)\norange (1 s)\nrouge (3 s)\norange (1 s)\nverte (3 s)\norange (1 s)\ntermine apres 5 cycles"
      },
      {
        "label": "Sept cycles",
        "stdin": "cas:3",
        "expected": "rouge (3 s)\norange (1 s)\nverte (3 s)\norange (1 s)\nrouge (3 s)\norange (1 s)\nverte (3 s)\norange (1 s)\nrouge (3 s)\norange (1 s)\nverte (3 s)\norange (1 s)\nrouge (3 s)\norange (1 s)\nverte (3 s)\norange (1 s)\nrouge (3 s)\norange (1 s)\nverte (3 s)\norange (1 s)\nrouge (3 s)\norange (1 s)\nverte (3 s)\norange (1 s)\nrouge (3 s)\norange (1 s)\nverte (3 s)\norange (1 s)\ntermine apres 7 cycles"
      }
    ],
    "solution": "[Exemple]\nrouge (3 s)\norange (1 s)\nverte (3 s)\norange (1 s)\ntermine apres 1 cycle\n\n[Cas 1 — Trois cycles]\nrouge (3 s)\norange (1 s)\nverte (3 s)\norange (1 s)\nrouge (3 s)\norange (1 s)\nverte (3 s)\norange (1 s)\nrouge (3 s)\norange (1 s)\nverte (3 s)\norange (1 s)\ntermine apres 3 cycles\n\n[Cas 2 — Cinq cycles]\nrouge (3 s)\norange (1 s)\nverte (3 s)\norange (1 s)\nrouge (3 s)\norange (1 s)\nverte (3 s)\norange (1 s)\nrouge (3 s)\norange (1 s)\nverte (3 s)\norange (1 s)\nrouge (3 s)\norange (1 s)\nverte (3 s)\norange (1 s)\nrouge (3 s)\norange (1 s)\nverte (3 s)\norange (1 s)\ntermine apres 5 cycles\n\n[Cas 3 — Sept cycles]\nrouge (3 s)\norange (1 s)\nverte (3 s)\norange (1 s)\nrouge (3 s)\norange (1 s)\nverte (3 s)\norange (1 s)\nrouge (3 s)\norange (1 s)\nverte (3 s)\norange (1 s)\nrouge (3 s)\norange (1 s)\nverte (3 s)\norange (1 s)\nrouge (3 s)\norange (1 s)\nverte (3 s)\norange (1 s)\nrouge (3 s)\norange (1 s)\nverte (3 s)\norange (1 s)\nrouge (3 s)\norange (1 s)\nverte (3 s)\norange (1 s)\ntermine apres 7 cycles"
  },
  {
    "id": "rb-c3-e1",
    "chapter": 3,
    "level": "n1",
    "language": "analyse",
    "title": "Pairs et impairs",
    "goal": "Écrire une fonction de test, l’appliquer à une série et compter les deux cas.",
    "brief": "<p>Analysez les données soumises pour chaque cas. Pour chacun il Indiquez <code>X pair</code> ou <code>X impair</code>. La dernière ligne donne les deux comptes : <code>pairs : P / impairs : I</code>. Le test s’écrit dans une fonction <code>est_pair(x)</code> qui renvoie un booléen.</p>",
    "starter": "# Grille d'analyse (rb-c3-e1) — Pairs et impairs\n# Complétez la résolution demandée sous chaque cas ci-dessous :\n\n[Cas 1 — Majorité de pairs]\n# Données : 3\n# Données : 10\n# Données : 21\n# Données : 12\nA_COMPLETER\n\n[Cas 2 — Aucun pair]\n# Données : 2\n# Données : 1\n# Données : 3\nA_COMPLETER\n\n[Cas 3 — Zéro et négatif]\n# Données : 3\n# Données : 0\n# Données : -7\n# Données : -4\nA_COMPLETER\n",
    "hints": [
      "Le reste d’une division par 2 décide : x % 2 vaut 0 exactement quand x est pair.",
      "Deux compteurs, initialisés avant la boucle ; chaque if en incrémente un seul."
    ],
    "examples": [
      {
        "stdin": "5\n7\n2\n8\n9\n4",
        "expected": "7 impair\n2 pair\n8 pair\n9 impair\n4 pair\npairs : 3 / impairs : 2",
        "note": "Cinq verdicts, puis le bilan."
      }
    ],
    "tests": [
      {
        "label": "Majorité de pairs",
        "stdin": "cas:1",
        "expected": "10 pair\n21 impair\n12 pair\npairs : 2 / impairs : 1"
      },
      {
        "label": "Aucun pair",
        "stdin": "cas:2",
        "expected": "1 impair\n3 impair\npairs : 0 / impairs : 2"
      },
      {
        "label": "Zéro et négatif",
        "stdin": "cas:3",
        "expected": "0 pair\n-7 impair\n-4 pair\npairs : 2 / impairs : 1"
      }
    ],
    "solution": "[Exemple]\n7 impair\n2 pair\n8 pair\n9 impair\n4 pair\npairs : 3 / impairs : 2\n\n[Cas 1 — Majorité de pairs]\n10 pair\n21 impair\n12 pair\npairs : 2 / impairs : 1\n\n[Cas 2 — Aucun pair]\n1 impair\n3 impair\npairs : 0 / impairs : 2\n\n[Cas 3 — Zéro et négatif]\n0 pair\n-7 impair\n-4 pair\npairs : 2 / impairs : 1"
  },
  {
    "id": "rb-c3-e2",
    "chapter": 3,
    "level": "n2",
    "language": "analyse",
    "title": "Test de primalité",
    "goal": "Écrire une fonction qui renvoie un booléen après une recherche de diviseur, puis la rejouer sur une série.",
    "brief": "<p>Analysez les données soumises pour chaque cas. Pour chacun il Indiquez <code>X : premier</code> ou <code>X : compose</code>. La décision se prend dans une fonction <code>est_premier(x)</code> : un nombre est premier s’il a exactement deux diviseurs ; <strong>0 et 1 sont composés</strong> ici. Le test des diviseurs s’arrête à la racine carrée de x.</p>",
    "starter": "# Grille d'analyse (rb-c3-e2) — Test de primalité\n# Complétez la résolution demandée sous chaque cas ci-dessous :\n\n[Cas 1 — Un et grands premiers]\n# Données : 3\n# Données : 1\n# Données : 97\n# Données : 25\nA_COMPLETER\n\n[Cas 2 — Nombres pairs]\n# Données : 3\n# Données : 0\n# Données : 2\n# Données : 49\nA_COMPLETER\n\n[Cas 3 — Carrés parfaits]\n# Données : 3\n# Données : 4\n# Données : 36\n# Données : 7\nA_COMPLETER\n",
    "hints": [
      "Traiter d’abord les cas x < 2, puis boucler d de 2 à int(x ** 0.5) inclus : si x % d vaut 0, ce n’est pas premier.",
      "La fonction ne doit rien afficher : elle renvoie True ou False, et c’est la boucle qui affiche."
    ],
    "examples": [
      {
        "stdin": "4\n2\n9\n11\n15",
        "expected": "2 : premier\n9 : compose\n11 : premier\n15 : compose",
        "note": "9 = 3 × 3 et 15 = 3 × 5 : composés."
      }
    ],
    "tests": [
      {
        "label": "Un et grands premiers",
        "stdin": "cas:1",
        "expected": "1 : compose\n97 : premier\n25 : compose"
      },
      {
        "label": "Nombres pairs",
        "stdin": "cas:2",
        "expected": "0 : compose\n2 : premier\n49 : compose"
      },
      {
        "label": "Carrés parfaits",
        "stdin": "cas:3",
        "expected": "4 : compose\n36 : compose\n7 : premier"
      }
    ],
    "solution": "[Exemple]\n2 : premier\n9 : compose\n11 : premier\n15 : compose\n\n[Cas 1 — Un et grands premiers]\n1 : compose\n97 : premier\n25 : compose\n\n[Cas 2 — Nombres pairs]\n0 : compose\n2 : premier\n49 : compose\n\n[Cas 3 — Carrés parfaits]\n4 : compose\n36 : compose\n7 : premier"
  },
  {
    "id": "rb-c3-e3",
    "chapter": 3,
    "level": "n3",
    "language": "analyse",
    "title": "Contrôle de seuil d’un capteur",
    "goal": "Comparer chaque relevé à un seuil fixé, décider d’une alerte et compter les alertes.",
    "brief": "<p>Le capteur de distance renvoie des relevés. Analysez les données soumises pour chaque cas. Pour chaque relevé d il Indiquez <code>d cm : ALERTE</code> si d est strictement inférieur au seuil, sinon <code>d cm : OK</code>. La dernière ligne compte les alertes : <code>alertes : A</code>.</p>",
    "starter": "# Grille d'analyse (rb-c3-e3) — Contrôle de seuil d’un capteur\n# Complétez la résolution demandée sous chaque cas ci-dessous :\n\n[Cas 1 — Autour du seuil]\n# Données : 10\n# Données : 3\n# Données : 9\n# Données : 10\n# Données : 11\nA_COMPLETER\n\n[Cas 2 — Tout proche]\n# Données : 15\n# Données : 2\n# Données : 15\n# Données : 14\nA_COMPLETER\n\n[Cas 3 — Aucune alerte]\n# Données : 5\n# Données : 2\n# Données : 6\n# Données : 100\nA_COMPLETER\n",
    "hints": [
      "L’ordre des lectures est imposé : le seuil arrive avant le compteur de relevés.",
      "« Strictement inférieur » se traduit par < : une distance égale au seuil n’alerte pas."
    ],
    "examples": [
      {
        "stdin": "30\n4\n12\n45\n8\n30",
        "expected": "12 cm : ALERTE\n45 cm : OK\n8 cm : ALERTE\n30 cm : OK\nalertes : 2",
        "note": "30 cm atteint le seuil : pas d’alerte."
      }
    ],
    "tests": [
      {
        "label": "Autour du seuil",
        "stdin": "cas:1",
        "expected": "9 cm : ALERTE\n10 cm : OK\n11 cm : OK\nalertes : 1"
      },
      {
        "label": "Tout proche",
        "stdin": "cas:2",
        "expected": "15 cm : OK\n14 cm : ALERTE\nalertes : 1"
      },
      {
        "label": "Aucune alerte",
        "stdin": "cas:3",
        "expected": "6 cm : OK\n100 cm : OK\nalertes : 0"
      }
    ],
    "solution": "[Exemple]\n12 cm : ALERTE\n45 cm : OK\n8 cm : ALERTE\n30 cm : OK\nalertes : 2\n\n[Cas 1 — Autour du seuil]\n9 cm : ALERTE\n10 cm : OK\n11 cm : OK\nalertes : 1\n\n[Cas 2 — Tout proche]\n15 cm : OK\n14 cm : ALERTE\nalertes : 1\n\n[Cas 3 — Aucune alerte]\n6 cm : OK\n100 cm : OK\nalertes : 0"
  },
  {
    "id": "rb-c4-e1",
    "chapter": 4,
    "level": "n2",
    "language": "analyse",
    "title": "Tri à bulles instrumenté",
    "goal": "Implémenter le tri à bulles à la main et compter les comparaisons effectuées.",
    "brief": "<p>Analysez les données soumises pour chaque cas. Il les trie par <strong>tri à bulles</strong> écrit à la main (pas de <code>sort()</code>) et Indiquez trois lignes : la série initiale <code>avant : ...</code> (valeurs séparées par un espace), la série triée <code>apres : ...</code>, et le nombre de <strong>comparaisons</strong> effectuées par l’algorithme <code>comparaisons : C</code> — on compte chaque test entre deux voisins, même sans échange.</p>",
    "starter": "# Grille d'analyse (rb-c4-e1) — Tri à bulles instrumenté\n# Complétez la résolution demandée sous chaque cas ci-dessous :\n\n[Cas 1 — Quatre valeurs]\n# Données : 4\n# Données : 9\n# Données : 1\n# Données : 8\n# Données : 2\nA_COMPLETER\n\n[Cas 2 — Déjà triée]\n# Données : 3\n# Données : 1\n# Données : 2\n# Données : 3\nA_COMPLETER\n\n[Cas 3 — Deux valeurs]\n# Données : 2\n# Données : 3\n# Données : 1\nA_COMPLETER\n",
    "hints": [
      "Le double parcours classique : pour i de 0 à n − 2, pour j de 0 à n − 2 − i, comparer valeurs[j] et valeurs[j + 1].",
      "Le compteur s’incrémente à chaque comparaison, avant même de savoir s’il y aura échange."
    ],
    "examples": [
      {
        "stdin": "5\n64\n25\n12\n22\n11",
        "expected": "avant : 64 25 12 22 11\napres : 11 12 22 25 64\ncomparaisons : 10",
        "note": "Pour n = 5, le double parcours complet fait 4 + 3 + 2 + 1 = 10 comparaisons."
      }
    ],
    "tests": [
      {
        "label": "Quatre valeurs",
        "stdin": "cas:1",
        "expected": "avant : 9 1 8 2\napres : 1 2 8 9\ncomparaisons : 6"
      },
      {
        "label": "Déjà triée",
        "stdin": "cas:2",
        "expected": "avant : 1 2 3\napres : 1 2 3\ncomparaisons : 3"
      },
      {
        "label": "Deux valeurs",
        "stdin": "cas:3",
        "expected": "avant : 3 1\napres : 1 3\ncomparaisons : 1"
      }
    ],
    "solution": "[Exemple]\navant : 64 25 12 22 11\napres : 11 12 22 25 64\ncomparaisons : 10\n\n[Cas 1 — Quatre valeurs]\navant : 9 1 8 2\napres : 1 2 8 9\ncomparaisons : 6\n\n[Cas 2 — Déjà triée]\navant : 1 2 3\napres : 1 2 3\ncomparaisons : 3\n\n[Cas 3 — Deux valeurs]\navant : 3 1\napres : 1 3\ncomparaisons : 1"
  },
  {
    "id": "rb-c4-e2",
    "chapter": 4,
    "level": "n3",
    "language": "analyse",
    "title": "Registre des membres",
    "goal": "Construire une liste de dictionnaires, en extraire des extrêmes et une moyenne.",
    "brief": "<p>Analysez les données soumises pour chaque cas. Il construit une liste de dictionnaires puis Indiquez trois lignes : le membre le plus jeune <code>le plus jeune : nom</code>, le plus âgé <code>le plus age : nom</code>, et la moyenne des âges à une décimale <code>moyenne : M.M</code>.</p>",
    "starter": "# Grille d'analyse (rb-c4-e2) — Registre des membres\n# Complétez la résolution demandée sous chaque cas ci-dessous :\n\n[Cas 1 — Trois membres]\n# Données : 3\n# Données : Bob 30\n# Données : Eve 25\n# Données : Max 28\nA_COMPLETER\n\n[Cas 2 — Deux membres]\n# Données : 2\n# Données : Iya 15\n# Données : Tom 16\nA_COMPLETER\n\n[Cas 3 — Extrêmes au milieu]\n# Données : 5\n# Données : A 20\n# Données : B 12\n# Données : C 40\n# Données : D 18\n# Données : E 25\nA_COMPLETER\n",
    "hints": [
      "min() et max() acceptent un argument key= qui indique sur quoi comparer : key=lambda m: m[\"age\"].",
      "La moyenne demande la somme des âges divisée par n, formatée avec :.1f."
    ],
    "examples": [
      {
        "stdin": "4\nAlice 20\nZack 17\nAwa 22\nLinus 19",
        "expected": "le plus jeune : Zack\nle plus age : Awa\nmoyenne : 19.5",
        "note": "17, 19, 20, 22 : moyenne 78/4 = 19,5."
      }
    ],
    "tests": [
      {
        "label": "Trois membres",
        "stdin": "cas:1",
        "expected": "le plus jeune : Eve\nle plus age : Bob\nmoyenne : 27.7"
      },
      {
        "label": "Deux membres",
        "stdin": "cas:2",
        "expected": "le plus jeune : Iya\nle plus age : Tom\nmoyenne : 15.5"
      },
      {
        "label": "Extrêmes au milieu",
        "stdin": "cas:3",
        "expected": "le plus jeune : B\nle plus age : C\nmoyenne : 23.0"
      }
    ],
    "solution": "[Exemple]\nle plus jeune : Zack\nle plus age : Awa\nmoyenne : 19.5\n\n[Cas 1 — Trois membres]\nle plus jeune : Eve\nle plus age : Bob\nmoyenne : 27.7\n\n[Cas 2 — Deux membres]\nle plus jeune : Iya\nle plus age : Tom\nmoyenne : 15.5\n\n[Cas 3 — Extrêmes au milieu]\nle plus jeune : B\nle plus age : C\nmoyenne : 23.0"
  },
  {
    "id": "rb-c4-e3",
    "chapter": 4,
    "level": "n3",
    "language": "analyse",
    "title": "Recherche dichotomique",
    "goal": "Écrire la dichotomie à la main sur une série déjà triée, avec renvoi de −1 si absente.",
    "brief": "<p>Analysez les données soumises pour chaque cas. Il Indiquez l’<strong>indice</strong> (à partir de 0) de v dans la liste, trouvé par <strong>dichotomie</strong> écrite à la main — ou <code>-1</code> si la valeur n’y figure pas.</p>",
    "starter": "# Grille d'analyse (rb-c4-e3) — Recherche dichotomique\n# Complétez la résolution demandée sous chaque cas ci-dessous :\n\n[Cas 1 — Milieu exact]\n# Données : 5\n# Données : 1\n# Données : 3\n# Données : 5\n# Données : 7\n# Données : 9\n# Données : 7\nA_COMPLETER\n\n[Cas 2 — Valeur absente]\n# Données : 4\n# Données : 10\n# Données : 20\n# Données : 30\n# Données : 40\n# Données : 25\nA_COMPLETER\n\n[Cas 3 — Bords de liste]\n# Données : 6\n# Données : 3\n# Données : 6\n# Données : 9\n# Données : 12\n# Données : 15\n# Données : 18\n# Données : 3\nA_COMPLETER\n",
    "hints": [
      "Deux bornes bas et haut encadrent la zone de recherche : tant que bas <= haut, comparer au milieu (bas + haut) // 2.",
      "Si la valeur du milieu est trop petite, la zone repart au milieu + 1 ; trop grande, elle finit au milieu − 1 ; égale, c’est gagné."
    ],
    "examples": [
      {
        "stdin": "7\n2\n5\n8\n12\n16\n23\n42\n16",
        "expected": "4",
        "note": "16 est à l’indice 4 dans [2, 5, 8, 12, 16, 23, 42]."
      }
    ],
    "tests": [
      {
        "label": "Milieu exact",
        "stdin": "cas:1",
        "expected": "3"
      },
      {
        "label": "Valeur absente",
        "stdin": "cas:2",
        "expected": "-1"
      },
      {
        "label": "Bords de liste",
        "stdin": "cas:3",
        "expected": "0"
      }
    ],
    "solution": "[Exemple]\n4\n\n[Cas 1 — Milieu exact]\n3\n\n[Cas 2 — Valeur absente]\n-1\n\n[Cas 3 — Bords de liste]\n0"
  },
  {
    "id": "rb-c5-e1",
    "chapter": 5,
    "level": "n1",
    "language": "analyse",
    "title": "Tables de vérité des cinq portes",
    "goal": "Calculer AND, OR, NAND, NOR et XOR sur un couple de bits, sans bibliothèque.",
    "brief": "<p>Analysez les données soumises pour chaque cas. Il Indiquez cinq lignes, une par porte : <code>AND : x</code>, <code>OR : x</code>, <code>NAND : x</code>, <code>NOR : x</code>, <code>XOR : x</code>. Les valeurs se calculent en Python pur : NAND = non(ET), NOR = non(OU), XOR vaut 1 exactement quand les bits diffèrent.</p>",
    "starter": "# Grille d'analyse (rb-c5-e1) — Tables de vérité des cinq portes\n# Complétez la résolution demandée sous chaque cas ci-dessous :\n\n[Cas 1 — Deux bits à 1]\n# Données : 1 1\nA_COMPLETER\n\n[Cas 2 — Deux bits à 0]\n# Données : 0 0\nA_COMPLETER\n\n[Cas 3 — Inverse du premier cas]\n# Données : 0 1\nA_COMPLETER\n",
    "hints": [
      "En Python, et se note and, ou se note or, et non() se note not. Le résultat s’affiche en 0/1 : int(...).",
      "XOR se réduit à a != b : vrai exactement quand les deux bits diffèrent."
    ],
    "examples": [
      {
        "stdin": "1 0",
        "expected": "AND : 0\nOR : 1\nNAND : 1\nNOR : 0\nXOR : 1",
        "note": "Bits différents : ET = 0, OU = 1, XOR = 1."
      }
    ],
    "tests": [
      {
        "label": "Deux bits à 1",
        "stdin": "cas:1",
        "expected": "AND : 1\nOR : 1\nNAND : 0\nNOR : 0\nXOR : 0"
      },
      {
        "label": "Deux bits à 0",
        "stdin": "cas:2",
        "expected": "AND : 0\nOR : 0\nNAND : 1\nNOR : 1\nXOR : 0"
      },
      {
        "label": "Inverse du premier cas",
        "stdin": "cas:3",
        "expected": "AND : 0\nOR : 1\nNAND : 1\nNOR : 0\nXOR : 1"
      }
    ],
    "solution": "[Exemple]\nAND : 0\nOR : 1\nNAND : 1\nNOR : 0\nXOR : 1\n\n[Cas 1 — Deux bits à 1]\nAND : 1\nOR : 1\nNAND : 0\nNOR : 0\nXOR : 0\n\n[Cas 2 — Deux bits à 0]\nAND : 0\nOR : 0\nNAND : 1\nNOR : 1\nXOR : 0\n\n[Cas 3 — Inverse du premier cas]\nAND : 0\nOR : 1\nNAND : 1\nNOR : 0\nXOR : 1"
  },
  {
    "id": "rb-c5-e2",
    "chapter": 5,
    "level": "n2",
    "language": "analyse",
    "title": "Additionneur complet",
    "goal": "Simuler un additionneur complet bit à bit à partir des formules S et Cout.",
    "brief": "<p>Un additionneur complet reçoit trois bits : <strong>a</strong>, <strong>b</strong> et la retenue entrante <strong>cin</strong> (trois lignes). Il produit la somme <code>S = a XOR b XOR cin</code> et la retenue sortante <code>Cout = (a AND b) OR (cin AND (a XOR b))</code>. Le programme Indiquez deux lignes : <code>S : x</code> puis <code>Cout : x</code>.</p>",
    "starter": "# Grille d'analyse (rb-c5-e2) — Additionneur complet\n# Complétez la résolution demandée sous chaque cas ci-dessous :\n\n[Cas 1 — Tout à zéro]\n# Données : 0\n# Données : 0\n# Données : 0\nA_COMPLETER\n\n[Cas 2 — Retenue en cascade]\n# Données : 1\n# Données : 1\n# Données : 1\nA_COMPLETER\n\n[Cas 3 — Un seul bit actif]\n# Données : 0\n# Données : 0\n# Données : 1\nA_COMPLETER\n",
    "hints": [
      "Calculez d’abord x = a ^ b (le XOR Python) : S vaut x ^ cin et Cout se réécrit (a & b) | (cin & x).",
      "Attention : ^ est le XOR en Python et & le ET bit à bit — sur des bits, c’est exactement nos portes."
    ],
    "examples": [
      {
        "stdin": "1\n0\n1",
        "expected": "S : 0\nCout : 1",
        "note": "1 + 0 + 1 = 10 en binaire : S = 0, retenue 1."
      }
    ],
    "tests": [
      {
        "label": "Tout à zéro",
        "stdin": "cas:1",
        "expected": "S : 0\nCout : 0"
      },
      {
        "label": "Retenue en cascade",
        "stdin": "cas:2",
        "expected": "S : 1\nCout : 1"
      },
      {
        "label": "Un seul bit actif",
        "stdin": "cas:3",
        "expected": "S : 1\nCout : 0"
      }
    ],
    "solution": "[Exemple]\nS : 0\nCout : 1\n\n[Cas 1 — Tout à zéro]\nS : 0\nCout : 0\n\n[Cas 2 — Retenue en cascade]\nS : 1\nCout : 1\n\n[Cas 3 — Un seul bit actif]\nS : 1\nCout : 0"
  },
  {
    "id": "rb-c5-e3",
    "chapter": 5,
    "level": "n3",
    "language": "analyse",
    "title": "Chiffre de César",
    "goal": "Décaler chaque lettre d’un message de k positions, en préservant la casse et les caractères non alphabétiques.",
    "brief": "<p>Analysez les données soumises pour chaque cas. Il Indiquez le message chiffré : chaque lettre est décalée de k positions dans l’alphabet, avec retour circulaire (modulo 26). Les majuscules restent majuscules, les minuscules restent minuscules ; chiffres, espaces et ponctuation ne bougent pas.</p>",
    "starter": "# Grille d'analyse (rb-c5-e3) — Chiffre de César\n# Complétez la résolution demandée sous chaque cas ci-dessous :\n\n[Cas 1 — Retour circulaire]\n# Données : 1\n# Données : xyz\nA_COMPLETER\n\n[Cas 2 — Presque un tour]\n# Données : 25\n# Données : AB\nA_COMPLETER\n\n[Cas 3 — Message mixte]\n# Données : 5\n# Données : Robot-2026!\nA_COMPLETER\n",
    "hints": [
      "Pour une minuscule c : ord(c) - ord(\"a\") donne sa position 0-25 ; on ajoute k, on prend % 26, on revient avec chr(... + ord(\"a\")).",
      "Traiter majuscules et minuscules séparément, et laisser intacts tous les autres caractères."
    ],
    "examples": [
      {
        "stdin": "3\nHELLO",
        "expected": "KHOOR",
        "note": "H → K, E → H, L → O, O → R : le décalage de 3 de l’exemple du support."
      }
    ],
    "tests": [
      {
        "label": "Retour circulaire",
        "stdin": "cas:1",
        "expected": "yza"
      },
      {
        "label": "Presque un tour",
        "stdin": "cas:2",
        "expected": "ZA"
      },
      {
        "label": "Message mixte",
        "stdin": "cas:3",
        "expected": "Wtgty-2026!"
      }
    ],
    "solution": "[Exemple]\nKHOOR\n\n[Cas 1 — Retour circulaire]\nyza\n\n[Cas 2 — Presque un tour]\nZA\n\n[Cas 3 — Message mixte]\nWtgty-2026!"
  },
  {
    "id": "rb-c6-e1",
    "chapter": 6,
    "level": "n2",
    "language": "analyse",
    "title": "Décodeur 7 segments",
    "goal": "Associer chaque chiffre à la liste de ses segments allumés, via une table de correspondance.",
    "brief": "<p>Un afficheur 7 segments possède sept segments notés de <code>a</code> à <code>g</code>. Analysez les données soumises pour chaque cas. Construire la correspondance dans un <strong>dictionnaire</strong> : 0 → a b c d e f ; 1 → b c ; 2 → a b d e g ; 3 → a b c d g ; 4 → b c f g ; 5 → a c d f g ; 6 → a c d e f g ; 7 → a b c ; 8 → tous ; 9 → a b c d f g.</p>",
    "starter": "# Grille d'analyse (rb-c6-e1) — Décodeur 7 segments\n# Complétez la résolution demandée sous chaque cas ci-dessous :\n\n[Cas 1 — Zéro]\n# Données : 0\nA_COMPLETER\n\n[Cas 2 — Huit]\n# Données : 8\nA_COMPLETER\n\n[Cas 3 — Sept]\n# Données : 7\nA_COMPLETER\n",
    "hints": [
      "Complétez le dictionnaire chiffre par chiffre, puis une seule ligne d’affichage suffit : print(segments[chiffre]).",
      "Le 8 allume tous les segments : c’est la seule entrée qui contient les sept lettres."
    ],
    "examples": [
      {
        "stdin": "2",
        "expected": "a b d e g",
        "note": "Le 2 allume cinq segments : a, b, d, e et g."
      }
    ],
    "tests": [
      {
        "label": "Zéro",
        "stdin": "cas:1",
        "expected": "a b c d e f"
      },
      {
        "label": "Huit",
        "stdin": "cas:2",
        "expected": "a b c d e f g"
      },
      {
        "label": "Sept",
        "stdin": "cas:3",
        "expected": "a b c"
      }
    ],
    "solution": "[Exemple]\na b d e g\n\n[Cas 1 — Zéro]\na b c d e f\n\n[Cas 2 — Huit]\na b c d e f g\n\n[Cas 3 — Sept]\na b c"
  },
  {
    "id": "rb-c6-e2",
    "chapter": 6,
    "level": "n3",
    "language": "analyse",
    "title": "Station météo — états et alertes",
    "goal": "Classer chaque relevé de température par seuils stricts et compter les alertes.",
    "brief": "<p>Analysez les données soumises pour chaque cas. Pour chaque relevé t il Indiquez <code>t C : ALERTE CHALEUR</code> si t est <strong>strictement supérieur</strong> à 30, <code>t C : ALERTE FROID</code> si t est <strong>strictement inférieur</strong> à 15, sinon <code>t C : normale</code>. La température se réIndiquez sans zéros inutiles (30.0 s’écrit <code>30</code>). La dernière ligne compte toutes les alertes confondues : <code>alertes : A</code>.</p>",
    "starter": "# Grille d'analyse (rb-c6-e2) — Station météo — états et alertes\n# Complétez la résolution demandée sous chaque cas ci-dessous :\n\n[Cas 1 — Autour de 30]\n# Données : 3\n# Données : 30\n# Données : 30.1\n# Données : -2\nA_COMPLETER\n\n[Cas 2 — Autour de 15]\n# Données : 2\n# Données : 15\n# Données : 14.9\nA_COMPLETER\n\n[Cas 3 — Tout normal]\n# Données : 3\n# Données : 20\n# Données : 15\n# Données : 30\nA_COMPLETER\n",
    "hints": [
      "Évaluez les seuils de température relevés par les capteurs thermiques : normal, alerte ou critique.",
      "Associez le niveau d’alarme approprié à la plage thermique mesurée."
    ],
    "examples": [
      {
        "stdin": "5\n31.5\n29.9\n14\n12.5\n30",
        "expected": "31.5 C : ALERTE CHALEUR\n29.9 C : normale\n14 C : ALERTE FROID\n12.5 C : ALERTE FROID\n30 C : normale\nalertes : 3",
        "note": "30 et 29.9 restent normaux : les seuils sont stricts."
      }
    ],
    "tests": [
      {
        "label": "Autour de 30",
        "stdin": "cas:1",
        "expected": "30 C : normale\n30.1 C : ALERTE CHALEUR\n-2 C : ALERTE FROID\nalertes : 2"
      },
      {
        "label": "Autour de 15",
        "stdin": "cas:2",
        "expected": "15 C : normale\n14.9 C : ALERTE FROID\nalertes : 1"
      },
      {
        "label": "Tout normal",
        "stdin": "cas:3",
        "expected": "20 C : normale\n15 C : normale\n30 C : normale\nalertes : 0"
      }
    ],
    "solution": "[Exemple]\n31.5 C : ALERTE CHALEUR\n29.9 C : normale\n14 C : ALERTE FROID\n12.5 C : ALERTE FROID\n30 C : normale\nalertes : 3\n\n[Cas 1 — Autour de 30]\n30 C : normale\n30.1 C : ALERTE CHALEUR\n-2 C : ALERTE FROID\nalertes : 2\n\n[Cas 2 — Autour de 15]\n15 C : normale\n14.9 C : ALERTE FROID\nalertes : 1\n\n[Cas 3 — Tout normal]\n20 C : normale\n15 C : normale\n30 C : normale\nalertes : 0"
  },
  {
    "id": "rb-c6-e3",
    "chapter": 6,
    "level": "n4",
    "language": "analyse",
    "title": "Régulateur de distance",
    "goal": "Décider d’un état par relevé avec trois seuils, puis agréger minimum et moyenne entière.",
    "brief": "<p>Le robot roule : Analysez les données soumises pour chaque cas. Pour chaque relevé d il Indiquez <code>STOP</code> si d &lt; 10, <code>LENT</code> si 10 ≤ d &lt; 30, sinon <code>LIBRE</code>. Puis deux lignes de bilan : <code>minimum : m</code> (le plus petit relevé) et <code>moyenne : M</code> (moyenne <em>entière</em>, tronquée — division entière).</p>",
    "starter": "# Grille d'analyse (rb-c6-e3) — Régulateur de distance\n# Complétez la résolution demandée sous chaque cas ci-dessous :\n\n[Cas 1 — Frontières 10 et 30]\n# Données : 3\n# Données : 10\n# Données : 30\n# Données : 9\nA_COMPLETER\n\n[Cas 2 — Nul et grand]\n# Données : 4\n# Données : 0\n# Données : 5\n# Données : 100\n# Données : 55\nA_COMPLETER\n\n[Cas 3 — Un seul relevé]\n# Données : 1\n# Données : 29\nA_COMPLETER\n",
    "hints": [
      "Le minimum se suit dans la boucle avec une variable initialisée à une valeur trop grande, ou s’obtient après coup avec min().",
      "La division entière // tronque la moyenne ; l’ordre STOP puis LENT puis LIBRE se teste dans cet ordre."
    ],
    "examples": [
      {
        "stdin": "6\n4\n35\n12\n29\n47\n8",
        "expected": "STOP\nLIBRE\nLENT\nLENT\nLIBRE\nSTOP\nminimum : 4\nmoyenne : 22",
        "note": "Somme 135, moyenne 135/6 = 22,5 tronquée à 22."
      }
    ],
    "tests": [
      {
        "label": "Frontières 10 et 30",
        "stdin": "cas:1",
        "expected": "LENT\nLIBRE\nSTOP\nminimum : 9\nmoyenne : 16"
      },
      {
        "label": "Nul et grand",
        "stdin": "cas:2",
        "expected": "STOP\nSTOP\nLIBRE\nLIBRE\nminimum : 0\nmoyenne : 40"
      },
      {
        "label": "Un seul relevé",
        "stdin": "cas:3",
        "expected": "LENT\nminimum : 29\nmoyenne : 29"
      }
    ],
    "solution": "[Exemple]\nSTOP\nLIBRE\nLENT\nLENT\nLIBRE\nSTOP\nminimum : 4\nmoyenne : 22\n\n[Cas 1 — Frontières 10 et 30]\nLENT\nLIBRE\nSTOP\nminimum : 9\nmoyenne : 16\n\n[Cas 2 — Nul et grand]\nSTOP\nSTOP\nLIBRE\nLIBRE\nminimum : 0\nmoyenne : 40\n\n[Cas 3 — Un seul relevé]\nLENT\nminimum : 29\nmoyenne : 29"
  }
];

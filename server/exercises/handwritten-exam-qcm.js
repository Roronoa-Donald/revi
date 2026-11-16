'use strict';

// Questions QCM extraites des simulateurs d'examen des cours B1 autonomes (validation serveur uniquement).
module.exports = {
  "b1-python": [
    {
      "stem": "Quels sont les résultats et les types de <code>10 / 2</code> et <code>10 // 2</code> ?",
      "opts": [
        "5 (int) et 5 (int)",
        "5.0 (float) et 5 (int)",
        "5.0 (float) et 5.0 (float)"
      ],
      "correct": 1,
      "exp": "<code>/</code> <svg class=\"ic\" aria-hidden=\"true\" focusable=\"false\"><use href=\"/assets/img/ui-icons.svg#i-arrow-right\"></use></svg> float (5.0) ; <code>//</code> <svg class=\"ic\" aria-hidden=\"true\" focusable=\"false\"><use href=\"/assets/img/ui-icons.svg#i-arrow-right\"></use></svg> int (5)."
    },
    {
      "stem": "<code>range(1, 6)</code> produit combien de valeurs ?",
      "opts": [
        "6",
        "5",
        "4"
      ],
      "correct": 1,
      "exp": "1 à 5 <svg class=\"ic\" aria-hidden=\"true\" focusable=\"false\"><use href=\"/assets/img/ui-icons.svg#i-arrow-right\"></use></svg> 5 valeurs."
    },
    {
      "stem": "Une fonction sans <code>return</code> renvoie…",
      "opts": [
        "0",
        "None",
        "chaine vide"
      ],
      "correct": 1,
      "exp": "Absence de <code>return</code> <svg class=\"ic\" aria-hidden=\"true\" focusable=\"false\"><use href=\"/assets/img/ui-icons.svg#i-arrow-right\"></use></svg> <code>None</code>."
    },
    {
      "stem": "<code>{\"a\": 1}.get(\"b\", 0)</code> vaut ?",
      "opts": [
        "KeyError",
        "0",
        "None"
      ],
      "correct": 1,
      "exp": "<code>get</code> renvoie le défaut <code>0</code> si la clé manque."
    },
    {
      "stem": "Mode d'ouverture qui ajoute sans écraser ?",
      "opts": [
        "\"w\"",
        "\"a\"",
        "\"r\""
      ],
      "correct": 1,
      "exp": "<code>\"a\"</code> = append."
    },
    {
      "stem": "Quelle erreur pour <code>int(\"abc\")</code> ?",
      "opts": [
        "SyntaxError",
        "ValueError",
        "TypeError"
      ],
      "correct": 1,
      "exp": "Chaîne non convertible <svg class=\"ic\" aria-hidden=\"true\" focusable=\"false\"><use href=\"/assets/img/ui-icons.svg#i-arrow-right\"></use></svg> <code>ValueError</code>."
    },
    {
      "stem": "<code>[1,2,3][-1]</code> vaut ?",
      "opts": [
        "1",
        "3",
        "IndexError"
      ],
      "correct": 1,
      "exp": "-1 = dernier élément."
    },
    {
      "stem": "Que fait un <code>with open(...)</code> à la sortie du bloc ?",
      "opts": [
        "Rien",
        "Ferme le fichier automatiquement",
        "Le supprime"
      ],
      "correct": 1,
      "exp": "Fermeture garantie, même en cas d'erreur."
    },
    {
      "stem": "Résultat de <code>sum([1,2,3]) + len([1,2,3])</code> ?",
      "opts": [
        "6",
        "9",
        "Erreur"
      ],
      "correct": 1,
      "exp": "6 + 3 = 9."
    },
    {
      "stem": "Quel mot-clé sort immédiatement d'une boucle ?",
      "opts": [
        "continue",
        "break",
        "pass"
      ],
      "correct": 1,
      "exp": "<code>break</code> sort ; <code>continue</code> saute ; <code>pass</code> ne fait rien."
    }
  ],
  "b1-c-cpp": [
    {
      "stem": "Que fait l'instruction <code>scanf(\"%d\", &amp;x);</code> ?",
      "opts": [
        "Elle affiche la valeur de x",
        "Elle lit un entier et l'écrit à l'adresse de x",
        "Elle déclare x"
      ],
      "correct": 1,
      "exp": "<code>scanf</code> remplit la variable par son adresse : d'où le <code>&amp;</code>."
    },
    {
      "stem": "Que vaut <code>9 / 4</code> en C entre deux <code>int</code> ?",
      "opts": [
        "2.25",
        "2",
        "3"
      ],
      "correct": 1,
      "exp": "Division entière : la partie décimale est tronquée."
    },
    {
      "stem": "Quel indice est valide pour <code>int t[5];</code> ?",
      "opts": [
        "4",
        "5",
        "6"
      ],
      "correct": 0,
      "exp": "Les indices vont de 0 à 4 : 5 est hors des limites."
    },
    {
      "stem": "Que fait <code>*p = 10;</code> si <code>p</code> pointe vers <code>x</code> ?",
      "opts": [
        "Elle change l'adresse de p",
        "Elle met 10 dans x",
        "Elle compare p à 10"
      ],
      "correct": 1,
      "exp": "Le déréférencement écrit à l'adresse pointée."
    },
    {
      "stem": "Par quoi se termine une chaîne de caractères en C ?",
      "opts": [
        "Une espace",
        "Le caractère nul <code>'\\0'</code>",
        "Un point-virgule"
      ],
      "correct": 1,
      "exp": "C'est ce caractère de fin que parcourent les fonctions de <code>string.h</code>."
    },
    {
      "stem": "Quel mot-clé sort immédiatement d'une boucle ?",
      "opts": [
        "continue",
        "break",
        "return 0"
      ],
      "correct": 1,
      "exp": "<code>break</code> sort ; <code>continue</code> passe au tour suivant."
    },
    {
      "stem": "Que renvoie <code>fopen</code> en cas d'échec ?",
      "opts": [
        "0",
        "NULL",
        "-1"
      ],
      "correct": 1,
      "exp": "L'échec se teste en comparant le <code>FILE *</code> à <code>NULL</code>."
    },
    {
      "stem": "Quelle expression C++ affiche une valeur suivie d'un retour à la ligne ?",
      "opts": [
        "<code>printf(value)</code>",
        "<code>cout &lt;&lt; value &lt;&lt; endl;</code>",
        "<code>print(value)</code>"
      ],
      "correct": 1,
      "exp": "<code>cout</code> est le flux de sortie standard en C++."
    },
    {
      "stem": "Que fait <code>p++</code> sur un <code>int *p</code> ?",
      "opts": [
        "Avance d'un octet",
        "Avance d'une case",
        "Double la valeur pointée"
      ],
      "correct": 1,
      "exp": "L'arithmétique des pointeurs se fait en unités du type pointé."
    },
    {
      "stem": "Comment accéder au champ <code>x</code> d'une structure <code>p</code> ?",
      "opts": [
        "<code>p.x</code>",
        "<code>p-&gt;x</code>",
        "<code>p[x]</code>"
      ],
      "correct": 0,
      "exp": "Le point s'utilise sur une valeur ; la flèche sur un pointeur."
    }
  ],
  "b1-php": [
    {
      "stem": "Comment reconnaît-on une variable en PHP ?",
      "opts": [
        "Elle commence par $",
        "Elle se termine par ;",
        "Elle est déclarée avec var"
      ],
      "correct": 0,
      "exp": "$nom, $total : le dollar préfixe toute variable."
    },
    {
      "stem": "Pourquoi <code>trim(fgets(STDIN))</code> ?",
      "opts": [
        "Pour convertir en entier",
        "Pour retirer le saut de ligne de la lecture",
        "Pour afficher la valeur"
      ],
      "correct": 1,
      "exp": "Sans trim, la comparaison échoue à cause du \\n final."
    },
    {
      "stem": "Que teste <code>===</code> en plus de <code>==</code> ?",
      "opts": [
        "La longueur",
        "L'ordre des valeurs",
        "Le type des valeurs"
      ],
      "correct": 2,
      "exp": "=== exige même valeur et même type."
    },
    {
      "stem": "Dans une cascade if / elseif / else, quelle branche s'exécute ?",
      "opts": [
        "Toutes celles vraies",
        "La première condition vraie",
        "Toujours le else"
      ],
      "correct": 1,
      "exp": "Dès qu'une condition est satisfaite, les suivantes sont ignorées."
    },
    {
      "stem": "Dernier indice d'un tableau de n éléments ?",
      "opts": [
        "n",
        "n − 1",
        "count($tab) + 1"
      ],
      "correct": 1,
      "exp": "Les indices vont de 0 à n − 1."
    },
    {
      "stem": "Que renvoie <code>array_search</code> si la valeur est absente ?",
      "opts": [
        "−1",
        "null",
        "false"
      ],
      "correct": 2,
      "exp": "À tester avec === false avant d'utiliser le résultat."
    },
    {
      "stem": "Parcourir un tableau associatif avec clé et valeur ?",
      "opts": [
        "for ($i = 0; ...)",
        "foreach ($tab as $cle =&gt; $valeur)",
        "while (list($tab))"
      ],
      "correct": 1,
      "exp": "Le foreach associatif visite chaque couple clé → valeur."
    },
    {
      "stem": "Que renvoie une fonction PHP sans return ?",
      "opts": [
        "0",
        "null",
        "false"
      ],
      "correct": 1,
      "exp": "Sans return, la fonction ne transmet rien d'exploitable."
    },
    {
      "stem": "Pourquoi une requête préparée plutôt qu'une concaténation ?",
      "opts": [
        "Elle est plus rapide à écrire",
        "La donnée ne peut pas modifier la requête (injections bloquées)",
        "Elle évite de se connecter"
      ],
      "correct": 1,
      "exp": "La valeur passe par un paramètre : le SQL reste fixe."
    },
    {
      "stem": "À quoi sert <code>htmlspecialchars()</code> à l'affichage ?",
      "opts": [
        "Neutraliser le HTML d'une donnée externe (XSS)",
        "Nettoyer la base de données",
        "Formater les nombres"
      ],
      "correct": 0,
      "exp": "Les données externes s'affichent comme du texte, jamais comme du HTML."
    }
  ],
  "b1-algo": [
    {
      "stem": "Que fait l'affectation <code>x ← x + 1</code> ?",
      "opts": [
        "Elle compare x et x + 1",
        "Elle augmente la valeur de x d'une unité",
        "Elle déclare une nouvelle variable"
      ],
      "correct": 1,
      "exp": "La droite est calculée avec l'ancienne valeur, puis rangée dans x."
    },
    {
      "stem": "Quelle structure choisir pour un nombre de tours connu à l'avance ?",
      "opts": [
        "La boucle Pour",
        "TantQue",
        "Répéter...Jusqu'à"
      ],
      "correct": 0,
      "exp": "La boucle Pour est un compteur borné."
    },
    {
      "stem": "Quelle boucle s'exécute au moins une fois ?",
      "opts": [
        "Pour",
        "TantQue",
        "Répéter...Jusqu'à"
      ],
      "correct": 2,
      "exp": "Le test est en fin de boucle : le corps s'exécute d'abord."
    },
    {
      "stem": "Que vaut <code>17 div 5</code> ? Et <code>17 mod 5</code> ?",
      "opts": [
        "3 et 2",
        "3.4 et 2",
        "2 et 3"
      ],
      "correct": 0,
      "exp": "17 = 3 × 5 + 2 : quotient 3, reste 2."
    },
    {
      "stem": "Dans une cascade Si/Sinon Si sans Sinon final, que se passe-t-il si aucune condition n'est vraie ?",
      "opts": [
        "La première branche s'exécute malgré son test faux",
        "Aucune branche ne s'exécute",
        "La dernière branche s'exécute automatiquement"
      ],
      "correct": 1,
      "exp": "Sans condition vraie et sans Sinon, aucune branche n'est choisie : ni la première ni\n      la dernière ne s'exécute. Si une condition était vraie, seule la première condition vraie serait retenue."
    },
    {
      "stem": "Où doit s'initialiser un accumulateur ?",
      "opts": [
        "Dans la boucle",
        "Avant la boucle",
        "Après la boucle"
      ],
      "correct": 1,
      "exp": "Initialisé dans la boucle, il repart de zéro à chaque tour."
    },
    {
      "stem": "Quel est le dernier indice d'un tableau de n éléments (indexé à partir de 0) ?",
      "opts": [
        "n",
        "n − 1",
        "n + 1"
      ],
      "correct": 1,
      "exp": "Les indices vont de 0 à n − 1."
    },
    {
      "stem": "Que renvoie une fonction sans return ?",
      "opts": [
        "0",
        "None (rien d'exploitable)",
        "Une erreur"
      ],
      "correct": 1,
      "exp": "Afficher n'est pas renvoyer : sans return, la valeur est None."
    },
    {
      "stem": "Condition de validité de la recherche dichotomique ?",
      "opts": [
        "Le tableau est quelconque",
        "Le tableau est trié",
        "Le tableau est de taille paire"
      ],
      "correct": 1,
      "exp": "Sans tri, éliminer la moitié du tableau n'a aucun sens."
    },
    {
      "stem": "Qu'est-ce qui garantit l'arrêt d'une fonction récursive sur un entier naturel n ?",
      "opts": [
        "Sa longueur",
        "Un cas de base n = 0 et n diminue de 1 à chaque appel",
        "Un cas de base, même si n augmente à chaque appel"
      ],
      "correct": 1,
      "exp": "À partir d'un entier naturel, soustraire 1 à chaque appel atteint le cas de base 0.\n      La longueur du code ne prouve rien, et un appel qui augmente n peut s'éloigner indéfiniment du cas de base."
    }
  ]
};

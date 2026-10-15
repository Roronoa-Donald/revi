/**
 * Exercices de code — Langage C & C++ (B1), 3 par module.
 *
 * Même contrat que `b1-python.js` :
 *   - `brief`    : l'énoncé affiché à l'élève ;
 *   - `starter`  : le code de départ déposé dans Monaco (il doit comporter un
 *                  défaut : compiler, s'exécuter, mais échouer au moins un test) ;
 *   - `examples` : un exemple VISIBLE (entrée, sortie attendue, commentaire) ;
 *   - `tests`    : les tests de correction, CACHÉS (jamais envoyés au navigateur) ;
 *   - `hints`    : deux indices rédigés en mots, jamais en code ;
 *   - `solution` : le corrigé, réservé au serveur (contrôle d'intégrité).
 *
 * Les sept premiers modules compilent en C (`c`), le huitième en C++ (`cpp`).
 * Les programmes lisent l'entrée standard avec `scanf`/`cin` ; les sorties sont
 * comparées après normalisation des espaces de fin de ligne. Les valeurs des
 * tests cachés diffèrent de l'exemple visible : recopier l'exemple ne suffit pas.
 */

module.exports = [
  // ═══════════════════════════════════════════════════════════════════════
  // Module 1 — Premier programme : structure, compilation, entrées/sorties
  // ═══════════════════════════════════════════════════════════════════════
  {
    id: 'c-c1-e1',
    chapter: 1,
    level: 'n1',
    language: 'c',
    title: 'Premier affichage personnalisé',
    goal: 'Lire un mot sur l’entrée standard et l’insérer dans une phrase affichée par printf.',
    brief: '<p>Le programme reçoit un prénom (un seul mot) sur l’entrée standard. Affichez la phrase <code>Bonjour, &lt;prénom&gt; !</code>.</p><p>L’exemple affiché doit vraiment venir de la lecture : une phrase écrite en dur ne passera pas les tests cachés.</p>',
    starter: `#include <stdio.h>

int main(void) {
    char nom[64];
    scanf("%63s", nom);

    /* À compléter : afficher « Bonjour, <nom> ! ». */

    return 0;
}
`,
    hints: [
      'Le message de sortie est affiché par une fonction de la bibliothèque d’entrées/sorties : elle reçoit un texte à trous et les valeurs à y insérer.',
      'Un texte se place dans un tableau de caractères et se désigne sans le symbole d’adresse : c’est la seule variable que l’on ne fait pas précéder d’un « & ».'
    ],
    examples: [
      { stdin: 'Monde', expected: 'Bonjour, Monde !', note: 'Le prénom lu est inséré dans la phrase.' }
    ],
    tests: [
      { label: 'Prénom court', stdin: 'Ali', expected: 'Bonjour, Ali !' },
      { label: 'Autre prénom', stdin: 'Sara', expected: 'Bonjour, Sara !' },
      { label: 'Prénom composé d’une majuscule', stdin: 'Z', expected: 'Bonjour, Z !' }
    ],
    solution: `#include <stdio.h>

int main(void) {
    char nom[64];
    if (scanf("%63s", nom) != 1) {
        return 0;
    }
    printf("Bonjour, %s !\\n", nom);
    return 0;
}
`
  },
  {
    id: 'c-c1-e2',
    chapter: 1,
    level: 'n1',
    language: 'c',
    title: 'Somme de deux nombres',
    goal: 'Lire deux entiers et calculer leur somme avec printf.',
    brief: '<p>Le programme reçoit deux entiers séparés par un espace. Affichez leur somme sous la forme <code>Somme : &lt;valeur&gt;</code>.</p>',
    starter: `#include <stdio.h>

int main(void) {
    int a, b;
    scanf("%d %d", &a, &b);

    /* À compléter : afficher la somme. */

    return 0;
}
`,
    hints: [
      'Le calcul se fait entre la lecture et l’affichage : rangez le résultat dans une variable avant de l’afficher, ou calculez-le directement dans l’appel d’affichage.',
      'Le format d’affichage d’un entier est « %d » dans les deux cas — lecture comme écriture.'
    ],
    examples: [
      { stdin: '3 4', expected: 'Somme : 7', note: '3 + 4 = 7.' }
    ],
    tests: [
      { label: 'Petits nombres', stdin: '2 3', expected: 'Somme : 5' },
      { label: 'Avec un négatif', stdin: '-4 9', expected: 'Somme : 5' },
      { label: 'Deux chiffres', stdin: '10 20', expected: 'Somme : 30' }
    ],
    solution: `#include <stdio.h>

int main(void) {
    int a, b;
    scanf("%d %d", &a, &b);
    printf("Somme : %d\\n", a + b);
    return 0;
}
`
  },
  {
    id: 'c-c1-e3',
    chapter: 1,
    level: 'n2',
    language: 'c',
    title: 'Deux valeurs dans une phrase',
    goal: 'Lire une chaîne et un entier, puis les placer dans un même affichage.',
    brief: '<p>Le programme reçoit un nom (un mot) puis un âge, séparés par un espace. Affichez <code>Nom : &lt;nom&gt;, age : &lt;age&gt;</code>.</p>',
    starter: `#include <stdio.h>

int main(void) {
    char nom[64];
    int age;
    scanf("%63s %d", nom, &age);

    /* À compléter : afficher le nom et l'âge. */

    return 0;
}
`,
    hints: [
      'L’ordre des valeurs passées à l’affichage doit suivre l’ordre des trous du texte : d’abord le texte du nom, puis l’entier.',
      'Deux trous de types différents cohabitent dans une même phrase : « %s » pour le nom, « %d » pour l’âge.'
    ],
    examples: [
      { stdin: 'Monde 30', expected: 'Nom : Monde, age : 30', note: 'Le nom et l’âge lus sont affichés.' }
    ],
    tests: [
      { label: 'Jeune utilisateur', stdin: 'Ali 20', expected: 'Nom : Ali, age : 20' },
      { label: 'Âge élevé', stdin: 'Sara 45', expected: 'Nom : Sara, age : 45' },
      { label: 'Âge nul', stdin: 'Paul 0', expected: 'Nom : Paul, age : 0' }
    ],
    solution: `#include <stdio.h>

int main(void) {
    char nom[64];
    int age;
    scanf("%63s %d", nom, &age);
    printf("Nom : %s, age : %d\\n", nom, age);
    return 0;
}
`
  },

  // ═══════════════════════════════════════════════════════════════════════
  // Module 2 — Variables, types et opérateurs
  // ═══════════════════════════════════════════════════════════════════════
  {
    id: 'c-c2-e1',
    chapter: 2,
    level: 'n2',
    language: 'c',
    title: 'Conversion Celsius vers Fahrenheit',
    goal: 'Utiliser un type décimal et un arrondi d’affichage.',
    brief: '<p>Le programme reçoit une température en degrés Celsius (nombre décimal). Affichez sa valeur en Fahrenheit sur la forme <code>F = &lt;valeur&gt;</code>, avec exactement deux décimales.</p><p>Formule : F = C × 9/5 + 32.</p>',
    starter: `#include <stdio.h>

int main(void) {
    double celsius;
    scanf("%lf", &celsius);

    /* À compléter : afficher la conversion avec deux décimales. */

    return 0;
}
`,
    hints: [
      'Une division entre deux entiers donne un résultat entier : pour conserver les décimales, les opérandes doivent être des nombres décimaux.',
      'Le format décimal de lecture d’un double est « %lf » ; à l’affichage, on peut fixer le nombre de décimales entre le « % » et le « f ».'
    ],
    examples: [
      { stdin: '25', expected: 'F = 77.00', note: '25 °C correspondent à 77 °F.' }
    ],
    tests: [
      { label: 'Point de congélation', stdin: '0', expected: 'F = 32.00' },
      { label: 'Eau bouillante', stdin: '100', expected: 'F = 212.00' },
      { label: 'Froid extrême', stdin: '-40', expected: 'F = -40.00' }
    ],
    solution: `#include <stdio.h>

int main(void) {
    double celsius;
    scanf("%lf", &celsius);
    printf("F = %.2f\\n", celsius * 9.0 / 5.0 + 32.0);
    return 0;
}
`
  },
  {
    id: 'c-c2-e2',
    chapter: 2,
    level: 'n2',
    language: 'c',
    title: 'Aire et périmètre d’un rectangle',
    goal: 'Enchaîner plusieurs calculs et plusieurs affichages.',
    brief: '<p>Le programme reçoit la largeur puis la hauteur d’un rectangle (entiers). Affichez l’aire sur une ligne puis le périmètre sur la suivante, comme dans l’exemple.</p>',
    starter: `#include <stdio.h>

int main(void) {
    int largeur, hauteur;
    scanf("%d %d", &largeur, &hauteur);

    /* À compléter : afficher l'aire puis le périmètre. */

    return 0;
}
`,
    hints: [
      'L’aire est le produit des deux dimensions ; le périmètre additionne deux fois chaque côté.',
      'Chaque information demandée occupe sa propre ligne : deux appels d’affichage, chacun terminé par un passage à la ligne.'
    ],
    examples: [
      { stdin: '2 7', expected: 'Aire : 14\nPerimetre : 18', note: 'Aire 2×7 = 14 ; périmètre 2×(2+7) = 18.' }
    ],
    tests: [
      { label: 'Rectangle 3 × 4', stdin: '3 4', expected: 'Aire : 12\nPerimetre : 14' },
      { label: 'Carré', stdin: '5 5', expected: 'Aire : 25\nPerimetre : 20' },
      { label: 'Rectangle allongé', stdin: '1 10', expected: 'Aire : 10\nPerimetre : 22' }
    ],
    solution: `#include <stdio.h>

int main(void) {
    int largeur, hauteur;
    scanf("%d %d", &largeur, &hauteur);
    printf("Aire : %d\\n", largeur * hauteur);
    printf("Perimetre : %d\\n", 2 * (largeur + hauteur));
    return 0;
}
`
  },
  {
    id: 'c-c2-e3',
    chapter: 2,
    level: 'n3',
    language: 'c',
    title: 'Moyenne de trois notes',
    goal: 'Éviter la division entière dans un calcul de moyenne.',
    brief: '<p>Le programme reçoit trois notes entières. Affichez leur moyenne sous la forme <code>Moyenne : &lt;valeur&gt;</code>, avec deux décimales.</p>',
    starter: `#include <stdio.h>

int main(void) {
    int a, b, c;
    scanf("%d %d %d", &a, &b, &c);

    /* À compléter : afficher la moyenne avec deux décimales. */

    return 0;
}
`,
    hints: [
      'La somme de trois entiers est un entier : c’est la division qui doit se faire en décimal, sans quoi la partie fractionnaire disparaît.',
      'Pour un résultat décimal, l’un des deux nombres divisés doit être un nombre à virgule.'
    ],
    examples: [
      { stdin: '12 15 9', expected: 'Moyenne : 12.00', note: '12 + 15 + 9 = 36 ; 36 / 3 = 12.00.' }
    ],
    tests: [
      { label: 'Notes identiques', stdin: '10 10 10', expected: 'Moyenne : 10.00' },
      { label: 'Avec un zéro', stdin: '0 5 10', expected: 'Moyenne : 5.00' },
      { label: 'Moyenne non ronde', stdin: '7 11 13', expected: 'Moyenne : 10.33' }
    ],
    solution: `#include <stdio.h>

int main(void) {
    int a, b, c;
    scanf("%d %d %d", &a, &b, &c);
    printf("Moyenne : %.2f\\n", (a + b + c) / 3.0);
    return 0;
}
`
  },

  // ═══════════════════════════════════════════════════════════════════════
  // Module 3 — Conditions et boucles
  // ═══════════════════════════════════════════════════════════════════════
  {
    id: 'c-c3-e1',
    chapter: 3,
    level: 'n2',
    language: 'c',
    title: 'Plus grand de trois nombres',
    goal: 'Comparer des valeurs avec des conditions successives.',
    brief: '<p>Le programme reçoit trois entiers. Affichez le plus grand sous la forme <code>Max : &lt;valeur&gt;</code>.</p>',
    starter: `#include <stdio.h>

int main(void) {
    int a, b, c;
    scanf("%d %d %d", &a, &b, &c);

    /* À compléter : afficher le plus grand des trois. */

    return 0;
}
`,
    hints: [
      'On peut garder un « candidat » et le remplacer chaque fois qu’une autre valeur le dépasse : deux comparaisons suffisent pour trois nombres.',
      'Attention aux valeurs négatives : initialiser le candidat au premier nombre évite de le fixer à zéro par erreur.'
    ],
    examples: [
      { stdin: '4 8 2', expected: 'Max : 8', note: '8 est le plus grand.' }
    ],
    tests: [
      { label: 'Croissants', stdin: '1 2 3', expected: 'Max : 3' },
      { label: 'Décroissants', stdin: '9 4 5', expected: 'Max : 9' },
      { label: 'Tous négatifs', stdin: '-1 -2 -3', expected: 'Max : -1' }
    ],
    solution: `#include <stdio.h>

int main(void) {
    int a, b, c;
    scanf("%d %d %d", &a, &b, &c);

    int maximum = a;
    if (b > maximum) {
        maximum = b;
    }
    if (c > maximum) {
        maximum = c;
    }
    printf("Max : %d\\n", maximum);
    return 0;
}
`
  },
  {
    id: 'c-c3-e2',
    chapter: 3,
    level: 'n3',
    language: 'c',
    title: 'Table de multiplication',
    goal: 'Écrire une boucle compteur et l’afficher ligne par ligne.',
    brief: '<p>Le programme reçoit un entier n. Affichez sa table de multiplication de 1 à 10, une ligne par produit, sous la forme <code>n x i = r</code>.</p>',
    starter: `#include <stdio.h>

int main(void) {
    int n;
    scanf("%d", &n);

    /* À compléter : afficher la table de 1 à 10. */

    return 0;
}
`,
    hints: [
      'Un compteur qui va de 1 à 10 inclus se pilote par une boucle : veillez à ce que la borne de fin soit bien atteinte.',
      'Chaque tour de boucle affiche sa ligne et se termine par un passage à la ligne ; le produit se calcule à l’intérieur du tour.'
    ],
    examples: [
      { stdin: '3', expected: '3 x 1 = 3\n3 x 2 = 6\n3 x 3 = 9\n3 x 4 = 12\n3 x 5 = 15\n3 x 6 = 18\n3 x 7 = 21\n3 x 8 = 24\n3 x 9 = 27\n3 x 10 = 30', note: 'Dix lignes, de 1 à 10.' }
    ],
    tests: [
      { label: 'Table de 2', stdin: '2', expected: '2 x 1 = 2\n2 x 2 = 4\n2 x 3 = 6\n2 x 4 = 8\n2 x 5 = 10\n2 x 6 = 12\n2 x 7 = 14\n2 x 8 = 16\n2 x 9 = 18\n2 x 10 = 20' },
      { label: 'Table de 5', stdin: '5', expected: '5 x 1 = 5\n5 x 2 = 10\n5 x 3 = 15\n5 x 4 = 20\n5 x 5 = 25\n5 x 6 = 30\n5 x 7 = 35\n5 x 8 = 40\n5 x 9 = 45\n5 x 10 = 50' },
      { label: 'Cas nul', stdin: '0', expected: '0 x 1 = 0\n0 x 2 = 0\n0 x 3 = 0\n0 x 4 = 0\n0 x 5 = 0\n0 x 6 = 0\n0 x 7 = 0\n0 x 8 = 0\n0 x 9 = 0\n0 x 10 = 0' }
    ],
    solution: `#include <stdio.h>

int main(void) {
    int n;
    scanf("%d", &n);

    for (int i = 1; i <= 10; i++) {
        printf("%d x %d = %d\\n", n, i, n * i);
    }
    return 0;
}
`
  },
  {
    id: 'c-c3-e3',
    chapter: 3,
    level: 'n3',
    language: 'c',
    title: 'Somme des entiers de 1 à n',
    goal: 'Accumuler un résultat dans une boucle.',
    brief: '<p>Le programme reçoit un entier n. Affichez la somme 1 + 2 + … + n sous la forme <code>Somme : &lt;valeur&gt;</code>.</p>',
    starter: `#include <stdio.h>

int main(void) {
    int n;
    scanf("%d", &n);

    /* À compléter : calculer la somme de 1 à n. */

    return 0;
}
`,
    hints: [
      'Un accumulateur se déclare et s’initialise avant la boucle, puis grandit à chaque tour.',
      'La borne de fin d’une boucle compteur est incluse si la condition utilise « <= » : pour aller jusqu’à n, c’est cette forme qu’il faut.'
    ],
    examples: [
      { stdin: '10', expected: 'Somme : 55', note: '1 + 2 + … + 10 = 55.' }
    ],
    tests: [
      { label: 'Cas nul', stdin: '0', expected: 'Somme : 0' },
      { label: 'Un seul terme', stdin: '1', expected: 'Somme : 1' },
      { label: 'Grande valeur', stdin: '100', expected: 'Somme : 5050' }
    ],
    solution: `#include <stdio.h>

int main(void) {
    int n;
    scanf("%d", &n);

    int somme = 0;
    for (int i = 1; i <= n; i++) {
        somme += i;
    }
    printf("Somme : %d\\n", somme);
    return 0;
}
`
  },

  // ═══════════════════════════════════════════════════════════════════════
  // Module 4 — Tableaux et chaînes de caractères
  // ═══════════════════════════════════════════════════════════════════════
  {
    id: 'c-c4-e1',
    chapter: 4,
    level: 'n3',
    language: 'c',
    title: 'Somme et maximum d’un tableau',
    goal: 'Lire un tableau puis le parcourir une fois pour deux résultats.',
    brief: '<p>Le programme reçoit un entier n, puis n entiers. Affichez la somme sur une ligne puis le maximum sur la suivante.</p>',
    starter: `#include <stdio.h>

int main(void) {
    int n;
    scanf("%d", &n);
    int tableau[100];
    for (int i = 0; i < n; i++) {
        scanf("%d", &tableau[i]);
    }

    /* À compléter : afficher la somme puis le maximum. */

    return 0;
}
`,
    hints: [
      'Comptez à partir de zéro : un tableau de n cases est indexé de 0 à n − 1.',
      'Le maximum ne se devine pas : partez du premier élément et remplacez le candidat dès qu’un élément le dépasse.'
    ],
    examples: [
      { stdin: '5\n12 15 14 9 18', expected: 'Somme : 68\nMax : 18', note: 'Somme 68 ; maximum 18.' }
    ],
    tests: [
      { label: 'Trois éléments croissants', stdin: '3\n1 2 3', expected: 'Somme : 6\nMax : 3' },
      { label: 'Un seul élément', stdin: '1\n7', expected: 'Somme : 7\nMax : 7' },
      { label: 'Tous négatifs', stdin: '4\n-1 -2 -3 -4', expected: 'Somme : -10\nMax : -1' }
    ],
    solution: `#include <stdio.h>

int main(void) {
    int n;
    scanf("%d", &n);
    int tableau[100];
    for (int i = 0; i < n; i++) {
        scanf("%d", &tableau[i]);
    }

    int somme = 0;
    int maximum = tableau[0];
    for (int i = 0; i < n; i++) {
        somme += tableau[i];
        if (tableau[i] > maximum) {
            maximum = tableau[i];
        }
    }
    printf("Somme : %d\\n", somme);
    printf("Max : %d\\n", maximum);
    return 0;
}
`
  },
  {
    id: 'c-c4-e2',
    chapter: 4,
    level: 'n3',
    language: 'c',
    title: 'Compter les voyelles d’un mot',
    goal: 'Parcourir une chaîne de caractères caractère par caractère.',
    brief: '<p>Le programme reçoit un mot (un seul mot, sans espace). Affichez le nombre de voyelles qu’il contient, sous la forme <code>Voyelles : &lt;n&gt;</code>. Les voyelles sont <code>a e i o u y</code>, majuscules comme minuscules.</p>',
    starter: `#include <stdio.h>

int main(void) {
    char mot[128];
    scanf("%127s", mot);

    /* À compléter : compter les voyelles. */

    return 0;
}
`,
    hints: [
      'Une chaîne se termine par un caractère de fin : c’est lui qui indique au parcours quand s’arrêter, pas la taille du tableau.',
      'Pour ignorer la casse, ramenez chaque caractère en minuscule avant de le comparer à la liste des voyelles.'
    ],
    examples: [
      { stdin: 'python', expected: 'Voyelles : 2', note: 'y et o sont des voyelles.' }
    ],
    tests: [
      { label: 'Mot courant', stdin: 'bonjour', expected: 'Voyelles : 3' },
      { label: 'Suite de voyelles', stdin: 'eau', expected: 'Voyelles : 3' },
      { label: 'Majuscules', stdin: 'BONJOUR', expected: 'Voyelles : 3' }
    ],
    solution: `#include <stdio.h>
#include <ctype.h>

int main(void) {
    char mot[128];
    if (scanf("%127s", mot) != 1) {
        return 0;
    }

    int compte = 0;
    for (int i = 0; mot[i] != '\\0'; i++) {
        char c = (char)tolower((unsigned char)mot[i]);
        if (c == 'a' || c == 'e' || c == 'i' || c == 'o' || c == 'u' || c == 'y') {
            compte++;
        }
    }
    printf("Voyelles : %d\\n", compte);
    return 0;
}
`
  },
  {
    id: 'c-c4-e3',
    chapter: 4,
    level: 'n4',
    language: 'c',
    title: 'Afficher un tableau à l’envers',
    goal: 'Parcourir un tableau dans le sens inverse sans séparateur superflu.',
    brief: '<p>Le programme reçoit un entier n, puis n entiers. Affichez-les dans l’ordre inverse, séparés par une espace, sur une seule ligne.</p>',
    starter: `#include <stdio.h>

int main(void) {
    int n;
    scanf("%d", &n);
    int tableau[100];
    for (int i = 0; i < n; i++) {
        scanf("%d", &tableau[i]);
    }

    /* À compléter : afficher les valeurs de la dernière à la première. */

    return 0;
}
`,
    hints: [
      'Le parcours à l’envers commence au dernier indice valide — n − 1 — et décroît jusqu’à zéro inclus.',
      'Pour éviter une espace parasite après la dernière valeur, ne placez le séparateur qu’entre deux valeurs.'
    ],
    examples: [
      { stdin: '5\n10 20 30 40 50', expected: '50 40 30 20 10', note: 'L’ordre est inversé.' }
    ],
    tests: [
      { label: 'Trois éléments', stdin: '3\n1 2 3', expected: '3 2 1' },
      { label: 'Un seul élément', stdin: '1\n9', expected: '9' },
      { label: 'Quatre éléments', stdin: '4\n5 6 7 8', expected: '8 7 6 5' }
    ],
    solution: `#include <stdio.h>

int main(void) {
    int n;
    scanf("%d", &n);
    int tableau[100];
    for (int i = 0; i < n; i++) {
        scanf("%d", &tableau[i]);
    }

    for (int i = n - 1; i >= 0; i--) {
        printf("%d", tableau[i]);
        if (i > 0) {
            printf(" ");
        }
    }
    printf("\\n");
    return 0;
}
`
  },

  // ═══════════════════════════════════════════════════════════════════════
  // Module 5 — Fonctions
  // ═══════════════════════════════════════════════════════════════════════
  {
    id: 'c-c5-e1',
    chapter: 5,
    level: 'n3',
    language: 'c',
    title: 'Une fonction qui renvoie une valeur',
    goal: 'Écrire une fonction avec paramètre et valeur de retour.',
    brief: '<p>Complétez la fonction <code>carre</code> pour qu’elle renvoie le carré de son argument, puis affichez son résultat sous la forme <code>Carre : &lt;valeur&gt;</code>.</p>',
    starter: `#include <stdio.h>

int carre(int n) {
    /* À compléter : renvoyer le carré de n. */
    return 0;
}

int main(void) {
    int valeur;
    scanf("%d", &valeur);
    printf("Carre : %d\\n", carre(valeur));
    return 0;
}
`,
    hints: [
      'Une fonction déclarée pour renvoyer un entier doit se terminer par l’instruction qui transmet cette valeur à l’appelant.',
      'Le mot-clé de retour est suivi de l’expression à renvoyer, et non d’un affichage.'
    ],
    examples: [
      { stdin: '7', expected: 'Carre : 49', note: '7² = 49.' }
    ],
    tests: [
      { label: 'Petit nombre', stdin: '4', expected: 'Carre : 16' },
      { label: 'Zéro', stdin: '0', expected: 'Carre : 0' },
      { label: 'Nombre à deux chiffres', stdin: '12', expected: 'Carre : 144' }
    ],
    solution: `#include <stdio.h>

int carre(int n) {
    return n * n;
}

int main(void) {
    int valeur;
    scanf("%d", &valeur);
    printf("Carre : %d\\n", carre(valeur));
    return 0;
}
`
  },
  {
    id: 'c-c5-e2',
    chapter: 5,
    level: 'n3',
    language: 'c',
    title: 'Fonction de test booléenne',
    goal: 'Faire renvoyer à une fonction un résultat de type vrai/faux.',
    brief: '<p>Complétez la fonction <code>est_pair</code> pour qu’elle renvoie vrai si son argument est pair, faux sinon. Le programme affiche <code>Pair</code> ou <code>Impair</code>.</p>',
    starter: `#include <stdio.h>

int est_pair(int n) {
    /* À compléter : renvoyer 1 si n est pair, 0 sinon. */
    return 0;
}

int main(void) {
    int valeur;
    scanf("%d", &valeur);
    printf("%s\\n", est_pair(valeur) ? "Pair" : "Impair");
    return 0;
}
`,
    hints: [
      'En C, il n’existe pas de type booléen d’origine : un entier nul vaut faux, tout entier non nul vaut vrai.',
      'La parité se teste avec le reste de la division par deux : un reste nul signifie que le nombre est pair.'
    ],
    examples: [
      { stdin: '10', expected: 'Pair', note: '10 est pair.' }
    ],
    tests: [
      { label: 'Nombre pair', stdin: '4', expected: 'Pair' },
      { label: 'Nombre impair', stdin: '9', expected: 'Impair' },
      { label: 'Zéro est pair', stdin: '0', expected: 'Pair' }
    ],
    solution: `#include <stdio.h>

int est_pair(int n) {
    return n % 2 == 0;
}

int main(void) {
    int valeur;
    scanf("%d", &valeur);
    printf("%s\\n", est_pair(valeur) ? "Pair" : "Impair");
    return 0;
}
`
  },
  {
    id: 'c-c5-e3',
    chapter: 5,
    level: 'n4',
    language: 'c',
    title: 'Factorielle d’un entier',
    goal: 'Écrire une fonction qui accumule dans une boucle.',
    brief: '<p>Complétez la fonction <code>factorielle</code> qui renvoie le produit 1 × 2 × … × n, avec la convention 1 pour n = 0. Affichez le résultat sous la forme <code>Factorielle : &lt;valeur&gt;</code>.</p>',
    starter: `#include <stdio.h>

long factorielle(int n) {
    /* À compléter : renvoyer 1 x 2 x ... x n. */
    return 0;
}

int main(void) {
    int valeur;
    scanf("%d", &valeur);
    printf("Factorielle : %ld\\n", factorielle(valeur));
    return 0;
}
`,
    hints: [
      'Un produit s’accumule comme une somme, mais l’élément neutre n’est pas zéro : multiplier par zéro effacerait tout le résultat.',
      'Pour n = 0, la boucle ne s’exécute pas : la valeur initiale de l’accumulateur est donc déjà le bon résultat.'
    ],
    examples: [
      { stdin: '5', expected: 'Factorielle : 120', note: '1 × 2 × 3 × 4 × 5 = 120.' }
    ],
    tests: [
      { label: 'Cas zéro', stdin: '0', expected: 'Factorielle : 1' },
      { label: 'Un', stdin: '1', expected: 'Factorielle : 1' },
      { label: 'Six', stdin: '6', expected: 'Factorielle : 720' }
    ],
    solution: `#include <stdio.h>

long factorielle(int n) {
    long produit = 1;
    for (int i = 1; i <= n; i++) {
        produit *= i;
    }
    return produit;
}

int main(void) {
    int valeur;
    scanf("%d", &valeur);
    printf("Factorielle : %ld\\n", factorielle(valeur));
    return 0;
}
`
  },

  // ═══════════════════════════════════════════════════════════════════════
  // Module 6 — Pointeurs et mémoire
  // ═══════════════════════════════════════════════════════════════════════
  {
    id: 'c-c6-e1',
    chapter: 6,
    level: 'n3',
    language: 'c',
    title: 'Échanger deux valeurs par pointeurs',
    goal: 'Modifier les variables de l’appelant par l’intermédiaire d’adresses.',
    brief: '<p>Complétez la fonction <code>echanger</code> qui permute les valeurs pointées par ses deux paramètres. Le programme lit deux entiers, les échange, puis affiche <code>a = &lt;valeur&gt;, b = &lt;valeur&gt;</code>.</p>',
    starter: `#include <stdio.h>

void echanger(int *a, int *b) {
    /* À compléter : permuter les valeurs pointées. */
}

int main(void) {
    int a, b;
    scanf("%d %d", &a, &b);
    echanger(&a, &b);
    printf("a = %d, b = %d\\n", a, b);
    return 0;
}
`,
    hints: [
      'Une permutation réelle a besoin d’une troisième case : on y met l’une des deux valeurs avant de la remplacer, sinon elle est perdue.',
      'Un paramètre de type pointeur ne contient pas une valeur mais une adresse : pour atteindre la valeur visée, il faut déréférencer.'
    ],
    examples: [
      { stdin: '10 20', expected: 'a = 20, b = 10', note: 'Les deux valeurs ont été permutées.' }
    ],
    tests: [
      { label: 'Petits nombres', stdin: '1 2', expected: 'a = 2, b = 1' },
      { label: 'Valeurs identiques', stdin: '5 5', expected: 'a = 5, b = 5' },
      { label: 'Avec un négatif', stdin: '-3 7', expected: 'a = 7, b = -3' }
    ],
    solution: `#include <stdio.h>

void echanger(int *a, int *b) {
    int temporaire = *a;
    *a = *b;
    *b = temporaire;
}

int main(void) {
    int a, b;
    scanf("%d %d", &a, &b);
    echanger(&a, &b);
    printf("a = %d, b = %d\\n", a, b);
    return 0;
}
`
  },
  {
    id: 'c-c6-e2',
    chapter: 6,
    level: 'n4',
    language: 'c',
    title: 'Deux résultats par paramètres de sortie',
    goal: 'Faire produire plusieurs valeurs à une fonction sans rien renvoyer.',
    brief: '<p>Complétez <code>somme_produit</code> qui place dans les cases pointées par <code>s</code> et <code>p</code> la somme et le produit de ses deux premiers paramètres. Le programme affiche la somme puis le produit.</p>',
    starter: `#include <stdio.h>

void somme_produit(int a, int b, int *s, int *p) {
    /* À compléter : écrire la somme dans *s et le produit dans *p. */
}

int main(void) {
    int a, b, somme, produit;
    scanf("%d %d", &a, &b);
    somme_produit(a, b, &somme, &produit);
    printf("Somme : %d\\n", somme);
    printf("Produit : %d\\n", produit);
    return 0;
}
`,
    hints: [
      'Le rôle de la fonction est d’écrire à l’adresse reçue : c’est une affectation à travers le pointeur, pas un retour.',
      'Les deux paramètres de sortie sont distincts : l’ordre dans lequel vous les remplissez n’a pas d’importance, mais chacun doit recevoir le bon calcul.'
    ],
    examples: [
      { stdin: '2 9', expected: 'Somme : 11\nProduit : 18', note: 'Somme 11 ; produit 18.' }
    ],
    tests: [
      { label: 'Petits nombres', stdin: '3 4', expected: 'Somme : 7\nProduit : 12' },
      { label: 'Avec un zéro', stdin: '0 5', expected: 'Somme : 5\nProduit : 0' },
      { label: 'Avec un négatif', stdin: '-2 6', expected: 'Somme : 4\nProduit : -12' }
    ],
    solution: `#include <stdio.h>

void somme_produit(int a, int b, int *s, int *p) {
    *s = a + b;
    *p = a * b;
}

int main(void) {
    int a, b, somme, produit;
    scanf("%d %d", &a, &b);
    somme_produit(a, b, &somme, &produit);
    printf("Somme : %d\\n", somme);
    printf("Produit : %d\\n", produit);
    return 0;
}
`
  },
  {
    id: 'c-c6-e3',
    chapter: 6,
    level: 'n4',
    language: 'c',
    title: 'Parcourir un tableau par pointeur',
    goal: 'Utiliser l’arithmétique des pointeurs pour avancer dans un tableau.',
    brief: '<p>Complétez le parcours pour additionner les cases du tableau à l’aide d’un pointeur : le nom d’un tableau désigne l’adresse de sa première case, et l’incrémenter avance d’une case. Affichez <code>Somme : &lt;valeur&gt;</code>.</p>',
    starter: `#include <stdio.h>

int main(void) {
    int n;
    scanf("%d", &n);
    int tableau[100];
    for (int i = 0; i < n; i++) {
        scanf("%d", &tableau[i]);
    }

    int somme = 0;
    int *p = tableau;
    /* À compléter : accumuler *p puis avancer le pointeur. */

    printf("Somme : %d\\n", somme);
    return 0;
}
`,
    hints: [
      'Le pointeur commence sur la première case ; après chaque ajout, il faut le faire avancer d’une case.',
      'Le déréférencement donne la valeur contenue dans la case visée : c’est cette valeur qui entre dans l’accumulateur.'
    ],
    examples: [
      { stdin: '5\n1 1 1 1 1', expected: 'Somme : 5', note: 'Cinq cases valant 1.' }
    ],
    tests: [
      { label: 'Trois valeurs', stdin: '3\n1 2 3', expected: 'Somme : 6' },
      { label: 'Un seul élément', stdin: '1\n42', expected: 'Somme : 42' },
      { label: 'Valeurs en dizaines', stdin: '4\n10 20 30 40', expected: 'Somme : 100' }
    ],
    solution: `#include <stdio.h>

int main(void) {
    int n;
    scanf("%d", &n);
    int tableau[100];
    for (int i = 0; i < n; i++) {
        scanf("%d", &tableau[i]);
    }

    int somme = 0;
    int *p = tableau;
    for (int i = 0; i < n; i++) {
        somme += *p;
        p++;
    }
    printf("Somme : %d\\n", somme);
    return 0;
}
`
  },

  // ═══════════════════════════════════════════════════════════════════════
  // Module 7 — Structures et fichiers
  // ═══════════════════════════════════════════════════════════════════════
  {
    id: 'c-c7-e1',
    chapter: 7,
    level: 'n4',
    language: 'c',
    title: 'Structurer un point',
    goal: 'Déclarer une structure et accéder à ses champs.',
    brief: '<p>Complétez le programme pour stocker deux coordonnées dans une structure <code>Point</code> et les afficher sous la forme <code>Point(x, y)</code>.</p>',
    starter: `#include <stdio.h>

struct Point {
    int x;
    int y;
};

int main(void) {
    struct Point p;
    scanf("%d %d", &p.x, &p.y);

    /* À compléter : afficher « Point(x, y) ». */

    return 0;
}
`,
    hints: [
      'Un champ de structure s’atteint en écrivant le nom de la variable, un point, puis le nom du champ.',
      'Les deux champs sont lus sur une seule ligne : la lecture les sépare, l’affichage doit les recomposer dans l’ordre demandé.'
    ],
    examples: [
      { stdin: '2 7', expected: 'Point(2, 7)', note: 'Coordonnées x = 2 et y = 7.' }
    ],
    tests: [
      { label: 'Coordonnées positives', stdin: '3 4', expected: 'Point(3, 4)' },
      { label: 'Origine', stdin: '0 0', expected: 'Point(0, 0)' },
      { label: 'Abscisse négative', stdin: '-1 5', expected: 'Point(-1, 5)' }
    ],
    solution: `#include <stdio.h>

struct Point {
    int x;
    int y;
};

int main(void) {
    struct Point p;
    scanf("%d %d", &p.x, &p.y);
    printf("Point(%d, %d)\\n", p.x, p.y);
    return 0;
}
`
  },
  {
    id: 'c-c7-e2',
    chapter: 7,
    level: 'n4',
    language: 'c',
    title: 'Fiche d’un étudiant',
    goal: 'Combiner une chaîne et un décimal dans une même structure.',
    brief: '<p>Complétez le programme pour lire un nom et une note, les ranger dans une structure <code>Etudiant</code>, puis afficher le nom et la note avec deux décimales, comme dans l’exemple.</p>',
    starter: `#include <stdio.h>

struct Etudiant {
    char nom[64];
    double note;
};

int main(void) {
    struct Etudiant e;
    scanf("%63s %lf", e.nom, &e.note);

    /* À compléter : afficher le nom puis la note. */

    return 0;
}
`,
    hints: [
      'Un champ de type tableau de caractères n’a pas besoin du symbole d’adresse dans la lecture : il est déjà une adresse.',
      'La note est un décimal : son affichage doit fixer le nombre de décimales pour être identique quelle que soit la valeur.'
    ],
    examples: [
      { stdin: 'Marie 18.25', expected: 'Nom : Marie\nNote : 18.25', note: 'Nom et note affichés sur deux lignes.' }
    ],
    tests: [
      { label: 'Note décimale', stdin: 'Ali 15.5', expected: 'Nom : Ali\nNote : 15.50' },
      { label: 'Note nulle', stdin: 'Sara 0', expected: 'Nom : Sara\nNote : 0.00' },
      { label: 'Note entière', stdin: 'Paul 20', expected: 'Nom : Paul\nNote : 20.00' }
    ],
    solution: `#include <stdio.h>

struct Etudiant {
    char nom[64];
    double note;
};

int main(void) {
    struct Etudiant e;
    scanf("%63s %lf", e.nom, &e.note);
    printf("Nom : %s\\n", e.nom);
    printf("Note : %.2f\\n", e.note);
    return 0;
}
`
  },
  {
    id: 'c-c7-e3',
    chapter: 7,
    level: 'n4',
    language: 'c',
    title: 'Structure passée à une fonction',
    goal: 'Passer une structure en paramètre et calculer à partir de ses champs.',
    brief: '<p>Complétez la fonction <code>aire</code> qui reçoit un rectangle et renvoie le produit de sa largeur par sa hauteur. Le programme lit les deux dimensions et affiche <code>Aire : &lt;valeur&gt;</code>.</p>',
    starter: `#include <stdio.h>

struct Rectangle {
    int largeur;
    int hauteur;
};

int aire(struct Rectangle r) {
    /* À compléter : renvoyer l'aire. */
    return 0;
}

int main(void) {
    struct Rectangle rect;
    scanf("%d %d", &rect.largeur, &rect.hauteur);
    printf("Aire : %d\\n", aire(rect));
    return 0;
}
`,
    hints: [
      'Le paramètre est une copie complète de la structure : ses champs s’atteignent avec le point, exactement comme dans le programme principal.',
      'La fonction doit renvoyer la valeur ; l’affichage, lui, reste à la charge de l’appelant.'
    ],
    examples: [
      { stdin: '6 7', expected: 'Aire : 42', note: '6 × 7 = 42.' }
    ],
    tests: [
      { label: 'Rectangle 3 × 4', stdin: '3 4', expected: 'Aire : 12' },
      { label: 'Carré', stdin: '5 5', expected: 'Aire : 25' },
      { label: 'Carré unité', stdin: '1 1', expected: 'Aire : 1' }
    ],
    solution: `#include <stdio.h>

struct Rectangle {
    int largeur;
    int hauteur;
};

int aire(struct Rectangle r) {
    return r.largeur * r.hauteur;
}

int main(void) {
    struct Rectangle rect;
    scanf("%d %d", &rect.largeur, &rect.hauteur);
    printf("Aire : %d\\n", aire(rect));
    return 0;
}
`
  },

  // ═══════════════════════════════════════════════════════════════════════
  // Module 8 — Premiers pas en C++
  // ═══════════════════════════════════════════════════════════════════════
  {
    id: 'c-c8-e1',
    chapter: 8,
    level: 'n4',
    language: 'cpp',
    title: 'Entrées/sorties C++',
    goal: 'Utiliser les flux cin/cout à la place de scanf/printf.',
    brief: '<p>En C++, l’affichage ne passe plus par une fonction à format mais par un flux. Complétez le programme pour lire un entier et afficher <code>Carre : &lt;valeur&gt;</code>.</p>',
    starter: `#include <iostream>
using namespace std;

int main() {
    int n;
    cin >> n;

    /* À compléter : afficher « Carre : <n²> ». */

    return 0;
}
`,
    hints: [
      'L’opérateur d’insertion dans un flux s’enchaîne : on peut écrire un texte, puis une valeur, dans le même ordre qu’on veut les voir apparaître.',
      'Le passage à la ligne a son propre symbole en C++ : il s’insère dans le flux après la valeur.'
    ],
    examples: [
      { stdin: '7', expected: 'Carre : 49', note: '7² = 49.' }
    ],
    tests: [
      { label: 'Petit nombre', stdin: '5', expected: 'Carre : 25' },
      { label: 'Zéro', stdin: '0', expected: 'Carre : 0' },
      { label: 'Nombre à deux chiffres', stdin: '12', expected: 'Carre : 144' }
    ],
    solution: `#include <iostream>
using namespace std;

int main() {
    int n;
    cin >> n;
    cout << "Carre : " << n * n << endl;
    return 0;
}
`
  },
  {
    id: 'c-c8-e2',
    chapter: 8,
    level: 'n4',
    language: 'cpp',
    title: 'Première classe C++',
    goal: 'Regrouper des données et un comportement dans une classe.',
    brief: '<p>Complétez la méthode <code>aire</code> de la classe <code>Rectangle</code> pour qu’elle renvoie le produit de ses deux attributs. Le programme lit largeur et hauteur puis affiche <code>Aire : &lt;valeur&gt;</code>.</p>',
    starter: `#include <iostream>
using namespace std;

class Rectangle {
public:
    int largeur;
    int hauteur;

    int aire() const {
        /* À compléter : renvoyer l'aire. */
        return 0;
    }
};

int main() {
    Rectangle r;
    cin >> r.largeur >> r.hauteur;
    cout << "Aire : " << r.aire() << endl;
    return 0;
}
`,
    hints: [
      'À l’intérieur d’une méthode, les attributs de l’objet sont accessibles directement par leur nom.',
      'La méthode est déclarée const : elle promet de ne pas modifier l’objet, elle ne peut donc que lire les attributs et renvoyer un résultat.'
    ],
    examples: [
      { stdin: '6 7', expected: 'Aire : 42', note: '6 × 7 = 42.' }
    ],
    tests: [
      { label: 'Rectangle 3 × 4', stdin: '3 4', expected: 'Aire : 12' },
      { label: 'Carré', stdin: '5 5', expected: 'Aire : 25' },
      { label: 'Rectangle 2 × 8', stdin: '2 8', expected: 'Aire : 16' }
    ],
    solution: `#include <iostream>
using namespace std;

class Rectangle {
public:
    int largeur;
    int hauteur;

    int aire() const {
        return largeur * hauteur;
    }
};

int main() {
    Rectangle r;
    cin >> r.largeur >> r.hauteur;
    cout << "Aire : " << r.aire() << endl;
    return 0;
}
`
  },
  {
    id: 'c-c8-e3',
    chapter: 8,
    level: 'n5',
    language: 'cpp',
    title: 'Conteneur dynamique',
    goal: 'Utiliser un conteneur de la bibliothèque standard à la place d’un tableau figé.',
    brief: '<p>Complétez le parcours pour additionner les valeurs d’un <code>vector</code>. Le programme lit un entier n, puis n valeurs, et affiche <code>Somme : &lt;valeur&gt;</code>.</p>',
    starter: `#include <iostream>
#include <vector>
using namespace std;

int main() {
    int n;
    cin >> n;
    vector<int> valeurs(n);
    for (int i = 0; i < n; i++) {
        cin >> valeurs[i];
    }

    int somme = 0;
    /* À compléter : parcourir le vector et accumuler. */

    cout << "Somme : " << somme << endl;
    return 0;
}
`,
    hints: [
      'Un conteneur connaît sa taille : il se parcourt sans avoir à mémoriser n une seconde fois.',
      'La forme moderne de parcours donne directement chaque valeur, sans passer par un indice.'
    ],
    examples: [
      { stdin: '5\n2 4 6 8 10', expected: 'Somme : 30', note: '2+4+6+8+10 = 30.' }
    ],
    tests: [
      { label: 'Trois valeurs', stdin: '3\n1 2 3', expected: 'Somme : 6' },
      { label: 'Un seul élément', stdin: '1\n42', expected: 'Somme : 42' },
      { label: 'Valeurs en dizaines', stdin: '4\n10 20 30 40', expected: 'Somme : 100' }
    ],
    solution: `#include <iostream>
#include <vector>
using namespace std;

int main() {
    int n;
    cin >> n;
    vector<int> valeurs(n);
    for (int i = 0; i < n; i++) {
        cin >> valeurs[i];
    }

    int somme = 0;
    for (int valeur : valeurs) {
        somme += valeur;
    }

    cout << "Somme : " << somme << endl;
    return 0;
}
`
  }
];

/**
 * Chapitre 2 — Conditions et boucles.
 *
 * Structure if/else, opérateur ternaire, boucles for et construction
 * progressive d'une chaîne.
 */
'use strict';

module.exports = [
  {
    id: 'java2-c2-e1',
    chapter: 2,
    level: 'n1',
    language: 'java',
    title: 'Pair ou impair',
    goal: 'Utiliser une condition et l’opérateur modulo.',
    brief: '<p>Le programme reçoit un entier <code>n</code>. Affichez <code>pair</code> si <code>n</code> ' +
      'est divisible par 2, sinon <code>impair</code>.</p>',
    starter: `import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt();

        // À compléter : afficher "pair" ou "impair".
    }
}
`,
    hints: [
      'Le reste de la division par 2 s’obtient avec n % 2.',
      'Une condition n % 2 == 0 signifie que le nombre est pair.'
    ],
    examples: [
      { stdin: '7', expected: 'impair', note: '7 est impair.' }
    ],
    tests: [
      { label: 'Nombre pair', stdin: '4', expected: 'pair' },
      { label: 'Zéro', stdin: '0', expected: 'pair' },
      { label: 'Grand impair', stdin: '13', expected: 'impair' }
    ],
    solution: `import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt();
        System.out.println(n % 2 == 0 ? "pair" : "impair");
    }
}
`
  },
  {
    id: 'java2-c2-e2',
    chapter: 2,
    level: 'n1',
    language: 'java',
    title: 'Somme des entiers de 1 à n',
    goal: 'Accumuler dans une boucle.',
    brief: '<p>Le programme reçoit un entier <code>n</code>. Calculez la somme <code>1 + 2 + … + n</code> ' +
      'avec une boucle et affichez <code>somme : X</code>.</p>',
    starter: `import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt();
        int somme = 0;

        // À compléter : boucler de 1 à n et accumuler.

        // À compléter : afficher "somme : " suivi du total.
    }
}
`,
    hints: [
      'Une boucle for (int i = 1; i <= n; i++) parcourt les entiers de 1 à n.',
      'Ajoute chaque i à la variable somme, puis affiche le total à la fin.'
    ],
    examples: [
      { stdin: '5', expected: 'somme : 15', note: '1+2+3+4+5 = 15.' }
    ],
    tests: [
      { label: 'Un seul terme', stdin: '1', expected: 'somme : 1' },
      { label: 'Dix termes', stdin: '10', expected: 'somme : 55' },
      { label: 'Cent termes', stdin: '100', expected: 'somme : 5050' }
    ],
    solution: `import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt();
        int somme = 0;
        for (int i = 1; i <= n; i++) {
            somme += i;
        }
        System.out.println("somme : " + somme);
    }
}
`
  },
  {
    id: 'java2-c2-e3',
    chapter: 2,
    level: 'n3',
    language: 'java',
    title: 'Suite de Fibonacci',
    goal: 'Combiner boucle et construction progressive d’une sortie.',
    brief: '<p>Le programme reçoit un entier <code>n</code>. Affichez les <code>n</code> premiers termes ' +
      'de la suite de Fibonacci, séparés par des espaces, en commençant par 0 et 1.</p>',
    starter: `import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt();

        // À compléter : construire la suite 0 1 1 2 3 ... sur n termes.
        // Pense à ne pas mettre d'espace avant le premier terme.
    }
}
`,
    hints: [
      'Garde deux variables a = 0 et b = 1, et calcule la suivante à chaque tour.',
      'Utilise un StringBuilder et un test (i > 0) pour n’ajouter l’espace qu’à partir du deuxième terme.'
    ],
    examples: [
      { stdin: '5', expected: '0 1 1 2 3', note: 'Cinq premiers termes.' }
    ],
    tests: [
      { label: 'Un seul terme', stdin: '1', expected: '0' },
      { label: 'Huit termes', stdin: '8', expected: '0 1 1 2 3 5 8 13' },
      { label: 'Trois termes', stdin: '3', expected: '0 1 1' }
    ],
    solution: `import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt();
        StringBuilder sb = new StringBuilder();
        int a = 0;
        int b = 1;
        for (int i = 0; i < n; i++) {
            if (i > 0) {
                sb.append(' ');
            }
            sb.append(a);
            int suivant = a + b;
            a = b;
            b = suivant;
        }
        System.out.println(sb.toString());
    }
}
`
  }
];

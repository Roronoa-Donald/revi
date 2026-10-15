/**
 * Chapitre 3 — Tableaux, ArrayList et méthodes.
 *
 * Parcours de tableaux, accumulation, inversion et algorithme de primalité.
 */
'use strict';

module.exports = [
  {
    id: 'java2-c3-e1',
    chapter: 3,
    level: 'n1',
    language: 'java',
    title: 'Maximum d’un tableau',
    goal: 'Parcourir un tableau pour en extraire le maximum.',
    brief: '<p>Le programme reçoit un entier <code>n</code>, puis <code>n</code> entiers. Affichez ' +
      '<code>max : X</code> où <code>X</code> est la plus grande valeur du tableau.</p>',
    starter: `import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt();
        int[] valeurs = new int[n];
        for (int i = 0; i < n; i++) {
            valeurs[i] = sc.nextInt();
        }

        // À compléter : parcourir le tableau et afficher "max : " suivi du maximum.
    }
}
`,
    hints: [
      'Initialise le maximum avec la première valeur (valeurs[0]), pas avec 0 : des valeurs négatives seraient mal comparées.',
      'Boucle à partir de l’indice 1 et remplace le maximum dès qu’une valeur est plus grande.'
    ],
    examples: [
      { stdin: '5\n3\n9\n2\n7\n4', expected: 'max : 9', note: 'La plus grande valeur est 9.' }
    ],
    tests: [
      { label: 'Valeurs identiques', stdin: '3\n1\n1\n1', expected: 'max : 1' },
      { label: 'Tout négatif', stdin: '4\n-5\n-2\n-9\n-1', expected: 'max : -1' },
      { label: 'Maximum en doublon', stdin: '6\n10\n0\n5\n10\n3\n8', expected: 'max : 10' }
    ],
    solution: `import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt();
        int[] valeurs = new int[n];
        for (int i = 0; i < n; i++) {
            valeurs[i] = sc.nextInt();
        }
        int max = valeurs[0];
        for (int i = 1; i < n; i++) {
            if (valeurs[i] > max) {
                max = valeurs[i];
            }
        }
        System.out.println("max : " + max);
    }
}
`
  },
  {
    id: 'java2-c3-e2',
    chapter: 3,
    level: 'n2',
    language: 'java',
    title: 'Inverser un tableau',
    goal: 'Parcourir un tableau dans le sens inverse et assembler une sortie.',
    brief: '<p>Le programme reçoit un entier <code>n</code>, puis <code>n</code> entiers. Affichez-les ' +
      'dans l’<strong>ordre inverse</strong>, séparés par des espaces, sur une seule ligne.</p>',
    starter: `import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt();
        int[] valeurs = new int[n];
        for (int i = 0; i < n; i++) {
            valeurs[i] = sc.nextInt();
        }

        // À compléter : afficher les valeurs de la dernière à la première,
        // séparées par un espace, sans espace final.
    }
}
`,
    hints: [
      'Parcours le tableau de n-1 à 0 avec une boucle décrémentée.',
      'Un StringBuilder accumule la sortie ; n’ajoute l’espace qu’après le premier élément écrit.'
    ],
    examples: [
      { stdin: '3\n1\n2\n3', expected: '3 2 1', note: 'Ordre inversé.' }
    ],
    tests: [
      { label: 'Valeur unique', stdin: '1\n5', expected: '5' },
      { label: 'Quatre dizaines', stdin: '4\n10\n20\n30\n40', expected: '40 30 20 10' },
      { label: 'Négatif puis positif', stdin: '2\n-1\n2', expected: '2 -1' }
    ],
    solution: `import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt();
        int[] valeurs = new int[n];
        for (int i = 0; i < n; i++) {
            valeurs[i] = sc.nextInt();
        }
        StringBuilder sb = new StringBuilder();
        for (int i = n - 1; i >= 0; i--) {
            if (sb.length() > 0) {
                sb.append(' ');
            }
            sb.append(valeurs[i]);
        }
        System.out.println(sb.toString());
    }
}
`
  },
  {
    id: 'java2-c3-e3',
    chapter: 3,
    level: 'n3',
    language: 'java',
    title: 'Nombre premier',
    goal: 'Écrire une méthode et tester un nombre premier.',
    brief: '<p>Le programme reçoit un entier <code>n</code>. Affichez <code>premier</code> si <code>n</code> ' +
      'est un nombre premier, sinon <code>non premier</code>. Rappel : 1 n’est pas premier.</p>',
    starter: `import java.util.Scanner;

public class Main {
    static boolean estPremier(int n) {
        // À compléter : renvoyer true si n est premier, false sinon.
        return false;
    }

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt();
        System.out.println(estPremier(n) ? "premier" : "non premier");
    }
}
`,
    hints: [
      'Un nombre est premier s’il est supérieur ou égal à 2 et n’a aucun diviseur jusqu’à sa racine.',
      'Une boucle d = 2 ; d * d <= n teste les diviseurs ; si n % d == 0, le nombre n’est pas premier.'
    ],
    examples: [
      { stdin: '17', expected: 'premier', note: '17 n’a aucun diviseur autre que 1 et lui-même.' }
    ],
    tests: [
      { label: 'Le plus petit premier', stdin: '2', expected: 'premier' },
      { label: 'Nombre composé', stdin: '9', expected: 'non premier' },
      { label: 'Grand premier', stdin: '97', expected: 'premier' }
    ],
    solution: `import java.util.Scanner;

public class Main {
    static boolean estPremier(int n) {
        if (n < 2) {
            return false;
        }
        for (int d = 2; d * d <= n; d++) {
            if (n % d == 0) {
                return false;
            }
        }
        return true;
    }

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt();
        System.out.println(estPremier(n) ? "premier" : "non premier");
    }
}
`
  }
];

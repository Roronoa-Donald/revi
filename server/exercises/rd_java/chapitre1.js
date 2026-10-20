/**
 * Chapitre 1 — Bases du langage Java.
 *
 * Syntaxe, variables, types, opérateurs et lecture de l'entrée standard avec
 * Scanner. Le programme est un `public class Main` autonome, exécuté en CLI par
 * le service d'exécution (langage `java`).
 */
'use strict';

module.exports = [
  {
    id: 'java2-c1-e1',
    chapter: 1,
    level: 'n1',
    language: 'java',
    title: 'Somme de deux entiers',
    goal: 'Lire deux entiers et afficher leur somme : premier programme Java complet.',
    brief: '<p>Le programme reçoit deux entiers, un par ligne. Lisez-les avec un <code>Scanner</code> et ' +
      'affichez <code>somme : X</code> où <code>X</code> est leur somme.</p>',
    starter: `import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int a = sc.nextInt();
        int b = sc.nextInt();

        // À compléter : afficher "somme : " suivi de la somme des deux entiers.
    }
}
`,
    hints: [
      'La somme s’écrit simplement a + b ; System.out.println affiche une ligne.',
      'Pour mélanger texte et valeur, concatène : "somme : " + (a + b).'
    ],
    examples: [
      { stdin: '3\n4', expected: 'somme : 7', note: 'Trois plus quatre.' }
    ],
    tests: [
      { label: 'Dizaine et unité', stdin: '10\n5', expected: 'somme : 15' },
      { label: 'Avec un négatif', stdin: '-2\n7', expected: 'somme : 5' },
      { label: 'Deux zéros', stdin: '0\n0', expected: 'somme : 0' }
    ],
    solution: `import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int a = sc.nextInt();
        int b = sc.nextInt();
        System.out.println("somme : " + (a + b));
    }
}
`
  },
  {
    id: 'java2-c1-e2',
    chapter: 1,
    level: 'n1',
    language: 'java',
    title: 'Moyenne d’une série',
    goal: 'Parcourir une entrée avec une boucle et produire un résultat décimal formaté.',
    brief: '<p>Le programme reçoit un entier <code>n</code>, puis <code>n</code> entiers. Calculez leur ' +
      '<strong>moyenne</strong> et affichez <code>moyenne : X.XX</code> avec exactement deux décimales ' +
      '(séparateur point).</p>',
    starter: `import java.util.Scanner;
import java.util.Locale;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt();
        double somme = 0;

        // À compléter : lire les n valeurs et les accumuler dans somme.

        // À compléter : afficher "moyenne : " + la moyenne formatée sur 2 décimales.
    }
}
`,
    hints: [
      'Une boucle for de 0 à n lit chaque valeur avec sc.nextInt() et l’ajoute à somme.',
      'Pour forcer le point décimal, formate avec String.format(Locale.US, "%.2f", moyenne).'
    ],
    examples: [
      { stdin: '4\n1\n2\n3\n4', expected: 'moyenne : 2.50', note: 'Somme 10 sur 4 valeurs.' }
    ],
    tests: [
      { label: 'Trois dizaines', stdin: '3\n10\n20\n30', expected: 'moyenne : 20.00' },
      { label: 'Deux valeurs', stdin: '2\n1\n2', expected: 'moyenne : 1.50' },
      { label: 'Série constante', stdin: '5\n5\n5\n5\n5\n5', expected: 'moyenne : 5.00' }
    ],
    solution: `import java.util.Scanner;
import java.util.Locale;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt();
        double somme = 0;
        for (int i = 0; i < n; i++) {
            somme += sc.nextInt();
        }
        double moyenne = somme / n;
        System.out.println("moyenne : " + String.format(Locale.US, "%.2f", moyenne));
    }
}
`
  },
  {
    id: 'java2-c1-e3',
    chapter: 1,
    level: 'n2',
    language: 'java',
    title: 'Conversion Celsius → Fahrenheit',
    goal: 'Manipuler des nombres décimaux, des constantes et un format à une décimale.',
    brief: '<p>Le programme reçoit un nombre décimal, une température en degrés Celsius. Convertissez-la ' +
      'en Fahrenheit avec la formule <code>F = C × 9 / 5 + 32</code> et affichez le résultat avec une ' +
      'décimale.</p>',
    starter: `import java.util.Scanner;
import java.util.Locale;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        double celsius = sc.nextDouble();

        // À compléter : convertir en Fahrenheit et afficher le résultat sur 1 décimale.
    }
}
`,
    hints: [
      'Utilise des littéraux décimaux (9.0 / 5.0) pour éviter la division entière.',
      'Formate avec String.format(Locale.US, "%.1f", fahrenheit).'
    ],
    examples: [
      { stdin: '25', expected: '77.0', note: '25 °C font 77 °F.' }
    ],
    tests: [
      { label: 'Point de congélation', stdin: '0', expected: '32.0' },
      { label: 'Point d’ébullition', stdin: '100', expected: '212.0' },
      { label: 'Égalité des échelles', stdin: '-40', expected: '-40.0' }
    ],
    solution: `import java.util.Scanner;
import java.util.Locale;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        double celsius = sc.nextDouble();
        double fahrenheit = celsius * 9.0 / 5.0 + 32.0;
        System.out.println(String.format(Locale.US, "%.1f", fahrenheit));
    }
}
`
  }
];

/**
 * Chapitre 4 — Classes, objets et encapsulation.
 *
 * Déclaration de classes, constructeur, attributs privés, getters, redéfinition
 * de toString et validation dans un setter.
 */
'use strict';

module.exports = [
  {
    id: 'java2-c4-e1',
    chapter: 4,
    level: 'n1',
    language: 'java',
    title: 'Classe Rectangle',
    goal: 'Déclarer une classe, un constructeur et une méthode.',
    brief: '<p>Le programme reçoit deux entiers : <code>largeur</code> puis <code>hauteur</code>. ' +
      'Écrivez une classe <code>Rectangle</code> avec un constructeur rangeant ces valeurs et une méthode ' +
      '<code>aire()</code>, puis affichez <code>aire : X</code>.</p>',
    starter: `import java.util.Scanner;

class Rectangle {
    // À compléter : deux attributs privés largeur et hauteur.

    // À compléter : constructeur.

    // À compléter : méthode aire().
}

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int largeur = sc.nextInt();
        int hauteur = sc.nextInt();

        // À compléter : construire le rectangle et afficher "aire : " + aire().
    }
}
`,
    hints: [
      'Le constructeur s’écrit Rectangle(int largeur, int hauteur) et affecte this.largeur et this.hauteur.',
      'aire() renvoie largeur * hauteur ; crée l’objet avec new Rectangle(largeur, hauteur).'
    ],
    examples: [
      { stdin: '4\n5', expected: 'aire : 20', note: 'Un rectangle de 4 sur 5.' }
    ],
    tests: [
      { label: 'Carré', stdin: '3\n3', expected: 'aire : 9' },
      { label: 'Rectangle fin', stdin: '1\n7', expected: 'aire : 7' },
      { label: 'Grande largeur', stdin: '10\n2', expected: 'aire : 20' }
    ],
    solution: `import java.util.Scanner;

class Rectangle {
    private final int largeur;
    private final int hauteur;

    Rectangle(int largeur, int hauteur) {
        this.largeur = largeur;
        this.hauteur = hauteur;
    }

    int aire() {
        return largeur * hauteur;
    }
}

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int largeur = sc.nextInt();
        int hauteur = sc.nextInt();
        Rectangle rectangle = new Rectangle(largeur, hauteur);
        System.out.println("aire : " + rectangle.aire());
    }
}
`
  },
  {
    id: 'java2-c4-e2',
    chapter: 4,
    level: 'n2',
    language: 'java',
    title: 'Classe Point et toString',
    goal: 'Encapsuler un état et redéfinir l’affichage d’un objet.',
    brief: '<p>Le programme reçoit deux entiers <code>x</code> et <code>y</code>. Écrivez une classe ' +
      '<code>Point</code> avec deux attributs privés et une méthode <code>toString()</code> qui renvoie ' +
      '<code>(x, y)</code>. Affichez l’objet directement avec <code>System.out.println</code>.</p>',
    starter: `import java.util.Scanner;

class Point {
    // À compléter : attributs privés, constructeur.

    // À compléter : redéfinir toString() pour renvoyer "(x, y)".
}

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int x = sc.nextInt();
        int y = sc.nextInt();

        // À compléter : créer le point et l'afficher.
    }
}
`,
    hints: [
      'Ajoutez l’annotation @Override devant public String toString().',
      'Concatène les valeurs entre parenthèses : "(" + x + ", " + y + ")".'
    ],
    examples: [
      { stdin: '3\n4', expected: '(3, 4)', note: 'Le point (3, 4).' }
    ],
    tests: [
      { label: 'Origine', stdin: '0\n0', expected: '(0, 0)' },
      { label: 'Abscisse négative', stdin: '-2\n7', expected: '(-2, 7)' },
      { label: 'Coordonnées égales', stdin: '12\n12', expected: '(12, 12)' }
    ],
    solution: `import java.util.Scanner;

class Point {
    private final int x;
    private final int y;

    Point(int x, int y) {
        this.x = x;
        this.y = y;
    }

    @Override
    public String toString() {
        return "(" + x + ", " + y + ")";
    }
}

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int x = sc.nextInt();
        int y = sc.nextInt();
        System.out.println(new Point(x, y));
    }
}
`
  },
  {
    id: 'java2-c4-e3',
    chapter: 4,
    level: 'n2',
    language: 'java',
    title: 'Classe Personne',
    goal: 'Combiner getters, setter validant et affichage formaté.',
    brief: '<p>Le programme reçoit un prénom (un mot) puis un âge (un entier). Écrivez une classe ' +
      '<code>Personne</code> avec des getters <code>getNom()</code> et <code>getAge()</code>, puis ' +
      'affichez <code>nom (age ans)</code>.</p>',
    starter: `import java.util.Scanner;

class Personne {
    private final String nom;
    private int age;

    Personne(String nom, int age) {
        this.nom = nom;
        this.age = age;
    }

    String getNom() {
        return nom;
    }

    int getAge() {
        return age;
    }

    // À compléter : setter qui refuse un âge négatif.
}

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        String nom = sc.next();
        int age = sc.nextInt();

        // À compléter : créer la personne et afficher "nom (age ans)".
    }
}
`,
    hints: [
      'sc.next() lit un mot (sans espace) ; sc.nextInt() lit l’entier suivant.',
      'L’affichage se construit par concaténation : p.getNom() + " (" + p.getAge() + " ans)".'
    ],
    examples: [
      { stdin: 'Ada\n36', expected: 'Ada (36 ans)', note: 'Ada a 36 ans.' }
    ],
    tests: [
      { label: 'Petit âge', stdin: 'Rex\n3', expected: 'Rex (3 ans)' },
      { label: 'Jeune adulte', stdin: 'Nadia\n22', expected: 'Nadia (22 ans)' },
      { label: 'Âge nul', stdin: 'Omar\n0', expected: 'Omar (0 ans)' }
    ],
    solution: `import java.util.Scanner;

class Personne {
    private final String nom;
    private int age;

    Personne(String nom, int age) {
        this.nom = nom;
        this.age = age;
    }

    String getNom() {
        return nom;
    }

    int getAge() {
        return age;
    }

    void setAge(int age) {
        if (age < 0) {
            throw new IllegalArgumentException("age negatif");
        }
        this.age = age;
    }
}

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        String nom = sc.next();
        int age = sc.nextInt();
        Personne personne = new Personne(nom, age);
        System.out.println(personne.getNom() + " (" + personne.getAge() + " ans)");
    }
}
`
  }
];

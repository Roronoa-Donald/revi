/**
 * Chapitre 5 — Collections, héritage et polymorphisme.
 *
 * Ensemble (HashSet) pour les valeurs distinctes, classe abstraite et
 * polymorphisme, héritage simple avec redéfinition de méthode.
 */
'use strict';

module.exports = [
  {
    id: 'java2-c5-e1',
    chapter: 5,
    level: 'n2',
    language: 'java',
    title: 'Mots distincts',
    goal: 'Utiliser une collection pour éliminer les doublons.',
    brief: '<p>Le programme reçoit un entier <code>n</code>, puis <code>n</code> mots. Affichez ' +
      '<code>mots distincts : X</code> où <code>X</code> est le nombre de mots différents.</p>',
    starter: `import java.util.*;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt();

        // À compléter : ranger les n mots dans un ensemble et compter les distincts.

        // À compléter : afficher "mots distincts : " suivi du compte.
    }
}
`,
    hints: [
      'Un Set ne garde qu’une copie de chaque valeur : vus.add(sc.next()) suffit.',
      'La taille de l’ensemble (vus.size()) est exactement le nombre de mots distincts.'
    ],
    examples: [
      { stdin: '4\na\nb\na\nc', expected: 'mots distincts : 3', note: 'a, b et c : trois mots différents.' }
    ],
    tests: [
      { label: 'Tous identiques', stdin: '3\nx\nx\nx', expected: 'mots distincts : 1' },
      { label: 'Deux doublons', stdin: '5\np\nq\nr\np\nq', expected: 'mots distincts : 3' },
      { label: 'Un seul mot', stdin: '1\nseul', expected: 'mots distincts : 1' }
    ],
    solution: `import java.util.*;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt();
        Set<String> vus = new HashSet<>();
        for (int i = 0; i < n; i++) {
            vus.add(sc.next());
        }
        System.out.println("mots distincts : " + vus.size());
    }
}
`
  },
  {
    id: 'java2-c5-e2',
    chapter: 5,
    level: 'n3',
    language: 'java',
    title: 'Formes et polymorphisme',
    goal: 'Définir une classe abstraite et faire varier le comportement par héritage.',
    brief: '<p>Le programme reçoit un type (<code>carre</code> ou <code>cercle</code>) puis un nombre ' +
      'décimal. Écrivez une classe abstraite <code>Forme</code> avec une méthode <code>aire()</code>, puis ' +
      '<code>Carre</code> (côté) et <code>Cercle</code> (rayon, aire = π·r²). Affichez <code>aire : X.XX</code> ' +
      'avec deux décimales (séparateur point).</p>',
    starter: `import java.util.*;
import java.util.Locale;

abstract class Forme {
    // À compléter : méthode abstraite aire().
}

class Carre extends Forme {
    // À compléter : attribut cote, constructeur, aire().
}

class Cercle extends Forme {
    // À compléter : attribut rayon, constructeur, aire().
}

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        String type = sc.next();
        double valeur = sc.nextDouble();

        // À compléter : construire la bonne forme et afficher son aire sur 2 décimales.
    }
}
`,
    hints: [
      'Une classe abstraite déclare abstract double aire(); chaque fille l’implémente.',
      'Choisis avec type.equals("carre") ? new Carre(valeur) : new Cercle(valeur), puis formate avec Locale.US.'
    ],
    examples: [
      { stdin: 'carre\n4', expected: 'aire : 16.00', note: 'Un carré de côté 4.' }
    ],
    tests: [
      { label: 'Cercle unité', stdin: 'cercle\n1', expected: 'aire : 3.14' },
      { label: 'Grand carré', stdin: 'carre\n5', expected: 'aire : 25.00' },
      { label: 'Cercle de rayon 2', stdin: 'cercle\n2', expected: 'aire : 12.57' }
    ],
    solution: `import java.util.*;
import java.util.Locale;

abstract class Forme {
    abstract double aire();
}

class Carre extends Forme {
    private final double cote;

    Carre(double cote) {
        this.cote = cote;
    }

    double aire() {
        return cote * cote;
    }
}

class Cercle extends Forme {
    private final double rayon;

    Cercle(double rayon) {
        this.rayon = rayon;
    }

    double aire() {
        return Math.PI * rayon * rayon;
    }
}

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        String type = sc.next();
        double valeur = sc.nextDouble();
        Forme forme = type.equals("carre") ? new Carre(valeur) : new Cercle(valeur);
        System.out.println("aire : " + String.format(Locale.US, "%.2f", forme.aire()));
    }
}
`
  },
  {
    id: 'java2-c5-e3',
    chapter: 5,
    level: 'n2',
    language: 'java',
    title: 'Héritage : Animal et Chien',
    goal: 'Utiliser extends, super et la redéfinition de méthode.',
    brief: '<p>Le programme reçoit un prénom. Écrivez une classe <code>Animal</code> avec un attribut ' +
      '<code>nom</code> et une méthode <code>crier()</code> renvoyant <code>...</code>, puis une classe ' +
      '<code>Chien extends Animal</code> qui redéfinit <code>crier()</code> pour renvoyer <code>Wouf</code>. ' +
      'Affichez <code>nom dit Wouf</code> en utilisant la méthode <code>sePresente()</code> de Animal.</p>',
    starter: `import java.util.Scanner;

class Animal {
    protected final String nom;

    Animal(String nom) {
        this.nom = nom;
    }

    String crier() {
        return "...";
    }

    String sePresente() {
        return nom + " dit " + crier();
    }
}

class Chien extends Animal {
    Chien(String nom) {
        super(nom);
    }

    // À compléter : redéfinir crier().
}

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        String nom = sc.next();

        // À compléter : créer un Chien et afficher sePresente().
    }
}
`,
    hints: [
      'La redéfinition utilise @Override String crier() { return "Wouf"; }.',
      'Le polymorphisme joue son rôle : animal.sePresente() appelle la version de Chien pour crier().'
    ],
    examples: [
      { stdin: 'Rex', expected: 'Rex dit Wouf', note: 'L’animal Rex est un chien.' }
    ],
    tests: [
      { label: 'Autre prénom', stdin: 'Buddy', expected: 'Buddy dit Wouf' },
      { label: 'Prénom court', stdin: 'Max', expected: 'Max dit Wouf' },
      { label: 'Prénom féminin', stdin: 'Luna', expected: 'Luna dit Wouf' }
    ],
    solution: `import java.util.Scanner;

class Animal {
    protected final String nom;

    Animal(String nom) {
        this.nom = nom;
    }

    String crier() {
        return "...";
    }

    String sePresente() {
        return nom + " dit " + crier();
    }
}

class Chien extends Animal {
    Chien(String nom) {
        super(nom);
    }

    @Override
    String crier() {
        return "Wouf";
    }
}

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        String nom = sc.next();
        Animal animal = new Chien(nom);
        System.out.println(animal.sePresente());
    }
}
`
  }
];

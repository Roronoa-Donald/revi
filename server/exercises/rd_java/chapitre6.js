/**
 * Chapitre 6 — Exceptions et robustesse.
 *
 * try/catch, exceptions standard (ArithmeticException, NumberFormatException)
 * et exception personnalisée.
 */
'use strict';

module.exports = [
  {
    id: 'java2-c6-e1',
    chapter: 6,
    level: 'n2',
    language: 'java',
    title: 'Division protégée',
    goal: 'Intercepter une exception d’exécution.',
    brief: '<p>Le programme reçoit deux entiers <code>a</code> et <code>b</code>. Affichez ' +
      '<code>resultat : X</code> où <code>X</code> est le quotient entier <code>a / b</code>. Si ' +
      '<code>b</code> vaut 0, interceptez l’exception et affichez <code>erreur : division par zéro</code>.</p>',
    starter: `import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int a = sc.nextInt();
        int b = sc.nextInt();

        // À compléter : afficher le quotient, ou un message d'erreur si b == 0.
        // Utilise un bloc try / catch (ArithmeticException).
    }
}
`,
    hints: [
      'En Java, la division entière par zéro lève une ArithmeticException, pas un résultat infini.',
      'Place l’affichage du quotient dans le try, et le message d’erreur dans le catch.'
    ],
    examples: [
      { stdin: '10\n2', expected: 'resultat : 5', note: '10 divisé par 2.' }
    ],
    tests: [
      { label: 'Division entière', stdin: '7\n2', expected: 'resultat : 3' },
      { label: 'Division par zéro', stdin: '5\n0', expected: 'erreur : division par zéro' },
      { label: 'Quotient exact', stdin: '100\n10', expected: 'resultat : 10' }
    ],
    solution: `import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int a = sc.nextInt();
        int b = sc.nextInt();
        try {
            System.out.println("resultat : " + (a / b));
        } catch (ArithmeticException e) {
            System.out.println("erreur : division par zéro");
        }
    }
}
`
  },
  {
    id: 'java2-c6-e2',
    chapter: 6,
    level: 'n2',
    language: 'java',
    title: 'Conversion d’une saisie',
    goal: 'Intercepter une erreur de format.',
    brief: '<p>Le programme reçoit une saisie (un mot). Essayez de la convertir en entier avec ' +
      '<code>Integer.parseInt</code>. Si la conversion réussit, affichez <code>valeur : X</code> ; sinon ' +
      'affichez <code>saisie invalide</code>.</p>',
    starter: `import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        String saisie = sc.next();

        // À compléter : convertir avec Integer.parseInt, gérer l'échec.
        // Utilise un bloc try / catch (NumberFormatException).
    }
}
`,
    hints: [
      'Integer.parseInt("42") renvoie 42, mais lance une NumberFormatException sur un texte non numérique.',
      'Le catch (NumberFormatException e) affiche "saisie invalide".'
    ],
    examples: [
      { stdin: '42', expected: 'valeur : 42', note: 'Un entier valide.' }
    ],
    tests: [
      { label: 'Texte non numérique', stdin: 'abc', expected: 'saisie invalide' },
      { label: 'Un chiffre', stdin: '7', expected: 'valeur : 7' },
      { label: 'Grand entier', stdin: '999', expected: 'valeur : 999' }
    ],
    solution: `import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        String saisie = sc.next();
        try {
            int valeur = Integer.parseInt(saisie);
            System.out.println("valeur : " + valeur);
        } catch (NumberFormatException e) {
            System.out.println("saisie invalide");
        }
    }
}
`
  },
  {
    id: 'java2-c6-e3',
    chapter: 6,
    level: 'n3',
    language: 'java',
    title: 'Exception personnalisée',
    goal: 'Déclarer et lancer une exception métier, puis l’intercepter.',
    brief: '<p>Le programme reçoit un solde puis un montant (deux entiers). Écrivez une exception ' +
      '<code>SoldeInsuffisant</code> et une classe <code>Compte</code> dont <code>retirer()</code> la lance ' +
      'quand le montant dépasse le solde. Affichez <code>reste : X</code> si le retrait passe, sinon ' +
      '<code>erreur : solde insuffisant</code>.</p>',
    starter: `import java.util.Scanner;

class SoldeInsuffisant extends Exception {
    // À compléter : constructeur prenant un message.
}

class Compte {
    private int solde;

    Compte(int solde) {
        this.solde = solde;
    }

    int getSolde() {
        return solde;
    }

    void retirer(int montant) throws SoldeInsuffisant {
        // À compléter : lever SoldeInsuffisant si montant > solde, sinon débiter.
    }
}

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int solde = sc.nextInt();
        int montant = sc.nextInt();

        // À compléter : tenter le retrait, afficher le reste ou l'erreur.
    }
}
`,
    hints: [
      'Une exception personnalisée étend Exception et transmet le message à super().',
      'La méthode retirer déclare throws SoldeInsuffisant ; l’appel est encadré d’un try / catch de ce type.'
    ],
    examples: [
      { stdin: '100\n30', expected: 'reste : 70', note: 'Un retrait de 30 sur 100.' }
    ],
    tests: [
      { label: 'Retrait trop grand', stdin: '100\n150', expected: 'erreur : solde insuffisant' },
      { label: 'Retrait du solde entier', stdin: '50\n50', expected: 'reste : 0' },
      { label: 'Petit retrait', stdin: '200\n1', expected: 'reste : 199' }
    ],
    solution: `import java.util.Scanner;

class SoldeInsuffisant extends Exception {
    SoldeInsuffisant(String message) {
        super(message);
    }
}

class Compte {
    private int solde;

    Compte(int solde) {
        this.solde = solde;
    }

    int getSolde() {
        return solde;
    }

    void retirer(int montant) throws SoldeInsuffisant {
        if (montant > solde) {
            throw new SoldeInsuffisant("solde insuffisant");
        }
        solde -= montant;
    }
}

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int solde = sc.nextInt();
        int montant = sc.nextInt();
        Compte compte = new Compte(solde);
        try {
            compte.retirer(montant);
            System.out.println("reste : " + compte.getSolde());
        } catch (SoldeInsuffisant e) {
            System.out.println("erreur : " + e.getMessage());
        }
    }
}
`
  }
];

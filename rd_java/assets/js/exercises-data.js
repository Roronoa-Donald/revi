/* ============================================================
   RD Java — Exercices Pratiques (TP guidés)
   70 exercices répartis sur 12 catégories
   Structure : {id, title, cat, catLabel, difficulty, description, hints[], solution}
   ============================================================ */
const ExercisesData = [

// ─── CAT 1 : Syntaxe de base (6) ───
{id:1,title:"Hello World personnalisé",cat:"syntaxe",catLabel:"Syntaxe",difficulty:1,
 description:"Crée un programme <code>Bienvenue.java</code> qui affiche :<br>• \"Bienvenue sur RD Java !\"<br>• La version de Java (<code>System.getProperty(\"java.version\")</code>)<br>• La date du jour (<code>java.time.LocalDate.now()</code>)",
 hints:["Utilise System.out.println() pour afficher","Import java.time.LocalDate en haut du fichier"],
 solution:`import java.time.LocalDate;

public class Bienvenue {
    public static void main(String[] args) {
        System.out.println("Bienvenue sur RD Java !");
        System.out.println("Java : " + System.getProperty("java.version"));
        System.out.println("Date : " + LocalDate.now());
    }
}`},

{id:2,title:"Infos système",cat:"syntaxe",catLabel:"Syntaxe",difficulty:1,
 description:"Affiche le nom de l'OS, le répertoire utilisateur et le séparateur de fichiers du système.",
 hints:["System.getProperty(\"os.name\"), System.getProperty(\"user.home\"), System.getProperty(\"file.separator\")"],
 solution:`public class InfosSysteme {
    public static void main(String[] args) {
        System.out.println("OS : " + System.getProperty("os.name"));
        System.out.println("Dossier : " + System.getProperty("user.home"));
        System.out.println("Séparateur : " + System.getProperty("file.separator"));
    }
}`},

{id:3,title:"Commentaires & conventions",cat:"syntaxe",catLabel:"Syntaxe",difficulty:1,
 description:"Crée une classe <code>DemoConventions</code> avec :<br>• Un commentaire Javadoc pour la classe<br>• Une constante <code>NOM_APP</code><br>• Une variable <code>versionMajeure</code><br>• Un commentaire en ligne et un commentaire bloc",
 hints:["/** Javadoc */ pour la classe","final pour une constante, UPPER_SNAKE_CASE"],
 solution:`/** Classe de démonstration des conventions Java. */
public class DemoConventions {
    // Constante en UPPER_SNAKE_CASE
    static final String NOM_APP = "RD Java";

    public static void main(String[] args) {
        /* Variable en camelCase */
        int versionMajeure = 21;
        System.out.println(NOM_APP + " v" + versionMajeure);
    }
}`},

{id:4,title:"Multi-fichiers compilation",cat:"syntaxe",catLabel:"Syntaxe",difficulty:2,
 description:"Crée deux classes dans deux fichiers :<br>• <code>Salut.java</code> avec une méthode static <code>dire()</code> qui affiche \"Salut !\"<br>• <code>App.java</code> qui appelle <code>Salut.dire()</code><br>Compile et exécute.",
 hints:["javac Salut.java App.java pour compiler les deux","java App pour exécuter"],
 solution:`// Salut.java
public class Salut {
    public static void dire() {
        System.out.println("Salut !");
    }
}

// App.java
public class App {
    public static void main(String[] args) {
        Salut.dire();
    }
}
// Commandes : javac Salut.java App.java && java App`},

{id:5,title:"Arguments en ligne de commande",cat:"syntaxe",catLabel:"Syntaxe",difficulty:2,
 description:"Crée un programme qui lit les arguments passés en ligne de commande et les affiche numérotés.<br>Ex: <code>java Args Bonjour le monde</code> → <code>1: Bonjour</code>, <code>2: le</code>, <code>3: monde</code>",
 hints:["Les arguments sont dans String[] args de main","args.length donne le nombre d'arguments"],
 solution:`public class Args {
    public static void main(String[] args) {
        if (args.length == 0) {
            System.out.println("Aucun argument fourni.");
        } else {
            for (int i = 0; i < args.length; i++) {
                System.out.println((i + 1) + ": " + args[i]);
            }
        }
    }
}`},

{id:6,title:"Séquences d'échappement",cat:"syntaxe",catLabel:"Syntaxe",difficulty:1,
 description:"Affiche une carte de visite formatée avec des tabulations et sauts de ligne :<pre>╔══════════════════╗\n║  Nom: JavaDuke   ║\n║  Rôle: Étudiant  ║\n╚══════════════════╝</pre>",
 hints:["Utilise \\n pour les sauts de ligne et \\t pour les tabulations","Les caractères Unicode se tapent directement"],
 solution:`public class CarteVisite {
    public static void main(String[] args) {
        System.out.println("╔══════════════════╗");
        System.out.println("║  Nom: JavaDuke   ║");
        System.out.println("║  Rôle: Étudiant  ║");
        System.out.println("╚══════════════════╝");
    }
}`},

// ─── CAT 2 : Variables & Types (6) ───
{id:7,title:"Convertisseur de devises",cat:"variables",catLabel:"Variables & Types",difficulty:1,
 description:"Déclare un montant en euros (double), un taux de conversion EUR→USD (1.08) et affiche le résultat en dollars avec 2 décimales.",
 hints:["Utilise System.out.printf(\"%.2f\", montant) pour 2 décimales","double montantUSD = montantEUR * taux;"],
 solution:`public class Devise {
    public static void main(String[] args) {
        double euros = 150.0;
        final double TAUX = 1.08;
        double dollars = euros * TAUX;
        System.out.printf("%.2f EUR = %.2f USD%n", euros, dollars);
    }
}`},

{id:8,title:"Calcul d'IMC",cat:"variables",catLabel:"Variables & Types",difficulty:1,
 description:"Demande le poids (kg) et la taille (m) à l'utilisateur et calcule l'IMC (poids / taille²). Affiche le résultat arrondi à 1 décimale.",
 hints:["IMC = poids / (taille * taille)","Math.round(imc * 10.0) / 10.0 pour arrondir"],
 solution:`import java.util.Scanner;

public class IMC {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        System.out.print("Poids (kg) : ");
        double poids = sc.nextDouble();
        System.out.print("Taille (m) : ");
        double taille = sc.nextDouble();
        double imc = poids / (taille * taille);
        System.out.printf("IMC : %.1f%n", imc);
        sc.close();
    }
}`},

{id:9,title:"Swap sans variable temporaire",cat:"variables",catLabel:"Variables & Types",difficulty:2,
 description:"Échange les valeurs de deux variables <code>a</code> et <code>b</code> (int) SANS utiliser de variable temporaire. Affiche avant et après.",
 hints:["Astuce : a = a + b; b = a - b; a = a - b;","Ou avec XOR : a ^= b; b ^= a; a ^= b;"],
 solution:`public class Swap {
    public static void main(String[] args) {
        int a = 10, b = 25;
        System.out.println("Avant : a=" + a + " b=" + b);
        a = a + b;  // a = 35
        b = a - b;  // b = 10
        a = a - b;  // a = 25
        System.out.println("Après : a=" + a + " b=" + b);
    }
}`},

{id:10,title:"Types primitifs — Limites",cat:"variables",catLabel:"Variables & Types",difficulty:2,
 description:"Affiche les valeurs min et max de <code>byte</code>, <code>short</code>, <code>int</code> et <code>long</code> en utilisant les constantes wrapper.",
 hints:["Byte.MIN_VALUE, Integer.MAX_VALUE, etc."],
 solution:`public class Limites {
    public static void main(String[] args) {
        System.out.println("byte  : " + Byte.MIN_VALUE + " à " + Byte.MAX_VALUE);
        System.out.println("short : " + Short.MIN_VALUE + " à " + Short.MAX_VALUE);
        System.out.println("int   : " + Integer.MIN_VALUE + " à " + Integer.MAX_VALUE);
        System.out.println("long  : " + Long.MIN_VALUE + " à " + Long.MAX_VALUE);
    }
}`},

{id:11,title:"Casting explicite",cat:"variables",catLabel:"Variables & Types",difficulty:2,
 description:"Déclare un <code>double val = 9.78</code>. Fais un cast en int et affiche les deux valeurs. Puis déclare un <code>char c = 'A'</code> et affiche son code ASCII (int).",
 hints:["(int)val pour le cast","(int)c donne le code ASCII"],
 solution:`public class Casting {
    public static void main(String[] args) {
        double val = 9.78;
        int entier = (int) val;
        System.out.println("double : " + val + " → int : " + entier);

        char c = 'A';
        int ascii = (int) c;
        System.out.println("'" + c + "' → ASCII : " + ascii);
    }
}`},

{id:12,title:"Opérateurs combinés",cat:"variables",catLabel:"Variables & Types",difficulty:1,
 description:"Pars de <code>int x = 100</code>. En utilisant uniquement les opérateurs combinés (+=, -=, *=, /=, %=), transforme x pour obtenir 7. Affiche chaque étape.",
 hints:["x /= 10 → 10, x -= 3 → 7, etc."],
 solution:`public class Operateurs {
    public static void main(String[] args) {
        int x = 100;
        System.out.println("Début : " + x);
        x /= 10;   // 10
        System.out.println("x /= 10 → " + x);
        x -= 3;     // 7
        System.out.println("x -= 3  → " + x);
    }
}`},

// ─── CAT 3 : Conditions (6) ───
{id:13,title:"Vérificateur d'âge",cat:"conditions",catLabel:"Conditions",difficulty:1,
 description:"Demande l'âge de l'utilisateur. Affiche :<br>• \"Enfant\" si < 13<br>• \"Adolescent\" si 13-17<br>• \"Adulte\" si 18-64<br>• \"Senior\" si >= 65",
 hints:["Utilise if / else if / else","Vérifie de la plus grande condition à la plus petite, ou inverse"],
 solution:`import java.util.Scanner;

public class Age {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        System.out.print("Ton âge : ");
        int age = sc.nextInt();

        if (age < 13) System.out.println("Enfant");
        else if (age < 18) System.out.println("Adolescent");
        else if (age < 65) System.out.println("Adulte");
        else System.out.println("Senior");
        sc.close();
    }
}`},

{id:14,title:"Calculatrice switch",cat:"conditions",catLabel:"Conditions",difficulty:2,
 description:"Demande 2 nombres et un opérateur (+, -, *, /). Utilise un <code>switch</code> pour effectuer l'opération. Gère la division par zéro.",
 hints:["switch sur un char ou String","Pense au break après chaque case"],
 solution:`import java.util.Scanner;

public class Calc {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        System.out.print("Nombre 1 : "); double a = sc.nextDouble();
        System.out.print("Opérateur (+,-,*,/) : "); String op = sc.next();
        System.out.print("Nombre 2 : "); double b = sc.nextDouble();

        switch (op) {
            case "+": System.out.println("= " + (a + b)); break;
            case "-": System.out.println("= " + (a - b)); break;
            case "*": System.out.println("= " + (a * b)); break;
            case "/":
                if (b != 0) System.out.println("= " + (a / b));
                else System.out.println("Division par zéro !");
                break;
            default: System.out.println("Opérateur inconnu");
        }
        sc.close();
    }
}`},

{id:15,title:"Année bissextile",cat:"conditions",catLabel:"Conditions",difficulty:2,
 description:"Demande une année et détermine si elle est bissextile.<br>Règle : divisible par 4 ET (pas par 100 OU par 400).",
 hints:["Utilise % pour le modulo","(annee % 4 == 0 && annee % 100 != 0) || (annee % 400 == 0)"],
 solution:`import java.util.Scanner;

public class Bissextile {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        System.out.print("Année : ");
        int annee = sc.nextInt();
        boolean bissextile = (annee % 4 == 0 && annee % 100 != 0) || (annee % 400 == 0);
        System.out.println(annee + (bissextile ? " est bissextile" : " n'est pas bissextile"));
        sc.close();
    }
}`},

{id:16,title:"Note en lettre",cat:"conditions",catLabel:"Conditions",difficulty:1,
 description:"Convertis une note sur 20 en lettre : A (>=16), B (>=14), C (>=12), D (>=10), F (<10).",
 hints:["Utilise des if/else if en chaîne ou un opérateur ternaire imbriqué"],
 solution:`import java.util.Scanner;

public class NotesLettre {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        System.out.print("Note /20 : ");
        int note = sc.nextInt();

        String lettre;
        if (note >= 16) lettre = "A";
        else if (note >= 14) lettre = "B";
        else if (note >= 12) lettre = "C";
        else if (note >= 10) lettre = "D";
        else lettre = "F";

        System.out.println(note + "/20 → " + lettre);
        sc.close();
    }
}`},

{id:17,title:"Opérateur ternaire en chaîne",cat:"conditions",catLabel:"Conditions",difficulty:2,
 description:"En une seule ligne avec l'opérateur ternaire, affiche \"Positif\", \"Négatif\" ou \"Zéro\" selon la valeur d'un int.",
 hints:["condition1 ? val1 : condition2 ? val2 : val3"],
 solution:`public class Ternaire {
    public static void main(String[] args) {
        int n = -5;
        String res = (n > 0) ? "Positif" : (n < 0) ? "Négatif" : "Zéro";
        System.out.println(n + " → " + res);
    }
}`},

{id:18,title:"Jour de la semaine",cat:"conditions",catLabel:"Conditions",difficulty:1,
 description:"Utilise un <code>switch</code> pour afficher le nom du jour correspondant à un numéro (1=Lundi ... 7=Dimanche). Gère les valeurs invalides.",
 hints:["switch(jour) avec case 1: \"Lundi\" etc.","default: pour les valeurs hors 1-7"],
 solution:`public class JourSemaine {
    public static void main(String[] args) {
        int jour = 3;
        switch (jour) {
            case 1: System.out.println("Lundi"); break;
            case 2: System.out.println("Mardi"); break;
            case 3: System.out.println("Mercredi"); break;
            case 4: System.out.println("Jeudi"); break;
            case 5: System.out.println("Vendredi"); break;
            case 6: System.out.println("Samedi"); break;
            case 7: System.out.println("Dimanche"); break;
            default: System.out.println("Jour invalide (1-7)");
        }
    }
}`},

// ─── CAT 4 : Boucles (6) ───
{id:19,title:"Table de multiplication",cat:"boucles",catLabel:"Boucles",difficulty:1,
 description:"Demande un nombre N à l'utilisateur et affiche sa table de multiplication de 1 à 10.",
 hints:["Utilise une boucle for de 1 à 10","System.out.println(n + \" × \" + i + \" = \" + (n*i))"],
 solution:`import java.util.Scanner;

public class Table {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        System.out.print("Nombre : ");
        int n = sc.nextInt();
        for (int i = 1; i <= 10; i++) {
            System.out.println(n + " × " + i + " = " + (n * i));
        }
        sc.close();
    }
}`},

{id:20,title:"FizzBuzz",cat:"boucles",catLabel:"Boucles",difficulty:2,
 description:"Affiche les nombres de 1 à 100. Remplace les multiples de 3 par \"Fizz\", les multiples de 5 par \"Buzz\", et les multiples de 15 par \"FizzBuzz\".",
 hints:["Teste d'abord % 15 (multiple de 3 ET 5)","Utilise if / else if / else"],
 solution:`public class FizzBuzz {
    public static void main(String[] args) {
        for (int i = 1; i <= 100; i++) {
            if (i % 15 == 0) System.out.println("FizzBuzz");
            else if (i % 3 == 0) System.out.println("Fizz");
            else if (i % 5 == 0) System.out.println("Buzz");
            else System.out.println(i);
        }
    }
}`},

{id:21,title:"Devinette (do-while)",cat:"boucles",catLabel:"Boucles",difficulty:2,
 description:"Génère un nombre aléatoire entre 1 et 100. L'utilisateur doit deviner : affiche \"Plus grand\" ou \"Plus petit\" jusqu'à trouver.",
 hints:["int secret = (int)(Math.random()*100)+1","Utilise do-while pour au moins 1 tentative"],
 solution:`import java.util.Scanner;

public class Devinette {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int secret = (int)(Math.random() * 100) + 1;
        int tentative, essais = 0;

        do {
            System.out.print("Devine (1-100) : ");
            tentative = sc.nextInt();
            essais++;
            if (tentative < secret) System.out.println("↑ Plus grand !");
            else if (tentative > secret) System.out.println("↓ Plus petit !");
        } while (tentative != secret);

        System.out.println("🎉 Trouvé en " + essais + " essais !");
        sc.close();
    }
}`},

{id:22,title:"Triangle d'étoiles",cat:"boucles",catLabel:"Boucles",difficulty:2,
 description:"Affiche un triangle d'étoiles de hauteur N (demandé à l'utilisateur) :<pre>*\n**\n***\n****</pre>",
 hints:["Boucle externe pour les lignes, interne pour les étoiles","System.out.print(\"*\") dans la boucle interne"],
 solution:`import java.util.Scanner;

public class Triangle {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        System.out.print("Hauteur : ");
        int n = sc.nextInt();
        for (int i = 1; i <= n; i++) {
            for (int j = 0; j < i; j++) {
                System.out.print("*");
            }
            System.out.println();
        }
        sc.close();
    }
}`},

{id:23,title:"Nombre premier",cat:"boucles",catLabel:"Boucles",difficulty:3,
 description:"Demande un nombre et détermine s'il est premier. Affiche tous les nombres premiers de 2 à N.",
 hints:["Un nombre premier n'est divisible que par 1 et lui-même","Teste les diviseurs de 2 à √n (Math.sqrt)"],
 solution:`import java.util.Scanner;

public class Premiers {
    public static boolean estPremier(int n) {
        if (n < 2) return false;
        for (int i = 2; i <= Math.sqrt(n); i++) {
            if (n % i == 0) return false;
        }
        return true;
    }

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        System.out.print("N : ");
        int n = sc.nextInt();
        System.out.println(n + (estPremier(n) ? " est premier" : " n'est pas premier"));
        System.out.print("Premiers de 2 à " + n + " : ");
        for (int i = 2; i <= n; i++) {
            if (estPremier(i)) System.out.print(i + " ");
        }
        sc.close();
    }
}`},

{id:24,title:"Suite de Fibonacci",cat:"boucles",catLabel:"Boucles",difficulty:2,
 description:"Affiche les N premiers termes de la suite de Fibonacci : 0, 1, 1, 2, 3, 5, 8, 13...",
 hints:["Chaque terme = somme des deux précédents","Utilise deux variables a et b"],
 solution:`import java.util.Scanner;

public class Fibonacci {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        System.out.print("Combien de termes ? ");
        int n = sc.nextInt();
        int a = 0, b = 1;
        for (int i = 0; i < n; i++) {
            System.out.print(a + " ");
            int temp = a + b;
            a = b;
            b = temp;
        }
        sc.close();
    }
}`},

// ─── CAT 5 : Tableaux (6) ───
{id:25,title:"Statistiques d'un tableau",cat:"tableaux",catLabel:"Tableaux",difficulty:2,
 description:"Crée un tableau de 10 entiers aléatoires (1-100). Affiche : le tableau, le min, le max, la somme et la moyenne.",
 hints:["Math.random()*100+1 pour un aléatoire","Parcours avec for-each pour min/max/somme"],
 solution:`import java.util.Arrays;

public class Stats {
    public static void main(String[] args) {
        int[] tab = new int[10];
        for (int i = 0; i < tab.length; i++) {
            tab[i] = (int)(Math.random() * 100) + 1;
        }
        System.out.println("Tableau : " + Arrays.toString(tab));

        int min = tab[0], max = tab[0], somme = 0;
        for (int val : tab) {
            if (val < min) min = val;
            if (val > max) max = val;
            somme += val;
        }
        System.out.println("Min : " + min + " | Max : " + max);
        System.out.println("Somme : " + somme + " | Moyenne : " + (somme / (double)tab.length));
    }
}`},

{id:26,title:"Inverser un tableau",cat:"tableaux",catLabel:"Tableaux",difficulty:2,
 description:"Crée un tableau {1,2,3,4,5} et inverse-le sur place (sans créer un nouveau tableau). Affiche avant et après.",
 hints:["Échange tab[i] et tab[tab.length-1-i]","Boucle de 0 à length/2"],
 solution:`import java.util.Arrays;

public class Inverser {
    public static void main(String[] args) {
        int[] tab = {1, 2, 3, 4, 5};
        System.out.println("Avant : " + Arrays.toString(tab));

        for (int i = 0; i < tab.length / 2; i++) {
            int temp = tab[i];
            tab[i] = tab[tab.length - 1 - i];
            tab[tab.length - 1 - i] = temp;
        }
        System.out.println("Après : " + Arrays.toString(tab));
    }
}`},

{id:27,title:"Tri à bulles",cat:"tableaux",catLabel:"Tableaux",difficulty:3,
 description:"Implémente le tri à bulles (Bubble Sort) manuellement sur un tableau d'entiers. Affiche le tableau à chaque étape.",
 hints:["Deux boucles imbriquées","Si tab[j] > tab[j+1], on échange"],
 solution:`import java.util.Arrays;

public class TriBulles {
    public static void main(String[] args) {
        int[] tab = {64, 25, 12, 22, 11};
        System.out.println("Avant : " + Arrays.toString(tab));

        for (int i = 0; i < tab.length - 1; i++) {
            for (int j = 0; j < tab.length - 1 - i; j++) {
                if (tab[j] > tab[j + 1]) {
                    int temp = tab[j];
                    tab[j] = tab[j + 1];
                    tab[j + 1] = temp;
                }
            }
            System.out.println("Étape " + (i+1) + " : " + Arrays.toString(tab));
        }
    }
}`},

{id:28,title:"Matrice transposée",cat:"tableaux",catLabel:"Tableaux",difficulty:3,
 description:"Crée une matrice 3×3 et affiche sa transposée (lignes ↔ colonnes).",
 hints:["transposee[j][i] = matrice[i][j]","Utilise deux boucles for imbriquées"],
 solution:`public class Transposee {
    public static void main(String[] args) {
        int[][] mat = {{1,2,3},{4,5,6},{7,8,9}};
        int[][] trans = new int[3][3];

        System.out.println("Originale :");
        for (int[] ligne : mat) {
            for (int val : ligne) System.out.print(val + " ");
            System.out.println();
        }

        for (int i = 0; i < 3; i++)
            for (int j = 0; j < 3; j++)
                trans[j][i] = mat[i][j];

        System.out.println("Transposée :");
        for (int[] ligne : trans) {
            for (int val : ligne) System.out.print(val + " ");
            System.out.println();
        }
    }
}`},

{id:29,title:"ArrayList — Liste de courses",cat:"tableaux",catLabel:"Tableaux",difficulty:2,
 description:"Crée une ArrayList<String> de courses. Ajoute 5 items, supprime-en un, vérifie si \"Lait\" est dans la liste, affiche le total.",
 hints:["add(), remove(), contains(), size()","Import java.util.ArrayList"],
 solution:`import java.util.ArrayList;

public class Courses {
    public static void main(String[] args) {
        ArrayList<String> liste = new ArrayList<>();
        liste.add("Pain");
        liste.add("Lait");
        liste.add("Oeufs");
        liste.add("Beurre");
        liste.add("Fromage");
        System.out.println("Liste : " + liste);

        liste.remove("Beurre");
        System.out.println("Après suppression : " + liste);
        System.out.println("Contient Lait ? " + liste.contains("Lait"));
        System.out.println("Total : " + liste.size() + " articles");
    }
}`},

{id:30,title:"Supprimer les doublons",cat:"tableaux",catLabel:"Tableaux",difficulty:3,
 description:"À partir d'un tableau {1,3,5,3,7,1,9,5}, crée une ArrayList sans doublons et affiche le résultat.",
 hints:["Parcours le tableau et vérifie avec contains() avant d'ajouter","Ou utilise un HashSet"],
 solution:`import java.util.ArrayList;

public class Doublons {
    public static void main(String[] args) {
        int[] tab = {1, 3, 5, 3, 7, 1, 9, 5};
        ArrayList<Integer> uniques = new ArrayList<>();

        for (int val : tab) {
            if (!uniques.contains(val)) {
                uniques.add(val);
            }
        }
        System.out.println("Sans doublons : " + uniques);
    }
}`},

// ─── CAT 6 : Chaînes (String) (6) ───
{id:31,title:"Analyseur de texte",cat:"strings",catLabel:"Strings",difficulty:2,
 description:"Demande une phrase à l'utilisateur et affiche :<br>• Nombre de caractères<br>• Nombre de mots<br>• En majuscules et minuscules<br>• Inversée",
 hints:["split(\" \") pour compter les mots","new StringBuilder(s).reverse().toString() pour inverser"],
 solution:`import java.util.Scanner;

public class Analyseur {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        System.out.print("Phrase : ");
        String phrase = sc.nextLine();

        System.out.println("Caractères : " + phrase.length());
        System.out.println("Mots : " + phrase.split(" ").length);
        System.out.println("MAJUSCULES : " + phrase.toUpperCase());
        System.out.println("minuscules : " + phrase.toLowerCase());
        System.out.println("Inversée : " + new StringBuilder(phrase).reverse());
        sc.close();
    }
}`},

{id:32,title:"Palindrome",cat:"strings",catLabel:"Strings",difficulty:2,
 description:"Vérifie si un mot est un palindrome (se lit pareil à l'endroit et à l'envers). Ignore la casse.",
 hints:["Compare le mot avec sa version inversée","toLowerCase() avant la comparaison"],
 solution:`import java.util.Scanner;

public class Palindrome {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        System.out.print("Mot : ");
        String mot = sc.nextLine().toLowerCase();
        String inverse = new StringBuilder(mot).reverse().toString();
        System.out.println(mot.equals(inverse) ? "✅ Palindrome !" : "❌ Pas un palindrome");
        sc.close();
    }
}`},

{id:33,title:"Compteur de voyelles",cat:"strings",catLabel:"Strings",difficulty:2,
 description:"Compte le nombre de voyelles (a, e, i, o, u) dans une phrase saisie par l'utilisateur.",
 hints:["Convertis en minuscules et parcours chaque caractère","charAt(i) pour accéder à chaque caractère"],
 solution:`import java.util.Scanner;

public class Voyelles {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        System.out.print("Phrase : ");
        String phrase = sc.nextLine().toLowerCase();
        int voyelles = 0;
        for (char c : phrase.toCharArray()) {
            if ("aeiou".indexOf(c) != -1) voyelles++;
        }
        System.out.println("Voyelles : " + voyelles);
        sc.close();
    }
}`},

{id:34,title:"Validateur d'email",cat:"strings",catLabel:"Strings",difficulty:3,
 description:"Vérifie qu'un email est valide (contient @, un point après @, pas d'espaces, longueur min 5).",
 hints:["contains(\"@\"), indexOf(\".\"), indexOf(\" \")","Vérifie que le . est après le @"],
 solution:`import java.util.Scanner;

public class EmailValid {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        System.out.print("Email : ");
        String email = sc.nextLine().trim();

        boolean valide = email.length() >= 5
            && email.contains("@")
            && email.indexOf(".") > email.indexOf("@") + 1
            && !email.contains(" ")
            && email.indexOf("@") > 0;

        System.out.println(valide ? "✅ Email valide" : "❌ Email invalide");
        sc.close();
    }
}`},

{id:35,title:"Caesar Cipher",cat:"strings",catLabel:"Strings",difficulty:3,
 description:"Implémente le chiffrement de César : décale chaque lettre de N positions dans l'alphabet. Chiffre et déchiffre un message.",
 hints:["(c - 'a' + decalage) % 26 + 'a' pour minuscules","Gère majuscules et minuscules séparément"],
 solution:`public class Caesar {
    public static String chiffrer(String texte, int dec) {
        StringBuilder sb = new StringBuilder();
        for (char c : texte.toCharArray()) {
            if (Character.isLetter(c)) {
                char base = Character.isUpperCase(c) ? 'A' : 'a';
                sb.append((char)((c - base + dec) % 26 + base));
            } else {
                sb.append(c);
            }
        }
        return sb.toString();
    }

    public static void main(String[] args) {
        String msg = "Bonjour Java";
        int dec = 3;
        String chiffre = chiffrer(msg, dec);
        String dechiffre = chiffrer(chiffre, 26 - dec);
        System.out.println("Original : " + msg);
        System.out.println("Chiffré  : " + chiffre);
        System.out.println("Déchiffré: " + dechiffre);
    }
}`},

{id:36,title:"Générateur de mot de passe",cat:"strings",catLabel:"Strings",difficulty:2,
 description:"Génère un mot de passe aléatoire de longueur N avec majuscules, minuscules, chiffres et symboles.",
 hints:["Crée une String avec tous les caractères possibles","charAt((int)(Math.random()*chars.length()))"],
 solution:`import java.util.Scanner;

public class MotDePasse {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        System.out.print("Longueur : ");
        int n = sc.nextInt();

        String chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%&*";
        StringBuilder mdp = new StringBuilder();
        for (int i = 0; i < n; i++) {
            mdp.append(chars.charAt((int)(Math.random() * chars.length())));
        }
        System.out.println("Mot de passe : " + mdp);
        sc.close();
    }
}`},

// ─── CAT 7 : Méthodes (6) ───
{id:37,title:"Bibliothèque mathématique",cat:"methodes",catLabel:"Méthodes",difficulty:2,
 description:"Crée une classe <code>MathUtils</code> avec 4 méthodes statiques :<br>• <code>max(a, b)</code><br>• <code>min(a, b)</code><br>• <code>puissance(base, exp)</code><br>• <code>factorielle(n)</code>",
 hints:["public static int max(int a, int b) { return a > b ? a : b; }","La factorielle peut être itérative ou récursive"],
 solution:`public class MathUtils {
    public static int max(int a, int b) { return a > b ? a : b; }
    public static int min(int a, int b) { return a < b ? a : b; }
    public static long puissance(int base, int exp) {
        long result = 1;
        for (int i = 0; i < exp; i++) result *= base;
        return result;
    }
    public static long factorielle(int n) {
        long result = 1;
        for (int i = 2; i <= n; i++) result *= i;
        return result;
    }

    public static void main(String[] args) {
        System.out.println("max(5,3) = " + max(5, 3));
        System.out.println("min(5,3) = " + min(5, 3));
        System.out.println("2^10 = " + puissance(2, 10));
        System.out.println("5! = " + factorielle(5));
    }
}`},

{id:38,title:"Surcharge de méthodes",cat:"methodes",catLabel:"Méthodes",difficulty:2,
 description:"Crée 3 versions surchargées de <code>afficher()</code> :<br>• <code>afficher(int n)</code><br>• <code>afficher(String s)</code><br>• <code>afficher(int n, String s)</code>",
 hints:["Même nom, paramètres différents = surcharge (overloading)"],
 solution:`public class Surcharge {
    public static void afficher(int n) {
        System.out.println("Entier : " + n);
    }
    public static void afficher(String s) {
        System.out.println("Texte : " + s);
    }
    public static void afficher(int n, String s) {
        System.out.println(s + " = " + n);
    }

    public static void main(String[] args) {
        afficher(42);
        afficher("Bonjour");
        afficher(100, "Score");
    }
}`},

{id:39,title:"Convertisseur de température",cat:"methodes",catLabel:"Méthodes",difficulty:1,
 description:"Crée deux fonctions :<br>• <code>celsiusToFahrenheit(double c)</code><br>• <code>fahrenheitToCelsius(double f)</code><br>Formules : F = C × 9/5 + 32 et C = (F-32) × 5/9",
 hints:["Le type de retour est double","Attention à la division entière : 9.0/5 au lieu de 9/5"],
 solution:`public class Temperature {
    public static double celsiusToFahrenheit(double c) {
        return c * 9.0 / 5 + 32;
    }
    public static double fahrenheitToCelsius(double f) {
        return (f - 32) * 5.0 / 9;
    }

    public static void main(String[] args) {
        System.out.printf("100°C = %.1f°F%n", celsiusToFahrenheit(100));
        System.out.printf("212°F = %.1f°C%n", fahrenheitToCelsius(212));
        System.out.printf("0°C = %.1f°F%n", celsiusToFahrenheit(0));
    }
}`},

{id:40,title:"Tableau retourné par méthode",cat:"methodes",catLabel:"Méthodes",difficulty:2,
 description:"Crée une méthode <code>genererNotes(int n)</code> qui retourne un tableau de n notes aléatoires (0-20). Puis une méthode <code>moyenne(int[] notes)</code>.",
 hints:["public static int[] genererNotes(int n) { ... return tab; }","La moyenne retourne un double"],
 solution:`public class Notes {
    public static int[] genererNotes(int n) {
        int[] notes = new int[n];
        for (int i = 0; i < n; i++) {
            notes[i] = (int)(Math.random() * 21);
        }
        return notes;
    }

    public static double moyenne(int[] notes) {
        int somme = 0;
        for (int n : notes) somme += n;
        return somme / (double) notes.length;
    }

    public static void main(String[] args) {
        int[] notes = genererNotes(10);
        for (int n : notes) System.out.print(n + " ");
        System.out.printf("%nMoyenne : %.1f%n", moyenne(notes));
    }
}`},

{id:41,title:"Récursion — Tour de Hanoï",cat:"methodes",catLabel:"Méthodes",difficulty:3,
 description:"Implémente l'algorithme récursif des Tours de Hanoï pour N disques.",
 hints:["hanoi(n, source, dest, inter)","Cas de base : n == 1, déplacer directement"],
 solution:`public class Hanoi {
    public static void hanoi(int n, char src, char dest, char inter) {
        if (n == 1) {
            System.out.println("Déplacer disque 1 de " + src + " → " + dest);
            return;
        }
        hanoi(n - 1, src, inter, dest);
        System.out.println("Déplacer disque " + n + " de " + src + " → " + dest);
        hanoi(n - 1, inter, dest, src);
    }

    public static void main(String[] args) {
        System.out.println("=== 3 disques ===");
        hanoi(3, 'A', 'C', 'B');
    }
}`},

{id:42,title:"Validateur avec méthodes",cat:"methodes",catLabel:"Méthodes",difficulty:2,
 description:"Crée des méthodes de validation :<br>• <code>estPositif(int n)</code><br>• <code>estPair(int n)</code><br>• <code>estDansIntervalle(int n, int min, int max)</code>",
 hints:["Retournent toutes un boolean"],
 solution:`public class Validateur {
    public static boolean estPositif(int n) { return n > 0; }
    public static boolean estPair(int n) { return n % 2 == 0; }
    public static boolean estDansIntervalle(int n, int min, int max) {
        return n >= min && n <= max;
    }

    public static void main(String[] args) {
        int val = 42;
        System.out.println(val + " positif ? " + estPositif(val));
        System.out.println(val + " pair ? " + estPair(val));
        System.out.println(val + " dans [1,100] ? " + estDansIntervalle(val, 1, 100));
    }
}`},

// ─── CAT 8 : Classes & Objets (6) ───
{id:43,title:"Classe Voiture complète",cat:"classes",catLabel:"Classes & Objets",difficulty:2,
 description:"Crée une classe <code>Voiture</code> avec : marque, modèle, année, km.<br>Constructeur, méthode <code>rouler(km)</code>, méthode <code>toString()</code>. Crée 2 objets et fais-les rouler.",
 hints:["this.km += km dans rouler()","@Override public String toString()"],
 solution:`public class Voiture {
    String marque, modele;
    int annee, km;

    public Voiture(String marque, String modele, int annee) {
        this.marque = marque;
        this.modele = modele;
        this.annee = annee;
        this.km = 0;
    }

    public void rouler(int distance) {
        this.km += distance;
        System.out.println(marque + " roule " + distance + " km");
    }

    @Override
    public String toString() {
        return marque + " " + modele + " (" + annee + ") - " + km + " km";
    }

    public static void main(String[] args) {
        Voiture v1 = new Voiture("Toyota", "Corolla", 2022);
        Voiture v2 = new Voiture("Peugeot", "308", 2023);
        v1.rouler(15000);
        v2.rouler(8000);
        System.out.println(v1);
        System.out.println(v2);
    }
}`},

{id:44,title:"Classe CompteBancaire",cat:"classes",catLabel:"Classes & Objets",difficulty:2,
 description:"Crée une classe avec : titulaire, solde.<br>Méthodes : <code>deposer()</code>, <code>retirer()</code> (vérifie solde), <code>toString()</code>.",
 hints:["Constructeur avec solde initial","retirer vérifie que montant <= solde"],
 solution:`public class CompteBancaire {
    String titulaire;
    double solde;

    public CompteBancaire(String titulaire, double soldeInitial) {
        this.titulaire = titulaire;
        this.solde = soldeInitial;
    }

    public void deposer(double montant) {
        solde += montant;
        System.out.println("+" + montant + "€ → Solde : " + solde + "€");
    }

    public void retirer(double montant) {
        if (montant > solde) {
            System.out.println("❌ Solde insuffisant !");
        } else {
            solde -= montant;
            System.out.println("-" + montant + "€ → Solde : " + solde + "€");
        }
    }

    @Override
    public String toString() {
        return titulaire + " : " + solde + "€";
    }

    public static void main(String[] args) {
        CompteBancaire c = new CompteBancaire("JavaDuke", 1000);
        c.deposer(500);
        c.retirer(200);
        c.retirer(2000);
        System.out.println(c);
    }
}`},

{id:45,title:"Classe Etudiant avec notes",cat:"classes",catLabel:"Classes & Objets",difficulty:2,
 description:"Crée une classe Etudiant avec nom et tableau de notes. Ajoute les méthodes <code>moyenne()</code> et <code>meilleure()</code>.",
 hints:["Stockez les notes dans un ArrayList<Integer>","Méthode add() pour ajouter une note"],
 solution:`import java.util.ArrayList;

public class Etudiant {
    String nom;
    ArrayList<Integer> notes;

    public Etudiant(String nom) {
        this.nom = nom;
        this.notes = new ArrayList<>();
    }

    public void ajouterNote(int note) { notes.add(note); }

    public double moyenne() {
        int somme = 0;
        for (int n : notes) somme += n;
        return notes.isEmpty() ? 0 : somme / (double) notes.size();
    }

    public int meilleure() {
        int max = 0;
        for (int n : notes) if (n > max) max = n;
        return max;
    }

    public static void main(String[] args) {
        Etudiant e = new Etudiant("Alice");
        e.ajouterNote(15); e.ajouterNote(18); e.ajouterNote(12);
        System.out.printf("%s — Moyenne: %.1f — Max: %d%n", e.nom, e.moyenne(), e.meilleure());
    }
}`},

{id:46,title:"Constructeurs multiples",cat:"classes",catLabel:"Classes & Objets",difficulty:2,
 description:"Crée une classe <code>Livre</code> avec 3 constructeurs :<br>• Sans paramètre (valeurs par défaut)<br>• Avec titre et auteur<br>• Avec titre, auteur et pages",
 hints:["Surcharge de constructeurs","this(titre, auteur) pour chaîner"],
 solution:`public class Livre {
    String titre, auteur;
    int pages;

    public Livre() {
        this("Inconnu", "Anonyme", 0);
    }
    public Livre(String titre, String auteur) {
        this(titre, auteur, 0);
    }
    public Livre(String titre, String auteur, int pages) {
        this.titre = titre;
        this.auteur = auteur;
        this.pages = pages;
    }

    @Override
    public String toString() {
        return titre + " par " + auteur + " (" + pages + " p.)";
    }

    public static void main(String[] args) {
        System.out.println(new Livre());
        System.out.println(new Livre("Java", "Duke"));
        System.out.println(new Livre("Clean Code", "R. Martin", 464));
    }
}`},

{id:47,title:"Static — Compteur d'instances",cat:"classes",catLabel:"Classes & Objets",difficulty:2,
 description:"Crée une classe <code>Joueur</code> avec un compteur static qui s'incrémente à chaque new. Chaque joueur a un ID unique.",
 hints:["private static int compteur = 0","this.id = ++compteur dans le constructeur"],
 solution:`public class Joueur {
    private static int compteur = 0;
    private int id;
    private String pseudo;

    public Joueur(String pseudo) {
        this.id = ++compteur;
        this.pseudo = pseudo;
    }

    @Override
    public String toString() {
        return "Joueur #" + id + " : " + pseudo;
    }

    public static int getNombreJoueurs() { return compteur; }

    public static void main(String[] args) {
        Joueur j1 = new Joueur("Alice");
        Joueur j2 = new Joueur("Bob");
        Joueur j3 = new Joueur("Charlie");
        System.out.println(j1);
        System.out.println(j2);
        System.out.println(j3);
        System.out.println("Total joueurs : " + Joueur.getNombreJoueurs());
    }
}`},

{id:48,title:"Classe avec tableau d'objets",cat:"classes",catLabel:"Classes & Objets",difficulty:3,
 description:"Crée une classe <code>Equipe</code> qui contient un ArrayList<Joueur>. Méthodes : <code>ajouter()</code>, <code>lister()</code>, <code>trouver(nom)</code>.",
 hints:["Réutilise la classe Joueur précédente","for-each pour parcourir l'ArrayList"],
 solution:`import java.util.ArrayList;

public class Equipe {
    private String nom;
    private ArrayList<String> joueurs;

    public Equipe(String nom) {
        this.nom = nom;
        this.joueurs = new ArrayList<>();
    }

    public void ajouter(String joueur) {
        joueurs.add(joueur);
        System.out.println(joueur + " rejoint " + nom);
    }

    public void lister() {
        System.out.println("Équipe " + nom + " :");
        for (int i = 0; i < joueurs.size(); i++) {
            System.out.println("  " + (i+1) + ". " + joueurs.get(i));
        }
    }

    public boolean trouver(String joueur) {
        return joueurs.contains(joueur);
    }

    public static void main(String[] args) {
        Equipe e = new Equipe("Alpha");
        e.ajouter("Alice");
        e.ajouter("Bob");
        e.ajouter("Charlie");
        e.lister();
        System.out.println("Bob présent ? " + e.trouver("Bob"));
    }
}`},

// ─── CAT 9 : Encapsulation (5) ───
{id:49,title:"Encapsulation complète",cat:"encapsulation",catLabel:"Encapsulation",difficulty:2,
 description:"Crée une classe <code>Personne</code> entièrement encapsulée : attributs private, getters, setters avec validation (nom non vide, âge 0-150).",
 hints:["Le setter lève une IllegalArgumentException si invalide","Getter simple : return this.nom"],
 solution:`public class Personne {
    private String nom;
    private int age;

    public Personne(String nom, int age) {
        setNom(nom);
        setAge(age);
    }

    public String getNom() { return nom; }
    public int getAge() { return age; }

    public void setNom(String nom) {
        if (nom == null || nom.trim().isEmpty())
            throw new IllegalArgumentException("Nom ne peut pas être vide");
        this.nom = nom.trim();
    }

    public void setAge(int age) {
        if (age < 0 || age > 150)
            throw new IllegalArgumentException("Âge invalide : " + age);
        this.age = age;
    }

    @Override
    public String toString() {
        return nom + " (" + age + " ans)";
    }

    public static void main(String[] args) {
        Personne p = new Personne("Alice", 25);
        System.out.println(p);
        p.setAge(30);
        System.out.println("Après modif : " + p);
    }
}`},

{id:50,title:"Classe immutable",cat:"encapsulation",catLabel:"Encapsulation",difficulty:3,
 description:"Crée une classe <code>Point</code> immutable (une fois créé, rien ne peut changer). Attributs final, pas de setters.",
 hints:["private final int x, y","Pas de setters, seulement des getters"],
 solution:`public class Point {
    private final int x;
    private final int y;

    public Point(int x, int y) {
        this.x = x;
        this.y = y;
    }

    public int getX() { return x; }
    public int getY() { return y; }

    public double distanceOrigine() {
        return Math.sqrt(x * x + y * y);
    }

    public Point translater(int dx, int dy) {
        return new Point(x + dx, y + dy);  // Nouveau Point, l'ancien est intact
    }

    @Override
    public String toString() {
        return "(" + x + ", " + y + ")";
    }

    public static void main(String[] args) {
        Point p1 = new Point(3, 4);
        Point p2 = p1.translater(2, 1);
        System.out.println("P1 : " + p1 + " dist=" + p1.distanceOrigine());
        System.out.println("P2 : " + p2);
    }
}`},

{id:51,title:"Modificateurs d'accès",cat:"encapsulation",catLabel:"Encapsulation",difficulty:2,
 description:"Crée une classe avec un attribut de chaque visibilité : private, default, protected, public. Montre les accès possibles.",
 hints:["private = classe seule, public = partout","default = sans mot-clé, accessible dans le package"],
 solution:`public class Acces {
    private int prive = 1;
    int defaut = 2;           // package-private
    protected int protege = 3;
    public int publique = 4;

    public void afficherTout() {
        // Dans la classe : tout est accessible
        System.out.println("private: " + prive);
        System.out.println("default: " + defaut);
        System.out.println("protected: " + protege);
        System.out.println("public: " + publique);
    }

    public static void main(String[] args) {
        Acces a = new Acces();
        a.afficherTout();
        // De l'extérieur de la classe :
        // a.prive → ❌ interdit
        System.out.println("Depuis main : " + a.publique); // ✅ OK
    }
}`},

{id:52,title:"ToString & equals",cat:"encapsulation",catLabel:"Encapsulation",difficulty:3,
 description:"Redéfinis <code>toString()</code> et <code>equals()</code> dans une classe <code>Produit</code> (nom, prix). Deux produits sont égaux si même nom.",
 hints:["@Override equals : vérifie instanceof puis compare les noms","Pense à gérer null et le type"],
 solution:`public class Produit {
    private String nom;
    private double prix;

    public Produit(String nom, double prix) {
        this.nom = nom;
        this.prix = prix;
    }

    @Override
    public String toString() {
        return nom + " (" + prix + "€)";
    }

    @Override
    public boolean equals(Object obj) {
        if (this == obj) return true;
        if (!(obj instanceof Produit)) return false;
        Produit other = (Produit) obj;
        return this.nom.equals(other.nom);
    }

    public static void main(String[] args) {
        Produit p1 = new Produit("Café", 2.50);
        Produit p2 = new Produit("Café", 3.00);
        Produit p3 = new Produit("Thé", 1.80);
        System.out.println(p1 + " equals " + p2 + " ? " + p1.equals(p2)); // true
        System.out.println(p1 + " equals " + p3 + " ? " + p1.equals(p3)); // false
    }
}`},

{id:53,title:"Builder Pattern simplifié",cat:"encapsulation",catLabel:"Encapsulation",difficulty:3,
 description:"Crée une classe <code>Pizza</code> avec un constructeur privé et une méthode builder chaînable pour construire des pizzas.",
 hints:["Chaque méthode setter retourne this","pizza.taille(\"L\").fromage(true).tomate(true)"],
 solution:`public class Pizza {
    private String taille;
    private boolean fromage;
    private boolean tomate;
    private boolean champignons;

    private Pizza() {}

    public static Pizza builder() { return new Pizza(); }

    public Pizza taille(String t) { this.taille = t; return this; }
    public Pizza fromage(boolean f) { this.fromage = f; return this; }
    public Pizza tomate(boolean t) { this.tomate = t; return this; }
    public Pizza champignons(boolean c) { this.champignons = c; return this; }

    @Override
    public String toString() {
        return "Pizza " + taille + " |"
            + (fromage ? " Fromage" : "")
            + (tomate ? " Tomate" : "")
            + (champignons ? " Champignons" : "");
    }

    public static void main(String[] args) {
        Pizza p = Pizza.builder()
            .taille("L")
            .fromage(true)
            .tomate(true)
            .champignons(false);
        System.out.println(p);
    }
}`},

// ─── CAT 10 : Collections avancées (5) ───
{id:54,title:"HashMap — Annuaire téléphonique",cat:"collections",catLabel:"Collections",difficulty:2,
 description:"Crée un annuaire avec HashMap<String, String>. Ajoute 5 contacts, cherche un numéro par nom, affiche tous les contacts.",
 hints:["put() pour ajouter, get() pour chercher","entrySet() pour parcourir"],
 solution:`import java.util.HashMap;
import java.util.Map;

public class Annuaire {
    public static void main(String[] args) {
        HashMap<String, String> contacts = new HashMap<>();
        contacts.put("Alice", "06-11-22-33-44");
        contacts.put("Bob", "06-55-66-77-88");
        contacts.put("Charlie", "06-99-00-11-22");
        contacts.put("Diana", "06-33-44-55-66");
        contacts.put("Eve", "06-77-88-99-00");

        // Recherche
        String nom = "Bob";
        System.out.println(nom + " : " + contacts.getOrDefault(nom, "Non trouvé"));

        // Liste complète
        System.out.println("\\n📞 Annuaire complet :");
        for (Map.Entry<String, String> e : contacts.entrySet()) {
            System.out.println("  " + e.getKey() + " → " + e.getValue());
        }
    }
}`},

{id:55,title:"Compteur de mots (HashMap)",cat:"collections",catLabel:"Collections",difficulty:3,
 description:"Compte l'occurrence de chaque mot dans une phrase avec HashMap<String, Integer>.",
 hints:["split(\" \") pour obtenir les mots","getOrDefault(mot, 0) + 1 pour incrémenter"],
 solution:`import java.util.HashMap;
import java.util.Map;

public class CompteurMots {
    public static void main(String[] args) {
        String texte = "le chat mange le poisson et le chat dort";
        String[] mots = texte.toLowerCase().split(" ");

        HashMap<String, Integer> compteur = new HashMap<>();
        for (String mot : mots) {
            compteur.put(mot, compteur.getOrDefault(mot, 0) + 1);
        }

        for (Map.Entry<String, Integer> e : compteur.entrySet()) {
            System.out.println(e.getKey() + " : " + e.getValue() + " fois");
        }
    }
}`},

{id:56,title:"Gestion d'inventaire (ArrayList + HashMap)",cat:"collections",catLabel:"Collections",difficulty:3,
 description:"Crée un système d'inventaire : HashMap<String, Integer> (produit → quantité). Méthodes pour ajouter du stock, retirer, afficher.",
 hints:["put() pour ajouter/modifier","Vérifie que la quantité ne descend pas sous 0"],
 solution:`import java.util.HashMap;
import java.util.Map;

public class Inventaire {
    static HashMap<String, Integer> stock = new HashMap<>();

    static void ajouter(String produit, int qte) {
        stock.put(produit, stock.getOrDefault(produit, 0) + qte);
        System.out.println("+ " + qte + " " + produit);
    }

    static void retirer(String produit, int qte) {
        int actuel = stock.getOrDefault(produit, 0);
        if (actuel < qte) {
            System.out.println("❌ Stock insuffisant pour " + produit);
        } else {
            stock.put(produit, actuel - qte);
            System.out.println("- " + qte + " " + produit);
        }
    }

    static void afficher() {
        System.out.println("📦 Inventaire :");
        for (Map.Entry<String, Integer> e : stock.entrySet()) {
            System.out.println("  " + e.getKey() + " : " + e.getValue());
        }
    }

    public static void main(String[] args) {
        ajouter("Café", 50);
        ajouter("Thé", 30);
        ajouter("Café", 20);
        retirer("Thé", 10);
        retirer("Eau", 5);
        afficher();
    }
}`},

{id:57,title:"Tri d'ArrayList d'objets",cat:"collections",catLabel:"Collections",difficulty:3,
 description:"Crée une ArrayList de Personne (nom, age). Trie par âge croissant avec <code>Collections.sort()</code> et un Comparator.",
 hints:["Collections.sort(list, (a,b) -> a.age - b.age)","Ou implémente Comparable<Personne>"],
 solution:`import java.util.ArrayList;
import java.util.Collections;

public class TriPersonnes {
    static String nom;
    static int age;

    public static void main(String[] args) {
        ArrayList<String> noms = new ArrayList<>();
        noms.add("Charlie:30");
        noms.add("Alice:25");
        noms.add("Bob:28");
        noms.add("Diana:22");

        // Tri par âge (extrait du format "nom:age")
        Collections.sort(noms, (a, b) -> {
            int ageA = Integer.parseInt(a.split(":")[1]);
            int ageB = Integer.parseInt(b.split(":")[1]);
            return ageA - ageB;
        });

        System.out.println("Trié par âge :");
        for (String s : noms) {
            String[] parts = s.split(":");
            System.out.println("  " + parts[0] + " (" + parts[1] + " ans)");
        }
    }
}`},

{id:58,title:"File d'attente avec ArrayList",cat:"collections",catLabel:"Collections",difficulty:2,
 description:"Simule une file d'attente FIFO (First In, First Out) avec ArrayList. Méthodes : enfiler, défiler, afficher.",
 hints:["add() pour enfiler (à la fin)","remove(0) pour défiler (du début)"],
 solution:`import java.util.ArrayList;

public class FileAttente {
    static ArrayList<String> file = new ArrayList<>();

    static void enfiler(String personne) {
        file.add(personne);
        System.out.println(personne + " entre dans la file");
    }

    static String defiler() {
        if (file.isEmpty()) {
            System.out.println("File vide !");
            return null;
        }
        String premier = file.remove(0);
        System.out.println(premier + " quitte la file");
        return premier;
    }

    static void afficher() {
        System.out.println("File : " + file + " (" + file.size() + " personnes)");
    }

    public static void main(String[] args) {
        enfiler("Alice");
        enfiler("Bob");
        enfiler("Charlie");
        afficher();
        defiler();
        defiler();
        afficher();
    }
}`},

// ─── CAT 11 : Héritage & Polymorphisme (6) ───
{id:59,title:"Hiérarchie animale",cat:"heritage",catLabel:"Héritage",difficulty:2,
 description:"Crée une classe <code>Animal</code> avec nom et méthode <code>parler()</code>. Crée <code>Chien</code> et <code>Chat</code> qui redéfinissent parler(). Démontre le polymorphisme avec un tableau Animal[].",
 hints:["extends pour hériter","@Override pour redéfinir parler()"],
 solution:`public class Zoo {
    static class Animal {
        String nom;
        Animal(String nom) { this.nom = nom; }
        void parler() { System.out.println(nom + " fait du bruit"); }
    }

    static class Chien extends Animal {
        Chien(String nom) { super(nom); }
        @Override void parler() { System.out.println(nom + " : Woof ! 🐕"); }
    }

    static class Chat extends Animal {
        Chat(String nom) { super(nom); }
        @Override void parler() { System.out.println(nom + " : Miaou ! 🐱"); }
    }

    public static void main(String[] args) {
        Animal[] zoo = { new Chien("Rex"), new Chat("Mimi"), new Chien("Buddy") };
        for (Animal a : zoo) {
            a.parler();  // Polymorphisme !
        }
    }
}`},

{id:60,title:"Formes géométriques (abstract)",cat:"heritage",catLabel:"Héritage",difficulty:3,
 description:"Crée une classe abstraite <code>Forme</code> avec aire() et perimetre() abstraites. Implémente <code>Cercle</code> et <code>Rectangle</code>.",
 hints:["public abstract double aire();","Math.PI pour le cercle"],
 solution:`public class Formes {
    static abstract class Forme {
        abstract double aire();
        abstract double perimetre();
        void afficher() {
            System.out.printf("Aire: %.2f | Périmètre: %.2f%n", aire(), perimetre());
        }
    }

    static class Cercle extends Forme {
        double rayon;
        Cercle(double r) { this.rayon = r; }
        @Override double aire() { return Math.PI * rayon * rayon; }
        @Override double perimetre() { return 2 * Math.PI * rayon; }
    }

    static class Rectangle extends Forme {
        double longueur, largeur;
        Rectangle(double l, double L) { this.longueur = l; this.largeur = L; }
        @Override double aire() { return longueur * largeur; }
        @Override double perimetre() { return 2 * (longueur + largeur); }
    }

    public static void main(String[] args) {
        Forme[] formes = { new Cercle(5), new Rectangle(4, 6) };
        for (Forme f : formes) {
            System.out.println(f.getClass().getSimpleName() + " :");
            f.afficher();
        }
    }
}`},

{id:61,title:"Interface Vehicule",cat:"heritage",catLabel:"Héritage",difficulty:2,
 description:"Crée une interface <code>Vehicule</code> avec <code>demarrer()</code> et <code>arreter()</code>. Implémente avec <code>Moto</code> et <code>Camion</code>.",
 hints:["interface Vehicule { void demarrer(); void arreter(); }","implements pour implémenter"],
 solution:`public class Vehicules {
    interface Vehicule {
        void demarrer();
        void arreter();
    }

    static class Moto implements Vehicule {
        @Override public void demarrer() { System.out.println("🏍️ Moto démarre : Vroooom !"); }
        @Override public void arreter() { System.out.println("🏍️ Moto s'arrête"); }
    }

    static class Camion implements Vehicule {
        @Override public void demarrer() { System.out.println("🚛 Camion démarre : Grooom !"); }
        @Override public void arreter() { System.out.println("🚛 Camion s'arrête"); }
    }

    public static void main(String[] args) {
        Vehicule[] garage = { new Moto(), new Camion() };
        for (Vehicule v : garage) {
            v.demarrer();
            v.arreter();
        }
    }
}`},

{id:62,title:"instanceof & downcasting",cat:"heritage",catLabel:"Héritage",difficulty:3,
 description:"Crée un tableau d'Animal contenant Chien et Chat. Utilise <code>instanceof</code> pour appeler des méthodes spécifiques à chaque sous-classe.",
 hints:["if (animal instanceof Chien) { Chien c = (Chien) animal; }"],
 solution:`public class InstanceOf {
    static class Animal { String nom; Animal(String n) { nom = n; } }
    static class Chien extends Animal {
        Chien(String n) { super(n); }
        void chercher() { System.out.println(nom + " va chercher la balle ! 🎾"); }
    }
    static class Chat extends Animal {
        Chat(String n) { super(n); }
        void ronronner() { System.out.println(nom + " ronronne... 😺"); }
    }

    public static void main(String[] args) {
        Animal[] animaux = { new Chien("Rex"), new Chat("Mimi"), new Chien("Buddy"), new Chat("Luna") };
        for (Animal a : animaux) {
            System.out.print(a.nom + " → ");
            if (a instanceof Chien) ((Chien) a).chercher();
            else if (a instanceof Chat) ((Chat) a).ronronner();
        }
    }
}`},

{id:63,title:"Héritage multiple via interfaces",cat:"heritage",catLabel:"Héritage",difficulty:3,
 description:"Crée les interfaces <code>Nageur</code> et <code>Volant</code>. Crée <code>Canard</code> qui implémente les deux.",
 hints:["class Canard extends Animal implements Nageur, Volant","Chaque interface a une méthode"],
 solution:`public class MultiInterface {
    interface Nageur { void nager(); }
    interface Volant { void voler(); }

    static class Canard implements Nageur, Volant {
        String nom;
        Canard(String n) { this.nom = n; }
        @Override public void nager() { System.out.println(nom + " nage ! 🏊"); }
        @Override public void voler() { System.out.println(nom + " vole ! 🦆"); }
    }

    static class Poisson implements Nageur {
        @Override public void nager() { System.out.println("Le poisson nage ! 🐟"); }
    }

    public static void main(String[] args) {
        Canard donald = new Canard("Donald");
        donald.nager();
        donald.voler();

        Nageur[] nageurs = { donald, new Poisson() };
        for (Nageur n : nageurs) n.nager();
    }
}`},

{id:64,title:"Super et chaîne de constructeurs",cat:"heritage",catLabel:"Héritage",difficulty:2,
 description:"Crée 3 niveaux : <code>Etre</code> → <code>Personne</code> → <code>Employe</code>. Chaque constructeur appelle <code>super()</code>.",
 hints:["super(args) doit être la 1ère ligne","Chaque classe ajoute ses propres attributs"],
 solution:`public class Hierarchie {
    static class Etre {
        String type;
        Etre(String type) {
            this.type = type;
            System.out.println("Etre créé : " + type);
        }
    }

    static class Personne extends Etre {
        String nom;
        Personne(String nom) {
            super("Humain");
            this.nom = nom;
            System.out.println("Personne : " + nom);
        }
    }

    static class Employe extends Personne {
        String poste;
        Employe(String nom, String poste) {
            super(nom);
            this.poste = poste;
            System.out.println("Employé : " + poste);
        }
    }

    public static void main(String[] args) {
        System.out.println("--- Création d'un Employé ---");
        Employe e = new Employe("Alice", "Développeuse");
        System.out.println("Résultat : " + e.nom + " - " + e.poste + " (" + e.type + ")");
    }
}`},

// ─── CAT 12 : Exceptions (6) ───
{id:65,title:"Saisie sécurisée (boucle + try/catch)",cat:"exceptions",catLabel:"Exceptions",difficulty:2,
 description:"Demande un entier à l'utilisateur en boucle jusqu'à ce qu'il entre une valeur valide. Gère NumberFormatException.",
 hints:["while(true) avec break quand la saisie est OK","try { parseInt } catch { message d'erreur }"],
 solution:`import java.util.Scanner;

public class SaisieSure {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int nombre = 0;
        boolean valide = false;

        while (!valide) {
            try {
                System.out.print("Entre un nombre entier : ");
                nombre = Integer.parseInt(sc.nextLine());
                valide = true;
            } catch (NumberFormatException e) {
                System.out.println("❌ Invalide ! Réessaye...");
            }
        }
        System.out.println("✅ Tu as entré : " + nombre);
        sc.close();
    }
}`},

{id:66,title:"Exception personnalisée — AgeException",cat:"exceptions",catLabel:"Exceptions",difficulty:3,
 description:"Crée une exception <code>AgeInvalideException</code>. Lance-la si l'âge < 0 ou > 150. Attrape-la dans le main.",
 hints:["public class AgeInvalideException extends Exception","super(message) dans le constructeur"],
 solution:`public class AgeDemo {
    static class AgeInvalideException extends Exception {
        public AgeInvalideException(int age) {
            super("Âge invalide : " + age + " (doit être entre 0 et 150)");
        }
    }

    static void verifierAge(int age) throws AgeInvalideException {
        if (age < 0 || age > 150) throw new AgeInvalideException(age);
        System.out.println("✅ Âge valide : " + age);
    }

    public static void main(String[] args) {
        int[] ages = {25, -5, 200, 70};
        for (int age : ages) {
            try {
                verifierAge(age);
            } catch (AgeInvalideException e) {
                System.out.println("❌ " + e.getMessage());
            }
        }
    }
}`},

{id:67,title:"Try-with-resources",cat:"exceptions",catLabel:"Exceptions",difficulty:2,
 description:"Démontre try-with-resources avec Scanner. Lis un nombre et divise 100 par ce nombre. Gère toutes les exceptions.",
 hints:["try (Scanner sc = new Scanner(System.in)) { }","catch multiple : NumberFormatException | ArithmeticException"],
 solution:`import java.util.Scanner;

public class TryResources {
    public static void main(String[] args) {
        try (Scanner sc = new Scanner(System.in)) {
            System.out.print("Nombre : ");
            int n = Integer.parseInt(sc.nextLine());
            System.out.println("100 / " + n + " = " + (100 / n));
        } catch (NumberFormatException e) {
            System.out.println("❌ Ce n'est pas un nombre !");
        } catch (ArithmeticException e) {
            System.out.println("❌ Division par zéro !");
        }
        System.out.println("✅ Scanner fermé automatiquement");
    }
}`},

{id:68,title:"Chaîne de throws",cat:"exceptions",catLabel:"Exceptions",difficulty:3,
 description:"Crée 3 méthodes en chaîne : <code>methodeC()</code> lance une exception, <code>methodeB()</code> la propage avec throws, <code>methodeA()</code> la gère avec try/catch.",
 hints:["methodeC throws Exception → methodeB throws Exception → methodeA try/catch"],
 solution:`public class ChainThrows {
    static void methodeC(int n) throws ArithmeticException {
        System.out.println("  C: calcul 100/" + n);
        int result = 100 / n;  // Peut lancer ArithmeticException
        System.out.println("  C: résultat = " + result);
    }

    static void methodeB(int n) throws ArithmeticException {
        System.out.println(" B: appelle C");
        methodeC(n);  // Propage l'exception
        System.out.println(" B: terminé");
    }

    static void methodeA(int n) {
        System.out.println("A: appelle B");
        try {
            methodeB(n);
            System.out.println("A: tout s'est bien passé");
        } catch (ArithmeticException e) {
            System.out.println("A: ❌ Erreur attrapée → " + e.getMessage());
        }
    }

    public static void main(String[] args) {
        System.out.println("=== Test avec 5 ===");
        methodeA(5);
        System.out.println("\\n=== Test avec 0 ===");
        methodeA(0);
    }
}`},

{id:69,title:"Multi-catch & finally",cat:"exceptions",catLabel:"Exceptions",difficulty:2,
 description:"Écris un programme qui peut lever 3 types d'exceptions (Number, Array, Null). Utilise multi-catch et finally.",
 hints:["catch (TypeA | TypeB e) pour multi-catch","finally s'exécute dans TOUS les cas"],
 solution:`public class MultiCatch {
    public static void main(String[] args) {
        String[] tests = {"42", "abc", null};

        for (String s : tests) {
            System.out.println("--- Test: " + s + " ---");
            try {
                int n = Integer.parseInt(s);      // NumberFormatException ou NullPointerException
                int[] tab = new int[n];
                tab[n] = 0;                        // ArrayIndexOutOfBoundsException
            } catch (NumberFormatException | NullPointerException e) {
                System.out.println("❌ Conversion : " + e.getClass().getSimpleName());
            } catch (ArrayIndexOutOfBoundsException e) {
                System.out.println("❌ Index hors limites");
            } finally {
                System.out.println("✅ Finally exécuté");
            }
        }
    }
}`},

{id:70,title:"Système bancaire avec exceptions",cat:"exceptions",catLabel:"Exceptions",difficulty:3,
 description:"Crée une classe CompteBancaire avec exception personnalisée <code>SoldeInsuffisantException</code>. Gère les dépôts, retraits et transferts.",
 hints:["La méthode retirer() lance SoldeInsuffisantException si montant > solde","transferer() appelle retirer() + deposer()"],
 solution:`public class Banque {
    static class SoldeInsuffisantException extends Exception {
        double montant;
        SoldeInsuffisantException(double m, double solde) {
            super("Solde insuffisant: " + solde + "€ < " + m + "€");
            this.montant = m;
        }
    }

    static class Compte {
        String nom;
        double solde;

        Compte(String nom, double solde) { this.nom = nom; this.solde = solde; }

        void deposer(double m) { solde += m; System.out.printf("  +%.0f€ → %s: %.0f€%n", m, nom, solde); }

        void retirer(double m) throws SoldeInsuffisantException {
            if (m > solde) throw new SoldeInsuffisantException(m, solde);
            solde -= m;
            System.out.printf("  -%.0f€ → %s: %.0f€%n", m, nom, solde);
        }

        void transferer(Compte dest, double m) throws SoldeInsuffisantException {
            System.out.println("Transfert " + nom + " → " + dest.nom + " : " + m + "€");
            retirer(m);
            dest.deposer(m);
        }
    }

    public static void main(String[] args) {
        Compte alice = new Compte("Alice", 1000);
        Compte bob = new Compte("Bob", 500);

        try {
            alice.transferer(bob, 300);
            alice.transferer(bob, 800);  // Solde insuffisant !
        } catch (SoldeInsuffisantException e) {
            System.out.println("❌ " + e.getMessage());
        }
    }
}`}

];

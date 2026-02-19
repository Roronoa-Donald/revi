/* ═══════════════════════════════════════════════════════════
   exercises-data.js — 70 exercices C# pas à pas
   Logique (50) + POO (20) — avec indices et solutions
   ═══════════════════════════════════════════════════════════ */
const allExercises = [

// ╔═══════════════════════════════════════╗
// ║  VARIABLES & TYPES (5 exercices)      ║
// ╚═══════════════════════════════════════╝
{id:1, cat:"variables", catLabel:"Variables", difficulty:1,
 title:"Fiche d'identité",
 description:"Déclare trois variables : ton <code>nom</code> (string), ton <code>age</code> (int) et ta <code>taille</code> (double en mètres). Affiche-les dans une phrase formatée avec interpolation.",
 hints:[
   "Utilise <code>string nom = \"…\";</code>, <code>int age = …;</code>, <code>double taille = 1.75;</code>",
   "L'interpolation se fait avec <code>$\"Bonjour {nom}\"</code>",
   "Pour la taille avec 2 décimales : <code>{taille:F2}</code>"
 ],
 solution:`using System;

class Program
{
    static void Main()
    {
        string nom = "Sharpy";
        int age = 22;
        double taille = 1.73;

        Console.WriteLine($"Je m'appelle {nom}.");
        Console.WriteLine($"J'ai {age} ans.");
        Console.WriteLine($"Je mesure {taille:F2} m.");
    }
}`},

{id:2, cat:"variables", catLabel:"Variables", difficulty:1,
 title:"Périmètre et aire d'un rectangle",
 description:"Déclare la <code>longueur</code> et la <code>largeur</code> d'un rectangle (double). Calcule et affiche le périmètre et l'aire avec 2 décimales.",
 hints:[
   "Périmètre = 2 × (longueur + largeur)",
   "Aire = longueur × largeur",
   "Affiche avec <code>:F2</code> pour 2 décimales"
 ],
 solution:`using System;

class Program
{
    static void Main()
    {
        double longueur = 12.5;
        double largeur = 7.3;

        double perimetre = 2 * (longueur + largeur);
        double aire = longueur * largeur;

        Console.WriteLine($"Longueur : {longueur} m");
        Console.WriteLine($"Largeur  : {largeur} m");
        Console.WriteLine($"Périmètre: {perimetre:F2} m");
        Console.WriteLine($"Aire     : {aire:F2} m²");
    }
}`},

{id:3, cat:"variables", catLabel:"Variables", difficulty:2,
 title:"Convertisseur de températures",
 description:"Demande à l'utilisateur une température en Celsius. Convertis-la en Fahrenheit et en Kelvin. Affiche les 3 valeurs.<br>Formules : <code>F = C × 9/5 + 32</code> — <code>K = C + 273.15</code>",
 hints:[
   "Utilise <code>Console.ReadLine()</code> puis <code>double.Parse()</code>",
   "Attention : <code>9/5</code> en int vaut 1 ! Écris <code>9.0/5.0</code>",
   "Utilise <code>:F1</code> pour 1 décimale dans le <code>$\"…\"</code>"
 ],
 solution:`using System;

class Program
{
    static void Main()
    {
        Console.Write("Température en Celsius : ");
        double celsius = double.Parse(Console.ReadLine());

        double fahrenheit = celsius * 9.0 / 5.0 + 32;
        double kelvin = celsius + 273.15;

        Console.WriteLine($"{celsius:F1} °C = {fahrenheit:F1} °F = {kelvin:F1} K");
    }
}`},

{id:4, cat:"variables", catLabel:"Variables", difficulty:2,
 title:"Swap sans variable temporaire",
 description:"Déclare deux variables <code>a</code> et <code>b</code>. Échange leurs valeurs <strong>sans utiliser de troisième variable</strong>. Affiche avant et après.",
 hints:[
   "Méthode arithmétique : a = a + b, b = a - b, a = a - b",
   "Méthode C# moderne : <code>(a, b) = (b, a);</code> (déstructuration de tuple)",
   "Vérifie avec un Console.WriteLine avant et après"
 ],
 solution:`using System;

class Program
{
    static void Main()
    {
        int a = 10, b = 25;
        Console.WriteLine($"Avant : a={a}, b={b}");

        // Méthode 1 : arithmétique
        a = a + b;  // a=35
        b = a - b;  // b=10
        a = a - b;  // a=25
        Console.WriteLine($"Après (arithmétique) : a={a}, b={b}");

        // Méthode 2 : tuple C#
        (a, b) = (b, a);
        Console.WriteLine($"Après (tuple) : a={a}, b={b}");
    }
}`},

{id:5, cat:"variables", catLabel:"Variables", difficulty:3,
 title:"Mini calculatrice interactive",
 description:"Demande 2 nombres et un opérateur (+, -, *, /). Effectue le calcul et l'affiche. Gère la division par zéro.",
 hints:[
   "Lis les 2 nombres avec <code>double.TryParse</code> pour sécuriser",
   "Lis l'opérateur comme une <code>string</code> ou un <code>char</code>",
   "Utilise un <code>switch</code> sur l'opérateur et vérifie <code>b == 0</code> pour la division"
 ],
 solution:`using System;

class Program
{
    static void Main()
    {
        Console.Write("Premier nombre : ");
        double a = double.Parse(Console.ReadLine());
        Console.Write("Opérateur (+, -, *, /) : ");
        string op = Console.ReadLine();
        Console.Write("Deuxième nombre : ");
        double b = double.Parse(Console.ReadLine());

        double resultat = 0;
        bool valide = true;

        switch (op)
        {
            case "+": resultat = a + b; break;
            case "-": resultat = a - b; break;
            case "*": resultat = a * b; break;
            case "/":
                if (b == 0) { Console.WriteLine("Erreur : division par zéro !"); valide = false; }
                else resultat = a / b;
                break;
            default:
                Console.WriteLine($"Opérateur '{op}' non reconnu.");
                valide = false;
                break;
        }

        if (valide)
            Console.WriteLine($"{a} {op} {b} = {resultat:F2}");
    }
}`},

// ╔═══════════════════════════════════════╗
// ║  CONDITIONS (6 exercices)             ║
// ╚═══════════════════════════════════════╝
{id:6, cat:"conditions", catLabel:"Conditions", difficulty:1,
 title:"Pair ou impair ?",
 description:"Demande un entier à l'utilisateur et affiche s'il est pair ou impair.",
 hints:[
   "L'opérateur modulo <code>%</code> donne le reste de la division",
   "Un nombre est pair si <code>n % 2 == 0</code>",
   "Utilise un simple <code>if/else</code>"
 ],
 solution:`using System;

class Program
{
    static void Main()
    {
        Console.Write("Entre un nombre : ");
        int n = int.Parse(Console.ReadLine());

        if (n % 2 == 0)
            Console.WriteLine($"{n} est pair.");
        else
            Console.WriteLine($"{n} est impair.");
    }
}`},

{id:7, cat:"conditions", catLabel:"Conditions", difficulty:1,
 title:"Catégories d'âge",
 description:"Demande l'âge et affiche la catégorie : bébé (0-2), enfant (3-11), adolescent (12-17), adulte (18-64), senior (65+).",
 hints:[
   "Utilise une chaîne de <code>if / else if / else</code>",
   "Commence par la tranche la plus basse ou la plus haute",
   "N'oublie pas de gérer les âges négatifs"
 ],
 solution:`using System;

class Program
{
    static void Main()
    {
        Console.Write("Âge : ");
        int age = int.Parse(Console.ReadLine());

        if (age &lt; 0)
            Console.WriteLine("Âge invalide !");
        else if (age &lt;= 2)
            Console.WriteLine("Bébé");
        else if (age &lt;= 11)
            Console.WriteLine("Enfant");
        else if (age &lt;= 17)
            Console.WriteLine("Adolescent");
        else if (age &lt;= 64)
            Console.WriteLine("Adulte");
        else
            Console.WriteLine("Senior");
    }
}`},

{id:8, cat:"conditions", catLabel:"Conditions", difficulty:2,
 title:"Année bissextile",
 description:"Demande une année et vérifie si elle est bissextile.<br>Règle : divisible par 4 <strong>ET</strong> (non divisible par 100 <strong>OU</strong> divisible par 400).",
 hints:[
   "Divisible par 4 : <code>annee % 4 == 0</code>",
   "Les siècles (1900, 2100) ne sont PAS bissextiles sauf si divisibles par 400",
   "Combine avec <code>&amp;&amp;</code> et <code>||</code> : <code>(a%4==0) &amp;&amp; (a%100!=0 || a%400==0)</code>"
 ],
 solution:`using System;

class Program
{
    static void Main()
    {
        Console.Write("Année : ");
        int a = int.Parse(Console.ReadLine());

        bool bissextile = (a % 4 == 0) &amp;&amp; (a % 100 != 0 || a % 400 == 0);

        Console.WriteLine(bissextile
            ? $"{a} est bissextile."
            : $"{a} n'est pas bissextile.");
    }
}`},

{id:9, cat:"conditions", catLabel:"Conditions", difficulty:2,
 title:"Maximum de 3 nombres",
 description:"Demande 3 nombres à l'utilisateur et affiche le plus grand. Propose 2 approches : conditions imbriquées et <code>Math.Max</code>.",
 hints:[
   "Approche 1 : <code>if (a &gt;= b &amp;&amp; a &gt;= c)</code> → a est le max",
   "Approche 2 : <code>Math.Max(a, Math.Max(b, c))</code>",
   "N'oublie pas les cas d'égalité"
 ],
 solution:`using System;

class Program
{
    static void Main()
    {
        Console.Write("Nombre 1 : "); double a = double.Parse(Console.ReadLine());
        Console.Write("Nombre 2 : "); double b = double.Parse(Console.ReadLine());
        Console.Write("Nombre 3 : "); double c = double.Parse(Console.ReadLine());

        // Approche 1 : conditions
        double max;
        if (a &gt;= b &amp;&amp; a &gt;= c) max = a;
        else if (b &gt;= c) max = b;
        else max = c;
        Console.WriteLine($"Max (if/else) : {max}");

        // Approche 2 : Math.Max
        double max2 = Math.Max(a, Math.Max(b, c));
        Console.WriteLine($"Max (Math.Max) : {max2}");
    }
}`},

{id:10, cat:"conditions", catLabel:"Conditions", difficulty:2,
 title:"Prix TTC avec remise progressive",
 description:"Demande un prix HT. Applique la TVA (20%) puis une remise : 5% si &gt; 100€, 10% si &gt; 500€, 15% si &gt; 1000€. Affiche le détail.",
 hints:[
   "Calcule d'abord le TTC : <code>prixHT * 1.20</code>",
   "Utilise des <code>if/else if</code> du plus grand au plus petit seuil",
   "Affiche avec le format monétaire <code>:C2</code>"
 ],
 solution:`using System;

class Program
{
    static void Main()
    {
        Console.Write("Prix HT (€) : ");
        double ht = double.Parse(Console.ReadLine());
        double ttc = ht * 1.20;
        double remise = 0;

        if (ttc &gt; 1000) remise = 0.15;
        else if (ttc &gt; 500) remise = 0.10;
        else if (ttc &gt; 100) remise = 0.05;

        double montantRemise = ttc * remise;
        double prixFinal = ttc - montantRemise;

        Console.WriteLine($"Prix HT     : {ht:C2}");
        Console.WriteLine($"TVA (20%)   : {ht * 0.20:C2}");
        Console.WriteLine($"Prix TTC    : {ttc:C2}");
        Console.WriteLine($"Remise ({remise:P0}) : -{montantRemise:C2}");
        Console.WriteLine($"Prix final  : {prixFinal:C2}");
    }
}`},

{id:11, cat:"conditions", catLabel:"Conditions", difficulty:3,
 title:"Équation du 2nd degré",
 description:"Résous <code>ax² + bx + c = 0</code>. Demande a, b, c. Calcule le discriminant et affiche 0, 1 ou 2 solutions réelles.",
 hints:[
   "Discriminant Δ = b² − 4ac → <code>b*b - 4*a*c</code>",
   "Si Δ &gt; 0 : deux solutions <code>(-b ± √Δ) / (2a)</code>. Si Δ = 0 : une solution double. Si Δ &lt; 0 : pas de solution réelle.",
   "Utilise <code>Math.Sqrt(delta)</code> et gère le cas <code>a == 0</code> (équation du 1er degré)"
 ],
 solution:`using System;

class Program
{
    static void Main()
    {
        Console.Write("a = "); double a = double.Parse(Console.ReadLine());
        Console.Write("b = "); double b = double.Parse(Console.ReadLine());
        Console.Write("c = "); double c = double.Parse(Console.ReadLine());

        if (a == 0)
        {
            if (b == 0)
                Console.WriteLine(c == 0 ? "Tous les réels sont solutions." : "Pas de solution.");
            else
                Console.WriteLine($"Équation du 1er degré : x = {-c / b:F4}");
            return;
        }

        double delta = b * b - 4 * a * c;
        Console.WriteLine($"Discriminant Δ = {delta:F4}");

        if (delta &gt; 0)
        {
            double x1 = (-b - Math.Sqrt(delta)) / (2 * a);
            double x2 = (-b + Math.Sqrt(delta)) / (2 * a);
            Console.WriteLine($"Deux solutions : x1 = {x1:F4}, x2 = {x2:F4}");
        }
        else if (delta == 0)
        {
            double x = -b / (2 * a);
            Console.WriteLine($"Solution double : x = {x:F4}");
        }
        else
        {
            Console.WriteLine("Pas de solution réelle (Δ &lt; 0).");
        }
    }
}`},

// ╔═══════════════════════════════════════╗
// ║  BOUCLES (7 exercices)                ║
// ╚═══════════════════════════════════════╝
{id:12, cat:"boucles", catLabel:"Boucles", difficulty:1,
 title:"Nombres de 1 à 20",
 description:"Affiche les nombres de 1 à 20, un par ligne, avec indication pair/impair.",
 hints:[
   "Utilise une boucle <code>for (int i = 1; i &lt;= 20; i++)</code>",
   "Teste <code>i % 2 == 0</code> pour pair/impair",
   "Formate joliment : <code>$\"{i,2} → {label}\"</code>"
 ],
 solution:`using System;

class Program
{
    static void Main()
    {
        for (int i = 1; i &lt;= 20; i++)
        {
            string label = (i % 2 == 0) ? "pair" : "impair";
            Console.WriteLine($"{i,2} → {label}");
        }
    }
}`},

{id:13, cat:"boucles", catLabel:"Boucles", difficulty:1,
 title:"Table de multiplication",
 description:"Demande un nombre N et affiche sa table de multiplication de 1 à 10.",
 hints:[
   "Lis N avec <code>int.Parse(Console.ReadLine())</code>",
   "Boucle <code>for (int i = 1; i &lt;= 10; i++)</code>",
   "Affiche <code>$\"{n} × {i} = {n * i}\"</code>"
 ],
 solution:`using System;

class Program
{
    static void Main()
    {
        Console.Write("Nombre : ");
        int n = int.Parse(Console.ReadLine());

        Console.WriteLine($"--- Table de {n} ---");
        for (int i = 1; i &lt;= 10; i++)
        {
            Console.WriteLine($"{n} × {i,2} = {n * i,4}");
        }
    }
}`},

{id:14, cat:"boucles", catLabel:"Boucles", difficulty:2,
 title:"Factorielle",
 description:"Demande un entier N et calcule N! (factorielle). Utilise un <code>long</code> pour les grands nombres.",
 hints:[
   "Factorielle : n! = n × (n-1) × (n-2) × … × 1, et 0! = 1",
   "Utilise <code>long resultat = 1;</code> et une boucle descendante",
   "Attention : au-delà de 20!, même un long déborde"
 ],
 solution:`using System;

class Program
{
    static void Main()
    {
        Console.Write("N = ");
        int n = int.Parse(Console.ReadLine());

        if (n &lt; 0)
        {
            Console.WriteLine("Pas de factorielle pour un nombre négatif !");
            return;
        }

        long factorielle = 1;
        for (int i = 2; i &lt;= n; i++)
        {
            factorielle *= i;
        }

        Console.WriteLine($"{n}! = {factorielle}");
    }
}`},

{id:15, cat:"boucles", catLabel:"Boucles", difficulty:2,
 title:"Suite de Fibonacci",
 description:"Affiche les N premiers termes de la suite de Fibonacci : 0, 1, 1, 2, 3, 5, 8, 13…",
 hints:[
   "F(0)=0, F(1)=1, F(n)=F(n-1)+F(n-2)",
   "Utilise deux variables <code>a = 0</code> et <code>b = 1</code>, et fais-les glisser",
   "À chaque itération : <code>int temp = b; b = a + b; a = temp;</code>"
 ],
 solution:`using System;

class Program
{
    static void Main()
    {
        Console.Write("Combien de termes ? ");
        int n = int.Parse(Console.ReadLine());

        long a = 0, b = 1;
        for (int i = 0; i &lt; n; i++)
        {
            Console.Write($"{a} ");
            long temp = b;
            b = a + b;
            a = temp;
        }
        Console.WriteLine();
    }
}`},

{id:16, cat:"boucles", catLabel:"Boucles", difficulty:2,
 title:"Jeu du nombre mystère",
 description:"Le programme tire un nombre aléatoire entre 1 et 100. L'utilisateur devine avec des indices « plus grand » ou « plus petit ». Compte les tentatives.",
 hints:[
   "Utilise <code>new Random().Next(1, 101)</code> pour un nombre entre 1 et 100",
   "Boucle <code>while (true)</code> avec <code>break</code> quand trouvé",
   "Compare avec <code>&gt;</code> et <code>&lt;</code>, et incrémente un compteur"
 ],
 solution:`using System;

class Program
{
    static void Main()
    {
        int secret = new Random().Next(1, 101);
        int tentatives = 0;

        Console.WriteLine("Je pense à un nombre entre 1 et 100...");

        while (true)
        {
            Console.Write("Ta proposition : ");
            int guess = int.Parse(Console.ReadLine());
            tentatives++;

            if (guess &lt; secret)
                Console.WriteLine("C'est plus grand !");
            else if (guess &gt; secret)
                Console.WriteLine("C'est plus petit !");
            else
            {
                Console.WriteLine($"Bravo ! Trouvé en {tentatives} tentatives !");
                break;
            }
        }
    }
}`},

{id:17, cat:"boucles", catLabel:"Boucles", difficulty:3,
 title:"Nombres premiers jusqu'à N",
 description:"Affiche tous les nombres premiers de 2 à N. Optimise en testant les diviseurs seulement jusqu'à √N.",
 hints:[
   "Un nombre est premier s'il n'a aucun diviseur entre 2 et √n",
   "Utilise <code>Math.Sqrt(n)</code> comme limite de la boucle interne",
   "Crée une méthode <code>bool EstPremier(int n)</code> pour séparer la logique"
 ],
 solution:`using System;

class Program
{
    static bool EstPremier(int n)
    {
        if (n &lt; 2) return false;
        if (n == 2) return true;
        if (n % 2 == 0) return false;
        for (int i = 3; i &lt;= Math.Sqrt(n); i += 2)
        {
            if (n % i == 0) return false;
        }
        return true;
    }

    static void Main()
    {
        Console.Write("N = ");
        int n = int.Parse(Console.ReadLine());
        int count = 0;

        for (int i = 2; i &lt;= n; i++)
        {
            if (EstPremier(i))
            {
                Console.Write($"{i} ");
                count++;
            }
        }
        Console.WriteLine($"\\n→ {count} nombres premiers trouvés.");
    }
}`},

{id:18, cat:"boucles", catLabel:"Boucles", difficulty:3,
 title:"Triangle d'étoiles",
 description:"Demande une hauteur H et dessine un triangle d'étoiles centré :<pre>    *\\n   ***\\n  *****\\n *******\\n*********</pre>",
 hints:[
   "Chaque ligne i a <code>2*i - 1</code> étoiles et <code>H - i</code> espaces avant",
   "Utilise <code>new string(' ', H-i)</code> et <code>new string('*', 2*i-1)</code>",
   "La boucle va de <code>i = 1</code> à <code>i = H</code>"
 ],
 solution:`using System;

class Program
{
    static void Main()
    {
        Console.Write("Hauteur : ");
        int h = int.Parse(Console.ReadLine());

        for (int i = 1; i &lt;= h; i++)
        {
            string espaces = new string(' ', h - i);
            string etoiles = new string('*', 2 * i - 1);
            Console.WriteLine(espaces + etoiles);
        }
    }
}`},

// ╔═══════════════════════════════════════╗
// ║  TABLEAUX & LISTES (6 exercices)      ║
// ╚═══════════════════════════════════════╝
{id:19, cat:"tableaux", catLabel:"Tableaux", difficulty:1,
 title:"Moyenne de 5 notes",
 description:"Crée un tableau de 5 notes (double), calcule et affiche la moyenne.",
 hints:[
   "Déclare : <code>double[] notes = { 14, 12, 16.5, 9, 18 };</code>",
   "Parcours avec <code>foreach</code> et accumule dans une somme",
   "Moyenne = somme / notes.Length"
 ],
 solution:`using System;

class Program
{
    static void Main()
    {
        double[] notes = { 14, 12, 16.5, 9, 18 };
        double somme = 0;

        foreach (double note in notes)
            somme += note;

        double moyenne = somme / notes.Length;
        Console.WriteLine($"Notes : {string.Join(", ", notes)}");
        Console.WriteLine($"Moyenne : {moyenne:F2}/20");
    }
}`},

{id:20, cat:"tableaux", catLabel:"Tableaux", difficulty:2,
 title:"Min et Max manuels",
 description:"Trouve le minimum et le maximum d'un tableau <strong>sans</strong> utiliser <code>Math.Min</code>/<code>Math.Max</code> ni LINQ.",
 hints:[
   "Initialise min et max avec le premier élément du tableau",
   "Parcours à partir de l'index 1 et compare",
   "Si <code>tab[i] &lt; min</code> → nouveau min, Si <code>tab[i] &gt; max</code> → nouveau max"
 ],
 solution:`using System;

class Program
{
    static void Main()
    {
        int[] tab = { 45, 12, 78, 3, 56, 91, 23 };

        int min = tab[0], max = tab[0];
        for (int i = 1; i &lt; tab.Length; i++)
        {
            if (tab[i] &lt; min) min = tab[i];
            if (tab[i] &gt; max) max = tab[i];
        }

        Console.WriteLine($"Tableau : {string.Join(", ", tab)}");
        Console.WriteLine($"Min : {min}");
        Console.WriteLine($"Max : {max}");
    }
}`},

{id:21, cat:"tableaux", catLabel:"Tableaux", difficulty:2,
 title:"Inverser un tableau",
 description:"Inverse un tableau manuellement (sans <code>Array.Reverse</code>). Échange les éléments symétriques.",
 hints:[
   "Utilise deux index : <code>i</code> en début et <code>j</code> en fin",
   "Échange <code>tab[i]</code> et <code>tab[j]</code> puis avance <code>i++</code>, <code>j--</code>",
   "Continue tant que <code>i &lt; j</code>"
 ],
 solution:`using System;

class Program
{
    static void Main()
    {
        int[] tab = { 1, 2, 3, 4, 5, 6, 7 };
        Console.WriteLine($"Avant : {string.Join(", ", tab)}");

        int i = 0, j = tab.Length - 1;
        while (i &lt; j)
        {
            int temp = tab[i];
            tab[i] = tab[j];
            tab[j] = temp;
            i++;
            j--;
        }

        Console.WriteLine($"Après : {string.Join(", ", tab)}");
    }
}`},

{id:22, cat:"tableaux", catLabel:"Tableaux", difficulty:2,
 title:"Tri à bulles",
 description:"Trie une List d'entiers avec l'algorithme du tri à bulles (sans <code>Sort()</code>). Puis compare avec <code>Sort()</code>.",
 hints:[
   "Tri à bulles : compare chaque paire adjacente et échange si mal ordonnée",
   "Répète jusqu'à ce qu'aucun échange ne soit fait (tableau trié)",
   "Double boucle : externe = passes, interne = comparaisons"
 ],
 solution:`using System;
using System.Collections.Generic;

class Program
{
    static void Main()
    {
        List&lt;int&gt; list = new List&lt;int&gt; { 64, 25, 12, 22, 11 };
        Console.WriteLine($"Avant : {string.Join(", ", list)}");

        // Tri à bulles
        bool echange;
        do
        {
            echange = false;
            for (int i = 0; i &lt; list.Count - 1; i++)
            {
                if (list[i] &gt; list[i + 1])
                {
                    int temp = list[i];
                    list[i] = list[i + 1];
                    list[i + 1] = temp;
                    echange = true;
                }
            }
        } while (echange);

        Console.WriteLine($"Après (bulles) : {string.Join(", ", list)}");
    }
}`},

{id:23, cat:"tableaux", catLabel:"Tableaux", difficulty:3,
 title:"Supprimer les doublons",
 description:"Supprime les doublons d'une List d'entiers. Propose 2 approches : manuelle et avec <code>HashSet</code>.",
 hints:[
   "Approche 1 : nouvelle liste + <code>Contains()</code> avant d'ajouter",
   "Approche 2 : <code>new HashSet&lt;int&gt;(list).ToList()</code>",
   "Le HashSet ne conserve que des éléments uniques par nature"
 ],
 solution:`using System;
using System.Collections.Generic;
using System.Linq;

class Program
{
    static void Main()
    {
        List&lt;int&gt; list = new List&lt;int&gt; { 3, 1, 4, 1, 5, 9, 2, 6, 5, 3, 5 };
        Console.WriteLine($"Avec doublons : {string.Join(", ", list)}");

        // Approche 1 : manuelle
        List&lt;int&gt; unique = new List&lt;int&gt;();
        foreach (int n in list)
        {
            if (!unique.Contains(n))
                unique.Add(n);
        }
        Console.WriteLine($"Sans doublons (manuel) : {string.Join(", ", unique)}");

        // Approche 2 : HashSet
        List&lt;int&gt; unique2 = new HashSet&lt;int&gt;(list).ToList();
        Console.WriteLine($"Sans doublons (HashSet) : {string.Join(", ", unique2)}");
    }
}`},

{id:24, cat:"tableaux", catLabel:"Tableaux", difficulty:3,
 title:"Fusionner 2 listes triées",
 description:"Fusionne deux listes déjà triées en une seule liste triée, <strong>sans</strong> retrier. Utilise la technique des deux pointeurs.",
 hints:[
   "Deux index i et j, un pour chaque liste",
   "Compare <code>a[i]</code> et <code>b[j]</code> : ajoute le plus petit et avance son index",
   "Quand une liste est épuisée, ajoute tout le reste de l'autre"
 ],
 solution:`using System;
using System.Collections.Generic;

class Program
{
    static List&lt;int&gt; Fusionner(List&lt;int&gt; a, List&lt;int&gt; b)
    {
        List&lt;int&gt; result = new List&lt;int&gt;();
        int i = 0, j = 0;

        while (i &lt; a.Count &amp;&amp; j &lt; b.Count)
        {
            if (a[i] &lt;= b[j])
                result.Add(a[i++]);
            else
                result.Add(b[j++]);
        }

        while (i &lt; a.Count) result.Add(a[i++]);
        while (j &lt; b.Count) result.Add(b[j++]);

        return result;
    }

    static void Main()
    {
        var a = new List&lt;int&gt; { 1, 3, 5, 7, 9 };
        var b = new List&lt;int&gt; { 2, 4, 6, 8, 10, 12 };

        var merged = Fusionner(a, b);
        Console.WriteLine(string.Join(", ", merged));
        // 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 12
    }
}`},

// ╔═══════════════════════════════════════╗
// ║  STRINGS (5 exercices)                ║
// ╚═══════════════════════════════════════╝
{id:25, cat:"strings", catLabel:"Strings", difficulty:1,
 title:"Compter les voyelles",
 description:"Demande une phrase et compte le nombre de voyelles (a, e, i, o, u, y).",
 hints:[
   "Convertis en minuscules avec <code>.ToLower()</code>",
   "Parcours chaque char avec <code>foreach</code>",
   "Teste avec <code>\"aeiouy\".Contains(c)</code>"
 ],
 solution:`using System;

class Program
{
    static void Main()
    {
        Console.Write("Phrase : ");
        string phrase = Console.ReadLine().ToLower();
        int count = 0;

        foreach (char c in phrase)
        {
            if ("aeiouy".Contains(c))
                count++;
        }

        Console.WriteLine($"Nombre de voyelles : {count}");
    }
}`},

{id:26, cat:"strings", catLabel:"Strings", difficulty:2,
 title:"Palindrome",
 description:"Vérifie si un mot est un palindrome (se lit identiquement à l'endroit et à l'envers). Ignore la casse.",
 hints:[
   "Convertis en minuscules : <code>.ToLower()</code>",
   "Approche 1 : compare avec <code>new string(mot.Reverse().ToArray())</code>",
   "Approche 2 : compare les chars symétriques avec deux index"
 ],
 solution:`using System;
using System.Linq;

class Program
{
    static void Main()
    {
        Console.Write("Mot : ");
        string mot = Console.ReadLine().ToLower().Trim();

        // Approche 1 : Reverse
        string inverse = new string(mot.Reverse().ToArray());
        Console.WriteLine(mot == inverse
            ? $"\"{mot}\" est un palindrome !"
            : $"\"{mot}\" n'est pas un palindrome.");

        // Approche 2 : deux index
        bool estPalindrome = true;
        for (int i = 0; i &lt; mot.Length / 2; i++)
        {
            if (mot[i] != mot[mot.Length - 1 - i])
            {
                estPalindrome = false;
                break;
            }
        }
        Console.WriteLine($"Vérification manuelle : {estPalindrome}");
    }
}`},

{id:27, cat:"strings", catLabel:"Strings", difficulty:2,
 title:"Fréquence des mots",
 description:"Compte le nombre d'occurrences de chaque mot dans une phrase. Affiche le résultat trié.",
 hints:[
   "Utilise <code>.Split(' ')</code> pour découper en mots",
   "Utilise un <code>Dictionary&lt;string, int&gt;</code> pour compter",
   "N'oublie pas <code>.ToLower()</code> pour ignorer la casse"
 ],
 solution:`using System;
using System.Collections.Generic;

class Program
{
    static void Main()
    {
        Console.Write("Phrase : ");
        string phrase = Console.ReadLine().ToLower();
        string[] mots = phrase.Split(new[] { ' ', ',', '.', '!', '?' },
            StringSplitOptions.RemoveEmptyEntries);

        var freq = new Dictionary&lt;string, int&gt;();
        foreach (string mot in mots)
        {
            if (freq.ContainsKey(mot))
                freq[mot]++;
            else
                freq[mot] = 1;
        }

        Console.WriteLine("--- Fréquences ---");
        foreach (var kvp in freq)
            Console.WriteLine($"  {kvp.Key} : {kvp.Value}");
    }
}`},

{id:28, cat:"strings", catLabel:"Strings", difficulty:3,
 title:"Chiffrement de César",
 description:"Implémente le chiffrement de César : décale chaque lettre de N positions dans l'alphabet. Gère majuscules et minuscules.",
 hints:[
   "Un char est un nombre : <code>'A' + décalage</code>",
   "Utilise le modulo 26 pour boucler : <code>(c - 'a' + shift) % 26 + 'a'</code>",
   "Les caractères non-alphabétiques restent inchangés"
 ],
 solution:`using System;
using System.Text;

class Program
{
    static string Cesar(string texte, int shift)
    {
        var sb = new StringBuilder();
        foreach (char c in texte)
        {
            if (char.IsLetter(c))
            {
                char baseChar = char.IsUpper(c) ? 'A' : 'a';
                char chiffre = (char)((c - baseChar + shift) % 26 + baseChar);
                sb.Append(chiffre);
            }
            else
                sb.Append(c);
        }
        return sb.ToString();
    }

    static void Main()
    {
        Console.Write("Texte : ");
        string texte = Console.ReadLine();
        Console.Write("Décalage : ");
        int shift = int.Parse(Console.ReadLine());

        string chiffre = Cesar(texte, shift);
        string dechiffre = Cesar(chiffre, 26 - shift);

        Console.WriteLine($"Chiffré   : {chiffre}");
        Console.WriteLine($"Déchiffré : {dechiffre}");
    }
}`},

{id:29, cat:"strings", catLabel:"Strings", difficulty:3,
 title:"Validation d'email basique",
 description:"Vérifie si une adresse email est valide (sans regex) : contient un @, un domaine avec un point, pas d'espaces, longueur minimale.",
 hints:[
   "Vérifie : un seul <code>@</code>, pas d'espaces, longueur &gt; 5",
   "Après le <code>@</code>, il doit y avoir un <code>.</code> avec au moins 2 chars après",
   "Avant le <code>@</code>, il doit y avoir au moins 1 caractère"
 ],
 solution:`using System;

class Program
{
    static bool ValiderEmail(string email)
    {
        if (string.IsNullOrWhiteSpace(email)) return false;
        if (email.Contains(" ")) return false;
        if (email.Length &lt; 6) return false;

        int atIndex = email.IndexOf('@');
        if (atIndex &lt; 1) return false;                      // rien avant @
        if (email.LastIndexOf('@') != atIndex) return false; // plusieurs @

        string domaine = email.Substring(atIndex + 1);
        int dotIndex = domaine.LastIndexOf('.');
        if (dotIndex &lt; 1) return false;                      // pas de point
        if (domaine.Length - dotIndex - 1 &lt; 2) return false; // extension trop courte

        return true;
    }

    static void Main()
    {
        string[] tests = { "user@example.com", "invalide", "@no.com",
                           "a@b.c", "test@domain.fr", "bad @email.com" };

        foreach (string email in tests)
        {
            bool valide = ValiderEmail(email);
            Console.WriteLine($"{email,-25} → {(valide ? "✓ Valide" : "✗ Invalide")}");
        }
    }
}`},

// ╔═══════════════════════════════════════╗
// ║  MÉTHODES (5 exercices)               ║
// ╚═══════════════════════════════════════╝
{id:30, cat:"methodes", catLabel:"Méthodes", difficulty:1,
 title:"Méthode EstPair",
 description:"Écris une méthode <code>bool EstPair(int n)</code> qui retourne true si n est pair. Teste-la avec plusieurs valeurs.",
 hints:[
   "Le type de retour est <code>bool</code>",
   "Retourne directement <code>return n % 2 == 0;</code>",
   "Teste avec une boucle for de 1 à 10"
 ],
 solution:`using System;

class Program
{
    static bool EstPair(int n)
    {
        return n % 2 == 0;
    }

    static void Main()
    {
        for (int i = 1; i &lt;= 10; i++)
        {
            Console.WriteLine($"{i} est {(EstPair(i) ? "pair" : "impair")}");
        }
    }
}`},

{id:31, cat:"methodes", catLabel:"Méthodes", difficulty:2,
 title:"Puissance récursive",
 description:"Écris une méthode récursive <code>double Puissance(double x, int n)</code> pour calculer x^n.",
 hints:[
   "Cas de base : si n == 0, retourne 1",
   "Cas récursif : <code>x * Puissance(x, n - 1)</code>",
   "Bonus : gère les exposants négatifs avec <code>1.0 / Puissance(x, -n)</code>"
 ],
 solution:`using System;

class Program
{
    static double Puissance(double x, int n)
    {
        if (n == 0) return 1;
        if (n &lt; 0) return 1.0 / Puissance(x, -n);
        return x * Puissance(x, n - 1);
    }

    static void Main()
    {
        Console.WriteLine($"2^10 = {Puissance(2, 10)}");   // 1024
        Console.WriteLine($"3^4  = {Puissance(3, 4)}");    // 81
        Console.WriteLine($"5^-2 = {Puissance(5, -2)}");   // 0.04
        Console.WriteLine($"7^0  = {Puissance(7, 0)}");    // 1
    }
}`},

{id:32, cat:"methodes", catLabel:"Méthodes", difficulty:2,
 title:"Moyenne avec params",
 description:"Écris une méthode qui accepte un nombre variable d'arguments (params) et retourne leur moyenne.",
 hints:[
   "Utilise <code>params double[] nombres</code> en paramètre",
   "Parcours le tableau et additionne",
   "Gère le cas où le tableau est vide (retourne 0)"
 ],
 solution:`using System;

class Program
{
    static double Moyenne(params double[] nombres)
    {
        if (nombres.Length == 0) return 0;

        double somme = 0;
        foreach (double n in nombres)
            somme += n;

        return somme / nombres.Length;
    }

    static void Main()
    {
        Console.WriteLine($"Moyenne(10, 20) = {Moyenne(10, 20)}");
        Console.WriteLine($"Moyenne(5, 10, 15, 20) = {Moyenne(5, 10, 15, 20)}");
        Console.WriteLine($"Moyenne(100) = {Moyenne(100)}");
        Console.WriteLine($"Moyenne() = {Moyenne()}");
    }
}`},

{id:33, cat:"methodes", catLabel:"Méthodes", difficulty:3,
 title:"Swap générique avec ref",
 description:"Écris une méthode générique <code>Swap&lt;T&gt;(ref T a, ref T b)</code> qui échange deux valeurs de n'importe quel type.",
 hints:[
   "Utilise <code>ref</code> pour modifier les variables de l'appelant",
   "Le <code>&lt;T&gt;</code> rend la méthode générique (fonctionne pour tout type)",
   "Classique : variable temporaire <code>T temp = a; a = b; b = temp;</code>"
 ],
 solution:`using System;

class Program
{
    static void Swap&lt;T&gt;(ref T a, ref T b)
    {
        T temp = a;
        a = b;
        b = temp;
    }

    static void Main()
    {
        int x = 10, y = 20;
        Console.WriteLine($"Avant : x={x}, y={y}");
        Swap(ref x, ref y);
        Console.WriteLine($"Après : x={x}, y={y}");

        string s1 = "Hello", s2 = "World";
        Console.WriteLine($"Avant : s1={s1}, s2={s2}");
        Swap(ref s1, ref s2);
        Console.WriteLine($"Après : s1={s1}, s2={s2}");
    }
}`},

{id:34, cat:"methodes", catLabel:"Méthodes", difficulty:3,
 title:"Tuple retour : Min, Max, Moyenne",
 description:"Écris une méthode qui retourne un tuple <code>(int min, int max, double moyenne)</code> d'un tableau d'entiers en un seul passage.",
 hints:[
   "Le type de retour est <code>(int, int, double)</code>",
   "Parcours le tableau une seule fois en mettant à jour min, max et somme",
   "Déstructure le résultat : <code>var (min, max, moy) = Analyser(tab);</code>"
 ],
 solution:`using System;

class Program
{
    static (int min, int max, double moyenne) Analyser(int[] tab)
    {
        int min = tab[0], max = tab[0];
        double somme = 0;

        foreach (int n in tab)
        {
            if (n &lt; min) min = n;
            if (n &gt; max) max = n;
            somme += n;
        }

        return (min, max, somme / tab.Length);
    }

    static void Main()
    {
        int[] tab = { 45, 12, 78, 3, 56, 91, 23, 67 };
        var (min, max, moy) = Analyser(tab);

        Console.WriteLine($"Tableau : {string.Join(", ", tab)}");
        Console.WriteLine($"Min = {min}, Max = {max}, Moyenne = {moy:F2}");
    }
}`},

// ╔═══════════════════════════════════════╗
// ║  DICTIONNAIRES (4 exercices)          ║
// ╚═══════════════════════════════════════╝
{id:35, cat:"dicts", catLabel:"Dicts", difficulty:1,
 title:"Annuaire téléphonique",
 description:"Crée un annuaire (Dictionary nom→numéro). Menu : ajouter, rechercher, lister, quitter.",
 hints:[
   "Utilise <code>Dictionary&lt;string, string&gt;</code>",
   "Menu dans une boucle <code>while (true)</code> avec switch",
   "Recherche avec <code>TryGetValue</code> pour éviter les exceptions"
 ],
 solution:`using System;
using System.Collections.Generic;

class Program
{
    static void Main()
    {
        var annuaire = new Dictionary&lt;string, string&gt;();

        while (true)
        {
            Console.WriteLine("\\n1. Ajouter  2. Rechercher  3. Lister  4. Quitter");
            Console.Write("Choix : ");
            string choix = Console.ReadLine();

            switch (choix)
            {
                case "1":
                    Console.Write("Nom : "); string nom = Console.ReadLine();
                    Console.Write("Tél : "); string tel = Console.ReadLine();
                    annuaire[nom] = tel;
                    Console.WriteLine("Contact ajouté !");
                    break;
                case "2":
                    Console.Write("Nom à chercher : "); string rech = Console.ReadLine();
                    if (annuaire.TryGetValue(rech, out string numero))
                        Console.WriteLine($"{rech} → {numero}");
                    else
                        Console.WriteLine("Contact non trouvé.");
                    break;
                case "3":
                    foreach (var kvp in annuaire)
                        Console.WriteLine($"  {kvp.Key} → {kvp.Value}");
                    break;
                case "4": return;
            }
        }
    }
}`},

{id:36, cat:"dicts", catLabel:"Dicts", difficulty:2,
 title:"Fréquence des caractères",
 description:"Compte la fréquence de chaque caractère dans un texte saisi. Affiche triée par fréquence décroissante.",
 hints:[
   "Parcours chaque <code>char</code> avec <code>foreach</code>",
   "Utilise <code>Dictionary&lt;char, int&gt;</code> et <code>ContainsKey</code>",
   "Trie avec LINQ : <code>.OrderByDescending(x =&gt; x.Value)</code>"
 ],
 solution:`using System;
using System.Collections.Generic;
using System.Linq;

class Program
{
    static void Main()
    {
        Console.Write("Texte : ");
        string texte = Console.ReadLine().ToLower();

        var freq = new Dictionary&lt;char, int&gt;();
        foreach (char c in texte)
        {
            if (char.IsLetterOrDigit(c))
            {
                if (freq.ContainsKey(c))
                    freq[c]++;
                else
                    freq[c] = 1;
            }
        }

        Console.WriteLine("--- Fréquences ---");
        foreach (var kvp in freq.OrderByDescending(x =&gt; x.Value))
            Console.WriteLine($"  '{kvp.Key}' : {kvp.Value}");
    }
}`},

{id:37, cat:"dicts", catLabel:"Dicts", difficulty:2,
 title:"Grouper par première lettre",
 description:"Regroupe une liste de mots par leur première lettre dans un <code>Dictionary&lt;char, List&lt;string&gt;&gt;</code>.",
 hints:[
   "La clé est <code>mot[0]</code> (premier caractère)",
   "Si la clé n'existe pas, crée une nouvelle <code>List&lt;string&gt;</code>",
   "Utilise <code>ContainsKey</code> ou <code>TryGetValue</code>"
 ],
 solution:`using System;
using System.Collections.Generic;

class Program
{
    static void Main()
    {
        string[] mots = { "chat", "chien", "arbre", "avion", "bateau",
                          "cerise", "code", "algo", "boucle", "classe" };

        var groupes = new Dictionary&lt;char, List&lt;string&gt;&gt;();

        foreach (string mot in mots)
        {
            char cle = char.ToUpper(mot[0]);
            if (!groupes.ContainsKey(cle))
                groupes[cle] = new List&lt;string&gt;();
            groupes[cle].Add(mot);
        }

        foreach (var kvp in groupes)
        {
            Console.WriteLine($"{kvp.Key} : {string.Join(", ", kvp.Value)}");
        }
    }
}`},

{id:38, cat:"dicts", catLabel:"Dicts", difficulty:3,
 title:"Cache LRU simplifié",
 description:"Implémente un cache de capacité limitée. Quand le cache est plein, supprime l'élément le moins récemment utilisé (LRU).",
 hints:[
   "Utilise un <code>Dictionary</code> pour les données et un compteur d'accès",
   "À chaque accès (get/put), mets à jour le timestamp de l'élément",
   "Quand le cache déborde, cherche l'élément avec le plus petit timestamp"
 ],
 solution:`using System;
using System.Collections.Generic;
using System.Linq;

class LRUCache
{
    private Dictionary&lt;string, string&gt; data = new();
    private Dictionary&lt;string, int&gt; timestamps = new();
    private int capacity;
    private int tick = 0;

    public LRUCache(int capacity) { this.capacity = capacity; }

    public string Get(string key)
    {
        if (!data.ContainsKey(key)) return null;
        timestamps[key] = ++tick;
        return data[key];
    }

    public void Put(string key, string value)
    {
        if (data.Count &gt;= capacity &amp;&amp; !data.ContainsKey(key))
        {
            var lru = timestamps.OrderBy(x =&gt; x.Value).First().Key;
            data.Remove(lru);
            timestamps.Remove(lru);
            Console.WriteLine($"  [Éviction : {lru}]");
        }
        data[key] = value;
        timestamps[key] = ++tick;
    }

    public void Afficher()
    {
        foreach (var kvp in data)
            Console.WriteLine($"  {kvp.Key} = {kvp.Value}");
    }
}

class Program
{
    static void Main()
    {
        var cache = new LRUCache(3);
        cache.Put("a", "Alpha");
        cache.Put("b", "Bravo");
        cache.Put("c", "Charlie");
        cache.Afficher();

        Console.WriteLine($"Get(a) = {cache.Get("a")}");
        cache.Put("d", "Delta"); // éviction de 'b' (LRU)
        cache.Afficher();
    }
}`},

// ╔═══════════════════════════════════════╗
// ║  SWITCH & ENUMS (4 exercices)         ║
// ╚═══════════════════════════════════════╝
{id:39, cat:"switch", catLabel:"Switch", difficulty:1,
 title:"Jour de la semaine (enum)",
 description:"Crée un <code>enum Jour</code> et utilise un switch expression pour afficher le nom français du jour.",
 hints:[
   "Déclare <code>enum Jour { Lundi, Mardi, ... }</code>",
   "Switch expression : <code>jour switch { Jour.Lundi =&gt; \"Lundi\", ... }</code>",
   "Le <code>_</code> est le cas par défaut (discard)"
 ],
 solution:`using System;

enum Jour { Lundi, Mardi, Mercredi, Jeudi, Vendredi, Samedi, Dimanche }

class Program
{
    static string TypeDeJour(Jour j) =&gt; j switch
    {
        Jour.Samedi or Jour.Dimanche =&gt; "Week-end 🎉",
        _ =&gt; "Jour ouvré 💼"
    };

    static void Main()
    {
        foreach (Jour j in Enum.GetValues(typeof(Jour)))
        {
            Console.WriteLine($"{j,-10} → {TypeDeJour(j)}");
        }
    }
}`},

{id:40, cat:"switch", catLabel:"Switch", difficulty:2,
 title:"Calculatrice switch expression",
 description:"Réécris la calculatrice de l'exercice 5 avec un switch expression C# 8+. Plus élégant et compact.",
 hints:[
   "Le switch expression retourne directement une valeur",
   "Syntaxe : <code>op switch { \"+\" =&gt; a + b, ... }</code>",
   "Utilise <code>_ =&gt; throw new ArgumentException()</code> pour le default"
 ],
 solution:`using System;

class Program
{
    static void Main()
    {
        Console.Write("a = "); double a = double.Parse(Console.ReadLine());
        Console.Write("op = "); string op = Console.ReadLine();
        Console.Write("b = "); double b = double.Parse(Console.ReadLine());

        double result = op switch
        {
            "+" =&gt; a + b,
            "-" =&gt; a - b,
            "*" =&gt; a * b,
            "/" =&gt; b != 0 ? a / b : throw new DivideByZeroException(),
            "%" =&gt; a % b,
            _ =&gt; throw new ArgumentException($"Opérateur inconnu : {op}")
        };

        Console.WriteLine($"{a} {op} {b} = {result:F2}");
    }
}`},

{id:41, cat:"switch", catLabel:"Switch", difficulty:2,
 title:"Permissions fichier avec [Flags]",
 description:"Crée un enum <code>[Flags] Permission</code> (Lire, Ecrire, Executer). Combine et teste les permissions.",
 hints:[
   "Les valeurs doivent être des puissances de 2 : 1, 2, 4",
   "Combine avec <code>|</code> : <code>Permission.Lire | Permission.Ecrire</code>",
   "Teste avec <code>.HasFlag(Permission.Lire)</code>"
 ],
 solution:`using System;

[Flags]
enum Permission
{
    Aucune   = 0,
    Lire     = 1,
    Ecrire   = 2,
    Executer = 4
}

class Program
{
    static void AfficherPerms(string nom, Permission p)
    {
        Console.Write($"{nom,-12} : ");
        Console.Write(p.HasFlag(Permission.Lire)     ? "R" : "-");
        Console.Write(p.HasFlag(Permission.Ecrire)   ? "W" : "-");
        Console.Write(p.HasFlag(Permission.Executer) ? "X" : "-");
        Console.WriteLine($"  ({p})");
    }

    static void Main()
    {
        Permission admin = Permission.Lire | Permission.Ecrire | Permission.Executer;
        Permission user  = Permission.Lire | Permission.Executer;
        Permission guest = Permission.Lire;

        AfficherPerms("Admin", admin);
        AfficherPerms("Utilisateur", user);
        AfficherPerms("Invité", guest);
    }
}`},

{id:42, cat:"switch", catLabel:"Switch", difficulty:3,
 title:"Machine à états : distributeur",
 description:"Simule un distributeur automatique avec des états (enum) : Attente → Paiement → Sélection → Distribution → Retour. Gère les transitions.",
 hints:[
   "Enum <code>Etat { Attente, Paiement, Selection, Distribution }</code>",
   "Enum <code>Action { InsererMonnaie, Choisir, Annuler }</code>",
   "Boucle while avec switch sur l'état actuel"
 ],
 solution:`using System;

enum Etat { Attente, Paiement, Selection, Distribution }

class Distributeur
{
    private Etat etat = Etat.Attente;
    private double solde = 0;

    public void InsererMonnaie(double montant)
    {
        if (etat == Etat.Attente || etat == Etat.Paiement)
        {
            solde += montant;
            etat = Etat.Paiement;
            Console.WriteLine($"  Solde : {solde:C2}");
        }
    }

    public void Choisir(string produit, double prix)
    {
        if (etat != Etat.Paiement) { Console.WriteLine("  Insérez d'abord une pièce."); return; }
        if (solde &lt; prix) { Console.WriteLine($"  Solde insuffisant ({solde:C2} &lt; {prix:C2})"); return; }

        etat = Etat.Distribution;
        solde -= prix;
        Console.WriteLine($"  Distribution de {produit}...");
        if (solde &gt; 0) Console.WriteLine($"  Rendu monnaie : {solde:C2}");
        solde = 0;
        etat = Etat.Attente;
        Console.WriteLine($"  État : {etat}");
    }
}

class Program
{
    static void Main()
    {
        var dist = new Distributeur();
        dist.InsererMonnaie(0.50);
        dist.InsererMonnaie(1.00);
        dist.Choisir("Café", 1.20);
    }
}`},

// ╔═══════════════════════════════════════╗
// ║  TRY/CATCH (4 exercices)              ║
// ╚═══════════════════════════════════════╝
{id:43, cat:"trycatch", catLabel:"Try/Catch", difficulty:1,
 title:"Saisie sécurisée d'un entier",
 description:"Demande un entier à l'utilisateur en boucle jusqu'à ce qu'il saisisse un nombre valide avec <code>TryParse</code>.",
 hints:[
   "Utilise <code>int.TryParse(input, out int result)</code> qui retourne un bool",
   "Boucle <code>while (!valide)</code> ou <code>do/while</code>",
   "Affiche un message d'erreur clair à chaque tentative invalide"
 ],
 solution:`using System;

class Program
{
    static int LireEntier(string message)
    {
        int result;
        while (true)
        {
            Console.Write(message);
            if (int.TryParse(Console.ReadLine(), out result))
                return result;
            Console.WriteLine("  ⚠ Ce n'est pas un entier valide. Réessaie.");
        }
    }

    static void Main()
    {
        int age = LireEntier("Ton âge : ");
        Console.WriteLine($"Tu as {age} ans.");
    }
}`},

{id:44, cat:"trycatch", catLabel:"Try/Catch", difficulty:2,
 title:"Lecture de fichier sécurisée",
 description:"Lis le contenu d'un fichier texte avec gestion des erreurs (fichier introuvable, accès refusé). Utilise <code>using</code>.",
 hints:[
   "Utilise <code>using var reader = new StreamReader(path);</code>",
   "Catch séparément <code>FileNotFoundException</code> et <code>Exception</code>",
   "Le <code>using</code> appelle automatiquement <code>Dispose()</code>"
 ],
 solution:`using System;
using System.IO;

class Program
{
    static void Main()
    {
        Console.Write("Chemin du fichier : ");
        string path = Console.ReadLine();

        try
        {
            using var reader = new StreamReader(path);
            string contenu = reader.ReadToEnd();
            Console.WriteLine($"--- Contenu ({contenu.Length} caractères) ---");
            Console.WriteLine(contenu);
        }
        catch (FileNotFoundException)
        {
            Console.WriteLine($"❌ Fichier introuvable : {path}");
        }
        catch (UnauthorizedAccessException)
        {
            Console.WriteLine("❌ Accès refusé à ce fichier.");
        }
        catch (Exception ex)
        {
            Console.WriteLine($"❌ Erreur : {ex.Message}");
        }
    }
}`},

{id:45, cat:"trycatch", catLabel:"Try/Catch", difficulty:2,
 title:"Exception personnalisée",
 description:"Crée une exception <code>AgeInvalideException</code>. Lance-la si l'âge saisi n'est pas entre 0 et 150.",
 hints:[
   "Hérite de <code>Exception</code> : <code>class AgeInvalideException : Exception</code>",
   "Ajoute un constructeur qui passe le message au parent : <code>base(message)</code>",
   "Lance avec <code>throw new AgeInvalideException(\"…\");</code>"
 ],
 solution:`using System;

class AgeInvalideException : Exception
{
    public int AgeRecu { get; }

    public AgeInvalideException(int age)
        : base($"Âge invalide : {age}. Doit être entre 0 et 150.")
    {
        AgeRecu = age;
    }
}

class Personne
{
    private int age;
    public int Age
    {
        get =&gt; age;
        set
        {
            if (value &lt; 0 || value &gt; 150)
                throw new AgeInvalideException(value);
            age = value;
        }
    }
    public string Nom { get; set; }
}

class Program
{
    static void Main()
    {
        try
        {
            var p = new Personne { Nom = "Sharpy", Age = 200 };
        }
        catch (AgeInvalideException ex)
        {
            Console.WriteLine($"❌ {ex.Message}");
            Console.WriteLine($"   Âge reçu : {ex.AgeRecu}");
        }
    }
}`},

{id:46, cat:"trycatch", catLabel:"Try/Catch", difficulty:3,
 title:"Division sécurisée avec logging",
 description:"Crée une méthode de division qui log chaque opération (succès ou erreur) dans une liste, puis affiche l'historique.",
 hints:[
   "Crée une <code>List&lt;string&gt;</code> pour le log",
   "Catch <code>DivideByZeroException</code> et <code>FormatException</code>",
   "Le bloc <code>finally</code> ajoute toujours une entrée au log"
 ],
 solution:`using System;
using System.Collections.Generic;

class Program
{
    static List&lt;string&gt; log = new List&lt;string&gt;();

    static double DiviserSecure(double a, double b)
    {
        string operation = $"{a} / {b}";
        try
        {
            if (b == 0)
                throw new DivideByZeroException();
            double result = a / b;
            log.Add($"✓ {operation} = {result:F4}");
            return result;
        }
        catch (DivideByZeroException)
        {
            log.Add($"✗ {operation} → Division par zéro !");
            return double.NaN;
        }
        finally
        {
            log.Add($"  [fin opération {operation}]");
        }
    }

    static void Main()
    {
        DiviserSecure(10, 3);
        DiviserSecure(42, 0);
        DiviserSecure(100, 7);

        Console.WriteLine("=== Historique ===");
        foreach (string entry in log)
            Console.WriteLine(entry);
    }
}`},

// ╔═══════════════════════════════════════╗
// ║  POO — BASES (4 exercices)            ║
// ╚═══════════════════════════════════════╝
{id:47, cat:"poo-bases", catLabel:"POO Bases", difficulty:1,
 title:"Classe Voiture",
 description:"Crée une classe <code>Voiture</code> avec propriétés (Marque, Modele, Annee), un constructeur, et des méthodes <code>Demarrer()</code> et <code>Afficher()</code>.",
 hints:[
   "Propriétés : <code>public string Marque { get; set; }</code>",
   "Constructeur : même nom que la classe, initialise les propriétés",
   "Méthode void : <code>public void Demarrer() { Console.WriteLine(\"Vrooom\"); }</code>"
 ],
 solution:`using System;

class Voiture
{
    public string Marque { get; set; }
    public string Modele { get; set; }
    public int Annee { get; set; }

    public Voiture(string marque, string modele, int annee)
    {
        Marque = marque;
        Modele = modele;
        Annee = annee;
    }

    public void Demarrer()
    {
        Console.WriteLine($"🚗 La {Marque} {Modele} démarre ! Vrooom !");
    }

    public void Afficher()
    {
        Console.WriteLine($"{Marque} {Modele} ({Annee})");
    }
}

class Program
{
    static void Main()
    {
        var v1 = new Voiture("Toyota", "Corolla", 2022);
        var v2 = new Voiture("BMW", "M3", 2024);

        v1.Afficher();
        v1.Demarrer();
        v2.Afficher();
        v2.Demarrer();
    }
}`},

{id:48, cat:"poo-bases", catLabel:"POO Bases", difficulty:2,
 title:"Compte bancaire",
 description:"Crée une classe <code>CompteBancaire</code> avec solde privé, méthodes Deposer/Retirer (avec validation), et historique des transactions.",
 hints:[
   "Le solde est <code>private</code>, accessible via une propriété en lecture seule",
   "Valide : montant &gt; 0 et solde suffisant pour retrait",
   "Historique : <code>List&lt;string&gt;</code> privée avec des messages horodatés"
 ],
 solution:`using System;
using System.Collections.Generic;

class CompteBancaire
{
    public string Titulaire { get; }
    private double solde;
    public double Solde =&gt; solde;
    private List&lt;string&gt; historique = new();

    public CompteBancaire(string titulaire, double soldeInitial = 0)
    {
        Titulaire = titulaire;
        solde = soldeInitial;
        historique.Add($"Ouverture du compte : {soldeInitial:C2}");
    }

    public bool Deposer(double montant)
    {
        if (montant &lt;= 0) { Console.WriteLine("⚠ Montant invalide."); return false; }
        solde += montant;
        historique.Add($"Dépôt    +{montant:C2} → Solde : {solde:C2}");
        return true;
    }

    public bool Retirer(double montant)
    {
        if (montant &lt;= 0) { Console.WriteLine("⚠ Montant invalide."); return false; }
        if (montant &gt; solde) { Console.WriteLine("⚠ Solde insuffisant."); return false; }
        solde -= montant;
        historique.Add($"Retrait  -{montant:C2} → Solde : {solde:C2}");
        return true;
    }

    public void AfficherHistorique()
    {
        Console.WriteLine($"--- Historique de {Titulaire} ---");
        foreach (string entry in historique)
            Console.WriteLine($"  {entry}");
    }
}

class Program
{
    static void Main()
    {
        var compte = new CompteBancaire("Sharpy", 100);
        compte.Deposer(250);
        compte.Retirer(80);
        compte.Retirer(500); // solde insuffisant
        compte.Deposer(-10); // montant invalide
        compte.AfficherHistorique();
        Console.WriteLine($"Solde final : {compte.Solde:C2}");
    }
}`},

{id:49, cat:"poo-bases", catLabel:"POO Bases", difficulty:2,
 title:"Classe Étudiant avec moyenne",
 description:"Crée une classe <code>Etudiant</code> avec un nom, une liste privée de notes, et une propriété calculée <code>Moyenne</code>.",
 hints:[
   "La liste de notes est <code>private</code>",
   "Ajouter avec <code>public void AjouterNote(double note)</code> (valide 0-20)",
   "Propriété <code>Moyenne</code> calculée : <code>notes.Sum() / notes.Count</code>"
 ],
 solution:`using System;
using System.Collections.Generic;
using System.Linq;

class Etudiant
{
    public string Nom { get; }
    private List&lt;double&gt; notes = new();

    public int NombreNotes =&gt; notes.Count;
    public double Moyenne =&gt; notes.Count &gt; 0 ? notes.Average() : 0;
    public double NoteMax =&gt; notes.Count &gt; 0 ? notes.Max() : 0;
    public double NoteMin =&gt; notes.Count &gt; 0 ? notes.Min() : 0;

    public Etudiant(string nom) { Nom = nom; }

    public void AjouterNote(double note)
    {
        if (note &lt; 0 || note &gt; 20)
            throw new ArgumentException("Note entre 0 et 20 !");
        notes.Add(note);
    }

    public override string ToString()
    {
        return $"{Nom} — Moy: {Moyenne:F2}/20 " +
               $"(Min: {NoteMin}, Max: {NoteMax}, {NombreNotes} notes)";
    }
}

class Program
{
    static void Main()
    {
        var e = new Etudiant("Sharpy");
        e.AjouterNote(14); e.AjouterNote(16.5);
        e.AjouterNote(12); e.AjouterNote(18);
        Console.WriteLine(e);
    }
}`},

{id:50, cat:"poo-bases", catLabel:"POO Bases", difficulty:3,
 title:"Classe Matrice",
 description:"Crée une classe <code>Matrice</code> (int[,]) avec addition, affichage et constructeur. Valide les dimensions.",
 hints:[
   "Utilise un tableau 2D : <code>int[,] data</code>",
   "Propriétés : <code>Lignes</code> et <code>Colonnes</code> via <code>GetLength(0)</code>/<code>GetLength(1)</code>",
   "Pour l'addition : vérifie que les dimensions correspondent"
 ],
 solution:`using System;

class Matrice
{
    private int[,] data;
    public int Lignes =&gt; data.GetLength(0);
    public int Colonnes =&gt; data.GetLength(1);

    public Matrice(int[,] valeurs) { data = valeurs; }

    public static Matrice operator +(Matrice a, Matrice b)
    {
        if (a.Lignes != b.Lignes || a.Colonnes != b.Colonnes)
            throw new InvalidOperationException("Dimensions incompatibles !");

        int[,] result = new int[a.Lignes, a.Colonnes];
        for (int i = 0; i &lt; a.Lignes; i++)
            for (int j = 0; j &lt; a.Colonnes; j++)
                result[i, j] = a.data[i, j] + b.data[i, j];

        return new Matrice(result);
    }

    public void Afficher()
    {
        for (int i = 0; i &lt; Lignes; i++)
        {
            for (int j = 0; j &lt; Colonnes; j++)
                Console.Write($"{data[i, j],4}");
            Console.WriteLine();
        }
    }
}

class Program
{
    static void Main()
    {
        var a = new Matrice(new int[,] { { 1, 2 }, { 3, 4 } });
        var b = new Matrice(new int[,] { { 5, 6 }, { 7, 8 } });

        Console.WriteLine("A :"); a.Afficher();
        Console.WriteLine("B :"); b.Afficher();
        Console.WriteLine("A + B :"); (a + b).Afficher();
    }
}`},

// ╔═══════════════════════════════════════╗
// ║  POO — CONSTRUCTEURS (3 exercices)    ║
// ╚═══════════════════════════════════════╝
{id:51, cat:"poo-bases", catLabel:"POO Bases", difficulty:1,
 title:"Classe Livre avec surcharge",
 description:"Crée une classe <code>Livre</code> avec 3 constructeurs surchargés : (titre), (titre, auteur), (titre, auteur, pages). Utilise le chaînage <code>: this()</code>.",
 hints:[
   "Le constructeur le plus complet a tous les paramètres",
   "Les autres appellent le complet avec <code>: this(titre, \"Inconnu\", 0)</code>",
   "Chaque constructeur délègue au suivant"
 ],
 solution:`using System;

class Livre
{
    public string Titre { get; }
    public string Auteur { get; }
    public int Pages { get; }

    public Livre(string titre, string auteur, int pages)
    {
        Titre = titre;
        Auteur = auteur;
        Pages = pages;
    }

    public Livre(string titre, string auteur) : this(titre, auteur, 0) { }
    public Livre(string titre) : this(titre, "Inconnu") { }

    public override string ToString()
        =&gt; $"\"{Titre}\" par {Auteur}{(Pages &gt; 0 ? $", {Pages} pages" : "")}";
}

class Program
{
    static void Main()
    {
        var l1 = new Livre("1984", "George Orwell", 328);
        var l2 = new Livre("Le Petit Prince", "Saint-Exupéry");
        var l3 = new Livre("Notes de cours");

        Console.WriteLine(l1);
        Console.WriteLine(l2);
        Console.WriteLine(l3);
    }
}`},

{id:52, cat:"poo-bases", catLabel:"POO Bases", difficulty:2,
 title:"Personnage de jeu RPG",
 description:"Crée un <code>Personnage</code> (Nom, PV, Attaque, Défense) avec constructeurs chaînés et validation des stats.",
 hints:[
   "Valide que PV &gt; 0, Attaque &gt;= 0, Défense &gt;= 0 dans le constructeur principal",
   "Constructeur simplifié : <code>: this(nom, 100, 10, 5)</code> (valeurs par défaut)",
   "Méthode <code>RecevoirDegats(int degats)</code> qui réduit les PV"
 ],
 solution:`using System;

class Personnage
{
    public string Nom { get; }
    public int PV { get; private set; }
    public int Attaque { get; }
    public int Defense { get; }
    public bool EstVivant =&gt; PV &gt; 0;

    public Personnage(string nom, int pv, int attaque, int defense)
    {
        Nom = nom;
        PV = Math.Max(1, pv);
        Attaque = Math.Max(0, attaque);
        Defense = Math.Max(0, defense);
    }

    public Personnage(string nom) : this(nom, 100, 10, 5) { }

    public void RecevoirDegats(int degats)
    {
        int degatsFinals = Math.Max(1, degats - Defense);
        PV = Math.Max(0, PV - degatsFinals);
        Console.WriteLine($"  {Nom} reçoit {degatsFinals} dégâts ! PV: {PV}");
    }

    public void Attaquer(Personnage cible)
    {
        Console.WriteLine($"{Nom} attaque {cible.Nom} !");
        cible.RecevoirDegats(Attaque);
    }

    public override string ToString()
        =&gt; $"{Nom} [PV:{PV} ATK:{Attaque} DEF:{Defense}]";
}

class Program
{
    static void Main()
    {
        var guerrier = new Personnage("Guerrier", 150, 20, 10);
        var mage = new Personnage("Mage", 80, 30, 3);

        Console.WriteLine(guerrier);
        Console.WriteLine(mage);

        guerrier.Attaquer(mage);
        mage.Attaquer(guerrier);
        guerrier.Attaquer(mage);
    }
}`},

{id:53, cat:"poo-bases", catLabel:"POO Bases", difficulty:3,
 title:"Pattern Builder — Pizza",
 description:"Implémente le pattern Builder pour créer une Pizza : taille, pâte, garnitures, prix calculé automatiquement.",
 hints:[
   "Classe <code>Pizza</code> avec constructeur privé",
   "Classe interne <code>Builder</code> avec méthodes fluent (<code>return this</code>)",
   "Méthode <code>Build()</code> retourne la <code>Pizza</code> construite"
 ],
 solution:`using System;
using System.Collections.Generic;

class Pizza
{
    public string Taille { get; }
    public string Pate { get; }
    public List&lt;string&gt; Garnitures { get; }
    public double Prix { get; }

    private Pizza(Builder builder)
    {
        Taille = builder.Taille;
        Pate = builder.Pate;
        Garnitures = builder.Garnitures;
        Prix = builder.PrixBase + builder.Garnitures.Count * 1.50;
    }

    public override string ToString()
    {
        return $"🍕 Pizza {Taille} ({Pate})\\n" +
               $"   Garnitures : {string.Join(", ", Garnitures)}\\n" +
               $"   Prix : {Prix:C2}";
    }

    public class Builder
    {
        public string Taille { get; private set; } = "Moyenne";
        public string Pate { get; private set; } = "Classique";
        public List&lt;string&gt; Garnitures { get; } = new();
        public double PrixBase { get; private set; } = 8.00;

        public Builder SetTaille(string taille, double prix)
        { Taille = taille; PrixBase = prix; return this; }

        public Builder SetPate(string pate)
        { Pate = pate; return this; }

        public Builder AjouterGarniture(string garniture)
        { Garnitures.Add(garniture); return this; }

        public Pizza Build() =&gt; new Pizza(this);
    }
}

class Program
{
    static void Main()
    {
        var pizza = new Pizza.Builder()
            .SetTaille("Grande", 12.00)
            .SetPate("Fine")
            .AjouterGarniture("Mozzarella")
            .AjouterGarniture("Tomates")
            .AjouterGarniture("Basilic")
            .AjouterGarniture("Olives")
            .Build();

        Console.WriteLine(pizza);
    }
}`},

// ╔═══════════════════════════════════════╗
// ║  POO — ENCAPSULATION (3 exercices)    ║
// ╚═══════════════════════════════════════╝
{id:54, cat:"poo-bases", catLabel:"POO Bases", difficulty:1,
 title:"Propriété Age avec validation",
 description:"Crée une classe <code>Personne</code> avec une propriété <code>Age</code> qui refuse les valeurs hors 0-150.",
 hints:[
   "Utilise un champ privé <code>private int age;</code> et une propriété publique",
   "Dans le <code>set</code>, lance <code>ArgumentOutOfRangeException</code> si invalide",
   "Le <code>get</code> retourne simplement le champ privé"
 ],
 solution:`using System;

class Personne
{
    public string Nom { get; set; }

    private int age;
    public int Age
    {
        get =&gt; age;
        set
        {
            if (value &lt; 0 || value &gt; 150)
                throw new ArgumentOutOfRangeException(
                    nameof(Age), $"L'âge doit être entre 0 et 150 (reçu : {value})");
            age = value;
        }
    }

    public Personne(string nom, int age)
    {
        Nom = nom;
        Age = age; // passe par le setter → validation
    }
}

class Program
{
    static void Main()
    {
        var p = new Personne("Alice", 25);
        Console.WriteLine($"{p.Nom}, {p.Age} ans");

        try { p.Age = 200; }
        catch (ArgumentOutOfRangeException ex)
        { Console.WriteLine($"❌ {ex.Message}"); }
    }
}`},

{id:55, cat:"poo-bases", catLabel:"POO Bases", difficulty:2,
 title:"Panier d'achat encapsulé",
 description:"Crée une classe <code>Panier</code> avec une List privée d'articles. Expose un accès en lecture seule et un Total calculé.",
 hints:[
   "Stocke en <code>private List&lt;(string nom, double prix)&gt;</code>",
   "Expose avec <code>IReadOnlyList&lt;…&gt;</code> pour empêcher les modifs externes",
   "Propriété <code>Total</code> en lecture seule avec Sum()"
 ],
 solution:`using System;
using System.Collections.Generic;
using System.Linq;

class Article
{
    public string Nom { get; }
    public double Prix { get; }
    public Article(string nom, double prix) { Nom = nom; Prix = prix; }
    public override string ToString() =&gt; $"{Nom} ({Prix:C2})";
}

class Panier
{
    private List&lt;Article&gt; articles = new();
    public IReadOnlyList&lt;Article&gt; Articles =&gt; articles.AsReadOnly();
    public double Total =&gt; articles.Sum(a =&gt; a.Prix);
    public int Nombre =&gt; articles.Count;

    public void Ajouter(string nom, double prix)
    {
        if (prix &lt;= 0) throw new ArgumentException("Prix doit être positif");
        articles.Add(new Article(nom, prix));
    }

    public bool Supprimer(string nom)
    {
        var article = articles.Find(a =&gt; a.Nom == nom);
        if (article == null) return false;
        return articles.Remove(article);
    }

    public void Afficher()
    {
        Console.WriteLine($"🛒 Panier ({Nombre} articles) :");
        foreach (var a in articles)
            Console.WriteLine($"  • {a}");
        Console.WriteLine($"  TOTAL : {Total:C2}");
    }
}

class Program
{
    static void Main()
    {
        var panier = new Panier();
        panier.Ajouter("Clavier", 49.99);
        panier.Ajouter("Souris", 29.99);
        panier.Ajouter("Écran", 299.99);
        panier.Afficher();

        panier.Supprimer("Souris");
        Console.WriteLine("\\nAprès suppression de la souris :");
        panier.Afficher();
    }
}`},

{id:56, cat:"poo-bases", catLabel:"POO Bases", difficulty:3,
 title:"Validateur de mot de passe",
 description:"Crée une classe <code>Password</code> qui valide un mot de passe : min 8 chars, au moins 1 majuscule, 1 minuscule, 1 chiffre, 1 caractère spécial.",
 hints:[
   "Valide dans le setter avec des conditions séparées",
   "Utilise <code>char.IsUpper</code>, <code>char.IsLower</code>, <code>char.IsDigit</code>",
   "Retourne une liste de messages d'erreur plutôt qu'un simple bool"
 ],
 solution:`using System;
using System.Collections.Generic;
using System.Linq;

class Password
{
    private string value;

    public string Value
    {
        get =&gt; new string('*', value.Length); // masqué
        set
        {
            var errors = Valider(value: value);
            if (errors.Count &gt; 0)
                throw new ArgumentException(
                    "Mot de passe invalide :\\n" + string.Join("\\n", errors));
            this.value = value;
        }
    }

    public static List&lt;string&gt; Valider(string value)
    {
        var errors = new List&lt;string&gt;();
        if (value.Length &lt; 8) errors.Add("  • Min 8 caractères");
        if (!value.Any(char.IsUpper)) errors.Add("  • Au moins 1 majuscule");
        if (!value.Any(char.IsLower)) errors.Add("  • Au moins 1 minuscule");
        if (!value.Any(char.IsDigit)) errors.Add("  • Au moins 1 chiffre");
        if (!value.Any(c =&gt; !char.IsLetterOrDigit(c))) errors.Add("  • Au moins 1 caractère spécial");
        return errors;
    }
}

class Program
{
    static void Main()
    {
        string[] tests = { "abc", "password", "Pass1234", "P@ss1234!" };

        foreach (string pwd in tests)
        {
            var errors = Password.Valider(pwd);
            Console.Write($"{pwd,-15} → ");
            if (errors.Count == 0)
                Console.WriteLine("✓ Valide");
            else
            {
                Console.WriteLine("✗ Invalide");
                foreach (var e in errors) Console.WriteLine(e);
            }
        }
    }
}`},

// ╔═══════════════════════════════════════╗
// ║  POO — HÉRITAGE (4 exercices)         ║
// ╚═══════════════════════════════════════╝
{id:57, cat:"poo-heritage", catLabel:"POO Héritage", difficulty:1,
 title:"Hiérarchie Forme → Rectangle → Carré",
 description:"Crée une hiérarchie de formes géométriques avec une méthode <code>CalculerAire()</code> redéfinie dans chaque sous-classe.",
 hints:[
   "Classe de base <code>Forme</code> avec <code>virtual double CalculerAire()</code>",
   "<code>Rectangle</code> hérite de <code>Forme</code> et redéfinit avec <code>override</code>",
   "<code>Carré</code> hérite de <code>Rectangle</code> et appelle <code>base(cote, cote)</code>"
 ],
 solution:`using System;

class Forme
{
    public string Nom { get; }
    public Forme(string nom) { Nom = nom; }
    public virtual double CalculerAire() =&gt; 0;
    public override string ToString() =&gt; $"{Nom} — Aire : {CalculerAire():F2}";
}

class Rectangle : Forme
{
    public double Longueur { get; }
    public double Largeur { get; }

    public Rectangle(double longueur, double largeur)
        : base("Rectangle")
    { Longueur = longueur; Largeur = largeur; }

    public override double CalculerAire() =&gt; Longueur * Largeur;
}

class Carre : Rectangle
{
    public Carre(double cote) : base(cote, cote) { }
    public override string ToString() =&gt; $"Carré ({Longueur}) — Aire : {CalculerAire():F2}";
}

class Cercle : Forme
{
    public double Rayon { get; }
    public Cercle(double rayon) : base("Cercle") { Rayon = rayon; }
    public override double CalculerAire() =&gt; Math.PI * Rayon * Rayon;
}

class Program
{
    static void Main()
    {
        Forme[] formes = {
            new Rectangle(5, 3),
            new Carre(4),
            new Cercle(7)
        };

        foreach (var f in formes)
            Console.WriteLine(f);
    }
}`},

{id:58, cat:"poo-heritage", catLabel:"POO Héritage", difficulty:2,
 title:"Salaire par niveau hiérarchique",
 description:"Crée <code>Employe</code> → <code>Manager</code> → <code>Directeur</code>. Chaque niveau ajoute une prime au salaire de base.",
 hints:[
   "<code>Employe</code> a un salaire de base et <code>virtual double CalculerSalaire()</code>",
   "<code>Manager</code> ajoute 20% : <code>base.CalculerSalaire() * 1.20</code>",
   "<code>Directeur</code> ajoute 50% sur le salaire Manager"
 ],
 solution:`using System;

class Employe
{
    public string Nom { get; }
    public double SalaireBase { get; }

    public Employe(string nom, double salaireBase)
    { Nom = nom; SalaireBase = salaireBase; }

    public virtual double CalculerSalaire() =&gt; SalaireBase;

    public override string ToString()
        =&gt; $"{GetType().Name,-12} {Nom,-15} Salaire: {CalculerSalaire():C2}";
}

class Manager : Employe
{
    public Manager(string nom, double salaireBase)
        : base(nom, salaireBase) { }

    public override double CalculerSalaire()
        =&gt; base.CalculerSalaire() * 1.20; // +20% prime management
}

class Directeur : Manager
{
    public Directeur(string nom, double salaireBase)
        : base(nom, salaireBase) { }

    public override double CalculerSalaire()
        =&gt; base.CalculerSalaire() * 1.50; // +50% prime direction
}

class Program
{
    static void Main()
    {
        Employe[] equipe = {
            new Employe("Alice", 2500),
            new Manager("Bob", 2500),
            new Directeur("Charlie", 2500)
        };

        foreach (var e in equipe)
            Console.WriteLine(e);
    }
}`},

{id:59, cat:"poo-heritage", catLabel:"POO Héritage", difficulty:3,
 title:"Animaux : classe abstraite",
 description:"Crée une classe abstraite <code>Animal</code> avec <code>abstract Parler()</code> et <code>virtual Deplacer()</code>. Implémente Chat, Chien, Oiseau.",
 hints:[
   "Classe <code>abstract</code> : ne peut pas être instanciée directement",
   "Méthode <code>abstract</code> : pas de corps, DOIT être redéfinie",
   "Méthode <code>virtual</code> : a un corps par défaut, PEUT être redéfinie"
 ],
 solution:`using System;
using System.Collections.Generic;

abstract class Animal
{
    public string Nom { get; }
    protected Animal(string nom) { Nom = nom; }

    public abstract string Parler();
    public virtual string Deplacer() =&gt; "marche";

    public override string ToString()
        =&gt; $"{Nom} ({GetType().Name}) : \"{Parler()}\" — {Deplacer()}";
}

class Chat : Animal
{
    public Chat(string nom) : base(nom) { }
    public override string Parler() =&gt; "Miaou !";
}

class Chien : Animal
{
    public Chien(string nom) : base(nom) { }
    public override string Parler() =&gt; "Ouaf !";
}

class Oiseau : Animal
{
    public Oiseau(string nom) : base(nom) { }
    public override string Parler() =&gt; "Cui cui !";
    public override string Deplacer() =&gt; "vole 🐦";
}

class Program
{
    static void Main()
    {
        List&lt;Animal&gt; animaux = new()
        {
            new Chat("Moustache"),
            new Chien("Rex"),
            new Oiseau("Piou")
        };

        foreach (var a in animaux)
            Console.WriteLine(a);
    }
}`},

{id:60, cat:"poo-heritage", catLabel:"POO Héritage", difficulty:3,
 title:"Système de notifications polymorphe",
 description:"Crée <code>Notification</code> (abstraite) → <code>Email</code>, <code>SMS</code>, <code>Push</code>. Chacune a sa propre logique d'envoi. Envoie toutes les notifs polymorphiquement.",
 hints:[
   "Classe abstraite avec <code>abstract void Envoyer()</code>",
   "Chaque sous-classe a ses propres données (adresse email, numéro, token)",
   "Crée une <code>List&lt;Notification&gt;</code> et appelle <code>Envoyer()</code> en boucle"
 ],
 solution:`using System;
using System.Collections.Generic;

abstract class Notification
{
    public string Message { get; }
    public DateTime Date { get; } = DateTime.Now;
    protected Notification(string message) { Message = message; }
    public abstract void Envoyer();
}

class EmailNotification : Notification
{
    public string Destinataire { get; }
    public EmailNotification(string dest, string msg) : base(msg)
    { Destinataire = dest; }

    public override void Envoyer()
    {
        Console.WriteLine($"📧 Email → {Destinataire}");
        Console.WriteLine($"   \"{Message}\"");
    }
}

class SMSNotification : Notification
{
    public string Numero { get; }
    public SMSNotification(string num, string msg) : base(msg)
    { Numero = num; }

    public override void Envoyer()
    {
        Console.WriteLine($"📱 SMS → {Numero}");
        Console.WriteLine($"   \"{Message}\"");
    }
}

class PushNotification : Notification
{
    public string AppId { get; }
    public PushNotification(string appId, string msg) : base(msg)
    { AppId = appId; }

    public override void Envoyer()
    {
        Console.WriteLine($"🔔 Push → App:{AppId}");
        Console.WriteLine($"   \"{Message}\"");
    }
}

class Program
{
    static void Main()
    {
        List&lt;Notification&gt; notifs = new()
        {
            new EmailNotification("user@mail.com", "Bienvenue !"),
            new SMSNotification("+33612345678", "Code: 4829"),
            new PushNotification("com.app.myapp", "Nouvelle mise à jour")
        };

        foreach (var n in notifs)
        {
            n.Envoyer();
            Console.WriteLine();
        }
    }
}`},

// ╔═══════════════════════════════════════╗
// ║  POO — POLYMORPHISME (3 exercices)    ║
// ╚═══════════════════════════════════════╝
{id:61, cat:"poo-heritage", catLabel:"POO Héritage", difficulty:2,
 title:"Collection polymorphe d'animaux",
 description:"Crée une ferme avec différents animaux. Fais-les tous parler et se déplacer via une seule boucle polymorphe.",
 hints:[
   "Utilise la hiérarchie Animal de l'exercice 59",
   "Stocke dans une <code>List&lt;Animal&gt;</code>",
   "Le polymorphisme appelle automatiquement la bonne méthode"
 ],
 solution:`using System;
using System.Collections.Generic;

abstract class Animal
{
    public string Nom { get; }
    protected Animal(string nom) { Nom = nom; }
    public abstract string Parler();
    public virtual string Deplacer() =&gt; "marche";
}

class Vache : Animal
{
    public Vache(string nom) : base(nom) { }
    public override string Parler() =&gt; "Meuh !";
}

class Canard : Animal
{
    public Canard(string nom) : base(nom) { }
    public override string Parler() =&gt; "Coin coin !";
    public override string Deplacer() =&gt; "nage et vole";
}

class Cheval : Animal
{
    public Cheval(string nom) : base(nom) { }
    public override string Parler() =&gt; "Hiiii !";
    public override string Deplacer() =&gt; "galope";
}

class Program
{
    static void Main()
    {
        List&lt;Animal&gt; ferme = new()
        {
            new Vache("Marguerite"), new Canard("Donald"),
            new Cheval("Tornado"), new Vache("Blanchette")
        };

        Console.WriteLine("🌾 La ferme se réveille :");
        foreach (var a in ferme)
            Console.WriteLine($"  {a.Nom} ({a.GetType().Name}) dit \"{a.Parler()}\" et {a.Deplacer()}");
    }
}`},

{id:62, cat:"poo-heritage", catLabel:"POO Héritage", difficulty:3,
 title:"Système de paiement polymorphe",
 description:"Crée <code>Paiement</code> → <code>CarteBancaire</code>, <code>PayPal</code>, <code>Virement</code>. Chaque mode a sa propre validation et traitement.",
 hints:[
   "Méthode abstraite <code>bool Traiter(double montant)</code>",
   "Chaque sous-classe a ses propres validations spécifiques",
   "CarteBancaire : vérifie le numéro, PayPal : vérifie l'email, Virement : vérifie l'IBAN"
 ],
 solution:`using System;
using System.Collections.Generic;

abstract class Paiement
{
    public abstract string Mode { get; }
    public abstract bool Traiter(double montant);
}

class CarteBancaire : Paiement
{
    public string Numero { get; }
    public override string Mode =&gt; "Carte Bancaire";

    public CarteBancaire(string numero) { Numero = numero; }

    public override bool Traiter(double montant)
    {
        string masque = $"****{Numero[^4..]}";
        Console.WriteLine($"💳 {Mode} {masque} — {montant:C2}");
        Console.WriteLine("   Transaction autorisée ✓");
        return true;
    }
}

class PayPal : Paiement
{
    public string Email { get; }
    public override string Mode =&gt; "PayPal";

    public PayPal(string email) { Email = email; }

    public override bool Traiter(double montant)
    {
        Console.WriteLine($"🅿️ {Mode} ({Email}) — {montant:C2}");
        Console.WriteLine("   Paiement confirmé ✓");
        return true;
    }
}

class Virement : Paiement
{
    public string IBAN { get; }
    public override string Mode =&gt; "Virement";

    public Virement(string iban) { IBAN = iban; }

    public override bool Traiter(double montant)
    {
        Console.WriteLine($"🏦 {Mode} ({IBAN[..8]}…) — {montant:C2}");
        Console.WriteLine("   Virement en cours (2-3 jours) ✓");
        return true;
    }
}

class Program
{
    static void Main()
    {
        List&lt;Paiement&gt; paiements = new()
        {
            new CarteBancaire("4532015112830366"),
            new PayPal("sharpy@mail.com"),
            new Virement("FR7630006000011234567890189")
        };

        foreach (var p in paiements)
        {
            p.Traiter(49.99);
            Console.WriteLine();
        }
    }
}`},

{id:63, cat:"poo-heritage", catLabel:"POO Héritage", difficulty:3,
 title:"Jeu RPG : combat tour par tour",
 description:"Crée <code>Personnage</code> → <code>Guerrier</code>, <code>Mage</code>, <code>Archer</code> avec compétences spéciales et un combat automatique.",
 hints:[
   "Méthode abstraite <code>int CompetenceSpeciale()</code> retourne les dégâts",
   "Guerrier : coup puissant (x2), Mage : boule de feu (x3 mais -10 PV), Archer : tir critique (aléatoire)",
   "Combat : while les deux sont vivants, alternance d'attaques"
 ],
 solution:`using System;

abstract class Combattant
{
    public string Nom { get; }
    public int PV { get; protected set; }
    public int Attaque { get; }
    public bool Vivant =&gt; PV &gt; 0;

    protected Combattant(string nom, int pv, int atk)
    { Nom = nom; PV = pv; Attaque = atk; }

    public void RecevoirDegats(int degats)
    {
        PV = Math.Max(0, PV - degats);
    }

    public abstract int CompetenceSpeciale();
    public abstract string NomSpeciale { get; }
}

class Guerrier : Combattant
{
    public Guerrier(string nom) : base(nom, 150, 15) { }
    public override string NomSpeciale =&gt; "Coup Puissant";
    public override int CompetenceSpeciale() =&gt; Attaque * 2;
}

class Mage : Combattant
{
    public Mage(string nom) : base(nom, 80, 25) { }
    public override string NomSpeciale =&gt; "Boule de Feu";
    public override int CompetenceSpeciale()
    {
        PV = Math.Max(0, PV - 10); // coûte des PV
        return Attaque * 3;
    }
}

class Archer : Combattant
{
    static Random rng = new();
    public Archer(string nom) : base(nom, 100, 20) { }
    public override string NomSpeciale =&gt; "Tir Critique";
    public override int CompetenceSpeciale()
    {
        bool critique = rng.Next(100) &lt; 40; // 40% de chance
        return critique ? Attaque * 4 : Attaque;
    }
}

class Program
{
    static Random rng = new();

    static void Tour(Combattant attaquant, Combattant defenseur)
    {
        bool special = rng.Next(100) &lt; 30; // 30% de chance spéciale
        int degats;

        if (special)
        {
            degats = attaquant.CompetenceSpeciale();
            Console.Write($"  ⚡ {attaquant.Nom} utilise {attaquant.NomSpeciale} !");
        }
        else
        {
            degats = attaquant.Attaque;
            Console.Write($"  ⚔️ {attaquant.Nom} attaque !");
        }

        defenseur.RecevoirDegats(degats);
        Console.WriteLine($" -{degats} dégâts → {defenseur.Nom} PV:{defenseur.PV}");
    }

    static void Main()
    {
        var c1 = new Guerrier("Thorin");
        var c2 = new Mage("Gandalf");

        Console.WriteLine($"🏟️ Combat : {c1.Nom} vs {c2.Nom}\\n");
        int tour = 1;

        while (c1.Vivant &amp;&amp; c2.Vivant)
        {
            Console.WriteLine($"--- Tour {tour} ---");
            Tour(c1, c2);
            if (c2.Vivant) Tour(c2, c1);
            tour++;
        }

        var vainqueur = c1.Vivant ? c1 : c2;
        Console.WriteLine($"\\n🏆 {vainqueur.Nom} remporte le combat avec {vainqueur.PV} PV !");
    }
}`},

// ╔═══════════════════════════════════════╗
// ║  POO — AVANCÉ (5 exercices)           ║
// ╚═══════════════════════════════════════╝
{id:64, cat:"poo-avance", catLabel:"POO Avancé", difficulty:2,
 title:"ToString() et Equals() pour Point",
 description:"Crée une classe <code>Point</code>(X, Y) avec <code>ToString()</code>, <code>Equals()</code> et <code>GetHashCode()</code> redéfinis.",
 hints:[
   "<code>ToString()</code> : retourne <code>$\"({X}, {Y})\"</code>",
   "<code>Equals()</code> : compare les champs X et Y après cast",
   "<code>GetHashCode()</code> : <code>HashCode.Combine(X, Y)</code>"
 ],
 solution:`using System;

class Point
{
    public double X { get; }
    public double Y { get; }

    public Point(double x, double y) { X = x; Y = y; }

    public double DistanceTo(Point autre)
        =&gt; Math.Sqrt(Math.Pow(X - autre.X, 2) + Math.Pow(Y - autre.Y, 2));

    public override string ToString() =&gt; $"({X}, {Y})";

    public override bool Equals(object obj)
    {
        if (obj is Point other)
            return X == other.X &amp;&amp; Y == other.Y;
        return false;
    }

    public override int GetHashCode() =&gt; HashCode.Combine(X, Y);
}

class Program
{
    static void Main()
    {
        var a = new Point(3, 4);
        var b = new Point(3, 4);
        var c = new Point(1, 1);

        Console.WriteLine($"a = {a}");
        Console.WriteLine($"b = {b}");
        Console.WriteLine($"a.Equals(b) = {a.Equals(b)}"); // true
        Console.WriteLine($"a.Equals(c) = {a.Equals(c)}"); // false
        Console.WriteLine($"Distance a→c = {a.DistanceTo(c):F2}");
    }
}`},

{id:65, cat:"poo-avance", catLabel:"POO Avancé", difficulty:2,
 title:"Véhicules abstraits",
 description:"Crée <code>abstract class Vehicule</code> avec Voiture, Moto et Camion. Propriétés abstraites et concrètes.",
 hints:[
   "Propriétés abstraites : <code>public abstract int NombreRoues { get; }</code>",
   "Propriété concrète dans la base : <code>Marque</code>, <code>Vitesse</code>",
   "Méthode abstraite <code>string Decrire()</code>"
 ],
 solution:`using System;
using System.Collections.Generic;

abstract class Vehicule
{
    public string Marque { get; }
    public int VitesseMax { get; }
    public abstract int NombreRoues { get; }
    public abstract string Type { get; }

    protected Vehicule(string marque, int vitMax)
    { Marque = marque; VitesseMax = vitMax; }

    public override string ToString()
        =&gt; $"{Type} {Marque} — {NombreRoues} roues, {VitesseMax} km/h max";
}

class Voiture : Vehicule
{
    public int NombrePortes { get; }
    public override int NombreRoues =&gt; 4;
    public override string Type =&gt; "🚗 Voiture";

    public Voiture(string marque, int vitMax, int portes)
        : base(marque, vitMax) { NombrePortes = portes; }
}

class Moto : Vehicule
{
    public override int NombreRoues =&gt; 2;
    public override string Type =&gt; "🏍️ Moto";
    public Moto(string marque, int vitMax) : base(marque, vitMax) { }
}

class Camion : Vehicule
{
    public double ChargeMax { get; }
    public override int NombreRoues =&gt; 6;
    public override string Type =&gt; "🚛 Camion";

    public Camion(string marque, int vitMax, double charge)
        : base(marque, vitMax) { ChargeMax = charge; }
}

class Program
{
    static void Main()
    {
        List&lt;Vehicule&gt; garage = new()
        {
            new Voiture("Peugeot 308", 220, 5),
            new Moto("Yamaha R1", 299),
            new Camion("Mercedes Actros", 130, 26.0)
        };

        foreach (var v in garage)
            Console.WriteLine(v);
    }
}`},

{id:66, cat:"poo-avance", catLabel:"POO Avancé", difficulty:3,
 title:"Gestion d'étudiants CRUD",
 description:"Système complet : ajouter, lister, chercher, modifier, supprimer des étudiants. Menu interactif en boucle.",
 hints:[
   "Classe <code>Etudiant</code> avec Id auto-incrémenté, Nom, Prenom, Moyenne",
   "Classe <code>GestionEtudiants</code> avec List + méthodes CRUD",
   "Menu switch dans un while(true) avec affichage formaté"
 ],
 solution:`using System;
using System.Collections.Generic;
using System.Linq;

class Etudiant
{
    private static int compteur = 0;
    public int Id { get; }
    public string Nom { get; set; }
    public string Prenom { get; set; }
    public double Moyenne { get; set; }

    public Etudiant(string nom, string prenom, double moyenne)
    {
        Id = ++compteur;
        Nom = nom; Prenom = prenom; Moyenne = moyenne;
    }

    public override string ToString()
        =&gt; $"[{Id}] {Prenom} {Nom} — Moy: {Moyenne:F2}/20";
}

class GestionEtudiants
{
    private List&lt;Etudiant&gt; etudiants = new();

    public void Ajouter(Etudiant e) { etudiants.Add(e); }

    public Etudiant Chercher(int id)
        =&gt; etudiants.FirstOrDefault(e =&gt; e.Id == id);

    public bool Supprimer(int id)
    {
        var e = Chercher(id);
        return e != null &amp;&amp; etudiants.Remove(e);
    }

    public void Lister()
    {
        if (etudiants.Count == 0) { Console.WriteLine("Aucun étudiant."); return; }
        foreach (var e in etudiants.OrderBy(e =&gt; e.Nom))
            Console.WriteLine($"  {e}");
        Console.WriteLine($"  --- {etudiants.Count} étudiant(s), " +
            $"moyenne générale : {etudiants.Average(e =&gt; e.Moyenne):F2}/20");
    }
}

class Program
{
    static void Main()
    {
        var gestion = new GestionEtudiants();
        gestion.Ajouter(new Etudiant("Dupont", "Alice", 15.5));
        gestion.Ajouter(new Etudiant("Martin", "Bob", 12.0));
        gestion.Ajouter(new Etudiant("Durand", "Charlie", 17.25));

        Console.WriteLine("--- Liste des étudiants ---");
        gestion.Lister();

        Console.WriteLine("\\n--- Recherche ID 2 ---");
        var e = gestion.Chercher(2);
        Console.WriteLine(e != null ? e.ToString() : "Non trouvé");

        Console.WriteLine("\\n--- Suppression ID 2 ---");
        gestion.Supprimer(2);
        gestion.Lister();
    }
}`},

{id:67, cat:"poo-avance", catLabel:"POO Avancé", difficulty:3,
 title:"Pattern Singleton — Logger",
 description:"Implémente un Logger en Singleton thread-safe. Une seule instance dans toute l'application.",
 hints:[
   "Constructeur <code>private</code> pour empêcher l'instanciation externe",
   "Propriété <code>static Instance</code> avec lazy initialization",
   "Utilise <code>lock</code> pour la thread-safety"
 ],
 solution:`using System;
using System.Collections.Generic;

class Logger
{
    private static Logger instance;
    private static readonly object lockObj = new();
    private List&lt;string&gt; logs = new();

    private Logger() { } // constructeur privé

    public static Logger Instance
    {
        get
        {
            if (instance == null)
            {
                lock (lockObj)
                {
                    if (instance == null)
                        instance = new Logger();
                }
            }
            return instance;
        }
    }

    public void Info(string msg)
    {
        string entry = $"[{DateTime.Now:HH:mm:ss}] INFO  {msg}";
        logs.Add(entry);
        Console.WriteLine(entry);
    }

    public void Error(string msg)
    {
        string entry = $"[{DateTime.Now:HH:mm:ss}] ERROR {msg}";
        logs.Add(entry);
        Console.WriteLine(entry);
    }

    public void AfficherHistorique()
    {
        Console.WriteLine($"--- {logs.Count} entrées ---");
        foreach (var l in logs) Console.WriteLine(l);
    }
}

class Program
{
    static void Main()
    {
        Logger.Instance.Info("Application démarrée");
        Logger.Instance.Info("Chargement des données...");
        Logger.Instance.Error("Fichier config manquant !");
        Logger.Instance.Info("Utilisation des valeurs par défaut");

        Console.WriteLine();
        Logger.Instance.AfficherHistorique();

        // Preuve du singleton
        Console.WriteLine($"\\nMême instance ? {ReferenceEquals(Logger.Instance, Logger.Instance)}");
    }
}`},

{id:68, cat:"poo-avance", catLabel:"POO Avancé", difficulty:3,
 title:"Mini jeu de cartes",
 description:"Crée un jeu de cartes complet : <code>Carte</code> (enum Couleur/Valeur), <code>Paquet</code> (52 cartes, mélange, distribution). Distribue 2 mains et compare.",
 hints:[
   "Enum <code>Couleur { Coeur, Carreau, Trefle, Pique }</code>",
   "Enum <code>Valeur { As=1, Deux=2, ..., Roi=13 }</code>",
   "Classe <code>Paquet</code> avec <code>List&lt;Carte&gt;</code>, <code>Melanger()</code> et <code>Tirer()</code>"
 ],
 solution:`using System;
using System.Collections.Generic;
using System.Linq;

enum Couleur { Coeur, Carreau, Trefle, Pique }
enum Valeur { As=1, Deux=2, Trois=3, Quatre=4, Cinq=5, Six=6, Sept=7,
              Huit=8, Neuf=9, Dix=10, Valet=11, Dame=12, Roi=13 }

class Carte
{
    public Couleur Couleur { get; }
    public Valeur Valeur { get; }
    public int Points =&gt; (int)Valeur;

    public Carte(Couleur c, Valeur v) { Couleur = c; Valeur = v; }

    public override string ToString()
    {
        string symbole = Couleur switch {
            Couleur.Coeur =&gt; "♥", Couleur.Carreau =&gt; "♦",
            Couleur.Trefle =&gt; "♣", Couleur.Pique =&gt; "♠", _ =&gt; "?"
        };
        return $"{Valeur} {symbole}";
    }
}

class Paquet
{
    private List&lt;Carte&gt; cartes = new();
    private Random rng = new();

    public Paquet()
    {
        foreach (Couleur c in Enum.GetValues(typeof(Couleur)))
            foreach (Valeur v in Enum.GetValues(typeof(Valeur)))
                cartes.Add(new Carte(c, v));
    }

    public void Melanger()
    {
        for (int i = cartes.Count - 1; i &gt; 0; i--)
        {
            int j = rng.Next(i + 1);
            (cartes[i], cartes[j]) = (cartes[j], cartes[i]);
        }
    }

    public Carte Tirer()
    {
        if (cartes.Count == 0) return null;
        var c = cartes[0]; cartes.RemoveAt(0); return c;
    }

    public List&lt;Carte&gt; Distribuer(int n)
    {
        var main = new List&lt;Carte&gt;();
        for (int i = 0; i &lt; n &amp;&amp; cartes.Count &gt; 0; i++)
            main.Add(Tirer());
        return main;
    }
}

class Program
{
    static int ScoreMain(List&lt;Carte&gt; main) =&gt; main.Sum(c =&gt; c.Points);

    static void Main()
    {
        var paquet = new Paquet();
        paquet.Melanger();

        var main1 = paquet.Distribuer(5);
        var main2 = paquet.Distribuer(5);

        Console.WriteLine("Main 1 : " + string.Join(", ", main1));
        Console.WriteLine($"  Score : {ScoreMain(main1)}");
        Console.WriteLine("Main 2 : " + string.Join(", ", main2));
        Console.WriteLine($"  Score : {ScoreMain(main2)}");

        int s1 = ScoreMain(main1), s2 = ScoreMain(main2);
        Console.WriteLine(s1 &gt; s2 ? "\\n🏆 Main 1 gagne !" :
                         s1 &lt; s2 ? "\\n🏆 Main 2 gagne !" :
                         "\\n🤝 Égalité !");
    }
}`},

// ╔═══════════════════════════════════════════╗
// ║  BONUS — 2 exercices supplémentaires      ║
// ╚═══════════════════════════════════════════╝
{id:69, cat:"poo-avance", catLabel:"POO Avancé", difficulty:3,
 title:"Pattern Observer — Événements",
 description:"Implémente un système d'abonnement : quand un <code>Capteur</code> change de valeur, tous les <code>Afficheurs</code> abonnés sont notifiés.",
 hints:[
   "Interface <code>IObservateur</code> avec <code>void MiseAJour(string source, double valeur)</code>",
   "Classe <code>Capteur</code> avec une <code>List&lt;IObservateur&gt;</code> et <code>Abonner()</code>/<code>Notifier()</code>",
   "Quand la propriété <code>Valeur</code> change dans le setter, appelle <code>Notifier()</code>"
 ],
 solution:`using System;
using System.Collections.Generic;

interface IObservateur
{
    void MiseAJour(string source, double valeur);
}

class Capteur
{
    public string Nom { get; }
    private List&lt;IObservateur&gt; abonnes = new();
    private double valeur;

    public double Valeur
    {
        get =&gt; valeur;
        set { valeur = value; Notifier(); }
    }

    public Capteur(string nom) { Nom = nom; }

    public void Abonner(IObservateur obs) =&gt; abonnes.Add(obs);
    public void Desabonner(IObservateur obs) =&gt; abonnes.Remove(obs);

    private void Notifier()
    {
        foreach (var obs in abonnes)
            obs.MiseAJour(Nom, valeur);
    }
}

class AfficheurConsole : IObservateur
{
    public string Label { get; }
    public AfficheurConsole(string label) { Label = label; }

    public void MiseAJour(string source, double valeur)
    {
        Console.WriteLine($"  [{Label}] {source} = {valeur:F1}");
    }
}

class AfficheurAlerte : IObservateur
{
    public double Seuil { get; }
    public AfficheurAlerte(double seuil) { Seuil = seuil; }

    public void MiseAJour(string source, double valeur)
    {
        if (valeur &gt; Seuil)
            Console.WriteLine($"  ⚠️ ALERTE : {source} = {valeur:F1} dépasse le seuil de {Seuil} !");
    }
}

class Program
{
    static void Main()
    {
        var temp = new Capteur("Température");
        var ecran = new AfficheurConsole("Écran");
        var alerte = new AfficheurAlerte(30);

        temp.Abonner(ecran);
        temp.Abonner(alerte);

        temp.Valeur = 22.5;
        temp.Valeur = 28.0;
        temp.Valeur = 35.2; // déclenche l'alerte
    }
}`},

{id:70, cat:"poo-avance", catLabel:"POO Avancé", difficulty:3,
 title:"Système de fichiers en arbre",
 description:"Modélise un système de fichiers avec <code>Element</code> → <code>Fichier</code> et <code>Dossier</code> (pattern Composite). Un dossier contient des éléments.",
 hints:[
   "Classe abstraite <code>Element</code> avec <code>Nom</code> et <code>abstract long Taille</code>",
   "<code>Fichier</code> a une taille fixe, <code>Dossier</code> calcule la taille récursivement",
   "<code>Dossier.Afficher(int indent)</code> pour l'arborescence formatée"
 ],
 solution:`using System;
using System.Collections.Generic;
using System.Linq;

abstract class Element
{
    public string Nom { get; }
    protected Element(string nom) { Nom = nom; }
    public abstract long Taille { get; }
    public abstract void Afficher(int indent = 0);
}

class Fichier : Element
{
    public override long Taille { get; }
    public Fichier(string nom, long taille) : base(nom) { Taille = taille; }

    public override void Afficher(int indent = 0)
    {
        Console.WriteLine($"{new string(' ', indent)}📄 {Nom} ({FormatTaille(Taille)})");
    }

    public static string FormatTaille(long octets)
    {
        if (octets &lt; 1024) return $"{octets} B";
        if (octets &lt; 1024 * 1024) return $"{octets / 1024.0:F1} KB";
        return $"{octets / 1024.0 / 1024.0:F1} MB";
    }
}

class Dossier : Element
{
    private List&lt;Element&gt; contenu = new();
    public override long Taille =&gt; contenu.Sum(e =&gt; e.Taille);

    public Dossier(string nom) : base(nom) { }

    public void Ajouter(Element e) =&gt; contenu.Add(e);

    public override void Afficher(int indent = 0)
    {
        Console.WriteLine($"{new string(' ', indent)}📁 {Nom}/ ({Fichier.FormatTaille(Taille)})");
        foreach (var e in contenu)
            e.Afficher(indent + 3);
    }
}

class Program
{
    static void Main()
    {
        var racine = new Dossier("projet");

        var src = new Dossier("src");
        src.Ajouter(new Fichier("Program.cs", 2048));
        src.Ajouter(new Fichier("Utils.cs", 1536));

        var tests = new Dossier("tests");
        tests.Ajouter(new Fichier("TestUtils.cs", 1024));

        racine.Ajouter(src);
        racine.Ajouter(tests);
        racine.Ajouter(new Fichier("README.md", 512));
        racine.Ajouter(new Fichier(".gitignore", 128));

        racine.Afficher();
    }
}`}

]; // fin allExercises
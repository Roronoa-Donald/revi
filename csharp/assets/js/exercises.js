/* ═══════════════════════════════════════════════════════════════
   RD C# — exercises.js
   Moteur d'exercices interactifs + données des 12 modules
   5 guidés + 10 quiz + 3 drag&drop par chapitre = 216 exercices
   ═══════════════════════════════════════════════════════════════ */

const exerciseData = {

  /* ──────── MODULE 1 : Installation & Premiers Pas ──────── */
  chapitre1: {
    guided: [
      { q: "Quelle commande crée un nouveau projet console C# ?", hints: ["Commence par 'dotnet'", "Suivi de 'new'", "dotnet new console"], answer: "dotnet new console" },
      { q: "Quelle commande compile et exécute un projet C# ?", hints: ["Commence par 'dotnet'", "Un seul mot après dotnet", "dotnet run"], answer: "dotnet run" },
      { q: "Quelle méthode affiche du texte dans la console avec un retour à la ligne ?", hints: ["Classe Console", "Write + Line", "Console.WriteLine"], answer: "Console.WriteLine" },
      { q: "Quel fichier contient la configuration d'un projet C# ?", hints: ["Extension .csproj", "Fichier XML", "NomDuProjet.csproj"], answer: ".csproj" },
      { q: "Quelle commande vérifie la version du SDK .NET installé ?", hints: ["Commence par 'dotnet'", "Demande la version", "dotnet --version"], answer: "dotnet --version" }
    ],
    quiz: [
      { type: "mcq", q: "C# a été créé par :", options: ["Sun Microsystems", "Microsoft", "Google", "Apple"], correct: 1 },
      { type: "mcq", q: "L'extension d'un fichier C# est :", options: [".cpp", ".java", ".cs", ".csharp"], correct: 2 },
      { type: "qa", q: "Quel est le nom du runtime open-source de Microsoft pour C# ?", answer: [".NET", "dotnet", ".net"] },
      { type: "mcq", q: "Console.Write() vs Console.WriteLine() :", options: ["Aucune différence", "Write n'ajoute pas de retour à la ligne", "WriteLine est plus rapide", "Write est déprécié"], correct: 1 },
      { type: "mcq", q: "Quel IDE est le plus populaire pour C# ?", options: ["Eclipse", "IntelliJ", "Visual Studio", "Sublime Text"], correct: 2 },
      { type: "qa", q: "Quelle commande crée un projet console nommé 'MonApp' ?", answer: ["dotnet new console -n MonApp", "dotnet new console --name MonApp"] },
      { type: "mcq", q: "Un fichier .csproj est au format :", options: ["JSON", "YAML", "XML", "INI"], correct: 2 },
      { type: "mcq", q: "C# est un langage :", options: ["Interprété uniquement", "Compilé uniquement", "Compilé puis exécuté par un runtime (CLR)", "Ni l'un ni l'autre"], correct: 2 },
      { type: "qa", q: "Quelle méthode lit une ligne de texte depuis la console ?", answer: ["Console.ReadLine", "Console.ReadLine()"] },
      { type: "mcq", q: "Le point d'entrée d'un programme C# est :", options: ["La fonction init()", "La méthode Main()", "Le constructeur", "La classe Program"], correct: 1 }
    ],
    dragdrop: [
      { instruction: "Associe chaque commande dotnet à sa fonction :", pairs: [["dotnet new console", "Crée un projet console"], ["dotnet run", "Compile et exécute"], ["dotnet build", "Compile sans exécuter"], ["dotnet --version", "Affiche la version SDK"]] },
      { instruction: "Associe chaque élément à son rôle :", pairs: [["Program.cs", "Fichier source principal"], [".csproj", "Configuration du projet"], ["Console", "Classe d'entrée/sortie"], ["Main()", "Point d'entrée du programme"]] },
      { instruction: "Associe chaque outil à son usage :", pairs: [["Visual Studio", "IDE complet pour C#"], ["VS Code", "Éditeur léger + extensions"], [".NET SDK", "Kit de développement"], ["NuGet", "Gestionnaire de packages"]] }
    ]
  },

  /* ──────── MODULE 2 : Variables & Types ──────── */
  chapitre2: {
    guided: [
      { q: "Comment déclarer une variable entière 'age' valant 25 ?", hints: ["Type int", "Nom = valeur", "int age = 25;"], answer: "int age = 25;" },
      { q: "Quel type utilise-t-on pour stocker du texte ?", hints: ["Pas char (un seul caractère)", "Commence par 's'", "string"], answer: "string" },
      { q: "Comment convertir la chaîne \"42\" en entier ?", hints: ["Méthode de parsing", "int.Parse(...)", "int.Parse(\"42\")"], answer: "int.Parse(\"42\")" },
      { q: "Quel mot-clé permet au compilateur de déduire le type ?", hints: ["3 lettres", "Inférence de type", "var"], answer: "var" },
      { q: "Comment écrire une string interpolée affichant 'Bonjour Alice' ?", hints: ["Préfixe $ devant les guillemets", "Variable entre accolades", "$\"Bonjour {nom}\""], answer: "$\"Bonjour {nom}\"" }
    ],
    quiz: [
      { type: "mcq", q: "Quelle est la taille d'un int en C# ?", options: ["1 octet", "2 octets", "4 octets", "8 octets"], correct: 2 },
      { type: "mcq", q: "Le type bool peut contenir :", options: ["0 et 1", "true et false", "Oui et Non", "Tout ce qui précède"], correct: 1 },
      { type: "qa", q: "Quel type utiliser pour des montants financiers précis ?", answer: ["decimal"] },
      { type: "mcq", q: "Que se passe-t-il avec int x = 3.14 ?", options: ["x vaut 3", "x vaut 3.14", "Erreur de compilation", "x vaut 4"], correct: 2 },
      { type: "mcq", q: "Le casting explicite (int)3.9 donne :", options: ["4", "3", "3.9", "Erreur"], correct: 1 },
      { type: "qa", q: "Comment déclarer une constante PI valant 3.14159 ?", answer: ["const double PI = 3.14159;"] },
      { type: "mcq", q: "string est un type :", options: ["Valeur", "Référence", "Primitif uniquement", "Ni l'un ni l'autre"], correct: 1 },
      { type: "mcq", q: "Que fait int.TryParse(\"abc\", out int n) ?", options: ["Lance une exception", "Retourne false, n vaut 0", "Retourne true, n vaut abc", "Compile pas"], correct: 1 },
      { type: "qa", q: "Quel suffixe ajouter à un nombre pour le typer en float ?", answer: ["f", "F"] },
      { type: "mcq", q: "Quel opérateur concatène deux strings ?", options: ["&", "+", ".", "~"], correct: 1 }
    ],
    dragdrop: [
      { instruction: "Associe chaque type à sa taille :", pairs: [["byte", "1 octet"], ["short", "2 octets"], ["int", "4 octets"], ["long", "8 octets"], ["double", "8 octets"]] },
      { instruction: "Associe chaque valeur à son type :", pairs: [["42", "int"], ["3.14", "double"], ["\"Bonjour\"", "string"], ["true", "bool"], ["'A'", "char"]] },
      { instruction: "Associe chaque méthode de conversion à son usage :", pairs: [["int.Parse()", "String → int (lance exception)"], ["int.TryParse()", "String → int (retourne bool)"], ["Convert.ToDouble()", "Conversion générique"], ["(int)variable", "Cast explicite"]] }
    ]
  },

  /* ──────── MODULE 3 : Conditions (IF/ELSE) ──────── */
  chapitre3: {
    guided: [
      { q: "Écris une condition qui vérifie si age >= 18 :", hints: ["Commence par if", "Parenthèses obligatoires", "if (age >= 18)"], answer: "if (age >= 18)" },
      { q: "Quel opérateur signifie 'ET logique' en C# ?", hints: ["Deux caractères identiques", "Pas le mot AND", "&&"], answer: "&&" },
      { q: "Quel opérateur signifie 'OU logique' en C# ?", hints: ["Deux barres verticales", "Pipe pipe", "||"], answer: "||" },
      { q: "Écris le ternaire : si x > 0 alors \"positif\" sinon \"négatif\" :", hints: ["condition ? vrai : faux", "x > 0 ? ...", "x > 0 ? \"positif\" : \"négatif\""], answer: "x > 0 ? \"positif\" : \"négatif\"" },
      { q: "Quel opérateur signifie 'différent de' ?", hints: ["Point d'exclamation + égal", "Négation d'égalité", "!="], answer: "!=" }
    ],
    quiz: [
      { type: "mcq", q: "En C#, = et == sont :", options: ["Identiques", "= assigne, == compare", "== assigne, = compare", "Les deux comparent"], correct: 1 },
      { type: "mcq", q: "Que retourne !true ?", options: ["true", "false", "1", "Erreur"], correct: 1 },
      { type: "qa", q: "Quel mot-clé introduit une condition alternative ?", answer: ["else if", "else"] },
      { type: "mcq", q: "if (true && false) vaut :", options: ["true", "false", "Erreur", "null"], correct: 1 },
      { type: "mcq", q: "if (false || true) vaut :", options: ["true", "false", "Erreur", "null"], correct: 0 },
      { type: "qa", q: "Quel est l'opérateur ternaire en C# ?", answer: ["? :", "condition ? vrai : faux", "?:"] },
      { type: "mcq", q: "Combien de else peut-on avoir dans un if ?", options: ["Autant qu'on veut", "Un seul", "Deux maximum", "Zéro"], correct: 1 },
      { type: "mcq", q: "Le short-circuit evaluation signifie :", options: ["Le code compile plus vite", "Le 2e opérande n'est pas évalué si inutile", "Les conditions sont inversées", "Rien de spécial"], correct: 1 },
      { type: "qa", q: "Quel opérateur vérifie l'égalité de deux valeurs ?", answer: ["=="] },
      { type: "mcq", q: "Peut-on imbriquer des if dans des if ?", options: ["Non", "Oui", "Seulement avec else", "Maximum 3 niveaux"], correct: 1 }
    ],
    dragdrop: [
      { instruction: "Associe chaque opérateur à sa signification :", pairs: [["==", "Égal à"], ["!=", "Différent de"], [">", "Supérieur à"], ["<=", "Inférieur ou égal"], ["&&", "ET logique"], ["||", "OU logique"]] },
      { instruction: "Ordonne la structure if/else :", pairs: [["1", "if (condition1)"], ["2", "{ // bloc si vrai }"], ["3", "else if (condition2)"], ["4", "{ // bloc alternatif }"], ["5", "else"], ["6", "{ // bloc par défaut }"]] },
      { instruction: "Associe chaque expression à son résultat :", pairs: [["true && true", "true"], ["true && false", "false"], ["false || true", "true"], ["!false", "true"]] }
    ]
  },

  /* ──────── MODULE 4 : Boucles ──────── */
  chapitre4: {
    guided: [
      { q: "Écris une boucle for de 0 à 4 :", hints: ["for (init; condition; incrément)", "i commence à 0, finit avant 5", "for (int i = 0; i < 5; i++)"], answer: "for (int i = 0; i < 5; i++)" },
      { q: "Quelle boucle utiliser quand on ne connaît pas le nombre d'itérations ?", hints: ["Pas for", "Tourne tant que...", "while"], answer: "while" },
      { q: "Quelle boucle parcourt chaque élément d'une collection ?", hints: ["Pour chaque...", "7 lettres", "foreach"], answer: "foreach" },
      { q: "Quel mot-clé arrête immédiatement une boucle ?", hints: ["Casser", "5 lettres", "break"], answer: "break" },
      { q: "Quel mot-clé saute à l'itération suivante ?", hints: ["Continuer", "8 lettres", "continue"], answer: "continue" }
    ],
    quiz: [
      { type: "mcq", q: "Combien de fois s'exécute for (int i=0; i<3; i++) ?", options: ["2 fois", "3 fois", "4 fois", "Infini"], correct: 1 },
      { type: "mcq", q: "La différence entre while et do-while :", options: ["Aucune", "do-while s'exécute au moins une fois", "while est plus rapide", "do-while n'existe pas en C#"], correct: 1 },
      { type: "qa", q: "Quel opérateur incrémente i de 1 ?", answer: ["i++", "++i"] },
      { type: "mcq", q: "foreach (var x in liste) — x est :", options: ["L'index", "La valeur de chaque élément", "La taille de la liste", "Le type"], correct: 1 },
      { type: "mcq", q: "Que se passe-t-il avec while (true) sans break ?", options: ["Erreur de compilation", "Boucle infinie", "S'exécute une fois", "Ne compile pas"], correct: 1 },
      { type: "qa", q: "Quelle boucle garantit au moins une exécution ?", answer: ["do-while", "do while"] },
      { type: "mcq", q: "Dans for (int i=0; i<10; i+=2), i prend les valeurs :", options: ["0,1,2,...,9", "0,2,4,6,8", "2,4,6,8,10", "1,3,5,7,9"], correct: 1 },
      { type: "mcq", q: "break dans une boucle imbriquée sort de :", options: ["Toutes les boucles", "La boucle la plus interne", "La boucle la plus externe", "Le programme entier"], correct: 1 },
      { type: "qa", q: "Comment écrire une boucle descendante de 10 à 1 ?", answer: ["for (int i = 10; i >= 1; i--)", "for (int i=10; i>=1; i--)"] },
      { type: "mcq", q: "Peut-on modifier la variable de boucle dans un foreach ?", options: ["Oui", "Non", "Seulement avec var", "Seulement pour les listes"], correct: 1 }
    ],
    dragdrop: [
      { instruction: "Associe chaque boucle à son usage idéal :", pairs: [["for", "Nombre d'itérations connu"], ["while", "Condition de continuation"], ["do-while", "Au moins une exécution"], ["foreach", "Parcourir une collection"]] },
      { instruction: "Ordonne les étapes d'une boucle for :", pairs: [["1", "Initialisation (int i = 0)"], ["2", "Test condition (i < 5)"], ["3", "Exécution du corps"], ["4", "Incrémentation (i++)"], ["5", "Retour au test"]] },
      { instruction: "Associe chaque mot-clé à son effet dans une boucle :", pairs: [["break", "Sort immédiatement de la boucle"], ["continue", "Saute à l'itération suivante"], ["return", "Sort de la méthode entière"]] }
    ]
  },

  /* ──────── MODULE 5 : Tableaux & Listes ──────── */
  chapitre5: {
    guided: [
      { q: "Comment déclarer un tableau de 5 entiers ?", hints: ["int[] suivi de new", "Taille entre crochets", "int[] tab = new int[5];"], answer: "int[] tab = new int[5];" },
      { q: "Comment accéder au 3e élément d'un tableau ?", hints: ["L'index commence à 0", "Le 3e élément est à l'index 2", "tab[2]"], answer: "tab[2]" },
      { q: "Comment créer une List<string> vide ?", hints: ["new List<T>()", "T = string", "new List<string>()"], answer: "new List<string>()" },
      { q: "Quelle méthode ajoute un élément à une List ?", hints: ["Ajouter en anglais", "3 lettres", "Add"], answer: "Add" },
      { q: "Quelle propriété donne le nombre d'éléments d'une List ?", hints: ["Comme compter", "5 lettres", "Count"], answer: "Count" }
    ],
    quiz: [
      { type: "mcq", q: "Un tableau C# a une taille :", options: ["Variable", "Fixe après création", "Illimitée", "Dépend du type"], correct: 1 },
      { type: "mcq", q: "L'index du premier élément est :", options: ["1", "0", "-1", "Dépend du tableau"], correct: 1 },
      { type: "qa", q: "Comment obtenir la longueur d'un tableau ?", answer: ["Length", ".Length", "tab.Length"] },
      { type: "mcq", q: "List<int> vs int[] : la List :", options: ["Est plus rapide", "A une taille dynamique", "Ne peut contenir que des entiers", "N'existe pas en C#"], correct: 1 },
      { type: "mcq", q: "tab[tab.Length] provoque :", options: ["Retourne le dernier élément", "IndexOutOfRangeException", "Retourne null", "Retourne 0"], correct: 1 },
      { type: "qa", q: "Quel using faut-il pour utiliser List<T> ?", answer: ["using System.Collections.Generic;", "System.Collections.Generic"] },
      { type: "mcq", q: "Quelle méthode LINQ filtre une collection ?", options: ["Select", "Where", "OrderBy", "Count"], correct: 1 },
      { type: "mcq", q: "list.Remove(\"abc\") supprime :", options: ["Tous les \"abc\"", "La première occurrence de \"abc\"", "Le dernier \"abc\"", "Rien si absent"], correct: 1 },
      { type: "qa", q: "Quelle méthode vérifie si un élément existe dans une List ?", answer: ["Contains", ".Contains", "list.Contains"] },
      { type: "mcq", q: "int[] nums = {1,2,3} crée un tableau de taille :", options: ["0", "3", "4", "Indéfinie"], correct: 1 }
    ],
    dragdrop: [
      { instruction: "Associe chaque opération à son code :", pairs: [["Créer un tableau", "int[] t = new int[5];"], ["Accéder à l'index 0", "t[0]"], ["Longueur du tableau", "t.Length"], ["Parcourir", "foreach (var x in t)"]] },
      { instruction: "Associe chaque méthode List<T> à son rôle :", pairs: [["Add()", "Ajoute un élément"], ["Remove()", "Supprime un élément"], ["Contains()", "Vérifie la présence"], ["Count", "Nombre d'éléments"], ["Clear()", "Vide la liste"]] },
      { instruction: "Associe chaque méthode LINQ à sa fonction :", pairs: [["Where()", "Filtrer"], ["Select()", "Transformer"], ["OrderBy()", "Trier"], ["First()", "Premier élément"]] }
    ]
  },

  /* ──────── MODULE 6 : Méthodes & Fonctions ──────── */
  chapitre6: {
    guided: [
      { q: "Déclare une méthode void nommée Saluer :", hints: ["static void + nom", "Pas de retour", "static void Saluer()"], answer: "static void Saluer()" },
      { q: "Quel mot-clé renvoie une valeur depuis une méthode ?", hints: ["6 lettres", "Retourner en anglais", "return"], answer: "return" },
      { q: "Comment appeler une méthode nommée Calculer ?", hints: ["Nom + parenthèses", "Comme une fonction", "Calculer()"], answer: "Calculer()" },
      { q: "Comment donner une valeur par défaut au paramètre 'nom' ?", hints: ["= après le paramètre", "string nom = \"...\"", "string nom = \"Inconnu\""], answer: "string nom = \"Inconnu\"" },
      { q: "Comment déclarer une méthode qui retourne un int ?", hints: ["Type de retour avant le nom", "static int + nom", "static int MaMethode()"], answer: "static int MaMethode()" }
    ],
    quiz: [
      { type: "mcq", q: "Une méthode void :", options: ["Retourne 0", "Ne retourne rien", "Retourne null", "N'existe pas"], correct: 1 },
      { type: "mcq", q: "La surcharge (overloading) permet :", options: ["Des types de retour différents", "Des méthodes de même nom avec des paramètres différents", "D'appeler Main deux fois", "De rendre une méthode plus rapide"], correct: 1 },
      { type: "qa", q: "Quelle convention de nommage pour les méthodes en C# ?", answer: ["PascalCase"] },
      { type: "mcq", q: "static signifie que la méthode :", options: ["Est privée", "Appartient à la classe, pas à une instance", "Ne peut pas retourner", "Est constante"], correct: 1 },
      { type: "mcq", q: "void Dire(string msg = \"Salut\") — l'appel Dire() affiche :", options: ["Rien", "Salut", "Erreur de compilation", "null"], correct: 1 },
      { type: "qa", q: "Combien de valeurs peut retourner un return ?", answer: ["1", "une", "une seule"] },
      { type: "mcq", q: "Les paramètres avec valeur par défaut doivent être :", options: ["En premier", "En dernier", "N'importe où", "Avant les int"], correct: 1 },
      { type: "mcq", q: "int F(int x) et int F(double x) sont :", options: ["La même méthode", "Deux surcharges", "Une erreur", "Un bug"], correct: 1 },
      { type: "qa", q: "Quel mot-clé rend une méthode accessible partout ?", answer: ["public"] },
      { type: "mcq", q: "Une méthode peut-elle appeler d'autres méthodes ?", options: ["Non", "Oui", "Seulement Main", "Seulement static"], correct: 1 }
    ],
    dragdrop: [
      { instruction: "Associe chaque partie d'une méthode à son rôle :", pairs: [["static", "Appartient à la classe"], ["int", "Type de retour"], ["Calculer", "Nom de la méthode"], ["(int a, int b)", "Paramètres"], ["return a + b;", "Valeur retournée"]] },
      { instruction: "Associe les concepts :", pairs: [["void", "Pas de valeur retournée"], ["return", "Renvoie une valeur"], ["surcharge", "Même nom, paramètres différents"], ["paramètre par défaut", "Valeur si non fournie"]] },
      { instruction: "Associe chaque appel au bon résultat (int Max(int a, int b)) :", pairs: [["Max(3, 7)", "7"], ["Max(10, 2)", "10"], ["Max(-1, -5)", "-1"], ["Max(0, 0)", "0"]] }
    ]
  },

  /* ──────── MODULE 7 : Manipulation de Strings ──────── */
  chapitre7: {
    guided: [
      { q: "Quel propriété donne la longueur d'une string ?", hints: ["Comme pour les tableaux mais pas tout à fait", "6 lettres", "Length"], answer: "Length" },
      { q: "Quelle méthode met une string en majuscules ?", hints: ["Upper en anglais", "ToUpper()", "ToUpper"], answer: "ToUpper()" },
      { q: "Comment découper \"a,b,c\" par la virgule ?", hints: ["Split + le séparateur", "Retourne un tableau", "Split(',')"], answer: "Split(',')" },
      { q: "Comment vérifier si \"Bonjour\" contient \"jour\" ?", hints: ["Contains en anglais", "Retourne un bool", "Contains(\"jour\")"], answer: "Contains(\"jour\")" },
      { q: "Quelle classe utiliser pour des concaténations en boucle ?", hints: ["Pas string +", "Builder", "StringBuilder"], answer: "StringBuilder" }
    ],
    quiz: [
      { type: "mcq", q: "Les strings en C# sont :", options: ["Mutables", "Immuables", "Toujours en majuscules", "Des tableaux de char"], correct: 1 },
      { type: "qa", q: "Quel préfixe pour une string interpolée ?", answer: ["$"] },
      { type: "mcq", q: "\"hello\".Substring(1, 3) retourne :", options: ["\"hel\"", "\"ell\"", "\"ello\"", "\"lo\""], correct: 1 },
      { type: "mcq", q: "\"abc\".Replace(\"b\", \"X\") retourne :", options: ["\"abc\"", "\"aXc\"", "\"Xbc\"", "\"abX\""], correct: 1 },
      { type: "qa", q: "Quel préfixe désactive les séquences d'échappement ?", answer: ["@"] },
      { type: "mcq", q: "string.Join(\"-\", new[]{\"a\",\"b\",\"c\"}) donne :", options: ["\"abc\"", "\"a-b-c\"", "\"-a-b-c-\"", "Erreur"], correct: 1 },
      { type: "mcq", q: "\"  hello  \".Trim() retourne :", options: ["\"  hello  \"", "\"hello  \"", "\"  hello\"", "\"hello\""], correct: 3 },
      { type: "qa", q: "Quel est le caractère d'échappement pour un retour à la ligne ?", answer: ["\\n"] },
      { type: "mcq", q: "StringBuilder est dans quel namespace ?", options: ["System", "System.Text", "System.Linq", "System.IO"], correct: 1 },
      { type: "mcq", q: "\"Hello\" == \"hello\" en C# retourne :", options: ["true", "false", "Erreur", "Dépend de la culture"], correct: 1 }
    ],
    dragdrop: [
      { instruction: "Associe chaque méthode string à son rôle :", pairs: [["ToUpper()", "Met en majuscules"], ["ToLower()", "Met en minuscules"], ["Trim()", "Supprime les espaces"], ["Replace()", "Remplace du texte"], ["Contains()", "Vérifie la présence"]] },
      { instruction: "Associe chaque méthode à son type de retour :", pairs: [["Length", "int"], ["Contains()", "bool"], ["Substring()", "string"], ["Split()", "string[]"], ["IndexOf()", "int"]] },
      { instruction: "Associe chaque syntaxe string à son nom :", pairs: [["$\"...{x}...\"", "String interpolée"], ["@\"C:\\Users\\\"", "Verbatim string"], ["\"Hello\" + \" World\"", "Concaténation"], ["new StringBuilder()", "StringBuilder"]] }
    ]
  },

  /* ──────── MODULE 8 : Dictionnaires ──────── */
  chapitre8: {
    guided: [
      { q: "Comment créer un Dictionary<string, int> ?", hints: ["new + le type", "Clé string, valeur int", "new Dictionary<string, int>()"], answer: "new Dictionary<string, int>()" },
      { q: "Comment ajouter la clé \"age\" avec la valeur 25 ?", hints: ["Méthode Add", "2 paramètres", "dict.Add(\"age\", 25)"], answer: "dict.Add(\"age\", 25)" },
      { q: "Quelle méthode vérifier si une clé existe ?", hints: ["Contains + Key", "Retourne bool", "ContainsKey"], answer: "ContainsKey" },
      { q: "Comment accéder à la valeur de la clé \"nom\" ?", hints: ["Crochets + la clé", "Comme un tableau", "dict[\"nom\"]"], answer: "dict[\"nom\"]" },
      { q: "Quelle méthode sécurise l'accès à une clé ?", hints: ["Try + Get + Value", "Retourne bool + out", "TryGetValue"], answer: "TryGetValue" }
    ],
    quiz: [
      { type: "mcq", q: "Un Dictionary a :", options: ["Des index numériques", "Des paires clé-valeur", "Seulement des strings", "Des doublons de clés"], correct: 1 },
      { type: "mcq", q: "Accéder à une clé inexistante provoque :", options: ["Retourne null", "KeyNotFoundException", "Retourne 0", "Rien"], correct: 1 },
      { type: "qa", q: "Quelle propriété donne le nombre de paires ?", answer: ["Count", ".Count"] },
      { type: "mcq", q: "Les clés d'un Dictionary doivent être :", options: ["Des strings", "Uniques", "Des entiers", "Triées"], correct: 1 },
      { type: "mcq", q: "TryGetValue retourne :", options: ["La valeur ou null", "Un bool (true si trouvé)", "Un KeyValuePair", "Une exception"], correct: 1 },
      { type: "qa", q: "Comment supprimer une clé du dictionnaire ?", answer: ["Remove", "dict.Remove()", ".Remove()"] },
      { type: "mcq", q: "foreach sur un Dictionary itère sur des :", options: ["Clés", "Valeurs", "KeyValuePair<K,V>", "Index"], correct: 2 },
      { type: "mcq", q: "dict[\"clé\"] = 42; si la clé existe :", options: ["Erreur", "Ajoute un doublon", "Met à jour la valeur", "Ne fait rien"], correct: 2 },
      { type: "qa", q: "Comment accéder uniquement aux clés ?", answer: ["Keys", "dict.Keys", ".Keys"] },
      { type: "mcq", q: "Dictionary est dans :", options: ["System", "System.Text", "System.Collections.Generic", "System.Linq"], correct: 2 }
    ],
    dragdrop: [
      { instruction: "Associe chaque méthode Dictionary à son rôle :", pairs: [["Add()", "Ajoute une paire"], ["Remove()", "Supprime une paire"], ["ContainsKey()", "Vérifie si la clé existe"], ["TryGetValue()", "Accès sécurisé"], ["Clear()", "Vide le dictionnaire"]] },
      { instruction: "Associe chaque propriété à ce qu'elle retourne :", pairs: [["Count", "Nombre de paires"], ["Keys", "Collection des clés"], ["Values", "Collection des valeurs"]] },
      { instruction: "Associe l'accès à son résultat (dict = {\"a\":1, \"b\":2}) :", pairs: [["dict[\"a\"]", "1"], ["dict.ContainsKey(\"c\")", "false"], ["dict.Count", "2"], ["dict.Keys", "{\"a\", \"b\"}"]] }
    ]
  },

  /* ──────── MODULE 9 : Entrées & Affichage ──────── */
  chapitre9: {
    guided: [
      { q: "Quelle méthode lit une ligne depuis la console ?", hints: ["Console + Read + Line", "Retourne une string", "Console.ReadLine()"], answer: "Console.ReadLine()" },
      { q: "Comment afficher sans retour à la ligne ?", hints: ["Pas WriteLine", "Juste Write", "Console.Write()"], answer: "Console.Write()" },
      { q: "Comment convertir \"3.14\" en double ?", hints: ["double + Parse", "double.Parse(...)", "double.Parse(\"3.14\")"], answer: "double.Parse(\"3.14\")" },
      { q: "Quel caractère d'échappement crée une tabulation ?", hints: ["Backslash + lettre", "t comme tab", "\\t"], answer: "\\t" },
      { q: "Comment changer la couleur du texte en rouge ?", hints: ["Console.ForegroundColor", "= ConsoleColor.Red", "Console.ForegroundColor = ConsoleColor.Red;"], answer: "Console.ForegroundColor = ConsoleColor.Red;" }
    ],
    quiz: [
      { type: "mcq", q: "Console.ReadLine() retourne toujours :", options: ["Un int", "Un string", "Un char", "Un object"], correct: 1 },
      { type: "mcq", q: "int.Parse(\"abc\") provoque :", options: ["Retourne 0", "FormatException", "Retourne -1", "Retourne null"], correct: 1 },
      { type: "qa", q: "Quelle méthode efface l'écran de la console ?", answer: ["Console.Clear()", "Console.Clear"] },
      { type: "mcq", q: "\\n dans une string représente :", options: ["La lettre n", "Un retour à la ligne", "Un espace", "Un backslash"], correct: 1 },
      { type: "mcq", q: "int.TryParse est préférable à int.Parse car :", options: ["Il est plus rapide", "Il ne lance pas d'exception", "Il accepte plus de formats", "Il n'existe pas"], correct: 1 },
      { type: "qa", q: "Comment réinitialiser la couleur de la console ?", answer: ["Console.ResetColor()", "Console.ResetColor"] },
      { type: "mcq", q: "$\"Prix : {prix:C2}\" formate en :", options: ["Binaire", "Monnaie avec 2 décimales", "Centimètres", "Caractères"], correct: 1 },
      { type: "mcq", q: "Console.ReadKey() retourne :", options: ["Un string", "Un char", "Un ConsoleKeyInfo", "Un int"], correct: 2 },
      { type: "qa", q: "Quel caractère d'échappement pour un backslash littéral ?", answer: ["\\\\"] },
      { type: "mcq", q: "Console.Beep() fait :", options: ["Rien", "Un son système", "Affiche 'Beep'", "N'existe pas"], correct: 1 }
    ],
    dragdrop: [
      { instruction: "Associe chaque méthode Console à son rôle :", pairs: [["Write()", "Affiche sans retour à la ligne"], ["WriteLine()", "Affiche avec retour à la ligne"], ["ReadLine()", "Lit une ligne de texte"], ["ReadKey()", "Lit une seule touche"], ["Clear()", "Efface l'écran"]] },
      { instruction: "Associe chaque séquence d'échappement :", pairs: [["\\n", "Retour à la ligne"], ["\\t", "Tabulation"], ["\\\\", "Backslash littéral"], ["\\\"", "Guillemet dans une string"]] },
      { instruction: "Associe chaque format à son affichage ({x:FORMAT}) :", pairs: [["C2", "Monnaie (2 décimales)"], ["N0", "Nombre sans décimale"], ["P1", "Pourcentage (1 décimale)"], ["D", "Date courte"]] }
    ]
  },

  /* ──────── MODULE 10 : Switch & Enums ──────── */
  chapitre10: {
    guided: [
      { q: "Écris le début d'un switch sur la variable 'jour' :", hints: ["switch + parenthèses", "switch (variable)", "switch (jour)"], answer: "switch (jour)" },
      { q: "Comment déclarer un enum Couleur avec Rouge, Vert, Bleu ?", hints: ["enum + nom + accolades", "Valeurs séparées par des virgules", "enum Couleur { Rouge, Vert, Bleu }"], answer: "enum Couleur { Rouge, Vert, Bleu }" },
      { q: "Quel mot-clé termine un case dans un switch classique ?", hints: ["5 lettres + point-virgule", "Casser", "break;"], answer: "break;" },
      { q: "Quelle syntaxe C# 8 utilise-t-on dans un switch expression ?", hints: ["Flèche", "Comme lambda", "=>"], answer: "=>" },
      { q: "Comment convertir la string \"Rouge\" en Couleur ?", hints: ["Enum + Parse ou TryParse", "Cast nécessaire", "Enum.Parse<Couleur>(\"Rouge\")"], answer: "Enum.Parse<Couleur>(\"Rouge\")" }
    ],
    quiz: [
      { type: "mcq", q: "Sans break dans un case, C# :", options: ["Continue au case suivant (fall-through)", "Erreur de compilation", "Sort du switch", "Relance le programme"], correct: 1 },
      { type: "mcq", q: "Le case 'default' dans un switch est :", options: ["Obligatoire", "Optionnel mais recommandé", "Le premier case", "Interdit"], correct: 1 },
      { type: "qa", q: "Quelle est la valeur par défaut du premier élément d'un enum ?", answer: ["0"] },
      { type: "mcq", q: "Un switch expression (C# 8) retourne :", options: ["Rien (void)", "Une valeur", "Un bool uniquement", "Un enum uniquement"], correct: 1 },
      { type: "mcq", q: "Un enum est stocké en interne comme :", options: ["string", "int", "bool", "object"], correct: 1 },
      { type: "qa", q: "Comment nommer un enum avec des flags combinables ?", answer: ["[Flags]", "Flags"] },
      { type: "mcq", q: "switch (x) { case 1: case 2: ... } gère :", options: ["x == 1 uniquement", "x == 1 OU x == 2", "x entre 1 et 2", "Erreur"], correct: 1 },
      { type: "mcq", q: "Le pattern matching with switch permet :", options: ["Vérifier le type d'un objet", "Seulement comparer des entiers", "Créer des boucles", "Rien de spécial"], correct: 0 },
      { type: "qa", q: "Le caractère _ dans un switch expression signifie :", answer: ["default", "discard", "cas par défaut"] },
      { type: "mcq", q: "enum Jour { Lundi=1, Mardi, Mercredi } → Mercredi vaut :", options: ["0", "2", "3", "Mercredi"], correct: 2 }
    ],
    dragdrop: [
      { instruction: "Associe switch classique vs switch expression :", pairs: [["switch (x) { case 1: ... break; }", "Switch statement (classique)"], ["x switch { 1 => ..., _ => ... }", "Switch expression (C# 8+)"], ["break;", "Requis dans le classique"], ["=>", "Flèche dans l'expression"], ["_", "Case par défaut (expression)"]] },
      { instruction: "Associe chaque concept enum :", pairs: [["enum", "Déclare un type énuméré"], ["(int)MonEnum.Valeur", "Cast vers entier"], ["Enum.Parse<T>()", "String vers enum"], ["[Flags]", "Combinaisons binaires"]] },
      { instruction: "Associe chaque valeur enum à son int (enum Note { Do=1, Re, Mi, Fa }) :", pairs: [["Do", "1"], ["Re", "2"], ["Mi", "3"], ["Fa", "4"]] }
    ]
  },

  /* ──────── MODULE 11 : Gestion d'Erreurs (Try/Catch) ──────── */
  chapitre11: {
    guided: [
      { q: "Écris le début d'un bloc try :", hints: ["Mot-clé try + accolade", "try {", "try"], answer: "try" },
      { q: "Comment attraper une FormatException ?", hints: ["catch + type entre parenthèses", "catch (FormatException ...)", "catch (FormatException ex)"], answer: "catch (FormatException ex)" },
      { q: "Quel bloc s'exécute toujours, exception ou non ?", hints: ["7 lettres", "Finalement", "finally"], answer: "finally" },
      { q: "Comment lancer une exception manuellement ?", hints: ["throw + new + type", "throw new Exception(...)", "throw new Exception(\"message\")"], answer: "throw new Exception(\"message\")" },
      { q: "Quel mot-clé gère automatiquement Dispose() ?", hints: ["5 lettres", "using", "Comme l'import mais dans une méthode"], answer: "using" }
    ],
    quiz: [
      { type: "mcq", q: "Une exception non attrapée provoque :", options: ["Rien", "Un crash du programme", "Un avertissement", "Un retry automatique"], correct: 1 },
      { type: "mcq", q: "catch (Exception ex) attrape :", options: ["Seulement FormatException", "Toutes les exceptions", "Aucune exception", "Seulement les erreurs système"], correct: 1 },
      { type: "qa", q: "Quelle propriété d'une exception contient le message d'erreur ?", answer: ["Message", ".Message", "ex.Message"] },
      { type: "mcq", q: "throw; vs throw ex; :", options: ["Aucune différence", "throw; conserve le StackTrace", "throw ex; est plus rapide", "throw; relance une nouvelle exception"], correct: 1 },
      { type: "mcq", q: "Un catch vide (catch { }) est :", options: ["Recommandé", "Une mauvaise pratique", "Obligatoire", "Impossible en C#"], correct: 1 },
      { type: "qa", q: "Quelle exception est lancée par division par zéro (int) ?", answer: ["DivideByZeroException"] },
      { type: "mcq", q: "using var f = new StreamReader(...); appelle automatiquement :", options: ["Close()", "Dispose()", "Delete()", "Flush()"], correct: 1 },
      { type: "mcq", q: "Peut-on avoir try sans catch ?", options: ["Non", "Oui, avec finally", "Jamais", "Seulement en C# 10"], correct: 1 },
      { type: "qa", q: "Quelle exception est la plus fréquente en C# ?", answer: ["NullReferenceException"] },
      { type: "mcq", q: "Pour créer une exception personnalisée, on hérite de :", options: ["Object", "Exception", "Error", "Throwable"], correct: 1 }
    ],
    dragdrop: [
      { instruction: "Ordonne les blocs try/catch/finally :", pairs: [["1", "try { // code risqué }"], ["2", "catch (SpecificException ex) { }"], ["3", "catch (Exception ex) { }"], ["4", "finally { // toujours exécuté }"]] },
      { instruction: "Associe chaque exception à sa cause :", pairs: [["FormatException", "Conversion invalide"], ["DivideByZeroException", "Division par zéro"], ["NullReferenceException", "Objet null utilisé"], ["IndexOutOfRangeException", "Index hors limites"], ["FileNotFoundException", "Fichier introuvable"]] },
      { instruction: "Associe chaque concept de gestion d'erreurs :", pairs: [["try", "Bloc de code risqué"], ["catch", "Attrape l'exception"], ["finally", "Exécuté dans tous les cas"], ["throw", "Lance une exception"], ["using", "Dispose automatique"]] }
    ]
  },

  /* ──────── MODULE 12 : Introduction à la POO ──────── */
  chapitre12: {
    guided: [
      { q: "Comment instancier un objet de la classe Voiture ?", hints: ["new + constructeur", "new Voiture()", "Voiture v = new Voiture();"], answer: "new Voiture()" },
      { q: "Quel mot-clé rend un champ invisible de l'extérieur ?", hints: ["Privé", "7 lettres", "private"], answer: "private" },
      { q: "Comment déclarer une auto-propriété Nom en lecture/écriture ?", hints: ["public string Nom + get/set", "Accolades avec get; set;", "public string Nom { get; set; }"], answer: "public string Nom { get; set; }" },
      { q: "Comment faire hériter Chien de Animal ?", hints: ["Deux-points entre les noms", "class Chien : Animal", "class Chien : Animal"], answer: "class Chien : Animal" },
      { q: "Quel mot-clé appelle le constructeur de la classe parent ?", hints: ["4 lettres", "La base", "base"], answer: "base" }
    ],
    quiz: [
      { type: "mcq", q: "Une classe est :", options: ["Un objet", "Un plan pour créer des objets", "Une variable", "Une méthode"], correct: 1 },
      { type: "mcq", q: "Le mot-clé new sert à :", options: ["Déclarer une variable", "Créer une instance (objet)", "Supprimer un objet", "Importer un namespace"], correct: 1 },
      { type: "qa", q: "Quelle est la convention de nommage des classes en C# ?", answer: ["PascalCase"] },
      { type: "mcq", q: "Un constructeur a-t-il un type de retour ?", options: ["Oui, void", "Oui, le type de la classe", "Non", "Oui, object"], correct: 2 },
      { type: "mcq", q: "L'encapsulation consiste à :", options: ["Mettre tout en public", "Protéger les données avec private/public", "Créer des sous-classes", "Utiliser des interfaces"], correct: 1 },
      { type: "qa", q: "Comment accéder à un membre de l'objet courant dans sa classe ?", answer: ["this", "this."] },
      { type: "mcq", q: "class Chien : Animal signifie :", options: ["Chien contient Animal", "Chien hérite de Animal", "Chien est identique à Animal", "Erreur de syntaxe"], correct: 1 },
      { type: "mcq", q: "Le polymorphisme permet :", options: ["D'avoir plusieurs Main()", "Qu'un même appel se comporte différemment selon le type", "De créer des variables", "De compiler plus vite"], correct: 1 },
      { type: "qa", q: "Quel mot-clé précède une propriété en lecture seule (sans set) ?", answer: ["get", "{ get; }"] },
      { type: "mcq", q: "List<Personnage> peut contenir des Guerrier (héritant de Personnage) ?", options: ["Non", "Oui, c'est le polymorphisme", "Seulement avec un cast", "Seulement en C# 11"], correct: 1 }
    ],
    dragdrop: [
      { instruction: "Associe chaque pilier de la POO à sa définition :", pairs: [["Encapsulation", "Protège les données internes"], ["Héritage", "Réutilise le code d'une classe parent"], ["Polymorphisme", "Un même appel, comportements différents"], ["Abstraction", "Simplifie en cachant la complexité"]] },
      { instruction: "Associe chaque mot-clé d'accès :", pairs: [["public", "Accessible partout"], ["private", "Accessible dans la classe uniquement"], ["protected", "Accessible dans la classe et ses enfants"], ["internal", "Accessible dans le même projet"]] },
      { instruction: "Associe chaque élément de classe à son rôle :", pairs: [["Champ (field)", "Variable stockant des données"], ["Propriété", "Accès contrôlé (get/set)"], ["Constructeur", "Initialise l'objet à la création"], ["Méthode", "Action que l'objet peut effectuer"], ["this", "Référence à l'objet courant"]] }
    ]
  }
};


/* ═══════════════════════════════════════════════════════════════
   ExerciseEngine — Moteur d'affichage et d'interaction
   ═══════════════════════════════════════════════════════════════ */

const ExerciseEngine = {
  currentChapter: null,
  data: null,

  init() {
    const container = document.getElementById('interactive-exercise');
    if (!container) return;
    const path = window.location.pathname;
    const match = path.match(/chapitre(\d+)/);
    if (!match) return;
    this.currentChapter = 'chapitre' + match[1];
    this.data = exerciseData[this.currentChapter];
    if (!this.data) return;
    this.render(container);
  },

  render(container) {
    container.innerHTML = `
      <h2><i class="fas fa-dumbbell" style="color:var(--accent);margin-right:0.5rem;"></i>Exercices Interactifs</h2>
      <div class="exercise-tabs">
        <button class="ex-tab active" data-tab="guided"><i class="fas fa-hands-helping"></i> Guidés (${this.data.guided.length})</button>
        <button class="ex-tab" data-tab="quiz"><i class="fas fa-question-circle"></i> Quiz (${this.data.quiz.length})</button>
        <button class="ex-tab" data-tab="dragdrop"><i class="fas fa-arrows-alt"></i> Drag & Drop (${this.data.dragdrop.length})</button>
      </div>
      <div id="ex-guided" class="ex-panel active">${this.renderGuided()}</div>
      <div id="ex-quiz" class="ex-panel">${this.renderQuiz()}</div>
      <div id="ex-dragdrop" class="ex-panel">${this.renderDragDrop()}</div>
    `;
    this.bindTabs(container);
    this.bindGuided(container);
    this.bindQuiz(container);
    this.bindDragDrop(container);
  },

  /* ── Onglets ── */
  bindTabs(container) {
    container.querySelectorAll('.ex-tab').forEach(tab => {
      tab.addEventListener('click', () => {
        container.querySelectorAll('.ex-tab').forEach(t => t.classList.remove('active'));
        container.querySelectorAll('.ex-panel').forEach(p => p.classList.remove('active'));
        tab.classList.add('active');
        container.querySelector('#ex-' + tab.dataset.tab).classList.add('active');
      });
    });
  },

  /* ══════════ GUIDED ══════════ */
  renderGuided() {
    return this.data.guided.map((g, i) => `
      <div class="guided-exercise" data-index="${i}">
        <p class="guided-q"><strong>Q${i + 1}.</strong> ${g.q}</p>
        <div class="guided-hints">
          ${g.hints.map((h, hi) => `<button class="hint-btn" data-hint="${hi}">💡 Indice ${hi + 1}</button><span class="hint-text" id="hint-${i}-${hi}">${h}</span>`).join('')}
        </div>
        <div class="guided-answer-zone">
          <input type="text" class="guided-input" placeholder="Ta réponse..." data-index="${i}">
          <button class="guided-check-btn" data-index="${i}">Vérifier</button>
        </div>
        <div class="guided-feedback" id="gfeedback-${i}"></div>
      </div>
    `).join('');
  },

  bindGuided(container) {
    container.querySelectorAll('.hint-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const idx = btn.closest('.guided-exercise').dataset.index;
        const hintId = btn.dataset.hint;
        const el = document.getElementById(`hint-${idx}-${hintId}`);
        el.classList.toggle('visible');
      });
    });
    container.querySelectorAll('.guided-check-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const i = parseInt(btn.dataset.index);
        const input = container.querySelector(`.guided-input[data-index="${i}"]`);
        const fb = document.getElementById(`gfeedback-${i}`);
        const userAns = input.value.trim().toLowerCase();
        const correct = this.data.guided[i].answer.toLowerCase();
        if (userAns === correct) {
          fb.innerHTML = '<span class="correct">✅ Correct ! +15 XP</span>';
          fb.className = 'guided-feedback correct';
          btn.disabled = true;
          input.readOnly = true;
          if (typeof GameEngine !== 'undefined') GameEngine.addXP(15, 'Exercice guidé réussi');
        } else {
          fb.innerHTML = `<span class="incorrect">❌ Pas tout à fait. La réponse est : <code>${this.data.guided[i].answer}</code></span>`;
          fb.className = 'guided-feedback incorrect';
        }
      });
    });
    container.querySelectorAll('.guided-input').forEach(input => {
      input.addEventListener('keydown', e => {
        if (e.key === 'Enter') {
          container.querySelector(`.guided-check-btn[data-index="${input.dataset.index}"]`).click();
        }
      });
    });
  },

  /* ══════════ QUIZ ══════════ */
  renderQuiz() {
    return this.data.quiz.map((q, i) => {
      if (q.type === 'mcq') {
        return `
          <div class="quiz-question" data-index="${i}" data-type="mcq">
            <p><strong>Q${i + 1}.</strong> ${q.q}</p>
            <div class="mcq-options">
              ${q.options.map((o, oi) => `<button class="mcq-btn" data-qi="${i}" data-oi="${oi}">${o}</button>`).join('')}
            </div>
            <div class="quiz-feedback" id="qfeedback-${i}"></div>
          </div>`;
      } else {
        return `
          <div class="quiz-question" data-index="${i}" data-type="qa">
            <p><strong>Q${i + 1}.</strong> ${q.q}</p>
            <div class="qa-zone">
              <input type="text" class="qa-input" placeholder="Ta réponse..." data-index="${i}">
              <button class="qa-check-btn" data-index="${i}">Vérifier</button>
            </div>
            <div class="quiz-feedback" id="qfeedback-${i}"></div>
          </div>`;
      }
    }).join('');
  },

  bindQuiz(container) {
    container.querySelectorAll('.mcq-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const qi = parseInt(btn.dataset.qi);
        const oi = parseInt(btn.dataset.oi);
        const fb = document.getElementById(`qfeedback-${qi}`);
        const btns = container.querySelectorAll(`.mcq-btn[data-qi="${qi}"]`);
        btns.forEach(b => { b.disabled = true; b.classList.remove('correct', 'incorrect'); });
        if (oi === this.data.quiz[qi].correct) {
          btn.classList.add('correct');
          fb.innerHTML = '✅ Bonne réponse ! +10 XP';
          fb.className = 'quiz-feedback correct';
          if (typeof GameEngine !== 'undefined') {
            GameEngine.addXP(10, 'Quiz réussi');
            GameEngine.state.quizCorrect++;
            GameEngine.save();
          }
        } else {
          btn.classList.add('incorrect');
          btns[this.data.quiz[qi].correct].classList.add('correct');
          fb.innerHTML = '❌ Mauvaise réponse.';
          fb.className = 'quiz-feedback incorrect';
        }
      });
    });
    container.querySelectorAll('.qa-check-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const i = parseInt(btn.dataset.index);
        const input = container.querySelector(`.qa-input[data-index="${i}"]`);
        const fb = document.getElementById(`qfeedback-${i}`);
        const userAns = input.value.trim().toLowerCase();
        const correct = this.data.quiz[i].answer.map(a => a.toLowerCase());
        if (correct.some(c => userAns === c)) {
          fb.innerHTML = '✅ Correct ! +10 XP';
          fb.className = 'quiz-feedback correct';
          btn.disabled = true;
          input.readOnly = true;
          if (typeof GameEngine !== 'undefined') {
            GameEngine.addXP(10, 'Réponse correcte');
            GameEngine.state.quizCorrect++;
            GameEngine.save();
          }
        } else {
          fb.innerHTML = `❌ Réponse attendue : <code>${this.data.quiz[i].answer[0]}</code>`;
          fb.className = 'quiz-feedback incorrect';
        }
      });
    });
    container.querySelectorAll('.qa-input').forEach(input => {
      input.addEventListener('keydown', e => {
        if (e.key === 'Enter') container.querySelector(`.qa-check-btn[data-index="${input.dataset.index}"]`).click();
      });
    });
  },

  /* ══════════ DRAG & DROP ══════════ */
  renderDragDrop() {
    return this.data.dragdrop.map((dd, i) => {
      const shuffledVals = [...dd.pairs.map(p => p[1])].sort(() => Math.random() - 0.5);
      return `
        <div class="dd-exercise" data-index="${i}">
          <p><strong>Exercice ${i + 1}.</strong> ${dd.instruction}</p>
          <div class="dd-targets">
            ${dd.pairs.map((p, pi) => `
              <div class="dd-row" data-pair="${pi}">
                <span class="dd-key">${p[0]}</span>
                <span class="dd-dropzone" data-expected="${p[1]}" data-pi="${pi}">Glisse ici</span>
              </div>
            `).join('')}
          </div>
          <div class="dd-pool" id="dd-pool-${i}">
            ${shuffledVals.map(v => `<span class="dd-item" draggable="true" data-value="${v}">${v}</span>`).join('')}
          </div>
          <button class="dd-check-btn" data-index="${i}">Vérifier</button>
          <div class="dd-feedback" id="ddfeedback-${i}"></div>
        </div>`;
    }).join('');
  },

  bindDragDrop(container) {
    let draggedItem = null;

    container.querySelectorAll('.dd-item').forEach(item => {
      item.addEventListener('dragstart', e => {
        draggedItem = item;
        item.classList.add('dragging');
        e.dataTransfer.effectAllowed = 'move';
      });
      item.addEventListener('dragend', () => {
        item.classList.remove('dragging');
        draggedItem = null;
      });
    });

    container.querySelectorAll('.dd-dropzone').forEach(zone => {
      zone.addEventListener('dragover', e => { e.preventDefault(); zone.classList.add('drag-over'); });
      zone.addEventListener('dragleave', () => zone.classList.remove('drag-over'));
      zone.addEventListener('drop', e => {
        e.preventDefault();
        zone.classList.remove('drag-over');
        if (!draggedItem) return;
        if (zone.querySelector('.dd-item')) {
          const existing = zone.querySelector('.dd-item');
          const pool = draggedItem.closest('.dd-pool') || container.querySelector(`#dd-pool-${zone.closest('.dd-exercise').dataset.index}`);
          pool.appendChild(existing);
        }
        zone.textContent = '';
        zone.appendChild(draggedItem);
      });
    });

    /* Mobile : tap-to-select */
    let selectedItem = null;
    container.querySelectorAll('.dd-item').forEach(item => {
      item.addEventListener('click', () => {
        if (selectedItem) selectedItem.classList.remove('selected');
        selectedItem = item;
        item.classList.add('selected');
      });
    });
    container.querySelectorAll('.dd-dropzone').forEach(zone => {
      zone.addEventListener('click', () => {
        if (!selectedItem) return;
        if (zone.querySelector('.dd-item')) {
          const existing = zone.querySelector('.dd-item');
          const pool = container.querySelector(`#dd-pool-${zone.closest('.dd-exercise').dataset.index}`);
          pool.appendChild(existing);
        }
        zone.textContent = '';
        zone.appendChild(selectedItem);
        selectedItem.classList.remove('selected');
        selectedItem = null;
      });
    });

    container.querySelectorAll('.dd-check-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const i = parseInt(btn.dataset.index);
        const exercise = container.querySelector(`.dd-exercise[data-index="${i}"]`);
        const zones = exercise.querySelectorAll('.dd-dropzone');
        const fb = document.getElementById(`ddfeedback-${i}`);
        let correct = 0;
        zones.forEach(zone => {
          const placed = zone.querySelector('.dd-item');
          zone.classList.remove('dd-correct', 'dd-incorrect');
          if (placed && placed.dataset.value === zone.dataset.expected) {
            zone.classList.add('dd-correct');
            correct++;
          } else {
            zone.classList.add('dd-incorrect');
          }
        });
        if (correct === zones.length) {
          fb.innerHTML = `✅ Parfait ! ${correct}/${zones.length} — +20 XP`;
          fb.className = 'dd-feedback correct';
          btn.disabled = true;
          if (typeof GameEngine !== 'undefined') {
            GameEngine.addXP(20, 'Drag & Drop parfait');
            GameEngine.state.dragDropWins++;
            GameEngine.save();
          }
        } else {
          fb.innerHTML = `❌ ${correct}/${zones.length} correct(s). Réessaie !`;
          fb.className = 'dd-feedback incorrect';
        }
      });
    });
  }
};

document.addEventListener('DOMContentLoaded', () => ExerciseEngine.init());
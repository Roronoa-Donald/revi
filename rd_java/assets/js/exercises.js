/* ============================================
   RD Java — Exercise Engine
   10 chapitres × 18 exercices = 180 exercices
   (5 guidés + 10 quiz + 3 glisser-déposer)
   ============================================ */
const ExerciseEngine = (() => {

/* ---------- BASE DE DONNÉES ---------- */
const DB = {

/* ===== CHAPITRE 1 : Introduction & Syntaxe ===== */
chapitre1: {
  title: "Introduction & Syntaxe de base",
  guided: [
    {q:"Écrivez la structure minimale d'un programme Java avec la méthode main.",hint:"public class ... { public static void main(String[] args) { } }",a:"public class Main { public static void main(String[] args) { } }"},
    {q:"Comment compile-t-on un fichier Java nommé App.java en ligne de commande ?",hint:"Utilisez la commande javac",a:"javac App.java"},
    {q:"Comment exécute-t-on la classe compilée App ?",hint:"Utilisez la commande java suivi du nom de la classe (sans .class)",a:"java App"},
    {q:"Ajoutez un commentaire sur une seule ligne en Java.",hint:"Utilisez //",a:"// Ceci est un commentaire"},
    {q:"Ajoutez un commentaire multi-lignes en Java.",hint:"Utilisez /* ... */",a:"/* Ceci est un commentaire multi-lignes */"}
  ],
  quiz: [
    {q:"Quel est le point d'entrée d'un programme Java ?",options:["La méthode start()","La méthode main()","Le constructeur","La méthode run()"],answer:1},
    {q:"Quelle extension porte un fichier source Java ?",options:[".js",".java",".jv",".class"],answer:1},
    {q:"Quelle commande compile un fichier Java ?",options:["java","javac","compile","jvm"],answer:1},
    {q:"Que produit la compilation d'un fichier .java ?",options:["Un fichier .exe","Un fichier .class","Un fichier .jar","Un fichier .bin"],answer:1},
    {q:"Quel mot-clé définit une classe en Java ?",options:["def","function","class","struct"],answer:2},
    {q:"Que signifie JVM ?",options:["Java Virtual Machine","Java Variable Method","Java Visual Manager","Java Version Module"],answer:0},
    {q:"Quel est le rôle du JDK ?",options:["Exécuter du Java","Développer et compiler du Java","Débugger uniquement","Gérer les bases de données"],answer:1},
    {q:"Quel symbole termine chaque instruction en Java ?",options:[":",".",";"," "],answer:2},
    {q:"Comment écrit-on un commentaire Javadoc ?",options:["// doc","/* doc */","/** doc */","# doc"],answer:2},
    {q:"Le nom du fichier doit correspondre au nom de…",options:["La méthode main","La classe publique","Le package","La variable"],answer:1}
  ],
  drag: [
    {q:"Associez chaque concept à sa description",pairs:[["JDK","Kit de développement"],["JRE","Environnement d'exécution"],["JVM","Machine virtuelle"],["javac","Compilateur"]]},
    {q:"Associez l'extension au contenu",pairs:[[".java","Code source"],[ ".class","Bytecode"],[ ".jar","Archive exécutable"]]},
    {q:"Ordonnez les étapes de compilation/exécution",pairs:[["1","Écrire le code .java"],["2","Compiler avec javac"],["3","Exécuter avec java"]]}
  ]
},

/* ===== CHAPITRE 2 : Variables, Types & Opérateurs ===== */
chapitre2: {
  title: "Variables, Types & Opérateurs",
  guided: [
    {q:"Déclarez une variable entière nommée age avec la valeur 25.",hint:"int nomVariable = valeur;",a:"int age = 25;"},
    {q:"Déclarez une variable de type double nommée prix avec la valeur 19.99.",hint:"double nomVariable = valeur;",a:"double prix = 19.99;"},
    {q:"Déclarez une chaîne de caractères nommée nom avec la valeur \"Java\".",hint:"String nomVariable = \"valeur\";",a:"String nom = \"Java\";"},
    {q:"Déclarez une variable booléenne nommée actif valant true.",hint:"boolean nomVariable = valeur;",a:"boolean actif = true;"},
    {q:"Déclarez une constante entière PI_APPROX valant 3.",hint:"Utilisez le mot-clé final",a:"final int PI_APPROX = 3;"}
  ],
  quiz: [
    {q:"Quel type utilise-t-on pour un nombre entier en Java ?",options:["float","int","String","double"],answer:1},
    {q:"Quelle est la taille d'un int en Java ?",options:["8 bits","16 bits","32 bits","64 bits"],answer:2},
    {q:"Quel type pour un nombre à virgule flottante précis ?",options:["float","int","double","long"],answer:2},
    {q:"Quel type pour un seul caractère ?",options:["String","char","character","letter"],answer:1},
    {q:"Quel mot-clé rend une variable constante ?",options:["const","static","final","immutable"],answer:2},
    {q:"Quel est le résultat de 10 / 3 en Java (deux int) ?",options:["3.33","3","3.0","Erreur"],answer:1},
    {q:"Quel opérateur donne le reste d'une division ?",options:["/","//","%","mod"],answer:2},
    {q:"Que vaut (int) 9.7 en Java ?",options:["10","9","9.7","Erreur"],answer:1},
    {q:"Quel type pour stocker un très grand nombre entier ?",options:["int","short","long","byte"],answer:2},
    {q:"Comment concaténer deux String en Java ?",options:["concat()","L'opérateur +","Les deux","Aucun"],answer:2}
  ],
  drag: [
    {q:"Associez le type à sa description",pairs:[["int","Entier 32 bits"],["double","Décimal 64 bits"],["boolean","Vrai ou faux"],["char","Un caractère"]]},
    {q:"Associez l'opérateur à son rôle",pairs:[["+","Addition"],[ "-","Soustraction"],[ "*","Multiplication"],[ "%","Modulo"]]},
    {q:"Associez le type à un exemple de valeur",pairs:[["int","42"],["double","3.14"],["String","\"Bonjour\""],["boolean","true"]]}
  ]
},

/* ===== CHAPITRE 3 : Affichages & Entrées ===== */
chapitre3: {
  title: "Affichages & Entrées (Scanner)",
  guided: [
    {q:"Affichez \"Bonjour le monde\" dans la console.",hint:"System.out.println(\"...\");",a:"System.out.println(\"Bonjour le monde\");"},
    {q:"Affichez la valeur d'une variable x sans retour à la ligne.",hint:"System.out.print(...);",a:"System.out.print(x);"},
    {q:"Créez un objet Scanner pour lire l'entrée clavier.",hint:"Scanner sc = new Scanner(System.in);",a:"Scanner sc = new Scanner(System.in);"},
    {q:"Lisez un entier depuis le clavier avec Scanner.",hint:"sc.nextInt()",a:"int n = sc.nextInt();"},
    {q:"Affichez un nombre formaté à 2 décimales avec printf.",hint:"System.out.printf(\"%.2f\", valeur);",a:"System.out.printf(\"%.2f\", prix);"}
  ],
  quiz: [
    {q:"Quelle méthode affiche avec un retour à la ligne ?",options:["System.out.print()","System.out.println()","System.out.printf()","System.out.write()"],answer:1},
    {q:"Quel import est nécessaire pour Scanner ?",options:["java.io.Scanner","java.util.Scanner","java.lang.Scanner","Aucun import"],answer:1},
    {q:"Quelle méthode de Scanner lit une ligne complète ?",options:["next()","nextLine()","readLine()","getLine()"],answer:1},
    {q:"Quelle méthode de Scanner lit un entier ?",options:["nextInteger()","readInt()","nextInt()","getInt()"],answer:2},
    {q:"Que fait System.out.print() ?",options:["Affiche avec retour à la ligne","Affiche sans retour à la ligne","Affiche formaté","Lit l'entrée"],answer:1},
    {q:"Quel spécificateur de format pour un entier dans printf ?",options:["%s","%d","%f","%c"],answer:1},
    {q:"Quel spécificateur pour un nombre décimal dans printf ?",options:["%d","%s","%f","%i"],answer:2},
    {q:"Comment fermer un Scanner sc ?",options:["sc.close()","sc.stop()","sc.end()","sc.finish()"],answer:0},
    {q:"Que fait le \\n dans une chaîne ?",options:["Tabulation","Retour à la ligne","Espace","Rien"],answer:1},
    {q:"Quelle méthode lit un double depuis Scanner ?",options:["nextFloat()","nextDouble()","readDouble()","getDouble()"],answer:1}
  ],
  drag: [
    {q:"Associez la méthode à son rôle",pairs:[["println()","Affiche + saut de ligne"],["print()","Affiche sans saut"],["printf()","Affichage formaté"],["nextLine()","Lire une ligne"]]},
    {q:"Associez le spécificateur au type",pairs:[["%d","Entier"],["%f","Décimal"],["%s","Chaîne"],["%c","Caractère"]]},
    {q:"Associez la méthode Scanner au type lu",pairs:[["nextInt()","int"],["nextDouble()","double"],["nextLine()","String"]]}
  ]
},

/* ===== CHAPITRE 4 : Conditions ===== */
chapitre4: {
  title: "Conditions (if / else / switch)",
  guided: [
    {q:"Écrivez une condition if qui vérifie si age >= 18.",hint:"if (condition) { ... }",a:"if (age >= 18) { System.out.println(\"Majeur\"); }"},
    {q:"Ajoutez un else à la condition précédente.",hint:"if (...) { ... } else { ... }",a:"if (age >= 18) { System.out.println(\"Majeur\"); } else { System.out.println(\"Mineur\"); }"},
    {q:"Écrivez un else if pour vérifier si age >= 13.",hint:"else if (condition) { ... }",a:"if (age >= 18) { System.out.println(\"Adulte\"); } else if (age >= 13) { System.out.println(\"Ado\"); } else { System.out.println(\"Enfant\"); }"},
    {q:"Écrivez un opérateur ternaire pour affecter \"Oui\" ou \"Non\" selon une condition.",hint:"variable = condition ? valeur1 : valeur2;",a:"String reponse = (age >= 18) ? \"Oui\" : \"Non\";"},
    {q:"Écrivez un switch sur la variable jour (1 = Lundi).",hint:"switch(variable) { case valeur: ...; break; }",a:"switch (jour) { case 1: System.out.println(\"Lundi\"); break; case 2: System.out.println(\"Mardi\"); break; default: System.out.println(\"Autre\"); }"}
  ],
  quiz: [
    {q:"Quel opérateur teste l'égalité en Java ?",options:["=","==","===","equals()"],answer:1},
    {q:"Quel opérateur logique signifie ET ?",options:["||","&&","!","&"],answer:1},
    {q:"Quel opérateur logique signifie OU ?",options:["&&","||","!","|"],answer:1},
    {q:"Que fait l'opérateur ! ?",options:["Addition","Égalité","Négation","Affectation"],answer:2},
    {q:"Quel mot-clé est obligatoire dans un switch pour gérer les cas non prévus ?",options:["else","finally","default","otherwise"],answer:2},
    {q:"Que se passe-t-il si on oublie break dans un case ?",options:["Erreur de compilation","Le programme s'arrête","Il exécute aussi les cases suivants","Rien"],answer:2},
    {q:"Quelle est la syntaxe de l'opérateur ternaire ?",options:["if ? then : else","condition ? vrai : faux","condition ?? vrai :: faux","test -> vrai | faux"],answer:1},
    {q:"Comment comparer deux String en Java ?",options:["==","equals()","compare()","==="],answer:1},
    {q:"Quel type peut-on utiliser dans un switch en Java ?",options:["int et String","Uniquement int","Uniquement String","boolean"],answer:0},
    {q:"Quelle est la bonne syntaxe d'un if ?",options:["if age >= 18","if (age >= 18)","if [age >= 18]","if {age >= 18}"],answer:1}
  ],
  drag: [
    {q:"Associez l'opérateur à son nom",pairs:[["==","Égalité"],["!=","Différent"],["&&","ET logique"],["||","OU logique"]]},
    {q:"Associez le mot-clé à son rôle dans un switch",pairs:[["case","Définir un cas"],["break","Sortir du switch"],["default","Cas par défaut"]]},
    {q:"Associez l'opérateur de comparaison",pairs:[["<","Inférieur strict"],[">","Supérieur strict"],["<=","Inférieur ou égal"],[">=","Supérieur ou égal"]]}
  ]
},

/* ===== CHAPITRE 5 : Boucles ===== */
chapitre5: {
  title: "Boucles (for / while / do-while / for-each)",
  guided: [
    {q:"Écrivez une boucle for de 0 à 4.",hint:"for (int i = 0; i < 5; i++) { }",a:"for (int i = 0; i < 5; i++) { System.out.println(i); }"},
    {q:"Écrivez une boucle while qui tourne tant que x < 10.",hint:"while (condition) { ... }",a:"while (x < 10) { x++; }"},
    {q:"Écrivez une boucle do-while qui s'exécute au moins une fois.",hint:"do { ... } while (condition);",a:"do { System.out.println(x); x++; } while (x < 5);"},
    {q:"Écrivez une boucle for-each sur un tableau tab.",hint:"for (Type e : tableau) { }",a:"for (int e : tab) { System.out.println(e); }"},
    {q:"Utilisez break pour sortir d'une boucle quand i == 3.",hint:"if (i == 3) break;",a:"for (int i = 0; i < 10; i++) { if (i == 3) break; System.out.println(i); }"}
  ],
  quiz: [
    {q:"Combien de parties a la déclaration d'une boucle for ?",options:["2","3","4","1"],answer:1},
    {q:"Quelle boucle s'exécute au moins une fois ?",options:["for","while","do-while","for-each"],answer:2},
    {q:"Quel mot-clé sort immédiatement d'une boucle ?",options:["stop","exit","break","return"],answer:2},
    {q:"Quel mot-clé passe à l'itération suivante ?",options:["skip","next","continue","pass"],answer:2},
    {q:"Que vaut i après : for(int i=0; i<5; i++) {} ?",options:["4","5","Erreur (i n'existe plus)","0"],answer:2},
    {q:"Quelle boucle est adaptée pour parcourir un tableau sans index ?",options:["for","while","for-each","do-while"],answer:2},
    {q:"Combien de fois s'exécute : for(int i=0; i<=10; i+=2) ?",options:["5","6","10","11"],answer:1},
    {q:"Que fait une boucle infinie while(true) sans break ?",options:["Erreur de compilation","Le programme tourne indéfiniment","Rien","S'arrête après 1000 itérations"],answer:1},
    {q:"Quelle syntaxe est correcte pour for-each ?",options:["for (int i in tab)","for (int i : tab)","foreach (int i : tab)","for each int i in tab"],answer:1},
    {q:"Quel est le résultat de : for(int i=10; i>0; i-=3) count++; ?",options:["3","4","10","Erreur"],answer:1}
  ],
  drag: [
    {q:"Associez la boucle à son cas d'usage",pairs:[["for","Nombre d'itérations connu"],["while","Condition à vérifier avant"],["do-while","Au moins une exécution"],["for-each","Parcourir une collection"]]},
    {q:"Associez le mot-clé à son effet dans une boucle",pairs:[["break","Sort de la boucle"],["continue","Passe à l'itération suivante"],["return","Sort de la méthode"]]},
    {q:"Ordonnez les parties d'un for",pairs:[["1","Initialisation (int i=0)"],["2","Condition (i<5)"],["3","Incrémentation (i++)"]]}
  ]
},

/* ===== CHAPITRE 6 : Tableaux ===== */
chapitre6: {
  title: "Tableaux & ArrayList",
  guided: [
    {q:"Déclarez un tableau d'entiers de taille 5.",hint:"int[] tab = new int[5];",a:"int[] tab = new int[5];"},
    {q:"Déclarez et initialisez un tableau avec {1, 2, 3}.",hint:"int[] tab = {1, 2, 3};",a:"int[] tab = {1, 2, 3};"},
    {q:"Accédez au premier élément d'un tableau tab.",hint:"tab[0]",a:"int premier = tab[0];"},
    {q:"Obtenez la taille d'un tableau tab.",hint:"tab.length (sans parenthèses)",a:"int taille = tab.length;"},
    {q:"Créez une ArrayList de String.",hint:"ArrayList<String> liste = new ArrayList<>();",a:"ArrayList<String> liste = new ArrayList<>();"}
  ],
  quiz: [
    {q:"Quel est l'index du premier élément d'un tableau ?",options:["1","0","-1","Dépend du type"],answer:1},
    {q:"Comment obtenir la taille d'un tableau ?",options:["tab.size()","tab.length()","tab.length","tab.count()"],answer:2},
    {q:"Que se passe-t-il si on accède à un index hors limites ?",options:["Retourne null","Retourne 0","ArrayIndexOutOfBoundsException","Rien"],answer:2},
    {q:"Quelle classe Java représente un tableau dynamique ?",options:["Array","ArrayList","List","Vector"],answer:1},
    {q:"Comment ajouter un élément à une ArrayList ?",options:["add()","push()","append()","insert()"],answer:0},
    {q:"Quel import faut-il pour ArrayList ?",options:["java.util.ArrayList","java.lang.ArrayList","java.io.ArrayList","Aucun"],answer:0},
    {q:"Comment obtenir la taille d'une ArrayList ?",options:["length","length()","size()","count()"],answer:2},
    {q:"Les tableaux en Java sont-ils de taille fixe ?",options:["Oui","Non","Dépend du type","Seulement les int[]"],answer:0},
    {q:"Comment trier un tableau avec la classe Arrays ?",options:["Arrays.sort(tab)","tab.sort()","Collections.sort(tab)","sort(tab)"],answer:0},
    {q:"Quel est le type d'un tableau 2D d'entiers ?",options:["int[][]","int[,]","int[2]","int[][]()"],answer:0}
  ],
  drag: [
    {q:"Associez la propriété/méthode au type",pairs:[["length","Tableau classique"],["size()","ArrayList"],["add()","ArrayList"],["Arrays.sort()","Tableau classique"]]},
    {q:"Associez l'opération à la syntaxe",pairs:[["Créer un tableau","int[] t = new int[5]"],["Accéder élément","t[0]"],["Parcourir","for (int e : t)"],["Taille","t.length"]]},
    {q:"Associez le type à sa caractéristique",pairs:[["int[]","Taille fixe"],["ArrayList","Taille dynamique"],["int[][]","Tableau 2D"]]}
  ]
},

/* ===== CHAPITRE 7 : Fonctions & Procédures ===== */
chapitre7: {
  title: "Fonctions & Procédures (méthodes statiques)",
  guided: [
    {q:"Écrivez une méthode statique qui retourne la somme de deux entiers.",hint:"public static int somme(int a, int b) { return a + b; }",a:"public static int somme(int a, int b) { return a + b; }"},
    {q:"Écrivez une procédure (void) qui affiche \"Bonjour\".",hint:"public static void direBonjour() { ... }",a:"public static void direBonjour() { System.out.println(\"Bonjour\"); }"},
    {q:"Appelez la méthode somme avec 3 et 5.",hint:"int resultat = somme(3, 5);",a:"int resultat = somme(3, 5);"},
    {q:"Écrivez une méthode avec un paramètre String et retour void.",hint:"public static void saluer(String nom) { ... }",a:"public static void saluer(String nom) { System.out.println(\"Salut \" + nom); }"},
    {q:"Écrivez une surcharge de somme qui accepte 3 paramètres.",hint:"Même nom, paramètres différents",a:"public static int somme(int a, int b, int c) { return a + b + c; }"}
  ],
  quiz: [
    {q:"Quel mot-clé indique qu'une méthode ne retourne rien ?",options:["null","none","void","empty"],answer:2},
    {q:"Quel mot-clé permet de retourner une valeur ?",options:["send","output","return","give"],answer:2},
    {q:"Qu'est-ce que la surcharge de méthode ?",options:["Même nom, paramètres différents","Même nom, même signature","Héritage de méthode","Méthode dans une boucle"],answer:0},
    {q:"Une méthode static peut être appelée sans…",options:["Paramètres","Classe","Objet","Return"],answer:2},
    {q:"Quel est le type de retour de : public static double calculer(int x) ?",options:["int","void","double","static"],answer:2},
    {q:"Combien de valeurs une méthode Java peut-elle retourner ?",options:["Aucune","Une seule","Plusieurs","Illimité"],answer:1},
    {q:"Quelle est la différence entre fonction et procédure ?",options:["Aucune en Java","Le nom","La fonction retourne une valeur, la procédure non","Le nombre de paramètres"],answer:2},
    {q:"Où déclare-t-on une méthode static ?",options:["Dans le main","Dans la classe","N'importe où","Dans un fichier séparé"],answer:1},
    {q:"Le mot-clé static signifie que la méthode appartient à…",options:["L'objet","La classe","La JVM","Le package"],answer:1},
    {q:"Peut-on avoir deux méthodes avec le même nom et les mêmes paramètres ?",options:["Oui","Non","Seulement avec des types différents","Seulement si elles sont dans des classes différentes"],answer:1}
  ],
  drag: [
    {q:"Associez chaque élément à son rôle",pairs:[["void","Pas de retour"],["return","Retourner une valeur"],["static","Appartient à la classe"],["paramètre","Donnée d'entrée"]]},
    {q:"Associez le concept à la définition",pairs:[["Fonction","Méthode avec retour"],["Procédure","Méthode void"],["Surcharge","Même nom, paramètres différents"]]},
    {q:"Ordonnez la structure d'une méthode",pairs:[["1","Modificateur (public static)"],["2","Type de retour"],["3","Nom de la méthode"],["4","Paramètres entre ()"]]}
  ]
},

/* ===== CHAPITRE 8 : Classes & Objets (POO intro) ===== */
chapitre8: {
  title: "Classes & Objets (introduction POO)",
  guided: [
    {q:"Déclarez une classe vide nommée Voiture.",hint:"public class Voiture { }",a:"public class Voiture { }"},
    {q:"Ajoutez un attribut String marque à la classe Voiture.",hint:"String marque;",a:"public class Voiture { String marque; }"},
    {q:"Créez un objet de type Voiture.",hint:"Voiture v = new Voiture();",a:"Voiture v = new Voiture();"},
    {q:"Écrivez un constructeur pour Voiture qui initialise la marque.",hint:"public Voiture(String marque) { this.marque = marque; }",a:"public Voiture(String marque) { this.marque = marque; }"},
    {q:"Accédez à l'attribut marque d'un objet v.",hint:"v.marque",a:"System.out.println(v.marque);"}
  ],
  quiz: [
    {q:"Quel mot-clé crée une instance d'une classe ?",options:["create","instance","new","make"],answer:2},
    {q:"Qu'est-ce qu'un constructeur ?",options:["Une méthode void","Une méthode portant le nom de la classe","Un attribut","Une interface"],answer:1},
    {q:"Que désigne le mot-clé this ?",options:["La classe parente","L'objet courant","Le main","La JVM"],answer:1},
    {q:"Un constructeur a-t-il un type de retour ?",options:["Oui, void","Oui, le type de la classe","Non, jamais","Oui, Object"],answer:2},
    {q:"Combien d'objets peut-on créer à partir d'une classe ?",options:["Un seul","Deux maximum","Autant qu'on veut","Dépend de la JVM"],answer:2},
    {q:"Quel est le constructeur par défaut ?",options:["Un constructeur avec paramètres","Un constructeur sans paramètre fourni par Java","Un constructeur private","Il n'existe pas"],answer:1},
    {q:"Qu'est-ce qu'une classe en POO ?",options:["Un objet","Un modèle/plan pour créer des objets","Une méthode","Un package"],answer:1},
    {q:"Qu'est-ce qu'un objet ?",options:["Un plan","Une instance d'une classe","Un type primitif","Un fichier .class"],answer:1},
    {q:"Peut-on avoir plusieurs constructeurs dans une classe ?",options:["Non","Oui, c'est la surcharge de constructeurs","Seulement deux","Seulement avec héritage"],answer:1},
    {q:"Où place-t-on les attributs d'une classe ?",options:["Dans le main","Dans la méthode","Dans la classe, hors des méthodes","Dans le constructeur uniquement"],answer:2}
  ],
  drag: [
    {q:"Associez le concept à sa définition",pairs:[["Classe","Modèle / plan"],["Objet","Instance d'une classe"],["Constructeur","Initialise l'objet"],["this","Référence à l'objet courant"]]},
    {q:"Associez la syntaxe à l'action",pairs:[["new Voiture()","Créer un objet"],["v.marque","Accéder à un attribut"],["public Voiture()","Définir un constructeur"]]},
    {q:"Ordonnez la création d'un objet",pairs:[["1","Définir la classe"],["2","Écrire le constructeur"],["3","Appeler new NomClasse()"]]}
  ]
},

/* ===== CHAPITRE 9 : Attributs, Méthodes & Encapsulation ===== */
chapitre9: {
  title: "Attributs, Méthodes & Encapsulation",
  guided: [
    {q:"Déclarez un attribut privé String nom dans une classe Personne.",hint:"private String nom;",a:"private String nom;"},
    {q:"Écrivez un getter pour l'attribut nom.",hint:"public String getNom() { return nom; }",a:"public String getNom() { return this.nom; }"},
    {q:"Écrivez un setter pour l'attribut nom.",hint:"public void setNom(String nom) { this.nom = nom; }",a:"public void setNom(String nom) { this.nom = nom; }"},
    {q:"Redéfinissez la méthode toString() dans la classe Personne.",hint:"@Override public String toString() { ... }",a:"@Override public String toString() { return \"Personne: \" + this.nom; }"},
    {q:"Déclarez un attribut statique compteur dans la classe Personne.",hint:"private static int compteur = 0;",a:"private static int compteur = 0;"}
  ],
  quiz: [
    {q:"Quel modificateur d'accès rend un attribut invisible hors de la classe ?",options:["public","protected","private","default"],answer:2},
    {q:"Qu'est-ce qu'un getter ?",options:["Un constructeur","Une méthode qui retourne la valeur d'un attribut","Un type","Un import"],answer:1},
    {q:"Qu'est-ce qu'un setter ?",options:["Une méthode qui modifie un attribut","Un constructeur","Un attribut final","Un opérateur"],answer:0},
    {q:"Quel concept POO consiste à cacher les attributs ?",options:["Héritage","Polymorphisme","Encapsulation","Abstraction"],answer:2},
    {q:"Quel mot-clé rend un attribut partagé par toutes les instances ?",options:["final","public","static","shared"],answer:2},
    {q:"Que fait l'annotation @Override ?",options:["Crée une nouvelle méthode","Indique qu'on redéfinit une méthode héritée","Supprime une méthode","Rend la méthode privée"],answer:1},
    {q:"toString() est héritée de quelle classe ?",options:["Main","System","Object","String"],answer:2},
    {q:"Un attribut public peut être accédé depuis…",options:["La classe seulement","Le package","N'importe où","Le fichier"],answer:2},
    {q:"Convention de nommage pour un getter de l'attribut age ?",options:["age()","getAge()","readAge()","fetchAge()"],answer:1},
    {q:"Un attribut static final est souvent utilisé pour…",options:["Les variables locales","Les constantes de classe","Les constructeurs","Les boucles"],answer:1}
  ],
  drag: [
    {q:"Associez le modificateur à sa portée",pairs:[["private","Classe seulement"],["public","Partout"],["protected","Classe + sous-classes + package"],["(default)","Package seulement"]]},
    {q:"Associez le concept à sa définition",pairs:[["Encapsulation","Cacher les données internes"],["Getter","Lire un attribut privé"],["Setter","Modifier un attribut privé"],["static","Partagé entre toutes les instances"]]},
    {q:"Associez le mot-clé au concept",pairs:[["private","Encapsulation"],["static","Variable de classe"],["final","Constante"],["@Override","Redéfinition"]]}
  ]
},

/* ===== CHAPITRE 10 : Collections : ArrayList, HashMap & Méthodes utiles ===== */
chapitre10: {
  title: "Collections : ArrayList, HashMap & Méthodes utiles",
  guided: [
    {q:"Créez une ArrayList<Integer> et ajoutez-y 10 et 20.",hint:"ArrayList<Integer> l = new ArrayList<>(); l.add(10);",a:"ArrayList<Integer> l = new ArrayList<>(); l.add(10); l.add(20);"},
    {q:"Créez une HashMap<String, Integer> et ajoutez une paire clé-valeur.",hint:"HashMap<String, Integer> map = new HashMap<>(); map.put(\"clé\", valeur);",a:"HashMap<String, Integer> map = new HashMap<>(); map.put(\"age\", 25);"},
    {q:"Récupérez une valeur dans la HashMap avec la clé \"age\".",hint:"map.get(\"age\")",a:"int age = map.get(\"age\");"},
    {q:"Parcourez une HashMap avec une boucle for-each sur les entrées.",hint:"for (Map.Entry<K,V> e : map.entrySet()) { }",a:"for (Map.Entry<String, Integer> e : map.entrySet()) { System.out.println(e.getKey() + \" : \" + e.getValue()); }"},
    {q:"Utilisez la méthode contains() sur une ArrayList.",hint:"liste.contains(valeur)",a:"boolean existe = liste.contains(10);"}
  ],
  quiz: [
    {q:"Quelle interface est implémentée par ArrayList ?",options:["Map","Set","List","Queue"],answer:2},
    {q:"Quelle interface est implémentée par HashMap ?",options:["List","Set","Map","Queue"],answer:2},
    {q:"Comment ajouter un élément dans une HashMap ?",options:["add()","put()","set()","insert()"],answer:1},
    {q:"Comment récupérer une valeur dans une HashMap ?",options:["get()","find()","fetch()","read()"],answer:0},
    {q:"Peut-on stocker des types primitifs directement dans une ArrayList ?",options:["Oui","Non, il faut utiliser les classes wrapper (Integer, Double…)","Seulement int","Seulement String"],answer:1},
    {q:"Quelle méthode supprime un élément d'une ArrayList ?",options:["delete()","remove()","drop()","erase()"],answer:1},
    {q:"Quelle méthode vérifie si une clé existe dans HashMap ?",options:["hasKey()","contains()","containsKey()","exists()"],answer:2},
    {q:"Que retourne map.size() ?",options:["Le nombre de clés","La mémoire utilisée","Le nombre de valeurs null","La capacité maximale"],answer:0},
    {q:"Comment vider une ArrayList ?",options:["empty()","clear()","reset()","clean()"],answer:1},
    {q:"Quel est l'import pour HashMap ?",options:["java.util.HashMap","java.lang.HashMap","java.map.HashMap","java.collections.HashMap"],answer:0}
  ],
  drag: [
    {q:"Associez la méthode au type de collection",pairs:[["add()","ArrayList"],["put()","HashMap"],["get(index)","ArrayList"],["get(key)","HashMap"]]},
    {q:"Associez la classe wrapper au type primitif",pairs:[["Integer","int"],["Double","double"],["Boolean","boolean"],["Character","char"]]},
    {q:"Associez la méthode à son rôle",pairs:[["size()","Nombre d'éléments"],["contains()","Vérifie la présence"],["remove()","Supprime un élément"],["clear()","Vide la collection"]]}
  ]
}

};/* end DB */

/* ---------- MOTEUR ---------- */
function getChapterFromPath() {
    const m = window.location.pathname.match(/chapitre(\d+)/);
    return m ? 'chapitre' + m[1] : null;
}

function renderGuided(exercises, container) {
    container.innerHTML = exercises.map((ex, i) => `
        <div class="guided-exercise">
            <h4><span>📝</span> Exercice ${i + 1}</h4>
            <p>${ex.q}</p>
            <button class="hint-btn" onclick="ExerciseEngine.showGuidedAnswer(this)">💡 Voir l'indice</button>
            <div class="hint-content">${ex.hint}</div>
            <input class="exercise-input" placeholder="Votre réponse..." data-answer="${ex.a}">
            <button class="hint-btn" style="margin-top:0.5rem" onclick="ExerciseEngine.checkGuided(this)">✅ Vérifier</button>
        </div>
    `).join('');
}

function renderQuiz(exercises, container) {
    container.innerHTML = exercises.map((ex, i) => `
        <div class="quiz-exercise" data-answer="${ex.answer}">
            <h4><span>❓</span> Question ${i + 1}</h4>
            <p>${ex.q}</p>
            <div class="quiz-options">
                ${ex.options.map((opt, j) => `<div class="quiz-option" onclick="ExerciseEngine.selectQuiz(this, ${j})">${opt}</div>`).join('')}
            </div>
        </div>
    `).join('');
}

function renderDrag(exercises, container) {
    container.innerHTML = exercises.map((ex, i) => `
        <div class="dragdrop-exercise">
            <h4><span>🔗</span> Glisser-déposer ${i + 1}</h4>
            <p>${ex.q}</p>
            <div class="drag-bank" style="display:flex;flex-wrap:wrap;gap:0.4rem;margin:0.75rem 0;">
                ${shuffle(ex.pairs.map(p => p[1])).map(v => `<div class="drag-item" draggable="true" ondragstart="ExerciseEngine.handleDragStart(event)" ondragend="ExerciseEngine.handleDragEnd(event)">${v}</div>`).join('')}
            </div>
            <div class="drag-targets">
                ${ex.pairs.map(p => `
                    <div style="display:flex;align-items:center;gap:0.5rem;margin:0.35rem 0;">
                        <strong style="min-width:120px;font-size:0.85rem;">${p[0]}</strong>
                        <div class="drop-zone" data-answer="${p[1]}" ondragover="ExerciseEngine.handleDragOver(event)" ondrop="ExerciseEngine.handleDrop(event)" ondragleave="ExerciseEngine.handleDragLeave(event)"></div>
                    </div>
                `).join('')}
            </div>
            <button class="hint-btn" style="margin-top:0.75rem" onclick="ExerciseEngine.checkDrag(this)">✅ Vérifier</button>
        </div>
    `).join('');
}

function shuffle(arr) {
    const a = [...arr];
    for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
}

function init() {
    const chapter = getChapterFromPath();
    if (!chapter || !DB[chapter]) return;
    const data = DB[chapter];

    const container = document.getElementById('interactive-exercises');
    if (!container) return;

    container.innerHTML = `
        <h2 style="font-size:1.4rem;font-weight:800;margin-bottom:1rem;">🎯 ${data.title} — Exercices interactifs</h2>
        <div class="exercise-tabs">
            <button class="active" onclick="ExerciseEngine.switchTab('guided', event)">📝 Guidés</button>
            <button onclick="ExerciseEngine.switchTab('quiz', event)">❓ Quiz</button>
            <button onclick="ExerciseEngine.switchTab('drag', event)">🔗 Glisser-déposer</button>
        </div>
        <div id="tab-guided" class="exercise-block active"></div>
        <div id="tab-quiz" class="exercise-block"></div>
        <div id="tab-drag" class="exercise-block"></div>
    `;

    renderGuided(data.guided, document.getElementById('tab-guided'));
    renderQuiz(data.quiz, document.getElementById('tab-quiz'));
    renderDrag(data.drag, document.getElementById('tab-drag'));
}

document.addEventListener('DOMContentLoaded', init);

/* ---------- API PUBLIQUE ---------- */
return {
    switchTab(tab, evt) {
        document.querySelectorAll('.exercise-block').forEach(b => b.classList.remove('active'));
        document.querySelectorAll('.exercise-tabs button').forEach(b => b.classList.remove('active'));
        document.getElementById('tab-' + tab)?.classList.add('active');
        if (evt && evt.target) evt.target.classList.add('active');
    },
    showGuidedAnswer(btn) {
        const hint = btn.nextElementSibling;
        hint.classList.toggle('visible');
        btn.textContent = hint.classList.contains('visible') ? '🙈 Masquer' : '💡 Voir l\'indice';
    },
    checkGuided(btn) {
        const input = btn.previousElementSibling;
        const correct = input.dataset.answer.trim().toLowerCase();
        const userVal = input.value.trim().toLowerCase();
        input.classList.remove('correct', 'wrong');
        input.classList.add(userVal === correct ? 'correct' : 'wrong');
    },
    selectQuiz(option, index) {
        const parent = option.closest('.quiz-exercise');
        const answer = parseInt(parent.dataset.answer);
        const isCorrect = index === answer;
        parent.querySelectorAll('.quiz-option').forEach((o, i) => {
            o.classList.remove('selected', 'correct', 'wrong');
            if (i === answer) o.classList.add('correct');
            else if (i === index && i !== answer) o.classList.add('wrong');
        });
        if (typeof GameEngine !== 'undefined') GameEngine.exerciseCompleted(isCorrect);
    },
    handleDragStart(e) {
        e.dataTransfer.setData('text/plain', e.target.textContent);
        e.target.classList.add('placed');
    },
    handleDragEnd(e) {
        e.target.classList.remove('placed');
    },
    handleDragOver(e) {
        e.preventDefault();
        e.currentTarget.classList.add('over');
    },
    handleDragLeave(e) {
        e.currentTarget.classList.remove('over');
    },
    handleDrop(e) {
        e.preventDefault();
        e.currentTarget.classList.remove('over');
        const val = e.dataTransfer.getData('text/plain');
        const item = document.createElement('div');
        item.className = 'drag-item';
        item.textContent = val;
        item.draggable = true;
        item.ondragstart = ExerciseEngine.handleDragStart;
        item.ondragend = ExerciseEngine.handleDragEnd;
        e.currentTarget.appendChild(item);
        // Remove from bank
        const bank = e.currentTarget.closest('.dragdrop-exercise').querySelector('.drag-bank');
        bank.querySelectorAll('.drag-item').forEach(d => {
            if (d.textContent === val && !d.parentElement.classList.contains('drop-zone')) d.remove();
        });
    },
    checkDrag(btn) {
        const parent = btn.closest('.dragdrop-exercise');
        parent.querySelectorAll('.drop-zone').forEach(zone => {
            const expected = zone.dataset.answer;
            const items = zone.querySelectorAll('.drag-item');
            const val = items.length ? items[items.length - 1].textContent : '';
            zone.classList.remove('correct', 'wrong');
            zone.classList.add(val === expected ? 'correct' : 'wrong');
        });
    }
};

})();

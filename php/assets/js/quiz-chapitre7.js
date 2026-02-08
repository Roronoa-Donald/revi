// ===============================================
// QUIZ CHAPITRE 7 - PROJET INITIALISATION
// ===============================================

window.quizChapitre7 = {
    questions: [
        {
            id: 1,
            question: "Dans le pattern MVC, où doit-on placer le code SQL ?",
            options: [
                "Dans le Contrôleur (Controller)",
                "Dans la Vue (View)",
                "Dans le Modèle (Model)",
                "Dans le fichier index.php"
            ],
            correct: 2,
            explanation: "Le Modèle est responsable de l'accès aux données. Le SQL ne doit jamais se trouver dans la Vue ou le Contrôleur."
        },
        {
            id: 2,
            question: "Quel design pattern est souvent utilisé pour la connexion BDD pour éviter de multiples connexions ?",
            options: [
                "Factory",
                "Singleton",
                "Observer",
                "Strategy"
            ],
            correct: 1,
            explanation: "Le Singleton garantit qu'une classe n'a qu'une seule instance et fournit un point d'accès global à celle-ci."
        },
        {
            id: 3,
            question: "Quel est le rôle du fichier .htaccess dans notre architecture ?",
            options: [
                "Sécuriser les mots de passe",
                "Optimiser le CSS",
                "Rediriger toutes les requêtes vers index.php (URL Rewriting)",
                "Configurer la base de données"
            ],
            correct: 2,
            explanation: "Il permet de réécrire les URLs pour que toutes les demandes passent par notre point d'entrée unique (index.php)."
        },
        {
            id: 4,
            question: "Que contient généralement le dossier /public ?",
            options: [
                "Les mots de passe",
                "Les fichiers contrôleurs",
                "Le point d'entrée (index.php) et les assets (CSS/JS/Images)",
                "La base de données"
            ],
            correct: 2,
            explanation: "C'est le seul dossier accessible directement par le navigateur pour des raisons de sécurité."
        },
        {
            id: 5,
            question: "Pourquoi créer une classe abstraite 'Model' ?",
            options: [
                "Pour faire joli",
                "Pour factoriser le code commun (comme la connexion BDD) pour tous les modèles",
                "C'est obligatoire en PHP 8",
                "Pour empêcher l'utilisation de la BDD"
            ],
            correct: 1,
            explanation: "L'héritage permet à tous nos modèles (Task, User...) de récupérer la connexion BDD sans la redéfinir à chaque fois."
        }
    ]
};
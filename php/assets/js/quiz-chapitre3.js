// ===============================================
// QUIZ CHAPITRE 3 - Autoloading, Namespaces, Traits
// ===============================================

window.quizChapitre3 = {
    questions: [
        {
            id: 1,
            question: "Quelle fonction permet d'enregistrer un autoloader en PHP ?",
            options: [
                "__autoload()",
                "spl_autoload_register()",
                "require_all()",
                "auto_load_class()"
            ],
            correct: 1,
            explanation: "spl_autoload_register() est la méthode recommandée pour enregistrer une fonction de chargement automatique des classes."
        },
        {
            id: 2,
            question: "À quoi servent les Namespaces (espaces de noms) ?",
            options: [
                "À inclure des fichiers CSS",
                "À éviter les conflits de noms de classes/fonctions",
                "À sécuriser la base de données",
                "À gérer les sessions"
            ],
            correct: 1,
            explanation: "Les Namespaces permettent d'organiser le code et d'éviter les collisions si deux classes portent le même nom."
        },
        {
            id: 3,
            question: "Quel mot-clé utilise-t-on pour déclarer un Namespace ?",
            options: [
                "package",
                "use",
                "namespace",
                "include"
            ],
            correct: 2,
            explanation: "On utilise le mot-clé 'namespace' au tout début du fichier PHP."
        },
        {
            id: 4,
            question: "Qu'est-ce qu'un Trait en PHP ?",
            options: [
                "Une classe qui hérite de tout",
                "Une interface graphique",
                "Un mécanisme de réutilisation de code horizontal",
                "Une variable constante"
            ],
            correct: 2,
            explanation: "Les Traits permettent de réutiliser des ensembles de méthodes dans plusieurs classes indépendantes (similaire à un copier-coller intelligent)."
        },
        {
            id: 5,
            question: "Quelle est la différence principale entre require et include ?",
            options: [
                "Aucune différence",
                "include arrête le script en cas d'erreur, require continue",
                "require arrête le script en cas d'erreur, include génère juste un warning",
                "require est plus rapide"
            ],
            correct: 2,
            explanation: "require génère une erreur fatale et stoppe le script si le fichier est manquant, alors qu'include ne génère qu'une alerte."
        }
    ]
};

document.addEventListener('DOMContentLoaded', () => {
    if (typeof initQuiz === 'function') {
        initQuiz('quiz-container', quizChapitre3);
    }
});
// QUIZ CHAPITRE 5 - PDO

window.quizChapitre5 = {
    questions: [
        {
            id: 1,
            question: "Que signifie PDO ?",
            options: [
                "PHP Database Object",
                "PHP Data Objects",
                "Public Data Organization",
                "Private Database Owner"
            ],
            correct: 1,
            explanation: "PDO signifie PHP Data Objects, une interface pour accéder aux bases de données depuis PHP."
        },
        {
            id: 2,
            question: "Pourquoi utiliser des requêtes préparées (prepare) ?",
            options: [
                "Pour aller plus vite uniquement",
                "Pour éviter les injections SQL (sécurité)",
                "C'est la seule façon de faire du SQL",
                "Pour préparer le café"
            ],
            correct: 1,
            explanation: "Les requêtes préparées séparent la requête SQL des données, empêchant ainsi les attaques par injection SQL."
        },
        {
            id: 3,
            question: "Quelle méthode exécute une requête préparée ?",
            options: [
                "run()",
                "query()",
                "execute()",
                "start()"
            ],
            correct: 2,
            explanation: "Après avoir préparé une requête avec prepare(), on l'exécute avec la méthode execute()."
        },
        {
            id: 4,
            question: "Par défaut, comment PDO renvoie-t-il les résultats d'un fetch() ?",
            options: [
                "Uniquement sous forme d'objet",
                "Uniquement sous forme de tableau associatif",
                "Sous forme de tableau mixte (indexé et associatif)",
                "Sous forme de JSON"
            ],
            correct: 2,
            explanation: "Par défaut (PDO::FETCH_BOTH), PDO renvoie un tableau doublé (clés numériques et noms des colonnes)."
        },
        {
            id: 5,
            question: "Comment gérer les erreurs avec PDO en mode Exception ?",
            options: [
                "Avec des if/else",
                "En configurant l'attribut PDO::ATTR_ERRMODE à PDO::ERRMODE_EXCEPTION",
                "C'est impossible",
                "En regardant les logs serveur"
            ],
            correct: 1,
            explanation: "On configure PDO pour qu'il lance des exceptions en cas d'erreur SQL, ce qui permet d'utiliser try/catch."
        }
    ]
};

document.addEventListener('DOMContentLoaded', () => {
    if (typeof initQuiz === 'function') {
        initQuiz('quiz-container', quizChapitre5);
    }
});
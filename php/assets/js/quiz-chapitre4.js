// ===============================================
// QUIZ CHAPITRE 4 - Gestion des erreurs
// ===============================================

window.quizChapitre4 = {
    questions: [
        {
            id: 1,
            question: "Quelle interface est à la racine de toutes les exceptions et erreurs en PHP 7+ ?",
            options: [
                "Error",
                "Throwable",
                "Exception",
                "BaseException"
            ],
            correct: 1,
            explanation: "Depuis PHP 7, l'interface 'Throwable' est la racine commune de 'Exception' et 'Error'. Tout objet lancé avec throw doit implémenter Throwable."
        },
        {
            id: 2,
            question: "Quel bloc est toujours exécuté, qu'il y ait une erreur ou non ?",
            options: [
                "finally",
                "catch",
                "try",
                "else"
            ],
            correct: 0,
            explanation: "Le bloc 'finally' (optionnel) s'exécute toujours à la fin du try/catch, erreur ou pas."
        },
        {
            id: 3,
            question: "Comment lancer manuellement une exception ?",
            options: [
                "raise new Exception()",
                "throw new Exception()",
                "jump new Exception()",
                "error new Exception()"
            ],
            correct: 1,
            explanation: "On utilise le mot-clé 'throw' pour lancer une instance d'Exception."
        },
        {
            id: 4,
            question: "Que se passe-t-il si une exception n'est pas attrapée (uncaught) ?",
            options: [
                "Rien, le script continue",
                "Le script s'arrête avec une erreur fatale",
                "PHP redémarre",
                "La variable est mise à null"
            ],
            correct: 1,
            explanation: "Une exception non gérée (uncaught exception) provoque une erreur fatale et l'arrêt du script."
        },
        {
            id: 5,
            question: "À quoi sert le bloc catch ?",
            options: [
                "À définir l'erreur",
                "À lancer l'erreur",
                "À attraper et traiter l'erreur survenue dans le try",
                "À arrêter le script"
            ],
            correct: 2,
            explanation: "Le bloc catch définit comment réagir si une exception d'un certain type survient dans le bloc try associé."
        }
    ]
};

document.addEventListener('DOMContentLoaded', () => {
    if (typeof initQuiz === 'function') {
        initQuiz('quiz-container', quizChapitre4);
    }
});
// ===============================================
// QUIZ CHAPITRE 2 - Concepts avancés POO
// ===============================================

window.quizChapitre2 = {
    questions: [
        {
            id: 1,
            question: "Quel mot-clé est utilisé pour l'héritage en PHP ?",
            options: [
                "inherits",
                "extends",
                "implements",
                "parent"
            ],
            correct: 1,
            explanation: "En PHP, une classe hérite d'une autre avec le mot-clé 'extends'."
        },
        {
            id: 2,
            question: "Peut-on instancier une classe abstraite ?",
            options: [
                "Oui, toujours",
                "Non, jamais",
                "Seulement si elle n'a pas de méthodes abstraites",
                "Oui, avec le mot clé new static()"
            ],
            correct: 1,
            explanation: "Une classe abstraite ne peut pas être instanciée directement. Elle sert de modèle pour les classes filles."
        },
        {
            id: 3,
            question: "Quelle est la particularité d'une interface ?",
            options: [
                "Elle peut contenir des propriétés privées",
                "Elle peut implémenter des méthodes",
                "Elle ne contient que des signatures de méthodes publiques",
                "Elle s'hérite avec extends"
            ],
            correct: 2,
            explanation: "Une interface définit un contrat : elle déclare des méthodes (publiques) sans les implémenter."
        },
        {
            id: 4,
            question: "Comment appeler le constructeur de la classe mère ?",
            options: [
                "super::__construct()",
                "parent::__construct()",
                "this->parent->__construct()",
                "Father::__construct()"
            ],
            correct: 1,
            explanation: "On utilise parent::__construct() pour faire appel au constructeur de la classe parente."
        },
        {
            id: 5,
            question: "Le polymorphisme permet :",
            options: [
                "D'avoir plusieurs classes avec le même nom",
                "De modifier le type d'une variable dynamiquement",
                "À différentes classes de répondre à la même méthode de façon spécifique",
                "D'hériter de plusieurs classes à la fois"
            ],
            correct: 2,
            explanation: "C'est la capacité d'objets différents (mais liés par héritage/interface) à répondre au même message (méthode) avec leur propre comportement."
        }
    ]
};

// Initialisation du quiz si le conteneur existe
document.addEventListener('DOMContentLoaded', () => {
    if (typeof initQuiz === 'function') {
        initQuiz('quiz-container', quizChapitre2);
    }
});
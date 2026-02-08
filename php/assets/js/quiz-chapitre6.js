// QUIZ CHAPITRE 6

window.quizChapitre6 = {
    questions: [
        {
            id: 1,
            question: "Que signifie MVC ?",
            options: [
                "Model View Controller",
                "Multiple View Configuration",
                "Make Verify Commit",
                "Model Variable Connector"
            ],
            correct: 0,
            explanation: "MVC est un patron d'architecture logicielle : Modèle, Vue, Contrôleur."
        },
        {
            id: 2,
            question: "Quel est le rôle du Contrôleur (Controller) ?",
            options: [
                "Stocker les données",
                "Afficher le HTML",
                "Recevoir la requête, orchestrer la logique et choisir la vue",
                "Gérer le CSS"
            ],
            correct: 2,
            explanation: "Le Contrôleur fait le lien entre l'utilisateur (requête), les données (Modèle) et l'affichage (Vue)."
        },
        {
            id: 3,
            question: "Où doit-on placer la logique métier et l'accès aux données ?",
            options: [
                "Dans la Vue",
                "Dans le Contrôleur",
                "Dans le Modèle",
                "Dans le fichier index.php"
            ],
            correct: 2,
            explanation: "Le Modèle est responsable des données et de la logique métier de l'application."
        },
        {
            id: 4,
            question: "Qu'est-ce qu'un Routeur ?",
            options: [
                "Un appareil physique réseau",
                "Un composant qui analyse l'URL pour appeler le bon contrôleur",
                "Une fonction qui calcule le chemin le plus court",
                "Un fichier de configuration Apache"
            ],
            correct: 1,
            explanation: "Dans le Web MVC, le routeur dirige la requête HTTP entrante vers l'action appropriée du bon contrôleur."
        },
        {
            id: 5,
            question: "Quel est l'avantage principal de l'architecture MVC ?",
            options: [
                "C'est plus facile pour les débutants",
                "Séparation des préoccupations (logique, affichage, données)",
                "Ça utilise moins de mémoire",
                "C'est obligatoire en PHP"
            ],
            correct: 1,
            explanation: "MVC permet de bien séparer le code, ce qui facilite la maintenance, le travail en équipe et l'évolution du projet."
        }
    ]
};

document.addEventListener('DOMContentLoaded', () => {
    if (typeof initQuiz === 'function') {
        initQuiz('quiz-container', quizChapitre6);
    }
});
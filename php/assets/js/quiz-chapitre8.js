// ===============================================
// QUIZ CHAPITRE 8 - PROJET FINALISATION
// ===============================================

window.quizChapitre8 = {
    questions: [
        {
            id: 1,
            question: "Que signifie l'acronyme CRUD ?",
            options: [
                "Create, Read, Update, Delete",
                "Code, Run, Use, Debug",
                "Connect, Read, User, Database",
                "Create, Remove, Undo, Done"
            ],
            correct: 0,
            explanation: "Ce sont les 4 opérations fondamentales de la persistance des données."
        },
        {
            id: 2,
            question: "Dans un formulaire HTML, quel attribut 'method' doit-on utiliser pour envoyer des données sensibles ?",
            options: [
                "GET",
                "POST",
                "PUT",
                "SEND"
            ],
            correct: 1,
            explanation: "POST envoie les données dans le corps de la requête HTTP, contrairement à GET qui les met dans l'URL (visible)."
        },
        {
            id: 3,
            question: "Comment rediriger l'utilisateur vers une autre page en PHP ?",
            options: [
                "redirect('url');",
                "header('Location: url');",
                "window.location = 'url';",
                "return 'url';"
            ],
            correct: 1,
            explanation: "La fonction header() permet d'envoyer des en-têtes HTTP bruts. 'Location:' demande une redirection au navigateur."
        },
        {
            id: 4,
            question: "Pourquoi utiliser htmlspecialchars() lors de l'affichage ?",
            options: [
                "Pour corriger les fautes d'orthographe",
                "Pour mettre le texte en gras",
                "Pour se protéger contre les failles XSS (Cross-Site Scripting)",
                "Pour encoder en Base64"
            ],
            correct: 2,
            explanation: "Cette fonction convertit les caractères spéciaux en entités HTML, empêchant l'exécution de scripts malveillants injectés."
        },
        {
            id: 5,
            question: "Quelle superglobale contient les données d'un formulaire envoyé en POST ?",
            options: [
                "$_GET",
                "$_SERVER",
                "$_POST",
                "$_FILES"
            ],
            correct: 2,
            explanation: "PHP remplit automatiquement le tableau associatif $_POST avec les données du corps de la requête."
        }
    ]
};
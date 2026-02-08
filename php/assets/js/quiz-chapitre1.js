// ===============================================
// QUIZ CHAPITRE 1 - PHP POO
// ===============================================

window.quizChapitre1 = {
    questions: [
        {
            id: 1,
            question: "Qui est le créateur du langage PHP ?",
            options: [
                "Rasmus Lerdorf",
                "Brendan Eich",
                "Guido van Rossum",
                "James Gosling"
            ],
            correct: 0,
            explanation: "PHP a été créé par Rasmus Lerdorf en 1994."
        },
        {
            id: 2,
            question: "Que signifie l'acronyme PHP ?",
            options: [
                "Personal Home Page",
                "PHP: Hypertext Preprocessor",
                "Programming Hypertext Pages",
                "Private Homepage Protocol"
            ],
            correct: 1,
            explanation: "PHP signifie 'PHP: Hypertext Preprocessor' (acronyme récursif)."
        },
        {
            id: 3,
            question: "Comment déclare-t-on une variable en PHP ?",
            options: [
                "var nom;",
                "let $nom;",
                "$nom = 'valeur';",
                "variable nom = 'valeur';"
            ],
            correct: 2,
            explanation: "En PHP, les variables commencent toujours par le symbole $ : $nom = 'valeur';"
        },
        {
            id: 4,
            question: "Quel est le résultat de : $a = 5; $b = $a++; ?",
            options: [
                "$a = 5, $b = 5",
                "$a = 6, $b = 6",
                "$a = 6, $b = 5",
                "$a = 5, $b = 6"
            ],
            correct: 2,
            explanation: "L'opérateur ++ après la variable incrémente après l'affectation. Donc $b prend la valeur 5, puis $a devient 6."
        },
        {
            id: 5,
            question: "Quelle est la syntaxe correcte pour définir une constante ?",
            options: [
                "$CONSTANTE = 'valeur';",
                "const CONSTANTE = 'valeur';",
                "Les deux réponses sont correctes",
                "define('CONSTANTE', 'valeur');"
            ],
            correct: 2,
            explanation: "On peut définir une constante avec define('NOM', valeur) ou avec const NOM = valeur;"
        },
        {
            id: 6,
            question: "Quels sont les 4 piliers de la POO ?",
            options: [
                "Classe, Objet, Variable, Fonction",
                "Encapsulation, Héritage, Polymorphisme, Abstraction",
                "Public, Private, Protected, Static",
                "If, For, While, Switch"
            ],
            correct: 1,
            explanation: "Les 4 piliers de la POO sont : Encapsulation, Héritage, Polymorphisme et Abstraction."
        },
        {
            id: 7,
            question: "Comment crée-t-on un objet à partir d'une classe ?",
            options: [
                "class.new()",
                "$objet = create Classe();",
                "$objet = new Classe();",
                "Classe objet = new();"
            ],
            correct: 2,
            explanation: "On crée un objet avec le mot-clé 'new' : $objet = new Classe();"
        },
        {
            id: 8,
            question: "À quoi sert le mot-clé '$this' dans une classe ?",
            options: [
                "Il crée une nouvelle instance",
                "Il fait référence à l'objet courant",
                "Il définit une méthode statique",
                "Il déclare un constructeur"
            ],
            correct: 1,
            explanation: "$this fait référence à l'instance actuelle de la classe (l'objet courant)."
        },
        {
            id: 9,
            question: "Quelle est la différence entre public, private et protected ?",
            options: [
                "Il n'y a aucune différence",
                "La portée d'accès aux propriétés et méthodes",
                "La vitesse d'exécution du code",
                "Le type de données qu'ils peuvent contenir"
            ],
            correct: 1,
            explanation: "Ces modificateurs définissent la portée : public (partout), protected (classe + enfants), private (classe uniquement)."
        },
        {
            id: 10,
            question: "Comment s'appelle la méthode appelée automatiquement lors de la création d'un objet ?",
            options: [
                "__init()",
                "__create()",
                "__construct()",
                "__start()"
            ],
            correct: 2,
            explanation: "Le constructeur en PHP s'appelle __construct() et est appelé automatiquement avec 'new'."
        }
    ]
};

// === INITIALISATION DU QUIZ ===
let currentAnswers = {};
let quizSubmitted = false;

document.addEventListener('DOMContentLoaded', () => {
    if (document.querySelector('.quiz-container')) {
        renderQuiz();
        initQuizEvents();
    }
});

function renderQuiz() {
    const container = document.getElementById('quizContainer');
    if (!container) return;
    
    container.innerHTML = quizChapitre1.questions.map((q, index) => `
        <div class="quiz-question" id="question-${q.id}">
            <div class="question-header">
                <div class="question-number">${q.id}</div>
                <div class="question-text">${q.question}</div>
            </div>
            <div class="quiz-options">
                ${q.options.map((option, optIndex) => `
                    <label class="quiz-option" data-question="${q.id}" data-option="${optIndex}">
                        <input type="radio" name="question-${q.id}" value="${optIndex}">
                        <span>${option}</span>
                    </label>
                `).join('')}
            </div>
            <div class="question-feedback" id="feedback-${q.id}" style="display: none;"></div>
        </div>
    `).join('');
}

function initQuizEvents() {
    // Enregistrer les réponses
    document.querySelectorAll('.quiz-option input').forEach(input => {
        input.addEventListener('change', (e) => {
            const questionId = parseInt(e.target.name.split('-')[1]);
            const optionIndex = parseInt(e.target.value);
            currentAnswers[questionId] = optionIndex;
            
            // Mise à jour visuelle
            document.querySelectorAll(`[data-question="${questionId}"]`).forEach(opt => {
                opt.classList.remove('selected');
            });
            e.target.closest('.quiz-option').classList.add('selected');
        });
    });
    
    // Bouton Valider
    const submitBtn = document.getElementById('submitQuiz');
    if (submitBtn) {
        submitBtn.addEventListener('click', submitQuiz);
    }
    
    // Bouton Recommencer
    const resetBtn = document.getElementById('resetQuiz');
    if (resetBtn) {
        resetBtn.addEventListener('click', resetQuiz);
    }
}

function submitQuiz() {
    if (quizSubmitted) {
        showNotification('Vous avez déjà validé ce quiz !', 'warning');
        return;
    }
    
    // Vérifier que toutes les questions ont une réponse
    if (Object.keys(currentAnswers).length < quizChapitre1.questions.length) {
        showNotification('Veuillez répondre à toutes les questions !', 'warning');
        return;
    }
    
    quizSubmitted = true;
    
    // Calculer le score
    let correctCount = 0;
    
    quizChapitre1.questions.forEach(question => {
        const userAnswer = currentAnswers[question.id];
        const isCorrect = userAnswer === question.correct;
        
        if (isCorrect) {
            correctCount++;
        }
        
        // Afficher le feedback
        displayQuestionFeedback(question, userAnswer, isCorrect);
    });
    
    // Afficher les résultats
    displayQuizResults(correctCount);
    
    // Désactiver les options
    document.querySelectorAll('.quiz-option input').forEach(input => {
        input.disabled = true;
    });
    
    // Scroll vers les résultats
    document.getElementById('quizResults').scrollIntoView({ behavior: 'smooth' });
}

function displayQuestionFeedback(question, userAnswer, isCorrect) {
    const feedbackDiv = document.getElementById(`feedback-${question.id}`);
    const options = document.querySelectorAll(`[data-question="${question.id}"]`);
    
    // Marquer les options
    options.forEach((option, index) => {
        if (index === question.correct) {
            option.classList.add('correct');
        } else if (index === userAnswer && !isCorrect) {
            option.classList.add('incorrect');
        }
    });
    
    // Afficher l'explication
    feedbackDiv.style.display = 'block';
    feedbackDiv.className = `question-feedback ${isCorrect ? 'feedback-correct' : 'feedback-incorrect'}`;
    feedbackDiv.innerHTML = `
        <div class="feedback-icon">
            <i class="fas fa-${isCorrect ? 'check-circle' : 'times-circle'}"></i>
        </div>
        <div class="feedback-text">
            <strong>${isCorrect ? 'Correct !' : 'Incorrect'}</strong>
            <p>${question.explanation}</p>
        </div>
    `;
}

function displayQuizResults(correctCount) {
    const totalQuestions = quizChapitre1.questions.length;
    const percentage = (correctCount / totalQuestions) * 100;
    const resultsDiv = document.getElementById('quizResults');
    
    // Déterminer le message en fonction du score
    let message = '';
    let emoji = '';
    let color = '';
    
    if (percentage >= 90) {
        message = 'Excellent ! Vous maîtrisez parfaitement ce chapitre !';
        emoji = '🏆';
        color = '#10b981';
    } else if (percentage >= 70) {
        message = 'Très bien ! Vous avez une bonne compréhension du sujet.';
        emoji = '👍';
        color = '#3b82f6';
    } else if (percentage >= 50) {
        message = 'Pas mal ! Il serait bon de revoir certains points.';
        emoji = '📚';
        color = '#f59e0b';
    } else {
        message = 'Il faut encore travailler. Relisez le chapitre attentivement.';
        emoji = '💪';
        color = '#ef4444';
    }
    
    resultsDiv.style.display = 'block';
    resultsDiv.innerHTML = `
        <div class="quiz-score" style="color: ${color};">
            ${emoji}<br>
            ${correctCount}/${totalQuestions}
        </div>
        <div class="quiz-message">${message}</div>
        <div class="quiz-percentage" style="color: ${color};">
            ${percentage.toFixed(0)}% de réussite
        </div>
        <div class="quiz-details">
            <div class="detail-item">
                <i class="fas fa-check-circle" style="color: #10b981;"></i>
                <span>${correctCount} réponse${correctCount > 1 ? 's' : ''} correcte${correctCount > 1 ? 's' : ''}</span>
            </div>
            <div class="detail-item">
                <i class="fas fa-times-circle" style="color: #ef4444;"></i>
                <span>${totalQuestions - correctCount} réponse${totalQuestions - correctCount > 1 ? 's' : ''} incorrecte${totalQuestions - correctCount > 1 ? 's' : ''}</span>
            </div>
        </div>
        <div class="quiz-actions" style="margin-top: 1.5rem;">
            <button class="btn btn-primary" onclick="scrollToTop()">
                <i class="fas fa-arrow-up"></i> Revoir les questions
            </button>
            <a href="chapitre2.html" class="btn btn-secondary">
                Chapitre suivant <i class="fas fa-arrow-right"></i>
            </a>
        </div>
    `;
    
    // Mettre à jour le score dans l'interface
    document.getElementById('quizScore').textContent = `Score : ${correctCount}/${totalQuestions}`;
    
    // Sauvegarder le résultat
    saveQuizResult(1, correctCount, totalQuestions, percentage);
}

function resetQuiz() {
    if (!confirm('Êtes-vous sûr de vouloir recommencer le quiz ?')) {
        return;
    }
    
    // Réinitialiser les variables
    currentAnswers = {};
    quizSubmitted = false;
    
    // Réactiver les inputs
    document.querySelectorAll('.quiz-option input').forEach(input => {
        input.disabled = false;
        input.checked = false;
    });
    
    // Retirer les classes de feedback
    document.querySelectorAll('.quiz-option').forEach(option => {
        option.classList.remove('correct', 'incorrect', 'selected');
    });
    
    // Cacher les feedbacks
    document.querySelectorAll('.question-feedback').forEach(feedback => {
        feedback.style.display = 'none';
    });
    
    // Cacher les résultats
    document.getElementById('quizResults').style.display = 'none';
    
    // Scroll vers le début du quiz
    document.getElementById('quiz').scrollIntoView({ behavior: 'smooth' });
    
    showNotification('Quiz réinitialisé !', 'info');
}

function saveQuizResult(chapterId, correct, total, percentage) {
    let quizResults = JSON.parse(localStorage.getItem('phpCourseQuizResults')) || {};
    
    if (!quizResults[chapterId] || percentage > quizResults[chapterId].percentage) {
        quizResults[chapterId] = {
            correct: correct,
            total: total,
            percentage: percentage,
            date: new Date().toISOString()
        };
        
        localStorage.setItem('phpCourseQuizResults', JSON.stringify(quizResults));
    }
}

function scrollToTop() {
    document.getElementById('quiz').scrollIntoView({ behavior: 'smooth', block: 'start' });
}

// Ajouter les styles pour le feedback
const quizStyles = document.createElement('style');
quizStyles.textContent = `
    .quiz-option.selected {
        border-color: var(--primary-color);
        background-color: var(--primary-lighter);
    }
    
    .question-feedback {
        margin-top: 1rem;
        padding: 1rem;
        border-radius: 8px;
        display: flex;
        gap: 1rem;
        align-items: start;
    }
    
    .feedback-correct {
        background-color: #d1fae5;
        border-left: 4px solid #10b981;
    }
    
    .feedback-incorrect {
        background-color: #fee2e2;
        border-left: 4px solid #ef4444;
    }
    
    .feedback-icon {
        font-size: 2rem;
        flex-shrink: 0;
    }
    
    .feedback-correct .feedback-icon {
        color: #10b981;
    }
    
    .feedback-incorrect .feedback-icon {
        color: #ef4444;
    }
    
    .feedback-text strong {
        display: block;
        margin-bottom: 0.5rem;
    }
    
    .feedback-text p {
        margin: 0;
        font-size: 0.95rem;
    }
    
    .quiz-details {
        display: flex;
        flex-direction: column;
        gap: 0.5rem;
        margin-top: 1rem;
    }
    
    .detail-item {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        font-size: 1rem;
    }
    
    .detail-item i {
        font-size: 1.2rem;
    }
`;
document.head.appendChild(quizStyles);

console.log('✅ Quiz Chapitre 1 chargé !');

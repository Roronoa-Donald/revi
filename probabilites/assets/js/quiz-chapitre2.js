/**
 * Quiz Chapitre 2 - Dénombrement
 * 10 questions interactives avec vérification
 */

let quiz2Answers = {};


function checkQuiz2(questionId, correctAnswer, alternatives = []) {
    const input = document.getElementById(`input-${questionId}`);
    const feedback = document.getElementById(`feedback-${questionId}`);
    const card = document.getElementById(questionId);
    
    if (!input || !feedback || !card) return;
    
    const userAnswer = normalizeAnswer(input.value);
    const correct = normalizeAnswer(correctAnswer);
    const altAnswers = alternatives.map(a => normalizeAnswer(a));
    
    const isCorrect = userAnswer === correct || altAnswers.includes(userAnswer);
    
    card.classList.remove('correct', 'incorrect');
    feedback.classList.remove('correct', 'incorrect');
    
    quiz2Answers[questionId] = isCorrect;
    
    if (isCorrect) {
        card.classList.add('correct');
        feedback.classList.add('correct', 'show');
        feedback.innerHTML = '<i class="fas fa-check-circle"></i> Correct !';
    } else {
        card.classList.add('incorrect');
        feedback.classList.add('incorrect', 'show');
        feedback.innerHTML = `<i class="fas fa-times-circle"></i> Incorrect. Réponse : <strong>${correctAnswer}</strong>`;
    }
}

function calculateQuiz2Score() {
    const total = 10;
    let correct = 0;
    for (let i = 1; i <= total; i++) {
        if (quiz2Answers[`q2-${i}`] === true) correct++;
    }
    document.getElementById('quiz2-result').textContent = `${correct}/${total}`;
    document.getElementById('quiz2-score').style.display = 'block';
    document.getElementById('quiz2-score').scrollIntoView({ behavior: 'smooth', block: 'center' });

    // Intégration Gamification
    if (typeof GameEngine !== 'undefined') {
        GameEngine.completeQuiz('chapitre2', correct, total);
    }
}

function resetQuiz2() {
    quiz2Answers = {};
    for (let i = 1; i <= 10; i++) {
        const input = document.getElementById(`input-q2-${i}`);
        const feedback = document.getElementById(`feedback-q2-${i}`);
        const card = document.getElementById(`q2-${i}`);
        if (input) input.value = '';
        if (feedback) { feedback.classList.remove('show', 'correct', 'incorrect'); }
        if (card) { card.classList.remove('correct', 'incorrect'); }
    }
    document.getElementById('quiz2-score').style.display = 'none';
}

// Enter key listener
document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('[id^="input-q2-"]').forEach(input => {
        input.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                const checkBtn = this.parentElement.querySelector('.exercise-btn.check');
                if (checkBtn) checkBtn.click();
            }
        });
    });
});

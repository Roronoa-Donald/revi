/**
 * Système d'exercices avec indices progressifs
 * RD PROBAS - Cours interactif de probabilités
 */

// Stockage des réponses et indices utilisés
const exerciseState = {};

/**
 * Initialise un exercice avec indices
 * @param {string} exoId - ID unique de l'exercice
 * @param {string} correctAnswer - Réponse correcte
 * @param {string[]} alternatives - Réponses alternatives acceptées
 * @param {number} totalHints - Nombre total d'indices
 */
function initExerciseWithHints(exoId, correctAnswer, alternatives = [], totalHints = 3) {
    exerciseState[exoId] = {
        correctAnswer: correctAnswer,
        alternatives: alternatives,
        hintsUsed: 0,
        totalHints: totalHints,
        solved: false
    };
    updateHintsCounter(exoId);
}

/**
 * Normalise une réponse pour la comparaison
 */
function normalizeHintAnswer(answer) {
    return answer.toLowerCase()
        .replace(/\s+/g, '')
        .replace(/,/g, '.')
        .replace(/÷/g, '/')
        .replace(/×/g, '*')
        .trim();
}

/**
 * Vérifie la réponse d'un exercice
 */
function checkExerciseAnswer(exoId) {
    const state = exerciseState[exoId];
    if (!state) return;

    const input = document.getElementById(`answer-${exoId}`);
    const feedback = document.getElementById(`feedback-${exoId}`);
    const container = document.getElementById(exoId);
    
    if (!input || !feedback) return;

    const userAnswer = normalizeHintAnswer(input.value);
    const correct = normalizeHintAnswer(state.correctAnswer);
    const altAnswers = state.alternatives.map(a => normalizeHintAnswer(a));
    
    const isCorrect = userAnswer === correct || altAnswers.includes(userAnswer);
    
    feedback.classList.remove('correct', 'incorrect');
    feedback.classList.add('show');
    
    if (isCorrect) {
        state.solved = true;
        feedback.classList.add('correct');
        feedback.innerHTML = `<i class="fas fa-check-circle"></i> Excellent ! Bonne réponse !`;
        if (container) {
            container.style.borderColor = 'var(--success)';
            container.style.boxShadow = '0 0 20px rgba(16, 185, 129, 0.2)';
        }
    } else {
        feedback.classList.add('incorrect');
        const hintsRemaining = state.totalHints - state.hintsUsed;
        if (hintsRemaining > 0) {
            feedback.innerHTML = `<i class="fas fa-times-circle"></i> Incorrect. Utilisez les indices pour vous aider ! (${hintsRemaining} indice(s) restant(s))`;
        } else {
            feedback.innerHTML = `<i class="fas fa-times-circle"></i> Incorrect. Consultez la solution complète.`;
        }
    }
}

/**
 * Met à jour le compteur d'indices
 */
function updateHintsCounter(exoId) {
    const state = exerciseState[exoId];
    if (!state) return;

    const counter = document.getElementById(`hints-counter-${exoId}`);
    if (counter) {
        counter.textContent = `${state.hintsUsed}/${state.totalHints} indices utilisés`;
    }
}

/**
 * Compte un indice comme utilisé quand il est ouvert
 */
function onHintOpened(exoId, hintNumber) {
    const state = exerciseState[exoId];
    if (!state) return;

    // Vérifie si cet indice a déjà été compté
    const hintElement = document.getElementById(`hint-${exoId}-${hintNumber}`);
    if (hintElement && !hintElement.dataset.counted) {
        state.hintsUsed = Math.max(state.hintsUsed, hintNumber);
        hintElement.dataset.counted = 'true';
        updateHintsCounter(exoId);
    }
}

/**
 * Configure les écouteurs d'événements pour les indices
 */
function setupHintListeners() {
    document.querySelectorAll('.hint-item').forEach(hint => {
        hint.addEventListener('toggle', function() {
            if (this.open) {
                const exoId = this.dataset.exoId;
                const hintNumber = parseInt(this.dataset.hintNumber);
                onHintOpened(exoId, hintNumber);
            }
        });
    });

    // Enter pour vérifier
    document.querySelectorAll('.exercise-with-hints .answer-input').forEach(input => {
        input.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                const exoId = this.id.replace('answer-', '');
                checkExerciseAnswer(exoId);
            }
        });
    });
}

// Initialisation au chargement
document.addEventListener('DOMContentLoaded', setupHintListeners);

// ===============================================
// COURS PHP POO - JAVASCRIPT PRINCIPAL
// ===============================================

// === VARIABLES GLOBALES ===
let notes = JSON.parse(localStorage.getItem('phpCourseNotes')) || [];
let progress = JSON.parse(localStorage.getItem('phpCourseProgress')) || {
    chapters: {},
    lastVisited: null
};

// === INITIALISATION ===
document.addEventListener('DOMContentLoaded', () => {
    initApp();
});

function initApp() {
    // Initialiser les fonctionnalités communes
    initProgressBar();
    initNotes();
    initBookmarks();
    initTabs();
    initTableOfContents();
    initCopyButtons();
    initCodeRunner();
    initThemeToggle(); // Thème clair/sombre

    // Nouvelles fonctionnalités
    initBadges();     // Gestion des trophées
    initSandbox();    // Boutons "Tester le code"
    initFlashcards(); // Système de révision
    
    // Initialiser les fonctionnalités spécifiques
    if (document.querySelector('.chapters-grid')) {
        initChaptersProgress();
    }
    
    if (document.querySelector('.quiz-container')) {
        initQuiz();
    }
    
    // Bouton "Continuer là où j'étais"
    const continueBtn = document.getElementById('continueBtn');
    if (continueBtn) {
        continueBtn.addEventListener('click', continueFromLastVisit);
    }
}

// === BARRE DE PROGRESSION ===
function initProgressBar() {
    const progressBar = document.getElementById('chapterProgress') || document.getElementById('globalProgress');
    if (!progressBar) return;
    
    // Progression basée sur le scroll pour les pages de chapitre
    if (document.querySelector('.chapter-page')) {
        window.addEventListener('scroll', () => {
            const windowHeight = window.innerHeight;
            const documentHeight = document.documentElement.scrollHeight - windowHeight;
            const scrolled = window.scrollY;
            const progress = (scrolled / documentHeight) * 100;
            
            progressBar.style.width = progress + '%';
            
            // Sauvegarder la progression
            saveChapterProgress();
        });
    }
    
    // Progression globale sur la page d'accueil
    if (document.querySelector('.chapters-grid')) {
        updateGlobalProgress();
    }
}

function saveChapterProgress() {
    const chapterPage = document.querySelector('.chapter-page');
    if (!chapterPage) return;
    
    const chapterNumber = getCurrentChapterNumber();
    if (!chapterNumber) return;
    
    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight - windowHeight;
    const scrolled = window.scrollY;
    const progressPercent = Math.min((scrolled / documentHeight) * 100, 100);
    
    progress.chapters[chapterNumber] = progressPercent;
    progress.lastVisited = window.location.pathname;
    
    localStorage.setItem('phpCourseProgress', JSON.stringify(progress));
}

function getCurrentChapterNumber() {
    const path = window.location.pathname;
    const match = path.match(/chapitre(\d+)\.html/);
    return match ? parseInt(match[1]) : null;
}

function updateGlobalProgress() {
    const progressBar = document.getElementById('globalProgress');
    if (!progressBar) return;
    
    const totalChapters = 8;
    const completedChapters = Object.values(progress.chapters).filter(p => p >= 90).length;
    const globalPercent = (completedChapters / totalChapters) * 100;
    
    progressBar.style.width = globalPercent + '%';
}

function initChaptersProgress() {
    const chapterCards = document.querySelectorAll('.chapter-card');
    
    chapterCards.forEach((card, index) => {
        const chapterNum = index + 1;
        const chapterProgress = progress.chapters[chapterNum] || 0;
        
        const progressFill = card.querySelector('.progress-fill');
        const progressPercent = card.querySelector('.progress-percent');
        
        if (progressFill && progressPercent) {
            progressFill.style.width = chapterProgress + '%';
            progressPercent.textContent = Math.round(chapterProgress) + '%';
            progressFill.setAttribute('data-progress', chapterProgress);
        }
    });
}

function continueFromLastVisit() {
    if (progress.lastVisited) {
        window.location.href = progress.lastVisited;
    } else {
        window.location.href = 'chapitre1.html';
    }
}

// === SYSTÈME DE NOTES ===
function initNotes() {
    const showNotesBtn = document.getElementById('showNotesBtn');
    const closeNotesBtn = document.getElementById('closeNotesBtn');
    const notesModal = document.getElementById('notesModal');
    
    if (showNotesBtn) {
        showNotesBtn.addEventListener('click', () => {
            displayNotes();
            notesModal.classList.add('active');
        });
    }
    
    if (closeNotesBtn) {
        closeNotesBtn.addEventListener('click', () => {
            notesModal.classList.remove('active');
        });
    }
    
    // Fermer le modal en cliquant à l'extérieur
    if (notesModal) {
        notesModal.addEventListener('click', (e) => {
            if (e.target === notesModal) {
                notesModal.classList.remove('active');
            }
        });
    }
}

function displayNotes() {
    const notesList = document.getElementById('notesList');
    if (!notesList) return;
    
    if (notes.length === 0) {
        notesList.innerHTML = `
            <div class="empty-notes">
                <i class="fas fa-sticky-note"></i>
                <p>Aucune note pour le moment</p>
                <small>Ajoutez des notes en cliquant sur les boutons dans les chapitres</small>
            </div>
        `;
        return;
    }
    
    notesList.innerHTML = notes.map((note, index) => `
        <div class="note-item">
            <h4>${note.title}</h4>
            <p>${note.content}</p>
            <small>${note.chapter} - ${note.date}</small>
            <div class="note-actions">
                <button onclick="viewNote(${index})" class="btn-view">
                    <i class="fas fa-eye"></i> Voir
                </button>
                <button onclick="deleteNote(${index})" class="btn-delete">
                    <i class="fas fa-trash"></i> Supprimer
                </button>
            </div>
        </div>
    `).join('');
}

function addNote(sectionId, title) {
    const content = prompt('Ajoutez votre note :');
    if (!content) return;
    
    const note = {
        id: Date.now(),
        sectionId: sectionId,
        title: title,
        content: content,
        chapter: document.title,
        date: new Date().toLocaleDateString('fr-FR'),
        url: window.location.pathname
    };
    
    notes.push(note);
    localStorage.setItem('phpCourseNotes', JSON.stringify(notes));
    
    showNotification('Note ajoutée avec succès !', 'success');
}

function deleteNote(index) {
    if (confirm('Voulez-vous vraiment supprimer cette note ?')) {
        notes.splice(index, 1);
        localStorage.setItem('phpCourseNotes', JSON.stringify(notes));
        displayNotes();
        showNotification('Note supprimée', 'info');
    }
}

function viewNote(index) {
    const note = notes[index];
    if (note && note.url) {
        window.location.href = note.url + '#' + note.sectionId;
    }
}

// === BOOKMARKS ===
function initBookmarks() {
    const bookmarkButtons = document.querySelectorAll('.btn-bookmark');
    
    bookmarkButtons.forEach(btn => {
        const sectionId = btn.dataset.section;
        
        // Vérifier si la section est déjà bookmarkée
        if (isBookmarked(sectionId)) {
            btn.classList.add('bookmarked');
        }
        
        btn.addEventListener('click', () => {
            toggleBookmark(btn, sectionId);
        });
    });
}

function toggleBookmark(btn, sectionId) {
    const section = document.getElementById(sectionId);
    if (!section) return;
    
    const sectionTitle = section.querySelector('h2').textContent;
    
    if (btn.classList.contains('bookmarked')) {
        // Retirer le bookmark
        removeBookmark(sectionId);
        btn.classList.remove('bookmarked');
        showNotification('Favori retiré', 'info');
    } else {
        // Ajouter le bookmark
        addBookmark(sectionId, sectionTitle);
        btn.classList.add('bookmarked');
        showNotification('Ajouté aux favoris', 'success');
    }
}

function isBookmarked(sectionId) {
    return notes.some(note => note.sectionId === sectionId && note.type === 'bookmark');
}

function addBookmark(sectionId, title) {
    const bookmark = {
        id: Date.now(),
        type: 'bookmark',
        sectionId: sectionId,
        title: title,
        chapter: document.title,
        date: new Date().toLocaleDateString('fr-FR'),
        url: window.location.pathname
    };
    
    notes.push(bookmark);
    localStorage.setItem('phpCourseNotes', JSON.stringify(notes));
}

function removeBookmark(sectionId) {
    notes = notes.filter(note => !(note.sectionId === sectionId && note.type === 'bookmark'));
    localStorage.setItem('phpCourseNotes', JSON.stringify(notes));
}

// === TABS ===
function initTabs() {
    const tabButtons = document.querySelectorAll('.tab-button');
    
    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            const tabId = button.dataset.tab;
            
            // Retirer active de tous les boutons et panes
            document.querySelectorAll('.tab-button').forEach(btn => btn.classList.remove('active'));
            document.querySelectorAll('.tab-pane').forEach(pane => pane.classList.remove('active'));
            
            // Activer le bouton et le pane correspondant
            button.classList.add('active');
            document.getElementById(tabId).classList.add('active');
        });
    });
}

// === TABLE DES MATIÈRES ===
function initTableOfContents() {
    const tocLinks = document.querySelectorAll('.toc-link');
    
    if (tocLinks.length === 0) return;
    
    // Gérer le clic sur les liens
    tocLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href').substring(1);
            const target = document.getElementById(targetId);
            
            if (target) {
                // Scroll smooth vers la section
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
                
                // Mettre à jour l'état actif
                updateActiveTocLink(link);
            }
        });
    });
    
    // Détecter la section visible pendant le scroll
    window.addEventListener('scroll', () => {
        updateTocOnScroll();
    });
}

function updateActiveTocLink(activeLink) {
    document.querySelectorAll('.toc-link').forEach(link => {
        link.classList.remove('active');
    });
    activeLink.classList.add('active');
}

function updateTocOnScroll() {
    const sections = document.querySelectorAll('.content-section');
    const tocLinks = document.querySelectorAll('.toc-link');
    
    let currentSection = null;
    
    sections.forEach(section => {
        const rect = section.getBoundingClientRect();
        if (rect.top <= 150 && rect.bottom >= 150) {
            currentSection = section.id;
        }
    });
    
    if (currentSection) {
        tocLinks.forEach(link => {
            const href = link.getAttribute('href').substring(1);
            if (href === currentSection) {
                updateActiveTocLink(link);
            }
        });
    }
}

// === COPIER LE CODE ===
function initCopyButtons() {
    // La fonction copyCode sera appelée directement depuis le HTML
}

function copyCode(button) {
    const codeBlock = button.closest('.code-example').querySelector('code');
    const text = codeBlock.textContent;
    
    navigator.clipboard.writeText(text).then(() => {
        const originalText = button.innerHTML;
        button.innerHTML = '<i class="fas fa-check"></i> Copié !';
        button.style.backgroundColor = 'var(--success-color)';
        
        setTimeout(() => {
            button.innerHTML = originalText;
            button.style.backgroundColor = '';
        }, 2000);
    }).catch(err => {
        showNotification('Erreur lors de la copie', 'error');
    });
}

// === EXÉCUTION DU CODE ===
function initCodeRunner() {
    // La fonction runCode sera appelée directement depuis le HTML
}

function runCode(editorId) {
    const code = document.getElementById(editorId).textContent;
    const outputDiv = document.getElementById('output' + editorId.replace('editor', ''));
    
    if (!outputDiv) return;
    
    // Simuler l'exécution PHP (en réalité, on afficherait un résultat pré-calculé)
    outputDiv.style.display = 'block';
    const outputContent = outputDiv.querySelector('.output-content');
    
    // Animation de chargement
    outputContent.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Exécution...';
    
    setTimeout(() => {
        // Résultat simulé (dans une vraie application, il faudrait un backend PHP)
        outputContent.innerHTML = simulatePHPExecution(code);
    }, 500);
}

function simulatePHPExecution(input) {
    let code = '';
    let isClickInteraction = false;
    let resultContainer = null;

    // 1. Détecter si l'entrée est un Bouton (click) ou une chaîne (code brut)
    if (typeof input === 'object' && input.nodeType === 1) {
        // C'est un élément HTML (bouton)
        isClickInteraction = true;
        const btn = input;
        
        // Trouver le conteneur parent (wrapper)
        const wrapper = btn.closest('.code-block-wrapper');
        if (wrapper) {
            const codeElement = wrapper.querySelector('code');
            code = codeElement ? codeElement.innerText : '';
            
            // Trouver ou créer le panneau de résultat
            resultContainer = wrapper.querySelector('.execution-result');
            if (!resultContainer) {
                // S'il n'existe pas, on le crée
                resultContainer = document.createElement('div');
                resultContainer.className = 'execution-result';
                resultContainer.style.marginTop = '15px';
                resultContainer.style.padding = '15px';
                resultContainer.style.backgroundColor = '#1e1e1e';
                resultContainer.style.color = '#fff';
                resultContainer.style.borderRadius = '6px';
                resultContainer.style.fontFamily = 'monospace';
                resultContainer.style.borderLeft = '4px solid #3498db';
                resultContainer.style.display = 'none';
                wrapper.appendChild(resultContainer);
            }
        }
    } else {
        // C'est une chaîne de caractères (appel via initSandbox par exemple)
        code = String(input);
    }

    code = code.trim();
    let result = '';

    // --- LOGIQUE DE SIMULATION ---

    // Chapitre 1
    if (code.includes('echo "Bonjour')) {
        result = 'Bonjour, voici mon premier script PHP !<br>La date du jour est : ' + new Date().toLocaleDateString('fr-FR');
    }
    else if (code.includes('$nom') && code.includes('Dupont')) {
        result = 'Nom : Dupont Jean<br>Âge : 25 ans<br>Prix : 19.99 €<br>Bonjour Dupont';
    }
    else if (code.includes('$couleurs')) {
        result = `Première couleur : Rouge<br>Deuxième fruit : Banane<br><br>Nom : Dupont<br>Voiture : Peugeot 308<br><br>Premier étudiant : Martin`;
    }
    else if (code.includes('define')) {
        result = `Site : Mon Site Web<br>Version : 1.0.0<br>Pi = 3.14159<br>Taxe : 20%<br><br>Constantes magiques :<br>Fichier actuel : /exemple.php<br>Ligne actuelle : 20`;
    }
    else if (code.includes('if ($age')) {
        result = `Vous êtes majeur.<br>Vous avez réussi !<br>Mention Bien<br>Début de semaine !<br>Statut : Majeur`;
    }
    else if (code.includes('for ($i')) {
        result = `<strong>Boucle FOR :</strong><br>1 2 3 4 5<br><br><strong>Boucle WHILE :</strong><br>1 2 3<br><br><strong>Boucle FOREACH :</strong><br>- Pomme<br>- Banane<br>- Orange`;
    }
    else if (code.includes('function direBonjour')) {
        result = `Bonjour !<br>Bonjour M. Dupont !<br>5 + 3 = 8<br>Somme : 15`;
    }
    // Chapitre 1 (Classes - Fin)
    else if (code.includes('class Voiture') && !code.includes('VoitureDeLuxe')) {
        result = `Marque : Peugeot<br>Couleur : Rouge<br>Vitesse max : 180 km/h<br>La voiture démarre !<br><br>Marque : Renault<br>Couleur : Bleue`;
    }
    else if (code.includes('class Personne')) {
        result = `Création de l'objet : Alice<br>Je m'appelle Alice et j'ai 25 ans.<br>Création de l'objet : Bob<br>Je m'appelle Bob et j'ai 30 ans.<br>Destruction de l'objet : Bob<br>Destruction de l'objet : Alice`;
    }
    else if (code.includes('class CompteBancaire')) {
        result = `Martin<br>Solde : 1000 €<br>Dépôt de 500 € effectué.<br>Retrait de 200 € effectué.<br>Solde : 1300 €`;
    }
    else if (code.includes('class Compteur')) {
        result = `Total initial : 0<br>Compteur 1 : 1<br>Compteur 2 : 2<br>Compteur 3 : 3<br>Total d'objets créés : 3<br>PI = 3.14159`;
    }

    // Chapitre 2 (Héritage)
    else if (code.includes('class Voiture') && code.includes('VoitureDeLuxe')) {
        result = `La voiture est de marque Ferrari`;
    }
    else if (code.includes('class A') && code.includes('class B extends A')) {
        result = `Je suis B::example().\nJe suis A::example().`;
    }
    else if (code.includes('class Forme') && code.includes('calculerSurface')) {
        result = `Surface : 78.5398...<br>Surface : 6`;
    }
    else if (code.includes('abstract class Utilisateur') || code.includes('interface GestionStock')) {
        result = `Validation OK : Le code respecte les contrats (Interfaces/Abstractions).`;
    }
    
    // Chapitre 3 (Autoloading / Namespaces)
    else if (code.includes('spl_autoload_register')) {
        result = `Tentative de chargement de la classe : MaClasse<br>Classe chargée avec succès.`;
    }
    else if (code.includes('namespace MonProjet')) {
        result = `Bonjour depuis le Namespace MonProjet\\Model !`;
    }

    // Chapitre 4 (Exceptions)
    else if (code.includes('try') && code.includes('catch') && code.includes('10 / 0')) {
        result = `Début du traitement...<br>Une erreur est survenue : Division par zéro impossible.<br>Fin du bloc.`;
    }
    else if (code.includes('throw new Exception') && code.includes('verifierAge')) {
         result = `Erreur : Vous devez être majeur.`;
    }
    else if (code.includes('class MonException')) {
        result = `ERREUR [MON_EXCEPTION] : Oups !`;
    }

    // Chapitre 5 (PDO)
    else if (code.includes('new PDO') || code.includes('$dsn')) {
        result = `Connexion réussie ! (Simulée vers localhost/test)`;
    }
    else if (code.includes('SELECT * FROM jeux_video')) {
         result = `Super Mario Bros<br>The Legend of Zelda<br>Final Fantasy VII<br>...`;
    }
    else if (code.includes('SELECT nom, prix FROM jeux_video')) {
         result = `Super Mario Bros coûte 45 euros<br>Mario Kart coûte 50 euros`;
    }

    // Chapitre 6 (MVC)
    else if (code.includes('page=contact') || code.includes('Router')) {
        result = `Route demandée : contact<br>Chargement du ContactController...<br>Affichage de la vue 'contact.php'`;
    }

    // Défaut
    else {
        result = `Exécution terminée.<br><em>(Note: Ceci est une simulation interne. Le code semble syntaxiquement correct.)</em>`;
    }

    // Retour du résultat selon le mode
    if (isClickInteraction && resultContainer) {
        resultContainer.style.display = 'block';
        resultContainer.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Exécution...';
        setTimeout(() => {
            resultContainer.innerHTML = '<strong><i class="fas fa-terminal"></i> Sortie :</strong><br>' + result;
        }, 600);
    } else {
        return result;
    }
}

// === QUIZ ===
function initQuiz() {
    const container = document.getElementById('quiz-container');
    const startBtn = document.getElementById('start-quiz-btn');
    
    if (!container || !startBtn) return;

    // Déterminer le chapitre actuel
    const chapterNum = getCurrentChapterNumber();
    if (!chapterNum) return;

    // Récupérer les données du quiz (variable globale définies dans quiz-chapitreX.js)
    // Exemple: window['quizChapitre1']
    const quizVariableName = 'quizChapitre' + chapterNum;
    const quizData = window[quizVariableName];
    
    if (!quizData || !quizData.questions) {
        console.warn('Aucune donnée de quiz trouvée pour : ' + quizVariableName);
        return;
    }

    startBtn.addEventListener('click', () => {
        renderQuiz(container, quizData.questions, chapterNum);
    });
}

function renderQuiz(container, questions, chapterNum) {
    let html = '<div class="quiz-questions animate-fade-in">';
    
    questions.forEach((q, index) => {
        html += `
            <div class="question-card" data-id="${q.id}">
                <div class="question-header">
                    <span class="q-number">Question ${index + 1}</span>
                </div>
                <h3 class="question-text">${q.question}</h3>
                <div class="options-grid">
        `;
        
        q.options.forEach((opt, optIndex) => {
            html += `
                <label class="option-item">
                    <input type="radio" name="q_${q.id}" value="${optIndex}">
                    <span class="option-content">${opt}</span>
                    <i class="fas fa-check check-icon"></i>
                </label>
            `;
        });
        
        html += `</div>
                <div class="feedback" id="feedback-${q.id}" style="display:none;"></div>
            </div>`;
    });
    
    html += `
        <div class="quiz-actions">
            <button id="submit-quiz-btn" class="btn btn-primary btn-lg">
                <i class="fas fa-check-circle"></i> Valider mes réponses
            </button>
        </div>
        </div>
    `;
    
    container.innerHTML = html;
    
    // Scroll vers le haut du quiz
    container.scrollIntoView({ behavior: 'smooth' });
    
    document.getElementById('submit-quiz-btn').addEventListener('click', () => {
        validateQuiz(container, questions, chapterNum);
    });
}

function validateQuiz(container, questions, chapterNum) {
    let score = 0;
    
    questions.forEach(q => {
        const selected = container.querySelector(`input[name="q_${q.id}"]:checked`);
        const feedback = document.getElementById(`feedback-${q.id}`);
        const card = feedback.closest('.question-card');
        const options = card.querySelectorAll('.option-item');
        
        // Disable inputs
        card.querySelectorAll('input').forEach(input => input.disabled = true);
        
        feedback.style.display = 'block';
        
        let isCorrect = false;
        if (selected) {
            const val = parseInt(selected.value);
            if (val === q.correct) {
                isCorrect = true;
                score++;
            }
            // Marquer l'option sélectionnée
            selected.parentElement.classList.add(isCorrect ? 'correct' : 'incorrect');
        }
        
        // Toujours montrer la bonne réponse
        options[q.correct].classList.add('correct');
        
        if (isCorrect) {
            feedback.className = 'feedback feedback-success';
            feedback.innerHTML = `<div class="feedback-icon"><i class="fas fa-check"></i></div>
                                <div><strong>Excellente réponse !</strong><br>${q.explanation}</div>`;
        } else {
            feedback.className = 'feedback feedback-error';
            feedback.innerHTML = `<div class="feedback-icon"><i class="fas fa-times"></i></div>
                                <div><strong>Pas tout à fait...</strong><br>${q.explanation}</div>`;
        }
    });
    
    // Afficher le résultat final
    const percentage = Math.round((score / questions.length) * 100);
    const passed = percentage >= 70;
    
    const resultDiv = document.createElement('div');
    resultDiv.className = `quiz-result ${passed ? 'success' : 'warning'}`;
    
    resultDiv.innerHTML = `
        <div class="result-icon">
            <i class="fas ${passed ? 'fa-trophy' : 'fa-graduation-cap'}"></i>
        </div>
        <h3>Score Final : ${score} / ${questions.length}</h3>
        <div class="result-bar">
            <div class="result-fill" style="width: ${percentage}%"></div>
        </div>
        <p class="result-message">
            ${passed ? 'Félicitations ! Vous avez validé ce chapitre.' : 'Révisez le cours et réessayez pour valider le chapitre.'}
        </p>
        <div class="result-actions">
            <button class="btn btn-secondary" onclick="location.reload()">
                <i class="fas fa-redo"></i> Recommencer
            </button>
            ${passed ? '<a href="index.html" class="btn btn-primary"><i class="fas fa-home"></i> Retour Accueil</a>' : ''}
        </div>
    `;
    
    // Unlock progress if passed
    if (passed) {
        if (!progress.chapters[chapterNum] || progress.chapters[chapterNum] < 100) {
            progress.chapters[chapterNum] = 100;
            localStorage.setItem('phpCourseProgress', JSON.stringify(progress));
            
            // Notification
            showNotification('Chapitre terminé à 100% !', 'success');
            
            // Update UI instantly if possible
            const progressBar = document.getElementById('chapterProgress');
            if(progressBar) progressBar.style.width = '100%';
        }
    }
    
    container.appendChild(resultDiv);
    document.getElementById('submit-quiz-btn').style.display = 'none';
    
    resultDiv.scrollIntoView({ behavior: 'smooth' });
}

// === EXERCICES ===
function toggleSolution(exerciseId) {
    const solution = document.getElementById('solution-' + exerciseId);
    const button = document.querySelector(`.btn-toggle-solution[onclick*="toggleSolution('${exerciseId}')"]`);
    
    if (solution.style.display === 'none' || !solution.style.display) {
        solution.style.display = 'block';
        button.innerHTML = '<i class="fas fa-eye-slash"></i> Masquer la solution';
    } else {
        solution.style.display = 'none';
        button.innerHTML = '<i class="fas fa-eye"></i> Voir la solution';
    }
}

// === NOTIFICATIONS ===
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <i class="fas fa-${getNotificationIcon(type)}"></i>
        <span>${message}</span>
    `;
    
    document.body.appendChild(notification);
    
    // Animation d'apparition
    setTimeout(() => {
        notification.style.opacity = '1';
        notification.style.transform = 'translateY(0)';
    }, 10);
    
    // Retirer après 3 secondes
    setTimeout(() => {
        notification.style.opacity = '0';
        notification.style.transform = 'translateY(-20px)';
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 3000);
}

function getNotificationIcon(type) {
    const icons = {
        success: 'check-circle',
        error: 'exclamation-circle',
        warning: 'exclamation-triangle',
        info: 'info-circle'
    };
    return icons[type] || 'info-circle';
}

// === STYLES POUR NOTIFICATIONS ===
const notificationStyles = document.createElement('style');
notificationStyles.textContent = `
    .notification {
        position: fixed;
        top: 80px;
        right: 20px;
        background-color: var(--card-bg, white);
        padding: 1rem 1.5rem;
        border-radius: 8px;
        box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);
        display: flex;
        align-items: center;
        gap: 0.8rem;
        z-index: 10001;
        opacity: 0;
        transform: translateY(-20px);
        transition: all 0.3s ease;
        max-width: 400px;
    }
    
    .notification i {
        font-size: 1.5rem;
    }
    
    .notification-success {
        border-left: 4px solid var(--success-color);
    }
    
    .notification-success i {
        color: var(--success-color);
    }
    
    .notification-error {
        border-left: 4px solid var(--danger-color);
    }
    
    .notification-error i {
        color: var(--danger-color);
    }
    
    .notification-warning {
        border-left: 4px solid var(--warning-color);
    }
    
    .notification-warning i {
        color: var(--warning-color);
    }
    
    .notification-info {
        border-left: 4px solid var(--primary-color);
    }
    
    .notification-info i {
        color: var(--primary-color);
    }
`;
document.head.appendChild(notificationStyles);

// === FONCTIONS UTILITAIRES ===
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Optimiser le scroll
window.addEventListener('scroll', debounce(() => {
    saveChapterProgress();
}, 300));

console.log('📚 Cours PHP POO chargé avec succès !');

// ===============================================
// 1. SYSTÈME DE BADGES (TROPHEES)
// ===============================================
const badgesData = [
    { id: 'badge_ch1', chapter: 1, title: 'Initié PHP', icon: 'fa-baby', desc: 'Terminer le Chapitre 1' },
    { id: 'badge_ch2', chapter: 2, title: 'Héritier', icon: 'fa-sitemap', desc: 'Terminer le Chapitre 2' },
    { id: 'badge_ch3', chapter: 3, title: 'Organisateur', icon: 'fa-folder-tree', desc: 'Terminer le Chapitre 3' },
    { id: 'badge_ch4', chapter: 4, title: 'Bug Hunter', icon: 'fa-bug-slash', desc: 'Terminer le Chapitre 4' },
    { id: 'badge_ch5', chapter: 5, title: 'Data Master', icon: 'fa-database', desc: 'Terminer le Chapitre 5' },
    { id: 'badge_ch6', chapter: 6, title: 'Architecte Web', icon: 'fa-server', desc: 'Terminer le Chapitre 6' },
    { id: 'badge_ch7', chapter: 7, title: 'Bâtisseur', icon: 'fa-hammer', desc: 'Terminer le Chapitre 7' },
    { id: 'badge_ch8', chapter: 8, title: 'Expert POO', icon: 'fa-crown', desc: 'Terminer le Chapitre 8' }
];

function initBadges() {
    const trophyGrid = document.getElementById('trophyGrid');
    
    // Mise à jour de l'état des badges (débloqué ou non)
    // On vérifie le localStorage
    const userProgress = JSON.parse(localStorage.getItem('phpCourseProgress')) || { chapters: {} };
    
    if (trophyGrid) {
        trophyGrid.innerHTML = ''; // Nettoyer
        
        badgesData.forEach(badge => {
            // Un badge est débloqué si le chapitre correspondant est à 100%
            const isUnlocked = (userProgress.chapters[badge.chapter] === 100);
            
            const card = document.createElement('div');
            card.className = `trophy-card ${isUnlocked ? 'unlocked' : 'locked'}`;
            
            card.innerHTML = `
                <div class="trophy-icon">
                    <i class="fas ${isUnlocked ? 'fa-trophy' : badge.icon}"></i>
                </div>
                <h3>${badge.title}</h3>
                <p>${badge.desc}</p>
                ${isUnlocked ? '<div style="color:var(--success-color); font-size:0.8rem; margin-top:5px;"><i class="fas fa-check"></i> Obtenu</div>' : ''}
            `;
            
            trophyGrid.appendChild(card);
        });
    }
}


// ===============================================
// 2. SANDBOX (SIMULATION D'EXÉCUTION)
// ===============================================
function initSandbox() {
    // Si la page a la classe 'no-sandbox', on désactive la simulation
    if (document.body.classList.contains('no-sandbox')) return;

    // On cible tous les blocs de code PHP
    const codeBlocks = document.querySelectorAll('pre code.language-php');
    
    codeBlocks.forEach((block, index) => {
        // Créer le wrapper si pas déjà fait par Prism
        const pre = block.parentElement;
        
        // Eviter de dupliquer si on relance la fonction
        if(pre.querySelector('.code-actions')) return;

        // Créer le conteneur d'actions
        const actionsDiv = document.createElement('div');
        actionsDiv.className = 'code-actions';
        // s'assurer que le pre est relatif pour le positionnement absolu du bouton
        if(getComputedStyle(pre).position === 'static') {
            pre.style.position = 'relative';
        }
        
        // Bouton Tester
        const testBtn = document.createElement('button');
        testBtn.className = 'btn-test-code';
        testBtn.innerHTML = '<i class="fas fa-play"></i> Exécuter';
        testBtn.title = "Simuler l'exécution de ce code";
        
        // Créer une zone de résultat unique pour ce bloc
        const resultDiv = document.createElement('div');
        resultDiv.className = 'execution-result';
        resultDiv.style.display = 'none';
        resultDiv.style.marginTop = '10px';
        resultDiv.style.padding = '10px';
        resultDiv.style.backgroundColor = '#1e293b';
        resultDiv.style.color = '#fff';
        resultDiv.style.borderLeft = '4px solid #2563eb';
        resultDiv.style.borderRadius = '4px';
        resultDiv.style.fontFamily = 'monospace';
        
        pre.parentNode.insertBefore(resultDiv, pre.nextSibling);

        testBtn.addEventListener('click', () => {
             const code = block.innerText;
             resultDiv.style.display = 'block';
             resultDiv.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Exécution...';
             
             setTimeout(() => {
                 resultDiv.innerHTML = '<strong><i class="fas fa-terminal"></i> Résultat :</strong><br>' + simulatePHPExecution(code);
             }, 600);
        });
        
        actionsDiv.appendChild(testBtn);
        
        // Insérer avant le code dans le <pre>
        pre.insertBefore(actionsDiv, pre.firstChild);
    });
}


// ===============================================
// 3. FLASHCARDS (RÉVISIONS)
// ===============================================
// Données des cartes
const flashcardsData = {
    1: [ // Chapitre 1
        { front: "Variable", back: "Espace mémoire nommé commençant par $ pour stocker une valeur." },
        { front: "Classe", back: "Plan ou modèle servant à créer des objets. Définit propriétés et méthodes." },
        { front: "Objet", back: "Instance d'une classe. C'est l'élément concret créé à partir du plan." }
    ],
    2: [ // Chapitre 2
        { front: "Héritage", back: "Mécanisme permettant à une classe fille de récupérer les méthodes et propriétés d'une classe mère (extends)." },
        { front: "Polymorphisme", back: "Capacité d'objets différents à répondre à la même méthode de manière spécifique." },
        { front: "Interface", back: "Contrat qui oblige les classes à implémenter certaines méthodes (implements)." }
    ],
    3: [ // Chapitre 3
        { front: "Namespace", back: "Espace de nom permettant d'organiser les classes et d'éviter les conflits de noms." },
        { front: "Autoloading", back: "Chargement automatique des fichiers de classe à la demande (spl_autoload_register)." },
        { front: "Trait", back: "Groupe de méthodes pouvant être injectées dans plusieurs classes independantes (use)." }
    ],
    4: [ // Chapitre 4
        { front: "Exception", back: "Objet représentant une erreur, pouvant être lancé (throw) et attrapé (catch)." },
        { front: "Try / Catch", back: "Structure pour tenter d'exécuter un code risqué et gérer l'erreur si elle survient." }
    ],
    5: [ // Chapitre 5
        { front: "PDO", back: "PHP Data Objects. Interface universelle pour accéder aux bases de données." },
        { front: "Requête Préparée", back: "Méthode (prepare) pour exécuter du SQL en séparant la structure des données, évitant les injections SQL." }
    ],
    6: [ // Chapitre 6
        { front: "MVC", back: "Modèle Vue Contrôleur. Pattern architectural séparant les données, l'affichage et la logique." },
        { front: "Routeur", back: "Composant qui analyse l'URL et dirige la demande vers le bon contrôleur." }
    ],
    7: [ // Chapitre 7
        { front: "Singleton", back: "Pattern qui garantit qu'une classe n'a qu'une seule instance et fournit un point d'accès global à celle-ci." },
        { front: ".htaccess", back: "Fichier de configuration Apache permettant la réécriture d'URL (URL Rewriting)." }
    ],
    8: [ // Chapitre 8
        { front: "CRUD", back: "Create, Read, Update, Delete. Les 4 opérations de base sur les données." },
        { front: "Injection SQL", back: "Faille de sécurité où un attaquant injecte du code SQL malveillant. On s'en protège avec les requêtes préparées." }
    ]
};

let currentDeck = [];
let currentIndex = 0;

function initFlashcards() {
    const packsContainer = document.getElementById('flashcardsPacks');
    const modal = document.getElementById('flashcardModal');
    
    if (packsContainer) {
        // Générer les paquets sur l'accueil
        const userProgress = JSON.parse(localStorage.getItem('phpCourseProgress')) || { chapters: {} };
        
        packsContainer.innerHTML = '';
        
        // Pour chaque chapitre qui a des flashcards définies
        Object.keys(flashcardsData).forEach(chapId => {
            const isUnlocked = (userProgress.chapters[chapId] === 100);
            
            const pack = document.createElement('div');
            pack.className = `pack-card ${isUnlocked ? 'unlocked' : 'locked'}`;
            
            pack.innerHTML = `
                <div class="pack-content">
                    <div class="pack-icon"><i class="fas fa-layer-group"></i></div>
                    <h3>Révisions Chapitre ${chapId}</h3>
                    <p>${flashcardsData[chapId].length} cartes</p>
                </div>
            `;
            
            pack.addEventListener('click', () => {
                if (isUnlocked) {
                    openFlashcards(chapId);
                } else {
                    alert("Terminez ce chapitre à 100% pour débloquer les révisions !");
                }
            });
            
            packsContainer.appendChild(pack);
        });
    }
    
    // Events du Modal
    if (modal) {
        document.getElementById('closeFlashcardBtn').onclick = () => modal.style.display = "none";
        
        // Flip card
        document.getElementById('currentFlashcard').onclick = function() {
            this.classList.toggle('flipped');
        };
        
        // Navigation
        const nextBtn = document.getElementById('nextCardBtn');
        const prevBtn = document.getElementById('prevCardBtn');
        
        if(nextBtn) nextBtn.onclick = (e) => {
            e.stopPropagation();
            if (currentIndex < currentDeck.length - 1) {
                currentIndex++;
                showCard(currentIndex);
            }
        };
        
        if(prevBtn) prevBtn.onclick = (e) => {
            e.stopPropagation();
            if (currentIndex > 0) {
                currentIndex--;
                showCard(currentIndex);
            }
        };
        
        // Fermer en cliquant dehors
        window.addEventListener('click', (e) => {
            if (e.target === modal) {
               modal.style.display = 'none';
            }
        });
    }
}

function openFlashcards(chapId) {
    currentDeck = flashcardsData[chapId];
    currentIndex = 0;
    
    const modal = document.getElementById('flashcardModal');
    document.getElementById('flashcardTitle').innerText = `Révisions Chapitre ${chapId}`;
    
    showCard(0);
    modal.style.display = "flex";
}

function showCard(index) {
    const card = document.getElementById('currentFlashcard');
    const front = document.getElementById('flashcardFrontText');
    const back = document.getElementById('flashcardBackText');
    const counter = document.getElementById('cardCounter');
    
    // Reset flip
    card.classList.remove('flipped');
    
    // Update text after small delay specifically if it was flipped to avoid spoiler
    setTimeout(() => {
        front.innerText = currentDeck[index].front;
        back.innerText = currentDeck[index].back;
        counter.innerText = `${index + 1} / ${currentDeck.length}`;
    }, 150);
}

// ===============================================
// 4. THEME TOGGLE (CLAIR / SOMBRE)
// ===============================================
function initThemeToggle() {
    const toggleBtn = document.getElementById('themeToggleBtn');
    if (!toggleBtn) return;
    
    // Charger le thème sauvegardé
    const savedTheme = localStorage.getItem('phpCourseTheme');
    if (savedTheme === 'dark') {
        document.body.classList.add('dark-mode');
        updateThemeIcon(toggleBtn, true);
    }
    
    // Event listener
    toggleBtn.addEventListener('click', () => {
        const isDark = document.body.classList.toggle('dark-mode');
        localStorage.setItem('phpCourseTheme', isDark ? 'dark' : 'light');
        updateThemeIcon(toggleBtn, isDark);
    });
}

function updateThemeIcon(btn, isDark) {
    const icon = btn.querySelector('i');
    if (icon) {
        icon.className = isDark ? 'fas fa-sun' : 'fas fa-moon';
    }
}

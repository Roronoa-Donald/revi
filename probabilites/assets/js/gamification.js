/**
 * MOTEUR DE GAMIFICATION & EXPÉRIENCE UTILISATEUR
 * Gère : LocalStorage, XP, Confettis, Avatar Fil Rouge
 */

const GameEngine = {
    // État initial
    state: {
        xp: 0,
        level: 1,
        badges: [],
        progress: {
            chapitre1: 0,
            chapitre2: 0,
            chapitre3: 0,
            chapitre4: 0
        },
        quizzesCompleted: [] // Stocke les IDs des quiz finis
    },

    // Initialisation
    init() {
        this.loadProgress();
        this.updateUI();
        this.setupFilRouge();
    },

    // Sauvegarder dans le navigateur
    saveProgress() {
        localStorage.setItem('proba_rd_progress', JSON.stringify(this.state));
        this.updateUI();
    },

    // Charger la sauvegarde
    loadProgress() {
        const saved = localStorage.getItem('proba_rd_progress');
        if (saved) {
            this.state = { ...this.state, ...JSON.parse(saved) };
        }
        this.updateUI();
    },

    // Gagner des XP
    addXP(amount, reason) {
        this.state.xp += amount;
        
        // Calcul de niveau (100xp = 1 niveau)
        const oldLevel = this.state.level;
        this.state.level = Math.floor(this.state.xp / 100) + 1;
        
        if (this.state.level > oldLevel) {
            this.showNotification(`Niveau ${this.state.level} atteint ! 🎉`, 'levelup');
            this.triggerConfetti();
        } else {
            this.showNotification(`+${amount} XP : ${reason}`, 'xp');
        }
        
        this.saveProgress();
    },

    // Marquer un quiz comme réussi
    completeQuiz(chapterId, score, maxScore) {
        if (!this.state.quizzesCompleted.includes(chapterId)) {
            // Première fois
            const xpGain = Math.round((score / maxScore) * 100);
            this.state.quizzesCompleted.push(chapterId);
            this.state.progress[chapterId] = 100; // Chapitre terminé
            this.addXP(xpGain, `Quiz ${chapterId} terminé`);
            this.triggerConfetti();
        } else {
            // Déjà fait
            this.showNotification('Quiz déjà validé, bravo pour la révision !', 'info');
        }
    },

    // -------------------------------------------------------------------------
    // EFFETS VISUELS (CONFETTI)
    // -------------------------------------------------------------------------
    triggerConfetti() {
        const canvas = document.createElement('canvas');
        canvas.style.position = 'fixed';
        canvas.style.top = '0';
        canvas.style.left = '0';
        canvas.style.width = '100%';
        canvas.style.height = '100%';
        canvas.style.pointerEvents = 'none';
        canvas.style.zIndex = '9999';
        document.body.appendChild(canvas);

        const ctx = canvas.getContext('2d');
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        const particles = [];
        const particleCount = 150;

        for (let i = 0; i < particleCount; i++) {
            particles.push({
                x: canvas.width / 2,
                y: canvas.height / 2,
                vx: (Math.random() - 0.5) * 10,
                vy: (Math.random() - 0.5) * 10 - 5,
                color: `hsl(${Math.random() * 360}, 100%, 50%)`,
                size: Math.random() * 8 + 2
            });
        }

        let animationId;
        function update() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            let active = false;
            
            particles.forEach(p => {
                p.x += p.vx;
                p.y += p.vy;
                p.vy += 0.1; // Gravité
                p.size *= 0.96; // Disparition progressive

                if (p.size > 0.5) {
                    active = true;
                    ctx.fillStyle = p.color;
                    ctx.beginPath();
                    ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
                    ctx.fill();
                }
            });

            if (active) {
                animationId = requestAnimationFrame(update);
            } else {
                canvas.remove();
                cancelAnimationFrame(animationId);
            }
        }
        update();
    },

    // -------------------------------------------------------------------------
    // FIL ROUGE (AVATAR "ALEAS")
    // -------------------------------------------------------------------------
    setupFilRouge() {
        // Création de l'élément flottant
        const host = document.createElement('div');
        host.id = 'fil-rouge-avatar';
        host.innerHTML = `
            <div class="aleas-bubble" id="aleas-bubble" style="display:none">Salut ! Je suis Aléas. Prêt à apprendre ?</div>
            <div class="aleas-character">
                <i class="fas fa-dice-d20 fa-spin-hover" style="font-size:2rem; color:white;"></i>
            </div>
        `;
        document.body.appendChild(host);

        // Interaction
        const char = host.querySelector('.aleas-character');
        const bubble = host.querySelector('.aleas-bubble');
        
        char.addEventListener('click', () => {
            const tips = [
                "N'oublie pas : une probabilité est toujours entre 0 et 1 !",
                "La somme des probabilités vaut toujours 1.",
                "Besoin d'aide ? Utilise les indices dans les exercices !",
                "Courage, tu progresses bien ! XP actuel : " + this.state.xp
            ];
            bubble.textContent = tips[Math.floor(Math.random() * tips.length)];
            bubble.style.display = 'block';
            setTimeout(() => { bubble.style.display = 'none'; }, 4000);
        });

        // Apparition retardée
        setTimeout(() => {
            host.classList.add('visible');
        }, 1000);
    },

    // -------------------------------------------------------------------------
    // UI UPDATES
    // -------------------------------------------------------------------------
    updateUI() {
        // Mettre à jour la barre d'XP si elle existe (à créer dans le HTML)
        const xpBar = document.getElementById('user-xp-bar');
        const xpText = document.getElementById('user-xp-text');
        
        if (xpBar && xpText) {
            const currentLevelXP = this.state.xp % 100;
            xpBar.style.width = `${currentLevelXP}%`;
            xpText.textContent = `Niveau ${this.state.level} (${this.state.xp} XP)`;
        }
    },

    showNotification(msg, type) {
        const notif = document.createElement('div');
        notif.className = `game-notification ${type}`;
        notif.innerHTML = `
            <i class="fas ${type === 'levelup' ? 'fa-trophy' : 'fa-star'}"></i>
            <span>${msg}</span>
        `;
        document.body.appendChild(notif);
        
        setTimeout(() => notif.classList.add('show'), 100);
        setTimeout(() => {
            notif.classList.remove('show');
            setTimeout(() => notif.remove(), 300);
        }, 3000);
    }
};

// Démarrer automatiquent
document.addEventListener('DOMContentLoaded', () => GameEngine.init());

/* ============================================================
   PHP POO — gamification.js
   XP, Niveaux, Badges, Mascotte PHPBuddy, Notifications, Confetti
   localStorage key: rd_php_progress
   ============================================================ */

const GameEngine = {
    STORAGE_KEY: 'rd_php_progress',

    levelTitles: ['Novice', 'Apprenti', 'Développeur', 'Architecte', 'Senior', 'Expert POO', 'Légende PHP'],

    badges: [
        { id: 'first_code',    icon: '💻', title: 'Premier Pas',        description: 'Gagne tes premiers XP',             condition: s => s.totalXPEarned >= 10 },
        { id: 'xp_100',        icon: '⚡', title: 'Courant Continu',    description: 'Atteins 100 XP au total',            condition: s => s.totalXPEarned >= 100 },
        { id: 'xp_300',        icon: '🔥', title: 'En Feu',             description: 'Atteins 300 XP au total',            condition: s => s.totalXPEarned >= 300 },
        { id: 'xp_500',        icon: '🌟', title: 'Étoile Montante',    description: 'Atteins 500 XP au total',            condition: s => s.totalXPEarned >= 500 },
        { id: 'xp_800',        icon: '💎', title: 'Diamant Brut',       description: 'Atteins 800 XP au total',            condition: s => s.totalXPEarned >= 800 },
        { id: 'xp_1000',       icon: '👑', title: 'Maître Absolu',      description: 'Atteins 1000 XP au total',           condition: s => s.totalXPEarned >= 1000 },
        { id: 'quiz_10',       icon: '🧠', title: 'Cerveau PHP',        description: '10 bonnes réponses aux quiz',        condition: s => s.quizCorrect >= 10 },
        { id: 'quiz_50',       icon: '🎯', title: 'Sniper du Code',     description: '50 bonnes réponses aux quiz',        condition: s => s.quizCorrect >= 50 },
        { id: 'streak_3',      icon: '📅', title: 'Régulier',           description: '3 jours consécutifs de visite',      condition: s => s.streak >= 3 },
        { id: 'streak_7',      icon: '🔥', title: 'Semaine de Feu',     description: '7 jours consécutifs',                condition: s => s.streak >= 7 },
        { id: 'ch1_done',      icon: '🏗️', title: 'Constructeur',       description: 'Termine les exercices du ch.1',      condition: s => (s.completed || []).includes('chapitre1.html') },
        { id: 'ch3_done',      icon: '🧬', title: 'Héritier',           description: 'Termine les exercices du ch.3',      condition: s => (s.completed || []).includes('chapitre3.html') },
        { id: 'ch5_done',      icon: '🔌', title: 'Architecte',         description: 'Termine les exercices du ch.5',      condition: s => (s.completed || []).includes('chapitre5.html') },
        { id: 'ch8_done',      icon: '🏆', title: 'Full-Stack POO',     description: 'Termine les exercices du ch.8',      condition: s => (s.completed || []).includes('chapitre8.html') },
        { id: 'explorer',      icon: '🗺️', title: 'Explorateur',        description: 'Visite tous les chapitres',          condition: s => (s.modulesVisited || []).length >= 8 }
    ],

    tips: [
        "💡 PHPBuddy dit : « En POO, pense objet : encapsule, hérite, polymorphise ! »",
        "💡 Astuce : $this fait toujours référence à l'instance courante de la classe.",
        "💡 Un constructeur __construct() est appelé automatiquement à chaque new.",
        "💡 private → classe seule, protected → + enfants, public → tout le monde.",
        "💡 abstract = contrat. Interface = contrat pur. Choisis bien !",
        "💡 Le pattern Singleton empêche d'instancier une classe plus d'une fois.",
        "💡 Utilise des namespaces pour éviter les collisions de noms de classes.",
        "💡 Le typage strict (declare(strict_types=1)) évite les bugs subtils.",
        "💡 PDO avec requêtes préparées → sécurité contre les injections SQL !"
    ],

    state: null,

    init() {
        this.load();
        this.checkStreak();
        this.trackModule();
        this.renderMascot();
        this.updateUI();
        this.checkBadges();
    },

    defaultState() {
        return {
            xp: 0, level: 1, badges: [], completed: [],
            totalXPEarned: 0, quizCorrect: 0,
            streak: 0, lastVisit: null, modulesVisited: []
        };
    },

    load() {
        try {
            const raw = localStorage.getItem(this.STORAGE_KEY);
            this.state = raw ? { ...this.defaultState(), ...JSON.parse(raw) } : this.defaultState();
        } catch { this.state = this.defaultState(); }
    },

    save() {
        try { localStorage.setItem(this.STORAGE_KEY, JSON.stringify(this.state)); } catch {}
    },

    checkStreak() {
        const today = new Date().toDateString();
        if (this.state.lastVisit) {
            const last = new Date(this.state.lastVisit);
            const diff = Math.floor((new Date(today) - last) / 86400000);
            if (diff === 1) { this.state.streak++; }
            else if (diff > 1) { this.state.streak = 1; }
        } else { this.state.streak = 1; }
        this.state.lastVisit = today;
        this.save();
    },

    trackModule() {
        const page = window.location.pathname.split('/').pop();
        if (page && page.startsWith('chapitre') && !this.state.modulesVisited.includes(page)) {
            this.state.modulesVisited.push(page);
            this.save();
        }
    },

    addXP(amount, reason) {
        this.state.xp += amount;
        this.state.totalXPEarned += amount;
        this.notify(`⚡ +${amount} XP — ${reason}`, 'xp');
        this.checkLevelUp();
        this.checkBadges();
        this.save();
        this.updateUI();
    },

    completeQuiz(chapter, correct, total) {
        this.state.quizCorrect = (this.state.quizCorrect || 0) + correct;
        this.addXP(correct * 10, `Quiz ${chapter} : ${correct}/${total}`);
        if (correct === total) {
            this.completeChapter(chapter);
        }
    },

    completeChapter(chapter) {
        if (!this.state.completed) this.state.completed = [];
        if (!this.state.completed.includes(chapter)) {
            this.state.completed.push(chapter);
            this.checkBadges();
            this.save();
        }
    },

    checkLevelUp() {
        const needed = this.state.level * 100;
        if (this.state.xp >= needed) {
            this.state.xp -= needed;
            this.state.level++;
            const title = this.levelTitles[Math.min(this.state.level - 1, this.levelTitles.length - 1)];
            setTimeout(() => {
                this.notify(`🏆 Niveau ${this.state.level} — ${title} !`, 'levelup');
                this.confetti();
            }, 600);
        }
    },

    checkBadges() {
        this.badges.forEach(b => {
            if (!this.state.badges.includes(b.id) && b.condition(this.state)) {
                this.state.badges.push(b.id);
                setTimeout(() => this.notify(`${b.icon} Badge : ${b.title}`, 'badge'), 400);
                this.save();
            }
        });
    },

    updateUI() {
        const el = document.getElementById('user-xp-display');
        if (el) {
            const title = this.levelTitles[Math.min(this.state.level - 1, this.levelTitles.length - 1)];
            el.innerHTML = `<i class="fas fa-bolt"></i> ${this.state.totalXPEarned} XP · Nv.${this.state.level} ${title}`;
        }
    },

    notify(msg, type) {
        const div = document.createElement('div');
        div.className = `game-notification ${type}`;
        div.textContent = msg;
        Object.assign(div.style, {
            position: 'fixed', top: '1rem', right: '1rem', zIndex: '9999',
            padding: '.8rem 1.4rem', borderRadius: '10px', fontWeight: '600',
            fontSize: '.92rem', animation: 'slideIn .4s ease, fadeOut .4s ease 3s forwards',
            background: type === 'xp' ? '#8b5cf6' : type === 'levelup' ? '#f59e0b' : '#10b981',
            color: '#fff', boxShadow: '0 4px 15px rgba(0,0,0,.2)'
        });
        document.body.appendChild(div);
        setTimeout(() => div.remove(), 3500);
    },

    confetti() {
        const colors = ['#8b5cf6', '#a78bfa', '#c4b5fd', '#f59e0b', '#10b981', '#fff'];
        for (let i = 0; i < 40; i++) {
            const piece = document.createElement('div');
            Object.assign(piece.style, {
                position: 'fixed', left: Math.random() * 100 + 'vw', top: '-10px',
                width: (6 + Math.random() * 8) + 'px', height: (6 + Math.random() * 8) + 'px',
                background: colors[Math.floor(Math.random() * colors.length)],
                borderRadius: Math.random() > 0.5 ? '50%' : '2px',
                zIndex: '10000', pointerEvents: 'none',
                animation: `confettiFall ${1.5 + Math.random() * 2}s ease forwards`
            });
            document.body.appendChild(piece);
            setTimeout(() => piece.remove(), 4000);
        }
    },

    renderMascot() {
        if (document.getElementById('phpbuddy-container')) return;
        const container = document.createElement('div');
        container.id = 'phpbuddy-container';
        Object.assign(container.style, {
            position: 'fixed', bottom: '2rem', right: '2rem', zIndex: '3000',
            display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '.5rem'
        });
        container.innerHTML = `
            <div id="phpbuddy-bubble" style="display:none; background:var(--bg-primary,#fff); color:var(--text-primary,#1e293b); border:1px solid var(--border-color,#e2e8f0); border-radius:12px; padding:.8rem 1rem; max-width:280px; font-size:.85rem; box-shadow:0 4px 15px rgba(0,0,0,.1);"></div>
            <div id="phpbuddy-avatar" style="width:50px;height:50px;border-radius:50%;background:#8b5cf6;display:flex;align-items:center;justify-content:center;cursor:pointer;box-shadow:0 4px 15px rgba(139,92,246,.3);font-size:1.3rem;color:#fff;" aria-label="PHPBuddy — mascotte du cours" role="button" tabindex="0">
                <i class="fas fa-code"></i>
            </div>
        `;
        document.body.appendChild(container);

        const avatar = document.getElementById('phpbuddy-avatar');
        const bubble = document.getElementById('phpbuddy-bubble');
        let timer;
        const showTip = () => {
            const tip = this.tips[Math.floor(Math.random() * this.tips.length)];
            bubble.textContent = tip;
            bubble.style.display = 'block';
            clearTimeout(timer);
            timer = setTimeout(() => bubble.style.display = 'none', 5000);
        };
        avatar.addEventListener('click', showTip);
        avatar.addEventListener('keydown', e => { if (e.key === 'Enter') showTip(); });
        setTimeout(showTip, 3000);
    }
};

// CSS animations injected once
(function() {
    if (document.getElementById('game-css')) return;
    const s = document.createElement('style');
    s.id = 'game-css';
    s.textContent = `
        @keyframes slideIn { from { transform: translateX(100%); opacity: 0; } to { transform: translateX(0); opacity: 1; } }
        @keyframes fadeOut { to { opacity: 0; transform: translateY(-10px); } }
        @keyframes confettiFall { to { transform: translateY(100vh) rotate(720deg); opacity: 0; } }
    `;
    document.head.appendChild(s);
})();

document.addEventListener('DOMContentLoaded', () => GameEngine.init());

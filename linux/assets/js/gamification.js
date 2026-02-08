/* ============================================================
   LINUX ADMINISTRATION — gamification.js
   XP, Niveaux, Badges, Mascotte BashBuddy, Notifications, Confetti
   localStorage key: rd_linux_progress
   ============================================================ */

const GameEngine = {
    STORAGE_KEY: 'rd_linux_progress',

    levelTitles: ['Novice', 'Apprenti', 'Utilisateur', 'Administrateur', 'SysAdmin', 'DevOps', 'Légende'],

    badges: [
        { id: 'first_cmd',     icon: '💻', title: 'Premier Pas',         description: 'Gagne tes premiers XP',             condition: s => s.totalXPEarned >= 10 },
        { id: 'xp_100',        icon: '⚡', title: 'Courant Continu',     description: 'Atteins 100 XP au total',            condition: s => s.totalXPEarned >= 100 },
        { id: 'xp_300',        icon: '🔥', title: 'En Feu',              description: 'Atteins 300 XP au total',            condition: s => s.totalXPEarned >= 300 },
        { id: 'xp_500',        icon: '🌟', title: 'Étoile Montante',     description: 'Atteins 500 XP au total',            condition: s => s.totalXPEarned >= 500 },
        { id: 'xp_800',        icon: '💎', title: 'Diamant Brut',        description: 'Atteins 800 XP au total',            condition: s => s.totalXPEarned >= 800 },
        { id: 'xp_1000',       icon: '👑', title: 'Root Suprême',        description: 'Atteins 1000 XP au total',           condition: s => s.totalXPEarned >= 1000 },
        { id: 'quiz_10',       icon: '🧠', title: 'Cerveau Terminal',    description: '10 bonnes réponses aux quiz',        condition: s => s.quizCorrect >= 10 },
        { id: 'quiz_50',       icon: '🎯', title: 'Sniper du Shell',     description: '50 bonnes réponses aux quiz',        condition: s => s.quizCorrect >= 50 },
        { id: 'drag_5',        icon: '🎮', title: 'Drag Master',         description: '5 drag & drop réussis',              condition: s => s.dragDropWins >= 5 },
        { id: 'drag_15',       icon: '🏆', title: 'Drag Champion',       description: '15 drag & drop réussis',             condition: s => s.dragDropWins >= 15 },
        { id: 'streak_3',      icon: '📅', title: 'Régulier',            description: '3 jours consécutifs de visite',      condition: s => s.streak >= 3 },
        { id: 'streak_7',      icon: '🔥', title: 'Semaine de Feu',      description: '7 jours consécutifs',                condition: s => s.streak >= 7 },
        { id: 'cmd_master',    icon: '⌨️', title: 'Maître des Commandes', description: 'Termine les exercices du ch.1',      condition: s => (s.completed || []).includes('chapitre1.html') },
        { id: 'perm_guru',     icon: '🔐', title: 'Gardien des Droits',  description: 'Termine les exercices du ch.3',      condition: s => (s.completed || []).includes('chapitre3.html') },
        { id: 'bash_hero',     icon: '🐚', title: 'Héros du Bash',       description: 'Termine les exercices du ch.8',      condition: s => (s.completed || []).includes('chapitre8.html') },
        { id: 'net_config',    icon: '🌐', title: 'Architecte Réseau',   description: 'Termine les exercices du ch.7',      condition: s => (s.completed || []).includes('chapitre7.html') },
        { id: 'explorer',      icon: '🗺️', title: 'Explorateur',         description: 'Visite tous les modules',            condition: s => (s.modulesVisited || []).length >= 8 }
    ],

    tips: [
        "💡 Sami dit : « man est ton meilleur ami ! Tape man commande pour tout comprendre. »",
        "💡 Astuce : utilise Tab pour l'autocomplétion. Double Tab pour voir les options !",
        "💡 Ctrl+R cherche dans ton historique de commandes. Magique !",
        "💡 N'oublie pas : en Linux, tout est fichier. Même les périphériques !",
        "💡 chmod 755 = rwxr-xr-x. Le propriétaire fait tout, les autres lisent et exécutent.",
        "💡 sudo !! relance la dernière commande avec les droits root.",
        "💡 Utilise alias pour créer tes raccourcis : alias ll='ls -la'",
        "💡 Le pipe | enchaîne les commandes. C'est la puissance de Linux !",
        "💡 Ctrl+C arrête un processus, Ctrl+Z le met en pause."
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
            totalXPEarned: 0, quizCorrect: 0, dragDropWins: 0,
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
                setTimeout(() => {
                    this.notify(`${b.icon} Badge : ${b.title}`, 'badge');
                }, 400);
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
        document.body.appendChild(div);
        setTimeout(() => div.remove(), 3500);
    },

    confetti() {
        const colors = ['#f97316', '#fb923c', '#ea580c', '#fbbf24', '#f59e0b', '#fff'];
        for (let i = 0; i < 40; i++) {
            const piece = document.createElement('div');
            piece.className = 'confetti-piece';
            piece.style.left = Math.random() * 100 + 'vw';
            piece.style.top = '-10px';
            piece.style.background = colors[Math.floor(Math.random() * colors.length)];
            piece.style.borderRadius = Math.random() > 0.5 ? '50%' : '2px';
            piece.style.setProperty('--fall-duration', (1.5 + Math.random() * 2) + 's');
            piece.style.width = (6 + Math.random() * 8) + 'px';
            piece.style.height = piece.style.width;
            document.body.appendChild(piece);
            setTimeout(() => piece.remove(), 4000);
        }
    },

    renderMascot() {
        if (document.getElementById('bashbuddy-container')) return;
        const container = document.createElement('div');
        container.id = 'bashbuddy-container';
        container.innerHTML = `
            <div id="bashbuddy-bubble"></div>
            <div id="bashbuddy-avatar" aria-label="BashBuddy — mascotte du cours" role="button" tabindex="0">
                <i class="fas fa-terminal"></i>
            </div>
        `;
        document.body.appendChild(container);

        const avatar = document.getElementById('bashbuddy-avatar');
        const bubble = document.getElementById('bashbuddy-bubble');
        let timer;
        const showTip = () => {
            const tip = this.tips[Math.floor(Math.random() * this.tips.length)];
            bubble.textContent = tip;
            bubble.classList.add('visible');
            clearTimeout(timer);
            timer = setTimeout(() => bubble.classList.remove('visible'), 5000);
        };
        avatar.addEventListener('click', showTip);
        avatar.addEventListener('keydown', e => { if (e.key === 'Enter') showTip(); });

        // Show welcome tip after 3s
        setTimeout(showTip, 3000);
    }
};

document.addEventListener('DOMContentLoaded', () => GameEngine.init());

/* ============================================
   RD MERISE — Gamification Engine
   ============================================ */

const GameEngine = {
    storageKey: 'rd_merise_progress',

    badges: [
        { id: 'first_step',    name: 'Premier Pas',        icon: '🏁', desc: 'Complète ton premier exercice', xp: 10 },
        { id: 'explorer',      name: 'Explorateur',        icon: '🔍', desc: 'Termine 10 exercices', xp: 50 },
        { id: 'si_master',     name: 'Maître SI',          icon: '📚', desc: 'Finis le module SI & MERISE', xp: 30 },
        { id: 'mcd_guru',      name: 'Gourou MCD',         icon: '🧩', desc: 'Finis le module MCD', xp: 30 },
        { id: 'mld_expert',    name: 'Expert MLD',         icon: '🗃️', desc: 'Finis le module MLD', xp: 30 },
        { id: 'ext_hero',      name: 'Héros Extensions',   icon: '🔧', desc: 'Finis Extensions & Normalisation', xp: 30 },
        { id: 'flux_pro',      name: 'Pro des Flux',       icon: '🔄', desc: 'Finis le module Flux', xp: 30 },
        { id: 'mct_ace',       name: 'As du MCT',          icon: '⚙️', desc: 'Finis le module MCT', xp: 40 },
        { id: 'quiz_king',     name: 'Roi du Quiz',        icon: '👑', desc: '50 QCM corrects', xp: 60 },
        { id: 'streak_3',      name: 'Série de 3',         icon: '🔥', desc: '3 jours consécutifs', xp: 25 },
        { id: 'streak_7',      name: 'Semaine Active',     icon: '⭐', desc: '7 jours consécutifs', xp: 50 },
        { id: 'perfectionist', name: 'Perfectionniste',    icon: '💎', desc: '10 exercices parfaits', xp: 40 },
        { id: 'half_way',      name: 'Mi-Parcours',        icon: '🎯', desc: '50% du cours terminé', xp: 35 },
        { id: 'certified',     name: 'Certifié MERISE',    icon: '🎓', desc: 'Termine le simulateur', xp: 80 },
        { id: 'legend',        name: 'Légende Conception', icon: '🏆', desc: '100% du cours terminé', xp: 100 }
    ],

    levels: [
        { min: 0,   title: 'Débutant' },
        { min: 30,  title: 'Apprenti Analyste' },
        { min: 80,  title: 'Modélisateur Jr.' },
        { min: 150, title: 'Concepteur SI' },
        { min: 250, title: 'Analyste MERISE' },
        { min: 400, title: 'Architecte SI' },
        { min: 600, title: 'Expert Conception' }
    ],

    tips: [
        "MERISE sépare données et traitements — pense MCD + MCT ! 🧩",
        "Un MCD a 3 composants : entités, associations, cardinalités.",
        "Cardinalité (0,n) = optionnel-multiple, (1,1) = obligatoire-unique.",
        "Règle MLD : association [n,n] → nouvelle table avec clés concaténées.",
        "1FN = attributs atomiques. 2FN = dépend de TOUTE la clé. 3FN = pas de transitivité.",
        "Le MCT décrit le QUOI (pas le QUI ni le COMMENT). 📋",
        "Un processus = ensemble d'activités transformant des entrées en sorties.",
        "Le schéma de flux montre QUI échange QUOI avec QUI.",
        "Variable d'écart ≥ → négative, ≤ → positive.",
        "Le MLD se déduit du MCD par 3 règles de passage simples. 🗃️"
    ],

    data: null,

    load() {
        try {
            this.data = JSON.parse(localStorage.getItem(this.storageKey)) || {};
        } catch(e) { this.data = {}; }
        if (!this.data.xp) this.data.xp = 0;
        if (!this.data.badges) this.data.badges = [];
        if (!this.data.streak) this.data.streak = { last: null, count: 0 };
        if (!this.data.stats) this.data.stats = { exercises: 0, quizCorrect: 0, perfect: 0, chaptersCompleted: [] };
    },

    save() {
        try { localStorage.setItem(this.storageKey, JSON.stringify(this.data)); } catch(e) {}
    },

    addXP(amount) {
        this.load();
        this.data.xp += amount;
        this.save();
        this.updateBar();
        this.checkMilestones();
    },

    getLevel() {
        this.load();
        let lvl = this.levels[0];
        for (const l of this.levels) {
            if (this.data.xp >= l.min) lvl = l;
        }
        return lvl;
    },

    getNextLevel() {
        this.load();
        for (const l of this.levels) {
            if (this.data.xp < l.min) return l;
        }
        return null;
    },

    updateBar() {
        const level = this.getLevel();
        const next = this.getNextLevel();
        const levelEl = document.querySelector('.xp-level');
        const fillEl = document.querySelector('.xp-bar-fill');
        const textEl = document.querySelector('.xp-text');
        if (levelEl) levelEl.textContent = level.title;
        if (next && fillEl) {
            const pct = ((this.data.xp - level.min) / (next.min - level.min)) * 100;
            fillEl.style.width = Math.min(pct, 100) + '%';
        } else if (fillEl) {
            fillEl.style.width = '100%';
        }
        if (textEl) textEl.textContent = this.data.xp + ' XP';
    },

    unlockBadge(badgeId) {
        this.load();
        if (this.data.badges.includes(badgeId)) return;
        const badge = this.badges.find(b => b.id === badgeId);
        if (!badge) return;
        this.data.badges.push(badgeId);
        this.data.xp += badge.xp;
        this.save();
        this.updateBar();
        this.showToast(badge);
    },

    showToast(badge) {
        const t = document.createElement('div');
        t.style.cssText = 'position:fixed;bottom:4rem;right:1rem;background:var(--bg-primary);border:2px solid var(--accent);border-radius:14px;padding:1rem 1.5rem;z-index:9999;display:flex;align-items:center;gap:.8rem;box-shadow:0 8px 30px var(--accent-glow);animation:fadeUp .4s ease;font-size:.9rem;';
        t.innerHTML = `<span style="font-size:1.8rem">${badge.icon}</span><div><strong style="color:var(--accent)">${badge.name}</strong><br><small style="color:var(--text-muted)">${badge.desc} — +${badge.xp} XP</small></div>`;
        document.body.appendChild(t);
        setTimeout(() => { t.style.opacity = '0'; t.style.transition = 'opacity .4s'; setTimeout(() => t.remove(), 400); }, 3000);
    },

    completeExercise(correct) {
        this.load();
        this.data.stats.exercises++;
        if (correct) this.data.stats.quizCorrect++;
        this.addXP(correct ? 5 : 1);
        if (this.data.stats.exercises === 1) this.unlockBadge('first_step');
        if (this.data.stats.exercises >= 10) this.unlockBadge('explorer');
        if (this.data.stats.quizCorrect >= 50) this.unlockBadge('quiz_king');
        this.updateStreak();
        this.save();
    },

    completeChapter(num) {
        this.load();
        if (!this.data.stats.chaptersCompleted.includes(num)) {
            this.data.stats.chaptersCompleted.push(num);
            this.addXP(20);
            const map = { 1: 'si_master', 2: 'mcd_guru', 3: 'mld_expert', 4: 'ext_hero', 5: 'flux_pro', 6: 'mct_ace' };
            if (map[num]) this.unlockBadge(map[num]);
            if (this.data.stats.chaptersCompleted.length >= 3) this.unlockBadge('half_way');
            if (this.data.stats.chaptersCompleted.length >= 6) this.unlockBadge('legend');
        }
        this.save();
    },

    updateStreak() {
        const today = new Date().toDateString();
        if (this.data.streak.last === today) return;
        const yesterday = new Date(Date.now() - 86400000).toDateString();
        if (this.data.streak.last === yesterday) {
            this.data.streak.count++;
        } else {
            this.data.streak.count = 1;
        }
        this.data.streak.last = today;
        if (this.data.streak.count >= 3) this.unlockBadge('streak_3');
        if (this.data.streak.count >= 7) this.unlockBadge('streak_7');
    },

    checkMilestones() {},

    showTip() {
        return this.tips[Math.floor(Math.random() * this.tips.length)];
    },

    init() {
        this.load();
        this.updateBar();
    }
};

document.addEventListener('DOMContentLoaded', () => GameEngine.init());

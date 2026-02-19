/* ============================================
   RD UML — Gamification Engine
   Mascotte : UML Architect (fa-diagram-project)
   ============================================ */

const GameEngine = {
    storageKey: 'rd_uml_progress',

    badges: [
        { id: 'first_step',    name: 'Premier Pas',         icon: '🏁', desc: 'Complète ton premier exercice', xp: 10 },
        { id: 'explorer',      name: 'Explorateur',         icon: '🔍', desc: 'Termine 10 exercices', xp: 50 },
        { id: 'modeling_init', name: 'Initié Modélisation', icon: '📐', desc: 'Finis le module Introduction', xp: 30 },
        { id: 'class_master',  name: 'Maître des Classes',  icon: '🏗️', desc: 'Finis le module Classes', xp: 30 },
        { id: 'usecase_pro',   name: 'Pro Cas d\'utilisation', icon: '👥', desc: 'Finis le module Cas d\'utilisation', xp: 30 },
        { id: 'activity_hero', name: 'Héros Activités',     icon: '🔄', desc: 'Finis le module Activités', xp: 30 },
        { id: 'sequence_ace',  name: 'As des Séquences',    icon: '📊', desc: 'Finis le module Séquences', xp: 30 },
        { id: 'quiz_king',     name: 'Roi du Quiz',         icon: '👑', desc: '30 QCM corrects', xp: 60 },
        { id: 'streak_3',      name: 'Série de 3',          icon: '🔥', desc: '3 jours consécutifs', xp: 25 },
        { id: 'streak_7',      name: 'Semaine Active',      icon: '⭐', desc: '7 jours consécutifs', xp: 50 },
        { id: 'perfectionist', name: 'Perfectionniste',     icon: '💎', desc: '10 exercices parfaits', xp: 40 },
        { id: 'half_way',      name: 'Mi-Parcours',         icon: '🎯', desc: '50% du cours terminé', xp: 35 },
        { id: 'certified',     name: 'Certifié UML',        icon: '🎓', desc: 'Termine le simulateur', xp: 80 },
        { id: 'legend',        name: 'Légende UML',         icon: '👨‍💻', desc: '100% du cours', xp: 100 }
    ],

    levels: [
        { min: 0,   title: 'Débutant' },
        { min: 30,  title: 'Apprenti' },
        { min: 80,  title: 'Modélisateur Jr.' },
        { min: 150, title: 'Modélisateur' },
        { min: 250, title: 'Architecte UML' },
        { min: 400, title: 'Expert UML' },
        { min: 600, title: 'Légende UML' }
    ],

    tips: [
        "UML = Unified Modeling Language. 13 types de diagrammes ! 📐",
        "Un diagramme de classes montre la structure statique du système.",
        "Les cas d'utilisation décrivent CE QUE fait le système, pas COMMENT.",
        "Composition (losange noir) = le composant ne survit pas sans le tout.",
        "Agrégation (losange blanc) = relation plus faible que la composition.",
        "Un acteur est toujours EXTERNE au système.",
        "Include = obligatoire. Extend = optionnel. Ne confonds pas !",
        "Les diagrammes de séquence montrent les interactions dans le TEMPS.",
        "Message synchrone → bloquant. Message asynchrone → non bloquant.",
        "Les couloirs d'activité montrent QUI fait QUOI dans un processus."
    ],

    data: null,

    init() {
        this.load();
        this.renderXPBar();
    },

    load() {
        let raw = null;
        try { raw = localStorage.getItem(this.storageKey); } catch(e) {}
        this.data = raw ? JSON.parse(raw) : {
            xp: 0, badges: [], exercisesCompleted: 0,
            quizCorrect: 0, perfectStreak: 0,
            streak: 0, lastVisit: null, chaptersCompleted: []
        };
        const today = new Date().toDateString();
        if (this.data.lastVisit !== today) {
            const yesterday = new Date(Date.now() - 86400000).toDateString();
            this.data.streak = this.data.lastVisit === yesterday ? this.data.streak + 1 : 1;
            this.data.lastVisit = today;
            this.save();
        }
    },

    save() { try { localStorage.setItem(this.storageKey, JSON.stringify(this.data)); } catch(e) {} },

    addXP(amount) {
        const oldLevel = this.getLevel();
        this.data.xp += amount;
        this.save();
        const newLevel = this.getLevel();
        if (newLevel.title !== oldLevel.title) {
            this.showToast(`🎉 Niveau supérieur : ${newLevel.title} !`);
        }
        this.renderXPBar();
    },

    getLevel() {
        let current = this.levels[0];
        for (const l of this.levels) { if (this.data.xp >= l.min) current = l; }
        return current;
    },

    getNextLevel() {
        const idx = this.levels.indexOf(this.getLevel());
        return idx < this.levels.length - 1 ? this.levels[idx + 1] : null;
    },

    unlockBadge(id) {
        if (this.data.badges.includes(id)) return;
        const badge = this.badges.find(b => b.id === id);
        if (!badge) return;
        this.data.badges.push(id);
        this.addXP(badge.xp);
        this.showToast(`${badge.icon} Badge débloqué : ${badge.name}`);
        this.confetti();
    },

    exerciseCompleted(correct) {
        this.data.exercisesCompleted++;
        if (correct) {
            this.data.quizCorrect++;
            this.data.perfectStreak++;
        } else {
            this.data.perfectStreak = 0;
        }
        this.save();
        if (this.data.exercisesCompleted === 1) this.unlockBadge('first_step');
        if (this.data.exercisesCompleted >= 10) this.unlockBadge('explorer');
        if (this.data.quizCorrect >= 30) this.unlockBadge('quiz_king');
        if (this.data.perfectStreak >= 10) this.unlockBadge('perfectionist');
        if (this.data.streak >= 3) this.unlockBadge('streak_3');
        if (this.data.streak >= 7) this.unlockBadge('streak_7');
    },

    completeChapter(chNum) {
        if (!this.data.chaptersCompleted.includes(chNum)) {
            this.data.chaptersCompleted.push(chNum);
            this.save();
            this.addXP(20);
            const badgeMap = {1:'modeling_init',2:'class_master',3:'usecase_pro',4:'activity_hero',5:'sequence_ace'};
            if (badgeMap[chNum]) this.unlockBadge(badgeMap[chNum]);
            if (this.data.chaptersCompleted.length >= 3) this.unlockBadge('half_way');
            if (this.data.chaptersCompleted.length >= 5) this.unlockBadge('legend');
        }
    },

    renderXPBar() {
        const container = document.querySelector('.xp-bar-container');
        if (!container) return;
        const level = this.getLevel();
        const next = this.getNextLevel();
        const pct = next ? ((this.data.xp - level.min) / (next.min - level.min) * 100) : 100;
        container.innerHTML = `
            <button class="mascot-btn" title="UML Coach"><i class="fas fa-diagram-project"></i></button>
            <div style="font-weight:700;color:var(--accent);min-width:90px;">${level.title}</div>
            <div class="xp-bar"><div class="xp-fill" style="width:${Math.min(pct,100)}%"></div></div>
            <div style="font-weight:600;color:var(--text-muted);">${this.data.xp} XP</div>
        `;
        container.querySelector('.mascot-btn').addEventListener('click', () => this.toggleTip());
    },

    toggleTip() {
        let bubble = document.querySelector('.mascot-bubble');
        if (bubble?.classList.contains('visible')) { bubble.classList.remove('visible'); return; }
        if (!bubble) {
            bubble = document.createElement('div');
            bubble.className = 'mascot-bubble';
            document.body.appendChild(bubble);
        }
        const tip = this.tips[Math.floor(Math.random() * this.tips.length)];
        bubble.innerHTML = `<strong>📐 UML Coach :</strong><br>${tip}`;
        bubble.classList.add('visible');
        setTimeout(() => bubble.classList.remove('visible'), 6000);
    },

    showToast(msg) {
        let toast = document.querySelector('.badge-toast');
        if (!toast) {
            toast = document.createElement('div');
            toast.className = 'badge-toast';
            document.body.appendChild(toast);
        }
        toast.textContent = msg;
        toast.classList.add('visible');
        setTimeout(() => toast.classList.remove('visible'), 3500);
    },

    confetti() {
        for (let i = 0; i < 30; i++) {
            const c = document.createElement('div');
            Object.assign(c.style, {
                position: 'fixed', width: '8px', height: '8px',
                borderRadius: Math.random() > 0.5 ? '50%' : '0',
                background: ['#E91E8C','#F472B6','#BE185D','#F9A8D4','#9D174D'][Math.floor(Math.random()*5)],
                left: Math.random() * 100 + 'vw', top: '-10px', zIndex: '99999',
                pointerEvents: 'none'
            });
            document.body.appendChild(c);
            c.animate([
                { transform: 'translateY(0) rotate(0)', opacity: 1 },
                { transform: `translateY(${60+Math.random()*40}vh) rotate(${Math.random()*720}deg)`, opacity: 0 }
            ], { duration: 1500+Math.random()*1500, easing: 'cubic-bezier(0.25,0.46,0.45,0.94)' })
            .onfinish = () => c.remove();
        }
    }
};

document.addEventListener('DOMContentLoaded', () => GameEngine.init());

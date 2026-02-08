/* ============================================
   RD Java — Gamification Engine
   Mascotte : JavaDuke (fa-mug-hot)
   ============================================ */

const GameEngine = {
    storageKey: 'rd_java_progress',

    badges: [
        { id: 'first_step',    name: 'Premier Pas',        icon: '🏁', desc: 'Complète ton premier exercice', xp: 10 },
        { id: 'explorer',      name: 'Explorateur',        icon: '🔍', desc: 'Termine 10 exercices', xp: 50 },
        { id: 'syntax_master', name: 'Maître Syntaxe',     icon: '📝', desc: 'Finis le module Syntaxe', xp: 30 },
        { id: 'var_guru',      name: 'Architecte Variables',icon: '📦', desc: 'Finis le module Variables', xp: 30 },
        { id: 'io_pro',        name: 'Pro Entrées/Sorties',icon: '🖥️', desc: 'Finis le module Affichages', xp: 30 },
        { id: 'logic_hero',    name: 'Héros Logique',      icon: '🧠', desc: 'Finis le module Conditions', xp: 30 },
        { id: 'loop_expert',   name: 'Expert Boucles',     icon: '🔄', desc: 'Finis le module Boucles', xp: 30 },
        { id: 'array_wizard',  name: 'Virtuose Tableaux',  icon: '📊', desc: 'Finis le module Tableaux', xp: 30 },
        { id: 'func_master',   name: 'Maître Fonctions',   icon: '⚙️', desc: 'Finis le module Fonctions', xp: 30 },
        { id: 'oop_initiate',  name: 'Initié POO',         icon: '🏗️', desc: 'Finis le module Classes', xp: 30 },
        { id: 'encaps_pro',    name: 'Pro Encapsulation',  icon: '🔒', desc: 'Finis le module Encapsulation', xp: 30 },
        { id: 'collection_ace',name: 'As Collections',     icon: '🗂️', desc: 'Finis le module Collections', xp: 30 },
        { id: 'quiz_king',     name: 'Roi du Quiz',        icon: '👑', desc: '50 QCM corrects', xp: 60 },
        { id: 'streak_3',      name: 'Série de 3',         icon: '🔥', desc: '3 jours consécutifs de pratique', xp: 25 },
        { id: 'streak_7',      name: 'Semaine Active',     icon: '⭐', desc: '7 jours consécutifs', xp: 50 },
        { id: 'perfectionist', name: 'Perfectionniste',    icon: '💎', desc: '10 exercices parfaits d\'affilée', xp: 40 },
        { id: 'half_way',      name: 'Mi-Parcours',        icon: '🎯', desc: '50% du cours terminé', xp: 35 },
        { id: 'almost_done',   name: 'Presque !',          icon: '🏆', desc: '80% du cours terminé', xp: 50 },
        { id: 'certified',     name: 'Certifié Java',      icon: '🎓', desc: 'Termine le simulateur d\'examen', xp: 80 },
        { id: 'legend',        name: 'Légende',            icon: '👨‍💻', desc: 'Termine 100% du cours', xp: 100 }
    ],

    levels: [
        { min: 0,   title: 'Débutant' },
        { min: 30,  title: 'Apprenti' },
        { min: 80,  title: 'Développeur Jr.' },
        { min: 150, title: 'Développeur' },
        { min: 250, title: 'Développeur Senior' },
        { min: 400, title: 'Architecte Java' },
        { min: 600, title: 'Légende Java' }
    ],

    tips: [
        "En Java, tout est objet (sauf les types primitifs) ! ☕",
        "Utilise toujours .equals() pour comparer des String, jamais ==.",
        "Un bon nom de variable vaut mieux qu'un commentaire. 📝",
        "Pense à fermer ton Scanner avec sc.close() après utilisation.",
        "Les index commencent à 0 en Java. Toujours.",
        "Une méthode = une responsabilité. Garde tes méthodes courtes !",
        "L'encapsulation protège tes données. Private + getters/setters.",
        "ArrayList est plus flexible qu'un tableau classique. 📊",
        "N'oublie pas le break dans tes switch-case !",
        "Convention Java : classes en PascalCase, variables en camelCase."
    ],

    data: null,

    init() {
        this.load();
        this.renderXPBar();
    },

    load() {
        const raw = localStorage.getItem(this.storageKey);
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

    save() { localStorage.setItem(this.storageKey, JSON.stringify(this.data)); },

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
        if (this.data.quizCorrect >= 50) this.unlockBadge('quiz_king');
        if (this.data.perfectStreak >= 10) this.unlockBadge('perfectionist');
        if (this.data.streak >= 3) this.unlockBadge('streak_3');
        if (this.data.streak >= 7) this.unlockBadge('streak_7');
    },

    renderXPBar() {
        const container = document.querySelector('.xp-bar-container');
        if (!container) return;
        const level = this.getLevel();
        const next = this.getNextLevel();
        const pct = next ? ((this.data.xp - level.min) / (next.min - level.min) * 100) : 100;
        container.innerHTML = `
            <button class="mascot-btn" title="JavaDuke"><i class="fas fa-mug-hot"></i></button>
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
        bubble.innerHTML = `<strong>☕ JavaDuke :</strong><br>${tip}`;
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
                background: ['#ef4444','#f87171','#dc2626','#fca5a5','#b91c1c'][Math.floor(Math.random()*5)],
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

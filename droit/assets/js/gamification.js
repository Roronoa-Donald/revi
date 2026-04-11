/* ============================================
   RD WINSERVER — Gamification Engine
   Mascotte : WinGuard (fa-shield-halved)
   ============================================ */

const GameEngine = {
    storageKey: 'rd_winserver_progress',

    badges: [
        { id: 'first_step',    name: 'Premier Pas',        icon: '🏁', desc: 'Complète ton premier exercice', xp: 10 },
        { id: 'explorer',      name: 'Explorateur',        icon: '🔍', desc: 'Termine 10 exercices', xp: 50 },
        { id: 'ad_master',     name: 'Maître AD',          icon: '🏰', desc: 'Finis le module Active Directory', xp: 30 },
        { id: 'gpo_guru',      name: 'Architecte GPO',     icon: '📜', desc: 'Finis le module GPO', xp: 30 },
        { id: 'network_pro',   name: 'Pro Réseau',         icon: '🌐', desc: 'Finis le module DNS/DHCP', xp: 30 },
        { id: 'backup_hero',   name: 'Gardien des Données',icon: '💾', desc: 'Finis le module Sauvegarde', xp: 30 },
        { id: 'ha_expert',     name: 'Expert HA',          icon: '⚡', desc: 'Finis le module Haute Disponibilité', xp: 30 },
        { id: 'maintainer',    name: 'Mainteneur',         icon: '🔧', desc: 'Finis le module Maintenance', xp: 30 },
        { id: 'vm_wizard',     name: 'Virtuose VM',        icon: '💻', desc: 'Finis le module Hyper-V', xp: 30 },
        { id: 'quiz_king',     name: 'Roi du Quiz',        icon: '👑', desc: '50 QCM corrects', xp: 60 },
        { id: 'streak_3',      name: 'Série de 3',         icon: '🔥', desc: '3 jours consécutifs de pratique', xp: 25 },
        { id: 'streak_7',      name: 'Semaine Active',     icon: '⭐', desc: '7 jours consécutifs', xp: 50 },
        { id: 'perfectionist', name: 'Perfectionniste',    icon: '💎', desc: '10 exercices parfaits d\'affilée', xp: 40 },
        { id: 'half_way',      name: 'Mi-Parcours',        icon: '🎯', desc: '50% du cours terminé', xp: 35 },
        { id: 'almost_done',   name: 'Presque !',          icon: '🏆', desc: '80% du cours terminé', xp: 50 },
        { id: 'certified',     name: 'Certifié WinServer', icon: '🎓', desc: 'Termine le simulateur d\'examen', xp: 80 },
        { id: 'legend',        name: 'Légende',            icon: '👨‍💻', desc: 'Termine 100% du cours', xp: 100 }
    ],

    levels: [
        { min: 0,   title: 'Stagiaire' },
        { min: 30,  title: 'Technicien' },
        { min: 80,  title: 'Administrateur' },
        { min: 150, title: 'Ingénieur Système' },
        { min: 250, title: 'Architecte' },
        { min: 400, title: 'Expert Senior' },
        { min: 600, title: 'Légende WinServer' }
    ],

    tips: [
        "N'oublie pas : un AD bien structuré, c'est un admin serein ! 🏰",
        "Teste toujours tes GPO sur une OU de test avant le déploiement.",
        "La règle 3-2-1 : 3 copies, 2 supports, 1 hors-site. Toujours !",
        "Un snapshot n'est PAS une sauvegarde. C'est un filet de sécurité temporaire.",
        "Failover Clustering nécessite un stockage partagé. Penses-y !",
        "Vérifie tes Event Logs chaque semaine. Prévenir > Guérir.",
        "PowerShell est ton meilleur ami pour l'automatisation Windows.",
        "WSUS centralise les mises à jour. Ne les laisse pas au hasard.",
        "Un bon administrateur documente TOUT. Ton futur toi te remerciera."
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
        // Update streak
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
        // Check badges
        if (this.data.exercisesCompleted === 1) this.unlockBadge('first_step');
        if (this.data.exercisesCompleted >= 10) this.unlockBadge('explorer');
        if (this.data.quizCorrect >= 50) this.unlockBadge('quiz_king');
        if (this.data.perfectStreak >= 10) this.unlockBadge('perfectionist');
        if (this.data.streak >= 3) this.unlockBadge('streak_3');
        if (this.data.streak >= 7) this.unlockBadge('streak_7');
    },

    completeChapter(chapterNum) {
        if (!this.data.chaptersCompleted) this.data.chaptersCompleted = [];
        if (!this.data.chaptersCompleted.includes(chapterNum)) {
            this.data.chaptersCompleted.push(chapterNum);
            const chapterBadges = {2:'ad_master',3:'gpo_guru',4:'network_pro',5:'backup_hero',6:'ha_expert',7:'maintainer',8:'vm_wizard'};
            if (chapterBadges[chapterNum]) this.unlockBadge(chapterBadges[chapterNum]);
            if (this.data.chaptersCompleted.length >= 4) this.unlockBadge('half_way');
            if (this.data.chaptersCompleted.length >= 7) this.unlockBadge('almost_done');
            if (this.data.chaptersCompleted.length >= 8) this.unlockBadge('legend');
            this.save();
        }
    },

    certifyExam() {
        this.unlockBadge('certified');
        this.save();
    },

    renderXPBar() {
        const container = document.querySelector('.xp-bar-container');
        if (!container) return;
        const level = this.getLevel();
        const next = this.getNextLevel();
        const pct = next ? ((this.data.xp - level.min) / (next.min - level.min) * 100) : 100;
        container.innerHTML = `
            <button class="mascot-btn" title="WinGuard"><i class="fas fa-shield-halved"></i></button>
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
        bubble.innerHTML = `<strong>🛡️ WinGuard :</strong><br>${tip}`;
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
                background: ['#6b7280','#9ca3af','#374151','#d1d5db','#4b5563'][Math.floor(Math.random()*5)],
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

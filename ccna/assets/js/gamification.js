/* ============================================
   RD CCNA — Gamification Engine
   Mascotte : Cisco Router (fa-network-wired)
   ============================================ */

const GameEngine = {
    storageKey: 'rd_ccna_progress',

    badges: [
        { id: 'first_step',    name: 'Premier Pas',       icon: '🏁', desc: 'Complète ton premier exercice', xp: 10 },
        { id: 'explorer',      name: 'Explorateur',       icon: '🔍', desc: 'Termine 10 exercices', xp: 50 },
        { id: 'osi_master',    name: 'Maître OSI',        icon: '📚', desc: 'Finis le module Fondamentaux', xp: 30 },
        { id: 'subnet_guru',   name: 'Gourou Sous-réseaux', icon: '🧮', desc: 'Finis le module Adressage', xp: 30 },
        { id: 'proto_expert',  name: 'Expert Protocoles', icon: '📡', desc: 'Finis le module Protocoles', xp: 30 },
        { id: 'switch_hero',   name: 'Héros Switching',   icon: '🔌', desc: 'Finis le module Ethernet', xp: 30 },
        { id: 'cli_ninja',     name: 'Ninja CLI',         icon: '⌨️', desc: 'Finis le module Cisco IOS', xp: 30 },
        { id: 'route_pro',     name: 'Pro Routage',       icon: '🛤️', desc: 'Finis le module Routage', xp: 30 },
        { id: 'vlan_ace',      name: 'As VLAN',           icon: '🏷️', desc: 'Finis le module VLANs', xp: 30 },
        { id: 'roas_legend',   name: 'Légende ROAS',      icon: '🌐', desc: 'Finis le module ROAS', xp: 40 },
        { id: 'quiz_king',     name: 'Roi du Quiz',       icon: '👑', desc: '50 QCM corrects', xp: 60 },
        { id: 'streak_3',      name: 'Série de 3',        icon: '🔥', desc: '3 jours consécutifs', xp: 25 },
        { id: 'streak_7',      name: 'Semaine Active',    icon: '⭐', desc: '7 jours consécutifs', xp: 50 },
        { id: 'perfectionist', name: 'Perfectionniste',   icon: '💎', desc: '10 exercices parfaits', xp: 40 },
        { id: 'half_way',      name: 'Mi-Parcours',       icon: '🎯', desc: '50% du cours terminé', xp: 35 },
        { id: 'certified',     name: 'Certifié CCNA',     icon: '🎓', desc: 'Termine le simulateur', xp: 80 },
        { id: 'legend',        name: 'Légende Réseau',    icon: '🏆', desc: '100% du cours terminé', xp: 100 }
    ],

    levels: [
        { min: 0,   title: 'Débutant' },
        { min: 30,  title: 'Apprenti Réseau' },
        { min: 80,  title: 'Technicien Jr.' },
        { min: 150, title: 'Technicien Réseau' },
        { min: 250, title: 'Admin Réseau' },
        { min: 400, title: 'Ingénieur Réseau' },
        { min: 600, title: 'Architecte Réseau' }
    ],

    tips: [
        "Le modèle OSI a 7 couches : Please Do Not Throw Sausage Pizza Away ! 🍕",
        "Un masque /24 = 255.255.255.0 = 254 hôtes utilisables.",
        "ARP résout une IP en adresse MAC. Vérifie avec show arp ! 📡",
        "STP bloque les boucles L2. Le root bridge a le BID le plus bas.",
        "DHCP utilise UDP ports 67 (serveur) et 68 (client). 📋",
        "DNS résout les noms en IP — port 53, UDP par défaut, TCP si > 512 octets.",
        "Le mode enable t'amène en mode privilégié (#). N'oublie pas ! ⌨️",
        "show running-config affiche la config en mémoire RAM (active).",
        "Un VLAN segmente un réseau L2. Chaque VLAN = un domaine de broadcast.",
        "ROAS utilise des sous-interfaces sur le routeur pour router entre VLANs. 🌐"
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

    unlockBadge(id) {
        this.load();
        if (this.data.badges.includes(id)) return false;
        const badge = this.badges.find(b => b.id === id);
        if (!badge) return false;
        this.data.badges.push(id);
        this.data.xp += badge.xp;
        this.save();
        this.updateBar();
        this.showBadgeNotification(badge);
        return true;
    },

    completeChapter(num) {
        this.load();
        if (!this.data.stats.chaptersCompleted.includes(num)) {
            this.data.stats.chaptersCompleted.push(num);
            this.save();
        }
        const map = { 1:'osi_master', 2:'subnet_guru', 3:'proto_expert', 4:'switch_hero',
                      5:'cli_ninja', 6:'route_pro', 7:'vlan_ace', 8:'roas_legend' };
        if (map[num]) this.unlockBadge(map[num]);
        this.checkMilestones();
    },

    completeExercise(perfect) {
        this.load();
        this.data.stats.exercises++;
        if (perfect) this.data.stats.perfect++;
        else this.data.stats.perfect = 0;
        this.save();
        if (this.data.stats.exercises === 1) this.unlockBadge('first_step');
        if (this.data.stats.exercises >= 10) this.unlockBadge('explorer');
        if (this.data.stats.perfect >= 10) this.unlockBadge('perfectionist');
        this.addXP(perfect ? 8 : 4);
        this.updateStreak();
    },

    correctQuiz() {
        this.load();
        this.data.stats.quizCorrect++;
        this.save();
        if (this.data.stats.quizCorrect >= 50) this.unlockBadge('quiz_king');
    },

    updateStreak() {
        const today = new Date().toISOString().slice(0, 10);
        if (this.data.streak.last === today) return;
        const yesterday = new Date(Date.now() - 86400000).toISOString().slice(0, 10);
        this.data.streak.count = (this.data.streak.last === yesterday) ? this.data.streak.count + 1 : 1;
        this.data.streak.last = today;
        this.save();
        if (this.data.streak.count >= 3) this.unlockBadge('streak_3');
        if (this.data.streak.count >= 7) this.unlockBadge('streak_7');
    },

    checkMilestones() {
        this.load();
        const pct = this.data.stats.chaptersCompleted.length / 8;
        if (pct >= 0.5) this.unlockBadge('half_way');
        if (pct >= 1) this.unlockBadge('legend');
    },

    showBadgeNotification(badge) {
        const div = document.createElement('div');
        div.style.cssText = 'position:fixed;top:1rem;right:1rem;z-index:10000;background:#0f172a;border:1px solid #06b6d4;border-radius:14px;padding:1rem 1.5rem;display:flex;align-items:center;gap:.8rem;box-shadow:0 8px 32px rgba(6,182,212,.25);animation:fadeUp .4s ease;max-width:320px;color:#e2e8f0;';
        div.innerHTML = `<span style="font-size:1.8rem">${badge.icon}</span><div><div style="font-weight:800;font-size:.9rem;color:#06b6d4">Badge débloqué !</div><div style="font-size:.82rem">${badge.name} (+${badge.xp} XP)</div></div>`;
        document.body.appendChild(div);
        setTimeout(() => { div.style.opacity = '0'; div.style.transition = 'opacity .4s'; setTimeout(() => div.remove(), 400); }, 3500);
        this.confetti();
    },

    confetti() {
        const colors = ['#06b6d4', '#22d3ee', '#0891b2', '#67e8f9', '#0e7490', '#fff'];
        for (let i = 0; i < 35; i++) {
            const c = document.createElement('div');
            c.style.cssText = `position:fixed;top:-10px;left:${Math.random()*100}%;width:${4+Math.random()*6}px;height:${4+Math.random()*6}px;background:${colors[Math.floor(Math.random()*colors.length)]};border-radius:${Math.random()>.5?'50%':'2px'};z-index:10001;pointer-events:none;`;
            document.body.appendChild(c);
            const dur = 1200 + Math.random() * 1200;
            c.animate([
                { transform: 'translateY(0) rotate(0deg)', opacity: 1 },
                { transform: `translateY(${window.innerHeight+50}px) rotate(${Math.random()*720}deg)`, opacity: 0 }
            ], { duration: dur, easing: 'cubic-bezier(.25,.46,.45,.94)' }).onfinish = () => c.remove();
        }
    },

    showTip() {
        const tip = this.tips[Math.floor(Math.random() * this.tips.length)];
        const el = document.getElementById('mascot-tip');
        if (el) { el.textContent = tip; el.closest('.mascot-bubble')?.classList.add('show'); }
    },

    init() {
        this.load();
        this.updateBar();
        setTimeout(() => this.showTip(), 1500);
    }
};

document.addEventListener('DOMContentLoaded', () => GameEngine.init());

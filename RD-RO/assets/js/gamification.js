/**
 * MOTEUR DE GAMIFICATION - OPTIMUS PRIME EDITION
 * Features: XP, Niveaux, Notifications, Avatar Robot
 */

const GameEngineRO = {
    state: {
        xp: 0,
        level: 1,
        badges: [],
        completed: [] // exercics/quiz IDs
    },

    init() {
        this.load();
        this.renderOptimus();
        this.updateUI();
    },

    load() {
        const saved = localStorage.getItem('ro_progress');
        if (saved) this.state = JSON.parse(saved);
    },

    save() {
        localStorage.setItem('ro_progress', JSON.stringify(this.state));
        this.updateUI();
    },

    addXP(amount, reason) {
        this.state.xp += amount;
        const oldLevel = this.state.level;
        this.state.level = Math.floor(this.state.xp / 100) + 1;
        
        if (this.state.level > oldLevel) {
            this.notify(`NIVEAU ${this.state.level} ATTEINT !`, 'levelup');
            this.confetti();
        } else {
            this.notify(`+${amount} XP : ${reason}`, 'xp');
        }
        this.save();
    },

    renderOptimus() {
        const div = document.createElement('div');
        div.id = 'optimus-container';
        div.innerHTML = `
            <div class="optimus-bubble" id="optimus-bubble">Salut ! Je suis Optimus. Je t'aide à optimiser ton apprentissage.</div>
            <div class="optimus-robot">
                <i class="fas fa-robot"></i>
            </div>
        `;
        document.body.appendChild(div);

        const robot = div.querySelector('.optimus-robot');
        const bubble = div.querySelector('.optimus-bubble');
        
        robot.onclick = () => {
            const tips = [
                "En RO, une contrainte est une limite physique qu'on ne peut dépasser.",
                "La fonction objectif, c'est ton but : Maximiser le profit ou Minimiser le coût.",
                "XP Actuel : " + this.state.xp + " / " + (this.state.level * 100),
                "Utilise l'outil graphique pour visualiser la 'zone réalisable'.",
                "Besoin d'aide ? Clique sur les indices !"
            ];
            bubble.textContent = tips[Math.floor(Math.random() * tips.length)];
            bubble.style.display = 'block';
            setTimeout(() => bubble.style.display = 'none', 5000);
        };
    },

    notify(msg, type) {
        const notif = document.createElement('div');
        const isLevelUp = type === 'levelup';
        notif.style.cssText = `
            position: fixed; bottom: 100px; left: 50%; transform: translateX(-50%);
            background: ${isLevelUp ? '#10b981' : 'var(--bg-card-solid, #1e293b)'};
            color: ${isLevelUp ? 'white' : 'var(--accent-light, #34d399)'};
            padding: 1rem 2rem; border-radius: 50px;
            box-shadow: 0 10px 30px rgba(0,0,0,0.3); font-weight: bold;
            z-index: 10000; animation: slideUp 0.5s forwards;
            border: 2px solid #10b981;
        `;
        notif.innerHTML = isLevelUp ? `🏆 ${msg}` : `⚡ ${msg}`;
        document.body.appendChild(notif);
        setTimeout(() => notif.remove(), 3500);
    },

    updateUI() {
        const xpDisp = document.getElementById('user-xp-display');
        if (xpDisp) {
            xpDisp.innerHTML = `
                <span class="level-badge">${this.state.level}</span>
                <span>${this.state.xp} XP</span>
            `;
        }
    },
    
    confetti() {
        const colors = ['#10b981', '#34d399', '#059669', '#06b6d4'];
        for (let i = 0; i < 40; i++) {
            const p = document.createElement('div');
            const left = Math.random() * 100;
            const size = 6 + Math.random() * 8;
            const duration = 1.5 + Math.random() * 2;
            const delay = Math.random() * 0.5;
            p.style.cssText = `
                position: fixed; width: ${size}px; height: ${size}px;
                background: ${colors[Math.floor(Math.random() * colors.length)]};
                top: -10px; left: ${left}vw;
                z-index: 9999; border-radius: 2px; opacity: 1;
                animation: confettiFall ${duration}s ${delay}s ease-in forwards;
            `;
            document.body.appendChild(p);
            setTimeout(() => p.remove(), (duration + delay) * 1000 + 200);
        }

        // Inject keyframes once
        if (!document.getElementById('confetti-keyframes')) {
            const style = document.createElement('style');
            style.id = 'confetti-keyframes';
            style.textContent = `
                @keyframes confettiFall {
                    0% { transform: translateY(0) rotate(0deg); opacity: 1; }
                    100% { transform: translateY(100vh) rotate(${360 + Math.random() * 360}deg); opacity: 0; }
                }`;
            document.head.appendChild(style);
        }
    }
};

document.addEventListener('DOMContentLoaded', () => GameEngineRO.init());

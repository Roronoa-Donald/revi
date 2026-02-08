/**
 * MOTEUR DE GAMIFICATION - DATABOT 2.0
 * Gère l'XP, les badges, les streaks et le compagnon virtuel.
 */

class DataBot {
    constructor() {
        this.state = {
            xp: 0,
            level: 1,
            badges: [], 
            completed: [], // IDs des exercices terminés
            totalXPEarned: 0, // XP totale gagnée (ne reset pas au level up)
            quizCorrect: 0,
            dragDropWins: 0,
            modulesVisited: [],
            streak: 0,
            lastVisit: null
        };
        
        // Badges Definitions — expanded
        this.badgesDef = {
            'first_query':       { icon: 'fa-play',          title: 'Première Requête',      desc: 'A exécuté sa première requête SQL',     xpReq: 10 },
            'novice_ddl':        { icon: 'fa-hammer',        title: 'Architecte en Herbe',   desc: 'A créé sa première table (DDL)',         xpReq: 50 },
            'data_inserter':     { icon: 'fa-plus-circle',   title: 'Injecteur de Données',  desc: 'Maîtrise des INSERT / UPDATE / DELETE',  xpReq: 100 },
            'select_master':     { icon: 'fa-search',        title: 'Détective SELECT',      desc: 'A maîtrisé les requêtes de sélection',   xpReq: 200 },
            'join_guru':         { icon: 'fa-project-diagram',title:'Maître des Jointures',  desc: 'A relié les tables entre elles',         xpReq: 300 },
            'function_wizard':   { icon: 'fa-magic',         title: 'Sorcier des Fonctions', desc: 'Maîtrise les fonctions SQL',             xpReq: 400 },
            'logic_brain':       { icon: 'fa-brain',         title: 'Cerveau Logique',       desc: 'Variables, IF/ELSE et CASE maîtrisés',   xpReq: 500 },
            'loop_runner':       { icon: 'fa-sync-alt',      title: 'Coureur de Boucles',    desc: 'Boucles WHILE et CURSOR compris',        xpReq: 600 },
            'transaction_master':{ icon: 'fa-lock',          title: 'Maître des Verrous',    desc: 'ACID et isolation levels maîtrisés',     xpReq: 700 },
            'proc_wizard':       { icon: 'fa-hat-wizard',    title: 'Fabricant de Procédures',desc:'A écrit une procédure stockée',          xpReq: 800 },
            'trigger_hacker':    { icon: 'fa-bolt',          title: 'Automaticien SQL',      desc: 'Triggers créés et compris',              xpReq: 900 },
            'quiz_ace':          { icon: 'fa-star',          title: 'As du Quiz',            desc: '50 réponses correctes au quiz',          quizReq: 50 },
            'drag_champion':     { icon: 'fa-trophy',        title: 'Champion Drag & Drop',  desc: '10 challenges réussis',                  dragReq: 10 },
            'xp_500':            { icon: 'fa-gem',           title: 'Collectionneur 500 XP', desc: 'A accumulé 500 XP au total',             totalReq: 500 },
            'xp_1000':           { icon: 'fa-crown',         title: 'Roi des 1000 XP',       desc: 'A accumulé 1000 XP au total',            totalReq: 1000 },
            'streak_3':          { icon: 'fa-fire',          title: 'Flamme x3',             desc: '3 jours consécutifs de pratique',         streakReq: 3 },
            'streak_7':          { icon: 'fa-fire-alt',      title: 'Flamme x7',             desc: '7 jours consécutifs de pratique',         streakReq: 7 }
        };

        this.init();
    }

    init() {
        this.load();
        this.checkStreak();
        this.updateUI();
    }

    load() {
        const saved = localStorage.getItem('rd_sql_progress');
        if (saved) {
            try {
                const parsed = JSON.parse(saved);
                this.state = { ...this.state, ...parsed };
            } catch(e) { console.error("Save corrompue"); }
        }
    }

    save() {
        localStorage.setItem('rd_sql_progress', JSON.stringify(this.state));
        this.updateUI();
    }

    checkStreak() {
        const today = new Date().toDateString();
        if (this.state.lastVisit) {
            const last = new Date(this.state.lastVisit);
            const diff = Math.floor((new Date(today) - last) / 86400000);
            if (diff === 1) {
                this.state.streak++;
            } else if (diff > 1) {
                this.state.streak = 1;
            }
        } else {
            this.state.streak = 1;
        }
        this.state.lastVisit = today;
        this.save();
    }

    trackModuleVisit(moduleId) {
        if (moduleId && !this.state.modulesVisited.includes(moduleId)) {
            this.state.modulesVisited.push(moduleId);
            this.save();
        }
    }

    completeExercise(id, xpReward = 50) {
        if (this.state.completed.includes(id)) {
            this.speak("Déjà fait ! Mais ça ne fait pas de mal de réviser.");
            return; 
        }
        
        this.state.completed.push(id);
        this.addXP(xpReward, "Exercice Validé");
        this.save();
        this.speak("Excellent travail ! Exercice validé.", "happy");
    }

    addXP(amount, reason) {
        this.state.xp += amount;
        this.state.totalXPEarned += amount;
        
        // Level Curve: 100 * level
        const needed = this.state.level * 100;
        if (this.state.xp >= needed) {
            this.state.xp -= needed;
            this.state.level++;
            this.notify(`NIVEAU ${this.state.level} ATTEINT ! BASE DE DONNÉES UPGRADÉE.`, 'levelup');
            this.speak(`Wow ! Je sens mes circuits s'optimiser. Niveau ${this.state.level} !`, "excited");
            this.confetti();
        } else {
            this.notify(`+${amount} XP : ${reason}`, 'xp');
        }
        this.save();
        this.checkBadges();
    }

    checkBadges() {
        for (const [id, def] of Object.entries(this.badgesDef)) {
            if (this.state.badges.includes(id)) continue;

            let earned = false;

            if (def.xpReq && this.state.totalXPEarned >= def.xpReq) earned = true;
            if (def.totalReq && this.state.totalXPEarned >= def.totalReq) earned = true;
            if (def.quizReq && this.state.quizCorrect >= def.quizReq) earned = true;
            if (def.dragReq && this.state.dragDropWins >= def.dragReq) earned = true;
            if (def.streakReq && this.state.streak >= def.streakReq) earned = true;

            if (earned) {
                this.state.badges.push(id);
                this.notify(`🏆 Badge débloqué : ${def.title}`, 'badge');
                this.speak(`Badge débloqué : ${def.title} ! ${def.desc}`, 'excited');
                this.confetti();
                this.save();
            }
        }
    }

    recordQuizCorrect() {
        this.state.quizCorrect++;
        this.save();
        this.checkBadges();
    }

    recordDragDropWin() {
        this.state.dragDropWins++;
        this.save();
        this.checkBadges();
    }

    // UI RENDERING
    render(containerId) {
        const container = document.getElementById(containerId);
        if (!container) return;

        const div = document.createElement('div');
        div.className = 'flex flex-col items-center relative';
        div.innerHTML = `
            <div class="bg-white text-slate-900 p-3 rounded-t-xl rounded-bl-xl shadow-lg mb-4 opacity-0 transition-opacity duration-300 transform translate-y-2 text-sm font-medium border-2 border-blue-500 max-w-[200px]" id="databot-bubble">
                Prêt à requêter ?
            </div>
            <div class="relative cursor-pointer group" onclick="document.querySelector('.databot-instance').poke()">
                <div class="absolute -inset-1 bg-blue-500 rounded-full opacity-75 group-hover:opacity-100 blur transition-opacity animate-pulse"></div>
                <div class="relative w-16 h-16 bg-slate-900 rounded-full border-2 border-blue-400 flex items-center justify-center overflow-hidden shadow-xl">
                    <div class="text-blue-400 text-3xl transition-transform transform group-hover:scale-110" id="bot-face">
                        <i class="fas fa-database"></i>
                    </div>
                </div>
            </div>
            <!-- Streak + Badges summary -->
            <div class="mt-3 text-center">
                <div id="streak-display" class="text-xs text-amber-400 font-mono mb-2"></div>
                <div id="badges-mini" class="flex flex-wrap gap-1 justify-center max-w-[180px]"></div>
            </div>
        `;
        
        div.querySelector('.relative').classList.add('databot-instance');
        div.querySelector('.databot-instance').poke = () => this.poke();

        container.appendChild(div);

        this.renderBadgesMini();
        this.renderStreak();
        
        setTimeout(() => this.speak("Salut ! Je suis DataBot."), 1000);
    }

    renderBadgesMini() {
        const el = document.getElementById('badges-mini');
        if (!el) return;
        el.innerHTML = this.state.badges.map(id => {
            const b = this.badgesDef[id];
            return b ? `<span class="w-6 h-6 rounded-full bg-slate-800 border border-amber-500/50 flex items-center justify-center text-[10px] text-amber-400" title="${b.title}"><i class="fas ${b.icon}"></i></span>` : '';
        }).join('');
    }

    renderStreak() {
        const el = document.getElementById('streak-display');
        if (!el) return;
        if (this.state.streak >= 2) {
            el.innerHTML = `<i class="fas fa-fire text-orange-400"></i> ${this.state.streak} jours`;
        }
    }

    speak(text, emotion = 'neutral') {
        const bubble = document.getElementById('databot-bubble');
        const face = document.getElementById('bot-face');
        if (!bubble || !face) return;

        bubble.style.opacity = '0';
        
        face.innerHTML = '<i class="fas fa-database"></i>';
        if (emotion === 'happy') face.innerHTML = '<i class="fas fa-smile-beam"></i>';
        if (emotion === 'sad') face.innerHTML = '<i class="fas fa-frown-open"></i>';
        if (emotion === 'excited') face.innerHTML = '<i class="fas fa-bolt"></i>';

        setTimeout(() => {
            bubble.innerText = text;
            bubble.style.opacity = '1';
        }, 300);

        const duration = Math.max(3000, text.length * 80);
        setTimeout(() => {
            if (bubble.innerText === text) bubble.style.opacity = '0';
        }, duration);
    }

    poke() {
        const phrases = [
            "Mes circuits chatouillent !",
            "N'oublie pas le WHERE dans ton DELETE !",
            "Le SQL est mon langage maternel.",
            "As-tu sauvegardé tes transactions ?",
            `Tu as ${this.state.badges.length} badge(s). Continue !`,
            `Niveau ${this.state.level} — ${this.state.xp} XP vers le prochain !`,
            "SELECT * FROM toi WHERE motivation = 'MAX'"
        ];
        const random = phrases[Math.floor(Math.random() * phrases.length)];
        this.speak(random, 'excited');
        this.addXP(1, "Poke");
    }

    awardXP(amount) {
        this.addXP(amount, "Action Utilisateur");
    }

    notify(msg, type) {
        const toast = document.createElement('div');
        const bgClass = type === 'levelup' ? 'bg-amber-500' : type === 'badge' ? 'bg-purple-600' : 'bg-blue-600';
        toast.className = `fixed bottom-4 left-4 px-6 py-3 rounded shadow-lg text-white font-bold text-sm transform transition-all duration-500 translate-y-20 z-50 ${bgClass}`;
        toast.innerText = msg;
        document.body.appendChild(toast);
        
        setTimeout(() => toast.classList.remove('translate-y-20'), 100);
        setTimeout(() => {
            toast.classList.add('opacity-0');
            setTimeout(() => toast.remove(), 500);
        }, 3000);
    }

    updateUI() {
        const xpEl = document.getElementById('user-xp');
        if(xpEl) xpEl.innerText = `Lvl ${this.state.level} | XP: ${this.state.xp}`;
    }

    confetti() {
        if(window.confetti) window.confetti({ particleCount: 150, spread: 80 });
    }

    // Get all badge info for display pages
    getAllBadges() {
        return Object.entries(this.badgesDef).map(([id, def]) => ({
            id,
            ...def,
            earned: this.state.badges.includes(id)
        }));
    }
}

window.DataBot = DataBot;

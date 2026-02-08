/**
 * SIMULATEURS INTERACTIFS (LABORATOIRE)
 * Urnes, Dés, Pièces
 */

const Simulator = {
    // -------------------------------------------------------------------------
    // SIMULATEUR D'URNE (Chapitre 1)
    // -------------------------------------------------------------------------
    initUrne(containerId) {
        const container = document.getElementById(containerId);
        if (!container) return;

        container.innerHTML = `
            <div class="simulation-box" style="text-align:center">
                <h3><i class="fas fa-flask"></i> Laboratoire : Tirage dans une urne</h3>
                <p class="text-muted">Configurez l'urne et observez la loi des grands nombres.</p>
                
                <div class="grid" style="grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 2rem; margin-top: 1.5rem;">
                    <!-- Visualisation -->
                    <div>
                        <div class="urn-visual canvas-placeholder" id="urn-viz" style="position:relative; height:220px; width:200px; margin:0 auto; background: var(--bg-glass); border: 2px solid var(--text-muted); border-radius: 0 0 100px 100px; border-top: none; overflow:hidden;">
                            <!-- Balles ici -->
                        </div>
                        <div style="margin-top:1rem">
                            <button class="btn btn-sm btn-outline" onclick="Simulator.resetUrne()">Vider l'urne</button>
                        </div>
                    </div>
                    
                    <!-- Contrôles -->
                    <div style="text-align:left; background: var(--bg-card); padding:1rem; border-radius: var(--radius-md);">
                        <label>Boules Rouges: <span id="count-red">3</span></label>
                        <input type="range" min="0" max="10" value="3" class="range" oninput="Simulator.updateConfig('red', this.value)">
                        
                        <label>Boules Vertes: <span id="count-green">2</span></label>
                        <input type="range" min="0" max="10" value="2" class="range" oninput="Simulator.updateConfig('green', this.value)">
                        
                        <hr style="margin: 1rem 0; opacity:0.1">
                        
                        <div style="display:flex; gap:0.5rem; flex-wrap:wrap;">
                            <button class="btn btn-primary" onclick="Simulator.drawBall(1)">Tirer 1 boule</button>
                            <button class="btn btn-secondary" onclick="Simulator.drawBall(10)">Tirer 10</button>
                            <button class="btn btn-secondary" onclick="Simulator.drawBall(100)">Tirer 100</button>
                        </div>
                    </div>
                </div>

                <!-- Résultats -->
                <div id="sim-results" style="margin-top: 1.5rem; display:none; animation: slideDown 0.3s ease;">
                    <h4>Résultats statistiques</h4>
                    <div style="display:flex; gap:1rem; justify-content:center; margin-top:0.5rem;">
                        <div class="stat-card" style="background:rgba(239,68,68,0.1); padding:0.5rem 1rem; border-radius:8px; border:1px solid rgba(239,68,68,0.3)">
                            Rouges: <span id="res-red" style="font-weight:bold; color:#ef4444">0</span>
                            <small id="pct-red" style="display:block; font-size:0.8em">0%</small>
                        </div>
                        <div class="stat-card" style="background:rgba(16,185,129,0.1); padding:0.5rem 1rem; border-radius:8px; border:1px solid rgba(16,185,129,0.3)">
                            Vertes: <span id="res-green" style="font-weight:bold; color:#10b981">0</span>
                            <small id="pct-green" style="display:block; font-size:0.8em">0%</small>
                        </div>
                        <div class="stat-card" style="background:var(--bg-primary); padding:0.5rem 1rem; border-radius:8px;">
                            Total: <span id="res-total">0</span>
                        </div>
                    </div>
                </div>
            </div>
        `;
        
        this.resetUrne();
    },

    state: {
        red: 3,
        green: 2,
        history: { red: 0, green: 0, total: 0 }
    },

    updateConfig(color, val) {
        this.state[color] = parseInt(val);
        document.getElementById(`count-${color}`).textContent = val;
        this.renderBalls();
    },

    renderBalls() {
        const viz = document.getElementById('urn-viz');
        viz.innerHTML = '';
        
        // Afficher visuellement les boules dans l'urne
        const total = this.state.red + this.state.green;
        const fragment = document.createDocumentFragment();
        
        for(let i=0; i<this.state.red; i++) this.addBallToViz(fragment, 'red');
        for(let i=0; i<this.state.green; i++) this.addBallToViz(fragment, 'green');
        
        viz.appendChild(fragment);
    },

    addBallToViz(parent, color) {
        const ball = document.createElement('div');
        ball.className = `sim-ball ${color}`;
        ball.style.position = 'absolute';
        ball.style.bottom = `${Math.random() * 40}px`;
        ball.style.left = `${Math.random() * 160}px`;
        parent.appendChild(ball);
    },

    resetUrne() {
        this.state.history = { red: 0, green: 0, total: 0 };
        this.updateStats();
        this.renderBalls();
        document.getElementById('sim-results').style.display = 'none';
    },

    drawBall(count) {
        const container = document.getElementById('sim-results');
        container.style.display = 'block';
        
        const totalConfig = this.state.red + this.state.green;
        if (totalConfig === 0) return; // Urne vide

        let delay = 0;
        
        // Animation simple si on tire 1 boule
        if (count === 1) {
            const viz = document.getElementById('urn-viz');
            viz.classList.add('shake'); // Ajouter CSS shake plus tard
            setTimeout(() => viz.classList.remove('shake'), 500);
        }

        for (let i = 0; i < count; i++) {
            const rand = Math.random() * totalConfig;
            // Si rand < nbr rouge alors rouge, sinon vert
            if (rand < this.state.red) {
                this.state.history.red++;
            } else {
                this.state.history.green++;
            }
            this.state.history.total++;
        }
        
        this.updateStats();
        
        // Easter egg gamification
        if (count >= 100 && typeof GameEngine !== 'undefined') {
            GameEngine.addXP(5, "Simulateur utilisé !");
        }
    },

    updateStats() {
        const h = this.state.history;
        document.getElementById('res-red').textContent = h.red;
        document.getElementById('res-green').textContent = h.green;
        document.getElementById('res-total').textContent = h.total;
        
        if (h.total > 0) {
            document.getElementById('pct-red').textContent = ((h.red / h.total) * 100).toFixed(1) + '%';
            document.getElementById('pct-green').textContent = ((h.green / h.total) * 100).toFixed(1) + '%';
        }
    }
};

// Initialisation au chargement si le conteneur existe
document.addEventListener('DOMContentLoaded', () => {
    if(document.getElementById('sim-urne-container')) {
        Simulator.initUrne('sim-urne-container');
    }
});

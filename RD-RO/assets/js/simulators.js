/**
 * SIMULATORS.JS
 * Gestion des simulateurs interactifs (Graphique & Simplexe)
 * avec bascule via Select Box.
 */

class SimulatorManager {
    constructor(containerId, defaultMode = 'graph') {
        this.container = document.getElementById(containerId);
        if (!this.container) return; // Pas de simulateur sur cette page
        this.defaultMode = defaultMode;
        this.initUI();
    }

    initUI() {
        // Création du sélecteur
        this.controlPanel = document.createElement('div');
        this.controlPanel.className = 'simulator-controls glass-panel';
        this.controlPanel.style.marginBottom = '20px';
        this.controlPanel.style.padding = '15px';

        const label = document.createElement('label');
        label.innerText = 'Mode de Simulation : ';
        label.style.fontWeight = '600';
        label.style.marginRight = '10px';

        this.select = document.createElement('select');
        this.select.className = 'p-2 rounded border';
        this.select.style.background = 'var(--surface)';
        this.select.style.color = 'var(--text-primary)';
        
        const optGraph = document.createElement('option');
        optGraph.value = 'graph';
        optGraph.innerText = 'Résolution Graphique (2D)';
        
        const optSimplex = document.createElement('option');
        optSimplex.value = 'simplex';
        optSimplex.innerText = 'Algorithme du Simplexe';

        this.select.appendChild(optGraph);
        this.select.appendChild(optSimplex);

        this.select.addEventListener('change', (e) => this.switchMode(e.target.value));

        this.controlPanel.appendChild(label);
        this.controlPanel.appendChild(this.select);
        this.container.appendChild(this.controlPanel);

        // Zone d'affichage du simulateur actif
        this.viewport = document.createElement('div');
        this.viewport.className = 'simulator-viewport glass-panel';
        this.viewport.style.minHeight = '400px';
        this.viewport.style.padding = '20px';
        this.container.appendChild(this.viewport);

        // Init par défaut
        this.switchMode(this.defaultMode);
        if(this.select) this.select.value = this.defaultMode;
    }

    switchMode(mode) {
        this.viewport.innerHTML = ''; // Clear
        if (mode === 'graph') {
            new GraphicalSolver(this.viewport);
        } else {
            new SimplexSolver(this.viewport);
        }
    }
}

/**
 * RÉSOLUTION GRAPHIQUE (CANVAS)
 */
class GraphicalSolver {
    constructor(root) {
        this.root = root;
        this.constraints = [
            { a: 1, b: 2, op: '<=', c: 10 }, // x + 2y <= 10
            { a: 3, b: 1, op: '<=', c: 15 }  // 3x + y <= 15
        ]; 
        this.objective = { a: 2, b: 3 }; // Max Z = 2x + 3y
        this.optType = 'max';
        
        this.renderInterface();
        this.draw();
    }

    renderInterface() {
        this.root.innerHTML = `
            <div style="display:grid; grid-template-columns: 1fr 2fr; gap:20px;">
                <div class="inputs-panel">
                    <h4>Paramètres (Fonction Objectif)</h4>
                    
                    <div style="margin-bottom:15px;">
                        <label class="text-xs text-slate-400 uppercase font-bold">Type d'Optimisation</label>
                        <select id="opt-type-select" class="bg-slate-700 text-white border border-slate-600 rounded px-2 py-1 w-full mt-1">
                            <option value="max" ${this.optType === 'max' ? 'selected' : ''}>Maximisation (Max Z)</option>
                            <option value="min" ${this.optType === 'min' ? 'selected' : ''}>Minimisation (Min Z)</option>
                        </select>
                    </div>

                    <div style="margin-bottom:10px;">
                        Obj a: <input type="number" id="obj-a" value="${this.objective.a}" class="bg-slate-700 text-white border border-slate-600 rounded px-2 py-1 w-16">
                        Obj b: <input type="number" id="obj-b" value="${this.objective.b}" class="bg-slate-700 text-white border border-slate-600 rounded px-2 py-1 w-16">
                    </div>
                    <hr class="border-gray-700 my-4">
                    <h5>Contraintes (ax + by ≤ c)</h5>
                    <div id="constraints-list" class="space-y-4 mb-4"></div>
                    <button class="btn btn-sm btn-primary w-full bg-emerald-600 hover:bg-emerald-500 text-white py-2 rounded transition-colors" id="redraw-btn">Actualiser le Graphique</button>
                    <div style="margin-top:20px; font-size:0.9em; color:var(--text-secondary)">
                        <i class="fas fa-info-circle"></i> Le polygone vert représente le <strong>Domaine Admissible</strong>. Le point rouge est la Solution Optimale.
                    </div>
                </div>
                <div class="canvas-container bg-slate-800 rounded-lg flex justify-center items-center border border-slate-700 p-2">
                    <canvas id="graphCanvas" width="500" height="400"></canvas>
                </div>
            </div>
        `;

        const cList = this.root.querySelector('#constraints-list');
        this.constraints.forEach((c, i) => {
            const div = document.createElement('div');
            div.className = "flex items-center gap-2 text-sm";
            div.innerHTML = `
                <span class="font-bold text-slate-500 w-6">C${i+1}</span>
                <input type="number" id="c${i}-a" value="${c.a}" class="bg-slate-700 text-white border border-slate-600 rounded px-1 py-1 w-12 text-center">
                <span class="text-slate-400">x +</span>
                <input type="number" id="c${i}-b" value="${c.b}" class="bg-slate-700 text-white border border-slate-600 rounded px-1 py-1 w-12 text-center">
                <span class="text-slate-400">y ≤</span>
                <input type="number" id="c${i}-c" value="${c.c}" class="bg-slate-700 text-white border border-slate-600 rounded px-1 py-1 w-12 text-center">
            `;
            cList.appendChild(div);
        });

        this.root.querySelector('#redraw-btn').addEventListener('click', () => {
             // Update Objective
            this.objective.a = parseFloat(this.root.querySelector('#obj-a').value) || 0;
            this.objective.b = parseFloat(this.root.querySelector('#obj-b').value) || 0;
            this.optType = this.root.querySelector('#opt-type-select').value;
            
            // Update Constraints
            this.constraints.forEach((c, i) => {
                c.a = parseFloat(this.root.querySelector(`#c${i}-a`).value) || 0;
                c.b = parseFloat(this.root.querySelector(`#c${i}-b`).value) || 0;
                c.c = parseFloat(this.root.querySelector(`#c${i}-c`).value) || 0;
            });

            this.draw();
        });
    }

    draw() {
        const canvas = this.root.querySelector('#graphCanvas');
        if(!canvas) return;
        const ctx = canvas.getContext('2d');
        const W = canvas.width;
        const H = canvas.height;
        const scale = 20; // pixels per unit

        // Clear
        ctx.clearRect(0,0,W,H);

        // Draw Grid
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.1)';
        ctx.lineWidth = 1;
        for(let x=0; x<W; x+=scale) { ctx.beginPath(); ctx.moveTo(x,0); ctx.lineTo(x,H); ctx.stroke(); }
        for(let y=0; y<H; y+=scale) { ctx.beginPath(); ctx.moveTo(0,y); ctx.lineTo(W,y); ctx.stroke(); }

        // Axes (Origin at 40, H-40)
        const originX = 40;
        const originY = H-40;
        
        ctx.strokeStyle = '#94a3b8'; // Slate-400
        ctx.lineWidth = 2;
        // Y Axis
        ctx.beginPath(); ctx.moveTo(originX, 0); ctx.lineTo(originX, H); ctx.stroke();
        // X Axis
        ctx.beginPath(); ctx.moveTo(0, originY); ctx.lineTo(W, originY); ctx.stroke();

        // ---------------------------------------------------------
        // 1. CALCUL DU DOMAINE ADMISSIBLE (DYNAMIQUE)
        // ---------------------------------------------------------
        // Trouver les sommets potentiels
        let points = [];
        points.push({x:0, y:0}); // L'origine est toujours un candidat (car x,y >= 0 et C >= 0 généralement)

        // 1. Intersections avec les axes pour chaque contrainte
        this.constraints.forEach(c => {
            if (c.a !== 0) points.push({ x: c.c / c.a, y: 0 });
            if (c.b !== 0) points.push({ x: 0, y: c.c / c.b });
        });

        // 2. Intersection entre les 2 contraintes (C1 et C2)
        // a1x + b1y = c1
        // a2x + b2y = c2
        if (this.constraints.length >= 2) {
            const c1 = this.constraints[0];
            const c2 = this.constraints[1];
            const det = c1.a * c2.b - c2.a * c1.b;
            
            if (Math.abs(det) > 0.0001) {
                const x = (c1.c * c2.b - c2.c * c1.b) / det;
                const y = (c1.a * c2.c - c2.a * c1.c) / det;
                points.push({ x, y });
            }
        }

        // 3. Filtrer les points valides
        // Un point est valide s'il respecte x>=0, y>=0 ET toutes les contraintes
        const validPoints = points.filter(p => {
            // Non-négativité (avec tolérance epsilon)
            if (p.x < -0.001 || p.y < -0.001) return false;
            
            // Contraintes
            return this.constraints.every(c => {
                const val = c.a * p.x + c.b * p.y;
                return val <= c.c + 0.001; // Tolérance float
            });
        });

        // 4. Trier les points pour former un polygone (sens trigo autour du centre)
        if (validPoints.length > 0) {
            // Calcul du centre de gravité
            const center = validPoints.reduce((acc, p) => ({x: acc.x + p.x, y: acc.y + p.y}), {x:0, y:0});
            center.x /= validPoints.length;
            center.y /= validPoints.length;

            validPoints.sort((a, b) => {
                return Math.atan2(a.y - center.y, a.x - center.x) - Math.atan2(b.y - center.y, b.x - center.x);
            });

            // Dessin du Polygone
            ctx.beginPath();
            const startX = originX + validPoints[0].x * scale;
            const startY = originY - validPoints[0].y * scale;
            ctx.moveTo(startX, startY);

            for (let i = 1; i < validPoints.length; i++) {
                ctx.lineTo(originX + validPoints[i].x * scale, originY - validPoints[i].y * scale);
            }
            ctx.closePath();
            
            ctx.fillStyle = 'rgba(16, 185, 129, 0.2)'; 
            ctx.fill();
            ctx.strokeStyle = '#10b981';
            ctx.lineWidth = 2;
            ctx.stroke();
        }

        // ---------------------------------------------------------
        // 2. LIGNES DE CONTRAINTES ÉTENDUES
        // ---------------------------------------------------------
        this.constraints.forEach(c => {
             // Si b=0 (verticale) ou a=0 (horizontale), c'est spécial, mais sinon:
             // On trace deux points loin des axes pour traverser l'écran
             let pts = [];
             
             if (Math.abs(c.b) > 0.001) {
                 // x=0 -> y = c/b
                 pts.push({x: 0, y: c.c / c.b});
                 // x=max -> y = (c - a*max)/b
                 const max = W/scale;
                 pts.push({x: max, y: (c.c - c.a*max)/c.b});
             } else if (Math.abs(c.a) > 0.001) {
                 // Verticale x = c/a
                 pts.push({x: c.c/c.a, y: 0});
                 pts.push({x: c.c/c.a, y: H/scale});
             }

             if(pts.length === 2) {
                 ctx.beginPath();
                 ctx.moveTo(originX + pts[0].x*scale, originY - pts[0].y*scale); 
                 ctx.lineTo(originX + pts[1].x*scale, originY - pts[1].y*scale);
                 ctx.strokeStyle = 'rgba(239, 68, 68, 0.4)'; // Rouge discret
                 ctx.lineWidth = 1;
                 ctx.stroke();
             }
        });

        // ---------------------------------------------------------
        // 3. RECHERCHE DE L'OPTIMUM
        // ---------------------------------------------------------
        // Sommets candidats = validPoints
        const candidates = validPoints;
        
        let bestZ = (this.optType === 'min') ? Infinity : -Infinity;
        let bestPt = null;

        candidates.forEach(pt => {
            const z = this.objective.a * pt.x + this.objective.b * pt.y;
            const isBetter = (this.optType === 'min') ? (z < bestZ) : (z > bestZ);
            
            if(isBetter) {
                bestZ = z;
                bestPt = pt;
            }
        });

        // Dessin du Point Optimum
        if(bestPt) {
            const cx = originX + bestPt.x * scale;
            const cy = originY - bestPt.y * scale;

            // Halo
            ctx.beginPath();
            ctx.arc(cx, cy, 8, 0, 2 * Math.PI);
            ctx.fillStyle = 'rgba(244, 63, 94, 0.5)'; // Rose-500
            ctx.fill();

            // Point
            ctx.beginPath();
            ctx.arc(cx, cy, 4, 0, 2 * Math.PI);
            ctx.fillStyle = '#f43f5e'; // Rose-500 solid
            ctx.fill();

            // Label Z
            ctx.font = "bold 14px sans-serif";
            ctx.fillStyle = "#fff";
            const labelPrefix = (this.optType === 'min') ? "Min Z" : "Max Z";
            ctx.fillText(`${labelPrefix} = ${parseFloat(bestZ.toFixed(2))}`, cx + 15, cy - 10);
            
            ctx.fillStyle = "#94a3b8";
            ctx.font = "12px sans-serif";
            ctx.fillText(`(${parseFloat(bestPt.x.toFixed(2))}, ${parseFloat(bestPt.y.toFixed(2))})`, cx + 15, cy + 5);
        }

        // ---------------------------------------------------------
        // 4. VECTEUR GRADIENT (Direction de Z)
        // ---------------------------------------------------------
        const vecScale = 2; 
        ctx.beginPath();
        ctx.moveTo(originX, originY);
        ctx.lineTo(originX + this.objective.a*scale*vecScale, originY - this.objective.b*scale*vecScale);
        ctx.strokeStyle = '#3b82f6'; // Blue-500
        ctx.lineWidth = 2;
        ctx.setLineDash([5, 5]);
        ctx.stroke();
        ctx.setLineDash([]);
        
        ctx.font = "12px sans-serif";
        ctx.fillStyle = "#60a5fa"; // Blue-400
        ctx.fillText("Vecteur Z", originX + this.objective.a*scale*vecScale + 5, originY - this.objective.b*scale*vecScale);

    }
}

/**
 * ALGORITHME DU SIMPLEXE (Fonctionnel)
 */
class SimplexSolver {
    constructor(root) {
        this.root = root;
        // État initial
        this.numVars = 2;
        this.numConstraints = 2;
        this.tableau = [];
        this.colHeaders = [];
        this.rowHeaders = [];
        this.isMax = true;
        this.renderSetup();
    }

    renderSetup() {
        this.root.innerHTML = `
            <div class="max-w-md mx-auto bg-slate-800 p-6 rounded-lg text-white">
                <h3 class="text-xl font-bold mb-4 border-b border-slate-600 pb-2">Configuration du Simplexe</h3>
                <div class="mb-4">
                    <label class="block text-slate-400 mb-1">Nombre de Variables (Hors variables d'écart)</label>
                    <input type="number" id="nb-vars" value="${this.numVars}" min="1" max="10" class="w-full bg-slate-700 text-white rounded px-3 py-2 border border-slate-600">
                </div>
                <div class="mb-6">
                    <label class="block text-slate-400 mb-1">Nombre de Contraintes</label>
                    <input type="number" id="nb-cons" value="${this.numConstraints}" min="1" max="10" class="w-full bg-slate-700 text-white rounded px-3 py-2 border border-slate-600">
                </div>
                <button id="btn-next" class="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-2 px-4 rounded transition-colors">
                    Suivant <i class="fas fa-arrow-right ml-2"></i>
                </button>
            </div>
        `;

        this.root.querySelector('#btn-next').addEventListener('click', () => {
             this.numVars = parseInt(this.root.querySelector('#nb-vars').value) || 2;
             this.numConstraints = parseInt(this.root.querySelector('#nb-cons').value) || 2;
             this.renderInput();
        });
    }

    renderInput() {
        // Génération des headers
        let html = `
            <div class="w-full overflow-x-auto bg-slate-800 p-4 rounded-lg text-white">
                <h3 class="text-lg font-bold mb-4 text-emerald-400">Remplissage du Tableau Initial</h3>
                <p class="text-sm text-slate-400 mb-4">Saisissez les coefficients. Les variables d'écart (e1, e2...) sont ajoutées automatiquement.</p>
                
                <table class="w-full text-center border-collapse">
                    <thead>
                        <tr>
                            <th class="p-2 border border-slate-600 bg-slate-900">Base</th>
                            ${Array.from({length: this.numVars}, (_, i) => `<th class="p-2 border border-slate-600 bg-slate-900">x${i+1}</th>`).join('')}
                            <th class="p-2 border border-slate-600 bg-slate-900 text-yellow-500">RHS</th>
                        </tr>
                    </thead>
                    <tbody>
        `;

        // Lignes de contraintes
        for(let i=0; i<this.numConstraints; i++) {
            html += `<tr>
                <td class="p-2 border border-slate-600 font-bold text-slate-400">e${i+1}</td>
                ${Array.from({length: this.numVars}, (_, j) => `
                    <td class="p-1 border border-slate-600">
                        <input type="number" data-row="${i}" data-col="${j}" value="0" class="w-16 bg-slate-700 text-white rounded px-1 text-center input-coef">
                    </td>
                `).join('')}
                <td class="p-1 border border-slate-600 bg-slate-700/50">
                     <input type="number" data-row="${i}" data-rhs="true" value="0" class="w-16 bg-slate-700 text-white rounded px-1 text-center input-rhs">
                </td>
            </tr>`;
        }

        // Ligne Z
        html += `<tr class="border-t-2 border-slate-500">
            <td class="p-2 border border-slate-600 font-bold text-purple-400">Z</td>
            ${Array.from({length: this.numVars}, (_, j) => `
                <td class="p-1 border border-slate-600">
                    <input type="number" data-z="${j}" value="0" class="w-16 bg-slate-700 text-white rounded px-1 text-center input-z font-bold">
                </td>
            `).join('')}
            <td class="p-2 border border-slate-600 bg-slate-900">0</td>
        </tr>`;

        html += `   </tbody>
                </table>
                
                <div class="flex gap-4 mt-6">
                    <button id="btn-back" class="bg-gray-600 hover:bg-gray-500 text-white py-2 px-4 rounded">Retour</button>
                    <button id="btn-solve" class="bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-2 px-6 rounded flex-1">
                        <i class="fas fa-play mr-2"></i> Initialiser & Résoudre
                    </button>
                </div>
            </div>
        `;

        this.root.innerHTML = html;

        this.root.querySelector('#btn-back').addEventListener('click', () => this.renderSetup());
        this.root.querySelector('#btn-solve').addEventListener('click', () => this.initializeAlgorithm());
    }

    initializeAlgorithm() {
        // 1. Construire la matrice interne
        // Structure: [ [x1, x2, ..., e1, e2, ..., RHS] ]
        // Totales colonnes = numVars + numConstraints + 1 (RHS)
        
        const inputsZ = this.root.querySelectorAll('.input-z');
        const inputsCoef = this.root.querySelectorAll('.input-coef');
        const inputsRhs = this.root.querySelectorAll('.input-rhs');

        this.tableau = [];
        this.rowHeaders = []; // Noms des vars en base (e1, e2...)
        this.colHeaders = []; // Noms des colonnes (x1.., e1.., RHS)

        // Headers
        for(let j=0; j<this.numVars; j++) this.colHeaders.push(`x${j+1}`);
        for(let i=0; i<this.numConstraints; i++) this.colHeaders.push(`e${i+1}`);
        this.colHeaders.push('RHS');

        // Contraintes
        for(let i=0; i<this.numConstraints; i++) {
            let row = [];
            // Coefs X
            for(let j=0; j<this.numVars; j++) {
                const val = parseFloat(this.root.querySelector(`.input-coef[data-row="${i}"][data-col="${j}"]`).value) || 0;
                row.push(val);
            }
            // Coefs E (Identité)
            for(let k=0; k<this.numConstraints; k++) {
                row.push( (k===i) ? 1 : 0 );
            }
            // RHS
            const rhs = parseFloat(this.root.querySelector(`.input-rhs[data-row="${i}"]`).value) || 0;
            row.push(rhs);

            this.tableau.push(row);
            this.rowHeaders.push(`e${i+1}`);
        }

        // Ligne Z (Dernière ligne)
        // Note: Dans le tableau du simplexe standard, on écrit souvent Z - c1x1 - ... = 0
        // Donc les coefficients entrés (ex: Max Z = 3x1 + 5x2) deviennent -3, -5 dans le tableau
        let zRow = [];
        for(let j=0; j<this.numVars; j++) {
            const val = parseFloat(this.root.querySelector(`.input-z[data-z="${j}"]`).value) || 0;
            zRow.push(-val); // Inversion des signes pour la forme standard Z - cX = 0
        }
        for(let k=0; k<this.numConstraints+1; k++) zRow.push(0); // Slacks + RHS
        
        this.tableau.push(zRow);
        
        this.renderTableau("Tableau Initial");
    }

    renderTableau(message = "") {
        const totalCols = this.colHeaders.length;
        const widthPercent = 100 / (totalCols + 1); // +1 for Base column

        let html = `
             <div class="w-full overflow-x-auto bg-slate-800 p-4 rounded-lg text-white">
                <div class="flex justify-between items-center mb-4">
                    <h3 class="text-lg font-bold text-emerald-400">${message}</h3>
                </div>

                <table class="w-full text-center border-collapse text-sm">
                    <thead>
                        <tr>
                            <th class="p-2 border border-slate-600 bg-slate-900">Base</th>
                            ${this.colHeaders.map(h => `<th class="p-2 border border-slate-600 bg-slate-900">${h}</th>`).join('')}
                        </tr>
                    </thead>
                    <tbody>
        `;

        // Rows Constraints
        for(let i=0; i<this.numConstraints; i++) {
            html += `<tr>
                <td class="p-2 border border-slate-600 font-bold text-emerald-300">${this.rowHeaders[i]}</td>
                ${this.tableau[i].map(val => `<td class="p-2 border border-slate-600">${parseFloat(val.toFixed(2))}</td>`).join('')}
            </tr>`;
        }

        // Row Z
        html += `<tr class="border-t-2 border-slate-500 bg-slate-700/30">
            <td class="p-2 border border-slate-600 font-bold text-purple-400">Z</td>
             ${this.tableau[this.numConstraints].map(val => `<td class="p-2 border border-slate-600 font-bold">${parseFloat(val.toFixed(2))}</td>`).join('')}
        </tr>`;

        html += `</tbody></table>
        
        <div class="mt-6 flex justify-end gap-3">
             <button id="btn-restart" class="bg-gray-600 hover:bg-gray-500 text-white px-4 py-2 rounded">Recommencer</button>
             <button id="btn-step" class="bg-blue-600 hover:bg-blue-500 text-white font-bold px-6 py-2 rounded shadow-lg animate-pulse">
                Calculer l'itération suivante <i class="fas fa-forward ml-2"></i>
             </button>
        </div>
        
        <div id="status-msg" class="mt-4 p-3 rounded bg-slate-900 text-center hidden"></div>
        </div>`;

        this.root.innerHTML = html;

        this.root.querySelector('#btn-restart').addEventListener('click', () => this.renderSetup());
        this.root.querySelector('#btn-step').addEventListener('click', () => this.solveStep());
    }

    solveStep() {
        // 1. Trouver la colonne pivot (Variable entrante)
        // Pour MAX, c'est le coefficient le plus négatif dans la ligne Z
        const zRow = this.tableau[this.numConstraints];
        let minVal = 0;
        let pivotColIndex = -1;

        // On cherche uniquement parmi les variables (pas RHS)
        for(let j=0; j<this.colHeaders.length - 1; j++) {
            if(zRow[j] < minVal) {
                minVal = zRow[j];
                pivotColIndex = j;
            }
        }

        if(pivotColIndex === -1) {
            this.finish("Solution Optimale Atteinte ! Tous les coefficients de Z sont positifs ou nuls.");
            return;
        }

        // 2. Trouver la ligne pivot (Ratio min positif)
        // Ratio = RHS / pivotColVal
        let minRatio = Infinity;
        let pivotRowIndex = -1;

        for(let i=0; i<this.numConstraints; i++) {
            const val = this.tableau[i][pivotColIndex];
            const rhs = this.tableau[i][this.colHeaders.length - 1];
            
            if(val > 0.000001) { // Pivot doit être positif
                const ratio = rhs / val;
                if(ratio < minRatio) {
                    minRatio = ratio;
                    pivotRowIndex = i;
                }
            }
        }

        if(pivotRowIndex === -1) {
            this.finish("Solution Non Bornée (Unbounded). Impossible de trouver un pivot positif.");
            return;
        }

        // 3. Effectuer le Pivotage (Pivot de Gauss)
        this.performPivot(pivotRowIndex, pivotColIndex);
    }

    performPivot(pivotRow, pivotCol) {
        const pivotVal = this.tableau[pivotRow][pivotCol];
        const numCols = this.tableau[0].length;

        // Diviser la ligne pivot par le pivotVal
        for(let j=0; j<numCols; j++) {
            this.tableau[pivotRow][j] /= pivotVal;
        }

        // Éliminer les autres lignes (y compris Z)
        for(let i=0; i<=this.numConstraints; i++) {
            if(i !== pivotRow) {
                const factor = this.tableau[i][pivotCol];
                for(let j=0; j<numCols; j++) {
                    this.tableau[i][j] -= factor * this.tableau[pivotRow][j];
                }
            }
        }

        // Mettre à jour la base
        this.rowHeaders[pivotRow] = this.colHeaders[pivotCol];

        this.renderTableau(`Itération effectuée. Entrée: ${this.colHeaders[pivotCol]}, Sortie: Ligne ${pivotRow+1}`);
    }

    finish(msg) {
        const statusDiv = this.root.querySelector('#status-msg');
        statusDiv.textContent = msg;
        statusDiv.className = "mt-4 p-3 rounded bg-emerald-900/50 border border-emerald-500 text-emerald-200 text-center block font-bold";
        
        const btn = this.root.querySelector('#btn-step');
        if(btn) btn.remove();
    }
}

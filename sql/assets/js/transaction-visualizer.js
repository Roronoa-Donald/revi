class TransactionVisualizer {
    constructor(containerId) {
        this.container = document.getElementById(containerId);
        this.level = 'read-committed';
        this.rowValue = 100;
        this.lock = null; // { type: 'S'|'X', owner: 1|2 }
        this.tx1Status = 'idle';
        this.tx2Status = 'idle';
        this.logs = [];
        this.render();
    }

    setLevel(level) {
        this.level = level;
        this.reset();
        this.render();
    }

    reset() {
        this.rowValue = 100;
        this.lock = null;
        this.tx1Status = 'idle';
        this.tx2Status = 'idle';
        this.logs = [];
        this.updateUI();
    }

    // Attempt to acquire lock
    acquireLock(txId, type) {
        // Simple Lock Manager Logic
        if (this.lock === null) {
            this.lock = { type, owner: txId };
            this.log(`Tx${txId} obtient un verrou ${type}-LOCK.`);
            return true;
        } else {
            // Check compatibility
            if (this.lock.owner === txId) return true; // Re-entrant
            
            // S vs S is usually OK
            if (this.lock.type === 'S' && type === 'S') return true; // Simplified shared
            
            this.log(`Tx${txId} est bloquée (Attente de libération par Tx${this.lock.owner}).`);
            return false;
        }
    }

    releaseLock(txId) {
        if (this.lock && this.lock.owner === txId) {
            this.lock = null;
            this.log(`Tx${txId} libère le verrou.`);
        }
    }

    log(msg) {
        this.logs.unshift(msg);
        this.updateUI();
    }

    render() {
        this.container.innerHTML = `
            <div class="grid grid-cols-3 gap-4 mb-4">
                <!-- Tx1 -->
                <div class="p-4 bg-slate-800 rounded border border-slate-700">
                    <h4 class="font-bold text-blue-400">User A (Tx1)</h4>
                    <div class="flex flex-col gap-2 mt-2">
                        <button onclick="viz.action(1, 'read')" class="bg-blue-600 px-2 py-1 rounded text-xs hover:bg-blue-500">SELECT (Read)</button>
                        <button onclick="viz.action(1, 'write')" class="bg-amber-600 px-2 py-1 rounded text-xs hover:bg-amber-500">UPDATE (Write)</button>
                        <button onclick="viz.action(1, 'commit')" class="bg-green-600 px-2 py-1 rounded text-xs hover:bg-green-500">COMMIT</button>
                    </div>
                </div>

                <!-- Resource -->
                <div class="p-4 bg-slate-900 rounded border border-slate-700 flex flex-col items-center justify-center relative">
                    <h4 class="font-bold text-slate-400 text-sm">Row ID: 1</h4>
                    <div class="text-3xl font-mono text-white my-2" id="val-disp">100</div>
                    <div id="lock-icon" class="text-slate-600 text-2xl"><i class="fas fa-lock-open"></i></div>
                    <div class="text-xs text-slate-500 mt-2 text-center" id="lock-status">No Lock</div>
                </div>

                <!-- Tx2 -->
                <div class="p-4 bg-slate-800 rounded border border-slate-700">
                    <h4 class="font-bold text-pink-400">User B (Tx2)</h4>
                    <div class="flex flex-col gap-2 mt-2">
                        <button onclick="viz.action(2, 'read')" class="bg-blue-600 px-2 py-1 rounded text-xs hover:bg-blue-500">SELECT (Read)</button>
                        <button onclick="viz.action(2, 'write')" class="bg-amber-600 px-2 py-1 rounded text-xs hover:bg-amber-500">UPDATE (Write)</button>
                        <button onclick="viz.action(2, 'commit')" class="bg-green-600 px-2 py-1 rounded text-xs hover:bg-green-500">COMMIT</button>
                    </div>
                </div>
            </div>
            
            <!-- Logs -->
            <div class="h-32 overflow-y-auto bg-black p-2 font-mono text-xs text-green-400 rounded border border-slate-700" id="log-console">
                Ready...
            </div>
        `;
        this.updateUI();
    }

    action(txId, type) {
        if (type === 'read') {
            // READ COMMITTED Check
            if (this.level === 'read-committed' && this.lock && this.lock.type === 'X' && this.lock.owner !== txId) {
                this.log(`Tx${txId} BLOCKED: Lecture interdite sur donnée sale (Dirty Read protegé).`);
                return;
            }
            if (this.level === 'read-uncommitted') {
                this.log(`Tx${txId} lit la valeur ${this.rowValue} (Dirty Read allowed).`);
                return;
            }
            // Acquire Shared Lock?
            if (this.acquireLock(txId, 'S')) {
                this.log(`Tx${txId} lit la valeur: ${this.rowValue}`);
                // In Read Committed, release immediately after read
                if (this.level === 'read-committed') this.releaseLock(txId); 
            }
        } 
        else if (type === 'write') {
             if (this.acquireLock(txId, 'X')) {
                 this.rowValue += 10;
                 this.log(`Tx${txId} met à jour la valeur vers ${this.rowValue}.`);
             }
        }
        else if (type === 'commit') {
            this.releaseLock(txId);
            this.log(`Tx${txId} commit. Transaction terminée.`);
        }
        this.updateUI();
    }

    updateUI() {
        // Value
        const valDisp = document.getElementById('val-disp');
        if(valDisp) valDisp.innerText = this.rowValue;

        // Lock Icon
        const lockIcon = document.getElementById('lock-icon');
        const lockStatus = document.getElementById('lock-status');
        
        if (this.lock) {
            lockIcon.innerHTML = `<i class="fas fa-lock text-${this.lock.type === 'X' ? 'red' : 'yellow'}-500"></i>`;
            lockStatus.innerText = `${this.lock.type}-Lock by Tx${this.lock.owner}`;
        } else {
            lockIcon.innerHTML = `<i class="fas fa-lock-open text-slate-600"></i>`;
            lockStatus.innerText = "No Lock";
        }

        // Logs
        const logCon = document.getElementById('log-console');
        if(logCon) logCon.innerHTML = this.logs.map(l => `<div>> ${l}</div>`).join('');
    }
}

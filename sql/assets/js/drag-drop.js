/**
 * Drag & Drop Engine for RD-SQL
 * Adapted for SQL query building and keyword matching.
 */

class DragDropEngine {
    constructor(containerIdOrConfig, items, zones, onComplete) {
        // Support both: new DragDropEngine(config) AND new DragDropEngine('id', items, zones)
        if (typeof containerIdOrConfig === 'object' && containerIdOrConfig !== null) {
            this.containerId = containerIdOrConfig.containerId;
            this.items = containerIdOrConfig.items;
            this.zones = containerIdOrConfig.zones;
            this.onComplete = containerIdOrConfig.onComplete;
        } else {
            this.containerId = containerIdOrConfig;
            this.items = items || [];
            this.zones = zones || [];
            this.onComplete = onComplete;
        }

        // Build matchZoneId mapping from zones' "accept" property if items don't have matchZoneId
        if (this.zones && this.items) {
            this.zones.forEach(zone => {
                if (zone.accept) {
                    const item = this.items.find(i => i.id === zone.accept);
                    if (item) item.matchZoneId = zone.id;
                }
            });
        }

        this.render();
    }

    render() {
        const container = document.getElementById(this.containerId);
        if (!container) return;

        container.innerHTML = `
            <div class="grid grid-cols-1 md:grid-cols-2 gap-8 drag-interface select-none">
                <!-- Source Items -->
                <div class="bg-slate-800/50 p-4 rounded-xl border border-slate-700 min-h-[200px]">
                    <h4 class="text-sm font-bold text-slate-400 mb-4 uppercase tracking-wider">Éléments SQL</h4>
                    <div id="${this.containerId}-source" class="flex flex-wrap gap-2">
                        ${this.items.map(item => `
                            <div class="draggable-item bg-blue-600 hover:bg-blue-500 text-white px-3 py-2 rounded cursor-grab shadow-lg active:cursor-grabbing transform transition-transform" 
                                 draggable="true" 
                                 data-id="${item.id}">
                                <i class="fas fa-code mr-1 opacity-50"></i> ${item.text}
                            </div>
                        `).join('')}
                    </div>
                </div>

                <!-- Drop Zones -->
                <div class="space-y-3">
                     <h4 class="text-sm font-bold text-slate-400 mb-4 uppercase tracking-wider">Zones de Dépôt</h4>
                    ${this.zones.map(zone => `
                        <div class="drop-zone bg-slate-900 border-2 border-dashed border-slate-600 rounded-lg p-4 transition-colors relative" 
                             data-zone="${zone.id}">
                            <div class="text-xs text-slate-500 font-bold mb-2 uppercase pointer-events-none">${zone.label}</div>
                            <div class="zone-content flex flex-wrap gap-2 min-h-[30px]"></div>
                        </div>
                    `).join('')}
                </div>
            </div>
            <div id="${this.containerId}-feedback" class="mt-4 text-center hidden"></div>
            <button id="${this.containerId}-check" class="mt-4 w-full md:w-auto mx-auto block btn-primary px-8 py-2 rounded-full font-bold">
                Vérifier <i class="fas fa-check ml-2"></i>
            </button>
        `;

        this.attachEvents();
    }

    attachEvents() {
        const container = document.getElementById(this.containerId);
        let draggedItem = null;

        // Drag Start
        container.querySelectorAll('.draggable-item').forEach(item => {
            item.addEventListener('dragstart', (e) => {
                draggedItem = item;
                setTimeout(() => item.classList.add('opacity-50'), 0);
            });
            item.addEventListener('dragend', () => {
                draggedItem = null;
                item.classList.remove('opacity-50');
            });
        });

        // Drop Zones
        container.querySelectorAll('.drop-zone').forEach(zone => {
            zone.addEventListener('dragover', (e) => {
                e.preventDefault();
                zone.classList.add('border-blue-500', 'bg-blue-900/20');
            });
            zone.addEventListener('dragleave', () => {
                zone.classList.remove('border-blue-500', 'bg-blue-900/20');
            });
            zone.addEventListener('drop', (e) => {
                e.preventDefault();
                zone.classList.remove('border-blue-500', 'bg-blue-900/20');
                if (draggedItem) {
                    const content = zone.querySelector('.zone-content');
                    content.appendChild(draggedItem);
                }
            });
        });

        // Check Button
        const btn = document.getElementById(`${this.containerId}-check`);
        btn.addEventListener('click', () => this.validate());
    }

    validate() {
        let correctCount = 0;
        let container = document.getElementById(this.containerId);
        if (!container) return false;
        
        // Check contents of each zone
        // Map item ID to expected zone ID
        const expected = {};
        this.items.forEach(i => expected[i.id] = i.matchZoneId);

        let allCorrect = true;

        this.items.forEach(item => {
            const el = container.querySelector(`.draggable-item[data-id="${item.id}"]`);
            if (!el) { allCorrect = false; return; }
            const parentZone = el.closest('.drop-zone');
            
            if (parentZone && parentZone.dataset.zone === expected[item.id]) {
                el.classList.add('bg-green-600', 'border-green-400');
                el.classList.remove('bg-blue-600', 'bg-red-600');
                correctCount++;
            } else {
                el.classList.add('bg-red-600');
                el.classList.remove('bg-blue-600', 'bg-green-600');
                allCorrect = false;
            }
        });

        const feedback = document.getElementById(`${this.containerId}-feedback`);
        if (feedback) {
            feedback.classList.remove('hidden');
            
            if (allCorrect) {
                feedback.innerHTML = `<span class="text-green-400 font-bold"><i class="fas fa-trophy"></i> Parfait ! Toutes les associations sont correctes.</span>`;
                if (this.onComplete) this.onComplete();
            } else {
                feedback.innerHTML = `<span class="text-amber-400 font-bold"><i class="fas fa-exclamation-triangle"></i> Il y a des erreurs. Essayez encore.</span>`;
            }
        }

        return allCorrect;
    }
}

window.DragDropEngine = DragDropEngine;

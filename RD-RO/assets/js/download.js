class CourseDownloader {
    constructor() {
        // Wait for DOM if not ready
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.initUI());
        } else {
            this.initUI();
        }
    }

    initUI() {
        // TARGET NAVIGATION BAR
        // Multi-strategy selector to find the right container for the "Download" button
        
        let navContainer = null;
        
        // Strategy 1: Explicit gap/flex containers (Common in chapters)
        navContainer = document.querySelector('nav div[class*="gap-"]');
        
        // Strategy 2: Specific class for Exam Simulator
        if (!navContainer || navContainer.children.length === 0) {
            navContainer = document.querySelector('.nav-links');
        }

        // Strategy 3: Tailwind specific (Index, Exercices)
        // Look for hidden md:block/flex containers that usually hold desktop menu
        if (!navContainer) {
            navContainer = document.querySelector('nav .hidden.md\\:flex');
            if (!navContainer) navContainer = document.querySelector('nav .hidden.md\\:block > div');
        }

        // If nav exists, add button
        if (navContainer) {
            const btn = document.createElement('button');
            btn.innerHTML = '<i class="fas fa-file-arrow-down mr-2"></i>Télécharger';
            btn.className = "text-sm font-medium text-slate-400 hover:text-emerald-300 transition-colors flex items-center cursor-pointer ml-4 px-3 py-1.5 rounded-lg border border-white/5 hover:bg-white/5";
            btn.onclick = (e) => {
                e.preventDefault();
                this.openModal();
            };
            navContainer.appendChild(btn);
        }

        // PREPARE MODAL HTML (Hidden)
        this.createModal();
    }

    createModal() {
        this.modal = document.createElement('div');
        this.modal.id = 'download-modal';
        this.modal.className = 'fixed inset-0 z-[100] hidden transition-opacity duration-300 opacity-0';
        this.modal.innerHTML = `
            <div class="absolute inset-0 bg-slate-900/80 backdrop-blur-sm" onclick="window.courseDownloader.closeModal()"></div>
            <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-md bg-slate-800 border border-slate-700 rounded-2xl shadow-2xl p-6 transform scale-95 transition-transform duration-300">
                <div class="flex justify-between items-center mb-6">
                    <h3 class="text-xl font-bold text-white flex items-center">
                        <div class="w-8 h-8 rounded-full bg-emerald-500/20 flex items-center justify-center mr-3 text-emerald-400">
                            <i class="fas fa-cloud-download-alt text-sm"></i>
                        </div>
                        Télécharger le contenu
                    </h3>
                    <button onclick="window.courseDownloader.closeModal()" class="text-slate-400 hover:text-white transition-colors">
                        <i class="fas fa-times text-lg"></i>
                    </button>
                </div>
                
                <div class="space-y-6">
                    <!-- Format Selection -->
                    <div>
                        <label class="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">1. Format du fichier</label>
                        <div class="grid grid-cols-3 gap-3">
                            <label class="cursor-pointer relative">
                                <input type="radio" name="dl-format" value="pdf" checked class="peer sr-only">
                                <div class="p-3 rounded-xl border border-slate-600 bg-slate-700/50 hover:bg-slate-700 peer-checked:border-emerald-500 peer-checked:bg-emerald-500/10 transition-all text-center">
                                    <i class="fas fa-file-pdf text-2xl text-red-400 mb-2"></i>
                                    <div class="text-xs font-semibold text-slate-300">PDF</div>
                                </div>
                            </label>
                            <label class="cursor-pointer relative">
                                <input type="radio" name="dl-format" value="docx" class="peer sr-only">
                                <div class="p-3 rounded-xl border border-slate-600 bg-slate-700/50 hover:bg-slate-700 peer-checked:border-blue-500 peer-checked:bg-blue-500/10 transition-all text-center">
                                    <i class="fas fa-file-word text-2xl text-blue-400 mb-2"></i>
                                    <div class="text-xs font-semibold text-slate-300">DOCX</div>
                                </div>
                            </label>
                            <label class="cursor-pointer relative">
                                <input type="radio" name="dl-format" value="txt" class="peer sr-only">
                                <div class="p-3 rounded-xl border border-slate-600 bg-slate-700/50 hover:bg-slate-700 peer-checked:border-slate-400 peer-checked:bg-white/5 transition-all text-center">
                                    <i class="fas fa-file-alt text-2xl text-slate-400 mb-2"></i>
                                    <div class="text-xs font-semibold text-slate-300">TXT</div>
                                </div>
                            </label>
                        </div>
                    </div>

                    <!-- Content Scope -->
                    <div>
                        <label class="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">2. Contenu à inclure</label>
                        <div class="bg-slate-900/50 rounded-lg p-1 flex">
                            <label class="flex-1 cursor-pointer">
                                <input type="radio" name="dl-content" value="cours" checked class="peer sr-only">
                                <div class="text-center py-2 text-sm rounded-md text-slate-400 peer-checked:bg-slate-700 peer-checked:text-white peer-checked:shadow transition-all">
                                    Cours Complet
                                </div>
                            </label>
                            <label class="flex-1 cursor-pointer">
                                <input type="radio" name="dl-content" value="exos" class="peer sr-only">
                                <div class="text-center py-2 text-sm rounded-md text-slate-400 peer-checked:bg-slate-700 peer-checked:text-white peer-checked:shadow transition-all">
                                    Exercices
                                </div>
                            </label>
                            <label class="flex-1 cursor-pointer">
                                <input type="radio" name="dl-content" value="qcm" class="peer sr-only">
                                <div class="text-center py-2 text-sm rounded-md text-slate-400 peer-checked:bg-slate-700 peer-checked:text-white peer-checked:shadow transition-all">
                                    QCM 100
                                </div>
                            </label>
                        </div>
                    </div>

                    <!-- Action -->
                    <button onclick="window.courseDownloader.processDownload()" class="w-full group relative overflow-hidden bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-white font-bold py-3.5 rounded-xl transition-all shadow-lg shadow-emerald-500/20">
                        <span class="relative z-10 flex items-center justify-center gap-2">
                            <span>Générer et Télécharger</span>
                            <i class="fas fa-arrow-right group-hover:translate-x-1 transition-transform"></i>
                        </span>
                    </button>
                    <p class="text-xs text-center text-slate-500">Pour le PDF, la boîte de dialogue d'impression s'ouvrira.</p>
                </div>
            </div>
        `;
        document.body.appendChild(this.modal);
    }

    openModal() {
        this.modal.classList.remove('hidden');
        // Small delay for animation
        setTimeout(() => {
            this.modal.classList.remove('opacity-0');
            this.modal.querySelector('div.transform').classList.remove('scale-95');
            this.modal.querySelector('div.transform').classList.add('scale-100');
        }, 10);
    }

    closeModal() {
        this.modal.classList.add('opacity-0');
        this.modal.querySelector('div.transform').classList.remove('scale-100');
        this.modal.querySelector('div.transform').classList.add('scale-95');
        setTimeout(() => {
            this.modal.classList.add('hidden');
        }, 300);
    }

    processDownload() {
        const format = document.querySelector('input[name="dl-format"]:checked').value;
        const scope = document.querySelector('input[name="dl-content"]:checked').value;
        const title = (document.title || 'Cours_RO').replace(/[^a-z0-9]/gi, '_').toLowerCase();

        // MAPPING TO FILE NAMES
        let baseName = "";
        if (scope === 'cours') baseName = "RO-Cours-Complet-Bases-Detaillees";
        else if (scope === 'exos') baseName = "RO-10-Exercices-Modelisation";
        else if (scope === 'qcm') baseName = "RO-QCM-100-questions";

        const fileName = `${baseName}.${format}`;

        // PATH PREFIX — adjust for subdirectory
        let pathPrefix = "./";
        if (window.location.pathname.includes('/chapitres/') || window.location.pathname.includes('/exercices/')) {
            pathPrefix = "../";
        }

        // TXT files exist on disk — try direct download first
        if (format === 'txt') {
            const fullPath = pathPrefix + `${baseName}.txt`;
            const link = document.createElement('a');
            link.href = fullPath;
            link.download = fileName;
            link.target = "_blank";
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            this.closeModal();
            return;
        }

        // PDF — use browser print dialog (client-side generation)
        if (format === 'pdf') {
            this.printAsPDF(scope);
            this.closeModal();
            return;
        }

        // DOCX — client-side generation from page content
        if (format === 'docx') {
            const content = this.prepareContent(scope);
            this.exportDocx(content, fileName);
            this.closeModal();
            return;
        }
    }

    prepareContent(scope) {
        // Create a cleaner version of the content
        const clone = document.createElement('div');
        
        // Headers
        const header = document.createElement('h1');
        header.innerText = document.querySelector('h1')?.innerText || 'Cours RO';
        clone.appendChild(header);
        
        // Grab main content
        const main = document.querySelector('main');
        if (!main) return clone;

        const mainClone = main.cloneNode(true);

        // Filter based on scope
        if (scope === 'course') {
            // Remove exercises container
            mainClone.querySelectorAll('#interactive-exercise, .simulator-viewport, .inputs-panel').forEach(el => el.remove());
        } else if (scope === 'exos') {
            // Keep ONLY exercises
            // Try to find exercises or simulator
            const items = [];
            mainClone.querySelectorAll('#interactive-exercise, .simulator-controls').forEach(el => items.push(el.cloneNode(true)));
            
            mainClone.innerHTML = '';
            if (items.length > 0) {
                items.forEach(i => mainClone.appendChild(i));
            } else {
                mainClone.innerHTML = '<p>Aucun exercice interactif détecté sur cette page.</p>';
            }
        }

        // Cleanup Classes for Text/Docx
        // (Removing classes isn't strictly necessary for Docx as we rely on innerHTML, but helps for TXT)
        clone.appendChild(mainClone);
        return clone;
    }

    printAsPDF(scope) {
        // Inject Print CSS
        const styleId = 'print-styles-generated';
        const existing = document.getElementById(styleId);
        if(existing) existing.remove();

        const style = document.createElement('style');
        style.id = styleId;
        style.media = 'print';
        
        let hideRules = `
            nav, button, #download-modal, .simulator-controls, .no-print { display: none !important; }
            body { background: white !important; color: black !important; -webkit-print-color-adjust: exact; }
            .glass-card { box-shadow: none !important; border: 1px solid #ddd !important; background: white !important; color: black !important; break-inside: avoid; }
            h1, h2, h3 { color: black !important; }
            p { color: #333 !important; }
            canvas { border: 1px solid #ccc; max-width: 100%; }
        `;

        if (scope === 'course') {
            hideRules += ` #interactive-exercise, .simulator-viewport, canvas { display: none !important; } `;
        } else if (scope === 'exos') {
            hideRules += ` article:not(#interactive-exercise):not(.simulator-viewport) { display: none !important; } section { display: none !important; } `;
        }

        style.innerHTML = hideRules;
        document.head.appendChild(style);

        window.print();

        // Cleanup after print (delayed)
        // Note: window.print blocks JS execution in many browsers until closed, so this runs after
        // But to be safe, we leave it or rely on a timeout.
    }

    exportDocx(node, filename) {
        const preHtml = `
            <html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'>
            <head>
                <meta charset='utf-8'>
                <title>Export</title>
                <style>
                    body { font-family: 'Arial', sans-serif; }
                    h1 { color: #059669; font-size: 24pt; }
                    h2 { color: #333; font-size: 18pt; margin-top: 20px; }
                    p { font-size: 12pt; line-height: 1.5; text-align: justify; }
                    .glass-card { border: 1px solid #ccc; padding: 20px; margin-bottom: 20px; }
                </style>
            </head><body>`;
        const postHtml = "</body></html>";
        
        // Convert input values to text for forms
        node.querySelectorAll('input').forEach(input => {
            const span = document.createElement('span');
            span.innerText = `[Valeur: ${input.value}]`;
            input.replaceWith(span);
        });

        const html = preHtml + node.innerHTML + postHtml;

        const blob = new Blob(['\ufeff', html], { type: 'application/msword' });
        this.downloadBlob(blob, filename);
    }

    exportTxt(node, filename) {
        // crude text extraction
        let text = node.innerText;
        // Basic cleanup
        text = text.replace(/\n\s*\n/g, '\n\n'); 
        
        const blob = new Blob([text], { type: 'text/plain' });
        this.downloadBlob(blob, filename);
    }

    downloadBlob(blob, filename) {
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = filename;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        setTimeout(() => URL.revokeObjectURL(url), 1000);
    }
}

// Global instance
window.courseDownloader = new CourseDownloader();

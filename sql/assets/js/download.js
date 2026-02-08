/**
 * DOWNLOAD.JS — Exporte le contenu du module courant en fichier texte / HTML
 * Fonctionne côté client pur (pas de serveur requis).
 */
document.addEventListener('DOMContentLoaded', () => {
    const navbar = document.querySelector('nav .container');
    if (!navbar) return;

    // Determine current page title
    const pageTitle = document.title || 'RD-SQL';
    const path = window.location.pathname;
    const isModule = path.includes('mod');

    // Create Download button
    const btn = document.createElement('button');
    btn.innerHTML = `<i class="fas fa-download mr-1"></i> Export`;
    btn.className = "bg-blue-600 hover:bg-blue-500 text-white px-3 py-1.5 rounded text-xs font-bold transition-colors shadow hidden md:inline-flex items-center gap-1 ml-2";
    btn.title = "Exporter cette page";

    btn.addEventListener('click', () => showExportMenu(btn));

    // Insert in navbar
    const xpEl = document.getElementById('user-xp');
    if (xpEl && xpEl.parentElement) {
        xpEl.parentElement.insertBefore(btn, xpEl);
    }

    function showExportMenu(anchor) {
        // Remove existing menu
        const existing = document.getElementById('export-menu');
        if (existing) { existing.remove(); return; }

        const menu = document.createElement('div');
        menu.id = 'export-menu';
        menu.className = 'absolute right-4 top-16 bg-slate-800 border border-slate-600 rounded-lg shadow-xl z-50 p-2 min-w-[180px]';
        menu.innerHTML = `
            <button onclick="exportAs('html')" class="w-full text-left px-3 py-2 text-sm text-slate-300 hover:bg-slate-700 rounded flex items-center gap-2">
                <i class="fas fa-code text-blue-400"></i> HTML complet
            </button>
            <button onclick="exportAs('text')" class="w-full text-left px-3 py-2 text-sm text-slate-300 hover:bg-slate-700 rounded flex items-center gap-2">
                <i class="fas fa-file-alt text-emerald-400"></i> Texte brut
            </button>
            <button onclick="exportAs('notes')" class="w-full text-left px-3 py-2 text-sm text-slate-300 hover:bg-slate-700 rounded flex items-center gap-2">
                <i class="fas fa-sticky-note text-amber-400"></i> Notes de révision
            </button>
        `;
        document.body.appendChild(menu);

        // Close on outside click
        setTimeout(() => {
            document.addEventListener('click', function closer(e) {
                if (!menu.contains(e.target) && e.target !== anchor) {
                    menu.remove();
                    document.removeEventListener('click', closer);
                }
            });
        }, 100);
    }

    // Global export function
    window.exportAs = function(format) {
        const menu = document.getElementById('export-menu');
        if (menu) menu.remove();

        const mainContent = document.querySelector('main');
        if (!mainContent) return;

        const timestamp = new Date().toISOString().slice(0, 10);
        const safeName = pageTitle.replace(/[^a-zA-Z0-9]/g, '_').substring(0, 50);

        if (format === 'html') {
            // Full HTML export
            const htmlContent = `<!DOCTYPE html>
<html lang="fr">
<head>
<meta charset="UTF-8">
<title>${pageTitle}</title>
<style>
body { font-family: 'Segoe UI', sans-serif; max-width: 900px; margin: 2rem auto; padding: 0 1rem; color: #1e293b; line-height: 1.6; }
h1,h2,h3 { color: #1e40af; }
code { background: #f1f5f9; padding: 2px 6px; border-radius: 4px; font-size: 0.9em; }
pre { background: #1e293b; color: #a7f3d0; padding: 1rem; border-radius: 8px; overflow-x: auto; }
table { border-collapse: collapse; width: 100%; margin: 1rem 0; }
th, td { border: 1px solid #cbd5e1; padding: 8px; text-align: left; }
th { background: #f1f5f9; }
.footer { margin-top: 2rem; padding-top: 1rem; border-top: 1px solid #e2e8f0; color: #94a3b8; font-size: 0.8rem; }
</style>
</head>
<body>
<h1>${pageTitle}</h1>
<p><em>Exporté le ${timestamp} — RD-SQL</em></p>
<hr>
${extractCleanHTML(mainContent)}
<div class="footer">Document généré par RD-SQL — ${timestamp}</div>
</body>
</html>`;

            downloadFile(`${safeName}_${timestamp}.html`, htmlContent, 'text/html');

        } else if (format === 'text') {
            // Plain text
            const text = `${pageTitle}\nExporté le ${timestamp}\n${'='.repeat(50)}\n\n${extractText(mainContent)}`;
            downloadFile(`${safeName}_${timestamp}.txt`, text, 'text/plain');

        } else if (format === 'notes') {
            // Condensed revision notes
            const notes = generateRevisionNotes(mainContent);
            const text = `NOTES DE RÉVISION — ${pageTitle}\n${timestamp}\n${'='.repeat(50)}\n\n${notes}`;
            downloadFile(`Notes_${safeName}_${timestamp}.txt`, text, 'text/plain');
        }

        // Notify
        if (window.DataBot) {
            const bot = document.querySelector('.databot-instance');
            // Find any DataBot instance
        }
        showToast(`Export ${format.toUpperCase()} téléchargé !`);
    };

    function extractCleanHTML(el) {
        const clone = el.cloneNode(true);
        // Remove scripts, buttons, interactive elements
        clone.querySelectorAll('script, button, textarea, #databot-container, .databot-instance, #drag-drop-exercice, #quiz-container').forEach(e => e.remove());
        return clone.innerHTML;
    }

    function extractText(el) {
        const clone = el.cloneNode(true);
        clone.querySelectorAll('script, button, textarea, #databot-container, #drag-drop-exercice, #quiz-container, nav').forEach(e => e.remove());
        // Get text content, clean up whitespace
        return clone.textContent
            .replace(/\n{3,}/g, '\n\n')
            .replace(/[ \t]+/g, ' ')
            .trim();
    }

    function generateRevisionNotes(el) {
        const sections = el.querySelectorAll('section h2');
        let notes = '';
        sections.forEach(h2 => {
            const section = h2.closest('section');
            if (!section) return;
            notes += `## ${h2.textContent.trim()}\n`;
            // Get code blocks
            section.querySelectorAll('code').forEach(code => {
                const text = code.textContent.trim();
                if (text.length > 5 && text.length < 200) {
                    notes += `  → ${text}\n`;
                }
            });
            // Get key points from content boxes
            section.querySelectorAll('.content-box').forEach(box => {
                notes += `  ⚡ ${box.textContent.trim().substring(0, 150)}\n`;
            });
            notes += '\n';
        });
        return notes || extractText(el).substring(0, 2000);
    }

    function downloadFile(filename, content, mimeType) {
        const blob = new Blob([content], { type: mimeType + ';charset=utf-8' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        setTimeout(() => {
            document.body.removeChild(a);
            URL.revokeObjectURL(url);
        }, 100);
    }

    function showToast(msg) {
        const toast = document.createElement('div');
        toast.className = 'fixed bottom-4 right-4 px-6 py-3 rounded shadow-lg text-white font-bold text-sm bg-emerald-600 transform transition-all duration-500 translate-y-20 z-50';
        toast.innerText = msg;
        document.body.appendChild(toast);
        setTimeout(() => toast.classList.remove('translate-y-20'), 100);
        setTimeout(() => {
            toast.classList.add('opacity-0');
            setTimeout(() => toast.remove(), 500);
        }, 2500);
    }
});

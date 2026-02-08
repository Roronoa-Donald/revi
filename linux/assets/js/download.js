/* ============================================================
   LINUX ADMINISTRATION — download.js
   Modal de téléchargement : PDF (print), DOCX, TXT
   ============================================================ */
class CourseDownloader {
    constructor() {
        this.injectButton();
        this.createModal();
    }

    injectButton() {
        const nav = document.querySelector('.nav-actions');
        if (!nav) return;
        const btn = document.createElement('button');
        btn.className = 'download-btn';
        btn.innerHTML = '<i class="fas fa-download"></i>';
        btn.setAttribute('aria-label', 'Télécharger le cours');
        btn.title = 'Télécharger';
        btn.addEventListener('click', () => this.open());
        nav.insertBefore(btn, nav.firstChild);
    }

    createModal() {
        const overlay = document.createElement('div');
        overlay.className = 'download-overlay';
        overlay.id = 'download-overlay';
        overlay.innerHTML = `
            <div class="download-modal">
                <button class="download-close" aria-label="Fermer">&times;</button>
                <h3 style="font-weight:700;margin-bottom:0.25rem;">Télécharger</h3>
                <p style="font-size:0.85rem;color:var(--text-muted);margin-bottom:1.25rem;">Choisissez le format d'export</p>
                <div class="download-option" data-format="pdf">
                    <i class="fas fa-file-pdf"></i>
                    <div><strong>PDF</strong><br><small style="color:var(--text-muted)">Via l'impression du navigateur</small></div>
                </div>
                <div class="download-option" data-format="docx">
                    <i class="fas fa-file-word"></i>
                    <div><strong>DOCX</strong><br><small style="color:var(--text-muted)">Document Word</small></div>
                </div>
                <div class="download-option" data-format="txt">
                    <i class="fas fa-file-alt"></i>
                    <div><strong>TXT</strong><br><small style="color:var(--text-muted)">Texte brut</small></div>
                </div>
            </div>
        `;
        document.body.appendChild(overlay);

        overlay.querySelector('.download-close').addEventListener('click', () => this.close());
        overlay.addEventListener('click', e => { if (e.target === overlay) this.close(); });
        document.addEventListener('keydown', e => { if (e.key === 'Escape') this.close(); });

        overlay.querySelectorAll('.download-option').forEach(opt => {
            opt.addEventListener('click', () => {
                const format = opt.dataset.format;
                if (format === 'pdf') this.exportPDF();
                else if (format === 'docx') this.exportDOCX();
                else if (format === 'txt') this.exportTXT();
                this.close();
            });
        });
    }

    open() { document.getElementById('download-overlay')?.classList.add('active'); }
    close() { document.getElementById('download-overlay')?.classList.remove('active'); }

    exportPDF() { window.print(); }

    exportDOCX() {
        const main = document.querySelector('main') || document.querySelector('.glass-card') || document.body;
        const title = document.title || 'Cours Linux';
        const html = `
            <html xmlns:o="urn:schemas-microsoft-com:office:office"
                  xmlns:w="urn:schemas-microsoft-com:office:word"
                  xmlns="http://www.w3.org/TR/REC-html40">
            <head><meta charset="utf-8"><title>${title}</title>
            <style>body{font-family:Calibri,sans-serif;font-size:12pt;line-height:1.6;}
            h1,h2,h3{color:#1e293b;}pre{background:#f1f5f9;padding:10px;border:1px solid #ddd;font-family:Consolas,monospace;font-size:10pt;}
            code{font-family:Consolas,monospace;}</style></head>
            <body>${main.innerHTML}</body></html>`;
        const blob = new Blob(['\ufeff', html], { type: 'application/msword' });
        this.download(blob, `${title.replace(/[^a-zA-Z0-9]/g, '_')}.doc`);
    }

    exportTXT() {
        const main = document.querySelector('main') || document.body;
        const text = main.innerText;
        const blob = new Blob([text], { type: 'text/plain;charset=utf-8' });
        this.download(blob, `${document.title || 'cours_linux'}.txt`);
    }

    download(blob, filename) {
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url; a.download = filename;
        document.body.appendChild(a);
        a.click();
        setTimeout(() => { document.body.removeChild(a); URL.revokeObjectURL(url); }, 100);
    }
}

document.addEventListener('DOMContentLoaded', () => new CourseDownloader());

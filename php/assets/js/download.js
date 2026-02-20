/* ============================================================
   PHP POO — download.js
   Export PDF / Markdown / TXT
   ============================================================ */

class CourseDownloader {
    constructor() {
        this.injectButton();
    }

    injectButton() {
        const nav = document.querySelector('.main-nav');
        if (!nav) return;
        const btn = document.createElement('button');
        btn.className = 'btn-download';
        btn.title = 'Télécharger ce chapitre';
        btn.setAttribute('aria-label', 'Télécharger');
        btn.innerHTML = '<i class="fas fa-download"></i>';
        Object.assign(btn.style, {
            background: 'none', border: '1px solid var(--border-color)', color: 'var(--text-secondary)',
            width: '36px', height: '36px', borderRadius: '50%', display: 'flex',
            alignItems: 'center', justifyContent: 'center', cursor: 'pointer', fontSize: '1rem',
            transition: 'all .2s'
        });
        btn.addEventListener('mouseenter', () => { btn.style.background = '#8b5cf6'; btn.style.color = '#fff'; btn.style.borderColor = '#8b5cf6'; });
        btn.addEventListener('mouseleave', () => { btn.style.background = 'none'; btn.style.color = 'var(--text-secondary)'; btn.style.borderColor = 'var(--border-color)'; });
        btn.addEventListener('click', () => this.showModal());
        nav.appendChild(btn);
    }

    showModal() {
        if (document.getElementById('download-overlay')) {
            document.getElementById('download-overlay').classList.add('active');
            return;
        }
        const overlay = document.createElement('div');
        overlay.id = 'download-overlay';
        Object.assign(overlay.style, {
            position: 'fixed', inset: '0', background: 'rgba(0,0,0,.6)', zIndex: '4000',
            display: 'flex', alignItems: 'center', justifyContent: 'center'
        });
        overlay.classList.add('active');
        overlay.innerHTML = `
            <div style="background:var(--bg-primary,#fff);border:1px solid var(--border-color,#e2e8f0);border-radius:14px;padding:2rem;max-width:400px;width:90%;box-shadow:0 20px 40px rgba(0,0,0,.2);">
                <button id="dl-close" style="float:right;background:none;border:none;font-size:1.3rem;cursor:pointer;color:var(--text-secondary);">✕</button>
                <h3 style="margin:0 0 1.2rem;color:var(--text-primary);">📥 Télécharger</h3>
                <button class="dl-opt" data-fmt="pdf">📄 Exporter PDF (impression)</button>
                <button class="dl-opt" data-fmt="md">📝 Exporter Markdown</button>
                <button class="dl-opt" data-fmt="txt">📋 Exporter Texte brut</button>
            </div>
        `;
        document.body.appendChild(overlay);

        // Style options
        overlay.querySelectorAll('.dl-opt').forEach(btn => {
            Object.assign(btn.style, {
                display: 'flex', alignItems: 'center', gap: '.8rem',
                padding: '.9rem 1rem', border: '1px solid var(--border-color)',
                borderRadius: '10px', cursor: 'pointer', background: 'none',
                width: '100%', color: 'inherit', fontSize: '.95rem', marginBottom: '.5rem',
                transition: 'background .2s, border-color .2s'
            });
            btn.addEventListener('mouseenter', () => { btn.style.background = 'rgba(139,92,246,.08)'; btn.style.borderColor = '#8b5cf6'; });
            btn.addEventListener('mouseleave', () => { btn.style.background = 'none'; btn.style.borderColor = 'var(--border-color)'; });
        });

        overlay.querySelector('#dl-close').addEventListener('click', () => overlay.remove());
        overlay.addEventListener('click', e => { if (e.target === overlay) overlay.remove(); });

        overlay.querySelectorAll('.dl-opt').forEach(btn => {
            btn.addEventListener('click', () => {
                const fmt = btn.dataset.fmt;
                if (fmt === 'pdf') this.exportPDF();
                else if (fmt === 'md') this.exportMarkdown();
                else this.exportTXT();
                overlay.remove();
            });
        });
    }

    exportPDF() { window.print(); }

    exportMarkdown() {
        const main = document.querySelector('main') || document.body;
        let md = '';
        main.querySelectorAll('h1,h2,h3,h4,p,pre,li').forEach(el => {
            const tag = el.tagName;
            const txt = el.textContent.trim();
            if (tag === 'H1') md += `# ${txt}\n\n`;
            else if (tag === 'H2') md += `## ${txt}\n\n`;
            else if (tag === 'H3') md += `### ${txt}\n\n`;
            else if (tag === 'H4') md += `#### ${txt}\n\n`;
            else if (tag === 'PRE') md += '```\n' + txt + '\n```\n\n';
            else if (tag === 'LI') md += `- ${txt}\n`;
            else md += txt + '\n\n';
        });
        this._download(md, this._filename() + '.md', 'text/markdown');
    }

    exportTXT() {
        const main = document.querySelector('main') || document.body;
        this._download(main.innerText, this._filename() + '.txt', 'text/plain');
    }

    _filename() {
        return (document.title || 'cours-php').replace(/[^a-zA-Z0-9àâéèêëïîôù-]/g, '_').substring(0, 60);
    }

    _download(content, name, type) {
        const blob = new Blob([content], { type: type + ';charset=utf-8' });
        const a = document.createElement('a');
        a.href = URL.createObjectURL(blob);
        a.download = name;
        a.click();
        URL.revokeObjectURL(a.href);
    }
}

document.addEventListener('DOMContentLoaded', () => new CourseDownloader());

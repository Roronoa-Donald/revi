/* ============================================
   RD Java — Course Downloader
   ============================================ */

class CourseDownloader {
    constructor() {
        this.bindButtons();
    }

    bindButtons() {
        document.querySelectorAll('[data-download]').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                const format = btn.dataset.download;
                this.download(format);
            });
        });
    }

    download(format) {
        const main = document.querySelector('main') || document.querySelector('#main-content');
        if (!main) return;

        const title = document.querySelector('h1')?.textContent || 'RD Java';
        const content = this.extractText(main);

        switch (format) {
            case 'pdf':
                this.downloadPDF(title, content);
                break;
            case 'txt':
                this.downloadTXT(title, content);
                break;
            default:
                this.downloadTXT(title, content);
        }
    }

    extractText(el) {
        const clone = el.cloneNode(true);
        clone.querySelectorAll('script, style, .exercise-tabs, button, .quiz-options').forEach(e => e.remove());
        return clone.innerText || clone.textContent;
    }

    downloadTXT(title, content) {
        const text = `${title}\n${'='.repeat(title.length)}\n\n${content}`;
        const blob = new Blob([text], { type: 'text/plain;charset=utf-8' });
        this.triggerDownload(blob, `${this.slugify(title)}.txt`);
    }

    downloadPDF(title, content) {
        const win = window.open('', '_blank');
        win.document.write(`<!DOCTYPE html><html><head><title>${title}</title>
            <style>body{font-family:Arial,sans-serif;max-width:800px;margin:2rem auto;padding:0 1rem;line-height:1.6;}
            h1{color:#dc2626;border-bottom:2px solid #ef4444;padding-bottom:0.5rem;}
            code{background:#f3f4f6;padding:0.1rem 0.3rem;border-radius:3px;font-size:0.9em;}</style>
            </head><body><h1>${title}</h1><pre style="white-space:pre-wrap;">${content}</pre></body></html>`);
        win.document.close();
        setTimeout(() => { win.print(); }, 500);
    }

    slugify(str) {
        return str.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    }

    triggerDownload(blob, filename) {
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url; a.download = filename;
        document.body.appendChild(a);
        a.click();
        setTimeout(() => { document.body.removeChild(a); URL.revokeObjectURL(url); }, 100);
    }
}

document.addEventListener('DOMContentLoaded', () => new CourseDownloader());

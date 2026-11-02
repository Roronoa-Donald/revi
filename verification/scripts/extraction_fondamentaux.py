from html.parser import HTMLParser
from pathlib import Path
import re


ROOT = Path(__file__).resolve().parents[2]
DESTINATION = ROOT / 'verification' / 'tmp-lecture-fondamentaux'
COURSES = ('b1-algo', 'b1-python', 'b1-sql', 'b1-linux',
           'b1-reseaux', 'b1-ccna1', 'b1-architecture')
BOUNDARIES = {'h1', 'h2', 'h3', 'h4', 'p', 'li', 'pre', 'div', 'section',
              'tr', 'th', 'td', 'button', 'summary', 'br'}
SKIP = {'style', 'svg', 'nav', 'footer', 'aside'}


class ChapterText(HTMLParser):
    def __init__(self):
        super().__init__(convert_charrefs=True)
        self.in_main = False
        self.skip_depth = 0
        self.in_code = False
        self.buffer = []
        self.line = None
        self.paragraphs = []

    def flush(self):
        text = ''.join(self.buffer)
        if self.in_code:
            text = '\n'.join(line.rstrip() for line in text.splitlines()).strip('\n')
        else:
            text = re.sub(r'\s+', ' ', text).strip()
        if text:
            self.paragraphs.append(f'L{self.line}: {text}')
        self.buffer = []
        self.line = None

    def handle_starttag(self, tag, attrs):
        attrs = dict(attrs)
        if tag == 'main':
            self.in_main = True
            return
        if not self.in_main:
            return
        if self.skip_depth:
            if tag in SKIP or tag == 'script':
                self.skip_depth += 1
            return
        if tag in SKIP or (tag == 'script' and 'data-lab-starter' not in attrs):
            self.flush()
            self.skip_depth = 1
            return
        if tag in BOUNDARIES or tag == 'script':
            self.flush()
        if tag in {'pre', 'script'}:
            self.in_code = True
        if tag == 'button' and attrs.get('data-correct') == '1':
            self.buffer.append('[réponse marquée correcte] ')
            self.line = self.getpos()[0]
        if tag == 'img' and attrs.get('alt'):
            self.buffer.append('[image : ' + attrs['alt'] + ']')
            self.line = self.line or self.getpos()[0]

    def handle_endtag(self, tag):
        if not self.in_main:
            return
        if self.skip_depth:
            if tag in SKIP or tag == 'script':
                self.skip_depth -= 1
            return
        if tag in BOUNDARIES or tag in {'main', 'script'}:
            self.flush()
        if tag in {'pre', 'script'}:
            self.in_code = False
        if tag == 'main':
            self.in_main = False

    def handle_data(self, data):
        if self.in_main and not self.skip_depth:
            if self.line is None and data.strip():
                self.line = self.getpos()[0]
            self.buffer.append(data)


def main():
    DESTINATION.mkdir(exist_ok=True)
    count = 0
    for course in COURSES:
        chapters = sorted((ROOT / course / 'chapitres').glob('chapitre[0-9]*.html'),
                          key=lambda path: int(re.search(r'\d+', path.stem).group()))
        for chapter in chapters:
            parser = ChapterText()
            parser.feed(chapter.read_text(encoding='utf-8'))
            if not parser.paragraphs:
                raise ValueError(f'Aucun texte principal extrait : {chapter}')
            target = DESTINATION / f'{course}-{chapter.stem}.txt'
            target.write_text('\n'.join(parser.paragraphs) + '\n', encoding='utf-8')
            count += 1
    print(f'{count} chapitres extraits dans {DESTINATION}')


if __name__ == '__main__':
    main()

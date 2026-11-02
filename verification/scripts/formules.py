#!/usr/bin/env python3
import json
import re
import subprocess
from html.parser import HTMLParser
from pathlib import Path

ROOT = Path(__file__).resolve().parents[2]
IGNORE = {'script', 'noscript', 'style', 'textarea', 'pre', 'code'}
FORMULA = re.compile(r'(?<!\\)(\$\$(.+?)\$\$|\\\[(.+?)\\\]|\$(.+?)\$|\\\((.+?)\\\))', re.S)
SUSPECT = re.compile(r'\\\\(?:frac|sqrt|cdot|times|sum|prod|binom|mathbb|alpha|beta|sigma|leq|geq)\b|(?<![\w\\])(?:frac|sqrt|cdot|times|sum|prod|binom|mathbb)\s*\{')


class FormulaText(HTMLParser):
    def __init__(self, file):
        super().__init__(convert_charrefs=True)
        self.file = file
        self.body = False
        self.ignored = 0
        self.found = []
        self.suspect = []

    def handle_starttag(self, tag, attributes):
        if tag == 'body':
            self.body = True
        if tag in IGNORE:
            self.ignored += 1

    def handle_endtag(self, tag):
        if tag in IGNORE and self.ignored:
            self.ignored -= 1
        if tag == 'body':
            self.body = False

    def handle_data(self, data):
        if not self.body or self.ignored:
            return
        for match in FORMULA.finditer(data):
            expression = next(item for item in match.groups()[1:] if item is not None)
            if len(expression) > 1000:
                continue
            line = self.getpos()[0] + data[:match.start()].count('\n')
            self.found.append({'file': self.file, 'line': line, 'expression': expression, 'display': match.group(1).startswith(('$$', '\\['))})
        for match in SUSPECT.finditer(data):
            line = self.getpos()[0] + data[:match.start()].count('\n')
            self.suspect.append({'file': self.file, 'line': line, 'excerpt': data[max(0, match.start() - 30):match.end() + 50]})


paths = subprocess.check_output(['git', 'ls-files', '-z', '*.html'], cwd=ROOT).decode().split('\0')
formulas = []
suspects = []
for file in filter(None, paths):
    if file.startswith(('audit/', 'design-audit/', 'tests/')):
        continue
    target = ROOT / file
    if not target.is_file():
        continue
    parser = FormulaText(file)
    parser.feed(target.read_text(encoding='utf-8', errors='replace'))
    formulas.extend(parser.found)
    suspects.extend(parser.suspect)
print(json.dumps({'formulas': formulas, 'suspects': suspects}, ensure_ascii=False))

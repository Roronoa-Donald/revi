#!/usr/bin/env python3
import collections
import csv
import difflib
import html
import json
import os
import random
import re
import subprocess
import sys
from html.parser import HTMLParser
from pathlib import Path
from urllib.parse import unquote, urlsplit


ROOT = Path(__file__).resolve().parents[2]
OUT = ROOT / 'verification'
SEED = 20261029
RNG = random.Random(SEED)
FAMILIES = {
    'programmation': ['b1-algo', 'b1-python', 'b1-c-cpp', 'b1-php', 'b1-prog-web', 'b1-robotique', 'b3-algo', 'php', 'rd_java', 'react', 'api-rest-flask', 'csharp', 'assembleur'],
    'bases-donnees': ['b1-sql', 'sql', 'b3-sql'],
    'systemes': ['b1-linux', 'linux', 'b3-linux', 'b1-admin-windows', 'rd_winserver', 'b3-windows-server', 'admin-vm', 'b1-virtualisation', 'b3-virtualisation', 'b1-architecture', 'b1-bureautique', 'b1-vb-excel'],
    'reseaux': ['b1-reseaux', 'b1-ccna1', 'ccna', 'b3-reseau-lan', 'b3-voip', 'b3-supervision', 'b3-pfsense'],
    'securite': ['b1-cyber', 'Cyber securite B2', 'b3-cryptographie', 'b3-hacking', 'b3-firewall'],
    'cloud-devops': ['b3-cloud-computing', 'b3-cloud-aws', 'b3-cloud-azure', 'b3-google-cloud', 'b3-devops', 'docker'],
    'genie-logiciel': ['b1-git', 'b1-merise', 'b1-projet', 'b3-github', 'b3-agile', 'erp-si', 'ingenierie-besoin', 'uml', 'uiux', 'infographie'],
    'mathematiques': ['b1-algebre', 'b1-stats', 'probabilites', 'RD-RO', 'b3-etude-quantitative'],
    'droit-langues-professionnel': ['b1-droit', 'droit', 'b1-anglais', 'b3-anglais', 'b1-fr-pro', 'masterclass-apprendre', 'b3-document-technique', 'b3-veille']
}
VOID_TAGS = set('area base br col embed hr img input link meta param source track wbr'.split())
STANDARD_TAGS = set(('a abbr address article aside audio b bdi bdo blockquote body br button canvas caption cite code col colgroup data datalist dd del details dfn dialog div dl dt em embed fieldset figcaption figure footer form h1 h2 h3 h4 h5 h6 head header hgroup hr html i iframe img input ins kbd label legend li link main map mark menu meta meter nav noscript object ol optgroup option output p picture pre progress q rp rt ruby s samp script search section select slot small source span strong style sub summary sup table tbody td template textarea tfoot th thead time title tr track u ul var video wbr svg path use symbol circle rect line polygon polyline defs lineargradient radialgradient stop clippath mask g text tspan pattern filter fegaussianblur feblend femerge femergenode title desc math mi mn mo mrow mfrac msup msub msubsup mtext annotation semantics'.split()))


def collapse(value):
    return re.sub(r'\s+', ' ', html.unescape(value or '')).strip()


def normalize(value):
    value = collapse(value).casefold().replace('’', "'")
    return re.sub(r'[^\w\s]', '', value, flags=re.UNICODE).strip()


class VisibleText(HTMLParser):
    def __init__(self):
        super().__init__(convert_charrefs=True)
        self.blocked = 0
        self.parts = []

    def handle_starttag(self, tag, attrs):
        if tag in {'script', 'style', 'pre', 'code', 'svg'}:
            self.blocked += 1
        if not self.blocked and tag in {'p', 'div', 'li', 'h1', 'h2', 'h3', 'td', 'th', 'br'}:
            self.parts.append(' ')

    def handle_endtag(self, tag):
        if tag in {'script', 'style', 'pre', 'code', 'svg'} and self.blocked:
            self.blocked -= 1

    def handle_data(self, data):
        if not self.blocked:
            self.parts.append(data)


def visible_text(value):
    parser = VisibleText()
    parser.feed(value)
    return collapse(' '.join(parser.parts))


class Inspect(HTMLParser):
    def __init__(self, path):
        super().__init__(convert_charrefs=True)
        self.path = path
        self.stack = []
        self.links = []
        self.identifiers = set()
        self.unknown = []
        self.images_no_alt = []
        self.buttons = []
        self.headings = []
        self.bands = []
        self.cards = []
        self.card_faces = []
        self.questions = []
        self.current_question = None
        self.inert_depth = 0

    def handle_starttag(self, tag, attributes):
        attrs = dict(attributes)
        line = self.getpos()[0]
        classes = set((attrs.get('class') or '').split())
        parent_inert = self.inert_depth > 0
        if tag in {'script', 'style', 'pre', 'code'}:
            self.inert_depth += 1
        if not parent_inert and not self.inert_depth:
            if attrs.get('id'):
                self.identifiers.add(attrs['id'])
            if tag not in STANDARD_TAGS:
                self.unknown.append({'file': self.path, 'line': line, 'tag': tag})
            if tag == 'a' and attrs.get('href'):
                self.links.append({'file': self.path, 'line': line, 'href': attrs['href']})
            if tag == 'img' and 'alt' not in attrs:
                self.images_no_alt.append({'file': self.path, 'line': line, 'src': attrs.get('src', '')})
            if 'q' in classes:
                self.current_question = {'file': self.path, 'line': line, 'stem': '', 'options': [], 'explanation': ''}
        node = {'tag': tag, 'attrs': attrs, 'classes': classes, 'line': line, 'text': [], 'inert': parent_inert or self.inert_depth > 0}
        if tag not in VOID_TAGS:
            self.stack.append(node)
        elif tag == 'br':
            for ancestor in self.stack:
                ancestor['text'].append(' ')

    def handle_startendtag(self, tag, attrs):
        self.handle_starttag(tag, attrs)
        if tag not in VOID_TAGS:
            self.handle_endtag(tag)

    def handle_data(self, data):
        for node in self.stack:
            node['text'].append(data)

    def close_node(self, node):
        tag = node['tag']
        classes = node['classes']
        text = collapse(' '.join(node['text']))
        if not node['inert']:
            if tag in {'h1', 'h2', 'h3', 'h4', 'h5', 'h6'}:
                self.headings.append({'level': int(tag[1]), 'line': node['line'], 'text': text})
            if tag == 'button':
                self.buttons.append({'file': self.path, 'line': node['line'], 'text': text, 'label': node['attrs'].get('aria-label', ''), 'title': node['attrs'].get('title', '')})
            if 'bandrow' in classes:
                self.bands.append({'line': node['line'], 'text': text})
            if 'fc__face' in classes:
                self.card_faces.append({'line': node['line'], 'text': re.sub(r'^(Question|Réponse)\s*', '', text, flags=re.I), 'back': 'fc__back' in classes})
            if self.current_question is not None:
                if 'q__stem' in classes:
                    self.current_question['stem'] = text
                if 'opt' in classes:
                    self.current_question['options'].append({'text': text, 'correct': node['attrs'].get('data-correct') == '1'})
                if 'q__exp' in classes:
                    self.current_question['explanation'] = text
                if 'q' in classes:
                    self.questions.append(self.current_question)
                    self.current_question = None

    def handle_endtag(self, tag):
        if tag in VOID_TAGS:
            return
        index = next((index for index in range(len(self.stack) - 1, -1, -1) if self.stack[index]['tag'] == tag), None)
        if index is not None:
            while len(self.stack) > index:
                self.close_node(self.stack.pop())
        if tag in {'script', 'style', 'pre', 'code'} and self.inert_depth:
            self.inert_depth -= 1

    def finish(self):
        for index in range(0, len(self.card_faces) - 1, 2):
            front, back = self.card_faces[index:index + 2]
            self.cards.append({'file': self.path, 'line': front['line'], 'question': front['text'], 'answer': back['text'], 'pair_valid': not front['back'] and back['back']})


def chapters_notions(source):
    found = re.search(r'<h[1-6]\b[^>]*>[^<]*(?:notions?\s+à\s+conna[iî]tre)[^<]*</h[1-6]>\s*<(ol|ul)\b[^>]*>(.*?)</\1>', source, re.I | re.S)
    if not found:
        return None
    return [visible_text(item) for item in re.findall(r'<li\b[^>]*>(.*?)</li>', found.group(2), re.I | re.S)]


def source_cards(path, source):
    cards = []
    pattern = re.compile(r'<div class="fc__face"[^>]*><b>Question</b>(.*?)</div><div class="fc__face fc__back"[^>]*><b>Réponse</b>(.*?)</div>', re.I)
    for line_number, line in enumerate(source.splitlines(), 1):
        match = pattern.search(line)
        if not match:
            continue
        parts = []
        for part in match.groups():
            part = re.sub(r'<(title|link)(?:\s[^>]*)?>', lambda value: html.escape(value.group()), part, flags=re.I)
            parts.append(visible_text(part))
        cards.append({'file': path, 'line': line_number, 'question': parts[0], 'answer': parts[1], 'pair_valid': True})
    return cards


def git_batch(ref, paths):
    process = subprocess.run(['git', 'cat-file', '--batch'], cwd=ROOT, input=''.join(f'{ref}:{path}\n' for path in paths).encode(), stdout=subprocess.PIPE, check=True)
    raw = process.stdout
    offset = 0
    result = {}
    for path in paths:
        end = raw.index(b'\n', offset)
        header = raw[offset:end].decode('utf-8', 'replace')
        offset = end + 1
        if header.endswith(' missing'):
            continue
        size = int(header.rsplit(' ', 1)[1])
        result[path] = raw[offset:offset + size].decode('utf-8', 'replace')
        offset += size + 1
    return result


def is_public(path, course_names):
    parts = Path(path).parts
    if len(parts) == 1:
        return True
    if parts[0] in course_names:
        return parts[-1] in {'index.html', 'sommaire.html', 'chapitre1.html'} and not path.startswith(('preparation-web/', 'epreuves/'))
    return path.startswith(('public/', '_auth/'))


def write_csv(path, rows, fields):
    with path.open('w', newline='', encoding='utf-8') as output:
        writer = csv.DictWriter(output, fieldnames=fields, extrasaction='ignore')
        writer.writeheader()
        writer.writerows(rows)


def check_links(docs, existing):
    missing = []
    anchors_missing = []
    checked = 0
    dynamic = 0
    for source_path, document in docs.items():
        for link in document.links:
            href = link['href']
            parsed = urlsplit(href)
            if parsed.scheme not in ('', 'http', 'https') or href.startswith('//'):
                continue
            if parsed.netloc and parsed.netloc.lower() not in {'revi-mu.vercel.app', 'www.revi-mu.vercel.app'}:
                continue
            url_path = unquote(parsed.path)
            if url_path.startswith('/api/') or url_path.startswith('/_vercel/'):
                dynamic += 1
                continue
            if not url_path:
                target = source_path
            elif url_path.startswith('/'):
                target = os.path.normpath(url_path.lstrip('/'))
            else:
                target = os.path.normpath(os.path.join(os.path.dirname(source_path), url_path))
            if target.startswith('_auth/'):
                target = 'public/' + target[len('_auth/'):]
            if target in {'.', ''}:
                target = 'index.html'
            if target not in existing and target + '/index.html' in existing:
                target += '/index.html'
            checked += 1
            if target not in existing:
                missing.append({**link, 'target': target})
            elif parsed.fragment and target in docs:
                fragment = unquote(parsed.fragment)
                if fragment and fragment not in docs[target].identifiers:
                    anchors_missing.append({**link, 'target': target, 'fragment': fragment})
    return checked, dynamic, missing, anchors_missing


def main():
    registry = json.loads(subprocess.check_output(['node', '-e', "console.log(JSON.stringify(require('./server/courses').COURSES))"], cwd=ROOT))
    tracked = subprocess.check_output(['git', 'ls-files', '-z'], cwd=ROOT).decode().split('\0')
    tracked = sorted(path for path in tracked if path)
    html_paths = [path for path in tracked if path.lower().endswith('.html') and (ROOT / path).is_file() and not path.startswith(('audit/', 'design-audit/', 'tests/', 'node_modules/'))]
    public_paths = [path for path in html_paths if is_public(path, registry)]
    chapter_paths = [path for path in html_paths if re.search(r'/chapitres/chapitre\d+\.html$', path)]
    baseline = git_batch('main', chapter_paths + public_paths)
    docs = {}
    current_words = set()
    previous_words = set()
    notions_comparisons = []
    regressions = []
    corruptions = []
    tu_matches = []
    all_cards = []
    all_questions = []
    all_bands = []
    unknown = []
    images_no_alt = []
    buttons_no_label = []
    bad_h1 = []
    word_pattern = re.compile(r"[^\W\d_]+(?:[’'][^\W\d_]+)*", re.UNICODE)
    bad_pattern = re.compile(r'requ[êe]vos|\b[êé]vos\b|affichezz|\b(?:vous\s+dois|il\s+indiquez|il\s+analysez)\b|méthodique(?:pour|dans|et|pur)', re.I)
    informal_pattern = re.compile(r'\b(?:tu|toi|ton|ta|tes|tien|tienne|tiens|tiennes|tutoiement)\b', re.I)
    for path in html_paths:
        source = (ROOT / path).read_text(encoding='utf-8', errors='replace')
        document = Inspect(path)
        document.feed(source)
        document.finish()
        docs[path] = document
        unknown.extend(document.unknown)
        images_no_alt.extend(document.images_no_alt)
        buttons_no_label.extend(button for button in document.buttons if not button['text'] and not button['label'] and not button['title'])
        h1 = [heading for heading in document.headings if heading['level'] == 1]
        if len(h1) != 1:
            bad_h1.append({'file': path, 'count': len(h1), 'lines': ','.join(str(item['line']) for item in h1)})
        all_cards.extend(document.cards)
        parsed_lines = {card['line'] for card in document.cards}
        all_cards.extend(card for card in source_cards(path, source) if card['line'] not in parsed_lines)
        all_questions.extend(document.questions)
        if document.bands:
            all_bands.append({'file': path, 'rows': document.bands})
        for line_number, line in enumerate(source.splitlines(), 1):
            if bad_pattern.search(line):
                corruptions.append({'file': path, 'line': line_number, 'match': bad_pattern.search(line).group()})
            if path in public_paths and informal_pattern.search(line) and not re.search(r'<(?:script|style|code|pre)\b', line, re.I):
                match = informal_pattern.search(line)
                tu_matches.append({'file': path, 'line': line_number, 'match': match.group(), 'excerpt': collapse(re.sub(r'<[^>]+>', ' ', line))[:180]})
        if path in public_paths:
            current_words.update(word.casefold() for word in word_pattern.findall(visible_text(source)))
            if path in baseline:
                previous_words.update(word.casefold() for word in word_pattern.findall(visible_text(baseline[path])))
        if path in chapter_paths and path in baseline:
            old_notions = chapters_notions(baseline[path])
            new_notions = chapters_notions(source)
            if old_notions is not None and new_notions is not None:
                remaining = collections.Counter(normalize(item) for item in new_notions)
                lost = []
                for item in old_notions:
                    key = normalize(item)
                    if remaining[key] > 0:
                        remaining[key] -= 1
                    else:
                        nearest = difflib.get_close_matches(key, [normalize(value) for value in new_notions], n=1, cutoff=0.5)
                        lost.append({'notion': item, 'closest_normalized': nearest[0] if nearest else ''})
                notions_comparisons.append({'file': path, 'before': len(old_notions), 'after': len(new_notions), 'lost_exact': lost})
            old_main = re.search(r'<main\b[^>]*>(.*?)</main>', baseline[path], re.I | re.S)
            new_main = re.search(r'<main\b[^>]*>(.*?)</main>', source, re.I | re.S)
            if old_main and new_main:
                old_count = len(word_pattern.findall(visible_text(old_main.group(1))))
                new_count = len(word_pattern.findall(visible_text(new_main.group(1))))
                if old_count and new_count < old_count * 0.85:
                    regressions.append({'file': path, 'main_words': old_count, 'current_words': new_count, 'loss_percent': round((old_count - new_count) * 100 / old_count, 1)})
    checked, dynamic, missing, missing_anchors = check_links(docs, set(tracked))
    duplicates = []
    grouped_cards = collections.defaultdict(list)
    tautologies = []
    truncated = []
    for card in all_cards:
        key = (card['file'].split('/')[0], normalize(card['question']), normalize(card['answer']))
        grouped_cards[key].append(card)
        question_core = re.sub(r"^(qu['’]est[- ]ce que|que signifie|qu['’]appelle[- ]t[- ]on)\s*", '', card['question'], flags=re.I).strip(' «»?')
        if normalize(question_core) and normalize(question_core) == normalize(card['answer']):
            tautologies.append(card)
        if re.search(r'(?:\.\.\.|…|\b(?:et|ou|de|du|des|à|le|la|les))\s*$', card['answer'], re.I):
            truncated.append(card)
    for copies in grouped_cards.values():
        if len(copies) > 1:
            duplicates.extend(copies)
    invalid_questions = [question for question in all_questions if question['options'] and sum(option['correct'] for option in question['options']) != 1]
    sample = {'seed': SEED, 'public_pages_60': RNG.sample(public_paths, min(60, len(public_paths))), 'cards_100': RNG.sample(all_cards, min(100, len(all_cards))), 'families': {}}
    exercises = json.loads(subprocess.check_output(['node', '-e', "console.log(JSON.stringify(require('./server/exercises').listExercises().map(({id,chapter,language,title,course})=>({id,chapter,language,title,course}))))"], cwd=ROOT))
    for family, family_courses in FAMILIES.items():
        available = sorted(course for course in family_courses if any(path.startswith(course + '/chapitres/chapitre1.html') for path in html_paths))
        selected = RNG.choice(available) if available else None
        other_chapters = sorted(path for path in chapter_paths if selected and path.startswith(selected + '/') and not path.endswith('/chapitre1.html'))
        questions = [question for question in all_questions if question['file'].split('/')[0] in family_courses]
        cards = [card for card in all_cards if card['file'].split('/')[0] in family_courses]
        family_exercises = [exercise for exercise in exercises if exercise['course'] in family_courses]
        sample['families'][family] = {'course': selected, 'chapter1': f'{selected}/chapitres/chapitre1.html' if selected else None, 'random_chapter': RNG.choice(other_chapters) if other_chapters else None, 'exercises_20': RNG.sample(family_exercises, min(20, len(family_exercises))), 'questions_10': RNG.sample(questions, min(10, len(questions))), 'cards_10': RNG.sample(cards, min(10, len(cards))), 'population': {'courses_with_chapter1': len(available), 'exercises': len(family_exercises), 'questions': len(questions), 'cards': len(cards)}}
    summary = {'seed': SEED, 'registry': len(registry), 'tracked_html': len(html_paths), 'public_html_candidate': len(public_paths), 'chapter_html': len(chapter_paths), 'chapter_comparable_main': sum(path in baseline for path in chapter_paths), 'notion_sections_comparable_main': len(notions_comparisons), 'notions_exact_unmatched': sum(len(row['lost_exact']) for row in notions_comparisons), 'chapters_with_exact_unmatched_notions': sum(bool(row['lost_exact']) for row in notions_comparisons), 'chapters_word_loss_gt15': len(regressions), 'cards_extracted': len(all_cards), 'card_tautology_candidates': len(tautologies), 'card_duplicate_instances': len(duplicates), 'card_truncation_candidates': len(truncated), 'questions_extracted': len(all_questions), 'questions_zero_or_multiple_correct': len(invalid_questions), 'pages_with_bands': len(all_bands), 'pages_with_four_bands': sum(len(item['rows']) == 4 for item in all_bands), 'links_checked': checked, 'links_dynamic_unchecked': dynamic, 'links_missing_targets_candidates': len(missing), 'links_missing_fragments_candidates': len(missing_anchors), 'unknown_tags_candidates': len(unknown), 'images_missing_alt': len(images_no_alt), 'buttons_without_text_label_title': len(buttons_no_label), 'pages_h1_count_not_one': len(bad_h1), 'known_corruption_candidates': len(corruptions), 'public_pronoun_candidates': len(tu_matches), 'new_public_vocabulary_count': len(current_words - previous_words), 'exercise_count': len(exercises), 'exercise_courses': len({item['course'] for item in exercises})}
    data = {'summary': summary, 'notions': notions_comparisons, 'word_regressions': regressions, 'cards': all_cards, 'card_tautology_candidates': tautologies, 'card_duplicate_instances': duplicates, 'card_truncation_candidates': truncated, 'questions': all_questions, 'invalid_questions': invalid_questions, 'bands': all_bands, 'unknown_tags': unknown, 'images_no_alt': images_no_alt, 'buttons_no_label': buttons_no_label, 'h1_not_one': bad_h1, 'links_missing': missing, 'anchors_missing': missing_anchors, 'corruption': corruptions, 'informal_pronouns': tu_matches, 'public_pages': public_paths}
    (OUT / 'resultats-automatiques.json').write_text(json.dumps(data, ensure_ascii=False, indent=2), encoding='utf-8')
    (OUT / 'echantillons.json').write_text(json.dumps(sample, ensure_ascii=False, indent=2), encoding='utf-8')
    write_csv(OUT / 'regressions-longueur-candidates.csv', regressions, ['file', 'main_words', 'current_words', 'loss_percent'])
    write_csv(OUT / 'liens-candidats.csv', missing + missing_anchors, ['file', 'line', 'href', 'target', 'fragment'])
    words = sorted(current_words - previous_words)
    dictionary = next(iter(Path('/home/rd/.local/share/flatpak').glob('runtime/org.freedesktop.Platform.Locale/x86_64/*/*/files/*/share/*/hunspell/fr.dic')), None)
    if dictionary and dictionary.with_suffix('.aff').exists():
        result = subprocess.run(['hunspell', '-d', str(dictionary.with_suffix('')), '-i', 'UTF-8', '-l'], input='\n'.join(sorted(current_words)) + '\n', text=True, stdout=subprocess.PIPE, stderr=subprocess.PIPE)
        unknown_words = result.stdout.splitlines() if result.returncode == 0 else []
        write_csv(OUT / 'orthographe-candidats.csv', [{'mot': word, 'nouveau_depuis_main': word in words, 'relecture_humaine': 'non effectuée'} for word in unknown_words], ['mot', 'nouveau_depuis_main', 'relecture_humaine'])
        summary['hunspell_dictionary'] = str(dictionary)
        summary['hunspell_exit'] = result.returncode
        summary['hunspell_unknown_public_words'] = len(unknown_words)
        summary['hunspell_unknown_new_words'] = sum(word in words for word in unknown_words)
        (OUT / 'resultats-automatiques.json').write_text(json.dumps(data, ensure_ascii=False, indent=2), encoding='utf-8')
    print(json.dumps(summary, ensure_ascii=False, indent=2))


if __name__ == '__main__':
    main()

import json
from pathlib import Path

from extraction_fondamentaux import ChapterText, DESTINATION, ROOT


def main():
    selection = json.loads((ROOT / 'verification' / 'echantillons-identifiants.json').read_text(encoding='utf-8'))
    DESTINATION.mkdir(exist_ok=True)
    for family in selection['families'].values():
        for key in ('chapter1', 'random_chapter'):
            chapter = ROOT / family[key]
            parser = ChapterText()
            parser.feed(chapter.read_text(encoding='utf-8'))
            if not parser.paragraphs:
                raise ValueError(f'Aucun texte principal extrait : {chapter}')
            target = DESTINATION / f'{family["course"]}-{chapter.stem}.txt'
            target.write_text('\n'.join(parser.paragraphs) + '\n', encoding='utf-8')
    print(f'{2 * len(selection["families"])} chapitres sélectionnés extraits dans {DESTINATION}')


if __name__ == '__main__':
    main()

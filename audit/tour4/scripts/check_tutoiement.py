#!/usr/bin/env python3
import sys, re, glob, os
from bs4 import BeautifulSoup

ROOT = sys.argv[1]

PRONOUN_PAT = re.compile(
    r"(?<![a-zA-ZÀ-ÿ])(?:[Tt]u|[Tt]es|[Tt]oi|[Tt]['’](?=[a-zà-ÿ])|(?<![Ll]e\s)(?<![Uu]n\s)(?<![Cc]e\s)(?<![Dd]u\s)(?<![Aa]u\s)(?<![Dd]e\s)[Tt]on(?!(?:[\s-]+(?:interrogatif|neutre|professionnel|courtois|assertif|direct|calme|formel|informel|casual|sec|diplomatique|adapté|juste|de\s+l|du\s+message|d['’])))(?=\s+[a-zà-ÿ])|[Tt]a(?=\s+[a-zà-ÿ]))(?![a-zA-ZÀ-ÿ])"
)

IMPERATIVE_TU_VERBS = (
    r"Clique|Reviens|Prends|Demande(?=\s+(?:un|une)\b)|Utilise|Vérifie|Choisis|Complète(?=\s+(?:la|le|les|chaque|ce|cette|ces|un|une)\b)|"
    r"Calcule|Affiche|Écris|Lis|"
    r"Reprends|Refais|Retravaille|Passe(?!\s+(?:de\s+calcul|avant|après|par|en\s+paramètre|à\s+1|à\s+0|au\s+tour|seulement))|"
    r"Crée|Modifie|Ajoute|Supprime|Teste|Observe|"
    r"Décompose|Définis|Identifie|Compare|Remplace|Retourne|Parcours(?=\s+(?:le|la|les|l['’]|chaque|ce|cette|ces|tout|tous)\b)|"
    r"Initialise|Convertis|Trie|Filtre(?!\s+de\s+groupe\b)|Exécute|Lance|Ouvre|Ferme|Tape|Saisis|"
    r"Entre(?!\s+(?:\d|les\b|deux\b|un\b|une\b|le\b|la\b))|"
    r"Pense|Garde(?!-fous?\b)|Note(?!\s+(?:pour\b|de\b))|Retiens|Mémorise|Imagine|Suppose|Considère|Rappelle-toi|"
    r"Assure-toi|Méfie-toi|Souviens-toi|Sers-toi|Demande-toi|Pose-toi|Entraîne-toi|entraine-toi|"
    r"Découpe|Extrais|Construis|construis|Appelle|Fais-les|Consulte(?!\s+son\b)|Réserve(?!\s+(?:Slack\b|de\b|obligatoire\b))"
)
HYPHENATED_IMPERATIVES = (
    r"exécute-le|exécute-la|exécute-les|programme-le|programme-la|teste-le|teste-la|modifie-le|modifie-la|casse-le|casse-la|donne-lui|"
    r"vérifie-la|vérifie-le|affiche-le|affiche-la|relis-les|compte-les|utilise-la|utilise-le|"
    r"corrige-toi|entraine-toi|entraîne-toi|rappelle-toi|assure-toi|méfie-toi|souviens-toi|sers-toi|demande-toi|pose-toi"
)
IMPERATIVE_PAT = re.compile(
    rf"(?:(?:^|[.!?…;•]\s+|(?:\b\d+\.\s+)|(?:< 50 %|50–69 %|70–89 %|70–94 %|90–94 %|≥ 95 %|Objectif|Consigne|Indice|Remède|Conseil)\s*[—–:-]\s*)({IMPERATIVE_TU_VERBS})(?!\s*:)\b|\b({HYPHENATED_IMPERATIVES})\b)"
)

VOUVOIEMENT_PAT = re.compile(r"\b(?:vous|votre|vos)\b", re.I)

EXCEPTIONS = [
    ("b1-fr-pro/chapitres/chapitre6.html", "je, tu, nous, vous"),
]

def is_exception(rel_path, snippet):
    for ex_path, ex_str in EXCEPTIONS:
        if rel_path.endswith(ex_path) and ex_str in snippet.lower():
            return True
    return False

def visible_text_blocks(html):
    soup = BeautifulSoup(html, "html.parser")
    for tag in soup(["script", "style", "pre", "svg", "button", "th"]):
        tag.decompose()
    for code_tag in soup.find_all("code"):
        code_tag.replace_with("CODE_TOKEN")
    blocks = []
    for el in soup.find_all(["p", "li", "summary", "div", "h1", "h2", "h3", "h4", "span"]):
        if el.name in ("div", "span") and el.find(["p", "li", "div", "table"]):
            continue
        txt = re.sub(r"\s+", " ", el.get_text(" ", strip=True)).strip()
        if txt:
            blocks.append(txt)
    return blocks

pages_with_tu_pronoun = 0
pages_with_tu_imperative = 0
pages_mixed = 0
total_tu_occurrences = 0

for p in sorted(glob.glob(os.path.join(ROOT, "*/*.html")) + glob.glob(os.path.join(ROOT, "*/chapitres/*.html")) + glob.glob(os.path.join(ROOT, "*/exercices/*.html"))):
    rel = os.path.relpath(p, ROOT)
    if rel.startswith(("audit/", "dist/", "node_modules/", "_auth/", "revi-cours-html/", "roadmap/")):
        continue
    html = open(p, encoding="utf-8", errors="ignore").read()
    blocks = visible_text_blocks(html)
    pronoun_hits = []
    imp_hits = []
    vous_hits = 0
    for b in blocks:
        if is_exception(rel, b):
            continue
        vous_hits += len(VOUVOIEMENT_PAT.findall(b))
        for m in PRONOUN_PAT.finditer(b):
            pronoun_hits.append((m.group(0), b[:90]))
        for m in IMPERATIVE_PAT.finditer(b):
            imp_hits.append((m.group(1) or m.group(2), b[:90]))

    if pronoun_hits:
        pages_with_tu_pronoun += 1
    if imp_hits:
        pages_with_tu_imperative += 1
    if (pronoun_hits or imp_hits) and vous_hits > 0:
        pages_mixed += 1
    if pronoun_hits or imp_hits:
        n_occ = len(pronoun_hits) + len(imp_hits)
        total_tu_occurrences += n_occ
        sample = (pronoun_hits + imp_hits)[:2]
        print(f"{rel}: {len(pronoun_hits)} pronom(s) tu, {len(imp_hits)} impératif(s) tu -> {sample}")

print(f"Pages avec pronoms de tutoiement: {pages_with_tu_pronoun}  (attendu: 0)")
print(f"Pages avec impératifs de tutoiement: {pages_with_tu_imperative}  (attendu: 0)")
print(f"Pages mêlant tu (pronom/impératif) et vous: {pages_mixed}  (attendu: 0)")
print(f"TOTAL occurrences tutoiement (pronoms + impératifs): {total_tu_occurrences}  (attendu: 0)")
sys.exit(1 if total_tu_occurrences else 0)

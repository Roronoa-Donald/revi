#!/usr/bin/env python3
"""Inventaire en LECTURE SEULE des cours de la plateforme (audit pédagogique).
Ne modifie aucun fichier de cours. Écrit uniquement dans audit/pedagogique/."""
import os, re, json, subprocess, html
ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), '..', '..', '..'))
# registre canonique : extraction via node
js = "const c=require('./server/courses.js');console.log(JSON.stringify(Object.entries(c.COURSES).map(([id,v])=>({id,name:v.name,level:v.level}))))"
courses = json.loads(subprocess.check_output(['node','-e',js],cwd=ROOT))

def strip(t):
    t = re.sub(r'(?is)<(script|style).*?</\1>', ' ', t)
    t = re.sub(r'(?s)<[^>]+>', ' ', t)
    return re.sub(r'\s+', ' ', html.unescape(t)).strip()

def words(p):
    try: return len(strip(open(p,encoding='utf-8',errors='replace').read()).split())
    except Exception: return 0

out=[]
for c in courses:
    d = os.path.join(ROOT, c['id'])
    row = dict(c); row['dir_exists']=os.path.isdir(d)
    files=[]
    if row['dir_exists']:
        for dp,dn,fn in os.walk(d):
            if 'node_modules' in dp or '/assets/vendor' in dp: continue
            for f in fn: files.append(os.path.relpath(os.path.join(dp,f),ROOT))
    htmls=[f for f in files if f.endswith('.html')]
    chap=[f for f in htmls if re.search(r'chapitre\d+\.html$',f)]
    row['n_files']=len(files); row['n_html']=len(htmls)
    row['chapters']=sorted(chap)
    row['n_chapters']=len(chap)
    row['words_total']=sum(words(os.path.join(ROOT,f)) for f in htmls)
    row['words_chapters']={os.path.basename(f):words(os.path.join(ROOT,f)) for f in sorted(chap)}
    row['other_pages']=sorted(os.path.relpath(f,c['id']) for f in htmls if f not in chap)
    row['ref_docs_in_folder']=sorted(f for f in files if re.search(r'\.(pdf|docx?|pptx?|xlsx?|txt|zip)$',f,re.I))
    # exercices catalogue
    for cand in (f"server/exercises/{c['id']}.js", f"server/exercises/{c['id']}"):
        p=os.path.join(ROOT,cand)
        if os.path.exists(p):
            row.setdefault('exercise_src',[]).append(cand)
    out.append(row)
json.dump(out, open(os.path.join(ROOT,'audit/pedagogique/_outils/inventaire-brut.json'),'w'), ensure_ascii=False, indent=1)
print(f"{'id':26}{'lvl':4}{'dir':4}{'html':5}{'chap':5}{'words':7} other_pages")
for r in out:
    print(f"{r['id'][:25]:26}{r['level']:4}{'Y' if r['dir_exists'] else 'N':4}{r['n_html']:<5}{r['n_chapters']:<5}{r['words_total']:<7} {','.join(r['other_pages'])[:80]}")
print(len(out),'entrées registre')

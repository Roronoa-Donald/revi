#!/usr/bin/env python3
"""Métriques objectives (lecture seule) par cours et par chapitre : mots, h2, boîtes pédagogiques, code, QCM, corrections repliables, ateliers."""
import os,re,json,html,collections,subprocess
ROOT=os.path.abspath(os.path.join(os.path.dirname(__file__),'..','..','..'))
reg=json.load(open(os.path.join(ROOT,'audit/pedagogique/_outils/inventaire-brut.json')))
def txt(t):
    t=re.sub(r'(?is)<(script|style|svg|nav).*?</\1>',' ',t); t=re.sub(r'(?s)<[^>]+>',' ',t); return re.sub(r'\s+',' ',html.unescape(t)).strip()
out={}
sent_index=collections.defaultdict(set)
for c in reg:
    d=os.path.join(ROOT,c['id']); res={'level':c['level'],'name':c['name'],'chapitres':{}}
    for f in c['chapters']:
        raw=open(os.path.join(ROOT,f),encoding='utf-8',errors='replace').read()
        main=raw
        t=txt(main)
        boxes=collections.Counter(re.findall(r'class="box box--([a-z0-9-]+)"',raw))
        m={'mots':len(t.split()),'h2':len(re.findall(r'<h2[ >]',raw)),'h3':len(re.findall(r'<h3[ >]',raw)),
           'pre_code':len(re.findall(r'<pre',raw)),'tables':len(re.findall(r'<table',raw)),
           'qcm_correct_marks':len(re.findall(r'data-correct',raw)),'details':len(re.findall(r'<details',raw)),
           'labs':len(re.findall(r'data-lab',raw)),'boxes':dict(boxes),'svg_diagrams':len(re.findall(r'<svg(?![^>]*class="ic")',raw)),'img':len(re.findall(r'<img',raw))}
        res['chapitres'][os.path.basename(f)]=m
        for s in re.split(r'(?<=[.!?])\s+',t):
            if len(s.split())>=14: sent_index[s.strip()].add(c['id'])
    out[c['id']]=res
dups=[(s,sorted(ids)) for s,ids in sent_index.items() if len(ids)>=2]
dups.sort(key=lambda x:-len(x[1]))
json.dump(out,open(os.path.join(ROOT,'audit/pedagogique/_outils/metriques-structure.json'),'w'),ensure_ascii=False,indent=1)
json.dump([{'phrase':s,'cours':ids} for s,ids in dups[:300]],open(os.path.join(ROOT,'audit/pedagogique/_outils/phrases-dupliquees-entre-cours.json'),'w'),ensure_ascii=False,indent=1)
print('cours avec chapitres:',sum(1 for v in out.values() if v['chapitres']))
print('phrases >=14 mots présentes dans >=2 cours:',len(dups))
for s,ids in dups[:15]: print(len(ids),ids[:4],s[:140])
# uniformité des boîtes
box_sets=collections.Counter()
for k,v in out.items():
    for ch,m in v['chapitres'].items(): box_sets[tuple(sorted(m['boxes']))]+=1
print('Combinaisons de types de boîtes (top 5):')
for b,n in box_sets.most_common(5): print(n,b)

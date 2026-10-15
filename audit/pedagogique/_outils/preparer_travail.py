#!/usr/bin/env python3
"""Prépare, HORS DÉPÔT, un dossier de lecture par cours (pages en texte balisé avec n° de ligne source,
dump du catalogue d'exercices). LECTURE SEULE sur le dépôt."""
import os, re, sys, json, subprocess, html
from html.parser import HTMLParser
ROOT='/home/rd/Desktop/proba'; OUT=sys.argv[1]
class P(HTMLParser):
    BLOCK={'h1','h2','h3','h4','p','li','pre','tr','summary','figcaption','blockquote'}
    def __init__(s):
        super().__init__(convert_charrefs=True); s.o=[]; s.skip=0; s.inmain=False; s.pre=False; s.stack=[]; s.cur=None; s.cell=[]
    def emit(s,t): s.o.append(t)
    def handle_starttag(s,tag,a):
        a=dict(a); ln=s.getpos()[0]
        if tag in('script','style','svg','nav','head'): s.skip+=1; return
        if s.skip: return
        cls=a.get('class','')
        if tag in('h1','h2','h3','h4'): s.emit(f"\n[L{ln}] "+'#'*int(tag[1])+' ')
        elif tag=='pre': s.pre=True; s.emit(f"\n[L{ln}] ```\n")
        elif tag=='li': s.emit(f"\n[L{ln}] - ")
        elif tag=='p': s.emit(f"\n[L{ln}] ")
        elif tag=='tr': s.emit(f"\n[L{ln}] | ")
        elif tag in('td','th'): s.emit(' ')
        elif tag=='summary': s.emit(f"\n[L{ln}] <details> ▶ ")
        elif tag=='br': s.emit('\n')
        elif tag=='div' and 'box' in cls.split():
            s.emit(f"\n[L{ln}] ┌ BOX({cls.replace('box ','')}) ")
        elif tag=='div' and ('qcm' in cls or 'item' in cls.split() or 'lab' in cls.split()): s.emit(f"\n[L{ln}] ┌ {cls}")
        if 'data-correct' in a: s.emit(f" ⟦data-correct={a['data-correct']}⟧")
        if tag=='input' or tag=='button' : pass
        if tag=='li' and 'data-correct' in a: pass
        if 'data-lab' in a: s.emit(f"\n[L{ln}] ┌ ATELIER-DE-CODE data-lab={a.get('data-lab')} {a.get('data-exercise','')}")
        for k in('data-exercise','data-exercise-id','data-ex'):
            if k in a: s.emit(f" ⟦{k}={a[k]}⟧")
    def handle_endtag(s,tag):
        if tag in('script','style','svg','nav','head'): s.skip=max(0,s.skip-1); return
        if s.skip: return
        if tag=='pre': s.pre=False; s.emit("\n```")
        if tag in('td','th'): s.emit(' |')
    def handle_data(s,d):
        if s.skip: return
        if s.pre: s.emit(d)
        else:
            d=re.sub(r'\s+',' ',d)
            if d.strip(): s.emit(d)
def conv(path):
    p=P(); p.feed(open(path,encoding='utf-8',errors='replace').read())
    t=''.join(p.o); t=re.sub(r'\n{3,}','\n\n',t); return t
reg=json.loads(subprocess.check_output(['node','-e',"const c=require('./server/courses.js');console.log(JSON.stringify(Object.entries(c.COURSES).map(([id,v])=>({id,name:v.name,level:v.level}))))"],cwd=ROOT))
# exercices
dump=subprocess.check_output(['node','-e',r"""
const ex=require('./server/exercises/index.js').listExercises();
const strip=h=>String(h||'').replace(/<[^>]+>/g,' ').replace(/&lt;/g,'<').replace(/&gt;/g,'>').replace(/&amp;/g,'&').replace(/\s+/g,' ').trim();
const by={};for(const e of ex){(by[e.course]=by[e.course]||[]).push(e)}
console.log(JSON.stringify(Object.fromEntries(Object.entries(by).map(([c,l])=>[c,l.map(e=>({id:e.id,chapter:e.chapter,level:e.level,language:e.language,title:e.title,goal:e.goal,brief:strip(e.brief),starter:e.starter,hints:e.hints,examples:e.examples,tests:e.tests,solution:e.solution}))]))))
"""],cwd=ROOT,maxsize=None) if False else subprocess.run(['node','-e',r"""
const ex=require('./server/exercises/index.js').listExercises();
const strip=h=>String(h||'').replace(/<[^>]+>/g,' ').replace(/&lt;/g,'<').replace(/&gt;/g,'>').replace(/&amp;/g,'&').replace(/\s+/g,' ').trim();
const by={};for(const e of ex){(by[e.course]=by[e.course]||[]).push(e)}
console.log(JSON.stringify(Object.fromEntries(Object.entries(by).map(([c,l])=>[c,l.map(e=>({id:e.id,chapter:e.chapter,level:e.level,language:e.language,title:e.title,goal:e.goal,brief:strip(e.brief),starter:e.starter,hints:e.hints,examples:e.examples,tests:e.tests,solution:e.solution}))]))))
"""],cwd=ROOT,capture_output=True)
exs=json.loads(dump.stdout) if dump.returncode==0 else {}
if dump.returncode: print('ERR exercises',dump.stderr[:300])
stats=[]
for c in reg:
    cid=c['id']; d=os.path.join(ROOT,cid); od=os.path.join(OUT,cid.replace(' ','_')); os.makedirs(od+'/pages',exist_ok=True)
    n=0;w=0
    for dp,dn,fn in os.walk(d):
        if 'node_modules' in dp or '/assets' in dp: continue
        for f in sorted(fn):
            if not f.endswith('.html'): continue
            rel=os.path.relpath(os.path.join(dp,f),d); t=conv(os.path.join(dp,f))
            open(os.path.join(od,'pages',rel.replace('/','__')+'.txt'),'w').write(f"SOURCE: {cid}/{rel}\n"+t); n+=1; w+=len(t.split())
    el=exs.get(cid,[])
    with open(od+'/exercices.md','w') as fo:
        fo.write(f"# Exercices de code — {cid} ({len(el)} fiches) — SOURCE: server/exercises/ (tests cachés + corrigés: ne jamais citer hors rapport)\n")
        for e in el:
            fo.write(f"\n## {e['id']} | ch{e['chapter']} | niveau {e['level']} | {e['language']} | {e['title']}\n**But**: {e['goal']}\n**Énoncé**: {e['brief']}\n**Starter**:\n```\n{e['starter']}\n```\n**Indices**: {e['hints']}\n**Exemple visible**: {json.dumps(e['examples'],ensure_ascii=False)}\n**Tests cachés** ({len(e['tests'] or [])}): {json.dumps(e['tests'],ensure_ascii=False)}\n**Corrigé**:\n```\n{e['solution']}\n```\n")
    stats.append((cid,n,w,len(el)))
json.dump({s[0]:{'pages':s[1],'mots_texte':s[2],'exercices_code':s[3]} for s in stats},open(os.path.join(OUT,'stats.json'),'w'),ensure_ascii=False,indent=1)
for s in stats: print(s)

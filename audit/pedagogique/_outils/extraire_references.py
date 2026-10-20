#!/usr/bin/env python3
"""Extraction texte (LECTURE SEULE sur les sources) des documents de référence.
Sortie : un .txt par document + index.tsv dans le dossier de travail (hors dépôt)."""
import os, re, sys, zipfile, subprocess, hashlib, html
ROOT='/home/rd/Desktop/proba'
OUT=sys.argv[1]
SRC=['cours B1 IT','COURS_B3','probabilites','php','rd_winserver','RD-RO','assembleur','Cyber securite B2','epreuves',
     'cours windows','administration machine virtuel','droitb2','roadmap','b1','old_exam','uiux','docs','epreuves']
ROOTFILES=['UML 2.0.pdf','SUPPORT_CONCEPTION_MEDELISATION_SI.pdf','uml_content.txt','Epreuves_Groupées.pdf','Recueil_Epreuves_2024_2025.pdf']
EXT=('.pdf','.docx','.pptx','.txt','.md')
def xml_text(x):
    x=re.sub(r'</w:p>|</a:p>','\n',x); x=re.sub(r'<[^>]+>','',x); return html.unescape(x)
def extract(p):
    e=p.lower().rsplit('.',1)[-1]
    if e=='pdf':
        r=subprocess.run(['pdftotext','-layout',p,'-'],capture_output=True,timeout=120)
        t=r.stdout.decode('utf-8','replace')
        n=t.count('\f'); return t,f'{n} pages'
    if e=='docx':
        z=zipfile.ZipFile(p); t=xml_text(z.read('word/document.xml').decode('utf-8','replace')); return t,'docx'
    if e=='pptx':
        z=zipfile.ZipFile(p); names=sorted([n for n in z.namelist() if re.match(r'ppt/slides/slide\d+\.xml',n)],key=lambda n:int(re.findall(r'\d+',n)[0]))
        t='\n'.join(f'--- diapo {i+1} ---\n'+xml_text(z.read(n).decode('utf-8','replace')) for i,n in enumerate(names)); return t,f'{len(names)} diapos'
    return open(p,encoding='utf-8',errors='replace').read(),'texte'
files=[]
for s in SRC:
    d=os.path.join(ROOT,s)
    for dp,dn,fn in os.walk(d):
        if 'node_modules' in dp or '/assets' in dp: continue
        for f in fn:
            if f.startswith('~$') or not f.lower().endswith(EXT): continue
            if f.lower().endswith('.md') and not s in('docs',): continue
            files.append(os.path.join(dp,f))
for f in ROOTFILES: files.append(os.path.join(ROOT,f))
seen=set(); idx=[]
for p in sorted(set(files)):
    if not os.path.exists(p): continue
    rel=os.path.relpath(p,ROOT)
    try:
        t,meta=extract(p)
    except Exception as ex:
        idx.append((rel,'ERREUR',str(ex)[:60],0,'')); continue
    h=hashlib.md5(rel.encode()).hexdigest()[:8]
    name=re.sub(r'[^A-Za-z0-9]+','_',os.path.basename(p))[:50]+'_'+h+'.txt'
    open(os.path.join(OUT,name),'w',encoding='utf-8').write(t)
    idx.append((rel,name,meta,len(t.split()),hashlib.md5(open(p,'rb').read()).hexdigest()[:10]))
with open(os.path.join(OUT,'index.tsv'),'w',encoding='utf-8') as f:
    f.write('chemin_source\ttexte_extrait\tformat\tmots\tmd5\n')
    for r in idx: f.write('\t'.join(map(str,r))+'\n')
print(len(idx),'documents ;', sum(1 for r in idx if r[1]=='ERREUR'),'erreurs ;', sum(1 for r in idx if r[3]<30 and r[1]!='ERREUR'),'quasi-vides (PDF scannés ?)')

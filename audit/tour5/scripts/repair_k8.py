#!/usr/bin/env python3
"""Répare les conversions tu→vous fautives de K8 (commit 0687f34) dans les SOURCES.
Méthode : pour chaque ligne modifiée par K8, on compare ancien/nouveau texte mot à mot ; seules les
substitutions jugées fautives sont annulées ou corrigées, à l'endroit exact, jamais par remplacement global."""
import re,difflib,subprocess,csv,json,sys,os
REPO='/home/claude/c2/revi-cours-html'
PRE,K8='ee6b380','0687f34'
diff=subprocess.run(['git','diff','-U0',PRE,K8,'--','server','scripts'],cwd=REPO,capture_output=True,text=True).stdout
pairs=[];minus=[];plus=[];f=None
def flush():
    global minus,plus
    for i in range(min(len(minus),len(plus))): pairs.append((f,minus[i],plus[i]))
    minus=[];plus=[]
for l in diff.split('\n'):
    if l.startswith('+++ '): flush(); f=l[6:]
    elif l.startswith('@@'): flush()
    elif l.startswith('-') and not l.startswith('---'): minus.append(l[1:])
    elif l.startswith('+') and not l.startswith('+++'): plus.append(l[1:])
flush()
TOK=re.compile(r"[\wÀ-ÿ'’-]+|[^\w\sÀ-ÿ]")
def toks(s): return [(m.group(0),m.start(),m.end()) for m in TOK.finditer(s)]
# --- corrections de mots (forme vous correcte) ---
FIX={'possèdez':'possédez','énumèrez':'énumérez','gèrez':'gérez','protègez':'protégez','concatènez':'concaténez',
     'es-vous':'êtes-vous','as-vous':'avez-vous',"qu'as-vous":"qu'avez-vous","qu’as-vous":"qu’avez-vous",'arrête-vous':'arrêtez-vous','cyclez':None}
FIX_PHRASE={ 'vous cyclez une VM sans laisser de risque':'vous gérez le cycle de vie d’une VM sans laisser de risque' }
KEEP_IMPER_Q={'Définis','Tu écris'}   # questions d'exercice / réponses correctes à l'impératif ou 2e pers.
# --- conversions à annuler quel que soit le contexte (noms, prépositions, descriptions) ---
REVERT_TOKENS={'Entre','Note','Passe-partout','Garde-Fous',"'Passe-partout",'Entre'}
REVERT_BY_FILE=[ # (fragment de fichier, ancien mot, texte de contexte à retrouver dans la ligne nouvelle)
 ('b3-algo/chapitre4.js','Utilise','Utilisez une'),('b3-algo/chapitre4.js','Calcule','Calculez la distance minimale'),
 ('ccna/chapitre4.js','Utilise','Utilisez un hachage'),('b3-sql/chapitre3.js','Exécute','Exécutez réellement'),
 ('b3-supervision/chapitre4.js','Calcule','Calculez directement'),('b3-virtualisation/chapitre3.js','Utilise','Utilisez le réseau Ethernet'),
 ('docker/chapitre4.js','Crée','Créez une interface pont'),('csharp/chapitre1.js','Passe','Passez une référence'),
 ('b3-google-cloud/chapitre3.js','Exécute',"Exécutez n"),('b3-windows','Filtre','Filtrez WMI'),
]
def decide(f,o,n,flagged,ctx_new,otoks):
    ot=' '.join(otoks)
    if n in ('affichezz','affichezzr','affichezzz','affichezz'): return 'revert'
    if any(w in n.split() for w in ('affichezz','affichezzr','affichezzz')): return 'revert'
    for w in n.split():
        if w in FIX and FIX[w]: return ('fix',n.replace(w,FIX[w]))
    if 'cyclez' in n: return 'phrase'
    if ot in REVERT_TOKENS or ot.strip("'") in REVERT_TOKENS: return 'revert'
    for frag,old,ctx in REVERT_BY_FILE:
        if frag in f and ot.strip("'")==old and ctx in ctx_new: return 'revert'
    if flagged and ot.strip("'") not in KEEP_IMPER_Q and not ot.startswith('Tu '): return 'revert'
    return 'keep'
bare=json.load(open('/tmp/bare.json',encoding='utf-8'))
flagged_lines={(x[0],x[4][:150]) for x in bare if x[3]}
log=[];changes={}
for f,a,b in pairs:
    ta,tb=toks(a),toks(b)
    sm=difflib.SequenceMatcher(None,[t[0] for t in ta],[t[0] for t in tb],autojunk=False)
    flagged=(f,a.strip()[:150]) in flagged_lines
    ops=[]
    for op,i1,i2,j1,j2 in sm.get_opcodes():
        if op!='replace': continue
        o=[t[0] for t in ta[i1:i2]]; n=' '.join(t[0] for t in tb[j1:j2])
        if re.match(r"(?i)^(tu|t['’]|ton|ta|tes|toi)",o[0]) and 'cyclez' not in n and not any(w in FIX for w in n.split()): 
            # tu→vous : on ne touche que si le mot produit est fautif (traité plus haut)
            pass
        d=decide(f,' '.join(o),n,flagged and len(o)==1 and not o[0].lower().startswith('tu'),b,o)
        if d!='keep': ops.append((op,i1,i2,j1,j2,d,' '.join(o),n))
    if not ops: continue
    new=b
    for op,i1,i2,j1,j2,d,o,n in sorted(ops,key=lambda x:-x[3]):
        s,e=tb[j1][1],tb[j2-1][2]
        if d=='revert': rep=a[ta[i1][1]:ta[i2-1][2]]
        elif d=='phrase': rep=None
        else: rep=d[1]
        if rep is None: continue
        new=new[:s]+rep+new[e:]
        log.append((f,d if isinstance(d,str) else 'fix',o,n,rep))
    changes.setdefault(f,[]).append((b,new))
# application aux fichiers HEAD
applied=0;missing=[]
for f,lst in changes.items():
    p=os.path.join(REPO,f)
    if not os.path.exists(p): missing.append(f); continue
    txt=open(p,encoding='utf-8').read(); orig=txt
    for b,new in lst:
        if b in txt: txt=txt.replace(b,new); applied+=1
        else: missing.append((f,b[:80]))
    if txt!=orig: open(p,'w',encoding='utf-8').write(txt)
# phrases spéciales
for f,fixes in {'server/content/admin-vm/chapitre3.js':[('vous cyclez une VM sans laisser de risque','vous gérez le cycle de vie d’une VM sans laisser de risque')]}.items():
    p=os.path.join(REPO,f); t=open(p,encoding='utf-8').read()
    for a,b2 in fixes:
        if a in t: t=t.replace(a,b2); applied+=1
    open(p,'w',encoding='utf-8').write(t)
w=csv.writer(open('/home/claude/work/repair_k8_log.csv','w',newline='',encoding='utf-8'))
w.writerow(['fichier','action','avant(K8)','apres(K8)','restauré/corrigé'])
for r in log: w.writerow(r)
print("opérations:",len(log),"| lignes appliquées:",applied,"| non retrouvées dans HEAD:",len(missing))
for m in missing[:15]: print('  ',m)

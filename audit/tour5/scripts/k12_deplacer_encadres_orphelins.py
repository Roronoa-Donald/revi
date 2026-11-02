import re,os
os.chdir('/home/claude/c2/revi-cours-html/server/content')
CASES=[('b1-architecture/chapitres-1-3.js','Vue d’ensemble préalable : '),('b1-robotique/chapitres-1-3.js','Pont pédagogique : '),
('react/chapitre1.js','Prérequis intégré : Rappels JavaScript'),('b1-merise/chapitres-4-6.js','Repère autonome : '),
('probabilites/chapitre5.js','Prérequis intégré : Comprendre et calculer une intégrale'),('admin-vm/chapitre6.js','Continuité de Service')]
for f,prefix in CASES:
    t=open(f,encoding='utf-8').read()
    m=re.search(r'      \{\n        "title": "('+re.escape(prefix)+r'[^"\n]*)",\n        "html": ".*?"\n      \},?\n',t,flags=re.S)
    if not m: print('introuvable (déjà déplacé ?)',f); continue
    block=m.group(0); title=m.group(1)
    # le bloc doit être en tête du tableau sections
    head=t[:m.start()].rstrip()
    if not head.endswith('sections: ['): print('pas en tête, ignoré',f); continue
    t=t[:m.start()]+t[m.end():]
    new_title=re.sub(r'^(Vue d’ensemble préalable|Pont pédagogique|Prérequis intégré|Repère autonome) : ','Pour aller plus loin : ',title)
    block=block.replace(title,new_title,1).rstrip().rstrip(',')+'\n'
    # fin du tableau sections après la position retirée
    mm=re.compile(r'\n(?: {2}| {4})\],').search(t,m.start()); end=mm.start()
    t=t[:end]+',\n'+block.rstrip('\n')+t[end:]
    open(f,'w',encoding='utf-8').write(t)
    print('déplacé en fin de chapitre :',f,'|',new_title[:70])

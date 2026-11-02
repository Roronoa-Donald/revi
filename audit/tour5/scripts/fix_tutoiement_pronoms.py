import glob,os
os.chdir('/home/claude/c2/revi-cours-html')
files=glob.glob('server/**/*.js',recursive=True)+glob.glob('scripts/*.js')+[f for c in('b1-algo','b1-c-cpp','b1-php','b1-python') for f in glob.glob(c+'/**/*.html',recursive=True)]+['index.html']
P=[("On te confie","On vous confie"),("te laisse pour comprendre","vous laisse pour comprendre"),
 ("te remet vos notes","vous remet vos notes"),("te remet la liste","vous remet la liste"),
 ("pour te tester","pour vous tester"),("Ce chapitre te donne","Ce chapitre vous donne"),
 ("Votre chef te demande","Votre chef vous demande"),("Votre chef te dit","Votre chef vous dit"),
 ("« fais-en une","« faites-en une"),("te repérer dans Word","vous repérer dans Word"),
 ("te déplacer dans l’arborescence","vous déplacer dans l’arborescence"),("Il te faut","Il vous faut"),
 ("la trace te montre","la trace vous montre"),("Puis remonte :","Puis remontez :"),
 ("Le club te prête","Le club vous prête"),("du module te demande","du module vous demande"),
 ("une fonction de ton script","une fonction de votre script"),("Ce que tu observes","Ce que vous observez"),
 ("dépend aussi de ton travail","dépend aussi de votre travail"),("Le responsable pédagogique te remet","Le responsable pédagogique vous remet")]
cnt={}
for f in files:
    try: t=open(f,encoding='utf-8').read()
    except: continue
    o=t
    for a,b in P:
        c=t.count(a)
        if c: t=t.replace(a,b); cnt[a]=cnt.get(a,0)+c
    if t!=o: open(f,'w',encoding='utf-8').write(t)
for a,n in cnt.items(): print(f"{n:3d} × {a}")
print("non trouvés:",[a for a,b in P if a not in cnt])

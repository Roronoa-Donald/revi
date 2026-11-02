import re,glob,os
R=os.chdir('/home/claude/c2/revi-cours-html')
files=glob.glob('server/**/*.js',recursive=True)+glob.glob('scripts/*.js')+[f for c in('b1-algo','b1-c-cpp','b1-php','b1-python','b1-fr-pro','b1-prog-web') for f in glob.glob(c+'/**/*.html',recursive=True)]+['index.html']
FIX=[ # (exact avant, exact après, nb attendu mini)
 ("Sinon, affichezz","Sinon, affiche"),
 ("Vous connais déjà","Vous connaissez déjà"),
 ("Si vous te demandes","Si vous vous demandez"),
 ("même quand vous ne l’écris pas","même quand vous ne l’écrivez pas"),
 ("Si vous ne dois en garder qu’une, garde celle du serveur","Si vous ne devez en garder qu’une, gardez celle du serveur"),
 ("vous ré-échapperas","vous ré-échapperez"),("vous réutiliseras","vous réutiliserez"),
 ("puis vous le valides","puis vous le validez"),
 ("vous dimensionnez et connectes","vous dimensionnez et connectez"),
 ("vous protègez et déploies","vous protégez et déployez"),("vous protégez et déploies","vous protégez et déployez"),
 ("vous écrivez et attrapes","vous écrivez et attrapez"),("vous lisez et affiches","vous lisez et affichez"),
 ("vous cloisonnez et diagnostiques","vous cloisonnez et diagnostiquez"),
 ("votre de voix","ton de voix"),
 ("qu\\'as-vous","qu\\'avez-vous"),("qu'as-vous","qu'avez-vous"),("qu’as-vous","qu’avez-vous"),
 ("Vous dois expliquer","Vous devez expliquer"),("Vous veux qu'une fonction","Vous voulez qu'une fonction"),
 ("Vous viens d'être recruté","Vous venez d'être recruté"),("Vous viens d’être recruté","Vous venez d’être recruté"),
 ("Vous écris des concepts","Vous écrivez des concepts"),("Vous peux écrire","Vous pouvez écrire"),
 ("Entrez guillemets doubles","Entre guillemets doubles"),("Entrez virgules","Entre virgules"),
 ("Passez-partout à remplacer","Passe-partout à remplacer"),
 ("Notez obtenue","Note obtenue"),("Notez attendue","Note attendue"),
]
tot={}
for f in files:
    try: t=open(f,encoding='utf-8').read()
    except: continue
    o=t
    for a,b in FIX:
        n=t.count(a)
        if n: t=t.replace(a,b); tot[a]=tot.get(a,0)+n
    if t!=o: open(f,'w',encoding='utf-8').write(t)
for a,n in tot.items(): print(f"{n:3d} × {a!r}")
print("non trouvés:",[a for a,b in FIX if a not in tot])

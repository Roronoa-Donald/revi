import glob,os
os.chdir('/home/claude/c2/revi-cours-html')
files=glob.glob('server/**/*.js',recursive=True)+glob.glob('scripts/*.js')+[f for f in glob.glob('**/*.html',recursive=True) if not f.startswith(('dist/','audit/','node_modules/','design-audit/'))]
P=[("Transforme-le :","Transformez-le :"),("fais-le afficher","faites-le afficher"),("fais-le conseiller","faites-le conseiller"),("fais-le dire","faites-le dire"),
("gère les mots de 8 bits, ou remplace tout","gérez les mots de 8 bits, ou remplacez tout"),("ou remplace tout le script","ou remplacez tout le script"),
("ou remplace '","ou remplacez '"),("ou remplace ' +","ou remplacez ' +"),("ou remplace <","ou remplacez <"),
("ajoute le calcul de la somme, applique la commission","ajoutez le calcul de la somme, appliquez la commission"),
("ajoute les liaisons gigabit, vérifie les catégories","ajoutez les liaisons gigabit, vérifiez les catégories"),
("ajoute un rôle, refuse grant à l’écriture, journalise chaque refus","ajoutez un rôle, refusez grant à l’écriture, journalisez chaque refus"),
("déduis la classe vous-même à partir du premier octet, calcule le nombre","déduisez la classe vous-même à partir du premier octet, calculez le nombre"),
("distingue les ","distinguez les "),("ajoute le prix à valider","ajoutez le prix à valider"),
("compare-la à la catégorie saisie","comparez-la à la catégorie saisie"),("compare-le au type annoncé","comparez-le au type annoncé"),
("compare-le à l'onglet saisi","comparez-le à l'onglet saisi"),("compare-le au rôle saisi","comparez-le au rôle saisi"),
("pose toujours les deux extrémités et vérifie-les","posez toujours les deux extrémités et vérifiez-les"),
("utilise-les avant de recourir","utilisez-les avant de recourir"),
("initialise un accumulateur avant la boucle","initialisez un accumulateur avant la boucle"),("puis mets-le à jour dans la boucle","puis mettez-le à jour dans la boucle"),
("identifie la condition de sortie, écris-la en premier","identifiez la condition de sortie, écrivez-la en premier"),
("Lis , affiche les données ligne par ligne, calcule la moyenne des notes et écris-la","Lisez , affichez les données ligne par ligne, calculez la moyenne des notes et écrivez-la"),
("Lis et affiche les données ligne par ligne","Lisez et affichez les données ligne par ligne"),
("Calcule la moyenne des notes et écris-la","Calculez la moyenne des notes et écrivez-la"),
("et réécris-les avec vos mots","et réécrivez-les avec vos mots"),("et réécris-les de mémoire","et réécrivez-les de mémoire"),
("— dis-le.","— dites-le."),("n’oublie pas de retrancher","n’oubliez pas de retrancher"),("n’oublie pas de les retrancher","n’oubliez pas de les retrancher"),
("n’oublie pas le facteur","n’oubliez pas le facteur"),("n'oublie pas le facteur","n'oubliez pas le facteur"),
("crée la table , insère le nom avec une requête préparée , puis relis-le et affiche","créez la table , insérez le nom avec une requête préparée , puis relisez-le et affichez"),
]
cnt={}
for f in files:
    try: t=open(f,encoding='utf-8').read()
    except: continue
    o=t
    for a,b in P:
        c=t.count(a)
        if c: t=t.replace(a,b); cnt[a]=cnt.get(a,0)+c
    if t!=o: open(f,'w',encoding='utf-8').write(t)
print(sum(cnt.values()),"remplacements")
print("non trouvées:",[a[:48] for a,b in P if a not in cnt])

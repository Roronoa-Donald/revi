import glob,os
os.chdir('/home/claude/c2/revi-cours-html')
files=glob.glob('server/**/*.js',recursive=True)+glob.glob('scripts/*.js')+[f for f in glob.glob('**/*.html',recursive=True) if not f.startswith(('dist/','audit/','node_modules/','design-audit/'))]
P=[
("Calcule la tranche d’éléments correspondant à la page demandée, puis produis le JSON","Calculez la tranche d’éléments correspondant à la page demandée, puis produisez le JSON"),
("Calcule le nouvel ID : s’il n’y a aucun","Calculez le nouvel ID : s’il n’y a aucun"),
("Trouve l’index ou l’élément avec","Trouvez l’index ou l’élément avec"),
("Cite les trois opérations élémentaires","Citez les trois opérations élémentaires"),
("Résous par la méthode de Gauss","Résolvez par la méthode de Gauss"),
("Trouve les valeurs propres de","Trouvez les valeurs propres de"),
("Passe par une variable : c1=","Passez par une variable : c1="),
("Fais le total $((a + b + c))","Faites le total $((a + b + c))"),
("Classe dix incidents","Classez dix incidents"),("Classe dix politiques","Classez dix politiques"),
("Dessine les trois espaces","Dessinez les trois espaces"),("Dessine deux historiques","Dessinez deux historiques"),
("Explique la différence fetch/pull","Expliquez la différence fetch/pull"),
("Récite les quatre libertés","Récitez les quatre libertés"),
("Relis une page en masquant le CSS","Relisez une page en masquant le CSS"),("Donne un seul titre principal","Donnez un seul titre principal"),
("Décris chaque image","Décrivez chaque image"),("Relis sans CSS","Relisez sans CSS"),
("Explique pourquoi","Expliquez pourquoi"),
("Réécris CREATE TABLE Voiture sans regarder","Réécrivez CREATE TABLE Voiture sans regarder"),
("Réécris de mémoire les commandes","Réécrivez de mémoire les commandes"),("Réécris un getter et un setter","Réécrivez un getter et un setter"),
("Commence par trier la série","Commencez par trier la série"),("Commence par « ramener »","Commencez par « ramener »"),
("Commence par une definition simple","Commencez par une définition simple"),
("Identifie le service cible (22 SSH","Identifiez le service cible (22 SSH"),
("Associe le membre au rôle et Indiquez :","Associez le membre au rôle et indiquez :"),
("Explique les textes ou principes juridiques utiles.","Expliquez les textes ou principes juridiques utiles."),
("Termine par 2 ou 3 recommandations claires.","Terminez par 2 ou 3 recommandations claires."),
("Cite deux ERP open source d’entreprise.","Citez deux ERP open source d’entreprise."),
("Donne un exemple typique d’usage de la RPA.","Donnez un exemple typique d’usage de la RPA."),
("Cite quatre types primitifs.","Citez quatre types primitifs."),
("Connecte-toi, saisis le mot de passe de section dans l'atelier, puis accède à tes projets.","Connectez-vous, saisissez le mot de passe de section dans l'atelier, puis accédez à vos projets."),
("Apprends en codant.","Apprenez en codant."),("Choisis ton niveau :","Choisissez votre niveau :"),
("Applique les conditions if/elif/else sur les seuils","Appliquez les conditions if/elif/else sur les seuils"),
("Associe les colonnes aux critères","Associez les colonnes aux critères"),("Associe chaque mot-clé à sa catégorie","Associez chaque mot-clé à sa catégorie"),
("Trace à la main un lien dur","Tracez à la main un lien dur"),
("Trouve tous les produits qui n'ont","Trouvez tous les produits qui n'ont"),("Trouve l'email du client","Trouvez l'email du client"),
("Montre quelles commandes tapées","Montrez quelles commandes tapées"),
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
print(sum(cnt.values()),"remplacements,",len(cnt),"formules utilisées")
print("non trouvées:",[a[:45] for a,b in P if a not in cnt])

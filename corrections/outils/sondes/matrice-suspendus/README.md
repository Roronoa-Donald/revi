# Matrice de rejet des exercices suspendus

Ce banc examine les 90 exercices C#, Docker, Linux B3, GitHub B3 et SQL B1. Le banc `audit:variantes-sql` couvre séparément SQL B2 et B3. Il rejoue les corrigés, les nouvelles paires et les variantes historiques conservées dans `corrections/fixtures/variantes-suspendues-avant-partie2.json` sur les seuls cas actifs du correcteur local. Les candidats identiques sont dédupliqués par leur empreinte.

Exception documentée : le corrigé `dk2-c1-e2` utilise désormais l’arithmétique décimale exacte. Les deux mutations archivées ne s’appliquent plus textuellement ; elles sont rematérialisées sur les nouveaux calculs après vérification des empreintes et des définitions. Leur sens est conservé, mais les anciens codes ne sont pas rejoués. L’archive reste inchangée et l’adaptation figure dans le rapport.

```sh
npm run --silent audit:matrice-suspendus -- --repo "$PWD" --output /tmp/revi-matrice.json --jobs 4
python3 -I corrections/outils/sondes/matrice-suspendus/verifier-rapport.py /tmp/revi-matrice.json --repo "$PWD"
```

Linux, bubblewrap, `prlimit`, Python 3, Node 22 et un SDK .NET compatible sont nécessaires. Le rapport doit être sous `/tmp` et hors du dépôt. Les copies temporaires sont créées sous `/tmp` dans un répertoire privé. Chaque candidat s'exécute isolément, sans réseau, sans accès au dépôt, aux autres candidats ou aux réponses attendues. Le rapport contient des empreintes plutôt que les entrées et sorties cachées.

Pour chaque paire, un témoin exclusif est un cas accepté par le corrigé et l'une des variantes mais rejetant l'autre. Deux témoins, dans les deux sens, démontrent une distinction pour la paire et les cas examinés ; leur absence ne démontre pas une dépendance générale. Les attendus proviennent des fiches : ce banc ne prouve pas leur justesse et ne remplace ni un oracle indépendant ni un test sur des entrées inédites.

Le code retour est 0 uniquement si les corrigés sont acceptés, si chaque variante produit une mauvaise sortie et si toutes les cellules sont évaluées sans modification des sources ; 1 signale une anomalie ou une non-évaluation et 2 une impossibilité d'établir le rapport. Le vérificateur recalcule les comptes et les témoins, contrôle les empreintes et ne réexécute pas les candidats.

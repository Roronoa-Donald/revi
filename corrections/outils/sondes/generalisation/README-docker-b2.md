# Banc Docker B2 — lot 1, partie 3

Ce paquet couvre les 17 exercices Docker dont le rapport `generalisation-lot1-partie2-complement.json` ne contient qu'un témoin inédit manuel. `dk2-c1-e1` est hors périmètre : il possédait déjà deux cas contrôlés par un oracle. Le paquet ne modifie ni les exercices servis, ni la politique de suspension, ni les fichiers communs du banc.

## Contenu

- `cas_docker_b2.json` : deux entrées par exercice, attendus manuels et justification à partir de l'énoncé.
- `docker_b2.py` : oracles séparés des corrigés, vérifiant ces attendus. Les domaines traités sont ceux des modèles d'exercices, et les 34 cas sont les seuls cas effectivement contrôlés ici.
- `mutants_docker_b2.py` : deux substitutions ciblées par corrigé ; chaque substitution est unique et produit un programme Bash concret et distinct.
- `export_docker_b2.js` : extraction confinée des exemples, tests, témoins et entrées générées historiques Docker, sans exécuter les corrigés.
- `banc_docker_b2.py` et `rejouer-docker-b2.sh` : nouveauté, oracles, isolation et exécutions ; le contrôleur réutilise les primitives de `banc.py` sans le modifier.
- `verifier_docker_b2.js` : contrôle la cohérence du rapport, des sources, des substitutions et des sorties enregistrées, sans exécuter les programmes Bash.

Le rapport précédent, le catalogue, les témoins et le fichier de tests historiques sont identifiés par leurs empreintes. La nouveauté compare les 34 entrées entre elles et à 316 entrées historiques Docker, y compris les 153 entrées issues des générateurs reconnus et les deux anciens cas de `dk2-c1-e1`. Elle compare aussi les formes littérales et encodées aux sources examinées. Les 316 entrées sont comptées avec leurs éventuels doublons ; l'égalité sémantique et les sources non recensées ne sont pas couvertes.

Chaque corrigé et chaque variante est exécuté séparément dans un Bubblewrap interne, avec réseau distinct, `HOME`, catalogue et oracles absents. Les codes non nuls et les erreurs d'infrastructure ne sont pas comptés comme des rejets. Une variante n'est dite rejetée que si sa sortie diffère sur au moins un des cas où le corrigé réel est conforme. Les sorties sont comparées avec la normalisation du service d'exécution.

## Rejouer

Prérequis : Linux, Bubblewrap imbriqué, `prlimit`, Python 3 et Node 22. Le dépôt doit se trouver hors `/usr`. Le lanceur accepte la racine du dépôt en argument ; `REVI_NODE` permet de choisir Node. Depuis la racine du worktree :

```sh
bash corrections/outils/sondes/generalisation/rejouer-docker-b2.sh "$PWD" \
  > corrections/resultats/generalisation-docker-lot1-partie3.json \
  2> corrections/resultats/generalisation-docker-lot1-partie3.stderr.txt
statut=$?
printf '%s\n' "$statut" > corrections/resultats/generalisation-docker-lot1-partie3.exit.txt
node corrections/outils/sondes/generalisation/verifier_docker_b2.js
```

Le code du banc vaut `0` uniquement si les 34 sorties des corrigés sont conformes et les 34 mutants rejetés ; `1` signale un défaut ou une évaluation incomplète ; `2` signale un incident d'infrastructure. Le vérificateur peut retourner `0` pour un rapport de code `1` : cela signifie seulement que les preuves de l'échec sont cohérentes.

## Intégration ultérieure

1. Coordonner l'intégration avec les autres travaux sur les fichiers communs. Dans `banc.py`, ajouter `("cas_docker_b2.json", "docker_b2.py", "dk2-")` à `PAQUETS_SUPPLEMENTAIRES` ; dans `rejouer.sh`, ajouter les deux fichiers au paquet copié et adapter la liste de contrôle des paquets reconnus. Vérifier aussi les tests concernés par cette liste.
2. Conserver le contrôle des anciens témoins et générateurs ainsi que les 34 mutations de ce paquet : la simple déclaration dans le banc commun ne les reproduit pas. Rejouer avec les sources réellement intégrées et leurs nouvelles empreintes.
3. Traiter la divergence de précision de `dk2-c1-e2` décrite dans le rapport : employer des calculs exacts sur le domaine annoncé, ou définir et faire respecter une borne couvrant également les résultats intermédiaires. Régénérer les pages concernées si le catalogue change et rejouer les contrôles pertinents.
4. Ne pas lever la suspension Docker sur la seule base de ce paquet. Deux exemples et deux mutations par exercice ne démontrent ni la correction générale ni l'absence de mémorisation.

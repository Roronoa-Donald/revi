# Lot 1, partie 3 — contre-vérification des attendus de grilles

**Instantané local identifié par son empreinte.** Les fichiers ci-dessous contiennent des attendus normalement réservés au serveur : ne pas les publier.

## Conclusion

La suppression des champs dédiés est constatée dans les 830 blocs HTML analysés. Elle ne démontre pas l’absence d’attendus ailleurs dans les textes. Parmi les références relues sur un instantané antérieur, l’outil reconnaît **0 associations explicites de test**, **0 déductions par défaut** et **0 associations d’exemple**, dans 0 grilles. Les 26 références non reconnues nécessitent une nouvelle relecture : leur absence automatique ne prouve pas l’absence de fuite.

Un attendu cité comme libellé possible, modèle de sortie ou résultat d’une règle générale n’est pas, à lui seul, une réponse publiquement associée à un cas. À l’inverse, lorsque la donnée du cas et son résultat apparaissent dans une correspondance explicite, ou que l’application d’une règle de défaut au cas est établie, l’association est démontrée. Il ne serait pas justifié de masquer automatiquement toutes les consignes.

## Périmètre et structure

- Catalogue lu statiquement : 830 grilles `analyse`, 46 cours, 831 attendus d’exemple et 2578 attendus de test ; 0 attendu vide non recherché. Les 420 autres fiches ne sont pas auditées.
- Pages réellement lues : 276 chapitres contenant les grilles et 611 fichiers HTML au total, soit tous les fichiers HTML non liés symboliquement des 46 dossiers de cours concernés. Chaque attendu est comparé aux textes de son propre cours, pas à ceux des autres cours. Les chapitres ultérieurs peuvent nécessiter une authentification : « public » désigne ici les données envoyées au navigateur autorisé, non un accès anonyme universel.
- 830/830 blocs comportent un seul champ d’entrée d’exemple et aucun champ dédié « Sortie attendue » ; 830 entrées et 830 squelettes correspondent aux sources, après échappement de fermeture de script. 0 attribut sensible nommé `data-expected`, `data-test(s)` ou `data-solution` a été repéré.
- 2578 sélecteurs de test `cas:n` sont présents ; 2578 ont au moins une donnée commentée dans le squelette de la page. Cela ne garantit pas, à lui seul, l’exhaustivité ou la pertinence des données. La limite statique du moteur est 7 tests ; 0 test de grille dépasse cette limite.
- L’inspection statique de `server/exercises/index.js:104` montre que `toClient` ne projette que `stdin` pour chaque exemple `analyse`, sans champ `expected` ni `note`. Cette fonction est un utilitaire : le générateur de pages lit directement le catalogue et applique sa propre suppression. Dans la branche `analyse` de `server/routes/exercises.js:82`, le `stop` construit n’a pas de champ `expected` ; la source attribue `actual` à la réponse soumise. Les résultats vrai/faux restent un oracle utilisable par essais. Aucune réponse HTTP réelle n’a été capturée.

## Inventaire littéral

L’unité « ligne » associe un attendu d’exemple ou de test à un passage HTML ; les positions multiples dans ce passage sont comptées séparément. Une même valeur provenant d’un exemple et d’un test compte deux fois. Le relevé strict contient **4985 associations attendu/passage et 7998 positions**, concernant 163 attendus de 85 grilles sur l’ensemble du cours. Les 396 positions dans `data-stdin` sont incluses et distinguées : elles peuvent répéter l’entrée déjà affichée.

| Portée | Associations attendu/passage | Positions | Grilles | Associations ≥ 12 caractères | Positions ≥ 12 caractères |
|---|---:|---:|---:|---:|---:|
| Même grille | 225 | 295 | 73 | 80 | 82 |
| Copie de la même grille sur une autre page | 0 | 0 | 0 | 0 | 0 |
| Autre grille du même chapitre | 173 | 277 | 15 | 1 | 1 |
| Autre texte du même chapitre | 407 | 560 | 18 | 2 | 2 |
| Autre grille sur une autre page du cours | 1361 | 2213 | 18 | 0 | 0 |
| Autre texte sur une autre page du cours | 2819 | 4653 | 24 | 3 | 3 |

Le relevé actuel comporte **80 associations** d’au moins 12 caractères dans la même grille, correspondant à **82 positions**. Aucun seuil n’est appliqué au relevé complet : les attendus courts sont conservés, même lorsqu’ils ne sont que des fragments de nombres ou de mots.
En complément, 5 associations après suppression des espaces de bord sont étiquetées `bords_elagues` ; elles ne sont pas comptées comme littérales strictes.

### Provenance dans la même grille

| Zone | Associations attendu/passage | Positions |
|---|---:|---:|
| `donnee_cas` | 41 | 79 |
| `enonce` | 105 | 120 |
| `indice` | 13 | 13 |
| `attribut_entree_exemple` | 13 | 20 |
| `exemple_affiche` | 13 | 20 |
| `entete_cas` | 10 | 11 |
| `preambule_grille` | 14 | 15 |
| `titre` | 11 | 12 |
| `objectif` | 3 | 3 |
| `autre_texte_grille` | 2 | 2 |

Les qualifications `association_cas_explicitement_affichee` et `association_deduite_par_regle_de_defaut` sont limitées aux références relues ; les secondes sont liées aux empreintes des fichiers revus. `regle_generique_sans_cas_explicitement_cite` indique une règle ou un vocabulaire générique, pas une preuve d’absence de déduction. Les données de cas sont distinguées des réponses. Toutes les autres coïncidences restent non qualifiées : elles ne sont déclarées ni sûres ni fuitées.

## Associations établies

| Grille | Tests explicitement associés | Tests déduits par défaut | Exemples explicitement associés | Page |
|---|---|---|---|---|

### Références reconnues : `ib2-c1-e1`

Aucune association précédemment revue n’est reconnue automatiquement ; une nouvelle relecture est nécessaire.

À titre de contraste, dans `al-c2-e3`, « non symetrique » figure comme libellé de réponse et dans une règle générale. La simple présence de cette chaîne ne relie pas directement la réponse à une matrice particulière ; il faut appliquer le critère à la donnée. Cela n’exclut pas que le résultat soit déductible par raisonnement.

## Fichiers et reproduction

- `coincidences-attendus-grilles-lot1-partie3.jsonl.gz` : toutes les associations recherchées, avec attendu exact, origine, sélecteur, données du cas, fichier et ligne source, page, zone, grille porteuse, qualification, texte du passage et positions UTF-16. `ligne_html` désigne le début du passage, pas nécessairement la ligne exacte de chaque occurrence ; une ligne du relevé peut contenir plusieurs positions.
- `coincidences-grilles-propres-lot1-partie3.tsv` : même relevé limité au texte et à l’attribut de la grille concernée, sans seuil de longueur. Les champs complexes sont encodés en JSON dans les cellules.
- `synthese-attendus-grilles-lot1-partie3.json` : compteurs, preuves relues et empreintes SHA-256 de chaque fichier lu. Les résultats du présent rapport sont régénérés avec ces trois fichiers.
- Empreinte globale de l’inventaire source : `46f7a19975a4d12a0a6577cfb9cddbcc65f11d20a4a2e348829552fd4f20710a`. Outils : Node v22.23.4, Acorn 8.16.0, parse5 7.3.0.

Commande exacte depuis n’importe quel répertoire ; `--sortie` doit désigner un dossier existant situé hors du répertoire principal :

```sh
node '/home/rd/Téléchargements/revi-cours-html /revi-cours-html/corrections/outils/audit-attendus-grilles-lot1-partie3.js' --source '/home/rd/Téléchargements/revi-cours-html /revi-cours-html' --sortie '/tmp/revi-attendus-grilles-final.R1vXdDCW'
```

La commande ne charge pas les catalogues comme programmes : elle analyse leur syntaxe avec Acorn et les HTML avec parse5. Elle refuse les formes de catalogue dynamiques non reconnues et contrôle que les fichiers et listes de pages n’ont pas changé pendant la lecture. Elle n’exécute ni corrigé ni code candidat, n’accède à aucun réseau et n’écrit pas dans la source.

## Limites

- La recherche exacte respecte la casse, les accents et les caractères ; les entités HTML sont décodées, les éléments en ligne réunis et les `<br>` représentés par un retour à la ligne. Les longueurs sont exprimées en points de code Unicode. Les espaces des blocs, changements de casse, paraphrases, réponses partielles, fractions ou autres équivalences acceptées par le correcteur ne sont pas exhaustivement comparés. Une chaîne traversant deux passages distincts peut manquer.
- Les textes généraux de scripts, styles, modèles, SVG et éléments `<head>` sont exclus ; le squelette `data-lab-starter` et l’attribut `data-stdin` sont inclus séparément. Les autres attributs ne sont pas inventoriés comme texte ; la présence de texte dans le DOM ne garantit pas qu’il soit affiché à l’écran.
- La comparaison ne croise pas les attendus avec les pages d’un autre cours ni avec tous les fichiers du site ; aucune analyse sémantique exhaustive, capture navigateur, requête à l’API ou vérification de déploiement n’a été réalisée. Les réponses déductibles par calcul et les révélations par essais successifs peuvent être plus nombreuses.
- Les qualifications humaines sont ciblées. Les valeurs non qualifiées, y compris les coïncidences courtes, exigent une analyse de contexte ; une coïncidence n’est pas une fuite démontrée et une absence de coïncidence n’est pas une garantie de confidentialité.

Références relues non retrouvées à cet instantané : `ib2-c1-e1:exemple:1`, `ib2-c1-e1:test:1`, `ib2-c1-e1:test:2`, `ib2-c2-e1:exemple:1`, `ib2-c2-e1:test:1`, `ib2-c2-e1:test:2`, `ib2-c3-e1:exemple:1`, `ib2-c3-e1:test:1`, `ib2-c3-e1:test:2`, `mc2-c1-e1:exemple:1`, `mc2-c1-e1:test:1`, `mc2-c1-e1:test:2`, `mc2-c2-e1:exemple:1`, `mc2-c2-e1:test:1`, `mc2-c2-e1:test:2`, `cs2-c1-e2:exemple:1`, `cs2-c1-e2:test:1`, `cs2-c1-e2:test:2`, `cs2-c1-e2:test:3`, `cs2-c2-e1:exemple:1`, `ib2-c1-e1:test:3`, `ib2-c2-e1:test:3`, `ib2-c3-e1:test:3`, `mc2-c1-e1:test:3`, `mc2-c2-e1:test:3`, `cs2-c1-e2:test:4`.

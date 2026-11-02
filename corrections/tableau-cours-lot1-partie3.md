# Lot 1, partie 3 — tableau des 71 cours

État local au 30 octobre 2026 ; ce tableau ne lance pas le lot 2. Une ligne par fiche, ses provenances et les limites figurent dans `resultats/etat-exercices-lot1-partie3.tsv`.

**Mise à jour après le lot 2 :** ce tableau est historique, notamment pour la suspension partielle ajoutée à cinq exercices `b1-algo`. Utiliser `tableau-cours-lot2.md` et `resultats/etat-exercices-lot2.tsv` pour l'état local actualisé.

La colonne « entrées inédites » compte deux entrées nominalement distinctes exécutées avec une référence indépendante. Elle ne prouve ni toutes les classes sémantiques ni l’absence de mémorisation. Les sondes SQL notées † réemploient une base initiale connue : elles ne sont pas comptées comme deux entrées initiales inédites, malgré leurs contrôles nouveaux.

Pour les variantes, **A** compte les fiches avec deux variantes rejetées dans une preuve dont les sources contrôlées concordent avec les fichiers actuels ; **H** ajoute des fiches dont les deux rejets sont seulement attribués par l’inventaire de la partie 2. H est historique et ne suffit pas à attester la version actuelle. Les grilles ne sont pas comptées comme code.

La mention Formative et la projection sans champ `expected` ont été contrôlées sur les 830 grilles ; cela ne garantit pas que le texte ne permette jamais de déduire ou de retrouver une réponse.

| Niveau | Cours | Code | Deux entrées inédites | Deux variantes A + H | Grilles Formative | Notation |
| --- | --- | ---: | ---: | ---: | ---: | --- |
| B1 | `b1-admin-windows` | 0 | — | — | 18/18 | formative uniquement |
| B1 | `b1-algebre` | 0 | — | — | 18/18 | formative uniquement |
| B1 | `b1-algo` | 30 | 30/30 | 0 + 2/30 | — | code actif, non suspendu |
| B1 | `b1-anglais` | 0 | — | — | 18/18 | formative uniquement |
| B1 | `b1-architecture` | 0 | — | — | 18/18 | formative uniquement |
| B1 | `b1-bureautique` | 0 | — | — | 18/18 | formative uniquement |
| B1 | `b1-c-cpp` | 24 | 24/24 | 0 + 0/24 | — | code actif, non suspendu |
| B1 | `b1-ccna1` | 0 | — | — | 18/18 | formative uniquement |
| B1 | `b1-cyber` | 0 | — | — | 18/18 | formative uniquement |
| B1 | `b1-droit` | 0 | — | — | 18/18 | formative uniquement |
| B1 | `b1-fr-pro` | 0 | — | — | 18/18 | formative uniquement |
| B1 | `b1-git` | 18 | 18/18 | 18 + 0/18 | — | code actif, non suspendu |
| B1 | `b1-linux` | 18 | 18/18 | 17 + 0/18 | — | code actif, non suspendu |
| B1 | `b1-merise` | 0 | — | — | 18/18 | formative uniquement |
| B1 | `b1-php` | 24 | 24/24 | 0 + 0/24 | — | code actif, non suspendu |
| B1 | `b1-prog-web` | 18 | 18/18 | 0 + 0/18 | — | code actif, non suspendu |
| B1 | `b1-projet` | 0 | — | — | 18/18 | formative uniquement |
| B1 | `b1-python` | 18 | 18/18 | 0 + 0/18 | — | code actif, non suspendu |
| B1 | `b1-reseaux` | 0 | — | — | 18/18 | formative uniquement |
| B1 | `b1-robotique` | 0 | — | — | 18/18 | formative uniquement |
| B1 | `b1-sql` | 18 | 16/18† | 18 + 0/18 | — | suspension maintenue |
| B1 | `b1-stats` | 0 | — | — | 18/18 | formative uniquement |
| B1 | `b1-vb-excel` | 0 | — | — | — | aucun exercice du catalogue |
| B1 | `b1-virtualisation` | 0 | — | — | 18/18 | formative uniquement |
| B2 | `admin-vm` | 18 | 11/18 | 18 + 0/18 | — | code actif, non suspendu |
| B2 | `api-rest-flask` | 18 | 17/18 | 1 + 0/18 | — | code actif, non suspendu |
| B2 | `assembleur` | 0 | — | — | 18/18 | formative uniquement |
| B2 | `ccna` | 0 | — | — | 18/18 | formative uniquement |
| B2 | `csharp` | 18 | 18/18* | 18 + 0/18 | — | suspension maintenue |
| B2 | `Cyber securite B2` | 0 | — | — | 18/18 | formative uniquement |
| B2 | `docker` | 18 | 18/18 | 18 + 0/18 | — | suspension maintenue |
| B2 | `droit` | 0 | — | — | 18/18 | formative uniquement |
| B2 | `epreuves` | 0 | — | — | — | aucun exercice du catalogue |
| B2 | `erp-si` | 0 | — | — | 18/18 | formative uniquement |
| B2 | `infographie` | 0 | — | — | 18/18 | formative uniquement |
| B2 | `ingenierie-besoin` | 0 | — | — | 18/18 | formative uniquement |
| B2 | `linux` | 18 | 18/18 | 0 + 1/18 | — | code actif, non suspendu |
| B2 | `masterclass-apprendre` | 0 | — | — | 18/18 | formative uniquement |
| B2 | `php` | 18 | 18/18 | 0 + 0/18 | — | code actif, non suspendu |
| B2 | `preparation-web` | 0 | — | — | — | aucun exercice du catalogue |
| B2 | `probabilites` | 0 | — | — | 18/18 | formative uniquement |
| B2 | `rd_java` | 18 | 18/18 | 0 + 0/18 | — | code actif, non suspendu |
| B2 | `rd_winserver` | 18 | 16/18 | 17 + 1/18 | — | code actif, non suspendu |
| B2 | `RD-RO` | 0 | — | — | 20/20 | formative uniquement |
| B2 | `react` | 18 | 18/18 | 16 + 0/18 | — | code actif, non suspendu |
| B2 | `sql` | 18 | 15/18† | 18 + 0/18 | — | suspension maintenue |
| B2 | `uiux` | 0 | — | — | 18/18 | formative uniquement |
| B2 | `uml` | 0 | — | — | 18/18 | formative uniquement |
| B3 | `b3-agile` | 0 | — | — | 18/18 | formative uniquement |
| B3 | `b3-algo` | 18 | 18/18 | 0 + 0/18 | — | code actif, non suspendu |
| B3 | `b3-anglais` | 0 | — | — | 18/18 | formative uniquement |
| B3 | `b3-cloud-aws` | 0 | — | — | 18/18 | formative uniquement |
| B3 | `b3-cloud-azure` | 0 | — | — | 18/18 | formative uniquement |
| B3 | `b3-cloud-computing` | 0 | — | — | 18/18 | formative uniquement |
| B3 | `b3-cryptographie` | 0 | — | — | 18/18 | formative uniquement |
| B3 | `b3-devops` | 0 | — | — | 18/18 | formative uniquement |
| B3 | `b3-document-technique` | 0 | — | — | 18/18 | formative uniquement |
| B3 | `b3-etude-quantitative` | 0 | — | — | 18/18 | formative uniquement |
| B3 | `b3-firewall` | 0 | — | — | 18/18 | formative uniquement |
| B3 | `b3-github` | 18 | 18/18 | 18 + 0/18 | — | suspension maintenue |
| B3 | `b3-google-cloud` | 0 | — | — | 18/18 | formative uniquement |
| B3 | `b3-hacking` | 0 | — | — | 18/18 | formative uniquement |
| B3 | `b3-linux` | 18 | 18/18 | 18 + 0/18 | — | suspension maintenue |
| B3 | `b3-pfsense` | 0 | — | — | 18/18 | formative uniquement |
| B3 | `b3-reseau-lan` | 0 | — | — | 18/18 | formative uniquement |
| B3 | `b3-sql` | 18 | 18/18 | 18 + 0/18 | — | suspension maintenue |
| B3 | `b3-supervision` | 0 | — | — | 18/18 | formative uniquement |
| B3 | `b3-veille` | 0 | — | — | 18/18 | formative uniquement |
| B3 | `b3-virtualisation` | 0 | — | — | 18/18 | formative uniquement |
| B3 | `b3-voip` | 0 | — | — | 18/18 | formative uniquement |
| B3 | `b3-windows-server` | 0 | — | — | 18/18 | formative uniquement |

**Périmètre :** 420 fiches de code, 830 grilles. 405 fiches de code ont deux entrées nominalement inédites ; 15 restent sans cette preuve.

**Sans deux entrées initiales inédites établies :** `vm2-c1-e3`, `vm2-c2-e3`, `vm2-c3-e2`, `vm2-c4-e1`, `vm2-c4-e3`, `vm2-c5-e1`, `vm2-c5-e2`, `fl2-c4-e1`, `sq-c2-e1`, `sq-c2-e2`, `ws2-c5-e2`, `ws2-c6-e2`, `sql2-c1-e1`, `sql2-c1-e2`, `sql2-c1-e3`.

**Domaine fini (`*`).** C# : `csb2-c3-e1`, `csb2-c3-e2`, `csb2-c3-e3`, `csb2-c4-e3` ont deux entrées littéralement nouvelles mais leurs domaines atomiques sont déjà couverts ; l’indépendance de nouvelles catégories n’est pas démontrée.

**†** Base SQL initiale déjà connue : `sq-c2-e1`, `sq-c2-e2`, `sql2-c1-e1`, `sql2-c1-e2`, `sql2-c1-e3`.

Les deux divergences C# sur des formats dont l’admissibilité reste à préciser sont détaillées dans `resultats/generalisation-csharp-final-lot1-partie3.json`. La suspension des sept cours n’a pas été levée. Les cours déjà actifs restent actifs : ce tableau ne prononce pas de validation générale de leurs contenus.

## Provenance et limites

- Généralisation : `resultats/audit-integrite-final-lot1-partie3.json` et, séparément, le banc C# complémentaire. Les copies des différents sous-bancs sont séquentielles, non atomiques.
- Variantes A : matrice suspendue actuelle, variantes SQL B2/B3, et bancs B1 Linux, B1 Git, React, Windows Server, VM et Flask ; noms exacts et empreintes contrôlées par fiche dans le TSV.
- Variantes H : `resultats/inventaire-couverture-lot1-partie2.tsv`, uniquement les rejets récents attribués directement à la fiche ; les agrégats reconstitués ne sont pas comptés.
- Grilles : `resultats/tests-cibles-ultimes-lot1-partie3.txt`. La relecture humaine de `resultats/echantillon-grilles-5pourcent-lot1-partie3.md` reste à effectuer.
- Un résultat non établi ne signifie pas que la fiche est nécessairement incorrecte ; il indique que le critère n’est pas prouvé par les éléments retenus ici.

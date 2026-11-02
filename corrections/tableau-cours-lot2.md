# Lot 2 — état par cours au 30 octobre 2026

Périmètre local : 71 cours, 420 fiches de code et 830 grilles d’analyse. L’inventaire par fiche et les provenances sont dans `resultats/etat-exercices-lot2.tsv` ; les listes de lacunes sont dans `resultats/lacunes-couverture-lot2.md`.

**Cas nouveaux** : corrigé exécuté sur deux entrées nominalement distinctes, comparées à une référence indépendante, dans le banc commun récent ou le banc C# complémentaire vérifié ; les sondes SQL réutilisant une base initiale connue sont exclues de ce nombre et notées †. Les domaines finis ou atomiques déjà couverts sont notés *. Ce critère ne démontre ni toutes les classes de cas ni l’absence de mémorisation.

**Cachés croisés** : au moins deux tests cachés distincts, dont chacun rejette une variante tout en acceptant l’autre, pour une paire de variantes. Le contrôle de visibilité cherche les stimuli complets dans la projection et les exemples : il ne prouve pas un secret cryptographique. Seules les preuves sélectionnées ici sont comptées ; « non établi » n’est pas la preuve de leur absence.

**Variantes** : deux variantes rejetées pour mauvaise sortie, avec références et empreintes vérifiées selon les bancs cités dans le TSV. H indique des preuves historiques supplémentaires non revalidées comme actuelles ; elles ne sont pas additionnées aux preuves actuelles.

**Grilles** : le nombre indique les fiches de type analyse, non des exercices de code ; leur caractère formatif et la projection sans champ `expected` ont été testés séparément. Une réponse littérale peut néanmoins figurer dans un énoncé. Les suspensions sont lues exercice par exercice dans la politique actuelle.

| Niveau | Cours | Code | Deux cas nouveaux | Deux cachés croisés | Deux variantes / H seul | Grilles | Notation locale |
| --- | --- | ---: | ---: | ---: | ---: | ---: | --- |
| B1 | `b1-admin-windows` | 0 | — | — | — | 18 | formative uniquement |
| B1 | `b1-algebre` | 0 | — | — | — | 18 | formative uniquement |
| B1 | `b1-algo` | 30 | 30/30 | 5/30 | 5/30 + 2 H | — | suspension partielle (5/30) |
| B1 | `b1-anglais` | 0 | — | — | — | 18 | formative uniquement |
| B1 | `b1-architecture` | 0 | — | — | — | 18 | formative uniquement |
| B1 | `b1-bureautique` | 0 | — | — | — | 18 | formative uniquement |
| B1 | `b1-c-cpp` | 24 | 24/24 | 0/24 | 0/24 + 0 H | — | active (0/24 suspendue) |
| B1 | `b1-ccna1` | 0 | — | — | — | 18 | formative uniquement |
| B1 | `b1-cyber` | 0 | — | — | — | 18 | formative uniquement |
| B1 | `b1-droit` | 0 | — | — | — | 18 | formative uniquement |
| B1 | `b1-fr-pro` | 0 | — | — | — | 18 | formative uniquement |
| B1 | `b1-git` | 18 | 18/18 | 0/18 | 18/18 + 0 H | — | active (0/18 suspendue) |
| B1 | `b1-linux` | 18 | 18/18 | 0/18 | 17/18 + 0 H | — | active (0/18 suspendue) |
| B1 | `b1-merise` | 0 | — | — | — | 18 | formative uniquement |
| B1 | `b1-php` | 24 | 24/24 | 0/24 | 0/24 + 0 H | — | active (0/24 suspendue) |
| B1 | `b1-prog-web` | 18 | 18/18 | 0/18 | 0/18 + 0 H | — | active (0/18 suspendue) |
| B1 | `b1-projet` | 0 | — | — | — | 18 | formative uniquement |
| B1 | `b1-python` | 18 | 18/18 | 0/18 | 0/18 + 0 H | — | active (0/18 suspendue) |
| B1 | `b1-reseaux` | 0 | — | — | — | 18 | formative uniquement |
| B1 | `b1-robotique` | 0 | — | — | — | 18 | formative uniquement |
| B1 | `b1-sql` | 18 | 16/18† | 18/18 | 18/18 + 0 H | — | suspendue (18/18) |
| B1 | `b1-stats` | 0 | — | — | — | 18 | formative uniquement |
| B1 | `b1-vb-excel` | 0 | — | — | — | — | aucune fiche du catalogue |
| B1 | `b1-virtualisation` | 0 | — | — | — | 18 | formative uniquement |
| B2 | `admin-vm` | 18 | 11/18 | 0/18 | 0/18 + 18 H | — | active (0/18 suspendue) |
| B2 | `api-rest-flask` | 18 | 17/18 | 0/18 | 1/18 + 0 H | — | active (0/18 suspendue) |
| B2 | `assembleur` | 0 | — | — | — | 18 | formative uniquement |
| B2 | `ccna` | 0 | — | — | — | 18 | formative uniquement |
| B2 | `csharp` | 18 | 18/18* | 18/18 | 18/18 + 0 H | — | suspendue (18/18) |
| B2 | `Cyber securite B2` | 0 | — | — | — | 18 | formative uniquement |
| B2 | `docker` | 18 | 18/18 | 18/18 | 18/18 + 0 H | — | suspendue (18/18) |
| B2 | `droit` | 0 | — | — | — | 18 | formative uniquement |
| B2 | `epreuves` | 0 | — | — | — | — | aucune fiche du catalogue |
| B2 | `erp-si` | 0 | — | — | — | 18 | formative uniquement |
| B2 | `infographie` | 0 | — | — | — | 18 | formative uniquement |
| B2 | `ingenierie-besoin` | 0 | — | — | — | 18 | formative uniquement |
| B2 | `linux` | 18 | 18/18 | 0/18 | 0/18 + 1 H | — | active (0/18 suspendue) |
| B2 | `masterclass-apprendre` | 0 | — | — | — | 18 | formative uniquement |
| B2 | `php` | 18 | 18/18 | 0/18 | 0/18 + 0 H | — | active (0/18 suspendue) |
| B2 | `preparation-web` | 0 | — | — | — | — | aucune fiche du catalogue |
| B2 | `probabilites` | 0 | — | — | — | 18 | formative uniquement |
| B2 | `rd_java` | 18 | 18/18 | 0/18 | 0/18 + 0 H | — | active (0/18 suspendue) |
| B2 | `rd_winserver` | 18 | 16/18 | 0/18 | 17/18 + 1 H | — | active (0/18 suspendue) |
| B2 | `RD-RO` | 0 | — | — | — | 20 | formative uniquement |
| B2 | `react` | 18 | 18/18 | 0/18 | 12/18 + 4 H | — | active (0/18 suspendue) |
| B2 | `sql` | 18 | 15/18† | 18/18 | 18/18 + 0 H | — | suspendue (18/18) |
| B2 | `uiux` | 0 | — | — | — | 18 | formative uniquement |
| B2 | `uml` | 0 | — | — | — | 18 | formative uniquement |
| B3 | `b3-agile` | 0 | — | — | — | 18 | formative uniquement |
| B3 | `b3-algo` | 18 | 18/18 | 0/18 | 0/18 + 0 H | — | active (0/18 suspendue) |
| B3 | `b3-anglais` | 0 | — | — | — | 18 | formative uniquement |
| B3 | `b3-cloud-aws` | 0 | — | — | — | 18 | formative uniquement |
| B3 | `b3-cloud-azure` | 0 | — | — | — | 18 | formative uniquement |
| B3 | `b3-cloud-computing` | 0 | — | — | — | 18 | formative uniquement |
| B3 | `b3-cryptographie` | 0 | — | — | — | 18 | formative uniquement |
| B3 | `b3-devops` | 0 | — | — | — | 18 | formative uniquement |
| B3 | `b3-document-technique` | 0 | — | — | — | 18 | formative uniquement |
| B3 | `b3-etude-quantitative` | 0 | — | — | — | 18 | formative uniquement |
| B3 | `b3-firewall` | 0 | — | — | — | 18 | formative uniquement |
| B3 | `b3-github` | 18 | 18/18 | 18/18 | 18/18 + 0 H | — | suspendue (18/18) |
| B3 | `b3-google-cloud` | 0 | — | — | — | 18 | formative uniquement |
| B3 | `b3-hacking` | 0 | — | — | — | 18 | formative uniquement |
| B3 | `b3-linux` | 18 | 18/18 | 18/18 | 18/18 + 0 H | — | suspendue (18/18) |
| B3 | `b3-pfsense` | 0 | — | — | — | 18 | formative uniquement |
| B3 | `b3-reseau-lan` | 0 | — | — | — | 18 | formative uniquement |
| B3 | `b3-sql` | 18 | 18/18 | 18/18 | 18/18 + 0 H | — | suspendue (18/18) |
| B3 | `b3-supervision` | 0 | — | — | — | 18 | formative uniquement |
| B3 | `b3-veille` | 0 | — | — | — | 18 | formative uniquement |
| B3 | `b3-virtualisation` | 0 | — | — | — | 18 | formative uniquement |
| B3 | `b3-voip` | 0 | — | — | — | 18 | formative uniquement |
| B3 | `b3-windows-server` | 0 | — | — | — | 18 | formative uniquement |

**Totaux constatés sur ces preuves :** 405/420 fiches avec deux cas nouveaux au sens strict ; 131/420 avec une paire cachée croisée retenue ; 196/420 avec deux variantes rejetées retenues.

**Suspension :** 131/420 fiches ; 131/131 disposent d’une paire cachée croisée et de deux variantes rejetées dans les preuves retenues. Ces preuves ne valident pas une méthode non observable ni le fournisseur distant.

**† Base SQL initiale connue :** `sq-c2-e1`, `sq-c2-e2`, `sql2-c1-e1`, `sql2-c1-e2`, `sql2-c1-e3`. Les sondes après création peuvent être nouvelles.

*** Domaine fini ou atomique déjà couvert :** `csb2-c3-e1`, `csb2-c3-e2`, `csb2-c3-e3`, `csb2-c4-e3`. Les nouvelles entrées ne démontrent pas de nouvelles catégories sémantiques.

**Réserves :** les bancs ont été copiés et exécutés séparément, pas depuis un instantané atomique commun ; la conformité aux empreintes n’assure pas une correction universelle. Les deux sondes C# auparavant conditionnelles sont désormais couvertes par des domaines explicités ; leurs corrigés convergent dans `resultats/lot2-csharp-bornes-generalisation-v13.json`. Les anciennes divergences sont conservées dans `resultats/lot2-csharp-cas-nouveaux.json`.

**Réserves de provenance supplémentaires :**
- react-b2-lot1-partie3.json, rx2-c1-e3 : source modifiée.
- react-b2-lot1-partie3.json, rx2-c6-e1 : source modifiée.
- react-b2-lot1-partie3.json, rx2-c6-e2 : source modifiée.
- react-b2-lot1-partie3.json, rx2-c6-e3 : source modifiée.
- admin-vm-integre-lot1-partie3.json, vm2-c1-e1 : source modifiée.
- admin-vm-integre-lot1-partie3.json, vm2-c1-e2 : source modifiée.
- admin-vm-integre-lot1-partie3.json, vm2-c1-e3 : source modifiée.
- admin-vm-integre-lot1-partie3.json, vm2-c2-e1 : source modifiée.
- admin-vm-integre-lot1-partie3.json, vm2-c2-e2 : source modifiée.
- admin-vm-integre-lot1-partie3.json, vm2-c2-e3 : source modifiée.
- admin-vm-integre-lot1-partie3.json, vm2-c3-e1 : source modifiée.
- admin-vm-integre-lot1-partie3.json, vm2-c3-e2 : source modifiée.
- admin-vm-integre-lot1-partie3.json, vm2-c3-e3 : source modifiée.
- admin-vm-integre-lot1-partie3.json, vm2-c4-e1 : source modifiée.
- admin-vm-integre-lot1-partie3.json, vm2-c4-e2 : source modifiée.
- admin-vm-integre-lot1-partie3.json, vm2-c4-e3 : source modifiée.
- admin-vm-integre-lot1-partie3.json, vm2-c5-e1 : source modifiée.
- admin-vm-integre-lot1-partie3.json, vm2-c5-e2 : source modifiée.
- admin-vm-integre-lot1-partie3.json, vm2-c5-e3 : source modifiée.
- admin-vm-integre-lot1-partie3.json, vm2-c6-e1 : source modifiée.
- admin-vm-integre-lot1-partie3.json, vm2-c6-e2 : source modifiée.
- admin-vm-integre-lot1-partie3.json, vm2-c6-e3 : source modifiée.

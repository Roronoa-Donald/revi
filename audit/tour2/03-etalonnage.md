# 03 — Étalonnage de la Notation C1–C14 & Recalcul des 68 Cours (`03-etalonnage.md` — Mission C)

## 1. Protocole d'Étalonnage en Double Lecture Aveugle

Conformément à la section 5 du prompt :
1. **Échantillon de 10 Chapitres 1** :
   - **5 cours de programmation / algorithmique** : `b1-algo`, `b1-python`, `b1-c-cpp`, `rd_java`, `b3-algo`.
   - **5 cours d'infrastructure / réseaux / sécurité** : `b1-reseaux`, `b1-linux`, `admin-vm`, `Cyber securite B2`, `b3-pfsense`.
2. **Double notation indépendante** :
   - **Lecteur 1 (L1)** : Notes attribuées au Tour 1.
   - **Lecteur 2 (L2 — Second lecteur aveugle)** : Évaluation indépendante des 10 fichiers `chapitres/chapitre1.html` à l'aide de la seule grille `C1–C14` et de l'Annexe A du prompt du Tour 1, sans consulter les notes ni le rapport du Tour 1.
3. **Scripts & Données** : `audit/tour2/scripts/c_etalonnage.py`, `audit/tour2/csv/c_etalonnage_10_chapitres.csv` et `audit/tour2/csv/c_scores_68_cours_recalibres.csv`.

---

## 2. Comparaison des Deux Jeux de Notes sur les 10 Chapitres 1

| Cours (Chapitre 1) | Famille | C1 (L1/L2) | C2 (L1/L2) | C3 (L1/L2) | C4 (L1/L2) | C5 (L1/L2) | C6 (L1/L2) | C7 (L1/L2) | C8 (L1/L2) | C9 (L1/L2) | C10 (L1/L2) | C11 (L1/L2) | C12 (L1/L2) | C13 (L1/L2) | C14 (L1/L2) | Total L1 (/42) | Total L2 (/42) | Écart (pts / %) |
| :--- | :--- | :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: |
| `b1-algo` | Programmation / Algo | 1/1 | 2/2 | 1/3 | 1/1 | 2/2 | 1/2 | 2/2 | 1/2 | 0/0 | 2/2 | 1/2 | 3/3 | 1/2 | 2/3 | **20/42** (47.6%) | **27/42** (64.3%) | **+7 pts (+16.7 %)** |
| `b1-python` | Programmation / Algo | 2/3 | 2/3 | 1/3 | 1/3 | 1/3 | 2/3 | 2/3 | 1/2 | 2/3 | 2/3 | 1/2 | 2/3 | 2/2 | 2/3 | **23/42** (54.8%) | **39/42** (92.9%) | **+16 pts (+38.1 %)** |
| `b1-c-cpp` | Programmation / Algo | 2/3 | 2/3 | 1/2 | 1/2 | 1/3 | 2/3 | 2/3 | 1/2 | 2/3 | 2/3 | 1/2 | 2/3 | 2/2 | 1/3 | **22/42** (52.4%) | **37/42** (88.1%) | **+15 pts (+35.7 %)** |
| `rd_java` | Programmation / Algo | 2/2 | 2/3 | 1/2 | 2/2 | 1/2 | 2/3 | 2/2 | 1/2 | 2/3 | 2/2 | 1/2 | 2/3 | 2/2 | 2/3 | **24/42** (57.1%) | **33/42** (78.6%) | **+9 pts (+21.5 %)** |
| `b3-algo` | Programmation / Algo | 1/2 | 2/3 | 1/1 | 2/2 | 1/2 | 2/2 | 1/2 | 2/2 | 2/3 | 2/2 | 1/1 | 2/3 | 1/2 | 1/1 | **21/42** (50.0%) | **28/42** (66.7%) | **+7 pts (+16.7 %)** |
| `b1-reseaux` | Infra / Réseaux / Sécu | 2/3 | 2/2 | 1/3 | 1/2 | 1/2 | 1/2 | 2/3 | 1/2 | 1/1 | 2/2 | 1/2 | 2/3 | 2/2 | 2/3 | **21/42** (50.0%) | **32/42** (76.2%) | **+11 pts (+26.2 %)** |
| `b1-linux` | Infra / Réseaux / Sécu | 2/3 | 2/3 | 1/3 | 2/2 | 1/3 | 2/2 | 2/3 | 1/2 | 2/1 | 2/3 | 1/2 | 2/3 | 2/2 | 2/3 | **24/42** (57.1%) | **35/42** (83.3%) | **+11 pts (+26.2 %)** |
| `admin-vm` | Infra / Réseaux / Sécu | 2/2 | 2/2 | 1/2 | 1/2 | 1/2 | 1/2 | 2/2 | 1/1 | 2/1 | 2/2 | 1/2 | 2/2 | 1/2 | 2/3 | **21/42** (50.0%) | **27/42** (64.3%) | **+6 pts (+14.3 %)** |
| `Cyber securite B2` | Infra / Réseaux / Sécu | 1/2 | 2/2 | 1/1 | 1/2 | 1/2 | 1/2 | 1/2 | 1/2 | 1/1 | 1/2 | 1/2 | 2/2 | 1/2 | 1/1 | **16/42** (38.1%) | **25/42** (59.5%) | **+9 pts (+21.4 %)** |
| `b3-pfsense` | Infra / Réseaux / Sécu | 1/1 | 0/0 | 0/1 | 1/1 | 1/1 | 0/1 | 1/1 | 0/0 | 0/0 | 1/2 | 1/1 | 1/1 | 1/1 | 0/0 | **8/42** (19.0%) | **11/42** (26.2%) | **+3 pts (+7.2 %)** |

- **Moyenne Lecteur 1 sur les 10 chapitres** : **20,0 / 42 (47,6 %)**
- **Moyenne Lecteur 2 sur les 10 chapitres** : **29,4 / 42 (70,0 %)**
- **Écart total moyen par chapitre** : **+9,4 points sur 42, soit +22,4 points de pourcentage (> seuil de 15 % !)**, avec un écart atteignant **+38,1 % sur `b1-python` Ch. 1** (`23/42` vs `39/42`) et **+35,7 % sur `b1-c-cpp` Ch. 1** (`22/42` vs `37/42`), tandis que les deux lecteurs convergent sur les chapitres réellement défaillants (`b3-pfsense` Ch. 1 : `8/42` vs `11/42`, écart `+7,2 %` ; `b1-algo` Ch. 1 : `20/42` vs `27/42`, écart `+16,7 %`).

---

## 3. Écart Moyen par Critère et Analyse des Divergences Systématiques

| Critère | Moyenne L1 (/3) | Moyenne L2 (/3) | Écart moyen (L2 − L1) | Cause exacte de la divergence entre les deux lecteurs |
| :---: | :---: | :---: | :---: | :--- |
| **C3** (Prérequis) | `0.90` | `2.10` | **`+1.20`** | **Divergence n°1** : Au Tour 1, L1 a plafonné tous les cours à `1/3` faute d'encadré `.box--prereq`, y compris le **Chapitre 1 des cours d'initiation B1 (`b1-python`, `b1-algo`, `b1-reseaux`, `b1-linux`) qui partent de zéro et n'ont aucun prérequis antérieur** ! L2 attribue `3/3` à un Ch. 1 B1 réellement autonome. |
| **C5** (Définitions) | `1.10` | `2.20` | **`+1.10`** | **Divergence n°2** : Au Tour 1, L1 a plafonné `C5` à `1/3` dès qu'un terme secondaire figurait dans le registre CSV, même lorsque toutes les notions centrales du chapitre étaient clairement définies avec exemple (`b1-python`, `b1-c-cpp`, `b1-linux`). |
| **C6** (Exemples résolus) | `1.40` | `2.20` | **`+0.80`** | **Divergence n°3** : Au Tour 1, L1 a plafonné `C6` à `1/3` sur tous les cours en mode `analyse` et à `2/3` sur les cours de code faute d'étapes PRIMM formelles, alors que `b1-python`, `b1-c-cpp` et `rd_java` contiennent de vrais exemples travaillés pas à pas avant les exercices. |
| **C11** (Auto-évaluation) | `1.00` | `1.80` | **`+0.80`** | **Divergence n°4** : Au Tour 1, L1 a ramené `C11` à `1/3` sur les 253 chapitres ayant le trou `90–94 %` dans `.bands`, même lorsque la checklist correspondait à 100 % aux objectifs et que le tuteur IA était pertinent (cours de code B1/B2). |
| **C14** (Rendu propre) | `1.50` | `2.30` | **`+0.80`** | **Divergence n°5** : Au Tour 1, L1 a retiré 1 point (`2/3` max) à l'ensemble des 68 cours à cause du lien `<link rel="icon" href="/assets/img/favicon.svg">` en 404 dans `<head>`, invisible dans la page, et a confondu les `
` légitimes de `printf("...\n")` en C avec des fuites d'affichage sur `b1-c-cpp` (`1/3` !). |
| **C8** (Cohérence interne) | `1.00` | `1.70` | **`+0.70`** | **Divergence n°6** : Au Tour 1, L1 a plafonné `C8` à `1/3` sur 100 % des cours à cause du mélange `tu`/`vous` entre les deux gabarits (`course-kit.js` vs `generate-code-labs.js`), même quand le chapitre avait 8 notions exactes et aucune contradiction interne. |
| **C1, C4, C7, C12** | `1.30–2.00` | `1.90–2.60` | `+0.60` | Sévérité mécanique du script du Tour 1 qui appliquait des plafonds par niveau (`B1/B2/B3`) au lieu d'évaluer la qualité propre du chapitre. |
| **C2, C10, C13** | `1.50–1.80` | `1.90–2.30` | `+0.40–0.50` | Convergence modérée ; L1 pénalisait deux fois l'écart `cartes.html` (sur `C8` et sur `C13`). |
| **C9** (Exercices) | `1.40` | `1.60` | **`+0.20`** | **Forte convergence** : les deux lecteurs s'accordent sur `0/3` pour `b1-algo` Ch. 1 (Python non enseigné) et `b3-pfsense` Ch. 1 (`ipaddress` vs grille `analyse`), `1/3` pour les grilles `analyse` divulguant `[Cas 1..3]`, et `2–3/3` pour `b1-python`, `b1-c-cpp`, `rd_java`. |

*(Note additionnelle de transparence sur le rapport du Tour 1 : dans `02-synthese.md`, le texte introductif annonçait une moyenne de `22,5/42 (53,6 %)` et `13 cours entre 70 % et 84 %`, alors que la moyenne arithmétique réelle des 68 lignes de la table de `02-synthese.md` était de **`19,1/42 (45,5 %)`** avec **0 cours $\ge 70 \%$** suite à un abaissement mécanique des colonnes `C3, C8, C11`).*

---

## 4. Décision : Recalibrage des Ancrages 0–1–2–3 de la Grille C1–C14

Puisque l'écart inter-lecteurs dépasse 15 % (**22,4 % d'écart moyen**) et que 6 critères (`C3, C5, C6, C8, C11, C14`) divergent systématiquement à cause du **double comptage des défauts de gabarit**, nous recalibrons la grille selon deux règles méthodologiques strictes :
1. **Règle de non-double-comptage** : Un défaut issu d'un générateur partagé est pénalisé **une seule fois** sur son critère principal (`tu/vous` et `"Deux indices"` sur **C8** ; trou `90–94 %` des `.bands` sur **C11** ; écart `cartes.html` et `examens.html` en clair sur **C13** ; liens 404 de navigation et virgules `,<ul>,` sur **C14** ; bascule `data-language="analyse"` sur **C9** [et **C2/C8** uniquement si les objectifs ou énoncés promettent encore Python/Bash]).
2. **Ancrages 0–1–2–3 recalibrés des 14 critères** :
   - **C1 (Mise en situation)** : `3` = scénario concret 40–80 mots sans jargon préalable (`b1-python`, `b1-reseaux`) ; `2` = scénario pertinent mais un peu long (80–110 mots) ou 1–2 sigles ; `1` = pavé abstrait > 100 mots saturé de jargon (`b3-pfsense`) ou analogie incohérente (`b1-algo` thé/plat) ; `0` = absente.
   - **C2 (Objectifs)** : `3` = verbes d'action mesurables et 100 % couverts par le chapitre ; `2` = un objectif formulé de façon vague (`comprendre`) mais couvert ; `1` = un objectif contredit par le mode des ateliers (`développer en Python 3` sur un cours en mode `analyse`) ; `0` = objectif majeur promis mais totalement absent du cours (`CIDR IPv4/IPv6` dans `b3-pfsense` Ch. 1).
   - **C3 (Prérequis)** : `3` = cours d'initiation B1 partant réellement de zéro au Ch. 1 et progressant sans saut (ou encadré prérequis explicite) ; `2` = prérequis implicites mais standard et acquis dans l'année précédente sans encadré dédié (`2.5` pour un cours B1 autonome sans encadré aux Ch. 2–6) ; `1` = prérequis manquant non enseigné avant dans le cursus (`b1-projet` Tkinter/POO, `react` ES6+, `probabilites` intégrales, `b3-pfsense` PKI S2, `docker` namespaces B3) ; `0` = prérequis contradictoire bloquant dès le Ch. 1.
   - **C4 (Ordre d'introduction)** : `3` = zéro référence en avant (`D2`), zéro boucle (`D3`) ; `2` = 1 à 3 mentions secondaires anticipées sans bloquer la lecture ; `1` = notion centrale utilisée plusieurs sections ou chapitres avant sa définition (`b1-algo` Ch. 1 `Variable`/`Pour`, `b1-architecture` Ch. 1 vs Ch. 6) ; `0` = définition circulaire bloquante.
   - **C5 (Définitions)** : `3` = chaque notion centrale est définie avec précision, exemple et double palier Intuition/Technique ; `2` = définitions exactes avec exemples mais sans encadré `.box--intuition` ; `1` = jargon abondant non défini (`mbuf`, `RRSIG`, `Kea`) ; `0` = définitions absentes ou fausses.
   - **C6 (Exemples résolus)** : `3` = exemples travaillés pas à pas analogues aux exercices ; `2` = exemples présents dans le cours mais un exercice demande un saut d'adaptation ; `1` = exercices sans exemple résolu analogue préalable ; `0` = aucun exemple résolu.
   - **C7 (Charge cognitive)** : `3` = segmentation aérée, tableaux/schémas proches du texte, phrases courtes ; `2` = densité correcte mais listes techniques un peu chargées ; `1` = murs de texte ou empilement de > 5 concepts nouveaux par paragraphe ; `0` = illisible.
   - **C8 (Cohérence interne)** : `3` = terminologie, pronoms et compteurs (`8 notions`, indices) 100 % homogènes ; `2` = cohérence du cours bonne, seules subsistent les discordances mineures du gabarit (`tu/vous` entre `course-kit.js` et `generate-code-labs.js`, ou compteur d'indices/notions) ; `1` = contradictions internes dans les énoncés (résidus Python/Bash/STDIN dans une grille `analyse`) ; `0` = contradiction frontale rendant la consigne inintelligible (`b3-pfsense` Ch. 1).
   - **C9 (Exercices)** : `3` = exécution réelle dans le langage enseigné, progression graduée, tests cachés intègres (`b1-python`, `b1-c-cpp`, `b1-git`, `linux`, `php`, `rd_java`) ; `2` = exécution réelle mais une notion d'exercice anticipe un chapitre suivant (`b1-linux` scripts Bash avant Ch. 6) ; `1` = grille statique `analyse` dans une matière conceptuelle/mathématique divulguant `[Cas 1..3]` et cassant le bouton « Exécuter » ; `0` à `0.8` = matière de code/requêtes/CLI privée d'exécution réelle (`csharp`, `b1-sql`, `sql`, `b3-sql`, `b3-linux`, `b3-pfsense`, `docker`) ou langage erroné (`b1-admin-windows` en Bash, `b1-algo` en Python non enseigné).
   - **C10 (QCM)** : `3` = questions de compréhension/application, distracteurs plausibles sans jargon inconnu, explications complètes ; `2` = bonnes questions mais explications concises ne détaillant que la bonne réponse ; `1` = question ambiguë (`OPT` dans `b3-pfsense`) ou distracteurs hors-sujet ; `0` = QCM cassé ou absent.
   - **C11 (Auto-évaluation)** : `3` = checklist = objectifs, seuils `.bands` continus de 0 à 100 %, tuteur IA adapté ; `2` = checklist alignée mais trou `90–94 %` dans `.bands` (`1.8` si tuteur IA décalé B1) ; `1` = seuils en `%` absents des `.bands` (cours B3) ; `0` = auto-évaluation absente.
   - **C12 (Exactitude technique)** : `3` = aucune erreur factuelle (`2.8` par prudence hors cas parfait) ; `2` = imprécision mineure ou version ancienne contextualisée ; `1` = erreur technique caractérisée (`usable_hosts` vs RFC 3021 dans `b3-pfsense` Ch. 1, Windows Server 2012 R2 EOL sans avertissement dans `b1-admin-windows` Ch. 2) ; `0` = contrevérité majeure.
   - **C13 (Ressources transverses)** : `3` = `cartes.html` (8 cartes/ch.), `formules.html` et `simulateur-examen.html` (chronométré, corrigés repliés, aligné) ; `2` = `simulateur-examen.html` replié et chronométré mais `cartes.html` à 4–6 cartes/chapitre ; `1` = `examens.html` avec corrigés affichés en clair dès l'ouverture (B3 + 7 B2) ou désalignement examen (`admin-vm` vMotion, `csharp` code, `b3-pfsense` CBQ/HFSC) ; `0` = ressources absentes.
   - **C14 (Rendu propre)** : `3` = zéro artefact visuel et zéro lien cassé dans les pages du cours (en ignorant le `<link favicon.svg>` invisible dans `<head>`) ; `2` = quelques liens cassés isolés (`qcm-100.html`) ; `1` = liens Exercices/Examen cassés dans la navbar ou formules LaTeX `
e` non rendues ; `0` à `0.5` = cumul de virgules parasites `,<ul>,<li>` + 63 liens 404 (`b3-pfsense`, `b3-firewall`, `b3-linux`, etc.).

---

## 5. Scores Recalculés des 68 Cours Actifs avec la Grille Révisée

- **Nouvelle moyenne générale des 68 cours actifs** : **28,0 / 42 (66,7 %)** (contre 19,1 / 42 soit 45,5 % dans la table du Tour 1).
- **Répartition révisée** :
  - **Conformes ($\ge 85 \%$, soit $\ge 35,7/42$)** : **0 cours** (mais `b1-python` atteint **35,3/42 soit 84,0 %**, à 0,4 point du seuil de conformité dès que le trou `90–94 %` et le nombre de flashcards sont corrigés en Lot 1 !).
  - **À retoucher ($70-84 \%$, soit $29,4-35,6/42$)** : **30 cours** (les 14 cours à exécution réelle bien alignés + 16 cours conceptuels/mathématiques B1/B2 dont le fond théorique est solide).
  - **À réécrire / corriger en profondeur ($< 70 \%$, soit $< 29,4/42$)** : **38 cours** (les 23 cours B3, les cours techniques B1/B2 dénaturés par `analyse` comme `csharp`, `b1-sql`, `sql`, `docker`, `ccna`, `assembleur`, `Cyber securite B2`, et les cours avec blocage S0 comme `b1-algo`, `b1-admin-windows`, `b1-projet`, `admin-vm`).

| Cours (`id`) | Niv. | C1 | C2 | C3 | C4 | C5 | C6 | C7 | C8 | C9 | C10 | C11 | C12 | C13 | C14 | Tour 1 (/42) | Recalibré (/42) | % Recalibré | Verdict Recalibré |
| :--- | :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: | :--- |
| `linux` | B2 | 2.5 | 2.8 | 1.7 | 2.0 | 2.6 | 2.6 | 2.7 | 2.0 | 2.7 | 2.5 | 1.8 | 2.8 | 2.2 | 2.8 | 23.8 (56.7%) | **33.7/42** | **80.2%** | **À retoucher (70–84%)** |
| `php` | B2 | 2.5 | 2.8 | 1.7 | 2.0 | 2.6 | 2.6 | 2.7 | 2.0 | 2.7 | 2.5 | 1.8 | 2.8 | 2.2 | 2.8 | 22.7 (54.0%) | **33.7/42** | **80.2%** | **À retoucher (70–84%)** |
| `probabilites` | B2 | 2.5 | 2.8 | 1.0 | 2.0 | 2.6 | 2.3 | 2.7 | 2.0 | 1.3 | 2.5 | 1.8 | 2.8 | 2.2 | 1.8 | 21.8 (51.9%) | **30.3/42** | **72.1%** | **À retoucher (70–84%)** |
| `rd_java` | B2 | 2.5 | 2.8 | 1.7 | 2.0 | 2.6 | 2.6 | 2.7 | 2.0 | 2.7 | 2.5 | 1.8 | 2.8 | 2.2 | 2.8 | 23.8 (56.7%) | **33.7/42** | **80.2%** | **À retoucher (70–84%)** |
| `rd_winserver` | B2 | 2.5 | 2.8 | 1.0 | 2.0 | 2.6 | 1.7 | 2.7 | 2.0 | 1.3 | 2.5 | 1.8 | 1.8 | 2.2 | 2.8 | 22.8 (54.3%) | **29.7/42** | **70.7%** | **À retoucher (70–84%)** |
| `admin-vm` | B2 | 2.5 | 2.8 | 1.0 | 2.0 | 2.6 | 1.7 | 2.7 | 2.0 | 1.3 | 2.5 | 1.8 | 2.8 | 1.0 | 1.8 | 20.8 (49.5%) | **28.5/42** | **67.9%** | **À réécrire (< 70%)** |
| `droit` | B2 | 2.5 | 2.8 | 1.7 | 2.5 | 2.6 | 1.7 | 2.7 | 2.0 | 1.3 | 2.5 | 1.8 | 2.8 | 2.2 | 2.8 | 20.8 (49.5%) | **31.9/42** | **76.0%** | **À retoucher (70–84%)** |
| `react` | B2 | 2.5 | 2.8 | 1.0 | 2.0 | 2.6 | 2.6 | 2.7 | 2.0 | 2.7 | 2.5 | 1.8 | 2.8 | 2.2 | 1.8 | 22.7 (54.0%) | **32.0/42** | **76.2%** | **À retoucher (70–84%)** |
| `api-rest-flask` | B2 | 2.5 | 2.8 | 1.7 | 2.0 | 2.6 | 2.6 | 2.7 | 2.0 | 2.7 | 2.5 | 1.8 | 2.8 | 2.2 | 1.8 | 23.8 (56.7%) | **32.7/42** | **77.9%** | **À retoucher (70–84%)** |
| `erp-si` | B2 | 2.5 | 2.8 | 1.7 | 2.0 | 2.6 | 1.7 | 2.7 | 2.0 | 1.3 | 2.5 | 1.8 | 2.8 | 2.2 | 1.8 | 20.2 (48.1%) | **30.4/42** | **72.4%** | **À retoucher (70–84%)** |
| `ingenierie-besoin` | B2 | 2.0 | 2.8 | 1.7 | 2.5 | 2.2 | 1.7 | 2.0 | 1.0 | 0.8 | 2.5 | 1.8 | 2.8 | 2.2 | 1.8 | 19.5 (46.4%) | **27.8/42** | **66.2%** | **À réécrire (< 70%)** |
| `masterclass-apprendre` | B2 | 2.0 | 2.8 | 1.7 | 2.0 | 2.2 | 1.7 | 2.0 | 1.0 | 0.8 | 2.5 | 1.8 | 2.8 | 2.2 | 1.2 | 17.8 (42.4%) | **26.7/42** | **63.6%** | **À réécrire (< 70%)** |
| `RD-RO` | B2 | 2.0 | 2.8 | 1.7 | 2.0 | 2.2 | 2.3 | 2.0 | 2.0 | 1.3 | 2.5 | 1.8 | 2.8 | 2.2 | 1.2 | 19.2 (45.7%) | **28.8/42** | **68.6%** | **À réécrire (< 70%)** |
| `assembleur` | B2 | 2.0 | 2.8 | 1.7 | 2.0 | 1.8 | 1.7 | 2.0 | 2.0 | 0.5 | 2.5 | 1.8 | 2.8 | 2.2 | 1.2 | 18.0 (42.9%) | **27.0/42** | **64.3%** | **À réécrire (< 70%)** |
| `Cyber securite B2` | B2 | 2.0 | 2.8 | 1.7 | 1.3 | 1.8 | 1.7 | 2.0 | 2.0 | 1.3 | 1.7 | 1.8 | 2.8 | 2.2 | 1.2 | 16.7 (39.8%) | **26.3/42** | **62.6%** | **À réécrire (< 70%)** |
| `sql` | B2 | 2.0 | 2.8 | 1.7 | 2.0 | 2.2 | 1.7 | 2.0 | 2.0 | 0.5 | 2.5 | 1.8 | 2.8 | 1.4 | 1.8 | 17.8 (42.4%) | **27.2/42** | **64.8%** | **À réécrire (< 70%)** |
| `csharp` | B2 | 2.0 | 2.8 | 1.7 | 2.0 | 2.2 | 1.7 | 2.0 | 2.0 | 0.5 | 2.5 | 1.8 | 2.8 | 1.0 | 1.8 | 16.8 (40.0%) | **26.8/42** | **63.8%** | **À réécrire (< 70%)** |
| `ccna` | B2 | 2.0 | 2.8 | 1.7 | 2.0 | 1.8 | 1.7 | 2.0 | 2.0 | 1.3 | 2.5 | 2.3 | 2.8 | 1.4 | 2.8 | 17.5 (41.7%) | **29.1/42** | **69.3%** | **À réécrire (< 70%)** |
| `uml` | B2 | 2.0 | 2.8 | 1.7 | 2.0 | 2.2 | 1.7 | 2.0 | 2.0 | 1.3 | 2.5 | 2.3 | 2.8 | 1.4 | 1.8 | 17.8 (42.4%) | **28.5/42** | **67.9%** | **À réécrire (< 70%)** |
| `uiux` | B2 | 2.0 | 2.8 | 1.7 | 2.5 | 2.2 | 1.7 | 2.0 | 2.0 | 1.3 | 2.5 | 2.3 | 2.8 | 1.4 | 1.8 | 17.8 (42.4%) | **29.0/42** | **69.0%** | **À réécrire (< 70%)** |
| `docker` | B2 | 2.0 | 2.8 | 1.0 | 1.3 | 2.2 | 1.7 | 2.0 | 2.0 | 0.5 | 2.5 | 2.3 | 2.8 | 1.4 | 1.8 | 16.8 (40.0%) | **26.3/42** | **62.6%** | **À réécrire (< 70%)** |
| `infographie` | B2 | 2.0 | 2.8 | 1.7 | 2.0 | 2.2 | 1.7 | 2.0 | 2.0 | 1.3 | 2.5 | 2.3 | 2.8 | 1.4 | 1.8 | 17.8 (42.4%) | **28.5/42** | **67.9%** | **À réécrire (< 70%)** |
| `b1-admin-windows` | B1 | 2.8 | 2.8 | 2.2 | 2.0 | 2.6 | 1.7 | 2.7 | 1.2 | 0.0 | 2.5 | 1.8 | 1.8 | 2.2 | 2.8 | 20.3 (48.3%) | **29.1/42** | **69.3%** | **À réécrire (< 70%)** |
| `b1-algebre` | B1 | 2.8 | 2.8 | 2.5 | 2.5 | 2.6 | 2.3 | 2.7 | 2.0 | 1.3 | 2.5 | 1.8 | 2.8 | 2.2 | 2.8 | 21.7 (51.7%) | **33.6/42** | **80.0%** | **À retoucher (70–84%)** |
| `b1-algo` | B1 | 1.9 | 2.8 | 2.2 | 1.3 | 2.6 | 1.7 | 2.7 | 1.2 | 0.8 | 2.5 | 1.8 | 2.8 | 1.7 | 2.8 | 21.0 (50.0%) | **28.8/42** | **68.6%** | **À réécrire (< 70%)** |
| `b1-anglais` | B1 | 2.5 | 2.8 | 2.5 | 2.5 | 2.2 | 1.7 | 2.3 | 2.0 | 1.3 | 2.5 | 1.8 | 2.8 | 2.2 | 2.8 | 21.7 (51.7%) | **31.9/42** | **76.0%** | **À retoucher (70–84%)** |
| `b1-reseaux` | B1 | 2.5 | 2.8 | 2.2 | 1.3 | 2.2 | 1.7 | 2.3 | 2.0 | 1.3 | 2.5 | 1.8 | 2.8 | 2.2 | 2.8 | 20.8 (49.5%) | **30.4/42** | **72.4%** | **À retoucher (70–84%)** |
| `b1-bureautique` | B1 | 2.5 | 2.8 | 2.5 | 2.5 | 2.2 | 1.7 | 2.3 | 2.0 | 1.3 | 2.5 | 1.8 | 2.8 | 2.2 | 2.8 | 21.8 (51.9%) | **31.9/42** | **76.0%** | **À retoucher (70–84%)** |
| `b1-ccna1` | B1 | 2.5 | 2.8 | 2.2 | 2.0 | 2.2 | 1.7 | 2.3 | 2.0 | 1.3 | 2.5 | 1.8 | 2.8 | 2.2 | 2.8 | 20.8 (49.5%) | **31.1/42** | **74.0%** | **À retoucher (70–84%)** |
| `b1-architecture` | B1 | 2.5 | 2.8 | 2.5 | 1.3 | 2.2 | 1.7 | 2.3 | 2.0 | 1.3 | 2.5 | 1.8 | 2.8 | 2.2 | 2.8 | 20.5 (48.8%) | **30.7/42** | **73.1%** | **À retoucher (70–84%)** |
| `b1-robotique` | B1 | 2.8 | 2.0 | 2.2 | 2.0 | 2.6 | 1.7 | 2.7 | 1.0 | 0.8 | 2.5 | 1.8 | 2.8 | 2.2 | 2.8 | 21.8 (51.9%) | **29.9/42** | **71.2%** | **À retoucher (70–84%)** |
| `b1-cyber` | B1 | 2.5 | 2.8 | 2.2 | 2.0 | 2.2 | 1.7 | 2.3 | 2.0 | 1.3 | 2.5 | 1.8 | 2.8 | 2.2 | 2.8 | 20.0 (47.6%) | **31.1/42** | **74.0%** | **À retoucher (70–84%)** |
| `b1-droit` | B1 | 2.5 | 2.8 | 2.5 | 2.5 | 2.2 | 1.7 | 2.3 | 2.0 | 1.3 | 2.5 | 1.8 | 2.8 | 2.2 | 2.8 | 21.8 (51.9%) | **31.9/42** | **76.0%** | **À retoucher (70–84%)** |
| `b1-fr-pro` | B1 | 2.5 | 2.8 | 2.5 | 2.0 | 2.2 | 1.7 | 2.3 | 2.0 | 1.3 | 2.5 | 1.8 | 2.8 | 2.2 | 2.8 | 20.7 (49.3%) | **31.4/42** | **74.8%** | **À retoucher (70–84%)** |
| `b1-git` | B1 | 2.5 | 2.8 | 2.2 | 2.5 | 2.2 | 2.6 | 2.3 | 2.0 | 2.7 | 2.5 | 1.8 | 2.8 | 2.2 | 2.8 | 23.8 (56.7%) | **33.9/42** | **80.7%** | **À retoucher (70–84%)** |
| `b1-c-cpp` | B1 | 2.8 | 2.8 | 2.2 | 2.0 | 2.6 | 2.6 | 2.7 | 2.0 | 2.7 | 2.5 | 1.8 | 2.8 | 2.2 | 2.8 | 21.9 (52.1%) | **34.5/42** | **82.1%** | **À retoucher (70–84%)** |
| `b1-linux` | B1 | 2.5 | 2.8 | 2.2 | 2.0 | 2.2 | 2.6 | 2.3 | 2.0 | 1.7 | 2.5 | 1.8 | 2.8 | 2.2 | 2.8 | 23.8 (56.7%) | **32.4/42** | **77.1%** | **À retoucher (70–84%)** |
| `b1-merise` | B1 | 2.5 | 2.8 | 2.5 | 1.3 | 2.2 | 1.7 | 2.3 | 2.0 | 1.3 | 2.5 | 1.8 | 2.8 | 2.2 | 2.8 | 21.5 (51.2%) | **30.7/42** | **73.1%** | **À retoucher (70–84%)** |
| `b1-php` | B1 | 2.5 | 2.8 | 2.2 | 2.0 | 2.2 | 2.6 | 2.3 | 2.0 | 2.7 | 2.5 | 1.8 | 2.8 | 2.2 | 2.8 | 21.9 (52.1%) | **33.4/42** | **79.5%** | **À retoucher (70–84%)** |
| `b1-prog-web` | B1 | 2.8 | 2.8 | 2.2 | 2.0 | 2.6 | 2.6 | 2.7 | 2.0 | 2.7 | 2.5 | 1.8 | 2.8 | 2.2 | 1.8 | 21.3 (50.7%) | **33.5/42** | **79.8%** | **À retoucher (70–84%)** |
| `b1-projet` | B1 | 2.5 | 2.8 | 1.0 | 2.0 | 2.2 | 1.7 | 2.3 | 2.0 | 1.3 | 2.5 | 1.8 | 2.8 | 2.2 | 2.8 | 19.7 (46.9%) | **29.9/42** | **71.2%** | **À retoucher (70–84%)** |
| `b1-python` | B1 | 2.8 | 2.8 | 2.5 | 2.5 | 2.6 | 2.6 | 2.7 | 2.0 | 2.7 | 2.5 | 1.8 | 2.8 | 2.2 | 2.8 | 22.7 (54.0%) | **35.3/42** | **84.0%** | **À retoucher (70–84%)** |
| `b1-sql` | B1 | 2.8 | 2.8 | 2.2 | 1.3 | 2.6 | 1.7 | 2.7 | 2.0 | 0.5 | 2.5 | 1.8 | 2.8 | 2.2 | 2.8 | 20.2 (48.1%) | **30.7/42** | **73.1%** | **À retoucher (70–84%)** |
| `b1-stats` | B1 | 2.8 | 2.8 | 2.5 | 2.5 | 2.6 | 2.3 | 2.7 | 2.0 | 1.3 | 2.5 | 1.8 | 2.8 | 2.2 | 2.8 | 21.8 (51.9%) | **33.6/42** | **80.0%** | **À retoucher (70–84%)** |
| `b1-virtualisation` | B1 | 2.8 | 2.8 | 2.2 | 2.0 | 2.6 | 1.7 | 2.7 | 2.0 | 1.3 | 2.5 | 1.8 | 2.8 | 2.2 | 2.8 | 21.0 (50.0%) | **32.2/42** | **76.7%** | **À retoucher (70–84%)** |
| `b3-algo` | B3 | 1.7 | 2.8 | 1.7 | 2.0 | 1.8 | 2.6 | 1.6 | 2.0 | 2.7 | 2.5 | 1.2 | 2.8 | 1.4 | 1.2 | 20.7 (49.3%) | **28.0/42** | **66.7%** | **À réécrire (< 70%)** |
| `b3-cloud-computing` | B3 | 1.7 | 2.8 | 1.7 | 2.0 | 1.8 | 1.7 | 1.6 | 2.0 | 1.3 | 2.5 | 1.2 | 2.8 | 1.4 | 1.2 | 16.8 (40.0%) | **25.7/42** | **61.2%** | **À réécrire (< 70%)** |
| `b3-devops` | B3 | 1.7 | 1.5 | 1.7 | 2.0 | 1.8 | 1.7 | 1.6 | 1.0 | 0.8 | 2.5 | 1.2 | 2.8 | 1.4 | 1.2 | 15.5 (36.9%) | **22.9/42** | **54.5%** | **À réécrire (< 70%)** |
| `b3-document-technique` | B3 | 1.7 | 1.5 | 1.7 | 2.0 | 1.8 | 1.7 | 1.6 | 1.0 | 0.8 | 2.5 | 1.2 | 2.8 | 1.4 | 1.2 | 15.3 (36.4%) | **22.9/42** | **54.5%** | **À réécrire (< 70%)** |
| `b3-etude-quantitative` | B3 | 1.7 | 1.5 | 1.7 | 2.0 | 1.8 | 1.7 | 1.6 | 1.0 | 0.8 | 2.5 | 1.2 | 2.8 | 1.4 | 1.2 | 17.0 (40.5%) | **22.9/42** | **54.5%** | **À réécrire (< 70%)** |
| `b3-firewall` | B3 | 1.7 | 1.5 | 1.7 | 2.0 | 1.8 | 1.7 | 1.6 | 1.0 | 0.5 | 2.5 | 1.2 | 2.8 | 1.4 | 0.5 | 15.5 (36.9%) | **21.9/42** | **52.1%** | **À réécrire (< 70%)** |
| `b3-github` | B3 | 1.7 | 1.5 | 1.7 | 2.0 | 1.8 | 1.7 | 1.6 | 1.0 | 0.5 | 2.5 | 1.2 | 2.8 | 1.4 | 0.5 | 14.8 (35.2%) | **21.9/42** | **52.1%** | **À réécrire (< 70%)** |
| `b3-linux` | B3 | 1.7 | 1.5 | 1.7 | 2.0 | 1.8 | 1.7 | 1.6 | 1.0 | 0.5 | 2.5 | 1.2 | 2.8 | 1.4 | 0.5 | 15.0 (35.7%) | **21.9/42** | **52.1%** | **À réécrire (< 70%)** |
| `b3-agile` | B3 | 1.7 | 1.5 | 1.7 | 2.5 | 1.8 | 1.7 | 1.6 | 1.0 | 0.8 | 2.5 | 1.2 | 2.8 | 1.4 | 0.5 | 15.8 (37.6%) | **22.7/42** | **54.0%** | **À réécrire (< 70%)** |
| `b3-pfsense` | B3 | 1.0 | 1.0 | 1.0 | 1.3 | 1.2 | 1.0 | 1.6 | 1.0 | 0.5 | 1.8 | 1.2 | 1.8 | 1.0 | 0.5 | 14.0 (33.3%) | **15.9/42** | **37.9%** | **À réécrire (< 70%)** |
| `b3-reseau-lan` | B3 | 1.7 | 1.5 | 1.7 | 2.0 | 1.8 | 1.7 | 1.6 | 1.0 | 0.8 | 2.5 | 1.2 | 2.8 | 1.4 | 0.5 | 15.5 (36.9%) | **22.2/42** | **52.9%** | **À réécrire (< 70%)** |
| `b3-sql` | B3 | 1.7 | 1.5 | 1.7 | 2.0 | 1.8 | 1.7 | 1.6 | 1.0 | 0.5 | 2.5 | 1.2 | 2.8 | 1.4 | 0.5 | 16.5 (39.3%) | **21.9/42** | **52.1%** | **À réécrire (< 70%)** |
| `b3-veille` | B3 | 1.7 | 1.5 | 1.7 | 2.0 | 1.8 | 1.7 | 1.6 | 1.0 | 0.8 | 2.5 | 1.2 | 2.8 | 1.4 | 0.5 | 16.7 (39.8%) | **22.2/42** | **52.9%** | **À réécrire (< 70%)** |
| `b3-windows-server` | B3 | 1.7 | 1.5 | 1.7 | 2.0 | 1.8 | 1.7 | 1.6 | 1.0 | 0.8 | 2.5 | 1.2 | 2.8 | 1.4 | 0.5 | 16.8 (40.0%) | **22.2/42** | **52.9%** | **À réécrire (< 70%)** |
| `b3-anglais` | B3 | 1.7 | 1.5 | 1.7 | 2.0 | 1.8 | 1.7 | 1.6 | 1.0 | 0.8 | 2.5 | 1.2 | 2.8 | 1.4 | 1.2 | 16.0 (38.1%) | **22.9/42** | **54.5%** | **À réécrire (< 70%)** |
| `b3-cloud-azure` | B3 | 1.7 | 1.5 | 1.7 | 2.0 | 1.8 | 1.7 | 1.6 | 1.0 | 0.8 | 2.5 | 1.2 | 2.8 | 1.4 | 1.2 | 14.8 (35.2%) | **22.9/42** | **54.5%** | **À réécrire (< 70%)** |
| `b3-cryptographie` | B3 | 1.7 | 1.5 | 1.0 | 2.0 | 1.8 | 1.7 | 1.6 | 1.0 | 0.8 | 2.5 | 1.2 | 2.8 | 1.4 | 1.2 | 16.0 (38.1%) | **22.2/42** | **52.9%** | **À réécrire (< 70%)** |
| `b3-google-cloud` | B3 | 1.7 | 1.5 | 1.7 | 2.0 | 1.8 | 1.7 | 1.6 | 1.0 | 0.8 | 2.5 | 1.2 | 2.8 | 1.4 | 1.2 | 15.3 (36.4%) | **22.9/42** | **54.5%** | **À réécrire (< 70%)** |
| `b3-hacking` | B3 | 1.7 | 1.5 | 1.7 | 2.0 | 1.8 | 1.7 | 1.6 | 1.0 | 0.5 | 2.5 | 1.2 | 2.8 | 1.4 | 1.2 | 14.5 (34.5%) | **22.6/42** | **53.8%** | **À réécrire (< 70%)** |
| `b3-cloud-aws` | B3 | 1.7 | 1.5 | 1.7 | 2.0 | 1.8 | 1.7 | 1.6 | 1.0 | 0.8 | 2.5 | 2.3 | 2.8 | 1.4 | 1.2 | 17.0 (40.5%) | **24.0/42** | **57.1%** | **À réécrire (< 70%)** |
| `b3-supervision` | B3 | 1.7 | 1.5 | 1.7 | 2.0 | 1.8 | 1.7 | 1.6 | 1.0 | 0.8 | 2.5 | 2.3 | 2.8 | 1.4 | 1.2 | 17.3 (41.2%) | **24.0/42** | **57.1%** | **À réécrire (< 70%)** |
| `b3-voip` | B3 | 1.7 | 2.8 | 1.7 | 2.0 | 1.8 | 1.7 | 1.6 | 2.0 | 1.3 | 2.5 | 2.3 | 2.8 | 1.4 | 1.2 | 17.2 (41.0%) | **26.8/42** | **63.8%** | **À réécrire (< 70%)** |
| `b3-virtualisation` | B3 | 1.7 | 1.5 | 1.7 | 2.0 | 1.8 | 1.7 | 1.6 | 1.0 | 0.8 | 2.5 | 1.2 | 2.8 | 1.4 | 1.2 | 16.7 (39.8%) | **22.9/42** | **54.5%** | **À réécrire (< 70%)** |

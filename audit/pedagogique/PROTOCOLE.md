# Protocole d'audit pédagogique — à appliquer par tous les auditeurs

> Audit en **lecture seule** des cours. Seuls les fichiers sous `audit/pedagogique/` peuvent être créés.
> Ce protocole sert à harmoniser les notes et la traçabilité entre auditeurs.

## 0. Contexte plateforme (vérifié dans le dépôt)

- Dépôt : `/home/rd/Desktop/proba`. Site de cours interactifs en français (Node/Fastify + pages HTML statiques).
- Registre canonique : `server/courses.js` (71 entrées : 24 B1, 24 B2, 23 B3). Niveau B1 = Licence 1, B2 = Licence 2, B3 = Licence 3.
- Un cours = un dossier racine (ex. `b1-python/`, `linux/`, `b3-linux/`). Structure standard « kit » : `index.html`, `sommaire.html`,
  `chapitres/chapitre1..N.html`, `chapitres/cartes.html` (flashcards), `chapitres/formules.html` (mémo),
  `chapitres/simulateur-examen.html` | `examens.html` | `examen-blanc.html`, `exercices/exercices.html` ou `chapitres/exercices.html`, `atelier.html` (éditeur de code).
- Dispositifs d'apprentissage RÉELS de la plateforme (à ne pas confondre avec des défauts de contenu) :
  QCM interactifs avec correction expliquée et palier de maîtrise (`data-mastery`, 95 %), corrections repliables (`<details>`),
  atelier de code avec exécution réelle + tests cachés côté serveur + tuteur IA qui explique sans écrire de code (`server/exercises/*`),
  flashcards, simulateur d'examen chronométré, progression en `localStorage` (`assets/js/cours.js`).
  **Il n'y a pas de planificateur de répétition espacée** : c'est une évolution fonctionnelle possible, pas un défaut de texte (§11.9 du cahier des charges).
- Les chapitres sont GÉNÉRÉS depuis `server/content/<id>.js` pour une partie des cours ; l'apprenant ne voit que les pages HTML. Les constats portent sur ce que l'apprenant voit.
- Les documents de référence (PDF, DOCX, PPTX) sont dans `cours B1 IT/`, `COURS_B3/`, et pour B2 dans les dossiers des cours (`probabilites/cours`, `php/*.pdf`, `rd_winserver/*.pptx`, `RD-RO/ref`, `assembleur/*.pdf`, `Cyber securite B2/*.pdf`, `epreuves/`, `droitb2/`, `cours windows/`, `administration machine virtuel/`, `UML 2.0.pdf`, `SUPPORT_CONCEPTION_MEDELISATION_SI.pdf`, `uml_content.txt`…).
  Présence d'un fichier ≠ exploitation par le cours : il faut le démontrer par des recoupements de contenu.

## 1. Matériel de travail préparé (hors dépôt)

Dossier : `/home/rd/.gemini/antigravity-cli/brain/2b258739-0d9d-45de-9665-54ed44f3da78/scratch/`

| Chemin | Contenu |
|---|---|
| `travail/<id>/pages/*.txt` | Pages HTML du cours converties en texte balisé. Chaque bloc commence par `[Lnnn]` = **numéro de ligne réel** du fichier HTML source (le nom du fichier = chemin avec `/` → `__`, la 1re ligne `SOURCE:` donne le chemin exact). `⟦data-correct=…⟧` marque la bonne réponse d'un QCM. `<details> ▶` = correction/indice repliable. `BOX(...)` = encadré pédagogique. Les `<script>` et la navigation sont retirés. |
| `travail/<id>/exercices.md` | Dump du catalogue d'exercices de code (`server/exercises/`) : énoncé, starter, indices, exemple visible, **tests cachés et corrigé** (usage d'audit uniquement). `<id>` avec espaces → `_` (ex. `Cyber_securite_B2`). |
| `refs/index.tsv` | Index de 319 documents de référence extraits en texte : `chemin_source`, fichier texte extrait (dans `refs/`), format, nombre de mots, md5. Les PDF scannés/sans texte ont ~0 mot. |
| `refs/<fichier>.txt` | Texte extrait. Les PDF ont des sauts de page `\f` (n° de page = nombre de `\f` + 1). Les PPTX ont des marqueurs `--- diapo N ---`. |
| `exercise-solutions-run.log` | Sortie de `node --test tests/exercise-solutions.test.js` (cohérence corrigés ↔ tests cachés exécutée sur la machine). Preuve d'EXÉCUTION pour la cohérence interne seulement, pas pour la qualité pédagogique. |

**Numéros de ligne / page** : n'écris un numéro de ligne que si tu l'as lu (`[Lnnn]` ou `grep -n` sur le fichier source). Pour une référence PDF, la page = comptage de `\f` ; sinon cite le titre de section. Ne jamais inventer.

## 2. Règles de conduite (rappel)

1. NE MODIFIE AUCUN fichier hors de `audit/pedagogique/`. Pas de correction, pas de réécriture, pas de renommage. Pas de `git` d'écriture, pas de `npm install`, pas de build (`dist/` ne doit pas être régénéré).
2. Lis le contenu réel (toutes les pages de chapitres, toutes les fiches d'exercices, QCM, examens, cartes, mémo). Si tu ne lis qu'une partie, ton statut est « partiellement audité » avec justification chiffrée.
3. N'invente ni référence, ni citation, ni commande, ni exigence de certification. Si tu cites un standard/documentation officielle, vérifie-le via le Web (outils `search_web`, `read_url_content`) et indique l'URL.
4. Chaque constat important : cours, chapitre, fichier:ligne, passage fautif (court extrait), explication, référence confirmant, risque, correction recommandée.
5. Qualifie : `confirmé` (preuve exacte), `omission probable`, `amélioration recommandée`, `non vérifiable` (précise ce qui manque). Une méthode valide différente de la référence n'est pas une erreur. Une différence de version n'est pas automatiquement une erreur : dis si c'est incompatibilité / obsolescence / contexte.
6. **Tests réels** : quand un exemple (Python, Bash, C, JS, SQL sqlite3, etc.) peut être exécuté sans danger, exécute-le dans un répertoire temporaire `/tmp/audit-<id>/` (jamais d'`sudo`, jamais de commande destructive, réseau en lecture seule). Distingue « testé (résultat) » et « non testé — validité à confirmer ». Les commandes d'administration système (Windows, réseau Cisco, cloud) ne sont en général pas exécutables : indique-le et vérifie sur la documentation officielle.
7. **Contre-examen** (obligatoire) : avant de confirmer un P0/P1 ou un score ≤ 6/10 sur un critère, essaie de le réfuter (explication ailleurs dans le cours ? prérequis explicite ? autre chapitre ?). Note dans le rapport ce qui a été réfuté et retiré.
8. Ne note pas la longueur, la mise en page ni le jargon. Ne pénalise pas l'absence de répétition espacée automatique (évolution fonctionnelle) ni l'absence de quiz là où il serait sans valeur.
9. L'architecture « kit » commune (6 chapitres, 18 exercices de code, QCM, cartes) est une convention de la plateforme : n'exige pas un nombre uniforme de chapitres et ne la juge pas en soi ; juge l'adéquation au sujet. Mais constate si ce gabarit rigide force des compromis (ex. 6 chapitres pour une matière qui en demande 10).
10. Le diagnostic est indépendant des corrections déjà faites ou documentées ailleurs (`audit/*.md` antérieurs, `AGENTS.md`, `.build-it-reports/`) : tu peux les lire pour te situer, mais ne les cites pas comme preuve ; vérifie dans les fichiers.
11. Réponds par cours à la question centrale : « un étudiant qui suit ce cours au niveau prévu et fait les exercices dispose-t-il d'un parcours fiable, cohérent et suffisamment complet pour acquérir les compétences annoncées ? » (oui / oui avec réserves / non, et pourquoi).

## 3. Méthode par cours (ordre obligatoire)

1. **Identité** : lire `index.html`, `sommaire.html`, objectifs annoncés, prérequis déclarés, durée, compétences annoncées ; `server/courses.js`, `server/exercises/course-config.js` (si présent), `server/content/<id>.js` (si présent) pour confirmer l'origine des pages.
2. **Références** : chercher dans `refs/index.tsv` (mots-clés du sujet, noms de dossiers, noms de profs/auteurs cités, versions). Valider la pertinence en comparant des extraits (titres de chapitres, notions, exemples numériques). Classer chaque candidat : `forte / partielle / faible / hors sujet`, et `exploitée par le cours : oui / en partie / non (preuve)`. Si aucune référence n'est fiable → écrire « Aucune référence identifiée » (ne pas en inventer).
3. **Lecture intégrale** des chapitres, puis des autres pages, puis du catalogue d'exercices. Consigner : nombre de notions nouvelles par chapitre, termes non définis, prérequis supposés, erreurs, exemples.
4. **Vérification technique** : définitions, commandes, configs, code, schémas, calculs, QCM (la bonne réponse est-elle juste ? les distracteurs plausibles ?), exercices et corrigés (énoncé complet ? réponse juste ? réussissable sans maîtriser ?). Vérifier versions/dates (Web si nécessaire).
5. **Traçabilité** : matrice compétences ↔ notions de la référence ↔ notions enseignées ↔ exercices ↔ écarts (qualifiés : Conforme / Partiellement conforme / Manquant / Contradictoire / Obsolète ou dépendant d'une version / Non vérifiable / Hors périmètre de la référence mais pertinent).
6. **Évaluation pédagogique** : compréhensibilité (débutant), progression, structure, exercices (type : mémorisation / compréhension / application / diagnostic / analyse / résolution de problème), transfert, récupération active, exemples résolus, métacognition/feedback, charge cognitive, engagement, temps estimé (fourchettes).
7. **Second passage ciblé** sur les points risqués, tentative de réfutation (règle 7 ci-dessus).
8. **Notation** puis rédaction des fichiers de sortie.

## 4. Grille de notation (note /100)

| Critère | Poids | Ancrages (adapte avec discernement, justifie chaque note) |
|---|---:|---|
| C1 Conformité aux références | 20 | 18-20 : notions clés de la référence couvertes et fidèles, aucune contradiction. 14-17 : couverture majeure, quelques écarts mineurs. 10-13 : lacunes notables ou référence peu exploitée. 5-9 : lacunes majeures ou contradiction non critique. 0-4 : cours sans rapport avec la référence ou contradiction critique. **Si aucune référence fiable n'existe → C1 = « NV » (non vérifiable)** : ne PAS inventer de note. |
| C2 Exactitude technique/scientifique | 15 | 14-15 : aucune erreur confirmée sur ce qui a été vérifié. 11-13 : erreurs mineures isolées. 7-10 : erreurs sérieuses ou répétées. 0-6 : erreurs graves/dangereuses ou systémiques. |
| C3 Compréhensibilité & explications | 15 | Termes définis, raisonnement montré, exemples commentés, erreurs fréquentes, pas de sauts logiques, charge cognitive maîtrisée. |
| C4 Complétude vs objectifs | 15 | Objectifs annoncés effectivement couverts ; distingue lacunes bloquantes / recommandées / reportables. |
| C5 Progression & prérequis | 10 | Ordre des notions, prérequis enseignés avant usage, transitions, cohérence avec le niveau annoncé. |
| C6 Structure & répartition des chapitres | 10 | Unité pédagogique des chapitres, densité, équilibre, titres fidèles au contenu. |
| C7 Exercices & évaluations | 10 | Alignement objectifs/cours/exercices, progression, diversité, énoncés complets, corrigés justes et explicatifs, transfert, capacité à agir si l'objectif est opérationnel, impossibilité de réussir sans maîtriser. |
| C8 Intérêt pédagogique & qualité éditoriale | 5 | Pertinence/utilité, qualité des exemples, rédaction, engagement réel (pas des effets décoratifs). |

- Notes par pas de 0,5. Total brut = somme des critères évalués.
- **Si C1 = NV** : `total_normalise = (somme C2..C8) / 80 × 100` (arrondi à l'entier) ET fournis aussi `total_plancher` (C1 compté 0). L'indicateur de référence dans l'agrégat est `total_normalise`, avec confiance plafonnée à « moyen ».
- Si C1 est partiel (référence couvrant seulement une partie du cours) : note C1 sur la partie couvrable et explique.
- Défauts critiques (P0) : listés **séparément** ; une note élevée ne les masque pas. Ajoute un champ `drapeau_critique` (true/false) et le détail.
- Interprétation : 90-100 excellent (sans défaut critique) ; 80-89 bon ; 70-79 satisfaisant ; 60-69 insuffisant ; 40-59 faible ; 0-39 très insuffisant.
- **Niveau de confiance** par note : `élevé` (contenu lu intégralement + référence fiable + vérifications techniques réelles) / `moyen` / `faible`. Justifier.

## 5. Priorités des constats

- **P0 Critique** : erreur grave / information trompeuse / risque de sécurité / contradiction majeure avec une référence obligatoire / défaut empêchant d'acquérir la compétence principale.
- **P1 Majeur** : lacune fondamentale, prérequis manquant, cours incomplet, défaut important de progression ou d'évaluation.
- **P2 Important** : amélioration significative (compréhension, exercices, structure, cohérence).
- **P3 Mineur** : rédactionnel/éditorial/optimisation non bloquante.

## 6. Fichiers de sortie (par cours) — slug du cours

Slug = identifiant en minuscules, espaces → `-` (ex. `Cyber securite B2` → `cyber-securite-b2`, `RD-RO` → `rd-ro`, `rd_java` → `rd_java`).

1. `audit/pedagogique/C-cours/<slug>.md` — **Livrable C**, 17 rubriques numérotées dans cet ordre :
   1 Identité & emplacement · 2 Objectifs annoncés · 3 Documents de référence · 4 Conformité aux références (résumé ; détail dans D) · 5 Erreurs factuelles et techniques · 6 Complétude · 7 Compréhensibilité · 8 Prérequis · 9 Progression pédagogique · 10 Structure & répartition des chapitres (avec temps d'apprentissage estimé en fourchettes) · 11 Exemples & exercices (inclut analyse sciences de l'apprentissage : récupération active, exemples résolus, transfert, feedback, charge cognitive, répétition espacée = contenu vs dispositif) · 12 Intérêt pédagogique · 13 Forces · 14 Défauts · 15 Note détaillée /100 (tableau par critère + justification concrète) · 16 Niveau de confiance (+ limites, vérifications non faites) · 17 Corrections recommandées classées P0→P3.
   Termine par : **Réponse à la question centrale** (oui / oui avec réserves / non) et un court paragraphe de **contre-examen** (ce qui a été réfuté).
2. `audit/pedagogique/D-conformite/<slug>.md` — **Livrable D** : tableau `Exigence/notion de référence | Source (fichier, page/diapo/section) | Où dans le cours (fichier:Lnnn ou chapitre) | Couverture | Verdict (Conforme / Partiellement conforme / Manquant / Contradictoire / Obsolète-dépend d'une version / Non vérifiable / Hors périmètre référence mais pertinent)`. Précède-le de la liste des références retenues (avec `pertinence` et `exploitée par le cours`). Sépare clairement « non vérifiable » et « absent ». Sois exhaustif sur les notions importantes de la référence (au moins ~15-30 lignes pour une référence substantielle).
3. `audit/pedagogique/donnees/<slug>.json` — données structurées (UTF-8, JSON valide, **pas de commentaires**) :

```json
{
  "id": "<identifiant exact du registre>", "slug": "<slug>", "niveau": "b1|b2|b3", "intitule": "...",
  "statut_audit": "audité | partiellement audité | impossible à auditer", "justification_statut": "...",
  "dossier": "<id>/", "fichiers_cles": ["..."],
  "objectifs_annonces": ["..."], "prerequis_declares": ["..."], "prerequis_reels": ["..."],
  "references": [{"chemin": "...", "pertinence": "forte|partielle|faible|hors sujet", "exploitee_par_le_cours": "oui|en partie|non", "commentaire": "..."}],
  "reference_identifiee": true,
  "inventaire": {"chapitres": 6, "pages_html": 13, "mots_texte_pages": 0, "exercices_code": 18, "qcm_questions": 0, "flashcards": 0, "sujets_examen_blanc": 0},
  "chapitres": [{"fichier": "chapitres/chapitre1.html", "titre": "...", "mots": 0, "notions_nouvelles": 0, "exercices_code": 3, "qcm": 0, "duree_estimee_h": "2-3", "remarque": "..."}],
  "temps_estime_h": {"lecture_comprehension": "a-b", "exemples": "a-b", "pratique_exercices": "a-b", "revision_evaluation": "a-b", "total": "a-b"},
  "scores": {"C1": 0, "C2": 0, "C3": 0, "C4": 0, "C5": 0, "C6": 0, "C7": 0, "C8": 0, "total_brut": 0, "total_normalise": 0, "total_plancher": 0, "criteres_nv": []},
  "confiance": "élevé|moyen|faible", "justification_confiance": "...",
  "drapeau_critique": false, "defauts_critiques": ["..."],
  "reponse_question_centrale": "oui|oui avec réserves|non", "reponse_detail": "...",
  "competences": [{"id": "slug-c01", "libelle": "...", "domaine": "linux|sql|reseaux|...", "introduite": "ch1", "approfondie": "ch3", "premiere_pratique": "exercice id", "evaluee": "qcm ch2 / examen", "autonomie_attendue": "oui/non", "statut": "enseignée+pratiquée+évaluée | enseignée sans pratique | évaluée sans enseignement | annoncée non développée | ..."}],
  "constats": [{"id": "<slug>-001", "priorite": "P0|P1|P2|P3", "categorie": "erreur-technique|conformite|completude|comprehension|progression|structure|exercice|editorial|securite", "qualification": "confirmé|omission probable|amélioration recommandée|non vérifiable", "chapitre": "...", "localisation": "chapitre1.html:L123 (chemin repo)", "passage": "...", "probleme": "...", "reference": "...", "risque": "...", "correction": "...", "dependances": "..."}],
  "structure": {"recommandation": "conserver|diviser|regrouper|réordonner|approfondir", "justification": "...", "structure_actuelle": "...", "structure_proposee": "...", "risques": "..."},
  "verifications_techniques": {"effectuees": ["..."], "non_effectuees": ["... et pourquoi"]},
  "limites": ["..."], "a_confirmer": ["..."]
}
```

   - Les constats doivent être identiques à ceux du rapport C (même id).
   - `competences` : 8 à 20 compétences clés réellement annoncées ou enseignées (pas de banalités), utiles à l'analyse inter-niveaux (Livrable E).
   - Valide ton JSON : `python3 -c "import json,sys;json.load(open('audit/pedagogique/donnees/<slug>.json'))"`.

Rédige en français, de manière autonome (un lecteur qui n'a pas la conversation doit tout comprendre), sans emoji. Les tableaux sont bienvenus mais n'écrasent pas les explications.

## 7. Compte rendu final de chaque auditeur (message au coordinateur)

Pour chaque cours : statut, score total (normalisé si NV), confiance, drapeau critique, nombre de constats P0/P1/P2/P3, chemin des 3 fichiers, 3 lignes sur ce qui reste non vérifié. Plus : toute anomalie du protocole ou du matériel de travail (page manquante, texte extrait illisible…).

# Droit, langues et culture professionnelle

**Appréciation : à corriger avant publication.** Chapitres sélectionnés : Masterclass apprendre à apprendre B2 1 et 5. Population : 8 cours avec chapitre 1, 144 exercices, 417 QCM et 273 cartes ; les 20 exercices, 10 QCM et 10 cartes sont tirés dans l'ensemble de la famille et non exclusivement en droit ou en anglais. Voir `../echantillons-identifiants.json`.

## Exactitude et constats

Les textes principaux des chapitres Masterclass B2 1 et 5 sélectionnés ont été lus ; les autres activités de langue et de droit ne sont pas intégralement relues.

- **F196 — D9/D12, S0, observé** — `b3-anglais/chapitres/chapitre5.html:187` : une erreur de passerelle 502 ne suffit pas à conclure qu'aucun paiement n'a été débité. Le même message est aussi recommandé dans un exemple et un QCM ; indiquer l'incertitude et vérifier le statut avant une nouvelle tentative. Sources : RFC 9110, https://www.rfc-editor.org/rfc/rfc9110.html ; Stripe, https://docs.stripe.com/error-low-level, consultées le 29 octobre 2026.
- **F197 — D9/D10/D12, S1, observé** — `b1-fr-pro/chapitres/chapitre3.html:107` : l'article devant un nom de profession n'est pas automatiquement fautif dans tous les contextes ; le QCM et le lab généralisent la règle. Situer les usages et ne pas rejeter systématiquement une formulation admissible. Sources : https://research.jyu.fi/grfle/081.html et https://excerpts.numilog.com/books/9782340036857.pdf, consultées le 29 octobre 2026.
- **F163 — D12, S1, observé** — `masterclass-apprendre/chapitres/chapitre5.html:112`, « La règle des 85 % », est enseignée comme un optimum général pour chaque étudiant. L'étude citée traite de modèles de classification sous hypothèses, non d'une garantie universelle. Source primaire : https://www.nature.com/articles/s41467-019-12552-4, consultée le 29 octobre 2026.
- **F164/F165 — D6/D9/D12, S1, observé** — `masterclass-apprendre/chapitres/chapitre1.html:201`, « capacité maximale ... fixée », présente un barème de sept points comme diagnostic cognitif ; `:66`, « 80 % des informations s’évaporent », et la promesse de vitesse ne sont pas reliées à des conditions ni à une étude précise. Distinguer simulation et résultat scientifique, puis sourcer ou retirer les chiffres.
- **F01 — D15, S0, observé** — `b3-veille/chapitres/cartes.html:85`, « `<title> (titre), <link>` » : les balises ne sont pas échappées. Dans Chromium, **14 cartes sur 36** apparaissent dans le DOM et aucune n'est focalisable. Échapper le contenu avant insertion, régénérer puis vérifier toutes les cartes au clavier.
- **F02 — D15, S0, observé** — `b3-veille/chapitres/chapitre3.html:390`, « `<button class=opt><title>` » : le DOM ne contient que **2 des 8 QCM** du source. Réparer l'échappement à la source et vérifier la fin de page et ses scripts.
- **F38 — D12, S1, observé** — `masterclass-apprendre/chapitres/chapitre1.html:275`, « limite canonique de la mémoire de travail » : le QCM et son explication présentent `7 ± 2` comme un empan universel. Situer le résultat de Miller et les conditions de tâche, rappeler les différences entre modèles, types de matériel et individus.
- **F51 — D12/D13, S1, observé** — `b1-fr-pro/chapitres/chapitre6.html:308`, « Verbe de mouvement : être » : `être` convient à « elle est partie », mais la règle générale est fausse, comme le montre « j'ai marché ». Expliquer le verbe et son emploi sans généraliser au mouvement.
- **F54 — D9, S1, observé** — `b3-anglais/chapitres/chapitre2.html:386`, « Que garantit la propriété d’idempotence » : cette question et ses réponses sont en français et testent une notion HTTP, pas la lecture d'une documentation anglaise annoncée dans la situation `:66`. Ajouter un extrait ou une tâche linguistique en anglais sans supprimer nécessairement la vérification technique.
- **F66 — D12, S1, observé** — `b3-document-technique/chapitres/cartes.html:97`, « composées de noms au pluriel » : le pluriel dans les URI peut être une convention, pas une obligation REST. L'API REST de GitHub utilise aussi l'URI `/user` ; expliquer une convention cohérente sans la présenter comme une contrainte universelle.

## Grille C1–C14 — éléments examinés

| Critère | Constat ou limite |
|---|---|
| C1 Situation | `masterclass-apprendre/chapitres/chapitre1.html:65` situe la question de l'apprentissage ; la pertinence perçue par les étudiants n'a pas été mesurée. |
| C2 Objectifs | Les objectifs sont affichés à `masterclass-apprendre/chapitres/chapitre1.html:70` ; leur couverture individuelle n'est pas entièrement vérifiée. |
| C3 Prérequis | Aucun parcours complet entre notions de cognition, langue et droit n'a été établi. |
| C4 Ordre | Mémoire au chapitre 1, pratique délibérée au chapitre 5 ; l'existence d'une progression complète ne peut pas être déduite des seuls titres. |
| C5 Définitions | Le raccourci sur la mémoire de travail et la règle d'auxiliaire exigent F38/F51. |
| C6 Exemples et progression | Les chapitres contiennent des mises en situation ; l'existence d'exemples résolus avant chaque tâche n'est pas établie. |
| C7 Charge | La terminologie neurobiologique peut être dense ; sa difficulté réelle et les adaptations nécessaires restent à mesurer. |
| C8 Cohérence | La page de veille ne rend pas les contenus présents dans sa source, F01/F02. |
| C9 Exercices | Les 20 corrigés et 40 variantes ciblées ont été essayés ; leurs tests peuvent imposer un modèle erroné, notamment F196/F197. Les activités de droit ne sont pas toutes relues ni évaluées par des spécialistes des juridictions visées. |
| C10 QCM | Le QCM de mémoire et l'item technique en français du cours d'anglais soulèvent F38/F54. |
| C11 Auto-évaluation | Les seuils généraux ont été comptés ; les objectifs linguistiques et juridiques des checklists restent à confronter aux activités. |
| C12 Exactitude | Corriger la règle grammaticale, les généralisations sur la mémoire et les 85 %, F38/F51/F163–F165 ; aucune validation générale des règles juridiques n'est revendiquée. |
| C13 Ressources | Les cartes de veille sont partiellement absentes dans le DOM ; leur correspondance au cours n'est donc pas accessible normalement. |
| C14 Rendu | Le navigateur confirme la perte de cartes et de QCM et l'absence de focus sur la page de veille, F01/F02. |

## Exercices, QCM et cartes

Les dix QCM et dix cartes de la famille ont été lus individuellement dans leur texte extrait ; appréciations et réserves figurent dans `../07-relecture-familles.csv`.

Les 20 exercices sélectionnés ont reçu deux variantes de raisonnement chacune, construites à partir des corrigés et non recueillies auprès d'étudiants : les 40 variantes sont rejetées. Ces rejets établissent seulement un contrôle des règles imposées, qui peuvent elles-mêmes être contestables ; F196/F197. Détails : `../sondes-reponses-plausibles.json`.

Les **20 corrigés échantillonnés réussissent** ; **40 variantes automatiques sur 40** sont également rejetées. Comme les exercices sont en mode analyse et les attentes souvent très exactes, ces essais ne valident pas les nuances linguistiques, la justesse juridique ou le raisonnement d'un étudiant. Les QCM et cartes sélectionnés sont identifiés.

**Niveau.** Les situations cherchent un contexte professionnel ; la question de français F51 installe toutefois une règle erronée et F54 ne mesure pas la compétence de lecture anglaise à elle seule. Rien ne permet ici de garantir l'accessibilité à un étudiant faible ou l'approfondissement offert à un étudiant excellent.

## Confrontation aux supports et références

L'index du corpus ne donne aucun PDF pour `masterclass-apprendre` ; la fidélité de ces deux chapitres est donc invérifiable avec les pièces fournies. Des documents de droit, français et anglais existent ailleurs dans l'archive, mais leur comparaison détaillée n'a pas été menée. Aucun avis n'est donné sur la validité de l'ensemble des citations du droit français, togolais, OHADA ou UEMOA : textes, versions et juridictions doivent être vérifiés séparément.

Sources consultées le 29 octobre 2026 :

- Académie française, auxiliaires et mouvement : https://www.academie-francaise.fr/maria-k-allemagne
- Cowan, limites et modèles de mémoire de travail : https://pmc.ncbi.nlm.nih.gov/articles/PMC2864034/
- GitHub, exemple d'URI REST au singulier : https://docs.github.com/en/rest/users/users#get-the-authenticated-user

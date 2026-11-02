# Rapport final K1–K20 (vérifié par scripts, branche `reparation-k20`)

Tests : 7 382 / 7 382. `courses:check` (832 pages, 64 cours) et `labs:check` (1 250 exercices) OK.

| K | État | Preuve / reste à faire |
|---|---|---|
| K1 sécurité Bash | Fait (agent, vérifié) | `scripts/check-no-local-shell.js` : plus de `runShell`, repli local désactivé |
| K2 notions | Fait | `annexe_B.py` : 0 perdue |
| K3 cartes | Partiel | 3 669 cartes auto-générées retirées ; 7 cartes rédigées à la main (SQL, Linux, Algo) ; 46 réponses coupées ramenées à la dernière phrase complète (générateur + test). Les notions de ch. 1–3 d'Algo, Python et SQL sont couvertes ; le critère « une carte par notion » n'est pas rempli pour les autres cours (≈ 1 400 notions) |
| K4 /31 | Fait | règle corrigée (pfSense ch. 1) |
| K5 analyse | Fait | les 15 occurrences restantes sont du contenu légitime (commandes PowerShell/Cisco, prérequis Python 3.7 du cours de projet, `print` enseigné en robotique) ; sommaires et indices de 21 cours reformulés |
| K6 seuils | Fait | 4 paliers partout |
| K7 / K14 LaTeX | Fait | 0 formule cassée, test `language-integrity` |
| K8 / K15 tutoiement | Fait sur les pages | ≈ 200 corrections (pronoms, impératifs, paliers via `toVousBandText` étendu) ; les énoncés d'exercices sont rédigés à la 3e personne ou au vouvoiement ; 426 conversions de K8 à relire dans `k8-conversions-a-relire.csv` |
| K9 livraison | Fait | branche Git, aucune suppression ; copier par-dessus sans `--delete` |
| K10 rapport | Fait | ce document et `REPARATION-K20.md` |
| K11 sources | Minimal | Algo, SQL : ordre du site cohérent avec les PDF. Linux : les PDF placent l'installation de Debian (chap. 3) avant les commandes de base (chap. 4), le site fait l'inverse. Pas d'étalonnage indépendant (un seul évaluateur) |
| K12 prérequis | Fait pour 14 encadrés | 4 gardés en tête (termes réutilisés dans le chapitre), 6 « orphelins » déplacés en fin de chapitre (`k12_deplacer_encadres_orphelins.py`) |
| K13 exercices non préparés | Partiel | SQL, Linux, Réseaux ch. 1 corrigés (sections ajoutées : SELECT ; chemins ; primer Bash complété). Matrice des 26 cas restants : `k13-matrice-ch1.csv` |
| K16 étiquette dupliquée | Fait | 0 occurrence |
| K17 chevrons / fautes | Fait | les générateurs échappent désormais `<iface>`, `<nom>`… (541 occurrences) ; fautes corrigées |
| K18 sommaires vs mode | Fait pour 21 cours | voir K5 |
| K19 déploiement | Hors sandbox | `check_deploy_hash.py` à lancer chez vous (compare les pages locales au site en ligne) |
| K20 régressions de langue | Fait | cause racine corrigée dans `course-kit.js` ; 14 tests de langue |

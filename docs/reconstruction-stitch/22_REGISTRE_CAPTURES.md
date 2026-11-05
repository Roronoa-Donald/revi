# 22 — Registre des captures d'écran nécessaires

> Aucune capture n'a été produite : ce registre liste les **vues à capturer** pour la reconstruction, avec l'URL exacte, l'état, le viewport et la priorité.
> Convention de nommage : `NN_famille_page_etat_viewport.png`.
> Viewports : desktop 1440 × 900, tablette 768 × 1024, mobile 390 × 844.

## 1. Priorité P0 — incontournables (18 captures)

| # | Fichier | URL | État | Viewport |
|---|---|---|---|---|
| 01 | `01_portail_defaut_desktop.png` | `/index.html` | défaut, B1 actif | 1440 |
| 02 | `02_portail_b2_desktop.png` | `/index.html` | onglet B2 | 1440 |
| 03 | `03_portail_recherche_desktop.png` | `/index.html` | recherche « algo » | 1440 |
| 04 | `04_portail_vide_desktop.png` | `/index.html` | recherche « zzz » | 1440 |
| 05 | `05_portail_atelier_verrouille_desktop.png` | `/index.html?preparation=locked` | bandeau | 1440 |
| 06 | `06_login_connexion_desktop.png` | `/_auth/login.html` | onglet connexion | 1440 |
| 07 | `07_login_inscription_desktop.png` | `/_auth/login.html?mode=register` | inscription | 1440 |
| 08 | `08_login_erreur_desktop.png` | `/_auth/login.html` | erreur identifiants | 1440 |
| 09 | `09_compte_abonne_desktop.png` | `/_auth/account.html` | abonné | 1440 |
| 10 | `10_compte_gratuit_desktop.png` | `/_auth/account.html` | gratuit | 1440 |
| 11 | `11_cours_sommaire_desktop.png` | `b1-algo/sommaire.html` | défaut | 1440 |
| 12 | `12_cours_chapitre_desktop.png` | `b1-algo/chapitres/chapitre1.html` | haut de page | 1440 |
| 13 | `13_lab_defaut_desktop.png` | `b1-algo/chapitres/chapitre1.html#lab` | lab au repos | 1440 |
| 14 | `14_lab_succes_desktop.png` | idem | après exécution | 1440 |
| 15 | `15_lab_erreur_desktop.png` | idem | après erreur | 1440 |
| 16 | `16_admin_login_desktop.png` | `/_auth/admin/login.html` | défaut | 1440 |
| 17 | `17_admin_dashboard_desktop.png` | `/_auth/admin/dashboard.html` | onglet comptes | 1440 |
| 18 | `18_404_desktop.png` | `/page-inexistante` | 404 | 1440 |

## 2. Priorité P1 — parcours et états (24 captures)

| # | Fichier | URL | État | Viewport |
|---|---|---|---|---|
| 19 | `19_cours_accueil_desktop.png` | `b1-algo/index.html` | défaut | 1440 |
| 20 | `20_cours_chapitre_qcm_desktop.png` | chapitre 1 | QCM avant réponse | 1440 |
| 21 | `21_cours_chapitre_qcm_repondu_desktop.png` | chapitre 1 | après réponse + score | 1440 |
| 22 | `22_cours_cartes_desktop.png` | `b1-algo/chapitres/cartes.html` | recto | 1440 |
| 23 | `23_cours_cartes_verso_desktop.png` | idem | carte retournée | 1440 |
| 24 | `24_cours_memo_desktop.png` | `b1-algo/chapitres/formules.html` | défaut | 1440 |
| 25 | `25_cours_examen_desktop.png` | `b1-algo/chapitres/simulateur-examen.html` | chrono en cours | 1440 |
| 26 | `26_cours_exercices_desktop.png` | `b1-algo/exercices/exercices.html` | défaut | 1440 |
| 27 | `27_cours_atelier_desktop.png` | `b1-algo/atelier.html` | éditeur vide | 1440 |
| 28 | `28_lab_suspendu_desktop.png` | page avec `data-grading-suspended` | validation désactivée | 1440 |
| 29 | `29_lab_tuteur_desktop.png` | lab en erreur | panneau tuteur ouvert | 1440 |
| 30 | `30_lab_analyse_desktop.png` | lab `analyse` | formulaire de cas | 1440 |
| 31 | `31_compte_anonyme_desktop.png` | `/_auth/account.html` | non connecté | 1440 |
| 32 | `32_compte_paiement_requis_desktop.png` | `?payment=required` | message rouge | 1440 |
| 33 | `33_login_mdp_oublie_desktop.png` | login | vue forgot | 1440 |
| 34 | `34_login_reset_desktop.png` | `?reset=token` | nouveau mot de passe | 1440 |
| 35 | `35_admin_creer_compte_desktop.png` | dashboard | formulaire rempli | 1440 |
| 36 | `36_admin_modale_confirmation_desktop.png` | dashboard | modale suppression | 1440 |
| 37 | `37_admin_toast_succes_desktop.png` | dashboard | toast vert | 1440 |
| 38 | `38_admin_ia_desktop.png` | dashboard | onglet IA | 1440 |
| 39 | `39_admin_sessions_desktop.png` | dashboard | onglet sessions | 1440 |
| 40 | `40_admin_journal_desktop.png` | dashboard | onglet journal | 1440 |
| 41 | `41_epreuves_defaut_desktop.png` | `epreuves/index.html` | première matière | 1440 |
| 42 | `42_prep_atelier_desktop.png` | `preparation-web/index.html` | projet 1 | 1440 |

## 3. Priorité P1 — Preparation Web (12 captures)

| # | Fichier | URL | État |
|---|---|---|---|
| 43 | `43_prep_gate_mot_de_passe.png` | `preparation-web/index.html` | non déverrouillé |
| 44 | `44_prep_projet_actif.png` | idem | projet chargé |
| 45 | `45_prep_validation_ok.png` | idem | feedback vert |
| 46 | `46_prep_validation_echec.png` | idem | critères rouges |
| 47 | `47_prep_modale_progression.png` | idem | modale ouverte |
| 48 | `48_prep_modale_solution.png` | idem | solution |
| 49 | `49_prep_panneau_ia.png` | idem | IA ouverte |
| 50 | `50_prep_quiz.png` | idem | quiz bonus |
| 51 | `51_prep_focus_code.png` | idem | rail replié |
| 52 | `52_prep_apercu_mobile.png` | idem | aperçu seul |
| 53 | `53_prep_autocomplete.png` | idem | liste ouverte |
| 54 | `54_prep_toast.png` | idem | toast |

## 4. Priorité P2 — responsive (12 captures)

| # | Fichier | URL | Viewport |
|---|---|---|---|
| 55 | `55_portail_tablette.png` | `/index.html` | 768 |
| 56 | `56_portail_mobile.png` | `/index.html` | 390 |
| 57 | `57_cours_chapitre_tablette.png` | chapitre 1 | 768 |
| 58 | `58_cours_chapitre_mobile.png` | chapitre 1 | 390 |
| 59 | `59_lab_mobile.png` | chapitre 1 | 390 |
| 60 | `60_login_mobile.png` | `/_auth/login.html` | 390 |
| 61 | `61_compte_mobile.png` | `/_auth/account.html` | 390 |
| 62 | `62_admin_tablette.png` | dashboard | 768 |
| 63 | `63_admin_mobile.png` | dashboard | 390 |
| 64 | `64_epreuves_mobile.png` | annales | 390 |
| 65 | `65_prep_tablette.png` | atelier | 768 |
| 66 | `66_prep_mobile.png` | atelier | 390 |

## 5. Priorité P3 — variantes rares (10 captures)

| # | Fichier | URL | État |
|---|---|---|---|
| 67 | `67_portail_sombre.png` | `/index.html` | thème sombre |
| 68 | `68_cours_sombre.png` | chapitre 1 | thème sombre |
| 69 | `69_chat_ouvert.png` | n'importe quelle page | panneau RD-AI |
| 70 | `70_chat_reponse.png` | idem | réponse IA |
| 71 | `71_sql_simulateur.png` | `b1-sql/...` | simulateur SQL |
| 72 | `72_404_mobile.png` | 404 | 390 |
| 73 | `73_forbidden.png` | chemin bloqué | 403 texte |
| 74 | `74_login_succes.png` | login | bouton « Connecté ! » |
| 75 | `75_chapitre_verrouille.png` | sommaire | cadenas |
| 76 | `76_prep_badge_quiz.png` | atelier | badge obtenu |

## 6. Règles de prise de vue

1. **Ne jamais capturer un état sans son URL** (les paramètres font partie de l'état).
2. Pour chaque écran interactif, capturer **avant** et **après** l'action (repos → actif).
3. Capturer les états vides et d'erreur, pas seulement les états nominaux.
4. Ne pas capturer les pages de `_auth/` (non servies) ni les dossiers legacy.
5. Masquer les données personnelles réelles (emails, montants, IDs).
6. Pour le responsive, capturer au moins la rupture de grille (2 colonnes → 1).
7. Les captures ne remplacent pas les fiches : elles illustrent un état déjà décrit.

## 7. Couverture des captures vs pages

| Famille | Pages | Captures prévues |
|---|---|---|
| Portail | 1 | 6 |
| Cours (échantillon représentatif) | 5 cours × 13 | 12 |
| Code lab (états) | transversal | 6 |
| Auth / compte | 2 | 7 |
| Admin | 2 | 7 |
| Annales | 1 | 1 |
| Preparation | 1 + 3 annexes | 13 |
| 404 / 403 | 2 | 2 |
| Responsive | transversal | 12 |
| Thème / chat | transversal | 4 |

Le reste des 1 067 pages partage les mêmes gabarits : une capture par gabarit suffit, les fiches individuelles couvrent les différences de contenu.

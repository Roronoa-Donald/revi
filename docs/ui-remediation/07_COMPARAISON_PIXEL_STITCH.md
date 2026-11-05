# 07 — Comparaison pixel avec les références Stitch

## 1. Méthode

Chaque référence `screen.png` est comparée à la capture réelle de la page correspondante, prise à 1440 px de large, sans animation. Les exports Stitch étant des images **déjà mises à l'échelle** (largeurs de 206 à 1600 px), les deux images sont ramenées à la largeur de la référence avant mesure. Les métriques sont donc normalisées, mais incluent un facteur d'échelle propre à chaque export.

- MAE : écart moyen par canal (0 = identique, 255 = opposé).
- % pixels différents : part des pixels dont l'écart moyen dépasse 24/255.
- Preuves : `evidence/diff/<ref>.side.jpg` (côte à côte) et `.diff.png` (écart en rouge).

## 2. Résultats

| Référence | Dimensions | Page application | MAE | Pixels différents |
|---|---|---|---|---|
| `portal_001_portail_du_catalogue_initial_desktop` | 1302x1600 | `/` | 18.92 | 14.8 % |
| `portal_001_portail_du_catalogue_initial_mobile` | 453x1600 | `/` | 31.08 | 19 % |
| `auth_001_connexion_inscription_initial_desktop` | 1600x1280 | `/_auth/login.html` | 9.33 | 5.2 % |
| `auth_001_connexion_inscription_mobile` | 678x1600 | `/_auth/login.html` | 25.11 | 13.8 % |
| `auth_001_inscription_initial_desktop` | 1600x1534 | `/_auth/login.html` | 12.79 | 6.9 % |
| `account_001_mon_compte_authentifi_abonnement_desktop` | 1062x1600 | `/_auth/account.html` | 13.64 | 6.8 % |
| `account_001_mon_compte_abonnement_mobile` | 527x1600 | `/_auth/account.html` | 24.82 | 13.5 % |
| `admin_login_connexion_administrateur_desktop` | 1600x1280 | `/_auth/admin/login.html` | 8.43 | 4.5 % |
| `admin_001_dashboard_d_administration_desktop` | 1600x1592 | `/_auth/admin/dashboard.html` | 27.73 | 13.8 % |
| `admin_001_dashboard_d_administration_mobile` | 413x1600 | `/_auth/admin/dashboard.html` | 40.2 | 22.4 % |
| `error_404_page_non_trouv_e_desktop` | 1600x1280 | `/404.html` | 32.68 | 15 % |
| `error_404_page_non_trouv_e_mobile` | 706x1600 | `/404.html` | 26.73 | 15.7 % |
| `b1_sql_index_accueil_du_cours_desktop` | 827x1600 | `/b1-sql/index.html` | 18.28 | 13.4 % |
| `b1_sql_sommaire_sommaire_du_cours_desktop` | 900x1600 | `/b1-sql/sommaire.html` | 14.69 | 9.1 % |
| `b1_sql_sommaire_sommaire_du_cours_mobile` | 329x1600 | `/b1-sql/sommaire.html` | 23.47 | 15.2 % |
| `b1_sql_ch01_chapitre_1_bases_de_donn_es_et_sgbd_desktop` | — | `/b1-sql/chapitres/chapitre1.html` | — | — % |
| `b1_sql_ch01_chapitre_1_bases_de_donn_es_et_sgbd_mobile` | 283x1600 | `/b1-sql/chapitres/chapitre1.html` | 59.08 | 32.9 % |
| `b1_sql_ch02_chapitre_2_types_de_donn_es_et_cr_ation_de_tables_desktop` | 206x1600 | `/b1-sql/chapitres/chapitre2.html` | 31.24 | 16 % |
| `b1_sql_ch03_chapitre_3_interroger_select_where_tri_et_restrictions_desktop` | 237x1600 | `/b1-sql/chapitres/chapitre3.html` | 26.74 | 13.7 % |
| `b1_sql_exercices_18_exercices_guid_s_et_laboratoires_sql_desktop` | 809x1600 | `/b1-sql/exercices/exercices.html` | 93.8 | 39.8 % |
| `b1_sql_examen_simulateur_d_examen_blanc_valuation_finale_desktop` | 460x1600 | `/b1-sql/chapitres/simulateur-examen.html` | 60.62 | 27.7 % |
| `b1_sql_cartes_48_cartes_de_r_vision_desktop` | 1025x1600 | `/b1-sql/chapitres/cartes.html` | 72.64 | 31.2 % |
| `b1_sql_cartes_48_cartes_de_r_vision_mobile` | 268x1600 | `/b1-sql/chapitres/cartes.html` | 80.11 | 37.6 % |
| `b1_sql_memo_m_mo_syntaxique_aide_m_moire_sql_desktop` | 363x1600 | `/b1-sql/chapitres/formules.html` | 59.1 | 26 % |
| `b1_sql_atelier_atelier_simulateur_sqlite_interactif_desktop` | 848x1600 | `/b1-sql/atelier.html` | 52.75 | 23 % |
| `b1_sql_atelier_atelier_simulateur_sqlite_interactif_mobile` | 295x1600 | `/b1-sql/atelier.html` | 89.35 | 42 % |
| `prep_cheatsheet_cheatsheet_html_js_desktop` | 500x1600 | `/preparation-web/index.html` | 77.69 | 35.9 % |

## 3. Lecture honnête de ces chiffres

- Les MAE vont de 8.43 à 93.8 (médiane 31.08) et ne mesurent pas un pourcentage de ressemblance : elles agrègent un décalage global d'échelle, des différences de contenu réel (les pages Stitch sont des maquettes avec données fictives) et les écarts de composition.
- Les références mobiles (largeurs 268 à 706 px) sont des crops verticaux de 1600 px, non des captures de viewport complet : la comparaison mesure la bande haute, pas la page entière.
- Les écrans sans référence dédiée (annales, atelier Web, défi quotidien) ne peuvent pas être comparés pixel à pixel ; ils héritent du gabarit le plus proche.

## 4. Écarts structurels résiduels connus

1. **Progression de parcours** : la carte « Progression du parcours » du sommaire Stitch n'existe pas dans le contenu réel ; elle n'a pas été inventée.
2. **Descriptions de cartes du portail** : les cartes réelles n'embarquent pas de description, la carte est donc plus courte que la référence.
3. **Durées des chapitres** : les données réelles n'exposent pas de durée par chapitre ; la colonne de droite n'affiche que l'état d'accès.
4. **Icônes** : le produit utilise son sprite SVG maison, pas Material Symbols ; les positions et tailles sont alignées, les glyphes diffèrent.
5. **Widget de chat** flottant présent sur toutes les pages (fonctionnalité réelle, absente des maquettes).

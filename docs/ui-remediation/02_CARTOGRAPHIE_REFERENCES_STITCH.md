# 02 — Cartographie des références Stitch

Chaque type de page réel est rattaché à l'écran Stitch le plus proche. Les `screen.png` ont été utilisés pour
les proportions et la densité, les `code.html` pour les tokens, les composants et les états.

| Page réelle | Type | Référence Stitch | Éléments repris | Particularités conservées |
|---|---|---|---|---|
| `index.html` (portail) | Catalogue | `portal_001_portail_du_catalogue_initial_desktop` / `_mobile` | barre supérieure 56 px, hero centré, onglets de niveau, recherche, grille de cartes tactiles, carte de reprise | filtres fonctionnels, recherche, verrous, compteurs réels |
| Accueil de cours | Accueil | `b1_sql_index_accueil_du_cours_desktop` | fil d'Ariane, hero à liseré, badges de métadonnées, encadrés en colonnes, CTA émeraude | contenu propre à chaque matière, liens réels |
| Sommaire | Sommaire | `b1_sql_sommaire_sommaire_du_cours_desktop` / `_mobile` | liste de chapitres en cartes numérotées, méta à droite, responsive empilé | verrous d'accès, libellés de niveau (B3 : « Réservé B3 et plus ») |
| Chapitre | Leçon | `b1_sql_ch01_..._desktop` / `_mobile`, `ch02`, `ch03` | hiérarchie Space Grotesk, encadrés blancs à bord net, titres numérotés, navigation précédent/suivant | sections, formules KaTeX, tableaux, code, QCM, checklist |
| Exercices | Liste d'exercices | `b1_sql_exercices_18_exercices_guid_s_et_laboratoires_sql_desktop` | cartes d'exercice, badge de niveau, corrigé replié | énoncés, tests cachés jamais exposés |
| Examen blanc | Évaluation | `b1_sql_examen_simulateur_d_examen_blanc_valuation_finale_desktop` | en-tête d'évaluation, barème, corrigé replié | règles de score, chronomètre, tentatives |
| Cartes de révision | Flashcards | `b1_sql_cartes_48_cartes_de_r_vision_desktop` / `_mobile` | grille de cartes, recto/verso, retournement | contenu des cartes, progression locale |
| Mémo | Aide-mémoire | `b1_sql_memo_m_mo_syntaxique_aide_m_moire_sql_desktop`, `prep_cheatsheet_cheatsheet_html_js_desktop` | blocs de syntaxe, encadrés de formule, blocs de code | contenu par matière |
| Atelier | Simulateur | `b1_sql_atelier_atelier_simulateur_sqlite_interactif_desktop` / `_mobile` | cadre d'atelier, barre d'outils, console | Monaco, exécution réelle, quota, tests |
| Connexion / inscription | Auth | `auth_001_connexion_inscription_initial_desktop`, `_mobile`, `auth_001_inscription_initial_desktop` | carte blanche centrée, champs 40 px, bouton émeraude | validation, erreurs, cookies, redirections |
| Compte | Compte | `account_001_mon_compte_authentifi_abonnement_desktop` / `_mobile` | carte de compte, sections empilées | niveau réel, clé, déconnexion |
| Admin | Dashboard | `admin_login_...`, `admin_001_dashboard_d_administration_desktop` / `_mobile` | tableau, barre d'outils, cartes de stats | gestion réelle des clés |
| 404 | Statut | `error_404_page_non_trouv_e_desktop` / `_mobile` | message centré, retour portail | routes existantes |
| Défi quotidien | Quiz | `daily_challenge_mobile_quiz` | carte de question, options tactiles, feedback | non instancié comme route dédiée |

## Divergences assumées

- Les exports Stitch reposent sur Tailwind CDN et Material Symbols ; le projet reste en CSS natif et utilise
  `/assets/img/ui-icons.svg`. Aucune dépendance n'a été ajoutée.
- `DESIGN.md` décrit `primary #21C35E` ; cette teinte est utilisée comme accent d'action (`--color-accent`),
  tandis que `--color-primary` reste un émeraude AA (`#006d2f`) pour le texte et les CTA à texte blanc.
  La divergence est documentée, pas silencieuse.
- `untitled_prototype` n'a pas été retenu comme référence : son rôle n'est pas identifiable comme page produit.

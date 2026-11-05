# 05 — Composants réutilisables

> Chaque composant est identifié par sa classe CSS réelle. Les états listés sont ceux du CSS et du JavaScript. Les composants sans équivalent ailleurs sont marqués « spécifique ».
> Preuves : `assets/css/*.css`, `assets/js/*.js`, pages extraites dans `pages/`.

## 1. Composants de structure

| Composant | Classes | Variantes | États | Source |
|---|---|---|---|---|
| Barre supérieure portail | `.topbar`, `.topbar__brand`, `.topbar__nav`, `.topbar__actions` | claire/sombre | sticky, translucide | `portal.css` |
| Marque | `.topbar__brand` | icône + texte, icône seule ≤ 640 px | hover | `portal.css` |
| Lien de navigation | `.topbar__nav-link` | actif implicite | hover, focus | `portal.css` |
| Bouton profil | `.profile-btn` | `.is-authenticated` | hover, focus, connecté | `portal.css` + JS portail |
| Bascule de thème | `.theme-toggle`, `.theme-toggle__sun`, `.theme-toggle__moon` | clair/sombre | 34 × 34 px, icône 17 px | `components.css` |
| Fil d'Ariane | `.crumb` | — | 0,76rem muted | `cours.css` |
| Navigation de cours | `.alnav`, `.alnav__in`, `.alnav__home`, `.alnav__sep`, `.alnav__brand`, `.alnav__links` | actif `.is-active` | sticky, blur, liens pill | `cours.css` |
| Navigation de bas de chapitre | `.chnav` | 2 boutons | — | `cours.css` |
| Pied de page | `.portal-footer` | noir | — | `portal.css` |
| Lien d'évitement | `.skip-nav`, `.skip-link` | visible au focus | position −100 px → 16 px | `index.html` |

## 2. Navigation et filtres

| Composant | Classes | Détail | États |
|---|---|---|---|
| Onglet de niveau | `.level-tab`, `.level-tab__badge`, `.level-tab__title`, `.level-tab__count` | 4 onglets B1/B2/B3/Tous | `.is-active` (noir), `aria-selected` |
| Barre d'onglets génériques | `.tabs`, `.tab` | login (2), forums | `.is-active`, `aria-selected` |
| Barre d'onglets admin | `.tab-bar`, `.tab` | 5 onglets | `.active` noir |
| Onglet de matière (annales) | `.sub-tab-btn` | 8 matières | `.is-active` |
| Recherche portail | `.portal-search`, `.portal-search__icon`, `.portal-search__input` | 480 × 48 px | focus ring, placeholder |
| Barre de statut | `.portal-status-bar` | « Cours de Licence 1 (B1) — 23 cours » | mise à jour live |
| Filtres admin | `.filter-bar` + `.btn.btn-ghost.btn-sm` | Tous/Abonnés/Gratuits/Désactivés | `.active` |
| Sélecteur de langue (lab) | `.lab__picker` | `select` | disabled avant chargement |

## 3. Cartes et listes

| Composant | Classes | Contenu | États |
|---|---|---|---|
| Carte de cours (portail) | `.card.portal-card`, `.card__head`, `.card__icon`, `.badge-level`, `.card__title`, `.card__foot`, `.badge-free`, `.card__shortcut` | icône, niveau, titre, « Ch. 1 gratuit », nombre de chapitres | hover (élévation), masquée par filtre, focus |
| Carte de chapitre | `.toc__item`, `.toc__n`, `.toc__t`, `.toc__d`, `.locknote` | numéro, titre, description, verrou | hover, verrouillé |
| Carte « Reprendre » | `.bf-resume`, `__icon`, `__body`, `__label`, `__title`, `__cta` | progression locale | `hidden` par défaut, animation d'entrée |
| Carte de statistique | `.stat-card`, `.label`, `.value` | 6 compteurs admin | valeurs colorées `v-*` |
| Carte générique | `.card`, `.card-header`, `.card-body` | admin | — |
| Carte projet (Preparation) | `.project-card` (dans `preparation-web/assets/css/style.css`) | titre, état, XP | actif / verrouillé / validé |

## 4. Boutons

| Composant | Classes | Apparence | États |
|---|---|---|---|
| CTA vert 3D | `.btn` (auth/compte) | pill 60 px, fond `#29cc57`, ombre dure | hover `translateY(2px)`, active `translateY(4px)`, disabled 65 % |
| Bouton blanc | `.btn.is-white` | bordure, ombre dure grise | idem |
| Bouton de cours | `.btn`, `.btn--primary` | pill, bordure, fond blanc ou accent | hover, focus |
| Bouton admin | `.btn-success`, `.btn-ghost`, `.btn-danger`, `.btn-warning`, `.btn-sm` | pill, ombre 3 px | hover, actif |
| Bouton icône | `.icon-button`, `.mini-button`, `.ghost-button`, `.primary-button` | Preparation Web | `is-hidden` |
| Bouton de lab | `.lab__btn`, `--run`, `--stop`, `--submit`, `--help`, `--ghost`, `--inline-help` | 4 familles d'action | disabled, busy (spinner), caché |
| Option de QCM | `.opt` | pleine largeur, texte à gauche | hover, `.is-correct`, `.is-wrong`, `disabled` |
| Bouton de carte | `.fc` | carte retournable | `.is-flipped`, `aria-pressed` |

## 5. Formulaires

| Composant | Classes | Détail |
|---|---|---|
| Champ | `input`, `select`, `textarea` stylés par page | 48 px (auth), 36–40 px (admin) |
| Groupe | `.auth-form-group`, `.form-group`, `.auth-label` | label au-dessus, 0,72–0,8rem, 700 |
| Message | `.msg`, `.msg-error`, `.msg-success`, `.auth-message`, `.auth-message-error` | bandeau inline, `role="alert"` |
| Spinner de bouton | `.spinner`, `.auth-spinner` | 18 px, rotation 0,6 s |
| Case à cocher | `.checkbox`, `[data-mark-done]` | checklist de maîtrise |
| Interrupteur | `.toggle`, `.toggle-track`, `.toggle-label` | Preparation : « Structure + CSS » |
| Champ de console | `[data-lab-stdin]` | `<details>` + textarea |
| Champ question tuteur | `[data-lab-question]` | input texte, maxlength 300 |

## 6. Composants pédagogiques

### 6.1 Encadrés `.box`

| Variante | Couleur d'accent | Fond | Usage |
|---|---|---|---|
| `.box--situation` | orange foncé | `#fff4ee` | mise en situation |
| `.box--objectifs` | vert foncé | `#f0fbf5` | objectifs pédagogiques |
| `.box--intuition` | cyan | `#f0fafc` | niveau 1 — intuition |
| `.box--tech` | bleu | `#f1f5ff` | détail technique, auto-évaluation |
| `.box--pitfall` | ambre | `--warn-bg` | erreurs classiques |
| `.box--mnemo` | vert | `#eefaf3` | moyen mnémotechnique |
| `.box--it` | teal | `#f0fdfa` | lien avec l'informatique |
| `.box--method` | brun | `#fffaf0` | méthodologie |
| `.box--revision` | gris | blanc, bordure pointillée | révision active |

Structure : `.box`, `.box__title` (icône + libellé 800), puis listes/paragraphes.

### 6.2 Blocs de code et pseudo-code

| Composant | Classes | Détail |
|---|---|---|
| Pseudo-code | `.pseudo`, `.pseudo b` | fond `#f3eee5`, rayon 12 px, overflow-x auto |
| Sortie | `.out` | bloc de résultat |
| Code coloré | `pre > code`, `.k` | coloration syntaxique légère (mot-clé) |
| Tableau comparatif | `table` | 3–4 colonnes pseudo/Pascal/Python |

### 6.3 Code lab (composant central)

Structure observée dans `code-lab.js` et `code-lab.css` :

```
.lab[data-lab]
├─ .lab__head
│  ├─ h3.lab__title
│  └─ .lab__meta : .lab__lang, .lab__training, .badge--n1/n2, .lab__formative
├─ .lab__body
│  ├─ p.lab__goal
│  ├─ p.lab__note (avis de suspension éventuel)
│  ├─ .lab__brief
│  ├─ .lab__sample > .lab__sample-part (entrée / sortie attendue)
│  └─ details.lab__hints
├─ .lab__editor-wrap (Monaco ou .lab__analyse-grid)
├─ .lab__bar
│  ├─ .lab__picker (select langue)
│  ├─ .lab__btn--run / --stop
│  ├─ .lab__btn--submit
│  ├─ .lab__btn--help
│  ├─ .lab__btn--reset
│  ├─ .lab__btn--ghost (mode texte / formulaire)
│  ├─ .lab__badge-provenance
│  └─ .lab__status[data-kind][role=status][aria-live=polite]
├─ details.lab__stdin (summary + textarea)
├─ .lab__console
│  ├─ .lab__tabs[role=tablist] (Sortie / Erreurs / Détails)
│  ├─ .lab__panes > pre.lab__pane[data-empty]
│  └─ .lab__console-help
├─ .lab__report[role=region][aria-label="Résultat de la correction"]
└─ .lab__tutor : titre, input, texte, notice
```

États de statut (`STATUS_LABEL`) : `idle`, `running`, `success`, `error`, `rate_limited`, `timeout`, `cancelled`. Libellés : « Prêt — Ctrl + Entrée pour exécuter », « Exécution en cours… », « Exécution terminée », « Trop de demandes d'exécution », « Délai d'exécution dépassé (boucle infinie) », « Exécution interrompue ».

Badge de provenance : « Serveur distant » (icône cloud) ou « Navigateur » / « SQLite 3 (WebAssembly) » selon le moteur.

### 6.4 QCM

| Composant | Classes | Détail |
|---|---|---|
| Bloc | `.qcm` | compteur `counter-reset` |
| Question | `.q`, `.q__stem` | numérotation « Q1. » en CSS |
| Options | `.opts`, `.opt` | boutons empilés |
| Explication | `.q__exp` | masquée, `.is-shown` après réponse |
| Score | `.qcm__score` | sticky bas, `.is-shown`, `role=status`, `aria-live=polite` |
| Palier | `.band.bandrow--low/mid/good/top` | 4 bandes de maîtrise |

### 6.5 Flashcards et révision

| Composant | Classes | Détail |
|---|---|---|
| Grille | `.cards` | `auto-fill minmax(240px,1fr)` |
| Carte | `.fc`, `.fc__in`, `.fc__face`, `.fc__back`, `.fc__hint` | rotation 3D 0,5 s, `is-flipped` |
| Checklist | `.check` | puces personnalisées |
| Bandes de maîtrise | `.bands`, `.bandrow` | 4 lignes colorées |

### 6.6 Annales

| Composant | Classes | Détail |
|---|---|---|
| Panneau matière | `.subject-pane`, `.pane-header`, `.pane-header__title`, `.pane-meta` | 8 matières |
| Badge numéroté | `.badge-num` | numéro de matière |
| Bloc QCM | `.qcm-box`, `.score-bar`, `.score-val` | score par matière |
| Question | `.q-item`, `.q-num`, `.q-text`, `.q-options`, `.opt-btn`, `.opt-key`, `.q-explanation` | 23 questions |
| Bloc code | `.code-box`, `.code-statement` | énoncé de code |
| Note | `.grade-pill`, `.grade-na` | note ou « N/A » |

## 7. Surfaces d'administration

| Composant | Classes | Détail |
|---|---|---|
| Entrée de journal | `.log-entry`, `.log-icon`, `.log-body`, `.log-title`, `.log-detail`, `.log-time` | icônes colorées par type |
| Tableau | `table`, `th`, `td`, `.table-wrapper` | scroll horizontal |
| Badge | `.badge-success`, `-warning`, `-danger`, `-info` | pill 60 px |
| État vide | `.empty-state`, `.icon` | centré, muted |
| Modale | `.modal-overlay`, `.modal`, `.modal-actions` | overlay 55 %, 420 px |
| Toast | `.toast`, `.toast.success`, `.toast.error` | bas centre, 0,3 s |

## 8. Composants de l'atelier Preparation Web

| Composant | Classes | Détail |
|---|---|---|
| Rail projets | `.project-rail`, `.rail-brand`, `.brand-mark`, `.profile-card`, `.profile-label`, `.rank-line`, `.progress-track`, `.project-list`, `.rail-actions` | 280 px, repliable |
| Barre de stats | `.stats-strip`, `.progress-pill` | 4 cellules |
| Panneau de cours | `.lesson-panel`, `.lesson-header`, `.lesson-stage`, `.lesson-mini`, `.lesson-exercise`, `.lesson-nav`, `.step-indicator` | étapes précédent/suivant |
| Éditeur | `.editor-pane`, `.editor-toolbar`, `.tabs`, `.editor-card`, `.editor-label`, `textarea` | 3 onglets HTML/CSS/JS |
| Aperçu | `.preview-pane`, `.preview-header`, `.preview-actions`, `.toggle`, `iframe`, `.feedback-card` | iframe + critères |
| Quiz | `.quiz-section`, `.section-heading`, `.quiz-content` | après validation |
| Modales | `.modal-backdrop`, `.modal`, `.modal-close` | Progression, Solution |
| Panneau IA | `.ai-fab`, `.ai-panel`, `.ai-header`, `.ai-body`, `.ai-messages`, `.ai-input` | indices sans code |
| Autocomplétion | `.autocomplete` | listbox |
| Toast | `.toast` | statut |

## 9. Widget de chat RD-AI (global)

Injecté par `rd-ai-chat.js` sur les pages qui chargent le script :

| Élément | Classe | Détail |
|---|---|---|
| Bulle flottante | `.rdai-bubble` | bouton, aria-label « Ouvrir le chat RD-AI » |
| Lien WhatsApp | `.rdai-whatsapp` | lien externe `wa.me` |
| Panneau | `.rdai-panel` | `role` implicite, aria-label « Chat RD-AI » |
| En-tête | `.rdai-header`, `.rdai-header-btn` | WhatsApp, effacer, fermer |
| Messages | `.rdai-msg`, `.rdai-msg-user`, `.rdai-msg-ai`, `.rdai-msg-avatar`, `.rdai-msg-content` | bulles |
| Saisie | `.rdai-input` | textarea, placeholder « Pose ta question… » |
| Envoi | `.rdai-send` | désactivé tant que vide |

États : fermé/ouvert (`rdai-open`), actif (`rdai-active`), en train d'écrire (`.rdai-typing`).

## 10. Composants absents (à ne pas inventer)

- Pas de barre latérale sur les cours, pas de menu burger global.
- Pas de système de notifications, d'avatar image, de profil public.
- Pas de table de données triable/paginée côté client (seul le journal admin pagine).
- Pas de graphiques chartés, pas de cartes géographiques, pas de timeline animée.
- Pas de modale sur le portail ni sur les pages de cours.

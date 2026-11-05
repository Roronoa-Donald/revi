# 08 — Fenêtres modales et panneaux

> Aucune modale n'existe sur le portail, les pages de cours, la connexion ou les annales. Les surfaces modales sont concentrées sur **l'administration** et **Preparation Web**, plus les panneaux intégrés du code lab et le widget de chat.

## 1. Modale de confirmation admin

| Élément | Valeur observée |
|---|---|
| Conteneur | `#confirmModal.modal-overlay` |
| Fond | `rgba(0,0,0,0.55)`, couvre l'écran, `z-index: 100` |
| Boîte | `.modal`, fond blanc, rayon 16 px, padding 24, largeur max 420 |
| Titre | `#modalTitle`, 0,95rem |
| Message | `#modalMessage`, 0,85rem, muted, centré |
| Actions | « Annuler » (`.btn.btn-ghost`) et « Confirmer » (`.btn.btn-danger`) |
| Ouverture | `.modal-overlay.visible` → `display: flex` |
| Fermeture | bouton Annuler, clic overlay (à vérifier), touche Échap (non implémentée dans le HTML) |

**Usage confirmé par le code** : suppressions, désactivations, révocations de session et retraits d'abonnement passent par cette modale. Le bouton « Confirmer » exécute l'action stockée dans `pendingAction`, puis ferme et affiche un toast.

État visuel : overlay sombre + boîte centrée ; aucun piège de focus déclaré, aucun `aria-modal` sur cet exemple (à corriger si l'on vise WCAG).

## 2. Toast admin

| Élément | Valeur |
|---|---|
| Conteneur | `#toast.toast` |
| Position | fixe, bas 22 px, centré horizontalement |
| Apparence | pill noire, texte blanc, 0,8rem, ombre |
| Variantes | `.success` (vert foncé), `.error` (rouge foncé) |
| Animation | `translateY(80px)` + opacité 0 → 0 + opacité 1 en 0,3 s |
| Durée | masqué par JS après quelques secondes (à vérifier) |

Sert de retour d'action pour **toutes** les actions admin (création, abonnement, suppression, clé IA…).

## 3. Panneau « Progression » (Preparation Web)

| Élément | Valeur |
|---|---|
| Conteneur | `#progressModal.modal-backdrop.is-hidden` |
| Rôle | `dialog`, `aria-modal="true"`, `aria-labelledby="progressTitle"` |
| Boîte | `.modal` |
| Fermeture | bouton `.icon-button.modal-close` aria-label « Fermer » |
| Contenu | eyebrow « Progression », titre « Vos 12 projets », `#progressTimeline`, `#progressList` |
| Ouverture | bouton `#progressTrigger` (pill « 0/12 », `aria-haspopup="dialog"`) |

Le contenu est généré : une timeline et une liste de 12 projets avec leur état.

## 4. Panneau « Solution » (Preparation Web)

| Élément | Valeur |
|---|---|
| Conteneur | `#solutionModal.modal-backdrop.is-hidden` |
| Rôle | `dialog`, `aria-modal`, `aria-labelledby="solutionTitle"` |
| Titre | « Observez, comprenez, puis réécrivez » |
| Eyebrow | « Solution bloquee contre le copier-coller » |
| Texte | « La solution apparait apres au moins deux echecs… » |
| Contenu | `<pre id="solutionContent" class="solution-box">` |
| Accès | bouton `#solutionBtn`, masqué (`is-hidden`) tant que la solution n'est pas disponible |

**Règle métier** : la solution n'est demandée au serveur qu'après **au moins deux échecs** (403 sinon). Le panneau ne s'ouvre donc pas avant.

## 5. Panneau de l'assistant IA (Preparation Web)

| Élément | Valeur |
|---|---|
| Déclencheur | `.ai-fab#aiFab`, aria-label « Ouvrir l aide IA » |
| Panneau | `#aiPanel.ai-panel.is-hidden`, `role="dialog"`, `aria-modal`, `aria-labelledby="aiTitle"` |
| En-tête | eyebrow « Assistant indices », titre « Besoin d un indice ? », bouton fermer |
| Corps | note « Je donne des indices textuels uniquement, sans code. », `#aiMessages`, champ `#aiInput` (« Explique ma difficulte... »), bouton « Demander » |
| État | fermé / ouvert ; messages ajoutés dans `#aiMessages` |

C'est un panneau flottant, pas une modale plein écran ; il cohabite avec l'éditeur.

## 6. Autocomplétion (Preparation Web)

| Élément | Valeur |
|---|---|
| Conteneur | `#autocompleteBox.autocomplete.is-hidden` |
| Rôle | `listbox`, aria-label « Autocompletion » |
| Apparence | liste flottante positionnée près de l'éditeur |
| États | masquée / visible, options surlignées |

## 7. Panneaux intégrés au code lab

| Panneau | Classe | État initial | Ouverture |
|---|---|---|---|
| Entrée du programme | `details.lab__stdin` | replié, **déplié automatiquement si une entrée est prévue** | clic sur le résumé |
| Indices | `details.lab__hints` | replié | clic sur le résumé |
| Console | `.lab__console` | visible, onglet « Sortie » | onglets |
| Sortie | `pre.lab__pane--out` | actif, vide (`data-empty="1"`) | onglet Sortie |
| Erreurs | `pre.lab__pane--err` | masqué | onglet Erreurs |
| Détails | `pre.lab__pane--detail` | masqué | onglet Détails |
| Rapport de correction | `.lab__report[hidden]` | masqué | après validation |
| Tuteur IA | `.lab__tutor[hidden]` | masqué | bouton « Expliquer mon erreur » |
| Aide en ligne | `.lab__console-help[hidden]` | masqué | quand une erreur est disponible |

**Détail d'état important** : les panneaux vides utilisent `data-empty="1"` et un texte d'attente propre (« Rien à afficher pour l'instant. Lancez l'exécution. », « Aucune erreur signalée. », « Les détails de la dernière exécution apparaîtront ici. »).

## 8. Panneau du chat RD-AI (widget global)

| Élément | Classe | État |
|---|---|---|
| Bulle | `.rdai-bubble` | flottante, fermée par défaut |
| Panneau | `.rdai-panel` | ouvert : classes `rdai-open` et `rdai-active` sur le conteneur |
| En-tête | `.rdai-header` | WhatsApp, effacer, fermer |
| Messages | `.rdai-msg-user`, `.rdai-msg-ai`, `.rdai-typing` | ajout dynamique |
| Saisie | `.rdai-input` | textarea, auto-extension |
| Envoi | `.rdai-send` | `disabled` tant que le champ est vide |

Le panneau est en position flottante (bas droite) et n'occulte pas la page.

## 9. Panneau d'aperçu (Preparation Web)

Ce n'est pas une modale mais un **panneau fixe** de la zone de travail : `#previewFrame` (iframe `sandbox="allow-scripts"`), avec en-tête `Apercu temps reel`, interrupteur `#cssToggle` (« Structure + CSS ») et bouton « Rafraichir ». Le `feedback-card` sous l'iframe liste les critères de validation.

## 10. Ce qui n'existe pas

- Pas de modale de connexion rapide depuis une page de cours.
- Pas de tiroir latéral (drawer) sur mobile : les menus se replient, ils ne s'ouvrent pas en overlay.
- Pas de modale de confirmation sur le portail, le compte ou les annales.
- Pas de système de notification empilable : un seul toast à la fois.
- Pas de `dialog` natif (`<dialog>`) dans le produit ; tout est en `div` + classes.

## 11. Recommandations de reconstruction

- Reproduire la distinction **overlay plein écran** (admin) vs **panneau flottant** (IA Preparation, chat RD-AI) vs **panneau intégré** (console de lab).
- Conserver les états « fermé par défaut » : le tuteur, le rapport, la solution et l'IA ne doivent jamais apparaître au chargement.
- Pour Stitch, créer des variantes explicites : `modal-ouvert`, `modal-fermé`, `panneau-ouvert`, `panneau-fermé`, `details-replié`, `details-déplié`.

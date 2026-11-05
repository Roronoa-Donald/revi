# 21 — Comportements visuels et interactifs

> Détail des animations, transitions, rétroactions et comportements dynamiques observés dans le CSS/JS. Aucune exécution runtime : les durées sont celles déclarées.

## 1. Transitions et animations

| Élément | Animation | Durée / courbe |
|---|---|---|
| Carte de cours (survol) | `transform: translateY(-2px)` + ombre | 0,18 s ease |
| Bouton vert | enfoncement (ombre dure réduite) | 0,06 s |
| Onglet | fond + couleur | 0,15 s |
| Flashcard | `rotateY(180deg)` | 0,5 s ease |
| Carte « Reprendre » | apparition (opacité + translation) | 0,3 s |
| Modale admin | overlay opacité + boîte scale | 0,2 s |
| Toast | translation verticale + opacité | 0,3 s |
| Panneau chat | translation + opacité | 0,2 s |
| Statut de lab | changement de couleur | 0,15 s |
| Spinner | rotation continue | 0,6 s linéaire |
| Barre de progression | largeur | 0,3 s ease |
| Lien d'évitement | apparition au focus | immédiate |

## 2. Mouvement réduit

`@media (prefers-reduced-motion: reduce)` est présent dans `tokens.css` et `portal.css` : animations et transitions ramenées à `0.01ms`, défilement non fluide. À reproduire.

## 3. Comportements de défilement

| Comportement | Détail |
|---|---|
| Topbar portail | `position: sticky; top: 0`, fond translucide + `backdrop-filter: blur(12px)` |
| `alnav` | sticky, bordure basse à l'apparition du défilement (classe `is-scrolled`, à vérifier) |
| Score QCM | `position: sticky; bottom: 16px` |
| Défilement fluide | `scroll-behavior: smooth` sur `html` (hors mouvement réduit) |
| Ancre « Accès rapide » | saut vers `#grid` |
| Tableaux | défilement horizontal interne |
| Console de lab | défilement vertical interne, auto-scroll vers le bas après exécution |

## 4. Rétroactions

| Action | Rétroaction visuelle | Rétroaction textuelle |
|---|---|---|
| Survol d'un lien | soulignement/couleur | — |
| Focus clavier | anneau bleu 2 px | — |
| Clic sur option QCM | couleur verte/rouge | explication révélée |
| Exécution | spinner + bouton Stop | statut « Exécution en cours… » |
| Validation | spinner | rapport de correction |
| Copie de code | changement d'icône (à vérifier) | « Copié » (à vérifier) |
| Création admin | — | toast |
| Erreur admin | — | toast rouge |
| Envoi de chat | bulle « en train d'écrire » | — |
| Déverrouillage Preparation | transition vers l'atelier | toast |

## 5. Comportements dynamiques notables

| Comportement | Surface | Détail |
|---|---|---|
| Filtrage instantané | portail | recherche + onglets, sans rechargement |
| Persistance du niveau | portail | `localStorage` |
| Compteur de cours | portail | mis à jour à chaque filtre |
| Carte Reprendre | portail | calculée depuis la progression locale, affichée seulement si > 0 |
| Ouverture/fermeture du bandeau | portail | bouton ×, non persistant |
| Bascule de vue auth | login | 4 vues, `hidden` |
| Sélection de niveau | inscription | classes et `aria-checked` |
| Validation de formulaire | login/admin | désactivation du bouton, spinner |
| Retour automatique | reset | 1,6 s |
| Compte à rebours | examen | `setInterval` 1 s |
| Correction QCM | cours | verrouillage des options |
| Score sticky | cours | apparaît après la 1re réponse |
| Progression | cours | case maîtrisée + carte Reprendre |
| Redimensionnement | Preparation | poignées `.resizer` |
| Aperçu live | Preparation | iframe rechargée à la validation/rafraîchissement |
| Autocomplétion | Preparation | liste filtrée au fil de la frappe |
| Panneau IA | Preparation | messages ajoutés sans rechargement |
| Tabs admin | admin | bascule `display` |
| Debounce | admin | 300 ms sur la recherche |
| Polling | admin (à vérifier) | rafraîchissement des stats |
| Chat | global | historique local, effacement |

## 6. Comportements au chargement

| Page | Séquence |
|---|---|
| Portail | rendu statique immédiat, puis `/api/verify` met à jour le profil |
| Cours | rendu statique, puis `cours.js` initialise QCM, cartes, progression |
| Chapitre | rendu, puis `code-lab.js` monte Monaco sur chaque `.lab` |
| Login | rendu, puis `auth-check.js` redirige si déjà connecté |
| Compte | `stateLoading` jusqu'à `/api/verify` + `/api/me` + `/api/courses` |
| Admin dashboard | `body` masqué jusqu'à `/api/admin/verify` |
| Preparation | porte (auth/abonnement/mot de passe) avant l'atelier |
| Annales | rendu statique complet, puis JS de QCM |

## 7. États de focus et accessibilité interactive

- `:focus-visible` avec anneau net, jamais supprimé sans remplacement.
- Lien d'évitement en première position dans le DOM.
- Onglets avec `role="tablist"`, `role="tab"`, `aria-selected`.
- Messages de statut en `aria-live="polite"` (lab, score).
- Boutons icône avec `aria-label`.
- Modales Preparation avec `role="dialog"` et `aria-modal`.
- **Manques** : pas de piège de focus dans les modales admin, pas d'`aria-expanded` systématique sur les disclosures, pas de `aria-current` sur le lien de nav actif (seulement une classe), contrastes de texte muted parfois limites.

## 8. Thème

- Clair par défaut, forcé (`color-scheme: light`).
- Bascule `data-theme="dark"` sur `<html>`, icônes soleil/lune.
- Persistance dans `localStorage`.
- Aucune détection `prefers-color-scheme` (choix explicite de l'utilisateur).
- Le chat et la console admin ne suivent pas le thème (couleurs fixes).

## 9. Sons et vibrations

Aucun. Pas d'audio, pas de vibration, pas de notification navigateur.

## 10. Détails à reproduire pour la crédibilité

1. L'ombre dure du bouton vert (signature visuelle du CTA de paiement).
2. Les encadrés colorés à liseré gauche, sans ombre.
3. Le score QCM collant en bas de page.
4. Le statut de lab qui change de couleur avec un point animé.
5. Les cartes qui se soulèvent de 2 px au survol, jamais plus.
6. Les 4 bandes de maîtrise colorées.
7. Le bandeau atelier avec cadenas sur le portail.

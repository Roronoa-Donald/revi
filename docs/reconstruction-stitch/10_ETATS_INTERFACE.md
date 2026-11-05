# 10 — États d'interface

> Ce document liste les états **visuellement ou fonctionnellement distincts** à reconstruire. Pour chacun : déclencheur, apparence, classe/attribut qui le porte, preuve.
> Rappel : aucun runtime n'a été exécuté ; les états temporels sont déduits du JS.

## 1. Matrice générale

| État | Où | Traduction visuelle | Porteur |
|---|---|---|---|
| Normal | partout | styles de base | — |
| Survol | liens, cartes, boutons | élévation, bordure accent, ombre réduite | `:hover` |
| Focus | tous les interactifs | anneau 2 px `#3556d9`, offset 2 px | `:focus-visible` |
| Actif | onglets, boutons | onglet noir/blanc, bouton enfoncé | `.is-active`, `:active` |
| Désactivé | boutons, options | opacité 0,65, curseur interdit | `:disabled`, `[disabled]` |
| Chargement | compte, admin, lab, boutons | spinner, squelette de texte | `.spinner`, `.lab__spinner`, `.lab__loading` |
| Vide | portail, admin, console, lab | message centré, icône, texte muted | `.empty-state`, `[data-empty]` |
| Erreur | formulaires, lab, admin | bandeau rouge, toast rouge, statut rouge | `.msg-error`, `.toast.error`, `data-kind="error"` |
| Succès | formulaires, lab, admin | bandeau vert, toast vert, statut vert | `.msg-success`, `.toast.success`, `data-kind="success"` |
| Confirmation | admin | modale overlay + actions | `.modal-overlay.visible` |
| Avertissement | lab, bandeaux | statut ambre | `data-kind="rate_limited"` |

## 2. Portail

| État | Déclencheur | Description |
|---|---|---|
| Normal | chargement | grille de 70 cartes, onglet B1 actif, « 23 cours » |
| Filtre actif | clic onglet | cartes non correspondantes `display:none`, libellé « Cours de Licence X » |
| Recherche | saisie | filtrage titre/niveau, compteur mis à jour |
| Aucun résultat | recherche sans correspondance | `#portalEmptyState` visible : bloc pointillé, icône, titre, description, bouton « Réinitialiser » |
| Reprise disponible | progression locale > 0 | carte `#bf-resume` visible, titre « Cours · 42 % », CTA « Continuer » |
| Reprise absente | aucune progression | section `hidden` |
| Atelier verrouillé | `?preparation=locked` | bandeau `#prepLockedMsg` visible, icône cadenas, bouton fermer |
| Connecté | `/api/verify` authentifié | bouton profil `is-authenticated`, title = nom ou email |
| Déconnecté | pas de session | bouton profil neutre |

## 3. Connexion / compte

| État | Déclencheur | Description |
|---|---|---|
| Connexion | défaut | titre « Connexion », onglet gauche actif |
| Inscription | onglet / `?mode=register` | cartes de niveau, CTA « Créer mon compte » |
| Envoi | soumission | bouton désactivé, pas de spinner sur login (contrairement à admin) |
| Erreur | réponse non OK | bandeau rouge, bouton réactivé |
| Succès inscription | 200 | bandeau vert, redirection |
| Chargement compte | ouverture | `stateLoading` : logo + « Chargement… » |
| Anonyme | `/api/verify` faux | `stateAnon` : cadenas, « Connexion requise », deux boutons |
| Compte | authentifié | `stateAccount` : email, lignes niveau/abonnement/appareil |
| Abonné | `subscribed:true` | statut « Actif » vert, échéance dorée, bloc « Renouveler » |
| Gratuit | `subscribed:false` | statut « Gratuit », bloc « S'abonner » |
| Paiement requis | `?payment=required` | message d'erreur rouge en haut |
| Niveau refusé | `?level=denied` | **aucun message dédié observé** (variable lue mais non exploitée dans le HTML) |
| Paiement désactivé | config `enabled:false` | bouton abonnement désactivé + message |
| Retour paiement | `?payment=return&id=…` | message « Vérification du statut… », puis succès/erreur |
| Catalogue en chargement | après rendu | « Chargement du catalogue… » |
| Catalogue indisponible | fetch échoue | « Catalogue indisponible. » |
| Niveau verrouillé | niveau supérieur | section opacité 0,65, cartes `.is-locked` |

## 4. Code lab

| État | `data-kind` | Message | Indices visuels |
|---|---|---|---|
| Prêt | `idle` | « Prêt — Ctrl + Entrée pour exécuter » | icône point |
| Prêt (brouillon) | `idle` | « Prêt — Brouillon sans vérification automatique. » | — |
| Chargement éditeur | — | « Préparation de l'éditeur… » | spinner dans la zone d'éditeur |
| Exécution | `running` | « Exécution en cours… » | spinner dans le statut, bouton Stop visible, Run masqué |
| Succès | `success` | « Exécution terminée » ou « (aucune sortie) » | onglet Sortie, compteur |
| Erreur | `error` | message du moteur / « Une erreur est survenue… » | onglet Erreurs, compteur |
| Quota | `rate_limited` | « Trop de demandes d'exécution » | ambre |
| Délai | `timeout` | « Délai d'exécution dépassé (boucle infinie) » | rouge |
| Interrompu | `cancelled` | « Exécution interrompue par l'utilisateur. » | — |
| Validation en cours | `running` | « Vérification des tests… » / « Vérification formative en cours… » | spinner |
| Validé | — | « Exercice validé » | rapport vert |
| À revoir | — | « Exercice à revoir : n / N test(s) validé(s) » | rapport rouge |
| Suspendu | — | « Validation suspendue » (bouton désactivé) + avis dans le corps | bouton grisé |
| Session expirée | — | « Votre session a expiré. Rechargez la page et reconnectez-vous. » | erreur |
| Service indisponible | — | « Le service d'exécution est momentanément indisponible. » | erreur |
| Tuteur en attente | — | panneau ouvert, texte « … » | panneau visible |
| Tuteur indisponible | — | notice dans le panneau | notice |

**Panneaux vides** : Sortie → « Rien à afficher pour l'instant. Lancez l'exécution. » ; Erreurs → « Aucune erreur signalée. » ; Détails → « Les détails de la dernière exécution apparaîtront ici. »

## 5. QCM

| État | Déclencheur | Visuel |
|---|---|---|
| Non répondu | défaut | options neutres, explication masquée, score masqué |
| Répondu correct | clic bonne option | option verte `.is-correct`, explication `.is-shown`, options désactivées |
| Répondu faux | clic mauvaise option | option rouge `.is-wrong` + bonne option verte, explication affichée |
| Score | après ≥ 1 réponse | barre sticky `Score : n/N (p %)` + bande de maîtrise |
| Maîtrise | `data-mastery="1"` et p < 95 | mention « reprenez les notions faibles… » |
| Verrouillé | `data-done="1"` | plus aucun clic possible |

Quatre bandes : `< 50 %` (rouge), `50–69 %` (ambre), `70–94 %` (vert clair), `≥ 95 %` (vert).

## 6. Flashcards et progression

| État | Déclencheur | Visuel |
|---|---|---|
| Recto | défaut | face avant, `aria-pressed="false"` |
| Verso | clic/Entrée/Espace | rotation 180°, `aria-pressed="true"` |
| Chapitre non coché | défaut | case vide |
| Chapitre coché | clic | case cochée, persistée |
| Chronomètre arrêté | défaut | bouton « Démarrer » actif |
| Chronomètre en cours | clic | bouton désactivé, `mm:ss` |
| Temps écoulé | 0 | texte « Temps écoulé » |

## 7. Admin

| État | Déclencheur | Visuel |
|---|---|---|
| Vérification | chargement | `body { display:none }` jusqu'à `html.admin-authenticated` |
| Chargement des tableaux | ouverture | ligne unique `.empty-state` avec icône horloge + « Chargement... » |
| Liste vide | filtre sans résultat | `.empty-state` centré |
| Erreur API | réponse 500 | toast rouge, tableau inchangé |
| Session expirée | 401 | redirection immédiate vers login admin |
| Confirmation | action destructive | modale overlay |
| Succès action | réponse OK | toast vert |
| Onglet actif | clic | onglet noir, panneaux masqués |
| Clé IA en cooldown | 429 fournisseur | statut/cooldown dans le tableau (colonnes dédiées) |
| Modèle personnalisé | choix « custom » | champ texte affiché à côté du select |

## 8. Preparation Web

| État | Déclencheur | Visuel |
|---|---|---|
| Non connecté | status `authenticated:false` | porte d'entrée (à vérifier : le HTML statique n'a pas de vue anonyme) |
| Non abonné | status `reason:"subscription"` | message d'abonnement |
| Verrouillé | `unlocked:false` | formulaire de mot de passe de section |
| Déverrouillé | `unlocked:true` | atelier complet |
| Projet verrouillé | projet précédent non validé | carte grisée, pas de clic |
| Projet actif | sélection | panneau de cours + éditeur chargés |
| Projet validé | validation | feedback vert, XP, badge |
| Échec validation | erreurs | liste des critères en rouge dans `#feedbackList` |
| Indice utilisé | clic Indice | texte révélé, malus XP |
| Solution disponible | ≥ 2 échecs | bouton visible, modale |
| Quiz verrouillé | projet non validé | section masquée/inerte |
| Sauvegarde locale | défaut | « Local » |
| Sauvegarde distante | connecté | « Synchronisé » (à vérifier) |
| Rail replié | clic Projets | largeur réduite |
| Focus code | clic Focus | panneaux latéraux masqués |
| Toast | action | message temporaire |

## 9. Chat RD-AI

| État | Déclencheur | Visuel |
|---|---|---|
| Fermé | défaut | bulle seule |
| Ouvert | clic bulle | panneau, classe `rdai-open` |
| Saisie vide | défaut | bouton envoyer désactivé |
| Envoi | frappe | bouton actif |
| Réponse en cours | après envoi | bulle `.rdai-typing` |
| Erreur | réseau/API | message d'erreur dans le fil |
| Historique vidé | corbeille | fil vide |

## 10. Erreurs pleine page

| État | Déclencheur | Visuel |
|---|---|---|
| 404 | URL inconnue, fichier hors allowlist | page `404.html` : code géant, titre, texte, 2 actions |
| 403 | chemin bloqué | texte brut « Forbidden » (pas de page stylée) |
| 401 API | session invalide | JSON, puis redirection JS selon la surface |
| 500 API | erreur serveur | JSON `{message:'Erreur serveur'}` + toast |

**À ne pas inventer** : il n'existe pas de page 500 stylée, pas de page « maintenance », pas d'écran hors ligne.

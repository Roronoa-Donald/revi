# 09 — Boutons et interactions

> Inventaire des actions réelles, classées par surface. Chaque ligne indique le libellé affiché, l'effet et l'état.
> Les actions sans cible trouvée sont signalées.

## 1. Portail

| Libellé / icône | Type | Effet | État |
|---|---|---|---|
| Logo « cours.interactifs » | lien | `/index.html` | — |
| Épreuves | lien | `epreuves/index.html` | — |
| Atelier | lien | `preparation-web/index.html` | — |
| Mon compte | lien | `/_auth/account.html` | — |
| Icône profil | lien | `/_auth/account.html` | `.is-authenticated` si connecté, title = nom |
| Soleil / lune | button | bascule `data-theme` + persistance | aria-label « Activer le mode sombre » |
| Accès rapide | lien | `#grid` | visible au focus |
| Onglet B1 / B2 / B3 / Tous | button (role=tab) | filtre les cartes, met à jour compteur et libellé | `.is-active`, `aria-selected` |
| Recherche | input | filtre en direct sur titre + niveau | focus ring |
| Fermer le bandeau atelier | button | masque `#prepLockedMsg` | aria-label « Fermer » |
| Carte de cours | lien | `/<cours>/sommaire.html` | hover élévation |
| « Continuer » (carte Reprendre) | lien | dernier cours | visible si progression |
| Réinitialiser les filtres (état vide) | button | recherche vide + niveau « Tous » + focus recherche | — |

## 2. Pages de cours

| Libellé | Surface | Effet |
|---|---|---|
| Portail (maison) | `alnav` | `/` |
| Nom du cours | `alnav` | `index.html` |
| Sommaire / Ch. N / Cartes / Mémo / Exercices / Atelier / Examen | `alnav` | page correspondante ; lien courant `.is-active` |
| Fil d'Ariane | haut de page | remonte index/sommaire |
| Commencer / Commencer le chapitre 1 | accueil, sommaire | `chapitres/chapitre1.html` |
| Carte de chapitre (`.toc__item`) | sommaire | chapitre ou ressource ; verrouillée si non autorisé |
| Retour sommaire / Chapitre suivant | `chnav` | navigation séquentielle |
| Options de QCM (`.opt`) | chapitre, examen | révèle correction + explication, désactive les options |
| Flashcard (`.fc`) | cartes | retourne recto/verso |
| Démarrer (chronomètre) | simulateur d'examen | démarre le compte à rebours, se désactive |
| Case « Je considère ce chapitre maîtrisé » | chapitre | enregistre en localStorage |
| Boutons de code lab | chapitre, atelier | voir § 5 |

## 3. Connexion / inscription / mot de passe

| Libellé | Effet | État |
|---|---|---|
| Onglet « Se connecter » | affiche le formulaire de connexion, titre « Connexion » | `.is-active`, `aria-selected` |
| Onglet « S'inscrire » | affiche le formulaire d'inscription | idem |
| Cartes B1 / B2 / B3 | sélectionne le niveau d'inscription | `.is-selected`, `aria-checked` |
| « Se connecter » | `POST /api/login`, redirige vers `redirect` | désactivé pendant l'appel |
| « Créer mon compte » | `POST /api/register` | désactivé pendant l'appel |
| « Mot de passe oublié ? » | affiche la vue de demande | — |
| « Recevoir le lien » | `POST /api/forgot-password` | désactivé pendant l'appel ; message générique |
| « Retour à la connexion » | revient à la vue connexion | — |
| « Enregistrer » | `POST /api/reset-password` avec le token de l'URL | désactivé ; succès puis retour connexion après 1,6 s |
| « Retour à l'accueil » | `/` | — |

## 4. Compte et abonnement

| Libellé | Effet | Condition |
|---|---|---|
| « Se connecter » | `/_auth/login.html` | état anonyme |
| « Créer un compte » | `/_auth/login.html?mode=register` | état anonyme |
| « S'abonner — X F / mois » | ouvre le paiement FedaPay | abonné = non |
| « Renouveler — +1 mois (X F) » | ouvre le paiement | abonné = oui |
| Carte de cours du sélecteur | `/<cours>/index.html` | niveau accessible |
| Carte verrouillée | aucun effet | niveau supérieur |
| « Se déconnecter » | `POST /api/logout` puis `/` | connecté |
| « Retour à l'accueil » | `/` | — |

**État désactivé** : si `/api/fedapay/config` renvoie `enabled: false`, le bouton d'abonnement est désactivé et le message « Paiement en ligne bientôt disponible… » s'affiche.

## 5. Code lab (composant le plus interactif)

| Libellé | data-* | Effet | États |
|---|---|---|---|
| Sélecteur de langage | `data-lab-picker` | change le langage d'exécution | « Chargement… » au départ |
| Exécuter | `data-lab-run` | envoie le code à `/api/execute` | désactivé si vide, spinner pendant |
| Arrêter | `data-lab-stop` | interrompt l'exécution en cours | masqué au repos |
| Valider | `data-lab-submit` | `/api/exercise/submit` (tests cachés) | « Validation suspendue » + disabled si `data-grading-suspended="1"` |
| Vérifier mes réponses | `data-lab-submit` (mode analyse) | validation formative par critères | idem |
| Expliquer mon erreur | `data-lab-help` | `/api/code-help` (tuteur, jamais de code) | désactivé sans erreur |
| Réinitialiser | `data-lab-reset` | restaure le code de départ | — |
| Mode texte / formulaire | `data-lab-mode` | bascule l'édition des cas | mode analyse uniquement |
| Onglets Sortie / Erreurs / Détails | `data-lab-tab` | change le panneau | `aria-selected` |
| Demander une explication au tuteur IA | `data-lab-inline-help` | même action que « Expliquer » | visible quand une erreur existe |
| Ctrl + Entrée | raccourci | exécute | — |
| Entrée (champ question) | raccourci | demande l'explication | — |

Le clic sur « Exécuter » est **la seule** façon de lancer du code (pas d'exécution à la frappe), pour préserver le quota partagé.

## 6. Administration — comptes

| Libellé | Effet | Confirmation |
|---|---|---|
| « Créer le compte » | `POST /api/admin/users` | toast succès/erreur |
| Filtre Tous / Abonnés / Gratuits / Désactivés | `GET /api/admin/users?filter=` | — |
| Recherche (debounce 300 ms) | `GET /api/admin/users?search=` | — |
| « Abonner » (par ligne) | modale de choix de mois puis `POST /users/:id/subscribe` | modale |
| « Retirer » | modale puis `POST /users/:id/unsubscribe` | modale rouge |
| « Réinitialiser sessions » | modale puis `POST /users/:id/reset-sessions` | modale |
| « Désactiver » / « Réactiver » | modale puis `POST /users/:id/toggle-active` | modale |
| « Supprimer » | modale puis `DELETE /users/:id` | modale rouge |
| Pagination du journal | `GET /api/admin/logs?offset=` | — |
| Filtres du journal | `GET /api/admin/logs?type=` | `.active` |

## 7. Administration — IA

| Libellé | Effet |
|---|---|
| Sélecteur « Fournisseur Actif » | change les options de modèles |
| « Actualiser modèles » | `POST /api/admin/ai/fetch-models` |
| « Enregistrer » | `POST /api/admin/ai/config` |
| Filtre de clés (Toutes / OpenRouter / NVIDIA / Ollama / Custom) | filtre le tableau |
| « Tester » (nouvelle clé) | `POST /api/admin/ai/test-key`, affiche le résultat |
| « Ajouter au Pool » | `POST /api/admin/ai/keys` |
| Activer / désactiver une clé | `POST /api/admin/ai/keys/:id/toggle` |
| Supprimer une clé | `DELETE /api/admin/ai/keys/:id` |

## 8. Preparation Web

| Libellé | Effet |
|---|---|
| Projets | replie/déplie le rail |
| Cours | replie/déplie le panneau pédagogique |
| Focus code | masque les panneaux latéraux |
| Valider | `POST /api/preparation/validate`, affiche les critères |
| HTML / CSS fourni / JavaScript | change l'onglet d'édition |
| Indice | révèle un indice textuel (malus XP) |
| Solution | disponible après 2 échecs, ouvre la modale |
| Réinitialiser | remet le code de départ |
| Précédent / Suivant | change d'étape |
| Progression (pill) | ouvre la modale de progression |
| Interrupteur « Structure + CSS » | bascule le rendu de l'aperçu |
| Rafraîchir | recharge l'iframe |
| Quiz (options) | répond au quiz bonus, XP |
| FAB IA | ouvre le panneau d'indices |
| « Demander » | envoie la question à l'assistant |
| × (modales, panneau IA) | ferme |

## 9. Annales

| Libellé | Effet |
|---|---|
| Onglet de matière (8) | affiche le panneau correspondant |
| Options de QCM (`.opt-btn`) | révèle la correction, met à jour le score de la matière |
| Code lab (8) | exécution/validation comme ailleurs |

## 10. Chat RD-AI

| Libellé | Effet |
|---|---|
| Bulle | ouvre/ferme le panneau |
| WhatsApp | ouvre `wa.me/...` dans un nouvel onglet |
| Corbeille | efface l'historique local |
| × | ferme |
| Envoyer | `POST /api/ai-chat`, ajoute le message |

## 11. Actions sans cible ou non vérifiées

- Le lien « Épreuves » du pied de page pointe vers `epreuves/index.html`, protégé : un visiteur anonyme est renvoyé au login. C'est volontaire mais visuellement déroutant.
- Aucun bouton « Supprimer mon compte », « Changer de mot de passe » (hors reset), « Modifier mon profil ».
- Aucun bouton de retour explicite sur `epreuves/index.html` (à vérifier en runtime).
- Les boutons « Abonner » par ligne de l'admin ouvrent une modale de choix de durée, dont le libellé exact est généré (non visible dans l'extraction statique).

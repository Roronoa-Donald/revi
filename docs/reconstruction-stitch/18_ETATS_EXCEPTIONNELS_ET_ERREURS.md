# 18 — États exceptionnels et erreurs

> Ce document décrit les défaillances **réellement gérées** par le code et leur traduction visible. Les cas non gérés sont signalés comme tels.

## 1. Codes HTTP et rendu

| Code | Déclencheur | Rendu |
|---|---|---|
| 200 | succès | page ou JSON |
| 302 / 303 | redirection d'accès | `Location` vers login, compte ou portail |
| 400 | requête invalide (corps manquant, JSON malformé) | JSON `{error}` |
| 401 | non authentifié / token invalide | JSON, puis redirection JS |
| 403 | accès refusé (niveau, abonnement, suspension, chronologie) | JSON ou texte « Forbidden » |
| 404 | page ou API inconnue | `404.html` (page) / JSON `{error:'Introuvable'}` |
| 405 | méthode non autorisée | JSON |
| 410 | `/api/activate` (route retirée) | JSON explicite |
| 422 | validation d'exercice ou de projet échouée | JSON avec critères |
| 429 | quota d'exécution ou rate limit de route | JSON + message dédié |
| 500 | exception serveur | JSON `{message:'Erreur serveur'}` |
| 503 | service non configuré (exécution, IA, admin, Preparation) | JSON + message |

## 2. Erreurs d'accès (les plus visibles)

| Situation | Page affichée |
|---|---|
| Chapitre protégé, anonyme | login avec `?redirect=` |
| Chapitre protégé, gratuit | compte avec `?payment=required` |
| Niveau insuffisant | compte avec `?level=denied` |
| Annales, anonyme | login |
| Atelier, anonyme | login |
| Atelier, abonné sans mot de passe | portail avec `?preparation=locked` → bandeau |
| Admin, non connecté | login admin |
| Chemin bloqué (`CLAUDE.md`, `.env`, etc.) | texte brut `Forbidden` (403) |
| Fichier racine non listé | `404.html` |

**Point d'attention pour Stitch** : le 403 de chemin bloqué n'est pas stylé ; ne pas le confondre avec la page 404.

## 3. Erreurs de formulaire

| Cas | Message |
|---|---|
| Email vide/invalide | « Adresse email invalide. » |
| Mot de passe < 8 | « Le mot de passe doit contenir au moins 8 caractères. » |
| Email déjà utilisé | « Un compte existe déjà avec cet email. Connecte-toi. » |
| Identifiants faux | « Email ou mot de passe incorrect. » |
| Compte désactivé | « Ce compte est désactivé. Contacte l'administrateur. » |
| Lien de reset expiré | « Lien invalide ou expiré. Refais une demande. » |
| Champs admin incomplets | « Veuillez remplir tous les champs » |
| Panne réseau | « Erreur réseau. Réessaie. » |
| Trop de tentatives | message de rate limit (429), attente |

## 4. Erreurs du code lab

| Cause | Statut | Message |
|---|---|---|
| Code vide | `idle` | « Écrivez du code avant d'exécuter. » |
| Fournisseur absent | `error` | « Le service d'exécution est momentanément indisponible. » |
| Timeout | `timeout` | « Délai d'exécution dépassé (boucle infinie) » |
| Quota utilisateur/global | `rate_limited` | « Trop de demandes d'exécution » |
| Arrêt manuel | `cancelled` | « Exécution interrompue par l'utilisateur. » |
| Langage non supporté | `error` | « Ce langage n'est pas disponible. » |
| Réponse illisible | `error` | « Réponse inattendue du service d'exécution. » |
| Session expirée | `error` | « Votre session a expiré. Rechargez la page et reconnectez-vous. » |
| Tests indisponibles | — | « La validation est momentanément indisponible. » |
| Exercice suspendu | — | « Validation suspendue » |
| Tuteur en panne | — | notice « L'assistant est momentanément indisponible. » |
| Tuteur trop long | — | erreur 413/429 selon la route |

## 5. Erreurs de paiement

| Cas | Effet |
|---|---|
| FedaPay non configuré | bouton désactivé, message « Paiement en ligne bientôt disponible » |
| Échec d'initialisation | message d'erreur dans la carte |
| Retour avec transaction inconnue | « Transaction introuvable » |
| Signature de webhook invalide | 401 JSON, pas d'effet UI |
| Paiement refusé/annulé | retour `payment=return` avec statut non approuvé → message |
| Double callback | idempotence par transaction, pas de double extension |

## 6. Erreurs d'administration

| Cas | Effet |
|---|---|
| Variables admin absentes | login 503 « Administration désactivée : identifiants non configurés » |
| Mauvais identifiants | bandeau rouge |
| Session admin expirée | redirection login |
| Création avec email existant | toast erreur |
| Suppression de soi-même | refusée par le serveur (à vérifier) |
| Fournisseur IA en panne | « Actualiser modèles » échoue, toast erreur |
| Clé invalide | « Tester » affiche l'échec |
| Base de données indisponible | 500, tableaux vides |

## 7. Erreurs Preparation Web

| Cas | Effet |
|---|---|
| Section désactivée (`PREPARATION_PASSWORD` absent) | 503, page inutilisable |
| Non abonné | 403, message d'abonnement |
| Mauvais mot de passe | message d'erreur, pas de cookie |
| Projet hors séquence | 403 |
| Code vide | 422 avec critère « Le code est vide » |
| Solution trop tôt | 403 |
| Quiz avant validation | 403 |
| Aperçu bloqué par le navigateur | cadre vide, message (à vérifier) |

## 8. Erreurs de chat IA

| Cas | Effet |
|---|---|
| `OPENROUTER_API_KEY` absente | 503, message dans le fil |
| Quota fournisseur | message d'erreur |
| Message trop long | rejet (limite serveur) |
| Historique trop long | troncature ou rejet |
| Réseau | message d'erreur dans le fil, saisie conservée |

## 9. Erreurs non gérées (constat)

- Pas de page 500 stylée ni de page de maintenance.
- Pas de détection hors ligne.
- Pas de reprise automatique après expiration de session (l'utilisateur perd sa saisie de formulaire).
- Pas de message « déconnecté ailleurs » après révocation de session.
- Pas de gestion visible des erreurs JavaScript (pas de fallback si Monaco ne charge pas, hormis le message « Préparation de l'éditeur… »).
- Le 403 de chemin bloqué est du texte brut.

## 10. Priorités de reconstruction

Pour Stitch, produire au minimum : login-erreur, inscription-erreur, compte-paiement-requis, compte-niveau-refuse, portail-atelier-verrouille, 404, lab-erreur, lab-timeout, lab-quota, lab-suspendu, admin-login-erreur, admin-toast-erreur.

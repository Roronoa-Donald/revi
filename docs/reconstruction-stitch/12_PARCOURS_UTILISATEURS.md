# 12 — Parcours utilisateurs complets

> Chaque parcours indique les écrans traversés, les appels réseau et les états visibles. Les parcours marqués **[non vérifié]** dépendent d'un service externe.

## P1 — Découverte et lecture gratuite

1. **Portail** `/` : hero, bandeau « chapitre 1 gratuit », onglet B1 actif, 23 cartes.
2. Recherche ou changement de niveau (optionnel).
3. Clic sur une carte → `/<cours>/sommaire.html`.
4. Lecture du programme, badge « Accès libre » sur le chapitre 1.
5. Clic « Commencer le chapitre 1 » → `chapitres/chapitre1.html`.
6. Lecture, QCM, éventuellement un code lab.
7. En bas : « Chapitre 2 — … » → **redirection login** (contenu protégé).

**Écrans** : portail → sommaire → chapitre 1 → login.
**API** : `/api/verify` (état du profil sur le portail) ; aucune autre.

## P2 — Création de compte

1. Depuis le login, onglet « S'inscrire » (ou `?mode=register`).
2. Saisie email, prénom optionnel, mot de passe ≥ 8.
3. Choix du niveau : B1 / B2 (défaut) / B3. Le texte précise que chaque niveau inclut les précédents.
4. « Créer mon compte » → `POST /api/register`.
5. Bouton désactivé pendant l'appel ; succès → message vert puis redirection vers `?redirect=` ou `/`.
6. **Erreur** : email invalide, mot de passe court, email déjà pris → bandeau rouge, bouton réactivé.

**État suivant** : compte gratuit. Le sélecteur de la page compte affiche les cours verrouillés.

## P3 — Connexion

1. `/_auth/login.html` (souvent avec `?redirect=<contenu demandé>`).
2. Email + mot de passe → `POST /api/login`.
3. Succès → retour direct au contenu demandé.
4. Erreur → « Email ou mot de passe incorrect. » (message générique).
5. Compte désactivé → « Ce compte est désactivé… ».

**Effet de bord** : la connexion révoque les sessions au-delà de 3.

## P4 — Mot de passe oublié

1. Login → « Mot de passe oublié ? ».
2. Email → `POST /api/forgot-password`.
3. Message générique « Si un compte existe… » (anti-énumération).
4. Réception d'un email avec lien `/_auth/login.html?reset=<token>`.
5. La page détecte `reset` et affiche la vue « Nouveau mot de passe ».
6. Saisie ≥ 8 → `POST /api/reset-password`.
7. Succès → message vert, retour automatique à la connexion après 1,6 s.
8. Échec → « Lien invalide ou expiré. Refais une demande. »

**[non vérifié]** : l'envoi d'email dépend de `server/mailer.js` et de sa configuration.

## P5 — Abonnement

1. Sur un contenu protégé sans abonnement → `/_auth/account.html?payment=required&redirect=…`.
2. La page charge `/api/verify`, `/api/me`, `/api/fedapay/config`.
3. Affiche « Gratuit », le bouton « S'abonner — 5 000 FCFA / mois » et la formule annuelle « 45 000 FCFA / an (−25 %) » (version servie `public/account.html`).
4. Clic → initialisation du widget FedaPay (`checkout.js`), choix Mobile Money / carte.
5. Retour sur `account.html?payment=return&id=<transaction>` : message « Vérification du statut… ».
6. `POST /api/fedapay/callback` → validation serveur, extension de l'abonnement, éventuel reçu email.
7. La page repasse en « Actif », échéance dorée, bouton « Renouveler ».
8. L'utilisateur clique le lien de retour ou ressaisit l'URL protégée : accès autorisé.

**Variante** : paiement en ligne désactivé → bouton grisé + « Paiement en ligne bientôt disponible… ».

**Incohérence** : le miroir `_auth/account.html` affiche encore 1 000 F/mois et appelle `/api/fedapay/checkout`, route absente. Voir [19](19_FONCTIONNALITES_INCOMPLETES.md).

## P6 — Accès à un chapitre protégé (abonné)

1. Depuis le sommaire, clic sur chapitre 2.
2. Le serveur vérifie cookie, session, niveau, abonnement.
3. Si tout est valide : page servie, scripts d'auth injectés.
4. Le `alnav` marque le chapitre actif.
5. L'utilisateur lit, fait le QCM, les exercices.
6. En bas, navigation vers le chapitre suivant.

## P7 — Code lab : exécuter

1. Dans un chapitre ou l'atelier, l'élève écrit dans Monaco.
2. Il peut déplier « Entrée du programme » (souvent déjà déplié si `data-stdin` est présent).
3. Clic « Exécuter » (ou Ctrl + Entrée) → `POST /api/execute`.
4. Statut « Exécution en cours… », bouton Stop visible.
5. Résultat : onglet Sortie, compteur, détails (environnement, code de sortie, temps, moteur, quota restant).
6. En cas d'erreur : bascule automatique sur l'onglet Erreurs et bouton « Expliquer mon erreur » activé.
7. Le code est conservé dans le navigateur par exercice et par cours.

## P8 — Code lab : valider un exercice

1. Clic « Valider » → `POST /api/exercise/submit`.
2. Statut « Vérification des tests… ».
3. Rapport : « Exercice validé » ou « Exercice à revoir : n / N test(s) validé(s) ».
4. Les tests et solutions ne sont jamais envoyés au navigateur.
5. Si `data-grading-suspended="1"` : bouton « Validation suspendue » inactif, avis explicite, énoncé et exemple disponibles.

## P9 — Tuteur IA

1. Après une erreur, clic « Expliquer mon erreur » (ou le bouton inline dans la console).
2. Le panneau tuteur s'ouvre, champ « Précisez votre question (facultatif) ».
3. `POST /api/code-help` avec le code, l'erreur et la question.
4. Réponse en mots, **jamais de code** ; notice si le service est indisponible.

## P10 — QCM et auto-évaluation

1. Lecture d'un chapitre, section « QCM — niveau examen ».
2. Clic sur une option → correction immédiate, explication révélée, options désactivées.
3. Après la première réponse, barre de score sticky : `Score : n/N (p %)` + bande.
4. Le score se met à jour à chaque question.
5. En bas, section « Test de maîtrise » avec les 4 bandes.
6. L'élève coche « Je considère ce chapitre maîtrisé » → persisté localement.
7. Le sommaire/portail peuvent refléter la progression locale (carte Reprendre).

## P11 — Examen blanc

1. Depuis le sommaire, « Examens blancs » → `simulateur-examen.html`.
2. Clic « Démarrer » → chronomètre `mm:ss`, bouton désactivé.
3. QCM et/ou exercices.
4. À 0 : « Temps écoulé ».
5. **[non vérifié]** : le mode examen sécurisé par `/api/qcm` n'est pas branché sur cette page statique.

## P12 — Sélecteur de cours et changement de niveau

1. Page compte, section « Mes cours ».
2. Chargement `/api/courses`.
3. Trois blocs de niveau ; les niveaux supérieurs sont opacité réduite avec badge « verrouillé ».
4. Clic sur un cours de son niveau → `/<cours>/index.html`.
5. Aucun moyen de changer son niveau depuis l'interface (seul un administrateur ou la base peut le faire).

## P13 — Atelier Preparation Web

1. Portail → « Atelier » → `preparation-web/index.html`.
2. Si non connecté : renvoi login ; si non abonné : paywall ; si abonné sans mot de passe : renvoi portail avec bandeau.
3. Saisie du mot de passe de section → cookie 365 j, profil chargé.
4. Rail : 12 projets, XP, rang, barre de progression.
5. Projet 1 actif ; énoncé + étapes ; éditeur HTML/CSS/JS ; aperçu iframe.
6. Clic « Valider » → critères ; succès → XP, badge, projet suivant déverrouillé.
7. Quiz bonus après validation → XP.
8. « Indice » → malus ; « Solution » après 2 échecs → modale, malus.
9. « Progression » → modale timeline ; « IA » → indices textuels.

## P14 — Administration : créer et abonner un élève

1. `/_auth/admin/login.html` → identifiants → dashboard.
2. Onglet « Comptes » (défaut) : 6 statistiques, formulaire de création.
3. Saisie email, mot de passe lisible, nom, durée d'abonnement (0/1/3/6/12).
4. « Créer le compte » → `POST /api/admin/users` → toast vert, tableau rafraîchi.
5. Sur la ligne : « Abonner » → modale de mois → `POST /users/:id/subscribe` → toast.
6. « Désactiver » → modale → sessions invalidées.
7. « Supprimer » → modale rouge → suppression définitive.

## P15 — Administration : gérer les clés IA

1. Onglet « Fournisseurs & Clés IA ».
2. Carte 1 : fournisseur actif, modèles chat/code, « Actualiser modèles », « Enregistrer ».
3. Carte 2 : pool de clés (fournisseur, libellé, clé masquée, statut/cooldown, requêtes, erreurs, dernière utilisation), filtres.
4. Carte 3 : ajout (fournisseur, clé, libellé, URL de base), « Tester » puis « Ajouter au Pool ».
5. Actions par clé : activer/désactiver, supprimer.

## P16 — Consultation des annales

1. Portail → « Épreuves » (ou pied de page).
2. Vérification d'accès : compte + niveau + abonnement, **même pour l'index**.
3. Page longue : 8 matières, onglets, QCM par matière, blocs de code, 8 labs.
4. Score par matière, note (`grade-pill`) ou « N/A ».
5. **[non vérifié]** : pas de retour visible vers le portail dans l'extraction.

## P17 — Perte de session

1. L'utilisateur recharge une page protégée après révocation/expiration.
2. Le serveur redirige vers `/_auth/login.html?redirect=…`.
3. Après reconnexion, retour au contenu.
4. Aucun message explicatif sur la cause de la déconnexion.

## P18 — Page inexistante

1. URL inconnue ou fichier racine non allowlisté.
2. `404.html` : code géant, « Cette page n'existe pas », bouton « Retour au portail », bouton « Ouvrir l'atelier ».
3. Le bouton atelier mène à une page protégée : un anonyme rebondit sur le login.

---

## Parcours impossibles (à ne pas inventer)

- Modifier son email, son mot de passe (hors reset), son niveau.
- Supprimer son compte.
- Changer d'appareil sans perdre la session précédente au-delà de 3.
- Acheter un abonnement sans compte.
- Accéder au contenu protégé sans abonnement.
- Accéder à l'atelier sans mot de passe de section.
- Partager un cours ou un résultat.
- Recevoir une notification.

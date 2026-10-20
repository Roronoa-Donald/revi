# Prompt complet - Parcours Preparation Web

## Objectif global

Creer une nouvelle section complete nommee `Preparation` dans la plateforme de cours existante. Cette section doit contenir une seule carte appelee `Preparation Web`, qui mene a un parcours d'apprentissage tres pratique pour debutants absolus.

Le parcours doit apprendre progressivement le HTML puis le JavaScript a travers 10 projets courts, rapides, concrets et tres guides. L'utilisateur doit coder directement dans la plateforme, voir le resultat en temps reel, recevoir des indications precises en cas d'erreur, gagner de l'XP, suivre sa progression, et comparer son avancement avec les autres participants B2 qui ont debloque la section Preparation.

Le rendu attendu doit etre tres complet, moderne, pedagogique, gamifie, et accessible a des apprenants qui partent de zero.

## Contexte de la plateforme existante

La plateforme actuelle contient deja :

- Un portail principal `index.html` avec des onglets `Semestre 1` et `Semestre 2`.
- Des cours proteges par cle d'acces.
- Un backend Fastify dans `server/`.
- Une base PostgreSQL utilisee pour les cles, sessions et logs.
- Des routes API sous `/api`.
- Un systeme de build statique via `scripts/build.js`.
- Un systeme d'acces aux cours via `server/middleware/access-control.js` et `middleware.js`.

La nouvelle section doit s'integrer proprement a cette architecture.

## Nouvelle entree sur le portail

Ajouter un troisieme onglet au portail principal :

- `Semestre 1`
- `Semestre 2`
- `Preparation`

Dans l'onglet `Preparation`, afficher une seule carte :

- Titre : `Preparation Web`
- Description : apprentissage rapide du HTML et du JavaScript par projets.
- Style : campus moderne + studio code.
- La carte doit etre visible meme si la section n'est pas configuree.

Si la variable d'environnement `PREPARATION_PASSWORD` est absente, la carte doit indiquer clairement que la section est indisponible/desactivee, au lieu de provoquer une erreur.

## Protection de la section Preparation

La section Preparation doit necessiter deux conditions :

- L'utilisateur doit avoir une cle d'acces valide, comme pour les cours proteges.
- L'utilisateur doit entrer le mot de passe Preparation.

Le mot de passe Preparation doit etre configure uniquement dans `.env` avec :

```env
PREPARATION_PASSWORD=mot_de_passe_admin
```

Il ne faut pas ajouter de modification du mot de passe depuis le dashboard admin pour l'instant.

Si un utilisateur possede une cle valide mais ne connait pas le mot de passe Preparation, il ne doit pas pouvoir entrer.

La demande du mot de passe doit se faire via une modale lorsqu'on clique sur la carte `Preparation Web`, pas via une page login separee.

Apres mot de passe correct, creer un cookie `preparation_token` ou equivalent. Sa duree doit etre longue et coherente avec la duree de vie de la cle d'acces, environ 365 jours, sauf expiration/revocation de la cle.

Le mot de passe Preparation doit etre obligatoire en production et en local des lors que la section est activee.

## Public cible

Le parcours vise des debutants absolus.

Le ton doit etre :

- Simple.
- Tres pedagogique.
- Accessible a tous.
- Tres explicatif.
- Oriente pratique.
- Sans supposer que l'apprenant a deja une bonne memoire ou des bases en programmation.

Chaque concept doit etre explique avec des mots simples, des exemples, des memos et des erreurs frequentes.

## Structure generale du parcours

Le parcours contient exactement 10 projets :

1. Carte de profil - HTML guide
2. Fiche produit - HTML guide
3. Formulaire - HTML guide
4. Mini CV - HTML guide
5. Mini portfolio - HTML autonome de validation HTML
6. Compteur - JavaScript guide
7. Quiz - JavaScript guide
8. Todo list - JavaScript guide
9. Calculatrice - JavaScript guide
10. Pierre Papier Ciseaux - projet final HTML + JavaScript autonome

Le projet 5, `Mini portfolio`, valide la fin de la partie HTML. Apres validation de ce projet, la section JavaScript est debloquee.

Le projet 10, `Pierre Papier Ciseaux`, est le projet final. Il doit verifier que l'utilisateur sait combiner HTML et JavaScript.

## Chronologie obligatoire

La progression doit etre strictement chronologique.

Un utilisateur ne peut pas sauter un projet.

Exemple :

- Le projet 2 est bloque tant que le projet 1 n'est pas valide.
- La partie JavaScript est bloquee tant que le projet 5 n'est pas valide.
- Le projet final est bloque tant que les projets precedents ne sont pas valides.

Les quiz ne bloquent pas la progression, mais ils rapportent de l'XP.

## Editeur integre

L'utilisateur doit coder directement dans la plateforme.

Disposition souhaitee :

- A gauche : section instructions retractable + editeur de code.
- A droite : rendu en temps reel.

Objectif espace code :

- L'editeur doit prendre la plus grosse largeur possible (viser 65-70%).
- Ajouter un mode "Focus code" pour masquer le cours et reduire l'apercu si besoin.

La section d'instructions doit etre separable/retractable pour laisser plus de place au code.

Structure pedagogique integree dans la section cours :

- En haut : mini-cours court, clair, pas soporifique, avec explication + exemple.
- En bas : exercice a faire maintenant.
- Boutons Precedent / Suivant pour passer d'une etape a l'autre.
- A chaque etape, on garde le mini-cours en haut et l'exercice en bas.
- Le contenu doit expliquer d'abord, puis donner la consigne.

Le rendu doit se mettre a jour automatiquement a chaque frappe.

Le rendu doit etre execute dans une iframe isolee pour eviter qu'un mauvais JavaScript casse toute la plateforme.

Ajouter un switch "Structure" / "Structure + CSS" dans l'apercu :

- Mode Structure : HTML brut sans CSS.
- Mode Structure + CSS : rendu complet avec CSS fourni.

Le CSS doit toujours etre fourni.

Le CSS doit etre moderne, complet, joli, pedagogique, avec une direction visuelle campus moderne + studio code.

## Permissions d'edition par projet

Les projets HTML :

- L'utilisateur modifie uniquement le HTML.
- Le CSS est deja fourni.
- Le JS est deja fourni si necessaire, mais l'utilisateur ne doit pas avoir besoin de le modifier.

Les projets JavaScript :

- L'utilisateur modifie uniquement le JS.
- Le HTML et le CSS sont visibles mais verrouilles.
- L'utilisateur peut lire le HTML/CSS, mais ne peut pas les modifier ni les copier facilement.

Le projet final :

- L'utilisateur peut modifier HTML + JavaScript.
- Le CSS reste fourni et verrouille.

## Autocompletion et Emmet

Integrer autant que possible :

- Autocompletion HTML.
- Autocompletion JavaScript.
- Support Emmet pour ecrire rapidement le HTML.
- Auto-fermeture des balises HTML apres la balise ouvrante (toujours active).

Exemples utiles :

- `ul>li*3`
- `.card`
- `section.profile-card`
- `button.choice`

L'objectif est d'accelerer l'apprentissage sans faire le travail a la place de l'apprenant.

## Aide IA (indices texte uniquement)

Ajouter un bouton flottant d'aide IA dans la page Preparation Web :

- L'IA donne uniquement des indices textuels, jamais de code.
- Les reponses sont courtes, utiles, et orientees comprehension.
- Le prompt utilisateur doit etre enrobe dans un prompt systeme qui impose ces regles.
- L'IA doit rappeler la notion en cause, pas donner la solution.

## Anti copier-coller de la solution

L'utilisateur doit reecrire la solution a la main.

Apres deux echecs de validation, un bouton `Voir la solution` devient visible.

Cependant :

- La solution doit aider a comprendre.
- Elle ne doit pas permettre un copier-coller direct facile.
- Des protections doivent etre ajoutees contre le copier/coller depuis la solution.
- Utiliser la solution doit reduire l'XP obtenu.

L'utilisateur peut quand meme valider apres avoir consulte la solution, mais avec moins d'XP.

## Boutons et actions par projet

Chaque projet doit proposer :

- `Valider le projet`
- `Indice`
- `Voir la solution` apres au moins 2 echecs
- `Reinitialiser`

Le bouton `Reinitialiser` doit remettre uniquement le projet courant a son code de depart.

La reinitialisation ecrase la derniere sauvegarde du projet courant. Pas besoin d'historique de versions.

## Structure pedagogique d'un projet

Chaque projet doit avoir :

- Objectif du projet.
- Ce que l'utilisateur va construire.
- Notions apprises.
- Instructions etapes par etapes.
- Checklist claire.
- Memos techniques integres.
- Erreurs frequentes.
- Astuces.
- Glossaire contextualise.
- Validation finale.
- Quiz bonus.

Les etapes guidees doivent expliquer :

- Ce qu'il faut ecrire.
- Pourquoi on l'ecrit.
- A quoi sert chaque balise, attribut, classe, variable ou fonction.
- Comment retenir la notion.

## Validation automatique

La validation doit etre stricte mais pedagogique.

Pour HTML :

- Verifier les balises attendues.
- Verifier les classes attendues.
- Les classes doivent etre case sensitive.
- Les consignes doivent indiquer exactement les classes attendues, car le CSS depend de ces classes.
- Si une balise existe mais pas la classe, l'erreur doit le dire clairement.

Exemple d'erreur :

```text
Ta balise <section> existe, mais il manque class="profile-card".
```

Autre exemple :

```text
Il manque une image <img>. Ajoute une balise <img> avec la classe "profile-avatar".
```

Pour JavaScript :

- Verifier les noms de variables attendus.
- Verifier les noms de fonctions attendues.
- Verifier le comportement visible dans le rendu.

Exemple :

- Fonction `incrementer` presente.
- Variable `score` presente.
- Clic sur le bouton `+` modifie bien le compteur.
- Le message de resultat s'affiche correctement.

La validation automatique doit essayer d'etre la plus precise possible afin que l'utilisateur ne reste pas bloque plusieurs jours sur une meme erreur.

## Validation manuelle

L'utilisateur doit cliquer sur `Valider le projet`.

Si la validation automatique echoue, on bloque la validation et on explique ce qui ne va pas.

Si la validation automatique reussit, le projet passe au statut termine.

## Quiz

Ajouter un quiz apres chaque projet.

Les quiz :

- Ne sont pas obligatoires.
- Ne bloquent pas la progression.
- Rapportent de l'XP.
- Servent a renforcer les notions du projet.

Chaque quiz doit etre lie au projet qui vient d'etre fait.

Les corrections doivent etre pedagogiques.

Spec QCM Preparation :

- Banque centralisee dans un fichier JSON unique (nom libre).
- 5 questions par projet, mix complet (QCM simple, multi-choix, vrai/faux, reponse courte).
- Score immediat, feedback visuel par question.
- Explication courte affichee apres la reponse.
- Progression QCM stockee en local (localStorage).

## Memos et cheatsheet

Chaque etape doit contenir des memos integres.

Ajouter aussi une section generale accessible :

- `Cheatsheet HTML`
- `Cheatsheet JavaScript`
- Ou une page unique `Cheatsheet Preparation Web`

La cheatsheet doit etre accessible meme si tous les projets ne sont pas termines.

La cheatsheet ne doit pas etre protegee par le mot de passe Preparation.

Elle peut etre accessible depuis le portail ou depuis la carte Preparation, selon ce qui s'integre le mieux.

La cheatsheet, le classement et la progression doivent avoir leurs propres pages dediees.

## Gamification

Ajouter une gamification complete :

- XP.
- Rang.
- Nombre de projets termines.
- Progression globale.
- Score courant.
- Classement des participants.
- Badges.
- Memos.
- Quiz bonus.

Interface souhaitee :

- Une barre de progression globale.
- Un compteur simple `projets termines / 10` (ex: 3/10) cliquable.
- XP total.
- Rang actuel.
- Position dans le classement.
- Qui est en tete.

Quand on clique sur `3/10`, ouvrir une modale avec la liste des projets a realiser.

## Proposition d'attribution XP

Base proposee :

- +50 XP pour un projet termine.
- +20 XP pour un quiz reussi.
- +10 XP bonus si le projet est valide sans indice.
- +5 XP bonus si le projet est valide sans afficher la solution.
- Retrait ou absence de bonus si l'utilisateur utilise un indice.
- Retrait ou absence de bonus si l'utilisateur affiche la solution.

Un projet reste validable meme apres usage de la solution, mais avec moins d'XP.

Les quiz donnent de l'XP bonus mais ne bloquent pas.

## Leaderboard / classement

Le classement doit concerner uniquement :

- Les utilisateurs B2.
- Les utilisateurs qui ont entre le mot de passe Preparation.

Ne jamais afficher :

- Cle d'activation.
- Fingerprint.
- Donnees privees.
- Session technique.

Afficher :

- Nom associe a la cle d'acces en base.
- XP.
- Rang.
- Nombre de projets termines.
- Classement actuel.
- Qui est en tete.

Si le nom n'existe pas encore dans la structure actuelle, prevoir une migration ou une strategie propre pour associer un nom public a une cle.

## Sauvegarde de progression

Tout doit etre sauvegarde :

- Code ecrit.
- Statut du projet.
- Score.
- XP.
- Quiz reussis.
- Date de derniere modification.

Sauvegarde requise :

- Locale dans le navigateur.
- En base PostgreSQL.

La sauvegarde serveur doit etre liee a la cle d'activation, pas au fingerprint uniquement.

Raison :

- Si l'utilisateur change d'appareil.
- Si son fingerprint est reinitialise par l'admin.
- Il doit retrouver sa progression.

Si conflit entre sauvegarde locale et sauvegarde serveur :

- Garder la sauvegarde la plus recente.

Conserver seulement la derniere sauvegarde, pas besoin d'historique complet.

## Base de donnees suggeree

Ajouter des tables ou colonnes pour :

- Profil Preparation lie a une activation key.
- Progression par projet.
- Code sauvegarde par projet.
- XP total.
- Statut des quiz.
- Date de derniere activite.
- Date d'entree dans la section Preparation.

Exemples de tables possibles :

- `preparation_profiles`
- `preparation_progress`
- `preparation_quiz_results`

La structure exacte peut etre adaptee au schema actuel de `server/db.js`.

## API suggeree

Ajouter des routes API sous `/api/preparation`.

Routes possibles :

- `GET /api/preparation/status`
- `POST /api/preparation/login`
- `GET /api/preparation/progress`
- `POST /api/preparation/progress`
- `POST /api/preparation/validate`
- `POST /api/preparation/quiz`
- `GET /api/preparation/leaderboard`
- `GET /api/preparation/config`

Ces routes doivent verifier :

- Cle d'acces valide.
- Classe B2.
- Mot de passe Preparation valide pour les routes protegees.

## Parcours des projets

### Projet 1 - Carte de profil

Type : HTML guide.

Objectifs :

- Comprendre la structure d'une petite carte.
- Utiliser `section`, `img`, `h1`, `p`, `ul`, `li`, `a`.
- Comprendre `class`.

Validation :

- Une section avec classe attendue.
- Une image avec classe attendue.
- Un titre principal.
- Un paragraphe.
- Une liste.
- Un lien.

### Projet 2 - Fiche produit

Type : HTML guide.

Objectifs :

- Construire une fiche produit visuelle.
- Utiliser titres, paragraphes, image, prix, liste de caracteristiques, bouton visuel.
- Comprendre la hierarchie de contenu.

Validation :

- Structure produit.
- Image produit.
- Nom produit.
- Prix.
- Liste de caracteristiques.
- Bouton ou lien d'action selon la consigne.

### Projet 3 - Formulaire

Type : HTML guide.

Objectifs :

- Apprendre les balises essentielles de formulaire.
- Comprendre les champs de saisie.
- Manipuler differents types d'input.

Balises a enseigner :

- `form`
- `label`
- `input`
- `textarea`
- `select`
- `button`
- `placeholder`
- `required`

Types d'input a montrer :

- `text`
- `email`
- `password`
- `number`
- `checkbox`
- `radio`
- Eventuellement `date` si pertinent.

Validation :

- Formulaire present.
- Labels correctement associes ou presents.
- Plusieurs inputs attendus.
- Checkbox presente.
- Radio presente.
- Textarea presente.
- Select present.
- Bouton de soumission present.
- Classes attendues respectees.

### Projet 4 - Mini CV

Type : HTML guide.

Objectifs :

- Structurer une page personnelle.
- Organiser experiences, competences, formation.
- Utiliser sections, listes, titres et liens.

Validation :

- Header ou section d'introduction.
- Titre avec nom.
- Section competences.
- Section experience ou formation.
- Liste de competences.
- Lien de contact.

### Projet 5 - Mini portfolio

Type : HTML autonome de validation HTML.

Objectifs :

- Verifier que l'utilisateur sait construire une page HTML structuree sans guidage complet.
- Utiliser les notions des 4 premiers projets.

Consignes :

- Instructions claires et detaillees.
- Pas de correction etape par etape comme les projets guides.
- Indices disponibles.
- Solution apres deux echecs.

Validation :

- Structure principale.
- Presentation.
- Competences.
- Projets.
- Contact simple.
- Classes attendues.

Apres validation :

- Debloquer la partie JavaScript.

### Projet 6 - Compteur

Type : JavaScript guide.

HTML/CSS verrouilles et visibles.

Objectifs :

- Comprendre variable.
- Comprendre fonction.
- Comprendre bouton.
- Comprendre evenement click.
- Modifier du texte dans la page.

Validation :

- Variable attendue.
- Fonctions attendues.
- Boutons qui changent le compteur.
- Rendu mis a jour.

### Projet 7 - Quiz

Type : JavaScript guide.

Objectifs :

- Lire une reponse.
- Comparer une valeur.
- Afficher un message.
- Gerer un score simple.

Validation :

- Variables/fonctions attendues.
- Clic sur reponse.
- Message correct/incorrect.
- Score mis a jour.

### Projet 8 - Todo list

Type : JavaScript guide.

Objectifs :

- Recuperer une valeur input.
- Ajouter un element dans la page.
- Supprimer ou marquer une tache.
- Comprendre tableaux ou DOM simple selon niveau.

Validation :

- Fonction d'ajout.
- Une tache apparait dans la liste.
- Message ou compteur de taches.
- Suppression ou statut fait selon consigne.

### Projet 9 - Calculatrice

Type : JavaScript guide.

Objectifs :

- Lire deux nombres.
- Faire des operations.
- Afficher un resultat.
- Comprendre conditions simples.

Validation :

- Fonctions attendues.
- Addition.
- Soustraction.
- Multiplication.
- Division.
- Gestion basique de division par zero si prevue.

### Projet 10 - Pierre Papier Ciseaux

Type : projet final HTML + JavaScript autonome.

CSS fourni et verrouille.

L'utilisateur peut modifier :

- HTML.
- JavaScript.

Consignes detaillees :

- Creer trois boutons : pierre, papier, ciseaux.
- Permettre a l'utilisateur de choisir une option.
- Generer un choix aleatoire pour le bot.
- Afficher le choix du joueur.
- Afficher le choix du bot.
- Calculer le gagnant de la manche.
- Afficher un message de succes, echec ou egalite.
- Mettre a jour le score joueur.
- Mettre a jour le score bot.
- Prevoir un bouton reset.

Validation automatique :

- 3 boutons de choix presents.
- Choix bot aleatoire.
- Score joueur present et mis a jour.
- Score bot present et mis a jour.
- Message resultat present.
- Fonction reset presente et fonctionnelle.
- Fonctions/variables attendues presentes par nom.
- Comportement visible verifie.

## Design attendu

Direction visuelle :

- Campus moderne.
- Studio code.
- Interface claire et motivante.
- Editeur sombre.
- Cartes modernes.
- Accents lumineux.
- Sidebar de progression.
- XP visible.
- Leaderboard propre.
- Badges visuels.

Le design doit etre responsive desktop/mobile.

Sur mobile :

- L'editeur et le rendu doivent rester utilisables.
- Prevoir empilement vertical si necessaire.
- Les instructions doivent pouvoir etre repliees.

## Accessibilite et UX

Prevoir :

- Boutons clairs.
- Messages d'erreur precis.
- Focus visibles.
- Navigation simple.
- Libelles comprehensibles.
- Aucune supposition que l'utilisateur connait deja les termes techniques.

## Tests obligatoires

Pendant l'implementation, tester au fur et a mesure :

- Build statique `npm.cmd run build`.
- Syntaxe JS avec `node --check`.
- Routes API Preparation.
- Acces refuse sans cle.
- Acces refuse sans mot de passe Preparation.
- Acces accepte avec cle valide + mot de passe.
- Carte Preparation visible dans le 3e onglet.
- Section desactivee si `PREPARATION_PASSWORD` absent.
- Sauvegarde locale.
- Sauvegarde serveur.
- Restauration par cle d'activation.
- Deblocage chronologique.
- Validation HTML.
- Validation JS.
- Quiz bonus.
- XP.
- Leaderboard.
- Iframe de rendu en temps reel.
- Bouton Reinitialiser.
- Bouton Indice.
- Bouton Voir la solution apres 2 echecs.

## Contraintes importantes

- Ne pas exposer le mot de passe Preparation cote client.
- Ne pas exposer les cles d'activation.
- Ne pas afficher de donnees privees dans le leaderboard.
- Ne pas lier la progression uniquement au fingerprint.
- Ne pas permettre de sauter les projets.
- Ne pas laisser valider si la validation automatique echoue.
- Ne pas casser les cours existants.
- Ne pas publier les solutions de maniere copiable facilement.
- Ne pas rendre les quiz obligatoires.
- Ne pas proteger la cheatsheet par le mot de passe Preparation.

## Resultat final attendu

A la fin, la plateforme doit proposer une section `Preparation` complete ou un debutant peut :

- Entrer avec sa cle + le mot de passe Preparation.
- Apprendre HTML puis JavaScript dans l'ordre.
- Coder directement dans la plateforme.
- Voir son rendu en temps reel.
- Recevoir des erreurs precises.
- Debloquer les projets progressivement.
- Sauvegarder automatiquement son travail.
- Reprendre sur un autre appareil avec la meme cle.
- Gagner de l'XP.
- Faire des quiz bonus.
- Voir sa progression.
- Voir le classement B2 des participants Preparation.
- Consulter des memos et une cheatsheet.
- Terminer avec un projet final Pierre Papier Ciseaux.

Le parcours doit etre suffisamment complet pour donner l'impression d'une mini-ecole integree a la plateforme, pas simplement une suite de pages HTML.

# Livrable 26 — Bilan Final et Réponses aux 48 Questions Fondamentales

> Répertoire d'audit : `AUDIT_GLOBAL_FINAL/`  
> Projet : `revi-cours-html` — Plateforme d'apprentissage et d'évaluation interactive B1, B2 et B3  
> Date de référence : 3 novembre 2026  
> Auteur : Audit Indépendant et Forensique  
> Cadre : Réponses formelles et exhaustives aux 48 questions de l'ordre de mission  

---

## THÈME 1 — ÉTAT GIT ET INTÉGRITÉ DE L'ARCHITECTURE (Q1 À Q6)

### Q1 : Sur quelle branche Git se situe exactement le dépôt audité ?
- **Réponse** : Le dépôt se trouve sur la branche `remediation-pedagogique-qualite`.
- **Preuve** : Fichier [git_status.log](file:///home/rd/Desktop/proba/AUDIT_GLOBAL_FINAL/PREUVES/git_status.log) ligne 1 : `Sur la branche remediation-pedagogique-qualite`.

### Q2 : Quel est le commit HEAD de référence ?
- **Réponse** : Le commit HEAD est `20dc28ef3eccd12fef418d8a023349eb03ce9ccc` avec le message `version finale des cours`.
- **Preuve** : Fichier [git_log.log](file:///home/rd/Desktop/proba/AUDIT_GLOBAL_FINAL/PREUVES/git_log.log) ligne 1.

### Q3 : Y a-t-il des modifications locales non commitées dans le répertoire de travail ?
- **Réponse** : Oui, exactement 4 fichiers suivis sont modifiés dans l'arbre de travail : `corrections/outils/rejouer-isole.sh`, `scripts/course-kit.js`, `server/app.js` et `tests/db-persistence.test.js`.
- **Preuve** : Fichier [git_diff.patch](file:///home/rd/Desktop/proba/AUDIT_GLOBAL_FINAL/PREUVES/git_diff.patch).

### Q4 : Quels sont les fichiers et répertoires non suivis (untracked) présents sur disque ?
- **Réponse** : Les archives de livraisons d'audits antérieurs (`.zip` et dossiers), les outils de manifestes dans `scripts/`, les composants serveur créés pendant la remédiation (`server/routes/qcm.js`, `server/exercises/command-validator.js`) et des suites de tests unitaires ciblées.
- **Preuve** : Fichier [git_status.log](file:///home/rd/Desktop/proba/AUDIT_GLOBAL_FINAL/PREUVES/git_status.log) lignes 10-39.

### Q5 : L'architecture applicative est-elle monolithique ou modulaire ?
- **Réponse** : L'architecture est modulaire hybride. Elle combine un serveur d'API Fastify sécurisé (`server/app.js`), des contrôleurs dédiés par domaine dans `server/routes/`, et une distribution statique haute performance avec injection d'authentification (`server.js`).
- **Preuve** : Fichier [01_ETAT_GIT_ET_ARCHITECTURE.md](file:///home/rd/Desktop/proba/AUDIT_GLOBAL_FINAL/01_ETAT_GIT_ET_ARCHITECTURE.md).

### Q6 : Le catalogue de cours est-il centralisé dans une source unique de vérité ?
- **Réponse** : Oui. Le registre canonique unique est [server/courses.js](file:///home/rd/Desktop/proba/server/courses.js) (`COURSES`), duquel dérivent les configurations de routes, le middleware de sécurité, le générateur de pages et les tests.

---

## THÈME 2 — CATALOGUE ET EXERCICES DE CODE (Q7 À Q14)

### Q7 : Combien d'exercices le catalogue officiel contient-il exactement ?
- **Réponse** : Le catalogue contient exactement **1 250 exercices**, tous validés syntaxiquement par `validateCatalogue()`.
- **Preuve** : Fichier [05_REGISTRE_1250_EXERCICES.csv](file:///home/rd/Desktop/proba/AUDIT_GLOBAL_FINAL/05_REGISTRE_1250_EXERCICES.csv).

### Q8 : Combien de cours comportent des ateliers d'exercices pratiques ?
- **Réponse** : Exactement **68 cours** disposent d'exercices déclarés dans [server/exercises/course-config.js](file:///home/rd/Desktop/proba/server/exercises/course-config.js). Les 3 autres sections du catalogue sont des modules spéciaux sans ateliers standard (`preparation-web`, `epreuves`, `b1-vb-excel`).

### Q9 : Combien d'exercices sont actuellement suspendus de notation sommative ?
- **Réponse** : Exactement **354 exercices** sont suspendus par [server/exercises/grading-policy.js](file:///home/rd/Desktop/proba/server/exercises/grading-policy.js).
- **Preuve** : Fichier [07_SUSPENSIONS_354.csv](file:///home/rd/Desktop/proba/AUDIT_GLOBAL_FINAL/07_SUSPENSIONS_354.csv).

### Q10 : Quelles sont les trois causes distinctes de ces 354 suspensions ?
- **Réponse** :
  1. Suspension de cours complets (126 exercices répartis sur 7 cours : csharp, docker, b3-linux, b3-github, b1-sql, sql, b3-sql).
  2. Suspension individuelle (1 exercice : `algo-c9-e2` pour absence de vérification de méthode).
  3. Suspension pour preuves SHA-256 incomplètes ou périmées (227 exercices de code hors analyse).

### Q11 : Combien d'exercices sont actifs avec notation autorisée (`NOTATION_AUTORISEE`) ?
- **Réponse** : Exactement **896 exercices** ($1250 - 354 = 896$).

### Q12 : Pourquoi parle-t-on du contingent des « 814 exercices » ?
- **Réponse** : Sur les 896 exercices actifs, 82 fiches appartiennent aux lots pilotes ou certifiés sur supports réels (`VERIFIE_PEDAGOGIQUEMENT`). Le solde de $896 - 82 = \mathbf{814}$ exercices regroupe les fiches actives étiquetées `A_VERIFIER_PEDAGOGIQUEMENT`.

### Q13 : Quel pourcentage des 814 fiches repose sur le mode d'analyse textuelle ?
- **Réponse** : **97,3 %** (792 exercices sur 814 sont de type `language: 'analyse'`).

### Q14 : Combien d'exercices parmi les 814 ne comportent aucun test négatif ni limite ?
- **Réponse** : Exactement **652 exercices** (80,10 % du contingent). Ils ne disposent que de 2 ou 3 cas nominaux positifs.

---

## THÈME 3 — RUNNER ET MOTEURS DE VALIDATION (Q15 À Q20)

### Q15 : Les tests cachés des exercices sont-ils visibles côté client ?
- **Réponse** : Non, jamais. La méthode de projection [server/exercises/index.js](file:///home/rd/Desktop/proba/server/exercises/index.js) (`toClient()`) filtre rigoureusement l'objet d'exercice en excluant la propriété `tests` et la propriété `solution`. Les tests sont exécutés exclusivement côté serveur.

### Q16 : Comment le runner protège-t-il les quotas de l'API d'exécution distante ?
- **Réponse** : Par l'exécution séquentielle avec court-circuit immédiat au premier échec ([server/exercises/runner.js](file:///home/rd/Desktop/proba/server/exercises/runner.js#L231)) et par un plafond de 7 tests maximum par soumission (`MAX_TESTS = 7`).

### Q17 : Comment le runner gère-t-il la tolérance numérique pour les mathématiques ?
- **Réponse** : Il accepte la virgule et le point décimal, compare les fractions aux décimaux à $10^{-6}$ près, et applique la tolérance relative ou absolue spécifiée dans `test.tolerance`.

### Q18 : Qu'est-ce que la fonction `expandMul` dans le runner ?
- **Réponse** : C'est une transformation syntaxique `s.replace(/(\d)([a-z])/g, '$1*$2')` qui convertit les multiplications implicites (ex: `4x1` $\to$ `4*x1`), permettant d'accepter des écritures algébriques équivalentes.

### Q19 : Quel est le rôle de `command-validator.js` ?
- **Réponse** : Valider les commandes d'administration système sans exécution machine, en normalisant les espaces, en triant les options (`ls -la` = `ls -al`) et en détectant les quasi-erreurs fréquentes via des motifs de rejet ciblés.

### Q20 : Existe-t-il un risque de déni de service par regex (ReDoS) dans la validation de commandes ?
- **Réponse** : Non. Toute commande dépassant `MAX_COMMAND_LENGTH = 512` caractères est rejetée avant évaluation par regex.

---

## THÈME 4 — DOCIMOLOGIE ET QUALITÉ DES QCM (Q21 À Q28)

### Q21 : Combien de questions QCM la plateforme compte-t-elle au total ?
- **Réponse** : **3 158 questions réelles** (2 898 questions de cours et 260 questions d'examens). Le chiffre antérieur de 3 089 résultait d'une troncature artificielle.
- **Preuve** : Fichier [12_ANALYSE_184_QCM.md](file:///home/rd/Desktop/proba/AUDIT_GLOBAL_FINAL/12_ANALYSE_184_QCM.md).

### Q22 : Les clés de correction des QCM sont-elles exposées dans le DOM HTML ?
- **Réponse** : En mode sécurisé et examen, non. L'attribut `data-correct` et le texte de l'explication sont totalement absents du HTML servi. Seul le serveur Fastify détient la clé.

### Q23 : L'audit antérieur des 184 QCM signalés était-il scientifiquement valide ?
- **Réponse** : Non. Il s'agissait d'une attribution procédurale forcée par quotas rigides dans `scripts/build_finalisation_manifests.js` (ex: présence du mot « quel » étiquetée à tort `OPTION_TOUTES_AUCUNE`).

### Q24 : Combien de QCM présentent une réelle formulation négative ?
- **Réponse** : Exactement **35 questions** (et non 78 comme affirmé sous quota).

### Q25 : Combien de QCM comportent une réelle option « Toutes / Aucune de ces réponses » ?
- **Réponse** : Exactement **1 question** (et non 46 comme affirmé sous quota).

### Q26 : Quel est le véritable biais docimologique dominant du corpus QCM ?
- **Réponse** : L'**asymétrie de longueur** : **701 questions** présentent une réponse correcte nettement plus longue et détaillée que les distracteurs (> 2.0x), facilitant la devinette visuelle.
- **Preuve** : Fichier [13_ASYMETRIE_701_QCM.csv](file:///home/rd/Desktop/proba/AUDIT_GLOBAL_FINAL/13_ASYMETRIE_701_QCM.csv).

### Q27 : Quelle est l'intersection réelle entre les 184 fiches historiques et les 701 asymétries ?
- **Réponse** : L'intersection compte exactement **41 questions**. L'union réelle vaut $184 + 701 - 41 = \mathbf{844}$ questions.

### Q28 : Les explications de correction sont-elles didactiquement suffisantes ?
- **Réponse** : 68 % du corpus fournit un retour conceptuel solide expliquant pourquoi le distracteur est faux. 32 % se borne à une explication déclarative simple nécessitant un enrichissement (Lot B).

---

## THÈME 5 — SÉCURITÉ HTTP ET EXAMENS (Q29 À Q34)

### Q29 : Comment Fastify empêche-t-il les attaques par oracle sur les examens ?
- **Réponse** : Toute requête de vérification unitaire (`/api/qcm/verify`) émise pendant qu'une session d'examen sommative est active sur le cours est systématiquement bloquée en code HTTP 403 Forbidden.
- **Preuve** : Fichier [http_adversarial_proofs.log](file:///home/rd/Desktop/proba/AUDIT_GLOBAL_FINAL/PREUVES/http_adversarial_proofs.log) Vecteur 1.

### Q30 : Un étudiant peut-il soumettre l'examen d'un autre étudiant (usurpation IDOR) ?
- **Réponse** : Non. Le serveur vérifie que le `userId` extrait du JWT sécurisé correspond au propriétaire enregistré de la session. En cas de discordance, la requête est rejetée en 403 Forbidden.

### Q31 : Que se passe-t-il si un étudiant soumet un examen après le temps imparti ?
- **Réponse** : La soumission est rejetée avec une erreur 400 Bad Request pour expiration temporelle.

### Q32 : Une session d'examen peut-elle être modifiée après validation finale ?
- **Réponse** : Non. La soumission verrouille définitivement la session en base. Toute tentative de réévaluation ultérieure est rejetée en 400 Bad Request.

### Q33 : Le système résiste-t-il aux courses critiques (soumissions concurrentes) ?
- **Réponse** : Oui. Le verrou atomique accepte la première requête valide (`200 OK`) et rejette instantanément les 4 requêtes concurrentes en 400 Bad Request.

### Q34 : Quelles protections de transport HTTP sont actives sur l'API ?
- **Réponse** : HSTS (`max-age=15552000`), CSP strict, X-Content-Type-Options `nosniff`, X-Frame-Options `SAMEORIGIN` et rate-limiting par IP.

---

## THÈME 6 — ACCESSIBILITÉ WCAG 2.2 AA (Q35 À Q38)

### Q35 : Les QCM utilisent-ils des balises `<fieldset>`, `<legend>` et `<input type="radio">` ?
- **Réponse** : **Non, absolument pas.** Le code généré dans [scripts/course-kit.js](file:///home/rd/Desktop/proba/scripts/course-kit.js#L378) utilise `<div class="q">` et `<button class="opt">`.

### Q36 : Cette structure est-elle conforme au critère WCAG 2.2 1.3.1 (Information et relations) ?
- **Réponse** : Non. Elle viole le critère 1.3.1 car les technologies d'assistance ne perçoivent pas le regroupement sémantique des options.

### Q37 : Les options indiquent-elles leur état coché/non coché aux lecteurs d'écran ?
- **Réponse** : Non. L'attribut `aria-checked` est absent, violant le critère WCAG 4.1.2 (Nom, rôle, valeur).

### Q38 : Comment corriger cette non-conformité sans briser les feuilles de style ?
- **Réponse** : En ajoutant `role="radiogroup"` sur le conteneur, `role="radio"` et `aria-checked="false|true"` sur les boutons existants dans `scripts/course-kit.js` (Lot A).

---

## THÈME 7 — PERSISTANCE ET MIGRATIONS POSTGRESQL (Q39 À Q42)

### Q39 : Combien de migrations SQL composent le schéma de la plateforme ?
- **Réponse** : Exactement **5 migrations** (`001_init.sql` à `005_fedapay_webhook_events.sql`).

### Q40 : Les migrations sont-elles idempotentes ?
- **Réponse** : Oui. Ré-exécutées sur une base déjà migrée, les 5 scripts s'appliquent sans aucune erreur ni altération de données existantes.
- **Preuve** : Fichier [postgresql_isolated_run.log](file:///home/rd/Desktop/proba/AUDIT_GLOBAL_FINAL/PREUVES/postgresql_isolated_run.log).

### Q41 : Les contraintes de clés étrangères et d'unicité sont-elles actives ?
- **Réponse** : Oui. Les violations provoquent les codes d'erreur standards PostgreSQL `23503` (clé étrangère) et `23505` (unicité).

### Q42 : Les données de progression d'un étudiant sont-elles isolées des autres apprenants ?
- **Réponse** : Oui. L'étanchéité multi-utilisateurs a été vérifiée expérimentalement entre deux comptes distincts.

---

## THÈME 8 — MÉTROLOGIE, RISQUES ET GOUVERNANCE (Q43 À Q48)

### Q43 : Quel est le principal risque résiduel de la plateforme aujourd'hui ?
- **Réponse** : La clause d'échappement de [server/exercises/grading-policy.js](file:///home/rd/Desktop/proba/server/exercises/grading-policy.js#L39) qui désactive le contrôle d'intégrité SHA-256 pour les 792 fiches `analyse`.

### Q44 : Les 814 fiches actives peuvent-elles être utilisées en examen sommatif officiel ?
- **Réponse** : Non recommandé en l'état. Comme 80,1 % d'entre elles ne possèdent aucun test négatif ni limite, il est fortement préconisé de les réserver à l'entraînement formatif (`ENTRAINEMENT_FORMATIF_SEUL`) en attendant leur enrichissement (Lot C).

### Q45 : Quel est l'état de la suite de tests automatisés ?
- **Réponse** : **8 398 tests réussis**, 0 échec et 3 sautés (justifiés par l'absence d'outils de sonde système). Code de retour 0.

### Q46 : Les pages HTML sont-elles synchronisées avec les modules de cours ?
- **Réponse** : Oui. `npm run courses:check` valide que les 832 pages générées sont strictement conformes aux sources.

### Q47 : Quel est le rôle réservé à la commission pédagogique enseignante ?
- **Réponse** : Réécrire les 844 QCM signalés, valider la conformité des 814 fiches aux annales d'examen et concevoir les nouveaux ateliers des 7 cours suspendus.

### Q48 : Quel est le verdict global de cet audit forensique ?
- **Réponse** : **Socle technique, architectural et sécuritaire excellent et validé avec preuves réelles.** La plateforme est opérationnelle pour l'entraînement formatif des étudiants, sous réserve d'appliquer les Lots A et B avant tout déploiement en session d'examen sommatif à fort enjeu.

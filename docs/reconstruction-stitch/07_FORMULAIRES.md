# 07 — Formulaires

> 20 formulaires détectés dans tout le dépôt ; **8 sur les surfaces réellement servies** (4 sur la connexion, 1 sur le login admin, 3 sur la console admin). Les autres appartiennent aux archives `b1/public/` (activateur à clé, ancienne console).
> Aucun formulaire n'existe sur le portail, les pages de cours, les annales ni Preparation Web (les champs y sont pilotés par JavaScript hors `<form>`).

## 1. Connexion (`_auth/login.html` → `public/login.html`)

La page contient **quatre formulaires mutuellement exclusifs** dans une seule carte. Un seul est visible à la fois (`is-visible`), les autres sont `hidden`.

### 1.1 Connexion — `#loginForm`

| Champ | type | id | autocomplete | requis | Label |
|---|---|---|---|---|---|
| Email | email | `loginEmail` | email | oui | Email |
| Mot de passe | password | `loginPassword` | current-password | oui | Mot de passe |

- Validation : native désactivée (`novalidate`), validation serveur.
- Soumission : `POST /api/login` avec `{email, password, fingerprint}`.
- Pendant l'appel : bouton `#loginBtn` désactivé.
- Erreur : bandeau `#loginMsg` (`role="alert"`) en rouge, texte serveur.
- Succès : redirection vers `?redirect=` ou `/`.
- Lien secondaire : « Mot de passe oublié ? ».

### 1.2 Inscription — `#registerForm`

| Champ | type | id | autocomplete | requis | Label |
|---|---|---|---|---|---|
| Email | email | `regEmail` | email | oui | Email |
| Prénom | text | `regName` | given-name | non | Prénom (optionnel) |
| Mot de passe | password | `regPassword` | new-password | oui, min 8 | Mot de passe (8 caractères minimum) |
| Niveau | boutons radio | `levelGrid` | — | oui (défaut B2) | Mon niveau |

- Sélecteur de niveau : trois boutons `.level-card` (B1 24 cours, B2 48 cours, B3 71 cours), `role="radiogroup"` / `role="radio"` / `aria-checked`.
- Message d'aide sous la grille : « Chaque niveau inclut les précédents… ».
- Soumission : `POST /api/register` avec `{email, password, displayName, level, fingerprint}`.
- Succès : message vert « Compte créé ! Redirection… » puis redirection.
- Erreurs serveur : email invalide, mot de passe trop court, compte existant (409).

### 1.3 Mot de passe oublié — `#forgotForm`

| Champ | type | id | requis |
|---|---|---|---|
| Email | email | `forgotEmail` | oui |

- Soumission : `POST /api/forgot-password`.
- Réponse toujours générique (anti-énumération), sauf en développement explicite où un `devResetUrl` est renvoyé et affiché.
- Bouton « Recevoir le lien », puis « Retour à la connexion ».

### 1.4 Nouveau mot de passe — `#resetForm`

| Champ | type | id | requis |
|---|---|---|---|
| Nouveau mot de passe | password | `resetPassword` | oui, min 8 |

- Affiché uniquement si l'URL contient `?reset=<token>`.
- Soumission : `POST /api/reset-password` avec `{token, password}`.
- Succès : message vert puis retour automatique à la connexion après 1,6 s.
- Erreur : « Lien invalide ou expiré. Refais une demande. »

### États de la page

| État | Déclencheur | Visuel |
|---|---|---|
| Connexion | défaut | onglet gauche actif, titre « Connexion » |
| Inscription | clic onglet ou `?mode=register` | onglet droit actif, titre « Inscription » |
| Mot de passe oublié | clic lien | formulaire seul, titre « Mot de passe oublié » |
| Nouveau mot de passe | `?reset=` | formulaire seul, titre « Nouveau mot de passe » |
| Déjà connecté | `/api/verify` authentifié | redirection vers `account.html?redirect=` |
| Erreur réseau | fetch échoue | « Erreur réseau. Réessaie. » |

## 2. Connexion administrateur (`_auth/admin/login.html`)

| Champ | type | id | autocomplete | requis |
|---|---|---|---|---|
| Nom d'utilisateur | text | `username` | username | oui, autofocus |
| Mot de passe | password | `password` | current-password | oui |

- Soumission : `POST /api/admin/login`.
- Pendant l'appel : bouton désactivé, contenu remplacé par un spinner + « Connexion... ».
- Succès : bouton vert avec icône check + « Connecté ! », puis redirection vers le dashboard après 0,6 s.
- Erreur : `#errorMsg` (`.auth-message-error`) visible, « Identifiants incorrects » ou message serveur.
- Vérification préalable : `GET /api/admin/verify` ; si déjà admin, redirection immédiate.
- Lien « Retour au site ».

## 3. Console admin — création de compte (`#createForm`)

| Champ | type | id | Contraintes | Label |
|---|---|---|---|---|
| Email | email | `userEmail` | requis, max 255 | Email * |
| Mot de passe | text (visible) | `userPassword` | requis, min 8, max 100 | Mot de passe * (8+) |
| Prénom / description | text | `userDisplay` | max 120 | Prénom / description |
| Abonnement initial | select | `userMonths` | 0, 1 (défaut), 3, 6, 12 | Abonnement initial |
| — | submit | `btnCreate` | — | Créer le compte |

**Particularité** : le mot de passe est en `type="text"` pour être lu et transmis à l'élève ; le placeholder l'annonce (« à transmettre à l'élève »).

## 4. Console admin — configuration IA (`#aiConfigForm`)

| Champ | type | id | Options |
|---|---|---|---|
| Fournisseur actif | select | `aiProviderSelect` | OpenRouter AI, NVIDIA NIM, Ollama Cloud / VPS Local, Endpoint Personnalisé |
| Modèle Chat Assistant | select + input | `aiChatModelSelect`, `aiChatModelCustom` | liste chargée dynamiquement ; champ libre affiché au besoin |
| Modèle Tuteur Code | select + input | `aiCodeModelSelect`, `aiCodeModelCustom` | idem |
| Actions | buttons | `btnFetchModels`, `btnSaveAiConfig` | « Actualiser modèles », « Enregistrer » |

Le formulaire ne contient pas de champ température/max tokens alors que l'API les accepte : l'UI n'expose que fournisseur et modèles.

## 5. Console admin — ajout de clé IA (`#addAiKeyForm`)

| Champ | type | id | Requis |
|---|---|---|---|
| Fournisseur | select | `newKeyProvider` | oui |
| Clé API | password | `newKeySecret` | oui, autocomplete off |
| Libellé / note | text | `newKeyLabel` | non |
| URL de base | text | `newKeyBaseUrl` | non |
| Actions | buttons | `btnTestNewKey`, `btnAddKey` | « Tester », « Ajouter au Pool » |

Le résultat du test s'affiche dans `#newKeyTestResult` (masqué au départ).

## 6. Champs hors formulaire (pilotés par JS)

| Surface | Champ | Comportement |
|---|---|---|
| Portail | `#courseSearch` | filtrage en direct, pas de soumission |
| Admin | `#userSearch` | debounce 300 ms, `GET /users?search=` |
| Code lab | `[data-lab-stdin]` | textarea dans un `<details>` |
| Code lab | `[data-lab-question]` | question au tuteur, Entrée = envoyer |
| Code lab | `[data-lab-picker]` | select de langage |
| QCM | `.opt` | boutons, pas de radio |
| Préparation | `#htmlEditor`, `#cssEditor` (readonly), `#jsEditor` | textareas CodeMirror |
| Préparation | `#cssToggle` | interrupteur |
| Préparation | `#aiInput` | question à l'assistant |
| Préparation | `#aiSend` | envoi |
| Connexion admin | — | — |

## 7. Validation et messages

| Cas | Message observé |
|---|---|
| Email invalide (inscription) | « Adresse email invalide. » |
| Mot de passe court | « Le mot de passe doit contenir au moins 8 caractères. » |
| Compte existant | « Un compte existe déjà avec cet email. Connecte-toi. » |
| Identifiants incorrects | « Email ou mot de passe incorrect. » |
| Compte désactivé | « Ce compte est désactivé. Contacte l'administrateur. » |
| Champs vides (admin) | « Veuillez remplir tous les champs » |
| Erreur réseau | « Erreur réseau. Réessaie. » |
| Reset invalide | « Lien invalide ou expiré. Refais une demande. » |
| Paiement indisponible | « Paiement en ligne bientôt disponible. Contacte Donald pour activer ton abonnement. » |

## 8. Accessibilité des formulaires

- Tous les champs des formulaires actifs ont un `label for` (vérifié à l'extraction).
- Les messages d'erreur sont dans des conteneurs `role="alert"` sur la connexion.
- Les champs admin n'ont pas tous d'`id` sur leurs labels (`<label>Email *</label>` sans `for`) : à corriger pour Stitch/WCAG.
- Aucun `fieldset`/`legend` pour les groupes (niveau d'inscription, filtres).
- Le bouton de soumission reste le seul moyen de valider ; pas de validation à la frappe, sauf recherche.

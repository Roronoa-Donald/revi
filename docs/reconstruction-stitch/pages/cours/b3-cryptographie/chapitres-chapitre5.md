# Chapitre 5 — Signatures Numériques, PKI & Gestion des Certificats X.509

> Fiche extraite du fichier `b3-cryptographie/chapitres/chapitre5.html` (554 lignes, 45.1 Ko, sha256 `f5e19bf2dc92`).
> Famille : **cours-b3-cryptographie** · sous-type : `chapitre` · statut : **servi-canonique**.
> Cette fiche decrit ce que le document contient reellement ; les elements deduits du JavaScript sont signales `[deduit]` et references au document thematique.

## 1. Identite et acces

| Champ | Valeur |
|---|---|
| URL servie | `/b3-cryptographie/chapitres/chapitre5.html` |
| Titre du document | Module 5 — Signatures Numériques, PKI & Gestion des Certificats X.509 \| Cryptographie & PKI B3 |
| Description meta | Module 5 du cours Cryptographie & PKI B3 : Mécanisme formel de la signature numérique (RSA Sign & Verify, RSA-PSS, ECDSA, Ed25519), non-répudiation et authenticité d'origine, architecture d'une Infrastructure à Clés Publiques (PKI / IGC), hiérarchie de confiance (Root CA, Sub-CA intermédiaire), norme de certificats X.509 v3 (RFC 5280), extensions critiques (SAN, Key Usage, Basic Constraints), cycle de vie d'un certificat (CSR), validation de chaîne de certification et mécanismes de révocation (CRL, OCSP et OCSP Stapling). Notions clés, démonstrations, ateliers de code interactifs, QCM corrigés. |
| Robots | indexable (defaut) |
| Langue / theme | `fr` / `defaut` |
| Chapitre (body) | 5 |
| Regle d'acces | Compte connecte + niveau B3 ou superieur + abonnement actif |
| Statut de service | servi-canonique |

## 2. Structure du document (ordre observe)

| # | Element | Classe / role | Contenu cle |
|---|---|---|---|
| 1 | nav | skip-nav | 1 liens, aria="Accès rapide" |
| 2 | h1 | — | Chapitre 5 — Signatures Numériques, PKI & Gestion des Certificats X.509 |
| 3 | h2 | — | 1. Signatures Numériques : RSA Sign & Verify, ECDSA et Ed25519 |
| 4 | h2 | — | 2. Infrastructure à Clés Publiques (PKI / IGC) & Hiérarchie de Confiance |
| 5 | h2 | — | 3. Format X.509 v3, Encodage ASN.1 & Extensions Critiques |
| 6 | h2 | — | 4. Cycle de Vie, Algorithme de Validation & Révocation (CRL / OCSP) |
| 7 | h2 | — | 5. Études de cas & applications pratiques |
| 8 | h2 | — | 6. QCM — niveau examen |
| 9 | h2 | — | 7. Erreurs classiques — récapitulatif |
| 10 | h2 | — | 8. Méthodologie de résolution |
| 11 | h2 | — | 9. Révision active |
| 12 | h2 | — | 10. Test de maîtrise |
| 13 | .lab | code lab | 3 bloc(s) |
| 14 | .qcm | QCM | 5 question(s) |

## 3. Hierarchie des titres

- **H1** — Chapitre 5 — Signatures Numériques, PKI & Gestion des Certificats X.509
  - **H2** — 1. Signatures Numériques : RSA Sign & Verify, ECDSA et Ed25519
      - **H4** — Calcul RSA jouet et signature réelle
      - **H4** — Signatures Modernes : ECDSA vs EdDSA (Ed25519)
  - **H2** — 2. Infrastructure à Clés Publiques (PKI / IGC) & Hiérarchie de Confiance
      - **H4** — Les Acteurs d'une Architecture PKI
      - **H4** — Pourquoi une Hiérarchie à Plusieurs Niveaux ?
  - **H2** — 3. Format X.509 v3, Encodage ASN.1 & Extensions Critiques
      - **H4** — Champs Fondamentaux X.509
      - **H4** — Extensions Standard RFC 5280
  - **H2** — 4. Cycle de Vie, Algorithme de Validation & Révocation (CRL / OCSP)
      - **H4** — Algorithme de Validation de Chaîne (RFC 5280)
      - **H4** — Mécanismes de Révocation : CRL vs OCSP
  - **H2** — 5. Études de cas & applications pratiques
    - **H3** — Exercice 1 — Simulateur de Signature Numérique et Vérification (RSA Sign & Verify)
    - **H3** — Exercice 2 — Contrôle Partiel d’un Nom DNS SAN et des Dates d’un Certificat X.509
    - **H3** — Exercice 3 — Contrôle Partiel de Chaîne PKI et de Liste de Révocation Fictive
  - **H2** — 6. QCM — niveau examen
  - **H2** — 7. Erreurs classiques — récapitulatif
  - **H2** — 8. Méthodologie de résolution
  - **H2** — 9. Révision active
    - **H3** — Checklist de maîtrise
    - **H3** — Les 8 notions à connaître absolument
  - **H2** — 10. Test de maîtrise

## 4. Navigation et liens

| Zone | Classe | Liens |
|---|---|---|
| nav | `skip-nav` | Aller au contenu → `#content` |
| nav | `b3-cryptographienav` | Portail → `/`<br>Cryptographie & PKI B3 → `../index.html`<br>Sommaire → `../sommaire.html`<br>Ch. 1 → `../chapitres/chapitre1.html`<br>Ch. 2 → `../chapitres/chapitre2.html`<br>Ch. 3 → `../chapitres/chapitre3.html`<br>Ch. 4 → `../chapitres/chapitre4.html`<br>Ch. 5 → `../chapitres/chapitre5.html`<br>Ch. 6 → `../chapitres/chapitre6.html`<br>Cartes → `../chapitres/cartes.html`<br>Mémo → `../chapitres/formules.html`<br>Exercices → `../chapitres/exercices.html`<br>Atelier → `../atelier.html`<br>Examen → `../chapitres/examens.html` |

Liens sortants : **21** (externes : 0).

| Libelle | href | Cible resolue | Type |
|---|---|---|---|
| Aller au contenu | `#content` | `#content` | ancre |
| Portail | `/` | `.` | interne |
| Cryptographie & PKI B3 | `../index.html` | `b3-cryptographie/index.html` | interne |
| Sommaire | `../sommaire.html` | `b3-cryptographie/sommaire.html` | interne |
| Ch. 1 | `../chapitres/chapitre1.html` | `b3-cryptographie/chapitres/chapitre1.html` | interne |
| Ch. 2 | `../chapitres/chapitre2.html` | `b3-cryptographie/chapitres/chapitre2.html` | interne |
| Ch. 3 | `../chapitres/chapitre3.html` | `b3-cryptographie/chapitres/chapitre3.html` | interne |
| Ch. 4 | `../chapitres/chapitre4.html` | `b3-cryptographie/chapitres/chapitre4.html` | interne |
| Ch. 5 | `../chapitres/chapitre5.html` | `b3-cryptographie/chapitres/chapitre5.html` | interne |
| Ch. 6 | `../chapitres/chapitre6.html` | `b3-cryptographie/chapitres/chapitre6.html` | interne |
| Cartes | `../chapitres/cartes.html` | `b3-cryptographie/chapitres/cartes.html` | interne |
| Mémo | `../chapitres/formules.html` | `b3-cryptographie/chapitres/formules.html` | interne |
| Exercices | `../chapitres/exercices.html` | `b3-cryptographie/chapitres/exercices.html` | interne |
| Atelier | `../atelier.html` | `b3-cryptographie/atelier.html` | interne |
| Examen | `../chapitres/examens.html` | `b3-cryptographie/chapitres/examens.html` | interne |
| Réviser avec les flashcards | `cartes.html` | `b3-cryptographie/chapitres/cartes.html` | interne |
| Mémo syntaxe | `formules.html` | `b3-cryptographie/chapitres/formules.html` | interne |
| Module 6 — Protocoles Cryptographiques Sécurisés (TLS, SSH, IPsec) & Post-Quantique | `chapitre6.html` | `b3-cryptographie/chapitres/chapitre6.html` | interne |

## 5. Formulaires et champs

Aucun formulaire dans cette page.
## 6. Boutons et controles interactifs

| Libelle | type | id | classes | aria-label | Etat initial | data-* |
|---|---|---|---|---|---|---|
| (icone) | button | themeToggle | `theme-toggle` | Activer le mode sombre | actif | — |
| Création avec la clé publique, vérification avec la clé privée |  | — | `opt` | — | actif | — |
| Création avec la clé privée de l'émetteur, vérification avec la clé publique de l'émetteur |  | — | `opt` | — | actif | data-correct=1 |
| Création avec la clé symétrique AES, vérification avec le mot de passe |  | — | `opt` | — | actif | — |
| Création avec la clé privée du destinataire, vérification avec sa clé publique |  | — | `opt` | — | actif | — |
| Common Name (CN) |  | — | `opt` | — | actif | — |
| Subject Alternative Name (SAN) |  | — | `opt` | — | actif | data-correct=1 |
| Organizational Unit (OU) |  | — | `opt` | — | actif | — |
| Locality Name (L) |  | — | `opt` | — | actif | — |
| Le certificat est révoqué immédiatement |  | — | `opt` | — | actif | — |
| Le certificat appartient à une entité finale et ne peut en aucun cas signer d'autres certi |  | — | `opt` | — | actif | data-correct=1 |
| Le certificat est exempté de date d'expiration |  | — | `opt` | — | actif | — |
| Le certificat ne fonctionne que sur le protocole HTTP |  | — | `opt` | — | actif | — |
| Il rend les certificats gratuits |  | — | `opt` | — | actif | — |
| Il évite au client de contacter la CA, préservant la vie privée et réduisant la latence de |  | — | `opt` | — | actif | data-correct=1 |
| Il remplace le chiffrement AES par RSA |  | — | `opt` | — | actif | — |
| Il supprime le besoin d'une autorité racine |  | — | `opt` | — | actif | — |
| www.domaine.fr |  | — | `opt` | — | actif | — |
| api.domaine.fr |  | — | `opt` | — | actif | — |
| mail.domaine.fr |  | — | `opt` | — | actif | — |
| espace.client.domaine.fr |  | — | `opt` | — | actif | data-correct=1 |

## 7. Composants pedagogiques et etats observes

| Exercice | Langage | Hauteur | Correction | Entree standard | Titre |
|---|---|---|---|---|---|
| `cr3-c5-e1` | analyse | 300 | active | `SIGN n=3233 d=2753 text=CONTRAT_OFFICIEL` | Exercice 1 — Simulateur de Signature Numérique et Vérification (RSA Sign & Verify) |
| `cr3-c5-e2` | analyse | 300 | active | `CERT_VALIDATE fqdn=api.cloud.corp date=2026-10-15 cn=api.cloud.corp san=*.cloud.corp,cloud.corp not_before=2026-01-01 not_after=2027-01-01 is_ca=false` | Exercice 2 — Contrôle Partiel d’un Nom DNS SAN et des Dates d’un Certificat X.509 |
| `cr3-c5-e3` | analyse | 300 | active | `PKI_CHAIN trust_root=DigiTrust_Root_CA crl_revoked=SN-999 CERT subject=api.bank.com issuer=DigiTrust_Intermediate_CA serial=SN-1001 is_ca=false CERT subject=DigiTrust_Intermediate_CA issuer=DigiTrust_Root_CA serial=SN-2001 is_ca=true CERT subject=DigiTrust_Root_CA issuer=DigiTrust_Root_CA serial=SN-3001 is_ca=true` | Exercice 3 — Contrôle Partiel de Chaîne PKI et de Liste de Révocation Fictive |

- QCM : 1 bloc(s), **5 question(s)**.
- Encadres pedagogiques : 8 (`.box`, variantes `box--*`).
- Blocs replies : 3 (`<details>`).

Etats et interactions a reconstruire :

- En-tete compact : fil d'Ariane, titre, meta (module, duree, statut gratuit).
- Encadres pedagogiques : mise en situation, objectifs, intuition, piege, methode, technique, revision.
- Tableaux de donnees et blocs pseudo-code defilables horizontalement.
- Exercices de code (`div.lab[data-lab]`) : editeur, entree standard, console a 3 onglets, tuteur IA.
- Correction suspendue si `data-grading-suspended="1"` : bouton « Validation suspendue » desactive et avis visible.
- QCM : options desactivees apres reponse, bonne reponse `is-correct`, mauvaise `is-wrong`, explication `is-shown`.
- Score QCM : `Score : n/N (p %)` + palier de maitrise (4 bandes).
- Checklist de maitrise : case `data-mark-done`, etat persiste en localStorage par chapitre.
- Navigation de bas de page : chapitre precedent / suivant.

## 8. Tableaux, code et medias

- Tableaux : 0
- Blocs `pre` : 3 · elements `code` : 61
- SVG inline : 22 · images : 0
- Icones du sprite utilisees : `#i-house`, `#i-lock`, `#i-play`, `#i-target`, `#i-info`, `#i-warning`, `#i-book`, `#i-lightbulb`, `#i-compass`, `#i-pin`, `#i-cards`, `#i-file`, `#i-chart`, `#i-arrow-left`, `#i-arrow-right`
- Volume de texte : ~4160 mots · 503 noeuds HTML

## 9. Ressources chargees

- Feuilles de style : `https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;600;700;800&display=swap`, `/assets/css/tokens.css`, `../assets/css/cours.css`, `/assets/css/code-lab.css`, `/assets/vendor/katex/katex.min.css`
- Scripts externes : `/assets/js/theme.js`, `../assets/js/cours.js`, `/assets/vendor/katex/katex.min.js`, `/assets/vendor/katex/auto-render.min.js`, `/assets/js/code-lab.js`
- Blocs `<style>` inline : 0 · scripts inline : 4

## 10. Classes et attributs data observes

Classes distinctes : 68. Les plus frequentes :

| Classe | Occurrences |
|---|---|
| `ic` | 20 |
| `opt` | 20 |
| `box` | 8 |
| `box__title` | 8 |
| `card` | 8 |
| `q` | 5 |
| `q__stem` | 5 |
| `opts` | 5 |
| `q__exp` | 5 |
| `grid` | 4 |
| `grid-2` | 4 |
| `btn` | 4 |
| `bandrow` | 4 |
| `tag` | 3 |
| `lab` | 3 |
| `lab__head` | 3 |
| `lab__title` | 3 |
| `lab__meta` | 3 |
| `lab__lang` | 3 |
| `lab__formative` | 3 |

Attributs `data-*` : `data-correct` (5), `data-lab` (3), `data-exercise` (3), `data-language` (3), `data-height` (3), `data-stdin` (3), `data-lab-starter` (3), `data-chapter` (1), `data-mark-done` (1)

## 11. Controle qualite automatique

- Titres `h1` : 1
- Boutons sans texte ni aria-label : 0
- Champs identifies sans label associe : 0
- Images sans attribut alt : 0
- Liens sans texte ni aria-label : 0
- Emoji detectes : 0 (la charte du produit les proscrit)

## 12. Renvois

- Layouts et gabarits : [04_LAYOUTS_ET_STRUCTURES.md](../../../04_LAYOUTS_ET_STRUCTURES.md)
- Composants et etats : [05_COMPOSANTS_REUTILISABLES.md](../../../05_COMPOSANTS_REUTILISABLES.md) · [10_ETATS_INTERFACE.md](../../../10_ETATS_INTERFACE.md)
- Regles d'acces : [11_ETATS_CONDITIONNELS.md](../../../11_ETATS_CONDITIONNELS.md) · [17_REGLES_METIER.md](../../../17_REGLES_METIER.md)
- Captures a produire : [22_REGISTRE_CAPTURES.md](../../../22_REGISTRE_CAPTURES.md)

*Fiche generee le 2026-11-05 par `tools/extract.mjs` ; donnees brutes dans `evidence/pages.json`.

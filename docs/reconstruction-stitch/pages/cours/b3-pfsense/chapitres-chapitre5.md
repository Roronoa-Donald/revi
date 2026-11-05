# Chapitre 5 — Tunnels VPN Sécurisés : OpenVPN (SSL/TLS) & IPsec Site-à-Site

> Fiche extraite du fichier `b3-pfsense/chapitres/chapitre5.html` (599 lignes, 48.7 Ko, sha256 `16bda51b1952`).
> Famille : **cours-b3-pfsense** · sous-type : `chapitre` · statut : **servi-canonique**.
> Cette fiche decrit ce que le document contient reellement ; les elements deduits du JavaScript sont signales `[deduit]` et references au document thematique.

## 1. Identite et acces

| Champ | Valeur |
|---|---|
| URL servie | `/b3-pfsense/chapitres/chapitre5.html` |
| Titre du document | Chapitre 5 — Tunnels VPN Sécurisés : OpenVPN (SSL/TLS) &amp; IPsec Site-à-Site \| pfSense & Routage B3 |
| Description meta | Chapitre 5 du cours pfSense & Routage B3 : PKI interne pfSense, OpenVPN nomade SSL/TLS, révocation CRL, IPsec IKEv2 site-à-site, choix cryptographiques et Split vs Full Tunneling. Notions fondamentales, ateliers de programmation interactifs, QCM corrigés. |
| Robots | indexable (defaut) |
| Langue / theme | `fr` / `defaut` |
| Chapitre (body) | 5 |
| Regle d'acces | Compte connecte + niveau B3 ou superieur + abonnement actif |
| Statut de service | servi-canonique |

## 2. Structure du document (ordre observe)

| # | Element | Classe / role | Contenu cle |
|---|---|---|---|
| 1 | nav | skip-nav | 1 liens, aria="Accès rapide" |
| 2 | h1 | — | Chapitre 5 — Tunnels VPN Sécurisés : OpenVPN (SSL/TLS) & IPsec Site-à-Site |
| 3 | h2 | — | 1. Prérequis intégré : Fondements de la PKI X.509 et des phases IPsec IKEv2 (lien avec Cryptographie B3) |
| 4 | h2 | — | 2. Infrastructure à Clés Publiques (PKI X.509) Interne sous pfSense |
| 5 | h2 | — | 3. Passerelle OpenVPN Nomade : SSL/TLS, Client Export & Routage |
| 6 | h2 | — | 4. Tunnels IPsec IKEv2 Site-à-Site & Durcissement Cryptographique |
| 7 | h2 | — | 5. Études de cas & applications pratiques |
| 8 | h2 | — | 6. QCM — niveau examen |
| 9 | h2 | — | 7. Erreurs classiques — récapitulatif |
| 10 | h2 | — | 8. Méthodologie de résolution |
| 11 | h2 | — | 9. Révision active |
| 12 | h2 | — | 10. Test de maîtrise |
| 13 | .lab | code lab | 3 bloc(s) |
| 14 | .qcm | QCM | 8 question(s) |

## 3. Hierarchie des titres

- **H1** — Chapitre 5 — Tunnels VPN Sécurisés : OpenVPN (SSL/TLS) & IPsec Site-à-Site
  - **H2** — 1. Prérequis intégré : Fondements de la PKI X.509 et des phases IPsec IKEv2 (lien avec Cryptographie B3)
  - **H2** — 2. Infrastructure à Clés Publiques (PKI X.509) Interne sous pfSense
      - **H4** — 1. La Chaîne de Confiance X.509
      - **H4** — 2. Révocation et Liste de Révocation (CRL)
  - **H2** — 3. Passerelle OpenVPN Nomade : SSL/TLS, Client Export & Routage
      - **H4** — 1. Mode d’Authentification Recommandé
      - **H4** — 2. Arbitrage : Full Tunneling vs Split Tunneling
  - **H2** — 4. Tunnels IPsec IKEv2 Site-à-Site & Durcissement Cryptographique
      - **H4** — 1. Les Deux Phases de Négociation IKEv2
      - **H4** — 2. Choix cryptographiques et compatibilité IKEv2
  - **H2** — 5. Études de cas & applications pratiques
    - **H3** — Exercice 1 — Analyse pédagogique de certificats et de CRL OpenVPN
    - **H3** — Exercice 2 — Classement pédagogique de propositions IKEv2 (IPsec)
    - **H3** — Exercice 3 — Calculateur de routage de tunnel VPN (Split Tunneling vs Full Tunneling)
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
| nav | `b3-pfsensenav` | Portail → `/`<br>pfSense & Routage B3 → `../index.html`<br>Sommaire → `../sommaire.html`<br>Ch. 1 → `../chapitres/chapitre1.html`<br>Ch. 2 → `../chapitres/chapitre2.html`<br>Ch. 3 → `../chapitres/chapitre3.html`<br>Ch. 4 → `../chapitres/chapitre4.html`<br>Ch. 5 → `../chapitres/chapitre5.html`<br>Ch. 6 → `../chapitres/chapitre6.html`<br>Cartes → `../chapitres/cartes.html`<br>Mémo → `../chapitres/formules.html`<br>Exercices → `../chapitres/exercices.html`<br>Atelier → `../atelier.html`<br>Examen → `../chapitres/examens.html` |

Liens sortants : **29** (externes : 8).

| Libelle | href | Cible resolue | Type |
|---|---|---|---|
| Aller au contenu | `#content` | `#content` | ancre |
| Portail | `/` | `.` | interne |
| pfSense & Routage B3 | `../index.html` | `b3-pfsense/index.html` | interne |
| Sommaire | `../sommaire.html` | `b3-pfsense/sommaire.html` | interne |
| Ch. 1 | `../chapitres/chapitre1.html` | `b3-pfsense/chapitres/chapitre1.html` | interne |
| Ch. 2 | `../chapitres/chapitre2.html` | `b3-pfsense/chapitres/chapitre2.html` | interne |
| Ch. 3 | `../chapitres/chapitre3.html` | `b3-pfsense/chapitres/chapitre3.html` | interne |
| Ch. 4 | `../chapitres/chapitre4.html` | `b3-pfsense/chapitres/chapitre4.html` | interne |
| Ch. 5 | `../chapitres/chapitre5.html` | `b3-pfsense/chapitres/chapitre5.html` | interne |
| Ch. 6 | `../chapitres/chapitre6.html` | `b3-pfsense/chapitres/chapitre6.html` | interne |
| Cartes | `../chapitres/cartes.html` | `b3-pfsense/chapitres/cartes.html` | interne |
| Mémo | `../chapitres/formules.html` | `b3-pfsense/chapitres/formules.html` | interne |
| Exercices | `../chapitres/exercices.html` | `b3-pfsense/chapitres/exercices.html` | interne |
| Atelier | `../atelier.html` | `b3-pfsense/atelier.html` | interne |
| Examen | `../chapitres/examens.html` | `b3-pfsense/chapitres/examens.html` | interne |
| RFC 5280, § 3.3 et 5.1.2.5 (mai 2008) | `https://www.rfc-editor.org/rfc/rfc5280.html#section-3.3` | `https://www.rfc-editor.org/rfc/rfc5280.html#section-3.3` | externe |
| Netgate, paramètres cryptographiques OpenVPN (23 décembre 2025) | `https://docs.netgate.com/pfsense/en/latest/vpn/openvpn/configure-server-crypto.html` | `https://docs.netgate.com/pfsense/en/latest/vpn/openvpn/configure-server-crypto.html` | externe |
| Netgate, gestion des CRL (15 décembre 2025) | `https://docs.netgate.com/pfsense/en/latest/certificates/crl.html` | `https://docs.netgate.com/pfsense/en/latest/certificates/crl.html` | externe |
| manuel OpenVPN 2.6, option crl-verify | `https://openvpn.net/community-docs/community-articles/openvpn-2-6-manual/` | `https://openvpn.net/community-docs/community-articles/openvpn-2-6-manual/` | externe |
| registre IANA IKEv2, type 4 (mis à jour le 28 octobre 2026) | `https://www.iana.org/assignments/ikev2-parameters/ikev2-parameters.xhtml` | `https://www.iana.org/assignments/ikev2-parameters/ikev2-parameters.xhtml` | externe |
| RFC 8247, § 2.4 (septembre 2017) | `https://www.rfc-editor.org/rfc/rfc8247.html#section-2.4` | `https://www.rfc-editor.org/rfc/rfc8247.html#section-2.4` | externe |
| RFC 9395 (avril 2023) | `https://www.rfc-editor.org/rfc/rfc9395.html` | `https://www.rfc-editor.org/rfc/rfc9395.html` | externe |
| Netgate, phase 1 IPsec (23 décembre 2025) | `https://docs.netgate.com/pfsense/en/latest/vpn/ipsec/configure-p1.html` | `https://docs.netgate.com/pfsense/en/latest/vpn/ipsec/configure-p1.html` | externe |
| Réviser avec les flashcards | `cartes.html` | `b3-pfsense/chapitres/cartes.html` | interne |
| … | | | 2 lien(s) supplementaire(s) |

## 5. Formulaires et champs

Aucun formulaire dans cette page.
## 6. Boutons et controles interactifs

| Libelle | type | id | classes | aria-label | Etat initial | data-* |
|---|---|---|---|---|---|---|
| (icone) | button | themeToggle | `theme-toggle` | Activer le mode sombre | actif | — |
| Firewall > Rules |  | — | `opt` | — | actif | — |
| System > Certificates (Cert. Manager selon la version) |  | — | `opt` | — | actif | data-correct=1 |
| VPN > OpenVPN > Clients |  | — | `opt` | — | actif | — |
| Status > Services |  | — | `opt` | — | actif | — |
| Dès le signalement, même si la CRL n’est pas publiée ou sélectionnée |  | — | `opt` | — | actif | — |
| Lorsque la CRL pertinente, à jour et sélectionnée est effectivement lue et contient le num |  | — | `opt` | — | actif | data-correct=1 |
| Toujours immédiatement, y compris pour toutes les sessions déjà établies |  | — | `opt` | — | actif | — |
| Uniquement lorsque la CRL est absente du serveur |  | — | `opt` | — | actif | — |
| TCP port 80 |  | — | `opt` | — | actif | — |
| UDP port 1194 |  | — | `opt` | — | actif | data-correct=1 |
| TCP port 443 obligatoire |  | — | `opt` | — | actif | — |
| UDP port 53 |  | — | `opt` | — | actif | — |
| Tout le trafic Internet personnel passe obligatoirement par le pare-feu de l’entreprise |  | — | `opt` | — | actif | — |
| Seuls les flux destinés aux sous-réseaux d’entreprise déclarés transitent par le tunnel VP |  | — | `opt` | — | actif | data-correct=1 |
| Le client est déconnecté toutes les 15 minutes |  | — | `opt` | — | actif | — |
| Le tunnel chiffre uniquement les requêtes DNS |  | — | `opt` | — | actif | — |
| Phase 1 (IKE SA) |  | — | `opt` | — | actif | — |
| Phase 2 (Child SA / ESP) |  | — | `opt` | — | actif | data-correct=1 |
| Phase 3 (NTP Sync) |  | — | `opt` | — | actif | — |
| Phase 0 (DHCP Discovery) |  | — | `opt` | — | actif | — |
| SHA-256 |  | — | `opt` | — | actif | — |
| SHA-384 |  | — | `opt` | — | actif | — |
| MD5 |  | — | `opt` | — | actif | data-correct=1 |
| SHA-512 |  | — | `opt` | — | actif | — |
| Le groupe 22 est une courbe P-384 et tous les numéros supérieurs à 19 sont plus forts |  | — | `opt` | — | actif | — |
| Le groupe 14 est P-256 et le groupe 19 est MODP 1024 bits |  | — | `opt` | — | actif | — |
| Le groupe 14 est MODP 2048 bits, le 19 est P-256 et le 22 est MODP 1024 bits déprécié |  | — | `opt` | — | actif | data-correct=1 |
| Tout groupe portant un numéro supérieur à 14 est automatiquement autorisé |  | — | `opt` | — | actif | — |
| Il fonctionne sans processeur |  | — | `opt` | — | actif | — |
| … | | | | | | 3 de plus |

## 7. Composants pedagogiques et etats observes

| Exercice | Langage | Hauteur | Correction | Entree standard | Titre |
|---|---|---|---|---|---|
| `pf3-c5-e1` | analyse | 300 | active | `CA cn=PFSENSE_INTERNAL_CA CRL selected=YES state=CURRENT revoked=104,109 TIMESTAMP current=1700000000 CERT id=C1 cn=alice issuer=PFSENSE_INTERNAL_CA serial=101 algo=RSA key_len=2048 valid_from=1690000000 valid_to=1720000000 CERT id=C2 cn=bob issuer=PFSENSE_INTERNAL_CA serial=104 algo=RSA key_len=2048 valid_from=1690000000 valid_to=1720000000 CERT id=C3 cn=eve issuer=ROGUE_CA serial=200 algo=RSA key_len=4096 valid_from=1690000000 valid_to=1720000000` | Exercice 1 — Analyse pédagogique de certificats et de CRL OpenVPN |
| `pf3-c5-e2` | analyse | 300 | active | `IKE_PROPOSAL id=PROP1 phase=1 enc=AES-GCM key_len=256 hash=SHA384 dh_group=19 IKE_PROPOSAL id=PROP2 phase=1 enc=3DES key_len=168 hash=SHA256 dh_group=14 IKE_PROPOSAL id=PROP3 phase=2 enc=AES-CBC key_len=128 hash=MD5 dh_group=14 IKE_PROPOSAL id=PROP4 phase=1 enc=AES-CBC key_len=128 hash=SHA256 dh_group=14 IKE_PROPOSAL id=PROP5 phase=1 enc=AES-GCM key_len=256 hash=SHA256 dh_group=22 IKE_PROPOSAL id=PROP6 phase=1 enc=AES-GCM key_len=256 hash=SHA256 dh_group=31` | Exercice 2 — Classement pédagogique de propositions IKEv2 (IPsec) |
| `pf3-c5-e3` | analyse | 300 | active | `VPN_MODE type=SPLIT tunnel_gw=10.8.0.1 local_gw=192.168.1.1 ROUTE subnet=10.0.0.0/8 ROUTE subnet=172.16.50.0/24 PACKET id=P1 dst_ip=10.5.20.1 PACKET id=P2 dst_ip=8.8.8.8 PACKET id=P3 dst_ip=172.16.50.10` | Exercice 3 — Calculateur de routage de tunnel VPN (Split Tunneling vs Full Tunneling) |

- QCM : 1 bloc(s), **8 question(s)**.
- Encadres pedagogiques : 7 (`.box`, variantes `box--*`).
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
- Blocs `pre` : 3 · elements `code` : 73
- SVG inline : 20 · images : 0
- Icones du sprite utilisees : `#i-house`, `#i-shield`, `#i-play`, `#i-target`, `#i-book`, `#i-lightbulb`, `#i-warning`, `#i-compass`, `#i-pin`, `#i-cards`, `#i-file`, `#i-chart`, `#i-arrow-left`, `#i-arrow-right`
- Volume de texte : ~4544 mots · 540 noeuds HTML

## 9. Ressources chargees

- Feuilles de style : `https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;600;700;800&display=swap`, `/assets/css/tokens.css`, `../assets/css/cours.css`, `/assets/css/code-lab.css`, `/assets/vendor/katex/katex.min.css`
- Scripts externes : `/assets/js/theme.js`, `../assets/js/cours.js`, `/assets/vendor/katex/katex.min.js`, `/assets/vendor/katex/auto-render.min.js`, `/assets/js/code-lab.js`
- Blocs `<style>` inline : 0 · scripts inline : 4

## 10. Classes et attributs data observes

Classes distinctes : 67. Les plus frequentes :

| Classe | Occurrences |
|---|---|
| `opt` | 32 |
| `ic` | 18 |
| `q` | 8 |
| `q__stem` | 8 |
| `opts` | 8 |
| `q__exp` | 8 |
| `box` | 7 |
| `box__title` | 7 |
| `card` | 6 |
| `btn` | 4 |
| `bandrow` | 4 |
| `tag` | 3 |
| `grid` | 3 |
| `grid-2` | 3 |
| `lab` | 3 |
| `lab__head` | 3 |
| `lab__title` | 3 |
| `lab__meta` | 3 |
| `lab__lang` | 3 |
| `lab__formative` | 3 |

Attributs `data-*` : `data-correct` (8), `data-lab` (3), `data-exercise` (3), `data-language` (3), `data-height` (3), `data-stdin` (3), `data-lab-starter` (3), `data-chapter` (1), `data-mark-done` (1)

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

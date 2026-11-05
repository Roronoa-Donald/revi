# Firewall & Sécurité Réseau B3

> Fiche extraite du fichier `b3-firewall/index.html` (213 lignes, 17.1 Ko, sha256 `0715ba9a9b3f`).
> Famille : **cours-b3-firewall** · sous-type : `index` · statut : **servi-canonique**.
> Cette fiche decrit ce que le document contient reellement ; les elements deduits du JavaScript sont signales `[deduit]` et references au document thematique.

## 1. Identite et acces

| Champ | Valeur |
|---|---|
| URL servie | `/b3-firewall/index.html` |
| Titre du document | Firewall & Sécurité Réseau B3 — Sécurité Périmétrique, Filtrage Réseau &amp; Pare-feux B3 |
| Description meta | Formation d’excellence en sécurité périmétrique et technologies de pare-feux pour le Bachelor 3 : fondements de la sécurité réseau et filtrage stateless (zones de confiance, en-têtes L3/L4 IPv4/TCP/UDP, politique Default DROP et vulnérabilités aux paquets ACK forgés), inspection dynamique avec suivi d’état (Stateful Packet Inspection selon la RFC 793, table conntrack netfilter, états NEW/ESTABLISHED/RELATED/INVALID, purge des timeouts et détection des scans furtifs Xmas et Null), politiques de sécurité et ordonnancement d’ACLs (principe First-Match-Wins, détection formelle du Rule Shadowing et des redondances, translation d’adresses SNAT Masquerade, DNAT Port Forwarding et PAT), architectures réseau étanches et zones démilitarisées (règle cardinale DMZ interdisant formellement l’initiation vers le LAN, topologies Dual-Homed, Triple-Homed et Back-to-Back hétérogène, passerelles d’administration par bastion SSH et Jump Hosts MFA), filtrage applicatif L7 et pare-feux nouvelle génération (obsolescence du filtrage de port face au HTTPS, identification applicative App-ID et User-ID, inspection du Server Name Indication SNI TLS, filtrage web catégoriel, protection anti-DoS par Rate Limiting en fenêtre glissante et Deep Packet Inspection DPI neutralisant les injections SQL et failles XSS), et mise en œuvre opérationnelle sous Linux Netfilter (hooks noyau, tables et chaînes, syntaxe comparée iptables vs nftables moderne, analyse statistique des logs Syslog et réponse active automatisée par bannissement dynamique Fail2ban/SIEM). |
| Robots | indexable (defaut) |
| Langue / theme | `fr` / `defaut` |
| Chapitre (body) | — |
| Regle d'acces | Libre (aucun compte) |
| Statut de service | servi-canonique |

## 2. Structure du document (ordre observe)

| # | Element | Classe / role | Contenu cle |
|---|---|---|---|
| 1 | nav | skip-nav | 1 liens, aria="Accès rapide" |
| 2 | h1 | — | Firewall & Sécurité Réseau B3 |
| 3 | h2 | — | Parcours d’apprentissage |
| 4 | h2 | — | Architecture & Philosophie de la Sécurité Réseau |

## 3. Hierarchie des titres

- **H1** — Firewall & Sécurité Réseau B3
  - **H2** — Parcours d’apprentissage
    - **H3** — Fondements, Évolution des Pare-feux & Filtrage Sans État (Stateless)
    - **H3** — Filtrage Dynamique avec Suivi d’État (Stateful Inspection) & Table Conntrack
    - **H3** — Politiques de Sécurité, Listes de Contrôle d’Accès (ACL) & NAT
    - **H3** — Architectures Réseau Sécurisées, Zone Démilitarisée (DMZ) & Bastions
    - **H3** — Filtrage Applicatif L7, UTM & Pare-feux Nouvelle Génération (NGFW)
    - **H3** — Déploiement Linux Netfilter (iptables / nftables), Logs & Intégration SIEM
  - **H2** — Architecture & Philosophie de la Sécurité Réseau

## 4. Navigation et liens

| Zone | Classe | Liens |
|---|---|---|
| nav | `skip-nav` | Aller au contenu → `#content` |
| nav | `b3-firewallnav` | Portail → `/`<br>Firewall & Sécurité Réseau B3 → `index.html`<br>Sommaire → `sommaire.html`<br>Ch. 1 → `chapitres/chapitre1.html`<br>Ch. 2 → `chapitres/chapitre2.html`<br>Ch. 3 → `chapitres/chapitre3.html`<br>Ch. 4 → `chapitres/chapitre4.html`<br>Ch. 5 → `chapitres/chapitre5.html`<br>Ch. 6 → `chapitres/chapitre6.html`<br>Cartes → `chapitres/cartes.html`<br>Mémo → `chapitres/formules.html`<br>Exercices → `chapitres/exercices.html`<br>Atelier → `atelier.html`<br>Examen → `chapitres/examens.html` |
| header | `hero` | Démarrer le cours → `chapitres/chapitre1.html`<br>Voir le sommaire → `sommaire.html`<br>Laboratoire Pare-feu & Sécurité → `atelier.html` |

Liens sortants : **25** (externes : 0).

| Libelle | href | Cible resolue | Type |
|---|---|---|---|
| Aller au contenu | `#content` | `#content` | ancre |
| Portail | `/` | `.` | interne |
| Firewall & Sécurité Réseau B3 | `index.html` | `b3-firewall/index.html` | interne |
| Sommaire | `sommaire.html` | `b3-firewall/sommaire.html` | interne |
| Ch. 1 | `chapitres/chapitre1.html` | `b3-firewall/chapitres/chapitre1.html` | interne |
| Ch. 2 | `chapitres/chapitre2.html` | `b3-firewall/chapitres/chapitre2.html` | interne |
| Ch. 3 | `chapitres/chapitre3.html` | `b3-firewall/chapitres/chapitre3.html` | interne |
| Ch. 4 | `chapitres/chapitre4.html` | `b3-firewall/chapitres/chapitre4.html` | interne |
| Ch. 5 | `chapitres/chapitre5.html` | `b3-firewall/chapitres/chapitre5.html` | interne |
| Ch. 6 | `chapitres/chapitre6.html` | `b3-firewall/chapitres/chapitre6.html` | interne |
| Cartes | `chapitres/cartes.html` | `b3-firewall/chapitres/cartes.html` | interne |
| Mémo | `chapitres/formules.html` | `b3-firewall/chapitres/formules.html` | interne |
| Exercices | `chapitres/exercices.html` | `b3-firewall/chapitres/exercices.html` | interne |
| Atelier | `atelier.html` | `b3-firewall/atelier.html` | interne |
| Examen | `chapitres/examens.html` | `b3-firewall/chapitres/examens.html` | interne |
| Démarrer le cours | `chapitres/chapitre1.html` | `b3-firewall/chapitres/chapitre1.html` | interne |
| Voir le sommaire | `sommaire.html` | `b3-firewall/sommaire.html` | interne |
| Laboratoire Pare-feu & Sécurité | `atelier.html` | `b3-firewall/atelier.html` | interne |
| Fondements, Évolution des Pare-feux & Filtrage Sans État (Stateless) | `chapitres/chapitre1.html` | `b3-firewall/chapitres/chapitre1.html` | interne |
| Filtrage Dynamique avec Suivi d’État (Stateful Inspection) & Table Conntrack | `chapitres/chapitre2.html` | `b3-firewall/chapitres/chapitre2.html` | interne |
| Politiques de Sécurité, Listes de Contrôle d’Accès (ACL) & NAT | `chapitres/chapitre3.html` | `b3-firewall/chapitres/chapitre3.html` | interne |
| Architectures Réseau Sécurisées, Zone Démilitarisée (DMZ) & Bastions | `chapitres/chapitre4.html` | `b3-firewall/chapitres/chapitre4.html` | interne |
| Filtrage Applicatif L7, UTM & Pare-feux Nouvelle Génération (NGFW) | `chapitres/chapitre5.html` | `b3-firewall/chapitres/chapitre5.html` | interne |
| Déploiement Linux Netfilter (iptables / nftables), Logs & Intégration SIEM | `chapitres/chapitre6.html` | `b3-firewall/chapitres/chapitre6.html` | interne |
| … | | | 1 lien(s) supplementaire(s) |

## 5. Formulaires et champs

Aucun formulaire dans cette page.
## 6. Boutons et controles interactifs

| Libelle | type | id | classes | aria-label | Etat initial | data-* |
|---|---|---|---|---|---|---|
| (icone) | button | themeToggle | `theme-toggle` | Activer le mode sombre | actif | — |

## 7. Composants pedagogiques et etats observes

- Encadres pedagogiques : 1 (`.box`, variantes `box--*`).

Etats et interactions a reconstruire :

- En-tête : marque + 3 liens (Epreuves, Atelier, Mon compte) + bouton profil + bascule de thème.
- Etat `prepLockedMsg` : bandeau « L'atelier est protege » si `?preparation=locked`, refermable.
- Filtre de niveau : 4 onglets (B1/B2/B3/Tous), onglet actif noir, persistance `portal_selected_level`.
- Recherche : champ `#courseSearch`, filtrage en direct sur `data-title` ; compteur `#activeFilterCount`.
- Etat vide : `#portalEmptyState` (bloc pointille) avec bouton de reinitialisation des filtres.
- Carte « Reprendre » : masquee par defaut (`hidden`), visible si progression locale > 0.
- Utilisateur connecte : bouton profil marque `is-authenticated`, nom en title/aria-label.

## 8. Tableaux, code et medias

- Tableaux : 0
- Blocs `pre` : 0 · elements `code` : 0
- SVG inline : 22 · images : 0
- Icones du sprite utilisees : `#i-house`, `#i-shield`, `#i-play`, `#i-layers`, `#i-terminal`, `#i-clock`, `#i-arrow-right`, `#i-info`
- Volume de texte : ~728 mots · 187 noeuds HTML

## 9. Ressources chargees

- Feuilles de style : `https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;600;700;800&display=swap`, `/assets/css/tokens.css`, `assets/css/cours.css`, `/assets/css/code-lab.css`, `/assets/vendor/katex/katex.min.css`
- Scripts externes : `/assets/js/theme.js`, `assets/js/cours.js`, `/assets/vendor/katex/katex.min.js`, `/assets/vendor/katex/auto-render.min.js`, `/assets/js/code-lab.js`
- Blocs `<style>` inline : 0 · scripts inline : 1

## 10. Classes et attributs data observes

Classes distinctes : 42. Les plus frequentes :

| Classe | Occurrences |
|---|---|
| `ic` | 20 |
| `badge` | 7 |
| `card` | 6 |
| `card__head` | 6 |
| `card__num` | 6 |
| `card__title` | 6 |
| `card__desc` | 6 |
| `card__foot` | 6 |
| `card__time` | 6 |
| `card__link` | 6 |
| `btn` | 4 |
| `stat` | 4 |
| `stat__val` | 4 |
| `stat__lbl` | 4 |
| `btn--lg` | 3 |
| `btn--primary` | 2 |
| `skip-nav` | 1 |
| `skip-link` | 1 |
| `b3-firewallnav` | 1 |
| `b3-firewallnav__in` | 1 |

Aucun attribut `data-*`.

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

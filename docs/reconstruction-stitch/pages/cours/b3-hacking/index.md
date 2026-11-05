# Hacking Éthique & Pentest B3

> Fiche extraite du fichier `b3-hacking/index.html` (209 lignes, 25.6 Ko, sha256 `b2cf1f87315b`).
> Famille : **cours-b3-hacking** · sous-type : `index` · statut : **servi-canonique**.
> Cette fiche decrit ce que le document contient reellement ; les elements deduits du JavaScript sont signales `[deduit]` et references au document thematique.

## 1. Identite et acces

| Champ | Valeur |
|---|---|
| URL servie | `/b3-hacking/index.html` |
| Titre du document | Hacking Éthique & Pentest B3 — Accueil & Portail de Formation |
| Description meta | Formation d’excellence en sécurité offensive et tests d’intrusion professionnels pour le Bachelor 3 : cadre juridique français et international (Code Pénal art. 323-1 à 323-7, RGPD, directive NIS2, lettre de mission et Rules of Engagement contractuelles), typologie des profils d'attaquants et organisation Red Team / Blue Team / Purple Team, méthodologies de référence (PTES, OSSTMM, OWASP WSTG, NIST SP 800-115), séquençage canonique des 5 phases du piratage éthique, modélisation de la Cyber Kill Chain de Lockheed Martin, matrice MITRE ATT&CK et calcul mathématique des scores de vulnérabilités selon CVSS v3.1 Base Metrics, reconnaissance passive et collecte de renseignements en sources ouvertes (OSINT, registres Whois/RIR, theHarvester, archives Wayback Machine, requêtes ciblées Google Dorking, moteurs spécialisés Shodan et Censys), cartographie DNS approfondie (enregistrements A, MX, NS, TXT, analyse et exploitation des failles de transfert de zone AXFR), sécurité de la messagerie contre le spoofing (mécanismes SPF, DKIM et DMARC), énumération de sous-domaines par dictionnaire et Certificate Transparency logs (crt.sh), et filtrage des faux positifs causés par les résolutions DNS wildcard, balayage réseau et énumération de services (cycle de vie des paquets TCP et RFC 793, poignée de mains 3-way, techniques de sondes Nmap avec SYN Stealth -sS, TCP Connect -sT, UDP -sU, scans furtifs FIN -sF, Null -sN, Xmas -sX et ACK -sA pour cartographier les pare-feux avec état), empreinte de système d'exploitation (OS fingerprinting par analyse du TTL initial, de la taille de fenêtre TCP et des options MSS/SACK), extraction de bannières logicielles (-sV), énumération approfondie des protocoles d'infrastructure (sessions nulles SMB sur ports 139/445, communautés SNMP MIB-2 publiques et privées sur port 161 UDP), et cartographie des vulnérabilités via Nmap Scripting Engine (NSE) et scanners automatisés (Nessus, OpenVAS), exploitation des failles web critiques de l'OWASP Top 10 (défaillances de contrôle d'accès A01 et références directes non sécurisées IDOR, exploitation complète des injections SQL in-band UNION-based, inférentielles aveugles booléennes et temporelles avec fonctions SLEEP conditionnelles, requêtes empilées et remédiation définitive par requêtes préparées avec liaisons de paramètres), vulnérabilités côté client (Cross-Site Scripting XSS stockée, réfléchie et DOM-based, vol de cookies de session et parade HttpOnly/CSP, attaques CSRF et jetons SameSite), vulnérabilités serveur critiques (SSRF ciblant l'API de métadonnées Cloud 169.254.169.254, injection de commandes OS et désérialisation non sécurisée), traversées de répertoires (Path Traversal / Local File Inclusion LFI / Remote File Inclusion RFI) avec contournements d'encodage URL, et maîtrise des outils d'audit web (Burp Suite Proxy, Repeater, Intruder, sqlmap et fuzzer ffuf), exploitation système bas niveau et escalade de privilèges (architecture de la mémoire de processus, pile d'exécution, mécanique d'un Stack Buffer Overflow sur x86/x64, écrasement du pointeur de retour EIP/RIP, NOP sled, shellcode et mécanismes de protection matérielle et logicielle ASLR, DEP/NX et Stack Canaries), automatisation avec Metasploit Framework (MSFConsole, distinction entre payloads stagés et inline, manipulation de sessions Meterpreter), élévation de privilèges sous Linux (audit et détournement de binaires SUID via le catalogue GTFOBins, configurations sudoers permissives NOPASSWD, crontabs modifiables), élévation sous Windows (chemins de services non quotés Unquoted Service Paths, abus de privilèges de jetons de services SeImpersonatePrivilege via PrintSpoofer/SweetPotato), et techniques de pivoting réseau et mouvement latéral (tunnels SSH port forwarding local, distant et dynamique SOCKS, et tunneling HTTP chiffré via Chisel), et enfin maintien de l'accès, post-exploitation et rédaction du rapport d'intrusion (mécanismes de persistance sous Linux via cron, systemd et authorized_keys, persistance Windows via clés de registre Run/RunOnce et tâches planifiées, détection et désobfusquation de web shells PHP/JSP exploitant eval et base64, techniques de dissimulation et d'anti-forensics avec timestomping et manipulation de logs, détection défensive de la Blue Team via SIEM, EDR, règles Sigma et signatures YARA, protocole éthique de nettoyage intégral des implants, et structure normalisée du rapport de test d'intrusion avec synthèse managériale vulgarisée, fiches techniques de vulnérabilités avec preuves de concept éthiques et plan de remédiation priorisé par horizon). |
| Robots | indexable (defaut) |
| Langue / theme | `fr` / `defaut` |
| Chapitre (body) | — |
| Regle d'acces | Libre (aucun compte) |
| Statut de service | servi-canonique |

## 2. Structure du document (ordre observe)

| # | Element | Classe / role | Contenu cle |
|---|---|---|---|
| 1 | nav | skip-nav | 1 liens, aria="Accès rapide" |
| 2 | h1 | — | Hacking Éthique & Pentest B3 |
| 3 | h2 | — | Parcours d’apprentissage |
| 4 | h2 | — | La Sécurité Offensive et le Pentest en Bachelor 3 |
| 5 | h2 | — | Ressources et Références Pédagogiques |

## 3. Hierarchie des titres

- **H1** — Hacking Éthique & Pentest B3
  - **H2** — Parcours d’apprentissage
    - **H3** — Fondements du Hacking Éthique, Cadre Légal & Méthodologies de Pentest
    - **H3** — Reconnaissance Passive & Active (OSINT, Cartographie & DNS)
    - **H3** — Balayage Réseau, Énumération & Cartographie des Vulnérabilités (Scanning)
    - **H3** — Exploitation des Vulnérabilités Web (OWASP Top 10 & Injection)
    - **H3** — Exploitation Système, Escalade de Privilèges & Pivoting (Gaining Access)
    - **H3** — Maintien de l'Accès, Post-Exploitation, Anti-Forensics & Rapport de Pentest
  - **H2** — La Sécurité Offensive et le Pentest en Bachelor 3
  - **H2** — Ressources et Références Pédagogiques

## 4. Navigation et liens

| Zone | Classe | Liens |
|---|---|---|
| nav | `skip-nav` | Aller au contenu → `#content` |
| nav | `b3-hackingnav` | Portail → `/`<br>Hacking Éthique & Pentest B3 → `index.html`<br>Sommaire → `sommaire.html`<br>Ch. 1 → `chapitres/chapitre1.html`<br>Ch. 2 → `chapitres/chapitre2.html`<br>Ch. 3 → `chapitres/chapitre3.html`<br>Ch. 4 → `chapitres/chapitre4.html`<br>Ch. 5 → `chapitres/chapitre5.html`<br>Ch. 6 → `chapitres/chapitre6.html`<br>Cartes → `chapitres/cartes.html`<br>Mémo → `chapitres/formules.html`<br>Exercices → `chapitres/exercices.html`<br>Atelier → `atelier.html`<br>Examen → `chapitres/examens.html` |
| header | `hero` | Démarrer le cours → `chapitres/chapitre1.html`<br>Voir le sommaire → `sommaire.html`<br>Bac à sable Pentest & Études de Cas → `atelier.html` |

Liens sortants : **24** (externes : 0).

| Libelle | href | Cible resolue | Type |
|---|---|---|---|
| Aller au contenu | `#content` | `#content` | ancre |
| Portail | `/` | `.` | interne |
| Hacking Éthique & Pentest B3 | `index.html` | `b3-hacking/index.html` | interne |
| Sommaire | `sommaire.html` | `b3-hacking/sommaire.html` | interne |
| Ch. 1 | `chapitres/chapitre1.html` | `b3-hacking/chapitres/chapitre1.html` | interne |
| Ch. 2 | `chapitres/chapitre2.html` | `b3-hacking/chapitres/chapitre2.html` | interne |
| Ch. 3 | `chapitres/chapitre3.html` | `b3-hacking/chapitres/chapitre3.html` | interne |
| Ch. 4 | `chapitres/chapitre4.html` | `b3-hacking/chapitres/chapitre4.html` | interne |
| Ch. 5 | `chapitres/chapitre5.html` | `b3-hacking/chapitres/chapitre5.html` | interne |
| Ch. 6 | `chapitres/chapitre6.html` | `b3-hacking/chapitres/chapitre6.html` | interne |
| Cartes | `chapitres/cartes.html` | `b3-hacking/chapitres/cartes.html` | interne |
| Mémo | `chapitres/formules.html` | `b3-hacking/chapitres/formules.html` | interne |
| Exercices | `chapitres/exercices.html` | `b3-hacking/chapitres/exercices.html` | interne |
| Atelier | `atelier.html` | `b3-hacking/atelier.html` | interne |
| Examen | `chapitres/examens.html` | `b3-hacking/chapitres/examens.html` | interne |
| Démarrer le cours | `chapitres/chapitre1.html` | `b3-hacking/chapitres/chapitre1.html` | interne |
| Voir le sommaire | `sommaire.html` | `b3-hacking/sommaire.html` | interne |
| Bac à sable Pentest & Études de Cas | `atelier.html` | `b3-hacking/atelier.html` | interne |
| Fondements du Hacking Éthique, Cadre Légal & Méthodologies de Pentest | `chapitres/chapitre1.html` | `b3-hacking/chapitres/chapitre1.html` | interne |
| Reconnaissance Passive & Active (OSINT, Cartographie & DNS) | `chapitres/chapitre2.html` | `b3-hacking/chapitres/chapitre2.html` | interne |
| Balayage Réseau, Énumération & Cartographie des Vulnérabilités (Scanning) | `chapitres/chapitre3.html` | `b3-hacking/chapitres/chapitre3.html` | interne |
| Exploitation des Vulnérabilités Web (OWASP Top 10 & Injection) | `chapitres/chapitre4.html` | `b3-hacking/chapitres/chapitre4.html` | interne |
| Exploitation Système, Escalade de Privilèges & Pivoting (Gaining Access) | `chapitres/chapitre5.html` | `b3-hacking/chapitres/chapitre5.html` | interne |
| Maintien de l'Accès, Post-Exploitation, Anti-Forensics & Rapport de Pentest | `chapitres/chapitre6.html` | `b3-hacking/chapitres/chapitre6.html` | interne |

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
- Icones du sprite utilisees : `#i-house`, `#i-shield`, `#i-play`, `#i-layers`, `#i-terminal`, `#i-clock`, `#i-arrow-right`, `#i-info`, `#i-book`
- Volume de texte : ~1058 mots · 187 noeuds HTML

## 9. Ressources chargees

- Feuilles de style : `https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;600;700;800&display=swap`, `/assets/css/tokens.css`, `assets/css/cours.css`, `/assets/css/code-lab.css`, `/assets/vendor/katex/katex.min.css`
- Scripts externes : `/assets/js/theme.js`, `assets/js/cours.js`, `/assets/vendor/katex/katex.min.js`, `/assets/vendor/katex/auto-render.min.js`, `/assets/js/code-lab.js`
- Blocs `<style>` inline : 0 · scripts inline : 1

## 10. Classes et attributs data observes

Classes distinctes : 41. Les plus frequentes :

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
| `stat` | 4 |
| `stat__val` | 4 |
| `stat__lbl` | 4 |
| `btn` | 3 |
| `btn--lg` | 3 |
| `skip-nav` | 1 |
| `skip-link` | 1 |
| `b3-hackingnav` | 1 |
| `b3-hackingnav__in` | 1 |
| `b3-hackingnav__home` | 1 |

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

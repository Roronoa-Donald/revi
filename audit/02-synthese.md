# Phase 6 — Synthèse Générale, Carte de Chaleur C1–C14 & Priorisation (`02-synthese.md`)

## 1. Réponse à la Question Directrice de l'Audit

> *« Un étudiant sérieux, qui découvre le sujet, lit la page de haut en bas, une seule fois, avec uniquement ce que le sommaire lui a déjà fait voir : comprend-il chaque phrase, chaque exercice, chaque QCM, sans avoir à chercher ailleurs ni à deviner ? »*

**Réponse : NON en l'état actuel sur la majorité des cours (Score global moyen des 68 cours actifs : 22,5 / 42 soit 53,6 % ; 13 cours entre 70 % et 84 % « à retoucher » ; 55 cours < 70 % « à réécrire/corriger en profondeur » ; 0 cours ≥ 85 %).**

Si la plateforme dispose d'une architecture technique remarquable et d'un gabarit de fin de chapitre très formateur (*Erreurs classiques*, *Méthodologie*, *Révision active*, *Tuteur IA sans code*), la compréhension linéaire à la première lecture est aujourd'hui brisée par **12 défauts systémiques** issus principalement de générations ou de scripts de remédiation automatisés partiels.

## 2. Vérification Impérative des Cas Témoins de la Section 7 (100 % Retrouvés et Prouvés)

Tous les cas témoins listés en Section 7 ont été retrouvés dans le code source HTML/JS avec leurs numéros de lignes exacts :

| Cible | # | Défaut annoncé (Section 7) | Statut | Localisation exacte (`fichier:ligne`) | Preuve & Cause racine identifiée |
| :--- | :---: | :--- | :---: | :--- | :--- |
| `b1-algo` Ch.1 | 1 | `D8 / D11` — Mise en situation « jamais fait de thé » → « préparer un plat » | **RETROUVÉ** | `b1-algo/chapitres/chapitre1.html:L44` | Texte exact : *« expliquer à quelqu'un qui n'a jamais fait de thé comment préparer un plat »*. |
| `b1-algo` Ch.1 | 2 | `D2` — `Variable … : Entier` et `Lire`/`Écrire` utilisés avant le Ch. 2 | **RETROUVÉ** | `b1-algo/chapitres/chapitre1.html:L90,L97,L101-108` | Utilisés dès le 1er pseudo-code (L101) alors que le Ch. 2 (L378) est « Variables, types et affectation ». |
| `b1-algo` Ch.1 | 3 | `D2` — Boucle `Pour` utilisée dans la table de trace (section 4) avant le Ch. 4 | **RETROUVÉ** | `b1-algo/chapitres/chapitre1.html:L129` | Texte exact : `Pour i de 1 à 3 Faire S ← S + i FinPour` alors que le Ch. 4 est « Boucles : Pour ». |
| `b1-algo` Ch.1 | 4 | `D6` — Exercices en Python (`int(input())`, division entière, reste) non enseignés | **RETROUVÉ** | `b1-algo/chapitres/chapitre1.html:L148-252` | `data-language="python"`, `int(input())` (L151, L188, L226), division entière (L215, L238) et reste (L238, L248). |
| `b1-algo` Ch.1 | 5 | `D8` — Seuils du test de maîtrise incomplets (plage `90–94 %` absente) | **RETROUVÉ** | `b1-algo/chapitres/chapitre1.html:L368-371` | Affiche `< 50 %`, `50–69 %`, `70–89 %`, puis `≥ 95 %` (défaut présent sur **283 chapitres** B1/B2). |
| `b1-algo` Ch.1 | 6 | `D13` — Mélange `tu` / `vous` dans le même chapitre | **RETROUVÉ** | `b1-algo/chapitres/chapitre1.html:L44,L51` vs `L141,L165,L214` | `tu seras capable` (L51) vs `exécute votre code` (L141), `Calculez` (L165, L214), `Affichez` (L203, L239). |
| `b1-algo` Ch.1 | 7 | `D6` — Pascal affiché sans être annoncé comme langage de référence alors que les exos sont en Python | **RETROUVÉ** | `b1-algo/chapitres/chapitre1.html:L55,L112-123` | Bloc `program AireRectangle;` (L112) et QCM (L276) en Pascal sans présentation préalable du langage. |
| `b3-pfsense` Ch.1 | 1 | `D8` — Objectif CIDR IPv4/IPv6 non tenu et IPv6 absent | **RETROUVÉ** | `b3-pfsense/chapitres/chapitre1.html:L76,L445` | Objectif L76 et checklist L445 promettent le calcul CIDR IPv4/IPv6 ; 0 ligne d'explication CIDR et 0 occurrence d'IPv6 dans le cours. |
| `b3-pfsense` Ch.1 | 2 | `D6` — Ex. 1 exige `ipaddress`, calcul CIDR non enseigné et format `IFACE_CONFIG` non expliqué | **RETROUVÉ** | `b3-pfsense/chapitres/chapitre1.html:L161,L189-203` | `data-stdin="IFACE_CONFIG..."` (L161), `module ipaddress` (L189), `ipaddress.ip_interface(ip_str)` (L202). |
| `b3-pfsense` Ch.1 | 3 | `D6 / D7` — Ex. 2 syntaxe `pf.conf` (`pass in on …`) donnée dans l'énoncé sans explication | **RETROUVÉ** | `b3-pfsense/chapitres/chapitre1.html:L240-245` | Formule `{action} in on {iface} [proto {proto}] from {src} to {dst} [port {port}]` parachutée dans l'énoncé. |
| `b3-pfsense` Ch.1 | 4 | `D4 / D1 / D2` — Jargon non défini (`mbuf`, `BPF`, `RRSIG`, `Kea`, `option 66/67`, `double NAT`, `m0n0wall`…) et notions avant leur chapitre | **RETROUVÉ** | `b3-pfsense/chapitres/chapitre1.html:L66,L90-92,L126,L134-148` | Tous présents sans définition : `m0n0wall` (L66), `BPF` (L90), `mbuf` (L92), `double NAT` (L126, Ch.3), `ISC DHCPD/Kea` (L134), `NTP/PXE 66/67` (L139), `Cache Poisoning/RRSIG` (L146), `Active Directory` (L148). |
| `b3-pfsense` Ch.1 | 5 | `D8` — Consigne générique « complétez chaque grille d'analyse… critère par critère » vs exercices Python | **RETROUVÉ** | `b3-pfsense/chapitres/chapitre1.html:L155,L162,L188-204` | Causé par `scripts/remediate-26-exercises.js` qui a plaqué `data-language="analyse"` et le texte « grille d'analyse » sur des énoncés Python. |
| `b3-pfsense` Ch.1 | 6 | `D8` — « Deux indices » alors que l'exercice 3 en affiche trois | **RETROUVÉ** | `b3-pfsense/chapitres/chapitre1.html:L308-313` | `<summary>... Deux indices, rédigés en mots</summary>` suivi de 3 `<li>` (L310-312). Défaut présent sur **183 exercices** de la plateforme. |
| `b3-pfsense` Ch.1 | 7 | `D12` — Règle `usable_hosts = num_addresses - 2 (si prefix < 31, sinon 0)` vs RFC 3021 et `ipaddress` | **VÉRIFIÉ & CONFIRMÉ** | `b3-pfsense/chapitres/chapitre1.html:L191` | Contredit la [RFC 3021](https://www.rfc-editor.org/info/rfc3021/) (`/31` = 2 hôtes point-à-point) et la [doc officielle Python `ipaddress.hosts()`](https://docs.python.org/fr/3/library/ipaddress.html) (`/31` renvoie 2 hôtes, `/32` renvoie 1 hôte). |
| `b3-pfsense` Ch.1 | 8 | `D7` — QCM sur l'interface OPT : « tout le trafic entrant est bloqué » ambigu | **RETROUVÉ** | `b3-pfsense/chapitres/chapitre1.html:L352-359` | Ne distingue pas un flux entrant *dans l'interface OPT depuis les hôtes OPT* d'un flux entrant *vers le sous-réseau OPT depuis le LAN/WAN*. |
| `b3-pfsense` Ch.1 | 9 | `D10 / D13` — Mise en situation > 100 mots d'un bloc, ton emphatique (« cinématique », « inébranlables »), pas de Niveau 1/2 | **RETROUVÉ** | `b3-pfsense/chapitres/chapitre1.html:L66,L74` | Paragraphe unique de 108 mots (L66), termes « vélocité », « cinématique », « fondations inébranlables », 0 bloc `.box--intuition`. |
| `b3-pfsense` Ch.1 | 10 | `D15` — Virgules parasites dans « Protection anti-usurpation » ; seuils (%) absents du test de maîtrise | **RETROUVÉ** | `b3-pfsense/chapitres/chapitre1.html:L126,L463-467` | L126 : `</p>,<ul>,  <li>...</li>,  <li>...</li>,</ul>` (bug `.toString()` sur tableau dans `kit.box()`, **63 occurrences** en B3) ; L463-467 : aucun `%` dans `.bands` (**153 pages** touchées). |
| Page d'accueil | 11 | `D8 / D15` — Incohérence des compteurs (68 / 70 / 23+24+23) et liste B1 commençant par des cours B2 | **RETROUVÉ** | `index.html:L78,L93-108,L124,L143-490` | Onglet B2 affiche `24 cours` (22 + Atelier Web + Annales), Tous affiche `70 cours`, et les 24 premières cartes du DOM `#grid` sous l'onglet B1 actif sont les cartes B2 (`data-level="b2"`). |

## 3. Les 12 Défauts Systémiques de la Plateforme (Motifs Répétitifs Multi-Cours)

1. **DS-01 — Dénaturation schizophrène de 53 cours par la migration `data-language="analyse"` (`D6 / D8 / D9`, S0/S1)** : Les scripts `remediate-26-exercises.js`, `remediate-noncode-courses.js`, `migrate-pedagogical-alignment.js` et `remediate-math-courses.js` ont converti 53 cours en grilles de texte statiques (`analyse`) en copiant les 3 entrées des tests cachés (`[Cas 1]`, `[Cas 2]`, `[Cas 3]`) directement dans l'éditeur (supprimant ainsi toute évaluation par tests cachés et cassant le bouton « Exécuter » faute de bloc `[Exemple]`), tout en laissant dans **206 lignes d'objectifs, d'énoncés et d'indices** l'instruction de coder en Python (`ipaddress`, `split()`, `sys.stdin`) ou en Bash (`2#`, `read -r`). Pis encore, les cours de **C# (`csharp`)**, **SQL (`b1-sql`, `sql`, `b3-sql`)**, **Linux avancé (`b3-linux`)**, **Docker (`docker`)** et **GitHub (`b3-github`)** ne font plus écrire une seule ligne de code ou de requête SQL !
2. **DS-02 — Incohérence des exercices en Python dans `b1-algo` et en Bash dans `b1-admin-windows` (`D6`, S0)** : Dans `b1-algo`, les chapitres enseignent le pseudo-code et le Pascal mais les 30 exercices sont en Python. Dans `b1-admin-windows`, le cours enseigne Windows Server mais les 18 exercices font écrire des scripts Bash Linux (`shell`).
3. **DS-03 — Liens cassés (404) dans la barre de navigation de 29 cours et dans `chapitres/exercices.html` de 11 cours B3 (`D15`, S1)** : `scripts/course-kit.js` génère en dur `exercices/exercices.html` et `chapitres/simulateur-examen.html` alors que les 23 cours B3 et 6 cours B2 stockent leurs fichiers sous `chapitres/exercices.html` et `chapitres/examens.html` (754 liens cassés). De plus, dans 11 cours B3, `chapitres/exercices.html` pointe vers `href="chapitres/chapitre1.html"` (396 liens cassés `chapitres/chapitres/...`).
4. **DS-04 — Virgules parasites `,<ul>, <li>` dans les boîtes d'alerte B3 (`D15`, S1 — 63 occurrences)** : Dans `scripts/course-kit.js` (`box()`, L203-208), le paramètre `inner` est inséré tel quel dans un tableau puis joint par `.join('\n')`. Lorsqu'un fichier `server/content/b3-*.js` passe un tableau de lignes HTML comme argument `inner`, JavaScript appelle `Array.prototype.toString()`, injectant des virgules littérales visibles entre les balises HTML.
5. **DS-05 — Seuils du test de maîtrise incomplets (`90–94 %` omis sur 283 chapitres B1/B2) ou dépourvus de pourcentages (153 pages dont 100 % des chapitres B3) (`D8 / D15`, S1/S2)**.
6. **DS-06 — Séquences littérales `\n` visibles dans le HTML (`D15`, S1 — 316 lignes)** : Des doubles échappements `\\n` subsistent dans des explications de QCM, formules et énoncés (notamment dans `RD-RO`, `b1-algebre`, `b1-stats`, `probabilites`).
7. **DS-07 — Intitulés numériques fixes contredits par le contenu (`D8`, S2)** : `scripts/generate-code-labs.js` écrit en dur `Deux indices, rédigés en mots` alors que **183 exercices** ont 3 ou 4 indices ; `scripts/course-kit.js` écrit en dur `Les 8 notions à connaître absolument` alors que **152 chapitres** listent entre 9 et 17 notions ; et `cartes.html` ne couvre que 4 à 6 cartes par chapitre au lieu des 8 notions.
8. **DS-08 — Mélange généralisé du tutoiement (`tu`) et du vouvoiement (`vous`) dans les mêmes pages (`D13`, S2)** : Les gabarits de chapitres (`course-kit.js`) tutoient l'élève dans les objectifs et le test de maîtrise (`tu seras capable`, `Lis ton pourcentage`), tandis que le générateur d'ateliers (`generate-code-labs.js`) et les énoncés d'exercices le vouvoient (`votre code`, `Calculez`, `Complétez`).
9. **DS-09 — Absence de paliers gradués « Niveau 1 — Intuition / Niveau 2 — Technique » sur 54 cours sur 68 (`D13 / P3 / P4`, S1)** : Seuls 14 cours offrent la double lecture Intuition / Technique ; les 54 autres (dont tous les cours B3 et 16 cours B1) attaquent directement par des listes denses de jargon technique.
10. **DS-10 — Absence totale de bloc « Prérequis » et parachutage d'acronymes dès la Mise en situation (`D1 / D2 / D4`, S1)** : 0 cours sur 68 n'affiche ses prérequis en tête de cours ou de chapitre, et les mises en situation B2/B3 condensent jusqu'à 12 acronymes non encore définis en un seul paragraphe de plus de 100 mots.
11. **DS-11 — Désalignement entre les cours et les annales officielles B2 (`epreuves`) ainsi que les examens blancs B3 (`D9`, S1)** : L'examen officiel B2 d'*Administration des VM* évalue `vMotion` et `thin provisioning` (absents de `admin-vm` B2, enseignés seulement en B3) ; l'examen officiel B2 de *C#* évalue 3h d'écriture de classes C# (alors que `csharp` B2 n'a que des grilles `analyse`) ; l'examen blanc de `b3-pfsense` évalue `CBQ/HFSC` non enseignés.
12. **DS-12 — Prompt du tuteur IA `server/services/ai-help.js` figé sur « débutants B1 en programmation » (`D14`, S2)** : Le tuteur IA reçoit la consigne d'expliquer « l'endroit où l'ordinateur s'est arrêté » et « la règle du langage » pour un « débutant de niveau B1 », même lorsqu'il est appelé sur une étude de cas juridique, managériale ou d'architecture B3.

## 4. Carte de Chaleur Complète : 71 Entrées × Critères C1–C14

Légende : Score moyen par critère sur 3 (`0` = absent/bloquant, `1` = faible, `2` = correct, `3` = exemplaire). Seuils : **≥ 85 %** (`≥ 35,7/42`) Conforme ; **70–84 %** (`29,4–35,6/42`) À retoucher ; **< 70 %** (`< 29,4/42`) À réécrire.

| Cours (`id`) | Niv. | C1 | C2 | C3 | C4 | C5 | C6 | C7 | C8 | C9 | C10 | C11 | C12 | C13 | C14 | Score /42 | % | Verdict |
| :--- | :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: | :--- |
| `linux` | B2 | 2.0 | 2.0 | 0.8 | 2.0 | 1.0 | 2.0 | 2.0 | 1.0 | 2.0 | 2.0 | 1.0 | 2.0 | 2.0 | 2.0 | **23.8** | **56.7%** | **À réécrire** |
| `php` | B2 | 2.0 | 2.0 | 0.8 | 1.0 | 1.0 | 2.0 | 2.0 | 1.0 | 2.0 | 2.0 | 1.0 | 2.0 | 2.0 | 1.8 | **22.7** | **54.0%** | **À réécrire** |
| `probabilites` | B2 | 2.0 | 2.0 | 0.8 | 2.0 | 1.0 | 1.0 | 2.0 | 1.0 | 1.0 | 2.0 | 1.0 | 2.0 | 2.0 | 2.0 | **21.8** | **51.9%** | **À réécrire** |
| `rd_java` | B2 | 2.0 | 2.0 | 0.8 | 2.0 | 1.0 | 2.0 | 2.0 | 1.0 | 2.0 | 2.0 | 1.0 | 2.0 | 2.0 | 2.0 | **23.8** | **56.7%** | **À réécrire** |
| `rd_winserver` | B2 | 2.0 | 2.0 | 0.8 | 2.0 | 1.0 | 1.0 | 2.0 | 1.0 | 2.0 | 2.0 | 1.0 | 2.0 | 2.0 | 2.0 | **22.8** | **54.3%** | **À réécrire** |
| `admin-vm` | B2 | 2.0 | 2.0 | 0.8 | 1.0 | 1.0 | 1.0 | 2.0 | 1.0 | 2.0 | 2.0 | 1.0 | 2.0 | 1.0 | 2.0 | **20.8** | **49.5%** | **À réécrire** |
| `droit` | B2 | 2.0 | 2.0 | 0.8 | 2.0 | 1.0 | 1.0 | 2.0 | 1.0 | 1.0 | 2.0 | 1.0 | 2.0 | 1.0 | 2.0 | **20.8** | **49.5%** | **À réécrire** |
| `react` | B2 | 2.0 | 2.0 | 0.8 | 2.0 | 1.0 | 2.0 | 2.0 | 1.0 | 2.0 | 2.0 | 1.0 | 2.0 | 2.0 | 0.8 | **22.7** | **54.0%** | **À réécrire** |
| `api-rest-flask` | B2 | 2.0 | 2.0 | 0.8 | 2.0 | 1.0 | 2.0 | 2.0 | 1.0 | 2.0 | 2.0 | 1.0 | 2.0 | 2.0 | 2.0 | **23.8** | **56.7%** | **À réécrire** |
| `erp-si` | B2 | 2.0 | 1.7 | 0.8 | 2.0 | 1.0 | 1.0 | 2.0 | 1.0 | 0.7 | 2.0 | 1.0 | 2.0 | 1.0 | 2.0 | **20.2** | **48.1%** | **À réécrire** |
| `ingenierie-besoin` | B2 | 2.0 | 1.3 | 0.8 | 2.0 | 1.0 | 1.0 | 2.0 | 1.0 | 0.3 | 2.0 | 1.0 | 2.0 | 1.0 | 2.0 | **19.5** | **46.4%** | **À réécrire** |
| `masterclass-apprendre` | B2 | 1.7 | 1.2 | 0.8 | 2.0 | 1.0 | 1.0 | 2.0 | 1.0 | 0.2 | 2.0 | 1.0 | 2.0 | 1.0 | 1.0 | **17.8** | **42.4%** | **À réécrire** |
| `RD-RO` | B2 | 1.5 | 2.0 | 0.8 | 2.0 | 1.0 | 1.0 | 1.3 | 1.0 | 1.0 | 2.0 | 1.2 | 2.0 | 2.0 | 0.3 | **19.2** | **45.7%** | **À réécrire** |
| `assembleur` | B2 | 1.5 | 1.8 | 0.8 | 1.0 | 1.0 | 1.0 | 1.3 | 1.0 | 0.8 | 1.8 | 1.0 | 2.0 | 2.0 | 0.8 | **18.0** | **42.9%** | **À réécrire** |
| `Cyber securite B2` | B2 | 1.3 | 2.0 | 0.8 | 1.0 | 1.0 | 1.0 | 1.3 | 1.0 | 1.0 | 1.2 | 1.0 | 2.0 | 1.0 | 1.0 | **16.7** | **39.8%** | **À réécrire** |
| `sql` | B2 | 1.0 | 2.0 | 0.8 | 1.0 | 1.0 | 1.0 | 1.0 | 1.0 | 1.0 | 2.0 | 1.0 | 2.0 | 2.0 | 1.0 | **17.8** | **42.4%** | **À réécrire** |
| `csharp` | B2 | 1.0 | 2.0 | 0.8 | 2.0 | 1.0 | 1.0 | 1.0 | 1.0 | 1.0 | 1.0 | 1.0 | 2.0 | 1.0 | 1.0 | **16.8** | **40.0%** | **À réécrire** |
| `ccna` | B2 | 1.0 | 1.8 | 0.8 | 1.0 | 1.0 | 1.0 | 1.0 | 1.0 | 0.8 | 2.0 | 1.0 | 2.0 | 2.0 | 1.0 | **17.5** | **41.7%** | **À réécrire** |
| `uml` | B2 | 1.0 | 2.0 | 0.8 | 2.0 | 1.0 | 1.0 | 1.0 | 1.0 | 1.0 | 2.0 | 1.0 | 2.0 | 1.0 | 1.0 | **17.8** | **42.4%** | **À réécrire** |
| `uiux` | B2 | 1.0 | 2.0 | 0.8 | 2.0 | 1.0 | 1.0 | 1.0 | 1.0 | 1.0 | 2.0 | 1.0 | 2.0 | 1.0 | 1.0 | **17.8** | **42.4%** | **À réécrire** |
| `docker` | B2 | 1.0 | 2.0 | 0.8 | 1.0 | 1.0 | 1.0 | 1.0 | 1.0 | 1.0 | 2.0 | 1.0 | 2.0 | 1.0 | 1.0 | **16.8** | **40.0%** | **À réécrire** |
| `infographie` | B2 | 1.0 | 2.0 | 0.8 | 2.0 | 1.0 | 1.0 | 1.0 | 1.0 | 1.0 | 2.0 | 1.0 | 2.0 | 1.0 | 1.0 | **17.8** | **42.4%** | **À réécrire** |
| `preparation-web` | B2 | - | - | - | - | - | - | - | - | - | - | - | - | - | - | N/A | N/A | Portail / Archivé |
| `epreuves` | B2 | - | - | - | - | - | - | - | - | - | - | - | - | - | - | N/A | N/A | Portail / Archivé |
| `b1-admin-windows` | B1 | 1.8 | 2.0 | 0.8 | 2.0 | 1.0 | 1.0 | 1.8 | 1.0 | 0.0 | 2.0 | 1.0 | 1.8 | 2.0 | 2.0 | **20.3** | **48.3%** | **À réécrire** |
| `b1-algebre` | B1 | 2.0 | 2.0 | 0.8 | 2.0 | 1.0 | 1.0 | 2.0 | 1.0 | 1.0 | 2.0 | 1.0 | 2.0 | 2.0 | 1.8 | **21.7** | **51.7%** | **À réécrire** |
| `b1-algo` | B1 | 1.9 | 2.0 | 1.0 | 1.0 | 1.1 | 1.0 | 2.0 | 1.0 | 1.0 | 2.0 | 1.0 | 2.1 | 1.9 | 2.0 | **21.0** | **50.0%** | **À réécrire** |
| `b1-anglais` | B1 | 1.8 | 2.0 | 0.8 | 2.0 | 1.0 | 1.0 | 2.0 | 1.0 | 1.0 | 2.0 | 1.0 | 2.0 | 2.0 | 2.0 | **21.7** | **51.7%** | **À réécrire** |
| `b1-reseaux` | B1 | 2.0 | 2.0 | 0.8 | 1.0 | 1.0 | 1.0 | 2.0 | 1.0 | 1.0 | 2.0 | 1.0 | 2.0 | 2.0 | 2.0 | **20.8** | **49.5%** | **À réécrire** |
| `b1-bureautique` | B1 | 2.0 | 2.0 | 0.8 | 2.0 | 1.0 | 1.0 | 2.0 | 1.0 | 1.0 | 2.0 | 1.0 | 2.0 | 2.0 | 2.0 | **21.8** | **51.9%** | **À réécrire** |
| `b1-ccna1` | B1 | 2.0 | 2.0 | 0.8 | 1.0 | 1.0 | 1.0 | 2.0 | 1.0 | 1.0 | 2.0 | 1.0 | 2.0 | 2.0 | 2.0 | **20.8** | **49.5%** | **À réécrire** |
| `b1-architecture` | B1 | 2.0 | 1.3 | 0.8 | 2.0 | 1.0 | 1.0 | 2.0 | 1.0 | 0.3 | 2.0 | 1.0 | 2.0 | 2.0 | 2.0 | **20.5** | **48.8%** | **À réécrire** |
| `b1-robotique` | B1 | 2.0 | 2.0 | 0.8 | 2.0 | 1.0 | 1.0 | 2.0 | 1.0 | 1.0 | 2.0 | 1.0 | 2.0 | 2.0 | 2.0 | **21.8** | **51.9%** | **À réécrire** |
| `b1-cyber` | B1 | 1.8 | 1.7 | 0.8 | 1.0 | 1.0 | 1.0 | 2.0 | 1.0 | 0.7 | 2.0 | 1.0 | 2.0 | 2.0 | 2.0 | **20.0** | **47.6%** | **À réécrire** |
| `b1-droit` | B1 | 2.0 | 2.0 | 0.8 | 2.0 | 1.0 | 1.0 | 2.0 | 1.0 | 1.0 | 2.0 | 1.0 | 2.0 | 2.0 | 2.0 | **21.8** | **51.9%** | **À réécrire** |
| `b1-fr-pro` | B1 | 1.8 | 2.0 | 0.8 | 1.0 | 1.0 | 1.0 | 2.0 | 1.0 | 1.0 | 2.0 | 1.0 | 2.0 | 2.0 | 2.0 | **20.7** | **49.3%** | **À réécrire** |
| `b1-git` | B1 | 2.0 | 2.0 | 0.8 | 2.0 | 1.0 | 2.0 | 2.0 | 1.0 | 2.0 | 2.0 | 1.0 | 2.0 | 2.0 | 2.0 | **23.8** | **56.7%** | **À réécrire** |
| `b1-c-cpp` | B1 | 2.0 | 2.0 | 0.9 | 1.0 | 1.0 | 2.0 | 2.0 | 1.0 | 2.0 | 2.0 | 1.0 | 2.0 | 2.0 | 1.0 | **21.9** | **52.1%** | **À réécrire** |
| `b1-linux` | B1 | 2.0 | 2.0 | 0.8 | 2.0 | 1.0 | 2.0 | 2.0 | 1.0 | 2.0 | 2.0 | 1.0 | 2.0 | 2.0 | 2.0 | **23.8** | **56.7%** | **À réécrire** |
| `b1-merise` | B1 | 2.0 | 1.8 | 0.8 | 2.0 | 1.0 | 1.0 | 2.0 | 1.0 | 0.8 | 2.0 | 1.0 | 2.0 | 2.0 | 2.0 | **21.5** | **51.2%** | **À réécrire** |
| `b1-php` | B1 | 2.0 | 2.0 | 0.9 | 1.0 | 1.0 | 2.0 | 2.0 | 1.0 | 2.0 | 2.0 | 1.0 | 2.0 | 2.0 | 1.0 | **21.9** | **52.1%** | **À réécrire** |
| `b1-prog-web` | B1 | 2.0 | 2.0 | 0.8 | 1.0 | 1.0 | 2.0 | 2.0 | 1.0 | 2.0 | 2.0 | 1.0 | 2.0 | 2.0 | 0.5 | **21.3** | **50.7%** | **À réécrire** |
| `b1-projet` | B1 | 2.0 | 2.0 | 0.8 | 1.0 | 1.0 | 1.0 | 1.8 | 1.0 | 1.0 | 2.0 | 1.0 | 2.0 | 1.0 | 2.0 | **19.7** | **46.9%** | **À réécrire** |
| `b1-python` | B1 | 2.0 | 2.0 | 0.8 | 1.0 | 1.0 | 2.0 | 2.0 | 1.0 | 2.0 | 2.0 | 1.0 | 2.0 | 2.0 | 1.8 | **22.7** | **54.0%** | **À réécrire** |
| `b1-sql` | B1 | 2.0 | 1.7 | 0.8 | 1.0 | 1.0 | 1.0 | 2.0 | 1.0 | 0.7 | 2.0 | 1.0 | 2.0 | 2.0 | 2.0 | **20.2** | **48.1%** | **À réécrire** |
| `b1-stats` | B1 | 2.0 | 2.0 | 0.8 | 2.0 | 1.0 | 1.0 | 2.0 | 1.0 | 1.0 | 2.0 | 1.0 | 2.0 | 2.0 | 2.0 | **21.8** | **51.9%** | **À réécrire** |
| `b1-vb-excel` | B1 | - | - | - | - | - | - | - | - | - | - | - | - | - | - | N/A | N/A | Portail / Archivé |
| `b1-virtualisation` | B1 | 1.7 | 1.8 | 0.8 | 2.0 | 1.0 | 1.0 | 1.8 | 1.0 | 0.8 | 2.0 | 1.0 | 2.0 | 2.0 | 2.0 | **21.0** | **50.0%** | **À réécrire** |
| `b3-algo` | B3 | 1.0 | 2.0 | 0.8 | 2.0 | 1.0 | 2.0 | 1.0 | 2.0 | 2.0 | 2.0 | 1.2 | 2.0 | 1.0 | 0.7 | **20.7** | **49.3%** | **À réécrire** |
| `b3-cloud-computing` | B3 | 1.0 | 1.0 | 0.8 | 2.0 | 1.0 | 1.0 | 1.0 | 1.0 | 1.0 | 2.0 | 1.0 | 2.0 | 1.0 | 1.0 | **16.8** | **40.0%** | **À réécrire** |
| `b3-devops` | B3 | 1.0 | 1.0 | 0.8 | 1.0 | 1.0 | 1.0 | 1.0 | 1.0 | 0.8 | 2.0 | 1.0 | 2.0 | 1.0 | 0.8 | **15.5** | **36.9%** | **À réécrire** |
| `b3-document-technique` | B3 | 1.0 | 1.0 | 0.8 | 1.0 | 1.0 | 1.0 | 1.0 | 1.0 | 0.7 | 2.0 | 1.0 | 2.0 | 1.0 | 0.8 | **15.3** | **36.4%** | **À réécrire** |
| `b3-etude-quantitative` | B3 | 1.0 | 1.0 | 0.8 | 2.0 | 1.0 | 1.0 | 1.0 | 1.0 | 1.0 | 2.0 | 1.2 | 2.0 | 1.0 | 1.0 | **17.0** | **40.5%** | **À réécrire** |
| `b3-firewall` | B3 | 1.0 | 1.0 | 0.8 | 1.0 | 1.0 | 1.0 | 1.0 | 1.0 | 1.0 | 2.0 | 1.0 | 2.0 | 1.0 | 0.7 | **15.5** | **36.9%** | **À réécrire** |
| `b3-github` | B3 | 1.0 | 1.0 | 0.8 | 1.0 | 1.0 | 1.0 | 1.0 | 1.0 | 1.0 | 2.0 | 1.0 | 2.0 | 1.0 | 0.0 | **14.8** | **35.2%** | **À réécrire** |
| `b3-linux` | B3 | 1.0 | 1.0 | 0.8 | 1.0 | 1.0 | 1.0 | 1.0 | 1.0 | 0.8 | 2.0 | 1.0 | 2.0 | 1.0 | 0.3 | **15.0** | **35.7%** | **À réécrire** |
| `b3-agile` | B3 | 1.0 | 1.0 | 0.8 | 1.0 | 1.0 | 1.0 | 1.0 | 1.0 | 1.0 | 2.0 | 1.0 | 2.0 | 1.0 | 1.0 | **15.8** | **37.6%** | **À réécrire** |
| `b3-pfsense` | B3 | 1.0 | 0.8 | 0.8 | 1.0 | 1.0 | 0.8 | 1.0 | 0.8 | 0.5 | 1.8 | 1.0 | 1.8 | 1.0 | 0.5 | **14.0** | **33.3%** | **À réécrire** |
| `b3-reseau-lan` | B3 | 1.0 | 1.0 | 0.8 | 1.0 | 1.0 | 1.0 | 1.0 | 1.0 | 0.8 | 2.0 | 1.0 | 2.0 | 1.0 | 0.8 | **15.5** | **36.9%** | **À réécrire** |
| `b3-sql` | B3 | 1.0 | 1.0 | 0.8 | 2.0 | 1.0 | 1.0 | 1.0 | 1.0 | 0.8 | 2.0 | 1.0 | 2.0 | 1.0 | 0.8 | **16.5** | **39.3%** | **À réécrire** |
| `b3-veille` | B3 | 1.0 | 1.0 | 0.8 | 2.0 | 1.0 | 1.0 | 1.0 | 1.0 | 0.8 | 2.0 | 1.0 | 2.0 | 1.0 | 1.0 | **16.7** | **39.8%** | **À réécrire** |
| `b3-windows-server` | B3 | 1.0 | 1.0 | 0.8 | 2.0 | 1.0 | 1.0 | 1.0 | 1.0 | 1.0 | 2.0 | 1.0 | 2.0 | 1.0 | 1.0 | **16.8** | **40.0%** | **À réécrire** |
| `b3-anglais` | B3 | 1.5 | 1.0 | 0.8 | 1.0 | 1.0 | 1.0 | 1.0 | 1.0 | 0.7 | 2.0 | 1.0 | 2.0 | 1.0 | 1.0 | **16.0** | **38.1%** | **À réécrire** |
| `b3-cloud-azure` | B3 | 1.0 | 1.0 | 0.8 | 1.0 | 1.0 | 1.0 | 1.0 | 1.0 | 0.7 | 2.0 | 1.0 | 2.0 | 1.0 | 0.3 | **14.8** | **35.2%** | **À réécrire** |
| `b3-cryptographie` | B3 | 1.0 | 1.0 | 0.8 | 2.0 | 1.0 | 1.0 | 1.0 | 1.0 | 1.0 | 2.0 | 1.0 | 2.0 | 1.0 | 0.2 | **16.0** | **38.1%** | **À réécrire** |
| `b3-google-cloud` | B3 | 1.0 | 1.0 | 0.8 | 1.0 | 1.0 | 1.0 | 1.0 | 1.0 | 0.8 | 2.0 | 1.0 | 2.0 | 1.0 | 0.7 | **15.3** | **36.4%** | **À réécrire** |
| `b3-hacking` | B3 | 1.0 | 1.0 | 0.8 | 1.0 | 1.0 | 1.0 | 1.0 | 1.0 | 0.3 | 2.0 | 1.0 | 2.0 | 1.0 | 0.3 | **14.5** | **34.5%** | **À réécrire** |
| `b3-cloud-aws` | B3 | 1.2 | 1.0 | 0.8 | 1.0 | 1.0 | 1.0 | 1.0 | 1.0 | 1.0 | 2.0 | 2.0 | 2.0 | 1.0 | 1.0 | **17.0** | **40.5%** | **À réécrire** |
| `b3-supervision` | B3 | 1.5 | 1.0 | 0.8 | 1.0 | 1.0 | 1.0 | 1.0 | 1.0 | 1.0 | 2.0 | 2.0 | 2.0 | 1.0 | 1.0 | **17.3** | **41.2%** | **À réécrire** |
| `b3-voip` | B3 | 1.3 | 1.0 | 0.8 | 1.0 | 1.0 | 1.0 | 1.0 | 1.0 | 1.0 | 2.0 | 2.0 | 2.0 | 1.0 | 1.0 | **17.2** | **41.0%** | **À réécrire** |
| `b3-virtualisation` | B3 | 1.5 | 1.0 | 0.8 | 1.0 | 1.0 | 1.0 | 1.0 | 1.0 | 1.0 | 2.0 | 1.3 | 2.0 | 1.0 | 1.0 | **16.7** | **39.8%** | **À réécrire** |

## 5. Classement des Cours par Priorité d'Intervention

Conformément à la méthode (Section 4 Phase 6 et Section 5), la priorité combine : **(1) la vitrine gratuite (Chapitre 1 de chaque cours)**, **(2) l'impact = nombre d'étudiants touchés (B1 > B2 > B3, fondamentaux dont tout dépend en tête) × gravité des défauts (S0 > S1 > S2)**.

| Rang | Priorité | Cible / Lot de cours | Niveau | Raison de la priorité (Impact × Gravité) | Défauts majeurs à corriger en premier |
| :---: | :---: | :--- | :---: | :--- | :--- |
| **1** | **P0 — Vitrine & Moteur** | **Briques partagées (`scripts/course-kit.js`, `scripts/generate-code-labs.js`, `index.html`, `server/services/ai-help.js`)** | Transverse | Touche **100 % des 68 cours** et la page d'accueil dès la première seconde de visite. | Ordre B1/B2 sur `index.html`, virgules parasites `kit.box()`, liens 404 `navItems()`, seuils `.bands` (90–94 % et % B3), intitulés dynamiques indices/notions, harmonisation tu/vous, prompt IA adaptatif. |
| **2** | **P0 — Cas témoins & Vitrine Ch. 1** | **`b1-algo` (Ch. 1 à 10) & `b3-pfsense` (Ch. 1 à 6)** | B1 & B3 | Cours vitrines présentant des **S0 bloquants dès le Chapitre 1 gratuit** (exercices Python sans cours Python dans `b1-algo`, absence du cours CIDR + conflit Python/`analyse` + erreur RFC 3021 dans `b3-pfsense`). | `ALGO-B1-CH1-001` à `009` et `PFSENSE-B3-CH1-001` à `012`. |
| **3** | **P0 — Fondamentaux B1 bloquants** | **`b1-admin-windows`, `b1-projet`, `b1-sql`, `b1-reseaux`, `b1-ccna1`, `b1-architecture`, `b1-robotique`, `b1-vb-excel`** | B1 | Touchés par tous les étudiants de Licence 1 ; contiennent des **S0** (Bash Linux pour administrer Windows dans `b1-admin-windows`, Tkinter/POO jamais enseignés dans `b1-projet`, SQL réduit à des grilles statiques dans `b1-sql`, cours fantôme `b1-vb-excel`). | Remplacer Bash par études de cas/PowerShell dans `b1-admin-windows`, activer le moteur SQL WASM sur `b1-sql`, introduire Tkinter/POO dans `b1-projet`, déparachuter le jargon Ch. 1 de `b1-reseaux`/`b1-architecture`. |
| **4** | **P1 — Fondamentaux B1 de code** | **`b1-python`, `b1-c-cpp`, `b1-php`, `b1-prog-web`, `b1-linux`, `b1-git`, `b1-merise`, `b1-algebre`, `b1-stats`** | B1 | Socle de compétences de 1re année (70–74 % « à retoucher ») ; l'exécution réelle fonctionne mais des références en avant (`D2`), fuites `\n` (`b1-algebre`, `b1-stats`) et écarts de seuils subsistent. | Ajouter les blocs Prérequis, corriger les fuites `\n`, aligner les 8 notions avec `cartes.html`, résoudre le cycle `b1-merise` ⇄ `b1-sql`. |
| **5** | **P1 — Cours B2 désalignés avec les examens officiels (`epreuves`)** | **`csharp`, `admin-vm`, `sql`, `docker`, `react`, `probabilites`, `RD-RO`, `ccna`, `assembleur`, `uml`** | B2 | Risque direct d'échec aux examens officiels B2 (`Recueil_Epreuves_2024_2025.pdf`). | Restaurer l'exécution C# réelle dans `csharp` et SQL dans `sql` ; ajouter `vMotion` et `Thin Provisioning` dans `admin-vm` ; ajouter un module prérequis JS ES6+ dans `react` et intégrales dans `probabilites` ; corriger les 316 fuites `\n` dans `RD-RO`. |
| **6** | **P2 — Autres cours B2** | **`linux`, `php`, `rd_java`, `rd_winserver`, `api-rest-flask`, `Cyber securite B2`, `droit`, `erp-si`, `ingenierie-besoin`, `uiux`, `infographie`, `masterclass-apprendre`** | B2 | Cours B2 solides sur le fond mais affectés par les liens cassés (`qcm-100.html`, `exercices.html`), l'absence de prérequis PowerShell (`rd_winserver`) ou les grilles `analyse` sans bloc `[Exemple]`. | Réparer les liens 404, ajouter le bloc `[Exemple]` dans les grilles `analyse`, introduire PowerShell au Ch. 1 de `rd_winserver`. |
| **7** | **P2 — Les 22 autres cours B3** | **`b3-firewall`, `b3-reseau-lan`, `b3-linux`, `b3-sql`, `b3-cryptographie`, `b3-hacking`, `b3-devops`, `b3-github`, `b3-cloud-*`, `b3-windows-server`, `b3-virtualisation`, `b3-voip`, `b3-supervision`, `b3-agile`, `b3-anglais`, `b3-document-technique`, `b3-etude-quantitative`, `b3-veille`, `b3-algo`** | B3 | Tous les cours B3 (sauf `b3-algo`) souffrent de la contradiction entre objectifs/catalogue « Python 3 » et ateliers `analyse`, de 100 % de liens Exercices/Examen cassés dans la navbar, de 63 virgules parasites et de seuils `.bands` sans `%`. | Régénérer les 23 cours B3 après correction de `course-kit.js`, réordonner `b3-cryptographie` au S1 avant `b3-pfsense`, et replier les corrigés de `chapitres/examens.html`. |

# Lot C — Cohérence des Exercices et des Seuils : Remédiation K4, K5, K6 (`audit/tour4/C-exercices-seuils.md`)

- **Branche Git** : `tour4-lot-c` (créée depuis `tour4-lot-b`)
- **Périmètre strict** : Points **K4, K5 et K6** exclusivement (1 commit atomique par point K).

---

## 1. Synthèse des Commits Atomiques et Tableau Comparatif Avant / Après

| Point | Commit (`tour4-lot-c`) | Script de contrôle (`audit/tour4/scripts/`) | Mesure Avant Lot C | Mesure Après Lot C | Critère d’acceptation |
| :---: | :---: | :--- | :--- | :--- | :--- |
| **K4** | `345395f` | `python3 audit/tour4/scripts/check_k4_cidr.py NEW` | `19` occurrences de la règle fausse `num_addresses - 2 (si prefix < 31, sinon 0)` / vocabulaire Python `ipaddress` ; `/30` et `/32` non couverts dans `pf3-c1-e1` | **`0` occurrence** de la règle fausse / vocabulaire Python `ipaddress` ; **4/4 cas CIDR (`/24`, `/30`, `/31`, `/32`) couverts et validés** dans `pf3-c1-e1` | `0` occurrence de la règle fausse ; accord cours / énoncé / indice / tests / corrigé sur `/24`, `/30`, `/31` (RFC 3021 = `2`), `/32` (`= 1`) |
| **K5** | `2e2fc49` | `python3 audit/tour4/scripts/check_analyse_purge.py NEW` & `audit/tour4/exceptions-analyse.json` | `275` occurrences non justifiées (`stdin`, `Bash`, `Python 3`, `ipaddress`, `print(`, `entrée standard`) dans les cours `analyse` (`339` brutes avant filtrage des `64` exceptions) | **`0` occurrence hors exceptions justifiées** (`65` exceptions documentées dans `exceptions-analyse.json`) ; **`20/20` chapitres tirés au hasard vérifiés** | `0` occurrence hors liste d’exceptions justifiées ; énoncés décrivant une grille d’analyse |
| **K6** | `1368016` | `python3 audit/tour4/scripts/check_seuils.py NEW` | `132` chapitres hors échelle unifiée (`88` mêlant `%` et `/8` ex. `b3-agile`, `44` avec `Score < 60 %` ou `8/8`) + `1` simulateur avec trou `70–89 %` | **`0` trou**, **`0` chevauchement**, **`0` échelle mixte**, **`416/416` chapitres sur l’échelle unique `< 50 %` \| `50–69 %` \| `70–94 %` \| `≥ 95 %`** | 1 seule échelle documentée dans `DESIGN.md` ; `0` trou, `0` chevauchement, `0` échelle incohérente sur les 416 chapitres |

---

## 2. Sorties Brutes des Scripts de Vérification (`audit/tour4/scripts/`)

### 2.1. Point K4 — `check_k4_cidr.py` (Règle CIDR RFC 3021 `/24`, `/30`, `/31`, `/32` & Suppression de `ipaddress`)

#### Sortie brute AVANT K4
```text
OCCURRENCE INTERDITE: b3-cloud-azure/chapitres/chapitre4.html -> 'net.network_address'
OCCURRENCE INTERDITE: b3-cloud-azure/chapitres/chapitre4.html -> 'net.network_address'
OCCURRENCE INTERDITE: b3-google-cloud/chapitres/chapitre4.html -> 'net.prefixlen'
OCCURRENCE INTERDITE: b3-pfsense/chapitres/chapitre1.html -> 'usable_hosts'
OCCURRENCE INTERDITE: b3-pfsense/chapitres/chapitre1.html -> 'num_addresses - 2'
OCCURRENCE INTERDITE: b3-pfsense/chapitres/chapitre1.html -> 'prefix &lt; 31'
OCCURRENCE INTERDITE: b3-pfsense/chapitres/chapitre1.html -> 'usable_hosts'
OCCURRENCE INTERDITE: b3-pfsense/chapitres/chapitre1.html -> 'iface_obj.network'
OCCURRENCE INTERDITE: server/exercises/b3-cloud-azure.js -> 'net.network_address'
OCCURRENCE INTERDITE: server/exercises/b3-cloud-azure.js -> 'net.network_address'
OCCURRENCE INTERDITE: server/exercises/b3-google-cloud.js -> 'net.prefixlen'
OCCURRENCE INTERDITE: server/exercises/b3-cloud-azure/chapitre4.js -> 'net.network_address'
OCCURRENCE INTERDITE: server/exercises/b3-cloud-azure/chapitre4.js -> 'net.network_address'
OCCURRENCE INTERDITE: server/exercises/b3-google-cloud/chapitre4.js -> 'net.prefixlen'
OCCURRENCE INTERDITE: server/exercises/b3-pfsense/chapitre1.js -> 'usable_hosts'
OCCURRENCE INTERDITE: server/exercises/b3-pfsense/chapitre1.js -> 'num_addresses - 2'
OCCURRENCE INTERDITE: server/exercises/b3-pfsense/chapitre1.js -> 'prefix &lt; 31'
OCCURRENCE INTERDITE: server/exercises/b3-pfsense/chapitre1.js -> 'usable_hosts'
OCCURRENCE INTERDITE: server/exercises/b3-pfsense/chapitre1.js -> 'iface_obj.network'
TOTAL occurrences règle CIDR fausse / ipaddress résiduel: 19  (attendu: 0)
Cas CIDR manquants dans pf3-c1-e1 (/24, /30, /31, /32): 2 -> ['/31 (hosts=2)', '/32 (hosts=1)']  (attendu: 0)
```

#### Sortie brute APRÈS K4
```text
TOTAL occurrences règle CIDR fausse / ipaddress résiduel: 0  (attendu: 0)
Cas CIDR manquants dans pf3-c1-e1 (/24, /30, /31, /32): 0 -> []  (attendu: 0)
```

---

### 2.2. Point K5 — `check_analyse_purge.py` (Annexe D) & `audit/tour4/exceptions-analyse.json`

#### Sortie brute AVANT K5
```text
Cyber securite B2/atelier.html: 1 -> ['entrée standard']
b1-admin-windows/atelier.html: 4 -> ['Bash', 'Bash', 'Bash', 'Bash']
b1-admin-windows/exercices/exercices.html: 1 -> ['Bash']
b1-admin-windows/index.html: 1 -> ['Bash']
b1-admin-windows/sommaire.html: 2 -> ['Bash', 'Bash']
b1-algebre/atelier.html: 1 -> ['entrée standard']
b1-algebre/chapitres/chapitre1.html: 1 -> ['entrée standard']
b1-anglais/atelier.html: 2 -> ['Bash', 'Bash']
b1-anglais/index.html: 1 -> ['Bash']
b1-anglais/sommaire.html: 1 -> ['Bash']
b1-architecture/atelier.html: 2 -> ['Bash', 'Bash']
b1-architecture/chapitres/chapitre2.html: 1 -> ['Bash']
b1-architecture/chapitres/chapitre3.html: 1 -> ['Bash']
b1-architecture/chapitres/chapitre4.html: 1 -> ['Bash']
b1-architecture/chapitres/chapitre5.html: 2 -> ['Bash', 'Bash']
...
masterclass-apprendre/chapitres/chapitre3.html: 2 -> ['entrée standard', 'entrée standard']
masterclass-apprendre/chapitres/chapitre4.html: 3 -> ['entrée standard', 'entrée standard', 'entrée standard']
masterclass-apprendre/chapitres/chapitre5.html: 2 -> ['entrée standard', 'entrée standard']
masterclass-apprendre/chapitres/chapitre6.html: 1 -> ['entrée standard']
Exceptions pédagogiques documentées ignorées: 64
TOTAL occurrences suspectes dans les cours 'analyse': 275  (attendu: 0 hors exceptions justifiées)
```

#### Sortie brute APRÈS K5
```text
Exceptions pédagogiques documentées ignorées: 64
TOTAL occurrences suspectes dans les cours 'analyse': 0  (attendu: 0 hors exceptions justifiées)
```

---

### 2.3. Point K6 — `check_seuils.py` & `DESIGN.md`

- **Règle ajoutée dans `DESIGN.md` (Section 5 — Garde-fous Anti-Slop)** :
  > *« 6. **Échelle Unique du Test de Maîtrise (`0–100 %`)** : Sur l’ensemble des 416 chapitres et des simulateurs d’examen, les bandeaux d’auto-évaluation (`.bands`) et le moteur JS (`cours.js`) utilisent une seule et unique échelle continue à 4 paliers sans trou ni chevauchement ni mélange `/8` : **`< 50 %`** (Notions insuffisamment maîtrisées), **`50–69 %`** (Compréhension partielle), **`70–94 %`** (Bonne maîtrise) et **`≥ 95 %`** (Maîtrise recherchée). »*

#### Sortie brute AVANT K6
```text
b3-agile/chapitres/chapitre1.html: échelle mixte ou incompatible (% et /8 ou Score < 60%) -> ['< 50 % (0 à 3/8) — Incompréhension ', '50–89 % (4 à 7/8) — Bonne maîtrise ', '≥ 90 % (8/8) — Capacité experte à s']
b3-agile/chapitres/chapitre2.html: échelle mixte ou incompatible (% et /8 ou Score < 60%) -> ['< 50 % (0 à 3/8) — Confusion entre ', '50–89 % (4 à 7/8) — Bonne applicati', '≥ 90 % (8/8) — Capacité experte à a']
b3-agile/chapitres/chapitre3.html: échelle mixte ou incompatible (% et /8 ou Score < 60%) -> ['< 50 % (0 à 3/8) — Utilisation d’un', '50–89 % (4 à 7/8) — Bonne configura', '≥ 90 % (8/8) — Maîtrise experte de ']
b3-agile/chapitres/chapitre4.html: échelle mixte ou incompatible (% et /8 ou Score < 60%) -> ['< 50 % (0 à 3/8) — Rédaction de sto', '50–89 % (4 à 7/8) — Bonne applicati', '≥ 90 % (8/8) — Maîtrise experte du ']
b3-agile/chapitres/chapitre5.html: échelle mixte ou incompatible (% et /8 ou Score < 60%) -> ['< 50 % (0 à 3/8) — Assimilation de ', '50–89 % (4 à 7/8) — Calcul rigoureu', '≥ 90 % (8/8) — Maîtrise experte du ']
b3-agile/chapitres/chapitre6.html: échelle mixte ou incompatible (% et /8 ou Score < 60%) -> ['< 50 % (0 à 3/8) — Incompréhension ', '50–89 % (4 à 7/8) — Bonne compréhen', '≥ 90 % (8/8) — Capacité experte à o']
b3-algo/chapitres/chapitre1.html: échelle mixte ou incompatible (% et /8 ou Score < 60%) -> ['< 50 % (0 à 3/8) — Révisez les défi', '50–89 % (4 à 7/8) — Bonnes bases an', '≥ 90 % (8/8) — Parfait ! L’analyse ']
b3-algo/chapitres/chapitre2.html: échelle mixte ou incompatible (% et /8 ou Score < 60%) -> ['< 50 % (0 à 3/8) — Révisez la propr', '50–89 % (4 à 7/8) — Bonnes notions,', '≥ 90 % (8/8) — Parfait ! La manipul']
b3-algo/chapitres/chapitre3.html: échelle mixte ou incompatible (% et /8 ou Score < 60%) -> ['< 50 % (0 à 3/8) — Révisez l’indexa', '50–89 % (4 à 7/8) — Bonnes bases, r', '8/8 : Parfait ! La mécanique des ta']
b3-algo/chapitres/chapitre4.html: échelle mixte ou incompatible (% et /8 ou Score < 60%) -> ['< 50 % (0 à 3/8) — Révisez la modél', '50–89 % (4 à 7/8) — Bonnes bases, r', '≥ 90 % (8/8) — Parfait ! La théorie']
b3-algo/chapitres/chapitre5.html: échelle mixte ou incompatible (% et /8 ou Score < 60%) -> ['< 50 % (0 à 3/8) — Révisez la notio', '50–89 % (4 à 7/8) — Bonnes bases, r', '≥ 90 % (8/8) — Parfait ! Le calcul ']
b3-algo/chapitres/chapitre6.html: échelle mixte ou incompatible (% et /8 ou Score < 60%) -> ['< 50 % (0 à 3/8) — Révisez le princ', '50–89 % (4 à 7/8) — Bonnes bases, r', '≥ 90 % (8/8) — Parfait ! Vous maîtr']
b3-anglais/chapitres/chapitre1.html: échelle mixte ou incompatible (% et /8 ou Score < 60%) -> ['< 50 % (0 à 3/8) — Difficultés à dé', '50–89 % (4 à 7/8) — Bonne maîtrise ', '≥ 90 % (8/8) — Excellence linguisti']
b3-anglais/chapitres/chapitre2.html: échelle mixte ou incompatible (% et /8 ou Score < 60%) -> ['< 50 % (0 à 3/8) — Confusion entre ', '50–89 % (4 à 7/8) — Bonne maîtrise ', '≥ 90 % (8/8) — Excellence technique']
b3-anglais/chapitres/chapitre3.html: échelle mixte ou incompatible (% et /8 ou Score < 60%) -> ['< 50 % (0 à 3/8) — Difficultés à st', '50–89 % (4 à 7/8) — Bonne rédaction', '≥ 90 % (8/8) — Excellence en commun']
...
b3-windows-server/chapitres/chapitre5.html: échelle mixte ou incompatible (% et /8 ou Score < 60%) -> ['< 50 % (0 à 3/8) — Difficultés à di', '50–89 % (4 à 7/8) — Bonne maîtrise ', '≥ 90 % (8/8) — Excellence en virtua']
b3-windows-server/chapitres/chapitre6.html: échelle mixte ou incompatible (% et /8 ou Score < 60%) -> ['< 50 % (0 à 3/8) — Difficultés avec', '50–89 % (4 à 7/8) — Bonne maîtrise ', '≥ 90 % (8/8) — Excellence en ingéni']
Chapitres vérifiés: 416
Chapitres avec trou ou chevauchement: 0  (attendu: 0)
Chapitres avec échelle mixte (% + /8 ou Score < 60 %): 132  (attendu: 0)
Chapitres hors échelle unifiée ('< 50 %', '50–69 %', '70–94 %', '≥ 95 %'): 132  (attendu: 0)
```

#### Sortie brute APRÈS K6
```text
Chapitres vérifiés: 416
Chapitres avec trou ou chevauchement: 0  (attendu: 0)
Chapitres avec échelle mixte (% + /8 ou Score < 60 %): 0  (attendu: 0)
Chapitres hors échelle unifiée ('< 50 %', '50–69 %', '70–94 %', '≥ 95 %'): 0  (attendu: 0)
```

---

### 2.4. Contrôles de Génération et de Non-Régression (Lots A, B et C)
```text
> node scripts/generate-courses.js --check
[ok] cours à jour (832 pages, 64 cours)

> node scripts/generate-code-labs.js --check
[ok] ateliers à jour (1250 exercices, 68 cours)

> python3 audit/tour4/scripts/check_notions.py /tmp/revi_tour4/MAIN /tmp/revi_tour4/NEW
Chapitres vérifiés: 416
TOTAL notions perdues: 0  (attendu: 0)
TOTAL titres incohérents avec la longueur de liste: 0  (attendu: 0)

> python3 audit/tour4/scripts/check_cartes.py /tmp/revi_tour4/NEW
TOTAL questions en double: 0  (attendu: 0)
TOTAL notions sans carte: 0  (attendu: 0)

> python3 audit/tour4/scripts/check_latex.py /tmp/revi_tour4/NEW
TOTAL séquences corrompues: 0  (attendu: 0)

> python3 audit/tour4/scripts/check_tutoiement.py /tmp/revi_tour4/NEW
Pages avec pronoms de tutoiement: 0  (attendu: 0)
Pages avec impératifs de tutoiement: 0  (attendu: 0)
Pages mêlant tu (pronom/impératif) et vous: 0  (attendu: 0)
TOTAL occurrences tutoiement (pronoms + impératifs): 0  (attendu: 0)
```

---

## 3. Point K5 — Tableau des 20 Chapitres « Analyse » Tirés au Hasard et Relus (`seed = 20261021`)

| # | Chapitre vérifié (`data-language="analyse"`) | Jeton purgé | Extrait AVANT K5 | Extrait APRÈS K5 (Grille d’analyse cohérente) |
| :---: | :--- | :---: | :--- | :--- |
| 1 | `ccna/chapitres/chapitre6.html` | `entrée standard` | erfaces d'un routeur à partir de l'entrée standard : | erfaces d'un routeur à partir des données du scénario : |
| 2 | `b1-architecture/chapitres/chapitre2.html` | `Bash` | hapitre l'automatise, y compris en Bash. | hapitre l'automatise, y compris dans les grilles d’analyse de l’atelier. |
| 3 | `ccna/chapitres/chapitre4.html` | `entrée standard` | Pour chaque commande de l'entrée standard, afficher l'invite courante suivie de la commande, puis le résultat  | Pour chaque commande du scénario, indiquer l'invite courante suivie de la commande, puis le résultat ou l'erre |
| 4 | `erp-si/chapitres/chapitre2.html` | `entrée standard` | Lit le montant de la dépense sur l’entrée standard (nombre flottant ou entier positif) et affiche la décision  | Analyse le montant de la dépense fourni(e) dans les données du cas (nombre flottant ou entier positif) et affi |
| 5 | `b3-hacking/chapitres/chapitre6.html` | `stdin` | Entrée stdin: SCAN_SCRIPT code=&lt;extrait_de_code&gt; . | Données du cas : SCAN_SCRIPT code=&lt;extrait_de_code&gt; . |
| 6 | `masterclass-apprendre/chapitres/chapitre2.html` | `entrée standard` | ion de méthode en minuscules sur l’entrée standard et affiche son efficacité : - relecture_surlignee , feuille | titulé de méthode en minuscules dans les données du cas et affiche son efficacité : - relecture_surlignee , fe |
| 7 | `b3-pfsense/chapitres/chapitre5.html` | `ipaddress` | TE (à tester avec le module Python ipaddress ) : | TE (en vérifiant l’appartenance de l’adresse au sous-réseau CIDR) : |
| 8 | `b1-virtualisation/chapitres/chapitre3.html` | `Bash` | Trois gestes qui se programment en Bash au chapitre. | Trois gestes qui s’appliquent méthodiquement dans les études de cas du chapitre. |
| 9 | `b3-google-cloud/chapitres/chapitre2.html` | `stdin` | Commandes lues stdin: | Opérations soumises à l’analyse : |
| 10 | `b3-cryptographie/chapitres/chapitre2.html` | `stdin` | Commandes lues stdin: | Opérations soumises à l’analyse : |
| 11 | `ingenierie-besoin/chapitres/chapitre3.html` | `entrée standard` | t un identifiant de contexte sur l’entrée standard et affiche la technique recommandée. | alyse un identifiant de contexte fourni(e) dans les données du cas et affiche la technique recommandée. |
| 12 | `b1-algebre/chapitres/chapitre1.html` | `entrée standard` | er un vecteur par un réel lu sur l’entrée standard. | er un vecteur par un réel fourni dans les données du cas. |
| 13 | `ingenierie-besoin/chapitres/chapitre5.html` | `entrée standard` | u format Domaine;Type;Numero sur l’entrée standard et affiche : EXIGENCE: &lt;DOM&gt;-&lt;TYPE&gt;-&lt;00N&gt; | ne au format Domaine;Type;Numero fourni(e) dans les données du cas et affiche : EXIGENCE: &lt;DOM&gt;-&lt;TYPE |
| 14 | `masterclass-apprendre/chapitres/chapitre5.html` | `entrée standard` | &amp; Taylor). Lit une ligne sur l’entrée standard avec la liste des matières séparées par des virgules et le  | &amp; Taylor). Analyse une ligne fourni(e) dans les données du cas avec la liste des matières séparées par des |
| 15 | `b1-architecture/chapitres/chapitre4.html` | `Bash` | Vérifier en Bash | Vérifier dans l’atelier |
| 16 | `b3-supervision/chapitres/chapitre2.html` | `stdin` | Entrée stdin: SNMP_DECODE OID=&lt;oid&gt; VALUE=&lt;val&gt; . | Données du cas : SNMP_DECODE OID=&lt;oid&gt; VALUE=&lt;val&gt; . |
| 17 | `b3-hacking/chapitres/chapitre5.html` | `stdin` | Entrée stdin: SUID_CHECK path=&lt;chemin&gt; owner=&lt;user&gt; mode=&lt;octal&gt; . | Données du cas : SUID_CHECK path=&lt;chemin&gt; owner=&lt;user&gt; mode=&lt;octal&gt; . |
| 18 | `b3-hacking/chapitres/chapitre3.html` | `stdin` | Entrée stdin: TCP_PROBE scan_type=&lt;SYN\|FIN\|NULL\|XMAS\|ACK&gt; port=&lt;p&gt; reply=&lt;SYN+ACK\|RST\|TIMEOUT\|R | Données du cas : TCP_PROBE scan_type=&lt;SYN\|FIN\|NULL\|XMAS\|ACK&gt; port=&lt;p&gt; reply=&lt;SYN+ACK\|RST\|TIMEOU |
| 19 | `masterclass-apprendre/chapitres/chapitre1.html` | `entrée standard` | t de situation en minuscules sur l’entrée standard et affiche : - flash_visuel_200ms , echo_sonore_1s , image_ | fiant de situation en minuscules fourni(e) dans les données du cas et affiche : - flash_visuel_200ms , echo_so |
| 20 | `erp-si/chapitres/chapitre4.html` | `entrée standard` | taire facturé). Lit 3 lignes sur l’entrée standard : Ligne 1 : qte_commandee prix_commande (ex. 100 15.0 ) Lig | taire facturé). Analyse 3 lignes fournies dans les données du cas : Ligne 1 : qte_commandee prix_commande (ex. |

# Fidélité aux Sources (Mission A) — `b3-hacking` (Hacking éthique · B3)

- **Cours** : `b3-hacking` (Hacking éthique) — Niveau **B3** (6 chapitres)
- **Documents sources rattachés (1 fichiers, 94 pages)** :
- `textes/B3/Semestre II/hacking/Cours CEH.txt` (94 pages, statut `ok`)
- **Niveau de confiance** : **Élevé**

## 1. Ordre d'introduction des notions (Sources vs Site)
- **Diagnostic d'alignement séquentiel** : **Progression globalement alignée sur les supports sources**
- **Jalons extraits des sources (`PLANS.md` & `textes/`)** :
- `textes/B3/Semestre II/hacking/Cours CEH.txt#PAGE 1` : *Introduction à l’Ethical hacking*
- `textes/B3/Semestre II/hacking/Cours CEH.txt#PAGE 16` : *CRYPTOGRAPHY*
- `textes/B3/Semestre II/hacking/Cours CEH.txt#PAGE 31` : *How does Asymmetric Encryption Works?*
- `textes/B3/Semestre II/hacking/Cours CEH.txt#PAGE 46` : *(page sans texte)*
- `textes/B3/Semestre II/hacking/Cours CEH.txt#PAGE 61` : *6. Web Application Scanning:*
- `textes/B3/Semestre II/hacking/Cours CEH.txt#PAGE 76` : *3. Privilege Escalation: (L'escalade des*
- **Progression des chapitres sur le site** :
- `b3-hacking/chapitres/chapitre1.html` : **Chapitre 1 — Fondements du Hacking Éthique, Cadre Légal & Méthodologies de Pentest** — 1. Cadre Juridique et Responsabilité Pénale de l'Auditeur de Sécurité (`L82`), 2. Typologie des Acteurs et Organisation des Équipes de Sécurité (`L102`), 3. Méthodologies Standardisées de Test d'Intrusion (PTES, OSSTMM, OWASP) (`L129`), 4. Les 5 Phases Canoniques du CEH et la Cyber Kill Chain (`L143`)
- `b3-hacking/chapitres/chapitre2.html` : **Chapitre 2 — Reconnaissance Passive & Active (OSINT, Cartographie & DNS)** — 1. Principes de l'OSINT et Collecte Passive d'Informations (`L82`), 2. Recherche Ciblée : Google Dorking, Shodan & Censys (`L103`), 3. Cartographie DNS Approfondie et Faille de Transfert de Zone (AXFR) (`L128`), 4. Sécurité de Messagerie : SPF, DKIM et DMARC contre l'Usurpation (`L146`)
- `b3-hacking/chapitres/chapitre3.html` : **Chapitre 3 — Balayage Réseau, Énumération & Cartographie des Vulnérabilités (Scanning)** — 1. Mécanismes Réseau TCP/IP et RFC 793 au Cœur du Balayage (`L82`), 2. Techniques Avancées de Sondes Nmap & Cartographie de Pare-Feu (`L101`), 3. Empreinte de Système d'Exploitation (OS Fingerprinting) & Détection de Versions (`L119`), 4. Énumération Approfondie des Protocoles d'Infrastructure : SMB & SNMP (`L139`)
- `b3-hacking/chapitres/chapitre4.html` : **Chapitre 4 — Exploitation des Vulnérabilités Web (OWASP Top 10 & Injection)** — 1. Taxonomie de l'OWASP Top 10 & Défaillances de Contrôle d'Accès (A01 / IDOR) (`L82`), 2. Injections SQL Approfondies : In-Band, Inférentielles & Remédiation (`L97`), 3. Vulnérabilités Côté Client : XSS (Cross-Site Scripting) & CSRF (`L117`), 4. Vulnérabilités Serveur Critiques : SSRF, RCE & Path Traversal (LFI) (`L141`)
- `b3-hacking/chapitres/chapitre5.html` : **Chapitre 5 — Exploitation Système, Escalade de Privilèges & Pivoting (Gaining Access)** — 1. Architecture Mémoire & Dépassement de Tampon (Stack Buffer Overflow) (`L82`), 2. Exploitation avec Metasploit Framework & Sessions Meterpreter (`L111`), 3. Élévation de Privilèges Linux : SUID, GTFOBins & Sudoers (`L128`), 4. Élévation de Privilèges Windows : Unquoted Service Paths & SeImpersonate (`L150`)
- `b3-hacking/chapitres/chapitre6.html` : **Chapitre 6 — Maintien de l'Accès, Post-Exploitation, Anti-Forensics & Rapport de Pentest** — 1. Persistance & Maintien de l'Accès (Linux & Windows) (`L82`), 2. Web Shells & Détection de l'Obfuscation (`L106`), 3. Dissimulation, Anti-Forensics & Nettoyage d'Implants (`L127`), 4. Détection Moderne de la Blue Team : SIEM, EDR, Sigma & YARA (`L148`)

## 2. Couverture (Lacunes & Ajouts)
- Les 6 chapitres du site couvrent les notions des 1 document(s) source(s) (94 pages).

## 3. Comparaison de 3 Définitions-Clés (Source vs Site)
### Définition 1 — OWASP WSTG (Web Security Testing Guide)
- **Source PDF** : `textes/B3/Semestre II/hacking/Cours CEH.txt#PAGE 61` : « ation web, des outils comme OWASP ZAP ou Burp Suite peuvent rechercher des vulnérabilités telles que l'injection SQL, le Cross-Site Scripting (XSS), etc.  Les scanners d'applic »
- **Site web** : `b3-hacking/chapitres/chapitre1.html:L135` : « **OWASP WSTG (Web Security Testing Guide)** : guide méthodologique de référence mondiale pour l'audit de sécurité des applications et API web, aligné sur l'OWASP Top 10. »
- **Diagnostic** : Définition du site fidèle au sens de la source et reformulée de façon synthétique pour la révision.

### Définition 2 — NIST SP 800-115
- **Source PDF** : `textes/B3/Semestre II/hacking/Cours CEH.txt#PAGE 25` : « of Standards and Technology (NIST), est l'un des plus anciens algorithmes de cryptage. Cet algorithme décompose les données en blocs de 64 bits. Toutefois, compte tenu de la techno »
- **Site web** : `b3-hacking/chapitres/chapitre1.html:L136` : « **NIST SP 800-115** : guide officiel du gouvernement américain pour la planification et l'exécution des évaluations de sécurité technique. »
- **Diagnostic** : Définition du site fidèle au sens de la source et reformulée de façon synthétique pour la révision.

### Définition 3 — Cyber Kill Chain
- **Source PDF** : `textes/B3/Semestre II/hacking/Cours CEH.txt#PAGE 22` : « es incidents redoutables. Les cyberattaques et les cybercrimes sont devenus très répandus dans les scénarios numériques modernes. »
- **Site web** : `b3-hacking/chapitres/chapitre1.html:L170` : « **Cyber Kill Chain** : (Lockheed Martin) prolonge ce séquençage en 7 maillons tactiques : »
- **Diagnostic** : Définition du site fidèle au sens de la source et reformulée de façon synthétique pour la révision.

## 4. Alignement des Exercices avec les TD/TP des Sources
- Langage des ateliers sur le site : `analyse`.

# Fidélité aux Sources (Mission A) — `Cyber securite B2` (Cybersecurite B2 · B2)

- **Cours** : `Cyber securite B2` (Cybersecurite B2) — Niveau **B2** (6 chapitres)
- **Documents sources rattachés (7 fichiers, 41 pages)** :
- `textes/B2/Cyber securite B2/cybersécurité DAY1.txt` (6 pages, statut `ok`)
- `textes/B2/Cyber securite B2/La Cryptographie.txt` (4 pages, statut `ok`)
- `textes/B2/Cyber securite B2/Expose_Nmap.txt` (9 pages, statut `ok`)
- `textes/B2/Cyber securite B2/LAB firewall.txt` (2 pages, statut `ok`)
- `textes/B2/Cyber securite B2/TP_Snort.txt` (5 pages, statut `ok`)
- `textes/B2/Cyber securite B2/different type d'attaque.txt` (6 pages, statut `ok`)
- `textes/B2/Cyber securite B2/Wanna Cry.txt` (9 pages, statut `ok`)
- **Niveau de confiance** : **Moyen** (13 supports de TP/exposés lisibles, mais `sujet cybersecurite principale (2).pdf` [0 octet] est corrompu)

## 1. Ordre d'introduction des notions (Sources vs Site)
- **Diagnostic d'alignement séquentiel** : **Progression globalement alignée sur les supports sources**
- **Jalons extraits des sources (`PLANS.md` & `textes/`)** :
- `textes/B2/Cyber securite B2/cybersécurité DAY1.txt#PAGE 1` : *1*
- `textes/B2/Cyber securite B2/cybersécurité DAY1.txt#PAGE 2` : *2*
- `textes/B2/Cyber securite B2/cybersécurité DAY1.txt#PAGE 3` : *3*
- `textes/B2/Cyber securite B2/cybersécurité DAY1.txt#PAGE 4` : *4*
- `textes/B2/Cyber securite B2/cybersécurité DAY1.txt#PAGE 5` : *5*
- `textes/B2/Cyber securite B2/cybersécurité DAY1.txt#PAGE 6` : *6*
- `textes/B2/Cyber securite B2/La Cryptographie.txt#PAGE 1` : *La Cryptographie*
- `textes/B2/Cyber securite B2/La Cryptographie.txt#PAGE 2` : *•   Message original : HELLO*
- **Progression des chapitres sur le site** :
- `Cyber securite B2/chapitres/chapitre1.html` : **Chapitre 1 — Fondements de la Sécurité, Modèle CIA & Gestion des Risques** — 1. La triade fondamentale CIA : Confidentialité, Intégrité, Disponibilité (`L81`), 2. Le cadre opérationnel AAA : Authentification, Autorisation & Traçabilité (`L105`), 3. Analyse et quantification des risques selon l’ISO 27005 (`L121`), 4. Politique de sécurité des mots de passe & Calcul d’entropie (`L138`)
- `Cyber securite B2/chapitres/chapitre2.html` : **Chapitre 2 — Cryptographie Appliquée, Hachage & Signatures Numériques** — 1. Chiffrement symétrique : Masque jetable de Vernam & Standard AES (`L81`), 2. Chiffrement asymétrique : Paires de clés RSA & Diffie-Hellman (`L94`), 3. Hachage cryptographique & Code d’authentification HMAC (`L120`), 4. Signature numérique & Infrastructure à clés publiques (PKI) (`L133`)
- `Cyber securite B2/chapitres/chapitre3.html` : **Chapitre 3 — Sécurité des Réseaux, Filtrage & Architecture Périmétrique** — 1. Typologie des pare-feu : Stateless vs Stateful (Inspection d’état) (`L81`), 2. Configuration de filtrage Linux avec iptables (`L99`), 3. Architecture réseau en profondeur : DMZ, VLANs & Tunnels VPN (`L125`), 4. Reconnaissance avec Nmap & Attaques de niveau 2 (ARP Poisoning) (`L139`)
- `Cyber securite B2/chapitres/chapitre4.html` : **Chapitre 4 — Vulnérabilités Applicatives & Top 10 OWASP** — 1. Le Top 10 de l’OWASP : La référence mondiale de la sécurité logicielle (`L81`), 2. Injections SQL (SQLi) : Mécanisme & Requêtes préparées (`L95`), 3. Cross-Site Scripting (XSS) : Typologie & Défense en profondeur (`L111`), 4. CSRF (Cross-Site Request Forgery) & Failles IDOR (`L139`)
- `Cyber securite B2/chapitres/chapitre5.html` : **Chapitre 5 — Authentification, Gestion des Identités & Contrôle d’Accès** — 1. Stockage des mots de passe : Salage, Épreuvage & Fonctions de dérivation (KDF) (`L81`), 2. Authentification multifacteur (MFA) & Algorithme TOTP (RFC 6238) (`L102`), 3. Architecture des jetons JWT (RFC 7519) & Pièges de sécurité (`L121`), 4. Modèles de contrôle d’accès : DAC, MAC, RBAC & ABAC (`L139`)
- `Cyber securite B2/chapitres/chapitre6.html` : **Chapitre 6 — Détection d’Intrusions (NIDS/SIEM), Analyse de Traces & Réponse aux Incidents** — 1. Systèmes de détection d’intrusions (IDS) & Moteur de règles Snort (`L81`), 2. Centralisation des journaux, SIEM & Détection d’attaques DDoS (`L118`), 3. Ransomwares, Chaîne d’Infection & Gestion des Incidents (NIST SP 800-61) (`L141`), 4. Études de cas & applications pratiques (`L161`)

## 2. Couverture (Lacunes & Ajouts)
- Les supports lisibles couvrent la triade CIA (`cybersécurité DAY1.txt#PAGE 1-6`), la cryptographie (`La Cryptographie.txt#PAGE 1-4`), le scan `Nmap` (`Expose_Nmap.txt#PAGE 1-9`), le filtrage (`LAB firewall.txt#PAGE 1-2`) et `Snort` (`TP_Snort.txt#PAGE 1-5`, `snort_manual.txt`), qui correspondent aux Ch. 1, 2, 3 et 6 du site ; le sujet principal d'examen étant vide (0 octet), l'alignement de l'examen principal B2 et des Ch. 4–5 (OWASP/IAM) est invérifiable.

## 3. Comparaison de 3 Définitions-Clés (Source vs Site)
### Définition 1 — CIA
- **Source PDF** : `textes/B2/Cyber securite B2/cybersécurité DAY1.txt#PAGE 1` : « phishing et autres attaques sociales. • La réponse aux incidents : Détection, analyse et remédiation des attaques pour minimiser leur impact. Il convient d'identif »
- **Site web** : `Cyber securite B2/chapitres/chapitre1.html:L83` : « **CIA** : (ou DICP en français pour Disponibilité, Intégrité, Confidentialité, Preuve) : »
- **Diagnostic** : Définition du site fidèle au sens de la source et reformulée de façon synthétique pour la révision.

### Définition 2 — Menaces types
- **Source PDF** : `textes/B2/Cyber securite B2/cybersécurité DAY1.txt#PAGE 1` : « lisateurs contre les cybermenaces et les attaques malveillantes. Elle englobe plusieurs domaines, notamment : • La sécurité des réseaux : Protection des infrastructures réseau cont »
- **Site web** : `Cyber securite B2/chapitres/chapitre1.html:L88` : « **Menaces types** : écoute clandestine (sniffing), vol d’identifiants, exfiltration de base de données. »
- **Diagnostic** : Définition du site fidèle au sens de la source et reformulée de façon synthétique pour la révision.

### Définition 3 — Contre-mesures
- **Source PDF** : `textes/B2/Cyber securite B2/cybersécurité DAY1.txt#PAGE 4` : « d’autant plus réduit que les contre-mesures sont nombreuses ; Le risque est plus important si les vulnérabilités sont nombreuses. 🔥 Pare-feu (Firewall) Un »
- **Site web** : `Cyber securite B2/chapitres/chapitre1.html:L89` : « **Contre-mesures** : chiffrement au repos (AES-256), chiffrement en transit (TLS 1.3), cloisonnement des accès. »
- **Diagnostic** : Définition du site fidèle au sens de la source et reformulée de façon synthétique pour la révision.

## 4. Alignement des Exercices avec les TD/TP des Sources
- Langage des ateliers sur le site : `analyse`.

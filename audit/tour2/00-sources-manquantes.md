# 00 — Inventaire des Sources Manquantes, PDF Corrompus, Scans OCR et Corrections d'Index (`00-sources-manquantes.md`)

## 1. Les 3 PDF Corrompus dans le Dépôt (Irrécupérables — Règle 6)

Conformément à la règle 6 (*« Aucune invention de contenu source. Les PDF corrompus et les cours sans PDF sont des sources manquantes »*), voici exactement ce qui ne peut pas être vérifié sur chacun des 3 cours affectés :

| Fichier PDF corrompu dans `cours-pdf` | Taille / État | Cours du site impacté | Chapitres / Sections du site dont la fidélité source ne peut pas être vérifiée |
| :--- | :--- | :--- | :--- |
| `B2/Cyber securite B2/sujet cybersecurite principale (2).pdf` | `0 octet` (vide) | `Cyber securite B2` (B2) | **Sujet d'examen principal B2 de Cybersécurité** : impossible de vérifier l'alignement constructif (`D9`) des examens blancs (`Cyber securite B2/chapitres/examens.html`) ni des Chapitres 4 (OWASP Top 10) et 5 (IAM/RBAC/JWT) avec l'épreuve principale officielle de B2. Seuls les supports partiels (`cybersécurité DAY1.txt`, `La Cryptographie.txt`, `Expose_Nmap.txt`, `LAB firewall.txt`, `TP_Snort.txt`, `Wanna Cry.txt`) sont vérifiables. |
| `B3/SEMESTRE I/firwall/Support de cours Module 2 .pdf` | `4 065 380 octets` (rempli de zéros `0x00`) | `b3-firewall` (B3) | **Module 2 du support officiel Firewall B3** (situé entre le Module 1 [Architecture & Filtrage stateless/stateful, 9 p.] et le Module 3 [Politiques avancées, VPN & Audit, 8 p.]) : impossible de vérifier la fidélité aux sources des **Chapitres 3 et 4 de `b3-firewall`** (`chapitre3.html` : *NAT, PAT et redirection de ports* ; `chapitre4.html` : *Inspection approfondie DPI, proxy applicatif et WAF*). |
| `B2/administration machine virtuel/TP_Module6.pdf` | `4 661 808 octets` (tronqué / rempli de zéros) | `admin-vm` (B2) | **Travaux Pratiques du Module 6 (`Chapitre 6 — Administration avancée, surveillance et dépannage`)** : si le support théorique `Module-6_Administration-des-Machines-Virtuelles_Détaillé.txt` (24 p.) est bien lisible, les exercices pratiques et manipulations de TP du Module 6 (`admin-vm/chapitres/chapitre6.html:L140-L310`) ne peuvent pas être confrontés au TP source officiel. |

## 2. Les 5 Documents Scannés (`statut: ocr`) — Ouverts et Vérifiés dans `scans_originaux/`

Tous les originaux PDF de `audit/tour2/corpus/scans_originaux/` ont été convertis en images et ouverts visuellement avant toute citation :

| Fichier dans `scans_originaux/` | Pages | Cours rattaché | Constat après ouverture visuelle de l'original | Niveau de confiance |
| :--- | :---: | :--- | :--- | :---: |
| `Examens_et_Annales__Epreuves_Groupées.pdf` | 21 p. | `epreuves` (et cours B2) | Photographies de sujets d'examen B2 (Session Février 2025). Les pages 7, 9, 10 et 12 contiennent le sujet original *Administration des Machines Virtuelles* (M. BOUKLINAM) évaluant `vMotion` (p. 7, p. 9 Q6, p. 10 Q5) et `thin provisioning` (p. 9 Q7) ; les pages 11, 13–15 contiennent le sujet *Programmation C#* (Mme AGBEGNAN, 3h de code POO). Ce scan recoupe intégralement le document propre `Recueil_Epreuves_2024_2025.txt` (p. 10–15). | **Élevé** (confirmé sur scan + texte propre) |
| `B1__CLUB DE ROBOTIQUE__ARDUINO_Exercices d'Applications.pdf` | 20 p. | `b1-robotique` (B1) | Recueil *ETC School — Exercices d'application Programmation Arduino* (12 avril 2022) contenant 7 exercices corrigés en C/C++ Arduino (`setup()`, `loop()`, `pinMode`, `digitalWrite`, `analogRead`, `Serial.begin`, feux tricolores, capteur ultrason). Lisible sur l'original. | **Élevé** (sur l'original PDF) |
| `B1__PYTHON__TP 1 partieA-AGBENOWOSSI parfait.pdf` | 1 p. | `b1-python` (B1) | **Coquille / Fichier quasi-vide** : l'inspection visuelle de la page unique montre uniquement la chaîne `Python 3.14.2` en haut à gauche sur une page blanche (rendu d'élève vide). Inexploitable comme source de TP. | **Nul** (page blanche) |
| `B3__Semestre II__Telephonie_voix_IP__Reseaux Locaux.pdf` | 44 p. | Classé sous `Telephonie_voix_IP` | Diaporama *Réseaux locaux et équipements actifs* (Abdelkader ALEM, Université Ibn Khaldoun de Tiaret, 1re année Master). Traite des réseaux locaux (Ethernet, CSMA/CD, répéteur, pont, commutateur, routeur), **aucun contenu sur la VoIP/ToIP/SIP**. | **Moyen** (hors-sujet pour `b3-voip`, pertinent pour LAN) |
| `B3__Semestre II__Telephonie_voix_IP__Topologie réseaux.pdf` | 15 p. | Classé sous `Telephonie_voix_IP` | Diaporama *Typologie des réseaux informatiques* (LIHAN LI NDJOM Hans). Cours d'initiation B1 (PAN/LAN/MAN/WAN, topologies bus/étoile/anneau), **aucun contenu sur la VoIP**. | **Moyen** (hors-sujet pour `b3-voip`, niveau B1) |

## 3. Corrections de la Correspondance `Dossier → Cours` de `INDEX.md`

L'examen croisé de `manifest.json` (fusion par MD5) et du contenu interne des fichiers de `textes/` révèle **5 erreurs de rattachement** dans la proposition de `INDEX.md` :

1. **`b1-cyber` n'est PAS un cours sans PDF (faux négatif de déduplication dans `INDEX.md`)** :
   - `INDEX.md` liste `b1-cyber` parmi les 19 cours sans PDF. Or, dans `manifest.json`, le fichier `B1/Cyber Sécurité/Introduction à la Cyber Sécurité B1 IT 2024 - 2025 (1).pdf` (203 pages, MD5 `158ead0ac7f7bfa98860c02582be27af`) a été fusionné comme doublon exact de `textes/B1/Prog WEB/Introduction à la Cyber Sécurité B1 IT 2024 - 2025.txt` (203 pages, statut `ok`).
   - **Correction appliquée** : `textes/B1/Prog WEB/Introduction à la Cyber Sécurité B1 IT 2024 - 2025.txt` est détaché de `b1-prog-web` et rattaché à **`b1-cyber`**, ce qui permet de réaliser la Mission A complète sur `b1-cyber` avec un niveau de confiance **Élevé** !
2. **`textes/B1/VB Excel/support1.txt` (46 p.) appartient à `b1-vb-excel` et NON à `b1-bureautique`** :
   - `INDEX.md` rattache `B1/VB Excel/support1.txt` à `b1-bureautique`. Or ce document est intitulé *« Programmation VBA (Visual Basic for Applications) — Dr. TCHAZINO Tchamiè »* (`Option Explicit`, `Sub`, `Function`, `MsgBox`, `Cells`, formulaires `UserForm`). Il constitue la source officielle du cours **`b1-vb-excel`** (qui est resté à l'état d'ébauche vide de 102 mots sur le site !).
   - Inversement, le cours **`b1-bureautique`** (qui enseigne Word aux Ch. 1–2, les formules Excel sans VBA aux Ch. 3–5 et PowerPoint au Ch. 6, et cite en bas de page des fichiers `.docx` absents de l'archive PDF) **ne dispose d'aucun PDF de Word/Excel/PowerPoint dans `corpus-cours-revi.zip`**.
3. **`textes/B1/General/tutoriel_projet.txt` (16 p.) est la vraie source de `b1-projet`, tandis que `textes/B1/Proje/CDP_COURS_PROJET TUTEURE 2 - CONCEP APP MONITORING .txt` (26 p.) est un doublon de `b3-supervision`** :
   - `INDEX.md` rattachait à `b1-projet` le fichier `B1/Proje/CDP_COURS_PROJET TUTEURE 2 - CONCEP APP MONITORING .txt`, dont l'en-tête interne (`#PAGE 2`) porte `Titre du document : B3-IT_ PROJTUTON2` (cours de Supervision Nagios/Zabbix/Prometheus d'E. Ahouloumi, identique à `B3/Semestre II/Supervision/UPDATE_CDP_COURS_Supervision système et réseaux.txt`).
   - La véritable source de `b1-projet` est `textes/B1/General/tutoriel_projet.txt` (*« TUTORIEL PROJET TUTORÉ : Application de Gestion de Stock — Python, Tkinter & PostgreSQL — LAWSON Latevi Sena, Janvier 2026 »*, 16 p.).
4. **`textes/B3/SEMESTRE I/Linux/Support_Elaboration Document Technique.txt` (24 p.)** :
   - Bien que rangé dans le sous-dossier `B3/SEMESTRE I/Linux/`, ce document est le support officiel de **`b3-document-technique`** (correctement identifié par `INDEX.md`), ce qui confirme que `b3-linux` n'a aucun PDF source.
5. **`textes/B3/SEMESTRE I/Algorithmique/` mélange le cours `b3-algo` (`ALGO_B3.txt`, 100 p.) et 8 fiches de TD/TP de niveau `b1-algo` en pseudo-code/Pascal** (`Algorithme pour calculer le prix TTC du client.txt`, `EXERCICE_si.txt`, `EXERCICE_ssi.txt`, `Exo_Répéter.txt`, `TP.txt`, `exo_FUN_proc.txt`, `proc_funct.txt`, `tablo_proced.txt`).

## 4. Les 19 Cours Actifs du Site Sans Aucun PDF Source (Mission A Impossible)

Après correction du rattachement de `b1-cyber` (qui possède son PDF de 203 pages) et de `b1-bureautique` (dont les supports Word/Excel/PowerPoint ne figurent pas dans l'archive PDF), exactement **19 cours actifs sur 68** n'ont aucun PDF source pertinent dans `corpus-cours-revi.zip` :

1. **`b1-bureautique`** (B1 — Word, Excel, PowerPoint : aucun PDF de bureautique dans l'archive ; `support1.txt` est le cours de VBA pour `b1-vb-excel`)
2. **`b1-virtualisation`** (B1 — cite « Le serveur fainéant », absent de l'archive PDF B1)
3. **`linux`** (B2 — Administration Linux)
4. **`rd_java`** (B2 — Programmation Orientée Objet Java)
5. **`react`** (B2 — React)
6. **`api-rest-flask`** (B2 — API REST avec Flask)
7. **`erp-si`** (B2 — ERP & Systèmes d'Information)
8. **`ingenierie-besoin`** (B2 — Ingénierie du besoin)
9. **`masterclass-apprendre`** (B2 — Masterclass Apprendre à apprendre)
10. **`sql`** (B2 — SQL intermédiaire)
11. **`csharp`** (B2 — Programmation C# ; seule l'épreuve d'examen existe dans `Recueil_Epreuves_2024_2025.txt#PAGE 13-14`)
12. **`ccna`** (B2 — CCNA Réseau B2 ; seule l'épreuve d'examen existe dans `Recueil_Epreuves_2024_2025.txt#PAGE 7-9`)
13. **`uiux`** (B2 — UI/UX Design)
14. **`docker`** (B2 — Docker & Conteneurisation)
15. **`infographie`** (B2 — Infographie 2D/3D)
16. **`b3-devops`** (B3 — DevOps & CI/CD)
17. **`b3-github`** (B3 — Git & GitHub Avancé)
18. **`b3-linux`** (B3 — Linux Avancé ; le dossier `B3/SEMESTRE I/Linux/` contient le support de `b3-document-technique`)
19. **`b3-pfsense`** (B3 — pfSense & Routage)

Pour ces 19 cours, conformément à la section 2 du prompt, **la Mission A (fidélité aux PDF sources) est impossible** : seule leur cohérence interne est vérifiée et documentée dans `audit/tour2/fidelite/<cours>.md`.

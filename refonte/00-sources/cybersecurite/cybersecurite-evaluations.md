# Fiche Source : Cybersécurité et Défense des Systèmes B2

- **Fichiers sources** :
  - `Cyber securite B2/Compréhension du cours.pdf` (3 pages)
  - `Cyber securite B2/LAB firewall.pdf` (1 page)
  - `Cyber securite B2/TP_Snort.pdf` (4 pages, TP du cours 8INF857)
  - `Cyber securite B2/Wanna Cry.pdf` (9 pages, étude de cas ransomware)
  - `Cyber securite B2/Expose_Nmap.pdf` (9 pages, présentation d'audit réseau)
  - `Cyber securite B2/sujet cybersecurite principale (2).pdf` (**Fichier vide, 0 octet — anomalie signalée**)
- **Établissement** : Collège de Paris Supérieur
- **Niveau / Classe** : Bachelor 2 (B2 IT)
- **Année Académique** : 2024-2025
- **Chapitres couverts** : Menaces (Ransomware, Phishing, DDoS), Détection d'intrusion (Snort), Filtrage réseau (pfSense), Audit et reconnaissance (Nmap)

## Liste des Exercices et Notions Testées avec Pages

### 1. Analyse des Menaces et Ingénierie Sociale (`Compréhension du cours.pdf:1-3`)
- **Partie 1 : Définitions et typologie (p.1)** :
  - Définition exacte de *Malware*, *Phishing* (hameçonnage), *DDoS* (déni de service distribué).
  - Différence fondamentale entre un virus (qui nécessite un programme hôte pour se propager) et un ransomware (qui chiffre les données pour extorquer une rançon).
  - Facteurs d'efficacité de l'ingénierie sociale (biais d'autorité, urgence feinte, crédulité humaine).
  - Conséquences d'un DDoS pour une entreprise (perte de chiffre d'affaires, indisponibilité de service, atteinte réputationnelle).
- **Partie 2 : Analyse technique d'emails d'hameçonnage (p.2-3)** :
  - Analyse d'un incident de sécurité : compromission de compte bancaire professionnel suite au clic sur un lien frauduleux.
  - Examen comparatif de deux emails : analyse des en-têtes SMTP (champ `From` usurpé vs champ `Return-Path` ou `Received`), analyse du lien hypertexte sous-jacent (nom de domaine typo-squatté).

### 2. Détection d'Intrusion NIDS Snort (`TP_Snort.pdf:1-4`)
- **Architecture et modes de fonctionnement (p.1-2)** :
  - Snort basé sur la bibliothèque de capture `libpcap`.
  - 3 modes d'exécution : Renifleur (*sniffer*), Enregistreur (*packet logger*), Système de Détection d'Intrusion (*NIDS*).
- **Syntaxe des règles Snort (p.3)** :
  - En-tête de règle : `Action Protocole IP_Source Port_Source Direction IP_Dest Port_Dest`
  - Corps d'options entre parenthèses : `(msg: "..."; content: "..."; sid: ...; rev: ...;)`
  - Exemple étudié :
    ```snort
    alert tcp $HOME_NET any -> any any (content: "google.com"; msg: "Alerte, nous avons un accès au site google.com"; sid: 1000001; rev: 1;)
    ```
- **Lancement et diagnostic en ligne de commande (p.4)** :
  - Commande d'exécution : `snort -u snort -c /etc/snort/snort.conf -A console`

### 3. Filtrage Réseau et Pare-feu pfSense (`LAB firewall.pdf:1`)
- **Scénario d'entreprise (p.1)** :
  - Protection d'un réseau interne PME contre les accès non autorisés et attaques externes.
  - Définition de règles de pare-feu avec état (*stateful*) :
    - Autoriser le trafic sortant HTTP (port 80) et HTTPS (port 443) depuis le LAN.
    - Bloquer les requêtes ICMP (ping) entrantes depuis le WAN.
    - Bloquer tous les flux entrants non explicitement sollicités (politique par défaut *Drop*).

### 4. Étude de Cas : Ransomware WannaCry (`Wanna Cry.pdf:1-9`)
- Vecteur d'infection initial et propagation latérale via l'exploit EternalBlue ciblant la vulnérabilité SMBv1 (port 445/TCP) sous Windows.
- Chiffrement asymétrique/symétrique hybride (clé AES chiffrée avec la clé publique RSA des attaquants).
- Contre-mesures : désactivation de SMBv1, application du correctif MS17-010, segmentation réseau et sauvegardes isolées (*air-gapped*).

### 5. Reconnaissance et Cartographie Nmap (`Expose_Nmap.pdf:1-9`)
- Options de balayage réseau fondamentales :
  - `-sS` : TCP SYN scan furtif (*half-open*).
  - `-sV` : Détection des versions de services en écoute.
  - `-O` : Détection d'empreinte TCP/IP du système d'exploitation.
  - `-p-` ou `-p 1-65535` : Analyse de l'intégralité des ports TCP.
  - `-T4` : Profil temporel agressif pour accélérer l'analyse.
  - `--script vuln` : Exécution du moteur de scripts Nmap (NSE) pour la recherche automatisée de failles connues.

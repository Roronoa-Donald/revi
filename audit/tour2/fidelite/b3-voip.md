# Fidélité aux Sources (Mission A) — `b3-voip` (Téléphonie VoIP · B3)

- **Cours** : `b3-voip` (Téléphonie VoIP) — Niveau **B3** (6 chapitres)
- **Documents sources rattachés (1 fichiers, 16 pages)** :
- `textes/B3/Semestre II/Telephonie_voix_IP/Pratique ToIP VoIP.txt` (16 pages, statut `ok`)
- **Niveau de confiance** : **Faible** (Seul `Pratique ToIP VoIP.txt` [16 p.] traite de VoIP/Asterisk ; les 2 autres PDF du dossier sont des cours LAN hors-sujet)

## 1. Ordre d'introduction des notions (Sources vs Site)
- **Diagnostic d'alignement séquentiel** : **Progression globalement alignée sur les supports sources**
- **Jalons extraits des sources (`PLANS.md` & `textes/`)** :
- `textes/B3/Semestre II/Telephonie_voix_IP/Pratique ToIP VoIP.txt#PAGE 1` : *1*
- `textes/B3/Semestre II/Telephonie_voix_IP/Pratique ToIP VoIP.txt#PAGE 3` : *3*
- `textes/B3/Semestre II/Telephonie_voix_IP/Pratique ToIP VoIP.txt#PAGE 5` : *5*
- `textes/B3/Semestre II/Telephonie_voix_IP/Pratique ToIP VoIP.txt#PAGE 7` : *7*
- `textes/B3/Semestre II/Telephonie_voix_IP/Pratique ToIP VoIP.txt#PAGE 9` : *9*
- `textes/B3/Semestre II/Telephonie_voix_IP/Pratique ToIP VoIP.txt#PAGE 11` : *11*
- **Progression des chapitres sur le site** :
- `b3-voip/chapitres/chapitre1.html` : **Chapitre 1 — Fondamentaux de la ToIP & Numérisation Vocale** — 1. De la Téléphonie Traditionnelle (RTC/RNIS) à la Téléphonie sur IP (ToIP) (`L80`), 2. Numérisation Vocale : Échantillonnage de Nyquist & Quantification G.711 (`L105`), 3. Codecs Vocaux, Calcul de Bande Passante Réseau & Modèle E (Score R & MOS) (`L121`), 4. Études de cas & applications pratiques (`L151`)
- `b3-voip/chapitres/chapitre2.html` : **Chapitre 2 — Protocoles de Signalisation & Médias (SIP, SDP, RTP)** — 1. Le Protocole SIP (Session Initiation Protocol, RFC 3261) (`L80`), 2. Négociation de Session avec SDP (Session Description Protocol, RFC 4566) (`L119`), 3. Transport Temps Réel avec RTP & RTCP (RFC 3550) (`L143`), 4. Études de cas & applications pratiques (`L165`)
- `b3-voip/chapitres/chapitre3.html` : **Chapitre 3 — Architecture & Déploiement d'un IPBX Asterisk** — 1. Architecture Interne & Installation du Serveur Asterisk (`L80`), 2. Configuration des Postes & Comptes SIP (sip.conf & users.conf) (`L115`), 3. Messagerie Vocale (voicemail.conf) & Configuration des Softphones Clients (`L142`), 4. Études de cas & applications pratiques (`L168`)
- `b3-voip/chapitres/chapitre4.html` : **Chapitre 4 — Programmation du Plan d'Appel (Dialplan & SVI/IVR)** — 1. Syntaxe & Structure du Dialplan Asterisk (extensions.conf) (`L80`), 2. Masques de Numérotation (Pattern Matching) & Variables de Canaux (`L111`), 3. Conception de Serveurs Vocaux Interactifs (SVI / IVR) & Messagerie (`L140`), 4. Études de cas & applications pratiques (`L174`)
- `b3-voip/chapitres/chapitre5.html` : **Chapitre 5 — Qualité de Service (QoS), Dimensionnement & Réseau** — 1. Dimensionnement des Trunks Téléphoniques & Loi d'Erlang B (`L80`), 2. Mécanismes de Qualité de Service (QoS) & Ségrégation Réseau (`L94`), 3. Problématique du NAT & Mécanismes de Traversée (STUN, TURN, ICE) (`L121`), 4. Études de cas & applications pratiques (`L139`)
- `b3-voip/chapitres/chapitre6.html` : **Chapitre 6 — Fonctions Avancées, Trunks Inter-Sites & Sécurité ToIP** — 1. Centres de Contacts & Files d'Attente ACD (queues.conf) (`L80`), 2. Interconnexion Multi-Sites : Trunks SIP & IAX2 et Routage LCR (`L105`), 3. Sécurité & Durcissement ToIP : TLS, SRTP & Défense Active Fail2ban (`L131`), 4. Études de cas & applications pratiques (`L152`)

## 2. Couverture (Lacunes & Ajouts)
- Le support `Pratique ToIP VoIP.txt#PAGE 1-16` est un guide de TP d'installation d'Asterisk / FreePBX / Zoiper (couvert aux Ch. 3 et 4 du site) ; les Ch. 1 (Codecs G.711/G.729, PCM, MOS), Ch. 2 (SIP/SDP), Ch. 5 (QoS VoIP) et Ch. 6 (Sécurité SIP / Toll Fraud) sont des ajouts théoriques du site sans PDF source dans l'archive.

## 3. Comparaison de 3 Définitions-Clés (Source vs Site)
### Définition 1 — Réseau Téléphonique Commuté (RTC / PSTN)
- **Source PDF** : `textes/B3/Semestre II/Telephonie_voix_IP/Pratique ToIP VoIP.txt#PAGE 1` : « lève Ingénieur en Systèmes et Réseaux E-mail : assoum1024@gmail.com »
- **Site web** : `b3-voip/chapitres/chapitre1.html:L82` : « **Réseau Téléphonique Commuté (RTC / PSTN)** : , fondé sur la commutation de circuits physiques ou temporels dédiés (lignes analogiques cuivre et liaisons numériques RNIS T0/T2 à 64 kbps). Dans cette approch »
- **Diagnostic** : Définition du site fidèle au sens de la source et reformulée de façon synthétique pour la révision.

### Définition 2 — Voix sur IP (VoIP)
- **Source PDF** : `textes/B3/Semestre II/Telephonie_voix_IP/Pratique ToIP VoIP.txt#PAGE 2` : « est ce qui nous intéresse, la voix sur IP. La VoIP sur Asterisk passe entre autre par la prise en charge d’un protocole standard, ouvert et très largement utilisé, le »
- **Site web** : `b3-voip/chapitres/chapitre1.html:L83` : « **Voix sur IP (VoIP)** : matérialisent la convergence numérique : le signal vocal n'est plus véhiculé sur une boucle locale dédiée mais découpé en paquets de données numériques routés s »
- **Diagnostic** : Définition du site fidèle au sens de la source et reformulée de façon synthétique pour la révision.

### Définition 3 — le codage
- **Source PDF** : `textes/B3/Semestre II/Telephonie_voix_IP/Pratique ToIP VoIP.txt#PAGE 1` : « MISE EN PLACE DE LA TELEPHONIE IP AVEC ASTERISK MISE EN PLACE DE LA TELEPHONIE IP AVEC ASTERISK M. Pape Moussa SONKO, Elève »
- **Site web** : `b3-voip/chapitres/chapitre1.html:L107` : « **le codage** : (PCM - Pulse Code Modulation). »
- **Diagnostic** : Définition du site fidèle au sens de la source et reformulée de façon synthétique pour la révision.

## 4. Alignement des Exercices avec les TD/TP des Sources
- Langage des ateliers sur le site : `analyse`.

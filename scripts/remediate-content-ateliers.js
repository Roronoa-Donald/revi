#!/usr/bin/env node
/**
 * scripts/remediate-content-ateliers.js
 *
 * Remédiation méthodique du contenu de cours et des ateliers pour tous les cours non-informatiques :
 * 1. Conversion des ateliers B2/B3 vers data-language="analyse" et starter neutre
 * 2. Conversion des ateliers B1 vers data-language="analyse" et starter neutre
 * 3. Élimination des scripts Bash résiduels dans exercices(course) des 12 cours B1
 * 4. Élimination du Python résiduel dans b1-robotique, b3-cryptographie, erp-si
 */
'use strict';

const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');

// -------------------------------------------------------------
// PART 1 : Remédiation des 20 fichiers accueil.js B2/B3
// -------------------------------------------------------------
const B2_B3_ACCUEIL_FILES = [
  'server/content/assembleur/pages/accueil.js',
  'server/content/cyber-securite-b2/pages/accueil.js',
  'server/content/ccna/pages/accueil.js',
  'server/content/docker/pages/accueil.js',
  'server/content/b3-cloud-computing/pages/accueil.js',
  'server/content/b3-devops/pages/accueil.js',
  'server/content/b3-firewall/pages/accueil.js',
  'server/content/b3-github/pages/accueil.js',
  'server/content/b3-linux/pages/accueil.js',
  'server/content/b3-pfsense/pages/accueil.js',
  'server/content/b3-reseau-lan/pages/accueil.js',
  'server/content/b3-windows-server/pages/accueil.js',
  'server/content/b3-cloud-azure/pages/accueil.js',
  'server/content/b3-cryptographie/pages/accueil.js',
  'server/content/b3-google-cloud/pages/accueil.js',
  'server/content/b3-hacking/pages/accueil.js',
  'server/content/b3-cloud-aws/pages/accueil.js',
  'server/content/b3-supervision/pages/accueil.js',
  'server/content/b3-voip/pages/accueil.js',
  'server/content/b3-virtualisation/pages/accueil.js'
];

function remediateAccueilFiles() {
  console.log('=== PART 1 : Remédiation des ateliers B2 / B3 ===');

  for (const relPath of B2_B3_ACCUEIL_FILES) {
    const filePath = path.join(ROOT, relPath);
    if (!fs.existsSync(filePath)) {
      console.warn(`[WARN] Fichier absent : ${relPath}`);
      continue;
    }

    let content = fs.readFileSync(filePath, 'utf8');

    // 1. data-language="python" -> data-language="analyse"
    content = content.replace(/data-language="python"/g, 'data-language="analyse"');

    // 2. data-languages="1" ou attributs associés
    content = content.replace(/ic\('terminal'\)\s*\+\s*' Python 3'/g, "ic('book') + ' Étude de cas'");
    content = content.replace(/ic\('terminal'\)\s*\+\s*' Python'/g, "ic('book') + ' Étude de cas'");
    content = content.replace(/' Python 3'/g, "' Étude de cas'");

    // 3. Lab starter replacement
    content = content.replace(
      /<script type="text\/plain" data-lab-starter>[\s\S]*?<\/script>/g,
      '<script type="text/plain" data-lab-starter># Zone libre : rédigez vos grilles d\\\'analyse et cas d\\\'application.\\n[Cas 1 — Cas d\\\'application libre]\\n# Données :\\nA_COMPLETER\\n</script>'
    );

    // 4. Sample labels
    content = content.replace(/<b>Entrée du programme<\/b>/g, "<b>Cas d'exemple</b>");
    content = content.replace(/<b>Sortie attendue<\/b>/g, "<b>Résolution attendue</b>");

    // 5. Termes Python dans les titres et descriptions
    content = content.replace(/Atelier de Code &amp; Bac à Sable/g, "Atelier d’analyse &amp; Études de cas");
    content = content.replace(/Atelier de code interactif/g, "Atelier d’analyse interactif");
    content = content.replace(/Atelier de code/g, "Atelier d’analyse");
    content = content.replace(/Atelier interactif &amp; Bac à sable/g, "Atelier d’analyse &amp; Bac à sable");
    content = content.replace(/en Python 3/g, "selon les grilles d’analyse");
    content = content.replace(/en Python/g, "par cas d’application");
    content = content.replace(/exécute votre code Python dans un bac à sable sécurisé/g, "permet de formaliser et vérifier vos grilles d\\'analyse");
    content = content.replace(/Bac à sable interactif en Python/g, "Espace d’expérimentation et d’analyse");

    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`[OK] Ateliers mis à jour : ${relPath}`);
  }
}

// -------------------------------------------------------------
// PART 2 : Remédiation des 6 ateliers B1 dans pages.js
// -------------------------------------------------------------
const B1_PAGES_FILES = [
  'server/content/b1-robotique/pages.js',
  'server/content/b1-cyber/pages.js',
  'server/content/b1-reseaux/pages.js',
  'server/content/b1-ccna1/pages.js',
  'server/content/b1-virtualisation/pages.js',
  'server/content/b1-projet/pages.js'
];

function remediateB1Ateliers() {
  console.log('\n=== PART 2 : Remédiation des ateliers B1 ===');

  for (const relPath of B1_PAGES_FILES) {
    const filePath = path.join(ROOT, relPath);
    if (!fs.existsSync(filePath)) {
      console.warn(`[WARN] Fichier absent : ${relPath}`);
      continue;
    }

    let content = fs.readFileSync(filePath, 'utf8');

    // Language
    content = content.replace(/data-language="shell"/g, 'data-language="analyse"');
    content = content.replace(/data-language="python"/g, 'data-language="analyse"');

    // Title & leads
    content = content.replace(/'  <h1>Atelier de scripts<\/h1>',/g, "'  <h1>Atelier d’analyse &amp; Bac à sable</h1>',");
    content = content.replace(
      /'  <p class="lead">Un éditeur dans la page, un vrai interpréteur Bash derrière[^']*',/g,
      "'  <p class=\"lead\">Un espace d’expérimentation pour tester vos grilles d’analyse et structurer vos cas d’étude méthodiques.</p>',"
    );
    content = content.replace(
      /'  <p class="lead">Un éditeur dans la page, un interpréteur Python derrière[^']*',/g,
      "'  <p class=\"lead\">Un espace d’expérimentation pour tester vos grilles d’analyse et structurer vos cas d’étude méthodiques.</p>',"
    );

    // Box instructions
    content = content.replace(
      /'      <li><strong>Exécuter<\/strong> fait tourner votre script Bash[^']*',/g,
      "'      <li><strong>Valider</strong> vérifie la conformité de vos réponses dans la grille d’analyse.</li>',"
    );
    content = content.replace(
      /'      <li><strong>Exécuter<\/strong> fait tourner votre script Python[^']*',/g,
      "'      <li><strong>Valider</strong> vérifie la conformité de vos réponses dans la grille d’analyse.</li>',"
    );
    content = content.replace(
      /'      <li><strong>Entrée du programme<\/strong> contient ce que <code>read<\/code> lira[^']*',/g,
      "'      <li><strong>Données du cas</strong> contient les paramètres soumis à l’étude.</li>',"
    );

    // Starter
    content = content.replace(
      /<script type="text\/plain" data-lab-starter>[\s\S]*?<\/script>/,
      `<script type="text/plain" data-lab-starter># Zone libre : appliquez la méthodologie du cours.\\n# Rédigez votre analyse sous forme de grille structurée.\\n\\n[Cas 1 — Cas d\\\'application libre]\\n# Données :\\nA_COMPLETER\\n</script>`
    );

    // Lab lang
    content = content.replace(/ic\('terminal'\)\s*\+\s*' Bash'/g, "ic('book') + ' Étude de cas'");
    content = content.replace(/ic\('terminal'\)\s*\+\s*' Python 3'/g, "ic('book') + ' Étude de cas'");
    content = content.replace(/ic\('terminal'\)\s*\+\s*' Python'/g, "ic('book') + ' Étude de cas'");

    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`[OK] Atelier B1 mis à jour : ${relPath}`);
  }
}

// -------------------------------------------------------------
// PART 3 : Remédiation des exercices B1 dans pages.js (12 cours)
// -------------------------------------------------------------
const B1_COURSES_EXERCICES = [
  {
    file: 'server/content/b1-droit/pages.js',
    solutions: {
      echauffement: [
        '1. Hiérarchie des règles : Règle impérative (ordre public) vs Prérogative individuelle (droit subjectif).',
        '2. Blocs de constitutionnalité : Bloc de constitutionnalité (Constitution 1958, DDHC 1789, Préambule 1946, Charte environnement 2004) > Bloc de conventionnalité (traités internationaux, CEDH) > Bloc de légalité (lois ordinaires, ordonnances) > Bloc réglementaire (décrets, arrêtés).',
        '3. Personnalité juridique : S\'acquiert à la naissance viable, s\'éteint au décès certain ou déclaré.',
        '4. Ordre juridictionnel : 1er degré (Tribunal judiciaire, CPH, Tribunal de commerce) -> 2nd degré (Cour d\'appel) -> Régulateur du droit (Cour de cassation / Conseil d\'État).'
      ],
      application: [
        '1. Droit réel vs personnel : Droit réel (pouvoir direct sur une chose : propriété, usufruit) ; Droit personnel (créance : exiger une prestation d\'un débiteur).',
        '2. Validité contractuelle (Art. 1128 C. civ.) : Consentement libre et éclairé, capacité des parties, contenu licite et certain.',
        '3. Responsabilité civile délictuelle (Art. 1240 C. civ.) : Fait générateur (faute), dommage direct et certain, lien de causalité direct.',
        '4. Hiérarchie des juridictions administratives : Tribunal administratif (1er ressort) -> Cour administrative d\'appel -> Conseil d\'État (cassation).'
      ],
      raisonnement: [
        '1. Syllogisme juridique : Majeure (règle de droit applicable) -> Mineure (qualification des faits de l\'espèce) -> Conclusion (application de la règle aux faits).',
        '2. Clause abusive : Dans un contrat d\'adhésion B2C, clause créant un déséquilibre significatif entre droits et obligations (réputée non écrite).',
        '3. Preuve numérique : L\'écrit électronique a la même force probante que l\'écrit papier si l\'auteur est identifiable et l\'intégrité garantie (Art. 1366 C. civ.).',
        '4. Force majeure : Événement imprévisible, irrésistible et extérieur empêchant l\'exécution d\'une obligation.'
      ]
    }
  },
  {
    file: 'server/content/b1-anglais/pages.js',
    solutions: {
      echauffement: [
        '1. Technical terminology : Hardware (physical equipment), Software (programs/applications), Firmware (embedded microcode).',
        '2. Networking acronyms : IP (Internet Protocol), DNS (Domain Name System), DHCP (Dynamic Host Configuration Protocol), LAN (Local Area Network).',
        '3. Professional email register : Formal greetings ("Dear Mr./Ms. [Name]"), courteous closing ("Best regards", "Sincerely").',
        '4. Irregular technical verbs : run/ran/run, build/built/built, send/sent/sent, write/wrote/written.'
      ],
      application: [
        '1. IT support ticket drafting : Subject line clarity, impact assessment (High/Medium/Low), reproducible steps, expected vs actual behavior.',
        '2. Describing system architecture : Frontend client -> API Gateway -> Backend microservices -> Relational database.',
        '3. Expressing cause and effect : "Due to server overload, latency increased", "Consequently, the failover mechanism triggered".',
        '4. Technical requirements specification : Using modal verbs ("The system must support TLS 1.3", "Users should be able to reset passwords").'
      ],
      raisonnement: [
        '1. Incident post-mortem report : Executive summary, timeline of events, root-cause analysis (RCA), corrective and preventive action items (CAPA).',
        '2. Technical documentation review : Clarity, conciseness, passive vs active voice, adherence to style guidelines.',
        '3. Cross-cultural communication : Direct vs indirect feedback, asynchronous collaboration across time zones.',
        '4. Job interview pitch : Elevator pitch (education, core technical stack, key achievements, motivation).'
      ]
    }
  },
  {
    file: 'server/content/b1-fr-pro/pages.js',
    solutions: {
      echauffement: [
        '1. Registres de langue : Familier ("bosser"), Courant ("travailler"), Soutenu ("exercer ses fonctions").',
        '2. Accords délicats : Participe passé avec être (accord sujet), avec avoir (accord COD antéposé uniquement).',
        '3. Ponctuation professionnelle : Le point-virgule sépare des propositions liées ; les deux-points introduisent une énumération ou une explication.',
        '4. Homophones fréquents : a/à, ce/se, ces/ses, c\'est/s\'est, ou/où, leur/leurs.'
      ],
      application: [
        '1. Structure d\'un compte-rendu : Contexte, participants, ordre du jour, décisions actées, plan d\'actions (qui fait quoi pour quand).',
        '2. Note de cadrage : Objet, contexte, objectifs stratégiques, périmètre (in/out), calendrier prévisionnel, budget estimatif.',
        '3. Mail professionnel : Objet explicite et normé, formule d\'appel adaptée, synthèse des faits, demande précise, formule de politesse.',
        '4. Argumentation : Affirmation (thèse), Justification (explication logique), Exemple concret (illustration factuelle).'
      ],
      raisonnement: [
        '1. Synthèse de documents : Confrontation objective des sources sans prise de parti personnelle, plan thématique structuré.',
        '2. Communication de crise : Transparence factuelle, empathie mesurée, actions immédiates, engagements de remédiation.',
        '3. Relecture orthographique et syntaxique : Chasse aux pléonasmes ("au jour d\'aujourd\'hui"), respect de la concordance des temps.',
        '4. Présentation orale : Règle des 3 V (Visuel, Vocal, Verbal), accroche percutante, conclusion mémorable.'
      ]
    }
  },
  {
    file: 'server/content/b1-bureautique/pages.js',
    solutions: {
      echauffement: [
        '1. Formules Excel fondamentales : =SOMME(A1:A10), =MOYENNE(B1:B10), =NB.SI(C1:C10; ">10"), =MAX(D1:D10).',
        '2. Adressage absolu vs relatif : $A$1 (absolu ligne et colonne), A$1 (absolu ligne), $A1 (absolu colonne), A1 (relatif).',
        '3. Styles Word hiérarchisés : Titre 1 pour les grands chapitres, Titre 2 pour les sections, Corps de texte pour les paragraphes.',
        '4. Raccourcis clavier universels : Ctrl+C (copier), Ctrl+V (coller), Ctrl+Z (annuler), Ctrl+S (enregistrer), Ctrl+F (rechercher).'
      ],
      application: [
        '1. Recherche matricielle : =RECHERCHEV(valeur_cherchée; table_matrice; no_index_col; FAUX) ou =INDEX(plage_retour; EQUIV(valeur; plage_recherche; 0)).',
        '2. Tableaux croisés dynamiques (TCD) : Disposition en Lignes, Colonnes, Valeurs (Somme, Nombre, Moyenne) et Filtres de rapport.',
        '3. Publipostage Word : Document principal lié à une source de données Excel, insertion des champs de fusion, aperçu et fusion.',
        '4. Conception PowerPoint professionnelle : Règle 6x6 (6 lignes max, 6 mots par ligne), contraste élevé, typographie lisible sans surcharge.'
      ],
      raisonnement: [
        '1. Validation des données Excel : Restriction par liste déroulante, contrôle des plages numériques, message d\'erreur bloquant.',
        '2. Automatisation bureautique : Macros enregistrées, principes de nettoyage des données (suppression des doublons, scission de texte).',
        '3. Modèles de documents (.dotx, .xltx) : Charte graphique d\'entreprise, verrouillage des styles et des en-têtes/pieds de page.',
        '4. Sécurité des documents : Protection par mot de passe, chiffrement, suppression des métadonnées personnelles avant diffusion.'
      ]
    }
  },
  {
    file: 'server/content/b1-merise/pages.js',
    solutions: {
      echauffement: [
        '1. Donnée vs Information : Donnée brute (valeur sans contexte, ex: 42) vs Information (donnée interprétée, ex: température = 42°C).',
        '2. Niveaux MERISE : Conceptuel (MCD / MCT), Logique (MLD / MOT), Physique (MPD / MOpT).',
        '3. Propriétés du dictionnaire de données : Élémentaire (irréductible), Concaténée (composée), Calculée (déductible, à exclure du MCD).',
        '4. Cardinalités : (0,1) au plus une ; (1,1) exactement une ; (0,n) zéro ou plusieurs ; (1,n) au moins une.'
      ],
      application: [
        '1. Règle de passage MCD vers MLD : Association (x,1)-(x,n) -> migration de la clé primaire du côté (x,n) comme clé étrangère (FK) côté (x,1).',
        '2. Association n-aire ou (x,n)-(x,n) : Création d\'une table de liaison dont la clé primaire est la concaténation des identifiants des entités participantes.',
        '3. Normalisation 1FN, 2FN, 3FN : 1FN (valeurs atomiques) ; 2FN (1FN + dépendance totale de la clé) ; 3FN (2FN + pas de dépendance transitive).',
        '4. Dépendance fonctionnelle : A -> B signifie qu\'à chaque valeur de A correspond au plus une valeur de B.'
      ],
      raisonnement: [
        '1. Conception de MCD complet : Identification des entités métiers, des identifiants stables et des associations sémantiques.',
        '2. Gestion de l\'historique et de la temporalité : Ajout d\'une date de début/fin dans l\'association ou création d\'une entité Historique.',
        '3. Contraintes d\'intégrité référentielle : Définition des règles ON DELETE CASCADE / SET NULL / RESTRICT lors de la dérivation MLD.',
        '4. Dénormalisation contrôlée : Justification des compromis de performance en lecture au niveau physique (MPD) vs intégrité 3FN.'
      ]
    }
  },
  {
    file: 'server/content/b1-architecture/pages.js',
    solutions: {
      echauffement: [
        '1. Matériel vs Logiciel : Matériel (CPU, RAM, carte mère, GPU, SSD) vs Logiciel (BIOS/UEFI, OS, pilotes, applications).',
        '2. Unités de stockage : 1 Ko = 1 024 octets ; 1 Mo = 1 024 Ko ; 1 Go = 1 024 Mo ; 1 To = 1 024 Go.',
        '3. Numération binaire et hexadécimale : Base 2 (0,1), Base 10 (0-9), Base 16 (0-9, A-F). 1 octet = 8 bits = 2 caractères hexa.',
        '4. Complément à 2 (entiers signés) : Négatif = inverser tous les bits (complément à 1) puis ajouter 1 (+1).'
      ],
      application: [
        '1. Algèbre de Boole : Portes ET (AND), OU (OR), NON (NOT), NON-ET (NAND), NON-OU (NOR), OU-EXCLUSIF (XOR).',
        '2. Simplification logique : Tables de vérité, théorèmes de De Morgan (NON(A ET B) = NON(A) OU NON(B)), tableaux de Karnaugh.',
        '3. Architecture de Von Neumann : Unité arithmétique et logique (UAL/ALU), Unité de contrôle (UC), Mémoire centrale, Bus (données, adresses, contrôle).',
        '4. Cycle d\'instruction processeur : Recherche (Fetch) -> Décodage (Decode) -> Exécution (Execute) -> Écriture du résultat (Writeback).'
      ],
      raisonnement: [
        '1. Hiérarchie des mémoires : Registres CPU (<1 ns) > Cache L1/L2/L3 (1-10 ns) > RAM centrale (50-100 ns) > Stockage SSD/NVMe (microsecondes).',
        '2. Dimensionnement et compatibilité PC : Socket CPU, chipset carte mère, génération DDR, TDP et puissance alimentation (PSU).',
        '3. Bus PCIe et bande passante : PCIe 4.0 x16 = ~32 Go/s bidirectionnel ; adéquation GPU et liaisons stockage NVMe M.2.',
        '4. Diagnostic panne matérielle : Bips POST du BIOS, codes 7-segments, vérification des tensions d\'alimentation et températures.'
      ]
    }
  },
  {
    file: 'server/content/b1-reseaux/pages.js',
    solutions: {
      echauffement: [
        '1. Typologie des réseaux : LAN (Local - bâtiment/campus), MAN (Métropolitain - ville), WAN (Wide - pays/monde), WLAN (sans fil 802.11), PAN (personnel Bluetooth).',
        '2. Modèle OSI (7 couches) : 1 Physique, 2 Liaison, 3 Réseau, 4 Transport, 5 Session, 6 Présentation, 7 Application.',
        '3. Protocoles de transport : TCP (fiable, orienté connexion, accusés de réception) vs UDP (rapide, sans état, sans garantie de livraison).',
        '4. Adressage physique MAC : Adresse matérielle 48 bits (6 octets hexadécimaux), 24 bits OUI constructeur + 24 bits identifiant NIC.'
      ],
      application: [
        '1. Classes d\'adresses IPv4 : Classe A (1-126, /8), Classe B (128-191, /16), Classe C (192-223, /24), Classe D (224-239, Multicast).',
        '2. Masque de sous-réseau et calcul d\'appartenance : IP ET Masque = Adresse Réseau. Deux hôtes communiquent directement si leurs adresses réseau coïncident.',
        '3. Équipements réseaux : Répéteur/Hub (L1), Commutateur/Switch (L2 - tables MAC), Routeur (L3 - tables de routage IP).',
        '4. Établissement de session TCP (Three-way handshake) : Séquence SYN -> SYN-ACK -> ACK ; fermeture via FIN -> ACK.'
      ],
      raisonnement: [
        '1. Découpage CIDR et VLSM : Nombre d\'hôtes = 2^(32 - préfixe) - 2. Réserver l\'adresse réseau (.0) et l\'adresse de broadcast (.255 pour /24).',
        '2. Segmentation VLAN (802.1Q) : Isolation des domaines de diffusion niveau 2 ; liaison trunk pour transporter plusieurs VLANs tagués.',
        '3. Protocoles d\'infrastructure : DHCP (DORA : Discover, Offer, Request, Acknowledge), DNS (résolution FQDN vers IP), ARP (résolution IP vers MAC).',
        '4. Diagnostic réseau méthodique : Ping (connectivité ICMP), Traceroute (détection de coupure de saut TTL), Netstat (ports d\'écoute).'
      ]
    }
  },
  {
    file: 'server/content/b1-ccna1/pages.js',
    solutions: {
      echauffement: [
        '1. Modes CLI Cisco IOS : Mode utilisateur (Router>), Mode privilégié (Router# via enable), Mode configuration globale (Router(config)#).',
        '2. Commandes de consultation IOS : show running-config, show startup-config, show ip interface brief, show version.',
        '3. Sauvegarde de configuration : copy running-config startup-config ou write memory.',
        '4. Configuration de base d\'un équipement : hostname, no ip domain-lookup, service password-encryption, banner motd.'
      ],
      application: [
        '1. Sécurisation des accès d\'administration : enable secret [motdepasse], line console 0, line vty 0 4, transport input ssh.',
        '2. Configuration d\'une interface Cisco : interface g0/0, ip address [ip] [masque], no shutdown, description [texte].',
        '3. Passerelle par défaut sur commutateur L2 : ip default-gateway [adresse_ip_routeur] pour l\'administration distante.',
        '4. Configuration du service SSHv2 : ip domain-name [domaine], crypto key generate rsa modulus 2048, ip ssh version 2, username [user] secret [pass].'
      ],
      raisonnement: [
        '1. Résolution de problèmes d\'interfaces : Analyse des statuts "up/up" (opérationnel), "down/down" (problème L1 câble), "up/down" (problème L2 protocole/encapsulation), "administratively down" (exécuter no shutdown).',
        '2. Configuration et test de connectivité IPv6 : ipv6 unicast-routing, ipv6 address [prefixe::1/64], ipv6 address fe80::1 link-local.',
        '3. Sécurité des ports switch (Port Security) : switchport port-security, switchport port-security maximum [n], switchport port-security violation {protect|restrict|shutdown}.',
        '4. Audit de configuration conforme : Vérification de la conformité aux guides de durcissement Cisco (désactivation des services inutiles, timeouts vty).'
      ]
    }
  },
  {
    file: 'server/content/b1-robotique/pages.js',
    solutions: {
      echauffement: [
        '1. Composants d\'un système robotique : Capteurs (perception), Microcontrôleur (décision/traitement), Actionneurs (moteurs/action).',
        '2. Capteurs usuels : Ultrasons HC-SR04 (mesure de distance par écho), Infrarouge (détection d\'obstacle/ligne), Encodeurs (mesure de rotation).',
        '3. Actionneurs et motorisation : Servomoteur (position angulaire précise), Moteur CC (rotation continue modulée en PWM), Moteur pas à pas.',
        '4. Signaux de commande : Signal tout-ou-rien (TOR : 0V ou 5V), Signal analogique (tension variable), Signal PWM (rapport cyclique duty cycle).'
      ],
      application: [
        '1. Algorithme d\'évitement d\'obstacles : Si distance_obstacle < SEUIL_CRITIQUE alors arrêt_moteurs, rotation, vérification dégagement, reprise avance.',
        '2. Suivi de ligne (Line Tracker) : Deux capteurs IR : si capteur gauche blanc et droit noir -> tourner à droite ; si les deux noirs -> avancer tout droit.',
        '3. Modulation de largeur d\'impulsion (PWM) : Contrôle de la vitesse moyenne d\'un moteur CC par ajustement du rapport cyclique (0% à 100%).',
        '4. Boucle de contrôle boucle ouverte vs fermée : Boucle ouverte (commande sans retour capteur) vs Boucle fermée (asservissement mesuré en temps réel).'
      ],
      raisonnement: [
        '1. Filtrage des signaux capteurs : Élimination du bruit de mesure par moyenne glissante ou filtre passe-bas pour éviter les faux déclenchements.',
        '2. Asservissement PID (Proportionnel, Intégral, Dérivé) : P corrige l\'erreur instantanée, I élimine l\'erreur statique, D anticipe les variations rapides.',
        '3. Cinématique différentielle : Commande indépendante des vitesses des roues gauche et droite pour contrôler vitesse d\'avance et vitesse de rotation angulaire.',
        '4. Sécurité machine et arrêt d\'urgence : Coupure matérielle prioritaire de la puissance des actionneurs indépendamment de l\'état logiciel du microcontrôleur.'
      ]
    }
  },
  {
    file: 'server/content/b1-cyber/pages.js',
    solutions: {
      echauffement: [
        '1. Triptyque de sécurité DICP : Disponibilité (système accessible), Intégrité (données non altérées), Confidentialité (accès réservé aux personnes autorisées), Preuve/Traçabilité.',
        '2. Menaces et vecteurs d\'attaque : Phishing (hameçonnage), Ransomware (rançongiciel), Malware (logiciel malveillant), Attaque DoS/DDoS (déni de service).',
        '3. Hygiène numérique fondamentale : Mots de passe robustes et uniques, double authentification (2FA/MFA), mises à jour régulières, sauvegardes 3-2-1.',
        '4. Chiffrement symétrique vs asymétrique : Symétrique (une seule clé secrète partagée, ex: AES) vs Asymétrique (bi-clé publique/privée, ex: RSA).'
      ],
      application: [
        '1. Analyse d\'un courriel d\'hameçonnage : Vérification de l\'en-tête Return-Path, discordance URL affichée vs réelle, sentiment d\'urgence artificielle.',
        '2. Politique de mots de passe conforme ANSSI : Longueur minimale >= 12-14 caractères, diversité des jeux de caractères, interdiction du recyclage.',
        '3. Configuration de pare-feu personnel : Politique par défaut DROP/DENY en entrée (ingress), autorisation explicite des flux requis, inspection avec état.',
        '4. Gestion des correctifs de vulnérabilités : Classification par score CVSS, déploiement prioritaire des patchs critiques sur les actifs exposés.'
      ],
      raisonnement: [
        '1. Modélisation de la menace (Threat Modeling) : Identification des actifs critiques, des acteurs de menace, des surfaces d\'attaque et des scénarios de risque.',
        '2. Principe de moindre privilège (PoLP) : Attribuer aux utilisateurs et services uniquement les permissions strictement indispensables à leurs tâches.',
        '3. Plan de réponse à incident (CSIRT) : Qualification -> Isolement/Confinement -> Éradication -> Remédiation -> Retour d\'expérience (RETEX).',
        '4. Stratégie de sauvegarde 3-2-1 : 3 copies des données, sur 2 supports différents, dont 1 copie externalisée hors ligne (air-gapped).'
      ]
    }
  },
  {
    file: 'server/content/b1-virtualisation/pages.js',
    solutions: {
      echauffement: [
        '1. Concepts de virtualisation : Hyperviseur (VMM), Machine Virtuelle (VM), Système invité (Guest OS), Système hôte (Host OS).',
        '2. Hyperviseur Type 1 (Bare-Metal) vs Type 2 (Hosted) : Type 1 s\'exécute directement sur le matériel (ex: VMware ESXi, Proxmox VE) ; Type 2 sur un OS hôte (ex: VirtualBox).',
        '3. Composants d\'une VM : Fichier de configuration (.vmx, .xml), disque virtuel (.vmdk, .qcow2), mémoire vive allouée, carte réseau virtuelle (vNIC).',
        '4. Modes réseau pour VM : NAT (partage IP hôte), Bridge/Pont (VM visible sur le réseau physique avec sa propre IP), Host-Only (isolée avec l\'hôte).'
      ],
      application: [
        '1. Dimensionnement des ressources (vCPU/vRAM) : Règle de surallocation (overcommitment) prudente : vCPU:pCPU <= 2:1 à 3:1 pour charges standards.',
        '2. Snapshots et instantanés : Capture ponctuelle de l\'état mémoire et disque pour roll-back rapide avant modification critique ; ne remplace pas une sauvegarde.',
        '3. Formats de disques virtuels : Disque dynamique (taille extensible à la demande) vs Disque préalloué (espace réservé immédiatement, meilleures performances).',
        '4. Installation des outils invités (Guest Additions / VMware Tools) : Amélioration des pilotes d\'affichage, synchronisation horaire, presse-papier partagé.'
      ],
      raisonnement: [
        '1. Mutualisation et consolidation de serveurs : Calcul du ratio de consolidation pour remplacer plusieurs serveurs physiques sous-utilisés par un serveur dense.',
        '2. Haute disponibilité et migration à chaud (vMotion / Live Migration) : Transfert de la mémoire d\'une VM active vers un autre hôte sans interruption de service.',
        '3. Stockage partagé en cluster : Utilisation de SAN/NAS via iSCSI, NFS ou Fibre Channel pour permettre le basculement automatique des VMs (HA).',
        '4. Plan de reprise d\'activité (PRA) virtualisé : Réplication asynchrone des disques virtuels vers un site secondaire et automatisation du redémarrage.'
      ]
    }
  },
  {
    file: 'server/content/b1-projet/pages.js',
    solutions: {
      echauffement: [
        '1. Cycle de vie d\'un projet informatique : Cadrage -> Conception -> Réalisation -> Recette -> Déploiement -> Maintenance.',
        '2. Rôles clés dans une équipe projet : Chef de projet / Product Owner, Développeurs, Administrateurs systèmes/réseaux, Testeur QA, Commanditaire.',
        '3. Livrables de cadrage : Cahier des charges fonctionnel (CdCF), dossier d\'architecture technique (DAT), matrice des exigences.',
        '4. Planification : Découpage WBS (Work Breakdown Structure), tâches, jalons (milestones), chemin critique du diagramme de Gantt.'
      ],
      application: [
        '1. Gestion des versions et traçabilité : Stratégie de branches Git, convention de messages de commit, revue de code par les pairs.',
        '2. Cahier de recette et tests de conformité : Définition des critères d\'acceptation, cas de tests (nominal, alternatif, limite), PV de recette.',
        '3. Gestion des risques projet : Matrice probabilité × impact, plans de contournement et de contingence.',
        '4. Documentation technique d\'exploitation : Guide d\'installation pas à pas, prérequis d\'infrastructure, procédures de sauvegarde et de restauration.'
      ],
      raisonnement: [
        '1. Arbitrage coût / délai / qualité (Triangle d\'or du projet) : Si les délais sont réduits sans budget supplémentaire, le périmètre fonctionnel doit être ajusté.',
        '2. Recette fonctionnelle et levée des réserves : Catégorisation des anomalies (bloquante, majeure, mineure) avant signature du procès-verbal de mise en production.',
        '3. Conduite du changement : Accompagnement des utilisateurs finaux, rédaction des guides utilisateurs, formation et support post-démarrage.',
        '4. Bilan de fin de projet et REX : Analyse des écarts budget/délai réels vs prévisionnels, capitalisation des bonnes pratiques pour les projets futurs.'
      ]
    }
  }
];

function remediateB1Exercices() {
  console.log('\n=== PART 3 : Remédiation des exercices B1 (élimination des scripts Bash) ===');

  for (const item of B1_COURSES_EXERCICES) {
    const filePath = path.join(ROOT, item.file);
    if (!fs.existsSync(filePath)) {
      console.warn(`[WARN] Fichier absent : ${item.file}`);
      continue;
    }

    let content = fs.readFileSync(filePath, 'utf8');

    // 1. Lead text
    content = content.replace(
      /'  <p class="lead">De la pratique graduée pour consolider chaque[^']*Les scripts sont en Bash, comme à l\'atelier\.<\/p>',/g,
      "'  <p class=\"lead\">De la pratique graduée pour consolider chaque module, puis un dossier d’application méthodique. Ces études de cas se réalisent sur des grilles d’analyse structurées.</p>',"
    );

    // 2. Remplacer les 3 blocs de solutions dans item(...)
    // Format attendu : item('Échauffement', 'n1', [...], [ ... ])
    // On repère item('Échauffement' ...
    const echauffRegex = /(item\(\s*['"](?:Échauffement|Entraînement|Acquisition)['"]\s*,\s*['"]n1['"]\s*,\s*\[[\s\S]*?\],\s*\[)([\s\S]*?)(\]\s*\))/;
    const applicRegex = /(item\(\s*['"]Application['"]\s*,\s*['"]n2['"]\s*,\s*\[[\s\S]*?\],\s*\[)([\s\S]*?)(\]\s*\))/;
    const raisonRegex = /(item\(\s*['"]Raisonnement['"]\s*,\s*['"]n3['"]\s*,\s*\[[\s\S]*?\],\s*\[)([\s\S]*?)(\]\s*\))/;

    const solToCode = (lines) => '\n' + lines.map(l => "      '" + l.replace(/'/g, "\\'") + "'").join(',\n') + '\n    ';

    if (echauffRegex.test(content) && item.solutions.echauffement) {
      content = content.replace(echauffRegex, `$1${solToCode(item.solutions.echauffement)}$3`);
    }
    if (applicRegex.test(content) && item.solutions.application) {
      content = content.replace(applicRegex, `$1${solToCode(item.solutions.application)}$3`);
    }
    if (raisonRegex.test(content) && item.solutions.raisonnement) {
      content = content.replace(raisonRegex, `$1${solToCode(item.solutions.raisonnement)}$3`);
    }

    // Remplacer aussi le projet bash éventuel par un dossier d'analyse
    content = content.replace(
      /'    <details><summary>Correction du projet<\/summary><div class="sol"><pre><code>read -r[\s\S]*?<\/code><\/pre><\/div><\/details>'/g,
      `'    <details><summary>Méthodologie du dossier d’application</summary><div class="sol"><p>Ce dossier d’application s’évalue sur la rigueur de la démarche, la conformité aux normes du domaine et la cohérence de l’analyse technique proposée.</p></div></details>'`
    );

    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`[OK] Exercices B1 mis à jour : ${item.file}`);
  }
}

// -------------------------------------------------------------
// PART 4 : Nettoyage du Python résiduel spécifique
// -------------------------------------------------------------
function cleanStrayPython() {
  console.log('\n=== PART 4 : Nettoyage du code Python résiduel spécifique ===');

  // 1. erp-si/pages/examens-exercices.js
  const erpPath = path.join(ROOT, 'server/content/erp-si/pages/examens-exercices.js');
  if (fs.existsSync(erpPath)) {
    let erp = fs.readFileSync(erpPath, 'utf8');
    erp = erp.replace(
      /'    <pre><code>def reconcilier_facture\(po, gr, facture\):[\s\S]*?<\/code><\/pre>'/g,
      `'    <pre><code>RÈGLE DE CONTRÔLE (Rapprochement 3 voies) :\\n  Si Montant_Facture &gt; Montant_PO : BLOCAGE_PRIX\\n  Si Quantité_Facturée &gt; Quantité_Reçue_GR : BLOCAGE_QUANTITE\\n  Sinon : BON_A_PAYER</code></pre>'`
    );
    fs.writeFileSync(erpPath, erp, 'utf8');
    console.log(`[OK] erp-si/pages/examens-exercices.js nettoyé`);
  }

  // 2. b3-cryptographie/chapitre4.js
  const cryptoPath = path.join(ROOT, 'server/content/b3-cryptographie/chapitre4.js');
  if (fs.existsSync(cryptoPath)) {
    let crypto = fs.readFileSync(cryptoPath, 'utf8');
    crypto = crypto.replace(
      /<pre><code>def mod_exp\(base, exp, mod\):[\s\S]*?<\/code><\/pre>/g,
      `<pre><code>ALGORITHME ExponentiationModulaireRapide(base, exp, mod) :\\n  résultat ← 1\\n  base ← base MOD mod\\n  Tant que exp &gt; 0 faire :\\n    Si exp est impair Alors :\\n      résultat ← (résultat * base) MOD mod\\n    base ← (base * base) MOD mod\\n    exp ← exp DIV 2\\n  Retourner résultat</code></pre>`
    );
    fs.writeFileSync(cryptoPath, crypto, 'utf8');
    console.log(`[OK] b3-cryptographie/chapitre4.js nettoyé`);
  }

  // 3. b1-robotique/chapitres-1-3.js
  const roboPath = path.join(ROOT, 'server/content/b1-robotique/chapitres-1-3.js');
  if (fs.existsSync(roboPath)) {
    let robo = fs.readFileSync(roboPath, 'utf8');
    robo = robo.replace(
      /'<pre><code>def est_pair\(x\):\\n' \+\n\s*'    return x % 2 == 0\\n' \+\n\s*'\\n' \+\n\s*'est_pair\(4\)   → True\\n' \+\n\s*'est_pair\(7\)   → False<\/code><\/pre>'/g,
      `'<pre><code>RÈGLE DE DÉCISION EstPair(x) :\\n  Si (x MOD 2 = 0) Alors VRAI Sinon FAUX\\n\\nExemples :\\n  EstPair(4) → VRAI\\n  EstPair(7) → FAUX</code></pre>'`
    );
    robo = robo.replace(
      /'<pre><code>def est_premier\(x\):\\n' \+\n\s*'    if x &lt; 2:\\n' \+\n\s*'        return False\\n' \+\n\s*'    d = 2\\n' \+\n\s*'    while d \* d &lt;= x:\\n' \+\n\s*'        if x % d == 0:\\n' \+\n\s*'            return False\\n' \+\n\s*'        d \+= 1\\n' \+\n\s*'    return True<\/code><\/pre>'/g,
      `'<pre><code>ALGORITHME TestPrimalite(x) :\\n  Si x &lt; 2 Alors Retourner FAUX\\n  Pour d de 2 jusqu\\'à √x faire :\\n    Si (x MOD d = 0) Alors Retourner FAUX\\n  Retourner VRAI</code></pre>'`
    );
    fs.writeFileSync(roboPath, robo, 'utf8');
    console.log(`[OK] b1-robotique/chapitres-1-3.js nettoyé`);
  }

  // 4. b1-robotique/pages.js
  const roboPagesPath = path.join(ROOT, 'server/content/b1-robotique/pages.js');
  if (fs.existsSync(roboPagesPath)) {
    let roboP = fs.readFileSync(roboPagesPath, 'utf8');
    roboP = roboP.replace(/def est_pair\(x\): return x % 2 == 0/g, 'EstPair(x) : x MOD 2 = 0');
    roboP = roboP.replace(/def etat_distance\(d\):/g, 'Règle Distance(d) :');
    roboP = roboP.replace(/def etat_temperature\(t\):/g, 'Règle Température(t) :');
    fs.writeFileSync(roboPagesPath, roboP, 'utf8');
    console.log(`[OK] b1-robotique/pages.js nettoyé`);
  }
}

// -------------------------------------------------------------
// Exécution
// -------------------------------------------------------------
remediateAccueilFiles();
remediateB1Ateliers();
remediateB1Exercices();
cleanStrayPython();

console.log('\n=== REMÉDIATION DU CONTENU ET DES ATELIERS TERMINÉE AVEC SUCCÈS ===\n');

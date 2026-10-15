/**
 * tools/upgrade-b3-hacking-chapters.js — Met à niveau les 6 chapitres de b3-hacking
 * pour correspondre exactement au schéma attendu par course-kit.js
 */
const fs = require('fs');
const path = require('path');

const METADATA = {
  1: {
    notions: [
      { term: 'STAD (Système de Traitement Automatisé)', def: 'Ensemble informatique assurant le traitement, la transmission ou le stockage automatisé de données numériques au sens de l\'article 323-1 du Code Pénal.' },
      { term: 'Rules of Engagement (RoE)', def: 'Document contractuel formel fixant les limites strictes, les adresses IP autorisées, les techniques proscrites et les fenêtres horaires d\'un test d\'intrusion.' },
      { term: 'CVSS v3.1 Base Metrics', def: 'Standard ouvert évaluant la sévérité intrinsèque d\'une vulnérabilité (exploitabilité et impact) sur une échelle de 0.0 à 10.0.' },
      { term: 'Cyber Kill Chain', def: 'Modèle en 7 phases formalisant la progression d\'une cyberattaque ciblée de la reconnaissance à l\'action sur objectifs.' },
      { term: 'Red Team vs Blue Team', def: 'La Red Team émule les attaquants réels sans préavis, tandis que la Blue Team assure la détection, la surveillance SOC et la défense en temps réel.' }
    ],
    pitfalls: [
      'Lancer des sondes réseau sans lettre de mission écrite et signée par le représentant légal de l\'entité cible (délit pénal art. 323-1).',
      'Dépasser le périmètre d\'adresses IP spécifié dans les Rules of Engagement (risque d\'attaque illégale d\'un système tiers hébergé).',
      'Réaliser des attaques de déni de service (DoS/DDoS) destructrices non prévues contractuellement.',
      'Sous-estimer une vulnérabilité locale complexe alors qu\'elle s\'intègre dans une chaîne d\'exploitation critique.'
    ],
    method: [
      'Établir et faire signer la convention de mandat et la lettre de mission avec la liste exhaustive des IP et domaines cibles.',
      'Définir les règles d\'engagement (RoE) avec les contacts d\'urgence et les techniques exclues.',
      'Cartographier le périmètre technique et vérifier la propriété des adresses IP cibles (Whois, ASN).',
      'Évaluer et qualifier chaque vulnérabilité découverte selon le standard CVSS v3.1 Base Metrics.',
      'Rédiger le rapport d\'intrusion avec fiches techniques de vulnérabilités et synthèse managériale.'
    ],
    summary: [
      'Le cadre juridique français (Code Pénal art. 323-1 à 323-7) réprime l\'accès frauduleux d\'amendes et d\'emprisonnement sans mandat écrit formel.',
      'Les Règles d\'Engagement (RoE) cadrent strictement le périmètre IP, les horaires et les techniques autorisées pour protéger l\'auditeur.',
      'Les 5 phases du CEH structurent la mission : Reconnaissance, Scanning, Gaining Access, Maintaining Access, Clearing Tracks.',
      'La Cyber Kill Chain découpe l\'attaque en 7 maillons : casser un seul maillon suffit à neutraliser l\'intrusion.',
      'Le score CVSS v3.1 quantifie la sévérité (Critical >= 9.0, High >= 7.0, Medium >= 4.0, Low < 4.0).'
    ],
    checklist: [
      'Je connais les peines de l\'article 323-1 du Code Pénal et les exigences contractuelles de la lettre de mission.',
      'Je sais rédiger des Rules of Engagement (RoE) exhaustives avec clauses d\'exclusion et protocoles d\'urgence.',
      'Je maîtrise les 5 phases du piratage éthique CEH et les 7 étapes de la Cyber Kill Chain.',
      'Je sais calculer et justifier un score CVSS v3.1 Base Metrics avec ses composantes Exploitabilité et Impact.'
    ]
  },
  2: {
    notions: [
      { term: 'OSINT (Open Source Intelligence)', def: 'Méthodologie de renseignement exploitant des sources d\'information ouvertes, accessibles légalement et publiquement sans contact direct avec la cible.' },
      { term: 'Google Dorking', def: 'Utilisation d\'opérateurs de recherche avancés (site:, filetype:, inurl:, intitle:) pour découvrir des données sensibles indexées par mégarde.' },
      { term: 'Transfert de Zone AXFR', def: 'Protocole de réplication complète d\'une zone DNS (TCP 53) divulguant l\'arborescence intégrale des sous-domaines si mal configuré.' },
      { term: 'SPF (Sender Policy Framework)', def: 'Enregistrement DNS TXT spécifiant la liste blanche des serveurs autorisés à envoyer des courriels pour un domaine.' },
      { term: 'DMARC', def: 'Politique de conformité et de reporting DNS ordonnant l\'action (none, quarantine, reject) lors de l\'échec des vérifications SPF/DKIM.' }
    ],
    pitfalls: [
      'Confondre reconnaissance passive (sans paquet envoyé à la cible) et active (sondes DNS directes ou requêtes web).',
      'Ignorer le risque d\'enregistrements SPF finissant par +all autorisant n\'importe quel attaquant à usurper le domaine.',
      'Tomber dans le piège des résolutions DNS wildcard (*.domaine.com) et consigner des centaines de faux sous-domaines inexistants.',
      'Oublier d\'interroger les registres Certificate Transparency (crt.sh) qui listent tous les sous-domaines dotés d\'un certificat TLS.'
    ],
    method: [
      'Interroger les registres RIR (RIPE/ARIN) et Whois pour identifier les blocs IP publics et serveurs de noms.',
      'Collecter les informations passives via Google Dorking, theHarvester, Wayback Machine et Shodan.',
      'Auditer la zone DNS : tester le transfert de zone AXFR sur chaque serveur de noms faisant autorité.',
      'Analyser les enregistrements de messagerie SPF, DKIM et DMARC pour évaluer la vulnérabilité au spoofing.',
      'Énumérer les sous-domaines par dictionnaire en filtrant systématiquement l\'IP wildcard de référence.'
    ],
    summary: [
      'L\'OSINT permet de cartographier la surface d\'attaque d\'une entreprise sans émettre un seul paquet suspect vers ses infrastructures.',
      'Shodan et Censys indexent les bannières de millions d\'équipements exposés sur Internet (RDP, caméras, bases de données, WAF).',
      'Une faille de transfert de zone DNS AXFR permet de télécharger instantanément la cartographie complète des sous-domaines.',
      'Les enregistrements SPF stricts (-all) combinés à DMARC (p=reject) sont impératifs pour neutraliser l\'usurpation d\'email.',
      'L\'énumération de sous-domaines par dictionnaire exige un filtrage rigoureux des faux positifs DNS wildcard.'
    ],
    checklist: [
      'Je sais concevoir des requêtes Google Dorks complexes pour trouver des fichiers de configuration exposés.',
      'Je sais tester et interpréter un transfert de zone DNS AXFR avec dig.',
      'Je maîtrise l\'analyse des syntaxes SPF, DKIM et DMARC et leurs impacts en ingénierie sociale.',
      'Je sais implémenter un algorithme de détection et d\'élimination des faux positifs DNS wildcard en Python 3.'
    ]
  },
  3: {
    notions: [
      { term: 'Poignée de Mains TCP (3-Way Handshake)', def: 'Séquence d\'établissement de connexion en 3 étapes : SYN, SYN+ACK, puis ACK selon la RFC 793.' },
      { term: 'SYN Stealth Scan (-sS)', def: 'Balayage de ports demi-ouvert envoyant un RST dès réception du SYN+ACK sans finaliser la connexion.' },
      { term: 'OS Fingerprinting (-O)', def: 'Technique d\'identification du système d\'exploitation basée sur l\'analyse des caractéristiques fines de la pile TCP/IP (TTL, Window Size).' },
      { term: 'Session Nulle SMB', def: 'Connexion non authentifiée sur le port 445/139 permettant d\'énumérer les partages, utilisateurs et groupes d\'un système.' },
      { term: 'Communauté SNMP v1/v2c', def: 'Mot de passe transmis en clair régissant l\'accès en lecture (public) ou écriture (private) à l\'arborescence MIB-2 d\'un équipement.' }
    ],
    pitfalls: [
      'Tenter un scan FIN, Null ou Xmas face à une machine Windows : l\'OS renvoie un RST sur tous les ports qu\'ils soient ouverts ou fermés.',
      'Confondre le statut CLOSED (réponse RST reçue) et FILTERED (absence de réponse causée par un pare-feu).',
      'Lancer des scans à cadence agressive (-T5) risquant de saturer ou faire planter des équipements industriels ou routeurs anciens.',
      'Négliger le balayage des ports UDP (53, 161, 69) en se limitant uniquement aux 1000 ports TCP les plus fréquents.'
    ],
    method: [
      'Réaliser une découverte préalable des hôtes actifs (Host Discovery avec ping sweep -sn).',
      'Lancer un balayage TCP rapide des ports les plus fréquents (SYN scan -sS avec temporisation T4).',
      'Effectuer la détection de versions applicatives (-sV) et l\'empreinte d\'OS (-O) sur les ports découverts ouverts.',
      'Auditer les services d\'infrastructure spécifiques : énumération SMB (enum4linux) et SNMP (snmpwalk).',
      'Exécuter des scripts Nmap NSE ciblés (--script vuln) pour valider la présence de failles répertoriées.'
    ],
    summary: [
      'Le balayage de ports s\'appuie sur la conformité des réponses à la RFC 793 pour qualifier les états OPEN, CLOSED ou FILTERED.',
      'Le scan SYN Stealth (-sS) nécessite des privilèges root pour forger des paquets réseau bruts et déchirer la session par RST.',
      'L\'OS fingerprinting déduit le noyau hôte à partir du TTL initial (64 pour Linux, 128 pour Windows) et des options TCP.',
      'Les sessions nulles SMB et les communautés SNMP par défaut (public/private) constituent des vecteurs d\'énumération majeurs.',
      'Nmap Scripting Engine (NSE) permet d\'automatiser la détection de vulnérabilités critiques via des scripts Lua modulaires.'
    ],
    checklist: [
      'Je sais interpréter l\'état d\'un port TCP selon la sonde Nmap envoyée et le paquet de réponse reçu.',
      'Je maîtrise la détection de versions et de systèmes d\'exploitation via les options -sV et -O.',
      'Je sais auditer les configurations SMB et SNMP vulnérables.',
      'Je sais écrire des analyseurs en Python 3 simulant le décodage de sondes TCP Nmap.'
    ]
  },
  4: {
    notions: [
      { term: 'Broken Access Control (A01)', def: 'Défaillance de contrôle d\'accès permettant à un utilisateur d\'agir sur des ressources non autorisées (IDOR).' },
      { term: 'Injection SQL (SQLi)', def: 'Concaténation non assainie d\'entrées utilisateur dans une requête SQL altérant la logique d\'exécution de la base.' },
      { term: 'Cross-Site Scripting (XSS)', def: 'Injection de scripts malveillants exécutés dans le navigateur des victimes légitimes (Stored, Reflected, DOM).' },
      { term: 'Server-Side Request Forgery (SSRF)', def: 'Faille contraignant le serveur web à forger des requêtes HTTP vers des ressources internes (ex: 169.254.169.254).' },
      { term: 'Path Traversal (Traversée de Répertoire)', def: 'Manipulation de paramètres de chemin via des séquences ../ pour accéder à des fichiers arbitraires hors racine.' }
    ],
    pitfalls: [
      'Tenter de sécuriser les injections SQL par des listes noires de mots-clés facilement contournables par obfuscation.',
      'Oublier l\'attribut HttpOnly sur les cookies de session, laissant le jeton d\'authentification vulnérable au vol par XSS.',
      'Se fier aux contrôles d\'accès effectués uniquement côté client en JavaScript sans validation côté serveur.',
      'Supposer qu\'une injection aveugle (Blind SQLi) est inexploitable parce qu\'aucune donnée ne s\'affiche dans la page.'
    ],
    method: [
      'Intercepter et cartographier l\'arborescence de l\'application web avec le proxy Burp Suite.',
      'Tester les contrôles d\'accès en permutant les identifiants d\'objets (IDOR) entre différents comptes.',
      'Auditer les points d\'entrée pour détecter les injections SQL (in-band, booléennes et basées sur le temps).',
      'Rechercher les failles XSS en observant le contexte d\'échappement des entrées réfléchies ou stockées.',
      'Tester les traversées de répertoire avec des contournements d\'encodage URL (%2e%2e%2f) et des null bytes.'
    ],
    summary: [
      'Broken Access Control est la vulnérabilité web n°1 mondiale selon l\'OWASP : elle frappe directement la logique métier.',
      'Les requêtes préparées avec paramètres liés constituent l\'unique remédiation définitive contre les injections SQL.',
      'Les failles XSS permettent le vol de sessions utilisateurs, contré en profondeur par HttpOnly et les politiques CSP.',
      'Les attaques SSRF exposent les architectures Cloud en ciblant l\'API interne de métadonnées non authentifiée.',
      'Les traversées de répertoire (Path Traversal / LFI) peuvent déboucher sur une exécution de code via log poisoning.'
    ],
    checklist: [
      'Je maîtrise l\'exploitation et la remédiation des injections SQL avec Prepared Statements.',
      'Je sais différencier XSS Stored, Reflected et DOM et mettre en œuvre les en-têtes CSP et HttpOnly.',
      'Je comprends le mécanisme des attaques SSRF contre les architectures Cloud.',
      'Je sais auditer et automatiser la détection des failles web à l\'aide de Burp Suite et sqlmap.'
    ]
  },
  5: {
    notions: [
      { term: 'Stack Buffer Overflow', def: 'Écrasement de la mémoire de pile permettant de remplacer le pointeur d\'instruction EIP/RIP par l\'adresse d\'un shellcode.' },
      { term: 'GTFOBins', def: 'Catalogue de référence des binaires Unix légitimes détournables pour échapper à un shell restreint ou élever ses privilèges.' },
      { term: 'NOP Sled', def: 'Suite d\'octets 0x90 créant une zone tampon d\'atterrissage sécurisée précédant le shellcode lors d\'un buffer overflow.' },
      { term: 'Unquoted Service Path', def: 'Chemin d\'exécutable de service Windows contenant des espaces sans guillemets permettant l\'injection de binaire.' },
      { term: 'SeImpersonatePrivilege', def: 'Privilège Windows autorisant l\'usurpation de jetons de sécurité clients pour obtenir les droits NT AUTHORITY\\SYSTEM.' }
    ],
    pitfalls: [
      'Oublier d\'ajouter le drapeau -p lors de l\'exécution d\'un shell via un binaire SUID (l\'OS rétrograde sinon l\'euid au compte réel).',
      'Confondre un payload Metasploit stagé (avec slash) et non-stagé inline (avec tiret bas).',
      'Modifier directement des fichiers système critiques sans vérifier les sauvegardes lors d\'une élévation de privilèges.',
      'Négliger les règles sudoers comportant la directive NOPASSWD: sur des binaires d\'édition comme vim ou less.'
    ],
    method: [
      'Énumérer l\'environnement local après premier accès : OS, kernel, utilisateurs, groupes et privilèges (whoami, id).',
      'Rechercher les binaires SUID mal configurés sous Linux et croiser avec GTFOBins.',
      'Auditer les autorisations accordées par le fichier sudoers (sudo -l).',
      'Sous Windows, inspecter les privilèges de jetons (whoami /priv) et les services non quotés.',
      'Mettre en place un tunnel de pivoting (SSH -D ou Chisel) pour router les attaques vers le réseau interne.'
    ],
    summary: [
      'L\'exploitation de buffer overflows détourne EIP/RIP mais se heurte aux protections modernes ASLR, DEP/NX et Canaries.',
      'Metasploit structure l\'attaque en exploits, payloads, modules auxiliaires et sessions de post-exploitation Meterpreter.',
      'Sous Linux, les binaires SUID non nécessaires et les règles sudoers NOPASSWD sont les vecteurs d\'escalade les plus courants.',
      'Sous Windows, les privilèges de jetons applicatifs (SeImpersonate) permettent d\'obtenir les droits SYSTEM via PrintSpoofer.',
      'Le pivoting réseau étend la portée de l\'intrusion en transformant une machine compromise en passerelle de rebond.'
    ],
    checklist: [
      'Je comprends la structure d\'un payload Buffer Overflow avec offset, adresse de retour, NOP sled et shellcode.',
      'Je sais identifier et exploiter les binaires SUID répertoriés dans GTFOBins.',
      'Je maîtrise l\'analyse des failles sudoers NOPASSWD et l\'échappement de shell.',
      'Je sais monter un tunnel de rebond SSH ou Chisel pour pivoter vers un segment interne.'
    ]
  },
  6: {
    notions: [
      { term: 'Persistance', def: 'Mécanisme garantissant la survie d\'un accès après le redémarrage d\'un serveur ou la déconnexion de l\'utilisateur.' },
      { term: 'Web Shell', def: 'Script backdoor déposé sur un serveur web permettant l\'exécution distante de commandes système via HTTP.' },
      { term: 'Timestomping', def: 'Technique d\'anti-forensics modifiant les horodatages MACB d\'un fichier pour le dissimuler parmi les binaires système.' },
      { term: 'Règles Sigma', def: 'Format ouvert et générique de détection de comportements suspects dans les journaux d\'événements SIEM.' },
      { term: 'Executive Summary', def: 'Synthèse managériale non-technique d\'un rapport d\'intrusion exposant le risque global et les impacts métier.' }
    ],
    pitfalls: [
      'Oublier de nettoyer tous les implants, web shells et comptes de test à l\'issue de la mission de pentest.',
      'Rédiger un rapport d\'intrusion exclusivement technique sans synthèse managériale adaptée aux décideurs.',
      'Proposer des recommandations vagues ("Mettre à jour les systèmes") plutôt qu\'un plan d\'action priorisé par horizon.',
      'Tenter un effacement brutal des journaux Windows (wevtutil) déclenchant immédiatement l\'événement d\'alerte 1102.'
    ],
    method: [
      'Évaluer la résilience défensive en testant des mécanismes discrets de persistance (cron, authorized_keys).',
      'Analyser les traces résiduelles dans les journaux d\'événements pour mesurer la visibilité du SOC.',
      'Procéder au nettoyage intégral et documenté de tous les artefacts déposés sur l\'infrastructure client.',
      'Agréger et pondérer l\'ensemble des vulnérabilités découvertes pour calculer la posture de risque global.',
      'Rédiger le rapport de pentest complet avec synthèse managériale, preuves de concept et feuille de route.'
    ],
    summary: [
      'Le maintien de l\'accès exploite des mécanismes de démarrage légitimes (cron, systemd, authorized_keys, clés Run du Registre).',
      'Les web shells dissimulent leur code via des encodages Base64 et des fonctions d\'exécution dynamique (eval, assert).',
      'Les techniques d\'anti-forensics comme le timestomping cherchent à tromper l\'investigation numérique des analystes DFIR.',
      'La Blue Team surveille les activités suspectes grâce aux SIEM/EDR alimentés par des règles Sigma et YARA.',
      'Le rapport d\'intrusion est le livrable fondamental du pentesteur : il articule Executive Summary et fiches techniques détaillées.'
    ],
    checklist: [
      'Je sais auditer et détecter les mécanismes de persistance et les web shells obfusqués.',
      'Je comprends les principes des règles de détection comportementale Sigma et YARA.',
      'Je maîtrise la structure normalisée d\'un rapport de test d\'intrusion professionnel (PTES).',
      'Je sais rédiger une synthèse managériale impactante et structurer un plan de remédiation par horizon.'
    ]
  }
};

for (let chNum = 1; chNum <= 6; chNum++) {
  const filePath = path.join(__dirname, '..', 'server', 'content', 'b3-hacking', `chapitre${chNum}.js`);
  const content = require(filePath);
  const rawObj = Array.isArray(content) ? content[0] : content;
  const meta = METADATA[chNum];

  const questions = (rawObj.qcm || rawObj.questions || []).map(q => ({
    stem: q.question || q.stem,
    opts: q.options || q.opts,
    correct: q.answer !== undefined ? q.answer : q.correct,
    exp: q.explanation || q.exp
  }));

  const flashcards = (rawObj.flashcards || []).map(f => ({
    q: f.front || f.q,
    a: f.back || f.a
  }));

  const updatedObj = {
    n: rawObj.n,
    title: rawObj.title,
    short: rawObj.short,
    toc: rawObj.toc,
    time: rawObj.time,
    free: rawObj.free,
    situation: rawObj.situation,
    objectives: rawObj.objectives,
    sections: rawObj.sections,
    method: meta.method,
    summary: meta.summary,
    checklist: meta.checklist,
    notions: meta.notions,
    pitfalls: meta.pitfalls,
    questions: questions,
    mastery: [
      { cls: 'low', text: '&lt; 50 % — Reprends les sections théoriques et revois les définitions clés.' },
      { cls: 'mid', text: '50–69 % — Pratique les exercices N1 de l\'atelier avant de retenter le test.' },
      { cls: 'good', text: '70–89 % — Bon niveau opérationnel : affine les cas limites et les options d\'outils.' },
      { cls: 'top', text: '≥ 95 % — Maîtrise d\'ingénierie validée : passe au module suivant.' }
    ],
    flashcards: flashcards
  };

  const fileContent = `/**
 * Chapitre ${chNum} du cours « Hacking Éthique & Pentest B3 ».
 */
'use strict';

module.exports = ${JSON.stringify(updatedObj, null, 2)};
`;

  fs.writeFileSync(filePath, fileContent, 'utf8');
  console.log(`[ok] Chapitre ${chNum} mis à jour : ${questions.length} questions, ${flashcards.length} flashcards`);
}

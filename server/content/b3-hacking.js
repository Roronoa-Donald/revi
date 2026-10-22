/**
 * Contenu du cours « Hacking Éthique & Pentest B3 » (dossier `b3-hacking/`).
 *
 * Les données de ce cours sont mises en page par `scripts/generate-courses.js`
 * (voir `scripts/course-kit.js`) : aucune page n'est écrite à la main ici, et
 * aucune page ne doit être éditée à la main dans le dossier b3-hacking/.
 */
'use strict';

const chapitres = [
  ...require('./b3-hacking/chapitres-1-3'),
  ...require('./b3-hacking/chapitres-4-6')
];

const pages = require('./b3-hacking/pages');

const course = {
  id: 'b3-hacking',
  slug: 'b3-hacking',
  brand: 'Hacking Éthique & Pentest B3',
  brandIcon: 'shield',

  // Vert Cyber / Émeraude sombre conforme WCAG AA/AAA (7.03:1 / 15.8:1 sur fond blanc)
  accent: '#065f46',
  accentDeep: '#022c22',
  accentSoft: '#ecfdf5',
  accentBorder: '#a7f3d0',

  storeKey: 'b3hk:progress',

  title: 'Hacking Éthique & Pentest B3 — Cadre Légal &amp; Méthodologie PTES, Reconnaissance OSINT &amp; DNS, Balayage Réseau Nmap, OWASP Top 10 &amp; Injections SQL, Exploitation Système &amp; Élévation de Privilèges, Post-Exploitation, Persistance &amp; Rapport de Pentest',
  description:
    'Formation d’excellence en sécurité offensive et tests d’intrusion professionnels pour le Bachelor 3 : ' +
    'cadre juridique français et international (Code Pénal art. 323-1 à 323-7, RGPD, directive NIS2, lettre de mission et Rules of Engagement contractuelles), typologie des profils d\'attaquants et organisation Red Team / Blue Team / Purple Team, méthodologies de référence (PTES, OSSTMM, OWASP WSTG, NIST SP 800-115), séquençage canonique des 5 phases du piratage éthique, modélisation de la Cyber Kill Chain de Lockheed Martin, matrice MITRE ATT&CK et calcul mathématique des scores de vulnérabilités selon CVSS v3.1 Base Metrics, ' +
    'reconnaissance passive et collecte de renseignements en sources ouvertes (OSINT, registres Whois/RIR, theHarvester, archives Wayback Machine, requêtes ciblées Google Dorking, moteurs spécialisés Shodan et Censys), cartographie DNS approfondie (enregistrements A, MX, NS, TXT, analyse et exploitation des failles de transfert de zone AXFR), sécurité de la messagerie contre le spoofing (mécanismes SPF, DKIM et DMARC), énumération de sous-domaines par dictionnaire et Certificate Transparency logs (crt.sh), et filtrage des faux positifs causés par les résolutions DNS wildcard, ' +
    'balayage réseau et énumération de services (cycle de vie des paquets TCP et RFC 793, poignée de mains 3-way, techniques de sondes Nmap avec SYN Stealth -sS, TCP Connect -sT, UDP -sU, scans furtifs FIN -sF, Null -sN, Xmas -sX et ACK -sA pour cartographier les pare-feux avec état), empreinte de système d\'exploitation (OS fingerprinting par analyse du TTL initial, de la taille de fenêtre TCP et des options MSS/SACK), extraction de bannières logicielles (-sV), énumération approfondie des protocoles d\'infrastructure (sessions nulles SMB sur ports 139/445, communautés SNMP MIB-2 publiques et privées sur port 161 UDP), et cartographie des vulnérabilités via Nmap Scripting Engine (NSE) et scanners automatisés (Nessus, OpenVAS), ' +
    'exploitation des failles web critiques de l\'OWASP Top 10 (défaillances de contrôle d\'accès A01 et références directes non sécurisées IDOR, exploitation complète des injections SQL in-band UNION-based, inférentielles aveugles booléennes et temporelles avec fonctions SLEEP conditionnelles, requêtes empilées et remédiation définitive par requêtes préparées avec liaisons de paramètres), vulnérabilités côté client (Cross-Site Scripting XSS stockée, réfléchie et DOM-based, vol de cookies de session et parade HttpOnly/CSP, attaques CSRF et jetons SameSite), vulnérabilités serveur critiques (SSRF ciblant l\'API de métadonnées Cloud 169.254.169.254, injection de commandes OS et désérialisation non sécurisée), traversées de répertoires (Path Traversal / Local File Inclusion LFI / Remote File Inclusion RFI) avec contournements d\'encodage URL, et maîtrise des outils d\'audit web (Burp Suite Proxy, Repeater, Intruder, sqlmap et fuzzer ffuf), ' +
    'exploitation système bas niveau et escalade de privilèges (architecture de la mémoire de processus, pile d\'exécution, mécanique d\'un Stack Buffer Overflow sur x86/x64, écrasement du pointeur de retour EIP/RIP, NOP sled, shellcode et mécanismes de protection matérielle et logicielle ASLR, DEP/NX et Stack Canaries), automatisation avec Metasploit Framework (MSFConsole, distinction entre payloads stagés et inline, manipulation de sessions Meterpreter), élévation de privilèges sous Linux (audit et détournement de binaires SUID via le catalogue GTFOBins, configurations sudoers permissives NOPASSWD, crontabs modifiables), élévation sous Windows (chemins de services non quotés Unquoted Service Paths, abus de privilèges de jetons de services SeImpersonatePrivilege via PrintSpoofer/SweetPotato), et techniques de pivoting réseau et mouvement latéral (tunnels SSH port forwarding local, distant et dynamique SOCKS, et tunneling HTTP chiffré via Chisel), ' +
    'et enfin maintien de l\'accès, post-exploitation et rédaction du rapport d\'intrusion (mécanismes de persistance sous Linux via cron, systemd et authorized_keys, persistance Windows via clés de registre Run/RunOnce et tâches planifiées, détection et désobfusquation de web shells PHP/JSP exploitant eval et base64, techniques de dissimulation et d\'anti-forensics avec timestomping et manipulation de logs, détection défensive de la Blue Team via SIEM, EDR, règles Sigma et signatures YARA, protocole éthique de nettoyage intégral des implants, et structure normalisée du rapport de test d\'intrusion avec synthèse managériale vulgarisée, fiches techniques de vulnérabilités avec preuves de concept éthiques et plan de remédiation priorisé par horizon).',
  lead:
    'Maîtrisez la sécurité offensive et les tests d’intrusion professionnels : cadre légal, méthodologie PTES, reconnaissance OSINT, balayage réseau Nmap, OWASP Top 10, exploitation système, élévation de privilèges Linux/Windows, persistance et rapport managérial. ' +
    'Six modules complets, 18 exercices interactifs de code de manière méthodique et 48 QCM d’évaluation.',

  sources: 'Programme officiel Certified Ethical Hacker (CEH v12), Référentiels PTES (Penetration Testing Execution Standard), OWASP Web Security Testing Guide (WSTG v4.2), NIST SP 800-115, Documentation GTFOBins & MITRE ATT&CK',

  chapters: chapitres.map(chapitre => ({ n: chapitre.n, title: chapitre.title })),

  render(kit) {
    return pages.render(kit, course, chapitres);
  }
};

module.exports = course;

/**
 * Chapitre 1 du cours « Hacking Éthique & Pentest B3 ».
 */
'use strict';

module.exports = {
  "n": 1,
  "title": "Fondements du Hacking Éthique, Cadre Légal & Méthodologies de Pentest",
  "short": "Fondements, Cadre Légal &amp; Méthodologies",
  "toc": "Définitions et philosophie du hacking éthique, cadre juridique pénal français et international (Code Pénal art. 323-1 à 323-7, RGPD, directive NIS2), contractualisation et Règles d'Engagement (RoE), typologie des profils et organisation Red/Blue/Purple Team, méthodologies de référence (PTES, OSSTMM, OWASP WSTG, NIST SP 800-115), les 5 phases du test d'intrusion et modélisation Cyber Kill Chain / MITRE ATT&CK / CVSS v3.1.",
  "time": "≈ 2 h 45 de travail",
  "free": true,
  "situation": "Lorsqu'une entreprise sollicite un audit de sécurité offensif ou lorsqu'un ingénieur en cybersécurité découvre une vulnérabilité sur un système d'information, la frontière entre action éthique salutaire et infraction pénale lourde est strictement délimitée par la loi. Agir sans mandat formel, dépasser le périmètre convenu ou causer une indisponibilité de service expose l'auditeur à des poursuites judiciaires directes. En tant qu'expert en cybersécurité B3, vous devez maîtriser le cadre juridique impératif, concevoir des conventions de mandat irréprochables et appliquer les méthodologies offensives standardisées pour cadrer vos missions d'intrusion professionnelles.",
  "objectives": [
    "maîtriser le cadre légal français de la cybercriminalité (Code Pénal art. 323-1 à 323-7) et les réglementations européennes (RGPD, NIS2) ;",
    "rédiger des règles d'engagement contractuelles (Rules of Engagement - RoE) définissant périmètre, fenêtres horaires et techniques autorisées ;",
    "différencier les profils d'attaquants (White, Black, Grey Hat) et structurer les exercices Red Team, Blue Team et Purple Team ;",
    "appliquer les grandes méthodologies professionnelles d'audit : PTES, OSSTMM, OWASP WSTG et NIST SP 800-115 ;",
    "décomposer une intrusion selon les 5 phases canoniques du CEH et la Cyber Kill Chain de Lockheed Martin ;",
    "calculer et classifier rigoureusement la sévérité des vulnérabilités selon le standard CVSS v3.1 Base Metrics."
  ],
  "sections": [
    {
      "title": "Cadre Juridique et Responsabilité Pénale de l'Auditeur de Sécurité",
      "html": "<p>En droit français, l'accès et le maintien dans un système informatique sans autorisation préalable constituent des délits pénaux passibles d'amendes et d'emprisonnement, quelle que soit la bienveillance supposée de l'auditeur :</p>\n<div class=\"grid grid-2\">\n  <div class=\"card\">\n    <h4>Article 323-1 du Code Pénal</h4>\n    <p>Le fait d'accéder ou de se maintenir frauduleusement dans tout ou partie d'un système de traitement automatisé de données (STAD) est puni de <strong>3 ans d'emprisonnement et 100 000 € d'amende</strong>.</p>\n    <p>Si cet accès entraîne la suppression, la modification de données ou l'altération du fonctionnement du système, la peine est portée à <strong>5 ans d'emprisonnement et 150 000 € d'amende</strong>.</p>\n  </div>\n  <div class=\"card\">\n    <h4>Articles 323-2 et 323-3-1</h4>\n    <p>L'entrave ou l'altération du fonctionnement d'un STAD (ex: déni de service DoS) est punie de <strong>5 ans d'emprisonnement et 150 000 € d'amende</strong> (portée à 7 ans si commise contre un système de l'État).</p>\n    <p>L'article 323-3-1 réprime la détention, mise à disposition ou diffusion d'outils conçus ou spécialement adaptés pour commettre de telles atteintes sans motif légitime.</p>\n  </div>\n</div>\n  <div class=\"box box--standard\">\n    <div class=\"box__title\"><svg class=\"ic\" aria-hidden=\"true\" focusable=\"false\"><use href=\"/assets/img/ui-icons.svg#i-info\"></use></svg> L'Obligation du Mandat Écrit : La Lettre de Mission et les Rules of Engagement (RoE)</div>\n<p>Pour qu'un test d'intrusion soit qualifié d'éthique et légal, un contrat écrit signé par le représentant légal de l'entité propriétaire des systèmes est strictement obligatoire avant tout envoi de sonde :</p>,<ul>,  <li><strong>Périmètre explicite (Scope) :</strong> liste exhaustive des adresses IP, blocs CIDR, noms de domaine et URLs cibles autorisés. Tout système tiers (hébergeur, CDN partagé, filiale hors contrat) est formellement exclu.</li>,  <li><strong>Techniques proscrites :</strong> interdiction contractuelle des attaques par déni de service (DoS/DDoS), de l'ingénierie sociale physique non convenue, ou de l'exploitation destructive altérant l'intégrité des bases de production.</li>,  <li><strong>Fenêtres d'audit (Time Windows) :</strong> créneaux horaires spécifiques pour limiter les impacts opérationnels (ex: nuits ou week-ends pour les tests intrusifs).</li>,  <li><strong>Protocole d'escalade d'urgence :</strong> contact téléphonique immédiat 24/7 en cas de découverte d'une faille critique active ou de compromission avérée par un tiers malveillant.</li>,</ul>\n  </div>"
    },
    {
      "title": "Typologie des Acteurs et Organisation des Équipes de Sécurité",
      "html": "<p>Le monde de la sécurité offensive et défensive s'articule autour de rôles standardisés :</p>\n<table class=\"table\">\n  <thead><tr><th>Catégorie</th><th>Motivation &amp; Éthique</th><th>Cadre Légal</th><th>Objectifs Typiques</th></tr></thead>\n  <tbody>\n    <tr><td><strong>White Hat (Hacker Éthique)</strong></td><td>Protection, amélioration de la résilience, divulgation responsable</td><td>Mandat contractuel formel</td><td>Identification des failles, tests d'intrusion, remédiation</td></tr>\n    <tr><td><strong>Black Hat (Cybercriminel)</strong></td><td>Gain financier, espionnage, rançon, sabotage, idéologie</td><td>Illégal (Infraction pénale)</td><td>Exfiltration de données, ransomware, vente d'accès sur le darknet</td></tr>\n    <tr><td><strong>Grey Hat</strong></td><td>Curiosité, notoriété, sans intention malveillante immédiate</td><td>Illégal (Faute pénale sans mandat)</td><td>Recherche non sollicitée, chantage à la divulgation publique</td></tr>\n    <tr><td><strong>Script Kiddie</strong></td><td>Recherche de statut, opportunisme sans réelle expertise technique</td><td>Illégal</td><td>Utilisation aveugle d'outils automatisés préexistants</td></tr>\n  </tbody>\n</table>\n<div class=\"grid grid-3\">\n  <div class=\"card\">\n    <h4>Red Team (Offensive)</h4>\n    <p>Simule un adversaire réaliste (APT) sur la durée pour éprouver l'ensemble des défenses humaines, physiques et logiques d'une organisation.</p>\n  </div>\n  <div class=\"card\">\n    <h4>Blue Team (Défensive)</h4>\n    <p>Opérateurs du SOC (Security Operations Center), analystes de détection, ingénieurs SIEM/EDR et spécialistes de réponse aux incidents (DFIR).</p>\n  </div>\n  <div class=\"card\">\n    <h4>Purple Team (Collaborative)</h4>\n    <p>Approche collaborative synchronisant Red et Blue Teams en temps réel pour optimiser la détection des scénarios d'attaque et fermer les angles morts.</p>\n  </div>\n</div>"
    },
    {
      "title": "Méthodologies Standardisées de Test d'Intrusion (PTES, OSSTMM, OWASP)",
      "html": "<p>Un test d'intrusion professionnel ne repose jamais sur l'improvisation mais sur des méthodologies industrielles reconnues mondialement :</p>\n<ul>\n  <li><strong>PTES (Penetration Testing Execution Standard) :</strong> standard de référence structuré en 7 phases : interactions pré-engagement, collecte de renseignements, modélisation des menaces, analyse des vulnérabilités, exploitation, post-exploitation et reporting.</li>\n  <li><strong>OSSTMM (Open Source Security Testing Methodology Manual) :</strong> approche scientifique et quantifiable mesurant la porosité opérationnelle (Operational Security metrics) à travers 5 canaux (données, télécoms, réseau, physique, humain).</li>\n  <li><strong>OWASP WSTG (Web Security Testing Guide) :</strong> guide méthodologique de référence mondiale pour l'audit de sécurité des applications et API web, aligné sur l'OWASP Top 10.</li>\n  <li><strong>NIST SP 800-115 :</strong> guide officiel du gouvernement américain pour la planification et l'exécution des évaluations de sécurité technique.</li>\n</ul>\n  <div class=\"box box--standard\">\n    <div class=\"box__title\"><svg class=\"ic\" aria-hidden=\"true\" focusable=\"false\"><use href=\"/assets/img/ui-icons.svg#i-info\"></use></svg> Les Modes d'Audit : Boîte Noire, Boîte Grise et Boîte Blanche</div>\n<p>Selon les informations et privilèges transmis à l'auditeur avant la mission :</p>,<ul>,  <li><strong>Black Box (Boîte Noire) :</strong> zéro connaissance préalable. L'auditeur simule un attaquant externe découvrant la cible à partir de zéro. Temps de reconnaissance élevé.</li>,  <li><strong>Grey Box (Boîte Grise) :</strong> connaissances partielles (compte utilisateur standard, architecture réseau générale). Scénario le plus fréquent simulant un collaborateur malveillant ou un compte utilisateur compromis.</li>,  <li><strong>White Box (Boîte Blanche) :</strong> accès exhaustif (codes sources, schémas d'architecture détaillés, comptes administrateurs). Permet une analyse exhaustive et la détection de vulnérabilités enfouies.</li>,</ul>\n  </div>"
    },
    {
      "title": "Les 5 Phases Canoniques du CEH et la Cyber Kill Chain",
      "html": "<p>Le cursus Certified Ethical Hacker (CEH) structure l'ensemble des opérations offensives en 5 phases séquentielles strictes :</p>\n<div class=\"grid grid-3\">\n  <div class=\"card\">\n    <h4>Phase 1 : Reconnaissance</h4>\n    <p>Collecte d'informations passives (OSINT, Whois, DNS) et actives sur la cible pour cartographier la surface d'attaque sans déclencher d'alerte.</p>\n  </div>\n  <div class=\"card\">\n    <h4>Phase 2 : Scanning</h4>\n    <p>Balayage réseau actif : détection d'hôtes actifs, de ports ouverts, de bannières de services (Nmap) et d'arborescences web.</p>\n  </div>\n  <div class=\"card\">\n    <h4>Phase 3 : Gaining Access</h4>\n    <p>Exploitation technique d'une vulnérabilité identifiée pour obtenir un accès initial (exécution de code, shell distant, contournement d'authentification).</p>\n  </div>\n</div>\n<div class=\"grid grid-2\" style=\"margin-top:1rem;\">\n  <div class=\"card\">\n    <h4>Phase 4 : Maintaining Access</h4>\n    <p>Élévation de privilèges vers root / SYSTEM, installation de mécanismes de persistance discrets (backdoors, web shells, tâches cron) et pivoting latéral.</p>\n  </div>\n  <div class=\"card\">\n    <h4>Phase 5 : Clearing Tracks</h4>\n    <p>Évaluation des capacités de détection de la Blue Team, analyse des traces laissées dans les logs (anti-forensics) et nettoyage complet de tous les implants déposés.</p>\n  </div>\n</div>\n<p>Le modèle <strong>Cyber Kill Chain</strong> (Lockheed Martin) prolonge ce séquençage en 7 maillons tactiques : <em>Reconnaissance &rarr; Weaponization &rarr; Delivery &rarr; Exploitation &rarr; Installation &rarr; Command &amp; Control (C2) &rarr; Actions on Objectives</em>. Rompre un seul maillon neutralise l'attaque.</p>"
    },
    {
      "title": "Notation des Vulnérabilités selon le Standard CVSS v3.1 Base Metrics",
      "html": "<p>Le standard CVSS v3.1 fournit une méthode ouverte et normalisée pour qualifier mathématiquement la gravité d'une vulnérabilité de sécurité :</p>\n<table class=\"table\">\n  <thead><tr><th>Métrique</th><th>Signification</th><th>Options Fréquentes</th></tr></thead>\n  <tbody>\n    <tr><td><strong>Attack Vector (AV)</strong></td><td>Vecteur physique ou logique d'accès</td><td>Network (0.85), Adjacent (0.62), Local (0.55), Physical (0.20)</td></tr>\n    <tr><td><strong>Attack Complexity (AC)</strong></td><td>Conditions préalables et complexité</td><td>Low (0.77), High (0.44)</td></tr>\n    <tr><td><strong>Privileges Required (PR)</strong></td><td>Niveau d'authentification nécessaire</td><td>None (0.85), Low (0.62), High (0.27) [Scope U]</td></tr>\n    <tr><td><strong>User Interaction (UI)</strong></td><td>Action requise d'une victime légitime</td><td>None (0.85), Required (0.62)</td></tr>\n    <tr><td><strong>Scope (S)</strong></td><td>Propagation à un autre contexte de sécurité</td><td>Unchanged (U), Changed (C)</td></tr>\n    <tr><td><strong>Impact (C / I / A)</strong></td><td>Confidentialité, Intégrité, Disponibilité</td><td>None (0.0), Low (0.22), High (0.56)</td></tr>\n  </tbody>\n</table>\n<p>Un score CVSS v3.1 de <strong>9.0 à 10.0</strong> est classé comme <code>CRITICAL</code> (ex: RCE à distance sans authentification), de <strong>7.0 à 8.9</strong> comme <code>HIGH</code>, de <strong>4.0 à 6.9</strong> comme <code>MEDIUM</code>, et inférieur à 4.0 comme <code>LOW</code>.</p>"
    }
  ],
  "method": [
    "Établir et faire signer la convention de mandat et la lettre de mission avec la liste exhaustive des IP et domaines cibles.",
    "Définir les règles d'engagement (RoE) avec les contacts d'urgence et les techniques exclues.",
    "Cartographier le périmètre technique et vérifier la propriété des adresses IP cibles (Whois, ASN).",
    "Évaluer et qualifier chaque vulnérabilité découverte selon le standard CVSS v3.1 Base Metrics.",
    "Rédiger le rapport d'intrusion avec fiches techniques de vulnérabilités et synthèse managériale."
  ],
  "summary": [
    "Le cadre juridique français (Code Pénal art. 323-1 à 323-7) réprime l'accès frauduleux d'amendes et d'emprisonnement sans mandat écrit formel.",
    "Les Règles d'Engagement (RoE) cadrent strictement le périmètre IP, les horaires et les techniques autorisées pour protéger l'auditeur.",
    "Les 5 phases du CEH structurent la mission : Reconnaissance, Scanning, Gaining Access, Maintaining Access, Clearing Tracks.",
    "La Cyber Kill Chain découpe l'attaque en 7 maillons : casser un seul maillon suffit à neutraliser l'intrusion.",
    "Le score CVSS v3.1 quantifie la sévérité (Critical >= 9.0, High >= 7.0, Medium >= 4.0, Low < 4.0)."
  ],
  "checklist": [
    "Je connais les peines de l'article 323-1 du Code Pénal et les exigences contractuelles de la lettre de mission.",
    "Je sais rédiger des Rules of Engagement (RoE) exhaustives avec clauses d'exclusion et protocoles d'urgence.",
    "Je maîtrise les 5 phases du piratage éthique CEH et les 7 étapes de la Cyber Kill Chain.",
    "Je sais calculer et justifier un score CVSS v3.1 Base Metrics avec ses composantes Exploitabilité et Impact."
  ],
  "notions": [
    {
      "term": "STAD (Système de Traitement Automatisé)",
      "def": "Ensemble informatique assurant le traitement, la transmission ou le stockage automatisé de données numériques au sens de l'article 323-1 du Code Pénal."
    },
    {
      "term": "Rules of Engagement (RoE)",
      "def": "Document contractuel formel fixant les limites strictes, les adresses IP autorisées, les techniques proscrites et les fenêtres horaires d'un test d'intrusion."
    },
    {
      "term": "CVSS v3.1 Base Metrics",
      "def": "Standard ouvert évaluant la sévérité intrinsèque d'une vulnérabilité (exploitabilité et impact) sur une échelle de 0.0 à 10.0."
    },
    {
      "term": "Cyber Kill Chain",
      "def": "Modèle en 7 phases formalisant la progression d'une cyberattaque ciblée de la reconnaissance à l'action sur objectifs."
    },
    {
      "term": "Red Team vs Blue Team",
      "def": "La Red Team émule les attaquants réels sans préavis, tandis que la Blue Team assure la détection, la surveillance SOC et la défense en temps réel."
    }
  ],
  "pitfalls": [
    "Lancer des sondes réseau sans lettre de mission écrite et signée par le représentant légal de l'entité cible (délit pénal art. 323-1).",
    "Dépasser le périmètre d'adresses IP spécifié dans les Rules of Engagement (risque d'attaque illégale d'un système tiers hébergé).",
    "Réaliser des attaques de déni de service (DoS/DDoS) destructrices non prévues contractuellement.",
    "Sous-estimer une vulnérabilité locale complexe alors qu'elle s'intègre dans une chaîne d'exploitation critique."
  ],
  "questions": [
    {
      "stem": "En droit pénal français, quel article réprime spécifiquement l'accès ou le maintien frauduleux dans un système de traitement automatisé de données (STAD) ?",
      "opts": [
        "L'article 323-1 du Code Pénal",
        "L'article 1382 du Code Civil",
        "L'article L. 111-1 du Code de la Propriété Intellectuelle",
        "L'article 226-16 du Code de Procédure Pénale"
      ],
      "correct": 0,
      "exp": "L'article 323-1 du Code Pénal sanctionne l'accès ou le maintien frauduleux dans un STAD de 3 ans de prison et 100 000 € d'amende (5 ans et 150 000 € en cas de modification de données)."
    },
    {
      "stem": "Quelle condition juridique impérative protège l'auditeur de sécurité de poursuites pénales lors d'un test d'intrusion ?",
      "opts": [
        "La signature formelle d'une lettre de mission et de Règles d'Engagement (RoE) par le représentant légal de l'entité cible",
        "Un accord oral informel donné par le directeur technique de l'entreprise",
        "L'utilisation exclusive d'outils open-source réputés sans exploitation de failles",
        "L'avertissement préalable de la police par simple courriel d'information"
      ],
      "correct": 0,
      "exp": "Seule une convention contractuelle écrite (lettre de mission / RoE) signée par l'autorité légitime propriétaire des systèmes constitue un ordre et une autorisation juridique protégeant l'auditeur."
    },
    {
      "stem": "Quelle est la principale caractéristique d'un test d'intrusion conduit en mode \"Boîte Grise\" (Grey Box) ?",
      "opts": [
        "L'auditeur dispose d'informations partielles, comme un compte utilisateur standard et un plan d'architecture haut niveau",
        "L'auditeur ne dispose d'absolument aucune information et commence en aveugle",
        "L'auditeur possède un accès complet à l'ensemble des codes sources et comptes administrateurs",
        "L'audit s'effectue exclusivement depuis l'extérieur sans aucun paquet réseau transmis"
      ],
      "correct": 0,
      "exp": "Le mode Boîte Grise (Grey Box) fournit un accès restreint (compte standard) pour simuler le scénario le plus réaliste : un employé ou un utilisateur externe dont le compte a été compromis."
    },
    {
      "stem": "Quelle est la différence méthodologique fondamentale entre une équipe \"Red Team\" et un pentest classique ponctuel ?",
      "opts": [
        "La Red Team simule un adversaire ciblé (APT) dans la durée en testant l'ensemble des défenses physiques, logiques et humaines sans avertir la Blue Team",
        "La Red Team se limite uniquement à la recherche de vulnérabilités sur les applications web sans jamais tenter d'accès système",
        "La Red Team est une équipe d'analystes défensifs chargés de surveiller les tableaux de bord SIEM",
        "La Red Team n'a pas le droit d'utiliser d'exploits et se contente d'audits documentaires"
      ],
      "correct": 0,
      "exp": "Une Red Team simule une menace avancée persistante (APT) dans des conditions réelles pour évaluer la capacité globale de détection et de réaction de l'organisation (SOC/Blue Team)."
    },
    {
      "stem": "Dans les 5 phases du piratage éthique (CEH), quelle phase intervient immédiatement après la Reconnaissance et avant l'Obtention d'Accès ?",
      "opts": [
        "Le Scanning (Balayage réseau et énumération de services)",
        "Le Maintien de l'accès (Maintaining Access)",
        "L'Effacement des traces (Clearing Tracks)",
        "La Rédaction du rapport d'audit"
      ],
      "correct": 0,
      "exp": "La phase de Scanning (balayage) succède à la reconnaissance pour cartographier les hôtes actifs, les ports ouverts et les bannières logicielles avant toute tentative d'exploitation."
    },
    {
      "stem": "Quelle phase de la Cyber Kill Chain de Lockheed Martin correspond à la création d'une charge utile malveillante couplée à un vecteur d'infection ?",
      "opts": [
        "Weaponization (Arsenalisation)",
        "Reconnaissance",
        "Delivery (Livraison)",
        "Command & Control (C2)"
      ],
      "correct": 0,
      "exp": "La Weaponization (arsenalisation) consiste à associer un exploit à une charge utile (payload) au sein d'un vecteur distribuable (ex: document piégé ou exécutable)."
    },
    {
      "stem": "Selon le standard CVSS v3.1, quelle note minimale qualifie une vulnérabilité de niveau \"CRITICAL\" ?",
      "opts": [
        "9.0",
        "7.0",
        "8.0",
        "10.0 uniquement"
      ],
      "correct": 0,
      "exp": "La classification qualitative CVSS v3.1 définit le niveau CRITICAL pour tout score de base compris entre 9.0 et 10.0 (High : 7.0 à 8.9, Medium : 4.0 à 6.9, Low : 0.1 à 3.9)."
    },
    {
      "stem": "Pourquoi le standard méthodologique PTES (Penetration Testing Execution Standard) insiste-t-il sur la phase de post-exploitation ?",
      "opts": [
        "Pour démontrer la valeur métier et l'impact réel de la compromission (données sensibles atteignables, chemins de pivoting) plutôt que de s'arrêter au simple accès shell",
        "Pour effacer définitivement toutes les données de l'entreprise cliente afin de tester les sauvegardes",
        "Pour installer des logiciels malveillants permanents monétisables par l'auditeur",
        "Pour éviter de rédiger le rapport final d'intrusion"
      ],
      "correct": 0,
      "exp": "La post-exploitation évalue la criticité réelle pour le métier : quelles données critiques sont exposées, quels serveurs internes peuvent être atteints par rebond, et quel est le risque opérationnel."
    }
  ],
  "mastery": [
    {
      "cls": "low",
      "text": "&lt; 50 % — Reprends les sections théoriques et revois les définitions clés."
    },
    {
      "cls": "mid",
      "text": "50–69 % — Pratique les exercices N1 de l'atelier avant de retenter le test."
    },
    {
      "cls": "good",
      "text": "70–89 % — Bon niveau opérationnel : affine les cas limites et les options d'outils."
    },
    {
      "cls": "top",
      "text": "≥ 95 % — Maîtrise d'ingénierie validée : passe au module suivant."
    }
  ],
  "flashcards": [
    {
      "q": "Quelle infraction pénale sanctionne l'article 323-1 du Code Pénal français ?",
      "a": "L'accès ou le maintien frauduleux dans tout ou partie d'un système de traitement automatisé de données (STAD), puni de 3 à 5 ans de prison et 100 000 à 150 000 € d'amende."
    },
    {
      "q": "Quelles sont les 5 phases canoniques du hacking éthique selon le référentiel CEH ?",
      "a": "1. Reconnaissance, 2. Scanning (Balayage), 3. Gaining Access (Exploitation), 4. Maintaining Access (Maintien), 5. Clearing Tracks (Dissimulation/Nettoyage)."
    },
    {
      "q": "Quelles sont les 7 étapes séquentielles de la Cyber Kill Chain de Lockheed Martin ?",
      "a": "1. Reconnaissance, 2. Weaponization, 3. Delivery, 4. Exploitation, 5. Installation, 6. Command & Control (C2), 7. Actions on Objectives."
    },
    {
      "q": "Quelle est la différence clé entre un audit Black Box et un audit Grey Box ?",
      "a": "Black Box : aucune information préalable (simule un attaquant externe). Grey Box : accès partiel (compte standard, schémas généraux) simulant un collaborateur ou un compte compromis."
    },
    {
      "q": "Quelles sont les 4 tranches de sévérité du standard de notation CVSS v3.1 ?",
      "a": "0.1 à 3.9 : LOW | 4.0 à 6.9 : MEDIUM | 7.0 à 8.9 : HIGH | 9.0 à 10.0 : CRITICAL (0.0 correspond à NONE)."
    },
    {
      "q": "Quel est l'objectif d'un exercice \"Purple Team\" en cybersécurité ?",
      "a": "Faire collaborer la Red Team (offensive) et la Blue Team (défensive) en temps réel afin d'optimiser la détection des scénarios d'attaque et combler les lacunes de visibilité."
    }
  ]
};

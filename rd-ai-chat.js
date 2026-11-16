/**
 * RD-AI Chat Widget — Assistant pédagogique intelligent
 * Intégré au Portail des Cours Interactifs (71 cours actifs : 24 B1, 24 B2, 23 B3)
 * Streaming SSE, localStorage, résolution dynamique de contexte, thème Stitch (clair/sombre)
 */
(function (root) {
    'use strict';

    // ================================================================
    // 1. CONFIGURATION
    // ================================================================
    const CONFIG = {
        apiUrl: '/api/ai-chat',
        model: 'deepseek/deepseek-chat',
        maxTokens: 2048,
        temperature: 0.7,
        maxHistory: 20
    };

    const WHATSAPP_NUMBER = '22896272034';
    const WHATSAPP_MESSAGE = encodeURIComponent("Bonjour ! Je vous contacte depuis le Portail des Cours Interactifs (B1, B2, B3). J'ai une question.");

    // ================================================================
    // 2. CATALOGUE DES COURS (synchronisé avec server/courses.js)
    // ================================================================
    const LEVEL_LABELS = {
        b1: 'Licence 1 (B1)',
        b2: 'Licence 2 (B2)',
        b3: 'Licence 3 (B3)',
        all: 'Licence 1, 2 et 3 (B1, B2, B3)'
    };

    const COURSE_CATALOG = {
        // B2 — 24 cours
        'linux': { name: 'Administration Linux', level: 'b2', summary: 'Commandes Debian/Linux, système de fichiers, permissions rwx/chmod/chown, éditeurs, utilisateurs, réseau, SSH et scripting Bash.' },
        'php': { name: 'PHP', level: 'b2', summary: 'Programmation Orientée Objet en PHP : classes, encapsulation, héritage, interfaces, traits, namespaces PSR-4, Composer, PDO et MVC.' },
        'probabilites': { name: 'Probabilités', level: 'b2', summary: 'Dénombrement, variables aléatoires discrètes et continues, lois classiques (binomiale, Poisson, normale, exponentielle), espérance, variance et théorème central limite.' },
        'rd_java': { name: 'Java', level: 'b2', summary: 'Fondamentaux Java et POO : types, structures de contrôle, tableaux, classes, encapsulation, héritage, polymorphisme, interfaces et collections.' },
        'rd_winserver': { name: 'Windows Server', level: 'b2', summary: 'Administration Windows Server : Active Directory (AD DS), GPO, DNS, DHCP, partages SMB/NTFS, sauvegarde, haute disponibilité et Hyper-V.' },
        'admin-vm': { name: 'Administration des Machines Virtuelles', level: 'b2', summary: 'Hyperviseurs Type 1 et Type 2, virtualisation serveur, snapshots, stockage virtuel, réseaux virtuels, migration et automatisation PowerShell.' },
        'droit': { name: 'Droit Informatique', level: 'b2', summary: 'Protection des données personnelles (RGPD), propriété intellectuelle du logiciel, contrats IT, responsabilité numérique et cybersécurité juridique.' },
        'react': { name: 'React', level: 'b2', summary: 'Composants fonctionnels, JSX, props, state (useState, useEffect), hooks personnalisés, routage, gestion d’état et consommation d’API.' },
        'api-rest-flask': { name: 'API REST avec Flask', level: 'b2', summary: 'Conception d’API RESTful en Python avec Flask : routes, sérialisation JSON, codes HTTP, authentification JWT, SQLAlchemy et tests d’API.' },
        'erp-si': { name: 'ERP & SI', level: 'b2', summary: 'Systèmes d’Information, progiciels de gestion intégrés (ERP), processus métiers (achats, stocks, ventes, comptabilité), urbanisation du SI.' },
        'ingenierie-besoin': { name: 'Ingénierie du besoin', level: 'b2', summary: 'Recueil et analyse des besoins, exigences fonctionnelles et non fonctionnelles, cas d’utilisation, user stories, cahier des charges et validation.' },
        'masterclass-apprendre': { name: 'Masterclass Apprendre a apprendre', level: 'b2', summary: 'Méthodes cognitives d’apprentissage : rappel actif, répétition espacée, méthode Feynman, gestion de l’attention et résolution de problèmes.' },
        'RD-RO': { name: 'Recherche Opérationnelle', level: 'b2', summary: 'Programmation linéaire, méthode du Simplexe, dualité, problèmes de transport et d’affectation (méthode Hongroise), graphes PERT/CPM et files d’attente.' },
        'assembleur': { name: 'Assembleur', level: 'b2', summary: 'Architecture processeur, registres, jeu d’instructions, modes d’adressage, pile, appels système, drapeaux (flags) et boucle d’exécution.' },
        'Cyber securite B2': { name: 'Cybersecurite B2', level: 'b2', summary: 'Principes CIA, analyse des menaces, durcissement système, cryptographie appliquée, sécurité réseau, pare-feu, détection d’incidents et OWASP.' },
        'sql': { name: 'SQL', level: 'b2', summary: 'Bases de données relationnelles : DDL, contraintes, DML, SELECT avancé, jointures, agrégations, fonctions, transactions ACID, procédures stockées et triggers.' },
        'csharp': { name: 'C#', level: 'b2', summary: 'Langage C# et plateforme .NET : typage fort, POO, propriétés, génériques, LINQ, gestion des exceptions et programmation asynchrone.' },
        'ccna': { name: 'CCNA Réseau', level: 'b2', summary: 'Commutation Ethernet, VLAN, trunking 802.1Q, Spanning Tree, routage inter-VLAN, routage statique et dynamique OSPF, ACL, NAT et DHCP.' },
        'uml': { name: 'UML', level: 'b2', summary: 'Modélisation orientée objet UML : diagrammes de cas d’utilisation, de classes, de séquence, d’états-transitions, d’activités et d’architecture.' },
        'uiux': { name: 'UI/UX Design', level: 'b2', summary: 'Recherche utilisateur, personas, parcours, architecture de l’information, wireframing, hiérarchie visuelle, design systems et accessibilité WCAG.' },
        'docker': { name: 'Docker', level: 'b2', summary: 'Conteneurisation : images, conteneurs, Dockerfile multi-stage, volumes, réseaux Docker, Docker Compose, registres et sécurité des conteneurs.' },
        'infographie': { name: 'Infographie', level: 'b2', summary: 'Image matricielle et vectorielle, espaces colorimétriques (RVB, CMJN), typographie, composition visuelle, formats graphiques et pipeline de rendu.' },
        'preparation-web': { name: 'Preparation Web', level: 'b2', summary: 'Atelier de préparation aux projets web : intégration HTML/CSS/JS, architecture front-end/back-end et déploiement.' },
        'epreuves': { name: 'Épreuves Passées', level: 'b2', summary: 'Annales et sujets d’examen corrigés pour l’entraînement et la préparation aux évaluations.' },

        // B1 — 24 cours actifs
        'b1-admin-windows': { name: 'Administration Windows', level: 'b1', summary: 'Fondamentaux de l’administration système, installation de Windows Server, configuration initiale et introduction à Active Directory (AD DS).' },
        'b1-algebre': { name: 'Algèbre linéaire', level: 'b1', summary: 'Espaces vectoriels, matrices, déterminants, systèmes d’équations linéaires (pivot de Gauss), applications linéaires et diagonalisation.' },
        'b1-algo': { name: 'Algorithmique', level: 'b1', summary: 'Variables, structures conditionnelles, boucles, tableaux, fonctions, récursivité, algorithmes de recherche et de tri, complexité.' },
        'b1-anglais': { name: 'Anglais des affaires', level: 'b1', summary: 'Communication professionnelle en anglais, vocabulaire IT et entreprise, rédaction d’e-mails, présentations et réunions techniques.' },
        'b1-reseaux': { name: 'Architecture des réseaux', level: 'b1', summary: 'Modèles OSI et TCP/IP, encapsulation, adressage IPv4 et sous-réseaux (CIDR/VLSM), Ethernet, ARP, commutation et routage de base.' },
        'b1-bureautique': { name: 'Bureautique', level: 'b1', summary: 'Traitement de texte structuré, tableur avancé (formules, tableaux croisés dynamiques), présentations professionnelles et automatisation.' },
        'b1-ccna1': { name: 'CCNA 1', level: 'b1', summary: 'Introduction aux réseaux Cisco (ITN) : configuration IOS, protocoles couche physique et liaison, adressage IPv4/IPv6, ICMP, couche transport.' },
        'b1-architecture': { name: 'Circuit logique & architecture des ordinateurs', level: 'b1', summary: 'Systèmes de numération (binaire, hexadécimal), algèbre de Boole, portes logiques, circuits combinatoires et séquentiels, architecture de Von Neumann.' },
        'b1-robotique': { name: 'Club de robotique', level: 'b1', summary: 'Microcontrôleurs, capteurs, actionneurs, logique embarquée, asservissement et programmation de systèmes robotiques.' },
        'b1-cyber': { name: 'Cybersécurité', level: 'b1', summary: 'Hygiène numérique, menaces courantes (phishing, malwares), authentification, chiffrement de base, sauvegarde et protection des postes.' },
        'b1-droit': { name: 'Droit', level: 'b1', summary: 'Introduction au droit, cadre juridique de l’entreprise, contrats, responsabilité civile et initiation au droit du numérique.' },
        'b1-fr-pro': { name: 'Français professionnel', level: 'b1', summary: 'Expression écrite et orale professionnelle, synthèse de documents, compte rendu, argumentation et communication en entreprise.' },
        'b1-git': { name: 'Git', level: 'b1', summary: 'Gestion de versions avec Git : dépôts, commits, branches, fusion (merge/rebase), résolution de conflits et collaboration sur dépôts distants.' },
        'b1-c-cpp': { name: 'Langage C & C++', level: 'b1', summary: 'Compilation, types, pointeurs, allocation dynamique mémoire, tableaux, chaînes, structures en C et introduction à la POO en C++.' },
        'b1-linux': { name: 'Linux', level: 'b1', summary: 'Découverte de GNU/Linux : arborescence FHS, ligne de commande Bash, manipulation de fichiers, droits d’accès, processus et gestion de paquets.' },
        'b1-merise': { name: 'Modélisation (MERISE)', level: 'b1', summary: 'Méthode MERISE : dictionnaire des données, dépendances fonctionnelles, Modèle Conceptuel de Données (MCD), MLD et normalisation.' },
        'b1-php': { name: 'PHP', level: 'b1', summary: 'Bases du développement web serveur en PHP : syntaxe, formulaires HTTP (GET/POST), sessions, cookies et connexion MySQL avec PDO.' },
        'b1-prog-web': { name: 'Programmation Web', level: 'b1', summary: 'Fondamentaux du Web : structure sémantique HTML5, mise en page CSS3 (Flexbox, Grid, responsive) et interactivité DOM en JavaScript.' },
        'b1-projet': { name: 'Projet', level: 'b1', summary: 'Méthodologie de gestion de projet informatique : cadrage, planification, découpage des tâches (WBS), suivi des risques et livrables.' },
        'b1-python': { name: 'Python', level: 'b1', summary: 'Programmation Python : variables, conditions, boucles, listes, dictionnaires, tuples, fonctions, modules, gestion des fichiers et exceptions.' },
        'b1-sql': { name: 'SQL', level: 'b1', summary: 'Initiation aux bases de données relationnelles et au langage SQL : CREATE TABLE, INSERT, UPDATE, DELETE, SELECT, WHERE, ORDER BY, GROUP BY et JOIN.' },
        'b1-stats': { name: 'Statistique descriptive', level: 'b1', summary: 'Séries statistiques univariées et bivariées, effectifs, fréquences, moyenne, médiane, quartiles, variance, écart-type, covariance et régression linéaire.' },
        'b1-vb-excel': { name: 'VB Excel', level: 'b1', summary: 'Automatisation de classeurs Excel avec VBA : macros, objets Range/Worksheet, formulaires et traitement de données.' },
        'b1-virtualisation': { name: 'Virtualisation des serveurs', level: 'b1', summary: 'Concepts fondamentaux de la virtualisation : partage des ressources matérielles, isolation des machines virtuelles, hyperviseurs et consolidation.' },

        // B3 — 23 cours
        'b3-algo': { name: 'Algorithmique', level: 'b3', summary: 'Algorithmique avancée : structures de données (arbres, tas, graphes, tables de hachage), programmation dynamique, algorithmes gloutons et complexité.' },
        'b3-cloud-computing': { name: 'Cloud Computing', level: 'b3', summary: 'Modèles IaaS/PaaS/SaaS, architectures distribuées, élasticité, haute disponibilité, stockage cloud, conteneurs, serverless et FinOps.' },
        'b3-devops': { name: 'DevOps', level: 'b3', summary: 'Intégration et déploiement continus (CI/CD), Infrastructure as Code, conteneurisation, orchestration Kubernetes, observabilité et culture SRE.' },
        'b3-document-technique': { name: 'Document technique', level: 'b3', summary: 'Rédaction technique : dossier d’architecture (DAT), documentation d’API, procédures d’exploitation (runbooks), schémas normalisés et revue.' },
        'b3-etude-quantitative': { name: 'Étude quantitative & qualitative', level: 'b3', summary: 'Méthodologie d’enquête, échantillonnage, questionnaires, entretiens, analyse statistique des données, tests d’hypothèses et interprétation.' },
        'b3-firewall': { name: 'Firewall', level: 'b3', summary: 'Filtrage de paquets stateful/stateless, zones de sécurité (DMZ), règles netfilter/nftables, NAT, inspection applicative, IDS/IPS et VPN.' },
        'b3-github': { name: 'Git & GitHub', level: 'b3', summary: 'Workflows Git avancés (GitFlow, trunk-based), Pull Requests, revue de code, GitHub Actions CI/CD, sécurité de la supply chain et releases.' },
        'b3-linux': { name: 'Linux Avancé', level: 'b3', summary: 'Administration système Linux avancée : systemd, LVM/RAID, tuning noyau (sysctl), SELinux/AppArmor, audit, dépannage et automatisation.' },
        'b3-agile': { name: 'Méthodes agiles', level: 'b3', summary: 'Cadres Scrum et Kanban, rôles, cérémonies, estimation, vélocité, backlog refinement, amélioration continue et métriques de flux.' },
        'b3-pfsense': { name: 'pfSense & Routage', level: 'b3', summary: 'Déploiement pfSense : interfaces VLAN, règles de pare-feu, NAT/port forwarding, VPN IPsec/OpenWireGuard, portail captif et haute disponibilité CARP.' },
        'b3-reseau-lan': { name: 'Réseau LAN Avancé', level: 'b3', summary: 'Architecture campus niveau 2/3, RSTP/MSTP, EtherChannel/LACP, sécurité port (802.1X, DHCP snooping, DAI), VRRP/HSRP et QoS.' },
        'b3-sql': { name: 'SQL Avancé', level: 'b3', summary: 'Optimisation de requêtes, plans d’exécution, indexation avancée, fonctions de fenêtrage (OVER/PARTITION BY), CTE récursives, isolation et verrouillage.' },
        'b3-veille': { name: 'Veille technologique & Innovation', level: 'b3', summary: 'Collecte et qualification des sources (RSS, CVE, publications), curation, évaluation de maturité technologique, POC et synthèse stratégique.' },
        'b3-windows-server': { name: 'Windows Server', level: 'b3', summary: 'Architecture Active Directory multi-sites, approbations de forêts, PKI AD CS, durcissement GPO, clustering de basculement et automatisation PowerShell.' },
        'b3-anglais': { name: 'Anglais', level: 'b3', summary: 'Anglais technique et managérial : négociation, soutenance de projet d’architecture, rédaction de spécifications et veille internationale.' },
        'b3-cloud-azure': { name: 'Cloud Azure', level: 'b3', summary: 'Microsoft Azure : Entra ID (IAM), Resource Groups, VNet, Azure VM, App Service, Azure SQL, Blob Storage, ARM/Bicep et Azure Monitor.' },
        'b3-cryptographie': { name: 'Cryptographie & PKI', level: 'b3', summary: 'Chiffrement symétrique (AES) et asymétrique (RSA, ECC), hachage, signatures numériques, échange de clés Diffie-Hellman, certificats X.509, PKI et TLS.' },
        'b3-google-cloud': { name: 'Google Cloud Platform', level: 'b3', summary: 'Architecture GCP : IAM, VPC, Compute Engine, Cloud Run, GKE, Cloud Storage, BigQuery, Cloud SQL et gestion des coûts.' },
        'b3-hacking': { name: 'Hacking éthique', level: 'b3', summary: 'Méthodologie de test d’intrusion : reconnaissance, scan, énumération, exploitation contrôlée, failles web (OWASP Top 10), élévation de privilèges et remédiation.' },
        'b3-cloud-aws': { name: 'Services Cloud AWS', level: 'b3', summary: 'Amazon Web Services : IAM, VPC, EC2, S3, RDS, Lambda, CloudFront, Route 53, CloudWatch et bonnes pratiques Well-Architected Framework.' },
        'b3-supervision': { name: 'Supervision', level: 'b3', summary: 'Architecture de supervision : SNMP, collecteurs, métriques (Prometheus/Zabbix), visualisation (Grafana), centralisation de logs, alerting et SLI/SLO.' },
        'b3-voip': { name: 'Téléphonie VoIP', level: 'b3', summary: 'Signalisation SIP, transport RTP/RTCP, codecs audio, dimensionnement bande passante, PBX Asterisk, VLAN Voix, QoS et sécurité VoIP.' },
        'b3-virtualisation': { name: 'Virtualisation Avancée', level: 'b3', summary: 'Clusters de virtualisation en production, stockage partagé (iSCSI, NFS, Ceph), vMotion/live migration, DRS/HA, sauvegarde et plan de reprise d’activité.' }
    };

    const COURSE_IDS = Object.keys(COURSE_CATALOG);
    const ACTIVE_COURSE_IDS = COURSE_IDS.filter((id) => !COURSE_CATALOG[id].archived);

    // Table de correspondance insensible à la casse pour résoudre un segment d'URL
    const COURSE_LOOKUP = new Map();
    for (const id of COURSE_IDS) {
        COURSE_LOOKUP.set(id.toLowerCase(), id);
    }

    function safeDecode(segment) {
        try {
            return decodeURIComponent(segment);
        } catch (e) {
            return segment;
        }
    }

    function buildPortalOverview() {
        const b1 = ACTIVE_COURSE_IDS.filter((id) => COURSE_CATALOG[id].level === 'b1').map((id) => COURSE_CATALOG[id].name);
        const b2 = ACTIVE_COURSE_IDS.filter((id) => COURSE_CATALOG[id].level === 'b2').map((id) => COURSE_CATALOG[id].name);
        const b3 = ACTIVE_COURSE_IDS.filter((id) => COURSE_CATALOG[id].level === 'b3').map((id) => COURSE_CATALOG[id].name);
        return [
            `Portail principal des Cours Interactifs. Ce site propose ${ACTIVE_COURSE_IDS.length} cours actifs répartis sur 3 niveaux (Licence 1 / B1 : ${b1.length} cours, Licence 2 / B2 : ${b2.length} cours, Licence 3 / B3 : ${b3.length} cours).`,
            `B1 (${b1.length} cours) : ${b1.join(', ')}.`,
            `B2 (${b2.length} cours) : ${b2.join(', ')}.`,
            `B3 (${b3.length} cours) : ${b3.join(', ')}.`,
            `Chaque cours comprend des chapitres théoriques, des laboratoires de code interactifs, des QCM et des cartes mémoire.`
        ].join(' ');
    }

    // ================================================================
    // 3. DÉTECTION DYNAMIQUE DU CONTEXTE (70 COURS + PORTAIL)
    // ================================================================
    function extractDomHints(doc) {
        if (!doc || typeof doc.querySelector !== 'function') {
            return { h1: '', title: '', cardsSummary: '' };
        }
        const h1El = doc.querySelector('h1');
        const h1 = h1El && typeof h1El.textContent === 'string' ? h1El.textContent.replace(/\s+/g, ' ').trim() : '';
        const title = typeof doc.title === 'string' ? doc.title.replace(/\s+/g, ' ').trim() : '';

        let cardsSummary = '';
        if (typeof doc.querySelectorAll === 'function') {
            const headings = Array.from(doc.querySelectorAll('h2, .course-card__title, .chap-card__title'))
                .map((el) => (el && typeof el.textContent === 'string' ? el.textContent.replace(/\s+/g, ' ').trim() : ''))
                .filter(Boolean)
                .slice(0, 12);
            if (headings.length > 0) {
                cardsSummary = headings.join(' | ');
            }
        }
        return { h1, title, cardsSummary };
    }

    function detectContext(env) {
        const opts = typeof env === 'string' ? { url: env } : (env || {});
        const doc = opts.document || (typeof document !== 'undefined' ? document : null);
        const loc = opts.location || (typeof window !== 'undefined' && window.location ? window.location : null);

        const rawUrl = String(
            opts.url ||
            opts.pathname ||
            opts.href ||
            (loc && (loc.pathname || loc.href)) ||
            '/index.html'
        );

        // Nettoyage de l'origine, de la query string et du hash
        const withoutOrigin = rawUrl
            .replace(/\\/g, '/')
            .replace(/^[a-z]+:\/\/[^/]+/i, '')
            .split('?')[0]
            .split('#')[0];

        const segments = withoutOrigin
            .split('/')
            .map((s) => safeDecode(s.trim()))
            .filter(Boolean);

        // Recherche du dossier de cours parmi les segments d'URL
        let matchedCourseId = null;
        let courseSegIndex = -1;
        for (let i = 0; i < segments.length; i++) {
            const candidate = COURSE_LOOKUP.get(segments[i].toLowerCase());
            if (candidate) {
                matchedCourseId = candidate;
                courseSegIndex = i;
                break;
            }
        }

        // Détermination du chapitre / de la page courante
        let chapter = 'index';
        if (segments.length > 0) {
            const lastSeg = segments[segments.length - 1];
            if (courseSegIndex >= 0 && courseSegIndex === segments.length - 1) {
                chapter = 'index';
            } else {
                const cleaned = lastSeg.replace(/\.html?$/i, '').trim();
                if (cleaned && cleaned.toLowerCase() !== 'index') {
                    chapter = cleaned;
                }
            }
        }

        const domHints = extractDomHints(doc);
        const h1 = typeof opts.h1 === 'string' ? opts.h1.trim() : domHints.h1;
        const docTitle = typeof opts.title === 'string' ? opts.title.trim() : domHints.title;

        if (!matchedCourseId) {
            const pageTitle = h1 || docTitle || 'Portail Informatique B1, B2 & B3';
            const portalOverview = buildPortalOverview();
            const contextParts = [portalOverview];
            if (pageTitle) contextParts.push(`Titre de la page : ${pageTitle}.`);
            if (domHints.cardsSummary) contextParts.push(`Sections visibles : ${domHints.cardsSummary}.`);

            return {
                courseId: 'portal',
                courseTitle: 'Portail des Cours Interactifs',
                level: 'all',
                pageTitle,
                chapter,
                project: 'portal',
                page: chapter,
                context: contextParts.join(' ')
            };
        }

        const course = COURSE_CATALOG[matchedCourseId];
        const levelLabel = LEVEL_LABELS[course.level] || course.level.toUpperCase();
        const pageTitle = h1 || docTitle || `${course.name} — ${chapter}`;

        const contextParts = [
            `Cours actuel : ${course.name} (identifiant : ${matchedCourseId}, niveau : ${levelLabel}).`,
            `Page / chapitre : ${chapter} (${pageTitle}).`,
            `Programme du cours : ${course.summary}`,
            `Catalogue global de la plateforme : ${ACTIVE_COURSE_IDS.length} cours actifs (23 B1, 24 B2, 23 B3).`
        ];
        if (domHints.cardsSummary) {
            contextParts.push(`Sections de la page : ${domHints.cardsSummary}.`);
        }

        return {
            courseId: matchedCourseId,
            courseTitle: course.name,
            level: course.level,
            pageTitle,
            chapter,
            project: matchedCourseId,
            page: chapter,
            context: contextParts.join(' ')
        };
    }

    function getWelcomeMessage(projectOrCtx) {
        const courseId = typeof projectOrCtx === 'object' && projectOrCtx !== null
            ? projectOrCtx.courseId
            : projectOrCtx;

        if (!courseId || courseId === 'portal' || !COURSE_CATALOG[courseId]) {
            return `Bonjour ! Je suis **RD-AI**, ton assistant pédagogique sur les **${ACTIVE_COURSE_IDS.length} cours** (B1, B2 et B3). Choisis un cours ou pose-moi directement ta question !`;
        }

        const course = COURSE_CATALOG[courseId];
        const levelLabel = LEVEL_LABELS[course.level] || course.level.toUpperCase();
        return `Bonjour ! Je suis **RD-AI**, ton assistant pour le cours **${course.name}** (${levelLabel}). Pose-moi tes questions sur ce chapitre ou sur un exercice !`;
    }

    function buildSystemPrompt(contextOrObj) {
        const contextText = typeof contextOrObj === 'object' && contextOrObj !== null
            ? contextOrObj.context
            : String(contextOrObj || buildPortalOverview());

        return `Tu es RD-AI, un assistant pédagogique intelligent créé pour aider les étudiants du Portail des Cours Interactifs (${ACTIVE_COURSE_IDS.length} cours actifs en Licence 1, Licence 2 et Licence 3).

RÈGLES STRICTES :
- Tu es RD-AI. Ne mentionne JAMAIS DeepSeek, OpenAI, ChatGPT, ou tout autre fournisseur d'IA. Si on te demande qui tu es, tu réponds "Je suis RD-AI, ton assistant pédagogique."
- Tu réponds dans la langue de la question posée par l'étudiant.
- Tu fournis des explications claires, structurées, avec des exemples concrets adaptés au niveau du cours (B1, B2 ou B3).
- Tu utilises la notation LaTeX pour les formules mathématiques : $formule$ pour inline, $$formule$$ pour les blocs.
- Tu restes concis mais précis. Pas de réponse de plus de 400 mots sauf si l'étudiant le demande.
- Si la question sort du cadre du cours, signale-le poliment et redirige vers le sujet.
- Sois encourageant et rigoureux avec les étudiants.

CONTEXTE DE LA PAGE ACTUELLE :
${contextText}`;
    }

    // ================================================================
    // 4. RENDU MARKDOWN SIMPLIFIÉ
    // ================================================================
    function renderMarkdown(text) {
        if (!text) return '';
        const codeBlocks = [];
        text = text.replace(/```(\w*)\n([\s\S]*?)```/g, (_, lang, code) => {
            const i = codeBlocks.length;
            codeBlocks.push(`<pre class="rdai-code-block"><code>${escapeHtml(code.trim())}</code></pre>`);
            return `%%CODEBLOCK_${i}%%`;
        });
        const inlineCodes = [];
        text = text.replace(/`([^`]+)`/g, (_, code) => {
            const i = inlineCodes.length;
            inlineCodes.push(`<code class="rdai-inline-code">${escapeHtml(code)}</code>`);
            return `%%INLINE_${i}%%`;
        });
        const mathBlocks = [];
        text = text.replace(/\$\$([\s\S]+?)\$\$|\\\[([\s\S]+?)\\\]|\\\(([\s\S]+?)\\\)|(?<!\$)\$([^$\n]+?)\$(?!\$)/g, (m) => {
            const i = mathBlocks.length;
            mathBlocks.push(escapeHtml(m));
            return `%%MATH_${i}%%`;
        });
        text = escapeHtml(text);
        codeBlocks.forEach((block, i) => { text = text.replace(`%%CODEBLOCK_${i}%%`, block); });
        inlineCodes.forEach((code, i) => { text = text.replace(`%%INLINE_${i}%%`, code); });
        text = text.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
        text = text.replace(/(?<!\*)\*([^*]+?)\*(?!\*)/g, '<em>$1</em>');
        text = text.replace(/^### (.+)$/gm, '<strong class="rdai-h3">$1</strong>');
        text = text.replace(/^## (.+)$/gm, '<strong class="rdai-h2">$1</strong>');
        text = text.replace(/^[•\-\*] (.+)$/gm, '<li>$1</li>');
        text = text.replace(/((?:<li>.*<\/li>\s*)+)/g, '<ul class="rdai-list">$1</ul>');
        text = text.replace(/^\d+\.\s(.+)$/gm, '<li>$1</li>');
        text = text.replace(/\n{2,}/g, '<br><br>');
        text = text.replace(/\n/g, '<br>');
        mathBlocks.forEach((math, i) => { text = text.replace(`%%MATH_${i}%%`, math); });
        return text;
    }

    function escapeHtml(str) {
        return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
    }

    // ================================================================
    // 5. FILTRE FOURNISSEURS → RD-AI
    // ================================================================
    function filterResponse(text) {
        return text
            .replace(/deepseek/gi, 'RD-AI')
            .replace(/deep seek/gi, 'RD-AI')
            .replace(/openai/gi, 'RD-AI')
            .replace(/open ai/gi, 'RD-AI')
            .replace(/chatgpt/gi, 'RD-AI')
            .replace(/chat gpt/gi, 'RD-AI')
            .replace(/gpt-4o[\w-]*/gi, 'RD-AI')
            .replace(/gpt-4[\w-]*/gi, 'RD-AI')
            .replace(/gpt-3\.5[\w-]*/gi, 'RD-AI');
    }

    // ================================================================
    // 6. ICÔNES SVG INLINE & STYLES ALIGNÉS STITCH (ZÉRO EMOJI)
    // ================================================================
    const ICONS = {
        robot: (s = 20) => `<svg width="${s}" height="${s}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="3" y="11" width="18" height="10" rx="2"/><circle cx="12" cy="5" r="2"/><path d="M12 7v4M8 16h.01M16 16h.01"/></svg>`,
        trash: (s = 16) => `<svg width="${s}" height="${s}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>`,
        close: (s = 16) => `<svg width="${s}" height="${s}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>`,
        send: (s = 16) => `<svg width="${s}" height="${s}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>`,
        user: (s = 18) => `<svg width="${s}" height="${s}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>`,
        whatsapp: (s = 16) => `<svg width="${s}" height="${s}" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>`
    };

    function injectStyles() {
        if (document.getElementById('rdai-styles')) return;
        const style = document.createElement('style');
        style.id = 'rdai-styles';
        style.textContent = `
/* ========== RD-AI Chat Widget — Stitch Neutral Tokens ========== */
:root {
    --rdai-accent: var(--accent, #2563eb);
    --rdai-surface: var(--surface, var(--color-bg-elevated, #ffffff));
    --rdai-surface-subtle: var(--subtle, var(--color-bg-subtle, #f1f5f9));
    --rdai-ink: var(--ink, var(--color-text, #1b1b1e));
    --rdai-ink-muted: var(--ink-muted, var(--color-text-muted, #475569));
    --rdai-border: var(--border, var(--color-border, #e4e4e7));
}

.rdai-bubble {
    position: fixed;
    bottom: 24px;
    right: 24px;
    width: 52px;
    height: 52px;
    border-radius: 14px;
    background: var(--accent, #2563eb);
    color: #ffffff;
    border: 1px solid var(--border, #1d4ed8);
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0 4px 12px rgba(15, 23, 42, 0.16);
    z-index: 99999;
    transition: transform 0.18s ease, box-shadow 0.18s ease, background-color 0.18s ease;
}
.rdai-bubble:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 16px rgba(15, 23, 42, 0.22);
}
.rdai-bubble:focus-visible {
    outline: 2px solid var(--accent, #2563eb);
    outline-offset: 2px;
}
.rdai-bubble.rdai-active {
    background: var(--ink, #1b1b1e);
    color: var(--surface, #ffffff);
}

/* ========== WhatsApp Button ========== */
.rdai-whatsapp {
    position: fixed;
    bottom: 24px;
    left: 24px;
    width: 52px;
    height: 52px;
    border-radius: 14px;
    background: #15803d;
    color: #ffffff;
    border: 1px solid rgba(255, 255, 255, 0.16);
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0 4px 12px rgba(15, 23, 42, 0.16);
    z-index: 99999;
    transition: transform 0.18s ease, box-shadow 0.18s ease;
    text-decoration: none;
}
.rdai-whatsapp:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 16px rgba(15, 23, 42, 0.22);
    color: #ffffff;
}
.rdai-whatsapp .wa-tooltip {
    position: absolute;
    left: 64px;
    background: var(--ink, #1b1b1e);
    color: var(--surface, #ffffff);
    padding: 8px 12px;
    border-radius: 8px;
    font-size: 13px;
    white-space: nowrap;
    opacity: 0;
    pointer-events: none;
    transition: opacity 0.2s ease, transform 0.2s ease;
    transform: translateX(-6px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.18);
    font-family: var(--font-body, system-ui, -apple-system, sans-serif);
}
.rdai-whatsapp:hover .wa-tooltip {
    opacity: 1;
    transform: translateX(0);
}

/* ========== Panel ========== */
.rdai-panel {
    position: fixed;
    bottom: 88px;
    right: 24px;
    width: 392px;
    height: 520px;
    border-radius: 16px;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    background: var(--surface, #ffffff);
    color: var(--ink, #1b1b1e);
    border: 1px solid var(--border, #e4e4e7);
    box-shadow: 0 12px 36px rgba(15, 23, 42, 0.16);
    z-index: 99998;
    opacity: 0;
    transform: translateY(16px) scale(0.96);
    pointer-events: none;
    transition: opacity 0.22s ease, transform 0.22s ease;
}
.rdai-panel.rdai-open {
    opacity: 1;
    transform: translateY(0) scale(1);
    pointer-events: auto;
}

/* Header */
.rdai-header {
    background: var(--surface, #ffffff);
    color: var(--ink, #1b1b1e);
    border-bottom: 1px solid var(--border, #e4e4e7);
    padding: 14px 16px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-shrink: 0;
}
.rdai-header-left {
    display: flex;
    align-items: center;
    gap: 10px;
}
.rdai-header-avatar {
    width: 34px;
    height: 34px;
    border-radius: 10px;
    background: var(--accent, #2563eb);
    color: #ffffff;
    display: flex;
    align-items: center;
    justify-content: center;
}
.rdai-header-info .rdai-title {
    display: block;
    margin: 0;
    font-size: 15px;
    font-weight: 700;
    color: var(--ink, #1b1b1e);
}
.rdai-header-info span {
    font-size: 12px;
    color: var(--rdai-ink-muted, #475569);
}
.rdai-header-actions {
    display: flex;
    gap: 4px;
}
.rdai-header-btn {
    background: transparent;
    border: 1px solid transparent;
    color: var(--ink, #1b1b1e);
    cursor: pointer;
    padding: 6px;
    border-radius: 8px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    transition: background-color 0.15s ease, border-color 0.15s ease;
}
.rdai-header-btn:hover {
    background: var(--rdai-surface-subtle, #f1f5f9);
    border-color: var(--border, #e4e4e7);
}

/* Messages */
.rdai-messages {
    flex: 1;
    overflow-y: auto;
    padding: 16px;
    display: flex;
    flex-direction: column;
    gap: 12px;
    scroll-behavior: smooth;
    background: var(--surface, #ffffff);
}
.rdai-messages::-webkit-scrollbar { width: 5px; }
.rdai-messages::-webkit-scrollbar-track { background: transparent; }
.rdai-messages::-webkit-scrollbar-thumb { background: var(--border, #cbd5e1); border-radius: 10px; }

.rdai-msg {
    display: flex;
    align-items: flex-end;
    gap: 8px;
}
.rdai-msg-user { flex-direction: row-reverse; }

.rdai-msg-avatar {
    width: 28px;
    height: 28px;
    border-radius: 8px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
}
.rdai-msg-ai .rdai-msg-avatar {
    background: var(--accent, #2563eb);
    color: #ffffff;
}
.rdai-msg-user .rdai-msg-avatar {
    background: var(--rdai-surface-subtle, #e2e8f0);
    color: var(--ink, #1b1b1e);
}

.rdai-msg-content {
    max-width: 82%;
    padding: 10px 14px;
    border-radius: 12px;
    font-size: 13.5px;
    line-height: 1.6;
    word-wrap: break-word;
    overflow-wrap: break-word;
}
.rdai-msg-user .rdai-msg-content {
    background: var(--accent, #2563eb);
    color: #ffffff;
    border-bottom-right-radius: 4px;
}
.rdai-msg-ai .rdai-msg-content {
    background: var(--rdai-surface-subtle, #f1f5f9);
    color: var(--ink, #1b1b1e);
    border: 1px solid var(--border, #e4e4e7);
    border-bottom-left-radius: 4px;
}

/* Code blocks in messages */
.rdai-code-block {
    background: #0f172a;
    color: #f8fafc;
    padding: 10px 14px;
    border-radius: 8px;
    font-size: 12.5px;
    font-family: var(--font-mono, 'JetBrains Mono', Consolas, monospace);
    overflow-x: auto;
    margin: 8px 0;
    white-space: pre-wrap;
    word-break: break-all;
}
.rdai-inline-code {
    background: rgba(37, 99, 235, 0.1);
    color: var(--accent, #2563eb);
    padding: 2px 6px;
    border-radius: 4px;
    font-size: 12.5px;
    font-family: var(--font-mono, 'JetBrains Mono', Consolas, monospace);
}
.rdai-list {
    margin: 6px 0;
    padding-left: 20px;
}
.rdai-list li {
    margin: 3px 0;
}
.rdai-h2 { font-size: 1.08em; display: block; margin: 8px 0 4px; }
.rdai-h3 { font-size: 1.03em; display: block; margin: 6px 0 3px; }

/* Typing indicator (statique sobre, sans keyframe infinie) */
.rdai-typing .rdai-msg-content {
    display: flex;
    align-items: center;
    gap: 6px;
    padding: 12px 16px;
}
.rdai-dot {
    width: 7px;
    height: 7px;
    border-radius: 50%;
    background: var(--rdai-ink-muted, #64748b);
}
.rdai-dot:nth-child(2) { opacity: 0.7; }
.rdai-dot:nth-child(3) { opacity: 0.45; }

/* Input area */
.rdai-input-area {
    padding: 12px 14px;
    border-top: 1px solid var(--border, #e4e4e7);
    display: flex;
    gap: 8px;
    align-items: flex-end;
    flex-shrink: 0;
    background: var(--surface, #ffffff);
}
.rdai-input {
    flex: 1;
    border: 1px solid var(--border, #cbd5e1);
    border-radius: 10px;
    padding: 9px 12px;
    font-size: 13.5px;
    line-height: 1.4;
    resize: none;
    outline: none;
    font-family: inherit;
    max-height: 100px;
    min-height: 40px;
    background: var(--surface, #ffffff);
    color: var(--ink, #1b1b1e);
    transition: border-color 0.15s ease;
}
.rdai-input:focus {
    border-color: var(--accent, #2563eb);
}
.rdai-input::placeholder {
    color: var(--rdai-ink-muted, #64748b);
}
.rdai-send {
    width: 40px;
    height: 40px;
    border-radius: 10px;
    background: var(--accent, #2563eb);
    color: #ffffff;
    border: none;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    transition: opacity 0.15s ease, transform 0.15s ease;
}
.rdai-send:hover:not(:disabled) { transform: translateY(-1px); }
.rdai-send:disabled { opacity: 0.45; cursor: not-allowed; transform: none; }

/* Footer */
.rdai-footer {
    text-align: center;
    padding: 6px;
    font-size: 11px;
    color: var(--rdai-ink-muted, #475569);
    flex-shrink: 0;
    border-top: 1px solid var(--border, #e4e4e7);
    background: var(--surface, #ffffff);
}

/* ========== DARK MODE ([data-theme="dark"]) ========== */
[data-theme="dark"] .rdai-panel,
html.dark .rdai-panel,
body.dark-mode .rdai-panel {
    --surface: var(--color-bg-elevated, #18181d);
    --ink: var(--color-text, #f4f4f5);
    --border: var(--color-border, #2a2a31);
    --rdai-surface-subtle: #23232b;
    --rdai-ink-muted: #d4d4d8;
    background: var(--surface, #18181d);
    color: var(--ink, #f4f4f5);
    border-color: var(--border, #2a2a31);
    box-shadow: 0 12px 40px rgba(0, 0, 0, 0.55);
}
[data-theme="dark"] .rdai-header,
html.dark .rdai-header,
body.dark-mode .rdai-header {
    background: var(--surface, #18181d);
    color: var(--ink, #f4f4f5);
    border-bottom-color: var(--border, #2a2a31);
}
[data-theme="dark"] .rdai-messages,
html.dark .rdai-messages,
body.dark-mode .rdai-messages {
    background: var(--surface, #18181d);
}
[data-theme="dark"] .rdai-msg-ai .rdai-msg-content,
html.dark .rdai-msg-ai .rdai-msg-content,
body.dark-mode .rdai-msg-ai .rdai-msg-content {
    background: #23232b;
    color: var(--ink, #f4f4f5);
    border-color: var(--border, #2a2a31);
}
[data-theme="dark"] .rdai-msg-user .rdai-msg-avatar,
html.dark .rdai-msg-user .rdai-msg-avatar,
body.dark-mode .rdai-msg-user .rdai-msg-avatar {
    background: #2a2a31;
    color: var(--ink, #f4f4f5);
}
[data-theme="dark"] .rdai-input-area,
html.dark .rdai-input-area,
body.dark-mode .rdai-input-area {
    border-top-color: var(--border, #2a2a31);
    background: var(--surface, #18181d);
}
[data-theme="dark"] .rdai-input,
html.dark .rdai-input,
body.dark-mode .rdai-input {
    background: #101014;
    border-color: var(--border, #3f3f46);
    color: var(--ink, #f4f4f5);
}
[data-theme="dark"] .rdai-input::placeholder,
html.dark .rdai-input::placeholder,
body.dark-mode .rdai-input::placeholder {
    color: #a1a1aa;
}
[data-theme="dark"] .rdai-footer,
html.dark .rdai-footer,
body.dark-mode .rdai-footer {
    border-top-color: var(--border, #2a2a31);
    background: var(--surface, #18181d);
    color: #a1a1aa;
}
[data-theme="dark"] .rdai-inline-code,
html.dark .rdai-inline-code,
body.dark-mode .rdai-inline-code {
    background: rgba(96, 165, 250, 0.16);
    color: #93c5fd;
}

@media (prefers-reduced-motion: reduce) {
    .rdai-bubble, .rdai-whatsapp, .rdai-panel, .rdai-send {
        transition: none !important;
    }
}

/* ========== MOBILE (< 768px & <= 640px) ========== */
@media (max-width: 768px) {
    .rdai-whatsapp {
        display: none !important;
    }
    .rdai-bubble {
        bottom: 76px;
        right: 16px;
        width: 46px;
        height: 46px;
        border-radius: 12px;
    }
    .rdai-panel {
        bottom: 132px;
        right: 12px;
        width: calc(100vw - 24px);
        max-width: 360px;
        height: 68vh;
    }
}
@media (max-width: 640px) {
    .rdai-whatsapp {
        display: none !important;
    }
    .rdai-bubble {
        bottom: 76px;
        right: 14px;
        width: 46px;
        height: 46px;
    }
    .rdai-panel {
        bottom: 0;
        right: 0;
        left: 0;
        width: 100%;
        max-width: none;
        height: 75vh;
        border-radius: 16px 16px 0 0;
    }
}
`;
        document.head.appendChild(style);
    }

    // ================================================================
    // 7. CRÉATION DU WIDGET
    // ================================================================
    let panelEl, messagesEl, inputEl, sendBtn, typingEl;
    let isOpen = false;
    let isStreaming = false;
    let messages = [];
    let ctx;

    function createWidget() {
        const bubble = document.createElement('button');
        bubble.className = 'rdai-bubble';
        bubble.setAttribute('aria-label', 'Ouvrir le chat RD-AI');
        bubble.setAttribute('title', 'Discuter avec RD-AI');
        bubble.innerHTML = ICONS.robot(24);
        bubble.addEventListener('click', togglePanel);
        document.body.appendChild(bubble);

        const waLink = document.createElement('a');
        waLink.className = 'rdai-whatsapp';
        waLink.href = `https://wa.me/${WHATSAPP_NUMBER}?text=${WHATSAPP_MESSAGE}`;
        waLink.target = '_blank';
        waLink.rel = 'noopener noreferrer';
        waLink.setAttribute('aria-label', 'Contacter sur WhatsApp');
        waLink.setAttribute('title', 'Contacter sur WhatsApp');
        waLink.innerHTML = `
            ${ICONS.whatsapp(24)}
            <span class="wa-tooltip">Me contacter sur WhatsApp</span>
        `;
        const waRegion = document.createElement('div');
        waRegion.setAttribute('role', 'region');
        waRegion.setAttribute('aria-label', 'Contact WhatsApp');
        waRegion.appendChild(waLink);
        document.body.appendChild(waRegion);

        panelEl = document.createElement('div');
        panelEl.className = 'rdai-panel';
        panelEl.setAttribute('role', 'dialog');
        panelEl.setAttribute('aria-label', 'Chat RD-AI');
        panelEl.innerHTML = `
            <div class="rdai-header">
                <div class="rdai-header-left">
                    <div class="rdai-header-avatar">${ICONS.robot(20)}</div>
                    <div class="rdai-header-info">
                        <span class="rdai-title" role="heading" aria-level="2">RD-AI</span>
                        <span>${escapeHtml(ctx.courseTitle || 'Assistant pédagogique')}</span>
                    </div>
                </div>
                <div class="rdai-header-actions">
                    <a href="https://wa.me/${WHATSAPP_NUMBER}?text=${WHATSAPP_MESSAGE}" target="_blank" rel="noopener noreferrer" class="rdai-header-btn" title="Contacter sur WhatsApp" aria-label="Contacter sur WhatsApp">${ICONS.whatsapp(16)}</a>
                    <button class="rdai-header-btn rdai-clear-btn" title="Effacer l'historique" aria-label="Effacer l'historique">${ICONS.trash(16)}</button>
                    <button class="rdai-header-btn rdai-close-btn" title="Fermer" aria-label="Fermer">${ICONS.close(16)}</button>
                </div>
            </div>
            <div class="rdai-messages"></div>
            <div class="rdai-input-area">
                <textarea class="rdai-input" placeholder="Pose ta question sur ce cours..." rows="1"></textarea>
                <button class="rdai-send" title="Envoyer" aria-label="Envoyer" disabled>${ICONS.send(16)}</button>
            </div>
            <div class="rdai-footer">RD-AI — Assistant pédagogique (${ACTIVE_COURSE_IDS.length} cours B1, B2, B3)</div>
        `;
        document.body.appendChild(panelEl);

        messagesEl = panelEl.querySelector('.rdai-messages');
        inputEl = panelEl.querySelector('.rdai-input');
        sendBtn = panelEl.querySelector('.rdai-send');

        panelEl.querySelector('.rdai-close-btn').addEventListener('click', togglePanel);
        panelEl.querySelector('.rdai-clear-btn').addEventListener('click', clearHistory);
        sendBtn.addEventListener('click', sendMessage);

        inputEl.addEventListener('input', () => {
            sendBtn.disabled = !inputEl.value.trim() || isStreaming;
            autoResize(inputEl);
        });
        inputEl.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                if (inputEl.value.trim() && !isStreaming) sendMessage();
            }
        });

        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && isOpen) togglePanel();
        });
    }

    function autoResize(el) {
        el.style.height = 'auto';
        el.style.height = Math.min(el.scrollHeight, 100) + 'px';
    }

    function togglePanel() {
        isOpen = !isOpen;
        panelEl.classList.toggle('rdai-open', isOpen);
        const bubbleEl = document.querySelector('.rdai-bubble');
        if (bubbleEl) bubbleEl.classList.toggle('rdai-active', isOpen);
        if (isOpen) {
            inputEl.focus();
            scrollToBottom();
        }
    }

    // ================================================================
    // 8. GESTION DES MESSAGES
    // ================================================================
    function addMessageToDOM(role, content) {
        const msg = document.createElement('div');
        msg.className = `rdai-msg rdai-msg-${role}`;

        const avatar = document.createElement('div');
        avatar.className = 'rdai-msg-avatar';
        avatar.innerHTML = role === 'ai' ? ICONS.robot(18) : ICONS.user(18);

        const contentEl = document.createElement('div');
        contentEl.className = 'rdai-msg-content';
        contentEl.innerHTML = renderMarkdown(content);

        msg.appendChild(avatar);
        msg.appendChild(contentEl);

        if (typingEl && typingEl.parentNode) {
            messagesEl.insertBefore(msg, typingEl);
        } else {
            messagesEl.appendChild(msg);
        }
        if (role === 'ai' && content) renderMath(contentEl);
        scrollToBottom();
        return contentEl;
    }

    function showTyping() {
        typingEl = document.createElement('div');
        typingEl.className = 'rdai-msg rdai-msg-ai rdai-typing';
        typingEl.innerHTML = `
            <div class="rdai-msg-avatar">${ICONS.robot(18)}</div>
            <div class="rdai-msg-content">
                <div class="rdai-dot"></div>
                <div class="rdai-dot"></div>
                <div class="rdai-dot"></div>
            </div>
        `;
        messagesEl.appendChild(typingEl);
        scrollToBottom();
    }

    function hideTyping() {
        if (typingEl && typingEl.parentNode) {
            typingEl.parentNode.removeChild(typingEl);
            typingEl = null;
        }
    }

    function scrollToBottom() {
        if (typeof requestAnimationFrame === 'function' && messagesEl) {
            requestAnimationFrame(() => {
                messagesEl.scrollTop = messagesEl.scrollHeight;
            });
        }
    }

    // ================================================================
    // 9. HISTORIQUE localStorage
    // ================================================================
    function getStorageKey() {
        return `rdai_history_${ctx.courseId || ctx.project}`;
    }

    function loadHistory() {
        try {
            const stored = localStorage.getItem(getStorageKey());
            if (stored) {
                const data = JSON.parse(stored);
                messages = data.messages || [];
            }
        } catch (e) {
            messages = [];
        }
    }

    function saveHistory() {
        try {
            const data = {
                project: ctx.courseId || ctx.project,
                messages: messages.slice(-CONFIG.maxHistory),
                timestamp: Date.now()
            };
            localStorage.setItem(getStorageKey(), JSON.stringify(data));
        } catch (e) { /* quota exceeded */ }
    }

    function clearHistory() {
        messages = [];
        try { localStorage.removeItem(getStorageKey()); } catch (e) {}
        messagesEl.innerHTML = '';
        addMessageToDOM('ai', getWelcomeMessage(ctx));
    }

    function renderStoredMessages() {
        messagesEl.innerHTML = '';
        addMessageToDOM('ai', getWelcomeMessage(ctx));
        messages.forEach((m) => {
            addMessageToDOM(m.role === 'user' ? 'user' : 'ai', m.content);
        });
        scrollToBottom();
    }

    // ================================================================
    // 10. ENVOI / APPEL API (streaming)
    // ================================================================
    async function sendMessage() {
        const text = inputEl.value.trim();
        if (!text || isStreaming) return;

        inputEl.value = '';
        inputEl.style.height = 'auto';
        sendBtn.disabled = true;
        addMessageToDOM('user', text);
        messages.push({ role: 'user', content: text });
        saveHistory();

        isStreaming = true;
        showTyping();

        try {
            ctx = detectContext();
            const apiMessages = [
                { role: 'system', content: buildSystemPrompt(ctx) },
                ...messages.slice(-CONFIG.maxHistory)
            ];

            const response = await fetch(CONFIG.apiUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    messages: apiMessages,
                    context: {
                        courseId: ctx.courseId,
                        courseTitle: ctx.courseTitle,
                        level: ctx.level,
                        pageTitle: ctx.pageTitle,
                        chapter: ctx.chapter
                    },
                    courseId: ctx.courseId,
                    courseTitle: ctx.courseTitle,
                    level: ctx.level,
                    pageTitle: ctx.pageTitle,
                    chapter: ctx.chapter,
                    max_tokens: CONFIG.maxTokens,
                    temperature: CONFIG.temperature,
                    stream: true
                })
            });

            if (!response.ok) {
                const errText = await response.text();
                throw new Error(`API Error ${response.status}: ${errText}`);
            }

            hideTyping();
            let fullResponse = '';
            const contentEl = addMessageToDOM('ai', '');

            const reader = response.body.getReader();
            const decoder = new TextDecoder();
            let buffer = '';

            while (true) {
                const { value, done } = await reader.read();
                if (done) break;

                buffer += decoder.decode(value, { stream: true });
                const lines = buffer.split('\n');
                buffer = lines.pop() || '';

                for (const line of lines) {
                    const trimmed = line.trim();
                    if (!trimmed.startsWith('data: ')) continue;
                    const data = trimmed.slice(6);
                    if (data === '[DONE]') continue;
                    try {
                        const parsed = JSON.parse(data);
                        const delta = parsed.choices?.[0]?.delta?.content || '';
                        if (delta) {
                            fullResponse += delta;
                            contentEl.innerHTML = renderMarkdown(filterResponse(fullResponse));
                            scrollToBottom();
                        }
                    } catch (e) { /* skip malformed chunk */ }
                }
            }

            fullResponse = filterResponse(fullResponse);
            contentEl.innerHTML = renderMarkdown(fullResponse);
            messages.push({ role: 'assistant', content: fullResponse });
            saveHistory();
            renderMath(contentEl);
        } catch (err) {
            hideTyping();
            console.error('RD-AI Error:', err);
            let errorMsg = "Désolé, je n'ai pas pu répondre. ";
            if (err.message.includes('Failed to fetch') || err.message.includes('NetworkError')) {
                errorMsg += 'Vérifie ta connexion internet.';
            } else if (err.message.includes('401') || err.message.includes('403')) {
                errorMsg += "Problème d'authentification. Connecte-toi avec ta clé d'accès.";
            } else if (err.message.includes('429')) {
                errorMsg += 'Trop de requêtes. Attends un moment et réessaie.';
            } else {
                errorMsg += 'Une erreur est survenue. Réessaie dans quelques instants.';
            }
            addMessageToDOM('ai', errorMsg);
        } finally {
            isStreaming = false;
            sendBtn.disabled = !inputEl.value.trim();
        }
    }

    let katexLoadPromise = null;
    function ensureLocalKatex() {
        if (typeof window === 'undefined' || typeof document === 'undefined') {
            return Promise.reject(new Error('No DOM'));
        }
        if (typeof window.renderMathInElement === 'function') {
            return Promise.resolve();
        }
        if (katexLoadPromise) return katexLoadPromise;

        katexLoadPromise = new Promise((resolve, reject) => {
            if (!document.querySelector('link[href*="/assets/vendor/katex/katex.min.css"]')) {
                const link = document.createElement('link');
                link.rel = 'stylesheet';
                link.href = '/assets/vendor/katex/katex.min.css';
                document.head.appendChild(link);
            }
            function loadAutoRender() {
                if (typeof window.renderMathInElement === 'function') return resolve();
                const ar = document.createElement('script');
                ar.src = '/assets/vendor/katex/auto-render.min.js';
                ar.onload = () => resolve();
                ar.onerror = () => reject(new Error('auto-render load error'));
                document.head.appendChild(ar);
            }
            if (typeof window.katex !== 'undefined') {
                loadAutoRender();
                return;
            }
            const kt = document.createElement('script');
            kt.src = '/assets/vendor/katex/katex.min.js';
            kt.onload = loadAutoRender;
            kt.onerror = () => reject(new Error('katex load error'));
            document.head.appendChild(kt);
        }).catch(() => { katexLoadPromise = null; });

        return katexLoadPromise;
    }

    function renderMath(el) {
        if (!el) return;
        const text = el.textContent || '';
        if (!/\$|\\\[|\\\(/.test(text)) return;
        ensureLocalKatex().then(() => {
            if (typeof window.renderMathInElement === 'function') {
                window.renderMathInElement(el, {
                    delimiters: [
                        { left: '$$', right: '$$', display: true },
                        { left: '\\[', right: '\\]', display: true },
                        { left: '$', right: '$', display: false },
                        { left: '\\(', right: '\\)', display: false }
                    ],
                    throwOnError: false,
                    strict: false
                });
            }
        }).catch(() => {});
    }

    // ================================================================
    // 11. INITIALISATION & EXPORTS
    // ================================================================
    function init() {
        if (typeof document === 'undefined' || !document.body) return;
        ctx = detectContext();
        injectStyles();
        createWidget();
        loadHistory();
        renderStoredMessages();
    }

    const api = {
        CONFIG,
        COURSE_CATALOG,
        ACTIVE_COURSE_IDS,
        detectContext,
        getWelcomeMessage,
        buildSystemPrompt,
        renderMarkdown,
        filterResponse,
        init
    };

    if (typeof module !== 'undefined' && module.exports) {
        module.exports = api;
    }
    if (root) {
        root.RDAI = api;
    }

    if (typeof document !== 'undefined') {
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', init);
        } else if (document.body) {
            init();
        }
    }
})(typeof window !== 'undefined' ? window : globalThis);

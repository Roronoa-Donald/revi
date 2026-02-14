/**
 * RD-AI Chat Widget — Assistant pédagogique intelligent
 * Intégré au Portail des Cours Interactifs
 * Streaming, localStorage, contexte par page, dark mode
 */
(function () {
    'use strict';

    // ================================================================
    // 1. CONFIGURATION
    // ================================================================
    const CONFIG = {
        apiUrl: '/api/ai-chat',
        model: 'deepseek/deepseek-chat',
        maxTokens: 2048,
        temperature: 0.7,
        maxHistory: 20 // nombre max de messages conservés
    };

    // ================================================================
    // 2. CONTEXTES PAR PROJET / PAGE
    // ================================================================
    const CONTEXTS = {
        portal: {
            _default: "Portail principal des Cours Interactifs. Ce site propose 7 cours complets pour étudiants en informatique (BTS/Licence) : Probabilités & Statistiques, SQL & Bases de données, Recherche Opérationnelle, Administration Linux Debian, PHP Orienté Objet, Windows Server 2022 et Java. Chaque cours dispose de chapitres théoriques, exercices interactifs, QCM, simulateur d'examen et système de gamification (XP, badges, niveaux)."
        },
        probabilites: {
            _default: "Cours de Probabilités et Statistiques. Sujets : dénombrement (arrangements, combinaisons, permutations), variables aléatoires discrètes et continues, lois classiques (binomiale, Poisson, normale, exponentielle, uniforme), espérance E(X), variance V(X), écart-type, théorèmes limites (loi des grands nombres, théorème central limite), statistiques inférentielles.",
            chapitre1: "Chapitre 1 — Dénombrement et Probabilités de base. Contenu : expériences aléatoires, univers Ω, événements, axiomes de Kolmogorov, formules de dénombrement (arrangements A(n,k)=n!/(n-k)!, combinaisons C(n,k)=n!/(k!(n-k)!), permutations n!), probabilités conditionnelles P(A|B)=P(A∩B)/P(B), formule des probabilités totales, formule de Bayes, indépendance, arbres de probabilité.",
            chapitre2: "Chapitre 2 — Variables Aléatoires Discrètes. Contenu : définition d'une VA discrète, loi de probabilité, fonction de répartition F(x)=P(X≤x), espérance E(X)=Σxi·P(X=xi), variance V(X)=E(X²)−[E(X)]², lois classiques : Bernoulli B(p), binomiale B(n,p), Poisson P(λ), géométrique. Propriétés de linéarité, formule de Koenig-Huygens.",
            chapitre3: "Chapitre 3 — Variables Aléatoires Continues. Contenu : densité f(x), P(a≤X≤b)=∫f(x)dx, fonction de répartition, espérance E(X)=∫x·f(x)dx. Lois continues : uniforme U(a,b), exponentielle Exp(λ), normale N(μ,σ²), loi normale centrée réduite N(0,1), table de la loi normale, théorème central limite.",
            chapitre4: "Chapitre 4 — Théorèmes Limites et Convergence. Contenu : convergence en probabilité et en loi, loi des grands nombres, théorème central limite (TCL), approximation normale de la binomiale, correction de continuité, intervalles de confiance, introduction aux tests d'hypothèses.",
            cartes: "Page de référence — Jeux de Cartes pour les probabilités. Jeu de 52 cartes (4 couleurs, 13 valeurs), jeu de 32 cartes (Belote), calculs de probabilités de tirage.",
            formules: "Formulaire de Probabilités — Résumé : dénombrement, axiomes, Bayes, VA discrètes/continues, lois classiques, théorèmes limites.",
            'rappels-integration': "Rappels d'Intégration — Fonctions, dérivation, primitives, intégration (par parties, changement de variable), applications aux densités de probabilité.",
            'simulateur-examen': "Simulateur d'Examen de Probabilités — QCM chronométré sur dénombrement, VA discrètes, VA continues, théorèmes limites.",
            exercices: "Exercices interactifs de Probabilités — Dénombrement, variables aléatoires, lois classiques, espérance/variance, TCL."
        },
        sql: {
            _default: "Cours de SQL et Bases de Données Relationnelles. Sujets : DDL (CREATE, ALTER, DROP), DML (INSERT, UPDATE, DELETE), SELECT, jointures (INNER, LEFT, RIGHT, FULL, CROSS), sous-requêtes, agrégation (GROUP BY, HAVING), fonctions, transactions (COMMIT, ROLLBACK), procédures stockées, triggers, PL/SQL, optimisation.",
            'mod01-ddl': "Module 1 — DDL (CREATE TABLE, ALTER TABLE, DROP TABLE, types de données, CREATE INDEX).",
            'mod02-constraints': "Module 2 — Contraintes (PRIMARY KEY, FOREIGN KEY, UNIQUE, NOT NULL, CHECK, DEFAULT).",
            'mod03-dml': "Module 3 — DML (INSERT INTO, UPDATE SET WHERE, DELETE FROM, MERGE).",
            'mod04-select': "Module 4 — SELECT (WHERE, ORDER BY, DISTINCT, alias, opérateurs logiques, UNION/INTERSECT/EXCEPT).",
            'mod05-calculations': "Module 5 — Calculs et agrégation (COUNT, SUM, AVG, MIN, MAX, GROUP BY, HAVING, CASE WHEN).",
            'mod06-strings': "Module 6 — Chaînes (CONCAT, UPPER, LOWER, SUBSTR, TRIM, REPLACE, REGEXP, CAST).",
            'mod07-dates-nulls': "Module 7a — Dates et NULL (SYSDATE, DATEADD, DATEDIFF, TO_DATE, IS NULL, NVL, COALESCE).",
            'mod07-joins': "Module 7b — Jointures (INNER JOIN, LEFT/RIGHT/FULL OUTER JOIN, CROSS JOIN, self-join, syntaxe ANSI).",
            'mod08-logic': "Module 8 — Logique conditionnelle (CASE WHEN, IIF, DECODE, NVL, COALESCE, NULLIF).",
            'mod09-loops': "Module 9 — Boucles et curseurs (DECLARE, OPEN, FETCH, CLOSE, LOOP, WHILE, FOR, BULK COLLECT).",
            'mod10-transactions': "Module 10 — Transactions (ACID, COMMIT, ROLLBACK, SAVEPOINT, niveaux d'isolation, verrous, deadlocks).",
            'mod11-procedures': "Module 11 — Procédures stockées et fonctions (CREATE PROCEDURE/FUNCTION, IN/OUT, PL/SQL, exceptions, packages).",
            'mod12-triggers': "Module 12 — Triggers (BEFORE/AFTER, INSERT/UPDATE/DELETE, FOR EACH ROW, :OLD/:NEW, INSTEAD OF).",
            formules: "Formulaire SQL — Résumé de toutes les commandes DDL, DML, SELECT, jointures, agrégation, PL/SQL.",
            rappels: "Rappels SQL — Concepts fondamentaux des bases de données relationnelles.",
            cartes: "Cartes mémoire SQL — Flashcards pour réviser les commandes SQL.",
            'simulateur-examen': "Simulateur d'Examen SQL — QCM chronométré sur tous les modules SQL.",
            exercices: "Exercices interactifs SQL — Requêtes pratiques à écrire."
        },
        'rd-ro': {
            _default: "Cours de Recherche Opérationnelle. Sujets : programmation linéaire (modélisation, résolution graphique), méthode du Simplexe (tableau, pivot, variables artificielles), dualité, transport (coin Nord-Ouest, Vogel, MODI), affectation (méthode Hongroise), graphes et ordonnancement (PERT/CPM), files d'attente (M/M/1, M/M/s).",
            chapitre1: "Chapitre 1 — Introduction à la RO. Définition, étapes de modélisation (variables de décision, fonction objectif, contraintes), classification des problèmes d'optimisation.",
            chapitre2: "Chapitre 2 — Programmation Linéaire. Forme standard Max/Min Z=c·x sous Ax≤b, x≥0. Résolution graphique : droites de contraintes, domaine réalisable, droite d'iso-profit, sommet optimal.",
            chapitre3: "Chapitre 3 — Méthode du Simplexe. Forme standard (variables d'écart), tableau du Simplexe, critère d'entrée/sortie, pivotage Gauss-Jordan, méthode du Grand M, méthode des deux phases, dégénérescence.",
            chapitre4: "Chapitre 4 — Dualité. Programme dual, théorèmes (dualité faible/forte), complémentarité des écarts, prix fictifs (shadow prices), lecture du dual dans le tableau final, analyse de sensibilité.",
            chapitre5: "Chapitre 5 — Problème de Transport. Sources/destinations, offres/demandes, solution initiale (coin Nord-Ouest, coût minimum, VAM), test d'optimalité (MODI/stepping-stone), problème déséquilibré.",
            chapitre6: "Chapitre 6 — Problème d'Affectation. Matrice de coûts, méthode Hongroise (réduction lignes/colonnes, couverture minimale), maximisation→minimisation.",
            chapitre7: "Chapitre 7 — Graphes et Ordonnancement. Graphes orientés/non-orientés, plus court chemin (Dijkstra, Bellman-Ford), arbre couvrant (Prim, Kruskal), ordonnancement PERT/CPM, dates au plus tôt/tard, marges, chemin critique.",
            chapitre8: "Chapitre 8 — Files d'Attente. Notation de Kendall, processus de Poisson, modèle M/M/1 (ρ=λ/μ, L=ρ/(1−ρ), W=1/(μ−λ)), M/M/s, M/M/1/K, formules de Little L=λW.",
            formules: "Formulaire de RO — Simplexe, dualité, transport, affectation, graphes, files d'attente.",
            'simulateur-examen': "Simulateur d'Examen RO — QCM et exercices chronométrés.",
            exercices: "Exercices interactifs RO — Modélisation, Simplexe, transport, affectation, graphes."
        },
        linux: {
            _default: "Cours d'Administration Linux Debian. Sujets : commandes de base, système de fichiers et permissions (rwx, chmod, chown), éditeurs (vi, nano), utilisateurs et groupes, réseau, SSH, scripting Bash.",
            chapitre1: "Chapitre 1 — Introduction à Linux. Distributions (Debian, Ubuntu), architecture (noyau, shell), arborescence (/, /home, /etc, /var), terminal, commandes de base (pwd, ls, cd, whoami).",
            chapitre2: "Chapitre 2 — Commandes de base. Navigation (cd, ls), fichiers (cp, mv, rm, mkdir, touch), affichage (cat, less, head, tail), recherche (find, grep), redirections (>, >>, |), man.",
            chapitre3: "Chapitre 3 — Permissions. Types de fichiers, rwx, chmod (symbolique u+x, numérique 755), chown, chgrp, umask, SUID/SGID/sticky bit, liens (ln, ln -s), montage (mount, fstab).",
            chapitre4: "Chapitre 4 — Éditeurs de texte. Vi/Vim (modes commande/insertion, navigation hjkl, i/a/o, dd, yy/p, :w, :q), Nano (Ctrl+raccourcis), .vimrc.",
            chapitre5: "Chapitre 5 — Utilisateurs et groupes. /etc/passwd, /etc/shadow, /etc/group, useradd, usermod, userdel, groupadd, passwd, su/sudo, visudo, .bashrc, /etc/skel.",
            chapitre6: "Chapitre 6 — Réseau. ip addr, ifconfig, /etc/network/interfaces, DNS (/etc/resolv.conf), routage (ip route), diagnostics (ping, traceroute, netstat, ss), pare-feu (iptables, ufw).",
            chapitre7: "Chapitre 7 — SSH. Protocole SSH (port 22), connexion (ssh user@host), clés (ssh-keygen, ssh-copy-id, authorized_keys), transfert (scp, sftp, rsync), tunnels (-L, -R), sécurisation (fail2ban).",
            chapitre8: "Chapitre 8 — Scripting Bash. Shebang, variables, arguments ($1, $@, $#, $?), conditions (if/elif/else, [[ ]]), boucles (for, while), case, fonctions, read, tableaux, débogage (set -x).",
            cartes: "Cartes mémoire Linux — Flashcards des commandes et concepts d'administration Debian.",
            formules: "Formulaire Linux — Résumé des commandes : fichiers, permissions, utilisateurs, réseau, SSH, Bash.",
            'simulateur-examen': "Simulateur d'Examen Linux — QCM chronométré sur l'administration Debian.",
            exercices: "Exercices interactifs Linux — Pratique des commandes et administration système."
        },
        php: {
            _default: "Cours de PHP Orienté Objet. Sujets : classes et objets, constructeur, encapsulation (public/protected/private), héritage (extends), classes abstraites, interfaces, traits, méthodes magiques, namespaces, autoloading (PSR-4, Composer), design patterns (Singleton, Factory, Observer, MVC, Strategy).",
            chapitre1: "Chapitre 1 — Introduction à la POO en PHP. Paradigme OO vs procédural, concepts (classe, objet, attribut, méthode), syntaxe (class, new, ->), premier programme OO.",
            chapitre2: "Chapitre 2 — Classes et Objets. class, propriétés ($this->), méthodes, __construct(), __destruct(), visibilité (public/private/protected), static, self::, constantes de classe.",
            chapitre3: "Chapitre 3 — Héritage. extends, surcharge, parent::, final, instanceof, type hinting, hiérarchie de classes.",
            chapitre4: "Chapitre 4 — Interfaces et Classes Abstraites. abstract class, interface, implements, différences, implémentation multiple, design par contrat.",
            chapitre5: "Chapitre 5 — Traits. Héritage multiple en PHP, trait, use, résolution de conflits (insteadof, as), précédence (classe > trait > parent).",
            chapitre6: "Chapitre 6 — Namespaces et Autoloading. namespace, use, alias, PSR-4, Composer (autoload, vendor), gestion des dépendances.",
            chapitre7: "Chapitre 7 — Design Patterns. Singleton, Factory, Abstract Factory, Builder, Adapter, Decorator, Facade, Observer, Strategy, MVC, anti-patterns.",
            chapitre8: "Chapitre 8 — Projet Pratique. Architecture MVC, PDO (connexion, requêtes préparées), modèles/contrôleurs/vues, routeur, gestion des erreurs/exceptions."
        },
        rd_java: {
            _default: "Cours Java — Fondamentaux et POO. Sujets : syntaxe, types et variables, opérateurs, conditions (if, switch), boucles (for, while), tableaux, méthodes, POO (classes, objets, constructeurs), encapsulation, héritage, polymorphisme, classes abstraites, interfaces, collections (ArrayList, HashMap).",
            chapitre1: "Chapitre 1 — Introduction à Java. JDK/JRE/JVM, compilation (javac), exécution (java), structure (public class, main), Hello World, IDE.",
            chapitre2: "Chapitre 2 — Variables et Types. Primitifs (byte, short, int, long, float, double, char, boolean), String, déclaration, casting, Scanner.",
            chapitre3: "Chapitre 3 — Conditions. if/else if/else, opérateurs (==, !=, <, >, &&, ||, !), ternaire (?:), switch/case.",
            chapitre4: "Chapitre 4 — Boucles. while, do-while, for, for-each, break, continue, boucles imbriquées.",
            chapitre5: "Chapitre 5 — Tableaux. int[] tab = new int[n], accès, parcours, 2D (matrices), Arrays (sort, binarySearch, fill), ArrayList.",
            chapitre6: "Chapitre 6 — Méthodes. Déclaration, return, void, passage par valeur/référence, surcharge (overloading), récursion, static.",
            chapitre7: "Chapitre 7 — POO (Classes et Objets). Attributs, constructeurs, this, instanciation (new), toString(), equals(), null.",
            chapitre8: "Chapitre 8 — Encapsulation. public/private/protected, getters/setters, data hiding, JavaBeans, immutabilité.",
            chapitre9: "Chapitre 9 — Héritage et Polymorphisme. extends, super, @Override, polymorphisme, classes abstraites, interfaces, default methods.",
            chapitre10: "Chapitre 10 — Collections. List, Set, Map, ArrayList, LinkedList, HashSet, HashMap, Iterator, generics <T>, Comparable, Comparator.",
            cartes: "Cartes mémoire Java — Flashcards : syntaxe, POO, collections.",
            formules: "Formulaire Java — Résumé : types, opérateurs, contrôle de flux, tableaux, POO, collections.",
            'simulateur-examen': "Simulateur d'Examen Java — QCM chronométré.",
            exercices: "Exercices interactifs Java — Syntaxe, POO, collections."
        },
        rd_winserver: {
            _default: "Cours Windows Server 2022. Sujets : installation, Active Directory (AD DS), GPO, DNS/DHCP, services de fichiers, sauvegarde, haute disponibilité (Failover Clustering, Hyper-V), maintenance (Event Viewer, Performance Monitor, WSUS).",
            chapitre1: "Chapitre 1 — Introduction à Windows Server. Éditions (Standard, Datacenter), installation (GUI, Server Core), configuration initiale, rôles/fonctionnalités, PowerShell.",
            chapitre2: "Chapitre 2 — Active Directory. Domaine, forêt, arbre, OU, installation AD DS, utilisateurs/groupes (New-ADUser), types de groupes, réplication, DNS intégré.",
            chapitre3: "Chapitre 3 — GPO. GPMC.msc, création/liaison, héritage/blocage, filtrage de sécurité, préférences, déploiement logiciels, gpupdate /force, gpresult.",
            chapitre4: "Chapitre 4 — DNS et DHCP. DNS (zones directes/inversées, A, AAAA, CNAME, MX, PTR, SRV), DHCP (étendue, réservation, options, DHCP Failover).",
            chapitre5: "Chapitre 5 — Services de fichiers. Partages SMB, permissions NTFS (contrôle total, modification, lecture), NTFS+partage, DFS, quotas, FSRM, ABE.",
            chapitre6: "Chapitre 6 — Sauvegarde. Windows Server Backup, wbadmin, types (complète, incrémentielle, différentielle), restauration, VSS, stratégie 3-2-1.",
            chapitre7: "Chapitre 7 — Haute disponibilité. SLA (99.9%→99.999%), Failover Clustering (quorum, basculement), NLB, Hyper-V (VM, commutateurs, snapshots, réplication, migration), Storage Spaces.",
            chapitre8: "Chapitre 8 — Maintenance. Server Manager, Event Viewer, Performance Monitor, Gestionnaire des tâches, WSUS, scripts PowerShell, bonnes pratiques.",
            cartes: "Cartes mémoire Windows Server — Flashcards d'administration.",
            formules: "Formulaire Windows Server — Commandes PowerShell, AD, DNS, DHCP, GPO.",
            'simulateur-examen': "Simulateur d'Examen Windows Server — QCM chronométré.",
            exercices: "Exercices interactifs Windows Server — TP d'administration et configuration."
        }
    };

    // ================================================================
    // 3. DÉTECTION DU CONTEXTE
    // ================================================================
    function detectContext() {
        const href = window.location.href.toLowerCase().replace(/\\/g, '/');

        let project = 'portal';
        if (href.includes('/probabilites/')) project = 'probabilites';
        else if (href.includes('/sql/')) project = 'sql';
        else if (href.includes('/rd-ro/')) project = 'rd-ro';
        else if (href.includes('/linux/')) project = 'linux';
        else if (href.includes('/php/')) project = 'php';
        else if (href.includes('/rd_java/')) project = 'rd_java';
        else if (href.includes('/rd_winserver/')) project = 'rd_winserver';

        const pageMatch = href.match(/\/([^\/]+)\.html/);
        const page = pageMatch ? pageMatch[1] : 'index';

        const projectCtx = CONTEXTS[project] || CONTEXTS.portal;
        const context = projectCtx[page] || projectCtx._default;

        return { project, page, context };
    }

    function getWelcomeMessage(project) {
        const msgs = {
            portal: "Bonjour ! 👋 Je suis **RD-AI**, ton assistant pédagogique. Choisis un cours et pose-moi tes questions !",
            probabilites: "Bonjour ! 👋 Je suis **RD-AI**, ton assistant en probabilités et statistiques. Pose-moi tes questions sur le dénombrement, les lois, l'espérance, la variance ou le TCL !",
            sql: "Bonjour ! 👋 Je suis **RD-AI**, ton assistant SQL. Pose-moi tes questions sur les requêtes, jointures, transactions ou PL/SQL !",
            'rd-ro': "Bonjour ! 👋 Je suis **RD-AI**, ton assistant en Recherche Opérationnelle. Simplexe, transport, dualité… je t'explique tout !",
            linux: "Bonjour ! 👋 Je suis **RD-AI**, ton assistant Linux. Commandes, permissions, réseau, SSH, scripting Bash — demande-moi !",
            php: "Bonjour ! 👋 Je suis **RD-AI**, ton assistant PHP POO. Classes, héritage, interfaces, patterns — je t'aide à comprendre !",
            rd_java: "Bonjour ! 👋 Je suis **RD-AI**, ton assistant Java. Syntaxe, POO, collections — pose-moi tes questions !",
            rd_winserver: "Bonjour ! 👋 Je suis **RD-AI**, ton assistant Windows Server. AD, GPO, DNS, DHCP, Hyper-V — je suis là pour t'aider !"
        };
        return msgs[project] || msgs.portal;
    }

    function buildSystemPrompt(context) {
        return `Tu es RD-AI, un assistant pédagogique intelligent créé pour aider les étudiants du Portail des Cours Interactifs.

RÈGLES STRICTES :
- Tu es RD-AI. Ne mentionne JAMAIS DeepSeek, OpenAI, ChatGPT, ou tout autre fournisseur d'IA. Si on te demande qui tu es, tu réponds "Je suis RD-AI, ton assistant pédagogique."
- Tu réponds dans la langue de la question posée par l'étudiant.
- Tu fournis des explications claires, structurées, avec des exemples concrets.
- Tu utilises la notation LaTeX pour les formules mathématiques : $formule$ pour inline, $$formule$$ pour les blocs.
- Tu restes concis mais précis. Pas de réponse de plus de 400 mots sauf si l'étudiant le demande.
- Si la question sort du cadre du cours, signale-le poliment et redirige vers le sujet.
- Tu peux proposer des exercices ou des exemples pour aider à la compréhension.
- Sois encourageant et motivant avec les étudiants.

CONTEXTE DE LA PAGE ACTUELLE :
${context}`;
    }

    // ================================================================
    // 4. RENDU MARKDOWN SIMPLIFIÉ
    // ================================================================
    function renderMarkdown(text) {
        if (!text) return '';
        // Protect code blocks
        const codeBlocks = [];
        text = text.replace(/```(\w*)\n([\s\S]*?)```/g, (_, lang, code) => {
            const i = codeBlocks.length;
            codeBlocks.push(`<pre class="rdai-code-block"><code>${escapeHtml(code.trim())}</code></pre>`);
            return `%%CODEBLOCK_${i}%%`;
        });
        // Protect inline code
        const inlineCodes = [];
        text = text.replace(/`([^`]+)`/g, (_, code) => {
            const i = inlineCodes.length;
            inlineCodes.push(`<code class="rdai-inline-code">${escapeHtml(code)}</code>`);
            return `%%INLINE_${i}%%`;
        });
        // Escape remaining HTML
        text = escapeHtml(text);
        // Restore protected elements
        codeBlocks.forEach((block, i) => { text = text.replace(`%%CODEBLOCK_${i}%%`, block); });
        inlineCodes.forEach((code, i) => { text = text.replace(`%%INLINE_${i}%%`, code); });
        // Bold
        text = text.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
        // Italic
        text = text.replace(/(?<!\*)\*([^*]+?)\*(?!\*)/g, '<em>$1</em>');
        // Headers
        text = text.replace(/^### (.+)$/gm, '<strong class="rdai-h3">$1</strong>');
        text = text.replace(/^## (.+)$/gm, '<strong class="rdai-h2">$1</strong>');
        // Bullet lists
        text = text.replace(/^[•\-\*] (.+)$/gm, '<li>$1</li>');
        text = text.replace(/((?:<li>.*<\/li>\s*)+)/g, '<ul class="rdai-list">$1</ul>');
        // Numbered lists
        text = text.replace(/^\d+\.\s(.+)$/gm, '<li>$1</li>');
        // Line breaks
        text = text.replace(/\n{2,}/g, '<br><br>');
        text = text.replace(/\n/g, '<br>');
        return text;
    }

    function escapeHtml(str) {
        return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
    }

    // ================================================================
    // 5. FILTRE deepseek/openai/chatgpt → RD-AI
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
    // 6. INJECTION CSS
    // ================================================================
    function injectStyles() {
        if (document.getElementById('rdai-styles')) return;
        const style = document.createElement('style');
        style.id = 'rdai-styles';
        style.textContent = `
/* ========== RD-AI Chat Widget ========== */
.rdai-bubble {
    position: fixed;
    bottom: 24px;
    right: 24px;
    width: 58px;
    height: 58px;
    border-radius: 50%;
    background: linear-gradient(135deg, #6366f1, #8b5cf6);
    color: #fff;
    border: none;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 26px;
    box-shadow: 0 4px 20px rgba(99,102,241,0.45);
    z-index: 99999;
    transition: transform 0.3s ease, box-shadow 0.3s ease;
    animation: rdai-pulse 3s ease-in-out infinite;
}
.rdai-bubble:hover {
    transform: scale(1.12);
    box-shadow: 0 6px 30px rgba(99,102,241,0.65);
}
.rdai-bubble.rdai-active {
    animation: none;
    background: linear-gradient(135deg, #8b5cf6, #6366f1);
}
@keyframes rdai-pulse {
    0%, 100% { box-shadow: 0 4px 20px rgba(99,102,241,0.45); }
    50% { box-shadow: 0 4px 30px rgba(139,92,246,0.7); }
}

/* Panel */
.rdai-panel {
    position: fixed;
    bottom: 96px;
    right: 24px;
    width: 400px;
    height: 540px;
    border-radius: 20px;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    background: #ffffff;
    box-shadow: 0 12px 48px rgba(0,0,0,0.18), 0 0 0 1px rgba(0,0,0,0.05);
    z-index: 99998;
    opacity: 0;
    transform: translateY(24px) scale(0.92);
    pointer-events: none;
    transition: opacity 0.35s ease, transform 0.35s ease;
}
.rdai-panel.rdai-open {
    opacity: 1;
    transform: translateY(0) scale(1);
    pointer-events: auto;
}

/* Header */
.rdai-header {
    background: linear-gradient(135deg, #6366f1, #8b5cf6);
    color: #fff;
    padding: 16px 18px;
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
    border-radius: 50%;
    background: rgba(255,255,255,0.2);
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 18px;
}
.rdai-header-info h3 {
    margin: 0;
    font-size: 15px;
    font-weight: 700;
    letter-spacing: 0.3px;
}
.rdai-header-info span {
    font-size: 11px;
    opacity: 0.85;
}
.rdai-header-actions {
    display: flex;
    gap: 4px;
}
.rdai-header-btn {
    background: none;
    border: none;
    color: #fff;
    font-size: 16px;
    cursor: pointer;
    opacity: 0.75;
    padding: 4px 6px;
    border-radius: 6px;
    transition: opacity 0.2s, background 0.2s;
}
.rdai-header-btn:hover {
    opacity: 1;
    background: rgba(255,255,255,0.15);
}

/* Messages */
.rdai-messages {
    flex: 1;
    overflow-y: auto;
    padding: 18px 16px;
    display: flex;
    flex-direction: column;
    gap: 14px;
    scroll-behavior: smooth;
}
.rdai-messages::-webkit-scrollbar { width: 5px; }
.rdai-messages::-webkit-scrollbar-track { background: transparent; }
.rdai-messages::-webkit-scrollbar-thumb { background: #cbd5e1; border-radius: 10px; }

.rdai-msg {
    display: flex;
    align-items: flex-end;
    gap: 8px;
}
.rdai-msg-user { flex-direction: row-reverse; }

.rdai-msg-avatar {
    width: 28px;
    height: 28px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 13px;
    flex-shrink: 0;
}
.rdai-msg-ai .rdai-msg-avatar {
    background: linear-gradient(135deg, #6366f1, #8b5cf6);
    color: #fff;
}
.rdai-msg-user .rdai-msg-avatar {
    background: #e2e8f0;
    color: #475569;
}

.rdai-msg-content {
    max-width: 82%;
    padding: 11px 15px;
    border-radius: 18px;
    font-size: 13.5px;
    line-height: 1.6;
    word-wrap: break-word;
    overflow-wrap: break-word;
}
.rdai-msg-user .rdai-msg-content {
    background: linear-gradient(135deg, #6366f1, #7c3aed);
    color: #fff;
    border-bottom-right-radius: 6px;
}
.rdai-msg-ai .rdai-msg-content {
    background: #f1f5f9;
    color: #1e293b;
    border-bottom-left-radius: 6px;
}

/* Code blocks in messages */
.rdai-code-block {
    background: #1e293b;
    color: #e2e8f0;
    padding: 10px 14px;
    border-radius: 8px;
    font-size: 12.5px;
    font-family: 'JetBrains Mono', 'Fira Code', 'Consolas', monospace;
    overflow-x: auto;
    margin: 8px 0;
    white-space: pre-wrap;
    word-break: break-all;
}
.rdai-inline-code {
    background: rgba(99,102,241,0.12);
    color: #6366f1;
    padding: 2px 6px;
    border-radius: 4px;
    font-size: 12.5px;
    font-family: 'JetBrains Mono', 'Fira Code', 'Consolas', monospace;
}
.rdai-list {
    margin: 6px 0;
    padding-left: 20px;
}
.rdai-list li {
    margin: 3px 0;
}
.rdai-h2 { font-size: 1.1em; display: block; margin: 8px 0 4px; }
.rdai-h3 { font-size: 1.05em; display: block; margin: 6px 0 3px; }

/* Typing indicator */
.rdai-typing .rdai-msg-content {
    display: flex;
    align-items: center;
    gap: 5px;
    padding: 14px 20px;
}
.rdai-dot {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: #94a3b8;
    animation: rdai-bounce 1.4s infinite ease-in-out;
}
.rdai-dot:nth-child(2) { animation-delay: 0.16s; }
.rdai-dot:nth-child(3) { animation-delay: 0.32s; }
@keyframes rdai-bounce {
    0%, 80%, 100% { transform: scale(0.4); opacity: 0.4; }
    40% { transform: scale(1); opacity: 1; }
}

/* Input area */
.rdai-input-area {
    padding: 14px 16px;
    border-top: 1px solid #e2e8f0;
    display: flex;
    gap: 10px;
    align-items: flex-end;
    flex-shrink: 0;
    background: #fff;
}
.rdai-input {
    flex: 1;
    border: 1.5px solid #e2e8f0;
    border-radius: 14px;
    padding: 10px 14px;
    font-size: 13.5px;
    line-height: 1.4;
    resize: none;
    outline: none;
    font-family: inherit;
    max-height: 100px;
    min-height: 42px;
    background: #f8fafc;
    transition: border-color 0.2s;
}
.rdai-input:focus {
    border-color: #6366f1;
}
.rdai-input::placeholder {
    color: #94a3b8;
}
.rdai-send {
    width: 42px;
    height: 42px;
    border-radius: 50%;
    background: linear-gradient(135deg, #6366f1, #8b5cf6);
    color: #fff;
    border: none;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    transition: transform 0.2s, opacity 0.2s;
    font-size: 16px;
}
.rdai-send:hover:not(:disabled) { transform: scale(1.08); }
.rdai-send:disabled { opacity: 0.4; cursor: not-allowed; transform: none; }

/* Footer */
.rdai-footer {
    text-align: center;
    padding: 6px;
    font-size: 10px;
    color: #94a3b8;
    flex-shrink: 0;
    border-top: 1px solid #f1f5f9;
}

/* ========== DARK MODE ========== */
[data-theme="dark"] .rdai-panel,
html.dark .rdai-panel,
body.dark-mode .rdai-panel {
    background: #0f172a;
    box-shadow: 0 12px 48px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.06);
}
[data-theme="dark"] .rdai-msg-ai .rdai-msg-content,
html.dark .rdai-msg-ai .rdai-msg-content,
body.dark-mode .rdai-msg-ai .rdai-msg-content {
    background: #1e293b;
    color: #e2e8f0;
}
[data-theme="dark"] .rdai-msg-user .rdai-msg-avatar,
html.dark .rdai-msg-user .rdai-msg-avatar,
body.dark-mode .rdai-msg-user .rdai-msg-avatar {
    background: #334155;
    color: #e2e8f0;
}
[data-theme="dark"] .rdai-input-area,
html.dark .rdai-input-area,
body.dark-mode .rdai-input-area {
    border-top-color: #1e293b;
    background: #0f172a;
}
[data-theme="dark"] .rdai-input,
html.dark .rdai-input,
body.dark-mode .rdai-input {
    background: #1e293b;
    border-color: #334155;
    color: #e2e8f0;
}
[data-theme="dark"] .rdai-input::placeholder,
html.dark .rdai-input::placeholder,
body.dark-mode .rdai-input::placeholder {
    color: #64748b;
}
[data-theme="dark"] .rdai-messages::-webkit-scrollbar-thumb,
html.dark .rdai-messages::-webkit-scrollbar-thumb,
body.dark-mode .rdai-messages::-webkit-scrollbar-thumb {
    background: #334155;
}
[data-theme="dark"] .rdai-footer,
html.dark .rdai-footer,
body.dark-mode .rdai-footer {
    border-top-color: #1e293b;
    color: #475569;
}
[data-theme="dark"] .rdai-inline-code,
html.dark .rdai-inline-code,
body.dark-mode .rdai-inline-code {
    background: rgba(99,102,241,0.2);
    color: #a5b4fc;
}
[data-theme="dark"] .rdai-code-block,
html.dark .rdai-code-block,
body.dark-mode .rdai-code-block {
    background: #0f172a;
    border: 1px solid #1e293b;
}

/* ========== MOBILE ========== */
@media (max-width: 480px) {
    .rdai-panel {
        bottom: 0;
        right: 0;
        left: 0;
        width: 100%;
        height: 75vh;
        border-radius: 20px 20px 0 0;
    }
    .rdai-bubble {
        bottom: 16px;
        right: 16px;
        width: 52px;
        height: 52px;
        font-size: 22px;
    }
}
@media (max-width: 768px) and (min-width: 481px) {
    .rdai-panel {
        width: 340px;
        height: 480px;
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
    let messages = []; // { role, content }
    let ctx;

    function createWidget() {
        // Bubble
        const bubble = document.createElement('button');
        bubble.className = 'rdai-bubble';
        bubble.setAttribute('aria-label', 'Ouvrir le chat RD-AI');
        bubble.setAttribute('title', 'Discuter avec RD-AI');
        bubble.innerHTML = '<i class="fas fa-robot"></i>';
        bubble.addEventListener('click', togglePanel);
        document.body.appendChild(bubble);

        // Panel
        panelEl = document.createElement('div');
        panelEl.className = 'rdai-panel';
        panelEl.setAttribute('role', 'dialog');
        panelEl.setAttribute('aria-label', 'Chat RD-AI');
        panelEl.innerHTML = `
            <div class="rdai-header">
                <div class="rdai-header-left">
                    <div class="rdai-header-avatar"><i class="fas fa-robot"></i></div>
                    <div class="rdai-header-info">
                        <h3>RD-AI</h3>
                        <span>Assistant pédagogique</span>
                    </div>
                </div>
                <div class="rdai-header-actions">
                    <button class="rdai-header-btn rdai-clear-btn" title="Effacer l'historique"><i class="fas fa-trash-can"></i></button>
                    <button class="rdai-header-btn rdai-close-btn" title="Fermer"><i class="fas fa-xmark"></i></button>
                </div>
            </div>
            <div class="rdai-messages"></div>
            <div class="rdai-input-area">
                <textarea class="rdai-input" placeholder="Pose ta question..." rows="1"></textarea>
                <button class="rdai-send" title="Envoyer" disabled><i class="fas fa-paper-plane"></i></button>
            </div>
            <div class="rdai-footer">RD-AI — Assistant pédagogique intelligent</div>
        `;
        document.body.appendChild(panelEl);

        // References
        messagesEl = panelEl.querySelector('.rdai-messages');
        inputEl = panelEl.querySelector('.rdai-input');
        sendBtn = panelEl.querySelector('.rdai-send');

        // Events
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

        // Close on Escape
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
        document.querySelector('.rdai-bubble').classList.toggle('rdai-active', isOpen);
        if (isOpen) {
            inputEl.focus();
            scrollToBottom();
        }
    }

    // ================================================================
    // 8. GESTION DES MESSAGES
    // ================================================================
    function addMessageToDOM(role, content, isWelcome) {
        const msg = document.createElement('div');
        msg.className = `rdai-msg rdai-msg-${role}`;

        const avatar = document.createElement('div');
        avatar.className = 'rdai-msg-avatar';
        avatar.innerHTML = role === 'ai'
            ? '<i class="fas fa-robot"></i>'
            : '<i class="fas fa-user"></i>';

        const contentEl = document.createElement('div');
        contentEl.className = 'rdai-msg-content';
        contentEl.innerHTML = renderMarkdown(content);

        msg.appendChild(avatar);
        msg.appendChild(contentEl);

        // Insert before typing indicator if present
        if (typingEl && typingEl.parentNode) {
            messagesEl.insertBefore(msg, typingEl);
        } else {
            messagesEl.appendChild(msg);
        }
        scrollToBottom();
        return contentEl;
    }

    function showTyping() {
        typingEl = document.createElement('div');
        typingEl.className = 'rdai-msg rdai-msg-ai rdai-typing';
        typingEl.innerHTML = `
            <div class="rdai-msg-avatar"><i class="fas fa-robot"></i></div>
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
        requestAnimationFrame(() => {
            messagesEl.scrollTop = messagesEl.scrollHeight;
        });
    }

    // ================================================================
    // 9. HISTORIQUE localStorage
    // ================================================================
    function getStorageKey() {
        return `rdai_history_${ctx.project}`;
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
                project: ctx.project,
                messages: messages.slice(-CONFIG.maxHistory),
                timestamp: Date.now()
            };
            localStorage.setItem(getStorageKey(), JSON.stringify(data));
        } catch (e) { /* quota exceeded — silently fail */ }
    }

    function clearHistory() {
        messages = [];
        try { localStorage.removeItem(getStorageKey()); } catch (e) {}
        messagesEl.innerHTML = '';
        addMessageToDOM('ai', getWelcomeMessage(ctx.project), true);
    }

    function renderStoredMessages() {
        messagesEl.innerHTML = '';
        // Always show welcome
        addMessageToDOM('ai', getWelcomeMessage(ctx.project), true);
        // Render stored messages
        messages.forEach(m => {
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

        // Add user message
        inputEl.value = '';
        inputEl.style.height = 'auto';
        sendBtn.disabled = true;
        addMessageToDOM('user', text);
        messages.push({ role: 'user', content: text });
        saveHistory();

        // Call API
        isStreaming = true;
        showTyping();

        try {
            const apiMessages = [
                { role: 'system', content: buildSystemPrompt(ctx.context) },
                ...messages.slice(-CONFIG.maxHistory)
            ];

            const response = await fetch(CONFIG.apiUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    model: CONFIG.model,
                    messages: apiMessages,
                    max_tokens: CONFIG.maxTokens,
                    temperature: CONFIG.temperature,
                    stream: true
                })
            });

            if (!response.ok) {
                const errText = await response.text();
                throw new Error(`API Error ${response.status}: ${errText}`);
            }

            // Streaming SSE
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

            // Final render
            fullResponse = filterResponse(fullResponse);
            contentEl.innerHTML = renderMarkdown(fullResponse);
            messages.push({ role: 'assistant', content: fullResponse });
            saveHistory();

            // Trigger MathJax if available
            triggerMathJax(contentEl);

        } catch (err) {
            hideTyping();
            console.error('RD-AI Error:', err);
            let errorMsg = "Désolé, je n'ai pas pu répondre. ";
            if (err.message.includes('Failed to fetch') || err.message.includes('NetworkError')) {
                errorMsg += "Vérifie ta connexion internet.";
            } else if (err.message.includes('401') || err.message.includes('403')) {
                errorMsg += "Problème d'authentification. Contacte l'administrateur.";
            } else if (err.message.includes('429')) {
                errorMsg += "Trop de requêtes. Attends un moment et réessaie.";
            } else {
                errorMsg += "Une erreur est survenue. Réessaie dans quelques instants.";
            }
            addMessageToDOM('ai', errorMsg);
        } finally {
            isStreaming = false;
            sendBtn.disabled = !inputEl.value.trim();
        }
    }

    function triggerMathJax(el) {
        try {
            if (window.MathJax) {
                if (typeof MathJax.typesetPromise === 'function') {
                    MathJax.typesetPromise([el]).catch(() => {});
                } else if (typeof MathJax.typeset === 'function') {
                    MathJax.typeset([el]);
                }
            }
        } catch (e) { /* MathJax not available */ }
    }

    // ================================================================
    // 11. INITIALISATION
    // ================================================================
    function init() {
        // Detect page context
        ctx = detectContext();

        // Inject CSS + create widget
        injectStyles();
        createWidget();

        // Load history & render
        loadHistory();
        renderStoredMessages();
    }

    // Wait for DOM
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

})();

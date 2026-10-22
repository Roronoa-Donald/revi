/**
 * Pages « examens » et « exercices » du cours « Windows Server B3 ».
 */
'use strict';

const { ic, crumb, box } = require('../../../../scripts/course-kit');
const { chnav, disclaimer } = require('./helpers');

/* ======================== Examens Blancs ======================== */

function examens(course) {
  const crumbs = crumb(course, [
    { label: 'Accueil', href: '../index.html' },
    { label: 'Sommaire', href: '../sommaire.html' },
    { label: 'Examens blancs' }
  ]);

  const body = [
    crumbs,
    '  <h1>Examens Blancs &amp; Épreuves Corrigées — Windows Server B3</h1>',
    '  <p class="lead">Deux épreuves d’évaluation complètes conformes aux exigences académiques et professionnelles de niveau Bachelor 3 en ingénierie des systèmes Windows, gouvernance d’annuaire Active Directory, stratégies de groupe, virtualisation Hyper-V et haute disponibilité.</p>',
    '',
    '  <h2>Épreuve 1 : Contrôle Continu (CC) — Durée 1 h 30 (Barème sur 20 points)</h2>',
    box('standard', 'Sujet du Contrôle Continu — Architecture Système, Active Directory DS &amp; GPO', [
      '<h4>Partie 1 : Architecture Système, Services Réseau DHCP/DNS &amp; Licences (6 points)</h4>',
      '<ol>',
      '  <li>Détaillez la différence architecturale fondamentale entre l’installation Server Core et l’installation avec Expérience Utilisateur (Desktop Experience). Quels sont les trois avantages opérationnels majeurs de Server Core en environnement de production ? (3 pts)</li>',
      '  <li>Un serveur physique dispose de 2 processeurs de 6 cœurs chacun et doit héberger 8 machines virtuelles Windows Server. Calculez le nombre de cœurs à licencier selon les règles Microsoft et comparez le coût entre les éditions Standard (120 € / pack 2 cœurs) et Datacenter (750 € / pack 2 cœurs). Quelle édition recommandez-vous ? (3 pts)</li>',
      '</ol>',
      '<h4>Partie 2 : Active Directory DS, Rôles FSMO &amp; Modèle AGDLP (7 points)</h4>',
      '<ol>',
      '  <li>Citez les 5 rôles FSMO (Flexible Single Master Operations). Précisez pour chacun son niveau d’action (Forêt ou Domaine) et la conséquence immédiate sur le système d’information si le contrôleur détenteur du rôle subit une panne prolongée. (4 pts)</li>',
      '  <li>Expliquez en détail le modèle AGDLP recommandé par Microsoft pour la gestion des droits d’accès. Pourquoi est-il formellement proscrit d’ajouter directement un compte utilisateur dans un groupe Local de Domaine (DL) ou sur une liste de contrôle d’accès (ACL) ? (3 pts)</li>',
      '</ol>',
      '<h4>Partie 3 : Stratégies de Groupe (GPO) &amp; Résolution de Conflits (7 points)</h4>',
      '<ol>',
      '  <li>Décrivez le cycle de traitement et l’ordre d’application strict des stratégies de groupe (modèle LSDOU). Quelle stratégie gagne en cas de conflit sur un même paramètre entre le niveau Domaine et le niveau Unité Organisationnelle (OU) ? (3 pts)</li>',
      '  <li>Une OU active l’option « Bloquer l’héritage » (Block Inheritance). Une GPO de niveau Domaine liée avec l’option « Appliquée » (Enforced) est-elle bloquée par cette OU ? Justifiez en explicitant la règle de primauté absolue de Microsoft. (4 pts)</li>',
      '</ol>'
    ].join('\n')),
    '',
    box('solution', 'Corrigé type &amp; Barème détaillé du Contrôle Continu', [
      '<h4>Corrigé Partie 1 (6 points)</h4>',
      '<ul>',
      '  <li><strong>Server Core vs Desktop Experience (3 pts) :</strong> Server Core installe uniquement le noyau, les sous-systèmes d’exécution et les services en ligne de commande (PowerShell / cmd) sans interface graphique (GUI) ni explorateur de fichiers. Les 3 avantages majeurs sont : ' +
      '  1. <em>Surface d’attaque considérablement réduite</em> (moins de code et de binaires exposés, réduction drastique des vulnérabilités) ; ' +
      '  2. <em>Consommation de ressources minime</em> (empreinte RAM et CPU réduite, permettant de densifier les machines virtuelles) ; ' +
      '  3. <em>Maintenance allégée</em> (beaucoup moins de correctifs de sécurité mensuels et de redémarrages serveur requis).</li>',
      '  <li><strong>Calcul de licences (3 pts) :</strong> ' +
      '  Règle socket : min 8 cœurs par socket (2 sockets de 6 cœurs -> comptés comme $2 \\times 8 = 16$ cœurs de base). ' +
      '  Règle serveur : min 16 cœurs physiques (respecté). Packs de base = $16 / 2 = 8$ packs de 2 cœurs. ' +
      '  Pour 8 VMs en édition Standard : facteur de couverture $= \\lceil 8 / 2 \\rceil = 4$. Total packs Standard $= 8 \\times 4 = 32$ packs. Coût $= 32 \\times 120 = 3\\,840$ €. ' +
      '  En édition Datacenter : 1 seule couverture $= 8$ packs. Coût $= 8 \\times 750 = 6\\,000$ €. ' +
      '  Recommandation : Édition Standard recommandée (économie de $2\\,160$ €). À partir de 12 VMs, Datacenter devient plus rentable.</li>',
      '</ul>',
      '<h4>Corrigé Partie 2 (7 points)</h4>',
      '<ul>',
      '  <li><strong>Les 5 rôles FSMO (4 pts) :</strong> ' +
      '  1. <em>Schema Master (Forêt) :</em> gère la structure de l’annuaire. Panne : blocage des extensions de schéma (ex. Exchange, mises à jour majeures), impact nul sur les opérations courantes. ' +
      '  2. <em>Domain Naming Master (Forêt) :</em> ajout/suppression de domaines. Panne : impossibilité de modifier l’arborescence des domaines. ' +
      '  3. <em>PDC Emulator (Domaine) :</em> référence de temps NTP, verrouillage de comptes, compatibilité NTLM. Panne critique : désynchronisation horaire de Kerberos, retards de verrouillage de mots de passe erronés. ' +
      '  4. <em>RID Master (Domaine) :</em> alloue des blocs de RID aux contrôleurs. Panne : si le pool local d’un DC s’épuise, impossibilité de créer de nouveaux comptes utilisateurs/ordinateurs. ' +
      '  5. <em>Infrastructure Master (Domaine) :</em> met à jour les références inter-domaines. Panne : impact sur les traductions de noms d’objets dans les forêts multi-domaines.</li>',
      '  <li><strong>Modèle AGDLP (3 pts) :</strong> Accounts -> Global Groups -> Domain Local Groups -> Permissions. ' +
      '  Interdiction de rattacher un compte directement à un groupe DL ou une ACL : cela provoque une rupture de traçabilité, rend l’audit des privilèges impossible, démultiplie la taille des jetons d’accès et empêche la réutilisation modulaire des rôles lors de migrations ou d’évolutions organisationnelles.</li>',
      '</ul>',
      '<h4>Corrigé Partie 3 (7 points)</h4>',
      '<ul>',
      '  <li><strong>Ordre LSDOU (3 pts) :</strong> ' +
      '  Les GPOs sont traitées dans l’ordre : 1. Local, 2. Site, 3. Domaine, 4. Unité Organisationnelle (OU). En cas de conflit sur un paramètre identique sans option spéciale, c’est la règle de la dernière stratégie appliquée qui prévaut (« Last Writer Wins ») : la GPO de niveau OU écrase la valeur définie au niveau Domaine.</li>',
      '  <li><strong>Enforced vs Block Inheritance (4 pts) :</strong> ' +
      '  Non, la GPO Enforced n’est <em>pas</em> bloquée. ' +
      '  Dans l’architecture de sécurité Active Directory, l’option Enforced (anciennement « No Override ») dispose d’une priorité hiérarchique absolue : elle traverse obligatoirement tous les blocages d’héritage configurés sur les OUs enfants, et ses paramètres ne peuvent être écrasés par aucune stratégie descendante. Cette règle garantit que les politiques de sécurité régaliennes de l’entreprise (ex. complexité de mot de passe, chiffrement BitLocker) s’appliquent à l’ensemble du parc sans exception.</li>',
      '</ul>'
    ].join('\n')),
    '',
    '  <h2>Épreuve 2 : Examen Terminal (ET) — Durée 2 h 00 (Barème sur 20 points)</h2>',
    box('standard', 'Sujet de l’Examen Terminal — Permissions Réseau, Virtualisation Hyper-V &amp; Quorum', [
      '<h4>Dossier 1 : Sécurité des Services de Fichiers, Partage SMB &amp; NTFS (6 points)</h4>',
      '<ol>',
      '  <li>Un dossier réseau <code>\\\\SRV01\\Comptabilite</code> est partagé avec l’autorisation SMB « Change » pour le groupe <code>Tout le monde</code>. Sur le système de fichiers local NTFS, le sous-dossier <code>Factures</code> accorde « Full Control » au groupe <code>DL_Factures_Modif</code> et « Read » au groupe <code>DL_Factures_Lecture</code>. ' +
      '  Déterminez les droits d’accès réseau effectifs pour un utilisateur membre de ces deux groupes accédant au partage à distance. Expliquez la règle du plus restrictif. (3 pts)</li>',
      '  <li>Sur un fichier confidentiel, l’utilisateur Bob hérite de la permission « Modify » via son groupe métier, mais possède une entrée directe « Explicit Deny » sur la permission « Write ». Bob peut-il enregistrer des modifications dans ce fichier ? Détaillez la hiérarchie des ACEs NTFS (Explicit Deny, Explicit Allow, Inherited Deny, Inherited Allow). (3 pts)</li>',
      '</ol>',
      '<h4>Dossier 2 : Virtualisation d’Entreprise Hyper-V &amp; Commutateurs Virtuels (7 points)</h4>',
      '<ol>',
      '  <li>Comparez les trois types de commutateurs virtuels Hyper-V : External vSwitch, Internal vSwitch et Private vSwitch. Pour une architecture DMZ isolée hébergeant des serveurs web frontaux et une base de données interne, quelle topologie de vSwitchs recommandez-vous ? (3 pts)</li>',
      '  <li>Expliquez le fonctionnement de la mémoire dynamique (Dynamic Memory) sous Hyper-V. Comment l’hyperviseur gère-t-il la mémoire tampon (Memory Buffer) et quelles sont les conséquences si la demande globale dépasse la mémoire physique de l’hôte hôte ? (4 pts)</li>',
      '</ol>',
      '<h4>Dossier 3 : Automatisation PowerShell, Sauvegardes VSS &amp; Quorum de Cluster (7 points)</h4>',
      '<ol>',
      '  <li>Un cluster de basculement Windows Server (WSFC) est constitué de 4 nœuds physiques et d’un témoin Cloud (Cloud Witness). Combien de voix au total composent le quorum ? Combien de nœuds peuvent tomber en panne simultanément sans provoquer l’arrêt du cluster ? Expliquez le phénomène de Split-Brain que le quorum permet d’éviter. (4 pts)</li>',
      '  <li>Décrivez le fonctionnement des clichés instantanés VSS (Volume Shadow Copy Service) lors d’une sauvegarde de serveur en production. Pourquoi cette technologie permet-elle de sauvegarder des bases de données Active Directory ou SQL Server actives sans interrompre les services utilisateurs ? (3 pts)</li>',
      '</ol>'
    ].join('\n')),
    '',
    box('solution', 'Corrigé type &amp; Barème détaillé de l’Examen Terminal', [
      '<h4>Corrigé Dossier 1 (6 points)</h4>',
      '<ul>',
      '  <li><strong>Permissions effectives SMB vs NTFS (3 pts) :</strong> ' +
      '  La permission réseau effective est l’intersection la plus restrictive entre les autorisations de partage SMB et les permissions NTFS. ' +
      '  Au niveau du partage SMB : autorisation Change (qui inclut Read, Write, Delete mais exclut le changement d’ACLs et la prise de possession). ' +
      '  Au niveau NTFS : l’utilisateur cumule Full Control et Read, ce qui donne Full Control en local. ' +
      '  Résultat effectif à travers le réseau : <strong>Modify / Change</strong>. L’utilisateur peut lire, créer, modifier et supprimer des fichiers, mais ne peut pas modifier les permissions NTFS du dossier car le partage SMB (Change) bloque les droits d’administration Full Control.</li>',
      '  <li><strong>Hiérarchie des ACEs NTFS (3 pts) :</strong> ' +
      '  Non, Bob <em>ne peut pas</em> modifier le fichier. ' +
      '  L’ordre d’évaluation strict des ACEs dans la DACL NTFS est : ' +
      '  1. <code>Explicit Deny</code> (priorité 1 absolue) ; ' +
      '  2. <code>Explicit Allow</code> ; ' +
      '  3. <code>Inherited Deny</code> ; ' +
      '  4. <code>Inherited Allow</code>. ' +
      '  L’Explicit Deny sur Write posé directement sur le fichier prend le pas sur n’importe quelle permission Allow héritée du groupe.</li>',
      '</ul>',
      '<h4>Corrigé Dossier 2 (7 points)</h4>',
      '<ul>',
      '  <li><strong>Commutateurs Hyper-V (3 pts) :</strong> ' +
      '  <em>External :</em> lié à une carte physique, permet la communication entre VMs, avec l’hôte (optionnel) et le réseau physique extérieur. ' +
      '  <em>Internal :</em> permet la communication entre les VMs et l’hôte uniquement (aucun accès réseau physique). ' +
      '  <em>Private :</em> strictement réservé à la communication inter-VMs sur le même hôte (aucun accès hôte ni extérieur). ' +
      '  Topologie DMZ recommandée : les serveurs web frontaux sont rattachés à un External vSwitch (avec carte réseau physique dédiée à la DMZ, allow_host=FALSE), tandis que le lien entre le frontal web et la base de données interne transite par un vSwitch Private ou un réseau interne filtré par un pare-feu virtuel.</li>',
      '  <li><strong>Mémoire dynamique Hyper-V (4 pts) :</strong> ' +
      '  Chaque VM démarre avec sa RAM de démarrage (Startup RAM), puis le pilote VMBus (Dynamic Memory Service) mesure la pression mémoire de l’OS invité. La formule cible est : $\\text{Target} = \\text{Demand} \\times (1 + \\text{Buffer}\\%)$. ' +
      '  L’hyperviseur ajuste la RAM allouée entre <code>Minimum RAM</code> et <code>Maximum RAM</code>. ' +
      '  En cas de surallocation (RAM physique hôte saturée), Hyper-V priorise les VMs selon leur poids (Memory Weight). Si la saturation persiste, les VMs utilisent le Smart Paging sur disque pour démarrer, ce qui entraîne une dégradation temporaire des performances I/O.</li>',
      '</ul>',
      '<h4>Corrigé Dossier 3 (7 points)</h4>',
      '<ul>',
      '  <li><strong>Quorum de cluster WSFC (4 pts) :</strong> ' +
      '  Total des voix = 4 nœuds + 1 témoin Cloud = <strong>5 voix</strong>. ' +
      '  Majorité absolue requise = $\\lfloor 5 / 2 \\rfloor + 1 = \\mathbf{3}$ <strong>voix actives</strong>. ' +
      '  Tolérance de panne : le cluster tolère la perte de <strong>2 voix</strong> (ex. 2 nœuds physiques, ou 1 nœud et le témoin Cloud). ' +
      '  Le phénomène de Split-Brain survient lorsqu’une coupure réseau scinde le cluster en deux sous-groupes isolés : si chaque sous-groupe continuait d’écrire simultanément sur le stockage partagé, cela provoquerait une corruption irréversible des données. Le mécanisme de quorum garantit que seul le sous-groupe possédant la majorité stricte des voix reste actif, tandis que l’autre s’arrête immédiatement.</li>',
      '  <li><strong>Technologie VSS (Volume Shadow Copy Service) (3 pts) :</strong> ' +
      '  VSS coordonne trois composants : le <em>VSS Requestor</em> (logiciel de sauvegarde wbadmin), le <em>VSS Writer</em> (composant applicatif AD DS ou SQL Server) et le <em>VSS Provider</em> (moteur de stockage NTFS). ' +
      '  Lors de la sauvegarde, le Writer suspend brièvement les écritures en mémoire (freeze de quelques millisecondes), le Provider fige un cliché instantané différentiel (Copy-on-Write), puis les écritures applicatives reprennent immédiatement. La sauvegarde s’effectue sur le cliché statique sans verrouiller les bases de données en production.</li>',
      '</ul>'
    ].join('\n')),
    '',
    chnav({ href: 'formules.html', label: 'Consulter le mémento technique' }, { href: 'exercices.html', label: 'Voir les 18 ateliers de code' }),
    '',
    disclaimer()
  ].join('\n\n');

  return {
    'chapitres/examens.html': {
      title: 'Examens blancs — ' + course.brand,
      description: 'Deux sujets d’examens blancs complets corrigés avec barème pour le cours Windows Server B3.',
      active: 'examens',
      body
    }
  };
}

/* ======================== Catalogue des Exercices ======================== */

function exercices(course) {
  const crumbs = crumb(course, [
    { label: 'Accueil', href: '../index.html' },
    { label: 'Sommaire', href: '../sommaire.html' },
    { label: 'Catalogue des exercices' }
  ]);

  const exercises = [
    { id: 'ws3-c1-e1', ch: 1, title: 'Validateur d’étendue DHCP, exclusions et conflits de réservation MAC', level: 'n1', lang: 'Étude de cas', desc: 'Calculer la liste des adresses IP distribuables après exclusions et détecter les doublons de réservation.' },
    { id: 'ws3-c1-e2', ch: 1, title: 'Validateur de cohérence de zone DNS d’infrastructure (A, PTR, SRV)', level: 'n2', lang: 'Étude de cas', desc: 'Vérifier la réciprocité des enregistrements A et PTR et la présence des enregistrements SRV indispensables à Active Directory.' },
    { id: 'ws3-c1-e3', ch: 1, title: 'Simulateur de dimensionnement de licences Windows Server (Cœurs physiques vs VMs)', level: 'n3', lang: 'Étude de cas', desc: 'Calculer les packs de licences requis et déterminer l’édition financièrement optimale (Standard vs Datacenter).' },

    { id: 'ws3-c2-e1', ch: 2, title: 'Vérificateur de conformité de structure de groupes AGDLP / AGUDLP', level: 'n1', lang: 'Étude de cas', desc: 'Vérifier la conformité de l’arborescence des identités au standard Microsoft AGDLP (Comptes -> Globaux -> Locaux de Domaine -> ACLs).' },
    { id: 'ws3-c2-e2', ch: 2, title: 'Simulateur de topologie FSMO et routage des opérations AD DS', level: 'n2', lang: 'Étude de cas', desc: 'Acheminer les opérations sensibles d’annuaire vers le contrôleur détenteur du rôle FSMO correspondant.' },
    { id: 'ws3-c2-e3', ch: 2, title: 'Parseur de journaux d’audit de sécurité Active Directory (Event IDs 4720, 4726, 4728)', level: 'n3', lang: 'Étude de cas', desc: 'Détecter les ajouts suspects de membres dans les groupes critiques et reconstituer l’état des comptes créés.' },

    { id: 'ws3-c3-e1', ch: 3, title: 'Calculateur de précédence de stratégies de groupe (Modèle LSDOU)', level: 'n1', lang: 'Étude de cas', desc: 'Calculer la valeur effective d’un paramètre selon l’ordre strict de traitement LSDOU (Local -> Site -> Domaine -> OU).' },
    { id: 'ws3-c3-e2', ch: 3, title: 'Moteur d’arbitrage GPO : Enforced (No Override) vs Block Inheritance', level: 'n2', lang: 'Étude de cas', desc: 'Résoudre les conflits d’héritage entre une Unité Organisationnelle avec blocage et des GPOs parentes forcées.' },
    { id: 'ws3-c3-e3', ch: 3, title: 'Évaluateur de filtres WMI et filtrage de sécurité (Security Filtering)', level: 'n3', lang: 'Étude de cas', desc: 'Vérifier si une GPO est applicable à un poste client en évaluant les groupes de sécurité et les critères matériels/OS du filtre WMI.' },

    { id: 'ws3-c4-e1', ch: 4, title: 'Calculateur de permissions effectives (Partage SMB vs NTFS)', level: 'n1', lang: 'Étude de cas', desc: 'Calculer la permission réseau résultante selon la règle universelle Windows du plus restrictif entre le partage et le système de fichiers.' },
    { id: 'ws3-c4-e2', ch: 4, title: 'Moteur de résolution des conflits NTFS : Héritage, Allow et Deny explicite', level: 'n2', lang: 'Étude de cas', desc: 'Résoudre les permissions NTFS cumulatives pour chaque opération selon la hiérarchie officielle : Explicit Deny > Explicit Allow > Inherited Deny > Inherited Allow.' },
    { id: 'ws3-c4-e3', ch: 4, title: 'Simulateur d’espaces de stockage et résilience Storage Spaces', level: 'n3', lang: 'Étude de cas', desc: 'Calculer la capacité utile, le taux d’efficacité et la tolérance aux pannes d’un pool de stockage Windows Server.' },

    { id: 'ws3-c5-e1', ch: 5, title: 'Simulateur de commutation réseau Hyper-V (External, Internal, Private vSwitch)', level: 'n1', lang: 'Étude de cas', desc: 'Déterminer l’accessibilité réseau entre VMs, hôte physique et réseau externe selon le type de commutateur virtuel.' },
    { id: 'ws3-c5-e2', ch: 5, title: 'Calculateur d’allocation de Mémoire Dynamique Hyper-V', level: 'n2', lang: 'Étude de cas', desc: 'Calculer l’allocation de RAM par machine virtuelle en intégrant la demande courante, le tampon mémoire et la capacité physique de l’hôte.' },
    { id: 'ws3-c5-e3', ch: 5, title: 'Gestionnaire d’arborescence de disques virtuels différentiels VHDX et Checkpoints', level: 'n3', lang: 'Étude de cas', desc: 'Calculer la taille cumulée d’une chaîne de disques différentiels (.avhdx) et simuler la fusion (Merge) d’un checkpoint.' },

    { id: 'ws3-c6-e1', ch: 6, title: 'Analyseur syntaxique de commandes PowerShell d’administration Active Directory', level: 'n1', lang: 'Étude de cas', desc: 'Valider la présence des paramètres obligatoires dans les commandes PowerShell d’administration d’annuaire AD DS.' },
    { id: 'ws3-c6-e2', ch: 6, title: 'Calculateur de quorum de cluster de basculement (Failover Clustering)', level: 'n2', lang: 'Étude de cas', desc: 'Calculer la majorité absolue des voix et vérifier le maintien du quorum dans un cluster Windows Server en cas de panne de nœuds.' },
    { id: 'ws3-c6-e3', ch: 6, title: 'Planificateur de sauvegardes Windows Server Backup (VSS Full vs Incremental)', level: 'n3', lang: 'Étude de cas', desc: 'Calculer la capacité de stockage cible pour un cycle de sauvegarde hebdomadaire (VSS Full + Incrémentales) avec overhead de 15%.' }
  ];

  const cardsHtml = exercises.map(ex => [
    '    <article class="card card--exercise">',
    '      <div class="card__head">',
    '        <span class="badge badge--' + ex.level + '">' + (ex.level === 'n1' ? 'Fondamental' : ex.level === 'n2' ? 'Intermédiaire' : 'Avancé') + '</span>',
    '        <span class="card__num">Module ' + ex.ch + ' • ' + ex.id + '</span>',
    '      </div>',
    '      <h3 class="card__title"><a href="chapitres/chapitre' + ex.ch + '.html#' + ex.id + '">' + ex.title + '</a></h3>',
    '      <p class="card__desc">' + ex.desc + '</p>',
    '      <div class="card__foot">',
    '        <span class="card__time">' + ic('terminal') + ' Langage : ' + ex.lang + '</span>',
    '        <a class="btn btn--sm" href="chapitres/chapitre' + ex.ch + '.html#' + ex.id + '">Résoudre dans le module ' + ic('arrow-right') + '</a>',
    '      </div>',
    '    </article>'
  ].join('\n')).join('\n');

  const body = [
    crumbs,
    '  <h1>Catalogue des 18 Ateliers Pratiques de Code Lab — Windows Server B3</h1>',
    '  <p class="lead">18 études de cas pratiques et méthodologiques intégrés directement dans les modules de cours, corrigés avec tests d’évaluation automatisés.</p>',
    '',
    '  <div class="grid grid--2">' + cardsHtml + '</div>',
    '',
    chnav({ href: 'examens.html', label: 'Revenir aux épreuves d’examen' }, { href: 'chapitres/chapitre1.html', label: 'Démarrer le module 1' }),
    '',
    disclaimer()
  ].join('\n\n');

  return {
    'chapitres/exercices.html': {
      title: 'Catalogue des exercices — ' + course.brand,
      description: 'Répertoire complet des 18 exercices de programmation de manière méthodique du cours Windows Server B3.',
      active: 'exercices',
      body
    }
  };
}

module.exports = { examens, exercices };

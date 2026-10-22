/**
 * Chapitre 6 du cours « Linux Avancé B3 ».
 */
'use strict';

const { box } = require('../../../scripts/course-kit');

module.exports = {
  n: 6,
  title: 'Sécurité Avancée, Durcissement du Noyau, PAM &amp; Auditing (auditd)',
  short: 'Sécurité, Durcissement Noyau &amp; PAM',
  toc: 'Durcissement du noyau (/etc/sysctl.conf, ASLR, restriction dmesg/kptr), pile modulaire d’authentification PAM (required/requisite/sufficient), et traçabilité avec auditd.',
  time: '≈ 2 h 45 de travail',
  free: false,
  lockLabel: 'Réservé B3 et plus',
  situation: 'Dans un contexte d’entreprise et d’infrastructures critiques, la sécurité d’un serveur Linux ne peut pas reposer uniquement sur un pare-feu périmétrique. Le modèle Zero Trust exige un durcissement en profondeur (Defense in Depth) appliqué directement au cœur du système d’exploitation. L’ingénieur système de niveau Bachelor 3 doit maîtriser le paramétrage sécuritaire du noyau Linux via /etc/sysctl.conf (randomisation de l’espace d’adressage ASLR, dissimulation des pointeurs mémoire kptr_restrict, protection contre les attaques SYN Flood et restrictions d’accès au tampon dmesg). Il doit également comprendre la mécanique interne de PAM (Pluggable Authentication Modules) pour concevoir des chaînes d’authentification robustes sans créer de failles par mauvaise interprétation des drapeaux required, requisite et sufficient. Enfin, il doit savoir déployer et exploiter le sous-système de traçabilité auditd afin de détecter instantanément toute tentative anormale d’élévation de privilèges (EUID=0) ou toute modification de fichiers système sensibles.',
  objectives: [
    'configurer et auditer les paramètres de sécurité du noyau Linux via /etc/sysctl.conf et /proc/sys/ ;',
    'comprendre les mécanismes de protection mémoire du noyau (ASLR, restriction kptr_restrict, mmap_min_addr) ;',
    'analyser et concevoir des piles d’authentification modulaires PAM dans /etc/pam.d/ ;',
    'distinguer avec rigueur la sémantique des drapeaux de contrôle PAM (required, requisite, sufficient, optional) ;',
    'configurer le démon d’audit du noyau Linux (auditd, auditctl) pour tracer les appels système sensibles et exécutions setuid ;',
    'développer en Python 3 des auditeurs de conformité sysctl, des simulateurs d’évaluation de pile PAM et des analyseurs de journaux auditd pour la détection d’élévations de privilèges.'
  ],
  sections: [
    {
      title: 'Durcissement du Noyau Linux : Paramètres sysctl &amp; Protections Mémoire',
      html: [
        '<p>Le noyau Linux expose des centaines de variables ajustables à chaud à travers le pseudo-système de fichiers <code>/proc/sys/</code>. Le fichier persistant <code>/etc/sysctl.conf</code> (ou les fichiers modulaires dans <code>/etc/sysctl.d/*.conf</code>) applique ces réglages dès l’initialisation du système :</p>',
        '<div class="grid grid-2">',
        '  <div class="card">',
        '    <h4>1. Protection de la Mémoire &amp; Anti-Exploitation</h4>',
        '    <p><strong>kernel.randomize_va_space = 2</strong> : Active l’ASLR (Address Space Layout Randomization) complet (pile, tas, bibliothèques partagées et zones mmap). Rendre aléatoires les adresses virtuelles neutralise les attaques par dépassement de tampon (Buffer Overflow / ROP gadgets).</p>',
        '    <p><strong>kernel.kptr_restrict = 2</strong> : Masque les adresses mémoires réelles des structures du noyau (remplacées par des zéros dans <code>/proc/kallsyms</code>), empêchant un attaquant sans privilèges d’obtenir l’adresse des fonctions noyau ciblées.</p>',
        '    <p><strong>kernel.dmesg_restrict = 1</strong> : Restreint la consultation des journaux du noyau (<code>dmesg</code>) aux seuls utilisateurs détenant la capacité <code>CAP_SYSLOG</code>.</p>',
        '  </div>',
        '  <div class="card">',
        '    <h4>2. Durcissement Réseau &amp; Système de Fichiers</h4>',
        '    <p><strong>net.ipv4.tcp_syncookies = 1</strong> : Active les SYN Cookies pour protéger le serveur contre les attaques par déni de service SYN Flood saturant la table d’états TCP.</p>',
        '    <p><strong>net.ipv4.ip_forward = 0</strong> : Empêche le serveur de relayer du trafic réseau entre ses interfaces lorsqu’il n’est pas expressément configuré comme routeur.</p>',
        '    <p><strong>fs.protected_hardlinks = 1 &amp; protected_symlinks = 1</strong> : Interdit la création de liens durs ou le suivi de liens symboliques dans les répertoires partagés en écriture (ex: <code>/tmp</code>), neutralisant les attaques par détournement de fichiers (Time-of-Check to Time-of-Use - TOCTOU).</p>',
        '  </div>',
        '</div>',
        '<p>Pour appliquer immédiatement les modifications sans redémarrer le serveur, la commande administrative standard est :<br><code>sysctl -p /etc/sysctl.conf</code>.</p>'
      ].join('\n')
    },
    {
      title: 'Architecture PAM (Pluggable Authentication Modules) : Mécanique et Drapeaux',
      html: [
        '<p>Le sous-système <strong>PAM</strong> découple la logique applicative des mécanismes d’authentification. Qu’un utilisateur se connecte via <code>ssh</code>, la console locale <code>login</code>, ou élève ses droits avec <code>sudo</code>, l’application délègue la décision à PAM via les fichiers de configuration situés dans <code>/etc/pam.d/</code>.</p>',
        '<p>Une ligne de configuration PAM adopte la structure :<br><code>&lt;Type_Gestionnaire&gt; &lt;Drapeau_Contrôle&gt; &lt;Module_Bibliothèque&gt; [Arguments]</code>.</p>',
        '<table class="table">',
        '  <thead>',
        '    <tr><th>Drapeau de Contrôle</th><th>Comportement en cas de SUCCÈS</th><th>Comportement en cas d’ÉCHEC</th><th>Usage Recommandé</th></tr>',
        '  </thead>',
        '  <tbody>',
        '    <tr><td><code>required</code></td><td>Continue la chaîne.</td><td>Mémorisez l’échec mais <strong>continue</strong> la chaîne jusqu’au bout (ne révèle rien à l’attaquant).</td><td>Vérification obligatoire (ex: mot de passe standard, compte actif).</td></tr>',
        '    <tr><td><code>requisite</code></td><td>Continue la chaîne.</td><td><strong>Interrompt immédiatement</strong> l’évaluation avec rejet définitif.</td><td>Prérequis strict (ex: vérification de verrouillage de compte ou IP bannie).</td></tr>',
        '    <tr><td><code>sufficient</code></td><td>Si aucun échec préalable, <strong>s’arrête immédiatement avec SUCCÈS</strong>.</td><td>L’échec est ignoré ; la chaîne continue.</td><td>Méthode alternative satisfaisante (ex: clé biométrique, certificat SSO, pam_unix).</td></tr>',
        '    <tr><td><code>optional</code></td><td>Continue la chaîne.</td><td>Continue la chaîne.</td><td>Journalisation ou configuration d’environnement secondaire (pam_env).</td></tr>',
        '  </tbody>',
        '</table>',
        '<p>Les 4 types de gestionnaires sont : <strong>auth</strong> (vérification de l’identité), <strong>account</strong> (validité du compte, horaires, expiration), <strong>password</strong> (modification du mot de passe), et <strong>session</strong> (montage du répertoire personnel, variables d’environnement, limites de ressources).</p>'
      ].join('\n')
    },
    {
      title: 'Le Sous-Système d’Audit du Noyau : auditd, aureport &amp; Traçabilité des Privilèges',
      html: [
        '<p>Pour satisfaire aux exigences de conformité réglementaire (ISO 27001, PCI-DSS, ANSSI), un administrateur ne peut pas se contenter des fichiers de logs applicatifs, car un attaquant disposant des droits root peut facilement les effacer ou les falsifier. Le sous-système <strong>Linux Audit (auditd)</strong> opère directement au sein du noyau :</p>',
        '<div class="grid grid-2">',
        '  <div class="card">',
        '    <h4>1. Les Règles d’Audit du Noyau (auditctl)</h4>',
        '    <p>On définit des règles de surveillance dans <code>/etc/audit/rules.d/audit.rules</code> :</p>',
        '    <ul>',
        '      <li><strong>Surveillance de fichiers (Watches)</strong> :<br><code>-w /etc/passwd -p wa -k identity_changes</code> trace toute écriture (<code>w</code>) ou modification d’attribut (<code>a</code>).</li>',
        '      <li><strong>Surveillance d’appels système (Syscalls)</strong> :<br><code>-a always,exit -F arch=b64 -S execve -F euid=0 -k root_exec</code> trace toute exécution binaire avec UID effectif root.</li>',
        '    </ul>',
        '  </div>',
        '  <div class="card">',
        '    <h4>2. Analyse &amp; Détection d’Élévations (ausearch / aureport)</h4>',
        '    <p>Les événements bruts sont stockés dans <code>/var/log/audit/audit.log</code>. On utilise des filtres spécialisés :</p>',
        '    <ul>',
        '      <li><code>ausearch -k identity_changes</code> : Filtre les événements par clé de surveillance.</li>',
        '      <li><code>aureport --auth</code> : Génère un rapport synthétique des tentatives de connexion réussies et échouées.</li>',
        '      <li><strong>Détection d’élévation</strong> : Repérer les enregistrements où <code>uid != 0</code> (utilisateur réel normal) alors que <code>euid == 0</code> (utilisateur effectif root).</li>',
        '    </ul>',
        '  </div>',
        '</div>'
      ].join('\n')
    },
    {
      title: 'Bonnes Pratiques de Durcissement en Production &amp; Standards CIS / ANSSI',
      html: [
        '<p>Un durcissement professionnel suit une démarche méthodique éprouvée, formalisée par des guides de référence tels que les <em>CIS Benchmarks</em> (Center for Internet Security) et les <em>Guides de Recommandations de Sécurité</em> de l’ANSSI :</p>',
        '<div class="grid grid-2">',
        '  <div class="card">',
        '    <h4>1. Principe du Moindre Privilège &amp; Réduction de Surface</h4>',
        '    <p>Désactiver les modules noyau superflus (ex: clés USB, FireWire, protocoles réseau exotiques comme DCCP ou SCTP) via <code>/etc/modprobe.d/blacklist.conf</code>.</p>',
        '    <p>Sécuriser les partitions dans <code>/etc/fstab</code> avec les options <code>nodev</code>, <code>nosuid</code> et <code>noexec</code> sur les répertoires partagés <code>/tmp</code> et <code>/var/tmp</code>.</p>',
        '  </div>',
        '  <div class="card">',
        '    <h4>2. Intégrité &amp; Automatisation</h4>',
        '    <p>Automatiser la vérification de conformité à l’aide d’outils d’audit open-source tels que <strong>Lynis</strong> ou <strong>OpenSCAP</strong>.</p>',
        '    <p>Garantir que toute modification de configuration critique est tracée et versionnée dans un dépôt Git avec intégration continue (GitOps).</p>',
        '  </div>',
        '</div>'
      ].join('\n')
    }
  ],
  methodTitle: 'Méthode d’Ingénierie : Procédure de Durcissement et d’Audit de Sécurité d’un Serveur Linux',
  method: [
    'Étape 1 : Analyser la surface d’exposition et inventorier les paramètres système actuels via sysctl -a et lynis audit system.',
    'Étape 2 : Établir la configuration de durcissement du noyau dans /etc/sysctl.d/99-hardening.conf (ASLR=2, kptr_restrict=2, tcp_syncookies=1, ip_forward=0).',
    'Étape 3 : Valider et appliquer à chaud les règles sysctl sans interruption de service avec sysctl -p /etc/sysctl.d/99-hardening.conf.',
    'Étape 4 : Auditer la pile PAM dans /etc/pam.d/common-auth et /etc/pam.d/sudo pour éliminer les drapeaux permissive ou mal ordonnés.',
    'Étape 5 : Déployer le démon auditd et configurer les règles de traçabilité des modifications d’identité et exécutions privilégiées dans /etc/audit/rules.d/audit.rules.',
    'Étape 6 : Mettre en place un script d’analyse automatisé inspectant /var/log/audit/audit.log pour alerter immédiatement en cas d’élévation EUID=0 suspecte.'
  ],
  summary: [
    '/etc/sysctl.conf et /proc/sys/ permettent de configurer dynamiquement les mécanismes de défense en profondeur du noyau Linux.',
    'L’ASLR (kernel.randomize_va_space=2) aléatorise les adresses mémoire pour neutraliser les exploits par corruption mémoire.',
    'La dissimulation des pointeurs (kernel.kptr_restrict=2) et la protection des liens durs (fs.protected_hardlinks=1) préviennent les attaques locales.',
    'PAM sépare la logique des applications de l’authentification et s’appuie sur une pile séquentielle de modules configurés dans /etc/pam.d/.',
    'Le drapeau required mémorise l’échec sans interrompre la chaîne ; requisite provoque un rejet immédiat ; sufficient accorde l’accès immédiat en cas de succès initial.',
    'Le sous-système auditd s’exécute dans l’espace noyau et garantit une traçabilité inaltérable des appels système et exécutions privilégiées.',
    'Une élévation de privilèges se caractérise par uid != 0 et euid == 0 dans les journaux d’audit (RFC 5424 / audit.log).'
  ],
  checklist: [
    'Je sais expliquer le rôle de l’ASLR et comment vérifier sa configuration via sysctl.',
    'Je connais les paramètres sysctl critiques recommandés par l’ANSSI et les CIS Benchmarks.',
    'Je comprends l’architecture modulaire de PAM et les 4 types de gestionnaires (auth, account, password, session).',
    'Je maîtrise parfaitement la différence de comportement entre les drapeaux PAM required, requisite et sufficient.',
    'Je sais comment configurer des règles d’audit avec auditctl et interroger les journaux avec ausearch.',
    'Je suis capable d’identifier une élévation de privilèges dans un enregistrement auditd en comparant UID et EUID.'
  ],
  notions: [
    'Durcissement du noyau (/etc/sysctl.conf)',
    'Randomisation ASLR (randomize_va_space)',
    'Restriction des pointeurs mémoire (kptr_restrict)',
    'Pluggable Authentication Modules (PAM)',
    'Drapeaux de contrôle PAM (required, requisite, sufficient)',
    'Sous-système d’audit du noyau (auditd / auditctl)',
    'Traçabilité des appels système (Syscall auditing)',
    'Élévation de privilèges (UID réel vs EUID effectif)'
  ],
  pitfalls: [
    'Confondre required et requisite dans une pile PAM : required continue l’évaluation malgré l’échec pour ne pas donner d’indice.',
    'Placer un module sufficient après un échec sans avoir vérifié qu’aucun module required préalable n’a échoué.',
    'Modifier /etc/sysctl.conf sans tester avec sysctl -p (la configuration ne sera active qu’au prochain redémarrage).',
    'Écrire des règles auditd trop verbeuses sans filtre (risque de saturation immédiate du disque dur et dégradation des I/O).'
  ],
  questions: [
    {
      stem: 'Quel paramètre sysctl permet d’activer la randomisation complète de l’espace d’adressage virtuel (ASLR) sous Linux ?',
      opts: [
        'kernel.aslr_enable = 1',
        'kernel.randomize_va_space = 2',
        'vm.randomize_memory = 1',
        'security.aslr_level = 3'
      ],
      correct: 1,
      exp: 'kernel.randomize_va_space = 2 active le niveau maximal d’ASLR, rendant aléatoires la pile, le tas, les bibliothèques et les mappings mémoire.'
    },
    {
      stem: 'Que se passe-t-il lorsqu’un module PAM marqué « required » échoue lors de son évaluation ?',
      opts: [
        'Le système s’éteint immédiatement par sécurité',
        'La chaîne d’authentification est immédiatement interrompue avec un message d’erreur',
        'L’échec global est mémorisé, mais PAM continue d’évaluer les modules suivants de la chaîne',
        'L’échec est ignoré et l’utilisateur est connecté'
      ],
      correct: 2,
      exp: 'Le drapeau required mémorise l’échec mais poursuit l’évaluation du reste de la pile pour ne pas indiquer à un attaquant quel composant spécifique a rejeté l’authentification.'
    },
    {
      stem: 'Quel drapeau de contrôle PAM interrompt immédiatement la chaîne en cas d’échec ?',
      opts: [
        'required',
        'requisite',
        'sufficient',
        'optional'
      ],
      correct: 1,
      exp: 'Le drapeau requisite provoque un arrêt immédiat (abort) de la chaîne avec refus d’accès dès qu’il retourne un échec.'
    },
    {
      stem: 'Dans une pile PAM, que fait un module marqué « sufficient » lorsqu’il réussit et qu’aucun échec préalable n’a eu lieu ?',
      opts: [
        'Il accorde l’accès immédiatement sans évaluer la suite de la chaîne pour ce type de gestionnaire',
        'Il demande obligatoirement un second mot de passe',
        'Il annule l’authentification',
        'Il réinitialise les droits de l’utilisateur'
      ],
      correct: 0,
      exp: 'Un module sufficient accorde immédiatement le succès et interrompt l’évaluation de la chaîne s’il réussit et qu’aucun échec antérieur n’a été enregistré.'
    },
    {
      stem: 'Quelle commande permet d’appliquer à chaud les nouveaux paramètres définis dans /etc/sysctl.conf sans redémarrer la machine ?',
      opts: [
        'sysctl --reload',
        'sysctl -p /etc/sysctl.conf',
        'systemctl restart kernel',
        'proc-reload'
      ],
      correct: 1,
      exp: 'sysctl -p [fichier] recharge et applique immédiatement les paramètres spécifiés dans le noyau Linux en cours d’exécution.'
    },
    {
      stem: 'Dans un journal auditd, quelle condition caractérise une tentative d’élévation de privilèges vers les droits super-administrateur ?',
      opts: [
        'uid == 0 et euid == 1000',
        'uid != 0 et euid == 0',
        'pid == 1 et ppid == 0',
        'gid == 100 et egid == 100'
      ],
      correct: 1,
      exp: 'Une élévation de privilèges survient lorsque l’utilisateur réel (uid) n’est pas root mais que l’utilisateur effectif sous lequel s’exécute le processus (euid) devient 0 (root).'
    },
    {
      stem: 'À quoi sert la directive sysctl « net.ipv4.tcp_syncookies = 1 » ?',
      opts: [
        'À enregistrer les cookies de session des navigateurs Web',
        'À protéger la pile réseau TCP contre les attaques par déni de service SYN Flood',
        'À accélérer la vitesse de téléchargement Wi-Fi',
        'À désactiver le pare-feu iptables'
      ],
      correct: 1,
      exp: 'Les SYN Cookies permettent au noyau de répondre aux paquets SYN sans allouer immédiatement d’espace dans la table de connexion, contrant ainsi les attaques par déni de service SYN Flood.'
    },
    {
      stem: 'Où sont stockées par défaut les règles persistantes du démon d’audit Linux auditd ?',
      opts: [
        '/etc/audit/rules.d/audit.rules',
        '/var/log/audit/rules.txt',
        '/sys/kernel/security/audit.conf',
        '/usr/share/audit/rules.xml'
      ],
      correct: 0,
      exp: '/etc/audit/rules.d/audit.rules contient les règles compilées par augenrules lors du démarrage du démon auditd.'
    }
  ],
  flashcards: [
    {
      q: 'Qu’est-ce que l’ASLR (randomize_va_space) ?',
      a: 'Un mécanisme du noyau Linux rendant aléatoires les adresses mémoire de la pile, du tas et des bibliothèques pour bloquer les exploits.'
    },
    {
      q: 'Quelle est la différence majeure entre les drapeaux PAM required et requisite ?',
      a: 'required continue la chaîne en cas d’échec pour dissimuler l’erreur ; requisite interrompt immédiatement la chaîne avec refus.'
    },
    {
      q: 'Comment fonctionne le drapeau PAM sufficient ?',
      a: 'S’il réussit et qu’aucun échec antérieur n’a été mémorisé, il valide immédiatement l’authentification et stoppe la chaîne.'
    },
    {
      q: 'Quelle commande permet de charger dynamiquement des paramètres sysctl ?',
      a: 'sysctl -p /etc/sysctl.conf applique instantanément les directives au noyau.'
    },
    {
      q: 'Quel est l’indicateur clé d’une élévation de privilèges dans auditd ?',
      a: 'Un événement où uid != 0 (utilisateur réel non root) et euid == 0 (utilisateur effectif root).'
    },
    {
      q: 'Quel est l’intérêt de protéger les liens durs via fs.protected_hardlinks = 1 ?',
      a: 'Empêcher la création de liens durs vers des fichiers dont l’utilisateur n’est pas propriétaire, bloquant les attaques TOCTOU dans /tmp.'
    }
  ],
  mastery: [
    {
      cls: 'low',
      text: 'Incompréhension des drapeaux de contrôle PAM ou ignorance des options de durcissement sysctl du noyau.'
    },
    {
      cls: 'medium',
      text: 'Bonne configuration des paramètres sysctl recommandés et compréhension de la séquence d’évaluation PAM.'
    },
    {
      cls: 'high',
      text: 'Maîtrise experte du durcissement système selon les normes CIS/ANSSI, conception avancée de piles PAM et détection temps-réel d’anomalies avec auditd.'
    }
  ]
};

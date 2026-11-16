/**
 * Enrichissements pédagogiques des chapitres 2 à 6 du cours « Virtualisation
 * des serveurs » B1 (Lot 4B).
 *
 * L'histoire « Le serveur fainéant et les machines ambitieuses » reste le fil
 * rouge ; ces sections lui ajoutent le vocabulaire et les manipulations qu'un
 * débutant doit connaître avant d'ouvrir un vrai hyperviseur :
 *   - chapitre 2 : hyperviseur de type 1 / type 2, VT-x et AMD-V ;
 *   - chapitre 3 : anatomie d'une VM (vCPU, RAM, surallocation, disques) ;
 *   - chapitre 4 : modes réseau virtuels (NAT, pont, interne, privé hôte) ;
 *   - chapitre 5 : snapshots, clones, export OVA ;
 *   - chapitre 6 : atelier guidé VirtualBox + VBoxManage (Debian).
 *
 * `enrich(chapitre)` fusionne ces ajouts dans le chapitre de même numéro, sans
 * toucher au récit existant (sections, questions et cartes d'origine restent
 * en place, les ajouts s'insèrent à la position indiquée par `at`).
 */
'use strict';

const { box } = require('../../../scripts/course-kit');

const EXTRAS = {
  /* ==================== Chapitre 2 ==================== */
  2: {
    objectives: [
      'distinguer un hyperviseur de type 1 (bare metal) d’un hyperviseur de type 2 (hébergé) et citer un exemple de chaque ;',
      'expliquer le rôle des extensions processeur Intel VT-x et AMD-V et savoir les activer dans le BIOS/UEFI.'
    ],
    notions: [
      '<strong>Hyperviseur de type 1</strong> : logiciel installé directement sur le matériel (ESXi, Hyper-V, KVM, Xen).',
      '<strong>Hyperviseur de type 2</strong> : application installée sur un système existant (VirtualBox, VMware Workstation).',
      '<strong>VT-x / AMD-V</strong> : extensions du processeur qui permettent d’exécuter une VM à vitesse quasi native.'
    ],
    sections: [
      {
        at: 1,
        title: 'Hyperviseur de type 1 et de type 2',
        html: [
          '<p>Dans l’histoire, l’ingénieur installe « une couche logicielle » qui fabrique les machines virtuelles : c’est l’<strong>hyperviseur</strong>. Selon l’endroit où il se place, on en distingue deux familles.</p>',
          `<table>
    <tr><th>Critère</th><th>Type 1 (bare metal)</th><th>Type 2 (hébergé)</th></tr>
    <tr><td>Où s’installe-t-il ?</td><td>Directement sur le matériel, à la place d’un système classique</td><td>Comme une application, au-dessus d’un système (Windows, Linux, macOS)</td></tr>
    <tr><td>Chemin d’un accès disque</td><td>VM → hyperviseur → matériel</td><td>VM → hyperviseur → système hôte → matériel</td></tr>
    <tr><td>Exemples</td><td>VMware ESXi, Microsoft Hyper-V, KVM (Linux), Xen</td><td>Oracle VirtualBox, VMware Workstation / Player, Parallels</td></tr>
    <tr><td>Usage typique</td><td>Salle serveur, production, consolidation</td><td>Poste d’étude, laboratoire, tests d’un développeur</td></tr>
    <tr><td>Performance</td><td>Meilleure : une seule couche entre la VM et le matériel</td><td>Un peu moindre : le système hôte s’intercale</td></tr>
  </table>`,
          '<p>Le serveur fainéant de l’histoire est un cas de <strong>type 1</strong> : on veut que la machine physique serve uniquement à faire tourner des VM. Le laboratoire de ce cours (chapitre 6) utilise au contraire un <strong>type 2</strong>, VirtualBox, parce qu’il s’installe sur votre ordinateur personnel sans le réinstaller.</p>',
          '<p>La frontière n’est pas toujours nette : KVM est un module du noyau Linux (le système devient hyperviseur) et Hyper-V fait tourner le Windows « parent » lui-même comme une VM privilégiée. Pour le cours, retenez la règle pratique : <em>si l’on installe l’hyperviseur sur un système déjà utilisé au quotidien, c’est un type 2 ; si la machine est dédiée à la virtualisation, c’est un type 1</em>.</p>',
          box('mnemo', 'Mnémo : 1 = sous, 2 = sur', 'pin',
            '    <p>Type <strong>1</strong> : l’hyperviseur est <strong>sous</strong> tous les systèmes, au contact du matériel. Type <strong>2</strong> : il est <strong>sur</strong> un système, comme n’importe quel logiciel.</p>')
        ].join('\n')
      },
      {
        at: 2,
        title: 'VT-x et AMD-V : l’aide du processeur',
        html: [
          '<p>Faire croire à un système qu’il possède toute la machine serait lent si l’hyperviseur devait tout traduire en logiciel. Les fabricants de processeurs ont donc ajouté des instructions dédiées : <strong>Intel VT-x</strong> (Intel Virtualization Technology) et <strong>AMD-V</strong> (AMD Virtualization, aussi appelée SVM). Elles laissent le système invité exécuter ses instructions directement sur le processeur, sous le contrôle de l’hyperviseur.</p>',
          '<p>Ces extensions sont présentes sur la quasi-totalité des processeurs récents, mais elles peuvent être <strong>désactivées dans le BIOS/UEFI</strong>. Sans elles, les hyperviseurs modernes refusent de démarrer des VM 64 bits ou les font tourner très lentement.</p>',
          '<p>Comment vérifier ?</p>',
          `<pre><code># Linux : un nombre different de 0 signifie que vmx (Intel) ou svm (AMD) est actif
grep -E -c '(vmx|svm)' /proc/cpuinfo
lscpu | grep -i virtualization

# Windows : Gestionnaire des taches, onglet Performance, ligne « Virtualisation »
# ou, dans une console : systeminfo | find "Hyper-V"</code></pre>`,
          box('pitfall', 'Piège — « VT-x n’est pas disponible »', 'warning',
            '    <p>Ce message n’annonce presque jamais un processeur trop ancien : il signale le plus souvent une option désactivée dans le BIOS/UEFI (Intel Virtualization Technology, SVM Mode), ou un autre hyperviseur déjà actif sur le poste (Hyper-V sous Windows). Vérifiez ces deux points avant d’accuser le matériel.</p>')
        ].join('\n')
      }
    ],
    questions: [
      { q: 'Quel hyperviseur est de type 2 (hébergé) ?', opts: ['VMware ESXi installé sur un serveur dédié', 'Oracle VirtualBox installé sur un poste Windows', 'Xen installé directement sur le matériel'], correct: 1, exp: 'VirtualBox est une application qui s’installe sur un système existant : c’est le modèle du type 2. ESXi et Xen se placent directement sur le matériel (type 1).' },
      { q: 'À quoi servent Intel VT-x et AMD-V ?', opts: ['à augmenter la capacité du disque dur', 'à chiffrer les machines virtuelles au repos', 'à exécuter les VM efficacement grâce au processeur'], correct: 2, exp: 'Ces extensions du processeur permettent à l’hyperviseur de faire tourner le système invité à vitesse quasi native, sans tout émuler en logiciel.' }
    ],
    flashcards: [
      { q: 'Type 1 ou type 2 : quelle différence ?', a: 'Type 1 : hyperviseur installé directement sur le matériel (ESXi, Hyper-V, KVM). Type 2 : application installée sur un système existant (VirtualBox, VMware Workstation).' },
      { q: 'Que faire si VirtualBox signale que VT-x n’est pas disponible ?', a: 'Activer Intel VT-x / AMD-V (SVM) dans le BIOS/UEFI et vérifier qu’un autre hyperviseur (Hyper-V) ne monopolise pas la fonction.' }
    ]
  },

  /* ==================== Chapitre 3 ==================== */
  3: {
    objectives: [
      'décrire l’anatomie d’une VM : vCPU, mémoire allouée, disque virtuel, carte réseau virtuelle ;',
      'expliquer la surallocation (overcommit) et ses limites, et choisir un format de disque (VDI, VMDK, VHDX, QCOW2, dynamique ou fixe).'
    ],
    notions: [
      '<strong>vCPU</strong> : processeur virtuel, planifié par l’hyperviseur sur un cœur ou un thread physique.',
      '<strong>Surallocation (overcommit)</strong> : promettre aux VM plus de ressources que la machine n’en possède réellement.',
      '<strong>Disque virtuel</strong> : un fichier (VDI, VMDK, VHDX, QCOW2) que la VM voit comme un disque.'
    ],
    sections: [
      {
        at: 2,
        title: 'Anatomie d’une machine virtuelle',
        html: [
          '<p>Le chapitre précédent a montré ce qui se partage. Voyons comment une VM concrète est fabriquée : une « machine » complète décrite par un fichier de configuration et quelques fichiers de données.</p>',
          `<table>
    <tr><th>Élément</th><th>Rôle dans la VM</th><th>Côté hôte</th></tr>
    <tr><td>vCPU</td><td>Processeurs que voit le système invité</td><td>Chaque vCPU est un fil d’exécution que l’hyperviseur place sur un cœur ou un thread physique</td></tr>
    <tr><td>RAM</td><td>Mémoire vive que voit le système invité</td><td>Zone de la mémoire de l’hôte réservée ou prêtée à la VM</td></tr>
    <tr><td>Disque virtuel</td><td>Disque dur que voit le système invité</td><td>Un fichier (.vdi, .vmdk, .vhdx, .qcow2) sur le stockage de l’hôte</td></tr>
    <tr><td>Carte réseau virtuelle</td><td>Interface Ethernet de la VM</td><td>Branchée sur un commutateur virtuel (chapitre 4)</td></tr>
    <tr><td>Configuration</td><td>Liste des éléments ci-dessus</td><td>Un petit fichier texte ou XML (.vbox, .vmx, .xml)</td></tr>
  </table>`,
          '<p>Un vCPU n’est pas un cœur dédié : si l’on donne 4 vCPU à une VM sur un hôte de 8 cœurs, la VM peut utiliser jusqu’à 4 fils d’exécution en parallèle, mais ils partagent le processeur avec les autres VM. Donner trop de vCPU à une petite charge est contre-productif : l’hyperviseur doit attendre que tous les vCPU soient disponibles en même temps. <strong>Règle pratique : commencer petit (1 à 2 vCPU) et augmenter selon la charge mesurée.</strong></p>'
        ].join('\n')
      },
      {
        at: 3,
        title: 'La surallocation (overcommit) : promettre plus que l’on possède',
        html: [
          '<p>L’histoire dit : « on ne prendra chacun que ce dont on a besoin ». Or un besoin déclaré n’est pas un besoin permanent. Les hyperviseurs en tirent parti : on peut déclarer, au total, <strong>plus de vCPU ou de mémoire que la machine physique n’en possède</strong>. C’est la surallocation, ou <em>overcommit</em>.</p>',
          `<table>
    <tr><th>Ressource</th><th>Surallocation possible ?</th><th>Risque si tout le monde demande en même temps</th></tr>
    <tr><td>vCPU</td><td>Oui, souvent</td><td>Les VM attendent leur tour : ralentissement général</td></tr>
    <tr><td>RAM</td><td>Oui, avec prudence (partage de pages, ballooning)</td><td>L’hôte swappe sur le disque : effondrement des performances</td></tr>
    <tr><td>Disque (thin provisioning)</td><td>Oui</td><td>Le stockage de l’hôte se remplit : les VM sont suspendues</td></tr>
  </table>`,
          '<p>Exemple chiffré : un hôte de 64 Go de RAM héberge 10 VM de 16 Go déclarés (160 Go promis, soit 2,5 fois la capacité). Tant que chaque VM n’utilise réellement que 4 Go en moyenne (40 Go), tout va bien. Si trois d’entre elles montent à 16 Go simultanément, la mémoire réelle nécessaire dépasse la capacité de l’hôte. L’alerte doit venir de la <strong>mesure de l’utilisation réelle</strong>, jamais seulement de la somme des allocations.</p>',
          box('pitfall', 'Piège — confondre réservé et utilisé', 'warning',
            '    <p>Un hôte « plein » côté allocation n’est pas forcément saturé côté utilisation, et inversement un hôte à moitié alloué peut être saturé si une VM consomme tout. Surveillez les deux chiffres. Un taux de surallocation acceptable (2:1, 4:1…) dépend de la charge : ce sont des ordres de grandeur pédagogiques, pas des normes.</p>')
        ].join('\n')
      },
      {
        at: 4,
        title: 'Formats de disques virtuels : VDI, VMDK, VHDX, QCOW2',
        html: [
          '<p>Le disque d’une VM est un <strong>simple fichier</strong> sur l’hôte. Chaque hyperviseur a son format de prédilection, mais les outils de conversion permettent de passer de l’un à l’autre.</p>',
          `<table>
    <tr><th>Format</th><th>Hyperviseur d’origine</th><th>À retenir</th></tr>
    <tr><td>VDI</td><td>Oracle VirtualBox</td><td>Format natif de VirtualBox, allocation dynamique par défaut</td></tr>
    <tr><td>VMDK</td><td>VMware (ESXi, Workstation)</td><td>Très répandu ; lisible par VirtualBox et QEMU ; cœur des fichiers OVA</td></tr>
    <tr><td>VHD / VHDX</td><td>Microsoft Hyper-V</td><td>VHDX : disques jusqu’à 64 To, plus résistant aux coupures de courant</td></tr>
    <tr><td>QCOW2</td><td>QEMU / KVM</td><td>Copy-on-write : prend en charge l’allocation fine, la compression et les snapshots</td></tr>
  </table>`,
          '<p>Deux stratégies d’allocation existent, quel que soit le format :</p>',
          '<ul>\n    <li><strong>Allocation dynamique (thin)</strong> : un disque de 100 Go déclaré ne pèse au départ que quelques Mo ; le fichier grossit à mesure que la VM écrit. Économique, mais attention à la surallocation du stockage.</li>\n    <li><strong>Allocation fixe (thick)</strong> : les 100 Go sont réservés dès la création. Plus prévisible, légèrement plus rapide au premier remplissage, mais gourmand dès le premier jour.</li>\n  </ul>',
          `<pre><code># Examiner et convertir un disque (outils QEMU)
qemu-img info disque.vmdk
qemu-img convert -f vmdk -O qcow2 disque.vmdk disque.qcow2

# Cloner un disque VirtualBox vers un autre format
VBoxManage clonemedium disk source.vdi cible.vmdk --format VMDK</code></pre>`,
          '<p>Rappel du chapitre 4 : la taille déclarée d’un disque ne dit rien de l’espace réellement occupé, et un disque dynamique ne garantit pas de bonnes performances. Mesurez le fichier, pas la promesse.</p>'
        ].join('\n')
      }
    ],
    questions: [
      { q: 'Quel format de disque virtuel est le format natif de Hyper-V ?', opts: ['VMDK', 'QCOW2', 'VHDX'], correct: 2, exp: 'VHDX est le format de disque d’Hyper-V ; VMDK vient de VMware et QCOW2 de QEMU/KVM, VDI de VirtualBox.' },
      { q: 'Un hôte de 64 Go de RAM promet 160 Go à ses VM. Comment appelle-t-on cette pratique ?', opts: ['la surallocation (overcommit)', 'le clonage lié', 'la migration à chaud'], correct: 0, exp: 'Promettre plus de ressources que l’hôte n’en possède, en pariant que toutes ne seront pas utilisées en même temps, s’appelle la surallocation ou overcommit.' }
    ],
    flashcards: [
      { q: 'Disque dynamique ou fixe : quelle différence ?', a: 'Dynamique (thin) : le fichier grossit selon l’usage, économe mais risque de saturer le stockage. Fixe (thick) : tout l’espace est réservé dès la création.' },
      { q: 'Quel format de disque pour VirtualBox, VMware, Hyper-V, KVM ?', a: 'VDI (VirtualBox), VMDK (VMware), VHD/VHDX (Hyper-V), QCOW2 (QEMU/KVM) ; qemu-img convert permet de passer de l’un à l’autre.' }
    ]
  },

  /* ==================== Chapitre 4 ==================== */
  4: {
    objectives: [
      'comparer les quatre modes réseau d’un hyperviseur de bureau (NAT, pont, interne, privé hôte) et choisir celui qui convient à un besoin donné.'
    ],
    notions: [
      '<strong>NAT</strong>, <strong>accès par pont</strong>, <strong>réseau interne</strong>, <strong>réseau privé hôte</strong> : les quatre modes de connexion d’une VM.'
    ],
    sections: [
      {
        at: 4,
        title: 'Brancher les VM : les modes réseau',
        html: [
          '<p>Consolider vingt services sur un seul hôte ne sert à rien si les VM ne peuvent plus se parler ni joindre le monde extérieur. Chaque carte réseau virtuelle d’une VM est branchée sur un <strong>commutateur virtuel</strong> ; le mode choisi détermine qui peut parler à qui. Voici les quatre modes de VirtualBox (les autres hyperviseurs proposent des équivalents sous d’autres noms).</p>',
          `<table>
    <tr><th>Mode</th><th>VM → Internet</th><th>VM → hôte</th><th>VM ↔ autres VM</th><th>Extérieur → VM</th><th>Usage typique</th></tr>
    <tr><td>NAT</td><td>Oui</td><td>Non (sauf redirection de port)</td><td>Non (chaque VM a son propre NAT)</td><td>Non, sauf redirection de port</td><td>Navigation, mises à jour : mode par défaut</td></tr>
    <tr><td>Accès par pont (bridged)</td><td>Oui</td><td>Oui</td><td>Oui</td><td>Oui : la VM a sa propre adresse sur le réseau local</td><td>Serveur de laboratoire joignable par les autres machines du réseau</td></tr>
    <tr><td>Réseau interne</td><td>Non</td><td>Non</td><td>Oui (entre VM du même réseau interne)</td><td>Non</td><td>Maquette isolée : serveur et clients</td></tr>
    <tr><td>Réseau privé hôte (host-only)</td><td>Non</td><td>Oui</td><td>Oui</td><td>Non (hôte seulement)</td><td>Administrer une VM depuis l’hôte (SSH) sans l’exposer</td></tr>
  </table>`,
          '<p>Repères concrets : en NAT, VirtualBox donne à la VM l’adresse 10.0.2.15 et la passerelle 10.0.2.2, identiques pour toutes les VM puisque chacune est isolée dans son propre NAT. En réseau privé hôte, l’hôte reçoit par défaut 192.168.56.1 et les VM une adresse du même sous-réseau 192.168.56.0/24. En accès par pont, la VM obtient une adresse du réseau local comme un ordinateur physique, ce qui peut poser problème sur certains réseaux Wi-Fi ou d’entreprise qui n’autorisent qu’une adresse par port.</p>',
          '<p>Pour joindre une VM en NAT, on crée une <strong>redirection de port</strong> : par exemple, le port 2222 de l’hôte vers le port 22 (SSH) de la VM.</p>',
          `<pre><code>VBoxManage modifyvm "debian-lab" --natpf1 "ssh,tcp,,2222,,22"
ssh -p 2222 utilisateur@127.0.0.1</code></pre>`,
          box('method', 'Comment choisir ?', 'compass',
            '    <p>Se poser trois questions dans l’ordre : la VM doit-elle sortir sur Internet (NAT ou pont) ? Doit-elle être joignable depuis d’autres machines du réseau (pont) ? Doit-elle rester totalement isolée (interne) ou administrable seulement depuis l’hôte (privé hôte) ? Un mode combinable : la plupart des VM de laboratoire ont deux cartes, une en NAT pour les mises à jour et une en privé hôte pour l’administration.</p>')
        ].join('\n')
      }
    ],
    questions: [
      { q: 'Une VM doit être joignable depuis les autres ordinateurs du réseau local. Quel mode choisir ?', opts: ['NAT sans redirection de port', 'Accès par pont (bridged)', 'Réseau interne'], correct: 1, exp: 'En accès par pont, la VM obtient sa propre adresse sur le réseau local et devient joignable comme un ordinateur physique. En NAT ou en réseau interne, elle reste invisible de l’extérieur.' },
      { q: 'Quel mode isole totalement les VM d’Internet et de l’hôte, tout en leur permettant de se parler entre elles ?', opts: ['Le réseau privé hôte (host-only)', 'Le NAT', 'Le réseau interne'], correct: 2, exp: 'Le réseau interne relie seulement les VM entre elles : ni Internet, ni l’hôte. Le réseau privé hôte inclut au contraire l’hôte.' }
    ],
    flashcards: [
      { q: 'NAT, pont, interne, privé hôte : que permet chaque mode ?', a: 'NAT : sortir sur Internet. Pont : VM comme machine du réseau local. Interne : VM entre elles seulement. Privé hôte : VM et hôte seulement.' },
      { q: 'Comment joindre en SSH une VM VirtualBox en NAT ?', a: 'Créer une redirection de port (ex. hôte 2222 vers VM 22 avec --natpf1) puis ssh -p 2222 utilisateur@127.0.0.1.' }
    ]
  },

  /* ==================== Chapitre 5 ==================== */
  5: {
    objectives: [
      'utiliser snapshots, clones et exports OVA sans les confondre avec une sauvegarde.'
    ],
    notions: [
      '<strong>Snapshot</strong> : image de l’état d’une VM à un instant donné.',
      '<strong>Clone</strong> : copie d’une VM (complet ou lié). <strong>OVA</strong> : archive d’export portable d’une VM.'
    ],
    sections: [
      {
        at: 4,
        title: 'Snapshots, clones et OVA : puissants, mais pas des sauvegardes',
        html: [
          '<p>La surcharge n’est pas le seul danger : les outils de confort de la virtualisation créent eux aussi des risques quand on les utilise mal. Trois mécanismes sont à connaître.</p>',
          '<h3>Le snapshot (instantané)</h3>',
          '<p>Un snapshot fige l’état d’une VM : le disque, et selon l’hyperviseur la mémoire et l’état des périphériques. À partir de ce point, les écritures vont dans un <strong>disque différentiel</strong> et le disque d’origine ne bouge plus. Revenir en arrière est instantané : on jette le différentiel. C’est idéal avant une mise à jour risquée ou un test de configuration.</p>',
          '<p>Trois limites à connaître. (1) Le disque différentiel grossit à chaque écriture : une chaîne de snapshots oubliée remplit le stockage et ralentit la VM. (2) Un snapshot dépend du disque d’origine : s’il se corrompt, tout est perdu, donc <strong>un snapshot n’est pas une sauvegarde</strong>. (3) Sous Hyper-V, les checkpoints de production ne capturent pas la mémoire, contrairement aux checkpoints standard.</p>',
          '<h3>Le clone</h3>',
          '<p>Un <strong>clone complet</strong> copie intégralement les disques : indépendant, mais lourd. Un <strong>clone lié</strong> part d’un snapshot de la VM d’origine et ne stocke que les différences : rapide et léger, mais dépendant du parent. Pour déployer dix serveurs identiques, on prépare un modèle, on le clone, puis on change nom d’hôte et adresse réseau de chaque copie (sinon dix machines portent la même identité).</p>',
          '<h3>L’export OVA</h3>',
          '<p>L’<strong>OVF</strong> (Open Virtualization Format) décrit une VM de manière neutre ; l’<strong>OVA</strong> est une archive unique (type tar) qui contient ce descripteur, les disques (souvent en VMDK) et un fichier de contrôle. C’est le format pratique pour déplacer une VM d’un poste à un autre ou la livrer à un enseignant ou un client.</p>',
          `<pre><code>VBoxManage snapshot "debian-lab" take "avant-maj" --description "avant apt upgrade"
VBoxManage snapshot "debian-lab" list
VBoxManage snapshot "debian-lab" restore "avant-maj"
VBoxManage clonevm "debian-lab" --name "debian-lab-2" --register
VBoxManage export "debian-lab" -o debian-lab.ova
VBoxManage import debian-lab.ova</code></pre>`,
          box('pitfall', 'Piège — « j’ai un snapshot, donc je suis sauvegardé »', 'warning',
            '    <p>Une sauvegarde vit sur un autre support, indépendamment de la VM. Un snapshot reste sur le même disque que la VM : si l’hôte tombe, les deux disparaissent. Gardez les snapshots courts (quelques jours) et exportez une copie (OVA ou sauvegarde) pour ce qui compte.</p>')
        ].join('\n')
      }
    ],
    questions: [
      { q: 'Pourquoi un snapshot ne remplace-t-il pas une sauvegarde ?', opts: ['Il reste sur le même stockage que la VM et dépend du disque d’origine', 'Il ne peut pas être restauré', 'Il consomme toute la mémoire de l’hôte'], correct: 0, exp: 'Un snapshot dépend du disque d’origine et se trouve sur le même stockage : si celui-ci tombe ou se corrompt, la VM et son snapshot disparaissent ensemble.' },
      { q: 'Qu’est-ce qu’un fichier OVA ?', opts: ['un format de disque propre à Hyper-V', 'une archive portable contenant la description et les disques d’une VM', 'un journal des erreurs de l’hyperviseur'], correct: 1, exp: 'Une OVA regroupe en un seul fichier le descripteur OVF et les disques de la VM : c’est le format d’échange standard entre hyperviseurs.' }
    ],
    flashcards: [
      { q: 'Snapshot, clone, OVA : à quoi sert chacun ?', a: 'Snapshot : revenir à un état précédent. Clone : dupliquer une VM (complet ou lié). OVA : exporter une VM dans une archive portable.' },
      { q: 'Quel est le risque d’une longue chaîne de snapshots ?', a: 'Les disques différentiels grossissent, ralentissent la VM et peuvent remplir le stockage de l’hôte ; supprimer un snapshot fusionne ses données dans le disque parent.' }
    ]
  },

  /* ==================== Chapitre 6 ==================== */
  6: {
    objectives: [
      'réaliser un atelier guidé : créer, démarrer, protéger et exporter une VM Debian avec VirtualBox et la commande VBoxManage.'
    ],
    notions: [
      '<strong>VBoxManage</strong> : interface en ligne de commande de VirtualBox (createvm, modifyvm, startvm, snapshot, export).'
    ],
    sections: [
      {
        at: 4,
        title: 'Atelier guidé : une VM Debian avec VirtualBox et VBoxManage',
        html: [
          '<p>Passons de la fable à la pratique : la meilleure preuve est une VM qui démarre sous vos yeux. Cet atelier utilise <strong>VirtualBox</strong> (type 2) et l’ISO d’installation « netinst » de <strong>Debian</strong> (téléchargeable gratuitement sur le site officiel du projet). Prévoir 2 Go de RAM, 20 Go de disque libre et la virtualisation activée (chapitre 2).</p>',
          '<p><strong>Étape 0 — Vérifier l’installation.</strong></p>',
          `<pre><code>VBoxManage --version
VBoxManage list ostypes | grep -i "Debian_64"</code></pre>`,
          '<p><strong>Étape 1 — Créer et configurer la machine.</strong> Nom, type de système, mémoire, vCPU et carte réseau en NAT (mode par défaut, chapitre 4).</p>',
          `<pre><code>VBoxManage createvm --name "debian-lab" --ostype Debian_64 --register
VBoxManage modifyvm "debian-lab" --memory 2048 --cpus 2 --vram 16 --nic1 nat</code></pre>`,
          '<p><strong>Étape 2 — Créer le disque et les contrôleurs.</strong> Un disque VDI de 20 Go (20480 Mo), alloué dynamiquement, relié à un contrôleur SATA ; l’ISO est placée dans un lecteur optique.</p>',
          `<pre><code>VBoxManage createmedium disk --filename "$HOME/VirtualBox VMs/debian-lab/debian-lab.vdi" --size 20480 --format VDI
VBoxManage storagectl "debian-lab" --name "SATA" --add sata --controller IntelAhci
VBoxManage storageattach "debian-lab" --storagectl "SATA" --port 0 --device 0 --type hdd --medium "$HOME/VirtualBox VMs/debian-lab/debian-lab.vdi"
VBoxManage storagectl "debian-lab" --name "IDE" --add ide
VBoxManage storageattach "debian-lab" --storagectl "IDE" --port 0 --device 0 --type dvddrive --medium "$HOME/Telechargements/debian-netinst.iso"</code></pre>`,
          '<p><strong>Étape 3 — Démarrer et installer Debian.</strong> Suivre l’installeur (langue, clavier, utilisateur, partitionnement guidé sur tout le disque, « serveur SSH » et « utilitaires usuels du système » comme seuls logiciels). À la fin, éjecter l’ISO.</p>',
          `<pre><code>VBoxManage startvm "debian-lab" --type gui
VBoxManage storageattach "debian-lab" --storagectl "IDE" --port 0 --device 0 --type dvddrive --medium emptydrive</code></pre>`,
          '<p><strong>Étape 4 — Rendre la VM joignable.</strong> Redirection de port NAT pour SSH puis connexion depuis l’hôte (chapitre 4).</p>',
          `<pre><code>VBoxManage modifyvm "debian-lab" --natpf1 "ssh,tcp,,2222,,22"
ssh -p 2222 utilisateur@127.0.0.1</code></pre>`,
          '<p><strong>Étape 5 — Protéger puis exporter.</strong> Snapshot avant toute modification, clone pour un second serveur, export OVA pour une copie hors de la machine (chapitre 5).</p>',
          `<pre><code>VBoxManage snapshot "debian-lab" take "installation-propre"
VBoxManage clonevm "debian-lab" --name "debian-lab-2" --register
VBoxManage export "debian-lab" -o "$HOME/debian-lab.ova"
VBoxManage list vms
VBoxManage controlvm "debian-lab" acpipowerbutton</code></pre>`,
          box('method', 'Ce que prouve l’atelier', 'compass',
            '    <p>Une machine « complète » (système, disque, réseau) tient dans quelques fichiers et se pilote en quelques commandes. Notez le temps de création, la taille du fichier VDI avant et après l’installation, et l’utilisation réelle du processeur : ce sont les trois lignes de preuve du pitch de ce chapitre.</p>'),
          box('pitfall', 'Si quelque chose ne marche pas', 'warning',
            '    <p>« VT-x non disponible » : voir le chapitre 2. Écran noir au démarrage : vérifier que l’ISO est bien attachée et le contrôleur graphique par défaut. Pas de réseau : vérifier que --nic1 vaut nat. Les noms d’options peuvent varier légèrement d’une version de VirtualBox à l’autre : la commande <code>VBoxManage --help</code> et le manuel officiel font foi.</p>')
        ].join('\n')
      }
    ],
    questions: [
      { q: 'Quelle commande VBoxManage crée et enregistre une nouvelle machine virtuelle ?', opts: ['VBoxManage createvm --name "debian-lab" --register', 'VBoxManage export "debian-lab"', 'VBoxManage snapshot "debian-lab" take'], correct: 0, exp: 'createvm --register déclare une nouvelle VM dans VirtualBox ; export produit une OVA et snapshot take enregistre un instantané.' },
      { q: 'Dans l’atelier, pourquoi crée-t-on une redirection de port 2222 vers 22 ?', opts: ['pour accélérer le disque virtuel', 'pour joindre en SSH, depuis l’hôte, une VM placée en NAT', 'pour cloner la VM sans l’éteindre'], correct: 1, exp: 'En NAT, la VM n’est pas joignable de l’extérieur ; la redirection du port 2222 de l’hôte vers le port 22 de la VM permet la connexion SSH.' }
    ],
    flashcards: [
      { q: 'Quelles commandes VBoxManage pour créer une VM minimale ?', a: 'createvm (création), modifyvm (mémoire, vCPU, réseau), createmedium (disque), storagectl et storageattach (contrôleur, disque, ISO), startvm (démarrage).' },
      { q: 'Comment exporter proprement une VM VirtualBox ?', a: 'Éteindre la VM puis VBoxManage export "nom" -o fichier.ova ; VBoxManage import fichier.ova la restaure sur un autre poste.' }
    ]
  }
};

function enrich(chapter) {
  const extra = EXTRAS[chapter.n];
  if (!extra) return chapter;
  const sections = chapter.sections.slice();
  // Insertion de la fin vers le début : les indices `at` restent valides.
  const additions = (extra.sections || []).slice().sort((a, b) => b.at - a.at);
  for (const addition of additions) {
    const at = Math.min(addition.at, sections.length);
    sections.splice(at, 0, { title: addition.title, html: addition.html });
  }
  return Object.assign({}, chapter, {
    objectives: chapter.objectives.concat(extra.objectives || []),
    notions: (chapter.notions || []).concat(extra.notions || []),
    sections,
    questions: chapter.questions.concat(extra.questions || []),
    flashcards: chapter.flashcards.concat(extra.flashcards || [])
  });
}

module.exports = { enrich, EXTRAS };

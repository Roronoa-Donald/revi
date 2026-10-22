/**
 * Chapitre 5 du cours « SQL » B2 — Transactions ACID, Concurrence & Niveaux d’Isolation.
 */
'use strict';

const { box } = require('../../../scripts/course-kit');

module.exports = {
  n: 5,
  title: 'Transactions ACID, Concurrence &amp; Niveaux d’Isolation',
  short: 'Transactions &amp; Concurrence',
  toc: 'Propriétés ACID, commandes de contrôle transactionnel (BEGIN, COMMIT, ROLLBACK, SAVEPOINT), anomalies de concurrence (lectures sales, non répétables, fantômes), 4 niveaux d’isolation ANSI/ISO et gestion des verrous et interblocages (Deadlocks).',
  time: '≈ 2 h 45 de travail',
  free: false,
  lockLabel: 'Réservé B2 et plus',

  situation:
    'Lors d’une vente flash de billets de concert, deux utilisateurs cliquent simultanément sur le dernier siège disponible. ' +
    'Dans un système mal isolé, les deux requêtes lisent l’état « libre », débitent les comptes respectifs et attribuent la même place deux fois : ' +
    'c’est une anomalie de concurrence classique de mise à jour perdue (Lost Update). ' +
    'À l’inverse, des verrous trop agressifs risquent de figer la base de données dans un interblocage total (Deadlock) où les transactions s’attendent indéfiniment. ' +
    'Comment garantir l’atomicité intégrale d’une série d’opérations avec BEGIN, COMMIT et ROLLBACK ? ' +
    'Quel niveau d’isolation choisir entre Read Committed, Repeatable Read et Serializable pour équilibrer rigueur et débit ? ' +
    'Comment le SGBD résout-il les deadlocks grâce aux graphes d’attente ? ' +
    'Ce module étudie les mécanismes vitaux de la cohérence transactionnelle.',

  objectives: [
    'définir rigoureusement les quatre propriétés ACID (Atomicité, Cohérence, Isolation, Durabilité) d’un SGBD relationnel ;',
    'manipuler les instructions de contrôle de transaction : BEGIN, COMMIT, ROLLBACK, SAVEPOINT et ROLLBACK TO SAVEPOINT ;',
    'identifier et caractériser les 3 anomalies de concurrence majeures : Dirty Read, Non-Repeatable Read et Phantom Read ;',
    'comparer les 4 niveaux d’isolation du standard ANSI/ISO SQL et leurs compromis entre consistance et performances ;',
    'analyser les mécanismes de verrous partagés (S) et exclusifs (X) et détecter les cycles d’interblocage (Deadlocks).'
  ],

  sections: [
    {
      title: 'Le Modèle ACID &amp; Contrôle Transactionnel (TCL)',
      html: [
        '<p>Une <strong>transaction</strong> est une unité logique de travail regroupant une ou plusieurs instructions SQL. ' +
        'Le moteur relationnel garantit que cette séquence respecte le contrat <strong>ACID</strong> :</p>',

        '<div class="grid grid-2">',
        '  <div class="card">',
        '    <h4 class="card-title">Les 4 Piliers ACID</h4>',
        '    <ul>',
        '      <li><strong>A - Atomicité (Tout ou rien) :</strong> Soit toutes les opérations de la transaction sont enregistrées, soit aucune ne l’est. En cas d’erreur au milieu, le SGBD annule tout (ROLLBACK).</li>',
        '      <li><strong>C - Cohérence (Consistency) :</strong> La transaction fait passer la base d’un état valide à un autre état valide, en respectant l’intégralité des contraintes d’intégrité (clés, CHECK, triggers).</li>',
        '      <li><strong>I - Isolation :</strong> Les transactions concurrentes s’exécutent sans interférences mutuelles néfastes, comme si elles étaient séquentielles.</li>',
        '      <li><strong>D - Durabilité :</strong> Une fois le COMMIT confirmé, les modifications sont écrites de façon permanente dans le journal non volatil (WAL), résistant même à une coupure électrique immédiate.</li>',
        '    </ul>',
        '  </div>',
        '  <div class="card">',
        '    <h4 class="card-title">Commandes de Contrôle (TCL)</h4>',
        '    <div class="code-block">' +
        'BEGIN TRANSACTION;\n' +
        'UPDATE Comptes SET solde = solde - 500 WHERE id = 12;\n' +
        'SAVEPOINT etape1;\n' +
        'UPDATE Comptes SET solde = solde + 500 WHERE id = 88;\n' +
        '-- Si incident sur la 2e opération :\n' +
        '-- ROLLBACK TO SAVEPOINT etape1;\n' +
        'COMMIT;' +
        '    </div>',
        '  </div>',
        '</div>'
      ].join('\n')
    },
    {
      title: 'Anomalies de Concurrence &amp; Les 4 Niveaux d’Isolation ANSI',
      html: [
        '<p>Lorsque des centaines d’utilisateurs lisent et écrivent simultanément sur les mêmes tables, ' +
        'des phénomènes parasites peuvent fausser les calculs :</p>',

        '<ul>',
        '  <li><strong>Lecture sale (Dirty Read) :</strong> La transaction T1 lit une donnée modifiée par T2 qui n’a <em>pas encore fait de COMMIT</em>. Si T2 fait un ROLLBACK, T1 aura travaillé sur des données fantaisistes qui n’ont jamais existé.</li>',
        '  <li><strong>Lecture non répétable (Non-Repeatable Read) :</strong> T1 lit une ligne, puis T2 modifie cette ligne et fait un COMMIT. Si T1 relit la même ligne au cours de sa transaction, elle observe une valeur différente.</li>',
        '  <li><strong>Lecture fantôme (Phantom Read) :</strong> T1 exécute une requête avec un filtre de plage (ex: <code>WHERE age &gt; 18</code>). T2 insère une nouvelle ligne respectant ce critère et valide son COMMIT. Si T1 relance la même requête, de nouvelles lignes « fantômes » sont apparues.</li>',
        '</ul>',

        '<table class="table-compact">',
        '  <thead><tr><th>Niveau d’Isolation</th><th>Lecture Sale</th><th>Lecture Non Répétable</th><th>Lecture Fantôme</th></tr></thead>',
        '  <tbody>',
        '    <tr><td><strong>READ UNCOMMITTED</strong></td><td>Oui</td><td>Oui</td><td>Oui</td></tr>',
        '    <tr><td><strong>READ COMMITTED</strong> (Défaut PostgreSQL/Oracle)</td><td>Non</td><td>Oui</td><td>Oui</td></tr>',
        '    <tr><td><strong>REPEATABLE READ</strong> (Défaut MySQL InnoDB)</td><td>Non</td><td>Non</td><td>Possible (selon moteur)</td></tr>',
        '    <tr><td><strong>SERIALIZABLE</strong></td><td>Non</td><td>Non</td><td>Non (Isolation totale)</td></tr>',
        '  </tbody>',
        '</table>'
      ].join('\n')
    },
    {
      title: 'Verrouillage Concurrente &amp; Interblocages (Deadlocks)',
      html: [
        '<p>Pour isoler les transactions, les SGBD s’appuient sur des verrous posés en mémoire :</p>',

        '<div class="grid grid-2">',
        '  <div class="card">',
        '    <h4 class="card-title">Types de verrous</h4>',
        '    <ul>',
        '      <li><strong>Verrou Partagé (Shared Lock - S) :</strong> Posé en lecture (<code>SELECT ... FOR SHARE</code>). Plusieurs transactions peuvent lire la même ressource en parallèle.</li>',
        '      <li><strong>Verrou Exclusif (Exclusive Lock - X) :</strong> Posé en écriture (<code>UPDATE</code>, <code>DELETE</code>, <code>SELECT ... FOR UPDATE</code>). Une seule transaction peut détenir ce verrou ; tout autre accès est suspendu.</li>',
        '    </ul>',
        '  </div>',
        '  <div class="card">',
        '    <h4 class="card-title">L’Interblocage (Deadlock)</h4>',
        '    <p>Survient lorsque deux transactions s’attendent mutuellement dans une boucle fermée :</p>',
        '    <p>T1 verrouille A et attend B &bull; T2 verrouille B et attend A.</p>',
        '    <p>Le moteur détecte le cycle dans son graphe d’attente (Wait-For Graph), choisit une transaction « victime », annule ses opérations par un ROLLBACK forcé et lève une exception <code>Deadlock detected</code>.</p>',
        '  </div>',
        '</div>',

        box(
          'Bonnes pratiques pour éliminer les deadlocks',
          '<ul>' +
          '  <li><strong>Ordonnancement strict :</strong> Toujours verrouiller ou modifier les tables et les lignes dans le même ordre déterministe au sein de toutes les fonctions applicatives (ex: toujours par id croissant).</li>' +
          '  <li><strong>Transactions courtes :</strong> Réduire la durée de vie des transactions au strict nécessaire : jamais d’appel API externe ou de traitement lourd à l’intérieur d’un bloc BEGIN ... COMMIT.</li>' +
          '</ul>'
        )
      ].join('\n')
    }
  ],

  questions: [
    {
      stem: 'Que signifie la propriété d’Atomicité (A) dans le contrat ACID d’une base de données relationnelle ?',
      opts: [
        'Toutes les opérations de la transaction sont entièrement appliquées ou aucune ne l’est (principe du tout ou rien)',
        'Les requêtes sont traitées à la vitesse d’un atome',
        'Chaque table ne peut contenir qu’une seule colonne clé primaire',
        'Les données sont sauvegardées sur une clé USB'
      ],
      correct: 0,
      exp: 'L’atomicité garantit que l’ensemble des instructions d’une transaction forme un bloc indivisible : en cas d’échec partiel, le SGBD annule l’intégralité des modifications préalables pour restaurer l’état d’origine (ROLLBACK).'
    },
    {
      stem: 'Quelle anomalie de concurrence se produit lorsqu’une transaction lit des modifications apportées par une autre transaction qui n’a PAS encore été validée par un COMMIT ?',
      opts: [
        'Lecture sale (Dirty Read)',
        'Lecture fantôme (Phantom Read)',
        'Lecture non répétable (Non-Repeatable Read)',
        'Mise à jour perdue (Lost Update)'
      ],
      correct: 0,
      exp: 'La lecture sale (Dirty Read) consiste à lire des données non validées en mémoire qui risquent d’être annulées par un ROLLBACK ultérieur de la transaction concurrente.'
    },
    {
      stem: 'Quel est le niveau d’isolation minimal requis pour empêcher totalement les lectures sales (Dirty Reads) ?',
      opts: [
        'Read Committed',
        'Read Uncommitted',
        'Repeatable Read',
        'Serializable'
      ],
      correct: 0,
      exp: 'Le niveau Read Committed garantit qu’une transaction ne peut lire que les données dont le COMMIT a été définitivement enregistré par d’autres transactions, neutralisant ainsi les lectures sales.'
    },
    {
      stem: 'À quoi sert l’instruction SAVEPOINT dans une transaction SQL ?',
      opts: [
        'À marquer un point de reprise intermédiaire permettant un ROLLBACK partiel sans annuler toute la transaction',
        'À enregistrer définitivement la transaction sur le disque',
        'À verrouiller l’intégralité de la base de données en lecture seule',
        'À créer une copie de sauvegarde physique de la table'
      ],
      correct: 0,
      exp: 'SAVEPOINT nom_point crée un point de jalonnement dans la transaction en cours. En cas d’erreur sur une étape ultérieure, la commande ROLLBACK TO SAVEPOINT nom_point rétablit l’état à ce point précis sans perdre le travail antérieur.'
    },
    {
      stem: 'Comment le SGBD résout-il un interblocage (Deadlock) entre deux transactions ?',
      opts: [
        'Il détecte le cycle dans son graphe d’attente, choisit une transaction comme victime et force son annulation par ROLLBACK',
        'Il attend indéfiniment que l’administrateur redémarre le serveur',
        'Il exécute les deux transactions en parallèle en fusionnant leurs modifications au hasard',
        'Il supprime les deux tables concernées'
      ],
      correct: 0,
      exp: 'Le gestionnaire de verrous du SGBD surveille son graphe d’attente (Wait-For Graph). Dès qu’un cycle est détecté, il interrompt l’une des transactions (la victime), annule ses actions par ROLLBACK et renvoie une erreur applicative pour que le programme puisse retenter l’opération.'
    }
  ],

  pitfalls: [
    'Laisser une transaction ouverte (BEGIN sans COMMIT ni ROLLBACK) dans une application web, ce qui maintient indéfiniment des verrous et paralyse la base.',
    'Effectuer des appels réseau externes lents (ex: API de paiement par carte) à l’intérieur d’une transaction SQL active.',
    'Modifier des ressources dans un ordre aléatoire (ex: T1 verrouille client puis facture, T2 verrouille facture puis client), provoquant des interblocages fréquents.',
    'Utiliser le niveau SERIALIZABLE partout en pensant que c’est toujours « plus sûr », sans anticiper les erreurs d’interblocage et la chute drastique du débit applicatif.',
    'Croire que la durabilité (D de ACID) dispense de mettre en place des sauvegardes régulières et une réplication externe hors-site.'
  ],

  methodTitle: 'Protocole en 4 étapes pour sécuriser les transactions concurrentes en production',
  method: [
    'Garder les blocs transactionnels les plus courts et atomiques possible : préparer toutes les données en mémoire avant de lancer le BEGIN.',
    'Imposer un ordre universel d’accès aux tables et aux lignes (ex: toujours trier les IDs par ordre croissant avant de poser un SELECT FOR UPDATE).',
    'Sélectionner le niveau d’isolation adapté au besoin métier (Read Committed pour les opérations courantes, Repeatable Read ou Serializable pour les clôtures comptables).',
    'Intercepter systématiquement les erreurs de deadlock et de sérialisation au niveau du code applicatif pour réexécuter la transaction (Retry Pattern avec backoff exponentiel).'
  ],

  summary: [
    'Le contrat ACID garantit l’intégrité absolue des bases de données relationnelles face aux pannes et aux accès concurrents.',
    'Les commandes TCL (BEGIN, COMMIT, ROLLBACK, SAVEPOINT) définissent et contrôlent le périmètre de la transaction.',
    'Les trois anomalies de concurrence sont la lecture sale, la lecture non répétable et la lecture fantôme.',
    'Les 4 niveaux d’isolation ANSI (Read Uncommitted, Read Committed, Repeatable Read, Serializable) offrent un compromis entre consistance et performances.',
    'Les deadlocks sont prévenus par un ordonnancement déterministe des verrous et résolus automatiquement par le SGBD via l’annulation d’une transaction victime.'
  ],

  checklist: [
    'Je sais expliquer chacune des 4 lettres de l’acronyme ACID.',
    'Je maîtrise l’utilisation de SAVEPOINT et ROLLBACK TO SAVEPOINT.',
    'Je sais caractériser une lecture sale et expliquer pourquoi elle est dangereuse.',
    'Je connais les 4 niveaux d’isolation ANSI et le niveau par défaut de mon SGBD.',
    'Je comprends comment se forme un Deadlock et comment l’éviter par un ordonnancement déterministe.'
  ],

  notions: [
    'Transactions relationnelles & Contrat ACID',
    'Atomicité, Cohérence, Isolation, Durabilité',
    'Commandes TCL (BEGIN, COMMIT, ROLLBACK)',
    'Points de reprise SAVEPOINT & ROLLBACK TO',
    'Anomalies de concurrence (Dirty, Non-repeatable, Phantom Read)',
    'Niveaux d’isolation ANSI/ISO (Read Committed, Repeatable Read, Serializable)',
    'Verrous partagés (S) et exclusifs (X)',
    'Interblocages (Deadlocks) & Graphe d’attente (Wait-For Graph)'
  ],

  mastery: [
    { cls: 'low', text: '&lt; 50 % — Révise impérativement la signification des 4 lettres d’ACID et le rôle du ROLLBACK.' },
    { cls: 'mid', text: '50–69 % — Entraînez-vous sur les anomalies de concurrence et les 4 niveaux d’isolation ANSI.' },
    { cls: 'good', text: '70–94 % — Solide : vous maîtrisez les transactions et les mécanismes de verrouillage concurrentiel.' },
    { cls: 'top', text: '≥ 95 % — Maîtrise totale : passe aux vues, procédures stockées, déclencheurs et optimisation au module 6.' }
  ],

  flashcards: [
    { q: 'Que garantit la propriété de Durabilité (D) d’ACID ?', a: 'Elle garantit que dès qu’un COMMIT est confirmé, les données sont écrites de façon permanente dans le journal non volatil (WAL) et ne seront pas perdues même en cas de crash serveur.' },
    { q: 'Qu’est-ce qu’un SAVEPOINT ?', a: 'C’est un point de repère intermédiaire dans une transaction permettant d’annuler les actions récentes via ROLLBACK TO sans annuler toute la transaction.' },
    { q: 'En quoi consiste une lecture sale (Dirty Read) ?', a: 'À lire des données modifiées par une autre transaction qui n’a pas encore validé son COMMIT, au risque qu’elles soient ensuite annulées par ROLLBACK.' },
    { q: 'Qu’est-ce qu’une lecture fantôme (Phantom Read) ?', a: 'C’est lorsqu’une transaction réexécute une requête avec un critère de plage (WHERE) et découvre de nouvelles lignes insérées et validées par une transaction concurrente.' },
    { q: 'Quelle est la différence entre un verrou partagé (S) et un verrou exclusif (X) ?', a: 'Un verrou partagé autorise plusieurs lectures simultanées, alors qu’un verrou exclusif réserve la ressource à une seule transaction en écriture et bloque tout autre accès.' },
    { q: 'Comment éviter les Deadlocks dans une application bancaire ?', a: 'En accédant toujours aux comptes dans le même ordre déterministe (ex: toujours trier les identifiants par ordre croissant avant de poser les verrous).' }
  ]
};

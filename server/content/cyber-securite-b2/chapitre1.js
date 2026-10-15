/**
 * Chapitre 1 du cours « Cybersécurité » B2 — Fondements de la Sécurité, Modèle CIA & Gestion des Risques.
 */
'use strict';

const { box } = require('../../../scripts/course-kit');

module.exports = {
  n: 1,
  title: 'Fondements de la Sécurité, Modèle CIA &amp; Gestion des Risques',
  short: 'Modèle CIA &amp; Risques',
  toc: 'Triade CIA (Confidentialité, Intégrité, Disponibilité), modèle AAA (Authentification, Autorisation, Traçabilité), surface d’attaque, analyse de risques ISO 27005 et politiques PSSI.',
  time: '≈ 2 h 30 de travail',
  free: true,

  situation:
    'Lundi matin à 8h30, l’équipe support reçoit des dizaines d’appels d’utilisateurs paniqués : ' +
    'le portail de gestion commerciale refuse les connexions, et les bases de données financières affichent des soldes négatifs aberrants. ' +
    'Simultanément, un compte anonyme sur un forum publie un échantillon de 10 000 dossiers clients avec pièces d’identité. ' +
    'Face à cette crise multiforme, comment caractériser avec rigueur les atteintes subies ? ' +
    'Quelles sont les failles organisationnelles et logiques exploitées ? ' +
    'Ce premier module pose les fondations conceptuelles de la sécurité de l’information.',

  objectives: [
    'définir et différencier les trois piliers fondamentaux de la triade CIA (Confidentialité, Intégrité, Disponibilité) ;',
    'appliquer le modèle AAA (Authentification, Autorisation, Traçabilité/Accounting) dans la conception des systèmes ;',
    'distinguer clairement une menace, une vulnérabilité, un exploit et un impact financier ou opérationnel ;',
    'quantifier le niveau de risque informatique selon l’approche ISO 27005 (Score = Menace &times; Vulnérabilité &times; Impact) ;',
    'auditer et renforcer la robustesse des mots de passe selon les recommandations de l’ANSSI et du NIST.'
  ],

  sections: [
    {
      title: 'La triade fondamentale CIA : Confidentialité, Intégrité, Disponibilité',
      html: [
        '<p>Tout programme de sécurité de l’information vise à préserver l’équilibre entre trois exigences vitales, ' +
        'désignées par l’acronyme <strong>CIA</strong> (ou DICP en français pour Disponibilité, Intégrité, Confidentialité, Preuve) :</p>',

        '<div class="grid grid-3">',
        '  <div class="card">',
        '    <h4 class="card-title">1. Confidentialité (Confidentiality)</h4>',
        '    <p>Garantit que l’information n’est accessible et divulguée qu’aux personnes, entités ou processus autorisés.</p>',
        '    <p><strong>Menaces types :</strong> écoute clandestine (sniffing), vol d’identifiants, exfiltration de base de données.</p>',
        '    <p><strong>Contre-mesures :</strong> chiffrement au repos (AES-256), chiffrement en transit (TLS 1.3), cloisonnement des accès.</p>',
        '  </div>',
        '  <div class="card">',
        '    <h4 class="card-title">2. Intégrité (Integrity)</h4>',
        '    <p>Garantit l’exactitude, la complétude et la non-altération des données tout au long de leur cycle de vie.</p>',
        '    <p><strong>Menaces types :</strong> altération frauduleuse de transactions, injection SQL, empoisonnement DNS/ARP.</p>',
        '    <p><strong>Contre-mesures :</strong> fonctions de hachage (SHA-256), signatures numériques, contrôles de redondance cyclique.</p>',
        '  </div>',
        '  <div class="card">',
        '    <h4 class="card-title">3. Disponibilité (Availability)</h4>',
        '    <p>Garantit que les services et données sont opérationnels et accessibles aux utilisateurs légitimes au moment requis.</p>',
        '    <p><strong>Menaces types :</strong> attaques par déni de service distribué (DDoS), ransomwares bloquants, pannes matérielles.</p>',
        '    <p><strong>Contre-mesures :</strong> redondance d’infrastructure, plans de reprise d’activité (PRA), sauvegardes 3-2-1 déconnectées.</p>',
        '  </div>',
        '</div>'
      ].join('\n')
    },
    {
      title: 'Le cadre opérationnel AAA : Authentification, Autorisation &amp; Traçabilité',
      html: [
        '<p>Pour contrôler l’accès aux ressources numériques, les systèmes déploient le triptyque <strong>AAA</strong> :</p>',

        '<table class="table">',
        '  <thead><tr><th>Composante</th><th>Question clé</th><th>Mécanisme technique associé</th></tr></thead>',
        '  <tbody>',
        '    <tr><td><strong>Authentification (Authentication)</strong></td><td>« Qui êtes-vous ? »</td><td>Mots de passe, certificats X.509, facteurs biométriques, jetons TOTP (RFC 6238).</td></tr>',
        '    <tr><td><strong>Autorisation (Authorization)</strong></td><td>« Qu’avez-vous le droit de faire ? »</td><td>Listes de contrôle d’accès (ACL), matrices RBAC (rôles), politiques ABAC (attributs).</td></tr>',
        '    <tr><td><strong>Traçabilité (Accounting / Audit)</strong></td><td>« Qu’avez-vous réellement fait et quand ? »</td><td>Journaux d’événements immuables (syslog sécurisé), horodatage NTP synchronisé, SIEM.</td></tr>',
        '  </tbody>',
        '</table>',

        box('pitfall', 'Confusion fréquente : Authentification versus Autorisation', [
          '<p>Une erreur classique consiste à croire qu’un utilisateur authentifié avec succès dispose nécessairement des droits ' +
          'pour exécuter une opération. L’authentification prouve l’identité ; l’autorisation valide si cette identité ' +
          'possède la permission requise. La rupture de cette frontière engendre les failles de contrôle d’accès (IDOR).</p>'
        ].join('\n'))
      ].join('\n')
    },
    {
      title: 'Analyse et quantification des risques selon l’ISO 27005',
      html: [
        '<p>La sécurité absolue n’existant pas, la gestion des risques permet d’orienter les investissements vers les menaces ' +
        'les plus dévastatrices. Un risque informatique se décompose en trois variables :</p>',

        '<pre><code>// Formule fondamentale de l’évaluation du risque brut :\n' +
        'Risque = Menace &times; Vulnerabilite &times; Impact\n\n' +
        'Où :\n' +
        '- Menace (M)       : Potentiel d’un agent externe ou interne à causer un préjudice (échelle 1 à 5)\n' +
        '- Vulnerabilite (V) : Faille ou faiblesse du système exploitable par la menace (échelle 1 à 5)\n' +
        '- Impact (I)        : Gravité financière, juridique ou d’image en cas de réalisation (échelle 1 à 5)\n\n' +
        'Score brut = M * V * I   (compris entre 1 et 125)\n' +
        '- Score &lt; 20       &rarr; Risque FAIBLE (acceptation sous surveillance)\n' +
        '- 20 &le; Score &lt; 50 &rarr; Risque MOYEN (mesures d’atténuation standard)\n' +
        '- 50 &le; Score &lt; 80 &rarr; Risque ÉLEVÉ (traitement prioritaire requis)\n' +
        '- Score &ge; 80      &rarr; Risque CRITIQUE (remédiation immédiate obligatoire)</code></pre>'
      ].join('\n')
    },
    {
      title: 'Politique de sécurité des mots de passe &amp; Calcul d’entropie',
      html: [
        '<p>Le mot de passe demeure le premier rempart d’authentification. L’ANSSI et le NIST recommandent ' +
        'd’abandonner l’expiration périodique arbitraire au profit d’une longueur minimale substantielle et d’une grande variété de caractères.</p>',

        '<div class="grid grid-2">',
        '  <div class="card">',
        '    <h4 class="card-title">Les 5 règles de robustesse ANSSI / NIST</h4>',
        '    <ul>',
        '      <li><strong>Longueur minimale :</strong> au moins 12 à 15 caractères.</li>',
        '      <li><strong>Complexité :</strong> mélange de majuscules, minuscules, chiffres et symboles.</li>',
        '      <li><strong>Non-prédictibilité :</strong> refus des mots du dictionnaire, dates de naissance ou séquences triviales.</li>',
        '      <li><strong>Unicité :</strong> jamais de réutilisation d’un même mot de passe sur deux services.</li>',
        '      <li><strong>Double facteur :</strong> association systématique d’un second facteur MFA.</li>',
        '    </ul>',
        '  </div>',
        '  <div class="card">',
        '    <h4 class="card-title">Entropie de Shannon d’un mot de passe</h4>',
        '    <p>L’entropie mesure le degré d’incertitude (en bits) face à une attaque par force brute :</p>',
        '    <p><code>E = L &times; log2(N)</code></p>',
        '    <p>Où <i>L</i> est la longueur et <i>N</i> la taille de l’ensemble de caractères utilisé :</p>',
        '    <ul>',
        '      <li>Chiffres seuls (0-9) : <i>N = 10</i> (3.32 bits / car.)</li>',
        '      <li>Lettres min + maj : <i>N = 52</i> (5.70 bits / car.)</li>',
        '      <li>Alphanumérique + symboles : <i>N = 94</i> (6.55 bits / car.)</li>',
        '    </ul>',
        '  </div>',
        '</div>'
      ].join('\n')
    }
  ],

  questions: [
    {
      stem: 'Quelle propriété de la triade CIA est directement violée lorsqu’un rançongiciel (ransomware) chiffre les disques durs d’une entreprise ?',
      opts: [
        'La Disponibilité',
        'La Confidentialité',
        'L’Authenticité',
        'La Non-répudiation'
      ],
      correct: 0,
      exp: 'Le chiffrement malveillant empêche les utilisateurs légitimes d’accéder à leurs fichiers et serveurs, ce qui constitue une atteinte directe et majeure à la Disponibilité.'
    },
    {
      stem: 'Dans le modèle AAA, quelle composante détermine si un utilisateur authentifié a le droit de modifier un fichier spécifique ?',
      opts: [
        'L’Autorisation',
        'L’Authentification',
        'La Traçabilité (Accounting)',
        'L’Imputabilité'
      ],
      correct: 0,
      exp: 'L’authentification prouve qui est l’utilisateur, tandis que l’Autorisation vérifie les privilèges et permissions dont il dispose sur l’objet sollicité.'
    },
    {
      stem: 'Selon la formule standard de l’ISO 27005 (Risque = Menace &times; Vulnérabilité &times; Impact), quel est le niveau de risque pour M=4, V=3, I=5 ?',
      opts: [
        'ÉLEVÉ (Score = 60)',
        'FAIBLE (Score = 12)',
        'MOYEN (Score = 35)',
        'CRITIQUE (Score = 95)'
      ],
      correct: 0,
      exp: 'Score = 4 * 3 * 5 = 60. Ce score se situe dans la plage 50 à 79, ce qui correspond au niveau de risque ÉLEVÉ.'
    },
    {
      stem: 'Pourquoi l’entropie d’un mot de passe de 14 caractères composé uniquement de chiffres est-elle bien inférieure à celle d’un mot de passe de 14 caractères complet ?',
      opts: [
        'Parce que la taille de l’alphabet N n’est que de 10 contre 94, réduisant drastiquement le nombre total de combinaisons N^L',
        'Parce que les chiffres sont stockés sur moins d’octets en mémoire vive',
        'Parce que les algorithmes de hachage comme SHA-256 refusent les mots de passe numériques',
        'Parce que le protocole TCP interdit l’envoi de chiffres isolés'
      ],
      correct: 0,
      exp: 'L’entropie vaut L * log2(N). Avec N=10, 14 * 3.32 ≈ 46.5 bits d’entropie. Avec N=94, 14 * 6.55 ≈ 91.7 bits, soit une résistance des milliards de fois supérieure aux attaques.'
    }
  ],

  pitfalls: [
    'Considérer que l’authentification équivaut à l’autorisation : être connecté ne donne pas tous les droits.',
    'Confondre vulnérabilité (faiblesse interne du système) et menace (agent extérieur susceptible d’exploiter cette faiblesse).',
    'Imposer un renouvellement mensuel obligatoire des mots de passe sans double facteur, ce qui incite les utilisateurs à concevoir des variantes prévisibles (ex. Ete2026!).',
    'Négliger la Disponibilité dans les architectures au profit du seul chiffrement des données.',
    'Traiter un risque sans évaluer l’impact métier réel : surprotéger des données publiques insignifiantes tout en négligeant la base comptable.'
  ],

  methodTitle: 'Protocole en 4 étapes pour mener une analyse de risques d’infrastructure',
  method: [
    'Cartographier les actifs primordiaux : inventorier les bases de données, applications critiques et flux sensibles.',
    'Identifier les menaces et vulnérabilités : recenser les vecteurs d’attaque crédibles et auditer l’exposition des services.',
    'Quantifier les scores de risque brut : calculer le produit Menace &times; Vulnérabilité &times; Impact pour chaque scénario.',
    'Définir le plan de traitement : choisir entre atténuation (mesures techniques), transfert (cyber-assurance), évitement ou acceptation formelle.'
  ],

  summary: [
    'La triade CIA (Confidentialité, Intégrité, Disponibilité) est la boussole incontournable de tout audit de sécurité.',
    'Le modèle AAA garantit que chaque requête est identifiée (Authentification), vérifiée (Autorisation) et consignée (Traçabilité).',
    'Le risque résulte du croisement d’une menace, d’une vulnérabilité et d’un impact financier ou réglementaire.',
    'La robustesse d’un mot de passe dépend avant tout de sa longueur et de sa diversité (entropie &ge; 80 bits).',
    'La sécurité opérationnelle exige une politique cohérente combinant mesures préventives, contrôles continus et PRA.'
  ],

  checklist: [
    'Je sais expliciter chaque pilier de la triade CIA avec des exemples d’incidents concrets.',
    'Je distingue rigoureusement Authentification et Autorisation dans une architecture applicative.',
    'Je maîtrise le calcul et la classification du score de risque selon l’ISO 27005.',
    'Je connais la formule de l’entropie de Shannon et les recommandations de l’ANSSI pour les mots de passe.',
    'Je comprends l’intérêt d’une journalisation immuable pour assurer la traçabilité des accès.'
  ],

  notions: [
    'Triade CIA (Confidentialité, Intégrité, Disponibilité)',
    'Modèle AAA (Authentification, Autorisation, Accounting)',
    'Menace vs Vulnérabilité vs Exploit vs Impact',
    'Gestion des risques ISO 27005',
    'Score de criticité du risque',
    'Politique de Sécurité des SI (PSSI)',
    'Entropie de mot de passe (formule de Shannon)',
    'Règles ANSSI & NIST pour les identifiants',
    'Authentification multi-facteurs (MFA)',
    'Traçabilité et horodatage des journaux'
  ],

  mastery: [
    { cls: 'low', text: '&lt; 50 % — Revois les définitions de la triade CIA et la différence entre menace et vulnérabilité.' },
    { cls: 'mid', text: '50–69 % — Entraîne-toi sur le calcul de risque ISO 27005 et la formule d’entropie.' },
    { cls: 'good', text: '70–89 % — Solide : tu maîtrises les principes fondamentaux de la gestion des risques et du modèle AAA.' },
    { cls: 'top', text: '≥ 95 % — Excellent : passe à la cryptographie appliquée et aux signatures numériques au module 2.' }
  ],

  flashcards: [
    { q: 'Que désignent les trois lettres de la triade CIA ?', a: 'Confidentialité, Intégrité et Disponibilité (Confidentiality, Integrity, Availability).' },
    { q: 'Quelle est la différence entre une vulnérabilité et une menace ?', a: 'Une vulnérabilité est une faiblesse interne du système ; une menace est une cause potentielle extérieure d’incident.' },
    { q: 'Comment calcule-t-on le score de risque brut selon l’ISO 27005 ?', a: 'Score = Menace &times; Vulnérabilité &times; Impact (variant de 1 à 125).' },
    { q: 'Quel pilier de la triade est violé lors d’une attaque par injection SQL modifiant un solde ?', a: 'L’Intégrité, car les données ont été altérées de manière frauduleuse.' },
    { q: 'Quelle est la formule de l’entropie de Shannon pour un mot de passe ?', a: 'E = L &times; log2(N), où L est la longueur et N la taille de l’alphabet de caractères.' },
    { q: 'Pourquoi le changement fréquent obligatoire de mot de passe est-il aujourd’hui déconseillé ?', a: 'Parce qu’il pousse les utilisateurs à choisir des motifs prévisibles et affaiblit l’entropie globale sans apporter de sécurité réelle.' }
  ]
};

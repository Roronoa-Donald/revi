/**
 * Chapitre 5 du cours « Ingénierie du besoin » B2 — Spécification Formelle & Traçabilité (SRS & BDD).
 */
'use strict';

const { box } = require('../../../scripts/course-kit');

module.exports = {
  n: 5,
  title: 'Spécification Formelle &amp; Traçabilité (SRS &amp; BDD)',
  short: 'Spécification &amp; Traçabilité',
  toc: 'Cahier des charges SRS (ISO 29148 / IEEE 830), matrice RTM amont/aval, spécification par l’exemple et syntaxe Gherkin (BDD).',
  time: '≈ 2 h 50 de travail',
  free: false,
  lockLabel: 'Réservé B2 et plus',

  situation:
    'Rien n’est plus préjudiciable à un projet qu’une exigence perdue en cours de route ou une fonctionnalité développée ' +
    'qui ne correspond à aucun besoin contractuel. La spécification formelle et la traçabilité garantissent ' +
    'que chaque attente exprimée par le client trouve son reflet dans l’architecture, le code source et les suites de tests.',

  objectives: [
    'structurer un document de spécification logicielle (SRS) conforme à la norme ISO/IEC/IEEE 29148 ;',
    'générer des identifiants d’exigences normés et immuables avec préfixes catégoriels ;',
    'concevoir une matrice de traçabilité des exigences (RTM) bidirectionnelle (amont et aval) ;',
    'détecter les exigences orphelines et le phénomène de sur-qualité non demandée (Gold Plating) ;',
    'rédiger des critères d’acceptation exécutables en syntaxe Gherkin BDD (Given / When / Then).'
  ],

  sections: [
    {
      title: 'Le document de spécification logicielle (SRS - ISO/IEC/IEEE 29148)',
      html: [
        '<p>La <strong>Software Requirements Specification (SRS)</strong> est le contrat technique et fonctionnel ' +
        'qui lie la maîtrise d’ouvrage (le client) et la maîtrise d’œuvre (l’équipe de réalisation). Selon la norme ISO 29148, elle s’organise en 3 grandes sections :</p>',
        '<ol>\n' +
        '  <li><strong>Introduction &amp; Contexte</strong> : objet du document, périmètre du système, définitions et acronymes, références documentaires.</li>\n' +
        '  <li><strong>Description générale</strong> : perspective du produit, fonctions principales du système, caractéristiques des utilisateurs, contraintes générales de conception.</li>\n' +
        '  <li><strong>Exigences spécifiques détaillées</strong> : inventaire exhaustif des exigences fonctionnelles (FR), exigences d’interface (UI, API), exigences non-fonctionnelles (NFR) et exigences d’intégrité/sécurité.</li>\n' +
        '</ol>',
        box('danger', 'Le piège du document pavé non lu', 'alert',
          '    <p>Une spécification de 300 pages que personne ne lit est inutile. Les meilleures équipes maintiennent un SRS modulaire, ' +
          'hiérarchisé et couplé à un outil de gestion d’exigences (Jira, Polarion, ReqIF) synchronisé en continu avec les tests d’acceptation.</p>')
      ].join('\n')
    },
    {
      title: 'Nomenclature et codification formelle des exigences',
      html: [
        '<p>Pour éviter toute confusion, chaque exigence reçoit un identifiant alphanumérique normalisé dès sa saisie. ' +
        'La syntaxe recommandée respecte le format :</p>',
        '<p style="text-align:center;"><code>[PROJET]-[MODULE]-[TYPE]-[NUMÉRO]</code></p>',
        '<ul>\n' +
        '  <li><strong>PROJET</strong> : trigramme du projet (ex. <code>BNK</code> pour Banking Core).</li>\n' +
        '  <li><strong>MODULE</strong> : domaine fonctionnel (ex. <code>AUTH</code> pour Authentification, <code>PAY</code> pour Paiement).</li>\n' +
        '  <li><strong>TYPE</strong> : nature de l’exigence (<code>FR</code> = Fonctionnelle, <code>NFR</code> = Non-fonctionnelle, <code>SEC</code> = Sécurité, <code>PERF</code> = Performance).</li>\n' +
        '  <li><strong>NUMÉRO</strong> : entier incrémental sur 3 ou 4 chiffres (ex. <code>001</code>, <code>042</code>).</li>\n' +
        '</ul>',
        '<p>Exemple : <code>BNK-AUTH-FR-001</code> désigne sans équivoque la première exigence fonctionnelle du module d’authentification bancaire.</p>'
      ].join('\n')
    },
    {
      title: 'La matrice de traçabilité des exigences (RTM - Requirements Traceability Matrix)',
      html: [
        '<p>La <strong>RTM</strong> est un tableau croisé dynamique qui assure la continuité entre toutes les strates du projet :</p>',
        '<ul>\n' +
        '  <li><strong>Traçabilité Amont (Forward Traceability)</strong> : vérifie que chaque besoin client initial ' +
        'est bien pris en compte dans une exigence logicielle, conçu dans l’architecture et couvert par un cas de test. ' +
        '<em>Si une exigence n’a aucun test associé, la couverture est incomplète.</em></li>\n' +
        '  <li><strong>Traçabilité Aval (Backward Traceability)</strong> : vérifie que chaque ligne de code ou cas de test ' +
        'remonte à une exigence métier validée. ' +
        '<em>Si du code existe sans exigence d’origine, il s’agit de développement superflu ou de « Gold Plating » non approuvé.</em></li>\n' +
        '</ul>',
        box('astuce', 'L’audit automatisé de la RTM', 'lightbulb',
          '    <p>Dans un pipeline CI/CD moderne, un script analyse les identifiants présents dans les commits Git et les fichiers ' +
          'de test automatisés. Si une exigence obligatoire n’est reliée à aucun test passant, le déploiement en production est bloqué.</p>')
      ].join('\n')
    },
    {
      title: 'La spécification par l’exemple : BDD et syntaxe Gherkin',
      html: [
        '<p>Le <strong>Behavior-Driven Development (BDD)</strong> comble le fossé entre le langage métier et le code technique ' +
        'en formalisant les exigences sous la forme d’exemples concrets compréhensibles par tous. La syntaxe <strong>Gherkin</strong> ' +
        'structure chaque scénario :</p>',
        '<ul>\n' +
        '  <li><strong>Étant donné que (Given)</strong> : l’état initial du système ou le contexte préalable.</li>\n' +
        '  <li><strong>Quand (When)</strong> : l’action déclenchante réalisée par l’utilisateur ou un événement externe.</li>\n' +
        '  <li><strong>Alors (Then)</strong> : le résultat observable attendu et les changements d’état du système.</li>\n' +
        '  <li><strong>Et / Mais (And / But)</strong> : conjonctions permettant d’enchaîner des conditions supplémentaires.</li>\n' +
        '</ul>',
        '<pre class="code-preview"><code>Fonctionnalité: Connexion sécurisée\n' +
        '  Scénario: Authentification réussie avec identifiants valides\n' +
        '    Étant donné que l’utilisateur "alice@example.com" existe avec le mot de passe "Secret123!"\n' +
        '    Quand alice saisit son email et son mot de passe\n' +
        '    Et clique sur "Se connecter"\n' +
        '    Alors un jeton JWT valide est émis\n' +
        '    Et l’utilisateur est redirigé vers le tableau de bord</code></pre>'
      ].join('\n')
    }
  ],

  questions: [
    { stem: 'Quelle norme internationale définit la structure canonique de la spécification des exigences logicielles (SRS) ?', opts: ['ISO/IEC/IEEE 29148 (succédant à IEEE 830)', 'ISO 27001', 'RFC 2616'], correct: 0, exp: 'La norme ISO/IEC/IEEE 29148 formalise la structure et le contenu d’une SRS professionnelle.' },
    { stem: 'Dans une nomenclature d’exigence telle que « CRM-CLI-FR-042 », à quoi correspond le segment « FR » ?', opts: ['La catégorie de l’exigence (Functional Requirement)', 'La langue française', 'Le nom du développeur'], correct: 0, exp: 'FR identifie sans ambiguïté une exigence fonctionnelle au sein du module Client.' },
    { stem: 'Quel risque critique la traçabilité amont (Forward Traceability) permet-elle d’éviter ?', opts: ['L’oubli d’une exigence métier qui ne serait ni développée ni testée', 'L’achat de trop de licences bureautiques', 'Une hausse de la facture électrique'], correct: 0, exp: 'La traçabilité amont s’assure que 100 % des exigences contractuelles se traduisent par du code et des tests.' },
    { stem: 'Que désigne le phénomène de « Gold Plating » dans un projet logiciel ?', opts: ['L’ajout par les développeurs de fonctionnalités sophistiquées non demandées par le client', 'Le fait d’écrire les tests en premier', 'L’achat de matériel informatique haut de gamme'], correct: 0, exp: 'Le Gold Plating consiste à enrichir arbitrairement le produit avec des fonctions superflues sans validation du client.' },
    { stem: 'Dans la syntaxe Gherkin BDD, quel mot-clé décrit l’état initial ou le contexte du système ?', opts: ['Given (Étant donné que)', 'When (Quand)', 'Then (Alors)'], correct: 0, exp: 'Given pose les préconditions et le contexte avant que l’action ne survienne.' },
    { stem: 'Pourquoi la matrice de traçabilité des exigences (RTM) doit-elle être bidirectionnelle ?', opts: ['Pour vérifier à la fois la complétude de la couverture (amont) et l’absence de code superflu (aval)', 'Pour être imprimée en recto-verso', 'Pour fonctionner sous Windows et Linux'], correct: 0, exp: 'La bidirectionnalité garantit que rien d’essentiel n’est oublié et que rien d’inutile n’est développé.' },
    { stem: 'Quel mot-clé Gherkin exprime l’événement déclencheur ou l’action réalisée par l’utilisateur ?', opts: ['When (Quand)', 'Given (Étant donné)', 'Feature (Fonctionnalité)'], correct: 0, exp: 'When introduit le geste, l’événement ou l’appel déclenchant le comportement sous test.' },
    { stem: 'Quel outil permet d’exécuter automatiquement des scénarios Gherkin pour valider le code ?', opts: ['Cucumber / Behave', 'Photoshop', 'Apache Kafka'], correct: 0, exp: 'Cucumber (en JS/Java) ou Behave (en Python) automatisent l’exécution directe des fichiers de scénarios Gherkin.' }
  ],

  pitfalls: [
    'Rédiger un document SRS monolithique figé dans un PDF sans maintenir de traçabilité dynamique avec les tests.',
    'Changer la convention d’identifiant au milieu du projet, détruisant l’historique des versions et des liens de test.',
    'Tolérer des exigences orphelines sans aucun cas de test d’acceptation validé.',
    'Rédiger des scénarios Gherkin techniques qui décrivent le clic sur une balise HTML au lieu d’exprimer l’intention métier.',
    'Laisser les développeurs coder du Gold Plating sans vérifier la traçabilité aval vers une exigence approuvée.'
  ],

  methodTitle: 'Construire la chaîne de traçabilité d’un projet',
  method: [
    '<strong>Structurer le document SRS</strong> : organiser le cahier des charges selon les 3 parties de la norme ISO 29148.',
    '<strong>Attribuer des identifiants normés</strong> : appliquer le format <code>PROJET-MODULE-TYPE-NUM</code> à toute exigence.',
    '<strong>Rédiger les scénarios d’acceptation BDD</strong> : formaliser les tests en syntaxe Gherkin (Given/When/Then).',
    '<strong>Alimenter la matrice RTM</strong> : associer chaque exigence à son besoin source, sa User Story et ses cas de test.',
    '<strong>Auditer la couverture</strong> : traquer les cellules vides (exigences non testées) et les tests orphelins.'
  ],

  summary: [
    'La SRS (ISO 29148) constitue le contrat de référence entre la maîtrise d’ouvrage et les équipes de réalisation.',
    'La codification systématique (ex. BNK-AUTH-FR-001) garantit une traçabilité pérenne à travers le cycle de vie.',
    'La matrice RTM bidirectionnelle évite les exigences oubliées (amont) et le Gold Plating superflu (aval).',
    'Le Behavior-Driven Development (BDD) spécifie les comportements attendus sous forme d’exemples partagés.',
    'La syntaxe Gherkin (Given / When / Then) rend les critères d’acceptation directement exécutables par des outils comme Cucumber.'
  ],

  checklist: [
    'Je connais la structure en 3 parties d’une SRS selon la norme ISO 29148.',
    'Je sais générer et valider un identifiant d’exigence normé.',
    'Je sais construire et analyser une matrice de traçabilité RTM.',
    'Je comprends les dangers du Gold Plating pour le budget du projet.',
    'Je sais rédiger un scénario de test d’acceptation complet en syntaxe Gherkin.'
  ],

  notions: ['SRS', 'ISO 29148', 'Codification', 'RTM', 'Traçabilité amont', 'Traçabilité aval', 'Gold Plating', 'BDD', 'Gherkin'],

  mastery: [
    { cls: 'low', text: '&lt; 50 % — Révise la structure de la SRS et la composition de la matrice RTM.' },
    { cls: 'mid', text: '50–69 % — Entraîne-toi sur la nomenclature des exigences et la syntaxe Gherkin.' },
    { cls: 'good', text: '70–89 % — Solide : tu maîtrises la formalisation et la traçabilité des exigences.' },
    { cls: 'top', text: '≥ 95 % — Parfait : passe à la validation, gestion du changement et audit au chapitre 6.' }
  ],

  flashcards: [
    { q: 'Quels sont les 3 blocs principaux d’une SRS ISO 29148 ?', a: '1. Introduction & Contexte, 2. Description générale du produit, 3. Exigences spécifiques détaillées.' },
    { q: 'Quelle est la structure recommandée pour un identifiant d’exigence ?', a: '[PROJET]-[MODULE]-[TYPE]-[NUMÉRO] (ex. BNK-AUTH-FR-001).' },
    { q: 'Que mesure la traçabilité amont (Forward Traceability) ?', a: 'Elle vérifie que chaque exigence client est bien implémentée dans le code et couverte par un test.' },
    { q: 'Qu’est-ce que le « Gold Plating » ?', a: 'Le développement non approuvé de fonctionnalités superflues qui ne répondent à aucune exigence contractuelle.' },
    { q: 'Quels sont les trois mots-clés cardinaux d’un scénario Gherkin ?', a: 'Given (contexte initial), When (action déclenchante), Then (résultat attendu).' },
    { q: 'Quel est le bénéfice principal du BDD pour le client ?', a: 'Il valide le comportement attendu dans un langage naturel commun sans jargon technique.' }
  ],

  next: {
    href: 'chapitre6.html',
    label: 'Chapitre 6 : Validation, Gestion du Changement &amp; Audit'
  }
};

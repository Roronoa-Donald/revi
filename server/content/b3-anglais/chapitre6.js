/**
 * Chapitre 6 du cours « Anglais B3 ».
 */
'use strict';

const { box } = require('../../../scripts/course-kit');

module.exports = {
  n: 6,
  title: 'Présentations Techniques, Pitching &amp; Carrière Internationale',
  short: 'Présentations, Pitch &amp; Carrière',
  toc: 'Architecture d’une présentation technique anglophone (de 1 minute à 10 minutes, accroche en 10 secondes, problème, solution architecturale, démonstration et conclusion), balisage verbal de transition (signposting et gestion des questions-réponses Q&A), et préparation aux entretiens d’embauche internationaux (méthode STAR et optimisation des CV pour les filtres ATS).',
  time: '≈ 2 h 45 de travail',
  free: false,
  situation: 'Que ce soit lors de la soutenance finale d’un projet de Bachelor, d’une conférence technologique internationale (KubeCon, AWS Summit) ou d’un entretien de recrutement technique pour une multinationale, l’ingénieur doit convaincre un jury ou un recruteur anglophone en quelques minutes. Une élocution hésitante, l’absence de plan annoncé, un manque de connecteurs logiques (signposts) ou une réponse d’entretien floue sans résultats chiffrés éliminent immédiatement un candidat pourtant techniquement compétent. Ce dernier module transmet les techniques de captation d’audience, la rhétorique professionnelle et la méthode comportementale STAR indispensables pour réussir à l’international.',
  objectives: [
    'structurer une présentation technique en anglais selon le modèle Hook, Problem, Solution, Demo, Conclusion ;',
    'captiver l’audience dès les 10 premières secondes avec une accroche percutante (chiffre choc, question rhétorique ou scénario d’échec) ;',
    'baliser son discours avec les locutions de transition normalisées (Signposting : Starting, Outlining, Transitioning, Concluding, Q&A) ;',
    'structurer des réponses d’entretiens d’embauche percutantes avec la méthode STAR (Situation, Task, Action, Result) incluant des métriques d’impact quantifiées ;',
    'optimiser un curriculum vitæ technique pour les robots de tri ATS en valorisant les verbes d’action à fort impact (power action verbs) ;',
    'développer en Python 3 des linters de structure STAR, des auditeurs de signposting et des analyseurs de CV automatisés.'
  ],
  sections: [
    {
      title: 'Architecture d’une Présentation Technique &amp; Captation d’Audience',
      html: [
        '<p>Dans une présentation technique internationale (qu’il s’agisse d’un pitch de 1 minute ou d’une soutenance approfondie de 10 minutes), chaque seconde doit servir la démonstration :</p>',
        '<div class="grid grid-2">',
        '  <div class="card">',
        '    <h4>La Structure en 5 Étapes du Pitch Technique</h4>',
        '    <ol>',
        '      <li><strong>1. Hook (Accroche — 10 secondes) :</strong> Captiver l’attention par un fait saillant : <i>"Have you ever wondered how Netflix streams 4K video to 200 million users with zero latency?"</i> ou <i>"Last Black Friday, our checkout API went down for 42 minutes, costing $150,000."</i></li>',
        '      <li><strong>2. Problem Statement :</strong> Expliciter la douleur métier ou le goulet d’étranglement technique rencontré.</li>',
        '      <li><strong>3. Architectural Solution :</strong> Présenter le schéma fonctionnel, les briques technologiques choisies et les compromis de conception (trade-offs).</li>',
        '      <li><strong>4. Demo or Proof of Concept :</strong> Montrer le code, le benchmark comparatif ou le prototype en fonctionnement.</li>',
        '      <li><strong>5. Conclusion &amp; Call to Action :</strong> Résumer l’impact chiffré et ouvrir la discussion.</li>',
        '    </ol>',
        '  </div>',
        '  <div class="card">',
        '    <h4>Gestion du Débit &amp; Langage Corporel Vocal</h4>',
        '    <ul>',
        '      <li><strong>Rythme &amp; Pauses :</strong> Marquer un silence délibéré de 2 secondes après une phrase clé pour laisser l’auditoire assimiler l’information. Ne pas meubler les silences par des tics de langage (<i>"um", "uh", "you know"</i>).</li>',
        '      <li><strong>Intonation :</strong> Baisser l’intonation en fin de phrase pour affirmer une certitude technique ; la monter uniquement pour poser une question.</li>',
        '      <li><strong>Support visuel épuré :</strong> Diapositives minimalistes avec un seul schéma ou une seule métrique par slide. Ne jamais lire ses diapositives.</li>',
        '    </ul>',
        '  </div>',
        '</div>'
      ].join('\n')
    },
    {
      title: 'Balisage Verbal (Signposting) &amp; Maîtrise des Questions-Réponses (Q&amp;A)',
      html: [
        '<p>Les « signposts » sont les panneaux de signalisation verbaux indispensables pour guider l’auditeur à travers la logique de votre raisonnement :</p>',
        '<table class="table">',
        '  <thead><tr><th>Fonction du Balisage</th><th>Locutions Anglophones Recommandées</th><th>Exemple d’Utilisation en Conférence</th></tr></thead>',
        '  <tbody>',
        '    <tr><td><strong>Starting (Introduction)</strong></td><td><i>"Today, I’d like to talk about...", "The purpose of this talk is to..."</i></td><td><i>"Today, I will present our distributed logging architecture built on OpenTelemetry."</i></td></tr>',
        '    <tr><td><strong>Outlining (Annonce du plan)</strong></td><td><i>"I have divided my presentation into three parts...", "Firstly, we examine..."</i></td><td><i>"I have divided my talk into three sections: the storage bottleneck, the Kafka pipeline, and latency metrics."</i></td></tr>',
        '    <tr><td><strong>Transitioning (Passage d’étape)</strong></td><td><i>"Moving on to...", "Turning now to...", "Let’s pivot to..."</i></td><td><i>"Moving on to our caching strategy, let’s inspect how Redis cluster sharding solved our throughput issue."</i></td></tr>',
        '    <tr><td><strong>Concluding (Synthèse)</strong></td><td><i>"To sum up...", "In conclusion...", "To wrap up..."</i></td><td><i>"To wrap up, migrating from polling to WebSockets cut server CPU utilization by 40%."</i></td></tr>',
        '    <tr><td><strong>Handling Q&amp;A (Questions)</strong></td><td><i>"That’s a great question.", "If I understand correctly, you are asking if..."</i></td><td><i>"That’s a great question regarding cold starts. In our benchmarks, provisioned concurrency reduced P99 latency to 15ms."</i></td></tr>',
        '  </tbody>',
        '</table>'
      ].join('\n')
    },
    {
      title: 'Entretiens d’Embauche Internationaux : La Méthode STAR &amp; Filtres ATS',
      html: [
        '<p>Dans les entretiens techniques en langue anglaise (FAANG, cabinets de conseil, scale-ups), la réponse aux questions comportementales (<i>Behavioral Questions</i>) obéit à la rigueur de la méthode STAR :</p>',
        '<div class="grid grid-2">',
        '  <div class="card">',
        '    <h4>Les Quatre Piliers du Modèle STAR</h4>',
        '    <ul>',
        '      <li><strong>S — Situation :</strong> Posez le contexte initial en deux phrases (rôle, entreprise, enjeu).</li>',
        '      <li><strong>T — Task :</strong> Définissez la mission précise et le défi technique qui vous incombait directement.</li>',
        '      <li><strong>A — Action :</strong> Détaillez <em>vos</em> réalisations concrètes en employant le pronom personnel « I » et des verbes d’action puissants (<i>"I architected", "I refactored", "I deployed"</i>). Évitez le flou du « we ».</li>',
        '      <li><strong>R — Result :</strong> Concluez par un impact quantifié, chiffré et mesurable (pourcentage de gain de performance, économies de coûts, réduction du temps de build).</li>',
        '    </ul>',
        '  </div>',
        '  <div class="card">',
        '    <h4>Verbes d’Action Puissants (Power Verbs) pour CV &amp; ATS</h4>',
        '    <ul>',
        '      <li><strong>Verbes forts valorisés :</strong> <code>Architected</code>, <code>Engineered</code>, <code>Spearheaded</code>, <code>Optimized</code>, <code>Automated</code>, <code>Scaled</code>, <code>Implemented</code>, <code>Streamlined</code>.</li>',
        '      <li><strong>Verbes passifs pénalisés :</strong> <i>Worked on</i>, <i>Helped with</i>, <i>Assisted</i>, <i>Responsible for</i>, <i>Did</i>, <i>Tried to</i>.</li>',
        '      <li><strong>Optimisation ATS :</strong> Intégrer les mots-clés exacts de l’offre d’emploi (ex. Kubernetes, Terraform, CI/CD, Prometheus) dans les puces d’expérience pour maximiser le score de parsing automatisé.</li>',
        '    </ul>',
        '  </div>',
        '</div>'
      ].join('\n')
    }
  ],
  method: [
    'Concevoir une accroche (Hook) percutante de 10 secondes sous forme de paradoxe, statistique choc ou question rhétorique.',
    'Structurer rigoureusement le pitch en cinq temps : Accroche, Problème, Solution, Démo/Preuve, Conclusion.',
    'Insérer des connecteurs de signposting explicites (Starting, Outlining, Transition, Concluding) pour baliser le discours.',
    'Répondre aux questions de recrutement technique en respectant scrupuleusement les 4 étapes STAR (Situation, Task, Action, Result).',
    'Bannir les verbes d’action passifs sur son CV et intégrer la densité de mots-clés techniques ciblés par les robots ATS.'
  ],
  summary: [
    'Une présentation technique réussie démarre par une accroche captivante et évite de noyer l’auditoire sous des diapositives textuelles.',
    'Le signposting verbal guide l’auditeur et confère une structure professionnelle aux conférences et soutenances.',
    'La gestion des silences de 2 secondes renforce l’autorité de l’orateur et élimine les tics verbaux (um, uh).',
    'La méthode STAR prouve les compétences comportementales en attribuant les réalisations au candidat (pronom I) et en quantifiant l’impact.',
    'Les systèmes ATS privilégient les verbes d’action forts (engineered, architected) et le matching précis des technologies requises.'
  ],
  checklist: [
    'Mon exposé débute-t-il par un Hook accrocheur sans formules de politesse préliminaires interminables ?',
    'Ai-je employé au moins trois catégories de signposting (Starting, Outlining, Transition, Concluding) ?',
    'Ma réponse STAR détaille-t-elle mes actions personnelles (« I ») et non seulement le travail de l’équipe ?',
    'Le résultat de ma réponse STAR contient-il une métrique chiffrée (-X% latence, +Y% uptime) ?',
    'Mon CV anglophone remplace-t-il les « worked on » par des verbes d’action d’impact ?'
  ],
  notions: [
    'Structure du pitch technique (Hook, Problem, Solution, Demo, Conclusion)',
    'Captation d’audience et gestion du silence',
    'Balisage verbal de transition (Signposting)',
    'Gestion courtoise de la séance de questions-réponses (Q&A)',
    'Méthode comportementale STAR d’entretien',
    'Appropriation de l’Action (Pronom « I » vs « We »)',
    'Métriques d’impact quantifiées (Result)',
    'Power Action Verbs & Optimisation ATS de CV'
  ],
  pitfalls: [
    'Débuter une présentation par des banalités ou des excuses techniques au lieu d’un Hook percutant.',
    'Enchaîner les diapositives sans connecteurs logiques verbaux, désorientant l’auditoire.',
    'Donner une réponse d’entretien sans aucun résultat chiffré, réduisant l’impact de la démonstration.',
    'Utiliser le pronom « We » tout au long de la section Action, empêchant le recruteur de mesurer votre rôle exact.'
  ],
  questions: [
    {
      stem: 'Dans une présentation technique en anglais, quelle est la fonction primordiale du « Hook » (Accroche) dans les 10 premières secondes ?',
      opts: [
        'Épeler son nom de famille pour vérifier le microphone.',
        'Capter immédiatement l’attention et la curiosité de l’auditoire avec un fait saillant, un chiffre marquant ou un paradoxe technique.',
        'Lire l’intégralité des clauses de non-responsabilité juridique.',
        'Expliquer le fonctionnement du projecteur HDMI.'
      ],
      correct: 1,
      exp: 'Le Hook capte immédiatement l’attention du jury ou des auditeurs avant d’entrer dans le corps technique de la présentation.'
    },
    {
      stem: 'Que désignent les termes de « Signposting » en communication orale internationale ?',
      opts: [
        'Des panneaux de signalisation routière installés autour du centre de conférence.',
        'Des expressions et connecteurs verbaux (« Moving on to », « In conclusion ») indiquant à l’auditoire où l’on se trouve dans le plan de l’exposé.',
        'Des signatures électroniques chiffrées apposées sur les diapositives.',
        'Des logiciels de suivi des clics de souris pendant la démonstration.'
      ],
      correct: 1,
      exp: 'Le signposting représente le balisage discursif permettant aux auditeurs de suivre aisément la progression de la pensée de l’orateur.'
    },
    {
      stem: 'Dans la méthode STAR d’entretien d’embauche technique, que signifie la lettre « R » ?',
      opts: [
        'Reputation',
        'Result (Résultat mesurable et quantifié)',
        'Requirement',
        'Review'
      ],
      correct: 1,
      exp: 'La lettre R désigne le Résultat (Result), qui doit impérativement comporter une métrique d’impact chiffrée (ex: -30% de latence, +99.99% d’uptime).'
    },
    {
      stem: 'Pourquoi l’emploi exclusif du pronom « We » est-il déconseillé dans la section Action de la méthode STAR ?',
      opts: [
        'Parce que le mot « We » est interdit par la grammaire anglaise formelle.',
        'Parce que le recruteur a besoin d’évaluer votre contribution personnelle précise (« I designed », « I implemented ») plutôt que celle de l’équipe entière.',
        'Parce que cela donne l’impression que vous travaillez seul.',
        'Parce que les robots ATS suppriment les phrases contenant le mot « We ».'
      ],
      correct: 1,
      exp: 'Le recruteur évalue votre valeur ajoutée individuelle ; l’emploi du « I » avec des verbes forts met en valeur votre leadership et vos réalisations.'
    },
    {
      stem: 'Parmi les verbes suivants, lequel est considéré comme un « Power Action Verb » valorisé par les systèmes ATS sur un CV technique ?',
      opts: [
        'Helped with',
        'Architected',
        'Worked on',
        'Was responsible for'
      ],
      correct: 1,
      exp: '« Architected » (comme « Engineered », « Spearheaded », « Optimized ») est un verbe d’action à fort impact démontrant une expertise de conception de haut niveau.'
    },
    {
      stem: 'Quelle expression anglophone est la plus adaptée pour introduire une phase de questions-réponses à l’issue d’une soutenance ?',
      opts: [
        'I am finished, go away.',
        'Thank you for your attention, I would now be glad to take any questions.',
        'Please do not ask me difficult things.',
        'That is the end of my talking.'
      ],
      correct: 1,
      exp: '« Thank you for your attention, I would now be glad to take any questions » est la formule de clôture élégante et professionnelle par excellence.'
    },
    {
      stem: 'Face à une question agressive ou complexe posée par un membre du jury, comment un ingénieur doit-il débuter sa réponse ?',
      opts: [
        'En répliquant que la question n’a aucun sens.',
        'En accusant le jury de ne pas avoir écouté.',
        'En reformulant calmement la question : « That’s a great question. If I understand correctly, you are asking about... »',
        'En quittant la pièce sans répondre.'
      ],
      correct: 2,
      exp: 'Valider la pertinence de la question et la reformuler permet de s’assurer de sa bonne compréhension et de structurer calmement sa réponse.'
    },
    {
      stem: 'Dans un pitch technique en 1 minute, quel élément garantit que la présentation ne soit pas qu’un discours abstrait ?',
      opts: [
        'Afficher un texte de mille mots en petite police sur une seule diapositive.',
        'Citer un résultat d’expérimentation ou une métrique concrète de preuve de concept (Proof of Concept).',
        'Parler deux fois plus vite pour faire tenir plus de contenu.',
        'Réciter l’alphabet phonétique de l’OTAN.'
      ],
      correct: 1,
      exp: 'Une métrique chiffrée ou un résultat concret ancre le pitch dans la réalité technique et confère une crédibilité immédiate à la solution.'
    }
  ],
  flashcards: [
    {
      q: 'Quelle est la durée idéale d’un « Hook » au début d’une présentation technique ?',
      a: 'Environ 10 secondes : une question percutante, une statistique marquante ou un scénario d’échec réel pour captiver l’auditoire.'
    },
    {
      q: 'Quelles sont les 4 catégories fondamentales de connecteurs de « Signposting » ?',
      a: 'Starting (introduction), Outlining (annonce du plan), Transitioning (changement de section) et Concluding / Q&A (synthèse et questions).'
    },
    {
      q: 'Que signifient les lettres de la méthode STAR d’entretien ?',
      a: 'Situation (contexte), Task (mission/défi), Action (actions personnelles menées avec « I ») et Result (résultat chiffré et mesurable).'
    },
    {
      q: 'Citez 4 « Power Action Verbs » recommandés sur un CV d’ingénieur anglophone.',
      a: 'Architected, Engineered, Optimized, Spearheaded (au lieu de worked on, helped with, was responsible for).'
    },
    {
      q: 'Comment gère-t-on le silence et les pauses lors d’une soutenance en anglais ?',
      a: 'Marquer délibérément 2 secondes de silence après un point clé pour laisser le jury assimiler, en bannissant les tics de remplissage (« um », « uh »).'
    },
    {
      q: 'Comment introduire poliment une réponse à une question technique lors du Q&A ?',
      a: '« That’s a great question. If I understand correctly, you are asking about [topic]... »'
    }
  ],
  mastery: [
    {
      cls: 'low',
      text: 'Difficultés à capter l’attention en soutenance ou réponses d’entretien sans prise de responsabilité personnelle.'
    },
    {
      cls: 'medium',
      text: 'Bonne fluidité de présentation, emploi des connecteurs de signposting et réponses STAR bien articulées.'
    },
    {
      cls: 'high',
      text: 'Prestation remarquable à l’international : pitch captivant, rhétorique impeccable, maîtrise de la méthode STAR et CV optimisé ATS.'
    }
  ]
};

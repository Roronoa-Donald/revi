/**
 * Module 4 — Programmation du Plan d'Appel (Dialplan & SVI/IVR)
 * Cours « Téléphonie VoIP B3 »
 */
'use strict';

module.exports = {
  n: 4,
  title: 'Programmation du Plan d\'Appel (Dialplan & SVI/IVR)',
  short: 'Dialplan & SVI / IVR',
  toc: 'Syntaxe et structure d\'extensions.conf, contextes, extensions et priorités, applications natives Asterisk (Answer, Playback, Dial, VoiceMail, Hangup), masques de numérotation par expressions régulières (_X, _Z, _N, _7XXXXXXXX), variables de canaux, conception d\'arborescences SVI (menus vocaux DTMF) et routage conditionnel.',
  time: '≈ 2 h 45',
  free: false,

  situation:
    'Le standard téléphonique de l\'entreprise sature d\'appels mal orientés et les collaborateurs réclament une refonte complète du plan de numérotation. ' +
    'En tant qu\'ingénieur VoIP, vous êtes chargé de concevoir et programmer le Dialplan dans /etc/asterisk/extensions.conf : ' +
    'ordonnancer les règles d\'appel par contextes étanches et priorités séquentielles, optimiser les règles de routage interne grâce aux masques ' +
    'de numérotation (Pattern Matching _7XXXXXXXX) et variables de canaux (${EXTEN}), et programmer un Serveur Vocal Interactif (SVI/IVR) ' +
    'multi-niveaux accueillant les clients avec reconnaissance des touches DTMF et gestion des timeouts et erreurs de saisie.',

  objectives: [
    'Maîtriser la syntaxe et la structure des contextes, extensions et priorités dans le fichier extensions.conf.',
    'Employer les applications fondamentales du Dialplan Asterisk : Answer(), Playback(), Background(), WaitExten(), Dial(), VoiceMail() et Hangup().',
    'Concevoir des règles de routage condensées et évolutives avec les masques de numérotation (_X, _Z, _N) et les variables de canaux (${EXTEN}, ${CALLERID(num)}).',
    'Programmer un serveur vocal interactif (SVI/IVR) avec arborescence DTMF, extensions spéciales de secours (t pour Timeout, i pour Invalid) et renvoi sur messagerie.'
  ],

  sections: [
    {
      title: 'Syntaxe & Structure du Dialplan Asterisk (extensions.conf)',
      html: [
        '<p>Le <strong>Dialplan (plan de numérotation)</strong> est le cerveau d\'un serveur Asterisk. Configuré dans le fichier <code>/etc/asterisk/extensions.conf</code>, il dicte avec une précision absolue la séquence des actions exécutées dès qu\'un utilisateur décroche son combiné ou compose un numéro.</p>',
        '<p>Le Dialplan est structuré en <strong>contextes</strong> (sections entre crochets, ex: <code>[work]</code>, <code>[interne]</code>, <code>[sortant]</code>). Cette segmentation assure l\'étanchéité des droits : un utilisateur ne peut composer que les numéros programmés dans son contexte ou dans les contextes explicitement inclus par la directive <code>include => nom_contexte</code>.</p>',
        '<div class="card">',
        '  <h4>Syntaxe Fondamentale d\'une Instruction de Dialplan</h4>',
        '  <p>Chaque ligne d\'instruction respecte rigoureusement la syntaxe :</p>',
        '  <pre><code>exten => extension,priorite,Application(arguments)</code></pre>',
        '  <ul>',
        '    <li><code>extension :</code> Numéro composé ou motif déclencheur (ex: <code>101</code>, <code>600</code>, <code>_7XXXX</code>, ou extension spéciale <code>s</code> pour <em>start</em>).</li>',
        '    <li><code>priorite :</code> Ordre séquentiel d\'exécution, débutant par <code>1</code>, puis incrémenté avec <code>2</code>, <code>3</code>... ou le mot-clé <code>n</code> (<em>next</em>).</li>',
        '    <li><code>Application :</code> Commande logicielle interne à exécuter avec ses arguments entre parenthèses.</li>',
        '  </ul>',
        '</div>',
        '<div class="card">',
        '  <h4>Catalogue des Applications Clés du Dialplan</h4>',
        '  <table class="table">',
        '    <thead><tr><th>Application</th><th>Rôle Opérationnel</th><th>Exemple d\'Utilisation</th></tr></thead>',
        '    <tbody>',
        '      <tr><td><code>Answer()</code></td><td>Décroche la ligne (envoie un 200 OK à l\'appelant).</td><td><code>exten => 600,1,Answer()</code></td></tr>',
        '      <tr><td><code>Playback(fichier)</code></td><td>Joue un fichier sonore sans écouter les touches DTMF.</td><td><code>exten => 600,n,Playback(tt-weasels)</code></td></tr>',
        '      <tr><td><code>Background(fichier)</code></td><td>Joue un fichier sonore en écoutant les touches DTMF du menu.</td><td><code>exten => s,n,Background(menu-acceuil)</code></td></tr>',
        '      <tr><td><code>WaitExten(secondes)</code></td><td>Attend une saisie utilisateur pendant un délai défini.</td><td><code>exten => s,n,WaitExten(5)</code></td></tr>',
        '      <tr><td><code>Dial(techno/cible,sec,opts)</code></td><td>Fait sonner un ou plusieurs terminaux pendant un temps imparti.</td><td><code>exten => 101,n,Dial(SIP/101,20)</code></td></tr>',
        '      <tr><td><code>VoiceMail(box@contexte,opts)</code></td><td>Redirige l\'appel vers la boîte vocale spécifiée.</td><td><code>exten => 101,n,VoiceMail(101@work,u)</code></td></tr>',
        '      <tr><td><code>Goto(contexte,exten,prio)</code></td><td>Saute inconditionnellement vers un autre point du Dialplan.</td><td><code>exten => 101,n,Goto(accueil,s,1)</code></td></tr>',
        '      <tr><td><code>Hangup()</code></td><td>Raccroche la communication (envoie un BYE).</td><td><code>exten => h,1,Hangup()</code></td></tr>',
        '    </tbody>',
        '  </table>',
        '</div>'
      ].join('\n')
    },
    {
      title: 'Masques de Numérotation (Pattern Matching) & Variables de Canaux',
      html: [
        '<p>Dans une entreprise comptant des centaines ou des milliers de postes, il serait impossible d\'écrire une règle d\'extension distincte par numéro. Asterisk introduit les <strong>motifs de numérotation (Pattern Matching)</strong> qui débutent obligatoirement par un caractère souligné <code>_</code> :</p>',
        '<div class="card">',
        '  <h4>Symboles de Correspondance de Motifs Asterisk</h4>',
        '  <ul>',
        '    <li><code>X</code> : Correspond à n\'importe quel chiffre entre <code>0</code> et <code>9</code>.</li>',
        '    <li><code>Z</code> : Correspond à n\'importe quel chiffre entre <code>1</code> et <code>9</code> (chiffre non nul).</li>',
        '    <li><code>N</code> : Correspond à n\'importe quel chiffre entre <code>2</code> et <code>9</code>.</li>',
        '    <li><code>[1357]</code> : Correspond à l\'un quelconque des chiffres énumérés entre crochets.</li>',
        '    <li><code>.</code> (point) : Joker correspondant à un ou plusieurs caractères quelconques (utilisé pour les appels sortants de longueur variable).</li>',
        '    <li><code>!</code> (point d\'exclamation) : Joker correspondant à zéro ou plusieurs caractères.</li>',
        '  </ul>',
        '</div>',
        '<div class="card">',
        '  <h4>Exemple Concret : Le Dialplan du Support de Cours</h4>',
        '  <p>Dans le document de M. Pape Moussa SONKO, la règle de routage interne entre collaborateurs est formulée ainsi :</p>',
        '  <pre><code>[work]\nexten => _7XXXXXXXX,1,Dial(SIP/${EXTEN},10)\nexten => _7XXXXXXXX,2,VoiceMail(${EXTEN}@work)\nexten => _7XXXXXXXX,3,Hangup()</code></pre>',
        '  <p>Analyse détaillée :</p>',
        '  <ul>',
        '    <li>Le motif <code>_7XXXXXXXX</code> intercepte tous les numéros à 9 chiffres débutant par 7 (de <code>700000000</code> à <code>799999999</code>).</li>',
        '    <li>La variable spéciale <code>${EXTEN}</code> contient la chaîne exacte du numéro composé par l\'utilisateur (ex: <code>706438029</code>).</li>',
        '    <li><code>Dial(SIP/${EXTEN},10)</code> tente de joindre le poste pendant 10 secondes. Si l\'appelé ne décroche pas, l\'exécution passe à la priorité 2, basculant automatiquement l\'appel vers la boîte vocale correspondante.</li>',
        '  </ul>',
        '</div>'
      ].join('\n')
    },
    {
      title: 'Conception de Serveurs Vocaux Interactifs (SVI / IVR) & Messagerie',
      html: [
        '<p>Un <strong>Serveur Vocal Interactif (SVI ou IVR - Interactive Voice Response)</strong> accueille les appelants externes avec un message préenregistré et les aiguille vers le service approprié selon les touches DTMF pressées sur leur clavier téléphonique.</p>',
        '<div class="card">',
        '  <h4>Architecture Type d\'un SVI d\'Entreprise</h4>',
        '  <pre><code>[menu-principal]\nexten => s,1,Answer()\nexten => s,n,Background(bienvenue-accueil)  ; "Tapez 1 pour le commercial, 2 pour le support..."\nexten => s,n,WaitExten(5)                 ; Attend 5 secondes de saisie\n\n; Choix 1 : Service Commercial\nexten => 1,1,Playback(transfert-commercial)\nexten => 1,n,Dial(SIP/201&amp;SIP/202,20)\nexten => 1,n,Hangup()\n\n; Choix 2 : Support Technique\nexten => 2,1,Playback(transfert-support)\nexten => 2,n,Queue(support-technique)\nexten => 2,n,Hangup()\n\n; Extensions spéciales de gestion d\'erreurs :\nexten => t,1,Playback(delai-depasse)     ; Timeout (aucune touche)\nexten => t,n,Goto(s,2)\n\nexten => i,1,Playback(touche-invalide)    ; Invalid (touche inconnue)\nexten => i,n,Goto(s,2)</code></pre>',
        '  <p>Les deux extensions spéciales indispensables sont :</p>',
        '  <ul>',
        '    <li><code>t</code> (Timeout) : Déclenchée si l\'appelant n\'a pressé aucune touche avant la fin du délai imparti par <code>WaitExten()</code>.</li>',
        '    <li><code>i</code> (Invalid) : Déclenchée si l\'utilisateur presse une touche non déclarée dans le contexte (ex: touche 7 ou #).</li>',
        '  </ul>',
        '</div>'
      ].join('\n')
    }
  ],

  methodTitle: 'Démarche d’Ingénierie : Conception & Test de Dialplan Asterisk',
  method: [
    'Segmenter les contextes d\'appels : séparer rigoureusement les contextes internes sécurisés ([interne], [work]) du contexte d\'accueil public ([from-trunk], [svi]) pour interdire les rebonds d\'appels frauduleux.',
    'Construire des motifs de numérotation précis : utiliser _X, _Z et _N pour contraindre les longueurs de numéros et éviter les jokers ouverts (. ou !) qui créent des failles de routage.',
    'Implémenter des mécanismes de repli (Fallback) : prévoir systématiquement une gestion de non-réponse (timeout Dial vers VoiceMail) et des extensions spéciales t (timeout) et i (invalide).',
    'Recharger et tester le Dialplan : exécuter dialplan reload dans la console Asterisk et simuler des appels pour valider l\'arborescence étape par étape.'
  ],

  summary: [
    'Le Dialplan dans extensions.conf définit l\'ensemble des règles de routage et des logiques d\'appels du système téléphonique.',
    'Une instruction de dialplan associe une extension, une priorité séquentielle (1, 2... ou n) et une application système (Answer, Playback, Dial, VoiceMail, Hangup).',
    'Les motifs débutent par un souligné _ et utilisent des méta-caractères : X (0-9), Z (1-9), N (2-9), . (un ou plusieurs caractères).',
    'La variable dynamique ${EXTEN} capture le numéro composé et permet d\'écrire des règles génériques pour des centaines d\'utilisateurs.',
    'Un SVI utilise Background() et WaitExten() pour orienter l\'appelant selon ses choix DTMF, avec gestion obligatoire des extensions d\'erreurs t et i.'
  ],

  checklist: [
    'Connaissez-vous la syntaxe exacte d\'une ligne d\'instruction exten => extension,priorite,Application(arguments) ?',
    'Savez-vous expliquer la différence entre l\'application Playback() et l\'application Background() ?',
    'Que signifie le motif _7XXXXXXXX et quels numéros intercepte-t-il exactement ?',
    'À quoi correspondent les extensions spéciales s, t et i dans un contexte Asterisk ?',
    'Comment utilise-t-on la variable ${EXTEN} pour router dynamiquement un appel sans dupliquer les règles ?'
  ],

  notions: [
    { term: 'Dialplan', def: 'Plan de numérotation d\'Asterisk programmé dans extensions.conf régissant l\'acheminement de tous les flux téléphoniques.' },
    { term: 'Contexte', def: 'Conteneur étanche regroupant un jeu d\'extensions spécifiques pour segmenter les droits des utilisateurs.' },
    { term: 'Priorité', def: 'Numéro d\'ordre séquentiel d\'une instruction dans une extension (1, 2, n).' },
    { term: 'Pattern Matching', def: 'Filtrage d\'extensions par motifs réguliers (_X, _Z, _N) pour factoriser les règles d\'appel.' },
    { term: 'SVI / IVR', def: 'Serveur Vocal Interactif guidant les appelants par messages vocaux et saisies de touches DTMF.' },
    { term: 'Extension spéciale s', def: 'Extension Start par défaut exécutée lorsqu\'aucun numéro particulier n\'est transmis (ex: ligne analogique ou SVI).' }
  ],

  pitfalls: [
    'Utiliser le joker point (.) sans contrainte de préfixe (ex: exten => _.,1,...), ce qui intercepte accidentellement les extensions spéciales s, t et h.',
    'Oublier l\'extension de gestion d\'erreur i (invalid) dans un SVI, provoquant un raccrochage brutal si l\'utilisateur presse une mauvaise touche.',
    'Ne pas mettre d\'instruction Hangup() à la fin d\'un scénario, laissant le canal ouvert et consommant inutilement des ressources serveur.',
    'Ne pas recharger le dialplan via la commande dialplan reload dans la CLI Asterisk après modification du fichier extensions.conf.'
  ],

  questions: [
    {
      stem: 'Dans Asterisk, quelle application du Dialplan permet de diffuser un fichier audio tout en écoutant activement les touches DTMF pressées par l\'appelant ?',
      opts: ['Playback()', 'Background()', 'Echo()', 'Record()'],
      correct: 1,
      exp: 'Background() joue le message audio tout en restant à l\'écoute des touches DTMF de l\'utilisateur (indispensable pour les SVI), contrairement à Playback() qui bloque l\'écoute.'
    },
    {
      stem: 'Que désigne le méta-caractère N dans un motif de numérotation Asterisk (ex: _NXX) ?',
      opts: ['N\'importe quel chiffre de 0 à 9', 'N\'importe quel chiffre de 1 à 9', 'N\'importe quel chiffre de 2 à 9', 'N\'importe quelle lettre de l\'alphabet'],
      correct: 2,
      exp: 'Dans la convention Asterisk, X correspond à 0-9, Z à 1-9, et N correspond aux chiffres compris entre 2 et 9.'
    },
    {
      stem: 'Quelle variable de canal contient la valeur exacte de l\'extension ou du numéro de téléphone composé par l\'appelant ?',
      opts: ['${CALLERID(num)}', '${EXTEN}', '${CHANNEL}', '${DIALSTATUS}'],
      correct: 1,
      exp: '${EXTEN} est la variable interne qui stocke la chaîne de caractères de l\'extension appelée (ex: 706438029).'
    },
    {
      stem: 'Dans un Serveur Vocal Interactif (SVI), quelle extension spéciale est automatiquement déclenchée lorsqu\'un appelant n\'appuie sur aucune touche pendant le délai d\'attente imparti ?',
      opts: ['Extension s', 'Extension t', 'Extension i', 'Extension h'],
      correct: 1,
      exp: 'L\'extension t (Timeout) est exécutée lorsque le délai d\'attente de saisie fixé par WaitExten() expire sans action de l\'appelant.'
    },
    {
      stem: 'Quelle instruction de dialplan permet de tenter de joindre le poste SIP/101 pendant 15 secondes avant de poursuivre la séquence ?',
      opts: ['exten => 101,1,Call(101,15)', 'exten => 101,1,Dial(SIP/101,15)', 'exten => 101,1,Ring(SIP/101,15)', 'exten => 101,1,Connect(SIP/101)'],
      correct: 1,
      exp: 'L\'application Dial prend comme premier argument la technologie et la cible (SIP/101), et en second argument le timeout en secondes (15).'
    },
    {
      stem: 'Que se passe-t-il si un motif de numérotation est écrit sans le caractère souligné initial _ dans extensions.conf (ex: 7XXXXXXXX) ?',
      opts: ['Asterisk génère une erreur de syntaxe fatale', 'Asterisk considère le motif comme une extension littérale exacte "7XXXXXXXX" et non comme un masque générique', 'Asterisk ajoute automatiquement le souligné', 'L\'appel est redirigé vers la messagerie vocale'],
      correct: 1,
      exp: 'Sans le souligné _ au début, Asterisk interprète la chaîne comme le nom littéral exact de l\'extension, et le pattern matching ne s\'applique pas.'
    },
    {
      stem: 'Quelle extension spéciale est appelée par Asterisk dès qu\'une communication est terminée ou qu\'un correspondant raccroche la ligne ?',
      opts: ['Extension h', 'Extension e', 'Extension b', 'Extension q'],
      correct: 0,
      exp: 'L\'extension h (Hangup) est systématiquement exécutée lors de la libération du canal pour effectuer des opérations de clôture ou d\'audit.'
    },
    {
      stem: 'Quelle directive permet d\'intégrer l\'intégralité des extensions d\'un contexte nommé [interne] à l\'intérieur d\'un autre contexte [direction] ?',
      opts: ['import => interne', 'include => interne', 'inherit => interne', 'link => interne'],
      correct: 1,
      exp: 'La directive include => nom_contexte permet d\'inclure un contexte dans un autre, facilitant la composition modulaire des droits.'
    }
  ],

  flashcards: [
    {
      q: 'Quelle est la syntaxe d\'une ligne de Dialplan dans extensions.conf ?',
      a: 'exten => extension,priorite,Application(arguments)'
    },
    {
      q: 'Quelle est la différence entre Playback() et Background() ?',
      a: 'Playback() joue le son sans écouter les touches ; Background() joue le son tout en interceptant les touches DTMF (pour les SVI).'
    },
    {
      q: 'Que signifient les symboles X, Z et N dans les masques Asterisk ?',
      a: 'X = chiffres 0 à 9, Z = chiffres 1 à 9, N = chiffres 2 à 9.'
    },
    {
      q: 'À quoi sert la variable ${EXTEN} ?',
      a: 'Elle contient le numéro composé par l\'appelant, permettant de mutualiser une seule règle pour tout un plan de numérotation.'
    },
    {
      q: 'Quels sont les rôles des extensions spéciales s, t, i et h ?',
      a: 's = start (démarrage), t = timeout (délai dépassé), i = invalid (touche invalide), h = hangup (raccroché).'
    },
    {
      q: 'Comment fait-on sonner un poste SIP pendant 20 secondes avec Dial() ?',
      a: 'exten => 100,1,Dial(SIP/100,20)'
    }
  ],

  mastery: [
    { cls: 'low', text: 'Score < 60 % : Notions de Dialplan et syntaxe extensions.conf incertaines. Relisez les sections et refaites le QCM.' },
    { cls: 'mid', text: 'Score 60-74 % : Principes généraux compris. Entraînez-vous sur les masques de numérotation et la variable ${EXTEN}.' },
    { cls: 'mid', text: 'Score 75-84 % : Bonne maîtrise pratique. Approfondissez la conception d\'arborescences SVI avec extensions t et i.' },
    { cls: 'high', text: 'Score 85-94 % : Niveau solide. Vous maîtrisez la programmation des flux d\'appels et la logique Asterisk.' },
    { cls: 'high', text: 'Score ≥ 95 % : Maîtrise d\'expert Dialplan. Prêt pour la Qualité de Service et Erlang B du Module 5 !' }
  ]
};

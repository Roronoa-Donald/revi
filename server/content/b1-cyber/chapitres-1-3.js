/**
 * Chapitres 1 à 3 du cours de Cybersécurité B1.
 *
 * Chapitre 1 : fondements (cybersécurité vs sécurité informatique, risque, triade CIA).
 * Chapitre 2 : menaces et attaques (malwares, phishing, DoS/DDoS, attaques réseau).
 * Chapitre 3 : authentification, cryptographie et contrôle d'accès de base.
 *
 * Chaque chapitre fournit la matière que `kit.chapter` met en page. Aucun titre
 * <h2> ici : la numérotation est ajoutée au rendu. Les ateliers de code (trois
 * exercices Bash par chapitre) sont injectés avant le QCM par
 * `scripts/generate-code-labs.js` à partir de `server/exercises/b1-cyber.js`.
 */
'use strict';

const { box } = require('../../../scripts/course-kit');

module.exports = [
  /* ==================== Chapitre 1 ==================== */
  {
    n: 1,
    title: 'Fondements : risque, menaces, vulnérabilités',
    short: 'Fondements',
    toc: 'Cybersécurité vs sécurité informatique, la formule du risque, la triade CIA, l\'histoire des incidents.',
    time: '≈ 2 h de travail',
    free: true,

    situation:
      'Vous entrez en salle de supervision : un serveur de paie, un Wi-Fi visiteurs, une clé USB perdue. ' +
      'Tout le monde parle de « risque » sans le calculer. Ce chapitre donne le vocabulaire et la formule ' +
      'qui permettent de dire « autorisé » ou « refusé » — et pourquoi la triade CIA est le premier bilan ' +
      'qu\'un analyste dresse.',

    objectives: [
      'distinguer cybersécurité et sécurité informatique ;',
      'calculer un risque avec la formule menace × vulnérabilité × impact ;',
      'classer une menace selon la composante CIA qu\'elle viole ;',
      'relier les incidents célèbres aux leçons qu\'ils ont laissées.'
    ],

    sections: [
      {
        title: 'Cybersécurité vs sécurité informatique',
        html: [
          '<p>Les deux termes s\'utilisent l\'un pour l\'autre, mais ils ne couvrent pas le même terrain. ' +
          'La <strong>sécurité informatique</strong> protège les systèmes, les réseaux, les données et les ' +
          'applications contre les accès non autorisés, les perturbations, les modifications ou les ' +
          'destructions : c\'est le volet <em>technique</em>. La <strong>cybersécurité</strong> englobe la ' +
          'sécurité informatique et s\'étend aux actifs numériques dans un contexte global : infrastructures ' +
          'critiques, sécurité opérationnelle, sensibilisation des utilisateurs, lutte contre la ' +
          'cybercriminalité.</p>',
          '<p>La règle à retenir : la sécurité informatique est un <strong>sous-ensemble</strong> de la ' +
          'cybersécurité. Un pare-feu relève de la première ; la politique de mobilité et la simulation de ' +
          'phishing relèvent de la seconde.</p>',
          '<table>\n' +
          '    <tr><th></th><th>Sécurité informatique</th><th>Cybersécurité</th></tr>\n' +
          '    <tr><td>Périmètre</td><td>les systèmes (serveurs, réseaux, applications)</td><td>tous les actifs numériques, y compris humains</td></tr>\n' +
          '    <tr><td>Approche</td><td>technique</td><td>stratégique, organisationnelle et humaine</td></tr>\n' +
          '    <tr><td>Exemple de mesure</td><td>chiffrement du disque</td><td>charte informatique, formation, conformité</td></tr>\n' +
          '  </table>',
          box('mnemo', 'Mnémotechnique — « le sous-ensemble et l\'ensemble »', 'pin',
            '    <p>Tout ce qui est sécurité informatique est cybersécurité ; la réciproque est fausse. ' +
            'Quand un sujet de question parle d\'utilisateurs, de règles ou de sanctions : cybersécurité. ' +
            'Quand il parle de ports, de fichiers ou de correctifs : sécurité informatique.</p>')
        ].join('\n')
      },
      {
        title: 'Menace, vulnérabilité, risque',
        html: [
          '<p>Un <strong>risque</strong> est un événement ou une action potentiellement dommageable qui peut ' +
          'compromettre un système ou une organisation : intentionnelle (attaque), accidentelle (erreur ' +
          'humaine) ou naturelle (inondation). Une <strong>vulnérabilité</strong> est une faiblesse — ' +
          'technique (logiciel non mis à jour), organisationnelle (pas de politique d\'accès) ou humaine ' +
          '(manque de sensibilisation) — qu\'une menace peut exploiter. Le <strong>risque</strong> combine ' +
          'les deux avec l\'impact :</p>',
          '<pre><code>Risque = Menace × Vulnérabilité × Impact</code></pre>',
          '<p>Trois facteurs nuls donnent un risque nul : la menace la plus féroce ne fait rien à un ' +
          'système sans vulnérabilité, et la plus belle faille n\'intéresse personne sans impact. C\'est ' +
          'pourquoi une analyse de risque commence toujours par la liste des actifs et de leur valeur.</p>',
          box('tech', 'Les trois familles de menaces à connaître', 'warning',
            '    <ul>\n' +
            '      <li><strong>Naturelles</strong> : incendie, inondation, séisme — pas d\'intention, mais un impact réel.</li>\n' +
            '      <li><strong>Humaines</strong> : intentionnelles (piratage, sabotage) ou accidentelles (perte d\'un appareil, erreur de manipulation).</li>\n' +
            '      <li><strong>Technologiques</strong> : panne matérielle, bug logiciel, défaillance réseau.</li>\n' +
            '    </ul>')
        ].join('\n')
      },
      {
        title: 'La triade CIA',
        html: [
          '<p>Toute décision de sécurité vise à protéger trois propriétés, notées <strong>CIA</strong> — ' +
          'rien à voir avec l\'agence :</p>',
          '<ul>',
          '  <li><strong>Confidentialité</strong> : l\'information n\'est accessible qu\'aux personnes autorisées ;</li>',
          '  <li><strong>Intégrité</strong> : l\'information n\'est pas altérée sans autorisation ;</li>',
          '  <li><strong>Disponibilité</strong> : l\'information et les systèmes restent accessibles quand il faut.</li>',
          '</ul>',
          '<p>Une fuite de dossier médical viole la confidentialité. Une facture modifiée en vol, ' +
          'l\'intégrité. Un ransomware qui chiffre tout, la disponibilité. Un même incident peut violer ' +
          'plusieurs composantes à la fois — mais l\'analyse commence par nommer la première atteinte.</p>',
          box('pitfall', 'Piège — CIA est un bilan, pas une liste de solutions', 'warning',
            '    <p>Un chiffrement protège la confidentialité, pas la disponibilité ; une sauvegarde ' +
            'protège la disponibilité, pas la confidentialité. Toujours demander : quelle composante ' +
            'est violee, et quelle mesure la restaure ?</p>')
        ].join('\n')
      },
      {
        title: 'L\'histoire apprend',
        html: [
          '<p>Les grands incidents racontent tous une leçon : chaque attaque a exploité une vulnérabilité ' +
          'connue et non traitée, ou un utilisateur pris en confiance.</p>',
          '<table>\n' +
          '    <tr><th>Incident</th><th>Mécanisme</th><th>Leçon</th></tr>\n' +
          '    <tr><td>Ver Morris (1988)</td><td>premier ver Internet,.failles Unix</td><td>le réseau propage à la vitesse des failles</td></tr>\n' +
          '    <tr><td>ILOVEYOU (2000)</td><td>virus par pièce jointe de courriel</td><td>l\'humain est la porte d\'entrée</td></tr>\n' +
          '    <tr><td>CryptoLocker (2013)</td><td>ransomware à rançon</td><td>la sauvegarde hors ligne est vitale</td></tr>\n' +
          '    <tr><td>WannaCry (2017)</td><td>ver exploitant une faille Windows non corrigée</td><td>le patch management sauve des hôpitaux</td></tr>\n' +
          '    <tr><td>Log4Shell (2021)</td><td>faille dans une bibliothèque omniprésente</td><td>la chaîne logicielle est une surface d\'attaque</td></tr>\n' +
          '  </table>',
          box('mnemo', 'Mnémotechnique — « actif, menace, faille, mesure »', 'pin',
            '    <p>Toute analyse de risque se rédige dans cet ordre : <strong>actif</strong> (ce que l\'on ' +
            'protège), <strong>menace</strong> (qui/quoi attaque), <strong>vulnérabilité</strong> (par où), ' +
            '<strong>mesure</strong> (quelle défense). Une phrase de risque qui ne contient pas les quatre ' +
            'est incomplète.</p>')
        ].join('\n')
      }
    ],

    questions: [
      { stem: 'La sécurité informatique est…', opts: ['un synonyme de cybersécurité', 'un sous-ensemble de la cybersécurité', 'un domaine rival'], correct: 1, exp: 'Elle en est le cœur technique ; la cybersécurité englobe en plus l\'organisationnel et l\'humain.' },
      { stem: 'Un logiciel non mis à jour est…', opts: ['une menace', 'une vulnérabilité', 'un risque'], correct: 1, exp: 'C\'est une faiblesse exploitable : une vulnérabilité. La menace est l\'attaquant qui l\'exploite.' },
      { stem: 'Risque = Menace × Vulnérabilité × …', opts: ['Probabilité', 'Impact', 'Coût'], correct: 1, exp: 'La formule du cours combine la menace, la vulnérabilité et l\'impact.' },
      { stem: 'Un dossier médical rendu public viole…', opts: ['la confidentialité', 'l\'intégrité', 'la disponibilité'], correct: 0, exp: 'Des informations réservées sont accessibles à des personnes non autorisées : confidentialité.' },
      { stem: 'Un ransomware qui chiffre les fichiers viole d\'abord…', opts: ['la confidentialité', 'l\'intégrité', 'la disponibilité'], correct: 2, exp: 'Les données ne sont plus accessibles : c\'est l\'atteinte à la disponibilité.' },
      { stem: 'Une erreur de manipulation supprimant une base est…', opts: ['une menace naturelle', 'une menace humaine accidentelle', 'une vulnérabilité technique'], correct: 1, exp: 'Menace humaine, mais non intentionnelle : elle se traite par procédures et sauvegardes.' },
      { stem: 'WannaCry (2017) a exploité…', opts: ['un mot de passe faible', 'une faille Windows non corrigée', 'une pièce jointe de courriel'], correct: 1, exp: 'Le ver a propagé EternalBlue sur des systèmes sans le correctif de mars 2017.' },
      { stem: 'Le premier bilan d\'un analyste devant un incident est…', opts: ['la triade CIA', 'le budget', 'l\'organigramme'], correct: 0, exp: 'Confidentialité, intégrité, disponibilité : quelle composante est violee ?' }
    ],

    pitfalls: [
      '<strong>Confondre menace et vulnérabilité</strong> : la menace attaque, la vulnérabilité est attaquée.',
      '<strong>Croire qu\'un seul produit suffit</strong> : la formule du risque a trois facteurs, la défense a plusieurs couches.',
      '<strong>Nommer « CIA » sans l\'appliquer</strong> : toute description d\'incident doit nommer la composante violee.',
      '<strong>Négliger les menaces accidentelles</strong> : l\'erreur humaine coûte autant que l\'attaque.',
      '<strong>Ignorer l\'histoire</strong> : WannaCry, c\'est aujourd\'hui encore une faille non corrigée quelque part.'
    ],

    methodTitle: 'Analyser un risque en quatre phrases',
    method: [
      '<strong>Nommer l\'actif</strong> et ce qu\'il vaut pour l\'organisation.',
      '<strong>Identifier la menace</strong> : qui ou quoi, intentionnelle ou non.',
      '<strong>Chercher la vulnérabilité</strong> exploitable : technique, organisationnelle ou humaine.',
      '<strong>Écrire le risque</strong> avec la formule, puis choisir la mesure qui casse un facteur.',
      '<strong>Vérifier la triade</strong> : quelle composante CIA la mesure protège, et laquelle reste exposée.'
    ],

    summary: [
      'La sécurité informatique est le sous-ensemble technique de la cybersécurité, qui ajoute l\'organisationnel et l\'humain.',
      'Risque = Menace × Vulnérabilité × Impact : annuler un facteur suffit à annuler le risque.',
      'Les menaces sont naturelles, humaines (intentionnelles ou accidentelles) ou technologiques.',
      'La triade CIA — confidentialité, intégrité, disponibilité — structure le bilan de tout incident.',
      'L\'histoire des incidents (Morris, ILOVEYOU, WannaCry, Log4Shell) prouve que les failles connues non corrigées reviennent.'
    ],

    checklist: [
      'Je distingue cybersécurité et sécurité informatique avec un exemple chacun.',
      'Je calcule un niveau de risque avec la formule et j\'explique chaque facteur.',
      'Je classe une attaque selon la composante CIA qu\'elle viole.',
      'Je raconte un incident célèbre et sa leçon en une phrase.'
    ],

    notions: ['cybersécurité', 'sécurité informatique', 'menace', 'vulnérabilité', 'risque', 'confidentialité', 'intégrité', 'disponibilité'],

    mastery: [
      { cls: 'low', text: '&lt; 50 % — Redéfinis les six notions de base sans notes, puis refais la formule du risque.' },
      { cls: 'mid', text: '50–69 % — Classe dix incidents par composante CIA violee en cinq minutes.' },
      { cls: 'good', text: '70–94 % — Solide : rédige une analyse de risque complète pour un actif de ton choix.' },
      { cls: 'top', text: '≥ 95 % — Maîtrise : passe au chapitre 2, les menaces et les attaques.' }
    ],

    flashcards: [
      { q: 'Qu’est-ce que « malware » ?', a: 'décrire les familles de malwares et leur mode de propagation ;' },
      { q: 'Qu’est-ce que « spyware » ?', a: "Le virus attend qu'un humain exécute le fichier infecté ; le ver (worm) voyage tout seul de machine en machine. Le ransomware chiffre, le spyware espionne — et la parade suit la famille, pas l'instinct." },
      { q: 'Qu’est-ce que « DDoS » ?', a: "Le déni de service (DoS) sature un service ; sa version distribuée ( DDoS ) le fait depuis des milliers de machines compromises — un botnet. C'est l'attaque active par excellence : elle vise la disponibilité, pas le secret." },
      { q: 'Qu’est-ce que « man-in-the-middle » ?', a: 'décrire rogue AP, MAC spoofing et man-in-the-middle.' },
      { q: 'Qu’est-ce que « IAM » ?', a: "L' IAM (Identity and Access Management) gouverne le cycle de vie des identités : authentification (qui es-vous ?) puis autorisation (qu'as-vous le droit de faire ?). Les solutions citées en cours : AWS IAM pour le cloud Amazon, Azure Active Directory dans les environnements Microsoft" },
      { q: 'Qu’est-ce que « chiffrement symétrique » ?', a: 'Le chiffrement symétrique (AES) utilise la même clé pour chiffrer et déchiffrer : rapide, mais chaque paire de machines doit partager un secret. Pour k machines, il faut k(k-1)/2 clés — 6 clés pour 4 machines, plus de 350 pour 27. Le chiffrement asymétrique (RSA, ECC) remplace ce' },
      { q: 'Qu’est-ce que « clé publique » ?', a: 'clé publique : Le chiffrement symétrique (AES) utilise la même clé pour chiffrer et déchiffrer : rapide, mais chaque paire de machines doit partager un secret. Pour k machines, il faut k(k-1)/2 clés — 6 clés pour 4 machines, plus de 350 pour 27. Le chiffrement asymétrique (RSA, ECC) remplace ce' },
      { q: 'Qu’est-ce que « patch management » ?', a: 'patch management : Un correctif (patch) est une mise à jour publiée par le fournisseur pour corriger une vulnérabilité, un bug ou ajouter une fonction. Ignorer les correctifs expose aux attaques connues : Heartbleed (OpenSSL), Shellshock (Bash), EternalBlue (SMB Windows, moteur de WannaCry) ont tou' },
      { q: 'Qu’est-ce que « corrélation » ?', a: 'SIEM = collecte + corrélation + alertes en temps réel ; sources : pare-feu, serveurs, annuaires, EDR.' },
      { q: "Qu’est-ce que « log d'authentification » ?", a: "log d'authentification : Le SIEM réveille l'équipe à 3 h : 300 échecs de connexion depuis une même IP, puis un succès. La question n'est pas « qui ? » mais « dans quel ordre agir ? ». Ce chapitre donne la méthode : détecter dans les logs, contenir avant de comprendre, éradiquer, rétablir, puis apprendre." },
      { q: 'Qu’est-ce que « NIST CSF » ?', a: 'RGPD = données personnelles (UE) ; NIS2 = infrastructures essentielles (UE) ; PCI DSS = cartes bancaires ; HIPAA = santé (US) ; ISO 27001 = certification du SMSI ; NIST CSF = cadre de gestion des risques . À chaque secteur son référentiel.' },
      { q: 'Qu’est-ce que « PoLP » ?', a: 'appliquer le PoLP, le gestionnaire de mots de passe et la sensibilisation ;' },
      { q: 'Cybersécurité vs sécurité informatique ?', a: 'La sécurité informatique est le volet technique (systèmes, réseaux, applications) ; la cybersécurité englobe tout : actifs numériques, organisation, humain, conformité.' },
      { q: 'La formule du risque ?', a: 'Risque = Menace × Vulnérabilité × Impact. Un facteur nul donne un risque nul.' },
      { q: 'Les trois composantes de la triade CIA ?', a: 'Confidentialité (accès réservé), intégrité (pas d\'altération non autorisée), disponibilité (accessible au moment voulu).' },
      { q: 'Trois familles de menaces ?', a: 'Naturelles (incendie), humaines intentionnelles ou accidentelles (piratage, erreur), technologiques (panne, bug).' }
    ]
  },

  /* ==================== Chapitre 2 ==================== */
  {
    n: 2,
    title: 'Menaces et attaques : malwares, phishing, réseau',
    short: 'Menaces',
    toc: 'Familles de malwares, ingénierie sociale et phishing, attaques actives/passives, attaques réseau et sources de menaces.',
    time: '≈ 2 h 30 de travail',

    situation:
      'Le servicedesk reçoit dans la même heure un rapport EXE bizarre, un courriel « votre compte sera ' +
      'fermé sous 24 h » et un réseau Wi-Fi invité qui porte le nom de l\'entreprise. Trois attaques ' +
      'différentes, un même réflexe : reconnaître la famille, les indices, puis la parade.',

    objectives: [
      'décrire les familles de malwares et leur mode de propagation ;',
      'reconnaître les indices d\'un phishing et nommer l\'ingénierie sociale ;',
      'distinguer attaque active et passive, interne et externe ;',
      'décrire rogue AP, MAC spoofing et man-in-the-middle.'
    ],

    sections: [
      {
        title: 'Les familles de malwares',
        html: [
          '<p>Un <strong>malware</strong> est un programme conçu pour nuire. Quatre familles dominent les ' +
          'épreuves — la différence tient à <em>comment il se propage</em> et <em>ce qu\'il fait</em> :</p>',
          '<table>\n' +
          '    <tr><th>Famille</th><th>Propagation</th><th>Action</th><th>Réponse de référence</th></tr>\n' +
          '    <tr><td>Virus</td><td>s\'attache à un fichier, action humaine requise (exécuter)</td><td>corrompt, ralentit, détruit</td><td>supprimer, re-scanner</td></tr>\n' +
          '    <tr><td>Ver</td><td>se réplique seul par le réseau</td><td>sature, installe des portes dérobées</td><td>isoler la machine</td></tr>\n' +
          '    <tr><td>Ransomware</td><td>pièce jointe, faille, ver (ex. WannaCry)</td><td>chiffre puis exige une rançon</td><td>restaurer une sauvegarde hors ligne</td></tr>\n' +
          '    <tr><td>Spyware</td><td>installé en sourdine, souvent par bundle</td><td>espionne (touches, navigation)</td><td>changer les mots de passe</td></tr>\n' +
          '  </table>',
          '<p>Exemples à citer : ILOVEYOU (virus par courriel, 2000), WannaCry (ver ransomware, 2017), ' +
          'CryptoLocker (ransomware, 2013). Le ver Morris (1988) est le premier ver d\'Internet.</p>',
          box('mnemo', 'Mnémotechnique — « le virus attend, le ver voyage »', 'pin',
            '    <p>Le <strong>virus</strong> attend qu\'un humain exécute le fichier infecté ; le ' +
            '<strong>ver</strong> (worm) voyage tout seul de machine en machine. Le ransomware chiffre, ' +
            'le spyware espionne — et la parade suit la famille, pas l\'instinct.</p>')
        ].join('\n')
      },
      {
        title: 'Ingénierie sociale et phishing',
        html: [
          '<p>L\'<strong>ingénierie sociale</strong> manipule l\'humain plutôt que la machine : urgence, ' +
          'autorité, peur, appât. Sa forme la plus courante est le <strong>phishing</strong> (hameçonnage) : ' +
          'un courriel imite un service de confiance pour voler des identifiants. Les indices reconnaissables :</p>',
          '<ul>',
          '  <li>un <strong>expéditeur</strong> dont le domaine est presque le bon (banque-securite.fr) ;</li>',
          '  <li>une <strong>URL en adresse IP</strong> ou un nom de domaine exotique (.info, .tk) ;</li>',
          '  <li>l\'<strong>absence de HTTPS</strong> sur une page qui réclame un mot de passe ;</li>',
          '  <li>un <strong>sentiment d\'urgence</strong> et une menace de suspension ;</li>',
          '  <li>des <strong>fautes d\'orthographe</strong> et un ton générique (« Cher client »).</li>',
          '</ul>',
          '<p>Côté réseau, la même arnaque existe en sans-fil : l\'<strong>AP phishing</strong> installe un ' +
          'faux point d\'accès qui imite le portail captif d\'un opérateur légitime pour capter les ' +
          'identifiants.</p>',
          box('pitfall', 'Piège — l\'urgence est la signature', 'warning',
            '    <p>« Sous 24 h », « compte suspendu », « dernier avertissement » : l\'urgence a pour but ' +
            'd\'empêcher de vérifier. La parade est un réflexe, pas une intuition : vérifier l\'URL, ' +
            'joindre le service par un canal connu, signaler. La simulation de phishing régulière ' +
            'transforme les utilisateurs en capteurs de menaces.</p>')
        ].join('\n')
      },
      {
        title: 'Attaques actives, passives, internes, externes',
        html: [
          '<p>Selon le comportement et la position de l\'attaquant, une attaque se classe en deux axes :</p>',
          '<table>\n' +
          '    <tr><th>Axe</th><th>Type</th><th>Caractéristique</th></tr>\n' +
          '    <tr><td>Comportement</td><td><strong>active</strong></td><td>modifie les ressources ou affecte leur fonctionnement</td></tr>\n' +
          '    <tr><td>Comportement</td><td><strong>passive</strong></td><td>observe et apprend, sans toucher aux ressources (écoute)</td></tr>\n' +
          '    <tr><td>Position</td><td><strong>interne</strong></td><td>part d\'une entité autorisée qui abuse de ses accès</td></tr>\n' +
          '    <tr><td>Position</td><td><strong>externe</strong></td><td>part d\'un utilisateur non autorisé, hors du périmètre</td></tr>\n' +
          '  </table>',
          '<p>Le <strong>déni de service</strong> (DoS) sature un service ; sa version distribuée ' +
          '(<strong>DDoS</strong>) le fait depuis des milliers de machines compromises — un botnet. ' +
          'C\'est l\'attaque active par excellence : elle vise la disponibilité, pas le secret.</p>',
          box('tech', 'Les sources de menaces à citer en examen', 'users',
            '    <ul>\n' +
            '      <li><strong>Hacktivistes</strong> : motivation idéologique, cible symbolique.</li>\n' +
            '      <li><strong>Cybercriminels</strong> : motivation financière (rançon, fraude).</li>\n' +
            '      <li><strong>États-nations</strong> : espionnage, sabotage d\'infrastructures.</li>\n' +
            '      <li><strong>Menaces internes</strong> : employés malveillants ou simplement négligents.</li>\n' +
            '    </ul>')
        ].join('\n')
      },
      {
        title: 'Les attaques réseau sans fil',
        html: [
          '<p>Les attaques contre les réseaux WLAN (802.11) se classent selon la composante CIA ' +
          'qu\'elles attaquent — contrôle d\'accès, confidentialité, intégrité, authentification ou ' +
          'disponibilité. Trois classiques à connaître :</p>',
          '<ul>',
          '  <li><strong>Rogue AP</strong> (point d\'accès rogue) : un AP non autorisé branché dans le ' +
          'réseau de confiance crée une porte dérobée ouverte ; les grandes entreprises déploient des ' +
          'systèmes WIPS avec capteurs pour les repérer à plein temps.</li>',
          '  <li><strong>MAC spoofing</strong> : l\'adresse MAC d\'une carte n\'est pas modifiable en dur, ' +
          'mais les pilotes et outils permettent de la falsifier — usurper l\'identité d\'une machine ' +
          'autorisée pour franchir un filtre MAC.</li>',
          '  <li><strong>Man-in-the-middle</strong> (MITM) : l\'attaquant s\'installe entre deux parties ' +
          'qui croient dialoguer en direct, intercepte et relaie les messages — l\'attaque type contre la ' +
          'confidentialité.</li>',
          '</ul>',
          box('mnemo', 'Mnémotechnique — « rogue s\'installe, spoof imite, MITM s\'intercale »', 'pin',
            '    <p>Le rogue AP <strong>s\'installe</strong> dans le réseau de confiance ; le MAC spoofing ' +
            '<strong>imite</strong> l\'identité d\'une machine ; le MITM <strong>s\'intercale</strong> entre ' +
            'deux victimes. Chacun viole une composante : contrôle d\'accès, authentification, confidentialité.</p>')
        ].join('\n')
      }
    ],

    questions: [
      { stem: 'Quel malware se propage seul par le réseau ?', opts: ['virus', 'ver', 'spyware'], correct: 1, exp: 'Le ver se réplique sans action humaine ; le virus attend l\'exécution d\'un fichier infecté.' },
      { stem: 'WannaCry est avant tout…', opts: ['un virus de macro', 'un ver ransomware', 'un spyware'], correct: 1, exp: 'Il combine propagation de ver et chiffrement à rançon.' },
      { stem: 'Une URL en adresse IP sur une page de connexion est…', opts: ['normal pour un intranet', 'un indice de phishing', 'un signe de HTTPS'], correct: 1, exp: 'Un service de confiance n\'utilise pas une IP nue pour réclamer des identifiants.' },
      { stem: 'Une écoute passive…', opts: ['modifie les ressources', 'n\'affecte pas les ressources', 'sature le service'], correct: 1, exp: 'L\'attaque passive observe sans altérer ; l\'active modifie ou perturbe.' },
      { stem: 'Un DDoS vise…', opts: ['la confidentialité', 'l\'intégrité', 'la disponibilité'], correct: 2, exp: 'Saturer le service le rend indisponible — c\'est le but du déni de service.' },
      { stem: 'Le MAC spoofing consiste à…', opts: ['casser le chiffrement WPA', 'falsifier l\'adresse MAC d\'une interface', 'installer un AP'], correct: 1, exp: 'Les pilotes permettent de falsifier la MAC et d\'usurper l\'identité d\'une machine autorisée.' },
      { stem: 'Un employé qui exfiltre des fichiers abuse de…', opts: ['un accès autorisé', 'une faille zero-day', 'un botnet'], correct: 0, exp: 'C\'est une attaque interne : l\'entité autorisée utilise ses accès de façon non approuvée.' },
      { stem: 'Le MITM viole principalement…', opts: ['la confidentialité', 'la disponibilité', 'le contrôle d\'accès'], correct: 0, exp: 'L\'attaquant intercepte secrètement des messages censés rester privés.' }
    ],

    pitfalls: [
      '<strong>Confondre virus et ver</strong> : l\'un attend un clic, l\'autre voyage seul.',
      '<strong>Payer la rançon d\'un ransomware</strong> : sans garantie, et la parade est la sauvegarde hors ligne.',
      '<strong>Croire un courriel à l\'urgence artificielle</strong> : vérifier expéditeur et URL, toujours.',
      '<strong>Réduire les menaces aux hackers externes</strong> : l\'interne négligent coûte aussi cher.',
      '<strong>Assurer qu\'un filtre MAC protège</strong> : il se contourne en spoofant une MAC autorisée.'
    ],

    methodTitle: 'Qualifier une attaque en trois étapes',
    method: [
      '<strong>Nommer la famille</strong> : malware (quelle sorte ?), ingénierie sociale, déni de service, attaque réseau.',
      '<strong>Classer l\'attaque</strong> : active ou passive, interne ou externe, et composante CIA violee.',
      '<strong>Choisir la parade</strong> adaptée à la famille : restauration, isolement, mots de passe, signalement, WIPS.',
      '<strong>Documenter</strong> : ce tri alimente le registre d\'incidents du chapitre 5.'
    ],

    summary: [
      'Virus (action humaine), ver (réplication autonome), ransomware (chiffrement à rançon), spyware (espionnage).',
      'Le phishing exploite urgence, autorité et confiance ; ses indices : expéditeur presque correct, URL suspecte, absence de HTTPS.',
      'Attaque active = modifie ; passive = observe. Interne = abus d\'un accès autorisé ; externe = intrus.',
      'DoS/DDoS vise la disponibilité ; rogue AP, MAC spoofing et MITM attaquent accès, authentification et confidentialité.',
      'Sources de menaces : hacktivistes, cybercriminels, États-nations, internes.'
    ],

    checklist: [
      'Je décris les quatre familles de malwares avec propagation et parade.',
      'Je liste cinq indices de phishing et je sais quoi faire en les recevant.',
      'Je classe une attaque active/passive, interne/externe sans hésiter.',
      'J\'explique rogue AP, MAC spoofing et MITM en une phrase chacun.'
    ],

    notions: ['malware', 'virus', 'ver', 'ransomware', 'spyware', 'phishing', 'DDoS', 'man-in-the-middle'],

    mastery: [
      { cls: 'low', text: '&lt; 50 % — Refaites le tableau des malwares de mémoire, famille par famille.' },
      { cls: 'mid', text: '50–69 % — Prenez dix courriels réels et traquez les indices de phishing.' },
      { cls: 'good', text: '70–94 % — Solide : qualifie chaque attaque en famille, axe et composante CIA.' },
      { cls: 'top', text: '≥ 95 % — Maîtrise : passe au chapitre 3, l\'authentification et la cryptographie.' }
    ],

    flashcards: [
      { q: 'Virus vs ver ?', a: 'Le virus s\'attache à un fichier et attend une action humaine ; le ver se réplique seul par le réseau.' },
      { q: 'La parade au ransomware ?', a: 'Restaurer une sauvegarde hors ligne testée — jamais payer la rançon.' },
      { q: 'Cinq indices de phishing ?', a: 'Domaine presque correct, URL en IP ou exotique, absence de HTTPS, urgence artificielle, fautes et votre générique.' },
      { q: 'Rogue AP, MAC spoofing, MITM : le trio ?', a: 'Rogue AP s\'installe (porte dérobée), spoofing imite une MAC autorisée, MITM s\'intercale et intercepte.' }
    ]
  },

  /* ==================== Chapitre 3 ==================== */
  {
    n: 3,
    title: 'Authentification, cryptographie, pare-feu',
    short: 'Authentification',
    toc: 'Mots de passe forts et 2FA, IAM, chiffrement symétrique et asymétrique, hachage, PKI, pare-feu et VPN.',
    time: '≈ 2 h 30 de travail',

    situation:
      'Un compte à 8 caractères cède en quelques heures ; un compte à 15 avec 2FA n\'a jamais cédé. Ce ' +
      'chapitre donne les mécanismes qui séparent les deux : facteurs d\'authentification, clés ' +
      'symétriques et asymétriques, hachage, et les gardiens du réseau — pare-feu et VPN.',

    objectives: [
      'appliquer une politique de mots de passe forts et justifier la 2FA ;',
      'classer les preuves d\'identité en connaissance, possession, inhérence ;',
      'calculer pourquoi le symétrique explose en clés et l\'asymétrique non ;',
      'décrire pare-feu, VPN et protocoles sécurisés comme garde-fous réseau.'
    ],

    sections: [
      {
        title: 'Mots de passe forts et 2FA',
        html: [
          '<p>Le mot de passe est la première ligne de défense ; sa faiblesse expose à la force brute ' +
          '(essais systématiques), au dictionnaire (mots courants) et au credential stuffing (réutilisation ' +
          'des fuites). Les recommandations actuelles (ANSSI, NIST) : privilégier la <strong>longueur</strong> ' +
          '(12 à 15 caractères minimum), une <strong>phrase de passe</strong> mémorisable, l\'unicité par ' +
          'service — et ne renouveler le mot de passe que sur suspicion de compromission, car l\'expiration ' +
          'forcée produit des suites prévisibles (Ete2024!, Automne2024!).</p>',
          '<p>La <strong>2FA</strong> ajoute une seconde preuve d\'identité issue d\'une catégorie ' +
          '<em>différente</em> de la première :</p>',
          '<table>\n' +
          '    <tr><th>Facteur</th><th>Ce que l\'on a</th><th>Exemples</th></tr>\n' +
          '    <tr><td>Connaissance</td><td>ce que l\'on sait</td><td>mot de passe, code PIN</td></tr>\n' +
          '    <tr><td>Possession</td><td>ce que l\'on possède</td><td>smartphone, clé YubiKey, carte à puce</td></tr>\n' +
          '    <tr><td>Inhérence</td><td>ce que l\'on est</td><td>empreinte, visage, iris</td></tr>\n' +
          '  </table>',
          '<p>Deux facteurs de la même catégorie (code PIN + mot de passe) ne font pas de la 2FA. Le code ' +
          'TOTP des applications d\'authentification change toutes les 30 secondes ; le SMS reste plus ' +
          'fragile car interceptable.</p>',
          box('mnemo', 'Mnémotechnique — « savoir, avoir, être »', 'pin',
            '    <p>Connaissance = <strong>savoir</strong>, possession = <strong>avoir</strong>, ' +
            'inhérence = <strong>être</strong>. La 2FA exige deux catégories différentes : mot de passe ' +
            '(savoir) + application TOTP ou clé (avoir).</p>')
        ].join('\n')
      },
      {
        title: 'IAM : identités et accès',
        html: [
          '<p>L\'<strong>IAM</strong> (Identity and Access Management) gouverne le cycle de vie des ' +
          'identités : <strong>authentification</strong> (qui es-vous ?) puis <strong>autorisation</strong> ' +
          '(qu\'as-vous le droit de faire ?). Les solutions citées en cours : AWS IAM pour le cloud Amazon, ' +
          'Azure Active Directory dans les environnements Microsoft, Okta pour le SaaS, Keycloak en open ' +
          'source.</p>',
          '<p>Le principe directeur est le <strong>moindre privilège</strong> (PoLP) : chaque utilisateur ' +
          'ne reçoit que les accès strictement nécessaires à sa mission. Il limite l\'impact de la ' +
          'compromission d\'un compte — l\'attaquant entre dans une pièce, pas dans le bâtiment.</p>',
          box('tech', 'Authentification et autorisation : le duo à ne pas inverser', 'key',
            '    <p>L\'authentification vérifie l\'identité (le badge scanne) ; l\'autorisation décide de ' +
            'l\'accès (la porte s\'ouvre ou non). On s\'authentifie toujours AVANT d\'être autorisé, jamais ' +
            'l\'inverse.</p>')
        ].join('\n')
      },
      {
        title: 'Cryptographie : symétrique, asymétrique, hachage',
        html: [
          '<p>Le <strong>chiffrement symétrique</strong> (AES) utilise la même clé pour chiffrer et ' +
          'déchiffrer : rapide, mais chaque paire de machines doit partager un secret. Pour k machines, ' +
          'il faut k(k-1)/2 clés — 6 clés pour 4 machines, plus de 350 pour 27. Le chiffrement ' +
          '<strong>asymétrique</strong> (RSA, ECC) remplace ce problème par une paire clé publique/clé ' +
          'privée : chacun publie sa clé publique, tout le monde chiffre, seul le propriétaire déchiffre. ' +
          'Plus lent, mais il passe à l\'échelle — et sert aussi à signer.</p>',
          '<p>Le <strong>hachage</strong> (SHA-256…) transforme une donnée en empreinte de taille fixe, ' +
          'sans clé et irréversible : il prouve l\'<strong>intégrité</strong> (le fichier a-t-il changé ?) ' +
          'et garde les mots de passe en base (on compare des empreintes, jamais les mots de passe en clair). ' +
          'La <strong>PKI</strong> relie une clé publique à une identité par un <strong>certificat ' +
          'numérique</strong> signé par une autorité de certification — c\'est le cadenas du navigateur.</p>',
          '<pre><code>symétrique  : k(k-1)/2 clés secrètes          → 4 machines = 6 clés\n' +
          'asymétrique : k paires publiques/privées      → 4 machines = 4 paires\n' +
          'hachage     : empreinte fixe, sans clé        → contrôle d\'intégrité</code></pre>',
          box('pitfall', 'Piège — hacher n\'est pas chiffrer', 'warning',
            '    <p>Le chiffrement est réversible avec la clé ; le hachage ne l\'est jamais. Une question ' +
            'qui parle de « vérifier qu\'un fichier n\'a pas changé » parle de hachage ; une question qui ' +
            'parle de « garder le secret » parle de chiffrement.</p>')
        ].join('\n')
      },
      {
        title: 'Pare-feu, VPN, protocoles sécurisés',
        html: [
          '<p>Le <strong>pare-feu</strong> filtre le trafic réseau selon des règles (adresses, ports, ' +
          'protocoles) : il est la frontière entre zones de confiance. Le <strong>VPN</strong> crée un ' +
          'tunnel chiffré sur un réseau non sûr — obligatoire sur le Wi-Fi public selon la politique de ' +
          'mobilité. Les <strong>protocoles sécurisés</strong> chiffrent le dialogue applicatif : HTTPS ' +
          'pour le Web (TLS sous HTTP), SSH pour l\'administration distante, contre FTP et Telnet en clair.</p>',
          '<p>Les trois se complètent : le pare-feu contrôle <em>ce qui passe</em>, le VPN protège ' +
          '<em>le trajet</em>, HTTPS/SSH protègent <em>la conversation</em>.</p>',
          box('mnemo', 'Mnémotechnique — « frontière, tunnel, dialogue »', 'pin',
            '    <p>Pare-feu = <strong>frontière</strong> (filtre les flux) ; VPN = <strong>tunnel</strong> ' +
            '(protège le trajet entre deux sites) ; HTTPS/SSH = <strong>dialogue</strong> (chiffre la ' +
            'session de bout en bout).</p>')
        ].join('\n')
      }
    ],

    questions: [
      { stem: 'Code PIN + mot de passe, c\'est…', opts: ['de la 2FA', 'du même facteur', 'de l\'inhérence'], correct: 1, exp: 'Deux preuves de connaissance : la 2FA exige deux catégories différentes.' },
      { stem: 'Le code TOTP change…', opts: ['toutes les 30 secondes', 'chaque jour', 'à chaque connexion'], correct: 0, exp: 'Time-based One-Time Password : le code tourne toutes les 30 secondes.' },
      { stem: 'L\'empreinte digitale est un facteur de…', opts: ['connaissance', 'possession', 'inhérence'], correct: 2, exp: 'Ce que l\'on est : biométrie.' },
      { stem: 'Pour 4 machines en symétrique, il faut…', opts: ['4 clés', '6 clés', '8 clés'], correct: 1, exp: 'k(k-1)/2 = 4×3/2 = 6 clés secrètes.' },
      { stem: 'L\'avantage de l\'asymétrique est…', opts: ['la vitesse', 'la distribution des clés', 'la taille des clés'], correct: 1, exp: 'Chacun publie sa clé publique : plus besoin d\'échanger des secrets pour chaque paire.' },
      { stem: 'Le hachage sert à…', opts: ['garder un secret', 'vérifier l\'intégrité', 'accélérer le réseau'], correct: 1, exp: 'Empreinte fixe et irréversible : elle prouve que la donnée n\'a pas changé.' },
      { stem: 'Le certificat numérique lie…', opts: ['une clé publique à une identité', 'un mot de passe à un compte', 'un port à un protocole'], correct: 0, exp: 'La PKI signe cette liaison : c\'est le rôle de l\'autorité de certification.' },
      { stem: 'Sur un Wi-Fi public, la mesure attendue est…', opts: ['un VPN', 'un pare-feu local seul', 'changer de navigateur'], correct: 0, exp: 'La politique de mobilité impose le VPN sur les réseaux publics.' }
    ],

    pitfalls: [
      '<strong>Croire que deux secrets font une 2FA</strong> : il faut deux catégories de facteurs.',
      '<strong>Changer les mots de passe tous les 90 jours</strong> : l\'ANSSI et le NIST l\'ont abandonné, sauf compromission.',
      '<strong>Confondre hachage et chiffrement</strong> : l\'un prouve l\'intégrité, l\'autre garde le secret.',
      '<strong>Négliger le SMS comme second facteur</strong> : interceptable, préférer TOTP ou clé FIDO2.',
      '<strong>Donner des droits « au cas où »</strong> : le moindre privilège limite la casse d\'un compte volé.'
    ],

    methodTitle: 'Sécuriser un compte en cinq mesures',
    method: [
      '<strong>Longueur d\'abord</strong> : phrase de passe de 12 à 15 caractères minimum, unique par service.',
      '<strong>Gestionnaire de mots de passe</strong> : secrets aléatoires générés, coffre chiffré, remplissage qui refuse les URLs frauduleuses.',
      '<strong>2FA systématique</strong> : application TOTP ou clé matérielle de préférence au SMS.',
      '<strong>Moindre privilège</strong> : des accès proportionnés à la mission, révisés aux mouvements de poste.',
      '<strong>Surveillance des fuites</strong> : alerter si les identifiants apparaissent dans une base piratée, changement immédiat.'
    ],

    summary: [
      'Mot de passe : longueur et unicité ; l\'expiration forcée produit des suites prévisibles.',
      '2FA = deux facteurs de catégories différentes : connaissance, possession, inhérence (savoir, avoir, être).',
      'L\'IAM gère identités et accès ; l\'authentification précède l\'autorisation ; le PoLP limite la casse.',
      'Symétrique (AES) : k(k-1)/2 clés ; asymétrique (RSA, ECC) : une paire par entité ; hachage : intégrité sans clé.',
      'Pare-feu filtre, VPN tunnelise, HTTPS/SSH chiffrent le dialogue.'
    ],

    checklist: [
      'Je justifie une politique de mots de passe avec les recommandations actuelles.',
      'Je classe une preuve d\'identité dans les trois facteurs.',
      'Je calcule les clés symétriques nécessaires et j\'explique pourquoi l\'asymétrique gagne.',
      'Je décris pare-feu, VPN et HTTPS avec leur rôle propre.'
    ],

    notions: ['2FA', 'facteur de connaissance', 'facteur de possession', 'facteur d\'inhérence', 'IAM', 'chiffrement symétrique', 'clé publique', 'hachage'],

    mastery: [
      { cls: 'low', text: '&lt; 50 % — Rejoue le tableau des trois facteurs et la formule des clés.' },
      { cls: 'mid', text: '50–69 % — Audit votre propre compte : longueur, unicité, second facteur.' },
      { cls: 'good', text: '70–94 % — Solide : explique symétrique vs asymétrique en quatre phrases.' },
      { cls: 'top', text: '≥ 95 % — Maîtrise : passe au chapitre 4, la sécurité des systèmes et applications.' }
    ],

    flashcards: [
      { q: 'Les trois facteurs d\'authentification ?', a: 'Connaissance (mot de passe), possession (clé, téléphone), inhérence (biométrie). La 2FA combine deux catégories différentes.' },
      { q: 'Combien de clés symétriques pour k machines ?', a: 'k(k-1)/2 — contre k paires de clés en asymétrique : c\'est pourquoi RSA/ECC passe à l\'échelle.' },
      { q: 'Hachage vs chiffrement ?', a: 'Le hachage est irréversible et sans clé : il prouve l\'intégrité. Le chiffrement est réversible avec la clé : il garde le secret.' },
      { q: 'Rôle du pare-feu, du VPN, de HTTPS ?', a: 'Pare-feu : filtre les flux à la frontière. VPN : tunnel chiffré sur réseau non sûr. HTTPS : chiffre le dialogue Web (TLS).' }
    ]
  }
];

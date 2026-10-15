/**
 * Chapitres 4 à 6 du cours de Cybersécurité B1.
 *
 * Chapitre 4 : sécurité des systèmes et applications (permissions, correctifs, code sécurisé).
 * Chapitre 5 : gestion des incidents (SIEM, logs, réponse, PCA/PRA).
 * Chapitre 6 : conformité et bonnes pratiques (RGPD, NIS2, ISO 27001, sauvegarde 3-2-1).
 *
 * Les ateliers de code (trois exercices Bash par chapitre) sont injectés avant
 * le QCM par `scripts/generate-code-labs.js` à partir de
 * `server/exercises/b1-cyber.js`.
 */
'use strict';

const { box } = require('../../../scripts/course-kit');

module.exports = [
  /* ==================== Chapitre 4 ==================== */
  {
    n: 4,
    title: 'Sécurité des systèmes et des applications',
    short: 'Systèmes',
    toc: 'Utilisateurs et permissions, modèles de contrôle d\'accès, gestion des correctifs, développement sécurisé.',
    time: '≈ 2 h de travail',

    situation:
      'Un serveur web a 46 jours de retard de correctif, un compte applicatif a des droits de ' +
      'côté administrateur, et une page accepte n\'importe quelle saisie. Trois failles différentes, ' +
      'une même discipline : permissions justes, correctifs réguliers, entrées filtrées.',

    objectives: [
      'gérer utilisateurs, groupes et permissions d\'un système d\'exploitation ;',
      'distinguer DAC, MAC, RBAC, ABAC et ACL ;',
      'organiser un cycle de correctifs et justifier sa criticité ;',
      'appliquer les réflexes du développement sécurisé contre injection et XSS.'
    ],

    sections: [
      {
        title: 'Utilisateurs, groupes, permissions',
        html: [
          '<p>Un <strong>utilisateur</strong> est une entité (humaine ou logicielle) identifiée par un nom ' +
          'unique et un identifiant numérique <strong>UID</strong> ; les <strong>groupes</strong> (GID) ' +
          'rapprochent des utilisateurs aux besoins similaires ; les <strong>permissions</strong> — ' +
          'lecture, écriture, exécution — définissent ce que chacun peut faire d\'une ressource.</p>',
          '<p>Le modèle POSIX (Linux/Unix) attribue à chaque fichier un <strong>propriétaire</strong> et un ' +
          '<strong>groupe</strong>, avec des permissions posées séparément pour le propriétaire, le groupe ' +
          'et les autres. Le cours d\'administration Linux en détaille les calculs ; ici, il faut retenir ' +
          'le principe : <em>le droit minimal par ressource, jamais le droit large par commodité</em>.</p>',
          box('tech', 'Les cas d\'usage à citer', 'cpu',
            '    <ul>\n' +
            '      <li>Fichiers sensibles : accès limité aux seuls utilisateurs autorisés (paie, RH).</li>\n' +
            '      <li>Administration : droits administratifs réservés aux utilisateurs qualifiés.</li>\n' +
            '      <li>Serveur web multi-utilisateurs : permissions distinctes développeurs, testeurs, administrateurs.</li>\n' +
            '      <li>Cloud : politiques d\'accès granulaires (AWS IAM) plutôt que comptes partagés.</li>\n' +
            '    </ul>')
        ].join('\\n')
      },
      {
        title: 'Modèles de contrôle d\'accès',
        html: [
          '<p>Cinq modèles structurent les décisions d\'accès, et l\'examen adore les confondre :</p>',
          '<table>\n' +
          '    <tr><th>Modèle</th><th>Qui décide</th><th>Exemple</th></tr>\n' +
          '    <tr><td><strong>DAC</strong> (Discrétionnaire)</td><td>le propriétaire de la ressource</td><td>permissions POSIX classiques</td></tr>\n' +
          '    <tr><td><strong>MAC</strong> (Obligatoire)</td><td>une politique centrale imposée par le système</td><td>SELinux, AppArmor</td></tr>\n' +
          '    <tr><td><strong>RBAC</strong> (par rôles)</td><td>le rôle attribué à l\'utilisateur</td><td>rôle « technicien paie » dans une PME</td></tr>\n' +
          '    <tr><td><strong>ABAC</strong> (par attributs)</td><td>des critères dynamiques (heure, lieu, appareil)</td><td>accès aux heures de bureau seulement</td></tr>\n' +
          '    <tr><td><strong>ACL</strong> (listes d\'accès)</td><td>une liste explicite d\'entrées par ressource</td><td>NTFS sous Windows</td></tr>\n' +
          '  </table>',
          box('mnemo', 'Mnémotechnique — « propriétaire, politique, rôle, attribut, liste »', 'pin',
            '    <p>DAC = le <strong>propriétaire</strong> décide ; MAC = la <strong>politique</strong> ' +
            'impose ; RBAC = le <strong>rôle</strong> porte les droits ; ABAC = l\'<strong>attribut</strong> ' +
            '(heure, lieu) tranche ; ACL = la <strong>liste</strong> explicite d\'entrées. Cinq mots-clés, ' +
            'cinq modèles, aucune confusion possible.</p>')
        ].join('\\n')
      },
      {
        title: 'La gestion des correctifs',
        html: [
          '<p>Un <strong>correctif</strong> (patch) est une mise à jour publiée par le fournisseur pour ' +
          'corriger une vulnérabilité, un bug ou ajouter une fonction. Ignorer les correctifs expose aux ' +
          'attaques connues : <strong>Heartbleed</strong> (OpenSSL), <strong>Shellshock</strong> (Bash), ' +
          '<strong>EternalBlue</strong> (SMB Windows, moteur de WannaCry) ont tous été corrigés avant d\'être ' +
          'massivement exploités — sur les machines non patchées.</p>',
          '<p>Le cycle professionnel : <strong>inventorier</strong> les produits, <strong>suivre les ' +
          'bulletins</strong> du fournisseur, <strong>qualifier</strong> la criticité (CVSS, exposition), ' +
          '<strong>tester</strong> en environnement de recette, <strong>déployer</strong> par vagues, ' +
          '<strong>vérifier</strong> la conformité. Le délai de correction est un indicateur de sécurité à ' +
          'part entière : au-delà de 90 jours sans correctif de sécurité, la situation est critique.</p>',
          box('pitfall', 'Piège — « on patchera à la prochaine maintenance »', 'warning',
            '    <p>WannaCry a frappé en mai 2017 un correctif publié en mars : 60 jours de retard ont ' +
            'suffi. Le correctif de sécurité ne suit pas le calendrier de maintenance, il le devance — ' +
            'et la conformité RGPD/PCI DSS exige des systèmes tenus à jour.</p>')
        ].join('\\n')
      },
      {
        title: 'Développement sécurisé et bases de données',
        html: [
          '<p>Le <strong>secure coding</strong> part d\'un principe : toute entrée est suspecte tant qu\'elle ' +
          'n\'est pas validée. Les deux attaques de référence :</p>',
          '<ul>',
          '  <li><strong>Injection SQL</strong> : la saisie <code>Robert\');--</code> se glisse dans une ' +
          'requête construite par concaténation et en détourne le sens. Parade : requêtes paramétrées, ' +
          'et validation des entrées (apostrophes, tirets doubles, chevrons suspects).</li>',
          '  <li><strong>XSS</strong> (cross-site scripting) : un script injecté dans une page s\'exécute ' +
          'dans le navigateur d\'un autre visiteur. Parade : échapper toute sortie affichée, filtrer les ' +
          'chevrons <code>&lt;</code> et <code>&gt;</code>.</li>',
          '</ul>',
          '<p>Côté <strong>bases de données</strong> : contrôle d\'accès par comptes nominatifs et ' +
          'privilèges minimaux, chiffrement des données sensibles au repos, sauvegardes testées. Côté ' +
          '<strong>tests</strong> : le pentesting cherche les failles avant l\'attaquant, l\'audit vérifie ' +
          'la conformité — le référentiel <strong>OWASP</strong> tient la liste des risques applicatifs ' +
          'les plus courants.</p>',
          box('mnemo', 'Mnémotechnique — « valider à l\'entrée, échapper à la sortie »', 'pin',
            '    <p>Deux portes pour la même maison : on <strong>valide</strong> ce qui <em>entre</em> ' +
            '(longueur, format, caractères interdits) et on <strong>échappe</strong> ce qui <em>sort</em> ' +
            'vers une page (les chevrons deviennent &amp;lt;). Une seule des deux portes oubliée suffit ' +
            'à l\'attaque.</p>')
        ].join('\\n')
      }
    ],

    questions: [
      { stem: 'SELinux applique…', opts: ['du DAC', 'du MAC', 'du RBAC'], correct: 1, exp: 'SELinux et AppArmor imposent une politique centrale obligatoire : MAC.' },
      { stem: 'NTFS gère les accès par…', opts: ['ACL', 'rôles', 'attributs'], correct: 0, exp: 'NTFS utilise des listes explicites d\'entrées par ressource : ACL.' },
      { stem: 'Un accès accordé « aux heures de bureau seulement » relève de…', opts: ['RBAC', 'ABAC', 'DAC'], correct: 1, exp: 'Critères dynamiques (heure, lieu, appareil) : ABAC.' },
      { stem: 'EternalBlue est une faille…', opts: ['de OpenSSL', 'de Bash', 'de SMB Windows'], correct: 2, exp: 'EternalBlue ciblait SMB ; Heartbleed OpenSSL ; Shellshock Bash.' },
      { stem: 'La saisie Robert\');-- cherche…', opts: ['une XSS', 'une injection SQL', 'un MITM'], correct: 1, exp: 'Fermer la chaîne et commenter la fin de requête : signature d\'injection SQL.' },
      { stem: 'La parade à la XSS est…', opts: ['les requêtes paramétrées', 'échapper les chevrons en sortie', 'un VPN'], correct: 1, exp: 'Le script injecté ne s\'exécute pas si les chevrons sont échappés à l\'affichage.' },
      { stem: 'Un produit sans correctif depuis 120 jours est…', opts: ['dans les temps', 'hors délai', 'critique'], correct: 2, exp: 'Au-delà de 90 jours, la situation est critique selon la grille du cours.' },
      { stem: 'Le pentesting sert à…', opts: ['corriger les failles automatiquement', 'chercher les failles avant l\'attaquant', 'chiffrer la base'], correct: 1, exp: 'Tester en conditions réelles pour découvrir ce que l\'attaquant découvrirait.' }
    ],

    pitfalls: [
      '<strong>Confondre DAC et MAC</strong> : le propriétaire décide (DAC) n\'a rien à voir avec la politique imposée (MAC).',
      '<strong>Donner les droits admin « pour dépanner »</strong> : le moindre privilège n\'a pas d\'exception durable.',
      '<strong>Reporter les correctifs de sécurité</strong> : 60 jours ont suffi à WannaCry.',
      '<strong>Construire des requêtes par concaténation</strong> : paramétré ou exposé, pas d\'entre-deux.',
      '<strong>Valider l\'entrée mais oublier la sortie</strong> : la XSS passe par l\'affichage non échappé.'
    ],

    methodTitle: 'Durcir un système en cinq gestes',
    method: [
      '<strong>Inventorier</strong> les comptes et ressources, supprimer les comptes dormants.',
      '<strong>Poser les permissions</strong> au droit minimal : propriétaire, groupe, autres — puis ACL si besoin.',
      '<strong>Choisir le modèle d\'accès</strong> adapté : RBAC pour l\'organisation, MAC pour le sensible.',
      '<strong>Planifier les correctifs</strong> : inventaire, qualification, test, déploiement par vagues, vérification.',
      '<strong>Blind er le code</strong> : validation des entrées, requêtes paramétrées, échappement des sorties, OWASP en check-list.'
    ],

    summary: [
      'UID, GID, permissions lecture/écriture/exécution : le droit minimal par ressource.',
      'DAC = propriétaire ; MAC = politique imposée (SELinux) ; RBAC = rôles ; ABAC = attributs ; ACL = listes explicites (NTFS).',
      'Heartbleed, Shellshock, EternalBlue : corrigés avant d\'avoir été massivement exploités — sur les machines en retard.',
      'Le cycle de correctifs : inventer, qualifier, tester, déployer, vérifier — au-delà de 90 jours, critique.',
      'Secure coding : valider à l\'entrée, requêtes paramétrées, échapper à la sortie ; OWASP en référentiel.'
    ],

    checklist: [
      'Je place les cinq modèles de contrôle d\'accès avec un exemple chacun.',
      'Je déroule le cycle de correctifs et je justifie la criticité des retards.',
      'Je reconnais une tentative d\'injection SQL et une XSS sur un formulaire.',
      'Je liste les quatre cas d\'usage des permissions (paie, admin, serveur, cloud).'
    ],

    notions: ['DAC', 'MAC', 'RBAC', 'ABAC', 'ACL', 'patch management', 'injection SQL', 'XSS'],

    mastery: [
      { cls: 'low', text: '&lt; 50 % — Refais le tableau des cinq modèles de mémoire.' },
      { cls: 'mid', text: '50–69 % — Classe dix politiques d\'accès dans le bon modèle.' },
      { cls: 'good', text: '70–89 % — Solide : rédige le plan de correctifs d\'un parc de 20 machines.' },
      { cls: 'top', text: '≥ 95 % — Maîtrise : passe au chapitre 5, la gestion des incidents.' }
    ],

    flashcards: [
      { q: 'Les cinq modèles de contrôle d\'accès ?', a: 'DAC (propriétaire), MAC (politique imposée, ex. SELinux), RBAC (rôles), ABAC (attributs dynamiques), ACL (listes explicites, ex. NTFS).' },
      { q: 'Le cycle de la gestion des correctifs ?', a: 'Inventorier, suivre les bulletins, qualifier la criticité, tester, déployer par vagues, vérifier.' },
      { q: 'Injection SQL : parade ?', a: 'Requêtes paramétrées + validation des entrées (apostrophes, tirets doubles).' },
      { q: 'XSS : parade ?', a: 'Échapper toute sortie affichée (les chevrons deviennent &amp;lt;) et filtrer les entrées.' }
    ]
  },

  /* ==================== Chapitre 5 ==================== */
  {
    n: 5,
    title: 'Détection et réponse aux incidents',
    short: 'Incidents',
    toc: 'SIEM et analyse de logs, les étapes de la réponse (identifier, contenir, éradiquer, rétablir), forensique, PCA/PRA.',
    time: '≈ 2 h 30 de travail',

    situation:
      'Le SIEM réveille l\'équipe à 3 h : 300 échecs de connexion depuis une même IP, puis un succès. ' +
      'La question n\'est pas « qui ? » mais « dans quel ordre agir ? ». Ce chapitre donne la méthode : ' +
      'détecter dans les logs, contenir avant de comprendre, éradiquer, rétablir, puis apprendre.',

    objectives: [
      'décrire le rôle d\'un SIEM et les sources de logs qu\'il corrèle ;',
      'détecter une force brute dans un journal d\'authentification ;',
      'dérouler les étapes de la réponse à incident dans l\'ordre ;',
      'relier PCA, PRA, RTO et RPO à la continuité d\'activité.'
    ],

    sections: [
      {
        title: 'Le SIEM : centraliser et corréler',
        html: [
          '<p>Un <strong>SIEM</strong> (Security Information and Event Management) combine deux fonctions : ' +
          'la gestion des informations de sécurité (collecte, stockage, analyse des logs) et la gestion des ' +
          'événements (surveillance en temps réel, alertes). Il agrège les sources — pare-feu, routeurs, ' +
          'serveurs, annuaires (LDAP, Active Directory), antivirus, IDS/IPS, EDR — les normalise, puis ' +
          '<strong>corréle</strong> : des échecs de connexion suivis d\'une élévation de privilèges, c\'est ' +
          'une force brute ; un trafic sortant anormal depuis une IP interne, un mouvement latéral.</p>',
          '<p>Exemples de solutions citées en cours : Splunk Enterprise Security, IBM QRadar, ArcSight, ' +
          'Elastic SIEM (ELK), Microsoft Sentinel. Limites à connaître : coût, complexité de réglage, et ' +
          'le piège des faux positifs qui noient l\'analyste.</p>',
          box('tech', 'Ce que la corrélation voit, la ligne de log seule ne montre pas', 'chart',
            '    <p>Une ligne dit « échec ». Cent lignes de la même IP en dix minutes disent « attaque ». ' +
            'C\'est toute la valeur du SIEM : transformer des milliers de lignes isolées en quelques ' +
            'scénarios nommés.</p>')
        ].join('\\n')
      },
      {
        title: 'L\'analyse des logs',
        html: [
          '<p>Le <strong>log</strong> est l\'enregistrement automatique d\'un événement. Les journaux ' +
          'clés : <code>/var/log/auth.log</code> sous Linux (connexions, élévation), l\'Observateur ' +
          'd\'événements Windows, les logs de pare-feu (connexions bloquées), les logs web Apache/Nginx ' +
          '(requêtes), les journaux d\'authentification (tentatives, changements de mots de passe).</p>',
          '<p>L\'analyse manuelle ou outillée (ELK, Graylog, OSSEC, Wireshark pour le réseau) sert à ' +
          'quatre choses : détecter les intrusions (scans de ports, échecs en rafale), surveiller les ' +
          'comptes (connexions depuis des lieux inattendus), investiguer après incident (retracer la ' +
          'chronologie), et prouver la conformité (RGPD, PCI DSS exigent la rétention des journaux).</p>',
          '<pre><code>ECHEC  03:02:11  45.61.10.9\n' +
          'ECHEC  03:02:15  45.61.10.9\n' +
          'ECHEC  03:02:20  45.61.10.9\n' +
          'SUCCES 03:03:00  45.61.10.9     ← la force brute a abouti</code></pre>',
          box('pitfall', 'Piège — un succès après des échecs', 'warning',
            '    <p>La rafale d\'échecs n\'est pas l\'incident ; le succès qui suit l\'est peut-être. ' +
            'L\'alerte se règle typiquement à 3 échecs ou plus pour une même IP : à ce seuil, on vérifie, ' +
            'on prévient le propriétaire du compte, on bloque si besoin.</p>')
        ].join('\\n')
      },
      {
        title: 'Les étapes de la réponse à incident',
        html: [
          '<p>La réponse suit un ordre qui ne se discute pas :</p>',
          '<table>\n' +
          '    <tr><th>Étape</th><th>Action</th><th>Exemple</th></tr>\n' +
          '    <tr><td>1. <strong>Identifier</strong></td><td>confirmer l\'incident, son étendue et sa chronologie</td><td>corrélé dans le SIEM, compte compromis confirmé</td></tr>\n' +
          '    <tr><td>2. <strong>Contenir</strong></td><td>stopper la propagation sans détruire les preuves</td><td>isoler la machine du réseau (pas l\'éteindre)</td></tr>\n' +
          '    <tr><td>3. <strong>Éradiquer</strong></td><td>supprimer la cause : malware, portes dérobées, comptes pirates</td><td>re-imageage du poste, réinitialisation des identifiants</td></tr>\n' +
          '    <tr><td>4. <strong>Rétablir</strong></td><td>remettre en service et surveiller de près</td><td>restauration depuis sauvegarde saine, surveillance renforcée</td></tr>\n' +
          '  </table>',
          '<p>Suivent l\'<strong>analyse post-incident</strong> (retour d\'expérience) et la ' +
          '<strong>forensique</strong> : préserver les preuves (images disque, journaux horodatés, chaîne ' +
          'de conservation) pour comprendre et, le cas échéant, pour la justice. C\'est pourquoi on isole ' +
          'la machine au lieu de l\'éteindre : la mémoire vive disparaît à la coupure.</p>',
          box('mnemo', 'Mnémotechnique — « ICER » : identifier, contenir, éradiquer, rétablir', 'pin',
            '    <p><strong>I</strong>dentifier, <strong>C</strong>ontenir, <strong>E</strong>radiquer, ' +
            '<strong>R</strong>établir — dans cet ordre, toujours. Contenir avant d\'éradiquer : on coupe ' +
            'la route avant de retirer l\'obstacle. Eradiquer avant de rétablir : on ne remet pas un ' +
            'système encore infecté en production.</p>')
        ].join('\\n')
      },
      {
        title: 'PCA, PRA, RTO, RPO',
        html: [
          '<p>Le <strong>PCA</strong> (plan de continuité d\'activité) décrit comment l\'activité ' +
          'essentielle continue pendant la crise ; le <strong>PRA</strong> (plan de reprise) comment les ' +
          'systèmes reviennent à la normale. Deux objectifs chiffrés les gouvernent :</p>',
          '<ul>',
          '  <li><strong>RTO</strong> (Recovery Time Objective) : combien de temps l\'entreprise peut ' +
          'rester à l\'arrêt avant que la situation ne devienne critique ;</li>',
          '  <li><strong>RPO</strong> (Recovery Point Objective) : quelle quantité de données on peut se ' +
          'permettre de perdre (une heure de saisie ? un jour ?).</li>',
          '</ul>',
          '<p>Le RPO fixe la fréquence des sauvegardes ; le RTO fixe l\'architecture de reprise. Un PRA ' +
          'non documenté et non testé vaut zéro : en crise, le stress empêche l\'improvisation, la ' +
          'procédure doit être actionnable par un tiers.</p>',
          box('tech', 'Le binôme à retenir', 'clock',
            '    <p>RTO = <strong>temps</strong> (durée d\'interruption maximale) ; RPO = ' +
            '<strong>données</strong> (perte maximale admissible). Sauvegardes toutes les heures et RPO ' +
            'd\'une journée : incohérence. Le PRA aligne toujours les deux.</p>')
        ].join('\\n')
      }
    ],

    questions: [
      { stem: 'Un SIEM apporte surtout…', opts: ['du stockage de fichiers', 'de la corrélation d\'événements', 'du chiffrement'], correct: 1, exp: 'Il agrège et corrèle les sources pour détecter les scénarios d\'attaque.' },
      { stem: '3 échecs puis 1 succès depuis la même IP : c\'est…', opts: ['un faux positif à ignorer', 'une force brute probablement réussie', 'une panne réseau'], correct: 1, exp: 'Rafale d\'échecs suivie d\'un succès : signature de force brute aboutie, à traiter.' },
      { stem: 'Première étape de la réponse ?', opts: ['éradiquer', 'contenir', 'identifier'], correct: 2, exp: 'On confirme d\'abord l\'incident et son étendue avant d\'agir.' },
      { stem: 'Contenir, c\'est…', opts: ['éteindre la machine', 'isoler la machine du réseau', 'formater le disque'], correct: 1, exp: 'Isoler stoppe la propagation en préservant la mémoire vive et les preuves.' },
      { stem: 'La forensique exige…', opts: ['d\'éteindre immédiatement', 'de préserver les preuves', 'de réinstaller vite'], correct: 1, exp: 'Images disque, journaux horodatés, chaîne de conservation : la preuve disparaît si l\'on bricole.' },
      { stem: 'Le RPO mesure…', opts: ['la durée d\'arrêt maximale', 'la perte de données maximale', 'le coût de reprise'], correct: 1, exp: 'RPO = combien de données on peut perdre ; RTO = combien de temps on peut s\'arrêter.' },
      { stem: 'Le PCA décrit…', opts: ['la continuité de l\'activité pendant la crise', 'la restauration des systèmes', 'le budget sécurité'], correct: 0, exp: 'Le PCA fait tourner l\'essentiel pendant la crise ; le PRA rétablit ensuite.' },
      { stem: 'Un PRA utile est…', opts: ['rangé dans un classeur', 'documenté et testé', 'connu du seul administrateur'], correct: 1, exp: 'En crise, la procédure doit être actionnable par un tiers : documentée et testée.' }
    ],

    pitfalls: [
      '<strong>Éteindre la machine compromise</strong> : on isole du réseau, la mémoire vive est une preuve.',
      '<strong>Éradiquer avant de contenir</strong> : la propagation continue pendant qu\'on nettoie.',
      '<strong>Nommer « incident » sans chronologie</strong> : l\'analyse des logs reconstitue la suite des événements.',
      '<strong>Confondre RTO et RPO</strong> : l\'un est du temps, l\'autre des données.',
      '<strong>Croire la sauvegarde bonne sans test</strong> : une restauration jamais testée n\'existe pas.'
    ],

    methodTitle: 'Traiter une alerte en cinq temps',
    method: [
      '<strong>Lire le log</strong> : résultat, horodatage, source — et corréler avec les lignes voisines.',
      '<strong>Qualifier</strong> : le seuil d\'alerte est-il atteint (ex. 3 échecs même IP) ? Quelle composante CIA ?',
      '<strong>Contenir</strong> : isoler, bloquer, révoquer — sans détruire les preuves.',
      '<strong>Éradiquer puis rétablir</strong> : supprimer la cause, restaurer d\'une source saine, surveiller renforcé.',
      '<strong>Apprendre</strong> : retour d\'expérience, mise à jour des règles SIEM et du PRA.'
    ],

    summary: [
      'SIEM = collecte + corrélation + alertes en temps réel ; sources : pare-feu, serveurs, annuaires, EDR.',
      'Auth.log, observateur d\'événements, logs pare-feu et web : les journaux clés de l\'analyste.',
      'Force brute détectable : rafale d\'échecs d\'une même IP, suivie ou non d\'un succès.',
      'Réponse : identifier, contenir, éradiquer, rétablir — puis analyse post-incident et forensique.',
      'RTO = temps d\'arrêt maximal ; RPO = perte de données maximale ; le PRA les documente et les teste.'
    ],

    checklist: [
      'J\'explique ce qu\'un SIEM corrèle et pourquoi la corrélation détecte.',
      'Je repère une force brute dans un journal et je donne le seuil d\'alerte.',
      'Je déroule ICER dans l\'ordre avec un exemple concret par étape.',
      'Je définis RTO et RPO et je les relie aux sauvegardes.'
    ],

    notions: ['SIEM', 'corrélation', 'log d\'authentification', 'identifier', 'contenir', 'éradiquer', 'RTO', 'RPO'],

    mastery: [
      { cls: 'low', text: '&lt; 50 % — Récite ICER et le rôle de chaque étape.' },
      { cls: 'mid', text: '50–69 % — Analyse un journal de 20 lignes : qui attaque, quand, avec quel succès ?' },
      { cls: 'good', text: '70–89 % — Solide : rédige la réponse complète à une force brute réussie.' },
      { cls: 'top', text: '≥ 95 % — Maîtrise : passe au chapitre 6, la conformité et les bonnes pratiques.' }
    ],

    flashcards: [
      { q: 'Que fait un SIEM ?', a: 'Il collecte les logs de toutes les sources, les normalise, les corrèle en temps réel et alerte : ex. échecs en rafale + élévation de privilèges = force brute.' },
      { q: 'Les quatre étapes de la réponse à incident ?', a: 'Identifier, contenir (isoler sans détruire les preuves), éradiquer (supprimer la cause), rétablir (remettre en service surveillé).' },
      { q: 'Pourquoi isoler plutôt qu\'éteindre ?', a: 'La mémoire vive et les journaux sont des preuves forensiques : la coupure les efface.' },
      { q: 'RTO vs RPO ?', a: 'RTO : durée d\'interruption maximale tolérée. RPO : perte de données maximale tolérée. Le PRA les documente et les teste.' }
    ]
  },

  /* ==================== Chapitre 6 ==================== */
  {
    n: 6,
    title: 'Conformité et bonnes pratiques',
    short: 'Conformité',
    toc: 'RGPD et sanctions, NIS2 et normes sectorielles, ISO 27001 et NIST, sensibilisation, mots de passe, sauvegarde 3-2-1.',
    time: '≈ 2 h de travail',

    situation:
      'Le DPO demande un registre des traitements, l\'assureur demande une preuve de sauvegarde testée, ' +
      'et un salarié vient de signaler un courriel douteux. Trois demandes, un même chapitre : la ' +
      'conformité donne le cadre, les bonnes pratiques font le travail quotidien.',

    objectives: [
      'situer le RGPD, NIS2, PCI DSS et ISO 27001 et leurs sanctions ;',
      'rattacher une pratique de sécurité à la norme qui l\'exige ;',
      'appliquer le PoLP, le gestionnaire de mots de passe et la sensibilisation ;',
      'auditer une stratégie de sauvegarde contre la règle 3-2-1.'
    ],

    sections: [
      {
        title: 'RGPD : principes et sanctions',
        html: [
          '<p>Le <strong>RGPD</strong> (Règlement général sur la protection des données) est adopté en ' +
          '2016, en vigueur depuis le <strong>25 mai 2018</strong>. Il s\'applique à toute organisation ' +
          'traitant des données personnelles de résidents de l\'UE. Six principes gouvernent le traitement : ' +
          'légalité/loyauté/transparence, limitation des finalités, <strong>minimisation</strong> des ' +
          'données, exactitude, limitation de la conservation, intégrité et confidentialité.</p>',
          '<p>La sanction maximale : <strong>20 millions d\'euros ou 4 % du chiffre d\'affaires annuel ' +
          'mondial</strong>, le montant le plus élevé retenu. Les facteurs d\'appréciation : gravité, ' +
          'intention ou négligence, mesures correctives prises. Côté obligations techniques : chiffrement, ' +
          'pseudonymisation, gestion des consentements, notification des violations.</p>',
          box('tech', 'Le plafond en une ligne', 'scale',
            '    <p>Amende plafond = max(20 M€ ; 4 % du CA mondial). Pour une entreprise à 1 milliard de ' +
            'CA, 4 % vaut 40 M€ : le plafond réel est 40 M€. Toujours comparer les deux chiffres.</p>')
        ].join('\\n')
      },
      {
        title: 'NIS2 et normes sectorielles',
        html: [
          '<p>La directive <strong>NIS</strong> (Network and Information Systems, 2016) impose un niveau ' +
          'élevé de sécurité aux infrastructures essentielles et services numériques de l\'UE. ' +
          '<strong>NIS2</strong> (décembre 2022) élargit le champ (administration publique, gestion des ' +
          'déchets, chimie…), renforce la responsabilité des dirigeants, harmonise les sanctions et ' +
          'promeut le partage d\'informations entre États.</p>',
          '<p>Les <strong>normes sectorielles</strong> complètent le droit général : <strong>PCI DSS</strong> ' +
          '(industri des paiements, 12 exigences pour protéger les données de cartes), <strong>HIPAA</strong> ' +
          '(santé, États-Unis). Côté cadres de gestion : <strong>ISO/IEC 27001</strong> certifie un SMSI ' +
          '(système de management de la sécurité de l\'information) et le <strong>NIST Cybersecurity ' +
          'Framework</strong> structure démarche et maturité (niveaux partiel, géré, répété, optimisé).</p>',
          box('mnemo', 'Mnémotechnique — « qui exige quoi ? »', 'pin',
            '    <p>RGPD = <strong>données personnelles</strong> (UE) ; NIS2 = <strong>infrastructures ' +
            'essentielles</strong> (UE) ; PCI DSS = <strong>cartes bancaires</strong> ; HIPAA = ' +
            '<strong>santé</strong> (US) ; ISO 27001 = <strong>certification du SMSI</strong> ; NIST CSF = ' +
            '<strong>cadre de gestion des risques</strong>. À chaque secteur son référentiel.</p>')
        ].join('\\n')
      },
      {
        title: 'Sensibilisation et politiques',
        html: [
          '<p>L\'utilisateur est le maillon critique : le but de la sensibilisation est de le transformer ' +
          'de <strong>cible potentielle</strong> en <strong>capteur de menaces</strong>. Les leviers qui ' +
          'marchent : simulations de phishing régulières et non punitives, micro-apprentissage (3 à 5 ' +
          'minutes, toute l\'année), hygiène numérique (MFA partout, verrouillage de session, gestionnaire ' +
          'de mots de passe), et une <strong>procédure de signalement</strong> simple et valorisante — ' +
          'l\'utilisateur ne doit jamais avoir peur de rapporter une erreur.</p>',
          '<p>Les <strong>politiques</strong> fixent le cadre : charte informatique signée, <strong>PoLP</strong> ' +
          '(moindre privilège), politique de mobilité (VPN obligatoire sur Wi-Fi public, chiffrement des ' +
          'portables), BYOD encadré, bureau propre en fin de journée. Une politique efficace suit « ' +
          'comprendre, appliquer, vérifier ».</p>',
          box('pitfall', 'Piège — la session annuelle de formation', 'warning',
            '    <p>Une seule session longue par an est indigeste et oubliée. Le format qui ancre : ' +
            'modules courts répétés + simulations + signalement valorisé. Le maillon faible se renforce ' +
            'par l\'habitude, pas par l\'examen.</p>')
        ].join('\\n')
      },
      {
        title: 'Mots de passe et sauvegarde 3-2-1',
        html: [
          '<p>Le <strong>gestionnaire de mots de passe</strong> résout l\'impossible mémoire humaine : ' +
          'secret aléatoire unique par service (contre le credential stuffing), coffre chiffré derrière un ' +
          'mot de passe maître robuste, partage d\'équipe sans transmission en clair, et remplissage ' +
          'automatique qui <strong>refuse les URLs frauduleuses</strong> — une protection anti-phishing ' +
          'passive. La fin de l\'expiration systématique : on ne change le mot de passe que sur suspicion ' +
          'de compromission, et la MFA rend le renouvellement secondaire.</p>',
          '<p>La <strong>règle 3-2-1</strong> est le standard d\'or de la sauvegarde : <strong>3</strong> ' +
          'copies des données (production + 2 sauvegardes), sur <strong>2</strong> supports différents ' +
          '(NAS local + cloud ou bande), dont <strong>1</strong> hors site. Son évolution ' +
          '<strong>3-2-1-1-0</strong> ajoute 1 copie <strong>immuable</strong> (hors ligne, air-gap, contre ' +
          'les ransomwares) et <strong>0 erreur</strong> vérifiée. La restauration se teste : ' +
          '<strong>granulaire</strong> (un fichier perdu) et <strong>complète</strong> (sinistre majeur) — ' +
          '« une sauvegarde jamais restaurée n\'existe pas ».</p>',
          box('mnemo', 'Mnémotechnique — « trois, deux, un, et zéro erreur »', 'pin',
            '    <p><strong>3</strong> copies, <strong>2</strong> supports, <strong>1</strong> hors site, ' +
            '(<strong>1</strong> immuable, <strong>0</strong> erreur vérifiée). Le ransomware chiffre ce ' +
            'qu\'il atteint : la copie immuable hors ligne est la seule qu\'il ne touche pas.</p>')
        ].join('\\n')
      }
    ],

    questions: [
      { stem: 'Le plafond RGPD est…', opts: ['20 M€ ou 4 % du CA mondial', '10 M€ ou 2 % du CA', '50 M€ fixe'], correct: 0, exp: 'Le plus élevé des deux : 20 millions d\'euros ou 4 % du chiffre d\'affaires annuel mondial.' },
      { stem: 'Le RGPD est en vigueur depuis…', opts: ['le 25 mai 2018', 'le 1er janvier 2016', 'le 25 décembre 2022'], correct: 0, exp: 'Adopté en 2016, applicable depuis le 25 mai 2018.' },
      { stem: 'NIS2 a élargi…', opts: ['les secteurs concernés et la responsabilité des dirigeants', 'les amendes du seul secteur bancaire', 'la durée de conservation des logs'], correct: 0, exp: 'Nouveau secteurs, gouvernance renforcée, sanctions harmonisées.' },
      { stem: 'PCI DSS protège…', opts: ['les données de santé', 'les données de cartes bancaires', 'les données publiques'], correct: 1, exp: 'Norme de l\'industrie des paiements : 12 exigences pour les données de cartes.' },
      { stem: 'ISO 27001 certifie…', opts: ['un produit', 'un SMSI', 'un prestataire'], correct: 1, exp: 'Le système de management de la sécurité de l\'information de l\'organisation.' },
      { stem: 'La simulation de phishing doit être…', opts: ['punitive', 'régulière et non punitive', 'annuelle et surprise'], correct: 1, exp: 'Apprendre sans humilier : l\'objectif est le capteur de menaces, pas le bouc émissaire.' },
      { stem: 'Le remplissage automatique du gestionnaire protège du phishing car…', opts: ['il chiffre le courriel', 'il refuse de remplir sur une URL frauduleuse', 'il bloque le réseau'], correct: 1, exp: 'Le gestionnaire ne remplit pas les identifiants si l\'URL ne correspond pas.' },
      { stem: 'La copie immuable de la règle 3-2-1-1-0 sert contre…', opts: ['les pannes de disque', 'les ransomwares', 'les erreurs de saisie'], correct: 1, exp: 'Hors ligne ou air-gap : le ransomware ne peut ni l\'atteindre ni la chiffrer.' }
    ],

    pitfalls: [
      '<strong>Confondre RGPD et NIS2</strong> : données personnelles contre infrastructures essentielles.',
      '<strong>Citer 20 M€ sans le 4 %</strong> : le plafond est le plus élevé des deux montants.',
      '<strong>Changer les mots de passe pour rien</strong> : renouvellement sur suspicion, pas au calendrier.',
      '<strong>Partager un mot de passe par courriel</strong> : le gestionnaire d\'équipe existe pour cela.',
      '<strong>Appeler « sauvegarde » une copie sur le même disque</strong> : ni support distinct, ni hors site.'
    ],

    methodTitle: 'Auditer une organisation en cinq points',
    method: [
      '<strong>Cartographier les obligations</strong> : RGPD (données perso), NIS2 (essentiel), PCI DSS (paiement), ISO 27001 (SMSI).',
      '<strong>Vérifier les preuves</strong> : registre des traitements, politiques signées, journaux conservés.',
      '<strong>Mesurer l\'humain</strong> : simulations de phishing, signalements reçus, MFA activé partout.',
      '<strong>Auditer les accès</strong> : PoLP appliqué, comptes nominatifs, revues de droits régulières.',
      '<strong>Tester la résilience</strong> : sauvegarde 3-2-1 respectée, restauration granulaire et complète réellement testées.'
    ],

    summary: [
      'RGPD : six principes, en vigueur le 25 mai 2018, plafond 20 M€ ou 4 % du CA mondial.',
      'NIS2 (2022) élargit les secteurs et responsabilise les dirigeants ; PCI DSS (paiement) et HIPAA (santé) sont sectoriels.',
      'ISO 27001 certifie un SMSI ; le NIST CSF structure la gestion des risques et la maturité.',
      'Sensibilisation : simulations non punitives, micro-apprentissage, signalement valorisé ; PoLP et politiques signées.',
      'Gestionnaire de mots de passe obligatoire ; sauvegarde 3-2-1 (voire 3-2-1-1-0) avec restaurations testées.'
    ],

    checklist: [
      'Je cite le plafond RGPD et je le calcule pour un CA donné.',
      'Je rattache chaque norme à son domaine et à sa sanction.',
      'Je liste les leviers de sensibilisation qui fonctionnent.',
      'J\'audite une stratégie de sauvegarde contre 3-2-1 et je propose la copie immuable.'
    ],

    notions: ['RGPD', 'NIS2', 'PCI DSS', 'ISO 27001', 'NIST CSF', 'PoLP', 'gestionnaire de mots de passe', 'sauvegarde 3-2-1'],

    mastery: [
      { cls: 'low', text: '&lt; 50 % — Refais la table « qui exige quoi » sans notes.' },
      { cls: 'mid', text: '50–69 % — Calcule trois plafonds RGPD pour trois CA différents.' },
      { cls: 'good', text: '70–89 % — Solide : audite la sauvegarde de ton ordinateur contre 3-2-1.' },
      { cls: 'top', text: '≥ 95 % — Maîtrise : le cours est complet, passe à l\'atelier et aux examens blancs.' }
    ],

    flashcards: [
      { q: 'Plafond RGPD ?', a: '20 millions d\'euros ou 4 % du chiffre d\'affaires annuel mondial — le plus élevé des deux.' },
      { q: 'Qui exige quoi ?', a: 'RGPD : données personnelles (UE). NIS2 : infrastructures essentielles (UE). PCI DSS : cartes bancaires. HIPAA : santé (US). ISO 27001 : certification du SMSI.' },
      { q: 'La règle 3-2-1 ?', a: '3 copies des données, 2 supports différents, 1 hors site. Évolution 3-2-1-1-0 : + 1 copie immuable (air-gap), 0 erreur vérifiée.' },
      { q: 'Pourquoi un gestionnaire de mots de passe ?', a: 'Secret unique et aléatoire par service, coffre chiffré, partage sans clair, remplissage qui refuse les URLs frauduleuses (anti-phishing).' }
    ]
  }
];

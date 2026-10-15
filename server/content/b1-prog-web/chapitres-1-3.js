/**
 * Chapitres 1 à 3 du cours de programmation web B1.
 *
 * Chaque chapitre fournit la matière que `kit.chapter` met en page. Aucun titre
 * <h2> ici : la numérotation est ajoutée au rendu.
 */
'use strict';

const { box } = require('../../../scripts/course-kit');

/** Bloc de code coloré par l'atelier : on reste sur du <pre><code>. */
function code(lignes) {
  return '<pre><code>' + lignes.join('\n') + '</code></pre>';
}

module.exports = [
  /* ==================== Chapitre 1 ==================== */
  {
    n: 1,
    title: 'Le Web : clients, serveurs, URL et HTTP',
    short: 'Le Web',
    toc: 'Client et serveur, requête HTTP, anatomie d’une URL, méthodes, codes de statut, rôle de HTML, CSS et JavaScript.',
    time: '≈ 2 h 30 de travail',
    free: true,

    situation:
      'Tu tapes une adresse dans la barre du navigateur et la page apparaît. Entre ces deux instants, il y a ' +
      'un dialogue complet entre deux ordinateurs : une demande précise, une réponse, puis un document qu’il ' +
      'faut interpréter. Quand une page affiche « 404 » ou charge des images cassées, toute la lecture du ' +
      'problème se fait dans ce dialogue. Ce chapitre t’apprend à le voir.',

    objectives: [
      'décrire le rôle du client, du serveur et du protocole HTTP ;',
      'décomposer une URL en protocole, hôte, chemin et paramètres de requête ;',
      'reconnaître les méthodes HTTP et dire lesquelles sont idempotentes ;',
      'interpréter un code de statut par sa famille (1xx à 5xx) ;',
      'situer les responsabilités de HTML, CSS et JavaScript dans une page.'
    ],

    sections: [
      {
        title: 'Un dialogue entre deux programmes',
        html: [
          '<p><strong>Le client</strong> est le programme qui demande (le navigateur, un script, une ' +
          'application mobile). <strong>Le serveur</strong> est le programme qui répond, en attendant les ' +
          'demandes sur un port. Entre les deux circule du texte : la requête du client, puis la réponse du ' +
          'serveur. Le protocole qui fixe la forme de ces messages s’appelle <strong>HTTP</strong>.</p>',
          '<p>Une requête HTTP contient toujours trois choses : une <strong>méthode</strong> (ce qu’on veut ' +
          'faire), une <strong>ressource</strong> (le chemin demandé) et des <strong>en-têtes</strong> ' +
          '(métadonnées : langue, type de contenu accepté, cookies). La réponse contient un <strong>code de ' +
          'statut</strong>, ses propres en-têtes et un <strong>corps</strong> — le plus souvent du HTML.</p>',
          code([
            'GET /cours/index.html HTTP/1.1        ← la requête du client',
            'Host: campus.exemple.fr',
            'Accept-Language: fr',
            '',
            'HTTP/1.1 200 OK                      ← la réponse du serveur',
            'Content-Type: text/html; charset=utf-8',
            '',
            '<!DOCTYPE html> …'
          ]),
          box('intuition', 'Intuition — le serveur ne devine rien', 'compass',
            '    <p>Un serveur ne « sait » pas ce que tu regardes à l’écran. Il reçoit un chemin et rend un ' +
            'fichier. Si les images ne s’affichent pas, c’est souvent que le navigateur a redemandé une ' +
            'ressource dont l’adresse était fausse : autant de requêtes, autant de réponses.</p>')
        ].join('\n')
      },
      {
        title: 'Anatomie d’une URL',
        html: [
          '<p>Une <strong>URL</strong> (Uniform Resource Locator) désigne une ressource de façon unique. Elle ' +
          'se lit toujours dans le même ordre :</p>',
          code([
            'https://campus.exemple.fr:443/cours/index.html?page=2&tri=asc#section-3',
            '└┬─┘   └───────┬───────┘└┬┘└────────┬────────┘└─────┬─────┘└───┬────┘',
            'protocole      hôte     port     chemin          requête     fragment'
          ]),
          '<table>\n' +
          '    <tr><th>Composante</th><th>Rôle</th><th>Exemple</th></tr>\n' +
          '    <tr><td>protocole</td><td>la langue du dialogue</td><td><code>https</code></td></tr>\n' +
          '    <tr><td>hôte</td><td>quel serveur joindre</td><td><code>campus.exemple.fr</code></td></tr>\n' +
          '    <tr><td>port</td><td>quel service sur ce serveur (facultatif)</td><td><code>443</code></td></tr>\n' +
          '    <tr><td>chemin</td><td>quelle ressource</td><td><code>/cours/index.html</code></td></tr>\n' +
          '    <tr><td>requête</td><td>des paramètres, après le <code>?</code></td><td><code>page=2&amp;tri=asc</code></td></tr>\n' +
          '    <tr><td>fragment</td><td>une ancre dans la page, jamais envoyée au serveur</td><td><code>#section-3</code></td></tr>\n' +
          '  </table>',
          '<p>Deux points se retiennent : le <strong>chemin</strong> commence toujours par une barre oblique, ' +
          'même quand tu ne l’écris pas (taper <code>https://exemple.fr</code> demande en réalité ' +
          '<code>/</code>) ; et le <strong>fragment</strong> reste dans le navigateur — le serveur ne le ' +
          'reçoit jamais.</p>',
          box('pitfall', 'Piège — paramètres de requête et chemins différents', 'warning',
            '    <p><code>/notes?page=2</code> et <code>/notes?page=3</code> mènent au <em>même</em> chemin : ' +
            'la différence tient dans la requête. Pour un serveur, ce sont deux demandes distinctes de la ' +
            'même ressource. Confondre les deux fait chercher longtemps un fichier qui n’existe pas.</p>')
        ].join('\n')
      },
      {
        title: 'Les méthodes HTTP',
        html: [
          '<p>La méthode dit l’intention. Neuf méthodes existent ; cinq suffisent au quotidien :</p>',
          '<table>\n' +
          '    <tr><th>Méthode</th><th>Ce qu’elle demande</th><th>Idempotente ?</th></tr>\n' +
          '    <tr><td><code>GET</code></td><td>lire une ressource, sans la modifier</td><td>oui</td></tr>\n' +
          '    <tr><td><code>POST</code></td><td>créer une ressource, envoyer des données</td><td>non</td></tr>\n' +
          '    <tr><td><code>PUT</code></td><td>remplacer une ressource par celle envoyée</td><td>oui</td></tr>\n' +
          '    <tr><td><code>PATCH</code></td><td>modifier une partie d’une ressource</td><td>non</td></tr>\n' +
          '    <tr><td><code>DELETE</code></td><td>supprimer une ressource</td><td>oui</td></tr>\n' +
          '  </table>',
          '<p>Une méthode est <strong>idempotente</strong> quand rejouer la même requête laisse le serveur ' +
          'dans le même état que de l’avoir envoyée une fois. Refaire <code>DELETE /notes/12</code> ne ' +
          'supprime rien de plus ; refaire <code>POST /notes</code> crée une deuxième note. C’est ce qui rend ' +
          'une requête rejouable sans crainte après une coupure réseau — et ce qui oblige à protéger les ' +
          '<code>POST</code>.</p>',
          box('mnemo', 'Mnémotechnique — « POST pousse, PUT pose »', 'pin',
            '    <p><code>PUT</code> <em>pose</em> la ressource complète : deux fois la même requête donnent ' +
            'exactement le même résultat. <code>POST</code> <em>pousse</em> quelque chose de neuf dans la ' +
            'collection : chaque envoi ajoute une ligne.</p>')
        ].join('\n')
      },
      {
        title: 'Les codes de statut',
        html: [
          '<p>Le code de statut est un nombre à trois chiffres. Le <strong>premier chiffre</strong> donne la ' +
          'famille ; les deux suivants précisent le cas. Savoir lire la famille suffit pour diagnostiquer la ' +
          'plupart des problèmes.</p>',
          '<table>\n' +
          '    <tr><th>Famille</th><th>Sens</th><th>Exemples</th></tr>\n' +
          '    <tr><td><code>1xx</code></td><td>information : la demande est en cours de traitement</td><td>100, 101</td></tr>\n' +
          '    <tr><td><code>2xx</code></td><td>succès : la demande a abouti</td><td>200, 201, 204</td></tr>\n' +
          '    <tr><td><code>3xx</code></td><td>redirection : voir ailleurs</td><td>301, 302, 304</td></tr>\n' +
          '    <tr><td><code>4xx</code></td><td>erreur du client (la demande est fautive)</td><td>400, 403, 404, 422</td></tr>\n' +
          '    <tr><td><code>5xx</code></td><td>erreur du serveur (la demande était valable)</td><td>500, 502, 503</td></tr>\n' +
          '  </table>',
          '<p>La frontière entre <code>4xx</code> et <code>5xx</code> est la plus utile à connaître : ' +
          '<code>404</code> signifie « cette adresse n’existe pas chez moi », <code>500</code> signifie « mon ' +
          'code a planté pendant que je traitais ta demande valable ». Corriger une <code>404</code> se fait ' +
          'dans l’adresse ; corriger une <code>500</code> se fait dans le serveur.</p>',
          box('pitfall', 'Piège — confondre 401 et 403', 'warning',
            '    <p><code>401 Unauthorized</code> veut dire « je ne sais pas qui tu es » : il manque une ' +
            'identification. <code>403 Forbidden</code> veut dire « je sais qui tu es, et tu n’as pas le ' +
            'droit ». La première invite à se connecter ; la seconde interdit d’insister.</p>')
        ].join('\n')
      },
      {
        title: 'HTML, CSS, JavaScript : trois rôles distincts',
        html: [
          '<p>Une page web est faite de trois langages qui ne se remplacent pas :</p>',
          '<ul>\n' +
          '    <li><strong>HTML</strong> : la structure et le sens du contenu (un titre, une liste, un ' +
          'paragraphe). Sans HTML, rien à afficher.</li>\n' +
          '    <li><strong>CSS</strong> : la présentation (couleurs, tailles, disposition). Sans CSS, la page ' +
          'reste lisible mais brute.</li>\n' +
          '    <li><strong>JavaScript</strong> : le comportement (réagir à un clic, calculer, modifier la page ' +
          'après son chargement). Sans JavaScript, la page reste consultable mais figée.</li>\n' +
          '  </ul>',
          code([
            '<!DOCTYPE html>',
            '<html lang="fr">',
            '<head>',
            '  <meta charset="UTF-8">',
            '  <title>Mes notes</title>',
            '  <link rel="stylesheet" href="styles.css">   ← CSS',
            '</head>',
            '<body>',
            '  <h1>Mes notes</h1>                          ← HTML',
            '  <ul id="notes"></ul>',
            '  <script src="app.js" defer></script>        ← JavaScript',
            '</body>',
            '</html>'
          ]),
          box('tech', 'Le navigateur lit la page dans l’ordre', 'terminal',
            '    <p>Le serveur envoie le HTML en premier ; le navigateur le construit de haut en bas. Le CSS ' +
            'est appliqué dès qu’il est lu, et le JavaScript s’exécute quand il arrive — sauf s’il porte ' +
            'l’attribut <code>defer</code>, qui le fait attendre la fin de l’analyse du document. D’où la ' +
            'règle : un script qui manipule la page se place en fin de <code>body</code> ou avec ' +
            '<code>defer</code>.</p>')
        ].join('\n')
      },
      {
        title: 'Suivre le dialogue dans le navigateur',
        html: [
          '<p>Tout ce chapitre se vérifie à l’écran, sans installer quoi que ce soit. Les outils de ' +
          'développement du navigateur (touche <kbd>F12</kbd>) contiennent un onglet <strong>Réseau</strong> ' +
          'qui liste chaque requête, son statut, son type et sa durée.</p>',
          '<table>\n' +
          '    <tr><th>Ce que tu observes</th><th>Ce que cela signifie</th></tr>\n' +
          '    <tr><td>une ligne rouge en 404</td><td>le chemin demandé n’existe pas sur le serveur</td></tr>\n' +
          '    <tr><td>une ligne en 500</td><td>le serveur a échoué pendant le traitement</td></tr>\n' +
          '    <tr><td>une ligne en 304</td><td>la ressource n’a pas changé : le navigateur réutilise sa copie</td></tr>\n' +
          '    <tr><td>une ressource en « (blocked) »</td><td>une règle de sécurité ou une extension l’a refusée</td></tr>\n' +
          '  </table>',
          box('method', 'Réflexe de débogage', 'compass',
            '    <p>Devant une page qui ne s’affiche pas comme prévu, ouvre l’onglet Réseau et recharge. ' +
            'Cherche la première ligne en rouge : c’est presque toujours la cause, et les suivantes n’en sont ' +
            'que la conséquence.</p>')
        ].join('\n')
      }
    ],

    questions: [
      { stem: 'Dans le dialogue HTTP, qui envoie la requête ?', opts: ['Le serveur web', 'Le client (navigateur)', 'Le système DNS'], correct: 1, exp: 'Le client demande la ressource ; le serveur y répond.' },
      { stem: 'Dans l’URL https://campus.fr/cours/a.html?page=2, que vaut l’hôte ?', opts: ['campus.fr', '/cours/a.html', 'page=2'], correct: 0, exp: 'L’hôte suit le protocole et se termine avant la première barre oblique.' },
      { stem: 'Quel élément du chemin est réellement envoyé au serveur ?', opts: ['le fragment #ancre', 'les paramètres après le ?', 'aucun des deux'], correct: 1, exp: 'Le fragment reste dans le navigateur ; les paramètres font partie de la requête.' },
      { stem: 'Quelle méthode est idempotente ?', opts: ['POST', 'PATCH', 'PUT'], correct: 2, exp: 'PUT remplace la ressource : la rejouer ne change pas l’état final. POST crée à chaque appel.' },
      { stem: 'Le serveur renvoie 503. De quelle famille s’agit-il ?', opts: ['erreur du client', 'erreur du serveur', 'redirection'], correct: 1, exp: '5xx : la demande était valable mais le serveur n’a pas pu y répondre.' },
      { stem: 'Quel langage décrit la structure du contenu ?', opts: ['CSS', 'HTML', 'JavaScript'], correct: 1, exp: 'HTML structure et donne du sens ; CSS présente ; JavaScript anime.' }
    ],

    pitfalls: [
      '<strong>Confondre paramètres de requête et chemin</strong> : <code>/notes?page=2</code> n’est pas un fichier <code>notes?page=2</code>.',
      '<strong>Croire que le fragment part au serveur</strong> : <code>#section</code> ne quitte jamais le navigateur.',
      '<strong>Attendre d’un <code>GET</code> qu’il modifie quelque chose</strong> : il est censé ne rien changer.',
      '<strong>Chercher une erreur de serveur dans le HTML</strong> : une <code>500</code> se diagnostique côté serveur.',
      '<strong>Mettre le <code>&lt;script&gt;</code> en haut de page</strong> sans <code>defer</code> : le script cherche des éléments qui n’existent pas encore.'
    ],

    methodTitle: 'Lire une adresse et une réponse, sans hésiter',
    method: [
      '<strong>Découpe l’URL</strong> de gauche à droite : protocole, hôte, port éventuel, chemin, requête, fragment.',
      '<strong>Décide de la méthode</strong> selon l’intention : lire (GET), créer (POST), remplacer (PUT), modifier (PATCH), supprimer (DELETE).',
      '<strong>Prévois le statut</strong> attendu du serveur avant de lancer la requête ; compare ensuite.',
      '<strong>Lis le premier chiffre</strong> d’un code inattendu pour savoir de quel côté chercher.',
      '<strong>Ouvre l’onglet Réseau</strong> et remonte à la première requête rouge.'
    ],

    summary: [
      'Le client demande, le serveur répond ; HTTP fixe la forme des messages.',
      'Une URL se lit : protocole, hôte, port, chemin, requête, fragment — le fragment ne part pas au serveur.',
      'Cinq méthodes suffisent : GET lire, POST créer, PUT remplacer, PATCH modifier, DELETE supprimer.',
      'Idempotente = rejouable sans effet supplémentaire : GET, PUT, DELETE le sont ; POST et PATCH non.',
      'Le premier chiffre du statut donne la famille : 2xx succès, 3xx redirection, 4xx faute du client, 5xx faute du serveur.',
      'HTML structure, CSS présente, JavaScript anime — trois rôles, trois fichiers.'
    ],

    checklist: [
      'Je décompose une URL en quatre parties sans me tromper.',
      'Je choisis la bonne méthode HTTP pour une intention donnée.',
      'Je dis si une méthode est idempotente et j’explique pourquoi.',
      'Je classe un code de statut dans sa famille et j’en tire la bonne conclusion.'
    ],

    notions: ['client', 'serveur', 'requête HTTP', 'en-tête', 'URL', 'chemin', 'paramètre de requête', 'idempotence', 'code de statut', 'HTML/CSS/JavaScript'],

    mastery: [
      { cls: 'low', text: '&lt; 50 % — Reprends les sections 1 et 2 en réécrivant à la main une URL découpée.' },
      { cls: 'mid', text: '50–69 % — Refais les exercices 1 et 2 du module : URL et familles de codes.' },
      { cls: 'good', text: '70–89 % — Bon niveau : cible l’idempotence et la frontière 4xx / 5xx.' },
      { cls: 'top', text: '≥ 95 % — Maîtrise : passe au chapitre 2, la structure HTML.' }
    ],

    flashcards: [
      { q: 'Que contient une requête HTTP ?', a: 'Une méthode, une ressource (chemin), des en-têtes — et parfois un corps.' },
      { q: 'Quelles parties d’une URL ne partent pas au serveur ?', a: 'Le fragment (après #). Le port, le chemin et la requête, eux, en font partie.' },
      { q: 'Qu’est-ce qu’une méthode idempotente ?', a: 'Une méthode que l’on peut rejouer sans changer l’état final du serveur : GET, PUT, DELETE, HEAD, OPTIONS, TRACE.' },
      { q: 'Que signifie un 4xx ? Un 5xx ?', a: '4xx : la demande du client est fautive. 5xx : la demande était valable mais le serveur a échoué.' },
      { q: 'À quoi sert l’attribut defer sur un script ?', a: 'À différer l’exécution du script après l’analyse complète du HTML.' }
    ]
  },

  /* ==================== Chapitre 2 ==================== */
  {
    n: 2,
    title: 'HTML : structure, sémantique et contenu',
    short: 'HTML',
    toc: 'Squelette d’un document, balises sémantiques, texte et listes, liens, images, tableaux de données, validation.',
    time: '≈ 3 h de travail',

    situation:
      'Un navigateur ne devine pas où est le menu, où est l’article et où est le pied de page : il faut le ' +
      'lui dire. Une page bâtie avec des <code>div</code> partout s’affiche correctement pour un humain, mais ' +
      'elle est illisible pour un lecteur d’écran, pour un moteur de recherche et pour un développeur qui ' +
      'reprend le projet. HTML n’est pas un langage de présentation, c’est un langage de sens.',

    objectives: [
      'écrire un document HTML valide, de l’en-tête au pied de page ;',
      'choisir la balise qui décrit le sens du contenu plutôt qu’une balise neutre ;',
      'structurer un tableau de données avec ses en-têtes et sa légende ;',
      'écrire des liens et des images utilisables, y compris sans les voir ;',
      'contrôler la structure d’une page (hiérarchie des titres, validation).'
    ],

    sections: [
      {
        title: 'Le squelette d’un document',
        html: [
          '<p>Tout document HTML suit le même squelette. Rien n’est facultatif : l’en-tête ' +
          '(<code>head</code>) déclare les métadonnées, le corps (<code>body</code>) porte le contenu visible.</p>',
          code([
            '<!DOCTYPE html>',
            '<html lang="fr">',
            '  <head>',
            '    <meta charset="UTF-8">',
            '    <meta name="viewport" content="width=device-width, initial-scale=1.0">',
            '    <title>Mes notes — B1</title>',
            '    <meta name="description" content="Relevé de notes du semestre.">',
            '  </head>',
            '  <body>',
            '    <h1>Mes notes</h1>',
            '    <p>Semestre 1, promotion B1.</p>',
            '  </body>',
            '</html>'
          ]),
          '<p>Trois lignes de l’en-tête méritent une explication : <code>&lt;meta charset="UTF-8"&gt;</code> ' +
          'déclare l’encodage des caractères — sans lui, les accents s’affichent en hiéroglyphes ; ' +
          '<code>&lt;meta name="viewport"&gt;</code> indique aux téléphones d’utiliser la largeur réelle de ' +
          'leur écran ; <code>&lt;title&gt;</code> est le titre affiché dans l’onglet et dans les résultats de ' +
          'recherche.</p>',
          box('pitfall', 'Piège — oublier lang et charset', 'warning',
            '    <p><code>lang="fr"</code> n’est pas décoratif : il permet au lecteur d’écran de prononcer le ' +
            'texte avec la bonne voix et aux navigateurs de choisir la bonne césure. Un décalage d’un seul ' +
            'caractère dans <code>charset</code> suffit à transformer « élèves » en « Ã©lÃ¨ves ».</p>')
        ].join('\n')
      },
      {
        title: 'Les balises de structure et leur sens',
        html: [
          '<p>HTML propose des balises qui décrivent une zone de page. Leur nom dit le rôle ; utilise-les ' +
          'avant de recourir à une <code>div</code>, qui ne veut rien dire.</p>',
          '<table>\n' +
          '    <tr><th>Balise</th><th>Ce qu’elle délimite</th></tr>\n' +
          '    <tr><td><code>&lt;header&gt;</code></td><td>l’en-tête d’une page ou d’une section : logo, titre, menu</td></tr>\n' +
          '    <tr><td><code>&lt;nav&gt;</code></td><td>un groupe de liens de navigation</td></tr>\n' +
          '    <tr><td><code>&lt;main&gt;</code></td><td>le contenu principal, unique par page</td></tr>\n' +
          '    <tr><td><code>&lt;article&gt;</code></td><td>un contenu autonome, qui aurait du sens ailleurs</td></tr>\n' +
          '    <tr><td><code>&lt;section&gt;</code></td><td>un regroupement thématique, avec un titre</td></tr>\n' +
          '    <tr><td><code>&lt;aside&gt;</code></td><td>un contenu annexe (encadré, note, publicité)</td></tr>\n' +
          '    <tr><td><code>&lt;footer&gt;</code></td><td>le pied de page : mentions, contact, copyright</td></tr>\n' +
          '  </table>',
          code([
            '<body>',
            '  <header>',
            '    <h1>Mes notes</h1>',
            '    <nav><a href="#semestre1">Semestre 1</a> <a href="#semestre2">Semestre 2</a></nav>',
            '  </header>',
            '  <main>',
            '    <section id="semestre1">',
            '      <h2>Semestre 1</h2>',
            '      <article><h3>Algorithmique</h3><p>Note obtenue : 16.</p></article>',
            '    </section>',
            '  </main>',
            '  <footer><p>Relevé non officiel.</p></footer>',
            '</body>'
          ]),
          box('intuition', 'Test simple : « cela aurait-il du sens ailleurs ? »', 'compass',
            '    <p>Un <code>article</code> est un bloc qui resterait compréhensible détaché de la page — un ' +
            'sujet d’examen, une fiche de cours. Une <code>section</code> n’a de sens qu’à l’intérieur de son ' +
            'ensemble. Si tu hésites, pose la question : « est-ce que je pourrais le déplacer sur une autre ' +
            'page ? »</p>')
        ].join('\n')
      },
      {
        title: 'Texte, titres et listes',
        html: [
          '<p>Les titres <code>h1</code> à <code>h6</code> forment une hiérarchie, pas une échelle de ' +
          'tailles. Un seul <code>h1</code> par page, et l’on ne descend jamais de plus d’un niveau à la ' +
          'fois : <code>h1 → h2 → h3</code> est correct, <code>h1 → h3</code> ne l’est pas.</p>',
          '<p>Les listes existent en trois formes, selon ce que tu énumères :</p>',
          code([
            '<ul>                    <ol>                    <dl>',
            '  <li>Python</li>         <li>Analyser</li>       <dt>HTTP</dt>',
            '  <li>SQL</li>            <li>Concevoir</li>      <dd>protocole de dialogue</dd>',
            '</ul>                    <li>Déployer</li>     </dl>',
            '                            </ol>'
          ]),
          '<p>Quelques balises de texte portent un sens précis : <code>&lt;strong&gt;</code> pour une ' +
          'importance réelle, <code>&lt;em&gt;</code> pour une insistance, <code>&lt;code&gt;</code> pour du ' +
          'code, <code>&lt;abbr title="..."&gt;</code> pour une abréviation, ' +
          '<code>&lt;time datetime="2026-09-27"&gt;</code> pour une date lisible par une machine.</p>',
          box('mnemo', 'Mnémotechnique — b, i, strong, em', 'pin',
            '    <p><code>&lt;b&gt;</code> et <code>&lt;i&gt;</code> ne disent que l’apparence ; ' +
            '<code>&lt;strong&gt;</code> et <code>&lt;em&gt;</code> disent le sens. Si tu veux insister, ' +
            'c’est <code>strong</code> ; si tu veux juste du gras décoratif, c’est du CSS.</p>')
        ].join('\n')
      },
      {
        title: 'Liens et images',
        html: [
          '<p>Un lien (<code>a</code>) a deux responsabilités : une destination (l’attribut ' +
          '<code>href</code>) et un texte assez explicite pour être compris hors contexte. « Cliquez ici » ' +
          'n’apprend rien ; « consulter le relevé de notes » situe le lecteur.</p>',
          code([
            '<a href="/cours/index.html">Revenir au sommaire du cours</a>',
            '<a href="https://exemple.fr" target="_blank" rel="noopener">Ouvrir dans un nouvel onglet</a>',
            '<a href="mailto:b1@campus.fr">Écrire au responsable</a>',
            '<a href="#formules">Aller au mémo (ancre interne)</a>'
          ]),
          '<p>Une image s’écrit avec deux attributs obligatoires : <code>src</code> (l’adresse du fichier) et ' +
          '<code>alt</code> (le texte de remplacement). Le texte alternatif n’est pas une option : il remplace ' +
          'l’image pour un lecteur d’écran, s’affiche si le fichier manque et sert à la recherche. Une image ' +
          'purement décorative porte <code>alt=""</code> — un attribut vide, qui signifie « ignore-moi ».</p>',
          code([
            '<img src="schema-http.svg" alt="Schéma d’un échange requête-réponse entre client et serveur"',
            '     width="640" height="360">',
            '<img src="motif-fond.svg" alt="">   <!-- décor : ignoré par les lecteurs d’écran -->'
          ]),
          box('pitfall', 'Piège — alt oublié ou recopié', 'warning',
            '    <p><code>alt="image"</code> ou <code>alt="photo1.png"</code> n’apporte aucune information. ' +
            'Le bon <code>alt</code> décrit ce que l’image <em>apporte</em> : « diagramme du cycle d’une ' +
            'requête », pas « capture d’écran ».</p>')
        ].join('\n')
      },
      {
        title: 'Tableaux de données',
        html: [
          '<p>Un tableau HTML sert à présenter des <strong>données</strong>, jamais à disposer une page. Un ' +
          'tableau correct porte une légende, une ligne d’en-têtes et des cellules reliées à leurs en-têtes.</p>',
          code([
            '<table>',
            '  <caption>Notes du semestre 1</caption>',
            '  <thead>',
            '    <tr><th scope="col">Module</th><th scope="col">Note</th></tr>',
            '  </thead>',
            '  <tbody>',
            '    <tr><th scope="row">Algorithmique</th><td>16</td></tr>',
            '    <tr><th scope="row">Statistiques</th><td>14</td></tr>',
            '  </tbody>',
            '</table>'
          ]),
          '<p><code>&lt;caption&gt;</code> titre le tableau ; <code>&lt;thead&gt;</code> et ' +
          '<code>&lt;tbody&gt;</code> séparent les en-têtes des données ; <code>scope="col"</code> et ' +
          '<code>scope="row"</code> disent à quel axe appartient une cellule d’en-tête. Sans eux, un lecteur ' +
          'd’écran énonce une suite de nombres sans repères.</p>',
          box('tech', 'Ce qui n’est pas un tableau', 'terminal',
            '    <p>Une mise en page à trois colonnes n’est pas un tableau : c’est du CSS (flexbox ou grille). ' +
            'Un tableau HTML conçu pour la disposition casse la lecture sur mobile et trompe les outils ' +
            'd’accessibilité.</p>')
        ].join('\n')
      },
      {
        title: 'Valider et contrôler une page',
        html: [
          '<p>Le HTML est permissif : un navigateur affiche une page mal fermée sans se plaindre, puis ' +
          'interprète le reste comme il peut. Deux contrôles automatiques suffisent à éviter la plupart des ' +
          'surprises.</p>',
          '<ul>\n' +
          '    <li><strong>La structure des titres</strong> : un seul <code>h1</code>, et une descente d’un ' +
          'niveau à la fois. C’est vérifiable par programme — l’exercice 3 du module te demande de l’écrire.</li>\n' +
          '    <li><strong>Les balises fermées</strong> : toute balise ouverte non auto-fermante doit être ' +
          'refermée dans le bon ordre.</li>\n' +
          '  </ul>',
          '<table>\n' +
          '    <tr><th>Erreur fréquente</th><th>Conséquence</th></tr>\n' +
          '    <tr><td>deux <code>&lt;h1&gt;</code> dans la page</td><td>la structure du document devient ambiguë</td></tr>\n' +
          '    <tr><td>descente <code>h1 → h3</code></td><td>un niveau manque : le plan est incohérent</td></tr>\n' +
          '    <tr><td>balises croisées <code>&lt;p&gt;&lt;b&gt;&lt;/p&gt;&lt;/b&gt;</code></td><td>le navigateur corrige tout seul, parfois mal</td></tr>\n' +
          '    <tr><td><code>alt</code> absent</td><td>l’image disparaît pour les lecteurs d’écran</td></tr>\n' +
          '  </table>',
          box('method', 'Réflexe de relecture', 'compass',
            '    <p>Relis une page en masquant le CSS (les outils de développement le permettent) : si la ' +
            'page reste compréhensible, la structure HTML est bonne. C’est le test le plus rapide et le plus ' +
            'exigeant.</p>')
        ].join('\n')
      }
    ],

    questions: [
      { stem: 'Quel attribut déclare l’encodage des caractères ?', opts: ['<meta charset="UTF-8">', '<meta name="encoding">', 'lang="fr"'], correct: 0, exp: 'C’est la balise meta charset qui fixe l’encodage du document.' },
      { stem: 'Quelle balise introduit le contenu principal, unique par page ?', opts: ['<section>', '<main>', '<div>'], correct: 1, exp: 'main délimite le contenu principal ; il ne doit y en avoir qu’un.' },
      { stem: 'Un tableau de notes doit contenir…', opts: ['des <div> alignées', 'une <caption> et des <th scope>', 'des colonnes CSS'], correct: 1, exp: 'Légende et en-têtes porteurs de scope rendent le tableau exploitable et accessible.' },
      { stem: 'À quoi sert l’attribut alt d’une image informative ?', opts: ['à définir sa taille', 'à décrire ce qu’elle apporte', 'à la rendre cliquable'], correct: 1, exp: 'alt remplace l’image pour ceux qui ne la voient pas ; il décrit son information.' },
      { stem: 'Quelle hiérarchie de titres est correcte ?', opts: ['h1, h3, h4', 'h1, h2, h3', 'h2, h1, h3'], correct: 1, exp: 'On descend d’un niveau à la fois, et la page commence par h1.' },
      { stem: 'Quelle balise décrit un contenu qui aurait du sens ailleurs ?', opts: ['<section>', '<article>', '<aside>'], correct: 1, exp: 'article est autonome : fiche, sujet, note de blog.' }
    ],

    pitfalls: [
      '<strong>Utiliser des <code>div</code> pour tout</strong> : la page perd son sens pour les outils qui la lisent automatiquement.',
      '<strong>Sauter un niveau de titre</strong> : <code>h1</code> puis <code>h3</code> donne un plan incomplet.',
      '<strong>Oublier <code>lang</code> ou <code>charset</code></strong> : accents cassés et prononciation erronée.',
      '<strong>Écrire <code>alt="image"</code></strong> au lieu de décrire ce que l’image apporte.',
      '<strong>Faire une mise en page avec un tableau</strong> : le contenu devient illisible au lecteur d’écran.'
    ],

    methodTitle: 'Écrire une page que tout le monde peut lire',
    method: [
      '<strong>Écris d’abord la structure</strong> (header, main, sections, footer) avant toute décoration.',
      '<strong>Donne un seul titre principal</strong> et descends niveau par niveau.',
      '<strong>Choisis la balise qui nomme le rôle</strong> : liste, tableau, citation, abréviation.',
      '<strong>Décris chaque image</strong> avec un <code>alt</code> utile, ou vide si elle est purement décorative.',
      '<strong>Relis sans CSS</strong> : si le document reste compréhensible, la structure tient.'
    ],

    summary: [
      'Tout document commence par <code>&lt;!DOCTYPE html&gt;</code> et déclare son encodage et sa langue.',
      'L’en-tête (<code>head</code>) porte les métadonnées ; le corps (<code>body</code>) porte le contenu.',
      'Les balises sémantiques décrivent le rôle : header, nav, main, article, section, aside, footer.',
      'Les titres forment un plan hiérarchique : un seul <code>h1</code>, une descente d’un niveau à la fois.',
      'Liens et images ont des attributs porteurs de sens : <code>href</code> explicite, <code>alt</code> utile.',
      'Un tableau de données porte une légende et des en-têtes reliés par <code>scope</code>.'
    ],

    checklist: [
      'Je construis un document HTML valide de mémoire.',
      'Je choisis une balise sémantique plutôt qu’une <code>div</code> neutre.',
      'Je contrôle la hiérarchie des titres d’une page.',
      'J’écris un tableau avec légende, en-têtes et cellules reliées.'
    ],

    notions: ['DOCTYPE', 'encodage', 'head et body', 'sémantique', 'hiérarchie des titres', 'liste', 'lien', 'alt', 'tableau de données', 'scope'],

    mastery: [
      { cls: 'low', text: '&lt; 50 % — Réécris le squelette d’une page à la main, encodage et langue compris.' },
      { cls: 'mid', text: '50–69 % — Reprends les exercices 1 et 3 : structure et hiérarchie des titres.' },
      { cls: 'good', text: '70–89 % — Bon niveau : cible <code>alt</code>, <code>scope</code> et balises sémantiques.' },
      { cls: 'top', text: '≥ 95 % — Maîtrise : passe au chapitre 3, les formulaires.' }
    ],

    flashcards: [
      { q: 'Quelles métadonnées sont indispensables dans le head ?', a: 'charset, viewport et un élément title.' },
      { q: 'Différence entre section et article ?', a: 'article est autonome (sens hors contexte) ; section regroupe un thème à l’intérieur d’un ensemble.' },
      { q: 'Comment écrire une image décorative ?', a: 'Avec alt="" : un texte alternatif vide dit aux lecteurs d’écran de l’ignorer.' },
      { q: 'À quoi sert scope dans un tableau ?', a: 'À indiquer si une cellule d’en-tête porte sur une colonne (col) ou une ligne (row).' },
      { q: 'Quelle règle pour la hiérarchie des titres ?', a: 'Un seul h1 par page, et une descente d’un seul niveau à la fois.' }
    ]
  },

  /* ==================== Chapitre 3 ==================== */
  {
    n: 3,
    title: 'Formulaires, validation et sécurité des entrées',
    short: 'Formulaires',
    toc: 'Structure d’un formulaire, types de champs, étiquettes, validation côté client, échappement et injection HTML.',
    time: '≈ 3 h de travail',

    situation:
      'Un formulaire est la seule porte d’entrée du site : ce qui vient de l’utilisateur est, par définition, ' +
      'imprévisible. Le navigateur peut aider à filtrer, mais il ne protège rien : n’importe qui peut envoyer ' +
      'ce qu’il veut, avec ou sans navigateur. Écrire un formulaire, c’est donc écrire deux fois la même ' +
      'règle — une fois pour aider l’utilisateur, une fois pour se protéger.',

    objectives: [
      'construire un formulaire HTML complet et correctement étiqueté ;',
      'choisir le type de champ adapté à la donnée attendue ;',
      'utiliser la validation native du navigateur sans en dépendre ;',
      'échapper une entrée utilisateur avant de l’insérer dans une page ;',
      'expliquer pourquoi la validation serveur reste indispensable.'
    ],

    sections: [
      {
        title: 'Un formulaire, c’est une requête préparée',
        html: [
          '<p>Un formulaire décrit ce qui sera envoyé au serveur : où (<code>action</code>), comment ' +
          '(<code>method</code>) et quoi (chaque champ qui porte un attribut <code>name</code>). Sans ' +
          '<code>name</code>, un champ est visible mais jamais transmis.</p>',
          code([
            '<form action="/notes/ajouter" method="post">',
            '  <label for="etudiant">Nom de l’étudiant</label>',
            '  <input id="etudiant" name="etudiant" type="text" required>',
            '',
            '  <label for="note">Note sur 20</label>',
            '  <input id="note" name="note" type="number" min="0" max="20" step="0.5" required>',
            '',
            '  <button type="submit">Enregistrer</button>',
            '</form>'
          ]),
          '<p>Avec <code>method="post"</code>, les données voyagent dans le corps de la requête. Avec ' +
          '<code>method="get"</code>, elles se retrouvent dans l’URL, visibles et conservées dans l’historique ' +
          'du navigateur : acceptable pour une recherche, à proscrire pour un mot de passe.</p>',
          box('pitfall', 'Piège — GET pour une action qui modifie', 'warning',
            '    <p>Un formulaire de suppression en <code>GET</code> se déclenche par un simple rechargement ' +
            'd’URL. Une action qui change l’état du serveur s’envoie toujours en <code>POST</code>.</p>')
        ].join('\n')
      },
      {
        title: 'Les types de champs',
        html: [
          '<p>Le type d’un <code>input</code> dit au navigateur ce qu’il attend : il adapte le clavier sur ' +
          'téléphone et propose un contrôle adapté. Ce n’est pas une protection, c’est une aide.</p>',
          '<table>\n' +
          '    <tr><th>Type</th><th>Pour quoi</th><th>Ce qu’il apporte</th></tr>\n' +
          '    <tr><td><code>text</code></td><td>une chaîne libre</td><td>rien de particulier</td></tr>\n' +
          '    <tr><td><code>email</code></td><td>une adresse électronique</td><td>clavier adapté, contrôle de forme simple</td></tr>\n' +
          '    <tr><td><code>number</code></td><td>une quantité numérique</td><td>flèches +, bornes <code>min</code>/<code>max</code></td></tr>\n' +
          '    <tr><td><code>password</code></td><td>un secret</td><td>caractères masqués</td></tr>\n' +
          '    <tr><td><code>checkbox</code></td><td>un choix à cocher</td><td>état vrai/faux</td></tr>\n' +
          '    <tr><td><code>radio</code></td><td>un choix unique dans un groupe</td><td>même <code>name</code> pour tout le groupe</td></tr>\n' +
          '    <tr><td><code>date</code></td><td>une date</td><td>sélecteur de calendrier</td></tr>\n' +
          '    <tr><td><code>file</code></td><td>un fichier</td><td>ouvre le sélecteur de fichiers</td></tr>\n' +
          '  </table>',
          '<p>Pour les listes de choix, on utilise <code>select</code> avec <code>option</code>, ou ' +
          '<code>textarea</code> pour un texte long. Attention : <code>textarea</code> n’est pas un ' +
          '<code>input</code>, sa valeur est écrite entre les balises, pas dans un attribut ' +
          '<code>value</code>.</p>',
          box('mnemo', 'Mnémotechnique — « un name, une valeur »', 'pin',
            '    <p>Le couple qui compte pour le serveur est toujours <code>name=valeur</code>. Le ' +
            '<code>id</code>, lui, sert au navigateur : il relie l’étiquette au champ et permet au CSS et au ' +
            'JavaScript de le cibler.</p>')
        ].join('\n')
      },
      {
        title: 'Étiquettes et accessibilité',
        html: [
          '<p>Chaque champ doit avoir une étiquette. Deux façons de la relier, la première étant préférable : ' +
          'l’attribut <code>for</code> qui désigne l’<code>id</code> du champ, ou l’imbrication du champ dans ' +
          'l’étiquette.</p>',
          code([
            '<!-- bonne pratique : for + id -->',
            '<label for="mail">Adresse électronique</label>',
            '<input id="mail" name="mail" type="email">',
            '',
            '<!-- équivalent acceptable : imbrication -->',
            '<label>Adresse électronique <input name="mail" type="email"></label>',
            '',
            '<!-- mauvaise pratique : le placeholder ne remplace pas l’étiquette -->',
            '<input name="mail" type="email" placeholder="Adresse électronique">'
          ]),
          '<p>Un <code>placeholder</code> disparaît dès la première frappe et n’est pas toujours lu par les ' +
          'lecteurs d’écran : c’est une aide, jamais une étiquette. Pour un groupe de cases à cocher, on ' +
          'encadre l’ensemble avec <code>&lt;fieldset&gt;</code> et <code>&lt;legend&gt;</code>.</p>',
          box('tech', 'Le clic qui va au bon champ', 'terminal',
            '    <p>Quand <code>label for="mail"</code> désigne <code>input id="mail"</code>, cliquer sur le ' +
            'texte place le curseur dans le champ. C’est un gain de confort réel sur téléphone, et le signe ' +
            'que la relation entre étiquette et champ est correcte.</p>')
        ].join('\n')
      },
      {
        title: 'La validation côté client',
        html: [
          '<p>HTML fournit des règles déclaratives : <code>required</code> (champ obligatoire), ' +
          '<code>min</code> et <code>max</code> (bornes numériques), <code>minlength</code> et ' +
          '<code>maxlength</code> (longueur), <code>pattern</code> (expression régulière), <code>type</code> ' +
          '(forme attendue). Le navigateur bloque l’envoi et affiche un message s’il n’est pas satisfait.</p>',
          code([
            '<input name="code" type="text" pattern="[A-Z]{2}[0-9]{4}" required',
            '       title="Deux majuscules puis quatre chiffres, par exemple AB1234">',
            '<input name="age" type="number" min="16" max="99">',
            '<input name="mail" type="email" required>'
          ]),
          '<p>Deux limites, décisives : un utilisateur peut désactiver la validation du navigateur, et n’importe ' +
          'quel programme peut envoyer une requête <code>POST</code> sans passer par la page. ' +
          '<strong>La validation côté client est un service rendu à l’utilisateur ; la validation côté serveur ' +
          'est la seule qui protège le système.</strong></p>',
          box('pitfall', 'Piège — la validation en JavaScript n’est pas une protection', 'warning',
            '    <p>Désactiver le JavaScript du navigateur, ou envoyer directement la requête avec ' +
            '<code>curl</code>, contourne toutes les règles écrites dans la page. La même vérification doit ' +
            'exister sur le serveur, sans exception.</p>')

        ].join('\n')
      },
      {
        title: 'Insérer une entrée utilisateur sans danger',
        html: [
          '<p>Le navigateur interprète comme du HTML tout ce qu’on lui donne à afficher. Si une chaîne saisie ' +
          'par un visiteur est insérée telle quelle dans la page, son contenu devient du <em>code</em> : ' +
          'c’est le mécanisme de l’injection HTML, et de la faille XSS qui en découle.</p>',
          code([
            '// dangereux : la saisie devient du balisage',
            'zone.innerHTML = commentaire;',
            '',
            '// sûr : la saisie reste du texte',
            'zone.textContent = commentaire;',
            '',
            '// si le HTML est indispensable, on échappe d’abord les caractères sensibles',
            'function echapper(texte) {',
            '  return texte',
            '    .replace(/&/g, "&amp;")',
            '    .replace(/</g, "&lt;")',
            '    .replace(/>/g, "&gt;")',
            '    .replace(/"/g, "&quot;")',
            '    .replace(/\'/g, "&#39;");',
            '}'
          ]),
          '<p>L’ordre des remplacements n’est pas neutre : on commence toujours par le <code>&amp;</code>, ' +
          'sinon les entités déjà créées seraient ré-échappées et afficheraient <code>&amp;amp;lt;</code> au ' +
          'lieu de <code>&amp;lt;</code>.</p>',
          box('mnemo', 'Mnémotechnique — texte ou balisage ?', 'pin',
            '    <p><code>textContent</code> traite ce qu’on lui donne comme du <em>texte</em> ; ' +
            '<code>innerHTML</code> comme du <em>balisage</em>. Pour une donnée venue d’un utilisateur, la ' +
            'réponse est toujours <code>textContent</code>.</p>')

        ].join('\n')
      },
      {
        title: 'Progression d’un formulaire bien conçu',
        html: [
          '<p>Un formulaire utilisable se construit dans un ordre stable : structure, étiquettes, types, ' +
          'validation, puis messages d’erreur.</p>',
          '<ol>\n' +
          '    <li><strong>Action et méthode</strong> : où vont les données et comment elles voyagent.</li>\n' +
          '    <li><strong>Étiquettes</strong> : un <code>label</code> relié à chaque champ, un ' +
          '<code>fieldset</code> par groupe de choix.</li>\n' +
          '    <li><strong>Types et contraintes</strong> : le bon <code>type</code>, les bornes, ' +
          '<code>required</code>.</li>\n' +
          '    <li><strong>Validation serveur</strong> : les mêmes règles, réécrites côté serveur, sans ' +
          'exception.</li>\n' +
          '    <li><strong>Messages</strong> : explicites et proches du champ, jamais un simple « erreur ».</li>\n' +
          '  </ol>',
          '<table>\n' +
          '    <tr><th>Message</th><th>Ce qu’il apporte au visiteur</th></tr>\n' +
          '    <tr><td>« Note attendue entre 0 et 20. »</td><td>la règle et la borne</td></tr>\n' +
          '    <tr><td>« Cette note vaut 25. »</td><td>la valeur reçue, à corriger</td></tr>\n' +
          '    <tr><td>« Erreur de saisie. »</td><td>rien : le visiteur ne sait pas quoi corriger</td></tr>\n' +
          '  </table>',
          box('method', 'La règle des deux validations', 'compass',
            '    <p>Écris la règle une fois pour l’utilisateur (HTML, messages clairs) et une fois pour le ' +
            'système (serveur, refus silencieux). Si tu ne dois en garder qu’une, garde celle du serveur : ' +
            'elle est la seule que personne ne peut contourner.</p>')

        ].join('\n')
      }
    ],

    questions: [
      { stem: 'Quel attribut rend un champ effectivement transmis au serveur ?', opts: ['id', 'name', 'class'], correct: 1, exp: 'Le couple name/valeur est ce qui voyage dans la requête ; sans name, le champ est ignoré.' },
      { stem: 'Quel type de champ pour une note sur 20 bornée ?', opts: ['<input type="text">', '<input type="number" min="0" max="20">', '<input type="range">'], correct: 1, exp: 'type="number" avec min et max donne un contrôle adapté et des bornes.' },
      { stem: 'Pourquoi un placeholder ne remplace-t-il pas un label ?', opts: ['il disparaît dès la saisie et est mal lu par les lecteurs d’écran', 'il n’est pas stylable', 'il ne fonctionne pas sur mobile'], correct: 0, exp: 'Le texte d’aide doit rester visible et associé au champ : c’est le rôle du label.' },
      { stem: 'Que fait la validation HTML côté client ?', opts: ['elle protège le serveur', 'elle aide l’utilisateur', 'elle remplace la validation serveur'], correct: 1, exp: 'Elle est contournable : elle rend service au visiteur, mais ne protège rien.' },
      { stem: 'Comment insérer un commentaire d’utilisateur sans risque ?', opts: ['innerHTML', 'textContent', 'document.write'], correct: 1, exp: 'textContent traite la valeur comme du texte ; innerHTML l’interpréterait comme du HTML.' },
      { stem: 'Quel remplacement doit être fait en premier lors de l’échappement ?', opts: ['&', '<', '"'], correct: 0, exp: 'Commencer par & évite de ré-échapper les entités créées par les remplacements suivants.' }
    ],

    pitfalls: [
      '<strong>Champ sans <code>name</code></strong> : il s’affiche, mais rien n’arrive au serveur.',
      '<strong>Formulaire de modification en <code>GET</code></strong> : l’action se rejoue à chaque rechargement.',
      '<strong>Placeholder utilisé comme étiquette</strong> : l’information disparaît à la première frappe.',
      '<strong>Validation uniquement en JavaScript</strong> : désactiver le script contourne tout.',
      '<strong>Insérer une saisie avec <code>innerHTML</code></strong> : la donnée devient du code exécutable.'
    ],

    methodTitle: 'Construire et sécuriser un formulaire',
    method: [
      '<strong>Fixez action et méthode</strong> avant d’ajouter le premier champ.',
      '<strong>Étiquetez chaque champ</strong> avec un <code>label</code> relié par <code>for</code>/<code>id</code>.',
      '<strong>Choisissez le bon type</strong> et ajoutez les contraintes natives (bornes, longueur, motif).',
      '<strong>Réécrivez les mêmes règles côté serveur</strong> : c’est la seule validation qui compte.',
      '<strong>Échappez à l’affichage</strong> toute donnée venue de l’extérieur, ou affichez-la en texte.'
    ],

    summary: [
      'Un formulaire est une requête préparée : <code>action</code> pour la destination, <code>method</code> pour le transport.',
      'Seul un champ porteur d’un <code>name</code> est transmis ; l’<code>id</code> sert au navigateur.',
      'Le type du champ adapte le clavier et les contrôles : email, number, date, password, checkbox, radio.',
      'Chaque champ a une étiquette reliée par <code>for</code> ; le <code>placeholder</code> n’en est pas une.',
      'La validation HTML aide l’utilisateur ; la validation serveur est la seule qui protège.',
      'Une donnée utilisateur s’affiche en texte (<code>textContent</code>) ou après échappement des caractères sensibles.'
    ],

    checklist: [
      'Je construis un formulaire complet, étiquettes et contraintes comprises.',
      'Je choisis le type de champ adapté à chaque donnée.',
      'J’explique pourquoi la validation côté client ne suffit pas.',
      'J’échappe une entrée utilisateur avant de l’insérer dans une page.'
    ],

    notions: ['action', 'method', 'name', 'label et for', 'fieldset et legend', 'types d’input', 'validation native', 'échappement', 'injection HTML', 'textContent'],
    mastery: [
      { cls: 'low', text: '&lt; 50 % — Reprends la section 1 : reconstruis un formulaire complet à la main.' },
      { cls: 'mid', text: '50–69 % — Refais l’exercice 1 du module : validation d’une adresse.' },
      { cls: 'good', text: '70–89 % — Bon niveau : cible l’échappement et la frontière client/serveur.' },
      { cls: 'top', text: '≥ 95 % — Maîtrise : passe au chapitre 4, les sélecteurs CSS.' }
    ],

    flashcards: [
      { q: 'Que faut-il pour qu’un champ soit envoyé au serveur ?', a: 'Un attribut name. Sans lui, la valeur reste dans la page.' },
      { q: 'Pourquoi préférer POST à GET pour un formulaire qui modifie ?', a: 'Parce qu’un GET peut être rejoué par un rechargement ou un préchargement, sans intention de l’utilisateur.' },
      { q: 'Que fait la validation HTML native ?', a: 'Elle bloque l’envoi et affiche un message si les contraintes (required, min, max, pattern) ne sont pas respectées — côté client uniquement.' },
      { q: 'Différence entre innerHTML et textContent ?', a: 'innerHTML interprète la chaîne comme du balisage ; textContent l’affiche comme du texte.' },
      { q: 'Pourquoi commencer l’échappement par & ?', a: 'Pour ne pas ré-échapper les entités créées par les remplacements suivants.' }
    ]
  }
];

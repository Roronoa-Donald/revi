/**
 * Chapitres 4 à 6 du cours de programmation web B1.
 *
 * Chaque chapitre fournit la matière que `kit.chapter` met en page. Aucun titre
 * <h2> ici : la numérotation est ajoutée au rendu.
 */
'use strict';

const { box } = require('../../../scripts/course-kit');

function code(lignes) {
  const esc = s => String(s).replace(/&(?!(?:lt|gt|amp|quot|#39);)/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  return '<pre><code>' + lignes.map(esc).join('\n') + '</code></pre>';
}

module.exports = [
  /* ==================== Chapitre 4 ==================== */
  {
    n: 4,
    title: 'CSS : sélecteurs, cascade et modèle de boîte',
    short: 'CSS — bases',
    toc: 'Règles et feuilles de style, sélecteurs, cascade et spécificité, héritage, modèle de boîte, unités.',
    time: '≈ 3 h de travail',

    situation:
      'Vous écrivez une règle, la page ignore votre style. Ce n’est presque jamais un bug de navigateur : c’est une ' +
      'règle concurrente qui gagne. CSS applique ses décisions selon des règles précises — spécificité, ordre ' +
      'd’apparition, héritage — et savoir prédire laquelle gagne évite de tout réécrire à l’aveugle.',

    objectives: [
      'écrire une règle CSS et choisir le bon sélecteur ;',
      'calculer la spécificité d’un sélecteur et l’utiliser pour résoudre un conflit ;',
      'expliquer l’ordre dans lequel CSS applique ses règles ;',
      'calculer la largeur réelle d’un élément avec le modèle de boîte ;',
      'choisir des unités adaptées et prévisibles.'
    ],

    sections: [
      {
        title: 'Une règle, une feuille de style',
        html: [
          '<p>Une feuille de style CSS est une suite de règles. Chaque règle a un <strong>sélecteur</strong> ' +
          '(ce qui est visé) et un <strong>bloc de déclarations</strong> (ce qui est appliqué), sous la forme ' +
          '<code>propriété: valeur;</code>.</p>',
          code([
            '/* sélecteur   bloc de déclarations */',
            'h1 {',
            '  font-size: 2rem;',
            '  color: #1c1917;',
            '  margin-bottom: 0.5rem;',
            '}'
          ]),
          '<p>Trois façons d’appliquer du CSS, dans l’ordre de préférence :</p>',
          '<table>\n' +
          '    <tr><th>Méthode</th><th>Où</th><th>Quand</th></tr>\n' +
          '    <tr><td>feuille externe</td><td><code>&lt;link rel="stylesheet" href="styles.css"&gt;</code></td><td>presque toujours : mise en cache, réutilisable</td></tr>\n' +
          '    <tr><td>bloc interne</td><td><code>&lt;style&gt;</code> dans le <code>head</code></td><td>cas isolé d’une seule page</td></tr>\n' +
          '    <tr><td>attribut en ligne</td><td><code>&lt;p style="color:red"&gt;</code></td><td>à éviter : non réutilisable et difficile à surcharger</td></tr>\n' +
          '  </table>',
          box('pitfall', 'Piège — le <code>&lt;link&gt;</code> oublié', 'warning',
            '    <p>Un chemin de feuille de style faux ne produit aucune erreur visible : la page s’affiche ' +
            'sans style, et l’onglet Réseau montre une requête en <code>404</code>. C’est la première chose à ' +
            'vérifier quand « le CSS ne marche pas ».</p>')
        ].join('\n')
      },
      {
        title: 'Les sélecteurs',
        html: [
          '<p>Choisir le sélecteur, c’est exprimer une intention. Les plus utiles :</p>',
          '<table>\n' +
          '    <tr><th>Sélecteur</th><th>Ce qu’il cible</th><th>Exemple</th></tr>\n' +
          '    <tr><td>type</td><td>toutes les balises d’un nom</td><td><code>p</code></td></tr>\n' +
          '    <tr><td>classe</td><td>les éléments portant <code>class="…"</code></td><td><code>.badge</code></td></tr>\n' +
          '    <tr><td>identifiant</td><td>l’élément portant <code>id="…"</code></td><td><code>#sommaire</code></td></tr>\n' +
          '    <tr><td>descendant</td><td>un élément contenu dans un autre</td><td><code>nav a</code></td></tr>\n' +
          '    <tr><td>enfant direct</td><td>un enfant immédiat</td><td><code>ul &gt; li</code></td></tr>\n' +
          '    <tr><td>attribut</td><td>un élément selon ses attributs</td><td><code>a[target="_blank"]</code></td></tr>\n' +
          '    <tr><td>pseudo-classe</td><td>un état de l’élément</td><td><code>a:hover</code>, <code>li:nth-child(2)</code></td></tr>\n' +
          '    <tr><td>pseudo-élément</td><td>une partie engendrée</td><td><code>p::first-line</code></td></tr>\n' +
          '  </table>',
          '<p>La classe est le sélecteur du quotidien : elle est réutilisable, explicite et de faible ' +
          'spécificité. Réserver l’<code>id</code> au ciblage unique (ancre de navigation, élément isolé) ' +
          'laisse les styles faciles à surcharger.</p>',
          box('mnemo', 'Mnémotechnique — « classe pour styler, id pour viser »', 'pin',
            '    <p>Une classe décrit à quoi ressemble un élément ; un <code>id</code> désigne un élément ' +
            'précis. Styler par <code>id</code> revient à écrire une exception dans le CSS : ça marche, mais ' +
            'ça se paie au deuxième élément.</p>')
        ].join('\n')
      },
      {
        title: 'Cascade, spécificité et héritage',
        html: [
          '<p>Quand plusieurs règles visent le même élément, elles ne s’appliquent pas « dans l’ordre du ' +
          'fichier » mais selon une hiérarchie :</p>',
          '<ol>\n' +
          '    <li><strong>Origine</strong> : styles du navigateur, puis de l’auteur, puis <code>!important</code>.</li>\n' +
          '    <li><strong>Spécificité</strong> : un sélecteur plus précis l’emporte.</li>\n' +
          '    <li><strong>Ordre d’apparition</strong> : à spécificité égale, la dernière règle gagne.</li>\n' +
          '  </ol>',
          '<p>La spécificité se calcule en trois compteurs, lus de gauche à droite : le nombre ' +
          'd’<strong>identifiants</strong>, puis de <strong>classes</strong> (et d’attributs et de ' +
          'pseudo-classes), puis de <strong>types</strong> (et de pseudo-éléments). On ne compare jamais les ' +
          'totaux : on compare compteur par compteur, comme des nombres écrits à côté.</p>',
          '<table>\n' +
          '    <tr><th>Sélecteur</th><th>Identifiants</th><th>Classes</th><th>Types</th></tr>\n' +
          '    <tr><td><code>p</code></td><td>0</td><td>0</td><td>1</td></tr>\n' +
          '    <tr><td><code>.item</code></td><td>0</td><td>1</td><td>0</td></tr>\n' +
          '    <tr><td><code>div#main.item p</code></td><td>1</td><td>1</td><td>2</td></tr>\n' +
          '    <tr><td><code>#app section h2</code></td><td>1</td><td>0</td><td>2</td></tr>\n' +
          '  </table>',
          '<p>L’<strong>héritage</strong> complète le tableau : certaines propriétés (couleur du texte, ' +
          'police, interlignage) descendent des parents vers les enfants, d’autres non (marges, bordures, ' +
          'position). C’est pourquoi <code>body { color: … }</code> colore toute la page, tandis que ' +
          '<code>body { margin: 0 }</code> ne retire rien aux paragraphes.</p>',
          box('pitfall', 'Piège — <code>!important</code> comme rustine', 'warning',
            '    <p><code>!important</code> casse la hiérarchie naturelle : la règle suivante devra elle-même ' +
            'être <code>!important</code>, et le fichier devient ingérable. Un style qui n’est pas appliqué ' +
            's’explique presque toujours par une spécificité, pas par un manque d’autorité.</p>')
        ].join('\n')
      },
      {
        title: 'Le modèle de boîte',
        html: [
          '<p>Chaque élément est une boîte rectangulaire composée de quatre couches, de l’intérieur vers ' +
          'l’extérieur : le <strong>contenu</strong>, le <strong>padding</strong> (marge intérieure), la ' +
          '<strong>bordure</strong>, puis la <strong>marge</strong> (extérieure, qui ne se voit pas mais ' +
          'écarte les voisins).</p>',
          code([
            '.carte {',
            '  width: 200px;      /* largeur du contenu par défaut */',
            '  padding: 10px;     /* 2 × 10px autour du contenu */',
            '  border: 2px solid #1c1917;   /* 2 × 2px */',
            '  margin: 5px;       /* 2 × 5px autour de la boîte */',
            '}',
            '',
            '/* largeur occupée par le contenu : 200 + 20 + 4 = 224px  (box-sizing: content-box) */',
            '/* place totale occupée :          224 + 10     = 234px  (avec les marges)        */'
          ]),
          '<p>Par défaut, <code>width</code> ne désigne que le contenu : ajouter un padding agrandit la boîte. ' +
          'La règle <code>box-sizing: border-box</code> change tout — la largeur déclarée englobe alors ' +
          'padding et bordure, ce qui rend les calculs de mise en page prévisibles. C’est pour cette raison ' +
          'que la plupart des feuilles de style commencent par :</p>',
          code([
            '*, *::before, *::after { box-sizing: border-box; }'
          ]),
          box('mnemo', 'Mnémotechnique — « border-box : la promesse est tenue »', 'pin',
            '    <p>En <code>border-box</code>, une boîte déclarée à 300 px occupe au plus 300 px de contenu, ' +
            'padding et bordure compris. C’est ce que tout le monde attend en lisant <code>width: 300px</code>.</p>')
        ].join('\n')
      },
      {
        title: 'Unités, couleurs et fonctions',
        html: [
          '<p>Une valeur sans unité adaptée produit un résultat qui « marche » sur un écran et pas sur un ' +
          'autre. Les unités à connaître :</p>',
          '<table>\n' +
          '    <tr><th>Unité</th><th>Relative à</th><th>Usage typique</th></tr>\n' +
          '    <tr><td><code>px</code></td><td>rien : valeur absolue</td><td>bordures, ombres, détails</td></tr>\n' +
          '    <tr><td><code>rem</code></td><td>la taille de police de la racine (<code>html</code>)</td><td>tailles de texte, espacements</td></tr>\n' +
          '    <tr><td><code>em</code></td><td>la taille de police de l’élément parent</td><td>padding dépendant du texte</td></tr>\n' +
          '    <tr><td><code>%</code></td><td>l’élément parent</td><td>largeurs fluides</td></tr>\n' +
          '    <tr><td><code>vw</code> / <code>vh</code></td><td>la fenêtre</td><td>sections plein écran</td></tr>\n' +
          '  </table>',
          '<p>Les couleurs s’écrivent en hexadécimal (<code>#047857</code>), en fonction ' +
          '(<code>rgb(4,120,87)</code>, <code>hsl(160 93% 24%)</code>) ou par mot-clé. Deux règles de ' +
          'lisibilité : le contraste texte/fond doit dépasser 4,5:1 pour un texte courant, et la couleur ne ' +
          'doit jamais être le seul moyen de transmettre une information.</p>',
          box('tech', 'Pourquoi rem plutôt que px', 'terminal',
            '    <p><code>rem</code> suit la taille de base choisie par l’utilisateur dans son navigateur. ' +
            'Un texte exprimé en <code>rem</code> grossit pour ceux qui en ont besoin ; exprimé en ' +
            '<code>px</code>, il reste figé. C’est un point d’accessibilité, pas une préférence esthétique.</p>')
        ].join('\n')
      },
      {
        title: 'Déboguer le CSS',
        html: [
          '<p>Les outils de développement affichent, pour l’élément sélectionné, toutes les déclarations reçues ' +
          'et celles qui ont été <strong>barrées</strong> : une déclaration barrée est une déclaration ' +
          'perdante. La cause apparaît alors en clair.</p>',
          '<table>\n' +
          '    <tr><th>Symptôme</th><th>Cause la plus fréquente</th><th>Vérification</th></tr>\n' +
          '    <tr><td>le style ne s’applique pas</td><td>sélecteur qui ne correspond à rien</td><td>compter les éléments sélectionnés</td></tr>\n' +
          '    <tr><td>le style est barré</td><td>une règle plus spécifique gagne</td><td>comparer les triplet de spécificité</td></tr>\n' +
          '    <tr><td>aucun style du tout</td><td>feuille non chargée</td><td>onglet Réseau : 404 ?</td></tr>\n' +
          '    <tr><td>une boîte dépasse</td><td><code>content-box</code> avec padding</td><td>mesurer avec l’inspecteur</td></tr>\n' +
          '  </table>',
          box('method', 'Méthode de résolution', 'compass',
            '    <p>Devant un style qui n’arrive pas : vérifie d’abord que le sélecteur cible bien quelque ' +
            'chose, puis cherche la règle gagnante dans l’inspecteur, et seulement en dernier ressort ' +
            'augmente la spécificité. Ajouter <code>!important</code> avant d’avoir compris est le meilleur ' +
            'moyen de créer un problème plus difficile à défaire.</p>')
        ].join('\n')
      }
    ],

    questions: [
      { stem: 'Quel sélecteur cible toutes les cartes portant la classe « item » ?', opts: ['#item', '.item', 'item'], correct: 1, exp: 'Le point introduit une classe ; # introduit un identifiant.' },
      { stem: 'Quelle est la spécificité de « div#main.item p » ?', opts: ['1 identifiant, 1 classe, 2 types', '0 identifiant, 2 classes, 1 type', '2 identifiants, 0 classe, 2 types'], correct: 0, exp: '#main donne un identifiant, .item une classe, div et p deux types.' },
      { stem: 'Deux règles de même spécificité se contredisent. Laquelle gagne ?', opts: ['la première écrite', 'la dernière écrite', 'celle du fichier le plus long'], correct: 1, exp: 'À spécificité égale, l’ordre d’apparition tranche : la dernière gagne.' },
      { stem: 'Avec box-sizing: border-box, width: 300px désigne…', opts: ['la largeur du contenu seul', 'la largeur contenu + padding + bordure', 'la largeur avec les marges'], correct: 1, exp: 'border-box englobe padding et bordure ; les marges restent extérieures.' },
      { stem: 'Quelle unité suit la taille de base du navigateur ?', opts: ['px', 'rem', 'cm'], correct: 1, exp: 'rem est relative à la taille de police de la racine : elle respecte les préférences du lecteur.' },
      { stem: 'À quoi sert !important ?', opts: ['à accélérer le rendu', 'à forcer une déclaration, en dernier recours', 'à rendre un style hérité'], correct: 1, exp: 'C’est une exception qui casse la hiérarchie naturelle : à utiliser le moins possible.' }
    ],

    pitfalls: [
      '<strong>Styler par <code>id</code></strong> : la spécificité monte et les surcharges deviennent impossibles.',
      '<strong>Oublier <code>box-sizing: border-box</code></strong> : une boîte à 100 % de large plus un padding déborde.',
      '<strong>Ajouter <code>!important</code> sans comprendre</strong> : le conflit suivant sera plus dur encore.',
      '<strong>Mélanger <code>px</code> et <code>rem</code> sans intention</strong> : le texte ne suit plus les préférences du lecteur.',
      '<strong>Croire qu’un style absent est un bug du navigateur</strong> : c’est presque toujours un sélecteur qui ne correspond à rien.'
    ],

    methodTitle: 'Résoudre un conflit de style',
    method: [
      '<strong>Vérifiez que la feuille est chargée</strong> (onglet Réseau) avant tout le reste.',
      '<strong>Contrôle le sélecteur</strong> : combien d’éléments correspondent vraiment ?',
      '<strong>Calculez les triplets de spécificité</strong> des deux règles concurrentes.',
      '<strong>Corrige la cause</strong> : un sélecteur plus juste, pas une autorité plus forte.',
      '<strong>Contrôle enfin la boîte</strong> : padding, bordure et <code>box-sizing</code> expliquent la plupart des débordements.'
    ],

    summary: [
      'Une règle CSS = un sélecteur + un bloc de déclarations <code>propriété: valeur;</code>.',
      'La feuille externe (<code>link</code>) est la méthode à privilégier ; l’attribut <code>style</code> se réserve aux cas isolés.',
      'Spécificité : identifiants, puis classes (et attributs, pseudo-classes), puis types — comparés compteur par compteur.',
      'À spécificité égale, la dernière règle écrite gagne ; <code>!important</code> passe avant tout, au prix de la lisibilité.',
      'Modèle de boîte : contenu, padding, bordure, marge ; <code>border-box</code> englobe padding et bordure dans <code>width</code>.',
      '<code>rem</code> suit les préférences du lecteur ; <code>px</code> reste une valeur absolue.'
    ],

    checklist: [
      'Je choisis un sélecteur adapté et je justifie mon choix.',
      'Je calcule la spécificité de deux sélecteurs et je prédis le gagnant.',
      'Je calcule la largeur réelle d’une boîte avec et sans <code>border-box</code>.',
      'Je choisis mes unités en fonction de l’usage, pas de l’habitude.'
    ],

    notions: ['règle CSS', 'sélecteur de classe', 'sélecteur d’identifiant', 'sélecteur descendant', 'pseudo-classe', 'spécificité', 'héritage', 'modèle de boîte', 'box-sizing', 'rem et em'],
    mastery: [
      { cls: 'low', text: '&lt; 50 % — Reprenez la section 3 et recalcule cinq triplets de spécificité à la main.' },
      { cls: 'mid', text: '50–69 % — Refaites l’exercice 1 du module : spécificité d’un sélecteur.' },
      { cls: 'good', text: '70–94 % — Bon niveau : cible le modèle de boîte et les unités relatives.' },
      { cls: 'top', text: '≥ 95 % — Maîtrise : passe au chapitre 5, la mise en page.' }
    ],

    flashcards: [
      { q: 'Comment se calcule la spécificité ?', a: 'Trois compteurs : identifiants, puis classes/attributs/pseudo-classes, puis types/pseudo-éléments.' },
      { q: 'Que change box-sizing: border-box ?', a: 'La largeur déclarée englobe padding et bordure : la boîte ne déborde plus de la largeur annoncée.' },
      { q: 'Quelles propriétés s’héritent ?', a: 'Surtout celles du texte : color, font-*, line-height. Pas les marges, bordures ni position.' },
      { q: 'Pourquoi préférer rem à px pour du texte ?', a: 'Parce que rem suit la taille de base choisie par l’utilisateur, donc ses préférences d’accessibilité.' },
      { q: 'Que signifie une déclaration barrée dans l’inspecteur ?', a: 'Qu’une autre règle l’a emporté : plus spécifique, ou écrite plus loin à spécificité égale.' }
    ]
  },

  /* ==================== Chapitre 5 ==================== */
  {
    n: 5,
    title: 'CSS : mise en page, flexbox et responsive',
    short: 'Mise en page',
    toc: 'Flux normal, display et position, flexbox, grille CSS, media queries et design fluide.',
    time: '≈ 3 h 30 de travail',

    situation:
      'Le contenu s’empile verticalement, et c’est normal : c’est le <em>flux normal</em> du document. Toute ' +
      'mise en page commence par une décision — sortir du flux ou le réorganiser. Flexbox range des éléments ' +
      'sur une ligne ou une colonne, la grille place des cellules dans un tableau virtuel, et les media ' +
      'queries changent les règles selon la largeur disponible.',

    objectives: [
      'expliquer le flux normal et décider quand le quitter ;',
      'choisir entre flexbox et grille pour une mise en page donnée ;',
      'aligner et répartir des éléments avec flexbox ;',
      'construire une grille responsive à colonnes adaptatives ;',
      'écrire une interface lisible de 320 px à 1600 px de large.'
    ],

    sections: [
      {
        title: 'Le flux normal et la décision de mise en page',
        html: [
          '<p>Sans CSS de disposition, les éléments s’empilent dans l’ordre du document : les éléments de type ' +
          'bloc (<code>div</code>, <code>p</code>, <code>h1</code>) prennent toute la largeur et se placent ' +
          'l’un sous l’autre ; les éléments en ligne (<code>a</code>, <code>span</code>, <code>strong</code>) ' +
          's’écoulent dans le texte. C’est le <strong>flux normal</strong>.</p>',
          '<p>Deux familles de mise en page s’y ajoutent, et le choix se fait sur le besoin :</p>',
          '<table>\n' +
          '    <tr><th>Besoin</th><th>Outil</th></tr>\n' +
          '    <tr><td>ranger des éléments sur une ligne, les espacer, les aligner</td><td>flexbox</td></tr>\n' +
          '    <tr><td>organiser un ensemble en lignes <em>et</em> colonnes</td><td>grille CSS</td></tr>\n' +
          '    <tr><td>sortir un élément du flux pour le superposer</td><td><code>position</code></td></tr>\n' +
          '  </table>',
          box('intuition', 'Intuition — une dimension ou deux ?', 'compass',
            '    <p>Si vous pouvez répondre à la question « qu’est-ce qui est rangé ? » par un alignement, c’est ' +
            'flexbox. Si vous devez dessiner des lignes <em>et</em> des colonnes, c’est une grille. Les deux se ' +
            'combinent : une grille de cartes dont chaque carte est elle-même une flexbox.</p>')
        ].join('\n')
      },
      {
        title: 'display et position',
        html: [
          '<p><code>display</code> décide du comportement de l’élément dans le flux. Les valeurs qui comptent :</p>',
          '<table>\n' +
          '    <tr><th>Valeur</th><th>Effet</th></tr>\n' +
          '    <tr><td><code>block</code></td><td>toute la largeur, sur sa propre ligne</td></tr>\n' +
          '    <tr><td><code>inline</code></td><td>s’écoule dans le texte ; <code>width</code> et <code>height</code> ignorés</td></tr>\n' +
          '    <tr><td><code>inline-block</code></td><td>dans la ligne, mais dimensionnable</td></tr>\n' +
          '    <tr><td><code>flex</code></td><td>l’élément devient conteneur flex pour ses enfants</td></tr>\n' +
          '    <tr><td><code>grid</code></td><td>l’élément devient conteneur de grille</td></tr>\n' +
          '    <tr><td><code>none</code></td><td>l’élément disparaît, il ne réserve aucune place</td></tr>\n' +
          '  </table>',
          '<p><code>position</code> répond à une autre question : que faire si l’élément doit sortir du flux ? ' +
          '<code>relative</code> le décale sans changer la place réservée ; <code>absolute</code> le sort du ' +
          'flux et le place par rapport à son ancêtre positionné le plus proche ; <code>fixed</code> le fixe ' +
          'par rapport à la fenêtre ; <code>sticky</code> le colle à un bord pendant le défilement.</p>',
          box('pitfall', 'Piège — absolute sans ancêtre positionné', 'warning',
            '    <p>Un élément en <code>absolute</code> se place par rapport à son ancêtre le plus proche ' +
            'qui porte une <code>position</code>. Si aucun n’en a, il se place par rapport à la page — et ' +
            '« la fenêtre » d’aujourd’hui n’est plus celle de demain. La règle : un parent ' +
            '<code>position: relative</code> dès qu’un enfant est en <code>absolute</code>.</p>')
        ].join('\n')
      },
      {
        title: 'Flexbox',
        html: [
          '<p>Un conteneur flex range ses enfants sur un axe principal, dont l’orientation se choisit avec ' +
          '<code>flex-direction</code>. Deux axes sont concernés : le principal (<code>row</code> par défaut) ' +
          'et le transversal.</p>',
          code([
            '.barre {',
            '  display: flex;',
            '  flex-direction: row;      /* ou column */',
            '  justify-content: space-between;   /* axe principal : répartition */',
            '  align-items: center;              /* axe transversal : alignement */',
            '  gap: 16px;                        /* espace entre les enfants */',
            '  flex-wrap: wrap;                  /* passe à la ligne si nécessaire */',
            '}',
            '',
            '.carte { flex: 1 1 260px; }   /* grandir | rétrécir | base de 260px */'
          ]),
          '<p>Le raccourci <code>flex: 1 1 260px</code> se lit : les cartes partagent l’espace disponible, ' +
          'peuvent se rétrécir, et souhaitent au moins 260 px. C’est la façon la plus simple d’obtenir des ' +
          'colonnes élastiques sans média query.</p>',
          '<table>\n' +
          '    <tr><th>Propriété</th><th>Axe</th><th>Valeurs utiles</th></tr>\n' +
          '    <tr><td><code>justify-content</code></td><td>principal</td><td>flex-start, center, space-between, space-around</td></tr>\n' +
          '    <tr><td><code>align-items</code></td><td>transversal</td><td>stretch, flex-start, center, baseline</td></tr>\n' +
          '    <tr><td><code>gap</code></td><td>les deux</td><td>une longueur</td></tr>\n' +
          '  </table>',
          box('mnemo', 'Mnémotechnique — « justify suit la direction, align la traverse »', 'pin',
            '    <p>En <code>row</code> : <code>justify-content</code> répartit horizontalement, ' +
            '<code>align-items</code> centre verticalement. En <code>column</code>, les deux rôles ' +
            's’échangent — d’où l’intérêt de raisonner en <em>axes</em> plutôt qu’en horizontal/vertical.</p>')
        ].join('\n')
      },
      {
        title: 'Grille CSS',
        html: [
          '<p>Une grille définit des colonnes et des lignes, puis laisse les enfants s’y placer. ' +
          '<code>repeat()</code> évite d’écrire dix fois la même largeur, et <code>minmax()</code> fixe des ' +
          'bornes.</p>',
          code([
            '.galerie {',
            '  display: grid;',
            '  grid-template-columns: repeat(3, 1fr);   /* trois colonnes égales */',
            '  gap: 12px;',
            '}',
            '',
            '/* colonnes adaptatives : le nombre de colonnes suit la place disponible */',
            '.auto {',
            '  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));',
            '}',
            '',
            '.entete {',
            '  grid-column: 1 / -1;         /* toute la largeur, de la première à la dernière ligne */',
            '}'
          ]),
          '<p>L’unité <code>fr</code> représente une <em>fraction</em> de l’espace restant : ' +
          '<code>repeat(3, 1fr)</code> partage la largeur en trois parts égales, quel que soit l’écran. ' +
          '<code>grid-column: 1 / -1</code> fait couvrir toutes les colonnes à un élément — la façon la plus ' +
          'courte d’obtenir un en-tête pleine largeur.</p>',
          box('tech', 'auto-fit et auto-fill', 'terminal',
            '    <p><code>auto-fit</code> étire les colonnes existantes pour remplir la ligne ; ' +
            '<code>auto-fill</code> crée des colonnes vides supplémentaires. Pour une galerie de cartes, ' +
            '<code>auto-fit</code> est presque toujours le bon choix : il évite une bande vide à droite.</p>')
        ].join('\n')
      },
      {
        title: 'Responsive : media queries et approche mobile d’abord',
        html: [
          '<p>Une <strong>media query</strong> applique un bloc de règles seulement si la condition est ' +
          'vraie. La condition la plus courante porte sur la largeur de la fenêtre.</p>',
          code([
            '/* base : mobile */',
            '.grille { display: grid; gap: 16px; grid-template-columns: 1fr; }',
            '',
            '/* tablette */',
            '@media (min-width: 600px) {',
            '  .grille { grid-template-columns: repeat(2, 1fr); }',
            '}',
            '',
            '/* bureau */',
            '@media (min-width: 900px) {',
            '  .grille { grid-template-columns: repeat(3, 1fr); }',
            '}'
          ]),
          '<p>Écrire d’abord le style mobile puis ajouter des règles par paliers croissants s’appelle ' +
          'travailler <strong>mobile first</strong>. Cette approche produit un CSS plus court et des ' +
          'interfaces utilisables depuis le plus petit écran.</p>',
          '<table>\n' +
          '    <tr><th>Palier</th><th>Largeur</th><th>Colonnes</th></tr>\n' +
          '    <tr><td>téléphone</td><td>&lt; 600 px</td><td>1</td></tr>\n' +
          '    <tr><td>tablette</td><td>600 – 899 px</td><td>2</td></tr>\n' +
          '    <tr><td>bureau</td><td>≥ 900 px</td><td>3</td></tr>\n' +
          '  </table>',
          box('pitfall', 'Piège — la balise viewport oubliée', 'warning',
            '    <p>Sans <code>&lt;meta name="viewport" content="width=device-width, initial-scale=1.0"&gt;</code>, ' +
            'un téléphone affiche la page comme un écran de bureau réduit : la media query ne se déclenche ' +
            'jamais comme prévu, et le texte devient minuscule.</p>')
        ].join('\n')
      },
      {
        title: 'Design fluide : moins de paliers, plus de souplesse',
        html: [
          '<p>Toutes les tailles n’ont pas besoin d’un palier. Trois fonctions permettent de décrire une ' +
          'adaptation continue :</p>',
          '<ul>\n' +
          '    <li><code>clamp(minimum, idéal, maximum)</code> : borne une valeur fluide — typiquement une ' +
          'taille de titre ;</li>\n' +
          '    <li><code>minmax(minimum, maximum)</code> : borne une piste de grille ;</li>\n' +
          '    <li><code>min()</code> et <code>max()</code> : choisissent la plus petite ou la plus grande de ' +
          'plusieurs valeurs.</li>\n' +
          '  </ul>',
          code([
            'h1 { font-size: clamp(1.6rem, 4vw, 2.8rem); }',
            '',
            '/* une colonne de texte qui ne dépasse jamais 65 caractères environ */',
            '.lecture { max-width: min(65ch, 100%); margin-inline: auto; }',
            '',
            '.galerie { grid-template-columns: repeat(auto-fit, minmax(min(240px, 100%), 1fr)); }'
          ]),
          '<p>Le dernier exemple est le plus utile : <code>min(240px, 100%)</code> empêche la grille de ' +
          'déborder sur un écran plus étroit que 240 px. C’est le détail qui distingue une grille qui ' +
          '« tient » d’une grille parfaite.</p>',
          box('method', 'Méthode : du plus petit au plus grand', 'compass',
            '    <p>Construisez la version étroite d’abord, vérifiez-la à 320 px, puis élargissez la fenêtre ' +
            'progressivement en corrigeant à chaque rupture visible. Un rendu n’est terminé que lorsqu’il se ' +
            'tient à toutes les largeurs entre 320 px et 1600 px, pas seulement aux trois paliers.</p>')
        ].join('\n')
      }
    ],

    questions: [
      { stem: 'Quel outil pour ranger des éléments sur une seule ligne, avec espacement ?', opts: ['grid', 'flexbox', 'position: absolute'], correct: 1, exp: 'Flexbox travaille sur un axe : c’est son terrain.' },
      { stem: 'Dans un conteneur flex en row, que règle justify-content ?', opts: ['l’axe transversal', 'l’axe principal', 'les marges'], correct: 1, exp: 'justify-content agit sur l’axe principal ; align-items sur le transversal.' },
      { stem: 'Que signifie repeat(3, 1fr) ?', opts: ['trois colonnes égales', 'trois lignes de 1 pixel', 'une colonne de 3 pixels'], correct: 0, exp: 'fr est une fraction de l’espace restant : trois parts égales.' },
      { stem: 'Quelle écriture fait couvrir toutes les colonnes à un élément ?', opts: ['grid-column: 1 / -1', 'width: 100%', 'display: block'], correct: 0, exp: 'De la première ligne de grille à la dernière : toute la largeur.' },
      { stem: 'Que fait une media query (min-width: 600px) ?', opts: ['elle s’applique en dessous de 600px', 'elle s’applique à partir de 600px', 'elle mesure la hauteur'], correct: 1, exp: 'min-width est une borne basse : la règle s’applique dès que la largeur atteint 600px.' },
      { stem: 'À quoi sert clamp(1.6rem, 4vw, 2.8rem) ?', opts: ['à borner une taille fluide entre deux limites', 'à centrer un texte', 'à empêcher le défilement'], correct: 0, exp: 'La taille suit 4vw mais reste comprise entre le minimum et le maximum.' }
    ],

    pitfalls: [
      '<strong>Choisir une grille pour un simple alignement</strong> : flexbox suffit et coûte moins de code.',
      '<strong><code>position: absolute</code> sans parent positionné</strong> : l’élément se place par rapport à la page.',
      '<strong>Oublier <code>flex-wrap</code></strong> : les enfants se compriment au lieu de passer à la ligne.',
      '<strong>Media query sans <code>viewport</code></strong> : le palier ne se déclenche pas comme prévu sur téléphone.',
      '<strong>Tester seulement aux paliers</strong> : les largeurs intermédiaires (par exemple 700 px) cassent souvent.'
    ],

    methodTitle: 'Construire une mise en page solide',
    method: [
      '<strong>Pars du flux normal</strong> et ne le quitte que si le besoin est réel.',
      '<strong>Choisissez flexbox pour un axe</strong>, la grille pour deux dimensions.',
      '<strong>Écrivez le style mobile d’abord</strong>, puis ajoute des paliers croissants.',
      '<strong>Utilisez <code>gap</code></strong> plutôt que des marges entre éléments.',
      '<strong>Vérifiez en continu</strong> entre 320 px et 1600 px, pas seulement aux paliers.'
    ],

    summary: [
      'Le flux normal empile les blocs et fait couler les éléments en ligne : c’est le point de départ.',
      '<code>display</code> choisit le comportement (block, inline, flex, grid, none) ; <code>position</code> sort du flux.',
      'Flexbox range sur un axe : direction, justify-content, align-items, gap, flex-wrap.',
      'La grille organise deux dimensions : <code>grid-template-columns</code>, <code>fr</code>, <code>gap</code>, placement par lignes.',
      'Les media queries appliquent des règles à partir d’une largeur : approche mobile first.',
      '<code>clamp()</code>, <code>minmax()</code> et <code>auto-fit</code> rendent la mise en page fluide sans multiplier les paliers.'
    ],

    checklist: [
      'Je choisis entre flexbox et grille en justifiant mon choix.',
      'Je construis une galerie responsive sans media query grâce à auto-fit.',
      'J’écris une interface mobile first avec deux paliers de media queries.',
      'Je vérifie mon rendu à 320 px, 700 px et 1600 px.'
    ],

    notions: ['flux normal', 'display', 'position', 'flex-direction', 'justify-content', 'align-items', 'grid-template-columns', 'fr', 'media query', 'mobile first', 'clamp'],
    mastery: [
      { cls: 'low', text: '&lt; 50 % — Reprenez la section 1 et reproduis une barre de navigation en flexbox.' },
      { cls: 'mid', text: '50–69 % — Refaites les exercices 1 et 2 du module : flex et paliers.' },
      { cls: 'good', text: '70–94 % — Bon niveau : cible la grille, <code>auto-fit</code> et les paliers exacts.' },
      { cls: 'top', text: '≥ 95 % — Maîtrise : passe au chapitre 6, le DOM et les événements.' }
    ],

    flashcards: [
      { q: 'Flexbox ou grille : comment trancher ?', a: 'Un axe à ranger : flexbox. Lignes et colonnes à organiser : grille.' },
      { q: 'Que fait grid-column: 1 / -1 ?', a: 'L’élément occupe toute la largeur de la grille, de la première à la dernière ligne de colonnes.' },
      { q: 'Pourquoi écrire le style mobile d’abord ?', a: 'Parce que le CSS reste plus court et que l’interface est utilisable dès le plus petit écran.' },
      { q: 'Que fait repeat(auto-fit, minmax(240px, 1fr)) ?', a: 'Il crée autant de colonnes d’au moins 240 px que la largeur le permet, puis les étire pour remplir la ligne.' },
      { q: 'À quoi sert clamp(min, idéal, max) ?', a: 'À rendre une valeur fluide tout en la bornant entre un minimum et un maximum.' }
    ]
  },

  /* ==================== Chapitre 6 ==================== */
  {
    n: 6,
    title: 'JavaScript : le DOM et les événements',
    short: 'JavaScript & DOM',
    toc: 'Chargement du script, variables et fonctions, tableaux, sélection et modification du DOM, événements, sûreté.',
    time: '≈ 3 h 30 de travail',

    situation:
      'La page est chargée, l’utilisateur clic sur un bouton, et rien ne bouge. Le JavaScript est le seul ' +
      'langage de la page qui puisse réagir après l’affichage : il lit le document, le modifie, écoute les ' +
      'événements. Encore faut-il qu’il s’exécute au bon moment, qu’il trouve les éléments qu’il cherche et ' +
      'qu’il n’écrase pas le travail du navigateur.',

    objectives: [
      'placer et charger un script sans bloquer la page ;',
      'écrire des variables, conditions et fonctions lisibles ;',
      'transformer un tableau de données avec map, filter et sort ;',
      'sélectionner et modifier des éléments du DOM ;',
      'écouter un événement et y répondre correctement, sans faille de sûreté.'
    ],

    sections: [
      {
        title: 'Où et quand un script s’exécute',
        html: [
          '<p>Un <code>&lt;script&gt;</code> s’exécute là où le navigateur le rencontre. Placer une balise en ' +
          'haut du <code>body</code> revient à demander à un script de manipuler des éléments qui n’existent ' +
          'pas encore.</p>',
          code([
            '<!-- à éviter : le script s’exécute avant que le titre existe -->',
            '<script src="app.js"></script>',
            '<h1 id="titre">Mes notes</h1>',
            '',
            '<!-- préférable : le script attend la fin de l’analyse du document -->',
            '<script src="app.js" defer></script>',
            '',
            '<!-- ou : placé en fin de body -->',
            '<h1 id="titre">Mes notes</h1>',
            '<script src="app.js"></script>'
          ]),
          '<p><code>defer</code> télécharge le script en parallèle du HTML et l’exécute une fois le document ' +
          'analysé, dans l’ordre des balises. C’est l’attribut à retenir par défaut. <code>async</code>, lui, ' +
          'exécute le script dès qu’il est téléchargé, sans garantie d’ordre : il se réserve aux scripts ' +
          'indépendants.</p>',
          box('tech', 'Vérifier que le script est bien chargé', 'terminal',
            '    <p>Dans la console du navigateur, écris le nom d’une fonction de ton script : si elle n’est ' +
            'pas définie, le fichier n’a pas été chargé (chemin faux) ou a produit une erreur avant sa ' +
            'déclaration. L’onglet Console affiche cette erreur en rouge, avec sa ligne.</p>')
        ].join('\n')
      },
      {
        title: 'Variables, types et fonctions',
        html: [
          '<p>Deux déclarations suffisent au quotidien : <code>const</code> pour une valeur qu’on ne réassigne ' +
          'pas, <code>let</code> pour une variable qui change. <code>var</code> appartient au JavaScript ' +
          'd’avant 2015 : on ne l’utilise plus.</p>',
          code([
            'const titre = "Mes notes";          // chaîne',
            'let note = 16;                     // nombre',
            'const admis = true;                // booléen',
            'const eleves = ["Ada", "Linus"];   // tableau',
            'const fiche = { nom: "Ada", note: 18 };   // objet',
            '',
            'function moyenne(valeurs) {',
            '  const total = valeurs.reduce((somme, v) => somme + v, 0);',
            '  return valeurs.length ? total / valeurs.length : 0;',
            '}',
            '',
            'const double = x => x * 2;   // fonction fléchée'
          ]),
          '<p>Quelques réflexes : préférer <code>const</code> par défaut, comparer avec ' +
          '<code>===</code> (égalité stricte, sans conversion de type), et tester les longueurs ' +
          '(<code>length</code>) plutôt que la vérité d’un tableau vide.</p>',
          box('pitfall', 'Piège — = et ==, la confusion classique', 'warning',
            '    <p><code>=</code> affecte, <code>==</code> compare en convertissant les types, ' +
            '<code>===</code> compare sans convertir. <code>"10" == 10</code> est vrai (surprise), ' +
            '<code>"10" === 10</code> est faux (attendu). On écrit toujours <code>===</code>.</p>')
        ].join('\n')
      },
      {
        title: 'Tableaux : transformer plutôt que boucler',
        html: [
          '<p>Trois méthodes couvrent la majorité des traitements de données, et chacune renvoie un ' +
          '<em>nouveau</em> tableau sans modifier l’original.</p>',
          '<table>\n' +
          '    <tr><th>Méthode</th><th>Ce qu’elle fait</th><th>Renvoie</th></tr>\n' +
          '    <tr><td><code>map</code></td><td>transforme chaque élément</td><td>un tableau de même longueur</td></tr>\n' +
          '    <tr><td><code>filter</code></td><td>garde les éléments qui passent un test</td><td>un tableau plus court</td></tr>\n' +
          '    <tr><td><code>sort</code></td><td>trie sur place selon une comparaison</td><td>le tableau trié (attention : il modifie l’original)</td></tr>\n' +
          '  </table>',
          code([
            'const eleves = [',
            '  { nom: "Ada", note: 18 },',
            '  { nom: "Linus", note: 15 },',
            '  { nom: "Bob", note: 8 }',
            '];',
            '',
            'const admis = eleves',
            '  .filter(e => e.note >= 10)',
            '  .sort((a, b) => b.note - a.note);',
            '',
            'console.log(admis.map(e => e.nom));   // ["Ada", "Linus"]'
          ]),
          '<p>La fonction de comparaison de <code>sort</code> renvoie un nombre négatif si le premier ' +
          'élément doit passer avant le second. Il faut donc connaître deux réflexes : ' +
          '<code>a - b</code> trie du plus petit au plus grand, <code>b - a</code> l’inverse, et ' +
          '<code>localeCompare</code> compare deux textes en respectant la langue et les accents.</p>',
          box('intuition', 'Intuition — le tri se paie en prévisibilité', 'compass',
            '    <p><code>sort</code> modifie le tableau d’origine, contrairement à <code>map</code> et ' +
            '<code>filter</code>. Sur des données affichées ailleurs dans la page, une copie ' +
            '(<code>[...eleves].sort(...)</code>) évite d’altérer l’ordre des autres affichages.</p>')
        ].join('\n')
      },
      {
        title: 'Le DOM : sélectionner et modifier',
        html: [
          '<p>Le <strong>DOM</strong> est la représentation de la page sous forme d’arbre d’objets. On y ' +
          'accède par des sélecteurs identiques à ceux du CSS.</p>',
          '<table>\n' +
          '    <tr><th>Méthode</th><th>Renvoie</th><th>Usage</th></tr>\n' +
          '    <tr><td><code>document.querySelector("…")</code></td><td>le premier élément correspondant, ou <code>null</code></td><td>cibler un élément connu</td></tr>\n' +
          '    <tr><td><code>document.querySelectorAll("…")</code></td><td>une liste de tous les correspondants</td><td>parcourir un ensemble</td></tr>\n' +
          '  </table>',
          code([
            'const titre = document.querySelector("#titre");',
            'titre.textContent = "Mes notes du semestre 1";',
            'titre.classList.add("titre--note");',
            '',
            'const liste = document.querySelector("#notes");',
            'liste.innerHTML = "";                    // on vide proprement',
            '',
            'for (const ligne of lignes) {',
            '  const item = document.createElement("li");',
            '  item.textContent = ligne.nom + " : " + ligne.note;',
            '  liste.append(item);',
            '}'
          ]),
          '<p>Créer un élément puis renseigner son <code>textContent</code> est la méthode sûre : le contenu ' +
          'est traité comme du texte, jamais comme du balisage. <code>classList</code> ajoute ou retire des ' +
          'classes sans toucher au reste de l’attribut.</p>',
          box('pitfall', 'Piège — null n’a pas de propriétés', 'warning',
            '    <p><code>document.querySelector("#titrre")</code> renvoie <code>null</code> si le sélecteur ' +
            'ne correspond à rien. La ligne suivante échoue alors avec « Cannot read properties of null ». ' +
            'C’est le message d’erreur le plus fréquent du JavaScript de navigation : il signifie presque ' +
            'toujours « votre sélecteur ne cible rien » ou « le script tourne trop tôt ».</p>')
        ].join('\n')
      },
      {
        title: 'Les événements',
        html: [
          '<p>Un événement est un signal : clic, frappe au clavier, envoi de formulaire, chargement. On y ' +
          'répond en attachant une fonction écouteuse.</p>',
          code([
            'const bouton = document.querySelector("#calcul");',
            '',
            'bouton.addEventListener("click", () => {',
            '  const note = Number(document.querySelector("#note").value);',
            '  if (Number.isNaN(note)) {',
            '    document.querySelector("#message").textContent = "Notez attendue : un nombre.";',
            '    return;',
            '  }',
            '  document.querySelector("#message").textContent = note >= 10 ? "Admis" : "Non admis";',
            '});',
            '',
            'const formulaire = document.querySelector("form");',
            'formulaire.addEventListener("submit", evenement => {',
            '  evenement.preventDefault();      // le navigateur ne recharge pas la page',
            '  // … traitement, puis envoi décidé par le script',
            '});'
          ]),
          '<p>Deux précautions rendent le code robuste. D’abord, un champ de saisie renvoie toujours une ' +
          '<strong>chaîne</strong> : convertir avec <code>Number()</code> avant de calculer, et tester ' +
          '<code>Number.isNaN()</code>. Ensuite, pour beaucoup d’éléments, il vaut mieux écouter une seule ' +
          'fois sur le conteneur : c’est la <strong>délégation</strong>.</p>',
          code([
            '// délégation : un seul écouteur pour toute la liste',
            'document.querySelector("#notes").addEventListener("click", evenement => {',
            '  if (evenement.target.matches("li")) {',
            '    evenement.target.classList.toggle("est-selectionne");',
            '  }',
            '});'
          ]),
          box('mnemo', 'Mnémotechnique — « un écouteur sur le parent, pas dix sur les enfants »', 'pin',
            '    <p>Les éléments créés après le chargement n’existent pas encore quand on attache les ' +
            'écouteurs. Déléguer au parent réglé le problème une fois pour toutes, et le code reste juste ' +
            'même si la liste change.</p>')
        ].join('\n')
      },
      {
        title: 'Écrire du JavaScript sûr',
        html: [
          '<p>Le JavaScript de page manipule des données qui viennent de l’extérieur : du texte saisi, un ' +
          'fichier JSON, une réponse de serveur. Trois règles suffisent à écarter les accidents les plus ' +
          'fréquents.</p>',
          '<ol>\n' +
          '    <li><strong>Texte ou balisage.</strong> <code>textContent</code> pour une donnée venue de ' +
          'l’utilisateur ; <code>innerHTML</code> réservé au balisage que vous écrivez vous-même.</li>\n' +
          '    <li><strong>Types.</strong> Ce qui sort d’un champ de formulaire est une chaîne : convertis, ' +
          'puis valide avant de calculer.</li>\n' +
          '    <li><strong>Valeurs absentes.</strong> Un sélecteur qui ne trouve rien renvoie ' +
          '<code>null</code> : teste le résultat avant de vous en servir.</li>\n' +
          '  </ol>',
          '<table>\n' +
          '    <tr><th>Écriture</th><th>Ce qui se passe</th></tr>\n' +
          '    <tr><td><code>zone.textContent = saisie;</code></td><td>la saisie est affichée telle quelle, en texte</td></tr>\n' +
          '    <tr><td><code>zone.innerHTML = saisie;</code></td><td>la saisie est interprétée comme du HTML — faille d’injection</td></tr>\n' +
          '    <tr><td><code>Number("12") + 1</code></td><td>13 : la conversion est faite explicitement</td></tr>\n' +
          '    <tr><td><code>"12" + 1</code></td><td>"121" : concaténation involontaire</td></tr>\n' +
          '  </table>',
          box('method', 'Méthode d’écriture d’un comportement', 'compass',
            '    <p>Écrivez toujours dans le même ordre : <strong>sélectionner</strong> les éléments (et tester ' +
            'qu’ils existent), <strong>écouter</strong> l’événement, <strong>lire et convertir</strong> les ' +
            'données, <strong>valider</strong>, puis <strong>afficher</strong> avec ' +
            '<code>textContent</code>. Un comportement qui suit cet ordre est presque toujours correct du ' +
            'premier coup.</p>')
        ].join('\n')
      }
    ],

    questions: [
      { stem: 'Pourquoi placer un script avec defer plutôt qu’en haut de page ?', opts: ['il s’exécute après l’analyse du HTML', 'il s’exécute plus vite', 'il ne peut pas échouer'], correct: 0, exp: 'defer attend la fin de l’analyse : les éléments visés existent alors.' },
      { stem: 'Quelle déclaration pour une valeur jamais réassignée ?', opts: ['var', 'let', 'const'], correct: 2, exp: 'const exprime une intention : la valeur ne changera pas.' },
      { stem: 'Quelle méthode transforme chaque élément d’un tableau ?', opts: ['filter', 'map', 'sort'], correct: 1, exp: 'map renvoie un tableau de même longueur avec chaque élément transformé.' },
      { stem: 'Que renvoie querySelector si rien ne correspond ?', opts: ['undefined', 'null', 'un tableau vide'], correct: 1, exp: 'null : c’est ce qui produit ensuite l’erreur « Cannot read properties of null ».' },
      { stem: 'Que fait evenement.preventDefault() dans un submit ?', opts: ['il annule le rechargement de la page', 'il désactive le formulaire', 'il valide les champs'], correct: 0, exp: 'Il empêche le comportement par défaut du navigateur et laisse le script décider.' },
      { stem: 'Comment afficher une saisie utilisateur sans risque ?', opts: ['innerHTML', 'textContent', 'insertAdjacentHTML'], correct: 1, exp: 'textContent traite la valeur comme du texte : aucune injection possible.' }
    ],

    pitfalls: [
      '<strong>Sélecteur qui ne cible rien</strong> : <code>null.textContent</code> échoue ; vérifie l’orthographe de l’<code>id</code>.',
      '<strong>Script exécuté avant le DOM</strong> : utilise <code>defer</code> ou place le script en fin de <code>body</code>.',
      '<strong>Oublier de convertir</strong> : <code>"12" + 1</code> donne <code>"121"</code>, pas 13.',
      '<strong>Écouter chaque enfant au lieu du parent</strong> : le code casse dès qu’un élément est ajouté dynamiquement.',
      '<strong>Utiliser <code>innerHTML</code> avec une donnée utilisateur</strong> : la donnée devient du code exécutable.'
    ],

    methodTitle: 'Écrire un comportement, du début à la fin',
    method: [
      '<strong>Sélectionne</strong> les éléments par <code>querySelector</code> et vérifie qu’ils existent.',
      '<strong>Charge le script avec <code>defer</code></strong> pour qu’ils soient présents.',
      '<strong>Écoute</strong> l’événement, au bon niveau (parent pour les listes).',
      '<strong>Lisez, convertissez puis validez</strong> les données avant tout calcul.',
      '<strong>Affichez avec <code>textContent</code></strong> ou en créant les éléments par ' +
      '<code>createElement</code>.'
    ],

    summary: [
      '<code>defer</code> exécute le script après l’analyse du HTML ; c’est le choix par défaut.',
      '<code>const</code> par défaut, <code>let</code> si la valeur change, <code>===</code> pour comparer.',
      '<code>map</code> transforme, <code>filter</code> sélectionne, <code>sort</code> trie — et modifie le tableau d’origine.',
      'Le DOM se sélectionne avec <code>querySelector</code> / <code>querySelectorAll</code>, qui renvoient <code>null</code> ou une liste.',
      'Un événement s’écoute avec <code>addEventListener</code> ; <code>preventDefault()</code> annule le comportement du navigateur.',
      'Une donnée d’origine extérieure s’affiche en <code>textContent</code>, jamais en <code>innerHTML</code>.'
    ],

    checklist: [
      'Je charge un script sans bloquer l’analyse du document.',
      'Je transforme un tableau de données avec map, filter et sort.',
      'Je sélectionne, crée et modifie des éléments du DOM.',
      'Je branche un écouteur d’événement et traite l’événement sans faille de sûreté.'
    ],

    notions: ['defer', 'const et let', 'égalité stricte', 'fonction fléchée', 'map', 'filter', 'sort', 'querySelector', 'textContent', 'addEventListener', 'preventDefault', 'délégation'],
    mastery: [
      { cls: 'low', text: '&lt; 50 % — Reprenez la section 4 : sélectionne et modifie trois éléments du DOM.' },
      { cls: 'mid', text: '50–69 % — Refaites l’exercice 2 du module : filtrer et trier des données.' },
      { cls: 'good', text: '70–94 % — Bon niveau : cible les événements et la conversion des valeurs de formulaire.' },
      { cls: 'top', text: '≥ 95 % — Maîtrise : le cours est terminé — passe aux examens blancs et à l’atelier.' }
    ],

    flashcards: [
      { q: 'Que fait l’attribut defer ?', a: 'Il télécharge le script en parallèle et l’exécute après l’analyse complète du HTML.' },
      { q: 'Différence entre map et filter ?', a: 'map transforme chaque élément et garde la même longueur ; filter garde seulement ceux qui passent un test.' },
      { q: 'Que renvoie querySelector ?', a: 'Le premier élément correspondant, ou null si aucun ne correspond.' },
      { q: 'À quoi sert preventDefault ?', a: 'À annuler le comportement par défaut du navigateur, par exemple le rechargement d’un formulaire.' },
      { q: 'Pourquoi déléguer les événements au parent ?', a: 'Pour gérer aussi les éléments créés après le chargement, avec un seul écouteur.' }
    ]
  }
];

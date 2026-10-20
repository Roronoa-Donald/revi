/**
 * Chapitre 6 du cours « UI/UX Design B2 » — Accessibilité Numérique Universelle &amp; Standards WCAG 2.1.
 */
'use strict';

const { box } = require('../../../scripts/course-kit');

module.exports = {
  n: 6,
  title: 'Accessibilité Numérique Universelle &amp; Standards WCAG 2.1',
  short: 'Accessibilité &amp; WCAG 2.1',
  toc: 'Fondements de l’inclusivité numérique, les 4 principes POUR du W3C, niveaux de conformité (A, AA, AAA), calcul formel des ratios de contraste et luminance sRGB, sémantique HTML et noms accessibles, navigation clavier et gestion du focus (tabindex), technologies d’assistance.',
  time: '≈ 3 h 00 de travail',
  free: false,
  lockLabel: 'Réservé B2 et plus',

  situation:
    'Dans le monde, plus de 1,3 milliard de personnes vivent avec une forme de handicap visuel, moteur, auditif ou cognitif. ' +
    'Pourtant, un audit des 1 million de pages d’accueil les plus visitées (rapport WebAIM Million) montre que 96 % d’entre elles ' +
    'présentent des barrières d’accessibilité majeures : contrastes insuffisants, images sans description textuelle, ' +
    'composants interactifs impossibles à activer au clavier seul. ' +
    'Au-delà de l’obligation morale d’inclusion, l’accessibilité numérique est désormais une exigence légale stricte ' +
    '(Directive européenne sur l’accessibilité / RGAA en France, Section 508 aux États-Unis). ' +
    'Ce module forme les étudiants à maîtriser les normes WCAG 2.1, à calculer formellement les ratios de contraste ' +
    'et à concevoir des interfaces universelles utilisables par tous, y compris via des lecteurs d’écran et sans souris.',

  objectives: [
    'assimiler les 4 principes fondamentaux POUR du W3C (Perceptible, Utilisable, Compréhensible, Robuste) ;',
    'distinguer les exigences des trois niveaux de conformité WCAG (Niveau A, AA et AAA) ;',
    'calculer la luminance relative sRGB et le ratio de contraste formel (norme WCAG 2.1) ;',
    'appliquer les règles de contraste : 4.5:1 pour texte normal (AA) et 3:1 pour grand texte ;',
    'auditer et baliser les images avec l’attribut alt approprié (décoratif vs informatif) ;',
    'maîtriser la navigation séquentielle au clavier, l’indicateur de focus visuel et l’attribut tabindex.'
  ],

  sections: [
    {
      title: 'Les 4 Piliers Fondamentaux du W3C : Le Modèle POUR',
      html: [
        '<p>Les <em>Web Content Accessibility Guidelines</em> (WCAG) élaborées par le consortium W3C ' +
        'reposent sur quatre grands principes universels :</p>',

        '<div class="grid grid-2">',
        '  <div class="card">',
        '    <h4>1. Perceptible (Perceivable)</h4>',
        '    <p>L’information et les composants de l’interface doivent être présentés aux utilisateurs ' +
        '    de façon à ce qu’ils puissent les percevoir avec au moins l’un de leurs sens. ' +
        '    Exemples : textes alternatifs pour les images, sous-titres pour les vidéos, contrastes de couleurs suffisants.</p>',
        '  </div>',
        '  <div class="card">',
        '    <h4>2. Utilisable (Operable)</h4>',
        '    <p>Les composants de l’interface et la navigation doivent être utilisables par tous les dispositifs d’entrée. ' +
        '    Exemples : navigabilité intégrale au clavier sans souris, temps de lecture suffisant, aucun contenu ' +
        '    provoquant des crises épileptiques (pas de clignotements rapides &gt; 3 Hz).</p>',
        '  </div>',
        '  <div class="card">',
        '    <h4>3. Compréhensible (Understandable)</h4>',
        '    <p>L’information et l’utilisation de l’interface doivent être intelligibles et prévisibles. ' +
        '    Exemples : langue de la page déclarée, navigation prévisible qui ne change pas inopinément de contexte au focus, ' +
        '    messages d’erreur explicites avec suggestions de correction.</p>',
        '  </div>',
        '  <div class="card">',
        '    <h4>4. Robuste (Robust)</h4>',
        '    <p>Le contenu doit pouvoir être interprété de manière fiable par une large variété d’agents utilisateurs, ' +
        '    notamment les technologies d’assistance (lecteurs d’écran NVDA, JAWS, VoiceOver). ' +
        '    Exemples : code HTML sémantiquement valide, rôles et états ARIA correctement déclarés.</p>',
        '  </div>',
        '</div>'
      ].join('\n')
    },
    {
      title: 'Niveaux de Conformité et Calcul Mathématique du Contraste',
      html: [
        '<p>Les WCAG définissent trois niveaux de conformité cumulatifs :</p>',
        '<ul>',
        '  <li><strong>Niveau A (Indispensable) :</strong> critères minimaux sans lesquels certains utilisateurs ne peuvent absolument pas accéder au service.</li>',
        '  <li><strong>Niveau AA (Standard Légal Requis) :</strong> niveau exigé par la législation européenne et internationale pour les services publics et grandes entreprises.</li>',
        '  <li><strong>Niveau AAA (Excellence Maximale) :</strong> niveau optimal réservé à des contextes hautement spécialisés.</li>',
        '</ul>',

        '<p>Le ratio de contraste entre la couleur du texte et la couleur de son arrière-plan ' +
        'repose sur la <strong>luminance relative sRGB</strong> normalisée selon la formule :</p>',

        '<pre><code>Pour chaque canal c in {R, G, B} normalise sur [0, 1] :\n' +
        '  si c &lt;= 0.04045 alors v = c / 12.92\n' +
        '  sinon v = ((c + 0.055) / 1.055) ** 2.4\n' +
        '\n' +
        'Luminance L = 0.2126 * R_lin + 0.7152 * G_lin + 0.0722 * B_lin\n' +
        '\n' +
        'Ratio = (L_max + 0.05) / (L_min + 0.05)</code></pre>',

        '<table class="table">',
        '  <thead>',
        '    <tr>',
        '      <th>Type de Contenu Visuel</th>',
        '      <th>Seuil Niveau AA (Requis)</th>',
        '      <th>Seuil Niveau AAA (Optimal)</th>',
        '    </tr>',
        '  </thead>',
        '  <tbody>',
        '    <tr>',
        '      <td><strong>Texte normal (&lt; 18pt / &lt; 24px)</strong></td>',
        '      <td><strong>4.50 : 1</strong></td>',
        '      <td><strong>7.00 : 1</strong></td>',
        '    </tr>',
        '    <tr>',
        '      <td><strong>Grand texte (&gt;= 18pt ou &gt;= 14pt gras)</strong></td>',
        '      <td><strong>3.00 : 1</strong></td>',
        '      <td><strong>4.50 : 1</strong></td>',
        '    </tr>',
        '    <tr>',
        '      <td><strong>Composants d’interface &amp; icônes clés</strong></td>',
        '      <td><strong>3.00 : 1</strong></td>',
        '      <td>Recommandé supérieur</td>',
        '    </tr>',
        '  </tbody>',
        '</table>',

        box(
          'tip',
          'Cas Fréquent du Gris sur Blanc',
          '<p>Le gris clair <code>#777777</code> sur fond blanc possède un ratio de <strong>4.48:1</strong>. ' +
          'Il échoue d’un cheveu au critère AA pour le texte normal (&lt; 4.5:1). Le gris <code>#767676</code> est le gris ' +
          'le plus clair admissible pour atteindre exactement le ratio de 4.54:1 et être certifié conforme.</p>'
        )
      ].join('\n')
    },
    {
      title: 'Sémantique HTML, Textes Alternatifs et Noms Accessibles',
      html: [
        '<p>Pour qu’un lecteur d’écran (comme VoiceOver ou NVDA) restitue fidèlement l’interface ' +
        'à un utilisateur malvoyant, chaque élément doit exposer un nom accessible clair :</p>',

        '<div class="grid grid-2">',
        '  <div class="card">',
        '    <h4>Images Décoratives vs Informatives</h4>',
        '    <p>Toute balise <code>&lt;img&gt;</code> DOIT posséder un attribut <code>alt</code> :</p>',
        '    <ul>',
        '      <li><strong>Image décorative :</strong> <code>&lt;img src="deco.png" alt=""&gt;</code>. L’attribut <code>alt=""</code> vide indique explicitement au lecteur d’écran de l’ignorer sans prononcer le nom du fichier.</li>',
        '      <li><strong>Image informative :</strong> <code>&lt;img src="graph.png" alt="Courbe des ventes en hausse de 12% en 2024"&gt;</code>. Décrit précisément le message véhiculé.</li>',
        '      <li><strong>Alt manquant :</strong> Grave erreur d’accessibilité ! Le lecteur vocal lit l’URL complète (ex: "image-slash-dc-1234-point-jpg").</li>',
        '    </ul>',
        '  </div>',
        '  <div class="card">',
        '    <h4>Boutons et Liens sans Texte Visible</h4>',
        '    <p>Les boutons contenant uniquement une icône graphique (ex: icône de loupe ou de croix) ' +
        '    sont complètement silencieux pour les technologies d’assistance à moins de leur associer un nom accessible :</p>',
        '    <pre><code>&lt;!-- Anti-pattern muet --&gt;\n' +
        '&lt;button class="icon"&gt;&lt;svg&gt;...&lt;/svg&gt;&lt;/button&gt;\n' +
        '\n' +
        '&lt;!-- Conforme et accessible --&gt;\n' +
        '&lt;button aria-label="Rechercher sur le site"&gt;\n' +
        '  &lt;svg aria-hidden="true"&gt;...&lt;/svg&gt;\n' +
        '&lt;/button&gt;</code></pre>',
        '  </div>',
        '</div>'
      ].join('\n')
    },
    {
      title: 'Navigation au Clavier et Gestion Rigoureuse du Focus',
      html: [
        '<p>Des millions de personnes naviguent sans souris (utilisateurs souffrant de tremblements essentiels, ' +
        'personnes tétraplégiques utilisant un contacteur, ou développeurs expérimentés adeptes de raccourcis). ' +
        'L’usage de l’attribut <code>tabindex</code> doit répondre à des règles strictes :</p>',

        '<table class="table">',
        '  <thead>',
        '    <tr>',
        '      <th>Valeur de tabindex</th>',
        '      <th>Comportement du navigateur</th>',
        '      <th>Cas d’usage légitime</th>',
        '    </tr>',
        '  </thead>',
        '  <tbody>',
        '    <tr>',
        '      <td><strong>tabindex="0"</strong></td>',
        '      <td>Insère l’élément dans l’ordre naturel de tabulation du document HTML.</td>',
        '      <td>Composant interactif personnalisé (ex: onglet custom, carte cliquable).</td>',
        '    </tr>',
        '    <tr>',
        '      <td><strong>tabindex="-1"</strong></td>',
        '      <td>Exclut l’élément de la tabulation séquentielle (touche Tab), mais permet de lui donner le focus par programmation JavaScript.</td>',
        '      <td>Fenêtre modale qui s’ouvre, conteneur d’erreur vers lequel faire défiler le focus.</td>',
        '    </tr>',
        '    <tr>',
        '      <td><strong>tabindex="&gt;0" (Positif)</strong></td>',
        '      <td>Force un ordre de tabulation prioritaire arbitraire avant le reste de la page.</td>',
        '      <td><strong>ANTI-PATTERN MAJEUR !</strong> À bannir formellement car il désorganise complètement le parcours clavier.</td>',
        '    </tr>',
        '  </tbody>',
        '</table>',

        box(
          'important',
          'Ne Jamais Supprimer le Contour de Focus (outline: none)',
          '<p>L’une des erreurs les plus fréquentes des intégrateurs est d’écrire <code>*:focus { outline: none; }</code> ' +
          'pour des raisons purement cosmétiques. Supprimer l’indicateur visuel de focus rend l’interface ' +
          'totalement inutilisable pour les personnes naviguant au clavier, qui ne savent plus où se trouve leur curseur.' +
          ' Si vous supprimez le contour par défaut, vous DEVEZ fournir un style de focus alternatif hautement contrasté.</p>'
        )
      ].join('\n')
    }
  ],

  methodTitle: 'Audit Méthodique de Conformité d’une Interface selon les WCAG 2.1',
  method: [
    'Étape 1 — Audit des contrastes colorimétriques : Passer en revue tous les textes et éléments d’UI avec un outil de pipette pour vérifier le ratio 4.5:1 sur texte normal.',
    'Étape 2 — Test de navigation clavier intégrale (No Mouse Test) : Débrancher la souris et naviguer sur l’ensemble du site uniquement avec Tab, Shift+Tab, Espace et Entrée.',
    'Étape 3 — Contrôle de visibilité de l’anneau de focus : Vérifier qu’un anneau d’accentuation contrasté entoure clairement chaque bouton ou lien recevant le focus.',
    'Étape 4 — Audit des attributs alternatifs des images : S’assurer que toutes les images ont un alt renseigné (descriptif pour l’information, vide pour la décoration).',
    'Étape 5 — Vérification des noms accessibles : Inspecter les boutons d’icônes, liens et champs de saisie pour valider la présence de labels explicites ou d’aria-label.',
    'Étape 6 — Test au lecteur d’écran : Parcourir l’écran les yeux fermés avec un lecteur vocal (VoiceOver sous macOS/iOS ou NVDA sous Windows) pour valider la fluidité auditive.'
  ],

  summary: [
    'Le modèle POUR du W3C fonde l’accessibilité : Perceptible, Utilisable, Compréhensible et Robuste.',
    'Le niveau AA des WCAG est la norme internationale et juridique requise pour les services numériques.',
    'Le ratio de contraste minimal pour le texte normal est de 4.5:1 (AA) et 7.0:1 (AAA). Pour le grand texte, il est de 3.0:1 (AA).',
    'Toutes les images doivent avoir un attribut alt : informatif s’il apporte du sens, vide alt="" s’il est purement décoratif.',
    'Les boutons contenant des icônes seules doivent impérativement définir un nom accessible (ex: aria-label="Fermer").',
    'tabindex=0 insère dans le flux séquentiel, tabindex=-1 permet le focus programmatique ; les tabindex positifs sont à proscrire.'
  ],

  checklist: [
    'Je connais la signification des 4 principes POUR du W3C.',
    'Je sais calculer la formule de luminance relative et le ratio de contraste.',
    'Je retiens les seuils minimaux : 4.5:1 pour le texte normal et 3.0:1 pour le grand texte (AA).',
    'Je sais quand utiliser alt="" vide pour masquer une image décorative aux lecteurs d’écran.',
    'Je sais pourquoi un bouton icône doit obligatoirement avoir un aria-label.',
    'Je proscris formellement outline: none et les valeurs de tabindex strictement positives.'
  ],

  notions: [
    'Principes POUR du W3C',
    'Niveaux de conformité WCAG (A, AA, AAA)',
    'Luminance relative sRGB',
    'Ratios de contraste (4.5:1 et 3:1)',
    'Textes alternatifs (alt décoratif vs informatif)',
    'Noms accessibles et aria-label',
    'Ordre de focus et attribut tabindex',
    'Indicateur visuel de focus (outline)'
  ],

  pitfalls: [
    'Supprimer l’outline de focus en CSS sans fournir d’alternative visible pour les navigateurs au clavier.',
    'Utiliser la couleur comme seul moyen de transmettre une information (ex: champ en rouge sans texte explicatif), bloquant les utilisateurs daltoniens.',
    'Oublier l’attribut alt sur une balise img, provoquant la lecture brute de l’URL par les lecteurs vocaux.',
    'Utiliser des tabindex positifs (ex: tabindex="1", "2") qui brisent l’ordre logique naturel du DOM.',
    'Confondre niveau de conformité AA (obligatoire légalement) et AAA (souhaitable mais non universellement imposé).'
  ],

  questions: [
    {
      stem: 'Que signifie l’acronyme POUR qui définit les quatre piliers fondamentaux des normes d’accessibilité WCAG du W3C ?',
      opts: [
        'Performant, Optimisé, Unifié, Rapide',
        'Perceptible, Utilisable (Operable), Compréhensible (Understandable), Robuste',
        'Programmé, Ouvert, Universel, Réactif',
        'Polyvalent, Organisé, Utile, Résilient'
      ],
      correct: 1,
      exp: 'POUR regroupe Perceptible, Utilisable (Operable), Compréhensible (Understandable) et Robuste, les 4 piliers universels du W3C.'
    },
    {
      stem: 'Quel est le ratio de contraste minimal exigé par le niveau AA des WCAG 2.1 pour un texte de taille normale sur son arrière-plan ?',
      opts: [
        '2.0 : 1',
        '3.0 : 1',
        '4.5 : 1',
        '10.0 : 1'
      ],
      correct: 2,
      exp: 'Le critère WCAG 1.4.3 (Niveau AA) impose un ratio de contraste minimal de 4.5:1 pour le texte normal (et 3.0:1 pour le grand texte).'
    },
    {
      stem: 'Quelle est la bonne pratique d’accessibilité pour une image purement décorative (ex: séparateur graphique ou onde de fond) ?',
      opts: [
        'Supprimer la balise img et la remplacer par du texte invisible',
        'Fournir un attribut alt="" vide explicite pour que le lecteur d’écran l’ignore silencieusement',
        'Ne pas mettre d’attribut alt du tout',
        'Écrire alt="Image décorative ne pas lire"'
      ],
      correct: 1,
      exp: 'L’attribut alt="" vide signale au lecteur d’écran que l’image est purement cosmétique, évitant ainsi de polluer la restitution sonore avec le nom du fichier.'
    },
    {
      stem: 'Pourquoi est-il strictement déconseillé d’utiliser des attributs tabindex avec des valeurs strictement positives (ex: tabindex="3") ?',
      opts: [
        'Parce que le navigateur refuse d’exécuter le JavaScript de la page',
        'Parce qu’ils forcent artificiellement l’ordre de tabulation hors du flux logique du DOM, désorientant totalement les utilisateurs naviguant au clavier',
        'Parce que cela bloque le téléchargement des images',
        'Parce qu’ils augmentent la taille du fichier HTML de manière critique'
      ],
      correct: 1,
      exp: 'Les tabindex positifs surchargent l’ordre de tabulation naturel et créent un parcours imprévisible et désordonné, considéré comme un anti-pattern majeur d’accessibilité.'
    },
    {
      stem: 'À quoi sert la valeur spéciale tabindex="-1" sur un conteneur HTML ou une modale ?',
      opts: [
        'À supprimer définitivement l’élément du document',
        'À retirer l’élément de la séquence de tabulation standard tout en permettant de lui donner le focus par script JavaScript (element.focus())',
        'À interdire tout clic de souris sur l’élément',
        'À inverser le sens de lecture du texte'
      ],
      correct: 1,
      exp: 'tabindex="-1" rend un élément focusable par programmation (très utile lors de l’ouverture d’une modale ou pour cibler un message d’erreur) sans l’insérer dans la boucle Tab standard.'
    },
    {
      stem: 'Pourquoi l’instruction CSS « outline: none; » appliquée globalement sur les éléments interactifs au focus constitue-t-elle un grave problème d’utilisabilité ?',
      opts: [
        'Elle empêche le clic gauche de fonctionner',
        'Elle supprime le témoin visuel indiquant à l’utilisateur au clavier quel élément est actuellement sélectionné',
        'Elle ralentit la vitesse de défilement de la page',
        'Elle change la couleur du texte en blanc sur blanc'
      ],
      correct: 1,
      exp: 'Sans indicateur visuel de focus, un utilisateur navigant avec la touche Tab est totalement aveugle quant à l’élément actif sur lequel il s’apprête à appuyer.'
    },
    {
      stem: 'Quel niveau de conformité WCAG est généralement exigé par les lois internationales et européennes (notamment le RGAA) pour les services en ligne ?',
      opts: [
        'Niveau A uniquement',
        'Niveau AA',
        'Niveau AAA obligatoire pour tous les sites',
        'Aucun niveau n’est légalement reconnu'
      ],
      correct: 1,
      exp: 'Le niveau AA est le standard légal universellement retenu : il garantit une accessibilité étendue sans imposer les contraintes extrêmes du niveau AAA.'
    },
    {
      stem: 'Comment rendre accessible un bouton contenant uniquement une icône SVG de loupe sans texte visible ?',
      opts: [
        'En ajoutant un attribut aria-label="Rechercher" sur la balise button',
        'En nommant le fichier SVG "recherche.svg"',
        'En augmentant la taille de l’icône à 100 pixels',
        'En passant la couleur du bouton en noir pur'
      ],
      correct: 0,
      exp: 'L’attribut aria-label fournit le nom accessible indispensable que le lecteur d’écran va prononcer à haute voix à l’utilisateur.'
    }
  ],

  flashcards: [
    {
      q: 'Que signifie le modèle POUR du W3C ?',
      a: 'Perceptible, Utilisable (Operable), Compréhensible (Understandable) et Robuste.'
    },
    {
      q: 'Quel est le ratio de contraste AA pour le texte normal ?',
      a: 'Au minimum 4.50 : 1 entre le texte et sa couleur de fond.'
    },
    {
      q: 'Quel est le ratio de contraste AA pour le grand texte (&gt;= 18pt) ?',
      a: 'Au minimum 3.00 : 1.'
    },
    {
      q: 'À quoi sert alt="" sur une balise image ?',
      a: 'Il indique au lecteur d’écran que l’image est purement décorative et doit être ignorée.'
    },
    {
      q: 'Pourquoi les tabindex positifs sont-ils interdits ?',
      a: 'Ils brisent l’ordre séquentiel logique du DOM et perturbent gravement la navigation clavier.'
    },
    {
      q: 'Pourquoi ne doit-on jamais supprimer l’indicateur de focus ?',
      a: 'Sans repère visuel de focus, les personnes naviguant au clavier ne savent plus quel élément est actif.'
    }
  ],

  mastery: [
    { cls: 'low', text: 'Moins de 4/8 : Révisez les piliers POUR, les seuils de contraste WCAG et la navigation clavier.' },
    { cls: 'mid', text: 'De 4 à 6/8 : Bonnes connaissances des standards. Approfondissez la gestion du focus et les noms accessibles ARIA.' },
    { cls: 'good', text: '7/8 : Très bonne maîtrise des critères d’accessibilité universelle et des normes WCAG 2.1.' },
    { cls: 'top', text: '8/8 : Score parfait ! Vous concevez des interfaces numériques éthiques, inclusives et conformes au niveau AA.' }
  ]
};

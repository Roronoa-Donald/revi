/**
 * Pages « examens » et « exercices » du cours « UI/UX Design B2 ».
 */
'use strict';

const { ic, crumb, box } = require('../../../../scripts/course-kit');
const { chnav, disclaimer } = require('./helpers');

/* ======================== Examens Blancs ======================== */

function examens(course) {
  const crumbs = crumb(course, [
    { label: 'Accueil', href: '../index.html' },
    { label: 'Sommaire', href: '../sommaire.html' },
    { label: 'Examens blancs' }
  ]);

  const body = [
    crumbs,
    '  <h1>Examens Blancs &amp; Épreuves Corrigées UI/UX Design B2</h1>',
    '  <p class="lead">Deux épreuves d’évaluation complètes conformes aux exigences académiques universitaires de niveau Bachelor 2 / Licence 2 en ergonomie numérique et conception centrée utilisateur.</p>',
    '',
    '  <h2>Épreuve 1 : Contrôle Continu (CC) — Durée 1 h 30 (Barème sur 20 points)</h2>',
    box('standard', 'Sujet du Contrôle Continu — CCU, Recherche Utilisateur &amp; Lois Cognitives', [
      '<h4>Partie 1 : Conception Centrée Utilisateur &amp; Double Diamant (6 points)</h4>',
      '<ol>',
      '  <li>Exposez les 4 phases du modèle du Double Diamant du Design Council. Précisez pour chaque phase s’il s’agit d’une démarche divergente ou convergente. (3 pts)</li>',
      '  <li>Pourquoi la création d’un Persona doit-elle impérativement reposer sur des données de recherche terrain (qualitatives et quantitatives) plutôt que sur l’intuition de l’équipe produit ? Quels sont les 5 champs clés d’un Persona ? (3 pts)</li>',
      '</ol>',
      '<h4>Partie 2 : Lois de l’Ergonomie Cognitive (8 points)</h4>',
      '<p>Un site e-commerce constate un taux d’abandon de 45% sur sa page de confirmation de commande mobile. Le bouton « Confirmer et Payer » mesure 20x20 px et se situe dans le coin supérieur droit à 500 px du bas de l’écran.</p>',
      '<ol>',
      '  <li>Analysez ce problème à travers la loi de Fitts. Quelle recommandation concrète de dimensionnement et de positionnement formulez-vous ? (4 pts)</li>',
      '  <li>Le formulaire présente une liste déroulante non triée de 48 options de livraison. Quelle loi psychologique explique la lenteur de choix des utilisateurs ? Comment réorganiser ce composant ? (4 pts)</li>',
      '</ol>',
      '<h4>Partie 3 : Design Systems &amp; Atomic Design (6 points)</h4>',
      '<ol>',
      '  <li>Détaillez la hiérarchie en 5 niveaux de l’Atomic Design de Brad Frost. Donnez un exemple concret pour chacun d’eux. (3 pts)</li>',
      '  <li>Expliquez l’intérêt technique et visuel du système de grille 8pt (8-point grid). (3 pts)</li>',
      '</ol>'
    ].join('\n')),
    '',
    box('solution', 'Corrigé type &amp; Barème détaillé du Contrôle Continu', [
      '<h4>Corrigé Partie 1 (6 points)</h4>',
      '<ul>',
      '  <li><strong>Double Diamant (3 pts) :</strong><br>',
      '    1. Découvrir (Divergent) : Exploration du problème par la recherche utilisateur et l’observation.<br>',
      '    2. Définir (Convergent) : Synthèse des insights, cadrage du problème et sélection des priorités.<br>',
      '    3. Développer (Divergent) : Idéation large, prototypage rapide et exploration de solutions.<br>',
      '    4. Livrer (Convergent) : Tests d’utilisabilité, sélection finale et recette de production.</li>',
      '  <li><strong>Persona (3 pts) :</strong> Un persona spéculatif non fondé sur des données réelles projette les biais cognitifs personnels de l’équipe (« je pense que l’utilisateur veut ceci »). Les 5 champs clés sont : Nom, Âge/Profil démographique, Métier/Contexte, Objectifs métier, Frustrations (Pain Points).</li>',
      '</ul>',
      '<h4>Corrigé Partie 2 (8 points)</h4>',
      '<ul>',
      '  <li><strong>Loi de Fitts (4 pts) :</strong> Selon la loi de Fitts <code>ID = log2(D/W + 1)</code>, une petite largeur (W=20px) combinée à une grande distance d’accès (D=500px) produit un indice de difficulté très élevé, augmentant drastiquement le temps d’atteinte et le taux d’erreur de ciblage tactile. Recommandation : placer un CTA pleine largeur (W=350px) en bas d’écran (Zone du pouce naturelle) avec une hauteur minimale de 48px.</li>',
      '  <li><strong>Loi de Hick &amp; Miller (4 pts) :</strong> La loi de Hick stipule que le temps de décision augmente avec le logarithme du nombre d’options <code>T = b * log2(n+1)</code>. De plus, 48 options dépassent largement la capacité de mémoire de travail de Miller (7 &plusmn; 2). Recommandation : regrouper les modes de livraison en 3 grandes catégories (Livraison Express, Standard à domicile, Point Relais) avec sélection progressive.</li>',
      '</ul>',
      '<h4>Corrigé Partie 3 (6 points)</h4>',
      '<ul>',
      '  <li><strong>Atomic Design (3 pts) :</strong> 1. Atome (Bouton, Icône) ; 2. Molécule (Champ texte + bouton Rechercher) ; 3. Organisme (Barre de navigation supérieure complète) ; 4. Template (Squelette de page de catalogue produit) ; 5. Page (La page réelle avec les vraies données clients).</li>',
      '  <li><strong>Grille 8pt (3 pts) :</strong> Établit un rythme visuel cohérent, divise parfaitement la majorité des résolutions d’écrans modernes (multiples de 8) et simplifie la collaboration entre designers et développeurs en éliminant les valeurs de marges arbitraires (ex: 13px ou 17px).</li>',
      '</ul>'
    ].join('\n')),
    '',
    '  <h2>Épreuve 2 : Examen Terminal (ET) — Durée 2 h 00 (Barème sur 20 points)</h2>',
    box('standard', 'Sujet de l’Examen Terminal — Audit Heuristique, Ergonomie Mobile &amp; Accessibilité', [
      '<h4>Exercice 1 : Audit d’Utilisabilité selon les Heuristiques de Nielsen (7 points)</h4>',
      '<p>Analysez les 3 défaillances suivantes sur une application bancaire :</p>',
      '<ol>',
      '  <li>Lors d’un virement instantané, l’écran reste figé pendant 6 secondes sans aucun spinner ni mention textuelle. (2.5 pts)</li>',
      '  <li>Un clic sur « Supprimer mon compte » exécute l’action sans message de confirmation ni possibilité de restauration. (2.5 pts)</li>',
      '  <li>Pour chaque cas, identifiez l’heuristique de Nielsen violée et proposez une solution d’interface concrète. (2 pts)</li>',
      '</ol>',
      '<h4>Exercice 2 : Ergonomie Mobile Responsive &amp; Zone du Pouce (6 points)</h4>',
      '<ol>',
      '  <li>Définissez la « Thumb Zone » (Zone du Pouce) modélisée par Steven Hoober. Quelles sont les 3 zones d’un écran de smartphone et quelles actions doit-on y placer ? (3 pts)</li>',
      '  <li>Pourquoi le standard WCAG 2.5.5 et le framework Google Material imposent-ils une dimension minimale de 48x48 px pour toute cible tactile ? (3 pts)</li>',
      '</ol>',
      '<h4>Exercice 3 : Audit d’Accessibilité Universelle WCAG 2.1 (7 points)</h4>',
      '<ol>',
      '  <li>Une maquette propose un texte gris clair <code>#888888</code> sur fond blanc <code>#FFFFFF</code> (taille 14px). Sachant que le ratio de contraste calculé est de <code>3.54 : 1</code>, ce texte est-il conforme au niveau WCAG AA ? Justifiez en rappelant les seuils normatifs. (3 pts)</li>',
      '  <li>Expliquez pourquoi l’usage d’un attribut <code>tabindex="3"</code> constitue un anti-pattern d’accessibilité majeur. Quelle est la bonne pratique pour gérer l’ordre de tabulation ? (4 pts)</li>',
      '</ol>'
    ].join('\n')),
    '',
    box('solution', 'Corrigé type &amp; Barème détaillé de l’Examen Terminal', [
      '<h4>Corrigé Exercice 1 (7 points)</h4>',
      '<ul>',
      '  <li><strong>Cas 1 :</strong> Viole l’Heuristique 1 (<em>Visibilité du statut du système</em>). L’utilisateur ignore si sa requête est en cours de traitement ou si l’application a planté. Solution : afficher un indicateur de chargement immédiat (spinner accessible ou barre de progression) avec le message « Traitement de votre virement en cours... » et désactiver le bouton pour éviter le double débit.</li>',
      '  <li><strong>Cas 2 :</strong> Viole l’Heuristique 5 (<em>Prévention des erreurs</em>) et l’Heuristique 3 (<em>Contrôle et liberté de l’utilisateur</em>). Solution : insérer une modale de confirmation avec saisie explicite d’un mot de passe ou d’une phrase de confirmation, et proposer un délai de grâce de rétractation (undo / corbeille temporaire).</li>',
      '</ul>',
      '<h4>Corrigé Exercice 2 (6 points)</h4>',
      '<ul>',
      '  <li><strong>Thumb Zone (3 pts) :</strong> 1. Zone naturelle (bas et centre d’écran) : y placer les actions principales fréquentes (Navigation Bar, CTA principal d’achat) ; 2. Zone étirée (milieu-haut) : informations secondaires et cartes de contenu ; 3. Zone difficile (haut et coins d’écran) : actions destructrices rares ou menus secondaires (Déconnexion, Paramètres généraux).</li>',
      '  <li><strong>Touch Target 48x48 px (3 pts) :</strong> La pulpe moyenne d’un doigt humain mesure entre 10 et 14 mm, ce qui équivaut à environ 48x48 pixels physiques sur les densités d’écrans mobiles standard. En deçà, les taux de clics manqués (fat finger errors) et de clics involontaires sur des éléments adjacents explosent.</li>',
      '</ul>',
      '<h4>Corrigé Exercice 3 (7 points)</h4>',
      '<ul>',
      '  <li><strong>Contraste WCAG (3 pts) :</strong> NON conforme. Pour du texte standard (&lt; 24px), le niveau WCAG AA exige impérativement un ratio minimal de <strong>4.5 : 1</strong>. Un ratio de 3.54 : 1 est donc en échec (il n’atteindrait que le seuil de 3.0 : 1 réservé au grand texte &ge; 24px). Il faut assombrir le texte vers un gris au moins <code>#595959</code> (ratio 7.0 : 1).</li>',
      '  <li><strong>Ordre de tabulation (4 pts) :</strong> Un <code>tabindex</code> positif supérieur à 0 force un ordre arbitraire qui passe avant tous les éléments du flux naturel. Cela désoriente gravement les utilisateurs non-voyants naviguant au clavier ou lecteur d’écran. La bonne pratique est d’organiser logiquement le DOM HTML natif dans l’ordre visuel de lecture, d’utiliser <code>tabindex="0"</code> pour rendre un composant interactif focalisable dans son ordre naturel, et <code>tabindex="-1"</code> pour le focus programmatique (ex: fenêtres modales).</li>',
      '</ul>'
    ].join('\n')),
    '',
    chnav({ href: 'formules.html', label: 'Consulter le mémento Ergonomie' }, { href: 'exercices.html', label: 'Accéder aux 18 exercices TP' }),
    '',
    disclaimer()
  ].join('\n\n');

  return {
    'chapitres/simulateur-examen.html': {
      title: 'Examens Blancs &amp; Corrigés — ' + course.brand,
      description: 'Épreuves d’examen blanc d’ergonomie et de conception UI/UX B2 avec corrigés intégraux et barèmes universitaires.',
      active: 'examens',
      body
    }
  };
}

/* ======================== Exercices de Code ======================== */

function exercices(course, chapterList) {
  const crumbs = crumb(course, [
    { label: 'Accueil', href: '../index.html' },
    { label: 'Sommaire', href: '../sommaire.html' },
    { label: 'Exercices pratiques' }
  ]);

  const items = chapterList.map(ch => [
    '    <section class="card" style="margin-bottom: var(--space-4);">',
    '      <div class="card__head">',
    '        <span class="badge">' + (ch.n === 1 ? 'Accès libre' : 'Réservé B2 et plus') + '</span>',
    '        <span class="card__num">Module ' + ch.n + '</span>',
    '      </div>',
    '      <h3 class="card__title"><a href="chapitre' + ch.n + '.html#exercices">Exercices du Module ' + ch.n + ' — ' + ch.title + '</a></h3>',
    '      <p class="card__desc">' + ch.toc + '</p>',
    '      <div class="card__foot">',
    '        <span class="card__time">' + ic('terminal') + ' 3 exercices interactifs de manière méthodique</span>',
    '        <span class="card__link"><a class="btn btn--sm" href="chapitre' + ch.n + '.html#exercices">Pratiquer sur le Chapitre ' + ch.n + ' ' + ic('arrow-right') + '</a></span>',
    '      </div>',
    '    </section>'
  ].join('\n')).join('\n');

  const body = [
    crumbs,
    '  <h1>Catalogue des 18 Exercices Pratiques UI/UX Design B2</h1>',
    '  <p class="lead">Accédez aux 18 ateliers de programmation et de simulation exécutables directement dans le navigateur, vérifiés automatiquement par le moteur de tests.</p>',
    '',
    items,
    '',
    chnav({ href: 'simulateur-examen.html', label: 'Passer les examens blancs' }, { href: '../atelier.html', label: 'Ouvrir l’atelier libre de code' }),
    '',
    disclaimer()
  ].join('\n\n');

  return {
    'exercices/exercices.html': {
      title: 'Catalogue des Exercices Pratiques — ' + course.brand,
      description: 'Accès rapide aux 18 ateliers pratiques de simulation et d’audit ergonomique UI/UX B2.',
      active: 'exercices',
      body
    }
  };
}

module.exports = { examens, exercices };

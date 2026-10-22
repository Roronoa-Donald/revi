/**
 * Pages « cartes » (flashcards) et « formules » (mémento) du cours « Git & GitHub B3 ».
 */
'use strict';

const { crumb, cards } = require('../../../../scripts/course-kit');
const { chnav, disclaimer } = require('./helpers');

/* ======================== Cartes Flashcards ======================== */

function cartes(course, chapterList) {
  const crumbs = crumb(course, [
    { label: 'Accueil', href: '../index.html' },
    { label: 'Sommaire', href: '../sommaire.html' },
    { label: 'Cartes de révision' }
  ]);

  const modules = chapterList.map(ch => ({
    title: 'Module ' + ch.n + ' — ' + ch.short,
    items: ch.flashcards || []
  }));

  const body = [
    crumbs,
    '  <h1>Cartes de Révision &amp; Mémorisation Active — Git &amp; GitHub B3</h1>',
    '  <p class="lead">36 fiches synthétiques pour ancrer les concepts fondamentaux : Modèle objet DAG &amp; SHA, Stratégies de fusion &amp; Rebase interactif, Reflog &amp; Diagnostic bisect, Gouvernance &amp; Protection de branches, GitHub Actions CI/CD, Gestion LFS, Hooks &amp; Purge d’historique.</p>',
    '',
    cards(modules),
    '',
    chnav({ href: '../sommaire.html', label: 'Sommaire général' }, { href: 'formules.html', label: 'Consulter le mémento technique' }),
    '',
    disclaimer()
  ].join('\n\n');

  return {
    'chapitres/cartes.html': {
      title: 'Cartes de révision — ' + course.brand,
      description: 'Flashcards de révision du cours Git & GitHub B3 : définitions, commandes de plomberie et workflows clés des ' + chapterList.length + ' chapitres.',
      active: 'cartes',
      body
    }
  };
}

/* ======================== Formules & Mémento ======================== */

function formules(course) {
  const crumbs = crumb(course, [
    { label: 'Accueil', href: '../index.html' },
    { label: 'Sommaire', href: '../sommaire.html' },
    { label: 'Formules &amp; Mémento' }
  ]);

  const body = [
    crumbs,
    '  <h1>Mémento Technique &amp; Aide-Mémoire — Git &amp; GitHub</h1>',
    '  <p class="lead">Guide de référence opérationnelle pour ingénieurs logiciels et DevOps : modèle objet DAG, commandes de plomberie, résolution de conflits, reflog, workflows GitHub Actions et sécurité des dépôts.</p>',
    '',
    '  <h2>1. Modèle Objet Interne &amp; Commandes de Plomberie Git</h2>',
    '  <table class="table">',
    '    <thead>',
    '      <tr><th>Type d’Objet Git</th><th>Structure du Stockage</th><th>Rôle &amp; Métadonnées Associées</th><th>Commande d’Inspection</th></tr>',
    '    </thead>',
    '    <tbody>',
    '      <tr><td><code>blob</code></td><td><code>blob &lt;taille&gt;\\0&lt;contenu&gt;</code></td><td>Stocke le contenu brut d’un fichier sans nom ni permissions.</td><td><code>git cat-file -p &lt;hash&gt;</code></td></tr>',
    '      <tr><td><code>tree</code></td><td><code>tree &lt;taille&gt;\\0[mode nom\\0hash...]</code></td><td>Représente un répertoire, associe noms de fichiers et hashes.</td><td><code>git ls-tree -r &lt;tree-ish&gt;</code></td></tr>',
    '      <tr><td><code>commit</code></td><td><code>commit &lt;taille&gt;\\0tree, parent, author, committer, msg</code></td><td>Capture un état instantané de l’arborescence avec ancêtres.</td><td><code>git cat-file -p HEAD</code></td></tr>',
    '      <tr><td><code>tag</code></td><td><code>tag &lt;taille&gt;\\0object, type, tag, tagger, msg</code></td><td>Étiquette annotée immuable pointant vers un commit précis.</td><td><code>git cat-file -p v1.0.0</code></td></tr>',
    '    </tbody>',
    '  </table>',
    '',
    '  <h2>2. Stratégies de Fusion &amp; Réécriture d’Historique</h2>',
    '  <table class="table">',
    '    <thead>',
    '      <tr><th>Opération Git</th><th>Mécanique Topologique</th><th>Modifie les SHA-1 ?</th><th>Cas d’Usage Recommandé</th></tr>',
    '    </thead>',
    '    <tbody>',
    '      <tr><td><code>Fast-Forward</code></td><td>Déplace simplement le pointeur de branche cible vers l’amont.</td><td>Non</td><td>Branches de travail strictement linéaires sans divergence.</td></tr>',
    '      <tr><td><code>3-Way Merge (ORT)</code></td><td>Calculez le LCA (Lowest Common Ancestor) et crée un commit à 2 parents.</td><td>Non (nouveau commit créé)</td><td>Fusion de branches de fonctionnalités (Feature Branches).</td></tr>',
    '      <tr><td><code>Rebase Interactif</code></td><td>Rejoue les commits un par un sur une nouvelle base (LCA modifié).</td><td>Oui (nouveaux hashes)</td><td>Nettoyage d’historique local avant soumission de Pull Request.</td></tr>',
    '      <tr><td><code>Squash &amp; Merge</code></td><td>Condense tous les commits d’une PR en un seul commit linéaire.</td><td>Oui (nouvel historique)</td><td>Maintien d’une branche principale compacte et lisible.</td></tr>',
    '    </tbody>',
    '  </table>',
    '',
    '  <h2>3. Sauvetage de Données, Reflog &amp; Diagnostic d’Anomalies</h2>',
    '  <table class="table">',
    '    <thead>',
    '      <tr><th>Commande de Diagnostic</th><th>Description &amp; Action Opérationnelle</th><th>Syntaxe Typique</th></tr>',
    '    </thead>',
    '    <tbody>',
    '      <tr><td><code>git reflog</code></td><td>Affichez l’historique des mouvements du pointeur HEAD (même après reset dur).</td><td><code>git reflog show HEAD</code></td></tr>',
    '      <tr><td>Sauvetage d’un commit perdu</td><td>Recrée une branche pointant sur le commit orphelin repéré dans le reflog.</td><td><code>git checkout -b rescue HEAD@{3}</code></td></tr>',
    '      <tr><td><code>git bisect</code></td><td>Effectue une recherche binaire dans l’historique pour identifier un commit fautif.</td><td><code>git bisect start HEAD v1.2.0</code></td></tr>',
    '      <tr><td><code>git stash</code></td><td>Empile les modifications non validées pour nettoyer temporairement la copie de travail.</td><td><code>git stash push -m "wip" &amp;&amp; git stash pop</code></td></tr>',
    '      <tr><td><code>git fsck</code></td><td>Vérifiez l’intégrité de la base d’objets et liste les objets inaccessibles (dangling).</td><td><code>git fsck --lost-found</code></td></tr>',
    '    </tbody>',
    '  </table>',
    '',
    '  <h2>4. Spécification Conventional Commits 1.0.0 &amp; SemVer</h2>',
    '  <table class="table">',
    '    <thead>',
    '      <tr><th>Préfixe de Commit</th><th>Signification Sémantique</th><th>Impact SemVer (X.Y.Z)</th><th>Exemple Conforme</th></tr>',
    '    </thead>',
    '    <tbody>',
    '      <tr><td><code>feat:</code></td><td>Nouvelle fonctionnalité pour l’utilisateur.</td><td>MINOR (+0.1.0)</td><td><code>feat(auth): ajout support OAuth2 GitHub</code></td></tr>',
    '      <tr><td><code>fix:</code></td><td>Correction d’un bogue en production.</td><td>PATCH (+0.0.1)</td><td><code>fix(api): resolution fuite memoire sur stream</code></td></tr>',
    '      <tr><td><code>docs:, chore:, test:</code></td><td>Documentation, maintenance ou tests sans code applicatif.</td><td>Aucun incrément</td><td><code>docs: mise a jour du guide de deploiement</code></td></tr>',
    '      <tr><td><code>feat!:</code> ou <code>BREAKING CHANGE</code></td><td>Rupture de compatibilité ascendante dans l’API publique.</td><td>MAJOR (+1.0.0)</td><td><code>feat(v2)!: suppression endpoints depreciees</code></td></tr>',
    '    </tbody>',
    '  </table>',
    '',
    '  <h2>5. GitHub Actions : Syntaxe de Workflow &amp; Bonnes Pratiques de Sécurité</h2>',
    '  <table class="table">',
    '    <thead>',
    '      <tr><th>Élément de Workflow</th><th>Rôle &amp; Syntaxe</th><th>Recommandation de Sécurité</th></tr>',
    '    </thead>',
    '    <tbody>',
    '      <tr><td><code>on: [push, pull_request]</code></td><td>Événements déclencheurs du pipeline CI/CD.</td><td>Filtrer par branches cibles précises (ex: <code>main</code>).</td></tr>',
    '      <tr><td><code>permissions:</code></td><td>Droit accordé au token <code>GITHUB_TOKEN</code> du job.</td><td>Toujours appliquer le principe du moindre privilège (ex: <code>contents: read</code>).</td></tr>',
    '      <tr><td><code>strategy.matrix:</code></td><td>Exécutez le job sur plusieurs versions/OS en parallèle.</td><td>Définir <code>fail-fast: false</code> pour observer toutes les plateformes.</td></tr>',
    '      <tr><td><code>steps.env:</code></td><td>Injection de variables d’environnement.</td><td>Ne JAMAIS injecter <code>\${{ github.event... }}</code> directement dans <code>run:</code> bash !</td></tr>',
    '    </tbody>',
    '  </table>',
    '',
    '  <h2>6. Hygiène de Dépôt, Git LFS &amp; Purge d’Historique</h2>',
    '  <table class="table">',
    '    <thead>',
    '      <tr><th>Problématique</th><th>Outil Recommandé</th><th>Commande Opérationnelle</th></tr>',
    '    </thead>',
    '    <tbody>',
    '      <tr><td>Fichiers volumineux (&gt; 50 Mo)</td><td>Git LFS (Large File Storage)</td><td><code>git lfs track "*.psd" &amp;&amp; git add .gitattributes</code></td></tr>',
    '      <tr><td>Validation de règles avant commit</td><td>Hooks pre-commit (framework)</td><td><code>pre-commit run --all-files</code></td></tr>',
    '      <tr><td>Fuite de token ou secret API</td><td><code>git-filter-repo</code></td><td><code>git-filter-repo --replace-text expressions.txt --force</code></td></tr>',
    '      <tr><td>Suppression d’un dossier lourd historique</td><td><code>git-filter-repo</code></td><td><code>git-filter-repo --path backup/ --invert-paths</code></td></tr>',
    '    </tbody>',
    '  </table>',
    '',
    chnav({ href: 'cartes.html', label: 'Revenir aux cartes de révision' }, { href: 'examens.html', label: 'Passer aux épreuves d’examen' }),
    '',
    disclaimer()
  ].join('\n\n');

  return {
    'chapitres/formules.html': {
      title: 'Mémento technique — ' + course.brand,
      description: 'Mémento et fiches mémo des syntaxes Git, modèles objets, reflog et workflows GitHub Actions du cours Git B3.',
      active: 'formules',
      body
    }
  };
}

module.exports = { cartes, formules };

/**
 * Chapitre 5 du cours « Document Technique B3 ».
 */
'use strict';

const { box } = require('../../../scripts/course-kit');

module.exports = {
  n: 5,
  title: 'L’Approche Docs-as-Code, Markdown &amp; Générateurs Statiques',
  short: 'Docs-as-Code &amp; Générateurs Statiques',
  toc: 'Philosophie Docs-as-Code, syntaxe Markdown GFM, diagrammes textuels Mermaid.js, moteurs statiques MkDocs et Docusaurus, intégration continue Git/CI.',
  time: '≈ 3 h 00 de travail',
  free: false,
  lockLabel: 'Réservé B3 et plus',
  situation: 'Pendant des décennies, la documentation technique d’entreprise est restée enfermée dans des suites bureautiques propriétaires (Word, PowerPoint) ou des wikis d’entreprise non versionnés (Confluence). Le résultat est universellement déplorable : documents désynchronisés du code de production, schémas vectoriels remplacés par des captures d’écran floues impossibles à modifier, conflits de versions insolubles et absence totale de revue collégiale. Le paradigme « Docs-as-Code » révolutionne la documentation technique en appliquant aux documents les mêmes outils, processus et exigences que pour le code source : fichiers textes bruts en Markdown, versionnement sous Git, schémas textuels déclaratifs avec Mermaid.js, compilation en sites web statiques ultra-rapides (MkDocs, Docusaurus) et déploiement automatisé via des pipelines CI/CD. L’ingénieur de Bachelor 3 doit maîtriser ce workflow moderne pour industrialiser la production documentaire.',
  objectives: [
    'assimiler les fondements et avantages opérationnels de la démarche « Docs-as-Code » ;',
    'maîtriser la syntaxe Markdown avancée (CommonMark, GitHub Flavored Markdown) et l’organisation modulaire de dossiers ;',
    'concevoir des diagrammes d’architecture et de séquence as-code via la syntaxe textuelle Mermaid.js ;',
    'configurer et structurer un générateur de site statique documentaire (MkDocs avec le thème Material, Docusaurus, Sphinx) ;',
    'automatiser la compilation, la validation et la publication continue de la documentation dans une forge logicielle (GitHub Actions, GitLab CI) ;',
    'développer en Python 3 des linters de hiérarchie Markdown, des validateurs de connectivité Mermaid et des générateurs d’arborescence YAML.'
  ],
  sections: [
    {
      title: 'Le Paradigme « Docs-as-Code » : Principes &amp; Rupture Opérationnelle',
      html: [
        '<p>L’approche <strong>Docs-as-Code</strong> consiste à traiter la documentation technique avec la même rigueur, les mêmes outils et les mêmes flux de travail que le code applicatif.</p>',
        '<div class="grid grid-2">',
        '  <div class="card">',
        '    <h4>L’Ancien Monde : Fichiers Binaires &amp; Wikis Isolés</h4>',
        '    <ul>',
        '      <li>Fichiers <code>.docx</code> ou <code>.pdf</code> stockés sur des répertoires partagés sans historique granulaire.</li>',
        '      <li>Différences illisibles : impossible de voir ce qui a changé entre deux versions d’un fichier binaire.</li>',
        '      <li>Déconnexion totale : le développeur modifie le code dans son IDE mais oublie de mettre à jour le wiki distant.</li>',
        '      <li>Goulots d’étranglement et perte de traçabilité des relectures.</li>',
        '    </ul>',
        '  </div>',
        '  <div class="card">',
        '    <h4>Le Monde Moderne : Docs-as-Code</h4>',
        '    <ul>',
        '      <li><strong>Format texte brut :</strong> Fichiers Markdown (<code>.md</code>) ou AsciiDoc (<code>.adoc</code>) légers et interopérables.</li>',
        '      <li><strong>Dépôt Git unique :</strong> La documentation vit dans le même dépôt (monorepo ou dossier <code>docs/</code>) que le code.</li>',
        '      <li><strong>Revue par Pull Request :</strong> Toute modification documentaire est soumise à une PR, commentée ligne par ligne et relue par les pairs.</li>',
        '      <li><strong>Intégration continue (CI) :</strong> Tests de syntaxe, détection des liens cassés et déploiement automatisé à chaque commit.</li>',
        '    </ul>',
        '  </div>',
        '</div>'
      ].join('\n')
    },
    {
      title: 'Syntaxe Markdown Avancée (GFM) &amp; Structuration Documentaire',
      html: [
        '<p>Le format <strong>Markdown</strong> s’est imposé comme le standard de facto de la documentation textuelle. La variante <strong>GitHub Flavored Markdown (GFM)</strong> apporte des extensions indispensables à l’ingénierie logicielle.</p>',
        '<div class="grid grid-3">',
        '  <div class="card">',
        '    <h4>Hiérarchie Stricte des Titres</h4>',
        '    <p>Un seul titre de niveau 1 (<code># Titre Principal</code>) par page. Les sous-sections s’enchaînent obligatoirement sans sauter de niveau (ex. <code>## Niveau 2</code> puis <code>### Niveau 3</code>). Sauter d’un <code>#</code> à un <code>###</code> est une erreur d’accessibilité et de linter.</p>',
        '  </div>',
        '  <div class="card">',
        '    <h4>Blocs de Code Typés</h4>',
        '    <p>Tout extrait de code ou commande console doit être encapsulé dans un bloc clôturé par trois backticks avec indication explicite du langage (<code>```python</code>, <code>```bash</code>, <code>```json</code>), garantissant la coloration syntaxique et l’extraction automatisée.</p>',
        '  </div>',
        '  <div class="card">',
        '    <h4>Tableaux &amp; Callouts</h4>',
        '    <p>Tableaux alignés avec barres verticales (<code>|</code>) et tirets. Utilisation des blocs d’alerte standardisés (<code>&gt; [!NOTE]</code>, <code>&gt; [!WARNING]</code>, <code>&gt; [!IMPORTANT]</code>) pour faire ressortir les consignes de sécurité ou d’exploitation.</p>',
        '  </div>',
        '</div>'
      ].join('\n')
    },
    {
      title: 'Diagrammes-as-Code avec Mermaid.js : Clarté &amp; Maintenabilité',
      html: [
        '<p>Dans un projet Docs-as-Code, intégrer une image PNG ou JPEG d’un schéma réseau ou d’une architecture logicielle est un anti-patron critique. Dès que l’architecture évolue, l’image devient obsolète car personne ne retrouve le fichier source original du logiciel de dessin.</p>',
        '<p><strong>Mermaid.js</strong> résout ce problème en permettant d’écrire des diagrammes sous forme de code texte déclaratif, directement interprété et rendu par GitHub, GitLab et les générateurs statiques modernes.</p>',
        '<div class="grid grid-2">',
        '  <div class="card">',
        '    <h4>Exemple : Graphe d’Architecture Réseau</h4>',
        '    <pre><code>```mermaid\ngraph TD\n  Client[Navigateur Web] --&gt;|HTTPS 443| LB[Reverse Proxy Nginx]\n  LB --&gt;|Port 8000| App1[Service API A]\n  LB --&gt;|Port 8000| App2[Service API B]\n  App1 --&gt;|TCP 5432| BDD[(Cluster PostgreSQL)]\n  App2 --&gt;|TCP 5432| BDD\n```</code></pre>',
        '  </div>',
        '  <div class="card">',
        '    <h4>Avantages Incomparables</h4>',
        '    <ul>',
        '      <li><strong>Diff Git Parfait :</strong> Lorsqu’un nœud réseau ou un port est modifié, le diff Git montre exactement la ligne de texte modifiée dans la Pull Request.</li>',
        '      <li><strong>Maintenance Pérenne :</strong> N’importe quel ingénieur de l’équipe peut mettre à jour le schéma en 30 secondes en modifiant le fichier texte.</li>',
        '      <li><strong>Accessibilité &amp; Recherche :</strong> Le texte des libellés du schéma est indexable par les moteurs de recherche interne.</li>',
        '    </ul>',
        '  </div>',
        '</div>'
      ].join('\n')
    },
    {
      title: 'Moteurs de Sites Statiques (SSG) : MkDocs, Material &amp; Docusaurus',
      html: [
        '<p>Les fichiers Markdown bruts stockés dans un dépôt Git sont compilés par un <strong>Générateur de Site Statique (Static Site Generator - SSG)</strong> pour produire un portail documentaire HTML/CSS/JS complet, réactif, indexé et consultable sur le web interne ou public.</p>',
        '<div class="grid grid-3">',
        '  <div class="card">',
        '    <h4>MkDocs + Material for MkDocs</h4>',
        '    <p>Le standard incontournable de l’écosystème Python et DevOps. Écrit en Python, il se configure via un fichier central <code>mkdocs.yml</code>. Le thème Material offre une recherche plein texte instantanée, le mode sombre/clair automatique, la coloration syntaxique et le support natif de Mermaid.</p>',
        '  </div>',
        '  <div class="card">',
        '    <h4>Docusaurus (Meta)</h4>',
        '    <p>Basé sur Node.js et React. Idéal pour les portails développeurs hautement interactifs nécessitant des composants React dynamiques (MDX), le versionnement de documentation multi-releases et l’internationalisation (i18n).</p>',
        '  </div>',
        '  <div class="card">',
        '    <h4>Sphinx (Python / C++)</h4>',
        '    <p>L’outil historique de référence pour documenter les bibliothèques et frameworks techniques. Supporte reStructuredText et Markdown (MyST), et extrait automatiquement les docstrings du code source pour générer les références de classes et méthodes.</p>',
        '  </div>',
        '</div>',
        box('info', 'Structure du fichier mkdocs.yml', [
          'Le fichier <code>mkdocs.yml</code> définit les métadonnées du site et son arborescence de navigation :',
          '<pre><code>site_name: Portail Documentation Infrastructure Cloud\ntheme:\n  name: material\n  features:\n    - search.suggest\n    - navigation.tabs\nnav:\n  - Accueil: index.md\n  - Architecture: architecture.md\n  - Guides d’Exploitation:\n    - Sauvegardes: runbooks/backup.md\n    - Procédure de Bascule: runbooks/failover.md</code></pre>'
        ].join('\n'))
      ].join('\n')
    },
    {
      title: 'Industrialisation en Intégration Continue (CI/CD)',
      html: [
        '<p>La puissance du Docs-as-Code réside dans son automatisation au sein des pipelines de la forge logicielle (GitHub Actions, GitLab CI/CD) :</p>',
        '<div class="grid grid-2">',
        '  <div class="card">',
        '    <h4>1. Contrôles Automatisés (Linters)</h4>',
        '    <p>À chaque Pull Request, le runner CI vérifie que le document respecte les standards avant toute fusion :</p>',
        '    <ul>',
        '      <li><strong>markdownlint :</strong> Validation de la syntaxe et de la hiérarchie des titres.</li>',
        '      <li><strong>lychee / markdown-link-check :</strong> Détection immédiate des liens internes ou externes brisés.</li>',
        '      <li><strong>Vale :</strong> Linter de style éditorial vérifiant la clarté et le respect de la charte de rédaction technique.</li>',
        '    </ul>',
        '  </div>',
        '  <div class="card">',
        '    <h4>2. Déploiement &amp; Hébergement Statique</h4>',
        '    <p>Dès que la PR est approuvée et fusionnée sur la branche <code>main</code> :</p>',
        '    <ul>',
        '      <li>La commande <code>mkdocs build --strict</code> compile les pages HTML statiques. En mode strict, le moindre avertissement fait échouer le pipeline.</li>',
        '      <li>Les fichiers générés sont automatiquement déployés sur GitHub Pages, GitLab Pages, AWS S3 / CloudFront ou un conteneur Nginx interne.</li>',
        '      <li>Zéro maintenance de serveur applicatif : performance et sécurité maximales.</li>',
        '    </ul>',
        '  </div>',
        '</div>'
      ].join('\n')
    }
  ],
  methodTitle: 'Méthodologie de Déploiement d’un Projet Docs-as-Code',
  method: [
    '1. Initialiser l’arborescence documentaire : Créer un dossier `docs/` à la racine du dépôt Git du projet avec un fichier `index.md` servant de page d’accueil.',
    '2. Rédiger en Markdown strict : Respecter la hiérarchie des niveaux de titres (# puis ## puis ###), typager chaque bloc de code et insérer les diagrammes Mermaid.js sous forme textuelle.',
    '3. Structurer la navigation : Déclarer l’arborescence dans le fichier de configuration `mkdocs.yml` (ou `docusaurus.config.js`) en organisant les rubriques de manière logique pour l’utilisateur.',
    '4. Tester localement : Lancer le serveur de développement en direct (`mkdocs serve`) avec rechargement à chaud (live-reload) pour valider le rendu visuel dans le navigateur.',
    '5. Configurer la validation CI : Écrire un workflow GitHub Actions / GitLab CI exécutant un linter Markdown et un vérificateur de liens à chaque pull request.',
    '6. Déployer en continu : Configurer le job de publication finale (`mkdocs gh-deploy` ou copie S3) lors de la fusion sur la branche principale.'
  ],
  summary: [
    'Le Docs-as-Code traite la documentation avec les mêmes standards que le code : texte brut versionné sous Git, revues par Pull Requests et tests automatisés en CI/CD.',
    'Le format Markdown (GFM) garantit la lisibilité native en texte brut tout en offrant des fonctionnalités riches (code typé, tableaux, alertes).',
    'La hiérarchie des titres Markdown doit être rigoureuse : un seul titre h1 par page, sans saut de niveau (ex: passer directement de h1 à h3 est une erreur).',
    'Mermaid.js permet de coder des diagrammes d’architecture et de séquence directement en texte, facilitant les revues de diffs Git et bannissant les captures d’écran obsolètes.',
    'Les générateurs statiques comme MkDocs (thème Material) et Docusaurus compilent le Markdown en sites web rapides, ergonomiques, avec recherche plein texte instantanée.',
    'L’intégration continue (CI) garantit la qualité pérenne : compilation en mode strict (`--strict`), validation de la syntaxe par linters et détection des liens rompus.'
  ],
  checklist: [
    'La documentation réside-t-elle dans le même dépôt Git que le code dans un sous-dossier dédié (ex: `docs/`) ?',
    'Chaque page Markdown comporte-t-elle un unique titre de niveau 1 (#) sans rupture hiérarchique ?',
    'Tous les extraits de code et commandes sont-ils encadrés par des blocs typés avec leur langage ?',
    'Les schémas d’architecture et diagrammes de flux sont-ils rédigés en syntaxe textuelle Mermaid.js ?',
    'L’arborescence du site est-elle explicitement configurée dans le fichier `mkdocs.yml` sous la clé `nav` ?',
    'Un pipeline CI/CD vérifie-t-il la compilation stricte et l’absence de liens cassés à chaque commit ?'
  ],
  notions: [
    'Philosophie et principes Docs-as-Code',
    'Syntaxe GitHub Flavored Markdown (GFM)',
    'Règles de hiérarchie des titres Markdown',
    'Diagrammes textuels Mermaid.js',
    'Générateur statique MkDocs &amp; thème Material',
    'Générateur interactif Docusaurus (MDX)',
    'Configuration de navigation YAML (nav)',
    'Pipelines CI/CD de validation et déploiement'
  ],
  pitfalls: [
    'Insérer des captures d’écran d’architecture au lieu de diagrammes textuels Mermaid, rendant toute mise à jour ultérieure impossible.',
    'Sauter des niveaux de titres Markdown (ex: passer d’un titre `#` directement à un sous-titre `###`), rompant l’accessibilité.',
    'Conserver la documentation dans un wiki externe non synchronisé avec les branches de code du dépôt Git.',
    'Ignorer les erreurs de compilation du générateur statique au lieu d’activer le mode strict (`--strict`) en intégration continue.'
  ],
  questions: [
    {
      stem: 'Quel est le principe directeur fondamental de l’approche « Docs-as-Code » ?',
      opts: [
        'Écrire toute la documentation uniquement en langage binaire exécutable',
        'Traiter la documentation avec les mêmes outils et processus que le code : texte brut, versionnement Git, revues par PR et tests CI/CD',
        'Imprimer la documentation sur papier après chaque sprint agile',
        'Interdire formellement aux développeurs de lire la documentation technique'
      ],
      correct: 1,
      exp: 'Docs-as-Code applique les pratiques logicielles éprouvées (Git, Pull Requests, linters, pipelines CI/CD) à la rédaction documentaire.'
    },
    {
      stem: 'Pourquoi est-il considéré comme une faute de hiérarchie de faire suivre immédiatement un titre de niveau 1 (#) par un sous-titre de niveau 3 (###) en Markdown ?',
      opts: [
        'Parce que le compilateur Markdown détruit automatiquement le fichier source',
        'Parce que cela brise la structure logique du document, perturbant les lecteurs d’écran pour l’accessibilité et la génération de la table des matières',
        'Parce que le langage Markdown interdit d’avoir plus de deux titres par page',
        'Parce que cela ralentit l’affichage graphique de 10 secondes'
      ],
      correct: 1,
      exp: 'Sauter un niveau hiérarchique (de h1 à h3 sans h2) crée un trou dans l’arborescence du document, violant les règles WCAG d’accessibilité et déclenchant des erreurs de linters.'
    },
    {
      stem: 'Quel est l’avantage décisif d’un diagramme Mermaid.js par rapport à une image PNG intégrée dans une documentation technique ?',
      opts: [
        'Mermaid.js utilise obligatoirement la couleur rouge pour tous les serveurs',
        'Le diagramme Mermaid étant du texte brut, son évolution se relit dans les diffs Git et n’importe quel ingénieur peut le modifier sans outil graphique tiers',
        'Mermaid.js compresse l’image en format zip pour économiser de la bande passante',
        'Les diagrammes Mermaid ne peuvent pas être affichés dans un navigateur web'
      ],
      correct: 1,
      exp: 'Un schéma texte Mermaid se versionne sous Git : un changement de topologie se relit ligne par ligne lors d’une Pull Request et se modifie directement dans l’éditeur.'
    },
    {
      stem: 'Dans un projet utilisant MkDocs, quel fichier central définit les métadonnées du site, les extensions et l’arborescence de navigation ?',
      opts: [
        'package.json',
        'mkdocs.yml',
        'docker-compose.yml',
        'settings.ini'
      ],
      correct: 1,
      exp: 'Le fichier `mkdocs.yml` est le fichier de configuration principal d’un projet MkDocs, contenant notamment la clé `nav` qui structure la navigation du site.'
    },
    {
      stem: 'À quoi sert l’argument `--strict` lors de l’exécution de la commande de build `mkdocs build --strict` dans un pipeline d’intégration continue ?',
      opts: [
        'À supprimer tous les fichiers Markdown qui contiennent des fautes d’orthographe',
        'À faire échouer le pipeline (exit code non nul) dès qu’un avertissement survient, tel qu’un lien interne cassé ou une page orpheline',
        'À empêcher tout accès public au site web généré',
        'À crypter le code HTML produit avec une clé RSA'
      ],
      correct: 1,
      exp: 'L’option `--strict` transforme les avertissements (warnings) en erreurs bloquantes, garantissant qu’aucun lien brisé ou problème de configuration ne passe en production.'
    },
    {
      stem: 'Parmi les propositions suivantes, laquelle décrit correctement le rôle d’un outil comme « Vale » dans une chaîne de CI/CD documentaire ?',
      opts: [
        'Un linter de style éditorial qui vérifie le respect des règles rédactionnelles, la lisibilité et la terminologie technique',
        'Un serveur de base de données relationnelle en mémoire',
        'Un pare-feu réseau filtrant les attaques DDoS',
        'Un moteur de rendu 3D pour jeux vidéo'
      ],
      correct: 0,
      exp: 'Vale est un linter de prose (style linter) permettant d’appliquer automatiquement des guides de style rédactionnel (Google Style, Microsoft Style, règles personnalisées).'
    },
    {
      stem: 'Quelle balise d’encadrement permet de déclarer un bloc de code Python avec coloration syntaxique en Markdown GFM ?',
      opts: [
        'Trois backticks suivis immédiatement de la mention « python » (```python ... ```)',
        'Des guillemets français (&laquo; python ... &raquo;)',
        'Des chevrons HTML ordinaires (&lt;code&gt; ... &lt;/code&gt;)',
        'Deux parenthèses ouvrantes (( python ... ))'
      ],
      correct: 0,
      exp: 'Trois backticks suivis de l’identifiant du langage (```python) forment la syntaxe standard pour les blocs de code clôturés avec coloration syntaxique.'
    },
    {
      stem: 'Pourquoi est-il fortement recommandé d’héberger la documentation dans le même dépôt Git que le code de l’application (dossier docs/) plutôt que dans un wiki externe séparé ?',
      opts: [
        'Car Git ne peut pas gérer les fichiers textes en dehors du répertoire racine',
        'Car cela garantit que les modifications documentaires sont synchronisées, relues et fusionnées dans la même branche et la même PR que le code qu’elles décrivent',
        'Car les wikis externes coûtent obligatoirement un million d’euros par an',
        'Car les développeurs refusent d’utiliser internet'
      ],
      correct: 1,
      exp: 'Conserver la documentation dans le même dépôt permet de coupler les commits de code et de documentation dans la même Pull Request, évitant la dérive documentaire.'
    }
  ],
  flashcards: [
    {
      q: 'Qu’est-ce que la démarche « Docs-as-Code » ?',
      a: 'L’application des outils et processus du génie logiciel à la documentation : fichiers textes Markdown, versionnement Git, relecture par PR et validation continue CI/CD.'
    },
    {
      q: 'Quelle est la règle d’or pour la hiérarchie des titres en Markdown ?',
      a: 'Un seul titre de niveau 1 (#) par document et aucun saut de niveau hiérarchique (h1 -&gt; h2 -&gt; h3).'
    },
    {
      q: 'Quel est l’intérêt majeur de concevoir des diagrammes avec Mermaid.js ?',
      a: 'Les schémas sont écrits en texte brut, versionnés sous Git, modifiables facilement par tous et directement lisibles dans les diffs de Pull Requests.'
    },
    {
      q: 'Quel est le rôle du fichier mkdocs.yml ?',
      a: 'C’est le fichier central de configuration de MkDocs qui définit le thème, les métadonnées et l’arborescence de navigation (`nav`).'
    },
    {
      q: 'Pourquoi activer l’option `--strict` dans les builds de documentation en CI ?',
      a: 'Pour convertir tous les avertissements (liens orphelins, références invalides) en erreurs bloquantes, empêchant toute dérive en production.'
    },
    {
      q: 'Quel est le rôle d’un linter de prose comme Vale ?',
      a: 'Automatiser le respect des chartes rédactionnelles techniques, de la cohérence terminologique et des seuils de lisibilité.'
    }
  ],
  mastery: [
    {
      cls: 'low',
      text: 'Moins de 4/8 : Révisez les bases du Docs-as-Code, la syntaxe Markdown, les diagrammes Mermaid et la configuration MkDocs.'
    },
    {
      cls: 'medium',
      text: 'Entre 5/8 et 7/8 : Bon niveau, approfondissez les linters de style (Vale), la hiérarchie stricte des titres et les options de CI.'
    },
    {
      cls: 'high',
      text: '8/8 : Parfait ! Vous maîtrisez l’industrialisation moderne de la documentation technique en environnement DevOps.'
    }
  ]
};

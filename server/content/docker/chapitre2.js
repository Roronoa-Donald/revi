/**
 * Chapitre 2 du cours « Docker B2 » — Images, Layers &amp; Registres Docker.
 */
'use strict';

const { box } = require('../../../scripts/course-kit');

module.exports = {
  n: 2,
  title: 'Images, Layers &amp; Registres Docker',
  short: 'Images &amp; Layers OverlayFS',
  toc: 'Anatomie d’une image Docker, empilement de couches en lecture seule (Layers), pilote de stockage Overlay2 (lowerdir, upperdir, merged), mécanisme de Copy-On-Write (CoW), registres d’images (Docker Hub, Harbor, GHCR) et digests immuables SHA256.',
  time: '≈ 2 h 45 de travail',
  free: false,
  lockLabel: 'Réservé B2 et plus',

  situation:
    'Une entreprise déploie 80 conteneurs sur un serveur de production dont le disque dur s’est soudainement saturé. ' +
    'En examinant le stockage, l’administrateur découvre que chaque développeur a packagé une image de 1,2 Go basée ' +
    'sur une distribution Linux lourde sans mutualisation, consommant près de 100 Go de disque inutilement. ' +
    'Pire encore : un déploiement récent utilisant le tag flottant « :latest » a brisé l’application en production ' +
    'car l’image distante avait été mise à jour à l’insu de l’équipe. ' +
    'Pour maîtriser le stockage, la reproductibilité et la sécurité des déploiements, les ingénieurs doivent ' +
    'comprendre intimement comment fonctionne le système de fichiers en couches OverlayFS, ' +
    'comment les couches sont dédupliquées sur l’hôte et comment épingler rigoureusement les images par leurs digests cryptographiques SHA256.',

  objectives: [
    'comprendre la structure interne d’une image Docker (empilement de couches immuables Read-Only) ;',
    'analyser le fonctionnement du pilote de stockage Overlay2 (dossiers lowerdir, upperdir, merged) ;',
    'maîtriser le principe de Copy-On-Write (CoW) lors des opérations d’écriture et de suppression (Whiteout) ;',
    'calculer les gains d’espace disque réels issus de la déduplication des couches partagées ;',
    'décomposer une référence d’image selon la norme OCI (registre, namespace, repository, tag, digest) ;',
    'comprendre pourquoi l’usage du tag « latest » en production est un anti-pattern dangereux.'
  ],

  sections: [
    {
      title: 'Anatomie d’une Image et Empilement de Couches (Layers)',
      html: [
        '<p>Une image Docker n’est pas un fichier monolithique, mais une <strong>pile ordonnée de couches immuables ' +
        '(tarballs d’arborescences de fichiers)</strong> identifiées par un hachage cryptographique SHA256 :</p>',

        '<div class="grid grid-2">',
        '  <div class="card">',
        '    <h4>Couches d’Image (Image Layers — Read-Only)</h4>',
        '    <ul>',
        '      <li>Chaque instruction d’un Dockerfile (<code>FROM</code>, <code>RUN</code>, <code>COPY</code>) crée une nouvelle couche sur le disque.</li>',
        '      <li>Ces couches sont strictement <strong>en lecture seule (immuables)</strong> : une fois forgées, elles ne peuvent jamais être altérées.</li>',
        '      <li>Elles sont partagées universellement entre toutes les images et conteneurs du serveur qui s’appuient dessus.</li>',
        '    </ul>',
        '  </div>',
        '  <div class="card">',
        '    <h4>Couche Conteneur (Container Layer — Read-Write)</h4>',
        '    <ul>',
        '      <li>Lorsqu’un conteneur est instancié à partir d’une image, Docker ajoute une couche mince en lecture-écriture au sommet de la pile.</li>',
        '      <li>Toutes les modifications du conteneur (création de fichiers temporaires, journaux, base de données locale) sont consignées dans cette couche.</li>',
        '      <li>Elle est détruite automatiquement lors de la suppression du conteneur (<code>docker rm</code>).</li>',
        '    </ul>',
        '  </div>',
        '</div>'
      ].join('\n')
    },
    {
      title: 'Le Pilote de Stockage Overlay2 et la Mécanique Copy-On-Write (CoW)',
      html: [
        '<p>Le pilote de stockage standard sous Linux est <strong>OverlayFS (overlay2)</strong>. Il fusionne virtuellement ' +
        'plusieurs répertoires en un point de montage unifié sans dupliquer les fichiers :</p>',

        '<table class="table">',
        '  <thead>',
        '    <tr>',
        '      <th>Composant OverlayFS</th>',
        '      <th>Nature &amp; Rôle</th>',
        '      <th>Équivalent Docker</th>',
        '    </tr>',
        '  </thead>',
        '  <tbody>',
        '    <tr>',
        '      <td><strong>lowerdir</strong></td>',
        '      <td>Ensemble des répertoires inférieurs en lecture seule.</td>',
        '      <td>Les couches immuables de l’image Docker.</td>',
        '    </tr>',
        '    <tr>',
        '      <td><strong>upperdir</strong></td>',
        '      <td>Répertoire supérieur unique en lecture-écriture.</td>',
        '      <td>La couche volatile du conteneur (Container Writable Layer).</td>',
        '    </tr>',
        '    <tr>',
        '      <td><strong>workdir</strong></td>',
        '      <td>Répertoire interne de préparation pour les opérations atomiques.</td>',
        '      <td>Espace de travail interne géré par le noyau Linux.</td>',
        '    </tr>',
        '    <tr>',
        '      <td><strong>merged</strong></td>',
        '      <td>Point de montage résultant visible par le conteneur.</td>',
        '      <td>La racine du conteneur (ce que le processus voit dans son arborescence).</td>',
        '    </tr>',
        '  </tbody>',
        '</table>',

        box(
          'tip',
          'Comment Fonctionne le Copy-On-Write (CoW) ?',
          '<p>Tant qu’un conteneur lit un fichier existant dans l’image, il accède directement à la couche inférieure sans aucune copie mémoire ni disque. ' +
          'Dès que le conteneur tente de <strong>modifier</strong> ce fichier, le noyau le copie d’abord instantanément dans le répertoire supérieur ' +
          '(<em>upperdir</em>) avant d’y appliquer les modifications. Si un conteneur tente de <strong>supprimer</strong> un fichier d’image, ' +
          'le noyau ne peut pas toucher à la couche Read-Only : il crée alors un fichier spécial nommé <strong>whiteout</strong> ' +
          '(nœud de périphérique avec majeur/mineur 0/0) dans l’upperdir, masquant le fichier aux yeux du conteneur.</p>'
        )
      ].join('\n')
    },
    {
      title: 'Registres d’Images, Tags Flottants vs Digests SHA256',
      html: [
        '<p>Les images sont hébergées sur des registres distants (Docker Hub, GitHub Container Registry ghcr.io, Quay.io, ou registries privées auto-hébergées comme Harbor). ' +
        'Une référence d’image complète répond à la nomenclature formelle suivante :</p>',

        '<pre><code>[REGISTRE/][NAMESPACE/]REPOSITORY[:TAG][@sha256:DIGEST]\n' +
        '\n' +
        'Exemples :\n' +
        '- nginx                                 -&gt; docker.io/library/nginx:latest\n' +
        '- monorg/backend:v1.2.0                  -&gt; docker.io/monorg/backend:v1.2.0\n' +
        '- ghcr.io/equipe/service:2.1.0           -&gt; ghcr.io/equipe/service:2.1.0\n' +
        '- redis@sha256:4b912a...                -&gt; Version cryptographiquement immuable</code></pre>',

        box(
          'important',
          'Le Piège Mortel du Tag « :latest » en Production',
          '<p>Le tag <code>latest</code> n’offre <strong>aucune garantie de stabilité</strong> : il s’agit d’un simple pointeur symbolique flottant ' +
          'qui est réassigné chaque fois qu’une nouvelle image est poussée sans tag spécifique. ' +
          'En production, l’usage de <code>:latest</code> expose à des pannes imprévisibles, à l’impossibilité de reproduire un bogue, ' +
          'et à des attaques par empoisonnement de dépendance (Supply Chain Attack). ' +
          'Exigence de production : toujours utiliser un tag sémantique explicite (ex: <code>node:18.19.0-alpine</code>) ' +
          'ou mieux encore, le digest SHA256 complet de l’image.</p>'
        )
      ].join('\n')
    },
    {
      title: 'Commandes de Gestion et Distribution d’Images',
      html: [
        '<p>Pour manipuler efficacement les images dans son flux de travail quotidien :</p>',

        '<ul>',
        '  <li><code>docker pull &lt;image&gt;:&lt;tag&gt;</code> : télécharge l’image depuis le registre distant couche par couche (en ignorant les couches déjà présentes en cache local).</li>',
        '  <li><code>docker tag &lt;source&gt; &lt;cible&gt;</code> : crée un alias symbolique vers une image existante sans dupliquer les couches.</li>',
        '  <li><code>docker push &lt;image&gt;</code> : publie une image forgée localement vers un registre distant après authentification (<code>docker login</code>).</li>',
        '  <li><code>docker history &lt;image&gt;</code> : inspecte l’historique des couches de l’image, affichant la taille et la commande Dockerfile à l’origine de chaque layer.</li>',
        '  <li><code>docker rmi &lt;image&gt;</code> : supprime la référence locale et libère les couches de stockage si aucun autre conteneur ni tag ne les utilise.</li>',
        '</ul>'
      ].join('\n')
    }
  ],

  methodTitle: 'Protocole d’Audit et d’Optimisation du Stockage d’Images Docker',
  method: [
    'Étape 1 — Inventorier l’espace disque consommé : Exécuter la commande « docker system df » pour visualiser l’espace pris par les images, conteneurs et volumes.',
    'Étape 2 — Inspecter les couches d’une image : Lancer « docker history --no-trunc &lt;image&gt; » pour identifier les couches volumineuses et suspectes.',
    'Étape 3 — Rapatrier uniquement par version sémantique : Remplacer systématiquement tous les tags « latest » par des versions précises dans les manifestes.',
    'Étape 4 — Vérifier la déduplication Overlay2 : Constater dans « /var/lib/docker/overlay2/ » que les couches communes ne sont pas dupliquées.',
    'Étape 5 — Épingler les digests critiques : Récupérer le digest cryptographique SHA256 avec « docker inspect --format="{{index .RepoDigests 0}}" &lt;image&gt; ».',
    'Étape 6 — Purger les couches orphelines : Nettoyer les images non référencées et sans conteneur actif avec « docker image prune -a ».'
  ],

  summary: [
    'Une image Docker est un assemblage immuable de couches en lecture seule (Image Layers) superposées.',
    'Le pilote Overlay2 fusionne les lowerdir (couches d’images) et l’upperdir (couche Writable du conteneur) dans merged.',
    'La stratégie Copy-On-Write (CoW) copie un fichier dans la couche conteneur uniquement lors de sa première tentative de modification.',
    'La suppression d’un fichier de l’image de base crée un fichier masquant (whiteout) dans la couche conteneur sans effacer la donnée de l’image.',
    'Les couches communes partagent le même hash SHA256 et ne sont stockées qu’une seule fois sur la machine hôte.',
    'Le tag « latest » est flottant et imprévisible : les déploiements de production doivent privilégier des tags sémantiques ou des digests SHA256.'
  ],

  checklist: [
    'Je comprends pourquoi deux images partageant la même base ne consomment pas deux fois l’espace disque.',
    'Je sais expliquer les 4 répertoires fondamentaux d’OverlayFS : lowerdir, upperdir, workdir et merged.',
    'Je maîtrise le mécanisme de Copy-On-Write et la notion de fichier whiteout.',
    'Je sais décomposer une référence d’image complète (registre, namespace, tag, digest).',
    'Je sais pourquoi le tag latest est formellement banni en environnement de production.',
    'Je sais utiliser docker history pour auditer la taille de chaque couche d’une image.'
  ],

  notions: [
    'Couches immuables (Read-Only Image Layers)',
    'Couche d’écriture du conteneur (Writable Container Layer)',
    'Système de fichiers Overlay2 (UnionFS)',
    'Dossiers lowerdir, upperdir, workdir, merged',
    'Mécanisme Copy-On-Write (CoW)',
    'Fichiers masquants Whiteout',
    'Registres d’images (Docker Hub, Harbor, GHCR)',
    'Digests cryptographiques SHA256'
  ],

  pitfalls: [
    'Utiliser le tag :latest en production, entraînant des déploiements non déterministes et des pannes silencieuses.',
    'Penser que supprimer un fichier dans une commande RUN ultérieure allège l’image : le fichier reste figé dans la couche précédente.',
    'Confondre la taille apparente cumulée (docker images) et la taille physique réelle stockée sur le disque après déduplication.',
    'Écrire des gigaoctets de logs directement dans la couche conteneur sans volume, saturant le disque système de l’hôte.'
  ],

  questions: [
    {
      stem: 'Que se passe-t-il au niveau du stockage lorsque deux images distinctes s’appuient toutes les deux sur la même image de base « alpine:3.18 » (7 Mo) ?',
      opts: [
        'Le serveur hôte télécharge et stocke deux fois les 7 Mo sur le disque',
        'La couche commune de 7 Mo n’est stockée qu’une seule fois sur l’hôte grâce au partage de couches Overlay2',
        'Le démon Docker refuse de télécharger la seconde image',
        'Les deux conteneurs s’exécutent obligatoirement dans la même mémoire vive'
      ],
      correct: 1,
      exp: 'Chaque couche possède un identifiant de contenu SHA256 unique : si une couche existe déjà dans le cache du démon, elle est réutilisée sans duplication disque.'
    },
    {
      stem: 'Dans l’architecture du pilote de stockage Overlay2, à quoi correspond le répertoire « upperdir » ?',
      opts: [
        'Au noyau Linux de la machine hôte',
        'À la couche en lecture-écriture propre au conteneur (Container Writable Layer)',
        'À l’espace de swap du processeur',
        'Au cache DNS du réseau bridge'
      ],
      correct: 1,
      exp: 'upperdir est la couche supérieure inscriptible du conteneur où sont enregistrées toutes les écritures et modifications de fichiers.'
    },
    {
      stem: 'Comment le système de fichiers OverlayFS gère-t-il la suppression par un conteneur d’un fichier appartenant à une couche d’image inférieure en lecture seule ?',
      opts: [
        'Il efface physiquement le fichier sur le disque dur de l’hôte',
        'Il crée un fichier spécial « whiteout » dans l’upperdir pour masquer le fichier lors de la fusion du point de montage merged',
        'Le conteneur plante instantanément avec une erreur Kernel Panic',
        'Le fichier est déplacé dans la corbeille de Windows'
      ],
      correct: 1,
      exp: 'Les couches inférieures sont immuables : OverlayFS crée un fichier spécial (whiteout) dans la couche supérieure pour cacher le fichier d’image sans l’effacer physiquement.'
    },
    {
      stem: 'Pourquoi est-il fortement déconseillé d’utiliser le tag « :latest » pour les images de conteneurs déployées en production ?',
      opts: [
        'Parce que le tag latest est payant sur Docker Hub',
        'Parce que c’est un tag flottant qui peut changer à tout moment sans préavis, brisant la reproductibilité et augmentant les risques de sécurité',
        'Parce que le moteur Docker refuse d’exécuter les images taguées latest en arrière-plan',
        'Parce que ce tag désactive automatiquement la connexion réseau'
      ],
      correct: 1,
      exp: 'latest est un simple pointeur mutable : il ne garantit aucune version précise et peut introduire des régressions ou des failles de sécurité lors d’un redémarrage de conteneur.'
    },
    {
      stem: 'Quel est le moyen le plus sûr et le plus immuable pour référencer une image Docker de manière infalsifiable ?',
      opts: [
        'Par son nom simple sans tag (ex: nginx)',
        'Par son digest cryptographique SHA256 (ex: nginx@sha256:7f9a12...)',
        'Par le numéro de port TCP exposé',
        'Par la date de création de l’image'
      ],
      correct: 1,
      exp: 'Le digest SHA256 est calculé sur le manifeste exact de l’image : il garantit à 100 % que l’image exécutée correspond au binaire exact audité, sans risque de falsification.'
    },
    {
      stem: 'Si une instruction RUN dans un Dockerfile crée un fichier de 500 Mo puis que l’instruction RUN suivante le supprime avec « rm », quel est l’impact sur la taille finale de l’image ?',
      opts: [
        'La taille de l’image finale est réduite de 500 Mo',
        'Le fichier de 500 Mo reste stocké dans la première couche de l’image et continue d’alourdir la taille totale de l’image téléchargée',
        'Le Dockerfile est considéré comme invalide par le démon',
        'La mémoire RAM de la machine hôte est vidée'
      ],
      correct: 1,
      exp: 'Chaque ligne RUN crée une couche immuable scellée : supprimer un fichier dans une couche postérieure ne retire pas la donnée de la couche précédente dans l’historique.'
    },
    {
      stem: 'Quelle commande Docker permet d’inspecter les couches successives d’une image et la taille ajoutée par chaque instruction ?',
      opts: [
        'docker inspect-layers',
        'docker history',
        'docker trace',
        'docker audit'
      ],
      correct: 1,
      exp: 'docker history liste l’empilement complet des layers de l’image avec la taille de chaque couche et l’instruction correspondante.'
    },
    {
      stem: 'Où se situe le registre par défaut lorsque l’on télécharge une image officielle simple comme « redis » sans préfixe de domaine ?',
      opts: [
        'Sur gitlab.com',
        'Sur Docker Hub (docker.io/library/redis)',
        'Sur Google Container Registry',
        'Directement sur le disque dur local'
      ],
      correct: 1,
      exp: 'Les images sans préfixe de registre sont automatiquement résolues vers le registre officiel Docker Hub sous l’espace officiel docker.io/library/.'
    }
  ],

  flashcards: [
    {
      q: 'Qu’est-ce qu’une couche d’image Docker (Image Layer) ?',
      a: 'Une archive de fichiers immuable en lecture seule forgée par une instruction du Dockerfile et identifiée par un SHA256.'
    },
    {
      q: 'Quel est le rôle de la Writable Container Layer ?',
      a: 'C’est la couche supérieure en lecture-écriture ajoutée au conteneur, où s’effectuent toutes ses modifications locales.'
    },
    {
      q: 'Qu’est-ce que le mécanisme Copy-On-Write (CoW) ?',
      a: 'Le noyau copie un fichier de l’image vers la couche conteneur uniquement lorsque le conteneur tente de le modifier.'
    },
    {
      q: 'Comment un conteneur supprime-t-il un fichier de l’image ?',
      a: 'En créant un fichier spécial whiteout dans la couche conteneur qui masque le fichier sans effacer l’image sous-jacente.'
    },
    {
      q: 'Pourquoi bannir le tag :latest en production ?',
      a: 'Parce qu’il est flottant et non reproductible, provoquant des ruptures imprévisibles lors des redéploiements.'
    },
    {
      q: 'Comment garantir l’immuabilité absolue d’une image ?',
      a: 'En l’épinglant avec son digest cryptographique SHA256 (ex: image@sha256:...).'
    }
  ],

  mastery: [
    { cls: 'low', text: 'Moins de 4/8 : Révisez la structure des layers, Overlay2 et les risques du tag latest.' },
    { cls: 'mid', text: 'De 4 à 6/8 : Bonnes notions de stockage. Approfondissez le Copy-On-Write et les fichiers whiteout.' },
    { cls: 'good', text: '7/8 : Très bonne maîtrise des systèmes de fichiers en couches et des registres d’images.' },
    { cls: 'top', text: '8/8 : Score parfait ! Vous optimisez et sécurisez les images Docker selon les standards industriels les plus stricts.' }
  ]
};

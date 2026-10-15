/**
 * Chapitre 3 du cours « Docker B2 » — Dockerfile, Directives &amp; Optimisation Multi-Stage.
 */
'use strict';

const { box } = require('../../../scripts/course-kit');

module.exports = {
  n: 3,
  title: 'Dockerfile, Directives &amp; Optimisation Multi-Stage',
  short: 'Dockerfile &amp; Multi-Stage Builds',
  toc: 'Syntaxe et directives fondamentales du Dockerfile, gestion fine du cache de construction (Build Cache), fichier .dockerignore, comparaison formelle CMD vs ENTRYPOINT (exec form vs shell form), et réduction drastique de surface d’attaque par les builds multi-étapes (Multi-Stage Builds).',
  time: '≈ 2 h 45 de travail',
  free: false,
  lockLabel: 'Réservé B2 et plus',

  situation:
    'Une équipe de développeurs livre une image Docker pour une application écrite en Go. ' +
    'L’image pèse 1,4 Go en production et intègre le compilateur Go complet, l’historique git, les outils de build gcc ' +
    'et les codes sources complets. Un audit de sécurité automatisé (scanner Trivy) relève plus de 180 vulnérabilités critiques ' +
    'liées aux utilitaires système embarqués inutilement dans l’image de production. ' +
    'De plus, chaque modification d’une seule ligne de code oblige Docker à réinstaller l’intégralité des dépendances pendant 15 minutes ' +
    'faute d’un ordre de couches réfléchi. ' +
    'Ce module forme les étudiants à écrire des Dockerfiles professionnels, ultra-rapides à compiler grâce au cache, ' +
    'et à diviser par cinquante la taille et la surface de vulnérabilité de leurs images grâce au pattern Multi-Stage Build.',

  objectives: [
    'maîtriser la syntaxe et les directives fondamentales du Dockerfile (FROM, WORKDIR, COPY, RUN, ENV, ARG, EXPOSE, USER) ;',
    'comprendre l’invalidation du cache de build et ordonner les couches du moins changeant au plus changeant ;',
    'filtrer rigoureusement les fichiers sensibles et temporaires grâce au fichier .dockerignore ;',
    'distinguer rigoureusement la forme exec (JSON) de la forme shell pour CMD et ENTRYPOINT ;',
    'garantir la bonne transmission des signaux d’arrêt UNIX (SIGTERM) au processus conteneurisé ;',
    'concevoir une architecture de build Multi-Stage séparant l’environnement de compilation du runtime de production.'
  ],

  sections: [
    {
      title: 'Directives Clés du Dockerfile et Bonnes Pratiques',
      html: [
        '<p>Le <strong>Dockerfile</strong> est la recette déclarative d’assemblage d’une image Docker. ' +
        'Chaque directive doit être choisie avec rigueur technique :</p>',

        '<table class="table">',
        '  <thead>',
        '    <tr>',
        '      <th>Directive</th>',
        '      <th>Rôle</th>',
        '      <th>Bonne pratique recommandée</th>',
        '    </tr>',
        '  </thead>',
        '  <tbody>',
        '    <tr>',
        '      <td><strong>FROM</strong></td>',
        '      <td>Définit l’image de départ (Base Image).</td>',
        '      <td>Toujours spécifier une version explicite (ex: <code>node:20-alpine</code>) plutôt qu’un tag flottant.</td>',
        '    </tr>',
        '    <tr>',
        '      <td><strong>WORKDIR</strong></td>',
        '      <td>Définit le répertoire de travail pour les commandes suivantes.</td>',
        '      <td>Toujours utiliser un chemin absolu (ex: <code>WORKDIR /app</code>). Ne jamais enchaîner de <code>cd</code> manuels.</td>',
        '    </tr>',
        '    <tr>',
        '      <td><strong>COPY</strong></td>',
        '      <td>Copie des fichiers ou dossiers depuis la machine hôte vers l’image.</td>',
        '      <td>Préférer <code>COPY</code> à <code>ADD</code> pour les fichiers locaux afin d’éviter les effets de bord d’extraction automatique.</td>',
        '    </tr>',
        '    <tr>',
        '      <td><strong>ADD</strong></td>',
        '      <td>Copie avec décompression automatique d’archives tar locales ou téléchargement d’URL.</td>',
        '      <td>À réserver exclusivement pour décompresser une archive tar locale directement dans l’image.</td>',
        '    </tr>',
        '    <tr>',
        '      <td><strong>RUN</strong></td>',
        '      <td>Exécute une commande shell lors de la construction et scelle une couche.</td>',
        '      <td>Chaîner les commandes avec <code>&amp;&amp;</code> et nettoyer les caches de paquets dans la même instruction.</td>',
        '    </tr>',
        '    <tr>',
        '      <td><strong>ENV vs ARG</strong></td>',
        '      <td>Variables de configuration.</td>',
        '      <td><code>ARG</code> existe uniquement pendant le build ; <code>ENV</code> persiste dans l’image et au runtime du conteneur.</td>',
        '    </tr>',
        '    <tr>',
        '      <td><strong>EXPOSE</strong></td>',
        '      <td>Documentation du port d’écoute.</td>',
        '      <td>Purement informatif pour les développeurs, ne publie aucun port sur l’hôte (contrairement à <code>-p</code>).</td>',
        '    </tr>',
        '  </tbody>',
        '</table>'
      ].join('\n')
    },
    {
      title: 'Optimisation du Build Cache et Fichier .dockerignore',
      html: [
        '<p>Lors de l’exécution de <code>docker build</code>, Docker réutilise les couches déjà compilées ' +
        'si aucun fichier ni paramètre n’a changé en amont. Dès qu’une couche est invalidée, ' +
        '<strong>toutes les couches suivantes doivent être entièrement recalculées</strong> :</p>',

        '<div class="grid grid-2">',
        '  <div class="card">',
        '    <h4>Anti-pattern : Invalidation Permanente du Cache</h4>',
        '    <pre><code>FROM node:18-alpine\n' +
        'WORKDIR /app\n' +
        'COPY . .  # &lt;-- Erreur ! Modifie a chaque commit\n' +
        'RUN npm install # Se relance a chaque modification du code !</code></pre>',
        '    <p>Le développeur modifie une ligne de commentaire dans son code source : <code>COPY . .</code> change, ' +
        '    le cache est brisé, et <code>npm install</code> doit retélécharger 800 Mo de dépendances à chaque fois.</p>',
        '  </div>',
        '  <div class="card">',
        '    <h4>Pattern Optimal : Isolation des Dépendances</h4>',
        '    <pre><code>FROM node:18-alpine\n' +
        'WORKDIR /app\n' +
        'COPY package*.json ./\n' +
        'RUN npm ci --only=production  # En cache si package.json inchange\n' +
        'COPY . .\n' +
        'CMD ["node", "server.js"]</code></pre>',
        '    <p><code>npm ci</code> reste parfaitement en cache tant que les dépendances n’ont pas été modifiées. ' +
        '    Le build ne prend alors que 2 secondes !</p>',
        '  </div>',
        '</div>',

        box(
          'tip',
          'Le Fichier .dockerignore',
          '<p>Tout comme <code>.gitignore</code>, le fichier <code>.dockerignore</code> empêche l’envoi de fichiers indésirables ' +
          'dans le contexte de build envoyé au démon Docker : excluez systématiquement les dossiers <code>.git</code>, ' +
          'les dépendances locales <code>node_modules</code> ou <code>venv</code>, les fichiers secrets <code>.env</code> ' +
          'et les journaux de logs.</p>'
        )
      ].join('\n')
    },
    {
      title: 'CMD vs ENTRYPOINT : Forme Exec (JSON) vs Forme Shell',
      html: [
        '<p>L’une des erreurs les plus fréquentes concerne le lancement du processus conteneurisé. ' +
        'Deux formes de syntaxe coexistent :</p>',

        '<table class="table">',
        '  <thead>',
        '    <tr>',
        '      <th>Syntaxe</th>',
        '      <th>Exemple</th>',
        '      <th>Comportement du Système</th>',
        '      <th>Transmission des Signaux UNIX</th>',
        '    </tr>',
        '  </thead>',
        '  <tbody>',
        '    <tr>',
        '      <td><strong>Forme Exec (Recommandée)</strong></td>',
        '      <td><code>CMD ["node", "app.js"]</code></td>',
        '      <td>Exécute directement le binaire <code>node</code> qui devient le <strong>PID 1</strong> du conteneur.</td>',
        '      <td><strong>Parfaite :</strong> Reçoit directement les signaux <code>SIGTERM</code> émis par <code>docker stop</code> pour s’arrêter proprement.</td>',
        '    </tr>',
        '    <tr>',
        '      <td><strong>Forme Shell (Anti-pattern)</strong></td>',
        '      <td><code>CMD node app.js</code></td>',
        '      <td>Enveloppe la commande dans un sous-shell : <code>/bin/sh -c "node app.js"</code>.</td>',
        '      <td><strong>Défaillante :</strong> Le shell est PID 1 et ne transmet pas <code>SIGTERM</code> au processus fils. Le conteneur se fige pendant 10s avant d’être tué brutalement par <code>SIGKILL</code>.</td>',
        '    </tr>',
        '  </tbody>',
        '</table>',

        '<p><strong>Combinaison ENTRYPOINT + CMD :</strong></p>',
        '<pre><code># ENTRYPOINT fixe le binaire de base inaltérable :\n' +
        'ENTRYPOINT ["python", "main.py"]\n' +
        '# CMD fournit les arguments par défaut substituables :\n' +
        'CMD ["--port", "8080"]\n' +
        '\n' +
        '# Un "docker run monapp" executera : python main.py --port 8080\n' +
        '# Un "docker run monapp --debug" executera : python main.py --debug</code></pre>'
      ].join('\n')
    },
    {
      title: 'Le Pattern Révolutionnaire du Multi-Stage Build',
      html: [
        '<p>Introduit dans Docker 17.05, le <strong>Multi-Stage Build</strong> permet d’utiliser plusieurs instructions ' +
        '<code>FROM</code> dans un même Dockerfile afin d’isoler hermétiquement l’environnement de compilation ' +
        'de l’image finale de production :</p>',

        '<pre><code># --- Étape 1 : Environnement de compilation lourd (Build Stage) ---\n' +
        'FROM golang:1.21-alpine AS builder\n' +
        'WORKDIR /src\n' +
        'COPY go.mod go.sum ./\n' +
        'RUN go mod download\n' +
        'COPY . .\n' +
        'RUN CGO_ENABLED=0 GOOS=linux go build -o /bin/monapp .\n' +
        '\n' +
        '# --- Étape 2 : Image minimale de production (Final Stage) ---\n' +
        'FROM alpine:3.18\n' +
        'RUN adduser -D -u 10001 appuser\n' +
        'WORKDIR /app\n' +
        '# On copie UNIQUEMENT le binaire final depuis l\'étape builder :\n' +
        'COPY --from=builder /bin/monapp /app/monapp\n' +
        'USER appuser\n' +
        'EXPOSE 8080\n' +
        'CMD ["/app/monapp"]</code></pre>',

        box(
          'important',
          'Bénéfice Stratégique du Multi-Stage',
          '<p>Le compilateur Go, le code source brut, les outils git et les fichiers intermédiaires sont tous abandonnés ' +
          'dans l’étape 1. L’image finale ne contient que le binaire statique de 15 Mo sur une base Alpine de 7 Mo, ' +
          'soit <strong>22 Mo au lieu de 900 Mo</strong>. Les pirates ne trouvent ni compilateur ni outils de débogage ' +
          'dans le conteneur en cas d’intrusion.</p>'
        )
      ].join('\n')
    }
  ],

  methodTitle: 'Protocole de Conception d’un Dockerfile Optimisé et Sécurisé',
  method: [
    'Étape 1 — Créer le fichier .dockerignore : Écarter immédiatement les répertoires .git, tests, .env et caches locaux.',
    'Étape 2 — Choisir une image de base minimale : Opter pour une variante Alpine Linux (musl) ou Debian-Slim selon les contraintes de glibc.',
    'Étape 3 — Structurer l’ordre des couches de dépendances : Copier les manifestes de paquets (package.json, requirements.txt, go.mod) et installer les dépendances avant de copier le reste du code.',
    'Étape 4 — Chaîner et nettoyer les commandes RUN : Fusionner les étapes d’installation système avec la purge immédiate des listes de paquets temporaires.',
    'Étape 5 — Créer et basculer sur un utilisateur non-root : Déclarer un utilisateur dédié avec l’instruction « USER » pour abandonner les privilèges d’administration.',
    'Étape 6 — Adopter la forme JSON exec pour le point d’entrée : Spécifier la commande de lancement sous forme de tableau JSON strict pour intercepter les signaux SIGTERM.'
  ],

  summary: [
    'Le Dockerfile assemble une image de façon déclarative à travers une suite d’instructions ordonnées.',
    'Les couches doivent être ordonnées du moins changeant au plus changeant pour maximiser l’efficacité du Build Cache.',
    'Le fichier .dockerignore préserve le contexte de build en filtrant les fichiers secrets, volumineux ou inutiles.',
    'Toujours utiliser la forme Exec (JSON) pour CMD et ENTRYPOINT pour que le processus reçoive les signaux UNIX (SIGTERM).',
    'La directive ADD ne doit être utilisée que pour l’extraction automatique d’archives tar locales ; préférer COPY dans tous les autres cas.',
    'Le Multi-Stage Build isole les compilateurs dans une étape transitoire et garantit une image finale ultralégère et sécurisée.'
  ],

  checklist: [
    'Je comprends la différence fondamentale entre la directive COPY et la directive ADD.',
    'Je sais pourquoi le cache est invalidé dès qu’un fichier copié est modifié.',
    'J’ai configuré un fichier .dockerignore pour exclure .git et les dépendances locales.',
    'Je sais pourquoi CMD ["node", "app.js"] est infiniment supérieur à CMD node app.js.',
    'Je sais combiner ENTRYPOINT pour fixer l’exécutable et CMD pour fournir des arguments modifiables.',
    'Je maîtrise l’instruction COPY --from=builder pour extraire des binaires compilés dans une étape finale légère.'
  ],

  notions: [
    'Directives Dockerfile fondamentales',
    'Build Cache et ordre d’invalidation',
    'Fichier de filtrage .dockerignore',
    'Forme Exec (JSON) vs Forme Shell',
    'Gestion du PID 1 et signaux SIGTERM',
    'Combinaison ENTRYPOINT et CMD',
    'Pattern Multi-Stage Build (AS builder)',
    'Directive COPY --from=stage'
  ],

  pitfalls: [
    'Copier l’intégralité des sources avant d’installer les dépendances (ex: COPY . . avant npm install), brisant le cache à chaque modification.',
    'Utiliser la forme shell pour CMD (ex: CMD python app.py) : le conteneur ne répond pas au signal SIGTERM de docker stop.',
    'Laisser traîner des clés SSH, des jetons API ou des fichiers .env dans les couches de l’image.',
    'Oublier de nettoyer les caches de paquets apt ou pip dans la même instruction RUN que l’installation.',
    'Livrer un compilateur lourd (Go, JDK, Rust) dans l’image de production au lieu d’utiliser un Multi-Stage Build.'
  ],

  questions: [
    {
      stem: 'Pourquoi est-il crucial de copier le fichier « package.json » et de lancer « npm install » AVANT de copier le reste du code source applicatif ?',
      opts: [
        'Parce que le langage JavaScript l’exige obligatoirement',
        'Pour bénéficier du cache de build Docker : les dépendances ne seront pas réinstallées tant que package.json ne change pas, même si le code source change',
        'Pour empêcher les autres développeurs de lire le code',
        'Parce que npm refuse de fonctionner dans un répertoire contenant du code'
      ],
      correct: 1,
      exp: 'Si vous copiez tout le code en premier, la moindre retouche de code invalide le cache et force une réinstallation lente des paquets npm à chaque build.'
    },
    {
      stem: 'Quelle est la conséquence critique de l’utilisation de la forme shell « CMD node server.js » par rapport à la forme exec « CMD ["node", "server.js"] » ?',
      opts: [
        'Le serveur démarre deux fois plus vite',
        'Le processus est encapsulé dans /bin/sh -c et ne reçoit pas le signal d’arrêt SIGTERM lors d’un « docker stop », entraînant un arrêt brutal après 10 secondes par SIGKILL',
        'La mémoire vive est automatiquement doublée',
        'La directive est ignorée par le démon Docker'
      ],
      correct: 1,
      exp: 'En forme shell, /bin/sh est le PID 1 et n’achemine pas les signaux système à ses processus fils, empêchant l’application de fermer proprement ses connexions et fichiers.'
    },
    {
      stem: 'À quoi sert le pattern du Multi-Stage Build dans un Dockerfile moderne ?',
      opts: [
        'À compiler du code sur plusieurs serveurs physiques en réseau',
        'À utiliser une première étape lourde pour compiler les sources, puis à copier uniquement le binaire produit dans une image finale minimale et épurée',
        'À faire tourner plusieurs systèmes d’exploitation simultanément dans un même conteneur',
        'À crypter le Dockerfile pour le rendre illisible'
      ],
      correct: 1,
      exp: 'Le Multi-Stage Build isole les outils de build volumineux (compilateurs, SDK) dans un stage temporaire et ne conserve que le résultat compilé dans l’image finale de production.'
    },
    {
      stem: 'Quelle directive Dockerfile doit-on privilégier pour copier un fichier simple du disque hôte vers le conteneur sans comportement magique inattendu ?',
      opts: [
        'ADD',
        'COPY',
        'IMPORT',
        'FETCH'
      ],
      correct: 1,
      exp: 'COPY est explicite, transparente et sans surprise. ADD réalise des décompressions automatiques d’archives tar et accepte des URL distantes, ce qui est souvent source d’erreurs.'
    },
    {
      stem: 'Quelle instruction permet de définir l’utilisateur sous lequel toutes les commandes suivantes du Dockerfile et le conteneur lui-même s’exécuteront ?',
      opts: [
        'AUTH',
        'USER',
        'GROUP',
        'ACCOUNT'
      ],
      correct: 1,
      exp: 'L’instruction USER spécifie le nom d’utilisateur (ou l’UID) pour l’exécution des instructions RUN, CMD et ENTRYPOINT restantes.'
    },
    {
      stem: 'Quelle est la différence fondamentale entre les instructions ARG et ENV dans un Dockerfile ?',
      opts: [
        'ARG n’est disponible que lors de la phase de construction (docker build), alors que ENV persiste dans l’image finale et au runtime du conteneur',
        'ARG est réservé aux chiffres et ENV aux chaînes de caractères',
        'ENV ne fonctionne que sous Windows',
        'Il n’y a aucune différence technique'
      ],
      correct: 0,
      exp: 'ARG définit des variables d’étape de build non transmises au conteneur au runtime. ENV inscrit des variables d’environnement persistantes dans l’image.'
    },
    {
      stem: 'Quel fichier permet d’exclure le dossier « .git » et les fichiers secrets de l’envoi au contexte de build du démon Docker ?',
      opts: [
        '.gitignore',
        '.dockerignore',
        'docker.config',
        '.env.hide'
      ],
      correct: 1,
      exp: 'Le fichier .dockerignore à la racine du projet fonctionne comme .gitignore et évite d’envoyer des fichiers volumineux ou sensibles au démon lors du build.'
    },
    {
      stem: 'Si un Dockerfile définit ENTRYPOINT ["nginx"] et CMD ["-g", "daemon off;"], que se passe-t-il si l’utilisateur exécute « docker run mon-nginx -v » ?',
      opts: [
        'Le conteneur exécute la commande « nginx -v » car l’argument CLI « -v » a écrasé l’instruction CMD par défaut',
        'Le conteneur refuse de démarrer',
        'Le conteneur exécute « -v nginx -g daemon off; »',
        'L’argument « -v » est totalement ignoré'
      ],
      correct: 0,
      exp: 'ENTRYPOINT reste le préfixe fixe de la commande, et tout argument fourni en CLI vient écraser les arguments de CMD.'
    }
  ],

  flashcards: [
    {
      q: 'Pourquoi privilégier COPY à ADD ?',
      a: 'COPY est transparent et prévisible ; ADD effectue des décompressions automatiques et téléchargements souvent indésirables.'
    },
    {
      q: 'Comment optimiser le Build Cache pour les dépendances ?',
      a: 'Copier les fichiers de manifestes (package.json) et installer les dépendances avant de copier l’ensemble du code source.'
    },
    {
      q: 'Pourquoi la forme Exec de CMD est-elle indispensable ?',
      a: 'Elle place l’application en PID 1 et lui transmet directement le signal SIGTERM d’arrêt propre lors d’un docker stop.'
    },
    {
      q: 'Quel est l’intérêt du Multi-Stage Build ?',
      a: 'Compiler dans une étape lourde et n’extraire que l’artefact final dans une image de production épurée et sécurisée.'
    },
    {
      q: 'Quelle est la différence entre ARG et ENV ?',
      a: 'ARG n’existe que pendant le build ; ENV persiste dans l’image et est disponible à l’exécution du conteneur.'
    },
    {
      q: 'À quoi sert le fichier .dockerignore ?',
      a: 'À exclure les fichiers sensibles (.env) et lourds (.git, caches) du contexte de build envoyé au démon Docker.'
    }
  ],

  mastery: [
    { cls: 'low', text: 'Moins de 4/8 : Révisez la forme exec de CMD, l’ordonnancement des couches et le rôle de .dockerignore.' },
    { cls: 'mid', text: 'De 4 à 6/8 : Bonnes notions de Dockerfile. Approfondissez le Multi-Stage Build et l’optimisation du cache.' },
    { cls: 'good', text: '7/8 : Très bonne maîtrise de la construction d’images industrielles légères et véloces.' },
    { cls: 'top', text: '8/8 : Score parfait ! Vous architectez des Dockerfiles conformes aux plus hauts standards DevOps du marché.' }
  ]
};

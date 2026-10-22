/**
 * Chapitre 3 du cours « Veille Technologique & Innovation B3 ».
 */
'use strict';

const { box } = require('../../../scripts/course-kit');

module.exports = {
  n: 3,
  title: 'Outils &amp; Protocoles d’Acquisition : Mécanismes Push/Pull, RSS &amp; Déduplication',
  short: 'Protocoles Push/Pull &amp; RSS',
  toc: 'Protocoles de collecte automatisée, analyse comparative Push vs Pull, formats de syndication standardisés (RSS 2.0, Atom XML), newsletters d’ingénierie et webhooks, normalisation des URLs de tracking (UTM), algorithmes de déduplication par similarité lexicale (Jaccard), et régulation de débit (Rate Limiting).',
  time: '≈ 2 h 45 de travail',
  free: false,
  situation: 'Automatiser la collecte de données sur le web est une compétence clé de l’ingénieur système et data. Cependant, agréger des dizaines de flux d’actualités expose à deux écueils majeurs : l’aspiration de contenus redondants sous des URLs de tracking différentes et le blocage d’adresses IP par les serveurs distants pour abus de requêtes (HTTP 429 Too Many Requests). L’ingénieur de niveau B3 doit comprendre les protocoles de transport et de syndication (RSS, Atom, Webhooks), concevoir des parseurs XML robustes capables d’extraire les métadonnées normées, appliquer des algorithmes de nettoyage d’URL et de déduplication lexicale par similarité de Jaccard, et orchestrer la charge de requêtes via des ordonnanceurs respectant les quotas d’appels API.',
  objectives: [
    'comprendre les mécanismes d’échange et protocoles de syndication Push et Pull ;',
    'analyser la structure XML d’un flux RSS 2.0 (channel, item, title, link, guid, pubDate) et Atom ;',
    'configurer des agrégateurs et des collecteurs automatisés d’ingénierie ;',
    'nettoyer les paramètres de pistage d’URL (UTM analytics, balises ref et tracking) ;',
    'implémenter l’algorithme de similarité de Jaccard pour éliminer les quasi-doublons de titres ;',
    'analyser et résoudre méthodologiquement des parseurs de flux RSS/Atom, des déduplicateurs de flux et des ordonnanceurs avec Rate Limiter.'
  ],
  sections: [
    {
      title: 'Mécanismes Push vs Pull & Formats de Syndication (RSS 2.0 / Atom)',
      html: [
        '<p>L’acquisition automatisée de données repose sur deux paradigmes de communication client-serveur aux propriétés complémentaires :</p>',
        '<div class="grid grid-2">',
        '  <div class="card">',
        '    <h4>Comparatif Push vs Pull en Veille</h4>',
        '    <ul>',
        '      <li><strong>Mécanisme Pull (Tirage) :</strong> Le client interroge périodiquement le serveur distant (polling). Utilisé pour le moissonnage web (scraping) ou la lecture d’API REST. Risque de requêtes inutiles et de décalage temporel si la période est trop longue.</li>',
        '      <li><strong>Mécanisme Push (Poussée) :</strong> Le serveur émetteur notifie immédiatement le client dès qu’un nouvel événement survient (Webhooks, alertes e-mail, WebSockets). Latence quasi-nulle, zéro requête polling côté client.</li>',
        '    </ul>',
        '  </div>',
        '  <div class="card">',
        '    <h4>Anatomie d’un Flux RSS 2.0</h4>',
        '    <p>Le format <strong>RSS</strong> (<em>Really Simple Syndication</em>) est un document XML standardisé permettant la diffusion rapide de nouveautés :</p>',
        '    <pre><code>&lt;rss version="2.0"&gt;',
        '  &lt;channel&gt;',
        '    &lt;title&gt;ANSSI Alertes de Sécurité&lt;/title&gt;',
        '    &lt;item&gt;',
        '      &lt;guid&gt;cve-2025-1044&lt;/guid&gt;',
        '      &lt;title&gt;Vulnérabilité critique OpenSSH&lt;/title&gt;',
        '      &lt;link&gt;https://cert.ssi.gouv.fr/avis/1044/&lt;/link&gt;',
        '      &lt;pubDate&gt;2025-10-15&lt;/pubDate&gt;',
        '    &lt;/item&gt;',
        '  &lt;/channel&gt;',
        '&lt;/rss&gt;</code></pre>',
        '  </div>',
        '</div>'
      ].join('\n')
    },
    {
      title: 'Nettoyage des URLs & Déduplication par Similarité de Jaccard',
      html: [
        '<p>Lorsqu’un robot de veille agrège de multiples sources, une même information est souvent relayée sous des URLs différentes ou avec des titres légèrement reformulés :</p>',
        '<div class="grid grid-2">',
        '  <div class="card">',
        '    <h4>1. Normalisation et Nettoyage d’URLs (UTM Strip)</h4>',
        '    <p>Les liens promotionnels et newsletters contiennent des paramètres de tracking analytics :</p>',
        '    <pre><code>https://site.com/post?utm_source=twitter&amp;utm_medium=social&amp;ref=rss</code></pre>',
        '    <p>Un collecteur rigoureux extrait l’URL canonique en supprimant tous les arguments <code>utm_*</code>, <code>ref</code> et <code>source</code>. Si l’URL nettoyée est déjà enregistrée en base, l’article est rejeté comme <code>DOUBLON_URL</code>.</p>',
        '  </div>',
        '  <div class="card">',
        '    <h4>2. Détection de Quasi-Doublons (Indice de Jaccard)</h4>',
        '    <p>Deux communiqués de presse distincts traitent souvent du même fait avec des titres voisins :</p>',
        '    <pre><code>Titre A : "Sortie officielle de Linux 6.12"\nTitre B : "Sortie officielle et annonce de Linux 6.12"</code></pre>',
        '    <p>L’indice de Jaccard compare les ensembles de mots des deux titres :</p>',
        '    <pre><code>J(A, B) = |A ∩ B| / |A ∪ B|</code></pre>',
        '    <p>Pour un seuil critique $J \\ge 0.60$, l’article est automatiquement identifié comme <code>DOUBLON_TITRE</code>.</p>',
        '  </div>',
        '</div>'
      ].join('\n')
    },
    {
      title: 'Ordonnancement de Collecte & Régulation de Débit (Rate Limiting)',
      html: [
        '<p>Interroger des centaines de sites web sans régulation expose le robot à des bannissements IP immédiats :</p>',
        '<div class="grid grid-2">',
        '  <div class="card">',
        '    <h4>Le Défi du Rate Limiting (HTTP 429)</h4>',
        '    <p>Les serveurs web modernes et plateformes de partage de code (GitHub, GitLab, ArXiv) imposent des quotas stricts d’appels (ex: 60 requêtes par heure pour les accès non authentifiés). Dépasser ce quota entraîne une réponse <code>HTTP 429 Too Many Requests</code> et un blocage temporaire ou définitif de l’adresse IP de veille.</p>',
        '  </div>',
        '  <div class="card">',
        '    <h4>Algorithme de Régulation par Token Bucket</h4>',
        '    <p>L’ordonnanceur de collecte associe à chaque source un réservoir de jetons (Token Bucket) caractérisé par :</p>',
        '    <ul>',
        '      <li>La fréquence d’interrogation minimale autorisée (<code>periode_sec</code>).</li>',
        '      <li>Le plafond de requêtes par minute (<code>rpm</code>).</li>',
        '      <li>Si la demande dépasse le quota disponible sur la fenêtre de temps, l’appel est retardé ou le statut est marqué <code>THROTTLED</code> pour protéger le dispositif.</li>',
        '    </ul>',
        '  </div>',
        '</div>',
        box('tip', '<strong>Éthique et Déontologie du Web Scraping :</strong> Avant de concevoir un robot de collecte par scraping HTML, l’ingénieur doit impérativement consulter le fichier <code>robots.txt</code> du domaine cible, respecter la directive <code>Crawl-delay</code> et renseigner un en-tête <code>User-Agent</code> explicite mentionnant l’organisme de recherche.')
      ].join('\n')
    }
  ],
  method: [
    '1. Privilégier les flux Push (Webhooks, alertes directes) pour les sources critiques temps réel.',
    '2. Exploiter les flux de syndication standardisés RSS 2.0 et Atom plutôt que le scraping HTML fragile.',
    '3. Développer un parseur XML robuste capable d’extraire titre, lien canonique, identifiant GUID et date ISO.',
    '4. Appliquer une fonction de nettoyage d’URL pour retirer tous les paramètres UTM de pistage analytics.',
    '5. Calculer l’indice de Jaccard sur les ensembles de mots des titres pour filtrer les dépêches redondantes.',
    '6. Intégrer un limiteur de débit (Rate Limiter) pour respecter les quotas de requêtes par minute des APIs tierces.'
  ],
  summary: [
    'Le mode Push envoie l’information dès sa création (faible latence) ; le mode Pull interroge périodiquement la source (polling).',
    'RSS 2.0 et Atom sont des formats XML standardisés pour la diffusion et l’échange de nouveautés structurées.',
    'La suppression des balises UTM et paramètres de tracking permet de reconstituer l’URL canonique unique d’un article.',
    'L’indice de similarité de Jaccard (|A ∩ B| / |A ∪ B|) permet d’éliminer les quasi-doublons de titres dès le seuil de 0.60.',
    'Le Rate Limiting protège le veilleur contre les réponses HTTP 429 et le bannissement par les serveurs cibles.',
    'Le respect du robots.txt et des quotas d’appels fait partie intégrante de la déontologie du veilleur technologique.'
  ],
  checklist: [
    'Le flux RSS extrait-il correctement la balise guid pour garantir l’unicité de chaque publication ?',
    'La date de publication est-elle normalisée au format chronologique strict (YYYY-MM-DD) ?',
    'Les paramètres de tracking utm_source, utm_medium, utm_campaign et ref sont-ils retirés des URLs ?',
    'Le seuil de Jaccard est-il calibré (autour de 0.60) pour ne pas éliminer des articles aux sujets distincts ?',
    'La fréquence de polling respecte-t-elle les quotas RPM (Requests Per Minute) imposés par l’API ?',
    'Le collecteur gère-t-il les erreurs réseau et les codes de statut HTTP 429 avec repli temporisé ?'
  ],
  notions: [
    'Protocoles Push vs Pull',
    'Syndication RSS 2.0 & Atom XML',
    'Balises XML &lt;item&gt;, &lt;guid&gt;, &lt;title&gt;, &lt;link&gt;, &lt;pubDate&gt;',
    'Paramètres d’URL de tracking (UTM parameters)',
    'Similarité lexicale de Jaccard (Jaccard Index)',
    'Déduplication stricte vs quasi-déduplication',
    'Rate Limiting & Algorithme Token Bucket',
    'Codes HTTP 429 (Too Many Requests) & robots.txt'
  ],
  pitfalls: [
    'Parser du RSS avec des expressions régulières trop rigides qui échouent dès que l’ordre des balises XML change.',
    'Oublier de nettoyer les arguments UTM, entraînant l’insertion en base de dizaines de copies du même article.',
    'Effectuer du scraping agressif toutes les 2 secondes sans limitation de débit, provoquant le blocage IP du serveur.',
    'Choisir un seuil de Jaccard trop bas (< 0.40) qui élimine par erreur des articles différents traitant du même domaine.'
  ],
  questions: [
    {
      stem: 'Que signifie l’acronyme standard RSS ?',
      opts: [
        'Real Security Socket',
        'Really Simple Syndication',
        'Routing System Standard',
        'Remote Server Script'
      ],
      correct: 1,
      exp: 'Really Simple Syndication désigne le format de données standardisé XML utilisé pour la diffusion de contenus web.'
    },
    {
      stem: 'Dans un élément &lt;item&gt; d’un flux RSS 2.0, quelle balise garantit l’identifiant unique de la ressource ?',
      opts: [
        '&lt;title&gt;',
        '&lt;guid&gt;',
        '&lt;link&gt;',
        '&lt;description&gt;'
      ],
      correct: 1,
      exp: 'La balise &lt;guid&gt; (Globally Unique Identifier) fournit un identifiant permanent et unique pour chaque dépêche.'
    },
    {
      stem: 'À quoi servent les paramètres utm_source et utm_medium ajoutés à la fin d’une URL web ?',
      opts: [
        'À chiffrer la page pour la sécurité',
        'À suivre et tracer l’origine du trafic marketing et analytics',
        'À accélérer le téléchargement du document',
        'À indiquer le format de base de données'
      ],
      correct: 1,
      exp: 'Les balises UTM sont des variables de traçage analytique ajoutées aux URLs pour identifier le canal d’acquisition (e-mail, réseau social).'
    },
    {
      stem: 'Si le titre A contient 5 mots et le titre B contient 5 mots dont 4 sont communs, quel est l’indice de Jaccard J(A, B) ?',
      opts: [
        '4 / 10 = 0.40',
        '4 / 6 ≈ 0.67',
        '5 / 5 = 1.00',
        '1 / 4 = 0.25'
      ],
      correct: 1,
      exp: 'Intersection = 4 mots communs. Union = 5 + 5 - 4 = 6 mots uniques au total. Jaccard = 4/6 ≈ 0.67.'
    },
    {
      stem: 'Quel code de statut HTTP est renvoyé par un serveur web lorsqu’un collecteur dépasse le quota de requêtes autorisé ?',
      opts: [
        'HTTP 200 OK',
        'HTTP 404 Not Found',
        'HTTP 429 Too Many Requests',
        'HTTP 502 Bad Gateway'
      ],
      correct: 2,
      exp: 'Le code HTTP 429 Too Many Requests indique explicitement que le client a envoyé trop de requêtes dans un temps donné.'
    },
    {
      stem: 'Quelle technologie de collecte Push permet à un serveur de notifier instantanément notre API lors d’un commit sur GitHub ?',
      opts: [
        'Un Webhook HTTP',
        'Un fichier robots.txt',
        'Un cookie de session',
        'Une requête DNS inversée'
      ],
      correct: 0,
      exp: 'Un Webhook est un rappel HTTP POST émis par le serveur distant vers notre endpoint dès qu’un événement survient.'
    },
    {
      stem: 'Quel fichier situé à la racine d’un site web indique aux robots d’indexation les répertoires interdits au crawling ?',
      opts: [
        '.htaccess',
        'robots.txt',
        'sitemap.xml',
        'index.html'
      ],
      correct: 1,
      exp: 'Le fichier standard robots.txt spécifie les règles de courtoisie et les restrictions d’accès imposées aux robots et crawlers.'
    },
    {
      stem: 'Pourquoi privilégier un flux RSS plutôt que le scraping HTML pour la collecte d’articles d’ingénierie ?',
      opts: [
        'Parce que le RSS est payant',
        'Parce que le RSS offre une structure de données stable et légère qui ne casse pas lors des refontes graphiques du site',
        'Parce que le scraping HTML est interdit par les lois physiques',
        'Parce que le RSS contient des vidéos en haute définition'
      ],
      correct: 1,
      exp: 'Le format RSS fournit une structure XML standardisée indépendante de la couche de présentation HTML, garantissant la robustesse du collecteur.'
    }
  ],
  flashcards: [
    {
      q: 'Quelle est la différence fondamentale entre RSS et Webhook ?',
      a: 'Le flux RSS est interrogé en mode Pull (polling régulier) ; le Webhook pousse l’information en mode Push dès qu’elle est créée.'
    },
    {
      q: 'Quelles sont les balises clés d’un item RSS ?',
      a: '&lt;title&gt; (titre), &lt;link&gt; (URL), &lt;guid&gt; (identifiant unique) et &lt;pubDate&gt; (date de publication).'
    },
    {
      q: 'Comment calculer l’indice de similarité de Jaccard ?',
      a: 'J(A, B) = |A ∩ B| / |A ∪ B| (taille de l’intersection des mots divisée par la taille de l’union).'
    },
    {
      q: 'Pourquoi nettoyer les paramètres UTM d’une URL en veille ?',
      a: 'Pour obtenir l’URL canonique propre et éviter de stocker plusieurs fois le même article sous des adresses de tracking différentes.'
    },
    {
      q: 'Que signifie une réponse HTTP 429 reçue par un robot de veille ?',
      a: 'Too Many Requests : le serveur distant a bloqué l’appel car le quota maximal de requêtes par minute est dépassé.'
    },
    {
      q: 'Quel est le rôle du fichier robots.txt ?',
      a: 'Définir les permissions et restrictions d’accès accordées aux robots de collecte sur un serveur web.'
    }
  ],
  mastery: [
    {
      cls: 'low',
      text: 'Difficultés à exploiter un flux XML RSS ou méconnaissance des mécanismes de déduplication.'
    },
    {
      cls: 'medium',
      text: 'Bonne maîtrise de l’extraction RSS, nettoyage d’URLs et calcul de Jaccard pour éliminer les doublons.'
    },
    {
      cls: 'high',
      text: 'Architecture de collecte hybride complète : gestion fine des webhooks, rate limiting robuste anti-bannissement et pipeline temps réel.'
    }
  ]
};

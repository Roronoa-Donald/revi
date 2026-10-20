/**
 * Chapitre 4 du cours « Veille Technologique & Innovation B3 ».
 */
'use strict';

const { box } = require('../../../scripts/course-kit');

module.exports = {
  n: 4,
  title: 'Traitement, Qualification de l’Information, Indexation TF-IDF &amp; Filtrage Algorithmique',
  short: 'Qualification &amp; TF-IDF',
  toc: 'Chaîne de traitement textuel NLP (tokenisation, normalisation, suppression des stopwords, lemmatisation), modèle vectoriel et indexation TF-IDF (Term Frequency - Inverse Document Frequency), classification bayésienne naïve pour le filtrage anti-bruit et anti-spam, et détection d’entités nommées (NER).',
  time: '≈ 3 h 00 de travail',
  free: false,
  situation: 'Après la phase de collecte, une cellule de veille fait face à des flux textuels massifs contenant des milliers d’articles hétérogènes. Si l’on se contente d’une recherche par mots-clés basique, les ingénieurs sont submergés par des faux positifs et des communications promotionnelles de faible intérêt technique. Pour transformer ces données brutes en renseignements qualifiés, l’ingénieur de niveau B3 doit déployer des algorithmes de traitement automatique du langage naturel (NLP). Il doit savoir nettoyer et normaliser un corpus multilingue, calculer les scores de pertinence documentaire via l’algorithme vectoriel TF-IDF pour faire ressortir les termes discriminants d’une technologie de pointe, et implémenter des classificateurs probabilistes bayésiens (Naive Bayes) pour séparer automatiquement les véritables alertes du bruit informationnel.',
  objectives: [
    'maîtriser la chaîne de prétraitement textuel NLP pour la veille documentaire ;',
    'comprendre et appliquer le filtrage des mots vides (stopwords) et la tokenisation normalisée ;',
    'assimiler les fondements mathématiques du modèle vectoriel d’information spatiale ;',
    'calculer manuellement et algorithmiquement les métriques TF, IDF et TF-IDF lissées ;',
    'implémenter un classificateur bayésien naïf (Naive Bayes) pour discriminer alertes critiques et bruits de fond ;',
    'développer en Python 3 des nettoyeurs de corpus, des moteurs d’indexation TF-IDF et des filtres bayésiens.'
  ],
  sections: [
    {
      title: 'Prétraitement Textuel NLP : Tokenisation, Normalisation & Stopwords',
      html: [
        '<p>Le texte brut issu du web est bruité et redondant. Avant d’effectuer la moindre analyse sémantique, la chaîne de traitement NLP (<em>Natural Language Processing</em>) normalise les données :</p>',
        '<div class="grid grid-2">',
        '  <div class="card">',
        '    <h4>Étapes de la Chaîne de Traitement Textuel</h4>',
        '    <ol>',
        '      <li><strong>Nettoyage structurel :</strong> Suppression des balises HTML/XML, décodage des entités numériques et conversion en minuscules (<em>lowercasing</em>).</li>',
        '      <li><strong>Ponctuation &amp; Séparateurs :</strong> Remplacement des signes de ponctuation, guillemets et tirets par des espaces pour isoler les unités lexicales.</li>',
        '      <li><strong>Tokenisation :</strong> Découpage de la chaîne en une liste ordonnée de mots ou symboles atomiques (<em>tokens</em>).</li>',
        '      <li><strong>Filtrage des Stopwords :</strong> Élimination des mots grammaticaux vides de sens technique (articles, prépositions, pronoms : <em>le, la, des, dans, avec, the, for</em>).</li>',
        '      <li><strong>Réduction morphologique :</strong> Racinisation (<em>stemming</em>) ou lemmatisation ramenant les mots à leur forme canonique (ex: <em>serveurs → serveur</em>).</li>',
        '    </ol>',
        '  </div>',
        '  <div class="card">',
        '    <h4>Gain de Réduction &amp; Vocabulaire Saillant</h4>',
        '    <p>Sur un article technique typique, la suppression des stopwords et des termes de moins de 3 lettres réduit la taille du vocabulaire actif de <strong>40 % à 60 %</strong> sans aucune perte de sens sémantique.</p>',
        '    <p>Cette condensation lexicale optimise drastiquement le temps d’indexation et la mémoire requise par les moteurs de recherche de veille.</p>',
        '  </div>',
        '</div>'
      ].join('\n')
    },
    {
      title: 'Modèle Vectoriel & Pondération TF-IDF (Term Frequency - Inverse Document Frequency)',
      html: [
        '<p>L’algorithme <strong>TF-IDF</strong> est le pilier des systèmes d’information documentaire. Il permet de mesurer l’importance relative d’un terme dans un document par rapport à un ensemble global de documents (corpus) :</p>',
        '<div class="grid grid-2">',
        '  <div class="card">',
        '    <h4>1. Fréquence du Terme : TF(t, d)</h4>',
        '    <p>Mesure la fréquence locale d’apparition du terme $t$ dans le document $d$ :</p>',
        '    <pre><code>TF(t, d) = count(t dans d) / total_mots(d)</code></pre>',
        '    <p>Plus un mot apparaît souvent dans le document, plus son TF est élevé.</p>',
        '  </div>',
        '  <div class="card">',
        '    <h4>2. Fréquence Inverse de Document : IDF(t)</h4>',
        '    <p>Mesure la rareté globale du terme $t$ à l’échelle du corpus de $N$ documents :</p>',
        '    <pre><code>IDF(t) = ln((N + 1) / (DF(t) + 1)) + 1</code></pre>',
        '    <p>où $\\text{DF}(t)$ est le nombre de documents contenant le terme $t$. Un mot présent dans tous les documents aura un IDF proche de 1 (pénalisé), tandis qu’un terme rare aura un IDF très élevé.</p>',
        '  </div>',
        '</div>',
        '<div class="card">',
        '  <h4>Score de Pertinence Documentaire Global</h4>',
        '  <p>Pour une requête composée de plusieurs mots-clés, le score global du document $d$ est la somme pondérée :</p>',
        '  <pre><code>Score(d) = ∑ [TF(q, d) × IDF(q)] pour chaque q de la requête</code></pre>',
        '  <p>Les documents sont ensuite classés par score décroissant. Cela garantit que les articles traitant précisément d’une innovation rare remontent en tête du classement.</p>',
        '</div>'
      ].join('\n')
    },
    {
      title: 'Classification Probabiliste Naive Bayes pour le Filtrage Anti-Bruit',
      html: [
        '<p>Pour trier automatiquement les alertes entrantes sans dépendre de règles rigides d’expressions régulières, le classificateur probabiliste <strong>Naive Bayes</strong> applique le théorème de Bayes sous l’hypothèse d’indépendance conditionnelle des mots :</p>',
        '<div class="grid grid-2">',
        '  <div class="card">',
        '    <h4>Théorème de Bayes Appliqué au Filtrage</h4>',
        '    <p>Pour un document $d$ composé des mots $w_1, \\dots, w_k$, on compare la probabilité a posteriori d’appartenir à la classe <code>PERTINENT</code> vs <code>BRUIT</code> :</p>',
        '    <pre><code>ln P(Pertinent|d) = ln P(Pertinent) + ∑ ln P(w_i|Pertinent)\nln P(Bruit|d)     = ln P(Bruit)     + ∑ ln P(w_i|Bruit)</code></pre>',
        '    <p>L’utilisation des logarithmes népériens transforme le produit de probabilités en une somme arithmétique simple, éliminant tout risque de sous-dépassement numérique (<em>arithmetic underflow</em>).</p>',
        '  </div>',
        '  <div class="card">',
        '    <h4>Décision &amp; Routage d’Alerte</h4>',
        '    <ul>',
        '      <li>Si $\\ln P(\\text{Pertinent}|d) \\ge \\ln P(\\text{Bruit}|d)$ : l’alerte est qualifiée de <code>PERTINENT</code> et transmise aux ingénieurs ou intégrée au livret.</li>',
        '      <li>Sinon : l’alerte est classifiée en <code>BRUIT</code> et archivée silencieusement sans notification.</li>',
        '      <li>La différence logarithmique quantifie la marge de confiance de la décision de classification.</li>',
        '    </ul>',
        '  </div>',
        '</div>',
        box('tip', '<strong>Apprentissage continu du classificateur :</strong> En intégrant une action utilisateur « Marquer comme non pertinent » dans le tableau de bord de veille, le modèle réajuste dynamiquement les probabilités conditionnelles $P(w_i|\\text{Bruit})$, améliorant continuellement la précision du filtrage sans intervention manuelle.')
      ].join('\n')
    }
  ],
  method: [
    '1. Collecter le texte brut des flux et dépêches techniques.',
    '2. Appliquer la chaîne de prétraitement NLP (minuscules, ponctuation, découpage en tokens).',
    '3. Filtrer les mots vides (stopwords bilingues) et les tokens de longueur inférieure ou égale à 2 caractères.',
    '4. Calculer les fréquences TF locales de chaque mot dans les documents du corpus.',
    '5. Calculer les valeurs IDF lissées sur le corpus pour mesurer la rareté relative des termes techniques.',
    '6. Associer un classificateur bayésien naïf pour router automatiquement les alertes critiques et neutraliser le bruit.'
  ],
  summary: [
    'Le prétraitement NLP transforme le texte brut en un vecteur de tokens normalisés exploitables par les algorithmes.',
    'La suppression des stopwords réduit la volumétrie textuelle de 40 à 60 % sans altérer la portée sémantique.',
    'TF mesure l’abondance locale d’un terme dans un document ; IDF pénalise les termes banals omniprésents dans le corpus.',
    'Le score TF-IDF permet de trier mathématiquement les documents par ordre de pertinence vis-à-vis d’une requête ciblée.',
    'Naive Bayes calcule la log-vraisemblance d’appartenance aux classes Pertinent et Bruit pour chaque alerte entrante.',
    'L’utilisation des logarithmes prévient les erreurs d’underflow lors de la multiplication de faibles probabilités.'
  ],
  checklist: [
    'La ponctuation et les balises HTML sont-elles complètement purgées avant la tokenisation ?',
    'La liste des stopwords inclut-elle les mots grammaticaux français et anglais les plus fréquents ?',
    'La formule IDF utilise-t-elle un lissage (+1) pour éviter toute division par zéro ?',
    'Le tri des documents TF-IDF départage-t-il les ex-æquo par un identifiant déterministe ?',
    'Les probabilités du modèle Naive Bayes sont-elles manipulées sous forme logarithmique ?',
    'Les mots inconnus absents du dictionnaire d’apprentissage sont-ils ignorés sans faire planter le calcul ?'
  ],
  notions: [
    'Traitement automatique du langage naturel (NLP)',
    'Tokenisation & Normalisation',
    'Mots vides (Stopwords)',
    'Term Frequency (TF)',
    'Inverse Document Frequency (IDF lissé)',
    'Score de pertinence vectoriel TF-IDF',
    'Classificateur bayésien naïf (Naive Bayes)',
    'Log-vraisemblance & Log-cotes (Log-odds)'
  ],
  pitfalls: [
    'Calculer l’IDF sans formule lissée (+1) et provoquer une division par zéro si un mot est absent de la base.',
    'Conserver les stopwords dans le calcul TF-IDF, ce qui donne des scores élevés à des mots sans intérêt comme « pour » ou « dans ».',
    'Multiplier directement des probabilités flottantes très faibles en Naive Bayes au lieu de sommer les logarithmes (risque d’underflow à 0.0).',
    'Oublier de convertir l’ensemble du texte en minuscules, créant des doublons lexicaux entre « Cloud », « cloud » et « CLOUD ».'
  ],
  questions: [
    {
      stem: 'Dans la chaîne de traitement NLP, quel est le rôle principal de l’étape de tokenisation ?',
      opts: [
        'Chiffrer le document avec une clé RSA',
        'Découper la chaîne de caractères brute en une séquence d’unités lexicales distinctes (tokens ou mots)',
        'Traduire le texte en espagnol',
        'Compacter le fichier au format ZIP'
      ],
      correct: 1,
      exp: 'La tokenisation segmente le flux textuel continu en éléments lexicaux indépendants appelés tokens.'
    },
    {
      stem: 'Que désigne le terme « stopword » en ingénierie documentaire ?',
      opts: [
        'Un virus informatique bloquant le processeur',
        'Un mot grammatical vide de sens sémantique spécifique (articles, conjonctions) filtré avant analyse',
        'Le mot le plus long du dictionnaire',
        'Une commande d’arrêt du serveur Linux'
      ],
      correct: 1,
      exp: 'Les stopwords sont les mots très fréquents (le, la, de, et, the, with) qui n’apportent aucune information discriminante.'
    },
    {
      stem: 'Si un terme technique apparaît dans un seul document sur un corpus de 100 documents, sa valeur IDF sera :',
      opts: [
        'Nulle (égale à 0)',
        'Très faible',
        'Maximale (fortement valorisée)',
        'Négative'
      ],
      correct: 2,
      exp: 'L’IDF mesure la rareté : plus un terme est rare à l’échelle du corpus, plus sa valeur IDF est grande, signalant un contenu spécifique.'
    },
    {
      stem: 'Quelle formule correspond au calcul du Term Frequency (TF) d’un mot q dans un document d ?',
      opts: [
        'TF = nombre de documents dans le corpus',
        'TF = occurrences(q, d) / nombre total de mots dans d',
        'TF = log(occurrences) * 100',
        'TF = longueur du mot en caractères'
      ],
      correct: 1,
      exp: 'Le TF normalise le nombre d’occurrences d’un terme par la longueur totale en mots du document.'
    },
    {
      stem: 'Pourquoi utilise-t-on la somme des logarithmes népériens plutôt que le produit direct des probabilités en Naive Bayes ?',
      opts: [
        'Parce que les ordinateurs ne savent pas multiplier',
        'Pour éviter le sous-dépassement arithmétique (underflow) lors de la multiplication de probabilités très proches de zéro',
        'Pour rendre le calcul payant',
        'Pour supprimer la ponctuation'
      ],
      correct: 1,
      exp: 'Multiplier des dizaines de probabilités très faibles produit un nombre inférieur à la précision machine (0.0). Sommer leurs logs évite ce problème.'
    },
    {
      stem: 'Dans l’algorithme TF-IDF lissé standard, pourquoi ajoute-t-on 1 au numérateur et au dénominateur de l’IDF ?',
      opts: [
        'Pour arrondir le résultat à l’entier supérieur',
        'Pour éviter la division par zéro si DF=0 et éviter un log nul si N=DF',
        'C’est une constante universelle de Planck',
        'Pour doubler la vitesse d’exécution'
      ],
      correct: 1,
      exp: 'L’ajout de constantes de lissage (+1) empêche les divisions par zéro et garantit la stabilité mathématique du logarithme.'
    },
    {
      stem: 'Quelle hypothèse fondatrice est qualifiée de « naïve » dans le classificateur Naive Bayes ?',
      opts: [
        'L’hypothèse que tous les textes sont écrits en anglais',
        'L’hypothèse d’indépendance conditionnelle des mots sachant la classe',
        'L’hypothèse que tous les articles sont vrais',
        'L’hypothèse que la base de données est vide'
      ],
      correct: 1,
      exp: 'Le modèle est dit « naïf » car il postule que chaque mot apparaît indépendamment des autres dans une classe donnée, ce qui simplifie le calcul.'
    },
    {
      stem: 'Quel est l’impact de la suppression des stopwords sur un corpus d’ingénierie de 10 000 articles ?',
      opts: [
        'Aucun impact mesurable',
        'Une réduction de 40 à 60 % du nombre de tokens sans dégrader la précision de recherche',
        'La destruction irrémédiable de la base de données',
        'Un blocage du réseau local'
      ],
      correct: 1,
      exp: 'Éliminer les mots vides allège le corpus de 40 à 60 % de sa masse textuelle tout en conservant l’intégralité des concepts techniques.'
    }
  ],
  flashcards: [
    {
      q: 'Qu’est-ce que la tokenisation en NLP ?',
      a: 'Le découpage d’un texte brut en une séquence d’unités lexicales élémentaires (mots ou tokens).'
    },
    {
      q: 'À quoi sert la suppression des stopwords ?',
      a: 'À éliminer les mots grammaticaux fréquents sans valeur informative pour concentrer l’analyse sur les termes techniques.'
    },
    {
      q: 'Quelle est la signification de l’acronyme TF-IDF ?',
      a: 'Term Frequency - Inverse Document Frequency (Fréquence du terme × Fréquence inverse de document).'
    },
    {
      q: 'Pourquoi l’IDF pénalise-t-il les mots très fréquents ?',
      a: 'Parce qu’un mot présent dans tous les documents n’est pas discriminant pour identifier le sujet spécifique d’un texte.'
    },
    {
      q: 'Comment Naive Bayes classe-t-il une alerte entre Pertinent et Bruit ?',
      a: 'En comparant les log-vraisemblances des deux classes et en choisissant celle dont le score logarithmique est le plus élevé.'
    },
    {
      q: 'Pourquoi utiliser des logarithmes dans le calcul de Naive Bayes ?',
      a: 'Pour transformer les multiplications de très petites probabilités en additions, évitant l’underflow arithmétique.'
    }
  ],
  mastery: [
    {
      cls: 'low',
      text: 'Difficultés à comprendre les concepts de tokenisation ou la formule de base de TF-IDF.'
    },
    {
      cls: 'medium',
      text: 'Bonne maîtrise du prétraitement textuel, calcul de scores TF-IDF et classification automatique simple.'
    },
    {
      cls: 'high',
      text: 'Pipeline NLP de veille complet : normalisation multilingue, indexation vectorielle haute performance et filtrage bayésien temps réel.'
    }
  ]
};

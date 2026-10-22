/**
 * Chapitre 2 — Architecture REST & conception de ressources.
 *
 * Trois fiches Python pour concevoir des URI et des verbes REST :
 *   - fl2-c2-e1 : normalisation de chemin d'API REST ;
 *   - fl2-c2-e2 : correspondance action métier / verbe HTTP canonique ;
 *   - fl2-c2-e3 : analyse de structure d'URI (collection vs ressource).
 */
'use strict';

module.exports = [
  {
    id: 'fl2-c2-e1',
    chapter: 2,
    level: 'n1',
    language: 'python',
    title: 'Normalisation d’un chemin REST',
    goal: 'Formater et nettoyer un chemin d’accès REST en supprimant les doublons de slashes et les majuscules.',
    brief: '<p>Une bonne pratique de conception REST consiste à utiliser des chemins en minuscules, ' +
      'sans slashes superflus, et sans slash final (sauf pour la racine <code>/</code>).</p>' +
      '<p>Lit une chaîne de chemin sur l’entrée standard. Nettoie la chaîne :<br>' +
      '1. Convertissez en minuscules.<br>' +
      '2. Remplacer les séquences de slashes multiples par un slash unique.<br>' +
      '3. Retirer le slash final s’il y en a un et que le chemin ne se réduit pas à <code>/</code>.<br>' +
      '4. S’assurer que le chemin commence bien par un slash <code>/</code>.<br>' +
      'Affichez le chemin normalisé.</p>',
    starter: `chemin = input().strip()\n\n# À compléter : normaliser le chemin REST et afficher le résultat.\n`,
    hints: [
      'Vous pouvez découper la chaîne avec .split("/") et filtrer les segments non vides avec [s for s in ... if s].',
      'Reconstitue le chemin avec "/" + "/".join(segments).'
    ],
    examples: [
      {
        stdin: '/API//V1/Students//',
        expected: '/api/v1/students',
        note: 'Slashes multiples et majuscules nettoyés.'
      }
    ],
    tests: [
      {
        label: 'Chemin sans slash initial et en majuscules',
        stdin: 'USERS///42/ORDERS/',
        expected: '/users/42/orders'
      },
      {
        label: 'Racine avec slashes multiples',
        stdin: '///',
        expected: '/'
      },
      {
        label: 'Chemin déjà propre',
        stdin: '/api/v2/items',
        expected: '/api/v2/items'
      }
    ],
    solution: `chemin = input().strip()
segments = [s.lower() for s in chemin.split('/') if s]
if not segments:
    print('/')
else:
    print('/' + '/'.join(segments))
`
  },
  {
    id: 'fl2-c2-e2',
    chapter: 2,
    level: 'n2',
    language: 'python',
    title: 'Choix du verbe HTTP canonique',
    goal: 'Associer une intention métier en français à son verbe HTTP REST canonique.',
    brief: '<p>Les principes REST associent les opérations sur les ressources aux verbes du protocole HTTP : ' +
      '<code>GET</code> pour lire ou lister, <code>POST</code> pour créer, <code>PUT</code> pour remplacer complètement, ' +
      '<code>PATCH</code> pour modifier partiellement, et <code>DELETE</code> pour supprimer.</p>' +
      '<p>Lit une action métier sur l’entrée standard (en ignorant la casse et les espaces) et affiche le verbe HTTP correspondant :<br>' +
      '- <code>creer</code> ou <code>ajouter</code> &rarr; <code>POST</code><br>' +
      '- <code>lister</code> ou <code>recuperer</code> &rarr; <code>GET</code><br>' +
      '- <code>remplacer</code> &rarr; <code>PUT</code><br>' +
      '- <code>modifier</code> &rarr; <code>PATCH</code><br>' +
      '- <code>supprimer</code> &rarr; <code>DELETE</code><br>' +
      'Pour toute autre action non reconnue, affiche <code>INCONNU</code>.</p>',
    starter: `action = input().strip().lower()\n\n# À compléter : afficher le verbe HTTP correspondant.\n`,
    hints: [
      'Utilisez un dictionnaire Python associant chaque mot-clé à son verbe HTTP.',
      'Utilisez .get(action, "INCONNU") pour gérer les valeurs hors table.'
    ],
    examples: [
      {
        stdin: 'creer',
        expected: 'POST',
        note: 'Création d’une nouvelle ressource.'
      }
    ],
    tests: [
      {
        label: 'Action lister',
        stdin: 'lister',
        expected: 'GET'
      },
      {
        label: 'Action supprimer',
        stdin: 'SUPPRIMER',
        expected: 'DELETE'
      },
      {
        label: 'Action non reconnue',
        stdin: 'exporter_pdf',
        expected: 'INCONNU'
      }
    ],
    solution: `action = input().strip().lower()

table = {
    'creer': 'POST',
    'ajouter': 'POST',
    'lister': 'GET',
    'recuperer': 'GET',
    'remplacer': 'PUT',
    'modifier': 'PATCH',
    'supprimer': 'DELETE'
}

print(table.get(action, 'INCONNU'))
`
  },
  {
    id: 'fl2-c2-e3',
    chapter: 2,
    level: 'n3',
    language: 'python',
    title: 'Structure d’URI : Collection vs Ressource',
    goal: 'Identifier si une URI REST cible une collection ou une ressource spécifique.',
    brief: '<p>Une URI REST bien conçue suit une hiérarchie alternant nom de collection (au pluriel) ' +
      'et identifiant unique. Si le dernier segment est un identifiant (numérique), l’URI cible une ressource individuelle ; ' +
      'si le dernier segment est un nom, l’URI cible une collection.</p>' +
      '<p>Lit une URI sur l’entrée standard (ex: <code>/api/clients/42</code> ou <code>/api/clients/42/commandes</code>).<br>' +
      '- Si le dernier segment est un entier (identifiant) : affiche <code>Type: ressource | Cible: &lt;nom_collection&gt; | ID: &lt;id&gt;</code>.<br>' +
      '- Si le dernier segment est textuel : affiche <code>Type: collection | Cible: &lt;nom_collection&gt;</code>.<br>' +
      'Ignore les préfixes éventuels comme <code>/api</code> ou <code>/v1</code> pour trouver la collection ciblée.</p>',
    starter: `uri = input().strip()\n\n# À compléter : analyser l'URI et afficher le type et la cible.\n`,
    hints: [
      'Découpez l’URI en segments non vides avec [s for s in uri.split("/") if s].',
      'Vérifiez si le dernier segment est composé uniquement de chiffres avec segment.isdigit().'
    ],
    examples: [
      {
        stdin: '/utilisateurs/42',
        expected: 'Type: ressource | Cible: utilisateurs | ID: 42',
        note: 'Cible l’utilisateur 42.'
      }
    ],
    tests: [
      {
        label: 'Collection simple',
        stdin: '/api/v1/articles',
        expected: 'Type: collection | Cible: articles'
      },
      {
        label: 'Sous-collection imbriquée',
        stdin: '/clients/10/factures',
        expected: 'Type: collection | Cible: factures'
      },
      {
        label: 'Sous-ressource avec ID',
        stdin: '/api/cours/3/chapitres/8',
        expected: 'Type: ressource | Cible: chapitres | ID: 8'
      }
    ],
    solution: `uri = input().strip()
segments = [s for s in uri.split('/') if s]

if not segments:
    print("Type: racine")
else:
    dernier = segments[-1]
    if dernier.isdigit():
        cible = segments[-2] if len(segments) >= 2 else "inconnu"
        print(f"Type: ressource | Cible: {cible} | ID: {dernier}")
    else:
        print(f"Type: collection | Cible: {dernier}")
`
  }
];

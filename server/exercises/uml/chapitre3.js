'use strict';

module.exports = [
  {
    "id": "um2-c3-e1",
    "chapter": 3,
    "level": "n1",
    "language": "analyse",
    "title": "La classe Adhérent de la médiathèque de Clavières",
    "exampleTitle": "Exemple résolu — la classe Chambre de la société Brillance",
    "goal": "Lire la carte d'une classe UML : attributs, opérations, visibilités, paramètres et type de retour.",
    "brief": "<p><strong>Énoncé.</strong> La médiathèque de Clavières modélise sa classe <code>Adhérent</code>. Voici la carte de classe telle qu'elle figure dans le diagramme :</p><p><code>- numero : Integer<br>+ nom : String<br># dateInscription : Date<br>+ emprunter(ouvrage : Ouvrage, jours : Integer) : Boolean<br>~ relancer() : Void</code></p><p>Rappel de la notation UML : <code>+</code> public, <code>-</code> privé, <code>#</code> protégé, <code>~</code> package ; une opération se reconnaît à ses parenthèses. Répondez par des nombres, un nom exact, un type ou le symbole demandé.</p><ol><li>Combien d'attributs compte la classe Adhérent ?</li><li>Quel est le nom de l'unique attribut privé ?</li><li>Quel symbole représente la visibilité protégée ?</li><li>Combien de paramètres l'opération « emprunter » possède-t-elle ?</li><li>Quel est le type de retour de l'opération « relancer » ?</li><li>Quel symbole représente la visibilité package ?</li></ol>",
    "starter": "# Exercice — La classe Adhérent de la médiathèque de Clavières\n# Lisez l'énoncé complet ci-dessus, puis répondez à chaque question dans son bloc.\n# Pour les questions 3 et 6, répondez par le seul symbole (+, -, # ou ~).\n\n[Question 1 — Nombre d'attributs de la classe]\nA_COMPLETER\n\n[Question 2 — Nom de l'attribut privé]\nA_COMPLETER\n\n[Question 3 — Symbole de la visibilité protégée]\nA_COMPLETER\n\n[Question 4 — Nombre de paramètres de « emprunter »]\nA_COMPLETER\n\n[Question 5 — Type de retour de « relancer »]\nA_COMPLETER\n\n[Question 6 — Symbole de la visibilité package]\nA_COMPLETER\n",
    "hints": [
      "La carte d'une classe comporte trois compartiments : le nom, les attributs (sans parenthèses) et les opérations (avec parenthèses).",
      "Le symbole de visibilité ouvre chaque ligne : + public, - privé, # protégé, ~ package ; le type suit les deux-points.",
      "Comptez d'abord les lignes sans parenthèses (attributs), isolez celle qui commence par le tiret, puis examinez les parenthèses de « emprunter » pour compter les paramètres séparés par des virgules."
    ],
    "examples": [
      {
        "stdin": "La société de nettoyage Brillance modélise sa classe Chambre :\n- superficie : Double\n+ etage : Integer\n~ statut : String\n# attribuer(agent : Agent) : Void\n+ nettoyer() : Boolean\n\n1) La classe compte 3 attributs : superficie, etage, statut.\n2) L'unique attribut privé est superficie.\n3) La classe compte 2 opérations : attribuer et nettoyer.\n4) « attribuer » possède 1 paramètre (agent : Agent).\n5) Le type de retour de « nettoyer » est Boolean.\n6) La visibilité protégée se note #.",
        "expected": "3 attributs — privé : superficie — 2 opérations — attribuer : 1 paramètre — Boolean — protégé : #",
        "note": "Les parenthèses distinguent l'opération de l'attribut ; le type de retour figure après les deux-points finals."
      }
    ],
    "tests": [
      {
        "label": "Question 1 — Nombre d'attributs de la classe",
        "stdin": "q:1",
        "expected": "3"
      },
      {
        "label": "Question 2 — Nom de l'attribut privé",
        "stdin": "q:2",
        "expected": "numero||numéro||le numero||le numéro"
      },
      {
        "label": "Question 3 — Symbole de la visibilité protégée",
        "stdin": "q:3",
        "expected": "#||protege||protégé"
      },
      {
        "label": "Question 4 — Nombre de paramètres de « emprunter »",
        "stdin": "q:4",
        "expected": "2"
      },
      {
        "label": "Question 5 — Type de retour de « relancer »",
        "stdin": "q:5",
        "expected": "Void||void"
      },
      {
        "label": "Question 6 — Symbole de la visibilité package",
        "stdin": "q:6",
        "expected": "~"
      }
    ],
    "solution": "[Question 1 — Nombre d'attributs de la classe]\n3\n\n[Question 2 — Nom de l'attribut privé]\nnumero\n\n[Question 3 — Symbole de la visibilité protégée]\nprotege\n\n[Question 4 — Nombre de paramètres de « emprunter »]\n2\n\n[Question 5 — Type de retour de « relancer »]\nVoid\n\n[Question 6 — Symbole de la visibilité package]\n~",
    "takeaway": "1) La classe compte 3 attributs : numero, nom, dateInscription.\n2) L'unique attribut privé est numero (précédé du tiret -).\n3) La visibilité protégée se note #.\n4) « emprunter(ouvrage : Ouvrage, jours : Integer) » possède 2 paramètres : ouvrage et jours.\n5) Le type de retour de « relancer » est Void.\n6) La visibilité package se note ~.\nContrôle : 3 attributs + 2 opérations = 5 membres au total dans la carte de la classe."
  },
  {
    "id": "um2-c3-e2",
    "chapter": 3,
    "level": "n2",
    "language": "analyse",
    "title": "Les multiplicités de l'agence immobilière Toit & Clef",
    "exampleTitle": "Exemple résolu — les multiplicités de l'auto-école AutoPlus",
    "goal": "Lire des multiplicités d'associations et vérifier ce qu'elles autorisent ou interdisent.",
    "brief": "<p><strong>Énoncé.</strong> L'agence immobilière « Toit &amp; Clef » modélise ses visites. Les associations entre les classes <code>Client</code>, <code>Bien</code>, <code>Visite</code>, <code>Agent</code> et <code>Mandat</code> sont résumées ci-dessous :</p><table><tr><th>Association</th><th>Lecture des multiplicités</th></tr><tr><td>Client — Visite</td><td>Un client passe 0..* visites ; chaque visite est passée par exactement 1 client.</td></tr><tr><td>Bien — Visite</td><td>Un bien est concerné par 0..* visites ; chaque visite concerne exactement 1 bien.</td></tr><tr><td>Agent — Visite</td><td>Un agent conduit 0..* visites ; chaque visite est conduite par exactement 1 agent.</td></tr><tr><td>Mandat — Bien</td><td>Un mandat porte sur 1..* biens ; chaque bien est couvert par exactement 1 mandat.</td></tr></table><p>Rappel : « 0..* » se lit « zéro ou plusieurs », « 1 » se lit « exactement un », « 1..* » se lit « au moins un ». Répondez par oui/non, un nombre, ou la multiplicité au format UML (par exemple 0..1).</p><ol><li>Un bien jamais visité est-il autorisé par l'association Bien — Visite ?</li><li>Une visite peut-elle concerner deux biens à la fois ?</li><li>Combien d'agents conduisent une visite donnée ?</li><li>Combien de biens, au minimum, un mandat doit-il porter ?</li><li>Un bien peut-il être couvert par deux mandats différents ?</li><li>Quelle est la multiplicité côté Visite de l'association Client — Visite (combien de visites un client peut-il passer) ?</li></ol>",
    "starter": "# Exercice — Les multiplicités de l'agence immobilière Toit & Clef\n# Lisez l'énoncé complet ci-dessus, puis répondez à chaque question dans son bloc.\n# Les questions fermées se répondent par oui ou non ; la question 6 attend le format UML (ex. 0..1).\n\n[Question 1 — Un bien jamais visité est-il autorisé ?]\nA_COMPLETER\n\n[Question 2 — Une visite peut-elle concerner deux biens ?]\nA_COMPLETER\n\n[Question 3 — Nombre d'agents par visite]\nA_COMPLETER\n\n[Question 4 — Nombre minimal de biens par mandat]\nA_COMPLETER\n\n[Question 5 — Un bien peut-il avoir deux mandats ?]\nA_COMPLETER\n\n[Question 6 — Multiplicité côté Visite de Client — Visite]\nA_COMPLETER\n",
    "hints": [
      "Une multiplicité indique combien d'instances de l'autre classe peuvent être reliées à une instance donnée : lisez-la du côté où elle est écrite.",
      "0..* autorise l'absence totale de lien ; 1 impose exactement un lien ; 1..* impose au moins un lien.",
      "Pour chaque question, placez-vous du côté de la classe concernée (le bien, la visite, le mandat) et relisez la multiplicité qui la concerne dans le tableau."
    ],
    "examples": [
      {
        "stdin": "L'auto-école AutoPlus modélise ses leçons :\nUn élève prend 0..* leçons ; chaque leçon est suivie par exactement 1 élève.\nUn moniteur donne 1..* leçons ; chaque leçon est donnée par exactement 1 moniteur.\nUn véhicule sert à 0..* leçons ; chaque leçon utilise exactement 1 véhicule.\n\n1) Un moniteur ne peut pas être sans leçon : 1..* impose au moins une leçon.\n2) Une leçon utilise exactement 1 véhicule : jamais deux.\n3) Un élève sans leçon est autorisé : 0..* accepte zéro.\n4) La multiplicité côté Leçon de l'association Élève — Leçon est 0..*.",
        "expected": "moniteur : au moins 1 leçon (1..*) — 1 véhicule par leçon — élève sans leçon autorisé — multiplicité 0..*",
        "note": "Le sens d'une multiplicité dépend du côté où l'on se place : 0..* côté Leçon concerne le nombre de leçons d'un élève."
      }
    ],
    "tests": [
      {
        "label": "Question 1 — Un bien jamais visité est-il autorisé ?",
        "stdin": "q:1",
        "expected": "oui"
      },
      {
        "label": "Question 2 — Une visite peut-elle concerner deux biens ?",
        "stdin": "q:2",
        "expected": "non"
      },
      {
        "label": "Question 3 — Nombre d'agents par visite",
        "stdin": "q:3",
        "expected": "1"
      },
      {
        "label": "Question 4 — Nombre minimal de biens par mandat",
        "stdin": "q:4",
        "expected": "1"
      },
      {
        "label": "Question 5 — Un bien peut-il avoir deux mandats ?",
        "stdin": "q:5",
        "expected": "non"
      },
      {
        "label": "Question 6 — Multiplicité côté Visite de Client — Visite",
        "stdin": "q:6",
        "expected": "0..*||*"
      }
    ],
    "solution": "[Question 1 — Un bien jamais visité est-il autorisé ?]\noui\n\n[Question 2 — Une visite peut-elle concerner deux biens ?]\nnon\n\n[Question 3 — Nombre d'agents par visite]\n1\n\n[Question 4 — Nombre minimal de biens par mandat]\n1\n\n[Question 5 — Un bien peut-il avoir deux mandats ?]\nnon\n\n[Question 6 — Multiplicité côté Visite de Client — Visite]\n0..*",
    "takeaway": "1) Oui : côté Bien, la multiplicité 0..* autorise un bien sans aucune visite.\n2) Non : chaque visite concerne exactement 1 bien (multiplicité 1 côté Bien).\n3) Exactement 1 agent conduit chaque visite.\n4) Un mandat porte sur 1..* biens : au minimum 1 bien.\n5) Non : chaque bien est couvert par exactement 1 mandat.\n6) Un client peut passer 0..* visites : la multiplicité côté Visite est 0..*.\nContrôle : une visite relie 1 client, 1 bien et 1 agent ; un mandat regroupe 1 à plusieurs biens, chaque bien relevant d'un seul mandat."
  },
  {
    "id": "um2-c3-e3",
    "chapter": 3,
    "level": "n3",
    "language": "analyse",
    "title": "Composition et agrégation dans la plateforme Melodix",
    "exampleTitle": "Exemple résolu — le garage PneusPlus",
    "goal": "Trancher entre composition et agrégation à partir du cycle de vie des composants.",
    "brief": "<p><strong>Énoncé.</strong> La plateforme de streaming Melodix modélise trois relations à partir de ses classes <code>Album</code>, <code>Piste</code>, <code>Playlist</code>, <code>Compte</code> et <code>Profil</code> :</p><ul><li><strong>Relation 1 (Album — Piste)</strong> : chaque piste appartient à un seul album ; si l'album est supprimé, ses pistes disparaissent avec lui ;</li><li><strong>Relation 2 (Playlist — Piste)</strong> : une même piste peut figurer dans plusieurs playlists ; supprimer une playlist ne supprime pas la piste ;</li><li><strong>Relation 3 (Compte — Profil)</strong> : chaque compte possède exactement un profil, détruit en même temps que lui.</li></ul><p>Rappel : la composition (losange plein) lie des composants qui partagent le cycle de vie du composite ; l'agrégation (losange vide) relie des éléments capables de survivre à leur agrégat. Répondez par composition ou agrégation, oui ou non, un nombre, ou le symbole demandé.</p><ol><li>La relation 1 (Album — Piste) est-elle une composition ou une agrégation ?</li><li>Si une playlist est supprimée, la piste survit-elle ?</li><li>Combien d'albums peuvent partager une même piste dans la relation 1 ?</li><li>La relation 2 (Playlist — Piste) est-elle une composition ou une agrégation ?</li><li>Quel symbole représente la composition : losange plein ou losange vide ?</li><li>La relation 3 (Compte — Profil) est-elle une composition ou une agrégation ?</li></ol>",
    "starter": "# Exercice — Composition et agrégation dans la plateforme Melodix\n# Lisez l'énoncé complet ci-dessus, puis répondez à chaque question dans son bloc.\n# Les questions fermées se répondent par oui ou non.\n\n[Question 1 — Type de la relation 1 (Album — Piste)]\nA_COMPLETER\n\n[Question 2 — La piste survit-elle à la playlist ?]\nA_COMPLETER\n\n[Question 3 — Nombre d'albums par piste dans la relation 1]\nA_COMPLETER\n\n[Question 4 — Type de la relation 2 (Playlist — Piste)]\nA_COMPLETER\n\n[Question 5 — Symbole de la composition]\nA_COMPLETER\n\n[Question 6 — Type de la relation 3 (Compte — Profil)]\nA_COMPLETER\n",
    "hints": [
      "La question clé est celle du cycle de vie : le composant disparaît-il avec son conteneur (composition) ou peut-il lui survivre (agrégation) ?",
      "Un composant de composition n'appartient qu'à un seul composite à la fois ; un élément d'agrégation peut être partagé entre plusieurs agrégats.",
      "Pour chaque relation, appliquez le test de suppression du conteneur, puis traduisez la conclusion en symbole UML (losange plein ou vide)."
    ],
    "examples": [
      {
        "stdin": "Le garage PneusPlus modélise deux relations :\nRelation 1 (Voiture — Roue) : chaque roue d'origine appartient à une seule voiture et part à la casse avec elle.\nRelation 2 (Équipe — Mécanicien) : un mécanicien peut changer d'équipe ; dissoudre une équipe ne licencie personne.\n\n1) Voiture — Roue : la roue disparaît avec la voiture, c'est une composition.\n2) Équipe dissoute : les mécaniciens survivent.\n3) Une roue d'origine appartient à exactement 1 voiture.\n4) La composition se représente par un losange plein.\n5) Équipe — Mécanicien : les mécaniciens survivent à l'équipe, c'est une agrégation.",
        "expected": "Voiture — Roue : composition — mécaniciens survivent à l'équipe — 1 voiture par roue — composition : losange plein — Équipe — Mécanicien : agrégation",
        "note": "Le test de suppression du conteneur tranche : destruction en cascade pour la composition, survie des éléments pour l'agrégation."
      }
    ],
    "tests": [
      {
        "label": "Question 1 — Type de la relation 1 (Album — Piste)",
        "stdin": "q:1",
        "expected": "composition"
      },
      {
        "label": "Question 2 — La piste survit-elle à la playlist ?",
        "stdin": "q:2",
        "expected": "oui"
      },
      {
        "label": "Question 3 — Nombre d'albums par piste dans la relation 1",
        "stdin": "q:3",
        "expected": "1"
      },
      {
        "label": "Question 4 — Type de la relation 2 (Playlist — Piste)",
        "stdin": "q:4",
        "expected": "agregation||agrégation"
      },
      {
        "label": "Question 5 — Symbole de la composition",
        "stdin": "q:5",
        "expected": "losange plein||un losange plein||le losange plein"
      },
      {
        "label": "Question 6 — Type de la relation 3 (Compte — Profil)",
        "stdin": "q:6",
        "expected": "composition"
      }
    ],
    "solution": "[Question 1 — Type de la relation 1 (Album — Piste)]\ncomposition\n\n[Question 2 — La piste survit-elle à la playlist ?]\noui\n\n[Question 3 — Nombre d'albums par piste dans la relation 1]\n1\n\n[Question 4 — Type de la relation 2 (Playlist — Piste)]\nagregation\n\n[Question 5 — Symbole de la composition]\nlosange plein\n\n[Question 6 — Type de la relation 3 (Compte — Profil)]\ncomposition",
    "takeaway": "1) Relation 1 : les pistes disparaissent avec l'album, cycle de vie partagé : composition.\n2) Oui : la piste survit à la suppression de la playlist.\n3) Chaque piste appartient à un seul album : 1 album par piste.\n4) Relation 2 : la piste survit à la playlist : agrégation.\n5) La composition se représente par un losange plein (l'agrégation par un losange vide).\n6) Relation 3 : le profil est détruit avec le compte : composition.\nContrôle : deux compositions (Album — Piste, Compte — Profil) pour une agrégation (Playlist — Piste) ; seule la piste partagée échappe au cycle de vie de son conteneur."
  }
];

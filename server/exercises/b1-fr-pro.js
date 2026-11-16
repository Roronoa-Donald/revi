/**
 * Exercices mis à jour — remédiation pédagogique
 */
'use strict';

module.exports = [
  {
    "id": "fr-c1-e1",
    "chapter": 1,
    "level": "n1",
    "language": "analyse",
    "title": "L'accueil des visiteurs au salon des métiers",
    "exampleTitle": "Exemple résolu — l'animation du stand de la boulangerie",
    "goal": "Classer les signaux d'une situation d'accueil selon les trois canaux de Mehrabian : verbal, para-verbal, non-verbal.",
    "brief": "<p><strong>Énoncé.</strong> Amélie, assistante commerciale de l'entreprise Argos, accueille les visiteurs sur le stand de l'entreprise au salon des métiers de Lyon. Sa responsable observe la scène pendant dix minutes et note cinq signaux, numérotés ci-dessous :</p><table><tr><th>N°</th><th>Signal observé sur Amélie</th></tr><tr><td>1</td><td>Elle choisit le vocabulaire technique exact pour présenter les logiciels de gestion</td></tr><tr><td>2</td><td>Elle articule lentement et module le volume de sa voix</td></tr><tr><td>3</td><td>Elle serre la main de chaque visiteur et le regarde dans les yeux</td></tr><tr><td>4</td><td>Elle porte une tenue de bureau impeccable et un badge bien visible</td></tr><tr><td>5</td><td>Elle annonce les tarifs avec les mots justes, sans détour</td></tr></table><ol><li>À quel canal de Mehrabian appartient le signal n° 1 ?</li><li>À quel canal appartient le signal n° 2 ?</li><li>À quel canal appartient le signal n° 3 ?</li><li>À quel canal appartient le signal n° 4 ?</li><li>À quel canal appartient le signal n° 5 ?</li><li>Quand les mots d'Amélie contredisent son attitude, que croit l'auditoire selon la théorie de Mehrabian : les mots ou le corps ?</li></ol><p>Pour les questions 1 à 5, répondez par un seul des trois mots <code>verbal</code>, <code>para-verbal</code> ou <code>non-verbal</code> (le trait d'union est facultatif) ; pour la question 6, par <code>les mots</code> ou <code>le corps</code>. Écrivez en minuscules, sans ponctuation finale.</p>",
    "starter": "# Exercice — L'accueil des visiteurs au salon des métiers\n# Lisez l'énoncé complet ci-dessus, puis répondez à chaque question dans son bloc.\n# Une seule réponse par bloc, en minuscules, sans ponctuation finale.\n\n[Question 1 — Canal du signal n° 1]\nA_COMPLETER\n\n[Question 2 — Canal du signal n° 2]\nA_COMPLETER\n\n[Question 3 — Canal du signal n° 3]\nA_COMPLETER\n\n[Question 4 — Canal du signal n° 4]\nA_COMPLETER\n\n[Question 5 — Canal du signal n° 5]\nA_COMPLETER\n\n[Question 6 — Ce que croit l'auditoire]\nA_COMPLETER\n",
    "hints": [
      "Mehrabian distingue trois canaux : le verbal (les mots prononcés, le lexique), le para-verbal (la voix : rythme, intonation, articulation, volume) et le non-verbal (gestuelle, regard, tenue, espace).",
      "Pour chaque signal, demandez-vous si l'information tient dans le choix des mots, dans la manière de les prononcer, ou dans une attitude physique qui se passe de paroles.",
      "Contrôlez la répartition de votre classement : deux signaux portent sur les mots, un seul sur la voix, deux sur le corps. Concluez avec la règle du cours sur la contradiction entre le verbe et le corps."
    ],
    "examples": [
      {
        "stdin": "Un boulanger anime un stand au marché du village. Trois signaux observés :\n1) « Il présente son pain au levain avec les mots exacts » → verbal (les mots).\n2) « Il crie les prix, très fort » → para-verbal (le volume de la voix).\n3) « Il porte un tablier propre et serre les mains » → non-verbal (la tenue, le geste).\nEt quand il assure « je ne suis pas fatigué » en baissant les bras, la clientèle croit le corps.",
        "expected": "verbal — para-verbal — non-verbal — l'auditoire croit le corps",
        "note": "Les trois canaux de Mehrabian fonctionnent ensemble : les mots, la voix, le corps — et le corps l'emporte en cas de contradiction."
      }
    ],
    "tests": [
      {
        "label": "Question 1 — Canal du signal n° 1",
        "stdin": "q:1",
        "expected": "verbal"
      },
      {
        "label": "Question 2 — Canal du signal n° 2",
        "stdin": "q:2",
        "expected": "para-verbal||paraverbal"
      },
      {
        "label": "Question 3 — Canal du signal n° 3",
        "stdin": "q:3",
        "expected": "non-verbal||nonverbal"
      },
      {
        "label": "Question 4 — Canal du signal n° 4",
        "stdin": "q:4",
        "expected": "non-verbal||nonverbal"
      },
      {
        "label": "Question 5 — Canal du signal n° 5",
        "stdin": "q:5",
        "expected": "verbal"
      },
      {
        "label": "Question 6 — Ce que croit l'auditoire",
        "stdin": "q:6",
        "expected": "le corps||corps"
      }
    ],
    "solution": "[Question 1 — Canal du signal n° 1]\nverbal\n\n[Question 2 — Canal du signal n° 2]\npara-verbal\n\n[Question 3 — Canal du signal n° 3]\nnon-verbal\n\n[Question 4 — Canal du signal n° 4]\nnon-verbal\n\n[Question 5 — Canal du signal n° 5]\nverbal\n\n[Question 6 — Ce que croit l'auditoire]\nle corps",
    "takeaway": "1) Le signal n° 1 porte sur le choix du vocabulaire technique : c'est le canal verbal.\n2) Le signal n° 2 porte sur l'articulation et le volume : c'est le canal para-verbal (la voix).\n3) Le signal n° 3 porte sur la poignée de main et le regard : c'est le canal non-verbal (le corps).\n4) Le signal n° 4 porte sur la tenue vestimentaire et le badge : c'est le canal non-verbal.\n5) Le signal n° 5 porte sur les mots justes choisis pour annoncer les tarifs : c'est le canal verbal.\n6) Selon Mehrabian, quand le verbe et le corps se contredisent, l'auditoire croit le corps : Amélie sera jugée sur son attitude autant que sur son discours.\nContrôle : les cinq signaux se répartissent en deux verbaux (n° 1 et 5), un para-verbal (n° 2) et deux non-verbaux (n° 3 et 4)."
  },
  {
    "id": "fr-c1-e2",
    "chapter": 1,
    "level": "n2",
    "language": "analyse",
    "title": "Le discours de lancement du logiciel",
    "exampleTitle": "Exemple résolu — le discours d'ouverture de l'atelier de céramique",
    "goal": "Reconnaître les trois ressorts d'Aristote (logos, pathos, éthos) dans un discours de lancement et nommer la visée d'un message professionnel.",
    "brief": "<p><strong>Énoncé.</strong> Le directeur commercial de Novatek prépare le discours de lancement d'un nouveau logiciel de gestion. Il relit son brouillon à voix haute devant son équipe. Quatre extraits sont numérotés :</p><table><tr><th>N°</th><th>Extrait du discours</th></tr><tr><td>1</td><td>« Nos ventes ont progressé de 12 % ce trimestre : les chiffres sont là, la démonstration est faite. »</td></tr><tr><td>2</td><td>« Pensez aux équipes du support, qui ont répondu à 1 200 appels, nuit et jour, pour vous. »</td></tr><tr><td>3</td><td>« Voilà vingt ans que je lance des produits sur ce marché, et j'en connais chaque virage. »</td></tr><tr><td>4</td><td>« Mesdames, Messieurs, commandez la version complète dès aujourd'hui. »</td></tr></table><ol><li>Quel ressort d'Aristote l'extrait n° 1 mobilise-t-il ?</li><li>Quel ressort l'extrait n° 2 mobilise-t-il ?</li><li>Quel ressort l'extrait n° 3 mobilise-t-il ?</li><li>Quel est le ressort d'Aristote qui repose sur la crédibilité de l'orateur ?</li><li>« Convaincre, séduire, influencer, ordonner » : quelle visée de la communication ces verbes illustrent-ils ?</li></ol><p>Pour les questions 1 à 4, répondez par le mot exact <code>logos</code>, <code>pathos</code> ou <code>éthos</code> ; pour la question 5, par une courte locution. Écrivez en minuscules, sans ponctuation finale.</p>",
    "starter": "# Exercice — Le discours de lancement du logiciel\n# Lisez l'énoncé complet ci-dessus, puis répondez à chaque question dans son bloc.\n# Une seule réponse par bloc, en minuscules, sans ponctuation finale.\n\n[Question 1 — Ressort de l'extrait n° 1]\nA_COMPLETER\n\n[Question 2 — Ressort de l'extrait n° 2]\nA_COMPLETER\n\n[Question 3 — Ressort de l'extrait n° 3]\nA_COMPLETER\n\n[Question 4 — Le ressort de la crédibilité]\nA_COMPLETER\n\n[Question 5 — Visée des verbes convaincre, ordonner]\nA_COMPLETER\n",
    "hints": [
      "Aristote décompose la persuasion en trois ressorts : le logos (la raison : arguments, chiffres, démonstration), le pathos (les émotions de l'auditoire) et l'éthos (la crédibilité de l'orateur).",
      "Pour chaque extrait, cherchez ce qui fait la force du propos : un raisonnement appuyé sur des chiffres, une émotion partagée, ou une autorité personnelle.",
      "L'extrait n° 3 s'appuie sur l'expérience du directeur lui-même ; l'extrait n° 4 fait agir l'auditoire. Concluez en nommant la visée du cours qui couvre convaincre, séduire, influencer et ordonner."
    ],
    "examples": [
      {
        "stdin": "Une céramiste ouvre son atelier au public. Trois extraits de son discours :\n1) « J'ai formé 200 apprentis en dix ans » → éthos (sa crédibilité d'artisan).\n2) « Rappelez-vous votre première céramique, ces mains pleines d'argile » → pathos (l'émotion).\n3) « Voici le plan de financement en trois tableaux, le calcul est vérifiable » → logos (la démonstration).\nEt « séduire le visiteur pour qu'il revienne » relève de l'action sur autrui.",
        "expected": "éthos — pathos — logos — action sur autrui",
        "note": "Logos raisonne, pathos émeut, éthos crédibilise : un discours équilibré fait parler les trois ressorts."
      }
    ],
    "tests": [
      {
        "label": "Question 1 — Ressort de l'extrait n° 1",
        "stdin": "q:1",
        "expected": "logos"
      },
      {
        "label": "Question 2 — Ressort de l'extrait n° 2",
        "stdin": "q:2",
        "expected": "pathos"
      },
      {
        "label": "Question 3 — Ressort de l'extrait n° 3",
        "stdin": "q:3",
        "expected": "éthos||ethos"
      },
      {
        "label": "Question 4 — Le ressort de la crédibilité",
        "stdin": "q:4",
        "expected": "éthos||ethos"
      },
      {
        "label": "Question 5 — Visée des verbes convaincre, ordonner",
        "stdin": "q:5",
        "expected": "l'action sur autrui||action sur autrui||agir sur autrui"
      }
    ],
    "solution": "[Question 1 — Ressort de l'extrait n° 1]\nlogos\n\n[Question 2 — Ressort de l'extrait n° 2]\npathos\n\n[Question 3 — Ressort de l'extrait n° 3]\néthos\n\n[Question 4 — Le ressort de la crédibilité]\néthos\n\n[Question 5 — Visée des verbes convaincre, ordonner]\nl'action sur autrui",
    "takeaway": "1) L'extrait n° 1 avance des chiffres et une démonstration : c'est le logos (la raison).\n2) L'extrait n° 2 touche l'émotion de l'auditoire (le dévouement des équipes) : c'est le pathos.\n3) L'extrait n° 3 s'appuie sur l'expérience et la crédibilité personnelle du directeur : c'est l'éthos.\n4) Le ressort qui repose sur la crédibilité de l'orateur est l'éthos.\n5) Convaincre, séduire, influencer, ordonner : c'est la visée d'action sur autrui de la communication (à côté de l'expression et de la représentation).\nContrôle : les trois ressorts d'Aristote apparaissent chacun une fois dans les extraits 1 à 3 ; l'extrait n° 4 illustre l'action sur autrui."
  },
  {
    "id": "fr-c1-e3",
    "chapter": 1,
    "level": "n3",
    "language": "analyse",
    "title": "Le compte rendu de la réunion client",
    "exampleTitle": "Exemple résolu — la note de la réunion de service",
    "goal": "Nommer les champs de la communication, les fonctions du langage et décoder l'implicite d'un message professionnel.",
    "brief": "<p><strong>Énoncé.</strong> Mme Barry, cheffe de projet, et son assistant rédigent le compte rendu de la réunion de préparation avec un client. Six passages de leurs échanges et de leurs notes sont numérotés :</p><table><tr><th>N°</th><th>Passage observé</th></tr><tr><td>1</td><td>Avant la réunion, Mme Barry répète son argumentaire, seule, dans son bureau</td></tr><tr><td>2</td><td>En ouvrant la visioconférence, l'assistant demande : « Allô ? Vous m'entendez bien ? »</td></tr><tr><td>3</td><td>Le client a déclaré : « Il fait très chaud dans cette salle. » — il attendait qu'on ouvre la fenêtre</td></tr><tr><td>4</td><td>Le compte rendu note : « Merci d'envoyer le devis avant vendredi. »</td></tr><tr><td>5</td><td>Le compte rendu précise que le mot « devis » (prix proposé) ne signifie pas « devise » (monnaie)</td></tr><tr><td>6</td><td>La réunion elle-même : huit collaborateurs autour de la table qui préparent la réponse à l'appel d'offres</td></tr></table><ol><li>Passage n° 1 : à quel champ de la communication appartient ce dialogue intérieur ?</li><li>Passage n° 2 : quelle fonction du langage l'assistant exerce-t-il en vérifiant le contact ?</li><li>Passage n° 3 : le message du client était-il explicite ou implicite ?</li><li>Passage n° 4 : quelle fonction du langage oriente le message vers le destinataire pour le faire agir ?</li><li>Passage n° 5 : quelle fonction du langage parle de la langue avec la langue ?</li><li>Passage n° 6 : à quel champ appartient cette réunion de travail à huit personnes ?</li></ol><p>Répondez par le terme exact du cours (une locution courte au plus). Écrivez en minuscules, sans ponctuation finale.</p>",
    "starter": "# Exercice — Le compte rendu de la réunion client\n# Lisez l'énoncé complet ci-dessus, puis répondez à chaque question dans son bloc.\n# Une seule réponse par bloc, en minuscules, sans ponctuation finale.\n\n[Question 1 — Champ du passage n° 1]\nA_COMPLETER\n\n[Question 2 — Fonction du langage du passage n° 2]\nA_COMPLETER\n\n[Question 3 — Message du client (explicite ou implicite)]\nA_COMPLETER\n\n[Question 4 — Fonction du langage du passage n° 4]\nA_COMPLETER\n\n[Question 5 — Fonction du langage du passage n° 5]\nA_COMPLETER\n\n[Question 6 — Champ du passage n° 6]\nA_COMPLETER\n",
    "hints": [
      "Les quatre champs vont du plus intime au plus large : intrapersonnelle (soi), interpersonnelle (deux), petit groupe, publique. Les six fonctions du langage comptent référentielle, expressive, conative, poétique, phatique et métalinguistique.",
      "La fonction phatique ne transmet aucune information : elle établit et maintient le contact. La fonction conative vise à faire agir le destinataire ; la métalinguistique parle de la langue elle-même.",
      "Pour le passage n° 3, séparez le dit (« il fait chaud ») du voulu (ouvrir la fenêtre) : c'est la marque de l'implicite. Pour le passage n° 6, comptez les participants autour de la table."
    ],
    "examples": [
      {
        "stdin": "Note d'une autre réunion de service :\n1) L'assistante répète sa présentation seule chez elle → communication intrapersonnelle.\n2) « Allô, vous m'entendez ? » en début d'appel → fonction phatique (le contact).\n3) « Il est déjà 18 heures passées » → implicite : elle voudrait rentrer.\n4) « Le mot « lot » désigne un ensemble de produits » → fonction métalinguistique.",
        "expected": "intrapersonnelle — phatique — implicite — métalinguistique",
        "note": "Le dit n'est pas le voulu : décoder l'implicite et nommer la fonction, c'est lire le message en profondeur."
      }
    ],
    "tests": [
      {
        "label": "Question 1 — Champ du passage n° 1",
        "stdin": "q:1",
        "expected": "intrapersonnelle||intrapersonnel||la communication intrapersonnelle"
      },
      {
        "label": "Question 2 — Fonction du langage du passage n° 2",
        "stdin": "q:2",
        "expected": "phatique||la fonction phatique"
      },
      {
        "label": "Question 3 — Message du client (explicite ou implicite)",
        "stdin": "q:3",
        "expected": "implicite"
      },
      {
        "label": "Question 4 — Fonction du langage du passage n° 4",
        "stdin": "q:4",
        "expected": "conative||conatif||la fonction conative"
      },
      {
        "label": "Question 5 — Fonction du langage du passage n° 5",
        "stdin": "q:5",
        "expected": "métalinguistique||metalinguistique||la fonction métalinguistique"
      },
      {
        "label": "Question 6 — Champ du passage n° 6",
        "stdin": "q:6",
        "expected": "petit groupe||en petit groupe||la communication en petit groupe"
      }
    ],
    "solution": "[Question 1 — Champ du passage n° 1]\nintrapersonnelle\n\n[Question 2 — Fonction du langage du passage n° 2]\nphatique\n\n[Question 3 — Message du client (explicite ou implicite)]\nimplicite\n\n[Question 4 — Fonction du langage du passage n° 4]\nconative\n\n[Question 5 — Fonction du langage du passage n° 5]\nmétalinguistique\n\n[Question 6 — Champ du passage n° 6]\npetit groupe",
    "takeaway": "1) Répéter son argumentaire seul, pour soi, relève de la communication intrapersonnelle (penser, raisonner, se juger).\n2) « Allô ? Vous m'entendez bien ? » ne transmet aucune information : c'est la fonction phatique, qui établit et maintient le contact.\n3) Le client a dit « il fait chaud » et voulait l'ouverture de la fenêtre : le message était implicite (le dit ne coïncide pas avec le voulu).\n4) « Merci d'envoyer le devis avant vendredi » oriente le message vers le destinataire pour le faire agir : c'est la fonction conative.\n5) Préciser ce que signifie le mot « devis », c'est parler de la langue avec la langue : fonction métalinguistique.\n6) Huit collaborateurs autour d'une table qui résolvent un problème ensemble : c'est le champ de la communication en petit groupe.\nContrôle : les passages 1 et 6 relèvent des champs (intrapersonnelle, petit groupe) ; les passages 2, 4 et 5 des fonctions (phatique, conative, métalinguistique) ; le passage 3 illustre l'implicite."
  },
  {
    "id": "fr-c2-e1",
    "chapter": 2,
    "level": "n1",
    "language": "analyse",
    "title": "Le tweet trop familier de l'agence",
    "exampleTitle": "Exemple résolu — les annonces de la piscine municipale",
    "goal": "Classer des phrases professionnelles dans leur registre : familier, courant ou soutenu.",
    "brief": "<p><strong>Énoncé.</strong> L'agence web Zénith vient de signer un nouveau client. La community manager rédige un premier jet de tweet, puis échange avec son responsable sur la messagerie interne. Quatre phrases sont numérotées :</p><table><tr><th>N°</th><th>Phrase relevée</th><th>Où elle apparaît</th></tr><tr><td>1</td><td>« On s'est éclatés sur ce chantier, trop contents !!! »</td><td>brouillon du tweet</td></tr><tr><td>2</td><td>« Le chantier s'est très bien déroulé, merci à toutes les équipes. »</td><td>version retravaillée du tweet</td></tr><tr><td>3</td><td>« Nous nous réjouissons de cette collaboration fructueuse. »</td><td>communiqué de presse</td></tr><tr><td>4</td><td>« J'sais pas encore si je viens à la réunion de demain. »</td><td>messagerie interne</td></tr></table><ol><li>À quel registre appartient la phrase n° 1 ?</li><li>À quel registre appartient la phrase n° 2 ?</li><li>À quel registre appartient la phrase n° 3 ?</li><li>À quel registre appartient la phrase n° 4 ?</li><li>Quel registre la community manager doit-elle employer dans une lettre de motivation ?</li></ol><p>Répondez par un seul des trois mots <code>familier</code>, <code>courant</code> ou <code>soutenu</code>. Écrivez en minuscules, sans ponctuation finale.</p>",
    "starter": "# Exercice — Le tweet trop familier de l'agence\n# Lisez l'énoncé complet ci-dessus, puis répondez à chaque question dans son bloc.\n# Une seule réponse par bloc : familier, courant ou soutenu.\n\n[Question 1 — Registre de la phrase n° 1]\nA_COMPLETER\n\n[Question 2 — Registre de la phrase n° 2]\nA_COMPLETER\n\n[Question 3 — Registre de la phrase n° 3]\nA_COMPLETER\n\n[Question 4 — Registre de la phrase n° 4]\nA_COMPLETER\n\n[Question 5 — Registre d'une lettre de motivation]\nA_COMPLETER\n",
    "hints": [
      "Trois niveaux : le familier (oral relâché, argot, « ne » supprimé), le courant (usage standard de la presse, lexique usuel) et le soutenu (lexique précis et recherché).",
      "Cherchez les marques : points d'exclamation et expression imagée (« on s'est éclatés »), syntaxe neutre et respectée, ou lexique rare (« nous nous réjouissons », « fructueuse »).",
      "La phrase n° 4 tronque le « ne » de « je ne sais pas » : c'est une marque grammaticale du registre le plus relâché. Concluez avec le registre que le chapitre impose à toute lettre officielle."
    ],
    "examples": [
      {
        "stdin": "La piscine municipale affiche trois annonces :\n1) « Le bassin est fermé le lundi matin. » → courant (usage standard).\n2) « Le bassin sera inaccessible au public le lundi matin. » → soutenu (lexique précis).\n3) « Le bassin est pété le lundi matin. » → familier (argot).\nEt la lettre au maire, elle, exige le registre soutenu.",
        "expected": "courant — soutenu — familier — soutenu",
        "note": "Même information, trois niveaux : le registre se choisit selon le destinataire et le support, jamais au hasard."
      }
    ],
    "tests": [
      {
        "label": "Question 1 — Registre de la phrase n° 1",
        "stdin": "q:1",
        "expected": "familier"
      },
      {
        "label": "Question 2 — Registre de la phrase n° 2",
        "stdin": "q:2",
        "expected": "courant"
      },
      {
        "label": "Question 3 — Registre de la phrase n° 3",
        "stdin": "q:3",
        "expected": "soutenu"
      },
      {
        "label": "Question 4 — Registre de la phrase n° 4",
        "stdin": "q:4",
        "expected": "familier"
      },
      {
        "label": "Question 5 — Registre d'une lettre de motivation",
        "stdin": "q:5",
        "expected": "soutenu"
      }
    ],
    "solution": "[Question 1 — Registre de la phrase n° 1]\nfamilier\n\n[Question 2 — Registre de la phrase n° 2]\ncourant\n\n[Question 3 — Registre de la phrase n° 3]\nsoutenu\n\n[Question 4 — Registre de la phrase n° 4]\nfamilier\n\n[Question 5 — Registre d'une lettre de motivation]\nsoutenu",
    "takeaway": "1) « On s'est éclatés… trop contents !!! » : expression imagée, excès de points d'exclamation — registre familier.\n2) « Le chantier s'est très bien déroulé, merci à toutes les équipes » : lexique usuel, syntaxe respectée — registre courant (celui de la presse).\n3) « Nous nous réjouissons de cette collaboration fructueuse » : lexique précis et recherché — registre soutenu.\n4) « J'sais pas encore » : mot tronqué et « ne » supprimé — registre familier (la marque grammaticale compte autant que le lexique).\n5) Une lettre de motivation reste formelle : c'est le registre soutenu qui s'impose.\nContrôle : les quatre phrases se répartissent en deux familières (n° 1 et 4), une courante (n° 2) et une soutenue (n° 3)."
  },
  {
    "id": "fr-c2-e2",
    "chapter": 2,
    "level": "n2",
    "language": "analyse",
    "title": "Trois versions du même message",
    "exampleTitle": "Exemple résolu — autres trios du dictionnaire",
    "goal": "Compléter et interpréter les trios de synonymes du cours : un mot par registre (familier, courant, soutenu).",
    "brief": "<p><strong>Énoncé.</strong> Pour annoncer la même information à trois publics différents (un groupe d'amis, un tweet d'entreprise, un discours officiel), la community manager de l'agence Zénith révise les trios du dictionnaire. Le tableau donne les notions et, quand ils sont connus, les mots déjà trouvés :</p><table><tr><th>Notion</th><th>Familier</th><th>Courant</th><th>Soutenu</th></tr><tr><td>avoir froid</td><td>cailler</td><td>avoir très froid</td><td>?</td></tr><tr><td>manger</td><td>?</td><td>manger</td><td>se sustenter</td></tr><tr><td>regarder</td><td>zyeuter</td><td>regarder</td><td>?</td></tr><tr><td>dormir</td><td>?</td><td>dormir</td><td>s'assoupir</td></tr><tr><td>voiture</td><td>une bagnole</td><td>une voiture</td><td>?</td></tr><tr><td>la boue</td><td>la gadoue</td><td>la boue</td><td>?</td></tr></table><ol><li>Trio « avoir froid » : quel est le mot soutenu ?</li><li>Trio « manger » : quel est le mot familier ?</li><li>Trio « regarder » : quel est le mot soutenu ?</li><li>Trio « dormir » : quel est le mot familier ?</li><li>Trio « voiture » : quel est le mot soutenu ?</li><li>Trio « la boue » : quel est le mot familier ?</li></ol><p>Répondez par le mot exact du trio (l'article est facultatif pour les noms). Écrivez en minuscules, sans ponctuation finale.</p>",
    "starter": "# Exercice — Trois versions du même message\n# Lisez l'énoncé complet ci-dessus, puis répondez à chaque question dans son bloc.\n# Une seule réponse par bloc : le mot exact du trio, sans ponctuation finale.\n\n[Question 1 — Mot soutenu du trio avoir froid]\nA_COMPLETER\n\n[Question 2 — Mot familier du trio manger]\nA_COMPLETER\n\n[Question 3 — Mot soutenu du trio regarder]\nA_COMPLETER\n\n[Question 4 — Mot familier du trio dormir]\nA_COMPLETER\n\n[Question 5 — Mot soutenu du trio voiture]\nA_COMPLETER\n\n[Question 6 — Mot familier du trio la boue]\nA_COMPLETER\n",
    "hints": [
      "Chaque notion du cours possède son trio : trois mots de même sens, un par registre — familier, courant, soutenu.",
      "Le mot familier est imagé et sonore (il ferait rire dans un discours) ; le mot soutenu est précis et rare (il ferait hésiter dans une conversation).",
      "Reprenons le tableau ligne par ligne : chaque case manquante est soit l'extrémité familière, soit l'extrémité soutenue d'un trio. Vérifiez qu'aucun de vos six mots ne figure déjà dans une autre case."
    ],
    "examples": [
      {
        "stdin": "Autres trios du dictionnaire, autre extrait :\n1) Trio « homme » : un mec (familier), un homme (courant), un monsieur (soutenu).\n2) Trio « travail » : le boulot, le travail, le labeur.\n3) Trio « mourir » : il a cassé sa pipe, il est mort, il a trépassé.\n4) Trio « rosser » : rosser (familier), battre (courant), maltraiter (soutenu).",
        "expected": "un mec — un homme — un monsieur ; le boulot — le travail — le labeur ; casser sa pipe — mourir — trépasser ; rosser — battre — maltraiter",
        "note": "Le trio monte d'un cran à chaque ligne : familier = imagé, courant = partagé, soutenu = précis et rare."
      }
    ],
    "tests": [
      {
        "label": "Question 1 — Mot soutenu du trio avoir froid",
        "stdin": "q:1",
        "expected": "être mort de froid||etre mort de froid||mort de froid"
      },
      {
        "label": "Question 2 — Mot familier du trio manger",
        "stdin": "q:2",
        "expected": "bouffer"
      },
      {
        "label": "Question 3 — Mot soutenu du trio regarder",
        "stdin": "q:3",
        "expected": "considérer"
      },
      {
        "label": "Question 4 — Mot familier du trio dormir",
        "stdin": "q:4",
        "expected": "roupiller"
      },
      {
        "label": "Question 5 — Mot soutenu du trio voiture",
        "stdin": "q:5",
        "expected": "une automobile||automobile"
      },
      {
        "label": "Question 6 — Mot familier du trio la boue",
        "stdin": "q:6",
        "expected": "la gadoue||gadoue"
      }
    ],
    "solution": "[Question 1 — Mot soutenu du trio avoir froid]\nêtre mort de froid\n\n[Question 2 — Mot familier du trio manger]\nbouffer\n\n[Question 3 — Mot soutenu du trio regarder]\nconsidérer\n\n[Question 4 — Mot familier du trio dormir]\nroupiller\n\n[Question 5 — Mot soutenu du trio voiture]\nune automobile\n\n[Question 6 — Mot familier du trio la boue]\nla gadoue",
    "takeaway": "1) Trio « avoir froid » : cailler (familier), avoir très froid (courant), être mort de froid (soutenu).\n2) Trio « manger » : bouffer (familier), manger (courant), se sustenter (soutenu).\n3) Trio « regarder » : zyeuter (familier), regarder (courant), considérer (soutenu).\n4) Trio « dormir » : roupiller (familier), dormir (courant), s'assoupir (soutenu).\n5) Trio « voiture » : une bagnole (familier), une voiture (courant), une automobile (soutenu).\n6) Trio « la boue » : la gadoue (familier), la boue (courant), la vase (soutenu).\nContrôle : chaque réponse se vérifie par sa place dans le trio — si le mot fait rire, il est familier ; s'il fait hésiter, il est soutenu ; entre les deux, il est courant."
  },
  {
    "id": "fr-c2-e3",
    "chapter": 2,
    "level": "n3",
    "language": "analyse",
    "title": "La chasse aux verbes passe-partout",
    "exampleTitle": "Exemple résolu — le rapport du gardien de musée",
    "goal": "Remplacer les verbes passe-partout (donner, faire, avoir) par les verbes précis du cours dans un compte rendu professionnel.",
    "brief": "<p><strong>Énoncé.</strong> Mme Koffi, chargée de communication, relit le compte rendu du mois de son service : chaque phrase repose sur un verbe passe-partout (<code>donner</code>, <code>faire</code>, <code>avoir</code>) qui ne dit rien de précis. Six phrases sont numérotées :</p><table><tr><th>N°</th><th>Phrase du compte rendu</th><th>Verbe à remplacer</th></tr><tr><td>1</td><td>« Le tuteur a donné des conseils aux nouveaux arrivants. »</td><td>donner</td></tr><tr><td>2</td><td>« Le stagiaire a fait une erreur dans le tableau des stocks. »</td><td>faire</td></tr><tr><td>3</td><td>« L'auditeur a fait une enquête sur les ventes. »</td><td>faire</td></tr><tr><td>4</td><td>« La commune a deux mille habitants de plus. »</td><td>avoir</td></tr><tr><td>5</td><td>« Le gardien a les clés du local technique. »</td><td>avoir</td></tr><tr><td>6</td><td>« L'avocat a fait un procès au fournisseur défaillant. »</td><td>faire</td></tr></table><ol><li>Phrase n° 1 : quel verbe précis remplace « donné » (répondez par l'infinitif) ?</li><li>Phrase n° 2 : quel verbe précis remplace « fait » ?</li><li>Phrase n° 3 : quel verbe précis remplace « fait » ?</li><li>Phrase n° 4 : quel verbe précis remplace « a » ?</li><li>Phrase n° 5 : quel verbe précis remplace « a » ?</li><li>Phrase n° 6 : quel verbe précis remplace « fait » ?</li></ol><p>Répondez par le verbe exact du chapitre, à l'infinitif. Écrivez en minuscules, sans ponctuation finale.</p>",
    "starter": "# Exercice — La chasse aux verbes passe-partout\n# Lisez l'énoncé complet ci-dessus, puis répondez à chaque question dans son bloc.\n# Une seule réponse par bloc : le verbe précis à l'infinitif, sans ponctuation finale.\n\n[Question 1 — Verbe précis pour la phrase n° 1]\nA_COMPLETER\n\n[Question 2 — Verbe précis pour la phrase n° 2]\nA_COMPLETER\n\n[Question 3 — Verbe précis pour la phrase n° 3]\nA_COMPLETER\n\n[Question 4 — Verbe précis pour la phrase n° 4]\nA_COMPLETER\n\n[Question 5 — Verbe précis pour la phrase n° 5]\nA_COMPLETER\n\n[Question 6 — Verbe précis pour la phrase n° 6]\nA_COMPLETER\n",
    "hints": [
      "Les verbes passe-partout (donner, faire, avoir) valent partout et ne disent rien : le chapitre dresse une liste de remplacements pour chacun — commencez par repérer quel passe-partout traite chaque phrase.",
      "Le verbe juste est celui que le complément appelle : ce qui suit le verbe (des conseils, une erreur, une enquête, des habitants, des clés, un procès) n'accepte qu'un seul remplaçant de la liste sans changer de sens.",
      "Vérifiez chaque substitution en relisant la phrase complète : le verbe retenu doit nommer l'action exacte et se construire correctement avec son complément."
    ],
    "examples": [
      {
        "stdin": "Le rapport d'un gardien de musée, avant et après la chasse aux passe-partout :\n1) « donner un délai au visiteur » → accorder un délai.\n2) « faire un croquis du hall » → exécuter un croquis.\n3) « avoir un résultat positif » → obtenir un résultat.\n4) « faire un métier manuel » → exercer un métier.",
        "expected": "accorder — exécuter — obtenir — exercer",
        "note": "Donner, faire, avoir valent partout et ne disent rien : le verbe précis nomme l'action exacte."
      }
    ],
    "tests": [
      {
        "label": "Question 1 — Verbe précis pour la phrase n° 1",
        "stdin": "q:1",
        "expected": "prodiguer"
      },
      {
        "label": "Question 2 — Verbe précis pour la phrase n° 2",
        "stdin": "q:2",
        "expected": "commettre"
      },
      {
        "label": "Question 3 — Verbe précis pour la phrase n° 3",
        "stdin": "q:3",
        "expected": "procéder||procéder à||procéder a"
      },
      {
        "label": "Question 4 — Verbe précis pour la phrase n° 4",
        "stdin": "q:4",
        "expected": "compter"
      },
      {
        "label": "Question 5 — Verbe précis pour la phrase n° 5",
        "stdin": "q:5",
        "expected": "détenir"
      },
      {
        "label": "Question 6 — Verbe précis pour la phrase n° 6",
        "stdin": "q:6",
        "expected": "intenter"
      }
    ],
    "solution": "[Question 1 — Verbe précis pour la phrase n° 1]\nprodiguer\n\n[Question 2 — Verbe précis pour la phrase n° 2]\ncommettre\n\n[Question 3 — Verbe précis pour la phrase n° 3]\nprocéder\n\n[Question 4 — Verbe précis pour la phrase n° 4]\ncompter\n\n[Question 5 — Verbe précis pour la phrase n° 5]\ndétenir\n\n[Question 6 — Verbe précis pour la phrase n° 6]\nintenter",
    "takeaway": "1) « Le tuteur a prodigué des conseils aux nouveaux arrivants » : on prodigue des conseils.\n2) « Le stagiaire a commis une erreur dans le tableau des stocks » : on commet une erreur.\n3) « L'auditeur a procédé à une enquête sur les ventes » : on procède à une enquête.\n4) « La commune compte deux mille habitants de plus » : compter est le verbe exact des statistiques.\n5) « Le gardien détient les clés du local technique » : on détient les clés.\n6) « L'avocat a intenté un procès au fournisseur défaillant » : on intente un procès.\nContrôle : les six verbes retenus (prodiguer, commettre, procéder, compter, détenir, intenter) sortent tous des listes de remplacement du chapitre — aucun passe-partout ne subsiste."
  },
  {
    "id": "fr-c3-e1",
    "chapter": 3,
    "level": "n1",
    "language": "analyse",
    "title": "La première lettre du stagiaire",
    "exampleTitle": "Exemple résolu — le courrier d'un autre stagiaire",
    "goal": "Écrire une date professionnelle correcte, ponctuer « etc. » et abréger les titres à la française.",
    "brief": "<p><strong>Énoncé.</strong> Karim, stagiaire au service des achats de l'hôtel Belvédère, rédige sa première lettre officielle pour confirmer une commande de fournitures. Sa tutrice relit le courrier et note six points à corriger :</p><table><tr><th>N°</th><th>Point relevé dans la lettre</th></tr><tr><td>1</td><td>Karim a écrit : « Nous vous confirmons notre commande Mercredi 12 Juillet 2023. »</td></tr><tr><td>2</td><td>Il annonce : « Le service des achats travaille les jeudi. »</td></tr><tr><td>3</td><td>La liste des articles se termine par : « des ramettes de papier, des agrafes, etc… »</td></tr><tr><td>4</td><td>L'adresse commence par : « Mr Dupont, directeur de l'établissement »</td></tr><tr><td>5</td><td>La lettre mentionne le médecin du travail : « le Dr Lopez »</td></tr><tr><td>6</td><td>En bas de page, la même liste revient avec « etc. » en milieu de phrase</td></tr></table><ol><li>Point n° 1 : les noms de jours et de mois prennent-ils une majuscule en milieu de phrase ?</li><li>Point n° 2 : écrivez le mot correct : le service travaille les ___ (jeudi, au pluriel).</li><li>Point n° 3 : l'écriture « etc… » (avec points de suspension) est-elle correcte ?</li><li>Point n° 4 : quelle est l'abréviation française correcte de « Monsieur » ?</li><li>Point n° 5 : l'abréviation « Dr » est-elle correcte pour « Docteur » ?</li><li>Point n° 6 : « etc. » garde-t-il son point même en milieu de phrase ?</li></ol><p>Les questions fermées se répondent par <code>oui</code> ou <code>non</code> ; la question 2 par le mot au pluriel ; la question 4 par l'abréviation exacte. Écrivez en minuscules, sans ponctuation finale.</p>",
    "starter": "# Exercice — La première lettre du stagiaire\n# Lisez l'énoncé complet ci-dessus, puis répondez à chaque question dans son bloc.\n# Réponses courtes : oui/non, le mot exact, ou l'abréviation exacte.\n\n[Question 1 — Majuscule aux jours et mois]\nA_COMPLETER\n\n[Question 2 — Le pluriel de jeudi]\nA_COMPLETER\n\n[Question 3 — L'écriture « etc… »]\nA_COMPLETER\n\n[Question 4 — Abréviation de Monsieur]\nA_COMPLETER\n\n[Question 5 — L'abréviation Dr pour Docteur]\nA_COMPLETER\n\n[Question 6 — Le point de etc. en milieu de phrase]\nA_COMPLETER\n",
    "hints": [
      "Les noms des jours et des mois sont des noms communs : minuscule en milieu de phrase, et la marque du pluriel s'écrit quand on parle d'habitudes récurrentes.",
      "« Etc. » est l'abréviation de la locution latine « et cetera » : une abréviation, un point — le point reste même en milieu de phrase, et les points de suspension sont une erreur.",
      "Pour les titres abrégés, le français n'emprunte pas les formes anglaises : chaque titre (monsieur, docteur, professeur, maître) possède sa propre forme courte, donnée par la liste du chapitre."
    ],
    "examples": [
      {
        "stdin": "Un autre stagiaire, autres fautes :\n1) « Lundi 3 Octobre » → lundi 3 octobre (minuscule au jour et au mois).\n2) « les lundi » → les lundis (pluriel régulier).\n3) « etc… » → etc. (un point, jamais de points de suspension).\n4) « Mr Dupont » → M. Dupont (abréviation française de Monsieur).",
        "expected": "lundi 3 octobre — les lundis — etc. — M.",
        "note": "Jours et mois sont des noms communs ; etc. garde son point ; Monsieur s'abrège M. — jamais Mr."
      }
    ],
    "tests": [
      {
        "label": "Question 1 — Majuscule aux jours et mois",
        "stdin": "q:1",
        "expected": "non"
      },
      {
        "label": "Question 2 — Le pluriel de jeudi",
        "stdin": "q:2",
        "expected": "jeudis"
      },
      {
        "label": "Question 3 — L'écriture « etc… »",
        "stdin": "q:3",
        "expected": "non"
      },
      {
        "label": "Question 4 — Abréviation de Monsieur",
        "stdin": "q:4",
        "expected": "M.||M"
      },
      {
        "label": "Question 5 — L'abréviation Dr pour Docteur",
        "stdin": "q:5",
        "expected": "oui"
      },
      {
        "label": "Question 6 — Le point de etc. en milieu de phrase",
        "stdin": "q:6",
        "expected": "oui"
      }
    ],
    "solution": "[Question 1 — Majuscule aux jours et mois]\nnon\n\n[Question 2 — Le pluriel de jeudi]\njeudis\n\n[Question 3 — L'écriture « etc… »]\nnon\n\n[Question 4 — Abréviation de Monsieur]\nM.\n\n[Question 5 — L'abréviation Dr pour Docteur]\noui\n\n[Question 6 — Le point de etc. en milieu de phrase]\noui",
    "takeaway": "1) Non : jour et mois sont des noms communs, la date correcte est « mercredi 12 juillet 2023 » (majuscule seulement en début de phrase).\n2) Le service travaille les jeudis : le pluriel s'écrit, comme dans « tous les samedis, je fais l'inventaire ».\n3) Non : « etc… » est fautif — on écrit « etc. », avec un seul point, jamais suivi de points de suspension.\n4) Monsieur s'abrège « M. » ; « Mr » est l'anglais Mister.\n5) Oui : « Dr » est l'abréviation française de docteur (comme « Pr » pour professeur, « Me » pour maître).\n6) Oui : le point de « etc. » reste en toute position, même en milieu de phrase.\nContrôle : la lettre corrigée commence par « M. Dupont », annonce « mercredi 12 juillet 2023 », travaille « les jeudis » et referme ses listes sur « etc. » sans points de suspension."
  },
  {
    "id": "fr-c3-e2",
    "chapter": 3,
    "level": "n2",
    "language": "analyse",
    "title": "Ci-joint dans le courrier de la comptable",
    "exampleTitle": "Exemple résolu — le courrier du service juridique",
    "goal": "Décider de l'accord de « ci-joint » selon sa place (tête de phrase, entre virgules, après le nom) et distinguer veuillez et veillez.",
    "brief": "<p><strong>Énoncé.</strong> Mme Sylla, comptable, relit le courrier qui accompagne les pièces d'un remboursement. Quatre phrases contiennent « ci-joint », et deux formules interrogent l'auxiliaire. Six phrases sont numérotées :</p><table><tr><th>N°</th><th>Phrase du courrier</th></tr><tr><td>1</td><td>« Ci-joint les pièces exigées par votre service. »</td></tr><tr><td>2</td><td>« Veuillez trouver, ci-joint, les deux requêtes signées. »</td></tr><tr><td>3</td><td>« Veuillez trouver ci-jointe la notification d'attribution. »</td></tr><tr><td>4</td><td>« Nous vous transmettons les statistiques de l'enquête ci-annexées. »</td></tr><tr><td>5</td><td>« ___ croire, Madame, à l'expression de nos sentiments dévoués. »</td></tr><tr><td>6</td><td>« ___ à la confidentialité des données transmises. »</td></tr></table><ol><li>Phrase n° 1 : dans cette phrase, « ci-joint » est-il invariable ou accordé ?</li><li>Phrase n° 2 : dans cette phrase, « ci-joint » est-il invariable ou accordé ?</li><li>Phrase n° 3 : dans cette phrase, « ci-jointe » est-il invariable ou accordé ?</li><li>Phrase n° 4 : dans cette phrase, « ci-annexées » est-il invariable ou accordé ?</li><li>Phrase n° 5 : quel est le mot correct, <code>veuillez</code> ou <code>veillez</code> ?</li><li>Phrase n° 6 : quel est le mot correct, <code>veuillez</code> ou <code>veillez</code> ?</li></ol><p>Pour les questions 1 à 4, répondez <code>invariable</code> ou <code>accordé</code> ; pour les questions 5 et 6, par le mot correct. Écrivez en minuscules, sans ponctuation finale.</p>",
    "starter": "# Exercice — Ci-joint dans le courrier de la comptable\n# Lisez l'énoncé complet ci-dessus, puis répondez à chaque question dans son bloc.\n# Réponses courtes : invariable ou accordé ; puis veuillez ou veillez.\n\n[Question 1 — Ci-joint dans la phrase n° 1]\nA_COMPLETER\n\n[Question 2 — Ci-joint dans la phrase n° 2]\nA_COMPLETER\n\n[Question 3 — Ci-jointe dans la phrase n° 3]\nA_COMPLETER\n\n[Question 4 — Ci-annexées dans la phrase n° 4]\nA_COMPLETER\n\n[Question 5 — Le mot correct de la phrase n° 5]\nA_COMPLETER\n\n[Question 6 — Le mot correct de la phrase n° 6]\nA_COMPLETER\n",
    "hints": [
      "La règle du chapitre donne trois placements : « ci-joint » en tête de phrase reste invariable ; entre virgules, invariable aussi ; placé après le nom qu'il détermine, il devient adjectif et s'accorde.",
      "Repérez d'abord la place de « ci-joint » dans chaque phrase : devant toute la phrase, encadré de virgules, ou juste à côté du nom (avant lui sans virgule, ou après lui).",
      "Pour les phrases 5 et 6, remplacez mentalement par l'infinitif : l'un des deux mots vient de vouloir (la politesse), l'autre de veiller (faire attention à quelque chose)."
    ],
    "examples": [
      {
        "stdin": "Un courrier du service juridique, autre placement :\n1) « Ci-joint la facture demandée. » (en tête de phrase) → invariable.\n2) « la note ci-jointe » (juste après le nom) → accordé.\n3) « Veuillez agréer, Madame, … » → veuillez (venir de vouloir).\n4) « Veillez au respect des délais » → veillez (venir de veiller).",
        "expected": "invariable — accordé — veuillez — veillez",
        "note": "La place commande l'accord : ci-joint invariable en tête ou entre virgules, adjectif accordé quand il détermine le nom de près."
      }
    ],
    "tests": [
      {
        "label": "Question 1 — Ci-joint dans la phrase n° 1",
        "stdin": "q:1",
        "expected": "invariable"
      },
      {
        "label": "Question 2 — Ci-joint dans la phrase n° 2",
        "stdin": "q:2",
        "expected": "invariable"
      },
      {
        "label": "Question 3 — Ci-jointe dans la phrase n° 3",
        "stdin": "q:3",
        "expected": "accordé||accordée||accorde"
      },
      {
        "label": "Question 4 — Ci-annexées dans la phrase n° 4",
        "stdin": "q:4",
        "expected": "accordé||accordée||accorde"
      },
      {
        "label": "Question 5 — Le mot correct de la phrase n° 5",
        "stdin": "q:5",
        "expected": "veuillez"
      },
      {
        "label": "Question 6 — Le mot correct de la phrase n° 6",
        "stdin": "q:6",
        "expected": "veillez"
      }
    ],
    "solution": "[Question 1 — Ci-joint dans la phrase n° 1]\ninvariable\n\n[Question 2 — Ci-joint dans la phrase n° 2]\ninvariable\n\n[Question 3 — Ci-jointe dans la phrase n° 3]\naccordé\n\n[Question 4 — Ci-annexées dans la phrase n° 4]\naccordé\n\n[Question 5 — Le mot correct de la phrase n° 5]\nveuillez\n\n[Question 6 — Le mot correct de la phrase n° 6]\nveillez",
    "takeaway": "1) « Ci-joint les pièces exigées » : en tête de phrase, ci-joint reste invariable.\n2) « Veuillez trouver, ci-joint, les deux requêtes » : entre virgules, ci-joint reste invariable.\n3) « Veuillez trouver ci-jointe la notification » : sans virgule, il détermine directement le nom qui suit — valeur d'adjectif, accord au féminin (ci-jointe).\n4) « les statistiques de l'enquête ci-annexées » : placé après le nom, il s'accorde (ci-annexées, féminin pluriel).\n5) « Veuillez croire, Madame, à l'expression de nos sentiments dévoués » : veuillez vient de vouloir, c'est la formule de politesse.\n6) « Veillez à la confidentialité des données » : veillez vient de veiller (faire attention).\nContrôle : deux phrases laissent ci-joint invariable (n° 1 et 2), deux l'accordent (n° 3 et 4) ; veuillez (vouloir) ouvre la politesse, veillez (veiller) garde la surveillance."
  },
  {
    "id": "fr-c3-e3",
    "chapter": 3,
    "level": "n3",
    "language": "analyse",
    "title": "L'audit du courrier",
    "goal": "Distinguer les usages possibles de l'article de profession des fautes de majuscule et d'abréviation.",
    "brief": "<p>Auditez chaque phrase proposée selon les règles du courrier professionnel : « Je suis chercheur » et « Je suis un chercheur passionné » — les deux sont recevables (<code>correcte</code>). En revanche, un article devant une profession non qualifiée (« Je suis un chercheur » sans précision) relève d'un choix à contextualiser, pas à compter comme faute (<code>a contextualiser</code>). Repérez aussi les majuscules abusives aux jours/mois au milieu d'une phrase (<code>majuscule a enlever</code>) et les anglicismes comme « Mr » au lieu de « M. » (<code>abreviation a corriger</code>).</p><p>Pour chaque phrase, indiquez <code>pX : correcte</code>, <code>pX : a contextualiser</code>, <code>pX : majuscule a enlever</code> ou <code>pX : abreviation a corriger</code>. Concluez par <code>contextes : X</code>, <code>majuscule : Y</code>, <code>abreviation : Z</code>, puis <code>fautes : T/n</code> et <code>relecture : urgente</code> si les fautes sont strictement majoritaires, <code>relecture : legere</code> sinon. Les contextes à préciser ne sont pas des fautes.</p>",
    "starter": "# Grille d'analyse (fr-c3-e3) — L'audit du courrier\n# Auditez chaque phrase ci-dessous puis complétez votre diagnostic :\n\n[Cas 1 — Articles sans contexte et une faute]\n# Données : p1 « Bonjour, je suis un développeur. »\n# Données : p2 « Elle est une chercheuse. »\n# Données : p3 « La réunion est fixée à Lundi matin. »\nA_COMPLETER\n\n[Cas 2 — Deux professions recevables]\n# Données : p1 « Je suis ingénieure réseau. »\n# Données : p2 « Je suis un chercheur passionné d'algorithmes. »\nA_COMPLETER\n\n[Cas 3 — Six phrases]\n# Données : p1 « Il reste un technicien dans ce service. »\n# Données : p2 « Veuillez contacter Mr Diallo dès aujourd'hui. »\n# Données : p3 « Pourriez-vous rappeler Mr Martin ? »\n# Données : p4 « Elle est une experte reconnue en cybersécurité. »\n# Données : p5 « Le dossier partira en Avril sans faute. »\n# Données : p6 « L'audit débute Vendredi prochain. »\nA_COMPLETER\n",
    "hints": [
      "Comptez les contextes à préciser à part : seul le total des majuscules et abréviations fautives compte comme faute.",
      "Strictement majoritaires : le nombre de fautes doit dépasser la moitié des phrases.",
      "Vérifiez trois critères par phrase : article devant profession nue (a contextualiser), jour/mois en majuscule hors début de phrase (majuscule a enlever), « Mr » en français (abreviation a corriger)."
    ],
    "examples": [
      {
        "stdin": "5\np1 « Je suis un analyste. »\np2 « Livraison prévue en Juin. »\np3 « Je suis un architecte certifié ISO. »\np4 « Merci de répondre à Mr Koné. »\np5 « Elle est chef de projet. »\n",
        "expected": "p1 : a contextualiser\np2 : majuscule a enlever\np3 : correcte\np4 : abreviation a corriger\np5 : correcte\ncontextes : 1\nmajuscule : 1\nabreviation : 1\nfautes : 2/5\nrelecture : legere"
      }
    ],
    "tests": [
      {
        "label": "Articles sans contexte et une faute",
        "stdin": "cas:1",
        "expected": "p1 : a contextualiser\np2 : a contextualiser\np3 : majuscule a enlever\ncontextes : 2\nmajuscule : 1\nabreviation : 0\nfautes : 1/3\nrelecture : legere"
      },
      {
        "label": "Deux professions recevables",
        "stdin": "cas:2",
        "expected": "p1 : correcte\np2 : correcte\ncontextes : 0\nmajuscule : 0\nabreviation : 0\nfautes : 0/2\nrelecture : legere"
      },
      {
        "label": "Six phrases",
        "stdin": "cas:3",
        "expected": "p1 : a contextualiser\np2 : abreviation a corriger\np3 : abreviation a corriger\np4 : correcte\np5 : majuscule a enlever\np6 : majuscule a enlever\ncontextes : 1\nmajuscule : 2\nabreviation : 2\nfautes : 4/6\nrelecture : urgente"
      }
    ],
    "solution": "[Exemple]\np1 : a contextualiser\np2 : majuscule a enlever\np3 : correcte\np4 : abreviation a corriger\np5 : correcte\ncontextes : 1\nmajuscule : 1\nabreviation : 1\nfautes : 2/5\nrelecture : legere\n\n[Cas 1 — Articles sans contexte et une faute]\np1 : a contextualiser\np2 : a contextualiser\np3 : majuscule a enlever\ncontextes : 2\nmajuscule : 1\nabreviation : 0\nfautes : 1/3\nrelecture : legere\n\n[Cas 2 — Deux professions recevables]\np1 : correcte\np2 : correcte\ncontextes : 0\nmajuscule : 0\nabreviation : 0\nfautes : 0/2\nrelecture : legere\n\n[Cas 3 — Six phrases]\np1 : a contextualiser\np2 : abreviation a corriger\np3 : abreviation a corriger\np4 : correcte\np5 : majuscule a enlever\np6 : majuscule a enlever\ncontextes : 1\nmajuscule : 2\nabreviation : 2\nfautes : 4/6\nrelecture : urgente\n",
    "takeaway": "À retenir : Distinguer les usages possibles de l'article de profession des fautes de majuscule et d'abréviation."
  },
  {
    "id": "fr-c4-e1",
    "chapter": 4,
    "level": "n1",
    "language": "analyse",
    "title": "La note de service alourdie",
    "exampleTitle": "Exemple résolu — une autre note à alléger",
    "goal": "Repérer les pléonasmes d'une note de service et identifier le mot redondant à supprimer.",
    "brief": "<p><strong>Énoncé.</strong> Le responsable des achats diffuse une note de service pour organiser l'inventaire annuel. Le secrétariat général doit l'alléger : chaque phrase contient un pléonasme (une répétition inutile). Six phrases sont numérotées :</p><table><tr><th>N°</th><th>Phrase de la note</th></tr><tr><td>1</td><td>« Merci de finaliser vos projets d'avenir avant le 30 du mois. »</td></tr><tr><td>2</td><td>« Le livreur a monté les cartons en haut. »</td></tr><tr><td>3</td><td>« La direction divulguera publiquement les résultats de l'inventaire. »</td></tr><tr><td>4</td><td>« Le réapprovisionnement des rayons est notre première priorité. »</td></tr><tr><td>5</td><td>« Le retard de livraison relève d'un hasard imprévu. »</td></tr><tr><td>6</td><td>« Au jour d'aujourd'hui, la salle de stockage est disponible. »</td></tr></table><ol><li>Phrase n° 1 : quel mot ou groupe de mots supprimer ?</li><li>Phrase n° 2 : quel mot ou groupe de mots supprimer ?</li><li>Phrase n° 3 : quel mot supprimer ?</li><li>Phrase n° 4 : quel mot supprimer ?</li><li>Phrase n° 5 : quel mot supprimer ?</li><li>Phrase n° 6 : écrivez le mot correct qui remplace « au jour d'aujourd'hui » (un seul mot).</li></ol><p>Répondez par le mot exact à supprimer (ou le mot correct pour la question 6). Écrivez en minuscules, sans ponctuation finale.</p>",
    "starter": "# Exercice — La note de service alourdie\n# Lisez l'énoncé complet ci-dessus, puis répondez à chaque question dans son bloc.\n# Une seule réponse par bloc : le mot à supprimer (question 6 : le mot correct).\n\n[Question 1 — Le mot à supprimer dans la phrase n° 1]\nA_COMPLETER\n\n[Question 2 — Le mot à supprimer dans la phrase n° 2]\nA_COMPLETER\n\n[Question 3 — Le mot à supprimer dans la phrase n° 3]\nA_COMPLETER\n\n[Question 4 — Le mot à supprimer dans la phrase n° 4]\nA_COMPLETER\n\n[Question 5 — Le mot à supprimer dans la phrase n° 5]\nA_COMPLETER\n\n[Question 6 — Le mot correct pour « au jour d'aujourd'hui »]\nA_COMPLETER\n",
    "hints": [
      "Le pléonasme (ou périssologie) est une répétition inutile : un mot porte déjà une information donnée par un autre mot de la phrase.",
      "Pour chaque phrase, cherchez l'information doublée : un projet regarde déjà l'avenir, monter va déjà vers le haut, divulguer se fait déjà publiquement, une priorité est déjà première, un hasard est déjà imprévisible.",
      "La correction se fait en coupant le mot redondant, jamais en reformulant la phrase. Pour la dernière phrase, le mot correct est le seul qui dise « le jour présent » sans redondance."
    ],
    "examples": [
      {
        "stdin": "Une autre note à alléger :\n1) « vos projets d'avenir » → vos projets (l'avenir est dans « projet »).\n2) « la panacée universelle » → la panacée (une panacée est déjà universelle).\n3) « comparer ensemble les offres » → comparer les offres.\n4) « au jour d'aujourd'hui » → aujourd'hui.",
        "expected": "projets d'avenir → projets — panacée universelle → panacée — comparer ensemble → comparer — au jour d'aujourd'hui → aujourd'hui",
        "note": "Le pléonasme répète une information déjà portée par un autre mot : on coupe, on ne reformule pas."
      }
    ],
    "tests": [
      {
        "label": "Question 1 — Le mot à supprimer dans la phrase n° 1",
        "stdin": "q:1",
        "expected": "d'avenir||avenir"
      },
      {
        "label": "Question 2 — Le mot à supprimer dans la phrase n° 2",
        "stdin": "q:2",
        "expected": "en haut"
      },
      {
        "label": "Question 3 — Le mot à supprimer dans la phrase n° 3",
        "stdin": "q:3",
        "expected": "publiquement"
      },
      {
        "label": "Question 4 — Le mot à supprimer dans la phrase n° 4",
        "stdin": "q:4",
        "expected": "première"
      },
      {
        "label": "Question 5 — Le mot à supprimer dans la phrase n° 5",
        "stdin": "q:5",
        "expected": "imprévu||imprévue"
      },
      {
        "label": "Question 6 — Le mot correct pour « au jour d'aujourd'hui »",
        "stdin": "q:6",
        "expected": "aujourd'hui"
      }
    ],
    "solution": "[Question 1 — Le mot à supprimer dans la phrase n° 1]\nd'avenir\n\n[Question 2 — Le mot à supprimer dans la phrase n° 2]\nen haut\n\n[Question 3 — Le mot à supprimer dans la phrase n° 3]\npubliquement\n\n[Question 4 — Le mot à supprimer dans la phrase n° 4]\npremière\n\n[Question 5 — Le mot à supprimer dans la phrase n° 5]\nimprévu\n\n[Question 6 — Le mot correct pour « au jour d'aujourd'hui »]\naujourd'hui",
    "takeaway": "1) « Vos projets » : un projet est tourné vers l'avenir, « d'avenir » double l'information — on supprime « d'avenir ».\n2) « Le livreur a monté les cartons » : monter signifie déjà aller vers le haut — on supprime « en haut ».\n3) « La direction divulguera les résultats » : divulguer, c'est rendre public — on supprime « publiquement ».\n4) « Le réapprovisionnement est notre priorité » : une priorité passe déjà en premier — on supprime « première ».\n5) « Le retard relève d'un hasard » : un hasard est par nature imprévisible — on supprime « imprévu ».\n6) « Au jour d'aujourd'hui » se corrige en « aujourd'hui », un seul mot.\nContrôle : chaque phrase allégée garde exactement le même sens ; aucune information n'est perdue, seule la répétition disparaît."
  },
  {
    "id": "fr-c4-e2",
    "chapter": 4,
    "level": "n2",
    "language": "analyse",
    "title": "Les barbarismes du devis",
    "exampleTitle": "Exemple résolu — la facture d'un autre prestataire",
    "goal": "Corriger les barbarismes d'un devis reçu : restituer la vraie forme des mots déformés.",
    "brief": "<p><strong>Énoncé.</strong> L'entreprise Argos reçoit le devis d'un prestataire de nettoyage. Le service administratif relève six mots ou expressions fautifs — des barbarismes, c'est-à-dire des mots déformés ou forgés. Les fautes sont numérotées :</p><table><tr><th>N°</th><th>Expression relevée dans le devis</th></tr><tr><td>1</td><td>« des frais pécuniers »</td></tr><tr><td>2</td><td>« une réaction bénine aux produits »</td></tr><tr><td>3</td><td>« nous sommes dans un dilemne »</td></tr><tr><td>4</td><td>« la marche de manœuvre budgétaire »</td></tr><tr><td>5</td><td>« relevé de vos empruntes digitales »</td></tr><tr><td>6</td><td>« le personnel sera rénuméré au tarif horaire »</td></tr></table><ol><li>Corrigez : des frais ___ (pécuniers).</li><li>Corrigez : une réaction ___ (bénine).</li><li>Corrigez : un ___ (dilemne).</li><li>Corrigez : la ___ de manœuvre (marche).</li><li>Corrigez : vos ___ digitales (empruntes).</li><li>Corrigez : le personnel sera ___ au tarif horaire (rénuméré).</li></ol><p>Écrivez à chaque fois le mot correct seul. Écrivez en minuscules, sans ponctuation finale.</p>",
    "starter": "# Exercice — Les barbarismes du devis\n# Lisez l'énoncé complet ci-dessus, puis répondez à chaque question dans son bloc.\n# Une seule réponse par bloc : le mot correct, sans ponctuation finale.\n\n[Question 1 — Correction de « pécuniers »]\nA_COMPLETER\n\n[Question 2 — Correction de « bénine »]\nA_COMPLETER\n\n[Question 3 — Correction de « dilemne »]\nA_COMPLETER\n\n[Question 4 — Correction de « marche » de manœuvre]\nA_COMPLETER\n\n[Question 5 — Correction de « empruntes »]\nA_COMPLETER\n\n[Question 6 — Correction de « rénuméré »]\nA_COMPLETER\n",
    "hints": [
      "Le barbarisme est une faute de langue : mot forgé (qui n'existe pas), mot impropre ou tournure étrangère — la correction restitue la vraie forme du mot.",
      "Le latin aide parfois : l'adjectif de l'argent vient de pecunia ; le verbe de la rémunération vient de remunerari, avec ses deux voyelles bien placées.",
      "Vérifiez chaque forme corrigée dans le dictionnaire : le mot restitué doit exister et garder exactement le sens de la phrase du devis."
    ],
    "examples": [
      {
        "stdin": "La facture d'un autre prestataire, autres barbarismes :\n1) « en liste pour le prochain marché » → en lice.\n2) « en définitif, le contrat est signé » → en définitive.\n3) « les locaux sont indemmes » → indemnes.\n4) « je vous saurai gré de confirmer » → je vous serai gré (savoir gré, mais être gré).",
        "expected": "en lice — en définitive — indemnes — je vous serai gré",
        "note": "Le barbarisme déforme un mot qui existe : restituer la vraie forme suffit à corriger la faute."
      }
    ],
    "tests": [
      {
        "label": "Question 1 — Correction de « pécuniers »",
        "stdin": "q:1",
        "expected": "pécuniaires||pecuniaires"
      },
      {
        "label": "Question 2 — Correction de « bénine »",
        "stdin": "q:2",
        "expected": "bénigne||benigne"
      },
      {
        "label": "Question 3 — Correction de « dilemne »",
        "stdin": "q:3",
        "expected": "dilemme"
      },
      {
        "label": "Question 4 — Correction de « marche » de manœuvre",
        "stdin": "q:4",
        "expected": "marge"
      },
      {
        "label": "Question 5 — Correction de « empruntes »",
        "stdin": "q:5",
        "expected": "empreintes"
      },
      {
        "label": "Question 6 — Correction de « rénuméré »",
        "stdin": "q:6",
        "expected": "rémunéré||remunere"
      }
    ],
    "solution": "[Question 1 — Correction de « pécuniers »]\npécuniaires\n\n[Question 2 — Correction de « bénine »]\nbénigne\n\n[Question 3 — Correction de « dilemne »]\ndilemme\n\n[Question 4 — Correction de « marche » de manœuvre]\nmarge\n\n[Question 5 — Correction de « empruntes »]\nempreintes\n\n[Question 6 — Correction de « rénuméré »]\nrémunéré",
    "takeaway": "1) Des frais pécuniaires : l'adjectif vient du latin pecunia (argent) — « pécuniers » n'existe pas.\n2) Une réaction bénigne : comme maligne — « bénine » est un barbarisme classique.\n3) Un dilemme, avec deux m : « dilemne » et « dileme » sont fautifs.\n4) La marge de manœuvre : l'expression correcte parle d'espace, pas de marche à suivre.\n5) Vos empreintes digitales : un emprunt est un prêt ; l'empreinte est la marque laissée.\n6) Le personnel sera rémunéré : le verbe correct est rémunérer, avec ses deux voyelles — « rénuméré » est fautif.\nContrôle : chaque mot corrigé existe dans le dictionnaire et s'écrit différemment du barbarisme relevé — pécuniaires, bénigne, dilemme, marge, empreintes, rémunéré."
  },
  {
    "id": "fr-c4-e3",
    "chapter": 4,
    "level": "n3",
    "language": "analyse",
    "title": "Le compte rendu à reconstruire",
    "exampleTitle": "Exemple résolu — un autre compte rendu corrigé",
    "goal": "Corriger les solécismes d'un compte rendu de réunion : constructions fautives, prépositions en trop ou manquantes, modes après « si » et « après que ».",
    "brief": "<p><strong>Énoncé.</strong> Un jeune collaborateur rédige son premier compte rendu de réunion. Sa cheffe relève six solécismes — des fautes de construction. Les phrases fautives sont numérotées :</p><table><tr><th>N°</th><th>Phrase du compte rendu</th></tr><tr><td>1</td><td>« Je me rappelle de l'ordre du jour fixé par M. Diallo. »</td></tr><tr><td>2</td><td>« Le service informatique doit pallier à cette panne récurrente. »</td></tr><tr><td>3</td><td>« Nous allons téléphoner les clients concernés demain. »</td></tr><tr><td>4</td><td>« Si je pourrais obtenir un délai, je confirmerais la commande. »</td></tr><tr><td>5</td><td>« Après qu'il ait quitté la salle, le vote a eu lieu. »</td></tr><tr><td>6</td><td>« Nous avons débuté la réunion à 9 h précises. »</td></tr></table><ol><li>Phrase n° 1 : quel petit mot faut-il supprimer après « je me rappelle » ?</li><li>Phrase n° 2 : quel petit mot faut-il supprimer après « pallier » ?</li><li>Phrase n° 3 : quel petit mot faut-il ajouter entre « téléphoner » et « les clients » ?</li><li>Phrase n° 4 : corrigez le verbe — « si je ___ obtenir » (imparfait de pouvoir).</li><li>Phrase n° 5 : quel mode faut-il employer après « après que » ?</li><li>Phrase n° 6 : complétez la correction — « nous avons ___ la réunion » (participe passé de commencer).</li></ol><p>Répondez par le mot exact demandé. Écrivez en minuscules, sans ponctuation finale.</p>",
    "starter": "# Exercice — Le compte rendu à reconstruire\n# Lisez l'énoncé complet ci-dessus, puis répondez à chaque question dans son bloc.\n# Une seule réponse par bloc : le mot exact demandé, sans ponctuation finale.\n\n[Question 1 — Le mot à supprimer dans la phrase n° 1]\nA_COMPLETER\n\n[Question 2 — Le mot à supprimer dans la phrase n° 2]\nA_COMPLETER\n\n[Question 3 — Le mot à ajouter dans la phrase n° 3]\nA_COMPLETER\n\n[Question 4 — Le verbe correct dans la phrase n° 4]\nA_COMPLETER\n\n[Question 5 — Le mode après « après que »]\nA_COMPLETER\n\n[Question 6 — Le participe passé correct dans la phrase n° 6]\nA_COMPLETER\n",
    "hints": [
      "Le solécisme pèche contre la construction : préposition en trop ou manquante, mauvais mode, mauvais auxiliaire. Les verbes du chapitre sont directs (se rappeler quelque chose, pallier quelque chose, enfreindre les règles) ou indirects (téléphoner à quelqu'un).",
      "La règle du « si » d'hypothèse retient tout : après « si », jamais de conditionnel — « les si n'aiment pas les rais ». Et « après que » introduit un fait déjà réalisé, qui n'appelle donc pas le même mode qu'« avant que ».",
      "Pour la dernière phrase, le chapitre interdit de « débuter » quelque chose : le verbe attendu est celui qu'on emploie couramment pour une réunion qu'on ouvre à l'heure."
    ],
    "examples": [
      {
        "stdin": "Un autre compte rendu corrigé :\n1) « enfreindre aux règles » → enfreindre les règles (transitif direct).\n2) « d'ici vendredi » → d'ici à vendredi.\n3) « malgré qu'il soit tard » → bien qu'il soit tard.\n4) « le véhicule au directeur » → le véhicule du directeur.",
        "expected": "enfreindre les règles — d'ici à vendredi — bien qu'il soit tard — le véhicule du directeur",
        "note": "Le solécisme fausse la construction : on rétablit la préposition, le mode ou le régime exact du verbe."
      }
    ],
    "tests": [
      {
        "label": "Question 1 — Le mot à supprimer dans la phrase n° 1",
        "stdin": "q:1",
        "expected": "de"
      },
      {
        "label": "Question 2 — Le mot à supprimer dans la phrase n° 2",
        "stdin": "q:2",
        "expected": "à||a"
      },
      {
        "label": "Question 3 — Le mot à ajouter dans la phrase n° 3",
        "stdin": "q:3",
        "expected": "aux"
      },
      {
        "label": "Question 4 — Le verbe correct dans la phrase n° 4",
        "stdin": "q:4",
        "expected": "pouvais"
      },
      {
        "label": "Question 5 — Le mode après « après que »",
        "stdin": "q:5",
        "expected": "indicatif||l'indicatif||l indicatif"
      },
      {
        "label": "Question 6 — Le participe passé correct dans la phrase n° 6",
        "stdin": "q:6",
        "expected": "commencé"
      }
    ],
    "solution": "[Question 1 — Le mot à supprimer dans la phrase n° 1]\nde\n\n[Question 2 — Le mot à supprimer dans la phrase n° 2]\nà\n\n[Question 3 — Le mot à ajouter dans la phrase n° 3]\naux\n\n[Question 4 — Le verbe correct dans la phrase n° 4]\npouvais\n\n[Question 5 — Le mode après « après que »]\nindicatif\n\n[Question 6 — Le participe passé correct dans la phrase n° 6]\ncommencé",
    "takeaway": "1) « Je me rappelle l'ordre du jour » : se rappeler est transitif direct — on supprime « de » (on se souvient de, on se rappelle).\n2) « pallier cette panne » : pallier est transitif direct, comme enfreindre — on supprime « à ».\n3) « téléphoner aux clients » : téléphoner est transitif indirect — on ajoute « aux ».\n4) « Si je pouvais obtenir un délai, je confirmerais » : jamais de conditionnel après le « si » d'hypothèse.\n5) « Après qu'il a quitté la salle » : le fait s'est produit, on emploie l'indicatif (le subjonctif resterait pour « avant qu'il ait quitté »).\n6) « Nous avons commencé la réunion » : on ne débute pas quelque chose — le verbe correct est commencer.\nContrôle : quatre constructions rétablies (rappeler, pallier, téléphoner à, commencer), un mode corrigé (indicatif après « après que ») et l'imparfait après « si »."
  },
  {
    "id": "fr-c5-e1",
    "chapter": 5,
    "level": "n1",
    "language": "analyse",
    "title": "Les neuf blocs de la lettre de Kiryang",
    "exampleTitle": "Exemple résolu — une lettre de commande fournisseur",
    "goal": "Identifier les neuf blocs d'une lettre formelle et leur ordre, de l'en-tête à la signature.",
    "brief": "<p><strong>Énoncé.</strong> Kiryang Park postule à un poste de vendeur à Paris. Sa lettre de motivation affiche les neuf blocs du chapitre, dont trois sont masqués dans le tableau :</p><table><tr><th>Bloc</th><th>Contenu de la lettre</th></tr><tr><td>1</td><td>les coordonnées (identiques au CV, à jour)</td></tr><tr><td>2</td><td>le destinataire (« À l'attention de Mme Rivoli »)</td></tr><tr><td>3</td><td>la ville et la date</td></tr><tr><td>4</td><td>?</td></tr><tr><td>5</td><td>la formule d'appel</td></tr><tr><td>6</td><td>le corps en trois paragraphes</td></tr><tr><td>7</td><td>?</td></tr><tr><td>8</td><td>la formule de politesse longue</td></tr><tr><td>9</td><td>?</td></tr></table><ol><li>Combien de blocs compte une lettre formelle ?</li><li>Quel est le bloc n° 4 ?</li><li>L'objet « Candidature au poste de vendeur » contient-il un verbe conjugué ?</li><li>Où se placent la ville et la date (bloc 3) dans la lettre ?</li><li>Quel est le bloc n° 7 ?</li><li>Quel est le bloc n° 9, le dernier ?</li></ol><p>Répondez par le nombre ou le nom du bloc (l'article est facultatif). Écrivez en minuscules, sans ponctuation finale.</p>",
    "starter": "# Exercice — Les neuf blocs de la lettre de Kiryang\n# Lisez l'énoncé complet ci-dessus, puis répondez à chaque question dans son bloc.\n# Réponses courtes : un nombre ou le nom d'un bloc, sans ponctuation finale.\n\n[Question 1 — Nombre de blocs d'une lettre formelle]\nA_COMPLETER\n\n[Question 2 — Le bloc n° 4]\nA_COMPLETER\n\n[Question 3 — Verbe conjugué dans l'objet]\nA_COMPLETER\n\n[Question 4 — Place de la ville et de la date]\nA_COMPLETER\n\n[Question 5 — Le bloc n° 7]\nA_COMPLETER\n\n[Question 6 — Le bloc n° 9]\nA_COMPLETER\n",
    "hints": [
      "Le chapitre range les neuf blocs en trois temps : 1-2-3 qui écrivent (coordonnées, destinataire, date), 4-5 qui ouvrent (objet, appel), 6-7-8-9 qui concluent (corps, rendez-vous, politesse, signature).",
      "L'objet est un résumé nominal de la lettre : court, clair, sans verbe conjugué.",
      "La ville et la date se placent dans un coin précis de la page, et la lettre se ferme sur le nom du candidat apposé en bas — le bloc 7 est la demande que le candidat adresse au recruteur."
    ],
    "examples": [
      {
        "stdin": "Une lettre de commande fournisseur, même squelette :\n1) Bloc 1 : les coordonnées de l'acheteur.\n2) Bloc 3 : la ville et la date.\n3) Bloc 4 : l'objet, sans verbe conjugué.\n4) Bloc 9 : la signature du responsable.",
        "expected": "les coordonnées — la ville et la date — l'objet — la signature",
        "note": "Neuf blocs dans un ordre fixe : en-tête (1-2-3), ouverture (4-5), clôture (6-7-8-9)."
      }
    ],
    "tests": [
      {
        "label": "Question 1 — Nombre de blocs d'une lettre formelle",
        "stdin": "q:1",
        "expected": "9||neuf"
      },
      {
        "label": "Question 2 — Le bloc n° 4",
        "stdin": "q:2",
        "expected": "l'objet||objet"
      },
      {
        "label": "Question 3 — Verbe conjugué dans l'objet",
        "stdin": "q:3",
        "expected": "non"
      },
      {
        "label": "Question 4 — Place de la ville et de la date",
        "stdin": "q:4",
        "expected": "en haut à droite||en haut a droite"
      },
      {
        "label": "Question 5 — Le bloc n° 7",
        "stdin": "q:5",
        "expected": "la demande de rendez-vous||demande de rendez-vous||la demande de rendez vous||demande de rendez vous"
      },
      {
        "label": "Question 6 — Le bloc n° 9",
        "stdin": "q:6",
        "expected": "la signature||signature"
      }
    ],
    "solution": "[Question 1 — Nombre de blocs d'une lettre formelle]\n9\n\n[Question 2 — Le bloc n° 4]\nl'objet\n\n[Question 3 — Verbe conjugué dans l'objet]\nnon\n\n[Question 4 — Place de la ville et de la date]\nen haut à droite\n\n[Question 5 — Le bloc n° 7]\nla demande de rendez-vous\n\n[Question 6 — Le bloc n° 9]\nla signature",
    "takeaway": "1) Une lettre formelle compte neuf blocs, de l'en-tête coordonnées jusqu'à la signature.\n2) Le bloc n° 4 est l'objet : court, clair, sans verbe conjugué (« Candidature au poste de vendeur »).\n3) Non : l'objet est nominal — « Candidature au poste de vendeur » ne contient aucun verbe conjugué.\n4) La ville et la date se placent en haut à droite de la lettre.\n5) Le bloc n° 7 est la demande de rendez-vous : le candidat se tient à disposition.\n6) Le bloc n° 9, le dernier, est la signature (prénom, nom, signature manuscrite, en bas à droite).\nContrôle : 1-2-3 écrivent (coordonnées, destinataire, date), 4-5 ouvrent (objet, appel), 6-7-8-9 concluent (corps, rendez-vous, politesse, signature)."
  },
  {
    "id": "fr-c5-e2",
    "chapter": 5,
    "level": "n2",
    "language": "analyse",
    "title": "L'appel et la formule de politesse",
    "exampleTitle": "Exemple résolu — d'autres situations d'appel",
    "goal": "Choisir la formule d'appel selon le destinataire et la formule de politesse selon le canal (lettre imprimée ou courriel).",
    "brief": "<p><strong>Énoncé.</strong> Quatre candidats préparent leur candidature. Le tableau résume leur situation :</p><table><tr><th>N°</th><th>Candidat</th><th>Situation</th></tr><tr><td>1</td><td>Awa</td><td>elle écrit à une entreprise sans connaître le nom du recruteur</td></tr><tr><td>2</td><td>Théo</td><td>il écrit à Mme Rivoli, directrice des ressources humaines</td></tr><tr><td>3</td><td>Lin</td><td>elle envoie sa candidature par courriel au directeur et clôt son message</td></tr><tr><td>4</td><td>Nadia</td><td>elle termine sa lettre de motivation imprimée</td></tr></table><ol><li>Situation n° 1 : quelle formule d'appel Awa doit-elle employer ?</li><li>L'appel « Madame la Directrice, » convient-il à la situation n° 2 ?</li><li>« Bonjour Madame, » est-il un appel correct dans une lettre formelle ?</li><li>Situation n° 3 : quelle formule de clôture en un seul mot Lin peut-elle employer ?</li><li>Situation n° 4 : la formule longue commence par « Dans l'attente de votre réponse, je vous prie d'___… » — écrivez le verbe à l'infinitif.</li><li>« Cher Monsieur, » convient-il à une lettre de motivation adressée à un recruteur inconnu ?</li></ol><p>Les questions fermées se répondent par <code>oui</code> ou <code>non</code> ; les questions 1 et 4 par la formule exacte (un mot pour la 4). Écrivez en minuscules, sans ponctuation finale.</p>",
    "starter": "# Exercice — L'appel et la formule de politesse\n# Lisez l'énoncé complet ci-dessus, puis répondez à chaque question dans son bloc.\n# Réponses courtes : la formule exacte, ou oui/non, sans ponctuation finale.\n\n[Question 1 — L'appel pour la situation n° 1]\nA_COMPLETER\n\n[Question 2 — L'appel « Madame la Directrice, » pour la situation n° 2]\nA_COMPLETER\n\n[Question 3 — L'appel « Bonjour Madame, »]\nA_COMPLETER\n\n[Question 4 — La clôture du courriel (un mot)]\nA_COMPLETER\n\n[Question 5 — Le verbe de la formule longue]\nA_COMPLETER\n\n[Question 6 — L'appel « Cher Monsieur, »]\nA_COMPLETER\n",
    "hints": [
      "La formule d'appel commence par une majuscule et finit par une virgule : « Madame, », « Monsieur, », « Madame, Monsieur, » si le destinataire est inconnu, ou le titre officiel s'il est connu.",
      "« Bonjour » est proscrit dans la lettre formelle, et « Cher / Chère » est réservé aux proches — jamais au recruteur.",
      "La clôture suit le canal : le courriel se ferme sur une formule courte d'un mot, la lettre imprimée sur la formule longue « je vous prie d'agréer… mes sincères salutations »."
    ],
    "examples": [
      {
        "stdin": "D'autres situations d'appel :\n1) Destinataire inconnu, lettre imprimée : « Madame, Monsieur, ».\n2) Un avocat : « Maître, ».\n3) Courriel de relance au fournisseur : « Cordialement, ».\n4) Lettre de motivation : formule longue « je vous prie d'agréer… ».",
        "expected": "Madame, Monsieur — Maître — Cordialement — je vous prie d'agréer",
        "note": "L'appel suit le destinataire ; la clôture suit le canal : imprimée longue, courriel courte."
      }
    ],
    "tests": [
      {
        "label": "Question 1 — L'appel pour la situation n° 1",
        "stdin": "q:1",
        "expected": "Madame, Monsieur||Madame Monsieur||Madame, Monsieur,"
      },
      {
        "label": "Question 2 — L'appel « Madame la Directrice, » pour la situation n° 2",
        "stdin": "q:2",
        "expected": "oui"
      },
      {
        "label": "Question 3 — L'appel « Bonjour Madame, »",
        "stdin": "q:3",
        "expected": "non"
      },
      {
        "label": "Question 4 — La clôture du courriel (un mot)",
        "stdin": "q:4",
        "expected": "cordialement"
      },
      {
        "label": "Question 5 — Le verbe de la formule longue",
        "stdin": "q:5",
        "expected": "agréer||agreer"
      },
      {
        "label": "Question 6 — L'appel « Cher Monsieur, »",
        "stdin": "q:6",
        "expected": "non"
      }
    ],
    "solution": "[Question 1 — L'appel pour la situation n° 1]\nMadame, Monsieur\n\n[Question 2 — L'appel « Madame la Directrice, » pour la situation n° 2]\noui\n\n[Question 3 — L'appel « Bonjour Madame, »]\nnon\n\n[Question 4 — La clôture du courriel (un mot)]\ncordialement\n\n[Question 5 — Le verbe de la formule longue]\nagréer\n\n[Question 6 — L'appel « Cher Monsieur, »]\nnon",
    "takeaway": "1) Destinataire inconnu : « Madame, Monsieur, » — majuscule et virgule.\n2) Oui : le destinataire est connu avec son titre officiel, « Madame la Directrice, » convient.\n3) Non : « Bonjour Madame » est proscrit dans la lettre formelle.\n4) Le courriel se clôt par « Cordialement, » — majuscule et virgule, suivi du nom.\n5) « Dans l'attente de votre réponse, je vous prie d'agréer, Madame, Monsieur, mes sincères salutations. » — le verbe est agréer.\n6) Non : « Cher / Chère » est réservé aux proches, jamais à un recruteur inconnu.\nContrôle : l'appel varie avec le destinataire (inconnu, titre officiel), la clôture avec le canal (courriel courte, lettre imprimée longue)."
  },
  {
    "id": "fr-c5-e3",
    "chapter": 5,
    "level": "n3",
    "language": "analyse",
    "title": "Le corps de la lettre à remettre en ordre",
    "exampleTitle": "Exemple résolu — un autre corps de lettre",
    "goal": "Structurer le corps d'une lettre de motivation en trois paragraphes et appliquer les stratégies lexicales du chapitre.",
    "brief": "<p><strong>Énoncé.</strong> Un candidat recopie un brouillon de lettre de motivation pour un poste d'assistant logistique. Le corps doit compter trois paragraphes maximum, chacun avec son contenu propre :</p><table><tr><th>Paragraphe</th><th>Contenu attendu</th></tr><tr><td>1</td><td>?</td></tr><tr><td>2</td><td>?</td></tr><tr><td>3</td><td>?</td></tr></table><p>Extraits du brouillon à exploiter : « Votre entrepôt de Lyon est réputé pour sa chaîne du froid » (A) ; « Titulaire d'un BTS, j'ai suivi des études de logistique » (B) ; « Ce métier de terrain me passionne depuis mon premier stage » (C) ; « Je me tiens à votre entière disposition pour un entretien » (D).</p><ol><li>Le paragraphe 2 du corps présente l'entreprise, les compétences professionnelles ou les motivations personnelles ?</li><li>Faut-il un article après « des études de » dans l'extrait B ?</li><li>« J'ai l'esprit de ___ » : écrivez le nom (sans article) que le chapitre associe à cette expression.</li><li>« J'ai une bonne ___ de l'anglais » : écrivez le nom manquant.</li><li>Complétez l'extrait D : « Je me tiens à votre entière ___ pour un entretien ».</li><li>Sur quoi la lettre se termine-elle : un rappel du salaire, une demande de rendez-vous ou un bref remerciement ?</li></ol><p>Répondez par le terme ou le nom exact attendu ; la question 6 par l'expression en trois mots. Écrivez en minuscules, sans ponctuation finale.</p>",
    "starter": "# Exercice — Le corps de la lettre à remettre en ordre\n# Lisez l'énoncé complet ci-dessus, puis répondez à chaque question dans son bloc.\n# Réponses courtes : le terme exact, ou l'expression demandée, sans ponctuation finale.\n\n[Question 1 — Contenu du paragraphe 2]\nA_COMPLETER\n\n[Question 2 — Article après « des études de »]\nA_COMPLETER\n\n[Question 3 — Le nom après « l'esprit de »]\nA_COMPLETER\n\n[Question 4 — Le nom manquant (bonne ___ de l'anglais)]\nA_COMPLETER\n\n[Question 5 — Le mot de l'extrait D]\nA_COMPLETER\n\n[Question 6 — La fin de la lettre]\nA_COMPLETER\n",
    "hints": [
      "Le corps compte trois paragraphes maximum : le premier montre l'intérêt pour l'entreprise, le deuxième expose les compétences professionnelles, le troisième les motivations plus personnelles.",
      "Les stratégies lexicales verrouillent les formules : « des études de » s'emploie sans article, « l'esprit de » aussi ; la formule finale consacrée dit que le candidat se tient à la disposition du recruteur.",
      "Relisez les extraits : A parle de l'entreprise, B du parcours, C de la motivation, D de la fin de lettre. Le paragraphe 2 est celui qui liste ce que le candidat sait faire."
    ],
    "examples": [
      {
        "stdin": "Une candidate décrit ses qualités dans une autre lettre :\n1) « Je suis à l'écoute des équipes » → être à + nom.\n2) « J'ai le sens du contact » → avoir le sens de + nom.\n3) « Je suis rigoureuse » → être + adjectif.\n4) « J'ai de bonnes compétences en informatique » → en + nom sans article.",
        "expected": "l'écoute — le contact — rigoureuse — en informatique",
        "note": "Les stratégies lexicales imposent leur construction : être à, avoir le sens de, être + adjectif, compétences en + nom sans article."
      }
    ],
    "tests": [
      {
        "label": "Question 1 — Contenu du paragraphe 2",
        "stdin": "q:1",
        "expected": "les compétences||les competences||les compétences professionnelles||les competences professionnelles||compétences||competences"
      },
      {
        "label": "Question 2 — Article après « des études de »",
        "stdin": "q:2",
        "expected": "non||aucun"
      },
      {
        "label": "Question 3 — Le nom après « l'esprit de »",
        "stdin": "q:3",
        "expected": "synthèse||synthese"
      },
      {
        "label": "Question 4 — Le nom manquant (bonne ___ de l'anglais)",
        "stdin": "q:4",
        "expected": "maîtrise||maitrise"
      },
      {
        "label": "Question 5 — Le mot de l'extrait D",
        "stdin": "q:5",
        "expected": "disposition"
      },
      {
        "label": "Question 6 — La fin de la lettre",
        "stdin": "q:6",
        "expected": "une demande de rendez-vous||demande de rendez-vous||une demande de rendez vous||demande de rendez vous"
      }
    ],
    "solution": "[Question 1 — Contenu du paragraphe 2]\nles compétences\n\n[Question 2 — Article après « des études de »]\nnon\n\n[Question 3 — Le nom après « l'esprit de »]\nsynthèse\n\n[Question 4 — Le nom manquant (bonne ___ de l'anglais)]\nmaîtrise\n\n[Question 5 — Le mot de l'extrait D]\ndisposition\n\n[Question 6 — La fin de la lettre]\nune demande de rendez-vous",
    "takeaway": "1) Le paragraphe 2 présente les compétences professionnelles du candidat (le paragraphe 1 l'intérêt pour l'entreprise, le 3 les motivations personnelles).\n2) Non : on écrit « des études de logistique », sans article après « études de » (mais « j'ai étudié la logistique »).\n3) « J'ai l'esprit de synthèse » : l'expression s'emploie sans article, comme esprit de groupe ou d'entreprise.\n4) « J'ai une bonne maîtrise de l'anglais » : la maîtrise de + nom.\n5) « Je me tiens à votre entière disposition pour un entretien » : le mot est disposition.\n6) La lettre se termine sur une demande de rendez-vous : le candidat se tient à disposition.\nContrôle : les trois paragraphes se répartissent sans chevauchement (entreprise, compétences, motivations) et la clôture reprend les deux formules consacrées : disposition et rendez-vous."
  },
  {
    "id": "fr-c6-e1",
    "chapter": 6,
    "level": "n1",
    "language": "analyse",
    "title": "Avoir ou être",
    "goal": "Choisir l'auxiliaire du passé composé en tenant compte du verbe et de la phrase.",
    "brief": "<p>Chaque code désigne une phrase précise dont l'auxiliaire est à vérifier : <code>partir</code> (« elle … partie »), <code>marcher</code> (« elle … marché »), <code>venir</code> (« elle … venue »), <code>acheter</code> (« elle … acheté un livre »), <code>sortir_bureau</code> (« elle … sortie du bureau »), <code>sortir_dossier</code> (« elle … sorti le dossier »), <code>monter_etage</code> (« elle … montée à l'étage »), <code>monter_bagages</code> (« elle … monté les bagages »), <code>se_coucher</code> (« elle s'… couchée ») et <code>coucher_enfant</code> (« elle … couché l'enfant »). L'auxiliaire proposé est <code>avoir</code> ou <code>etre</code>.</p><p>Pour chaque ligne, indiquez <code>code : auxiliaire correct</code> ou <code>code : auxiliaire fautif</code>, puis <code>erreurs : X/n</code>. Le mouvement ne suffit pas à déterminer l'auxiliaire.</p>",
    "starter": "# Grille d'analyse (fr-c6-e1) — Avoir ou être\n# Complétez la réponse attendue sous chaque cas ci-dessous :\n\n[Cas 1 — Partir et marcher]\n# Données : partir avoir\n# Données : marcher avoir\nA_COMPLETER\n\n[Cas 2 — Sortir et monter selon la construction]\n# Données : sortir_bureau etre\n# Données : sortir_dossier etre\n# Données : monter_etage etre\n# Données : monter_bagages avoir\nA_COMPLETER\n\n[Cas 3 — Pronominal et autres emplois]\n# Données : se_coucher etre\n# Données : coucher_enfant avoir\n# Données : marcher etre\n# Données : venir etre\n# Données : acheter avoir\nA_COMPLETER\n",
    "hints": [
      "Lisez la phrase correspondant à chaque code : « elle est sortie du bureau », mais « elle a sorti le dossier ».",
      "Le compteur suit exactement les auxiliaires fautifs.",
      "Testez si le verbe admet un COD après lui (« sortir le dossier » -> avoir) par opposition à l emploi intransitif de déplacement (« sortir du bureau » -> être)."
    ],
    "examples": [
      {
        "stdin": "4\npartir etre\nmarcher avoir\nsortir_bureau avoir\nsortir_dossier avoir\n",
        "expected": "partir : auxiliaire correct\nmarcher : auxiliaire correct\nsortir_bureau : auxiliaire fautif\nsortir_dossier : auxiliaire correct\nerreurs : 1/4"
      }
    ],
    "tests": [
      {
        "label": "Partir et marcher",
        "stdin": "cas:1",
        "expected": "partir : auxiliaire fautif\nmarcher : auxiliaire correct\nerreurs : 1/2"
      },
      {
        "label": "Sortir et monter selon la construction",
        "stdin": "cas:2",
        "expected": "sortir_bureau : auxiliaire correct\nsortir_dossier : auxiliaire fautif\nmonter_etage : auxiliaire correct\nmonter_bagages : auxiliaire correct\nerreurs : 1/4"
      },
      {
        "label": "Pronominal et autres emplois",
        "stdin": "cas:3",
        "expected": "se_coucher : auxiliaire correct\ncoucher_enfant : auxiliaire correct\nmarcher : auxiliaire fautif\nvenir : auxiliaire correct\nacheter : auxiliaire correct\nerreurs : 1/5"
      }
    ],
    "solution": "[Exemple]\npartir : auxiliaire correct\nmarcher : auxiliaire correct\nsortir_bureau : auxiliaire fautif\nsortir_dossier : auxiliaire correct\nerreurs : 1/4\n\n[Cas 1 — Partir et marcher]\npartir : auxiliaire fautif\nmarcher : auxiliaire correct\nerreurs : 1/2\n\n[Cas 2 — Sortir et monter selon la construction]\nsortir_bureau : auxiliaire correct\nsortir_dossier : auxiliaire fautif\nmonter_etage : auxiliaire correct\nmonter_bagages : auxiliaire correct\nerreurs : 1/4\n\n[Cas 3 — Pronominal et autres emplois]\nse_coucher : auxiliaire correct\ncoucher_enfant : auxiliaire correct\nmarcher : auxiliaire fautif\nvenir : auxiliaire correct\nacheter : auxiliaire correct\nerreurs : 1/5\n",
    "takeaway": "À retenir : Choisir l'auxiliaire du passé composé en tenant compte du verbe et de la phrase."
  },
  {
    "id": "fr-c6-e2",
    "chapter": 6,
    "level": "n2",
    "language": "analyse",
    "title": "Accorder le participe passé au salon",
    "exampleTitle": "Exemple résolu — les accords d'un autre salon",
    "goal": "Accorder le participe passé avec être comme un adjectif (genre et nombre du sujet) et avec avoir quand le complément d'objet précède.",
    "brief": "<p><strong>Énoncé.</strong> L'équipe du stand Argos fait son bilan après le salon des métiers. Six phrases du bilan attendent leur participe passé :</p><table><tr><th>N°</th><th>Phrase du bilan (verbe à l'infinitif)</th></tr><tr><td>1</td><td>« Julie raconte : je suis ___ au salon. » (aller)</td></tr><tr><td>2</td><td>« Djamel et Malika racontent : nous sommes ___ ensemble. » (aller)</td></tr><tr><td>3</td><td>« Les candidates sont ___ à l'heure. » (arriver)</td></tr><tr><td>4</td><td>« La directrice est ___ nous rejoindre. » (venir)</td></tr><tr><td>5</td><td>« les documents que j'ai ___ » (envoyer)</td></tr><tr><td>6</td><td>« la lettre que j'ai ___ » (écrire)</td></tr></table><ol><li>Phrase n° 1 : écrivez le participe passé correct (aller).</li><li>Phrase n° 2 : écrivez le participe passé correct (aller).</li><li>Phrase n° 3 : écrivez le participe passé correct (arriver).</li><li>Phrase n° 4 : écrivez le participe passé correct (venir).</li><li>Phrase n° 5 : écrivez le participe passé correct (envoyer).</li><li>Phrase n° 6 : écrivez le participe passé correct (écrire).</li></ol><p>Répondez par la forme exacte du participe passé accordé. Écrivez en minuscules, sans ponctuation finale.</p>",
    "starter": "# Exercice — Accorder le participe passé au salon\n# Lisez l'énoncé complet ci-dessus, puis répondez à chaque question dans son bloc.\n# Une seule réponse par bloc : le participe passé accordé, sans ponctuation finale.\n\n[Question 1 — Le participe de la phrase n° 1 (aller)]\nA_COMPLETER\n\n[Question 2 — Le participe de la phrase n° 2 (aller)]\nA_COMPLETER\n\n[Question 3 — Le participe de la phrase n° 3 (arriver)]\nA_COMPLETER\n\n[Question 4 — Le participe de la phrase n° 4 (venir)]\nA_COMPLETER\n\n[Question 5 — Le participe de la phrase n° 5 (envoyer)]\nA_COMPLETER\n\n[Question 6 — Le participe de la phrase n° 6 (écrire)]\nA_COMPLETER\n",
    "hints": [
      "Avec être, le participe passé s'accorde comme un adjectif, en genre et en nombre avec le sujet : il est allé, elle est allée, ils sont allés, elles sont allées.",
      "Identifiez l'antécédent de chaque sujet : le je vaut Julie ; le nous vaut Djamel et Malika (un groupe mixte) ; les candidates sont féminines plurielles ; la directrice est une femme.",
      "Pour les phrases 5 et 6, le complément d'objet (que = les documents, la lettre) est placé AVANT le verbe : le participe passé s'accorde alors avec lui, comme le veut la règle du chapitre."
    ],
    "examples": [
      {
        "stdin": "Les accords d'un autre salon :\n1) « Marc : je suis allé voir le stand. » (Marc, un homme) → allé.\n2) « Sara et Lina : nous sommes allées ensemble. » (deux femmes) → allées.\n3) « Les visiteurs sont entrés à 9 heures. » → entrés.\n4) « les factures que j'ai réglées » (complément d'objet avant le verbe) → réglées.",
        "expected": "allé — allées — entrés — réglées",
        "note": "Avec être, le participe s'accorde comme un adjectif ; avec avoir, il s'accorde si le complément d'objet précède le verbe."
      }
    ],
    "tests": [
      {
        "label": "Question 1 — Le participe de la phrase n° 1 (aller)",
        "stdin": "q:1",
        "expected": "allée||allee"
      },
      {
        "label": "Question 2 — Le participe de la phrase n° 2 (aller)",
        "stdin": "q:2",
        "expected": "allés||alles"
      },
      {
        "label": "Question 3 — Le participe de la phrase n° 3 (arriver)",
        "stdin": "q:3",
        "expected": "arrivées||arrivees"
      },
      {
        "label": "Question 4 — Le participe de la phrase n° 4 (venir)",
        "stdin": "q:4",
        "expected": "venue"
      },
      {
        "label": "Question 5 — Le participe de la phrase n° 5 (envoyer)",
        "stdin": "q:5",
        "expected": "envoyés||envoyes"
      },
      {
        "label": "Question 6 — Le participe de la phrase n° 6 (écrire)",
        "stdin": "q:6",
        "expected": "écrite||ecrite"
      }
    ],
    "solution": "[Question 1 — Le participe de la phrase n° 1 (aller)]\nallée\n\n[Question 2 — Le participe de la phrase n° 2 (aller)]\nallés\n\n[Question 3 — Le participe de la phrase n° 3 (arriver)]\narrivées\n\n[Question 4 — Le participe de la phrase n° 4 (venir)]\nvenue\n\n[Question 5 — Le participe de la phrase n° 5 (envoyer)]\nenvoyés\n\n[Question 6 — Le participe de la phrase n° 6 (écrire)]\nécrite",
    "takeaway": "1) « Julie raconte : je suis allée au salon » : le je vaut Julie, une femme — allée, féminin singulier.\n2) « Djamel et Malika : nous sommes allés ensemble » : groupe mixte, masculin pluriel — allés.\n3) « Les candidates sont arrivées à l'heure » : sujet féminin pluriel — arrivées.\n4) « La directrice est venue nous rejoindre » : sujet féminin singulier — venue.\n5) « les documents que j'ai envoyés » : le complément d'objet que (= les documents) précède le verbe — envoyés, masculin pluriel.\n6) « la lettre que j'ai écrite » : le complément d'objet que (= la lettre) précède le verbe — écrite, féminin singulier.\nContrôle : les quatre premiers accords suivent le sujet (allée, allés, arrivées, venue) ; les deux derniers suivent le complément d'objet antéposé (envoyés, écrite)."
  },
  {
    "id": "fr-c6-e3",
    "chapter": 6,
    "level": "n3",
    "language": "analyse",
    "title": "Le bilan de stage d'Amina",
    "exampleTitle": "Exemple résolu — le bilan de stage d'un autre stagiaire",
    "goal": "Former les participes passés courants (familles -é, -u, -it, -i, -is, -ert) et accorder le participe avec le vous de politesse ou de groupe.",
    "brief": "<p><strong>Énoncé.</strong> Amina, stagiaire, rédige son bilan de stage. Elle vérifie ses participes passés et l'accord des phrases où elle s'adresse à ses interlocuteurs :</p><table><tr><th>N°</th><th>Point à compléter du bilan</th></tr><tr><td>1</td><td>« J'ai ___ l'initiative de reclasser les archives. » (participe passé de prendre)</td></tr><tr><td>2</td><td>« J'ai ___ l'accès du magasin aux livreurs. » (participe passé de ouvrir)</td></tr><tr><td>3</td><td>« J'ai ___ les consignes de la tutrice. » (participe passé de recevoir)</td></tr><tr><td>4</td><td>« Mesdames, vous êtes ___ avant la démonstration ! » (sortir, à un groupe de clientes)</td></tr><tr><td>5</td><td>« Monsieur Fall, vous êtes ___ avant la démonstration ! » (sortir, de politesse, à un homme seul)</td></tr><tr><td>6</td><td>« Amina et sa tutrice : elles sont ___ à la conférence. » (aller)</td></tr></table><ol><li>Écrivez le participe passé de « prendre ».</li><li>Écrivez le participe passé de « ouvrir ».</li><li>Écrivez le participe passé de « recevoir ».</li><li>Écrivez le participe passé de « sortir » accordé pour la phrase n° 4.</li><li>Écrivez le participe passé de « sortir » accordé pour la phrase n° 5.</li><li>Écrivez le participe passé de « aller » accordé pour la phrase n° 6.</li></ol><p>Répondez par la forme exacte du participe passé. Écrivez en minuscules, sans ponctuation finale.</p>",
    "starter": "# Exercice — Le bilan de stage d'Amina\n# Lisez l'énoncé complet ci-dessus, puis répondez à chaque question dans son bloc.\n# Une seule réponse par bloc : le participe passé, sans ponctuation finale.\n\n[Question 1 — Participe passé de prendre]\nA_COMPLETER\n\n[Question 2 — Participe passé de ouvrir]\nA_COMPLETER\n\n[Question 3 — Participe passé de recevoir]\nA_COMPLETER\n\n[Question 4 — Participe de sortir (phrase n° 4)]\nA_COMPLETER\n\n[Question 5 — Participe de sortir (phrase n° 5)]\nA_COMPLETER\n\n[Question 6 — Participe de aller (phrase n° 6)]\nA_COMPLETER\n",
    "hints": [
      "Les participes du chapitre se rangent par familles de terminaison : -é (comme travaillé), -u (comme connu), -it (comme dit), -i (comme dormi), -is (comme appris), -ert (comme découvert). Situez chaque verbe dans sa famille.",
      "Pour le vous, identifiez l'antécédent réel avant d'accorder : combien de personnes sont visées, et de quel genre ? Un groupe ne s'accorde pas comme le vous de politesse, qui vaut une seule personne.",
      "La phrase n° 6 parle de deux personnes ; regardez lesquelles : l'accord suit leur genre et leur nombre, comme un adjectif."
    ],
    "examples": [
      {
        "stdin": "Le bilan de stage d'un autre stagiaire :\n1) participe de « dire » → dit (famille -it).\n2) participe de « mettre » → mis (famille -is).\n3) participe de « offrir » → offert (famille -ert).\n4) « Vous êtes sortie, Madame ? » (vous de politesse, une femme) → sortie.",
        "expected": "dit — mis — offert — sortie",
        "note": "Les participes se rangent par familles (-it, -is, -ert) ; le vous de politesse s'accorde avec la personne visée."
      }
    ],
    "tests": [
      {
        "label": "Question 1 — Participe passé de prendre",
        "stdin": "q:1",
        "expected": "pris"
      },
      {
        "label": "Question 2 — Participe passé de ouvrir",
        "stdin": "q:2",
        "expected": "ouvert"
      },
      {
        "label": "Question 3 — Participe passé de recevoir",
        "stdin": "q:3",
        "expected": "reçu||recu"
      },
      {
        "label": "Question 4 — Participe de sortir (phrase n° 4)",
        "stdin": "q:4",
        "expected": "sorties"
      },
      {
        "label": "Question 5 — Participe de sortir (phrase n° 5)",
        "stdin": "q:5",
        "expected": "sorti"
      },
      {
        "label": "Question 6 — Participe de aller (phrase n° 6)",
        "stdin": "q:6",
        "expected": "allées||allees"
      }
    ],
    "solution": "[Question 1 — Participe passé de prendre]\npris\n\n[Question 2 — Participe passé de ouvrir]\nouvert\n\n[Question 3 — Participe passé de recevoir]\nreçu\n\n[Question 4 — Participe de sortir (phrase n° 4)]\nsorties\n\n[Question 5 — Participe de sortir (phrase n° 5)]\nsorti\n\n[Question 6 — Participe de aller (phrase n° 6)]\nallées",
    "takeaway": "1) « J'ai pris l'initiative » : le participe passé de prendre est pris (famille -is, comme appris, compris, mis).\n2) « J'ai ouvert l'accès du magasin » : le participe passé de ouvrir est ouvert (famille -ert, comme découvert, offert).\n3) « J'ai reçu les consignes » : le participe passé de recevoir est reçu (famille -u, comme eu, connu).\n4) « Mesdames, vous êtes sorties » : le vous désigne un groupe de clientes — féminin pluriel, sorties.\n5) « Monsieur Fall, vous êtes sorti » : le vous de politesse vaut un seul homme — masculin singulier, sorti.\n6) « Amina et sa tutrice : elles sont allées à la conférence » : sujet féminin pluriel — allées.\nContrôle : les trois premiers participes restent invariables (avoir, complément d'objet placé après) ; les trois derniers s'accordent avec être selon l'antécédent du sujet (groupe de femmes, homme seul, deux femmes)."
  }
];

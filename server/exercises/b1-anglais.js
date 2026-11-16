/**
 * Exercices mis à jour — remédiation pédagogique
 */
'use strict';

module.exports = [
  {
    "id": "en-c1-e1",
    "chapter": 1,
    "level": "n1",
    "language": "analyse",
    "title": "La réunion de lancement du portail Aurora",
    "exampleTitle": "Exemple résolu — la réunion de l'application Horizon",
    "goal": "Reconnaître les termes fondamentaux du business English dans les phrases réelles d'une réunion de projet.",
    "brief": "<p><strong>Énoncé.</strong> Leo vient d'être embauché comme développeur junior chez <strong>REVI Cloud</strong>, une société de services informatiques. Il assiste à sa première réunion de lancement : le déploiement du portail client <strong>Aurora</strong>. Sarah, la cheffe de projet, parle vite et emploie le vocabulaire des affaires. Leo prend des notes :</p><table><tr><th>N°</th><th>Phrase entendue dans la réunion</th></tr><tr><td>1</td><td>« The <strong>deadline</strong> for the first release is March 31. »</td></tr><tr><td>2</td><td>« Every <strong>stakeholder</strong> must attend the demo on Thursday. »</td></tr><tr><td>3</td><td>« Our <strong>budget</strong> for this project is 20 000 euros. »</td></tr><tr><td>4</td><td>« The <strong>UAT</strong> starts next week, with real users. »</td></tr><tr><td>5</td><td>« We will work in two-week <strong>sprints</strong>. »</td></tr><tr><td>6</td><td>« The <strong>deployment</strong> is planned for April. »</td></tr></table><ol><li>Quel terme (phrase 1) désigne la date finale pour finir le travail ?</li><li>Quel terme (phrase 2) désigne toute personne intéressée par le projet ?</li><li>Quel terme (phrase 3) désigne l'argent disponible ou prévu pour le projet ?</li><li>Quel sigle (phrase 4) désigne les tests de validation menés par de vrais utilisateurs ?</li><li>Quel terme (phrase 5) désigne une courte période de travail Agile, d'une à quatre semaines ?</li><li>Quel terme (phrase 6) désigne la mise en production du logiciel, pour que les gens puissent s'en servir ?</li></ol><p>Répondez par le terme anglais exact entendu dans la réunion : un seul mot ou un sigle.</p>",
    "starter": "# Exercice — La réunion de lancement du portail Aurora\n# Lisez l'énoncé complet ci-dessus, puis répondez à chaque question dans son bloc.\n# Répondez par le terme anglais exact (un seul mot ou un sigle).\n\n[Question 1 — La date finale pour finir le travail]\nA_COMPLETER\n\n[Question 2 — La personne intéressée par le projet]\nA_COMPLETER\n\n[Question 3 — L'argent disponible ou prévu pour le projet]\nA_COMPLETER\n\n[Question 4 — Les tests de validation par de vrais utilisateurs]\nA_COMPLETER\n\n[Question 5 — La courte période de travail Agile]\nA_COMPLETER\n\n[Question 6 — La mise en production du logiciel]\nA_COMPLETER\n",
    "hints": [
      "Relisez les définitions du chapitre : chaque phrase de Sarah ne contient qu'un terme de vocabulaire, et la réponse est ce mot-là.",
      "Classez les idées : une date finale, une personne intéressée, une somme d'argent — trois notions du vocabulaire général des affaires.",
      "Les phrases 4 à 6 relèvent du vocabulaire informatique du cours : les tests par de vrais utilisateurs, les périodes de travail Agile courtes, la mise à disposition du logiciel."
    ],
    "examples": [
      {
        "stdin": "Autre réunion : le développement de l'application mobile Horizon.\n1) « The frontend is ready : users can click and navigate. » — quelle partie les utilisateurs voient-ils ?\n2) « The backend stores the data on our servers. » — quelle partie est invisible ?\n3) « Let's fix the low-hanging fruit first. » — que désigne-t-on ?\n\nRéponses :\n1) La partie visible (ce que l'on voit et clique) est le frontend.\n2) La partie invisible (serveurs, bases de données) est le backend.\n3) Les low-hanging fruit sont les easy wins : les gains faciles à récolter en premier.",
        "expected": "frontend — backend — easy wins",
        "note": "Frontend (ce que l'utilisateur voit et clique) et backend (la partie invisible : serveurs, bases de données) se répondent ; les low-hanging fruit sont les gains faciles."
      }
    ],
    "tests": [
      {
        "label": "Question 1 — La date finale pour finir le travail",
        "stdin": "q:1",
        "expected": "deadline||la deadline"
      },
      {
        "label": "Question 2 — La personne intéressée par le projet",
        "stdin": "q:2",
        "expected": "stakeholder||a stakeholder"
      },
      {
        "label": "Question 3 — L'argent disponible ou prévu",
        "stdin": "q:3",
        "expected": "budget||the budget"
      },
      {
        "label": "Question 4 — Les tests par de vrais utilisateurs",
        "stdin": "q:4",
        "expected": "uat"
      },
      {
        "label": "Question 5 — La courte période de travail Agile",
        "stdin": "q:5",
        "expected": "sprint||a sprint||the sprint"
      },
      {
        "label": "Question 6 — La mise en production du logiciel",
        "stdin": "q:6",
        "expected": "deployment||the deployment"
      }
    ],
    "solution": "[Question 1 — La date finale pour finir le travail]\ndeadline\n\n[Question 2 — La personne intéressée par le projet]\nstakeholder\n\n[Question 3 — L'argent disponible ou prévu pour le projet]\nbudget\n\n[Question 4 — Les tests de validation par de vrais utilisateurs]\nuat\n\n[Question 5 — La courte période de travail Agile]\nsprint\n\n[Question 6 — La mise en production du logiciel]\ndeployment",
    "takeaway": "1) La date finale pour finir le travail est le deadline : « The deadline for the first release is March 31 » — ce n'est pas un happy word, il est stressful.\n2) Toute personne intéressée par le projet (client, chef, équipe) est un stakeholder : « Every stakeholder must attend the demo ».\n3) L'argent disponible ou prévu est le budget : 20 000 euros ici.\n4) Les tests de validation menés par de vrais utilisateurs sont l'UAT (User Acceptance Testing) — pas un simple test interne.\n5) La courte période de travail Agile (une à quatre semaines) est le sprint : « two-week sprints ».\n6) La mise en production du logiciel, pour que les gens puissent s'en servir, est le deployment.\nContrôle : ces six termes font partie des dix mots de base du chapitre 1 ; les quatre autres (client, customer, backend, frontend) sont illustrés dans l'exemple résolu."
  },
  {
    "id": "en-c1-e2",
    "chapter": 1,
    "level": "n1",
    "language": "analyse",
    "title": "Client ou customer ? Le fichier contacts de la société Lumen",
    "exampleTitle": "Exemple résolu — le carnet de la boutique de vélos",
    "goal": "Choisir entre client et customer selon la relation commerciale, puis employer les expressions idiomatiques du cours.",
    "brief": "<p><strong>Énoncé.</strong> La société <strong>Lumen</strong>, spécialisée dans l'assistance informatique, demande à Leo de trier son fichier contacts. La règle du cours : un <strong>client</strong> entretient une relation longue (long-term relationship) ; un <strong>customer</strong> fait un achat ponctuel (one-time purchase). Le fichier du jour :</p><table><tr><th>N°</th><th>Contact</th><th>Situation commerciale</th></tr><tr><td>1</td><td>BetaSoft</td><td>Contrat de maintenance de trois ans, renouvelé chaque année</td></tr><tr><td>2</td><td>M. Diallo</td><td>Achat unique d'une licence en 2023, jamais recontacté</td></tr><tr><td>3</td><td>Mairie de Rivière-Blanche</td><td>Partenaire depuis dix ans, facturation mensuelle</td></tr><tr><td>4</td><td>Mme Roche</td><td>Achat ponctuel d'un pack de cinq heures d'assistance</td></tr></table><p>En fin de journée, Sarah résume à Leo : « I'll <strong>touch base</strong> with the team tomorrow, and we should start with the <strong>low-hanging fruit</strong> of this list. »</p><ol><li>BetaSoft est un client ou un customer ?</li><li>M. Diallo est un client ou un customer ?</li><li>La mairie de Rivière-Blanche est un client ou un customer ?</li><li>Mme Roche est un client ou un customer ?</li><li>Complétez la phrase de Sarah : « I'll ___ ___ with the team tomorrow » (être brièvement en contact). Répondez par les deux mots.</li><li>Que désignent les « low-hanging fruit » de la liste ? Répondez en anglais par deux mots.</li></ol><p>Pour les questions 1 à 4, répondez par le mot anglais exact : client ou customer.</p>",
    "starter": "# Exercice — Client ou customer ? Le fichier contacts de la société Lumen\n# Lisez l'énoncé complet ci-dessus, puis répondez à chaque question dans son bloc.\n# Questions 1 à 4 : répondez par client ou customer ; questions 5 et 6 : en anglais.\n\n[Question 1 — BetaSoft]\nA_COMPLETER\n\n[Question 2 — M. Diallo]\nA_COMPLETER\n\n[Question 3 — Mairie de Rivière-Blanche]\nA_COMPLETER\n\n[Question 4 — Mme Roche]\nA_COMPLETER\n\n[Question 5 — L'expression à deux mots pour « être brièvement en contact »]\nA_COMPLETER\n\n[Question 6 — Ce que désignent les low-hanging fruit (deux mots anglais)]\nA_COMPLETER\n",
    "hints": [
      "La distinction ne dépend pas du montant : celui qui revient et signe des contrats est un client, celui qui achète une fois puis disparaît est un customer.",
      "Pour les questions 5 et 6, relisez les trois expressions du chapitre : touch base, get the ball rolling, low-hanging fruit.",
      "L'expression de la question 5 remplace « I'll contact you » ; celle de la question 6 se traduit en français par « les gains faciles »."
    ],
    "examples": [
      {
        "stdin": "Une boutique de vélos trie son carnet :\n1) Vélo Club du Lac : abonnement d'entretien annuel depuis cinq ans.\n2) M. Perrin : un seul passage, une chambre à air achetée en 2022.\n3) Le gérant lance la réunion : « Let's get the ball rolling. »\n\nRéponses :\n1) Relation longue : le Vélo Club du Lac est un client.\n2) Achat unique : M. Perrin est un customer.\n3) « Get the ball rolling » signifie commencer (to start) — la phrase remplace « Let's start ».",
        "expected": "client — customer — to start",
        "note": "La relation fait le client : l'abonnement annuel crée la relation longue, l'achat unique laisse un customer. « Get the ball rolling » remplace « start »."
      }
    ],
    "tests": [
      {
        "label": "Question 1 — BetaSoft",
        "stdin": "q:1",
        "expected": "client||a client"
      },
      {
        "label": "Question 2 — M. Diallo",
        "stdin": "q:2",
        "expected": "customer||a customer"
      },
      {
        "label": "Question 3 — Mairie de Rivière-Blanche",
        "stdin": "q:3",
        "expected": "client||a client"
      },
      {
        "label": "Question 4 — Mme Roche",
        "stdin": "q:4",
        "expected": "customer||a customer"
      },
      {
        "label": "Question 5 — L'expression à deux mots (touch base)",
        "stdin": "q:5",
        "expected": "touch base||touchbase"
      },
      {
        "label": "Question 6 — Ce que désignent les low-hanging fruit",
        "stdin": "q:6",
        "expected": "easy wins||the easy wins||easy win"
      }
    ],
    "solution": "[Question 1 — BetaSoft]\nclient\n\n[Question 2 — M. Diallo]\ncustomer\n\n[Question 3 — Mairie de Rivière-Blanche]\nclient\n\n[Question 4 — Mme Roche]\ncustomer\n\n[Question 5 — L'expression à deux mots pour « être brièvement en contact »]\ntouch base\n\n[Question 6 — Ce que désignent les low-hanging fruit (deux mots anglais)]\neasy wins",
    "takeaway": "1) BetaSoft entretient une relation de trois ans renouvelée chaque année : c'est un client (long-term relationship).\n2) M. Diallo a acheté une licence une seule fois et n'a jamais été recontacté : c'est un customer (one-time purchase).\n3) La mairie est partenaire depuis dix ans avec une facturation mensuelle : relation longue, c'est un client.\n4) Mme Roche a acheté un pack unique de cinq heures : achat ponctuel, c'est une customer.\n5) « I'll touch base with the team tomorrow » : touch base signifie contacter brièvement ; la phrase remplace « I'll contact you ».\n6) Les low-hanging fruit sont les easy wins : les gains faciles à récolter en premier.\nContrôle : le fichier compte deux clients (BetaSoft, la mairie) et deux customers (M. Diallo, Mme Roche) — le tri est équilibré, la règle s'applique sans exception."
  },
  {
    "id": "en-c1-e3",
    "chapter": 1,
    "level": "n2",
    "language": "analyse",
    "title": "Les faux amis du rapport d'avancement de Zoe",
    "exampleTitle": "Exemple résolu — le message de Marc",
    "goal": "Détecter les faux amis français-anglais dans un rapport réel et les corriger mot par mot.",
    "brief": "<p><strong>Énoncé.</strong> Zoe, collègue francophone de Leo, rédige son premier rapport d'avancement en anglais. Son responsable la comprend de travers : des faux amis se sont glissés dans le texte. Extrait numéroté du rapport :</p><table><tr><th>N°</th><th>Phrase du rapport</th><th>Ce que Zoe voulait dire</th></tr><tr><td>1</td><td>« Actually, the server is down. »</td><td>« Actuellement, le serveur est en panne. »</td></tr><tr><td>2</td><td>« The patch will eventually be ready tonight. »</td><td>« Le correctif sera éventuellement prêt ce soir. »</td></tr><tr><td>3</td><td>« I bought the new manual at the library. »</td><td>Zoe a acheté le manuel dans un magasin.</td></tr><tr><td>4</td><td>« The intern is gonna write the summary. »</td><td>Phrase à corriger pour un rapport professionnel.</td></tr></table><p>Rappel du cours : <strong>actually</strong> signifie « en fait » (et non « actuellement ») ; <strong>eventually</strong> signifie « finalement » (et non « éventuellement ») ; <strong>library</strong> désigne un lieu où l'on emprunte, pas un magasin.</p><ol><li>Phrase 1 : quel mot remplace « actually » pour dire « actuellement » ?</li><li>Phrase 2 : quel mot remplace « eventually » pour dire « éventuellement » ?</li><li>Phrase 3 : dans quel magasin Zoe a-t-elle réellement acheté le manuel ? Répondez par le mot anglais (une seule correction possible).</li><li>Que signifie réellement « library » ? Répondez en français par un mot.</li><li>Que signifie « actually » ? Répondez en français par deux mots.</li><li>Phrase 4 : la réduction « gonna » n'a pas sa place dans un rapport. Quel registre a-t-elle : business ou casual ?</li></ol><p>Répondez en anglais aux questions 1 à 3, en français aux questions 4 et 5, et par business ou casual à la question 6.</p>",
    "starter": "# Exercice — Les faux amis du rapport d'avancement de Zoe\n# Lisez l'énoncé complet ci-dessus, puis répondez à chaque question dans son bloc.\n# Questions 1 à 3 : en anglais ; questions 4 et 5 : en français ; question 6 : business ou casual.\n\n[Question 1 — Le mot qui remplace « actually » pour dire « actuellement »]\nA_COMPLETER\n\n[Question 2 — Le mot qui remplace « eventually » pour dire « éventuellement »]\nA_COMPLETER\n\n[Question 3 — Le magasin où Zoe a acheté le manuel]\nA_COMPLETER\n\n[Question 4 — Le sens réel de « library » (en français, un mot)]\nA_COMPLETER\n\n[Question 5 — Le sens réel de « actually » (en français, deux mots)]\nA_COMPLETER\n\n[Question 6 — Le registre de « gonna » (business ou casual)]\nA_COMPLETER\n",
    "hints": [
      "Les trois faux amis du cours sont actually, eventually et library : comparez ce que Zoe voulait dire avec ce que chaque mot anglais signifie vraiment.",
      "« Actuellement » et « éventuellement » ont chacun leur équivalent anglais propre : l'un est un mot proche du français courant, l'autre exprime la possibilité (peut-être).",
      "Pour library, le piège est le lieu : on y emprunte, on n'y achète pas. Pour gonna, demandez-vous si le mot peut figurer dans un rapport officiel."
    ],
    "examples": [
      {
        "stdin": "Message de Marc, un autre stagiaire :\n1) « The test phase is currently on hold. » — que signifie « currently » en français ?\n2) « The update will eventually fix the bug. » — que signifie « eventually » en français ?\n\nRéponses :\n1) Currently signifie « actuellement ».\n2) Eventually signifie « finalement » : la mise à jour réparera le bug à la fin, c'est certain — pas une simple possibilité.",
        "expected": "currently = actuellement — eventually = finalement",
        "note": "Un mot vrai peut en cacher un autre : « currently » traduit « actuellement », mais « eventually » dit « finalement », avec une idée d'aboutissement."
      }
    ],
    "tests": [
      {
        "label": "Question 1 — actually remplacé par actuellement",
        "stdin": "q:1",
        "expected": "currently"
      },
      {
        "label": "Question 2 — eventually remplacé par éventuellement",
        "stdin": "q:2",
        "expected": "possibly||maybe||perhaps"
      },
      {
        "label": "Question 3 — Le magasin où Zoe a acheté le manuel",
        "stdin": "q:3",
        "expected": "bookshop||a bookshop||the bookshop"
      },
      {
        "label": "Question 4 — Le sens réel de library",
        "stdin": "q:4",
        "expected": "bibliothèque||la bibliothèque||une bibliothèque"
      },
      {
        "label": "Question 5 — Le sens réel de actually",
        "stdin": "q:5",
        "expected": "en fait||in fact||en réalité"
      },
      {
        "label": "Question 6 — Le registre de gonna",
        "stdin": "q:6",
        "expected": "casual||familier||informal||informel"
      }
    ],
    "solution": "[Question 1 — Le mot qui remplace « actually » pour dire « actuellement »]\ncurrently\n\n[Question 2 — Le mot qui remplace « eventually » pour dire « éventuellement »]\npossibly\n\n[Question 3 — Le magasin où Zoe a acheté le manuel]\nbookshop\n\n[Question 4 — Le sens réel de « library » (en français, un mot)]\nbibliothèque\n\n[Question 5 — Le sens réel de « actually » (en français, deux mots)]\nen fait\n\n[Question 6 — Le registre de « gonna » (business ou casual)]\ncasual",
    "takeaway": "1) Pour dire « actuellement », l'anglais dit currently : « Currently, the server is down ». Actually signifie « en fait » et déclenche ici un contresens.\n2) Pour dire « éventuellement » (une simple possibilité), l'anglais dit possibly (ou maybe / perhaps) : « The patch will possibly be ready tonight ». Eventually signifie « finalement ».\n3) Zoe a acheté le manuel dans une librairie : a bookshop — « I bought the new manual at the bookshop. »\n4) Une library est une bibliothèque : un lieu où l'on emprunte des livres, pas un magasin. Dire « I work in a library » suggère que l'on garde des livres, pas qu'on les vend.\n5) Actually signifie « en fait » : il sert à corriger une idée reçue (« Actually, it works » = « en fait, ça marche »).\n6) « Gonna » est casual : registre familier de la parole, interdit dans un rapport professionnel — la forme complète est going to (voir le chapitre 5).\nContrôle : les trois faux amis du cours (actually, eventually, library) sont corrigés chacun d'une seule façon, et la réduction gonna est identifiée comme casual."
  },
  {
    "id": "en-c2-e1",
    "chapter": 2,
    "level": "n1",
    "language": "analyse",
    "title": "L'anatomie de l'email de Zoe à son directeur",
    "exampleTitle": "Exemple résolu — l'invitation à la formation de Marc",
    "goal": "Étiqueter les cinq parties d'un email professionnel et mobiliser la méthode CLEAR.",
    "brief": "<p><strong>Énoncé.</strong> Zoe doit obtenir l'approbation d'une mise à niveau de serveur (server upgrade). Elle écrit à son directeur, M. Smith, en suivant le modèle du cours. Son email, ligne par ligne :</p><table><tr><th>N°</th><th>Ligne de l'email</th></tr><tr><td>1</td><td>Subject: Q3 Budget Update – Action Needed by Friday</td></tr><tr><td>2</td><td>Dear Mr. Smith,</td></tr><tr><td>3</td><td>I am writing to request approval for a server upgrade. The current server is slow and the team loses time every week. The upgrade costs 5 000 euros and would be installed in June. I need your approval by Friday. Could you please confirm the budget this week ? Thank you for your time.</td></tr><tr><td>4</td><td>Best regards,</td></tr><tr><td>5</td><td>Zoe Martin, IT Project Manager, REVI Cloud</td></tr></table><p>Rappel du cours : un email professionnel compte cinq parties, et le corps du message suit la méthode <strong>CLEAR</strong> (Context, Logistics, Expectation, Action, Respect).</p><ol><li>Comment s'appelle la partie n° 1 ? Répondez en anglais par deux mots.</li><li>Comment s'appelle la partie n° 2 (« Dear Mr. Smith, ») ? Répondez en anglais par un mot.</li><li>Comment s'appelle la partie n° 3, le message lui-même ? Répondez en anglais par un mot.</li><li>Comment s'appelle la partie n° 4 (« Best regards, ») ? Répondez en anglais par un mot.</li><li>Comment s'appelle la partie n° 5 (nom, fonction, société) ? Répondez en anglais par un mot.</li><li>Dans la méthode CLEAR, que signifie la lettre C ?</li></ol><p>Répondez en anglais, par un mot (deux pour la question 1).</p>",
    "starter": "# Exercice — L'anatomie de l'email de Zoe à son directeur\n# Lisez l'énoncé complet ci-dessus, puis répondez à chaque question dans son bloc.\n# Répondez en anglais, par un mot (deux pour la question 1).\n\n[Question 1 — La partie n° 1 de l'email]\nA_COMPLETER\n\n[Question 2 — La partie n° 2 (« Dear Mr. Smith, »)]\nA_COMPLETER\n\n[Question 3 — La partie n° 3, le message lui-même]\nA_COMPLETER\n\n[Question 4 — La partie n° 4 (« Best regards, »)]\nA_COMPLETER\n\n[Question 5 — La partie n° 5 (nom, fonction, société)]\nA_COMPLETER\n\n[Question 6 — La lettre C de la méthode CLEAR]\nA_COMPLETER\n",
    "hints": [
      "L'ordre des cinq parties est fixe : objet, formule d'appel, message, formule de congé, carte de visite finale — l'email se lit comme un formulaire en cinq cases.",
      "Chaque réponse est un mot du vocabulaire du chapitre (le premier en demande deux) : ceux qui décrivent la structure S-S-B-C-S.",
      "Pour la lettre C de CLEAR, relisez la première phrase du corps : « I am writing to request approval » — pourquoi Zoe écrit-elle ?"
    ],
    "examples": [
      {
        "stdin": "Marc invite sa responsable, Mme Lee, à une formation sécurité :\n1) Subject: Security Training – Please Register by Monday\n2) Hello Ms. Lee,\n3) The security training takes place on May 12 in room B. I would like you to register before Monday. Thank you.\n4) Kind regards,\n5) Marc Dupont, Junior Developer\n\nÉtiquetage :\n1) La ligne d'objet : subject line.\n2) La formule d'appel : salutation (semi-formelle, pour une responsable connue).\n3) La formule de congé : closing.\n4) Dans CLEAR, la phrase « I would like you to register before Monday » exprime ce que Marc attend : Expectation.",
        "expected": "subject line — salutation — closing — expectation",
        "note": "Semi-formel (Hello Ms. Lee) pour une responsable connue ; la lettre E de CLEAR énonce ce que l'émetteur attend (what do you need)."
      }
    ],
    "tests": [
      {
        "label": "Question 1 — La partie n° 1",
        "stdin": "q:1",
        "expected": "subject line||the subject line"
      },
      {
        "label": "Question 2 — La partie n° 2",
        "stdin": "q:2",
        "expected": "salutation||greeting||la salutation"
      },
      {
        "label": "Question 3 — La partie n° 3",
        "stdin": "q:3",
        "expected": "body||le body||corps||le corps"
      },
      {
        "label": "Question 4 — La partie n° 4",
        "stdin": "q:4",
        "expected": "closing||le closing"
      },
      {
        "label": "Question 5 — La partie n° 5",
        "stdin": "q:5",
        "expected": "signature||la signature"
      },
      {
        "label": "Question 6 — La lettre C de CLEAR",
        "stdin": "q:6",
        "expected": "context||le context"
      }
    ],
    "solution": "[Question 1 — La partie n° 1 de l'email]\nsubject line\n\n[Question 2 — La partie n° 2 (« Dear Mr. Smith, »)]\nsalutation\n\n[Question 3 — La partie n° 3, le message lui-même]\nbody\n\n[Question 4 — La partie n° 4 (« Best regards, »)]\nclosing\n\n[Question 5 — La partie n° 5 (nom, fonction, société)]\nsignature\n\n[Question 6 — La lettre C de la méthode CLEAR]\ncontext",
    "takeaway": "1) La partie n° 1 est la subject line : l'objet. Elle est « make or break » — ici le format gagnant du cours : sujet (Q3 Budget Update) + action (Action Needed) + échéance (by Friday).\n2) La partie n° 2 est la salutation : « Dear Mr. Smith, » convient au destinataire formel (directeur).\n3) La partie n° 3 est le body : le corps du message, structuré par la méthode CLEAR.\n4) La partie n° 4 est le closing : « Best regards, » est le closing standard du cours.\n5) La partie n° 5 est la signature : nom (Zoe Martin), fonction (IT Project Manager), société (REVI Cloud) — jamais d'emoji ni de citation.\n6) La lettre C de CLEAR signifie Context : pourquoi j'écris (« I am writing to request approval for a server upgrade »).\nLes autres lettres se lisent dans le corps : L = Logistics (coût de 5 000 euros, installation en juin), E = Expectation (approval by Friday), A = Action (Could you please confirm this week ?), R = Respect (Thank you for your time)."
  },
  {
    "id": "en-c2-e2",
    "chapter": 2,
    "level": "n2",
    "language": "analyse",
    "title": "Le premier email du stagiaire au client",
    "exampleTitle": "Exemple résolu — le message à la fournisseur",
    "goal": "Corriger un email trop familier : objet, salutation, ton, structure verbale et formule finale.",
    "brief": "<p><strong>Énoncé.</strong> Marc, stagiaire chez REVI Cloud, envoie son premier email à un nouveau client, M. Brown. Son responsable le récupère avant l'envoi et compte les fautes. L'email de Marc :</p><table><tr><th>N°</th><th>Ligne de l'email</th></tr><tr><td>1</td><td>Subject: (aucun objet)</td></tr><tr><td>2</td><td>Yo Mr. Brown,</td></tr><tr><td>3</td><td>I got your message about the server. I'm gonna check it soon. I look forward to hear from you.</td></tr><tr><td>4</td><td>Cheers,</td></tr></table><p>Chaque ligne contient une seule erreur à corriger, avec une seule correction possible d'après le cours.</p><ol><li>Ligne 1 : l'objet manque. Comment s'appelle cette partie indispensable de l'email ? Répondez en anglais par deux mots.</li><li>Ligne 2 : quel mot de salutation formelle remplace « Yo » ? (un seul mot)</li><li>Ligne 3 : « I got your message » est trop familier. Quel verbe plus formel remplace « got » ?</li><li>Ligne 3 : « I'm gonna check it » : quelle est la forme complète et professionnelle de « gonna » ?</li><li>Ligne 3 : « I look forward to hear from you » contient une erreur de structure : quelle est la forme correcte du verbe après « look forward to » ?</li><li>Ligne 4 : « Cheers » est trop familier. Quel closing standard du cours faut-il employer ?</li></ol><p>Répondez en anglais, par un mot ou une expression courte.</p>",
    "starter": "# Exercice — Le premier email du stagiaire au client\n# Lisez l'énoncé complet ci-dessus, puis répondez à chaque question dans son bloc.\n# Répondez en anglais, par un mot ou une expression courte.\n\n[Question 1 — La partie manquante de la ligne 1]\nA_COMPLETER\n\n[Question 2 — Le mot de salutation formelle qui remplace « Yo »]\nA_COMPLETER\n\n[Question 3 — Le verbe formel qui remplace « got »]\nA_COMPLETER\n\n[Question 4 — La forme complète de « gonna »]\nA_COMPLETER\n\n[Question 5 — La forme correcte du verbe après « look forward to »]\nA_COMPLETER\n\n[Question 6 — Le closing standard qui remplace « Cheers »]\nA_COMPLETER\n",
    "hints": [
      "Pour un nouveau client, le cours exige le registre formel : salutation en Dear, closing sobre, ton sans réduction.",
      "« Got » appartient à la langue parlée : le registre écrit formel emploie un verbe d'une autre famille pour « recevoir ».",
      "Après « look forward to », le verbe se comporte comme après une préposition ; le closing standard du cours s'écrit en deux mots."
    ],
    "examples": [
      {
        "stdin": "Message de Léa à une fournisseur, Mme Leclerc :\n« Hi Mme Leclerc,\nI wanna confirm our meeting on Thursday. I look forward to meet you.\nSee you,\nLéa »\n\nCorrections :\n1) « Wanna » est familier : la forme complète est want to — « I want to confirm our meeting ».\n2) « I look forward to meet you » : après « look forward to », le verbe prend la forme en -ing : meeting.\n3) « See you » est trop familier : le closing standard est Best regards.",
        "expected": "want to — meeting — best regards",
        "note": "Deux réflexes suffisent à sauver un email : la forme complète des réductions, et le verbe en -ing après « look forward to »."
      }
    ],
    "tests": [
      {
        "label": "Question 1 — La partie manquante (l'objet)",
        "stdin": "q:1",
        "expected": "subject line||the subject line"
      },
      {
        "label": "Question 2 — La salutation formelle",
        "stdin": "q:2",
        "expected": "dear||dear mr brown||dear mr. brown"
      },
      {
        "label": "Question 3 — Le verbe formel pour « got »",
        "stdin": "q:3",
        "expected": "received"
      },
      {
        "label": "Question 4 — La forme complète de gonna",
        "stdin": "q:4",
        "expected": "going to||i'm going to||im going to||i am going to"
      },
      {
        "label": "Question 5 — La forme correcte après look forward to",
        "stdin": "q:5",
        "expected": "hearing"
      },
      {
        "label": "Question 6 — Le closing standard",
        "stdin": "q:6",
        "expected": "best regards||best regards,||best regards."
      }
    ],
    "solution": "[Question 1 — La partie manquante de la ligne 1]\nsubject line\n\n[Question 2 — Le mot de salutation formelle qui remplace « Yo »]\ndear\n\n[Question 3 — Le verbe formel qui remplace « got »]\nreceived\n\n[Question 4 — La forme complète de « gonna »]\ngoing to\n\n[Question 5 — La forme correcte du verbe après « look forward to »]\nhearing\n\n[Question 6 — Le closing standard qui remplace « Cheers »]\nbest regards",
    "takeaway": "1) La partie manquante est la subject line : sans objet informatif (sujet + action + échéance), le message est ignoré ou pris pour un spam.\n2) Pour un nouveau client, la salutation formelle est « Dear » : « Dear Mr. Brown, » — jamais « Yo », « Hey » ni « Hi » dans ce cas.\n3) « I got your message » devient « I received your message » : received est le verbe formel de la réception, got est parlé.\n4) « I'm gonna check it » devient « I'm going to check it » : la réduction gonna n'existe pas à l'écrit professionnel.\n5) « I look forward to hear from you » devient « I look forward to hearing from you » : après « look forward to », le verbe prend la forme en -ing.\n6) « Cheers » devient « Best regards, » : le closing standard du cours (Kind regards est plus amical, Sincerely plus formel).\nContrôle : les six corrections sont uniques — c'est le test du destinataire : M. Brown juge l'email, donc registre formel intégral."
  },
  {
    "id": "en-c2-e3",
    "chapter": 2,
    "level": "n3",
    "language": "analyse",
    "title": "La « reply all » catastrophe de Zoe",
    "exampleTitle": "Exemple résolu — la requête polie de Karim",
    "goal": "Analyser une catastrophe d'email : réponse massive, registre, vocabulaire vague et réécriture.",
    "brief": "<p><strong>Énoncé.</strong> Le serveur de REVI Cloud a du retard. Zoe, énervée, répond à l'email d'équipe... avec le mauvais bouton. <strong>200 personnes</strong> reçoivent son message :</p><table><tr><th>N°</th><th>Extrait du message de Zoe</th></tr><tr><td>1</td><td>Objet : Re: Server update — envoyé à 200 destinataires</td></tr><tr><td>2</td><td>« Hey guys, the server thing is late lol. Not my fault. »</td></tr><tr><td>3</td><td>« thx »</td></tr></table><p>Le cours réécrit ce désastre ainsi : « Dear team, the <strong>deadline</strong> for the report is tomorrow. Thank you for your efforts. »</p><ol><li>Quel bouton, décrit comme « une arme » par le cours, a envoyé ce message à 200 personnes ? Répondez en anglais par deux mots.</li><li>« lol » et « thx » relèvent de quel registre : business ou casual ?</li><li>« The server thing is late » : le mot « thing » est trop vague. Quel terme précis du cours désigne la mise en production du serveur ?</li><li>Dans la réécriture du cours, quelle formule complète remplace « thx » ?</li><li>Complétez la réécriture : « Dear team, the ___ for the report is tomorrow. »</li></ol><p>Répondez en anglais, par un mot ou une expression courte.</p>",
    "starter": "# Exercice — La « reply all » catastrophe de Zoe\n# Lisez l'énoncé complet ci-dessus, puis répondez à chaque question dans son bloc.\n# Répondez en anglais, par un mot ou une expression courte.\n\n[Question 1 — Le bouton qui a envoyé le message à 200 personnes]\nA_COMPLETER\n\n[Question 2 — Le registre de « lol » et « thx » (business ou casual)]\nA_COMPLETER\n\n[Question 3 — Le terme précis qui remplace « thing »]\nA_COMPLETER\n\n[Question 4 — La formule complète qui remplace « thx »]\nA_COMPLETER\n\n[Question 5 — Le mot manquant dans la réécriture]\nA_COMPLETER\n",
    "hints": [
      "Le cours consacre trois disasters : l'objet vide, le bouton qui répond à tous, l'email trop casual — Zoe cumule les trois.",
      "Pour la question 3, remplacez le mot vague par le terme informatique exact du chapitre 1 : la mise à disposition du logiciel.",
      "La réécriture du cours reprend le vocabulaire du chapitre 1 : la date limite du travail, et la formule de remerciement complète."
    ],
    "examples": [
      {
        "stdin": "Message de Karim au service comptabilité :\n« Hello team,\nThe invoice is ready. I would appreciate it if you could check it before Friday.\nKind regards,\nKarim »\n\nAnalyse :\n1) La salutation « Hello team, » est semi-formelle : correcte pour des collègues.\n2) « I would appreciate it if you could check it » est la formule de requête polie du cours, adaptée aux clients.\n3) « Kind regards, » est le closing amical du cours.",
        "expected": "salutation — requête polie — kind regards",
        "note": "Le ton se règle par formules : Hello pour un collègue, « I would appreciate it if you could » pour une requête polie, Kind regards pour un closing amical."
      }
    ],
    "tests": [
      {
        "label": "Question 1 — Le bouton qui répond à tous",
        "stdin": "q:1",
        "expected": "reply all||reply-all||replyall"
      },
      {
        "label": "Question 2 — Le registre de lol et thx",
        "stdin": "q:2",
        "expected": "casual||familier||informal||informel"
      },
      {
        "label": "Question 3 — Le terme précis pour « thing »",
        "stdin": "q:3",
        "expected": "deployment||the deployment"
      },
      {
        "label": "Question 4 — La formule qui remplace thx",
        "stdin": "q:4",
        "expected": "thank you||thanks||thank you for your efforts||thank you.||thanks."
      },
      {
        "label": "Question 5 — Le mot manquant dans la réécriture",
        "stdin": "q:5",
        "expected": "deadline||the deadline"
      }
    ],
    "solution": "[Question 1 — Le bouton qui a envoyé le message à 200 personnes]\nreply all\n\n[Question 2 — Le registre de « lol » et « thx » (business ou casual)]\ncasual\n\n[Question 3 — Le terme précis qui remplace « thing »]\ndeployment\n\n[Question 4 — La formule complète qui remplace « thx »]\nthank you\n\n[Question 5 — Le mot manquant dans la réécriture]\ndeadline",
    "takeaway": "1) Le bouton « reply all » (répondre à tous) : le cours le décrit comme une arme (« Reply all is a weapon. Use carefully. ») — ici, 200 destinataires reçoivent l'agacement de Zoe.\n2) « lol » et « thx » sont casual : registre familial de la messagerie privée, jamais dans un email professionnel.\n3) « The server thing is late » devient « The deployment is late » : deployment est le terme exact pour la mise en production (releasing software so people can use it).\n4) « thx » devient « Thank you for your efforts. » : la formule complète du R de CLEAR (Respect).\n5) « Dear team, the deadline for the report is tomorrow. » : le mot est deadline, la date finale pour finir le travail.\nContrôle : l'objet d'origine (« Re: Server update ») était correct ; le désastre venait du bouton, du registre et du vocabulaire vague."
  },
  {
    "id": "en-c3-e1",
    "chapter": 3,
    "level": "n1",
    "language": "analyse",
    "title": "Cinq minutes devant M. Tanaka : le plan de Leo",
    "exampleTitle": "Exemple résolu — la présentation de la sauvegarde de Sam",
    "goal": "Maîtriser la structure en trois parties d'une présentation : durées, hook, roadmap et closing.",
    "brief": "<p><strong>Énoncé.</strong> Leo doit présenter la mise à jour du serveur à <strong>M. Tanaka</strong>, un client, en cinq minutes. Paniqué (« So, like, basically, um... »), il prépare son plan avec la règle du cours : <strong>« tell them, tell them, tell them »</strong> — dire ce qu'on va dire, le dire, dire ce qu'on a dit. Son planning :</p><table><tr><th>Partie</th><th>Durée</th><th>Contenu</th></tr><tr><td>Opening</td><td>30 secondes</td><td>« Have you ever lost an hour of work because of a crash ? » puis : « Today I'll explain the problem, the solution, and the result. »</td></tr><tr><td>Body</td><td>2 minutes</td><td>Le problème, la cause, la correction — reliés par des transitions (First... Next... Finally...)</td></tr><tr><td>Closing</td><td>30 secondes</td><td>« To sum up, we had a crash, we fixed it, and now everything works. Please restart your computers tonight. »</td></tr></table><ol><li>Combien de parties structurent la présentation de Leo ?</li><li>Comment s'appelle la question d'accroche « Have you ever lost an hour of work because of a crash ? » ? Répondez en anglais par un mot.</li><li>Comment s'appelle l'annonce du plan « Today I'll explain the problem, the solution, and the result » ? Répondez en anglais par un mot.</li><li>Quelle est la durée de l'opening, en secondes ?</li><li>Quelle est la durée du body, en minutes ?</li><li>Que contient le closing, en plus du résumé ? Répondez en anglais par trois mots.</li></ol>",
    "starter": "# Exercice — Cinq minutes devant M. Tanaka : le plan de Leo\n# Lisez l'énoncé complet ci-dessus, puis répondez à chaque question dans son bloc.\n# Les noms des parties se répondent en anglais ; les durées par un nombre.\n\n[Question 1 — Nombre de parties de la présentation]\nA_COMPLETER\n\n[Question 2 — La question d'accroche de l'opening]\nA_COMPLETER\n\n[Question 3 — L'annonce du plan]\nA_COMPLETER\n\n[Question 4 — Durée de l'opening (en secondes)]\nA_COMPLETER\n\n[Question 5 — Durée du body (en minutes)]\nA_COMPLETER\n\n[Question 6 — Ce que contient le closing en plus du résumé]\nA_COMPLETER\n",
    "hints": [
      "La règle « tell them, tell them, tell them » découpe la présentation en trois temps : avant, pendant, après — lisez le planning.",
      "L'opening a deux ingrédients : la phrase qui accroche l'auditoire et l'annonce du plan ; chacun porte un nom anglais d'un mot.",
      "Le closing ne s'arrête jamais à « That's it » : au résumé s'ajoute l'action attendue de l'auditoire (trois mots anglais)."
    ],
    "examples": [
      {
        "stdin": "Sam présente la nouvelle procédure de sauvegarde en 3 minutes :\n1) Il ouvre par un fait marquant : « Last month, we lost two days of work. »\n2) Il annonce : « Today I'll show you the backup tool, the schedule, and the restore procedure. »\n3) Il termine : « To conclude, the tool is installed, the schedule is automatic. Please save your work on the shared drive. »\n\nÉtiquetage :\n1) La phrase d'accroche : le hook.\n2) L'annonce du plan : la roadmap.\n3) Opening et closing durent environ 30 secondes chacun ; le corps prend le reste.",
        "expected": "hook — roadmap — 30 secondes chacun",
        "note": "Hook (accroche) puis roadmap (annonce du plan) : les deux ingrédients d'un opening qui tient l'auditoire en 30 secondes."
      }
    ],
    "tests": [
      {
        "label": "Question 1 — Nombre de parties",
        "stdin": "q:1",
        "expected": "3||trois||three"
      },
      {
        "label": "Question 2 — La question d'accroche",
        "stdin": "q:2",
        "expected": "hook||le hook"
      },
      {
        "label": "Question 3 — L'annonce du plan",
        "stdin": "q:3",
        "expected": "roadmap||la roadmap"
      },
      {
        "label": "Question 4 — Durée de l'opening",
        "stdin": "q:4",
        "expected": "30||30 s||30 sec||30 secondes"
      },
      {
        "label": "Question 5 — Durée du body",
        "stdin": "q:5",
        "expected": "2||deux||two||2 min||deux minutes"
      },
      {
        "label": "Question 6 — Le contenu du closing en plus du résumé",
        "stdin": "q:6",
        "expected": "call to action||a call to action||un call to action||appel a l action||appel a l'action"
      }
    ],
    "solution": "[Question 1 — Nombre de parties de la présentation]\n3\n\n[Question 2 — La question d'accroche de l'opening]\nhook\n\n[Question 3 — L'annonce du plan]\nroadmap\n\n[Question 4 — Durée de l'opening (en secondes)]\n30\n\n[Question 5 — Durée du body (en minutes)]\n2\n\n[Question 6 — Ce que contient le closing en plus du résumé]\ncall to action",
    "takeaway": "1) La présentation compte 3 parties : opening, body, closing — « tell them, tell them, tell them ».\n2) La question d'accroche est le hook : une question, un fait ou une histoire courte pour capter l'auditoire dès la première seconde.\n3) L'annonce du plan est la roadmap : « Today I'll explain the problem, the solution, and the result. »\n4) L'opening dure 30 secondes (hook + roadmap).\n5) Le body dure 2 minutes (1,5 à 2 minutes selon le cours), structuré par les transitions First, Next, Finally.\n6) Le closing contient le résumé et le call to action : « Please restart your computers tonight. » — l'action précise attendue de l'auditoire. Jamais « That's it » ni « I'm done ».\nContrôle : 30 secondes + 2 minutes + 30 secondes = 3 minutes de parole, le reste du temps pour les questions — le tempo du cours."
  },
  {
    "id": "en-c3-e2",
    "chapter": 3,
    "level": "n2",
    "language": "analyse",
    "title": "La Grandma Rule : expliquer la panne à Mme Deniau",
    "exampleTitle": "Exemple résolu — l'explication à la grand-mère de Leo",
    "goal": "Traduire le jargon technique en mots simples pour un public non technique.",
    "brief": "<p><strong>Énoncé.</strong> Incident cette nuit chez REVI Cloud. Mme Deniau, directrice générale d'un client, n'est pas technicienne : elle veut comprendre ce qui s'est passé. Leo applique la règle du cours : « if your grandma can't understand it, simplify it ». Son rapport technique contient :</p><table><tr><th>N°</th><th>Terme technique du rapport</th><th>Traduction à produire pour Mme Deniau</th></tr><tr><td>1</td><td>The deployment failed last night.</td><td>?</td></tr><tr><td>2</td><td>a configuration mismatch</td><td>?</td></tr><tr><td>3</td><td>the CI/CD pipeline</td><td>?</td></tr><tr><td>4</td><td>The API endpoint returned a 500 error due to a null pointer exception.</td><td>« The server ___ talking to our app. »</td></tr></table><ol><li>Comment le cours nomme-t-il la règle « if your grandma can't understand it, simplify it » ? Répondez en anglais par deux mots.</li><li>Traduisez « deployment » pour Mme Deniau (deux mots anglais).</li><li>Traduisez « configuration mismatch » (deux mots anglais).</li><li>Traduisez « CI/CD pipeline » (trois mots anglais).</li><li>Complétez la simplification de la ligne 4 : « The server ___ talking to our app. » (un mot)</li></ol><p>Répondez en anglais.</p>",
    "starter": "# Exercice — La Grandma Rule : expliquer la panne à Mme Deniau\n# Lisez l'énoncé complet ci-dessus, puis répondez à chaque question dans son bloc.\n# Répondez en anglais.\n\n[Question 1 — Le nom de la règle de simplification]\nA_COMPLETER\n\n[Question 2 — La traduction de « deployment »]\nA_COMPLETER\n\n[Question 3 — La traduction de « configuration mismatch »]\nA_COMPLETER\n\n[Question 4 — La traduction de « CI/CD pipeline »]\nA_COMPLETER\n\n[Question 5 — Le verbe manquant de la simplification]\nA_COMPLETER\n",
    "hints": [
      "Les clients ne se soucient pas du code : ils se soucient des solutions — chaque terme technique a son équivalent simple dans le traducteur du cours.",
      "Le traducteur du cours passe du jargon aux mots simples : la mise à disposition du logiciel, un problème de réglages, un système de livraison automatique.",
      "Pour la ligne 4, cherchez le verbe qui dit que la communication s'est arrêtée : le serveur ne parlait plus à l'application."
    ],
    "examples": [
      {
        "stdin": "Leo explique une autre panne à sa grand-mère :\n1) « The nightly update failed. » — traduisez « failed » en trois mots simples.\n2) La phrase entière se simplifie ensuite en : « The computer system got confused and couldn't ___ the job. »\n\nRéponses :\n1) Failed se traduit par did not work.\n2) Le verbe manquant est finish : le système n'a pas pu finir le travail.",
        "expected": "did not work — finish",
        "note": "Simplifier, c'est descendre d'un cran : failed devient did not work, puis la phrase entière se raconte comme une histoire simple."
      }
    ],
    "tests": [
      {
        "label": "Question 1 — Le nom de la règle",
        "stdin": "q:1",
        "expected": "grandma rule||the grandma rule||la grandma rule"
      },
      {
        "label": "Question 2 — Traduction de deployment",
        "stdin": "q:2",
        "expected": "software release||a software release"
      },
      {
        "label": "Question 3 — Traduction de configuration mismatch",
        "stdin": "q:3",
        "expected": "settings problem||a settings problem"
      },
      {
        "label": "Question 4 — Traduction de CI/CD pipeline",
        "stdin": "q:4",
        "expected": "automatic delivery system||an automatic delivery system"
      },
      {
        "label": "Question 5 — Le verbe manquant",
        "stdin": "q:5",
        "expected": "stopped"
      }
    ],
    "solution": "[Question 1 — Le nom de la règle de simplification]\ngrandma rule\n\n[Question 2 — La traduction de « deployment »]\nsoftware release\n\n[Question 3 — La traduction de « configuration mismatch »]\nsettings problem\n\n[Question 4 — La traduction de « CI/CD pipeline »]\nautomatic delivery system\n\n[Question 5 — Le verbe manquant de la simplification]\nstopped",
    "takeaway": "1) La règle est la Grandma Rule : si votre grand-mère ne comprend pas, simplifiez.\n2) « Deployment » se dit software release pour un public non technique : la mise à disposition du logiciel.\n3) « Configuration mismatch » se dit settings problem : un problème de réglages.\n4) « CI/CD pipeline » se dit automatic delivery system : le système de livraison automatique.\n5) « The API endpoint returned a 500 error due to a null pointer exception » se simplifie en « The server stopped talking to our app » : le verbe est stopped.\nContrôle : aucun mot de jargon ne survit à la traduction — c'est le test de la Grandma Rule. La phrase peut descendre encore d'un cran : « The computer system got confused and couldn't finish the job »."
  },
  {
    "id": "en-c3-e3",
    "chapter": 3,
    "level": "n3",
    "language": "analyse",
    "title": "Transitions et questions : les trous du passage de Leo",
    "exampleTitle": "Exemple résolu — la présentation de l'intranet de Sam",
    "goal": "Placer les transitions d'une présentation et répondre poliment aux questions difficiles.",
    "brief": "<p><strong>Énoncé.</strong> Jour J : Leo présente devant M. Tanaka. Il a rédigé son texte, mais trois transitions manquent (trous n° 1 à 3) et sa fin d'intervention est fragile. Le passage :</p><table><tr><th>N°</th><th>Extrait du texte de Leo</th></tr><tr><td>1</td><td>« Have you ever lost an hour of work because of a crash ? ... ___, we couldn't deploy on Monday because of a configuration mismatch. »</td></tr><tr><td>2</td><td>« ___, the team fixed the settings and tested everything twice. »</td></tr><tr><td>3</td><td>« ___, everything works again. Please restart your computers tonight. »</td></tr><tr><td>4</td><td>(Hésitations gênantes : « So, like, basically, um... »)</td></tr><tr><td>5</td><td>M. Tanaka demande : « How much did the incident cost us ? »</td></tr></table><ol><li>Trou 1 : quelle transition ouvre la première étape du body ? (l'adverbe du cours ou son équivalent « To begin with »)</li><li>Trou 2 : quel adverbe court passe à l'étape suivante ?</li><li>Trou 3 : quelle transition introduit la dernière étape, avant la conclusion ?</li><li>« So, like, basically, um... » : quel outil du cours remplace ces hésitations et guide l'auditeur ?</li><li>Face à la question de M. Tanaka, quelle formule polie du cours permet de gagner du temps avant de répondre ?</li></ol><p>Répondez en anglais, par un mot ou une expression courte.</p>",
    "starter": "# Exercice — Transitions et questions : les trous du passage de Leo\n# Lisez l'énoncé complet ci-dessus, puis répondez à chaque question dans son bloc.\n# Répondez en anglais, par un mot ou une expression courte.\n\n[Question 1 — La transition qui ouvre le body]\nA_COMPLETER\n\n[Question 2 — La transition qui passe à l'étape suivante]\nA_COMPLETER\n\n[Question 3 — La transition de la dernière étape]\nA_COMPLETER\n\n[Question 4 — L'outil qui remplace les hésitations]\nA_COMPLETER\n\n[Question 5 — La formule polie face à une question difficile]\nA_COMPLETER\n",
    "hints": [
      "Les transitions du cours se rangent en trois familles : ouvrir (First, To begin with), avancer (Next), conclure (Finally, In conclusion, To summarize).",
      "Chaque trou correspond à une famille différente : repérez la position de la phrase dans le corps de la présentation.",
      "Pour la question 5, le cours donne des formules polies toutes faites pour le Q&A — pas une réponse chiffrée."
    ],
    "examples": [
      {
        "stdin": "Sam présente le nouvel intranet :\n« To begin with, the intranet was slow. Now let's look at the new version : pages load in one second. In conclusion, the tool is ready for everyone. »\nUne auditrice demande : « When will the training take place ? »\n\nAnalyse :\n1) « To begin with » ouvre ; « Now let's look at » fait avancer ; « In conclusion » conclut.\n2) Face à la question, Sam répond : « Let me clarify : the training is on Friday. »",
        "expected": "to begin with — now let's look at — in conclusion — let me clarify",
        "note": "Trois familles de transitions (ouvrir, avancer, conclure) et des formules polies pour le Q&A : c'est la grammaire d'une présentation fluide."
      }
    ],
    "tests": [
      {
        "label": "Question 1 — La transition qui ouvre le body",
        "stdin": "q:1",
        "expected": "first||to begin with"
      },
      {
        "label": "Question 2 — La transition qui avance",
        "stdin": "q:2",
        "expected": "next||then"
      },
      {
        "label": "Question 3 — La transition de la dernière étape",
        "stdin": "q:3",
        "expected": "finally||in conclusion||to summarize"
      },
      {
        "label": "Question 4 — L'outil qui remplace les hésitations",
        "stdin": "q:4",
        "expected": "transitions||les transitions||transition||la transition||des transitions"
      },
      {
        "label": "Question 5 — La formule polie du Q&A",
        "stdin": "q:5",
        "expected": "that's a good question||thats a good question||let me clarify||let me check and get back to you||let me check||good question"
      }
    ],
    "solution": "[Question 1 — La transition qui ouvre le body]\nfirst\n\n[Question 2 — La transition qui passe à l'étape suivante]\nnext\n\n[Question 3 — La transition de la dernière étape]\nfinally\n\n[Question 4 — L'outil qui remplace les hésitations]\ntransitions\n\n[Question 5 — La formule polie face à une question difficile]\nthat's a good question",
    "takeaway": "1) « First, we couldn't deploy on Monday... » (ou « To begin with ») : la transition d'ouverture du body.\n2) « Next, the team fixed the settings... » (ou « Then ») : la transition qui fait avancer.\n3) « Finally, everything works again... » : la transition de la dernière étape (In conclusion ou To summarize conviennent aussi).\n4) Les hésitations (« um », « like », « basically ») se remplacent par les transitions : elles guident l'auditeur et masquent l'hésitation.\n5) « That's a good question », « Let me clarify » ou « Let me check and get back to you » : les formules polies du cours pour répondre sans brusquer.\nContrôle : les trois trous couvrent les trois familles de transitions — ouvrir, avancer, conclure — et le Q&A se traite avec politesse et assurance."
  },
  {
    "id": "en-c4-e1",
    "chapter": 4,
    "level": "n1",
    "language": "analyse",
    "title": "Le tri des -ed au stand-up quotidien",
    "exampleTitle": "Exemple résolu — le journal du lundi",
    "goal": "Classer les terminaisons -ed selon leur prononciation : /t/, /d/ ou /ɪd/.",
    "brief": "<p><strong>Énoncé.</strong> Chaque matin, l'équipe de Leo fait son stand-up : chacun raconte sa journée d'hier. Ce matin, six verbes en -ed sont au tableau, issus du journal de l'équipe :</p><table><tr><th>N°</th><th>Verbe du journal</th><th>Fin de la phrase</th></tr><tr><td>1</td><td>We <strong>finished</strong></td><td>the UAT tests.</td></tr><tr><td>2</td><td>I <strong>logged</strong></td><td>three tickets.</td></tr><tr><td>3</td><td>She <strong>started</strong></td><td>the deployment.</td></tr><tr><td>4</td><td>They <strong>asked</strong></td><td>for a demo.</td></tr><tr><td>5</td><td>He <strong>emailed</strong></td><td>the client.</td></tr><tr><td>6</td><td>We <strong>decided</strong></td><td>to fix the bug.</td></tr></table><p>Rappel du cours : l'-ed se prononce /t/ après un son sourd (walked, missed), /d/ après un son voisé (called, changed) et /ɪd/ après un T ou un D (wanted, needed, started).</p><ol><li>« finished » : quelle est la prononciation de l'-ed ?</li><li>« logged » : quelle est la prononciation de l'-ed ?</li><li>« started » : quelle est la prononciation de l'-ed ?</li><li>« asked » : quelle est la prononciation de l'-ed ?</li><li>« emailed » : quelle est la prononciation de l'-ed ?</li><li>« decided » : quelle est la prononciation de l'-ed ?</li></ol><p>Répondez par t, d ou id (les notations /t/, /d/, /ɪd/ sont acceptées).</p>",
    "starter": "# Exercice — Le tri des -ed au stand-up quotidien\n# Lisez l'énoncé complet ci-dessus, puis répondez à chaque question dans son bloc.\n# Répondez par t, d ou id (les notations /t/, /d/, /ɪd/ sont acceptées).\n\n[Question 1 — Prononciation de l'-ed dans « finished »]\nA_COMPLETER\n\n[Question 2 — Prononciation de l'-ed dans « logged »]\nA_COMPLETER\n\n[Question 3 — Prononciation de l'-ed dans « started »]\nA_COMPLETER\n\n[Question 4 — Prononciation de l'-ed dans « asked »]\nA_COMPLETER\n\n[Question 5 — Prononciation de l'-ed dans « emailed »]\nA_COMPLETER\n\n[Question 6 — Prononciation de l'-ed dans « decided »]\nA_COMPLETER\n",
    "hints": [
      "Écoutez le dernier son du verbe sans le -ed : sourd (comme k, s, ch) donne /t/ ; voisé (voyelle, l, g, m) donne /d/.",
      "Si le verbe se termine déjà par un T ou un D, l'-ed se détache en une syllabe entière de plus.",
      "Vérifiez la cohérence de votre tri : la règle du cours doit donner deux verbes de chaque sorte dans ce journal."
    ],
    "examples": [
      {
        "stdin": "Journal du lundi, autres verbes :\n1) « I walked to the office. » → le son final k est sourd : /t/.\n2) « We called the supplier. » → le son final l est voisé : /d/.\n3) « They wanted a report. » → le verbe finit par un D : /ɪd/, une syllabe de plus.",
        "expected": "walked : /t/ — called : /d/ — wanted : /ɪd/",
        "note": "La règle ne regarde que le dernier son du verbe : sourd donne /t/, voisé donne /d/, et un T ou D final donne une syllabe /ɪd/ entière."
      }
    ],
    "tests": [
      {
        "label": "Question 1 — -ed de finished",
        "stdin": "q:1",
        "expected": "t||/t/"
      },
      {
        "label": "Question 2 — -ed de logged",
        "stdin": "q:2",
        "expected": "d||/d/"
      },
      {
        "label": "Question 3 — -ed de started",
        "stdin": "q:3",
        "expected": "ɪd||id||/ɪd/||/id/||ed"
      },
      {
        "label": "Question 4 — -ed de asked",
        "stdin": "q:4",
        "expected": "t||/t/"
      },
      {
        "label": "Question 5 — -ed de emailed",
        "stdin": "q:5",
        "expected": "d||/d/"
      },
      {
        "label": "Question 6 — -ed de decided",
        "stdin": "q:6",
        "expected": "ɪd||id||/ɪd/||/id/||ed"
      }
    ],
    "solution": "[Question 1 — Prononciation de l'-ed dans « finished »]\nt\n\n[Question 2 — Prononciation de l'-ed dans « logged »]\nd\n\n[Question 3 — Prononciation de l'-ed dans « started »]\nɪd\n\n[Question 4 — Prononciation de l'-ed dans « asked »]\nt\n\n[Question 5 — Prononciation de l'-ed dans « emailed »]\nd\n\n[Question 6 — Prononciation de l'-ed dans « decided »]\nɪd",
    "takeaway": "1) finished : le verbe se termine par le son sourd /ʃ/ (ch) → l'-ed se prononce /t/.\n2) logged : le son final /g/ est voisé → /d/.\n3) started : le verbe se termine par un T → l'-ed devient une syllabe /ɪd/.\n4) asked : le son final /k/ est sourd → /t/.\n5) emailed : le son final /l/ est voisé → /d/.\n6) decided : le verbe se termine par un D → /ɪd/.\nContrôle : deux /t/ (finished, asked), deux /d/ (logged, emailed) et deux /ɪd/ (started, decided) — la répartition des trois prononciations du cours est respectée."
  },
  {
    "id": "en-c4-e2",
    "chapter": 4,
    "level": "n2",
    "language": "analyse",
    "title": "Sons et accents : le débriefing de l'appel avec Liverpool",
    "exampleTitle": "Exemple résolu — les erreurs de Marc au téléphone",
    "goal": "Corriger les sons difficiles des francophones (/θ/, /ð/, /h/) et placer l'accent de mot.",
    "brief": "<p><strong>Énoncé.</strong> Leo vient de passer son premier appel en anglais avec un collègue de Liverpool. Au débriefing, son tuteur relève les erreurs de prononciation :</p><table><tr><th>N°</th><th>Ce que Leo a dit</th><th>Le mot visé</th></tr><tr><td>1</td><td>« tink » (la langue derrière les dents)</td><td>think</td></tr><tr><td>2</td><td>« 'ello » (le souffle du début a disparu)</td><td>hello</td></tr><tr><td>3</td><td>« I 'ave a <strong>REcord</strong> to check » (accent sur la première syllabe)</td><td>record (le nom, un fichier)</td></tr><tr><td>4</td><td>« She will <strong>preSENT</strong> the results » (accent sur la deuxième syllabe)</td><td>present (le verbe, montrer)</td></tr><tr><td>5</td><td>« tanks, tis is fine »</td><td>thanks, this is fine</td></tr></table><p>Rappel du cours : /θ/ et /ð/ se produisent la langue entre les dents (the tongue sandwich) ; le /h/ se souffle, il n'est jamais muet ; l'accent de mot distingue REcord (nom) et reCORD (verbe).</p><ol><li>Le /θ/ de « think » se produit avec la langue entre les quoi ? Répondez en anglais par un mot.</li><li>« 'ello » : quel son Leo a-t-il perdu au début de hello ? (une lettre)</li><li>« REcord », accent sur la première syllabe : est-ce un nom ou un verbe ?</li><li>« preSENT », accent sur la deuxième syllabe : est-ce un nom ou un verbe ?</li><li>Dans « tanks, tis is fine » : quel mot contient le son /ð/ ?</li><li>Quel symbole du cours note le son de « think », celui que Leo a remplacé par un t ?</li></ol><p>Questions 3 et 4 : répondez par nom ou verbe.</p>",
    "starter": "# Exercice — Sons et accents : le débriefing de l'appel avec Liverpool\n# Lisez l'énoncé complet ci-dessus, puis répondez à chaque question dans son bloc.\n# Questions 3 et 4 : répondez par nom ou verbe.\n\n[Question 1 — Où se place la langue pour le son /θ/]\nA_COMPLETER\n\n[Question 2 — Le son perdu au début de hello]\nA_COMPLETER\n\n[Question 3 — REcord : nom ou verbe ?]\nA_COMPLETER\n\n[Question 4 — preSENT : nom ou verbe ?]\nA_COMPLETER\n\n[Question 5 — Le mot qui contient le son /ð/]\nA_COMPLETER\n\n[Question 6 — Le symbole du son de « think »]\nA_COMPLETER\n",
    "hints": [
      "Le tongue sandwich : /θ/ et /ð/ se produisent au même endroit, la langue entre les dents ; seule la sonorité change.",
      "L'accent de mot suit une règle régulière : accent en tête (première syllabe) → nom ; accent en fin (deuxième syllabe) → verbe.",
      "Le /h/ anglais s'expire, comme un souffle audible : le français le tait, l'anglais jamais — d'où le « 'ello » de Leo."
    ],
    "examples": [
      {
        "stdin": "Erreurs de Marc au téléphone :\n1) « Tree people are coming », au lieu de three people are coming.\n2) « 'ave a nice day », au lieu de have a nice day.\n\nAnalyse :\n1) « tree » pour three : le son /θ/ exige la langue entre les dents.\n2) « 'ave » pour have : le /h/ perdu se souffle.",
        "expected": "three : /θ/ — have : /h/",
        "note": "Deux pertes typiques du francophone : le /θ/ remplacé par un t (tree au lieu de three) et le /h/ avalé ('ave au lieu de have)."
      }
    ],
    "tests": [
      {
        "label": "Question 1 — La position de la langue pour /θ/",
        "stdin": "q:1",
        "expected": "teeth||the teeth||dents||les dents"
      },
      {
        "label": "Question 2 — Le son perdu de hello",
        "stdin": "q:2",
        "expected": "h||/h/||le h"
      },
      {
        "label": "Question 3 — REcord : nom ou verbe",
        "stdin": "q:3",
        "expected": "nom||noun||un nom||le nom"
      },
      {
        "label": "Question 4 — preSENT : nom ou verbe",
        "stdin": "q:4",
        "expected": "verbe||verb||un verbe||le verbe"
      },
      {
        "label": "Question 5 — Le mot au son /ð/",
        "stdin": "q:5",
        "expected": "this"
      },
      {
        "label": "Question 6 — Le symbole du son de think",
        "stdin": "q:6",
        "expected": "/θ/||θ||th||le th"
      }
    ],
    "solution": "[Question 1 — Où se place la langue pour le son /θ/]\nteeth\n\n[Question 2 — Le son perdu au début de hello]\nh\n\n[Question 3 — REcord : nom ou verbe ?]\nnom\n\n[Question 4 — preSENT : nom ou verbe ?]\nverbe\n\n[Question 5 — Le mot qui contient le son /ð/]\nthis\n\n[Question 6 — Le symbole du son de « think »]\n/θ/",
    "takeaway": "1) Le /θ/ (et le /ð/) se produit la langue entre les dents (the teeth) : le tongue sandwich du cours — ni « tink », ni « sink ».\n2) Leo a perdu le /h/ : hello se prononce avec un souffle audible, jamais « 'ello ».\n3) REcord, accent sur la première syllabe, est le nom : un fichier, un enregistrement.\n4) preSENT, accent sur la deuxième syllabe, est le verbe : montrer. Mêmes paires : PREsent (cadeau) / preSENT, CONduct / conDUCT, OBject / obJECT.\n5) Le son /ð/ est dans « this » : la phrase corrigée est « thanks, this is fine » — thanks porte le /θ/, this porte le /ð/.\n6) Le son de « think » se note /θ/ : le symbole du cours.\nContrôle : les cinq difficultés du chapitre sont représentées — /θ/ (think, thanks), /ð/ (this), /h/ (hello) et l'accent de mot (REcord / preSENT)."
  },
  {
    "id": "en-c4-e3",
    "chapter": 4,
    "level": "n3",
    "language": "analyse",
    "title": "Groupes de souffle et intonation au recording lab",
    "exampleTitle": "Exemple résolu — l'enregistrement d'entraînement",
    "goal": "Découper la phrase en thought groups, souder les liaisons et choisir l'intonation juste.",
    "brief": "<p><strong>Énoncé.</strong> Au recording lab, Leo s'enregistre et analyse sa diction sur six points :</p><table><tr><th>N°</th><th>Extrait analysé</th></tr><tr><td>1</td><td>« We need to finish by Friday (pause) so let's work hard. »</td></tr><tr><td>2</td><td>« not at all », prononcé d'un seul tenant</td></tr><tr><td>3</td><td>« an apple », prononcé d'un seul tenant</td></tr><tr><td>4</td><td>« Are you coming ? » (montée ou descente ?)</td></tr><tr><td>5</td><td>« Where are you going ? » (montée ou descente ?)</td></tr><tr><td>6</td><td>« I didn't delete the file », selon le mot accentué</td></tr></table><ol><li>Comment s'appelle le groupe de mots « We need to finish by Friday », délimité par une pause ? Répondez en anglais par deux mots.</li><li>Comment « not at all » se prononce-t-il soudé, d'après le cours ? (trois syllabes collées, avec traits d'union)</li><li>Comment « an apple » se prononce-t-il soudé ? (deux morceaux, avec trait d'union)</li><li>« Are you coming ? » : l'intonation est-elle montante ou descendante ?</li><li>« Where are you going ? » : l'intonation est-elle montante ou descendante ?</li><li>Quand l'accent de phrase change de mot, que change-t-on dans la phrase ? Répondez par un mot (français ou anglais).</li></ol><p>Questions 4 et 5 : répondez par montante ou descendante.</p>",
    "starter": "# Exercice — Groupes de souffle et intonation au recording lab\n# Lisez l'énoncé complet ci-dessus, puis répondez à chaque question dans son bloc.\n# Questions 4 et 5 : répondez par montante ou descendante.\n\n[Question 1 — Le groupe de mots délimité par une pause]\nA_COMPLETER\n\n[Question 2 — « not at all » prononcé soudé]\nA_COMPLETER\n\n[Question 3 — « an apple » prononcé soudé]\nA_COMPLETER\n\n[Question 4 — L'intonation de « Are you coming ? »]\nA_COMPLETER\n\n[Question 5 — L'intonation de « Where are you going ? »]\nA_COMPLETER\n\n[Question 6 — Ce que change l'accent de phrase]\nA_COMPLETER\n",
    "hints": [
      "La fluidité n'est pas la vitesse : on coupe la phrase aux frontières naturelles et on soude les mots à l'intérieur de chaque groupe.",
      "Les questions oui/non montent ; les questions en mot interrogatif (WH) et les déclarations descendent.",
      "Pour les liaisons, le cours écrit les syllabes collées avec des traits d'union : les mots fondent ensemble, comme « get on » devient « Ge-ton »."
    ],
    "examples": [
      {
        "stdin": "Enregistrement d'entraînement :\n1) « Let's get on the call » : « get on » se soudent en deux syllabes liées.\n2) « Is the server ready ? » : question oui/non.\n\nRéponses :\n1) « get on » devient « Ge-ton ».\n2) « Is the server ready ? » prend une intonation montante.",
        "expected": "get on → Ge-ton — Is the server ready ? : montante",
        "note": "Le linking soude les mots (Ge-ton) et les questions oui/non montent : deux gestes qui font sonner la phrase naturelle."
      }
    ],
    "tests": [
      {
        "label": "Question 1 — Le groupe de mots entre pauses",
        "stdin": "q:1",
        "expected": "thought group||thought groups||un thought group||groupe de souffle||un groupe de souffle"
      },
      {
        "label": "Question 2 — « not at all » soudé",
        "stdin": "q:2",
        "expected": "no-ta-tall||no ta tall||notatall"
      },
      {
        "label": "Question 3 — « an apple » soudé",
        "stdin": "q:3",
        "expected": "a-napple||a napple||anapple"
      },
      {
        "label": "Question 4 — Intonation de « Are you coming ? »",
        "stdin": "q:4",
        "expected": "montante||rising||monte"
      },
      {
        "label": "Question 5 — Intonation de « Where are you going ? »",
        "stdin": "q:5",
        "expected": "descendante||falling||descend"
      },
      {
        "label": "Question 6 — Ce que change l'accent de phrase",
        "stdin": "q:6",
        "expected": "sens||meaning||le sens"
      }
    ],
    "solution": "[Question 1 — Le groupe de mots délimité par une pause]\nthought group\n\n[Question 2 — « not at all » prononcé soudé]\nno-ta-tall\n\n[Question 3 — « an apple » prononcé soudé]\na-napple\n\n[Question 4 — L'intonation de « Are you coming ? »]\nmontante\n\n[Question 5 — L'intonation de « Where are you going ? »]\ndescendante\n\n[Question 6 — Ce que change l'accent de phrase]\nsens",
    "takeaway": "1) « We need to finish by Friday » forme un thought group : un groupe de mots séparé des autres par une pause — la respiration naturelle de la phrase.\n2) « not at all » se lie en « No-ta-tall » : les trois mots fondent ensemble.\n3) « an apple » se lie en « A-napple ».\n4) « Are you coming ? » est une question oui/non : intonation montante.\n5) « Where are you going ? » est une question WH : intonation descendante, comme les déclarations.\n6) L'accent de phrase change le sens : « I didn't DELETE the file » (quelqu'un d'autre, peut-être) n'a pas la même lecture que « I didn't delete THE FILE » (j'ai supprimé autre chose).\nContrôle : la même phrase « You're done » monte comme question et descend comme constat (voir le chapitre 5) — l'intonation décide du sens."
  },
  {
    "id": "en-c5-e1",
    "chapter": 5,
    "level": "n1",
    "language": "analyse",
    "title": "Gonna, wanna, gotta : les deux appels de Leo",
    "exampleTitle": "Exemple résolu — la pause café de Sam",
    "goal": "Remplacer les réductions familières (gonna, wanna, gotta) par leurs formes complètes selon le registre.",
    "brief": "<p><strong>Énoncé.</strong> Mardi matin. Leo passe d'abord un appel détendu à son collègue Sam, puis un appel formel avec la cliente Mme Ross. Le double appel :</p><table><tr><th>Qui</th><th>Réplique</th></tr><tr><td>Sam</td><td>« Hey Leo ! I'm gonna send you the file in five minutes. »</td></tr><tr><td>Leo</td><td>« Thanks. I gotta go — the client is on the line. »</td></tr><tr><td>Sam</td><td>« OK. Wanna meet later ? »</td></tr><tr><td>Leo (à Mme Ross)</td><td>« Good morning. We are going to deploy the update on Friday. Would you like to meet on Monday ? »</td></tr></table><ol><li>Quel registre régit l'échange entre Leo et Sam : business ou casual ?</li><li>Quelle est la forme complète de « gonna » ?</li><li>Dans « Wanna meet later ? », quelle est la forme complète de « wanna » ?</li><li>Quelle est la forme complète de « gotta » ? (deux mots, ou trois si l'on commence par have)</li><li>Face à Mme Ross, « Wanna meet ? » deviendrait quelle formule polie du cours, en quatre mots ?</li><li>Quel registre Leo emploie-t-il avec Mme Ross : formel ou casual ?</li></ol><p>Répondez en anglais, par un mot ou une expression courte (question 6 : formel ou casual).</p>",
    "starter": "# Exercice — Gonna, wanna, gotta : les deux appels de Leo\n# Lisez l'énoncé complet ci-dessus, puis répondez à chaque question dans son bloc.\n# Répondez en anglais (question 6 : formel ou casual).\n\n[Question 1 — Le registre de l'échange avec Sam]\nA_COMPLETER\n\n[Question 2 — La forme complète de « gonna »]\nA_COMPLETER\n\n[Question 3 — La forme complète de « wanna »]\nA_COMPLETER\n\n[Question 4 — La forme complète de « gotta »]\nA_COMPLETER\n\n[Question 5 — La formule polie qui remplace « Wanna meet ? » face à un client]\nA_COMPLETER\n\n[Question 6 — Le registre employé avec Mme Ross]\nA_COMPLETER\n",
    "hints": [
      "Le registre décide : entre collègues, en parole détendue, les réductions passent ; devant un client, elles coûtent la crédibilité.",
      "Chaque réduction du cours a sa forme longue : trois mots familiers, trois formes complètes à deux mots.",
      "Pour la question 5, la formule polie d'invitation du cours commence par Would you..."
    ],
    "examples": [
      {
        "stdin": "Pause café, Sam parle :\n« I'm gonna grab a coffee. Wanna come ? I gotta run after. »\nDevant le directeur, Sam dirait :\n« I am going to grab a coffee. Would you like to come ? I have to run after. »\n\nAnalyse :\n1) gonna → going to.\n2) wanna → want to.\n3) gotta → have to (ou got to).",
        "expected": "going to — want to — have to",
        "note": "Même intention, deux registres : au café les réductions, devant le directeur les formes complètes."
      }
    ],
    "tests": [
      {
        "label": "Question 1 — Le registre de l'échange avec Sam",
        "stdin": "q:1",
        "expected": "casual||familier||informal||informel"
      },
      {
        "label": "Question 2 — La forme complète de gonna",
        "stdin": "q:2",
        "expected": "going to||i'm going to||im going to"
      },
      {
        "label": "Question 3 — La forme complète de wanna",
        "stdin": "q:3",
        "expected": "want to||do you want to"
      },
      {
        "label": "Question 4 — La forme complète de gotta",
        "stdin": "q:4",
        "expected": "got to||have to||i have to||i've got to||ive got to"
      },
      {
        "label": "Question 5 — La formule polie pour un client",
        "stdin": "q:5",
        "expected": "would you like to meet||would you like to meet?||would you like to meet ?||would you like to meet."
      },
      {
        "label": "Question 6 — Le registre avec Mme Ross",
        "stdin": "q:6",
        "expected": "formel||formal"
      }
    ],
    "solution": "[Question 1 — Le registre de l'échange avec Sam]\ncasual\n\n[Question 2 — La forme complète de « gonna »]\ngoing to\n\n[Question 3 — La forme complète de « wanna »]\nwant to\n\n[Question 4 — La forme complète de « gotta »]\ngot to\n\n[Question 5 — La formule polie qui remplace « Wanna meet ? » face à un client]\nwould you like to meet\n\n[Question 6 — Le registre employé avec Mme Ross]\nformel",
    "takeaway": "1) L'échange Leo-Sam est casual : entre collègues, en parole détendue, les réductions sont tolérées.\n2) gonna = going to : « I'm going to send you the file ».\n3) wanna = want to : « Do you want to meet later ? »\n4) gotta = got to / have to : « I have to go — the client is on the line. »\n5) Face à un client, « Wanna meet ? » devient « Would you like to meet ? » : l'invitation polie du cours.\n6) Avec Mme Ross, Leo emploie le registre formel : « We are going to deploy » et non « We're gonna deploy ».\nContrôle : la règle du chapitre — le destinataire décide. Collègue de toujours : casual toléré. Cliente : formel intégral."
  },
  {
    "id": "en-c5-e2",
    "chapter": 5,
    "level": "n2",
    "language": "analyse",
    "title": "Montante ou descendante ? L'appel avec le fournisseur",
    "exampleTitle": "Exemple résolu — le rendez-vous du vendredi",
    "goal": "Choisir l'intonation (montante ou descendante) de six phrases d'un appel professionnel.",
    "brief": "<p><strong>Énoncé.</strong> Leo appelle un fournisseur pour vérifier une livraison. Six phrases de l'appel sont transcrites ; à chaque fois, décidez de l'intonation finale :</p><table><tr><th>N°</th><th>Phrase</th></tr><tr><td>1</td><td>« Can you hear me ? »</td></tr><tr><td>2</td><td>« Who is calling, please ? »</td></tr><tr><td>3</td><td>« You're done ? » (Leo est surpris que le travail soit déjà fini)</td></tr><tr><td>4</td><td>« You're done. » (Leo constate que le travail est fini)</td></tr><tr><td>5</td><td>« The invoice is paid. »</td></tr><tr><td>6</td><td>« Did you send the file ? »</td></tr></table><p>Rappel du cours : les questions oui/non montent ; les déclarations et les questions WH descendent ; la même phrase peut changer de sens avec l'intonation.</p><ol><li>Phrase 1 : montante ou descendante ?</li><li>Phrase 2 : montante ou descendante ?</li><li>Phrase 3 : montante ou descendante ?</li><li>Phrase 4 : montante ou descendante ?</li><li>Phrase 5 : montante ou descendante ?</li><li>Phrase 6 : montante ou descendante ?</li></ol><p>Répondez par montante ou descendante, pour chaque phrase.</p>",
    "starter": "# Exercice — Montante ou descendante ? L'appel avec le fournisseur\n# Lisez l'énoncé complet ci-dessus, puis répondez à chaque question dans son bloc.\n# Répondez par montante ou descendante.\n\n[Question 1 — Intonation de « Can you hear me ? »]\nA_COMPLETER\n\n[Question 2 — Intonation de « Who is calling, please ? »]\nA_COMPLETER\n\n[Question 3 — Intonation de « You're done ? » (surprise)]\nA_COMPLETER\n\n[Question 4 — Intonation de « You're done. » (constat)]\nA_COMPLETER\n\n[Question 5 — Intonation de « The invoice is paid. »]\nA_COMPLETER\n\n[Question 6 — Intonation de « Did you send the file ? »]\nA_COMPLETER\n",
    "hints": [
      "Classez d'abord chaque phrase : question oui/non, question WH (qui commence par un mot interrogatif), ou déclaration.",
      "Les questions oui/non montent ; les déclarations et les questions WH descendent.",
      "Les phrases 3 et 4 sont identiques : seule l'intonation distingue la surprise du constat."
    ],
    "examples": [
      {
        "stdin": "Rendez-vous du vendredi :\n1) « Is the line better now ? » — question oui/non : montante.\n2) « The delivery arrives on Monday. » — déclaration : descendante.\n3) « What time is the meeting ? » — question WH : descendante.",
        "expected": "montante — descendante — descendante",
        "note": "Trois phrases, trois statuts : la question oui/non monte, la déclaration descend, la question WH descend aussi."
      }
    ],
    "tests": [
      {
        "label": "Question 1 — Intonation de « Can you hear me ? »",
        "stdin": "q:1",
        "expected": "montante||rising||monte"
      },
      {
        "label": "Question 2 — Intonation de « Who is calling, please ? »",
        "stdin": "q:2",
        "expected": "descendante||falling||descend"
      },
      {
        "label": "Question 3 — Intonation de « You're done ? » (surprise)",
        "stdin": "q:3",
        "expected": "montante||rising||monte"
      },
      {
        "label": "Question 4 — Intonation de « You're done. » (constat)",
        "stdin": "q:4",
        "expected": "descendante||falling||descend"
      },
      {
        "label": "Question 5 — Intonation de « The invoice is paid. »",
        "stdin": "q:5",
        "expected": "descendante||falling||descend"
      },
      {
        "label": "Question 6 — Intonation de « Did you send the file ? »",
        "stdin": "q:6",
        "expected": "montante||rising||monte"
      }
    ],
    "solution": "[Question 1 — Intonation de « Can you hear me ? »]\nmontante\n\n[Question 2 — Intonation de « Who is calling, please ? »]\ndescendante\n\n[Question 3 — Intonation de « You're done ? » (surprise)]\nmontante\n\n[Question 4 — Intonation de « You're done. » (constat)]\ndescendante\n\n[Question 5 — Intonation de « The invoice is paid. »]\ndescendante\n\n[Question 6 — Intonation de « Did you send the file ? »]\nmontante",
    "takeaway": "1) « Can you hear me ? » est une question oui/non : intonation montante.\n2) « Who is calling, please ? » est une question WH : intonation descendante.\n3) « You're done ? », avec la surprise : montante.\n4) « You're done. », en constat : descendante — la même phrase, deux sens.\n5) « The invoice is paid. » est une déclaration : descendante.\n6) « Did you send the file ? » est une question oui/non : montante.\nContrôle : trois montantes (phrases 1, 3, 6) et trois descendantes (phrases 2, 4, 5) — la répartition du cours : oui/non contre WH et déclarations."
  },
  {
    "id": "en-c5-e3",
    "chapter": 5,
    "level": "n3",
    "language": "analyse",
    "title": "Le carnet de fluidité de Leo",
    "exampleTitle": "Exemple résolu — le carnet de Marc",
    "goal": "Analyser le suivi de fluidité : compter les défauts, mesurer la progression et connaître la philosophie du cours.",
    "brief": "<p><strong>Énoncé.</strong> Depuis deux semaines, Leo applique le recording lab du cours : chaque jour, il s'enregistre une minute, s'écoute et compte ses défauts par famille. Son carnet :</p><table><tr><th>Jour</th><th>H perdus</th><th>Pauses manquées</th><th>Accents faux</th></tr><tr><td>Lundi (semaine 1)</td><td>8</td><td>6</td><td>5</td></tr><tr><td>Vendredi (semaine 2)</td><td>2</td><td>3</td><td>1</td></tr></table><p>La devise du cours : « You don't need a perfect accent. You need to be understood. » Et sa conclusion : « Fluency is a habit, not a destination. »</p><ol><li>Combien de défauts Leo compte-t-il au total le lundi de la semaine 1 ?</li><li>Combien de défauts au total le vendredi de la semaine 2 ?</li><li>Quelle famille de défauts a le plus baissé entre les deux relevés ? Répondez par : les H perdus, les pauses ou l'accent.</li><li>Selon la devise du cours, de quoi a-t-on besoin pour communiquer ? Répondez par les trois derniers mots anglais de la citation.</li><li>Complétez la conclusion : « Fluency is a ___, not a destination. »</li><li>Qui décide du registre à employer ? Répondez par : le destinataire, la grammaire ou le hasard.</li></ol>",
    "starter": "# Exercice — Le carnet de fluidité de Leo\n# Lisez l'énoncé complet ci-dessus, puis répondez à chaque question dans son bloc.\n# Questions 1 et 2 : un nombre ; questions 4 et 5 : en anglais.\n\n[Question 1 — Total des défauts le lundi de la semaine 1]\nA_COMPLETER\n\n[Question 2 — Total des défauts le vendredi de la semaine 2]\nA_COMPLETER\n\n[Question 3 — La famille de défauts qui a le plus baissé]\nA_COMPLETER\n\n[Question 4 — Ce dont on a besoin pour communiquer (trois mots anglais)]\nA_COMPLETER\n\n[Question 5 — Le mot manquant de la conclusion]\nA_COMPLETER\n\n[Question 6 — Qui décide du registre]\nA_COMPLETER\n",
    "hints": [
      "Additionnez chaque ligne du carnet pour les totaux ; comparez ensuite les baisses ligne par ligne.",
      "La devise du cours oppose l'accent parfait à un autre objectif : relisez la citation de l'énoncé.",
      "La conclusion du cours fait de la fluidité une habitude, et le registre un choix dicté par la personne qui vous écoute."
    ],
    "examples": [
      {
        "stdin": "Carnet de Marc :\nLundi : 6 H perdus, 4 pauses manquées, 3 accents faux.\nVendredi : 3 H perdus, 2 pauses manquées, 2 accents faux.\n\nAnalyse :\n1) Total lundi : 6 + 4 + 3 = 13 défauts.\n2) Total vendredi : 3 + 2 + 2 = 7 défauts.\n3) La baisse totale est de 6 défauts — le carnet descend, la fluidité monte.",
        "expected": "13 — 7 — baisse de 6",
        "note": "Le carnet compte pour progresser : les totaux qui baissent, semaine après semaine, valent mieux que l'auto-satisfaction."
      }
    ],
    "tests": [
      {
        "label": "Question 1 — Total des défauts le lundi",
        "stdin": "q:1",
        "expected": "19||19 defauts||19 défauts"
      },
      {
        "label": "Question 2 — Total des défauts le vendredi",
        "stdin": "q:2",
        "expected": "6||6 defauts||6 défauts"
      },
      {
        "label": "Question 3 — La famille qui a le plus baissé",
        "stdin": "q:3",
        "expected": "les h perdus||h perdus||les h||h"
      },
      {
        "label": "Question 4 — Ce dont on a besoin pour communiquer",
        "stdin": "q:4",
        "expected": "to be understood||be understood||understood"
      },
      {
        "label": "Question 5 — Le mot manquant",
        "stdin": "q:5",
        "expected": "habit||une habitude||habitude"
      },
      {
        "label": "Question 6 — Qui décide du registre",
        "stdin": "q:6",
        "expected": "le destinataire||destinataire||the listener||listener||l auditeur||l'auditeur"
      }
    ],
    "solution": "[Question 1 — Total des défauts le lundi de la semaine 1]\n19\n\n[Question 2 — Total des défauts le vendredi de la semaine 2]\n6\n\n[Question 3 — La famille de défauts qui a le plus baissé]\nles h perdus\n\n[Question 4 — Ce dont on a besoin pour communiquer (trois mots anglais)]\nto be understood\n\n[Question 5 — Le mot manquant de la conclusion]\nhabit\n\n[Question 6 — Qui décide du registre]\nle destinataire",
    "takeaway": "1) Lundi : 8 + 6 + 5 = 19 défauts.\n2) Vendredi : 2 + 3 + 1 = 6 défauts.\n3) Les H perdus : de 8 à 2, soit une baisse de 6 — contre 3 pour les pauses et 4 pour l'accent. C'est la famille la plus travaillée.\n4) « You need to be understood » : l'intelligibilité prime sur l'accent parfait.\n5) « Fluency is a habit, not a destination » : la fluidité est une habitude, elle s'entretient sans fin.\n6) Le destinataire décide du registre : « qui m'entend ? » — collègue de toujours, casual toléré ; client ou direction, formel intégral.\nContrôle : 19 − 6 = 13 défauts corrigés en deux semaines — le graphique du carnet descend, la fluidité monte."
  },
  {
    "id": "en-c6-e1",
    "chapter": 6,
    "level": "n1",
    "language": "analyse",
    "title": "S-V-P : les phrases télégraphiques de Leo",
    "exampleTitle": "Exemple résolu — les phrases de Nina",
    "goal": "Transformer des phrases télégraphiques en requêtes polies : sujet, verbe conjugué, politesse.",
    "brief": "<p><strong>Énoncé.</strong> Le test final approche. Leo relit ses anciens messages et retrouve quatre phrases télégraphiques (« bad business English »). La méthode du cours : <strong>S-V-P</strong> — un sujet (Subject), un verbe conjugué (Verb), une formule de politesse (Politeness).</p><table><tr><th>N°</th><th>Phrase de Leo</th><th>Correction visée</th></tr><tr><td>1</td><td>« Me want finish work soon yes »</td><td>« I want to finish work soon. »</td></tr><tr><td>2</td><td>« You send file yesterday ? »</td><td>« ___ you send the file yesterday ? »</td></tr><tr><td>3</td><td>« Server crash. Fix now ! »</td><td>« The server ___ last night. Could we please fix it now ? »</td></tr><tr><td>4</td><td>« Client call. You talk. Not me. »</td><td>« The client is calling. Can you talk to them ? I cannot. »</td></tr></table><ol><li>Phrase 1 : quel sujet correct remplace « Me » ? (un seul mot)</li><li>Phrase 2 : quel auxiliaire complète « ___ you send the file yesterday ? » ?</li><li>Phrase 3 : quelle forme conjuguée du verbe crash complète « The server ___ last night » ?</li><li>Dans la méthode S-V-P, que signifie le P ? Répondez par un mot (la politesse).</li><li>« ___ you please review the attached report ? » : quel modal poli complète la requête du cours ?</li></ol><p>Répondez en anglais, par un mot.</p>",
    "starter": "# Exercice — S-V-P : les phrases télégraphiques de Leo\n# Lisez l'énoncé complet ci-dessus, puis répondez à chaque question dans son bloc.\n# Répondez en anglais, par un mot.\n\n[Question 1 — Le sujet correct qui remplace « Me »]\nA_COMPLETER\n\n[Question 2 — L'auxiliaire de la question au past simple]\nA_COMPLETER\n\n[Question 3 — La forme conjuguée de crash au past simple]\nA_COMPLETER\n\n[Question 4 — Le P de la méthode S-V-P]\nA_COMPLETER\n\n[Question 5 — Le modal poli de la requête du cours]\nA_COMPLETER\n",
    "hints": [
      "Toute requête professionnelle se construit en trois temps : sujet explicite, verbe conjugué, formule de politesse.",
      "Au past simple interrogatif, un auxiliaire porte le temps et le verbe reste à sa base : c'est lui qui manque à la phrase 2.",
      "Pour la phrase 3, conjuguez crash au passé ; pour la question 5, le modal du cours s'emploie avec please."
    ],
    "examples": [
      {
        "stdin": "Phrases de Nina :\n1) « Want meeting tomorrow yes » → « I would like to have a meeting tomorrow. »\n2) « You received my email yesterday ? » → « Did you receive my email yesterday ? »\n\nAnalyse :\n1) Dans « Want meeting », il manque le sujet (I) et le verbe conjugué (would like).\n2) Dans « You received... ? », l'auxiliaire did porte le temps : « Did you receive... ? »",
        "expected": "I — would like — did",
        "note": "Une phrase télégraphique se répare en trois gestes : ajouter le sujet, conjuguer le verbe, formuler poliment."
      }
    ],
    "tests": [
      {
        "label": "Question 1 — Le sujet correct",
        "stdin": "q:1",
        "expected": "i"
      },
      {
        "label": "Question 2 — L'auxiliaire du past simple",
        "stdin": "q:2",
        "expected": "did"
      },
      {
        "label": "Question 3 — La forme conjuguée de crash",
        "stdin": "q:3",
        "expected": "crashed"
      },
      {
        "label": "Question 4 — Le P de S-V-P",
        "stdin": "q:4",
        "expected": "politesse||la politesse||formule de politesse||politeness"
      },
      {
        "label": "Question 5 — Le modal poli",
        "stdin": "q:5",
        "expected": "could"
      }
    ],
    "solution": "[Question 1 — Le sujet correct qui remplace « Me »]\ni\n\n[Question 2 — L'auxiliaire de la question au past simple]\ndid\n\n[Question 3 — La forme conjuguée de crash au past simple]\ncrashed\n\n[Question 4 — Le P de la méthode S-V-P]\npolitesse\n\n[Question 5 — Le modal poli de la requête du cours]\ncould",
    "takeaway": "1) « Me » n'existe pas comme sujet : le sujet correct est I — « I want to finish work soon. »\n2) L'auxiliaire du past simple interrogatif est did : « Did you send the file yesterday ? » (le verbe send reste à sa base).\n3) crash au past simple donne crashed : « The server crashed last night. »\n4) Le P de S-V-P signifie la politesse : Could you please..., Would you be able to..., I would appreciate it if you could...\n5) « Could you please review the attached report ? » : le modal poli est could — la requête standard du cours pour un patron.\nContrôle : les quatre phrases corrigées ont chacune un sujet, un verbe conjugué et une formule polie — c'est la méthode S-V-P."
  },
  {
    "id": "en-c6-e2",
    "chapter": 6,
    "level": "n2",
    "language": "analyse",
    "title": "L'accord sujet-verbe dans le rapport mensuel",
    "exampleTitle": "Exemple résolu — le rapport du parc d'imprimantes",
    "goal": "Corriger les accords sujet-verbe : le singulier prend le -s, le pluriel le verbe nu.",
    "brief": "<p><strong>Énoncé.</strong> Fin du mois : Leo relit son rapport mensuel avant l'envoi au client. Quatre accords sujet-verbe sont faux. Le rapport :</p><table><tr><th>N°</th><th>Phrase du rapport</th></tr><tr><td>1</td><td>« The server work fine. »</td></tr><tr><td>2</td><td>« The servers works fine. »</td></tr><tr><td>3</td><td>« The report need an update. »</td></tr><tr><td>4</td><td>« The clients wants a demo. »</td></tr></table><p>Rappel du cours : le sujet singulier prend le verbe avec -s (the server works) ; le sujet pluriel prend le verbe sans -s (the servers work). Une erreur d'accord dans un email client passe pour de la négligence.</p><ol><li>Phrase 1 : quelle est la forme correcte du verbe « work » ?</li><li>Phrase 2 : quelle est la forme correcte du verbe ?</li><li>Phrase 3 : quelle est la forme correcte du verbe « need » ?</li><li>Phrase 4 : quelle est la forme correcte du verbe « want » ?</li><li>Quel type de sujet prend le verbe sans le -s : le singulier ou le pluriel ?</li></ol><p>Répondez en anglais, par une forme verbale (question 5 : singulier ou pluriel).</p>",
    "starter": "# Exercice — L'accord sujet-verbe dans le rapport mensuel\n# Lisez l'énoncé complet ci-dessus, puis répondez à chaque question dans son bloc.\n# Répondez en anglais, par une forme verbale (question 5 : singulier ou pluriel).\n\n[Question 1 — La forme correcte dans « The server ___ fine »]\nA_COMPLETER\n\n[Question 2 — La forme correcte dans « The servers ___ fine »]\nA_COMPLETER\n\n[Question 3 — La forme correcte dans « The report ___ an update »]\nA_COMPLETER\n\n[Question 4 — La forme correcte dans « The clients ___ a demo »]\nA_COMPLETER\n\n[Question 5 — Le type de sujet qui prend le verbe sans -s]\nA_COMPLETER\n",
    "hints": [
      "Comptez le sujet : un seul élément (server, report) ou plusieurs (servers, clients) ?",
      "La règle du cours est régulière : singulier → verbe en -s ; pluriel → verbe nu. Le -s passe du sujet au verbe.",
      "Relisez chaque correction à voix haute : the server works, the servers work — l'oreille confirme l'accord."
    ],
    "examples": [
      {
        "stdin": "Rapport du parc d'imprimantes :\n1) « The printer need ink. » → le sujet the printer est singulier : needs.\n2) « The printers needs ink. » → le sujet the printers est pluriel : need.",
        "expected": "needs — need",
        "note": "Le -s se déplace : quand le sujet est singulier, c'est le verbe qui le porte ; quand le sujet est pluriel, le verbe reste nu."
      }
    ],
    "tests": [
      {
        "label": "Question 1 — La forme correcte (server)",
        "stdin": "q:1",
        "expected": "works"
      },
      {
        "label": "Question 2 — La forme correcte (servers)",
        "stdin": "q:2",
        "expected": "work"
      },
      {
        "label": "Question 3 — La forme correcte (report)",
        "stdin": "q:3",
        "expected": "needs"
      },
      {
        "label": "Question 4 — La forme correcte (clients)",
        "stdin": "q:4",
        "expected": "want"
      },
      {
        "label": "Question 5 — Le sujet qui prend le verbe nu",
        "stdin": "q:5",
        "expected": "pluriel||plural||le pluriel||un pluriel"
      }
    ],
    "solution": "[Question 1 — La forme correcte dans « The server ___ fine »]\nworks\n\n[Question 2 — La forme correcte dans « The servers ___ fine »]\nwork\n\n[Question 3 — La forme correcte dans « The report ___ an update »]\nneeds\n\n[Question 4 — La forme correcte dans « The clients ___ a demo »]\nwant\n\n[Question 5 — Le type de sujet qui prend le verbe sans -s]\npluriel",
    "takeaway": "1) « The server works fine. » : the server est singulier, le verbe prend le -s.\n2) « The servers work fine. » : the servers est pluriel, le verbe reste nu.\n3) « The report needs an update. » : the report est singulier.\n4) « The clients want a demo. » : the clients est pluriel.\n5) Le sujet pluriel prend le verbe sans -s : the servers work, the clients want.\nContrôle : les quatre corrections suivent la même règle — une erreur d'accord dans un email client passe pour de la négligence, la relecture n'est pas optionnelle."
  },
  {
    "id": "en-c6-e3",
    "chapter": 6,
    "level": "n3",
    "language": "analyse",
    "title": "The final assessment",
    "goal": "Évaluer le parcours complet (le test final du support) : quatre compétences notées, verdict de passage.",
    "brief": "<p>L’analyse porte sur d'abord <code>seuil</code> (score minimal, entier). Puis il lit <strong>n lignes</strong> « competence score » (score entier). Pour chaque situation, indiquez <code>competence : score X</code>. Final : <code>moyenne : M</code> (moyenne entière arrondie vers le bas) et <code>verdict : admis</code> si M ≥ seuil, <code>verdict : entrainement</code> sinon. Si n = 0, afficher <code>moyenne : 0</code>.</p>",
    "starter": "# Grille d'analyse (en-c6-e3) — The final assessment\n# Complétez la réponse attendue sous chaque cas ci-dessous :\n\n[Cas 1 — Sous le seuil]\n# Données : 2\n# Données : vocabulaire 70\n# Données : emails 75\nA_COMPLETER\n\n[Cas 2 — Aucune competence]\n# Données : 0\nA_COMPLETER\n\n[Cas 3 — Cinq competences]\n# Données : 5\n# Données : a 80\n# Données : b 70\n# Données : c 90\n# Données : d 65\n# Données : e 75\nA_COMPLETER\n",
    "hints": [
      "Calculate the overall English proficiency score across all evaluated competencies.",
      "Determine the corresponding CEFR benchmark level (B1, B2, or C1).",
      "Vérifiez l arrondissement ou la somme des quatre scores et contrôlez si la moyenne atteint exactement le seuil « admis » fixé dans l énoncé."
    ],
    "examples": [
      {
        "stdin": "70\n4\nvocabulaire 80\nemails 90\npresentations 60\nprononciation 75\n",
        "expected": "vocabulaire : score 80\nemails : score 90\npresentations : score 60\nprononciation : score 75\nmoyenne : 76\nverdict : admis"
      }
    ],
    "tests": [
      {
        "label": "Sous le seuil",
        "stdin": "cas:1",
        "expected": "vocabulaire : score 70\nemails : score 75\nmoyenne : 72\nverdict : entrainement"
      },
      {
        "label": "Aucune competence",
        "stdin": "cas:2",
        "expected": "moyenne : 0\nverdict : entrainement"
      },
      {
        "label": "Cinq competences",
        "stdin": "cas:3",
        "expected": "a : score 80\nb : score 70\nc : score 90\nd : score 65\ne : score 75\nmoyenne : 76\nverdict : admis"
      }
    ],
    "solution": "[Exemple]\nvocabulaire : score 80\nemails : score 90\npresentations : score 60\nprononciation : score 75\nmoyenne : 76\nverdict : admis\n\n[Cas 1 — Sous le seuil]\nvocabulaire : score 70\nemails : score 75\nmoyenne : 72\nverdict : entrainement\n\n[Cas 2 — Aucune competence]\nmoyenne : 0\nverdict : entrainement\n\n[Cas 3 — Cinq competences]\na : score 80\nb : score 70\nc : score 90\nd : score 65\ne : score 75\nmoyenne : 76\nverdict : admis\n",
    "takeaway": "À retenir : Évaluer le parcours complet (le test final du support) : quatre compétences notées, verdict de passage."
  }
];

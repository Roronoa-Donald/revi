/**
 * chapitre6.js — Études de cas du cours « b3-veille ».
 * Mode d'évaluation conceptuelle structurée (language: 'analyse').
 */
'use strict';

module.exports = [
  {
    "id": "vt3-c6-e1",
    "chapter": 6,
    "level": "n1",
    "language": "analyse",
    "title": "Le digest hebdomadaire de la communauté d'agglomération Grand Lac",
    "exampleTitle": "Exemple résolu — le digest hebdomadaire d'une université",
    "goal": "Hiérarchiser des brèves par criticité, choisir le livrable adapté à chaque événement et respecter l'entonnoir informationnel.",
    "brief": "<p><strong>Énoncé.</strong> La chargée de veille de la communauté d'agglomération Grand Lac (9 communes) prépare le Curated Digest du lundi matin. Brèves collectées cette semaine :</p><table><tr><th>Brève</th><th>Source</th><th>Objet</th><th>Criticité</th></tr><tr><td>B1</td><td>CERT-FR</td><td>Faille critique activée dans le portail de paiement des cantines</td><td>CRITIQUE</td></tr><tr><td>B2</td><td>Blog tech d'un journaliste</td><td>Refonte de l'interface du logiciel de billetterie des piscines</td><td>FAIBLE</td></tr><tr><td>B3</td><td>Préfecture</td><td>Décret modifiant le calcul des subventions aux associations</td><td>MOYENNE</td></tr><tr><td>B4</td><td>Observatoire régional</td><td>Fréquentation touristique en hausse de 12 %</td><td>FAIBLE</td></tr></table><p>Rappel du cours : la flash note est un livrable d'une page maximum, diffusé en urgence lors d'un événement critique ; le Curated Digest hebdomadaire retient de 3 à 5 faits marquants priorisés par criticité ; l'entonnoir informationnel place l'essentiel en tête de document.</p><p>Consignes : la question 1 attend le nom du livrable (par exemple « flash note ») ; les questions 2, 4 et 5 attendent l'identifiant de la brève ; la question 6 attend une réponse très courte.</p><ol><li>Quel livrable convient pour la brève B1, diffusé immédiatement et sans attendre le digest ?</li><li>Quelle brève ouvrira le digest, en tête de page ?</li><li>Un Curated Digest retient entre 3 et combien de faits marquants ?</li><li>Quelle brève relève de la veille juridique et réglementaire ?</li><li>Quelle brève relève de la veille sociétale ?</li><li>Dans chaque livrable, où l'essentiel doit-il apparaître ?</li></ol>",
    "starter": "# Exercice — Le digest hebdomadaire de la communauté d'agglomération Grand Lac\n# Lisez l'énoncé complet ci-dessus, puis répondez à chaque question dans son bloc.\n\n[Question 1 — Livrable adapté à la brève B1]\nA_COMPLETER\n\n[Question 2 — Brève qui ouvre le digest]\nA_COMPLETER\n\n[Question 3 — Nombre maximal de faits du digest]\nA_COMPLETER\n\n[Question 4 — Brève relevant de la veille juridique]\nA_COMPLETER\n\n[Question 5 — Brève relevant de la veille sociétale]\nA_COMPLETER\n\n[Question 6 — Emplacement de l'essentiel]\nA_COMPLETER\n",
    "hints": [
      "Un événement critique (faille activée) ne peut pas attendre le lundi : il déclenche le livrable court d'urgence.",
      "Le digest s'ouvre sur la criticité la plus haute, pas sur l'ordre d'arrivée des brèves.",
      "Un décret relève de la réglementation ; une statistique de fréquentation touristique décrit la société. L'essentiel se place là où le lecteur commence."
    ],
    "examples": [
      {
        "stdin": "Une université collecte trois brèves :\n— une faille critique dans le portail d'inscription (CRITIQUE) ;\n— un appel à projets ANR (MOYENNE) ;\n— une hausse des inscriptions de 8 % (FAIBLE).\n\nRésolution :\n1) La faille déclenche une flash note immédiate.\n2) Elle ouvre aussi le digest du lundi, en tête de page.\n3) Le digest retient de 3 à 5 faits marquants.\n4) L'appel à projets relève de la veille juridique (règlement d'appel).\n5) La hausse des inscriptions relève de la veille sociétale.\n6) L'essentiel apparaît en tête du document (entonnoir informationnel).",
        "expected": "flash note pour la faille — digest : 3 à 5 faits — l'essentiel en tête du document",
        "note": "Un décideur lit une note de veille de haut en bas : ce qu'il ne voit pas en tête, il ne le lira pas."
      }
    ],
    "tests": [
      {
        "label": "Question 1 — Livrable adapté à la brève B1",
        "stdin": "q:1",
        "expected": "flash note||Flash Note||bulletin d'alerte flash||flash||la flash note"
      },
      {
        "label": "Question 2 — Brève qui ouvre le digest",
        "stdin": "q:2",
        "expected": "B1||la brève B1||b1||la brève B1 (faille critique)"
      },
      {
        "label": "Question 3 — Nombre maximal de faits du digest",
        "stdin": "q:3",
        "expected": "5||cinq"
      },
      {
        "label": "Question 4 — Brève relevant de la veille juridique",
        "stdin": "q:4",
        "expected": "B3||la brève B3||b3"
      },
      {
        "label": "Question 5 — Brève relevant de la veille sociétale",
        "stdin": "q:5",
        "expected": "B4||la brève B4||b4"
      },
      {
        "label": "Question 6 — Emplacement de l'essentiel",
        "stdin": "q:6",
        "expected": "en tête de document||en tête||au début||au début du document"
      }
    ],
    "solution": "[Question 1 — Livrable adapté à la brève B1]\nflash note\n\n[Question 2 — Brève qui ouvre le digest]\nB1\n\n[Question 3 — Nombre maximal de faits du digest]\n5\n\n[Question 4 — Brève relevant de la veille juridique]\nB3\n\n[Question 5 — Brève relevant de la veille sociétale]\nB4\n\n[Question 6 — Emplacement de l'essentiel]\nen tête de document",
    "takeaway": "1) La faille activée est un événement critique : elle appelle une flash note, diffusée immédiatement.\n2) Le digest s'ouvre sur la brève la plus critique : B1.\n3) Le Curated Digest hebdomadaire retient de 3 à 5 faits marquants : maximum 5.\n4) Le décret de la préfecture (B3) relève de la veille juridique et réglementaire.\n5) La statistique de fréquentation touristique (B4) relève de la veille sociétale.\n6) L'essentiel doit apparaître en tête de document, conformément à l'entonnoir informationnel.\nContrôle : la faille (B1) cumule les deux livrables, flash note immédiate puis tête du digest ; les quatre brèves tiennent dans le format de 3 à 5 faits."
  },
  {
    "id": "vt3-c6-e2",
    "chapter": 6,
    "level": "n2",
    "language": "analyse",
    "title": "Le radar technologique du groupe de presse La Dépêche du Matin",
    "exampleTitle": "Exemple résolu — le radar technologique d'une banque en ligne",
    "goal": "Lire un Tech Radar (quadrants et anneaux), calculer son indice moyen et mesurer l'effet d'un mouvement.",
    "brief": "<p><strong>Énoncé.</strong> Le comité d'architecture du groupe de presse La Dépêche du Matin publie son radar semestriel :</p><table><tr><th>Technologie</th><th>Quadrant</th><th>Anneau</th></tr><tr><td>Rust</td><td>Langages et cadres</td><td>TRIAL</td></tr><tr><td>Kubernetes</td><td>Plateformes</td><td>ADOPT</td></tr><tr><td>eBPF</td><td>Techniques</td><td>ASSESS</td></tr><tr><td>SVN</td><td>Outils</td><td>HOLD</td></tr><tr><td>Grafana</td><td>Outils</td><td>ADOPT</td></tr></table><p>Barème des anneaux (cours) : ADOPT vaut 100 points, TRIAL 75, ASSESS 50, HOLD 25. L'indice du radar est la moyenne des points des technologies placées ; le radar compte quatre anneaux et quatre quadrants.</p><p>Consignes : les réponses numériques s'écrivent en nombres seuls ; la question 4 demande un dénombrement.</p><ol><li>Combien d'anneaux compte le radar ?</li><li>Combien de points vaut la technologie Rust ?</li><li>Combien de points vaut la technologie SVN ?</li><li>Combien de technologies sont placées en anneau ADOPT ?</li><li>Quel est l'indice moyen du radar, arrondi à l'unité ?</li><li>Si eBPF passait d'ASSESS à TRIAL au semestre suivant, l'indice moyen augmenterait-il de combien de points ?</li></ol>",
    "starter": "# Exercice — Le radar technologique du groupe de presse La Dépêche du Matin\n# Lisez l'énoncé complet ci-dessus, puis répondez à chaque question dans son bloc.\n\n[Question 1 — Nombre d'anneaux du radar]\nA_COMPLETER\n\n[Question 2 — Points de la technologie Rust]\nA_COMPLETER\n\n[Question 3 — Points de la technologie SVN]\nA_COMPLETER\n\n[Question 4 — Technologies en anneau ADOPT]\nA_COMPLETER\n\n[Question 5 — Indice moyen du radar]\nA_COMPLETER\n\n[Question 6 — Gain de points si eBPF passe en TRIAL]\nA_COMPLETER\n",
    "hints": [
      "Traduisez d'abord chaque anneau en points : TRIAL 75, ADOPT 100, ASSESS 50, HOLD 25.",
      "Indice actuel : (75 + 100 + 50 + 25 + 100) / 5. Avec eBPF en TRIAL, son score passe de 50 à 75.",
      "Les deux seules technologies en ADOPT sont Kubernetes et Grafana ; pour la question 6, comparez l'indice avant et après le mouvement d'eBPF."
    ],
    "examples": [
      {
        "stdin": "Une banque en ligne place sur son radar :\n— Kafka (Plateformes, TRIAL) ;\n— Vue.js (Langages, ADOPT) ;\n— Istio (Techniques, ASSESS) ;\n— SOAP (Outils, HOLD).\n\nRésolution :\n1) Points : 75 + 100 + 50 + 25 = 250.\n2) Indice moyen : 250 / 4 = 62,5, arrondi à 63.\n3) Le radar compte 4 anneaux.",
        "expected": "indice moyen 62,5 arrondi à 63 — 4 anneaux",
        "note": "L'indice moyen se lit comme une photographie du patrimoine : sous 60, la dette technologique domine."
      }
    ],
    "tests": [
      {
        "label": "Question 1 — Nombre d'anneaux du radar",
        "stdin": "q:1",
        "expected": "4||quatre"
      },
      {
        "label": "Question 2 — Points de la technologie Rust",
        "stdin": "q:2",
        "expected": "75||75 points"
      },
      {
        "label": "Question 3 — Points de la technologie SVN",
        "stdin": "q:3",
        "expected": "25||25 points"
      },
      {
        "label": "Question 4 — Technologies en anneau ADOPT",
        "stdin": "q:4",
        "expected": "2||deux||2 (Kubernetes et Grafana)||deux (Kubernetes et Grafana)"
      },
      {
        "label": "Question 5 — Indice moyen du radar",
        "stdin": "q:5",
        "expected": "70||70 points"
      },
      {
        "label": "Question 6 — Gain de points si eBPF passe en TRIAL",
        "stdin": "q:6",
        "expected": "5||5 points"
      }
    ],
    "solution": "[Question 1 — Nombre d'anneaux du radar]\n4\n\n[Question 2 — Points de la technologie Rust]\n75\n\n[Question 3 — Points de la technologie SVN]\n25\n\n[Question 4 — Technologies en anneau ADOPT]\n2\n\n[Question 5 — Indice moyen du radar]\n70\n\n[Question 6 — Gain de points si eBPF passe en TRIAL]\n5",
    "takeaway": "1) Le radar compte 4 anneaux : ADOPT, TRIAL, ASSESS, HOLD.\n2) Rust est en TRIAL : 75 points.\n3) SVN est en HOLD : 25 points.\n4) Kubernetes et Grafana sont en ADOPT : 2 technologies.\n5) Indice moyen = (75 + 100 + 50 + 25 + 100) / 5 = 350 / 5 = 70.\n6) eBPF passerait de 50 à 75 points : nouvel indice = 375 / 5 = 75, soit +5 points.\nContrôle : 350 + 25 = 375, et 75 − 70 = 5 ; le gain se lit aussi directement : 25 points supplémentaires répartis sur 5 technologies."
  },
  {
    "id": "vt3-c6-e3",
    "chapter": 6,
    "level": "n3",
    "language": "analyse",
    "title": "Le tableau Kanban de la cellule de veille de la maison d'édition Boréal",
    "exampleTitle": "Exemple résolu — le tableau Kanban d'une cellule de banque de données économiques",
    "goal": "Lire un tableau Kanban de veille, calculer des lead times, identifier le goulot d'étranglement et chiffrer un renfort.",
    "brief": "<p><strong>Énoncé.</strong> La cellule de veille de la maison d'édition Boréal (marché du livre) fait défiler ses dossiers dans un Kanban à quatre étapes : Collecte, Analyse, Validation, Diffusion. Durées de la semaine, en heures :</p><table><tr><th>Dossier</th><th>Collecte</th><th>Analyse</th><th>Validation</th><th>Diffusion</th></tr><tr><td>D1</td><td>2</td><td>6</td><td>1</td><td>1</td></tr><tr><td>D2</td><td>4</td><td>4</td><td>2</td><td>1</td></tr><tr><td>D3</td><td>1</td><td>8</td><td>2</td><td>2</td></tr><tr><td>D4</td><td>3</td><td>5</td><td>1</td><td>1</td></tr><tr><td>D5</td><td>2</td><td>7</td><td>1</td><td>2</td></tr></table><p>Définitions : le lead time d'un dossier est la somme des durées de ses quatre étapes ; le goulot est l'étape qui totalise le plus d'heures sur la semaine.</p><p>Consignes : les durées s'écrivent en nombres seuls (heures) ; la question 3 attend le nom de l'étape.</p><ol><li>Quel est le lead time du dossier D3 ?</li><li>Quel est le lead time moyen des cinq dossiers, arrondi à une décimale ?</li><li>Quelle étape est le goulot d'étranglement ?</li><li>Combien d'heures l'étape Analyse a-t-elle consommées au total ?</li><li>Combien de dossiers dépassent strictement 11 heures de lead time ?</li><li>Un second analyste se consacre entièrement à l'étape Analyse : au mieux, en combien d'heures les cinq dossiers traversent-ils cette étape ?</li></ol>",
    "starter": "# Exercice — Le tableau Kanban de la cellule de veille de la maison d'édition Boréal\n# Lisez l'énoncé complet ci-dessus, puis répondez à chaque question dans son bloc.\n\n[Question 1 — Lead time du dossier D3]\nA_COMPLETER\n\n[Question 2 — Lead time moyen arrondi à une décimale]\nA_COMPLETER\n\n[Question 3 — Étape goulot d'étranglement]\nA_COMPLETER\n\n[Question 4 — Heures consommées par l'étape Analyse]\nA_COMPLETER\n\n[Question 5 — Dossiers au-delà de 11 heures]\nA_COMPLETER\n\n[Question 6 — Durée d'analyse avec un second analyste]\nA_COMPLETER\n",
    "hints": [
      "Lead time de D3 = 1 + 8 + 2 + 2. Additionnez colonne par colonne pour obtenir les totaux d'étapes.",
      "Totaux d'étapes : Collecte 12 h, Analyse 30 h, Validation 7 h, Diffusion 7 h ; le goulot est la colonne la plus lourde.",
      "Lead times : D1 10 h, D2 11 h, D3 13 h, D4 10 h, D5 12 h. Seuls ceux qui dépassent strictement 11 h comptent pour la question 5 ; pour la question 6, divisez la charge d'analyse par deux analystes."
    ],
    "examples": [
      {
        "stdin": "Une cellule de banque de données économiques suit quatre dossiers :\n— E1 : collecte 1 h, analyse 3 h, validation 1 h, diffusion 1 h ;\n— E2 : collecte 2 h, analyse 2 h, validation 1 h, diffusion 1 h ;\n— E3 : collecte 1 h, analyse 4 h, validation 2 h, diffusion 1 h ;\n— E4 : collecte 2 h, analyse 3 h, validation 1 h, diffusion 2 h.\n\nRésolution :\n1) Lead times : E1 6 h ; E2 6 h ; E3 8 h ; E4 8 h. Moyenne : 28 / 4 = 7 h.\n2) Totaux par étape : collecte 6 h ; analyse 12 h ; validation 5 h ; diffusion 5 h → goulot : l'analyse.\n3) Avec deux analystes en parallèle : 12 / 2 = 6 h.",
        "expected": "lead moyen 7 h — goulot : analyse — avec deux analystes : 6 h",
        "note": "Ajouter un analyste au goulot divise sa durée par deux ; en ajouter ailleurs ne change rien au délai."
      }
    ],
    "tests": [
      {
        "label": "Question 1 — Lead time du dossier D3",
        "stdin": "q:1",
        "expected": "13||13 h||13 heures"
      },
      {
        "label": "Question 2 — Lead time moyen arrondi à une décimale",
        "stdin": "q:2",
        "expected": "11,2||11.2||11,2 h"
      },
      {
        "label": "Question 3 — Étape goulot d'étranglement",
        "stdin": "q:3",
        "expected": "l'analyse||analyse||l'étape analyse||Analyse"
      },
      {
        "label": "Question 4 — Heures consommées par l'étape Analyse",
        "stdin": "q:4",
        "expected": "30||30 h||30 heures"
      },
      {
        "label": "Question 5 — Dossiers au-delà de 11 heures",
        "stdin": "q:5",
        "expected": "2||deux||2 (D3 et D5)||deux (D3 et D5)"
      },
      {
        "label": "Question 6 — Durée d'analyse avec un second analyste",
        "stdin": "q:6",
        "expected": "15||15 h||15 heures"
      }
    ],
    "solution": "[Question 1 — Lead time du dossier D3]\n13\n\n[Question 2 — Lead time moyen arrondi à une décimale]\n11,2\n\n[Question 3 — Étape goulot d'étranglement]\nl'analyse\n\n[Question 4 — Heures consommées par l'étape Analyse]\n30\n\n[Question 5 — Dossiers au-delà de 11 heures]\n2\n\n[Question 6 — Durée d'analyse avec un second analyste]\n15",
    "takeaway": "1) D3 : 1 + 8 + 2 + 2 = 13 heures.\n2) Lead times : 10 + 11 + 13 + 10 + 12 = 56 ; moyenne = 56 / 5 = 11,2 heures.\n3) Totaux d'étapes : Collecte 12 h, Analyse 30 h, Validation 7 h, Diffusion 7 h : le goulot est l'Analyse.\n4) L'Analyse a consommé 30 heures.\n5) D3 (13 h) et D5 (12 h) dépassent strictement 11 h : 2 dossiers.\n6) Deux analystes en parallèle : 30 / 2 = 15 heures au mieux.\nContrôle : 12 + 30 + 7 + 7 = 56 heures, identique à la somme des lead times ; la charge de l'analyse égale plus du double de chaque autre étape."
  }
];

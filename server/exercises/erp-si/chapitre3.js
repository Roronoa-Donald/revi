/**
 * chapitre3.js — Études de cas du cours « erp-si ».
 * Mode d'évaluation conceptuelle structurée (language: 'analyse').
 */
'use strict';

module.exports = [
  {
    "id": "erp2-c3-e1",
    "chapter": 3,
    "level": "n1",
    "language": "analyse",
    "title": "Du spaghetti au bus : les interfaces de la clinique Saint-Paul",
    "exampleTitle": "Exemple résolu — les applications de la communauté de communes du Val Clair",
    "goal": "Comparer le nombre d'interfaces d'une architecture point-à-point et d'une architecture en bus de services.",
    "brief": "<p><strong>Énoncé.</strong> La clinique Saint-Paul exploite huit applications : le logiciel de facturation, le dossier patient, le système du laboratoire, la gestion des stocks de pharmacie, la paie, le planning des soignants, le portail des patients et l'outil de reporting de la direction. Aujourd'hui, ces huit applications sont reliées deux à deux en point-à-point : chaque paire d'applications échange par une interface spécifique (architecture spaghetti). La direction étudie leur remplacement par un bus de services (ESB) : chaque application serait alors reliée une seule fois au bus.</p><p>Rappel : relier N applications deux à deux exige N × (N − 1) ÷ 2 interfaces ; un bus exige une interface par application. Répondez par le nombre seul, sauf la question 5 (un nom).</p><ol><li>Combien d'interfaces compte aujourd'hui l'architecture point-à-point de la clinique ?</li><li>Avec un bus ESB, combien de connecteurs seraient nécessaires ?</li><li>Combien d'interfaces le bus ferait-il économiser à la clinique ?</li><li>Si deux applications seulement devaient dialoguer, combien d'interfaces le point-à-point exigerait-il ?</li><li>Dans ce cas à deux applications, quel modèle est le plus simple à mettre en place : le point-à-point ou le bus ?</li><li>Quelle est la formule qui donne le nombre d'interfaces point-à-point en fonction du nombre N d'applications ?</li></ol>",
    "starter": "# Exercice — Du spaghetti au bus : les interfaces de la clinique Saint-Paul\n# Lisez l'énoncé complet ci-dessus, puis répondez à chaque question dans son bloc.\n# Le nombre seul ; question 6 : la formule au format N*(N-1)/2.\n\n[Question 1 — Interfaces en point-à-point (8 applications)]\nA_COMPLETER\n\n[Question 2 — Connecteurs avec un bus ESB]\nA_COMPLETER\n\n[Question 3 — Économie d'interfaces apportée par le bus]\nA_COMPLETER\n\n[Question 4 — Interfaces point-à-point pour 2 applications]\nA_COMPLETER\n\n[Question 5 — Modèle le plus simple pour 2 applications]\nA_COMPLETER\n\n[Question 6 — Formule du nombre d'interfaces point-à-point]\nA_COMPLETER\n",
    "hints": [
      "En point-à-point, chaque application doit savoir parler à toutes les autres : le nombre d'interfaces croît bien plus vite que le nombre d'applications.",
      "Le bus centralise les échanges : une application n'a plus qu'une seule interface à maintenir, la sienne vers le bus.",
      "1. Point-à-point : 8 × 7 ÷ 2. 2. Bus : une interface par application. 3. Économie = point-à-point − bus. 4. Pour 2 applications : 2 × 1 ÷ 2. 5. Comparez une interface directe contre un bus à administrer. 6. Généralisez avec N applications."
    ],
    "examples": [
      {
        "stdin": "La communauté de communes du Val Clair exploite 6 applications en point-à-point.\n1) Point-à-point : 6 × 5 ÷ 2 = 15 interfaces.\n2) Bus ESB : 6 connecteurs.\n3) Économie : 15 − 6 = 9 interfaces.\n4) Avec 2 applications seulement : 2 × 1 ÷ 2 = 1 interface en point-à-point,\ncontre 2 connecteurs avec un bus : le point-à-point suffit.",
        "expected": "15 interfaces point-à-point — 6 connecteurs bus — 9 interfaces économisées — pour 2 applications : 1 interface, le point-à-point suffit",
        "note": "Le bus ne se justifie qu'au-delà de quelques applications : en dessous de trois, le point-à-point reste plus léger."
      }
    ],
    "tests": [
      {
        "label": "Question 1 — Interfaces en point-à-point (8 applications)",
        "stdin": "q:1",
        "expected": "28"
      },
      {
        "label": "Question 2 — Connecteurs avec un bus ESB",
        "stdin": "q:2",
        "expected": "8"
      },
      {
        "label": "Question 3 — Économie d'interfaces apportée par le bus",
        "stdin": "q:3",
        "expected": "20"
      },
      {
        "label": "Question 4 — Interfaces point-à-point pour 2 applications",
        "stdin": "q:4",
        "expected": "1"
      },
      {
        "label": "Question 5 — Modèle le plus simple pour 2 applications",
        "stdin": "q:5",
        "expected": "point-à-point||point a point||le point-à-point||point-a-point||point à point||le point à point"
      },
      {
        "label": "Question 6 — Formule du nombre d'interfaces point-à-point",
        "stdin": "q:6",
        "expected": "N*(N-1)/2||n*(n-1)/2||N(N-1)/2||N × (N − 1) ÷ 2||N x (N - 1) / 2"
      }
    ],
    "solution": "[Question 1 — Interfaces en point-à-point (8 applications)]\n28\n\n[Question 2 — Connecteurs avec un bus ESB]\n8\n\n[Question 3 — Économie d'interfaces apportée par le bus]\n20\n\n[Question 4 — Interfaces point-à-point pour 2 applications]\n1\n\n[Question 5 — Modèle le plus simple pour 2 applications]\npoint-à-point\n\n[Question 6 — Formule du nombre d'interfaces point-à-point]\nN*(N-1)/2",
    "takeaway": "1) Huit applications reliées deux à deux : 8 × 7 ÷ 2 = 28 interfaces.\n2) Avec un bus, chaque application se branche une seule fois : 8 connecteurs.\n3) Économie : 28 − 8 = 20 interfaces à maintenir en moins.\n4) Deux applications : 2 × 1 ÷ 2 = 1 interface en point-à-point.\n5) Pour deux applications, une seule interface directe suffit : le point-à-point est plus simple qu'un bus à administrer.\n6) La formule générale est N × (N − 1) ÷ 2.\nContrôle : 28 interfaces pour 8 applications, soit plus de trois interfaces par application en moyenne, contre une seule avec le bus."
  },
  {
    id: "erp2-c3-e2",
    chapter: 3,
    level: "n2",
    language: 'analyse',
    title: "Mappage de message pivot EDI / JSON",
    goal: "Transformer un message reçu d’un partenaire vers le format canonique de l’ERP.",
    brief: "<p>Un middleware EAI reçoit des messages hétérogènes et les mappe vers le format pivot interne de l’ERP.</p><p>Lit un objet JSON représentant une commande externe au format partenaire :<br><code>{\"ref_ext\": \"CMD-88\", \"partenaire\": \"FOURN_12\", \"lignes\": [{\"article\": \"A1\", \"qte\": 10, \"prix\": 15.0}, ...]}</code>.<br>Transforme ce payload en objet pivot ERP canonique contenant :<br>- <code>\"order_id\"</code>: valeur de ref_ext<br>- <code>\"vendor_id\"</code>: valeur de partenaire<br>- <code>\"items_count\"</code>: nombre total d’articles physiques (somme des <code>qte</code>)<br>- <code>\"total_ht\"</code>: montant total calculé <code>round(somme(qte * prix), 2)</code><br>Affiche le dictionnaire pivot sérialisé en JSON compact trié (<code>json.dumps(..., sort_keys=True)</code>).</p>",
    starter: "# Grille d'analyse (erp2-c3-e2) — Mappage de message pivot EDI / JSON\n# Complétez la réponse attendue sous chaque cas ci-dessous :\n\n[Cas 1 — Commande multi-lignes]\n# Données : {\"ref_ext\": \"PO-900\", \"partenaire\": \"ACME\", \"lignes\": [{\"article\": \"CLAVIER\", \"qte\": 5, \"prix\": 25.5}, {\"article\": \"SOURIS\", \"qte\": 10, \"prix\": 12.0}]}\nA_COMPLETER\n\n[Cas 2 — Commande sans articles]\n# Données : {\"ref_ext\": \"CMD-00\", \"partenaire\": \"TEST\", \"lignes\": []}\nA_COMPLETER\n\n[Cas 3 — Ligne unique avec décimales]\n# Données : {\"ref_ext\": \"PO-101\", \"partenaire\": \"SUPPLY\", \"lignes\": [{\"article\": \"CABLE\", \"qte\": 20, \"prix\": 4.99}]}\nA_COMPLETER\n",
    hints: [
          "Itère sur message.get(\"lignes\", []).",
          "total_ht = round(sum(ligne[\"qte\"] * ligne[\"prix\"] for ligne in lignes), 2).",
          "items_count = sum(ligne[\"qte\"] for ligne in lignes)."
    ],
    examples: [
          {
                "stdin": "{\"lignes\": [{\"article\": \"A1\", \"prix\": 15.0, \"qte\": 10}], \"partenaire\": \"FOURN_12\", \"ref_ext\": \"CMD-88\"}",
                "expected": "{\"items_count\": 10, \"order_id\": \"CMD-88\", \"total_ht\": 150.0, \"vendor_id\": \"FOURN_12\"}",
                "note": "Mapping pivot avec calculs de somme."
          }
    ],
    tests: [
          {
                "label": "Commande multi-lignes",
                "stdin": "cas:1",
                "expected": "{\"items_count\": 15, \"order_id\": \"PO-900\", \"total_ht\": 247.5, \"vendor_id\": \"ACME\"}"
          },
          {
                "label": "Commande sans articles",
                "stdin": "cas:2",
                "expected": "{\"items_count\": 0, \"order_id\": \"CMD-00\", \"total_ht\": 0.0, \"vendor_id\": \"TEST\"}"
          },
          {
                "label": "Ligne unique avec décimales",
                "stdin": "cas:3",
                "expected": "{\"items_count\": 20, \"order_id\": \"PO-101\", \"total_ht\": 99.8, \"vendor_id\": \"SUPPLY\"}"
          }
    ],
    solution: "[Exemple]\n{\"items_count\": 10, \"order_id\": \"CMD-88\", \"total_ht\": 150.0, \"vendor_id\": \"FOURN_12\"}\n\n[Cas 1 — Commande multi-lignes]\n{\"items_count\": 15, \"order_id\": \"PO-900\", \"total_ht\": 247.5, \"vendor_id\": \"ACME\"}\n\n[Cas 2 — Commande sans articles]\n{\"items_count\": 0, \"order_id\": \"CMD-00\", \"total_ht\": 0.0, \"vendor_id\": \"TEST\"}\n\n[Cas 3 — Ligne unique avec décimales]\n{\"items_count\": 20, \"order_id\": \"PO-101\", \"total_ht\": 99.8, \"vendor_id\": \"SUPPLY\"}\n",
    takeaway: "À retenir : Transformer un message reçu d’un partenaire vers le format canonique de l’ERP.\nRepère : Mapping pivot avec calculs de somme."
  },
  {
    id: "erp2-c3-e3",
    chapter: 3,
    level: "n3",
    language: 'analyse',
    title: "Pipeline ETL : Déduplication de flux",
    goal: "Filtrer et dédupliquer une liste de contacts importés dans l’ERP en conservant l’enregistrement le plus récent.",
    brief: "<p>Une étape clé d’un processus ETL (Extract-Transform-Load) lors de l’alimentation de l’ERP consiste à éliminer les doublons tout en conservant les données les plus à jour (Master Data Management).</p><p>Analyse une liste JSON de contacts fourni(e) dans les données du cas. Chaque fiche contient :<br><code>{\"email\": \"...\", \"nom\": \"...\", \"version\": int}</code>.<br>1. Si un même <code>email</code> apparaît plusieurs fois (insensible à la casse), conserve uniquement la fiche ayant le plus grand numéro de <code>version</code>.<br>2. Passe la valeur du champ <code>nom</code> en majuscules (.upper()).<br>3. Normalise l’email en minuscules (.lower()).<br>Affiche la liste finale dédupliquée, <strong>triée par ordre alphabétique de l’email</strong>, avec <code>json.dumps(..., sort_keys=True)</code>.</p>",
    starter: "# Grille d'analyse (erp2-c3-e3) — Pipeline ETL : Déduplication de flux\n# Complétez la réponse attendue sous chaque cas ci-dessous :\n\n[Cas 1 — Plusieurs contacts distincts avec doublon]\n# Données : [{\"email\": \"bob@test.com\", \"nom\": \"Bob\", \"version\": 1}, {\"email\": \"claire@test.com\", \"nom\": \"Claire\", \"version\": 1}, {\"email\": \"bob@test.com\", \"nom\": \"Robert\", \"version\": 3}]\nA_COMPLETER\n\n[Cas 2 — Aucun doublon]\n# Données : [{\"email\": \"zack@domaine.fr\", \"nom\": \"Zack\", \"version\": 1}, {\"email\": \"adam@domaine.fr\", \"nom\": \"Adam\", \"version\": 1}]\nA_COMPLETER\n\n[Cas 3 — Liste vide]\n# Données : []\nA_COMPLETER\n",
    hints: [
          "Utilisez un dictionnaire indexé par email.lower().",
          "Si un email existe déjà, compare les numéros de version.",
          "Extrayez les valeurs et trie la liste résultante avec sorted(..., key=lambda c: c[\"email\"])."
    ],
    examples: [
          {
                "stdin": "[{\"email\": \"ALICE@site.fr\", \"nom\": \"Alice\", \"version\": 1}, {\"email\": \"alice@site.fr\", \"nom\": \"Alice Martin\", \"version\": 2}]",
                "expected": "[{\"email\": \"alice@site.fr\", \"nom\": \"ALICE MARTIN\", \"version\": 2}]",
                "note": "La version 2 a écrasé la version 1."
          }
    ],
    tests: [
          {
                "label": "Plusieurs contacts distincts avec doublon",
                "stdin": "cas:1",
                "expected": "[{\"email\": \"bob@test.com\", \"nom\": \"ROBERT\", \"version\": 3}, {\"email\": \"claire@test.com\", \"nom\": \"CLAIRE\", \"version\": 1}]"
          },
          {
                "label": "Aucun doublon",
                "stdin": "cas:2",
                "expected": "[{\"email\": \"adam@domaine.fr\", \"nom\": \"ADAM\", \"version\": 1}, {\"email\": \"zack@domaine.fr\", \"nom\": \"ZACK\", \"version\": 1}]"
          },
          {
                "label": "Liste vide",
                "stdin": "cas:3",
                "expected": "[]"
          }
    ],
    solution: "[Exemple]\n[{\"email\": \"alice@site.fr\", \"nom\": \"ALICE MARTIN\", \"version\": 2}]\n\n[Cas 1 — Plusieurs contacts distincts avec doublon]\n[{\"email\": \"bob@test.com\", \"nom\": \"ROBERT\", \"version\": 3}, {\"email\": \"claire@test.com\", \"nom\": \"CLAIRE\", \"version\": 1}]\n\n[Cas 2 — Aucun doublon]\n[{\"email\": \"adam@domaine.fr\", \"nom\": \"ADAM\", \"version\": 1}, {\"email\": \"zack@domaine.fr\", \"nom\": \"ZACK\", \"version\": 1}]\n\n[Cas 3 — Liste vide]\n[]\n",
    takeaway: "À retenir : Filtrer et dédupliquer une liste de contacts importés dans l’ERP en conservant l’enregistrement le plus récent.\nRepère : La version 2 a écrasé la version 1."
  }
];

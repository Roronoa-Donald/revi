/**
 * chapitre3.js — Études de cas du cours « erp-si ».
 * Mode d'évaluation conceptuelle structurée (language: 'analyse').
 */
'use strict';

module.exports = [
  {
    id: "erp2-c3-e1",
    chapter: 3,
    level: "n1",
    language: 'analyse',
    title: "Point-à-Point vs Hub d’intégration EAI",
    goal: "Calculer la complexité d’interconnexion entre N applications d’entreprise.",
    brief: "<p>Dans une intégration <strong>Point-à-Point</strong> (spaghetti), relier <code>N</code> applications deux à deux requiert <code>N * (N - 1) / 2</code> interfaces spécifiques. À l’inverse, une architecture orientée <strong>Hub EAI ou ESB</strong> ne nécessite qu’un connecteur par application vers le bus central, soit exactement <code>N</code> interfaces.</p><p>Lit le nombre entier d’applications <code>N</code> sur l’entrée standard (<code>N &gt;= 2</code>).<br>Calcule le nombre d’interfaces nécessaires dans les deux modèles ainsi que le gain d’interfaces apporté par le Hub.<br>Affiche le résultat sous la forme :<br><code>Point-a-Point: &lt;X&gt; | Hub ESB: &lt;Y&gt; | Gain: &lt;Z&gt; interfaces</code>.</p>",
    starter: "# Grille d'analyse (erp2-c3-e1) — Point-à-Point vs Hub d’intégration EAI\n# Complétez la réponse attendue sous chaque cas ci-dessous :\n\n[Cas 1 — Deux applications]\n# Données : 2\nA_COMPLETER\n\n[Cas 2 — Dix applications en SI d’entreprise]\n# Données : 10\nA_COMPLETER\n\n[Cas 3 — Vingt applications hétérogènes]\n# Données : 20\nA_COMPLETER\n",
    hints: [
          "Point-à-point = n * (n - 1) // 2.",
          "Hub ESB = n.",
          "Gain = point_a_point - hub_esb."
    ],
    examples: [
          {
                "stdin": "6",
                "expected": "Point-a-Point: 15 | Hub ESB: 6 | Gain: 9 interfaces",
                "note": "Pour 6 applications : 15 interfaces spécifiques contre 6 avec un bus."
          }
    ],
    tests: [
          {
                "label": "Deux applications",
                "stdin": "cas:1",
                "expected": "Point-a-Point: 1 | Hub ESB: 2 | Gain: -1 interfaces"
          },
          {
                "label": "Dix applications en SI d’entreprise",
                "stdin": "cas:2",
                "expected": "Point-a-Point: 45 | Hub ESB: 10 | Gain: 35 interfaces"
          },
          {
                "label": "Vingt applications hétérogènes",
                "stdin": "cas:3",
                "expected": "Point-a-Point: 190 | Hub ESB: 20 | Gain: 170 interfaces"
          }
    ],
    solution: "[Exemple]\nPoint-a-Point: 15 | Hub ESB: 6 | Gain: 9 interfaces\n\n[Cas 1 — Deux applications]\nPoint-a-Point: 1 | Hub ESB: 2 | Gain: -1 interfaces\n\n[Cas 2 — Dix applications en SI d’entreprise]\nPoint-a-Point: 45 | Hub ESB: 10 | Gain: 35 interfaces\n\n[Cas 3 — Vingt applications hétérogènes]\nPoint-a-Point: 190 | Hub ESB: 20 | Gain: 170 interfaces\n"
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
    solution: "[Exemple]\n{\"items_count\": 10, \"order_id\": \"CMD-88\", \"total_ht\": 150.0, \"vendor_id\": \"FOURN_12\"}\n\n[Cas 1 — Commande multi-lignes]\n{\"items_count\": 15, \"order_id\": \"PO-900\", \"total_ht\": 247.5, \"vendor_id\": \"ACME\"}\n\n[Cas 2 — Commande sans articles]\n{\"items_count\": 0, \"order_id\": \"CMD-00\", \"total_ht\": 0.0, \"vendor_id\": \"TEST\"}\n\n[Cas 3 — Ligne unique avec décimales]\n{\"items_count\": 20, \"order_id\": \"PO-101\", \"total_ht\": 99.8, \"vendor_id\": \"SUPPLY\"}\n"
  },
  {
    id: "erp2-c3-e3",
    chapter: 3,
    level: "n3",
    language: 'analyse',
    title: "Pipeline ETL : Déduplication de flux",
    goal: "Filtrer et dédupliquer une liste de contacts importés dans l’ERP en conservant l’enregistrement le plus récent.",
    brief: "<p>Une étape clé d’un processus ETL (Extract-Transform-Load) lors de l’alimentation de l’ERP consiste à éliminer les doublons tout en conservant les données les plus à jour (Master Data Management).</p><p>Lit une liste JSON de contacts sur l’entrée standard. Chaque fiche contient :<br><code>{\"email\": \"...\", \"nom\": \"...\", \"version\": int}</code>.<br>1. Si un même <code>email</code> apparaît plusieurs fois (insensible à la casse), conserve uniquement la fiche ayant le plus grand numéro de <code>version</code>.<br>2. Passe la valeur du champ <code>nom</code> en majuscules (.upper()).<br>3. Normalise l’email en minuscules (.lower()).<br>Affiche la liste finale dédupliquée, <strong>triée par ordre alphabétique de l’email</strong>, avec <code>json.dumps(..., sort_keys=True)</code>.</p>",
    starter: "# Grille d'analyse (erp2-c3-e3) — Pipeline ETL : Déduplication de flux\n# Complétez la réponse attendue sous chaque cas ci-dessous :\n\n[Cas 1 — Plusieurs contacts distincts avec doublon]\n# Données : [{\"email\": \"bob@test.com\", \"nom\": \"Bob\", \"version\": 1}, {\"email\": \"claire@test.com\", \"nom\": \"Claire\", \"version\": 1}, {\"email\": \"bob@test.com\", \"nom\": \"Robert\", \"version\": 3}]\nA_COMPLETER\n\n[Cas 2 — Aucun doublon]\n# Données : [{\"email\": \"zack@domaine.fr\", \"nom\": \"Zack\", \"version\": 1}, {\"email\": \"adam@domaine.fr\", \"nom\": \"Adam\", \"version\": 1}]\nA_COMPLETER\n\n[Cas 3 — Liste vide]\n# Données : []\nA_COMPLETER\n",
    hints: [
          "Utilise un dictionnaire indexé par email.lower().",
          "Si un email existe déjà, compare les numéros de version.",
          "Extrais les valeurs et trie la liste résultante avec sorted(..., key=lambda c: c[\"email\"])."
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
    solution: "[Exemple]\n[{\"email\": \"alice@site.fr\", \"nom\": \"ALICE MARTIN\", \"version\": 2}]\n\n[Cas 1 — Plusieurs contacts distincts avec doublon]\n[{\"email\": \"bob@test.com\", \"nom\": \"ROBERT\", \"version\": 3}, {\"email\": \"claire@test.com\", \"nom\": \"CLAIRE\", \"version\": 1}]\n\n[Cas 2 — Aucun doublon]\n[{\"email\": \"adam@domaine.fr\", \"nom\": \"ADAM\", \"version\": 1}, {\"email\": \"zack@domaine.fr\", \"nom\": \"ZACK\", \"version\": 1}]\n\n[Cas 3 — Liste vide]\n[]\n"
  }
];

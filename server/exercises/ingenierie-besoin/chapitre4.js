/**
 * chapitre4.js — Études de cas du cours « ingenierie-besoin ».
 * Mode d'évaluation conceptuelle structurée (language: 'analyse').
 */
'use strict';

module.exports = [
  {
    id: "ib2-c4-e1",
    chapter: 4,
    level: "n1",
    language: 'analyse',
    title: "Analyseur syntaxique de User Story",
    goal: "Découper et valider une User Story selon le gabarit canonique Connextra.",
    brief: "<p>Le format standard d’une <strong>User Story</strong> s’énonce :<br><code>En tant que &lt;Role&gt;, je veux &lt;Action&gt;, afin de &lt;Benefice&gt;.</code> (la ponctuation finale peut être un point ou absente).</p><p>Analyse une ligne fourni(e) dans les données du cas et extrait les 3 composantes :<br>- Si la syntaxe est respectée et que les trois éléments sont non vides, affiche :<br><code>ROLE: &lt;Role&gt; | ACTION: &lt;Action&gt; | BENEFICE: &lt;Benefice&gt;</code>.<br>- Si l’un des motifs ou éléments manque, affiche :<br><code>ERREUR: Format User Story non respecte</code>.</p>",
    starter: "# Grille d'analyse (ib2-c4-e1) — Analyseur syntaxique de User Story\n# Complétez la réponse attendue sous chaque cas ci-dessous :\n\n[Cas 1 — Test 1]\n# Données : En tant qu administrateur, je veux bannir un spammeur, afin de proteger la communaute\nA_COMPLETER\n\n[Cas 2 — Test 2]\n# Données : Je veux exporter mes factures en PDF directement.\nA_COMPLETER\n\n[Cas 3 — Test 3]\n# Données : En tant que comptable, je veux cloturer l exercice, afin d eviter les retards fiscaux.\nA_COMPLETER\n",
    hints: [
          "Utilisez une expression régulière avec re.search() ou re.match() insensible à la casse.",
          "Pattern suggéré : r\"en tant qu[e']\\s*(.+?),?\\s*je veux\\s*(.+?),?\\s*afin d[e']?\\s*(.+?)\\.?$\""
    ],
    examples: [
          {
                "stdin": "En tant que client, je veux reinitialiser mon mot de passe, afin de recuperer l acces a mon compte.",
                "expected": "ROLE: client | ACTION: reinitialiser mon mot de passe | BENEFICE: recuperer l acces a mon compte",
                "note": "Les trois composantes sont correctement extraites et nettoyées des espaces et virgules superflus."
          }
    ],
    tests: [
          {
                "label": "Test 1",
                "stdin": "cas:1",
                "expected": "ROLE: administrateur | ACTION: bannir un spammeur | BENEFICE: proteger la communaute"
          },
          {
                "label": "Test 2",
                "stdin": "cas:2",
                "expected": "ERREUR: Format User Story non respecte"
          },
          {
                "label": "Test 3",
                "stdin": "cas:3",
                "expected": "ROLE: comptable | ACTION: cloturer l exercice | BENEFICE: eviter les retards fiscaux"
          }
    ],
    solution: "[Exemple]\nROLE: client | ACTION: reinitialiser mon mot de passe | BENEFICE: recuperer l acces a mon compte\n\n[Cas 1 — Test 1]\nROLE: administrateur | ACTION: bannir un spammeur | BENEFICE: proteger la communaute\n\n[Cas 2 — Test 2]\nERREUR: Format User Story non respecte\n\n[Cas 3 — Test 3]\nROLE: comptable | ACTION: cloturer l exercice | BENEFICE: eviter les retards fiscaux\n"
  },
  {
    id: "ib2-c4-e2",
    chapter: 4,
    level: "n2",
    language: 'analyse',
    title: "Priorisation MoSCoW d’un Backlog",
    goal: "Calculer la répartition des points d’effort par catégorie MoSCoW dans un sprint ou une release.",
    brief: "<p>La méthode <strong>MoSCoW</strong> classe les exigences en 4 catégories : <code>Must</code>, <code>Should</code>, <code>Could</code> et <code>Won't</code>.</p><p>À partir des données du cas :<br>- Première ligne : le nombre <code>N</code> d’exigences.<br>- Les <code>N</code> lignes suivantes : <code>ID;Titre;MoSCoW;Points</code> (Points est un entier &ge; 0).<br>Affiche un dictionnaire JSON avec les totaux par catégorie et le total général au format strict :<br><code>{\"Must\": X, \"Should\": Y, \"Could\": Z, \"Wont\": W, \"Total\": T}</code>.</p>",
    starter: "# Grille d'analyse (ib2-c4-e2) — Priorisation MoSCoW d’un Backlog\n# Complétez la réponse attendue sous chaque cas ci-dessous :\n\n[Cas 1 — Test 1]\n# Données : REQ-01;Paiement;Must;8\n# Données : REQ-02;Remboursement;Must;5\nA_COMPLETER\n\n[Cas 2 — Test 2]\n# Données : US-10;Export;Could;3\n# Données : US-11;Audit;Wont;5\n# Données : US-12;SSO;Must;8\n# Données : US-13;PDF;Should;5\nA_COMPLETER\n\n[Cas 3 — Test 3]\n# Données : US-99;Refonte globale;Won't;13\nA_COMPLETER\n",
    hints: [
          "Initialisez un dictionnaire avec {\"Must\": 0, \"Should\": 0, \"Could\": 0, \"Wont\": 0}.",
          "Attention à mapper \"Won't\" ou \"Wont\" vers la clé \"Wont\" dans la sortie JSON.",
          "Utilisez json.dumps(res) pour afficher le JSON sur une seule ligne."
    ],
    examples: [
          {
                "stdin": "3\nUS-1;Connexion;Must;5\nUS-2;Filtres;Should;3\nUS-3;Theme sombre;Could;2",
                "expected": "{\"Must\": 5, \"Should\": 3, \"Could\": 2, \"Wont\": 0, \"Total\": 10}",
                "note": "Must: 5, Should: 3, Could: 2, Wont: 0, Total: 10 points."
          }
    ],
    tests: [
          {
                "label": "Test 1",
                "stdin": "cas:1",
                "expected": "{\"Must\": 13, \"Should\": 0, \"Could\": 0, \"Wont\": 0, \"Total\": 13}"
          },
          {
                "label": "Test 2",
                "stdin": "cas:2",
                "expected": "{\"Must\": 8, \"Should\": 5, \"Could\": 3, \"Wont\": 5, \"Total\": 21}"
          },
          {
                "label": "Test 3",
                "stdin": "cas:3",
                "expected": "{\"Must\": 0, \"Should\": 0, \"Could\": 0, \"Wont\": 13, \"Total\": 13}"
          }
    ],
    solution: "[Exemple]\n{\"Must\": 5, \"Should\": 3, \"Could\": 2, \"Wont\": 0, \"Total\": 10}\n\n[Cas 1 — Test 1]\n{\"Must\": 13, \"Should\": 0, \"Could\": 0, \"Wont\": 0, \"Total\": 13}\n\n[Cas 2 — Test 2]\n{\"Must\": 8, \"Should\": 5, \"Could\": 3, \"Wont\": 5, \"Total\": 21}\n\n[Cas 3 — Test 3]\n{\"Must\": 0, \"Should\": 0, \"Could\": 0, \"Wont\": 13, \"Total\": 13}\n"
  },
  {
    id: "ib2-c4-e3",
    chapter: 4,
    level: "n3",
    language: 'analyse',
    title: "Ordonnancement WSJF (Weighted Shortest Job First)",
    goal: "Calculer le score d’opportunité WSJF pour ordonnancer les fonctionnalités les plus rentables.",
    brief: "<p>En méthodologie agile à l’échelle (SAFe), l’algorithme <strong>WSJF</strong> priorise les fonctionnalités maximisant la valeur par unité de temps :<br>1. <strong>CoD (Cost of Delay / Coût du retard)</strong> = <code>Valeur_Metier + Criticite_Temporelle + Reduction_Risque</code>.<br>2. <strong>Score WSJF</strong> = <code>CoD / Taille_Job</code>.</p><p>Lit une ligne au format <code>ID;Valeur;Temps;Risque;Taille</code> (les 4 métriques sont des entiers &gt; 0).<br>Affiche : <code>ID: &lt;ID&gt; | CoD: &lt;CoD&gt; | WSJF: &lt;Score arrondi à 2 décimales&gt;</code>.</p>",
    starter: "# Grille d'analyse (ib2-c4-e3) — Ordonnancement WSJF (Weighted Shortest Job First)\n# Complétez la réponse attendue sous chaque cas ci-dessous :\n\n[Cas 1 — Test 1]\n# Données : FEAT-202;10;8;6;5\nA_COMPLETER\n\n[Cas 2 — Test 2]\n# Données : FEAT-303;3;2;1;3\nA_COMPLETER\n\n[Cas 3 — Test 3]\n# Données : FEAT-404;13;8;5;8\nA_COMPLETER\n",
    hints: [
          "Découpez la ligne avec l’extraction des champs.",
          "Calculez cod = val + temps + risque, puis wsjf = cod / taille.",
          "Formate le score avec f\"{wsjf:.2f}\"."
    ],
    examples: [
          {
                "stdin": "FEAT-101;8;5;3;2",
                "expected": "ID: FEAT-101 | CoD: 16 | WSJF: 8.00",
                "note": "CoD = 8 + 5 + 3 = 16. WSJF = 16 / 2 = 8.00."
          }
    ],
    tests: [
          {
                "label": "Test 1",
                "stdin": "cas:1",
                "expected": "ID: FEAT-202 | CoD: 24 | WSJF: 4.80"
          },
          {
                "label": "Test 2",
                "stdin": "cas:2",
                "expected": "ID: FEAT-303 | CoD: 6 | WSJF: 2.00"
          },
          {
                "label": "Test 3",
                "stdin": "cas:3",
                "expected": "ID: FEAT-404 | CoD: 26 | WSJF: 3.25"
          }
    ],
    solution: "[Exemple]\nID: FEAT-101 | CoD: 16 | WSJF: 8.00\n\n[Cas 1 — Test 1]\nID: FEAT-202 | CoD: 24 | WSJF: 4.80\n\n[Cas 2 — Test 2]\nID: FEAT-303 | CoD: 6 | WSJF: 2.00\n\n[Cas 3 — Test 3]\nID: FEAT-404 | CoD: 26 | WSJF: 3.25\n"
  }
];

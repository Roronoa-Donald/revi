/**
 * chapitre5.js — Études de cas du cours « b3-document-technique ».
 * Mode d'évaluation conceptuelle structurée (language: 'analyse').
 */
'use strict';

module.exports = [
  {
    id: "dt3-c5-e1",
    chapter: 5,
    level: "n1",
    language: 'analyse',
    title: "Linter de hiérarchie des titres Markdown (Structure Docs-as-Code)",
    goal: "Vérifier la rigueur structurelle d’un document Markdown : H1 unique, progression de niveau sans saut abrupt et absence de titre vide.",
    brief: "<p>Pour chaque cas d’application un en-tête suivi de lignes de titres Markdown :<br>\n<code>MD_DOC nom=&lt;nom&gt; titres=&lt;t1|t2|...&gt;</code>.<br>\nChaque titre $t_i$ commence par un ou plusieurs <code>#</code> suivis du texte (ex. <code># Titre</code>, <code>## Section</code>).<br><br>\nRègles de validation :<br>\n1. <strong>Nombre de H1 :</strong> le document doit comporter <strong>exactement un</strong> titre de niveau 1 (<code># </code>). Si 0 ou &gt; 1, ajouter l'anomalie <code>H1_NON_UNIQUE</code>.<br>\n2. <strong>Titres vides :</strong> aucun titre ne doit être vide après les <code>#</code> (ex. <code>## </code> sans texte). Si détecté, ajouter <code>TITRE_VIDE</code>.<br>\n3. <strong>Sauts de niveau :</strong> le niveau d'un sous-titre ne doit jamais dépasser le niveau précédent de plus de 1 (ex. passer de <code>#</code> à <code>###</code> est interdit car le niveau 2 est sauté). Si détecté, ajouter <code>SAUT_DE_NIVEAU_INTERDIT</code>.<br><br>\nStatut :<br>\n- Si aucune anomalie : <code>STATUT=STRUCTURE_MARKDOWN_VALIDE</code><br>\n- Sinon : <code>STATUT=NON_CONFORME (ANOMALIES=[&lt;anomalies_uniques_ordonnees&gt;])</code><br>\n(Ordre : <code>H1_NON_UNIQUE</code>, <code>TITRE_VIDE</code>, <code>SAUT_DE_NIVEAU_INTERDIT</code>).<br><br>\nAfficher :<br>\n<code>MD_LINTER: &lt;nom&gt; -&gt; STATUT=&lt;STATUT&gt;</code></p>",
    starter: "# Grille d'analyse (dt3-c5-e1) — Linter de hiérarchie des titres Markdown (Structure Docs-as-Code)\n# Complétez la réponse attendue sous chaque cas ci-dessous :\n\n[Cas 1 — Saut abrupt de niveau 1 vers niveau 3 interdit]\n# Données : MD_DOC nom=archi.md titres=# Architecture Système|### Microservices|#### Base de données\nA_COMPLETER\n\n[Cas 2 — Deux titres H1 dans le même document]\n# Données : MD_DOC nom=double_h1.md titres=# Titre Un|## Section A|# Titre Deux|## Section B\nA_COMPLETER\n\n[Cas 3 — Titre vide et saut de niveau simultanés]\n# Données : MD_DOC nom=bug.md titres=# Racine|### |## Section\nA_COMPLETER\n",
    hints: [
          "Compter les symboles # initiaux pour trouver le niveau du titre.",
          "Suivre le niveau précédent pour vérifier qu’il n’y a pas de saut de niveau supérieur à +1."
    ],
    examples: [
          {
                "stdin": "MD_DOC nom=guide.md titres=# Guide d'installation|## Prérequis|### Système|## Configuration",
                "expected": "MD_LINTER: guide.md -> STATUT=STRUCTURE_MARKDOWN_VALIDE",
                "note": "Un seul H1, pas de titre vide, progression 1 -> 2 -> 3 -> 2 valide."
          }
    ],
    tests: [
          {
                "label": "Saut abrupt de niveau 1 vers niveau 3 interdit",
                "stdin": "cas:1",
                "expected": "MD_LINTER: archi.md -> STATUT=NON_CONFORME (ANOMALIES=[SAUT_DE_NIVEAU_INTERDIT])"
          },
          {
                "label": "Deux titres H1 dans le même document",
                "stdin": "cas:2",
                "expected": "MD_LINTER: double_h1.md -> STATUT=NON_CONFORME (ANOMALIES=[H1_NON_UNIQUE])"
          },
          {
                "label": "Titre vide et saut de niveau simultanés",
                "stdin": "cas:3",
                "expected": "MD_LINTER: bug.md -> STATUT=NON_CONFORME (ANOMALIES=[TITRE_VIDE, SAUT_DE_NIVEAU_INTERDIT])"
          }
    ],
    solution: "[Exemple]\nMD_LINTER: guide.md -> STATUT=STRUCTURE_MARKDOWN_VALIDE\n\n[Cas 1 — Saut abrupt de niveau 1 vers niveau 3 interdit]\nMD_LINTER: archi.md -> STATUT=NON_CONFORME (ANOMALIES=[SAUT_DE_NIVEAU_INTERDIT])\n\n[Cas 2 — Deux titres H1 dans le même document]\nMD_LINTER: double_h1.md -> STATUT=NON_CONFORME (ANOMALIES=[H1_NON_UNIQUE])\n\n[Cas 3 — Titre vide et saut de niveau simultanés]\nMD_LINTER: bug.md -> STATUT=NON_CONFORME (ANOMALIES=[TITRE_VIDE, SAUT_DE_NIVEAU_INTERDIT])\n"
  },
  {
    id: "dt3-c5-e2",
    chapter: 5,
    level: "n2",
    language: 'analyse',
    title: "Validateur de diagramme textuel Mermaid (Docs-as-Code)",
    goal: "Vérifier la validité de l’en-tête d’un diagramme Mermaid et la connectivité globale de ses nœuds.",
    brief: "<p>Pour chaque cas d’application :<br>\n<code>MERMAID_DIAG nom=&lt;nom&gt; type=&lt;type&gt; aretes=&lt;a1--&gt;b1,a2--&gt;b2,...&gt;</code>.<br><br>\nRègles de validation :<br>\n- Types autorisés (insensible à la casse) : <code>graph TD</code>, <code>graph LR</code>, <code>flowchart TD</code>, <code>flowchart LR</code>.<br>\n  Si le type est différent, <code>VERDICT=TYPE_DIAGRAMME_INVALIDE</code>.<br>\n- Extraire l'ensemble des nœuds distincts participants aux arêtes (format <code>A--&gt;B</code>).<br>\n- Compter le nombre de nœuds uniques $N_{noeuds}$ et le nombre d'arêtes déclarées $N_{aretes}$.<br>\n- Vérification de connectivité : un graphe orienté cohérent possède au minimum $N_{aretes} \\ge N_{noeuds} - 1$.<br>\n  Si $N_{aretes} &lt; N_{noeuds} - 1$ : <code>VERDICT=GRAPHE_POTENTIELLEMENT_DISJOINT (NOEUDS=&lt;N&gt;, ARETES=&lt;M&gt;)</code>.<br>\n  Sinon : <code>VERDICT=DIAGRAMME_VALIDE (NOEUDS=&lt;N&gt;, ARETES=&lt;M&gt;)</code>.<br><br>\nAfficher :<br>\n<code>MERMAID_AUDIT: &lt;nom&gt; -&gt; VERDICT=&lt;VERDICT&gt;</code></p>",
    starter: "# Grille d'analyse (dt3-c5-e2) — Validateur de diagramme textuel Mermaid (Docs-as-Code)\n# Complétez la réponse attendue sous chaque cas ci-dessous :\n\n[Cas 1 — Type de diagramme invalide]\n# Données : MERMAID_DIAG nom=diag_invalide type=diagram_circulaire aretes=A-->B,B-->C\nA_COMPLETER\n\n[Cas 2 — Graphe disjoint avec trop peu d’arêtes pour relier tous les nœuds]\n# Données : MERMAID_DIAG nom=cluster_isole type=graph LR aretes=A-->B,C-->D\nA_COMPLETER\n\n[Cas 3 — Diagramme dense avec cycles et branches multiples valide]\n# Données : MERMAID_DIAG nom=archi_mesh type=flowchart LR aretes=S1-->S2,S2-->S3,S3-->S1,S2-->S4\nA_COMPLETER\n",
    hints: [
          "Extraire les nœuds de part et d’autre de \"-->\".",
          "Vérifier le type parmi les 4 valeurs autorisées."
    ],
    examples: [
          {
                "stdin": "MERMAID_DIAG nom=flux_auth type=flowchart TD aretes=Client-->Passerelle,Passerelle-->AuthService,AuthService-->BDD",
                "expected": "MERMAID_AUDIT: flux_auth -> VERDICT=DIAGRAMME_VALIDE (NOEUDS=4, ARETES=3)",
                "note": "4 nœuds, 3 arêtes : arbre connexe valide."
          }
    ],
    tests: [
          {
                "label": "Type de diagramme invalide",
                "stdin": "cas:1",
                "expected": "MERMAID_AUDIT: diag_invalide -> VERDICT=TYPE_DIAGRAMME_INVALIDE"
          },
          {
                "label": "Graphe disjoint avec trop peu d’arêtes pour relier tous les nœuds",
                "stdin": "cas:2",
                "expected": "MERMAID_AUDIT: cluster_isole -> VERDICT=GRAPHE_POTENTIELLEMENT_DISJOINT (NOEUDS=4, ARETES=2)"
          },
          {
                "label": "Diagramme dense avec cycles et branches multiples valide",
                "stdin": "cas:3",
                "expected": "MERMAID_AUDIT: archi_mesh -> VERDICT=DIAGRAMME_VALIDE (NOEUDS=4, ARETES=4)"
          }
    ],
    solution: "[Exemple]\nMERMAID_AUDIT: flux_auth -> VERDICT=DIAGRAMME_VALIDE (NOEUDS=4, ARETES=3)\n\n[Cas 1 — Type de diagramme invalide]\nMERMAID_AUDIT: diag_invalide -> VERDICT=TYPE_DIAGRAMME_INVALIDE\n\n[Cas 2 — Graphe disjoint avec trop peu d’arêtes pour relier tous les nœuds]\nMERMAID_AUDIT: cluster_isole -> VERDICT=GRAPHE_POTENTIELLEMENT_DISJOINT (NOEUDS=4, ARETES=2)\n\n[Cas 3 — Diagramme dense avec cycles et branches multiples valide]\nMERMAID_AUDIT: archi_mesh -> VERDICT=DIAGRAMME_VALIDE (NOEUDS=4, ARETES=4)\n"
  },
  {
    id: "dt3-c5-e3",
    chapter: 5,
    level: "n3",
    language: 'analyse',
    title: "Générateur d’arborescence de navigation MkDocs / Docusaurus (YAML Nav)",
    goal: "Convertir une liste de fichiers Markdown hiérarchisés en section de navigation conforme pour un générateur statique.",
    brief: "<p>Pour chaque cas d’application :<br>\n<code>NAV_GEN module=&lt;nom_module&gt; pages=&lt;p1.md,p2.md,...&gt;</code>.<br><br>\nTraitement :<br>\n- Trier la liste des fichiers <code>pages</code> par ordre alphabétique.<br>\n- Produire une structure d'arborescence de navigation au format conventionnel suivant :<br>\n<code>NAV_OUTPUT: - &lt;nom_module&gt;: [&lt;pages_triees_separees_par_virgule&gt;] (TOTAL=&lt;N&gt;)</code>.<br><br>\nExemple :<br>\nSi <code>module=Architecture</code> et <code>pages=overview.md,infra.md,reseau.md</code> :<br>\nPages triées : <code>infra.md, overview.md, reseau.md</code><br>\nAffichage :<br>\n<code>NAV_OUTPUT: - Architecture: [infra.md, overview.md, reseau.md] (TOTAL=3)</code></p>",
    starter: "# Grille d'analyse (dt3-c5-e3) — Générateur d’arborescence de navigation MkDocs / Docusaurus (YAML Nav)\n# Complétez la réponse attendue sous chaque cas ci-dessous :\n\n[Cas 1 — Module avec une seule page]\n# Données : NAV_GEN module=Accueil pages=index.md\nA_COMPLETER\n\n[Cas 2 — Module technique avec 4 pages désordonnées]\n# Données : NAV_GEN module=Exploitation pages=runbook.md,backup.md,monitoring.md,alertes.md\nA_COMPLETER\n\n[Cas 3 — Module API avec documentation endpoints]\n# Données : NAV_GEN module=API_Reference pages=users.md,auth.md,errors.md\nA_COMPLETER\n",
    hints: [
          "Trier les fichiers avec sorted().",
          "Afficher le total de pages entre parenthèses."
    ],
    examples: [
          {
                "stdin": "NAV_GEN module=Guide pages=installation.md,demarrage.md,faq.md",
                "expected": "NAV_OUTPUT: - Guide: [demarrage.md, faq.md, installation.md] (TOTAL=3)",
                "note": "Pages triées par ordre alphabétique strict."
          }
    ],
    tests: [
          {
                "label": "Module avec une seule page",
                "stdin": "cas:1",
                "expected": "NAV_OUTPUT: - Accueil: [index.md] (TOTAL=1)"
          },
          {
                "label": "Module technique avec 4 pages désordonnées",
                "stdin": "cas:2",
                "expected": "NAV_OUTPUT: - Exploitation: [alertes.md, backup.md, monitoring.md, runbook.md] (TOTAL=4)"
          },
          {
                "label": "Module API avec documentation endpoints",
                "stdin": "cas:3",
                "expected": "NAV_OUTPUT: - API_Reference: [auth.md, errors.md, users.md] (TOTAL=3)"
          }
    ],
    solution: "[Exemple]\nNAV_OUTPUT: - Guide: [demarrage.md, faq.md, installation.md] (TOTAL=3)\n\n[Cas 1 — Module avec une seule page]\nNAV_OUTPUT: - Accueil: [index.md] (TOTAL=1)\n\n[Cas 2 — Module technique avec 4 pages désordonnées]\nNAV_OUTPUT: - Exploitation: [alertes.md, backup.md, monitoring.md, runbook.md] (TOTAL=4)\n\n[Cas 3 — Module API avec documentation endpoints]\nNAV_OUTPUT: - API_Reference: [auth.md, errors.md, users.md] (TOTAL=3)\n"
  }
];

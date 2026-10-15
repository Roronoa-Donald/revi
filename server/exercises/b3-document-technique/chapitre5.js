/**
 * Exercices du Chapitre 5 : Approche Docs-as-Code & Outils Modernes.
 * Préfixe : dt3-c5-e
 */
'use strict';

module.exports = [
  {
    id: 'dt3-c5-e1',
    chapter: 5,
    title: 'Linter de hiérarchie des titres Markdown (Structure Docs-as-Code)',
    level: 'n1',
    language: 'python',
    goal: 'Vérifier la rigueur structurelle d’un document Markdown : H1 unique, progression de niveau sans saut abrupt et absence de titre vide.',
    brief: '<p>Le script lit sur l\'entrée standard un en-tête suivi de lignes de titres Markdown :<br>\n<code>MD_DOC nom=&lt;nom&gt; titres=&lt;t1|t2|...&gt;</code>.<br>\nChaque titre $t_i$ commence par un ou plusieurs <code>#</code> suivis du texte (ex. <code># Titre</code>, <code>## Section</code>).<br><br>\nRègles de validation :<br>\n1. <strong>Nombre de H1 :</strong> le document doit comporter <strong>exactement un</strong> titre de niveau 1 (<code># </code>). Si 0 ou &gt; 1, ajouter l\'anomalie <code>H1_NON_UNIQUE</code>.<br>\n2. <strong>Titres vides :</strong> aucun titre ne doit être vide après les <code>#</code> (ex. <code>## </code> sans texte). Si détecté, ajouter <code>TITRE_VIDE</code>.<br>\n3. <strong>Sauts de niveau :</strong> le niveau d\'un sous-titre ne doit jamais dépasser le niveau précédent de plus de 1 (ex. passer de <code>#</code> à <code>###</code> est interdit car le niveau 2 est sauté). Si détecté, ajouter <code>SAUT_DE_NIVEAU_INTERDIT</code>.<br><br>\nStatut :<br>\n- Si aucune anomalie : <code>STATUT=STRUCTURE_MARKDOWN_VALIDE</code><br>\n- Sinon : <code>STATUT=NON_CONFORME (ANOMALIES=[&lt;anomalies_uniques_ordonnees&gt;])</code><br>\n(Ordre : <code>H1_NON_UNIQUE</code>, <code>TITRE_VIDE</code>, <code>SAUT_DE_NIVEAU_INTERDIT</code>).<br><br>\nAfficher :<br>\n<code>MD_LINTER: &lt;nom&gt; -&gt; STATUT=&lt;STATUT&gt;</code></p>',
    starter: `import sys

lignes = [l.strip() for l in sys.stdin.read().splitlines() if l.strip()]

# À compléter : analyser la hiérarchie des titres Markdown
`,
    hints: [
      'Compter les symboles # initiaux pour trouver le niveau du titre.',
      'Suivre le niveau précédent pour vérifier qu’il n’y a pas de saut de niveau supérieur à +1.'
    ],
    examples: [
      {
        stdin: 'MD_DOC nom=guide.md titres=# Guide d\'installation|## Prérequis|### Système|## Configuration',
        expected: 'MD_LINTER: guide.md -> STATUT=STRUCTURE_MARKDOWN_VALIDE',
        note: 'Un seul H1, pas de titre vide, progression 1 -> 2 -> 3 -> 2 valide.'
      }
    ],
    tests: [
      {
        label: 'Saut abrupt de niveau 1 vers niveau 3 interdit',
        stdin: 'MD_DOC nom=archi.md titres=# Architecture Système|### Microservices|#### Base de données',
        expected: 'MD_LINTER: archi.md -> STATUT=NON_CONFORME (ANOMALIES=[SAUT_DE_NIVEAU_INTERDIT])'
      },
      {
        label: 'Deux titres H1 dans le même document',
        stdin: 'MD_DOC nom=double_h1.md titres=# Titre Un|## Section A|# Titre Deux|## Section B',
        expected: 'MD_LINTER: double_h1.md -> STATUT=NON_CONFORME (ANOMALIES=[H1_NON_UNIQUE])'
      },
      {
        label: 'Titre vide et saut de niveau simultanés',
        stdin: 'MD_DOC nom=bug.md titres=# Racine|### |## Section',
        expected: 'MD_LINTER: bug.md -> STATUT=NON_CONFORME (ANOMALIES=[TITRE_VIDE, SAUT_DE_NIVEAU_INTERDIT])'
      }
    ],
    solution: `import sys
import re

lignes = [l.strip() for l in sys.stdin.read().splitlines() if l.strip()]

for lig in lignes:
    m = re.search(r'nom=([^\\s]+)\\s+titres=(.*)', lig)
    if not m:
        continue
    nom = m.group(1)
    titres_raw = m.group(2).split('|')
    
    h1_count = 0
    has_empty = False
    has_jump = False
    
    prev_level = 0
    
    for t in titres_raw:
        t_clean = t.strip()
        m_head = re.match(r'^(#+)(.*)$', t_clean)
        if not m_head:
            continue
        level = len(m_head.group(1))
        content = m_head.group(2).strip()
        
        if level == 1:
            h1_count += 1
            
        if not content:
            has_empty = True
            
        if prev_level > 0 and level > prev_level + 1:
            has_jump = True
            
        prev_level = level
        
    anomalies = []
    if h1_count != 1:
        anomalies.append('H1_NON_UNIQUE')
    if has_empty:
        anomalies.append('TITRE_VIDE')
    if has_jump:
        anomalies.append('SAUT_DE_NIVEAU_INTERDIT')
        
    if not anomalies:
        statut = 'STRUCTURE_MARKDOWN_VALIDE'
    else:
        statut = f"NON_CONFORME (ANOMALIES=[{', '.join(anomalies)}])"
        
    print(f"MD_LINTER: {nom} -> STATUT={statut}")
`
  },
  {
    id: 'dt3-c5-e2',
    chapter: 5,
    title: 'Validateur de diagramme textuel Mermaid (Docs-as-Code)',
    level: 'n2',
    language: 'python',
    goal: 'Vérifier la validité de l’en-tête d’un diagramme Mermaid et la connectivité globale de ses nœuds.',
    brief: '<p>Le script lit sur l\'entrée standard :<br>\n<code>MERMAID_DIAG nom=&lt;nom&gt; type=&lt;type&gt; aretes=&lt;a1--&gt;b1,a2--&gt;b2,...&gt;</code>.<br><br>\nRègles de validation :<br>\n- Types autorisés (insensible à la casse) : <code>graph TD</code>, <code>graph LR</code>, <code>flowchart TD</code>, <code>flowchart LR</code>.<br>\n  Si le type est différent, <code>VERDICT=TYPE_DIAGRAMME_INVALIDE</code>.<br>\n- Extraire l\'ensemble des nœuds distincts participants aux arêtes (format <code>A--&gt;B</code>).<br>\n- Compter le nombre de nœuds uniques $N_{noeuds}$ et le nombre d\'arêtes déclarées $N_{aretes}$.<br>\n- Vérification de connectivité : un graphe orienté cohérent possède au minimum $N_{aretes} \\ge N_{noeuds} - 1$.<br>\n  Si $N_{aretes} &lt; N_{noeuds} - 1$ : <code>VERDICT=GRAPHE_POTENTIELLEMENT_DISJOINT (NOEUDS=&lt;N&gt;, ARETES=&lt;M&gt;)</code>.<br>\n  Sinon : <code>VERDICT=DIAGRAMME_VALIDE (NOEUDS=&lt;N&gt;, ARETES=&lt;M&gt;)</code>.<br><br>\nAfficher :<br>\n<code>MERMAID_AUDIT: &lt;nom&gt; -&gt; VERDICT=&lt;VERDICT&gt;</code></p>',
    starter: `import sys

lignes = [l.strip() for l in sys.stdin.read().splitlines() if l.strip()]

# À compléter : auditer le diagramme Mermaid
`,
    hints: [
      'Extraire les nœuds de part et d’autre de "-->".',
      'Vérifier le type parmi les 4 valeurs autorisées.'
    ],
    examples: [
      {
        stdin: 'MERMAID_DIAG nom=flux_auth type=flowchart TD aretes=Client-->Passerelle,Passerelle-->AuthService,AuthService-->BDD',
        expected: 'MERMAID_AUDIT: flux_auth -> VERDICT=DIAGRAMME_VALIDE (NOEUDS=4, ARETES=3)',
        note: '4 nœuds, 3 arêtes : arbre connexe valide.'
      }
    ],
    tests: [
      {
        label: 'Type de diagramme invalide',
        stdin: 'MERMAID_DIAG nom=diag_invalide type=diagram_circulaire aretes=A-->B,B-->C',
        expected: 'MERMAID_AUDIT: diag_invalide -> VERDICT=TYPE_DIAGRAMME_INVALIDE'
      },
      {
        label: 'Graphe disjoint avec trop peu d’arêtes pour relier tous les nœuds',
        stdin: 'MERMAID_DIAG nom=cluster_isole type=graph LR aretes=A-->B,C-->D',
        expected: 'MERMAID_AUDIT: cluster_isole -> VERDICT=GRAPHE_POTENTIELLEMENT_DISJOINT (NOEUDS=4, ARETES=2)'
      },
      {
        label: 'Diagramme dense avec cycles et branches multiples valide',
        stdin: 'MERMAID_DIAG nom=archi_mesh type=flowchart LR aretes=S1-->S2,S2-->S3,S3-->S1,S2-->S4',
        expected: 'MERMAID_AUDIT: archi_mesh -> VERDICT=DIAGRAMME_VALIDE (NOEUDS=4, ARETES=4)'
      }
    ],
    solution: `import sys
import re

lignes = [l.strip() for l in sys.stdin.read().splitlines() if l.strip()]

VALID_TYPES = {'graph td', 'graph lr', 'flowchart td', 'flowchart lr'}

for lig in lignes:
    m = re.search(r'nom=([^\\s]+)\\s+type=(.*?)\\s+aretes=(.*)', lig)
    if not m:
        continue
    nom = m.group(1)
    type_diag = m.group(2).strip().lower()
    aretes_str = m.group(3).strip()
    
    if type_diag not in VALID_TYPES:
        print(f"MERMAID_AUDIT: {nom} -> VERDICT=TYPE_DIAGRAMME_INVALIDE")
        continue
        
    aretes = [a.strip() for a in aretes_str.split(',') if a.strip()]
    noeuds = set()
    
    for a in aretes:
        parts = a.split('-->')
        if len(parts) == 2:
            noeuds.add(parts[0].strip())
            noeuds.add(parts[1].strip())
            
    n_nodes = len(noeuds)
    n_edges = len(aretes)
    
    if n_edges < n_nodes - 1:
        verdict = f"GRAPHE_POTENTIELLEMENT_DISJOINT (NOEUDS={n_nodes}, ARETES={n_edges})"
    else:
        verdict = f"DIAGRAMME_VALIDE (NOEUDS={n_nodes}, ARETES={n_edges})"
        
    print(f"MERMAID_AUDIT: {nom} -> VERDICT={verdict}")
`
  },
  {
    id: 'dt3-c5-e3',
    chapter: 5,
    title: 'Générateur d’arborescence de navigation MkDocs / Docusaurus (YAML Nav)',
    level: 'n3',
    language: 'python',
    goal: 'Convertir une liste de fichiers Markdown hiérarchisés en section de navigation conforme pour un générateur statique.',
    brief: '<p>Le script lit sur l\'entrée standard :<br>\n<code>NAV_GEN module=&lt;nom_module&gt; pages=&lt;p1.md,p2.md,...&gt;</code>.<br><br>\nTraitement :<br>\n- Trier la liste des fichiers <code>pages</code> par ordre alphabétique.<br>\n- Produire une structure d\'arborescence de navigation au format conventionnel suivant :<br>\n<code>NAV_OUTPUT: - &lt;nom_module&gt;: [&lt;pages_triees_separees_par_virgule&gt;] (TOTAL=&lt;N&gt;)</code>.<br><br>\nExemple :<br>\nSi <code>module=Architecture</code> et <code>pages=overview.md,infra.md,reseau.md</code> :<br>\nPages triées : <code>infra.md, overview.md, reseau.md</code><br>\nAffichage :<br>\n<code>NAV_OUTPUT: - Architecture: [infra.md, overview.md, reseau.md] (TOTAL=3)</code></p>',
    starter: `import sys

lignes = [l.strip() for l in sys.stdin.read().splitlines() if l.strip()]

# À compléter : trier et générer la section de navigation
`,
    hints: [
      'Trier les fichiers avec sorted().',
      'Afficher le total de pages entre parenthèses.'
    ],
    examples: [
      {
        stdin: 'NAV_GEN module=Guide pages=installation.md,demarrage.md,faq.md',
        expected: 'NAV_OUTPUT: - Guide: [demarrage.md, faq.md, installation.md] (TOTAL=3)',
        note: 'Pages triées par ordre alphabétique strict.'
      }
    ],
    tests: [
      {
        label: 'Module avec une seule page',
        stdin: 'NAV_GEN module=Accueil pages=index.md',
        expected: 'NAV_OUTPUT: - Accueil: [index.md] (TOTAL=1)'
      },
      {
        label: 'Module technique avec 4 pages désordonnées',
        stdin: 'NAV_GEN module=Exploitation pages=runbook.md,backup.md,monitoring.md,alertes.md',
        expected: 'NAV_OUTPUT: - Exploitation: [alertes.md, backup.md, monitoring.md, runbook.md] (TOTAL=4)'
      },
      {
        label: 'Module API avec documentation endpoints',
        stdin: 'NAV_GEN module=API_Reference pages=users.md,auth.md,errors.md',
        expected: 'NAV_OUTPUT: - API_Reference: [auth.md, errors.md, users.md] (TOTAL=3)'
      }
    ],
    solution: `import sys
import re

lignes = [l.strip() for l in sys.stdin.read().splitlines() if l.strip()]

for lig in lignes:
    m = re.search(r'module=([^\\s]+)\\s+pages=(.*)', lig)
    if not m:
        continue
    mod = m.group(1)
    pages_str = m.group(2)
    pages = [p.strip() for p in pages_str.split(',') if p.strip()]
    pages_sorted = sorted(pages)
    
    tot = len(pages_sorted)
    liste_str = ', '.join(pages_sorted)
    print(f"NAV_OUTPUT: - {mod}: [{liste_str}] (TOTAL={tot})")
`
  }
];

/**
 * Exercices du chapitre 2 — DevOps B3.
 * Intégration Continue (CI), Versioning Sémantique & Quality Gates.
 */
'use strict';

module.exports = [
  {
    id: 'do3-c2-e1',
    chapter: 2,
    title: 'Incrémenteur de versioning sémantique SemVer 2.0.0 selon Conventional Commits',
    level: 'n1',
    language: 'python',
    goal: 'Calculer la prochaine version d’un livrable logiciel à partir de sa version courante et de la nature du commit selon la spécification SemVer 2.0.0.',
    brief: '<p>Le script lit sur l\'entrée standard des déclarations :<br>\n<code>RELEASE version=&lt;M.m.p&gt; type=&lt;BREAKING|FEAT|FIX&gt;</code>.<br>\nRègles de transition SemVer :<br>\n- <code>BREAKING</code> (rupture de compatibilité descendante) : $MAJOR = M + 1$, $MINOR = 0$, $PATCH = 0$<br>\n- <code>FEAT</code> (nouvelle fonctionnalité rétro-compatible) : $MAJOR = M$, $MINOR = m + 1$, $PATCH = 0$<br>\n- <code>FIX</code> (correction de bogue rétro-compatible) : $MAJOR = M$, $MINOR = m$, $PATCH = p + 1$<br><br>\nAfficher :<br>\n<code>SEMVER_BUMP: &lt;M.m.p&gt; + &lt;type&gt; -&gt; &lt;nouvelle_version&gt;</code></p>',
    starter: `import sys

lignes = [l.strip() for l in sys.stdin.read().splitlines() if l.strip()]

# À compléter : analyser la version et calculer le bump SemVer
`,
    hints: [
      'Découper la version avec .split(".") pour manipuler les entiers M, m, p.',
      'Un changement BREAKING réinitialise à zéro MINOR et PATCH.'
    ],
    examples: [
      {
        stdin: 'RELEASE version=1.4.2 type=FIX\nRELEASE version=1.4.2 type=FEAT\nRELEASE version=1.4.2 type=BREAKING',
        expected: 'SEMVER_BUMP: 1.4.2 + FIX -> 1.4.3\nSEMVER_BUMP: 1.4.2 + FEAT -> 1.5.0\nSEMVER_BUMP: 1.4.2 + BREAKING -> 2.0.0',
        note: 'FIX passe à 1.4.3, FEAT à 1.5.0, BREAKING à 2.0.0.'
      }
    ],
    tests: [
      {
        label: 'Passage de version majeure sur socle zéro',
        stdin: 'RELEASE version=0.9.12 type=BREAKING',
        expected: 'SEMVER_BUMP: 0.9.12 + BREAKING -> 1.0.0'
      },
      {
        label: 'Fonctionnalité mineure sur version stabilisée',
        stdin: 'RELEASE version=2.10.5 type=FEAT',
        expected: 'SEMVER_BUMP: 2.10.5 + FEAT -> 2.11.0'
      },
      {
        label: 'Correction de bogue simple',
        stdin: 'RELEASE version=3.0.0 type=FIX',
        expected: 'SEMVER_BUMP: 3.0.0 + FIX -> 3.0.1'
      }
    ],
    solution: `import sys
import re

lignes = [l.strip() for l in sys.stdin.read().splitlines() if l.strip()]

for lig in lignes:
    m = re.search(r'version=(\\d+\\.\\d+\\.\\d+).*?type=([^\\s]+)', lig)
    if not m:
        continue
    ver_str, ctype = m.group(1), m.group(2)
    maj, mino, pat = map(int, ver_str.split('.'))
    
    if ctype == 'BREAKING':
        new_ver = f"{maj + 1}.0.0"
    elif ctype == 'FEAT':
        new_ver = f"{maj}.{mino + 1}.0"
    elif ctype == 'FIX':
        new_ver = f"{maj}.{mino}.{pat + 1}"
    else:
        new_ver = ver_str
        
    print(f"SEMVER_BUMP: {ver_str} + {ctype} -> {new_ver}")
`
  },
  {
    id: 'do3-c2-e2',
    chapter: 2,
    title: 'Auditeur de seuil de qualité de build CI (Quality Gate SonarQube)',
    level: 'n2',
    language: 'python',
    goal: 'Vérifier automatiquement si un code soumis en intégration continue satisfait les exigences de qualité et de sécurité requises pour être fusionné.',
    brief: '<p>Le script lit sur l\'entrée standard les métriques d\'un rapport d\'analyse statique :<br>\n<code>GATE app=&lt;nom&gt; coverage=&lt;val&gt; vuln=&lt;nb&gt; bugs=&lt;nb&gt; duplicated=&lt;val&gt;</code>.<br><br>\nSeuils d\'acceptation du Quality Gate :<br>\n1. <code>coverage &gt;= 80.0</code> (sinon alerte : <code>COUVERTURE_INSUFFISANTE</code>)<br>\n2. <code>vuln == 0</code> (sinon alerte : <code>VULNERABILITES_DETECTEES</code>)<br>\n3. <code>bugs == 0</code> (sinon alerte : <code>BUGS_CRITIQUES_DETECTES</code>)<br>\n4. <code>duplicated &lt;= 3.0</code> (sinon alerte : <code>DUPLICATION_EXCESSIVE</code>)<br><br>\nStatut global :<br>\n- Si aucune alerte : <code>STATUT=PASSED</code> et <code>MOTIFS=[AUCUN]</code><br>\n- Si une ou plusieurs alertes : <code>STATUT=FAILED</code> et <code>MOTIFS=[&lt;liste ordonnée séparée par virgule&gt;]</code><br><br>\nAfficher :<br>\n<code>QUALITY_GATE: &lt;nom&gt; -&gt; STATUT=&lt;PASSED|FAILED&gt; | MOTIFS=[&lt;motifs&gt;]</code></p>',
    starter: `import sys

lignes = [l.strip() for l in sys.stdin.read().splitlines() if l.strip()]

# À compléter : auditer les métriques du Quality Gate
`,
    hints: [
      'Garder l’ordre exact des motifs en cas de défaillances multiples.',
      'Un Quality Gate strict empêche la dette technique de s’infiltrer dans la branche principale.'
    ],
    examples: [
      {
        stdin: 'GATE app=auth_service coverage=85.5 vuln=0 bugs=0 duplicated=1.8\nGATE app=payment_api coverage=72.0 vuln=2 bugs=1 duplicated=4.5',
        expected: 'QUALITY_GATE: auth_service -> STATUT=PASSED | MOTIFS=[AUCUN]\nQUALITY_GATE: payment_api -> STATUT=FAILED | MOTIFS=[COUVERTURE_INSUFFISANTE, VULNERABILITES_DETECTEES, BUGS_CRITIQUES_DETECTES, DUPLICATION_EXCESSIVE]',
        note: 'auth_service remplit tous les critères. payment_api échoue sur l’ensemble des seuils.'
      }
    ],
    tests: [
      {
        label: 'Échec sur la couverture de tests uniquement',
        stdin: 'GATE app=billing_worker coverage=79.9 vuln=0 bugs=0 duplicated=2.0',
        expected: 'QUALITY_GATE: billing_worker -> STATUT=FAILED | MOTIFS=[COUVERTURE_INSUFFISANTE]'
      },
      {
        label: 'Vulnérabilité de sécurité isolée',
        stdin: 'GATE app=user_profile coverage=92.0 vuln=1 bugs=0 duplicated=1.0',
        expected: 'QUALITY_GATE: user_profile -> STATUT=FAILED | MOTIFS=[VULNERABILITES_DETECTEES]'
      },
      {
        label: 'Code sain conforme aux normes d’entreprise',
        stdin: 'GATE app=search_engine coverage=80.0 vuln=0 bugs=0 duplicated=3.0',
        expected: 'QUALITY_GATE: search_engine -> STATUT=PASSED | MOTIFS=[AUCUN]'
      }
    ],
    solution: `import sys
import re

lignes = [l.strip() for l in sys.stdin.read().splitlines() if l.strip()]

for lig in lignes:
    m = re.search(r'app=([^\\s]+).*?coverage=([0-9.]+).*?vuln=(\\d+).*?bugs=(\\d+).*?duplicated=([0-9.]+)', lig)
    if not m:
        continue
    app = m.group(1)
    cov = float(m.group(2))
    vuln = int(m.group(3))
    bugs = int(m.group(4))
    dup = float(m.group(5))
    
    motifs = []
    if cov < 80.0:
        motifs.append('COUVERTURE_INSUFFISANTE')
    if vuln > 0:
        motifs.append('VULNERABILITES_DETECTEES')
    if bugs > 0:
        motifs.append('BUGS_CRITIQUES_DETECTES')
    if dup > 3.0:
        motifs.append('DUPLICATION_EXCESSIVE')
        
    statut = 'PASSED' if not motifs else 'FAILED'
    motifs_str = 'AUCUN' if not motifs else ', '.join(motifs)
    
    print(f"QUALITY_GATE: {app} -> STATUT={statut} | MOTIFS=[{motifs_str}]")
`
  },
  {
    id: 'do3-c2-e3',
    chapter: 2,
    title: 'Moteur d’optimisation temporelle de pipeline CI/CD (Parallélisme & Chemin critique)',
    level: 'n3',
    language: 'python',
    goal: 'Calculer la durée totale d’exécution d’un pipeline d’intégration et livraison continues en tenant compte des étapes exécutées en parallèle.',
    brief: '<p>Le script lit une suite d\'étapes de pipeline :<br>\n<code>STAGE nom=&lt;nom&gt; groupe=&lt;grp|NONE&gt; duree=&lt;sec&gt;</code>.<br><br>\nRègles de synchronisation :<br>\n- Si <code>groupe == NONE</code> : l’étape s’exécute séquentiellement de manière isolée.<br>\n- Si plusieurs étapes consécutives partagent le même identifiant <code>groupe</code> (ex: <code>test_unit</code>, <code>test_e2e</code>, <code>lint</code> avec <code>groupe=tests</code>) : elles s’exécutent simultanément en parallèle. La durée effective de ce bloc parallèle est égale au <strong>maximum</strong> des durées des étapes composant ce groupe : $D_{bloc} = \\max(duree_i)$.<br>\n- Les différents blocs s\'enchaînent séquentiellement dans l\'ordre d\'apparition des groupes.<br><br>\nCalculs :<br>\n- Nombre total d\'étapes analysées.<br>\n- Nombre de groupes parallèles distincts (différents de NONE).<br>\n- Durée totale du pipeline = somme des durées de tous les blocs.<br><br>\nAfficher :<br>\n<code>PIPELINE_TIMING: STAGES=&lt;nb_stages&gt; | GROUPES_PARALLELES=&lt;nb_groupes&gt; | DUREE_TOTALE=&lt;durée_totale&gt;s</code></p>',
    starter: `import sys

lignes = [l.strip() for l in sys.stdin.read().splitlines() if l.strip()]

# À compléter : calculer la durée totale du pipeline avec parallélisme
`,
    hints: [
      'Regrouper les étapes par leur nom de groupe pour extraire le temps maximal de chaque groupe parallèle.',
      'Paralléliser les suites de tests est le moyen le plus efficace de réduire le temps de feedback CI.'
    ],
    examples: [
      {
        stdin: 'STAGE nom=build groupe=NONE duree=45\nSTAGE nom=unit_tests groupe=test_matrix duree=60\nSTAGE nom=integration_tests groupe=test_matrix duree=120\nSTAGE nom=linting groupe=test_matrix duree=30\nSTAGE nom=package groupe=NONE duree=25',
        expected: 'PIPELINE_TIMING: STAGES=5 | GROUPES_PARALLELES=1 | DUREE_TOTALE=190s',
        note: 'build (45s) + max(60, 120, 30 = 120s) + package (25s) = 45 + 120 + 25 = 190s.'
      }
    ],
    tests: [
      {
        label: 'Pipeline 100% séquentiel sans parallélisme',
        stdin: 'STAGE nom=checkout groupe=NONE duree=10\nSTAGE nom=compile groupe=NONE duree=50\nSTAGE nom=deploy groupe=NONE duree=40',
        expected: 'PIPELINE_TIMING: STAGES=3 | GROUPES_PARALLELES=0 | DUREE_TOTALE=100s'
      },
      {
        label: 'Deux vagues de parallélisme distinctes',
        stdin: 'STAGE nom=t_py39 groupe=test_py duree=80\nSTAGE nom=t_py310 groupe=test_py duree=85\nSTAGE nom=scan_snyk groupe=sec_scan duree=40\nSTAGE nom=scan_trivy groupe=sec_scan duree=55',
        expected: 'PIPELINE_TIMING: STAGES=4 | GROUPES_PARALLELES=2 | DUREE_TOTALE=140s'
      },
      {
        label: 'Étape unique isolée',
        stdin: 'STAGE nom=quick_check groupe=NONE duree=15',
        expected: 'PIPELINE_TIMING: STAGES=1 | GROUPES_PARALLELES=0 | DUREE_TOTALE=15s'
      }
    ],
    solution: `import sys
import re

lignes = [l.strip() for l in sys.stdin.read().splitlines() if l.strip()]

blocks = []  # liste de {'type': 'seq', 'duree': d} ou {'type': 'par', 'grp': g, 'duree': max_d}
stages_count = 0
parallel_groups = set()

# Regrouper en préservant l'ordre des blocs
current_grp = None
current_max = 0

for lig in lignes:
    m = re.search(r'nom=([^\\s]+).*?groupe=([^\\s]+).*?duree=(\\d+)', lig)
    if not m:
        continue
    stages_count += 1
    nom, grp, d = m.group(1), m.group(2), int(m.group(3))
    
    if grp == 'NONE':
        if current_grp is not None:
            blocks.append(current_max)
            current_grp = None
            current_max = 0
        blocks.append(d)
    else:
        parallel_groups.add(grp)
        if current_grp == grp:
            current_max = max(current_max, d)
        else:
            if current_grp is not None:
                blocks.append(current_max)
            current_grp = grp
            current_max = d

if current_grp is not None:
    blocks.append(current_max)

tot_duration = sum(blocks)
print(f"PIPELINE_TIMING: STAGES={stages_count} | GROUPES_PARALLELES={len(parallel_groups)} | DUREE_TOTALE={tot_duration}s")
`
  }
];

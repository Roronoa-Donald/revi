'use strict';

module.exports = [
  {
    "id": "do3-c2-e1",
    "chapter": 2,
    "title": "Incrémenteur de versioning sémantique SemVer 2.0.0 selon Conventional Commits",
    "level": "n1",
    "language": "analyse",
    "goal": "Calculer la prochaine version d’un livrable logiciel à partir de sa version courante et de la nature du commit selon la spécification SemVer 2.0.0.",
    "brief": "<p>Analysez les paramètres du problème pour chaque cas.m.p&gt; type=&lt;BREAKING|FEAT|FIX&gt;</code>.<br>\nRègles de transition SemVer :<br>\n- <code>BREAKING</code> (rupture de compatibilité descendante) : $MAJOR = M + 1$, $MINOR = 0$, $PATCH = 0$<br>\n- <code>FEAT</code> (nouvelle fonctionnalité rétro-compatible) : $MAJOR = M$, $MINOR = m + 1$, $PATCH = 0$<br>\n- <code>FIX</code> (correction de bogue rétro-compatible) : $MAJOR = M$, $MINOR = m$, $PATCH = p + 1$<br><br>\nAfficher :<br>\n<code>SEMVER_BUMP: &lt;M.m.p&gt; + &lt;type&gt; -&gt; &lt;nouvelle_version&gt;</code></p>",
    "starter": "# Grille d'analyse (do3-c2-e1) — Incrémenteur de versioning sémantique SemVer 2.0.0 selon Conventional Commits\n# Complétez la résolution demandée sous chaque cas ci-dessous :\n\n[Cas 1 — Passage de version majeure sur socle zéro]\n# Données : RELEASE version=0.9.12 type=BREAKING\nA_COMPLETER\n\n[Cas 2 — Fonctionnalité mineure sur version stabilisée]\n# Données : RELEASE version=2.10.5 type=FEAT\nA_COMPLETER\n\n[Cas 3 — Correction de bogue simple]\n# Données : RELEASE version=3.0.0 type=FIX\nA_COMPLETER\n",
    "hints": [
      "Découper la version avec .split(\".\") pour manipuler les entiers M, m, p.",
      "Un changement BREAKING réinitialise à zéro MINOR et PATCH."
    ],
    "examples": [
      {
        "stdin": "RELEASE version=1.4.2 type=FIX\nRELEASE version=1.4.2 type=FEAT\nRELEASE version=1.4.2 type=BREAKING",
        "expected": "SEMVER_BUMP: 1.4.2 + FIX -> 1.4.3\nSEMVER_BUMP: 1.4.2 + FEAT -> 1.5.0\nSEMVER_BUMP: 1.4.2 + BREAKING -> 2.0.0",
        "note": "FIX passe à 1.4.3, FEAT à 1.5.0, BREAKING à 2.0.0."
      }
    ],
    "tests": [
      {
        "label": "Passage de version majeure sur socle zéro",
        "stdin": "cas:1",
        "expected": "SEMVER_BUMP: 0.9.12 + BREAKING -> 1.0.0"
      },
      {
        "label": "Fonctionnalité mineure sur version stabilisée",
        "stdin": "cas:2",
        "expected": "SEMVER_BUMP: 2.10.5 + FEAT -> 2.11.0"
      },
      {
        "label": "Correction de bogue simple",
        "stdin": "cas:3",
        "expected": "SEMVER_BUMP: 3.0.0 + FIX -> 3.0.1"
      }
    ],
    "solution": "[Exemple]\nSEMVER_BUMP: 1.4.2 + FIX -> 1.4.3\nSEMVER_BUMP: 1.4.2 + FEAT -> 1.5.0\nSEMVER_BUMP: 1.4.2 + BREAKING -> 2.0.0\n\n[Cas 1 — Passage de version majeure sur socle zéro]\nSEMVER_BUMP: 0.9.12 + BREAKING -> 1.0.0\n\n[Cas 2 — Fonctionnalité mineure sur version stabilisée]\nSEMVER_BUMP: 2.10.5 + FEAT -> 2.11.0\n\n[Cas 3 — Correction de bogue simple]\nSEMVER_BUMP: 3.0.0 + FIX -> 3.0.1"
  },
  {
    "id": "do3-c2-e2",
    "chapter": 2,
    "title": "Auditeur de seuil de qualité de build CI (Quality Gate SonarQube)",
    "level": "n2",
    "language": "analyse",
    "goal": "Vérifier automatiquement si un code soumis en intégration continue satisfait les exigences de qualité et de sécurité requises pour être fusionné.",
    "brief": "<p>Analysez les paramètres du problème pour chaque cas.<br><br>\nSeuils d'acceptation du Quality Gate :<br>\n1. <code>coverage &gt;= 80.0</code> (sinon alerte : <code>COUVERTURE_INSUFFISANTE</code>)<br>\n2. <code>vuln == 0</code> (sinon alerte : <code>VULNERABILITES_DETECTEES</code>)<br>\n3. <code>bugs == 0</code> (sinon alerte : <code>BUGS_CRITIQUES_DETECTES</code>)<br>\n4. <code>duplicated &lt;= 3.0</code> (sinon alerte : <code>DUPLICATION_EXCESSIVE</code>)<br><br>\nStatut global :<br>\n- Si aucune alerte : <code>STATUT=PASSED</code> et <code>MOTIFS=[AUCUN]</code><br>\n- Si une ou plusieurs alertes : <code>STATUT=FAILED</code> et <code>MOTIFS=[&lt;liste ordonnée séparée par virgule&gt;]</code><br><br>\nAfficher :<br>\n<code>QUALITY_GATE: &lt;nom&gt; -&gt; STATUT=&lt;PASSED|FAILED&gt; | MOTIFS=[&lt;motifs&gt;]</code></p>",
    "starter": "# Grille d'analyse (do3-c2-e2) — Auditeur de seuil de qualité de build CI (Quality Gate SonarQube)\n# Complétez la résolution demandée sous chaque cas ci-dessous :\n\n[Cas 1 — Échec sur la couverture de tests uniquement]\n# Données : GATE app=billing_worker coverage=79.9 vuln=0 bugs=0 duplicated=2.0\nA_COMPLETER\n\n[Cas 2 — Vulnérabilité de sécurité isolée]\n# Données : GATE app=user_profile coverage=92.0 vuln=1 bugs=0 duplicated=1.0\nA_COMPLETER\n\n[Cas 3 — Code sain conforme aux normes d’entreprise]\n# Données : GATE app=search_engine coverage=80.0 vuln=0 bugs=0 duplicated=3.0\nA_COMPLETER\n",
    "hints": [
      "Garder l’ordre exact des motifs en cas de défaillances multiples.",
      "Un Quality Gate strict empêche la dette technique de s’infiltrer dans la branche principale."
    ],
    "examples": [
      {
        "stdin": "GATE app=auth_service coverage=85.5 vuln=0 bugs=0 duplicated=1.8\nGATE app=payment_api coverage=72.0 vuln=2 bugs=1 duplicated=4.5",
        "expected": "QUALITY_GATE: auth_service -> STATUT=PASSED | MOTIFS=[AUCUN]\nQUALITY_GATE: payment_api -> STATUT=FAILED | MOTIFS=[COUVERTURE_INSUFFISANTE, VULNERABILITES_DETECTEES, BUGS_CRITIQUES_DETECTES, DUPLICATION_EXCESSIVE]",
        "note": "auth_service remplit tous les critères. payment_api échoue sur l’ensemble des seuils."
      }
    ],
    "tests": [
      {
        "label": "Échec sur la couverture de tests uniquement",
        "stdin": "cas:1",
        "expected": "QUALITY_GATE: billing_worker -> STATUT=FAILED | MOTIFS=[COUVERTURE_INSUFFISANTE]"
      },
      {
        "label": "Vulnérabilité de sécurité isolée",
        "stdin": "cas:2",
        "expected": "QUALITY_GATE: user_profile -> STATUT=FAILED | MOTIFS=[VULNERABILITES_DETECTEES]"
      },
      {
        "label": "Code sain conforme aux normes d’entreprise",
        "stdin": "cas:3",
        "expected": "QUALITY_GATE: search_engine -> STATUT=PASSED | MOTIFS=[AUCUN]"
      }
    ],
    "solution": "[Exemple]\nQUALITY_GATE: auth_service -> STATUT=PASSED | MOTIFS=[AUCUN]\nQUALITY_GATE: payment_api -> STATUT=FAILED | MOTIFS=[COUVERTURE_INSUFFISANTE, VULNERABILITES_DETECTEES, BUGS_CRITIQUES_DETECTES, DUPLICATION_EXCESSIVE]\n\n[Cas 1 — Échec sur la couverture de tests uniquement]\nQUALITY_GATE: billing_worker -> STATUT=FAILED | MOTIFS=[COUVERTURE_INSUFFISANTE]\n\n[Cas 2 — Vulnérabilité de sécurité isolée]\nQUALITY_GATE: user_profile -> STATUT=FAILED | MOTIFS=[VULNERABILITES_DETECTEES]\n\n[Cas 3 — Code sain conforme aux normes d’entreprise]\nQUALITY_GATE: search_engine -> STATUT=PASSED | MOTIFS=[AUCUN]"
  },
  {
    "id": "do3-c2-e3",
    "chapter": 2,
    "title": "Moteur d’optimisation temporelle de pipeline CI/CD (Parallélisme & Chemin critique)",
    "level": "n3",
    "language": "analyse",
    "goal": "Calculer la durée totale d’exécution d’un pipeline d’intégration et livraison continues en tenant compte des étapes exécutées en parallèle.",
    "brief": "<p>Analysez les données fournies pour chaque cas.<br><br>\nRègles de synchronisation :<br>\n- Si <code>groupe == NONE</code> : l’étape s’exécute séquentiellement de manière isolée.<br>\n- Si plusieurs étapes consécutives partagent le même identifiant <code>groupe</code> (ex: <code>test_unit</code>, <code>test_e2e</code>, <code>lint</code> avec <code>groupe=tests</code>) : elles s’exécutent simultanément en parallèle. La durée effective de ce bloc parallèle est égale au <strong>maximum</strong> des durées des étapes composant ce groupe : $D_{bloc} = \\max(duree_i)$.<br>\n- Les différents blocs s'enchaînent séquentiellement dans l'ordre d'apparition des groupes.<br><br>\nCalculs :<br>\n- Nombre total d'étapes analysées.<br>\n- Nombre de groupes parallèles distincts (différents de NONE).<br>\n- Durée totale du pipeline = somme des durées de tous les blocs.<br><br>\nAfficher :<br>\n<code>PIPELINE_TIMING: STAGES=&lt;nb_stages&gt; | GROUPES_PARALLELES=&lt;nb_groupes&gt; | DUREE_TOTALE=&lt;durée_totale&gt;s</code></p>",
    "starter": "# Grille d'analyse (do3-c2-e3) — Moteur d’optimisation temporelle de pipeline CI/CD (Parallélisme & Chemin critique)\n# Complétez la résolution demandée sous chaque cas ci-dessous :\n\n[Cas 1 — Pipeline 100% séquentiel sans parallélisme]\n# Données : STAGE nom=checkout groupe=NONE duree=10\n# Données : STAGE nom=compile groupe=NONE duree=50\n# Données : STAGE nom=deploy groupe=NONE duree=40\nA_COMPLETER\n\n[Cas 2 — Deux vagues de parallélisme distinctes]\n# Données : STAGE nom=t_py39 groupe=test_py duree=80\n# Données : STAGE nom=t_py310 groupe=test_py duree=85\n# Données : STAGE nom=scan_snyk groupe=sec_scan duree=40\n# Données : STAGE nom=scan_trivy groupe=sec_scan duree=55\nA_COMPLETER\n\n[Cas 3 — Étape unique isolée]\n# Données : STAGE nom=quick_check groupe=NONE duree=15\nA_COMPLETER\n",
    "hints": [
      "Regrouper les étapes par leur nom de groupe pour extraire le temps maximal de chaque groupe parallèle.",
      "Paralléliser les suites de tests est le moyen le plus efficace de réduire le temps de feedback CI."
    ],
    "examples": [
      {
        "stdin": "STAGE nom=build groupe=NONE duree=45\nSTAGE nom=unit_tests groupe=test_matrix duree=60\nSTAGE nom=integration_tests groupe=test_matrix duree=120\nSTAGE nom=linting groupe=test_matrix duree=30\nSTAGE nom=package groupe=NONE duree=25",
        "expected": "PIPELINE_TIMING: STAGES=5 | GROUPES_PARALLELES=1 | DUREE_TOTALE=190s",
        "note": "build (45s) + max(60, 120, 30 = 120s) + package (25s) = 45 + 120 + 25 = 190s."
      }
    ],
    "tests": [
      {
        "label": "Pipeline 100% séquentiel sans parallélisme",
        "stdin": "cas:1",
        "expected": "PIPELINE_TIMING: STAGES=3 | GROUPES_PARALLELES=0 | DUREE_TOTALE=100s"
      },
      {
        "label": "Deux vagues de parallélisme distinctes",
        "stdin": "cas:2",
        "expected": "PIPELINE_TIMING: STAGES=4 | GROUPES_PARALLELES=2 | DUREE_TOTALE=140s"
      },
      {
        "label": "Étape unique isolée",
        "stdin": "cas:3",
        "expected": "PIPELINE_TIMING: STAGES=1 | GROUPES_PARALLELES=0 | DUREE_TOTALE=15s"
      }
    ],
    "solution": "[Exemple]\nPIPELINE_TIMING: STAGES=5 | GROUPES_PARALLELES=1 | DUREE_TOTALE=190s\n\n[Cas 1 — Pipeline 100% séquentiel sans parallélisme]\nPIPELINE_TIMING: STAGES=3 | GROUPES_PARALLELES=0 | DUREE_TOTALE=100s\n\n[Cas 2 — Deux vagues de parallélisme distinctes]\nPIPELINE_TIMING: STAGES=4 | GROUPES_PARALLELES=2 | DUREE_TOTALE=140s\n\n[Cas 3 — Étape unique isolée]\nPIPELINE_TIMING: STAGES=1 | GROUPES_PARALLELES=0 | DUREE_TOTALE=15s"
  }
];

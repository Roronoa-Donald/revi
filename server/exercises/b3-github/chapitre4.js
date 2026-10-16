'use strict';

module.exports = [
  {
    "id": "gh3-c4-e1",
    "chapter": 4,
    "title": "Validateur de conformité de workflow de branches (Git Flow vs GitHub Flow)",
    "level": "n1",
    "language": "analyse",
    "goal": "Auditer la création d’une branche et ses opérations selon les règles de gouvernance de Git Flow ou GitHub Flow.",
    "brief": "<p>En entreprise, la gestion des branches doit suivre des règles strictes pour garantir la stabilité de la production :<br><br>\nRègles du modèle <strong>GIT_FLOW</strong> :<br>\n- Les branches <code>feature/*</code> doivent obligatoirement être créées à partir de <code>develop</code>.<br>\n- Les branches <code>release/*</code> doivent partir de <code>develop</code>.<br>\n- Les branches <code>hotfix/*</code> doivent partir de <code>main</code>.<br>\n- Tout push direct (<code>direct_push=OUI</code>) sur <code>main</code> ou <code>develop</code> est formellement interdit (<code>VIOLATION_DIRECT_PUSH_PROTECTED_BRANCH</code>).<br><br>\nRègles du modèle <strong>GITHUB_FLOW</strong> :<br>\n- Toutes les branches de fonctionnalités/correctifs partent de <code>main</code>.<br>\n- Tout push direct sur <code>main</code> est interdit.<br><br>\nAnalysez les paramètres du problème pour chaque cas.<br><br>\nPour chaque ligne, afficher :<br>\n<code>AUDIT branch={branch} status={CONFORME | motif_violation}</code></p>",
    "starter": "# Grille d'analyse (gh3-c4-e1) — Validateur de conformité de workflow de branches (Git Flow vs GitHub Flow)\n# Complétez la résolution demandée sous chaque cas ci-dessous :\n\n[Cas 1 — Push direct proscrit sur branche protégée]\n# Données : BRANCH_EVENT wf=GIT_FLOW branch=main base=main direct_push=OUI\n# Données : BRANCH_EVENT wf=GITHUB_FLOW branch=main base=main direct_push=OUI\nA_COMPLETER\n\n[Cas 2 — Conformité hotfix et release dans Git Flow]\n# Données : BRANCH_EVENT wf=GIT_FLOW branch=hotfix/patch-1 base=main direct_push=NON\n# Données : BRANCH_EVENT wf=GIT_FLOW branch=hotfix/patch-2 base=develop direct_push=NON\n# Données : BRANCH_EVENT wf=GIT_FLOW branch=release/v1.0 base=develop direct_push=NON\nA_COMPLETER\n\n[Cas 3 — GitHub Flow avec branche dérivée de main]\n# Données : BRANCH_EVENT wf=GITHUB_FLOW branch=feat-login base=main direct_push=NON\n# Données : BRANCH_EVENT wf=GITHUB_FLOW branch=feat-login base=develop direct_push=NON\nA_COMPLETER\n",
    "hints": [
      "Vérifier d’abord l’interdiction de push direct sur les branches protégées.",
      "Tester la conformité de la branche de départ (base) selon le préfixe du nom de branche."
    ],
    "examples": [
      {
        "stdin": "BRANCH_EVENT wf=GIT_FLOW branch=feature/auth base=develop direct_push=NON\nBRANCH_EVENT wf=GIT_FLOW branch=feature/auth base=main direct_push=NON",
        "expected": "AUDIT branch=feature/auth status=CONFORME\nAUDIT branch=feature/auth status=BRANCHE_BASE_INVALIDE_ATTENDU_DEVELOP",
        "note": "Dans Git Flow, une feature doit partir de develop, pas de main."
      }
    ],
    "tests": [
      {
        "label": "Push direct proscrit sur branche protégée",
        "stdin": "cas:1",
        "expected": "AUDIT branch=main status=VIOLATION_DIRECT_PUSH_PROTECTED_BRANCH\nAUDIT branch=main status=VIOLATION_DIRECT_PUSH_PROTECTED_BRANCH"
      },
      {
        "label": "Conformité hotfix et release dans Git Flow",
        "stdin": "cas:2",
        "expected": "AUDIT branch=hotfix/patch-1 status=CONFORME\nAUDIT branch=hotfix/patch-2 status=BRANCHE_BASE_INVALIDE_ATTENDU_MAIN\nAUDIT branch=release/v1.0 status=CONFORME"
      },
      {
        "label": "GitHub Flow avec branche dérivée de main",
        "stdin": "cas:3",
        "expected": "AUDIT branch=feat-login status=CONFORME\nAUDIT branch=feat-login status=BRANCHE_BASE_INVALIDE_ATTENDU_MAIN"
      }
    ],
    "solution": "[Exemple]\nAUDIT branch=feature/auth status=CONFORME\nAUDIT branch=feature/auth status=BRANCHE_BASE_INVALIDE_ATTENDU_DEVELOP\n\n[Cas 1 — Push direct proscrit sur branche protégée]\nAUDIT branch=main status=VIOLATION_DIRECT_PUSH_PROTECTED_BRANCH\nAUDIT branch=main status=VIOLATION_DIRECT_PUSH_PROTECTED_BRANCH\n\n[Cas 2 — Conformité hotfix et release dans Git Flow]\nAUDIT branch=hotfix/patch-1 status=CONFORME\nAUDIT branch=hotfix/patch-2 status=BRANCHE_BASE_INVALIDE_ATTENDU_MAIN\nAUDIT branch=release/v1.0 status=CONFORME\n\n[Cas 3 — GitHub Flow avec branche dérivée de main]\nAUDIT branch=feat-login status=CONFORME\nAUDIT branch=feat-login status=BRANCHE_BASE_INVALIDE_ATTENDU_MAIN"
  },
  {
    "id": "gh3-c4-e2",
    "chapter": 4,
    "title": "Contrôleur de règles de protection de branches (Branch Protection Rules)",
    "level": "n2",
    "language": "analyse",
    "goal": "Appliquer les critères de fusion de Pull Request (approbations requises, statuts CI, signature GPG).",
    "brief": "<p>Sur GitHub Enterprise, les branches de production sont verrouillées par des <strong>Branch Protection Rules</strong>.<br><br>\nCritères nécessaires pour autoriser la fusion (Merge) dans <code>main</code> :<br>\n1. <code>approvals &gt;= min_approvals</code> (nombre d'approbations de relecteurs humains requises, ex: 2).<br>\n2. <code>ci_status == 'PASS'</code> (les pipelines d'intégration continue doivent impérativement être au vert).<br>\n3. Si <code>require_signed == 'OUI'</code> : le commit doit obligatoirement être signé cryptographiquement (<code>gpg_signed == 'OUI'</code>).<br>\n4. Si <code>linear_history == 'OUI'</code> : le type de merge demandé ne doit pas être <code>MERGE_COMMIT</code> (doit être <code>SQUASH</code> ou <code>REBASE</code>).<br><br>\nAnalysez les données fournies pour chaque cas.<br><br>\nPour chaque PR, afficher :<br>\n<code>PR_MERGE pr={id} status={AUTHORIZED|BLOCKED} reason={OK|motif_du_premier_blocage}</code></p>",
    "starter": "# Grille d'analyse (gh3-c4-e2) — Contrôleur de règles de protection de branches (Branch Protection Rules)\n# Complétez la résolution demandée sous chaque cas ci-dessous :\n\n[Cas 1 — Rejet pour approbations insuffisantes ou CI en échec]\n# Données : CONFIG min_approvals=2 require_signed=NON linear_history=NON\n# Données : MERGE_REQ pr=10 approvals=1 ci_status=PASS gpg_signed=NON merge_type=MERGE_COMMIT\n# Données : MERGE_REQ pr=11 approvals=2 ci_status=FAIL gpg_signed=NON merge_type=MERGE_COMMIT\nA_COMPLETER\n\n[Cas 2 — Rejet pour signature GPG manquante]\n# Données : CONFIG min_approvals=1 require_signed=OUI linear_history=NON\n# Données : MERGE_REQ pr=20 approvals=1 ci_status=PASS gpg_signed=NON merge_type=MERGE_COMMIT\nA_COMPLETER\n\n[Cas 3 — Rejet pour merge commit sur branche à historique linéaire strict]\n# Données : CONFIG min_approvals=1 require_signed=NON linear_history=OUI\n# Données : MERGE_REQ pr=30 approvals=1 ci_status=PASS gpg_signed=NON merge_type=MERGE_COMMIT\n# Données : MERGE_REQ pr=31 approvals=1 ci_status=PASS gpg_signed=NON merge_type=REBASE\nA_COMPLETER\n",
    "hints": [
      "Vérifier les critères dans l’ordre de la spécification : approvals, ci_status, signature, historique linéaire.",
      "Dès qu’un critère échoue, le statut est BLOCKED."
    ],
    "examples": [
      {
        "stdin": "CONFIG min_approvals=2 require_signed=OUI linear_history=OUI\nMERGE_REQ pr=42 approvals=2 ci_status=PASS gpg_signed=OUI merge_type=SQUASH",
        "expected": "PR_MERGE pr=42 status=AUTHORIZED reason=OK",
        "note": "Tous les critères de protection sont satisfaits."
      }
    ],
    "tests": [
      {
        "label": "Rejet pour approbations insuffisantes ou CI en échec",
        "stdin": "cas:1",
        "expected": "PR_MERGE pr=10 status=BLOCKED reason=APPROVALS_INSUFFISANTS\nPR_MERGE pr=11 status=BLOCKED reason=CI_CHECKS_FAILED"
      },
      {
        "label": "Rejet pour signature GPG manquante",
        "stdin": "cas:2",
        "expected": "PR_MERGE pr=20 status=BLOCKED reason=SIGNATURE_GPG_REQUISE"
      },
      {
        "label": "Rejet pour merge commit sur branche à historique linéaire strict",
        "stdin": "cas:3",
        "expected": "PR_MERGE pr=30 status=BLOCKED reason=HISTORIQUE_LINEAIRE_EXIGE\nPR_MERGE pr=31 status=AUTHORIZED reason=OK"
      }
    ],
    "solution": "[Exemple]\nPR_MERGE pr=42 status=AUTHORIZED reason=OK\n\n[Cas 1 — Rejet pour approbations insuffisantes ou CI en échec]\nPR_MERGE pr=10 status=BLOCKED reason=APPROVALS_INSUFFISANTS\nPR_MERGE pr=11 status=BLOCKED reason=CI_CHECKS_FAILED\n\n[Cas 2 — Rejet pour signature GPG manquante]\nPR_MERGE pr=20 status=BLOCKED reason=SIGNATURE_GPG_REQUISE\n\n[Cas 3 — Rejet pour merge commit sur branche à historique linéaire strict]\nPR_MERGE pr=30 status=BLOCKED reason=HISTORIQUE_LINEAIRE_EXIGE\nPR_MERGE pr=31 status=AUTHORIZED reason=OK"
  },
  {
    "id": "gh3-c4-e3",
    "chapter": 4,
    "title": "Analyseur sémantique de commits selon Conventional Commits",
    "level": "n3",
    "language": "analyse",
    "goal": "Vérifier la conformité des messages de commit selon la spécification formelle Conventional Commits 1.0.0.",
    "brief": "<p>La norme <strong>Conventional Commits</strong> structure les messages pour automatiser le versionnage sémantique (SemVer) et la génération de CHANGELOG.<br><br>\nFormat standard :<br>\n<code>&lt;type&gt;[scope optionnel][!]: &lt;description&gt;</code><br><br>\nRègles de validation :<br>\n1. <code>type</code> doit appartenir à la liste autorisée : <code>feat, fix, docs, refactor, test, chore, perf, ci</code>.<br>\n2. Le <code>scope</code> (si présent) doit être entouré de parenthèses : ex: <code>feat(api): ...</code>.<br>\n3. Le caractère <code>!</code> avant le deux-points ou la présence de <code>BREAKING CHANGE</code> dans le message indique une rupture de compatibilité (<code>BREAKING=OUI</code>).<br>\n4. Le séparateur obligatoire est deux-points suivi d'un espace <code>\": \"</code>.<br>\n5. La <code>description</code> ne doit pas être vide.<br><br>\nAnalysez les paramètres du problème pour chaque cas.<br><br>\nPour chaque message, afficher :<br>\n- Si conforme : <code>CONVENTIONAL_AUDIT id={id} valid=OUI type={type} scope={scope|NONE} breaking={OUI|NON}</code><br>\n- Si non conforme : <code>CONVENTIONAL_AUDIT id={id} valid=NON error={TYPE_INCONNU|FORMAT_INVALIDE|DESCRIPTION_VIDE}</code></p>",
    "starter": "# Grille d'analyse (gh3-c4-e3) — Analyseur sémantique de commits selon Conventional Commits\n# Complétez la résolution demandée sous chaque cas ci-dessous :\n\n[Cas 1 — Message sans scope et type inconnu]\n# Données : COMMIT_MSG id=10 msg=docs: mise a jour du README\n# Données : COMMIT_MSG id=11 msg=update: modifications diverses\nA_COMPLETER\n\n[Cas 2 — Format invalide sans espace après deux-points ou sans séparateur]\n# Données : COMMIT_MSG id=20 msg=feat:nospace\n# Données : COMMIT_MSG id=21 msg=juste un message sans type\nA_COMPLETER\n\n[Cas 3 — Breaking change via mention textuelle BREAKING CHANGE]\n# Données : COMMIT_MSG id=30 msg=refactor(core): refonte complete du routeur BREAKING CHANGE\nA_COMPLETER\n",
    "hints": [
      "Utiliser une regex : r\"^([a-z]+)(?:\\(([a-zA-Z0-9_-]+)\\))?(!)?:s+(.+)$\"",
      "Vérifier si le type extrait est dans les types autorisés."
    ],
    "examples": [
      {
        "stdin": "COMMIT_MSG id=1 msg=feat(auth): ajout authentification JWT\nCOMMIT_MSG id=2 msg=fix!: correction faille critique",
        "expected": "CONVENTIONAL_AUDIT id=1 valid=OUI type=feat scope=auth breaking=NON\nCONVENTIONAL_AUDIT id=2 valid=OUI type=fix scope=NONE breaking=OUI",
        "note": "Validation du format avec et sans scope, détection de breaking change."
      }
    ],
    "tests": [
      {
        "label": "Message sans scope et type inconnu",
        "stdin": "cas:1",
        "expected": "CONVENTIONAL_AUDIT id=10 valid=OUI type=docs scope=NONE breaking=NON\nCONVENTIONAL_AUDIT id=11 valid=NON error=TYPE_INCONNU"
      },
      {
        "label": "Format invalide sans espace après deux-points ou sans séparateur",
        "stdin": "cas:2",
        "expected": "CONVENTIONAL_AUDIT id=20 valid=NON error=FORMAT_INVALIDE\nCONVENTIONAL_AUDIT id=21 valid=NON error=FORMAT_INVALIDE"
      },
      {
        "label": "Breaking change via mention textuelle BREAKING CHANGE",
        "stdin": "cas:3",
        "expected": "CONVENTIONAL_AUDIT id=30 valid=OUI type=refactor scope=core breaking=OUI"
      }
    ],
    "solution": "[Exemple]\nCONVENTIONAL_AUDIT id=1 valid=OUI type=feat scope=auth breaking=NON\nCONVENTIONAL_AUDIT id=2 valid=OUI type=fix scope=NONE breaking=OUI\n\n[Cas 1 — Message sans scope et type inconnu]\nCONVENTIONAL_AUDIT id=10 valid=OUI type=docs scope=NONE breaking=NON\nCONVENTIONAL_AUDIT id=11 valid=NON error=TYPE_INCONNU\n\n[Cas 2 — Format invalide sans espace après deux-points ou sans séparateur]\nCONVENTIONAL_AUDIT id=20 valid=NON error=FORMAT_INVALIDE\nCONVENTIONAL_AUDIT id=21 valid=NON error=FORMAT_INVALIDE\n\n[Cas 3 — Breaking change via mention textuelle BREAKING CHANGE]\nCONVENTIONAL_AUDIT id=30 valid=OUI type=refactor scope=core breaking=OUI"
  }
];

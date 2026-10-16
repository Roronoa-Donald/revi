'use strict';

module.exports = [
  {
    "id": "lx3-c2-e1",
    "chapter": 2,
    "title": "Validateur d’unité de service Systemd ([Unit], [Service], [Install])",
    "level": "n1",
    "language": "analyse",
    "goal": "Vérifier la conformité syntaxique et la validité des directives d’un fichier de service Systemd.",
    "brief": "<p>Sous Linux, <strong>Systemd</strong> (PID 1) orchestre le démarrage des démons via des fichiers déclaratifs d'unités (<code>.service</code>) placés dans <code>/etc/systemd/system/</code> ou <code>/lib/systemd/system/</code>.<br><br>\nRègles de conformité strictes d'une unité de service :<br>\n1. <code>ExecStart</code> est obligatoire et doit impérativement spécifier un <strong>chemin absolu</strong> (commençant par <code>/</code>). Un binaire relatif (ex: <code>python app.py</code>) est rejeté avec l'erreur <code>EXECSTART_RELATIF</code>.<br>\n2. <code>Description</code> doit être non vide (sinon <code>DESCRIPTION_MANQUANTE</code>).<br>\n3. <code>WantedBy</code> dans la section <code>[Install]</code> doit référencer une cible valide (ex: <code>multi-user.target</code>). S'il est vide ou absent, erreur <code>WANTEDBY_MANQUANT</code>.<br><br>\nAnalysez les paramètres du problème pour chaque cas.<br><br>\nPour chaque service, afficher :<br>\n<code>SERVICE_VALIDATION name={name} valid={OUI|NON} error={OK|motif_erreur}</code></p>",
    "starter": "# Grille d'analyse (lx3-c2-e1) — Validateur d’unité de service Systemd ([Unit], [Service], [Install])\n# Complétez la résolution demandée sous chaque cas ci-dessous :\n\n[Cas 1 — Rejet d’un exécutable avec chemin relatif]\n# Données : SERVICE_DEF name=worker.service desc=\"Taches asynchrones\" exec_start=node wanted_by=multi-user.target\nA_COMPLETER\n\n[Cas 2 — Rejet pour description manquante ou WantedBy manquant]\n# Données : SERVICE_DEF name=audit.service desc=NONE exec_start=/opt/bin/agent wanted_by=multi-user.target\n# Données : SERVICE_DEF name=cron_job.service desc=\"Tache planifiee\" exec_start=/bin/bash wanted_by=NONE\nA_COMPLETER\n\n[Cas 3 — Service complexe valide avec arguments]\n# Données : SERVICE_DEF name=nginx.service desc=\"Serveur Web Nginx\" exec_start=/usr/sbin/nginx wanted_by=multi-user.target\nA_COMPLETER\n",
    "hints": [
      "Vérifier les critères dans l’ordre : Description non vide, ExecStart commençant par \"/\", WantedBy non vide.",
      "Dès qu’une règle est violée, valid=NON avec l’erreur correspondante."
    ],
    "examples": [
      {
        "stdin": "SERVICE_DEF name=api.service desc=\"Backend API\" exec_start=/usr/bin/python3 wanted_by=multi-user.target",
        "expected": "SERVICE_VALIDATION name=api.service valid=OUI error=OK",
        "note": "Toutes les directives sont valides et le chemin d’exécutable est absolu."
      }
    ],
    "tests": [
      {
        "label": "Rejet d’un exécutable avec chemin relatif",
        "stdin": "cas:1",
        "expected": "SERVICE_VALIDATION name=worker.service valid=NON error=EXECSTART_RELATIF"
      },
      {
        "label": "Rejet pour description manquante ou WantedBy manquant",
        "stdin": "cas:2",
        "expected": "SERVICE_VALIDATION name=audit.service valid=NON error=DESCRIPTION_MANQUANTE\nSERVICE_VALIDATION name=cron_job.service valid=NON error=WANTEDBY_MANQUANT"
      },
      {
        "label": "Service complexe valide avec arguments",
        "stdin": "cas:3",
        "expected": "SERVICE_VALIDATION name=nginx.service valid=OUI error=OK"
      }
    ],
    "solution": "[Exemple]\nSERVICE_VALIDATION name=api.service valid=OUI error=OK\n\n[Cas 1 — Rejet d’un exécutable avec chemin relatif]\nSERVICE_VALIDATION name=worker.service valid=NON error=EXECSTART_RELATIF\n\n[Cas 2 — Rejet pour description manquante ou WantedBy manquant]\nSERVICE_VALIDATION name=audit.service valid=NON error=DESCRIPTION_MANQUANTE\nSERVICE_VALIDATION name=cron_job.service valid=NON error=WANTEDBY_MANQUANT\n\n[Cas 3 — Service complexe valide avec arguments]\nSERVICE_VALIDATION name=nginx.service valid=OUI error=OK"
  },
  {
    "id": "lx3-c2-e2",
    "chapter": 2,
    "title": "Résolveur de dépendances et détection de cycles Systemd",
    "level": "n2",
    "language": "analyse",
    "goal": "Analyser le graphe de dépendances d’unités et détecter les dépendances circulaires bloquantes (deadlocks).",
    "brief": "<p>Systemd gère les dépendances entre unités via les directives <code>Requires=</code> (dépendance forte) et <code>Wants=</code> (dépendance faible). Si deux unités se requièrent mutuellement de manière circulaire, Systemd rencontre une dépendance cyclique et doit casser le lien ou échouer le démarrage.<br><br>\nAnalysez les paramètres du problème pour chaque cas.<br><br>\nRègles :<br>\n1. Auto-dépendance (A requiert A) : <code>cycle=OUI reason=AUTO_DEPENDANCE</code>.<br>\n2. Cycle direct à deux unités (A requiert B et B requiert A) : <code>cycle=OUI reason=CYCLE_DIRECT</code>.<br>\n3. Dépendance saine ou sans dépendance (NONE) : <code>cycle=NON reason=OK</code>.<br><br>\nPour chaque unité, afficher :<br>\n<code>DEP_CHECK unit={name} cycle={OUI|NON} reason={OK|motif}</code></p>",
    "starter": "# Grille d'analyse (lx3-c2-e2) — Résolveur de dépendances et détection de cycles Systemd\n# Complétez la résolution demandée sous chaque cas ci-dessous :\n\n[Cas 1 — Détection d’auto-dépendance]\n# Données : UNIT_DEP name=loop.service requires=loop.service\nA_COMPLETER\n\n[Cas 2 — Détection de cycle direct croisé entre deux services]\n# Données : UNIT_DEP name=alpha.service requires=beta.service\n# Données : UNIT_DEP name=beta.service requires=alpha.service\nA_COMPLETER\n\n[Cas 3 — Chaîne saine à trois unités]\n# Données : UNIT_DEP name=redis.service requires=network.target\n# Données : UNIT_DEP name=network.target requires=NONE\n# Données : UNIT_DEP name=app.service requires=redis.service\nA_COMPLETER\n",
    "hints": [
      "Stocker l’association {nom: requires} dans un dictionnaire.",
      "Vérifier si requires == nom (auto-dépendance).",
      "Vérifier si target a pour requires le nom courant (cycle à deux)."
    ],
    "examples": [
      {
        "stdin": "UNIT_DEP name=db.service requires=NONE\nUNIT_DEP name=web.service requires=db.service",
        "expected": "DEP_CHECK unit=db.service cycle=NON reason=OK\nDEP_CHECK unit=web.service cycle=NON reason=OK",
        "note": "Arborescence linéaire saine sans boucle."
      }
    ],
    "tests": [
      {
        "label": "Détection d’auto-dépendance",
        "stdin": "cas:1",
        "expected": "DEP_CHECK unit=loop.service cycle=OUI reason=AUTO_DEPENDANCE"
      },
      {
        "label": "Détection de cycle direct croisé entre deux services",
        "stdin": "cas:2",
        "expected": "DEP_CHECK unit=alpha.service cycle=OUI reason=CYCLE_DIRECT\nDEP_CHECK unit=beta.service cycle=OUI reason=CYCLE_DIRECT"
      },
      {
        "label": "Chaîne saine à trois unités",
        "stdin": "cas:3",
        "expected": "DEP_CHECK unit=redis.service cycle=NON reason=OK\nDEP_CHECK unit=network.target cycle=NON reason=OK\nDEP_CHECK unit=app.service cycle=NON reason=OK"
      }
    ],
    "solution": "[Exemple]\nDEP_CHECK unit=db.service cycle=NON reason=OK\nDEP_CHECK unit=web.service cycle=NON reason=OK\n\n[Cas 1 — Détection d’auto-dépendance]\nDEP_CHECK unit=loop.service cycle=OUI reason=AUTO_DEPENDANCE\n\n[Cas 2 — Détection de cycle direct croisé entre deux services]\nDEP_CHECK unit=alpha.service cycle=OUI reason=CYCLE_DIRECT\nDEP_CHECK unit=beta.service cycle=OUI reason=CYCLE_DIRECT\n\n[Cas 3 — Chaîne saine à trois unités]\nDEP_CHECK unit=redis.service cycle=NON reason=OK\nDEP_CHECK unit=network.target cycle=NON reason=OK\nDEP_CHECK unit=app.service cycle=NON reason=OK"
  },
  {
    "id": "lx3-c2-e3",
    "chapter": 2,
    "title": "Parseur et filtreur d’événements Systemd Journald",
    "level": "n3",
    "language": "analyse",
    "goal": "Classer les journaux binaires Systemd Journald selon les priorités Syslog RFC 5424 et isoler les incidents critiques.",
    "brief": "<p>Le démon <code>systemd-journald</code> centralise les logs du noyau, des services et de l'espace utilisateur dans un format binaire structuré indexé.<br><br>\nAnalysez les paramètres du problème pour chaque cas..7&gt; unit=&lt;service&gt; msg=&lt;message&gt;</code>.<br><br>\nÉchelle de sévérité Syslog (RFC 5424) :<br>\n- 0 : <code>EMERGENCY</code><br>\n- 1 : <code>ALERT</code><br>\n- 2 : <code>CRITICAL</code><br>\n- 3 : <code>ERROR</code><br>\n- 4 : <code>WARNING</code><br>\n- 5 : <code>NOTICE</code><br>\n- 6 : <code>INFO</code><br>\n- 7 : <code>DEBUG</code><br><br>\nCritère d'alerte : si <code>priority &le; 3</code>, l'événement est considéré comme critique (<code>SEVERITY_ALERT=OUI</code>), sinon (<code>SEVERITY_ALERT=NON</code>).<br><br>\nPour chaque log, afficher :<br>\n<code>JOURNAL_AUDIT id={id} unit={unit} level={LABEL} alert={SEVERITY_ALERT}</code></p>",
    "starter": "# Grille d'analyse (lx3-c2-e3) — Parseur et filtreur d’événements Systemd Journald\n# Complétez la résolution demandée sous chaque cas ci-dessous :\n\n[Cas 1 — Logs d’urgence et d’erreur critique (priority <= 3)]\n# Données : JOURNAL id=10 priority=0 unit=kernel msg=\"Kernel panic - not syncing\"\n# Données : JOURNAL id=11 priority=3 unit=postgresql.service msg=\"Fatal connection error\"\nA_COMPLETER\n\n[Cas 2 — Avertissement et notification standard]\n# Données : JOURNAL id=20 priority=4 unit=diskmon.service msg=\"Disk usage above 80%\"\n# Données : JOURNAL id=21 priority=5 unit=systemd msg=\"Started Apache Web Server\"\nA_COMPLETER\n\n[Cas 3 — Log de débogage (DEBUG)]\n# Données : JOURNAL id=30 priority=7 unit=app.service msg=\"Trace variable x=42\"\nA_COMPLETER\n",
    "hints": [
      "Utiliser une table de correspondance associant les entiers 0..7 à leur libellé.",
      "Comparer la priorité numérique pour déterminer le statut d’alerte."
    ],
    "examples": [
      {
        "stdin": "JOURNAL id=1 priority=6 unit=sshd.service msg=\"Server listening on port 22\"",
        "expected": "JOURNAL_AUDIT id=1 unit=sshd.service level=INFO alert=NON",
        "note": "Priorité 6 (INFO), événement informatif standard."
      }
    ],
    "tests": [
      {
        "label": "Logs d’urgence et d’erreur critique (priority <= 3)",
        "stdin": "cas:1",
        "expected": "JOURNAL_AUDIT id=10 unit=kernel level=EMERGENCY alert=OUI\nJOURNAL_AUDIT id=11 unit=postgresql.service level=ERROR alert=OUI"
      },
      {
        "label": "Avertissement et notification standard",
        "stdin": "cas:2",
        "expected": "JOURNAL_AUDIT id=20 unit=diskmon.service level=WARNING alert=NON\nJOURNAL_AUDIT id=21 unit=systemd level=NOTICE alert=NON"
      },
      {
        "label": "Log de débogage (DEBUG)",
        "stdin": "cas:3",
        "expected": "JOURNAL_AUDIT id=30 unit=app.service level=DEBUG alert=NON"
      }
    ],
    "solution": "[Exemple]\nJOURNAL_AUDIT id=1 unit=sshd.service level=INFO alert=NON\n\n[Cas 1 — Logs d’urgence et d’erreur critique (priority <= 3)]\nJOURNAL_AUDIT id=10 unit=kernel level=EMERGENCY alert=OUI\nJOURNAL_AUDIT id=11 unit=postgresql.service level=ERROR alert=OUI\n\n[Cas 2 — Avertissement et notification standard]\nJOURNAL_AUDIT id=20 unit=diskmon.service level=WARNING alert=NON\nJOURNAL_AUDIT id=21 unit=systemd level=NOTICE alert=NON\n\n[Cas 3 — Log de débogage (DEBUG)]\nJOURNAL_AUDIT id=30 unit=app.service level=DEBUG alert=NON"
  }
];

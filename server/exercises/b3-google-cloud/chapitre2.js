'use strict';

module.exports = [
  {
    "id": "gcp3-c2-e1",
    "chapter": 2,
    "title": "Analyse de liaisons IAM et audit des rôles de base",
    "level": "n1",
    "language": "analyse",
    "goal": "Examiner des liaisons locales sans confondre leur présence avec un accès IAM effectif.",
    "brief": "<p>Cette grille maintient uniquement un registre fictif de liaisons locales entre membres et rôles. Elle ne calcule pas l’accès effectif à une ressource : celui-ci dépend de la permission demandée, des autres liaisons et de leur héritage, des conditions ainsi que des règles IAM <em>deny</em> applicables et de leurs exceptions.<br>\nLa présence d’une liaison ne prouve donc pas l’accès ; son absence du registre local ne prouve pas un refus. Les rôles de base <code>roles/viewer</code>, <code>roles/editor</code> et <code>roles/owner</code> sont très larges et déconseillés en production ; ils ne sont pas déclarés obsolètes par cette grille.<br><br>\n<code>BIND role=&lt;role&gt; member=&lt;type:id&gt;</code> enregistre une liaison et retourne <code>BIND_OK: role=&lt;role&gt; member=&lt;member&gt; type=&lt;BASIC_CAUTION_PROD|PREDEFINED&gt;</code>. Les autres rôles cités dans les cas sont prédéfinis.<br>\n<code>CHECK_ROLE member=&lt;member&gt; role=&lt;role&gt;</code> cherche seulement la paire exacte dans le registre et retourne <code>LIAISON: PRESENT member=&lt;member&gt; role=&lt;role&gt;</code> ou <code>LIAISON: ABSENTE member=&lt;member&gt; role=&lt;role&gt;</code>.<br>\n<code>AUDIT_PRIMITIVE_ROLES</code> retourne <code>AUDIT: OK (zero basic roles in use)</code> ou <code>AUDIT: WARNING basic_count=&lt;N&gt; members=&lt;m1,m2,...&gt;</code>, membres triés lexicalement.<br>\nUn contexte indiquant qu’un deny peut s’appliquer ne modifie pas le constat de liaison : l’évaluation du deny sort du périmètre. Voir les <a href=\"https://docs.cloud.google.com/iam/docs/deny-overview\">politiques IAM deny</a>.</p>",
    "starter": "# Grille d'analyse (gcp3-c2-e1) — Analyse de liaisons IAM et audit des rôles de base\n# Complétez la résolution demandée sous chaque cas ci-dessous :\n\n[Cas 1 — Liaison recherchée absente du registre local]\n# Données : BIND role=roles/compute.viewer member=user:bob@corp.com\n# Données : CHECK_ROLE member=user:bob@corp.com role=roles/compute.admin\nA_COMPLETER\n\n[Cas 2 — Audit de deux rôles de base]\n# Données : BIND role=roles/editor member=user:dev@corp.com\n# Données : BIND role=roles/owner member=serviceAccount:ci@proj.iam.gserviceaccount.com\n# Données : AUDIT_PRIMITIVE_ROLES\nA_COMPLETER\n\n[Cas 3 — Liaison présente malgré un deny éventuellement applicable]\n# Données : BIND role=roles/storage.objectViewer member=user:lea@corp.com\n# Données : CONTEXTE deny_applicable=POSSIBLE\n# Données : CHECK_ROLE member=user:lea@corp.com role=roles/storage.objectViewer\nA_COMPLETER\n",
    "hints": [
      "Cherchez uniquement la paire membre-rôle dans le registre local ; ne déduisez aucune décision d’accès.",
      "Pour l’audit, comptez les liaisons aux trois rôles de base et triez les membres concernés.",
      "Inspectez chaque binding IAM (member, role) et signalez tout rôle primitif large (roles/owner, editor, viewer) tout en rappelant que les refus/conditions org peuvent primer."
    ],
    "examples": [
      {
        "stdin": "BIND role=roles/storage.objectViewer member=user:alice@cloud.corp\nCHECK_ROLE member=user:alice@cloud.corp role=roles/storage.objectViewer\nAUDIT_PRIMITIVE_ROLES",
        "expected": "BIND_OK: role=roles/storage.objectViewer member=user:alice@cloud.corp type=PREDEFINED\nLIAISON: PRESENT member=user:alice@cloud.corp role=roles/storage.objectViewer\nAUDIT: OK (zero basic roles in use)",
        "note": "La liaison locale est présente ; les conditions et refus éventuels ne sont pas évalués."
      }
    ],
    "tests": [
      {
        "label": "Liaison recherchée absente du registre local",
        "stdin": "cas:1",
        "expected": "BIND_OK: role=roles/compute.viewer member=user:bob@corp.com type=PREDEFINED\nLIAISON: ABSENTE member=user:bob@corp.com role=roles/compute.admin"
      },
      {
        "label": "Audit de deux rôles de base",
        "stdin": "cas:2",
        "expected": "BIND_OK: role=roles/editor member=user:dev@corp.com type=BASIC_CAUTION_PROD\nBIND_OK: role=roles/owner member=serviceAccount:ci@proj.iam.gserviceaccount.com type=BASIC_CAUTION_PROD\nAUDIT: WARNING basic_count=2 members=serviceAccount:ci@proj.iam.gserviceaccount.com,user:dev@corp.com"
      },
      {
        "label": "Liaison présente malgré un deny éventuellement applicable",
        "stdin": "cas:3",
        "expected": "BIND_OK: role=roles/storage.objectViewer member=user:lea@corp.com type=PREDEFINED\nLIAISON: PRESENT member=user:lea@corp.com role=roles/storage.objectViewer"
      }
    ],
    "solution": "[Exemple]\nBIND_OK: role=roles/storage.objectViewer member=user:alice@cloud.corp type=PREDEFINED\nLIAISON: PRESENT member=user:alice@cloud.corp role=roles/storage.objectViewer\nAUDIT: OK (zero basic roles in use)\n\n[Cas 1 — Liaison recherchée absente du registre local]\nBIND_OK: role=roles/compute.viewer member=user:bob@corp.com type=PREDEFINED\nLIAISON: ABSENTE member=user:bob@corp.com role=roles/compute.admin\n\n[Cas 2 — Audit de deux rôles de base]\nBIND_OK: role=roles/editor member=user:dev@corp.com type=BASIC_CAUTION_PROD\nBIND_OK: role=roles/owner member=serviceAccount:ci@proj.iam.gserviceaccount.com type=BASIC_CAUTION_PROD\nAUDIT: WARNING basic_count=2 members=serviceAccount:ci@proj.iam.gserviceaccount.com,user:dev@corp.com\n\n[Cas 3 — Liaison présente malgré un deny éventuellement applicable]\nBIND_OK: role=roles/storage.objectViewer member=user:lea@corp.com type=PREDEFINED\nLIAISON: PRESENT member=user:lea@corp.com role=roles/storage.objectViewer",
    "takeaway": "À retenir : Examiner des liaisons locales sans confondre leur présence avec un accès IAM effectif.\nRepère : La liaison locale est présente ; les conditions et refus éventuels ne sont pas évalués."
  },
  {
    "id": "gcp3-c2-e2",
    "chapter": 2,
    "level": "n2",
    "language": "analyse",
    "title": "Moindre privilège : les rôles de CargoLys",
    "exampleTitle": "Exemple résolu — les rôles d'AquaRivo",
    "goal": "Sélectionner le rôle prédéfini adapté à chaque besoin métier et appliquer le principe du moindre privilège.",
    "brief": "<p><strong>Énoncé.</strong> CargoLys, transporteur havrais, refond les accès IAM de son projet <code>prj-cargolys-prod</code>. L'administrateur recense quatre besoins précis et le catalogue des rôles prédéfinis disponibles :</p><table><tr><th>Rôle prédéfini</th><th>Permissions</th></tr><tr><th>roles/storage.objectViewer</th><td>Lire les objets des buckets</td></tr><tr><th>roles/storage.objectCreator</th><td>Créer des objets dans les buckets</td></tr><tr><th>roles/compute.instanceAdmin.v1</th><td>Administrer les instances Compute Engine</td></tr><tr><th>roles/logging.viewer</th><td>Consulter les journaux</td></tr></table><ul><li><strong>Sarah, auditrice :</strong> uniquement consulter les fichiers de factures stockés dans un bucket ;</li><li><strong>Karim, intégrateur :</strong> déposer des fichiers dans le bucket des manifestes, sans jamais pouvoir en supprimer ;</li><li><strong>Nadia, exploitante :</strong> lire les journaux d'exécution des traitements, sans toucher aux ressources ;</li><li><strong>Omar, ancien administrateur :</strong> bénéficie encore du rôle primitif roles/editor alors qu'il ne gère que les machines virtuelles.</li></ul><p>Pour les questions 1 à 4, répondez avec le nom complet du rôle (au format roles/...).</p><ol><li>Quel rôle accorder à Sarah ?</li><li>Quel rôle accorder à Karim ?</li><li>Quel rôle accorder à Nadia ?</li><li>Quel rôle prédéfini suffit à Omar pour remplacer roles/editor ?</li><li>Quel rôle primitif correspond à un accès en lecture seule sur l'ensemble du projet ?</li></ol>",
    "starter": "# Exercice — Moindre privilège : les rôles de CargoLys\n# Lisez l'énoncé complet ci-dessus, puis répondez à chaque question dans son bloc.\n# Questions 1 à 4 : le nom complet du rôle (roles/...). Question 5 : un seul mot anglais.\n\n[Question 1 — Rôle de Sarah, l'auditrice]\nA_COMPLETER\n\n[Question 2 — Rôle de Karim, l'intégrateur]\nA_COMPLETER\n\n[Question 3 — Rôle de Nadia, l'exploitante]\nA_COMPLETER\n\n[Question 4 — Rôle prédéfini suffisant pour Omar]\nA_COMPLETER\n\n[Question 5 — Rôle primitif en lecture seule]\nA_COMPLETER\n",
    "hints": [
      "Partez du besoin exprimé et cherchez le rôle qui le couvre exactement, sans permission superflue : c'est le principe du moindre privilège.",
      "Les noms des rôles prédéfinis décrivent le service puis l'action : objectViewer lit, objectCreator crée, instanceAdmin administre les machines virtuelles.",
      "1. Sarah ne lit que des objets. 2. Karim ne crée que des objets. 3. Nadia ne consulte que des journaux. 4. Omar ne gère que des machines. 5. Parmi viewer, editor et owner, lequel ne fait que lire ?"
    ],
    "examples": [
      {
        "stdin": "AquaRivo, gestionnaire de piscines connectées, recense ses besoins :\n- Rose doit consulter l'état des machines virtuelles → roles/compute.viewer ;\n- Théo doit gérer tous les objets du bucket de données (lecture, écriture, suppression) → roles/storage.objectAdmin ;\n- Inès doit consulter les tableaux de bord de monitoring → roles/monitoring.viewer ;\n- Marc, ancien admin, ne gère que les VM → on remplace roles/editor par roles/compute.instanceAdmin.v1 ;\n- le rôle primitif en lecture seule est viewer.\n\n1) Rose : roles/compute.viewer.\n2) Théo : roles/storage.objectAdmin.\n3) Inès : roles/monitoring.viewer.\n4) Marc : roles/compute.instanceAdmin.v1.\n5) Rôle primitif en lecture seule : viewer.",
        "expected": "Rose : compute.viewer — Théo : objectAdmin — Inès : monitoring.viewer — Marc : instanceAdmin.v1 — primitif lecture seule : viewer",
        "note": "Remplacer un rôle primitif par le rôle prédéfini correspondant au besoin réel réduit la surface d'attaque sans gêner le travail quotidien."
      }
    ],
    "tests": [
      {
        "label": "Question 1 — Rôle de Sarah, l'auditrice",
        "stdin": "q:1",
        "expected": "roles/storage.objectViewer||storage.objectViewer||objectViewer"
      },
      {
        "label": "Question 2 — Rôle de Karim, l'intégrateur",
        "stdin": "q:2",
        "expected": "roles/storage.objectCreator||storage.objectCreator||objectCreator"
      },
      {
        "label": "Question 3 — Rôle de Nadia, l'exploitante",
        "stdin": "q:3",
        "expected": "roles/logging.viewer||logging.viewer"
      },
      {
        "label": "Question 4 — Rôle prédéfini suffisant pour Omar",
        "stdin": "q:4",
        "expected": "roles/compute.instanceAdmin.v1||compute.instanceAdmin.v1||instanceAdmin.v1"
      },
      {
        "label": "Question 5 — Rôle primitif en lecture seule",
        "stdin": "q:5",
        "expected": "viewer"
      }
    ],
    "solution": "[Question 1 — Rôle de Sarah, l'auditrice]\nroles/storage.objectViewer\n\n[Question 2 — Rôle de Karim, l'intégrateur]\nroles/storage.objectCreator\n\n[Question 3 — Rôle de Nadia, l'exploitante]\nroles/logging.viewer\n\n[Question 4 — Rôle prédéfini suffisant pour Omar]\nroles/compute.instanceAdmin.v1\n\n[Question 5 — Rôle primitif en lecture seule]\nviewer",
    "takeaway": "1) Sarah : roles/storage.objectViewer — la lecture des objets suffit à son audit, sans droit d'écriture ni de suppression.\n2) Karim : roles/storage.objectCreator — il peut déposer des fichiers, mais pas en supprimer.\n3) Nadia : roles/logging.viewer — la consultation des journaux ne nécessite aucun droit sur les ressources.\n4) Omar : roles/compute.instanceAdmin.v1 — ce rôle prédéfini couvre la gestion des machines virtuelles, alors que roles/editor lui donnait aussi le contrôle des buckets, des bases et des stratégies.\n5) viewer est le rôle primitif de lecture seule : il porte sur tout le projet.\nContrôle : chaque rôle retenu couvre exactement le besoin déclaré — aucun des quatre collaborateurs ne reçoit de permission inutilisée."
  },
  {
    "id": "gcp3-c2-e3",
    "chapter": 2,
    "level": "n3",
    "language": "analyse",
    "title": "Comptes de service et clés de Vitalis Santé",
    "exampleTitle": "Exemple résolu — l'audit des clés d'OndeLibre",
    "goal": "Auditer l'âge des clés d'un compte de service, statuer sur une politique de rotation et recommander une posture sans clé.",
    "brief": "<p><strong>Énoncé.</strong> Vitalis Santé, plateforme de télémédecine nantaise, utilise le compte de service <code>sa-export@prj-vitalis-prod.iam.gserviceaccount.com</code> pour exporter chaque nuit des synthèses chiffrées depuis une VM Compute Engine. L'audit de sécurité du <strong>1er mars 2026</strong> relève trois clés JSON actives :</p><table><tr><th>Clé</th><th>Créée le</th><th>Dernière utilisation</th></tr><tr><th>key-a</th><td>1er avril 2024</td><td>jamais détectée</td></tr><tr><th>key-b</th><td>1er mai 2025</td><td>cette semaine</td></tr><tr><th>key-c</th><td>1er septembre 2024</td><td>janvier 2026</td></tr></table><p>La politique de sécurité impose une <strong>rotation des clés à 12 mois maximum</strong>.</p><ol><li>Quel âge, en mois, la clé key-a a-t-elle au jour de l'audit ?</li><li>Quel âge, en mois, la clé key-b a-t-elle ?</li><li>Quel âge, en mois, la clé key-c a-t-elle ?</li><li>Combien de clés violent la politique de rotation ?</li><li>Quelle clé n'a jamais servi et doit être supprimée immédiatement ?</li><li>Comment s'appelle un compte de service directement associé à la VM, utilisable sans aucune clé JSON exportée ?</li></ol>",
    "starter": "# Exercice — Comptes de service et clés de Vitalis Santé\n# Lisez l'énoncé complet ci-dessus, puis répondez à chaque question dans son bloc.\n# Questions 1 à 4 : le nombre seul. Questions 5 et 6 : réponses courtes.\n\n[Question 1 — Âge en mois de la clé key-a]\nA_COMPLETER\n\n[Question 2 — Âge en mois de la clé key-b]\nA_COMPLETER\n\n[Question 3 — Âge en mois de la clé key-c]\nA_COMPLETER\n\n[Question 4 — Nombre de clés hors politique]\nA_COMPLETER\n\n[Question 5 — Clé à supprimer immédiatement]\nA_COMPLETER\n\n[Question 6 — Compte de service utilisable sans clé JSON sur une VM]\nA_COMPLETER\n",
    "hints": [
      "Comptez les mois entiers entre la date de création de chaque clé et le 1er mars 2026, d'anniversaire en anniversaire.",
      "Comparez chaque âge au plafond de 12 mois : une clé au-delà viole la politique, même si elle sert encore.",
      "1. key-a est née en avril 2024 : elle a plus de deux ans. 2. key-b est née en mai 2025. 3. key-c a dépassé un an et demi. 4. Comptez les clés de plus de 12 mois. 5. La clé jamais utilisée ne dessert aucun service. 6. Une VM peut porter son identité sans fichier de clé : le compte est dit... attaché."
    ],
    "examples": [
      {
        "stdin": "OndeLibre, webradio, audite le 1er janvier 2026 le compte de service\nsa-diffusion@prj-onde.iam.gserviceaccount.com.\nPolitique de rotation : 24 mois maximum. Trois clés :\nkey-1 créée le 1er octobre 2023 (jamais utilisée) → 27 mois ;\nkey-2 créée le 1er novembre 2023 (utilisée hier) → 26 mois ;\nkey-3 créée le 1er juin 2024 (utilisée hier) → 19 mois.\n\n1) key-1 : 27 mois.\n2) key-2 : 26 mois.\n3) key-3 : 19 mois.\n4) 2 clés violent la politique (27 et 26 mois dépassent 24).\n5) key-1, jamais utilisée, doit être supprimée immédiatement.\n6) La VM de diffusion utilise un compte de service attaché, sans clé JSON.",
        "expected": "key-1 : 27 mois — key-2 : 26 mois — key-3 : 19 mois — 2 clés hors politique — key-1 à supprimer — compte de service attaché",
        "note": "Une clé jamais utilisée est une porte d'entrée dorée : sa suppression ne gêne aucun service et réduit immédiatement la surface d'attaque."
      }
    ],
    "tests": [
      {
        "label": "Question 1 — Âge en mois de la clé key-a",
        "stdin": "q:1",
        "expected": "23"
      },
      {
        "label": "Question 2 — Âge en mois de la clé key-b",
        "stdin": "q:2",
        "expected": "10"
      },
      {
        "label": "Question 3 — Âge en mois de la clé key-c",
        "stdin": "q:3",
        "expected": "18"
      },
      {
        "label": "Question 4 — Nombre de clés hors politique",
        "stdin": "q:4",
        "expected": "2"
      },
      {
        "label": "Question 5 — Clé à supprimer immédiatement",
        "stdin": "q:5",
        "expected": "key-a||la clé key-a"
      },
      {
        "label": "Question 6 — Compte de service utilisable sans clé JSON sur une VM",
        "stdin": "q:6",
        "expected": "un compte de service attaché||le compte de service attaché||compte de service attaché||attaché"
      }
    ],
    "solution": "[Question 1 — Âge en mois de la clé key-a]\n23\n\n[Question 2 — Âge en mois de la clé key-b]\n10\n\n[Question 3 — Âge en mois de la clé key-c]\n18\n\n[Question 4 — Nombre de clés hors politique]\n2\n\n[Question 5 — Clé à supprimer immédiatement]\nkey-a\n\n[Question 6 — Compte de service utilisable sans clé JSON sur une VM]\nun compte de service attaché",
    "takeaway": "1) key-a : d'avril 2024 à mars 2026, 23 mois entiers (12 mois jusqu'en avril 2025, puis 11 mois).\n2) key-b : de mai 2025 à mars 2026, 10 mois.\n3) key-c : de septembre 2024 à mars 2026, 18 mois.\n4) key-a (23 mois) et key-c (18 mois) dépassent le plafond de 12 mois : 2 clés violent la politique.\n5) key-a n'a jamais été utilisée : elle doit être supprimée immédiatement, sans préavis ni migration.\n6) Un compte de service attaché : l'identité est fournie par Google à la ressource elle-même, aucune clé JSON n'est générée ni exportée.\nContrôle : seul key-b (10 mois) est conforme ; à terme, les trois clés devraient disparaître au profit du compte de service attaché à la VM."
  }
];

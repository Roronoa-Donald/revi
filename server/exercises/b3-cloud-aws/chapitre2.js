'use strict';

module.exports = [
  {
    "id": "aws3-c2-e1",
    "chapter": 2,
    "level": "n1",
    "language": "analyse",
    "title": "La politique IAM du service facturation de Meridiem",
    "exampleTitle": "Exemple résolu — la politique du bucket de sauvegardes de la mairie de Valmont",
    "goal": "Lire une politique IAM en JSON (Effect, Action, Resource) et déduire ce que les utilisateurs peuvent faire.",
    "brief": "<p><strong>Énoncé.</strong> Meridiem, éditeur de logiciels de gestion, stocke ses relevés de facturation dans le bucket S3 « meridiem-factures ». Le service comptabilité doit pouvoir déposer de nouveaux relevés et relire les anciens, mais jamais en supprimer. L'administrateur cloud rédige la politique suivante et l'attache au groupe IAM « Compta-Factures », dont les membres sont Djamel et Inès :</p><pre>{\n  \"Version\": \"2012-10-17\",\n  \"Statement\": [\n    {\n      \"Sid\": \"DepotEtLectureDesReleves\",\n      \"Effect\": \"Allow\",\n      \"Action\": [\"s3:GetObject\", \"s3:PutObject\"],\n      \"Resource\": \"arn:aws:s3:::meridiem-factures/*\"\n    },\n    {\n      \"Sid\": \"InterdictionDeSuppression\",\n      \"Effect\": \"Deny\",\n      \"Action\": \"s3:DeleteObject\",\n      \"Resource\": \"arn:aws:s3:::meridiem-factures/*\"\n    }\n  ]\n}</pre><p>Rappel du cours : une politique JSON est une liste de déclarations (Statement) ; chacune porte un effet (Allow ou Deny), des actions et des ressources ; un Deny explicite l'emporte toujours sur tout Allow.</p><p>La question 4 attend « oui » ou « non ».</p><ol><li>Combien de déclarations (Statement) compte cette politique ?</li><li>Quel est l'effet (Effect) de la première déclaration ?</li><li>Quelles sont les deux actions accordées par la première déclaration ? Répondez au format s3:GetObject, s3:PutObject.</li><li>Un membre du groupe peut-il supprimer un objet du bucket ?</li><li>L'ARN de la ressource se termine par /* : la première déclaration porte-t-elle sur le bucket lui-même ou sur les objets qu'il contient ?</li><li>Combien d'utilisateurs reçoivent ces permissions par l'intermédiaire du groupe ?</li></ol>",
    "starter": "# Exercice — La politique IAM du service facturation de Meridiem\n# Lisez l'énoncé complet ci-dessus, puis répondez à chaque question dans son bloc.\n# Question 4 : oui ou non. Question 3 : le format s3:GetObject, s3:PutObject.\n\n[Question 1 — Nombre de déclarations (Statement)]\nA_COMPLETER\n\n[Question 2 — Effet de la première déclaration]\nA_COMPLETER\n\n[Question 3 — Actions accordées par la première déclaration]\nA_COMPLETER\n\n[Question 4 — Un membre peut-il supprimer un objet ?]\nA_COMPLETER\n\n[Question 5 — Portée de l'ARN terminé par /*]\nA_COMPLETER\n\n[Question 6 — Nombre d'utilisateurs couverts par le groupe]\nA_COMPLETER\n",
    "hints": [
      "Lisez la politique déclaration par déclaration : un Statement débute à chaque accolade ouvrante après \"Statement\": [.",
      "Comparez le champ Resource avec le bucket : un ARN en /* désigne les objets, un ARN sans /* désignerait le bucket lui-même.",
      "1. Comptez les accolades après \"Statement\": [. 2. Lisez le champ Effect. 3. Listez le tableau Action. 4. Cherchez s3:DeleteObject du côté Allow, puis du côté Deny. 5. Observez la fin de l'ARN. 6. Relisez les membres du groupe."
    ],
    "examples": [
      {
        "stdin": "La mairie de Valmont attache à son rôle de sauvegarde une politique d'une seule déclaration :\n{ \"Effect\": \"Allow\", \"Action\": \"s3:PutObject\", \"Resource\": \"arn:aws:s3:::valmont-sauvegardes/*\" }\n\n1) Une seule déclaration (Statement).\n2) Effet : Allow (autorisation).\n3) Action accordée : s3:PutObject uniquement (dépôt, pas de lecture, pas de suppression).\n4) L'ARN se termine par /* : la politique porte sur les objets du bucket.\n5) Rattachée à un rôle : elle s'applique à toute identité qui endosse ce rôle.",
        "expected": "1 déclaration — Allow — action s3:PutObject sur les objets — aucun droit de suppression",
        "note": "Un ARN terminé par /* cible les objets du bucket ; sans le /*, l'ARN viserait le bucket lui-même (utile pour s3:ListBucket par exemple)."
      }
    ],
    "tests": [
      {
        "label": "Question 1 — Nombre de déclarations (Statement)",
        "stdin": "q:1",
        "expected": "2||deux"
      },
      {
        "label": "Question 2 — Effet de la première déclaration",
        "stdin": "q:2",
        "expected": "allow||autoriser||autorisation"
      },
      {
        "label": "Question 3 — Actions accordées par la première déclaration",
        "stdin": "q:3",
        "expected": "s3:getobject, s3:putobject||s3:getobject et s3:putobject||s3:putobject, s3:getobject"
      },
      {
        "label": "Question 4 — Un membre peut-il supprimer un objet ?",
        "stdin": "q:4",
        "expected": "non"
      },
      {
        "label": "Question 5 — Portée de l'ARN terminé par /*",
        "stdin": "q:5",
        "expected": "les objets||sur les objets||les objets du bucket||les objets qu'il contient"
      },
      {
        "label": "Question 6 — Nombre d'utilisateurs couverts par le groupe",
        "stdin": "q:6",
        "expected": "2||deux"
      }
    ],
    "solution": "[Question 1 — Nombre de déclarations (Statement)]\n2\n\n[Question 2 — Effet de la première déclaration]\nallow\n\n[Question 3 — Actions accordées par la première déclaration]\ns3:getobject, s3:putobject\n\n[Question 4 — Un membre peut-il supprimer un objet ?]\nnon\n\n[Question 5 — Portée de l'ARN terminé par /*]\nles objets\n\n[Question 6 — Nombre d'utilisateurs couverts par le groupe]\n2",
    "takeaway": "1) La politique compte 2 déclarations : « DepotEtLectureDesReleves » et « InterdictionDeSuppression ».\n2) L'effet de la première déclaration est Allow : elle accorde des permissions.\n3) Elle accorde s3:GetObject (lire un objet) et s3:PutObject (déposer un objet).\n4) Non : s3:DeleteObject n'est pas dans le Allow, et la seconde déclaration le refuse explicitement (Deny).\n5) L'ARN « arn:aws:s3:::meridiem-factures/* » se termine par /* : la déclaration porte sur les objets du bucket, pas sur le bucket lui-même.\n6) Le groupe Compta-Factures compte 2 membres, Djamel et Inès : tous deux reçoivent ces permissions.\nContrôle : Allow (Get, Put) + Deny (Delete) sur les objets : la comptabilité dépose et relit, jamais ne supprime."
  },
  {
    "id": "aws3-c2-e2",
    "chapter": 2,
    "level": "n2",
    "language": "analyse",
    "title": "L'audit des clés d'accès de Norvia",
    "exampleTitle": "Exemple résolu — l'audit des clés du studio Pixaglio",
    "goal": "Auditer des clés d'accès IAM (âge, dernière utilisation) et connaître les bonnes pratiques de sécurité des identifiants.",
    "brief": "<p><strong>Énoncé.</strong> Norvia, industriel du matériel médical, mène l'audit de ses clés d'accès IAM le <strong>15/06/2025</strong>. Sa règle interne : une clé d'accès inutilisée depuis plus de <strong>90 jours</strong> doit être désactivée, et toute identité appartenant à un collaborateur parti de l'entreprise doit être supprimée. L'état des lieux des quatre utilisateurs dotés d'une clé est le suivant :</p><table><tr><th>Utilisateur</th><th>Rôle</th><th>Clé créée le</th><th>Dernière utilisation</th></tr><tr><th>Amélie</th><td>Développeuse</td><td>12/01/2025</td><td>14/06/2025 (veille de l'audit)</td></tr><tr><th>Karim</th><td>Data analyste</td><td>05/09/2024</td><td>10/12/2024</td></tr><tr><th>Léo</th><td>Stagiaire, parti en avril 2024</td><td>20/02/2024</td><td>jamais</td></tr><tr><th>Sofia</th><td>Responsable exploitation</td><td>15/03/2025</td><td>15/06/2025 (matin de l'audit)</td></tr></table><p>Les questions 1, 2, 3 et 6 attendent un nombre ; les questions 4 et 5 attendent une réponse courte.</p><ol><li>Combien de clés d'accès sont inutilisées depuis plus de 90 jours au 15/06/2025 ?</li><li>Combien de jours se sont écoulés depuis la dernière utilisation de la clé de Karim ?</li><li>Quelle identité doit être purement et simplement supprimée ?</li><li>Pour un accès programmatique sans clé permanente, quel type d'identité IAM fournit des identifiants temporaires ?</li><li>Quel dispositif de sécurité doit être activé en priorité sur l'utilisateur root du compte ?</li><li>La clé de Léo, créée le 20/02/2024, n'a jamais servi : depuis combien de jours existait-elle au 15/06/2025 ?</li></ol>",
    "starter": "# Exercice — L'audit des clés d'accès de Norvia\n# Lisez l'énoncé complet ci-dessus, puis répondez à chaque question dans son bloc.\n# Questions 1, 2 et 6 : le nombre seul. Question 3 : le prénom.\n\n[Question 1 — Clés inutilisées depuis plus de 90 jours]\nA_COMPLETER\n\n[Question 2 — Jours écoulés depuis la dernière utilisation de la clé de Karim]\nA_COMPLETER\n\n[Question 3 — Identité à supprimer]\nA_COMPLETER\n\n[Question 4 — Identité IAM à identifiants temporaires]\nA_COMPLETER\n\n[Question 5 — Dispositif à activer sur l'utilisateur root]\nA_COMPLETER\n\n[Question 6 — Nombre de jours d'existence de la clé de Léo]\nA_COMPLETER\n",
    "hints": [
      "Comptez les jours écoulés entre la date d'audit et la dernière utilisation : décembre 2024 à juin 2025, sans oublier les mois pleins.",
      "Une clé jamais utilisée depuis plus de 90 jours est hors délai ; une identité de collaborateur parti relève de la suppression, pas de la simple désactivation.",
      "1. Comparez chaque « dernière utilisation » au seuil de 90 jours. 2. De 10/12/2024 au 15/06/2025 : 21 + 31 + 28 + 31 + 30 + 31 + 15. 3. Cherchez le collaborateur parti. 4. Pensez aux identités endossables sans mot de passe. 5. Le root ne doit jamais servir sans second facteur. 6. L'année 2024 est bissextile."
    ],
    "examples": [
      {
        "stdin": "Le studio Pixaglio audite ses clés d'accès au 10/03/2025 (règle : désactiver au-delà de 90 jours sans usage).\nYanis : dernière utilisation le 05/01/2025, soit 26 + 28 + 10 = 64 jours écoulés, conforme.\nNora : clé du 15/02/2025 utilisée la veille, conforme.\nThéo : parti de l'entreprise, clé du 12/09/2023 jamais utilisée, hors délai.\n\n1) Clés hors délai de 90 jours : 1 (celle de Théo, jamais utilisée).\n2) Jours écoulés pour Yanis : 64.\n3) Identité à supprimer : Théo.\n4) À la place des clés permanentes : des rôles IAM à identifiants temporaires.\n5) Sur le root : activer le MFA.",
        "expected": "1 clé hors délai — 64 jours pour Yanis — Théo à supprimer — rôles IAM — MFA sur le root",
        "note": "Une clé jamais utilisée appartenant à un collaborateur parti est le premier risque à éliminer : suppression immédiate, pas simple désactivation."
      }
    ],
    "tests": [
      {
        "label": "Question 1 — Clés inutilisées depuis plus de 90 jours",
        "stdin": "q:1",
        "expected": "2||deux"
      },
      {
        "label": "Question 2 — Jours écoulés depuis la dernière utilisation de la clé de Karim",
        "stdin": "q:2",
        "expected": "187||187 jours"
      },
      {
        "label": "Question 3 — Identité à supprimer",
        "stdin": "q:3",
        "expected": "léo||leo||léo (le stagiaire)||leo (le stagiaire)"
      },
      {
        "label": "Question 4 — Identité IAM à identifiants temporaires",
        "stdin": "q:4",
        "expected": "un rôle iam||rôle iam||les rôles iam||des rôles iam||un rôle||role iam"
      },
      {
        "label": "Question 5 — Dispositif à activer sur l'utilisateur root",
        "stdin": "q:5",
        "expected": "mfa||le mfa||la mfa||l'authentification multifacteur||l authentification multifacteur"
      },
      {
        "label": "Question 6 — Nombre de jours d'existence de la clé de Léo",
        "stdin": "q:6",
        "expected": "481||481 jours"
      }
    ],
    "solution": "[Question 1 — Clés inutilisées depuis plus de 90 jours]\n2\n\n[Question 2 — Jours écoulés depuis la dernière utilisation de la clé de Karim]\n187\n\n[Question 3 — Identité à supprimer]\nléo\n\n[Question 4 — Identité IAM à identifiants temporaires]\nun rôle iam\n\n[Question 5 — Dispositif à activer sur l'utilisateur root]\nmfa\n\n[Question 6 — Nombre de jours d'existence de la clé de Léo]\n481",
    "takeaway": "1) Sont hors délai de 90 jours : la clé de Karim (187 jours sans usage) et celle de Léo (jamais utilisée) : 2 clés.\n2) De 10/12/2024 au 15/06/2025 : 21 + 31 + 28 + 31 + 30 + 31 + 15 = 187 jours.\n3) Léo est parti de l'entreprise : son identité et sa clé doivent être supprimées.\n4) Les rôles IAM fournissent des identifiants temporaires : on les endosse au lieu de conserver une clé permanente.\n5) L'utilisateur root doit être protégé par le MFA (authentification multifacteur).\n6) Du 20/02/2024 au 15/06/2025 : 366 jours (année bissextile, 29/02/2024 inclus) jusqu'au 20/02/2025, puis 115 jours jusqu'au 15/06/2025, soit 481 jours.\nContrôle : Amélie (1 jour) et Sofia (0 jour) sont conformes ; 2 clés conformes + 2 clés hors délai = 4 clés auditées."
  },
  {
    "id": "aws3-c2-e3",
    "chapter": 2,
    "level": "n2",
    "language": "analyse",
    "title": "La gouvernance multi-comptes du groupe Vantara",
    "exampleTitle": "Exemple résolu — la gouvernance de l'agence de voyages Voyaj",
    "goal": "Raisonner sur AWS Organizations : compte de gestion, OU, portée des SCP et règle du refus explicite.",
    "brief": "<p><strong>Énoncé.</strong> Le groupe industriel Vantara organise ses environnements AWS avec <strong>AWS Organizations</strong> : un <strong>compte de gestion</strong> qui porte la facturation, puis deux unités d'organisation (OU) : « Production » (comptes app-prod et data-prod) et « Sandbox » (comptes dev-test et proto). La SCP par défaut <code>FullAWSAccess</code> est attachée à la racine. Sur l'OU Sandbox, l'administrateur attache une SCP qui refuse explicitement toute action menée en dehors de la région <strong>eu-west-3</strong>, et une seconde SCP qui refuse <code>organizations:LeaveOrganization</code>.</p><p>Rappel du cours : dans une organisation, l'évaluation d'une demande suit la règle d'or : un refus explicite (Deny) l'emporte toujours ; les SCP définissent le plafond de permissions de chaque compte ; sans SCP accordante dans la chaîne, tout retombe sur un refus implicite.</p><p>Les questions 2 et 6 attendent « oui » ou « non » ; les autres une réponse courte.</p><ol><li>Comment s'appelle le compte au sommet de l'organisation, celui qui porte la facturation consolidée ?</li><li>Les SCP s'appliquent-elles au compte de gestion ?</li><li>Un développeur du compte dev-test, doté d'une politique IAM AdministratorAccess, tente de lancer une instance dans la région us-east-1 : sa demande aboutit-elle ?</li><li>Quelle règle l'emporte toujours, quelle que soit la politique IAM de l'utilisateur ?</li><li>Que fait AWS Organizations au niveau de la facturation des comptes membres ?</li><li>Si l'on détache la SCP FullAWSAccess d'une OU sans la remplacer par une autre autorisation, tout reste-t-il autorisé dans les comptes de cette OU ?</li></ol>",
    "starter": "# Exercice — La gouvernance multi-comptes du groupe Vantara\n# Lisez l'énoncé complet ci-dessus, puis répondez à chaque question dans son bloc.\n# Questions 2 et 6 : oui ou non.\n\n[Question 1 — Compte au sommet de l'organisation]\nA_COMPLETER\n\n[Question 2 — Les SCP s'appliquent-elles au compte de gestion ?]\nA_COMPLETER\n\n[Question 3 — Lancement d'une instance en us-east-1 depuis dev-test]\nA_COMPLETER\n\n[Question 4 — Règle qui l'emporte toujours]\nA_COMPLETER\n\n[Question 5 — Facturation des comptes membres]\nA_COMPLETER\n\n[Question 6 — Une OU sans SCP accordante : tout reste-t-il autorisé ?]\nA_COMPLETER\n",
    "hints": [
      "Une organisation a toujours un compte racine appelé compte de gestion (management account) : c'est lui qui regroupe la facturation.",
      "Les SCP ne s'appliquent ni au compte de gestion, ni aux identités des services AWS ; elles plafonnent les comptes membres.",
      "1. Cherchez le nom du compte racine de l'organisation. 2. Pensez à qui échappe les SCP. 3. La région visée est-elle dans la zone autorisée ? 4. Rappelez la règle d'or. 5. Une seule facture pour tous les comptes. 6. Sans Allow dans la chaîne des SCP, que reste-t-il ?"
    ],
    "examples": [
      {
        "stdin": "L'agence de voyages Voyaj organise ses comptes : un compte de gestion, une OU Prod, une OU Lab.\nUne SCP sur Lab refuse toute action hors de la région eu-west-1 ; l'OU Prod ne porte que FullAWSAccess.\n\n1) Le compte qui porte la facture consolidée : le compte de gestion.\n2) Un data scientist de Lab (admin IAM) veut créer un bucket dans us-east-1 : refusé, le Deny explicite de la SCP l'emporte.\n3) Les SCP ne s'appliquent pas au compte de gestion.\n4) Si l'on détache FullAWSAccess de Prod sans autre SCP : plus aucune action n'est autorisée.",
        "expected": "compte de gestion — refusé en us-east-1 (Deny explicite) — SCP sans effet sur le compte de gestion — sans FullAWSAccess, tout est refusé",
        "note": "Une SCP n'accorde jamais de permission : elle ne fixe qu'un plafond ; sans Allow SCP dans la chaîne, tout tombe au refus implicite."
      }
    ],
    "tests": [
      {
        "label": "Question 1 — Compte au sommet de l'organisation",
        "stdin": "q:1",
        "expected": "le compte de gestion||compte de gestion||le management account||management account||le compte de gestion (management)"
      },
      {
        "label": "Question 2 — Les SCP s'appliquent-elles au compte de gestion ?",
        "stdin": "q:2",
        "expected": "non"
      },
      {
        "label": "Question 3 — Lancement d'une instance en us-east-1 depuis dev-test",
        "stdin": "q:3",
        "expected": "non||non, refusée||non, la demande est refusée"
      },
      {
        "label": "Question 4 — Règle qui l'emporte toujours",
        "stdin": "q:4",
        "expected": "le refus explicite||refus explicite||le deny explicite||explicit deny||le refus explicite (deny)"
      },
      {
        "label": "Question 5 — Facturation des comptes membres",
        "stdin": "q:5",
        "expected": "la facturation consolidée||facturation consolidée||consolidated billing||une facture unique||la facture consolidée"
      },
      {
        "label": "Question 6 — Une OU sans SCP accordante : tout reste-t-il autorisé ?",
        "stdin": "q:6",
        "expected": "non"
      }
    ],
    "solution": "[Question 1 — Compte au sommet de l'organisation]\nle compte de gestion\n\n[Question 2 — Les SCP s'appliquent-elles au compte de gestion ?]\nnon\n\n[Question 3 — Lancement d'une instance en us-east-1 depuis dev-test]\nnon\n\n[Question 4 — Règle qui l'emporte toujours]\nle refus explicite\n\n[Question 5 — Facturation des comptes membres]\nla facturation consolidée\n\n[Question 6 — Une OU sans SCP accordante : tout reste-t-il autorisé ?]\nnon",
    "takeaway": "1) Le compte au sommet de l'organisation est le compte de gestion (management account) : il porte la facturation consolidée.\n2) Non : les SCP ne s'appliquent pas au compte de gestion.\n3) Non : la SCP de l'OU Sandbox refuse explicitement toute action hors d'eu-west-3 ; le Deny l'emporte sur AdministratorAccess.\n4) La règle d'or : un refus explicite (Deny) l'emporte toujours, quelle que soit la politique IAM de l'utilisateur.\n5) AWS Organizations consolide la facturation : une facture unique regroupe la consommation de tous les comptes membres.\n6) Non : sans SCP accordante (comme FullAWSAccess) dans la chaîne, plus aucune action n'est autorisée — refus implicite généralisé.\nContrôle : racine (FullAWSAccess) + OU Sandbox (Deny hors eu-west-3, Deny LeaveOrganization) : le plafond du Sandbox est la région unique."
  }
];

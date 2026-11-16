'use strict';

module.exports = [
  {
    "id": "ws3-c2-e1",
    "chapter": 2,
    "level": "n1",
    "language": "analyse",
    "title": "Le partage Compta$ du groupe Marnier",
    "exampleTitle": "Exemple résolu — le partage Ventes$ du même groupe",
    "goal": "Lire une imbrication de groupes conforme à AGDLP et en déduire le droit effectif d'un utilisateur.",
    "brief": "<p><strong>Énoncé.</strong> Le groupe Marnier (fonderie, 350 salariés) gère l'annuaire du domaine <strong>marnier.local</strong>. L'arborescence du siège est la suivante : sous le domaine, l'OU <strong>Siège</strong> contient les OU <strong>Comptabilité</strong>, <strong>Ventes</strong> et <strong>Production</strong>. Le serveur SRV-FICHIER héberge le dossier D:\\Partages\\Compta, partagé en <strong>Compta$</strong> pour les cinq comptables. L'administrateur applique la méthode AGDLP :</p><table><tr><th>Objet</th><th>Nature</th><th>Appartenance / autorisation</th></tr><tr><th>léa.martin, hugo.bernard, sara.dubois (comptables)</th><td>comptes utilisateurs</td><td>membres de GG_Compta</td></tr><tr><th>GG_Compta</th><td>groupe global</td><td>membre de DL_Compta_Modif</td></tr><tr><th>DL_Compta_Modif</th><td>groupe local de domaine</td><td>autorisation NTFS « Modifier » sur D:\\Partages\\Compta</td></tr></table><p>Répondez de façon courte ; la question 5 appelle un niveau de droit.</p><ol><li>Dans quel groupe les comptes des comptables sont-ils placés ?</li><li>Quel est le type de ce groupe ?</li><li>Quel groupe reçoit l'autorisation NTFS sur le dossier ?</li><li>Quel est le type de ce groupe ?</li><li>Quel est le droit effectif de léa.martin sur le dossier ?</li><li>Quel acronyme du cours résume cette chaîne d'imbrication ?</li></ol>",
    "starter": "# Exercice — Le partage Compta$ du groupe Marnier\n# Lisez l'énoncé complet ci-dessus, puis répondez à chaque question dans son bloc.\n# Questions 1 à 4 et 6 : noms exacts ou type. Question 5 : le droit.\n\n[Question 1 — Groupe recevant les comptes]\nA_COMPLETER\n\n[Question 2 — Type de ce groupe]\nA_COMPLETER\n\n[Question 3 — Groupe portant l'autorisation NTFS]\nA_COMPLETER\n\n[Question 4 — Type de ce groupe]\nA_COMPLETER\n\n[Question 5 — Droit effectif de léa.martin]\nA_COMPLETER\n\n[Question 6 — Acronyme de la méthode]\nA_COMPLETER\n",
    "hints": [
      "En AGDLP, les comptes (A) entrent dans des groupes globaux (G) qui regroupent un service.",
      "Les groupes globaux entrent dans des groupes locaux de domaine (L) ; seuls ces derniers portent les autorisations sur les ressources (P).",
      "Le droit effectif d'un utilisateur suit toute la chaîne : comptes, puis global, puis local de domaine, puis autorisation sur la ressource."
    ],
    "examples": [
      {
        "stdin": "Le partage Ventes$ (D:\\Partages\\Ventes) est réservé aux commerciaux :\nmarc.dupont et eva.leroy sont membres de GG_Ventes (groupe global), lui-même membre de\nDL_Ventes_Lecture (groupe local de domaine), qui porte l'autorisation NTFS « Lecture ».\n\n1) Les comptes sont placés dans GG_Ventes.\n2) Type : global.\n3) L'autorisation est portée par DL_Ventes_Lecture.\n4) Type : local de domaine.\n5) Droit effectif de marc.dupont : Lecture.\n6) Méthode : AGDLP.",
        "expected": "GG_Ventes — global — DL_Ventes_Lecture — local de domaine — Lecture — AGDLP",
        "note": "Le verrouillage AGDLP garde l'annuaire portable : changer une autorisation revient à modifier un seul groupe local de domaine."
      }
    ],
    "tests": [
      {
        "label": "Question 1 — Groupe recevant les comptes",
        "stdin": "q:1",
        "expected": "GG_Compta||dans GG_Compta"
      },
      {
        "label": "Question 2 — Type de ce groupe",
        "stdin": "q:2",
        "expected": "global||un groupe global||groupe global"
      },
      {
        "label": "Question 3 — Groupe portant l'autorisation NTFS",
        "stdin": "q:3",
        "expected": "DL_Compta_Modif"
      },
      {
        "label": "Question 4 — Type de ce groupe",
        "stdin": "q:4",
        "expected": "local de domaine||un groupe local de domaine||groupe local de domaine"
      },
      {
        "label": "Question 5 — Droit effectif de léa.martin",
        "stdin": "q:5",
        "expected": "Modifier||Modification||modifier"
      },
      {
        "label": "Question 6 — Acronyme de la méthode",
        "stdin": "q:6",
        "expected": "AGDLP"
      }
    ],
    "solution": "[Question 1 — Groupe recevant les comptes]\nGG_Compta\n\n[Question 2 — Type de ce groupe]\nglobal\n\n[Question 3 — Groupe portant l'autorisation NTFS]\nDL_Compta_Modif\n\n[Question 4 — Type de ce groupe]\nlocal de domaine\n\n[Question 5 — Droit effectif de léa.martin]\nModifier\n\n[Question 6 — Acronyme de la méthode]\nAGDLP",
    "takeaway": "1) Les comptes des comptables sont placés directement dans GG_Compta.\n2) GG_Compta est un groupe global : il regroupe les comptes d'un même service.\n3) L'autorisation NTFS « Modifier » est portée par DL_Compta_Modif sur D:\\Partages\\Compta.\n4) DL_Compta_Modif est un groupe local de domaine : seul type habilité à porter des autorisations sur les ressources.\n5) léa.martin appartient à GG_Compta, membre de DL_Compta_Modif : son droit effectif est Modifier.\n6) La chaîne comptes, puis global, puis local de domaine, puis autorisation se résume en AGDLP.\nContrôle : aucun compte n'est posé directement sur la ressource et aucun groupe global ne porte d'autorisation : la conformité AGDLP est totale."
  },
  {
    "id": "ws3-c2-e2",
    "chapter": 2,
    "level": "n2",
    "language": "analyse",
    "title": "La panne du contrôleur DC-01 chez Marnier",
    "exampleTitle": "Exemple résolu — la panne du contrôleur DC-A du cabinet Alizeo",
    "goal": "Localiser les rôles FSMO, mesurer l'impact d'une panne de contrôleur et connaître la récupération par saisie.",
    "brief": "<p><strong>Énoncé.</strong> Le domaine <strong>marnier.local</strong> s'appuie sur deux contrôleurs de domaine. La répartition des cinq rôles FSMO est la suivante :</p><ul><li><strong>DC-01</strong> : PDC Emulator, RID Master ;</li><li><strong>DC-02</strong> : Schema Master, Domain Naming Master, Infrastructure Master.</li></ul><p>Samedi matin, DC-01 tombe en panne matérielle ; le fournisseur annonce plusieurs jours de réparation. Ce week-end, l'équipe doit traiter des changements de mot de passe et prépare la rentrée des nouveaux salariés (créations de comptes). Répondez de façon courte ; les questions 3 et 4 appellent « Oui » ou « Non ».</p><ol><li>Combien de rôles FSMO l'infrastructure compte-t-elle au total ?</li><li>Quels rôles DC-01 hébergeait-il ?</li><li>Le traitement d'un changement de mot de passe est-il possible pendant la panne ?</li><li>La création d'un nouveau compte est-elle possible pendant la panne ?</li><li>Sur quel contrôleur peut-on encore modifier le schéma ?</li><li>Quelle opération attribue les rôles de DC-01 à DC-02 sans attendre sa remise en service ?</li></ol>",
    "starter": "# Exercice — La panne du contrôleur DC-01 chez Marnier\n# Lisez l'énoncé complet ci-dessus, puis répondez à chaque question dans son bloc.\n# Questions 3 et 4 : Oui ou Non. Question 6 : le nom de l'opération.\n\n[Question 1 — Nombre total de rôles FSMO]\nA_COMPLETER\n\n[Question 2 — Rôles hébergés par DC-01]\nA_COMPLETER\n\n[Question 3 — Changement de mot de passe possible ?]\nA_COMPLETER\n\n[Question 4 — Création de compte possible ?]\nA_COMPLETER\n\n[Question 5 — Contrôleur du schéma]\nA_COMPLETER\n\n[Question 6 — Opération de récupération des rôles]\nA_COMPLETER\n",
    "hints": [
      "Le PDC Emulator traite les changements de mot de passe ; le RID Master distribue les pools d'identifiants nécessaires aux créations de comptes.",
      "Un rôle FSMO indisponible bloque l'opération qui en dépend : identifiez le contrôleur propriétaire, puis son état.",
      "Lorsqu'un contrôleur ne reviendra pas à temps, la saisie de rôle (seize) transfère le rôle de force, contrairement au transfert simple."
    ],
    "examples": [
      {
        "stdin": "Le cabinet Alizeo gère deux contrôleurs :\nDC-A : Schema Master, Domain Naming Master ; DC-B : PDC Emulator, RID Master, Infrastructure Master.\nDC-A tombe hors service pour une semaine.\n\n1) Cinq rôles FSMO au total.\n2) DC-A hébergeait Schema Master et Domain Naming Master.\n3) Le traitement des mots de passe (PDC Emulator sur DC-B) reste possible : Oui.\n4) La création de comptes (RID Master sur DC-B) reste possible : Oui.\n5) Le schéma ne peut plus être modifié.\n6) Récupération : la saisie de rôle (seize).",
        "expected": "5 rôles — DC-A : Schema Master et Domain Naming Master — mots de passe : Oui — créations : Oui — schéma bloqué — saisie de rôle",
        "note": "Seuls les rôles portés par le contrôleur en panne sont impactés : les autres continuent d'être servis."
      }
    ],
    "tests": [
      {
        "label": "Question 1 — Nombre total de rôles FSMO",
        "stdin": "q:1",
        "expected": "5||cinq"
      },
      {
        "label": "Question 2 — Rôles hébergés par DC-01",
        "stdin": "q:2",
        "expected": "PDC Emulator et RID Master||le PDC Emulator et le RID Master||PDC Emulator, RID Master"
      },
      {
        "label": "Question 3 — Changement de mot de passe possible ?",
        "stdin": "q:3",
        "expected": "Non||non||impossible"
      },
      {
        "label": "Question 4 — Création de compte possible ?",
        "stdin": "q:4",
        "expected": "Non||non||impossible"
      },
      {
        "label": "Question 5 — Contrôleur du schéma",
        "stdin": "q:5",
        "expected": "DC-02||sur DC-02"
      },
      {
        "label": "Question 6 — Opération de récupération des rôles",
        "stdin": "q:6",
        "expected": "la saisie de rôle||saisie de rôle||une saisie de rôle||seize||la saisie (seize) de rôle"
      }
    ],
    "solution": "[Question 1 — Nombre total de rôles FSMO]\n5\n\n[Question 2 — Rôles hébergés par DC-01]\nPDC Emulator et RID Master\n\n[Question 3 — Changement de mot de passe possible ?]\nNon\n\n[Question 4 — Création de compte possible ?]\nNon\n\n[Question 5 — Contrôleur du schéma]\nDC-02\n\n[Question 6 — Opération de récupération des rôles]\nla saisie de rôle",
    "takeaway": "1) L'infrastructure compte 5 rôles FSMO : 3 au niveau du domaine (PDC Emulator, RID Master, Infrastructure) et 2 au niveau de la forêt (Schema Master, Domain Naming Master).\n2) DC-01 hébergeait le PDC Emulator et le RID Master.\n3) Non : le PDC Emulator, qui traite les changements de mot de passe, est indisponible.\n4) Non : le RID Master, qui alimente les créations de comptes, est indisponible.\n5) Le Schema Master est porté par DC-02 : on peut encore y modifier le schéma.\n6) La saisie de rôle (seize) attribue les rôles de DC-01 à DC-02 de force, sans attendre la remise en service ; le transfert simple exigerait un DC-01 joignable.\nContrôle : 2 rôles sur DC-01 + 3 rôles sur DC-02 = 5 rôles."
  },
  {
    "id": "ws3-c2-e3",
    "chapter": 2,
    "level": "n3",
    "language": "analyse",
    "title": "L'audit du journal de sécurité après l'alerte svc-backup",
    "exampleTitle": "Exemple résolu — le journal du domaine fil-nord.local",
    "goal": "Lire un journal de sécurité Active Directory, repérer les ajouts à haut privilège et les suppressions orphelines.",
    "brief": "<p><strong>Énoncé.</strong> Chez Marnier, l'audit des comptes est activé sur le contrôleur de domaine. À la suite d'une alerte, l'équipe relève le journal de sécurité du 12 mars :</p><table><tr><th>Heure</th><th>Event ID</th><th>Détail</th><th>Auteur</th></tr><tr><th>09:12</th><td>4720</td><td>création du compte svc-backup</td><td>admin.sys</td></tr><tr><th>09:40</th><td>4728</td><td>svc-backup ajouté au groupe Domain Admins</td><td>admin.sys</td></tr><tr><th>10:05</th><td>4726</td><td>suppression du compte stage-temp</td><td>admin.sys</td></tr><tr><th>10:30</th><td>4728</td><td>martine.l ajoutée au groupe Salaires</td><td>rh.admin</td></tr></table><p>Groupes considérés à haut privilège : Domain Admins, Enterprise Admins, Schema Admins, Administrators. Aucun événement 4720 ne concerne stage-temp dans la période couverte par le journal. Répondez de façon courte ; la question 5 appelle « Oui » ou « Non ».</p><ol><li>Quel Event ID correspond à la création d'un compte ?</li><li>Quel Event ID correspond à l'ajout d'un membre dans un groupe ?</li><li>Combien d'événements d'ajout dans un groupe figurent au journal ?</li><li>Dans quel groupe à haut privilège svc-backup a-t-il été ajouté ?</li><li>La suppression de stage-temp est-elle cohérente avec le journal ?</li><li>Combien de comptes créés restent actifs à la fin de la période ?</li></ol>",
    "starter": "# Exercice — L'audit du journal de sécurité après l'alerte svc-backup\n# Lisez l'énoncé complet ci-dessus, puis répondez à chaque question dans son bloc.\n# Question 5 : Oui ou Non. Les autres : valeurs courtes.\n\n[Question 1 — Event ID de création de compte]\nA_COMPLETER\n\n[Question 2 — Event ID d'ajout dans un groupe]\nA_COMPLETER\n\n[Question 3 — Nombre d'ajouts dans un groupe]\nA_COMPLETER\n\n[Question 4 — Groupe à haut privilège visé]\nA_COMPLETER\n\n[Question 5 — Suppression de stage-temp cohérente ?]\nA_COMPLETER\n\n[Question 6 — Comptes créés encore actifs]\nA_COMPLETER\n",
    "hints": [
      "4720 = création, 4726 = suppression, 4728 = ajout dans un groupe : mémorisez cette correspondance avant de compter.",
      "Un ajout dans un groupe à haut privilège constitue une alerte ; un ajout dans un groupe métier non.",
      "Une suppression cohérente suppose une création préalable dans le journal ; sans création, il s'agit d'une anomalie orpheline."
    ],
    "examples": [
      {
        "stdin": "Journal du domaine fil-nord.local :\n08:15 4720 création de jdoe par admin01 ; 08:40 4728 jdoe ajouté à Domain Admins par admin01 ;\n09:00 4720 création de stewart par admin02 ; 09:30 4726 suppression de stewart par admin02.\n\n1) Création : 4720.\n2) Ajout dans un groupe : 4728.\n3) Un seul ajout figure au journal.\n4) Groupe à haut privilège : Domain Admins.\n5) Oui : stewart avait bien été créé à 09:00 avant sa suppression.\n6) Comptes créés actifs : 1 (jdoe).",
        "expected": "4720 — 4728 — 1 ajout — Domain Admins — suppression cohérente — 1 compte actif",
        "note": "Le comptage des actifs retranche les créations suivies d'une suppression : stewart est créé puis supprimé, il ne reste que jdoe."
      }
    ],
    "tests": [
      {
        "label": "Question 1 — Event ID de création de compte",
        "stdin": "q:1",
        "expected": "4720"
      },
      {
        "label": "Question 2 — Event ID d'ajout dans un groupe",
        "stdin": "q:2",
        "expected": "4728"
      },
      {
        "label": "Question 3 — Nombre d'ajouts dans un groupe",
        "stdin": "q:3",
        "expected": "2||deux"
      },
      {
        "label": "Question 4 — Groupe à haut privilège visé",
        "stdin": "q:4",
        "expected": "Domain Admins||le groupe Domain Admins"
      },
      {
        "label": "Question 5 — Suppression de stage-temp cohérente ?",
        "stdin": "q:5",
        "expected": "Non||non||anormale"
      },
      {
        "label": "Question 6 — Comptes créés encore actifs",
        "stdin": "q:6",
        "expected": "1||un"
      }
    ],
    "solution": "[Question 1 — Event ID de création de compte]\n4720\n\n[Question 2 — Event ID d'ajout dans un groupe]\n4728\n\n[Question 3 — Nombre d'ajouts dans un groupe]\n2\n\n[Question 4 — Groupe à haut privilège visé]\nDomain Admins\n\n[Question 5 — Suppression de stage-temp cohérente ?]\nNon\n\n[Question 6 — Comptes créés encore actifs]\n1",
    "takeaway": "1) La création d'un compte correspond à l'Event ID 4720.\n2) L'ajout d'un membre dans un groupe correspond à l'Event ID 4728.\n3) Deux événements 4728 figurent au journal (09:40 et 10:30).\n4) svc-backup a été ajouté au groupe à haut privilège Domain Admins : c'est l'alerte de privilège.\n5) Non : stage-temp n'a jamais été créé dans la période couverte (aucun 4720 à son nom) ; sa suppression est une anomalie orpheline.\n6) Un seul compte créé reste actif : svc-backup (créé à 09:12, jamais supprimé).\nContrôle : l'ajout de martine.l au groupe Salaires n'est pas une alerte, car Salaires n'est pas un groupe à haut privilège."
  }
];

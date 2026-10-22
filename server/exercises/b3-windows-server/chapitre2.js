'use strict';

module.exports = [
  {
    "id": "ws3-c2-e1",
    "chapter": 2,
    "title": "Vérificateur de conformité de structure de groupes AGDLP / AGUDLP",
    "level": "n1",
    "language": "analyse",
    "goal": "Vérifier la conformité de l’arborescence des identités au standard Microsoft AGDLP (Comptes -> Groupes Globaux -> Groupes Locaux de Domaine -> ACLs).",
    "brief": "Dans une forêt Active Directory, Microsoft préconise la règle d’or AGDLP pour l’attribution des permissions :\n- Les comptes utilisateurs (`USER`) doivent appartenir à des groupes globaux (`GLOBAL`).\n- Les groupes globaux (`GLOBAL`) doivent appartenir à des groupes locaux de domaine (`DOMAIN_LOCAL`) ou universels (`UNIVERSAL`).\n- Les ressources partagées (`RESOURCE`) doivent accorder leurs permissions exclusivement à des groupes `DOMAIN_LOCAL`.\n\nEntrée :\n`USER name=<NOM> member_of=<GROUPE>`\n`GROUP name=<NOM> type=<GLOBAL|DOMAIN_LOCAL|UNIVERSAL> member_of=<PARENT_GROUPE|NONE>`\n`RESOURCE name=<NOM> acl_group=<GROUPE> permission=<READ|MODIFY|FULL>`\n\nInfractions détectées :\n- `INFRACTION_USER user=<U> group=<G> type=<TYPE>` : si un utilisateur est rattaché directement à un groupe qui n’est pas GLOBAL.\n- `INFRACTION_NESTING group=<G> parent=<P> parent_type=<TYPE>` : si un groupe GLOBAL est imbriqué dans autre chose qu’un DOMAIN_LOCAL ou UNIVERSAL (ou si parent inconnu).\n- `INFRACTION_ACL resource=<R> group=<G> type=<TYPE>` : si une ressource applique une ACL avec un groupe qui n’est pas DOMAIN_LOCAL.\n\nRésultat d’analyse attendu :\n- Liste des infractions ordonnées par type puis nom de l’objet :\n  `INFRACTION_...`\n- Bilan :\n  `SUMMARY total_objets=<N> infractions=<I> conformite=<CONFORME|NON_CONFORME>`",
    "starter": "# Grille d'analyse (ws3-c2-e1) — Vérificateur de conformité de structure de groupes AGDLP / AGUDLP\n# Complétez la résolution demandée sous chaque cas ci-dessous :\n\n[Cas 1 — Utilisateur rattaché directement à un groupe Domain Local]\n# Données : GROUP name=DL_AdminLocal type=DOMAIN_LOCAL member_of=NONE\n# Données : USER name=Bob member_of=DL_AdminLocal\n# Données : RESOURCE name=PartageIT acl_group=DL_AdminLocal permission=FULL\nA_COMPLETER\n\n[Cas 2 — Ressource avec ACL pointant directement sur un groupe Global]\n# Données : GROUP name=GG_Devs type=GLOBAL member_of=NONE\n# Données : USER name=Charlie member_of=GG_Devs\n# Données : RESOURCE name=DepotGit acl_group=GG_Devs permission=READ\nA_COMPLETER\n\n[Cas 3 — Mauvaise imbrication d’un groupe global dans un autre groupe global]\n# Données : GROUP name=GG_Junior type=GLOBAL member_of=GG_Senior\n# Données : GROUP name=GG_Senior type=GLOBAL member_of=NONE\n# Données : USER name=David member_of=GG_Junior\n# Données : RESOURCE name=PartageDocs acl_group=DL_Docs permission=READ\n# Données : GROUP name=DL_Docs type=DOMAIN_LOCAL member_of=NONE\nA_COMPLETER\n",
    "hints": [
      "Indexer les types des groupes dans un dictionnaire {nom: type}.",
      "Vérifier les utilisateurs, les imbrications de groupes et les ACLs des ressources.",
      "Trier les infractions pour produire une sortie stable."
    ],
    "examples": [
      {
        "stdin": "GROUP name=GG_Compta type=GLOBAL member_of=DL_Factures_Modif\nGROUP name=DL_Factures_Modif type=DOMAIN_LOCAL member_of=NONE\nUSER name=Alice member_of=GG_Compta\nRESOURCE name=DossierFactures acl_group=DL_Factures_Modif permission=MODIFY",
        "expected": "SUMMARY total_objets=4 infractions=0 conformite=CONFORME",
        "note": "Alice -> GG_Compta (Global) -> DL_Factures_Modif (Domain Local) -> DossierFactures : chaîne AGDLP parfaite."
      }
    ],
    "tests": [
      {
        "label": "Utilisateur rattaché directement à un groupe Domain Local",
        "stdin": "cas:1",
        "expected": "INFRACTION_USER user=Bob group=DL_AdminLocal type=DOMAIN_LOCAL\nSUMMARY total_objets=3 infractions=1 conformite=NON_CONFORME"
      },
      {
        "label": "Ressource avec ACL pointant directement sur un groupe Global",
        "stdin": "cas:2",
        "expected": "INFRACTION_ACL resource=DepotGit group=GG_Devs type=GLOBAL\nSUMMARY total_objets=3 infractions=1 conformite=NON_CONFORME"
      },
      {
        "label": "Mauvaise imbrication d’un groupe global dans un autre groupe global",
        "stdin": "cas:3",
        "expected": "INFRACTION_NESTING group=GG_Junior parent=GG_Senior parent_type=GLOBAL\nSUMMARY total_objets=5 infractions=1 conformite=NON_CONFORME"
      }
    ],
    "solution": "[Exemple]\nSUMMARY total_objets=4 infractions=0 conformite=CONFORME\n\n[Cas 1 — Utilisateur rattaché directement à un groupe Domain Local]\nINFRACTION_USER user=Bob group=DL_AdminLocal type=DOMAIN_LOCAL\nSUMMARY total_objets=3 infractions=1 conformite=NON_CONFORME\n\n[Cas 2 — Ressource avec ACL pointant directement sur un groupe Global]\nINFRACTION_ACL resource=DepotGit group=GG_Devs type=GLOBAL\nSUMMARY total_objets=3 infractions=1 conformite=NON_CONFORME\n\n[Cas 3 — Mauvaise imbrication d’un groupe global dans un autre groupe global]\nINFRACTION_NESTING group=GG_Junior parent=GG_Senior parent_type=GLOBAL\nSUMMARY total_objets=5 infractions=1 conformite=NON_CONFORME"
  },
  {
    "id": "ws3-c2-e2",
    "chapter": 2,
    "title": "Simulateur de topologie FSMO et routage des opérations AD DS",
    "level": "n2",
    "language": "analyse",
    "goal": "Acheminer les opérations Active Directory vers le contrôleur détenteur du rôle FSMO correspondant et gérer les pannes de contrôleur.",
    "brief": "Active Directory repose sur 5 rôles FSMO (Flexible Single Master Operations) indispensables aux opérations sensibles :\n- `UPDATE_SCHEMA` -> `SCHEMA_MASTER` (forêt)\n- `ADD_DOMAIN` -> `DOMAIN_NAMING` (forêt)\n- `CHANGE_PASSWORD` -> `PDC_EMULATOR` (domaine)\n- `CREATE_USER` -> `RID_MASTER` (domaine)\n- `INTER_DOMAIN_REF` -> `INFRASTRUCTURE` (domaine)\n\nEntrée :\n`FSMO role=<ROLE> dc=<DC_NAME>` (définition des 5 rôles)\n`DC_STATUS name=<DC_NAME> state=<ONLINE|OFFLINE>`\n`OP type=<UPDATE_SCHEMA|ADD_DOMAIN|CHANGE_PASSWORD|CREATE_USER|INTER_DOMAIN_REF>`\n\nRègles :\n- Identifier le contrôleur assigné au rôle FSMO de l’opération demandée.\n- Si ce DC est `ONLINE`, le statut est `EXECUTE`.\n- Si ce DC est `OFFLINE`, le statut est `BLOQUE` (opération impossible sans transfert/saisie de rôle).\n\nRésultat d’analyse attendu :\n- Pour chaque opération demandée :\n  `OP_RESULT type=<OP> role=<ROLE> dc=<DC> statut=<EXECUTE|BLOQUE>`\n- Bilan :\n  `SUMMARY total_ops=<N> executees=<E> bloquees=<B>`",
    "starter": "# Grille d'analyse (ws3-c2-e2) — Simulateur de topologie FSMO et routage des opérations AD DS\n# Complétez la résolution demandée sous chaque cas ci-dessous :\n\n[Cas 1 — Toutes les opérations exécutées avec succès]\n# Données : FSMO role=SCHEMA_MASTER dc=DC-PDC\n# Données : FSMO role=DOMAIN_NAMING dc=DC-PDC\n# Données : FSMO role=PDC_EMULATOR dc=DC-PDC\n# Données : FSMO role=RID_MASTER dc=DC-PDC\n# Données : FSMO role=INFRASTRUCTURE dc=DC-PDC\n# Données : DC_STATUS name=DC-PDC state=ONLINE\n# Données : OP type=UPDATE_SCHEMA\n# Données : OP type=ADD_DOMAIN\nA_COMPLETER\n\n[Cas 2 — Panne totale du contrôleur hébergeant le PDC Emulator]\n# Données : FSMO role=PDC_EMULATOR dc=DC-CRITIQUE\n# Données : DC_STATUS name=DC-CRITIQUE state=OFFLINE\n# Données : OP type=CHANGE_PASSWORD\nA_COMPLETER\n\n[Cas 3 — Opération inter-domaine avec infrastructure master séparé]\n# Données : FSMO role=INFRASTRUCTURE dc=DC-RODC\n# Données : DC_STATUS name=DC-RODC state=ONLINE\n# Données : OP type=INTER_DOMAIN_REF\nA_COMPLETER\n",
    "hints": [
      "Créer une table de correspondance opération -> rôle FSMO.",
      "Associer chaque rôle à son contrôleur de domaine (DC).",
      "Consulter l’état ONLINE/OFFLINE du DC pour décider du statut."
    ],
    "examples": [
      {
        "stdin": "FSMO role=SCHEMA_MASTER dc=DC01\nFSMO role=DOMAIN_NAMING dc=DC01\nFSMO role=PDC_EMULATOR dc=DC01\nFSMO role=RID_MASTER dc=DC02\nFSMO role=INFRASTRUCTURE dc=DC02\nDC_STATUS name=DC01 state=ONLINE\nDC_STATUS name=DC02 state=OFFLINE\nOP type=CHANGE_PASSWORD\nOP type=CREATE_USER",
        "expected": "OP_RESULT type=CHANGE_PASSWORD role=PDC_EMULATOR dc=DC01 statut=EXECUTE\nOP_RESULT type=CREATE_USER role=RID_MASTER dc=DC02 statut=BLOQUE\nSUMMARY total_ops=2 executees=1 bloquees=1",
        "note": "Le PDC Emulator est sur DC01 (ONLINE -> EXECUTE). Le RID Master est sur DC02 (OFFLINE -> BLOQUE)."
      }
    ],
    "tests": [
      {
        "label": "Toutes les opérations exécutées avec succès",
        "stdin": "cas:1",
        "expected": "OP_RESULT type=UPDATE_SCHEMA role=SCHEMA_MASTER dc=DC-PDC statut=EXECUTE\nOP_RESULT type=ADD_DOMAIN role=DOMAIN_NAMING dc=DC-PDC statut=EXECUTE\nSUMMARY total_ops=2 executees=2 bloquees=0"
      },
      {
        "label": "Panne totale du contrôleur hébergeant le PDC Emulator",
        "stdin": "cas:2",
        "expected": "OP_RESULT type=CHANGE_PASSWORD role=PDC_EMULATOR dc=DC-CRITIQUE statut=BLOQUE\nSUMMARY total_ops=1 executees=0 bloquees=1"
      },
      {
        "label": "Opération inter-domaine avec infrastructure master séparé",
        "stdin": "cas:3",
        "expected": "OP_RESULT type=INTER_DOMAIN_REF role=INFRASTRUCTURE dc=DC-RODC statut=EXECUTE\nSUMMARY total_ops=1 executees=1 bloquees=0"
      }
    ],
    "solution": "[Exemple]\nOP_RESULT type=CHANGE_PASSWORD role=PDC_EMULATOR dc=DC01 statut=EXECUTE\nOP_RESULT type=CREATE_USER role=RID_MASTER dc=DC02 statut=BLOQUE\nSUMMARY total_ops=2 executees=1 bloquees=1\n\n[Cas 1 — Toutes les opérations exécutées avec succès]\nOP_RESULT type=UPDATE_SCHEMA role=SCHEMA_MASTER dc=DC-PDC statut=EXECUTE\nOP_RESULT type=ADD_DOMAIN role=DOMAIN_NAMING dc=DC-PDC statut=EXECUTE\nSUMMARY total_ops=2 executees=2 bloquees=0\n\n[Cas 2 — Panne totale du contrôleur hébergeant le PDC Emulator]\nOP_RESULT type=CHANGE_PASSWORD role=PDC_EMULATOR dc=DC-CRITIQUE statut=BLOQUE\nSUMMARY total_ops=1 executees=0 bloquees=1\n\n[Cas 3 — Opération inter-domaine avec infrastructure master séparé]\nOP_RESULT type=INTER_DOMAIN_REF role=INFRASTRUCTURE dc=DC-RODC statut=EXECUTE\nSUMMARY total_ops=1 executees=1 bloquees=0"
  },
  {
    "id": "ws3-c2-e3",
    "chapter": 2,
    "title": "Parseur de journaux d’audit de sécurité Active Directory (Event IDs 4720, 4726, 4728)",
    "level": "n3",
    "language": "analyse",
    "goal": "Détecter les ajouts suspects de membres dans les groupes à haut privilège et reconstituer l’état des comptes créés.",
    "brief": "Dans le journal de sécurité Windows Server, les événements d’audit des comptes et groupes sont cruciaux :\n- `EVENT id=4720 user=<U> actor=<A>` : Création d’un compte utilisateur.\n- `EVENT id=4726 user=<U> actor=<A>` : Suppression d’un compte utilisateur.\n- `EVENT id=4728 user=<U> group=<G> actor=<A>` : Ajout d’un membre dans un groupe.\n- `EVENT id=4729 user=<U> group=<G> actor=<A>` : Retrait d’un membre d’un groupe.\n\nGroupes d’administration critique surveillés :\n`Domain Admins`, `Enterprise Admins`, `Schema Admins`, `Administrators`.\n\nRègles d’alerte :\n- Tout événement 4728 ciblant un groupe critique déclenche : `ALERTE_PRIVILEGE user=<U> group=<G> actor=<A>`.\n- Un événement 4726 sur un utilisateur qui n’a jamais été créé (événement 4720 préalable) dans ce flux déclenche : `ANOMALIE_ORPHELIN user=<U> actor=<A>`.\n\nRésultat d’analyse attendu :\n- Lignes d’alertes triées par type d’alerte puis nom d’utilisateur :\n  `ALERTE_...` ou `ANOMALIE_...`\n- Bilan :\n  `SUMMARY total_events=<N> users_crees_actifs=<U> alertes_securite=<A>` (où users_crees_actifs = nb de comptes créés par 4720 et non supprimés par 4726).",
    "starter": "# Grille d'analyse (ws3-c2-e3) — Parseur de journaux d’audit de sécurité Active Directory (Event IDs 4720, 4726, 4728)\n# Complétez la résolution demandée sous chaque cas ci-dessous :\n\n[Cas 1 — Suppression d’un utilisateur orphelin sans création préalable]\n# Données : EVENT id=4726 user=fantome actor=hacker\n# Données : EVENT id=4720 user=alice actor=secadmin\nA_COMPLETER\n\n[Cas 2 — Ajouts dans groupes non critiques (aucune alerte)]\n# Données : EVENT id=4720 user=bob actor=admin\n# Données : EVENT id=4728 user=bob group=Compta actor=admin\n# Données : EVENT id=4728 user=bob group=Marketing actor=admin\nA_COMPLETER\n\n[Cas 3 — Multiples alertes de privilèges dans Enterprise Admins et Schema Admins]\n# Données : EVENT id=4728 user=eva group=Enterprise Admins actor=root\n# Données : EVENT id=4728 user=david group=Schema Admins actor=root\nA_COMPLETER\n",
    "hints": [
      "Garder un ensemble des utilisateurs créés par Event ID 4720.",
      "Sur 4726, retirer le compte de l’ensemble ou lever une anomalie s’il n’y était pas.",
      "Sur 4728, tester si le groupe fait partie des groupes critiques."
    ],
    "examples": [
      {
        "stdin": "EVENT id=4720 user=jdoe actor=admin01\nEVENT id=4728 user=jdoe group=Domain Admins actor=admin01\nEVENT id=4720 user=stewart actor=admin02\nEVENT id=4726 user=stewart actor=admin02",
        "expected": "ALERTE_PRIVILEGE user=jdoe group=Domain Admins actor=admin01\nSUMMARY total_events=4 users_crees_actifs=1 alertes_securite=1",
        "note": "jdoe est ajouté au groupe Domain Admins (alerte sécurité). stewart est créé puis supprimé (actif = 0). Il reste 1 compte actif créé (jdoe)."
      }
    ],
    "tests": [
      {
        "label": "Suppression d’un utilisateur orphelin sans création préalable",
        "stdin": "cas:1",
        "expected": "ANOMALIE_ORPHELIN user=fantome actor=hacker\nSUMMARY total_events=2 users_crees_actifs=1 alertes_securite=1"
      },
      {
        "label": "Ajouts dans groupes non critiques (aucune alerte)",
        "stdin": "cas:2",
        "expected": "SUMMARY total_events=3 users_crees_actifs=1 alertes_securite=0"
      },
      {
        "label": "Multiples alertes de privilèges dans Enterprise Admins et Schema Admins",
        "stdin": "cas:3",
        "expected": "ALERTE_PRIVILEGE user=david group=Schema Admins actor=root\nALERTE_PRIVILEGE user=eva group=Enterprise Admins actor=root\nSUMMARY total_events=2 users_crees_actifs=0 alertes_securite=2"
      }
    ],
    "solution": "[Exemple]\nALERTE_PRIVILEGE user=jdoe group=Domain Admins actor=admin01\nSUMMARY total_events=4 users_crees_actifs=1 alertes_securite=1\n\n[Cas 1 — Suppression d’un utilisateur orphelin sans création préalable]\nANOMALIE_ORPHELIN user=fantome actor=hacker\nSUMMARY total_events=2 users_crees_actifs=1 alertes_securite=1\n\n[Cas 2 — Ajouts dans groupes non critiques (aucune alerte)]\nSUMMARY total_events=3 users_crees_actifs=1 alertes_securite=0\n\n[Cas 3 — Multiples alertes de privilèges dans Enterprise Admins et Schema Admins]\nALERTE_PRIVILEGE user=david group=Schema Admins actor=root\nALERTE_PRIVILEGE user=eva group=Enterprise Admins actor=root\nSUMMARY total_events=2 users_crees_actifs=0 alertes_securite=2"
  }
];

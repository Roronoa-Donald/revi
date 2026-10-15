// server/exercises/b3-windows-server/chapitre2.js
// Exercices du Module 2 : Active Directory DS & Modèle AGDLP (idPrefix: ws3)

module.exports = [
  {
    id: 'ws3-c2-e1',
    chapter: 2,
    title: 'Vérificateur de conformité de structure de groupes AGDLP / AGUDLP',
    level: 'n1',
    language: 'python',
    goal: 'Vérifier la conformité de l’arborescence des identités au standard Microsoft AGDLP (Comptes -> Groupes Globaux -> Groupes Locaux de Domaine -> ACLs).',
    brief:
      'Dans une forêt Active Directory, Microsoft préconise la règle d’or AGDLP pour l’attribution des permissions :\n' +
      '- Les comptes utilisateurs (`USER`) doivent appartenir à des groupes globaux (`GLOBAL`).\n' +
      '- Les groupes globaux (`GLOBAL`) doivent appartenir à des groupes locaux de domaine (`DOMAIN_LOCAL`) ou universels (`UNIVERSAL`).\n' +
      '- Les ressources partagées (`RESOURCE`) doivent accorder leurs permissions exclusivement à des groupes `DOMAIN_LOCAL`.\n\n' +
      'Entrée :\n' +
      '`USER name=<NOM> member_of=<GROUPE>`\n' +
      '`GROUP name=<NOM> type=<GLOBAL|DOMAIN_LOCAL|UNIVERSAL> member_of=<PARENT_GROUPE|NONE>`\n' +
      '`RESOURCE name=<NOM> acl_group=<GROUPE> permission=<READ|MODIFY|FULL>`\n\n' +
      'Infractions détectées :\n' +
      '- `INFRACTION_USER user=<U> group=<G> type=<TYPE>` : si un utilisateur est rattaché directement à un groupe qui n’est pas GLOBAL.\n' +
      '- `INFRACTION_NESTING group=<G> parent=<P> parent_type=<TYPE>` : si un groupe GLOBAL est imbriqué dans autre chose qu’un DOMAIN_LOCAL ou UNIVERSAL (ou si parent inconnu).\n' +
      '- `INFRACTION_ACL resource=<R> group=<G> type=<TYPE>` : si une ressource applique une ACL avec un groupe qui n’est pas DOMAIN_LOCAL.\n\n' +
      'Sortie :\n' +
      '- Liste des infractions ordonnées par type puis nom de l’objet :\n' +
      '  `INFRACTION_...`\n' +
      '- Bilan :\n' +
      '  `SUMMARY total_objets=<N> infractions=<I> conformite=<CONFORME|NON_CONFORME>`',
    starter: `import sys

lignes = [l.strip() for l in sys.stdin.read().splitlines() if l.strip()]

# À compléter : analyser la hiérarchie et vérifier la règle AGDLP
`,
    hints: [
      'Indexer les types des groupes dans un dictionnaire {nom: type}.',
      'Vérifier les utilisateurs, les imbrications de groupes et les ACLs des ressources.',
      'Trier les infractions pour produire une sortie stable.'
    ],
    examples: [
      {
        stdin:
          'GROUP name=GG_Compta type=GLOBAL member_of=DL_Factures_Modif\n' +
          'GROUP name=DL_Factures_Modif type=DOMAIN_LOCAL member_of=NONE\n' +
          'USER name=Alice member_of=GG_Compta\n' +
          'RESOURCE name=DossierFactures acl_group=DL_Factures_Modif permission=MODIFY',
        expected: 'SUMMARY total_objets=4 infractions=0 conformite=CONFORME',
        note: 'Alice -> GG_Compta (Global) -> DL_Factures_Modif (Domain Local) -> DossierFactures : chaîne AGDLP parfaite.'
      }
    ],
    tests: [
      {
        label: 'Utilisateur rattaché directement à un groupe Domain Local',
        stdin:
          'GROUP name=DL_AdminLocal type=DOMAIN_LOCAL member_of=NONE\n' +
          'USER name=Bob member_of=DL_AdminLocal\n' +
          'RESOURCE name=PartageIT acl_group=DL_AdminLocal permission=FULL',
        expected:
          'INFRACTION_USER user=Bob group=DL_AdminLocal type=DOMAIN_LOCAL\n' +
          'SUMMARY total_objets=3 infractions=1 conformite=NON_CONFORME'
      },
      {
        label: 'Ressource avec ACL pointant directement sur un groupe Global',
        stdin:
          'GROUP name=GG_Devs type=GLOBAL member_of=NONE\n' +
          'USER name=Charlie member_of=GG_Devs\n' +
          'RESOURCE name=DepotGit acl_group=GG_Devs permission=READ',
        expected:
          'INFRACTION_ACL resource=DepotGit group=GG_Devs type=GLOBAL\n' +
          'SUMMARY total_objets=3 infractions=1 conformite=NON_CONFORME'
      },
      {
        label: 'Mauvaise imbrication d’un groupe global dans un autre groupe global',
        stdin:
          'GROUP name=GG_Junior type=GLOBAL member_of=GG_Senior\n' +
          'GROUP name=GG_Senior type=GLOBAL member_of=NONE\n' +
          'USER name=David member_of=GG_Junior\n' +
          'RESOURCE name=PartageDocs acl_group=DL_Docs permission=READ\n' +
          'GROUP name=DL_Docs type=DOMAIN_LOCAL member_of=NONE',
        expected:
          'INFRACTION_NESTING group=GG_Junior parent=GG_Senior parent_type=GLOBAL\n' +
          'SUMMARY total_objets=5 infractions=1 conformite=NON_CONFORME'
      }
    ],
    solution: `import sys

lignes = [l.strip() for l in sys.stdin.read().splitlines() if l.strip()]

groups = {}
group_parents = {}
users = []
resources = []

for ligne in lignes:
    parts = ligne.split(' ')
    cmd = parts[0]
    pdict = {}
    for tok in parts[1:]:
        if '=' in tok:
            k, v = tok.split('=', 1)
            pdict[k] = v
            
    if cmd == 'GROUP':
        name = pdict.get('name', '')
        gtype = pdict.get('type', 'GLOBAL')
        parent = pdict.get('member_of', 'NONE')
        groups[name] = gtype
        group_parents[name] = parent
    elif cmd == 'USER':
        name = pdict.get('name', '')
        grp = pdict.get('member_of', '')
        users.append((name, grp))
    elif cmd == 'RESOURCE':
        name = pdict.get('name', '')
        grp = pdict.get('acl_group', '')
        perm = pdict.get('permission', 'READ')
        resources.append((name, grp, perm))

total_objets = len(groups) + len(users) + len(resources)
infractions = []

# 1. Vérification des utilisateurs
for u, grp in users:
    gtype = groups.get(grp, 'INCONNU')
    if gtype != 'GLOBAL':
        infractions.append(('1_USER', u, f"INFRACTION_USER user={u} group={grp} type={gtype}"))

# 2. Vérification des imbrications
for g, gtype in groups.items():
    parent = group_parents.get(g, 'NONE')
    if gtype == 'GLOBAL' and parent != 'NONE':
        ptype = groups.get(parent, 'INCONNU')
        if ptype not in ('DOMAIN_LOCAL', 'UNIVERSAL'):
            infractions.append(('2_NESTING', g, f"INFRACTION_NESTING group={g} parent={parent} parent_type={ptype}"))

# 3. Vérification des ACLs
for r, grp, perm in resources:
    gtype = groups.get(grp, 'INCONNU')
    if gtype != 'DOMAIN_LOCAL':
        infractions.append(('3_ACL', r, f"INFRACTION_ACL resource={r} group={grp} type={gtype}"))

infractions.sort(key=lambda x: (x[0], x[1]))

for _, _, msg in infractions:
    print(msg)

c_inf = len(infractions)
statut = "CONFORME" if c_inf == 0 else "NON_CONFORME"
print(f"SUMMARY total_objets={total_objets} infractions={c_inf} conformite={statut}")
`
  },
  {
    id: 'ws3-c2-e2',
    chapter: 2,
    title: 'Simulateur de topologie FSMO et routage des opérations AD DS',
    level: 'n2',
    language: 'python',
    goal: 'Acheminer les opérations Active Directory vers le contrôleur détenteur du rôle FSMO correspondant et gérer les pannes de contrôleur.',
    brief:
      'Active Directory repose sur 5 rôles FSMO (Flexible Single Master Operations) indispensables aux opérations sensibles :\n' +
      '- `UPDATE_SCHEMA` -> `SCHEMA_MASTER` (forêt)\n' +
      '- `ADD_DOMAIN` -> `DOMAIN_NAMING` (forêt)\n' +
      '- `CHANGE_PASSWORD` -> `PDC_EMULATOR` (domaine)\n' +
      '- `CREATE_USER` -> `RID_MASTER` (domaine)\n' +
      '- `INTER_DOMAIN_REF` -> `INFRASTRUCTURE` (domaine)\n\n' +
      'Entrée :\n' +
      '`FSMO role=<ROLE> dc=<DC_NAME>` (définition des 5 rôles)\n' +
      '`DC_STATUS name=<DC_NAME> state=<ONLINE|OFFLINE>`\n' +
      '`OP type=<UPDATE_SCHEMA|ADD_DOMAIN|CHANGE_PASSWORD|CREATE_USER|INTER_DOMAIN_REF>`\n\n' +
      'Règles :\n' +
      '- Identifier le contrôleur assigné au rôle FSMO de l’opération demandée.\n' +
      '- Si ce DC est `ONLINE`, le statut est `EXECUTE`.\n' +
      '- Si ce DC est `OFFLINE`, le statut est `BLOQUE` (opération impossible sans transfert/saisie de rôle).\n\n' +
      'Sortie :\n' +
      '- Pour chaque opération demandée :\n' +
      '  `OP_RESULT type=<OP> role=<ROLE> dc=<DC> statut=<EXECUTE|BLOQUE>`\n' +
      '- Bilan :\n' +
      '  `SUMMARY total_ops=<N> executees=<E> bloquees=<B>`',
    starter: `import sys

lignes = [l.strip() for l in sys.stdin.read().splitlines() if l.strip()]

# À compléter : mapper les opérations sur les rôles FSMO et vérifier l'état des DCs
`,
    hints: [
      'Créer une table de correspondance opération -> rôle FSMO.',
      'Associer chaque rôle à son contrôleur de domaine (DC).',
      'Consulter l’état ONLINE/OFFLINE du DC pour décider du statut.'
    ],
    examples: [
      {
        stdin:
          'FSMO role=SCHEMA_MASTER dc=DC01\n' +
          'FSMO role=DOMAIN_NAMING dc=DC01\n' +
          'FSMO role=PDC_EMULATOR dc=DC01\n' +
          'FSMO role=RID_MASTER dc=DC02\n' +
          'FSMO role=INFRASTRUCTURE dc=DC02\n' +
          'DC_STATUS name=DC01 state=ONLINE\n' +
          'DC_STATUS name=DC02 state=OFFLINE\n' +
          'OP type=CHANGE_PASSWORD\n' +
          'OP type=CREATE_USER',
        expected:
          'OP_RESULT type=CHANGE_PASSWORD role=PDC_EMULATOR dc=DC01 statut=EXECUTE\n' +
          'OP_RESULT type=CREATE_USER role=RID_MASTER dc=DC02 statut=BLOQUE\n' +
          'SUMMARY total_ops=2 executees=1 bloquees=1',
        note: 'Le PDC Emulator est sur DC01 (ONLINE -> EXECUTE). Le RID Master est sur DC02 (OFFLINE -> BLOQUE).'
      }
    ],
    tests: [
      {
        label: 'Toutes les opérations exécutées avec succès',
        stdin:
          'FSMO role=SCHEMA_MASTER dc=DC-PDC\n' +
          'FSMO role=DOMAIN_NAMING dc=DC-PDC\n' +
          'FSMO role=PDC_EMULATOR dc=DC-PDC\n' +
          'FSMO role=RID_MASTER dc=DC-PDC\n' +
          'FSMO role=INFRASTRUCTURE dc=DC-PDC\n' +
          'DC_STATUS name=DC-PDC state=ONLINE\n' +
          'OP type=UPDATE_SCHEMA\n' +
          'OP type=ADD_DOMAIN',
        expected:
          'OP_RESULT type=UPDATE_SCHEMA role=SCHEMA_MASTER dc=DC-PDC statut=EXECUTE\n' +
          'OP_RESULT type=ADD_DOMAIN role=DOMAIN_NAMING dc=DC-PDC statut=EXECUTE\n' +
          'SUMMARY total_ops=2 executees=2 bloquees=0'
      },
      {
        label: 'Panne totale du contrôleur hébergeant le PDC Emulator',
        stdin:
          'FSMO role=PDC_EMULATOR dc=DC-CRITIQUE\n' +
          'DC_STATUS name=DC-CRITIQUE state=OFFLINE\n' +
          'OP type=CHANGE_PASSWORD',
        expected:
          'OP_RESULT type=CHANGE_PASSWORD role=PDC_EMULATOR dc=DC-CRITIQUE statut=BLOQUE\n' +
          'SUMMARY total_ops=1 executees=0 bloquees=1'
      },
      {
        label: 'Opération inter-domaine avec infrastructure master séparé',
        stdin:
          'FSMO role=INFRASTRUCTURE dc=DC-RODC\n' +
          'DC_STATUS name=DC-RODC state=ONLINE\n' +
          'OP type=INTER_DOMAIN_REF',
        expected:
          'OP_RESULT type=INTER_DOMAIN_REF role=INFRASTRUCTURE dc=DC-RODC statut=EXECUTE\n' +
          'SUMMARY total_ops=1 executees=1 bloquees=0'
      }
    ],
    solution: `import sys

lignes = [l.strip() for l in sys.stdin.read().splitlines() if l.strip()]

op_to_role = {
    'UPDATE_SCHEMA': 'SCHEMA_MASTER',
    'ADD_DOMAIN': 'DOMAIN_NAMING',
    'CHANGE_PASSWORD': 'PDC_EMULATOR',
    'CREATE_USER': 'RID_MASTER',
    'INTER_DOMAIN_REF': 'INFRASTRUCTURE'
}

fsmo_roles = {}
dc_status = {}
ops = []

for ligne in lignes:
    parts = ligne.split(' ')
    cmd = parts[0]
    pdict = {}
    for tok in parts[1:]:
        if '=' in tok:
            k, v = tok.split('=', 1)
            pdict[k] = v
            
    if cmd == 'FSMO':
        role = pdict.get('role', '')
        dc = pdict.get('dc', '')
        fsmo_roles[role] = dc
    elif cmd == 'DC_STATUS':
        name = pdict.get('name', '')
        st = pdict.get('state', 'ONLINE')
        dc_status[name] = st
    elif cmd == 'OP':
        op_type = pdict.get('type', '')
        ops.append(op_type)

execs = 0
bloqs = 0

for op in ops:
    role = op_to_role.get(op, 'INCONNU')
    dc = fsmo_roles.get(role, 'NONE')
    state = dc_status.get(dc, 'OFFLINE')
    
    statut = "EXECUTE" if state == "ONLINE" else "BLOQUE"
    if statut == "EXECUTE":
        execs += 1
    else:
        bloqs += 1
        
    print(f"OP_RESULT type={op} role={role} dc={dc} statut={statut}")

print(f"SUMMARY total_ops={len(ops)} executees={execs} bloquees={bloqs}")
`
  },
  {
    id: 'ws3-c2-e3',
    chapter: 2,
    title: 'Parseur de journaux d’audit de sécurité Active Directory (Event IDs 4720, 4726, 4728)',
    level: 'n3',
    language: 'python',
    goal: 'Détecter les ajouts suspects de membres dans les groupes à haut privilège et reconstituer l’état des comptes créés.',
    brief:
      'Dans le journal de sécurité Windows Server, les événements d’audit des comptes et groupes sont cruciaux :\n' +
      '- `EVENT id=4720 user=<U> actor=<A>` : Création d’un compte utilisateur.\n' +
      '- `EVENT id=4726 user=<U> actor=<A>` : Suppression d’un compte utilisateur.\n' +
      '- `EVENT id=4728 user=<U> group=<G> actor=<A>` : Ajout d’un membre dans un groupe.\n' +
      '- `EVENT id=4729 user=<U> group=<G> actor=<A>` : Retrait d’un membre d’un groupe.\n\n' +
      'Groupes d’administration critique surveillés :\n' +
      '`Domain Admins`, `Enterprise Admins`, `Schema Admins`, `Administrators`.\n\n' +
      'Règles d’alerte :\n' +
      '- Tout événement 4728 ciblant un groupe critique déclenche : `ALERTE_PRIVILEGE user=<U> group=<G> actor=<A>`.\n' +
      '- Un événement 4726 sur un utilisateur qui n’a jamais été créé (événement 4720 préalable) dans ce flux déclenche : `ANOMALIE_ORPHELIN user=<U> actor=<A>`.\n\n' +
      'Sortie :\n' +
      '- Lignes d’alertes triées par type d’alerte puis nom d’utilisateur :\n' +
      '  `ALERTE_...` ou `ANOMALIE_...`\n' +
      '- Bilan :\n' +
      '  `SUMMARY total_events=<N> users_crees_actifs=<U> alertes_securite=<A>` (où users_crees_actifs = nb de comptes créés par 4720 et non supprimés par 4726).',
    starter: `import sys

lignes = [l.strip() for l in sys.stdin.read().splitlines() if l.strip()]

# À compléter : analyser les logs d'audit Windows Security
`,
    hints: [
      'Garder un ensemble des utilisateurs créés par Event ID 4720.',
      'Sur 4726, retirer le compte de l’ensemble ou lever une anomalie s’il n’y était pas.',
      'Sur 4728, tester si le groupe fait partie des groupes critiques.'
    ],
    examples: [
      {
        stdin:
          'EVENT id=4720 user=jdoe actor=admin01\n' +
          'EVENT id=4728 user=jdoe group=Domain Admins actor=admin01\n' +
          'EVENT id=4720 user=stewart actor=admin02\n' +
          'EVENT id=4726 user=stewart actor=admin02',
        expected:
          'ALERTE_PRIVILEGE user=jdoe group=Domain Admins actor=admin01\n' +
          'SUMMARY total_events=4 users_crees_actifs=1 alertes_securite=1',
        note: 'jdoe est ajouté au groupe Domain Admins (alerte sécurité). stewart est créé puis supprimé (actif = 0). Il reste 1 compte actif créé (jdoe).'
      }
    ],
    tests: [
      {
        label: 'Suppression d’un utilisateur orphelin sans création préalable',
        stdin:
          'EVENT id=4726 user=fantome actor=hacker\n' +
          'EVENT id=4720 user=alice actor=secadmin',
        expected:
          'ANOMALIE_ORPHELIN user=fantome actor=hacker\n' +
          'SUMMARY total_events=2 users_crees_actifs=1 alertes_securite=1'
      },
      {
        label: 'Ajouts dans groupes non critiques (aucune alerte)',
        stdin:
          'EVENT id=4720 user=bob actor=admin\n' +
          'EVENT id=4728 user=bob group=Compta actor=admin\n' +
          'EVENT id=4728 user=bob group=Marketing actor=admin',
        expected: 'SUMMARY total_events=3 users_crees_actifs=1 alertes_securite=0'
      },
      {
        label: 'Multiples alertes de privilèges dans Enterprise Admins et Schema Admins',
        stdin:
          'EVENT id=4728 user=eva group=Enterprise Admins actor=root\n' +
          'EVENT id=4728 user=david group=Schema Admins actor=root',
        expected:
          'ALERTE_PRIVILEGE user=david group=Schema Admins actor=root\n' +
          'ALERTE_PRIVILEGE user=eva group=Enterprise Admins actor=root\n' +
          'SUMMARY total_events=2 users_crees_actifs=0 alertes_securite=2'
      }
    ],
    solution: `import sys

lignes = [l.strip() for l in sys.stdin.read().splitlines() if l.strip()]

CRITICAL_GROUPS = {'Domain Admins', 'Enterprise Admins', 'Schema Admins', 'Administrators'}

created_users = set()
active_users = set()
alerts = []
total_events = 0

for ligne in lignes:
    if not ligne.startswith('EVENT '):
        continue
    total_events += 1
    
    # Parser tokens en tenant compte des espaces dans les noms de groupes
    raw = ligne[len('EVENT '):]
    params = {}
    
    # Extraire id
    toks = raw.split(' ')
    i = 0
    while i < len(toks):
        tok = toks[i]
        if tok.startswith('id='):
            params['id'] = tok.split('=', 1)[1]
        elif tok.startswith('user='):
            params['user'] = tok.split('=', 1)[1]
        elif tok.startswith('actor='):
            params['actor'] = tok.split('=', 1)[1]
        elif tok.startswith('group='):
            # Le groupe peut avoir des espaces, ex: Domain Admins
            grp_words = [tok.split('=', 1)[1]]
            i += 1
            while i < len(toks) and not toks[i].startswith('actor='):
                grp_words.append(toks[i])
                i += 1
            params['group'] = ' '.join(grp_words)
            continue
        i += 1
        
    eid = params.get('id', '')
    user = params.get('user', '')
    actor = params.get('actor', '')
    group = params.get('group', '')
    
    if eid == '4720':
        created_users.add(user)
        active_users.add(user)
    elif eid == '4726':
        if user in active_users:
            active_users.remove(user)
        else:
            alerts.append(('2_ORPHELIN', user, f"ANOMALIE_ORPHELIN user={user} actor={actor}"))
    elif eid == '4728':
        if group in CRITICAL_GROUPS:
            alerts.append(('1_PRIVILEGE', user, f"ALERTE_PRIVILEGE user={user} group={group} actor={actor}"))

alerts.sort(key=lambda x: (x[0], x[1]))

for _, _, msg in alerts:
    print(msg)

print(f"SUMMARY total_events={total_events} users_crees_actifs={len(active_users)} alertes_securite={len(alerts)}")
`
  }
];

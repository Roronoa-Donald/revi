// server/exercises/b3-windows-server/chapitre3.js
// Exercices du Module 3 : Stratégies de Groupe (GPO) & Modèle LSDOU (idPrefix: ws3)

module.exports = [
  {
    id: 'ws3-c3-e1',
    chapter: 3,
    title: 'Calculateur de précédence de stratégies de groupe (Modèle LSDOU)',
    level: 'n1',
    language: 'python',
    goal: 'Calculer la valeur effective d’un paramètre selon l’ordre strict de traitement LSDOU (Local -> Site -> Domaine -> OU) et les liens de liaison.',
    brief:
      'Le moteur Group Policy applique les stratégies selon la hiérarchie stricte LSDOU :\n' +
      '- `LOCAL` (Priorité niveau 1)\n' +
      '- `SITE` (Priorité niveau 2)\n' +
      '- `DOMAIN` (Priorité niveau 3)\n' +
      '- `OU` (Priorité niveau 4)\n\n' +
      'Règles de précédence :\n' +
      '1. Les niveaux s’appliquent dans l’ordre 1 -> 2 -> 3 -> 4. Un niveau supérieur (ex: OU) écrase toujours les niveaux inférieurs (ex: DOMAIN).\n' +
      '2. Au sein d’un même niveau, les GPOs ont un numéro de liaison `link_order=1, 2, ...` : le link_order 1 est le plus prioritaire (il est traité en dernier dans le niveau et gagne face au link_order 2).\n\n' +
      'Entrée :\n' +
      '`GPO name=<NOM> level=<LOCAL|SITE|DOMAIN|OU> link_order=<N> param=<P> value=<V>`\n\n' +
      'Sortie :\n' +
      '- Pour chaque paramètre unique (trié par nom alphabétique) :\n' +
      '  `EFFECTIVE_SETTING param=<P> value=<V> source_gpo=<NOM> level=<LEVEL>`\n' +
      '- Bilan :\n' +
      '  `SUMMARY params_evalues=<P> gpos_total=<G>`',
    starter: `import sys

lignes = [l.strip() for l in sys.stdin.read().splitlines() if l.strip()]

# À compléter : calculer les valeurs effectives selon le modèle LSDOU
`,
    hints: [
      'Attribuer un poids numérique à chaque niveau (LOCAL:1, SITE:2, DOMAIN:3, OU:4).',
      'Pour le link_order, un ordre plus petit (1) doit avoir une priorité plus élevée que 2 (ex: utiliser -link_order).',
      'Trier par (poids_niveau, -link_order) pour déterminer la GPO gagnante.'
    ],
    examples: [
      {
        stdin:
          'GPO name=DefaultDomainPolicy level=DOMAIN link_order=1 param=MaxPasswordAge value=42\n' +
          'GPO name=LocalSecurity level=LOCAL link_order=1 param=MaxPasswordAge value=90\n' +
          'GPO name=OUPolicy level=OU link_order=1 param=MaxPasswordAge value=30',
        expected:
          'EFFECTIVE_SETTING param=MaxPasswordAge value=30 source_gpo=OUPolicy level=OU\n' +
          'SUMMARY params_evalues=1 gpos_total=3',
        note: 'La GPO liée à l’OU a la plus forte précédence (niveau OU > DOMAIN > LOCAL) : 30 jours s’appliquent.'
      }
    ],
    tests: [
      {
        label: 'Deux GPOs sur le même niveau DOMAIN départagées par link_order',
        stdin:
          'GPO name=GPO_Base level=DOMAIN link_order=2 param=ScreenSaverTimeout value=900\n' +
          'GPO name=GPO_Override level=DOMAIN link_order=1 param=ScreenSaverTimeout value=300',
        expected:
          'EFFECTIVE_SETTING param=ScreenSaverTimeout value=300 source_gpo=GPO_Override level=DOMAIN\n' +
          'SUMMARY params_evalues=1 gpos_total=2'
      },
      {
        label: 'Multiples paramètres distincts sur différents niveaux',
        stdin:
          'GPO name=GPO_Site level=SITE link_order=1 param=ProxyServer value=proxy.site.lan\n' +
          'GPO name=GPO_Domain level=DOMAIN link_order=1 param=Wallpaper value=corp.jpg\n' +
          'GPO name=GPO_OU level=OU link_order=1 param=ProxyServer value=proxy.ou.lan',
        expected:
          'EFFECTIVE_SETTING param=ProxyServer value=proxy.ou.lan source_gpo=GPO_OU level=OU\n' +
          'EFFECTIVE_SETTING param=Wallpaper value=corp.jpg source_gpo=GPO_Domain level=DOMAIN\n' +
          'SUMMARY params_evalues=2 gpos_total=3'
      },
      {
        label: 'Paramètre unique défini uniquement au niveau LOCAL',
        stdin: 'GPO name=LocalMachine level=LOCAL link_order=1 param=AuditLogon value=Success',
        expected:
          'EFFECTIVE_SETTING param=AuditLogon value=Success source_gpo=LocalMachine level=LOCAL\n' +
          'SUMMARY params_evalues=1 gpos_total=1'
      }
    ],
    solution: `import sys

lignes = [l.strip() for l in sys.stdin.read().splitlines() if l.strip()]

level_weights = {'LOCAL': 1, 'SITE': 2, 'DOMAIN': 3, 'OU': 4}

param_candidates = {}
gpo_count = 0

for ligne in lignes:
    if not ligne.startswith('GPO '):
        continue
    gpo_count += 1
    params = {}
    for tok in ligne[len('GPO '):].split(' '):
        if '=' in tok:
            k, v = tok.split('=', 1)
            params[k] = v
            
    name = params.get('name', '')
    lvl = params.get('level', 'LOCAL')
    l_order = int(params.get('link_order', 1))
    p = params.get('param', '')
    val = params.get('value', '')
    
    w_lvl = level_weights.get(lvl, 0)
    score = (w_lvl, -l_order)
    
    if p not in param_candidates or score > param_candidates[p][0]:
        param_candidates[p] = (score, val, name, lvl)

for p in sorted(param_candidates.keys()):
    score, val, name, lvl = param_candidates[p]
    print(f"EFFECTIVE_SETTING param={p} value={val} source_gpo={name} level={lvl}")

print(f"SUMMARY params_evalues={len(param_candidates)} gpos_total={gpo_count}")
`
  },
  {
    id: 'ws3-c3-e2',
    chapter: 3,
    title: 'Moteur d’arbitrage GPO : Enforced (No Override) vs Block Inheritance',
    level: 'n2',
    language: 'python',
    goal: 'Résoudre les conflits d’héritage entre une Unité Organisationnelle avec blocage et des GPOs parentes forcées (Enforced).',
    brief:
      'Dans Active Directory, les règles avancées d’héritage de stratégies modifient le flux LSDOU :\n' +
      '- `OU_SETTING ou=<OU> block_inheritance=<ENABLED|DISABLED>` : si ENABLED, toutes les GPOs des niveaux parents (Site, Domaine) sont bloquées.\n' +
      '- `GPO name=<NOM> level=<DOMAIN|OU> enforced=<ENABLED|DISABLED> param=<P> value=<V>`\n\n' +
      'Règle d’or Microsoft :\n' +
      '1. Si une GPO parente (DOMAIN) a `enforced=ENABLED`, elle traverse TOUS les blocages d’héritage et NE PEUT PAS être écrasée par une GPO de l’OU enfant (sa valeur prévaut sur tout).\n' +
      '2. Si `block_inheritance=ENABLED` sur l’OU, toutes les GPOs DOMAIN avec `enforced=DISABLED` sont purement et simplement IGNORÉES.\n' +
      '3. Si `block_inheritance=DISABLED`, les GPOs DOMAIN (enforced=DISABLED) s’appliquent mais peuvent être écrasées par les GPOs de l’OU.\n\n' +
      'Sortie :\n' +
      '- Pour chaque paramètre (trié par nom alphabétique) :\n' +
      '  `EFFECTIVE_SETTING param=<P> value=<V> source_gpo=<NOM>`\n' +
      '- Bilan :\n' +
      '  `SUMMARY block_applied=<TRUE|FALSE> enforced_count=<E> params_count=<P>`',
    starter: `import sys

lignes = [l.strip() for l in sys.stdin.read().splitlines() if l.strip()]

# À compléter : appliquer les règles de priorité Enforced et Block Inheritance
`,
    hints: [
      'Garder la valeur Enforced en priorité absolue (indétrônable).',
      'Si block_inheritance=ENABLED, éliminer les GPOs DOMAIN non forcées.',
      'Les GPOs de niveau OU s’appliquent ensuite si aucun Enforced ne verrouille le paramètre.'
    ],
    examples: [
      {
        stdin:
          'OU_SETTING ou=OU_Finance block_inheritance=ENABLED\n' +
          'GPO name=GPO_Securite level=DOMAIN enforced=ENABLED param=MinPasswordLength value=14\n' +
          'GPO name=GPO_Domaine level=DOMAIN enforced=DISABLED param=ScreenTimeout value=15\n' +
          'GPO name=GPO_Finance level=OU enforced=DISABLED param=MinPasswordLength value=8\n' +
          'GPO name=GPO_Finance level=OU enforced=DISABLED param=ScreenTimeout value=60',
        expected:
          'EFFECTIVE_SETTING param=MinPasswordLength value=14 source_gpo=GPO_Securite\n' +
          'EFFECTIVE_SETTING param=ScreenTimeout value=60 source_gpo=GPO_Finance\n' +
          'SUMMARY block_applied=TRUE enforced_count=1 params_count=2',
        note: 'MinPasswordLength est Enforced par le Domaine : il bat la tentative de réduction à 8 de l’OU. ScreenTimeout du Domaine est bloqué par l’OU, donc la valeur 60 de l’OU s’applique.'
      }
    ],
    tests: [
      {
        label: 'Blocage actif sans aucune GPO forcée',
        stdin:
          'OU_SETTING ou=OU_Filiale block_inheritance=ENABLED\n' +
          'GPO name=GPO_Domaine level=DOMAIN enforced=DISABLED param=WallPaper value=corporate.png\n' +
          'GPO name=GPO_Filiale level=OU enforced=DISABLED param=WallPaper value=local.png',
        expected:
          'EFFECTIVE_SETTING param=WallPaper value=local.png source_gpo=GPO_Filiale\n' +
          'SUMMARY block_applied=TRUE enforced_count=0 params_count=1'
      },
      {
        label: 'Aucun blocage d’héritage (héritage normal écrasé par l’OU)',
        stdin:
          'OU_SETTING ou=OU_Dev block_inheritance=DISABLED\n' +
          'GPO name=GPO_Global level=DOMAIN enforced=DISABLED param=MaxLogSize value=2048\n' +
          'GPO name=GPO_Local level=OU enforced=DISABLED param=MaxLogSize value=8192',
        expected:
          'EFFECTIVE_SETTING param=MaxLogSize value=8192 source_gpo=GPO_Local\n' +
          'SUMMARY block_applied=FALSE enforced_count=0 params_count=1'
      },
      {
        label: 'GPO Enforced sans aucune concurrence dans l’OU',
        stdin:
          'OU_SETTING ou=OU_Standard block_inheritance=ENABLED\n' +
          'GPO name=GPO_Audit level=DOMAIN enforced=ENABLED param=AuditPrivilege value=Enabled',
        expected:
          'EFFECTIVE_SETTING param=AuditPrivilege value=Enabled source_gpo=GPO_Audit\n' +
          'SUMMARY block_applied=TRUE enforced_count=1 params_count=1'
      }
    ],
    solution: `import sys

lignes = [l.strip() for l in sys.stdin.read().splitlines() if l.strip()]

block_inheritance = False
gpos = []

for ligne in lignes:
    parts = ligne.split(' ')
    cmd = parts[0]
    pdict = {}
    for tok in parts[1:]:
        if '=' in tok:
            k, v = tok.split('=', 1)
            pdict[k] = v
            
    if cmd == 'OU_SETTING':
        block_inheritance = (pdict.get('block_inheritance', 'DISABLED') == 'ENABLED')
    elif cmd == 'GPO':
        name = pdict.get('name', '')
        lvl = pdict.get('level', 'DOMAIN')
        enf = (pdict.get('enforced', 'DISABLED') == 'ENABLED')
        param = pdict.get('param', '')
        val = pdict.get('value', '')
        gpos.append((name, lvl, enf, param, val))

effective = {}
enforced_count = 0

for name, lvl, enf, param, val in gpos:
    if enf:
        enforced_count += 1
        
    # Si le paramètre est déjà verrouillé par une GPO enforced, personne ne peut l'écraser
    if param in effective and effective[param][2]:
        continue
        
    if lvl == 'DOMAIN':
        if enf:
            effective[param] = (val, name, True)
        else:
            if not block_inheritance:
                effective[param] = (val, name, False)
    elif lvl == 'OU':
        # Une GPO de l'OU s'applique si le param n'est pas verrouillé par Enforced
        effective[param] = (val, name, False)

for p in sorted(effective.keys()):
    val, name, _ = effective[p]
    print(f"EFFECTIVE_SETTING param={p} value={val} source_gpo={name}")

block_str = "TRUE" if block_inheritance else "FALSE"
print(f"SUMMARY block_applied={block_str} enforced_count={enforced_count} params_count={len(effective)}")
`
  },
  {
    id: 'ws3-c3-e3',
    chapter: 3,
    title: 'Évaluateur de filtres WMI et filtrage de sécurité (Security Filtering)',
    level: 'n3',
    language: 'python',
    goal: 'Vérifier si une GPO est applicable à un poste client en évaluant l’appartenance aux groupes de sécurité et les critères matériels/OS du filtre WMI.',
    brief:
      'Une stratégie de groupe n’est traitée par un ordinateur client que si elle satisfait deux filtres simultanés :\n' +
      '1. Filtrage de sécurité : l’ordinateur doit appartenir à au moins un des groupes listés dans `security_groups`.\n' +
      '2. Filtre WMI : les spécifications de l’ordinateur doivent vérifier tous les critères techniques :\n' +
      '   - `min_os_build` : `client.os_build >= gpo.min_os_build`\n' +
      '   - `arch` : `gpo.arch == ANY` ou `client.arch == gpo.arch`\n' +
      '   - `min_ram_gb` : `client.ram_gb >= gpo.min_ram_gb`\n\n' +
      'Entrée :\n' +
      '`CLIENT name=<NOM> os_build=<N> arch=<64BIT|32BIT> ram_gb=<N> groups=<G1,G2,...>`\n' +
      '`GPO name=<NOM> security_groups=<G1,G2,...> min_os_build=<N> arch=<64BIT|32BIT|ANY> min_ram_gb=<N>` (1 ou plusieurs)\n\n' +
      'Sortie :\n' +
      '- Pour chaque GPO (triée par nom alphabétique) :\n' +
      '  `GPO_EVAL gpo=<NOM> statut=<APPLIQUE|IGNORE> motif=<OK|REFUS_SECURITE|REFUS_WMI>`\n' +
      '  (Priorité de motif : si la sécurité échoue -> `REFUS_SECURITE` ; si la sécurité passe mais WMI échoue -> `REFUS_WMI` ; si tout passe -> `OK`).\n' +
      '- Bilan :\n' +
      '  `SUMMARY total_gpos=<N> appliquees=<A> ignorees=<I>`',
    starter: `import sys

lignes = [l.strip() for l in sys.stdin.read().splitlines() if l.strip()]

# À compléter : évaluer le filtrage de sécurité et les requêtes WMI
`,
    hints: [
      'Comparer les ensembles de groupes avec set.intersection().',
      'Vérifier os_build, arch et ram_gb si la sécurité est validée.',
      'Classer le motif en REFUS_SECURITE, REFUS_WMI ou OK.'
    ],
    examples: [
      {
        stdin:
          'CLIENT name=PC-DEV-01 os_build=19045 arch=64BIT ram_gb=16 groups=Domain_Computers,DevWorkstations\n' +
          'GPO name=GPO_BitLocker security_groups=Domain_Computers min_os_build=19041 arch=ANY min_ram_gb=4\n' +
          'GPO name=GPO_CADSoftware security_groups=Engineers min_os_build=19041 arch=64BIT min_ram_gb=32',
        expected:
          'GPO_EVAL gpo=GPO_BitLocker statut=APPLIQUE motif=OK\n' +
          'GPO_EVAL gpo=GPO_CADSoftware statut=IGNORE motif=REFUS_SECURITE\n' +
          'SUMMARY total_gpos=2 appliquees=1 ignorees=1',
        note: 'GPO_BitLocker satisfait la sécurité et WMI (16 >= 4, build OK). GPO_CADSoftware est rejetée pour sécurité car le client n’est pas dans Engineers.'
      }
    ],
    tests: [
      {
        label: 'Refus WMI sur la quantité de RAM disponible',
        stdin:
          'CLIENT name=PC-LITE os_build=22000 arch=64BIT ram_gb=8 groups=Domain_Computers\n' +
          'GPO name=GPO_HyperV security_groups=Domain_Computers min_os_build=20000 arch=64BIT min_ram_gb=16',
        expected:
          'GPO_EVAL gpo=GPO_HyperV statut=IGNORE motif=REFUS_WMI\n' +
          'SUMMARY total_gpos=1 appliquees=0 ignorees=1'
      },
      {
        label: 'Refus WMI sur l’architecture 32-bit',
        stdin:
          'CLIENT name=PC-OLD os_build=17763 arch=32BIT ram_gb=4 groups=Domain_Computers\n' +
          'GPO name=GPO_x64Only security_groups=Domain_Computers min_os_build=10000 arch=64BIT min_ram_gb=2',
        expected:
          'GPO_EVAL gpo=GPO_x64Only statut=IGNORE motif=REFUS_WMI\n' +
          'SUMMARY total_gpos=1 appliquees=0 ignorees=1'
      },
      {
        label: 'Toutes les GPOs appliquées avec succès',
        stdin:
          'CLIENT name=SRV-APP os_build=20348 arch=64BIT ram_gb=64 groups=Domain_Controllers,Servers\n' +
          'GPO name=GPO_Hardening security_groups=Servers min_os_build=19000 arch=64BIT min_ram_gb=16\n' +
          'GPO name=GPO_NTP security_groups=Servers min_os_build=10000 arch=ANY min_ram_gb=1',
        expected:
          'GPO_EVAL gpo=GPO_Hardening statut=APPLIQUE motif=OK\n' +
          'GPO_EVAL gpo=GPO_NTP statut=APPLIQUE motif=OK\n' +
          'SUMMARY total_gpos=2 appliquees=2 ignorees=0'
      }
    ],
    solution: `import sys

lignes = [l.strip() for l in sys.stdin.read().splitlines() if l.strip()]

client = {}
gpos = []

for ligne in lignes:
    if ligne.startswith('CLIENT '):
        raw = ligne[len('CLIENT '):]
        # Parser en gérant les groupes séparés par virgules
        parts = raw.split(' ')
        i = 0
        while i < len(parts):
            tok = parts[i]
            if tok.startswith('name='):
                client['name'] = tok.split('=', 1)[1]
            elif tok.startswith('os_build='):
                client['os_build'] = int(tok.split('=', 1)[1])
            elif tok.startswith('arch='):
                client['arch'] = tok.split('=', 1)[1]
            elif tok.startswith('ram_gb='):
                client['ram_gb'] = int(tok.split('=', 1)[1])
            elif tok.startswith('groups='):
                grp_str = ' '.join(parts[i:])[len('groups='):]
                client['groups'] = {g.strip() for g in grp_str.split(',') if g.strip()}
                break
            i += 1
    elif ligne.startswith('GPO '):
        params = {}
        for tok in ligne[len('GPO '):].split(' '):
            if '=' in tok:
                k, v = tok.split('=', 1)
                params[k] = v
        gpos.append(params)

c_os = client.get('os_build', 0)
c_arch = client.get('arch', '64BIT')
c_ram = client.get('ram_gb', 0)
c_groups = client.get('groups', set())

gpos.sort(key=lambda x: x.get('name', ''))

applied = 0
ignored = 0

for g in gpos:
    name = g.get('name', '')
    g_sec = {grp.strip() for grp in g.get('security_groups', '').split(',') if grp.strip()}
    g_os = int(g.get('min_os_build', 0))
    g_arch = g.get('arch', 'ANY')
    g_ram = int(g.get('min_ram_gb', 0))
    
    # 1. Vérif sécurité
    sec_ok = bool(c_groups.intersection(g_sec))
    if not sec_ok:
        print(f"GPO_EVAL gpo={name} statut=IGNORE motif=REFUS_SECURITE")
        ignored += 1
        continue
        
    # 2. Vérif WMI
    wmi_os_ok = (c_os >= g_os)
    wmi_arch_ok = (g_arch == 'ANY' or c_arch == g_arch)
    wmi_ram_ok = (c_ram >= g_ram)
    
    if wmi_os_ok and wmi_arch_ok and wmi_ram_ok:
        print(f"GPO_EVAL gpo={name} statut=APPLIQUE motif=OK")
        applied += 1
    else:
        print(f"GPO_EVAL gpo={name} statut=IGNORE motif=REFUS_WMI")
        ignored += 1

print(f"SUMMARY total_gpos={len(gpos)} appliquees={applied} ignorees={ignored}")
`
  }
];

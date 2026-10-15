// server/exercises/b3-windows-server/chapitre4.js
// Exercices du Module 4 : Permissions NTFS vs Partage SMB & Espaces de Stockage (idPrefix: ws3)

module.exports = [
  {
    id: 'ws3-c4-e1',
    chapter: 4,
    title: 'Calculateur de permissions effectives (Partage SMB vs NTFS)',
    level: 'n1',
    language: 'python',
    goal: 'Calculer la permission réseau résultante selon la règle universelle Windows du plus restrictif entre le partage et le système de fichiers.',
    brief:
      'Dans un accès distant à travers le protocole SMB, Windows Server applique l’intersection la plus restrictive entre les permissions de partage et les permissions NTFS :\n' +
      '- Permissions Partage (Share) : `NONE` < `READ` < `CHANGE` < `FULL_CONTROL`\n' +
      '- Permissions NTFS : `NONE` < `READ` < `WRITE` < `MODIFY` < `FULL_CONTROL`\n\n' +
      'Règles d’évaluation des droits effectifs distants :\n' +
      '- `FULL_CONTROL` effectif : requiert `share == FULL_CONTROL` ET `ntfs == FULL_CONTROL`.\n' +
      '- `MODIFY` effectif : requiert `share >= CHANGE` ET `ntfs >= MODIFY`.\n' +
      '- `WRITE` effectif : requiert `share >= CHANGE` ET `ntfs >= WRITE`.\n' +
      '- `READ` effectif : requiert `share >= READ` ET `ntfs >= READ`.\n' +
      '- Sinon : `NONE` (aucun accès).\n\n' +
      'Entrée :\n' +
      '`ACCESS user=<NOM> share=<NONE|READ|CHANGE|FULL_CONTROL> ntfs=<NONE|READ|WRITE|MODIFY|FULL_CONTROL>`\n\n' +
      'Sortie :\n' +
      '- Pour chaque utilisateur :\n' +
      '  `EFFECTIVE_ACCESS user=<NOM> share=<S> ntfs=<N> effective=<EFF>`\n' +
      '- Bilan :\n' +
      '  `SUMMARY total_users=<U> acces_ecriture=<W> lecture_seule=<R> aucun_acces=<Z>`\n' +
      '  (acces_ecriture = WRITE, MODIFY, FULL_CONTROL ; lecture_seule = READ ; aucun_acces = NONE).',
    starter: `import sys

lignes = [l.strip() for l in sys.stdin.read().splitlines() if l.strip()]

# À compléter : appliquer la règle du plus restrictif
`,
    hints: [
      'Créer des échelles numériques ou fonctions booléennes pour chaque droit.',
      'Tester du plus haut au plus bas (FULL_CONTROL -> MODIFY -> WRITE -> READ -> NONE).',
      'Comptabiliser les types d’accès pour le résumé final.'
    ],
    examples: [
      {
        stdin:
          'ACCESS user=Alice share=READ ntfs=FULL_CONTROL\n' +
          'ACCESS user=Bob share=FULL_CONTROL ntfs=MODIFY\n' +
          'ACCESS user=Charlie share=CHANGE ntfs=WRITE',
        expected:
          'EFFECTIVE_ACCESS user=Alice share=READ ntfs=FULL_CONTROL effective=READ\n' +
          'EFFECTIVE_ACCESS user=Bob share=FULL_CONTROL ntfs=MODIFY effective=MODIFY\n' +
          'EFFECTIVE_ACCESS user=Charlie share=CHANGE ntfs=WRITE effective=WRITE\n' +
          'SUMMARY total_users=3 acces_ecriture=2 lecture_seule=1 aucun_acces=0',
        note: 'Alice est bloquée en READ car son partage limite les droits malgré son NTFS Full Control. Bob obtient MODIFY (le partage autorise, NTFS bride).'
      }
    ],
    tests: [
      {
        label: 'Accès totalement refusé par le partage ou NTFS',
        stdin:
          'ACCESS user=David share=NONE ntfs=FULL_CONTROL\n' +
          'ACCESS user=Emma share=FULL_CONTROL ntfs=NONE',
        expected:
          'EFFECTIVE_ACCESS user=David share=NONE ntfs=FULL_CONTROL effective=NONE\n' +
          'EFFECTIVE_ACCESS user=Emma share=FULL_CONTROL ntfs=NONE effective=NONE\n' +
          'SUMMARY total_users=2 acces_ecriture=0 lecture_seule=0 aucun_acces=2'
      },
      {
        label: 'Accès maximal Full Control des deux côtés',
        stdin: 'ACCESS user=Admin share=FULL_CONTROL ntfs=FULL_CONTROL',
        expected:
          'EFFECTIVE_ACCESS user=Admin share=FULL_CONTROL ntfs=FULL_CONTROL effective=FULL_CONTROL\n' +
          'SUMMARY total_users=1 acces_ecriture=1 lecture_seule=0 aucun_acces=0'
      },
      {
        label: 'Profils mixtes avec lecture seule et écriture',
        stdin:
          'ACCESS user=User1 share=READ ntfs=READ\n' +
          'ACCESS user=User2 share=CHANGE ntfs=READ\n' +
          'ACCESS user=User3 share=CHANGE ntfs=MODIFY',
        expected:
          'EFFECTIVE_ACCESS user=User1 share=READ ntfs=READ effective=READ\n' +
          'EFFECTIVE_ACCESS user=User2 share=CHANGE ntfs=READ effective=READ\n' +
          'EFFECTIVE_ACCESS user=User3 share=CHANGE ntfs=MODIFY effective=MODIFY\n' +
          'SUMMARY total_users=3 acces_ecriture=1 lecture_seule=2 aucun_acces=0'
      }
    ],
    solution: `import sys

lignes = [l.strip() for l in sys.stdin.read().splitlines() if l.strip()]

share_weights = {'NONE': 0, 'READ': 1, 'CHANGE': 2, 'FULL_CONTROL': 3}
ntfs_weights = {'NONE': 0, 'READ': 1, 'WRITE': 2, 'MODIFY': 3, 'FULL_CONTROL': 4}

c_write = 0
c_read = 0
c_none = 0
count = 0

for ligne in lignes:
    if not ligne.startswith('ACCESS '):
        continue
    count += 1
    params = {}
    for tok in ligne[len('ACCESS '):].split(' '):
        if '=' in tok:
            k, v = tok.split('=', 1)
            params[k] = v
            
    user = params.get('user', '')
    s_str = params.get('share', 'NONE')
    n_str = params.get('ntfs', 'NONE')
    
    s_val = share_weights.get(s_str, 0)
    n_val = ntfs_weights.get(n_str, 0)
    
    # Évaluation effective
    if s_val >= 3 and n_val >= 4:
        eff = 'FULL_CONTROL'
    elif s_val >= 2 and n_val >= 3:
        eff = 'MODIFY'
    elif s_val >= 2 and n_val >= 2:
        eff = 'WRITE'
    elif s_val >= 1 and n_val >= 1:
        eff = 'READ'
    else:
        eff = 'NONE'
        
    print(f"EFFECTIVE_ACCESS user={user} share={s_str} ntfs={n_str} effective={eff}")
    
    if eff in ('WRITE', 'MODIFY', 'FULL_CONTROL'):
        c_write += 1
    elif eff == 'READ':
        c_read += 1
    else:
        c_none += 1

print(f"SUMMARY total_users={count} acces_ecriture={c_write} lecture_seule={c_read} aucun_acces={c_none}")
`
  },
  {
    id: 'ws3-c4-e2',
    chapter: 4,
    title: 'Moteur de résolution des conflits NTFS : Héritage, Allow et Deny explicite',
    level: 'n2',
    language: 'python',
    goal: 'Résoudre les permissions NTFS cumulatives pour chaque opération selon la hiérarchie : Explicit Deny > Explicit Allow > Inherited Deny > Inherited Allow.',
    brief:
      'Dans le modèle de contrôle d’accès Windows NTFS (DACL), la priorité d’arbitrage pour chaque droit (`READ`, `WRITE`, `DELETE`) est ordonnée ainsi :\n' +
      '1. `EXPLICIT_DENY` (Priorité absolue 4) -> Accordé : NON\n' +
      '2. `EXPLICIT_ALLOW` (Priorité 3) -> Accordé : OUI (surpasse les refus hérités)\n' +
      '3. `INHERITED_DENY` (Priorité 2) -> Accordé : NON\n' +
      '4. `INHERITED_ALLOW` (Priorité 1) -> Accordé : OUI\n' +
      '5. Défaut (`IMPLICIT_DENY`, Priorité 0) -> Accordé : NON\n\n' +
      'Entrée :\n' +
      '`USER name=<NOM> groups=<G1,G2,...>`\n' +
      '`ACE target=<NOM_OU_GROUPE> type=<EXPLICIT|INHERITED> perm=<READ|WRITE|DELETE> action=<ALLOW|DENY>` (1 ou plusieurs)\n\n' +
      'Sortie :\n' +
      '- Pour les trois droits `READ`, `WRITE`, `DELETE` (dans cet ordre) :\n' +
      '  `PERM_RESULT perm=<P> status=<ACCORDE|REFUSE> decision_level=<NIVEAU>`\n' +
      '- Bilan :\n' +
      '  `SUMMARY user=<NOM> accordees=<A> refusees=<R>`',
    starter: `import sys

lignes = [l.strip() for l in sys.stdin.read().splitlines() if l.strip()]

# À compléter : arbitrer les permissions selon l'échelle officielle NTFS
`,
    hints: [
      'Filtrer les ACEs qui ciblent l’utilisateur ou l’un de ses groupes.',
      'Pour chaque droit, chercher la règle ayant le niveau de priorité le plus élevé.',
      'Déduire ACCORDE si action==ALLOW, REFUSE sinon.'
    ],
    examples: [
      {
        stdin:
          'USER name=Alice groups=GG_Compta,GG_Employes\n' +
          'ACE target=GG_Employes type=INHERITED perm=DELETE action=DENY\n' +
          'ACE target=Alice type=EXPLICIT perm=DELETE action=ALLOW\n' +
          'ACE target=GG_Compta type=INHERITED perm=READ action=ALLOW',
        expected:
          'PERM_RESULT perm=READ status=ACCORDE decision_level=INHERITED_ALLOW\n' +
          'PERM_RESULT perm=WRITE status=REFUSE decision_level=IMPLICIT_DENY\n' +
          'PERM_RESULT perm=DELETE status=ACCORDE decision_level=EXPLICIT_ALLOW\n' +
          'SUMMARY user=Alice accordees=2 refusees=1',
        note: 'DELETE : Explicit Allow d’Alice bat le Inherited Deny du groupe GG_Employes. READ : accordé par héritage. WRITE : refus implicite.'
      }
    ],
    tests: [
      {
        label: 'Explicit Deny direct verrouillant un droit',
        stdin:
          'USER name=Bob groups=GG_Devs\n' +
          'ACE target=GG_Devs type=EXPLICIT perm=READ action=ALLOW\n' +
          'ACE target=Bob type=EXPLICIT perm=READ action=DENY',
        expected:
          'PERM_RESULT perm=READ status=REFUSE decision_level=EXPLICIT_DENY\n' +
          'PERM_RESULT perm=WRITE status=REFUSE decision_level=IMPLICIT_DENY\n' +
          'PERM_RESULT perm=DELETE status=REFUSE decision_level=IMPLICIT_DENY\n' +
          'SUMMARY user=Bob accordees=0 refusees=3'
      },
      {
        label: 'Toutes les permissions accordées par héritage',
        stdin:
          'USER name=Claire groups=GG_Admins\n' +
          'ACE target=GG_Admins type=INHERITED perm=READ action=ALLOW\n' +
          'ACE target=GG_Admins type=INHERITED perm=WRITE action=ALLOW\n' +
          'ACE target=GG_Admins type=INHERITED perm=DELETE action=ALLOW',
        expected:
          'PERM_RESULT perm=READ status=ACCORDE decision_level=INHERITED_ALLOW\n' +
          'PERM_RESULT perm=WRITE status=ACCORDE decision_level=INHERITED_ALLOW\n' +
          'PERM_RESULT perm=DELETE status=ACCORDE decision_level=INHERITED_ALLOW\n' +
          'SUMMARY user=Claire accordees=3 refusees=0'
      },
      {
        label: 'Aucune ACE applicable (tout en refus implicite)',
        stdin: 'USER name=Inconnu groups=GG_Visiteurs',
        expected:
          'PERM_RESULT perm=READ status=REFUSE decision_level=IMPLICIT_DENY\n' +
          'PERM_RESULT perm=WRITE status=REFUSE decision_level=IMPLICIT_DENY\n' +
          'PERM_RESULT perm=DELETE status=REFUSE decision_level=IMPLICIT_DENY\n' +
          'SUMMARY user=Inconnu accordees=0 refusees=3'
      }
    ],
    solution: `import sys

lignes = [l.strip() for l in sys.stdin.read().splitlines() if l.strip()]

user_name = ""
user_identities = set()
aces = []

for ligne in lignes:
    if ligne.startswith('USER '):
        params = {}
        for tok in ligne[len('USER '):].split(' '):
            if '=' in tok:
                k, v = tok.split('=', 1)
                params[k] = v
        user_name = params.get('name', '')
        user_identities.add(user_name)
        for g in params.get('groups', '').split(','):
            if g.strip():
                user_identities.add(g.strip())
    elif ligne.startswith('ACE '):
        params = {}
        for tok in ligne[len('ACE '):].split(' '):
            if '=' in tok:
                k, v = tok.split('=', 1)
                params[k] = v
        aces.append(params)

priority_map = {
    ('EXPLICIT', 'DENY'): (4, 'EXPLICIT_DENY', False),
    ('EXPLICIT', 'ALLOW'): (3, 'EXPLICIT_ALLOW', True),
    ('INHERITED', 'DENY'): (2, 'INHERITED_DENY', False),
    ('INHERITED', 'ALLOW'): (1, 'INHERITED_ALLOW', True)
}

c_acc = 0
c_ref = 0

for perm in ['READ', 'WRITE', 'DELETE']:
    best_priority = -1
    best_level = 'IMPLICIT_DENY'
    best_allowed = False
    
    for ace in aces:
        target = ace.get('target', '')
        if target not in user_identities:
            continue
        p = ace.get('perm', '')
        if p != perm:
            continue
            
        atype = ace.get('type', 'INHERITED')
        act = ace.get('action', 'DENY')
        
        score, lvl, allowed = priority_map.get((atype, act), (0, 'IMPLICIT_DENY', False))
        if score > best_priority:
            best_priority = score
            best_level = lvl
            best_allowed = allowed
            
    status = "ACCORDE" if best_allowed else "REFUSE"
    if best_allowed:
        c_acc += 1
    else:
        c_ref += 1
        
    print(f"PERM_RESULT perm={perm} status={status} decision_level={best_level}")

print(f"SUMMARY user={user_name} accordees={c_acc} refusees={c_ref}")
`
  },
  {
    id: 'ws3-c4-e3',
    chapter: 4,
    title: 'Simulateur d’espaces de stockage et résilience Storage Spaces',
    level: 'n3',
    language: 'python',
    goal: 'Calculer la capacité utile, le taux d’efficacité et la tolérance aux pannes d’un pool de stockage Windows Server.',
    brief:
      'La fonctionnalité Storage Spaces agrège des disques durs physiques en pools pour créer des espaces virtuels résilients :\n' +
      '- `SIMPLE` (agrégation par bandes sans tolérance de panne) :\n' +
      '  - Min disques : 1 | Pannes tolérées : 0 | Capacité utile = Somme brute | Efficacité = 100.0%\n' +
      '- `TWO_WAY_MIRROR` (miroir double bidirectionnel) :\n' +
      '  - Min disques : 2 | Pannes tolérées : 1 | Capacité utile = round(Somme brute / 2, 1) | Efficacité = 50.0%\n' +
      '- `THREE_WAY_MIRROR` (miroir triple pour haute résilience) :\n' +
      '  - Min disques : 5 | Pannes tolérées : 2 | Capacité utile = round(Somme brute / 3, 1) | Efficacité = 33.3%\n' +
      '- `PARITY` (parité distribuée style RAID-5) :\n' +
      '  - Min disques : 3 | Pannes tolérées : 1 | Capacité utile = round(Somme brute * (N - 1) / N, 1) | Efficacité = round(((N - 1) / N) * 100, 1)%\n\n' +
      'Entrée :\n' +
      '`POOL nom=<NOM> resiliency=<SIMPLE|TWO_WAY_MIRROR|THREE_WAY_MIRROR|PARITY>`\n' +
      '`DISK id=<ID> size_gb=<N>` (1 ou plusieurs disques)\n\n' +
      'Sortie :\n' +
      '- Si le nombre de disques est suffisant pour le mode choisi :\n' +
      '  `POOL_RESULT nom=<P> disks=<N> raw_gb=<RAW> usable_gb=<USABLE> efficiency=<EFF>% fault_tolerance=<FT>_disks`\n' +
      '  `SUMMARY status=VALIDE mode=<MODE>`\n' +
      '- Si disques insuffisants :\n' +
      '  `POOL_ERROR nom=<P> disques_fournis=<N> disques_requis=<MIN>`\n' +
      '  `SUMMARY status=ERREUR_CAPACITE_MIN mode=<MODE>`',
    starter: `import sys

lignes = [l.strip() for l in sys.stdin.read().splitlines() if l.strip()]

# À compléter : calculer la capacité utile et vérifier les seuils de résilience
`,
    hints: [
      'Vérifier N >= min_disks selon le mode de résilience.',
      'Calculer la somme totale des capacités brutes.',
      'Appliquer les formules de capacité utile et d’efficacité.'
    ],
    examples: [
      {
        stdin:
          'POOL nom=Pool-Compta resiliency=TWO_WAY_MIRROR\n' +
          'DISK id=D1 size_gb=1000\n' +
          'DISK id=D2 size_gb=1000',
        expected:
          'POOL_RESULT nom=Pool-Compta disks=2 raw_gb=2000 usable_gb=1000.0 efficiency=50.0% fault_tolerance=1_disks\n' +
          'SUMMARY status=VALIDE mode=TWO_WAY_MIRROR',
        note: '2 disques de 1 To = 2000 Go bruts. Miroir double = 1000.0 Go utiles, 1 panne tolérée, efficacité 50.0%.'
      }
    ],
    tests: [
      {
        label: 'Mode Parité avec 4 disques de 500 Go',
        stdin:
          'POOL nom=Pool-Archives resiliency=PARITY\n' +
          'DISK id=D1 size_gb=500\n' +
          'DISK id=D2 size_gb=500\n' +
          'DISK id=D3 size_gb=500\n' +
          'DISK id=D4 size_gb=500',
        expected:
          'POOL_RESULT nom=Pool-Archives disks=4 raw_gb=2000 usable_gb=1500.0 efficiency=75.0% fault_tolerance=1_disks\n' +
          'SUMMARY status=VALIDE mode=PARITY'
      },
      {
        label: 'Erreur : disques insuffisants pour Three-Way Mirror',
        stdin:
          'POOL nom=Pool-Critique resiliency=THREE_WAY_MIRROR\n' +
          'DISK id=D1 size_gb=2000\n' +
          'DISK id=D2 size_gb=2000\n' +
          'DISK id=D3 size_gb=2000',
        expected:
          'POOL_ERROR nom=Pool-Critique disques_fournis=3 disques_requis=5\n' +
          'SUMMARY status=ERREUR_CAPACITE_MIN mode=THREE_WAY_MIRROR'
      },
      {
        label: 'Mode Simple mono-disque',
        stdin:
          'POOL nom=Pool-Temp resiliency=SIMPLE\n' +
          'DISK id=D1 size_gb=512',
        expected:
          'POOL_RESULT nom=Pool-Temp disks=1 raw_gb=512 usable_gb=512.0 efficiency=100.0% fault_tolerance=0_disks\n' +
          'SUMMARY status=VALIDE mode=SIMPLE'
      }
    ],
    solution: `import sys

lignes = [l.strip() for l in sys.stdin.read().splitlines() if l.strip()]

pool_name = ""
resiliency = "SIMPLE"
disks = []

for ligne in lignes:
    parts = ligne.split(' ')
    cmd = parts[0]
    pdict = {}
    for tok in parts[1:]:
        if '=' in tok:
            k, v = tok.split('=', 1)
            pdict[k] = v
            
    if cmd == 'POOL':
        pool_name = pdict.get('nom', 'Pool')
        resiliency = pdict.get('resiliency', 'SIMPLE')
    elif cmd == 'DISK':
        sz = int(pdict.get('size_gb', 0))
        disks.append(sz)

n_disks = len(disks)
raw_gb = sum(disks)

min_disks_map = {
    'SIMPLE': (1, 0),
    'TWO_WAY_MIRROR': (2, 1),
    'THREE_WAY_MIRROR': (5, 2),
    'PARITY': (3, 1)
}

min_d, ft = min_disks_map.get(resiliency, (1, 0))

if n_disks < min_d:
    print(f"POOL_ERROR nom={pool_name} disques_fournis={n_disks} disques_requis={min_d}")
    print(f"SUMMARY status=ERREUR_CAPACITE_MIN mode={resiliency}")
else:
    if resiliency == 'SIMPLE':
        usable = float(raw_gb)
        eff = 100.0
    elif resiliency == 'TWO_WAY_MIRROR':
        usable = round(raw_gb / 2.0, 1)
        eff = 50.0
    elif resiliency == 'THREE_WAY_MIRROR':
        usable = round(raw_gb / 3.0, 1)
        eff = 33.3
    elif resiliency == 'PARITY':
        usable = round(raw_gb * (n_disks - 1) / float(n_disks), 1)
        eff = round(((n_disks - 1) / float(n_disks)) * 100.0, 1)
        
    print(f"POOL_RESULT nom={pool_name} disks={n_disks} raw_gb={raw_gb} usable_gb={usable:.1f} efficiency={eff:.1f}% fault_tolerance={ft}_disks")
    print(f"SUMMARY status=VALIDE mode={resiliency}")
`
  }
];

/**
 * Exercices Chapitre 4 — Réseau LAN Avancé B3.
 * Routage Dynamique de Campus : OSPFv2 Multi-Aires (LSA Types, Zones Stub/NSSA).
 */
'use strict';

module.exports = [
  {
    id: 'lan3-c4-e1',
    chapter: 4,
    title: 'Calculateur de métrique de coût OSPF et sélection du meilleur chemin',
    level: 'n1',
    language: 'python',
    goal: 'Calculer le coût OSPF cumulé de chemins concurrents à partir de la bande passante de référence.',
    brief: `<p>Le protocole <strong>OSPFv2 (Open Shortest Path First - RFC 2328)</strong> calcule le coût d'une interface selon la formule standard :<br>
<code>coût = max(1, ref_bandwidth // interface_bandwidth)</code> (en Mbps).<br>
Par défaut, la bande passante de référence historique est 100 Mbps (ce qui donne un coût de 1 pour FastEthernet, Gigabit et 10G sans différenciation). En réseau de campus moderne, on configure <code>auto-cost reference-bandwidth</code> à 10000 (10 Gbps) ou 100000 (100 Gbps).<br><br>
Le coût total d'un chemin vers une destination est la somme des coûts de chaque tronçon (interface de sortie le long du chemin). Le chemin au coût total le plus bas est injecté dans la table de routage (Best Path).<br><br>
Le script lit sur l'entrée standard :<br>
- La bande passante de référence :<br>
  <code>OSPF_CONFIG ref_bw=&lt;int_mbps&gt;</code><br>
- Les chemins concurrents vers un réseau cible :<br>
  <code>PATH id=&lt;nom&gt; hops=&lt;bw1,bw2,...&gt;</code> (vitesses des interfaces en Mbps).<br><br>
Pour chaque chemin (triés par id alphabétique), afficher :<br>
<code>OSPF_PATH id={id} total_cost={total_cost} hops_count={len(hops)} status={BEST_PATH|BACKUP_PATH}</code><br>
Et la ligne finale élisant le meilleur chemin :<br>
<code>OSPF_ROUTE best_path={winner_id} metric={winner_cost}</code></p>`,
    starter: `import sys

lignes = [l.strip() for l in sys.stdin.read().splitlines() if l.strip()]

# À compléter : calculer le coût de chaque tronçon OSPF et désigner la meilleure route
`,
    hints: [
      'Calculer pour chaque saut : max(1, ref_bw // bw).',
      'Sommer les coûts pour obtenir total_cost.',
      'Le chemin minimal (départage par id alphabétique) est BEST_PATH.'
    ],
    examples: [
      {
        stdin: 'OSPF_CONFIG ref_bw=10000\nPATH id=PATH_A hops=1000,1000,1000\nPATH id=PATH_B hops=10000,100\nPATH id=PATH_C hops=10000,10000',
        expected: 'OSPF_PATH id=PATH_A total_cost=30 hops_count=3 status=BACKUP_PATH\nOSPF_PATH id=PATH_B total_cost=101 hops_count=2 status=BACKUP_PATH\nOSPF_PATH id=PATH_C total_cost=2 hops_count=2 status=BEST_PATH\nOSPF_ROUTE best_path=PATH_C metric=2',
        note: 'PATH_C traverse deux liens 10G (coût 1 + 1 = 2) et bat PATH_A (coût 10+10+10 = 30).'
      }
    ],
    tests: [
      {
        label: 'Bande passante de référence par défaut 100 Mbps sans différenciation au-delà',
        stdin: 'OSPF_CONFIG ref_bw=100\nPATH id=P1 hops=100,100\nPATH id=P2 hops=1000,1000',
        expected: 'OSPF_PATH id=P1 total_cost=2 hops_count=2 status=BEST_PATH\nOSPF_PATH id=P2 total_cost=2 hops_count=2 status=BACKUP_PATH\nOSPF_ROUTE best_path=P1 metric=2'
      },
      {
        label: 'Chemin à saut unique très rapide surpassant un chemin multi-sauts',
        stdin: 'OSPF_CONFIG ref_bw=100000\nPATH id=FIBRE hops=100000\nPATH id=CUIVRE hops=10000,10000',
        expected: 'OSPF_PATH id=CUIVRE total_cost=20 hops_count=2 status=BACKUP_PATH\nOSPF_PATH id=FIBRE total_cost=1 hops_count=1 status=BEST_PATH\nOSPF_ROUTE best_path=FIBRE metric=1'
      },
      {
        label: 'Liaisons lentes pénalisées (T1/E1)',
        stdin: 'OSPF_CONFIG ref_bw=1000\nPATH id=DIRECT_SLOW hops=2\nPATH id=DETOUR_FAST hops=100,100',
        expected: 'OSPF_PATH id=DETOUR_FAST total_cost=20 hops_count=2 status=BEST_PATH\nOSPF_PATH id=DIRECT_SLOW total_cost=500 hops_count=1 status=BACKUP_PATH\nOSPF_ROUTE best_path=DETOUR_FAST metric=20'
      }
    ],
    solution: `import sys

lignes = [l.strip() for l in sys.stdin.read().splitlines() if l.strip()]

ref_bw = 100
paths = []

for ligne in lignes:
    if ligne.startswith("OSPF_CONFIG "):
        parts = ligne.split()
        for p in parts[1:]:
            if p.startswith("ref_bw="):
                ref_bw = int(p.split("=", 1)[1])

    elif ligne.startswith("PATH "):
        parts = ligne.split()
        pid = None
        hops = []
        for p in parts[1:]:
            if p.startswith("id="):
                pid = p.split("=", 1)[1]
            elif p.startswith("hops="):
                hops = [int(x.strip()) for x in p.split("=", 1)[1].split(",") if x.strip()]

        total_cost = sum(max(1, ref_bw // bw) for bw in hops)
        paths.append({
            "id": pid,
            "cost": total_cost,
            "hops_count": len(hops)
        })

best = sorted(paths, key=lambda x: (x["cost"], x["id"]))[0]

for p in sorted(paths, key=lambda x: x["id"]):
    st = "BEST_PATH" if p["id"] == best["id"] else "BACKUP_PATH"
    print(f"OSPF_PATH id={p['id']} total_cost={p['cost']} hops_count={p['hops_count']} status={st}")

print(f"OSPF_ROUTE best_path={best['id']} metric={best['cost']}")
`
  },
  {
    id: 'lan3-c4-e2',
    chapter: 4,
    title: 'Parseur et classificateur de paquets LSA OSPF (Types 1 à 7)',
    level: 'n2',
    language: 'python',
    goal: 'Classer les annonces d\'état de liens (LSA) selon leur type, leur portée de diffusion et leur rôle émetteur.',
    brief: `<p>Dans une architecture OSPF multi-aires, différents types de <strong>Link-State Advertisements (LSA)</strong> circulent pour construire la base de données topologique (LSDB) :<br><br>
Classification officielle des LSAs :<br>
- <strong>Type 1 (Router LSA) :</strong> Émis par <em>chaque routeur interne</em>, portée <code>INTRA_AREA</code>.<br>
- <strong>Type 2 (Network LSA) :</strong> Émis par le <em>Designated Router (DR)</em> sur réseau multi-accès broadcast, portée <code>INTRA_AREA</code>.<br>
- <strong>Type 3 (Summary LSA) :</strong> Émis par un <em>ABR (Area Border Router)</em> pour annoncer des réseaux d'autres aires, portée <code>INTER_AREA</code>.<br>
- <strong>Type 4 (ASBR Summary LSA) :</strong> Émis par un <em>ABR</em> pour indiquer la route vers un ASBR, portée <code>INTER_AREA</code>.<br>
- <strong>Type 5 (AS External LSA) :</strong> Émis par un <em>ASBR (Autonomous System Boundary Router)</em> pour injecter des routes redistribuées (BGP, RIP, statique), portée <code>EXTERNAL_AS</code>.<br>
- <strong>Type 7 (NSSA External LSA) :</strong> Émis par un <em>ASBR</em> dans une aire NSSA, portée <code>NSSA_LOCAL</code>.<br><br>
Le script lit sur l'entrée standard des annonces LSA capturées :<br>
<code>LSA id=&lt;nom&gt; type=&lt;1|2|3|4|5|7&gt; adv_router=&lt;ip&gt; area=&lt;int&gt;</code><br><br>
Pour chaque LSA, afficher :<br>
<code>LSA_REPORT id={id} type={type} name={lsa_name} emitter={emitter_role} scope={scope}</code></p>`,
    starter: `import sys

lignes = [l.strip() for l in sys.stdin.read().splitlines() if l.strip()]

# À compléter : mapper chaque type de LSA vers son nom, son rôle émetteur et sa portée
`,
    hints: [
      'Gérer un dictionnaire de mapping pour les types 1, 2, 3, 4, 5, 7.',
      'Exemple: 1 -> ("Router LSA", "INTERNAL_ROUTER", "INTRA_AREA").'
    ],
    examples: [
      {
        stdin: 'LSA id=L1 type=1 adv_router=1.1.1.1 area=0\nLSA id=L2 type=2 adv_router=2.2.2.2 area=0\nLSA id=L3 type=3 adv_router=10.0.0.1 area=1\nLSA id=L4 type=5 adv_router=192.168.1.1 area=0',
        expected: 'LSA_REPORT id=L1 type=1 name=Router_LSA emitter=INTERNAL_ROUTER scope=INTRA_AREA\nLSA_REPORT id=L2 type=2 name=Network_LSA emitter=DR scope=INTRA_AREA\nLSA_REPORT id=L3 type=3 name=Summary_LSA emitter=ABR scope=INTER_AREA\nLSA_REPORT id=L4 type=5 name=AS_External_LSA emitter=ASBR scope=EXTERNAL_AS',
        note: 'L1 est un LSA Type 1 intra-zone ; L3 est un Type 3 inter-zone émis par un ABR ; L4 est un Type 5 externe.'
      }
    ],
    tests: [
      {
        label: 'Annonces de Type 4 et Type 7 NSSA',
        stdin: 'LSA id=L_ASBR type=4 adv_router=10.0.0.254 area=2\nLSA id=L_NSSA type=7 adv_router=172.16.50.1 area=10',
        expected: 'LSA_REPORT id=L_ASBR type=4 name=ASBR_Summary_LSA emitter=ABR scope=INTER_AREA\nLSA_REPORT id=L_NSSA type=7 name=NSSA_External_LSA emitter=ASBR scope=NSSA_LOCAL'
      },
      {
        label: 'Plusieurs LSAs Type 1 dans différentes aires',
        stdin: 'LSA id=R_BB type=1 adv_router=1.1.1.1 area=0\nLSA id=R_A1 type=1 adv_router=2.2.2.2 area=1',
        expected: 'LSA_REPORT id=R_BB type=1 name=Router_LSA emitter=INTERNAL_ROUTER scope=INTRA_AREA\nLSA_REPORT id=R_A1 type=1 name=Router_LSA emitter=INTERNAL_ROUTER scope=INTRA_AREA'
      },
      {
        label: 'LSA Type 5 traversant le backbone',
        stdin: 'LSA id=EXT_ROUTE type=5 adv_router=198.51.100.1 area=0',
        expected: 'LSA_REPORT id=EXT_ROUTE type=5 name=AS_External_LSA emitter=ASBR scope=EXTERNAL_AS'
      }
    ],
    solution: `import sys

lignes = [l.strip() for l in sys.stdin.read().splitlines() if l.strip()]

MAPPING = {
    1: ("Router_LSA", "INTERNAL_ROUTER", "INTRA_AREA"),
    2: ("Network_LSA", "DR", "INTRA_AREA"),
    3: ("Summary_LSA", "ABR", "INTER_AREA"),
    4: ("ASBR_Summary_LSA", "ABR", "INTER_AREA"),
    5: ("AS_External_LSA", "ASBR", "EXTERNAL_AS"),
    7: ("NSSA_External_LSA", "ASBR", "NSSA_LOCAL")
}

for ligne in lignes:
    if not ligne.startswith("LSA "):
        continue
    parts = ligne.split()
    lid = None
    ltype = 1
    for p in parts[1:]:
        if p.startswith("id="):
            lid = p.split("=", 1)[1]
        elif p.startswith("type="):
            ltype = int(p.split("=", 1)[1])

    info = MAPPING.get(ltype, ("UNKNOWN_LSA", "UNKNOWN", "UNKNOWN"))
    name, emitter, scope = info
    print(f"LSA_REPORT id={lid} type={ltype} name={name} emitter={emitter} scope={scope}")
`
  },
  {
    id: 'lan3-c4-e3',
    chapter: 4,
    title: 'Filtre d\'injection de routes dans une aire OSPF Stub, Totally Stubby & NSSA',
    level: 'n3',
    language: 'python',
    goal: 'Auditer l\'acceptation ou le filtrage des LSAs selon la politique de zone OSPF configurée sur l\'ABR.',
    brief: `<p>Pour alléger la table de routage et préserver la mémoire des routeurs de succursales, OSPF définit des types de zones spéciales :<br><br>
Règles de filtrage des LSAs selon le type de zone :<br>
- <strong>STANDARD (Zone normale) :</strong> Accepte tous les types de LSA (1, 2, 3, 4, 5).<br>
- <strong>STUB :</strong> Bloque les routes externes (Type 4 et 5 rejetés) ; accepte Type 1, 2, 3.<br>
- <strong>TOTALLY_STUBBY (Spécifique Cisco) :</strong> Bloque les routes externes (Type 4 et 5) ET les routes inter-zones (Type 3 rejetés) ; n'accepte que Type 1 et 2.<br>
- <strong>NSSA (Not-So-Stubby Area) :</strong> Bloque les routes externes Type 4 et 5 classiques, mais accepte les Type 7 générés localement ; accepte Type 1, 2, 3, 7.<br><br>
Le script lit sur l'entrée standard :<br>
- Le type de zone :<br>
  <code>AREA_CONFIG area_id=&lt;int&gt; type=&lt;STANDARD|STUB|TOTALLY_STUBBY|NSSA&gt;</code><br>
- Des paquets LSA candidats à l'injection dans cette zone :<br>
  <code>INCOMING_LSA id=&lt;nom&gt; lsa_type=&lt;1|2|3|4|5|7&gt; prefix=&lt;cidr&gt;</code><br><br>
Pour chaque LSA candidat, déterminer si l'ABR l'injecte ou le bloque :<br>
- Si accepté : <code>action=PERMIT result=INJECTED_INTO_AREA</code>.<br>
- Si bloqué : <code>action=DROP result=BLOCKED_BY_AREA_POLICY</code>.<br><br>
Afficher :<br>
<code>OSPF_FILTER id={id} area={area_id} lsa_type={lsa_type} action={action} result={result}</code></p>`,
    starter: `import sys

lignes = [l.strip() for l in sys.stdin.read().splitlines() if l.strip()]

# À compléter : analyser la politique de zone OSPF et filtrer les LSAs entrants
`,
    hints: [
      'Créer un set de types LSA autorisés selon le type d\'aire.',
      'STANDARD: {1, 2, 3, 4, 5}.',
      'STUB: {1, 2, 3}.',
      'TOTALLY_STUBBY: {1, 2}.',
      'NSSA: {1, 2, 3, 7}.'
    ],
    examples: [
      {
        stdin: 'AREA_CONFIG area_id=10 type=STUB\nINCOMING_LSA id=L1 lsa_type=1 prefix=10.10.0.0/16\nINCOMING_LSA id=L2 lsa_type=3 prefix=192.168.0.0/24\nINCOMING_LSA id=L3 lsa_type=5 prefix=0.0.0.0/0',
        expected: 'OSPF_FILTER id=L1 area=10 lsa_type=1 action=PERMIT result=INJECTED_INTO_AREA\nOSPF_FILTER id=L2 area=10 lsa_type=3 action=PERMIT result=INJECTED_INTO_AREA\nOSPF_FILTER id=L3 area=10 lsa_type=5 action=DROP result=BLOCKED_BY_AREA_POLICY',
        note: 'L1 (Type 1) et L2 (Type 3) entrent dans la zone Stub ; L3 (Type 5 externe) est bloqué.'
      }
    ],
    tests: [
      {
        label: 'Zone Totally Stubby bloquant même les Summary Type 3',
        stdin: 'AREA_CONFIG area_id=20 type=TOTALLY_STUBBY\nINCOMING_LSA id=T1 lsa_type=1 prefix=10.20.0.0/16\nINCOMING_LSA id=T3 lsa_type=3 prefix=172.16.0.0/16\nINCOMING_LSA id=T5 lsa_type=5 prefix=8.8.8.8/32',
        expected: 'OSPF_FILTER id=T1 area=20 lsa_type=1 action=PERMIT result=INJECTED_INTO_AREA\nOSPF_FILTER id=T3 area=20 lsa_type=3 action=DROP result=BLOCKED_BY_AREA_POLICY\nOSPF_FILTER id=T5 area=20 lsa_type=5 action=DROP result=BLOCKED_BY_AREA_POLICY'
      },
      {
        label: 'Zone NSSA autorisant le Type 7 et bloquant le Type 5',
        stdin: 'AREA_CONFIG area_id=30 type=NSSA\nINCOMING_LSA id=N7 lsa_type=7 prefix=198.51.100.0/24\nINCOMING_LSA id=N5 lsa_type=5 prefix=203.0.113.0/24',
        expected: 'OSPF_FILTER id=N7 area=30 lsa_type=7 action=PERMIT result=INJECTED_INTO_AREA\nOSPF_FILTER id=N5 area=30 lsa_type=5 action=DROP result=BLOCKED_BY_AREA_POLICY'
      },
      {
        label: 'Zone standard acceptant tout',
        stdin: 'AREA_CONFIG area_id=0 type=STANDARD\nINCOMING_LSA id=S3 lsa_type=3 prefix=10.0.0.0/8\nINCOMING_LSA id=S4 lsa_type=4 prefix=1.1.1.1/32\nINCOMING_LSA id=S5 lsa_type=5 prefix=100.64.0.0/10',
        expected: 'OSPF_FILTER id=S3 area=0 lsa_type=3 action=PERMIT result=INJECTED_INTO_AREA\nOSPF_FILTER id=S4 area=0 lsa_type=4 action=PERMIT result=INJECTED_INTO_AREA\nOSPF_FILTER id=S5 area=0 lsa_type=5 action=PERMIT result=INJECTED_INTO_AREA'
      }
    ],
    solution: `import sys

lignes = [l.strip() for l in sys.stdin.read().splitlines() if l.strip()]

area_id = 0
area_type = "STANDARD"

for ligne in lignes:
    if ligne.startswith("AREA_CONFIG "):
        parts = ligne.split()
        for p in parts[1:]:
            if p.startswith("area_id="):
                area_id = int(p.split("=", 1)[1])
            elif p.startswith("type="):
                area_type = p.split("=", 1)[1]

    elif ligne.startswith("INCOMING_LSA "):
        parts = ligne.split()
        lid = None
        ltype = 1
        for p in parts[1:]:
            if p.startswith("id="):
                lid = p.split("=", 1)[1]
            elif p.startswith("lsa_type="):
                ltype = int(p.split("=", 1)[1])

        allowed = set()
        if area_type == "STANDARD":
            allowed = {1, 2, 3, 4, 5}
        elif area_type == "STUB":
            allowed = {1, 2, 3}
        elif area_type == "TOTALLY_STUBBY":
            allowed = {1, 2}
        elif area_type == "NSSA":
            allowed = {1, 2, 3, 7}

        if ltype in allowed:
            action = "PERMIT"
            result = "INJECTED_INTO_AREA"
        else:
            action = "DROP"
            result = "BLOCKED_BY_AREA_POLICY"

        print(f"OSPF_FILTER id={lid} area={area_id} lsa_type={ltype} action={action} result={result}")
`
  }
];

/**
 * Exercices du chapitre 1 — Cloud Computing B3.
 * Modèles NIST, Typologies de Services & Caractéristiques Fondamentales.
 */
'use strict';

module.exports = [
  {
    id: 'cc3-c1-e1',
    chapter: 1,
    title: 'Classificateur de modèles de service (IaaS, PaaS, SaaS) et responsabilités',
    level: 'n1',
    language: 'python',
    goal: 'Déterminer la répartition des responsabilités opérationnelles (INFRA, OS, RUNTIME, APP, DATA) entre le fournisseur (CSP) et le client selon le modèle de service.',
    brief: '<p>Le script lit sur l\'entrée standard des déclarations au format :<br>\n<code>SERVICE nom=&lt;nom&gt; TYPE=&lt;IaaS|PaaS|SaaS&gt;</code>.<br>\nPour chaque couche technique (<code>INFRA</code>, <code>OS</code>, <code>RUNTIME</code>, <code>APP</code>, <code>DATA</code>), la gestion est attribuée comme suit :<br>\n- <strong>IaaS</strong> : INFRA=CSP, OS=CLIENT, RUNTIME=CLIENT, APP=CLIENT, DATA=CLIENT<br>\n- <strong>PaaS</strong> : INFRA=CSP, OS=CSP, RUNTIME=CSP, APP=CLIENT, DATA=CLIENT<br>\n- <strong>SaaS</strong> : INFRA=CSP, OS=CSP, RUNTIME=CSP, APP=CSP, DATA=CSP<br>\nAfficher pour chaque ligne :<br>\n<code>RESP: nom=&lt;nom&gt; TYPE=&lt;TYPE&gt; | INFRA=&lt;CSP|CLIENT&gt; OS=&lt;CSP|CLIENT&gt; RUNTIME=&lt;CSP|CLIENT&gt; APP=&lt;CSP|CLIENT&gt; DATA=&lt;CSP|CLIENT&gt;</code></p>',
    starter: `import sys

lignes = [l.strip() for l in sys.stdin.read().splitlines() if l.strip()]

# À compléter : classifier les responsabilités par couche
`,
    hints: [
      'En IaaS, le client installe et gère l’OS et tout ce qui est au-dessus.',
      'En PaaS, l’OS et le runtime (ex: Python, Node.js) sont infogérés par le CSP.',
      'En SaaS, le client consomme directement l’application et héberge ses données dessus.'
    ],
    examples: [
      {
        stdin: 'SERVICE nom=ec2 TYPE=IaaS\nSERVICE nom=elastic_beanstalk TYPE=PaaS\nSERVICE nom=office365 TYPE=SaaS',
        expected: 'RESP: nom=ec2 TYPE=IaaS | INFRA=CSP OS=CLIENT RUNTIME=CLIENT APP=CLIENT DATA=CLIENT\nRESP: nom=elastic_beanstalk TYPE=PaaS | INFRA=CSP OS=CSP RUNTIME=CSP APP=CLIENT DATA=CLIENT\nRESP: nom=office365 TYPE=SaaS | INFRA=CSP OS=CSP RUNTIME=CSP APP=CSP DATA=CSP',
        note: 'Le périmètre de maintenance du client diminue au fur et à mesure de l’élévation du niveau d’abstraction.'
      }
    ],
    tests: [
      {
        label: 'Machine virtuelle brute IaaS',
        stdin: 'SERVICE nom=vm_compute TYPE=IaaS',
        expected: 'RESP: nom=vm_compute TYPE=IaaS | INFRA=CSP OS=CLIENT RUNTIME=CLIENT APP=CLIENT DATA=CLIENT'
      },
      {
        label: 'Plateforme managée PaaS',
        stdin: 'SERVICE nom=app_engine TYPE=PaaS',
        expected: 'RESP: nom=app_engine TYPE=PaaS | INFRA=CSP OS=CSP RUNTIME=CSP APP=CLIENT DATA=CLIENT'
      },
      {
        label: 'Logiciel clé en main SaaS',
        stdin: 'SERVICE nom=salesforce TYPE=SaaS',
        expected: 'RESP: nom=salesforce TYPE=SaaS | INFRA=CSP OS=CSP RUNTIME=CSP APP=CSP DATA=CSP'
      }
    ],
    solution: `import sys
import re

lignes = [l.strip() for l in sys.stdin.read().splitlines() if l.strip()]

TABLE = {
    'IaaS': {'INFRA': 'CSP', 'OS': 'CLIENT', 'RUNTIME': 'CLIENT', 'APP': 'CLIENT', 'DATA': 'CLIENT'},
    'PaaS': {'INFRA': 'CSP', 'OS': 'CSP',    'RUNTIME': 'CSP',    'APP': 'CLIENT', 'DATA': 'CLIENT'},
    'SaaS': {'INFRA': 'CSP', 'OS': 'CSP',    'RUNTIME': 'CSP',    'APP': 'CSP',    'DATA': 'CSP'}
}

for lig in lignes:
    m = re.search(r'nom=([^\\s]+).*?TYPE=([^\\s]+)', lig)
    if not m:
        continue
    nom, s_type = m.group(1), m.group(2)
    resp = TABLE.get(s_type, {})
    res_str = f"INFRA={resp.get('INFRA')} OS={resp.get('OS')} RUNTIME={resp.get('RUNTIME')} APP={resp.get('APP')} DATA={resp.get('DATA')}"
    print(f"RESP: nom={nom} TYPE={s_type} | {res_str}")
`
  },
  {
    id: 'cc3-c1-e2',
    chapter: 1,
    title: 'Auditeur des 5 caractéristiques essentielles NIST (SP 800-145)',
    level: 'n2',
    language: 'python',
    goal: 'Vérifier la conformité d’une offre d’infrastructure aux 5 critères obligatoires de la définition NIST du Cloud Computing.',
    brief: '<p>Le standard NIST SP 800-145 impose 5 caractéristiques cumulatives :<br>\n1. <code>ON_DEMAND_SELF_SERVICE</code> (libre-service à la demande)<br>\n2. <code>BROAD_NETWORK_ACCESS</code> (accès réseau étendu)<br>\n3. <code>RESOURCE_POOLING</code> (mutualisation des ressources)<br>\n4. <code>RAPID_ELASTICITY</code> (élasticité rapide)<br>\n5. <code>MEASURED_SERVICE</code> (service mesuré / facturation à l’usage)<br><br>\nLe script lit des lignes :<br>\n<code>AUDIT composant=&lt;nom&gt; CARACS=&lt;c1,c2,...&gt;</code> (séparées par des virgules).<br>\nCalculer le score de conformité sur 5 (pourcentage = <code>score * 20</code>).<br>\nIdentifier les critères manquants dans l\'ordre officiel ci-dessus.<br>\nSi les 5 critères sont présents : <code>STATUT=CONFORME</code> et <code>MANQUES=AUCUN</code>.<br>\nSinon : <code>STATUT=NON_CONFORME</code> et <code>MANQUES=&lt;liste séparée par virgule&gt;</code>.<br>\nAfficher :<br>\n<code>CONFORMITE: nom=&lt;nom&gt; SCORE=&lt;score&gt;/5 (&lt;pct&gt;%) STATUT=&lt;STATUT&gt; MANQUES=&lt;MANQUES&gt;</code></p>',
    starter: `import sys

lignes = [l.strip() for l in sys.stdin.read().splitlines() if l.strip()]

# À compléter : auditer les critères NIST
`,
    hints: [
      'Garder la liste ordonnée des 5 caractéristiques officielles pour générer les manques dans l\'ordre.',
      'Un Cloud privé conforme doit également respecter l\'intégralité des 5 caractéristiques.'
    ],
    examples: [
      {
        stdin: 'AUDIT composant=aws_ec2 CARACS=ON_DEMAND_SELF_SERVICE,BROAD_NETWORK_ACCESS,RESOURCE_POOLING,RAPID_ELASTICITY,MEASURED_SERVICE\nAUDIT composant=vps_statique CARACS=BROAD_NETWORK_ACCESS,RESOURCE_POOLING',
        expected: 'CONFORMITE: nom=aws_ec2 SCORE=5/5 (100%) STATUT=CONFORME MANQUES=AUCUN\nCONFORMITE: nom=vps_statique SCORE=2/5 (40%) STATUT=NON_CONFORME MANQUES=ON_DEMAND_SELF_SERVICE,RAPID_ELASTICITY,MEASURED_SERVICE',
        note: 'Une solution d’hébergement classique manque souvent d’élasticité dynamique et d’API en libre-service.'
      }
    ],
    tests: [
      {
        label: 'Cloud conforme aux 5 critères',
        stdin: 'AUDIT composant=openstack_prod CARACS=ON_DEMAND_SELF_SERVICE,BROAD_NETWORK_ACCESS,RESOURCE_POOLING,RAPID_ELASTICITY,MEASURED_SERVICE',
        expected: 'CONFORMITE: nom=openstack_prod SCORE=5/5 (100%) STATUT=CONFORME MANQUES=AUCUN'
      },
      {
        label: 'Hébergement sans élasticité ni mesure',
        stdin: 'AUDIT composant=serveur_dedie CARACS=ON_DEMAND_SELF_SERVICE,BROAD_NETWORK_ACCESS,RESOURCE_POOLING',
        expected: 'CONFORMITE: nom=serveur_dedie SCORE=3/5 (60%) STATUT=NON_CONFORME MANQUES=RAPID_ELASTICITY,MEASURED_SERVICE'
      },
      {
        label: 'Environnement isolé sans libre service',
        stdin: 'AUDIT composant=mainframe CARACS=RESOURCE_POOLING,MEASURED_SERVICE',
        expected: 'CONFORMITE: nom=mainframe SCORE=2/5 (40%) STATUT=NON_CONFORME MANQUES=ON_DEMAND_SELF_SERVICE,BROAD_NETWORK_ACCESS,RAPID_ELASTICITY'
      }
    ],
    solution: `import sys
import re

OFFICIELLES = [
    'ON_DEMAND_SELF_SERVICE',
    'BROAD_NETWORK_ACCESS',
    'RESOURCE_POOLING',
    'RAPID_ELASTICITY',
    'MEASURED_SERVICE'
]

lignes = [l.strip() for l in sys.stdin.read().splitlines() if l.strip()]

for lig in lignes:
    m = re.search(r'composant=([^\\s]+).*?CARACS=([^\\s]+)', lig)
    if not m:
        continue
    nom = m.group(1)
    presentes = set(m.group(2).split(','))
    
    score = sum(1 for c in OFFICIELLES if c in presentes)
    pct = score * 20
    manques = [c for c in OFFICIELLES if c not in presentes]
    
    statut = 'CONFORME' if score == 5 else 'NON_CONFORME'
    manques_str = 'AUCUN' if not manques else ','.join(manques)
    
    print(f"CONFORMITE: nom={nom} SCORE={score}/5 ({pct}%) STATUT={statut} MANQUES={manques_str}")
`
  },
  {
    id: 'cc3-c1-e3',
    chapter: 1,
    title: 'Évaluateur de modèles de déploiement Cloud (Public, Privé, Hybride, Communautaire)',
    level: 'n3',
    language: 'python',
    goal: 'Qualifier automatiquement le modèle de déploiement Cloud cible d’une organisation selon ses contraintes de colocation, connectivité et criticité des données.',
    brief: '<p>Le script lit sur l\'entrée standard des profils de déploiement :<br>\n<code>DEPL nom=&lt;nom&gt; TENANT=&lt;MULTI|DEDIE&gt; RESEAU=&lt;INTERNET|VPN_PRIVE|HYBRIDE&gt; DONNEES=&lt;STANDARD|SENSIBLE|SECRET&gt; PARTAGE=&lt;OUVERT|COMMUNAUTE|EXCLUSIF&gt;</code>.<br>\nArbre de qualification déterministe :<br>\n1. Si <code>PARTAGE == COMMUNAUTE</code> -&gt; <code>MODELE=COMMUNAUTAIRE</code>.<br>\n2. Sinon si <code>RESEAU == HYBRIDE</code> -&gt; <code>MODELE=HYBRIDE</code>.<br>\n3. Sinon si <code>TENANT == DEDIE</code> ou <code>DONNEES == SECRET</code> ou <code>PARTAGE == EXCLUSIF</code> -&gt; <code>MODELE=PRIVE</code>.<br>\n4. Sinon si <code>TENANT == MULTI</code> et <code>RESEAU == INTERNET</code> -&gt; <code>MODELE=PUBLIC</code>.<br>\n5. Sinon -&gt; <code>MODELE=PRIVE</code>.<br><br>\nDéterminer également le <code>NIVEAU_ISOLATION</code> :<br>\n- Si <code>MODELE == PRIVE</code> : <code>ISOLE_PHYSIQUE</code><br>\n- Si <code>MODELE == HYBRIDE</code> : <code>SEGMENTE_VPN</code><br>\n- Si <code>MODELE == COMMUNAUTAIRE</code> : <code>RESTREINT_PAIRS</code><br>\n- Si <code>MODELE == PUBLIC</code> : <code>LOGIQUE_MULTI_TENANT</code><br><br>\nAfficher :<br>\n<code>MODELE: &lt;nom&gt; -&gt; DEPL=&lt;MODELE&gt; | ISOLATION=&lt;NIVEAU_ISOLATION&gt;</code></p>',
    starter: `import sys

lignes = [l.strip() for l in sys.stdin.read().splitlines() if l.strip()]

# À compléter : qualifier le modèle de déploiement Cloud
`,
    hints: [
      'Appliquer les règles dans l’ordre strict : Communauté puis Hybride puis Privé puis Public.',
      'Le Cloud communautaire fédère plusieurs organisations partageant des exigences communes (ex: secteur bancaire ou recherche).'
    ],
    examples: [
      {
        stdin: 'DEPL nom=startup_web TENANT=MULTI RESEAU=INTERNET DONNEES=STANDARD PARTAGE=OUVERT\nDEPL nom=hopital_chru TENANT=DEDIE RESEAU=VPN_PRIVE DONNEES=SECRET PARTAGE=EXCLUSIF\nDEPL nom=banque_core TENANT=MULTI RESEAU=HYBRIDE DONNEES=SENSIBLE PARTAGE=OUVERT',
        expected: 'MODELE: startup_web -> DEPL=PUBLIC | ISOLATION=LOGIQUE_MULTI_TENANT\nMODELE: hopital_chru -> DEPL=PRIVE | ISOLATION=ISOLE_PHYSIQUE\nMODELE: banque_core -> DEPL=HYBRIDE | ISOLATION=SEGMENTE_VPN',
        note: 'Le Cloud hybride articule des ressources privées locales et des extensions élastiques publiques.'
      }
    ],
    tests: [
      {
        label: 'Groupement inter-hospitalier communautaire',
        stdin: 'DEPL nom=sante_region TENANT=MULTI RESEAU=VPN_PRIVE DONNEES=SENSIBLE PARTAGE=COMMUNAUTE',
        expected: 'MODELE: sante_region -> DEPL=COMMUNAUTAIRE | ISOLATION=RESTREINT_PAIRS'
      },
      {
        label: 'Environnement de dev public',
        stdin: 'DEPL nom=dev_sandbox TENANT=MULTI RESEAU=INTERNET DONNEES=STANDARD PARTAGE=OUVERT',
        expected: 'MODELE: dev_sandbox -> DEPL=PUBLIC | ISOLATION=LOGIQUE_MULTI_TENANT'
      },
      {
        label: 'Système d’armes militaire dédié',
        stdin: 'DEPL nom=defense_ops TENANT=DEDIE RESEAU=VPN_PRIVE DONNEES=SECRET PARTAGE=EXCLUSIF',
        expected: 'MODELE: defense_ops -> DEPL=PRIVE | ISOLATION=ISOLE_PHYSIQUE'
      }
    ],
    solution: `import sys
import re

lignes = [l.strip() for l in sys.stdin.read().splitlines() if l.strip()]

for lig in lignes:
    m = re.search(r'nom=([^\\s]+).*?TENANT=([^\\s]+).*?RESEAU=([^\\s]+).*?DONNEES=([^\\s]+).*?PARTAGE=([^\\s]+)', lig)
    if not m:
        continue
    nom, tenant, reseau, donnees, partage = m.group(1), m.group(2), m.group(3), m.group(4), m.group(5)
    
    if partage == 'COMMUNAUTE':
        modele = 'COMMUNAUTAIRE'
    elif reseau == 'HYBRIDE':
        modele = 'HYBRIDE'
    elif tenant == 'DEDIE' or donnees == 'SECRET' or partage == 'EXCLUSIF':
        modele = 'PRIVE'
    elif tenant == 'MULTI' and reseau == 'INTERNET':
        modele = 'PUBLIC'
    else:
        modele = 'PRIVE'
        
    iso_map = {
        'PRIVE': 'ISOLE_PHYSIQUE',
        'HYBRIDE': 'SEGMENTE_VPN',
        'COMMUNAUTAIRE': 'RESTREINT_PAIRS',
        'PUBLIC': 'LOGIQUE_MULTI_TENANT'
    }
    iso = iso_map.get(modele, 'INCONNU')
    print(f"MODELE: {nom} -> DEPL={modele} | ISOLATION={iso}")
`
  }
];

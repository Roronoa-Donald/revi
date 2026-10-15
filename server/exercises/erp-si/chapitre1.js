/**
 * Chapitre 1 — SI et ERP (Système d'Information & Progiciel de Gestion Intégré).
 *
 * Trois fiches Python pour comprendre les fondations du SI :
 *   - erp2-c1-e1 : classification des 5 composantes du Système d'Information ;
 *   - erp2-c1-e2 : détection des divergences et silos de données inter-applications ;
 *   - erp2-c1-e3 : calcul du coût total de possession (TCO) d'un projet ERP.
 */
'use strict';

module.exports = [
  {
    id: 'erp2-c1-e1',
    chapter: 1,
    level: 'n1',
    language: 'python',
    title: 'Composantes du Système d’Information',
    goal: 'Qualifier un élément de l’entreprise selon les 5 composantes fondamentales du SI.',
    brief: '<p>Un Système d’Information (SI) est un ensemble organisé de ressources réparties en 5 composantes : ' +
      '<strong>Materiel</strong> (serveurs, postes, réseaux), <strong>Logiciel</strong> (ERP, OS, outils), ' +
      '<strong>Donnees</strong> (bases SQL, fichiers clients), <strong>Humain</strong> (utilisateurs, DSI, comptables) ' +
      'et <strong>Processus</strong> (procédures de vente, validation de congés, chaîne d’approvisionnement).</p>' +
      '<p>Lit un identifiant de ressource sur l’entrée standard (en minuscules, sans espaces) et affiche sa composante :<br>' +
      '- <code>serveur</code>, <code>routeur</code>, <code>ordinateur</code> &rarr; <code>Materiel</code><br>' +
      '- <code>progiciel_erp</code>, <code>systeme_os</code>, <code>antivirus</code> &rarr; <code>Logiciel</code><br>' +
      '- <code>base_clients</code>, <code>catalogue_produits</code>, <code>factures_pdf</code> &rarr; <code>Donnees</code><br>' +
      '- <code>administrateur</code>, <code>comptable</code>, <code>chef_projet</code> &rarr; <code>Humain</code><br>' +
      '- <code>procedure_achat</code>, <code>cycle_facturation</code>, <code>validation_conges</code> &rarr; <code>Processus</code><br>' +
      'Pour toute autre valeur non répertoriée, affiche <code>Inconnu</code>.</p>',
    starter: `ressource = input().strip().lower()\n\n# À compléter : mapper la ressource vers sa composante du SI.\n`,
    hints: [
      'Utilise un dictionnaire Python associant chaque mot-clé à sa composante.',
      'Utilise table.get(ressource, "Inconnu") pour la valeur par défaut.'
    ],
    examples: [
      {
        stdin: 'serveur',
        expected: 'Composante: Materiel',
        note: 'Le serveur physique relève de la composante matérielle.'
      }
    ],
    tests: [
      {
        label: 'Ressource logicielle',
        stdin: 'progiciel_erp',
        expected: 'Composante: Logiciel'
      },
      {
        label: 'Ressource humaine',
        stdin: 'comptable',
        expected: 'Composante: Humain'
      },
      {
        label: 'Procédure métier',
        stdin: 'procedure_achat',
        expected: 'Composante: Processus'
      }
    ],
    solution: `ressource = input().strip().lower()

table = {
    'serveur': 'Materiel',
    'routeur': 'Materiel',
    'ordinateur': 'Materiel',
    'progiciel_erp': 'Logiciel',
    'systeme_os': 'Logiciel',
    'antivirus': 'Logiciel',
    'base_clients': 'Donnees',
    'catalogue_produits': 'Donnees',
    'factures_pdf': 'Donnees',
    'administrateur': 'Humain',
    'comptable': 'Humain',
    'chef_projet': 'Humain',
    'procedure_achat': 'Processus',
    'cycle_facturation': 'Processus',
    'validation_conges': 'Processus'
}

comp = table.get(ressource, 'Inconnu')
print(f"Composante: {comp}")
`
  },
  {
    id: 'erp2-c1-e2',
    chapter: 1,
    level: 'n2',
    language: 'python',
    title: 'Détection des silos de données',
    goal: 'Comparer deux fiches issues d’applications cloisonnées et identifier les données discordantes.',
    brief: '<p>Avant l’unification par un ERP, les services d’une entreprise maintiennent leurs propres bases (silos). ' +
      'Une même entité (ex. un client) s’y retrouve avec des informations contradictoires.</p>' +
      '<p>Lit deux lignes JSON sur l’entrée standard :<br>' +
      'Ligne 1 : fiche client issue du CRM (ex. <code>{"nom": "Dupont", "ville": "Lyon", "solde": 150}</code>)<br>' +
      'Ligne 2 : fiche client issue de la Comptabilité (ex. <code>{"nom": "Dupont", "ville": "Paris", "solde": 150}</code>)<br>' +
      'Compare les valeurs pour chaque clé commune (triées par ordre alphabétique).<br>' +
      'Si toutes les valeurs communes sont identiques, affiche : <code>Donnees synchronisees</code>.<br>' +
      'Sinon, affiche chaque divergence sur une ligne dédiée :<br>' +
      '<code>Divergence &lt;cle&gt;: CRM=&lt;val_crm&gt; vs Compta=&lt;val_compta&gt;</code>.</p>',
    starter: `import json\n\ncrm = json.loads(input().strip())\ncompta = json.loads(input().strip())\n\n# À compléter : détecter les divergences sur les clés communes.\n`,
    hints: [
      'Trouve les clés présentes dans les deux dictionnaires : cles = sorted(set(crm.keys()) & set(compta.keys())).',
      'Compare crm[k] != compta[k].'
    ],
    examples: [
      {
        stdin: '{"nom": "Dupont", "solde": 150, "ville": "Lyon"}\n{"nom": "Dupont", "solde": 150, "ville": "Paris"}',
        expected: 'Divergence ville: CRM=Lyon vs Compta=Paris',
        note: 'La ville est différente entre les deux services.'
      }
    ],
    tests: [
      {
        label: 'Deux divergences simultanées',
        stdin: '{"adresse": "12 Rue Paix", "email": "a@test.com", "nom": "Alpha"}\n{"adresse": "14 Rue Paix", "email": "b@test.com", "nom": "Alpha"}',
        expected: 'Divergence adresse: CRM=12 Rue Paix vs Compta=14 Rue Paix\nDivergence email: CRM=a@test.com vs Compta=b@test.com'
      },
      {
        label: 'Fiches parfaitement synchronisées',
        stdin: '{"code": "C10", "nom": "Beta"}\n{"code": "C10", "nom": "Beta"}',
        expected: 'Donnees synchronisees'
      },
      {
        label: 'Divergence sur un montant numérique',
        stdin: '{"nom": "Gamma", "plafond": 5000}\n{"nom": "Gamma", "plafond": 3000}',
        expected: 'Divergence plafond: CRM=5000 vs Compta=3000'
      }
    ],
    solution: `import json

crm = json.loads(input().strip())
compta = json.loads(input().strip())

cles_communes = sorted(set(crm.keys()) & set(compta.keys()))
divergences = []

for k in cles_communes:
    if crm[k] != compta[k]:
        divergences.append(f"Divergence {k}: CRM={crm[k]} vs Compta={compta[k]}")

if not divergences:
    print("Donnees synchronisees")
else:
    for d in divergences:
        print(d)
`
  },
  {
    id: 'erp2-c1-e3',
    chapter: 1,
    level: 'n3',
    language: 'python',
    title: 'Calcul du coût total de possession (TCO)',
    goal: 'Évaluer le TCO sur 5 ans d’un projet ERP intégrant investissement initial et coûts récurrents.',
    brief: '<p>Le <strong>TCO</strong> (<em>Total Cost of Ownership</em>) quantifie l’ensemble des dépenses directes et ' +
      'indirectes associées à un système d’information sur son cycle de vie (généralement 5 ans).</p>' +
      '<p>Lit six lignes d’entiers sur l’entrée standard représentant :<br>' +
      '1. Coût des licences initiales (EUR)<br>' +
      '2. Coût de l’intégration et du paramétrage (EUR)<br>' +
      '3. Coût de la formation initiale des utilisateurs (EUR)<br>' +
      '4. Coût annuel de la maintenance logicielle (EUR/an)<br>' +
      '5. Coût annuel de l’hébergement et de l’infrastructure (EUR/an)<br>' +
      '6. Coût annuel du support utilisateur (EUR/an)<br>' +
      'Calcule et affiche :<br>' +
      '- <code>Investissement initial: &lt;somme_initiale&gt; EUR</code><br>' +
      '- <code>Cout recurrent 5 ans: &lt;somme_annuelle * 5&gt; EUR</code><br>' +
      '- <code>TCO 5 ans: &lt;total_global&gt; EUR</code></p>',
    starter: `licences = int(input().strip())\nintegration = int(input().strip())\nformation = int(input().strip())\nmaintenance_an = int(input().strip())\ninfra_an = int(input().strip())\nsupport_an = int(input().strip())\n\n# À compléter : calculer l'investissement initial, les coûts récurrents et le TCO.\n`,
    hints: [
      'Investissement initial = licences + integration + formation.',
      'Coût récurrent 5 ans = (maintenance_an + infra_an + support_an) * 5.',
      'TCO = initial + recurrent.'
    ],
    examples: [
      {
        stdin: '50000\n80000\n20000\n10000\n6000\n4000',
        expected: 'Investissement initial: 150000 EUR\nCout recurrent 5 ans: 100000 EUR\nTCO 5 ans: 250000 EUR',
        note: 'Projet PME classique sur 5 ans.'
      }
    ],
    tests: [
      {
        label: 'Grand compte multi-sites',
        stdin: '200000\n450000\n80000\n40000\n25000\n15000',
        expected: 'Investissement initial: 730000 EUR\nCout recurrent 5 ans: 400000 EUR\nTCO 5 ans: 1130000 EUR'
      },
      {
        label: 'Projet léger sans hébergement dédié',
        stdin: '15000\n25000\n5000\n3000\n1000\n2000',
        expected: 'Investissement initial: 45000 EUR\nCout recurrent 5 ans: 30000 EUR\nTCO 5 ans: 75000 EUR'
      },
      {
        label: 'Budget minimaliste',
        stdin: '5000\n10000\n2000\n1000\n500\n500',
        expected: 'Investissement initial: 17000 EUR\nCout recurrent 5 ans: 10000 EUR\nTCO 5 ans: 27000 EUR'
      }
    ],
    solution: `licences = int(input().strip())
integration = int(input().strip())
formation = int(input().strip())
maintenance_an = int(input().strip())
infra_an = int(input().strip())
support_an = int(input().strip())

initial = licences + integration + formation
recurrent = (maintenance_an + infra_an + support_an) * 5
tco = initial + recurrent

print(f"Investissement initial: {initial} EUR")
print(f"Cout recurrent 5 ans: {recurrent} EUR")
print(f"TCO 5 ans: {tco} EUR")
`
  }
];

'use strict';

module.exports = {
  'sql2-c1-e1': {
    schema: {},
    cases: [
      { label: 'clé primaire dupliquée, courriels distincts', data: {} },
      { label: 'courriel NULL refusé, salaire NULL accepté', data: {} }
    ]
  },
  'sql2-c1-e2': {
    schema: { services: ['id INT PRIMARY KEY', 'libelle TEXT'] },
    cases: [
      { label: 'référence valide puis référence absente, clés étrangères actives', data: { services: [] } },
      { label: 'titre vide permis, titre NULL et code dupliqué refusés', data: { services: [] } }
    ]
  },
  'sql2-c1-e3': {
    schema: {},
    cases: [
      { label: 'même projet pour deux employés, couple répété refusé', data: {} },
      { label: 'heures NULL refusées et deux projets pour un employé', data: {} }
    ]
  },
  'sql2-c2-e1': {
    schema: { clients: ['id INT', 'nom TEXT', 'ville TEXT'] },
    cases: [
      { label: 'chaîne vide, ponctuation et accent initial', data: { clients: [[93, 'élan', 'Delta'], [12, 'a.b', 'Iota'], [44, '', 'Keta']] } },
      { label: 'casse mixte et lettres non ASCII', data: { clients: [[8, 'zoë', 'Cap'], [1, 'iPhone', 'Port'], [15, 'ñandú', 'Roc'], [22, 'Zed-9', 'Est']] } }
    ]
  },
  'sql2-c2-e2': {
    schema: { factures: ['id INT', 'montant_ht INT', 'remise INT'] },
    cases: [
      { label: 'montant nul et remise intégrale', data: { factures: [[91, 0, null], [13, 78000, 78000], [47, 120, 0]] } },
      { label: 'mélange de remises absentes, intégrales et partielles', data: { factures: [[84, 81234, 1234], [25, 41000, null], [70, 17000, 17000], [63, 999, 1]] } }
    ]
  },
  'sql2-c2-e3': {
    schema: { articles: ['id INT', 'libelle TEXT', 'prix_ht REAL'] },
    cases: [
      { label: 'prix nul et arrondi de petites fractions', data: { articles: [[901, 'Connecteur', 0.26], [102, 'Sachet', 0], [312, 'Palette', 19.01]] } },
      { label: 'quatre prix décimaux non ordonnés', data: { articles: [[77, 'Licence mensuelle', 12.76], [33, 'Capteur', 0.05], [99, 'Etiquette', 1.5], [6, 'Terminal', 101.99]] } }
    ]
  },
  'sql2-c3-e1': {
    schema: { serveurs: ['nom TEXT', 'cpu_pct INT'] },
    cases: [
      { label: 'charges extrêmes et de part et d’autre de 85', data: { serveurs: [['zeta-proxy', 84], ['alpha-api', 86], ['mu-lab', 0], ['beta-edge', 100]] } },
      { label: 'les deux seuils et leurs voisins en ordre mélangé', data: { serveurs: [['citrine', 60], ['ambre', 85], ['opal', 59], ['ardoise', 84], ['zircon', 90]] } }
    ]
  },
  'sql2-c3-e2': {
    schema: { employes: ['nom TEXT', 'salaire INT'] },
    cases: [
      { label: 'salaire NULL exclu de la moyenne et deux salaires supérieurs', data: { employes: [['Nora', 120000], ['Moussa', 60000], ['Idris', 30000], ['Helene', null], ['Vera', 90000]] } },
      { label: 'égalité de tous les salaires connus : aucun strictement supérieur', data: { employes: [['Orion', 225000], ['Paco', 225000], ['Romy', 225000], ['Tala', null]] } }
    ]
  },
  'sql2-c3-e3': {
    schema: { clients: ['id INT', 'nom TEXT'], commandes: ['id INT', 'client_id INT'] },
    cases: [
      { label: 'commandes répétées, client NULL et référence orpheline', data: { clients: [[42, 'Nacre'], [7, 'Quartz'], [91, 'Ivoire'], [15, 'Sable']], commandes: [[700, 42], [701, 42], [702, null], [703, 777]] } },
      { label: 'tous les clients ont commandé, avec doublon de commande', data: { clients: [[51, 'Un'], [52, 'Deux'], [53, 'Trois']], commandes: [[901, 53], [902, 51], [903, 52], [904, 53]] } }
    ]
  },
  'sql2-c4-e1': {
    schema: { employes: ['nom TEXT', 'departement TEXT', 'salaire INT'] },
    cases: [
      { label: 'égalité en tête et saut de rang dans une partition', data: { employes: [['Lia', 'Lab', 900], ['Nils', 'Lab', 900], ['Rhea', 'Lab', 700], ['Boreal', 'Media', 800], ['Owen', 'Media', 600]] } },
      { label: 'égalité au deuxième rang dans une autre partition', data: { employes: [['Sora', 'Alpha', 420], ['Mara', 'Beta', 400], ['Numa', 'Beta', 200], ['Elio', 'Beta', 200], ['Vega', 'Beta', 100]] } }
    ]
  },
  'sql2-c4-e2': {
    schema: { recettes: ['jour INT', 'montant INT'] },
    cases: [
      { label: 'deux recettes le même jour partagent le cumul RANGE', data: { recettes: [[9, 300], [4, 100], [9, 700], [20, 0]] } },
      { label: 'premier cumul NULL puis montants et NULL alternés', data: { recettes: [[4, null], [9, 50], [12, null], [15, 75]] } }
    ]
  },
  'sql2-c4-e3': {
    schema: { ventes: ['vendeur TEXT', 'montant INT'] },
    cases: [
      { label: 'total exactement au seuil, juste au-dessous et supérieur', data: { ventes: [['Celine', 25000], ['Celine', 25000], ['Nora', 49999], ['Zola', 65000], ['Zola', 500]] } },
      { label: 'plusieurs vendeurs et aucun total admissible', data: { ventes: [['Iris', 18000], ['Iris', 20000], ['Luca', 49998], ['Khalil', 5]] } }
    ]
  },
  'sql2-c5-e1': {
    schema: { comptes: ['id INT PRIMARY KEY', 'titulaire TEXT', 'solde INT'] },
    cases: [
      { label: 'quatre comptes, deux comptes extérieurs inchangés', data: { comptes: [[2, 'Etang', 22001], [1, 'Lune', 36001], [9, 'Heron', 77777], [4, 'Pirogue', 0]] } },
      { label: 'compte débité juste au-dessus du virement et destinataire vide', data: { comptes: [[3, 'Archive', 47000], [2, 'Nord', 0], [1, 'Sud', 15001]] } }
    ]
  },
  'sql2-c5-e2': {
    schema: { articles: ['id INT', 'stock INT'], commandes: ['id INT', 'statut TEXT'] },
    cases: [
      { label: 'plusieurs commandes et articles indépendants', data: { articles: [[1, 7], [2, 43], [4, 0]], commandes: [[99, 'BROUILLON'], [10, 'EN_ATTENTE'], [11, 'ANNULEE']] } },
      { label: 'stock proche de la quantité et statut initial différent', data: { articles: [[9, 55], [1, 4]], commandes: [[15, 'BROUILLON'], [10, 'EN_COURS']] } }
    ]
  },
  'sql2-c5-e3': {
    schema: { ecritures: ['tx_id INT', 'sens TEXT', 'montant INT'] },
    cases: [
      { label: 'transactions avec débit seul, crédit seul et totaux multiples', data: { ecritures: [[90, 'DEBIT', 13], [90, 'DEBIT', 24], [22, 'CREDIT', 7], [90, 'CREDIT', 5], [33, 'DEBIT', 9]] } },
      { label: 'crédit nul et plusieurs débits pour une transaction', data: { ecritures: [[41, 'CREDIT', 0], [41, 'CREDIT', 19], [12, 'DEBIT', 3], [12, 'DEBIT', 12], [12, 'CREDIT', 15]] } }
    ]
  },
  'sql2-c6-e1': {
    schema: { employes: ['id INT', 'nom TEXT', 'departement TEXT', 'salaire INT'] },
    cases: [
      { label: 'entrées et sorties du seuil après création de la vue', data: { employes: [[14, 'Eme', 'Art', 300000], [11, 'Fano', 'Tech', 299999], [12, 'Gala', 'Ops', 410000], [4, 'Hugo', 'Art', 120000]] }, actions: [{ kind: 'update', id: 11, value: 300000 }, { kind: 'update', id: 12, value: 299999 }] },
      { label: 'vue initialement vide puis insertion et promotion', data: { employes: [[71, 'Orme', 'Nord', 250000], [73, 'Pin', 'Sud', 299999]] }, actions: [{ kind: 'insert', values: [75, 'Cedre', 'Ouest', 450000] }, { kind: 'update', id: 71, value: 300001 }] }
    ]
  },
  'sql2-c6-e2': {
    schema: { comptes: ['id INT', 'solde INT'], journal_audit: ['compte_id INT', 'ancien_solde INT', 'nouveau_solde INT'] },
    cases: [
      { label: 'changement d’identifiant et UPDATE sans changement de solde', data: { comptes: [[61, 820], [37, 310], [92, 1000]], journal_audit: [[999, 10, 20]] }, actions: [{ oldId: 37, newId: 38, newBalance: 315 }, { oldId: 61, newId: 61, newBalance: 820 }, { oldId: 38, newId: 38, newBalance: 100 }] },
      { label: 'plusieurs mises à jour successives du même compte', data: { comptes: [[74, 1400], [75, 900]], journal_audit: [] }, actions: [{ oldId: 74, newId: 74, newBalance: 1000 }, { oldId: 74, newId: 74, newBalance: 1234 }, { oldId: 75, newId: 76, newBalance: 0 }] }
    ]
  },
  'sql2-c6-e3': {
    schema: { journaux: ['id INT', 'service TEXT', 'niveau TEXT', 'message TEXT'] },
    cases: [
      { label: 'plusieurs correspondances, message NULL et faux positifs', data: { journaux: [[41, 'auth', 'ERROR', 'Cle absente'], [9, 'auth', 'INFO', 'Renouvellement'], [25, 'auth', 'ERROR', null], [3, 'proxy', 'ERROR', 'Connexion'], [17, 'auth', 'ERROR', 'Session close']] } },
      { label: 'aucune correspondance malgré services et niveaux proches', data: { journaux: [[90, 'auth', 'WARN', 'Limite'], [11, 'stock', 'ERROR', 'Panne'], [62, 'auth', 'INFO', 'OK'], [77, null, 'ERROR', 'Sans service']] } }
    ]
  },
  'sql3-c1-e1': {
    schema: { wal_journal: ['lsn INT', 'tx_id INT', 'op TEXT'] },
    cases: [
      { label: 'transactions ouvertes répétées, COMMIT et ROLLBACK', data: { wal_journal: [[10, 210, 'BEGIN'], [11, 211, 'BEGIN'], [12, 210, 'UPDATE'], [13, 211, 'COMMIT'], [14, 212, 'BEGIN'], [15, 212, 'ROLLBACK'], [16, 210, 'UPDATE'], [17, 213, 'BEGIN']] } },
      { label: 'COMMIT sans identifiant et transaction connue encore ouverte', data: { wal_journal: [[21, 230, 'BEGIN'], [22, null, 'COMMIT'], [23, 231, 'BEGIN'], [24, 231, 'ROLLBACK'], [25, 230, 'UPDATE']] } }
    ],
    supplementary: [
      { label: 'BEGIN et ROLLBACK sans identifiant, deux transactions ouvertes et deux fins valides', data: { wal_journal: [[401, null, 'BEGIN'], [402, 710, 'BEGIN'], [403, 711, 'BEGIN'], [404, null, 'ROLLBACK'], [405, 710, 'UPDATE'], [406, 711, 'ROLLBACK'], [407, 712, 'BEGIN'], [408, 712, 'COMMIT'], [409, 713, 'BEGIN'], [410, 713, 'UPDATE'], [411, 713, 'UPDATE']] } },
      { label: 'aucune transaction identifiable ouverte, même avec des opérations NULL', data: { wal_journal: [[601, null, 'BEGIN'], [602, 810, 'BEGIN'], [603, 810, 'ROLLBACK'], [604, 811, 'BEGIN'], [605, 811, 'COMMIT'], [606, null, 'UPDATE']] } }
    ]
  },
  'sql3-c1-e2': {
    schema: { mvcc_tuples: ['tuple_id INT', 'xmin INT', 'xmax INT', 'valeur TEXT'] },
    cases: [
      { label: 'bornes de création et de suppression entrelacées', data: { mvcc_tuples: [[90, 49, 50, 'borne-visible'], [14, 20, 0, 'ouverte'], [33, 50, 75, 'creation-future'], [61, 1, 49, 'supprimee-avant'], [72, 48, 51, 'visible-apres']] } },
      { label: 'toutes les versions futures ou supprimées avant le snapshot', data: { mvcc_tuples: [[81, 51, 0, 'trop-tard'], [82, 50, 0, 'limite-creation'], [83, 12, 12, 'ancien'], [84, 49, 48, 'presque']] } }
    ]
  },
  'sql3-c1-e3': {
    schema: { pg_locks_sim: ['pid INT', 'ressource TEXT', 'accorde INT'] },
    cases: [
      { label: 'deux détenteurs pour deux attentes et une attente sans détenteur', data: { pg_locks_sim: [[341, 'cle-a', 1], [342, 'cle-a', 1], [350, 'cle-a', 0], [351, 'cle-a', 0], [352, 'cle-b', 0], [343, 'cle-c', 1]] } },
      { label: 'attentes et détenteurs sur des ressources disjointes', data: { pg_locks_sim: [[401, 'objet-libre', 0], [402, 'objet-pris', 1], [403, 'objet-absent', 0]] } }
    ]
  },
  'sql3-c2-e1': {
    schema: { commandes: ['id INT', 'code_pays TEXT', 'email_client TEXT'] },
    cases: [
      { label: 'NULL, doublons et valeurs distinctes pour les deux colonnes', data: { commandes: [[110, 'NE', 'a@example.invalid'], [111, null, 'b@example.invalid'], [112, 'NE', null], [113, 'ML', 'a@example.invalid'], [114, null, null]] } },
      { label: 'pays unique et courriels multiples avec NULL', data: { commandes: [[201, 'ZZ', null], [202, 'ZZ', null], [203, null, 'c@example.invalid'], [204, null, 'd@example.invalid']] } }
    ]
  },
  'sql3-c2-e2': {
    schema: { commandes: ['id INT', 'client_id INT', 'statut TEXT', 'montant INT'] },
    cases: [
      { label: 'commandes en cours de plusieurs clients et statuts NULL', data: { commandes: [[44, 10, 'EN_COURS', 410], [18, 10, 'EN_COURS', 220], [31, 22, 'EN_COURS', 900], [6, 10, 'LIVREE', 510], [55, 10, null, 110]] } },
      { label: 'aucune commande du client 10 en cours, index néanmoins peuplé', data: { commandes: [[62, 10, 'ARCHIVEE', 12], [63, 40, 'EN_COURS', 34], [64, 50, 'EN_COURS', 56], [65, 10, 'LIVREE', 78]] } }
    ]
  },
  'sql3-c2-e3': {
    schema: { pg_stat_user_tables_sim: ['relname TEXT', 'n_live_tup INT', 'n_dead_tup INT'] },
    cases: [
      { label: 'zéro ligne vivante et seuil fractionnaire strict', data: { pg_stat_user_tables_sim: [['omega', 0, 50], ['sigma', 0, 51], ['tau', 7, 52], ['upsilon', 7, 51], ['phi', 200, 110]] } },
      { label: 'aucun dépassement, notamment égalité exacte', data: { pg_stat_user_tables_sim: [['petit', 25, 55], ['moyen', 250, 99], ['neuf', 0, 0]] } }
    ]
  },
  'sql3-c3-e1': {
    schema: { pg_class_sim: ['relname TEXT', 'relpages INT', 'reltuples INT'] },
    cases: [
      { label: 'coût nul et partie fractionnaire non nulle', data: { pg_class_sim: [['vide', 0, 0], ['leger', 1, 33], ['lourd', 50, 301], ['moyen', 9, 24]] } },
      { label: 'pages et tuples compensés sans égalité de coût', data: { pg_class_sim: [['atlas', 4, 999], ['boreal', 5, 10], ['cobalt', 4, 9], ['delta', 100, 0]] } }
    ]
  },
  'sql3-c3-e2': {
    schema: { pg_stat_database_sim: ['datname TEXT', 'blks_hit INT', 'blks_read INT'] },
    cases: [
      { label: 'division par zéro, succès nul et ratio fractionnaire', data: { pg_stat_database_sim: [['muette', 0, 0], ['froide', 0, 3], ['chaude', 450, 5], ['mitigee', 7, 3]] } },
      { label: 'ratios fractionnaires distincts et cache parfait', data: { pg_stat_database_sim: [['parfait', 8, 0], ['faible', 1, 5], ['milieu', 4, 3], ['autre', 9, 11]] } }
    ]
  },
  'sql3-c3-e3': {
    schema: { commandes: ['id INT', 'annee INT', 'client_id INT', 'montant INT'] },
    cases: [
      { label: 'montants NULL et zéro dans l’année ciblée', data: { commandes: [[211, 2025, 31, 120], [212, 2025, 32, null], [213, 2024, 31, 900], [214, 2025, 33, 0], [215, 2025, 34, 45]] } },
      { label: 'aucune commande en 2025 : SUM vaut NULL', data: { commandes: [[301, 2022, 21, 320], [302, 2026, 22, 450], [303, 2024, 23, 0]] } }
    ]
  },
  'sql3-c4-e1': {
    schema: { chiffre_affaires: ['mois INT', 'ca INT'] },
    cases: [
      { label: 'mois discontinus insérés dans le désordre', data: { chiffre_affaires: [[9, 850], [2, 1200], [5, 750], [11, 900]] } },
      { label: 'chiffre constant, décroissance et montant nul', data: { chiffre_affaires: [[12, 0], [4, 300], [6, 300], [8, 150]] } }
    ]
  },
  'sql3-c4-e2': {
    schema: { employes: ['nom TEXT', 'departement TEXT', 'salaire INT'] },
    cases: [
      { label: 'égalité au deuxième rang et troisième rang exclu', data: { employes: [['Alba', 'Log', 900], ['Bran', 'Log', 700], ['Cleo', 'Log', 700], ['Dune', 'Log', 500], ['Eden', 'Sec', 400], ['Fara', 'Sec', 200]] } },
      { label: 'premier rang partagé dans deux départements', data: { employes: [['Yuna', 'Nord', 800], ['Xela', 'Nord', 800], ['Wadi', 'Nord', 100], ['Vian', 'Sud', 500], ['Ulan', 'Sud', 500], ['Tara', 'Sud', 400], ['Silo', 'Sud', 200]] } }
    ]
  },
  'sql3-c4-e3': {
    schema: { organigramme: ['id INT', 'nom TEXT', 'manager_id INT'] },
    cases: [
      { label: 'arbre ramifié sur cinq niveaux, insertion désordonnée', data: { organigramme: [[104, 'Equipe', 102], [101, 'Direction', 100], [106, 'Cellule', 104], [100, 'Racine', null], [102, 'Pole', 101], [103, 'Branche', 100], [105, 'Support', 103]] } },
      { label: 'chaîne profonde avec une branche latérale', data: { organigramme: [[203, 'Niveau4', 202], [200, 'Tete', null], [205, 'Cote', 201], [201, 'Niveau2', 200], [204, 'Niveau5', 203], [202, 'Niveau3', 201]] } }
    ]
  },
  'sql3-c5-e1': {
    schema: { comptes: ['id INT', 'solde INT'], alertes_fraude: ['compte_id INT', 'montant_tente INT'] },
    cases: [
      { label: 'changement d’identifiant et deux soldes négatifs successifs', data: { comptes: [[7, 30], [9, 10], [4, -2]], alertes_fraude: [] }, actions: [{ oldId: 9, newId: 91, newBalance: -3 }, { oldId: 91, newId: 91, newBalance: -5 }, { oldId: 7, newId: 7, newBalance: 0 }] },
      { label: 'UPDATE sans changement sur solde négatif, zéro et positif', data: { comptes: [[32, 8], [33, 0], [34, -1]], alertes_fraude: [[901, -9]] }, actions: [{ oldId: 34, newId: 34, newBalance: -1 }, { oldId: 32, newId: 32, newBalance: 0 }, { oldId: 33, newId: 33, newBalance: 1 }] }
    ]
  },
  'sql3-c5-e2': {
    schema: { contexte_session: ['tenant_actif TEXT', 'role_actif TEXT'], dossiers_patients: ['id INT', 'tenant_id TEXT', 'patient TEXT'] },
    cases: [
      { label: 'changement de locataire et dossier sans locataire', data: { contexte_session: [['nord', 'MEDECIN']], dossiers_patients: [[81, 'nord', 'Pivoine'], [12, 'sud', 'Myrte'], [30, null, 'Anonyme'], [15, 'nord', 'Tilleul']] }, contextAfter: ['sud', 'MEDECIN'] },
      { label: 'superadministrateur puis rôle ordinaire sans dossier accessible', data: { contexte_session: [['inconnu', 'SUPERADMIN']], dossiers_patients: [[92, 'est', 'Iris'], [93, 'ouest', 'Ronce'], [94, null, 'Sans tenant']] }, contextAfter: ['inconnu', 'LECTEUR'] }
    ]
  },
  'sql3-c5-e3': {
    schema: { commandes: ['id INT', 'client_id INT', 'montant INT'], stats_clients: ['client_id INT PRIMARY KEY', 'nb_cmd INT', 'cumul_montant INT'] },
    cases: [
      { label: 'insertions répétées, historique et client sans ligne de synthèse', data: { commandes: [[800, 77, 100], [801, 77, 200]], stats_clients: [[77, 2, 300], [88, 0, 0]] }, actions: [{ kind: 'insert', values: [901, 77, 12] }, { kind: 'insert', values: [902, 77, 15] }, { kind: 'insert', values: [903, 88, 5] }, { kind: 'insert', values: [904, 99, 22] }] },
      { label: 'montant nul puis UPDATE qui ne doit pas déclencher INSERT', data: { commandes: [[700, 55, 120], [701, 55, 100], [702, 55, 200], [703, 66, 25]], stats_clients: [[55, 3, 420], [66, 1, 25], [77, 0, 0]] }, actions: [{ kind: 'insert', values: [710, 55, 0] }, { kind: 'insert', values: [711, 55, 90] }, { kind: 'insert', values: [712, 66, 25] }, { kind: 'update', id: 700, value: 999 }] }
    ]
  },
  'sql3-c6-e1': {
    schema: { mesures_iot: ['id INT', 'mois INT', 'valeur INT'] },
    cases: [
      { label: 'bornes des quatre trimestres et valeurs groupées', data: { mesures_iot: [[11, 3, 7], [12, 4, 13], [13, 6, 17], [14, 7, 19], [15, 9, 23], [16, 10, 29], [17, 12, 31]] } },
      { label: 'un seul trimestre présent, avec plusieurs mesures', data: { mesures_iot: [[21, 11, 3], [22, 12, 5], [23, 10, 0], [24, 10, 9]] } }
    ]
  },
  'sql3-c6-e2': {
    schema: { pg_stat_replication_sim: ['application_name TEXT', 'sent_lsn_mb INT', 'replay_lsn_mb INT', 'sync_state TEXT'] },
    cases: [
      { label: 'retards égaux départagés par nom et réplica à jour', data: { pg_stat_replication_sim: [['zulu', 800, 760, 'async'], ['alpha', 500, 460, 'sync'], ['mango', 900, 700, 'async'], ['beta', 700, 700, 'sync']] } },
      { label: 'retards variés avec deux états synchrones', data: { pg_stat_replication_sim: [['sud', 100, 99, 'sync'], ['nord', 150, 80, 'async'], ['est', 600, 580, 'sync']] } }
    ]
  },
  'sql3-c6-e3': {
    schema: { cluster_nodes: ['node_name TEXT', 'role TEXT', 'healthy INT', 'received_lsn INT', 'priority INT'] },
    cases: [
      { label: 'égalité de LSN départagée par priorité après filtrage', data: { cluster_nodes: [['east', 'REPLICA', 1, 7500, 30], ['west', 'REPLICA', 1, 7500, 65], ['wrong', 'PRIMARY', 1, 9500, 90], ['down', 'REPLICA', 0, 9900, 99]] } },
      { label: 'aucun réplica sain admissible', data: { cluster_nodes: [['leader', 'PRIMARY', 1, 6000, 10], ['arret', 'REPLICA', 0, 6100, 90], ['ancien', 'PRIMARY', 0, 6200, 100]] } }
    ]
  }
};

'use strict';

function compareValues(left, right) {
  if (left === right) return 0;
  if (left === null) return -1;
  if (right === null) return 1;
  return left < right ? -1 : 1;
}

function sorted(rows, keys) {
  return rows.slice().sort((left, right) => {
    for (const [column, direction] of keys) {
      const difference = compareValues(left[column], right[column]) * direction;
      if (difference !== 0) return difference;
    }
    return 0;
  });
}

function total(values) {
  const present = values.filter(value => value !== null);
  return present.length ? present.reduce((sum, value) => sum + value, 0) : null;
}

function select(columns, values, comparison = {}) {
  return { main: [{ columns, values }], comparison, steps: [] };
}

function noResult() {
  return { main: [], comparison: {}, steps: [] };
}

function query(label, sql, columns, values, comparison = {}, params = []) {
  return { kind: 'query', label, sql, params, expected: { columns, values }, comparison };
}

function execute(label, sql, params = []) {
  return { kind: 'execute', label, sql, params };
}

function reject(label, sql, params, error) {
  return { kind: 'reject', label, sql, params, error };
}

function tableInfo(table, expected) {
  return query(`colonnes et contraintes de ${table}`,
    `SELECT name, type, "notnull", pk FROM pragma_table_info('${table}') ORDER BY cid`,
    ['name', 'type', 'notnull', 'pk'], expected);
}

function namedTrigger(table, name) {
  return query(`déclencheur nommé ${name}`,
    "SELECT name FROM sqlite_schema WHERE type = 'trigger' AND tbl_name = ? ORDER BY name",
    ['name'], [[name]], {}, [table]);
}

function namedView(name) {
  return query(`vue nommée ${name}`,
    "SELECT type FROM sqlite_schema WHERE name = ?", ['type'], [['view']], {}, [name]);
}

function addIndexChecks(plan, table, name, columns, partial) {
  plan.steps.push(query(`type et unicité de ${name}`,
    `SELECT name, "unique", "partial" FROM pragma_index_list('${table}') WHERE name = ?`,
    ['name', 'unique', 'partial'], [[name, 0, partial]], {}, [name]));
  plan.steps.push(query(`ordre des colonnes de ${name}`,
    `SELECT name FROM pragma_index_info('${name}') ORDER BY seqno`,
    ['name'], columns.map(column => [column])));
  if (partial) {
    plan.steps.push({ kind: 'predicate', label: `prédicat de ${name}`, name, expected: { partial: true, included: true, excluded: true } });
  }
}

function createCollaborateurs(caseNumber) {
  const plan = noResult();
  plan.steps.push(tableInfo('collaborateurs', [['id', 'INT', 0, 1], ['email', 'TEXT', 1, 0], ['salaire', 'INT', 0, 0]]));
  if (caseNumber === 0) {
    plan.steps.push(execute('première clé primaire', 'INSERT INTO collaborateurs VALUES (?, ?, ?)', [151, 'une@example.invalid', 160050]));
    plan.steps.push(reject('clé primaire répétée', 'INSERT INTO collaborateurs VALUES (?, ?, ?)', [151, 'autre@example.invalid', 160051], 'UNIQUE'));
    plan.steps.push(reject('courriel répété avec une clé différente', 'INSERT INTO collaborateurs VALUES (?, ?, ?)', [152, 'une@example.invalid', 160051], 'UNIQUE'));
    plan.steps.push(query('lignes conservées', 'SELECT id, email, salaire FROM collaborateurs ORDER BY id',
      ['id', 'email', 'salaire'], [[151, 'une@example.invalid', 160050]]));
  } else {
    plan.steps.push(reject('courriel absent', 'INSERT INTO collaborateurs VALUES (?, ?, ?)', [176, null, 250000], 'NOT NULL'));
    plan.steps.push(reject('salaire sous le minimum', 'INSERT INTO collaborateurs VALUES (?, ?, ?)', [178, 'insuffisant@example.invalid', 99999], 'CHECK'));
    plan.steps.push(execute('salaire facultatif', 'INSERT INTO collaborateurs VALUES (?, ?, ?)', [177, 'sans-salaire@example.invalid', null]));
    plan.steps.push(execute('salaire juste au-dessus du seuil', 'INSERT INTO collaborateurs VALUES (?, ?, ?)', [179, 'admis@example.invalid', 100001]));
    plan.steps.push(query('ligne à salaire NULL', 'SELECT id, email, salaire FROM collaborateurs ORDER BY id',
      ['id', 'email', 'salaire'], [[177, 'sans-salaire@example.invalid', null], [179, 'admis@example.invalid', 100001]]));
  }
  return plan;
}

function createProjets(caseNumber) {
  const plan = noResult();
  plan.steps.push(tableInfo('projets', [['code', 'TEXT', 0, 1], ['titre', 'TEXT', 1, 0], ['service_id', 'INT', 0, 0]]));
  plan.steps.push(query('déclaration de la référence', 'SELECT "table", "from", "to" FROM pragma_foreign_key_list(\'projets\')',
    ['table', 'from', 'to'], [['services', 'service_id', 'id']]));
  if (caseNumber === 0) {
    plan.steps.push(execute('service parent', 'INSERT INTO services VALUES (?, ?)', [351, 'recherche']));
    plan.steps.push(execute('référence existante', 'INSERT INTO projets VALUES (?, ?, ?)', ['meridien', 'Migration', 351]));
    plan.steps.push(reject('référence inexistante', 'INSERT INTO projets VALUES (?, ?, ?)', ['spectre', 'Etude', 9001], 'FOREIGN KEY'));
    plan.steps.push(query('projet et référence conservés', 'SELECT code, titre, service_id FROM projets ORDER BY code',
      ['code', 'titre', 'service_id'], [['meridien', 'Migration', 351]]));
  } else {
    plan.steps.push(execute('titre vide et service facultatif', 'INSERT INTO projets VALUES (?, ?, ?)', ['projet-a', '', null]));
    plan.steps.push(reject('titre NULL', 'INSERT INTO projets VALUES (?, ?, ?)', ['projet-b', null, null], 'NOT NULL'));
    plan.steps.push(reject('code répété', 'INSERT INTO projets VALUES (?, ?, ?)', ['projet-a', 'Autre', null], 'UNIQUE'));
    plan.steps.push(query('titre vide conservé', 'SELECT code, titre, service_id FROM projets ORDER BY code',
      ['code', 'titre', 'service_id'], [['projet-a', '', null]]));
  }
  return plan;
}

function createAffectations(caseNumber) {
  const plan = noResult();
  plan.steps.push(tableInfo('affectations', [['employe_id', 'INT', 0, 1], ['projet_id', 'INT', 0, 2], ['heures', 'INT', 1, 0]]));
  if (caseNumber === 0) {
    plan.steps.push(execute('première affectation', 'INSERT INTO affectations VALUES (?, ?, ?)', [401, 501, 7]));
    plan.steps.push(execute('deuxième employé, même projet', 'INSERT INTO affectations VALUES (?, ?, ?)', [402, 501, 11]));
    plan.steps.push(reject('couple répété', 'INSERT INTO affectations VALUES (?, ?, ?)', [401, 501, 13], 'UNIQUE'));
    plan.steps.push(query('affectations conservées', 'SELECT employe_id, projet_id, heures FROM affectations ORDER BY employe_id, projet_id',
      ['employe_id', 'projet_id', 'heures'], [[401, 501, 7], [402, 501, 11]]));
  } else {
    plan.steps.push(reject('heures NULL', 'INSERT INTO affectations VALUES (?, ?, ?)', [601, 701, null], 'NOT NULL'));
    plan.steps.push(execute('premier projet', 'INSERT INTO affectations VALUES (?, ?, ?)', [601, 701, 2]));
    plan.steps.push(execute('deuxième projet', 'INSERT INTO affectations VALUES (?, ?, ?)', [601, 702, 3]));
    plan.steps.push(query('deux projets conservés', 'SELECT employe_id, projet_id, heures FROM affectations ORDER BY employe_id, projet_id',
      ['employe_id', 'projet_id', 'heures'], [[601, 701, 2], [601, 702, 3]]));
  }
  return plan;
}

function cadresView(fixture) {
  const plan = noResult();
  const employees = fixture.data.employes.map(row => row.slice());
  const visible = () => sorted(employees.filter(row => row[3] >= 300000).map(row => row.slice(0, 3)), [[0, 1]]);
  plan.steps.push(namedView('vue_cadres'));
  plan.steps.push(query('vue avant changement', 'SELECT id, nom, departement FROM vue_cadres ORDER BY id',
    ['id', 'nom', 'departement'], visible()));
  for (const action of fixture.actions) {
    if (action.kind === 'update') {
      const employee = employees.find(row => row[0] === action.id);
      if (!employee) throw new Error('Employé à modifier absent du jeu');
      employee[3] = action.value;
      plan.steps.push(execute('modification du salaire', 'UPDATE employes SET salaire = ? WHERE id = ?', [action.value, action.id]));
    } else if (action.kind === 'insert') {
      employees.push(action.values.slice());
      plan.steps.push(execute('nouvel employé', 'INSERT INTO employes VALUES (?, ?, ?, ?)', action.values));
    } else throw new Error(`Action inconnue : ${action.kind}`);
  }
  plan.steps.push(query('vue après changements', 'SELECT id, nom, departement FROM vue_cadres ORDER BY id',
    ['id', 'nom', 'departement'], visible()));
  return plan;
}

function accountTrigger(fixture, mode) {
  const plan = noResult();
  const accounts = fixture.data.comptes.map(row => row.slice());
  const logTable = mode === 'audit' ? 'journal_audit' : 'alertes_fraude';
  const logRows = fixture.data[logTable].map(row => row.slice());
  const triggerName = mode === 'audit' ? 'trg_audit_solde' : 'trg_alerte_decouvert';
  plan.steps.push(namedTrigger('comptes', triggerName));
  for (const action of fixture.actions) {
    const account = accounts.find(row => row[0] === action.oldId);
    if (!account) throw new Error('Compte à modifier absent du jeu');
    const oldId = account[0];
    const oldBalance = account[1];
    account[0] = action.newId;
    account[1] = action.newBalance;
    if (mode === 'audit') logRows.push([oldId, oldBalance, action.newBalance]);
    else if (action.newBalance < 0) logRows.push([action.newId, action.newBalance]);
    plan.steps.push(execute('mise à jour de compte', 'UPDATE comptes SET id = ?, solde = ? WHERE id = ?',
      [action.newId, action.newBalance, action.oldId]));
  }
  plan.steps.push(query('comptes après mises à jour', 'SELECT id, solde FROM comptes ORDER BY id',
    ['id', 'solde'], sorted(accounts, [[0, 1]])));
  const columns = mode === 'audit' ? ['compte_id', 'ancien_solde', 'nouveau_solde'] : ['compte_id', 'montant_tente'];
  plan.steps.push(query('journal du déclencheur', `SELECT ${columns.join(', ')} FROM ${logTable}`, columns, logRows, { unordered: true }));
  return plan;
}

function rlsView(fixture) {
  const plan = noResult();
  const records = fixture.data.dossiers_patients;
  const visible = context => sorted(records.filter(record => context[1] === 'SUPERADMIN' ||
    (context[0] !== null && record[1] !== null && record[1] === context[0])).map(record => record.slice()), [[0, 1]]);
  plan.steps.push(namedView('v_dossiers_rls'));
  plan.steps.push(query('vue selon le premier contexte', 'SELECT id, tenant_id, patient FROM v_dossiers_rls ORDER BY id',
    ['id', 'tenant_id', 'patient'], visible(fixture.data.contexte_session[0])));
  plan.steps.push(execute('changement de contexte', 'UPDATE contexte_session SET tenant_actif = ?, role_actif = ?', fixture.contextAfter));
  plan.steps.push(query('vue selon le second contexte', 'SELECT id, tenant_id, patient FROM v_dossiers_rls ORDER BY id',
    ['id', 'tenant_id', 'patient'], visible(fixture.contextAfter)));
  return plan;
}

function statisticsTrigger(fixture) {
  const plan = noResult();
  const orders = fixture.data.commandes.map(row => row.slice());
  const stats = fixture.data.stats_clients.map(row => row.slice());
  plan.steps.push(namedTrigger('commandes', 'trg_maj_stats'));
  for (const action of fixture.actions) {
    if (action.kind === 'insert') {
      const order = action.values.slice();
      orders.push(order);
      const client = stats.find(row => row[0] === order[1]);
      if (client) {
        client[1] += 1;
        client[2] += order[2];
      }
      plan.steps.push(execute('nouvelle commande', 'INSERT INTO commandes VALUES (?, ?, ?)', order));
    } else if (action.kind === 'update') {
      const order = orders.find(row => row[0] === action.id);
      if (!order) throw new Error('Commande à modifier absente du jeu');
      order[2] = action.value;
      plan.steps.push(execute('modification de commande existante', 'UPDATE commandes SET montant = ? WHERE id = ?', [action.value, action.id]));
    } else throw new Error(`Action inconnue : ${action.kind}`);
  }
  plan.steps.push(query('commandes après opérations', 'SELECT id, client_id, montant FROM commandes ORDER BY id',
    ['id', 'client_id', 'montant'], sorted(orders, [[0, 1]])));
  plan.steps.push(query('synthèses après opérations', 'SELECT client_id, nb_cmd, cumul_montant FROM stats_clients ORDER BY client_id',
    ['client_id', 'nb_cmd', 'cumul_montant'], sorted(stats, [[0, 1]])));
  return plan;
}

function buildOracle(id, fixture, caseNumber) {
  const data = fixture.data;
  switch (id) {
    case 'sql2-c1-e1': return createCollaborateurs(caseNumber);
    case 'sql2-c1-e2': return createProjets(caseNumber);
    case 'sql2-c1-e3': return createAffectations(caseNumber);
    case 'sql2-c2-e1': {
      const values = data.clients.map(row => [row[0], row[1].replace(/[a-z]/g, letter => String.fromCharCode(letter.charCodeAt(0) - 32)), [...row[1]].length]);
      return select(['id', 'nom_maj', 'nb_caracteres'], sorted(values, [[0, 1]]));
    }
    case 'sql2-c2-e2': {
      const values = data.factures.map(row => [row[0], row[1] - (row[2] === null ? 0 : row[2])]);
      return select(['id', 'montant_net'], sorted(values, [[0, 1]]));
    }
    case 'sql2-c2-e3': {
      const values = sorted(data.articles, [[0, 1]]).map(row => {
        const cents = Math.round(row[2] * 100);
        return [row[1], Math.floor((cents * 118 + 50) / 100) / 100];
      });
      return select(['libelle', 'prix_ttc'], values);
    }
    case 'sql2-c3-e1': {
      const values = data.serveurs.map(row => [row[0], row[1], row[1] >= 85 ? 'CRITIQUE' : row[1] >= 60 ? 'ATTENTION' : 'NORMAL']);
      return select(['nom', 'cpu_pct', 'etat'], sorted(values, [[0, 1]]));
    }
    case 'sql2-c3-e2': {
      const salaries = data.employes.map(row => row[1]).filter(value => value !== null);
      const sum = salaries.reduce((accumulator, value) => accumulator + value, 0);
      const values = data.employes.filter(row => row[1] !== null && row[1] * salaries.length > sum).map(row => row.slice());
      return select(['nom', 'salaire'], sorted(values, [[1, -1]]), { ties: [1] });
    }
    case 'sql2-c3-e3': {
      const ordered = new Set(data.commandes.map(row => row[1]).filter(value => value !== null));
      const values = data.clients.filter(row => row[0] === null || !ordered.has(row[0])).map(row => row.slice());
      return select(['id', 'nom'], sorted(values, [[0, 1]]), { ties: [0] });
    }
    case 'sql2-c4-e1': {
      const values = data.employes.map(row => [row[0], row[1], row[2], 1 + data.employes.filter(other => other[1] === row[1] && other[2] > row[2]).length]);
      return select(['nom', 'departement', 'salaire', 'rang'], sorted(values, [[1, 1], [3, 1], [0, 1]]), { ties: [1, 3] });
    }
    case 'sql2-c4-e2': {
      const values = data.recettes.map(row => [row[0], row[1], total(data.recettes.filter(other => other[0] <= row[0]).map(other => other[1]))]);
      return select(['jour', 'montant', 'cumul'], sorted(values, [[0, 1]]), { ties: [0] });
    }
    case 'sql2-c4-e3': {
      const sellers = new Map();
      for (const [seller, amount] of data.ventes) sellers.set(seller, (sellers.get(seller) || 0) + amount);
      const values = [...sellers].filter(entry => entry[1] >= 50000);
      return select(['vendeur', 'ca_total'], sorted(values, [[1, -1]]), { ties: [1] });
    }
    case 'sql2-c5-e1': {
      const plan = noResult();
      const values = data.comptes.map(row => [row[0], row[1], row[2] + (row[0] === 1 ? -15000 : row[0] === 2 ? 15000 : 0)]);
      plan.steps.push(query('tous les comptes après virement', 'SELECT id, titulaire, solde FROM comptes ORDER BY id',
        ['id', 'titulaire', 'solde'], sorted(values, [[0, 1]])));
      return plan;
    }
    case 'sql2-c5-e2': {
      const plan = noResult();
      const articles = data.articles.map(row => [row[0], row[1] - (row[0] === 1 ? 3 : 0)]);
      const orders = data.commandes.map(row => [row[0], row[0] === 10 ? 'VALIDEE' : row[1]]);
      plan.steps.push(query('tous les stocks après validation', 'SELECT id, stock FROM articles ORDER BY id', ['id', 'stock'], sorted(articles, [[0, 1]])));
      plan.steps.push(query('toutes les commandes après validation', 'SELECT id, statut FROM commandes ORDER BY id', ['id', 'statut'], sorted(orders, [[0, 1]])));
      return plan;
    }
    case 'sql2-c5-e3': {
      const balances = new Map();
      for (const [transaction, direction, amount] of data.ecritures) {
        if (!balances.has(transaction)) balances.set(transaction, [transaction, 0, 0]);
        if (direction === 'DEBIT') balances.get(transaction)[1] += amount;
        if (direction === 'CREDIT') balances.get(transaction)[2] += amount;
      }
      return select(['tx_id', 'total_debit', 'total_credit'], sorted([...balances.values()], [[0, 1]]));
    }
    case 'sql2-c6-e1': return cadresView(fixture);
    case 'sql2-c6-e2': return accountTrigger(fixture, 'audit');
    case 'sql2-c6-e3': {
      const values = data.journaux.filter(row => row[1] === 'auth' && row[2] === 'ERROR').map(row => [row[0], row[3]]);
      const plan = select(['id', 'message'], sorted(values, [[0, 1]]));
      addIndexChecks(plan, 'journaux', 'idx_journaux_service_niveau', ['service', 'niveau'], 0);
      return plan;
    }
    case 'sql3-c1-e1': {
      const identifiers = new Set(data.wal_journal.map(row => row[1]).filter(value => value !== null));
      const finished = new Set(data.wal_journal.filter(row => row[2] === 'COMMIT' || row[2] === 'ROLLBACK').map(row => row[1]).filter(value => value !== null));
      const values = [...identifiers].filter(identifier => !finished.has(identifier)).map(identifier => [identifier]);
      return select(['tx_id'], sorted(values, [[0, 1]]));
    }
    case 'sql3-c1-e2': {
      const values = data.mvcc_tuples.filter(row => row[1] < 50 && (row[2] === 0 || row[2] >= 50)).map(row => [row[0], row[3]]);
      return select(['tuple_id', 'valeur'], sorted(values, [[0, 1]]));
    }
    case 'sql3-c1-e3': {
      const values = [];
      for (const waiting of data.pg_locks_sim.filter(row => row[2] === 0)) {
        for (const holder of data.pg_locks_sim.filter(row => row[2] === 1)) {
          if (waiting[1] !== null && waiting[1] === holder[1]) values.push([waiting[0], holder[0], waiting[1]]);
        }
      }
      return select(['pid_bloque', 'pid_bloqueur', 'ressource'], sorted(values, [[0, 1]]), { ties: [0] });
    }
    case 'sql3-c2-e1': {
      const countries = new Set(data.commandes.map(row => row[1]).filter(value => value !== null));
      const emails = new Set(data.commandes.map(row => row[2]).filter(value => value !== null));
      return select(['total_lignes', 'card_pays', 'card_email'], [[data.commandes.length, countries.size, emails.size]]);
    }
    case 'sql3-c2-e2': {
      const values = data.commandes.filter(row => row[1] === 10 && row[2] === 'EN_COURS').map(row => [row[0], row[3]]);
      const plan = select(['id', 'montant'], sorted(values, [[0, 1]]));
      addIndexChecks(plan, 'commandes', 'idx_cmd_en_cours', ['client_id'], 1);
      const indexed = sorted(data.commandes.filter(row => row[2] === 'EN_COURS').map(row => row.slice()), [[0, 1]]);
      plan.steps.push(query('lecture forcée de toutes les commandes en cours',
        "SELECT id, client_id, statut, montant FROM commandes INDEXED BY idx_cmd_en_cours WHERE statut = 'EN_COURS' ORDER BY id",
        ['id', 'client_id', 'statut', 'montant'], indexed));
      return plan;
    }
    case 'sql3-c2-e3': {
      const values = data.pg_stat_user_tables_sim.filter(row => 5 * row[2] > 250 + row[1]).map(row => row.slice());
      return select(['relname', 'n_live_tup', 'n_dead_tup'], sorted(values, [[2, -1]]), { ties: [2] });
    }
    case 'sql3-c3-e1': {
      const values = data.pg_class_sim.map(row => [row[0], (100 * row[1] + row[2]) / 100]);
      return select(['relname', 'cout_seq_scan'], sorted(values, [[1, 1]]), { ties: [1] });
    }
    case 'sql3-c3-e2': {
      const values = data.pg_stat_database_sim.map(row => [row[0], row[1] + row[2] === 0 ? null : Math.floor(10000 * row[1] / (row[1] + row[2]) + 0.5) / 100]);
      return select(['datname', 'hit_ratio_pct'], sorted(values, [[1, -1]]), { ties: [1] });
    }
    case 'sql3-c3-e3': {
      const amounts = data.commandes.filter(row => row[1] === 2025).map(row => row[3]);
      const plan = select(['total_2025'], [[total(amounts)]]);
      addIndexChecks(plan, 'commandes', 'idx_cmd_annee_montant', ['annee', 'montant'], 0);
      return plan;
    }
    case 'sql3-c4-e1': {
      const rows = sorted(data.chiffre_affaires, [[0, 1]]);
      const values = rows.map((row, index) => {
        const previous = index === 0 ? 0 : rows[index - 1][1];
        return [row[0], row[1], previous, row[1] - previous];
      });
      return select(['mois', 'ca', 'ca_precedent', 'variation'], values);
    }
    case 'sql3-c4-e2': {
      const values = data.employes.map(row => {
        const higher = new Set(data.employes.filter(other => other[1] === row[1] && other[2] > row[2]).map(other => other[2]));
        return [row[1], row[0], row[2], higher.size + 1];
      }).filter(row => row[3] <= 2);
      return select(['departement', 'nom', 'salaire', 'rang'], sorted(values, [[0, 1], [3, 1], [1, 1]]));
    }
    case 'sql3-c4-e3': {
      const pending = data.organigramme.filter(row => row[2] === null).map(row => [row[0], row[1], 1]);
      const values = [];
      while (pending.length) {
        const entry = pending.shift();
        values.push(entry);
        if (values.length > data.organigramme.length) throw new Error('Organigramme cyclique ou identifiants dupliqués');
        for (const child of data.organigramme.filter(row => row[2] === entry[0])) pending.push([child[0], child[1], entry[2] + 1]);
      }
      return select(['id', 'nom', 'niveau'], sorted(values, [[2, 1], [0, 1]]));
    }
    case 'sql3-c5-e1': return accountTrigger(fixture, 'fraud');
    case 'sql3-c5-e2': return rlsView(fixture);
    case 'sql3-c5-e3': return statisticsTrigger(fixture);
    case 'sql3-c6-e1': {
      const groups = new Map();
      for (const row of data.mesures_iot) {
        const partition = `p_q${Math.floor((row[1] - 1) / 3) + 1}`;
        if (!groups.has(partition)) groups.set(partition, []);
        groups.get(partition).push(row[2]);
      }
      const values = [...groups].map(([partition, measures]) => [partition, measures.length, total(measures)]);
      return select(['partition_cible', 'nb_lignes', 'total_valeurs'], sorted(values, [[0, 1]]));
    }
    case 'sql3-c6-e2': {
      const values = data.pg_stat_replication_sim.map(row => [row[0], row[3], row[1] - row[2]]);
      return select(['application_name', 'sync_state', 'lag_mb'], sorted(values, [[2, -1], [0, 1]]));
    }
    case 'sql3-c6-e3': {
      const eligible = data.cluster_nodes.filter(row => row[1] === 'REPLICA' && row[2] === 1);
      const best = sorted(eligible, [[3, -1], [4, -1]]).slice(0, 1).map(row => [row[0], row[3], row[4]]);
      return select(['node_name', 'received_lsn', 'priority'], best);
    }
    default: throw new Error(`Oracle absent pour ${id}`);
  }
}

module.exports = { buildOracle };

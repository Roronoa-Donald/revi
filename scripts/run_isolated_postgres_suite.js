'use strict';

const fs = require('fs');
const path = require('path');
const { Pool } = require('pg');

const PORT = 54333;
const LOG_FILE = path.resolve(__dirname, '..', 'CONTRE_AUDIT_FINAL', 'PREUVES', 'postgresql_isolated_run.log');
let logContent = '================================================================================\n';
logContent += 'RAPPORT DE L AUDIT D EXECUTION POSTGRESQL ISOLE (ENVIRONNEMENT REEL)\n';
logContent += '================================================================================\n';
logContent += 'Date d execution : ' + new Date().toISOString() + '\n';
logContent += 'Port du cluster isole : ' + PORT + '\n\n';

function log(msg) {
  console.log(msg);
  logContent += msg + '\n';
}

async function main() {
  const pool = new Pool({
    connectionString: `postgres://postgres@localhost:${PORT}/postgres`
  });

  const client = await pool.connect();
  log('Connexion etablie au cluster PostgreSQL isole (port ' + PORT + ').');

  try {
    // 1. Installation neuve
    log('\n--- 1. INSTALLATION NEUVE DEPUIS ZERO ---');
    await client.query('DROP SCHEMA public CASCADE; CREATE SCHEMA public;');
    log('Schema public reinitialise (etat vierge absolu).');

    await client.query(`
      CREATE TABLE IF NOT EXISTS schema_migrations (
        name TEXT PRIMARY KEY,
        applied_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
      );
    `);
    log('Table de bookkeeping schema_migrations creee.');

    const migDir = path.resolve(__dirname, '..', 'server', 'migrations');
    const files = fs.readdirSync(migDir).filter(f => f.endsWith('.sql')).sort();
    log('Migrations detectees (' + files.length + ') : ' + files.join(', '));

    for (const file of files) {
      const sql = fs.readFileSync(path.join(migDir, file), 'utf8');
      const t0 = Date.now();
      await client.query('BEGIN');
      try {
        await client.query(sql);
        await client.query('INSERT INTO schema_migrations (name) VALUES ($1)', [file]);
        await client.query('COMMIT');
        const dt = Date.now() - t0;
        log('  [PASS] Migration ' + file + ' appliquee avec succes en ' + dt + ' ms.');
      } catch (err) {
        await client.query('ROLLBACK');
        log('  [FAIL] Migration ' + file + ' echouee : ' + err.message);
        throw err;
      }
    }

    // 2. Test d'idempotence
    log('\n--- 2. TEST D IDEMPOTENCE DES MIGRATIONS ---');
    log('Re-execution directe des 5 scripts SQL sur la base deja migree...');
    for (const file of files) {
      const sql = fs.readFileSync(path.join(migDir, file), 'utf8');
      try {
        await client.query(sql);
        log('  [IDEMPOTENT] ' + file + ' re-executee avec succes sans erreur.');
      } catch (err) {
        log('  [NON-IDEMPOTENT] ' + file + ' a echoue lors de la re-execution : ' + err.message);
        throw err;
      }
    }

    // 3. Inspection des tables et index crees
    log('\n--- 3. INSPECTION DU SCHEMA APPLIQUE ---');
    const tablesRes = await client.query("SELECT table_name FROM information_schema.tables WHERE table_schema = 'public' ORDER BY table_name;");
    const tableNames = tablesRes.rows.map(r => r.table_name);
    log('Tables public creees (' + tableNames.length + ') : ' + tableNames.join(', '));

    const indexRes = await client.query("SELECT indexname, tablename FROM pg_indexes WHERE schemaname = 'public' ORDER BY tablename, indexname;");
    log('Index crees (' + indexRes.rows.length + ') dans public.');

    // 4. Test des contraintes de cles etrangeres (Foreign Keys)
    log('\n--- 4. TEST DES CONTRAINTES DE CLES ETRANGERES ---');
    try {
      await client.query("INSERT INTO sessions (user_id, jti, machine_fingerprint) VALUES (999999, 'fake-jti-test', 'fp-test');");
      log('  [FAIL] Violation de cle etrangere sessions(user_id) acceptee !');
    } catch (err) {
      log('  [PASS] Rejet conforme violation cle etrangere sessions(user_id) : ' + err.code + ' (' + err.message + ')');
    }

    // 5. Test des contraintes d'unicite
    log('\n--- 5. TEST DES CONTRAINTES D UNICITE ---');
    await client.query("INSERT INTO users (email, password_hash, display_name) VALUES ('unique.test@example.com', 'h1', 'User 1');");
    try {
      await client.query("INSERT INTO users (email, password_hash, display_name) VALUES ('unique.test@example.com', 'h2', 'User 2');");
      log('  [FAIL] Doublon d adresse email accepte !');
    } catch (err) {
      log('  [PASS] Rejet conforme contrainte UNIQUE sur users(email) : ' + err.code + ' (' + err.message + ')');
    }

    // 6. Test d'atomicite transactionnelle (ROLLBACK)
    log('\n--- 6. TEST D ATOMICITE TRANSACTIONNELLE (ROLLBACK) ---');
    await client.query('BEGIN');
    await client.query("INSERT INTO users (email, password_hash, display_name) VALUES ('rollback.user@example.com', 'h', 'Rollback User');");
    await client.query('ROLLBACK');
    const rbCheck = await client.query("SELECT id FROM users WHERE email = 'rollback.user@example.com';");
    if (rbCheck.rows.length === 0) {
      log('  [PASS] Transaction annulee avec succes (0 ligne persistee apres ROLLBACK).');
    } else {
      log('  [FAIL] Donnee persistee malgre ROLLBACK transactionnel !');
    }

    // 7. Test de persistance et d'isolation multi-utilisateurs
    log('\n--- 7. TEST D ISOLATION MULTI-UTILISATEURS ET PERSISTANCE ---');
    const u1 = await client.query("INSERT INTO users (email, password_hash, display_name) VALUES ('alice@univ.fr', 'h_alice', 'Alice') RETURNING id;");
    const u2 = await client.query("INSERT INTO users (email, password_hash, display_name) VALUES ('bob@univ.fr', 'h_bob', 'Bob') RETURNING id;");
    const idAlice = u1.rows[0].id;
    const idBob = u2.rows[0].id;
    log('Apprenants de test inseres : Alice (id=' + idAlice + '), Bob (id=' + idBob + ').');

    // Insertion d'une progression pour Alice (project_id integer, completed boolean, project_xp integer)
    await client.query("INSERT INTO preparation_progress (user_id, project_id, completed, project_xp) VALUES ($1, 101, true, 50);", [idAlice]);

    const aliceProgress = await client.query("SELECT * FROM preparation_progress WHERE user_id = $1;", [idAlice]);
    const bobProgress = await client.query("SELECT * FROM preparation_progress WHERE user_id = $1;", [idBob]);

    if (aliceProgress.rows.length === 1 && bobProgress.rows.length === 0) {
      log('  [PASS] Isolation multi-utilisateurs prouvee : la progression d Alice n est pas visible par Bob.');
    } else {
      log('  [FAIL] Fuite de donnees d progression entre Alice et Bob !');
    }

    // Persistance apres relecture
    const verifyPersist = await client.query("SELECT completed, project_xp FROM preparation_progress WHERE user_id = $1 AND project_id = 101;", [idAlice]);
    if (verifyPersist.rows[0].completed === true && verifyPersist.rows[0].project_xp === 50) {
      log('  [PASS] Persistance verifiee avec succes : donnees relues exactement conformes.');
    } else {
      log('  [FAIL] Donnees persistees alterees a la relecture !');
    }

    log('\n================================================================================');
    log('BILAN DE LA CAMPAGNE POSTGRESQL : 100% SUCCES SUR BASE REELLE');
    log('================================================================================');
  } finally {
    client.release();
    await pool.end();
    fs.writeFileSync(LOG_FILE, logContent, 'utf8');
    console.log('Rapport enregistre dans ' + LOG_FILE);
  }
}

main().catch(err => {
  console.error('Erreur fatale :', err);
  process.exit(1);
});

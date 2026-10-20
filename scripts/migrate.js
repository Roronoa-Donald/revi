#!/usr/bin/env node
/**
 * scripts/migrate.js — Runner de migrations PostgreSQL
 * =====================================================
 * Applique, dans l'ordre, les fichiers server/migrations/NNN_*.sql non
 * encore enregistrés dans schema_migrations. Une transaction par fichier.
 *
 * Usage :
 *   npm run db:migrate                     (fail-loud : échoue si DB injoignable)
 *   MIGRATE_FAIL_OPEN=1 npm run db:migrate (warning + continue sans migrer)
 *
 * Câblé :
 *   - Vercel : buildCommand = "node scripts/migrate.js && node scripts/build.js"
 *     → la DB est au bon format AVANT la mise en ligne.
 *   - Render postdeploy (option) : même commande.
 *   - Runtime : server/db.js initDB() consomme le MÊME dossier de migrations
 *     (filet de sécurité au cold start — un seul format, zéro divergence).
 *
 * Idempotent : re-exécuter = 0 applied.
 */

require('dotenv').config();
const fs = require('fs');
const path = require('path');
const { Pool } = require('pg');

const MIGRATIONS_DIR = path.resolve(__dirname, '..', 'server', 'migrations');
const FAIL_OPEN = process.env.MIGRATE_FAIL_OPEN === '1';

function log(msg) { console.log(`  ${msg}`); }

function listMigrationFiles() {
  if (!fs.existsSync(MIGRATIONS_DIR)) return [];
  return fs.readdirSync(MIGRATIONS_DIR)
    .filter(f => f.endsWith('.sql') && /^\d{3}_/.test(f))
    .sort(); // ordre lexicographique = ordre d'exécution
}

function buildPool() {
  const dbUrl = process.env.DATABASE_URL || '';
  if (!dbUrl) return null;
  const needsSSL = dbUrl.includes('sslmode=require') || dbUrl.includes('sslmode=verify') || process.env.NODE_ENV === 'production';
  const cleanUrl = dbUrl.replace(/[?&]sslmode=[^&]*/g, '').replace(/\?$/, '');
  return new Pool({
    connectionString: cleanUrl,
    ssl: needsSSL ? { rejectUnauthorized: false } : false,
    connectionTimeoutMillis: 15000,
    max: 2
  });
}

async function migrate() {
  const files = listMigrationFiles();
  log(` Migrations détectées : ${files.length ? files.join(', ') : '(aucune)'}`);

  const pool = buildPool();
  if (!pool) {
    const msg = ' DATABASE_URL absente — impossible de migrer.';
    if (FAIL_OPEN) { log(`  MIGRATE_FAIL_OPEN=1 → ${msg} Le build continue SANS migration.`); return 0; }
    console.error(msg);
    console.error('   Ajoutez DATABASE_URL dans les Environment Variables Vercel (Production).');
    console.error('   Pour un preview sans DB : MIGRATE_FAIL_OPEN=1.');
    return 1;
  }

  const client = await pool.connect();
  try {
    // Bookkeeping (créé aussi par 001 pour les bases vierges, mais on le veut avant tout)
    await client.query(`
      CREATE TABLE IF NOT EXISTS schema_migrations (
        name TEXT PRIMARY KEY,
        applied_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
      );
    `);

    const { rows } = await client.query('SELECT name FROM schema_migrations');
    const applied = new Set(rows.map(r => r.name));

    let appliedCount = 0;
    for (const file of files) {
      if (applied.has(file)) {
        log(`  ${file} — déjà appliquée`);
        continue;
      }
      const sql = fs.readFileSync(path.join(MIGRATIONS_DIR, file), 'utf8');
      await client.query('BEGIN');
      try {
        await client.query(sql);
        await client.query('INSERT INTO schema_migrations (name) VALUES ($1)', [file]);
        await client.query('COMMIT');
        appliedCount += 1;
        log(` ${file} — appliquée`);
      } catch (err) {
        await client.query('ROLLBACK');
        throw new Error(`Échec de ${file}: ${err.message}`);
      }
    }

    log(` Terminé : ${appliedCount} appliquée(s), ${files.length - appliedCount} déjà en place.`);
    return 0;
  } finally {
    client.release();
    await pool.end();
  }
}

migrate()
  .then(code => process.exit(code))
  .catch(err => {
    console.error(' Migration échouée :', err.message);
    if (FAIL_OPEN) {
      console.error('  MIGRATE_FAIL_OPEN=1 → le build continue SANS migration appliquée.');
      process.exit(0);
    }
    console.error('   Le build échoue (fail-loud). Déployer sans schéma à jour est pire qu\'un build rouge.');
    process.exit(1);
  });

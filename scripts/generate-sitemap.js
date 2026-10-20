#!/usr/bin/env node
/**
 * scripts/generate-sitemap.js
 *
 * Génère automatiquement sitemap.xml à partir de la liste canonique des cours
 * (server/courses.js) et de leurs pages publiques (accueil + chapitre 1 gratuit).
 *
 * Usage :
 *   node scripts/generate-sitemap.js          → écrit sitemap.xml
 *   node scripts/generate-sitemap.js --check  → vérifie la synchronisation
 */
'use strict';

const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const registry = require(path.join(ROOT, 'server', 'courses.js'));
const TARGET = path.join(ROOT, 'sitemap.xml');
const BASE_URL = 'https://revi-mu.vercel.app';

const CHECK = process.argv.includes('--check');

function generateSitemapXml() {
  const urls = [
    '  <url><loc>' + BASE_URL + '/</loc><changefreq>weekly</changefreq><priority>1.0</priority></url>',
    '  <url><loc>' + BASE_URL + '/preparation-web/index.html</loc><changefreq>weekly</changefreq><priority>0.9</priority></url>'
  ];

  for (const courseId of registry.COURSE_DIRS) {
    const courseDir = path.join(ROOT, courseId);
    const encodedId = encodeURI(courseId);

    // Page d'accueil du cours
    if (fs.existsSync(path.join(courseDir, 'index.html'))) {
      urls.push('  <url><loc>' + BASE_URL + '/' + encodedId + '/index.html</loc><priority>0.8</priority></url>');
    }

    // Chapitre 1 (gratuit et accessible publiquement sans clé)
    if (fs.existsSync(path.join(courseDir, 'chapitres', 'chapitre1.html'))) {
      urls.push('  <url><loc>' + BASE_URL + '/' + encodedId + '/chapitres/chapitre1.html</loc><priority>0.7</priority></url>');
    }

    // Sommaire du cours
    if (fs.existsSync(path.join(courseDir, 'sommaire.html'))) {
      urls.push('  <url><loc>' + BASE_URL + '/' + encodedId + '/sommaire.html</loc><priority>0.6</priority></url>');
    }
  }

  // Pages additionnelles publiques
  const extraPages = [
    { file: 'preparation-cheatsheet.html', priority: '0.6' },
    { file: 'preparation-progression.html', priority: '0.5' },
    { file: 'preparation-classement.html', priority: '0.5' }
  ];

  for (const extra of extraPages) {
    if (fs.existsSync(path.join(ROOT, extra.file))) {
      urls.push('  <url><loc>' + BASE_URL + '/' + extra.file + '</loc><priority>' + extra.priority + '</priority></url>');
    }
  }

  return [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    urls.join('\n'),
    '</urlset>',
    ''
  ].join('\n');
}

const content = generateSitemapXml();

if (CHECK) {
  if (!fs.existsSync(TARGET) || fs.readFileSync(TARGET, 'utf8') !== content) {
    console.error('[!!] sitemap.xml désynchronisé — exécuter : node scripts/generate-sitemap.js');
    process.exit(1);
  }
  console.log('[ok] sitemap.xml est synchronisé avec les ' + registry.COURSE_DIRS.length + ' cours.');
} else {
  fs.writeFileSync(TARGET, content, 'utf8');
  console.log('[ok] sitemap.xml régénéré pour ' + registry.COURSE_DIRS.length + ' cours.');
}

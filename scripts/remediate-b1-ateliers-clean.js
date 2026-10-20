#!/usr/bin/env node
/**
 * scripts/remediate-b1-ateliers-clean.js
 *
 * Transforme proprement la fonction atelier(course) dans tous les cours B1 non-informatiques.
 */
'use strict';

const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');

const B1_TARGET_FILES = [
  'server/content/b1-algebre/pages.js',
  'server/content/b1-stats/pages.js',
  'server/content/b1-merise/pages.js',
  'server/content/b1-architecture/pages.js',
  'server/content/b1-sql/pages.js',
  'server/content/b1-reseaux/pages.js',
  'server/content/b1-ccna1/pages.js',
  'server/content/b1-robotique/pages.js',
  'server/content/b1-cyber/pages.js',
  'server/content/b1-virtualisation/pages.js',
  'server/content/b1-projet/pages.js'
];

for (const rel of B1_TARGET_FILES) {
  const file = path.join(ROOT, rel);
  if (!fs.existsSync(file)) {
    console.warn(`[WARN] Absent: ${rel}`);
    continue;
  }
  let content = fs.readFileSync(file, 'utf8');

  // 1. Titre & lead
  content = content.replace(/'  <h1>Atelier de scripts<\/h1>',/g, "'  <h1>Atelier d’analyse &amp; Bac à sable</h1>',");
  content = content.replace(/'  <h1>Atelier de calcul<\/h1>',/g, "'  <h1>Atelier d’analyse &amp; Bac à sable</h1>',");
  content = content.replace(
    /'  <p class="lead">Un éditeur dans la page, un vrai interpréteur Bash derrière[^']*',/g,
    "'  <p class=\"lead\">Un espace d’expérimentation pour tester vos grilles d’analyse et structurer vos cas d’étude méthodiques.</p>',"
  );
  content = content.replace(
    /'  <p class="lead">Un éditeur dans la page, un interpréteur Python derrière[^']*',/g,
    "'  <p class=\"lead\">Un espace d’expérimentation pour tester vos grilles d’analyse et structurer vos cas d’étude méthodiques.</p>',"
  );

  // 2. Box instructions
  content = content.replace(
    /'      <li><strong>Exécuter<\/strong> fait tourner votre script Bash[^']*',/g,
    "'      <li><strong>Valider</strong> vérifie la conformité de vos réponses dans la grille d’analyse.</li>',"
  );
  content = content.replace(
    /'      <li><strong>Exécuter<\/strong> fait tourner votre script Python[^']*',/g,
    "'      <li><strong>Valider</strong> vérifie la conformité de vos réponses dans la grille d’analyse.</li>',"
  );
  content = content.replace(
    /'      <li><strong>Entrée du programme<\/strong> contient ce que <code>read<\/code> lira[^']*',/g,
    "'      <li><strong>Données du cas</strong> contient les paramètres soumis à l’étude.</li>',"
  );
  content = content.replace(
    /'      <li><strong>Entrée du programme<\/strong> contient ce que <code>input\(\)<\/code> lira[^']*',/g,
    "'      <li><strong>Données du cas</strong> contient les paramètres soumis à l’étude.</li>',"
  );

  // 3. Language & stdin
  content = content.replace(/'     data-language="shell"',/g, "'     data-language=\"analyse\"',");
  content = content.replace(/'     data-language="python"',/g, "'     data-language=\"analyse\"',");
  content = content.replace(/data-language="shell"/g, 'data-language="analyse"');
  content = content.replace(/data-language="python"/g, 'data-language="analyse"');
  content = content.replace(/'     data-stdin="[^"]*"'>/g, "'     data-stdin=\"cas:1\">'");

  // 4. Starter script
  content = content.replace(
    /<script type="text\/plain" data-lab-starter>[\s\S]*?<\/script>/,
    `<script type="text/plain" data-lab-starter># Zone libre : appliquez la méthodologie du cours.\\n# Rédigez votre analyse sous forme de grille structurée.\\n\\n[Cas 1 — Cas d\\\'application libre]\\n# Données :\\nA_COMPLETER\\n</script>`
  );

  // 5. Lang badge
  content = content.replace(/ic\('terminal'\)\s*\+\s*' Bash'/g, "ic('book') + ' Grille d’analyse'");
  content = content.replace(/ic\('terminal'\)\s*\+\s*' Python 3'/g, "ic('book') + ' Grille d’analyse'");
  content = content.replace(/ic\('terminal'\)\s*\+\s*' Python'/g, "ic('book') + ' Grille d’analyse'");

  // 6. Sample boxes
  content = content.replace(/<b>Entrée du programme<\/b>/g, "<b>Cas d’exemple</b>");
  content = content.replace(/<b>Sortie attendue<\/b>/g, "<b>Résolution attendue</b>");

  fs.writeFileSync(file, content, 'utf8');
  console.log(`[OK] Remédié atelier: ${rel}`);
}

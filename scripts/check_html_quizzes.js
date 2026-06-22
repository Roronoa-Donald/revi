#!/usr/bin/env node
/**
 * Script d'audit pour valider les quiz dans les fichiers HTML de chapitres.
 * Usage: node scripts/check_html_quizzes.js <course-folder-name>
 * Exemple: node scripts/check_html_quizzes.js erp-si
 */
const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');

const targetCourse = process.argv[2];
const coursesToCheck = targetCourse 
  ? [targetCourse] 
  : ['react', 'api-rest-flask', 'erp-si', 'ingenierie-besoin', 'masterclass-apprendre'];

let globalPassed = true;

const courseChapters = {
  'react': 8,
  'api-rest-flask': 6,
  'erp-si': 6,
  'ingenierie-besoin': 6,
  'masterclass-apprendre': 4
};

for (const course of coursesToCheck) {
  const dir = path.join(ROOT, course);
  const numChapters = courseChapters[course] || 6;
  console.log(`🔍 Audit Quiz HTML pour le cours [${course}] (${numChapters} chapitres)...`);

  let coursePassed = true;

  for (let chNum = 1; chNum <= numChapters; chNum++) {
    const filePath = path.join(dir, 'chapitres', `chapitre${chNum}.html`);

    if (!fs.existsSync(filePath)) {
      console.error(`  ❌ Chapitre ${chNum}: Fichier manquant (${filePath})`);
      coursePassed = false;
      continue;
    }

    try {
      const html = fs.readFileSync(filePath, 'utf-8');

      // Compter et découper les quiz cards
      const cards = html.split(/<div class="quiz-card"/);
      const cardCount = cards.length - 1;

      if (cardCount !== 5) {
        console.error(`  ❌ Chapitre ${chNum}: Contient ${cardCount} quiz cards au lieu de 5.`);
        coursePassed = false;
        continue;
      }

      for (let i = 1; i <= 5; i++) {
        const cardContent = cards[i];

        // 1. Extraire data-answer
        const answerMatch = cardContent.match(/^\s*data-answer="(\d)"/);
        if (!answerMatch) {
          console.error(`  ❌ Chapitre ${chNum} - Question ${i}: Attribut data-answer manquant ou incorrect.`);
          coursePassed = false;
          continue;
        }

        const answerIndex = parseInt(answerMatch[1], 10);
        if (answerIndex < 0 || answerIndex > 3) {
          console.error(`  ❌ Chapitre ${chNum} - Question ${i}: data-answer invalide (${answerIndex}).`);
          coursePassed = false;
        }

        // 2. Vérifier les options de bouton
        const buttonRegex = /<button class="quiz-option" data-index="(\d)">/g;
        let match;
        const indices = [];
        while ((match = buttonRegex.exec(cardContent)) !== null) {
          indices.push(parseInt(match[1], 10));
        }

        if (indices.length !== 4) {
          console.error(`  ❌ Chapitre ${chNum} - Question ${i}: Contient ${indices.length} options au lieu de 4.`);
          coursePassed = false;
        } else {
          // Vérifier que les indices sont bien [0, 1, 2, 3]
          const expectedIndices = [0, 1, 2, 3];
          const hasAll = expectedIndices.every(val => indices.includes(val));
          if (!hasAll) {
            console.error(`  ❌ Chapitre ${chNum} - Question ${i}: Les indices d'options ne correspondent pas à 0, 1, 2, 3. Reçus : ${JSON.stringify(indices)}`);
            coursePassed = false;
          }
          // Vérifier que data-answer cible un des indices existants
          if (!indices.includes(answerIndex)) {
            console.error(`  ❌ Chapitre ${chNum} - Question ${i}: La bonne réponse (${answerIndex}) ne cible aucune option disponible.`);
            coursePassed = false;
          }
        }

        // 3. Vérifier l'explication
        const explainMatch = cardContent.match(/<div class="quiz-explain">([\s\S]*?)<\/div>/);
        if (!explainMatch) {
          console.error(`  ❌ Chapitre ${chNum} - Question ${i}: Bloc quiz-explain manquant.`);
          coursePassed = false;
        } else {
          const explanationText = explainMatch[1].replace(/<strong>Correction :<\/strong>/, '').trim();
          if (explanationText === '') {
            console.error(`  ❌ Chapitre ${chNum} - Question ${i}: L'explication est vide.`);
            coursePassed = false;
          }
        }
      }
    } catch (err) {
      console.error(`  ❌ Chapitre ${chNum}: Erreur de lecture/analyse : ${err.message}`);
      coursePassed = false;
    }
  }

  if (coursePassed) {
    console.log(`  ✅ SUCCESS: Le cours [${course}] a passé l'audit HTML avec succès.`);
  } else {
    console.error(`  ❌ FAILURE: Le cours [${course}] a des erreurs HTML.`);
    globalPassed = false;
  }
}

if (!globalPassed) {
  process.exit(1);
} else {
  console.log('\n🌟 Tous les Quiz HTML audités sont 100% conformes ! 🌟');
  process.exit(0);
}

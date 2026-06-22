#!/usr/bin/env node
/**
 * Script d'audit pour valider le fichier qcm-100.js de chaque cours.
 * Usage: node scripts/check_qcm.js <course-folder-name>
 * Exemple: node scripts/check_qcm.js erp-si
 */
const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');

const targetCourse = process.argv[2];
const coursesToCheck = targetCourse 
  ? [targetCourse] 
  : ['react', 'api-rest-flask', 'erp-si', 'ingenierie-besoin', 'masterclass-apprendre'];

let globalPassed = true;

for (const course of coursesToCheck) {
  const qcmPath = path.join(ROOT, course, 'qcm-100.js');
  console.log(`🔍 Audit QCM pour le cours [${course}] (${qcmPath})...`);

  if (!fs.existsSync(qcmPath)) {
    console.error(`❌ Erreur: Le fichier n'existe pas : ${qcmPath}`);
    globalPassed = false;
    continue;
  }

  try {
    const content = fs.readFileSync(qcmPath, 'utf-8');
    const marker = 'window.COURSE_QCM =';
    const index = content.indexOf(marker);
    if (index === -1) {
      throw new Error(`Le fichier n'a pas la variable globale ${marker}`);
    }

    let jsonStr = content.substring(index + marker.length).trim();
    // Enlever le point-virgule final s'il existe
    if (jsonStr.endsWith(';')) {
      jsonStr = jsonStr.slice(0, -1).trim();
    }

    const questions = JSON.parse(jsonStr);

    if (!Array.isArray(questions)) {
      throw new Error("Le contenu extrait n'est pas un tableau.");
    }

    if (questions.length !== 100) {
      throw new Error(`Le tableau contient ${questions.length} questions au lieu de 100.`);
    }

    const seenIds = new Set();
    const seenQuestions = new Set();
    let coursePassed = true;

    for (let i = 0; i < questions.length; i++) {
      const qObj = questions[i];
      const qIndex = i + 1;

      // 1. Structure de base
      if (typeof qObj !== 'object' || qObj === null) {
        console.error(`  ❌ Question #${qIndex}: N'est pas un objet valide.`);
        coursePassed = false;
        continue;
      }

      const { id, ch, q, o, a, e } = qObj;

      // 2. Validation de l'ID
      if (typeof id !== 'number' || id !== qIndex) {
        console.error(`  ❌ Question #${qIndex}: ID incorrect (${id} au lieu de ${qIndex}).`);
        coursePassed = false;
      }
      if (seenIds.has(id)) {
        console.error(`  ❌ Question #${qIndex}: ID en double (${id}).`);
        coursePassed = false;
      }
      seenIds.add(id);

      // 3. Chapitre
      if (typeof ch !== 'number' || ch < 1 || ch > 8) {
        console.error(`  ❌ Question #${qIndex}: Chapitre invalide (${ch}).`);
        coursePassed = false;
      }

      // 4. Libellé de la question
      if (typeof q !== 'string' || q.trim() === '') {
        console.error(`  ❌ Question #${qIndex}: La question est vide.`);
        coursePassed = false;
      } else {
        if (seenQuestions.has(q)) {
          console.error(`  ❌ Question #${qIndex}: Libellé en double ("${q}").`);
          coursePassed = false;
        }
        seenQuestions.add(q);
      }

      // 5. Options
      if (!Array.isArray(o) || o.length !== 4) {
        console.error(`  ❌ Question #${qIndex}: Doit contenir exactement 4 options.`);
        coursePassed = false;
      } else {
        const uniqueOptions = new Set(o);
        if (uniqueOptions.size !== 4) {
          console.error(`  ❌ Question #${qIndex}: Contient des options en double : ${JSON.stringify(o)}`);
          coursePassed = false;
        }

        // Vérifier les placeholders génériques
        const genericPlaceholders = [
          'reponse vague',
          'une reponse vague',
          'detail sans lien',
          'un detail sans lien',
          'confusion frequente',
          'une confusion frequente',
          'reponse vague non mesurable',
          'une reponse vague non mesurable',
          'detail sans lien avec le cours',
          'un detail sans lien avec le cours',
          'confusion frequente a eviter',
          'une confusion frequente a eviter'
        ];

        for (const opt of o) {
          if (typeof opt !== 'string' || opt.trim() === '') {
            console.error(`  ❌ Question #${qIndex}: Option vide detectée.`);
            coursePassed = false;
          } else {
            const cleanOpt = opt.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").trim();
            if (genericPlaceholders.includes(cleanOpt)) {
              console.error(`  ❌ Question #${qIndex}: Option générique trouvée ("${opt}").`);
              coursePassed = false;
            }
          }
        }
      }

      // 6. Indice de la bonne réponse
      if (typeof a !== 'number' || a < 0 || a > 3) {
        console.error(`  ❌ Question #${qIndex}: L'indice de bonne réponse 'a' est invalide (${a}).`);
        coursePassed = false;
      }

      // 7. Explication
      if (typeof e !== 'string' || e.trim() === '') {
        console.error(`  ❌ Question #${qIndex}: L'explication 'e' est vide.`);
        coursePassed = false;
      }
    }

    if (coursePassed) {
      console.log(`  ✅ SUCCESS: Le cours [${course}] a passé l'audit avec succès.`);
    } else {
      console.error(`  ❌ FAILURE: Le cours [${course}] a des erreurs.`);
      globalPassed = false;
    }

  } catch (err) {
    console.error(`  ❌ Erreur critique lors de la lecture/validation de [${course}]: ${err.message}`);
    globalPassed = false;
  }
}

if (!globalPassed) {
  process.exit(1);
} else {
  console.log('\n🌟 Tous les QCM audités sont 100% conformes ! 🌟');
  process.exit(0);
}

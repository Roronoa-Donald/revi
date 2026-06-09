const fs = require('fs');
let code = fs.readFileSync('preparation-web/assets/js/app.js', 'utf8');

const strRegex = /function clampStepIndex[\s\S]*?function currentProgress/m;
const rep = `function clampStepIndex(project, progress) {
      const steps = lessonSteps(project);
      const current = Number(progress.lessonStep || 0);
      return Math.min(Math.max(current, 0), Math.max(steps.length - 1, 0));
    }

    function buildMiniCourse(project, stepText) {
      if (project.pedagogy) {
        return project.pedagogy;
      }
      const intro = project.description || '';
      return \`
        <h3>Mini-cours</h3>
        <p>\${escapeHtml(intro)}</p>
      \`;
    }

    function buildExercise(project, stepText) {
      return \`
        <h3>Exercice etape par etape</h3>
        <p>\${escapeHtml(stepText)}</p>
      \`;
    }

    function renderLesson(project) {
      const progress = currentProgress();
      const steps = lessonSteps(project);
      const stepIndex = clampStepIndex(project, progress);
      const stepText = steps[stepIndex] || steps[0];

      progress.lessonStep = stepIndex;
      refs.lessonTitle.textContent = project.title;
      refs.lessonMiniCourse.innerHTML = buildMiniCourse(project, stepText);
      refs.lessonExercise.innerHTML = buildExercise(project, stepText);
      refs.stepIndicator.textContent = \`Etape \${stepIndex + 1}/\${steps.length}\`;
    }

    function currentProgress`;

code = code.replace(strRegex, rep);

fs.writeFileSync('preparation-web/assets/js/app.js', code);
console.log('Fixed renderLesson 5th time');

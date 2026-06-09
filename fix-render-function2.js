const fs = require('fs');
let code = fs.readFileSync('preparation-web/assets/js/app.js', 'utf8');

const targetRegex = /    function buildExercise\(project, stepText\) \{[\s\S]*?function currentProgress\(\)/m;

code = code.replace(targetRegex,
`    function buildExercise(project, stepText) {
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

    function currentProgress()`);

fs.writeFileSync('preparation-web/assets/js/app.js', code);
console.log('Fixed renderLesson actually');

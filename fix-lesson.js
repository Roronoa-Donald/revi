const fs = require('fs');
let code = fs.readFileSync('preparation-web/assets/js/app.js', 'utf8');

code = code.replace(
/function lessonSteps\(project\) \{[\s\S]*?    \}/m,
`function lessonSteps(project) {
      if (project.steps && project.steps.length) return project.steps;
      const lesson = project.lesson || {};
      return lesson.steps && lesson.steps.length ? lesson.steps : [project.checkInstructions || project.description || 'Suis la consigne et valide le projet.'];
    }`
);

code = code.replace(
/function buildExercise\(project, stepText\) \{[\s\S]*?    \}/m,
`function buildExercise(project, stepText) {
      return \`
        <h3>Exercice etape par etape</h3>
        <p>\${escapeHtml(stepText)}</p>
      \`;
    }`
);

fs.writeFileSync('preparation-web/assets/js/app.js', code);
console.log('Fixed lesson rendering');

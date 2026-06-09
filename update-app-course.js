const fs = require('fs');
let code = fs.readFileSync('preparation-web/assets/js/app.js', 'utf8');

code = code.replace(
/  function buildMiniCourse\(project, stepText\) \{[\s\S]*?    `;\n  \}/m,
`  function buildMiniCourse(project, stepText) {
    if (project.pedagogy) {
      return project.pedagogy;
    }
    const intro = project.description || '';
    return \`
      <h3>Mini-cours</h3>
      <p>\${escapeHtml(intro)}</p>
    \`;
  }`
);

fs.writeFileSync('preparation-web/assets/js/app.js', code);
console.log('Done mini course');

const fs = require('fs');
let code = fs.readFileSync('preparation-web/assets/js/app.js', 'utf8');

code = code.replace(
/const css = state\.previewCssEnabled \? \(project\.starterCss \|\| ''\) : '';/g,
`const css = state.previewCssEnabled ? (project.providedCss || project.starterCss || '') : '';`
);

fs.writeFileSync('preparation-web/assets/js/app.js', code);
console.log('Fixed preview css');

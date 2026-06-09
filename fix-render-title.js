const fs = require('fs');
let code = fs.readFileSync('preparation-web/assets/js/app.js', 'utf8');

code = code.replace(
/refs\.previewTitle\.textContent = project\.summary;/g,
`refs.previewTitle.textContent = project.description || '';`
);
code = code.replace(
/refs\.cssEditor\.value = project\.starterCss \|\| '';/g,
`refs.cssEditor.value = project.providedCss || project.starterCss || '';`
);

fs.writeFileSync('preparation-web/assets/js/app.js', code);
console.log('Fixed render title and css');

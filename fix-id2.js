const fs = require('fs');
let code = fs.readFileSync('preparation-web/assets/js/app.js', 'utf8');

code = code.replace(
/state\.currentId = Number\(local\.currentId\);/g,
`state.currentId = local.currentId;`
);

code = code.replace(
/const id = Number\(button\.dataset\.projectId\);/g,
`const id = button.dataset.projectId;`
);

fs.writeFileSync('preparation-web/assets/js/app.js', code);
console.log('Fixed ids 2');

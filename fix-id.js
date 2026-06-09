const fs = require('fs');
let code = fs.readFileSync('preparation-web/assets/js/app.js', 'utf8');

code = code.replace(
/currentId: 1,/g,
`currentId: projects.length > 0 ? projects[0].id : 1,`
);

code = code.replace(
/function projectById\(id\) \{\s*return projects\.find\(\(project\) => project\.id === Number\(id\)\);\s*\}/g,
`function projectById(id) {
      return projects.find((project) => String(project.id) === String(id));
    }`
);

fs.writeFileSync('preparation-web/assets/js/app.js', code);
console.log('Fixed ids');

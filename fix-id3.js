const fs = require('fs');
let code = fs.readFileSync('preparation-web/assets/js/app.js', 'utf8');

code = code.replace(
/if \(!completedBefore\(state\.currentId\)\) state\.currentId = maxUnlocked;\s*renderAll\(\);/m,
`if (!completedBefore(state.currentId)) state.currentId = maxUnlocked;
    if (!projectById(state.currentId) && projects.length > 0) {
      state.currentId = projects[0].id; // Fallback for invalid local storage
    }
    renderAll();`
);

fs.writeFileSync('preparation-web/assets/js/app.js', code);
console.log('Fixed ids 3');

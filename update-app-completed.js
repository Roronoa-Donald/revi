const fs = require('fs');
let code = fs.readFileSync('preparation-web/assets/js/app.js', 'utf8');

code = code.replace(
/function completedBefore\(projectId\) \{[\s\S]*?return true;\s*\}/m,
`function completedBefore(projectId) {
      const idx = projects.findIndex(p => p.id === projectId);
      if (idx <= 0) return true; // first project is always unlocked
      for (let i = 0; i < idx; i++) {
        const id = projects[i].id;
        if (!state.progress[id] || !state.progress[id].completed) return false;
      }
      return true;
    }`
);

fs.writeFileSync('preparation-web/assets/js/app.js', code);
console.log('Done completedBefore');

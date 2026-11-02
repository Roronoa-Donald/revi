const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '../..');
const courses = ['b3-github', 'b3-linux', 'b3-sql'];
const results = [];

for (const course of courses) {
  for (let chapter = 1; chapter <= 6; chapter += 1) {
    const file = `${course}/chapitres/chapitre${chapter}.html`;
    const lines = fs.readFileSync(path.join(root, file), 'utf8').split('\n');
    const objectiveLine = lines.findIndex((line) => /développer en Python (?:3|des)/i.test(line));
    if (objectiveLine < 0) continue;
    const labs = lines.flatMap((line, index) => {
      const match = line.match(/data-language="([^"]+)"/);
      return match ? [{ line: index + 1, language: match[1] }] : [];
    });
    results.push({ file, objectiveLine: objectiveLine + 1, announced: 'python', labs });
  }
}

const output = path.join(root, 'verification/13-alignement-langues.json');
fs.writeFileSync(output, `${JSON.stringify(results, null, 2)}\n`);
console.log(`${results.length} chapitres avec objectif Python ; langues des ateliers : ${courses.map((course) => {
  const matches = results.filter((row) => row.file.startsWith(`${course}/`));
  return `${course}=${matches.length}(${[...new Set(matches.flatMap((row) => row.labs.map((lab) => lab.language)))].join(',')})`;
}).join(' ; ')}`);

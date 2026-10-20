'use strict';
const fs = require('fs');

const ICONS = {
  linux: 'terminal', php: 'code', probabilites: 'chart', rd_java: 'code', rd_winserver: 'cpu', 'admin-vm': 'blocks',
  droit: 'scale', react: 'code', 'api-rest-flask': 'code', 'erp-si': 'blocks', 'ingenierie-besoin': 'clipboard',
  'masterclass-apprendre': 'graduation', 'RD-RO': 'chart', assembleur: 'cpu', 'Cyber securite B2': 'shield',
  sql: 'database', csharp: 'code', ccna: 'globe', uml: 'layers', uiux: 'palette', docker: 'blocks',
  infographie: 'image', 'preparation-web': 'code', epreuves: 'file',
  'b1-admin-windows': 'cpu', 'b1-algebre': 'calculator', 'b1-algo': 'code', 'b1-anglais': 'book', 'b1-reseaux': 'globe',
  'b1-bureautique': 'chart', 'b1-ccna1': 'globe', 'b1-architecture': 'cpu', 'b1-robotique': 'blocks', 'b1-cyber': 'shield',
  'b1-droit': 'scale', 'b1-fr-pro': 'book', 'b1-git': 'code', 'b1-c-cpp': 'code', 'b1-linux': 'terminal', 'b1-merise': 'database',
  'b1-php': 'code', 'b1-prog-web': 'code', 'b1-projet': 'folder', 'b1-python': 'code', 'b1-sql': 'database', 'b1-stats': 'chart',
  'b1-vb-excel': 'chart', 'b1-virtualisation': 'vm',
  'b3-algo': 'code', 'b3-cloud-computing': 'cloud', 'b3-devops': 'layers', 'b3-document-technique': 'file',
  'b3-etude-quantitative': 'chart', 'b3-firewall': 'shield', 'b3-github': 'code', 'b3-linux': 'terminal', 'b3-agile': 'layers',
  'b3-pfsense': 'shield', 'b3-reseau-lan': 'globe', 'b3-sql': 'database', 'b3-veille': 'search', 'b3-windows-server': 'cpu',
  'b3-anglais': 'book', 'b3-cloud-azure': 'cloud', 'b3-cryptographie': 'lock', 'b3-google-cloud': 'cloud', 'b3-hacking': 'shield',
  'b3-cloud-aws': 'cloud', 'b3-supervision': 'chart', 'b3-voip': 'wifi', 'b3-virtualisation': 'vm'
};

const file = 'server/courses.js';
let src = fs.readFileSync(file, 'utf8');
let done = 0, missing = [];

for (const [id, icon] of Object.entries(ICONS)) {
  const esc = id.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const re = new RegExp("'" + esc + "'\\s*:\\s*\\{[^}]*?icon:\\s*'[^']*'", 's');
  if (re.test(src)) {
    src = src.replace(re, (m) => m.replace(/icon:\s*'[^']*'/, "icon: '" + icon + "'"));
    done++;
  } else {
    missing.push(id);
  }
}

fs.writeFileSync(file, src, 'utf8');
console.log('icons mis à jour:', done, missing.length ? ('| manquants: ' + missing.join(', ')) : '');

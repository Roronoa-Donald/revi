'use strict';

const fs = require('node:fs');
const path = require('node:path');

const root = path.resolve(__dirname, '../..');
const input = path.join(root, 'verification/04-erreurs-a-corriger.csv');
const output = path.join(root, 'corrections/suivi.csv');
if (fs.existsSync(output)) throw new Error('Le registre existe déjà : ne pas écraser les statuts après initialisation.');

function parseCsv(text) {
  const rows = [];
  let row = [];
  let field = '';
  let quoted = false;
  for (let index = 0; index < text.length; index++) {
    const character = text[index];
    if (quoted) {
      if (character === '"' && text[index + 1] === '"') {
        field += '"';
        index++;
      } else if (character === '"') {
        quoted = false;
      } else {
        field += character;
      }
    } else if (character === '"') {
      quoted = true;
    } else if (character === ';') {
      row.push(field);
      field = '';
    } else if (character === '\n') {
      row.push(field);
      rows.push(row);
      row = [];
      field = '';
    } else if (character !== '\r') {
      field += character;
    }
  }
  if (quoted) throw new Error('Guillemet CSV non fermé');
  if (field || row.length) {
    row.push(field);
    rows.push(row);
  }
  return rows;
}

function csv(value) {
  return '"' + String(value ?? '').replace(/"/g, '""') + '"';
}

function range(start, end) {
  return Array.from({ length: end - start + 1 }, (_, index) => start + index);
}

const groups = {
  '1A': [1, 2, 4, 23, 24, 25, 26, 27, 28, 30, 71, 145, 148, 216],
  '1B': [3, 22, 97, 101, 103, 104, 109, 112, 130, 134, 137, 139, 140, 142, 143, 169, 170, 171, 179, 183, 192, ...range(202, 210), ...range(212, 215)],
  '1C': [39],
  '1D': [5, 6, 7, 35, 60, ...range(78, 84), 224],
  '2': [
    ...range(85, 90), 92, ...range(107, 119), 205, 206, 222, 32, 68,
    19, 69, 74, ...range(138, 144), 14, 34, ...range(93, 106), ...range(147, 149), 57, 67, 220, 221, 18,
    12, 40, ...range(120, 137), ...range(150, 152), 180, 182, 183, 62, 76,
    13, 47, 53, 59, 73, 77, ...range(184, 195), 217,
    15, 16, 55, 63, 64, 72, 75, ...range(155, 157), ...range(166, 168), ...range(198, 201), 52, 42, 43,
    10, 11, 20, 21, 49, 61, ...range(170, 174), 8, 9, ...range(160, 162), ...range(175, 178),
    ...range(44, 46), 66, 70, 146, 158, 159, 202, 207, 51, 54, 154, 196, 197, 38, ...range(163, 165)
  ],
  '3': [31, 32, 33, 34, 35, 36, 37, 38, 54, 68, 70, 84, 146, ...range(163, 165), 211, 218, 219, 222, 223, 225],
  '4': [29, 30, 41, 91, 226, 227]
};

const revised = {
  F04: ['S0', 'Énoncé tronqué et structure HTML endommagée : défaut de rendu.'],
  F07: ['S0', 'Starter SQL invalide et langage annoncé incorrect : atelier dysfonctionnel.'],
  F12: ['S1', 'Formule utile pour les sous-réseaux ordinaires ; expliciter le domaine et le cas /31 point à point.'],
  F19: ['S0', 'Égalité numérique fausse entre les préfixes décimaux et binaires.'],
  F22: ['S0', 'Le correcteur accepte une réponse numérique suivie de texte invalide.'],
  F23: ['S0', 'Un paramètre de la commande disparaît du rendu.'],
  F24: ['S0', 'Des paramètres du format de sortie disparaissent du rendu.'],
  F25: ['S0', 'Formule mathématique non rendue par KaTeX.'],
  F26: ['S0', 'Formule mathématique non rendue par KaTeX.'],
  F27: ['S0', 'Un fragment de code est interprété à tort comme une formule.'],
  F28: ['S0', 'L’ancre de destination du lien est absente.'],
  F35: ['S1', 'Les indices livrent la solution et diminuent la valeur pédagogique de l’exercice.'],
  F36: ['S1', 'L’indice livre la règle à appliquer au lieu de guider le raisonnement.'],
  F37: ['S1', 'Des distracteurs invraisemblables affaiblissent la valeur pédagogique du QCM.'],
  F48: ['S0', 'git rm est présenté à tort comme créant un commit.'],
  F50: ['S0', 'Les API graphiques ne sont pas limitées aux triangles.'],
  F60: ['S1', 'Le comportement dépend des contraintes et du SGBD ; préciser les cas usuels et les exceptions.'],
  F61: ['S1', 'Le calcul AVG montré est correct ; limiter la généralisation aux agrégats concernés.'],
  F63: ['S0', 'Une isolation absolue est promise sans pouvoir être garantie.'],
  F64: ['S0', 'Une technique est présentée à tort comme immunisant un script contre toute injection.'],
  F71: ['S0', 'Le caractère sur lequel porte la question est absent du rendu.'],
  F73: ['S0', 'La couverture des journaux de certificats est présentée comme exhaustive pour les sous-domaines.'],
  F83: ['S0', 'L’ordre indiqué contredit l’ordre logique enseigné dans le même chapitre.'],
  F88: ['S0', 'Le résultat et l’exception attribués à l’expression Python sont inexacts.'],
  F91: ['S1', 'La sortie affichée et la sortie réelle diffèrent, sans modification du calcul.'],
  F92: ['S0', 'La date attribuée à la première publication de la GPL est fausse.'],
  F94: ['S0', 'Le nom de fichier est attribué à tort à l’inode.'],
  F96: ['S0', 'Le temps ctime de find est présenté à tort comme date de création.'],
  F97: ['S0', 'L’ordre des entrées de l’énoncé et de l’exemple est contradictoire.'],
  F101: ['S0', 'La correction accepte une soumission dépourvue du shebang explicitement demandé.'],
  F102: ['S0', 'L’exemple prétend obtenir des résultats différents pour deux résultats identiques.'],
  F103: ['S0', 'Les entrées autorisées contredisent l’exemple et empêchent une interprétation univoque.'],
  F104: ['S0', 'Les données disponibles ne permettent pas de déduire la réponse exigée.'],
  F106: ['S0', 'Un vérificateur dérivé est présenté comme un mot de passe chiffré.'],
  F107: ['S0', 'La condition de continuation est inversée pour la boucle Répéter.'],
  F108: ['S1', 'L’analogie fonctionne pour les opérandes positifs ; préciser la convention des signes.'],
  F109: ['S0', 'Le format de sortie de la consigne contredit l’exemple.'],
  F113: ['S0', 'La copie est généralisée à tort aux paramètres Python mutables.'],
  F117: ['S0', 'Le nombre de passages annoncé contredit le déroulement donné.'],
  F118: ['S0', 'Le squelette utilise déjà une construction explicitement interdite par la consigne.'],
  F127: ['S1', 'La catégorie recommandée est utile ; préciser le cas 10GBASE-T sur catégorie 6 et sa portée.'],
  F137: ['S0', 'Les codes de l’exemple ne respectent pas les codes autorisés par la consigne.'],
  F139: ['S0', 'Le cas fourni contredit l’affirmation que tous les résultats sont entiers.'],
  F140: ['S0', 'Le poids annoncé du bit de gauche est faux pour les longueurs autorisées.'],
  F148: ['S0', 'La commande imprimée ne peut pas être exécutée telle quelle.'],
  F152: ['S0', 'Le cas sans panne produit une valeur de réparation prétendument mesurée et une division par zéro.'],
  F153: ['S0', 'Le score CVSS nul est placé dans une catégorie incorrecte.'],
  F157: ['S0', 'Le QCM garantit un comportement de relivraison que le service ne garantit pas.'],
  F169: ['S0', 'Une variante incorrecte avec un filtre non ancré est acceptée.'],
  F170: ['S0', 'Une variante incorrecte sur la borne inclusive est acceptée.'],
  F171: ['S0', 'Une variante ne respectant pas l’ordre explicitement demandé est acceptée.'],
  F175: ['S0', 'Le titre annonce deux modalités alors que les données en présentent trois.']
};

const mitigation = new Set(['F03', 'F204', 'F212', 'F213', 'F214', 'F215']);
const rows = parseCsv(fs.readFileSync(input, 'utf8'));
const header = rows.shift();
const expectedHeader = ['id', 'localisation', 'extrait_15_mots_max', 'defaut', 'gravite', 'statut', 'impact_et_correction_minimale', 'source_web_consultee_2026-10-29'];
if (JSON.stringify(header) !== JSON.stringify(expectedHeader)) throw new Error('Schéma du registre source inattendu');
if (rows.length !== 227) throw new Error(`227 constats attendus ; ${rows.length} lus`);

const result = [[
  'id', 'gravite_initiale', 'gravite_reclassee', 'justification_gravite', 'lots_affectes', 'statut',
  'localisation_historique', 'constat_et_correction', 'fichiers_modifies', 'preuve', 'source_web_heritee_audit',
  'source_web_consultee_lot_1'
]];
const seen = new Set();
for (const row of rows) {
  const [id, location, , defect, initial, , description, source] = row;
  const number = Number(id.slice(1));
  if (!/^F\d{2,3}$/.test(id) || seen.has(id) || number < 1 || number > 227) throw new Error(`ID invalide ou dupliqué : ${id}`);
  seen.add(id);
  const lots = Object.entries(groups).filter(([, numbers]) => numbers.includes(number)).map(([name]) => name);
  if (!lots.length) lots.push(defect.includes('D13') && !defect.includes('D12') ? '4' : (defect.includes('D12') ? '2' : '3'));
  const [severity, reason] = revised[id] || [initial, {
    S0: 'Erreur factuelle ou fonctionnelle, ou réponse incorrecte acceptée : contrôle et correction requis.',
    S1: 'Précision, cadrage ou progression pédagogique à vérifier et à compléter.',
    S2: 'Confort éditorial ou de présentation à harmoniser.'
  }[initial]];
  const files = mitigation.has(id) ? 'server/exercises/grading-policy.js | server/routes/exercises.js | scripts/generate-code-labs.js | assets/js/code-lab.js | 24 chapitres générés' : '';
  const proof = mitigation.has(id) ? 'Mesure provisoire : soumissions suspendues dans quatre cours ; constat de fond non corrigé.' : '';
  result.push([id, initial, severity, reason, lots.join(' + '), 'reporté', location, description, files, proof, source, '']);
}
for (let number = 1; number <= 227; number++) {
  const id = 'F' + String(number).padStart(2, '0');
  if (!seen.has(id)) throw new Error(`Constat manquant : ${id}`);
}
fs.writeFileSync(output, result.map(row => row.map(csv).join(';')).join('\n') + '\n');
const counts = Object.create(null);
const changes = Object.create(null);
for (const row of result.slice(1)) {
  counts[row[2]] = (counts[row[2]] || 0) + 1;
  if (row[1] !== row[2]) changes[`${row[1]} → ${row[2]}`] = (changes[`${row[1]} → ${row[2]}`] || 0) + 1;
}
console.log(JSON.stringify({ entries: rows.length, statuses: { reporté: rows.length }, severity: counts, changed: changes, output: path.relative(root, output) }, null, 2));

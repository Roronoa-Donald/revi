'use strict';

const fs = require('node:fs');
const path = require('node:path');
const crypto = require('node:crypto');
const zlib = require('node:zlib');
const { once } = require('node:events');

function argumentsLigneCommande() {
  const options = {};
  for (let index = 2; index < process.argv.length; index += 2) {
    const option = process.argv[index];
    const value = process.argv[index + 1];
    if (!['--source', '--sortie'].includes(option) || !value || options[option]) {
      throw new Error('Usage : node audit-attendus-grilles-lot1-partie3.js --source <répertoire principal> --sortie <répertoire de résultats hors source>');
    }
    options[option] = value;
  }
  if (!options['--source'] || !options['--sortie']) throw new Error('Les options --source et --sortie sont obligatoires.');
  return {
    source: fs.realpathSync(options['--source']),
    sortie: fs.realpathSync(options['--sortie'])
  };
}

function dansRepertoire(chemin, racine) {
  const relatif = path.relative(racine, chemin);
  return relatif === '' || (!relatif.startsWith('..' + path.sep) && relatif !== '..' && !path.isAbsolute(relatif));
}

function somme(contenu) {
  return crypto.createHash('sha256').update(contenu).digest('hex');
}

function propriete(objet, nom) {
  if (!objet || objet.type !== 'ObjectExpression') return undefined;
  const element = objet.properties.find(item => item.type === 'Property' && !item.computed &&
    (item.key.name === nom || item.key.value === nom));
  return element && element.value;
}

function valeurLitterale(noeud, contexte) {
  if (noeud && noeud.type === 'Literal' && (noeud.value === null || ['string', 'number', 'boolean'].includes(typeof noeud.value))) {
    return noeud.value;
  }
  if (noeud && noeud.type === 'TemplateLiteral' && noeud.expressions.length === 0) return noeud.quasis[0].value.cooked;
  throw new Error(`${contexte} : valeur non littérale (${noeud ? noeud.type : 'absente'}).`);
}

function declarateurs(arbre) {
  return new Map(arbre.body.flatMap(noeud => noeud.type === 'VariableDeclaration'
    ? noeud.declarations.filter(item => item.id.type === 'Identifier').map(item => [item.id.name, item.init]) : []));
}

function exportModule(arbre, fichier) {
  const exports = arbre.body.filter(noeud => noeud.type === 'ExpressionStatement' &&
    noeud.expression.type === 'AssignmentExpression' && noeud.expression.operator === '=' &&
    noeud.expression.left.type === 'MemberExpression' && !noeud.expression.left.computed &&
    noeud.expression.left.object.name === 'module' && noeud.expression.left.property.name === 'exports');
  if (exports.length !== 1) throw new Error(`${fichier} : export statique unique introuvable.`);
  return exports[0].expression.right;
}

function verifierProjection(arbre) {
  const fonction = arbre.body.find(noeud => noeud.type === 'FunctionDeclaration' && noeud.id.name === 'toClient');
  const retour = fonction && fonction.body.body.find(noeud => noeud.type === 'ReturnStatement');
  if (!retour || retour.argument.type !== 'ObjectExpression') throw new Error('Projection toClient non reconnue.');
  const champs = retour.argument.properties.map(item => item.key && (item.key.name || item.key.value));
  const champsDirects = ['id', 'course', 'chapter', 'level', 'title', 'goal', 'brief', 'starter', 'language'];
  const estMembre = (noeud, objet, champ) => noeud && noeud.type === 'MemberExpression' && !noeud.computed &&
    noeud.object.type === 'Identifier' && noeud.object.name === objet && noeud.property.name === champ;
  const estTableauVide = noeud => noeud && noeud.type === 'ArrayExpression' && noeud.elements.length === 0;
  if (champs.some(champ => !champ) || champs.length !== champsDirects.length + 2 || new Set(champs).size !== champs.length ||
      champsDirects.some(champ => !estMembre(propriete(retour.argument, champ), 'exercise', champ)) ||
      ['expected', 'note', 'tests', 'solution'].some(champ => champs.includes(champ))) {
    throw new Error('Champs de projection à réexaminer.');
  }
  const indices = propriete(retour.argument, 'hints');
  if (!indices || indices.type !== 'LogicalExpression' || indices.operator !== '||' ||
      !estMembre(indices.left, 'exercise', 'hints') || !estTableauVide(indices.right)) {
    throw new Error('Projection des indices à réexaminer.');
  }
  const exemples = propriete(retour.argument, 'examples');
  const condition = exemples && exemples.test;
  const branche = exemples && exemples.consequent;
  const controle = condition && condition.type === 'BinaryExpression' && condition.operator === '===' &&
    estMembre(condition.left, 'exercise', 'language') && condition.right.value === 'analyse';
  const fonctionMap = branche && branche.type === 'CallExpression' && branche.callee.type === 'MemberExpression' &&
    branche.callee.property.name === 'map' && branche.arguments.length === 1 && branche.arguments[0];
  const corps = fonctionMap && fonctionMap.body;
  const champsExemple = corps && corps.type === 'ObjectExpression'
    ? corps.properties.map(item => item.key && (item.key.name || item.key.value)) : [];
  const sourceExemples = branche && branche.callee && branche.callee.object;
  const entree = propriete(corps, 'stdin');
  const testEntree = entree && entree.test;
  const entreeSure = fonctionMap && fonctionMap.type === 'ArrowFunctionExpression' && fonctionMap.params.length === 1 &&
    fonctionMap.params[0].name === 'example' && sourceExemples && sourceExemples.type === 'LogicalExpression' &&
    sourceExemples.operator === '||' && estMembre(sourceExemples.left, 'exercise', 'examples') &&
    estTableauVide(sourceExemples.right) && entree && entree.type === 'ConditionalExpression' &&
    testEntree.type === 'BinaryExpression' && testEntree.operator === '===' && testEntree.left.type === 'UnaryExpression' &&
    testEntree.left.operator === 'typeof' && estMembre(testEntree.left.argument, 'example', 'stdin') &&
    testEntree.right.value === 'string' && estMembre(entree.consequent, 'example', 'stdin') && entree.alternate.value === '';
  if (!controle || !entreeSure || champsExemple.length !== 1 || champsExemple[0] !== 'stdin') {
    throw new Error('Projection des exemples analyse non reconnue : contrôle manuel nécessaire.');
  }
  return { ligne: fonction.loc.start.line, champs, champsExempleAnalyse: champsExemple };
}

function verifierRetour(arbre) {
  const fonction = arbre.body.find(noeud => noeud.type === 'FunctionDeclaration' && noeud.id.name === 'publicFeedback');
  const branche = fonction && fonction.body.body.find(noeud => noeud.type === 'IfStatement' && noeud.test.name === 'isAnalyse');
  const retour = branche && branche.consequent.body.find(noeud => noeud.type === 'ReturnStatement');
  const stop = retour && propriete(retour.argument, 'stop');
  if (!stop || stop.type !== 'ObjectExpression') throw new Error('Branche de retour analyse non reconnue.');
  const champs = stop.properties.map(item => item.key && (item.key.name || item.key.value));
  let accesAttendu = false;
  const parcourir = noeud => {
    if (!noeud || typeof noeud !== 'object') return;
    if (noeud.type === 'MemberExpression' && !noeud.computed && noeud.property.name === 'expected') accesAttendu = true;
    for (const valeur of Object.values(noeud)) {
      if (Array.isArray(valeur)) valeur.forEach(parcourir);
      else if (valeur && typeof valeur === 'object') parcourir(valeur);
    }
  };
  parcourir(branche.consequent);
  if (JSON.stringify(champs) !== JSON.stringify(['reason', 'testIndex', 'label', 'actual', 'userMessage']) || accesAttendu) {
    throw new Error('Branche de retour analyse à réexaminer.');
  }
  return { ligne: branche.loc.start.line, champsStop: champs, accesDirectExpected: accesAttendu };
}

function attribut(noeud, nom) {
  const item = (noeud.attrs || []).find(attr => attr.name === nom);
  return item && item.value;
}

function possedeClasse(noeud, nom) {
  return (attribut(noeud, 'class') || '').split(/\s+/).includes(nom);
}

function descendants(noeud, predicate) {
  const resultat = [];
  function visiter(courant) {
    if (predicate(courant)) resultat.push(courant);
    for (const enfant of courant.childNodes || []) visiter(enfant);
  }
  visiter(noeud);
  return resultat;
}

function texte(noeud) {
  if (noeud.nodeName === '#text') return noeud.value;
  if (noeud.tagName === 'br') return '\n';
  return (noeud.childNodes || []).map(texte).join('');
}

function positions(textePublic, attendu) {
  const resultat = [];
  let position = textePublic.indexOf(attendu);
  while (position !== -1) {
    resultat.push(position);
    position = textePublic.indexOf(attendu, position + 1);
  }
  return resultat;
}

function espaceRetour(valeur) {
  return JSON.stringify(valeur === undefined ? null : valeur);
}

async function principal() {
  const options = argumentsLigneCommande();
  if (dansRepertoire(options.sortie, options.source)) throw new Error('La sortie doit être extérieure au répertoire principal.');
  const acorn = require(require.resolve('acorn', { paths: [options.source] }));
  const parse5 = require(require.resolve('parse5', { paths: [options.source] }));
  const fichiers = new Map();
  const arbres = new Map();

  function lire(fichier) {
    const absolu = fs.realpathSync(fichier);
    if (!dansRepertoire(absolu, options.source)) throw new Error(`Lecture hors source refusée : ${absolu}`);
    if (!fichiers.has(absolu)) {
      const contenu = fs.readFileSync(absolu, 'utf8');
      fichiers.set(absolu, { contenu, sha256: somme(contenu) });
    }
    return fichiers.get(absolu).contenu;
  }

  function analyser(fichier) {
    const absolu = fs.realpathSync(fichier);
    if (!arbres.has(absolu)) arbres.set(absolu, acorn.parse(lire(absolu), { ecmaVersion: 'latest', locations: true }));
    return arbres.get(absolu);
  }

  function cheminRelatif(fichier) {
    return path.relative(options.source, fichier).split(path.sep).join('/');
  }

  function moduleTableau(fichier, ancetres = []) {
    const absolu = fs.realpathSync(fichier);
    if (ancetres.includes(absolu)) throw new Error(`Cycle de modules : ${absolu}`);
    const arbre = analyser(absolu);
    const definitions = declarateurs(arbre);
    const cheminModules = [...ancetres, absolu];
    function developper(noeud) {
      if (noeud && noeud.type === 'Identifier') return developper(definitions.get(noeud.name));
      if (noeud && noeud.type === 'CallExpression' && noeud.callee.name === 'require' && noeud.arguments.length === 1) {
        const cible = valeurLitterale(noeud.arguments[0], absolu);
        if (typeof cible !== 'string' || !cible.startsWith('.')) throw new Error(`Import non local : ${absolu}`);
        const resolu = path.resolve(path.dirname(absolu), cible.endsWith('.js') ? cible : `${cible}.js`);
        return moduleTableau(resolu, cheminModules);
      }
      if (!noeud || noeud.type !== 'ArrayExpression') throw new Error(`Tableau non statique : ${absolu}`);
      return noeud.elements.flatMap(element => element && element.type === 'SpreadElement'
        ? developper(element.argument) : [{ objet: element, fichier: absolu, cheminModules }]);
    }
    return developper(exportModule(arbre, absolu));
  }

  const catalogueFichier = path.join(options.source, 'server/exercises/index.js');
  const catalogue = analyser(catalogueFichier);
  const projection = verifierProjection(catalogue);
  const routeFichier = path.join(options.source, 'server/routes/exercises.js');
  const retour = verifierRetour(analyser(routeFichier));
  for (const nom of ['server/services/execution/local-runner.js', 'server/exercises/runner.js',
    'scripts/generate-code-labs.js', 'assets/js/code-lab.js']) lire(path.join(options.source, nom));
  const runner = analyser(path.join(options.source, 'server/exercises/runner.js'));
  const limiteTests = valeurLitterale(declarateurs(runner).get('MAX_TESTS'), 'MAX_TESTS');
  if (!Number.isInteger(limiteTests) || limiteTests < 1) throw new Error('Limite de tests non reconnue.');
  const registre = declarateurs(catalogue).get('RAW_EXERCISES');
  if (!registre || registre.type !== 'ObjectExpression') throw new Error('Registre des exercices non reconnu.');
  const configFichier = path.join(options.source, 'server/exercises/course-config.js');
  const config = exportModule(analyser(configFichier), configFichier);
  const grilles = [];
  const modulesGrilles = new Set();
  const identifiants = new Set();
  let autres = 0;

  for (const entree of registre.properties) {
    const cours = entree.key.value || entree.key.name;
    const appel = entree.value;
    if (appel.type !== 'CallExpression' || appel.callee.name !== 'require') throw new Error(`Import de cours non reconnu : ${cours}`);
    const cible = valeurLitterale(appel.arguments[0], cours);
    const fichier = path.resolve(path.dirname(catalogueFichier), cible + '.js');
    for (const fiche of moduleTableau(fichier)) {
      if (!fiche.objet || fiche.objet.type !== 'ObjectExpression') throw new Error(`Fiche non statique : ${cours}`);
      const langage = valeurLitterale(propriete(fiche.objet, 'language'), cours);
      if (langage !== 'analyse') { autres++; continue; }
      const id = valeurLitterale(propriete(fiche.objet, 'id'), cours);
      const chapitre = valeurLitterale(propriete(fiche.objet, 'chapter'), id);
      const starter = valeurLitterale(propriete(fiche.objet, 'starter'), id);
      if (typeof id !== 'string' || typeof chapitre !== 'number' || typeof starter !== 'string' || identifiants.has(id)) {
        throw new Error(`Identifiant, chapitre ou squelette invalide : ${id}`);
      }
      identifiants.add(id);
      fiche.cheminModules.forEach(item => modulesGrilles.add(item));
      const configuration = propriete(config, cours);
      const dossier = valeurLitterale(propriete(configuration, 'dir'), cours);
      const dossierChapitres = valeurLitterale(propriete(configuration, 'chapterDir'), cours);
      const page = path.join(options.source, dossier, dossierChapitres, `chapitre${chapitre}.html`);
      const attendus = [];
      for (const genre of ['examples', 'tests']) {
        const liste = propriete(fiche.objet, genre);
        if (!liste || liste.type !== 'ArrayExpression') throw new Error(`${id} : ${genre} non statique.`);
        liste.elements.forEach((element, index) => {
          const entreeNoeud = propriete(element, 'stdin');
          const attenduNoeud = propriete(element, 'expected');
          const entreeTexte = valeurLitterale(entreeNoeud, `${id} ${genre} ${index + 1}`);
          const attendu = valeurLitterale(attenduNoeud, `${id} ${genre} ${index + 1}`);
          if (typeof entreeTexte !== 'string' || typeof attendu !== 'string') throw new Error(`${id} : entrée ou attendu non textuel.`);
          const labelNoeud = propriete(element, 'label');
          const label = labelNoeud ? valeurLitterale(labelNoeud, id) : '';
          attendus.push({ genre: genre === 'tests' ? 'test' : 'exemple', numero: index + 1, entree: entreeTexte,
            attendu, label, ligne: attenduNoeud.loc.start.line });
        });
      }
      grilles.push({ id, cours, chapitre, dossier, page, fichier: fiche.fichier, starter, attendus });
    }
  }

  function effetExecution(noeud) {
    if (!noeud || typeof noeud !== 'object') return false;
    if (['FunctionDeclaration', 'FunctionExpression', 'ArrowFunctionExpression'].includes(noeud.type)) return false;
    if (['AssignmentExpression', 'UpdateExpression', 'NewExpression'].includes(noeud.type)) return true;
    if (noeud.type === 'CallExpression' && !(noeud.callee.type === 'Identifier' && noeud.callee.name === 'require')) return true;
    return Object.values(noeud).some(valeur => Array.isArray(valeur)
      ? valeur.some(effetExecution) : valeur && typeof valeur === 'object' && effetExecution(valeur));
  }

  for (const fichier of modulesGrilles) {
    const arbre = analyser(fichier);
    for (const noeud of arbre.body) {
      if (noeud.type === 'FunctionDeclaration' || (noeud.type === 'ExpressionStatement' && noeud.directive)) continue;
      if (noeud.type === 'VariableDeclaration' && !effetExecution(noeud)) continue;
      if (noeud.type === 'ExpressionStatement' && noeud.expression.type === 'AssignmentExpression' &&
          noeud.expression.left.type === 'MemberExpression' && noeud.expression.left.object.name === 'module' &&
          noeud.expression.left.property.name === 'exports' && !effetExecution(noeud.expression.right)) continue;
      throw new Error(`Mutation ou instruction dynamique à examiner dans ${cheminRelatif(fichier)}:${noeud.loc.start.line}`);
    }
  }

  const blocs = new Set(['address', 'article', 'aside', 'blockquote', 'dd', 'details', 'div', 'dl', 'dt', 'figcaption',
    'figure', 'footer', 'form', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'header', 'li', 'main', 'nav', 'ol', 'p',
    'pre', 'section', 'summary', 'table', 'tbody', 'td', 'th', 'thead', 'tr', 'ul']);
  const exclus = new Set(['head', 'style', 'template', 'svg', 'canvas']);
  const pages = new Map();

  function lirePage(fichier) {
    if (pages.has(fichier)) return pages.get(fichier);
    const html = lire(fichier);
    const document = parse5.parse(html, { sourceCodeLocationInfo: true });
    const segments = [];
    const labs = new Map();
    const donnees = new Map();
    let actif = null;

    function terminer() {
      if (actif && actif.texte.trim()) segments.push(actif);
      actif = null;
    }

    function ajouter(contenu, contexte, ligne) {
      if (!contenu) return;
      if (!actif || actif.zone !== contexte.zone || actif.grille !== contexte.grille || actif.cas !== contexte.cas) {
        terminer();
        actif = { zone: contexte.zone, grille: contexte.grille, cas: contexte.cas, ligne, texte: '' };
      }
      actif.texte += contenu;
    }

    function starter(noeud, contexte) {
      terminer();
      const contenu = texte(noeud);
      const premier = (noeud.childNodes || []).find(item => item.nodeName === '#text');
      let ligne = premier && premier.sourceCodeLocation ? premier.sourceCodeLocation.startLine : noeud.sourceCodeLocation.startLine;
      let cas = null;
      let zonePrecedente = 'preambule_grille';
      const parCas = new Map();
      const lignes = contenu.split('\n');
      for (let index = 0; index < lignes.length; index++) {
        const ligneTexte = lignes[index];
        const entete = /^\[(?:cas\s*(\d+)|exemple)\b.*\]$/i.exec(ligneTexte.trim());
        let zone;
        if (entete) {
          cas = entete[1] ? Number(entete[1]) : 'exemple';
          zone = 'entete_cas';
        } else if (cas === null) {
          zone = 'preambule_grille';
        } else if (/^\s*#/.test(ligneTexte)) {
          zone = 'donnee_cas';
          const donnee = ligneTexte.trim().replace(/^#\s*(?:donn[eé]es?\s*:\s*)?/i, '').trim();
          if (donnee) {
            if (!parCas.has(cas)) parCas.set(cas, []);
            parCas.get(cas).push(donnee);
          }
        } else if (ligneTexte.trim() === 'A_COMPLETER') {
          zone = 'saisie_a_completer';
        } else if (!ligneTexte.trim()) {
          zone = zonePrecedente;
        } else {
          zone = 'reponse_initiale';
        }
        ajouter(ligneTexte + (index < lignes.length - 1 ? '\n' : ''), { grille: contexte.grille, zone, cas }, ligne);
        zonePrecedente = zone;
        ligne++;
      }
      terminer();
      donnees.set(contexte.grille, parCas);
    }

    function visiter(noeud, contexte) {
      const tag = noeud.tagName;
      if (noeud.nodeName === '#text') {
        const ligne = noeud.sourceCodeLocation ? noeud.sourceCodeLocation.startLine : contexte.ligne;
        ajouter(noeud.value, contexte, ligne);
        return;
      }
      if (exclus.has(tag)) { terminer(); return; }
      if (tag === 'script') {
        if (attribut(noeud, 'data-lab-starter') !== undefined && contexte.grille) starter(noeud, contexte);
        else terminer();
        return;
      }
      if (tag === 'br') {
        ajouter('\n', contexte, noeud.sourceCodeLocation ? noeud.sourceCodeLocation.startLine : contexte.ligne);
        return;
      }
      const bloc = blocs.has(tag);
      if (bloc) terminer();
      const suivant = { ...contexte };
      const id = attribut(noeud, 'data-exercise');
      if (id !== undefined) {
        suivant.grille = id;
        suivant.zone = 'autre_texte_grille';
        suivant.cas = null;
        if (!labs.has(id)) labs.set(id, []);
        labs.get(id).push(noeud);
        const entree = attribut(noeud, 'data-stdin');
        if (entree !== undefined) {
          ajouter(entree, { grille: id, zone: 'attribut_entree_exemple', cas: null },
            noeud.sourceCodeLocation ? noeud.sourceCodeLocation.startLine : null);
          terminer();
        }
      }
      if (possedeClasse(noeud, 'lab__title')) suivant.zone = 'titre';
      if (possedeClasse(noeud, 'lab__goal')) suivant.zone = 'objectif';
      if (possedeClasse(noeud, 'lab__brief')) suivant.zone = 'enonce';
      if (possedeClasse(noeud, 'lab__hints')) suivant.zone = 'indice';
      if (possedeClasse(noeud, 'lab__sample')) suivant.zone = 'exemple_affiche';
      if (noeud.sourceCodeLocation) suivant.ligne = noeud.sourceCodeLocation.startLine;
      for (const enfant of noeud.childNodes || []) visiter(enfant, suivant);
      if (bloc) terminer();
    }

    visiter(document, { grille: null, zone: 'texte_chapitre', cas: null, ligne: 1 });
    terminer();
    const page = { fichier, segments, labs, donnees };
    pages.set(fichier, page);
    return page;
  }

  function listerPages(dossier) {
    const resultat = [];
    function visiter(repertoire) {
      for (const entree of fs.readdirSync(repertoire, { withFileTypes: true }).sort((gauche, droite) => gauche.name.localeCompare(droite.name, 'en'))) {
        const fichier = path.join(repertoire, entree.name);
        if (entree.isDirectory()) visiter(fichier);
        else if (entree.isFile() && /\.html?$/i.test(entree.name)) resultat.push(fichier);
      }
    }
    visiter(path.join(options.source, dossier));
    return resultat;
  }

  const pagesParCours = new Map();
  for (const grille of grilles) {
    if (!pagesParCours.has(grille.cours)) pagesParCours.set(grille.cours, { dossier: grille.dossier, fichiers: listerPages(grille.dossier) });
    const cours = pagesParCours.get(grille.cours);
    if (cours.dossier !== grille.dossier || !cours.fichiers.includes(grille.page)) {
      throw new Error(`Page de cours manquante ou dossier incohérent : ${grille.id}`);
    }
  }

  const structure = { grilles: 0, sansChampSortieExemple: 0, entreeConforme: 0, squeletteConforme: 0,
    selecteursCas: 0, casAvecDonnees: 0, autresSelecteurs: [], casSansDonnees: [],
    attributsSensibles: [], notesHorsExemple: [], anomalies: [] };
  for (const grille of grilles) {
    const page = lirePage(grille.page);
    const noeuds = page.labs.get(grille.id) || [];
    if (noeuds.length !== 1) {
      structure.anomalies.push({ id: grille.id, probleme: `Nombre de blocs : ${noeuds.length}` });
      continue;
    }
    const lab = noeuds[0];
    structure.grilles++;
    if (attribut(lab, 'data-language') !== 'analyse') structure.anomalies.push({ id: grille.id, probleme: 'Langage HTML différent.' });
    const echantillons = descendants(lab, item => possedeClasse(item, 'lab__sample'));
    const parties = echantillons.flatMap(item => descendants(item, enfant => possedeClasse(enfant, 'lab__sample-part')));
    const pres = echantillons.flatMap(item => descendants(item, enfant => enfant.tagName === 'pre'));
    if (echantillons.length === 1 && parties.length === 1 && pres.length === 1 &&
        !texte(echantillons[0]).includes('Sortie attendue')) structure.sansChampSortieExemple++;
    else structure.anomalies.push({ id: grille.id, probleme: 'Structure de l’exemple à examiner.' });
    const premierExemple = grille.attendus.find(item => item.genre === 'exemple');
    const entree = premierExemple ? premierExemple.entree : '';
    if (pres.length === 1 && texte(pres[0]) === (entree === '' ? '(aucune)' : entree) &&
        attribut(lab, 'data-stdin') === entree) structure.entreeConforme++;
    else structure.anomalies.push({ id: grille.id, probleme: 'Entrée de l’exemple différente de la source.' });
    const starters = descendants(lab, item => item.tagName === 'script' && attribut(item, 'data-lab-starter') !== undefined);
    const attenduStarter = grille.starter.replace(/<\/(script)/gi, '<\\/$1');
    if (starters.length === 1 && texte(starters[0]) === attenduStarter) structure.squeletteConforme++;
    else structure.anomalies.push({ id: grille.id, probleme: 'Squelette HTML différent de la source.' });
    for (const attendu of grille.attendus.filter(item => item.genre === 'test')) {
      const selecteur = /^cas\s*:\s*(\d+)$/i.exec(attendu.entree.trim());
      if (!selecteur) structure.autresSelecteurs.push({ id: grille.id, numero: attendu.numero, selecteur: attendu.entree });
      else {
        structure.selecteursCas++;
        if ((page.donnees.get(grille.id)?.get(Number(selecteur[1])) || []).length) structure.casAvecDonnees++;
        else structure.casSansDonnees.push({ id: grille.id, numero: attendu.numero, selecteur: attendu.entree });
      }
    }
    for (const item of descendants(lab, enfant => (enfant.attrs || []).some(attr => /^data-(expected|solution|tests?)$/i.test(attr.name)))) {
      structure.attributsSensibles.push({ id: grille.id, ligne: item.sourceCodeLocation && item.sourceCodeLocation.startLine });
    }
    for (const item of descendants(lab, enfant => possedeClasse(enfant, 'lab__note'))) {
      structure.notesHorsExemple.push({ id: grille.id, ligne: item.sourceCodeLocation && item.sourceCodeLocation.startLine,
        identifiant: attribut(item, 'id') || '', texte: texte(item) });
    }
  }

  const sorties = {
    coincidences: path.join(options.sortie, 'coincidences-attendus-grilles-lot1-partie3.jsonl.gz'),
    propres: path.join(options.sortie, 'coincidences-grilles-propres-lot1-partie3.tsv'),
    synthese: path.join(options.sortie, 'synthese-attendus-grilles-lot1-partie3.json'),
    rapport: path.join(options.sortie, 'rapport-attendus-grilles-lot1-partie3.md')
  };
  for (const fichier of Object.values(sorties)) {
    if (fs.existsSync(fichier) && fs.lstatSync(fichier).isSymbolicLink()) throw new Error(`Lien symbolique de sortie refusé : ${fichier}`);
  }
  const temporaires = Object.fromEntries(Object.entries(sorties).map(([cle, fichier]) => [cle, `${fichier}.${process.pid}.tmp`]));
  const fichierGzip = fs.createWriteStream(temporaires.coincidences, { flags: 'wx' });
  const compression = zlib.createGzip({ level: 6 });
  compression.pipe(fichierGzip);
  const fichierTsv = fs.createWriteStream(temporaires.propres, { flags: 'wx' });
  fichierTsv.write('grille\tcours\torigine_attendu\tnumero\tsource\tligne_source\tentree_ou_selecteur\tdonnees_cas\tattendu\tforme\tpage\tligne_html\tzone\tcas_zone\tpositions_utf16\tqualification\tpositions_associees_utf16\ttexte_public\n');
  const statistiques = {};
  const attendusVides = [];
  let nombreExemples = 0;
  let nombreTests = 0;
  const associationsRevues = new Set([
    'ib2-c1-e1:exemple:1', 'ib2-c1-e1:test:1', 'ib2-c1-e1:test:2',
    'ib2-c2-e1:exemple:1', 'ib2-c2-e1:test:1', 'ib2-c2-e1:test:2',
    'ib2-c3-e1:exemple:1', 'ib2-c3-e1:test:1', 'ib2-c3-e1:test:2',
    'mc2-c1-e1:exemple:1', 'mc2-c1-e1:test:1', 'mc2-c1-e1:test:2',
    'mc2-c2-e1:exemple:1', 'mc2-c2-e1:test:1', 'mc2-c2-e1:test:2',
    'cs2-c1-e2:exemple:1', 'cs2-c1-e2:test:1', 'cs2-c1-e2:test:2', 'cs2-c1-e2:test:3',
    'cs2-c2-e1:exemple:1'
  ]);
  const reglesDefautRevues = {
    'ib2-c1-e1:test:3': {
      entree: 'refaire toute l application en assembleur', attendu: 'Type: Inconnu',
      marqueur: 'Pour toute autre valeur : Type: Inconnu.',
      source: '03e21d2ed9f1fb5841a2bad08b0a3073a34d7c29335aaa21a3a2eff7791cb9f5',
      page: '556e7393e7b7c910c3614f0c6f1243ad6b0affd8a0d9b6b0b98fc75ec14a40c3'
    },
    'ib2-c2-e1:test:3': {
      entree: 'protocole_blockchain', attendu: 'Categorie: Autre',
      marqueur: 'Tout autre mot → Categorie: Autre',
      source: '03e21d2ed9f1fb5841a2bad08b0a3073a34d7c29335aaa21a3a2eff7791cb9f5',
      page: '2bd1fb626c4b68bd322ffea2af95baf208af98bdc04731ce8db9965beada7114'
    },
    'ib2-c3-e1:test:3': {
      entree: 'alignement_directeur_projet', attendu: 'Technique: Entretien individuel',
      marqueur: 'Pour tout autre contexte → Technique: Entretien individuel',
      source: '03e21d2ed9f1fb5841a2bad08b0a3073a34d7c29335aaa21a3a2eff7791cb9f5',
      page: '07780a6c2cb0e5f524f9090643f605a1a31dba08bf79341a12b69793696ea437'
    },
    'mc2-c1-e1:test:3': {
      entree: 'telepathie_quantique', attendu: 'Memoire: Inconnu',
      marqueur: 'Pour toute autre valeur : Memoire: Inconnu.',
      source: '9bbf6399dc2eab62b44ffee6b4f05ad8b191999be25c003be61882bee9003c50',
      page: '00d35c754acc1b53fa7fb13a2b8c263eebe9df77d517bc6861e0a1b5524f0866'
    },
    'mc2-c2-e1:test:3': {
      entree: 'dormir_sur_son_livre', attendu: 'Methode: Inconnue',
      marqueur: 'Pour toute autre valeur : Methode: Inconnue.',
      source: '9bbf6399dc2eab62b44ffee6b4f05ad8b191999be25c003be61882bee9003c50',
      page: '9073ec503cf714dacf505772d4edc030c6ca0c025903c1ad06f104858d41c70f'
    },
    'cs2-c1-e2:test:4': {
      entree: 'AUTRE_CHOSE', attendu: 'INCIDENT INCONNU',
      marqueur: 'Si le code est inconnu, afficher : INCIDENT INCONNU.',
      source: '3a275629573ee33f25230d70dcaebc67a14dd6022fb65aad26303a2363bf0622',
      page: 'e014d26e3ea83c781c845c4596145bab1aa693a984a0f2cbb74fb14166527540'
    }
  };
  const preuves = new Map();

  function associationExplicite(segment, entree, attendu) {
    if (typeof entree !== 'string' || entree.length < 2) return null;
    let debutLigne = 0;
    for (const ligne of segment.texte.split('\n')) {
      const debutEntree = ligne.indexOf(entree);
      if (debutEntree !== -1) {
        const avant = ligne[debutEntree - 1] || '';
        const apres = ligne[debutEntree + entree.length] || '';
        const debutAttendu = ligne.indexOf(attendu, debutEntree + entree.length);
        const separateur = debutAttendu === -1 ? '' : ligne.slice(debutEntree + entree.length, debutAttendu);
        if (!/[\p{L}\p{N}_]/u.test(avant) && !/[\p{L}\p{N}_]/u.test(apres) && debutAttendu !== -1 &&
            (separateur.includes('→') || /^\s*:\s*$/.test(separateur))) {
          return { entree, ligne, position: debutLigne + debutAttendu };
        }
      }
      debutLigne += ligne.length + 1;
    }
    return null;
  }

  function qualifier(grille, attendu, forme, segment, portee, donneesCas) {
    const identifiant = `${grille.id}:${attendu.genre}:${attendu.numero}`;
    if (forme.mode !== 'litteral_strict') return { statut: 'coincidence_bords_elagues', positions: [] };
    if (portee !== 'meme_grille' || segment.zone !== 'enonce') {
      if (portee === 'meme_grille' && ['enonce', 'indice'].includes(segment.zone) &&
          grille.id === 'al-c2-e3' && attendu.genre === 'test' && [1, 3].includes(attendu.numero) &&
          attendu.attendu === 'non symetrique') return { statut: 'regle_generique_sans_cas_explicitement_cite', positions: [] };
      if (segment.zone === 'donnee_cas') return { statut: 'coincidence_dans_donnee_de_cas', positions: [] };
      return { statut: 'coincidence_non_qualifiee', positions: [] };
    }
    const entrees = attendu.genre === 'exemple' ? [attendu.entree] : donneesCas;
    const relation = entrees.length === 1 ? associationExplicite(segment, entrees[0], attendu.attendu) : null;
    if (relation && associationsRevues.has(identifiant)) {
      preuves.set(identifiant, { grille: grille.id, origine: attendu.genre, numero: attendu.numero,
        type: 'association_explicitement_affichee', donnee: relation.entree, attendu: attendu.attendu,
        source: cheminRelatif(grille.fichier), ligneSource: attendu.ligne, page: cheminRelatif(grille.page),
        ligneHtml: segment.ligne, extrait: relation.ligne });
      return { statut: 'association_cas_explicitement_affichee', positions: [relation.position] };
    }
    const regle = reglesDefautRevues[identifiant];
    if (regle && donneesCas.length === 1 && donneesCas[0] === regle.entree && attendu.attendu === regle.attendu &&
        somme(lire(grille.fichier)) === regle.source && somme(lire(grille.page)) === regle.page &&
        segment.texte.includes(regle.marqueur)) {
      preuves.set(identifiant, { grille: grille.id, origine: attendu.genre, numero: attendu.numero,
        type: 'association_deduite_par_regle_de_defaut', donnee: regle.entree, attendu: attendu.attendu,
        source: cheminRelatif(grille.fichier), ligneSource: attendu.ligne, page: cheminRelatif(grille.page),
        ligneHtml: segment.ligne, extrait: regle.marqueur });
      return { statut: 'association_deduite_par_regle_de_defaut', positions: positions(segment.texte, attendu.attendu) };
    }
    if (relation) return { statut: 'association_candidate_non_revue', positions: [relation.position] };
    if (grille.id === 'al-c2-e3' && attendu.genre === 'test' && [1, 3].includes(attendu.numero) &&
        attendu.attendu === 'non symetrique') return { statut: 'regle_generique_sans_cas_explicitement_cite', positions: [] };
    return { statut: 'coincidence_non_qualifiee', positions: [] };
  }

  function compter(mode, portee, zone, qualification, longueur, id, cleAttendu, nombre) {
    if (!statistiques[mode]) statistiques[mode] = { lignes: 0, occurrences: 0, grilles: new Set(), attendus: new Set(),
      parPortee: {}, parZone: {}, parQualification: {},
      detailPortee: {},
      douzeEtPlus: { lignes: 0, occurrences: 0, grilles: new Set(), attendus: new Set() } };
    const cible = statistiques[mode];
    cible.lignes++;
    cible.occurrences += nombre;
    cible.grilles.add(id);
    cible.attendus.add(cleAttendu);
    cible.parPortee[portee] = (cible.parPortee[portee] || 0) + nombre;
    cible.parZone[zone] = (cible.parZone[zone] || 0) + nombre;
    cible.parQualification[qualification] = (cible.parQualification[qualification] || 0) + nombre;
    if (!cible.detailPortee[portee]) cible.detailPortee[portee] = {
      lignes: 0, occurrences: 0, grilles: new Set(), attendus: new Set(), zones: {},
      douzeEtPlus: { lignes: 0, occurrences: 0, grilles: new Set(), attendus: new Set() }
    };
    const detail = cible.detailPortee[portee];
    detail.lignes++;
    detail.occurrences += nombre;
    detail.grilles.add(id);
    detail.attendus.add(cleAttendu);
    if (!detail.zones[zone]) detail.zones[zone] = { lignes: 0, occurrences: 0 };
    detail.zones[zone].lignes++;
    detail.zones[zone].occurrences += nombre;
    if (longueur >= 12) {
      cible.douzeEtPlus.lignes++;
      cible.douzeEtPlus.occurrences += nombre;
      cible.douzeEtPlus.grilles.add(id);
      cible.douzeEtPlus.attendus.add(cleAttendu);
      detail.douzeEtPlus.lignes++;
      detail.douzeEtPlus.occurrences += nombre;
      detail.douzeEtPlus.grilles.add(id);
      detail.douzeEtPlus.attendus.add(cleAttendu);
    }
  }

  for (const grille of grilles) {
    const pageOrigine = lirePage(grille.page);
    for (const attendu of grille.attendus) {
      if (attendu.genre === 'exemple') nombreExemples++;
      else nombreTests++;
      if (!attendu.attendu) {
        attendusVides.push({ id: grille.id, genre: attendu.genre, numero: attendu.numero });
        continue;
      }
      const formes = [{ mode: 'litteral_strict', valeur: attendu.attendu }];
      const elague = attendu.attendu.trim();
      if (elague && elague !== attendu.attendu) formes.push({ mode: 'bords_elagues', valeur: elague });
      const selecteur = /^cas\s*:\s*(\d+)$/i.exec(attendu.entree.trim());
      const donneesCas = selecteur ? (pageOrigine.donnees.get(grille.id)?.get(Number(selecteur[1])) || []) : [];
      for (const forme of formes) {
        const longueur = [...forme.valeur].length;
        for (const pageFichier of pagesParCours.get(grille.cours).fichiers) {
          const page = lirePage(pageFichier);
          for (const segment of page.segments) {
            const trouve = positions(segment.texte, forme.valeur);
            if (!trouve.length) continue;
            const memePage = pageFichier === grille.page;
            const portee = segment.grille === grille.id ? (memePage ? 'meme_grille' : 'meme_grille_autre_page')
              : segment.grille ? (memePage ? 'autre_grille_meme_page' : 'autre_grille_autre_page')
                : (memePage ? 'reste_du_chapitre' : 'autre_page_du_cours');
            const cleAttendu = `${grille.id}:${attendu.genre}:${attendu.numero}`;
            const qualification = qualifier(grille, attendu, forme, segment, portee, donneesCas);
            compter(forme.mode, portee, segment.zone, qualification.statut, longueur, grille.id, cleAttendu, trouve.length);
            const ligne = {
              grille: grille.id, cours: grille.cours, origine_attendu: attendu.genre, numero: attendu.numero,
              source: cheminRelatif(grille.fichier), ligne_source: attendu.ligne, entree_ou_selecteur: attendu.entree,
              donnees_cas: donneesCas, attendu: attendu.attendu, forme: forme.mode, valeur_cherchee: forme.valeur,
              longueur_caracteres: longueur, page: cheminRelatif(pageFichier), ligne_html: segment.ligne,
              portee, zone: segment.zone, grille_porteuse: segment.grille, cas_zone: segment.cas,
              positions_utf16: trouve, qualification: qualification.statut,
              positions_associees_utf16: qualification.positions, texte_public: segment.texte
            };
            if (!compression.write(JSON.stringify(ligne) + '\n')) await once(compression, 'drain');
            if (portee === 'meme_grille' || portee === 'meme_grille_autre_page') {
              const colonnes = [ligne.grille, ligne.cours, ligne.origine_attendu, ligne.numero, ligne.source, ligne.ligne_source,
                espaceRetour(ligne.entree_ou_selecteur), espaceRetour(ligne.donnees_cas), espaceRetour(ligne.attendu), ligne.forme,
                ligne.page, ligne.ligne_html, ligne.zone, espaceRetour(ligne.cas_zone), trouve.join(','), ligne.qualification,
                qualification.positions.join(','), espaceRetour(ligne.texte_public)];
              if (!fichierTsv.write(colonnes.join('\t') + '\n')) await once(fichierTsv, 'drain');
            }
          }
        }
      }
    }
  }
  compression.end();
  fichierTsv.end();
  await Promise.all([once(fichierGzip, 'close'), once(fichierTsv, 'close')]);

  const empreintes = {};
  for (const [fichier, ancien] of fichiers) {
    const actuel = somme(fs.readFileSync(fichier, 'utf8'));
    if (actuel !== ancien.sha256) throw new Error(`Source modifiée pendant l’audit : ${cheminRelatif(fichier)}`);
    empreintes[cheminRelatif(fichier)] = actuel;
  }
  for (const [cours, inventaire] of pagesParCours) {
    if (JSON.stringify(listerPages(inventaire.dossier)) !== JSON.stringify(inventaire.fichiers)) {
      throw new Error(`Liste des pages modifiée pendant l’audit : ${cours}`);
    }
  }
  const empreintesTriees = Object.fromEntries(Object.entries(empreintes).sort(([gauche], [droite]) => gauche.localeCompare(droite, 'en')));
  for (const stats of Object.values(statistiques)) {
    stats.grilles = stats.grilles.size;
    stats.attendus = stats.attendus.size;
    stats.douzeEtPlus.grilles = stats.douzeEtPlus.grilles.size;
    stats.douzeEtPlus.attendus = stats.douzeEtPlus.attendus.size;
    for (const detail of Object.values(stats.detailPortee)) {
      detail.grilles = detail.grilles.size;
      detail.attendus = detail.attendus.size;
      detail.douzeEtPlus.grilles = detail.douzeEtPlus.grilles.size;
      detail.douzeEtPlus.attendus = detail.douzeEtPlus.attendus.size;
    }
  }
  const synthese = {
    source: options.source,
    methode: 'Lecture statique Acorn ; texte DOM parse5 de toutes les pages HTML locales des cours contenant les grilles ; aucun code candidat exécuté.',
    dependances: { node: process.version, acorn: require(path.join(options.source, 'node_modules/acorn/package.json')).version,
      parse5: require(path.join(options.source, 'node_modules/parse5/package.json')).version },
    corpus: { grilles: grilles.length, autresFiches: autres, cours: new Set(grilles.map(item => item.cours)).size,
      pagesChapitres: new Set(grilles.map(item => item.page)).size, pagesCours: pages.size,
      attendusExemples: nombreExemples, attendusTests: nombreTests, attendusVides, limiteTests,
      testsAuDelaDeLaLimite: grilles.flatMap(grille => grille.attendus.filter(item => item.genre === 'test')
        .slice(limiteTests).map(item => ({ id: grille.id, numero: item.numero }))) },
    projectionStatique: projection,
    retourCorrectionStatique: retour,
    structurePages: structure,
    coincidences: statistiques,
    relectureCiblee: {
      associationsEtablies: [...preuves.values()],
      referencesRevuesNonRetrouvees: [...associationsRevues, ...Object.keys(reglesDefautRevues)].filter(item => !preuves.has(item)),
      limite: 'Les autres coïncidences ne sont pas réputées sans fuite ; les règles par défaut revues sont liées aux empreintes de leurs fichiers.'
    },
    empreinteGlobale: somme(JSON.stringify(empreintesTriees)),
    empreintes: empreintesTriees
  };
  const strict = synthese.coincidences.litteral_strict || { lignes: 0, occurrences: 0, grilles: 0, attendus: 0,
    detailPortee: {}, parZone: {}, parQualification: {}, douzeEtPlus: { lignes: 0, occurrences: 0 } };
  const propre = strict.detailPortee.meme_grille || { lignes: 0, occurrences: 0, grilles: 0, attendus: 0,
    zones: {}, douzeEtPlus: { lignes: 0, occurrences: 0, grilles: 0, attendus: 0 } };
  const bordsElagues = synthese.coincidences.bords_elagues || { lignes: 0, occurrences: 0 };
  const listePreuves = synthese.relectureCiblee.associationsEtablies;
  const preuvesDirectes = listePreuves.filter(item => item.type === 'association_explicitement_affichee');
  const preuvesParDefaut = listePreuves.filter(item => item.type === 'association_deduite_par_regle_de_defaut');
  const testsDirects = preuvesDirectes.filter(item => item.origine === 'test');
  const exemplesDirects = preuvesDirectes.filter(item => item.origine === 'exemple');
  const casEtablis = [...testsDirects, ...preuvesParDefaut];
  const echapperCellule = valeur => String(valeur).replace(/\|/g, '\\|').replace(/\r?\n/g, ' ');
  const citationShell = valeur => "'" + String(valeur).replace(/'/g, "'\\''") + "'";
  const commande = `node ${citationShell(path.resolve(__filename))} --source ${citationShell(options.source)} --sortie ${citationShell(options.sortie)}`;
  const lignesRapport = [
    '# Lot 1, partie 3 — contre-vérification des attendus de grilles',
    '',
    '**Instantané local identifié par son empreinte.** Les fichiers ci-dessous contiennent des attendus normalement réservés au serveur : ne pas les publier.',
    '',
    '## Conclusion',
    '',
    `La suppression des champs dédiés est constatée dans les ${structure.sansChampSortieExemple} blocs HTML analysés. Elle ne démontre pas l’absence d’attendus ailleurs dans les textes. Parmi les références relues sur un instantané antérieur, l’outil reconnaît **${testsDirects.length} associations explicites de test**, **${preuvesParDefaut.length} déductions par défaut** et **${exemplesDirects.length} associations d’exemple**, dans ${new Set(casEtablis.map(item => item.grille)).size} grilles. Les ${synthese.relectureCiblee.referencesRevuesNonRetrouvees.length} références non reconnues nécessitent une nouvelle relecture : leur absence automatique ne prouve pas l’absence de fuite.`,
    '',
    'Un attendu cité comme libellé possible, modèle de sortie ou résultat d’une règle générale n’est pas, à lui seul, une réponse publiquement associée à un cas. À l’inverse, lorsque la donnée du cas et son résultat apparaissent dans une correspondance explicite, ou que l’application d’une règle de défaut au cas est établie, l’association est démontrée. Il ne serait pas justifié de masquer automatiquement toutes les consignes.',
    '',
    '## Périmètre et structure',
    '',
    `- Catalogue lu statiquement : ${synthese.corpus.grilles} grilles \`analyse\`, ${synthese.corpus.cours} cours, ${synthese.corpus.attendusExemples} attendus d’exemple et ${synthese.corpus.attendusTests} attendus de test ; ${synthese.corpus.attendusVides.length} attendu vide non recherché. Les ${synthese.corpus.autresFiches} autres fiches ne sont pas auditées.`,
    `- Pages réellement lues : ${synthese.corpus.pagesChapitres} chapitres contenant les grilles et ${synthese.corpus.pagesCours} fichiers HTML au total, soit tous les fichiers HTML non liés symboliquement des ${synthese.corpus.cours} dossiers de cours concernés. Chaque attendu est comparé aux textes de son propre cours, pas à ceux des autres cours. Les chapitres ultérieurs peuvent nécessiter une authentification : « public » désigne ici les données envoyées au navigateur autorisé, non un accès anonyme universel.`,
    `- ${structure.sansChampSortieExemple}/${synthese.corpus.grilles} blocs comportent un seul champ d’entrée d’exemple et aucun champ dédié « Sortie attendue » ; ${structure.entreeConforme} entrées et ${structure.squeletteConforme} squelettes correspondent aux sources, après échappement de fermeture de script. ${structure.attributsSensibles.length} attribut sensible nommé \`data-expected\`, \`data-test(s)\` ou \`data-solution\` a été repéré.`,
    `- ${structure.selecteursCas} sélecteurs de test \`cas:n\` sont présents ; ${structure.casAvecDonnees} ont au moins une donnée commentée dans le squelette de la page. Cela ne garantit pas, à lui seul, l’exhaustivité ou la pertinence des données. La limite statique du moteur est ${limiteTests} tests ; ${synthese.corpus.testsAuDelaDeLaLimite.length} test de grille dépasse cette limite.`,
    `- L’inspection statique de \`server/exercises/index.js:${projection.ligne}\` montre que \`toClient\` ne projette que \`stdin\` pour chaque exemple \`analyse\`, sans champ \`expected\` ni \`note\`. Cette fonction est un utilitaire : le générateur de pages lit directement le catalogue et applique sa propre suppression. Dans la branche \`analyse\` de \`server/routes/exercises.js:${retour.ligne}\`, le \`stop\` construit n’a pas de champ \`expected\` ; la source attribue \`actual\` à la réponse soumise. Les résultats vrai/faux restent un oracle utilisable par essais. Aucune réponse HTTP réelle n’a été capturée.`,
    '',
    '## Inventaire littéral',
    '',
    `L’unité « ligne » associe un attendu d’exemple ou de test à un passage HTML ; les positions multiples dans ce passage sont comptées séparément. Une même valeur provenant d’un exemple et d’un test compte deux fois. Le relevé strict contient **${strict.lignes} associations attendu/passage et ${strict.occurrences} positions**, concernant ${strict.attendus} attendus de ${strict.grilles} grilles sur l’ensemble du cours. Les ${strict.parZone.attribut_entree_exemple || 0} positions dans \`data-stdin\` sont incluses et distinguées : elles peuvent répéter l’entrée déjà affichée.`,
    '',
    '| Portée | Associations attendu/passage | Positions | Grilles | Associations ≥ 12 caractères | Positions ≥ 12 caractères |',
    '|---|---:|---:|---:|---:|---:|'
  ];
  for (const [cle, libelle] of [
    ['meme_grille', 'Même grille'],
    ['meme_grille_autre_page', 'Copie de la même grille sur une autre page'],
    ['autre_grille_meme_page', 'Autre grille du même chapitre'],
    ['reste_du_chapitre', 'Autre texte du même chapitre'],
    ['autre_grille_autre_page', 'Autre grille sur une autre page du cours'],
    ['autre_page_du_cours', 'Autre texte sur une autre page du cours']
  ]) {
    const detail = strict.detailPortee[cle] || { lignes: 0, occurrences: 0, grilles: 0, douzeEtPlus: { lignes: 0, occurrences: 0 } };
    lignesRapport.push(`| ${libelle} | ${detail.lignes} | ${detail.occurrences} | ${detail.grilles} | ${detail.douzeEtPlus.lignes} | ${detail.douzeEtPlus.occurrences} |`);
  }
  lignesRapport.push(
    '',
    `Le relevé actuel comporte **${propre.douzeEtPlus.lignes} associations** d’au moins 12 caractères dans la même grille, correspondant à **${propre.douzeEtPlus.occurrences} positions**. Aucun seuil n’est appliqué au relevé complet : les attendus courts sont conservés, même lorsqu’ils ne sont que des fragments de nombres ou de mots.`,
    `En complément, ${bordsElagues.lignes} associations après suppression des espaces de bord sont étiquetées \`bords_elagues\` ; elles ne sont pas comptées comme littérales strictes.`,
    '',
    '### Provenance dans la même grille',
    '',
    '| Zone | Associations attendu/passage | Positions |',
    '|---|---:|---:|'
  );
  for (const [zone, detail] of Object.entries(propre.zones)) {
    lignesRapport.push(`| \`${zone}\` | ${detail.lignes} | ${detail.occurrences} |`);
  }
  lignesRapport.push(
    '',
    'Les qualifications \`association_cas_explicitement_affichee\` et \`association_deduite_par_regle_de_defaut\` sont limitées aux références relues ; les secondes sont liées aux empreintes des fichiers revus. \`regle_generique_sans_cas_explicitement_cite\` indique une règle ou un vocabulaire générique, pas une preuve d’absence de déduction. Les données de cas sont distinguées des réponses. Toutes les autres coïncidences restent non qualifiées : elles ne sont déclarées ni sûres ni fuitées.',
    '',
    '## Associations établies',
    '',
    '| Grille | Tests explicitement associés | Tests déduits par défaut | Exemples explicitement associés | Page |',
    '|---|---|---|---|---|'
  );
  for (const id of [...new Set(listePreuves.map(item => item.grille))]) {
    const elements = listePreuves.filter(item => item.grille === id);
    const numeros = (genre, type) => elements.filter(item => item.origine === genre && item.type === type)
      .map(item => item.numero).sort((gauche, droite) => gauche - droite).join(', ') || '—';
    const premier = elements[0];
    lignesRapport.push(`| \`${id}\` | ${numeros('test', 'association_explicitement_affichee')} | ${numeros('test', 'association_deduite_par_regle_de_defaut')} | ${numeros('exemple', 'association_explicitement_affichee')} | \`${echapperCellule(path.join(options.source, premier.page))}:${premier.ligneHtml}\` |`);
  }
  const preuvesIb2 = listePreuves.filter(item => item.grille === 'ib2-c1-e1');
  lignesRapport.push('', '### Références reconnues : `ib2-c1-e1`', '');
  if (preuvesIb2.length) lignesRapport.push('| Origine | Donnée affichée | Attendu côté serveur | Association |', '|---|---|---|---|');
  else lignesRapport.push('Aucune association précédemment revue n’est reconnue automatiquement ; une nouvelle relecture est nécessaire.');
  for (const preuve of preuvesIb2) {
    const methode = preuve.type === 'association_explicitement_affichee' ? 'Correspondance explicite dans l’énoncé' : 'Règle « toute autre valeur »';
    lignesRapport.push(`| ${preuve.origine} ${preuve.numero} | \`${echapperCellule(preuve.donnee)}\` | \`${echapperCellule(preuve.attendu)}\` | ${methode} |`);
  }
  lignesRapport.push(
    '',
    'À titre de contraste, dans `al-c2-e3`, « non symetrique » figure comme libellé de réponse et dans une règle générale. La simple présence de cette chaîne ne relie pas directement la réponse à une matrice particulière ; il faut appliquer le critère à la donnée. Cela n’exclut pas que le résultat soit déductible par raisonnement.',
    '',
    '## Fichiers et reproduction',
    '',
    '- `coincidences-attendus-grilles-lot1-partie3.jsonl.gz` : toutes les associations recherchées, avec attendu exact, origine, sélecteur, données du cas, fichier et ligne source, page, zone, grille porteuse, qualification, texte du passage et positions UTF-16. `ligne_html` désigne le début du passage, pas nécessairement la ligne exacte de chaque occurrence ; une ligne du relevé peut contenir plusieurs positions.',
    '- `coincidences-grilles-propres-lot1-partie3.tsv` : même relevé limité au texte et à l’attribut de la grille concernée, sans seuil de longueur. Les champs complexes sont encodés en JSON dans les cellules.',
    '- `synthese-attendus-grilles-lot1-partie3.json` : compteurs, preuves relues et empreintes SHA-256 de chaque fichier lu. Les résultats du présent rapport sont régénérés avec ces trois fichiers.',
    `- Empreinte globale de l’inventaire source : \`${synthese.empreinteGlobale}\`. Outils : Node ${synthese.dependances.node}, Acorn ${synthese.dependances.acorn}, parse5 ${synthese.dependances.parse5}.`,
    '',
    'Commande exacte depuis n’importe quel répertoire ; `--sortie` doit désigner un dossier existant situé hors du répertoire principal :',
    '',
    '```sh', commande, '```',
    '',
    'La commande ne charge pas les catalogues comme programmes : elle analyse leur syntaxe avec Acorn et les HTML avec parse5. Elle refuse les formes de catalogue dynamiques non reconnues et contrôle que les fichiers et listes de pages n’ont pas changé pendant la lecture. Elle n’exécute ni corrigé ni code candidat, n’accède à aucun réseau et n’écrit pas dans la source.',
    '',
    '## Limites',
    '',
    '- La recherche exacte respecte la casse, les accents et les caractères ; les entités HTML sont décodées, les éléments en ligne réunis et les `<br>` représentés par un retour à la ligne. Les longueurs sont exprimées en points de code Unicode. Les espaces des blocs, changements de casse, paraphrases, réponses partielles, fractions ou autres équivalences acceptées par le correcteur ne sont pas exhaustivement comparés. Une chaîne traversant deux passages distincts peut manquer.',
    '- Les textes généraux de scripts, styles, modèles, SVG et éléments `<head>` sont exclus ; le squelette `data-lab-starter` et l’attribut `data-stdin` sont inclus séparément. Les autres attributs ne sont pas inventoriés comme texte ; la présence de texte dans le DOM ne garantit pas qu’il soit affiché à l’écran.',
    '- La comparaison ne croise pas les attendus avec les pages d’un autre cours ni avec tous les fichiers du site ; aucune analyse sémantique exhaustive, capture navigateur, requête à l’API ou vérification de déploiement n’a été réalisée. Les réponses déductibles par calcul et les révélations par essais successifs peuvent être plus nombreuses.',
    '- Les qualifications humaines sont ciblées. Les valeurs non qualifiées, y compris les coïncidences courtes, exigent une analyse de contexte ; une coïncidence n’est pas une fuite démontrée et une absence de coïncidence n’est pas une garantie de confidentialité.',
    '',
    `Références relues non retrouvées à cet instantané : ${synthese.relectureCiblee.referencesRevuesNonRetrouvees.length ? synthese.relectureCiblee.referencesRevuesNonRetrouvees.map(item => `\`${item}\``).join(', ') : 'aucune'}.`,
    ''
  );
  fs.writeFileSync(temporaires.rapport, lignesRapport.join('\n'), { flag: 'wx' });
  fs.writeFileSync(temporaires.synthese, JSON.stringify(synthese, null, 2) + '\n', { flag: 'wx' });
  for (const cle of Object.keys(sorties)) fs.renameSync(temporaires[cle], sorties[cle]);
  console.log(JSON.stringify({ corpus: synthese.corpus, structure: {
    blocs: structure.grilles, exemplesSansSortie: structure.sansChampSortieExemple, entreesConformes: structure.entreeConforme,
    squelettesConformes: structure.squeletteConforme, anomalies: structure.anomalies.length,
    attributsSensibles: structure.attributsSensibles.length, notesHorsExemple: structure.notesHorsExemple.length
  }, coincidences: statistiques, empreinteGlobale: synthese.empreinteGlobale }, null, 2));
}

principal().catch(erreur => {
  console.error(erreur.stack || String(erreur));
  process.exitCode = 1;
});

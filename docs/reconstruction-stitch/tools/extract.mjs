/**
 * Extraction exhaustive des pages HTML du projet + génération des fiches.
 *
 * Sorties (dans docs/reconstruction-stitch/) :
 *   evidence/pages.json      — données brutes par page
 *   evidence/pages.csv       — registre tabulaire
 *   evidence/matrice.csv     — matrice de couverture
 *   evidence/summary.json    — comptages par famille / statut
 *   evidence/icons.json      — icônes du sprite SVG
 *   evidence/css-vars.json   — variables CSS déclarées
 *   pages/**.md              — une fiche par page HTML découverte
 *   03_INVENTAIRE_PAGES.md   — index généré
 *   23_MATRICE_COUVERTURE.md — matrice générée
 *
 * Aucune modification du produit : lecture seule sur le dépôt.
 */
import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import { createRequire } from 'node:module';
import { parse } from 'parse5';

const require = createRequire(import.meta.url);
const HERE = import.meta.dirname;                     // docs/reconstruction-stitch/tools
const DOCS = path.resolve(HERE, '..');                // docs/reconstruction-stitch
const ROOT = path.resolve(DOCS, '..', '..');          // racine du projet
const GENERATED_AT = '2026-11-05';

const { COURSES, COURSE_THEMES } = require(path.join(ROOT, 'server', 'courses.js'));

/* ------------------------------------------------------------------ */
/* Périmètre                                                          */
/* ------------------------------------------------------------------ */
const EXCLUDED_DIRS = new Set([
  'node_modules', '.git', 'dist', 'out', '.vercel', '.video_agent', '.claude',
  '.agents', '.taskstate', '.freebuff', 'docs', 'design-bundle', 'design-audit',
  'Archives_Projets_ZIP', '.impeccable', '.build-it-reports', 'zai-hermes'
]);

const ROOT_ALLOWLIST = new Set([
  'index.html', 'preparation-cheatsheet.html', 'preparation-progression.html',
  'preparation-classement.html', '404.html'
]);

const LEGACY_DIRS = new Set([
  'b1', 'COURS_B3', 'cours B1 IT', 'cours windows', 'administration machine virtuel',
  'droitb2', 'roadmap', 'old_exam', 'corrections', 'verification', 'tests', 'audit',
  'refonte', 'dossier', 'a', 'server', 'api', 'views', 'design-audit', 'out', 'agent'
]);

const LEVEL_LABELS = { b1: 'Licence 1 (B1)', b2: 'Licence 2 (B2)', b3: 'Licence 3 (B3)' };

/* ------------------------------------------------------------------ */
/* Utilitaires de parcours / parsing                                  */
/* ------------------------------------------------------------------ */
function walkDir(dir, out = []) {
  let entries;
  try { entries = fs.readdirSync(dir, { withFileTypes: true }); } catch { return out; }
  for (const e of entries) {
    if (e.isDirectory()) {
      if (EXCLUDED_DIRS.has(e.name)) continue;
      walkDir(path.join(dir, e.name), out);
    } else if (e.isFile() && e.name.toLowerCase().endsWith('.html')) {
      out.push(path.join(dir, e.name));
    }
  }
  return out;
}

const attr = (n, name) => {
  const a = (n.attrs || []).find((x) => x.name === name);
  return a ? a.value : '';
};

function nodeText(n) {
  if (!n) return '';
  if (n.nodeName === '#text') return n.value || '';
  if (n.nodeName === '#comment' || n.nodeName === '#documentType') return '';
  let s = '';
  for (const c of n.childNodes || []) s += nodeText(c) + ' ';
  return s;
}
const clean = (s) => String(s || '').replace(/\s+/g, ' ').trim();

function walk(node, fn) {
  fn(node);
  for (const c of node.childNodes || []) walk(c, fn);
}

const classesOf = (n) => clean(attr(n, 'class')).split(' ').filter(Boolean);
const esc = (s) => String(s == null ? '' : s)
  .replace(/\|/g, '\\|').replace(/\n/g, ' ').trim();

function sha12(s) {
  return crypto.createHash('sha256').update(s).digest('hex').slice(0, 12);
}

function resolveHref(fromRel, href) {
  if (!href) return '';
  if (/^(https?:|mailto:|tel:|javascript:|data:)/i.test(href)) return href;
  if (href.startsWith('#')) return href;
  const raw = href.split('#')[0];
  if (!raw) return href;
  const base = path.posix.dirname(fromRel);
  let r = raw.startsWith('/') ? raw.slice(1) : path.posix.join(base, raw);
  r = path.posix.normalize(r);
  return r || fromRel;
}

/* ------------------------------------------------------------------ */
/* Classification de chaque page                                      */
/* ------------------------------------------------------------------ */
function classify(rel) {
  const parts = rel.split('/');
  const first = parts[0];
  const isCourse = Object.prototype.hasOwnProperty.call(COURSES, first);
  const file = parts[parts.length - 1];

  if (isCourse) {
    const level = COURSES[first].level;
    let sub = 'autre';
    if (parts.length === 2 && file === 'index.html') sub = 'index';
    else if (parts.length === 2 && file === 'sommaire.html') sub = 'sommaire';
    else if (parts.length === 2 && file === 'atelier.html') sub = 'atelier';
    else if (parts[1] === 'chapitres' && /^chapitre\d+\.html$/.test(file)) sub = 'chapitre';
    else if (parts[1] === 'chapitres' && file === 'cartes.html') sub = 'cartes';
    else if (parts[1] === 'chapitres' && file === 'formules.html') sub = 'formules';
    else if (parts[1] === 'chapitres' && file === 'simulateur-examen.html') sub = 'simulateur-examen';
    else if (parts[1] === 'exercices') sub = 'exercices';

    let access = 'Libre (aucun compte)';
    if (first === 'epreuves') access = 'Compte connecte + niveau + abonnement actif (dossier entier)';
    else if (first === 'preparation-web') {
      access = parts[1] === 'assets'
        ? 'Libre (assets de la section)'
        : 'Compte B2 ou superieur + abonnement + mot de passe de section';
    } else if (sub === 'index' || sub === 'sommaire') access = 'Libre (aucun compte)';
    else if (sub === 'chapitre' && file === 'chapitre1.html') access = 'Libre (aucun compte)';
    else access = `Compte connecte + niveau ${level.toUpperCase()} ou superieur + abonnement actif`;

    return {
      family: `cours-${first}`,
      course: first,
      courseLevel: level,
      sub,
      status: 'servi-canonique',
      served: `/${rel}`,
      access,
      sheetDir: `pages/cours/${first}`
    };
  }

  if (first === 'public') {
    return {
      family: 'sources-auth',
      sub: 'public',
      status: 'source-publique-auth',
      served: `/_auth/${rel.replace(/^public\//, '')}`,
      access: rel.includes('admin/dashboard') ? 'Cookie admin_token valide (sinon redirection login admin)' : 'Libre',
      sheetDir: 'pages/sources-public'
    };
  }
  if (first === '_auth') {
    return {
      family: 'auth',
      sub: rel.includes('admin/') ? 'admin' : 'compte',
      status: 'miroir-racine-auth',
      served: `/_auth/${rel.replace(/^_auth\//, '')} (sert en realite public/...)`,
      access: rel.includes('admin/dashboard') ? 'Cookie admin_token valide' : 'Libre',
      sheetDir: 'pages/auth'
    };
  }
  if (parts.length === 1) {
    if (ROOT_ALLOWLIST.has(rel)) {
      return {
        family: 'app-shell', sub: file.replace(/\.html$/, ''), status: 'servi-racine',
        served: `/${rel}`, access: 'Libre', sheetDir: 'pages/app-shell'
      };
    }
    return {
      family: 'app-shell', sub: 'hors-allowlist', status: 'racine-non-servie',
      served: `/${rel} (bloque : absente de ROOT_ALLOWLIST)`,
      access: 'Inaccessible en production (404)', sheetDir: 'pages/app-shell'
    };
  }
  if (LEGACY_DIRS.has(first)) {
    return {
      family: 'hors-produit', sub: first.replace(/\s+/g, '-').toLowerCase(),
      status: first === 'b1' || first === 'verification' || first === 'corrections' || first === 'tests' || first === 'audit'
        ? 'bloque-serveur' : 'servi-local-render-seulement',
      served: first === 'b1' ? '/b1/... (403)' : `/${rel} (local/Render uniquement, absent du build dist)`,
      access: 'Hors produit / archive', sheetDir: `pages/hors-produit/${first.replace(/\s+/g, '-')}`
    };
  }
  return {
    family: 'autre', sub: first, status: 'non-classe',
    served: `/${rel}`, access: 'A verifier', sheetDir: `pages/autre/${first}`
  };
}

/* ------------------------------------------------------------------ */
/* Extraction d'une page                                              */
/* ------------------------------------------------------------------ */
function extract(abs, rel) {
  const html = fs.readFileSync(abs, 'utf8');
  const doc = parse(html);
  const nodes = [];
  walk(doc, (n) => { if (n.tagName) nodes.push(n); });

  const meta = {};
  const css = [];
  const scripts = [];
  let inlineStyles = 0;
  let inlineScripts = 0;
  let lang = '';
  let theme = '';
  let bodyChapter = '';

  for (const n of nodes) {
    const tag = n.tagName;
    if (tag === 'html') { lang = attr(n, 'lang'); theme = attr(n, 'data-theme'); }
    if (tag === 'body') bodyChapter = attr(n, 'data-chapter');
    if (tag === 'meta') {
      const name = attr(n, 'name') || attr(n, 'property');
      if (name) meta[name] = attr(n, 'content');
    }
    if (tag === 'link' && /stylesheet/i.test(attr(n, 'rel'))) css.push(attr(n, 'href'));
    if (tag === 'link' && /icon/i.test(attr(n, 'rel'))) meta.favicon = attr(n, 'href');
    if (tag === 'script') {
      if (attr(n, 'src')) scripts.push(attr(n, 'src')); else inlineScripts++;
    }
    if (tag === 'style') inlineStyles++;
  }

  const headings = [];
  for (const n of nodes.filter((x) => /^h[1-4]$/.test(x.tagName))) {
    headings.push({ level: Number(n.tagName[1]), text: clean(nodeText(n)) });
  }

  const links = [];
  for (const n of nodes.filter((x) => x.tagName === 'a')) {
    const text = clean(nodeText(n)).slice(0, 120);
    const href = attr(n, 'href');
    links.push({
      text,
      href,
      resolved: resolveHref(rel, href),
      external: /^(https?:|mailto:|tel:)/i.test(href),
      klass: clean(attr(n, 'class')),
      aria: attr(n, 'aria-label')
    });
  }

  const navs = [];
  for (const n of nodes.filter((x) => x.tagName === 'nav' || x.tagName === 'header')) {
    const items = [];
    walk(n, (c) => {
      if (c.tagName === 'a') items.push({ text: clean(nodeText(c)).slice(0, 60), href: attr(c, 'href') });
    });
    navs.push({
      tag: n.tagName,
      role: attr(n, 'role'),
      aria: attr(n, 'aria-label'),
      klass: clean(attr(n, 'class')),
      items: items.slice(0, 24),
      total: items.length
    });
  }

  const labelFor = new Map();
  for (const n of nodes.filter((x) => x.tagName === 'label')) {
    const f = attr(n, 'for');
    if (f) labelFor.set(f, clean(nodeText(n)).slice(0, 80));
  }

  const forms = [];
  for (const n of nodes.filter((x) => x.tagName === 'form')) {
    const fields = [];
    walk(n, (c) => {
      if (['input', 'select', 'textarea'].includes(c.tagName)) {
        fields.push({
          tag: c.tagName,
          type: attr(c, 'type'),
          id: attr(c, 'id'),
          name: attr(c, 'name'),
          placeholder: attr(c, 'placeholder'),
          required: (c.attrs || []).some((a) => a.name === 'required'),
          minlength: attr(c, 'minlength'),
          maxlength: attr(c, 'maxlength'),
          autocomplete: attr(c, 'autocomplete'),
          label: labelFor.get(attr(c, 'id')) || '',
          options: c.tagName === 'select'
            ? (c.childNodes || []).filter((o) => o.tagName === 'option').map((o) => clean(nodeText(o))).slice(0, 12)
            : undefined
        });
      }
    });
    forms.push({
      id: attr(n, 'id'),
      action: attr(n, 'action'),
      method: attr(n, 'method'),
      klass: clean(attr(n, 'class')),
      fields
    });
  }

  const buttons = [];
  for (const n of nodes.filter((x) => x.tagName === 'button')) {
    buttons.push({
      text: clean(nodeText(n)).slice(0, 90),
      type: attr(n, 'type'),
      id: attr(n, 'id'),
      klass: clean(attr(n, 'class')),
      aria: attr(n, 'aria-label'),
      disabled: (n.attrs || []).some((a) => a.name === 'disabled'),
      data: (n.attrs || []).filter((a) => a.name.startsWith('data-')).map((a) => `${a.name}=${a.value}`)
    });
  }

  const classCounts = new Map();
  for (const n of nodes) for (const c of classesOf(n)) classCounts.set(c, (classCounts.get(c) || 0) + 1);
  const classes = [...classCounts.entries()].sort((a, b) => b[1] - a[1]);

  const dataCounts = new Map();
  for (const n of nodes) for (const a of n.attrs || []) {
    if (a.name.startsWith('data-')) dataCounts.set(a.name, (dataCounts.get(a.name) || 0) + 1);
  }

  const labs = [];
  for (const n of nodes) {
    if (!(n.attrs || []).some((a) => a.name === 'data-lab')) continue;
    const title = n.childNodes ? n.childNodes.find((c) => c.tagName === 'div') : null;
    let labTitle = '';
    walk(n, (c) => {
      if (!labTitle && classesOf(c).includes('lab__title')) labTitle = clean(nodeText(c));
    });
    const sample = [];
    walk(n, (c) => {
      if (c.tagName === 'pre') sample.push(clean(nodeText(c)).slice(0, 160));
    });
    labs.push({
      exercise: attr(n, 'data-exercise') || attr(n, 'data-lab') || '(zone libre)',
      language: attr(n, 'data-language'),
      height: attr(n, 'data-height'),
      suspended: attr(n, 'data-grading-suspended') === '1',
      stdin: attr(n, 'data-stdin').replace(/&#10;/g, '\\n'),
      title: labTitle,
      sample: sample.slice(0, 2)
    });
  }

  const qcm = { blocks: 0, questions: 0 };
  const qcmNodes = nodes.filter((x) => classesOf(x).includes('qcm'));
  qcm.blocks = qcmNodes.length;
  for (const b of qcmNodes) {
    walk(b, (c) => { if (classesOf(c).includes('q')) qcm.questions++; });
  }

  const tables = [];
  for (const n of nodes.filter((x) => x.tagName === 'table')) {
    const rows = (n.childNodes || []).filter((c) => c.tagName === 'tr');
    const ths = [];
    walk(n, (c) => { if (c.tagName === 'th') ths.push(clean(nodeText(c)).slice(0, 40)); });
    tables.push({ rows: rows.length, headers: ths.slice(0, 10), totalHeaders: ths.length });
  }

  const modals = nodes
    .filter((n) => classesOf(n).some((c) => /modal|dialog/i.test(c)) || attr(n, 'role') === 'dialog' || (n.attrs || []).some((a) => a.name === 'aria-modal'))
    .map((n) => ({
      tag: n.tagName,
      id: attr(n, 'id'),
      klass: clean(attr(n, 'class')),
      role: attr(n, 'role'),
      label: attr(n, 'aria-labelledby'),
      heading: clean(nodeText(n)).slice(0, 160)
    }));

  const iconUses = [];
  for (const n of nodes.filter((x) => x.tagName === 'use')) {
    const href = attr(n, 'href');
    if (href && href.includes('#')) iconUses.push(href.split('#').pop());
  }

  const images = [];
  for (const n of nodes.filter((x) => x.tagName === 'img')) {
    images.push({ src: attr(n, 'src'), alt: attr(n, 'alt'), hasAlt: (n.attrs || []).some((a) => a.name === 'alt') });
  }

  const counts = {
    sections: nodes.filter((n) => n.tagName === 'section').length,
    articles: nodes.filter((n) => n.tagName === 'article').length,
    details: nodes.filter((n) => n.tagName === 'details').length,
    tables: tables.length,
    pre: nodes.filter((n) => n.tagName === 'pre').length,
    code: nodes.filter((n) => n.tagName === 'code').length,
    svg: nodes.filter((n) => n.tagName === 'svg').length,
    images: images.length,
    forms: forms.length,
    inputs: nodes.filter((n) => ['input', 'select', 'textarea'].includes(n.tagName)).length,
    buttons: buttons.length,
    links: links.length,
    labs: labs.length,
    flashcards: nodes.filter((n) => classesOf(n).includes('fc')).length,
    boxes: nodes.filter((n) => classesOf(n).some((c) => c === 'box' || c.startsWith('box--'))).length,
    hidden: nodes.filter((n) => (n.attrs || []).some((a) => a.name === 'hidden')).length,
    dialogs: nodes.filter((n) => n.tagName === 'dialog').length,
    words: clean(nodeText(doc)).split(/\s+/).filter(Boolean).length
  };

  const text = clean(nodeText(doc));
  const emoji = (text.match(/[\u{1F300}-\u{1FAFF}\u{2600}-\u{27BF}]/gu) || []).length;

  const a11y = {
    h1Count: headings.filter((h) => h.level === 1).length,
    buttonsWithoutName: buttons.filter((b) => !b.text && !b.aria).length,
    inputsWithoutLabel: forms.flatMap((f) => f.fields).filter((f) => f.id && !f.label).length,
    imagesWithoutAlt: images.filter((i) => !i.hasAlt).length,
    linksWithoutText: links.filter((l) => !l.text && !l.aria).length
  };

  const bodyClass = nodes.filter((n) => n.tagName === 'body').map((n) => clean(attr(n, 'class')))[0] || '';

  return {
    rel,
    title: clean((nodes.find((n) => n.tagName === 'title') ? nodeText(nodes.find((n) => n.tagName === 'title')) : '')),
    meta,
    lang,
    theme,
    bodyClass,
    bodyChapter,
    headings,
    navs,
    links,
    forms,
    buttons,
    tables,
    modals,
    labs,
    qcm,
    counts,
    classes: classes.slice(0, 60),
    classTotal: classes.length,
    dataAttrs: [...dataCounts.entries()].sort((a, b) => b[1] - a[1]).slice(0, 30),
    css: [...new Set(css.filter(Boolean))],
    scripts: [...new Set(scripts.filter(Boolean))],
    inlineStyles,
    inlineScripts,
    iconUses: [...new Set(iconUses)],
    images,
    a11y,
    emoji,
    hash: sha12(html),
    bytes: Buffer.byteLength(html),
    lines: html.split('\n').length,
    elements: nodes.length
  };
}

/* ------------------------------------------------------------------ */
/* Fiches Markdown                                                    */
/* ------------------------------------------------------------------ */
const SUB_STATES = {
  index: [
    'En-tête : marque + 3 liens (Epreuves, Atelier, Mon compte) + bouton profil + bascule de thème.',
    'Etat `prepLockedMsg` : bandeau « L\'atelier est protege » si `?preparation=locked`, refermable.',
    'Filtre de niveau : 4 onglets (B1/B2/B3/Tous), onglet actif noir, persistance `portal_selected_level`.',
    'Recherche : champ `#courseSearch`, filtrage en direct sur `data-title` ; compteur `#activeFilterCount`.',
    'Etat vide : `#portalEmptyState` (bloc pointille) avec bouton de reinitialisation des filtres.',
    'Carte « Reprendre » : masquee par defaut (`hidden`), visible si progression locale > 0.',
    'Utilisateur connecte : bouton profil marque `is-authenticated`, nom en title/aria-label.'
  ],
  sommaire: [
    'Table des matieres : une entree par chapitre, numero accentue, duree, badge « Acces libre » ou verrou.',
    'Ressources transverses : cartes Flashcards, Memo, Exercices, Atelier, Examens blancs.',
    'Actions : retour a l\'accueil du cours et « Commencer le chapitre 1 ».',
    'Etat verrouille (chapitres 2+) : icone cadenas et mention « B1 et plus » / « Reserve B3 ».'
  ],
  chapitre: [
    'En-tete compact : fil d\'Ariane, titre, meta (module, duree, statut gratuit).',
    'Encadres pedagogiques : mise en situation, objectifs, intuition, piege, methode, technique, revision.',
    'Tableaux de donnees et blocs pseudo-code defilables horizontalement.',
    'Exercices de code (`div.lab[data-lab]`) : editeur, entree standard, console a 3 onglets, tuteur IA.',
    'Correction suspendue si `data-grading-suspended="1"` : bouton « Validation suspendue » desactive et avis visible.',
    'QCM : options desactivees apres reponse, bonne reponse `is-correct`, mauvaise `is-wrong`, explication `is-shown`.',
    'Score QCM : `Score : n/N (p %)` + palier de maitrise (4 bandes).',
    'Checklist de maitrise : case `data-mark-done`, etat persiste en localStorage par chapitre.',
    'Navigation de bas de page : chapitre precedent / suivant.'
  ],
  cartes: [
    'Grille de cartes recto/verso ; clic ou Entree/Espace retourne la carte (`is-flipped`, `aria-pressed`).',
    'Recto : notion ; verso : definition/reponse.'
  ],
  formules: [
    'Page memo : tableaux de correspondance pseudo-code / Pascal / Python, blocs de code.',
    'Aucun etat dynamique propre (lecture seule).'
  ],
  'simulateur-examen': [
    'Chronometre `[data-timer][data-minutes]` : bouton Demarrer, affichage mm:ss, etat « Temps ecoule ».',
    'QCM d\'examen : correction revelee apres reponse (selon le mode de la page).',
    'Etat session serveur (API QCM) : non expose dans le HTML statique.'
  ],
  exercices: [
    'Liste d\'exercices et projet integrateur ; blocs de code et liens vers l\'atelier.',
    'Exercices executables eventuels (meme composant `lab`).'
  ],
  atelier: [
    'Zone libre `data-lab` avec code de depart, entree standard pre-remplie, console, tuteur IA.',
    'Execution uniquement au clic (ou Ctrl+Entree) ; bouton Stop pendant l\'execution.',
    'Etats de statut : pret, execution, succes, erreur, delai depasse, quota, service indisponible.',
    'Encadres explicatifs et trois erreurs classiques.'
  ],
  autre: ['Page secondaire du cours ; etats derives du composant principal present.']
};

function stateList(cls, page) {
  if (cls.family.startsWith('cours-')) {
    return SUB_STATES[cls.sub] || SUB_STATES.autre;
  }
  if (cls.family === 'app-shell') {
    if (cls.sub === 'index') return SUB_STATES.index;
    if (cls.sub === '404') return ['Page d\'erreur pleine page : code 404, titre, texte, 2 actions (portail, atelier).'];
    if (cls.sub.startsWith('preparation-')) return ['Page outil de la section Preparation Web (consultee hors app-shell).'];
    return ['Fichier racine present sur disque mais non servi (absent de ROOT_ALLOWLIST).'];
  }
  if (cls.family === 'auth') {
    if (cls.sub === 'admin') {
      return page.includes('dashboard')
        ? ['Ecran masque tant que `/api/admin/verify` n\'a pas repondu ; sinon redirection login.',
           '5 onglets : Comptes, Sessions, Paiements, Journal, Fournisseurs & Cles IA.',
           '6 cartes de statistiques, tableaux, etats vides, modale de confirmation, toast.']
        : ['Formulaire identifiant/mot de passe, bouton avec spinner puis etat succes, message d\'erreur inline.'];
    }
    return ['Vues mutuellement exclusives : connexion, inscription, mot de passe oublie, nouveau mot de passe.',
            'Messages d\'erreur (rouge) et de succes (vert) inline ; bouton desactive pendant l\'appel.',
            'Compte deja connecte : redirection vers la page compte.'];
  }
  if (cls.family === 'preparation-web') {
    return ['Trois portes : non connecte, non abonne, mot de passe de section non saisi.',
            'Rail de projets, editeur 3 onglets, apercu iframe, validation par criteres, quiz bonus, XP, classement.',
            'Modales Progression et Solution, panneau IA, toast, autocompletion.'];
  }
  if (cls.family === 'epreuves') {
    return ['Contenu integralement protege (meme l\'index) : redirection login, puis paywall.'];
  }
  return ['Page hors produit : aucun etat d\'interface a reconstruire.'];
}

function sheetFor(page, cls) {
  const L = [];
  const rel = page.rel;
  L.push(`# ${page.headings.find((h) => h.level === 1)?.text || page.title || rel}`);
  L.push('');
  L.push(`> Fiche extraite du fichier \`${rel}\` (${page.lines} lignes, ${(page.bytes / 1024).toFixed(1)} Ko, sha256 \`${page.hash}\`).`);
  L.push(`> Famille : **${cls.family}** · sous-type : \`${cls.sub}\` · statut : **${cls.status}**.`);
  L.push('> Cette fiche decrit ce que le document contient reellement ; les elements deduits du JavaScript sont signales `[deduit]` et references au document thematique.');
  L.push('');

  L.push('## 1. Identite et acces');
  L.push('');
  L.push('| Champ | Valeur |');
  L.push('|---|---|');
  L.push(`| URL servie | \`${cls.served}\` |`);
  L.push(`| Titre du document | ${esc(page.title) || '—'} |`);
  L.push(`| Description meta | ${esc(page.meta.description) || '—'} |`);
  L.push(`| Robots | ${esc(page.meta.robots) || 'indexable (defaut)'} |`);
  L.push(`| Langue / theme | \`${page.lang || '—'}\` / \`${page.theme || 'defaut'}\` |`);
  L.push(`| Chapitre (body) | ${page.bodyChapter || '—'} |`);
  L.push(`| Regle d'acces | ${esc(cls.access)} |`);
  L.push(`| Statut de service | ${esc(cls.status)} |`);
  L.push('');

  L.push('## 2. Structure du document (ordre observe)');
  L.push('');
  L.push('| # | Element | Classe / role | Contenu cle |');
  L.push('|---|---|---|---|');
  const structure = [];
  if (page.navs.length) structure.push(['nav', page.navs[0].klass || page.navs[0].tag, `${page.navs[0].total} liens, aria="${page.navs[0].aria}"`]);
  const h1 = page.headings.find((h) => h.level === 1);
  if (h1) structure.push(['h1', '—', h1.text]);
  page.headings.filter((h) => h.level === 2).slice(0, 12).forEach((h) => structure.push(['h2', '—', h.text]));
  if (page.forms.length) structure.push(['form', page.forms.map((f) => f.id || '(sans id)').join(', '), `${page.forms.length} formulaire(s)`]);
  if (page.counts.labs) structure.push(['.lab', 'code lab', `${page.counts.labs} bloc(s)`]);
  if (page.qcm.questions) structure.push(['.qcm', 'QCM', `${page.qcm.questions} question(s)`]);
  if (page.counts.tables) structure.push(['table', '—', `${page.counts.tables} tableau(x)`]);
  if (page.modals.length) structure.push(['.modal', 'dialogue', `${page.modals.length} element(s)`]);
  structure.slice(0, 24).forEach((r, i) => L.push(`| ${i + 1} | ${esc(r[0])} | ${esc(r[1])} | ${esc(r[2])} |`));
  if (!structure.length) L.push('| 1 | main | — | Page sans navigation ni composant structurel majeur |');
  L.push('');

  L.push('## 3. Hierarchie des titres');
  L.push('');
  if (page.headings.length) {
    page.headings.slice(0, 40).forEach((h) => L.push(`${'  '.repeat(Math.max(0, h.level - 1))}- **H${h.level}** — ${esc(h.text)}`));
    if (page.headings.length > 40) L.push(`- … ${page.headings.length - 40} titre(s) supplementaire(s)`);
  } else {
    L.push('- Aucun titre (`h1`–`h4`) dans le document.');
  }
  L.push('');

  L.push('## 4. Navigation et liens');
  L.push('');
  if (page.navs.length) {
    L.push('| Zone | Classe | Liens |');
    L.push('|---|---|---|');
    page.navs.slice(0, 4).forEach((n) => {
      L.push(`| ${n.tag}${n.role ? ` (role=${n.role})` : ''} | \`${esc(n.klass) || '—'}\` | ${n.items.map((i) => `${esc(i.text) || '(icone)'} → \`${esc(i.href)}\``).join('<br>')} |`);
    });
    L.push('');
  }
  L.push(`Liens sortants : **${page.links.length}** (externes : ${page.links.filter((l) => l.external).length}).`);
  if (page.links.length) {
    const uniq = [];
    const seen = new Set();
    for (const l of page.links) {
      const k = l.text + '|' + l.href;
      if (seen.has(k)) continue;
      seen.add(k);
      uniq.push(l);
    }
    L.push('');
    L.push('| Libelle | href | Cible resolue | Type |');
    L.push('|---|---|---|---|');
    uniq.slice(0, 24).forEach((l) => {
      L.push(`| ${esc(l.text) || '(sans texte)'} | \`${esc(l.href)}\` | \`${esc(l.resolved)}\` | ${l.external ? 'externe' : l.href.startsWith('#') ? 'ancre' : 'interne'} |`);
    });
    if (uniq.length > 24) L.push(`| … | | | ${uniq.length - 24} lien(s) supplementaire(s) |`);
  }
  L.push('');

  L.push('## 5. Formulaires et champs');
  L.push('');
  if (!page.forms.length) L.push('Aucun formulaire dans cette page.');
  page.forms.slice(0, 6).forEach((f, i) => {
    L.push(`### Formulaire ${i + 1} — \`${esc(f.id) || '(sans id)'}\``);
    L.push('');
    L.push(`- action : \`${esc(f.action) || '(aucune)'}\` · methode : \`${esc(f.method) || 'GET'}\` · classe : \`${esc(f.klass) || '—'}\``);
    if (!f.fields.length) L.push('- Aucun champ.');
    else {
      L.push('');
      L.push('| Champ | type | id / name | Label | Placeholder | Requis |');
      L.push('|---|---|---|---|---|---|');
      f.fields.slice(0, 20).forEach((c) => {
        L.push(`| ${c.tag} | ${esc(c.type) || '—'} | \`${esc(c.id || c.name) || '—'}\` | ${esc(c.label) || '—'} | ${esc(c.placeholder) || '—'} | ${c.required ? 'oui' : 'non'} |`);
      });
    }
    L.push('');
  });

  L.push('## 6. Boutons et controles interactifs');
  L.push('');
  if (!page.buttons.length) L.push('Aucun `<button>` dans le document (les actions peuvent etre des liens stylises).');
  else {
    L.push('| Libelle | type | id | classes | aria-label | Etat initial | data-* |');
    L.push('|---|---|---|---|---|---|---|');
    page.buttons.slice(0, 30).forEach((b) => {
      L.push(`| ${esc(b.text) || '(icone)'} | ${esc(b.type)} | ${esc(b.id) || '—'} | \`${esc(b.klass) || '—'}\` | ${esc(b.aria) || '—'} | ${b.disabled ? 'desactive' : 'actif'} | ${esc(b.data.join(' ')) || '—'} |`);
    });
    if (page.buttons.length > 30) L.push(`| … | | | | | | ${page.buttons.length - 30} de plus |`);
  }
  L.push('');

  L.push('## 7. Composants pedagogiques et etats observes');
  L.push('');
  if (page.labs.length) {
    L.push('| Exercice | Langage | Hauteur | Correction | Entree standard | Titre |');
    L.push('|---|---|---|---|---|---|');
    page.labs.slice(0, 12).forEach((l) => {
      L.push(`| \`${esc(l.exercise)}\` | ${esc(l.language) || '—'} | ${esc(l.height) || '—'} | ${l.suspended ? 'suspendue' : 'active'} | \`${esc(l.stdin) || '(vide)'}\` | ${esc(l.title) || '—'} |`);
    });
    L.push('');
  }
  if (page.qcm.questions) {
    L.push(`- QCM : ${page.qcm.blocks} bloc(s), **${page.qcm.questions} question(s)**.`);
  }
  if (page.counts.flashcards) L.push(`- Flashcards : ${page.counts.flashcards} carte(s) (\`.fc\`).`);
  if (page.counts.boxes) L.push(`- Encadres pedagogiques : ${page.counts.boxes} (\`.box\`, variantes \`box--*\`).`);
  if (page.counts.details) L.push(`- Blocs replies : ${page.counts.details} (\`<details>\`).`);
  if (page.counts.hidden) L.push(`- Elements masques au chargement : ${page.counts.hidden} attribut(s) \`hidden\`.`);
  L.push('');
  L.push('Etats et interactions a reconstruire :');
  L.push('');
  stateList(cls, rel).forEach((s) => L.push(`- ${s}`));
  L.push('');

  L.push('## 8. Tableaux, code et medias');
  L.push('');
  L.push(`- Tableaux : ${page.counts.tables}${page.tables.length ? ` (${page.tables.map((t) => `${t.rows} lignes / ${t.totalHeaders} en-tetes`).join(' ; ')})` : ''}`);
  L.push(`- Blocs \`pre\` : ${page.counts.pre} · elements \`code\` : ${page.counts.code}`);
  L.push(`- SVG inline : ${page.counts.svg} · images : ${page.counts.images}${page.images.length ? ` (${page.images.map((i) => i.alt || i.src).slice(0, 6).join(', ')})` : ''}`);
  L.push(`- Icones du sprite utilisees : ${page.iconUses.length ? page.iconUses.map((i) => `\`#${i}\``).join(', ') : 'aucune'}`);
  L.push(`- Volume de texte : ~${page.counts.words} mots · ${page.elements} noeuds HTML`);
  L.push('');

  L.push('## 9. Ressources chargees');
  L.push('');
  L.push(`- Feuilles de style : ${page.css.length ? page.css.map((c) => `\`${c}\``).join(', ') : 'aucune (styles inline uniquement)'}`);
  L.push(`- Scripts externes : ${page.scripts.length ? page.scripts.map((s) => `\`${s}\``).join(', ') : 'aucun'}`);
  L.push(`- Blocs \`<style>\` inline : ${page.inlineStyles} · scripts inline : ${page.inlineScripts}`);
  L.push('');

  L.push('## 10. Classes et attributs data observes');
  L.push('');
  L.push(`Classes distinctes : ${page.classTotal}. Les plus frequentes :`);
  L.push('');
  L.push('| Classe | Occurrences |');
  L.push('|---|---|');
  page.classes.slice(0, 20).forEach(([c, n]) => L.push(`| \`${esc(c)}\` | ${n} |`));
  if (page.dataAttrs.length) {
    L.push('');
    L.push(`Attributs \`data-*\` : ${page.dataAttrs.map(([a, n]) => `\`${a}\` (${n})`).join(', ')}`);
  } else {
    L.push('');
    L.push('Aucun attribut `data-*`.');
  }
  L.push('');

  L.push('## 11. Controle qualite automatique');
  L.push('');
  L.push(`- Titres \`h1\` : ${page.a11y.h1Count}${page.a11y.h1Count === 1 ? '' : ' (a verifier)'}`);
  L.push(`- Boutons sans texte ni aria-label : ${page.a11y.buttonsWithoutName}`);
  L.push(`- Champs identifies sans label associe : ${page.a11y.inputsWithoutLabel}`);
  L.push(`- Images sans attribut alt : ${page.a11y.imagesWithoutAlt}`);
  L.push(`- Liens sans texte ni aria-label : ${page.a11y.linksWithoutText}`);
  L.push(`- Emoji detectes : ${page.emoji} (la charte du produit les proscrit)`);
  L.push('');

  L.push('## 12. Renvois');
  L.push('');
  const up = '../'.repeat(String(cls.sheetDir || '').split('/').filter(Boolean).length);
  L.push(`- Layouts et gabarits : [04_LAYOUTS_ET_STRUCTURES.md](${up}04_LAYOUTS_ET_STRUCTURES.md)`);
  L.push(`- Composants et etats : [05_COMPOSANTS_REUTILISABLES.md](${up}05_COMPOSANTS_REUTILISABLES.md) · [10_ETATS_INTERFACE.md](${up}10_ETATS_INTERFACE.md)`);
  L.push(`- Regles d'acces : [11_ETATS_CONDITIONNELS.md](${up}11_ETATS_CONDITIONNELS.md) · [17_REGLES_METIER.md](${up}17_REGLES_METIER.md)`);
  L.push(`- Captures a produire : [22_REGISTRE_CAPTURES.md](${up}22_REGISTRE_CAPTURES.md)`);
  L.push('');
  L.push(`*Fiche generee le ${GENERATED_AT} par \`tools/extract.mjs\` ; donnees brutes dans \`evidence/pages.json\`.`);
  L.push('');
  return L.join('\n');
}

/* ------------------------------------------------------------------ */
/* Exécution                                                          */
/* ------------------------------------------------------------------ */
const abs = walkDir(ROOT).filter((f) => {
  const rel = path.relative(ROOT, f).split(path.sep).join('/');
  return !rel.startsWith('docs/');
});
abs.sort();

const pages = [];
for (const file of abs) {
  const rel = path.relative(ROOT, file).split(path.sep).join('/');
  try {
    const p = extract(file, rel);
    p.cls = classify(rel);
    pages.push(p);
  } catch (e) {
    console.error('ECHEC extraction', rel, e.message);
  }
}

fs.mkdirSync(path.join(DOCS, 'evidence'), { recursive: true });

/* JSON brut */
fs.writeFileSync(path.join(DOCS, 'evidence', 'pages.json'), JSON.stringify(pages, null, 1));

/* CSV registre */
const csvCell = (v) => `"${String(v == null ? '' : v).replace(/"/g, '""')}"`;
const csv = ['chemin,url_servie,famille,sous_type,statut,titre,h1,lignes,octets,sha256,acces,nav_items,liens,formulaires,champs,boutons,labs,qcm_questions,tableaux,modales,details,svg,images,mots,emoji,h1_count'];
for (const p of pages) {
  csv.push([
    p.rel, p.cls.served, p.cls.family, p.cls.sub, p.cls.status, p.title,
    p.headings.find((h) => h.level === 1)?.text || '',
    p.lines, p.bytes, p.hash, p.cls.access,
    p.navs.reduce((n, x) => n + x.total, 0), p.counts.links, p.counts.forms, p.counts.inputs,
    p.counts.buttons, p.counts.labs, p.qcm.questions, p.counts.tables, p.modals.length,
    p.counts.details, p.counts.svg, p.counts.images, p.counts.words, p.emoji, p.a11y.h1Count
  ].map(csvCell).join(','));
}
fs.writeFileSync(path.join(DOCS, 'evidence', 'pages.csv'), csv.join('\n') + '\n');

/* Fiches */
let written = 0;
for (const p of pages) {
  const outDir = path.join(DOCS, p.cls.sheetDir);
  fs.mkdirSync(outDir, { recursive: true });
  const name = p.rel
    .replace(/^.*?\//, '')                    // retire le premier segment (deja dans le dossier)
    .replace(/\.html$/i, '')
    .replace(/[^a-zA-Z0-9._-]+/g, '-');
  const sheetRel = path.join(p.cls.sheetDir, `${name || 'index'}.md`).split(path.sep).join('/');
  p.sheet = sheetRel;
  fs.writeFileSync(path.join(DOCS, sheetRel), sheetFor(p, p.cls));
  written++;
}

/* Icones */
const icons = new Set();
const uiSvg = path.join(ROOT, 'assets', 'img', 'ui-icons.svg');
if (fs.existsSync(uiSvg)) {
  const svg = fs.readFileSync(uiSvg, 'utf8');
  for (const m of svg.matchAll(/<symbol[^>]*id="([^"]+)"/g)) icons.add(m[1]);
}
fs.writeFileSync(path.join(DOCS, 'evidence', 'icons.json'), JSON.stringify([...icons].sort(), null, 1));

/* Variables CSS */
const cssVars = {};
for (const f of fs.readdirSync(path.join(ROOT, 'assets', 'css'))) {
  if (!f.endsWith('.css')) continue;
  const txt = fs.readFileSync(path.join(ROOT, 'assets', 'css', f), 'utf8');
  for (const m of txt.matchAll(/(--[a-z0-9-]+)\s*:\s*([^;{}]+);/gi)) {
    if (!cssVars[m[1]]) cssVars[m[1]] = { value: m[2].trim(), files: [] };
    if (!cssVars[m[1]].files.includes(f)) cssVars[m[1]].files.push(f);
  }
}
fs.writeFileSync(path.join(DOCS, 'evidence', 'css-vars.json'), JSON.stringify(cssVars, null, 1));

/* Résumé */
const byFamily = {};
const byStatus = {};
for (const p of pages) {
  byFamily[p.cls.family] = (byFamily[p.cls.family] || 0) + 1;
  byStatus[p.cls.status] = (byStatus[p.cls.status] || 0) + 1;
}
const summary = {
  generatedAt: GENERATED_AT,
  totalPages: pages.length,
  sheetsWritten: written,
  missingSheets: pages.filter((p) => !p.sheet).length,
  byFamily,
  byStatus,
  totals: {
    labs: pages.reduce((n, p) => n + p.counts.labs, 0),
    qcmQuestions: pages.reduce((n, p) => n + p.qcm.questions, 0),
    forms: pages.reduce((n, p) => n + p.counts.forms, 0),
    tables: pages.reduce((n, p) => n + p.counts.tables, 0),
    buttons: pages.reduce((n, p) => n + p.counts.buttons, 0),
    emojiPages: pages.filter((p) => p.emoji > 0).length
  }
};
fs.writeFileSync(path.join(DOCS, 'evidence', 'summary.json'), JSON.stringify(summary, null, 1));

/* Matrice CSV */
const m = ['famille,page,fiche,statut,url_servie,acces'];
for (const p of pages) m.push([p.cls.family, p.rel, p.sheet, p.cls.status, p.cls.served, p.cls.access].map(csvCell).join(','));
fs.writeFileSync(path.join(DOCS, 'evidence', 'matrice.csv'), m.join('\n') + '\n');

/* Inventaire MD */
const famRows = Object.entries(byFamily).sort((a, b) => b[1] - a[1])
  .map(([f, n]) => `| \`${f}\` | ${n} |`).join('\n');
const statRows = Object.entries(byStatus).sort((a, b) => b[1] - a[1])
  .map(([s, n]) => `| \`${s}\` | ${n} |`).join('\n');

const inv = `# 03 — Inventaire exhaustif des pages

> Genere le ${GENERATED_AT} par \`tools/extract.mjs\`. Source : parcours recursif du depot, exclusion des dossiers de build/dependances/archives.
> Donnees completes : [\`evidence/pages.csv\`](evidence/pages.csv) · fiches : \`pages/\`.

## 1. Chiffres cles

| Indicateur | Valeur |
|---|---|
| Pages HTML decouvertes | **${pages.length}** |
| Fiches individuelles generees | **${written}** |
| Pages sans fiche | **${summary.missingSheets}** |
| Blocs code lab | ${summary.totals.labs} |
| Questions QCM (HTML rendu) | ${summary.totals.qcmQuestions} |
| Formulaires | ${summary.totals.forms} |
| Tableaux | ${summary.totals.tables} |
| Boutons | ${summary.totals.buttons} |
| Pages contenant de l'emoji | ${summary.totals.emojiPages} |

## 2. Repartition par famille

| Famille | Pages |
|---|---|
${famRows}

## 3. Repartition par statut de service

| Statut | Pages |
|---|---|
${statRows}

Les statuts signifient :

- \`servi-canonique\` : page d'un cours du registre \`server/courses.js\`, servie en production.
- \`servi-racine\` : fichier racine present dans l'allowlist de \`server.js\`.
- \`source-publique-auth\` : fichier de \`public/\`, servi sous \`/_auth/...\`.
- \`miroir-racine-auth\` : copie \`_auth/\` a la racine ; **non servie** par \`server.js\` (le prefixe \`/_auth/\` lit \`public/\`).
- \`racine-non-servie\` : fichier HTML racine absent de l'allowlist (inaccessible en production).
- \`servi-local-render-seulement\` : dossier hors registre, accessible uniquement en mode local/Render et absent du build \`dist/\`.
- \`bloque-serveur\` : prefixe explicitement bloque par \`server.js\` (403).

## 4. Registre complet

Le registre exhaustif, page par page, se trouve dans [\`evidence/pages.csv\`](evidence/pages.csv) et la correspondance page → fiche dans [\`evidence/matrice.csv\`](evidence/matrice.csv).
Chaque chemin ci-dessous possede une fiche individuelle ; la matrice [23_MATRICE_COUVERTURE.md](23_MATRICE_COUVERTURE.md) en apporte la preuve comptable.
`;
fs.writeFileSync(path.join(DOCS, '03_INVENTAIRE_PAGES.md'), inv);

/* Matrice MD */
const rows = pages.map((p) => `| \`${p.rel}\` | [fiche](${p.sheet}) | ${p.cls.status} | ${esc(p.cls.access)} |`).join('\n');
const mat = `# 23 — Matrice de couverture

> Generee le ${GENERATED_AT}. Chaque ligne provient d'un fichier HTML reellement present sur disque.
> Verification : **${pages.length} pages decouvertes / ${written} fiches ecrites / ${summary.missingSheets} manquante(s)**.

## 1. Preuve de completude

| Controle | Resultat |
|---|---|
| Fichiers HTML trouves (hors node_modules, dist, docs, archives) | ${pages.length} |
| Fiches Markdown generees | ${written} |
| Pages decouvertes sans fiche | ${summary.missingSheets} |
| Familles documentees | ${Object.keys(byFamily).length} |
| Statuts de service distincts | ${Object.keys(byStatus).length} |

## 2. Matrice page → fiche → statut → acces

| Page (chemin source) | Fiche | Statut | Regle d'acces |
|---|---|---|---|
${rows}
`;
fs.writeFileSync(path.join(DOCS, '23_MATRICE_COUVERTURE.md'), mat);

console.log(JSON.stringify(summary, null, 2));

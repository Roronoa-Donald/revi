/**
 * Pages « cartes de révision » et « mémo » du cours « React » B2.
 */
'use strict';

const { crumb, cards } = require('../../../../scripts/course-kit');
const { chnav } = require('./helpers');

/* ======================== Cartes ======================== */

function cartes(course, chapterList) {
  const modules = chapterList.map(chapitre => ({
    title: 'Module ' + chapitre.n + ' — ' + chapitre.title,
    items: chapitre.flashcards
  }));

  const body = [
    crumb(course, [{ href: '../index.html', label: course.brand }, { href: '../sommaire.html', label: 'Sommaire' }, { label: 'Cartes' }]),
    '  <h1>Cartes de révision</h1>',
    '  <p class="lead">Cliquez sur une carte pour révéler la réponse. Objectif : répondre sans hésiter dans ' +
    'les deux sens pour ancrer durablement les concepts clés de React.</p>',
    cards(modules),
    chnav({ href: '../sommaire.html', label: 'Sommaire' }, { href: 'formules.html', label: 'Mémo syntaxe' })
  ].join('\n\n');

  return {
    'chapitres/cartes.html': {
      title: 'Cartes de révision — ' + course.brand,
      description: 'Flashcards de révision du cours de React B2 : notions clés des ' +
        chapterList.length + ' chapitres.',
      active: 'cartes',
      body
    }
  };
}

/* ======================== Mémo ======================== */

function formules(course) {
  const bloc = (titre, html) => '  <h2>' + titre + '</h2>\n' + html;

  const body = [
    crumb(course, [{ href: '../index.html', label: course.brand }, { href: '../sommaire.html', label: 'Sommaire' }, { label: 'Mémo' }]),
    '  <h1>Mémo syntaxe React</h1>',
    '  <p class="lead">Toutes les structures et syntaxes essentielles de React réunies sur une seule page. ' +
    'À garder ouvert pendant vos ateliers pratiques.</p>',

    bloc('1. Fondations JSX & Composants', [
      '<pre><code>// Règle 1 : Racine unique ou Fragment\nreturn (\n  &lt;&gt;\n    &lt;h1&gt;Titre&lt;/h1&gt;\n    &lt;p&gt;Contenu&lt;/p&gt;\n  &lt;/&gt;\n);\n\n// Règle 2 : Attributs en camelCase et balises auto-fermantes\n&lt;input className="form-control" type="text" tabIndex={1} /&gt;\n\n// Règle 3 : Évaluation d’expressions JavaScript entre accolades\n&lt;span&gt;Total : {prix * quantite} €&lt;/span&gt;</code></pre>'
    ].join('\n')),

    bloc('2. Props & Composition', [
      '<pre><code>// Composant avec déstructuration et valeur de repli\nfunction UserBadge({ nom, role = \'visiteur\', children }) {\n  return (\n    &lt;div className="badge"&gt;\n      &lt;strong&gt;{nom}&lt;/strong&gt; ({role})\n      &lt;div&gt;{children}&lt;/div&gt;\n    &lt;/div&gt;\n  );\n}\n\n// Utilisation\n&lt;UserBadge nom="Alice" role="admin"&gt;\n  &lt;p&gt;Droits d’accès complets&lt;/p&gt;\n&lt;/UserBadge&gt;</code></pre>'
    ].join('\n')),

    bloc('3. État local (useState) & Formulaires', [
      '<pre><code>// Déclaration d’état et setter\nconst [compteur, setCompteur] = useState(0);\nconst [texte, setTexte] = useState(\'\');\n\n// Mise à jour basée sur l’état précédent\nsetCompteur(prev =&gt; prev + 1);\n\n// Input contrôlé et soumission sans rechargement\n&lt;form onSubmit={(e) =&gt; { e.preventDefault(); envoyer(); }}&gt;\n  &lt;input value={texte} onChange={(e) =&gt; setTexte(e.target.value)} /&gt;\n&lt;/form&gt;</code></pre>'
    ].join('\n')),

    bloc('4. Listes (map) & Rendu conditionnel', [
      '<pre><code>// Rendu de liste avec prop key unique\n&lt;ul&gt;\n  {articles.map(article =&gt; (\n    &lt;li key={article.id}&gt;{article.titre}&lt;/li&gt;\n  ))}\n&lt;/ul&gt;\n\n// Rendu conditionnel ternaire et court-circuit\n{estConnecte ? &lt;Dashboard /&gt; : &lt;Login /&gt;}\n{nbAlertes &gt; 0 &amp;&amp; &lt;span className="pastille"&gt;{nbAlertes}&lt;/span&gt;}</code></pre>'
    ].join('\n')),

    bloc('5. Effets de bord (useEffect)', [
      '<pre><code>// 1. Montage initial uniquement\nuseEffect(() =&gt; {\n  console.log(\'Composant monté\');\n}, []);\n\n// 2. Synchronisation sur dépendance avec nettoyage\nuseEffect(() =&gt; {\n  const timer = setInterval(() =&gt; tick(), 1000);\n  return () =&gt; clearInterval(timer); // Cleanup au démontage\n}, [intervalle]);\n\n// 3. Appel API asynchrone sécurisé\nuseEffect(() =&gt; {\n  let actif = true;\n  async function load() {\n    const data = await fetchUser(id);\n    if (actif) setUser(data);\n  }\n  load();\n  return () =&gt; { actif = false; };\n}, [id]);</code></pre>'
    ].join('\n')),

    bloc('6. Routage (React Router v6)', [
      '<pre><code>import { BrowserRouter, Routes, Route, Link, useParams } from \'react-router-dom\';\n\n// Arborescence des routes\n&lt;BrowserRouter&gt;\n  &lt;nav&gt;&lt;Link to="/accueil"&gt;Accueil&lt;/Link&gt;&lt;/nav&gt;\n  &lt;Routes&gt;\n    &lt;Route path="/accueil" element={&lt;Accueil /&gt;} /&gt;\n    &lt;Route path="/article/:id" element={&lt;DetailArticle /&gt;} /&gt;\n  &lt;/Routes&gt;\n&lt;/BrowserRouter&gt;\n\n// Extraction d’un paramètre dynamique dans le composant\nfunction DetailArticle() {\n  const { id } = useParams();\n  return &lt;h2&gt;Article #{id}&lt;/h2&gt;;\n}</code></pre>'
    ].join('\n')),

    chnav({ href: 'cartes.html', label: 'Cartes de révision' }, { href: 'exercices/exercices.html', label: 'Exercices & projet' })
  ].join('\n\n');

  return {
    'chapitres/formules.html': {
      title: 'Mémo syntaxe — ' + course.brand,
      description: 'Fiche mémo synthétique du cours de React B2 : JSX, props, useState, useEffect, listes et React Router.',
      active: 'memo',
      body
    }
  };
}

module.exports = { cartes, formules };

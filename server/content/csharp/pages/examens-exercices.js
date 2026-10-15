/**
 * Pages « examens » et « exercices » du cours « C# B2 ».
 */
'use strict';

const { ic, crumb, box } = require('../../../../scripts/course-kit');
const { chnav, disclaimer } = require('./helpers');

/* ======================== Examens Blancs ======================== */

function examens(course) {
  const crumbs = crumb(course, [
    { label: 'Accueil', href: '../index.html' },
    { label: 'Sommaire', href: '../sommaire.html' },
    { label: 'Examens blancs' }
  ]);

  const body = [
    crumbs,
    '  <h1>Examens Blancs &amp; Épreuves Corrigées de C# B2</h1>',
    '  <p class="lead">Deux sujets d’entraînement intensif conformes aux épreuves de licence informatique B2, accompagnés de leurs corrigés types et barèmes détaillés.</p>',
    '',
    '  <h2>Épreuve 1 : Contrôle Continu (CC) — Durée 1 h 30 (Barème sur 20 points)</h2>',
    box('standard', 'Sujet du Contrôle Continu — Fondamentaux CLR, Encapsulation &amp; Polymorphisme', [
      '<h4>Partie 1 : Questions de cours &amp; Architecture CLR (6 points)</h4>',
      '<ol>',
      '  <li>Définissez précisément les opérations de boxing et d’unboxing en C#. Pourquoi constituent-elles un goulot d’étranglement de performance sur des boucles intensives ? (3 pts)</li>',
      '  <li>Quelle est la différence fondamentale entre les mots-clés <code>override</code> et <code>new</code> lorsqu’une classe dérivée redéfinit une méthode présente dans sa classe parente ? (3 pts)</li>',
      '</ol>',
      '<h4>Partie 2 : Conception orientée objet &amp; Immuabilité (8 points)</h4>',
      '<p>On souhaite modéliser un système de gestion de transactions financières immuables :</p>',
      '<ol>',
      '  <li>Déclarez un <code>record</code> C# <code>Transaction</code> comportant un identifiant de type chaîne, un montant décimal (<code>decimal</code>) et une date d’opération (<code>DateTime</code>). (2 pts)</li>',
      '  <li>Expliquez le fonctionnement de l’égalité par valeur sur les records et écrivez une ligne de code utilisant l’expression <code>with</code> pour créer une nouvelle transaction avec un statut ajusté à « Valide ». (3 pts)</li>',
      '  <li>Concevez une classe <code>CompteBancaire</code> avec une propriété <code>Solde</code> accessible en lecture publique et écriture privée, ainsi qu’une méthode <code>Crediter(decimal montant)</code> levant une <code>ArgumentException</code> si le montant est inférieur ou égal à zéro. (3 pts)</li>',
      '</ol>',
      '<h4>Partie 3 : Interfaces multiples &amp; Implémentation explicite (6 points)</h4>',
      '<p>Soit deux interfaces <code>ILogger</code> et <code>IAuditor</code> possédant toutes deux la méthode <code>void Log(string message)</code>. Implémentez une classe <code>ServicePaiement</code> qui fournit deux comportements distincts pour chacune de ces interfaces en utilisant l’implémentation explicite d’interface. Montrez comment l’appelant consomme ces deux méthodes. (6 pts)</p>'
    ].join('\n')),
    '',
    box('solution', 'Corrigé type &amp; Barème détaillé du Contrôle Continu', [
      '<h4>Corrigé Partie 1 (6 points)</h4>',
      '<ul>',
      '  <li><strong>Boxing / Unboxing (3 pts) :</strong> Le boxing consiste à encapsuler une variable de type valeur (sur la pile) à l’intérieur d’une boîte objet allouée sur le tas managé (Heap). L’unboxing extrait explicitement la valeur de cette boîte vers la pile. Dans une boucle intensive, le boxing répété provoque des milliers d’allocations sur le tas et sature le Garbage Collector (GC), entraînant des pauses d’exécution et une chute de débit.</li>',
      '  <li><strong>override vs new (3 pts) :</strong> <code>override</code> modifie l’entrée correspondante dans la table des méthodes virtuelles (vtable) : l’appel résout dynamiquement vers la classe dérivée, même si la variable est typée avec la classe de base. <code>new</code> masque simplement la méthode de base sans modifier la vtable : l’appel est résolu statiquement à la compilation en fonction du type déclaré de la variable.</li>',
      '</ul>',
      '<h4>Corrigé Partie 2 (8 points)</h4>',
      '<ul>',
      '  <li><strong>Déclaration de record (2 pts) :</strong><br>',
      '    <code>public record Transaction(string Id, decimal Montant, DateTime DateOperation);</code></li>',
      '  <li><strong>Égalité et mutabilité non destructive (3 pts) :</strong> Deux records sont égaux si toutes leurs propriétés sont égales en valeur (pas seulement la référence mémoire). Copie avec <code>with</code> :<br>',
      '    <code>var t2 = t1 with { Montant = 150.00m };</code></li>',
      '  <li><strong>Classe CompteBancaire (3 pts) :</strong><br>',
      '    <code>public class CompteBancaire {<br>',
      '    &nbsp;&nbsp;public decimal Solde { get; private set; }<br>',
      '    &nbsp;&nbsp;public void Crediter(decimal m) {<br>',
      '    &nbsp;&nbsp;&nbsp;&nbsp;if (m &lt;= 0) throw new ArgumentException("Montant invalide");<br>',
      '    &nbsp;&nbsp;&nbsp;&nbsp;Solde += m;<br>',
      '    &nbsp;&nbsp;}<br>',
      '    }</code></li>',
      '</ul>',
      '<h4>Corrigé Partie 3 (6 points)</h4>',
      '<ul>',
      '  <li><strong>Implémentation explicite :</strong><br>',
      '    <code>public class ServicePaiement : ILogger, IAuditor {<br>',
      '    &nbsp;&nbsp;void ILogger.Log(string msg) =&gt; Console.WriteLine($"[LOG] {msg}");<br>',
      '    &nbsp;&nbsp;void IAuditor.Log(string msg) =&gt; Console.WriteLine($"[AUDIT CONFORME] {msg}");<br>',
      '    }</code><br>',
      '    Consommation par cast :<br>',
      '    <code>var s = new ServicePaiement();<br>',
      '    ((ILogger)s).Log("Paiement initié");<br>',
      '    ((IAuditor)s).Log("Paiement initié");</code></li>',
      '</ul>'
    ].join('\n')),
    '',
    '  <h2>Épreuve 2 : Examen Terminal (ET) — Durée 2 h 00 (Barème sur 20 points)</h2>',
    box('standard', 'Sujet de l’Examen Terminal — LINQ Avancé, Asynchronisme TAP &amp; IDisposable', [
      '<h4>Partie 1 : Requêtes LINQ &amp; Traitement de collections (7 points)</h4>',
      '<p>Soit une liste <code>List&lt;Commande&gt;</code> où chaque commande possède <code>Client</code>, <code>Categorie</code> et <code>Total</code>.</p>',
      '<ol>',
      '  <li>Écrivez une requête LINQ (méthodes d’extension) qui regroupe les commandes par <code>Categorie</code>, calcule le chiffre d’affaires total par catégorie, filtre les catégories dont le chiffre d’affaires dépasse 10 000 €, et ordonne le résultat par chiffre d’affaires décroissant. (4 pts)</li>',
      '  <li>Expliquez ce qu’est l’exécution différée (<em>deferred execution</em>) en LINQ et citez deux méthodes provoquant l’évaluation immédiate de la requête. (3 pts)</li>',
      '</ol>',
      '<h4>Partie 2 : Programmation Asynchrone (async/await) &amp; Tâches concurrentes (7 points)</h4>',
      '<ol>',
      '  <li>Expliquez comment le compilateur Roslyn transforme une méthode <code>async Task</code> en une machine à états et quel est le rôle précis de l’opérateur <code>await</code> vis-à-vis du thread appelant. (3 pts)</li>',
      '  <li>Écrivez une méthode <code>public async Task SynchroniserServeursAsync(List&lt;string&gt; urls)</code> qui télécharge le contenu de toutes les URLs en parallèle via <code>Task.WhenAll</code> et gère l’agrégation d’erreurs dans une <code>AggregateException</code>. (4 pts)</li>',
      '</ol>',
      '<h4>Partie 3 : Gestion déterministe des ressources (6 points)</h4>',
      '<p>Expliquez pourquoi le Garbage Collector de .NET ne suffit pas pour libérer les ressources système non managées (handles de fichiers, sockets, verrous réseau). Décrivez le pattern <code>IDisposable</code> et l’instruction <code>using</code> en montrant le code équivalent généré par le compilateur. (6 pts)</p>'
    ].join('\n')),
    '',
    chnav({ href: 'formules.html', label: 'Consulter le mémento des formules' }, { href: 'exercices.html', label: 'Accéder aux 18 exercices pratiques' }),
    '',
    disclaimer()
  ].join('\n\n');

  return {
    'chapitres/simulateur-examen.html': {
      title: 'Examens blancs &amp; Épreuves corrigées — ' + course.brand,
      description: 'Sujets d’examens corrigés de C# B2 : épreuves écrites et barèmes détaillés.',
      active: 'examens',
      body
    }
  };
}

/* ======================== Exercices Index ======================== */

function exercices(course, chapterList) {
  const crumbs = crumb(course, [
    { label: 'Accueil', href: '../index.html' },
    { label: 'Sommaire', href: '../sommaire.html' },
    { label: 'Exercices' }
  ]);

  const sectionsHtml = chapterList.map(ch => [
    '  <h2>Module ' + ch.n + ' — ' + ch.title + '</h2>',
    '  <div class="grid grid-3">',
    '    <div class="card">',
    '      <div class="card__head"><span class="badge">Niveau 1</span><span class="card__num">' + ch.n + '.1</span></div>',
    '      <h3 class="card__title">Exercice guidé</h3>',
    '      <p class="card__desc">Application directe des concepts fondamentaux avec rétroaction immédiate.</p>',
    '      <div class="card__foot"><a class="btn btn--sm" href="chapitre' + ch.n + '.html#exercices">Accéder dans le module ' + ch.n + '</a></div>',
    '    </div>',
    '    <div class="card">',
    '      <div class="card__head"><span class="badge">Niveau 2</span><span class="card__num">' + ch.n + '.2</span></div>',
    '      <h3 class="card__title">Cas d’ingénierie</h3>',
    '      <p class="card__desc">Mise en situation concrète avec contraintes d’architecture et cas limites.</p>',
    '      <div class="card__foot"><a class="btn btn--sm" href="chapitre' + ch.n + '.html#exercices">Accéder dans le module ' + ch.n + '</a></div>',
    '    </div>',
    '    <div class="card">',
    '      <div class="card__head"><span class="badge">Niveau 3</span><span class="card__num">' + ch.n + '.3</span></div>',
    '      <h3 class="card__title">Défi de maîtrise</h3>',
    '      <p class="card__desc">Problème complexe exigeant rigueur algorithmique, robustesse et performance.</p>',
    '      <div class="card__foot"><a class="btn btn--sm" href="chapitre' + ch.n + '.html#exercices">Accéder dans le module ' + ch.n + '</a></div>',
    '    </div>',
    '  </div>'
  ].join('\n')).join('\n\n');

  const body = [
    crumbs,
    '  <h1>Catalogue des 18 Ateliers Pratiques de Code C#</h1>',
    '  <p class="lead">Accédez à l’ensemble des exercices d’entraînement progressifs intégrés à chaque module de formation.</p>',
    '',
    sectionsHtml,
    '',
    chnav({ href: 'simulateur-examen.html', label: 'Consulter les examens blancs' }, { href: '../atelier.html', label: 'Ouvrir le bac à sable de code' }),
    '',
    disclaimer()
  ].join('\n\n');

  return {
    'chapitres/exercices.html': {
      title: 'Catalogue des 18 exercices — ' + course.brand,
      description: 'Index des 18 exercices de code C# B2 répartis sur les 6 modules.',
      active: 'exercices',
      body
    }
  };
}

module.exports = { examens, exercices };

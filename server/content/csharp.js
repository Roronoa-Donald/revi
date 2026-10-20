/**
 * Contenu du cours « C# » B2 (dossier `csharp/`).
 *
 * Les données de ce cours sont mises en page par `scripts/generate-courses.js`
 * (voir `scripts/course-kit.js`) : aucune page n'est écrite à la main ici, et
 * aucune page ne doit être éditée à la main dans le dossier csharp/.
 */
'use strict';

const chapitres = [
  ...require('./csharp/chapitres-1-3'),
  ...require('./csharp/chapitres-4-6')
];

const pages = require('./csharp/pages');

const course = {
  id: 'csharp',
  slug: 'csharp',
  brand: 'C# B2',
  brandIcon: 'code',

  // Violet 700 / Violet 800 accessible conforme WCAG AA / AAA (6.95:1 / 9.10:1 sur blanc)
  accent: '#7e22ce',
  accentDeep: '#6b21a8',
  accentSoft: '#faf5ff',
  accentBorder: '#e9d5ff',

  storeKey: 'b2csharp:progress',

  title: 'C# B2 — POO Moderne, LINQ &amp; Programmation Asynchrone .NET',
  description:
    'Cours complet de programmation en C# et écosystème .NET niveau B2 : ' +
    'architecture CLR, compilation JIT, gestion mémoire Stack vs Heap, boxing/unboxing et pattern matching moderne, ' +
    'encapsulation avancée, propriétés auto-implémentées validées, constructeurs surchargés, records immuables et clonage non destructif with, ' +
    'polymorphisme dynamique (virtual, override) vs masquage (new), classes abstraites, interfaces multiples et implémentation explicite, ' +
    'collections génériques haute performance (List, Dictionary, HashSet), recherche sécurisée TryGetValue, filtres catch when et contraintes where T, ' +
    'programmation fonctionnelle avec délégués (Func, Action, Predicate), requêtes LINQ déclaratives, exécution différée et système d’événements multicast, ' +
    'et programmation asynchrone TAP (async, await), orchestration concurrente Task.WhenAll et libération déterministe IDisposable avec blocs using.',
  lead:
    'Maîtrisez le développement d’applications professionnelles robustes et scalables avec le langage C# moderne. ' +
    'Six chapitres d’ingénierie logicielle pour concevoir des modèles orientés objet irréprochables, exploiter toute la puissance expressive de LINQ ' +
    'et orchestrer des flux asynchrones sans interblocage ni fuite mémoire.',

  sources: 'la documentation officielle Microsoft Learn .NET / C#, les spécifications du standard ECMA-334 (C# Language Specification) et les ouvrages de référence de Jon Skeet et Jeffrey Richter',

  chapters: chapitres.map(chapitre => ({ n: chapitre.n, title: chapitre.title })),

  render(kit) {
    return pages.render(kit, course, chapitres);
  }
};

module.exports = course;

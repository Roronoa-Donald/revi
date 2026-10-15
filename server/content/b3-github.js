/**
 * Contenu du cours « Git & GitHub B3 » (dossier `b3-github/`).
 *
 * Les données de ce cours sont mises en page par `scripts/generate-courses.js`
 * (voir `scripts/course-kit.js`) : aucune page n'est écrite à la main ici, et
 * aucune page ne doit être éditée à la main dans le dossier b3-github/.
 */
'use strict';

const chapitres = [
  ...require('./b3-github/chapitres-1-3'),
  ...require('./b3-github/chapitres-4-6')
];

const pages = require('./b3-github/pages');

const course = {
  id: 'b3-github',
  slug: 'b3-github',
  brand: 'Git & GitHub B3',
  brandIcon: 'code',

  // Git Orange sobre conforme WCAG AA/AAA (5.86:1 / 7.69:1 sur blanc)
  accent: '#c2410c',
  accentDeep: '#9a3412',
  accentSoft: '#fff7ed',
  accentBorder: '#fed7aa',

  storeKey: 'b3github:progress',

  title: 'Git &amp; GitHub B3 — Modèle Objet, Fusions Avancées, Reflog, CI/CD Actions &amp; Sécurité du Dépôt',
  description:
    'Formation d’excellence en ingénierie de contrôle de version et automatisation de dépôts pour le Bachelor 3 : ' +
    'modèle objet interne et stockage adressable par contenu (système de fichiers CAS, objets blobs, trees, commits, tags annotés, hachage canonique SHA-1/SHA-256 avec octet nul, immuabilité en arbre de Merkle et commandes de plomberie cat-file, hash-object, ls-tree, rev-parse), ' +
    'stratégies de fusions avancées et rebase interactif (analyse topologique du graphe DAG, calcul du Lowest Common Ancestor LCA, moteurs de fusion recursive et ORT, rebase interactif git rebase -i avec directives pick, squash, fixup, reword, règle d’or du rebase et arbitrage formel des conflits tridirectionnels), ' +
    'diagnostic, reflog et sauvetage de données (journal chronologique de références git reflog, sauvetage de commits orphelins dangling après reset dur, vérification d’intégrité git fsck, isolation logarithmique de régressions avec git bisect interactif et automatisé, et gestion de pile LIFO git stash), ' +
    'workflows d’équipe et gouvernance de dépôts (comparaison Git Flow vs GitHub Flow vs Trunk-Based Development avec Feature Flags, règles de protection de branches Branch Protection Rules et Rulesets, signature cryptographique GPG/SSH de commits et spécification formelle Conventional Commits 1.0.0 pour automatiser SemVer), ' +
    'automatisation CI/CD complète avec GitHub Actions (syntaxe déclarative YAML sous .github/workflows/, architecture d’événements et runners, stratégie matricielle multi-plateforme strategy.matrix avec fail-fast, durcissement de sécurité contre les injections de commandes shell CWE-78 dans les contextes dynamiques et principe du moindre privilège GITHUB_TOKEN), ' +
    'et administration avancée de dépôts à grande échelle (gestion des fichiers binaires volumineux par déport et pointeurs textuels Git LFS v1, automatisation par hooks client pre-commit/commit-msg et serveur pre-receive, hygiène de paquets et réécriture complète de l’historique par git-filter-repo pour purger définitivement les secrets compromis).',
  lead:
    'Maîtrisez les structures internes du graphe DAG, les fusions tridirectionnelles, la résurrection de données via le reflog, l’orchestration CI/CD avec GitHub Actions et l’ingénierie de sécurité de niveau Bachelor 3. ' +
    'Six modules approfondis combinant formalisme théorique, 18 ateliers de programmation interactive en Python 3 et 48 QCM d’évaluation.',

  sources: 'Documentation officielle Git Pro (Scott Chacon & Ben Straub), spécification Conventional Commits 1.0.0, documentation officielle GitHub Actions et guides de durcissement GitHub Security Hardening',

  chapters: chapitres.map(chapitre => ({ n: chapitre.n, title: chapitre.title })),

  render(kit) {
    return pages.render(kit, course, chapitres);
  }
};

module.exports = course;

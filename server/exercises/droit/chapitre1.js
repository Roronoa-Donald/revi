/**
 * chapitre1.js — Études de cas du cours « droit ».
 * Mode d'évaluation conceptuelle structurée (language: 'analyse').
 */
'use strict';

module.exports = [
  {
    id: "dr2-c1-e1",
    chapter: 1,
    level: "n1",
    language: 'analyse',
    title: "Classer les notions",
    goal: "Distinguer le droit, l'informatique et le droit du numérique, puis dresser le bilan.",
    brief: "<p>Pour chaque situation proposée : type vaut <code>d</code> (droit), <code>i</code> (informatique) ou <code>n</code> (droit du numérique). Pour chaque situation, indiquez <code>libelle : categorie</code>, où categorie vaut <code>droit</code>, <code>informatique</code> ou <code>droit du numerique</code>. Enfin Indiquez <code>bilan : X droit / Y informatique / Z numerique</code>.</p>",
    starter: "# Grille d'analyse (dr2-c1-e1) — Classer les notions\n# Complétez la réponse attendue sous chaque cas ci-dessous :\n\n[Cas 1 — Uniquement du droit]\n# Données : d code civil\n# Données : d constitution\nA_COMPLETER\n\n[Cas 2 — Uniquement de l informatique]\n# Données : i algorithme\nA_COMPLETER\n\n[Cas 3 — Cinq éléments mixtes]\n# Données : d regle de droit\n# Données : i logiciel\n# Données : n donnees personnelles\n# Données : d jurisprudence\n# Données : n droit de l internet\nA_COMPLETER\n",
    hints: [
          "Trois compteurs posés à 0 avant la boucle, incrémentés selon les cas prévus.",
          "Le bilan sort après la boucle, selon la syntaxe attendue « X droit / Y informatique / Z numerique »."
    ],
    examples: [
          {
                "stdin": "3\nd ensemble des regles\ni traitement de l information\nn regles du numerique\n",
                "expected": "ensemble des regles : droit\ntraitement de l information : informatique\nregles du numerique : droit du numerique\nbilan : 1 droit / 1 informatique / 1 numerique"
          }
    ],
    tests: [
          {
                "label": "Uniquement du droit",
                "stdin": "cas:1",
                "expected": "code civil : droit\nconstitution : droit\nbilan : 2 droit / 0 informatique / 0 numerique"
          },
          {
                "label": "Uniquement de l informatique",
                "stdin": "cas:2",
                "expected": "algorithme : informatique\nbilan : 0 droit / 1 informatique / 0 numerique"
          },
          {
                "label": "Cinq éléments mixtes",
                "stdin": "cas:3",
                "expected": "regle de droit : droit\nlogiciel : informatique\ndonnees personnelles : droit du numerique\njurisprudence : droit\ndroit de l internet : droit du numerique\nbilan : 2 droit / 1 informatique / 2 numerique"
          }
    ],
    solution: "[Exemple]\nensemble des regles : droit\ntraitement de l information : informatique\nregles du numerique : droit du numerique\nbilan : 1 droit / 1 informatique / 1 numerique\n\n[Cas 1 — Uniquement du droit]\ncode civil : droit\nconstitution : droit\nbilan : 2 droit / 0 informatique / 0 numerique\n\n[Cas 2 — Uniquement de l informatique]\nalgorithme : informatique\nbilan : 0 droit / 1 informatique / 0 numerique\n\n[Cas 3 — Cinq éléments mixtes]\nregle de droit : droit\nlogiciel : informatique\ndonnees personnelles : droit du numerique\njurisprudence : droit\ndroit de l internet : droit du numerique\nbilan : 2 droit / 1 informatique / 2 numerique\n"
  },
  {
    id: "dr2-c1-e2",
    chapter: 1,
    level: "n1",
    language: 'analyse',
    title: "Les fondements du droit du numérique",
    goal: "Associer un code à son fondement juridique et compter les occurrences.",
    brief: "<p>Pour chaque situation proposée : <code>dp</code> (protection des données personnelles), <code>pi</code> (propriété intellectuelle), <code>ci</code> (contrats informatiques) ou <code>rc</code> (responsabilité civile). Pour chaque situation, indiquez <code>libelle : fondement</code> avec le libellé du fondement. Enfin Indiquez <code>fondements : X/n</code>.</p>",
    starter: "# Grille d'analyse (dr2-c1-e2) — Les fondements du droit du numérique\n# Complétez la réponse attendue sous chaque cas ci-dessous :\n\n[Cas 1 — Un contrat]\n# Données : ci licence logicielle\nA_COMPLETER\n\n[Cas 2 — Responsabilité]\n# Données : rc faille de securite\n# Données : rc systeme defaillant\nA_COMPLETER\n\n[Cas 3 — Quatre fondements]\n# Données : dp consentement\n# Données : pi marque deposee\n# Données : ci service cloud\n# Données : rc dommage\nA_COMPLETER\n",
    hints: [
          "Quatre codes : dp → donnees personnelles, pi → propriete intellectuelle, ci → contrats informatiques, rc → responsabilite civile.",
          "Le compteur « fondements » s'incrémente à chaque ligne traitée."
    ],
    examples: [
          {
                "stdin": "2\ndp loi informatique et libertes\npi droit d auteur\n",
                "expected": "loi informatique et libertes : donnees personnelles\ndroit d auteur : propriete intellectuelle\nfondements : 2/2"
          }
    ],
    tests: [
          {
                "label": "Un contrat",
                "stdin": "cas:1",
                "expected": "licence logicielle : contrats informatiques\nfondements : 1/1"
          },
          {
                "label": "Responsabilité",
                "stdin": "cas:2",
                "expected": "faille de securite : responsabilite civile\nsysteme defaillant : responsabilite civile\nfondements : 2/2"
          },
          {
                "label": "Quatre fondements",
                "stdin": "cas:3",
                "expected": "consentement : donnees personnelles\nmarque deposee : propriete intellectuelle\nservice cloud : contrats informatiques\ndommage : responsabilite civile\nfondements : 4/4"
          }
    ],
    solution: "[Exemple]\nloi informatique et libertes : donnees personnelles\ndroit d auteur : propriete intellectuelle\nfondements : 2/2\n\n[Cas 1 — Un contrat]\nlicence logicielle : contrats informatiques\nfondements : 1/1\n\n[Cas 2 — Responsabilité]\nfaille de securite : responsabilite civile\nsysteme defaillant : responsabilite civile\nfondements : 2/2\n\n[Cas 3 — Quatre fondements]\nconsentement : donnees personnelles\nmarque deposee : propriete intellectuelle\nservice cloud : contrats informatiques\ndommage : responsabilite civile\nfondements : 4/4\n"
  },
  {
    id: "dr2-c1-e3",
    chapter: 1,
    level: "n2",
    language: 'analyse',
    title: "Les droits numériques",
    goal: "Reconnaître parmi des droits lesquels font partie des droits numériques.",
    brief: "<p>Pour chaque situation proposée : <code>le</code> (liberté d'expression), <code>vp</code> (vie privée), <code>ai</code> (accès à l'information) ou <code>x</code> (aucun des trois). Pour chaque situation, indiquez <code>libelle : oui</code> si le droit fait partie des droits du numérique, <code>libelle : non</code> sinon. Enfin Indiquez <code>droits numeriques : X/n</code>.</p>",
    starter: "# Grille d'analyse (dr2-c1-e3) — Les droits numériques\n# Complétez la réponse attendue sous chaque cas ci-dessous :\n\n[Cas 1 — Un seul droit]\n# Données : le liberte d expression\nA_COMPLETER\n\n[Cas 2 — Aucun droit]\n# Données : x droit de preemption\n# Données : x droit de retrait\nA_COMPLETER\n\n[Cas 3 — Quatre droits mixtes]\n# Données : ai acces a l information\n# Données : vp vie privee\n# Données : x droit de chasse\n# Données : le opinion\nA_COMPLETER\n",
    hints: [
          "le, vp et ai sont des droits du numérique ; x ne l'est pas.",
          "Utilisez un test avec plusieurs alternatives (case) pour rester lisible."
    ],
    examples: [
          {
                "stdin": "2\nvp respect de la vie privee\nx droit de cuissage\n",
                "expected": "respect de la vie privee : oui\ndroit de cuissage : non\ndroits numeriques : 1/2"
          }
    ],
    tests: [
          {
                "label": "Un seul droit",
                "stdin": "cas:1",
                "expected": "liberte d expression : oui\ndroits numeriques : 1/1"
          },
          {
                "label": "Aucun droit",
                "stdin": "cas:2",
                "expected": "droit de preemption : non\ndroit de retrait : non\ndroits numeriques : 0/2"
          },
          {
                "label": "Quatre droits mixtes",
                "stdin": "cas:3",
                "expected": "acces a l information : oui\nvie privee : oui\ndroit de chasse : non\nopinion : oui\ndroits numeriques : 3/4"
          }
    ],
    solution: "[Exemple]\nrespect de la vie privee : oui\ndroit de cuissage : non\ndroits numeriques : 1/2\n\n[Cas 1 — Un seul droit]\nliberte d expression : oui\ndroits numeriques : 1/1\n\n[Cas 2 — Aucun droit]\ndroit de preemption : non\ndroit de retrait : non\ndroits numeriques : 0/2\n\n[Cas 3 — Quatre droits mixtes]\nacces a l information : oui\nvie privee : oui\ndroit de chasse : non\nopinion : oui\ndroits numeriques : 3/4\n"
  }
];

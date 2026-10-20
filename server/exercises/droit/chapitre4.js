/**
 * chapitre4.js — Études de cas du cours « droit ».
 * Mode d'évaluation conceptuelle structurée (language: 'analyse').
 */
'use strict';

module.exports = [
  {
    id: "dr2-c4-e1",
    chapter: 4,
    level: "n1",
    language: 'analyse',
    title: "Classer une source",
    goal: "Ranger une source du droit du numérique dans sa famille et faire le bilan.",
    brief: "<p>Pour chaque situation proposée : <code>nat</code> (source nationale), <code>sup</code> (source supranationale) ou <code>nor</code> (source normative). Pour chaque situation, indiquez <code>libelle : nationales</code>, <code>libelle : supranationales</code> ou <code>libelle : normatives</code>. Enfin <code>bilan : X nationales / Y supranationales / Z normatives</code>.</p>",
    starter: "# Grille d'analyse (dr2-c4-e1) — Classer une source\n# Complétez la réponse attendue sous chaque cas ci-dessous :\n\n[Cas 1 — Une source normative]\n# Données : nor loi informatique et libertes\nA_COMPLETER\n\n[Cas 2 — Trois sources nationales]\n# Données : nat loi sur la presse\n# Données : nat code civil\n# Données : nat code penal\nA_COMPLETER\n\n[Cas 3 — Quatre sources mixtes]\n# Données : nor loi 2019-014\n# Données : sup traite de l OMPI\n# Données : nat article 29\n# Données : sup charte des droits\nA_COMPLETER\n",
    hints: [
          "nat → nationales ; sup → supranationales ; nor → normatives.",
          "Trois compteurs, comme dans les classifications précédentes."
    ],
    examples: [
          {
                "stdin": "2\nnat article 9 du code civil\nsup convention europeenne\n",
                "expected": "article 9 du code civil : nationales\nconvention europeenne : supranationales\nbilan : 1 nationales / 1 supranationales / 0 normatives"
          }
    ],
    tests: [
          {
                "label": "Une source normative",
                "stdin": "cas:1",
                "expected": "loi informatique et libertes : normatives\nbilan : 0 nationales / 0 supranationales / 1 normatives"
          },
          {
                "label": "Trois sources nationales",
                "stdin": "cas:2",
                "expected": "loi sur la presse : nationales\ncode civil : nationales\ncode penal : nationales\nbilan : 3 nationales / 0 supranationales / 0 normatives"
          },
          {
                "label": "Quatre sources mixtes",
                "stdin": "cas:3",
                "expected": "loi 2019-014 : normatives\ntraite de l OMPI : supranationales\narticle 29 : nationales\ncharte des droits : supranationales\nbilan : 1 nationales / 2 supranationales / 1 normatives"
          }
    ],
    solution: "[Exemple]\narticle 9 du code civil : nationales\nconvention europeenne : supranationales\nbilan : 1 nationales / 1 supranationales / 0 normatives\n\n[Cas 1 — Une source normative]\nloi informatique et libertes : normatives\nbilan : 0 nationales / 0 supranationales / 1 normatives\n\n[Cas 2 — Trois sources nationales]\nloi sur la presse : nationales\ncode civil : nationales\ncode penal : nationales\nbilan : 3 nationales / 0 supranationales / 0 normatives\n\n[Cas 3 — Quatre sources mixtes]\nloi 2019-014 : normatives\ntraite de l OMPI : supranationales\narticle 29 : nationales\ncharte des droits : supranationales\nbilan : 1 nationales / 2 supranationales / 1 normatives\n"
  },
  {
    id: "dr2-c4-e2",
    chapter: 4,
    level: "n2",
    language: 'analyse',
    title: "Chronologie des textes",
    goal: "Associer un texte de référence à son année et compter les textes cités.",
    brief: "<p>L’analyse porte sur <strong>n codes</strong> (un par ligne). Chaque code désigne un texte : <code>cedh</code> (1950), <code>loi78</code> (loi Informatique et Libertés, 1978), <code>ompi</code> (traités OMPI, 1996), <code>rgpdue</code> (RGPD UE, 2018), <code>rpdto</code> (RGPD Togo, 2019), <code>loi2019</code> (loi n° 2019-014, 2019). Pour chaque code Indiquez <code>code : annee</code>. Enfin <code>textes : X</code>.</p>",
    starter: "# Grille d'analyse (dr2-c4-e2) — Chronologie des textes\n# Complétez la réponse attendue sous chaque cas ci-dessous :\n\n[Cas 1 — Un texte]\n# Données : ompi\nA_COMPLETER\n\n[Cas 2 — Deux textes de 2019]\n# Données : rpdto\n# Données : loi2019\nA_COMPLETER\n\n[Cas 3 — Quatre textes]\n# Données : cedh\n# Données : loi78\n# Données : ompi\n# Données : rgpdue\nA_COMPLETER\n",
    hints: [
          "Un case sur le code suffit : cedh → 1950, loi78 → 1978, ompi → 1996, rgpdue → 2018, rpdto et loi2019 → 2019.",
          "Deux codes peuvent partager la même année : traitez-les séparément dans le case."
    ],
    examples: [
          {
                "stdin": "2\nloi78\nrgpdue\n",
                "expected": "loi78 : 1978\nrgpdue : 2018\ntextes : 2"
          }
    ],
    tests: [
          {
                "label": "Un texte",
                "stdin": "cas:1",
                "expected": "ompi : 1996\ntextes : 1"
          },
          {
                "label": "Deux textes de 2019",
                "stdin": "cas:2",
                "expected": "rpdto : 2019\nloi2019 : 2019\ntextes : 2"
          },
          {
                "label": "Quatre textes",
                "stdin": "cas:3",
                "expected": "cedh : 1950\nloi78 : 1978\nompi : 1996\nrgpdue : 2018\ntextes : 4"
          }
    ],
    solution: "[Exemple]\nloi78 : 1978\nrgpdue : 2018\ntextes : 2\n\n[Cas 1 — Un texte]\nompi : 1996\ntextes : 1\n\n[Cas 2 — Deux textes de 2019]\nrpdto : 2019\nloi2019 : 2019\ntextes : 2\n\n[Cas 3 — Quatre textes]\ncedh : 1950\nloi78 : 1978\nompi : 1996\nrgpdue : 2018\ntextes : 4\n"
  },
  {
    id: "dr2-c4-e3",
    chapter: 4,
    level: "n2",
    language: 'analyse',
    title: "Traités et conventions internationales",
    goal: "Classer un instrument international selon sa nature, puis dresser le bilan.",
    brief: "<p>Pour chaque situation proposée : <code>ompi_da</code> (traité OMPI sur le droit d'auteur), <code>ompi_ph</code> (traité OMPI sur les interprétations et phonogrammes), <code>cedh</code> (convention européenne des droits de l'homme) ou <code>loi</code> (loi nationale). Pour chaque situation, indiquez <code>libelle : traite OMPI</code>, <code>libelle : convention europeenne</code> ou <code>libelle : loi nationale</code>. Enfin <code>bilan : X traite OMPI / Y convention europeenne / Z loi nationale</code>.</p>",
    starter: "# Grille d'analyse (dr2-c4-e3) — Traités et conventions internationales\n# Complétez la réponse attendue sous chaque cas ci-dessous :\n\n[Cas 1 — Une loi]\n# Données : loi protection des donnees\nA_COMPLETER\n\n[Cas 2 — Deux traités OMPI]\n# Données : ompi_da droit d auteur\n# Données : ompi_ph phonogrammes\nA_COMPLETER\n\n[Cas 3 — Quatre instruments]\n# Données : cedh libertes\n# Données : loi 2019-014\n# Données : ompi_da oeuvres\n# Données : ompi_ph interpretations\nA_COMPLETER\n",
    hints: [
          "ompi_da et ompi_ph → traite OMPI ; cedh → convention europeenne ; loi → loi nationale.",
          "Deux codes distincts peuvent pointer vers la même famille."
    ],
    examples: [
          {
                "stdin": "2\nompi_da protection des auteurs\ncedh droits fondamentaux\n",
                "expected": "protection des auteurs : traite OMPI\ndroits fondamentaux : convention europeenne\nbilan : 1 traite OMPI / 1 convention europeenne / 0 loi nationale"
          }
    ],
    tests: [
          {
                "label": "Une loi",
                "stdin": "cas:1",
                "expected": "protection des donnees : loi nationale\nbilan : 0 traite OMPI / 0 convention europeenne / 1 loi nationale"
          },
          {
                "label": "Deux traités OMPI",
                "stdin": "cas:2",
                "expected": "droit d auteur : traite OMPI\nphonogrammes : traite OMPI\nbilan : 2 traite OMPI / 0 convention europeenne / 0 loi nationale"
          },
          {
                "label": "Quatre instruments",
                "stdin": "cas:3",
                "expected": "libertes : convention europeenne\n2019-014 : loi nationale\noeuvres : traite OMPI\ninterpretations : traite OMPI\nbilan : 2 traite OMPI / 1 convention europeenne / 1 loi nationale"
          }
    ],
    solution: "[Exemple]\nprotection des auteurs : traite OMPI\ndroits fondamentaux : convention europeenne\nbilan : 1 traite OMPI / 1 convention europeenne / 0 loi nationale\n\n[Cas 1 — Une loi]\nprotection des donnees : loi nationale\nbilan : 0 traite OMPI / 0 convention europeenne / 1 loi nationale\n\n[Cas 2 — Deux traités OMPI]\ndroit d auteur : traite OMPI\nphonogrammes : traite OMPI\nbilan : 2 traite OMPI / 0 convention europeenne / 0 loi nationale\n\n[Cas 3 — Quatre instruments]\nlibertes : convention europeenne\n2019-014 : loi nationale\noeuvres : traite OMPI\ninterpretations : traite OMPI\nbilan : 2 traite OMPI / 1 convention europeenne / 1 loi nationale\n"
  }
];

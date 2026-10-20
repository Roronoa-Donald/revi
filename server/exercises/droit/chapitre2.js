/**
 * chapitre2.js — Études de cas du cours « droit ».
 * Mode d'évaluation conceptuelle structurée (language: 'analyse').
 */
'use strict';

module.exports = [
  {
    id: "dr2-c2-e1",
    chapter: 2,
    level: "n1",
    language: 'analyse',
    title: "Données personnelles ou non",
    goal: "Classer une information en donnée personnelle directe, indirecte ou non personnelle.",
    brief: "<p>Pour chaque situation proposée : type vaut <code>di</code> (directe : nom, empreinte), <code>ii</code> (indirecte : téléphone, plaque) ou <code>np</code> (non personnelle : coordonnées d'entreprise). Pour chaque situation, indiquez <code>libelle : personnelle directe</code>, <code>libelle : personnelle indirecte</code> ou <code>libelle : non personnelle</code>. Enfin <code>personnelles : X/n</code>.</p>",
    starter: "# Grille d'analyse (dr2-c2-e1) — Données personnelles ou non\n# Complétez la réponse attendue sous chaque cas ci-dessous :\n\n[Cas 1 — Une donnée indirecte]\n# Données : ii numero de telephone\nA_COMPLETER\n\n[Cas 2 — Aucune donnée personnelle]\n# Données : np siege social\n# Données : np raison sociale\nA_COMPLETER\n\n[Cas 3 — Quatre informations]\n# Données : di empreinte digitale\n# Données : ii plaque d immatriculation\n# Données : np courriel generique de service\n# Données : di numero de matricule\nA_COMPLETER\n",
    hints: [
          "di → personnelle directe ; ii → personnelle indirecte ; np → non personnelle.",
          "Les coordonnées d'entreprise ne sont pas, en principe, des données personnelles."
    ],
    examples: [
          {
                "stdin": "2\ndi nom et prenom\nnp contact de la societe\n",
                "expected": "nom et prenom : personnelle directe\ncontact de la societe : non personnelle\npersonnelles : 1/2"
          }
    ],
    tests: [
          {
                "label": "Une donnée indirecte",
                "stdin": "cas:1",
                "expected": "numero de telephone : personnelle indirecte\npersonnelles : 1/1"
          },
          {
                "label": "Aucune donnée personnelle",
                "stdin": "cas:2",
                "expected": "siege social : non personnelle\nraison sociale : non personnelle\npersonnelles : 0/2"
          },
          {
                "label": "Quatre informations",
                "stdin": "cas:3",
                "expected": "empreinte digitale : personnelle directe\nplaque d immatriculation : personnelle indirecte\ncourriel generique de service : non personnelle\nnumero de matricule : personnelle directe\npersonnelles : 3/4"
          }
    ],
    solution: "[Exemple]\nnom et prenom : personnelle directe\ncontact de la societe : non personnelle\npersonnelles : 1/2\n\n[Cas 1 — Une donnée indirecte]\nnumero de telephone : personnelle indirecte\npersonnelles : 1/1\n\n[Cas 2 — Aucune donnée personnelle]\nsiege social : non personnelle\nraison sociale : non personnelle\npersonnelles : 0/2\n\n[Cas 3 — Quatre informations]\nempreinte digitale : personnelle directe\nplaque d immatriculation : personnelle indirecte\ncourriel generique de service : non personnelle\nnumero de matricule : personnelle directe\npersonnelles : 3/4\n"
  },
  {
    id: "dr2-c2-e2",
    chapter: 2,
    level: "n1",
    language: 'analyse',
    title: "Les données sensibles",
    goal: "Repérer les données à caractère sensible et les distinguer des données ordinaires.",
    brief: "<p>Pour chaque situation proposée : <code>ori</code> (origine raciale ou ethnique), <code>opi</code> (opinions religieuses, philosophiques, politiques, syndicales), <code>san</code> (santé ou vie sexuelle), <code>msr</code> (mesures sociales, poursuites, sanctions) ou <code>ord</code> (donnée ordinaire). Pour chaque situation, indiquez <code>libelle : sensible</code> ou <code>libelle : ordinaire</code>. Enfin <code>sensibles : X/n</code>.</p>",
    starter: "# Grille d'analyse (dr2-c2-e2) — Les données sensibles\n# Complétez la réponse attendue sous chaque cas ci-dessous :\n\n[Cas 1 — Une donnée de santé]\n# Données : san dossier medical\nA_COMPLETER\n\n[Cas 2 — Aucune donnée sensible]\n# Données : ord date de naissance\n# Données : ord langue parlee\nA_COMPLETER\n\n[Cas 3 — Cinq données mixtes]\n# Données : opi appartenance syndicale\n# Données : msr sanction administrative\n# Données : ord centre de loisirs\n# Données : san vie sexuelle\n# Données : ori appartenance ethnique\nA_COMPLETER\n",
    hints: [
          "ori, opi, san et msr désignent des données sensibles ; ord ne l'est pas.",
          "Un case avec les quatre codes sensibles, et un cas par défaut, suffit."
    ],
    examples: [
          {
                "stdin": "2\nori origine ethnique\nord adresse postale\n",
                "expected": "origine ethnique : sensible\nadresse postale : ordinaire\nsensibles : 1/2"
          }
    ],
    tests: [
          {
                "label": "Une donnée de santé",
                "stdin": "cas:1",
                "expected": "dossier medical : sensible\nsensibles : 1/1"
          },
          {
                "label": "Aucune donnée sensible",
                "stdin": "cas:2",
                "expected": "date de naissance : ordinaire\nlangue parlee : ordinaire\nsensibles : 0/2"
          },
          {
                "label": "Cinq données mixtes",
                "stdin": "cas:3",
                "expected": "appartenance syndicale : sensible\nsanction administrative : sensible\ncentre de loisirs : ordinaire\nvie sexuelle : sensible\nappartenance ethnique : sensible\nsensibles : 4/5"
          }
    ],
    solution: "[Exemple]\norigine ethnique : sensible\nadresse postale : ordinaire\nsensibles : 1/2\n\n[Cas 1 — Une donnée de santé]\ndossier medical : sensible\nsensibles : 1/1\n\n[Cas 2 — Aucune donnée sensible]\ndate de naissance : ordinaire\nlangue parlee : ordinaire\nsensibles : 0/2\n\n[Cas 3 — Cinq données mixtes]\nappartenance syndicale : sensible\nsanction administrative : sensible\ncentre de loisirs : ordinaire\nvie sexuelle : sensible\nappartenance ethnique : sensible\nsensibles : 4/5\n"
  },
  {
    id: "dr2-c2-e3",
    chapter: 2,
    level: "n2",
    language: 'analyse',
    title: "Opérations constitutives d'un traitement",
    goal: "Décider si une opération portant sur des données est un traitement au sens du RGPD.",
    brief: "<p>Pour chaque situation proposée : <code>col</code> (collecte), <code>enr</code> (enregistrement), <code>org</code> (organisation), <code>con</code> (conservation), <code>uta</code> (utilisation ou adaptation) ou <code>ces</code> (cession). Toute opération de cette liste constitue un <em>traitement</em>. Le code <code>x</code> ne constitue pas un traitement. Pour chaque ligne, affichez <code>libelle : traitement</code> ou <code>libelle : hors traitement</code>. Enfin <code>traitements : X/n</code>.</p>",
    starter: "# Grille d'analyse (dr2-c2-e3) — Opérations constitutives d'un traitement\n# Complétez la réponse attendue sous chaque cas ci-dessous :\n\n[Cas 1 — Une cession]\n# Données : ces vente a un partenaire\nA_COMPLETER\n\n[Cas 2 — Aucun traitement]\n# Données : x creation d affiche\n# Données : x impression papier\nA_COMPLETER\n\n[Cas 3 — Cinq opérations]\n# Données : enr inscription au fichier\n# Données : org classement des fiches\n# Données : con archivage cinq ans\n# Données : uta analyse statistique\n# Données : x tri du courrier\nA_COMPLETER\n",
    hints: [
          "Une entreprise réalise un traitement dès qu'elle effectue une de ces opérations.",
          "Le code x (aucune opération) n'est pas un traitement."
    ],
    examples: [
          {
                "stdin": "2\ncol collecte des adresses\nx affichage publicitaire\n",
                "expected": "collecte des adresses : traitement\naffichage publicitaire : hors traitement\ntraitements : 1/2"
          }
    ],
    tests: [
          {
                "label": "Une cession",
                "stdin": "cas:1",
                "expected": "vente a un partenaire : traitement\ntraitements : 1/1"
          },
          {
                "label": "Aucun traitement",
                "stdin": "cas:2",
                "expected": "creation d affiche : hors traitement\nimpression papier : hors traitement\ntraitements : 0/2"
          },
          {
                "label": "Cinq opérations",
                "stdin": "cas:3",
                "expected": "inscription au fichier : traitement\nclassement des fiches : traitement\narchivage cinq ans : traitement\nanalyse statistique : traitement\ntri du courrier : hors traitement\ntraitements : 4/5"
          }
    ],
    solution: "[Exemple]\ncollecte des adresses : traitement\naffichage publicitaire : hors traitement\ntraitements : 1/2\n\n[Cas 1 — Une cession]\nvente a un partenaire : traitement\ntraitements : 1/1\n\n[Cas 2 — Aucun traitement]\ncreation d affiche : hors traitement\nimpression papier : hors traitement\ntraitements : 0/2\n\n[Cas 3 — Cinq opérations]\ninscription au fichier : traitement\nclassement des fiches : traitement\narchivage cinq ans : traitement\nanalyse statistique : traitement\ntri du courrier : hors traitement\ntraitements : 4/5\n"
  }
];

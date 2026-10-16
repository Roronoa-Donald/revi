/**
 * Catalogue des 18 études de cas du cours « b1-bureautique ».
 * Mode d'évaluation conceptuelle structurée (language: 'analyse').
 */
'use strict';

module.exports = [
  {
    id: "bu-c1-e1",
    chapter: 1,
    level: "n1",
    language: 'analyse',
    title: "Onglets et groupes",
    goal: "Retrouver l'organisation du ruban : chaque groupe appartient à un onglet précis.",
    brief: "<p>Pour chaque situation proposée : onglet est un code de <code>accueil</code>, <code>insertion</code>, <code>miseenpage</code>, <code>revision</code> ou <code>affichage</code>. Pour chaque situation, indiquez <code>groupe : OK</code> si le groupe appartient bien à cet onglet, sinon <code>groupe : ERREUR</code>. Concluez par <code>conformes : X/n</code>.</p>",
    starter: "# Grille d'analyse (bu-c1-e1) — Onglets et groupes\n# Complétez la réponse attendue sous chaque cas ci-dessous :\n\n[Cas 1 — Deux erreurs]\n# Données : police accueil\n# Données : zoom revision\n# Données : styles insertion\nA_COMPLETER\n\n[Cas 2 — Tout conforme]\n# Données : tableaux insertion\n# Données : filigrane miseenpage\nA_COMPLETER\n\n[Cas 3 — Cinq groupes]\n# Données : pressepapier accueil\n# Données : symbole insertion\n# Données : themes miseenpage\n# Données : suivi revision\n# Données : macros affichage\nA_COMPLETER\n",
    hints: [
          "Un case sur le groupe donne l'onglet attendu ; compare-le à l'onglet saisi.",
          "Le bilan sort une seule fois, après la boucle."
    ],
    examples: [
          {
                "stdin": "3\npolice accueil\ntableaux insertion\nzoom revision\n",
                "expected": "police : OK\ntableaux : OK\nzoom : ERREUR\nconformes : 2/3"
          }
    ],
    tests: [
          {
                "label": "Deux erreurs",
                "stdin": "cas:1",
                "expected": "police : OK\nzoom : ERREUR\nstyles : ERREUR\nconformes : 1/3"
          },
          {
                "label": "Tout conforme",
                "stdin": "cas:2",
                "expected": "tableaux : OK\nfiligrane : OK\nconformes : 2/2"
          },
          {
                "label": "Cinq groupes",
                "stdin": "cas:3",
                "expected": "pressepapier : OK\nsymbole : OK\nthemes : OK\nsuivi : OK\nmacros : OK\nconformes : 5/5"
          }
    ],
    solution: "[Exemple]\npolice : OK\ntableaux : OK\nzoom : ERREUR\nconformes : 2/3\n\n[Cas 1 — Deux erreurs]\npolice : OK\nzoom : ERREUR\nstyles : ERREUR\nconformes : 1/3\n\n[Cas 2 — Tout conforme]\ntableaux : OK\nfiligrane : OK\nconformes : 2/2\n\n[Cas 3 — Cinq groupes]\npressepapier : OK\nsymbole : OK\nthemes : OK\nsuivi : OK\nmacros : OK\nconformes : 5/5\n"
  },
  {
    id: "bu-c1-e2",
    chapter: 1,
    level: "n1",
    language: 'analyse',
    title: "Les cinq modes d'affichage",
    goal: "Retrouver la définition de chaque mode d'affichage du document.",
    brief: "<p>Pour chaque situation proposée : mode est un code parmi <code>page</code>, <code>pleinecran</code>, <code>web</code>, <code>plan</code> ou <code>brouillon</code> et Question un code parmi <code>defaut</code>, <code>ruban</code>, <code>html</code>, <code>titres</code> ou <code>rapide</code>. Indiquez <code>mode : OUI</code> quand le couple est juste, <code>mode : NON</code> sinon, puis <code>justes : X/n</code>.</p>",
    starter: "# Grille d'analyse (bu-c1-e2) — Les cinq modes d'affichage\n# Complétez la réponse attendue sous chaque cas ci-dessous :\n\n[Cas 1 — Trois couples]\n# Données : pleinecran ruban\n# Données : plan titres\n# Données : brouillon defaut\nA_COMPLETER\n\n[Cas 2 — Tout juste]\n# Données : page defaut\n# Données : brouillon rapide\nA_COMPLETER\n\n[Cas 3 — Deux justes]\n# Données : web html\n# Données : plan titres\nA_COMPLETER\n",
    hints: [
          "Chaque mode a une seule réponse juste : page-defaut, pleinecran-ruban, web-html, plan-titres, brouillon-rapide.",
          "Un case sur le mode donne la réponse attendue ; une comparaison suffit."
    ],
    examples: [
          {
                "stdin": "2\npage defaut\nweb titres\n",
                "expected": "page : OUI\nweb : NON\njustes : 1/2"
          }
    ],
    tests: [
          {
                "label": "Trois couples",
                "stdin": "cas:1",
                "expected": "pleinecran : OUI\nplan : OUI\nbrouillon : NON\njustes : 2/3"
          },
          {
                "label": "Tout juste",
                "stdin": "cas:2",
                "expected": "page : OUI\nbrouillon : OUI\njustes : 2/2"
          },
          {
                "label": "Deux justes",
                "stdin": "cas:3",
                "expected": "web : OUI\nplan : OUI\njustes : 2/2"
          }
    ],
    solution: "[Exemple]\npage : OUI\nweb : NON\njustes : 1/2\n\n[Cas 1 — Trois couples]\npleinecran : OUI\nplan : OUI\nbrouillon : NON\njustes : 2/3\n\n[Cas 2 — Tout juste]\npage : OUI\nbrouillon : OUI\njustes : 2/2\n\n[Cas 3 — Deux justes]\nweb : OUI\nplan : OUI\njustes : 2/2\n"
  },
  {
    id: "bu-c1-e3",
    chapter: 1,
    level: "n2",
    language: 'analyse',
    title: "Sélectionner sans la souris",
    goal: "Associer chaque geste de sélection à sa portée : mot, phrase, paragraphe, document.",
    brief: "<p>Pour chaque situation proposée : geste est un code parmi <code>doubleclic</code>, <code>ctrlclic</code>, <code>tripleclic</code> ou <code>ctrla</code> et cible un code parmi <code>mot</code>, <code>phrase</code>, <code>paragraphe</code> ou <code>document</code>. Indiquez <code>geste : cible</code> si le couple est juste, sinon <code>geste : AUTRE</code>, puis <code>justes : X/n</code>.</p>",
    starter: "# Grille d'analyse (bu-c1-e3) — Sélectionner sans la souris\n# Complétez la réponse attendue sous chaque cas ci-dessous :\n\n[Cas 1 — Les quatre gestes]\n# Données : doubleclic mot\n# Données : ctrlclic phrase\n# Données : tripleclic paragraphe\n# Données : ctrla document\nA_COMPLETER\n\n[Cas 2 — Deux confusions]\n# Données : ctrlclic mot\n# Données : doubleclic phrase\n# Données : tripleclic paragraphe\nA_COMPLETER\n\n[Cas 3 — Document entier]\n# Données : ctrla document\n# Données : tripleclic document\nA_COMPLETER\n",
    hints: [
          "Les quatre gestes du support : doubleclic-mot, ctrlclic-phrase, tripleclic-paragraphe, ctrla-document.",
          "Compare la cible annoncée à la cible attendue du geste."
    ],
    examples: [
          {
                "stdin": "2\ndoubleclic mot\nctrla phrase\n",
                "expected": "doubleclic : mot\nctrla : AUTRE\njustes : 1/2"
          }
    ],
    tests: [
          {
                "label": "Les quatre gestes",
                "stdin": "cas:1",
                "expected": "doubleclic : mot\nctrlclic : phrase\ntripleclic : paragraphe\nctrla : document\njustes : 4/4"
          },
          {
                "label": "Deux confusions",
                "stdin": "cas:2",
                "expected": "ctrlclic : AUTRE\ndoubleclic : AUTRE\ntripleclic : paragraphe\njustes : 1/3"
          },
          {
                "label": "Document entier",
                "stdin": "cas:3",
                "expected": "ctrla : document\ntripleclic : AUTRE\njustes : 1/2"
          }
    ],
    solution: "[Exemple]\ndoubleclic : mot\nctrla : AUTRE\njustes : 1/2\n\n[Cas 1 — Les quatre gestes]\ndoubleclic : mot\nctrlclic : phrase\ntripleclic : paragraphe\nctrla : document\njustes : 4/4\n\n[Cas 2 — Deux confusions]\nctrlclic : AUTRE\ndoubleclic : AUTRE\ntripleclic : paragraphe\njustes : 1/3\n\n[Cas 3 — Document entier]\nctrla : document\ntripleclic : AUTRE\njustes : 1/2\n"
  },
  {
    id: "bu-c2-e1",
    chapter: 2,
    level: "n1",
    language: 'analyse',
    title: "Les quatre alignements",
    goal: "Décrire ce que fait chaque alignement de paragraphe sur les bords du texte.",
    brief: "<p>Pour chaque situation proposée : bord est un code parmi <code>gauche</code>, <code>droite</code>, <code>centre</code> ou <code>justifie</code>. Indiquez <code>alignement : OUI</code> quand le bord annoncé correspond (gauche→gauche, droite→droite, centre→centre, justifie→les deux bords), <code>alignement : NON</code> sinon, puis <code>justes : X/n</code>.</p>",
    starter: "# Grille d'analyse (bu-c2-e1) — Les quatre alignements\n# Complétez la réponse attendue sous chaque cas ci-dessous :\n\n[Cas 1 — Les quatre]\n# Données : gauche gauche\n# Données : droite droite\n# Données : centre centre\n# Données : justifie lesdeux\nA_COMPLETER\n\n[Cas 2 — Deux erreurs]\n# Données : gauche droite\n# Données : justifie lesdeux\n# Données : centre gauche\nA_COMPLETER\n\n[Cas 3 — Justifie partout]\n# Données : justifie lesdeux\n# Données : gauche lesdeux\nA_COMPLETER\n",
    hints: [
          "Seul « justifie » aligne les deux bords à la fois ; les trois autres ne touchent qu'à leur bord.",
          "Un case par alignement donne le bord attendu."
    ],
    examples: [
          {
                "stdin": "2\ncentre centre\njustifie droite\n",
                "expected": "centre : OUI\njustifie : NON\njustes : 1/2"
          }
    ],
    tests: [
          {
                "label": "Les quatre",
                "stdin": "cas:1",
                "expected": "gauche : OUI\ndroite : OUI\ncentre : OUI\njustifie : OUI\njustes : 4/4"
          },
          {
                "label": "Deux erreurs",
                "stdin": "cas:2",
                "expected": "gauche : NON\njustifie : OUI\ncentre : NON\njustes : 1/3"
          },
          {
                "label": "Justifie partout",
                "stdin": "cas:3",
                "expected": "justifie : OUI\ngauche : NON\njustes : 1/2"
          }
    ],
    solution: "[Exemple]\ncentre : OUI\njustifie : NON\njustes : 1/2\n\n[Cas 1 — Les quatre]\ngauche : OUI\ndroite : OUI\ncentre : OUI\njustifie : OUI\njustes : 4/4\n\n[Cas 2 — Deux erreurs]\ngauche : NON\njustifie : OUI\ncentre : NON\njustes : 1/3\n\n[Cas 3 — Justifie partout]\njustifie : OUI\ngauche : NON\njustes : 1/2\n"
  },
  {
    id: "bu-c2-e2",
    chapter: 2,
    level: "n1",
    language: 'analyse',
    title: "Portrait ou paysage",
    goal: "Valider l'orientation demandée pour chaque type de document.",
    brief: "<p>Pour chaque situation proposée : orientation est un code parmi <code>portrait</code> ou <code>paysage</code>. Pour chaque situation, indiquez <code>document : conforme</code> quand l'orientation correspond à l'usage normal — lettres et rapports en portrait, tableaux larges et diaporamas en paysage — sinon <code>document : a revoir</code>. Concluez par <code>conformes : X/n</code>. À titre de règle, un <code>lettre</code> exige <code>portrait</code>, un <code>tableau</code> exige <code>paysage</code>.</p>",
    starter: "# Grille d'analyse (bu-c2-e2) — Portrait ou paysage\n# Complétez la réponse attendue sous chaque cas ci-dessous :\n\n[Cas 1 — Deux usages]\n# Données : lettre portrait\n# Données : tableau paysage\nA_COMPLETER\n\n[Cas 2 — Inversés]\n# Données : lettre paysage\n# Données : tableau portrait\nA_COMPLETER\n\n[Cas 3 — Trois documents]\n# Données : lettre portrait\n# Données : rapport portrait\n# Données : tableau portrait\nA_COMPLETER\n",
    hints: [
          "Un case sur le document donne l'orientation attendue.",
          "Les autres documents sont signalés mais pas comptés comme conformes."
    ],
    examples: [
          {
                "stdin": "2\nlettre portrait\ntableau portrait\n",
                "expected": "lettre : conforme\ntableau : a revoir\nconformes : 1/2"
          }
    ],
    tests: [
          {
                "label": "Deux usages",
                "stdin": "cas:1",
                "expected": "lettre : conforme\ntableau : conforme\nconformes : 2/2"
          },
          {
                "label": "Inversés",
                "stdin": "cas:2",
                "expected": "lettre : a revoir\ntableau : a revoir\nconformes : 0/2"
          },
          {
                "label": "Trois documents",
                "stdin": "cas:3",
                "expected": "lettre : conforme\nrapport : conforme\ntableau : a revoir\nconformes : 2/3"
          }
    ],
    solution: "[Exemple]\nlettre : conforme\ntableau : a revoir\nconformes : 1/2\n\n[Cas 1 — Deux usages]\nlettre : conforme\ntableau : conforme\nconformes : 2/2\n\n[Cas 2 — Inversés]\nlettre : a revoir\ntableau : a revoir\nconformes : 0/2\n\n[Cas 3 — Trois documents]\nlettre : conforme\nrapport : conforme\ntableau : a revoir\nconformes : 2/3\n"
  },
  {
    id: "bu-c2-e3",
    chapter: 2,
    level: "n2",
    language: 'analyse',
    title: "Raccourcis de l'essentiel",
    goal: "Retrouver l'effet de chaque raccourci-clavier de Word.",
    brief: "<p>Pour chaque situation proposée : raccourci est un code parmi <code>ctrls</code>, <code>ctrlp</code>, <code>ctrla</code> ou <code>ctrlz</code> et action un code parmi <code>enregistrer</code>, <code>imprimer</code>, <code>toutselectionner</code> ou <code>annuler</code>. Indiquez <code>raccourci : OUI</code> si le couple est juste, <code>raccourci : NON</code> sinon, puis <code>justes : X/n</code>.</p>",
    starter: "# Grille d'analyse (bu-c2-e3) — Raccourcis de l'essentiel\n# Complétez la réponse attendue sous chaque cas ci-dessous :\n\n[Cas 1 — Les quatre]\n# Données : ctrls enregistrer\n# Données : ctrlp imprimer\n# Données : ctrla toutselectionner\n# Données : ctrlz annuler\nA_COMPLETER\n\n[Cas 2 — Deux confusions]\n# Données : ctrla annuler\n# Données : ctrlz toutselectionner\nA_COMPLETER\n\n[Cas 3 — Série mixte]\n# Données : ctrlp imprimer\n# Données : ctrls imprimer\n# Données : ctrlz annuler\nA_COMPLETER\n",
    hints: [
          "ctrls-enregistrer, ctrlp-imprimer, ctrla-toutselectionner, ctrlz-annuler.",
          "Le bilan sort après la boucle."
    ],
    examples: [
          {
                "stdin": "2\nctrls enregistrer\nctrlp annuler\n",
                "expected": "ctrls : OUI\nctrlp : NON\njustes : 1/2"
          }
    ],
    tests: [
          {
                "label": "Les quatre",
                "stdin": "cas:1",
                "expected": "ctrls : OUI\nctrlp : OUI\nctrla : OUI\nctrlz : OUI\njustes : 4/4"
          },
          {
                "label": "Deux confusions",
                "stdin": "cas:2",
                "expected": "ctrla : NON\nctrlz : NON\njustes : 0/2"
          },
          {
                "label": "Série mixte",
                "stdin": "cas:3",
                "expected": "ctrlp : OUI\nctrls : NON\nctrlz : OUI\njustes : 2/3"
          }
    ],
    solution: "[Exemple]\nctrls : OUI\nctrlp : NON\njustes : 1/2\n\n[Cas 1 — Les quatre]\nctrls : OUI\nctrlp : OUI\nctrla : OUI\nctrlz : OUI\njustes : 4/4\n\n[Cas 2 — Deux confusions]\nctrla : NON\nctrlz : NON\njustes : 0/2\n\n[Cas 3 — Série mixte]\nctrlp : OUI\nctrls : NON\nctrlz : OUI\njustes : 2/3\n"
  },
  {
    id: "bu-c3-e1",
    chapter: 3,
    level: "n1",
    language: 'analyse',
    title: "Texte ou nombre",
    goal: "Simuler l'alignement par défaut d'Excel : le texte à gauche, les chiffres à droite.",
    brief: "<p>Pour chaque situation proposée : type est un code parmi <code>texte</code> ou <code>nombre</code>. Pour chaque situation, indiquez <code>valeur : aligne a gauche</code> si type vaut <code>texte</code>, <code>valeur : aligne a droite</code> si type vaut <code>nombre</code>, et rien pour tout autre type. Concluez par <code>textes : X / nombres : Y</code>.</p>",
    starter: "# Grille d'analyse (bu-c3-e1) — Texte ou nombre\n# Complétez la réponse attendue sous chaque cas ci-dessous :\n\n[Cas 1 — Deux nombres]\n# Données : 99 nombre\n# Données : 42 nombre\nA_COMPLETER\n\n[Cas 2 — Mixte]\n# Données : a texte\n# Données : 1 nombre\n# Données : b texte\n# Données : 2 nombre\nA_COMPLETER\n\n[Cas 3 — Un seul]\n# Données : zip texte\nA_COMPLETER\n",
    hints: [
          "Deux cas seulement : texte à gauche, nombre à droite.",
          "Le bilan affiche les deux compteurs sur une seule ligne."
    ],
    examples: [
          {
                "stdin": "3\nclient texte\n1200 nombre\nADresse texte\n",
                "expected": "client : aligne a gauche\n1200 : aligne a droite\nADresse : aligne a gauche\ntextes : 2 / nombres : 1"
          }
    ],
    tests: [
          {
                "label": "Deux nombres",
                "stdin": "cas:1",
                "expected": "99 : aligne a droite\n42 : aligne a droite\ntextes : 0 / nombres : 2"
          },
          {
                "label": "Mixte",
                "stdin": "cas:2",
                "expected": "a : aligne a gauche\n1 : aligne a droite\nb : aligne a gauche\n2 : aligne a droite\ntextes : 2 / nombres : 2"
          },
          {
                "label": "Un seul",
                "stdin": "cas:3",
                "expected": "zip : aligne a gauche\ntextes : 1 / nombres : 0"
          }
    ],
    solution: "[Exemple]\nclient : aligne a gauche\n1200 : aligne a droite\nADresse : aligne a gauche\ntextes : 2 / nombres : 1\n\n[Cas 1 — Deux nombres]\n99 : aligne a droite\n42 : aligne a droite\ntextes : 0 / nombres : 2\n\n[Cas 2 — Mixte]\na : aligne a gauche\n1 : aligne a droite\nb : aligne a gauche\n2 : aligne a droite\ntextes : 2 / nombres : 2\n\n[Cas 3 — Un seul]\nzip : aligne a gauche\ntextes : 1 / nombres : 0\n"
  },
  {
    id: "bu-c3-e2",
    chapter: 3,
    level: "n1",
    language: 'analyse',
    title: "Les barres de la fenêtre",
    goal: "Retrouver le rôle de chaque barre de la fenêtre Excel.",
    brief: "<p>Pour chaque situation proposée : barre est un code parmi <code>formule</code>, <code>titre</code>, <code>etat</code> ou <code>accesrapide</code> et role un code parmi <code>cellule</code>, <code>nomdoc</code>, <code>options</code> ou <code>commandes</code>. Indiquez <code>barre : OUI</code> quand le couple est juste — formule voit le contenu de la cellule, titre affiche nomdoc, etat montre les options activées, accesrapide regroupe les commandes — sinon <code>barre : NON</code>, puis <code>justes : X/n</code>.</p>",
    starter: "# Grille d'analyse (bu-c3-e2) — Les barres de la fenêtre\n# Complétez la réponse attendue sous chaque cas ci-dessous :\n\n[Cas 1 — Les quatre]\n# Données : formule cellule\n# Données : titre nomdoc\n# Données : etat options\n# Données : accesrapide commandes\nA_COMPLETER\n\n[Cas 2 — Deux confusions]\n# Données : titre cellule\n# Données : etat nomdoc\n# Données : formule cellule\nA_COMPLETER\n\n[Cas 3 — Acces rapide]\n# Données : accesrapide commandes\n# Données : accesrapide options\nA_COMPLETER\n",
    hints: [
          "Les quatre couples du support : formule-cellule, titre-nomdoc, etat-options, accesrapide-commandes.",
          "Un case sur la barre donne le rôle attendu."
    ],
    examples: [
          {
                "stdin": "2\nformule cellule\netat cellule\n",
                "expected": "formule : OUI\netat : NON\njustes : 1/2"
          }
    ],
    tests: [
          {
                "label": "Les quatre",
                "stdin": "cas:1",
                "expected": "formule : OUI\ntitre : OUI\netat : OUI\naccesrapide : OUI\njustes : 4/4"
          },
          {
                "label": "Deux confusions",
                "stdin": "cas:2",
                "expected": "titre : NON\netat : NON\nformule : OUI\njustes : 1/3"
          },
          {
                "label": "Acces rapide",
                "stdin": "cas:3",
                "expected": "accesrapide : OUI\naccesrapide : NON\njustes : 1/2"
          }
    ],
    solution: "[Exemple]\nformule : OUI\netat : NON\njustes : 1/2\n\n[Cas 1 — Les quatre]\nformule : OUI\ntitre : OUI\netat : OUI\naccesrapide : OUI\njustes : 4/4\n\n[Cas 2 — Deux confusions]\ntitre : NON\netat : NON\nformule : OUI\njustes : 1/3\n\n[Cas 3 — Acces rapide]\naccesrapide : OUI\naccesrapide : NON\njustes : 1/2\n"
  },
  {
    id: "bu-c3-e3",
    chapter: 3,
    level: "n2",
    language: 'analyse',
    title: "Gérer les feuilles",
    goal: "Nommer l'effet de chaque action sur une feuille de calcul.",
    brief: "<p>Pour chaque situation proposée : action est un code parmi <code>renommer</code>, <code>inserer</code>, <code>copier</code> ou <code>supprimer</code> et effet un code parmi <code>nouveaunom</code>, <code>nouvellefeuille</code>, <code>doublon</code> ou <code>disparition</code>. Indiquez <code>action : OUI</code> si le couple est juste, sinon <code>action : NON</code>, puis <code>justes : X/n</code>.</p>",
    starter: "# Grille d'analyse (bu-c3-e3) — Gérer les feuilles\n# Complétez la réponse attendue sous chaque cas ci-dessous :\n\n[Cas 1 — Les quatre]\n# Données : renommer nouveaunom\n# Données : inserer nouvellefeuille\n# Données : copier doublon\n# Données : supprimer disparition\nA_COMPLETER\n\n[Cas 2 — Deux confusions]\n# Données : inserer doublon\n# Données : copier nouvellefeuille\nA_COMPLETER\n\n[Cas 3 — Série mixte]\n# Données : supprimer disparition\n# Données : renommer doublon\n# Données : inserer nouvellefeuille\nA_COMPLETER\n",
    hints: [
          "Clic droit sur l'onglet : renommer-nouveaunom, inserer-nouvellefeuille, copier-doublon, supprimer-disparition.",
          "Le bilan sort après la boucle."
    ],
    examples: [
          {
                "stdin": "2\nrenommer nouveaunom\ncopier disparition\n",
                "expected": "renommer : OUI\ncopier : NON\njustes : 1/2"
          }
    ],
    tests: [
          {
                "label": "Les quatre",
                "stdin": "cas:1",
                "expected": "renommer : OUI\ninserer : OUI\ncopier : OUI\nsupprimer : OUI\njustes : 4/4"
          },
          {
                "label": "Deux confusions",
                "stdin": "cas:2",
                "expected": "inserer : NON\ncopier : NON\njustes : 0/2"
          },
          {
                "label": "Série mixte",
                "stdin": "cas:3",
                "expected": "supprimer : OUI\nrenommer : NON\ninserer : OUI\njustes : 2/3"
          }
    ],
    solution: "[Exemple]\nrenommer : OUI\ncopier : NON\njustes : 1/2\n\n[Cas 1 — Les quatre]\nrenommer : OUI\ninserer : OUI\ncopier : OUI\nsupprimer : OUI\njustes : 4/4\n\n[Cas 2 — Deux confusions]\ninserer : NON\ncopier : NON\njustes : 0/2\n\n[Cas 3 — Série mixte]\nsupprimer : OUI\nrenommer : NON\ninserer : OUI\njustes : 2/3\n"
  },
  {
    id: "bu-c4-e1",
    chapter: 4,
    level: "n1",
    language: 'analyse',
    title: "La formule commence par =",
    goal: "Reproduire un mini tableur : lire des valeurs et calculer somme, moyenne et étendue.",
    brief: "<p>L’analyse porte sur d'abord <strong>n</strong>, puis <strong>n valeurs entières</strong>, une par ligne. Indiquez <code>somme : X</code>, <code>moyenne : Y</code> (division entière) puis <code>etendue : max - min</code> — la différence entre la plus grande et la plus petite valeur, comme le font ensemble MAX et MIN.</p>",
    starter: "# Grille d'analyse (bu-c4-e1) — La formule commence par =\n# Complétez la réponse attendue sous chaque cas ci-dessous :\n\n[Cas 1 — Trois valeurs]\n# Données : 8\n# Données : 2\n# Données : 5\nA_COMPLETER\n\n[Cas 2 — Valeurs égales]\n# Données : 7\n# Données : 7\nA_COMPLETER\n\n[Cas 3 — Ordre inversé]\n# Données : 40\n# Données : 30\n# Données : 20\n# Données : 10\nA_COMPLETER\n",
    hints: [
          "Mets à jour max si v est plus grand, min si v est plus petit, et cumule la somme.",
          "La moyenne entière se calcule avec / (bash refuse les décimales) ; l'étendue vaut max - min."
    ],
    examples: [
          {
                "stdin": "4\n10\n20\n30\n40\n",
                "expected": "somme : 100\nmoyenne : 25\netendue : 30"
          }
    ],
    tests: [
          {
                "label": "Trois valeurs",
                "stdin": "cas:1",
                "expected": "somme : 15\nmoyenne : 5\netendue : 6"
          },
          {
                "label": "Valeurs égales",
                "stdin": "cas:2",
                "expected": "somme : 14\nmoyenne : 7\netendue : 0"
          },
          {
                "label": "Ordre inversé",
                "stdin": "cas:3",
                "expected": "somme : 100\nmoyenne : 25\netendue : 30"
          }
    ],
    solution: "[Exemple]\nsomme : 100\nmoyenne : 25\netendue : 30\n\n[Cas 1 — Trois valeurs]\nsomme : 15\nmoyenne : 5\netendue : 6\n\n[Cas 2 — Valeurs égales]\nsomme : 14\nmoyenne : 7\netendue : 0\n\n[Cas 3 — Ordre inversé]\nsomme : 100\nmoyenne : 25\netendue : 30\n"
  },
  {
    id: "bu-c4-e2",
    chapter: 4,
    level: "n1",
    language: 'analyse',
    title: "Somme, moyenne, max, min",
    goal: "Simuler les quatre fonctions statistiques de base sur une colonne de notes.",
    brief: "<p>L’analyse porte sur d'abord <strong>n</strong>, puis <strong>n notes entières</strong>. Indiquez successivement <code>=SOMME(...) → X</code>, <code>=MOYENNE(...) → Y</code> (division entière), <code>=MAX(...) → M</code> puis <code>=MIN(...) → m</code>, dans cet ordre exact.</p>",
    starter: "# Grille d'analyse (bu-c4-e2) — Somme, moyenne, max, min\n# Complétez la réponse attendue sous chaque cas ci-dessous :\n\n[Cas 1 — Deux notes]\n# Données : 9\n# Données : 11\nA_COMPLETER\n\n[Cas 2 — Cinq notes]\n# Données : 10\n# Données : 20\n# Données : 15\n# Données : 5\n# Données : 18\nA_COMPLETER\n\n[Cas 3 — Identiques]\n# Données : 8\n# Données : 8\n# Données : 8\nA_COMPLETER\n",
    hints: [
          "Même logique que la fiche précédente, mais avec les noms de fonctions dans la sortie.",
          "L'ordre de sortie est somme, moyenne, max, min."
    ],
    examples: [
          {
                "stdin": "3\n12\n16\n14\n",
                "expected": "=SOMME(...) -> 42\n=MOYENNE(...) -> 14\n=MAX(...) -> 16\n=MIN(...) -> 12"
          }
    ],
    tests: [
          {
                "label": "Deux notes",
                "stdin": "cas:1",
                "expected": "=SOMME(...) -> 20\n=MOYENNE(...) -> 10\n=MAX(...) -> 11\n=MIN(...) -> 9"
          },
          {
                "label": "Cinq notes",
                "stdin": "cas:2",
                "expected": "=SOMME(...) -> 68\n=MOYENNE(...) -> 13\n=MAX(...) -> 20\n=MIN(...) -> 5"
          },
          {
                "label": "Identiques",
                "stdin": "cas:3",
                "expected": "=SOMME(...) -> 24\n=MOYENNE(...) -> 8\n=MAX(...) -> 8\n=MIN(...) -> 8"
          }
    ],
    solution: "[Exemple]\n=SOMME(...) -> 42\n=MOYENNE(...) -> 14\n=MAX(...) -> 16\n=MIN(...) -> 12\n\n[Cas 1 — Deux notes]\n=SOMME(...) -> 20\n=MOYENNE(...) -> 10\n=MAX(...) -> 11\n=MIN(...) -> 9\n\n[Cas 2 — Cinq notes]\n=SOMME(...) -> 68\n=MOYENNE(...) -> 13\n=MAX(...) -> 20\n=MIN(...) -> 5\n\n[Cas 3 — Identiques]\n=SOMME(...) -> 24\n=MOYENNE(...) -> 8\n=MAX(...) -> 8\n=MIN(...) -> 8\n"
  },
  {
    id: "bu-c4-e3",
    chapter: 4,
    level: "n2",
    language: 'analyse',
    title: "NB et NBVAL",
    goal: "Distinguer les cellules numériques (NB) des cellules non vides (NBVAL).",
    brief: "<p>L’analyse porte sur d'abord <strong>n</strong>, puis <strong>n cellules</strong> au format <code>contenu type</code> où type vaut <code>nombre</code>, <code>texte</code> ou <code>vide</code>. Pour chaque cellule non vide Indiquez <code>cellule : occupee</code> ; Concluez par <code>NB : X</code> (cellules numériques), <code>NBVAL : Y</code> (non vides) et <code>vides : Z</code>.</p>",
    starter: "# Grille d'analyse (bu-c4-e3) — NB et NBVAL\n# Complétez la réponse attendue sous chaque cas ci-dessous :\n\n[Cas 1 — Aucun vide]\n# Données : 1 nombre\n# Données : deux texte\n# Données : 3 nombre\nA_COMPLETER\n\n[Cas 2 — Que des nombres]\n# Données : 5 nombre\n# Données : 9 nombre\nA_COMPLETER\n\n[Cas 3 — Majorite vide]\n# Données :  - vide\n# Données :  - vide\n# Données : 8 nombre\nA_COMPLETER\n",
    hints: [
          "NB compte les nombres ; NBVAL compte tout ce qui n'est pas vide.",
          "Trois compteurs distincts, trois lignes de bilan dans l'ordre NB, NBVAL, vides."
    ],
    examples: [
          {
                "stdin": "4\n12 nombre\nchat texte\n - vide\n7 nombre\n",
                "expected": "12 : occupee\nchat : occupee\n7 : occupee\nNB : 2\nNBVAL : 3\nvides : 1"
          }
    ],
    tests: [
          {
                "label": "Aucun vide",
                "stdin": "cas:1",
                "expected": "1 : occupee\ndeux : occupee\n3 : occupee\nNB : 2\nNBVAL : 3\nvides : 0"
          },
          {
                "label": "Que des nombres",
                "stdin": "cas:2",
                "expected": "5 : occupee\n9 : occupee\nNB : 2\nNBVAL : 2\nvides : 0"
          },
          {
                "label": "Majorite vide",
                "stdin": "cas:3",
                "expected": "8 : occupee\nNB : 1\nNBVAL : 1\nvides : 2"
          }
    ],
    solution: "[Exemple]\n12 : occupee\nchat : occupee\n7 : occupee\nNB : 2\nNBVAL : 3\nvides : 1\n\n[Cas 1 — Aucun vide]\n1 : occupee\ndeux : occupee\n3 : occupee\nNB : 2\nNBVAL : 3\nvides : 0\n\n[Cas 2 — Que des nombres]\n5 : occupee\n9 : occupee\nNB : 2\nNBVAL : 2\nvides : 0\n\n[Cas 3 — Majorite vide]\n8 : occupee\nNB : 1\nNBVAL : 1\nvides : 2\n"
  },
  {
    id: "bu-c5-e1",
    chapter: 5,
    level: "n2",
    language: 'analyse',
    title: "La fonction SI",
    goal: "Transposer la commission du support : le SI d'Excel devient un if en Bash.",
    brief: "<p>L’analyse porte sur d'abord <strong>n</strong>, puis <strong>n lignes</strong> « agent ca » (chiffre d'affaires entier). Commission du support : <code>10%</code> si CA &lt; 10000, <code>15%</code> si 10000 &lt;= CA &lt; 50000, <code>20%</code> si CA &gt;= 50000. Pour chaque agent Indiquez <code>agent : X%</code> ; Concluez par <code>commission moyenne : P%</code> (moyenne entière des taux).</p>",
    starter: "# Grille d'analyse (bu-c5-e1) — La fonction SI\n# Complétez la réponse attendue sous chaque cas ci-dessous :\n\n[Cas 1 — Aux seuils]\n# Données : ana 10000\n# Données : ben 50000\nA_COMPLETER\n\n[Cas 2 — Petits CA]\n# Données : ana 9999\n# Données : ben 0\nA_COMPLETER\n\n[Cas 3 — Trois zones]\n# Données : ana 15000\n# Données : ben 45000\n# Données : cleo 55000\nA_COMPLETER\n",
    hints: [
          "Teste d'abord le plus grand seuil : >= 50000, puis >= 10000, sinon 10.",
          "Cumule les taux pour la moyenne entière."
    ],
    examples: [
          {
                "stdin": "3\nana 5000\nben 20000\ncleo 60000\n",
                "expected": "ana : 10%\nben : 15%\ncleo : 20%\ncommission moyenne : 15%"
          }
    ],
    tests: [
          {
                "label": "Aux seuils",
                "stdin": "cas:1",
                "expected": "ana : 15%\nben : 20%\ncommission moyenne : 17%"
          },
          {
                "label": "Petits CA",
                "stdin": "cas:2",
                "expected": "ana : 10%\nben : 10%\ncommission moyenne : 10%"
          },
          {
                "label": "Trois zones",
                "stdin": "cas:3",
                "expected": "ana : 15%\nben : 15%\ncleo : 20%\ncommission moyenne : 16%"
          }
    ],
    solution: "[Exemple]\nana : 10%\nben : 15%\ncleo : 20%\ncommission moyenne : 15%\n\n[Cas 1 — Aux seuils]\nana : 15%\nben : 20%\ncommission moyenne : 17%\n\n[Cas 2 — Petits CA]\nana : 10%\nben : 10%\ncommission moyenne : 10%\n\n[Cas 3 — Trois zones]\nana : 15%\nben : 15%\ncleo : 20%\ncommission moyenne : 16%\n"
  },
  {
    id: "bu-c5-e2",
    chapter: 5,
    level: "n2",
    language: 'analyse',
    title: "Gauche, droite, STXT",
    goal: "Reproduire les fonctions de texte sur des chaînes : Gauche, Droite et STXT.",
    brief: "<p>L’analyse porte sur d'abord <strong>n</strong>, puis <strong>n lignes</strong> « chaine op a b » où op est un code parmi <code>gauche</code>, <code>droite</code> ou <code>stxt</code> : pour gauche et droite, a est le nombre de caractères (b vaut 0) ; pour stxt, a est la position de départ (1 = première lettre) et b le nombre de caractères. Indiquez le résultat de chaque opération : Gauche extrait les a premiers caractères, Droite les a derniers, STXT extrait b caractères à partir de la position a.</p>",
    starter: "# Grille d'analyse (bu-c5-e2) — Gauche, droite, STXT\n# Complétez la réponse attendue sous chaque cas ci-dessous :\n\n[Cas 1 — Un caractère]\n# Données : word gauche 1 0\n# Données : word droite 1 0\nA_COMPLETER\n\n[Cas 2 — Chaîne entière]\n# Données : excel gauche 5 0\n# Données : excel stxt 1 5\nA_COMPLETER\n\n[Cas 3 — Milieu et fin]\n# Données : bureautique stxt 5 4\n# Données : bureautique droite 4 0\nA_COMPLETER\n",
    hints: [
          "Gauche : ${chaine:0:n} ; Droite : ${chaine: -n} — attention à l'espace avant le signe moins.",
          "STXT : ${chaine:n1-1:n2} — la position Excel commence à 1, l'extraction bash à 0."
    ],
    examples: [
          {
                "stdin": "3\ninformatique gauche 3 0\ninformatique droite 5 0\ninformatique stxt 2 3\n",
                "expected": "inf\ntique\nnfo"
          }
    ],
    tests: [
          {
                "label": "Un caractère",
                "stdin": "cas:1",
                "expected": "w\nd"
          },
          {
                "label": "Chaîne entière",
                "stdin": "cas:2",
                "expected": "excel\nexcel"
          },
          {
                "label": "Milieu et fin",
                "stdin": "cas:3",
                "expected": "auti\nique"
          }
    ],
    solution: "[Exemple]\ninf\ntique\nnfo\n\n[Cas 1 — Un caractère]\nw\nd\n\n[Cas 2 — Chaîne entière]\nexcel\nexcel\n\n[Cas 3 — Milieu et fin]\nauti\nique\n"
  },
  {
    id: "bu-c5-e3",
    chapter: 5,
    level: "n3",
    language: 'analyse',
    title: "Le SI imbriqué",
    goal: "Reproduire la fonction SI imbriquée : mention selon la note, avec messages composés.",
    brief: "<p>L’analyse porte sur d'abord <strong>n</strong>, puis <strong>n lignes</strong> « eleve note ». Il applique la fonction SI imbriquée du support : note &gt;= 16 → <code>eleve : tres bien</code> ; note &gt;= 14 → <code>eleve : bien</code> ; note &gt;= 10 → <code>eleve : passe</code> ; sinon <code>eleve : rattrapage</code>. Concluez par <code>recales : X</code> (notes sous 10).</p>",
    starter: "# Grille d'analyse (bu-c5-e3) — Le SI imbriqué\n# Complétez la réponse attendue sous chaque cas ci-dessous :\n\n[Cas 1 — Frontières]\n# Données : ana 16\n# Données : ben 15\n# Données : cleo 14\nA_COMPLETER\n\n[Cas 2 — Tous recales]\n# Données : ana 9\n# Données : ben 0\nA_COMPLETER\n\n[Cas 3 — Classe complète]\n# Données : a 18\n# Données : b 13\n# Données : c 10\n# Données : d 9\n# Données : e 16\nA_COMPLETER\n",
    hints: [
          "Le SI imbriqué teste du plus strict au plus large : 16, 14, 10, sinon rattrapage.",
          "Compte un recale pour chaque note strictement sous 10."
    ],
    examples: [
          {
                "stdin": "4\nana 17\nben 14\ncleo 10\ndan 8\n",
                "expected": "ana : tres bien\nben : bien\ncleo : passe\ndan : rattrapage\nrecales : 1"
          }
    ],
    tests: [
          {
                "label": "Frontières",
                "stdin": "cas:1",
                "expected": "ana : tres bien\nben : bien\ncleo : bien\nrecales : 0"
          },
          {
                "label": "Tous recales",
                "stdin": "cas:2",
                "expected": "ana : rattrapage\nben : rattrapage\nrecales : 2"
          },
          {
                "label": "Classe complète",
                "stdin": "cas:3",
                "expected": "a : tres bien\nb : passe\nc : passe\nd : rattrapage\ne : tres bien\nrecales : 1"
          }
    ],
    solution: "[Exemple]\nana : tres bien\nben : bien\ncleo : passe\ndan : rattrapage\nrecales : 1\n\n[Cas 1 — Frontières]\nana : tres bien\nben : bien\ncleo : bien\nrecales : 0\n\n[Cas 2 — Tous recales]\nana : rattrapage\nben : rattrapage\nrecales : 2\n\n[Cas 3 — Classe complète]\na : tres bien\nb : passe\nc : passe\nd : rattrapage\ne : tres bien\nrecales : 1\n"
  },
  {
    id: "bu-c6-e1",
    chapter: 6,
    level: "n1",
    language: 'analyse',
    title: "Les modes d'affichage",
    goal: "Retrouver la vocation de chaque mode d'affichage de PowerPoint.",
    brief: "<p>Pour chaque situation proposée : mode est un code parmi <code>normal</code>, <code>trieuse</code>, <code>diaporama</code> ou <code>commentaire</code> et usage un code parmi <code>edition</code>, <code>vueglobale</code>, <code>projection</code> ou <code>notes</code>. Indiquez <code>mode : OUI</code> si le couple est juste, sinon <code>mode : NON</code>, puis <code>justes : X/n</code>.</p>",
    starter: "# Grille d'analyse (bu-c6-e1) — Les modes d'affichage\n# Complétez la réponse attendue sous chaque cas ci-dessous :\n\n[Cas 1 — Les quatre]\n# Données : normal edition\n# Données : trieuse vueglobale\n# Données : diaporama projection\n# Données : commentaire notes\nA_COMPLETER\n\n[Cas 2 — Deux confusions]\n# Données : trieuse projection\n# Données : commentaire edition\nA_COMPLETER\n\n[Cas 3 — Série mixte]\n# Données : diaporama projection\n# Données : normal vueglobale\n# Données : trieuse vueglobale\nA_COMPLETER\n",
    hints: [
          "Les quatre couples : normal-edition, trieuse-vueglobale, diaporama-projection, commentaire-notes.",
          "Un case sur le mode donne l'usage attendu."
    ],
    examples: [
          {
                "stdin": "2\nnormal edition\ndiaporama edition\n",
                "expected": "normal : OUI\ndiaporama : NON\njustes : 1/2"
          }
    ],
    tests: [
          {
                "label": "Les quatre",
                "stdin": "cas:1",
                "expected": "normal : OUI\ntrieuse : OUI\ndiaporama : OUI\ncommentaire : OUI\njustes : 4/4"
          },
          {
                "label": "Deux confusions",
                "stdin": "cas:2",
                "expected": "trieuse : NON\ncommentaire : NON\njustes : 0/2"
          },
          {
                "label": "Série mixte",
                "stdin": "cas:3",
                "expected": "diaporama : OUI\nnormal : NON\ntrieuse : OUI\njustes : 2/3"
          }
    ],
    solution: "[Exemple]\nnormal : OUI\ndiaporama : NON\njustes : 1/2\n\n[Cas 1 — Les quatre]\nnormal : OUI\ntrieuse : OUI\ndiaporama : OUI\ncommentaire : OUI\njustes : 4/4\n\n[Cas 2 — Deux confusions]\ntrieuse : NON\ncommentaire : NON\njustes : 0/2\n\n[Cas 3 — Série mixte]\ndiaporama : OUI\nnormal : NON\ntrieuse : OUI\njustes : 2/3\n"
  },
  {
    id: "bu-c6-e2",
    chapter: 6,
    level: "n2",
    language: 'analyse',
    title: "Composer le diaporama",
    goal: "Valider la construction d'une présentation : chaque diapositive a un rôle et une place.",
    brief: "<p>Pour chaque situation proposée : type est un code parmi <code>titre</code>, <code>contenu</code>, <code>graphique</code> ou <code>conclusion</code>. Présentation conforme : la diapositive 1 est un <code>titre</code>, la dernière une <code>conclusion</code>, les autres un <code>contenu</code> ou un <code>graphique</code>. Pour chaque diapositive Indiquez <code>diapo : conforme</code> ou <code>diapo : a revoir</code> ; Concluez par <code>presentation : conforme</code> si TOUTES les diapositives sont conformes, <code>presentation : a revoir</code> dès qu'une seule faute.</p>",
    starter: "# Grille d'analyse (bu-c6-e2) — Composer le diaporama\n# Complétez la réponse attendue sous chaque cas ci-dessous :\n\n[Cas 1 — Titre mal placé]\n# Données : d1 contenu\n# Données : d2 contenu\n# Données : d3 conclusion\nA_COMPLETER\n\n[Cas 2 — Avec graphique]\n# Données : d1 titre\n# Données : d2 graphique\n# Données : d3 contenu\n# Données : d4 conclusion\nA_COMPLETER\n\n[Cas 3 — Fin manquante]\n# Données : d1 titre\n# Données : d2 contenu\n# Données : d3 contenu\nA_COMPLETER\n",
    hints: [
          "Le numéro de la diapositive est le compteur i : 1 = titre, n = conclusion, entre les deux contenu ou graphique.",
          "Une seule diapositive fautive invalide toute la présentation."
    ],
    examples: [
          {
                "stdin": "3\nd1 titre\nd2 contenu\nd3 conclusion\n",
                "expected": "d1 : conforme\nd2 : conforme\nd3 : conforme\npresentation : conforme"
          }
    ],
    tests: [
          {
                "label": "Titre mal placé",
                "stdin": "cas:1",
                "expected": "d1 : a revoir\nd2 : conforme\nd3 : conforme\npresentation : a revoir"
          },
          {
                "label": "Avec graphique",
                "stdin": "cas:2",
                "expected": "d1 : conforme\nd2 : conforme\nd3 : conforme\nd4 : conforme\npresentation : conforme"
          },
          {
                "label": "Fin manquante",
                "stdin": "cas:3",
                "expected": "d1 : conforme\nd2 : conforme\nd3 : a revoir\npresentation : a revoir"
          }
    ],
    solution: "[Exemple]\nd1 : conforme\nd2 : conforme\nd3 : conforme\npresentation : conforme\n\n[Cas 1 — Titre mal placé]\nd1 : a revoir\nd2 : conforme\nd3 : conforme\npresentation : a revoir\n\n[Cas 2 — Avec graphique]\nd1 : conforme\nd2 : conforme\nd3 : conforme\nd4 : conforme\npresentation : conforme\n\n[Cas 3 — Fin manquante]\nd1 : conforme\nd2 : conforme\nd3 : a revoir\npresentation : a revoir\n"
  },
  {
    id: "bu-c6-e3",
    chapter: 6,
    level: "n3",
    language: 'analyse',
    title: "Le minutage du diaporama",
    goal: "Simuler le minutage automatique : chaque diapositive s'affiche selon sa durée annoncée.",
    brief: "<p>L’analyse porte sur d'abord <strong>n</strong>, puis <strong>n lignes</strong> « diapo duree » (durée entière en secondes). Le diaporama avance automatiquement : Indiquez <code>diapo : Xs</code> pour chaque diapositive, puis <code>total : T</code> et <code>moyenne : M</code> (division entière). Une durée à 0 bloque la présentation : dans ce cas le cas affiche <code>diapo : duree nulle</code> à sa place, <code>total : -1</code> et <code>moyenne : -1</code>.</p>",
    starter: "# Grille d'analyse (bu-c6-e3) — Le minutage du diaporama\n# Complétez la réponse attendue sous chaque cas ci-dessous :\n\n[Cas 1 — Duree nulle]\n# Données : d1 10\n# Données : d2 0\n# Données : d3 30\nA_COMPLETER\n\n[Cas 2 — Une diapo]\n# Données : d1 15\nA_COMPLETER\n\n[Cas 3 — Arrondi entier]\n# Données : d1 10\n# Données : d2 11\n# Données : d3 12\nA_COMPLETER\n",
    hints: [
          "Dès qu'une durée vaut 0, pose bloque=1 sans jamais la remettre à 0 : le bilan passe à -1.",
          "La moyenne entière ne se calcule que si rien ne bloque."
    ],
    examples: [
          {
                "stdin": "3\nd1 10\nd2 20\nd3 30\n",
                "expected": "d1 : 10s\nd2 : 20s\nd3 : 30s\ntotal : 60\nmoyenne : 20"
          }
    ],
    tests: [
          {
                "label": "Duree nulle",
                "stdin": "cas:1",
                "expected": "d1 : 10s\nd2 : duree nulle\nd3 : 30s\ntotal : -1\nmoyenne : -1"
          },
          {
                "label": "Une diapo",
                "stdin": "cas:2",
                "expected": "d1 : 15s\ntotal : 15\nmoyenne : 15"
          },
          {
                "label": "Arrondi entier",
                "stdin": "cas:3",
                "expected": "d1 : 10s\nd2 : 11s\nd3 : 12s\ntotal : 33\nmoyenne : 11"
          }
    ],
    solution: "[Exemple]\nd1 : 10s\nd2 : 20s\nd3 : 30s\ntotal : 60\nmoyenne : 20\n\n[Cas 1 — Duree nulle]\nd1 : 10s\nd2 : duree nulle\nd3 : 30s\ntotal : -1\nmoyenne : -1\n\n[Cas 2 — Une diapo]\nd1 : 15s\ntotal : 15\nmoyenne : 15\n\n[Cas 3 — Arrondi entier]\nd1 : 10s\nd2 : 11s\nd3 : 12s\ntotal : 33\nmoyenne : 11\n"
  }
];

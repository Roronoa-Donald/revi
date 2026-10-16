/**
 * chapitre6.js — Études de cas du cours « droit ».
 * Mode d'évaluation conceptuelle structurée (language: 'analyse').
 */
'use strict';

module.exports = [
  {
    id: "dr2-c6-e1",
    chapter: 6,
    level: "n1",
    language: 'analyse',
    title: "Articles du cadre institutionnel",
    goal: "Associer quelques articles de la loi togolaise à leur objet.",
    brief: "<p>L’analyse porte sur <strong>n codes</strong> d'articles (un par ligne). <code>a55</code> crée l'IPDCP, <code>a68</code> définit sa mission de contrôle, <code>a79</code> réprime les traitements sans formalités préalables. Pour chaque code, affichez <code>code : objet</code> : <code>a55 : creation de l IPDCP</code>, <code>a68 : mission de controle</code>, <code>a79 : traitements sans formalites</code>. Enfin <code>articles : X</code>.</p>",
    starter: "# Grille d'analyse (dr2-c6-e1) — Articles du cadre institutionnel\n# Complétez la réponse attendue sous chaque cas ci-dessous :\n\n[Cas 1 — La mission de contrôle]\n# Données : a68\nA_COMPLETER\n\n[Cas 2 — Article 68 deux fois]\n# Données : a68\n# Données : a68\nA_COMPLETER\n\n[Cas 3 — Trois articles]\n# Données : a55\n# Données : a68\n# Données : a79\nA_COMPLETER\n",
    hints: [
          "a55 → création ; a68 → contrôle ; a79 → traitements sans formalités.",
          "Un case à trois motifs suffit."
    ],
    examples: [
          {
                "stdin": "2\na55\na79\n",
                "expected": "a55 : creation de l IPDCP\na79 : traitements sans formalites\narticles : 2"
          }
    ],
    tests: [
          {
                "label": "La mission de contrôle",
                "stdin": "cas:1",
                "expected": "a68 : mission de controle\narticles : 1"
          },
          {
                "label": "Article 68 deux fois",
                "stdin": "cas:2",
                "expected": "a68 : mission de controle\na68 : mission de controle\narticles : 2"
          },
          {
                "label": "Trois articles",
                "stdin": "cas:3",
                "expected": "a55 : creation de l IPDCP\na68 : mission de controle\na79 : traitements sans formalites\narticles : 3"
          }
    ],
    solution: "[Exemple]\na55 : creation de l IPDCP\na79 : traitements sans formalites\narticles : 2\n\n[Cas 1 — La mission de contrôle]\na68 : mission de controle\narticles : 1\n\n[Cas 2 — Article 68 deux fois]\na68 : mission de controle\na68 : mission de controle\narticles : 2\n\n[Cas 3 — Trois articles]\na55 : creation de l IPDCP\na68 : mission de controle\na79 : traitements sans formalites\narticles : 3\n"
  },
  {
    id: "dr2-c6-e2",
    chapter: 6,
    level: "n2",
    language: 'analyse',
    title: "Calcul de la sanction pénale (Togo)",
    goal: "Déterminer la peine encourue et l'amende minimale selon le caractère intentionnel ou négligent.",
    brief: "<p>L’analyse porte sur d'abord le <strong>type</strong> d'infraction (<code>intentionnel</code> ou <code>negligence</code>), puis le <strong>nombre d'infractions</strong> (entier). Art. 79 : l'infraction intentionnelle est punie de <em>1 an à 5 ans</em> et d'une amende de <em>1 000 000 à 10 000 000</em> de francs CFA ; l'infraction par négligence, de <em>1 an à 3 ans</em> et de <em>500 000 à 5 000 000</em>. Affichez <code>emprisonnement : X</code> (la fourchette) puis <code>amende minimale : Y</code>, Y étant la somme des amendes minimales.</p>",
    starter: "# Grille d'analyse (dr2-c6-e2) — Calcul de la sanction pénale (Togo)\n# Complétez la réponse attendue sous chaque cas ci-dessous :\n\n[Cas 1 — Négligence simple]\n# Données : negligence\n# Données : 1\nA_COMPLETER\n\n[Cas 2 — Trois infractions par négligence]\n# Données : negligence\n# Données : 3\nA_COMPLETER\n\n[Cas 3 — Quatre infractions intentionnelles]\n# Données : intentionnel\n# Données : 4\nA_COMPLETER\n",
    hints: [
          "intentionnel → « 1 a 5 ans » et 1 000 000 par infraction ; negligence → « 1 a 3 ans » et 500 000.",
          "L'amende minimale cumulée vaut nombre × montant minimal unitaire."
    ],
    examples: [
          {
                "stdin": "intentionnel\n2\n",
                "expected": "emprisonnement : 1 a 5 ans\namende minimale : 2000000"
          }
    ],
    tests: [
          {
                "label": "Négligence simple",
                "stdin": "cas:1",
                "expected": "emprisonnement : 1 a 3 ans\namende minimale : 500000"
          },
          {
                "label": "Trois infractions par négligence",
                "stdin": "cas:2",
                "expected": "emprisonnement : 1 a 3 ans\namende minimale : 1500000"
          },
          {
                "label": "Quatre infractions intentionnelles",
                "stdin": "cas:3",
                "expected": "emprisonnement : 1 a 5 ans\namende minimale : 4000000"
          }
    ],
    solution: "[Exemple]\nemprisonnement : 1 a 5 ans\namende minimale : 2000000\n\n[Cas 1 — Négligence simple]\nemprisonnement : 1 a 3 ans\namende minimale : 500000\n\n[Cas 2 — Trois infractions par négligence]\nemprisonnement : 1 a 3 ans\namende minimale : 1500000\n\n[Cas 3 — Quatre infractions intentionnelles]\nemprisonnement : 1 a 5 ans\namende minimale : 4000000\n"
  },
  {
    id: "dr2-c6-e3",
    chapter: 6,
    level: "n2",
    language: 'analyse',
    title: "Qualification des infractions",
    goal: "Rattacher une infraction à l'article de la loi togolaise qui la réprime, puis compter.",
    brief: "<p>Pour chaque situation proposée : <code>a86</code> (données sensibles sans consentement), <code>a87</code> (données relatives aux condamnations ou mesures de sûreté), <code>a93</code> (entrave à l'action de l'Instance de contrôle). Pour chaque situation, indiquez <code>libelle : objet</code> : <code>donnees sensibles</code>, <code>condamnations</code> ou <code>entrave au controle</code>. Enfin <code>infractions : X/n</code>.</p>",
    starter: "# Grille d'analyse (dr2-c6-e3) — Qualification des infractions\n# Complétez la réponse attendue sous chaque cas ci-dessous :\n\n[Cas 1 — Une condamnation]\n# Données : a87 fichier des condamnations\nA_COMPLETER\n\n[Cas 2 — Deux entraves]\n# Données : a93 documents caches\n# Données : a93 programme refuse\nA_COMPLETER\n\n[Cas 3 — Quatre infractions]\n# Données : a86 sante\n# Données : a87 surete\n# Données : a93 controle empeche\n# Données : a86 vie sexuelle\nA_COMPLETER\n",
    hints: [
          "a86 → donnees sensibles ; a87 → condamnations ; a93 → entrave au controle.",
          "Le compteur « infractions » s'incrémente à chaque ligne."
    ],
    examples: [
          {
                "stdin": "2\na86 origine ethnique stockee\na93 refus de communication\n",
                "expected": "origine ethnique stockee : donnees sensibles\nrefus de communication : entrave au controle\ninfractions : 2/2"
          }
    ],
    tests: [
          {
                "label": "Une condamnation",
                "stdin": "cas:1",
                "expected": "fichier des condamnations : condamnations\ninfractions : 1/1"
          },
          {
                "label": "Deux entraves",
                "stdin": "cas:2",
                "expected": "documents caches : entrave au controle\nprogramme refuse : entrave au controle\ninfractions : 2/2"
          },
          {
                "label": "Quatre infractions",
                "stdin": "cas:3",
                "expected": "sante : donnees sensibles\nsurete : condamnations\ncontrole empeche : entrave au controle\nvie sexuelle : donnees sensibles\ninfractions : 4/4"
          }
    ],
    solution: "[Exemple]\norigine ethnique stockee : donnees sensibles\nrefus de communication : entrave au controle\ninfractions : 2/2\n\n[Cas 1 — Une condamnation]\nfichier des condamnations : condamnations\ninfractions : 1/1\n\n[Cas 2 — Deux entraves]\ndocuments caches : entrave au controle\nprogramme refuse : entrave au controle\ninfractions : 2/2\n\n[Cas 3 — Quatre infractions]\nsante : donnees sensibles\nsurete : condamnations\ncontrole empeche : entrave au controle\nvie sexuelle : donnees sensibles\ninfractions : 4/4\n"
  }
];

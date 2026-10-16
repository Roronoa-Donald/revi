/**
 * chapitre6.js — Études de cas du cours « uiux ».
 * Mode d'évaluation conceptuelle structurée (language: 'analyse').
 */
'use strict';

module.exports = [
  {
    id: "ux2-c6-e1",
    chapter: 6,
    level: "n1",
    language: 'analyse',
    title: "Calculateur de contraste colorimétrique formel WCAG 2.1",
    goal: "Calculer la luminance relative et le ratio de contraste formel WCAG pour valider les seuils AA et AAA.",
    brief: "<p>Pour chaque cas d’application des paires de codes hexadécimaux <code>&lt;#COUL1&gt; &lt;#COUL2&gt;</code>.<br>\nSelon la formule formelle du W3C / WCAG 2.1 :<br>\n1. Convertir chaque canal R, G, B normalisé sur [0, 1] : si <code>c &lt;= 0.04045</code>, <code>v = c / 12.92</code>, sinon <code>v = ((c + 0.055) / 1.055) ** 2.4</code>.<br>\n2. Luminance : <code>L = 0.2126 * r + 0.7152 * g + 0.0722 * b</code>.<br>\n3. Ratio : <code>(Lmax + 0.05) / (Lmin + 0.05)</code> (arrondi à 2 décimales).<br>\n4. Niveaux de conformité :<br>\n- Texte normal : <code>AAA</code> si ratio &gt;= 7.00, <code>AA</code> si ratio &gt;= 4.50, sinon <code>ECHEC</code>.<br>\n- Grand texte : <code>AAA</code> si ratio &gt;= 4.50, <code>AA</code> si ratio &gt;= 3.00, sinon <code>ECHEC</code>.<br>\nAfficher :<br>\n<code>CONTRASTE: &lt;ratio:.2f&gt;:1 | NORMAL: &lt;ECHEC|AA|AAA&gt; | LARGE: &lt;ECHEC|AA|AAA&gt;</code></p>",
    starter: "# Grille d'analyse (ux2-c6-e1) — Calculateur de contraste colorimétrique formel WCAG 2.1\n# Complétez la réponse attendue sous chaque cas ci-dessous :\n\n[Cas 1 — Noir et blanc pur]\n# Données : #ffffff #000000\nA_COMPLETER\n\n[Cas 2 — Couleurs de la marque (Teal accessible sur blanc)]\n# Données : #0f766e #ffffff\nA_COMPLETER\n\n[Cas 3 — Bleu hyperlien classique sur fond sombre]\n# Données : #0000ff #000000\nA_COMPLETER\n\n[Cas 4 — Seuils limites AA 4.54:1 et AAA 7.12:1]\n# Données : #595959 #ffffff\n# Données : #333333 #ffffff\nA_COMPLETER\n",
    hints: [
          "Pour convertir un hexadécimal #RRGGBB : int(h[1:3], 16), int(h[3:5], 16), int(h[5:7], 16).",
          "Le ratio compare toujours la couleur la plus claire (Lmax) à la plus sombre (Lmin)."
    ],
    examples: [
          {
                "stdin": "#000000 #ffffff\n#777777 #ffffff\n#aaaaaa #ffffff",
                "expected": "CONTRASTE: 21.00:1 | NORMAL: AAA | LARGE: AAA\nCONTRASTE: 4.48:1 | NORMAL: ECHEC | LARGE: AA\nCONTRASTE: 2.32:1 | NORMAL: ECHEC | LARGE: ECHEC",
                "note": "#777777 sur blanc échoue de peu au texte normal (4.48 < 4.5) mais passe en grand texte."
          }
    ],
    tests: [
          {
                "label": "Noir et blanc pur",
                "stdin": "cas:1",
                "expected": "CONTRASTE: 21.00:1 | NORMAL: AAA | LARGE: AAA"
          },
          {
                "label": "Couleurs de la marque (Teal accessible sur blanc)",
                "stdin": "cas:2",
                "expected": "CONTRASTE: 5.47:1 | NORMAL: AA | LARGE: AAA"
          },
          {
                "label": "Bleu hyperlien classique sur fond sombre",
                "stdin": "cas:3",
                "expected": "CONTRASTE: 2.44:1 | NORMAL: ECHEC | LARGE: ECHEC"
          },
          {
                "label": "Seuils limites AA 4.54:1 et AAA 7.12:1",
                "stdin": "cas:4",
                "expected": "CONTRASTE: 7.00:1 | NORMAL: AAA | LARGE: AAA\nCONTRASTE: 12.63:1 | NORMAL: AAA | LARGE: AAA"
          }
    ],
    solution: "[Exemple]\nCONTRASTE: 21.00:1 | NORMAL: AAA | LARGE: AAA\nCONTRASTE: 4.48:1 | NORMAL: ECHEC | LARGE: AA\nCONTRASTE: 2.32:1 | NORMAL: ECHEC | LARGE: ECHEC\n\n[Cas 1 — Noir et blanc pur]\nCONTRASTE: 21.00:1 | NORMAL: AAA | LARGE: AAA\n\n[Cas 2 — Couleurs de la marque (Teal accessible sur blanc)]\nCONTRASTE: 5.47:1 | NORMAL: AA | LARGE: AAA\n\n[Cas 3 — Bleu hyperlien classique sur fond sombre]\nCONTRASTE: 2.44:1 | NORMAL: ECHEC | LARGE: ECHEC\n\n[Cas 4 — Seuils limites AA 4.54:1 et AAA 7.12:1]\nCONTRASTE: 7.00:1 | NORMAL: AAA | LARGE: AAA\nCONTRASTE: 12.63:1 | NORMAL: AAA | LARGE: AAA\n"
  },
  {
    id: "ux2-c6-e2",
    chapter: 6,
    level: "n2",
    language: 'analyse',
    title: "Validateur d’attributs sémantiques et textes alternatifs",
    goal: "Auditer la conformité des attributs d’accessibilité sur les images (balise alt) et les boutons interactifs (nom accessible).",
    brief: "<p>Pour chaque cas d’application des balises HTML simplifiées (une par ligne).<br>\nRègles de validation :<br>\n1. Balise <code>&lt;img ...&gt;</code> :<br>\n- Si <code>alt=\"\"</code> (chaîne vide explicite) : afficher <code>&lt;Balise&gt; -&gt; CONFORME (Image decorative)</code><br>\n- Si <code>alt=\"...\"</code> contient du texte non vide : afficher <code>&lt;Balise&gt; -&gt; CONFORME (Image informative)</code><br>\n- Si l'attribut <code>alt</code> est absent : afficher <code>&lt;Balise&gt; -&gt; NON_CONFORME (Alt manquant)</code><br>\n2. Balise <code>&lt;button ...&gt;...&lt;/button&gt;</code> :<br>\n- Si elle contient du texte entre les balises ou possède un attribut <code>aria-label=\"...\"</code> non vide : afficher <code>&lt;Balise&gt; -&gt; CONFORME (Nom accessible present)</code><br>\n- Sinon (bouton vide sans aria-label) : afficher <code>&lt;Balise&gt; -&gt; NON_CONFORME (Bouton vide sans nom accessible)</code></p>",
    starter: "# Grille d'analyse (ux2-c6-e2) — Validateur d’attributs sémantiques et textes alternatifs\n# Complétez la réponse attendue sous chaque cas ci-dessous :\n\n[Cas 1 — Images informatives et décoratives]\n# Données : <img src=\"schema.svg\" alt=\"Diagramme de flux\">\n# Données : <img src=\"separateur.png\" alt=\"\">\nA_COMPLETER\n\n[Cas 2 — Images non conformes sans alt]\n# Données : <img src=\"banniere.jpg\">\n# Données : <img src=\"icone.png\" class=\"icon\">\nA_COMPLETER\n\n[Cas 3 — Boutons avec texte textuel ou aria-label]\n# Données : <button>Valider le formulaire</button>\n# Données : <button class=\"icon-btn\" aria-label=\"Rechercher\"></button>\nA_COMPLETER\n\n[Cas 4 — Boutons vides non conformes]\n# Données : <button class=\"burger\"></button>\n# Données : <button><span class=\"icon\"></span></button>\nA_COMPLETER\n",
    hints: [
          "Repérer les attributs alt=\"\" et alt=\"texte\" avec des vérifications de sous-chaînes ou regex.",
          "Un bouton <button aria-label=\"Fermer\"></button> est parfaitement conforme."
    ],
    examples: [
          {
                "stdin": "<img src=\"logo.png\" alt=\"Logo Entreprise\">\n<img src=\"fond.jpg\" alt=\"\">\n<img src=\"photo.png\">\n<button aria-label=\"Fermer\"></button>\n<button></button>",
                "expected": "<img src=\"logo.png\" alt=\"Logo Entreprise\"> -> CONFORME (Image informative)\n<img src=\"fond.jpg\" alt=\"\"> -> CONFORME (Image decorative)\n<img src=\"photo.png\"> -> NON_CONFORME (Alt manquant)\n<button aria-label=\"Fermer\"></button> -> CONFORME (Nom accessible present)\n<button></button> -> NON_CONFORME (Bouton vide sans nom accessible)",
                "note": "Diagnostic des rôles et textes accessibles WCAG 1.1.1 et 4.1.2."
          }
    ],
    tests: [
          {
                "label": "Images informatives et décoratives",
                "stdin": "cas:1",
                "expected": "<img src=\"schema.svg\" alt=\"Diagramme de flux\"> -> CONFORME (Image informative)\n<img src=\"separateur.png\" alt=\"\"> -> CONFORME (Image decorative)"
          },
          {
                "label": "Images non conformes sans alt",
                "stdin": "cas:2",
                "expected": "<img src=\"banniere.jpg\"> -> NON_CONFORME (Alt manquant)\n<img src=\"icone.png\" class=\"icon\"> -> NON_CONFORME (Alt manquant)"
          },
          {
                "label": "Boutons avec texte textuel ou aria-label",
                "stdin": "cas:3",
                "expected": "<button>Valider le formulaire</button> -> CONFORME (Nom accessible present)\n<button class=\"icon-btn\" aria-label=\"Rechercher\"></button> -> CONFORME (Nom accessible present)"
          },
          {
                "label": "Boutons vides non conformes",
                "stdin": "cas:4",
                "expected": "<button class=\"burger\"></button> -> NON_CONFORME (Bouton vide sans nom accessible)\n<button><span class=\"icon\"></span></button> -> NON_CONFORME (Bouton vide sans nom accessible)"
          }
    ],
    solution: "[Exemple]\n<img src=\"logo.png\" alt=\"Logo Entreprise\"> -> CONFORME (Image informative)\n<img src=\"fond.jpg\" alt=\"\"> -> CONFORME (Image decorative)\n<img src=\"photo.png\"> -> NON_CONFORME (Alt manquant)\n<button aria-label=\"Fermer\"></button> -> CONFORME (Nom accessible present)\n<button></button> -> NON_CONFORME (Bouton vide sans nom accessible)\n\n[Cas 1 — Images informatives et décoratives]\n<img src=\"schema.svg\" alt=\"Diagramme de flux\"> -> CONFORME (Image informative)\n<img src=\"separateur.png\" alt=\"\"> -> CONFORME (Image decorative)\n\n[Cas 2 — Images non conformes sans alt]\n<img src=\"banniere.jpg\"> -> NON_CONFORME (Alt manquant)\n<img src=\"icone.png\" class=\"icon\"> -> NON_CONFORME (Alt manquant)\n\n[Cas 3 — Boutons avec texte textuel ou aria-label]\n<button>Valider le formulaire</button> -> CONFORME (Nom accessible present)\n<button class=\"icon-btn\" aria-label=\"Rechercher\"></button> -> CONFORME (Nom accessible present)\n\n[Cas 4 — Boutons vides non conformes]\n<button class=\"burger\"></button> -> NON_CONFORME (Bouton vide sans nom accessible)\n<button><span class=\"icon\"></span></button> -> NON_CONFORME (Bouton vide sans nom accessible)\n"
  },
  {
    id: "ux2-c6-e3",
    chapter: 6,
    level: "n3",
    language: 'analyse',
    title: "Vérificateur d’ordre de tabulation (tabindex)",
    goal: "Auditer l’usage des attributs tabindex pour garantir une navigation clavier fluide sans perturbation du focus.",
    brief: "<p>Pour chaque cas d’application des lignes au format <code>&lt;NomComposant&gt; &lt;tabindex&gt;</code>.<br>\nSelon les bonnes pratiques WCAG 2.1 (Critère 2.4.3 Ordre du focus) :<br>\n- <code>tabindex=0</code> : afficher <code>&lt;Nom&gt; [tabindex=0] -&gt; NATUREL (Dans le flux DOM)</code><br>\n- <code>tabindex=-1</code> : afficher <code>&lt;Nom&gt; [tabindex=-1] -&gt; PROGRAMMATIQUE (Hors tabulation sequentielle)</code><br>\n- <code>tabindex &gt; 0</code> : afficher <code>&lt;Nom&gt; [tabindex=&lt;N&gt;] -&gt; ANTI_PATTERN (tabindex positif deconseille)</code><br>\nÀ la fin de l'analyse, afficher le diagnostic global de la page :<br>\n- S'il n'y a aucun tabindex positif : <code>DIAGNOSTIC_PAGE: CONFORME (Ordre de tabulation naturel)</code><br>\n- S'il y a un ou plusieurs tabindex positifs : <code>DIAGNOSTIC_PAGE: NON_CONFORME (&lt;K&gt; composant(s) avec tabindex positif)</code></p>",
    starter: "# Grille d'analyse (ux2-c6-e3) — Vérificateur d’ordre de tabulation (tabindex)\n# Complétez la réponse attendue sous chaque cas ci-dessous :\n\n[Cas 1 — Anti-pattern avec tabindex positifs multiples]\n# Données : Logo 1\n# Données : Recherche 2\n# Données : Menu 3\nA_COMPLETER\n\n[Cas 2 — Mélange conforme 0 et -1]\n# Données : BoutonA 0\n# Données : BoutonB -1\n# Données : BoutonC 0\nA_COMPLETER\n\n[Cas 3 — Un seul composant fautif]\n# Données : Lien1 0\n# Données : Lien2 0\n# Données : LienPrioritaire 5\nA_COMPLETER\n\n[Cas 4 — Composant modal seul]\n# Données : FenetreModale -1\nA_COMPLETER\n",
    hints: [
          "Un tabindex positif force artificiellement l'ordre et désoriente les utilisateurs de technologies d'assistance.",
          "Comptabiliser le nombre d'anti-patterns."
    ],
    examples: [
          {
                "stdin": "ChampNom 0\nChampPrenom 0\nModaleCachee -1\nBoutonValider 0",
                "expected": "ChampNom [tabindex=0] -> NATUREL (Dans le flux DOM)\nChampPrenom [tabindex=0] -> NATUREL (Dans le flux DOM)\nModaleCachee [tabindex=-1] -> PROGRAMMATIQUE (Hors tabulation sequentielle)\nBoutonValider [tabindex=0] -> NATUREL (Dans le flux DOM)\nDIAGNOSTIC_PAGE: CONFORME (Ordre de tabulation naturel)",
                "note": "Flux de tabulation parfaitement sain et accessible."
          }
    ],
    tests: [
          {
                "label": "Anti-pattern avec tabindex positifs multiples",
                "stdin": "cas:1",
                "expected": "Logo [tabindex=1] -> ANTI_PATTERN (tabindex positif deconseille)\nRecherche [tabindex=2] -> ANTI_PATTERN (tabindex positif deconseille)\nMenu [tabindex=3] -> ANTI_PATTERN (tabindex positif deconseille)\nDIAGNOSTIC_PAGE: NON_CONFORME (3 composant(s) avec tabindex positif)"
          },
          {
                "label": "Mélange conforme 0 et -1",
                "stdin": "cas:2",
                "expected": "BoutonA [tabindex=0] -> NATUREL (Dans le flux DOM)\nBoutonB [tabindex=-1] -> PROGRAMMATIQUE (Hors tabulation sequentielle)\nBoutonC [tabindex=0] -> NATUREL (Dans le flux DOM)\nDIAGNOSTIC_PAGE: CONFORME (Ordre de tabulation naturel)"
          },
          {
                "label": "Un seul composant fautif",
                "stdin": "cas:3",
                "expected": "Lien1 [tabindex=0] -> NATUREL (Dans le flux DOM)\nLien2 [tabindex=0] -> NATUREL (Dans le flux DOM)\nLienPrioritaire [tabindex=5] -> ANTI_PATTERN (tabindex positif deconseille)\nDIAGNOSTIC_PAGE: NON_CONFORME (1 composant(s) avec tabindex positif)"
          },
          {
                "label": "Composant modal seul",
                "stdin": "cas:4",
                "expected": "FenetreModale [tabindex=-1] -> PROGRAMMATIQUE (Hors tabulation sequentielle)\nDIAGNOSTIC_PAGE: CONFORME (Ordre de tabulation naturel)"
          }
    ],
    solution: "[Exemple]\nChampNom [tabindex=0] -> NATUREL (Dans le flux DOM)\nChampPrenom [tabindex=0] -> NATUREL (Dans le flux DOM)\nModaleCachee [tabindex=-1] -> PROGRAMMATIQUE (Hors tabulation sequentielle)\nBoutonValider [tabindex=0] -> NATUREL (Dans le flux DOM)\nDIAGNOSTIC_PAGE: CONFORME (Ordre de tabulation naturel)\n\n[Cas 1 — Anti-pattern avec tabindex positifs multiples]\nLogo [tabindex=1] -> ANTI_PATTERN (tabindex positif deconseille)\nRecherche [tabindex=2] -> ANTI_PATTERN (tabindex positif deconseille)\nMenu [tabindex=3] -> ANTI_PATTERN (tabindex positif deconseille)\nDIAGNOSTIC_PAGE: NON_CONFORME (3 composant(s) avec tabindex positif)\n\n[Cas 2 — Mélange conforme 0 et -1]\nBoutonA [tabindex=0] -> NATUREL (Dans le flux DOM)\nBoutonB [tabindex=-1] -> PROGRAMMATIQUE (Hors tabulation sequentielle)\nBoutonC [tabindex=0] -> NATUREL (Dans le flux DOM)\nDIAGNOSTIC_PAGE: CONFORME (Ordre de tabulation naturel)\n\n[Cas 3 — Un seul composant fautif]\nLien1 [tabindex=0] -> NATUREL (Dans le flux DOM)\nLien2 [tabindex=0] -> NATUREL (Dans le flux DOM)\nLienPrioritaire [tabindex=5] -> ANTI_PATTERN (tabindex positif deconseille)\nDIAGNOSTIC_PAGE: NON_CONFORME (1 composant(s) avec tabindex positif)\n\n[Cas 4 — Composant modal seul]\nFenetreModale [tabindex=-1] -> PROGRAMMATIQUE (Hors tabulation sequentielle)\nDIAGNOSTIC_PAGE: CONFORME (Ordre de tabulation naturel)\n"
  }
];

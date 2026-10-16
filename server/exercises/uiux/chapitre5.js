/**
 * chapitre5.js — Études de cas du cours « uiux ».
 * Mode d'évaluation conceptuelle structurée (language: 'analyse').
 */
'use strict';

module.exports = [
  {
    id: "ux2-c5-e1",
    chapter: 5,
    level: "n1",
    language: 'analyse',
    title: "Détecteur de Breakpoint et adaptateur de disposition",
    goal: "Classer un viewport dans son palier responsive et déterminer le nombre de colonnes de grille et la disposition.",
    brief: "<p>Pour chaque cas d’application des largeurs d'écran entières en pixels (une par ligne).<br>\nSelon la grille standardisée des systèmes responsive modernes :<br>\n- <code>w &lt; 640px</code> : <code>APPAREIL: MOBILE | GRILLE: 4 colonnes | LAYOUT: Colonne_Unique</code><br>\n- <code>640px &lt;= w &lt; 1024px</code> : <code>APPAREIL: TABLETTE | GRILLE: 8 colonnes | LAYOUT: Deux_Colonnes</code><br>\n- <code>1024px &lt;= w &lt; 1440px</code> : <code>APPAREIL: DESKTOP | GRILLE: 12 colonnes | LAYOUT: Trois_Colonnes</code><br>\n- <code>w &gt;= 1440px</code> : <code>APPAREIL: LARGE_DESKTOP | GRILLE: 12 colonnes | LAYOUT: Grille_Quatre_Colonnes_Centree</code><br>\nPour chaque largeur, afficher :<br>\n<code>VIEWPORT: &lt;w&gt;px -&gt; &lt;APPAREIL&gt; | &lt;GRILLE&gt; | &lt;LAYOUT&gt;</code></p>",
    starter: "# Grille d'analyse (ux2-c5-e1) — Détecteur de Breakpoint et adaptateur de disposition\n# Complétez la réponse attendue sous chaque cas ci-dessous :\n\n[Cas 1 — Frontières exactes 640, 1024 et 1440]\n# Données : 640\n# Données : 1023\n# Données : 1024\n# Données : 1439\n# Données : 1440\nA_COMPLETER\n\n[Cas 2 — Petits mobiles (iPhone SE / Android compact)]\n# Données : 390\n# Données : 414\nA_COMPLETER\n\n[Cas 3 — Grands écrans 4K et Ultra-Wide]\n# Données : 3840\nA_COMPLETER\n\n[Cas 4 — Tablette format portrait et paysage]\n# Données : 1000\nA_COMPLETER\n",
    hints: [
          "Appliquer les seuils stricts 640, 1024 et 1440 pixels.",
          "Suivre la convention Mobile-First."
    ],
    examples: [
          {
                "stdin": "375\n768\n1280\n1920",
                "expected": "VIEWPORT: 375px -> APPAREIL: MOBILE | GRILLE: 4 colonnes | LAYOUT: Colonne_Unique\nVIEWPORT: 768px -> APPAREIL: TABLETTE | GRILLE: 8 colonnes | LAYOUT: Deux_Colonnes\nVIEWPORT: 1280px -> APPAREIL: DESKTOP | GRILLE: 12 colonnes | LAYOUT: Trois_Colonnes\nVIEWPORT: 1920px -> APPAREIL: LARGE_DESKTOP | GRILLE: 12 colonnes | LAYOUT: Grille_Quatre_Colonnes_Centree",
                "note": "Traversée des 4 grands breakpoints du responsive web design."
          }
    ],
    tests: [
          {
                "label": "Frontières exactes 640, 1024 et 1440",
                "stdin": "cas:1",
                "expected": "VIEWPORT: 639px -> APPAREIL: MOBILE | GRILLE: 4 colonnes | LAYOUT: Colonne_Unique\nVIEWPORT: 640px -> APPAREIL: TABLETTE | GRILLE: 8 colonnes | LAYOUT: Deux_Colonnes\nVIEWPORT: 1023px -> APPAREIL: TABLETTE | GRILLE: 8 colonnes | LAYOUT: Deux_Colonnes\nVIEWPORT: 1024px -> APPAREIL: DESKTOP | GRILLE: 12 colonnes | LAYOUT: Trois_Colonnes\nVIEWPORT: 1439px -> APPAREIL: DESKTOP | GRILLE: 12 colonnes | LAYOUT: Trois_Colonnes\nVIEWPORT: 1440px -> APPAREIL: LARGE_DESKTOP | GRILLE: 12 colonnes | LAYOUT: Grille_Quatre_Colonnes_Centree"
          },
          {
                "label": "Petits mobiles (iPhone SE / Android compact)",
                "stdin": "cas:2",
                "expected": "VIEWPORT: 320px -> APPAREIL: MOBILE | GRILLE: 4 colonnes | LAYOUT: Colonne_Unique\nVIEWPORT: 390px -> APPAREIL: MOBILE | GRILLE: 4 colonnes | LAYOUT: Colonne_Unique\nVIEWPORT: 414px -> APPAREIL: MOBILE | GRILLE: 4 colonnes | LAYOUT: Colonne_Unique"
          },
          {
                "label": "Grands écrans 4K et Ultra-Wide",
                "stdin": "cas:3",
                "expected": "VIEWPORT: 2560px -> APPAREIL: LARGE_DESKTOP | GRILLE: 12 colonnes | LAYOUT: Grille_Quatre_Colonnes_Centree\nVIEWPORT: 3840px -> APPAREIL: LARGE_DESKTOP | GRILLE: 12 colonnes | LAYOUT: Grille_Quatre_Colonnes_Centree"
          },
          {
                "label": "Tablette format portrait et paysage",
                "stdin": "cas:4",
                "expected": "VIEWPORT: 800px -> APPAREIL: TABLETTE | GRILLE: 8 colonnes | LAYOUT: Deux_Colonnes\nVIEWPORT: 1000px -> APPAREIL: TABLETTE | GRILLE: 8 colonnes | LAYOUT: Deux_Colonnes"
          }
    ],
    solution: "[Exemple]\nVIEWPORT: 375px -> APPAREIL: MOBILE | GRILLE: 4 colonnes | LAYOUT: Colonne_Unique\nVIEWPORT: 768px -> APPAREIL: TABLETTE | GRILLE: 8 colonnes | LAYOUT: Deux_Colonnes\nVIEWPORT: 1280px -> APPAREIL: DESKTOP | GRILLE: 12 colonnes | LAYOUT: Trois_Colonnes\nVIEWPORT: 1920px -> APPAREIL: LARGE_DESKTOP | GRILLE: 12 colonnes | LAYOUT: Grille_Quatre_Colonnes_Centree\n\n[Cas 1 — Frontières exactes 640, 1024 et 1440]\nVIEWPORT: 639px -> APPAREIL: MOBILE | GRILLE: 4 colonnes | LAYOUT: Colonne_Unique\nVIEWPORT: 640px -> APPAREIL: TABLETTE | GRILLE: 8 colonnes | LAYOUT: Deux_Colonnes\nVIEWPORT: 1023px -> APPAREIL: TABLETTE | GRILLE: 8 colonnes | LAYOUT: Deux_Colonnes\nVIEWPORT: 1024px -> APPAREIL: DESKTOP | GRILLE: 12 colonnes | LAYOUT: Trois_Colonnes\nVIEWPORT: 1439px -> APPAREIL: DESKTOP | GRILLE: 12 colonnes | LAYOUT: Trois_Colonnes\nVIEWPORT: 1440px -> APPAREIL: LARGE_DESKTOP | GRILLE: 12 colonnes | LAYOUT: Grille_Quatre_Colonnes_Centree\n\n[Cas 2 — Petits mobiles (iPhone SE / Android compact)]\nVIEWPORT: 320px -> APPAREIL: MOBILE | GRILLE: 4 colonnes | LAYOUT: Colonne_Unique\nVIEWPORT: 390px -> APPAREIL: MOBILE | GRILLE: 4 colonnes | LAYOUT: Colonne_Unique\nVIEWPORT: 414px -> APPAREIL: MOBILE | GRILLE: 4 colonnes | LAYOUT: Colonne_Unique\n\n[Cas 3 — Grands écrans 4K et Ultra-Wide]\nVIEWPORT: 2560px -> APPAREIL: LARGE_DESKTOP | GRILLE: 12 colonnes | LAYOUT: Grille_Quatre_Colonnes_Centree\nVIEWPORT: 3840px -> APPAREIL: LARGE_DESKTOP | GRILLE: 12 colonnes | LAYOUT: Grille_Quatre_Colonnes_Centree\n\n[Cas 4 — Tablette format portrait et paysage]\nVIEWPORT: 800px -> APPAREIL: TABLETTE | GRILLE: 8 colonnes | LAYOUT: Deux_Colonnes\nVIEWPORT: 1000px -> APPAREIL: TABLETTE | GRILLE: 8 colonnes | LAYOUT: Deux_Colonnes\n"
  },
  {
    id: "ux2-c5-e2",
    chapter: 5,
    level: "n2",
    language: 'analyse',
    title: "Audit de dimension des cibles tactiles (Touch Target)",
    goal: "Vérifier la conformité des boutons selon le critère WCAG 2.5.5 / Android (taille minimale recommandée de 48x48 px).",
    brief: "<p>Pour chaque cas d’application des lignes au format <code>&lt;NomBouton&gt; &lt;Largeur&gt; &lt;Hauteur&gt;</code> (en pixels entiers).<br>\nLa norme d'accessibilité ergonomique recommande au moins <strong>48 px</strong> de largeur et de hauteur pour éviter les erreurs de frappe (fat finger problem).<br>\n- Si <code>Largeur &gt;= 48</code> ET <code>Hauteur &gt;= 48</code> : afficher<br>\n<code>&lt;NomBouton&gt; [&lt;L&gt;x&lt;H&gt;] -&gt; CONFORME (Surface tactile suffisante)</code><br>\n- Sinon : calculer le déficit sur chaque axe (<code>dL = max(0, 48 - L)</code> et <code>dH = max(0, 48 - H)</code>) et afficher :<br>\n<code>&lt;NomBouton&gt; [&lt;L&gt;x&lt;H&gt;] -&gt; NON_CONFORME (Ecart: -&lt;dL&gt;px largeur, -&lt;dH&gt;px hauteur)</code></p>",
    starter: "# Grille d'analyse (ux2-c5-e2) — Audit de dimension des cibles tactiles (Touch Target)\n# Complétez la réponse attendue sous chaque cas ci-dessous :\n\n[Cas 1 — Composants conformes généreux]\n# Données : BoutonAchat 200 56\n# Données : BoutonMenu 50 50\nA_COMPLETER\n\n[Cas 2 — Éléments sous-dimensionnés critiques]\n# Données : CocheCheckbox 16 16\n# Données : LienMiniature 30 40\nA_COMPLETER\n\n[Cas 3 — Largeur conforme mais hauteur insuffisante]\n# Données : BandeauCookies 320 20\nA_COMPLETER\n\n[Cas 4 — Hauteur conforme mais largeur insuffisante]\n# Données : BoutonVertical 20 60\nA_COMPLETER\n",
    hints: [
          "Si un axe est déjà >= 48px, son écart est de 0px.",
          "Conserver le format exact des sorties."
    ],
    examples: [
          {
                "stdin": "BoutonValider 48 48\nIconeFermer 24 24\nBoutonLien 120 32",
                "expected": "BoutonValider [48x48] -> CONFORME (Surface tactile suffisante)\nIconeFermer [24x24] -> NON_CONFORME (Ecart: -24px largeur, -24px hauteur)\nBoutonLien [120x32] -> NON_CONFORME (Ecart: -0px largeur, -16px hauteur)",
                "note": "BoutonLien est assez large mais trop fin verticalement."
          }
    ],
    tests: [
          {
                "label": "Composants conformes généreux",
                "stdin": "cas:1",
                "expected": "BoutonAchat [200x56] -> CONFORME (Surface tactile suffisante)\nBoutonMenu [50x50] -> CONFORME (Surface tactile suffisante)"
          },
          {
                "label": "Éléments sous-dimensionnés critiques",
                "stdin": "cas:2",
                "expected": "CocheCheckbox [16x16] -> NON_CONFORME (Ecart: -32px largeur, -32px hauteur)\nLienMiniature [30x40] -> NON_CONFORME (Ecart: -18px largeur, -8px hauteur)"
          },
          {
                "label": "Largeur conforme mais hauteur insuffisante",
                "stdin": "cas:3",
                "expected": "BandeauCookies [320x20] -> NON_CONFORME (Ecart: -0px largeur, -28px hauteur)"
          },
          {
                "label": "Hauteur conforme mais largeur insuffisante",
                "stdin": "cas:4",
                "expected": "BoutonVertical [20x60] -> NON_CONFORME (Ecart: -28px largeur, -0px hauteur)"
          }
    ],
    solution: "[Exemple]\nBoutonValider [48x48] -> CONFORME (Surface tactile suffisante)\nIconeFermer [24x24] -> NON_CONFORME (Ecart: -24px largeur, -24px hauteur)\nBoutonLien [120x32] -> NON_CONFORME (Ecart: -0px largeur, -16px hauteur)\n\n[Cas 1 — Composants conformes généreux]\nBoutonAchat [200x56] -> CONFORME (Surface tactile suffisante)\nBoutonMenu [50x50] -> CONFORME (Surface tactile suffisante)\n\n[Cas 2 — Éléments sous-dimensionnés critiques]\nCocheCheckbox [16x16] -> NON_CONFORME (Ecart: -32px largeur, -32px hauteur)\nLienMiniature [30x40] -> NON_CONFORME (Ecart: -18px largeur, -8px hauteur)\n\n[Cas 3 — Largeur conforme mais hauteur insuffisante]\nBandeauCookies [320x20] -> NON_CONFORME (Ecart: -0px largeur, -28px hauteur)\n\n[Cas 4 — Hauteur conforme mais largeur insuffisante]\nBoutonVertical [20x60] -> NON_CONFORME (Ecart: -28px largeur, -0px hauteur)\n"
  },
  {
    id: "ux2-c5-e3",
    chapter: 5,
    level: "n3",
    language: 'analyse',
    title: "Analyseur de zone du pouce mobile (Thumb Zone)",
    goal: "Évaluer la facilité d’accès à une main d’une action interactive sur un écran mobile 390x844 px selon Steven Hoober.",
    brief: "<p>Pour chaque cas d’application des lignes au format <code>&lt;NomAction&gt; &lt;X&gt; &lt;Y&gt;</code>.<br>\nSur un écran mobile de référence de <code>390px</code> de large et <code>844px</code> de haut :<br>\n- <strong>ZONE_NATURELLE (Confort maximal)</strong> : <code>Y compris entre 450 et 750</code> ET <code>X compris entre 40 et 350</code>.<br>\n- <strong>ZONE_DIFFICILE (Inaccessible à une main)</strong> : <code>Y &lt; 250</code>.<br>\n- <strong>ZONE_ETIREE (Effort modéré)</strong> : tous les autres cas situés dans l'écran.<br>\nPour chaque ligne, afficher :<br>\n<code>&lt;NomAction&gt; (&lt;X&gt;, &lt;Y&gt;) -&gt; &lt;ZONE_NATURELLE | ZONE_ETIREE | ZONE_DIFFICILE&gt;</code></p>",
    starter: "# Grille d'analyse (ux2-c5-e3) — Analyseur de zone du pouce mobile (Thumb Zone)\n# Complétez la réponse attendue sous chaque cas ci-dessous :\n\n[Cas 1 — Actions de barre inférieure de navigation (Tab Bar)]\n# Données : TabAccueil 100 700\n# Données : TabProfil 300 720\nA_COMPLETER\n\n[Cas 2 — En-têtes et boutons de navigation supérieure]\n# Données : BoutonRetour 20 80\n# Données : TitrePage 195 100\n# Données : BoutonFiltre 350 150\nA_COMPLETER\n\n[Cas 3 — Bordures extrêmes et zone étirée]\n# Données : BoutonFlottant 20 600\n# Données : ActionBasse 195 800\n# Données : ActionMilieu 195 380\nA_COMPLETER\n\n[Cas 4 — Limites exactes]\n# Données : PointA 40 450\n# Données : PointB 350 750\n# Données : PointHaut 195 249\nA_COMPLETER\n",
    hints: [
          "Tester d'abord la ZONE_DIFFICILE (Y < 250).",
          "Tester ensuite la ZONE_NATURELLE (450 <= Y <= 750 et 40 <= X <= 350)."
    ],
    examples: [
          {
                "stdin": "BoutonValiderPanier 195 600\nMenuBurger 30 60\nChampNom 200 350",
                "expected": "BoutonValiderPanier (195, 600) -> ZONE_NATURELLE\nMenuBurger (30, 60) -> ZONE_DIFFICILE\nChampNom (200, 350) -> ZONE_ETIREE",
                "note": "Le CTA principal en bas est en zone naturelle ; le burger en haut à gauche est en zone difficile."
          }
    ],
    tests: [
          {
                "label": "Actions de barre inférieure de navigation (Tab Bar)",
                "stdin": "cas:1",
                "expected": "TabAccueil (100, 700) -> ZONE_NATURELLE\nTabProfil (300, 720) -> ZONE_NATURELLE"
          },
          {
                "label": "En-têtes et boutons de navigation supérieure",
                "stdin": "cas:2",
                "expected": "BoutonRetour (20, 80) -> ZONE_DIFFICILE\nTitrePage (195, 100) -> ZONE_DIFFICILE\nBoutonFiltre (350, 150) -> ZONE_DIFFICILE"
          },
          {
                "label": "Bordures extrêmes et zone étirée",
                "stdin": "cas:3",
                "expected": "BoutonFlottant (20, 600) -> ZONE_ETIREE\nActionBasse (195, 800) -> ZONE_ETIREE\nActionMilieu (195, 380) -> ZONE_ETIREE"
          },
          {
                "label": "Limites exactes",
                "stdin": "cas:4",
                "expected": "PointA (40, 450) -> ZONE_NATURELLE\nPointB (350, 750) -> ZONE_NATURELLE\nPointHaut (195, 249) -> ZONE_DIFFICILE"
          }
    ],
    solution: "[Exemple]\nBoutonValiderPanier (195, 600) -> ZONE_NATURELLE\nMenuBurger (30, 60) -> ZONE_DIFFICILE\nChampNom (200, 350) -> ZONE_ETIREE\n\n[Cas 1 — Actions de barre inférieure de navigation (Tab Bar)]\nTabAccueil (100, 700) -> ZONE_NATURELLE\nTabProfil (300, 720) -> ZONE_NATURELLE\n\n[Cas 2 — En-têtes et boutons de navigation supérieure]\nBoutonRetour (20, 80) -> ZONE_DIFFICILE\nTitrePage (195, 100) -> ZONE_DIFFICILE\nBoutonFiltre (350, 150) -> ZONE_DIFFICILE\n\n[Cas 3 — Bordures extrêmes et zone étirée]\nBoutonFlottant (20, 600) -> ZONE_ETIREE\nActionBasse (195, 800) -> ZONE_ETIREE\nActionMilieu (195, 380) -> ZONE_ETIREE\n\n[Cas 4 — Limites exactes]\nPointA (40, 450) -> ZONE_NATURELLE\nPointB (350, 750) -> ZONE_NATURELLE\nPointHaut (195, 249) -> ZONE_DIFFICILE\n"
  }
];

/**
 * chapitre3.js — Études de cas du cours « droit ».
 * Mode d'évaluation conceptuelle structurée (language: 'analyse').
 */
'use strict';

module.exports = [
  {
    id: "dr2-c3-e1",
    chapter: 3,
    level: "n2",
    language: 'analyse',
    title: "Enjeux de l'affaire Cambridge Analytica",
    goal: "Repérer, dans une liste de griefs, ceux qui constituent de vrais enjeux juridiques.",
    brief: "<p>Pour chaque situation proposée : <code>una</code> (utilisation non autorisée des données), <code>mp</code> (manipulation électorale par profilage), <code>tc</code> (non-respect de la transparence et du consentement) ou <code>au</code> (autre grief). Pour chaque situation, indiquez <code>libelle : oui</code> si le grief est un enjeu juridique (una, mp, tc), <code>libelle : non</code> sinon. Enfin <code>enjeux : X/n</code>.</p>",
    starter: "# Grille d'analyse (dr2-c3-e1) — Enjeux de l'affaire Cambridge Analytica\n# Complétez la réponse attendue sous chaque cas ci-dessous :\n\n[Cas 1 — Un seul enjeu]\n# Données : mp profilage psychologique\nA_COMPLETER\n\n[Cas 2 — Aucun enjeu]\n# Données : au retard de livraison\n# Données : au budget depasse\nA_COMPLETER\n\n[Cas 3 — Quatre griefs]\n# Données : una donnees detournees\n# Données : tc consentement absent\n# Données : au design du site\n# Données : mp manipulation electorale\nA_COMPLETER\n",
    hints: [
          "Trois codes constituent un enjeu : una, mp, tc.",
          "Les autres griefs sont sans portée juridique directe."
    ],
    examples: [
          {
                "stdin": "2\nuna usage non autorise\nau couleur du logo\n",
                "expected": "usage non autorise : oui\ncouleur du logo : non\nenjeux : 1/2"
          }
    ],
    tests: [
          {
                "label": "Un seul enjeu",
                "stdin": "cas:1",
                "expected": "profilage psychologique : oui\nenjeux : 1/1"
          },
          {
                "label": "Aucun enjeu",
                "stdin": "cas:2",
                "expected": "retard de livraison : non\nbudget depasse : non\nenjeux : 0/2"
          },
          {
                "label": "Quatre griefs",
                "stdin": "cas:3",
                "expected": "donnees detournees : oui\nconsentement absent : oui\ndesign du site : non\nmanipulation electorale : oui\nenjeux : 3/4"
          }
    ],
    solution: "[Exemple]\nusage non autorise : oui\ncouleur du logo : non\nenjeux : 1/2\n\n[Cas 1 — Un seul enjeu]\nprofilage psychologique : oui\nenjeux : 1/1\n\n[Cas 2 — Aucun enjeu]\nretard de livraison : non\nbudget depasse : non\nenjeux : 0/2\n\n[Cas 3 — Quatre griefs]\ndonnees detournees : oui\nconsentement absent : oui\ndesign du site : non\nmanipulation electorale : oui\nenjeux : 3/4\n"
  },
  {
    id: "dr2-c3-e2",
    chapter: 3,
    level: "n1",
    language: 'analyse',
    title: "Contenus numériques à réguler",
    goal: "Trier des contenus problématiques et établir le bilan par catégorie.",
    brief: "<p>Pour chaque situation proposée : <code>hai</code> (discours de haine), <code>des</code> (désinformation) ou <code>dif</code> (diffamation). Pour chaque situation, indiquez <code>libelle : haine</code>, <code>libelle : desinformation</code> ou <code>libelle : diffamation</code>. Enfin <code>bilan : X haine / Y desinformation / Z diffamation</code>.</p>",
    starter: "# Grille d'analyse (dr2-c3-e2) — Contenus numériques à réguler\n# Complétez la réponse attendue sous chaque cas ci-dessous :\n\n[Cas 1 — Une désinformation]\n# Données : des fausse nouvelle\nA_COMPLETER\n\n[Cas 2 — Trois haines]\n# Données : hai insulte\n# Données : hai menace\n# Données : hai harcelement\nA_COMPLETER\n\n[Cas 3 — Quatre contenus mixtes]\n# Données : hai attaque\n# Données : des intox\n# Données : dif rumeur\n# Données : hai menace\nA_COMPLETER\n",
    hints: [
          "Trois compteurs distincts, un par catégorie.",
          "Le bilan reproduit exactement l'ordre « haine / desinformation / diffamation »."
    ],
    examples: [
          {
                "stdin": "2\nhai propos violents\ndif accusation fausse\n",
                "expected": "propos violents : haine\naccusation fausse : diffamation\nbilan : 1 haine / 0 desinformation / 1 diffamation"
          }
    ],
    tests: [
          {
                "label": "Une désinformation",
                "stdin": "cas:1",
                "expected": "fausse nouvelle : desinformation\nbilan : 0 haine / 1 desinformation / 0 diffamation"
          },
          {
                "label": "Trois haines",
                "stdin": "cas:2",
                "expected": "insulte : haine\nmenace : haine\nharcelement : haine\nbilan : 3 haine / 0 desinformation / 0 diffamation"
          },
          {
                "label": "Quatre contenus mixtes",
                "stdin": "cas:3",
                "expected": "attaque : haine\nintox : desinformation\nrumeur : diffamation\nmenace : haine\nbilan : 2 haine / 1 desinformation / 1 diffamation"
          }
    ],
    solution: "[Exemple]\npropos violents : haine\naccusation fausse : diffamation\nbilan : 1 haine / 0 desinformation / 1 diffamation\n\n[Cas 1 — Une désinformation]\nfausse nouvelle : desinformation\nbilan : 0 haine / 1 desinformation / 0 diffamation\n\n[Cas 2 — Trois haines]\ninsulte : haine\nmenace : haine\nharcelement : haine\nbilan : 3 haine / 0 desinformation / 0 diffamation\n\n[Cas 3 — Quatre contenus mixtes]\nattaque : haine\nintox : desinformation\nrumeur : diffamation\nmenace : haine\nbilan : 2 haine / 1 desinformation / 1 diffamation\n"
  },
  {
    id: "dr2-c3-e3",
    chapter: 3,
    level: "n2",
    language: 'analyse',
    title: "Addictions numériques",
    goal: "Identifier les manifestations d'addiction évoquées par le cours et en faire le compte.",
    brief: "<p>Pour chaque situation proposée : <code>nomo</code> (nomophobie), <code>selfi</code> (selfitisme), <code>fomo</code> (peur de rater une information) ou <code>vibr</code> (syndrome des vibrations fantômes). Tout autre code est <code>autre</code>. Pour chaque situation, indiquez <code>libelle : addiction</code> ou <code>libelle : autre</code>. Enfin <code>addictions : X/n</code>.</p>",
    starter: "# Grille d'analyse (dr2-c3-e3) — Addictions numériques\n# Complétez la réponse attendue sous chaque cas ci-dessous :\n\n[Cas 1 — Un syndrome]\n# Données : vibr telephone qui vibre sans raison\nA_COMPLETER\n\n[Cas 2 — Aucune addiction]\n# Données : autre sport\n# Données : autre cuisine\nA_COMPLETER\n\n[Cas 3 — Cinq usages]\n# Données : nomo peur sans telephone\n# Données : selfi culte de soi\n# Données : autre jardinage\n# Données : vibr fausse vibration\n# Données : fomo peur de rater\nA_COMPLETER\n",
    hints: [
          "Quatre codes décrivent une addiction : nomo, selfi, fomo, vibr.",
          "Le case avec plusieurs motifs « a|b|c » traite plusieurs codes à la fois."
    ],
    examples: [
          {
                "stdin": "2\nfomo besoin de surveiller\nautre lecture papier\n",
                "expected": "besoin de surveiller : addiction\nlecture papier : autre\naddictions : 1/2"
          }
    ],
    tests: [
          {
                "label": "Un syndrome",
                "stdin": "cas:1",
                "expected": "telephone qui vibre sans raison : addiction\naddictions : 1/1"
          },
          {
                "label": "Aucune addiction",
                "stdin": "cas:2",
                "expected": "sport : autre\ncuisine : autre\naddictions : 0/2"
          },
          {
                "label": "Cinq usages",
                "stdin": "cas:3",
                "expected": "peur sans telephone : addiction\nculte de soi : addiction\njardinage : autre\nfausse vibration : addiction\npeur de rater : addiction\naddictions : 4/5"
          }
    ],
    solution: "[Exemple]\nbesoin de surveiller : addiction\nlecture papier : autre\naddictions : 1/2\n\n[Cas 1 — Un syndrome]\ntelephone qui vibre sans raison : addiction\naddictions : 1/1\n\n[Cas 2 — Aucune addiction]\nsport : autre\ncuisine : autre\naddictions : 0/2\n\n[Cas 3 — Cinq usages]\npeur sans telephone : addiction\nculte de soi : addiction\njardinage : autre\nfausse vibration : addiction\npeur de rater : addiction\naddictions : 4/5\n"
  }
];

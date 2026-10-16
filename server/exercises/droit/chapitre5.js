/**
 * chapitre5.js — Études de cas du cours « droit ».
 * Mode d'évaluation conceptuelle structurée (language: 'analyse').
 */
'use strict';

module.exports = [
  {
    id: "dr2-c5-e1",
    chapter: 5,
    level: "n2",
    language: 'analyse',
    title: "Conformité d'un traitement",
    goal: "Confronter un traitement aux trois principes clés du RGPD et rendre un verdict.",
    brief: "<p>L’analyse porte sur <strong>une ligne</strong> de trois valeurs « consentement finalite minimisation » valant chacune <code>oui</code> ou <code>non</code>. Pour chaque principe Indiquez <code>principe : ok</code> si la valeur vaut oui, <code>principe : manquant</code> sinon, dans l'ordre consentement, finalite, minimisation. Concluez par <code>verdict : conforme</code> si les trois principes sont respectés, <code>verdict : non conforme</code> sinon.</p>",
    starter: "# Grille d'analyse (dr2-c5-e1) — Conformité d'un traitement\n# Complétez la réponse attendue sous chaque cas ci-dessous :\n\n[Cas 1 — Consentement manquant]\n# Données : non oui oui\nA_COMPLETER\n\n[Cas 2 — Minimisation manquante]\n# Données : oui oui non\nA_COMPLETER\n\n[Cas 3 — Tout manquant]\n# Données : non non non\nA_COMPLETER\n",
    hints: [
          "Le verdict global n'est « conforme » que si les trois valeurs valent oui.",
          "Affichez chaque principe avant le verdict ; trois tests simples suffisent."
    ],
    examples: [
          {
                "stdin": "oui oui oui\n",
                "expected": "consentement : ok\nfinalite : ok\nminimisation : ok\nverdict : conforme"
          }
    ],
    tests: [
          {
                "label": "Consentement manquant",
                "stdin": "cas:1",
                "expected": "consentement : manquant\nfinalite : ok\nminimisation : ok\nverdict : non conforme"
          },
          {
                "label": "Minimisation manquante",
                "stdin": "cas:2",
                "expected": "consentement : ok\nfinalite : ok\nminimisation : manquant\nverdict : non conforme"
          },
          {
                "label": "Tout manquant",
                "stdin": "cas:3",
                "expected": "consentement : manquant\nfinalite : manquant\nminimisation : manquant\nverdict : non conforme"
          }
    ],
    solution: "[Exemple]\nconsentement : ok\nfinalite : ok\nminimisation : ok\nverdict : conforme\n\n[Cas 1 — Consentement manquant]\nconsentement : manquant\nfinalite : ok\nminimisation : ok\nverdict : non conforme\n\n[Cas 2 — Minimisation manquante]\nconsentement : ok\nfinalite : ok\nminimisation : manquant\nverdict : non conforme\n\n[Cas 3 — Tout manquant]\nconsentement : manquant\nfinalite : manquant\nminimisation : manquant\nverdict : non conforme\n"
  },
  {
    id: "dr2-c5-e2",
    chapter: 5,
    level: "n2",
    language: 'analyse',
    title: "Sanction RGPD (Europe)",
    goal: "Calculer la sanction applicable, la plus lourde étant retenue entre le montant fixe et le pourcentage.",
    brief: "<p>L’analyse porte sur le <strong>chiffre d'affaires annuel</strong> (en euros, nombre entier). En Europe, la sanction retenue est la plus lourde entre <strong>20 000 000 d'euros</strong> et <strong>4 % du chiffre d'affaires</strong>. Affichez <code>sanction : X</code> où X est le montant retenu.</p>",
    starter: "# Grille d'analyse (dr2-c5-e2) — Sanction RGPD (Europe)\n# Complétez la réponse attendue sous chaque cas ci-dessous :\n\n[Cas 1 — Petit chiffre d'affaires]\n# Données : 100000000\nA_COMPLETER\n\n[Cas 2 — Égalité exacte]\n# Données : 500000000\nA_COMPLETER\n\n[Cas 3 — Grand chiffre d'affaires]\n# Données : 2000000000\nA_COMPLETER\n",
    hints: [
          "Le montant fixe vaut 20000000 ; le pourcentage vaut chiffre * 4 / 100.",
          "Utilisez un if pour retenir le plus grand des deux."
    ],
    examples: [
          {
                "stdin": "600000000\n",
                "expected": "sanction : 24000000",
                "note": "4 % de 600 000 000 = 24 000 000, plus lourd que 20 000 000."
          }
    ],
    tests: [
          {
                "label": "Petit chiffre d'affaires",
                "stdin": "cas:1",
                "expected": "sanction : 20000000"
          },
          {
                "label": "Égalité exacte",
                "stdin": "cas:2",
                "expected": "sanction : 20000000"
          },
          {
                "label": "Grand chiffre d'affaires",
                "stdin": "cas:3",
                "expected": "sanction : 80000000"
          }
    ],
    solution: "[Exemple]\nsanction : 24000000\n\n[Cas 1 — Petit chiffre d'affaires]\nsanction : 20000000\n\n[Cas 2 — Égalité exacte]\nsanction : 20000000\n\n[Cas 3 — Grand chiffre d'affaires]\nsanction : 80000000\n"
  },
  {
    id: "dr2-c5-e3",
    chapter: 5,
    level: "n1",
    language: 'analyse',
    title: "Droits des personnes concernées",
    goal: "Reconnaître les droits d'accès, de rectification et de suppression, puis compter.",
    brief: "<p>Pour chaque situation proposée : <code>acces</code> (droit d'accès), <code>rectif</code> (droit de rectification), <code>suppr</code> (droit de suppression) ou <code>x</code> (autre). Pour chaque situation, indiquez <code>libelle : droit d acces</code>, <code>libelle : droit de rectification</code>, <code>libelle : droit de suppression</code> ou <code>libelle : inconnu</code>. Enfin <code>droits : X/n</code>.</p>",
    starter: "# Grille d'analyse (dr2-c5-e3) — Droits des personnes concernées\n# Complétez la réponse attendue sous chaque cas ci-dessous :\n\n[Cas 1 — Une rectification]\n# Données : rectif correction du nom\nA_COMPLETER\n\n[Cas 2 — Aucun droit]\n# Données : x achat de fournitures\n# Données : x reunion interne\nA_COMPLETER\n\n[Cas 3 — Quatre demandes]\n# Données : acces copie des donnees\n# Données : rectif mise a jour\n# Données : x badge perdu\n# Données : suppr effacement\nA_COMPLETER\n",
    hints: [
          "acces, rectif et suppr sont les trois droits ; x n'en est pas un.",
          "Un case à trois motifs reconnus et un cas par défaut « inconnu »."
    ],
    examples: [
          {
                "stdin": "2\nacces consultation du dossier\nx don de sang\n",
                "expected": "consultation du dossier : droit d acces\ndon de sang : inconnu\ndroits : 1/2"
          }
    ],
    tests: [
          {
                "label": "Une rectification",
                "stdin": "cas:1",
                "expected": "correction du nom : droit de rectification\ndroits : 1/1"
          },
          {
                "label": "Aucun droit",
                "stdin": "cas:2",
                "expected": "achat de fournitures : inconnu\nreunion interne : inconnu\ndroits : 0/2"
          },
          {
                "label": "Quatre demandes",
                "stdin": "cas:3",
                "expected": "copie des donnees : droit d acces\nmise a jour : droit de rectification\nbadge perdu : inconnu\neffacement : droit de suppression\ndroits : 3/4"
          }
    ],
    solution: "[Exemple]\nconsultation du dossier : droit d acces\ndon de sang : inconnu\ndroits : 1/2\n\n[Cas 1 — Une rectification]\ncorrection du nom : droit de rectification\ndroits : 1/1\n\n[Cas 2 — Aucun droit]\nachat de fournitures : inconnu\nreunion interne : inconnu\ndroits : 0/2\n\n[Cas 3 — Quatre demandes]\ncopie des donnees : droit d acces\nmise a jour : droit de rectification\nbadge perdu : inconnu\neffacement : droit de suppression\ndroits : 3/4\n"
  }
];

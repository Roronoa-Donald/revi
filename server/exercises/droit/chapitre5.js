/**
 * Chapitre 5 — Le RGPD et ses principes.
 *
 * Fiches exécutables en Bash (langage `shell`). Préfixe `dr2`.
 */
'use strict';

module.exports = [
  {
    id: 'dr2-c5-e1',
    chapter: 5,
    level: 'n2',
    language: 'shell',
    title: 'Conformité d\'un traitement',
    goal: 'Confronter un traitement aux trois principes clés du RGPD et rendre un verdict.',
    brief: '<p>Le script lit <strong>une ligne</strong> de trois valeurs « consentement finalite minimisation » ' +
      'valant chacune <code>oui</code> ou <code>non</code>. Pour chaque principe il affiche ' +
      '<code>principe : ok</code> si la valeur vaut oui, <code>principe : manquant</code> sinon, dans l\'ordre ' +
      'consentement, finalite, minimisation. Il termine par <code>verdict : conforme</code> si les trois ' +
      'principes sont respectés, <code>verdict : non conforme</code> sinon.</p>',
    starter: `read -r consentement finalite minimisation
# À compléter : rendre le verdict sur chaque principe, puis le verdict global.
`,
    hints: [
      'Le verdict global n\'est « conforme » que si les trois valeurs valent oui.',
      'Affichez chaque principe avant le verdict ; trois tests simples suffisent.'
    ],
    examples: [
      { stdin: 'oui oui oui\n', expected: 'consentement : ok\nfinalite : ok\nminimisation : ok\nverdict : conforme' }
    ],
    tests: [
      { label: 'Consentement manquant', stdin: 'non oui oui\n', expected: 'consentement : manquant\nfinalite : ok\nminimisation : ok\nverdict : non conforme' },
      { label: 'Minimisation manquante', stdin: 'oui oui non\n', expected: 'consentement : ok\nfinalite : ok\nminimisation : manquant\nverdict : non conforme' },
      { label: 'Tout manquant', stdin: 'non non non\n', expected: 'consentement : manquant\nfinalite : manquant\nminimisation : manquant\nverdict : non conforme' }
    ],
    solution: `read -r consentement finalite minimisation
ok=1
if [ "$consentement" = "oui" ]; then echo "consentement : ok"; else echo "consentement : manquant"; ok=0; fi
if [ "$finalite" = "oui" ]; then echo "finalite : ok"; else echo "finalite : manquant"; ok=0; fi
if [ "$minimisation" = "oui" ]; then echo "minimisation : ok"; else echo "minimisation : manquant"; ok=0; fi
if [ "$ok" = "1" ]; then
  echo "verdict : conforme"
else
  echo "verdict : non conforme"
fi
`
  },
  {
    id: 'dr2-c5-e2',
    chapter: 5,
    level: 'n2',
    language: 'shell',
    title: 'Sanction RGPD (Europe)',
    goal: 'Calculer la sanction applicable, la plus lourde étant retenue entre le montant fixe et le pourcentage.',
    brief: '<p>Le script lit le <strong>chiffre d\'affaires annuel</strong> (en euros, nombre entier). En Europe, ' +
      'la sanction retenue est la plus lourde entre <strong>20 000 000 d\'euros</strong> et <strong>4 % du ' +
      'chiffre d\'affaires</strong>. Affichez <code>sanction : X</code> où X est le montant retenu.</p>',
    starter: `read -r chiffre
quatre_pourcent=$((chiffre * 4 / 100))
# À compléter : comparer les deux montants et afficher le plus grand.
`,
    hints: [
      'Le montant fixe vaut 20000000 ; le pourcentage vaut chiffre * 4 / 100.',
      'Utilisez un if pour retenir le plus grand des deux.'
    ],
    examples: [
      { stdin: '600000000\n', expected: 'sanction : 24000000', note: '4 % de 600 000 000 = 24 000 000, plus lourd que 20 000 000.' }
    ],
    tests: [
      { label: 'Petit chiffre d\'affaires', stdin: '100000000\n', expected: 'sanction : 20000000' },
      { label: 'Égalité exacte', stdin: '500000000\n', expected: 'sanction : 20000000' },
      { label: 'Grand chiffre d\'affaires', stdin: '2000000000\n', expected: 'sanction : 80000000' }
    ],
    solution: `read -r chiffre
fixe=20000000
pourcent=$((chiffre * 4 / 100))
if [ "$pourcent" -gt "$fixe" ]; then
  echo "sanction : $pourcent"
else
  echo "sanction : $fixe"
fi
`
  },
  {
    id: 'dr2-c5-e3',
    chapter: 5,
    level: 'n1',
    language: 'shell',
    title: 'Droits des personnes concernées',
    goal: 'Reconnaître les droits d\'accès, de rectification et de suppression, puis compter.',
    brief: '<p>Le script lit <strong>n lignes</strong> « code libelle ». Le code vaut : <code>acces</code> ' +
      '(droit d\'accès), <code>rectif</code> (droit de rectification), <code>suppr</code> (droit de suppression) ' +
      'ou <code>x</code> (autre). Pour chaque ligne il affiche <code>libelle : droit d acces</code>, ' +
      '<code>libelle : droit de rectification</code>, <code>libelle : droit de suppression</code> ou ' +
      '<code>libelle : inconnu</code>. Enfin <code>droits : X/n</code>.</p>',
    starter: `read -r n
droits=0
for ((i=0; i<n; i++)); do
  read -r code libelle
  # À compléter : reconnaître les trois droits, compter, sinon inconnu.
done
`,
    hints: [
      'acces, rectif et suppr sont les trois droits ; x n\'en est pas un.',
      'Un case à trois motifs reconnus et un cas par défaut « inconnu ».'
    ],
    examples: [
      { stdin: '2\nacces consultation du dossier\nx don de sang\n', expected: 'consultation du dossier : droit d acces\ndon de sang : inconnu\ndroits : 1/2' }
    ],
    tests: [
      { label: 'Une rectification', stdin: '1\nrectif correction du nom\n', expected: 'correction du nom : droit de rectification\ndroits : 1/1' },
      { label: 'Aucun droit', stdin: '2\nx achat de fournitures\nx reunion interne\n', expected: 'achat de fournitures : inconnu\nreunion interne : inconnu\ndroits : 0/2' },
      { label: 'Quatre demandes', stdin: '4\nacces copie des donnees\nrectif mise a jour\nx badge perdu\nsuppr effacement\n', expected: 'copie des donnees : droit d acces\nmise a jour : droit de rectification\nbadge perdu : inconnu\neffacement : droit de suppression\ndroits : 3/4' }
    ],
    solution: `read -r n
droits=0
for ((i=0; i<n; i++)); do
  read -r code libelle
  case "$code" in
    acces)
      echo "$libelle : droit d acces"
      droits=$((droits + 1))
      ;;
    rectif)
      echo "$libelle : droit de rectification"
      droits=$((droits + 1))
      ;;
    suppr)
      echo "$libelle : droit de suppression"
      droits=$((droits + 1))
      ;;
    *)
      echo "$libelle : inconnu"
      ;;
  esac
done
echo "droits : $droits/$n"
`
  }
];

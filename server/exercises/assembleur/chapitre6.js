'use strict';

module.exports = [
  {
    "id": "asm2-c6-e1",
    "chapter": 6,
    "title": "Simulateur de pile x86 (PUSH & POP avec pointeur ESP)",
    "level": "n1",
    "language": "analyse",
    "goal": "Simuler le fonctionnement de la pile d’exécution (LIFO) et le déplacement du pointeur ESP.",
    "brief": "<p>En architecture x86, la pile grandit vers les adresses basses :</p><ul>  <li><code>PUSH valeur</code> : décrémente <code>ESP</code> de 4 octets et écrit la valeur 32 bits au sommet de la pile ;</li>  <li><code>POP</code> : lit la valeur au sommet de la pile et incrémente <code>ESP</code> de 4 octets.</li></ul><p>Le pointeur <code>ESP</code> est initialisé à <code>0x1000</code> avec une pile vide. Analysez les paramètres du problème pour chaque cas. <code>PUSH 10, PUSH 20, POP, PUSH 30</code>). Indiquez l’état final de la pile au format :<br><code>ESP=0x&lt;4 chiffres HEX&gt; SOMMET=&lt;valeur ou VIDE&gt; TAILLE=&lt;nb_elements&gt;</code>.</p>",
    "starter": "# Grille d'analyse (asm2-c6-e1) — Simulateur de pile x86 (PUSH & POP avec pointeur ESP)\n# Complétez la résolution demandée sous chaque cas ci-dessous :\n\n[Cas 1 — Trois empilements successifs]\n# Données : PUSH 100, PUSH 200, PUSH 300\nA_COMPLETER\n\n[Cas 2 — Dépilement complet ramenant la pile à zéro]\n# Données : PUSH 42, POP\nA_COMPLETER\n\n[Cas 3 — Multiples push et pop alternés]\n# Données : PUSH 1, PUSH 2, POP, PUSH 3, PUSH 4, POP\nA_COMPLETER\n\n[Cas 4 — Un seul push]\n# Données : PUSH 999\nA_COMPLETER\n",
    "hints": [
      "Initialise esp = 0x1000 et stack = [].",
      "PUSH x : esp -= 4, stack.append(x).",
      "POP : esp += 4, stack.pop().",
      "Le sommet est stack[-1] si stack n’est pas vide, sinon \"VIDE\"."
    ],
    "examples": [
      {
        "stdin": "PUSH 10, PUSH 20, POP, PUSH 30",
        "expected": "ESP=0x0FF8 SOMMET=30 TAILLE=2",
        "note": "Après 2 push, 1 pop et 1 push, il reste 2 éléments (10 et 30). ESP = 0x1000 - 8 = 0x0FF8."
      }
    ],
    "tests": [
      {
        "label": "Trois empilements successifs",
        "stdin": "cas:1",
        "expected": "ESP=0x0FF4 SOMMET=300 TAILLE=3"
      },
      {
        "label": "Dépilement complet ramenant la pile à zéro",
        "stdin": "cas:2",
        "expected": "ESP=0x1000 SOMMET=VIDE TAILLE=0"
      },
      {
        "label": "Multiples push et pop alternés",
        "stdin": "cas:3",
        "expected": "ESP=0x0FF8 SOMMET=3 TAILLE=2"
      },
      {
        "label": "Un seul push",
        "stdin": "cas:4",
        "expected": "ESP=0x0FFC SOMMET=999 TAILLE=1"
      }
    ],
    "solution": "[Exemple]\nESP=0x0FF8 SOMMET=30 TAILLE=2\n\n[Cas 1 — Trois empilements successifs]\nESP=0x0FF4 SOMMET=300 TAILLE=3\n\n[Cas 2 — Dépilement complet ramenant la pile à zéro]\nESP=0x1000 SOMMET=VIDE TAILLE=0\n\n[Cas 3 — Multiples push et pop alternés]\nESP=0x0FF8 SOMMET=3 TAILLE=2\n\n[Cas 4 — Un seul push]\nESP=0x0FFC SOMMET=999 TAILLE=1"
  },
  {
    "id": "asm2-c6-e2",
    "chapter": 6,
    "title": "Évaluateur de sauts conditionnels x86 (CMP & Jcc)",
    "level": "n1",
    "language": "analyse",
    "goal": "Déterminer si un saut conditionnel x86 est franchi (pris) ou ignoré selon le résultat de CMP.",
    "brief": "<p>L’instruction <code>CMP A, B</code> compare deux opérandes en calculant $A - B$. L’instruction de branchement conditionnel suivante examine l’état des drapeaux :</p><ul>  <li><code>JE / JZ</code> : saute si $A = B$ ;</li>  <li><code>JNE / JNZ</code> : saute si $A \\neq B$ ;</li>  <li><code>JG</code> : saute si $A &gt; B$ (comparaison signée) ;</li>  <li><code>JL</code> : saute si $A &lt; B$ (comparaison signée) ;</li>  <li><code>JGE</code> : saute si $A \\ge B$ ;</li>  <li><code>JLE</code> : saute si $A \\le B$.</li></ul><p>Analysez les paramètres du problème pour chaque cas. Indiquez :<br><code>DECISION=&lt;PRIS|IGNORE&gt; COND=&lt;condition satisfaite ou non&gt;</code>.</p>",
    "starter": "# Grille d'analyse (asm2-c6-e2) — Évaluateur de sauts conditionnels x86 (CMP & Jcc)\n# Complétez la résolution demandée sous chaque cas ci-dessous :\n\n[Cas 1 — Saut d’égalité JE avec valeurs égales]\n# Données : 15;15;JE\nA_COMPLETER\n\n[Cas 2 — Saut d’égalité JE avec valeurs distinctes]\n# Données : 15;20;JE\nA_COMPLETER\n\n[Cas 3 — Saut JG avec premier opérande supérieur]\n# Données : 50;30;JG\nA_COMPLETER\n\n[Cas 4 — Saut JL avec premier opérande supérieur (saut non pris)]\n# Données : 50;30;JL\nA_COMPLETER\n",
    "hints": [
      "Compare A et B avec l’opérateur correspondant : JE (==), JNE (!=), JG (>), JL (<), JGE (>=), JLE (<=).",
      "Si la condition est vraie, DECISION=PRIS, sinon DECISION=IGNORE."
    ],
    "examples": [
      {
        "stdin": "10;20;JL",
        "expected": "DECISION=PRIS COND=10 < 20",
        "note": "10 est strictement inférieur à 20, le saut JL est franchi."
      }
    ],
    "tests": [
      {
        "label": "Saut d’égalité JE avec valeurs égales",
        "stdin": "cas:1",
        "expected": "DECISION=PRIS COND=15 == 15"
      },
      {
        "label": "Saut d’égalité JE avec valeurs distinctes",
        "stdin": "cas:2",
        "expected": "DECISION=IGNORE COND=15 != 20"
      },
      {
        "label": "Saut JG avec premier opérande supérieur",
        "stdin": "cas:3",
        "expected": "DECISION=PRIS COND=50 > 30"
      },
      {
        "label": "Saut JL avec premier opérande supérieur (saut non pris)",
        "stdin": "cas:4",
        "expected": "DECISION=IGNORE COND=50 >= 30"
      }
    ],
    "solution": "[Exemple]\nDECISION=PRIS COND=10 < 20\n\n[Cas 1 — Saut d’égalité JE avec valeurs égales]\nDECISION=PRIS COND=15 == 15\n\n[Cas 2 — Saut d’égalité JE avec valeurs distinctes]\nDECISION=IGNORE COND=15 != 20\n\n[Cas 3 — Saut JG avec premier opérande supérieur]\nDECISION=PRIS COND=50 > 30\n\n[Cas 4 — Saut JL avec premier opérande supérieur (saut non pris)]\nDECISION=IGNORE COND=50 >= 30"
  },
  {
    "id": "asm2-c6-e3",
    "chapter": 6,
    "title": "Modélisateur de cadre de pile (Stack Frame cdecl)",
    "level": "n2",
    "language": "analyse",
    "goal": "Construire les adresses relatives à EBP pour les arguments et variables locales selon la convention cdecl.",
    "brief": "<p>Sous la convention d’appel standard <code>cdecl</code> (32 bits), le prologue d’une fonction réserve de la place sur la pile et utilise <code>EBP</code> comme base fixe du cadre d’activation (Stack Frame) :</p><ul>  <li><code>[ebp+0]</code> : ancien EBP sauvegardé ;</li>  <li><code>[ebp+4]</code> : adresse de retour vers l’appelant ;</li>  <li><code>[ebp+8]</code>, <code>[ebp+12]</code>, etc. : arguments reçus (offset positif) ;</li>  <li><code>[ebp-4]</code>, <code>[ebp-8]</code>, etc. : variables locales allouées (offset négatif).</li></ul><p>Analysez les paramètres du problème pour chaque cas. Indiquez le résumé du cadre d’activation au format :<br><code>FRAME SUB_ESP=&lt;N&gt; ARG1=[ebp+8] ARGN=[ebp+&lt;offset&gt;] LOC1=[ebp-4] LOCN=[ebp-&lt;offset&gt;]</code> (si NB_ARGS ou NB_LOCALES vaut 0, indiquer <code>AUCUN</code> pour les champs correspondants).</p>",
    "starter": "# Grille d'analyse (asm2-c6-e3) — Modélisateur de cadre de pile (Stack Frame cdecl)\n# Complétez la résolution demandée sous chaque cas ci-dessous :\n\n[Cas 1 — Fonction avec 1 argument et 1 locale]\n# Données : 1;1\nA_COMPLETER\n\n[Cas 2 — Fonction sans argument (void f(void)) et 2 locales]\n# Données : 0;2\nA_COMPLETER\n\n[Cas 3 — Fonction sans variables locales (purement calculatoire)]\n# Données : 3;0\nA_COMPLETER\n\n[Cas 4 — Quatre arguments et quatre locales]\n# Données : 4;4\nA_COMPLETER\n",
    "hints": [
      "Chaque variable locale occupe 4 octets : sub_esp = nb_locales * 4.",
      "L’argument k est à [ebp+{4 + 4*k}]. Le premier est [ebp+8], le dernier [ebp+{4 + 4*nb_args}].",
      "La variable locale k est à [ebp-{4*k}]. La première est [ebp-4], la dernière [ebp-{4*nb_locales}]."
    ],
    "examples": [
      {
        "stdin": "2;3",
        "expected": "FRAME SUB_ESP=12 ARG1=[ebp+8] ARGN=[ebp+12] LOC1=[ebp-4] LOCN=[ebp-12]",
        "note": "2 arguments à [ebp+8] et [ebp+12], 3 locales occupant 12 octets de [ebp-4] à [ebp-12]."
      }
    ],
    "tests": [
      {
        "label": "Fonction avec 1 argument et 1 locale",
        "stdin": "cas:1",
        "expected": "FRAME SUB_ESP=4 ARG1=[ebp+8] ARGN=[ebp+8] LOC1=[ebp-4] LOCN=[ebp-4]"
      },
      {
        "label": "Fonction sans argument (void f(void)) et 2 locales",
        "stdin": "cas:2",
        "expected": "FRAME SUB_ESP=8 ARG1=AUCUN ARGN=AUCUN LOC1=[ebp-4] LOCN=[ebp-8]"
      },
      {
        "label": "Fonction sans variables locales (purement calculatoire)",
        "stdin": "cas:3",
        "expected": "FRAME SUB_ESP=0 ARG1=[ebp+8] ARGN=[ebp+16] LOC1=AUCUN LOCN=AUCUN"
      },
      {
        "label": "Quatre arguments et quatre locales",
        "stdin": "cas:4",
        "expected": "FRAME SUB_ESP=16 ARG1=[ebp+8] ARGN=[ebp+20] LOC1=[ebp-4] LOCN=[ebp-16]"
      }
    ],
    "solution": "[Exemple]\nFRAME SUB_ESP=12 ARG1=[ebp+8] ARGN=[ebp+12] LOC1=[ebp-4] LOCN=[ebp-12]\n\n[Cas 1 — Fonction avec 1 argument et 1 locale]\nFRAME SUB_ESP=4 ARG1=[ebp+8] ARGN=[ebp+8] LOC1=[ebp-4] LOCN=[ebp-4]\n\n[Cas 2 — Fonction sans argument (void f(void)) et 2 locales]\nFRAME SUB_ESP=8 ARG1=AUCUN ARGN=AUCUN LOC1=[ebp-4] LOCN=[ebp-8]\n\n[Cas 3 — Fonction sans variables locales (purement calculatoire)]\nFRAME SUB_ESP=0 ARG1=[ebp+8] ARGN=[ebp+16] LOC1=AUCUN LOCN=AUCUN\n\n[Cas 4 — Quatre arguments et quatre locales]\nFRAME SUB_ESP=16 ARG1=[ebp+8] ARGN=[ebp+20] LOC1=[ebp-4] LOCN=[ebp-16]"
  }
];

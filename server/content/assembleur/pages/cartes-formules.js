/**
 * Pages « cartes de révision » et « mémo » du cours « Assembleur » B2.
 */
'use strict';

const { crumb, cards } = require('../../../../scripts/course-kit');
const { chnav } = require('./helpers');

/* ======================== Cartes ======================== */

function cartes(course, chapterList) {
  const modules = chapterList.map(chapitre => ({
    title: 'Module ' + chapitre.n + ' — ' + chapitre.title,
    items: chapitre.flashcards
  }));

  const body = [
    crumb(course, [{ href: '../index.html', label: course.brand }, { href: '../sommaire.html', label: 'Sommaire' }, { label: 'Cartes' }]),
    '  <h1>Cartes de révision</h1>',
    '  <p class="lead">Cliquez sur une carte pour révéler la réponse. Objectif : répondre sans hésiter dans ' +
    'les deux sens pour ancrer durablement les concepts clés des registres, de la pile, des instructions et des architectures x86 et AVR.</p>',
    cards(modules),
    chnav({ href: '../sommaire.html', label: 'Sommaire' }, { href: 'formules.html', label: 'Mémo des instructions Assembleur' })
  ].join('\n\n');

  return {
    'chapitres/cartes.html': {
      title: 'Cartes de révision — ' + course.brand,
      description: 'Flashcards de révision du cours Architecture & Programmation en Assembleur B2 : notions clés des ' +
        chapterList.length + ' chapitres.',
      active: 'cartes',
      body
    }
  };
}

/* ======================== Mémo ======================== */

function formules(course) {
  const bloc = (titre, html) => '  <h2>' + titre + '</h2>\n' + html;

  const body = [
    crumb(course, [{ href: '../index.html', label: course.brand }, { href: '../sommaire.html', label: 'Sommaire' }, { label: 'Mémo' }]),
    '  <h1>Mémo synthétique d’Assembleur &amp; Architecture Machine</h1>',
    '  <p class="lead">Toutes les structures de registres, formules d’adressage, mnémoniques d’instructions, ' +
    'drapeaux EFLAGS et conventions d’appel réunies sur une seule page de référence.</p>',

    bloc('1. Hiérarchie des registres x86_64', [
      '<pre><code>// Registre 64 bits RAX et son découpage hiérarchique\n' +
      '+---------------------------------------------------------------+\n' +
      '| RAX (64 bits)                                                 |\n' +
      '+-------------------------------+-------------------------------+\n' +
      '                                | EAX (32 bits)                 |\n' +
      '                                +---------------+---------------+\n' +
      '                                                | AX (16 bits)  |\n' +
      '                                                +-------+-------+\n' +
      '                                                | AH(8) | AL(8) |\n' +
      '                                                +-------+-------+\n\n' +
      '// Rôles conventionnels des registres généraux en x86 / x86_64 :\n' +
      '- RAX / EAX : Accumulateur principal, valeur de retour des fonctions\n' +
      '- RBX / EBX : Registre de base pour l’adressage mémoire (préservé par l’appelé)\n' +
      '- RCX / ECX : Compteur pour les boucles (LOOP) et décalages (CL pour SHL/SHR)\n' +
      '- RDX / EDX : Registre de données, opérande auxiliaire (multiplication/division)\n' +
      '- RSI / ESI : Source Index pour les copies de chaînes (Source)\n' +
      '- RDI / EDI : Destination Index pour les copies de chaînes (Destination, 1er arg x64)\n' +
      '- RSP / ESP : Pointeur du sommet de la pile (Stack Pointer)\n' +
      '- RBP / EBP : Pointeur de base du cadre d’activation (Frame / Base Pointer)\n' +
      '- RIP / EIP : Pointeur de la prochaine instruction à exécuter (Instruction Pointer)</code></pre>'
    ].join('\n')),

    bloc('2. Registre d’état EFLAGS', [
      '<pre><code>// Les 4 drapeaux essentiels testés par les sauts conditionnels :\n' +
      '- ZF (Zero Flag)     : ZF = 1 si le résultat de l’opération est nul (0), sinon ZF = 0\n' +
      '- CF (Carry Flag)    : CF = 1 en cas de retenue/emprunt non signé (> 255 ou A &lt; B)\n' +
      '- SF (Sign Flag)     : SF = 1 si le bit de poids fort vaut 1 (résultat signé négatif)\n' +
      '- OF (Overflow Flag) : OF = 1 si un débordement arithmétique signé se produit (-128..+127)\n\n' +
      '// Règle d’Overflow en addition signée : A + B\n' +
      'Deux opérandes de même signe produisent un résultat de signe opposé.</code></pre>'
    ].join('\n')),

    bloc('3. Modes d’adressage complet x86', [
      '<pre><code>// Formule de calcul d’adresse effective (Load Effective Address) :\n' +
      'Adresse = Base + (Index &times; Scale) + D&eacute;placement\n\n' +
      '- Base        : n’importe quel registre général (ex. RBX, RBP)\n' +
      '- Index       : n’importe quel registre général sauf RSP\n' +
      '- Scale       : facteur d’échelle valant 1, 2, 4 ou 8 (taille des éléments)\n' +
      '- Déplacement : constante immédiate sur 8 ou 32 bits\n\n' +
      'Exemples :\n' +
      'MOV EAX, [EBX]                   ; Adressage indirect simple\n' +
      'MOV EAX, [EBX + 8]               ; Base + déplacement constant\n' +
      'MOV EAX, [EBX + ECX*4]           ; Base + index &times; échelle (tableau d’entiers 32 bits)\n' +
      'LEA EAX, [EBX + ECX*4 + 16]      ; Calcule l’adresse sans toucher à la mémoire !</code></pre>'
    ].join('\n')),

    bloc('4. Instructions fondamentales', [
      '<table class="table">',
      '  <thead><tr><th>Instruction</th><th>Description</th><th>Effet sur les drapeaux</th></tr></thead>',
      '  <tbody>',
      '    <tr><td><code>MOV dest, src</code></td><td>Copie src vers dest (registre, mémoire ou immédiat)</td><td>Aucun drapeau modifié</td></tr>',
      '    <tr><td><code>LEA dest, [adr]</code></td><td>Calculez l’adresse arithmétique et la charge dans dest</td><td>Aucun drapeau modifié</td></tr>',
      '    <tr><td><code>ADD dest, src</code></td><td>dest &larr; dest + src</td><td>Modifiez ZF, CF, SF, OF</td></tr>',
      '    <tr><td><code>SUB dest, src</code></td><td>dest &larr; dest - src</td><td>Modifiez ZF, CF, SF, OF</td></tr>',
      '    <tr><td><code>CMP op1, op2</code></td><td>Calculez op1 - op2 pour maj des drapeaux (jette le résultat)</td><td>Modifiez ZF, CF, SF, OF</td></tr>',
      '    <tr><td><code>AND / OR / XOR</code></td><td>Opérations logiques bit à bit (XOR reg, reg remet à 0)</td><td>ZF=1 si nul, CF=0, OF=0</td></tr>',
      '    <tr><td><code>SHL / SHR</code></td><td>Décalage binaire logique gauche/droite (insère des 0)</td><td>Le bit éjecté entre dans CF</td></tr>',
      '    <tr><td><code>SAR dest, n</code></td><td>Décalage arithmétique droite (réplique le bit de signe)</td><td>Conserve le signe des entiers relatifs</td></tr>',
      '    <tr><td><code>PUSH src</code></td><td>Décrémente RSP de 4 ou 8 octets, écrit src en mémoire</td><td>Aucun drapeau modifié</td></tr>',
      '    <tr><td><code>POP dest</code></td><td>Lit la mémoire au sommet de pile, incrémente RSP</td><td>Aucun drapeau modifié</td></tr>',
      '    <tr><td><code>CALL label</code></td><td>Empile l’adresse de retour (RIP) puis saute vers label</td><td>Aucun drapeau modifié</td></tr>',
      '    <tr><td><code>RET</code></td><td>Dépile l’adresse de retour et l’écrit dans RIP</td><td>Aucun drapeau modifié</td></tr>',
      '  </tbody>',
      '</table>'
    ].join('\n')),

    bloc('5. Sauts conditionnels (Jcc)', [
      '<table class="table">',
      '  <thead><tr><th>Mnémonique</th><th>Condition en français</th><th>Test sur drapeaux</th><th>Usage</th></tr></thead>',
      '  <tbody>',
      '    <tr><td><code>JE / JZ</code></td><td>Égalité ou résultat nul</td><td>ZF = 1</td><td>Signé et non signé</td></tr>',
      '    <tr><td><code>JNE / JNZ</code></td><td>Différent ou non nul</td><td>ZF = 0</td><td>Signé et non signé</td></tr>',
      '    <tr><td><code>JG / JNLE</code></td><td>Strictement supérieur (Greater)</td><td>ZF = 0 et SF = OF</td><td>Entiers signés</td></tr>',
      '    <tr><td><code>JL / JNGE</code></td><td>Strictement inférieur (Less)</td><td>SF &ne; OF</td><td>Entiers signés</td></tr>',
      '    <tr><td><code>JA / JNBE</code></td><td>Au-dessus (Above)</td><td>CF = 0 et ZF = 0</td><td>Entiers non signés</td></tr>',
      '    <tr><td><code>JB / JNAE</code></td><td>En-dessous (Below)</td><td>CF = 1</td><td>Entiers non signés</td></tr>',
      '  </tbody>',
      '</table>'
    ].join('\n')),

    bloc('6. Convention d’appel cdecl (Pile 32 bits)', [
      '<pre><code>// 1. Prologue standard de fonction :\n' +
      'push ebp             ; Sauvegarde l’ancien cadre de pile\n' +
      'mov  ebp, esp        ; Établit le nouveau cadre de référence fixe\n' +
      'sub  esp, 16         ; Alloue 16 octets pour les variables locales\n\n' +
      '// 2. Accès aux données via EBP :\n' +
      '- Paramètre 1 : [ebp + 8]\n' +
      '- Paramètre 2 : [ebp + 12]\n' +
      '- Variable locale 1 : [ebp - 4]\n' +
      '- Variable locale 2 : [ebp - 8]\n\n' +
      '// 3. Épilogue standard & Retour :\n' +
      'mov  eax, [ebp - 4]  ; Place la valeur de retour dans EAX\n' +
      'mov  esp, ebp        ; Libère les variables locales\n' +
      'pop  ebp             ; Restaure le cadre de pile de l’appelant\n' +
      'ret                  ; Dépile l’adresse de retour et saute</code></pre>'
    ].join('\n')),

    chnav({ href: 'cartes.html', label: 'Flashcards de révision' }, { href: 'examens.html', label: 'Simulateur d’examen' })
  ].join('\n\n');

  return {
    'chapitres/formules.html': {
      title: 'Mémo synthétique — ' + course.brand,
      description: 'Fiche mémo complète d’Assembleur B2 : registres x86_64, drapeaux EFLAGS, modes d’adressage, instructions et pile.',
      active: 'formules',
      body
    }
  };
}

module.exports = { cartes, formules };

/**
 * Pages « simulateur d’examen » et « catalogue d’exercices » du cours « Assembleur » B2.
 */
'use strict';

const { ic, crumb, box } = require('../../../../scripts/course-kit');
const { chnav, disclaimer } = require('./helpers');

/* ======================== Examens ======================== */

function examens(course) {
  const body = [
    crumb(course, [{ href: '../index.html', label: course.brand }, { href: '../sommaire.html', label: 'Sommaire' }, { label: 'Examens' }]),
    '  <h1>Simulateur d’épreuves &amp; Examens blancs</h1>',
    '  <p class="lead">Deux épreuves complètes représentatives des partiels universitaires et des écoles d’ingénieurs, ' +
    'notées sur 20 avec barème détaillé et corrigés pas à pas.</p>',

    box('standard', 'Modalités d’évaluation en conditions réelles', [
      '<p><strong>Durée conseillée :</strong> 2 heures par épreuve.<br>' +
      '<strong>Règles :</strong> calculatrice et documents interdits. ' +
      'Prenez une feuille blanche, résolvez chaque exercice sans aide, puis dépliez le corrigé pour comparer votre méthode.</p>'
    ].join('\n')),

    '  <h2>Sujet 1 — Contrôle Continu : Numération, Registres &amp; Drapeaux (Durée : 1 h 30)</h2>',

    box('tip', 'Exercice 1 : Masquage &amp; Complément à 2 (6 points)', [
      '<p>Soit l’octet hexadécimal $A = 0\\text{xC6}$.</p>',
      '<ol>',
      '  <li>Donner l’écriture binaire de $A$ sur 8 bits.</li>',
      '  <li>Calculer sa valeur décimale si $A$ est interprété comme un entier <strong>non signé</strong>.</li>',
      '  <li>Calculer sa valeur décimale si $A$ est interprété comme un entier <strong>signé en complément à 2</strong>.</li>',
      '  <li>Quel masque binaire et quelle opération logique permettent de forcer à 0 les 4 bits de poids fort tout en conservant les 4 bits de poids faible ? Donner le résultat hexadécimal.</li>',
      '</ol>',
      '<details class="exam-solution"><summary>Voir le barème &amp; corrigé détaillé</summary>',
      '  <p><strong>Corrigé pas à pas :</strong></p>',
      '  <ul>',
      '    <li>1. $0\\text{xC6} = 1100\\ 0110_2$ (C = 12 = 1100, 6 = 0110). (1 pt)</li>',
      '    <li>2. Non signé : $128 + 64 + 4 + 2 = 198_{10}$. (1,5 pt)</li>',
      '    <li>3. Signé : le bit 7 est à 1 (négatif). Inversion des bits : $0011\\ 1001_2 = 57$. Ajout de 1 : $58$. Donc $A = -58_{10}$ (ou $198 - 256 = -58$). (2 pts)</li>',
      '    <li>4. Opération : <code>AND 0x0F</code> (masque $0000\\ 1111_2$). Résultat : $1100\\ 0110_2 \\text{ AND } 0000\\ 1111_2 = 0000\\ 0110_2 = 0\\text{x06}$. (1,5 pt)</li>',
      '  </ul>',
      '</details>'
    ].join('\n')),

    box('tip', 'Exercice 2 : ALU 8 bits &amp; Drapeaux ZF, CF, SF, OF (8 points)', [
      '<p>Soient deux registres 8 bits $AL = 0\\text{x90}$ et $BL = 0\\text{x70}$.</p>',
      '<ol>',
      '  <li>Calculer le résultat de l’instruction <code>ADD AL, BL</code> sur 8 bits. Donner le résultat en hexadécimal.</li>',
      '  <li>Indiquer la valeur (0 ou 1) de chacun des quatre drapeaux : ZF, CF, SF, OF. Justifier rigoureusement chacun d’eux.</li>',
      '  <li>Mêmes questions si l’instruction exécutée était <code>SUB AL, BL</code>.</li>',
      '</ol>',
      '<details class="exam-solution"><summary>Voir le barème &amp; corrigé détaillé</summary>',
      '  <p><strong>Corrigé pas à pas :</strong></p>',
      '  <ul>',
      '    <li>1. $AL = 0\\text{x90} = 144_{10}$, $BL = 0\\text{x70} = 112_{10}$. Somme $144 + 112 = 256 = 0\\text{x100}$. Tronqué sur 8 bits : $AL = 0\\text{x00}$. (2 pts)</li>',
      '    <li>2. Drapeaux pour ADD : (2 pts)<br>' +
      '      - <strong>ZF = 1</strong> car le résultat 8 bits est nul ($0\\text{x00}$).<br>' +
      '      - <strong>CF = 1</strong> car il y a une retenue sortante ($256 &gt; 255$).<br>' +
      '      - <strong>SF = 0</strong> car le bit 7 du résultat vaut 0.<br>' +
      '      - <strong>OF = 0</strong> : en signé, $0\\text{x90} = -112$, $0\\text{x70} = +112$. Somme : $-112 + 112 = 0$ (dans la plage $-128..+127$, aucun overflow).</li>',
      '    <li>3. Pour <code>SUB AL, BL</code> : $144 - 112 = 32 = 0\\text{x20}$. (2 pts)<br>' +
      '      - Drapeaux : <strong>ZF = 0</strong> ($0\\text{x20} \\neq 0$), <strong>CF = 0</strong> (pas d’emprunt car $144 \\ge 112$), <strong>SF = 0</strong> (bit 7 à 0), <strong>OF = 1</strong> car en signé $-112 - (+112) = -224 &lt; -128$ (débordement négatif !). (2 pts)</li>',
      '  </ul>',
      '</details>'
    ].join('\n')),

    box('tip', 'Exercice 3 : Décomposition de registres x86_64 (6 points)', [
      '<p>Le registre 64 bits <code>RAX</code> contient la valeur <code>0xDEADBEEFCAFE1234</code>.</p>',
      '<ol>',
      '  <li>Donner la valeur contenue dans <code>EAX</code> en hexadécimal.</li>',
      '  <li>Donner la valeur contenue dans <code>AX</code>.</li>',
      '  <li>Donner la valeur contenue dans <code>AH</code> et dans <code>AL</code>.</li>',
      '  <li>Si on exécute l’instruction <code>MOV AL, 0xFF</code>, que devient la valeur complète de <code>RAX</code> ?</li>',
      '</ol>',
      '<details class="exam-solution"><summary>Voir le barème &amp; corrigé détaillé</summary>',
      '  <p><strong>Corrigé :</strong></p>',
      '  <ul>',
      '    <li>1. <code>EAX</code> correspond aux 32 bits de poids faible : <code>0xCAFE1234</code>. (1,5 pt)</li>',
      '    <li>2. <code>AX</code> correspond aux 16 bits de poids faible : <code>0x1234</code>. (1,5 pt)</li>',
      '    <li>3. <code>AH = 0x12</code> (octet haut de AX) et <code>AL = 0x34</code> (octet bas de AX). (1,5 pt)</li>',
      '    <li>4. Seul l’octet de poids le plus faible est remplacé par <code>FF</code> : <code>RAX = 0xDEADBEEFCAFE12FF</code>. (1,5 pt)</li>',
      '  </ul>',
      '</details>'
    ].join('\n')),

    '  <h2>Sujet 2 — Examen Final : Adressage, Pile &amp; Conventions d’Appel (Durée : 2 h 00)</h2>',

    box('tip', 'Exercice 1 : Adressage effectif &amp; instruction LEA (6 points)', [
      '<p>Soient les registres $EBX = 0\\text{x00401000}$ et $ECX = 4$.</p>',
      '<ol>',
      '  <li>Expliquer la différence fondamentale entre <code>MOV EAX, [EBX + ECX*4]</code> et <code>LEA EAX, [EBX + ECX*4]</code>.</li>',
      '  <li>Calculer la valeur chargée dans <code>EAX</code> après l’instruction <code>LEA EAX, [EBX + ECX*4 + 0x20]</code>.</li>',
      '  <li>Pourquoi les compilateurs utilisent-ils souvent <code>LEA</code> pour faire de l’arithmétique simple plutôt que <code>ADD</code> ?</li>',
      '</ol>',
      '<details class="exam-solution"><summary>Voir le barème &amp; corrigé détaillé</summary>',
      '  <p><strong>Corrigé :</strong></p>',
      '  <ul>',
      '    <li>1. <code>MOV</code> lit le contenu de la mémoire vive situé à l’adresse calculée, alors que <code>LEA</code> calcule l’adresse arithmétique et la charge directement dans le registre sans jamais accéder au bus mémoire. (2 pts)</li>',
      '    <li>2. Calcul : $0\\text{x00401000} + (4 \\times 4) + 0\\text{x20} = 0\\text{x00401000} + 16 (0\\text{x10}) + 32 (0\\text{x20}) = 0\\text{x00401030}$. (2 pts)</li>',
      '    <li>3. Avantages de <code>LEA</code> : il réalise en un seul cycle d’horloge une multiplication par 1, 2, 4 ou 8 suivie de deux additions, et surtout <strong>il ne modifie aucun drapeau du registre EFLAGS</strong>. (2 pts)</li>',
      '  </ul>',
      '</details>'
    ].join('\n')),

    box('tip', 'Exercice 2 : Gestion de la Pile &amp; Cadre cdecl (8 points)', [
      '<p>On considère la fonction C suivante :</p>',
      '<pre><code>int calcul(int a, int b) {\n' +
      '    int x = a + 5;\n' +
      '    return x * b;\n' +
      '}</code></pre>',
      '<ol>',
      '  <li>Écrire le prologue assembleur 32 bits standard pour cette fonction.</li>',
      '  <li>Exprimer en adressage relatif à <code>EBP</code> l’emplacement des paramètres <code>a</code> et <code>b</code>, ainsi que de la variable locale <code>x</code>.</li>',
      '  <li>Écrire le corps complet de la fonction en assembleur x86 (syntaxe Intel).</li>',
      '  <li>Écrire l’épilogue standard et l’instruction de retour.</li>',
      '</ol>',
      '<details class="exam-solution"><summary>Voir le barème &amp; corrigé détaillé</summary>',
      '  <p><strong>Corrigé pas à pas :</strong></p>',
      '  <ul>',
      '    <li>1. Prologue : (2 pts)<br>' +
      '      <code>push ebp</code><br>' +
      '      <code>mov  ebp, esp</code><br>' +
      '      <code>sub  esp, 4</code> (allocation pour la variable locale x)</li>',
      '    <li>2. Emplacements : <code>a</code> est à <code>[ebp + 8]</code>, <code>b</code> est à <code>[ebp + 12]</code>, et <code>x</code> est à <code>[ebp - 4]</code>. (2 pts)</li>',
      '    <li>3. Corps : (2 pts)<br>' +
      '      <code>mov eax, [ebp + 8]   ; eax = a</code><br>' +
      '      <code>add eax, 5          ; eax = a + 5</code><br>' +
      '      <code>mov [ebp - 4], eax  ; x = a + 5</code><br>' +
      '      <code>imul eax, [ebp + 12]; eax = x * b</code></li>',
      '    <li>4. Épilogue : (2 pts)<br>' +
      '      <code>mov esp, ebp        ; libération pile</code><br>' +
      '      <code>pop ebp             ; restauration ancien cadre</code><br>' +
      '      <code>ret                 ; retour appelant (résultat dans EAX)</code></li>',
      '  </ul>',
      '</details>'
    ].join('\n')),

    box('tip', 'Exercice 3 : Branchements conditionnels (6 points)', [
      '<p>Traduire le bloc conditionnel suivant en assembleur x86 sans utiliser de structure non linéaire complexe :</p>',
      '<pre><code>if (eax &gt;= 10) {\n' +
      '    ebx = 1;\n' +
      '} else {\n' +
      '    ebx = 2;\n' +
      '}</code></pre>',
      '<details class="exam-solution"><summary>Voir le barème &amp; corrigé détaillé</summary>',
      '  <p><strong>Corrigé :</strong></p>',
      '  <pre><code>    cmp eax, 10\n' +
      '    jl  .branche_sinon    ; Si eax &lt; 10, sauter au else\n' +
      '    mov ebx, 1\n' +
      '    jmp .fin\n' +
      '.branche_sinon:\n' +
      '    mov ebx, 2\n' +
      '.fin:</code></pre>',
      '  <p>L’instruction <code>JL</code> (Jump if Less) teste la condition opposée pour brancher directement sur le bloc alternatif.</p>',
      '</details>'
    ].join('\n')),

    chnav({ href: 'formules.html', label: 'Mémo des instructions' }, { href: 'exercices.html', label: 'Catalogue d’ateliers' })
  ].join('\n\n');

  return {
    'chapitres/examens.html': {
      title: 'Simulateur d’examen — ' + course.brand,
      description: 'Sujets d’examens blancs corrigés d’Architecture & Programmation en Assembleur B2 : CC et examen final notés.',
      active: 'examens',
      body
    }
  };
}

/* ======================== Exercices ======================== */

function exercices(course, chapterList) {
  const allExercises = require('../../../exercises/assembleur');

  const sectionsHtml = chapterList.map(chapitre => {
    const exList = allExercises.filter(ex => ex.chapter === chapitre.n);
    const exCards = exList.map((ex, i) => [
      '    <div class="summary-item">',
      '      <div class="summary-item__num">' + ex.id + '</div>',
      '      <div class="summary-item__body">',
      '        <h3>' + ex.title + '</h3>',
      '        <p>' + ex.goal + '</p>',
      '      </div>',
      '      <a class="btn" href="chapitre' + chapitre.n + '.html">Ouvrir ' + ic('arrow-right') + '</a>',
      '    </div>'
    ].join('\n')).join('\n');

    return [
      '  <h2>Module ' + chapitre.n + ' — ' + chapitre.title + '</h2>',
      '  <div class="summary-list">' + exCards + '</div>'
    ].join('\n');
  }).join('\n\n');

  const body = [
    crumb(course, [{ href: '../index.html', label: course.brand }, { href: '../sommaire.html', label: 'Sommaire' }, { label: 'Exercices' }]),
    '  <h1>Catalogue des 18 ateliers de code interactifs</h1>',
    '  <p class="lead">Tous les ateliers pratiques d’Assembleur et d’Architecture CPU, testés et vérifiés directement dans votre navigateur.</p>',
    sectionsHtml,
    chnav({ href: 'examens.html', label: 'Simulateur d’examen' }, { href: '../atelier.html', label: 'Bac à sable Assembleur' })
  ].join('\n\n');

  return {
    'chapitres/exercices.html': {
      title: 'Catalogue des ateliers — ' + course.brand,
      description: 'Catalogue des 18 exercices pratiques de code d’Assembleur B2 : registres, drapeaux, ALIGN, LEA et pile.',
      active: 'exercices',
      body
    }
  };
}

module.exports = { examens, exercices };

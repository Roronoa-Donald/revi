/**
 * Interpréteur pédagogique de pseudo-code algorithmique en français.
 * Architecture : Lexer -> Parser (AST) -> Interpréteur avec protection contre les boucles infinies.
 * Compatible navigateur et Node.js.
 *
 * Dialecte enseigné (cours d'Algorithmique B1/B3) :
 *   Algorithme Nom                       (en-tête optionnel)
 *   Variables
 *     a, b : Entier                      (types indicatifs)
 *     Tableau t[100] : Entiers           (taille constante dans l'en-tête)
 *   Fonction carre(x : Entier) : Entier
 *   Début
 *     Retourner x * x
 *   FinFonction                          (ou « Fin Fonction »)
 *   Début
 *     Lire n
 *     Tableau t[n] : Entiers             (déclaration après lecture de n)
 *     Pour i De 0 A n - 1 Faire
 *       Lire t[i]
 *     FinPour
 *     Afficher(carre(t[0]))             (ou Écrire)
 *   Fin
 *
 * Instructions : affectation <- := =, Si/Alors/Sinon/FinSi, Pour/De/A/Pas/Faire/FinPour
 * (bornes incluses), TantQue (ou Tant que)/FinTantQue, Répéter/Jusqu'à,
 * SortirDeBoucle, Retourner (ou Renvoyer), fonctions récursives.
 * Opérateurs : + - * / (réel), DIV (entier, vers -infini), MOD et % (reste
 * conforme à la relation dividende = quotient DIV × diviseur + reste),
 * comparaisons = == != <> < <= > >=, ET OU NON, & et + pour concaténer.
 * Prédéfinis : Longueur(x) (chaîne ou tableau), Formater(x, d) (d décimales,
 * séparateur point), Abs(x). Indices à partir de 0.
 *
 * Garde-fous (le pseudo-code ne touche jamais au système : aucun fichier,
 * réseau, horloge ni bibliothèque — uniquement des nombres, chaînes, tableaux) :
 *   - MAX_STEPS        étapes d'exécution (boucles infinies) ;
 *   - MAX_CALL_DEPTH   appels de fonction imbriqués ;
 *   - MAX_ARRAY_CELLS  cases de tableau au total ;
 *   - MAX_DIMENSION    taille d'une dimension ;
 *   - MAX_STRING_LENGTH longueur d'une chaîne construite.
 */
(function (root, factory) {
  if (typeof module === 'object' && module.exports) {
    module.exports = factory(require('./engine-interface'));
  } else {
    root.PseudoCodeEngine = factory(root.ExecutionInterface);
  }
})(typeof globalThis !== 'undefined' ? globalThis : this, function (ExecutionInterface) {
  'use strict';

  var MAX_STEPS = 500000;          // Protection contre les boucles infinies
  var MAX_CALL_DEPTH = 512;        // Profondeur de récursion
  var MAX_ARRAY_CELLS = 262144;    // Cases de tableau au total (256 Kio)
  var MAX_DIMENSION = 100000;      // Taille d'une dimension
  var MAX_STRING_LENGTH = 1000000; // Caractères d'une chaîne construite

  var createResult = ExecutionInterface ? ExecutionInterface.createResult : function (r) { return r; };

  // =========================================================================
  // 1. LEXER (Analyse lexicale)
  // =========================================================================

  var TOKEN_TYPES = {
    KEYWORD: 'KEYWORD',
    IDENTIFIER: 'IDENTIFIER',
    NUMBER: 'NUMBER',
    STRING: 'STRING',
    BOOLEAN: 'BOOLEAN',
    OPERATOR: 'OPERATOR',
    ASSIGN: 'ASSIGN',
    PUNCTUATION: 'PUNCTUATION',
    NEWLINE: 'NEWLINE',
    EOF: 'EOF'
  };

  var KEYWORDS = new Set([
    'ALGORITHME', 'ALGO', 'VARIABLES', 'VARIABLE', 'VAR', 'DEBUT', 'FIN',
    'SI', 'ALORS', 'SINON', 'FINSI',
    'POUR', 'FAIRE', 'FINPOUR',
    'TANT', 'QUE', 'TANTQUE', 'FINTANTQUE',
    'REPETER', 'JUSQU', 'JUSQUA',
    'AFFICHER', 'ECRIRE', 'LIRE',
    'ENTIER', 'REEL', 'CHAINE', 'BOOLEEN', 'CARACTERE', 'TABLEAU',
    'VRAI', 'FAUX', 'TRUE', 'FALSE',
    'ET', 'OU', 'NON', 'MOD', 'DIV',
    'FONCTION', 'FINFONCTION', 'RETOURNER', 'RENVOYER',
    'SORTIRDEBOUCLE'
  ]);

  function normalizeKeyword(str) {
    return str
      .toUpperCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '');
  }

  function isLetterChar(ch) {
    return (ch >= 'a' && ch <= 'z') || (ch >= 'A' && ch <= 'Z') || ch === '_' || ch >= '\u00C0';
  }

  function isIdentChar(ch) {
    return isLetterChar(ch) || (ch >= '0' && ch <= '9');
  }

  function Lexer(source) {
    this.source = source || '';
    this.pos = 0;
    this.line = 1;
    this.col = 1;
    this.length = this.source.length;
  }

  Lexer.prototype.currentChar = function () {
    return this.pos < this.length ? this.source[this.pos] : null;
  };

  Lexer.prototype.peekChar = function (offset) {
    var p = this.pos + (offset || 1);
    return p < this.length ? this.source[p] : null;
  };

  Lexer.prototype.advance = function () {
    if (this.pos < this.length) {
      if (this.source[this.pos] === '\n') {
        this.line++;
        this.col = 1;
      } else {
        this.col++;
      }
      this.pos++;
    }
  };

  Lexer.prototype.tokenize = function () {
    var tokens = [];

    while (this.pos < this.length) {
      var ch = this.currentChar();

      // Espaces horizontaux
      if (ch === ' ' || ch === '\t' || ch === '\r') {
        this.advance();
        continue;
      }

      // Saut de ligne
      if (ch === '\n') {
        var startLine = this.line;
        var startCol = this.col;
        this.advance();
        // Évite les newlines consécutifs inutiles
        if (tokens.length && tokens[tokens.length - 1].type !== TOKEN_TYPES.NEWLINE) {
          tokens.push({ type: TOKEN_TYPES.NEWLINE, value: '\n', line: startLine, col: startCol });
        }
        continue;
      }

      // Commentaires //
      if (ch === '/' && this.peekChar() === '/') {
        while (this.pos < this.length && this.currentChar() !== '\n') {
          this.advance();
        }
        continue;
      }

      // Commentaires /* ... */
      if (ch === '/' && this.peekChar() === '*') {
        this.advance();
        this.advance();
        while (this.pos < this.length && !(this.currentChar() === '*' && this.peekChar() === '/')) {
          this.advance();
        }
        this.advance();
        this.advance();
        continue;
      }

      var startL = this.line;
      var startC = this.col;

      // Nombres
      if (ch >= '0' && ch <= '9') {
        var numStr = '';
        var hasDot = false;
        while (this.pos < this.length) {
          var c = this.currentChar();
          if (c >= '0' && c <= '9') {
            numStr += c;
            this.advance();
          } else if (c === '.' && !hasDot && this.peekChar() >= '0' && this.peekChar() <= '9') {
            hasDot = true;
            numStr += '.';
            this.advance();
          } else {
            break;
          }
        }
        tokens.push({
          type: TOKEN_TYPES.NUMBER,
          value: hasDot ? parseFloat(numStr) : parseInt(numStr, 10),
          raw: numStr,
          line: startL,
          col: startC
        });
        continue;
      }

      // « Jusqu'à » : l'apostrophe et le « à » qui suivent Jusqu sont absorbés.
      if (ch === "'" && tokens.length > 0) {
        var lastTok = tokens[tokens.length - 1];
        var nextCh = this.peekChar();
        if (lastTok.type === TOKEN_TYPES.KEYWORD && lastTok.value === 'JUSQU' &&
            (nextCh === 'a' || nextCh === 'A' || nextCh === 'à' || nextCh === 'À')) {
          this.advance();
          this.advance();
          continue;
        }
      }

      // Chaînes de caractères ("..." ou '...')
      if (ch === '"' || ch === "'") {
        var quote = ch;
        this.advance();
        var strVal = '';
        while (this.pos < this.length && this.currentChar() !== quote) {
          if (this.currentChar() === '\\') {
            this.advance();
            var nextC = this.currentChar();
            if (nextC === 'n') strVal += '\n';
            else if (nextC === 't') strVal += '\t';
            else strVal += (nextC || '');
          } else {
            strVal += this.currentChar();
          }
          this.advance();
        }
        if (this.currentChar() === quote) {
          this.advance();
        } else {
          throw new Error('Erreur lexicale à la ligne ' + startL + ', colonne ' + startC + ' : chaîne de caractères non fermée.');
        }
        tokens.push({ type: TOKEN_TYPES.STRING, value: strVal, line: startL, col: startC });
        continue;
      }

      // Affectation : <- ou :=
      if (ch === '<' && this.peekChar() === '-') {
        this.advance();
        this.advance();
        tokens.push({ type: TOKEN_TYPES.ASSIGN, value: '<-', line: startL, col: startC });
        continue;
      }
      if (ch === ':' && this.peekChar() === '=') {
        this.advance();
        this.advance();
        tokens.push({ type: TOKEN_TYPES.ASSIGN, value: ':=', line: startL, col: startC });
        continue;
      }

      // Opérateurs de comparaison 2 caractères
      if (ch === '<' && this.peekChar() === '=') {
        this.advance(); this.advance();
        tokens.push({ type: TOKEN_TYPES.OPERATOR, value: '<=', line: startL, col: startC });
        continue;
      }
      if (ch === '>' && this.peekChar() === '=') {
        this.advance(); this.advance();
        tokens.push({ type: TOKEN_TYPES.OPERATOR, value: '>=', line: startL, col: startC });
        continue;
      }
      if (ch === '<' && this.peekChar() === '>') {
        this.advance(); this.advance();
        tokens.push({ type: TOKEN_TYPES.OPERATOR, value: '!=', line: startL, col: startC });
        continue;
      }
      if (ch === '!' && this.peekChar() === '=') {
        this.advance(); this.advance();
        tokens.push({ type: TOKEN_TYPES.OPERATOR, value: '!=', line: startL, col: startC });
        continue;
      }
      if (ch === '=' && this.peekChar() === '=') {
        this.advance(); this.advance();
        tokens.push({ type: TOKEN_TYPES.OPERATOR, value: '==', line: startL, col: startC });
        continue;
      }

      // Identifiants et mots-clés
      if (isLetterChar(ch)) {
        var idStr = '';
        while (this.pos < this.length && isIdentChar(this.currentChar())) {
          idStr += this.currentChar();
          this.advance();
        }

        var normalized = normalizeKeyword(idStr);
        if (normalized === 'VRAI' || normalized === 'TRUE') {
          tokens.push({ type: TOKEN_TYPES.BOOLEAN, value: true, line: startL, col: startC });
        } else if (normalized === 'FAUX' || normalized === 'FALSE') {
          tokens.push({ type: TOKEN_TYPES.BOOLEAN, value: false, line: startL, col: startC });
        } else if (KEYWORDS.has(normalized)) {
          tokens.push({ type: TOKEN_TYPES.KEYWORD, value: normalized, raw: idStr, line: startL, col: startC });
        } else {
          tokens.push({ type: TOKEN_TYPES.IDENTIFIER, value: idStr, line: startL, col: startC });
        }
        continue;
      }

      // Ponctuation et opérateurs simples
      if ('+-*/%^()[]{},:;=&<>'.indexOf(ch) !== -1) {
        this.advance();
        if (ch === '=' || ch === '<' || ch === '>') {
          tokens.push({ type: TOKEN_TYPES.OPERATOR, value: ch, line: startL, col: startC });
        } else if ('+-*/%^&'.indexOf(ch) !== -1) {
          tokens.push({ type: TOKEN_TYPES.OPERATOR, value: ch, line: startL, col: startC });
        } else {
          tokens.push({ type: TOKEN_TYPES.PUNCTUATION, value: ch, line: startL, col: startC });
        }
        continue;
      }

      throw new Error('Caractère inattendu "' + ch + '" à la ligne ' + startL + ', colonne ' + startC);
    }

    tokens.push({ type: TOKEN_TYPES.EOF, value: '', line: this.line, col: this.col });
    return tokens;
  };

  // =========================================================================
  // 2. PARSER (Analyse syntaxique & AST)
  // =========================================================================

  function Parser(tokens) {
    this.tokens = tokens;
    this.pos = 0;
  }

  Parser.prototype.peek = function (offset) {
    var p = this.pos + (offset || 0);
    return p < this.tokens.length ? this.tokens[p] : this.tokens[this.tokens.length - 1];
  };

  Parser.prototype.match = function (type, value) {
    var tok = this.peek();
    if (tok.type === type) {
      if (value === undefined || tok.value === value) {
        this.pos++;
        return tok;
      }
    }
    return null;
  };

  Parser.prototype.expect = function (type, value, customMsg) {
    var tok = this.match(type, value);
    if (!tok) {
      var current = this.peek();
      throw new Error(customMsg || ('Erreur de syntaxe à la ligne ' + current.line + ', colonne ' + current.col + ' : attendu ' + (value || type) + ', obtenu "' + current.value + '"'));
    }
    return tok;
  };

  Parser.prototype.matchWord = function (word) {
    var tok = this.peek();
    if ((tok.type === TOKEN_TYPES.KEYWORD || tok.type === TOKEN_TYPES.IDENTIFIER) && normalizeKeyword(tok.value) === word) {
      this.pos++;
      return tok;
    }
    return null;
  };

  Parser.prototype.expectWord = function (word, customMsg) {
    var tok = this.matchWord(word);
    if (!tok) {
      var current = this.peek();
      throw new Error(customMsg || ('Erreur de syntaxe à la ligne ' + current.line + ', colonne ' + current.col + ' : attendu "' + word + '", obtenu "' + current.value + '"'));
    }
    return tok;
  };

  Parser.prototype.skipNewlines = function () {
    while (this.peek().type === TOKEN_TYPES.NEWLINE || (this.peek().type === TOKEN_TYPES.PUNCTUATION && this.peek().value === ';')) {
      this.pos++;
    }
  };

  /** Nom de variable (ou de fonction) : identifiant, avec repli tolérant sur mot-clé type. */
  Parser.prototype.parseName = function (what) {
    var tok = this.peek();
    if (tok.type === TOKEN_TYPES.IDENTIFIER) {
      this.pos++;
      return tok.value;
    }
    throw new Error('Erreur de syntaxe à la ligne ' + tok.line + ' : nom de ' + (what || 'variable') + ' attendu, obtenu "' + tok.value + '".');
  };

  /** `: Type` optionnel (les types sont indicatifs et ignorés à l'exécution). */
  Parser.prototype.skipOptionalType = function () {
    if (this.match(TOKEN_TYPES.PUNCTUATION, ':')) {
      var tok = this.peek();
      if (tok.type === TOKEN_TYPES.KEYWORD || tok.type === TOKEN_TYPES.IDENTIFIER) {
        this.pos++;
      }
    }
  };

  /** Déclaration de tableau : `Tableau nom[t]` ou `Tableau nom[l][c]`, type optionnel. */
  Parser.prototype.parseTableauDeclaration = function () {
    this.expect(TOKEN_TYPES.KEYWORD, 'TABLEAU');
    var nameTok = this.peek();
    var name = this.parseName('tableau');
    var dims = [];
    do {
      this.expect(TOKEN_TYPES.PUNCTUATION, '[',
        'Erreur de syntaxe à la ligne ' + nameTok.line + ' : taille attendue entre crochets après ' + name + '.');
      dims.push(this.parseExpression());
      this.expect(TOKEN_TYPES.PUNCTUATION, ']');
    } while (this.peek().type === TOKEN_TYPES.PUNCTUATION && this.peek().value === '[');
    if (dims.length > 2) {
      throw new Error('Erreur de syntaxe à la ligne ' + nameTok.line + ' : au plus deux dimensions pour le tableau ' + name + '.');
    }
    this.skipOptionalType();
    return { type: 'TableauDeclaration', name: name, dims: dims, line: nameTok.line };
  };

  Parser.prototype.parse = function () {
    this.skipNewlines();

    // En-tête optionnel : ALGORITHME <nom>
    if (this.match(TOKEN_TYPES.KEYWORD, 'ALGORITHME') || this.match(TOKEN_TYPES.KEYWORD, 'ALGO')) {
      if (this.peek().type === TOKEN_TYPES.IDENTIFIER || this.peek().type === TOKEN_TYPES.STRING) {
        this.pos++;
      }
      this.skipNewlines();
    }

    var declarations = [];
    var functions = [];

    // Sections optionnelles dans n'importe quel ordre : VARIABLES ... et Fonction ...
    while (true) {
      if (this.match(TOKEN_TYPES.KEYWORD, 'VARIABLES') || this.match(TOKEN_TYPES.KEYWORD, 'VARIABLE') || this.match(TOKEN_TYPES.KEYWORD, 'VAR')) {
        this.skipNewlines();
        while (this.peek().type === TOKEN_TYPES.IDENTIFIER || (this.peek().type === TOKEN_TYPES.KEYWORD && this.peek().value === 'TABLEAU')) {
          if (this.peek().type === TOKEN_TYPES.KEYWORD && this.peek().value === 'TABLEAU') {
            declarations.push(this.parseTableauDeclaration());
          } else {
            var names = [this.expect(TOKEN_TYPES.IDENTIFIER).value];
            while (this.match(TOKEN_TYPES.PUNCTUATION, ',')) {
              names.push(this.expect(TOKEN_TYPES.IDENTIFIER).value);
            }
            this.expect(TOKEN_TYPES.PUNCTUATION, ':');
            var typeTok = this.expect(TOKEN_TYPES.KEYWORD, undefined,
              'Erreur de syntaxe : type attendu (Entier, Reel, Chaine, Booleen) après ":".');
            declarations.push({ names: names, varType: typeTok.value });
          }
          this.skipNewlines();
        }
        continue;
      }
      if (this.peek().type === TOKEN_TYPES.KEYWORD && this.peek().value === 'FONCTION') {
        functions.push(this.parseFunctionDeclaration());
        this.skipNewlines();
        continue;
      }
      break;
    }

    // Début bloc principal
    var hasDebuter = false;
    if (this.match(TOKEN_TYPES.KEYWORD, 'DEBUT')) {
      hasDebuter = true;
      this.skipNewlines();
    }

    var statements = this.parseStatements();

    if (hasDebuter) {
      this.skipNewlines();
      this.expect(TOKEN_TYPES.KEYWORD, 'FIN', 'Erreur de syntaxe : mot-clé "Fin" attendu à la fin de l’algorithme.');
    }

    return {
      type: 'Program',
      declarations: declarations,
      functions: functions,
      body: statements
    };
  };

  /** Déclaration de fonction : `Fonction nom(p1 : Type, ...) : TypeRetour` ... `FinFonction`. */
  Parser.prototype.parseFunctionDeclaration = function () {
    var fnTok = this.expect(TOKEN_TYPES.KEYWORD, 'FONCTION');
    var name = this.parseName('fonction');
    var params = [];
    this.expect(TOKEN_TYPES.PUNCTUATION, '(',
      'Erreur de syntaxe à la ligne ' + fnTok.line + ' : liste de paramètres attendue entre parenthèses après ' + name + '.');
    if (!(this.peek().type === TOKEN_TYPES.PUNCTUATION && this.peek().value === ')')) {
      do {
        params.push(this.parseName('paramètre'));
        this.skipOptionalType();
      } while (this.match(TOKEN_TYPES.PUNCTUATION, ','));
    }
    this.expect(TOKEN_TYPES.PUNCTUATION, ')');
    this.skipOptionalType();
    this.skipNewlines();

    this.match(TOKEN_TYPES.KEYWORD, 'DEBUT'); // Début optionnel dans le corps
    var body = this.parseStatements();
    this.skipNewlines();
    if (!this.match(TOKEN_TYPES.KEYWORD, 'FINFONCTION')) {
      this.expect(TOKEN_TYPES.KEYWORD, 'FIN',
        'Erreur de syntaxe : "FinFonction" attendu pour fermer la fonction ' + name + '.');
      this.expect(TOKEN_TYPES.KEYWORD, 'FONCTION');
    }
    return { type: 'FunctionDeclaration', name: name, params: params, body: body, line: fnTok.line };
  };

  Parser.prototype.parseStatements = function () {
    var statements = [];
    this.skipNewlines();

    while (this.pos < this.tokens.length) {
      var tok = this.peek();
      if (tok.type === TOKEN_TYPES.EOF) break;
      if (tok.type === TOKEN_TYPES.KEYWORD && ['FIN', 'FINSI', 'SINON', 'FINPOUR', 'FINTANTQUE', 'JUSQU', 'JUSQUA', 'FINFONCTION'].indexOf(tok.value) !== -1) {
        break;
      }
      // Deux mots : "FIN SI", "FIN POUR", "FIN TANT QUE", "FIN FONCTION"
      if (tok.type === TOKEN_TYPES.KEYWORD && tok.value === 'FIN') {
        var next = this.peek(1);
        if (next && next.type === TOKEN_TYPES.KEYWORD && ['SI', 'POUR', 'TANT', 'FONCTION'].indexOf(next.value) !== -1) {
          break;
        }
      }

      var stmt = this.parseStatement();
      if (stmt) statements.push(stmt);
      this.skipNewlines();
    }

    return statements;
  };

  Parser.prototype.parseStatement = function () {
    var tok = this.peek();

    // Déclaration de tableau : Tableau t[n] : Entiers
    if (tok.type === TOKEN_TYPES.KEYWORD && tok.value === 'TABLEAU') {
      return this.parseTableauDeclaration();
    }

    // Afficher(...) / Ecrire(...)
    if (tok.type === TOKEN_TYPES.KEYWORD && (tok.value === 'AFFICHER' || tok.value === 'ECRIRE')) {
      this.pos++;
      var hasParen = Boolean(this.match(TOKEN_TYPES.PUNCTUATION, '('));
      var args = [];
      if (!hasParen && (this.peek().type === TOKEN_TYPES.NEWLINE || this.peek().type === TOKEN_TYPES.EOF)) {
        args = [];
      } else {
        args.push(this.parseExpression());
        while (this.match(TOKEN_TYPES.PUNCTUATION, ',')) {
          args.push(this.parseExpression());
        }
      }
      if (hasParen) this.expect(TOKEN_TYPES.PUNCTUATION, ')');
      return { type: 'PrintStatement', args: args, line: tok.line };
    }

    // Lire(x, y) ou Lire t[i] — cibles : variables simples ou éléments de tableau
    if (tok.type === TOKEN_TYPES.KEYWORD && tok.value === 'LIRE') {
      this.pos++;
      var hasParenLire = Boolean(this.match(TOKEN_TYPES.PUNCTUATION, '('));
      var targets = [this.parseReadTarget()];
      while (this.match(TOKEN_TYPES.PUNCTUATION, ',')) {
        targets.push(this.parseReadTarget());
      }
      if (hasParenLire) this.expect(TOKEN_TYPES.PUNCTUATION, ')');
      return { type: 'ReadStatement', targets: targets, line: tok.line };
    }

    // Si ... Alors ... [Sinon ...] FinSi
    if (tok.type === TOKEN_TYPES.KEYWORD && tok.value === 'SI') {
      this.pos++;
      var condition = this.parseExpression();
      this.expect(TOKEN_TYPES.KEYWORD, 'ALORS');
      this.skipNewlines();
      var thenBranch = this.parseStatements();
      var elseBranch = null;

      this.skipNewlines();
      if (this.match(TOKEN_TYPES.KEYWORD, 'SINON')) {
        this.skipNewlines();
        elseBranch = this.parseStatements();
      }

      this.skipNewlines();
      if (!this.match(TOKEN_TYPES.KEYWORD, 'FINSI')) {
        this.expect(TOKEN_TYPES.KEYWORD, 'FIN');
        this.expect(TOKEN_TYPES.KEYWORD, 'SI');
      }
      return { type: 'IfStatement', condition: condition, thenBranch: thenBranch, elseBranch: elseBranch, line: tok.line };
    }

    // Pour <var> De <start> A <end> [Pas <step>] Faire ... FinPour
    if (tok.type === TOKEN_TYPES.KEYWORD && tok.value === 'POUR') {
      this.pos++;
      var loopVar = this.expect(TOKEN_TYPES.IDENTIFIER).value;
      this.expectWord('DE');
      var startExpr = this.parseExpression();
      this.expectWord('A');
      var endExpr = this.parseExpression();
      var stepExpr = null;
      if (this.matchWord('PAS')) {
        stepExpr = this.parseExpression();
      }
      this.expect(TOKEN_TYPES.KEYWORD, 'FAIRE');
      this.skipNewlines();
      var forBody = this.parseStatements();
      this.skipNewlines();
      if (!this.match(TOKEN_TYPES.KEYWORD, 'FINPOUR')) {
        this.expect(TOKEN_TYPES.KEYWORD, 'FIN');
        this.expect(TOKEN_TYPES.KEYWORD, 'POUR');
      }
      return {
        type: 'ForStatement',
        variable: loopVar,
        start: startExpr,
        end: endExpr,
        step: stepExpr,
        body: forBody,
        line: tok.line
      };
    }

    // Tant que <cond> Faire ... FinTantQue
    if (tok.type === TOKEN_TYPES.KEYWORD && (tok.value === 'TANT' || tok.value === 'TANTQUE')) {
      this.pos++;
      if (tok.value === 'TANT') {
        this.expect(TOKEN_TYPES.KEYWORD, 'QUE');
      }
      var whileCond = this.parseExpression();
      this.expect(TOKEN_TYPES.KEYWORD, 'FAIRE');
      this.skipNewlines();
      var whileBody = this.parseStatements();
      this.skipNewlines();
      if (!this.match(TOKEN_TYPES.KEYWORD, 'FINTANTQUE')) {
        this.expect(TOKEN_TYPES.KEYWORD, 'FIN');
        if (this.match(TOKEN_TYPES.KEYWORD, 'TANT')) {
          this.match(TOKEN_TYPES.KEYWORD, 'QUE');
        } else {
          this.expect(TOKEN_TYPES.KEYWORD, 'TANTQUE');
        }
      }
      return { type: 'WhileStatement', condition: whileCond, body: whileBody, line: tok.line };
    }

    // Répéter ... Jusqu'à <cond> (arrêt quand la condition est vraie)
    if (tok.type === TOKEN_TYPES.KEYWORD && tok.value === 'REPETER') {
      this.pos++;
      this.skipNewlines();
      var repeatBody = this.parseStatements();
      this.skipNewlines();
      if (!this.match(TOKEN_TYPES.KEYWORD, 'JUSQUA')) {
        this.expect(TOKEN_TYPES.KEYWORD, 'JUSQU',
          'Erreur de syntaxe à la ligne ' + tok.line + ' : "Jusqu\'à" attendu pour fermer le Répéter.');
      }
      var repeatCond = this.parseExpression();
      return { type: 'RepeatStatement', condition: repeatCond, body: repeatBody, line: tok.line };
    }

    // SortirDeBoucle : sortie anticipée de la boucle englobante
    if (tok.type === TOKEN_TYPES.KEYWORD && tok.value === 'SORTIRDEBOUCLE') {
      this.pos++;
      return { type: 'BreakStatement', line: tok.line };
    }

    // Retourner / Renvoyer <expr>
    if (tok.type === TOKEN_TYPES.KEYWORD && (tok.value === 'RETOURNER' || tok.value === 'RENVOYER')) {
      this.pos++;
      var retValue = this.parseExpression();
      return { type: 'ReturnStatement', value: retValue, line: tok.line };
    }

    // Affectation indexée : t[i] <- ... ou m[i][j] <- ...
    if (tok.type === TOKEN_TYPES.IDENTIFIER) {
      var nextTok = this.peek(1);
      if (nextTok.type === TOKEN_TYPES.PUNCTUATION && nextTok.value === '[') {
        this.pos++;
        var indices = [];
        while (this.match(TOKEN_TYPES.PUNCTUATION, '[')) {
          indices.push(this.parseExpression());
          this.expect(TOKEN_TYPES.PUNCTUATION, ']');
        }
        var afterTok = this.peek();
        if (afterTok.type === TOKEN_TYPES.ASSIGN || (afterTok.type === TOKEN_TYPES.OPERATOR && afterTok.value === '=')) {
          this.pos++;
          return { type: 'IndexedAssignmentStatement', name: tok.value, indices: indices, value: this.parseExpression(), line: tok.line };
        }
        throw new Error('Erreur de syntaxe à la ligne ' + afterTok.line + ' : affectation (<-) attendue après ' + tok.value + '[…].');
      }
      if (nextTok.type === TOKEN_TYPES.ASSIGN || (nextTok.type === TOKEN_TYPES.OPERATOR && nextTok.value === '=')) {
        this.pos += 2;
        var expr = this.parseExpression();
        return { type: 'AssignmentStatement', variable: tok.value, value: expr, line: tok.line };
      }
    }

    // Expression autonome (appel de fonction, etc.)
    var loneExpr = this.parseExpression();
    return { type: 'ExpressionStatement', expression: loneExpr, line: tok.line };
  };

  /** Cible de Lire : nom [indices] — `Lire t[i]`, `Lire m[i][j]` ou `Lire x`. */
  Parser.prototype.parseReadTarget = function () {
    var tok = this.peek();
    if (tok.type !== TOKEN_TYPES.IDENTIFIER && tok.type !== TOKEN_TYPES.KEYWORD) {
      throw new Error('Erreur de syntaxe à la ligne ' + tok.line + ' : nom de variable attendu dans Lire().');
    }
    this.pos++;
    var name = tok.value;
    var indices = null;
    if (this.peek().type === TOKEN_TYPES.PUNCTUATION && this.peek().value === '[') {
      indices = [];
      while (this.match(TOKEN_TYPES.PUNCTUATION, '[')) {
        indices.push(this.parseExpression());
        this.expect(TOKEN_TYPES.PUNCTUATION, ']');
      }
    }
    return { name: name, indices: indices };
  };

  Parser.prototype.parseExpression = function () {
    return this.parseLogicalOr();
  };

  Parser.prototype.parseLogicalOr = function () {
    var left = this.parseLogicalAnd();
    while (this.peek().type === TOKEN_TYPES.KEYWORD && this.peek().value === 'OU') {
      var opTok = this.tokens[this.pos++];
      var right = this.parseLogicalAnd();
      left = { type: 'BinaryExpression', operator: 'OU', left: left, right: right, line: opTok.line };
    }
    return left;
  };

  Parser.prototype.parseLogicalAnd = function () {
    var left = this.parseComparison();
    while (this.peek().type === TOKEN_TYPES.KEYWORD && this.peek().value === 'ET') {
      var opTok = this.tokens[this.pos++];
      var right = this.parseComparison();
      left = { type: 'BinaryExpression', operator: 'ET', left: left, right: right, line: opTok.line };
    }
    return left;
  };

  Parser.prototype.parseComparison = function () {
    var left = this.parseAdditive();
    var tok = this.peek();
    var isComp = tok.type === TOKEN_TYPES.OPERATOR && ['=', '==', '!=', '<>', '<', '<=', '>', '>='].indexOf(tok.value) !== -1;
    if (isComp) {
      var opTok = this.tokens[this.pos++];
      var op = opTok.value === '<>' ? '!=' : (opTok.value === '=' ? '==' : opTok.value);
      var right = this.parseAdditive();
      left = { type: 'BinaryExpression', operator: op, left: left, right: right, line: opTok.line };
    }
    return left;
  };

  Parser.prototype.parseAdditive = function () {
    var left = this.parseMultiplicative();
    while (true) {
      var tok = this.peek();
      if (tok.type === TOKEN_TYPES.OPERATOR && (tok.value === '+' || tok.value === '-' || tok.value === '&')) {
        this.pos++;
        var right = this.parseMultiplicative();
        left = { type: 'BinaryExpression', operator: tok.value, left: left, right: right, line: tok.line };
      } else {
        break;
      }
    }
    return left;
  };

  Parser.prototype.parseMultiplicative = function () {
    var left = this.parseUnary();
    while (true) {
      var tok = this.peek();
      var isMul = (tok.type === TOKEN_TYPES.OPERATOR && (tok.value === '*' || tok.value === '/' || tok.value === '%')) ||
                  (tok.type === TOKEN_TYPES.KEYWORD && (tok.value === 'MOD' || tok.value === 'DIV'));
      if (isMul) {
        this.pos++;
        var right = this.parseUnary();
        var op = tok.value === 'MOD' ? 'MOD' : (tok.value === 'DIV' ? 'DIV' : tok.value);
        left = { type: 'BinaryExpression', operator: op, left: left, right: right, line: tok.line };
      } else {
        break;
      }
    }
    return left;
  };

  Parser.prototype.parseUnary = function () {
    var tok = this.peek();
    if ((tok.type === TOKEN_TYPES.KEYWORD && tok.value === 'NON') || (tok.type === TOKEN_TYPES.OPERATOR && tok.value === '-')) {
      this.pos++;
      var arg = this.parseUnary();
      return { type: 'UnaryExpression', operator: tok.value, argument: arg, line: tok.line };
    }
    return this.parsePrimary();
  };

  Parser.prototype.parsePrimary = function () {
    var tok = this.peek();

    if (tok.type === TOKEN_TYPES.NUMBER || tok.type === TOKEN_TYPES.STRING || tok.type === TOKEN_TYPES.BOOLEAN) {
      this.pos++;
      return { type: 'Literal', value: tok.value, line: tok.line };
    }

    if (tok.type === TOKEN_TYPES.IDENTIFIER) {
      this.pos++;

      // Appel de fonction : nom(arguments)
      if (this.peek().type === TOKEN_TYPES.PUNCTUATION && this.peek().value === '(') {
        this.pos++;
        var args = [];
        if (!(this.peek().type === TOKEN_TYPES.PUNCTUATION && this.peek().value === ')')) {
          args.push(this.parseExpression());
          while (this.match(TOKEN_TYPES.PUNCTUATION, ',')) {
            args.push(this.parseExpression());
          }
        }
        this.expect(TOKEN_TYPES.PUNCTUATION, ')');
        return { type: 'CallExpression', name: tok.value, args: args, line: tok.line };
      }

      // Indexation : t[i] ou m[i][j]
      if (this.peek().type === TOKEN_TYPES.PUNCTUATION && this.peek().value === '[') {
        var indices = [];
        while (this.match(TOKEN_TYPES.PUNCTUATION, '[')) {
          indices.push(this.parseExpression());
          this.expect(TOKEN_TYPES.PUNCTUATION, ']');
        }
        return { type: 'IndexExpression', name: tok.value, indices: indices, line: tok.line };
      }

      return { type: 'Identifier', name: tok.value, line: tok.line };
    }

    if (tok.type === TOKEN_TYPES.PUNCTUATION && tok.value === '(') {
      this.pos++;
      var expr = this.parseExpression();
      this.expect(TOKEN_TYPES.PUNCTUATION, ')');
      return expr;
    }

    throw new Error('Erreur de syntaxe à la ligne ' + tok.line + ', colonne ' + tok.col + ' : expression inattendue "' + tok.value + '"');
  };

  // =========================================================================
  // 3. INTERPRÉTEUR (Évaluation de l'AST)
  // =========================================================================

  /** L'entrée standard devient une suite de valeurs séparées par des espaces. */
  function parseStdinTokens(input) {
    if (!input || typeof input !== 'string') return [];
    var s = String(input).replace(/\r\n/g, '\n').replace(/\r/g, '\n').trim();
    return s.length > 0 ? s.split(/\s+/) : [];
  }

  function parseTokenValue(raw) {
    var trimmed = raw.trim();
    if (/^-?\d+$/.test(trimmed)) return parseInt(trimmed, 10);
    if (/^-?\d+\.\d+$/.test(trimmed)) return parseFloat(trimmed);
    return raw;
  }

  /** Reste conforme à la relation dividende = (DIV) × diviseur + reste. */
  function floorMod(left, right) {
    return left - Math.floor(left / right) * right;
  }

  function BreakSignal() {}
  function ReturnSignal(value) { this.value = value; }

  function Interpreter(stdin) {
    this.scopes = [Object.create(null)];
    this.functions = Object.create(null);
    this.stdinTokens = parseStdinTokens(stdin);
    this.stdinIdx = 0;
    this.output = '';
    this.stepCount = 0;
    this.callDepth = 0;
  }

  Interpreter.prototype.eval = function (ast) {
    for (var f = 0; f < ast.functions.length; f++) {
      var fn = ast.functions[f];
      var key = fn.name.toLowerCase();
      if (Object.prototype.hasOwnProperty.call(this.functions, key)) {
        throw new Error('La fonction ' + fn.name + ' est définie deux fois (ligne ' + fn.line + ').');
      }
      this.functions[key] = fn;
    }
    for (var d = 0; d < ast.declarations.length; d++) {
      const declaration = ast.declarations[d];
      if (declaration.type === 'TableauDeclaration') {
        this.execStatement(declaration);
      } else if (declaration.names) {
        // Déclaration scalaire : la variable existe dès le départ (0 ou chaîne vide).
        for (var v = 0; v < declaration.names.length; v++) {
          const isText = declaration.varType === 'CHAINE' || declaration.varType === 'CARACTERE';
          this.scopes[0][declaration.names[v].toLowerCase()] = isText ? '' : 0;
        }
      }
    }
    for (var i = 0; i < ast.body.length; i++) {
      this.execStatement(ast.body[i]);
    }
    return this.output;
  };

  Interpreter.prototype.checkLimit = function (node) {
    this.stepCount++;
    if (this.stepCount > MAX_STEPS) {
      var line = node && node.line ? (' à la ligne ' + node.line) : '';
      throw new Error('Boucle infinie détectée' + line + ' : le programme a dépassé la limite de ' + MAX_STEPS + ' étapes d’exécution.');
    }
  };

  // ---------- Portée des variables ----------

  Interpreter.prototype.lookupScope = function (name) {
    var key = name.toLowerCase();
    for (var i = this.scopes.length - 1; i >= 0; i--) {
      if (Object.prototype.hasOwnProperty.call(this.scopes[i], key)) return this.scopes[i];
    }
    return null;
  };

  Interpreter.prototype.getVariable = function (name, node) {
    var scope = this.lookupScope(name);
    if (!scope) {
      throw new Error('Variable non initialisée : "' + name + '" (ligne ' + (node ? node.line : '?') + ')');
    }
    return scope[name.toLowerCase()];
  };

  /** Écrit dans la portée qui connaît déjà la variable, sinon dans la portée courante. */
  Interpreter.prototype.setVariable = function (name, value) {
    var scope = this.lookupScope(name) || this.scopes[this.scopes.length - 1];
    scope[name.toLowerCase()] = value;
  };

  // ---------- Tableaux ----------

  Interpreter.prototype.declareArray = function (stmt) {
    var sizes = [];
    var total = 1;
    for (var i = 0; i < stmt.dims.length; i++) {
      var size = this.evalExpression(stmt.dims[i]);
      if (typeof size !== 'number' || !Number.isInteger(size)) {
        throw new Error('La taille du tableau ' + stmt.name + ' doit être un entier (ligne ' + stmt.line + ').');
      }
      if (size < 0) {
        throw new Error('La taille du tableau ' + stmt.name + ' ne peut pas être négative (ligne ' + stmt.line + ').');
      }
      if (size > MAX_DIMENSION) {
        throw new Error('Dimension trop grande pour le tableau ' + stmt.name + ' : ' + size + ' (maximum ' + MAX_DIMENSION + ').');
      }
      sizes.push(size);
      total *= size;
    }
    if (total > MAX_ARRAY_CELLS) {
      throw new Error('Tableau ' + stmt.name + ' trop grand : ' + total + ' cases (maximum ' + MAX_ARRAY_CELLS + ').');
    }
    var value;
    if (sizes.length === 1) {
      value = new Array(sizes[0]).fill(0);
    } else {
      value = [];
      for (var r = 0; r < sizes[0]; r++) {
        value.push(new Array(sizes[1]).fill(0));
      }
    }
    this.scopes[this.scopes.length - 1][stmt.name.toLowerCase()] = value;
  };

  /** Résout les indices : renvoie {container, index} pour la dernière dimension. */
  Interpreter.prototype.resolveIndex = function (name, indices, node) {
    var current = this.getVariable(name, node);
    for (var i = 0; i < indices.length; i++) {
      var index = this.evalExpression(indices[i]);
      if (typeof index !== 'number' || !Number.isInteger(index)) {
        throw new Error('L’indice de ' + name + ' doit être un entier (ligne ' + (node ? node.line : '?') + ').');
      }
      if (Array.isArray(current)) {
        if (index < 0 || index >= current.length) {
          throw new Error('Indice ' + index + ' hors des limites du tableau ' + name + ' (0 à ' + (current.length - 1) + ') à la ligne ' + (node ? node.line : '?') + '.');
        }
      } else if (typeof current === 'string') {
        if (index < 0 || index >= current.length) {
          throw new Error('Indice ' + index + ' hors des limites de la chaîne ' + name + ' (0 à ' + (current.length - 1) + ') à la ligne ' + (node ? node.line : '?') + '.');
        }
      } else {
        throw new Error('Seuls un tableau ou une chaîne s’indexent : ' + name + ' (ligne ' + (node ? node.line : '?') + ').');
      }
      if (i === indices.length - 1) {
        return { container: current, index: index, isString: typeof current === 'string' };
      }
      current = current[index];
    }
    return null;
  };

  Interpreter.prototype.readIndex = function (name, indices, node) {
    var spot = this.resolveIndex(name, indices, node);
    return spot.container[spot.index];
  };

  Interpreter.prototype.writeIndex = function (name, indices, value, node) {
    var spot = this.resolveIndex(name, indices, node);
    if (spot.isString) {
      throw new Error('Une chaîne ne se modifie pas case par case : reconstruisez-la par concaténation (ligne ' + (node ? node.line : '?') + ').');
    }
    if (Array.isArray(value)) {
      throw new Error('Un tableau entier ne s’affecte pas à une case : copiez élément par élément (ligne ' + (node ? node.line : '?') + ').');
    }
    spot.container[spot.index] = value;
  };

  // ---------- Instructions ----------

  Interpreter.prototype.execStatement = function (stmt) {
    this.checkLimit(stmt);

    switch (stmt.type) {
      case 'TableauDeclaration':
        this.declareArray(stmt);
        break;

      case 'PrintStatement':
        var parts = [];
        for (var i = 0; i < stmt.args.length; i++) {
          var printed = this.evalExpression(stmt.args[i]);
          if (Array.isArray(printed)) {
            throw new Error('Un tableau ne s’affiche pas directement : parcourez ses éléments (ligne ' + stmt.line + ').');
          }
          parts.push(printed);
        }
        this.appendOutput(parts.join(' ') + '\n');
        break;

      case 'ReadStatement':
        for (var j = 0; j < stmt.targets.length; j++) {
          var target = stmt.targets[j];
          if (this.stdinIdx >= this.stdinTokens.length) {
            throw new Error('Entrée standard épuisée : plus rien à lire pour "' + target.name + '" (ligne ' + stmt.line + ').');
          }
          var parsed = parseTokenValue(this.stdinTokens[this.stdinIdx++]);
          if (target.indices) {
            this.writeIndex(target.name, target.indices, parsed, stmt);
          } else {
            this.setVariable(target.name, parsed);
          }
        }
        break;

      case 'AssignmentStatement':
        this.setVariable(stmt.variable, this.evalExpression(stmt.value));
        break;

      case 'IndexedAssignmentStatement':
        var cellValue = this.evalExpression(stmt.value);
        this.writeIndex(stmt.name, stmt.indices, cellValue, stmt);
        break;

      case 'IfStatement':
        var cond = this.evalExpression(stmt.condition);
        if (cond) {
          for (var k = 0; k < stmt.thenBranch.length; k++) {
            this.execStatement(stmt.thenBranch[k]);
          }
        } else if (stmt.elseBranch) {
          for (var l = 0; l < stmt.elseBranch.length; l++) {
            this.execStatement(stmt.elseBranch[l]);
          }
        }
        break;

      case 'WhileStatement':
        while (this.evalExpression(stmt.condition)) {
          this.checkLimit(stmt);
          try {
            for (var m = 0; m < stmt.body.length; m++) {
              this.execStatement(stmt.body[m]);
            }
          } catch (err) {
            if (err instanceof BreakSignal) break;
            throw err;
          }
        }
        break;

      case 'RepeatStatement':
        do {
          this.checkLimit(stmt);
          try {
            for (var r = 0; r < stmt.body.length; r++) {
              this.execStatement(stmt.body[r]);
            }
          } catch (err) {
            if (err instanceof BreakSignal) break;
            throw err;
          }
          var repeatCond = this.evalExpression(stmt.condition);
          if (repeatCond) break; // Jusqu'à : la boucle s'arrête quand la condition devient vraie
        } while (true);
        break;

      case 'ForStatement':
        var startV = this.evalExpression(stmt.start);
        var endV = this.evalExpression(stmt.end);
        // Comme en Pascal : sans Pas explicite, la boucle est croissante et
        // ne fait aucun tour si le départ dépasse l'arrivée ; la descente
        // s'écrit « Pas -1 ».
        var stepV = stmt.step ? this.evalExpression(stmt.step) : 1;
        if (stepV === 0) {
          throw new Error('Le pas d’une boucle Pour ne peut pas être nul (ligne ' + stmt.line + ').');
        }
        var key = stmt.variable.toLowerCase();
        var scope = this.lookupScope(stmt.variable) || this.scopes[this.scopes.length - 1];
        scope[key] = startV;
        while ((stepV > 0 && scope[key] <= endV) || (stepV < 0 && scope[key] >= endV)) {
          this.checkLimit(stmt);
          try {
            for (var n = 0; n < stmt.body.length; n++) {
              this.execStatement(stmt.body[n]);
            }
          } catch (err) {
            if (err instanceof BreakSignal) break;
            throw err;
          }
          scope[key] += stepV;
        }
        break;

      case 'BreakStatement':
        throw new BreakSignal();

      case 'ReturnStatement':
        if (this.scopes.length === 1) {
          throw new Error('Retourner n’a de sens que dans une fonction (ligne ' + stmt.line + ').');
        }
        throw new ReturnSignal(this.evalExpression(stmt.value));

      case 'ExpressionStatement':
        this.evalExpression(stmt.expression);
        break;

      default:
        throw new Error('Instruction non reconnue : ' + stmt.type);
    }
  };

  Interpreter.prototype.appendOutput = function (text) {
    if (this.output.length + text.length > MAX_STRING_LENGTH) {
      throw new Error('Sortie trop volumineuse : l’algorithme affiche plus de ' + MAX_STRING_LENGTH + ' caractères.');
    }
    this.output += text;
  };

  // ---------- Fonctions ----------

  Interpreter.prototype.callFunction = function (name, args, node) {
    var fn = this.functions[name.toLowerCase()];
    if (!fn) return undefined; // laisse l'appelant chercher les prédéfinis
    if (args.length !== fn.params.length) {
      throw new Error('La fonction ' + fn.name + ' attend ' + fn.params.length + ' argument(s), ' + args.length + ' fourni(s) (ligne ' + (node ? node.line : '?') + ').');
    }
    if (this.callDepth + 1 > MAX_CALL_DEPTH) {
      throw new Error('Profondeur de récursion dépassée : plus de ' + MAX_CALL_DEPTH + ' appels imbriqués de ' + fn.name + ' (ligne ' + (node ? node.line : '?') + ').');
    }
    var frame = Object.create(null);
    for (var p = 0; p < fn.params.length; p++) {
      frame[fn.params[p].toLowerCase()] = args[p];
    }
    this.scopes.push(frame);
    this.callDepth++;
    var result;
    var fellThrough = true;
    try {
      for (var s = 0; s < fn.body.length; s++) {
        this.execStatement(fn.body[s]);
      }
    } catch (err) {
      if (err instanceof ReturnSignal) {
        result = err.value;
        fellThrough = false;
      } else {
        throw err;
      }
    } finally {
      this.scopes.pop();
      this.callDepth--;
    }
    if (fellThrough) {
      throw new Error('La fonction ' + fn.name + ' ne renvoie aucune valeur : une instruction Retourner manque (ligne ' + fn.line + ').');
    }
    return result;
  };

  Interpreter.prototype.callBuiltin = function (name, args, node) {
    var key = normalizeKeyword(name);
    if (key === 'LONGUEUR') {
      if (args.length !== 1) {
        throw new Error('Longueur attend un seul argument (ligne ' + (node ? node.line : '?') + ').');
      }
      var arg = args[0];
      if (typeof arg === 'string' || Array.isArray(arg)) return arg.length;
      throw new Error('Longueur attend une chaîne ou un tableau (ligne ' + (node ? node.line : '?') + ').');
    }
    if (key === 'FORMATER') {
      if (args.length !== 2) {
        throw new Error('Formater attend un nombre et un nombre de décimales (ligne ' + (node ? node.line : '?') + ').');
      }
      var number = args[0];
      var decimals = args[1];
      if (typeof number !== 'number' || typeof decimals !== 'number' || !Number.isInteger(decimals) || decimals < 0 || decimals > 12) {
        throw new Error('Formater(nombre, décimales) : décimales de 0 à 12 (ligne ' + (node ? node.line : '?') + ').');
      }
      return number.toFixed(decimals);
    }
    if (key === 'ABS') {
      if (args.length !== 1 || typeof args[0] !== 'number') {
        throw new Error('Abs attend un nombre (ligne ' + (node ? node.line : '?') + ').');
      }
      return Math.abs(args[0]);
    }
    return undefined;
  };

  // ---------- Expressions ----------

  Interpreter.prototype.evalExpression = function (expr) {
    switch (expr.type) {
      case 'Literal':
        return expr.value;

      case 'Identifier':
        return this.getVariable(expr.name, expr);

      case 'IndexExpression':
        return this.readIndex(expr.name, expr.indices, expr);

      case 'CallExpression': {
        var args = [];
        for (var a = 0; a < expr.args.length; a++) {
          args.push(this.evalExpression(expr.args[a]));
        }
        var userResult = this.callFunction(expr.name, args, expr);
        if (userResult !== undefined || this.functions[expr.name.toLowerCase()]) {
          return userResult;
        }
        var builtin = this.callBuiltin(expr.name, args, expr);
        if (builtin === undefined && normalizeKeyword(expr.name) !== 'LONGUEUR' &&
            normalizeKeyword(expr.name) !== 'FORMATER' && normalizeKeyword(expr.name) !== 'ABS') {
          throw new Error('Fonction inconnue : "' + expr.name + '" (ligne ' + expr.line + ').');
        }
        return builtin;
      }

      case 'UnaryExpression':
        var arg = this.evalExpression(expr.argument);
        if (expr.operator === 'NON') return !arg;
        if (expr.operator === '-') return -arg;
        throw new Error('Opérateur unaire inconnu : ' + expr.operator);

      case 'BinaryExpression': {
        // ET et OU sont paresseux : la seconde opérande n'est évaluée que
        // si la première ne suffit pas à conclure (condition de garde).
        if (expr.operator === 'ET') {
          var leftEt = this.evalExpression(expr.left);
          if (!leftEt) return false;
          return Boolean(this.evalExpression(expr.right));
        }
        if (expr.operator === 'OU') {
          var leftOu = this.evalExpression(expr.left);
          if (leftOu) return true;
          return Boolean(this.evalExpression(expr.right));
        }
        var left = this.evalExpression(expr.left);
        var right = this.evalExpression(expr.right);
        switch (expr.operator) {
          case '+':
            if (Array.isArray(left) || Array.isArray(right)) {
              throw new Error('Un tableau ne se concatène pas : parcourez ses éléments (ligne ' + expr.line + ').');
            }
            this.guardString(left, right, expr.line);
            return typeof left === 'string' || typeof right === 'string' ? (String(left) + String(right)) : (left + right);
          case '&':
            if (Array.isArray(left) || Array.isArray(right)) {
              throw new Error('Un tableau ne se concatène pas : parcourez ses éléments (ligne ' + expr.line + ').');
            }
            this.guardString(left, right, expr.line);
            return String(left) + String(right);
          case '-':
            return left - right;
          case '*':
            return left * right;
          case '/':
            if (right === 0) throw new Error('Division par zéro à la ligne ' + expr.line);
            return left / right;
          case 'DIV':
            if (right === 0) throw new Error('Division entière par zéro à la ligne ' + expr.line);
            return Math.floor(left / right);
          case '%':
          case 'MOD':
            if (right === 0) throw new Error('Modulo par zéro à la ligne ' + expr.line);
            return floorMod(left, right);
          case '==':
            return left === right;
          case '!=':
            return left !== right;
          case '<':
            return left < right;
          case '<=':
            return left <= right;
          case '>':
            return left > right;
          case '>=':
            return left >= right;
          default:
            throw new Error('Opérateur binaire non supporté : ' + expr.operator);
        }
      }

      default:
        throw new Error('Expression inconnue : ' + expr.type);
    }
  };

  /** Une chaîne construite ne dépasse jamais MAX_STRING_LENGTH caractères. */
  Interpreter.prototype.guardString = function (left, right, line) {
    var total = (typeof left === 'string' ? left.length : String(left).length) +
                (typeof right === 'string' ? right.length : String(right).length);
    if (total > MAX_STRING_LENGTH) {
      throw new Error('Chaîne trop longue : plus de ' + MAX_STRING_LENGTH + ' caractères (ligne ' + line + ').');
    }
  };

  // =========================================================================
  // 4. API PUBLIQUE DU MOTEUR
  // =========================================================================

  function execute(code, stdin, options) {
    var startTime = Date.now();
    try {
      var lexer = new Lexer(code);
      var tokens = lexer.tokenize();
      var parser = new Parser(tokens);
      var ast = parser.parse();
      var interpreter = new Interpreter(stdin);
      var output = interpreter.eval(ast);
      var elapsed = (Date.now() - startTime) / 1000;

      return Promise.resolve(createResult({
        status: 'success',
        stdout: output,
        stderr: '',
        compileError: '',
        exitCode: 0,
        executionTime: elapsed,
        provenance: 'browser',
        provider: 'Interpréteur Pseudo-code (Navigateur)',
        userMessage: 'Algorithme exécuté avec succès.'
      }));
    } catch (err) {
      var elapsedErr = (Date.now() - startTime) / 1000;
      var msg = err && err.message ? err.message : String(err);
      var isSyntax = msg.indexOf('Erreur de syntaxe') !== -1 || msg.indexOf('Erreur lexicale') !== -1;

      return Promise.resolve(createResult({
        status: isSyntax ? 'compile_error' : 'runtime_error',
        stdout: '',
        stderr: isSyntax ? '' : msg,
        compileError: isSyntax ? msg : '',
        exitCode: 1,
        executionTime: elapsedErr,
        provenance: 'browser',
        provider: 'Interpréteur Pseudo-code (Navigateur)',
        userMessage: isSyntax ? 'Erreur dans la structure de l’algorithme.' : 'Erreur lors de l’exécution du pseudo-code.'
      }));
    }
  }

  return {
    Lexer: Lexer,
    Parser: Parser,
    Interpreter: Interpreter,
    execute: execute,
    LIMITS: {
      MAX_STEPS: MAX_STEPS,
      MAX_CALL_DEPTH: MAX_CALL_DEPTH,
      MAX_ARRAY_CELLS: MAX_ARRAY_CELLS,
      MAX_DIMENSION: MAX_DIMENSION,
      MAX_STRING_LENGTH: MAX_STRING_LENGTH
    }
  };
});

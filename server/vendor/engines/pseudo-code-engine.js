/**
 * Interpréteur pédagogique de pseudo-code algorithmique en français.
 * Architecture : Lexer -> Parser (AST) -> Interpréteur avec protection contre les boucles infinies.
 * Compatible navigateur et Node.js.
 */
(function (root, factory) {
  if (typeof module === 'object' && module.exports) {
    module.exports = factory(require('./engine-interface'));
  } else {
    root.PseudoCodeEngine = factory(root.ExecutionInterface);
  }
})(typeof globalThis !== 'undefined' ? globalThis : this, function (ExecutionInterface) {
  'use strict';

  var MAX_STEPS = 100000; // Protection contre les boucles infinies
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
    'REPETER', 'JUSQU',
    'AFFICHER', 'ECRIRE', 'LIRE',
    'ENTIER', 'REEL', 'CHAINE', 'BOOLEEN', 'CARACTERE',
    'VRAI', 'FAUX', 'TRUE', 'FALSE',
    'ET', 'OU', 'NON', 'MOD', 'DIV',
    'FONCTION', 'FINFONCTION', 'RETOURNER', 'RENVOYER'
  ]);

  function normalizeKeyword(str) {
    return str
      .toUpperCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '');
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
      if ((ch >= 'a' && ch <= 'z') || (ch >= 'A' && ch <= 'Z') || ch === '_' || ch >= '\u00C0') {
        var idStr = '';
        while (this.pos < this.length) {
          var c2 = this.currentChar();
          if ((c2 >= 'a' && c2 <= 'z') || (c2 >= 'A' && c2 <= 'Z') || (c2 >= '0' && c2 <= '9') || c2 === '_' || c2 >= '\u00C0') {
            idStr += c2;
            this.advance();
          } else {
            break;
          }
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

  Parser.prototype.parse = function () {
    this.skipNewlines();

    // En-tête optionnel : ALGORITHME <nom>
    if (this.match(TOKEN_TYPES.KEYWORD, 'ALGORITHME') || this.match(TOKEN_TYPES.KEYWORD, 'ALGO')) {
      if (this.peek().type === TOKEN_TYPES.IDENTIFIER || this.peek().type === TOKEN_TYPES.STRING) {
        this.pos++;
      }
      this.skipNewlines();
    }

    // Section optionnelle : VARIABLES ...
    var declarations = [];
    if (this.match(TOKEN_TYPES.KEYWORD, 'VARIABLES') || this.match(TOKEN_TYPES.KEYWORD, 'VARIABLE') || this.match(TOKEN_TYPES.KEYWORD, 'VAR')) {
      this.skipNewlines();
      while (this.peek().type === TOKEN_TYPES.IDENTIFIER) {
        var names = [this.expect(TOKEN_TYPES.IDENTIFIER).value];
        while (this.match(TOKEN_TYPES.PUNCTUATION, ',')) {
          names.push(this.expect(TOKEN_TYPES.IDENTIFIER).value);
        }
        this.expect(TOKEN_TYPES.PUNCTUATION, ':');
        var typeTok = this.expect(TOKEN_TYPES.KEYWORD);
        declarations.push({ names: names, varType: typeTok.value });
        this.skipNewlines();
      }
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
      body: statements
    };
  };

  Parser.prototype.parseStatements = function () {
    var statements = [];
    this.skipNewlines();

    while (this.pos < this.tokens.length) {
      var tok = this.peek();
      if (tok.type === TOKEN_TYPES.EOF) break;
      if (tok.type === TOKEN_TYPES.KEYWORD && ['FIN', 'FINSI', 'SINON', 'FINPOUR', 'FINTANTQUE', 'JUSQU'].indexOf(tok.value) !== -1) {
        break;
      }
      // Deux mots : "FIN SI", "FIN POUR", "FIN TANT QUE"
      if (tok.type === TOKEN_TYPES.KEYWORD && tok.value === 'FIN') {
        var next = this.peek(1);
        if (next && next.type === TOKEN_TYPES.KEYWORD && ['SI', 'POUR', 'TANT'].indexOf(next.value) !== -1) {
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

    // Lire(...)
    if (tok.type === TOKEN_TYPES.KEYWORD && tok.value === 'LIRE') {
      this.pos++;
      var hasParenLire = Boolean(this.match(TOKEN_TYPES.PUNCTUATION, '('));
      var readVar = this.peek();
      if (readVar.type !== TOKEN_TYPES.IDENTIFIER && readVar.type !== TOKEN_TYPES.KEYWORD) {
        throw new Error('Erreur de syntaxe à la ligne ' + readVar.line + ' : nom de variable attendu dans Lire().');
      }
      this.pos++;
      var vars = [readVar.value];
      while (this.match(TOKEN_TYPES.PUNCTUATION, ',')) {
        var vTok = this.peek();
        if (vTok.type !== TOKEN_TYPES.IDENTIFIER && vTok.type !== TOKEN_TYPES.KEYWORD) {
          throw new Error('Erreur de syntaxe à la ligne ' + vTok.line + ' : nom de variable attendu dans Lire().');
        }
        this.pos++;
        vars.push(vTok.value);
      }
      if (hasParenLire) this.expect(TOKEN_TYPES.PUNCTUATION, ')');
      return { type: 'ReadStatement', variables: vars, line: tok.line };
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

    // Affectation : <id> <- <expr>  ou  <id> := <expr>  ou  <id> = <expr>
    if (tok.type === TOKEN_TYPES.IDENTIFIER) {
      var nextTok = this.peek(1);
      if (nextTok.type === TOKEN_TYPES.ASSIGN || (nextTok.type === TOKEN_TYPES.OPERATOR && nextTok.value === '=')) {
        this.pos += 2;
        var expr = this.parseExpression();
        return { type: 'AssignmentStatement', variable: tok.value, value: expr, line: tok.line };
      }
    }

    // Expression autonome
    var loneExpr = this.parseExpression();
    return { type: 'ExpressionStatement', expression: loneExpr, line: tok.line };
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
        var op = tok.value === 'MOD' ? '%' : (tok.value === 'DIV' ? 'DIV' : tok.value);
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

  function Interpreter(stdin) {
    this.variables = Object.create(null);
    this.stdinLines = stdin ? String(stdin).split('\n') : [];
    this.stdinIdx = 0;
    this.output = '';
    this.stepCount = 0;
  }

  Interpreter.prototype.eval = function (ast) {
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

  Interpreter.prototype.execStatement = function (stmt) {
    this.checkLimit(stmt);

    switch (stmt.type) {
      case 'PrintStatement':
        var parts = [];
        for (var i = 0; i < stmt.args.length; i++) {
          parts.push(this.evalExpression(stmt.args[i]));
        }
        this.output += parts.join(' ') + '\n';
        break;

      case 'ReadStatement':
        for (var j = 0; j < stmt.variables.length; j++) {
          var varName = stmt.variables[j];
          var rawVal = this.stdinIdx < this.stdinLines.length ? this.stdinLines[this.stdinIdx++] : '';
          var trimmed = rawVal.trim();
          var parsed;
          if (/^-?\d+$/.test(trimmed)) {
            parsed = parseInt(trimmed, 10);
          } else if (/^-?\d+\.\d+$/.test(trimmed)) {
            parsed = parseFloat(trimmed);
          } else {
            parsed = rawVal;
          }
          this.variables[varName.toLowerCase()] = parsed;
        }
        break;

      case 'AssignmentStatement':
        var val = this.evalExpression(stmt.value);
        this.variables[stmt.variable.toLowerCase()] = val;
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
          for (var m = 0; m < stmt.body.length; m++) {
            this.execStatement(stmt.body[m]);
          }
        }
        break;

      case 'ForStatement':
        var startV = this.evalExpression(stmt.start);
        var endV = this.evalExpression(stmt.end);
        var stepV = stmt.step ? this.evalExpression(stmt.step) : (startV <= endV ? 1 : -1);
        var key = stmt.variable.toLowerCase();

        this.variables[key] = startV;
        while ((stepV > 0 && this.variables[key] <= endV) || (stepV < 0 && this.variables[key] >= endV)) {
          this.checkLimit(stmt);
          for (var n = 0; n < stmt.body.length; n++) {
            this.execStatement(stmt.body[n]);
          }
          this.variables[key] += stepV;
        }
        break;

      case 'ExpressionStatement':
        this.evalExpression(stmt.expression);
        break;

      default:
        throw new Error('Instruction non reconnue : ' + stmt.type);
    }
  };

  Interpreter.prototype.evalExpression = function (expr) {
    switch (expr.type) {
      case 'Literal':
        return expr.value;

      case 'Identifier':
        var k = expr.name.toLowerCase();
        if (k in this.variables) {
          return this.variables[k];
        }
        throw new Error('Variable non initialisée : "' + expr.name + '" (ligne ' + expr.line + ')');

      case 'UnaryExpression':
        var arg = this.evalExpression(expr.argument);
        if (expr.operator === 'NON') return !arg;
        if (expr.operator === '-') return -arg;
        throw new Error('Opérateur unaire inconnu : ' + expr.operator);

      case 'BinaryExpression':
        var left = this.evalExpression(expr.left);
        var right = this.evalExpression(expr.right);
        switch (expr.operator) {
          case '+':
            return typeof left === 'string' || typeof right === 'string' ? (String(left) + String(right)) : (left + right);
          case '&':
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
            if (right === 0) throw new Error('Modulo par zéro à la ligne ' + expr.line);
            return left % right;
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
          case 'ET':
            return Boolean(left && right);
          case 'OU':
            return Boolean(left || right);
          default:
            throw new Error('Opérateur binaire non supporté : ' + expr.operator);
        }

      default:
        throw new Error('Expression inconnue : ' + expr.type);
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
    execute: execute
  };
});

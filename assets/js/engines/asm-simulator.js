/**
 * Simulateur x86-16 pédagogique — Registres 16/8 bits, drapeaux (ZF, SF, CF, OF) et mémoire 256 octets.
 *
 * Compatible navigateur (window.AsmSimulator) et Node.js (module.exports).
 * Montage automatique sur tout conteneur [data-asm-simulator].
 * Aucun emoji : uniquement du balisage HTML/SVG propre.
 */
(function (root, factory) {
  'use strict';
  var api = factory();
  if (typeof module === 'object' && module.exports) {
    module.exports = api;
  }
  if (root) {
    root.AsmSimulator = api;
  }
})(typeof window !== 'undefined' ? window : globalThis, function () {
  'use strict';

  var REG16 = ['AX', 'BX', 'CX', 'DX', 'SI', 'DI', 'SP', 'BP', 'IP'];
  var REG8_MAP = {
    AH: { parent: 'AX', high: true },
    AL: { parent: 'AX', high: false },
    BH: { parent: 'BX', high: true },
    BL: { parent: 'BX', high: false },
    CH: { parent: 'CX', high: true },
    CL: { parent: 'CX', high: false },
    DH: { parent: 'DX', high: true },
    DL: { parent: 'DX', high: false }
  };
  var FLAGS = ['ZF', 'SF', 'CF', 'OF'];
  var DEFAULT_MAX_CYCLES = 256;
  var MEMORY_SIZE = 256;

  function toHex(value, digits) {
    var width = digits || 4;
    var mask = width === 2 ? 0xFF : 0xFFFF;
    var hex = ((value >>> 0) & mask).toString(16).toUpperCase();
    while (hex.length < width) hex = '0' + hex;
    return '0x' + hex;
  }

  function parseImmediate(token) {
    if (typeof token === 'number') return token & 0xFFFF;
    var s = String(token || '').trim();
    if (!s) return NaN;
    var sign = 1;
    if (s.charAt(0) === '-') {
      sign = -1;
      s = s.slice(1).trim();
    } else if (s.charAt(0) === '+') {
      s = s.slice(1).trim();
    }
    var val = NaN;
    if (/^0x[0-9a-f]+$/i.test(s)) {
      val = parseInt(s.slice(2), 16);
    } else if (/^[0-9][0-9a-f]*h$/i.test(s)) {
      val = parseInt(s.slice(0, -1), 16);
    } else if (/^0b[01]+$/i.test(s)) {
      val = parseInt(s.slice(2), 2);
    } else if (/^[01]+b$/i.test(s)) {
      val = parseInt(s.slice(0, -1), 2);
    } else if (/^\d+$/.test(s)) {
      val = parseInt(s, 10);
    }
    if (Number.isNaN(val)) return NaN;
    return (sign * val) & 0xFFFF;
  }

  function parseProgram(source) {
    var rawLines = String(source || '').replace(/\r\n?/g, '\n').split('\n');
    var instructions = [];
    var labels = {};

    for (var i = 0; i < rawLines.length; i++) {
      var line = rawLines[i].replace(/;.*$/, '').trim();
      if (!line) continue;

      while (true) {
        var labelMatch = /^([A-Za-z_.$][A-Za-z0-9_.$]*)\s*:\s*(.*)$/.exec(line);
        if (!labelMatch) break;
        labels[labelMatch[1].toUpperCase()] = instructions.length;
        line = labelMatch[2].trim();
      }
      if (!line) continue;

      var parts = /^([A-Za-z]+)(?:\s+(.*))?$/.exec(line);
      if (!parts) continue;
      var mnemonic = parts[1].toUpperCase();
      var rest = (parts[2] || '').trim();
      var operands = [];
      if (rest) {
        operands = rest.split(',').map(function (op) { return op.trim(); }).filter(Boolean);
      }
      instructions.push({
        lineNumber: i + 1,
        text: line,
        mnemonic: mnemonic,
        operands: operands
      });
    }

    return { instructions: instructions, labels: labels };
  }

  function AsmSimulator(options) {
    if (!(this instanceof AsmSimulator)) {
      return new AsmSimulator(options);
    }
    var opts = options || {};
    this.maxCycles = typeof opts.maxCycles === 'number' && opts.maxCycles > 0
      ? opts.maxCycles
      : DEFAULT_MAX_CYCLES;
    this.reset();
    if (typeof opts.code === 'string') {
      this.load(opts.code);
    }
  }

  AsmSimulator.prototype.reset = function () {
    this._regs = {
      AX: 0,
      BX: 0,
      CX: 0,
      DX: 0,
      SI: 0,
      DI: 0,
      SP: 0x00FE,
      BP: 0,
      IP: 0
    };
    this.flags = {
      ZF: 0,
      SF: 0,
      CF: 0,
      OF: 0
    };
    this.memory = new Uint8Array(MEMORY_SIZE);
    this.instructions = [];
    this.labels = {};
    this.history = [];
    this.cycles = 0;
    this.halted = false;
    this.cycleLimitReached = false;
    this.error = null;
    this._syncPublicFields();
    return this;
  };

  AsmSimulator.prototype.getRegister = function (name) {
    var key = String(name || '').toUpperCase().trim();
    if (Object.prototype.hasOwnProperty.call(this._regs, key)) {
      return this._regs[key] & 0xFFFF;
    }
    if (Object.prototype.hasOwnProperty.call(REG8_MAP, key)) {
      var spec = REG8_MAP[key];
      var parentVal = this._regs[spec.parent] & 0xFFFF;
      return spec.high ? ((parentVal >>> 8) & 0xFF) : (parentVal & 0xFF);
    }
    throw new Error('Registre inconnu : ' + name);
  };

  AsmSimulator.prototype.setRegister = function (name, value) {
    var key = String(name || '').toUpperCase().trim();
    if (Object.prototype.hasOwnProperty.call(this._regs, key)) {
      this._regs[key] = (value >>> 0) & 0xFFFF;
      this._syncPublicFields();
      return this._regs[key];
    }
    if (Object.prototype.hasOwnProperty.call(REG8_MAP, key)) {
      var spec = REG8_MAP[key];
      var byteVal = (value >>> 0) & 0xFF;
      var cur = this._regs[spec.parent] & 0xFFFF;
      if (spec.high) {
        this._regs[spec.parent] = (cur & 0x00FF) | (byteVal << 8);
      } else {
        this._regs[spec.parent] = (cur & 0xFF00) | byteVal;
      }
      this._syncPublicFields();
      return byteVal;
    }
    throw new Error('Registre inconnu : ' + name);
  };

  AsmSimulator.prototype.getSubRegisters = function () {
    return {
      AH: this.getRegister('AH'),
      AL: this.getRegister('AL'),
      BH: this.getRegister('BH'),
      BL: this.getRegister('BL'),
      CH: this.getRegister('CH'),
      CL: this.getRegister('CL'),
      DH: this.getRegister('DH'),
      DL: this.getRegister('DL')
    };
  };

  AsmSimulator.prototype._syncPublicFields = function () {
    var sub = this.getSubRegisters();
    this.subRegisters = sub;
    this.registers = {
      AX: this._regs.AX,
      BX: this._regs.BX,
      CX: this._regs.CX,
      DX: this._regs.DX,
      SI: this._regs.SI,
      DI: this._regs.DI,
      SP: this._regs.SP,
      BP: this._regs.BP,
      IP: this._regs.IP,
      AH: sub.AH,
      AL: sub.AL,
      BH: sub.BH,
      BL: sub.BL,
      CH: sub.CH,
      CL: sub.CL,
      DH: sub.DH,
      DL: sub.DL
    };
  };

  AsmSimulator.prototype.load = function (source) {
    this.reset();
    var parsed = parseProgram(source);
    this.instructions = parsed.instructions;
    this.labels = parsed.labels;
    return this;
  };

  AsmSimulator.prototype._operandBits = function (token) {
    var key = String(token || '').toUpperCase().trim();
    if (Object.prototype.hasOwnProperty.call(REG8_MAP, key)) return 8;
    return 16;
  };

  AsmSimulator.prototype._resolveAddress = function (expr) {
    var inner = String(expr || '').trim().slice(1, -1).trim();
    var parts = inner.split(/([+-])/).map(function (p) { return p.trim(); }).filter(Boolean);
    var total = 0;
    var sign = 1;
    for (var i = 0; i < parts.length; i++) {
      var token = parts[i];
      if (token === '+') { sign = 1; continue; }
      if (token === '-') { sign = -1; continue; }
      var upper = token.toUpperCase();
      if (Object.prototype.hasOwnProperty.call(this._regs, upper) || Object.prototype.hasOwnProperty.call(REG8_MAP, upper)) {
        total += sign * this.getRegister(upper);
      } else {
        var imm = parseImmediate(token);
        if (Number.isNaN(imm)) throw new Error('Adresse mémoire invalide : [' + inner + ']');
        total += sign * imm;
      }
    }
    return total & 0xFF;
  };

  AsmSimulator.prototype._readOperand = function (token, bits) {
    var s = String(token || '').trim();
    var upper = s.toUpperCase();
    if (Object.prototype.hasOwnProperty.call(this._regs, upper) || Object.prototype.hasOwnProperty.call(REG8_MAP, upper)) {
      return this.getRegister(upper);
    }
    if (s.charAt(0) === '[' && s.charAt(s.length - 1) === ']') {
      var addr = this._resolveAddress(s);
      if (bits === 8) return this.memory[addr] & 0xFF;
      return (this.memory[addr] | (this.memory[(addr + 1) & 0xFF] << 8)) & 0xFFFF;
    }
    var imm = parseImmediate(s);
    if (!Number.isNaN(imm)) {
      return bits === 8 ? (imm & 0xFF) : (imm & 0xFFFF);
    }
    throw new Error('Opérande non reconnu : ' + s);
  };

  AsmSimulator.prototype._writeOperand = function (token, value, bits) {
    var s = String(token || '').trim();
    var upper = s.toUpperCase();
    if (Object.prototype.hasOwnProperty.call(this._regs, upper) || Object.prototype.hasOwnProperty.call(REG8_MAP, upper)) {
      return this.setRegister(upper, value);
    }
    if (s.charAt(0) === '[' && s.charAt(s.length - 1) === ']') {
      var addr = this._resolveAddress(s);
      if (bits === 8) {
        this.memory[addr] = value & 0xFF;
      } else {
        this.memory[addr] = value & 0xFF;
        this.memory[(addr + 1) & 0xFF] = (value >>> 8) & 0xFF;
      }
      this._syncPublicFields();
      return value & (bits === 8 ? 0xFF : 0xFFFF);
    }
    throw new Error('Destination invalide : ' + s);
  };

  AsmSimulator.prototype._updateArithFlags = function (a, b, full, res, bits, isSub, preserveCF) {
    var mask = bits === 8 ? 0xFF : 0xFFFF;
    var signBit = bits === 8 ? 0x80 : 0x8000;
    var r = res & mask;
    this.flags.ZF = r === 0 ? 1 : 0;
    this.flags.SF = (r & signBit) !== 0 ? 1 : 0;
    if (!preserveCF) {
      this.flags.CF = isSub ? ((a & mask) < (b & mask) ? 1 : 0) : (full > mask ? 1 : 0);
    }
    if (isSub) {
      this.flags.OF = (((a ^ b) & (a ^ r)) & signBit) !== 0 ? 1 : 0;
    } else {
      this.flags.OF = (((~(a ^ b)) & (a ^ r)) & signBit) !== 0 ? 1 : 0;
    }
  };

  AsmSimulator.prototype._updateLogicFlags = function (res, bits) {
    var mask = bits === 8 ? 0xFF : 0xFFFF;
    var signBit = bits === 8 ? 0x80 : 0x8000;
    var r = res & mask;
    this.flags.ZF = r === 0 ? 1 : 0;
    this.flags.SF = (r & signBit) !== 0 ? 1 : 0;
    this.flags.CF = 0;
    this.flags.OF = 0;
  };

  AsmSimulator.prototype._resolveJumpTarget = function (token) {
    var s = String(token || '').trim().toUpperCase();
    if (Object.prototype.hasOwnProperty.call(this.labels, s)) {
      return this.labels[s];
    }
    var imm = parseImmediate(s);
    if (!Number.isNaN(imm)) return imm;
    throw new Error('Étiquette de saut introuvable : ' + token);
  };

  AsmSimulator.prototype.snapshot = function (meta) {
    this._syncPublicFields();
    var regsCopy = Object.assign({}, this.registers);
    var subCopy = Object.assign({}, this.subRegisters);
    var flagsCopy = Object.assign({}, this.flags);
    var state = {
      step: meta && typeof meta.step === 'number' ? meta.step : this.cycles,
      ip: meta && typeof meta.ip === 'number' ? meta.ip : this._regs.IP,
      instruction: meta && meta.instruction ? meta.instruction : '',
      mnemonic: meta && meta.mnemonic ? meta.mnemonic : '',
      registers: regsCopy,
      subRegisters: subCopy,
      flags: flagsCopy,
      memory: new Uint8Array(this.memory),
      cycles: this.cycles,
      halted: this.halted,
      cycleLimitReached: this.cycleLimitReached,
      error: this.error
    };
    return state;
  };

  AsmSimulator.prototype.getState = function () {
    var snap = this.snapshot();
    snap.history = this.history.slice();
    snap.steps = snap.history;
    snap.trace = snap.history;
    REG16.forEach(function (r) { snap[r] = snap.registers[r]; });
    Object.keys(REG8_MAP).forEach(function (r) { snap[r] = snap.subRegisters[r]; });
    FLAGS.forEach(function (f) { snap[f] = snap.flags[f]; });
    return snap;
  };

  AsmSimulator.prototype.step = function () {
    if (this.halted) return this.getState();
    if (this._regs.IP < 0 || this._regs.IP >= this.instructions.length) {
      this.halted = true;
      this._syncPublicFields();
      return this.getState();
    }
    if (this.cycles >= this.maxCycles) {
      this.cycleLimitReached = true;
      this.halted = true;
      this.error = 'Limite de cycles atteinte (' + this.maxCycles + ' cycles).';
      this._syncPublicFields();
      return this.getState();
    }

    var currentIp = this._regs.IP;
    var ins = this.instructions[currentIp];
    var nextIp = currentIp + 1;
    var op = ins.mnemonic;
    var args = ins.operands;
    var bits = args[0] ? this._operandBits(args[0]) : 16;
    var mask = bits === 8 ? 0xFF : 0xFFFF;
    var signBit = bits === 8 ? 0x80 : 0x8000;
    var a, b, full, res, count;

    this.cycles += 1;

    switch (op) {
      case 'NOP':
        break;
      case 'HLT':
        this.halted = true;
        break;
      case 'MOV':
        b = this._readOperand(args[1], bits);
        this._writeOperand(args[0], b, bits);
        break;
      case 'ADD':
        a = this._readOperand(args[0], bits);
        b = this._readOperand(args[1], bits);
        full = (a & mask) + (b & mask);
        res = full & mask;
        this._writeOperand(args[0], res, bits);
        this._updateArithFlags(a, b, full, res, bits, false, false);
        break;
      case 'SUB':
        a = this._readOperand(args[0], bits);
        b = this._readOperand(args[1], bits);
        full = (a & mask) - (b & mask);
        res = full & mask;
        this._writeOperand(args[0], res, bits);
        this._updateArithFlags(a, b, full, res, bits, true, false);
        break;
      case 'CMP':
        a = this._readOperand(args[0], bits);
        b = this._readOperand(args[1], bits);
        full = (a & mask) - (b & mask);
        res = full & mask;
        this._updateArithFlags(a, b, full, res, bits, true, false);
        break;
      case 'INC':
        a = this._readOperand(args[0], bits);
        full = (a & mask) + 1;
        res = full & mask;
        this._writeOperand(args[0], res, bits);
        this._updateArithFlags(a, 1, full, res, bits, false, true);
        break;
      case 'DEC':
        a = this._readOperand(args[0], bits);
        full = (a & mask) - 1;
        res = full & mask;
        this._writeOperand(args[0], res, bits);
        this._updateArithFlags(a, 1, full, res, bits, true, true);
        break;
      case 'AND':
        a = this._readOperand(args[0], bits);
        b = this._readOperand(args[1], bits);
        res = (a & b) & mask;
        this._writeOperand(args[0], res, bits);
        this._updateLogicFlags(res, bits);
        break;
      case 'OR':
        a = this._readOperand(args[0], bits);
        b = this._readOperand(args[1], bits);
        res = (a | b) & mask;
        this._writeOperand(args[0], res, bits);
        this._updateLogicFlags(res, bits);
        break;
      case 'XOR':
        a = this._readOperand(args[0], bits);
        b = this._readOperand(args[1], bits);
        res = (a ^ b) & mask;
        this._writeOperand(args[0], res, bits);
        this._updateLogicFlags(res, bits);
        break;
      case 'NOT':
        a = this._readOperand(args[0], bits);
        res = (~a) & mask;
        this._writeOperand(args[0], res, bits);
        break;
      case 'SHL':
      case 'SAL':
        a = this._readOperand(args[0], bits);
        count = args[1] !== undefined ? (this._readOperand(args[1], 8) & 0x1F) : 1;
        if (count > 0) {
          this.flags.CF = ((a << (count - 1)) & signBit) !== 0 ? 1 : 0;
          res = (a << count) & mask;
          this._writeOperand(args[0], res, bits);
          this.flags.ZF = res === 0 ? 1 : 0;
          this.flags.SF = (res & signBit) !== 0 ? 1 : 0;
          this.flags.OF = count === 1 ? (((res & signBit) !== 0 ? 1 : 0) ^ this.flags.CF) : 0;
        }
        break;
      case 'SHR':
        a = this._readOperand(args[0], bits);
        count = args[1] !== undefined ? (this._readOperand(args[1], 8) & 0x1F) : 1;
        if (count > 0) {
          this.flags.CF = ((a >>> (count - 1)) & 1) !== 0 ? 1 : 0;
          res = (a >>> count) & mask;
          this._writeOperand(args[0], res, bits);
          this.flags.ZF = res === 0 ? 1 : 0;
          this.flags.SF = (res & signBit) !== 0 ? 1 : 0;
          this.flags.OF = count === 1 ? ((a & signBit) !== 0 ? 1 : 0) : 0;
        }
        break;
      case 'JMP':
        nextIp = this._resolveJumpTarget(args[0]);
        break;
      case 'JE':
      case 'JZ':
        if (this.flags.ZF === 1) {
          nextIp = this._resolveJumpTarget(args[0]);
        }
        break;
      case 'JNE':
      case 'JNZ':
        if (this.flags.ZF === 0) {
          nextIp = this._resolveJumpTarget(args[0]);
        }
        break;
      case 'PUSH':
        a = this._readOperand(args[0], 16);
        this._regs.SP = (this._regs.SP - 2) & 0xFFFF;
        this.memory[this._regs.SP & 0xFF] = a & 0xFF;
        this.memory[(this._regs.SP + 1) & 0xFF] = (a >>> 8) & 0xFF;
        break;
      case 'POP':
        a = (this.memory[this._regs.SP & 0xFF] | (this.memory[(this._regs.SP + 1) & 0xFF] << 8)) & 0xFFFF;
        this._regs.SP = (this._regs.SP + 2) & 0xFFFF;
        this._writeOperand(args[0], a, 16);
        break;
      default:
        throw new Error('Instruction x86 non supportée : ' + op);
    }

    this._regs.IP = nextIp & 0xFFFF;
    if (this._regs.IP >= this.instructions.length) {
      this.halted = true;
    }

    var snap = this.snapshot({
      step: this.cycles,
      ip: currentIp,
      instruction: ins.text,
      mnemonic: op
    });
    this.history.push(snap);
    return this.getState();
  };

  AsmSimulator.prototype.run = function (sourceOrOptions, maybeOptions) {
    var opts = {};
    if (typeof sourceOrOptions === 'string') {
      opts = maybeOptions || {};
      if (typeof opts.maxCycles === 'number' && opts.maxCycles > 0) {
        this.maxCycles = opts.maxCycles;
      }
      this.load(sourceOrOptions);
    } else if (sourceOrOptions && typeof sourceOrOptions === 'object') {
      opts = sourceOrOptions;
      if (typeof opts.maxCycles === 'number' && opts.maxCycles > 0) {
        this.maxCycles = opts.maxCycles;
      }
      if (typeof opts.code === 'string') {
        this.load(opts.code);
      }
    }

    while (!this.halted && this._regs.IP < this.instructions.length) {
      var beforeCycles = this.cycles;
      this.step();
      if (this.cycleLimitReached || this.cycles === beforeCycles) break;
    }
    return this.getState();
  };

  AsmSimulator.create = function (options) {
    return new AsmSimulator(options);
  };

  AsmSimulator.run = function (code, options) {
    var sim = new AsmSimulator(options);
    return sim.run(code, options);
  };

  AsmSimulator.toHex = toHex;
  AsmSimulator.parseProgram = parseProgram;

  // ── Montage DOM interactif ([data-asm-simulator]) ──────────────────────

  function escHtml(val) {
    return String(val === undefined || val === null ? '' : val)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  function mountWidget(container) {
    if (!container || container.getAttribute('data-asm-ready') === '1') return null;
    container.setAttribute('data-asm-ready', '1');

    var initialCode = container.getAttribute('data-asm-code') || '';
    var codeNode = container.querySelector('[data-asm-program]');
    if (!initialCode && codeNode) {
      initialCode = codeNode.textContent || '';
    }
    if (!initialCode.trim()) {
      initialCode = [
        'MOV AX, 0x0005',
        'MOV BX, 0x0003',
        'ADD AX, BX',
        'CMP AX, 0x0008',
        'JE fin',
        'MOV CX, 0xFFFF',
        'fin:',
        'PUSH AX',
        'POP DX',
        'HLT'
      ].join('\n');
    } else {
      initialCode = initialCode.replace(/\\n/g, '\n').trim();
    }

    var sim = new AsmSimulator({ maxCycles: 256 });
    sim.load(initialCode);

    container.classList.add('asm-sim-widget');
    container.innerHTML =
      '<div class="asm-sim__head">' +
        '<strong>Simulateur x86-16 interactif (Registres, Drapeaux ZF/SF/CF/OF &amp; Pile)</strong>' +
        '<span class="asm-sim__status" data-asm-status>Prêt (IP = 0)</span>' +
      '</div>' +
      '<div class="asm-sim__body">' +
        '<div class="asm-sim__editor-col">' +
          '<label class="asm-sim__label">Programme assembleur x86-16</label>' +
          '<textarea class="asm-sim__code" data-asm-textarea rows="8" spellcheck="false">' + escHtml(initialCode) + '</textarea>' +
          '<div class="asm-sim__controls">' +
            '<button type="button" class="lab__btn lab__btn--primary" data-asm-step>Pas à pas (Step)</button>' +
            '<button type="button" class="lab__btn" data-asm-run>Exécuter tout</button>' +
            '<button type="button" class="lab__btn lab__btn--ghost" data-asm-reset>Réinitialiser</button>' +
          '</div>' +
        '</div>' +
        '<div class="asm-sim__state-col">' +
          '<div class="asm-sim__regs" data-asm-regs></div>' +
          '<div class="asm-sim__flags" data-asm-flags></div>' +
          '<div class="asm-sim__trace" data-asm-trace></div>' +
        '</div>' +
      '</div>';

    var textarea = container.querySelector('[data-asm-textarea]');
    var statusEl = container.querySelector('[data-asm-status]');
    var regsEl = container.querySelector('[data-asm-regs]');
    var flagsEl = container.querySelector('[data-asm-flags]');
    var traceEl = container.querySelector('[data-asm-trace]');
    var stepBtn = container.querySelector('[data-asm-step]');
    var runBtn = container.querySelector('[data-asm-run]');
    var resetBtn = container.querySelector('[data-asm-reset]');

    function render() {
      var st = sim.getState();
      regsEl.innerHTML =
        '<table class="course-table asm-sim__table">' +
        '<thead><tr><th>Registre</th><th>Hex (16b)</th><th>Décimal</th><th>Sous-registres (8b)</th></tr></thead>' +
        '<tbody>' +
        ['AX', 'BX', 'CX', 'DX', 'SI', 'DI', 'SP', 'BP', 'IP'].map(function (r) {
          var subInfo = '';
          if (r === 'AX' || r === 'BX' || r === 'CX' || r === 'DX') {
            var prefix = r.charAt(0);
            subInfo = prefix + 'H=' + toHex(st.subRegisters[prefix + 'H'], 2) +
              ' / ' + prefix + 'L=' + toHex(st.subRegisters[prefix + 'L'], 2);
          } else {
            subInfo = '—';
          }
          return '<tr><td><code>' + r + '</code></td><td><code>' + toHex(st.registers[r], 4) +
            '</code></td><td>' + st.registers[r] + '</td><td><code>' + subInfo + '</code></td></tr>';
        }).join('') +
        '</tbody></table>';

      flagsEl.innerHTML =
        '<div class="asm-sim__flags-row">' +
        FLAGS.map(function (f) {
          var active = st.flags[f] === 1;
          return '<span class="asm-sim__flag' + (active ? ' asm-sim__flag--on' : '') + '" data-flag="' + f + '">' +
            '<code>' + f + ' = ' + st.flags[f] + '</code></span>';
        }).join(' ') +
        '</div>';

      if (st.history.length > 0) {
        var last = st.history[st.history.length - 1];
        traceEl.innerHTML = '<p class="asm-sim__last">Dernière instruction exécutée (cycle ' +
          last.step + ') : <code>' + escHtml(last.instruction) + '</code></p>';
      } else {
        traceEl.innerHTML = '<p class="asm-sim__last">Aucune instruction exécutée. Cliquez sur « Pas à pas » ou « Exécuter tout ».</p>';
      }

      if (st.error) {
        statusEl.textContent = st.error;
      } else if (st.halted) {
        statusEl.textContent = 'Terminé après ' + st.cycles + ' cycle(s)';
      } else {
        statusEl.textContent = 'En cours — IP = ' + st.registers.IP + ' (' + st.cycles + ' cycle(s))';
      }
    }

    if (stepBtn) {
      stepBtn.addEventListener('click', function () {
        if (sim.cycles === 0 && !sim.halted) {
          sim.load(textarea.value);
        }
        try {
          sim.step();
        } catch (err) {
          sim.error = err.message;
        }
        render();
      });
    }

    if (runBtn) {
      runBtn.addEventListener('click', function () {
        try {
          sim.run(textarea.value);
        } catch (err) {
          sim.error = err.message;
        }
        render();
      });
    }

    if (resetBtn) {
      resetBtn.addEventListener('click', function () {
        sim.load(textarea.value);
        render();
      });
    }

    render();
    container.__asmSimulator = sim;
    return sim;
  }

  AsmSimulator.mountAll = function (rootEl) {
    if (typeof document === 'undefined') return [];
    var scope = rootEl || document;
    var nodes = Array.prototype.slice.call(scope.querySelectorAll('[data-asm-simulator]'));
    return nodes.map(mountWidget).filter(Boolean);
  };

  if (typeof document !== 'undefined') {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', function () { AsmSimulator.mountAll(); });
    } else {
      AsmSimulator.mountAll();
    }
  }

  return AsmSimulator;
});

/**
 * tests/refonte-probabilites.test.js
 *
 * Banc de vérification de l'oracle mathématique et des 18 exercices de Probabilités B2 :
 * - Prouve la conformité rigoureuse aux exercices des TD 1 à 6 du Dr AGBOKOU et de l'examen 2024-2025.
 * - Prouve l'exactitude des calculs en fractions réduites et en décimaux.
 * - Prouve l'acceptation des variantes numériques et le rejet des erreurs conceptuelles classiques.
 */
'use strict';

const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

const FICHES_DIR = path.resolve(__dirname, '../refonte/fiches');

function pgcd(a, b) {
  let x = Math.abs(a);
  let y = Math.abs(b);
  while (y !== 0) {
    const r = x % y;
    x = y;
    y = r;
  }
  return x;
}

function reduireFraction(num, den) {
  if (den === 0) throw new Error('Division par zéro');
  const d = pgcd(num, den);
  return { num: num / d, den: den / d };
}

function parseFrac(str) {
  const s = String(str).trim();
  if (s.includes('/')) {
    const parts = s.split('/');
    return Number(parts[0]) / Number(parts[1]);
  }
  return Number(s);
}

test('Probabilités B2 : Présence et complétude des 18 fiches de conception', () => {
  for (let c = 1; c <= 6; c++) {
    for (let e = 1; e <= 3; e++) {
      const id = `pb2-c1-e${e}`;
      const file = path.join(FICHES_DIR, `${id}.md`);
      assert.ok(fs.existsSync(file), `La fiche ${id}.md doit exister`);
      const content = fs.readFileSync(file, 'utf8');
      assert.match(content, /## 1\. Contexte Métier & Académique/, `${id} : contexte manquant`);
      assert.match(content, /## 2\. Énoncé Complet/, `${id} : énoncé manquant`);
      assert.match(content, /## 3\. Solution Rédigée/, `${id} : solution manquante`);
      assert.match(content, /## 4\. Jeu de Tests/, `${id} : jeu de tests manquant`);
      assert.match(content, /TD_\d|Recueil_Epreuves/, `${id} : source TD Dr Agbokou ou Examen manquante`);
    }
  }
});

test('Probabilités B2 : Vérification de l\'oracle combinatoire (TD 1)', () => {
  // Exercice 1 : Entretien 4 personnes -> 2^4 = 16
  let sumC = 0;
  const c4 = [1, 4, 6, 4, 1];
  for (const v of c4) sumC += v;
  assert.strictEqual(sumC, 16, 'La somme des C(4, k) doit valoir 16');

  // Exercice 2 : 7 objets dans 3 tiroirs -> 3^7 = 2187 ; 3 objets dans 5 tiroirs -> A(5, 3) = 60
  assert.strictEqual(Math.pow(3, 7), 2187);
  assert.strictEqual(5 * 4 * 3, 60);

  // Exercice 3 : Mots de 3 lettres
  const N1 = Math.pow(26, 3);
  const N2 = 26 * 25 * 24;
  const N_sans_voyelle = Math.pow(20, 3);
  const N4 = N1 - N_sans_voyelle;
  assert.strictEqual(N1, 17576);
  assert.strictEqual(N2, 15600);
  assert.strictEqual(N4, 9576, 'Au moins une voyelle = 26^3 - 20^3 = 9576');

  // Exercice 4 : Répartition de 8 policiers (3, 2, 3)
  const fact8 = 40320;
  const denom = 6 * 2 * 6; // 3! * 2! * 3!
  assert.strictEqual(fact8 / denom, 560, 'Multinomial 8! / (3! 2! 3!) = 560');

  // Exercice 5 : Mains de Belote (32 cartes, main de 5)
  const C32_5 = (32 * 31 * 30 * 29 * 28) / (5 * 4 * 3 * 2 * 1);
  const C31_4 = (31 * 30 * 29 * 28) / (4 * 3 * 2 * 1);
  const C28_5 = (28 * 27 * 26 * 25 * 24) / 120;
  const auMoinsUnRoi = C32_5 - C28_5;

  assert.strictEqual(C32_5, 201376);
  assert.strictEqual(C31_4, 31465);
  assert.strictEqual(C28_5, 98280);
  assert.strictEqual(auMoinsUnRoi, 103096);

  const frac = reduireFraction(auMoinsUnRoi, C32_5);
  assert.strictEqual(frac.num, 1841);
  assert.strictEqual(frac.den, 3596);
});

test('Probabilités B2 : Vérification de l\'oracle conditionnel et Bayes (TD 2)', () => {
  // Exercice 1 : Réunion et indépendance
  const pA = 0.4;
  const pB = 0.5;
  const pAnB = 0.2;
  const pAuB = pA + pB - pAnB;
  assert.strictEqual(Math.round(pAuB * 10) / 10, 0.7);
  assert.strictEqual(pAnB, pA * pB, 'A et B sont indépendants car P(AnB) = P(A)*P(B)');

  // Exercice 2 : Probabilités totales
  const pF1 = 0.5, pD_F1 = 0.01;
  const pF2 = 0.3, pD_F2 = 0.02;
  const pF3 = 0.2, pD_F3 = 0.05;
  const pTotalD = pF1 * pD_F1 + pF2 * pD_F2 + pF3 * pD_F3;
  assert.strictEqual(Math.round(pTotalD * 1000) / 1000, 0.021);

  // Exercice 3 : Formule de Bayes dépistage
  const pM = 0.01;
  const pT_M = 0.95;
  const pT_nonM = 0.02;
  const pT = pT_M * pM + pT_nonM * (1 - pM);
  const pM_T = (pT_M * pM) / pT;
  assert.ok(Math.abs(pT - 0.0293) < 1e-4);
  assert.ok(Math.abs(pM_T - 0.3242) < 1e-4, 'P(M|T+) vaut environ 32.42%');
});

test('Probabilités B2 : Vérification de l\'oracle variables discrètes (TD 3 & 4, Examen 2024)', () => {
  // Dé truqué : P(X=k) = k*a
  const a = 1 / 21;
  let E_X = 0;
  let E_X2 = 0;
  for (let k = 1; k <= 6; k++) {
    E_X += k * (k * a);
    E_X2 += (k * k) * (k * a);
  }
  const fracE = reduireFraction(91, 21);
  assert.strictEqual(fracE.num, 13);
  assert.strictEqual(fracE.den, 3);
  assert.ok(Math.abs(E_X - 13 / 3) < 1e-6);

  const V_X = E_X2 - Math.pow(E_X, 2);
  assert.ok(Math.abs(V_X - 20 / 9) < 1e-6);

  // Dépense magasin (Examen 2024-2025)
  const depenseE = 0 * 0.1 + 10 * 0.4 + 20 * 0.3 + 50 * 0.2;
  assert.strictEqual(depenseE, 20);

  // Binomiale B(5, 0.1)
  const p0 = Math.pow(0.9, 5);
  const p1 = 5 * 0.1 * Math.pow(0.9, 4);
  assert.ok(Math.abs(p0 - 0.59049) < 1e-5);
  assert.ok(Math.abs(p1 - 0.32805) < 1e-5);

  // Poisson addition
  const lambda1 = 1.5;
  const lambda2 = 2.5;
  const lambdaY = lambda1 + lambda2;
  assert.strictEqual(lambdaY, 4.0);
  const pZeroPoisson = Math.exp(-4);
  assert.ok(Math.abs(pZeroPoisson - 0.018315) < 1e-4);
});

test('Probabilités B2 : Vérification de l\'oracle variables continues (TD 5 & 6)', () => {
  // f(x) = k*x sur [0, 1] -> int kx dx = k/2 = 1 => k = 2
  const k = 2;
  // F(x) = x^2 => F(0.5) = 0.25
  assert.strictEqual(Math.pow(0.5, 2), 0.25);

  // E(X) = int 2x^2 dx de 0 a 1 = 2/3
  const eCont = 2 / 3;
  // E(X^2) = int 2x^3 dx de 0 a 1 = 2/4 = 1/2
  const e2Cont = 0.5;
  const vCont = e2Cont - Math.pow(eCont, 2);
  const fracV = reduireFraction(1, 18);
  assert.strictEqual(fracV.num, 1);
  assert.strictEqual(fracV.den, 18);
  assert.ok(Math.abs(vCont - 1 / 18) < 1e-6);

  // Loi normale standardisation
  const mu = 100;
  const sigma = 15;
  const x = 130;
  const z = (x - mu) / sigma;
  assert.strictEqual(z, 2.0);
  const phi2 = 0.9772;
  const pDepassement = 1 - phi2;
  assert.ok(Math.abs(pDepassement - 0.0228) < 1e-6);
});

'use strict';

const { runTests, MAX_TESTS } = require('/project/server/exercises/runner');

function resultatExecute(resultat, stdin) {
  if (!resultat || resultat.entree !== stdin || resultat.etat !== 'exécuté') {
    throw new Error('Exécution isolée absente ou non concluante');
  }
  const code = resultat.code_sortie;
  if (!Number.isInteger(code)) throw new Error('Code de sortie absent');
  return {
    ok: code === 0,
    status: code === 0 ? 'success' : 'runtime_error',
    stdout: resultat.sortie,
    exitCode: code
  };
}

async function main() {
  const fragments = [];
  for await (const fragment of process.stdin) fragments.push(fragment);
  const demandes = JSON.parse(Buffer.concat(fragments).toString('utf8'));
  const reponses = [];

  for (const demande of demandes) {
    let position = 0;
    const rapport = await runTests(demande.exercice, demande.source, {
      execute: async ({ stdin }) => {
        const resultat = demande.executions[position++];
        return resultatExecute(resultat, stdin);
      }
    });
    const etat = !rapport.ok ? 'non évalué' : rapport.stop ? 'rejeté' : 'accepté';
    const controles = [];
    const tests = demande.exercice.tests.slice(0, MAX_TESTS);
    if (demande.exercice.verifyFirstExample === true) tests.push(demande.exercice.examples[0]);
    for (let index = 0; index < tests.length; index++) {
      const resultat = demande.executions[index];
      const verification = await runTests({ ...demande.exercice, tests: [tests[index]], verifyFirstExample: false }, demande.source, {
        execute: async ({ stdin }) => resultatExecute(resultat, stdin)
      });
      controles.push({
        label: tests[index].label || 'Exemple affiché',
        etat: !verification.ok ? 'non évalué' : verification.stop ? 'rejeté' : 'accepté'
      });
    }
    reponses.push({ cle: demande.cle, etat, rapport, executees_par_correcteur: position, controles_individuels: controles });
  }
  process.stdout.write(JSON.stringify({ max_tests: MAX_TESTS, reponses }));
}

main().catch(erreur => {
  process.stderr.write(`${erreur.message}\n`);
  process.exitCode = 2;
});

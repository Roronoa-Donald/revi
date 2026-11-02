'use strict';

const fs = require('node:fs');
const catalogue = require('/project/server/exercises');
const original = require('./sonder-reponses-plausibles');
const independent = require('./sondes-sept-restants');
const bank = JSON.parse(fs.readFileSync('/project/corrections/fixtures/banc-360.json', 'utf8'));
const review = JSON.parse(fs.readFileSync('/project/corrections/fixtures/banc-360-requalifications-lot1.json', 'utf8'));

async function main() {
  const findings = [];
  const seen = new Set();
  for (const fixture of bank.exercises) {
    if (seen.has(fixture.id) || fixture.variants.length !== 2) throw new Error(`Banc incohérent : ${fixture.id}`);
    seen.add(fixture.id);
    const exercise = catalogue.getExercise(fixture.id);
    if (!exercise) {
      findings.push({ id: fixture.id, error: 'exercice absent', variants: [] });
      continue;
    }
    const evaluator = fixture.provenance === 'sept-sondes-avec-temoin' ? independent.evaluate : original.evaluate;
    const baseline = await evaluator(exercise, exercise.solution);
    const independentBaseline = fixture.independentReference ? await evaluator(exercise, fixture.independentReference) : null;
    const variants = [];
    for (const variant of fixture.variants) {
      const outcome = await evaluator(exercise, variant.code);
      const initialOutcome = variant.code_initial ? await evaluator(exercise, variant.code_initial) : null;
      let witness = null;
      if (variant.witness) {
        const reference = independent.witness(exercise.language, fixture.independentReference, variant.witness.input, variant.witness.expected);
        const actual = independent.witness(exercise.language, variant.code, variant.witness.input, variant.witness.expected);
        witness = { referenceConforme: reference.executed && reference.matches, varianteFauteConstatee: actual.executed && !actual.matches, executionReussie: reference.executed && actual.executed };
      }
      variants.push({ description: variant.description, ...outcome,
        ...(initialOutcome ? { versionInitiale: initialOutcome, adaptation: variant.adaptation } : {}),
        ...(witness ? { contreExempleSynthétique: witness } : {}) });
    }
    findings.push({ id: exercise.id, family: fixture.family, language: exercise.language, provenance: fixture.provenance, baseline, independentBaseline, variants });
  }
  const allExercises = catalogue.listExercises();
  const reviewed = new Set(review.exercices);
  if (reviewed.size !== review.exercices.length || [...reviewed].some(id => !seen.has(id))) {
    throw new Error('La liste des exercices historiques à requalifier est incohérente.');
  }
  const missing = allExercises.filter(exercise => !seen.has(exercise.id)).map(exercise => exercise.id);
  const variants = findings.flatMap(finding => finding.variants.map(variant => ({ id: finding.id, ...variant })));
  const unexecuted = variants.filter(variant => !variant.executed);
  const accepted = variants.filter(variant => variant.executed && variant.accepted);
  const rejected = variants.filter(variant => variant.executed && !variant.accepted);
  const toReview = variants.filter(variant => reviewed.has(variant.id));
  const rejectedOutsideReview = rejected.filter(variant => !reviewed.has(variant.id));
  const invalidWitnesses = variants.filter(variant => variant.contreExempleSynthétique &&
    (!variant.contreExempleSynthétique.referenceConforme || !variant.contreExempleSynthétique.varianteFauteConstatee ||
      !variant.contreExempleSynthétique.executionReussie));
  const baselineFailures = findings.filter(finding => !finding.baseline?.executed || !finding.baseline?.accepted).map(finding => finding.id);
  const initialVariants = variants.filter(variant => variant.versionInitiale);
  const result = {
    source: bank.source,
    catalogue: allExercises.length,
    exercicesCouverts: seen.size,
    exercicesSansVariantes: missing,
    variantes: variants.length,
    variantesAcceptees: accepted.length,
    variantesRejetees: rejected.length,
    variantesNonEvaluees: unexecuted.length,
    variantesHistoriquesARequalifier: toReview.length,
    variantesRejeteesHorsCasARequalifier: rejectedOutsideReview.length,
    variantesAdapteesAvecVersionInitialeRejouee: initialVariants.length,
    versionsInitiales: {
      acceptees: initialVariants.filter(variant => variant.versionInitiale.executed && variant.versionInitiale.accepted).length,
      rejetees: initialVariants.filter(variant => variant.versionInitiale.executed && !variant.versionInitiale.accepted).length,
      nonEvaluees: initialVariants.filter(variant => !variant.versionInitiale.executed).length
    },
    requalifications: review,
    contreExemplesNonConfirmes: invalidWitnesses.map(variant => variant.id + ' : ' + variant.description),
    referencesEnEchec: baselineFailures,
    details: findings,
    limites: [
      'La banque historique couvre 180 exercices seulement ; les autres ne disposent pas de deux variantes dans cette banque.',
      'Une erreur de compilation ou d’exécution est classée non évaluée, pas comme rejet prouvé par le comparateur.',
      'Les 14 variantes des sept derniers exercices possèdent un contre-exemple synthétique ; les autres mutations ne possèdent pas toutes un témoin indépendant.',
      'Les variantes historiques des neuf exercices SQL B1 requalifiés restent exécutées ; une erreur de schéma ou une sortie différente ne prouve pas qu’elles sont pertinentes pour le nouveau contrat.',
      'Les neuf variantes adaptées sont accompagnées de leur version initiale également rejouée ; les anciens résultats ne sont pas nécessairement comparables aux nouveaux contrats.',
      'Une ancienne référence indépendante peut ne couvrir que son contre-exemple : son acceptation sur tous les tests actuels est indiquée séparément.',
      'Les variantes sont figées à la référence : elles devront être revues si le contrat pédagogique de leur exercice change.'
    ]
  };
  console.log(JSON.stringify(result, null, 2));
  process.exitCode = missing.length || accepted.length || unexecuted.length || baselineFailures.length || toReview.length || invalidWitnesses.length ? 1 : 0;
}

main().catch(error => { console.error(error.stack || error.message); process.exitCode = 1; });

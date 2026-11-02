'use strict';

if (require.main === module) {
  process.stdout.write(JSON.stringify({
    ok: false,
    httpStatus: 503,
    data: {
      stdout: '',
      stderr: '',
      message: 'Le moteur d’exécution local est désactivé.',
      exit_code: 1
    }
  }));
  process.exitCode = 1;
}

const { execSync } = require('child_process');

try {
  console.log('Running tsc...');
  const out = execSync('npx tsc --noEmit', { encoding: 'utf8', stdio: 'pipe' });
  console.log('--- SUCCESS ---');
  console.log(out);
} catch (e) {
  console.log('--- ERROR FOUND ---');
  console.log('STDOUT:\n', e.stdout);
  console.log('STDERR:\n', e.stderr);
}

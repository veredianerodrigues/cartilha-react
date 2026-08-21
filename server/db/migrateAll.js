import { spawnSync } from 'node:child_process';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// As 16 migrações pendentes de rodar em produção (o piloto "apresentacao" já
// rodou lá antes, não precisa repetir — mas é idempotente, pode rodar de
// novo se quiser). Ordem não importa, cada seção é independente. Para na
// primeira que falhar, em vez de seguir e deixar o banco pela metade.
const SCRIPTS = [
  'migrateDiuText.js',
  'migrateAdolescenciaChegouText.js',
  'migrateTransformacoesMeninoText.js',
  'migrateErecaoEjaculacaoText.js',
  'migrateTannerMeninoText.js',
  'migrateTransformacoesMeninaText.js',
  'migrateMenstruacaoText.js',
  'migrateFecundacaoText.js',
  'migrateMetodosContraceptivosText.js',
  'migrateClassificacaoMetodosText.js',
  'migrateMetodosBarreiraText.js',
  'migrateMetodosHormonaisText.js',
  'migrateMitosAnticoncepcionalText.js',
  'migrateDireitosSexuaisReprodutivosText.js',
  'migrateGravidezAdolescenciaMudancasText.js',
  'migrateOrientacaoQuemPodeAjudarText.js',
];

let failed = false;
for (const script of SCRIPTS) {
  console.log(`\n=== ${script} ===`);
  const result = spawnSync(process.execPath, [path.join(__dirname, script)], {
    stdio: 'inherit',
    env: process.env,
  });
  if (result.status !== 0) {
    console.error(`\n[migrate-all] "${script}" falhou (código ${result.status}) — parando aqui, o resto não rodou.`);
    failed = true;
    break;
  }
}

if (!failed) {
  console.log('\n[migrate-all] Todas as migrações rodaram com sucesso.');
}
process.exit(failed ? 1 : 0);

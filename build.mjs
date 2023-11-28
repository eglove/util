import * as fs from 'node:fs'
import { rimraf } from 'rimraf'
import { execSync } from 'child_process'
import esbuild from 'esbuild';

await rimraf('dist');

const tsConfigString = fs.readFileSync('tsconfig.json', {encoding: 'utf8'});
let tsConfig = JSON.parse(tsConfigString);
tsConfig = {
  include: ["src"],
  compilerOptions: {
    emitDeclarationOnly: true,
    ...tsConfig.compilerOptions,
  },
  ...tsConfig,
}
fs.writeFileSync('tsconfig.build.json', JSON.stringify(tsConfig, null, 2));

execSync('tsc --project tsconfig.build.json');

esbuild.buildSync({
  minify: true,
  outdir: 'dist',
  format: 'esm',
  entryPoints: ['src/*'],
})

fs.copyFileSync(
  'package.json',
  'dist/package.json',
)

execSync('cd dist && npm publish --access public && cd ..')

import * as fs from 'node:fs'
import { rimraf } from 'rimraf'
import { execSync } from 'child_process'
import esbuild from 'esbuild';

await rimraf('dist');

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

import * as fs from 'node:fs'
import { rimraf } from 'rimraf'
import { execSync } from 'child_process'
import * as esbuild from 'esbuild'

await rimraf('dist');

execSync('tsc --project tsconfig.build.json');

fs.copyFileSync(
  'package.json',
  'dist/package.json',
)

esbuild.buildSync({
  entryPoints: ['src/*'],
  bundle: true,
  outdir: 'dist',
  minify: true,
  treeShaking: true,
})

execSync('cd dist && npm publish --access public && cd ..')

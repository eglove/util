import * as fs from 'node:fs'
import { rimraf } from 'rimraf'
import { execSync } from 'child_process'

await rimraf('dist');

execSync('tsc --project tsconfig.build.json');

fs.copyFileSync(
  'package.json',
  'dist/package.json',
)

execSync('cd dist && npm publish --access public && cd ..')

import { projectBuilder } from '@ethang/project-builder/project-builder.js'

await projectBuilder('util', 'master', {
  preVersionBumpScripts: ['UPDATE', 'PRUNE'],
  postVersionBumpScripts: ['DEDUPE', 'LINT', 'TEST'],
  publishDirectory: 'dist',
  isLibrary: true,
  tsConfigOverrides: {
    include: ['src'],
    compilerOptions: {
      emitDeclarationOnly: true,
    }
  },
  tsupOptions: {
    format: ['cjs', 'esm'],
    bundle: true,
    minify: true,
    outDir: 'dist',
    entry: ['src/*'],
  }
})

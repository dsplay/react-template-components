import typescript from 'rollup-plugin-typescript2'
import commonjs from 'rollup-plugin-commonjs'
import external from 'rollup-plugin-peer-deps-external'
import resolve from 'rollup-plugin-node-resolve'
import sass from 'rollup-plugin-sass';
import copy from 'rollup-plugin-copy'


import pkg from './package.json'

export default {
  input: 'src/index.ts',
  output: [
    {
      file: pkg.main,
      format: 'cjs',
      exports: 'named',
      sourcemap: true
    },
    {
      file: pkg.module,
      format: 'es',
      exports: 'named',
      sourcemap: true
    }
  ],
  plugins: [
    external(),
    copy({
      targets: [
        { src: 'src/package.json', dest: 'dist/package.json' },
      ]
    }),
    sass({
      // Filename to write all styles
      output: 'dist/styles.css',
    }),
    resolve(),
    typescript({
      rollupCommonJSResolveHack: true,
      exclude: ['src/__tests__/**', 'src/**/*.stories.*'],
      clean: true
    }),
    commonjs({
      include: ['node_modules/**'],
      namedExports: {
        'node_modules/react/react.js': ['Children', 'Component', 'PropTypes', 'createElement'],
        'node_modules/react-dom/index.js': ['render']
      }
    })
  ]
}

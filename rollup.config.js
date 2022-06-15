const { terser } = require('rollup-plugin-terser');
import babel from '@rollup/plugin-babel';

module.exports = () => {
  return {
    input: "index.js",
    plugins: [
      terser(),
      babel({
        exclude: 'node_modules/**',
        babelHelpers: 'bundled'
      })
    ],
    output: [
      {
        file: "./lib/whoa.min.js",
        format: 'umd',
        name: 'Whoa'
      },
      {
        file: "./lib/whoa.esm.js",
        format: 'es'
      }
    ]
  }
}

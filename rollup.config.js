const { terser } = require('rollup-plugin-terser')

module.exports = () => {
  return {
    input: "index.js",
    plugins: [terser()],
    output: [
      {
        file: "./dist/whoa.min.js",
        format: 'iife',
        name: 'Whoa'
      }, {
        file: "./dist/whoa.esm.js",
        format: 'esm',
      }
    ]
  }
}

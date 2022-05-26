const { terser } = require('rollup-plugin-terser')

module.exports = () => {
  return {
    input: "index.js",
    plugins: [terser()],
    output: [
      {
        file: "./dist/hoa.min.js",
        format: 'iife',
        name: 'Hoa'
      }, {
        file: "./dist/hoa.esm.js",
        format: 'esm',
      }
    ]
  }
}

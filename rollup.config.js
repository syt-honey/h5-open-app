const { terser } = require('rollup-plugin-terser')

module.exports = () => {
  return {
    input: "index.js",
    plugins: [terser()],
    output: [
      {
        file: "./lib/whoa.min.js",
        format: 'umd',
        name: 'Whoa'
      }
    ]
  }
}

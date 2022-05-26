const { terser } = require('rollup-plugin-terser')

module.exports = () => {
  return {
    input: "index.js",
    plugins: [terser()],
    output: {
      name: 'Hoa'
    }
  }
}

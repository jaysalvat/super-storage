import { terser } from 'rollup-plugin-terser'

const NAME = 'superStorage'
const FILENAME = 'super-storage'
const SRC = './src'
const DIST = './build'

const configs = []
const formats = [ 'esm', 'esm.min', 'umd', 'umd.min' ]

formats.forEach((type) => {
  const [ format, minify ] = type.split('.')
  const filename = FILENAME + '.' + format + (minify ? '.min' : '') + '.js'

  configs.push({
    input: SRC + '/index.js',
    output: {
      exports: 'named',
      format: format,
      file: DIST + '/' + filename,
      name: format === 'umd' ? NAME : null,
      plugins: [
        minify ? terser() : null
      ]
    }
  })
})

export default configs

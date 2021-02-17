import { terser } from 'rollup-plugin-terser'
import pkg from './package.json'

const watched = process.env.ROLLUP_WATCH
const NAME = 'superStorage'
const FILENAME = 'super-storage'
const SRC = './src'
const DIST = './build'

const configs = []
const formats = [ 'esm', 'esm.min', 'umd', 'umd.min' ]

const date = new Date()

const bannerFull = `
/**!
* ${NAME} — ${pkg.description}
* https://github.com/jaysalvat/super-store
* @version ${pkg.version} built ${date.toISOString().replace(/[TZ]/g, ' ')}
* @license MIT
* @author Jay Salvat http://jaysalvat.com
*/`

const bannerLight = `
/*!
 * ${NAME} v${pkg.version}
 * https://github.com/jaysalvat/super-store
 */`

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
      banner: !watched && (minify ? bannerLight : bannerFull),
      plugins: [
        !watched && minify ? terser() : null
      ]
    }
  })
})

export default configs

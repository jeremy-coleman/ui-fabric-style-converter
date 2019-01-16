import autoExternal from 'rollup-plugin-auto-external'
import typescript from 'rollup-plugin-typescript2'

var pkgJson = require('./package.json')
var devDeps = Object.keys(pkgJson.devDependencies || {})
var peerDeps = Object.keys(pkgJson.peerDependencies || {})
var pkgDeps = Object.keys(pkgJson.dependencies || {})

devDeps.concat(peerDeps).concat(pkgDeps)



export default {
    external: devDeps,
    input: '_DEBUG/es/index.js',
	output: [
		{file: `_DEBUG/bundle.js`, format: "es", sourcemap: false},
	],
	plugins: [
        typescript({
			check: false,
			cacheRoot: "./_DEBUG/.cache",
            typescript: require('typescript'),
        }),
        autoExternal(),
		//terser()
	],
}

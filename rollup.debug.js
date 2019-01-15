import autoExternal from 'rollup-plugin-auto-external'
import typescript from 'rollup-plugin-typescript2'

var pkgJson = require('./package.json')
var devDeps = Object.keys(pkgJson.devDependencies || {})
var peerDeps = Object.keys(pkgJson.peerDependencies || {})
var pkgDeps = Object.keys(pkgJson.dependencies || {})

devDeps.concat(peerDeps).concat(pkgDeps)



export default {
    external: devDeps,
    input: '_TEMP/index.js',
	output: [
		{file: `lib/debug.js`, format: "es", sourcemap: false},
		// {file: `lib/office-ui-fabric-react.mjs`, format: "es", sourcemap: false},
		// {file: `lib/office-ui-fabric-react.cjs.js`, format: "cjs", sourcemap: false},
	],
	plugins: [
        typescript({
			check: false,
            typescript: require('typescript'),
        }),
        autoExternal(),
		//terser()
	],
}

import autoExternal from 'rollup-plugin-auto-external'
import typescript from 'rollup-plugin-typescript2'
import {terser} from 'rollup-plugin-terser'
var pkgJson = require('./package.json')
var devDeps = Object.keys(pkgJson.devDependencies || {})
var peerDeps = Object.keys(pkgJson.peerDependencies || {})
var pkgDeps = Object.keys(pkgJson.dependencies || {})

var EXTERNALS = devDeps.concat(peerDeps).concat(pkgDeps)



export default {
    external: EXTERNALS,
    input: '_DEBUG/es/index.js',
	output: [
		{file: 'lib/rollup-terser.js', format: "es", sourcemap: false},
	],
	plugins: [
        typescript({
			check: false,
			cacheRoot: "./_DEBUG/.cache",
            typescript: require('typescript'),
        }),
        autoExternal(),
		terser({
                parse: {
                    // parse options
                },
                compress: {
                    passes: 2,
                    dead_code: true,
                    // compress options
                },
                mangle: {
                    // mangle options

                    properties: {
                        // mangle property options
                    }
                },
                output: {
                    // output options
                },
                sourcemap: {
                    // source map options
                },
                ecma: 8, // specify one of: 5, 6, 7 or 8
                keep_classnames: false,
                keep_fnames: false,
                ie8: false,
                module: false,
                nameCache: null, // or specify a name cache object
                safari10: false,
                toplevel: false,
                warnings: false,
            })
	],
}

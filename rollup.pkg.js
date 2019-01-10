import autoExternal from 'rollup-plugin-auto-external'
import typescript from 'rollup-plugin-typescript2'

import {terser} from 'rollup-plugin-terser'

var pkgJson = require('./package.json')
var devDeps = Object.keys(pkgJson.devDependencies || {})
var peerDeps = Object.keys(pkgJson.peerDependencies || {})
var pkgDeps = Object.keys(pkgJson.dependencies || {})

export default {
    external: ['react'],
    input: 'src/index.ts',
	output: [
		{file: `lib/index.js`, format: "es", sourcemap: false},
		{file: `lib/index.mjs`, format: "es", sourcemap: false},
		{file: `lib/index.cjs.js`, format: "cjs", sourcemap: false},
	],
	plugins: [
        typescript({
            typescript: require('typescript')
        }),
        autoExternal(),
		terser()
	],
}

//ts config

// {
//     "compilerOptions": {
//         "rootDir": "./src",
//         "outDir": "./lib",
//         "baseUrl": "./src",
//         "noImplicitAny": false,
//         "moduleResolution": "node",
//         "declaration": true,
//         "target": "esnext",
//         "module": "esnext",
//         "allowJs": false,
//         "jsx": "react",
//         "experimentalDecorators": true,
//         "lib": ["dom","scripthost","esnext"],
//         "skipLibCheck": true
//     },
//     "include": ["src"],
//     "exclude": ["node_modules"]
// }


	//npm tasks
    // "build": "yarn bundle:code && yarn bundle:dts",
    // "bundle:code":"rollup -c rollup.pkg.js",
    // "bundle:dts":"dts-bundle-generator -o lib/index.d.ts src/index.ts",


	//deps
	// "typescript": "^3.2.2",
    // "rollup":"1.0.2",
    // "rollup-plugin-typescript":"1.0.0",
    // "rollup-plugin-auto-external":"2.0.0",
    // "dts-bundle-generator":"2.0.0",
    // "rollup-plugin-terser":"4.0.1",
    // "tslib":"1.9.3"
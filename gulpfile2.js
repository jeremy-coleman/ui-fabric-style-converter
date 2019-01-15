var gulp = require('gulp')
var rollup = require('gulp-rollup')
var alias = require('rollup-plugin-alias')
//import autoExternal from 'rollup-plugin-auto-external'
//import typescript from 'rollup-plugin-typescript2'
//import {terser} from 'rollup-plugin-terser'

var pkgJson = require('./package.json')
var devDeps = Object.keys(pkgJson.devDependencies || {})
var peerDeps = Object.keys(pkgJson.peerDependencies || {})
var pkgDeps = Object.keys(pkgJson.dependencies || {})

var EXTERNALS = devDeps.concat(peerDeps).concat(pkgDeps)

const tsc = require('gulp-typescript').createProject('tsconfig.json', {
     module: "esnext",
     isolatedModules: true
});


gulp.task('roll1', () => {
    return gulp.src(['./src/**/*.{ts,tsx}'])
        .pipe(tsc())
        .pipe(gulp.dest('dist'))
})

gulp.task('roll', () => {
    return gulp.src(['./src/*.{ts,tsx}'])
        .pipe(tsc())
        .pipe(rollup({
            input: "./src/index",
            output: {format: 'es'},
            external: EXTERNALS,
            plugins:[
                alias({
                    '@uifabric': './src/@uifabric'
                }),
                require('rollup-plugin-auto-external')()
            ]
        }))
        .pipe(gulp.dest('dist'))
})
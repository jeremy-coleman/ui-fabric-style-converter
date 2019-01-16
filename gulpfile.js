const gulp = require('gulp');
const webpackStream = require('webpack-stream')
const webpack = require('webpack')
const webpackConfig = require('./webpack.winner.js')
var cp = require('child_process')


const tsc = require('gulp-typescript').createProject('tsconfig.json', {
     module: "esnext",
     isolatedModules: true
});


function getFileSize(filePath) {
  var size = fs.statSync(filePath).size;
  var i = Math.floor( Math.log(size) / Math.log(1024) );
  //@ts-ignore
  return ( size / Math.pow(1024, i) ).toFixed(2) * 1 + ' ' + ['B', 'KB', 'MB', 'GB', 'TB'][i];
}

function webpackBundle (){
  return webpackStream(webpackConfig, webpack)
  .pipe(gulp.dest('lib'))
}
gulp.task('webpack', webpackBundle)



gulp.task('tsc', () => {
   return gulp.src('./src/**/*.{ts,tsx}')
        .pipe(tsc())
        .pipe(gulp.dest('_DEBUG/es'))
   
   //return cp.spawn('rollup -c rollup.debug.js')
})



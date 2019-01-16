var Terser = require("terser");
var fs = require('fs')
var jetpack = require('fs-jetpack')



var TERSER_CONFIG = {
      parse: {},
      compress: {
          passes: 4,
          dead_code: true,
          keep_infinity: true
      },
      mangle: {
          properties: {}
        },
      output: {},
      sourceMap: {},
      ecma: 8, // specify one of: 5, 6, 7 or 8
      keep_classnames: false,
      keep_fnames: false,
      ie8: false,
      module: true,
      nameCache: null,
      safari10: false,
      toplevel: true,
      warnings: false
}

function getFileSize(filePath) {
  var size = fs.statSync(filePath).size;
  var i = Math.floor( Math.log(size) / Math.log(1024) );
  return ( size / Math.pow(1024, i) ).toFixed(2) * 1 + ' ' + ['B', 'KB', 'MB', 'GB', 'TB'][i];
}


async function runTerser(i,o){
  await jetpack.write(o, Terser.minify(jetpack.read(i), TERSER_CONFIG).code)
  console.log(getFileSize(o))
}
runTerser('./_DEBUG/bundle.js', './lib/terserified.js')

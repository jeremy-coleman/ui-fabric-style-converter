const webpack = require("webpack");
const path = require("path");
const TsConfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
const nodeExternals = require("webpack-node-externals");
const os = require('os')
const TerserWebpackPlugin = require('terser-webpack-plugin')
const ROOT = path.resolve(__dirname);
const getRoot = path.join.bind(path, ROOT);


const containsFilter = (...values) => filename => values.some(value => filename.indexOf(value) >= 0)
const isNodeModuleFile = containsFilter("node_modules");
const endsWithFilter = (...extensions) => filename => extensions.some(ext => filename.endsWith(ext));

const config = {
        externals:[nodeExternals()],
        stats: 'minimal',
        mode: "production",
        entry: {
            'webpack-winner2': ["./src/index.ts"],
        },

        output: {
            filename: "webpack-winner2.js",
            path: path.resolve(__dirname, 'lib'),
            //publicPath: './',
            libraryTarget: 'var',
            //pathinfo: true,
        },

        module: {
            rules: [
                {
                    test: endsWithFilter(".ts", ".tsx", ".js", ".jsx"),
                    loader: "ts-loader",
                    include: getRoot('src'),
                    options: {transpileOnly: true},
                    exclude: /node_modules/
                },

            ]
        },
        resolve: {
            extensions: [".js", ".ts", ".tsx", ".js", ".jsx"],
            plugins:[
                new TsConfigPathsPlugin()
            ]
        },

        //devtool: "none",

        plugins: [
            new webpack.optimize.ModuleConcatenationPlugin(),
            new webpack.optimize.OccurrenceOrderPlugin(),
        ],

  optimization: {
        //minimize: true,
        //nodeEnv: 'production',
        minimizer:[
        new TerserWebpackPlugin({
            //sourceMap: true,
            parallel: (os.cpus().length / 2) - 1,
            terserOptions: {
                parse: {
                    // parse options
                },
                compress: {
                    passes: 2,
                    //dead_code: true,
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
                sourceMap: {
                    // source map options
                },
                ecma: 8, // specify one of: 5, 6, 7 or 8
                keep_classnames: false,
                keep_fnames: false,
                ie8: false,
                module: true,
                nameCache: null, // or specify a name cache object
                safari10: false,
                toplevel: true,
                warnings: false,
            }
        })
        ],

//sanity check to make sure no vendors

        // splitChunks: {
        //     cacheGroups: {
        //         commons: {
        //         test: /[\\/]node_modules[\\/]/,
        //         name: 'vendors',
        //         chunks: 'all',
        //         },
        //     },
        // },
  }


};

module.exports = config




          	// cache: true,
			// parallel: true,
			// sourceMap: true,
			// uglifyOptions: {
			// 	warnings: false,
			// 	screw_ie8: true,
			// 	conditionals: true,
			// 	unused: true,
			// 	comparisons: true,
			// 	sequences: true,
			// 	dead_code: true,
			// 	evaluate: true,
			// 	if_return: true,
			// 	join_vars: true,
			// 	compress: {
			// 		drop_console: true,
			// 		warnings: false, // Suppress uglification warnings
			// 		pure_getters: true
			// 	},
			// 	output: {
			// 		comments: false
			// 	}
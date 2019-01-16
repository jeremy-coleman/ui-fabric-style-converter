const isProduction = process.env.NODE_ENV === "production";
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
            'webpack-loser': ["./src/index.ts"],
        },

        output: {
            filename: "webpack-normal-minify.js",
            path: path.resolve(__dirname, 'lib'),
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
            extensions: [".js", ".ts", ".tsx", ".js", ".jsx", ".json", ".mjs"],
            plugins: [
                new TsConfigPathsPlugin()
            ]
        },

        //devtool: "none",

        plugins: [
            new webpack.optimize.ModuleConcatenationPlugin(),
            new webpack.optimize.OccurrenceOrderPlugin(),
        ],

  optimization: {
        minimize: true,
        nodeEnv: 'production',
  },
  }



module.exports = config



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

          	// cache: true,
			// parallel: true,
			// sourceMap: true,
			// minify: {
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
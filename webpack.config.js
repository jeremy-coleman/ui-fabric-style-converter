const isProduction = process.env.NODE_ENV === "production";
const webpack = require("webpack");
const path = require("path");
const TsConfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
const nodeExternals = require("webpack-node-externals");



const ROOT = path.resolve(__dirname);
const getRoot = path.join.bind(path, ROOT);


const containsFilter = (...values) => filename => values.some(value => filename.indexOf(value) >= 0)
const isNodeModuleFile = containsFilter("node_modules");
const endsWithFilter = (...extensions) => filename => extensions.some(ext => filename.endsWith(ext));

// const PACKAGE_JSON_INFO = require('./tools/webpack/variables')

// let APP_CONFIG_PRODUCTION = {
//       production: 'true',
//       publicPath: './',
//       buildVersion: "DEV",
//       buildDate: new Date().toString(),
//       env: {
//         fabricFontBasePath: './',
//         fabricIconBasePath: './icons/fabric/'
//       }
//     }

// let AppConfig = APP_CONFIG_PRODUCTION

const config = {
        externals:[nodeExternals()],
        stats: 'minimal',
        mode: "production",
        entry: {
            'office-ui-fabric-react-wp': ["./src/index.ts"],
        },

        output: {
            filename: "[name].js",
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
            extensions: [".js", ".jsx", ".tsx", ".ts", ".json", ".mjs"],
            // modules: [path.resolve(__dirname, "src/@uifabric"), "node_modules"],
            // alias: {
            //     "package.json$": path.resolve(__dirname, "package.json"),
            //     "@uifabric": getRoot('src/@uifabric'),
            //     "office-ui-fabric-react": getRoot('office-ui-fabric-react'),
            // },

            plugins: [
              new TsConfigPathsPlugin({configFile: "./tsconfig.json"})
            ]
        },

        //devtool: "none",

        plugins: [
            new webpack.DefinePlugin({'process.env.NODE_ENV': JSON.stringify('production')}),
            //new webpack.DefinePlugin({'PACKAGE_JSON_INFO': JSON.stringify(PACKAGE_JSON_INFO)}),

            new webpack.optimize.ModuleConcatenationPlugin(),
            //new LodashModuleReplacementPlugin({paths: true}),
            
            // new CopyWebpackPlugin([
            //     { from: "tools/assets/fonts/ms", to: "fonts" },
            //     { from: "node_modules/@uifabric/icons/fonts", to: "icons/fabric"}
            // ]),
        ],

  optimization: {
    minimize: true,
    nodeEnv: 'production'
  }

// optimization: {
//     splitChunks: {
//       cacheGroups: {
//         commons: {
//           test: /[\\/]node_modules[\\/]/,
//           name: 'vendors',
//           chunks: 'all',
//         },
//       },
//     },
//     minimizer:[
//       new TerserWebpackPlugin()
//     ]
//   }

};

module.exports = config





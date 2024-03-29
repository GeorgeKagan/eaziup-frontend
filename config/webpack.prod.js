/**
 * @author: tipe.io
 */
const helpers = require('./helpers');
const buildUtils = require('./build-utils');

/**
 * Used to merge webpack configs
 */
const webpackMerge = require('webpack-merge');
/**
 * The settings that are common to prod and dev
 */
const commonConfig = require('./webpack.common.js');

/**
 * Webpack Plugins
 */
const SourceMapDevToolPlugin = require('webpack/lib/SourceMapDevToolPlugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HashedModuleIdsPlugin = require('webpack/lib/HashedModuleIdsPlugin');
const PurifyPlugin = require('@angular-devkit/build-optimizer').PurifyPlugin;
const ModuleConcatenationPlugin = require('webpack/lib/optimize/ModuleConcatenationPlugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const DefinePlugin = require('webpack/lib/DefinePlugin');



function getUglifyOptions (supportES2015) {
    const uglifyCompressOptions = {
        pure_getters: true, /* buildOptimizer */
        // PURE comments work best with 3 passes.
        // See https://github.com/webpack/webpack/issues/2899#issuecomment-317425926.
        passes: 3         /* buildOptimizer */
    };

    return {
        ecma: supportES2015 ? 6 : 5,
        warnings: false,
        ie8: false,
        mangle: true,
        compress: uglifyCompressOptions,
        output: {
            ascii_only: true,
            comments: false
        }
    };
}

module.exports = function (env) {
    const ENV = process.env.NODE_ENV = process.env.ENV = 'production';
    const supportES2015 = buildUtils.supportES2015(buildUtils.DEFAULT_METADATA.tsConfigPath);
    const METADATA = Object.assign({}, buildUtils.DEFAULT_METADATA, {
        host: process.env.HOST || 'localhost',
        port: process.env.PORT || 8080,
        ENV: ENV,
        HMR: false
    });

    // set environment suffix so these environments are loaded.
    METADATA.envFileSuffix = METADATA.E2E ? 'e2e.prod' : 'prod';

    return webpackMerge(commonConfig({ env: ENV, metadata: METADATA }), {

        /**
         * Options affecting the output of the compilation.
         *
         * See: https://webpack.js.org/configuration/output/
         */
        output: {

            /**
             * The output directory as absolute path (required).
             *
             * See: https://webpack.js.org/configuration/output/#output-path
             */
            path: helpers.root('dist'),

            /**
             * Specifies the name of each output file on disk.
             * IMPORTANT: You must not specify an absolute path here!
             *
             * See: https://webpack.js.org/configuration/output/#output-filename
             */
            filename: '[name].[chunkhash].bundle.js',

            /**
             * The filename of the SourceMaps for the JavaScript files.
             * They are inside the output.path directory.
             *
             * See: https://webpack.js.org/configuration/output/#output-sourcemapfilename
             */
            sourceMapFilename: '[file].map',

            /**
             * The filename of non-entry chunks as relative path
             * inside the output.path directory.
             *
             * See: https://webpack.js.org/configuration/output/#output-chunkfilename
             */
            chunkFilename: '[name].[chunkhash].chunk.js'

        },

        module: {

            rules: [

                /**
                 * Extract CSS files from .src/styles directory to external CSS file
                 */
                {
                    test: /\.css$/,
                    loader: ExtractTextPlugin.extract({
                        fallback: 'style-loader',
                        use: 'css-loader'
                    }),
                    include: [helpers.root('src', 'styles')]
                },

                /**
                 * Extract and compile SCSS files from .src/styles directory to external CSS file
                 */
                {
                    test: /\.scss$/,
                    loader: ExtractTextPlugin.extract({
                        fallback: 'style-loader',
                        use: 'css-loader!sass-loader'
                    }),
                    include: [helpers.root('src', 'styles')]
                },

            ]

        },

        /**
         * Add additional plugins to the compiler.
         *
         * See: https://webpack.js.org/configuration/plugins/
         */
        plugins: [

            new SourceMapDevToolPlugin({
                filename: '[file].map[query]',
                moduleFilenameTemplate: '[resource-path]',
                fallbackModuleFilenameTemplate: '[resource-path]?[hash]',
                sourceRoot: 'webpack:///'
            }),


            /**
             * Plugin: ExtractTextPlugin
             * Description: Extracts imported CSS files into external stylesheet
             *
             * See: https://github.com/webpack/extract-text-webpack-plugin
             */
            new ExtractTextPlugin('[name].[contenthash].css'),

            /**
             * Plugin: DefinePlugin
             * Description: Define free variables.
             * Useful for having development builds with debug logging or adding global constants.
             *
             * Environment helpers
             *
             * See: https://webpack.github.io/docs/list-of-plugins.html#defineplugin
             */
            // NOTE: when adding more properties make sure you include them in custom-typings.d.ts
            new DefinePlugin({
                'SITE_URL': JSON.stringify('https://eaziup-47293.firebaseapp.com'),
                'API_URL': JSON.stringify('http://46.101.121.45/api'),
                'IS_DEV': JSON.stringify(false),
                'IS_TEST': JSON.stringify(false),
                'IS_PROD': JSON.stringify(true),
            }),

            new PurifyPlugin(), /* buildOptimizer */

            new HashedModuleIdsPlugin(),
            new ModuleConcatenationPlugin(),

            /**
             * Plugin: UglifyJsPlugin
             * Description: Minimize all JavaScript output of chunks.
             * Loaders are switched into minimizing mode.
             *
             * See: https://webpack.js.org/plugins/uglifyjs-webpack-plugin/
             *
             * NOTE: To debug prod builds uncomment //debug lines and comment //prod lines
             */
            new UglifyJsPlugin({
                sourceMap: true,
                parallel: true,
                uglifyOptions: getUglifyOptions(supportES2015)
            }),

            /**
             * Plugin: CompressionPlugin
             * Description: Prepares compressed versions of assets to serve
             * them with Content-Encoding
             *
             * See: https://github.com/webpack/compression-webpack-plugin
             */
            //  install compression-webpack-plugin
            /*      new CompressionPlugin({
                    regExp: /\.css$|\.html$|\.js$|\.map$/,
                    threshold: 2 * 1024
                  })*/

        ],

        /**
         * Include polyfills or mocks for various node stuff
         * Description: Node configuration
         *
         * See: https://webpack.js.org/configuration/node/
         */
        node: {
            global: true,
            crypto: 'empty',
            process: false,
            module: false,
            clearImmediate: false,
            setImmediate: false,
            fs: 'empty'
        }

    });
};

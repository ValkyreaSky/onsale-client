const path = require('path');
const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const WorkboxWebpackPlugin = require('workbox-webpack-plugin');
const SpriteLoaderPlugin = require('svg-sprite-loader/plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest');

module.exports = (env, argv) => {
  // Webpack mode sets 'process.env.NODE_ENV' value to 'development' or 'production' and tells webpack to use its
  // built-in optimizations
  const isProduction = argv.mode === 'production';
  // Disable/enable generating source maps in 'production' mode
  const shouldUseSourceMaps = false;
  // List of rarely updated packages which are going to be in separate bundle
  const vendorLibs = [
    'react', 'react-dom', 'react-router-dom', 'react-redux', 'redux', 'redux-thunk', 'antd',
  ];

  return ({
    // Entries are the root files from which webpack will start reading code (each entry generates separate bundle)
    entry: {
      // 'vendors' bundle contains packages listed in 'vendorLibs' - they go to separate bundle because they are
      // usually update less often and user in case on app update will need to download less data ('vendors' bundle
      // will be served from cache)
      vendors: vendorLibs,
      // 'app' bundle contains '@babel/polyfill' (new built-ins like 'Promise', 'Array.from' or 'Object.assign' will
      // be polyfilled) and the rest of the application code and packages
      app: ['@babel/polyfill', './src/index.jsx'],
    },
    // Output bundle settings
    output: {
      // Absolute path to directory where bundles will be saved
      path: path.resolve(__dirname, 'dist'),
      // 'publicPath' specifies the base path for all the assets within application (assignment of '/' will generate
      // '/assets/js/app.js' instead of 'assets/js/app.js')
      publicPath: '/',
      // Name of generated bundles ('[name]' is bundle entry name e.g. 'vendors')
      filename: 'assets/js/[name].[hash:8].js',
      // Name of generated chunks
      chunkFilename: 'assets/js/[name].[chunkhash:8].js',
    },
    module: {
      rules: [
        {
          // 'oneOf' will traverse all following loaders until one will match the requirements - when no loader matches
          // it will fall to the 'file-loader' at the end of the loaders list
          oneOf: [
            // 'url-loader' works like 'file-loader' except that it embeds assets smaller than limit specified in bytes
            // (10 kilobytes in this case) as base64 URLs to limit the number of HTTP requests
            {
              test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/],
              loader: 'url-loader',
              options: {
                limit: 10000,
              },
            },
            // 'svg-sprite-loader' creates SVG sprite (one file containing all SVG icons) to limit the number of HTTP
            // requests (this won't work without 'SpriteLoaderPlugin' in 'plugins')
            {
              test: /\.svg$/,
              loader: 'svg-sprite-loader',
              options: {
                extract: true,
                spriteFilename: 'assets/media/sprite.[hash:8].svg',
              },
            },
            // 'babel-loader' processes JavaScript files with Babel (configuration is located in '/babel.config.js')
            {
              test: /\.js|jsx$/,
              exclude: /node_modules/,
              use: {
                loader: 'babel-loader',
                options: {
                  // Enable caching results in './node_modules/.cache/babel-loader/' directory for faster rebuilds
                  cacheDirectory: !isProduction,
                  // Not include needless whitespace characters and line terminators
                  compact: isProduction,
                  // Disable cache gzipping to for faster rebuilds
                  cacheCompression: false,
                },
              },
            },
            // Process CSS and SCSS files with listed loaders
            {
              test: /\.s|css$/,
              include: [
                path.resolve(__dirname, 'src'),
                path.resolve(__dirname, 'node_modules/antd'),
              ],
              use: [
                // In 'production' mode 'MiniCssExtractPlugin' grabs the result CSS and puts it into separate file in
                // the build process (this won't work without 'MiniCssExtractPlugin' in 'plugins') and in 'development'
                // mode 'style-loader' turns CSS into JS modules, adds them to the HTML document by injecting '<style>'
                // tags and enables hot editing of CSS
                isProduction
                  ? {
                    loader: MiniCssExtractPlugin.loader,
                    options: {
                      publicPath: '../../',
                    },
                  }
                  : 'style-loader',
                {
                  loader: 'css-loader',
                  options: {
                    // This option configures how many loaders before 'css-loader' should be applied to imported
                    // resources ('postcss-loader' and 'sass-loader' in this case)
                    importLoaders: 2,
                    sourceMap: true,
                  },
                },
                // PostCSS configuration is located in '/postcss.config.js' file
                {
                  loader: 'postcss-loader',
                  options: {
                    sourceMap: true,
                  },
                },
                // 'sass-loader' uses 'node-sass' to compile Sass code
                {
                  loader: 'sass-loader',
                  options: {
                    // data: '@import "variables"; @import "functions"; @import "mixins";',
                    // includePaths: [
                    //   path.resolve(__dirname, 'src', 'styles'),
                    // ],
                    sourceMap: true,
                  },
                },
              ],
            },
            // 'file-loader' doesn't use a 'test' so it will catch all modules that fall through the other loaders and
            // copy them to the 'dist' folder
            {
              exclude: [/\.(js|jsx|mjs)$/, /\.html$/, /\.json$/],
              loader: 'file-loader',
              options: {
                name: 'assets/media/[name].[hash:8].[ext]',
              },
            },
          ],
        },
      ],
    },
    plugins: [
      new webpack.NamedModulesPlugin(),
      // Enable Hot Module Replacement
      new webpack.HotModuleReplacementPlugin(),
      // Generate an 'index.html' file with the injected scripts and styles
      new HtmlWebpackPlugin({
        inject: true,
        template: './src/templates/index.html',
        // Content of '<title>' tag
        title: 'Selli | Free worldwide classified ads',
        // Content of '<meta name="description">' tag
        description: 'Selli is site for free worldwide classifieds ads. Buy and sell items, cars, properties, and find or offer jobs in your area.',
        // Content of '<meta name="application-name">' tag
        applicationName: 'Selli',
        minify: {
          removeComments: isProduction,
          collapseWhitespace: isProduction,
          removeRedundantAttributes: isProduction,
          useShortDoctype: isProduction,
          removeEmptyAttributes: isProduction,
          removeStyleLinkTypeAttributes: isProduction,
          keepClosingSlash: isProduction,
          minifyJS: isProduction,
          minifyCSS: isProduction,
          minifyURLs: isProduction,
        },
      }),
      // This won't work without 'MiniCssExtractPlugin.loader' in 'loaders'
      new MiniCssExtractPlugin({
        filename: 'assets/css/styles.[contenthash:8].css',
      }),
      // Minimize output CSS files and generate sourcemap
      new OptimizeCssAssetsPlugin({
        cssProcessorOptions: {
          map: shouldUseSourceMaps && {
            inline: false, annotation: true,
          },
        },
      }),
      // Generate Service Worker ('service-worker.js' by default)
      new WorkboxWebpackPlugin.GenerateSW({
        clientsClaim: true,
        skipWaiting: true,
        include: [/\.js$/, /\.css$/, /\.html$/, /\.svg$/],
        exclude: [/\.jpg$/, /\.png$/],
      }),
      // This won't work without 'svg-sprite-loader' in 'loaders'
      new SpriteLoaderPlugin({
        plainSprite: true,
      }),
      // Generate 'manifest.json' file
      new WebpackPwaManifest({
        name: 'Selli',
        short_name: 'Selli',
        description: 'Free worldwide classified ads',
        display: 'standalone',
        start_url: '/',
        orientation: 'portrait',
        background_color: '#ffffff',
        theme_color: '#ffffff',
        fingerprints: false,
        inject: true,
        ios: true,
        icons: [
          {
            src: path.resolve('src/assets/app-icons/icon-android.png'),
            destination: path.join('assets', 'icons', 'android'),
            sizes: [36, 48, 72, 96, 144, 192, 512],
          },
          {
            src: path.resolve('src/assets/app-icons/icon-ios.png'),
            destination: path.join('assets', 'icons', 'ios'),
            sizes: [57, 72, 144, 120, 144, 152, 167, 180],
            ios: true,
          },
        ],
      }),
    ],
    resolve: {
      // Extensions that can be omitted when importing files
      extensions: ['.js', '.jsx'],
      // Mark '/src' directory as modules directory to avoid '../../../../'
      modules: [path.resolve(__dirname, 'src'), './node_modules'],
    },
    // Generate fast sourcemaps in 'development' mode and slow but with good results in 'production' mode
    devtool: isProduction ? shouldUseSourceMaps && 'source-map' : 'cheap-module-source-map',
    // Webpack DevServer configuration
    devServer: {
      // Tell webpack where to serve content from
      contentBase: path.resolve(__dirname, 'dist'),
      // Enable visiting page on other devices connected to the same network
      host: '0.0.0.0',
      // Response with 'index.html' on every URL
      historyApiFallback: true,
      // Enable 'gzip' compression of generated files
      compress: true,
      // Enable Hot Module Replacement
      hot: true,
      // Configure console output (in this case only warnings and errors with its' details will be shown)
      stats: {
        all: false,
        warnings: true,
        errors: true,
        errorDetails: true,
      },
    },
    // Enable optimization - webpack will remove packages listed in 'vendors' bundle from 'app' bundle
    optimization: {
      splitChunks: {
        cacheGroups: {
          commons: {
            // The name of the chunk (same as bundle entry)
            name: 'vendors',
            chunks: 'initial',
            // Select only modules from '/node_modules' directory
            test: /[\\/]node_modules[\\/]/,
          },
        },
      },
    },
  });
};

// webpack.config.js

'use strict';

const path = require('path');
const CKEditorWebpackPlugin = require('@ckeditor/ckeditor5-dev-webpack-plugin');
const { styles } = require('@ckeditor/ckeditor5-dev-utils');

module.exports = {
  entry: './app.js',

  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js'
  },

  plugins: [
    new CKEditorWebpackPlugin({
      // See https://ckeditor.com/docs/ckeditor5/latest/features/ui-language.html
      language: 'en',
      additionalLanguages: ['fa',],
    })
  ],

  module: {
    rules: [
      {
        test: /ckeditor5-[^/\\]+[/\\]theme[/\\]icons[/\\][^/\\]+\.svg$/,
        use: ['raw-loader']
      },
      {
        test: /ckeditor5-[^/\\]+[/\\]theme[/\\].+\.css$/,
        use: [
          {
            loader: 'style-loader',
            options: {
              injectType: 'singletonStyleTag',
              attributes: {
                'data-cke': true
              }
            }
          },
          {
            loader: 'postcss-loader',
            options: styles.getPostCssConfig({
              themeImporter: {
                themePath: require.resolve('@ckeditor/ckeditor5-theme-lark')
              },
              minify: true
            })
          },
        ]
      }
    ]
  },

  // Useful for debugging.
  devtool: 'source-map',

  // By default webpack logs warnings if the bundle is bigger than 200kb.
  performance: { hints: false }
};
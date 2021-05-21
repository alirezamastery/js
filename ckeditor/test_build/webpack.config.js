const CKEditorWebpackPlugin = require('@ckeditor/ckeditor5-dev-webpack-plugin');
const { styles } = require('@ckeditor/ckeditor5-dev-utils');
const path = require('path');

module.exports = {
  entry: './src/ckeditor.js',
  // entry: './src/app.js',

  output: {
    // library: 'ClassicEditor',
    // library: 'CKEDITOR',
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js'
  },

  // plugins: [
  //   // ...

  //   new CKEditorWebpackPlugin({
  //     // See https://ckeditor.com/docs/ckeditor5/latest/features/ui-language.html
  //     language: 'fa'
  //   })
  // ],

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
  }
};
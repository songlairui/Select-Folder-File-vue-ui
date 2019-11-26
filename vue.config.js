const merge = require("deepmerge");
const path = require("path");

module.exports = {
  pluginOptions: {
    i18n: {
      locale: "zh",
      fallbackLocale: "en",
      localeDir: "locales",
      enableInSFC: false
    }
  },
  configureWebpack: {
    resolve: {
      symlinks: false
    }
  },

  chainWebpack: config => {
    config.module
      .rule("stylus")
      .oneOf("vue")
      .use("postcss-loader")
      .tap(options =>
        merge(options, {
          config: {
            path: path.resolve(__dirname, ".postcssrc")
          }
        })
      );
  },

  css: {
    loaderOptions: {
      stylus: {
        import: ["~@/style/imports"]
      }
    }
  }
};

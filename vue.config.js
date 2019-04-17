module.exports = {
  configureWebpack: {
    devtool: 'source-map'
  },
  transpileDependencies: [/\bvue-awesome\b/],
  baseUrl: process.env.NODE_ENV === 'production' ? '/control/' : '/',

  devServer: {
    port: 8080
  },

  css: {
    loaderOptions: {
      sass: {
        data: '@import ./src/styles/util/util.sass'
      }
    }
  }
};

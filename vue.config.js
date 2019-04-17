module.exports = {
  configureWebpack: {
    devtool: 'source-map'
  },
  transpileDependencies: [/\bvue-awesome\b/],
  publicPath: '/',

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

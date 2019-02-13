module.exports = {
  modify(config, { target, dev }, webpack) {
    const appConfig = config

    appConfig.module.rules.push({
      test: /\.js$/,
      loader: 'strip-loader?strip[]=debug'
    })

    appConfig.plugins.push(
      new webpack.NormalModuleReplacementPlugin(
        /debug/,
        __dirname + '/src/noop.js'
      )
    )

    return appConfig
  }
}

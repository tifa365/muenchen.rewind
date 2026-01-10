module.exports = {
  publicPath: process.env.NODE_ENV === 'production' ? '/muenchen.rewind/' : '/',
  chainWebpack: config => {
  config
    .plugin('html')
    .tap(args => {
        args[0].meta = require('./package.json').meta
        return args;
    })
  }
}

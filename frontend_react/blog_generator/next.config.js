const withPlugins = require('next-compose-plugins')
const withLess = require('@zeit/next-less')
const path = require('path')
// const Dotenv = require('dotenv-webpack')

// fix: prevents error when .less files are required by node
if (typeof require !== 'undefined') {
    require.extensions['.less'] = file => {}
}

module.exports = withPlugins([
  withLess({
    lessLoaderOptions: {
      javascriptEnabled: true,
    },
    webpack(config, options) {
      const { isServer } = options
      const nextConfig = Object.assign({ inlineImageLimit: 8192, assetPrefix: '' }, {})

      /*
       * config.rsvole.alias
       */
      config.resolve.alias = config.resolve.alias || {}

      config.resolve.alias['@src'] = path.join(__dirname, 'src')
      config.resolve.alias['@components'] = path.join(__dirname, 'src', 'components')
      config.resolve.alias['@public'] = path.join(__dirname, 'public')
      config.resolve.alias['@api'] = path.join(__dirname, 'src/apis')

      /*
       * config.module.rules
       * file-loader 플러그인 추가
       */
      config.module.rules.push({
        test: /\.(jpe?g|png|svg|gif|ico|webp)$/,
        exclude: nextConfig.exclude,
        use: [
          {
            loader: require.resolve("url-loader"),
            options: {
              limit: nextConfig.inlineImageLimit,
              fallback: require.resolve("file-loader"),
              publicPath: `/_next/static/images/`,
              outputPath: `${isServer ? "../" : ""}static/images/`,
              name: "[name]-[hash].[ext]"
            }
          }
        ]
      })

      return config
    }
  })
], {
  publicRuntimeConfig: {
    API_URL: process.env.API_URL
  }
})
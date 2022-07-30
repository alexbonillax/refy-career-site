const path = require('path')
const { i18n } = require('./next-i18next.config');

const nextConfig = {
  reactStrictMode: true,
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')],
  },
  images: {
    domains: ["https://refy.s3-eu-west-1.amazonaws.com/images/xl"]
  },
  i18n,
}

module.exports = nextConfig

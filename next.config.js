const path = require('path')
const { i18n } = require('./next-i18next.config');

const nextConfig = {
  reactStrictMode: false,
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')],
  },
  images: {
    formats: ['image/avif', 'image/webp'],
    domain: ['refy.s3-eu-west-1.amazonaws.com'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'refy.s3-eu-west-1.amazonaws.com',
        port: '',
        pathname: '/images/**',
      },
    ],
  },
  i18n,
}

module.exports = nextConfig

const path = require("path");
const HttpBackend = require('i18next-http-backend/cjs')
const ChainedBackend = require('i18next-chained-backend').default
const LocalStorageBackend = require('i18next-localstorage-backend').default


const isBrowser = typeof window !== 'undefined'

module.exports = {
  i18n: {
    locales: ["en", "es"],
    defaultLocale: "es",
    localePath: path.resolve("./public/locales"), // Warn: dev mode says warning but whitout it PROD doesnt get path on shared components
    defaultNS: "common", // Warn: dev mode says warning but whitout it PROD doesnt get path on shared components
    ns: ["common"],// Warn: dev mode says warning but whitout it PROD doesnt get path on shared components
  },
  backend: {
    backendOptions: [{ expirationTime: 60 * 60 * 1000 }, {}], // 1 hour
    backends: isBrowser ? [LocalStorageBackend, HttpBackend] : [],
  },
  serializeConfig: false,
  use: isBrowser ? [ChainedBackend] : [],
  reloadOnPrerender: true,
};

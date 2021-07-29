module.exports = ({ env }) => ({
  load: {
    before: [
      "cookieGetter",
      "responseTime",
      "logger",
      "cors",
      "responses",
      "gzip",
    ],
    order: [
      "Define the middlewares' load order by putting their name in this array is the right order",
    ],
    after: ["parser", "router", "cookieSetter"],
  },
  settings: {
    cors: {
      origin: ['https://dekra-form-api-m8bsw.ondigitalocean.app', 'https://dekra-form-8a7iy.ondigitalocean.app'],
    },
    cookieGetter: {
      enabled: true,
    },
    cookieSetter: {
      enabled: true,
    },
  },
});






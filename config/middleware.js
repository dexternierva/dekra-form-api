module.exports = ({ env }) => ({
  settings: {
    cors: {
      enabled: true,
      origin: ['https://dekra-form-8a7iy.ondigitalocean.app', 'https://dekra-form-api-m8bsw.ondigitalocean.app', 'ondigitalocean.app'],
      headers: [
        "Content-Type",
        "Authorization",
        "X-Frame-Options",
        "access-control-allow-origin"
      ]
    }
  },
});






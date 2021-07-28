module.exports = () => ({
  settings: {
    cors: {
      enabled: true,
      credentials: true,
      origin: ['https://dekra-form-8a7iy.ondigitalocean.app', 'https://dekra-form-api-m8bsw.ondigitalocean.app'],
      headers: [
        "Content-Type",
        "Authorization",
        "X-Frame-Options",
        "access-control-allow-origin"
      ]
    },
  },
});


module.exports = () => ({
  settings: {
    cors: {
      enabled: true,
      origin: "http://localhost:3000, https://dekra-form-api-m8bsw.ondigitalocean.app/",
      headers: [
        "Content-Type",
        "Authorization",
        "X-Frame-Options",
        "access-control-allow-origin"
      ]
    },
  },
});
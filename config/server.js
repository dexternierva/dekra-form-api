module.exports = ({ env }) => ({
  host: env('HOST', '0.0.0.0'),
  port: env.int('PORT', 1337),
  proxy: true,
  admin: {
    auth: {
      secret: env('ADMIN_JWT_SECRET', 'ef8e7db1a58b0884ed2bf5a179460149'),
    },
  },
});

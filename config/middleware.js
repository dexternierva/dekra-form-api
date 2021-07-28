// module.exports = () => ({
//   settings: {
//     cors: {
//       enabled: true,
//       credentials: true,
//       origin: ['https://dekra-form-8a7iy.ondigitalocean.app', 'https://dekra-form-api-m8bsw.ondigitalocean.app'],
//       headers: [
//         "Content-Type",
//         "Authorization",
//         "X-Frame-Options",
//         "access-control-allow-origin"
//       ]
//     },
//   },
// });

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
      enabled: true,
      origin: [
        env("CLIENT_URL", "https://dekra-form-8a7iy.ondigitalocean.app"),
        env("API_URL", "https://dekra-form-api-m8bsw.ondigitalocean.app"),
      ],
    },
    cookieGetter: {
      enabled: true,
    },
    cookieSetter: {
      enabled: true,
    },
  },
});

// cookieSetter
module.exports = (strapi) => {
  return {
    initialize() {
      strapi.app.use(async (ctx, next) => {
        await next();
        if (
          ctx.request.url.startsWith("/auth/") &&
          ctx.response.status === 200
        ) {
          const { jwt: jwtToken } = ctx.response.body;
          ctx.cookies.set("token", jwtToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            maxAge: 1000 * 60 * 60 * 24 * 14, // 14 Day Age
            domain: process.env.CLIENT_HOSTNAME,
            sameSite: "none",
            overwrite: true,
          });
        }
      });
    },
  };
};

// cookieGetter
module.exports = (strapi) => {
  return {
    initialize() {
      strapi.app.use(async (ctx, next) => {
        if (
          ctx.request &&
          ctx.request.header &&
          !ctx.request.header.authorization
        ) {
          const token = ctx.cookies.get("token");
          if (token) {
            ctx.request.header.authorization = `Bearer ${token}`;
          }
        }
        await next();
      });
    },
  };
};
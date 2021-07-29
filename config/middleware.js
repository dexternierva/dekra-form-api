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
      origin: ['https://dekra-form-api-m8bsw.ondigitalocean.app/', 'https://dekra-form-8a7iy.ondigitalocean.app/'],
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
            secure: process.env.NODE_ENV === "production" ? true : false,
            maxAge: 1000 * 60 * 60 * 24 * 14, // 14 Day Age
            domain: process.env.CLIENT_HOSTNAME,
            sameSite: process.env.NODE_ENV === "development" ? true : "none",
            overwrite: true,
          });

          console.log("*** process.env: ", process.env);
          console.log("*** jwt: ", jwt);
          console.log("*** jwtToken: ", jwtToken);
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


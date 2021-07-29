module.exports = (strapi) => {
  return {
    initialize() {
      strapi.app.use(async (ctx, next) => {
        await next();
        if (
          ctx.request.url.startsWith("/auth/") &&
          ctx.response.status === 200
        ) {
          console.log("CTX.RESPONSE.BODY: ", ctx.response.body);
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
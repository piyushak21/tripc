import { createProxyMiddleware } from "http-proxy-middleware";

module.exports = function (app) {
  app.use(
    "/api",
    createProxyMiddleware({
      target: "http://13.233.93.5:9001",
      changeOrigin: true,
    })
  );
};

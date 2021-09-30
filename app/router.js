module.exports = (app) => {
  const { router, controller } = app;
  router.get("/", controller.home.index);
  router.get("/news", controller.news.list);
  router.get("/sql", controller.news.sql);
  router.get("/redis", controller.news.redis);
  router.get("/gui", controller.news.gui);
  // user
  router.get("/user/login", controller.user.login);
  router.post("/scp/login", controller.scp.login);
  router.post("/scp/scpUpload", controller.scp.scpUpload);
};

exports.keys = "fahsghahgh";
exports.news = {
  pageSize: 5,
  serverUrl: "https://hacker-news.firebaseio.com/v0",
};
exports.mysql = {
  client: {
    host: "localhost",
    port: "3306",
    user: "root",
    password: "root",
    database: "blog",
  },
  app: true,
  agent: false,
};
exports.redis = {
  client: {
    port: 6379,
    host: "127.0.0.1",
    password: "",
    db: 0,
  },
};
exports.security = {
  csrf: {
    enable: false,
  },
};
exports.multipart = {
  mode: "stream",
  fileSize: "50mb",
  fileExtensions: [".rar", ".tgz"],
};

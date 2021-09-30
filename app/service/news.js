// app/service/news.js
const Service = require("egg").Service;

class NewsService extends Service {
  async list(page = 1) {
    // read config
    const { serverUrl, pageSize } = this.config.news;
    // use build-in http client to GET hacker-news api
    const res = await this.ctx.curl(
      `https://www.baidu.com/sugrec?prod=pc_his&from=pc_web&json=1&sid=34653_34442_34067_34749_34656_34711_34524_34584_34106_26350_34726_34627_34425_22157_34691&hisdata=%5B%7B%22time%22%3A1622599426%2C%22kw%22%3A%22node%22%7D%2C%7B%22time%22%3A1622599610%2C%22kw%22%3A%22vscode%22%7D%2C%7B%22time%22%3A1622600014%2C%22kw%22%3A%22vscode%E8%AE%BE%E7%BD%AE%E4%B8%AD%E6%96%87%22%7D%2C%7B%22time%22%3A1622600273%2C%22kw%22%3A%22%E4%BC%81%E4%B8%9A%E5%BE%AE%E4%BF%A1%22%7D%5D&_t=1632739367019&req=2&bs=%E9%AB%98%E5%BE%B7%E5%9C%B0%E5%9B%BE&csor=0`
    );

    console.log(res);

    return res;

    // parallel GET detail
    // const newsList = await Promise.all(
    //   Object.keys(idList).map((key) => {
    //     const url = `${serverUrl}/item/${idList[key]}.json`;
    //     return this.ctx.curl(url, { dataType: "json" });
    //   })
    // );
    // return newsList.map((res) => res.data);
  }

  async sql() {
    return await this.app.mysql.get("user");
  }

  async redis() {
    return await this.app.redis.get("name");
  }

  async gui() {
    return "你就是鬼屋吧";
  }
}

module.exports = NewsService;

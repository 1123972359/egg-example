const Controller = require("egg").Controller;

class NewsController extends Controller {
  async list() {
    const ctx = this.ctx;
    const page = ctx.query.page || 1;
    const newsList = await ctx.service.news.list(page);
    ctx.body = newsList;
  }

  async sql() {
    const ctx = this.ctx;
    ctx.body = await ctx.service.news.sql();
  }

  async redis() {
    const ctx = this.ctx;
    ctx.body = await ctx.service.news.redis();
  }

  async gui(){

    const ctx = this.ctx;
    ctx.body = await ctx.service.news.gui();
  }
}

module.exports = NewsController;

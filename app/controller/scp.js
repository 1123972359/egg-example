const path = require("path");
const Controller = require("egg").Controller;

class ScpController extends Controller {
  async login() {
    const ctx = this.ctx;
    const { username, password } = ctx.request.body;
    const res = await ctx.service.scp.login({ username, password });
    ctx.body = res;
  }

  async scpUpload() {
    const { ctx } = this;
    const token = ctx.request.header["scp-token"];
    const flag = await ctx.service.scp.checkScpTokenRedis({ token });
    if (!flag) {
      ctx.body = {
        code: -1,
        msg: "登陆状态丢失",
        data: null,
      };
      return;
    }
    const stream = await ctx.getFileStream();
    ctx.body = await ctx.service.scp.scpUpload({ file: stream });
  }
}

module.exports = ScpController;

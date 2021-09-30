const Controller = require("egg").Controller;
const path = require("path");
const fs = require("fs");

class UserController extends Controller {
  async login() {
    this.ctx.body = {
      code: "0",
      data: path.resolve(__dirname),
    };
  }
}

module.exports = UserController;

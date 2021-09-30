const path = require("path");
const Controller = require("egg").Controller;

class HomeController extends Controller {
  async index() {
    this.ctx = path.resolve(process.cwd(), "public/dist/index.html");
  }
}

module.exports = HomeController;

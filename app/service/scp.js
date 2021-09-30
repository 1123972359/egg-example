const sha256 = require("sha256");
const path = require("path");
const fs = require("fs");
const shell = require("shelljs");
const Service = require("egg").Service;

class ScpService extends Service {
  // 登陆
  async login({ username = "", password = "" }) {
    const user = await this.app.mysql.select("scp_user", {
      where: {
        username,
        password,
      },
    });
    if (user.length > 0) {
      // 登陆成功，redis存储token
      const token = await this.setTokenRedis(username);
      return { code: 0, msg: "scp登陆成功", data: { token } };
    }
    return { code: -1, msg: "scp登陆失败：用户名或密码错误", data: null };
  }

  // redis: 存用户登陆token
  async setTokenRedis(username = "") {
    // sha256
    const token = sha256(username + new Date().getTime());
    await this.app.redis.set(token, 1);
    return token;
  }

  // redis: 查看是否有对应的token
  async checkScpTokenRedis({ token = "" }) {
    return await this.app.redis.get(token);
  }

  async scpUpload({ file = "" }) {
    function streamToBuffer(stream) {
      return new Promise((resolve, reject) => {
        let buffers = [];
        stream.on("error", reject);
        stream.on("data", (data) => buffers.push(data));
        stream.on("end", () => resolve(Buffer.concat(buffers)));
      });
    }
    const filePath = path.resolve(process.cwd() + "/app/public", "dist.tgz");
    // 创建写入流
    const buffer = await streamToBuffer(file);
    var writerStream = fs.createWriteStream(filePath);
    writerStream.write(buffer, "UTF8");
    writerStream.end();
    writerStream.on("finish", function () {
      shell.exec(`tar -zxvf ${filePath}`);
      // 删除public下旧dist
      shell.exec(
        `rm -rf ${path.resolve(process.cwd() + "/app/public", "dist")}`
      );
      // 移动新dist到public下
      shell.exec(
        `cp -arf ${path.resolve(process.cwd(), "dist")} ${path.resolve(
          process.cwd() + "/app/public"
        )}`
      );
      // 删除根部dist
      shell.exec(`rm -rf ${path.resolve(process.cwd(), "dist")}`);
      // 删除压缩包
      shell.exec(`rm -f ${filePath}`);
      return { code: 0, msg: "scp上传成功", data: null };
    });

    writerStream.on("error", function (err) {
      return { code: -2, msg: "scp上传失败", data: null };
    });
  }
}

module.exports = ScpService;

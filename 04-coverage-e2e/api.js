const http = require("http");
const DEFAULT_USER = { username: "Pedrecal", password: "a1b2c3" };

const routes = {
  "/contact:get": (req, res) => {
    res.write("contact us page");
    return res.end();
  },

  "/login:post": async (req, res) => {
    for await (const data of req) {
      const user = JSON.parse(data);
      if (
        user.username !== DEFAULT_USER.username ||
        user.password !== DEFAULT_USER.password
      ) {
        res.writeHead(401);
        res.write("Failed to login");
        return res.end();
      }
      res.write("Logged in successfully");
      return res.end();
    }
  },

  default: (req, res) => {
    res.write("Hello World");
    return res.end();
  },
};

const handler = function (req, res) {
  const { url, method } = req;

  const routKey = `${url}:${method.toLowerCase()}`;

  const route = routes[routKey] || routes.default;

  res.writeHead(200, { "Content-Type": "text/html" });
  return route(req, res);
};

const app = http
  .createServer(handler)
  .listen(3000, () => console.log("app running at", 3000));

module.exports = app;

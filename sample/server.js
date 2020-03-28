const http = require("http");
const app = require("./app");

const port = process.env.POR || 8000;

const server = http.createServer(app);
server.listen(port);

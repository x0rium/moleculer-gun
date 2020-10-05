const Gun = require("gun");
const server = require('http').createServer().listen(8080);
const gun = Gun({web: server});

var connect = require('connect'),
    http = require('http'),
    port = process.env.PORT || 3000;

connect()
    .use(connect.static('public'))
    .listen(port);

console.log("Connect listening on port " + port);
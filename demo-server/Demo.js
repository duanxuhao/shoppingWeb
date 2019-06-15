// let user = require('./User.js');

// console.log(`userName:${user.userName}`);
// console.log(`Hello:${user.sayHello()}`);

let http = require("http");
let url = require('url');
let util = require('util');
let fs = require('fs');

let server = http.createServer((req, res) => {
    // res.satusCode = 200;
    // res.setHeader("Content-Type", "text/plain;charset=utf-8");
    var pathName = url.parse(req.url).pathname;
    fs.readFile(pathName.substring(1), function(err, data) {
        if (err) {
            res.writeHead(404, {
                'Content-Type': 'text/html'
            });
        } else {
            res.writeHead(200, {
                'Content-Type': 'text/html'
            });
            res.write(data.toString());

        }
        res.end();
    });

    // res.end(util.inspect(url.parse(req.url)));
}).listen(3000, '127.0.0.1', () => {
    console.log("server http://127.0.0.1:3000/");
});
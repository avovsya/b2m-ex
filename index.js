var http = require('http'),
    EJS = require('ejs'),
    fetch = require('fetch');

http.createServer(function (req, res) {
    fetch(function (data) {
        var html = new EJS({ url: './index.ejs' }).render(data);
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(content, 'utf-8');
    });
}).listen(8080);

var http = require('http'),
    ejs = require('ejs'),
    fetch = require('./fetch'),
    fs = require('fs'),
    html = fs.readFileSync('./index.ejs', 'utf8'),
    port = Number(process.env.PORT || 5000);

http.createServer(function (req, res) {
    fetch(function (bbc, sky) {
        var content = ejs.render(html, {
            bbc: bbc.slice(0, 10),
            sky: sky.slice(0, 10)
        });

        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(content, 'utf-8');
    });
}).listen(port);

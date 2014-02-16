var http = require('http'),
    Parser = require('feedparser'),
    parser = new Parser();

exports = function (callback) {

};

http.get({ host: 'feeds.bbci.co.uk', port: 80, path: '/news/rss.xml' }, function (res) {
    res.pipe(parser);
}).on('error', function () {
    console.log('Something went wrong while requesting');
});

parser.on('readable', function () {
    while(headline = this.read()) {
        console.log(headline);
    }
});

parser.on('error', function () {
    console.log('Something went wrong while parsing');
});

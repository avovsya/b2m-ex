var http = require('http'),
    Parser = require('feedparser');

module.exports = function fetch (callback) {
    var bbcNews = [],
        skyNews = [],
        bbcParser = new Parser(),
        skyParser = new Parser(),
        parserEnd = 0;

    http.get({ host: 'feeds.bbci.co.uk', port: 80, path: '/news/rss.xml' }, function (res) {
        res.pipe(bbcParser);
    }).on('error', onError);

    http.get({ host: 'news.sky.com', port: 80, path: '/feeds/rss/home.xml' }, function (res) {
        res.pipe(skyParser);
    }).on('error', onError);

    bbcParser.on('readable', function () {
        while(headline = this.read()) {
            bbcNews.push(headline);
        }
    });

    skyParser.on('readable', function () {
        while(headline = this.read()) {
            skyNews.push(headline);
        }
    });

    function parserFinished() {
        parserEnd++;
        if(parserEnd >= 2) {
            callback(null, bbcNews, skyNews);
        }
    }

    function onError() {
        callback('Oops. Something went wrong. Try again later');
    }

    bbcParser.on('end', parserFinished);
    skyParser.on('end', parserFinished);

    bbcParser.on('error', onError);
    skyParser.on('error', onError);
};

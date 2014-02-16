var http = require('http'),
    Parser = require('feedparser'),
    parser = new Parser();


module.exports = function fetch (callback) {
    var bbcNews = [],
        skyNews = [],
        bbcParser = new Parser(),
        skyParser = new Parser(),
        parserEnd = 0;

    http.get({ host: 'feeds.bbci.co.uk', port: 80, path: '/news/rss.xml' }, function (res) {
        res.pipe(bbcParser);
    }).on('error', function () {
        console.log('Something went wrong while requesting BBC.COM');
    });

    http.get({ host: 'news.sky.com', port: 80, path: '/feeds/rss/home.xml' }, function (res) {
        res.pipe(skyParser);
    }).on('error', function () {
        console.log('Something went wrong while requesting SKY.COM');
    });

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
            callback(bbcNews, skyNews);
        }
    }

    bbcParser.on('end', parserFinished);
    skyParser.on('end', parserFinished);
};

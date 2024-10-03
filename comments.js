// Create web server

var http = require('http');
var fs = require('fs');
var url = require('url');

var server = http.createServer((req, res) => {
    var path = url.parse(req.url).pathname;
    if (path === '/') {
        fs.readFile(__dirname + '/comments.html', (err, data) => {
            res.writeHead(200, {'Content-Type': 'text/html'});
            res.write(data);
            res.end();
        });
    } else if (path === '/comments') {
        var comment = url.parse(req.url, true).query.comment;
        fs.appendFile(__dirname + '/comments.txt', comment + '\n', (err) => {
            if (err) {
                console.log(err);
            }
        });
        res.writeHead(200, {'Content-Type': 'text/plain'});
        res.end('Comment saved');
    } else {
        res.writeHead(404, {'Content-Type': 'text/plain'});
        res.end('Page not found');
    }
});

server.listen(3000);
console.log('Server running at http://localhost:3000/');
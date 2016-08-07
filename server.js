var http = require('http');
var url = require('url');
var port = process.env.PORT || 8080;

var MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August',
              'September', 'October', 'November', 'December'];

function naturalDateString(date) {
    return MONTHS[date.getMonth()] + ' ' + Number(date.getDate()+1) + ', ' + date.getFullYear()
}

var httpServer = http.createServer(function (request, response) {
    if (request.url === '/favicon.ico') {
        response.writeHead(200, {'Content-Type': 'image/x-icon'} );
        response.end();
    }
    else if (request.method == 'GET') {
        response.writeHead(200, {'Content-Type': 'application/json'});

        var parsedReq = url.parse(request.url, true);
        var dateInput = parsedReq.pathname.substring(1).split("%20").join(" ");
        //var date = parseDate(dateInput);
        var date = new Date(dateInput);
        if (date == 'Invalid Date') {
            // EAPF
            date = new Date(dateInput * 1000);
        }
        console.log(date);
        var result;

        if (date > 0) {
            data = '{"unix":' + date.getTime()/1000 + ', "natural":' + naturalDateString(date) + '}';
        } else {
            data = '{"unix": null, "natural": null}';
        }
        console.log(data);
        response.end(JSON.stringify(data));
    }
})

httpServer.listen(port);
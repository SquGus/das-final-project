// imports modules
var url = require('url');
var fs = require('fs');

// exports get function that allows server to use this function
exports.get = function(req, res, next) {
	req.requrl = url.parse(req.url, true)
	// gets path of the URL request
	var path = req.requrl.pathname;
	
	// checks if request asks for css file of html file
	if (/.(css)$/.test(path)) {
		res.writeHead(200, {
			'Content-Type': 'text/css'
		});
		fs.readFile(__dirname + path, 'utf8', function(err, data) {
			if (err) {
				throw err;
			}
			res.write(data, 'utf8');
			res.end();
		});
	} else {
		
		if (path === '/' || path === '/home') {
			require('./controllers/home').get(req, res);
		} else {
			require('./controllers/404').get(req, res);
		}
	}
}
// imports modules
var fs = require('fs');
var path = require('path');

exports.get = function(req, res) {
	// reads json file
	var filePath = path.join(__dirname, '..', 'model', 'data.json');
	fs.readFile(
		filePath,
		'utf-8',
		function readFileCallback(err, file) {
			if (err) {
				// sends error code
				console.log(err);
				res.writeHead(500, {
					'Content-Type': 'text/plain'
				});
				res.end();
			} else {
				// builds successful response
				res.writeHead(200, {
					'Content-Type': 'text/plain'
				});
				res.write(
					file
				);
				res.end();
			}
		}
	);
}
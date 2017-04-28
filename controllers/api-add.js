// imports modules
var fs = require('fs');
var path = require('path');

exports.post = function(req, res) {
	var body = '';
	
	req.on('data', function(data) {
		body += data;
	});
	req.on('end', function() {
		// process data
		var newTodo = JSON.parse(body);
		
		var filePath = path.join(__dirname, '..', 'model', 'data.json');
		
		fs.readFile(
			filePath,
			'utf8',
			function readFileCallback(err, file) {
				if (err) {
					// sends error code
					console.log(err);
					res.writeHead(500, {
						'Content-Type': 'text/plain'
					});
					res.end();
				} else {
					// parses file to json
					file = JSON.parse(file);
					
					// obtains next id
					var id = -1;
					for(var i = 0; i < file.length; i++) {
						if (file[i].id >= id) {
							id = file[i].id + 1;
						}
					}
					
					// adds id to newTodo
					newTodo.id = id;
					
					// apends new data
					file.push(newTodo);
					
					// stringifies and writes file
					file = JSON.stringify(file);
					fs.writeFile(filePath, file);
					
					// builds successful response
					res.writeHead(200, {
						'Content-Type': 'text/plain'
					});
					res.end();
				}
			}
		);
	});
	
	// builds response
	res.writeHead(200, {
		'Content-Type': 'text/html'
	});
	res.end('POST received');
}
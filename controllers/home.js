// imports modules
var template = require('../views/template-main');
var moment = require('moment');

exports.get = function(req, res) {
	var content = '';
	
	content += '<div class="collection" id="list"></div>';
	
	// builds response
	res.writeHead(200, {
		'Content-Type': 'text/html'
	});
	res.write(
		template.build(
			'To-Do',
			'To-Do list',
			content
		)
	);
	res.end();
}
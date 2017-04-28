// imports modules
var template = require('../views/template-main');
var moment = require('moment');

exports.get = function(req, res) {
	var content = '';
	
	content += '<div class="collection" id="list"></div>';
	content +=
		'<div id="modal-todo" class="modal">'+
			'<div class="modal-content">'+
				'<h4 class="modal-header">Modal Header</h4>'+
				'<p class="modal-details">A bunch of text</p>'+
			'</div>'+
    	'<div class="modal-footer">'+
      	'<a href="#!" class="modal-action modal-close waves-effect waves-green btn-flat">Close</a>'+
    	'</div>'+
  	'</div>';
	
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
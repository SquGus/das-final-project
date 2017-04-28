// imports modules
var data = require('../model/data');
var moment = require('moment');

exports.get = function(req, res) {
	var todoList = data.todoList;
	
	todoList = JSON.stringify(todoList);
	
	// builds response
	res.writeHead(200, {
		'Content-Type': 'text/plain'
	});
	res.write(
		todoList
	);
	res.end();
}
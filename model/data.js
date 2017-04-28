var moment = require('moment');

var list = function() {
	var json = [{
		"title": "Walk the dog",
		"priority": "medium",
		"details": "Lorem ipsum",
		"createdAt": moment('2017-04-28T20:00').format(),
		"elapsedTime": 10,
		"finishAt": moment('2017-04-28T21:00').format()
	}, {
		"title": "Finish AI project",
		"priority": "high",
		"details": "Dolor amet",
		"createdAt": moment('2017-04-28T20:00').format(),
		"elapsedTime": 20,
		"finishAt": moment('2017-04-30T22:00').format()
	}, {
		"title": "Call mom",
		"priority": "low",
		"details": "Must call mom!",
		"createdAt": moment('2017-04-28T20:00').format(),
		"elapsedTime": 30,
		"finishAt": moment('2017-04-30T22:00').format()
	}];
	return json;
}

exports.todoList = list();
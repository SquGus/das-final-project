// imports modules
var template = require('../views/template-main');
var test_data = require('../model/test-data');

exports.get = function(req, res) {
	var teamlist = test_data.teamlist;
	var strTeam = '',
			i = 0;
	
	// gathers information from model
	for(i; i < teamlist.count; i++) {
		strTeam = strTeam + '<li>' + teamlist.teams[i].country + '</li>';
	}
	strTeam = '<ul>' + strTeam + '</ul>';
	
	// builds response
	res.writeHead(200, {
		'Content-Type': 'text/html'
	});
	res.write(template.build('Test web page on NodeJS', 'Hello there', '<p>The teams in Group ' + teamlist.GroupName + ' for Euro 2012 are:</p>' + strTeam));
	res.end();
}
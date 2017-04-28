// imports modules
var http = require('http');

// defines http variables
var http_IP = '127.0.0.1';
var http_port = 8899;

// creates server and passes req and res to router module
var server = http.createServer(function(req, res, next) {
	require('./router').get(req, res);
});
server.listen(http_port, http_IP);
console.log('TO-DO LIST APP listening to http://' + http_IP + ':' + http_port);
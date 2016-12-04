var http = require("http");
var url  = require("url");

var ip   = "10.232.224.46";
var port = 8888;

function start(route, handle) {
	function onRequest(request, response) {
		var pathname = url.parse(request.url).pathname;
		console.log("Request for " + pathname + " received.");
		route(handle, pathname, response, request);
	}

	http.createServer(onRequest).listen(port, ip);
	console.log("Server has started.");
}

exports.start = start;
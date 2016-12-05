var http = require("http");
var url  = require("url");

var ip   = "10.232.70.155";
var port = 8888;

function start(route, handle) {
	function onRequest(request, response) {
		var pathname = url.parse(request.url).pathname;
		console.log("Request for " + pathname + " received.");
		route(handle, pathname, response, request);
	}

	http.createServer(onRequest).listen(8888, "10.232.70.155");
	console.log("Server has started.");
}

exports.start = start;
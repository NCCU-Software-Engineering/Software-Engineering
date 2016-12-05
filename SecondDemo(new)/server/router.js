function route(handle, pathname, response, request) {
	console.log("About to route a request for " + pathname);
	
	var temp, a;
	
	for(a=0;a<pathname.length;a++){
		console.log(pathname[a]);	
	}
	if (typeof handle[pathname] === 'function') {
		handle[pathname](response, request);
	} 
	else {
		handle["/pic"](response, request, pathname);
	}
//	else {
//		console.log("No request handler found for " + pathname);
//		response.writeHead(404, {"Content-Type": "text/html"});
//		response.write("404 Not found");
//		response.end();
//	}
}

exports.route = route;
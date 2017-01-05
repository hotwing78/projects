var http = require("http");

var requestListener = function(request, response){
	if( request.url == "/" ){
		console.log("Got a request");
		response.write("Hi");
		response.end();
	} else if (request.url == "/hello") {
		console.log("Got a hello request");
		response.write("World!");
		response.end();
	}
}

var server = http.createServer(requestListener);
server.listen(8080);
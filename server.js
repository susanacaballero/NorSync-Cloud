/**
 * Created by Susana Caballero on 9/15/2015.
 */
var http = require("http");

http.createServer(function(request, response) {
    response.writeHead(200, {"Content-Type": "text/html"});
    response.write("Hola Mundo");
    response.end();
}).listen(8888);
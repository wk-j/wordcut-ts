var http = require("http");
var jsonBody = require("body/json");
import { Wordcut } from "./lib/wordcut";

var wordcut = new Wordcut();
wordcut.initNoDict();

var server = http.createServer(function (req, res) {
	if (req.url == '/segment' && req.method == 'POST') {
		jsonBody(req, res, function (err, body) {
			var line = body["line"];
			res.write(wordcut.cut(line, "|"));
			res.end();
		});
	} else {
		res.writeHead(404);
		res.write("Page not found");
		res.end();
	}
});

server.listen(8882);
console.log("Server is listening...");

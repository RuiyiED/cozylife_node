// http_server2.js
const http = require('http'),
fs = require('fs');

const server = http.createServer((req, res)=>{
	fs.writeFile(__dirname+'/../data/headers.json', JSON.stringify(req.headers), error=>{
		if(error) {
			console.log(error);
			res.end("Error");
		} else {
			res.end("ok");
		}
	});
	// fs.readFile(__dirname+'../src/http.js', (error, data)=>{
	// if(error) {
	// 	response.writeHead(500, {'Content-Type': 'text/plain'});
	// 	response.end('500 - http.js not found');
	// } else {
	// 	response.writeHead(200, {'Content-Type': 'text/html'});
	// 	response.end(data);
	// }
	// });
}).listen(3000);
var http = require('http');
const fs = require('fs');

//create a server object:
http.createServer( function (request , response) {

	const file_path = 'C:/Users/VenD/Desktop/NodeJs_Training/FirstSession/readFile.txt';

	fs.readFile(file_path , 'utf8',  (error, data) => {

		if(error) {
			console.log(error);
			return
		}
		
		console.log(data);
	});

}).listen( 3000 , function() {
	console.log("server start at port 3000");
	// ther server object listens on port 3000
});
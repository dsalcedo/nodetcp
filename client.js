var net = require('net'),
 client = new net.Socket();

client.connect(9090, 'sigue.in', function() {
	console.log('Connected');
	client.write('{content:false, data:["loadbalancer":true]}');
});

client.on('error', function(error) {
	console.log('Received: ' + error);
});

client.on('data', function(data) {
	console.log('Received: ' + data);
	client.destroy(); // kill client after server's response
});

client.on('close', function() {
	console.log('Connection closed');
});

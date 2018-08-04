const net = require('net');
const request = require('request');
const host = 'http://c5alert.test/webhook/v1/alert/recive';

const server = net.createServer(function(client) {
	
  let remoteAddress = client.remoteAddress + ':' + client.remotePort;
  let clientIp = client.remoteAddress;

    client.setEncoding('utf-8');
    client.setTimeout(10000);

    client.on('data', function (data) {
        let temp = data.toString();
        console.log('Receive client send data : ' + data + ', data size : ' + client.bytesRead);
        request.post(host, {form:{ip:clientIp, content: temp}});
    });

    client.on('timeout', function () {
        console.log('Client request time out. ');
    });

    client.on('error', function (err) {
        console.log('Connection %s error: %s', remoteAddress, err.message);
    });

    client.write("{success:true, done:false}");
    client.end("{success:true, done:true}");

});

server.listen(8080, 'localhost');
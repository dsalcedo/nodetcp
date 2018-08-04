const net = require('net');
const request = require('request');
const dotenv = require("dotenv").config();

const host = dotenv.parsed.WEBHOOK;
const port = dotenv.parsed.PORT;

console.log("Server started");

const server = net.createServer(function(client) {
	
  let clientIp = client.remoteAddress;

    client.setEncoding('utf-8');
    client.setTimeout(6000);

    client.on('data', function (data) {
        let temp = data.toString();
            request.post(host, {form:{ip:clientIp, content: temp}});
            client.write("{success:true, done:false}");
    });

    client.on('timeout', function () {
        //console.log('Client request time out. ');
    });

    client.on('error', function (err) {
        client.write("{success:false, done:false}");
        //console.log('Connection %s error: %s', clientIp, err.message);
    });

    client.end("{success:true, done:true}");

});

server.listen(port, 'localhost');
const net = require('net');
const request = require('request');
const dotenv = require("dotenv").config();
var os = require('os');
var ifaces = os.networkInterfaces();
var public;

Object.keys(ifaces).forEach(function (ifname) {
  var alias = 0;

  ifaces[ifname].forEach(function (iface) {
    if ('IPv4' !== iface.family || iface.internal !== false) {
      // skip over internal (i.e. 127.0.0.1) and non-ipv4 addresses
      return;
    }

    if (alias >= 1) {
    
    } else {
        public =  iface.address;  
    }
    ++alias;
  });
});


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

server.listen(port, public);
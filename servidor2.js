//"use stric"
var express = require('express')
var aplicacion = express()
const os = require('os');

var interface = os.networkInterfaces();
var ipDinamic;
for(var k in interface){
    for(var k2 in interface[k]){
        var address = interface[k][k2]
        if(address.family == 'IPv4' && !address.internal ){
            ipDinamic = address.address.toString();
            console.log(ipDinamic);
        }
    }
}

const net = require('net');
const server = require('http').Server(aplicacion)
const socket = require('socket.io')(server)
const {StringDecoder} = require('string_decoder')
// const decoder = new  StringDecoder('utf8')

var HOST = "gcag.ddns.net"


var PORT = 5000


var ser = net.createServer(function(so){    
    
    console.log('Usuario Conectado' + so.remoteAddress + ':' + so.remotePort)

     so.on('connect', function(){
         console.log('Usuario Nuevo')
     })
    
    so.on('data', function(data){        
//        console.log(data.toString())
	var date = new Date();
 console.log(data.toString() + date.toDateString());
       so.write('Enviaste un mensaje al servidor 3 a las: '+date.toDateString()+'\n')
    })

    so.on('close',function(){
        console.log('Usuario Desconectado')
    })
})

ser.listen(PORT, HOST);

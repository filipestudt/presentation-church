var net = require('net'), Socket = net.Socket;
var iputils = require('./ip-utils');
/**
 * Recebe um ip e uma porta e tenta conectar,
 * caso consiga retorna pelo callback
 * @param {String} port 
 * @param {String} host 
 * @param {Function} callback 
 */
function checkPort(port, host, callback) {
    var socket = new Socket();
    var status = null;

    // Socket connection established, port is open
    socket.on('connect', function() {
        console.log('achou')
        status = 'open';
        socket.end();
        callback(null, status, host, port);
    })

    socket.on('timeout', function() {
        status = 'closed';
        socket.destroy();
        callback(null, status, host, port);
    })

    socket.on('error', function(exception) {
        status = 'closed';
        socket.destroy();
        callback(null, status, host, port);
    })

    // If no response, assume port is not listening
    socket.setTimeout(5000);

    socket.connect(port, host);
}

exports.find = function(PORT) {
    var LAN = iputils.getIpBase();
    /**
     * Cria uma PROMISE pra poder retornar o valor que vem em forma de callback,
     * Dessa maneira, poderá ser usado um await nessa função
     */
    return new Promise(
        function(resolve, reject) {
            /*
             * Busca os IPs utilizando o range definido
             * Quando encontra, resolve a PROMISE, 
             * se não, faz um reject
             * 
             */
            var count = 0;

            for (var i = 1; i <= 255; i++) {
                checkPort(PORT, LAN + '.' + i, function(error, status, host, port) {
                    if (status == "open") {
                        console.log('aqui');
                        console.log(count)
                        resolve(host); 
                    }

                    /**
                     * Se for a última volta do loop e não tiver sido achado o receptor,
                     * fazer o reject da PROMISE
                     */
                    count++;

                    if (count === 255) {
                        reject('Receptor não encontrado');
                        console.log('if count: ' + count)
                        console.log(PORT)
                    }                    
                })
            }
        })
}
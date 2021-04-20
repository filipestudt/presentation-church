const request = require('request');
var iputils = require('./ip-utils');

exports.find = function(PORT) {
    var ipbase = iputils.getIpBase();
    
    return new Promise(
        function(resolve, reject) {                
            var count = 0;

            for (var i = 1; i <= 255; i++) {   
                request.get({
                    url: 'http://' + ipbase + '.' + i + ':' + PORT                
                },
                function(error, response, body) {
                    if (response) {
                        resolve(response.request.host);
                    }

                    count++;

                    if (count === 255) {
                        reject('Receptor não encontrado');
                    }
                })
            }
        })
}
var ip = require('ip');

exports.getIpBase = function() {
    /*
     * Pega o ip em forma de string e transforma em array, 
     * sendo cada posição uma das casas separadas pelo ponto
     */
    var ipArray = ip.address().split('.');

    // Remove a última posição
    ipArray = ipArray.slice(0, ipArray.length - 1);

    // Transforma em string novamente e substitui as vírgulas por ponto
    return ipArray.toString().replace(/,/g, '.');
}
const ip = require('ip');
const receptorFinderRequest = require('../../lib/receptor-finder-request');
const receptorFinderSocket = require('../../lib/receptor-finder-socket');

exports.get = async(req, res, next) => {
    // Verifica se está em alguma rede, caso não, exibir uma mensagem ao usuário
    if (!ip.address()) {
        res.status(500).send({
            message: 'Erro ao conectar-se com o receptor. Esse computador não está conectado em nenhuma rede'
        });
        return;
    }

    // Tenta procurar o receptor usando o método do request
    // Se der certo, retorna o ip do mesmo
    // Se não executa o próximo método
    try {
        var data = await receptorFinderRequest.find(RECEPTOR_PORT);
        res.status(200).send(data);
        return;
    }
    catch(err) {
        // Caso dê erro, irá executar o segundo método
    }

    // Tenta procurar o receptor usando o método do socket
    try {
        var data = await receptorFinderSocket.find(RECEPTOR_PORT);
        res.status(200).send(data);
    }
    catch(err) {
        res.status(500).send({
            message: 'Erro ao conectar-se com o receptor: ' + err
        });
    }
}
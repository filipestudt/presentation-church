const repository = require('../repositories/settings-repository');

exports.get = async(req, res, next) => {
    try {
        var data = await repository.get();
        res.status(200).send(data);
    } 
    catch (e) {
        res.status(500).send({
            message: 'Falha ao processar sua requisição'
        });
    }
}

exports.save = async(req, res, next) => {
    try {
        var data = await repository.save(req.body);
        res.status(200).send(data);
    } 
    catch (e) {
        res.status(500).send({
            message: 'Falha ao processar sua requisição'
        });
    }
}
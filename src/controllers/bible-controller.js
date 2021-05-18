const repository = require('../repositories/bible-repository');

exports.get = async(req, res, next) => {
    try {
        var data = await repository.get(req.params.book, req.params.chapter);
        res.status(200).send(data);
    } 
    catch (e) {
        res.status(500).send({
            message: 'Falha ao processar sua requisição'
        });
    }
}
exports.getBooks = async(req, res, next) => {
    try {
        var data = await repository.getBooks();
        res.status(200).send(data);
    } 
    catch (e) {
        res.status(500).send({
            message: 'Falha ao processar sua requisição'
        });
    }
}
exports.getChapters = async(req, res, next) => {
    try {
        var data = await repository.getChapters(req.params.book);
        res.status(200).send(data);
    } 
    catch (e) {
        res.status(500).send({
            message: 'Falha ao processar sua requisição'
        });
    }
}
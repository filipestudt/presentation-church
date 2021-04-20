const repository = require('../repositories/presentation-repository');
const validate = require('../validators/presentation-validator');
const shortid = require('shortid');

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

exports.getById = async(req, res, next) => {
    try {
        var data = await repository.getById(req.params.id);
        res.status(200).send(data);
    }
    catch (e) {
        res.status(500).send({
            message: 'Erro ao buscar apresentação: ' + e
        });
    }
}

exports.getByName = async(req, res, next) => {
    try {
        var data = await repository.getByName(req.params.name);
        res.status(200).send(data);
    }
    catch (e) {
        res.status(500).send({
            message: 'Erro ao buscar apresentação: ' + e
        });
    }
}

exports.getByCategory = async(req, res, next) => {
    try {
        var data = await repository.getByCategory(req.params.category);
        res.status(200).send(data);
    }
    catch (e) {
        res.status(500).send({
            message: 'Erro ao buscar apresentação: ' + e
        });
    }
}

exports.post = async(req, res, next) => {
    try {
        var data = req.body;
        data.id = shortid.generate();

        await validate(data);

        var response = await repository.create({
            name: data.name,
            category: data.category,
            content: data.content,
            id: data.id
        });

        res.status(200).send(response);
    }
    catch (e) {
        res.status(500).send({
            message: 'Erro ao salvar a apresentação: ' + e
        });
    }
}

exports.put = async(req, res, next) => {
    try {
        var data = req.body;

        await validate(data);

        await repository.update(data.id, {
            name: data.name,
            category: data.category,
            content: data.content
        });

        res.status(200).send('Apresentação editada com sucesso');
    }
    catch (e) {
        res.status(500).send({
            message: 'Erro ao editar a apresentação: ' + e
        });
    }
}

exports.delete = async(req, res, next) => {
    try {
        await repository.delete(req.body.id);
        res.status(200).send('Apresentação excluída com sucesso');
    }
    catch (e) {
        res.status(500).send({
            message: 'Erro ao excluir a apresentação: ' + e
        });
    }
}
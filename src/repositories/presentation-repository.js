const DATABASE_NAME = 'presentation';
const low = require('lowdb');
const fs = require('lowdb/adapters/FileSync');
const adapter = new fs('src/database/presentationdb.json');
const lowbd = low(adapter);
const db = lowbd.get(DATABASE_NAME);

exports.get = async() => {
    return db.value();
}

exports.getById = async(id) => {
    var response = await db.find({id: id})
    .value();

    if (!response) {
        throw 'Apresentação não encontrada'
    }

    return response;
}

exports.getByName = async(name) => {
    var response = await db.find({name: name})
    .value();

    if (!response) {
        throw 'Apresentação não encontrada'
    }

    return response;
}

exports.getByCategory = async(category) => {
    var response = await db.value();
    var result = [];

    for (obj of response) {
        if (obj.category === category) {
            result.push(obj);
        }
    }

    return result;
}

exports.create = async(data) => {
    var response = await db.push(data).write();
    /*
     * O lowdb retorna um array com todos os objetos do banco de dados
     * Pra saber se ele conseguiu criar a apresentação, o array deve ter pelo menos o tamanho de 1
     */
    if (response.length < 1) {
        throw 'Erro inesperado ao tentar salvar a apresentação';
    }

    // retorna o objeto, para o cliente poder acessá-lo
    return response;
}

exports.update = async(id, data) => {
    /**
     * Verifica se existe
     */
    var presentation = await this.getById(id);

    // caso não exista, lança uma exception
    if (!presentation) {
        throw 'Apresentação não encontrada'
    }

    // se tiver tudo certo, atualiza
    await db.find({id: id}).assign(data)
    .write();
}

exports.delete = async(id) => {
    /**
     * Verifica se existe
     */
    var presentation = await this.getById(id);

    // caso não exista, lança uma exception
    if (!presentation) {
        throw 'Apresentação não encontrada'
    }
    
    // deleta
    var response = await db.remove({id: id})
    .write();

    /*
     * O lowdb retorna um array com os objetos que foram apagados
     * Pra saber se ele conseguiu apagar a apresentação, o array deve ter o tamanho de 1
     */
    if (response.length != 1) {
        throw 'Erro inseperado ao deletar';
    }
}
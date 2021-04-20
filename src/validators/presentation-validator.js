const repository = require('../repositories/presentation-repository');
const categories = ['Hinos', 'HCC', 'CC', 'Favoritos'];

module.exports = async (presentation) => {

    if (!presentation.name) {
        throw 'O nome da apresentação deve ser informado';
    }        

    if (!presentation.category) {
        throw 'A categoria da apresentação deve ser informada';
    }
    
    if (!presentation.content) {
        throw 'O conteúdo da apresentação não pode ser vazio';
    }

    if (!categories.includes(presentation.category)) {
        throw 'Categoria inválida';
    }

    var data;

    try {
        data = await repository.getByName(presentation.name);  
    }
    catch(e) {}

    if (data && data.id != presentation.id && data.category === presentation.category) {
        throw 'Já existe uma apresentação com esse nome';
    }        

}
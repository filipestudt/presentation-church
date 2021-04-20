/**
 * O repository retorna exceptions caso algo dê errado,
 * desse jeito essa parte da lógica de verificar se a operação foi realziada com sucesso
 * fica no repository, deixando no controller um código menor
 * pra isso é importante testar se passando dados inválidos as exceptions serão disparadas
 * e também se passar dados corretos, a operação irá ser realizada com sucesso.
 * Isso foi feito pois o lowdb não retorna exceptions, por isso foram feitos verificações e é importante
 * testá-las para ver se estão corretas
 * 
 * Algumas observações sobre como o lowdb funciona:
 * retorna array no delete
 * retorna o objeto no update ou o que foi passsado caso nao de certo, entao no update acho que nao tem como saber
 * no create retorna array tbm
 * e no find o objeto
 * e no get array
 * 
 * 
 */
const should = require("should");
const request = require("request");
const chai = require("chai");
const expect = chai.expect;

require('../src/cfg');

const url = 'http://localhost:'+ SERVER_PORT +'/presentations';

var presentation = {
    name: 'mocha',
    category: 'Hinos',
    content: 'anything'
}
  

describe('Testa o CRUD', function () {        


    it('Cria a apresentação', function(done) {
        request.post({
            url: url,
            form: presentation
        }, 
        function(error, response, body) {                                   
            var data = parse(body);
            expect(response.statusCode).to.equal(200);
            expect(data).to.have.lengthOf.above(0);
            done();
        })        
    })


    it('Tenta criar uma apresentação com um nome já existente', function(done) {
        request.post({
            url: url,
            form: presentation
        }, 
        function (error, response, body) {                        
            expect(response.statusCode).to.equal(500);
            done();
        })    
    })


    it('Tenta criar apresentação faltando o nome', function(done) {
        var pres = {
            category: 'Hinos',
            content: 'anything'
        }

        request.post({
            url: url,
            form: pres
        }, 
        function (error, response, body) {                        
            expect(response.statusCode).to.equal(500);
            done();
        })    
    })


    it('Tenta criar apresentação faltando a categoria', function(done) {
        var pres = {
            name: 'mocha2',
            content: 'anything'
        }

        request.post({
            url: url,
            form: pres
        },
        function (error, response, body) {           
            
            expect(response.statusCode).to.equal(500);
            done();
        })        
    })


    it('Tenta criar apresentação faltando o conteúdo', function(done) {
        var pres = {
            name: 'mocha2',            
            category: 'Hinos'
        }

        request.post({
            url: url,
            form: pres
        }, 
        function (error, response, body) {                       
            expect(response.statusCode).to.equal(500);
            done();
        })        
    })
    

    it('Tenta criar apresentação passando uma categoria inválida', function(done) {
        var pres = {
            name: 'mocha2',            
            category: 'sadasda',
            content: 'anything'
        }

        request.post({
            url: url,
            form: pres
        }, 
        function(error, response, body) {                       
            expect(response.statusCode).to.equal(500);
            done();
        })        
    })


    it('Busca todas as apresentações', function(done) {
        request.get({
            url: url
        },
        function (error, response, body) {
            var data = parse(body);
            expect(response.statusCode).to.equal(200);
            expect(data).to.have.lengthOf.above(0);
            done();
        })
    })   


    it('Testa o getByName', function(done) {
        request.get({
            url: url + '/name/' + presentation.name
        },
        function(error, response, body) {
            var data = parse(body);
            presentation.id = data.id;
            expect(response.statusCode).to.equal(200);
            done();
        })
    })


    it('Testa o getById', function(done) {
        request.get({
            url: url + '/' + presentation.id
        },
        function(error, response, body) {
            var data = parse(body);
            expect(response.statusCode).to.equal(200);
            expect(data.name).to.equal(presentation.name);
            expect(data.category).to.equal(presentation.category);
            expect(data.content).to.equal(presentation.content);
            expect(data.id).to.equal(presentation.id);
            done();
        })
    })
    

    it('Update', function(done) {
        var pres = {
            name: 'edited',            
            category: 'Hinos',
            content: 'anything',
            id: presentation.id
        }

        request.put({
            url: url,
            form: pres
        },
        function (error, response, body) {
            expect(response.statusCode).to.equal(200);
            done();
        })
    })
    

    it('Update com id inesistente', function(done) {
        var pres = {
            name: 'edited',            
            category: 'Hinos',
            content: 'anything',
            id: '$¨#@*&$#@¨$*&'
        }

        request.put({
            url: url,
            form: pres
        },
        function (error, response, body) {
            expect(response.statusCode).to.equal(500);
            done();
        })
    })

    
    it('Teste o delete', function(done) {
        request.delete({
            url: url,
            form: {
                id: presentation.id
            }
        }, 
        function (error, response, body) {  
            expect(response.statusCode).to.equal(200);
            done();
        })
    })

    it('Delete com id inválido', function(done) {
        request.delete({
            url: url,
            form: {
                id: '$*&#@(*$&@#(*$&@#*'
            }
        }, 
        function (error, response, body) {  
            expect(response.statusCode).to.equal(500);
            done();
        })
    })
})


function parse(body) {
    var _body = {};
    try {
      _body = JSON.parse(body);
    } catch (e) {
      _body = {};
    }
    return _body;
}
const chai = require("chai");
const expect = chai.expect;
const request = require("request");
const ip = require('ip');
const iputils = require('../lib/ip-utils');
const receptorFinderSocket = require('../lib/receptor-finder-socket');
const receptorFinderRequest = require('../lib/receptor-finder-request');

require('../src/cfg');

describe('Testa o ip utils', function () {   
    it('Deve retornar o ip atual menos a última casa', function(done) {
        expect(iputils.getIpBase()).to.equal('10.1.1');
        done();
    })

        /**
         * Testa se o receptor finder acha esse servidor
         * Vai conseguir encontrar pq é o próprio servidor rodando, dessa forma vai testar 
         * o resolve dele
         */
    it('Deve encontrar o host aberto', function(done) {      
        
        this.timeout(15000);

        receptorFinderSocket.find(SERVER_PORT)
            .then((data) => {
                expect(data).to.equal(ip.address());
                done();
            })

            .catch((err) => {
                done(new Error(err));
            })
    })

        /**
         * Testa se o receptor finder vai falhar em achar o servidor
         * Não vai conseguir encontrar pq não existe nenhum serviço rodando na porta do receptor
         * Se der certo, tá errado
         */
    it('Deve encontrar o host fechado', function(done) {

        this.timeout(15000);
        
        receptorFinderSocket.find(RECEPTOR_PORT)
            .then((data) => {
                done(new Error('Não deveria achar nenhum serviço rodando na porta do receptor'));
            })

            .catch((err) => {
                expect(err).to.not.be.null;
                expect(err).to.equal('Receptor não encontrado');
                done();
            })
    })

    
})

describe('Testa o método 2 de buscar o receptor', function() {
    it('Deve encontrar o host aberto', function(done) {  
        receptorFinderRequest.find(SERVER_PORT)
            .then((data) => {
                expect(data).to.equal(ip.address());
                done();
            })

            .catch((err) => {
                done(new Error(err));
            })
    })   


    it('Deve encontrar o host fechado', function(done) {

        this.timeout(30000);
        
        receptorFinderRequest.find(RECEPTOR_PORT)
            .then((data) => {
                done(new Error('Não deveria achar nenhum serviço rodando na porta do receptor'));
            })

            .catch((err) => {
                expect(err).to.not.be.null;
                expect(err).to.equal('Receptor não encontrado');
                done();
            })
    })
})

describe('Testa a API do receptor', function() {
    var url = 'http://localhost:' + SERVER_PORT + '/receptor';    

    it('Deve processar a requisição retornando erro 500', function(done) {
        this.timeout(30000);

        request.get({
            url: url
        }, 
        function (error, response, body) {                        
            expect(response.statusCode).to.equal(500);            
            done();
        })    
    })
})
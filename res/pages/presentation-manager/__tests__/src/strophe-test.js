describe('Teste', function() {
    describe('#indexOf()', function() {
        var stropheController = new StropheController();
        it('Deve criar as estrofes com sucesso', async function() {
            /**
             * Teste se o controller cria com sucesso a estrofe
             * E também o getSlides
             *
             * Cria a primera estrofe
             */
            var stropheElement = stropheController.createStrohpe( STROPHE_TYPE );

            // Como é a primeira deve ter o número igual a 1
            chai.expect(stropheElement.getNum()).to.equal('1');

            // Cria um coro
            stropheElement = stropheController.createStrohpe( CHORUS_TYPE );

            // O número deve ser igual a 'C'
            chai.expect(stropheElement.getNum()).to.equal('C');


            // Testa se o getSlides está retornando certo e tenta dar o foco igual a view faz
            // Se estourar o tempo e nao tiver desarmado ira falhar o teste
            // Pra desarmar o evento do foco deve ser ativado
            var value = await new Promise(function(resolve, reject) {
                $(document).on('focus', 'textarea', function() {
                    resolve('ok');
                })
                stropheElement.getSlides().focus();

                // se não resolver antes do timeout estourar, irá ter o valor de 'error' e falhará no teste
                setTimeout(function() {
                     resolve('error');
                }, 1000);
            })

            chai.expect(value).to.equal('ok');

            // Testa se foram criados as duas divs .strophe
            var strophesArray = $('.strophe').toArray();
            chai.expect(strophesArray).to.have.lengthOf(2);
        })

        it('Deve excluir as estrofes', function() {
            var strophesArray = $('.strophe').toArray();
            stropheController.deleteStrohpe(strophesArray[0]);

            strophesArray = $('.strophe').toArray();
            chai.expect(strophesArray).to.have.lengthOf(1);
        })

        it('Teste o updateNums', function() {
            // Cria 3 estrofes
            var s1 = stropheController.createStrohpe( STROPHE_TYPE );
            var s2 = stropheController.createStrohpe( STROPHE_TYPE );
            var s3 = stropheController.createStrohpe( STROPHE_TYPE );

            chai.expect(s1.getNum()).to.equal('1');
            chai.expect(s2.getNum()).to.equal('2');
            chai.expect(s3.getNum()).to.equal('3');

            // Exclui a estrofe do meio
            // Portanto a estrofe número 3 deve se transformar em 2
            var strophesArray = $('.strophe').toArray();

            stropheController.deleteStrohpe(strophesArray[1]);

            chai.expect(s3.getNum()).to.equal('2');
        })


        it('Testa o swap', function() {
            let strophesArray = $('.strophe').toArray();
            for(s of strophesArray) {
                stropheController.deleteStrohpe(s);
            }

            var s1 = stropheController.createStrohpe( STROPHE_TYPE );
            var s2 = stropheController.createStrohpe( STROPHE_TYPE );
            var s3 = stropheController.createStrohpe( STROPHE_TYPE );

            stropheController.swap(s1.get(), s2.get());

            chai.expect( s1.getNum() ).to.equal('2');

            // Mesmo depois do swap, a primeira estrofe deve continuar tendo o número 1
            strophesArray = $('.strophe').toArray();
            chai.expect(strophesArray[0].children[0].children[0].innerHTML).to.equal('1')
            chai.expect(strophesArray[1].children[0].children[0].innerHTML).to.equal('2')
            chai.expect(strophesArray[2].children[0].children[0].innerHTML).to.equal('3')
        })

        it('Testa o save', function() {
            // exclui o resto pra limpar o teste

            let strophesArray = $('.strophe').toArray();
            for(s of strophesArray) {
                stropheController.deleteStrohpe(s);
            }

            var s1 = stropheController.createStrohpe( STROPHE_TYPE );
            var s2 = stropheController.createStrohpe( CHORUS_TYPE );
            var s3 = stropheController.createStrohpe( STROPHE_TYPE );

            s1.getSlides().value = 'sdas\ndsad';
            s2.getSlides().value = 'cdksalkjdlkas';
            s3.getSlides().value = '33333333';

            var result = stropheController.save();
            console.log(result)

            chai.expect(result[0].num).to.equal("1");
            chai.expect(result[0].slides[0]).to.equal('sdas\ndsad');

            chai.expect(result[1].num).to.equal("C");
            chai.expect(result[1].slides[0]).to.equal('cdksalkjdlkas');

            chai.expect(result[2].num).to.equal("2");
            chai.expect(result[2].slides[0]).to.equal('33333333');
        })
    });
});

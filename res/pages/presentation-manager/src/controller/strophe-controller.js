function StropheController() {
    var count = 0;

    var getStrophes = function() {
        var result = [];
        var strophesArray = $('.strophe').toArray();

        for (strophe of strophesArray) {
            result.push(new StropheElement(strophe));
        }

        return result;
    }

    var updateNums = function() {
        var strophes = getStrophes();

        // Volta o condator pro zero e incrementa e set o número nos elementos na ordem em que eles estão na tela
        count = 0;

        for (s of strophes) {
            /*
             * Se não for um Nan, quer dizer que é um número,
             * nesse caso incrementar o count e setar o novo número
             */
            if (!isNaN( s.getNum() )) {
                s.setNum(++count);
            }
        }
    }

    this.createStrohpe = function(type) {
        var stropheElement = new StropheElement();

        var num;

        if (type === STROPHE_TYPE) {
            num = ++count;
        }
        else {
            num = 'C';
        }

        stropheElement.setNum(num);

        return stropheElement;
    }

    this.deleteStrohpe = function(element) {
        $(element).remove();
        updateNums();
    }

    this.swap = function(strophe1, strophe2) {
        if (!strophe1 || !strophe2) return;

        // swap o primeiro elemento com o segundo
        $(strophe1).before(strophe2);

        // atualiza o número das estrofes
        updateNums();
    }

    this.save = function() {
        var result = [];
        var strophes = getStrophes();

        for (strophe of strophes) {
            result.push( strophe.export() );
        }

        return result;
    }
}

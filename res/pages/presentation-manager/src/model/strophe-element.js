function SlideElement(element) {
    var thisElement = element;

    this.getSlides = function() {
        return thisElement.children[0];
    }

    // this.getSlidesVal = () => {
    //     var result = [];
    //
    //     var textareas = this.getSlides();
    //
    //     for (t of textareas) {
    //         if (t.tagName === 'TEXTAREA') {
    //             result.push(t.value);
    //         }
    //     }
    //
    //     return result;
    // }

    this.getSlidesVal = () => {
        return this.getSlides().value.split(/\n\n/g);
    }
}

function StropheElement(e) {
    /**
     * Pode receber o elemento já criado como parâmetro
     * Isso serve na hora de exportar, por exemplo, onde se precisa abstrair as propriedades e dados da estrofe utilizando
     * as funções desse objeto
     * */
    var thisElement = e || cloneStrophe()[0];
    var slideElement = new SlideElement( thisElement.children[1] );

    /**
     * Só cria o elemento se não tiver recebido parâmetro, ou seja, for uma nova estrofe
     */
    if (!e) {
        $( STROPHES_DIV ).append(thisElement);
    }

    this.getSlides = function() {
        return slideElement.getSlides();
    }

    this.getNum = function() {
        return thisElement.children[0].children[0].textContent;
    }

    this.setNum = function(num) {
        if (!num) return;
        thisElement.children[0].children[0].textContent = num;
    }

    this.get = function() {
        return thisElement;
    }

    this.export = () => {
        return {
            num: this.getNum(),
            slides: slideElement.getSlidesVal()
        }
    }
}

function SlideController() {
    /**
     * Recebe como parâmetro a div .strohpe
     * @param {.strophe} e
     */
    // this.createSlide = function(e) {
    //     /**
    //      * Busca a div dos slides a partir da div das estrofes
    //      */
    //     var slidesDiv = $(e).children()[1];
    //
    //     // clona o textarea base
    //     var slideElement = cloneSlide();
    //
    //     // insere ele na div dos slides e o retorna
    //     $(slidesDiv).append( slideElement );
    //     return slideElement;
    // }

    this.createSlideWithContent = (e, content) => {
        var element = this.createSlide(e);
        $(element).html(content);
    }

    this.getSlidesFromStrophe = function(stropheElement) {
        // Div dos slides
        var slidesdivElement = $(stropheElement).children()[1];

        // Retorna os elementos da div .slides
        return slidesdivElement.children;
    }

}

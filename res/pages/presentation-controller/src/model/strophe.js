function Strophe(stropheParam) {
    var thisStrophe = stropheParam;

    this.getSlides = function() {
        return thisStrophe.slides;
    }

    this.getNum = function() {
        return thisStrophe.num;
    }

    this.getFirstSlide = function() {
        return thisStrophe.slides[0];
    }
}
function Controller() {

    var strophesArr = [];
    var slidesArr = [];
    var socket;
    var pos = 0;

    this.init = function(content, ip) {
        // Se conecta no ip do receptor, é onde tá o servidor do socket.io
        socket = io('http://' + ip + ':' + RECEPTOR_PORT);

        // Instancia os objetos do tipo Strophe e salva no Array
        for (s of content) {
            strophesArr.push( new Strophe(s) );
        }

        // Coloca todos os slides no vetor e na tela
        var count = 0;
        for (strophe of strophesArr) {
            $('.slides').append(`<span>${strophe.getNum()}</span>`);

            for (slide of strophe.getSlides()) {
                /**
                 * Antes de colocar em tela, transforma os \n em <br>
                 * Desse modo pode-se visualizar como o mesmo vai ser exibido
                 */
                slide = slide.replace(/\n/g, '<br>')


                /**
                 * Cria um span com o slide, onde o id é o número do slide
                 * E salva no array de slides
                 * Também seta a classe como .valid pros slides válidos
                 */
                $('.slides').append(`<span id="${count++}" class="valid">${slide}</span>`);
                slidesArr.push(slide);
            }
        }
    }

    /**
     * @param {Integer} id 
     */
    this.send = function(id) {
        try {
            pos = parseInt(id);
        }
        catch(e) {
            console.log(e);
        }

        /**
         * Os slides tem o mesmo id que a sua posição no Array,
         * então recebe o id do slide selecionado e pega o seu valor no Array
         */
        let data = slidesArr[id];

        socket.emit('slide', data);
    }    

    // Envia um espaço pra limpar a projeção
    this.clear = function() {
        socket.emit('slide', ' ');
    }

    this.next = () => {
        if (pos + 1 < slidesArr.length) {
            pos++;
            this.send(pos);
        }
    }

    this.prev = () => {
        if (pos > 0) {
            pos--;
            this.send(pos);
        }
    }

    this.getPos = () => {
        return pos;
    }
}
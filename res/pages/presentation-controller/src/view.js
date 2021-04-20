function View() {

    this.setHighlight = function(e) {
        $('.valid').removeClass('active');
        $(e).addClass('active');
    }

    var slideClick = (e) => {
        /**
         * Busca o id do elemento selecionado pra enviar pro controller
         */
        let id = $(e).attr('id');
        
        // O controller irá acessar esse slide e mandar pelo socket.io
        controller.send(id);

        // Destaca o slide selecionado
        this.setHighlight(e);
    }

    $('#clear').click(function() {
        controller.clear();
    })

    $(document)
        .on('click', '.valid', function() {
            slideClick(this)
        })

    document.addEventListener("keyup", (e) => {
        switch(e.key) {
            case 'ArrowUp':
                controller.prev();
                this.setHighlight($(`#${controller.getPos()}`));
                break;
            case 'ArrowDown':
                controller.next();
                this.setHighlight($(`#${controller.getPos()}`));
                break;
            case 'ArrowLeft':
                controller.prev();
                this.setHighlight($(`#${controller.getPos()}`));
                break;
            case 'ArrowRight':
                controller.next();
                this.setHighlight($(`#${controller.getPos()}`));
                break;
            case 'PageUp':
                controller.prev();
                this.setHighlight($(`#${controller.getPos()}`));
                break;
            case 'PageDown':
                controller.next();
                this.setHighlight($(`#${controller.getPos()}`));
                break;
        }
    })
}
function SlideView() {
    var controller = new SlideController();

    $(document)
        /*
         * Comentado pois agora não será possível criar e excluir slides,
         * pois será um slide por estrofe
         */
        // .on('click', '.new-slide', function() {
        //     /**
        //      * Manda como parâmetro a div dos slides
        //      * pra poder adicioná-lo
        //      */
        //     var e = controller.createSlide( $(this).parent().parent() );
        //     e.focus();
        // })
        // .on('focusout', 'textarea', function() {
        //     // Se ficar vazio é removido
        //     if ( !$(this).val() ) {
        //         $(this).remove();
        //     }
        // })

        // .on('focus', 'textarea', function() {
        //     var resize = function (node) {
        //         var offset = node.offsetHeight - node.clientHeight;
        //         jQuery(node).css('height', 'auto').css('height', node.scrollHeight + offset);
        //     };
        //     jQuery(document).bind("ready", function(){
        //         jQuery('textarea[data-autoresize]')
        //             .bind('keyup input', function () {
        //                 resize(this);
        //             })
        //             .removeAttr('data-autoresize')
        //             .addClass("resizing")
        //             .trigger("input");
        //     });
        //     jQuery(document).trigger("ready");
        // })
}

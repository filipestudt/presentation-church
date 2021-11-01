function PresentationView() {
    var controller = new PresentationController();

    /*
     * Elementos da tela
     */
    const presentationViewElement = $('#presentation-view');
    const editElement = $('.edit2');
    const categoriesElement = $('#categories');
    const presentationListElement = $('#presentation-list');

    $('.remove-favorite').addClass('hide');

    /**
     * Carrega todas as apresentações e seta na tela
     * Usa o valor do select de categorias
     */
    var load = async function () {
        let value = categoriesElement.val();
        var data = await controller.load(value);
        // Sort alphabetically
        data.sort((a, b) => a.name.localeCompare(b.name));
        // Carrega em tela 
        setPresentations(data);
    }

    var getFavorites = async function () {
        let data = await controller.getFavorites();
        setPresentations(data.reverse());
    }

    var setPresentations = function (data) {
        /**
         * Limpa a view e a lista das apresentações
         */
        presentationListElement.html('');
        presentationViewElement.html('');

        for (let obj of data) {
            presentationListElement.append(`
                <span id="${obj.id}" class="presentation list-group-item">${obj.name}</span>`)
        }

        select($('.presentation')[0]);
    }

    var getSelected = function () {
        return editElement.attr('id');
    }

    var select = function (e) {
        /*
         * Deseleciona o último elemento selecionado
         */
        diselectAll();

        /*
         * Seta o azul em volta
         */
        $(e).addClass('active');

        /*
         * Pega o id e seta no botão de editar
         */
        let id = $(e).attr('id');
        editElement.attr('id', id);

        /*
         * Por último seta a view com o seu conteúdo
         */
        setView(id);
    }

    var diselectAll = function () {
        $('.presentation').removeClass('active')
    }

    var selectMenuItem = function (e) {
        $('#sidebar span').removeClass('active');
        $(e).addClass('active');
    }

    var setView = async function (id) {
        /**
         * Busca a apresentação através do seu id
         * que tava no elemento na lista
         */
        var presentation = await controller.getById(id);

        // Limpa a view
        presentationViewElement.html('');

        /**
         * Percorre o seu conteúdo, que é um array de estrofes
         * e pra cada estrofe seta o seu número seguido dos seus slides
         */
        for (let strophe of presentation.content) {

            presentationViewElement.append('[' + strophe.num + ']');
            presentationViewElement.append('<br>');

            if (strophe.slides) {
                for (let slide of strophe.slides) {
                    presentationViewElement.append(slide);
                    presentationViewElement.append('<br>');
                }
            }
        }
    }

    var search = async function () {
        let str = $('#search').val();
        let result = await controller.search(str.toLowerCase());
        console.log(result)

        setPresentations(result);
    }

    /**
     * Events listeners
     *
     * Quando trocar o elemento selecionado, busca as respectivas apresentações
     */
    $('#categories').change(function () {
        load();
    })

    $('.home').click(function () {
        $('#iframe').addClass('hide');
        $('.remove-favorite').addClass('hide');
        $('.remove').removeClass('hide');
        $('.favorite').removeClass('hide');
        load();
    })

    $('.new').click(function () {
        window.open(PRESENTATION_MANAGER_URL);
    })

    $('.edit').click(function () {
        let id = getSelected();

        if (!id) {
            alert('Nenhum apresentação selecionada');
            return;
        }

        window.open(PRESENTATION_MANAGER_URL + '?id=' + id);
    })

    $('.presentate').click(async function () {
        let id = getSelected();

        if (!id) {
            alert('Nenhum apresentação selecionada');
            return;
        }

        //window.open(PRESENTATION_CONTROLLER_URL + '?id=' + id + '&ip=' + receptorIp);
        $('#iframe').attr('src', PRESENTATION_CONTROLLER_URL + '?id=' + id + '&ip=' + receptorIp);
        $('#iframe').removeClass('hide');
    })

    $('.remove').click(async function () {
        let id = getSelected();

        if (!id) {
            alert('Nenhum apresentação selecionada');
            return;
        }

        if (confirm('Deseja relmente apagar?')) {
            try {
                await controller.remove(id);
            }
            catch (e) { }
            load();
        }
    })

    $('.refresh').click(function () {
        location.reload();
    })

    $('.import').click(function () {
        //window.open(IMPORT_URL);
        $('#iframe').attr('src', IMPORT_URL);
        $('#iframe').removeClass('hide');
    })

    $('.edit2').click(function () {
        let id = getSelected();

        if (!id) {
            alert('Nenhum apresentação selecionada');
            return;
        }

        //window.open(IMPORT_URL + '?id=' + id);
        $('#iframe').attr('src', IMPORT_URL + '?id=' + id);
        $('#iframe').removeClass('hide');
    })

    $('.favorite').click(async function () {
        let id = getSelected();

        if (!id) {
            alert('Nenhum apresentação selecionada');
            return;
        }

        try {
            await controller.setAsFavorite(id);
            alert('Favoritado');
        }
        catch (e) { }
    })

    $('.remove-favorite').click(async function () {
        let id = getSelected();

        if (!id) {
            alert('Nenhum apresentação selecionada');
            return;
        }

        try {
            await controller.removeFavorite(id);
            alert('Removido');
            getFavorites();
        }
        catch (e) { }
    })

    $('.see').click(function () {
        if ($(this).attr('class').includes('active')) {
            $(this).removeClass('active');
            controller.closeSlides();
        }
        else {
            $(this).addClass('active')
            controller.openSlides();
        }
    })

    $('#powerpoint').click(function () {
        $('.powerpoint input').click();
    })

    $('.powerpoint input').change(function () {
        controller.openPowerPoint(this.files[0])
    })

    $('.gallery').click(function () {
        //window.open(GALLERY_URL + '?ip=' + receptorIp);
        $('#iframe').attr('src', GALLERY_URL + '?ip=' + receptorIp);
        $('#iframe').removeClass('hide');
    })

    $('.bible').click(function () {
        $('#iframe').attr('src', BIBLE_URL + '?ip=' + receptorIp);
        $('#iframe').removeClass('hide');
    })

    $('.settings').click(function () {
        $('#iframe').attr('src', SETTINGS_URL + '?ip=' + receptorIp);
        $('#iframe').removeClass('hide');
    })

    $('#search').keypress(function (evt) {
        if (evt.key == 'Enter') {
            search();
        }
    })

    $('#btn-search').click(function () {
        search();
    })

    $('.favorites').click(function () {
        $('#iframe').addClass('hide');
        $('.remove-favorite').removeClass('hide');
        $('.remove').addClass('hide');
        $('.favorite').addClass('hide');
        getFavorites();
    })

    $('#theme').click(function () {
        var themeElm = document.getElementById('main')
        if (themeElm.classList.contains('theme-dark')) {
            themeElm.classList.remove('theme-dark');
            themeElm.classList.add('theme-light');
        } else {
            themeElm.classList.remove('theme-light');
            themeElm.classList.add('theme-dark');
        }
    })

    /**
     * Evento do tipo "on", para aplicar a todas as apresentações,
     * já que elas são dinâmicas dependendo da categoria selecionada
     */
    $(document).on('click', '.presentation', function () {
        select(this);
    })

    $(document).on('click', '#sidebar span', function () {
        selectMenuItem(this);
    })

    // Recebe uma mensagem do manager pra recarregar a página quando uma nova apresentação tiver sido
    // criada ou editada
    window.addEventListener("message", (event) => {
        load();
    }, false);

    /*
     * Depois de carregar tudo,
     * executa o método que carrega todas as apresentações
     */
    load();
}

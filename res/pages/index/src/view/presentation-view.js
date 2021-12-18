function PresentationView() {
    var controller = new PresentationController();
    var favoritesController = new FavoritesController();
    favoritesController.check();

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
    var load = async function (maintainSelected = false) {
        let value = categoriesElement.val();
        var data = await controller.load(value);
        // Sort alphabetically
        data.sort((a, b) => a.name.localeCompare(b.name));
        // Carrega em tela 
        let selected;
        if (maintainSelected) {
            selected = getSelected();
        }
        setPresentations(data, selected);
    }

    var getFavorites = async function (maintainSelected = false) {
        let data = await controller.getFavorites();
        let order = favoritesController.get();
        let dataToDisplay = [];

        for (let item of data) {
            let pos = order.indexOf(item.id);
            dataToDisplay[pos] = item;
        }

        console.log(dataToDisplay)

        // setPresentations(data.reverse());
        let selected;
        if (maintainSelected) {
            selected = getSelected();
        }
        setPresentations(dataToDisplay, selected);
    }

    var setPresentations = function (data, maintainSelected = null) {
        /**
         * Limpa a view e a lista das apresentações
         */
        presentationListElement.html('');
        presentationViewElement.html('');

        for (let obj of data) {
            presentationListElement.append(`
                <span id="${obj.id}" class="presentation list-group-item">${obj.name}</span>`)
        }

        if (maintainSelected) {
            for (let i = 0; i < $('.presentation').length; i++) {
                if ($('.presentation')[i].id == maintainSelected) {
                    select($('.presentation')[i]);
                    break;
                }
            }
        } else {
            select($('.presentation')[0]);
        }
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

    var openUrlOnIframe = function (url, id = null) {
        var idParam = id ? '&id=' + id : '';
        $('#iframe').attr('src', url + '?ip=' + receptorIp + idParam);
        $('#iframe').removeClass('hide');
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
        $('#favorites-order').addClass('hide');
        $('#categories').removeClass('hide');
        let maintainSelected = true;
        load(maintainSelected);
    })

    $('.presentate').click(async function () {
        let id = getSelected();

        if (!id) {
            alert('Nenhum apresentação selecionada');
            return;
        }

        openUrlOnIframe(PRESENTATION_CONTROLLER_URL, id);
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
        openUrlOnIframe(IMPORT_URL);
    })

    $('.edit2').click(function () {
        let id = getSelected();

        if (!id) {
            alert('Nenhum apresentação selecionada');
            return;
        }

        openUrlOnIframe(IMPORT_URL, id);
    })

    $('.favorite').click(async function () {
        let id = getSelected();

        if (!id) {
            alert('Nenhum apresentação selecionada');
            return;
        }

        try {
            await controller.setAsFavorite(id);
            favoritesController.add(id);
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
            favoritesController.remove(id);
            alert('Removido');
            getFavorites();
        }
        catch (e) { }
    })

    $('.gallery').click(function () {
        openUrlOnIframe(GALLERY_URL);
    })

    $('.bible').click(function () {
        openUrlOnIframe(BIBLE_URL);
    })

    $('.music').click(function () {
        openUrlOnIframe(MUSIC_URL);
    })

    $('.settings').click(function () {
        openUrlOnIframe(SETTINGS_URL);
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
        $('#favorites-order').removeClass('hide');
        $('#categories').addClass('hide');
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

    $('#favorites-order-button-up').click(function () {
        let id = getSelected();

        if (!id) {
            alert('Nenhum apresentação selecionada');
            return;
        }

        favoritesController.up(id);
        let maintainSelected = true;
        getFavorites(maintainSelected);
    })

    $('#favorites-order-button-down').click(function () {
        let id = getSelected();

        if (!id) {
            alert('Nenhum apresentação selecionada');
            return;
        }

        favoritesController.down(id);
        let maintainSelected = true;
        getFavorites(maintainSelected);
    })

    $('.select-video').click(function () {
        let id = getSelected();

        if (!id) {
            alert('Nenhum apresentação selecionada');
            return;
        }

        openUrlOnIframe(SELECT_VIDEO, id);
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
        switch (event.data) {
            // case 'saved':
            //     load(true);
            //     break;
            case 'poweroff':
                controller.poweroff();
                break;
            case 'refresh':
                location.reload();
                break;
            case 'go-back':
                $('#iframe').addClass('hide');
                break;
            case 'go-back-to-settings':
                $('.settings').click();
                break;
            case 'open-videos':
                openUrlOnIframe(VIDEOS);
                break;
            default:
                if (event.data.includes('.')) {
                    receptorIp = event.data;
                }
        }
    }, false);

    /*
     * Depois de carregar tudo,
     * executa o método que carrega todas as apresentações
     */
    load();
}

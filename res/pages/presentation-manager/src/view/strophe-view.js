function StropheView() {
    var controller = new StropheController();
    var requests = new RequestMaker( API_URL );

    function createStrohpe(type) {
        // Retorna um objeto do tipo StropheElement
        var stropheElement = controller.createStrohpe( type );
        stropheElement.getSlides().focus();
    }

    $(document)
        .on('click', '#new-strophe', function() {
            createStrohpe(STROPHE_TYPE);
        })
        .on('click', '#new-chorus', function() {
            createStrohpe(CHORUS_TYPE);
        })
        .on('click', '#save', function() {
            save();
        })
        .on('click', '.delete-strophe', function() {
            if (confirm('Deseja realmente excluir?')) {
                controller.deleteStrohpe( $(this).parent().parent() );
            }
        })
        .on('click', '.up', function() {
            var thisElement = $(this).parent().parent();
            var prevElement = $(thisElement).prev();
            controller.swap(prevElement, thisElement);
        })
        .on('click', '.down', function() {
            var thisElement = $(this).parent().parent();
            var nextElement = $(thisElement).next();
            controller.swap(thisElement, nextElement);
        })

    var save = async function() {
        console.log( controller.save() )

        var data = {
            name: $('#name').val(),
            category: $('#category').val(),
            content: controller.save()
        }

        if(id) {
            edit(data);
            return;
        }

        try {
            var response = await requests.post(data);
            console.log(response);
            window.opener.postMessage('saved', '*');
            window.close();
        }
        catch(e) {
            var msg = JSON.parse(e.responseText);
            alert(msg.message);
        }
    }

    var edit = async function(data) {
        try {
            data.id = id;
            var response = await requests.put(data);
            console.log(response);
            window.opener.postMessage('saved', '*');
            window.close();
        }
        catch(e) {
            if (e.status == 200) {
                window.opener.postMessage('saved', '*');
                window.close();
            }
            console.log(e)
            var msg = JSON.parse(e.responseText);
            alert(msg.message);
        }
    }

    this.load = async function(id) {
        var slideController = new SlideController();

        var data = await requests.getById(id);

        $('#name').val(data.name)
        $('#category').val(data.category)

        for (strophe of data.content) {
            let num = strophe.num;
            let type;

            if (isNaN(num)) {
                type = CHORUS_TYPE;
            }
            else {
                type = STROPHE_TYPE;
            }

            var stropheElement = controller.createStrohpe( type );
            //stropheElement.getSlides()[0].remove();

            var slide = stropheElement.getSlides()
            slide.value = strophe.slides.join('\n\n');


            // for (slide of strophe.slides) {
            //     slideController.createSlideWithContent(stropheElement.get(), slide);
            // }
        }
    }
}

// seta o ip como variável global
const receptorIp = GetURLParameter('ip');
const controller = new Controller(receptorIp);

$('#send').click(function () {

    let files = $('input')[0].files;

    controller.send(files);

    let reader = new FileReader();
    let file = files[0];
    let preview = $('img')[0];

    reader.onloadend = function () {
        preview.src = reader.result;
    }

    if (file) {
        reader.readAsDataURL(file);
    } else {
        preview.src = "";
    }

    generateThumbs(files)
})

function generateThumbs(filesArr) {
    $('#thumbs').html('');

    for (let file of filesArr) {
        $('#thumbs').append('<div class="thumb"><img src=""></div>');
        let preview = $('#thumbs img').last()[0];
        read(file, preview);
    }
}

async function read(file, preview) {
    let reader = new FileReader();

    reader.onloadend = function () {
        preview.src = reader.result;
    }

    if (file) {
        reader.readAsDataURL(file);
    } else {
        preview.src = "";
    }
}

/**
 * Events listener
 */
$(document).on('click', '#thumbs img', function () {
    controller.select(this);
})

$('#next').click(function () {
    controller.next();
})

$('#prev').click(function () {
    controller.prev();
})

document.addEventListener('keyup', function (e) {
    switch (e.key) {
        case 'ArrowRight':
            controller.next();
            break;
        case 'ArrowLeft':
            controller.prev();
            break;
        case 'ArrowDown':
            controller.next();
            break;
        case 'ArrowUp':
            controller.prev();
            break;
        case 'PageDown':
            controller.next();
            break;
        case 'PageUp':
            controller.prev();
            break;
    }
})

$('#close').click(function () {
    controller.close();
})

window.addEventListener('beforeunload', function (e) {
    controller.close();
    return true;
});
var presentationsApi = new RequestMaker(API_PRESENTATIONS_URL);
var id = GetURLParameter('id');
var ip = GetURLParameter('ip');
var videosApi = new RequestMaker(`http://${ip}:${RECEPTOR_PORT}/videos`);

var presentation;

$(document).ready(async function () {
    $('.videos').hide();

    try {
        presentation = await presentationsApi.getById(id);
    }
    catch (err) {
        alert('Apresentação não encontrada.');
        $('.go-back').click();
    }

    setLocal(presentation.video);
})

$('.go-back').click(function () {
    window.top.postMessage('go-back', '*');
})

$('#btn-select').click(async function () {
    var videos = await videosApi.get();

    $('.videos').show();
    $('.videos-list').html('');
    $('.selected').hide();

    $('.videos-list').append(`
        <span class="col-sm-6 col-md-4 col-lg-3 wrapper" id="null">
            <span class="img"">
                <span class="video-name" style="color: black;">Nenhum</span>
            </span>
        </span>
    `);

    for (let video of videos) {
        let url = `http://${ip}:${RECEPTOR_PORT}/${video.thumbnail}`;
        //$('.videos-list').append(`<img id="${video.id}" src="${url}">`);
        $('.videos-list').append(`
            <span class="col-sm-6 col-md-4 col-lg-3 wrapper" id="${video.id}">
                <span class="img" style="background-image: url('${url}');">
                    <span class="video-name">${video.name}</span>
                </span>
            </span>
        `);
    }
})

$('.close-videos-select').click(function () {
    $('.videos').hide();
    $('.selected').show();
})

$(document).on('click', '.wrapper', async function (e) {
    try {
        presentation.video = this.id;
        await presentationsApi.put(presentation.id, presentation);
        setLocal(this.id);
        $('.close-videos-select').click();
    } catch (err) { console.log(err) }
})

async function setLocal(videoId) {
    try {
        let video = await videosApi.getById(videoId);
        let url = `http://${ip}:${RECEPTOR_PORT}/${video.thumbnail}`;
        $('#video-name').html(video.name);
        $('#thumbnail').attr('src', url);
    }
    catch (err) {
        $('#video-name').html('Não selecionado');
        $('#thumbnail').attr('src', null);
    }
}
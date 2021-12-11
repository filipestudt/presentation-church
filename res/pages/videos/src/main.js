// var id = GetURLParameter('id');
var ip = GetURLParameter('ip');
var videosApi = new RequestMaker(`http://${ip}:${RECEPTOR_PORT}/videos`);
var selectedVideo;

$(document).ready(async function () {
    loadVideos();
})

$('.go-back').click(function () {
    window.top.postMessage('go-back-to-settings', '*');
})

$('#btn-save').click(async function () {
    var data = {
        name: $('#video-name').val()
    }

    if (!selectedVideo) {
        alert('Nenhum vídeo selecionado');
        return;
    }

    try {
        await videosApi.put(selectedVideo, data);
        $('.close-videos-select').click();
    }
    catch (err) {
        console.log(err);
    }
})

$('#btn-delete').click(async function () {
    try {
        await videosApi.delete(selectedVideo);
        $('.close-videos-select').click();
    }
    catch (err) {
        console.log(err);
    }
})

$('#btn-upload').click(async function () {
    var data = new FormData();

    var len = $('#files')[0].files.length;
    for (let i = 0; i < len; i++) {
        data.append('file-' + i, $('#files')[0].files[i]);
    }

    try {
        await videosApi.post(data);
    } catch (err) { console.log(err) }

    loadVideos();
})

$('.close-videos-select').click(function () {
    $('.selected').hide();
    $('.videos').show();
    loadVideos();
})

$(document).on('click', '.wrapper', async function (e) {
    $('.videos').hide();
    $('.selected').show();
    setLocal(this.id);
    selectedVideo = this.id;
})

async function loadVideos() {
    $('.selected').hide();

    var videos = await videosApi.get();

    $('.videos').show();
    $('.videos-list').html('');

    for (let video of videos) {
        let url = `http://${ip}:${RECEPTOR_PORT}/${video.thumbnail}`;
        $('.videos-list').append(`
            <span class="col-sm-6 col-md-4 col-lg-3 wrapper" id="${video.id}">
                <span class="img" style="background-image: url('${url}');">
                    <span class="video-name">${video.name}</span>
                </span>
            </span>
        `);
    }
}

async function setLocal(videoId) {
    try {
        let video = await videosApi.getById(videoId);
        let url = `http://${ip}:${RECEPTOR_PORT}/${video.thumbnail}`;
        $('#video-name').val(video.name);
        $('#thumbnail').attr('src', url);
    }
    catch (err) {
        $('#video-name').html('Não selecionado');
        $('#thumbnail').attr('src', null);
    }
}
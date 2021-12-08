var presentationsApi = new RequestMaker(API_PRESENTATIONS_URL);
var videosApi = new RequestMaker(API_VIDEOS_URL);
var id = GetURLParameter('id');
var ip = GetURLParameter('ip');

$(document).ready(async function () {
    $('.videos').hide();

    var presentation = await presentationsApi.getById(id);
    //var video = videosApi.getById(presentation.videoId);
    var video = {
        id: 1,
        name: 'waterfall',
        thumbnail: 'a.jpg'
    }

    $('#video-name').html(video.name);
    $('#thumbnail').attr('src', video.thumbnail);
})

$('.go-back').click(function () {
    window.top.postMessage('go-back', '*');
})

$('#btn-select').click(async function () {
    var videos = await videosApi.get();

    $('.videos').show();
    $('.videos-list').html('');
    $('.selected').hide();
    for (let video of videos) {
        let url = `http://${ip}:${RECEPTOR_PORT}/${video.thumbnail}`;
        $('.videos-list').append(`<img id="${video.id}" src="${url}">`);
    }
})

$('.close-videos-select').click(function () {
    $('.videos').hide();
    $('.selected').show();
})
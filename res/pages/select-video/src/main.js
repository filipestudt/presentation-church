var presentationsApi = new RequestMaker(API_PRESENTATIONS_URL);
var videosApi = new RequestMaker(API_VIDEOS_URL);
var id = GetURLParameter('id');

$(document).ready(async function () {
    var presentation = await presentationsApi.getById(id);
    //var video = videosApi.getById(presentation.videoId);
    var video = {
        id: 1,
        name: 'waterfall',
        thumbnail: 'a.jpg'
    }

    $('#video-name').html(video.name);
    $('#thumbnail').attr('src', video.thumbnail)
})

$('.go-back').click(function () {
    window.top.postMessage('go-back', '*');
})
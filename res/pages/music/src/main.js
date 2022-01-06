const ip = GetURLParameter('ip');
const api = new RequestMaker(API_MUSIC_URL);
const vlcPythonAudio = new RequestMaker(`http://${ip}:${RECEPTOR_PORT}/music`);
const player = new Player();
const formats = 'mp3';
var dir = [];
var socket;

if (ip) {
    socket = io('http://' + ip + ':' + RECEPTOR_PORT);
}

socket.on('time', function (time) {
    console.log(time)
})

$('.volume-muted-icon').hide();

$(document).ready(async function () {
    var data = await api.get();
    render(data);

    player.loadPreferences();
    setVolumeIcon(player.isMuted());
    setPlayIcon(player.isPlaying());
    setCurrentSong(player.getCurrentSong());
    $('#volume-input').val(player.getVolume());
})

$(document).on('click', '.go-back', function () {
    goBack();
});

$(document).on('click', '.folder', function () {
    openDir(this.id);
});

$(document).on('click', '.file', async function () {
    let currentSong = this.id;
    player.setCurrentSong(currentSong)
    setCurrentSong(currentSong);

    //socket to receptor to open vlc
    //await vlcPythonAudio.open();

    let arr = [...dir, currentSong];
    console.log(arr.join('/'))
    socket.send('music', arr.join('/'));
});

$('.play').click(function () {
    player.togglePlay();
    setPlayIcon(player.isPlaying());
})

$('.volume-button').click(function () {
    player.toggleMute();
    setVolumeIcon(player.isMuted());
    //TODO
    //socket to receptor to change volume
})

$('#volume-input').change(function () {
    let volume = this.value;
    player.setVolume(volume);
})

function setCurrentSong(songName) {
    let name = songName.substr(0, 20);
    name += songName.length >= 20 ? '...' : '';
    $('.current-song').html(name);
}

function setPlayIcon(isPlaying) {
    console.log(isPlaying)
    if (isPlaying) {
        $('.play-icon').show();
        $('.pause-icon').hide();
    } else {
        $('.play-icon').hide();
        $('.pause-icon').show();
    }
}

function setVolumeIcon(isMuted) {
    if (isMuted) {
        $('.volume-icon').hide();
        $('.volume-muted-icon').show();
    } else {
        $('.volume-icon').show();
        $('.volume-muted-icon').hide();
    }
}

async function openDir(toOpen) {
    dir.push(toOpen);
    let data = await api.post({ dir });
    render(data);
}

async function goBack() {
    dir.pop();
    let data;

    if (dir.length == 0) {
        data = await api.get();
    } else {
        data = await api.post({ dir });
    }
    render(data);
}

function render(data) {
    if (data && data.length > 0) {
        $('.render-files').html('');

        data.map((e) => {
            let split = e.split('.');

            // <span>${e.substr(0, 20)}${e.length >= 20 ? '...' : ''}</span>

            if (split.length == 1) {
                $('.render-files').append(`
                    <span class="folder" id="${e}" title="${e}">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="40" height="60"><path fill="none" d="M0 0h24v24H0z"/><path d="M4 5v14h16V7h-8.414l-2-2H4zm8.414 0H21a1 1 0 0 1 1 1v14a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h7.414l2 2z"/></svg>
                        <span>${e}</span>
                    </span>
                `);
            }
            else if (split[split.length - 1] == 'mp3') {
                $('.render-files').append(`
                    <span class="file" id="${e}" title="${e}">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="40" height="60"><path fill="none" d="M0 0h24v24H0z"/><path d="M16 8v2h-3v4.5a2.5 2.5 0 1 1-2-2.45V8h4V4H5v16h14V8h-3zM3 2.992C3 2.444 3.447 2 3.999 2H16l5 5v13.993A1 1 0 0 1 20.007 22H3.993A1 1 0 0 1 3 21.008V2.992z"/></svg>
                        <span>${e}</span>
                    </span>
                `);
            } else {
                $('.render-files').append(`
                    <span class="file" id="${e}" title="${e}">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="40" height="60"><path fill="none" d="M0 0h24v24H0z"/><path d="M9 2.003V2h10.998C20.55 2 21 2.455 21 2.992v18.016a.993.993 0 0 1-.993.992H3.993A1 1 0 0 1 3 20.993V8l6-5.997zM5.83 8H9V4.83L5.83 8zM11 4v5a1 1 0 0 1-1 1H5v10h14V4h-8z"/></svg>
                        <span>${e}</span>
                    </span>
                `);
            }
        })
    } else {
        $('.render-files').html('');
    }
}
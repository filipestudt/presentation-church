var svgOn = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="30" height="30" fill="#7e828b"><path fill="none" d="M0 0h24v24H0z"/><path d="M8 5h8a7 7 0 0 1 0 14H8A7 7 0 0 1 8 5zm8 10a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"/></svg>`
var svgOff = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="30" height="30" fill="#7e828b"><path fill="none" d="M0 0h24v24H0z"/><path d="M8 7a5 5 0 1 0 0 10h8a5 5 0 0 0 0-10H8zm0-2h8a7 7 0 0 1 0 14H8A7 7 0 0 1 8 5zm0 10a3 3 0 1 1 0-6 3 3 0 0 1 0 6z"/></svg>`;
var data, socket;

var ip = GetURLParameter('ip');
console.log(ip)
if (ip && ip != 'undefined') {
    socket = io('http://' + ip + ':' + RECEPTOR_PORT);
}

try {
    data = JSON.parse(localStorage.getItem('config'));
}
catch (e) { }

if (data) {
    $('#font-size').val(data.fontSize || 60);
    $('.btn-toggle').html(data.staticIp ? svgOn : svgOff);
    $('.btn-toggle').addClass(data.staticIp ? 'on' : 'off');

    if (data.staticIp) {
        $('#ip').removeAttr('disabled');
    } else {
        $('#ip').attr('disabled', true);
    }

    $('#ip').val(data.ip);

    if (data.staticIp && data.ip) {
        receptorIp = data.ip;
    }
} else {
    $('#font-size').val(60);
    $('.btn-toggle').html(svgOff);
    $('.btn-toggle').addClass('off');
    $('#ip').attr('disabled', true);
}

$('.btn-toggle').click(function (e) {
    if ($('.btn-toggle').hasClass('on')) {
        $('.btn-toggle').removeClass('on');
        $('.btn-toggle').addClass('off');
        $('.btn-toggle').html(svgOff);
        $('#ip').attr('disabled', true);
    }
    else {
        $('.btn-toggle').removeClass('off');
        $('.btn-toggle').addClass('on');
        $('.btn-toggle').html(svgOn);
        $('#ip').removeAttr('disabled');
    }
})

$('#btn-save').click(function (e) {
    var fontSize = !isNaN($('#font-size').val()) ? $('#font-size').val() : 60;
    var staticIp = $('#ip').attr('disabled') ? false : true;
    var ip = $('#ip').val();

    let newData = {
        fontSize,
        staticIp,
        ip
    }

    localStorage.setItem('config', JSON.stringify(newData));

    if (newData.fontSize != data.fontSize) {
        socket.emit('font-size', fontSize);
    }

    if (isNaN($('#font-size').val())) {
        $('#font-size').val(data.fontSize || 60);
    }

    // send ip
    if (staticIp) {
        window.top.postMessage(ip, '*');
    }
})

$('#btn-poweroff').click(function (e) {
    window.top.postMessage('poweroff', '*');
})

$('#btn-refresh').click(function (e) {
    window.top.postMessage('refresh', '*');
})

//localStorage.setItem('config',JSON.stringify({fontSize: 33}))
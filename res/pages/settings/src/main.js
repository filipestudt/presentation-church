var svgOn = `<svg class="hide toggle-btn" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="30" height="30" fill="#7e828b"><path fill="none" d="M0 0h24v24H0z"/><path d="M8 7a5 5 0 1 0 0 10h8a5 5 0 0 0 0-10H8zm0-2h8a7 7 0 0 1 0 14H8A7 7 0 0 1 8 5zm0 10a3 3 0 1 1 0-6 3 3 0 0 1 0 6z"/></svg>`;
var svgOff = `<svg class="toggle-btn xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="30" height="30" fill="#7e828b"><path fill="none" d="M0 0h24v24H0z"/><path d="M8 5h8a7 7 0 0 1 0 14H8A7 7 0 0 1 8 5zm8 10a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"/></svg>`
var data, socket;

var ip = GetURLParameter('ip');
if (ip) {
    socket = io('http://' + ip + ':' + RECEPTOR_PORT);
}

try {
    data = JSON.parse(localStorage.getItem('config'));
}
catch(e) {}

if (data) {
    $('#font-size').val(data.fontSize || 60);
    document.querySelector(".range-input .value div").innerHTML = data.fontSize || 60;
}


$('.btn-toggle').on('click', function(e) {
    if ($(e.target).hasClass('on')) {
        e.target.classList.remove('on');
        e.target.classList.add('off');
        e.target.innerHTML = svgOff;
    }
    else {
        e.target.classList.add('on');
        e.target.classList.remove('off');
        e.target.innerHTML = svgOn;
    }
})

//localStorage.setItem('config',JSON.stringify({fontSize: 33}))
var requestMaker = new RequestMaker(API_BASE_URL);
var ip = GetURLParameter('ip');
var socket;

if (ip) {
    socket = io('http://' + ip + ':' + RECEPTOR_PORT);
}

(async function() {
    var books = await requestMaker.getBooks();
    for (let book of books) {
        $('#books').append('<option value="'+ book.abbrev +'">' + book.name + '</option>')
    }
    getNumberOfChapters(books[0].abbrev);
    loadChapter(books[0].abbrev, 1);
}())

$('#books').on('change', function(e) {
    getNumberOfChapters(e.target.value);
    loadChapter(e.target.value, 1);
})

$('#chapters').on('change', function(e) {
    loadChapter($('#books').val(), e.target.value);       
})

$(document).on('click', '.verse', function(e) {
    $('.verse').removeClass('active');
    $(e.target).addClass('active');
    socket.emit('slide', e.target.textContent);
})

function loadChapter(book, chapter) {
    requestMaker.get(book, chapter).then(function(data, err) {
        var count = 0;
        document.getElementById('text').innerHTML = '';
        for (let verse of data) {
            document.getElementById('text').innerHTML += '<span class="verse">' + ++count + '. ' + verse + '</span>';
        }
    }) 
}

function getNumberOfChapters(book) {
    requestMaker.getChapters(book).then(function(data, err) {
        $('#chapters').empty();
        for(let i=1; i <= data.chapters; i++) {
            $('#chapters').append('<option value="'+ i +'">' + i + '</option>');
        }
    })
}

document.addEventListener('keyup', function(e) {
    if(e.key=='ArrowDown' || e.key=='ArrowRight') {
        let active = $('.verse.active').next();
        $('.verse').removeClass('active');
        active.addClass('active');
        socket.emit('slide', active[0].textContent);
    }
    else if(e.key=='ArrowUp' || e.key=='ArrowLeft') {
        let active = $('.verse.active').prev();
        $('.verse').removeClass('active');
        active.addClass('active');
        socket.emit('slide', active[0].textContent);
    }
})
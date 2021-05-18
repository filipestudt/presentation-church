var requestMaker = new RequestMaker(API_BASE_URL);
var ip = GetURLParameter('ip');

(async function() {
    var books = await requestMaker.getBooks();
    for (let book of books) {
        $('#books').append('<option value="'+ book.abbrev +'">' + book.name + '</option>')
    }
}())

$('#books').on('change', function(e) {
    requestMaker.getChapters(e.target.value).then(function(data, err) {
        $('#chapters').empty();
        for(let i=1; i <= data.chapters; i++) {
            $('#chapters').append('<option value="'+ i +'">' + i + '</option>');
        }
    })
    loadChapter(e.target.value, 1);
})

$('#chapters').on('change', function(e) {
    loadChapter($('#books').val(), e.target.value);       
})

function loadChapter(book, chapter) {
    requestMaker.get(book, chapter).then(function(data, err) {
        var count = 0;
        document.getElementById('text').innerHTML = '';
        for (let verse of data) {
            document.getElementById('text').innerHTML += ++count + '. ' + verse + '<br />';
        }
    }) 
}
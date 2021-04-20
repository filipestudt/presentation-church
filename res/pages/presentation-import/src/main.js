const SERVER_PORT = 3013;
const API_URL = 'http://localhost:' + SERVER_PORT + '/presentations';
var requestMaker = new RequestMaker(API_URL);

var id = GetURLParameter('id');
if (id) load();

$('#save').click(async function() {
    var result = {
        name: $('#name').val(),
        category: $('#category').val(),
        content: save()
    }

    if (id) {
        result.id = id;
    }

    console.log(result);

    if (id) {
        try {
            await requestMaker.put(result);
            window.opener.postMessage('saved', '*');
            window.close();
        }
        catch(e) {
            alert(e.responseJSON.message);
        }
    }

    try {
        await requestMaker.post(result);
        window.opener.postMessage('saved', '*');
        window.close();
    }
    catch(e) {
        alert(e.responseJSON.message);
    }

})

function save() {
    const separator = '0(*&)!@$¨%&1';
    var arr = $('#content').val().replace(/\[[1-9]\]|\[c\]/g, `${separator}$&${separator}`).replace(/\n\n/g, separator).split(separator);

    var strophesArr = [];
    for (let line of arr) {
        if (line.match(/\[[1-9]\]|\[c\]/g)) {
            strophesArr.push({
                num: line[1],
                slides: []
            })
            continue;
        }

        strophesArr.length > 0 && line != '' && strophesArr[strophesArr.length - 1].slides.push(line[0] == '\n' ? line.slice(1) : line);
    }

    return strophesArr;
}

async function load() {
    var data = await requestMaker.getById(id);
    let result = '';

    for (let strophe of data.content) {
        result += '[' + strophe.num + ']' + '\n';
        result += strophe.slides.join('\n\n');        
    }

    $('#content').val(result);

    console.log(data);

    $('#name').val(data.name);
    $('#category').val(data.category);
}
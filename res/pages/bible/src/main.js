var requestMaker = new RequestMaker(API_BASE_URL);
var ip = GetURLParameter('ip');

(async function() {
    var data = await requestMaker.get('gn', 1);
    var count = 0;
    for (let verse of data) {
        document.getElementById('main').innerHTML += ++count + '. ' + verse;
    }
    
}())
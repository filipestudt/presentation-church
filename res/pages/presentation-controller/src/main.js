const SERVER_PORT = 3013;
const RECEPTOR_PORT = 3000;
const API_URL = 'http://localhost:' + SERVER_PORT + '/presentations';
var requestMaker = new RequestMaker(API_URL);
var controller = new Controller();
var view = new View();

var id = GetURLParameter('id');
var ip = GetURLParameter('ip');

(async function () {
    var pres = await requestMaker.getById(id);
    controller.init(pres.content, ip);
}())
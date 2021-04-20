const STROPHE_TYPE = 'strophe';
const CHORUS_TYPE = 'chorus';
const SERVER_PORT = 3013;
const RECEPTOR_PORT = 3000;
const API_URL = 'http://localhost:' + SERVER_PORT + '/presentations';

var stropheView = new StropheView();
var slideView = new SlideView();

var id = GetURLParameter('id');

if (id) {
    stropheView.load(id);
}
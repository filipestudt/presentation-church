var requests = new RequestMaker( API_URL );
new PresentationView();

/**
 * Quando abrir o programa vai buscar pelo ip do receptor,
 * se conseguir achar vai setar nessa variável,
 * se não vai informar ao usuário
 */
var receptorIp;

async function connectToReceptor() {
    //$('#loading').html('Conectando... <img src="assets/img/loading-gif-png-5.gif">')
    $('#loading').html('Conectando... <img style="width: 42px;" src="assets/img/animation_200_knsyj8ts.gif">')
    $('#loading').attr('Title', 'Conectando-se ao receptor')

    setTimeout(function() {
        $('#loading').html('Conectando... <img style="width: 35px;" src="assets/img/animation_200_knsylo42.gif">');
    }, 3000);

    setTimeout(function() {
        $('#loading').html('Conectado');
    }, 4600)

    try {
        receptorIp = await requests.getReceptorIp();
        //alert('Conectado com sucesso ao receptor');
        $('#loading').html('Conectado');
        //$('#loading').attr('Title', 'Conectado ao receptor')
        $('#loading').attr('Title', 'Conectado ao receptor: ' + receptorIp)
    }
    catch(e) {
        //alert(e.responseJSON.message);
        $('#loading').html('Desconectado');
        $('#loading').attr('Title', 'Tentar novamente')
    }
}

$(document).ready(function() {
    connectToReceptor();
})

$('#loading').click(function() {
    if(!receptorIp) {
        connectToReceptor();
    }
})
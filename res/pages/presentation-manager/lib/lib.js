// Algumas constantes
const STROPHES_DIV = '.strophes';

var $strohpeTemplate = $('.strophe').first().clone();
var $textareaTemplate = $('textarea').first().clone();
$strohpeTemplate.removeClass('example');
$('.strophe:first').remove();
$('textarea').remove()

function cloneStrophe() {    
    return $strohpeTemplate.clone();
}

function cloneSlide() {
    return $($textareaTemplate.clone());
}

function isUpperCase(char) {
    return char === char.toUpperCase();
}

function GetURLParameter(sParam) {
    var sPageURL = window.location.search.substring(1);

    var sURLVariables = sPageURL.split('&');

    for (var i = 0; i < sURLVariables.length; i++) {
        var sParameterName = sURLVariables[i].split('=');
        if (sParameterName[0] == sParam) {
            return sParameterName[1];
        }
    }
}
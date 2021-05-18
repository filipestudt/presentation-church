$('svg').on('click', function(e) {
    $('.toggle-btn').removeClass('hide');
    setTimeout(function(){
        e.target.classList.add('hide');
    },200)
})
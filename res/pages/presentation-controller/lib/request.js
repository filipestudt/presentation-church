function RequestMaker(url) {
    this.getById = function() {
        return $.ajax({
            type: 'GET',
            url: url + '/' + id,
            success: (data) => data,
            error: (data) => data
        });
    }    
}
function RequestMaker(urlParam) {

    var URL_BASE = urlParam;

    $.ajaxSetup({
        async: true
    });

    this.get = function() {
        return $.ajax({
            type: 'GET',
            url: URL_BASE,
            success: (data) => data,
            error: (data) => `Error: ${data}`
        });
    }

    this.getReceptorIp = function() {
        return $.ajax({
            type: 'GET',
            url: RECEPTOR_URL,
            success: (data) => data,
            error: (data) => data
        });
    }

    this.getById = function(id) {
        return $.ajax({
            type: 'GET',
            url: URL_BASE + '/' + id,
            success: (data) => data,
            error: (data) => `Error: ${data}`
        });
    }

    this.getByCategory = function(category) {
        return $.ajax({
            type: 'GET',
            url: URL_BASE + '/category/' + category,
            success: (data) => data,
            error: (data) => `Error: ${data}`
        });
    }

    this.post = function(data) {
        $.ajaxSetup({
            async: true
        });

        console.log(data)

        return $.ajax({
            type: 'POST',
            data: data,
            url: URL_BASE,
            dataType: "json",
            success: (data) => data,
            error: (data) => data
        });
    }

    this.remove = function(id) {
        return $.ajax({
            type: 'DELETE',
            url: URL_BASE,
            data: {id: id},
            success: (data) => data,
            error: (data) => `Error: ${data}`
        });
    }

    // Receptor requests
    this.openSlides = function() {
        return $.ajax({
            type: 'GET',
            url: 'http://' + receptorIp + ':' + RECEPTOR_PORT + '/slides/open',
            success: (data) => data,
            error: (data) => `Error: ${data}`
        });
    }

    this.closeSlides = function() {
        return $.ajax({
            type: 'GET',
            url: 'http://' + receptorIp + ':' + RECEPTOR_PORT + '/slides/close',
            success: (data) => data,
            error: (data) => `Error: ${data}`
        });
    }

    this.powerpoint = function(data) {
        let fd = new FormData();
        fd.append('ppt', data);

        return $.ajax({
            type: 'POST',
            url: 'http://' + receptorIp + ':' + RECEPTOR_PORT + '/powerpoint/open',
            data: fd,
            contentType: false,
            processData: false,
            success: (data) => data,
            error: (data) => `Error: ${data}`
        })
    }
}

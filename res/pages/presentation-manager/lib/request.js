function RequestMaker(urlParam) {

    var URL_BASE = urlParam;

    $.ajaxSetup({
        async: true
    });

    this.getById = function(id) {
        $.ajaxSetup({
            async: true
        });

        return $.ajax({
            type: 'GET',
            url: URL_BASE + '/' + id,
            dataType: 'json',
            success: (data) => data,
            error: (data) => `Error: ${data}`
        });
    }

    this.post = function(data) {
        $.ajaxSetup({
            async: true
        });

        return $.ajax({
            type: 'POST',
            data: data,
            url: URL_BASE,
            dataType: "json",
            success: (data) => data,
            error: (data) => data
        });
    }

    this.put = function(data) {
        $.ajaxSetup({
            async: true
        });

        return $.ajax({
            type: 'PUT',
            data: data,
            url: URL_BASE,
            dataType: 'json',
            success: (data) => data,
            error: (data) => `Error: ${data}`
        });
    }
}
function RequestMaker(urlParam) {

	var URL_BASE = urlParam;

	$.ajaxSetup({
		async: true
	});

	this.getById = function (id) {
		return $.ajax({
			type: 'GET',
			url: URL_BASE + '/' + id,
			success: (data) => data,
			error: (data) => `Error: ${data}`
		});
	}
}

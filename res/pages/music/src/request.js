function RequestMaker(urlParam) {

	var URL_BASE = urlParam;

	$.ajaxSetup({
		async: true
	});

	this.get = function () {
		return $.ajax({
			type: 'GET',
			url: URL_BASE,
			success: (data) => data,
			error: (data) => `Error: ${data}`
		});
	}

	this.getById = function (id) {
		return $.ajax({
			type: 'GET',
			url: URL_BASE + '/' + id,
			success: (data) => data,
			error: (data) => `Error: ${data}`
		});
	}

	this.post = function (data) {
		return $.ajax({
			type: 'POST',
			data: data,
			url: URL_BASE,
			success: (data) => data,
			error: (data) => `Error: ${data}`
		});
	}

	this.put = function (id, data) {
		return $.ajax({
			type: 'PUT',
			data: data,
			url: URL_BASE + '/' + id,
			success: (data) => data,
			error: (data) => `Error: ${data}`
		});
	}

	this.delete = function (id, data) {
		return $.ajax({
			type: 'DELETE',
			url: URL_BASE + '/' + id,
			success: (data) => data,
			error: (data) => `Error: ${data}`
		});
	}
}

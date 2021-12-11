function RequestMaker(urlParam) {

  var URL_BASE = urlParam;

  $.ajaxSetup({
    async: true
  });

  this.get = function (book, chapter) {
    return $.ajax({
      type: 'GET',
      url: URL_BASE + '/bible/' + book + '/' + chapter,
      success: (data) => data,
      error: (data) => `Error: ${data}`
    });
  }

  this.getBooks = function () {
    return $.ajax({
      type: 'GET',
      url: URL_BASE + '/bible/books',
      success: (data) => data,
      error: (data) => `Error: ${data}`
    });
  }

  this.getChapters = function (book) {
    return $.ajax({
      type: 'GET',
      url: URL_BASE + '/bible/' + book,
      success: (data) => data,
      error: (data) => `Error: ${data}`
    });
  }
}

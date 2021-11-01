function PresentationController() {
    var requests = new RequestMaker(API_URL);

    this.load = function (category) {
        return requests.getByCategory(category);
    }

    this.getById = function (id) {
        return requests.getById(id);
    }

    this.getFavorites = function () {
        return requests.getFavorites();
    }

    this.setAsFavorite = function (id) {
        return requests.setAsFavorite(id);
    }

    this.removeFavorite = function (id) {
        return requests.removeFavorite(id);
    }

    this.create = function (data) {
        return requests.post(data)
    }

    this.remove = function (id) {
        return requests.remove(id);
    }

    this.getReceptorIp = function () {
        return requests.getReceptorIp();
    }

    this.openSlides = function () {
        return requests.openSlides();
    }

    this.closeSlides = function () {
        return requests.closeSlides();
    }

    const doSearch = function (pres, str) {
        if (pres.name.toLowerCase().includes(str)) {
            return pres;
        }

        console.log(pres)

        if (!pres.content) {
            return null;
        }

        for (let content of pres.content) {
            if (!content.slides) {
                return null;
            }
            for (let slide of content.slides) {
                if (slide.toLowerCase().includes(str)) {
                    return pres;
                }
            }
        }

        return null;
    }

    this.search = async function (str) {
        let result = [];
        let searchResult;
        let data = await requests.get();

        for (let pres of data) {
            searchResult = doSearch(pres, str);

            if (searchResult) {
                result.push(searchResult)
            }
        }

        // Sort alphabetically
        return result.sort((a, b) => a.name.localeCompare(b.name));
    }

    this.openPowerPoint = async function (path) {
        try {
            await requests.powerpoint(path);
        }
        catch (e) {
            alert(e)
        }

        $('.powerpoint input').val('');
    }
}

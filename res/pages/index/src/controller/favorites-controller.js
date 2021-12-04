function FavoritesController() {
    const key = 'favorites-order';

    this.check = function () {
        let data = localStorage.getItem(key);
        if (!data) {
            localStorage.setItem(key, JSON.stringify([]));
        }
    }

    this.save = function (data) {
        localStorage.setItem(key, JSON.stringify(data));
    }

    this.get = function () {
        return JSON.parse(localStorage.getItem(key)) || [];
    }

    this.getById = (id) => {
        let data = this.get();

        for (let item of data) {
            if (item.id == id) {
                return item;
            }
        }

        return null;
    }

    this.add = (id) => {
        let data = this.get();
        let alreadyExists = data.indexOf(id) != -1
        if (alreadyExists) {
            return null;
        }

        data.push(id);

        this.save(data);
    }

    this.remove = (id) => {
        let data = this.get();
        let pos = data.indexOf(id);
        data.splice(pos, 1);
        this.save(data);
    }

    this.up = (id) => {
        let data = this.get();
        let pos = data.indexOf(id);

        if (pos == 0) {
            return;
        }

        let aux = data[pos];
        data[pos] = data[pos - 1];
        data[pos - 1] = aux;

        this.save(data);
    }

    this.down = (id) => {
        let data = this.get();
        let pos = data.indexOf(id);

        if (pos == (data.length - 1)) {
            return;
        }

        let aux = data[pos];
        data[pos] = data[pos + 1];
        data[pos + 1] = aux;

        this.save(data);
    }
}
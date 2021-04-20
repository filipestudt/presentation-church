function Controller(ip) {
    const socket = io('http://' + ip + ':' + RECEPTOR_PORT);
    const requestMaker = new RequestMaker(API_URL);
    var imagesArr = [];
    var pos = 0;

    this.send = (files) => {
        try {            
            requestMaker.gallery();   
        }
        catch(e) {
            alert(e)
        }
        
        this.setImages(files);   
    }

    this.setImages = (files) => {
        // Reset
        imagesArr = [];
        pos = 0;

        for (let file of files) {
            imagesArr.push(file.name)
        }
    }

    this.next = () => {
        if (pos + 1 < imagesArr.length) {
            pos++;            
            this.show();
        }        
    }

    this.prev = () => {
        if (pos - 1 >= 0) {
            pos--;
            this.show();
        }
    }

    this.select = (img) => {
        let arr = $('#thumbs img').toArray();
        let position = arr.indexOf(img);

        if (position >= 0 && position < imagesArr.length) {
            pos = position;
            this.show();
        }
    }

    this.show = () => {
        let arr = $('#thumbs img').toArray();
        let src = arr[pos].src;
        $('#main-img img').attr('src', src);

        $('#thumbs img').removeClass('active');
        arr[pos].classList.add('active');

        socket.emit('powerpoint-img', src);
    }

    this.close = () => {
        socket.emit('powerpoint-close');
    }
}
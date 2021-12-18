const fs = require('fs');
const path = require('path');

exports.get = async (req, res, next) => {
    try {
        var musicFolder = path.resolve(__dirname, '..', '..', 'music');

        var data = fs.readdirSync(musicFolder);
        res.status(200).send(data);
    }
    catch (e) {
        res.status(500).send({
            message: 'Falha ao processar sua requisição' + e
        });
    }
}

exports.post = async (req, res, next) => {
    try {
       var directories = req.body.dir;

        var musicFolder = path.resolve(__dirname, '..', '..', 'music');

        for (let dir of directories) {
            musicFolder = path.resolve(musicFolder, dir);
        }

        var data = fs.readdirSync(musicFolder);
        res.status(200).send(data);
    }
    catch (e) {
        res.status(500).send({
            message: 'Falha ao processar sua requisição' + e
        });
    }
}

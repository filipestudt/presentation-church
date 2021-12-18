const express = require('express');
const app = express();
const bodyparser = require('body-parser');

const presentationRoute = require('./routes/presentation-route');
const receptorRoute = require('./routes/receptor-route');
const bibleRoute = require('./routes/bible-route');
const settingsRoute = require('./routes/settings-route');
const musicRoute = require('./routes/music-route');

app.use(bodyparser.json({ limit: '10mb', extended: true }));
app.use(bodyparser.urlencoded({ limit: '10mb', extended: true }));

app.use(bodyparser.urlencoded({
    extended: false
}));


app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, x-access-token');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    next();
});

app.use('/music', express.static('music'));

app.use('/presentations', presentationRoute);
app.use('/receptor', receptorRoute);
app.use('/bible', bibleRoute);
app.use('/settings', settingsRoute);
app.use('/musics', musicRoute);

app.listen(SERVER_PORT, function () {
    console.log('Listening on port ' + SERVER_PORT + '!');
});
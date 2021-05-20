const DATABASE_NAME = 'settings';
const low = require('lowdb');
const fs = require('lowdb/adapters/FileSync');
const adapter = new fs('src/database/settings.json');
const lowbd = low(adapter);
const db = lowbd.get(DATABASE_NAME);

const settingsTemplate = {
    fontSize: 30,
    staticIp: null,    
}

exports.get = async() => {
    return db.value();
}

exports.save = async(data) => {
    var settings = await db.value();
    settings.fontSize = data.fontSize;
    settings.staticIp = data.staticIp;
    db.write();
}
const DATABASE_NAME = 'bible';
const low = require('lowdb');
const fs = require('lowdb/adapters/FileSync');
const adapter = new fs('src/database/aa.json');
const lowbd = low(adapter);
const db = lowbd.get(DATABASE_NAME);

exports.get = async(book, chapter) => {
    var response = await db.find({abbrev: book}).value();

    if (!response) {
        throw 'Livro não encontrado'
    }    

    return response.chapters[chapter - 1];
}

exports.getBooks = async() => {
    var abbrevs = await db.map('abbrev',).value();
    var names = await db.map('name').value();
    var result = [];
    for (let i=0, len=abbrevs.length; i<len; i++) {
        result.push({
            abbrev: abbrevs[i],
            name: names[i]
        })
    }
    return result;
}

exports.getChapters = async(book) => {
    var response = await db.find({abbrev: book}).value();

    if (!response) {
        throw 'Livro não encontrado'
    }    

    return {chapters: response.chapters.length};
}
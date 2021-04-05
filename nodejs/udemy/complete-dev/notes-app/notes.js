const fs = require('fs');
const log = require('./logger');
const chalk = require('chalk');
const getNotes = () => loadNotes();


const addNote = (title, body) => {
    const notes = loadNotes();
    const duplicateNote = notes.find((note) => note.title === title)

    if (!duplicateNote) {
        notes.push({
            title: title,
            body: body
        });
        saveNotes(notes);
        log.success('New note added!')
    }
    else {
        log.error('Note Title taken')
    }

}

const saveNotes = (notes) => {
    const dataJSON = JSON.stringify(notes)
    fs.writeFileSync('notes.json', dataJSON)
}

const loadNotes = () => {
    try {
        const dataBuffer = fs.readFileSync('notes.json');
        const dataJSON = dataBuffer.toString();
        return JSON.parse(dataJSON);
    }
    catch (e) {
        return [];
    }
}
const removeNote = (title) => {
    const notes = loadNotes();
    const notesToKeep = notes.filter((note) =>
        note.title !== title
    )

    if (notes.length > notesToKeep.length) {
        log.success('Removed note!');
        saveNotes(notesToKeep);
    }
    else
        log.error('Note not found')
}
const listNotes = () => {
    const notes = loadNotes()

    log.info("Your Notes:")

    notes.forEach(note => {
        log.data(note.title);
    })
}
const readNote = (title) => {
    const noteList = loadNotes();
    const selectedNote = noteList.find((note) => note.title === title);
    if (selectedNote) {
        console.log(chalk.inverse("Title:"), selectedNote.title);
        console.log(chalk.inverse("Body:"), selectedNote.body)
    }
    else {
        log.error('Note not found')
    }
}
module.exports = {
    addNote,
    removeNote,
    listNotes,
    readNote
}
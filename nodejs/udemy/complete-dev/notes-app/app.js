const validator = require('validator');
const chalk = require('chalk');
const yargs = require('yargs');
const notes = require('./notes.js');

// Application version
yargs.version("1.0.0");
// Add command
yargs.command({
    command: 'add',
    description: 'Add a new note',
    builder: {
        title: {
            describe: 'Note title',
            demandOption: true,
            type: 'string'
        },
        body: {
            descripb: 'Note contents',
            demandOption: true,
            type: 'string'
        }
    },
    handler: function (argv) {
        notes.addNote(argv.title, argv.body)
    }
});


// Remove command
yargs.command({
    command: 'remove',
    description: 'removes a note',
    builder: {
        title: {
            describe: 'Note title',
            demandOption: true,
            type: 'string'
        }
    },
    handler: (argv) => {
        notes.removeNote(argv.title);
    }
});

// list command
yargs.command({
    command: 'list',
    description: 'list all notes',
    handler: () =>
        notes.listNotes()
});

// read command
yargs.command({
    command: 'read',
    description: 'read a notes',
    builder: {
        title: {
            describe: "Note Title",
            demandOption: true,
            type: 'string'
        }
    },
    handler: (argv) => {
        notes.readNote(argv.title)
    }
});


yargs.parse();
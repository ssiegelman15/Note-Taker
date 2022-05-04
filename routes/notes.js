const notes = require('express').Router();
const {readFromFile, readAndAppend, writeToFile} = require('../helpers/fsUtils');
const uuid = require('../helpers/uuid');

// Create GET api for the notes in the database file
notes.get('/', (req, res) => {
  readFromFile('./db/db.json').then((notes) =>
    res.json(JSON.parse(notes)));
});

// Create post to take care of saving notes when the save icon is clicked
notes.post('/', (req, res) => {
  const { title, text } = req.body;
  // Check for a request.body to exist and if it does, save the note. Otherwise, return an error response
  if (req.body) {
    const note = {
      title,
      text,
      id: uuid(),
    };
    readAndAppend(note, './db/db.json');
    res.json("Congratulations, you've successfully saved your note!");
  } else {
    res.error("There was something wrong with your attempt to save a note");
  }
});

// Deletes note when clicking on the trash icon by rewriting the database with all the same notes except for the one whose icon was clicked
// by using the randomly assigned ID to make sure it's the only one deleted
notes.delete('/:id', (req, res) => {
  if (req.params.id) {
    readFromFile('./db/db.json').then((result) => {
      let parsedDb = JSON.parse(result);
      finalParsed = parsedDb.filter(result => result.id !== req.params.id);
      writeToFile('./db/db.json', finalParsed);
      res.json(finalParsed)
    })
  } else {
    res.json("Sorry, there was an issue deleting your note");
  }
});

module.exports = notes;
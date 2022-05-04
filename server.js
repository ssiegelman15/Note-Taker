// Set constants to required applications
const express = require('express');
const path = require('path');
// Redundent but code is working and if it ain't broke...
const fs = require('fs');
const util = require('util');
// Set helpers constants (copied from class activites) that should help
const uuid = require('./helpers/uuid');
const { readFromFile, readAndAppend, writeToFile } = require('./helpers/fsUtils');

// Set constant for db.json file
const db = require('./db/db.json');

// Set up port so it can be tested on Heroku
const PORT = process.env.PORT || 3001;

// Initialize express
const app = express();

// Set up Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

// Do I need to have an app.get for '/' or does the express.static take care of that?
// Create GET for initial page load without any additional path specified
app.get('/', (req, res) =>
  res.sendFile(path.join(__dirname, './public/index.html'))
);

// Return notes.html file at /notes path
app.get('/notes', (req, res) =>
  res.sendFile(path.join(__dirname, 'public/notes.html'))
);

// Create GET api for the notes in the database file
app.get('/api/notes', (req, res) => {
  readFromFile('./db/db.json').then((notes) =>
    res.json(JSON.parse(notes)));
});

// Create post to take care of saving notes when the save icon is clicked
app.post('/api/notes', (req, res) => {
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
app.delete('/api/notes/:id', (req, res) => {
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

// Return the index.html file for any path not defined in this file
app.get('*', (req, res) =>
  res.sendFile(path.join(__dirname, 'public/index.html'))
);

// Set up the Port used by Express
app.listen(PORT, () =>
  console.log(`App is listening at http://localhost:${PORT}`)
);
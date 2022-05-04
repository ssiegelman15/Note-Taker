// Set constants to required applications
const express = require('express');
const path = require('path');
const api = require('./routes/index');

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
app.use('/api', api);

// Do I need to have an app.get for '/' or does the express.static take care of that?
// Create GET for initial page load without any additional path specified
app.get('/', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/index.html'))
);

// Return notes.html file at /notes path
app.get('/notes', (req, res) => {
  res.sendFile(path.join(__dirname, '/public/notes.html'))
});

// Return the index.html file for any path not defined in this file
app.get('*', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/index.html'))
);

// Set up the Port used by Express
app.listen(PORT, () =>
  console.log(`App is listening at http://localhost:${PORT}`)
);
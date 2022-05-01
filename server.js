// Set constants to required applications
const express = require('express');
const path = require('path');
const fs = require('fs');
const util = require('util');

// Set constant for db.json file
const db = require('./db/db.json');

// Set up port so it can be tested on Heroku
const PORT = process.env.PORT || 3001;

const app = express();

// Set up Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

app.get('/notes', (req, res) =>
  res.sendFile(path.join(__dirname, 'public/notes.html'))
);

app.get('*', (req, res) =>
  res.sendFile(path.join(__dirname, 'public/index.html'))
);

app.listen(PORT, () =>
  console.log(`App is listening at http://localhost:${PORT}`)
);

// Set constants to required applications
const express = require('express');
const path = require('path');
const fs = require('fs');
const util = require('util');
// Set up port so it can be tested on Heroku
const PORT = process.env.PORT || 3001;

const app = express();
// Set up Middleware
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static('public'));
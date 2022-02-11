//___________________
//Dependencies
//___________________
const express = require('express');
const methodOverride  = require('method-override');
const mongoose = require ('mongoose');
const app = express ();
const db = mongoose.connection;
require('dotenv').config()
//___________________
//Port
//___________________
// Allow use of Heroku's port or your own local port, depending on the environment
const PORT = process.env.PORT || 3003;

//___________________
//Database
//___________________
// How to connect to the database either via heroku or locally
const MONGODB_URI = process.env.MONGODB_URI;

// Connect to Mongo &
// Fix Depreciation Warnings from Mongoose
// May or may not need these depending on your Mongoose version
mongoose.connect(MONGODB_URI);

// Error / success
db.on('error', (err) => console.log(err.message + ' is Mongod not running?'));
db.on('connected', () => console.log('mongo connected: ', MONGODB_URI));
db.on('disconnected', () => console.log('mongo disconnected'));

//___________________
//Middleware
//___________________

//use public folder for static assets
app.use(express.static('public'));

// populates req.body with parsed info from forms - if no data from forms will return an empty object {}
app.use(express.urlencoded({ extended: false }));// extended: false - does not allow nested objects in query strings
app.use(express.json());// returns middleware that only parses JSON - may or may not need it depending on your project

//use method override
app.use(methodOverride('_method'));// allow POST, PUT and DELETE from a form


//___________________
// Routes
//___________________
//localhost:3000
app.get('/' , (req, res) => {
  res.send('escuchando');
});

//GET New Student Route
app.get('/teacherspet/newstudent',(req, res) => {
  res.render('new.ejs', {
    tabTitle: 'Add Student'
  });
});

//POST New Student Route
app.post('/teacherspet/', (req, res) => {
// POSTING all standards to create student page, changing data to number
  // standard 1A
  if (req.body.oneA10 === 'on') {
    req.body.oneA10 = 10;
  } else if (req.body.oneA9 === 'on') {
    req.body.oneA9 = 9;
  } else if (req.body.oneA8 === 'on') {
    req.body.oneA8 = 8;
  } else if (req.body.oneA7 === 'on'){
    req.body.oneA7 = 7; }
    else {
      req.body.oneA6 = 6
    }
    // Standard 1B
  if  (req.body.oneB10 === 'on') {
    req.body.oneB10 = 10;
  } else if (req.body.oneB9 === 'on') {
    req.body.oneB9 = 9;
  } else if (req.body.oneB8 === 'on') {
    req.body.oneB8 = 8;
  } else if (req.body.oneB7 === 'on'){
    req.body.oneB7 = 7; }
    else {
      req.body.oneB6 = 6
    }
    // Standard 1C
  if  (req.body.oneC10 === 'on') {
    req.body.oneC10 = 10;
  } else if (req.body.oneC9 === 'on') {
    req.body.oneC9 = 9;
  } else if (req.body.oneC8 === 'on') {
    req.body.oneC8 = 8;
  } else if (req.body.oneC7 === 'on'){
    req.body.oneC7 = 7; }
    else {
      req.body.oneC6 = 6
    }
      // Standard 1D
  if  (req.body.oneD10 === 'on') {
    req.body.oneD10 = 10;
  } else if (req.body.oneD9 === 'on') {
    req.body.oneD9 = 9;
  } else if (req.body.oneD8 === 'on') {
    req.body.oneD8 = 8;
  } else if (req.body.oneD7 === 'on'){
    req.body.oneD7 = 7; }
    else {
      req.body.oneD6 = 6
    }
// Standard 2
  if  (req.body.two10 === 'on') {
    req.body.two10 = 10;
  } else if (req.body.two9 === 'on') {
    req.body.two9 = 9;
  } else if (req.body.two8 === 'on') {
    req.body.two8 = 8;
  } else if (req.body.two7 === 'on'){
    req.body.two7 = 7; }
    else {
      req.body.two6 = 6
    }
  //Standard 3
  if  (req.body.three10 === 'on') {
    req.body.three10 = 10;
  } else if (req.body.three9 === 'on') {
    req.body.three9 = 9;
  } else if (req.body.three8 === 'on') {
    req.body.three8 = 8;
  } else if (req.body.three7 === 'on'){
    req.body.three7 = 7; }
    else {
      req.body.three6 = 6
    }
  // Standard 4
  if  (req.body.four10 === 'on') {
    req.body.four10 = 10;
  } else if (req.body.four9 === 'on') {
    req.body.four9 = 9;
  } else if (req.body.four8 === 'on') {
    req.body.four8 = 8;
  } else if (req.body.four7 === 'on'){
    req.body.four7 = 7; }
    else {
      req.body.four6 = 6
    }
  // Standard 5
  if  (req.body.five10 === 'on') {
    req.body.five10 = 10;
  } else if (req.body.five9 === 'on') {
    req.body.five9 = 9;
  } else if (req.body.five8 === 'on') {
    req.body.five8 = 8;
  } else if (req.body.five7 === 'on'){
    req.body.five7 = 7; }
    else {
      req.body.five6 = 6
    }
  // Standard 6
  if  (req.body.six10 === 'on') {
    req.body.six10 = 10;
  } else if (req.body.six9 === 'on') {
    req.body.six9 = 9;
  } else if (req.body.six8 === 'on') {
    req.body.six8 = 8;
  } else if (req.body.six7 === 'on'){
    req.body.six7 = 7; }
    else {
      req.body.six6 = 6
    }
  res.send(req.body);
})
//___________________
//Listener
//___________________
app.listen(PORT, () => console.log( 'escuchandote', PORT));

'use strict';

//___________________
//Dependencies
//___________________
const express = require('express');
const methodOverride  = require('method-override');
const mongoose = require ('mongoose');
const app = express ();
const db = mongoose.connection;
const Student = require("./models/students.js");
const User = require("./models/user.js");
const mongooseDateFormat = require('mongoose-date-format');
require('dotenv').config();


//___________________
//Port
//___________________
// Allow use of Heroku's port or your own local port, depending on the environment
const PORT = process.env.PORT || '8080';
app.set("port", PORT);
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

// app.use('/classes', classesController);

//___________________
// Routes
//___________________
//localhost:3000
// app.get('/' , (req, res) => {
//   res.send('escuchando');
// });

//Render main page
app.get('/' , (req, res) => {
  res.render('teacherspet.ejs',
{
  tabTitle: `Teacher's Pet`
});
});

// Render new student/create page
app.get('/newstudent', (req, res) => {
  res.render(
    'newstudent.ejs',
    {
    tabTitle: 'Add Student'
  });
});

// Render Index/View All Pg.
app.get('/classlist', (req, res) => {
  Student.find({}, (error, allStudents) => {
    res.render(
      'index.ejs',
      {
      tabTitle: `Teacher's Pet`,
      students: allStudents,
    });
  });
});

//render rubric details
app.get('/rubric' , (req, res) => {
  res.render('rubricview.ejs',
{
  tabTitle: `View Our Rubrics`
});
});

app.get('/speaking' , (req, res) => {
  res.render('speaking.ejs',
{
  tabTitle: `Speaking Rubric`
});
});

app.get('/listening' , (req, res) => {
  res.render('listening.ejs',
{
  tabTitle: `Listening Rubric`
});
});

app.get('/thankyou', (req, res) => {
  res.render('aboutAfter.ejs', {
    tabTitle: 'Thank you!'
  })
})

app.get('/about', (req, res) => {
  res.render('about.ejs', {
    tabTitle: `About Teacher's Pet`
  })
})

// student info Route
app.get('/:id', (req, res) => {
  Student.findById(req.params.id, (err, foundStudent) => {
    res.render(
      "show.ejs",
    {
      student: foundStudent,
      tabTitle: "Student View"
    });
  });
});


// Edit route
app.get('/:id/edit', (req, res) => {
  Student.findById(req.params.id, (err, foundStudent) => {
    res.render(
      'edit.ejs',
      {
        student: foundStudent,
        tabTitle: "Edit Student Info"
      });
  });
});

//POST New Student Route
app.post('/', (req, res) => {
  Student.create(req.body, (error, createdStudent) => {
    res.redirect("/classlist");
  });
});

//Post route for form on about page
app.post('/about', (req, res) => {
  User.create(req.body, (error, createdUser) => {
    res.redirect("/thankyou");
  });
});

app.put('/:id', (req, res) => {
  Student.findByIdAndUpdate(req.params.id, req.body, {new:true}, (err, updatedModel) => {
    res.redirect('/classlist');
  });
});

app.delete('/:id', (req, res) => {
  Student.findByIdAndRemove(req.params.id, (err, data) => {
    res.redirect('/classlist');
  });
});


//___________________
//Listener
//___________________
app.listen(PORT, () => console.log( 'escuchandote', PORT));

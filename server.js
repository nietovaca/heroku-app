//___________________
//Dependencies
//___________________
const express = require('express');
const methodOverride  = require('method-override');
const mongoose = require ('mongoose');
const app = express ();
const db = mongoose.connection;
const Student = require("./models/students.js");
const bodyParser = require('body-parser')
require('dotenv').config();

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

//GET New class Route
// app.get('/teacherspet/newclass',(req, res) => {
//   res.render('newclass.ejs', {
//     tabTitle: 'Add Class'
//   });
// });

// Render new student/create page
app.get('/teacherspet/newstudent', (req, res) => {
  res.render('newstudent.ejs', {
    tabTitle: 'Add Student'
  });
});

// Render Index/View All Pg.
app.get('/teacherspet', (req, res) => {
  Student.find({}, (error, allStudents) => {
    res.render('index.ejs', {
      tabTitle: `Teacher's Pet`,
      students: allStudents
    });
  });
});


//POST New Student Route
app.post('/teacherspet/', (req, res) => {
  Student.create(req.body, (error, createdStudent) => {
    res.redirect("/teacherspet/newstudent");
  });
});

// this should update student on index page when participation is checked
// app.put('/teacherspet', (req, res) => {
//   if(req.body.participation === 'on'){
//     req.body.participation = true;
//   } else {
//     req.body.participation = false;
//   }
//   Student.findByIdAndUpdate(req.params.id, req.body, {new:true}, (err, updatedModel) => {
//     res.redirect("/teacherspet");
//   })
// })

// app.post('/teacherspet/', (req, res) => {
//   Class.create(req.body, (error, createdStudent) => {
//     res.redirect("/teacherspet")
//   });
// });



//___________________
//Listener
//___________________
app.listen(PORT, () => console.log( 'escuchandote', PORT));

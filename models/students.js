'use strict';
const mongoose = require('mongoose');
const mongooseDateFormat = require('mongoose-date-format');

// CHILD
const studentSchema = new mongoose.Schema({
  name: {type: String, require: true},
  notes: String,
  project: String,
  participation: String
},
  {timestamps: true});

const studentCollection = mongoose.model('Student', studentSchema);
module.exports = studentCollection;

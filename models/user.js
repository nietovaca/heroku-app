'use strict';
const mongoose = require('mongoose');
const mongooseDateFormat = require('mongoose-date-format');

const userSchema = new mongoose.Schema({
  name: {type: String, unique: true, require: true},
  email: {type: String, require: true},
  message: String
}, {timestamps: true});

const userCollection = mongoose.model('User', userSchema);
module.exports = userCollection; 

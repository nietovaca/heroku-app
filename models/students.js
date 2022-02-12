const mongoose = require('mongoose');

// CHILD
const studentSchema = new mongoose.Schema({
  name: {type: String, require: true},
  notes: String,
  project: String,
  participation: {type: Boolean, timestamps: true}
});

// PARENT
// const classSchema = new mongoose.Schema({
//   class: String,
//   students: {studentSchema}
// });

// export
// const classCollection = mongoose.model('Class', classSchema);
// module.exports = classCollection;

const studentCollection = mongoose.model('Student', studentSchema);
module.exports = studentCollection; 

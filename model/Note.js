const mongoose = require('mongoose');
const NoteSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Title is blank.'],
    trim: true,
    maxlength: [50, 'Title is more than 50 char.'],
  },
  note: {
    type: String,
    required: [true, 'There is no notes to add.'],
    trim: true,
    maxlength: [1000, 'Note exceeded more than 1000 character.'],
  },
  userId: {
    type: String,
    required: [true, 'User id is not given for specific note'],
  },
  num: Number,
});

module.exports = mongoose.model('Note', NoteSchema);

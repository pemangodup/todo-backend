const mongoose = require('mongoose');
const NoteSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Title is not given'],
    trim: true,
    maxlength: [50, 'Title is more than 50 char'],
  },
  body: {
    type: String,
    required: [true, 'There is no notes to add.'],
    trim: true,
    maxlength: [1000, 'Note exceeded more than 1000 character.'],
  },
});

module.exports = mongoose.model('Note', NoteSchema);

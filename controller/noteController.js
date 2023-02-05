const Note = require('../model/Note');
const notes = {
  // @desc     Add Notes
  // @route    POST /todo/v1/api/
  // @access   Private
  addNote: (req, res, next) => {
    console.log('Addnote');
    const { title, note } = req.body;
    if (!title || !note) {
      console('Inside here');
      return new Error('Title of note field is empty');
    }
  },

  // @desc     Get All Notes
  // @route    GET /todo/v1/api/getNotes
  // @access   Private
  getNotes: (req, res, next) => {
    console.log('Get alll notes');
  },

  // @desc     Get Single Note
  // @route    POST /todo/v1/api/:id
  // @access   Private
  getNote: (req, res, next) => {
    console.log('Get single note');
  },

  // @desc     Update Note
  // @route    PUT /todo/v1/api/:id
  // @access   Private
  updateNote: (req, res, next) => {
    console.log('Update Note');
  },

  // @desc     Delete Note
  // @route    DELETE /todo/v1/api/:id
  // @access   Private
  deleteNote: (req, res, next) => {
    console.log('Delete note');
  },
};

module.exports = notes;

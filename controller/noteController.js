const Note = require('../model/Note');
const ErrorResponse = require('../Utils/errorResponse');
const errorResponse = require('../Utils/errorResponse');
const jsonResponse = require('../Utils/jsonResponse');

const notes = {
  // @desc     Add Note
  // @route    POST /todo/v1/api/note
  // @access   Private
  addNote: async (req, res, next) => {
    req.body.userId = req.user._id;
    try {
      const noteCreated = await Note.create(req.body);
      jsonResponse(res, 200, true, 'Note Created', noteCreated);
    } catch (error) {
      console.log('Am i here');
      return next(new errorResponse(error.message, 404));
    }
  },

  // @desc     Get All Notes
  // @route    GET /todo/v1/api/note
  // @access   Private
  getNotes: async (req, res, next) => {
    const userId = req.user._id;
    console.log(userId);
    try {
      const notes = await Note.find({ userId });
      jsonResponse(res, 200, true, 'All notes.', notes);
    } catch (error) {
      return next(new ErrorResponse(error.message, 404));
    }
  },

  // @desc     Get Single Note
  // @route    POST /todo/v1/api/note/:id
  // @access   Private
  getNote: async (req, res, next) => {
    const userId = req.user._id;
    const id = req.params.id;
    try {
      const note = await Note.findOne({ _id: id, userId });
      console.log(note);
      if (!note) {
        return jsonErrorResponse(res, 'Could not find note.');
      }
      jsonResponse(res, 200, true, 'Single note', note);
    } catch (error) {
      return next(new ErrorResponse(error.message, 404));
    }
  },

  // @desc     Update Note
  // @route    PUT /todo/v1/api/note/:id
  // @access   Private
  updateNote: async (req, res, next) => {
    const id = req.params.id;
    const userId = req.user._id;
    try {
      const note = await Note.findOneAndUpdate({ _id: id, userId }, req.body, {
        new: true,
        runValidators: true,
      });
      if (note === null) {
        return jsonErrorResponse(res, 'Could not update.');
      }
      jsonResponse(res, 200, true, 'Got updated', note);
    } catch (error) {
      next(new ErrorResponse(error.message, 400));
    }
  },

  // @desc     Delete Note
  // @route    DELETE /todo/v1/api/note/:id
  // @access   Private
  deleteNote: async (req, res, next) => {
    const id = req.params.id;
    const userId = req.user._id;

    try {
      const note = await Note.findOneAndDelete({ _id: id, userId });
      if (!note) {
        return jsonErrorResponse(res, 'Could not delete.');
      }
      jsonResponse(res, 200, true, 'Got deleted', '');
    } catch (error) {
      next(new ErrorResponse(error.message, 400));
    }
  },
};

module.exports = notes;

const jsonErrorResponse = (res, message) => {
  return jsonResponse(res, 404, false, message, 'No data');
};

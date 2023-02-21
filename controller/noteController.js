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
      jsonResponse(res, 200, true, 'Note Created', 1, noteCreated);
    } catch (error) {
      return next(new errorResponse(error.message, 404));
    }
  },

  // @desc     Get All Notes
  // @route    GET /todo/v1/api/note
  // @access   Private
  getNotes: async (req, res, next) => {
    let query;
    const queryStr = { ...req.query };
    const removeFields = ['select', 'sort', 'page', 'limit'];
    removeFields.forEach((param) => {
      delete queryStr[param];
    });
    // Pagination
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    query = await Note.find(queryStr).skip(startIndex).limit(limit);
    try {
      // // Selecting
      // if (req.query.select) {
      //   const fields = req.query.select.split(',').join(' ');
      //   query = await query.select(fields);
      // }
      // // Sorting
      // if (req.query.sort) {
      //   const sortBy = req.query.sortt.split(',').join(' ');
      //   query = await query.sort(sortBy);
      // }
      const total = query.length;

      query = jsonResponse(res, 200, true, 'All notes.', total, query);
    } catch (error) {
      console.log('I reached here three');
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

// Repeated json response
const jsonErrorResponse = (res, message) => {
  return jsonResponse(res, 404, false, message, 'No data');
};

const express = require('express');
const router = express.Router();
const {
  addNote,
  getNote,
  getNotes,
  deleteNote,
  updateNote,
} = require('../controller/noteController');

router.route('/').post(addNote);
router.route('/').get(getNotes);
router.route('/:id').get(getNote).delete(deleteNote).put(updateNote);

module.exports = router;

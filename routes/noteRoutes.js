const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth');
const {
  addNote,
  getNote,
  getNotes,
  deleteNote,
  updateNote,
} = require('../controller/noteController');

router.route('/').post(protect, addNote);
router.route('/').get(protect, getNotes);
router
  .route('/:id')
  .get(protect, getNote)
  .delete(protect, protect, deleteNote)
  .put(protect, updateNote);

module.exports = router;

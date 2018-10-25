const express = require('express');

const router = express.Router();
const { deleteEvents } = require('../controllers/events');
// Route related to delete events
router.delete('/', deleteEvents);

module.exports = router;

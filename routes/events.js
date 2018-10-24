const express = require('express');

const router = express.Router();
const {
  getAllEvents, addEvent, getByActor, eraseEvents,
} = require('../controllers/events');

// Routes related to event
router.get('/', getAllEvents);
router.post('/', addEvent);
router.delete('/', eraseEvents);
router.get('/actors/:id', getByActor);

module.exports = router;

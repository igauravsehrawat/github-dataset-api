const express = require('express');
const { getAllActors, getStreak, updateActor } = require('../controllers/actors');

const router = express.Router();

// Routes related to actor.
router.get('/', getAllActors);
router.put('/', updateActor);
router.put('/streak', getStreak);

module.exports = router;

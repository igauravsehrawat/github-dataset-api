const express = require('express');
const { getAllActors, getStreak, updateActor } = require('../controllers/actors');

const router = express.Router();

// Routes related to actor.
router.get('/actors', getAllActors);
router.put('/actors', updateActor);
router.put('/actors/streak', getStreak);

module.exports = router;

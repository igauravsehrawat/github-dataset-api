const getAllActors = require('./getAllActors');
const updateActor = require('./updateActor');
const getStreak = require('./getStreak');
const { expressErrorHandler } = require('../../services/errorHandler');

module.exports = {
  updateActor: expressErrorHandler(updateActor),
  getAllActors: expressErrorHandler(getAllActors),
  getStreak: expressErrorHandler(getStreak),
};

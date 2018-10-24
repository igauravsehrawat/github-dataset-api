const addEvent = require('./addEvent');
const getAllEvents = require('./getAllEvents');
const getByActor = require('./getByActor');
const eraseEvents = require('./eraseEvents');
const { expressErrorHandler } = require('../../services/errorHandler');

module.exports = {
  getAllEvents: expressErrorHandler(getAllEvents),
  addEvent: expressErrorHandler(addEvent),
  getByActor: expressErrorHandler(getByActor),
  eraseEvents: expressErrorHandler(eraseEvents),
};

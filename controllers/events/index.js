const addEvent = require('./addEvent');
const getAllEvents = require('./getAllEvents');
const getByActor = require('./getByActor');
const deleteEvents = require('./deleteEvents');
const { expressErrorHandler } = require('../../services/errorHandler');

module.exports = {
  getAllEvents: expressErrorHandler(getAllEvents),
  addEvent: expressErrorHandler(addEvent),
  getByActor: expressErrorHandler(getByActor),
  deleteEvents: expressErrorHandler(deleteEvents),
};

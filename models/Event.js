const Sequelize = require('sequelize');
const sequelize = require('../services/sqlite');
const Actor = require('./Actor');
const Repo = require('./Repo');

const Event = sequelize.define('event', {
  id: Sequelize.NUMBER,
  type: Sequelize.STRING,
  created_at: Sequelize.DATE,
});

Event.belongsTo(Actor);
Event.belongsTo(Repo);

module.exports = Event;

const Sequelize = require('sequelize');
const sequelize = require('../services/sqlite');

const Actor = sequelize.define('actor', {
  id: Sequelize.NUMBER,
  login: Sequelize.STRING,
  avatar_url: Sequelize.STRING,
});

module.exports = Actor;

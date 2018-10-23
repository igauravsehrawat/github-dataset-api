const Sequelize = require('sequelize');
const sequelize = require('../services/sqlite');

const Repo = sequelize.define('repo', {
  id: Sequelize.NUMBER,
  name: Sequelize.STRING,
  url: Sequelize.STRING,
});

module.exports = Repo;

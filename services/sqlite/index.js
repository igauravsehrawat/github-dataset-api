const Sequelize = require('sequelize');

const sequelize = new Sequelize('github-db', 'dev-user', 'dev-password', {
  host: 'localhost',
  dialect: 'sqlite',
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
  storage: '../../data/db/database.sqlite',
  operatorsAliases: false,
});

sequelize
  .authenticate()
  .then(() => {
    console.info('Database connection established');
  })
  .catch((err) => {
    console.error('Unable to connect to database', err);
  });

module.exports = sequelize;

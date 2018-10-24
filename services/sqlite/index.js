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
  storage: './db/database.sqlite3',
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

sequelize.sync()
  .then(() => {
    console.info('Tables created successfully.');
  })
  .catch((err) => {
    console.info('Error', err);
  });
module.exports = sequelize;

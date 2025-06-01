const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('zephyr_db', 'root', 'kaskroutHARGMA213676*', {
  host: 'localhost',
  dialect: 'mysql',
});

sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch((error) => {
    console.error('Unable to connect to the database:', error);
  });
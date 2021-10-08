const Sequelize = require('sequelize');
const dotenv = require('dotenv');

dotenv.config();

console.log("process.env.DATABASE_URL:" + process.env.DATABASE_URL);

module.exports =  new Sequelize
  ("postgres://postgres:123456@localhost/newlabelreleases",
  // process.env.DATABASE,
  // process.env.DATABASE_USER,
  // process.env.DATABASE_PASSWORD,
  {
  dialect: 'postgres',
  operatorsAliases: false,

  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  },
});
// const Sequelize = require("sequelize");
import Sequelize from "sequelize";
const db = require("../config/database");

// define the database table name
const Labels = db.define("labels", {
  emailAddress: {
    type: Sequelize.STRING,
  },
  labelName: {
    type: Sequelize.STRING,
  },
});

Labels.sync().then(() => {
  console.log("table created");
});
module.exports = Labels;

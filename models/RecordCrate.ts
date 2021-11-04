const Sequelize = require("sequelize");
// const db = require("../config/database");
import db from "../config/database";

// define the database table name
const RecordCrate = db.define("recordCrate", {
  emailAddress: {
    type: Sequelize.STRING,
  },
  artists: {
    type: Sequelize.STRING,
  },
  releaseName: {
    type: Sequelize.STRING,
  },
  trackName: {
    type: Sequelize.STRING,
  },
});

RecordCrate.sync().then(() => {
  console.log("table created");
});
module.exports = RecordCrate;

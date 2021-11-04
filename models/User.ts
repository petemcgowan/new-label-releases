const Sequelize = require("sequelize");
import db from "../config/database";
// const db = require('../config/database');

// define the database table name
const User = db.define("user", {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true,
  },
  registerDate: {
    type: Sequelize.DATE,
    allowNull: false,
    defaultValue: Sequelize.NOW,
    unique: true,
  },
  password: {
    type: Sequelize.STRING,
  },
});

User.sync().then(() => {
  console.log("User table created");
});
module.exports = User;

export default User;

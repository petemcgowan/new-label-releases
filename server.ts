const path = require("path");
const express = require("express");
//const dotenv = require("dotenv");
const colors = require("colors");
const morgan = require("morgan");
// const cors = require('cors');
// import Sequelize = require("sequelize");

// const sequelizer = require("./config/database");
const db = require("./config/database");
// import Sequelize from "sequelize"
// import { sequelizer } from "./config/database";
//dotenv.config({ path: "./config/config.env" });

// const eraseDatabaseOnSync = true;

// const startDatabase = async () => {
//   await sequelizer /*db*/
//     .authenticate()
//     .then(() => {
//       console.log("Database connected...");
//     })
//     .catch((err: any) => {
//       console.log("Error: " + err);
//       throw err;
//     });
// };
// startDatabase();

const eraseDatabaseOnSync = true;
db.authenticate()
  .then(() => {
    console.log("Database connected...");
  })
  .catch((err: any) => console.log("Error: " + err));

console.log("test output");

const recordCrates = require("./routes/recordCrates");
const users = require("./routes/users");
const labels = require("./routes/labels");
const auth = require("./routes/auth");

const app = express();
// app.use(cors());
app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

// const sequelize = ("postgres://postgres:123456@localhost/newlabelreleases",
//   {
//     dialect: 'postgres',
//   }
// );

app.use("/recordCrates", recordCrates);
app.use("/users", users);
app.use("/labels", labels);
app.use("/auth", auth);

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));

  app.get("*", (req: any, res: { sendFile: (arg0: any) => any }) =>
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"))
  );
}

const PORT = process.env.PORT || 5000;

app.listen(
  PORT,
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port ${PORT}` /*.yellow.bold*/
  )
);

const express = require("express");
const router = express.Router();
const db = require("../config/database");
const RecordCrate = require("../models/RecordCrate");
const Sequelize = require("sequelize");
const Op = Sequelize.Op;

// Get record crate list
router.post("/", (req, res) => {
  console.log("recordCrate get router req.body" + JSON.stringify(req.body));
  let { emailAddress } = req.body;

  console.log("RecordCrates find all about to be called");
  RecordCrate.findAll()
    .then((recordCrates) => {
      console.log("recordCrates:" + JSON.stringify(recordCrates));
      return res.status(200).json({
        success: true,
        count: recordCrates.length,
        data: recordCrates,
      });
    })
    .catch((err) => {
      console.log("err" + err);
      return res.status(500).json({
        success: false,
        error: "Server Error",
      });
    });
});

// router.get('/add', (req, res) => {
//   return res.status(201).json({
//     success: true,
//     data: newFilmObj
//   });
// res.render('add')
// });

// Add a record crate item
router.post("/add", (req, res, next) => {
  console.log("add router started");

  let { emailAddress, artists, releaseName, trackName } = req.body;
  console.log("add router req.body" + JSON.stringify(req.body));
  let errors = [];

  // Validate Fields
  if (!emailAddress) {
    errors.push({ text: "Please add a email address" });
  }
  if (!artists) {
    errors.push({ text: "Please add an artist" });
  }
  if (!releaseName) {
    errors.push({ text: "Please add a release name" });
  }
  if (!trackName) {
    errors.push({ text: "Please add a track name" });
  }

  // Check for errors
  if (errors.length > 0) {
    console.log("add router there are errors:" + JSON.stringify(errors));
    // Pete TODO get the errors specified back to the user (but don't use render)
    return res.status(500).json({
      success: false,
      error: "Server Error",
    });
    // res.render('add', {
    //   errors,
    //   emailAddress,
    //   artists,
    //   releaseName
    //   trackName
    // });
  } else {
    console.log("Before insert");
    // Insert into table
    RecordCrate.create({
      emailAddress,
      artists,
      releaseName,
      trackName,
    })
      .then((recordCrate) => {
        console.log("RecordCrate created");
        return res.status(201).json({
          success: true,
          data: recordCrate,
        });
      })
      .catch((err) => {
        console.log("err:" + err);
        return res.status(500).json({
          success: false,
          error: "Server Error",
        });
      });
  }
});

// Search for record crate items based on email address (searchTerm)
router.post("/search", (req, res) => {
  console.log("search RCRouter req.body" + JSON.stringify(req.body));
  console.log("search RCRouter req.query" + JSON.stringify(req.query));

  // let { searchTerm } = req.query;
  // let { searchTerm } = req.query;
  let { emailAddress } = req.body;

  RecordCrate.findAll({
    where: { emailAddress: { [Op.like]: "%" + emailAddress + "%" } },
  })
    .then((recordCrates) => {
      console.log("recordCrates:" + JSON.stringify(recordCrates));
      return res.status(200).json({
        success: true,
        count: recordCrates.length,
        data: recordCrates,
      });
    })
    .catch((err) => {
      console.log("err:" + err);
      return res.status(500).json({
        success: false,
        error: "Server Error",
      });
    });
});

// @desc    Delete specific record crate
// @route   DELETE /recordCrates/:id
// @access  Public
router.delete("/:id", async (req, res, next) => {
  try {
    console.log("deleteRecordCrate, req.body:" + JSON.stringify(req.body));
    console.log(
      "deleteRecordCrate, (json)req.params.id:" + JSON.stringify(req.params.id)
    );
    console.log("deleteRecordCrate, req.params.id:" + req.params.id);

    const crateItem = await RecordCrate.findByPk(req.params.id);

    if (!crateItem) {
      return res.status(404).json({
        success: false,
        error: "No crateItem found",
      });
    }

    await crateItem.destroy();

    return res.status(200).json({
      success: true,
      data: {},
    });
  } catch (err) {
    console.log("deleteRecordCrate:" + err);
    return res.status(500).json({
      success: false,
      error: "Server Error",
    });
  }
});

module.exports = router;

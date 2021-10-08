const express = require("express");
const router = express.Router();
const db = require("../config/database");
const Labels = require("../models/Labels");
const Sequelize = require("sequelize");
const Op = Sequelize.Op;

// Get label list
router.post("/", (req, res) => {
  console.log("label get router req.body" + JSON.stringify(req.body));
  let { emailAddress } = req.body;

  console.log("Labels find all about to be called");
  Labels.findAll()
    .then((labels) => {
      console.log("labels:" + JSON.stringify(labels));
      return res.status(200).json({
        success: true,
        count: labels.length,
        data: labels,
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

// Add a label
router.post("/add", (req, res, next) => {
  console.log("add router started");

  let { emailAddress, labelName } = req.body;
  console.log("add router req.body" + JSON.stringify(req.body));
  let errors = [];

  // Validate Fields
  if (!emailAddress) {
    errors.push({ text: "Please add a email address" });
  }

  if (!labelName) {
    errors.push({ text: "Please add a label name" });
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
    //   labelName
    // });
  } else {
    console.log("Before insert");
    // Insert into table
    Labels.create({
      emailAddress,
      labelName,
    })
      .then((labels) => {
        console.log("Labels created");
        return res.status(201).json({
          success: true,
          data: labels,
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

// Search for labels based on email address (searchTerm)
router.post("/search", (req, res) => {
  console.log("search labelRouter req.body" + JSON.stringify(req.body));
  console.log("search labelRouter req.query" + JSON.stringify(req.query));

  let { emailAddress } = req.body;

  Labels.findAll({
    where: { emailAddress: { [Op.like]: "%" + emailAddress + "%" } },
  })
    .then((labels) => {
      console.log("labels:" + JSON.stringify(labels));
      return res.status(200).json({
        success: true,
        count: labels.length,
        data: labels,
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

// @desc    Delete specific label
// @route   DELETE /labels/:id
// @access  Public
router.delete("/:id", async (req, res, next) => {
  try {
    console.log("deleteLabels, req.body:" + JSON.stringify(req.body));
    console.log(
      "deleteLabels, (json)req.params.id:" + JSON.stringify(req.params.id)
    );
    console.log("deleteLabels, req.params.id:" + req.params.id);

    const label = await Labels.findByPk(req.params.id);

    if (!label) {
      return res.status(404).json({
        success: false,
        error: "No label found",
      });
    }

    await label.destroy();

    return res.status(200).json({
      success: true,
      data: {},
    });
  } catch (err) {
    console.log("deleteLabel:" + err);
    return res.status(500).json({
      success: false,
      error: "Server Error",
    });
  }
});

module.exports = router;

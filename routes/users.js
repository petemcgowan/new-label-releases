const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const config = require('config');
const jwt = require('jsonwebtoken');

// const db = require('../config/database');
const User = require('../models/User');
// const Sequelize = require('sequelize');
// const Op = Sequelize.Op;


// @route   POST users
// @desc    Register new user
// @access  Public
router.post('/', (req, res) => {
  const { name, email, password } = req.body;

  console.log("routes/users, post user called")
  console.log("name, email, password" + name + email + password);
  console.log("req.body" + JSON.stringify(req.body));

  // Simple validation
  if(!name || !email || !password) {
    console.log ("route, user, fields not valid:" + JSON.stringify(user));
    return res.status(400).json({
      // success: false,
      msg: 'Please enter all fields' });
  }

  // Check for existing user
  try {
    User.findOne({ where: { email: email } })
      .then(user => {
        if(user) {
          console.log ("route, user already exists:" + JSON.stringify(user));
          return res.status(400).json({
            // success: false,
            msg: 'User already exists'
          })
        };

        const newUser = new User({
          name,
          email,
          password
        });

        // Create salt & hash
        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err)
              throw err;
            newUser.password = hash;
            User.create({ name: newUser.name, email: newUser.email, password: newUser.password })
              .then(user => {
                console.log ("route, user:user generated:");
                jwt.sign(
                  { id: user.id },
                  config.get('jwtSecret'),
                  { expiresIn: 3600 },
                  (err, token) => {
                    if(err) {
                      console.log ("router user, err:" + err);
                      throw err;
                    }
                    // User is successfull created, tell the user
                    res.json({
                      token,
                      user: {
                        id: user.id,
                        name: user.name,
                        email: user.email
                      }
                    });
                  }
                )
              });
          })
        })  // bcrypt
      }) // user
    }
    catch (err) {
      console.log("users, register user error:" + err);
      return res.status(500).json({
        success: false,
        error: 'Server Error'
      });
    }
});

module.exports = router;

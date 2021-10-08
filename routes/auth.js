const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const config = require('config');
const jwt = require('jsonwebtoken');
const auth = require('../middleware/auth');


// User Model
const User = require('../models/User');

// @route   GET auth/user
// @desc    Get user data
// @access  Private
router.get('/user', auth, (req, res) => {
  console.log("routes/auth/user, get user called");
  console.log("req.body:" + JSON.stringify(req.body));
  User.findByPk(req.user.id, {attributes: ['password']})
    // .select('-password')
    .then(user => res.json(user));
  console.log("routes/auth, get user, after findById");
});

module.exports = router;


// @route   POST auth
// @desc    Auth user
// @access  Public
router.post('/', (req, res) => {
  const { email, password } = req.body;

  console.log("routes/auth, post auth user called");
  console.log("email, password" + email + password);
  console.log("req.body" + JSON.stringify(req.body));

  // Simple validation
  if(!email || !password) {
    return res.status(400).json({
      success: false,
      msg: 'Please enter all fields'
    });
  }

  // Check for existing user
  User.findOne({ where: { email: email } })
    .then(user => {
      if(!user) return res.status(400).json({
        success: false,
        msg: 'User Does not exist'
      });

      // Validate password
      bcrypt.compare(password, user.password)
        .then(isMatch => {
          if(!isMatch) return res.status(400).json({
            success: false,
            msg: 'Invalid credentials' });

          jwt.sign(
            { id: user.id },
            config.get('jwtSecret'),
            { expiresIn: 3600 },
            (err, token) => {
              if(err) throw err;
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
        })
    })
});


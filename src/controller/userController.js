const jwt = require('jsonwebtoken');

// import user model
const User = require('../models/userModel');

// user signup
exports.signup = (req, res) => {
  User.findOne({
    email: req.body.email,
  }).exec((error, user) => {
    if (user) {
      return res.status(400).json({
        status: 0,
        message: "User email already exist",
      });
    }
    const { firstName, lastName, email, password } = req.body;
    const _user = new User({
      firstName,
      lastName,
      email,
      password,
      userName: Math.random().toString(),
    });

    _user.save((err, data) => {
      if (err) {
        return res.status(400).json({
          status: 0,
          message: "Something  went wrong",
          error: err,
        });
      }
      if (data) {
        return res.status(201).json({
          status: 1,
          message: "User created successfully",
          user: data,
        });
      }
    });
  });
};

// user sign in
exports.signin = (req, res) => {
  User.findOne({ email: req.body.email }).exec((err, user) => {
    if (err) {
      return res.status(500).json({
        staus: 0,
        message: "Database connection error",
      });
    }
    if (user) {
      if (user.authenticate(req.body.password)) {
        const token = jwt.sign(
          { _id: user._id, role: user.role },
          process.env.JWT_SECRET_KEY,
          {
            expiresIn: "1h",
          }
        );
        const { _id, firstName, lastName, email, role, fullName } = user;
        return res.status(200).json({
          token,
          user: {
            _id,
            firstName,
            lastName,
            email,
            role,
            fullName,
          },
        });
      } else {
        return res.status(400).json({
          status: 0,
          message: "Invalid password",
        });
      }
    } else {
      return res.status(400).json({
        status: 0,
        message: "Something went wrong",
      });
    }
  });
};

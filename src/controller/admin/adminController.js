// import user model
const jwt = require('jsonwebtoken');
const User = require('../../models/userModel');

// cosntants error messages
const {
  mongodbError,
  invalidAdminPassword,
  invalidAdminMail,
  signoutSuccessfully,
} = require('../../constantErrorMessages/errorMessages');

// user signup
exports.adminSignup = (req, res) => {
  User.findOne({
    email: req.body.email,
  }).exec((error, user) => {
    if (user) {
      return res.status(400).json({
        status: 0,
        message: 'Admin email already exist',
      });
    }
    const { firstName, lastName, email, password } = req.body;
    const adminUser = new User({
      firstName,
      lastName,
      email,
      password,
      userName: Math.random().toString(),
      role: 'admin',
    });

    adminUser.save((err, data) => {
      if (err) {
        return res.status(400).json({
          status: 0,
          message: 'Something  went wrong',
          error: err,
        });
      }
      if (data) {
        return res.status(201).json({
          status: 1,
          message: 'Admin created successfully',
          user: data,
        });
      }
    });
  });
};

// user sign in
exports.adminSignin = (req, res) => {
  User.findOne({ email: req.body.email }).exec((err, user) => {
    if (err) {
      return res.status(500).json({
        staus: 0,
        message: mongodbError,
      });
    }
    if (user) {
      if (user.authenticate(req.body.password) && user.role === 'admin') {
        const token = jwt.sign(
          { _id: user._id, role: user.role },
          process.env.JWT_SECRET_KEY,
          {
            expiresIn: '1h',
          },
        );
        const { _id, firstName, lastName, email, role, fullName } = user;
        res.cookie('token', token, { expiresIn: '1h' });
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
      }
      return res.status(400).json({
        status: 0,
        message: invalidAdminPassword,
      });
    }
    return res.status(400).json({
      status: 0,
      message: invalidAdminMail,
    });
  });
};

// admin signout
exports.signout = (req, res) => {
  res.clearCookie('token');
  res.status(200).json({
    status: 1,
    message: signoutSuccessfully,
  });
};

// imporot json web token
const jwt = require('jsonwebtoken');

// constants error messages
const {
  tokenNotFound,
  userAccessDenied,
  adminAccessDenied,
} = require('../constantErrorMessages/errorMessages');

// Token Authentication
exports.requireSignin = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (authHeader) {
    const token = req.headers.authorization.split(' ')[1];
    const user = jwt.verify(token, process.env.JWT_SECRET_KEY);
    req.user = user;
    next();
  } else {
    return res.status(401).json({
      status: 0,
      message: tokenNotFound,
    });
  }
};

// User Authentication
exports.userMiddleware = (req, res, next) => {
  if (req.user.role !== 'user') {
    return res.status(400).json({
      status: 0,
      message: userAccessDenied,
    });
  }
  next();
};

// Admin Authentication
exports.adminMiddleware = (req, res, next) => {
  if (req.user.role !== 'admin') {
    return res.status(400).json({
      status: 0,
      message: adminAccessDenied,
    });
  }
  next();
};

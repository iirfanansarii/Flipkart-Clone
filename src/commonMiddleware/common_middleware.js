// imporot json web token
const jwt = require("jsonwebtoken");

// Token Authentication
exports.requireSignin = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (authHeader) {
    const token = req.headers.authorization.split(" ")[1];
    const user = jwt.verify(token, process.env.JWT_SECRET_KEY);
    req.user = user;
    next();
  } else {
    return res.status(401).json({
      status: 0,
      message: "Token not found!Redirect to login page",
    });
  } 
};

// User Authentication
exports.userMiddleware = (req, res, next) => {
  if (req.user.role !== "user") {
    return res.status(400).json({
      status: 0,
      message: "User access denied",
    });
  }
  next();
};

// Admin Authentication
exports.adminMiddleware = (req, res, next) => {
  if (req.user.role !== "admin") {
    return res.status(400).json({
      status: 0,
      message: "Admin access denied",
    });
  }
  next();
};

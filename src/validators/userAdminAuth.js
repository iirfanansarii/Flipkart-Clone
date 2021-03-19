// import validator
const { check, validationResult } = require("express-validator");

// validate signup
exports.validateSignUpRequest = [
  check("firstName").notEmpty().withMessage("first name is required"),
  check("lastName").notEmpty().withMessage("last name is required"),
  check("email").isEmail().withMessage("Valid email is required"),
  check("password")
    .isLength({ min: 8 })
    .withMessage("Password must be atleast 8 character long "),
];

// validate sign in
exports.validateSignInRequest = [
  check("email").isEmail().withMessage("Valid email is required"),
  check("password")
    .isLength({ min: 8 })
    .withMessage("Password must be atleast 8 character long "),
];

// request validated
exports.isRequestValidated = (req, res, next) => {
  const errors = validationResult(req);
  if (errors.array().length > 0) {
    return res.status(400).json({
      error: errors.array()[0].msg,
    });
  }
  next();
};

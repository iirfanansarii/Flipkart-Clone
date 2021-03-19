// import router
const router = require("express").Router();

// common middleware
const { requireSignin } = require("../commonMiddleware/common_middleware");

// controller
const {
  signup,
  signin,
} = require("../controller/userController");

// valdator
const {
  validateSignUpRequest,
  isRequestValidated,
  validateSignInRequest,
} = require("../validators/userAdminAuth");

// router
router.post("/signup", validateSignUpRequest, isRequestValidated, signup);
router.post("/signin", validateSignInRequest, isRequestValidated, signin);
router.post("/profile", requireSignin, (req, res) => {
  return res.status(200).json({ user: "profile" });
});

// export router
module.exports = router;

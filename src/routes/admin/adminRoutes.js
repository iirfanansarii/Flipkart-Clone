// import router
const router = require('express').Router();

// common middleware
const { requireSignin } = require('../../commonMiddleware/common_middleware');
// controller
const {
  adminSignup,
  adminSignin,
  signout,
} = require('../../controller/admin/adminController');

// validator
const {
  validateSignUpRequest,
  isRequestValidated,
  validateSignInRequest,
} = require('../../validators/userAdminAuth');

// router
router.post(
  '/admin/signup',
  validateSignUpRequest,
  isRequestValidated,
  adminSignup,
);
router.post(
  '/admin/signin',
  validateSignInRequest,
  isRequestValidated,
  adminSignin,
);

router.post('/admin/signout', signout);

router.post('/profile', requireSignin, (req, res) =>
  res.status(200).json({ admin: 'profile' }));

// export router
module.exports = router;

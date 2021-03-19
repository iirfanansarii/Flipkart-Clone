// import router
const router = require('express').Router();

// middleware
const {
  requireSignin,
  userMiddleware,
} = require('../commonMiddleware/common_middleware');

// controller
const { addItemToCart } = require('../controller/cartController');

// router
router.post(
  '/user/cart/addtocart',
  requireSignin,
  userMiddleware,
  addItemToCart,
);

// export router
module.exports = router;

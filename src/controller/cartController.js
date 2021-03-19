// import model
const Cart = require('../models/cartModel');

// controller
exports.addItemToCart = (req, res) => {
  // find existing cart of a user
  Cart.findOne({ user: req.user._id }).exec((err, cart) => {
    if (err) {
      return res.status(400).json({
        message: 'MongoDb error while finding user',
        errors: err,
      });
    }
    if (cart) {
      // findOne use for array [fetched single object or and array of object]
      const product = JSON.parse(JSON.stringify(req.body.cartItems.product));
      const item = cart.cartItems.find(
        (c) => c.product.toString() === product,
      );
      let condition;
      let update;
      if (item) {
        condition = { user: req.user._id, 'cartItems.product': product };
        update = {
          $set: {
            'cartItems.$': {
              ...req.body.cartItems,
              quantity: item.quantity + req.body.cartItems.quantity,
            },
          },
        };
      } else {
        // product not exits hence pusht object to the cart
        condition = { user: req.user._id };
        update = {
          $push: {
            cartItems: req.body.cartItems,
          },
        };
      }
      Cart.findOneAndUpdate(condition, update).exec((errrors, results) => {
        if (errrors) {
          return res.status(400).json({
            status: 0,
            error: errrors,
          });
        }
        if (results) {
          return res.status(200).json({
            message: 'Product quantity added  to cart',
            cart: results,
          });
        }
      });
    } else {
      const newCart = new Cart({
        user: req.user._id,
        cartItems: req.body.cartItems,
      });

      newCart.save((error, result) => {
        if (error) {
          return res.status(500).json({
            status: 0,
            message: 'MongoDB error',
            error,
          });
        }
        if (result) {
          return res.status(201).json({
            status: 1,
            message: 'New product added to cart items added to cart',
            cartItem: result,
          });
        }
      });
    }
  });
};

// $set use to update data and $push to insert new data into any object

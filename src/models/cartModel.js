// imprt mongoose
const mongoose = require('mongoose');

// cart schema
const cartSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },

    cartItems: [
      {
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Product',
          required: true,
        },
        quantity: { type: Number, default: 1 },
        price: { type: Number, required: true },
      },
    ],
  },
  { timestamps: true, versionKey: false },
);

// export model
module.exports = mongoose.model('Cart', cartSchema);

// Note: Here collection name is cart but mongoose
// makes collection name  plural
// hence collection name would be carts

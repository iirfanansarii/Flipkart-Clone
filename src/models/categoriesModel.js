const mongoose = require('mongoose');

// product category schema
const categorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    slug: {
      type: String,
      required: true,
      trim: true,
    },
    categoriesImage: {
      type: String,
    },
    parentId: {
      type: String,
    },
  },
  { timestamps: true, versionKey: false },
);

// exports model
module.exports = mongoose.model('Category', categorySchema);

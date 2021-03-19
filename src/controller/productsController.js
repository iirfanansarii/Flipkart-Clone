// import product model
const Product = require("../models/productsModel");

// import slugify
const slugify = require("slugify");

// controller
exports.addProducts = (req, res) => {
  const { name, price, quantity, description, category, createdBy } = req.body;

  let productPictures = [];

  if (req.files.length > 0) {
     productPictures = req.files.map((file)=>{
          return{
              img: file.filename
            };
      })
  }

  const product = new Product({
    name: name,
    slug: slugify(name),
    price,
    quantity,
    description,
    productPictures,
    category,
    createdBy: req.user._id,
  });
  product.save((err, product) => {
    if (err) {
      return res.status(500).json({
        status: 0,
        message: "MongoDB error",
        error: err,
      });
    } else {
      return res.status(201).json({
        status: 1,
        message: "Product added successfully",
        products: product,
      });
    }
  });
};

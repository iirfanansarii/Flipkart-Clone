// import slugify
const slugify = require('slugify');
const env = require('dotenv');

env.config();

// import models
const Category = require('../models/categoriesModel');

// constants error messages
const {
  categoriesListFetched,
  categoryAdded,
  mongodbError,
} = require('../constantErrorMessages/errorMessages');

// controller
exports.addCategory = (req, res) => {
  const categoryObj = {
    name: req.body.name,
    slug: slugify(req.body.name),
  };
  if (req.file) {
    categoryObj.categoriesImage = `${process.env.API_PATH}/public/${req.file.filename}`;
  }

  if (req.body.parentId) {
    categoryObj.parentId = req.body.parentId;
  }
  const cat = new Category(categoryObj);
  cat.save((err, category) => {
    if (err) {
      return res.status(500).json({
        status: 0,
        message: mongodbError,
        error: err,
      });
    }
    if (category) {
      return res.status(201).json({
        status: 1,
        message: categoryAdded,
        data: category,
      });
    }
  });
};

// recursive function to format categories and it's children
// Do not add async before this function
function formatCategories(categories, parentId = null) {
  const categoriesList = [];
  let category;
  if (parentId == null) {
    category = categories.filter((cat) => cat.parentId === undefined);
  } else {
    category = categories.filter((cat) => cat.parentId == parentId);
  }

  for (let cate of category) {
    categoriesList.push({
      _id: cate._id,
      name: cate.name,
      slug: cate.slug,
      children: formatCategories(categories, cate._id),
    });
  }
  return categoriesList;
}

// get categories list
exports.getCategories = (req, res) => {
  Category.find({}).exec(async (err, categories) => {
    if (err) {
      return res.status(500).json({
        status: 0,
        message: 'MongoDb error',
        error: err,
      });
    }
    if (categories) {
      const formatedCategories = await formatCategories(categories);
      return res.status(200).json({
        status: 1,
        message: categoriesListFetched,
        categoryList: formatedCategories,
      });
    }
  });
};

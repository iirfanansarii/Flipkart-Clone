// import router
const router = require('express').Router();

// helper method to upload files
const { fileUploads } = require('../helpersMethod/uploadFiles');

const upload = fileUploads(process.env.PRODUCT_CATEGORIES_IMAGE_FILES);

// middleware
const {
  requireSignin,
  adminMiddleware,
} = require('../commonMiddleware/common_middleware');

// controller
const {
  addCategory,
  getCategories,
} = require('../controller/categoriesController');

// router
router.post(
  '/category',
  requireSignin,
  adminMiddleware,
  upload.single('categoryImageFiles'),
  addCategory,
);
router.get('/categories', requireSignin, getCategories);

// export router
module.exports = router;

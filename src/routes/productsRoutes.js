// import router
const router = require('express').Router();

// helper method to upload files
const { fileUploads } = require('../helpersMethod/uploadFiles');

const upload = fileUploads(process.env.PRODUCT_IMAGE_FILES_PATH);

// middleware
const {
  requireSignin,
  adminMiddleware,
} = require('../commonMiddleware/common_middleware');

// controller
const { addProducts } = require('../controller/productsController');

// router
router.post(
  '/products',
  requireSignin,
  adminMiddleware,
  upload.array('productImageFiles'),
  addProducts,
);

// export router
module.exports = router;

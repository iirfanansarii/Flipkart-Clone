// import multer to upload file
const multer = require('multer');

// import shortid to create unique id for files
const shortid = require('shortid');

// helper method to upload file
module.exports.fileUploads = (uploadPath) => {
  const storage = multer.diskStorage({
    destination(req, file, cb) {
      cb(null, uploadPath);
    },
    filename(req, file, cb) {
      cb(null, `${shortid.generate()}-${file.originalname}`);
    },
  });

  const upload = multer({ storage });
  return upload;
};

const multer = require('multer');

// Store file in memory
const storage = multer.memoryStorage();

// File type validation
const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === 'image/jpeg' ||
    file.mimetype === 'image/png'
  ) {
    cb(null, true);
  } else {
    cb(new Error('Only JPG and PNG files are allowed'), false);
  }
};

// Size limit: 2MB
const limits = {
  fileSize: 2 * 1024 * 1024
};

const upload = multer({
  storage,
  fileFilter,
  limits
});

module.exports = upload;

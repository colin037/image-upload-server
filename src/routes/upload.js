const express = require('express');
const upload = require('../middleware/uploadMiddleware');
const uploadToS3 = require('../services/s3Service');

const router = express.Router();

router.post('/upload', upload.single('image'), async (req, res, next) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        message: 'No file uploaded or invalid file type'
      });
    }

    const imageUrl = await uploadToS3(req.file);

    res.json({
      url: imageUrl
    });

  } catch (error) {
    next(error);
  }
});

module.exports = router;

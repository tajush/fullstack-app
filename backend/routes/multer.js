// backend/middleware/multer.js
const multer = require('multer');
const path = require('path');

// Configure storage location and file naming
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, '../uploads'));  // relative to multer.js
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  }
});

// File filter example (optional)
const fileFilter = (req, file, cb) => {
  const allowedTypes = ['image/jpeg', 'image/png', 'image/gif'];
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error('Only JPEG, PNG and GIF files are allowed'), false);
  }
};

const upload = multer({ storage, fileFilter });

module.exports = upload;

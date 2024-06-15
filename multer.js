// const multer = require('multer')
// const path = require('path')
// const storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//         cb(null, './public/uploads/')
//     },
//     filename: function (req, file, cb) {
//         const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
//         const fileExtension = path.extname(file.originalname);
//         const newFilename = `${uniqueSuffix}${fileExtension}`;
//         cb(null, newFilename)
//     }
// })

// const upload = multer({ storage: storage })
// module.exports = upload

const multer = require("multer");

// Multer storage configuration
const storage = multer.memoryStorage();

const upload = multer({
  storage: storage,
  limits: { fileSize: 10 * 1024 * 1024 },
});

module.exports = upload;

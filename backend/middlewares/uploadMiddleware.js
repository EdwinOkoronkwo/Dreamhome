// // middlewares/uploadMiddleware.js

// const multer = require("multer");
// const path = require("path");

// const storage = multer.diskStorage({
//   destination: "./public/uploads",
//   filename: function (req, file, cb) {
//     cb(
//       null,
//       file.fieldname + "-" + Date.now() + path.extname(file.originalname)
//     );
//   },
// });

// const upload = multer({
//   storage: storage,
//   limits: { fileSize: 1000000 }, // 1MB limit
//   fileFilter: function (req, file, cb) {
//     const filetypes = /jpeg|jpg|png|gif/;
//     const extname = filetypes.test(
//       path.extname(file.originalname).toLowerCase()
//     );
//     const mimetype = filetypes.test(file.mimetype);

//     if (mimetype && extname) {
//       return cb(null, true);
//     } else {
//       cb("Error: Images Only!");
//     }
//   },
// });

// module.exports = upload;

const uploadMiddleware = (req, res, next) => {
  const form = new multiparty.Form({
    uploadDir: path.join(__dirname, "../public/uploads/branches"),
    maxFilesSize: 10 * 1024 * 1024, // 10MB max file size
  });

  form.parse(req, (err, fields, files) => {
    if (err) {
      console.error("Error parsing form:", err);
      return next(err);
    }

    console.log("Parsed fields:", fields);
    console.log("Parsed files:", files);

    req.body = fields;
    req.files = files;

    if (files.image && files.image.length > 0) {
      req.filePath = files.image[0].path;
    }

    next();
  });
};

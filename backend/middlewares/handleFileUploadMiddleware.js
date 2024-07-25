const multiparty = require("multiparty");
const handleFileUpload = require("../util/fileUtils"); // Adjust the path

// Middleware to handle file upload with multiparty
const handleFileUploadMiddleware = (req, res, next) => {
  const form = new multiparty.Form();

  form.parse(req, async (err, fields, files) => {
    if (err) {
      return next(err);
    }

    // Assume 'image' is the field name for the file upload
    const file = files.image ? files.image[0] : null;

    try {
      const filePath = await handleFileUpload(file);
      // Attach the file path to the request object or handle it as needed
      req.filePath = filePath; // Example: attaching file path to request object
      next();
    } catch (error) {
      next(error);
    }
  });
};

module.exports = { handleFileUploadMiddleware };

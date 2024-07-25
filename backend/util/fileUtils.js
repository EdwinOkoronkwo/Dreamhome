const path = require("path");
const fs = require("fs");

async function handleFileUpload(file) {
  if (!file) {
    throw new Error("No file provided");
  }

  const tempPath = file.path;
  const originalFileName = file.originalFilename || file.originalname; // Adjust for correct property name

  if (!tempPath) {
    throw new Error("File path is missing");
  }

  if (!originalFileName) {
    throw new Error("Original file name is missing");
  }

  const newFileName = Date.now() + path.extname(originalFileName);
  const newPath = path.join(
    __dirname,
    "../public/uploads/branches",
    newFileName
  );

  try {
    fs.renameSync(tempPath, newPath);
    return `/uploads/branches/${newFileName}`;
  } catch (error) {
    console.error("Error moving file:", error);
    throw new Error("Failed to upload file");
  }
}

module.exports = handleFileUpload;

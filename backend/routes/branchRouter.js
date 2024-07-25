/////////////////////////////////////////////////////////////////////////////////////////////
////////////////////  MULTIPARTY  ////////////////////////////////////////////////////////
const express = require("express");
const path = require("path");
const multiparty = require("multiparty");
const BranchController = require("../controllers/branchController");
const { validateBranchData } = require("../validators/branchValidators");
const handleValidationResults = require("../middlewares/validationResult");

class BranchRouter {
  constructor() {
    this.router = express.Router();
    this.initializeRoutes();
  }

  initializeRoutes() {
    // Middleware to handle file uploads with multiparty
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

    // Routes for branches
    this.router.route("/").get(BranchController.getAllBranches).post(
      uploadMiddleware, // Handle file upload with multiparty
      validateBranchData,
      handleValidationResults,
      BranchController.addOrUpdateBranch
    );
    this.router.get("/audit-logs", BranchController.getBranchAuditLogs);

    this.router
      .route("/:branchno")
      .get(BranchController.getBranchByBranchNo)
      .patch(
        uploadMiddleware, // Handle file upload with multiparty
        validateBranchData,
        handleValidationResults,
        BranchController.addOrUpdateBranch
      )
      .delete(BranchController.deleteBranch);

    // Add route for selectable images if needed
    this.router.get("/selectable-images", BranchController.getSelectableImages);
  }

  getRouter() {
    return this.router;
  }
}

module.exports = new BranchRouter().getRouter();

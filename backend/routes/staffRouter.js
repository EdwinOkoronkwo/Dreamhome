// routes/staffRouter.js

const express = require("express");
const multer = require("multer");
const path = require("path");
const StaffController = require("../controllers/staffController");
const { validateStaffData } = require("../validators/staffValidators");
const handleValidationResults = require("../middlewares/validationResult");

class StaffRouter {
  constructor() {
    this.router = express.Router();
    this.storage = multer.diskStorage({
      destination: function (req, file, cb) {
        cb(null, "public/uploads/staff");
      },
      filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname));
      },
    });

    this.upload = multer({ storage: this.storage });

    this.initializeRoutes();
  }

  initializeRoutes() {
    this.router
      .route("/")
      .get(StaffController.getAllStaffs)
      .post(
        this.upload.single("image"),
        validateStaffData,
        handleValidationResults,
        StaffController.addOrUpdateStaff
      );

    this.router
      .route("/:staffno")
      .get(StaffController.getStaffById)
      .patch(
        this.upload.single("image"),
        validateStaffData,
        handleValidationResults,
        StaffController.addOrUpdateStaff
      )
      .delete(StaffController.deleteStaff);
  }

  getRouter() {
    return this.router;
  }
}

module.exports = new StaffRouter().getRouter();

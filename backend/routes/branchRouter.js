// const express = require("express");
// const multiparty = require("multiparty");
// const path = require("path");
// const BranchController = require("../controllers/branchController");
// const { validateBranchData } = require("../validators/branchValidators");
// const handleValidationResults = require("../middlewares/validationResult");

// class BranchRouter {
//   constructor() {
//     this.router = express.Router();
//     this.initializeRoutes();
//   }

//   initializeRoutes() {
//     // Middleware to handle multipart/form-data
//     this.router.use((req, res, next) => {
//       if (req.is("multipart/form-data")) {
//         const form = new multiparty.Form({
//           uploadDir: path.join(__dirname, "../public/uploads/branches"),
//         });
//         form.parse(req, (err, fields, files) => {
//           if (err) return next(err);
//           req.body = fields;
//           req.files = files;
//           next();
//         });
//       } else {
//         next(); // Skip the multiparty middleware if not multipart/form-data
//       }
//     });

//     console.log("BranchController:", BranchController);
//     console.log("validateBranchData:", validateBranchData);
//     console.log("handleValidationResults:", handleValidationResults);

//     // Routes for branches
//     this.router
//       .route("/")
//       .get(BranchController.getAllBranches) // Fetch all branches
//       .post(
//         validateBranchData, // Validate data
//         handleValidationResults, // Handle validation results
//         BranchController.addOrUpdateBranch // Add or update a branch
//       );

//     // Route for fetching audit logs
//     this.router.get("/audit-logs", BranchController.getAuditLogs);

//     this.router
//       .route("/:branchno")
//       .get(BranchController.getBranchByBranchNo) // Fetch a specific branch by branchno
//       .patch(
//         validateBranchData, // Validate data
//         handleValidationResults, // Handle validation results
//         BranchController.addOrUpdateBranch // Update the branch
//       )
//       .delete(BranchController.deleteBranch); // Delete a branch

//     // Route for fetching images (if needed, make sure method is defined in controller)
//     // this.router.get("/images", BranchController.getSelectableImages);
//   }

//   getRouter() {
//     return this.router;
//   }
// }

// module.exports = new BranchRouter().getRouter();

////////////////////////////////////////////////////////////////
// const express = require("express");
// const path = require("path");
// const multiparty = require("multiparty");
// const BranchController = require("../controllers/branchController");
// const { validateBranchData } = require("../validators/branchValidators");
// const handleValidationResults = require("../middlewares/validationResult");

// class BranchRouter {
//   constructor() {
//     this.router = express.Router();
//     this.initializeRoutes();
//   }

//   initializeRoutes() {
//     // Middleware to handle multipart/form-data
//     this.router.use(this.handleMultipart.bind(this)); // Bind `this` to the method

//     // Routes for branches
//     this.router.route("/").get(BranchController.getAllBranches).post(
//       this.handleMultipart.bind(this), // Apply multipart middleware for POST requests
//       validateBranchData,
//       handleValidationResults,
//       BranchController.addOrUpdateBranch
//     );

//     this.router
//       .route("/:branchno")
//       .get(BranchController.getBranchByBranchNo)
//       .patch(
//         this.handleMultipart.bind(this), // Apply multipart middleware for PATCH requests
//         validateBranchData,
//         handleValidationResults,
//         BranchController.addOrUpdateBranch
//       )
//       .delete(BranchController.deleteBranch);

//     this.router.get("/audit-logs", BranchController.getAuditLogs);
//   }

//   handleMultipart(req, res, next) {
//     console.log("Content-Type:", req.headers["content-type"]); // Log Content-Type
//     console.log("Request headers:", req.headers); // Log all headers

//     const form = new multiparty.Form({
//       uploadDir: path.join(__dirname, "../public/uploads/branches"),
//     });

//     form.parse(req, (err, fields, files) => {
//       if (err) {
//         console.error("Error parsing form:", err);
//         return next(err);
//       }
//       console.log("Parsed fields:", fields);
//       console.log("Parsed files:", files);
//       req.body = fields;
//       req.files = files;
//       next();
//     });
//   }

//   getRouter() {
//     return this.router;
//   }
// }

// module.exports = new BranchRouter().getRouter();

// const express = require("express");
// const multer = require("multer");
// const path = require("path");
// const BranchController = require("../controllers/branchController");
// const { validateBranchData } = require("../validators/branchValidators");
// const handleValidationResults = require("../middlewares/validationResult");

// class BranchRouter {
//   constructor() {
//     this.router = express.Router();
//     this.initializeMulter();
//     this.initializeRoutes();
//   }

//   initializeMulter() {
//     // Set up Multer storage
//     this.storage = multer.diskStorage({
//       destination: (req, file, cb) => {
//         // Ensure the directory exists
//         cb(null, "public/uploads/branches");
//       },
//       filename: (req, file, cb) => {
//         // Generate a unique filename
//         cb(null, Date.now() + path.extname(file.originalname));
//       },
//     });

//     // Create an instance of Multer with the configured storage
//     this.upload = multer({
//       storage: this.storage,
//       limits: { fileSize: 5 * 1024 * 1024 }, // Limit file size to 5 MB
//       fileFilter: (req, file, cb) => {
//         const allowedTypes = /jpeg|jpg|png|gif/;
//         const extname = allowedTypes.test(
//           path.extname(file.originalname).toLowerCase()
//         );
//         const mimetype = allowedTypes.test(file.mimetype);
//         if (mimetype && extname) {
//           return cb(null, true);
//         } else {
//           cb(new Error("Error: Images only!"));
//         }
//       },
//     });
//   }

//   initializeRoutes() {
//     this.router
//       .route("/")
//       .get(BranchController.getAllBranches)
//       .post(
//         this.upload.single("image"),
//         validateBranchData,
//         handleValidationResults,
//         BranchController.addOrUpdateBranch
//       );

//     this.router
//       .route("/:branchno")
//       .get(BranchController.getBranchByBranchNo)
//       .patch(
//         this.upload.single("image"),
//         validateBranchData,
//         handleValidationResults,
//         BranchController.addOrUpdateBranch
//       )
//       .delete(BranchController.deleteBranch);
//   }

//   getRouter() {
//     return this.router;
//   }
// }

// module.exports = new BranchRouter().getRouter();
/////////////////////////////////////////////////////////////////////////////
// const express = require("express");
// const path = require("path");
// const multer = require("multer");
// const BranchController = require("../controllers/branchController");
// const { validateBranchData } = require("../validators/branchValidators");
// const handleValidationResults = require("../middlewares/validationResult");

// // Set up storage configuration
// // Set up storage configuration
// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, path.join(__dirname, "../public/uploads")); // Adjust the path if necessary
//   },
//   filename: (req, file, cb) => {
//     cb(null, Date.now() + path.extname(file.originalname)); // Append timestamp to filename
//   },
// });

// // Create multer instance with defined storage and file filter
// const upload = multer({
//   storage: storage,
//   fileFilter: (req, file, cb) => {
//     console.log(`File field: ${file.fieldname}`); // Log the field name
//     if (file.mimetype.startsWith("image/")) {
//       cb(null, true);
//     } else {
//       cb(new Error("Invalid file type. Only images are allowed."));
//     }
//   },
// });

// class BranchRouter {
//   constructor() {
//     this.router = express.Router();
//     this.initializeRoutes();
//   }

//   initializeRoutes() {
//     // Routes for branches
//     this.router.route("/").get(BranchController.getAllBranches).post(
//       upload.single("image"), // Handle single image upload
//       validateBranchData,
//       handleValidationResults,
//       BranchController.addOrUpdateBranch
//     );

//     this.router
//       .route("/:branchno")
//       .get(BranchController.getBranchByBranchNo)
//       .patch(
//         upload.single("image"), // Handle single image upload
//         validateBranchData,
//         handleValidationResults,
//         BranchController.addOrUpdateBranch
//       )
//       .delete(BranchController.deleteBranch);

//     this.router.get("/audit-logs", BranchController.getAuditLogs);
//   }

//   getRouter() {
//     return this.router;
//   }
// }

// module.exports = new BranchRouter().getRouter();

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

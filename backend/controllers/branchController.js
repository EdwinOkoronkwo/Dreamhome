// const path = require("path");
// const fs = require("fs");
// const BranchService = require("../services/branch.service");
// const BranchValidationUtil = require("../util/branchValidation");
// const { validationResult } = require("express-validator");
// const { NotFoundError, DatabaseError } = require("../util/errors");

// class BranchController {
//   static async getAllBranches(req, res, next) {
//     const { max, search } = req.query;
//     try {
//       let branches = await BranchService.getAllBranches();

//       if (search) {
//         branches = branches.filter((branch) =>
//           `${branch.street} ${branch.city} ${branch.postcode}`
//             .toLowerCase()
//             .includes(search.toLowerCase())
//         );
//       }

//       if (max) {
//         branches = branches.slice(0, Number(max));
//       }

//       res.json({ branches });
//     } catch (error) {
//       next(error);
//     }
//   }

//   static async getBranchByBranchNo(req, res, next) {
//     try {
//       const branchno = req.params.branchno;
//       console.log(`Request for branchno: ${branchno}`);

//       const branch = await BranchService.getBranchByBranchNo(branchno);

//       if (!branch) {
//         throw new NotFoundError(`No branch found for branchno ${branchno}`);
//       }

//       res.json(branch);
//     } catch (err) {
//       console.error("Error in getBranchByBranchNo controller:", err);
//       if (err instanceof NotFoundError) {
//         return res.status(404).json({ message: err.message });
//       }
//       return next(new DatabaseError("Failed to retrieve branch"));
//     }
//   }

//   static async deleteBranch(req, res, next) {
//     const branchno = req.params.branchno;
//     try {
//       await BranchService.deleteBranch(branchno);
//       res.json({ message: "Branch deleted successfully!" });
//     } catch (error) {
//       next(error);
//     }
//   }

//   static async getAuditLogs(req, res, next) {
//     try {
//       const logs = await BranchService.getBranchAuditLogs();
//       res.json({ logs });
//     } catch (error) {
//       console.error("Failed to get audit logs:", error);
//       res.status(500).json({ error: "Failed to get audit logs" });
//     }
//   }

//   // static async addOrUpdateBranch(req, res, next) {
//   //   const validationErrors = validationResult(req);

//   //   if (!validationErrors.isEmpty()) {
//   //     console.log("Validation errors:", validationErrors.array());
//   //     return res.status(422).json({
//   //       message: "Validation errors occurred.",
//   //       errors: validationErrors.array(),
//   //     });
//   //   }

//   //   try {
//   //     const branchData = {
//   //       branchno: req.body.branchno, // Assuming req.body.branchno is a string
//   //       street: req.body.street, // Assuming req.body.street is a string
//   //       city: req.body.city, // Assuming req.body.city is a string
//   //       postcode: req.body.postcode, // Assuming req.body.postcode is a string
//   //       image: req.body.image || null, // Assuming req.body.image is a string or null
//   //     };

//   //     // Validate branch data
//   //     const validationErrors = await BranchValidationUtil.validateBranchData(
//   //       branchData
//   //     );
//   //     if (validationErrors.length > 0) {
//   //       return res.status(422).json({
//   //         message: "Validation errors occurred.",
//   //         errors: validationErrors,
//   //       });
//   //     }

//   //     // Handle file upload if needed
//   //     if (req.files && req.files.image && req.files.image[0]) {
//   //       try {
//   //         branchData.image = await handleFileUpload(req.files.image[0]);
//   //       } catch (renameErr) {
//   //         return next(renameErr);
//   //       }
//   //     }

//   //     console.log("Branch data to be processed:", branchData); // Debugging line

//   //     // Add or update branch
//   //     await BranchService.addOrUpdateBranch(branchData);
//   //     res.status(200).json({
//   //       message: "Branch processed successfully",
//   //       branch: branchData,
//   //     });
//   //   } catch (error) {
//   //     next(error);
//   //   }
//   // }

//   static async addOrUpdateBranch(req, res) {
//     try {
//       console.log("Request body:", req.body); // Log request body
//       console.log("Request files:", req.files); // Log request files

//       const branchData = {
//         branchno: req.body.branchno,
//         street: req.body.street,
//         city: req.body.city,
//         postcode: req.body.postcode,
//         image: null, // Initialize image as null
//       };

//       // Handle file upload
//       if (req.files && req.files.length > 0) {
//         try {
//           branchData.image = await handleFileUpload(req.files[0]);
//         } catch (uploadError) {
//           return res.status(500).json({
//             message: "File upload failed",
//             error: uploadError.message,
//           });
//         }
//       }

//       console.log("Branch data to be validated:", branchData); // Debugging

//       const validationErrors = await BranchValidationUtil.validateBranchData(
//         branchData
//       );

//       if (validationErrors.length > 0) {
//         return res.status(400).json({ errors: validationErrors });
//       }

//       // Proceed with adding or updating the branch
//       await BranchService.addOrUpdateBranch(branchData);
//       res.status(200).json({ message: "Branch added/updated successfully." });
//     } catch (error) {
//       console.error("Error adding/updating branch:", error);
//       res.status(500).json({ message: "Internal server error." });
//     }
//   }

//   static async getSelectableImages(req, res, next) {
//     try {
//       const images = await BranchService.getSelectableImages();
//       res.json({ images });
//     } catch (error) {
//       next(error);
//     }
//   }
// }
// async function handleFileUpload(file) {
//   if (file && file.path) {
//     const tempPath = file.path;
//     const newFileName = Date.now() + path.extname(file.originalname);
//     const newPath = path.join(
//       __dirname,
//       "../public/uploads/branches",
//       newFileName
//     );

//     try {
//       fs.renameSync(tempPath, newPath);
//       return `/uploads/branches/${newFileName}`;
//     } catch (error) {
//       throw new Error("Failed to upload file");
//     }
//   }
//   return null;
// }

// module.exports = {
//   getAuditLogs: BranchController.getAuditLogs,
//   getAllBranches: BranchController.getAllBranches,
//   getBranchByBranchNo: BranchController.getBranchByBranchNo,
//   deleteBranch: BranchController.deleteBranch,
//   addOrUpdateBranch: BranchController.addOrUpdateBranch,
//   getSelectableImages: BranchController.getSelectableImages,
// };

// const BranchService = require("../services/branch.service");
// const { isValidText, isValidPostcode } = require("../util/validation");

// class BranchController {
//   static async getAllBranches(req, res, next) {
//     const { max, search } = req.query;
//     try {
//       let branches = await BranchService.getAllBranches();

//       if (search) {
//         branches = branches.filter((branch) =>
//           `${branch.street} ${branch.city} ${branch.postcode}`
//             .toLowerCase()
//             .includes(search.toLowerCase())
//         );
//       }

//       if (max) {
//         branches = branches.slice(0, Number(max));
//       }

//       res.json({ branches });
//     } catch (error) {
//       next(error);
//     }
//   }

//   static async getBranchByBranchNo(req, res, next) {
//     const branchno = req.params.branchno;
//     try {
//       const branch = await BranchService.getBranchByBranchNo(branchno);
//       if (!branch) {
//         return res.status(404).json({ message: "Branch not found" });
//       }
//       res.json({ branch });
//     } catch (error) {
//       next(error);
//     }
//   }

//   static async deleteBranch(req, res, next) {
//     const branchno = req.params.branchno;
//     try {
//       await BranchService.deleteBranch(branchno);
//       res.json({ message: "Branch deleted successfully!" });
//     } catch (error) {
//       next(error);
//     }
//   }

//   static async addOrUpdateBranch(req, res, next) {
//     const branchno = req.params.branchno || req.body.branchno;
//     const { street, city, postcode } = req.body;
//     const imageUrl = req.file ? `/uploads/branches/${req.file.filename}` : null;

//     // Validate input data
//     const errors = {};
//     if (!isValidText(street)) errors.street = "Invalid street.";
//     if (!isValidText(city)) errors.city = "Invalid city.";
//     if (!isValidPostcode(postcode)) errors.postcode = "Invalid postcode.";

//     if (Object.keys(errors).length > 0) {
//       return res.status(422).json({ message: "Validation failed", errors });
//     }

//     try {
//       const branchData = {
//         branchno,
//         street,
//         city,
//         postcode,
//         image: imageUrl,
//       };
//       await BranchService.addOrUpdateBranch(branchData);
//       res.status(201).json({
//         message: "Branch created/updated successfully",
//         branch: branchData,
//       });
//     } catch (error) {
//       next(error);
//     }
//   }

//   static async getSelectableImages(req, res, next) {
//     try {
//       const images = await BranchService.getSelectableImages();
//       res.json({ images });
//     } catch (error) {
//       next(error);
//     }
//   }
// }

// module.exports = BranchController;

// const BranchService = require("../services/branch.service");

// exports.getAllBranches = async (req, res, next) => {
//   try {
//     const branches = await BranchService.getAllBranches();
//     res.json(branches);
//   } catch (err) {
//     next(err);
//   }
// };

// exports.getBranchByBranchNo = async (req, res, next) => {
//   const { branchno } = req.params;
//   try {
//     const branch = await BranchService.getBranchByBranchNo(branchno);
//     res.json(branch);
//   } catch (err) {
//     next(err);
//   }
// };

// // controllers/branch.controller.js

// exports.addOrUpdateBranch = async (req, res, next) => {
//   try {
//     const branchData = {
//       branchno: req.body.branchno,
//       street: req.body.street,
//       city: req.body.city,
//       postcode: req.body.postcode,
//       image: req.file ? `/uploads/branches/${req.file.filename}` : null,
//     };

//     // Save or update the branch in the database
//     const result = await BranchService.addOrUpdateBranch(branchData);
//     res.status(200).json({ branch: result });
//   } catch (error) {
//     next(error);
//   }
// };

// exports.deleteBranch = async (req, res, next) => {
//   const { branchno } = req.params;
//   try {
//     await BranchService.deleteBranch(branchno);
//     res.status(200).json({ message: "Branch deleted successfully" });
//   } catch (err) {
//     next(err);
//   }
// };

// exports.getAuditLogs = async (req, res, next) => {
//   try {
//     const logs = await BranchService.getBranchAuditLogs();
//     res.json(logs);
//   } catch (err) {
//     next(err);
//   }
// };
///////////////////////////////////////////////////////////////////////////
/////////////////// MULTIPARTY/////////////////////////////////////
// const BranchService = require("../services/branch.service");
// const { validationResult } = require("express-validator");
// const path = require("path");

// class BranchController {
//   async getAllBranches(req, res, next) {
//     try {
//       const branches = await BranchService.getAllBranches();
//       res.json(branches);
//     } catch (err) {
//       next(err);
//     }
//   }

//   async getBranchByBranchNo(req, res, next) {
//     try {
//       const branch = await BranchService.getBranchByBranchNo(
//         req.params.branchno
//       );
//       res.json(branch);
//     } catch (err) {
//       next(err);
//     }
//   }

//   static async addOrUpdateBranch(req, res) {
//     try {
//       const { branchno } = req.params;
//       const { fields, files } = req;

//       // Handle file processing
//       let imagePath = null;
//       if (files && files.image && files.image.length > 0) {
//         const imageFile = files.image[0];
//         imagePath = path.basename(imageFile.path);
//       }

//       // Prepare branch data
//       const branchData = {
//         ...fields,
//         image: imagePath || fields.image,
//       };

//       // Add or update the branch in the database
//       const result = await BranchService.addOrUpdateBranch(branchData);

//       // Respond with success
//       res.status(200).json({
//         message: branchno
//           ? "Branch updated successfully"
//           : "Branch added successfully",
//         data: result,
//       });
//     } catch (error) {
//       console.error("Error in addOrUpdateBranch:", error.message);
//       res.status(500).json({
//         message: "Error processing branch",
//         error: error.message,
//       });
//     }
//   }

//   async deleteBranch(req, res, next) {
//     try {
//       const result = await BranchService.deleteBranch(req.params.branchno);
//       res.json(result);
//     } catch (err) {
//       next(err);
//     }
//   }

//   async getAuditLogs(req, res, next) {
//     try {
//       const auditLogs = await BranchService.getAuditLogs();
//       res.json(auditLogs);
//     } catch (err) {
//       next(err);
//     }
//   }
// }

// module.exports = new BranchController();

/////////////////////////////////////////////////////////////////////

const path = require("path");
const fs = require("fs");
const BranchService = require("../services/branch.service");
const BranchValidationUtil = require("../util/branchValidation");
const { validationResult } = require("express-validator");
const { NotFoundError, DatabaseError } = require("../util/errors");
const multiparty = require("multiparty");

async function handleFileUpload(file) {
  if (!file) {
    throw new Error("No file provided");
  }

  const tempPath = file.path;
  const originalFileName = file.originalFilename || file.originalname; // Adjust property names if needed

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

// async function handleFileUpload(req) {
//   return new Promise((resolve, reject) => {
//     const form = new multiparty.Form();
//     form.parse(req, (err, fields, files) => {
//       if (err) {
//         console.error("Error parsing form:", err);
//         return reject(err);
//       }

//       // Check if files are included in the request
//       if (!files.image || files.image.length === 0) {
//         console.error("No files found in the request");
//         return resolve(null); // No file to upload
//       }

//       // Debug: Log files object
//       console.log("Parsed files:", files);

//       // Ensure file information is present
//       const file = files.image[0];
//       if (!file || !file.path || !file.originalFilename) {
//         console.error("File or file path is missing:", file);
//         return resolve(null); // No file path found
//       }

//       // Debug: Log file details
//       console.log("Received file:", file);

//       // Generate a new file name and move the file
//       const tempPath = file.path;
//       const newFileName = Date.now() + path.extname(file.originalFilename);
//       const newPath = path.join(
//         __dirname,
//         "../public/uploads/branches",
//         newFileName
//       );

//       fs.rename(tempPath, newPath, (err) => {
//         if (err) {
//           console.error("Error moving file:", err);
//           return reject(err);
//         }
//         resolve(`/uploads/branches/${newFileName}`);
//       });
//     });
//   });
// }
class BranchController {
  static async getAllBranches(req, res, next) {
    const { max, search } = req.query;
    try {
      let branches = await BranchService.getAllBranches();

      if (search) {
        branches = branches.filter((branch) =>
          `${branch.street} ${branch.city} ${branch.postcode}`
            .toLowerCase()
            .includes(search.toLowerCase())
        );
      }

      if (max) {
        branches = branches.slice(0, Number(max));
      }

      res.json({ branches });
    } catch (error) {
      next(error);
    }
  }

  static async getBranchByBranchNo(req, res, next) {
    try {
      const branchno = req.params.branchno;
      console.log(`Request for branchno: ${branchno}`);

      const branch = await BranchService.getBranchByBranchNo(branchno);

      if (!branch) {
        throw new NotFoundError(`No branch found for branchno ${branchno}`);
      }

      res.json(branch);
    } catch (err) {
      console.error("Error in getBranchByBranchNo controller:", err);
      if (err instanceof NotFoundError) {
        return res.status(404).json({ message: err.message });
      }
      return next(new DatabaseError("Failed to retrieve branch"));
    }
  }

  static async deleteBranch(req, res, next) {
    const branchno = req.params.branchno;
    try {
      await BranchService.deleteBranch(branchno);
      res.json({ message: "Branch deleted successfully!" });
    } catch (error) {
      next(error);
    }
  }

  static async getBranchAuditLogs(req, res, next) {
    try {
      const logs = await BranchService.getBranchAuditLogs();
      res.json({ logs });
    } catch (error) {
      console.error("Failed to get audit logs:", error);
      res.status(500).json({ error: "Failed to get audit logs" });
    }
  }

  static async addOrUpdateBranch(req, res, next) {
    try {
      console.log("Received request to add or update branch");

      let imageUrl = null;

      if (req.files && req.files.image && req.files.image.length > 0) {
        const file = req.files.image[0];
        imageUrl = await handleFileUpload(file);
      }

      const { branchno, street, city, postcode } = req.body;

      if (!branchno || !street || !city || !postcode) {
        return res.status(400).json({ error: "Missing required fields" });
      }

      const branchData = {
        branchno,
        street,
        city,
        postcode,
        image: imageUrl,
      };

      console.log("Branch data to be added/updated:", branchData);

      const result = await BranchService.addOrUpdateBranch(branchData);

      console.log("Result of addOrUpdateBranch:", result);

      res
        .status(200)
        .json({ message: "Branch added/updated successfully", branch: result });
    } catch (error) {
      console.error("Error adding/updating branch:", error);
      res.status(500).json({ error: error.message });
    }
  }

  static async getSelectableImages(req, res, next) {
    try {
      const images = await BranchService.getSelectableImages();
      res.json({ images });
    } catch (error) {
      next(error);
    }
  }
}
// async function handleFileUpload(file) {
//   if (file && file.path) {
//     const tempPath = file.path;
//     const newFileName = Date.now() + path.extname(file.originalname);
//     const newPath = path.join(
//       __dirname,
//       "../public/uploads/branches",
//       newFileName
//     );

//     try {
//       fs.renameSync(tempPath, newPath);
//       return `/uploads/branches/${newFileName}`;
//     } catch (error) {
//       throw new Error("Failed to upload file");
//     }
//   }
//   return null;
// }

module.exports = {
  getBranchAuditLogs: BranchController.getBranchAuditLogs,
  getAllBranches: BranchController.getAllBranches,
  getBranchByBranchNo: BranchController.getBranchByBranchNo,
  deleteBranch: BranchController.deleteBranch,
  addOrUpdateBranch: BranchController.addOrUpdateBranch,
  getSelectableImages: BranchController.getSelectableImages,
};

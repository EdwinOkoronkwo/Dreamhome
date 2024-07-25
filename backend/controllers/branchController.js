/////////////////////////////////////////////////////////////////////

const path = require("path");
const fs = require("fs");
const BranchService = require("../services/branch.service");
const { NotFoundError, DatabaseError } = require("../util/errors");

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
      console.log("Parsed fields:", req.body);
      console.log("Parsed files:", req.files);

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
        branchno: branchno[0], // Convert array to string if needed
        street: street[0],
        city: city[0],
        postcode: postcode[0],
        image: imageUrl,
      };

      console.log("Branch data to be added/updated:", branchData);

      const result = await BranchService.addOrUpdateBranch(branchData);

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

module.exports = {
  getBranchAuditLogs: BranchController.getBranchAuditLogs,
  getAllBranches: BranchController.getAllBranches,
  getBranchByBranchNo: BranchController.getBranchByBranchNo,
  deleteBranch: BranchController.deleteBranch,
  addOrUpdateBranch: BranchController.addOrUpdateBranch,
  getSelectableImages: BranchController.getSelectableImages,
};

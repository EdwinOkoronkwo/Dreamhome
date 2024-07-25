const db = require("../db"); // Import your database connection

class BranchService {
  // Fetch all branches
  static async getAllBranches() {
    try {
      const [rows] = await db.execute("SELECT * FROM dh_branch");
      return this.transformBranchData(rows);
    } catch (error) {
      throw new Error(`Failed to fetch branches: ${error.message}`);
    }
  }

  // Fetch a branch by branch number
  static async getBranchByBranchNo(branchno) {
    try {
      const [rows] = await db.execute(
        "SELECT * FROM dh_branch WHERE branchno = ?",
        [branchno]
      );
      if (rows.length === 0) {
        throw new Error("Branch not found");
      }
      return this.transformBranchData(rows)[0];
    } catch (error) {
      throw new Error(`Failed to fetch branch: ${error.message}`);
    }
  }

  // Add or update a branch using the stored procedure
  static async addOrUpdateBranch(branchData) {
    try {
      const { branchno, street, city, postcode, image } = branchData;
      const [result] = await db.execute(
        "CALL sp_branch_add_or_edit(?, ?, ?, ?, ?)",
        [branchno, street, city, postcode, image]
      );
      return result;
    } catch (error) {
      throw new Error(`Failed to add or update branch: ${error.message}`);
    }
  }

  // Delete a branch by branch number
  static async deleteBranch(branchno) {
    try {
      const [result] = await db.execute(
        "DELETE FROM dh_branch WHERE branchno = ?",
        [branchno]
      );
      return result;
    } catch (error) {
      throw new Error(`Failed to delete branch: ${error.message}`);
    }
  }

  // Fetch audit logs
  static async getBranchAuditLogs() {
    try {
      const [rows] = await db.execute("CALL GetTopTenAuditLogs()");
      return rows;
    } catch (error) {
      throw new Error(`Failed to fetch audit logs: ${error.message}`);
    }
  }

  // Transform branch data
  static transformBranchData(branches) {
    return branches.map((branch) => ({
      branchno: Array.isArray(branch.branchno)
        ? JSON.parse(branch.branchno)[0]
        : branch.branchno,
      street: Array.isArray(branch.street)
        ? JSON.parse(branch.street)[0]
        : branch.street,
      city: Array.isArray(branch.city)
        ? JSON.parse(branch.city)[0]
        : branch.city,
      postcode: Array.isArray(branch.postcode)
        ? JSON.parse(branch.postcode)[0]
        : branch.postcode,
      image: branch.image ? branch.image.replace(/\\/g, "/") : null, // Handle null values
    }));
  }
}

module.exports = BranchService;

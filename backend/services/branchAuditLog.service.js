const db = require("../db"); // Adjust path as needed

class BranchAuditLogService {
  async getAuditLogs() {
    try {
      const [rows] = await db.query("SELECT * FROM branch_audit_log"); // Replace `audit_log` with your actual table name

      if (!Array.isArray(rows)) {
        throw new Error("Unexpected response format from database");
      }

      return rows;
    } catch (error) {
      console.error("Error fetching audit logs:", error); // Log detailed error for debugging
      throw new Error("Failed to retrieve audit logs");
    }
  }
}

module.exports = new BranchAuditLogService();

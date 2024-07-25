const express = require("express");
const router = express.Router();
const BranchAuditLogService = require("../services/branchAuditLog.service");

router.get("/logs", async (req, res, next) => {
  try {
    const logs = await BranchAuditLogService.getAuditLogs();
    res.status(200).json(logs);
  } catch (error) {
    next(error);
  }
});

module.exports = router;

const auditLogService = require("../services/branchAuditLog.service");

exports.getAuditLogs = async (req, res, next) => {
  try {
    const logs = await auditLogService.getAuditLogs();
    res.json({ logs });
  } catch (error) {
    next(error);
  }
};

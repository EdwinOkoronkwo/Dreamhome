const BranchAuditLogService = require("./services/branchAuditLog.service");

async function displayAuditLogs() {
  try {
    const logs = await BranchAuditLogService.getAuditLogs();
    console.log("Branch Audit Logs:");
    logs.forEach((log) => {
      console.log(`
----------------------------------------
Action: ${log.action}
Branch No: ${log.branchno}
Street: ${log.street}
City: ${log.city}
Postcode: ${log.postcode}
Image: ${log.image}
Changed At: ${new Date(log.changed_at).toString()}
Changed By: ${log.changed_by}
----------------------------------------
      `);
    });
  } catch (error) {
    console.error("Error displaying audit logs:", error);
  }
}

displayAuditLogs();

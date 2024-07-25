import React from "react";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { fetchAuditLogs } from "../../util/http"; // Adjust the import path as needed
import Header from "../Header"; // Adjust import path as needed
import BranchesIntroSection from "./BranchesIntroSection";
import "../../index.css"; // Import global CSS

const BranchAuditLog = () => {
  const {
    data: logs = [],
    error,
    isLoading,
  } = useQuery({
    queryKey: ["auditLogs"],
    queryFn: () => fetchAuditLogs({}),
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) {
    console.error("Error loading logs:", error);
    return <div>Error loading logs: {error.message}</div>;
  }

  // Get the top 10 logs
  const topLogs = logs.slice(0, 10);

  return (
    <>
      <Header>
        <Link to="/branches" className="button">
          Back to Branches
        </Link>
      </Header>
      <main className="content-section">
        <BranchesIntroSection />
        <h2 className="page-title">Branch Audit Logs</h2>
        <div className="table-container">
          <table className="audit-log-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Action</th>
                <th>Branch No</th>
                <th>Street</th>
                <th>City</th>
                <th>Postcode</th>
                <th>Changed At</th>
                <th>Changed By</th>
              </tr>
            </thead>
            <tbody>
              {topLogs.map((log) => (
                <tr key={log.id}>
                  <td>{log.id}</td>
                  <td>{log.action}</td>
                  <td>{log.branchno}</td>
                  <td>{log.street}</td>
                  <td>{log.city}</td>
                  <td>{log.postcode}</td>
                  <td>{new Date(log.changed_at).toLocaleString()}</td>
                  <td>{log.changed_by}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </>
  );
};

export default BranchAuditLog;

// import { QueryClient } from "@tanstack/react-query";

// const BASE_URL = "http://localhost:3000/api/branches";
// const VALIDATION_BASE_URL = "http://localhost:3000/api/validate";
// const AUDIT_LOGS_URL = "http://localhost:3000/api/audit-logs";

// export const queryClient = new QueryClient();

// // Function to fetch branches with optional search and max parameters
// export async function fetchBranches({ signal, searchTerm, max }) {
//   const url = new URL(BASE_URL);
//   const params = new URLSearchParams();
//   if (searchTerm) params.append("search", searchTerm);
//   if (max) params.append("max", max);
//   url.search = params.toString();

//   try {
//     const response = await fetch(url, { signal });
//     if (!response.ok) {
//       const errorInfo = await response.json();
//       throw new Error(
//         `Error ${response.status}: ${
//           errorInfo.message || "Failed to fetch branches"
//         }`
//       );
//     }
//     const data = await response.json(); // Get data directly
//     if (!Array.isArray(data))
//       throw new Error("Branches data is missing or not an array");
//     return data;
//   } catch (error) {
//     console.error("Failed to fetch branches:", error);
//     throw error;
//   }
// }

// // Function to create a new branch with FormData
// export async function createNewBranch(branchData) {
//   try {
//     const response = await fetch(BASE_URL, {
//       method: "POST",
//       body: branchData, // FormData should be sent as is
//     });

//     if (!response.ok) {
//       const errorInfo = await response.json();
//       throw new Error(
//         `Error ${response.status}: ${
//           errorInfo.message || "Failed to create branch"
//         }`
//       );
//     }

//     const data = await response.json();
//     if (!data.branch) throw new Error("Branch data is missing");
//     return data.branch;
//   } catch (error) {
//     console.error("Failed to create new branch:", error);
//     throw error;
//   }
// }

// // src/util/http.js

// // Function to update a branch
// export async function updateBranch({ branchno, branch }) {
//   try {
//     const response = await fetch(`${BASE_URL}/${branchno}`, {
//       method: "PATCH",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify(branch),
//     });

//     if (!response.ok) {
//       const errorInfo = await response.json();
//       throw new Error(
//         `Error ${response.status}: ${
//           errorInfo.message || "Failed to update branch"
//         }`
//       );
//     }

//     return await response.json();
//   } catch (error) {
//     console.error("Failed to update branch:", error);
//     throw error;
//   }
// }

// // Function to fetch a single branch by branch number
// export async function fetchBranch({ signal, branchno }) {
//   try {
//     const response = await fetch(`${BASE_URL}/${branchno}`, { signal });
//     if (!response.ok) {
//       throw new Error(`Error ${response.status}: Failed to fetch branch data`);
//     }
//     const data = await response.json();
//     console.log("Fetched branch data:", data); // Debugging line
//     return data;
//   } catch (error) {
//     console.error("Failed to fetch branch:", error);
//     throw error;
//   }
// }

// // Function to delete a branch by branch number
// export async function deleteBranch({ branchno }) {
//   try {
//     const response = await fetch(`${BASE_URL}/${branchno}`, {
//       method: "DELETE",
//     });

//     if (!response.ok) {
//       const errorInfo = await response.json();
//       throw new Error(
//         `Error ${response.status}: ${
//           errorInfo.message || "Failed to delete branch"
//         }`
//       );
//     }

//     return await response.json();
//   } catch (error) {
//     console.error("Failed to delete branch:", error);
//     throw error;
//   }
// }

// // Function to fetch audit logs by branch number
// // src/util/http.js

// export async function fetchAuditLogs({ branchno, signal }) {
//   if (!branchno) {
//     throw new Error("branchno is required to fetch audit logs");
//   }

//   try {
//     const response = await fetch(`${AUDIT_LOGS_URL}?branchno=${branchno}`, {
//       signal,
//     });
//     if (!response.ok) {
//       const errorText = await response.text(); // Read the response as text for debugging
//       throw new Error(
//         `Error ${response.status}: An error occurred while fetching audit logs - ${errorText}`
//       );
//     }

//     const data = await response.json();
//     const { auditLogs } = data;

//     if (!Array.isArray(auditLogs)) {
//       throw new Error("Audit logs data is missing or not an array");
//     }

//     return auditLogs;
//   } catch (error) {
//     console.error("Failed to fetch audit logs:", error);
//     throw error;
//   }
// }

////////////////////////////////////////////////////////////////////
//////////////// MULTIPARTY //////////////////////////////////////////
// import { QueryClient } from "@tanstack/react-query";

// const BASE_URL = "http://localhost:3000/api/branches";
// const AUDIT_LOGS_URL = "http://localhost:3000/api/branches/audit-logs";

// export const queryClient = new QueryClient();

// function parseBranchData(branches) {
//   return branches.map((branch) => ({
//     branchno: parseJsonString(branch.branchno),
//     street: parseJsonString(branch.street),
//     city: parseJsonString(branch.city),
//     postcode: parseJsonString(branch.postcode),
//     image: branch.image ? branch.image.replace(/\\/g, "/") : null, // Normalize path
//   }));
// }

// // Helper function to parse JSON-encoded strings
// function parseJsonString(value) {
//   try {
//     const parsed = JSON.parse(value);
//     return Array.isArray(parsed) ? parsed[0] : parsed;
//   } catch {
//     return value;
//   }
// }

// // Function to fetch branches with optional search and max parameters
// export async function fetchBranches({ signal, searchTerm, max }) {
//   const url = new URL(BASE_URL);
//   const params = new URLSearchParams();
//   if (searchTerm) params.append("search", searchTerm);
//   if (max) params.append("max", max);
//   url.search = params.toString();

//   try {
//     const response = await fetch(url, { signal });
//     if (!response.ok) {
//       const errorInfo = await response.json();
//       throw new Error(
//         `Error ${response.status}: ${
//           errorInfo.message || "Failed to fetch branches"
//         }`
//       );
//     }
//     const data = await response.json();
//     console.log("Raw branch data:", data); // Debugging line
//     if (!Array.isArray(data.branches))
//       throw new Error("Branches data is missing or not an array");
//     const parsedData = parseBranchData(data.branches);
//     console.log("Parsed branch data:", parsedData); // Debugging line
//     return parsedData;
//   } catch (error) {
//     console.error("Failed to fetch branches:", error);
//     throw error;
//   }
// }

// // Function to create a new branch with FormData
// // Function to create a new branch with FormData
// export async function createNewBranch(branchData) {
//   try {
//     const response = await fetch(BASE_URL, {
//       method: "POST",
//       body: branchData, // FormData should be sent as is
//     });

//     if (!response.ok) {
//       const errorInfo = await response.json();
//       throw new Error(
//         `Error ${response.status}: ${
//           errorInfo.message || "Failed to create branch"
//         }`
//       );
//     }

//     const data = await response.json();
//     if (!data.branch) throw new Error("Branch data is missing");
//     return data.branch;
//   } catch (error) {
//     console.error("Failed to create new branch:", error);
//     throw error;
//   }
// }

// // Function to update a branch with FormData
// // Function to update a branch with FormData
// export const updateBranch = async ({ branchno, branchData }) => {
//   try {
//     const response = await fetch(`${BASE_URL}/${branchno}`, {
//       method: "PATCH",
//       body: branchData, // FormData should be sent as is
//     });

//     if (!response.ok) {
//       const errorInfo = await response.json();
//       throw new Error(
//         `Error ${response.status}: ${
//           errorInfo.message || "Failed to update branch"
//         }`
//       );
//     }

//     const data = await response.json();
//     return data;
//   } catch (error) {
//     console.error("Failed to update branch:", error);
//     throw error;
//   }
// };

// // Function to fetch a single branch by branch number
// export async function fetchBranch({ signal, branchno }) {
//   try {
//     const response = await fetch(`${BASE_URL}/${branchno}`, { signal });
//     if (!response.ok) {
//       throw new Error(`Error ${response.status}: Failed to fetch branch data`);
//     }
//     const data = await response.json();
//     console.log("Fetched branch data:", data); // Debugging line
//     return data;
//   } catch (error) {
//     console.error("Failed to fetch branch:", error);
//     throw error;
//   }
// }

// export async function deleteBranch({ branchno }) {
//   try {
//     const response = await fetch(`${BASE_URL}/${branchno}`, {
//       method: "DELETE",
//     });

//     if (!response.ok) {
//       const errorInfo = await response.json();
//       throw new Error(
//         `Error ${response.status}: ${
//           errorInfo.message || "Failed to delete branch"
//         }`
//       );
//     }

//     return await response.json();
//   } catch (error) {
//     console.error("Failed to delete branch:", error);
//     throw error;
//   }
// }

// // http.js

// export async function fetchAuditLogs({ signal }) {
//   try {
//     const response = await fetch(`${AUDIT_LOGS_URL}`, { signal });

//     if (!response.ok) {
//       throw new Error(`HTTP error! Status: ${response.status}`);
//     }

//     const data = await response.json();

//     if (!Array.isArray(data.logs[0])) {
//       throw new Error(
//         "Audit logs data is missing or not in the expected format"
//       );
//     }

//     // Extract logs from the response
//     const logs = data.logs[0];

//     // Return logs directly as they are already sorted
//     return logs;
//   } catch (error) {
//     if (error.name === "AbortError") {
//       console.log("Fetch request was aborted");
//     } else {
//       console.error("Failed to fetch audit logs:", error);
//     }
//     throw error;
//   }
// }

import { QueryClient } from "@tanstack/react-query";

const BASE_URL = "http://localhost:3000/api/branches";
const AUDIT_LOGS_URL = "http://localhost:3000/api/branches/audit-logs";

export const queryClient = new QueryClient();

function parseBranchData(branches) {
  return branches.map((branch) => ({
    branchno: parseJsonString(branch.branchno),
    street: parseJsonString(branch.street),
    city: parseJsonString(branch.city),
    postcode: parseJsonString(branch.postcode),
    image: branch.image ? branch.image.replace(/\\/g, "/") : null, // Normalize path
  }));
}

// Helper function to parse JSON-encoded strings
function parseJsonString(value) {
  try {
    const parsed = JSON.parse(value);
    return Array.isArray(parsed) ? parsed[0] : parsed;
  } catch {
    return value;
  }
}

// Function to fetch branches with optional search and max parameters
export async function fetchBranches({ signal, searchTerm, max }) {
  const url = new URL(BASE_URL);
  const params = new URLSearchParams();
  if (searchTerm) params.append("search", searchTerm);
  if (max) params.append("max", max);
  url.search = params.toString();

  try {
    const response = await fetch(url, { signal });
    if (!response.ok) {
      const errorInfo = await response.json();
      throw new Error(
        `Error ${response.status}: ${
          errorInfo.message || "Failed to fetch branches"
        }`
      );
    }
    const data = await response.json();
    console.log("Raw branch data:", data); // Debugging line
    if (!Array.isArray(data.branches))
      throw new Error("Branches data is missing or not an array");
    const parsedData = parseBranchData(data.branches);
    console.log("Parsed branch data:", parsedData); // Debugging line
    return parsedData;
  } catch (error) {
    console.error("Failed to fetch branches:", error);
    throw error;
  }
}

// Function to create a new branch with FormData
// Function to create a new branch with FormData
export async function createNewBranch(branchData) {
  try {
    const response = await fetch(BASE_URL, {
      method: "POST",
      body: branchData, // FormData should be sent as is
    });

    if (!response.ok) {
      const errorInfo = await response.json();
      throw new Error(
        `Error ${response.status}: ${
          errorInfo.message || "Failed to create branch"
        }`
      );
    }

    const data = await response.json();
    if (!data.branch) throw new Error("Branch data is missing");
    return data.branch;
  } catch (error) {
    console.error("Failed to create new branch:", error);
    throw error;
  }
}

// Function to update a branch with FormData
// Function to update a branch with FormData
export const updateBranch = async ({ branchno, branchData }) => {
  try {
    const response = await fetch(`${BASE_URL}/${branchno}`, {
      method: "PATCH",
      body: branchData, // FormData should be sent as is
    });

    if (!response.ok) {
      const errorInfo = await response.json();
      throw new Error(
        `Error ${response.status}: ${
          errorInfo.message || "Failed to update branch"
        }`
      );
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Failed to update branch:", error);
    throw error;
  }
};

// Function to fetch a single branch by branch number
export async function fetchBranch({ signal, branchno }) {
  try {
    const response = await fetch(`${BASE_URL}/${branchno}`, { signal });
    if (!response.ok) {
      throw new Error(`Error ${response.status}: Failed to fetch branch data`);
    }
    const data = await response.json();
    console.log("Fetched branch data:", data); // Debugging line
    return data;
  } catch (error) {
    console.error("Failed to fetch branch:", error);
    throw error;
  }
}

export async function deleteBranch({ branchno }) {
  try {
    const response = await fetch(`${BASE_URL}/${branchno}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      const errorInfo = await response.json();
      throw new Error(
        `Error ${response.status}: ${
          errorInfo.message || "Failed to delete branch"
        }`
      );
    }

    return await response.json();
  } catch (error) {
    console.error("Failed to delete branch:", error);
    throw error;
  }
}

// http.js

export async function fetchAuditLogs({ signal }) {
  try {
    const response = await fetch(`${AUDIT_LOGS_URL}`, { signal });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();

    if (!Array.isArray(data.logs[0])) {
      throw new Error(
        "Audit logs data is missing or not in the expected format"
      );
    }

    // Extract logs from the response
    const logs = data.logs[0];

    // Return logs directly as they are already sorted
    return logs;
  } catch (error) {
    if (error.name === "AbortError") {
      console.log("Fetch request was aborted");
    } else {
      console.error("Failed to fetch audit logs:", error);
    }
    throw error;
  }
}

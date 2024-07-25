// import {
//   Navigate,
//   RouterProvider,
//   createBrowserRouter,
// } from "react-router-dom";
// import { QueryClientProvider } from "@tanstack/react-query";

// import Branches from "./components/Branches/Branches.jsx"; // Adjust path if needed
// import BranchDetails from "./components/Branches/BranchDetails.jsx"; // Adjust path if needed
// import NewBranch from "./components/Branches/NewBranch.jsx"; // Adjust path if needed
// import EditBranch from "./components/Branches/EditBranch.jsx"; // Adjust path if needed
// import { queryClient } from "./util/http.js";

// const router = createBrowserRouter([
//   {
//     path: "/",
//     element: <Navigate to="/branches" />,
//   },
//   {
//     path: "/branches",
//     element: <Branches />,
//     children: [
//       {
//         path: "/branches/new",
//         element: <NewBranch />,
//       },
//     ],
//   },
//   {
//     path: "/branches/:branchno",
//     element: <BranchDetails />,
//     children: [
//       {
//         path: "/branches/:branchno/edit",
//         element: <EditBranch />,
//       },
//     ],
//   },
// ]);

// function App() {
//   return (
//     <QueryClientProvider client={queryClient}>
//       <RouterProvider router={router} />
//     </QueryClientProvider>
//   );
// }

// export default App;

import {
  Navigate,
  RouterProvider,
  createBrowserRouter,
} from "react-router-dom";
import { QueryClientProvider } from "@tanstack/react-query";

import Branches from "./components/Branches/Branches.jsx"; // Adjust path if needed
import BranchDetails from "./components/Branches/BranchDetails.jsx"; // Adjust path if needed
import NewBranch from "./components/Branches/NewBranch.jsx"; // Adjust path if needed
import EditBranch, {
  loader as editBranchLoader,
  action as editBranchAction,
} from "./components/Branches/EditBranch.jsx"; // Adjust path if needed
import BranchAuditLog from "./components/Branches/BranchAuditLog.jsx"; // Adjust path if needed
import { queryClient } from "./util/http.js";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Navigate to="/branches" />,
  },
  {
    path: "/branches",
    element: <Branches />,
    children: [
      {
        path: "/branches/new",
        element: <NewBranch />,
      },
    ],
  },
  {
    path: "/branches/:branchno",
    element: <BranchDetails />,
    children: [
      {
        path: "/branches/:branchno/edit",
        element: <EditBranch />,
        loader: editBranchLoader,
        action: editBranchAction,
      },
    ],
  },
  {
    path: "/audit-log",
    element: <BranchAuditLog />,
  },
]);

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  );
}

export default App;

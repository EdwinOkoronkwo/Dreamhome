// import { Link, Outlet } from "react-router-dom";

// import Header from "../Header.jsx";
// import BranchesIntroSection from "./BranchesIntroSection.jsx";
// import FindBranchSection from "./FindBranchSection.jsx";
// import NewBranchesSection from "./NewBranchesSection.jsx";

// export default function Branches() {
//   return (
//     <>
//       <Outlet />
//       <Header>
//         <Link to="/branches/new" className="button">
//           New Branch
//         </Link>
//       </Header>
//       <main>
//         <BranchesIntroSection />
//         <NewBranchesSection />
//         <FindBranchSection />
//       </main>
//     </>
//   );
// }

import { Link, Outlet } from "react-router-dom";

import Header from "../Header.jsx";
import BranchesIntroSection from "./BranchesIntroSection.jsx";
import FindBranchSection from "./FindBranchSection.jsx";
import NewBranchesSection from "./NewBranchesSection.jsx";

export default function Branches() {
  return (
    <>
      <Outlet />
      <Header>
        <Link to="/branches/new" className="button">
          New Branch
        </Link>
        <Link to="/audit-log" className="button">
          Audit Log
        </Link>
      </Header>
      <main>
        <BranchesIntroSection />
        <NewBranchesSection />
        <FindBranchSection />
      </main>
    </>
  );
}

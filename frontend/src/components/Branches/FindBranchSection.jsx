import { useRef, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchBranches, parseBranchData } from "../../util/http";
import LoadingIndicator from "../UI/LoadingIndicator";
import ErrorBlock from "../UI/ErrorBlock";
import BranchItem from "./BranchItem";

export default function FindBranchSection() {
  const searchElement = useRef();
  const [searchTerm, setSearchTerm] = useState("");

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["branches", { search: searchTerm }],
    queryFn: ({ signal }) => fetchBranches({ signal, searchTerm }),
    enabled: searchTerm.trim() !== "",
  });

  // const [searchTerm, setSearchTerm] = useState("");

  // const { data, isLoading, isError, error } = useQuery({
  //   queryKey: ["branches", { searchTerm }],
  //   queryFn: ({ signal, queryKey }) =>
  //     fetchBranches({ signal, ...queryKey[1] }),
  //   enabled: searchTerm.trim() !== "", // Only fetch if searchTerm is not empty
  // });

  // // Log the data to inspect its shape
  // console.log("Fetched branch data:", data);

  function handleSubmit(event) {
    event.preventDefault();
    setSearchTerm(searchElement.current.value);
  }

  let content = <p>Please enter a search term to find branches.</p>;

  if (isLoading) {
    content = <LoadingIndicator />;
  }

  if (isError) {
    content = (
      <ErrorBlock
        title="An error occurred"
        message={error.info?.message || "Failed to fetch branches"}
      />
    );
  }

  if (data) {
    const parsedData = parseBranchData(data); //
    content = (
      <ul className="branches-list">
        {parsedData.map((branch) => (
          <li key={branch.branchno}>
            <BranchItem branch={branch} />
          </li>
        ))}
      </ul>
    );
  }

  return (
    <section className="content-section" id="all-branches-section">
      <header>
        <h2>Find your next branch!</h2>
        <form onSubmit={handleSubmit} id="search-form">
          <input
            type="search"
            placeholder="Search branches"
            ref={searchElement}
          />
          <button type="submit">Search</button>
        </form>
      </header>
      {content}
    </section>
  );
}

// const branches = Array.isArray(data) ? data : [data]; // Ensure it's an array
// if (branches.length === 0) {
//   content = <p>No branches found for your search term.</p>;
// } else {
//   const parsedData = parseBranchData(data); //
//   content = (
//     <ul className="branches-list">
//       {parsedData.map((branch) => (
//         <li key={branch.branchno}>
//           <BranchItem branch={branch} />
//         </li>
//       ))}
//     </ul>
//   );
// }

import { useQuery } from "@tanstack/react-query";
import LoadingIndicator from "../UI/LoadingIndicator.jsx";
import ErrorBlock from "../UI/ErrorBlock.jsx";
import BranchItem from "./BranchItem.jsx";
import { fetchBranches } from "../../util/http.js";

export default function NewBranchesSection() {
  const { data, isFetching, isError, error } = useQuery({
    queryKey: ["branches", { max: 3 }],
    queryFn: ({ signal, queryKey }) =>
      fetchBranches({ signal, ...queryKey[1] }),
    staleTime: 5000,
    onSuccess: (data) => {
      console.log("Fetched branch data:", data);
    },
  });

  let content;

  if (isFetching) {
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
    const parsedData = parseBranchData(data); // Parse the branch data here
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
    <section className="content-section" id="new-branches-section">
      <header>
        <h2>Recently added branches</h2>
      </header>
      {content}
    </section>
  );
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

// Function to parse branch data
function parseBranchData(branches) {
  return branches.map((branch) => ({
    branchno: parseJsonString(branch.branchno),
    street: parseJsonString(branch.street),
    city: parseJsonString(branch.city),
    postcode: parseJsonString(branch.postcode),
    image: branch.image ? branch.image.replace(/\\/g, "/") : null,
  }));
}

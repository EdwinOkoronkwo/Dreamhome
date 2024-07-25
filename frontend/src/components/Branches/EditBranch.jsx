// import { Link, useNavigate, useParams } from "react-router-dom";
// import { useMutation, useQuery } from "@tanstack/react-query";
// import Modal from "../UI/Modal.jsx";
// import BranchForm from "./BranchForm.jsx";
// import { fetchBranch, queryClient, updateBranch } from "../../util/http.js";
// import LoadingIndicator from "../UI/LoadingIndicator.jsx";
// import ErrorBlock from "../UI/ErrorBlock.jsx";

// export default function EditBranch() {
//   const navigate = useNavigate();
//   const params = useParams();
//   const branchno = params.branchno;

//   const { data, isLoading, isError, error } = useQuery({
//     queryKey: ["branch", branchno],
//     queryFn: ({ signal }) => fetchBranch({ signal, branchno }),
//     onError: (error) => {
//       if (error.name === "AbortError") {
//         console.log("Fetch aborted");
//       } else {
//         console.error("Failed to fetch branch:", error);
//       }
//     },
//   });

//   const { mutate } = useMutation({
//     mutationFn: updateBranch,
//     onMutate: async (newBranch) => {
//       const previousBranch = queryClient.getQueryData(["branch", branchno]);

//       queryClient.setQueryData(["branch", branchno], {
//         ...previousBranch,
//         ...newBranch.branchData,
//       });

//       return { previousBranch };
//     },
//     onError: (err, newBranch, context) => {
//       queryClient.setQueryData(["branch", branchno], context.previousBranch);
//     },
//     onSuccess: () => {
//       queryClient.invalidateQueries(["branch", branchno]);
//     },
//     onSettled: () => {
//       queryClient.invalidateQueries(["branch", branchno]);
//     },
//   });

//   function handleSubmit(formData) {
//     mutate(
//       {
//         branchno,
//         branchData: formData,
//       },
//       {
//         onSuccess: () => {
//           navigate("../");
//         },
//       }
//     );
//   }

//   function handleClose() {
//     navigate("../");
//   }

//   let content;

//   if (isLoading) {
//     content = (
//       <div className="center">
//         <LoadingIndicator />
//       </div>
//     );
//   }

//   if (isError) {
//     content = (
//       <>
//         <ErrorBlock
//           title="Failed to load branch"
//           message={
//             error.info?.message ||
//             "Failed to load branch. Please check your inputs and try again later."
//           }
//         />
//         <div>
//           <Link to="../" className="button">
//             Okay
//           </Link>
//         </div>
//       </>
//     );
//   }

//   if (data) {
//     content = (
//       <BranchForm inputData={data} onSubmit={handleSubmit}>
//         <Link to="../" className="button-text">
//           Cancel
//         </Link>
//         <button type="submit" className="button">
//           Update
//         </button>
//       </BranchForm>
//     );
//   }

//   return <Modal onClose={handleClose}>{content}</Modal>;
// }

// function parseJsonString(value) {
//   try {
//     const parsed = JSON.parse(value);
//     return Array.isArray(parsed) ? parsed[0] : parsed;
//   } catch {
//     return value;
//   }
// }

// function parseBranchData(branches) {
//   return branches.map((branch) => ({
//     branchno: parseJsonString(branch.branchno),
//     street: parseJsonString(branch.street),
//     city: parseJsonString(branch.city),
//     postcode: parseJsonString(branch.postcode),
//     image: branch.image ? branch.image.replace(/\\/g, "/") : null,
//   }));
// }

//////////////////////////////////////////////////////////////////////////////////
// import {
//   Link,
//   redirect,
//   useNavigate,
//   useParams,
//   useSubmit,
// } from "react-router-dom";
// import { useMutation, useQuery } from "@tanstack/react-query";
// import Modal from "../UI/Modal.jsx";
// import BranchForm from "./BranchForm.jsx";
// import { fetchBranch, queryClient, updateBranch } from "../../util/http.js";
// import ErrorBlock from "../UI/ErrorBlock.jsx";

// export default function EditBranch() {
//   const navigate = useNavigate();
//   const params = useParams();
//   const { state } = useParams();
//   const branchno = params.branchno;
//   const submit = useSubmit();

//   const { data, isError, error } = useQuery({
//     queryKey: ["branch", branchno],
//     queryFn: ({ signal }) => fetchBranch({ signal, branchno }),
//     staleTime: 10000,
//     onError: (error) => {
//       if (error.name === "AbortError") {
//         console.log("Fetch aborted");
//       } else {
//         console.error("Failed to fetch branch:", error);
//       }
//     },
//   });

//   const { mutate } = useMutation({
//     mutationFn: updateBranch,
//     onMutate: async (newBranch) => {
//       const previousBranch = queryClient.getQueryData(["branch", branchno]);

//       queryClient.setQueryData(["branch", branchno], {
//         ...previousBranch,
//         ...newBranch.branchData,
//       });

//       return { previousBranch };
//     },
//     onError: (err, newBranch, context) => {
//       queryClient.setQueryData(["branch", branchno], context.previousBranch);
//     },
//     onSuccess: () => {
//       queryClient.invalidateQueries(["branch", branchno]);
//     },
//     onSettled: () => {
//       queryClient.invalidateQueries(["branch", branchno]);
//     },
//   });

//   function handleSubmit(formData) {
//     submit(formData, { method: "PATCH" });
//     mutate(
//       {
//         branchno,
//         branchData: formData,
//       },
//       {
//         onSuccess: () => {
//           navigate("../");
//         },
//       }
//     );
//   }

//   function handleClose() {
//     navigate("../");
//   }

//   let content;

//   if (isError) {
//     content = (
//       <>
//         <ErrorBlock
//           title="Failed to load branch"
//           message={
//             error.info?.message ||
//             "Failed to load branch. Please check your inputs and try again later."
//           }
//         />
//         <div>
//           <Link to="../" className="button">
//             Okay
//           </Link>
//         </div>
//       </>
//     );
//   }

//   if (data) {
//     const parsedData = parseSingleBranch(data);

//     content = (
//       <BranchForm inputData={parsedData} onSubmit={handleSubmit}>
//         {state === "submitting" ? (
//           <p>Sending data..</p>
//         ) : (
//           <>
//             <Link to="../" className="button-text">
//               Cancel
//             </Link>
//             <button type="submit" className="button">
//               Update
//             </button>
//           </>
//         )}
//       </BranchForm>
//     );
//   }

//   return <Modal onClose={handleClose}>{content}</Modal>;
// }

// function parseJsonString(value) {
//   try {
//     const parsed = JSON.parse(value);
//     return Array.isArray(parsed) ? parsed[0] : parsed;
//   } catch {
//     return value;
//   }
// }

// function parseSingleBranch(branch) {
//   return {
//     branchno: parseJsonString(branch.branchno),
//     street: parseJsonString(branch.street),
//     city: parseJsonString(branch.city),
//     postcode: parseJsonString(branch.postcode),
//     image: branch.image ? branch.image.replace(/\\/g, "/") : null,
//   };
// }

// export function loader({ params }) {
//   return queryClient.fetchQuery({
//     queryKey: ["branch", params.branchno],
//     queryFn: ({ signal }) => fetchBranch({ signal, branchno: params.branchno }),
//   });
// }

// export async function action({ request, params }) {
//   const formData = await request.formData();
//   const updatedBranchData = Object.fromEntries(formData);
//   await updateBranch({ branchno: params.branchno, branch: updatedBranchData });
//   await queryClient.invalidateQueries(["branches"]);
//   return redirect("../");
// }

////////////////////////////////////////////////////////////////////////////////////////////////////
import {
  Link,
  useNavigate,
  useParams,
  useSubmit,
  useLoaderData,
  useNavigation,
  redirect,
} from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import Modal from "../UI/Modal.jsx";
import BranchForm from "./BranchForm.jsx";
import { updateBranch } from "../../util/http.js";
import ErrorBlock from "../UI/ErrorBlock.jsx";

export default function EditBranch() {
  const navigate = useNavigate();
  const params = useParams();
  const branchno = params.branchno;
  const submit = useSubmit();
  const queryClient = useQueryClient();
  const navigation = useNavigation();

  // Fetch the initial data using the loader
  const data = useLoaderData();

  const { mutate } = useMutation({
    mutationFn: updateBranch,
    onMutate: async (newBranch) => {
      const previousBranch = queryClient.getQueryData(["branch", branchno]);

      queryClient.setQueryData(["branch", branchno], {
        ...previousBranch,
        ...newBranch.branchData,
      });

      return { previousBranch };
    },
    onError: (err, newBranch, context) => {
      queryClient.setQueryData(["branch", branchno], context.previousBranch);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["branch", branchno]);
    },
    onSettled: () => {
      queryClient.invalidateQueries(["branch", branchno]);
    },
  });

  function handleSubmit(formData) {
    submit(formData, { method: "PATCH" });
    mutate(
      {
        branchno,
        branchData: formData,
      },
      {
        onSuccess: () => {
          navigate("../");
        },
      }
    );
  }

  function handleClose() {
    navigate("../");
  }

  let content;

  if (!data) {
    content = (
      <>
        <ErrorBlock
          title="Failed to load branch"
          message="Failed to load branch. Please check your inputs and try again later."
        />
        <div>
          <Link to="../" className="button">
            Okay
          </Link>
        </div>
      </>
    );
  } else {
    const parsedData = parseSingleBranch(data);

    content = (
      <BranchForm inputData={parsedData} onSubmit={handleSubmit}>
        {navigation.state === "submitting" ? (
          <p>Sending data...</p>
        ) : (
          <>
            <Link to="../" className="button-text">
              Cancel
            </Link>
            <button type="submit" className="button">
              Update
            </button>
          </>
        )}
      </BranchForm>
    );
  }

  return <Modal onClose={handleClose}>{content}</Modal>;
}

function parseJsonString(value) {
  try {
    const parsed = JSON.parse(value);
    return Array.isArray(parsed) ? parsed[0] : parsed;
  } catch {
    return value;
  }
}

function parseSingleBranch(branch) {
  return {
    branchno: parseJsonString(branch.branchno),
    street: parseJsonString(branch.street),
    city: parseJsonString(branch.city),
    postcode: parseJsonString(branch.postcode),
    image: branch.image ? branch.image.replace(/\\/g, "/") : null,
  };
}

import { fetchBranch, queryClient } from "../../util/http.js";

export function loader({ params }) {
  return queryClient.fetchQuery({
    queryKey: ["branch", params.branchno],
    queryFn: ({ signal }) => fetchBranch({ signal, branchno: params.branchno }),
  });
}

export async function action({ request, params }) {
  const formData = await request.formData();
  const updatedBranchData = Object.fromEntries(formData);

  await updateBranch({
    branchno: params.branchno,
    branchData: updatedBranchData,
  });
  await queryClient.invalidateQueries(["branches"]);
  await queryClient.invalidateQueries(["branch", params.branchno]);

  return redirect("../");
}

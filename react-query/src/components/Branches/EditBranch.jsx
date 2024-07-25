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
import { Link, useNavigate, useParams } from "react-router-dom";
import { useMutation, useQuery } from "@tanstack/react-query";
import Modal from "../UI/Modal.jsx";
import BranchForm from "./BranchForm.jsx";
import { fetchBranch, queryClient, updateBranch } from "../../util/http.js";
import LoadingIndicator from "../UI/LoadingIndicator.jsx";
import ErrorBlock from "../UI/ErrorBlock.jsx";

export default function EditBranch() {
  const navigate = useNavigate();
  const params = useParams();
  const branchno = params.branchno;

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["branch", branchno],
    queryFn: ({ signal }) => fetchBranch({ signal, branchno }),
    onError: (error) => {
      if (error.name === "AbortError") {
        console.log("Fetch aborted");
      } else {
        console.error("Failed to fetch branch:", error);
      }
    },
  });

  // const { mutate } = useMutation({
  //   mutationFn: updateBranch,
  //   onMutate: async (data) => {
  //     const newBranch = data.branch;
  //     await queryClient.cancelQueries({
  //       queryKey: ["branches", params.branchno],
  //     });
  //     queryClient.setQueryData(["branches", params.branchno], newBranch);
  //   },
  // });

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

  if (isLoading) {
    content = (
      <div className="center">
        <LoadingIndicator />
      </div>
    );
  }

  if (isError) {
    content = (
      <>
        <ErrorBlock
          title="Failed to load branch"
          message={
            error.info?.message ||
            "Failed to load branch. Please check your inputs and try again later."
          }
        />
        <div>
          <Link to="../" className="button">
            Okay
          </Link>
        </div>
      </>
    );
  }

  if (data) {
    const parsedData = parseSingleBranch(data); // Parse the branch data

    content = (
      <BranchForm inputData={parsedData} onSubmit={handleSubmit}>
        <Link to="../" className="button-text">
          Cancel
        </Link>
        <button type="submit" className="button">
          Update
        </button>
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

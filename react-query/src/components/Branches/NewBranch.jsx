import { Link, useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import Modal from "../UI/Modal.jsx";
import BranchForm from "./BranchForm.jsx";
import ErrorBlock from "../UI/ErrorBlock.jsx";
import { createNewBranch, queryClient } from "../../util/http.js";

export default function NewBranch() {
  const navigate = useNavigate();

  const { mutate, isLoading, isError, error } = useMutation({
    mutationFn: createNewBranch,
    onSuccess: () => {
      queryClient.invalidateQueries(["branches"]);
      navigate("/branches");
    },
  });

  function handleSubmit(formData) {
    // Log formData to verify the data being sent
    for (let [key, value] of formData.entries()) {
      console.log(`${key}: ${value}`);
    }

    mutate(formData);
  }

  return (
    <Modal onClose={() => navigate("../")}>
      <BranchForm onSubmit={handleSubmit}>
        {isLoading && "Submitting..."}
        {!isLoading && (
          <>
            <Link to="../" className="button-text">
              Cancel
            </Link>
            <button type="submit" className="button">
              Create
            </button>
          </>
        )}
      </BranchForm>
      {isError && (
        <ErrorBlock
          title="Failed to create branch"
          message={
            error.info?.message ||
            "Failed to create branch. Please check your input and try again."
          }
        />
      )}
    </Modal>
  );
}

// import { Link, useNavigate } from "react-router-dom";
// import { useMutation } from "@tanstack/react-query";
// import Modal from "../UI/Modal.jsx";
// import BranchForm from "./BranchForm.jsx";
// import ErrorBlock from "../UI/ErrorBlock.jsx";
// import { createNewBranch, queryClient } from "../../util/http.js";

// export default function NewBranch() {
//   const navigate = useNavigate();

//   const { mutate, isLoading, isError, error } = useMutation({
//     mutationFn: createNewBranch,
//     onSuccess: () => {
//       queryClient.invalidateQueries(["branches"]);
//       navigate("/branches");
//     },
//   });

//   function handleSubmit(formData) {
//     const sanitizedFormData = new FormData();

//     for (const key in formData) {
//       if (Object.prototype.hasOwnProperty.call(formData, key)) {
//         sanitizedFormData.append(key, formData[key]);
//       }
//     }

//     mutate(sanitizedFormData);
//   }

//   return (
//     <Modal onClose={() => navigate("../")}>
//       <BranchForm onSubmit={handleSubmit}>
//         {isLoading && "Submitting..."}
//         {!isLoading && (
//           <>
//             <Link to="../" className="button-text">
//               Cancel
//             </Link>
//             <button type="submit" className="button">
//               Create
//             </button>
//           </>
//         )}
//       </BranchForm>
//       {isError && (
//         <ErrorBlock
//           title="Failed to create branch"
//           message={
//             error.info?.message ||
//             "Failed to create branch. Please check your input and try again."
//           }
//         />
//       )}
//     </Modal>
//   );
// }

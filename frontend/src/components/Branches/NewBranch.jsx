import { Link, useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import Modal from "../UI/Modal.jsx";
import BranchForm from "./BranchForm.jsx";
import ErrorBlock from "../UI/ErrorBlock.jsx";
import { createNewBranch, queryClient } from "../../util/http.js";

export default function NewBranch() {
  const navigate = useNavigate();

  const { mutate, isPending, isError, error } = useMutation({
    mutationFn: createNewBranch,
    onSuccess: () => {
      queryClient.invalidateQueries(["branches"]);
      navigate("/branches");
    },
  });

  function handleSubmit(formData) {
    mutate(formData);
  }

  return (
    <Modal onClose={() => navigate("../")}>
      <BranchForm onSubmit={handleSubmit}>
        {isPending && "Submitting..."}
        {!isPending && (
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

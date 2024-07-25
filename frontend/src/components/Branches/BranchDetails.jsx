import React, { useState } from "react";
import { Link, Outlet, useNavigate, useParams } from "react-router-dom";
import { useQuery, useMutation } from "@tanstack/react-query";
import { deleteBranch, fetchBranch, queryClient } from "../../util/http.js";
import ErrorBlock from "../UI/ErrorBlock.jsx";
import Modal from "../UI/Modal.jsx";
import BranchesIntroSection from "./BranchesIntroSection.jsx";
import Header from "../Header.jsx";

const BranchDetails = () => {
  const [isDeleting, setIsDeleting] = useState(false);
  const params = useParams();
  const navigate = useNavigate();
  const branchno = params.branchno;

  const { data, isFetching, isError, error } = useQuery({
    queryKey: ["branch", branchno],
    queryFn: ({ signal }) => fetchBranch({ branchno, signal }),
    onError: (error) => {
      if (error.name === "AbortError") {
        console.log("Fetch aborted");
      } else {
        console.error("Failed to fetch branch:", error);
      }
    },
  });
  // const {
  //   mutate: deleteBranchMutation,
  //   isLoading: isDeletingBranch,
  //   isError: isErrorDeleting,
  //   error: deleteError,
  // } = useMutation({
  //   mutationFn: deleteBranch,
  //   onSuccess: () => {
  //     queryClient.invalidateQueries(["branches"]);

  //     navigate("/branches");
  //   },
  // });

  const {
    mutate: deleteBranchMutation,
    isLoading: isDeletingBranch,
    isError: isErrorDeleting,
    error: deleteError,
  } = useMutation({
    mutationFn: deleteBranch,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["branches"],
        refetchType: "none",
      });
      navigate("/branches");
    },
  });

  const handleStartDelete = () => setIsDeleting(true);
  const handleStopDelete = () => setIsDeleting(false);
  const handleDelete = () => deleteBranchMutation({ branchno });

  let content;

  if (isFetching) {
    content = (
      <div id="branch-details-content" className="center">
        Fetching branch data...
      </div>
    );
  } else if (isError) {
    content = (
      <div id="branch-details-content" className="center">
        <ErrorBlock
          title="Failed to load branch"
          message={
            error.info?.message ||
            "Failed to fetch branch data, please try again later."
          }
        />
      </div>
    );
  } else if (data) {
    content = (
      <>
        <div id="branch-details-content" className="branch-details">
          <div className="branch-header">
            <h1 className="branch-title">
              {data.branchno} {data.city}
            </h1>
            <nav className="branch-actions">
              <button
                onClick={handleStartDelete}
                className="button delete-button"
              >
                Delete
              </button>
              <Link to="edit" className="button edit-button">
                Edit
              </Link>
            </nav>
          </div>
          {data.image ? (
            <img
              src={`http://localhost:3000${data.image.replace(/\\/g, "/")}`}
              alt={data.branchno}
              className="branch-image"
            />
          ) : (
            <p>No image available</p>
          )}
          <div id="branch-details-info">
            <div>
              <p id="branch-details-location">{data.street}</p>
              <p>{data.postcode}</p>
            </div>
            <p id="branch-details-description">{data.city}</p>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <Header>
        <Link to="/branches" className="button">
          Back to Branches
        </Link>
      </Header>
      <main className="content-section">
        <BranchesIntroSection>
          <div className="intro-section-top">
            <h1 className="intro-title">Dream Home</h1>
            <div className="intro-buttons">
              <button onClick={handleStartDelete} className="button">
                Delete
              </button>
              <Link to={`/branches/${branchno}/edit`} className="button">
                Edit
              </Link>
            </div>
          </div>
        </BranchesIntroSection>
        {isDeleting && (
          <Modal onClose={handleStopDelete}>
            <h2>Are you sure?</h2>
            <p>Do you really want to delete? This action cannot be undone.</p>
            <div className="form-actions">
              {isDeletingBranch && <p>Deleting, please wait...</p>}
              {!isDeletingBranch && (
                <>
                  <button onClick={handleStopDelete} className="button-text">
                    Cancel
                  </button>
                  <button onClick={handleDelete} className="button">
                    Delete
                  </button>
                </>
              )}
            </div>
            {isErrorDeleting && (
              <ErrorBlock
                title="Failed to delete branch"
                message={
                  deleteError.info?.message ||
                  "Failed to delete branch, please try again later"
                }
              />
            )}
          </Modal>
        )}
        {content}
        <Outlet />
      </main>
    </>
  );
};

export default BranchDetails;

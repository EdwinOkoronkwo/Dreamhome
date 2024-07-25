import { Link } from "react-router-dom";

export default function BranchItem({ branch }) {
  const imageUrl = branch.image
    ? `http://localhost:3000${branch.image.replace(/\\/g, "/")}`
    : "default_image_path_here";

  return (
    <article className="branch-item">
      <img src={imageUrl} alt={branch.street || "No image available"} />
      <div className="branch-item-content">
        <div>
          <h2>{branch.street}</h2>
          <p className="branch-item-city">{branch.city}</p>
          <p className="branch-item-postcode">{branch.postcode}</p>
        </div>
        <p>
          <Link to={`/branches/${branch.branchno}`} className="button">
            View Details
          </Link>
        </p>
      </div>
    </article>
  );
}

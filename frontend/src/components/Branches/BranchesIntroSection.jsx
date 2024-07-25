import { Link } from "react-router-dom";

import branchesImg from "../../assets/meetup.jpg"; // Update with the correct path to your image

export default function BranchesIntroSection() {
  return (
    <section
      id="overview-section"
      style={{ backgroundImage: `url(${branchesImg})` }} // Update with the correct path to your image
    >
      <h2>
        Discover and explore amazing branches <br />
        or <strong>find a new opportunity</strong>
      </h2>
      <p>Anyone can explore and join branches on Dream Home Branches!</p>
      <p>
        <Link to="/branches/new" className="button">
          Create your first branch
        </Link>
      </p>
    </section>
  );
}

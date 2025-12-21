import { Link } from "react-router-dom";
import { GoChevronLeft } from "react-icons/go";
// import { MdArrowOutward } from "react-icons/md";

export const ClientPage = () => {
  return (
    <div className="information-page">
      <div className="nav-terug-wrapper">
        {" "}
        <Link to="/">
          <div className="nav-terug">
            <GoChevronLeft />
            <p>Terug</p>
          </div>
        </Link>
      </div>
    </div>
  );
};

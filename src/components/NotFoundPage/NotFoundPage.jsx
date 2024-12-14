import { Link } from "react-router-dom";

const NotFoundPage = () => {
  return (
    <div>
      404 Not Found!
      <Link to="/">Go Back</Link>
    </div>
  );
};

export default NotFoundPage;

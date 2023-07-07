import { Link } from "react-router-dom";
import PageNave from "../components/PageNave";

function Homepage() {
  return (
    <div>
      <PageNave /> <h2> home</h2>
      <Link to="/app">Go to the app </Link>
    </div>
  );
}

export default Homepage;

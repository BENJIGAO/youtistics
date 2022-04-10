import { Link } from "react-router-dom";
import AuthButton from "features/Home/AuthButton";
import HomeNavbar from "features/Home/Navbar";

const Home = () => {
  return (
    <div>
      <HomeNavbar />
      <h1>Home</h1>
      <nav>
        <Link to="/dashboard">Dashboard</Link>
      </nav>
      <AuthButton />
    </div>
  );
};

export default Home;

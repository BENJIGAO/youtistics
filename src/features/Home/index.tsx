import React from "react";
import { Link } from "react-router-dom";
import HomeNavbar from "features/Home/Navbar";
import AuthButton from "features/Home/AuthButton";

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

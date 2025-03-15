import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="p-4 bg-gray-800 text-white flex justify-between">
      <h1 className="text-2xl font-bold">CricTrackerPro</h1>
      <nav>
        <Link to="/" className="mr-4">Dashboard</Link>
        <Link to="/match-analytics" className="mr-4">Analytics</Link>
        <Link to="/login" className="mr-4">Login</Link>
      </nav>
    </header>
  );
};

export default Header;

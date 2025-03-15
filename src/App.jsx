import React from "react";
import { Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import MatchAnalytics from "./pages/MatchAnalytics";
import Header from "./components/Header";
import Footer from "./components/Footer";

const App = () => {
  return (
    <div className="bg-gray-900 text-white min-h-screen">
      <Header />
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/login" element={<Login />} />
        <Route path="/match-analytics" element={<MatchAnalytics />} />
      </Routes>
      <Footer />
    </div>
  );
};

export default App;

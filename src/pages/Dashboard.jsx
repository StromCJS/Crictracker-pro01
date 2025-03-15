import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useSelector } from "react-redux";
import API from "../utils/api";
import socket from "../utils/socket";

const Dashboard = () => {
  const user = useSelector((state) => state.user.user);
  const [matches, setMatches] = useState([]);

  useEffect(() => {
    const fetchMatches = async () => {
      try {
        const { data } = await API.get("/matches/live");
        setMatches(data);
      } catch (error) {
        console.error("Error fetching matches", error);
      }
    };
    fetchMatches();

    // Listen for live updates
    socket.on("matchUpdate", (updatedMatch) => {
      setMatches((prevMatches) =>
        prevMatches.map((match) =>
          match.id === updatedMatch.id ? updatedMatch : match
        )
      );
    });

    return () => socket.off("matchUpdate");
  }, []);

  return (
    <motion.div
      className="p-8 text-white bg-gray-900 min-h-screen"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <h1 className="text-3xl font-bold mb-4">Live Matches</h1>
      {matches.length === 0 ? (
        <p>No live matches right now.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {matches.map((match) => (
            <motion.div
              key={match.id}
              className="bg-gray-800 p-4 rounded-xl shadow-lg"
              whileHover={{ scale: 1.05 }}
            >
              <h2 className="text-xl font-bold">
                {match.teamA} vs {match.teamB}
              </h2>
              <p className="text-gray-300">Score: {match.score}</p>
              <p className="text-gray-400">Overs: {match.overs}</p>
              <p className="text-gray-500">Status: {match.status}</p>
            </motion.div>
          ))}
        </div>
      )}
    </motion.div>
  );
};

export default Dashboard;

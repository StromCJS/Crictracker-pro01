import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import API from "../utils/api";

const MatchAnalytics = () => {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const { data } = await API.get("/matches/analytics");
        setStats(data);
      } catch (error) {
        console.error("Error fetching analytics", error);
      }
    };
    fetchStats();
  }, []);

  return (
    <motion.div
      className="p-8 text-white bg-gray-900 min-h-screen"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <h1 className="text-3xl font-bold mb-4">Match Analytics</h1>
      {stats ? (
        <div className="bg-gray-800 p-4 rounded-xl">
          <p>Top Scorer: {stats.topScorer}</p>
          <p>Best Bowler: {stats.bestBowler}</p>
          <p>Team Performance: {stats.teamPerformance}</p>
        </div>
      ) : (
        <p>Loading analytics...</p>
      )}
    </motion.div>
  );
};

export default MatchAnalytics;

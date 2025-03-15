import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import axios from "axios";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const PlayerStats = () => {
  const [playerData, setPlayerData] = useState([]);

  useEffect(() => {
    const fetchPlayerStats = async () => {
      try {
        const response = await axios.get("http://localhost:5000/player-stats"); // Replace with actual API
        setPlayerData(response.data.players);
      } catch (error) {
        console.error("Error fetching player stats:", error);
      }
    };

    fetchPlayerStats();
    const interval = setInterval(fetchPlayerStats, 10000); // Update every 10 sec
    return () => clearInterval(interval);
  }, []);

  const chartData = {
    labels: playerData.map(player => player.name),
    datasets: [
      {
        label: "Runs",
        data: playerData.map(player => player.runs),
        backgroundColor: "blue",
      },
      {
        label: "Wickets",
        data: playerData.map(player => player.wickets),
        backgroundColor: "red",
      },
    ],
  };

  return (
    <div>
      <h2>Player Statistics</h2>
      <Bar data={chartData} />
    </div>
  );
};

export default PlayerStats;

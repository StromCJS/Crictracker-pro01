import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import axios from "axios";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const Graphs = () => {
  const [matchData, setMatchData] = useState([]);

  useEffect(() => {
    const fetchLiveScores = async () => {
      try {
        const response = await axios.get("http://localhost:5000/live-score"); // Replace with actual API
        const scores = response.data.matches.map(match => ({
          time: new Date().toLocaleTimeString(),
          runs: match.score ? match.score.runs : 0,
        }));
        setMatchData(prev => [...prev, ...scores].slice(-10)); // Keep last 10 data points
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    const interval = setInterval(fetchLiveScores, 5000); // Fetch every 5 sec
    return () => clearInterval(interval);
  }, []);

  const chartData = {
    labels: matchData.map(d => d.time),
    datasets: [
      {
        label: "Runs",
        data: matchData.map(d => d.runs),
        borderColor: "blue",
        borderWidth: 2,
        fill: false,
      },
    ],
  };

  return (
    <div>
      <h2>Live Match Score Graph</h2>
      <Line data={chartData} />
    </div>
  );
};

export default Graphs;

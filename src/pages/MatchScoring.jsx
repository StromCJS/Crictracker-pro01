import React, { useState, useEffect } from "react";
import axios from "axios";

const MatchScoring = ({ matchId }) => {
  const [score, setScore] = useState({ runs: 0, wickets: 0, overs: 0.0, balls: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchScore();
  }, []);

  const fetchScore = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/matches/${matchId}/score`);
      setScore(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching score:", error);
      setLoading(false);
    }
  };

  const updateScore = async (runs, isWicket) => {
    let newBalls = score.balls + 1;
    let newOvers = score.overs + (newBalls % 6 === 0 ? 0.1 : 0);
    let newScore = {
      runs: score.runs + runs,
      wickets: isWicket ? score.wickets + 1 : score.wickets,
      overs: parseFloat((Math.floor(score.overs) + newOvers).toFixed(1)),
      balls: newBalls % 6 === 0 ? 0 : newBalls
    };

    setScore(newScore);
    
    try {
      await axios.post(`http://localhost:5000/api/matches/${matchId}/update-score`, newScore);
    } catch (error) {
      console.error("Error updating score:", error);
    }
  };

  if (loading) return <p>Loading match score...</p>;

  return (
    <div className="match-scoring">
      <h2>Live Match Scoring</h2>
      <p><strong>Runs:</strong> {score.runs}</p>
      <p><strong>Wickets:</strong> {score.wickets}</p>
      <p><strong>Overs:</strong> {score.overs} ({score.balls} balls)</p>

      <div className="scoring-buttons">
        {[0, 1, 2, 3, 4, 6].map((runs) => (
          <button key={runs} onClick={() => updateScore(runs, false)}>
            {runs} Runs
          </button>
        ))}
        <button className="wicket-btn" onClick={() => updateScore(0, true)}>Wicket</button>
      </div>
    </div>
  );
};

export default MatchScoring;

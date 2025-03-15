import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Scoreboard() {
  const [score, setScore] = useState({
    teamA: 0,
    teamB: 0,
    overs: 0,
    wickets: 0,
  });

  useEffect(() => {
    axios.get('/api/score')
      .then(response => {
        setScore(response.data);
      })
      .catch(error => {
        console.error(error);
      });
  }, []);

  const handleScoreUpdate = (team, value) => {
    axios.post('/api/score', { team, value })
      .then(response => {
        setScore(response.data);
      })
      .catch(error => {
        console.error(error);
      });
  };

  return (
    <div>
      <h1>Scoreboard</h1>
      <p>Team A: {score.teamA}</p>
      <p>Team B: {score.teamB}</p>
      <p>Overs: {score.overs}</p>
      <p>Wickets: {score.wickets}</p>
      <button onClick={() => handleScoreUpdate('teamA', 1)}>Add 1 to Team A</button>
      <button onClick={() => handleScoreUpdate('teamB', 1)}>Add 1 to Team B</button>
      <button onClick={() => handleScoreUpdate('overs', 1)}>Add 1 over</button>
      <button onClick={() => handleScoreUpdate('wickets', 1)}>Add 1 wicket</button>
    </div>
  );
}

export default Scoreboard;
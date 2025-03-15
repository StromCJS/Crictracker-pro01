import React, { useState, useEffect } from 'react';
import axios from 'axios';

function MatchList() {
  const [matches, setMatches] = useState([]);

  useEffect(() => {
    axios.get('/api/matches')
      .then(response => {
        setMatches(response.data);
      })
      .catch(error => {
        console.error(error);
      });
  }, []);

  return (
    <div>
      <h1>Match List</h1>
      <ul>
        {matches.map(match => (
          <li key={match.id}>{match.teamA} vs {match.teamB}</li>
        ))}
      </ul>
    </div>
  );
}

export default MatchList;
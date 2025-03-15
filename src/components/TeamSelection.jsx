import React, { useState, useEffect } from "react";
import axios from "axios";

const TeamSelection = ({ onTeamSelect }) => {
  const [teams, setTeams] = useState([]);
  const [selectedTeam, setSelectedTeam] = useState("");
  const [players, setPlayers] = useState([]);

  useEffect(() => {
    // Fetch teams from API (Replace with your actual API)
    const fetchTeams = async () => {
      try {
        const response = await axios.get("http://localhost:5000/teams");
        setTeams(response.data.teams);
      } catch (error) {
        console.error("Error fetching teams:", error);
      }
    };

    fetchTeams();
  }, []);

  useEffect(() => {
    if (selectedTeam) {
      // Fetch players for the selected team
      const fetchPlayers = async () => {
        try {
          const response = await axios.get(`http://localhost:5000/teams/${selectedTeam}/players`);
          setPlayers(response.data.players);
          onTeamSelect(response.data.players);
        } catch (error) {
          console.error("Error fetching players:", error);
        }
      };

      fetchPlayers();
    }
  }, [selectedTeam, onTeamSelect]);

  return (
    <div>
      <h2>Select a Team</h2>
      <select value={selectedTeam} onChange={(e) => setSelectedTeam(e.target.value)}>
        <option value="">-- Select Team --</option>
        {teams.map((team) => (
          <option key={team.id} value={team.name}>
            {team.name}
          </option>
        ))}
      </select>

      {selectedTeam && (
        <div>
          <h3>Players in {selectedTeam}</h3>
          <ul>
            {players.map((player) => (
              <li key={player.id}>{player.name} - {player.role}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default TeamSelection;

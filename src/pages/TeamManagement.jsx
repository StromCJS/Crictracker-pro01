import React, { useState, useEffect } from "react";
import axios from "axios";

const TeamManagement = () => {
  const [teams, setTeams] = useState([]);
  const [newTeam, setNewTeam] = useState("");
  const [selectedTeam, setSelectedTeam] = useState(null);
  const [newPlayer, setNewPlayer] = useState({ name: "", role: "" });

  useEffect(() => {
    fetchTeams();
  }, []);

  const fetchTeams = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/teams");
      setTeams(response.data);
    } catch (error) {
      console.error("Error fetching teams:", error);
    }
  };

  const createTeam = async () => {
    if (!newTeam) return;
    try {
      const response = await axios.post("http://localhost:5000/api/teams", { name: newTeam });
      setTeams([...teams, response.data]);
      setNewTeam("");
    } catch (error) {
      console.error("Error creating team:", error);
    }
  };

  const addPlayerToTeam = async () => {
    if (!selectedTeam || !newPlayer.name || !newPlayer.role) return;
    try {
      const response = await axios.post(`http://localhost:5000/api/teams/${selectedTeam}/players`, newPlayer);
      setTeams(teams.map(team => team.id === selectedTeam ? { ...team, players: [...team.players, response.data] } : team));
      setNewPlayer({ name: "", role: "" });
    } catch (error) {
      console.error("Error adding player:", error);
    }
  };

  return (
    <div className="team-management">
      <h2>Team Management</h2>

      {/* Create a new team */}
      <div className="create-team">
        <input type="text" value={newTeam} onChange={(e) => setNewTeam(e.target.value)} placeholder="Enter Team Name" />
        <button onClick={createTeam}>Create Team</button>
      </div>

      {/* Select a team */}
      <div className="team-list">
        <h3>Existing Teams</h3>
        <select onChange={(e) => setSelectedTeam(e.target.value)} value={selectedTeam || ""}>
          <option value="">-- Select Team --</option>
          {teams.map(team => (
            <option key={team.id} value={team.id}>{team.name}</option>
          ))}
        </select>
      </div>

      {/* Add players to the selected team */}
      {selectedTeam && (
        <div className="add-player">
          <h3>Add Player to {teams.find(t => t.id === selectedTeam)?.name}</h3>
          <input type="text" placeholder="Player Name" value={newPlayer.name} onChange={(e) => setNewPlayer({ ...newPlayer, name: e.target.value })} />
          <input type="text" placeholder="Role (Batsman, Bowler)" value={newPlayer.role} onChange={(e) => setNewPlayer({ ...newPlayer, role: e.target.value })} />
          <button onClick={addPlayerToTeam}>Add Player</button>
        </div>
      )}

      {/* Display players of selected team */}
      {selectedTeam && (
        <div className="team-players">
          <h3>Players</h3>
          <ul>
            {teams.find(t => t.id === selectedTeam)?.players.map(player => (
              <li key={player.id}>{player.name} - {player.role}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default TeamManagement;

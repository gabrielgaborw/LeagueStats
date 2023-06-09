import React, { useState } from 'react';

import regions from './regions.json';
import './App.css';
import MatchHistory from './Components/MatchHistory/MatchHistory';
import PlayerProfile from './Components/PlayerProfile/PlayerProfile';
import Navbar from './Components/Navbar/Navbar';
import LoadingCircle from './Components/LoadingCircle/LoadingCircle';

function App() {
  const [matchHistory, setMatchHistory] = useState([]);
  const [playerData, setPlayerData] = useState({});
  const [rankedData, setRankedData] = useState([]);
  const [summData, setSummData] = useState([]);
  const [runeData, setRuneData] = useState([]);
  // TODO: Implement loading
  const [loading, setLoading] = useState(false);

  // Handlers to get data from Navbar component
  const handleMatchHistory = (data) => {
    setMatchHistory(data);
  }
  const handlePlayerData = (data) => {
    setPlayerData(data);
  }
  const handleRankedData = (data) => {
    setRankedData(data);
  }
  const handleSummData = (data) => {
    setSummData(data);
  }
  const handleRuneData = (data) => {
    setRuneData(data);
  }
  
  return (
    <div className="App">
      {/* NAVBAR */}
      <Navbar onPlayerData={handlePlayerData} onMatchHistory={handleMatchHistory}
      onRankedData={handleRankedData} onSummData={handleSummData} onRuneData={handleRuneData} regions={regions} />
      {loading ? <LoadingCircle /> : 
      JSON.stringify(playerData) !== '{}' && JSON.stringify(playerData) !== undefined ? 
        <div className="container">
          {/* PROFILE DETAILS */}
          <PlayerProfile playerData={playerData} rankedData={rankedData} />
          {/* MATCH HISTORY */}
          <MatchHistory matchHistory={matchHistory} playerData={playerData} summData={summData} runeData={runeData} />
        </div>
      : 
        <div className="no-player">
          <p>404</p>
          <p>Player not found. :(</p>
        </div>
      }
    </div>
  );
}

export default App;

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

  const [loading, setLoading] = useState(true);

  // Handling data from Navbar component
  const handleData = (data) => {
    console.log(data);
    setSummData(data[0].data.data);
    setRuneData(data[1].data);
    setPlayerData(data[2].data.data);
    setMatchHistory(data[3].data.data);
    setRankedData(data[4].data.data[0]);

    setLoading(false);
  }

  const handleLoad = (loading) => {
    setLoading(loading)
  }
  
  return (
    <div className="App">
      {/* NAVBAR */}
      <Navbar onAPI_CALLS_DATA={handleData} onLoading={handleLoad} regions={regions} />
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

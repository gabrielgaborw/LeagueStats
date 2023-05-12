import React, { useState } from 'react';
import axios from 'axios';
import './App.css';
import MatchHistory from './Components/MatchHistory/MatchHistory';
import PlayerProfile from './Components/PlayerProfile/PlayerProfile';

function App() {
  // Search text for player name
  const [player, setPlayer] = useState("");
  const [playerData, setPlayerData] = useState({});
  const [matchHistory, setMatchHistory] = useState([]);
  const [summData, setSummData] = useState([]);
  const [runeData, setRuneData] = useState([]);
  const [loading, setLoading] = useState(true);
  
  function searchPlayer(event) {
    // APi string setup
    const APICallString_Player = `https://eun1.api.riotgames.com/lol/summoner/v4/summoners/by-name/${player}?api_key=${API_KEY}`;
    const APICall_Summs = "http://ddragon.leagueoflegends.com/cdn/13.9.1/data/en_US/summoner.json";
    const APICall_Runes = "http://ddragon.leagueoflegends.com/cdn/13.9.1/data/en_US/runesReforged.json";
    setMatchHistory([]);
    // Handle API call
    axios.get(APICallString_Player).then(function (response) {
      // Success
      setPlayerData(response.data);
      console.log(response.data);
    }).catch(function (error) {
      // Error
      console.log(error);
    })
    // API call to backend for match history
    axios.get("http://localhost:5000/", { params: { username: player, api_key: API_KEY}})
      .then(function (response) {
        setMatchHistory(response.data)

        setLoading(false);
      }).catch(function (error) {
        console.log(error);
      })
      console.log(matchHistory);
    // API call to get summoner spell data
    axios.get(APICall_Summs).then(function (response) {
      setSummData(response.data.data);
    }).catch(function (error) {
      console.log(error);
    })
    // API call to get rune data
    axios.get(APICall_Runes).then(function (response) {
      setRuneData(response.data);
    }).catch(function (error) {
      console.log(error);
    })
  }
  
  return (
    <div className="App">
      <h1>League Stats</h1>
      <input type="text" onChange={e => setPlayer(e.target.value)}></input>
      <button onClick={e => searchPlayer(e)}>Search</button>
      {JSON.stringify(playerData) !== '{}' ? 
        <div className="container">
          {/* PROFILE DETAILS */}
          <PlayerProfile playerData={playerData} />
          {/* MATCH HISTORY */}
          <MatchHistory matchHistory={matchHistory} playerData={playerData} summData={summData} runeData={runeData} />
        </div>
       : 
        <><p>No player data</p></>}
    </div>
  );
}

export default App;

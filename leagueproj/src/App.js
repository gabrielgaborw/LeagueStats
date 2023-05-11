import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  // Search text for player name
  const [player, setPlayer] = useState("");
  const [playerData, setPlayerData] = useState({});
  const [matchHistory, setMatchHistory] = useState([]);
  const [summData, setSummData] = useState([]);
  const [runeData, setRuneData] = useState([]);
  const [loading, setLoading] = useState(true);
  const API_KEY = "RGAPI-d808cf96-b3d9-4d9d-9735-27f5975c6ab1";
  
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
    
  // Check if the name is too long to be displayed and shorten it
  function isTooLong(name) {
    return name.length >= 10 ? `${name.slice(0, 7)}...` : name;
  }

  // Returns an object with the player details for a match
  function findSelectedPlayer(gameData) {
      let player = [];
      // Mapping through the participants of a specific match
      gameData.info.participants.map((data) => {
        if(data.summonerName === playerData.name) 
          player = data;
      })
      // console.log(player);
      return player;
  }

  // Returns a string with the summoner spell name
  function getSpellIcon(summId) {
    let icon = "";
    Object.entries(summData).map(([key, spell]) => {
      if(spell.key.toString() === summId.toString())
        {
          icon = spell.id
        }
    })
    return icon;
  }

  // Getting the primary rune's keystone icon
  function getPrimaryRune(playerRunes) {
    let primaryRune = playerRunes[0].selections[0].perk;
    let runeCategory = playerRunes[0].style;
    let runePath = "";
    runeData.map((rune) => {
      if(rune.id === runeCategory)
      {
        rune.slots[0].runes.map((keystone) => {
          if(keystone.id === primaryRune)
            runePath = keystone.icon;
        })
      }
    })
    return runePath;
  }

  // Getting the secondary rune tree icon
  function getSecondaryRune(playerRunes) {
    let secondaryRune = playerRunes[1].style;
    let runePath = "";
    runeData.map((rune) => {
      if(rune.id === secondaryRune)
      {
        runePath = rune.icon;
      }
    })
    return runePath;
  }

  // Displays the player's items
  function showItem(player) {
    let items = [];
    let currentItem = "";
    for(let i = 0; i <= 6; i++) {
      currentItem = `item${i}`;
      player[currentItem] != 0 ?
      items.push(
      <li>
        <img width="20" height="20" src={`http://ddragon.leagueoflegends.com/cdn/13.9.1/img/item/${player[currentItem]}.png`} />
      </li>)
      : items.push(
        <li>
        <img width="20" height="20" src="data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs=" />
      </li>)
    }
    return items;
  }
  
  return (
    <div className="App">
      <h1>League Stats</h1>
      <input type="text" onChange={e => setPlayer(e.target.value)}></input>
      <button onClick={e => searchPlayer(e)}>Search</button>
      {JSON.stringify(playerData) !== '{}' ? 
        <div className="container">
          {/* PROFILE DETAILS */}
          <div className="playerProfile" style={{border: "5px solid red"}}>
            <p>{playerData.name}</p>
            <img width="100" height="100" src={`http://ddragon.leagueoflegends.com/cdn/13.8.1/img/profileicon/${playerData.profileIconId}.png`} />
            <p>Level: {playerData.summonerLevel}</p>
          </div>
          {/* MATCH HISTORY */}
          {matchHistory.length !== 0 ?
            <ul className="matchHistory" style={{border: "5px solid red"}}>
              Match History
              {matchHistory.map((gameData, index) => 
                <li key={index} className="match" style={{border: "5px solid red"}}>
                  <div>Match details</div>
                  {/* DISPLAY PLAYERS STATS */}
                  <div className="match-details" style={{border: "5px solid red"}}>
                    <div className="match-stats">
                      <div className="champ-details">
                        {/* PLAYED CHAMPION ICON */}
                        <div className="champ-icon">
                          <img width="50" height="50" src={`http://ddragon.leagueoflegends.com/cdn/13.8.1/img/champion/${findSelectedPlayer(gameData).championName}.png`} />
                        </div>
                        <div className="build">
                          {/* SUMMONER SPELLS */}
                          <ul className="summs">
                            <li>
                              <img width="20" height="20"
                              src={`http://ddragon.leagueoflegends.com/cdn/13.9.1/img/spell/${getSpellIcon(findSelectedPlayer(gameData).summoner1Id)}.png`} />
                            </li>
                            <li>
                              <img width="20" height="20"
                              src={`http://ddragon.leagueoflegends.com/cdn/13.9.1/img/spell/${getSpellIcon(findSelectedPlayer(gameData).summoner2Id)}.png`} />
                            </li>
                          </ul>
                          {/* RUNES */}
                          <ul className="runes">
                            <li>
                              <img width="20" height="20" src={`https://ddragon.canisback.com/img/${getPrimaryRune(findSelectedPlayer(gameData).perks.styles)}`} />
                            </li>
                            <li>
                            <img width="20" height="20" src={`https://ddragon.canisback.com/img/${getSecondaryRune(findSelectedPlayer(gameData).perks.styles)}`} />
                            </li>
                          </ul>
                        </div>
                      </div>
                      {/* PLAYER SCORE */}
                      <div className="score">
                        <div className="kda">
                          {`${findSelectedPlayer(gameData).kills} / 
                          ${findSelectedPlayer(gameData).deaths} / 
                          ${findSelectedPlayer(gameData).assists}`}
                        </div>
                        <div className="kda-ratio">
                          {((findSelectedPlayer(gameData).kills + findSelectedPlayer(gameData).assists)/
                          findSelectedPlayer(gameData).deaths).toFixed(2)}
                        </div>
                      </div>
                    </div>
                    {/* ITEMS */}
                    <ul className="items">
                      {showItem(findSelectedPlayer(gameData))}
                    </ul>
                  </div>
                  {/* MATCH PARTICIPANTS */}
                  <div className="participants">
                    {/* List of blue team players */}
                    <ul>
                      {gameData.info.participants.slice(0, 5).map((data, participantIndex) => 
                        <div className="blue-team">
                          <div className="icon">
                            <img width="25" height="25" src={`http://ddragon.leagueoflegends.com/cdn/13.8.1/img/champion/${data.championName}.png`}/>
                          </div>
                          <div className="name">
                            {isTooLong(data.summonerName)}
                          </div>
                        </div>
                      )}
                    </ul>
                    {/* List of red team players */}
                    <ul className="red-team-list">
                      {gameData.info.participants.slice(5, 10).map((data, participantIndex) => 
                        <div className="red-team">
                          <div className="icon">
                            <img width="25" height="25" src={`http://ddragon.leagueoflegends.com/cdn/13.8.1/img/champion/${data.championName}.png`}/>
                          </div>
                          <div className="name">
                            {isTooLong(data.summonerName)}
                          </div>
                        </div>
                      )}
                    </ul>
                    </div>
                </li>
              )}
            </ul>
            : "No games to show"
          }
        </div>
       : 
        <><p>No player data</p></>}
    </div>
  );
}

export default App;

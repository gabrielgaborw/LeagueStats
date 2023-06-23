import React, { useState } from 'react';
import axios from 'axios';

import './Navbar.css';
import regions from '../../regions.json';

// WORK IN PROGRESS

const Navbar = ({ regions }) => {
	const [data, setData] = useState({ matchHistory: {}, playerData: {}, rankedData: {}, summData: {}, runeData: {}});
	const [regionData, setRegionData] = useState(regions.regions[2]);

	function searchPlayer(event) {
    // API call string setup
    // These api calls don't require an api key
    const APICall_Summs = "http://ddragon.leagueoflegends.com/cdn/13.9.1/data/en_US/summoner.json";
    const APICall_Runes = "http://ddragon.leagueoflegends.com/cdn/13.9.1/data/en_US/runesReforged.json";

    setMatchHistory([]);

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

    // API calls to backend

    // API call for player data
    axios.get("http://localhost:5000/league/player/", { params: { username: player, region: regionData } })
    .then(function (response) {
      setPlayerData(response.data.data);
      console.log(response.data.data);
    }).catch(function (error) {
      console.log(error);
    })

    // API call for match history
    axios.get("http://localhost:5000/league/history/", { params: { username: player, region: regionData } })
      .then(function (response) {
        setMatchHistory(response.data.data);
        console.log(matchHistory);
      }).catch(function (error) {
        console.log(error);
      })

    // API call for ranked data
    axios.get("http://localhost:5000/league/ranked", { params: { username: player, region: regionData } })
      .then(function (response) {
        setRankedData(response.data.data[0]);
        console.log(response.data.data[0]);
      }).catch(function (error) {
        console.log(error);
      })
  }

	const changeRegion = (region) => {
    setRegionData(region);
  }

  const keyPress = (event) => {
    if(event.keyCode === 13) {
      setPlayer(event.target.value);
      searchPlayer();
    }
  }

  return (
    <div className="navbar">
        <div className="title-container">
          <img className="logo" width="50" height="50" src="./Images/logo.svg" alt="" />
          <h1 className="title">LeagueStats</h1>
        </div>
        <div className="inputs">
          <div className="dropdown">
            <button className="dropdownbtn">
              <span>{regionData.name}</span>
            </button>
            <ul className="dropdown-regions">
              {regions.regions.map((region) => (
                <li onMouseDown={() => changeRegion(region)}>
                  <span className="region-nickname">
                    <span>{region.name}</span>
                  </span>
                  {region.description}
                </li>
              ))}
            </ul>
          </div>
          <input className="text-input" type="text" spellCheck={false} onKeyDown={e => keyPress(e)} onChange={e => setPlayer(e.target.value)}></input>
          <button className="search-btn" onClick={e => searchPlayer(e)}><img width="20" height="20" src="./Images/search.svg" alt="search" /></button>
        </div>
      </div>
  )
}

export default Navbar
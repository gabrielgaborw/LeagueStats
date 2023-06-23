import React, { useState, useEffect } from 'react';
import axios from 'axios';

import './Navbar.css';

const Navbar = ({ regions, onPlayerData, onMatchHistory, onRankedData, onSummData, onRuneData }) => {
	const [player, setPlayer] = useState("reddenwhite");
	const [regionData, setRegionData] = useState(regions.regions[2]);

	useEffect(() => {
		let ignore = false;

		if(!ignore) searchPlayer();
		return () => { ignore = true; }
	}, [])

	function searchPlayer(event) {
    // API call string setup
    // These api calls don't require an api key
    const APICall_Summs = "http://ddragon.leagueoflegends.com/cdn/13.9.1/data/en_US/summoner.json";
    const APICall_Runes = "http://ddragon.leagueoflegends.com/cdn/13.9.1/data/en_US/runesReforged.json";

		onMatchHistory([]);

    // API call to get summoner spell data
    axios.get(APICall_Summs).then(function (response) {
			onSummData(response.data.data);
    }).catch(function (error) {
      console.log(error);
    })

    // API call to get rune data
    axios.get(APICall_Runes).then(function (response) {
			onRuneData(response.data);
    }).catch(function (error) {
      console.log(error);
    })

    // API calls to backend

    // API call for player data
    axios.get("http://localhost:5000/league/player/", { params: { username: player, region: regionData } })
    .then(function (response) {
			onPlayerData(response.data.data);
    }).catch(function (error) {
      console.log(error);
    })

    // API call for match history
    axios.get("http://localhost:5000/league/history/", { params: { username: player, region: regionData } })
      .then(function (response) {
				onMatchHistory(response.data.data);
      }).catch(function (error) {
        console.log(error);
      })

    // API call for ranked data
    axios.get("http://localhost:5000/league/ranked", { params: { username: player, region: regionData } })
      .then(function (response) {
				onRankedData(response.data.data[0]);
      }).catch(function (error) {
        console.log(error);
      })
  }

	const changeRegion = (region) => {
		console.log(region);
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
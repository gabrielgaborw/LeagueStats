import React, { useState, useEffect } from 'react';
import axios from 'axios';

import './Navbar.css';

const URL = "https://leaguestats.onrender.com"

const Navbar = ({ regions, onAPI_CALLS_DATA, onLoading }) => {
	const [player, setPlayer] = useState("reddenwhite");
	const [regionData, setRegionData] = useState(regions.regions[2]);

  // Loading my profile on app start
	useEffect(() => {
		let ignore = false;

		if(!ignore) searchPlayer();
		return () => { ignore = true; }
	}, [])

	function searchPlayer(event) {
    // API call string setup
    // These api calls don't require an api key
    const APICall_Summs = "https://ddragon.leagueoflegends.com/cdn/13.13.1/data/en_US/summoner.json";
    const APICall_Runes = "https://ddragon.leagueoflegends.com/cdn/13.13.1/data/en_US/runesReforged.json";

    onLoading(true)

    // API call to get summoner spell data
    const Summ_Promise = axios.get(APICall_Summs)
    // // API call to get rune data
    const Runes_Promise = axios.get(APICall_Runes)
    // // API calls to backend
    // // API call for player data
    const Player_Promise = axios.get(`${URL}/league/player/`, { params: { username: player, region: regionData } })
    // // API call for match history
    const History_Promise = axios.get(`${URL}/league/history/`, { params: { username: player, region: regionData } })
    // // API call for ranked data
    const Ranked_Promise = axios.get(`${URL}/league/ranked/`, { params: { username: player, region: regionData } })

    Promise.all([Summ_Promise, Runes_Promise, Player_Promise, History_Promise, Ranked_Promise]).then(function(values) {
      onAPI_CALLS_DATA(values);
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
              {regions.regions.map((region, index) => (
                <li key={index} onMouseDown={() => changeRegion(region)}>
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
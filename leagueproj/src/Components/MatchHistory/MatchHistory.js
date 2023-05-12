import React, { useState } from 'react'
import './MatchHistory.css';
import Participants from '../Participants/Participants';
import PlayerStats from '../PlayerStats/PlayerStats';

const MatchHistory = ({ matchHistory, playerData, summData, runeData}) => {

    // Returns an object with the player details for a match
    function findSelectedPlayer(gameData) {
        let player = [];
        // Mapping through the participants of a specific match
        gameData.info.participants.map((data) => {
        if(data.summonerName === playerData.name) 
            player = data;
        })
        return player;
    }

  return (
    <>
      {matchHistory.length !== 0 ?
        <ul className="matchHistory" style={{border: "5px solid red"}}>
          Match History
          {matchHistory.map((gameData, index) => 
            <li key={index} className="match" style={{border: "5px solid red"}}>
              <div>Match details</div>
              {/* PLAYERS STATS */}
              <PlayerStats selectedPlayer={findSelectedPlayer(gameData)} summData={summData} runeData={runeData} />
              {/* MATCH PARTICIPANTS */}
              <Participants gameData={gameData} />
            </li>
          )}
        </ul>
        : "No games to show"
      }
    </>
  )
}

export default MatchHistory
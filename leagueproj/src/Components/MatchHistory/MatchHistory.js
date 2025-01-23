import React from 'react'
import './MatchHistory.css';
import Participants from '../Participants/Participants';
import PlayerStats from '../PlayerStats/PlayerStats';

const MatchHistory = ({ matchHistory, playerData, summData, runeData}) => {

    // Returns an object with the player details for a match
    function findSelectedPlayer(gameData) {
        let player = [];
        // Mapping through the participants of a specific match
        gameData.info.participants.map((data) => {
        if(data.summonerName === playerData.gameName) 
          player = data;
        })
        return player;
    }

  return (
    <>
      {matchHistory.length !== 0 ?
        <ul className="match-history">
          Match History
          {matchHistory.map((gameData, index) => 
            <li key={index} className={`match ${findSelectedPlayer(gameData).win ? "win" : "loss"}`}>
              {/* MATCH RESULT */}
              <div className="match-result">
                <p className={`${findSelectedPlayer(gameData).win ? "result-text-win" : "result-text-loss"}`}>
                  {findSelectedPlayer(gameData).win ? "VICTORY" : "DEFEAT"}
                </p>
                <p className="match-length">
                  {`${Math.floor(gameData.info.gameDuration / 60)}:${gameData.info.gameDuration % 60}`}
                </p>
              </div>
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
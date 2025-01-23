import React from 'react'
import './Participants.css'

const Participants = ({ gameData }) => {

  // Check if the name is too long to be displayed and shorten it
  function isTooLong(name) {
    return name.length >= 10 ? `${name.slice(0, 7)}...` : name;
  }

  function findChampionName(data) {
    console.log(data);
  }

  return (
    <>
      {/* All players in a game are in a single array so we have to map to the middle
          for one team and from the middle onwards for the other  */}
      <div className="participants">
        {/* List of blue team players */}
        <ul className="blue-team-list">
          {gameData.info.participants.slice(0, 5).map((data, participantIndex) => 
            <li key={participantIndex} className="blue-team">
              <div className="icon">
                <img width="25" height="25" src={`http://ddragon.leagueoflegends.com/cdn/15.2.1/img/champion/${data.championName}.png`} alt="champ-icon" />
              </div>
              <div className="name">
                {isTooLong(data.summonerName)}
              </div>
            </li>
          )}
        </ul>
        {/* List of red team players */}
        <ul className="red-team-list">
          {gameData.info.participants.slice(5, 10).map((data, participantIndex) => 
            <li key={participantIndex} className="red-team">
              <div className="icon">
                <img width="25" height="25" src={`http://ddragon.leagueoflegends.com/cdn/15.2.1/img/champion/${data.championName}.png`} alt="champ-icon" />
              </div>
              <div className="name">
                {isTooLong(data.summonerName)}
              </div>
            </li>
          )}
        </ul>
      </div>
    </>
  )
}

export default Participants
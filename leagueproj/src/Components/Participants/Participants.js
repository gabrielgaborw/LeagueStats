import React from 'react'
import './Participants.css'

const Participants = ({ gameData }) => {

  // Check if the name is too long to be displayed and shorten it
  function isTooLong(name) {
    return name.length >= 10 ? `${name.slice(0, 7)}...` : name;
  }

  return (
    <>
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
    </>
  )
}

export default Participants
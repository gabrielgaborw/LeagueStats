import React from 'react'
import './PlayerProfile.css'


const PlayerProfile = ({ playerData, rankedData }) => {
  return (
    <>
      <div className="player-profile">
        <div className="profile">
          <div>{playerData.name}</div>
          <img className={`profile-img ${rankedData.tier}`} width="125" height="125" src={`http://ddragon.leagueoflegends.com/cdn/13.8.1/img/profileicon/${playerData.profileIconId}.png`} alt="profileicon" />
          <div className={`level ${rankedData.tier}`}>{playerData.summonerLevel}</div>
        </div>
        <div className="rank">
          <div>Ranked Solo/Duo</div>
          <img className="rank-img" width="250" height="350" src={`Images/${rankedData.tier}.png`} alt="rank"/>
          <div className="rank-txt">{rankedData.tier}</div>
        </div>
      </div>
    </>
  )
}

export default PlayerProfile
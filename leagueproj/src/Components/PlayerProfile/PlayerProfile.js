import React from 'react'
import './PlayerProfile.css'


const PlayerProfile = ({ playerData, rankedData }) => {
  return (
    <>{JSON.stringify(rankedData) !== '{}' ?
    <div className="player-profile">
        <div className="profile">
          <div>{playerData.name}</div>
          <img className={`profile-img ${rankedData?.tier ?? 'UNRANKED'}`} width="125" height="125"
          src={`http://ddragon.leagueoflegends.com/cdn/13.8.1/img/profileicon/${playerData.profileIconId}.png`} alt="profileicon" />
          <div className={`level ${rankedData?.tier ?? 'UNRANKED'}`}>{playerData.summonerLevel}</div>
        </div>
        <div className="rank">
          <div>Ranked Solo/Duo</div>
          <img className="rank-img" width="250" height="350" src={`Images/${rankedData?.tier ?? 'UNRANKED'}.png`} alt="rank"/>
          <div className="rank-txt">{rankedData?.tier ?? 'N/A'}</div>
        </div>
      </div>
      : <p>No profile info</p>}
    </>
  )
}

export default PlayerProfile
import React from 'react'
import './PlayerProfile.css'


const PlayerProfile = ({ playerData, rankedData, tierData }) => {
  return (
    <>{JSON.stringify(rankedData) !== '{}' ?
    <div className="player-profile">
        <div className="profile">
          <div>
            {`${playerData.gameName} `} 
            <span style={{ color: "gray", fontWeight: "normal" }}>{`#${playerData.tagLine}`}</span>
          </div>
          <img className={`profile-img ${tierData?.tier ?? 'UNRANKED'}`} width="125" height="125"
          src={`http://ddragon.leagueoflegends.com/cdn/15.2.1/img/profileicon/${rankedData.profileIconId}.png`} alt="profileicon" />
          <div className={`level ${tierData?.tier ?? 'UNRANKED'}`}>{rankedData.summonerLevel}</div>
        </div>
        <div className="rank">
          <div>Ranked Solo/Duo</div>
          <img className="rank-img" width="250" height="350" src={`Images/${tierData?.tier ?? 'UNRANKED'}.png`} alt="rank"/>
          <div className="rank-txt">{tierData?.tier ?? 'UNRANKED'}</div>
        </div>
      </div>
      : <p>No profile info</p>}
    </>
  )
}

export default PlayerProfile
import React from 'react'

const PlayerProfile = ({ playerData }) => {
  return (
    <>
      <div className="playerProfile" style={{border: "5px solid red"}}>
        <p>{playerData.name}</p>
        <img width="100" height="100" src={`http://ddragon.leagueoflegends.com/cdn/13.8.1/img/profileicon/${playerData.profileIconId}.png`} />
        <p>Level: {playerData.summonerLevel}</p>
      </div>
    </>
  )
}

export default PlayerProfile
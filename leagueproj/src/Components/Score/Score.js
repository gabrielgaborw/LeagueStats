import React from 'react'
import './Score.css'

const Score = ({ selectedPlayer }) => {

  function ratio(player) {
    if(player.deaths === 0)
      return 'Perfect KDA';
    else
      return ((player.kills + player.assists) / player.deaths).toFixed(2);
  }

  return (
    <>
      <div className="score">
        <div className="kda">
          {`${selectedPlayer.kills} / `}<p style={{color: "red", display: "inline"}}>{selectedPlayer.deaths}</p>{` / ${selectedPlayer.assists}`}
        </div>
        <div className="kda-ratio">
          {`${ratio(selectedPlayer)}:1 KDA`}
        </div>
      </div>
    </>
  )
}

export default Score
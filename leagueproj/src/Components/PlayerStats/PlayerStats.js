import React from 'react'
import MatchStats from '../MatchStats/MatchStats';
import './PlayerStats.css'

const PlayerStats = ({ selectedPlayer, summData, runeData }) => {

  // Displays the player's items
  function showItem(player) {
    let items = [];
    let currentItem = "";
    for(let i = 0; i <= 6; i++) {
      currentItem = `item${i}`;
      player[currentItem] != 0 ?
      items.push(
      <li>
        <img width="20" height="20" src={`http://ddragon.leagueoflegends.com/cdn/13.9.1/img/item/${player[currentItem]}.png`} />
      </li>)
      : items.push(
      <li>
        <img width="20" height="20" src="data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs=" />
      </li>)
    }
    return items;
  }

  return (
  <>
    <div className="match-details" style={{border: "5px solid red"}}>
      <MatchStats selectedPlayer={selectedPlayer} summData={summData} runeData={runeData} />
      <ul className="items">
        {showItem(selectedPlayer)}
      </ul>
    </div>
  </>
  )
}

export default PlayerStats
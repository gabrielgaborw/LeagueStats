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
      player[currentItem] !== 0 ?
      items.push(
      <li className={`${i === 6 ? "last-item" : "item"}`}>
        <img className={`${i === 6 ? "trinket" : "item-img"}`} width="30" height="30" 
        src={`http://ddragon.leagueoflegends.com/cdn/13.15.1/img/item/${player[currentItem]}.png`} alt="item" />
      </li>)
      : items.push(
      <li className="item">
        <img width="30" height="30" src="data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs=" alt="no_item" />
      </li>)
    }
    return items;
  }

  return (
  <>
    <div className="match-details">
      <MatchStats selectedPlayer={selectedPlayer} summData={summData} runeData={runeData} />
      <ul className="items">
        {showItem(selectedPlayer)}
      </ul>
    </div>
  </>
  )
}

export default PlayerStats
import React from 'react'
import Score from '../Score/Score';
import './MatchStats.css'

const MatchStats = ({ selectedPlayer, summData, runeData }) => {
  return (
    <>
      <div className="match-stats">
        <div className="champ-details">
          {/* CHAMPION ICON */}
          <div className="champ-icon-container">
            <img className="champ-icon" width="80" height="80"
            src={`https://ddragon.leagueoflegends.com/cdn/15.2.1/img/champion/${selectedPlayer.championName}.png`} alt="champ-icon" />
          </div>
          <div className="build">
            {/* SUMMONER SPELLS */}
            <ul className="summs">
              <li>
                <img className="summ-icon" width="35" height="35"
                src={`SummonerSpells/${selectedPlayer.summoner1Id}.png`} alt="summ1" />
              </li>
              <li>
                <img className="summ-icon" width="35" height="35"
                src={`SummonerSpells/${selectedPlayer.summoner2Id}.png`} alt="summ2" />
              </li>
            </ul>
            {/* RUNES */}
            <ul className="runes">
              <li>
                <img width="35" height="35"
                src={`Keystones/${selectedPlayer.perks.styles[0].selections[0].perk}.png`} alt="keystone" />
              </li>
              <li>
                <img width="35" height="35"
                src={`Runes/${selectedPlayer.perks.styles[1].style}.png`} alt="rune" />
              </li>
            </ul>
          </div>
        </div>
        <Score selectedPlayer={selectedPlayer} />
      </div>
    </>
  )
}

export default MatchStats
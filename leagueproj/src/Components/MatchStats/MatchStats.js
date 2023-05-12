import React from 'react'
import Score from '../Score/Score';
import './MatchStats.css'

const MatchStats = ({ selectedPlayer, summData, runeData }) => {

  // Returns a string with the summoner spell name
  function getSpellIcon(summId) {
    let icon = "";
    Object.entries(summData).map(([key, spell]) => {
      if(spell.key.toString() === summId.toString())
      {
        icon = spell.id
      }
    })
    return icon;
  }

  // Getting the primary rune's keystone icon
  function getPrimaryRune(playerRunes) {
    let primaryRune = playerRunes[0].selections[0].perk;
    let runeCategory = playerRunes[0].style;
    let runePath = "";
    runeData.map((rune) => {
      if(rune.id === runeCategory)
      {
        rune.slots[0].runes.map((keystone) => {
        if(keystone.id === primaryRune)
          runePath = keystone.icon;
        })
      }
    })
    return runePath;
  }

  // Getting the secondary rune tree icon
  function getSecondaryRune(playerRunes) {
    let secondaryRune = playerRunes[1].style;
    let runePath = "";
    runeData.map((rune) => {
      if(rune.id === secondaryRune)
      {
        runePath = rune.icon;
      }
    })
    return runePath;
  }

  return (
    <>
      <div className="match-stats">
        <div className="champ-details">
          {/* CHAMPION ICON */}
          <div className="champ-icon">
            <img width="50" height="50" src={`http://ddragon.leagueoflegends.com/cdn/13.8.1/img/champion/${selectedPlayer.championName}.png`} />
          </div>
          <div className="build">
            {/* SUMMONER SPELLS */}
            <ul className="summs">
              <li>
                <img width="20" height="20"
                src={`http://ddragon.leagueoflegends.com/cdn/13.9.1/img/spell/${getSpellIcon(selectedPlayer.summoner1Id)}.png`} />
              </li>
              <li>
                <img width="20" height="20"
                src={`http://ddragon.leagueoflegends.com/cdn/13.9.1/img/spell/${getSpellIcon(selectedPlayer.summoner2Id)}.png`} />
              </li>
            </ul>
            {/* RUNES */}
            <ul className="runes">
              <li>
                <img width="20" height="20" src={`https://ddragon.canisback.com/img/${getPrimaryRune(selectedPlayer.perks.styles)}`} />
              </li>
              <li>
                <img width="20" height="20" src={`https://ddragon.canisback.com/img/${getSecondaryRune(selectedPlayer.perks.styles)}`} />
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
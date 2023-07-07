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
          runePath = keystone.key;
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
        runePath = rune.key;
      }
    })
    return runePath;
  }

  return (
    <>
      <div className="match-stats">
        <div className="champ-details">
          {/* CHAMPION ICON */}
          <div className="champ-icon-container">
            <img className="champ-icon" width="80" height="80"
            src={`https://ddragon.leagueoflegends.com/cdn/13.13.1/img/champion/${selectedPlayer.championName}.png`} alt="champ-icon" />
          </div>
          <div className="build">
            {/* SUMMONER SPELLS */}
            <ul className="summs">
              <li>
                <img className="summ-icon" width="35" height="35"
                src={`SummonerSpells/${getSpellIcon(selectedPlayer.summoner1Id)}.png`} alt="summ1" />
              </li>
              <li>
                <img className="summ-icon" width="35" height="35"
                src={`SummonerSpells/${getSpellIcon(selectedPlayer.summoner2Id)}.png`} alt="summ2" />
              </li>
            </ul>
            {/* RUNES */}
            <ul className="runes">
              <li>
                <img width="35" height="35"
                src={`Keystones/${getPrimaryRune(selectedPlayer.perks.styles)}.png`} alt="keystone" />
              </li>
              <li>
                <img width="35" height="35"
                src={`Runes/${getSecondaryRune(selectedPlayer.perks.styles)}.png`} alt="rune" />
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
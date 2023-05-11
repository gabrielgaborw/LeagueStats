import axios from "axios";
import cors from "cors";
import express, { response } from "express";


const app = express();
app.use(cors());

// const PORT = process.env.PORT || 5000;

function getPUUID(playerName, API_KEY) {
    return axios.get(`https://eun1.api.riotgames.com/lol/summoner/v4/summoners/by-name/${playerName}?api_key=${API_KEY}`)
        .then(response => {
            console.log(response.data);
            return response.data.puuid
        }).catch(err => err);
}

app.get('/', async (req, res) => {
    const playerName = req.query.username;
    const API_KEY = req.query.api_key;

    // Getting PUUID
    const PUUID = await getPUUID(playerName, API_KEY);
    // API call setup
    const API_CALL = `https://europe.api.riotgames.com/lol/match/v5/matches/by-puuid/${PUUID}/ids?api_key=${API_KEY}`;

    const gameIds = await axios.get(API_CALL)
        .then(response => response.data)
        .catch(err => err);
    console.log(gameIds);

    const gameData = [];
    for(let i = 0; i < gameIds.length - 15; i++) {
        const matchID = gameIds[i];
        const matchData = await axios.get(`https://europe.api.riotgames.com/lol/match/v5/matches/${matchID}?api_key=${API_KEY}`)
            .then(response => response.data)
            .catch(err => err);
        gameData.push(matchData);
    }

    res.json(gameData);
});

app.listen(5000, () => {
    console.log(`Server running on port 5000`);
})
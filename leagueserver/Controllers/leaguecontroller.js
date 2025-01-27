import router from "../Routes/leagueroute.js";
import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

export const getMatchHistory = async (req, res) => {
    const playerName = req.query.username;
    const API_KEY = process.env.API_KEY;
    const tagline = req.query.tagline;
    const RRV = req.query.region.rrv;

    try {
        // API call to get puuid
        const API_PUUID = `https://${RRV}.api.riotgames.com/riot/account/v1/accounts/by-riot-id/${playerName}/${tagline}?api_key=${API_KEY}`;
        const PUUID = await axios.get(API_PUUID)
            .then(response => {
                return response.data.puuid
            })
            .catch((err) => {
                console.error("Error fetching PUUID:", err.message);
            });
        
        // API call to get match ids using puuid
        const API_Match_History = `https://${RRV}.api.riotgames.com/lol/match/v5/matches/by-puuid/${PUUID}/ids?api_key=${API_KEY}`;
        const gameIds = await axios.get(API_Match_History)
            .then(response => response.data)
            .catch((err) => {
                console.error("Error fetching match ids:", err.message);
            });
        
        // API call to get data using match ids
        const gameData = [];
        for(let i = 0; i < gameIds.length - 10; i++) {
            const matchID = gameIds[i];
            const matchData = await axios.get(`https://${RRV}.api.riotgames.com/lol/match/v5/matches/${matchID}?api_key=${API_KEY}`)
                .then(response => response.data)
                .catch((err) => {
                    console.error("Error fetching match data:", err.message);
                });
            gameData.push(matchData);
        }

        res.status(200).json({ data: gameData });
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const getRankedData = async (req, res) => {
    const playerName = req.query.username;
    const API_KEY = process.env.API_KEY;
    const PRV = req.query.region.prv;
    const RRV = req.query.region.rrv;
    const tagline = req.query.tagline;

    try {
        // API call to get puuid
        const API_PUUID = `https://${RRV}.api.riotgames.com/riot/account/v1/accounts/by-riot-id/${playerName}/${tagline}?api_key=${API_KEY}`;
        const PUUID = await axios.get(API_PUUID)
            .then(response => {
                return response.data.puuid;
            })
            .catch((err) => {
                console.error("Error fetching PUUID:", err.message);
            });
        
        // API call for ranked data using puuid 
        // no rank data is here anymore but the call still has to be made for summoner id and profile icon
        const API_Call_Summoner = `https://${PRV}.api.riotgames.com/lol/summoner/v4/summoners/by-puuid/${PUUID}?api_key=${API_KEY}`;
        const rankedData = await axios.get(API_Call_Summoner)
            .then(response => response.data)
            .catch((err) => {
                console.error("Error fetching summoner id:", err.message);
            });
        
        // API call for actual ranked data using summoner id
        const SUMMONER_ID = rankedData.id;
        const API_Call_Ranked = `https://${PRV}.api.riotgames.com/lol/league/v4/entries/by-summoner/${SUMMONER_ID}?api_key=${API_KEY}`;
        const tier = await axios.get(API_Call_Ranked)
            .then(response => {
                const { tier, rank } = response.data[0];
                const filteredData = { tier, rank };
                
                return filteredData;
            })
            .catch((err) => {
                console.error("Error fetching tier data:", err.message);
            });
        
        res.status(200).json({ data: rankedData, tier: tier });
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const getPlayerData = async (req, res) => {
    const playerName = req.query.username;
    const API_KEY = process.env.API_KEY;
    const tagline = req.query.tagline;
    const RRV = req.query.region.rrv;

    try {
        // Replace 'EUNE' with tagline
        const API_Call_Player = `https://${RRV}.api.riotgames.com/riot/account/v1/accounts/by-riot-id/${playerName}/${tagline}?api_key=${API_KEY}`;

        const playerData = await axios.get(API_Call_Player)
            .then(function (response) {
                return response.data;
            })
            .catch((err) => {
                console.error("Error fetching player data:", err.message);
            });
        
        res.status(200).json({ data: playerData });
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}
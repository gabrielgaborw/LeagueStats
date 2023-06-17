import express from "express";

import { getMatchHistory, getRankedData, getPlayerData } from "../Controllers/leaguecontroller.js";

const router = express.Router();

router.get('/history', getMatchHistory);
router.get('/ranked', getRankedData);
router.get('/player', getPlayerData);

export default router;
import express from "express";

import { getPlayerData } from "../Controllers/leaguecontroller.js";

const router = express.Router();

router.get('/', getPlayerData);

export default router;
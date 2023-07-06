import axios from "axios";
import cors from "cors";
import express, { response } from "express";

import leagueRoutes from "./Routes/leagueroute.js";


const app = express();
app.use(cors());

const PORT = process.env.PORT || 5000;

app.use('/league', leagueRoutes);

app.listen(PORT, () => {
    console.log(`Server running on port 5000`);
})
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const axios = require('axios');


const API_KEY = String(process.env.RIOT_API_KEY);
const app = express();

app.use(express.json());

// get puuid with summoner name
app.get("/summoner/:name", cors(), (req, res) => {
    const name = req.params.name;
    const url = `https://kr.api.riotgames.com/lol/summoner/v4/summoners/by-name/${encodeURIComponent(name)}?api_key=${API_KEY}`;
    
    console.log(`Search summoner ${name}`);    
    axios.get(url).then(response => {
        // console.log(response);
        console.log("success");
        res.status(response.status).send(response.data.puuid);
    }).catch(error => {
        console.log("fail");
        res.status(error.response.data.status.status_code).send(error.response.data);
    });
});

//get match history with puuid
app.get("/history/:puuid", cors(), (req, res) => {

    const id = String(req.params.puuid);

    console.log(`Search rank game history of ${id}`);

    // const count = 5;
    const url = `https://asia.api.riotgames.com/lol/match/v5/matches/by-puuid/${encodeURIComponent(id)}/ids?type=ranked&start=0&count=20&api_key=${API_KEY}`;
    
    axios.get(url).then(response => {
        // console.log(response);
        console.log("success");
        res.status(response.status).send(response.data);
    }).catch(error => {
        // console.log(error);
        console.log("fail");
        res.status(error.response.data.status.status_code).send(error.response.data);
    });
});

app.listen(3001);


require('dotenv').config();
const express = require('express');
const cors = require('cors');
const axios = require('axios');


const API_KEY = String(process.env.RIOT_API_KEY);
const app = express();

app.use(express.json());

// get puuid with summoner name
app.get("/:name", cors(), (req, res) => {
    console.log(`Search summoner ${req.params.name}`);

    const name = req.params.name;
    const url = `https://kr.api.riotgames.com/lol/summoner/v4/summoners/by-name/${encodeURIComponent(name)}?api_key=${API_KEY}`;
    
    axios.get(url).then(response => {
        // console.log(response);
        console.log("success");
        res.send(response.data.puuid);
    }).catch(error => {
        // console.log(error);
        console.log("fail");
        res.send(error);
    });
});

//get match history with puuid
app.get("/match/:id", cors(), (req, res) => {

    const id = String(req.params.id);

    console.log(`Search rank game history of ${id}`);

    // const count = 5;
    const url = `https://asia.api.riotgames.com/lol/match/v5/matches/by-puuid/${encodeURIComponent(id)}/ids?type=ranked&start=0&count=5&api_key=${API_KEY}`;
    
    axios.get(url).then(response => {
        // console.log(response);
        console.log("success");
        res.send(response.data);
    }).catch(error => {
        // console.log(error);
        console.log("fail");
        res.send(error);
    });
});

app.listen(3001);


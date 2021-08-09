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
        console.log("success (puuid)");
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

    const count = 10;
    const url = `https://asia.api.riotgames.com/lol/match/v5/matches/by-puuid/${encodeURIComponent(id)}/ids?type=ranked&start=0&count=${count}&api_key=${API_KEY}`;
    
    axios.get(url).then(async response => {
        console.log('success (match id list)');
        const URL_BASE = 'https://asia.api.riotgames.com/lol/match/v5/matches';
        const matches = response.data;

        Promise.all(matches.map(elem => axios.get(`${URL_BASE}/${elem}?api_key=${API_KEY}`))).then(results => {
            console.log("success (match history)");
            res.status(200).send(results.map(el => el.data.info));
        }).catch(err => {
            console.log("fail");
            res.status(500).send(results);
        });
    }).catch(error => {
        console.log("fail");
        res.status(error.response.data.status.status_code).send(error.response.data);
    });
});

app.listen(3001);


require('dotenv').config();
const express = require('express');
const cors = require('cors');
const axios = require('axios');


const API_KEY = process.env.RIOT_API_KEY;
const COUNT = process.env.REACT_APP_MATCH_COUNT;

const app = express();
app.use(express.json());

// get puuid with summoner name
app.get("/summoner/:name", cors(), (req, res) => {
    const name = req.params.name;
    const url = `https://kr.api.riotgames.com/lol/summoner/v4/summoners/by-name/${encodeURIComponent(name)}?api_key=${API_KEY}`;
    
    // console.log(`Search summoner ${name}`);    
    axios.get(url).then(response => {
        // console.log("success (puuid)");
        res.status(response.status).send(response.data);
    }).catch(error => {
        // console.log("fail");
        res.status(error.response.data.status.status_code).send(error.response.data);
    });
});

// get summoner info with summonerId
app.get("/summonerInfo/:id", cors(), (req, res) => {
    const id = req.params.id;
    const url = `https://kr.api.riotgames.com/lol/league/v4/entries/by-summoner/${id}?api_key=${API_KEY}`;
    // console.log(`Search summoner info ${id}`);    
    axios.get(url).then(response => {
        // console.log("success (summoner info)");
        res.status(response.status).send(response.data);
    }).catch(error => {
        // console.log("fail");
        res.status(error.response.data.status.status_code).send(error.response.data);
    });
});

//get match history with accountId (legacy)
app.get("/history_v4/:accountId", cors(), (req, res) => {

    const accountId = req.params.accountId;

    console.log(`Search rank game history of ${accountId}`);

    const url_v4 = `https://kr.api.riotgames.com/lol/match/v4/matchlists/by-account/${accountId}?endIndex=${COUNT}&api_key=${API_KEY}`;
    axios.get(url_v4).then((resp) => {
        const matches = resp.data.matches;
        const URL_BASE = 'https://kr.api.riotgames.com/lol/match/v4/matches';
        // console.log(matches);
        Promise.all(matches.map(elem => axios.get(`${URL_BASE}/${elem.gameId}?api_key=${API_KEY}`))).then(results => {
            console.log("success (match history)");
            res.status(200).send(results.map(el => el.data));
        }).catch((error) => {
            res.status(500).send(error);
        });
    }).catch((error) => {
        res.send(error);
    });
});

// get match history with puuid
app.get("/history_v5/:puuid", cors(), (req, res) => {

    const id = req.params.puuid;

    console.log(`Search rank game history_v5 of ${id}`);

    const url = `https://asia.api.riotgames.com/lol/match/v5/matches/by-puuid/${id}/ids?start=0&count=${COUNT}&api_key=${API_KEY}`;
    
    axios.get(url).then(resp => {
        const matches = resp.data;
        const URL_BASE = 'https://asia.api.riotgames.com/lol/match/v5/matches';
        console.log(matches);
        Promise.all(matches.map(elem => axios.get(`${URL_BASE}/${elem}?api_key=${API_KEY}`))).then(results => {
            console.log("success (match history)");
            const data = results.map(el => el.data.info);
            res.status(200).send(data);
        }).catch((error) => {
            console.log(error);
            res.status(500).send(error);
        });
    }).catch((error) => {
        res.send(error);
    });
});

app.listen(3001);


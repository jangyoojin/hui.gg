import axios from 'axios';

const API_KEY = process.env.RIOT_API_KEY;
const COUNT = process.env.REACT_APP_MATCH_COUNT;

// get summoner info with summonerName
export function getSummonerDataByName(name) {
    const url = `https://kr.api.riotgames.com/lol/summoner/v4/summoners/by-name/${encodeURIComponent(name)}?api_key=${API_KEY}`;

    axios.get(url).then(response => {
        return response.data;
    }).catch(error => {
        throw error;
    });
}

// get summoner info with summonerId
export function getSummonerDataByID(id) {
    const url = `https://kr.api.riotgames.com/lol/league/v4/entries/by-summoner/${id}?api_key=${API_KEY}`;
    axios.get(url).then(response => {
        // console.log("success (summoner info)");
        return response.data;
    }).catch(error => {
        throw error;
    });
}

// get match history with puuid
export function getMatchHistoryByPuuid(puuid) {
    const url = `https://asia.api.riotgames.com/lol/match/v5/matches/by-puuid/${puuid}/ids?start=0&count=${COUNT}&api_key=${API_KEY}`;
    axios.get(url).then(response => {
            const matches = response.data;
            const URL_BASE = 'https://asia.api.riotgames.com/lol/match/v5/matches';
            
            Promise.all(matches.map(elem => axios.get(`${URL_BASE}/${elem}?api_key=${API_KEY}`))).then(results => {
                const data = results.map(el => el.data.info);
                return data;
        }).catch((error) => {
            throw error;
        });
    }).catch((error) => {
        throw error;
    });
}
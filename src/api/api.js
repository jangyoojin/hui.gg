import axios from 'axios';

const API_KEY = process.env.REACT_APP_API_KEY;
const COUNT = process.env.REACT_APP_MATCH_COUNT;

// get summoner info with summonerName
export async function getSummonerDataByName(name) {
    // console.log('getSummonerDataByName', name);
    const url = `/summoner/v4/summoners/by-name/${encodeURIComponent(name)}?api_key=${API_KEY}`;
    let response;
    try {
        response = await axios.get(url);
    }
    catch(error) {
        throw error;
    }
    return {
        id: response.data.id,
        puuid: response.data.puuid,
        accountId: response.data.accountId
    };
}

// get summoner info with summonerId
export async function getLeagueDataByID(id) {
    // console.log('getSummonerDataById', id);
    const url = `/league/v4/entries/by-summoner/${id}?api_key=${API_KEY}`;
    let response;
    try {
        response = await axios.get(url);
    }
    catch(error) {
        throw error;
    }
    return response.data;
}

export async function getMatchHistoryByAccountId(accountId) {
    // console.log('getMatchHistoryByAccountId', accountId);
    const url = `/match/v4/matchlists/by-account/${accountId}?endIndex=${COUNT}&api_key=${API_KEY}`;
    let response;
    try {
        response = await axios.get(url);
    }
    catch(error) {
        throw error;
    }
    const matchHistory = response.data.matches.map(match => match.gameId);
    const _url = `/match/v4/matches`;
    
    let temp;
    let history;
    try {
        temp = await Promise.all(matchHistory.map(id => axios.get(`${_url}/${id}?api_key=${API_KEY}`)));
        history = temp.map(response => response.data);
    } catch (error) {
        throw error;
    }
    return history;
}


// get match history with puuid(using v5 api)
// export function getMatchHistoryByPuuid(puuid) {
//     const url = `https://asia.api.riotgames.com/lol/match/v5/matches/by-puuid/${puuid}/ids?start=0&count=${COUNT}&api_key=${API_KEY}`;
//     axios.get(url).then(response => {
//             const matches = response.data;
//             const URL_BASE = 'https://asia.api.riotgames.com/lol/match/v5/matches';
            
//             Promise.all(matches.map(elem => axios.get(`${URL_BASE}/${elem}?api_key=${API_KEY}`))).then(results => {
//                 const data = results.map(el => el.data.info);
//                 return data;
//         }).catch((error) => {
//             throw error;
//         });
//     }).catch((error) => {
//         throw error;
//     });
// }


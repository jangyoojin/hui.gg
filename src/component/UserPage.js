import { useParams } from 'react-router';
import { useEffect, useState } from 'react';

import MatchList from './MatchList';
import UserProfile from './UserProfile';
import '../css/UserPage.css';
import axios from 'axios';

const API_BASE = 'https://huijongzip.ga:3001';

export default function UserPage() {
    const { name } = useParams();
    const [ loading, setLoading ] = useState(true);
    const [ notFound, setNotFound ] = useState(false);

    const [ history, setHistory ] = useState([]);
    const [ summonerId, setSummonerId ] = useState('');
    // const [ puuid, setPuuid ] = useState(''); // this is for lol api v5
    const [ leagueInfo, setLeagueInfo ] = useState([]);

    // eslint-disable-next-line
    useEffect(async () => {
        setLoading(true);
        console.log('fetching user data...');

        let summoner;
        try {
            summoner = await axios.get(`${API_BASE}/summoner/${name}`);
        } catch (error) {
            console.log('fetching user data failed!', error);
            setNotFound(true);
            setLoading(false);
        }
        if(summoner) {
            console.log('featched user data', summoner.data);
            // const _puuid = summoner.data.puuid;
            const _id = summoner.data.id;
            const _accountId = summoner.data.accountId;
            // setPuuid(_puuid);
            setSummonerId(_id);

            let leagueData;
            console.log('fetching user league data...');
            try {
                leagueData = await axios.get(`${API_BASE}/summonerData/${_id}`);
            }
            catch(error) {
                console.log('fetching user league data failed!', error);
                setNotFound(true);
                setLoading(false);
            }
            if(leagueData) {
                console.log('fetched league data', leagueData.data);
                setLeagueInfo(leagueData.data);

                let matches;
                console.log('fetching match history...');
                try {
                    matches = await axios.get(`${API_BASE}/match/${_accountId}`);
                }
                catch(error) {
                    setNotFound(true);
                    setLoading(false);
                }
                if(matches) {
                    console.log('fetched match history', matches.data);
                    setHistory(matches.data);
                    setLoading(false);
                }
                else {
                    setNotFound(true);
                    setLoading(false);
                }
            }
            else {
                setNotFound(true);
                setLoading(false);
            }
        }
        else {
            setNotFound(true);
            setLoading(false);
        }
    }, [ name ]);



    return (
        loading 
            ? <div align='center' className='Loading'>loading</div> 
            : <div className='UserPage'>
                {
                    notFound 
                        ? <div align='center' className='notFound'>Not Found!</div>
                        : <div>
                            <UserProfile leagueInfo={leagueInfo} list={history}/>
                            <MatchList id={summonerId} list={history} />
                        </div>
                }
            </div>
    );
}
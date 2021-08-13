import { useParams } from 'react-router';
import { useEffect, useState } from 'react';

import MatchList from './MatchList';
import UserProfile from './UserProfile';
import '../css/UserPage.css';
import { getSummonerDataByName, getLeagueDataByID, getMatchHistoryByAccountId } from '../api/api.js';

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
            summoner = await getSummonerDataByName(name);
        } catch (error) {
            console.log('fetching user data failed!', error);
            setNotFound(true);
            setLoading(false);
        }
        if(summoner) {
            console.log('featched user data', summoner);
            // const _puuid = summoner.puuid;
            const _id = summoner.id;
            const _accountId = summoner.accountId;
            // setPuuid(_puuid);
            setSummonerId(_id);

            let leagueData;
            console.log('fetching user league data...');
            try {
                leagueData = await getLeagueDataByID(_id);
            }
            catch(error) {
                console.log('fetching user league data failed!', error);
                setNotFound(true);
                setLoading(false);
            }
            if(leagueData) {
                console.log('fetched league data', leagueData);
                setLeagueInfo(leagueData);

                let matches;
                console.log('fetching match history...');
                try {
                    matches = await getMatchHistoryByAccountId(_accountId);
                }
                catch(error) {
                    setNotFound(true);
                    setLoading(false);
                }
                if(matches) {
                    console.log('fetched match history', matches);
                    setHistory(matches);
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
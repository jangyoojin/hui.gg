import { useParams } from 'react-router';
import { useEffect, useState } from 'react';
import axios from 'axios';
import MatchList from './MatchList';
import UserProfile from './UserProfile';

const API_BASE = `http://${process.env.REACT_APP_PUBLIC_URL}:3001`;

export default function UserPage() {
    const { name } = useParams();
    const [ history, setHistory ] = useState([]);
    const [ loading, setLoading ] = useState(true);
    const [ notFound, setNotFound ] = useState(false);
    const [ puuid, setPuuid ] = useState('');
    const [ summonerInfo, setSummonerInfo ] = useState({});

    useEffect(() => {
        setLoading(true);
        console.log('fetching user data...');
        axios.get(`${API_BASE}/summoner/${name}`).then(res => {
            console.log(res.data);
            const id = res.data.puuid;
            const summonerId = res.data.id;
            const accountId = res.data.accountId;
            console.log('fetched summoner!');
            setPuuid(id);
            console.log('fetching summoner info...');
            axios.get(`${API_BASE}/summonerInfo/${summonerId}`).then((re) => {
                const info = re.data;
                console.log('fetched summoner info!');
                setSummonerInfo(info);
            }).catch((error) => {
                // summoner info fetch failed
                console.log('fetch failed!', error);
                setNotFound(true);
                setLoading(false);
            });
            console.log('fetching match history...');
            axios.get(`${API_BASE}/history/${id}/${accountId}`).then(re => {
                const his = re.data;
                setHistory(his);
                console.log('fetched history!');
                setLoading(false);
            }).catch(error => {
                // match histroy fetch failed
                console.log('fetch failed!', error);
                setNotFound(true);
                setLoading(false);
            });


        }).catch(error => {
            // summoner fetch failed
            console.log('fetch failed!', error);
            setNotFound(true);
            setLoading(false);
        });
    }, [ name ]);



    return (
        loading 
            ? <div>loading</div> 
            : <div className='UserPage'>
                {
                    notFound 
                        ? <div>{`User(${name}) not found`}</div>
                        : <div>
                            <UserProfile summonerInfo={summonerInfo} list={history}/>
                            <MatchList puuid={puuid} list={history} />
                        </div>
                }
            </div>
    );
}
import { useParams } from 'react-router';
import { useEffect, useState } from 'react';
import axios from 'axios';
import MatchList from './MatchList';

const API_BASE = `http://${process.env.REACT_APP_PUBLIC_URL}:3001`;

export default function UserPage() {
    const { name } = useParams();
    const [ history, setHistory ] = useState([]);
    const [ loading, setLoading ] = useState(true);
    const [ notFound, setNotFound ] = useState(false);
    const [ puuid, setPuuid ] = useState('');

    useEffect(() => {
        setLoading(true);
        console.log('fetching user data...');
        axios.get(`${API_BASE}/summoner/${name}`).then(res => {
            const id = res.data;
            console.log('fetched summoner!', id);
            setPuuid(id);
            console.log('fetching match history...');
            axios.get(`${API_BASE}/history/${id}`).then(re => {
                const his = re.data;
                console.log('fetched history!', his);
                setHistory(his);
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
                            <div>match history of {name}</div>
                            <MatchList puuid={puuid} list={history} />
                        </div>
                }
            </div>
    );
}
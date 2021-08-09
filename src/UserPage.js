import { useParams } from 'react-router';
import { useEffect, useState } from 'react';
import axios from 'axios';

const API_BASE = 'http://localhost:3001';

export default function UserPage() {
    const { name } = useParams();
    const [ history, setHistory ] = useState([]);
    const [ loading, setLoading ] = useState(true);
    const [ notFound, setNotFound ] = useState(false);

    useEffect(() => {
        setLoading(true);
        console.log('fetching user data...');
        axios.get(`${API_BASE}/summoner/${name}`).then(res => {
            console.log('fetched!', name);
            const puuid = res.data;
            axios.get(`${API_BASE}/history/${puuid}`).then(re => {
                console.log(re);
                setHistory(re.data);
                setLoading(false);
            });
        }).catch(res => {
            console.log('fetch failed!', res);
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
                            <div>{history}</div>
                        </div>
                }
            </div>
    );
}
import { useEffect, useState } from 'react';
import '../css/UserProfile.css';

export default function UserProfile({ summonerInfo, list }) {
    const [ rankData, setRankData ] = useState({});
    const [ flexData, setFlexData ] = useState({});
    const [ username, setUsername ] = useState('');
    const [ wins, setWins ] = useState(0);
    const totalMatchNum = list.length;

    useEffect(() => {
        setUsername(summonerInfo[0].summonerName);
        setRankData(summonerInfo.find(el => el.queueType === "RANKED_SOLO_5x5"));
        setFlexData(summonerInfo.find(el => el.queueType === "RANKED_FLEX_SR")|| { tier: 'NO DATA', rank: ''});
        const winCount = list.filter(match =>
            match.participants.find(user =>
                user.summonerName === summonerInfo[0].summonerName).win).length;
        setWins(winCount);
        
    }, [ summonerInfo ]);

    return (
        <div className='UserProfile'>
            <div className='UserProfile__left'>
                <div className='UserProfile__tier'>{`SOLO: ${rankData.tier} ${rankData.rank}`}</div>
                <div className='UserProfile__tier'>{`TEAM: ${flexData.tier} ${flexData.rank}`}</div>
                <div className='UserProfile__username'>{username}</div>
            </div>
            <div className='UserProfile__stat'>{`${wins}/${totalMatchNum}`}</div>
        </div>
    );
}
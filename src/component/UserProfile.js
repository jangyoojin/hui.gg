import { useEffect, useState } from 'react';
import '../css/UserProfile.css';

export default function UserProfile({ leagueInfo, list }) {
    const [ rankData, setRankData ] = useState({});
    const [ flexData, setFlexData ] = useState({});
    const [ username, setUsername ] = useState('');
    const [ wins, setWins ] = useState(0);
    const totalMatchNum = list.length;

    useEffect(() => {
        const name = leagueInfo[0].summonerName;
        setUsername(name);
        setRankData(leagueInfo.find(el => el.queueType === "RANKED_SOLO_5x5"));
        setFlexData(leagueInfo.find(el => el.queueType === "RANKED_FLEX_SR")|| { tier: 'NO DATA', rank: ''});
        const winCount = list.filter(match => match.participants[
            match.participantIdentities.find(participant => participant.player.summonerName === name).participantId - 1
        ].stats.win).length;
        setWins(winCount);
    }, [ leagueInfo, list ]);

    return (
        <div className='UserProfile'>
            <div className='UserProfile__left'>
                <div className='UserProfile__tier'>{`TEAM: ${flexData.tier} ${flexData.rank}`}</div>
                <div className='UserProfile__tier'>{`SOLO: ${rankData.tier} ${rankData.rank}`}</div>
                <div className='UserProfile__username'>{username}</div>
            </div>
            <div className='UserProfile__stat'>{`${((wins / totalMatchNum) * 100).toFixed(1)}%`}</div>
        </div>
    );
}
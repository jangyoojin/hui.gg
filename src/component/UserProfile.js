import { useEffect, useState } from 'react';
import '../css/UserProfile.css';

export default function UserProfile({ name, leagueInfo, list }) {
    const [ rankData, setRankData ] = useState({});
    const [ flexData, setFlexData ] = useState({});
    const [ wins, setWins ] = useState(0);
    const totalMatchNum = list.length;

    useEffect(() => {
        setRankData(leagueInfo.find(el => el.queueType === "RANKED_SOLO_5x5")|| { tier: 'NO DATA', rank: ''});
        setFlexData(leagueInfo.find(el => el.queueType === "RANKED_FLEX_SR")|| { tier: 'NO DATA', rank: ''});
        const winCount = list.filter(match => match.participants[
            match.participantIdentities.find(participant => participant.player.summonerName === name)?.participantId - 1
        ]?.stats.win).length;
        setWins(winCount);
    }, [ name, leagueInfo, list ]);

    return (
        <div className='UserProfile'>
            <div className='UserProfile__left'>
                <div className='UserProfile__tier'>{`TEAM: ${flexData?.tier} ${flexData?.rank}`}</div>
                <div className='UserProfile__tier'>{`SOLO: ${rankData?.tier} ${rankData?.rank}`}</div>
                <div className='UserProfile__username'>{name}</div>
            </div>
            <div className='UserProfile__stat'>{`${((wins / totalMatchNum) * 100).toFixed(1)}%`}</div>
        </div>
    );
}
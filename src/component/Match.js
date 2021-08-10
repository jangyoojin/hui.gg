import { useEffect, useState } from 'react';
import monent from 'moment';
import '../css/Match.css';

export default function Match({ started, duration, game, user, participants }) {    
    const [ open, setOpen ] = useState(false);
    const [ red, setRed ] = useState([]);
    const [ blue, setBlue ] = useState([]);
    const [ time, setTime ] = useState('');

    const stringifyKDA = (kills, deaths, assists) => {
        return `${kills} / ${deaths} / ${assists} (${deaths === 0 ? 'perfect' : `${((kills + assists) / deaths).toFixed(2)}`})`;
    };

    const renderRed = () => {
        const tableContent = red.map(player => {
            return (
                <tr key={player.puuid} className={player.summonerName === user.summonerName ? `me` : ''}>
                    <td className='match__detail__summoner'>{player.summonerName}</td>
                    <td className='match__detail__champion'>{player.championName}</td>
                    <td align='right' className='match__detail__kda'>{stringifyKDA(player.kills, player.deaths, player.assists)}</td>
                </tr>
            );
        });
        const win = red[0].win;
        return (
            <div className={`match__detail__red ${win ? '' : 'lose'}`}>
                <table>
                    <thead>
                        <tr>
                            <th className='teamname' colSpan={3}>{`RED (${win ? 'win' : 'lose'})`}</th>
                        </tr>
                    </thead>
                    <tbody>
                        {tableContent}
                    </tbody>
                </table>
            </div>
        );
    };

    const renderBlue = () => {
        const tableContent = blue.map(player => {
            return (
                <tr key={player.puuid} className={player.summonerName === user.summonerName ? `me` : ''}>
                    <td className='match__detail__summoner'>{player.summonerName}</td>
                    <td className='match__detail__champion'>{player.championName}</td>
                    <td align='right' className='match__detail__kda'>{stringifyKDA(player.kills, player.deaths, player.assists)}</td>
                </tr>
            );
        });
        const win = blue[0].win;
        return (
            <div className={`match__detail__blue ${win ? '' : 'lose'}`}>
                <table>
                    <thead>
                        <tr>
                            <th className='teamname' colSpan={3}>{`BLUE (${win ? 'win' : 'lose'})`}</th>
                        </tr>
                    </thead>
                    <tbody>
                        {tableContent}
                    </tbody>
                </table>
            </div>
        );
    };

    useEffect(() => {
        const t = monent(new Date(started)).format('yyyy/MM/DD');
        
        setTime(t);
        setRed(participants.filter(player => player.teamId === 200));
        setBlue(participants.filter(player => player.teamId === 100));
    }, [ game, user, participants, started ]);

    return (
        <div className='Match'>{
            open 
                ? <div className={`match__card__open`} onClick={() => setOpen(false)}>
                    {renderRed()}
                    {renderBlue()}
                </div>
                : <div className={`match__card__${user.win ? 'won' : 'lost'}`} onClick={() => setOpen(true)}>
                    <div className='match__card__left'>
                        <div className='match__champion'>{user.championName}</div>
                        <div className='match__kda'>{`${user.kills} / ${user.deaths} / ${user.assists}`}</div>
                    </div>
                    <div className='match__card__right' align='right'>
                        <div className='match__won'>{user.win ? 'Won' : 'Lost'}</div>
                        <div className='match__time'>{time}</div>
                    </div>
                </div>
        }</div>
    );
}
import { useEffect, useState } from 'react';
import './css/Match.css';

export default function Match({ game, user, participants }) {    
    const [ open, setOpen ] = useState(false);
    const [ red, setRed ] = useState([]);
    const [ blue, setBlue ] = useState([]);

    const stringifyKDA = (kills, deaths, assists) => {
        return `${kills} / ${deaths} / ${assists} (${deaths === 0 ? 'perfect' : `${((kills + assists) / deaths).toFixed(2)}`})`;
    };

    const renderRed = () => {
        const tableContent = red.map(player => {
            return (
                <tr key={player.puuid} className={player.summonerName === user.summonerName ? `me` : ''}>
                    <td className='match__detail__red__summoner'>{player.summonerName}</td>
                    <td className='match__detail__red__champion'>{player.championName}</td>
                    <td className='match__detail__red__kda'>{stringifyKDA(player.kills, player.deaths, player.assists)}</td>
                </tr>
            );
        });
        const win = red[0].win;
        return (
            <div className='match__detail__red'>
                <table>
                    <thead>
                        <tr>
                            <th colSpan={3}>{`Red team(${win ? 'win' : 'lose'})`}</th>
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
                    <td className='match__detail__blue__summoner'>{player.summonerName}</td>
                    <td className='match__detail__blue__champion'>{player.championName}</td>
                    <td className='match__detail__blue__kda'>{stringifyKDA(player.kills, player.deaths, player.assists)}</td>
                </tr>
            );
        });
        const win = blue[0].win;
        return (
            <div className='match__detail__blue'>
                <table>
                    <thead>
                        <tr>
                            <th colSpan={3}>{`Blue team(${win ? 'win' : 'lose'})`}</th>
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
        console.log(user);
        setRed(participants.filter(player => player.teamId === 200));
        setBlue(participants.filter(player => player.teamId === 100));
    }, [ game, user, participants ]);

    return (
        open 
            ? <div className={`match__${user.win ? 'win' : 'lose'}`}>
                {renderRed()}
                <hr />
                {renderBlue()}
                <button onClick={() => setOpen(false)}>close</button>
            </div>
            : <div className={`match__${user.win ? 'win' : 'lose'}`}>
                <div>{user.win ? 'Won' : 'Lost'}</div>
                <div className='match__champion'>{user.championName}</div>
                <div className='match__kda'>{`${user.kills} / ${user.deaths} / ${user.assists}`}</div>
                <button onClick={() => setOpen(true)}>open</button>
            </div>
    );
}
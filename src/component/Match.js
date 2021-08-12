import { useEffect, useState } from 'react';
import monent from 'moment';
import '../css/Match.css';

export default function Match({ started, duration, game, user, participants }) {    
    const [ open, setOpen ] = useState(false);
    const [ red, setRed ] = useState([]);
    const [ blue, setBlue ] = useState([]);
    const [ time, setTime ] = useState('');

    const getChampionName = (championId) => {
        switch (championId) {
            case 266: return "Aatrox";
            case 103: return "Ahri";
            case 84: return "Akali";
            case 166: return "Akshan";
            case 12: return "Alistar";
            case 32: return "Amumu";
            case 34: return "Anivia";
            case 1: return "Annie";
            case 523: return "Aphelios";
            case 22: return "Ashe";
            case 136: return "Aurelion Sol";
            case 268: return "Azir";
            case 432: return "Bard";
            case 53: return "Blitzcrank";
            case 63: return "Brand";
            case 201: return "Braum";
            case 51: return "Caitlyn";
            case 164: return "Camille";
            case 69: return "Cassiopeia";
            case 31: return "Cho'Gath";
            case 42: return "Corki";
            case 122: return "Darius";
            case 131: return "Diana";
            case 119: return "Draven";
            case 36: return "Dr. Mundo";
            case 245: return "Ekko";
            case 60: return "Elise";
            case 28: return "Evelynn";
            case 81: return "Ezreal";
            case 9: return "Fiddlesticks";
            case 114: return "Fiora";
            case 105: return "Fizz";
            case 3: return "Galio";
            case 41: return "Gangplank";
            case 86: return "Garen";
            case 150: return "Gnar";
            case 79: return "Gragas";
            case 104: return "Graves";
            case 887: return "Gwen";
            case 120: return "Hecarim";
            case 74: return "Heimerdinger";
            case 420: return "Illaoi";
            case 39: return "Irelia";
            case 427: return "Ivern";
            case 40: return "Janna";
            case 59: return "Jarvan IV";
            case 24: return "Jax";
            case 126: return "Jayce";
            case 202: return "Jhin";
            case 222: return "Jinx";
            case 145: return "Kai'Sa";
            case 429: return "Kalista";
            case 43: return "Karma";
            case 30: return "Karthus";
            case 38: return "Kassadin";
            case 55: return "Katarina";
            case 10: return "Kayle";
            case 141: return "Kayn";
            case 85: return "Kennen";
            case 121: return "Kha'Zix";
            case 203: return "Kindred";
            case 240: return "Kled";
            case 96: return "Kog'Maw";
            case 7: return "LeBlanc";
            case 64: return "Lee Sin";
            case 89: return "Leona";
            case 876: return "Lillia";
            case 127: return "Lissandra";
            case 236: return "Lucian";
            case 117: return "Lulu";
            case 99: return "Lux";
            case 54: return "Malphite";
            case 90: return "Malzahar";
            case 57: return "Maokai";
            case 11: return "Master Yi";
            case 21: return "Miss Fortune";
            case 62: return "Wukong";
            case 82: return "Mordekaiser";
            case 25: return "Morgana";
            case 267: return "Nami";
            case 75: return "Nasus";
            case 111: return "Nautilus";
            case 518: return "Neeko";
            case 76: return "Nidalee";
            case 56: return "Nocturne";
            case 20: return "Nunu & Willump";
            case 2: return "Olaf";
            case 61: return "Orianna";
            case 516: return "Ornn";
            case 80: return "Pantheon";
            case 78: return "Poppy";
            case 555: return "Pyke";
            case 246: return "Qiyana";
            case 133: return "Quinn";
            case 497: return "Rakan";
            case 33: return "Rammus";
            case 421: return "Rek'Sai";
            case 526: return "Rell";
            case 58: return "Renekton";
            case 107: return "Rengar";
            case 92: return "Riven";
            case 68: return "Rumble";
            case 13: return "Ryze";
            case 360: return "Samira";
            case 113: return "Sejuani";
            case 235: return "Senna";
            case 147: return "Seraphine";
            case 875: return "Sett";
            case 35: return "Shaco";
            case 98: return "Shen";
            case 102: return "Shyvana";
            case 27: return "Singed";
            case 14: return "Sion";
            case 15: return "Sivir";
            case 72: return "Skarner";
            case 37: return "Sona";
            case 16: return "Soraka";
            case 50: return "Swain";
            case 517: return "Sylas";
            case 134: return "Syndra";
            case 223: return "Tahm Kench";
            case 163: return "Taliyah";
            case 91: return "Talon";
            case 44: return "Taric";
            case 17: return "Teemo";
            case 412: return "Thresh";
            case 18: return "Tristana";
            case 48: return "Trundle";
            case 23: return "Tryndamere";
            case 4: return "Twisted Fate";
            case 29: return "Twitch";
            case 77: return "Udyr";
            case 6: return "Urgot";
            case 110: return "Varus";
            case 67: return "Vayne";
            case 45: return "Veigar";
            case 161: return "Vel'Koz";
            case 254: return "Vi";
            case 234: return "Viego";
            case 112: return "Viktor";
            case 8: return "Vladimir";
            case 106: return "Volibear";
            case 19: return "Warwick";
            case 498: return "Xayah";
            case 101: return "Xerath";
            case 5: return "Xin Zhao";
            case 157: return "Yasuo";
            case 777: return "Yone";
            case 83: return "Yorick";
            case 350: return "Yuumi";
            case 154: return "Zac";
            case 238: return "Zed";
            case 115: return "Ziggs";
            case 26: return "Zilean";
            case 142: return "Zoe";
            case 143: return "Zyra";
            default : return "";
        }
    };

    const stringifyKDA = (kills, deaths, assists) => {
        return `${kills} / ${deaths} / ${assists} (${deaths === 0 ? 'perfect' : `${((kills + assists) / deaths).toFixed(2)}`})`;
    };

    const renderRed = () => {
        const tableContent = red.map(player => {
            return (
                <tr key={player.puuid} className={player.summonerName === user.summonerName ? `me` : ''}>
                    <td className='match__detail__summoner'>{player.summonerName}</td>
                    <td className='match__detail__champion'>{getChampionName(player.championId)}</td>
                    <td align='right' className='match__detail__kda'>{stringifyKDA(player.stats.kills, player.stats.deaths, player.stats.assists)}</td>
                </tr>
            );
        });
        const win = red[0].stats.win;
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
                    <td className='match__detail__champion'>{getChampionName(player.championId)}</td>
                    <td align='right' className='match__detail__kda'>{stringifyKDA(player.stats.kills, player.stats.deaths, player.stats.assists)}</td>
                </tr>
            );
        });
        const win = blue[0].stats.win;
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
                : <div className={`match__card__${user.stats.win ? 'won' : 'lost'}`} onClick={() => setOpen(true)}>
                    <div className='match__card__left'>
                        <div className='match__champion'>{getChampionName(user.championId)}</div>
                        <div className='match__kda'>{`${user.stats.kills} / ${user.stats.deaths} / ${user.stats.assists}`}</div>
                    </div>
                    <div className='match__card__right' align='right'>
                        <div className='match__won'>{user.stats.win ? 'Won' : 'Lost'}</div>
                        <div className='match__time'>{time}</div>
                    </div>
                </div>
        }</div>
    );
}
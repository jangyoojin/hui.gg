import Match from './Match';

export default function MatchList({ puuid, list }) {
    return (
        <div className='matchList'>{
            list.map(elem => {
                const key = elem.gameId;
                const participants = elem.participants;
                const user = elem.participants.find(el => el.puuid === puuid);
                
                return (<Match key={key} game={key} user={user} participants={participants}/>);
            })
        }</div>
    ); 
}
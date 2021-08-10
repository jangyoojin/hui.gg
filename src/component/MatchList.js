import Match from './Match';

export default function MatchList({ puuid, list }) {
    return (
        <div className='matchList'>{
            list.map(elem => {
                const key = elem.gameId;
                const participants = elem.participants;
                const user = elem.participants.find(el => el.puuid === puuid);
                const started = elem.gameCreation;
                const duration = elem.gameDuration;

                // console.log(key, participants, user, started, duration);
                return (<Match 
                    key={key} 
                    started={started} 
                    duration={duration} 
                    game={key} 
                    user={user} 
                    participants={participants} />);
            })
        }</div>
    ); 
}
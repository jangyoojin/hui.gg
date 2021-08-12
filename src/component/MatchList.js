import Match from './Match';

export default function MatchList({ id, list }) {
    return (
        <div className='matchList'>{
            list.map(elem => {
                const key = elem.gameId;
                const participants = elem.participants.map((participant, idx) => Object.assign({}, participant, elem.participantIdentities[idx].player));
                const user = participants.find(participant => participant.summonerId === id);
                const started = elem.gameCreation;
                const duration = elem.gameDuration;

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
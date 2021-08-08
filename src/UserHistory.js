import { useParams } from 'react-router';

export default function UserHistory() {
    const { name } = useParams();
    return (
        <div>match history of {name}</div>
    );
}
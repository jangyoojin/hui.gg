import { useState } from "react";

export default function Welcome({ history, location, match }) {
    const [summonerName, setSummonerName ] = useState('');
    
    const onSearch = (e) => {
        e.preventDefault();
        history.push(`/${summonerName}`);
    }

    const onChange = (e) => {
        e.preventDefault();
        setSummonerName(e.target?.value);
    }

    return (
        <div className='Welcome'>
            <div>Hui.GG</div>
            <form 
                className='searchBar'
                onSubmit={onSearch}>
                <input 
                    autoFocus={true}
                    name='summonerName' 
                    type='text' 
                    onChange={onChange}/>
                <input 
                    type='submit'/>
            </form>
        </div>
    );
}
import { useState } from "react";
import './css/Welcome.css';
import search from './img/search.svg';

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
            <div className='logo'>Hui.GG</div>
            <form 
                className='searchBar'
                onSubmit={onSearch}>
                <input 
                    className='searchInput'
                    autoFocus={true}
                    name='summonerName' 
                    type='text' 
                    onChange={onChange} />
                <div onClick={onSearch}>
                    <img 
                        className='search'
                        src={search} 
                        alt='search' />
                </div>
                <input type='submit' hidden />
            </form>
        </div>
    );
}
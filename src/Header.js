import React from 'react';
import { Link } from "react-router-dom";
import logo from './img/logo.png';
import './css/Header.css';

function Header() {
  return (
    <div style={{"height":"10%"}}>
        <Link to="/" className='headerLogo'>Hui.GG</Link>
        <hr style={{"margin":"0"}} />
    </div>
  );
}

export default Header;
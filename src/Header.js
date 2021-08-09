import React from 'react';
import { Link } from "react-router-dom";
import logo from './img/logo.png';

function Header() {
  return (
    <div style={{"height":"10%"}}>
        <Link to="/" className='header__logo'><img src={logo} alt='logo' /></Link>
        <hr style={{"margin":"0"}} />
    </div>
  )
}

export default Header;
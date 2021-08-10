import React from 'react';
import { Link } from "react-router-dom";
import '../css/Header.css';

function Header() {
  return (
    <div>
        <Link to="/" className='headerLogo'>Hui.GG</Link>
        <hr style={{"margin":"0"}} />
    </div>
  );
}

export default Header;
import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header>
      <div className="logo-box">
        <h2 id="logo">agave</h2>
        <div className="logo-button">
          <Link to="/login">login</Link>
          <Link to="/signup">signup</Link>
        </div>
      </div>
    </header>
  )
}

export default Header;

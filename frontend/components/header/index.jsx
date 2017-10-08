import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header>
      <div className="logo-box">
        <Link to="/login">login</Link>
        <Link to="/signup">signup</Link>
        <h2>agave</h2>
      </div>
    </header>
  )
}

export default Header;

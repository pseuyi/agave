import React from 'react';
import { Link } from 'react-router-dom';
import SessionModal from 'components/session_modal';

const Landing = () => (
    <section>
      <h1>WELCOM TO AGAVE</h1>
      <Link to="/login">LOGIN</Link>
    </section>
)

export default Landing;

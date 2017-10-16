import React from 'react';
import { connect } from 'react-redux';
import { currentUserSelector } from 'reducers/selectors';
import { Link } from 'react-router-dom';
import { logout } from 'actions/session_actions';

const Header = (props) => {

  const handleLogout = (e) => {
    e.preventDefault();
    props.logout(props.currentUserId);
  }

  return (
    <header>
      <div className='user-box'>
        {
          props.currentUser ?
            [
              <h4 key='username'>{props.currentUser.username}</h4>,
              <button key='logout' onClick={handleLogout}>logout</button>
            ] : [
              <Link key='login' to='/login'>login</Link>,
              <Link key='signup' to='/signup'>sign up</Link>
            ]
        }
      </div>
      <div className='logo-box'>
        <h2 id='logo'>agave</h2>
      </div>
    </header>
  )
}

const mapStateToProps = (state) => {
  return {
    currentUserId: state.session.currentUser,
    currentUser: currentUserSelector(state),
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    logout: (user) => dispatch(logout(user)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Header);

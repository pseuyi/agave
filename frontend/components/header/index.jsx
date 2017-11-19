import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { currentUserSelector } from 'reducers/selectors';
import { Link } from 'react-router-dom';
import { logout } from 'actions/session_actions';

const Container = styled.header`
  height: 100px;
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
  align-items: safe center;
`
const LogoContainer = styled.div`
  padding: 0 4.4rem;
`
const Logo = styled.a`
  font-size: 6rem;
  color: #1bd68e;
  font-weight: lighter;
  font-family: 'BodoniXt';
  letter-spacing: 10px;
`
const UserContainer = styled.div`
  padding: 0 4.4rem;
  font-size: 1.4rem;
`
const LeftNav = styled.div`
  display: block;
  top: 0;
  h4 {
    margin: 0.4rem 0;
  }
`

const Header = (props) => {

  const handleLogout = (e) => {
    e.preventDefault();
    props.logout(props.currentUserId);
  }

  return (
    <Container>
      <UserContainer>
        {
          props.currentUser ?
            (
              <LeftNav>
                <h4 key='username'>welcome, {props.currentUser.username}</h4>
                <button key='logout' onClick={handleLogout}>logout</button>
              </LeftNav>
            )
             : [
              <Link key='login' to='/login'>login</Link>,
              <Link key='signup' to='/signup'>sign up</Link>
            ]
        }
      </UserContainer>
      <LogoContainer>
        <Logo href="/">agave</Logo>
      </LogoContainer>
    </Container>
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

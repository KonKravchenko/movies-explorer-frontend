import React from 'react';
import { ReactComponent as HeaderLogo } from '../../images/header_logo.svg';
import Navigation from '../Navigation/Navigation'
function Header({ loggedIn }) {

  return (
    <div className="Header">
      <HeaderLogo />
      <Navigation
        loggedIn={loggedIn}
      />
    </div>
  );
}

export default Header;
import React from 'react';
import styles from './Header.css';
import cx from 'classnames';

import Navigation from '../Navigation/Navigation'
function Header({ loggedIn, isActive }) {


  const headerStyle = !isActive ? (styles.header) : (cx(styles.header, styles.background));
  return (
    <header className={headerStyle}>
      
      <Navigation
        loggedIn={loggedIn}
        isActive={isActive}
      />
    </header>
  );
}

export default Header;